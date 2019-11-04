# 版本兼容性

本书描述的是在 Xcode 11 中的默认 Swift 版本 Swift 5.1。你可以使用 Xcode11 来构建 Swift 5.1、Swift 4.2 或 Swift 4 写的项目。

当您使用 Xcode 11 构建 Swift 4 和 Swift 4.2 代码时，Swift 5.1 的大多数功能都适用。但以下功能仅支持 Swift 5.1 或更高版本:

* 返回值是不透明类型的函数依赖 Swift 5.1 运行时。
* **try?** 表达式不会为已返回可选类型的代码引入额外的可选类型层级。
* 大数字的整型字面量初始化代码的类型将会被正确推导，例如 **UInt64(0xffff_ffff_ffff_ffff)** 将会被推导为整型类型而非溢出。

用 Swift 5.1 写的项目可以依赖用 Swift 4.2 或 Swift 4 写的项目，反之亦然。这意味着，如果你将一个大的项目分解成多个框架（framework），你可以逐个地将框架从 Swift 4 代码迁移到 Swift 5.1。
