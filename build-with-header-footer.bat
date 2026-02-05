@echo off
REM 构建带 header 和 footer 的中文版 Swift 文档

REM 设置输出目录
set OUTPUT_DIR=swift-book-cn

REM 进入项目根目录
cd /d "%~dp0"

REM 确保使用正确的 header 文件（如果需要不同的版本可以修改）
REM copy /Y swift-6.docc\header-publish.html swift-6.docc\header.html

REM 使用 DocC 构建文档，启用自定义模板支持
xcrun docc convert ^
    --experimental-enable-custom-templates ^
    --hosting-base-path swift-book ^
    --output-path "%OUTPUT_DIR%" ^
    swift-6.docc

echo.
echo 构建完成！输出目录：%OUTPUT_DIR%
echo 可以使用 docc preview 预览或直接在浏览器中打开
pause
