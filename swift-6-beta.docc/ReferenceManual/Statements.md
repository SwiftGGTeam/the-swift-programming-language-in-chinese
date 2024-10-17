<!--
要翻译的文件：https://github.com/SwiftGGTeam/the-swift-programming-language-in-chinese/blob/swift-6-beta-translation/swift-6-beta.docc/ReferenceManual/Statements.md
Swift 文档源文件地址：https://docs.swift.org/swift-book/documentation/the-swift-programming-language/statements
翻译估计用时：⭐️⭐️⭐️⭐️⭐️
-->

# 语句

对表达式进行分组，并控制执行流程。

在 Swift 中，有三种类型的语句：简单语句、编译器控制语句和控制流语句。简单语句是最常见的，用于构造表达式或者声明。编译器控制语句允许程序改变编译器的行为，包含编译配置语句和行控制语句。

控制流语句则用于控制程序执行的流程，Swift 中有多种类型的控制流语句：循环语句、分支语句和控制转移语句。循环语句用于重复执行代码块；分支语句用于执行满足特定条件的代码块；控制转移语句则用于改变代码的执行顺序。另外，Swift 提供了 `do` 语句，用于构建局部作用域，还用于错误的捕获和处理；还提供了 `defer` 语句，用于退出当前作用域之前执行清理操作。

是否将分号（`;`）添加到语句的末尾是可选的。但若要在同一行内写多条独立语句，则必须使用分号。

> 语句语法：
>
> *statement* → *expression* **`;`**_?_ \
> *statement* → *declaration* **`;`**_?_ \
> *statement* → *loop-statement* **`;`**_?_ \
> *statement* → *branch-statement* **`;`**_?_ \
> *statement* → *labeled-statement* **`;`**_?_ \
> *statement* → *control-transfer-statement* **`;`**_?_ \
> *statement* → *defer-statement* **`;`**_?_ \
> *statement* → *do-statement* **`;`**_?_ \
> *statement* → *compiler-control-statement* \
> *statements* → *statement* *statements*_?_

<!--
  NOTE: Removed semicolon-statement as syntactic category,
  because, according to Doug, they're not really statements.
  For example, you can't have
      if foo { ; }
  but you should be able to if it's truly considered a statement.
  The semicolon isn't even required for the compiler; we just added
  rules that require them in some places to enforce a certain amount
  of readability.
-->

## 循环语句

循环语句会根据特定的循环条件来重复执行代码块。Swift 提供三种类型的循环语句：`for-in` 语句、`while` 语句和 `repeat-while` 语句。

通过 break 语句和 continue 语句可以改变循环语句的控制流。有关这两条语句，可参阅 <doc:Statements#Break-Statement> 和
<doc:Statements#Continue-Statement> 。

> 循环语句的语法：
>
> *loop-statement* → *for-in-statement* \
> *loop-statement* → *while-statement* \
> *loop-statement* → *repeat-while-statement*

### For-In 语句

