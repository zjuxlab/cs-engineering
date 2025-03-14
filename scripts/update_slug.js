const fs = require('fs');
const path = require('path');

const folders = ['软件科研技能树', '软件工程技能树'];
const docsPath = path.join(__dirname, '../docs');

folders.forEach((folder) => {
    const folderPath = path.join(docsPath, folder);
    traverseFolder(folderPath);
});

function traverseFolder(folderPath) {
    fs.readdirSync(folderPath).forEach((file) => {
        const filePath = path.join(folderPath, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            traverseFolder(filePath);
        } else if (path.extname(file) === '.md') {
            processMarkdownFile(filePath);
        }
    });
}

function processMarkdownFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');

    // 检查 Front Matter 是否存在
    if (lines.length < 2 || lines[0] !== '---') return;
    let endIndex = lines.indexOf('---', 1);
    if (endIndex === -1) return;

    // 提取关键字段
    const frontMatter = lines.slice(1, endIndex);
    let title = '';
    let sidebarPos = '';

    for (const line of frontMatter) {
        if (line.startsWith('title:')) title = line.split(':')[1].trim();
        if (line.startsWith('sidebar_position:')) sidebarPos = line.split(':')[1].trim();
    }

    // 重建 Front Matter（强制只保留 title、slug、sidebar_position）
    const newFrontMatter = [
        `title: ${title}`,
        `slug: ${title}`, // 确保 slug 直接等于 title
        `sidebar_position: ${sidebarPos}`
    ];

    // 替换整个 Front Matter 部分
    const newContent = [
        '---',
        ...newFrontMatter,
        '---',
        ...lines.slice(endIndex + 1)
    ].join('\n');

    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Rebuilt Front Matter in ${filePath}`);
}