《The Swift Programming Language》in Chinese
=============================================

中文版 Apple 官方 Swift 教程《The Swift Programming Language》

[英文原版在线版](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/index.html#//apple_ref/doc/uid/TP40014097-CH3-ID0)

[英文原版ePub版](https://swift.org/documentation/)

# 在线阅读

使用 Gitbook 制作，可以直接[在线阅读](http://swiftguide.cn/)。

# 当前阶段

Swift 4.2 翻译中，请到 issue 中认领章节。

- 更新到 Swift 3.0。 2016-09-23

# 贡献力量

如果想做出贡献的话，你可以：

- 帮忙校对，挑错别字、病句等等
- 提出修改建议
- 提出术语翻译建议


# 翻译建议

如果你愿意一起校对的话，请仔细阅读：

- 相关术语请严格按照术语表来翻译，如果实在有问题可以发 Issues 大家一起讨论
- 使用markdown进行翻译，文件名必须使用英文，因为中文的话gitbook编译的时候会出问题
- 翻译后的文档请放到source文件夹下的对应章节中，然后pull request即可，我会用gitbook编译成网页
- 工作分支为gh-pages，用于GitHub的pages服务
- fork过去之后新建一个分支进行翻译，完成后pull request这个分支，没问题的话我会合并到gh-pages分支中
- 有其他任何问题都欢迎发issue，我看到了会尽快回复
- 翻译排版格式要求参考 SwiftGG 博客翻译要求[详见](https://github.com/SwiftGGTeam/translation/blob/master/SwiftGG%20排版指南.md)
- 翻译流程参考 SwiftGG 博客翻译流程[详见](https://github.com/SwiftGGTeam/translation/blob/master/翻译流程详细说明.md#翻译)

谢谢！

# 关于术语

翻译术语的时候请参考这个对照表：

| 术语 | 备选翻译 |
| --- | --- |
| associatedtype | 关联类型 |
| range | 区间 |
| type property | 类型属性 |
| Unary operator | 一元运算符 |
| Binary operator | 二元运算符 |
| Ternary operator | 三元运算符 |
| Labeled Statement | 具名语句 |
| conform Protocol | 遵循协议 |
| availability-condition | 可用性条件 |
| fallthrough | 贯穿 |
| Branch Statement | 分支语句 |
| Control Transfer Statement | 控制传递语句 |
| Type Annotation | 类型标注 |
| Type Identifier | 类型标识符 |
| Metatype Type | 元类型 |
| Protocol Composition Type | 复合协议类型 |
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
| Implicitly Unwrapped optional | 隐式解包可选值 |
| Optional Binding | 可选绑定 |
| optional chaining | 可选链 |
| collection | 集合 |
| convention | 约定 |
| iterate | 迭代 |
| nest | 嵌套 |
| Inheritance | 继承 |
| override | 重写 |
| base class | 基类 |
| Designated Initializer | 指定构造器 |
| Convenience Initializer | 便利构造器 |
| Automatic Reference Counting | 自动引用计数 |
| type inference | 类型推断 |
| Type Casting | 类型转换 |
| unwrapped | 解包 |
| wrapped | 包装 |
| note | 注意 |
| closure | 闭包 |
| tuple | 元组 |
| first-class | 一等 |
| deinitializer | 析构器 |
| Initializer | 构造器 |
| initialization | 构造过程 |
| deinitialization | 析构过程 |
| getter | 不翻译 |
| setter | 不翻译 |
| subscript | 下标 |
| property | 属性 |
| attribute | 特性或者属性，根据上下文 |
| method | 方法 |
| Enumeration | 枚举 |
| Structure | 结构体 |
| Protocol | 协议 |
| Extension | 扩展 |
| Generic | 泛型 |
| literal value | 字面量 |
| alias | 别名 |
| Assertion | 断言 |

- 尽量保证和已翻译的内容一致
- 如果对术语参照表有疑问或者建议可以提 Issues 进行讨论
- 如果以上两条都没有找到合适的结果，请自己决定一个合适的翻译或者直接使用英文原文，后期校对的时候会进行统一

# Fork 工作流参考流程

有些朋友可能不太清楚如何帮忙翻译，我这里写一个简单的流程，大家可以参考一下：

1. 首先 fork 我的项目
2. 把 fork 过去的项目也就是你的项目 clone 到你的本地
3. 在命令行运行 `git branch develop` 来创建一个新分支
4. 运行 `git checkout develop` 来切换到新分支
5. 运行 `git remote add upstream https://github.com/numbbbbb/the-swift-programming-language-in-chinese.git` 把我的库添加为远端库
6. 运行 `git remote update`更新
7. 运行 `git fetch upstream gh-pages` 拉取我的库的更新到本地
8. 运行 `git rebase upstream/gh-pages` 将我的更新合并到你的分支

这是一个初始化流程，只需要做一遍就行，之后请一直在develop分支进行修改。

如果修改过程中我的库有了更新，请重复 6、7、8 步。

修改之后，首先 push 到你的库，然后登录 GitHub，在你的库的首页可以看到一个 `pull request` 按钮，点击它，填写一些说明信息，然后提交即可。

# 贡献历史

## 简体中文版贡献历史

1. Welcome To Swift 翻译贡献榜[详情](https://github.com/SwiftGGTeam/the-swift-programming-language-in-chinese/tree/gh-pages/source/chapter1/05_contributors.md)
2. Language Guide 翻译贡献榜[详情](https://github.com/SwiftGGTeam/the-swift-programming-language-in-chinese/blob/gh-pages/source/chapter2/27_contributors.md)

# 开源协议
基于[WTFPL](http://en.wikipedia.org/wiki/WTFPL)协议开源。
