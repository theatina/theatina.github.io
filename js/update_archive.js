const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const OUTPUT_FILE = 'js/archive_data.js';
const PUBLISHED_DIR = 'assets/raw/writings/published';
const UNPUBLISHED_DIR = 'assets/raw/writings/unpublished';
const DELETED_DIR = 'assets/raw/writings/deleted'; 

// --- Helper: Get Exact Local Time with Timezone Offset ---
function getLocalIsoString() {
    const date = new Date();
    const tzo = -date.getTimezoneOffset();
    const dif = tzo >= 0 ? '+' : '-';
    const pad = num => {
        const norm = Math.floor(Math.abs(num));
        return (norm < 10 ? '0' : '') + norm;
    };
    return date.getFullYear() +
        '-' + pad(date.getMonth() + 1) +
        '-' + pad(date.getDate()) +
        'T' + pad(date.getHours()) +
        ':' + pad(date.getMinutes()) +
        ':' + pad(date.getSeconds()) +
        dif + pad(tzo / 60) +
        ':' + pad(tzo % 60);
}

// --- Helper: Progress Bar ---
function drawProgressBar(current, total, text = '') {
    const width = 30; 
    const percent = total === 0 ? 1 : current / total;
    const filledLength = Math.round(width * percent);
    const bar = '█'.repeat(filledLength) + '░'.repeat(width - filledLength);
    const percentText = Math.round(percent * 100).toString().padStart(3, ' ');

    process.stdout.write(`\r\x1b[KProgress: [${bar}] ${percentText}% (${current}/${total}) ${text}`);
    if (current === total && total > 0) console.log(); 
}

