const fs = require('fs');
const path = require('path');

// 假设 JSON 数据已经保存在一个文件中
const jsonData = require('./swift_docs_structure.json');

// 根目录路径
const rootDir = './swift-6-beta.docc';

// GitHub 仓库的基础 URL
const githubBaseUrl = 'https://github.com/SwiftGGTeam/the-swift-programming-language-in-chinese/blob/swift-6-beta-translation/swift-6-beta.docc';

// 递归遍历目录
function traverseDirectory(dir) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            traverseDirectory(fullPath);
        } else if (path.extname(file) === '.md') {
            processMarkdownFile(fullPath);
        }
    });
}

// 处理 Markdown 文件
function processMarkdownFile(filePath) {
    const relativePath = path.relative(rootDir, filePath);
    const fileName = path.basename(filePath, '.md');

    // 查找匹配的 URL
    let matchingUrl = null;
    for (const section in jsonData) {
        const match = jsonData[section].find(item => {
            const urlParts = item.url.split('/');
            const lastPart = urlParts[urlParts.length - 1].toLowerCase();
            return lastPart === fileName.toLowerCase() ||
                lastPart === fileName.toLowerCase().replace(/[^a-z0-9]/g, '');
        });
        if (match) {
            matchingUrl = match.url;
            break;
        }
    }

    if (matchingUrl) {
        const content = fs.readFileSync(filePath, 'utf8');

        // 检查文件是否已经包含了注释
        if (content.includes('要翻译的文件：') && content.includes('Swift 文档源文件地址：')) {
            console.log(`Already updated: ${filePath}`);
            return;
        }

        const newContent = `<!--
要翻译的文件：${githubBaseUrl}/${relativePath.replace(/\\/g, '/')}
Swift 文档源文件地址：${matchingUrl}
-->

${content}`;

        fs.writeFileSync(filePath, newContent);
        console.log(`Updated: ${filePath}`);
    } else {
        console.log(`No matching URL found for: ${filePath}`);
    }
}

// 开始处理
traverseDirectory(rootDir);
