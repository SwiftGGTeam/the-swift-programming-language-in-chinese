# 基本运算符

执行赋值、算术和比较等操作。

*运算符*是一种特殊的符号或短语，用于检查、更改或组合值。例如，加法运算符（`+`）将两个数字相加，如 `let i = 1 + 2`，逻辑与运算符（`&&`）组合两个布尔值，如 `if enteredDoorCode && passedRetinaScan`。

Swift 支持类似 C 等你已所熟知的语言中的运算符，并改进了几个功能，以消除常见的编码错误。赋值运算符（`=`）不返回值，以防止它被误用时等于运算符（`==`）被意外使用。算术运算符（`+`、`-`、`*`、`/`、`%` 等）检测并禁止值溢出，以避免在处理超出存储它们的类型允许值范围的较大或较小数字时出现意外结果。你可以选择使用 Swift 的溢出运算符来处理值溢出行为，如 <doc:AdvancedOperators#溢出运算符> 中所述。

Swift 还提供了 C 语言中没有的区间运算符，如 `a..<b` 和 `a...b`，作为表达值范围的快捷方式。

本章介绍了 Swift 中的常见运算符。<doc:AdvancedOperators> 涵盖了 Swift 的高级运算符，并描述了如何定义自定义运算符以及为自定义类型实现标准运算符。

## 术语

运算符可以是一元、二元或三元：

- *一元*运算符作用于单个目标（如 `-a`）。一元*前置*运算符紧跟在其目标之前（如 `!b`），一元*后置*运算符紧跟在其目标之后（如 `c!`）。
- *二元*运算符作用于两个目标（如 `2 + 3`），是*中置*的，因为它们出现在两个目标之间。
- *三元*运算符作用于三个目标。与 C 一样，Swift 只有一个三元运算符，即三元条件运算符（`a ? b : c`）。

运算符影响的值称为*操作数*。在表达式 `1 + 2` 中，`+` 符号是一个中置运算符，它的两个操作数是值 `1` 和 `2`。

## 赋值运算符

*赋值运算符*（`a = b`）用 `b` 的值初始化或更新 `a` 的值：

```swift
let b = 10
var a = 5
a = b
// a 现在等于 10
```

<!--
  - test: `assignmentOperator`

  ```swifttest
  -> let b = 10
  -> var a = 5
  -> a = b
  /> a 现在等于 \(a)
  </ a 现在等于 10
  ```
-->

如果赋值运算符的右侧是一个包含多个值的元组，可以将其元素同时分解为多个常量或变量：

```swift
let (x, y) = (1, 2) // x 等于 1, y 等于 2
```

<!--
  - test: `assignmentOperator`

  ```swifttest
  -> let (x, y) = (1, 2)
  /> x 等于 \(x),  y 等于 \(y)
  </ x 等于 1,  y 等于 2
  ```
-->

<!--
  - test: `tuple-unwrapping-with-var`

  ```swifttest
  >> var (x, y) = (1, 2)
  ```
-->

<!--
  这仍然允许变量赋值，
  即使 var 模式已经被移除，
  因为它被解析为一个变量声明，
  使用第一个替代方案，其中 (x, y) 是一个模式，
  但 `var` 来自变量声明头部，
  而不是来自模式。
-->

与 C 和 Objective-C 中的赋值运算符不同，Swift 中的赋值运算符本身不返回值。以下语句无效：

```swift
if x = y { // 这是无效的，因为 x = y 不返回值。
}
```

<!--
  - test: `assignmentOperatorInvalid`

  ```swifttest
  -> if x = y {
        // 这是无效的，因为 x = y 不返回值。
     }
  !$ error: cannot find 'x' in scope
  !! if x = y {
  !!    ^
  !$ error: cannot find 'y' in scope
  !! if x = y {
  !!        ^
  ```
-->

因为 Swift 语言规定 `if x = y` 这种写法是无效的，这个特性可以防止不小心使用赋值运算符（=） 而非等于运算符（==）。Swift 帮助你避免代码中出现这种错误。

<!--
  TODO: 我们是否应该提到 x = y = z 也是无效的？
  如果是这样，是否有一个令人信服的理由说明这为什么我们要这么做？
-->

## 算术运算符

Swift 为所有数值类型支持四种标准*算术运算符*：