function updateArchive() {
    console.log("--- Starting Archive Compile & Publish ---");

    [PUBLISHED_DIR, UNPUBLISHED_DIR, DELETED_DIR].forEach(dir => {
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    });

    let knownIds = new Set();
    if (fs.existsSync(OUTPUT_FILE)) {
        try {
            const content = fs.readFileSync(OUTPUT_FILE, 'utf8');
            const jsonStr = content.substring(content.indexOf('['), content.lastIndexOf(']') + 1);
            const parsed = JSON.parse(jsonStr);
            parsed.forEach(p => knownIds.add(p.id));
        } catch (e) {}
    }

    // Master Set to track EVERY used ID to guarantee uniqueness
    const allUsedIds = new Set(knownIds);

    const deletedIds = new Set();
    const deletedFiles = fs.readdirSync(DELETED_DIR).filter(f => f.endsWith('.md'));
    
    deletedFiles.forEach(file => {
        const filePath = path.join(DELETED_DIR, file);
        const content = fs.readFileSync(filePath, 'utf8');
        
        const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
        let id = null;
        if (fmMatch) {
            const idMatch = fmMatch[1].match(/^id:\s*([a-zA-Z0-9-]+)/m);
            if (idMatch) id = idMatch[1].trim();
        }
        if (!id) {
            const idMatchFilename = file.match(/_([a-zA-Z0-9-]+)\.md$/);
            if (idMatchFilename) id = idMatchFilename[1];
        }
        if (id) {
            deletedIds.add(id);
            allUsedIds.add(id); // Register deleted IDs so we don't accidentally reuse them
        }
    });

    const uniquePostsMap = new Map();
    const publishedFilesMap = new Map(); 
    
    const publishedFiles = fs.readdirSync(PUBLISHED_DIR).filter(f => f.endsWith('.md'));
    const unpublishedFiles = fs.readdirSync(UNPUBLISHED_DIR).filter(f => f.endsWith('.md'));
    const totalFiles = publishedFiles.length + unpublishedFiles.length;
    
    let processedCount = 0;
    let newCount = 0; 
    let updatedCount = 0;      
    let deletedCount = 0; 
    let errorCount = 0; 

    deletedIds.forEach(id => {
        if (knownIds.has(id)) deletedCount++;
    });

    if (totalFiles === 0 && deletedIds.size === 0) {
        console.log("No markdown files found. Exiting.");
        return;
    }

    if (totalFiles > 0) drawProgressBar(0, totalFiles, "Starting...");

    const processFiles = (files, dir, isUnpublished) => {
        files.forEach(file => {
            const filePath = path.join(dir, file);
            let content = fs.readFileSync(filePath, 'utf8');
            let fileModified = false;
            
            const now = getLocalIsoString();

            let frontmatter = {};
            let body = content;
            const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
            
            if (fmMatch) {
                fmMatch[1].split('\n').forEach(line => {
                    const [key, ...valParts] = line.split(':');
                    if (key && valParts.length) {
                        frontmatter[key.trim()] = valParts.join(':').trim();
                    }
                });
                body = content.slice(fmMatch[0].length).trim();
            } else {
                fileModified = true; 
            }

            // Register existing ID so we don't duplicate it in this run
            if (frontmatter.id) {
                allUsedIds.add(frontmatter.id);
            }

            // --- FORMATTING VALIDATION ---
            const lines = body.split('\n');
            const titleLine = lines.find(line => line.startsWith('#'));
            const title = titleLine ? titleLine.replace(/^#\s*/, '').trim() : '';
            const text = lines.filter(line => line !== titleLine).join('\n').trim();

            const isBadFormat = !title || !text; 

            if (isUnpublished && isBadFormat) {
                if (!file.includes('_error')) {
                    const newName = file.replace(/\.md$/, '_error.md');
                    fs.renameSync(filePath, path.join(dir, newName));
                }
                errorCount++;
                processedCount++;
                drawProgressBar(processedCount, totalFiles, `| New: ${newCount} | Upd: ${updatedCount} | Err: ${errorCount}`);
                return; 
            }
            // -----------------------------

            // --- GUARANTEED UNIQUE ID GENERATION ---
            if (!frontmatter.id) {
                const idMatchFilename = file.match(/_([a-zA-Z0-9-]+)\.md$/);
                
                if (idMatchFilename && idMatchFilename[1]) {
                    frontmatter.id = idMatchFilename[1];
                } else {
                    let newId;
                    // Keep generating a new ID until we find one that has NEVER been used
                    do {
                        newId = crypto.randomBytes(4).toString('hex');
                    } while (allUsedIds.has(newId));
                    
                    frontmatter.id = newId;
                }
                fileModified = true;
            }
            // Track the newly confirmed ID so the next file doesn't grab it
            allUsedIds.add(frontmatter.id);

            // --- DELETION CHECK ---
            if (deletedIds.has(frontmatter.id)) {
                processedCount++;
                drawProgressBar(processedCount, totalFiles, `| New: ${newCount} | Upd: ${updatedCount} | Del: ${deletedCount} | Err: ${errorCount}`);
                return; 
            }

            if (!frontmatter.created) {
                frontmatter.created = frontmatter.date || now;
                fileModified = true;
            }
            delete frontmatter.date; 

            if (isUnpublished) {
                frontmatter.updated = now;
                fileModified = true;
            } else {
                if (!frontmatter.updated) {
                    frontmatter.updated = frontmatter.created;
                    fileModified = true;
                }
            }

            if (!frontmatter.category) { frontmatter.category = 'General'; fileModified = true; }
            if (!frontmatter.tags) { frontmatter.tags = '[]'; fileModified = true; }

            // --- LOGGING TRACKER ---
            const isKnownPost = knownIds.has(frontmatter.id);
            if (isUnpublished) {
                if (isKnownPost || publishedFilesMap.has(frontmatter.id)) {
                    updatedCount++; 
                } else {
                    newCount++; 
                }
            } else if (fileModified) {
                updatedCount++; 
            }

            if (fileModified || isUnpublished) {
                const newFmBlock = `---\nid: ${frontmatter.id}\ncreated: ${frontmatter.created}\nupdated: ${frontmatter.updated}\ncategory: ${frontmatter.category}\ntags: ${frontmatter.tags}\n---\n\n`;
                content = newFmBlock + body;
                
                fs.writeFileSync(filePath, content, 'utf8');
            }

            const tagsMatch = frontmatter.tags.match(/\[(.*?)\]/);
            const tags = tagsMatch && tagsMatch[1] 
                ? tagsMatch[1].split(',').map(tag => tag.trim()).filter(tag => tag !== '') 
                : [];

            uniquePostsMap.set(frontmatter.id, {
                id: frontmatter.id,
                title: title,
                created: frontmatter.created,
                updated: frontmatter.updated,
                date: frontmatter.updated.split('T')[0], 
                category: frontmatter.category,
                tags: tags,
                text: text
            });

            // Map tracking and moving logic
            if (!isUnpublished) {
                publishedFilesMap.set(frontmatter.id, file); 
            } else {
                const existingFile = publishedFilesMap.get(frontmatter.id);
                
                if (existingFile && existingFile !== file) {
                    try {
                        fs.unlinkSync(path.join(PUBLISHED_DIR, existingFile));
                    } catch (e) {
                        console.error(`Failed to delete old file: ${existingFile}`);
                    }
                }
                
                const newPath = path.join(PUBLISHED_DIR, file);
                fs.renameSync(filePath, newPath); 
            }

            processedCount++;
            drawProgressBar(processedCount, totalFiles, `| New: ${newCount} | Upd: ${updatedCount} | Del: ${deletedCount} | Err: ${errorCount}`);
        });
    };

    processFiles(publishedFiles, PUBLISHED_DIR, false);
    processFiles(unpublishedFiles, UNPUBLISHED_DIR, true);

    const uniquePosts = Array.from(uniquePostsMap.values());
    uniquePosts.sort((a, b) => new Date(b.updated) - new Date(a.updated));

    const outputDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

    const outputString = `const ARCHIVE_DATA = ${JSON.stringify(uniquePosts, null, 4)};\n`;
    fs.writeFileSync(OUTPUT_FILE, outputString);
    
    console.log(`\n✅ Compile complete!`);
    console.log(`✨ New Posts Published:  ${newCount}`);
    console.log(`📝 Existing Posts Updated: ${updatedCount}`);
    console.log(`🗑️  Deleted Posts:         ${deletedCount}`);
    console.log(`⚠️  Format Errors Skipped: ${errorCount}`);
    console.log(`📚 Total Live Posts:       ${uniquePosts.length}`);
}

updateArchive();