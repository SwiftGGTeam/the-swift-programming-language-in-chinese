# 发布到 GitHub Pages 指南

## 快速开始

### 方法 1：使用 Windows 脚本（推荐）

直接运行：
```
bin\publish-to-github-pages.bat
```

### 方法 2：使用 Bash 脚本（Git Bash / WSL）

```bash
chmod +x bin/publish-to-github-pages
./bin/publish-to-github-pages
```

## 首次设置

### 1. 确保 GitHub Pages 已启用

1. 打开你的 GitHub 仓库设置
2. 进入 **Settings** → **Pages**
3. 在 **Source** 下选择：
   - Branch: `gh-pages`
   - Folder: `/docs` 或 `/ (root)`
4. 点击 **Save**

### 2. 调整 hosting-base-path

在脚本中找到这一行：
```bash
--hosting-base-path the-swift-programming-language-in-chinese-1
```

改为你的**仓库名称**（如果仓库名不同的话）。

### 3. 第一次运行

脚本会自动：
1. 创建 `gh-pages` 分支（如果不存在）
2. 使用 `--experimental-enable-custom-templates` 构建文档
3. 将构建结果复制到 `gh-pages` 分支的 `docs` 目录
4. 提交并推送到 GitHub

## 访问你的文档

发布成功后，访问：
```
https://你的用户名.github.io/the-swift-programming-language-in-chinese-1/docs/documentation/the-swift-programming-language
```

## 关键差异说明

相比原版脚本的修改：
- ✅ `TSPL.docc` → `swift-6.docc`（中文版目录）
- ✅ 添加 `--experimental-enable-custom-templates`（启用 header/footer）
- ✅ 移除了 redirects 复制（如果你不需要）
- ✅ 调整了 `--hosting-base-path` 为你的仓库名

## 本地预览（推荐先测试）

发布前建议先本地预览：
```bash
# 使用之前创建的预览脚本
preview-with-header-footer.bat
```

或手动：
```bash
docc preview swift-6.docc --experimental-enable-custom-templates
```

## 故障排除

### 问题：没有看到 header 和 footer
**解决**：确保构建命令包含 `--experimental-enable-custom-templates`

### 问题：页面 404
**解决**：
1. 检查 GitHub Pages 设置中的分支和文件夹
2. 确认 `--hosting-base-path` 与仓库名匹配
3. 等待几分钟让 GitHub Pages 部署

### 问题：样式不正确
**解决**：检查 `swift-6.docc/header.html` 和 `footer.html` 中的资源路径

## 自动化部署（可选）

可以设置 GitHub Actions 自动发布。需要时可以参考官方仓库的 workflow 配置。
