const fs = require('fs');
const { execSync } = require('child_process');

const OUTPUT_FILE = 'js/archive_data.js';
const WRITINGS_DIR = 'assets/raw/writings';

function updateArchive() {
    console.log("--- Starting Blog Update ---");

    // 1. Rerun original script if it exists
    if (fs.existsSync('js/process_blog.js')) {
        try {
            console.log("Running original export script...");
            execSync('node js/process_blog.js', { stdio: 'inherit' });
        } catch (e) {
            console.error("Original script failed, proceeding with manual merge...");
        }
    }

    // 2. Now perform the merging of Markdown
    let allPosts = [];
    if (fs.existsSync(OUTPUT_FILE)) {
        const fileContent = fs.readFileSync(OUTPUT_FILE, 'utf8');
        const jsonString = fileContent.substring(fileContent.indexOf('['), fileContent.lastIndexOf(']') + 1);
        allPosts = JSON.parse(jsonString);
    }

    // 3. Process Markdown (same as before)
    const files = fs.readdirSync(WRITINGS_DIR).filter(f => f.endsWith('.md'));
    files.forEach(file => {
        const content = fs.readFileSync(WRITINGS_DIR + '/' + file, 'utf8');
        const match = content.match(/^---\n.*?date:\s*(\d{4}-\d{2}-\d{2})/s);
        const date = match ? match[1] : new Date().toISOString().split('T')[0];
        const body = content.replace(/^---[\s\S]*?---\n?/, '').trim();
        const lines = body.split('\n');

        allPosts.push({
            title: lines[0].replace(/^#\s*/, '').trim(),
            date: date,
            text: lines.slice(1).join('\n').trim()
        });
    });

    // 4. De-duplicate and Sort
    const uniquePosts = Array.from(new Map(allPosts.map(p => [p.title, p])).values());
    uniquePosts.sort((a, b) => new Date(b.date) - new Date(a.date));

    // 5. Save
    fs.writeFileSync(OUTPUT_FILE, `const ARCHIVE_DATA = ${JSON.stringify(uniquePosts, null, 4)};`);
    console.log(`Update complete. Total posts: ${uniquePosts.length}`);
}

updateArchive();