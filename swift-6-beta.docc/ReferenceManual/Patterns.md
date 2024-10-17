# 模式

匹配和解构值.

*模式* 表示单个值或复合值的结构。例如，元组`(1, 2)` 的结构是两个元素的逗号分隔列表。由于模式代表值的结构而不是任何一个特定值，因此您可以将它们与多种值进行匹配。例如，模式 `(x, y)`与元组 `(1, 2)` 和任何其他二元素元组匹配。除了将模式与值进行匹配之外，您还可以提取复合值的部分或全部并将每个部分绑定到常量或变量名称。

在 Swift 中，有两种基本类型的模式：那些成功匹配任何类型值的模式，以及那些在运行时可能无法匹配指定值的模式。

第一种模式用于解构简单变量、常量和可选绑定中的值。其中包括通配符模式、标识符模式以及包含它们的任何值绑定或元组模式。您可以为这些模式指定类型注释，以限制它们仅匹配特定类型的值。

第二种模式用于完整模式匹配，其中您尝试匹配的值在运行时可能不存在。其中包括枚举案例模式、可选模式、表达式模式和类型转换模式。您可以在 `switch` 语句的 case 标签、 `do` 语句的 `catch`子句或 `if` 、 `while`  、 `guard` 或 `for`  - `in` 语句的 case 条件中使用这些模式。

> 模式语法:
>
> *pattern* → *wildcard-pattern* *type-annotation*_?_ \
> *pattern* → *identifier-pattern* *type-annotation*_?_ \
> *pattern* → *value-binding-pattern* \
> *pattern* → *tuple-pattern* *type-annotation*_?_ \
> *pattern* → *enum-case-pattern* \
> *pattern* → *optional-pattern* \
> *pattern* → *type-casting-pattern* \
> *pattern* → *expression-pattern*

## 通配符模式

*通配符模式* 匹配并忽略任何值，并由下划线(`_`) 组成. 当您不关心要匹配的值时，请使用通配符模式。例如，以下代码迭代封闭范围 `1...3`,忽略循环每次迭代中范围的当前值:

```swift
for _ in 1...3 {
    // Do something three times.
}
```

<!--
  - test: `wildcard-pattern`

  ```swifttest
  -> for _ in 1...3 {
        // Do something three times.
     }
  ```
-->

> 通配符模式的语法:
>
> *wildcard-pattern* → **`_`**

## 标识符模式

*标识符模式* 匹配任何值并将匹配的值绑定到变量或常量名称.例如，在以下常量声明中`someValue` 是与 `Int` 类型的值 `42` 匹配的标识符模式:

```swift
let someValue = 42
```

<!--
  - test: `identifier-pattern`

  ```swifttest
  -> let someValue = 42
  ```
-->

当匹配成功时,值 `42` 被绑定（分配）到常量名称 `someValue` .

当变量或常量声明左侧的模式是标识符模式时，标识符模式隐式是值绑定模式的子模式.

> 标识符模式的语法:
>
> *identifier-pattern* → *identifier*

## 价值绑定模式

*值绑定模式* 将匹配的值绑定到变量或常量名称。将匹配值绑定到常量名称的值绑定模式以 `let` 关键字开头；那些绑定到变量名称的变量以`var`关键字开头.

值绑定模式中的标识符模式将新的命名变量或常量绑定到其匹配值。例如，您可以分解元组的元素并将每个元素的值绑定到相应的标识符模式

```swift
let point = (3, 2)
switch point {
// Bind x and y to the elements of point.
case let (x, y):
    print("The point is at (\(x), \(y)).")
}
// Prints "The point is at (3, 2)."
```

<!--
  - test: `value-binding-pattern`

  ```swifttest
  -> let point = (3, 2)
  -> switch point {
        // Bind x and y to the elements of point.
        case let (x, y):
           print("The point is at (\(x), \(y)).")
     }
  <- The point is at (3, 2).
  ```
-->

在上面的示例中， `let` 分配给元组模式`(x, y)` 中的每个标识符模式。由于此行为， `switch`  case `case let (x, y):` 和`case (let x, let y):` 匹配相同的值

> 值绑定模式的语法:
>
> *value-binding-pattern* → **`var`** *pattern* | **`let`** *pattern*

<!--
  NOTE: We chose to call this "value-binding pattern"
  instead of "variable pattern",
  because it's a pattern that binds values to either variables or constants,
  not a pattern that varies.
  "Variable pattern" is ambiguous between those two meanings.
-->

## 元组模式

*元组模式* 是零个或多个模式的逗号分隔列表，括在括号中。元组模式匹配相应元组类型的值

