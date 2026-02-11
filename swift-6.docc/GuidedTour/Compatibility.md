# 版本兼容性

了解在旧版本语言模式中可用的功能。

本书介绍了 Swift 6.2.3，这是 Xcode 26.2 中包含的默认 Swift 版本。你可以使用 Swift 6.2.3 编译器来构建 Swift 6.2.3、Swift 5、Swift 4.2 或 Swift 4 编写的代码。

当你使用 Swift 6.2.3 编译器构建使用 Swift 5 语言模式的代码时，你可以使用 Swift 6.2.3 的新功能 —— 这些功能要么默认启用，要么通过即将推出的功能标志启用。然而，要启用严格的并发检查，你需要升级到 Swift 6.2.3 语言模式。

此外，当你使用 Xcode 15.3 构建 Swift 4 和 Swift 4.2 代码时，大部分 Swift 5 的功能仍然可用。不过，以下更改仅适用于使用 Swift 5 语言模式或更高版本的代码：

- 返回不透明类型的函数需要 Swift 5.1 运行时。
- `try?` 表达式不会为已经返回可选值的表达式引入额外的可选层级。
- 大型整数字面量初始化表达式会被推断为正确的整数类型。例如，`UInt64(0xffff_ffff_ffff_ffff)` 会计算出正确的值而不是发生溢出。

并发功能需要 Swift 5 语言模式以及提供相应并发类型的 Swift 标准库版本。在 Apple 平台上，部署目标至少需要 iOS 13、macOS 10.15、tvOS 13、watchOS 6 或 visionOS 1。

用 Swift 6.2.3 编写的目标可以依赖 Swift 5、Swift 4.2 或 Swift 4 编写的目标，反之亦然。这意味着，如果你有一个大型项目并将其分为多个框架，你可以逐个框架地将代码迁移到更新的语言版本。

<!--
This source file is part of the Swift.org open source project

Copyright (c) 2014 - 2022 Apple Inc. and the Swift project authors
Licensed under Apache License v2.0 with Runtime Library Exception

See https://swift.org/LICENSE.txt for license information
See https://swift.org/CONTRIBUTORS.txt for the list of Swift project authors
-->
