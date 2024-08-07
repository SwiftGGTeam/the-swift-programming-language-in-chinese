# The Swift Programming Language (Simplified Chinese Version by SwiftGG)

This repository contains the source for *The Swift Programming Language*
(sometimes abbreviated as TSPL),
which is published on [docs.swift.org][published]
and built using [Swift-DocC][docc].

This repository includes the latest version of TSPL, as well as Simplified Chinese translations corresponding to different Swift versions.

## Building

Clone this repository and run `docc preview swift-6-beta-translation.docc`
in this repository's root directory.

After running DocC, open the link that `docc` outputs
to display a local preview in your browser.

## Current Status

- Latest English version of The Swift Programming Language. [Latest commit: 11a2b29][11a2b29]
- Corresponding Simplified Chinese translations (in progress and archived):
  - Swift 6 beta (currently in translation)
  - Swift 5.x and earlier versions (available for reading on [GitBook][legacy-documentations])

## How to Contribute

1. Fork this repository to your account. Claim a translation task labeled as `Swift x translation` in the issues. Create a branch in your forked repository corresponding to the issue, setting the source branch to the current Swift version being translated (e.g., swift-6-beta-translation).

2. Install the `docc` command-line tool by either downloading the toolchain from Swift.org or installing Xcode.

   > Note:
   >
   > If you installed DocC by downloading a toolchain from Swift.org,
   > `docc` is located in `usr/bin/`,
   > relative to the installation path of the toolchain.
   > Make sure your shell's `PATH` environment variable
   > includes that directory.
   >
   > If you installed DocC by downloading Xcode,
   > run `xcrun docc preview swift-6-beta-translation.docc` instead.

3. Replace the content of the original Markdown file with your Chinese translation, following the terminology table below and the [SwiftGG style guide][swiftgg-style-guide]. Submit your translation through a Pull Request. Once verified by SwiftGG members, it will be merged into the current translation branch.

## Terminology Table

| Term | Suggest Transition |
| --- | --- |
| result builder | 结果构造器 |
| property wrapper | 属性包装器 |
| projected value | 被呈现值 |
| wrapped value | 被包装值 |
| argument | 实参 |
| parameter | 形参 |
| variadic parameters| 可变参数 |
| associated type | 关联类型 |
| range | 区间 |
| type property | 类型属性 |
| unary operator | 一元运算符 |
| binary operator | 二元运算符 |
| ternary operator | 三元运算符 |
| labeled statement | 具名语句 |
| conform protocol | 遵循协议 |
| availability-condition | 可用性条件 |
| fallthrough | 贯穿 |
| branch statement | 分支语句 |
| control transfer statement | 控制传递语句 |
| type annotation | 类型注解 |
| type identifier | 类型标识符 |
| metatype type | 元类型 |
| protocol composition type | 复合协议类型 |
| associated value | 关联值 |
| raw value | 原始值 |
| computed property | 计算属性 |
| stored property | 存储属性 |
| operator | 运算符 |
| playground | 不翻译 |
| array | 数组 |
| dictionary | 字典 |
| list | 列表 |
| statement | 语句 |
| expression | 表达式 |
| optional | 可选 |
| implicitly unwrapped optional | 隐式解包可选值 |
| optional binding | 可选绑定 |
| optional chaining | 可选链 |
| collection | 集合 |
| convention | 约定 |
| iterate | 迭代 |
| nest | 嵌套 |
| inheritance | 继承 |
| override | 重写 |
| base class | 基类 |
| designated initializer | 指定构造器 |
| convenience initializer | 便利构造器 |
| automatic reference counting | 自动引用计数 |
| type inference | 类型推断 |
| type casting | 类型转换 |
| unwrapped | 解包 |
| wrapped | 包装 |
| note | 注意 |
| closure | 闭包 |
| tuple | 元组 |
| first-class | 一等 |
| deinitializer | 析构器 |
| initializer | 构造器 |
| initialization | 构造过程 |
| deinitialization | 析构过程 |
| getter | 不翻译 |
| setter | 不翻译 |
| subscript | 下标 |
| property | 属性 |
| attribute | 特性或者属性，根据上下文 |
| method | 方法 |
| enumeration | 枚举 |
| structure | 结构体 |
| protocol | 协议 |
| extension | 扩展 |
| generic | 泛型 |
| literal value | 字面量 |
| alias | 别名 |
| assertion | 断言 |
| conditional compilation | 条件编译 |
| opaque type | 不透明类型 |
| function | 函数 |
| runtime | 运行时 |

## Contributors

We extend our heartfelt thanks to all our contributors. You can find the [list of contributors here][contributors].

[published]: https://docs.swift.org/swift-book/documentation/the-swift-programming-language/
[docc]: https://github.com/apple/swift-docc
[11a2b29]: https://github.com/swiftlang/swift-book/commit/11a2b29983e9401c179d6269c9becc1256b11bc6
[legacy-documentations]: https://swiftgg.gitbook.io/swift/
[swiftgg-style-guide]: https://github.com/SwiftGGTeam/translation/blob/master/SwiftGG%20排版指南.md
[contributors]: https://github.com/SwiftGGTeam/the-swift-programming-language-in-chinese/blob/gh-pages/source/contributors.md
