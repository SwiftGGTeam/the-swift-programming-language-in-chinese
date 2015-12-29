# 关于语言参考（About the Language Reference）
-----------------

> 1.0
> 翻译：[dabing1022](https://github.com/dabing1022)
> 校对：[numbbbbb](https://github.com/numbbbbb)

> 2.0
> 翻译+校对：[KYawn](https://github.com/KYawn)

本页内容包括：

- [如何阅读语法](#how_to_read_the_grammar)

本书的这一节描述了 Swift 编程语言的形式语法。这里描述的语法是为了帮助您更详细地了解该语言，而不是让您直接实现一个解析器或编译器。

Swift 语言相对较小，这是由于 Swift 代码中的几乎所有常见类型、函数以及运算符都已经在 Swift 标准库中定义了。虽然这些类型、函数和运算符并不是 Swift 语言自身的一部分，但是它们被广泛应用于本书的讨论和代码范例中。

<a name="how_to_read_the_grammar"></a>
## 如何阅读语法

用来描述 Swift 编程语言形式语法的符号遵循下面几个约定：

-  箭头（`→`）用来标记语法产式，可以理解为“可由……构成”。
-  斜体文字用来表示句法类型，并出现在一个语法产式规则两侧。
-  关键字和标点符号由固定宽度的粗体文本表示，只出现在一个语法产式规则的右侧。
-  可供选择的语法产式由竖线（`|`）分隔。当可选用的语法产式太多时，为了阅读方便，它们将被拆分为多行语法产式规则。
-  少数情况下，语法产式规则的右侧会有用于描述的常规字体文字。
-  可选的句法类型和字面值用尾标 `opt` 来标记。

举个例子，getter-setter 的语法块的定义如下：

> getter-setter 方法块语法  
> *getter-setter 方法块* → { [*getter 子句*](05_Declarations.html#getter-clause) [*setter 子句*](05_Declarations.html#setter-clause)<sub>可选</sub> } | { [*setter 子句*](05_Declarations.html#setter-clause) [*getter 子句*](05_Declarations.html#getter-clause) }

这个定义表明，一个 getter-setter 方法块可以由一个 getter 子句后跟一个可选的 setter 子句构成，然后用大括号括起来，或者由一个 setter 子句后跟一个 getter 子句构成，然后用大括号括起来。下面的两个语法产式等价于上述的语法产式，并明确指出了如何取舍：

> getter-setter 方法块语法  
> getter-setter 方法块 → { [*getter 子句*](05_Declarations.html#getter-clause)  [*setter 子句*](05_Declarations.html#setter-clause)<sub>可选</sub> }  
> getter-setter 方法块 → { [*setter 子句*](05_Declarations.html#setter-clause) [*getter 子句*](05_Declarations.html#getter-clause) }
