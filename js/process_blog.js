const fs = require('fs');
const cheerio = require('cheerio');
const crypto = require('crypto');

// --- Helper: Get Exact Local Time ---
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

const rawData = fs.readFileSync(
    'assets/raw/MyBlogExport_Dicts.json',
    'utf8'
);

const blogPosts = JSON.parse(rawData);

function cleanContent(html) {
    const $ = cheerio.load(html);

    // Remove media and embeds
    $('script, style, iframe, object, img, video').remove();

    // Remove links but keep text
    $('a').each((_, el) => {
        $(el).replaceWith($(el).text());
    });

    // Bold
    $('b, strong').each((_, el) => {
        $(el).replaceWith(`**${$(el).text()}**`);
    });

    // Italics
    $('i, em').each((_, el) => {
        $(el).replaceWith(`*${$(el).text()}*`);
    });

    // Blockquotes
    $('blockquote').each((_, el) => {
        const lines = $(el)
            .text()
            .split('\n')
            .map(line => `> ${line}`);

        $(el).replaceWith('\n\n' + lines.join('\n') + '\n\n');
    });

    // Line breaks
    $('br').replaceWith('\n');

    // Paragraphs
    $('p, div').each((_, el) => {
        $(el).append('\n\n');
    });

    let text = $.root().text();

    return text
        .replace(/\u00A0/g, ' ')
        .replace(/[ \t]+\n/g, '\n')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
}

const formattedData = blogPosts
    .filter(post => post.status === 'LIVE')
    .map(post => {
        // Use the original Blogger publish date, or local time if missing
        const fullTime = post.published || getLocalIsoString();
        const generatedId = crypto.randomBytes(4).toString('hex');
        
        return {
            id: generatedId,
            title: post.title,
            created: fullTime,
            updated: fullTime,
            date: fullTime.split('T')[0], // Clean date for the frontend array
            category: 'General',
            tags: [],
            text: cleanContent(post.content?.value || '')
        };
    })
    .sort((a, b) => new Date(b.created) - new Date(a.created));

const output =
    `const ARCHIVE_DATA = ${JSON.stringify(formattedData, null, 4)};\n`;

fs.writeFileSync('js/archive_data.js', output);

console.log(
    `Successfully created js/archive_data.js with ${formattedData.length} LIVE posts.`
);