- 加法（`+`） 
- 减法（`-`） 
- 乘法（`*`） 
- 除法（`/`）

```swift
1 + 2       // 等于 3
5 - 3       // 等于 2
2 * 3       // 等于 6 
10.0 / 2.5  // 等于 4.0
```

<!--
  - test: `arithmeticOperators`

  ```swifttest
  >> let r0 =
  -> 1 + 2       // equals 3
  >> assert(r0 == 3)
  >> let r1 =
  -> 5 - 3       // equals 2
  >> assert(r1 == 2)
  >> let r2 =
  -> 2 * 3       // equals 6
  >> assert(r2 == 6)
  >> let r3 =
  -> 10.0 / 2.5  // equals 4.0
  >> assert(r3 == 4.0)
  ```
-->

Swift 的算术运算符与 C 和 Objective-C 中的不同，默认情况下不允许值溢出。您可以选择使用 Swift 的溢出运算符（如 `a &+ b`）来启用值溢出行为。请参阅 <doc:AdvancedOperators#溢出运算符>。

加法运算符也支持 `String` 拼接：

```swift
"hello, " + "world"  // 等于 "hello, world"
```

<!--
  - test: `arithmeticOperators`

  ```swifttest
  >> let r4 =
  -> "hello, " + "world"  // 等于 "hello, world"
  >> assert(r4 == "hello, world")
  ```
-->

### 余数运算符

*余数运算符*（`a % b`）计算出 `b` 在 `a` 中能容纳多少个倍数，并返回剩余的值（称为*余数*）。

> 注意: 需要注意的是，尽管余数运算符在其他语言中也被称为模运算符，
> 但在 Swift 中对负数的处理与模运算符有所不同。

<!--
  - test: `percentOperatorIsRemainderNotModulo`

  ```swifttest
  -> for i in -5...0 {
        print(i % 4)
     }
  << -1
  << 0
  << -3
  << -2
  << -1
  << 0
  ```
-->

让我们来看看余数运算符是如何工作的。
要计算 `9 % 4`，首先要确定 `9` 中可以包含多少个 `4`：

![](remainderInteger)

我们可以在 `9` 中容纳两个 `4`，剩余的是 `1`（用橙色表示）。

在 Swift 中，这可以写作：

```swift
9 % 4    // 等于 1
```

<!--
  - test: `arithmeticOperators`

  ```swifttest
  >> let r5 =
  -> 9 % 4    // equals 1
  >> assert(r5 == 1)
  ```
-->

为了确定 `a % b` 的答案，`%` 运算符计算以下等式并返回 `余数` 作为输出：

`a` = (`b` x `某个乘数`) + `余数`

其中 `某个乘数` 是 `b` 在 `a` 中能容纳的最大倍数。

将 `9` 和 `4` 代入此等式，得：

`9` = (`4` x `2`) + `1`

当计算 `a` 为负值时，采用相同的方法：

```swift
-9 % 4   // 等于 -1
```

<!--
  - test: `arithmeticOperators`

  ```swifttest
  >> let r6 =
  -> -9 % 4   // equals -1
  >> assert(r6 == -1)
  ```
-->

将 `-9` 和 `4` 代入等式，得：

`-9` = (`4` x `-2`) + `-1`

因此余数值为 `-1`。

对于 b 为负值的情况，其符号将被忽略。这意味着 `a % b` 和 `a % -b` 总是给出相同的答案。

### 一元负号运算符

数值的正负号可以使用前缀 `-` 切换，称为*一元负号运算符*：

```swift
let three = 3
let minusThree = -three       // minusThree 等于 -3
let plusThree = -minusThree   // plusThree 等于 3，或 "负负三"
```

<!-- - test: `arithmeticOperators`

  ```swifttest 
-> let three = 3
-> let minusThree = -three       // minusThree 等于 -3
-> let plusThree = -minusThree   // plusThree 等于 3, 也就是 "减去减去三"
``` -->

一元负号运算符（`-`）直接加在它所作用的值前面，中间没有任何空格。

### 一元正号运算符

*一元正号运算符*（`+`）只是返回它所作用的值，不做任何改变：

```swift
let minusSix = -6
let alsoMinusSix = +minusSix  // alsoMinusSix 等于 -6  
```

