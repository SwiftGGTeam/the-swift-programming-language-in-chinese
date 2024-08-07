const axios = require('axios');

// GitHub API 配置
const API_URL = "https://api.github.com";
const REPO_OWNER = "SwiftGGTeam";
const REPO_NAME = "the-swift-programming-language-in-chinese";
const BRANCH = "swift-6-beta-translation";

// TODO: 请在运行脚本之前设置您的个人访问令牌
const TOKEN = process.env.GITHUB_TOKEN;

// 设置请求头
const headers = {
    "Authorization": `token ${TOKEN}`,
    "Accept": "application/vnd.github.v3+json"
};

async function getExistingIssues() {
    const issues = new Set();
    let page = 1;
    while (true) {
        const url = `${API_URL}/repos/${REPO_OWNER}/${REPO_NAME}/issues?state=all&per_page=100&page=${page}`;
        const response = await axios.get(url, { headers });
        if (response.data.length === 0) break;
        response.data.forEach(issue => issues.add(issue.title));
        page++;
    }
    return issues;
}

async function createIssue(title, body, labels, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            const url = `${API_URL}/repos/${REPO_OWNER}/${REPO_NAME}/issues`;
            const data = { title, body, labels };
            const response = await axios.post(url, data, { headers });

            if (response.status === 201) {
                console.log(`Issue created successfully: ${title}`);
                return response.data;
            }
        } catch (error) {
            console.error(`Error creating issue (attempt ${i + 1}):`, error.message);
            if (i === retries - 1) throw error;
            await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1))); // 等待时间递增
        }
    }
    return null;
}

async function getFilesInDirectory(path) {
    try {
        const url = `${API_URL}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}?ref=${BRANCH}`;
        const response = await axios.get(url, { headers });
        if (response.status === 200) {
            return response.data.filter(item => item.type === "file" && item.name.endsWith('.md'));
        } else {
            console.log(`Failed to get directory contents: ${response.status}`);
            return [];
        }
    } catch (error) {
        console.error("Error getting directory contents:", error.message);
        return [];
    }
}

function formatIssueTitle(filePath) {
    const parts = filePath.split('/');
    const fileName = parts.pop().toLowerCase().replace('.md', '');
    const folderName = parts[parts.length - 1];
    return `${folderName} / ${fileName}.md`;
}

function formatIssueBody(filePath) {
    const fileUrl = `https://github.com/${REPO_OWNER}/${REPO_NAME}/blob/${BRANCH}/${filePath}`;
    return `翻译文件：${fileUrl}\n请在认领任务前查看 Markdown 文件内容，并了解对应的 Swift 原文档链接和翻译预估时长`;
}

async function processDirectory(path, existingIssues) {
    const files = await getFilesInDirectory(path);
    for (const file of files) {
        const issueTitle = formatIssueTitle(file.path);
        if (!existingIssues.has(issueTitle)) {
            const issueBody = formatIssueBody(file.path);
            await createIssue(issueTitle, issueBody, ["Swift 6 beta translation"]);
        } else {
            console.log(`Issue already exists: ${issueTitle}`);
        }
    }
}

async function main() {
    const existingIssues = await getExistingIssues();
    console.log(`Found ${existingIssues.size} existing issues.`);

    const directories = [
        "swift-6-beta.docc/GuidedTour",
        "swift-6-beta.docc/LanguageGuide",
        "swift-6-beta.docc/ReferenceManual"
    ];

    for (const dir of directories) {
        await processDirectory(dir, existingIssues);
    }
}

main().catch(console.error);
