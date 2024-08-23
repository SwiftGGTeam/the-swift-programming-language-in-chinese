# 关于语言索引

阅读 Swift 语言的 notation 说明

本书的这一部分介绍了 Swift 编程语言的相关语法。这里介绍的语法旨在帮助你更详细地了解 Swift 语言的特性，而不是让你直接实现相关的解析器或编译器。

与其他语言相比，Swift 语言还是比较轻量的，这是因为 Swift 代码里的很多常见类型、函数和运算符实际上是在 Swift 标准库中定义的。尽管这些类型、函数和运算符并不是 Swift 语言本身的一部分，但它们在本书的讨论和代码示例中被广泛使用。

## 如何阅读语法

Swift 编程语言的 notation 应当遵循以下的约定：

- 箭头（→）用于标记语法生成规则，可以理解为“可以由……组成”。
- 语法类别以*斜体*文本表示，并出现在语法生成规则的两边。
- 字面单词和标点符用**`加粗等宽字体`**表示，并仅出现在语法生成规则的右侧。
- 可选的语法生成规则由竖线（|）分隔。当可选的生成规则过长而难以阅读时，它们会被拆分为多行新的语法生成规则。
- 在少数情况下，普通字体文本用于描述语法生成规则右侧的内容。
- 可选的语法类别和字面量由后缀问号 *?* 标记。

例如，getter-setter 代码块的语法定义如下：

> Grammar of a getter-setter block:
>
> *getter-setter-block* → **`{`** *getter-clause* *setter-clause*_?_ **`}`** | **`{`** *setter-clause* *getter-clause* **`}`**

这个定义表明 getter-setter 代码块可以由一个 getter 子句后跟一个可选的 setter 子句构成，并用大括号括起来，*或者*由一个 setter 子句后跟一个 getter 子句构成，并用大括号括起来。上面的语法生成规则等价于以下两个生成规则，其中备选项也被明确列出：

> Grammar of a getter-setter block:
>
>*getter-setter-block* → **`{`** *getter-clause* *setter-clause*_?_ **`}`** 
> *getter-setter-block* → **`{`** *setter-clause* *getter-clause* **`}`**



> 测试版软件:
>
> 本文档包含有关正在开发的 API 或技术的初步信息。此信息可能会发生变化，根据本文档实施的软件应使用最终操作系统软件进行测试。
>
> 了解有关使用 [Apple 测试版软件](https://developer.apple.com/support/beta-software/) 的更多信息.

