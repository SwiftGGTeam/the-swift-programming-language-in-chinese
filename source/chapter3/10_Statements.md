# 语句

在 Swift 中，有两种类型的语句：简单语句和控制流语句。简单语句是最常见的，用于构造表达式和声明。控制流语句则用于控制程序执行的流程，Swift 中有三种类型的控制流语句：循环语句、分支语句和控制传递语句。

循环语句用于重复执行代码块；分支语句用于执行满足特定条件的代码块；控制传递语句则用于修改代码的执行顺序。在稍后的叙述中，将会详细地介绍每一种类型的控制流语句。

是否将分号(;)添加到语句的结尾处是可选的。但若要在同一行内写多条独立语句，请务必使用分号。

> GRAMMAR OF A STATEMENT

> *statement* → [*expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/expression)**;** *opt*

> *statement* → [*declaration*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/declaration)**;** *opt*

> *statement* → [*loop-statement*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/loop-statement)**;** *opt*

> *statement* → [*branch-statement*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/branch-statement)**;** *opt*

> *statement* → [*labeled-statement*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/labeled-statement)

> *statement* → [*control-transfer-statement*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/control-transfer-statement)**;** *opt*

> *statement* → [*statment*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/statement) [*statements*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/statements)**;** *opt*

## 循环语句

取决于特定的循环条件，循环语句允许重复执行代码块。Swift 提供四种类型的循环语句：`for`语句、`for-in`语句、`while`语句和`do-while`语句。

通过`break`语句和`continue`语句可以改变循环语句的控制流。有关这两条语句，请参考[*Break 语句*`待添加链接`]()和[*Continue 语句*`待添加链接`]()。

> GRAMMAR OF A LOOP STATEMENT

> *loop-statement* → [*for-statement*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/for-statement)

> *loop-statement* → [*for-in-statement*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/for-in-statement)

> *loop-statement* → [*while-statement*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/while-statement)

> *loop-statement* → [*do-while-statement*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/do-while-statement)

### For 语句

`for`语句允许在重复执行代码块的同时，递增一个计数器。

`for`语句的形式如下：
	
```swift
for `initialzation`; `condition`; `increment` {
	`statements`
}
```

*initialzation*、*condition*和*increment*之间的分号，以及包围在循环体*statements*的大括号都是不可省略的。

`for`语句的执行流程如下：

1. 执行*initialzation*，通常用于声明和初始化在接下来的循环中需要使用的变量。

2. 计算*condition*表达式：
	如果为真(`true`)，*statements*将会被执行，然后转到第3步。如果为假(`false`)，*statements*和*increment*都不会被执行，`for`至此执行完毕。

3. 执行*increment*表达式，然后转到第2步。

定义在*initialzation*中的变量仅在`for`语句的作用域以内有效。*condition*表达式的值的类型必须符合`LogicValue`协议。

> GRAMMAR OF A FOR STATEMENT

> *for-statement* → **for** [*for-init*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/for-init)*opt* **;** [*expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/expression)*opt* **;** [*expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/expression)*opt* [*code-block*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/code-block)

> *for-statement* → **for ( ** [*for-init*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/for-init)*opt* **;** [*expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/expression)*opt* **;** [*expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/expression)*opt* **)** [*code-block*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/code-block)

> *for-statement* → [*variable-declaration*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/variable-declaration) | [*expression-list*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/expression-list)

### For-In 语句

`for-in`语句允许在重复执行代码块的同时，迭代集合(或符合`Sequence`协议的任意类型)中的每一项。

`for-in`语句的形式如下：
	
```swift
for `item` in `collection` {
	`statements`
}
```

`for-in`语句在循环开始前会调用*collection*表达式的`generate`方法来获取一个生成器类型（这是一个符合`Generator`协议的类型）的值。接下来循环开始，调用*collection*表达式的`next`方法。如果其返回值不是`None`，它将会被赋给`item`，然后执行`statements`，执行完毕后回到循环开始处；否则，将不会赋值给`item`也不会执行`statements`，`for-in`至此执行完毕。

> GRAMMAR OF A FOR-IN STATEMENT

> *for-in-statement* → **for** [*pattern*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Patterns.html#//apple_ref/swift/grammar/pattern) **in** [*expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/expression) [*code-block*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/code-block)

### While 语句

`while`语句允许重复执行代码块。

`while`语句的形式如下：
	
```swift
while `condition` {
	`statements`
}
```

`while`语句的执行流程如下：

1. 计算*condition*表达式：
	如果为真(`true`)，转到第2步。如果为假(`false`)，`while`至此执行完毕。

2. 执行*statements*表达式，然后转到第1步。

由于*condition*的值在*statements*执行前就已计算出，因此*while*语句中的*statements*可能会被执行若干次，也可能不会被执行。

*condition*表达式的值的类型必须符合`LogicValue`协议。同时，*condition*表达式也可以套用可选绑定，请参考[可选绑定`待添加链接`]()。

> GRAMMAR OF A WHILE STATEMENT

> *while-statement* → **while** [*while-condition*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/while-condition) [*code-block*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/code-block)

> *while-condition* → [*expression*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/swift/grammar/expression) | [*declaration*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/declaration)

### Do-While 语句

`do-while`语句允许代码块被执行一次或多次。

`do-while`语句的形式如下：
	
```swift
do {
	`statements`
} while `condition`
```

`do-while`语句的执行流程如下：

1. 执行*statements*表达式，然后转到第2步。

2. 计算*condition*表达式：
	如果为真(`true`)，转到第1步。如果为假(`false`)，`do-while`至此执行完毕。

由于*condition*表达式的值是在*statements*表达式执行后才计算出，因此*do-while*语句中的*statements*至少会被执行一次。

*condition*表达式的值的类型必须符合`LogicValue`协议。同时，*condition*表达式也可以套用可选绑定，请参考[可选绑定`待添加链接`]()。

> GRAMMAR OF A DO-WHILE STATEMENT

> *do-while-statement* → **do** [*code-block*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/swift/grammar/code-block) **while** [*while-condition*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/swift/grammar/while-condition) 