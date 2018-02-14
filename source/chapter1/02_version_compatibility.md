# 版本兼容性
-----------------
 
> 4.0
> 
> 翻译：[muhlenXi](https://github.com/muhlenxi)  2017-09-25

本书描述的是 Swift 4.0，是 Xcode 9 中包含的默认版本。你可以用 Xcode 9 来构建用 Swift 4 或 Swift 3 写的项目。

> 注意
> 当 Swift 4 编译器编译 Swift 3 版本的代码时，它识别的语言版本为 3.2 版本。因此，你可以使用像 `#if swift(>=3.2)` 条件编译块来编写多版本编译器可以并存的代码。

当你用 Xcode 编译 Swift 3 的代码，Swift 4 中大部分功能是可以使用的。也就是说，下面的功能仅仅是 Swift 4 的代码中可以使用：

* 字符串的子串操作返回的实例是 `Substring` 类型，不再是 `String` 类型。
* 在一些地方显式的添加 `@objc` 属性。
* 同一文件中一个类型的 extension 可以访问这个类型的 private 属性。

用 Swift 4 写的项目可以依赖用 Swift 3 写的项目，反之亦然。这意味着，如果你将一个大的项目分解成多个框架（framework），你可以依次迁移每个框架到 Swift 4。