您可以使用类型注释来约束元组模式以匹配某些类型的元组类型。例如，常量声明中的元组模式`(x, y): (Int, Int)`  `let (x, y): (Int, Int) = (1, 2)`  仅匹配两个元素均为 `Int` 类型的元组类型`.

当元组模式用作 `for`  - `in` 语句或变量或常量声明中的模式时，它只能包含通配符模式、标识符模式、可选模式或包含这些模式的其他元组模式。例如，以下代码无效，因为元组模式 `(x, 0)` 中的元素0是表达式模式:

```swift
let points = [(0, 0), (1, 0), (1, 1), (2, 0), (2, 1)]
// This code isn't valid.
for (x, 0) in points {
    /* ... */
}
```

<!--
  - test: `tuple-pattern`

  ```swifttest
  -> let points = [(0, 0), (1, 0), (1, 1), (2, 0), (2, 1)]
  -> // This code isn't valid.
  -> for (x, 0) in points {
  >>    _ = x
        /* ... */
     }
  !$ error: expected pattern
  !! for (x, 0) in points {
  !!         ^
  ```
-->

包含单个元素的元组模式周围的括号不起作用。该模式与该单个元素类型的值相匹配。例如，以下内容是等效的:

<!--
  This test needs to be compiled.
  The error message in the REPL is unpredictable as of
  Swift version 1.1 (swift-600.0.54.20)
-->

```swift
let a = 2        // a: Int = 2
let (a) = 2      // a: Int = 2
let (a): Int = 2 // a: Int = 2
```

<!--
  - test: `single-element-tuple-pattern`

  ```swifttest
  -> let a = 2        // a: Int = 2
  -> let (a) = 2      // a: Int = 2
  -> let (a): Int = 2 // a: Int = 2
  !$ error: invalid redeclaration of 'a'
  !! let (a) = 2      // a: Int = 2
  !! ^
  !$ note: 'a' previously declared here
  !! let a = 2        // a: Int = 2
  !! ^
  !$ error: invalid redeclaration of 'a'
  !! let (a): Int = 2 // a: Int = 2
  !! ^
  !$ note: 'a' previously declared here
  !! let a = 2        // a: Int = 2
  !! ^
  ```
-->

> Grammar of a tuple pattern:
>
> *tuple-pattern* → **`(`** *tuple-pattern-element-list*_?_ **`)`** \
> *tuple-pattern-element-list* → *tuple-pattern-element* | *tuple-pattern-element* **`,`** *tuple-pattern-element-list* \
> *tuple-pattern-element* → *pattern* | *identifier* **`:`** *pattern*

## 枚举案例模式

*枚举大小写模式*  与现有枚举类型的大小写匹配。枚举 case 模式出现在 `switch` 语句 case 标签以及 `if`  、 `while`  、 `guard` 和`for`  - `in` 语句的 case 条件中。

如果您尝试匹配的枚举大小写具有任何关联值，则相应的枚举大小写模式必须指定一种元组模式，其中每个关联值都包含一个元素。有关使用`switch` 语句来匹配包含关联值的枚举情况的示例，请参阅 <doc:Enumerations#Associated-Values>.

枚举大小写模式还匹配包装在可选值中的该大小写的值。这种简化的语法允许您省略可选模式。请注意，由于 `Optional` 是作为枚举实现的，因此 `.none` 和 `.some` 可以与枚举类型的情况出现在同一开关中

```swift
enum SomeEnum { case left, right }
let x: SomeEnum? = .left
switch x {
case .left:
    print("Turn left")
case .right:
    print("Turn right")
case nil:
    print("Keep going straight")
}
// Prints "Turn left"
```

<!--
  - test: `enum-pattern-matching-optional`

  ```swifttest
  -> enum SomeEnum { case left, right }
  -> let x: SomeEnum? = .left
  -> switch x {
     case .left:
         print("Turn left")
     case .right:
         print("Turn right")
     case nil:
         print("Keep going straight")
     }
  <- Turn left
  ```
-->

> Grammar of an enumeration case pattern:
>
> *enum-case-pattern* → *type-identifier*_?_ **`.`** *enum-case-name* *tuple-pattern*_?_

## 可选图案

可选模式与包含在 `Optional<Wrapped>` 枚举的 `some(Wrapped)` 情况中的值相匹配。可选模式由标识符模式组成，后面紧跟一个问号，并出现在与枚举案例模式相同的位置

由于可选模式是 `Optional`枚举案例模式的语法糖，因此以下内容是等效的：

```swift
let someOptional: Int? = 42
// Match using an enumeration case pattern.
if case .some(let x) = someOptional {
    print(x)
}

// Match using an optional pattern.
if case let x? = someOptional {
    print(x)
}
```

<!--
  - test: `optional-pattern`

  ```swifttest
  -> let someOptional: Int? = 42
  -> // Match using an enumeration case pattern.
  -> if case .some(let x) = someOptional {
        print(x)
     }
  << 42
  ---
  -> // Match using an optional pattern.
  -> if case let x? = someOptional {
        print(x)
     }
  << 42
  ```
-->

可选模式提供了一种方便的方法来迭代 `for` - `in`语句中的可选值数组，仅对非 `nil` 元素执行循环体

```swift
let arrayOfOptionalInts: [Int?] = [nil, 2, 3, nil, 5]
// Match only non-nil values.
for case let number? in arrayOfOptionalInts {
    print("Found a \(number)")
}
// Found a 2
// Found a 3
// Found a 5
```

<!--
  - test: `optional-pattern-for-in`

  ```swifttest
  -> let arrayOfOptionalInts: [Int?] = [nil, 2, 3, nil, 5]
  -> // Match only non-nil values.
  -> for case let number? in arrayOfOptionalInts {
        print("Found a \(number)")
     }
  </ Found a 2
  </ Found a 3
  </ Found a 5
  ```
-->

> Grammar of an optional pattern:
>
> *optional-pattern* → *identifier-pattern* **`?`**

## 类型转换模式

有两种类型转换模式： `is` 模式和`as` 模式。 `is` 模式仅出现在`switch` 语句 case 标签中. `is` 和 `as` 模式具有以下形式:

```swift
is <#type#>
<#pattern#> as <#type#>
```

如果运行时值的 `is` 与 `is` 模式与该值匹配 - 或者该类型的子类。 `is` 模式的行为类似于 `is` 运算符，因为它们都执行类型转换但丢弃返回的类型。

如果运行时该值的类型与`as模` 式右侧指定的类型相同，则 `as` 模式与该值匹配 - 或者该类型的子类。如果匹配成功，则匹配值的类型将转换为 `as` 模式右侧指定的模式

有关使用 `switch` 语句将值与 `is` 和 `as` 模式进行匹配的示例，请参阅 <doc:TypeCasting#Type-Casting-for-Any-and-AnyObject>.

> Grammar of a type casting pattern:
>
> *type-casting-pattern* → *is-pattern* | *as-pattern* \
> *is-pattern* → **`is`** *type* \
> *as-pattern* → *pattern* **`as`** *type*

## 表达模式

*表达式模式* 表示表达式的值。表达式模式仅出现在*switch* 语句 *case*  标签中

使用 Swift 标准库中的模式匹配运算符 ( `~=` ) 将表达式模式表示的表达式与输入表达式的值进行比较。如果`~=` 运算符返回`true` 则匹配成功。默认情况下， `~= ` 运算符使用`==`运算符比较相同类型的两个值。它还可以通过检查值是否包含在范围内来将值与值范围匹配，如以下示例所示。

```swift
let point = (1, 2)
switch point {
case (0, 0):
    print("(0, 0) is at the origin.")
case (-2...2, -2...2):
    print("(\(point.0), \(point.1)) is near the origin.")
default:
    print("The point is at (\(point.0), \(point.1)).")
}
// Prints "(1, 2) is near the origin."
```

<!--
  - test: `expression-pattern`

  ```swifttest
  -> let point = (1, 2)
  -> switch point {
        case (0, 0):
           print("(0, 0) is at the origin.")
        case (-2...2, -2...2):
           print("(\(point.0), \(point.1)) is near the origin.")
        default:
           print("The point is at (\(point.0), \(point.1)).")
     }
  <- (1, 2) is near the origin.
  ```
-->

您可以重载`~=` 运算符以提供自定义表达式匹配行为。例如，您可以重写上面的示例，以将`point`表达式与点的字符串表示形式进行比较.

```swift
// Overload the ~= operator to match a string with an integer.
func ~= (pattern: String, value: Int) -> Bool {
    return pattern == "\(value)"
}
switch point {
case ("0", "0"):
    print("(0, 0) is at the origin.")
default:
    print("The point is at (\(point.0), \(point.1)).")
}
// Prints "The point is at (1, 2)."
```

<!--
  - test: `expression-pattern`

  ```swifttest
  -> // Overload the ~= operator to match a string with an integer.
  -> func ~= (pattern: String, value: Int) -> Bool {
        return pattern == "\(value)"
     }
  -> switch point {
        case ("0", "0"):
           print("(0, 0) is at the origin.")
        default:
           print("The point is at (\(point.0), \(point.1)).")
     }
  <- The point is at (1, 2).
  ```
-->

> 表达式模式的语法:
>
> *expression-pattern* → *expression*

> 测试版软件:
>
> 本文档包含有关正在开发的 API 或技术的初步信息。该信息可能会发生变化，并且根据本文档实现的软件应使用最终操作系统软件进行测试.
>
> 了解有关使用 [Apple 测试软件的](https://developer.apple.com/support/beta-software/)更多信息.

<!--
This source file is part of the Swift.org open source project

Copyright (c) 2014 - 2022 Apple Inc. and the Swift project authors
Licensed under Apache License v2.0 with Runtime Library Exception

See https://swift.org/LICENSE.txt for license information
See https://swift.org/CONTRIBUTORS.txt for the list of Swift project authors
-->
