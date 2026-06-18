const fs = require('fs');
const cheerio = require('cheerio');

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
    .map(post => ({
        title: post.title,
        date: post.published
            ? post.published.split('T')[0]
            : 'Unknown Date',
        text: cleanContent(post.content?.value || '')
    }))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

const output =
    `const ARCHIVE_DATA = ${JSON.stringify(formattedData, null, 4)};`;

fs.writeFileSync('js/archive_data.js', output);

console.log(
    `Successfully created js/archive_data.js with ${formattedData.length} LIVE posts.`
);