> 翻译：[dabing1022](https://github.com/dabing1022)  
> 校对：[numbbbbb](https://github.com/numbbbbb)


# 关于语言附注
-----------------

本页内容包括：

- [如何阅读语法](#how_to_read_the_grammar)

本书的这一节描述了Swift编程语言的形式语法。这里描述的语法是为了帮助您更详细的了解该语言，而不是让您直接实现一个解析器或编译器。


Swift语言相对小点，这是由于在Swift代码中几乎无处不在的许多常见的的类型，函数以及运算符都由Swift标准库来定义。虽然这些类型，函数和运算符不是Swift语言本身的一部分，但是它们被广泛用于这本书的讨论和代码范例。

<a name="how_to_read_the_grammar"></a>
## 如何阅读语法

用来描述Swift编程语言形式语法的记法遵循下面几个约定：

-  箭头（→）用来标记语法产式，可以被理解为“可以包含”。
-  句法范畴由*斜体*文字表示，并出现在一个语法产式规则两侧。
-  义词和标点符号由粗体固定宽度的文本显示和只出现在一个语法产式规则的右边。
-  选择性的语法产式由竖线（|）分隔。当可选用的语法产式太多时，为了阅读方便，它们将被拆分为多行语法产式规则。
-  在少数情况下，常规字体文字用来描述语法产式规则的右边。
-  可选的句法范畴和文字用尾标`opt`来标记。

举个例子，getter-setter的语法块的定义如下：

> GRAMMAR OF A GETTER-SETTER BLOCK  
> *getter-setter-block* → {­ [*getter-clause*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/getter-clause) [­*setter-clause*­](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/setter-clause)*opt* ­}­ | {­ [*setter-clause*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/setter-clause) [­*getter-clause*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/getter-clause)­}­

这个定义表明，一个getter-setter方法​​块可以由一个getter子句后跟一个可选的setter子句构成，用大括号括起来，或者由一个setter子句后跟一个getter子句构成，用大括号括起来。上述的文法产生等价于下面的两个产生，明确阐明如何二中择一：

> GRAMMAR OF A GETTER-SETTER BLOCK  
> getter-setter-block → {­ [*getter-clause*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/getter-clause) [*­setter-clause*­](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/setter-clause)*opt* ­}­­  
> getter-setter-block → {­ [*setter-clause*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/setter-clause) [*­getter-clause*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/getter-clause)­}­
