@echo off
REM 预览带 header 和 footer 的中文版 Swift 文档

REM 进入项目根目录
cd /d "%~dp0"

echo 正在启动 DocC 预览服务器（带 header 和 footer）...
echo 注意：必须使用 --experimental-enable-custom-templates 参数
echo.

REM 使用 DocC 预览，启用自定义模板支持
xcrun docc preview swift-6.docc ^
    --experimental-enable-custom-templates

REM 如果 xcrun 不可用，尝试直接使用 docc
REM docc preview swift-6.docc --experimental-enable-custom-templates
