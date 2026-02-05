@echo off
REM Swift 中文版文档发布脚本 - Windows 版本
REM 发布到 GitHub Pages

echo 正在发布中文版 Swift 文档到 GitHub Pages...
echo.

REM 获取当前提交哈希
for /f "delims=" %%i in ('git rev-parse --short HEAD') do set COMMIT_HASH=%%i

REM 检查 gh-pages 分支是否存在
git show-ref --verify --quiet refs/heads/gh-pages
if %errorlevel% neq 0 (
    echo gh-pages 分支不存在，正在创建...
    git checkout --orphan gh-pages
    git rm -rf .
    echo # GitHub Pages for Swift Chinese Documentation > README.md
    git add README.md
    git commit -m "Initialize gh-pages branch"
    git push -u origin gh-pages
    git checkout main
    echo gh-pages 分支已创建！
)

REM 创建临时输出目录
set TEMP_OUTPUT=gh-pages-temp
if exist %TEMP_OUTPUT% rmdir /s /q %TEMP_OUTPUT%
mkdir %TEMP_OUTPUT%

REM 构建文档
echo 正在构建文档...
xcrun docc convert ^
    --experimental-enable-custom-templates ^
    --hosting-base-path the-swift-programming-language-in-chinese-1 ^
    --output-path "%TEMP_OUTPUT%" ^
    swift-6.docc

if %errorlevel% neq 0 (
    echo 构建失败！
    pause
    exit /b 1
)

REM 切换到 gh-pages 分支
echo 正在切换到 gh-pages 分支...
git checkout gh-pages

REM 清空 docs 目录并复制新文件
if exist docs rmdir /s /q docs
mkdir docs
xcopy /E /I /Y "%TEMP_OUTPUT%" docs

REM 提交更改
git add docs
git diff-index --quiet HEAD --
if %errorlevel% neq 0 (
    echo 发现文档更新，正在提交...
    git commit -m "更新 GitHub Pages 文档站点到提交 %COMMIT_HASH%"
    git push origin gh-pages
    echo 发布成功！
) else (
    echo 没有发现文档更改。
)

REM 切回主分支
git checkout main

REM 清理临时文件
rmdir /s /q %TEMP_OUTPUT%

echo.
echo 完成！GitHub Pages 地址：
echo https://你的用户名.github.io/the-swift-programming-language-in-chinese-1/docs/documentation/the-swift-programming-language
echo.
pause
