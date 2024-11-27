const simpleGit = require('simple-git');
const fs = require('fs').promises;
const path = require('path');

async function generateContributors() {
  const git = simpleGit();

  // 获取所有文件列表
  const files = await git.raw(['ls-files', 'swift-6.docc/**/*']);
  const fileList = files.split('\n').filter(Boolean);

  // 统计每个贡献者的信息
  const contributors = new Map();

  // 对每个文件进行统计
  for (const file of fileList) {
    // 获取每个文件的详细提交记录
    const blame = await git.raw(['blame', '--line-porcelain', file]);
    const lines = blame.split('\n');

    for (const line of lines) {
      if (line.startsWith('author ')) {
        const author = line.substring(7);

        if (!contributors.has(author)) {
          contributors.set(author, {
            name: author,
            lines: 0
          });
        }

        contributors.get(author).lines++;
      }
    }
  }

  // 生成 Markdown 内容
  let markdown = '# 贡献者\n\n';

  // 添加表格头
  markdown += '| 贡献者 | 贡献行数 |\n';
  markdown += '| :--- | ---: |\n';

  // 按贡献行数排序
  const sortedContributors = Array.from(contributors.values())
    .sort((a, b) => b.lines - a.lines);

  // 生成表格内容
  for (const contributor of sortedContributors) {
    markdown += `| ${contributor.name} | ${contributor.lines} |\n`;
  }

  // 更新 Contributors.md 文件
  await fs.writeFile(
    path.join(process.cwd(), 'swift-6.docc/Contributing/Contributors.md'),
    markdown,
    'utf-8'
  );

  console.log('已更新贡献者列表');
}

generateContributors().catch(console.error); 