<!-- - test: `arithmeticOperators`

  ```swifttest
-> let minusSix = -6
-> let alsoMinusSix = +minusSix  // alsoMinusSix 等于 -6
>> assert(alsoMinusSix == minusSix)
``` -->

虽然一元加运算符实际上什么也没做，但是当你使用一元减运算符表示负数时，你可以使用它来使你的代码对正数也保持对称性。

## 复合赋值运算符

与 C 语言一样，Swift 提供了*复合赋值运算符*，它将赋值（`=`）与另一个操作结合起来。
一个例子是*加法赋值运算符*（`+=`）：

```swift
var a = 1
a += 2
// a 现在等于 3
```

<!-- - test: `compoundAssignment`

  ```swifttest
-> var a = 1
-> a += 2
/> a 现在等于 \(a)
</ a 现在等于 3
``` -->

表达式 `a += 2` 是 `a = a + 2` 的简写。
实际上，加法和赋值被合并成一个同时执行这两个任务的运算符。

> 注意: 复合赋值运算符不会返回值。
> 例如，你不能写 `let b = a += 2`。

有关 Swift 标准库提供的运算符的信息，请参阅 [Operator Declarations](https://developer.apple.com/documentation/swift/operator_declarations)。

## 比较运算符

Swift 支持以下比较运算符：

- 等于（`a == b`）
- 不等于（`a != b`）
- 大于（`a > b`）
- 小于（`a < b`） 
- 大于等于（`a >= b`）
- 小于等于（`a <= b`）

> 注意: Swift 还提供了两个*标识运算符*（`===` 和 `!==`），
> 你可以用它们来测试两个对象引用是否指向同一个对象实例。
> 更多信息请参阅 <doc:ClassesAndStructures#恒等运算符>。

每个比较运算符都返回一个 `Bool` 值来指示语句是否为真：

```swift
1 == 1   // true 因为 1 等于 1
2 != 1   // true 因为 2 不等于 1
2 > 1    // true 因为 2 大于 1 
1 < 2    // true 因为 1 小于 2
1 >= 1   // true 因为 1 大于等于 1
2 <= 1   // false 因为 2 不小于等于 1
```

<!-- - test: `comparisonOperators`

  ```swifttest
>> assert(
-> 1 == 1   // true 因为 1 等于 1
>> )
>> assert(
-> 2 != 1   // true 因为 2 不等于 1
>> )
>> assert(
-> 2 > 1    // true 因为 2 大于 1
>> )
>> assert(
-> 1 < 2    // true 因为 1 小于 2
>> )
>> assert(
-> 1 >= 1   // true 因为 1 大于等于 1
>> )
>> assert( !(
-> 2 <= 1   // false 因为 2 不小于等于 1
>> ) )
``` -->

比较运算符通常用于条件语句中，例如 `if` 语句：

```swift
let name = "world"
if name == "world" {
    print("hello, world") 
} else {
    print("I'm sorry \(name), but I don't recognize you")
} // 打印 "hello, world", 因为 name 确实等于 "world"。
```

<!-- - test: `comparisonOperators`

  ```swifttest
-> let name = "world"
-> if name == "world" {
      print("hello, world")
    } else {
      print("对不起 \(name), 但我不认识你")
    }
<< hello, world
// 打印 "hello, world", 因为 name 确实等于 "world"。
  ```
-->

关于 `if` 语句的更多信息，请参阅 <doc:ControlFlow>。

如果两个元组具有相同的类型和相同数量的值，则可以比较它们。
元组是从左到右逐个值进行比较的，直到比较发现两个不相等的值为止。
这两个值将进行比较，并且该比较的结果决定了整个元组比较的结果。
如果所有元素都相等，那么这两个元组本身就相等。
例如：

```swift
(1, "zebra") < (2, "apple")   // 为 true，因为 1 小于 2; "zebra" 和 "apple" 未比较
(3, "apple") < (3, "bird")    // 为 true，因为 3 等于 3，而 "apple" 小于 "bird"
(4, "dog") == (4, "dog")      // 为 true，因为 4 等于 4，而 "dog" 等于 "dog"
```

<!--
  - test: `tuple-comparison-operators`

  ```swifttest
  >> let a =
  -> (1, "zebra") < (2, "apple")   // 为 true，因为 1 小于 2; "zebra" 和 "apple" 未比较aren't compared
  >> let b =
  -> (3, "apple") < (3, "bird")    // 为 true，因为 3 等于 3，而 "apple" 小于 "bird"
  >> let c =
  -> (4, "dog") == (4, "dog")      // 为 true，因为 4 等于 4，而 "dog" 等于 "dog"
  >> print(a, b, c)
  << true true true
  ```
-->

在上面的示例中，您可以看到第一行的从左到右比较行为。
因为 `1` 小于 `2`，所以 `(1, "zebra")` 被认为小于 `(2, "apple")`，而不管元组中的任何其他值如何。
即使 `"zebra"` 不小于 `"apple"`，也无关紧要，因为比较已经由元组的第一个元素决定了。
但是，当元组的第一个元素相同时，它们的第二个元素*会*进行比较 —— 这就是第二行和第三行发生的情况。

只有当给定的运算符可以应用于各自元组中的每个值时，元组才能与该运算符进行比较。例如，如下面的代码所示，您可以比较两个类型为 `(String, Int)` 的元组，因为 `String` 和 `Int` 值都可以使用 `<` 运算符进行比较。相反，类型为 `(String, Bool)` 的两个元组不能使用 `<` 运算符进行比较，因为 `<` 运算符不能应用于 `Bool` 值。

```swift
("blue", -1) < ("purple", 1)        // 可以：计算结果为 true。
("blue", false) < ("purple", true)  // 错误：不能使用 < 来比较布尔值。
```

<!--
  - test: `tuple-comparison-operators-err`

  ```swifttest
  >> _ =
  -> ("blue", -1) < ("purple", 1)        // 可以：计算结果为 true。
  >> _ =
  -> ("blue", false) < ("purple", true)  // 错误：不能使用 < 来比较布尔值。
  !$ error: type '(String, Bool)' cannot conform to 'Comparable'
  !! ("blue", false) < ("purple", true)  // 错误：不能使用 < 来比较布尔值。
  !!                 ^
  !$ note: only concrete types such as structs, enums and classes can conform to protocols
  !! ("blue", false) < ("purple", true)  // 错误：不能使用 < 来比较布尔值。
  !!                 ^
  !$ note: required by referencing operator function '<' on 'Comparable' where 'Self' = '(String, Bool)'
  !! ("blue", false) < ("purple", true)  // 错误：不能使用 < 来比较布尔值。
  !!                 ^
  ```
-->

<!--
  - test: `tuple-comparison-operators-ok`

  ```swifttest
  >> let x = ("blue", -1) < ("purple", 1)        // 可以：计算结果为 true。
  >> print(x)
  << true
  ```
-->

> 注意: Swift 标准库包含用于具有少于七个元素的元组的比较运算符。
> 要比较具有七个或更多元素的元组，
> 您必须自己实现比较运算符。

<!--
  TODO: 这些默认操作于哪些类型？
  它们如何处理字符串？
  如果是自定义的类型又会怎样？
-->

## 三元条件运算符

三元条件运算符是一种特殊的运算符，用于根据给定条件选择两个值中的一个。它由三个部分组成，语法格式为`问题 ? 答案1 : 答案2`。它根据问题的真假值来选择计算哪个表达式，并返回该表达式的值。如果`问题`为真，它会计算`答案1`并返回其值;否则，它会计算`答案2`并返回其值。

三元条件运算符是以下代码的简写形式：

```swift
if question {
    answer1
} else {
    answer2
}
```

<!--
  - test: `ternaryConditionalOperatorOutline`

  ```swifttest
  >> let question = true
  >> let answer1 = true
  >> let answer2 = true
  -> if question {
        answer1
     } else {
        answer2
     }
  !! /tmp/swifttest.swift:5:4: warning: expression of type 'Bool' is unused
  !! answer1
  !! ^~~~~~~
  !! /tmp/swifttest.swift:7:4: warning: expression of type 'Bool' is unused
  !! answer2
  !! ^~~~~~~
  ```
-->

<!--
  FIXME 这个例子含糊其辞的地方太多了。
  Swift 中并没有 'if' 表达式。
-->

下面是一个例子，用于计算表格行的高度。如果该行有标题，则行高应比内容高度高 50 点；如果该行没有标题，则行高应比内容高度高 20 点：

```swift
let contentHeight = 40
let hasHeader = true
let rowHeight = contentHeight + (hasHeader ? 50 : 20)
// rowHeight 等于 90
```

<!--
  - test: `ternaryConditionalOperatorPart1`

  ```swifttest
  -> let contentHeight = 40
  -> let hasHeader = true
  -> let rowHeight = contentHeight + (hasHeader ? 50 : 20)
  /> rowHeight is equal to \(rowHeight)
  </ rowHeight is equal to 90
  ```
-->

上面的例子是下面代码的简写形式：

```swift
let contentHeight = 40
let hasHeader = true
let rowHeight: Int
if hasHeader {
    rowHeight = contentHeight + 50
} else {
    rowHeight = contentHeight + 20
}
// rowHeight 等于 90
```

<!--
  - test: `ternaryConditionalOperatorPart2`

  ```swifttest
  -> let contentHeight = 40
  -> let hasHeader = true
  -> let rowHeight: Int
  -> if hasHeader {
        rowHeight = contentHeight + 50
     } else {
        rowHeight = contentHeight + 20
     }
  /> rowHeight is equal to \(rowHeight)
  </ rowHeight is equal to 90
  ```
-->

第一个例子使用三元条件运算符意味着`rowHeight`可以在一行代码中设置为正确的值，这比第二个例子中使用的代码更加简洁。

三元条件运算符提供了一种有效的简写方式来决定考虑两个表达式中的哪一个。不过，要谨慎使用三元条件运算符。如果过度使用，代码的可读性会下降。避免将多个三元条件运算符实例组合成一个复合语句。

## 空合并运算符

*空合并运算符*（`a ?? b`）如果可选项`a`包含一个值，则会解包该值，否则会返回默认值`b`（如果`a`为`nil`）。表达式`a`始终是一个可选类型。表达式`b`必须与存储在`a`中的类型相匹配。

空合并运算符是以下代码的简写形式：

```swift
a != nil ? a! : b
```

<!--
  - test: `nilCoalescingOperatorOutline`

  ```swifttest
  >> var a: Int?
  >> let b = 42
  >> let c =
  -> a != nil ? a! : b
  >> print(c)
  << 42
  ```
-->

上面的代码使用三元条件运算符和强制解包（`a!`）来访问 `a` 中包装的值（当 `a` 不是 `nil` 时），否则返回 `b`。空合并运算符提供了一种更优雅的方式，以简洁和可读的形式封装这种条件检查和解包。

> 注意: 如果 `a` 的值是非 `nil` 的，则不会计算 `b` 的值。这被称为*短路求值*。

下面的示例使用空合并运算符在默认颜色名称和可选用户定义的颜色名称之间进行选择：

```swift
let defaultColorName = "red"
var userDefinedColorName: String?   // 默认为 nil

var colorNameToUse = userDefinedColorName ?? defaultColorName
// userDefinedColorName 为空，所以 colorNameToUse 为默认值 "red"
```

<!--
  - test: `nilCoalescingOperator`

  ```swifttest
  -> let defaultColorName = "red"
  -> var userDefinedColorName: String?   // 默认为 nil

  -> var colorNameToUse = userDefinedColorName ?? defaultColorName
  /> userDefinedColorName 为空，所以 colorNameToUse 为默认值 \"\(colorNameToUse)\"
  </ userDefinedColorName 为空，所以 colorNameToUse 为默认值 "red"
  ```
-->

变量 `userDefinedColorName` 被定义为一个可选的 `String` 类型，默认值为 `nil`。由于 `userDefinedColorName` 是一个可选类型，你可以使用空合并运算符来考虑它的值。在上面的例子中，该运算符被用于确定一个名为 `colorNameToUse` 的 `String` 变量的初始值。因为 `userDefinedColorName` 是 `nil`，所以表达式 `userDefinedColorName ?? defaultColorName` 返回 `defaultColorName` 的值，即 `"red"`。

如果你给 `userDefinedColorName` 赋予一个非 `nil` 的值，并再次执行 nil 合并运算符检查，那么 `userDefinedColorName` 包裹的值将被使用，而不是默认值：

```swift
userDefinedColorName = "green" 
colorNameToUse = userDefinedColorName ?? defaultColorName
// userDefinedColorName 不是 nil，所以 colorNameToUse 被设置为 "green"
```

<!--
  - test: `nilCoalescingOperator`

  ```swifttest
  -> userDefinedColorName = "green"
  -> colorNameToUse = userDefinedColorName ?? defaultColorName
  /> userDefinedColorName 不是 nil，所以 colorNameToUse 被设置为 \"\(colorNameToUse)\"
  </ userDefinedColorName 不是 nil，所以 colorNameToUse 被设置为 "green"
  ```
-->

## 区间运算符

Swift 包含几个*区间运算符*，这些是表达一个值范围的快捷方式。

### 闭区间运算符  

*闭区间运算符*（`a...b`）定义了一个从 `a` 到 `b` 的范围，包括 `a` 和 `b` 的值。`a` 的值不能大于 `b`。

<!--
  - test: `closedRangeStartCanBeLessThanEnd`

  ```swifttest
  -> let range = 1...2
  >> print(type(of: range))
  << ClosedRange<Int>
  ```
-->

<!--
  - test: `closedRangeStartCanBeTheSameAsEnd`

  ```swifttest
  -> let range = 1...1
  ```
-->

<!--
  - test: `closedRangeStartCannotBeGreaterThanEnd`

  ```swifttest
  -> let range = 1...0
  xx assertion
  ```
-->

闭区间运算符在需要使用所有值的情况下很有用，例如在 `for-in` 循环中：

```swift
for index in 1...5 {
    print("\(index) 乘以 5 等于 \(index * 5)") 
}
// 1 乘以 5 等于 5
// 2 乘以 5 等于 10
// 3 乘以 5 等于 15 
// 4 乘以 5 等于 20
// 5 乘以 5 等于 25
```

<!--
  - test: `rangeOperators`

  ```swifttest
  -> for index in 1...5 {
        print("\(index) 乘以 5 等于 \(index * 5)")
     }
  </ 1 乘以 5 等于 5
  </ 2 乘以 5 等于 10
  </ 3 乘以 5 等于 15 
  </ 4 乘以 5 等于 20
  </ 5 乘以 5 等于 25
  ```
-->

更多关于 `for-in` 循环的内容，请参阅 <doc:ControlFlow>。

### 半开区间运算符

*半开区间运算符*（`a..<b`）定义了一个从 `a` 到 `b` 但不包括 `b` 的范围。它被称为*半开*是因为它包含第一个值但不包含最后一个值。与闭区间运算符一样，`a` 的值不能大于 `b`。如果 `a` 等于 `b`，那么结果范围将是空的。

<!--
  - test: `halfOpenRangeStartCanBeLessThanEnd`

  ```swifttest
  -> let range = 1..<2
  >> print(type(of: range))
  << Range<Int>
  ```
-->

<!--
  - test: `halfOpenRangeStartCanBeTheSameAsEnd`

  ```swifttest
  -> let range = 1..<1
  ```
-->

<!--
  - test: `halfOpenRangeStartCannotBeGreaterThanEnd`

  ```swifttest
  -> let range = 1..<0
  xx assertion
  ```
-->

半开区间对于处理从基数 0 开始的列表（如数组）时特别有用，因为它可以计数到列表长度（但不包括列表长度）：

```swift
let names = ["Anna", "Alex", "Brian", "Jack"] 
let count = names.count
for i in 0..<count {
    print("第 \(i + 1) 个人叫 \(names[i])")
}
// 第 1 个人叫 Anna
// 第 2 个人叫 Alex
// 第 3 个人叫 Brian 
// 第 4 个人叫 Jack
```

<!--
  - test: `rangeOperators`

  ```swifttest
  -> let names = ["Anna", "Alex", "Brian", "Jack"]
  -> let count = names.count
  >> assert(count == 4)
  -> for i in 0..<count {
        print("第 \(i + 1) 个人叫 \(names[i])")
     }
  </ 第 1 个人叫 Anna
  </ 第 2 个人叫 Alex
  </ 第 3 个人叫 Brian 
  </ 第 4 个人叫 Jack
```
-->

注意数组包含四个元素，但 `0..<count` 只计数到 `3`（数组中最后一个元素的索引），因为它是一个半开区间。
有关数组的更多信息，请参阅 <doc:CollectionTypes#数组>。

### 单侧区间

闭区间运算符有一种替代形式，用于一直延伸到尽可能远的区间 —— 例如，一个包含从索引 2 到数组末尾所有元素的区间。
在这些情况下，你可以省略区间运算符的一侧值。
这种区间被称为*单侧区间*，因为运算符只有一侧有值。
例如：

```swift
for name in names[2...] { print(name) }
// Brian
// Jack

for name in names[...2] { print(name) }
// Anna
// Alex
// Brian 
```

<!--
  - test: `rangeOperators`

  ```swifttest
  -> for name in names[2...] {
         print(name)
     }
  </ Brian
  </ Jack

  -> for name in names[...2] {
         print(name)
     }
  </ Anna
  </ Alex
  </ Brian
  ```
-->

半开区间运算符也有一种只写最后一个值的单侧形式。
就像在两侧都包含值时一样，最后一个值不包含在区间内。
例如：

```swift
for name in names[..<2] { print(name) }
// Anna
// Alex
```

<!--
  - test: `rangeOperators`

  ```swifttest
  -> for name in names[..<2] {
         print(name)
     }
  </ Anna
  </ Alex
  ```
-->

单侧区间不仅可以用于下标，还可以用于其他上下文。
对于省略了第一个值的单侧区间，你不能遍历它，因为不清楚他从哪里开始迭代。
你*可以*遍历省略了最后一个值的单侧区间；但是，由于该区间无限延伸，请确保为循环添加一个显式的结束条件。
你还可以检查单侧区间是否包含特定值，如下面的代码所示。

```swift 
let range = ...5
range.contains(7)   // false
range.contains(4)   // true
range.contains(-1)  // true
```

<!--
  - test: `rangeOperators`

  ```swifttest
  -> let range = ...5
  >> print(type(of: range))
  << PartialRangeThrough<Int>
  >> let a =
  -> range.contains(7)   // false
  >> let b =
  -> range.contains(4)   // true
  >> let c =
  -> range.contains(-1)  // true
  >> print(a, b, c)
  << false true true
  ```
-->

## 逻辑运算符  

*逻辑运算符*修改或组合布尔逻辑值 `true` 和 `false`。
Swift 支持 C 语言中的三个标准逻辑运算符：

- 逻辑非（`!a`）
- 逻辑与（`a && b`）
- 逻辑或（`a || b`）

### 逻辑非运算符

*逻辑非运算符*（`!a`）反转布尔值，使 `true` 变为 `false`，`false` 变为 `true`。

逻辑非运算符是一个前置运算符，紧跟在它所操作的值之前，中间没有空格。
它可以读作"非 `a`"，如下例所示：

让我们来看一个简单的例子：

```swift
let allowedEntry = false
if !allowedEntry {
    print("ACCESS DENIED")
} // 打印 "ACCESS DENIED"。
```

<!--
  - test: `logicalOperators`

  ```swifttest
  -> let allowedEntry = false
  -> if !allowedEntry {
        print("ACCESS DENIED")
     }
  <- ACCESS DENIED
  ```
-->

短语 `if !allowedEntry` 可以理解为 "如果不允许进入"。只有当 "不允许进入" 为真时，才会执行后续的那一行；也就是说，如果 `allowedEntry` 为 `false`。

正如这个例子所示，谨慎选择布尔常量和变量名可以帮助保持代码的可读性和简洁性，同时避免双重否定或令人困惑的逻辑语句。

### 逻辑与运算符

*逻辑与运算符*（`a && b`） 创建逻辑表达式，其中两个值都必须为 `true`，整个表达式才为 `true`。如果任一值为 `false`，整个表达式也将为 `false`。事实上，如果*第一个*值为 `false`，第二个值甚至不会被评估，因为它无论如何都不可能使整个表达式等于 `true`。这被称为*短路求值*。

下面的例子考虑了两个 `Bool` 值，只有在两个值都为 `true` 时才允许访问：

```swift
let enteredDoorCode = true
let passedRetinaScan = false
if enteredDoorCode && passedRetinaScan {
    print("Welcome!")
} else {
    print("ACCESS DENIED")
} // 打印 "ACCESS DENIED"。
```

<!--
  - test: `logicalOperators`

  ```swifttest
  -> let enteredDoorCode = true
  -> let passedRetinaScan = false
  -> if enteredDoorCode && passedRetinaScan {
        print("Welcome!")
     } else {
        print("ACCESS DENIED")
     }
  <- ACCESS DENIED
  ```
-->

### 逻辑或运算符

*逻辑或运算符*（`a || b`） 是由两个相邻的管道字符组成的中置运算符。你可以使用它来创建逻辑表达式，在这种表达式中，只要*其中一个*值为 `true`，整个表达式就为 `true`。

与上面的逻辑与运算符一样，逻辑或运算符也使用短路求值来考虑它的表达式。如果逻辑或表达式的左侧为 `true`，右侧就不会被评估，因为它无法改变整个表达式的结果。

在下面的例子中，第一个 `Bool` 值（`hasDoorKey`） 为 `false`，但第二个值（`knowsOverridePassword`） 为 `true`。由于有一个值为 `true`，整个表达式也将评估为 `true`，因此允许访问：

```swift
let hasDoorKey = false
let knowsOverridePassword = true
if hasDoorKey || knowsOverridePassword {
    print("Welcome!")
} else {
    print("ACCESS DENIED")
} // 打印 "Welcome!"
```

<!--
  - test: `logicalOperators`

  ```swifttest
  -> let hasDoorKey = false
  -> let knowsOverridePassword = true
  -> if hasDoorKey || knowsOverridePassword {
        print("Welcome!")
     } else {
        print("ACCESS DENIED")
     }
  <- Welcome!
  ```
-->

### 组合逻辑运算符

你可以组合多个逻辑运算符来创建更长的复合表达式：

```swift
if enteredDoorCode && passedRetinaScan || hasDoorKey || knowsOverridePassword {
    print("Welcome!")
} else {
    print("ACCESS DENIED")
} // 打印 "Welcome!"
```

<!--
  - test: `logicalOperators`

  ```swifttest
  -> if enteredDoorCode && passedRetinaScan || hasDoorKey || knowsOverridePassword {
        print("Welcome!")
     } else {
        print("ACCESS DENIED")
     }
  <- Welcome!
  ```
-->

这个例子使用多个 `&&` 和 `||` 运算符来创建一个更长的复合表达式。然而，`&&` 和 `||` 运算符仍然只作用于两个值，所以这实际上是三个较小的表达式链接在一起。这个例子可以理解为：

如果我们输入了正确的门禁代码并通过了视网膜扫描，或者我们有一把有效的门钥匙，或者我们知道紧急情况下的覆盖密码，那么就允许访问。

根据 `enteredDoorCode`、`passedRetinaScan` 和 `hasDoorKey` 的值，前两个子表达式为 `false`。然而，由于知道紧急覆盖密码，整个复合表达式仍然评估为 `true`。

> 注意: Swift 逻辑运算符 `&&` 和 `||` 遵循从左到右的结合顺序，这意味着带有多个逻辑运算符的复合表达式会首先评估最左边的子表达式。

### 显式括号

有时即使不严格需要，也有必要使用括号来提高复杂表达式的可读性，让表达式的意图更加清晰。
在上面的门禁示例中，为复合表达式的第一部分添加括号是有用的，可以明确表达其意图：

```swift
if (enteredDoorCode && passedRetinaScan) || hasDoorKey || knowsOverridePassword {
    print("Welcome!")
} else {
    print("ACCESS DENIED")
} // 打印 "Welcome!"
```

<!--
  - test: `logicalOperators`

  ```swifttest
  -> if (enteredDoorCode && passedRetinaScan) || hasDoorKey || knowsOverridePassword {
        print("Welcome!")
     } else {
        print("ACCESS DENIED")
     }
  <- Welcome!
  ```
-->

括号明确表示前两个条件被视为整体逻辑中的一种可能状态。
虽然复合表达式的输出没有改变，但整体意图对读者来说更加清晰明了。
可读性永远比简洁性更重要，因此在有助于阐明意图的地方使用括号是很有必要的。

<!--
此源文件属于 Swift.org 开源项目的一部分

版权所有 (c) 2014 - 2022 Apple Inc. 及 Swift 项目作者
根据 Apache License v2.0 许可证及运行库例外条款授权

有关许可证信息，请参见 https://swift.org/LICENSE.txt
有关 Swift 项目作者的列表，请参见 https://swift.org/CONTRIBUTORS.txt
-->
