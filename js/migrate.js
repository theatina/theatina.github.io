const fs = require('fs');
const path = require('path');

const INPUT_FILE = 'js/archive_data.js';
const PUBLISHED_DIR = 'assets/raw/writings/published';

function migrateToMarkdown() {
    console.log("--- Converting Archive JSON to Markdown Files ---");

    // Ensure the published directory exists
    if (!fs.existsSync(PUBLISHED_DIR)) {
        fs.mkdirSync(PUBLISHED_DIR, { recursive: true });
    }

    if (!fs.existsSync(INPUT_FILE)) {
        console.error(`Input file ${INPUT_FILE} not found.`);
        return;
    }

    // Read and parse the JS file
    const fileContent = fs.readFileSync(INPUT_FILE, 'utf8');
    const jsonString = fileContent.substring(fileContent.indexOf('['), fileContent.lastIndexOf(']') + 1);
    const archiveData = JSON.parse(jsonString);

    archiveData.forEach((post, index) => {
        // Create an incremental number like 001, 002, 003...
        // Note: Because the array is sorted newest-to-oldest, post_001 is your newest post!
        const count = String(index + 1).padStart(3, '0');
        
        // Incremental naming with underscores as requested
        const fileName = `post_${count}_${post.id}.md`;
        const filePath = path.join(PUBLISHED_DIR, fileName);

        const tagsStr = `[${post.tags.join(', ')}]`;

        // Construct Markdown with full Frontmatter
        const mdContent = `---
id: ${post.id}
created: ${post.created}
updated: ${post.updated}
category: ${post.category}
tags: ${tagsStr}
---
# ${post.title}

${post.text}
`;
        fs.writeFileSync(filePath, mdContent);
    });

    console.log(`✅ Successfully generated ${archiveData.length} Markdown files in ${PUBLISHED_DIR}`);
    console.log(`You can now delete js/process_blog.js and migrate_to_md.js. Your CMS is ready!`);
}

migrateToMarkdown();