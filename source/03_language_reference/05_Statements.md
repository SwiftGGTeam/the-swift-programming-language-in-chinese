# 语句（Statements）{#statement-statements}

在 Swift 中，有三种类型的语句：简单语句、编译器控制语句和控制流语句。简单语句是最常见的，用于构造表达式或者声明。编译器控制语句允许程序改变编译器的行为，包含编译配置语句和行控制语句。

控制流语句则用于控制程序执行的流程，Swift 中有多种类型的控制流语句：循环语句、分支语句和控制转移语句。循环语句用于重复执行代码块；分支语句用于执行满足特定条件的代码块；控制转移语句则用于改变代码的执行顺序。另外，Swift 提供了 `do` 语句，用于构建局部作用域，还用于错误的捕获和处理；还提供了 `defer` 语句，用于退出当前作用域之前执行清理操作。

是否将分号（`;`）添加到语句的末尾是可选的。但若要在同一行内写多条独立语句，则必须使用分号。

> 语句语法
> 
> *语句* → [表达式](./04_Expressions.md#expression) **;**<sub>可选</sub>
> 
> *语句* → [声明](./06_Declarations.md#declaration) **;**<sub>可选</sub>
> 
> *语句* → [循环语句](#loop-statement) **;**<sub>可选</sub>
> 
> *语句* → [分支语句](#branch-statement) **;**<sub>可选</sub>
> 
> *语句* → [带标签的语句](#labeled-statement) **;**<sub>可选</sub>
> 
> *语句* → [控制转移语句](#control-transfer-statement) **;**<sub>可选</sub>
> 
> *语句* → [defer 语句](#defer-statement) **;**<sub>可选</sub>
> 
> *语句* → [do 语句](#do-statement) **:**<sub>可选</sub>
> 
> *语句* → [编译器控制语句](#compiler-control-statement)
> 
> *多条语句* → [语句](#statement) [多条语句](#statements)<sub>可选</sub>

## 循环语句 {#loop-statements}
循环语句会根据特定的循环条件来重复执行代码块。Swift 提供三种类型的循环语句：`for-in` 语句、`while` 语句和 `repeat-while` 语句。

通过 `break` 语句和 `continue` 语句可以改变循环语句的控制流。有关这两条语句，详情参阅 [Break 语句](#break-statement) 和 [Continue 语句](#continue-statement)。

> 循环语句语法
> 
>

#### loop-statement {#loop-statement}
> *循环语句* → [for-in 语句](#for-in-statement)
> 
> *循环语句* → [while 语句](#while-statement)
> 
> *循环语句* → [repeat-while 语句](#repeat-while-statement)
> 

### For-In 语句 {#for-in-statements}

`for-in` 语句会为集合（或实现了 [Sequence](https://developer.apple.com/documentation/swift/sequence) 协议的任意类型）中的每一项执行一次代码块。

`for-in` 语句的形式如下：

```swift
for item in collection {
    statements
}
```

`for-in` 语句在循环开始前会调用集合表达式（`collection expression`）的 `makeIterator()` 方法来获取一个实现了 [IteratorProtocol](https://developer.apple.com/documentation/swift/iteratorprotocol) 协议的迭代器类型。接下来循环开始，反复调用该迭代器的 `next()` 方法。如果其返回值不是 `nil`，它将会被赋给 `item`，然后执行循环体语句，执行完毕后回到循环开始处，继续重复这一过程；否则，既不会赋值也不会执行循环体语句，`for-in` 语句至此执行完毕。

> for-in 语句语法
> 
>

#### for-in-statement {#for-in-statement}
> *for-in 语句* → **for** **case**<sub>可选</sub> [模式](./08_Patterns.md#pattern) **in** [表达式](./04-Expressions.md#expression) [where 子句](#where-clause)<sub>可选</sub> [代码块](05-Declarations.md#code-block)
> 

### While 语句 {#while-statements}
只要循环条件为真，`while` 语句就会重复执行代码块。

`while` 语句的形式如下：

```swift
while condition {
    statements
}
```

`while` 语句的执行流程如下：

1. 判断条件（`condition`）的值。如果为 `true`，转到第 2 步；如果为 `false`，`while` 语句至此执行完毕。
2. 执行循环体中的语句，然后重复第 1 步。

由于会在执行循环体中的语句前判断条件的值，因此循环体中的语句可能会被执行若干次，也可能一次也不会被执行。

条件的结果必须是 Bool 类型或者 Bool 的桥接类型。另外，条件语句也可以使用可选绑定，请参阅 [可选绑定](../02_language_guide/01_The_Basics.md#optional-binding)。

> while 语句语法
> 
>

#### while-statement {#while-statement}
> *while 语句* → **while** [条件子句](#condition-clause) [代码块](./05-Declarations.md#code-block)
> 


#### condition-clause {#condition-clause}
> *条件子句* → [表达式](./04_Expressions.md#expression)  | [表达式](./04-Expressions.md#expression) **,** [条件列表](#condition-list)
> 

#### condition {#condition}
> *条件* → [表达式](./04_Expressions.md#expression) |[可用性条件](#availability-condition) | [case 条件](#case-condition) | [可选绑定条件](#optional-binding-condition)
> 
>

#### case-condition {#case-condition}
> *case 条件* → **case** [模式](./08_Patterns.md#pattern) [构造器](./06-Declarations.md#initializer)
> 

#### optional-binding-condition {#optional-binding-condition}
> *可选绑定条件* →  **let** [模式](./08_Patterns.md#pattern) [构造器](./06-Declarations.md#initializer) | **var**  [模式](./08-Patterns.md#pattern) [构造器](./06-Declarations.md#initializer)
> 

### Repeat-While 语句 {#repeat-while-statements}
`repeat-while` 语句至少执行一次代码块，之后只要循环条件为真，就会重复执行代码块。

`repeat-while` 语句的形式如下：

```swift
repeat {
    statements
} while condition
```

`repeat-while` 语句的执行流程如下：

1. 执行循环体中的语句，然后转到第 2 步。
2. 判断条件的值。如果为 `true`，重复第 1 步；如果为 `false`，`repeat-while` 语句至此执行完毕。

由于条件的值是在循环体中的语句执行后才进行判断，因此循环体中的语句至少会被执行一次。

条件的结果必须是 Bool 类型或者 Bool 的桥接类型。另外，条件语句也可以使用可选绑定，请参阅 [可选绑定](../02_language_guide/01_The_Basics.md#optional-binding)。

> repeat-while 语句语法
> 
>

#### repeat-while-statement {#repeat-while-statement}
> *repeat-while 语句* → **repeat** [代码块](./06_Declarations.md#code-block) **while** [表达式](./04-Expressions.md#expression)
> 

## 分支语句 {#branch-statements}
分支语句会根据一个或者多个条件来执行指定部分的代码。分支语句中的条件将会决定程序如何分支以及执行哪部分代码。Swift 提供三种类型的分支语句：`if` 语句、 `guard` 语句和 `switch` 语句。

`if` 语句和 `switch` 语句中的控制流可以用 `break` 语句改变，请参阅 [Break 语句](#break-statement)。

> 分支语句语法
> 
>

#### branch-statement {#branch-statement}
> *分支语句* → [if 语句](#if-statement)
> 
> *分支语句* → [guard 语句](#guard-statement)
> 
> *分支语句* → [switch 语句](#switch-statement)
> 

### If 语句 {#if-statements}
`if` 语句会根据一个或多个条件来决定执行哪一块代码。

`if` 语句有两种基本形式，无论哪种形式，都必须有花括号。

第一种形式是当且仅当条件为真时执行代码，像下面这样：

```swift
if condition {
    statements
}
```

第二种形式是在第一种形式的基础上添加 `else` 语句（通过引入 `else` 关键字），并且用于：当条件为真时执行一部分代码，当这同一个条件为假的时候执行另一部分代码。当只有一个 `else` 语句时，`if` 语句具有以下的形式：

```swift
if condition {
    statements to execute if condition is true
} else {
    statements to execute if condition is false
}
```

`if` 语句的 `else` 语句也可包含另一个 `if` 语句，从而形成一条链来测试更多的条件，像下面这样：

```swift
if condition 1 {
    statements to execute if condition 1 is true
} else if condition 2 {
    statements to execute if condition 2 is true
} else {
    statements to execute if both conditions are false
}
```

`if` 语句中条件的结果必须是 Bool 类型或者 Bool 的桥接类型。另外，条件语句也可以使用可选绑定，请参阅 [可选绑定](../02_language_guide/01_The_Basics.md#optional-binding)。

> if 语句语法
> 
>

#### if-statement {#if-statement}
> *if 语句* → **if** [条件子句](#condition-clause) [代码块](05-Declarations.md#code-block) [else 子句](#else-clause)<sub>可选</sub>
> 

#### else-clause {#else-clause}
> *else 子句* → **else** [代码块](./06_Declarations.md#code-block) | **else** [if 语句](#if-statement)

### Guard 语句 {#guard-statements}
如果一个或者多个条件不成立，可用 `guard` 语句来退出当前作用域。

`guard` 语句的格式如下：

```swift
guard condition else {
    statements
}
```

`guard` 语句中条件的结果必须是 Bool 类型或者 Bool 的桥接类型。另外，条件也可以是一条可选绑定，请参阅 [可选绑定](../02_language_guide/01_The_Basics.md#optional-binding)。

在 `guard` 语句中进行可选绑定的任何常量或者变量，其可用范围从声明开始直到作用域结束。

`guard` 语句必须有 `else` 子句，而且必须在该子句中调用返回类型是 `Never` 的函数，或者使用下面的语句退出当前作用域：

 *  `return`
 *  `break`
 *  `continue`
 *  `throw`

关于控制转移语句，请参阅 [控制转移语句](#control-transfer-statements)。关于 `Never` 返回类型的函数，请参阅 [永不返回的函数](05-Declarations.md#rethrowing-functions-and-methods)。

> guard 语句语法
> 
>

#### guard-statement {#guard-statement}
> *guard 语句* → **guard** [条件子句](#condition-clause) **else** [代码块](05-Declarations.md#code-block)

### Switch 语句 {#switch-statements}

`switch` 语句会根据控制表达式的值来决定执行哪部分代码。

`switch` 语句的形式如下：

```swift
switch control expression {
case pattern 1:
    statements
case pattern 2 where condition:
    statements
case pattern 3 where condition,
     pattern 4 where condition:
    statements
default:
    statements
}
```

`switch` 语句会先计算*控制表达式*的值，然后与每一个 `case` 的模式进行匹配。如果匹配成功，程序将会执行对应的 `case` 中的语句。另外，每一个 `case` 的作用域都不能为空，也就是说在每一个 `case` 的冒号（`:`）后面必须至少有一条语句。如果你不想在匹配到的 `case` 中执行代码，只需在该 `case` 中写一条 `break` 语句即可。

可以用作控制表达式的值是十分灵活的。除了标量类型外，如 `Int`、`Character`，你可以使用任何类型的值，包括浮点数、字符串、元组、自定义类型的实例和可选类型。控制表达式的值还可以用来匹配枚举类型中的成员值或是检查该值是否包含在指定的 `Range` 中。关于如何在 `switch` 语句中使用这些类型，请参阅 [控制流](../02_language_guide/05_Control_Flow.md) 一章中的 [Switch](../02_language_guide/05_Control_Flow.md#switch)。

每个 `case` 的模式后面可以有一个 `where` 子句。`where` 子句由 `where` 关键字紧跟一个提供额外条件的表达式组成。因此，当且仅当控制表达式匹配一个 `case` 的模式且 `where` 子句的表达式为真时，`case` 中的语句才会被执行。在下面的例子中，控制表达式只会匹配包含两个相等元素的元组，例如 `(1, 1)`：

```swift
case let (x, y) where x == y:
```

正如上面这个例子，也可以在模式中使用 `let`（或 `var`）语句来绑定常量（或变量）。这些常量（或变量）可以在对应的 `where` 子句以及 `case` 中的代码中使用。但是，如果一个 `case` 中含有多个模式，所有的模式必须包含相同的常量（或变量）绑定，并且每一个绑定的常量（或变量）必须在所有的条件模式中都有相同的类型。

`switch` 语句也可以包含默认分支，使用 `default` 关键字表示。只有所有 `case` 都无法匹配控制表达式时，默认分支中的代码才会被执行。一个 `switch` 语句只能有一个默认分支，而且必须在 `switch` 语句的最后面。

`switch` 语句中 `case` 的匹配顺序和源代码中的书写顺序保持一致。因此，当多个模式都能匹配控制表达式时，只有第一个匹配的 `case` 中的代码会被执行。

#### Switch 语句必须是详尽的

在 Swift 中，`switch` 语句中控制表达式的每一个可能的值都必须至少有一个 `case` 与之对应。在某些无法面面俱到的情况下（例如，表达式的类型是 `Int`），你可以使用 `default` 分支满足该要求。

#### 对未来枚举的 `case` 进行 `switch` {#future-case}
非冻结枚举（`nonfronzen enumeration`）是一种特殊的枚举类型，它可能在未来会增加新的枚举 `case`，即使这时候你已经编译并且发布了你的应用，所以在 switch 非冻结枚举前需要深思熟虑。当一个库的作者们把一个枚举标记为非冻结的，这意味着他们保留了增加新的枚举 `case` 的权利，并且任何和这个枚举交互的代码都*必须*在无需重新编译的条件下能够处理那些未来可能新加入的 `case` 。只有演进模式的库代码、标准库代码、用 Swift 实现的 Apple 框架、C 以及 Objective-C 代码才能够声明非冻结枚举。更多关于冻结和非冻结枚举的内容，请参阅 [冻结](./07_Attributes.md#frozen)。

当你对未来枚举进行 switch 时，你总是需要有一个 `default case`，即使每种枚举类型都已经有对应的 `case` 了。你可以在 default 前标注 `@unknown`，意思是这个 `case` 应该只匹配未来加入的枚举 `case`。如果你的 `default case` 中匹配了任何在编译时就能确定的枚举 `case`，Swift 会抛出一个警告。这可以很好地提醒你库的作者已经新增了一种 `case`，并且你还没有去处理。

以下就是一个例子，我们对标准库的 [Mirror.AncestorRepresentation](https://developer.apple.com/documentation/swift/mirror/ancestorrepresentation) 枚举进行 switch 操作。每当有新的 `case` 加入，我们会得到一个警告，提示我们要去处理它。

```swift
let representation: Mirror.AncestorRepresentation = .generated
switch representation {
case .customized:
    print("Use the nearest ancestor’s implementation.")
case .generated:
    print("Generate a default mirror for all ancestor classes.")
case .suppressed:
    print("Suppress the representation of all ancestor classes.")
@unknown default:
    print("Use a representation that was unknown when this code was compiled.")
}
// Prints "Generate a default mirror for all ancestor classes."
```

#### 不存在隐式落入

当匹配到的 `case` 中的代码执行完毕后，`switch` 语句会直接退出，而不会继续执行下一个 `case` 。这就意味着，如果你想执行下一个 `case`，需要显式地在当前 `case` 中使用 `fallthrough` 语句。关于 `fallthrough` 语句的更多信息，请参阅 [Fallthrough 语句](#fallthrough-statements)。

> switch 语句语法
> 
>

#### switch-statement {#switch-statement}
> *switch 语句* → **switch** [表达式](./04_Expressions.md#expression) **{** [switch-case 列表](#switch-cases)<sub>可选</sub> **}**
> 

#### switch-cases {#switch-cases}
> *switch case 列表* → [switch-case](#switch-case) [switch-case 列表](#switch-cases)<sub>可选</sub>
> 

#### switch-case {#switch-case}
> *switch case* → [case 标签](#case-label) [多条语句](#statements) | [default 标签](#default-label) [多条语句](#statements) | [conditional-switch-case](#conditional-switch-case-label)
> 


#### case-label {#case-label}
> *case 标签* → [属性](#switch-case-attributes-label)<sub>可选</sub> **case** [case 项列表](#case-item-list) **:**
> 

#### case-item-list {#case-item-list}
> *case 项列表* → [模式](./08_Patterns.md#pattern) [where 子句](#where-clause)<sub>可选</sub> | [模式](07-Patterns.md#pattern) [where 子句](#where-clause)<sub>可选</sub> **,** [case 项列表](#case-item-list)
> 

#### default-label {#default-label}
> *default 标签* → [属性](#switch-case-attributes-label)<sub>可选</sub> **default** **:**
> 
>

#### where-clause {#where-clause}
> *where-clause* → **where** [where 表达式](#where-expression)
> 

#### where-expression {#where-expression}
> *where-expression* → [表达式](./04_Expressions.md#expression)
> 
>

#### grammar-conditional-switch-case {#grammar-conditional-switch-case}
> *conditional-switch-case* → [switch-if-directive-clause](#switch-case-attributes-label) [switch-elseif-directive-clauses](#switch-case-attributes-label) <sub>可选</sub> [switch-else-directive-clause](#switch-case-attributes-label) <sub>可选</sub> [endif-directive](#switch-case-attributes-label)
> 

#### grammar-switch-if-directive-clause {#grammar-switch-if-directive-clause}
> *switch-if-directive 语句* → [if-directive](#switch-case-attributes-label) [compilation-condition](#switch-case-attributes-label) [switch-cases](#switch-case-attributes-label) <sub>可选</sub>
> 

#### grammar-switch-elseif-directive-clauses {#grammar-switch-elseif-directive-clauses}
> *switch-elseif-directive 语句（复数）* → [elseif-directive-clause](#switch-case-attributes-label)  [switch-elseif-directive-clauses](#switch-case-attributes-label)<sub>可选</sub>
> 

#### grammar-switch-elseif-directive-clause {#grammar-switch-elseif-directive-clause}
> *switch-elseif-directive 语句* → [elseif-directive](#switch-case-attributes-label)  [compilation-condition](#switch-case-attributes-label) [switch-cases](#switch-case-attributes-label)<sub>可选</sub>
> 

#### grammar-switch-else-directive-clause {#grammar-switch-else-directive-clause}
> *switch-else-directive 语句* → [else-directive](#switch-case-attributes-label) [switch-cases](#switch-case-attributes-label) <sub>可选</sub>
> 

## 带标签的语句 {#labeled-statements}
你可以在循环语句或 `switch` 语句前面加上标签，它由标签名和紧随其后的冒号（`:`）组成。在 `break` 和 `continue` 后面跟上标签名可以显式地在循环语句或 `switch` 语句中改变相应的控制流。关于这两条语句用法，请参阅 [Break 语句](#break-statement) 和 [Continue 语句](#continue-statement)。

标签的作用域在该标签所标记的语句内。可以嵌套使用带标签的语句，但标签名必须唯一。

关于使用带标签的语句的例子，请参阅 [控制流](../02_language_guide/05_Control_Flow.md) 一章中的 [带标签的语句](../02_language_guide/05_Control_Flow.md#labeled-statements)。

> 带标签的语句语法
> 
>

#### labeled-statement {#labeled-statement}
> *带标签的语句* → [语句标签](#statement-label) [循环语句](#grammar-loop-statement)
> 
> *带标签的语句* → [语句标签](#statement-label) [if 语句](#if-statement)
> 
> *带标签的语句* → [语句标签](#statement-label) [switch 语句](#switch-statement)
> 
> > *带标签的语句* → [语句标签](#statement-label) [do 语句](#sdo-statement)
> 

#### statement-label {#statement-label}
> *语句标签* → [标签名称](#label-name) **:**
> 

#### label-name {#label-name}
> *标签名称* → [标识符](./02_Lexical_Structure.md#identifier)
> 

## 控制转移语句 {#control-transfer-statements}
控制转移语句能够无条件地把控制权从一片代码转移到另一片代码，从而改变代码执行的顺序。Swift 提供五种类型的控制转移语句：`break` 语句、`continue` 语句、`fallthrough` 语句、`return` 语句和 `throw` 语句。

> 控制转移语句语法
> 
>

#### control-transfer-statement {#control-transfer-statement}
> *控制转移语句* → [break 语句](#break-statement)
> 
> *控制转移语句* → [continue 语句](#continue-statement)
> 
> *控制转移语句* → [fallthrough 语句](#fallthrough-statement)
> 
> *控制转移语句* → [return 语句](#return-statement)
> 
> *控制转移语句* → [throw 语句](#throw-statement)
> 

### Break 语句 {#break-statement}
`break` 语句用于终止循环语句、`if` 语句或 `switch` 语句的执行。使用 `break` 语句时，可以只写 `break` 这个关键词，也可以在 `break` 后面跟上标签名，像下面这样：

> break
> 
> break `label name`
> 

当 `break` 语句后面带标签名时，可用于终止由这个标签标记的循环语句、`if` 语句或 `switch` 语句的执行。

而只写 `break` 时，则会终止 `switch` 语句或 `break` 语句所属的最内层循环语句的执行。不能使用 `break` 语句来终止未使用标签的 `if` 语句。

无论哪种情况，控制权都会被转移给被终止的控制流语句后面的第一行语句。

关于使用 `break` 语句的例子，请参阅 [控制流](../02_language_guide/05_Control_Flow.md) 一章的 [Break](../02_language_guide/05_Control_Flow.md#break) 和 [带标签的语句](../02-language-guide/05-Control-Flow.md#labeled-statements)。

> break 语句语法
> 
>

#### break-statement {#break-statement}
> *break 语句* → **break** [标签名称](#label-name)<sub>可选</sub>
> 

### Continue 语句 {#continue-statement}
`continue` 语句用于终止循环中当前迭代的执行，但不会终止该循环的执行。使用 `continue` 语句时，可以只写 `continue` 这个关键词，也可以在 `continue` 后面跟上标签名，像下面这样：

> continue
> 
> continue `label name`
> 

当 `continue` 语句后面带标签名时，可用于终止由这个标签标记的循环中当前迭代的执行。

而当只写 `continue` 时，可用于终止 `continue` 语句所属的最内层循环中当前迭代的执行。

在这两种情况下，控制权都会被转移给循环语句的条件语句。

在 `for` 语句中，`continue` 语句执行后，增量表达式还是会被计算，这是因为每次循环体执行完毕后，增量表达式都会被计算。

关于使用 `continue` 语句的例子，请参阅 [控制流](../02_language_guide/05_Control_Flow.md) 一章的 [Continue](../02_language_guide/05_Control_Flow.md#continue) 和 [带标签的语句](../02-language-guide/05-Control-Flow.md#labeled-statements)。

> continue 语句语法
> 
>

#### continue-statement {#continue-statement}
> *continue 语句* → **continue** [标签名称](#label-name)<sub>可选</sub>
> 

### Fallthrough 语句 {#fallthrough-statements}
`fallthrough` 语句用于在 `switch` 语句中转移控制权。`fallthrough` 语句会把控制权从 `switch` 语句中的一个 `case` 转移到下一个 `case`。这种控制权转移是无条件的，即使下一个 `case` 的模式与 `switch` 语句的控制表达式的值不匹配。

`fallthrough` 语句可出现在 `switch` 语句中的任意 `case` 中，但不能出现在最后一个 `case` 中。同时，`fallthrough` 语句也不能把控制权转移到使用了值绑定的 `case`。

关于在 `switch` 语句中使用 `fallthrough` 语句的例子，请参阅 [控制流](../02_language_guide/05_Control_Flow.md) 一章的 [控制转移语句](../02_language_guide/05_Control_Flow.md#control-transfer-statements)。

> fallthrough 语句语法
> 
>

#### fallthrough-statement {#fallthrough-statement}
> *fallthrough 语句* → **fallthrough**
> 

### Return 语句 {#return-statements}
`return` 语句用于在函数或方法的实现中将控制权转移到调用函数或方法，接着程序将会从调用位置继续向下执行。

使用 `return` 语句时，可以只写 `return` 这个关键词，也可以在 `return` 后面跟上表达式，像下面这样：

> return
>
> return `expression`
> 

当 `return` 语句后面带表达式时，表达式的值将会返回给调用函数或方法。如果表达式的值的类型与函数或者方法声明的返回类型不匹配，Swift 则会在返回表达式的值之前将表达式的值的类型转换为返回类型。

> 注意
> 
>
> 正如 [可失败构造器](./06_Declarations.md#failable-initializers) 中所描述的，`return nil` 在可失败构造器中用于表明构造失败。
> 

而只写 `return` 时，仅仅是从该函数或方法中返回，而不返回任何值（也就是说，函数或方法的返回类型为 `Void` 或者说 `()`）。

> return 语句语法
> 
>

#### return-statement {#return-statement}
> *return 语句* → **return** [表达式](./04_Expressions.html#expression)<sub>可选</sub>

### Throw 语句 {#throw-statements}

`throw` 语句出现在抛出函数或者抛出方法体内，或者类型被 `throws` 关键字标记的闭包表达式体内。

`throw` 语句使程序在当前作用域结束执行，并向外围作用域传播错误。抛出的错误会一直传递，直到被 `do` 语句的 `catch` 子句处理掉。

`throw` 语句由 `throw` 关键字紧跟一个表达式组成，如下所示：

> throw `expression`
> 

表达式的结果必须符合 `ErrorType` 协议。

关于如何使用 `throw` 语句的例子，请参阅 [错误处理](../02_language_guide/17_Error_Handling.md) 一章的 [用 throwing 函数传递错误](../02_language_guide/17_Error_Handling.md#propagating-errors-using-throwing-functions)。

> throw 语句语法
> 
>

#### throw-statement {#throw-statement}
> *throw 语句* → **throw**  [表达式](./04_Expressions.md#expression)
> 

## Defer 语句 {#defer-statements}
`defer` 语句用于在退出当前作用域之前执行代码。

`defer` 语句形式如下：

```swift
defer {
	statements
}
```

在 `defer` 语句中的语句无论程序控制如何转移都会被执行。在某些情况下，例如，手动管理资源时，比如关闭文件描述符，或者即使抛出了错误也需要执行一些操作时，就可以使用 `defer` 语句。

如果多个 `defer` 语句出现在同一作用域内，那么它们执行的顺序与出现的顺序相反。给定作用域中的第一个 `defer` 语句，会在最后执行，这意味着代码中最靠后的 `defer` 语句中引用的资源可以被其他 `defer` 语句清理掉。

```swift
func f() {
    defer { print("First") }
    defer { print("Second") }
    defer { print("Third") }
}
f()
// 打印“Third”
// 打印“Second”
// 打印“First”
```

`defer` 语句中的语句无法将控制权转移到 `defer` 语句外部。

> defer 语句语法
> 
>

#### defer-statement {#defer-statement}
> *延迟语句* → **defer** [代码块](./06_Declarations.md#code-block)
> 

## Do 语句 {#do-statements}
`do` 语句用于引入一个新的作用域，该作用域中可以含有一个或多个 `catch` 子句，`catch` 子句中定义了一些匹配错误条件的模式。`do` 语句作用域内定义的常量和变量只能在 `do` 语句作用域内使用。

Swift 中的 `do` 语句与 C 中限定代码块界限的大括号（`{}`）很相似，也并不会降低程序运行时的性能。

`do` 语句的形式如下：

```swift
do {
    try expression
    statements
} catch pattern 1 {
    statements
} catch pattern 2 where condition {
    statements
}
```

如同 `switch` 语句，编译器会判断 `catch` 子句是否有遗漏。如果 `catch` 子句没有遗漏，则认为错误已被处理。否则，错误会自动传递到外围作用域，被某个 `catch` 子句处理掉或者被用 `throws` 关键字声明的抛出函数继续向外抛出。

为了确保错误已经被处理，可以让 `catch` 子句使用匹配所有错误的模式，如通配符模式（`_`）。如果一个 `catch` 子句不指定一种具体模式，`catch` 子句会匹配任何错误，并绑定到名为 `error` 的局部常量。有关在 `catch` 子句中使用模式的更多信息，请参阅 [模式](./08_Patterns.md)。

关于如何在 `do` 语句中使用一系列 `catch` 子句的例子，请参阅 [错误处理](../02_language_guide/17_Error_Handling.md#handling-errors)。

> do 语句语法
> 
>

#### do-statement {#do-statement}
> *do 语句* → **do** [代码块](./06_Declarations.md#code-block) [多条 catch 子句](#catch-clauses)<sub>可选</sub>
> 

#### catch-clauses {#catch-clauses}
> *多条 catch 子句* → [catch 子句](#catch-clause) [多条 catch 子句](#catch-clauses)<sub>可选</sub>
> 

#### catch-clause {#catch-clause}
> *catch 子句* → **catch** [模式](./08_Patterns.md#pattern)<sub>可选</sub> [where 子句](#where-clause)<sub>可选</sub> [代码块](05-Declarations.md#code-block)
> 

## 编译器控制语句 {#compiler-control-statements}
编译器控制语句允许程序改变编译器的行为。Swift 有三种编译器控制语句：条件编译语句、线路控制语句和编译时诊断语句。

> 编译器控制语句语法
> 
>

#### compiler-control-statement {#compiler-control-statement}
> *编译器控制语句* → [条件编译语句](#grammar-conditional-compilation-block)
> 
> *编译器控制语句* → [线路控制语句](#line-control-statement)
> 
> *编译器控制语句* → [诊断语句](#grammar-diagnostic-statement)
> 

### 条件编译代码块 {#Conditional-Compilation-Block}

条件编译代码块可以根据一个或多个配置来有条件地编译代码。

每一个条件编译代码块都以 `#if` 开始，`#endif` 结束。如下：

```swift
#if compilation condition
statements
#endif
```

和 `if` 语句的条件不同，编译配置的条件是在编译时进行判断的。只有编译配置在编译时判断为 `true` 的情况下，相应的语句才会被编译和执行。

编译配置可以是 `true` 和 `false` 的字面量，也可以是使用 `-D` 命令行标志的标识符，或者是下列表格中的任意一个平台检测函数。

| 函数 | 可用参数 |
| --- | --- |
| `os()` | `OSX`, `iOS`, `watchOS`, `tvOS`, `Linux` |
| `arch()` | `i386`, `x86_64`, `arm`, `arm64` |
| `swift()` | `>=` 或 `<` 后跟版本号 |
| `compiler()` | `>=` 或 `<` 后跟版本号 |
| `canImport()` | 模块名 |
| `targetEnvironment()` | `simulator`，`macCatalyst` |

在 `swift()` 和 `compiler()` 之后的版本号包含有主版本号，可选副版本号，可选补丁版本号类似，并且用（`.`）来分隔。在比较符和版本号之间不能有空格，版本号与前面的函数相对应，比如 `compiler()` 对应的就是这个编译器的版本号，`swift()` 对应的就是你要编译的 `Swift` 语言的版本号。举个简单的例子，如果你在使用 `Swift 5` 的编译器，想编译 `Swift 4.2` ，可以看下面的例子：

```swift
#if compiler(>=5)
print("Compiled with the Swift 5 compiler or later")
#endif
#if swift(>=4.2)
print("Compiled in Swift 4.2 mode or later")
#endif
#if compiler(>=5) && swift(<5)
print("Compiled with the Swift 5 compiler or later in a Swift mode earlier than 5")
#endif
// 打印 "Compiled with the Swift 5 compiler or later"
// 打印 "Compiled in Swift 4.2 mode or later"
// 打印 "Compiled with the Swift 5 compiler or later in a Swift mode earlier than 5"
```

`canImport()` 后面跟的变量是模块的名字，这里这个模块可能并不是每个平台上都存在的。使用它来检测是否可以导入这个模块，如果模块存在就返回 `true` 否则返回 `false` 。

`targetEnvironment()` 当为模拟器编译时返回 `true`，否则返回 `false` 。

> 注意
> 
>
> `arch(arm)` 平台检测函数在 ARM 64 位设备上不会返回 `true`。如果代码在 32 位的 iOS 模拟器上编译，`arch(i386)` 平台检测函数会返回 `true`。
> 

你可以使用逻辑操作符 `&&`、`||` 和 `!` 来组合多个编译配置，还可以使用圆括号来进行分组。

就像 `if` 语句一样，你可以使用 `#elseif` 子句来添加任意多个条件分支来测试不同的编译配置。你也可以使用 `#else` 子句来添加最终的条件分支。包含多个分支的编译配置语句例子如下：

```swift
#if compilation condition 1
statements to compile if compilation condition 1 is true
#elseif compilation condition 2
statements to compile if compilation condition 2 is true
#else
statements to compile if both compilation conditions are false
#endif
```

> 注意
> 
>
> 即使没有被编译，编译配置中的语句仍然会被解析。然而，唯一的例外是编译配置语句中包含语言版本检测函数：仅当 `Swift` 编译器版本和语言版本检测函数中指定的版本号匹配时，语句才会被解析。这种设定能确保旧的编译器不会尝试去解析新 Swift 版本的语法。
> 


#### build-config-statement {#build-config-statement}
> 条件编译代码块语法
> 
>

#### grammar-conditional-compilation-block {#grammar-conditional-compilation-block}
> *条件编译代码块* → [if-directive 语句](#grammar-if-directive-clause) [elseif-directive 语句（复数）](#grammar-elseif-directive-clauses)<sub>可选</sub> [else-directive 语句](#grammar-else-directive-clause)<sub>可选</sub> [endif-directive](#grammar-endif-directive)
> 

#### grammar-if-directive-clause {#grammar-if-directive-clause}
> *if-directive 语句* → [if-directive](#grammar-if-directive) [编译条件](#compilation-condition) [语句（复数）](#statements)<sub>可选</sub>
> 

#### grammar-elseif-directive-clauses {#grammar-elseif-directive-clauses}
> *elseif-directive 语句（复数）* → [elseif-directive 语句](#grammar-elseif-directive-clause) [elseif-directive 语句（复数）](#grammar-elseif-directive-clauses)
> 

#### grammar-elseif-directive-clauses {#grammar-elseif-directive-clauses}
> *elseif-directive 语句* → [elseif-directive](#grammar-elseif-directive) [编译条件](#compilation-condition) [语句（复数）](#statements)<sub>可选</sub>
> 

#### grammar-else-directive-clause {#grammar-else-directive-clause}
> *else-directive 语句* → [else-directive](#grammar-else-directive) [语句（复数）](#statements)<sub>可选</sub>
> 


> *if-directive* → **#if**
> 
> *elseif-directive* → **#elseif**
> 
> *else-directive* → **#else**
> 
> *endif-directive* → **#endif**
> 


#### compilation-condition {#compilation-condition}
> *编译条件* → [平台条件](#grammar-platform-condition)
> 
> *编译条件* → [标识符](./02_Lexical_Structure.md#identifier)
> 
> *编译条件* → [布尔值字面量](./02_Lexical_Structure.md#boolean-literal)
> 
> *编译条件* → **(** [编译条件](#compilation-condition) **)**
> 
> *编译条件* → **!** [编译条件](#compilation-condition)
> 
> *编译条件* → [编译条件](#compilation-condition) **&&** [编译条件](#compilation-condition)
> 
> *编译条件* → [编译条件](#compilation-condition) **||** [编译条件](#compilation-condition)
> 


#### grammar-platform-condition {#grammar-platform-condition}

#### grammar-platform-condition-os {#grammar-platform-condition-os}
> *平台条件* → **os ( [操作系统](#operating-system) )**

#### grammar-platform-condition-arch {#grammar-platform-condition-arch}
> *平台条件* → **arch ( [架构](#architecture) )**

#### grammar-platform-condition-swift {#grammar-platform-condition-swift}
> *平台条件* → **swift ( >= [swift 版本](#swift-version) )** | **swift ( < [swift 版本](#swift-version) )**

#### grammar-platform-condition-compiler {#grammar-platform-condition-compiler}
> *平台条件* → **compiler ( >= [swift 版本](#swift-version) )** | **compiler ( < [swift 版本](#swift-version) )**

#### grammar-platform-condition-canImport {#grammar-platform-condition-canImport}
> *平台条件* → **canImport ( [模块名](#grammar-module-name) )**

#### grammar-platform-condition-targetEnvironment {#grammar-platform-condition-targetEnvironment}
> *平台条件* → **targetEnvironment ( [环境](#grammar-environment) )**

#### operating-system {#operating-system}
> *操作系统* → **macOS** | **iOS** | **watchOS** | **tvOS**
> 

#### architecture {#architecture}
> *架构* → **i386** | **x86_64** | **arm** | **arm64**
> 

#### swift-version {#swift-version}
> *swift 版本* → [十进制数字](./02_Lexical_Structure.md#decimal-digit) ­**.** ­[swift 版本延续](#grammar-swift-version-continuation) <sub>可选</sub>

#### grammar-swift-version-continuation {#grammar-swift-version-continuation}
> *swift 版本延续* → **.** [十进制数字](./02_Lexical_Structure.md#decimal-digit) [swift 版本延续](#grammar-swift-version-continuation) <sub>可选</sub>

#### grammar-module-name {#grammar-module-name}
> *模块名* → [identifier](./02_Lexical_Structure.md#identifier)

#### grammar-environment {#grammar-environment}

> *环境* → **模拟器**
> 

### 行控制语句 {#line-control-statements}
行控制语句可以为被编译的源代码指定行号和文件名，从而改变源代码的定位信息，以便进行分析和调试。

行控制语句形式如下：

> \#sourceLocation(file: `filename` , line:`line number`)
> 

> \#sourceLocation()
> 

第一种的行控制语句会改变该语句之后的代码中的字面量表达式 `#line` 和 `#file` 所表示的值。`行号` 是一个大于 0 的整形字面量，会改变 `#line` 表达式的值。`文件名` 是一个字符串字面量，会改变 `#file` 表达式的值。

第二种的行控制语句，`#sourceLocation()`，会将源代码的定位信息重置回默认的行号和文件名。


#### line-control-statement {#line-control-statement}
> 行控制语句语法
> 
>*行控制语句* → **#sourceLocation(file:[文件名](#file-name),line:[行号](#line-number))**
> 
> *行控制语句* → **#sourceLocation( )**

#### line-number {#line-number}

> *行号* → 大于 0 的十进制整数
> 

#### file-name {#file-name}
> *文件名* → [静态字符串字面量](./02_Lexical_Structure.md#static-string-literal)

### 编译时诊断语句 {#compile-time-diagnostic-statement}

编译时诊断语句允许编译器在编译的时候可以发出错误或者警告。语句形式如下：

```swift
#error("error message")
#warning("warning message")
```

第一句会抛出错误信息并终止编译，第二句会发出警告信息但是编译会继续进行。你可以通过静态字符串字面量来书写诊断信息，静态字符串字面量不能使用字符串 `interpolation` 或者 `concatenation`，但可以使用多行的形式。

> 编译时诊断语句语法
> 
>

#### grammar-compile-time-diagnostic-statement {#grammar-compile-time-diagnostic-statement}
> *诊断语句* → **#error** **(** [诊断消息](#grammar-diagnostic-message) **)**
> 
> *诊断语句* → **#warning** **(** [诊断消息](#grammar-diagnostic-message) **)**
> 
> *诊断语句* → [静态字符串字面量](./02_Lexical_Structure.md#static-string-literal)

## 可用性条件 {#availability-condition}

可用性条件可作为 `if`，`while`，`guard` 语句的条件，可以在运行时基于特定的平台参数来查询 API 的可用性。

可用性条件的形式如下：

```swift
if #available(platform name version, ..., *) {
    statements to execute if the APIs are available
} else {
    fallback statements to execute if the APIs are unavailable
}
```

使用可用性条件来执行一个代码块时，取决于使用的 API 在运行时是否可用，编译器会根据可用性条件提供的信息来决定是否执行相应的代码块。

可用性条件使用一系列逗号分隔的平台名称和版本。使用 `iOS`，`OSX`，以及 `watchOS` 等作为平台名称，并写上相应的版本号。`*` 参数是必须写的，用于处理未来的潜在平台。可用性条件确保了运行时的平台不低于条件中指定的平台版本时才执行代码块。

与布尔类型的条件不同，不能用逻辑运算符 `&&` 和 `||` 组合可用性条件。

> 可用性条件语法
> 
>

#### availability-condition {#availability-condition}
> *可用性条件* → **#available** **(** [可用性参数列表](#availability-arguments) **)**

#### availability-arguments {#availability-arguments}
> *可用性参数列表* → [可用性参数](#availability-argument) | [可用性参数](#availability-argument) **,** [可用性参数列表](#availability-arguments)

#### availability-argument {#availability-argument}
> *可用性参数* → [平台名称](#platform-name) [平台版本](#platform-version)
> 
> *可用性条件* → __*__
> 
>

#### platform-name {#platform-name}
> *平台名称* → **iOS** | **iOSApplicationExtension**
> 
> *平台名称* → **OSX** | **macOSApplicationExtension**
> 
> *平台名称* → **watchOS**
> 
> *平台名称* → **tvOS**
> 

#### platform-version {#platform-version}
> *平台版本* → [十进制数字](./02_Lexical_Structure.md#decimal-digits)
> 
> *平台版本* → [十进制数字](./02_Lexical_Structure.md#decimal-digits) **.** [十进制数字](./02-Lexical-Structure.md#decimal-digits)
> 
> *平台版本* → [十进制数字](./02_Lexical_Structure.md#decimal-digits) **.** [十进制数字](./02-Lexical-Structure.md#decimal-digits) **.** [十进制数字](./02-Lexical-Structure.md#decimal-digits)