`for-in` 语句会为集合（或遵循[`Sequence`](https://developer.apple.com/documentation/swift/sequence)协议的任意类型）中的每一项执行一次代码块。

`for-in` 语句的形式如下：

```swift
for <#item#> in <#collection#> {
   <#statements#>
}
```

`for-in` 语句在循环开始前会调用集合表达式（`collection expression`）的 `makeIterator()` 方法来获取一个遵循了 `IteratorProtocol` 协议的迭代器类型。接下来循环开始，反复调用该迭代器的 `next()` 方法。如果其返回值不是 `nil`，它将会被赋给 `item`，然后执行循环体语句，执行完毕后回到循环开始处，继续重复这一过程；否则，既不会赋值也不会执行循环体语句，`for-in` 语句至此执行完毕。

> for-in 语句的语法：
>
> *for-in-statement* → **`for`** **`case`**_?_ *pattern* **`in`** *expression* *where-clause*_?_ *code-block*

### While 语句

只要循环条件为真，`while` 语句就会重复执行代码块。

`while` 语句的形式如下：

```swift
while <#condition#> {
   <#statements#>
}
```

 `while` 语句的执行流程如下：

1. *条件* 判断

   如果为 `true`， 程序执行到第 2 步；
   如果为 `false`， 程序将结束执行 `while` 语句。
2. 执行循环体中的语句，然后回到第 1 步

由于会在执行循环体中的语句前判断条件的值，因此循环体中的语句可能会被执行若干次，也可能一次也不会被执行。

条件的结果必须是 Bool 类型或者 Bool 的桥接类型。另外，条件语句也可以使用可选绑定，请参阅 <doc:TheBasics#Optional-Binding>。

> while 语句的语法：
>
> *while-statement* → **`while`** *condition-list* *code-block*
>
> *condition-list* → *condition* | *condition* **`,`** *condition-list* \
> *condition* → *expression* | *availability-condition* | *case-condition* | *optional-binding-condition*
>
> *case-condition* → **`case`** *pattern* *initializer* \
> *optional-binding-condition* → **`let`** *pattern* *initializer*_?_ | **`var`** *pattern* *initializer*_?_

### Repeat-While 语句

`repeat-while` 语句至少执行一次代码块，之后只要循环条件为真，就会重复执行代码块。

`repeat`-`while` 语句的形式如下：

```swift
repeat {
   <#statements#>
} while <#condition#>
```

`repeat`-`while`语句的执行流程如下：

1. 执行循环体中的语句，然后转到第 2 步。
2. 判断 *条件* 的值：

   如果为 `true`，重复第 1 步；
   如果为 `false`，程序会结束执行 `repeat`-`while` 语句。

由于条件的值是在循环体中的语句执行后才进行判断，因此循环体中的语句至少会被执行一次。

条件的结果必须是 Bool 类型或者 Bool 的桥接类型。另外，条件语句也可以使用可选绑定，请参阅

> repeat-while 语句的语法：
>
> *repeat-while-statement* → **`repeat`** *code-block* **`while`** *expression*

## 分支语句

分支语句会根据一个或者多个条件来执行指定部分的代码。分支语句中的条件将会决定程序如何分支以及执行哪部分代码。Swift 提供三种类型的分支语句：`if` 语句、 `guard` 语句和 `switch` 语句。

`if` 语句和 `switch` 语句中的控制流可以用 `break` 语句改变，关于`break`的用法，请参阅 <doc:Statements#Break-Statement> 。

> 分支语句的语法：
>
> *branch-statement* → *if-statement* \
> *branch-statement* → *guard-statement* \
> *branch-statement* → *switch-statement*

### If 语句

`if` 语句会根据一个或多个条件来决定执行哪一块代码。

`if` 语句有两种基本形式，无论哪种形式，都必须有花括号。

第一种形式是当且仅当条件为真时执行代码，形式如下：

```swift
if <#condition#> {
   <#statements#>
}
```

第二种形式是在第一种形式的基础上添加 `else` 语句（通过引入 `else` 关键字），并且用于：当条件为真时执行一部分代码，当这同一个条件为假的时候执行另一部分代码。当只有一个 `else` 语句时，`if` 语句具有以下的形式：

```swift
if <#condition#> {
   <#statements to execute if condition is true#>
} else {
   <#statements to execute if condition is false#>
}
```

`if` 语句的 `else` 语句也可包含另一个 `if` 语句，从而形成一条链来测试更多的条件，像下面这样：

```swift
if <#condition 1#> {
   <#statements to execute if condition 1 is true#>
} else if <#condition 2#> {
   <#statements to execute if condition 2 is true#>
} else {
   <#statements to execute if both conditions are false#>
}
```

if 语句中条件的结果必须是 Bool 类型或者 Bool 的桥接类型。另外，条件语句也可以使用可选绑定，请参阅 <doc:TheBasics#Optional-Binding>.

> if 语句的语法:
>
> *if-statement* → **`if`** *condition-list* *code-block* *else-clause*_?_ \
> *else-clause* → **`else`** *code-block* | **`else`** *if-statement*

### Guard 语句

如果一个或者多个条件不成立，可用 `guard` 语句来退出当前作用域。

`guard` 语句的格式如下：

```swift
guard <#condition#> else {
   <#statements#>
}
```

语句中条件的结果必须是 Bool 类型或者 Bool 的桥接类型。另外，条件也可以是一条可选绑定，请参阅 <doc:TheBasics#Optional-Binding>。

在 `guard` 语句中进行可选绑定的任何常量或者变量，其可用范围从声明开始直到作用域结束。

`guard` 语句必须有 `else` 子句，而且必须在该子句中调用返回类型是 `Never` 的函数，或者使用下面的语句退出当前作用域：

- `return`
- `break`
- `continue`
- `throw`

关于控制转移语句，请参阅 <doc:Statements#Control-Transfer-Statements> 。关于返回类型是 `Never` 的函数，请参阅<doc:Declarations#Functions-that-Never-Return>。

> guard 语句的语法：
>
> *guard-statement* → **`guard`** *condition-list* **`else`** *code-block*

### Switch 语句

`switch` 语句会根据控制表达式的值来决定执行哪部分代码。

`switch` 语句的形式如下：

```swift
switch <#control expression#> {
case <#pattern 1#>:
    <#statements#>
case <#pattern 2#> where <#condition#>:
    <#statements#>
case <#pattern 3#> where <#condition#>,
    <#pattern 4#> where <#condition#>:
    <#statements#>
default:
    <#statements#>
}
```

`switch` 语句会先计算 *控制表达式* 的值，然后与每一个 `case` 的模式进行匹配。如果匹配成功，程序将会执行对应的 `case` 中的语句。另外，每一个 `case` 的作用域都不能为空，也就是说在每一个 `case` 的冒号（`:`）后面必须至少有一条语句。如果你不想在匹配到的 `case` 中执行代码，只需在该 `case` 中写一条 `break` 语句即可。

可以用作控制表达式的值是十分灵活的。除了标量类型外，如 `Int`、`Character`，你可以使用任何类型的值，包括浮点数、字符串、元组、自定义类型的实例和可选类型。控制表达式的值还可以用来匹配枚举类型中的成员值或是检查该值是否包含在指定的 `Range` 中。关于如何在 `switch` 语句中使用这些类型，请参阅 <doc:ControlFlow#Switch> 中的 <doc:ControlFlow>。

每个 case 的模式后面可以有一个 `where` 子句。`where` 子句由 `where` 关键字紧跟一个提供额外条件的表达式组成。因此，当且仅当控制表达式匹配一个 `case` 的模式且 `where` 子句的表达式为真时，`case` 中的语句才会被执行。在下面的例子中，控制表达式只会匹配包含两个相等元素的元组，例如 `(1, 1)`：

```swift
case let (x, y) where x == y:
```

<!--
  - test: `switch-case-statement`

  ```swifttest
  >> switch (1, 1) {
  -> case let (x, y) where x == y:
  >> break
  >> default: break
  >> }
  ```
-->

如上例所示， `case` 中的模式也可以使用 `let` 关键字绑定常量（也可以使用 `var` 关键字绑定变量）。这些常量（或变量）随后可以在相应的 `where` 子句中引用，并在 `case` 范围内的代码中使用。如果 `case` 包含多个匹配控制表达式的模式，则所有模式必须包含相同的常量或变量绑定，并且每个绑定的变量或常量在该 `case` 的所有模式中必须具有相同的类型。

<!--
  The discussion above about multi-pattern cases
  matches discussion of multi-pattern catch under Do Statement.
-->

`switch` 语句也可以包含默认分支，使用 `default` 关键字表示。只有所有 `case` 都无法匹配控制表达式时，默认分支中的代码才会被执行。一个 `switch` 语句只能有一个默认分支，而且必须在 `switch` 语句的最后面。

尽管模式匹配操作的实际执行顺序，特别是 `case` 中模式的求值顺序是未指定的，但在 switch 语句中，模式匹配的行为大概是按照源码中的顺序进行求值的——即它们在源代码中出现的顺序。因此，如果多个 `case` 包含求值为相同值的模式，从而可以匹配控制表达式的值，程序只会执行源代码中第一个匹配的 `case` 中的代码。

<!--
  - test: `switch-case-with-multiple-patterns`

  ```swifttest
  >> let tuple = (1, 1)
  >> switch tuple {
  >>     case (let x, 5), (let x, 1): print(x)
  >>     default: print(2)
  >> }
  << 1
  ```
-->

<!--
  - test: `switch-case-with-multiple-patterns-err`

  ```swifttest
  >> let tuple = (1, 1)
  >> switch tuple {
  >>     case (let x, 5), (let x as Any, 1): print(1)
  >>     default: print(2)
  >> }
  !$ error: pattern variable bound to type 'Any', expected type 'Int'
  !! case (let x, 5), (let x as Any, 1): print(1)
  !!                       ^
  ```
-->

#### Switch 语句必须是详尽的

在 Swift 中，`switch` 语句中控制表达式的每一个可能的值都必须至少有一个 `case` 与之对应。在某些无法面面俱到的情况下（例如，表达式的类型是 `Int`），你可以使用 `default` 分支满足该要求。

#### 对未来枚举的`case`进行`switch`

*非冻结枚举(`nonfrozen enumeration`)* 是一种特殊的枚举类型，它可能在未来会增加新的枚举 case，即使这时候你已经编译并且发布了你的应用，所以在 switch 非冻结枚举前需要深思熟虑。当一个库的作者们把一个枚举标记为非冻结的，这意味着他们保留了增加新的枚举 case 的权利，并且任何和这个枚举交互的代码都必须在无需重新编译的条件下能够处理那些未来可能新加入的 case 。只有演进模式的库代码、标准库代码、用 Swift 实现的 Apple 框架、C 以及 Objective-C 代码才能够声明非冻结枚举。更多关于冻结和非冻结枚举的内容，请参阅 <doc:Attributes#frozen>.

当你对非冻结枚举进行 switch 时，你总是需要有一个`default case`，即使每种枚举类型都已经有对应的 `case` 了。你可以在 `default` 前标注 `@unknown`，意思是这个 `case` 应该只匹配未来加入的枚举 `case`。如果你的 `default case` 中匹配了任何在编译时就能确定的枚举 `case`，Swift 会抛出一个警告。这可以很好地提醒你库的作者已经新增了一种 `case`，并且你还没有去处理。

以下就是一个例子，我们对标准库的 [`Mirror.AncestorRepresentation`](https://developer.apple.com/documentation/swift/mirror/ancestorrepresentation) 进行 switch 操作，每当有新的 case 加入，我们会得到一个警告，提示我们要去处理它。

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

<!--
  - test: `unknown-case`

  ```swifttest
  -> let representation: Mirror.AncestorRepresentation = .generated
  -> switch representation {
     case .customized:
         print("Use the nearest ancestor’s implementation.")
     case .generated:
         print("Generate a default mirror for all ancestor classes.")
     case .suppressed:
         print("Suppress the representation of all ancestor classes.")
  -> @unknown default:
         print("Use a representation that was unknown when this code was compiled.")
     }
  <- Generate a default mirror for all ancestor classes.
  ```
-->

#### 不存在隐式落入

当匹配到的 case 中的代码执行完毕后，switch 语句会直接退出，而不会继续执行下一个 case 。这就意味着，如果你想执行下一个 case，需要显式地在当前 case 中使用 fallthrough 语句。关于 fallthrough 语句的更多信息，请参阅<doc:Statements#Fallthrough-Statement> 。

> switch 语句的语法：
>
> *switch-statement* → **`switch`** *expression* **`{`** *switch-cases*_?_ **`}`** \
> *switch-cases* → *switch-case* *switch-cases*_?_ \
> *switch-case* → *case-label* *statements* \
> *switch-case* → *default-label* *statements* \
> *switch-case* → *conditional-switch-case*
>
> *case-label* → *attributes*_?_ **`case`** *case-item-list* **`:`** \
> *case-item-list* → *pattern* *where-clause*_?_ | *pattern* *where-clause*_?_ **`,`** *case-item-list* \
> *default-label* → *attributes*_?_ **`default`** **`:`**
>
> *where-clause* → **`where`** *where-expression* \
> *where-expression* → *expression*
>
> *conditional-switch-case* → *switch-if-directive-clause* *switch-elseif-directive-clauses*_?_ *switch-else-directive-clause*_?_ *endif-directive* \
> *switch-if-directive-clause* → *if-directive* *compilation-condition* *switch-cases*_?_ \
> *switch-elseif-directive-clauses* → *elseif-directive-clause* *switch-elseif-directive-clauses*_?_ \
> *switch-elseif-directive-clause* → *elseif-directive* *compilation-condition* *switch-cases*_?_ \
> *switch-else-directive-clause* → *else-directive* *switch-cases*_?_

<!--
  The grammar above uses attributes-OPT to match what's used
  in all other places where attributes are allowed,
  although as of Swift 4.2 only a single attribute (@unknown) is allowed.
-->

## 带标签的语句

你可以在循环语句、if 语句、switch 语句或 do 语句前加上*语句标签*，它由标签名称跟一个冒号(`:`)组成。使用语句标签配合 `break` 和 `continue` 语句，以明确你希望如何在循环语句或 switch 语句中改变控制流程，关于`break` 和 `continue` 语句，请参阅<doc:Statements#Break-Statement> 和<doc:Statements#Continue-Statement> 。

标签的作用域在该标签所标记的语句内。可以嵌套使用带标签的语句，但标签名称必须是唯一的。

关于使用带标签的语句的例子，请参阅 <doc:ControlFlow> 中的 <doc:ControlFlow#Labeled-Statements> 。

<!--
  - test: `backtick-identifier-is-legal-label`

  ```swifttest
  -> var i = 0
  -> `return`: while i < 100 {
         i += 1
         if i == 10 {
             break `return`
         }
     }
  -> print(i)
  << 10
  ```
-->

> 带标签语句的语法：
>
> *labeled-statement* → *statement-label* *loop-statement* \
> *labeled-statement* → *statement-label* *if-statement* \
> *labeled-statement* → *statement-label* *switch-statement* \
> *labeled-statement* → *statement-label* *do-statement*
>
> *statement-label* → *label-name* **`:`** \
> *label-name* → *identifier*

## 控制转移语句

控制转移语句能够无条件地把控制权从一片代码转移到另一片代码，从而改变代码执行的顺序。Swift 提供五种类型的控制转移语句：`break`语句、`continue` 语句、`fallthrough` 语句、`return` 语句和 `throw` 语句。

> 控制转移语句的语法：
>
> *control-transfer-statement* → *break-statement* \
> *control-transfer-statement* → *continue-statement* \
> *control-transfer-statement* → *fallthrough-statement* \
> *control-transfer-statement* → *return-statement* \
> *control-transfer-statement* → *throw-statement*

### Break 语句

`break` 语句用于终止`循环`语句、`if` 语句或 `switch` 语句的执行。使用 `break` 语句时，可以只写 `break` 这个关键词，也可以在 `break` 后面跟上标签名，如下：

```swift
break
break <#label name#>
```

当 `break` 语句后面带标签名时，可用于终止由这个标签标记的`循环`语句、`if` 语句或 `switch` 语句的执行。

而只写 `break` 时，则会终止 `switch` 语句或 `break` 语句所属的最内层循环语句的执行。不能使用 `break` 语句来终止未使用标签的 `if` 语句。

在这两种情况下，程序控制会被转移到包围的循环或 switch 语句后面的第一行代码（如果有的话）。

关于使用 break 语句的例子，请参阅<doc:ControlFlow>中的 <doc:ControlFlow#Break> 和 <doc:ControlFlow#Labeled-Statements>。

> break 语句的语法：
>
> *break-statement* → **`break`** *label-name*_?_

### Continue 语句

`continue` 语句用于终止循环中当前迭代的执行，但不会终止该循环的执行。使用 `continue` 语句时，可以只写 `continue` 这个关键词，也可以在 `continue` 后面跟上标签名，如下：

```swift
continue
continue <#label name#>
```

当 `continue` 语句后面带标签名时，可用于终止由这个标签标记的循环中当前迭代的执行。

而当只写 `continue` 时，可用于终止 `continue` 语句所属的最内层循环中当前迭代的执行。

在这两种情况下，控制权都会被转移给循环语句的条件语句。

在 `for` 语句中，`continue` 语句执行后，增量表达式还是会被计算，这是因为每次循环体执行完毕后，增量表达式都会被计算。

关于使用 `continue` 语句的例子，请参阅<doc:ControlFlow>中的<doc:ControlFlow#Continue> 和 <doc:ControlFlow#Labeled-Statements>

> continue 语句的语法：
>
> *continue-statement* → **`continue`** *label-name*_?_

### Fallthrough 语句

`fallthrough` 语句由 `fallthrough` 关键字组成，只能出现在 `switch` 语句的某个 `case` 块中。`fallthrough` 语句会导致程序执行从当前 `switch` 语句的一个 `case` 继续到下一个 `case`。即使下一个 `case` 标签的模式与 `switch` 语句的控制表达式的值不匹配，程序仍会继续执行该 `case`。

`fallthrough` 语句可出现在 `switch` 语句中的任意 `case` 中，但不能出现在最后一个 `case` 中。同时，`fallthrough` 语句也不能把控制权转移到使用了值绑定的 `case`。

关于在 `switch` 语句中使用 `fallthrough` 语句的例子，请参阅<doc:ControlFlow>中的<doc:ControlFlow#Control-Transfer-Statements>。

> fallthrough 语句的语法：
>
> *fallthrough-statement* → **`fallthrough`**

### Return 语句

`return` 语句用于在函数或方法的实现中将控制权转移到调用函数或方法，接着程序将会从调用位置继续向下执行。

使用 `return` 语句时，可以只写 `return` 这个关键词，也可以在 `return` 后面跟上表达式，像下面这样：

```swift
return
return <#expression#>
```

当 `return` 语句后面带表达式时，表达式的值将会返回给调用函数或方法。如果表达式的值的类型与函数或者方法声明的返回类型不匹配，Swift 则会在返回表达式的值之前将表达式的值的类型转换为返回类型。

> 注意： 
> 正如 <doc:Declarations#Failable-Initializers>中所描述的， return 语句的一种特殊形式`return nil`可以在可失败的构造器中使用，以表示构造失败。

<!--
  TODO: Discuss how the conversion takes place and what is allowed to be converted
  in the (yet to be written) chapter on subtyping and type conversions.
-->

当只写 `return` 时，仅仅是从该函数或方法中返回，而不返回任何值（也就是说，函数或方法的返回类型为 `Void` 或者说 `()`）。

> return 语句的语法：
>
> *return-statement* → **`return`** *expression*_?_

### Throw 语句：

`throw` 语句出现在抛出函数或者抛出方法体内，或者类型被 `throws` 关键字标记的闭包表达式体内。

`throw` 语句使程序在当前作用域结束执行，并向外围作用域传播错误。抛出的错误会一直传递，直到被 do 语句的 catch 子句处理掉。

`throw` 语句由 `throw` 关键字紧跟一个表达式组成，如下所示：

```swift
throw <#expression#>
```

 *表达式* 的值必须具有符合`Error`协议的类型。如果包含 `throw` 语句的 `do` 语句或函数声明了它抛出的错误类型，则该表达式的值必须是该类型的实例。

关于如何使用 `throw` 语句的例子，请参阅<doc:ErrorHandling>中的 <doc:ErrorHandling#Propagating-Errors-Using-Throwing-Functions>

> throw 语句的语法：
>
> *throw-statement* → **`throw`** *expression*

## Defer 语句

`defer` 语句用于在将程序控制转移到 `defer` 语句所在作用域之外之前执行代码。

`defer` 语句的形式如下：

```swift
defer {
    <#statements#>
}
```

在 `defer` 语句中的语句无论程序控制如何转移都会被执行。在某些情况下，例如，手动管理资源时，比如关闭文件描述符，或者即使抛出了错误也需要执行一些操作时，就可以使用 `defer` 语句。

`defer` 语句中的语句在包含 `defer` 语句的作用域结束时执行。

```swift
func f(x: Int) {
  defer { print("First defer") }

  if x < 10 {
    defer { print("Second defer") }
    print("End of if")
  }

  print("End of function")
}
f(x: 5)
// Prints "End of if"
// Prints "Second defer"
// Prints "End of function"
// Prints "First defer"
```

<!--
  ```swifttest
  -> func f(x: Int) {
    defer { print("First defer") }

    if x < 10 {
      defer { print("Second defer") }
      print("End of if")
    }

    print("End of function")
  }
  f(x: 5)
  <- End of if
  <- Second defer
  <- End of function
  <- First defer
  ```
-->

在上面的代码中，`if` 语句中的 `defer` 会在函数 f 中声明的 `defer` 之前执行，因为 `if` 语句的作用域在函数的作用域之前结束。

如果多个 `defer` 语句出现在同一作用域中，它们的出现顺序与执行顺序相反。在给定作用域内，首先执行最后一个 `defer` 语句，这意味着该最后一个 `defer` 语句内部的语句可以引用将由其他 `defer` 语句清理的资源。

```swift
func f() {
    defer { print("First defer") }
    defer { print("Second defer") }
    print("End of function")
}
f()
// Prints "End of function"
// Prints "Second defer"
// Prints "First defer"
```

<!--
  ```swifttest
  -> func f() {
         defer { print("First defer") }
         defer { print("Second defer") }
         print("End of function")
     }
     f()
  <- End of function
  <- Second defer
  <- First defer
  ```
-->

`defer` 语句中的语句无法将控制权转移到 `defer` 语句外部。

> defer 语句的语法：
>
> *defer-statement* → **`defer`** *code-block*

## Do 语句

`do` 语句用于引入一个新的作用域，该作用域中可以含有一个或多个 `catch` 子句，`catch` 子句中定义了一些匹配错误条件的模式。`do` 语句作用域内定义的常量和变量只能在 `do` 语句作用域内使用。

Swift 中的 `do` 语句与 C 中限定代码块界限的大括号（`{}`）很相似，也并不会降低程序运行时的性能。

`do` 语句的形式如下：

```swift
do {
    try <#expression#>
    <#statements#>
} catch <#pattern 1#> {
    <#statements#>
} catch <#pattern 2#> where <#condition#> {
    <#statements#>
} catch <#pattern 3#>, <#pattern 4#> where <#condition#> {
    <#statements#>
} catch {
    <#statements#>
}
```

`do` 语句可以选择性地指定它抛出的错误类型，形式如下：

```swift
do throws(<#type#>) {
    try <#expression#>
} catch <#pattern> {
    <#statements#>
} catch {
    <#statements#>
}
```

如果 `do` 语句包含 `throws` 子句，则 `do` 块只能抛出指定类型的错误。类型必须是符合 `Error` 协议的具体类型、符合 `Error` 协议的不透明类型，或者是被封装的协议类型 `any Error`。如果 `do` 语句没有指定它抛出的错误类型，Swift 将按照以下方式推断错误类型：

- 如果 `do` 代码块中的每个 `throws` 语句和 `try` 表达式都嵌套在一个全面的错误处理机制中，则 Swift 推断该 `do` 语句是非抛出的。

- 如果 `do` 代码块包含的代码抛出只有单一类型的错误，并且没有全面的错误处理（除了抛出 `Never`），则 Swift 推断该 `do` 语句抛出该具体错误类型。

- 如果 `do` 代码块包含的代码抛出超过一种类型的错误，并且没有全面的错误处理，则 Swift 推断该 `do` 语句抛出 `any Error`。

有关处理具有显式类型的错误的更多信息，可参阅 <doc:ErrorHandling#Specifying-the-Error-Type>.

如果 `do` 代码块中的任何语句抛出了错误，程序会跳转到第一个能模式匹配该错误的 `catch` 子句。如果没有任何子句匹配，错误会传递到外层作作用域。如果错误在最顶层依旧没有被处理，程序执行会因为运行时错误而停止。

如同 `switch` 语句，编译器会判断 `catch` 子句是否有遗漏。如果 `catch` 子句没有遗漏，则认为错误已被处理。否则，错误会自动传递到外层作用域，被某个 `catch` 子句处理掉或者被用 `throws` 关键字声明的抛出函数继续向外抛出。

拥有多个模式匹配的 `catch` 子句只需其中一个匹配到错误即可。如果 `catch` 子句拥有多个模式匹配，所有的模式必须包含相同的绑定常量或变量，并且每个 `catch` 子句里所有绑定的变量或常量的类型必须相同。

<!--
  The discussion above of multi-pattern catch
  matches the discussion of multi-pattern case under Switch Statement.
-->

为了确保错误已经被处理，可以让 `catch` 子句使用匹配所有错误的模式，如通配符模式（`_`）。如果一个 `catch` 子句不指定一种具体模式，`catch` 子句会匹配任何错误，并绑定到名为 `error` 的局部常量。有关在 `catch` 子句中使用模式的更多信息，
可参阅 <doc:Patterns>.

关于如何在 `do` 语句中使用一系列 `catch` 子句的例子，请参阅<doc:ErrorHandling#Handling-Errors>.

> do 语句的语法：
>
> *do-statement* → **`do`** *throws-clause*_?_ *code-block* *catch-clauses*_?_ \
> *catch-clauses* → *catch-clause* *catch-clauses*_?_ \
> *catch-clause* → **`catch`** *catch-pattern-list*_?_ *code-block* \
> *catch-pattern-list* → *catch-pattern* | *catch-pattern* **`,`** *catch-pattern-list* \
> *catch-pattern* → *pattern* *where-clause*_?_

## 编译器控制语句

编译器控制语句允许程序改变编译器的行为。Swift 有三种编译器控制语句：条件编译语句、线路控制语句和编译时诊断语句。

> 编译器控制语句的语法：
>
> *compiler-control-statement* → *conditional-compilation-block* \
> *compiler-control-statement* → *line-control-statement* \
> *compiler-control-statement* → *diagnostic-statement*

### 条件编译代码块：

条件编译代码块可以根据一个或多个配置来有条件地编译代码。

每一个条件编译代码块都以 `#if` 开始，`#endif` 结束。如下：

```swift
#if <#compilation condition#>
    <#statements#>
#endif
```

和`if`语句的条件不同， *编译条件* 是在编译时进行判断的。因此，只有当编译条件在编译时评估为 `true` 时，语句才会被编译和执。

编译条件可以包括 `true` 和 `false` 布尔字面量、与 `-D` 命令行标志一起使用的标识符，或者下表中列出的任何平台条件。

| Platform condition | Valid arguments |
| ------------------ | --------------- |
| `os()` | `macOS`, `iOS`, `watchOS`, `tvOS`, `visionOS`, `Linux`, `Windows` |
| `arch()` | `i386`, `x86_64`, `arm`, `arm64` |
| `swift()` | `>=` or `<` followed by a version number |
| `compiler()` | `>=` or `<` followed by a version number |
| `canImport()` | A module name |
| `targetEnvironment()` | `simulator`, `macCatalyst` |

<!--
  For the full list in the compiler, see the values of
  SupportedConditionalCompilationOSs and SupportedConditionalCompilationArches
  in the file lib/Basic/LangOptions.cpp.
  Some of the OSes and architectures are listed there
  because there's experimental work to port Swift to them.
  We won't list them here until they're officially supported.
  The compiler also accepts pretty much any string --
  for example "#if os(toaster)" compiles just fine,
  but Swift doesn't actually support running on a toaster oven --
  so don't rely on that when checking possible os/arch values.
-->

<!--
  The target environment "UIKitForMac"
  is understood by the compiler as a synonym for "macCatalyst",
  but that spelling is marked "Must be removed" outside of a few places,
  so it's omitted from the table above.
-->

在 `swift()` 和 `compiler()` 之后的版本号包含有主版本号，可选副版本号，可选补丁版本号类似，并且用（`.`）来分隔。在比较符和版本号之间不能有空格，版本号与前面的函数相对应，比如 `compiler()` 对应的就是这个编译器的版本号，`swift()` 对应的就是你要编译的 Swift 语言的版本号。举个简单的例子，如果你在使用 `Swift 5` 的编译器，想编译 `Swift 4.2` ，可以看下面的例子：

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
// Prints "Compiled with the Swift 5 compiler or later"
// Prints "Compiled in Swift 4.2 mode or later"
// Prints "Compiled with the Swift 5 compiler or later in a Swift mode earlier than 5"
```

<!--
  ```swifttest
  -> #if compiler(>=5)
     print("Compiled with the Swift 5 compiler or later")
     #endif
     #if swift(>=4.2)
     print("Compiled in Swift 4.2 mode or later")
     #endif
     #if compiler(>=5) && swift(<5)
     print("Compiled with the Swift 5 compiler or later in a Swift mode earlier than 5")
     #endif
  <- Compiled with the Swift 5 compiler or later
  <- Compiled in Swift 4.2 mode or later
  // Prints "Compiled with the Swift 5 compiler or later in a Swift mode earlier than 5"
  ```
-->

<!--
  That testcode is cheating by explicitly printing the third line of output,
  since it's not actually running in Swift 4.2 mode.
-->

`canImport()` 条件传入的实参是模块的名字，这个模块可能并不是每个平台上都存在的。该模块的命名可以包含 . 符号。使用它可以检测是否可以导入这个模块，但实际上并没有导入。如果模块存在就返回 `true`，否则返回 `false` 。

<!--
  - test: `canImport_A, canImport`

  ```swifttest
  >> public struct SomeStruct {
  >>     public init() { }
  >> }
  ```
-->

<!--
  - test: `canImport_A.B, canImport`

  ```swifttest
  >> public struct AnotherStruct {
  >>     public init() { }
  >> }
  ```
-->

<!--
  - test: `canImport`

  ```swifttest
  >> import canImport_A
  >> let s = SomeStruct()
  >> #if canImport(canImport_A)
  >> #else
  >> #error("Can't import A")
  >> #endif
  ---
  >> #if canImport(canImport_A.B)
  >> #else
  >> #error("Can't import A.B")
  >> #endif
  ```
-->

`targetEnvironment()` 条件在特殊环境编译时返回 `true`；否则返回 `false`。

> 注意： `arch(arm)` 平台检测函数在 ARM 64 位设备上不会返回 `true` 。如果代码在 32 位的 iOS 模拟器上编译，`arch(i386)` 平台检测函数会返回 `true`。

<!--
  - test: `pound-if-swift-version`

  ```swifttest
  -> #if swift(>=2.1)
         print(1)
     #endif
  << 1
  -> #if swift(>=2.1) && true
         print(2)
     #endif
  << 2
  -> #if swift(>=2.1) && false
         print(3)
     #endif
  -> #if swift(>=2.1.9.9.9.9.9.9.9.9.9)
         print(5)
     #endif
  << 5
  ```
-->

<!--
  - test: `pound-if-swift-version-err`

  ```swifttest
  -> #if swift(>= 2.1)
         print(4)
     #endif
  !$ error: unary operator cannot be separated from its operand
  !! #if swift(>= 2.1)
  !!           ^ ~
  !!-
  ```
-->

<!--
  - test: `pound-if-compiler-version`

  ```swifttest
  -> #if compiler(>=4.2)
         print(1)
     #endif
  << 1
  -> #if compiler(>=4.2) && true
         print(2)
     #endif
  << 2
  -> #if compiler(>=4.2) && false
         print(3)
     #endif
  ```
-->

你可以使用逻辑操作符 `&&`、`||` 和 `!` 来组合多个编译配置，还可以使用圆括号来进行分组。这些运算符与用于组合普通布尔表达式的逻辑运算符具有相同的结合性和优先级。

类似于 `if` 语句，你可以添加多个条件分支来测试不同的编译条件。你可以使用 `#elseif` 子句添加任意数量的附加分支。你还可以使用 `#else` 子句添加一个最终的附加分支。包含多个分支的条件编译块具有以下形式：

```swift
#if <#compilation condition 1#>
    <#statements to compile if compilation condition 1 is true#>
#elseif <#compilation condition 2#>
    <#statements to compile if compilation condition 2 is true#>
#else
    <#statements to compile if both compilation conditions are false#>
#endif
```

> 注意： 即使没有被编译，上面编译配置中的每个语句仍然会被解析。然而，唯一的例外是编译配置语句中包含 `swift()` 或 `compiler()` 条件：这时仅当编译器版本和语言版本匹配时，语句才会被解析。这种设定能确保旧的编译器不会尝试去解析新 Swift 版本的语法。

关于在条件编译块中如何包装显式成员表达式，请参见<doc:Expressions#Explicit-Member-Expression>。

> 条件编译代码块的语法：
>
> *conditional-compilation-block* → *if-directive-clause* *elseif-directive-clauses*_?_ *else-directive-clause*_?_ *endif-directive*
>
> *if-directive-clause* → *if-directive* *compilation-condition* *statements*_?_ \
> *elseif-directive-clauses* → *elseif-directive-clause* *elseif-directive-clauses*_?_ \
> *elseif-directive-clause* → *elseif-directive* *compilation-condition* *statements*_?_ \
> *else-directive-clause* → *else-directive* *statements*_?_ \
> *if-directive* → **`#if`** \
> *elseif-directive* → **`#elseif`** \
> *else-directive* → **`#else`** \
> *endif-directive* → **`#endif`**
>
> *compilation-condition* → *platform-condition* \
> *compilation-condition* → *identifier* \
> *compilation-condition* → *boolean-literal* \
> *compilation-condition* → **`(`** *compilation-condition* **`)`** \
> *compilation-condition* → **`!`** *compilation-condition* \
> *compilation-condition* → *compilation-condition* **`&&`** *compilation-condition* \
> *compilation-condition* → *compilation-condition* **`||`** *compilation-condition*
>
> *platform-condition* → **`os`** **`(`** *operating-system* **`)`** \
> *platform-condition* → **`arch`** **`(`** *architecture* **`)`** \
> *platform-condition* → **`swift`** **`(`** **`>=`** *swift-version* **`)`** | **`swift`** **`(`** **`<`** *swift-version* **`)`** \
> *platform-condition* → **`compiler`** **`(`** **`>=`** *swift-version* **`)`** | **`compiler`** **`(`** **`<`** *swift-version* **`)`** \
> *platform-condition* → **`canImport`** **`(`** *import-path* **`)`** \
> *platform-condition* → **`targetEnvironment`** **`(`** *environment* **`)`**
>
> *operating-system* → **`macOS`** | **`iOS`** | **`watchOS`** | **`tvOS`** | **`visionOS`** | **`Linux`** | **`Windows`** \
> *architecture* → **`i386`** | **`x86_64`** | **`arm`** | **`arm64`** \
> *swift-version* → *decimal-digits* *swift-version-continuation*_?_ \
> *swift-version-continuation* → **`.`** *decimal-digits* *swift-version-continuation*_?_ \
> *environment* → **`simulator`** | **`macCatalyst`**

<!--
  Testing notes:

  !!true doesn't work but !(!true) does -- this matches normal expressions
  #if can be nested, as expected

  Also, the body of a conditional compilation block contains *zero* or more statements.
  Thus, this is allowed:
      #if
      #elseif
      #else
      #endif
-->

### 行控制语句

行控制语句用于指定一个行号和文件名，这些行号和文件名可以与正在编译的源代码的行号和文件名不同。使用行控制语句可以更改 Swift 用于诊断和调试目的的源代码位置。

行控制语句形式如下：

```swift
#sourceLocation(file: <#file path#>, line: <#line number#>)
#sourceLocation()
```

第一种的行控制语句会改变该语句之后的代码中的字面量表达式 `#line`、 `#file`、`#fileID` 和 `#filePath` 所表示的值，从行控制语句里行号的代码开始。*行号*是一个大于 0 的整形字面量，会改变 `#line` 表达式的值。*file path*会更改 `#file`、`#fileID` 和 `#filePath` 的值，并且是一个字符串字面量。指定的字符串成为 `#filePath` 的值，字符串的最后一个路径组件用于 `#fileID` 的值。关于 `#file`、 `#fileID` 和 `#filePath`，可参阅<doc:Expressions#Literal-Expression>.

行控制语句的第二种形式是 `#sourceLocation()`，会将源代码的定位信息重置回默认的行号和文件名。

> 行控制语句的语法:
>
> *line-control-statement* → **`#sourceLocation`** **`(`** **`file:`** *file-path* **`,`** **`line:`** *line-number* **`)`** \
> *line-control-statement* → **`#sourceLocation`** **`(`** **`)`** \
> *line-number* → A decimal integer greater than zero \
> *file-path* → *static-string-literal*

### 编译时诊断语句

在 `Swift 5.9` 之前，`#warning`和`#error`语句在编译期间会发出诊断。。现在，这一行为由 Swift 标准库中的 [warning(_:)][] 和 [error(_:)][] 宏提供。

[`warning(_:)`]: http://developer.apple.com/documentation/swift/documentation/swift/warning(_:)
[`error(_:)`]: http://developer.apple.com/documentation/swift/documentation/swift/error(_:)

## 可用性条件

可用性条件可作为 `if`，`while`，`guard` 语句的条件，可以在运行时基于特定的平台参数来查询 API 的可用性。

可用性条件的形式如下：

```swift
if #available(<#platform name#> <#version#>, <#...#>, *) {
    <#statements to execute if the APIs are available#>
} else {
    <#fallback statements to execute if the APIs are unavailable#>
}
```

使用可用性条件来执行一个代码块时，取决于使用的 API 在运行时是否可用，编译器会根据可用性条件提供的信息来决定是否执行相应的代码块。

可用性条件使用一系列逗号分隔的平台名称和版本。使用 `iOS`，`macOS`，`watchOS`，`tvOS`，`visionOS` 作为平台名称，并写上相应的版本号。`*` 参数是必须写的，用于处理未来的潜在平台。可用性条件确保了运行时的平台不低于条件中指定的平台版本时才执行代码块。

与布尔类型的条件不同，不能用逻辑运算符 `&&` 和 `||` 组合可用性条件。不要使用 `!` 来表示平台不可以用，可以使用“不可用性条件”，其形式如下：

```swift
if #unavailable(<#platform name#> <#version#>, <#...#>) {
    <#fallback statements to execute if the APIs are unavailable#>
} else {
    <#statements to execute if the APIs are available#>
}
```

`#unavailable` 形式是语法糖，用于取反条件。在不可用性条件中，`*` 参数是隐式的，不能包含。它与可用性条件中的 `*` 参数具有相同的含义。

> 可用性条件的语法：
>
> *availability-condition* → **`#available`** **`(`** *availability-arguments* **`)`** \
> *availability-condition* → **`#unavailable`** **`(`** *availability-arguments* **`)`** \
> *availability-arguments* → *availability-argument* | *availability-argument* **`,`** *availability-arguments* \
> *availability-argument* → *platform-name* *platform-version* \
> *availability-argument* → **`*`**
>
>
>
> *platform-name* → **`iOS`** | **`iOSApplicationExtension`** \
> *platform-name* → **`macOS`** | **`macOSApplicationExtension`** \
> *platform-name* → **`macCatalyst`** | **`macCatalystApplicationExtension`** \
> *platform-name* → **`watchOS`** | **`watchOSApplicationExtension`** \
> *platform-name* → **`tvOS`** | **`tvOSApplicationExtension`** \
> *platform-name* → **`visionOS`** | **`visionOSApplicationExtension`** \
> *platform-version* → *decimal-digits* \
> *platform-version* → *decimal-digits* **`.`** *decimal-digits* \
> *platform-version* → *decimal-digits* **`.`** *decimal-digits* **`.`** *decimal-digits*

<!--
  If you need to add a new platform to this list,
  you probably need to update the list under @available too.
-->

<!--
  - test: `pound-available-platform-names`

  ```swifttest
  >> if #available(iOS 1, iOSApplicationExtension 1,
  >>               macOS 1, macOSApplicationExtension 1,
  >>               macCatalyst 1, macCatalystApplicationExtension 1,
  >>               watchOS 1, watchOSApplicationExtension 1,
  >>               tvOS 1, tvOSApplicationExtension 1,
  >>               visionOS 1, visionOSApplicationExtension 1, *) {
  >>     print("a")
  >> } else {
  >>     print("b")
  >> }
  >> if #available(madeUpPlatform 1, *) {
  >>     print("c")
  >> }
  >> if #unavailable(fakePlatform 1) {
  >>     print("d")
  >> } else {
  >>     print("dd")
  >> }
  !$ warning: unrecognized platform name 'madeUpPlatform'
  !$ if #available(madeUpPlatform 1, *) {
  !$               ^
  !$ warning: unrecognized platform name 'fakePlatform'
  !$ if #unavailable(fakePlatform 1) {
  !$                 ^
  << a
  << c
  << dd
  ```
-->

<!--
  - test: `empty-availability-condition`

  ```swifttest
  >> if #available(*) { print("1") }
  << 1
  ```
-->

<!--
  - test: `empty-unavailability-condition`

  ```swifttest
  >> if #unavailable() { print("2") }
  !$ error: expected platform name
  !$ if #unavailable() { print("2") }
  !$                ^
  ```
-->

> Beta Software:
>
> This documentation contains preliminary information about an API or technology in development. This information is subject to change, and software implemented according to this documentation should be tested with final operating system software.
>
> Learn more about using [Apple's beta software](https://developer.apple.com/support/beta-software/).

<!--
This source file is part of the Swift.org open source project

Copyright (c) 2014 - 2022 Apple Inc. and the Swift project authors
Licensed under Apache License v2.0 with Runtime Library Exception

See https://swift.org/LICENSE.txt for license information
See https://swift.org/CONTRIBUTORS.txt for the list of Swift project authors
-->
