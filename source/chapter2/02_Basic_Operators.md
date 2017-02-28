# 基本运算符（Basic Operators）
-----------------

> 1.0
> 翻译：[XieLingWang](https://github.com/xielingwang)
> 校对：[EvilCome](https://github.com/Evilcome)

> 2.0
> 翻译+校对：[JackAlan](https://github.com/AlanMelody)

> 2.1
> 校对：[shanks](http://codebuild.me)

> 2.2
> 翻译+校对：[Cee](https://github.com/Cee) 校对：[SketchK](https://github.com/SketchK)，2016-05-11    
> 3.0.1，shanks，2016-11-11

本页包含内容：

- [术语](#terminology)
- [赋值运算符](#assignment_operator)
- [算术运算符](#arithmetic_operators)
- [组合赋值运算符](#compound_assignment_operators)
- [比较运算符](#comparison_operators)
- [三目运算符](#ternary_conditional_operator)
- [空合运算符](#nil_coalescing_operator)
- [区间运算符](#range_operators)
- [逻辑运算符](#logical_operators)

*运算符*是检查、改变、合并值的特殊符号或短语。例如，加号（`+`）将两个数相加（如 `let i = 1 + 2`）。更复杂的运算例子包括逻辑与运算符 `&&`（如 `if enteredDoorCode && passedRetinaScan`）。

Swift 支持大部分标准 C 语言的运算符，且改进许多特性来减少常规编码错误。如：赋值符（`=`）不返回值，以防止把想要判断相等运算符（`==`）的地方写成赋值符导致的错误。算术运算符（`+`，`-`，`*`，`/`，`%`等）会检测并不允许值溢出，以此来避免保存变量时由于变量大于或小于其类型所能承载的范围时导致的异常结果。当然允许你使用 Swift 的溢出运算符来实现溢出。详情参见[溢出运算符](../chapter2/25_Advanced_Operators.html#overflow_operators)。

Swift 还提供了 C 语言没有的表达两数之间的值的区间运算符（`a..<b` 和 `a...b`），这方便我们表达一个区间内的数值。

本章节只描述了 Swift 中的基本运算符，[高级运算符](../chapter2/25_Advanced_Operators.html)这章会包含 Swift 中的高级运算符，及如何自定义运算符，及如何进行自定义类型的运算符重载。

<a name="terminology"></a>
## 术语

运算符分为一元、二元和三元运算符:

- *一元*运算符对单一操作对象操作（如 `-a`）。一元运算符分前置运算符和后置运算符，*前置运算符*需紧跟在操作对象之前（如 `!b`），*后置运算符*需紧跟在操作对象之后（如 `c!`）。
- *二元*运算符操作两个操作对象（如 `2 + 3`），是*中置*的，因为它们出现在两个操作对象之间。
- *三元*运算符操作三个操作对象，和 C 语言一样，Swift 只有一个三元运算符，就是三目运算符（`a ? b : c`）。

受运算符影响的值叫*操作数*，在表达式 `1 + 2` 中，加号 `+` 是二元运算符，它的两个操作数是值 `1` 和 `2`。

<a name="assignment_operator"></a>
## 赋值运算符

*赋值运算符*（`a = b`），表示用 `b` 的值来初始化或更新 `a` 的值：

```swift
let b = 10
var a = 5
a = b
// a 现在等于 10
```

如果赋值的右边是一个多元组，它的元素可以马上被分解成多个常量或变量：

```swift
let (x, y) = (1, 2)
// 现在 x 等于 1，y 等于 2
```

与 C 语言和 Objective-C 不同，Swift 的赋值操作并不返回任何值。所以以下代码是错误的：

```swift
if x = y {
	// 此句错误, 因为 x = y 并不返回任何值
}
```

这个特性使你无法把（`==`）错写成（`=`），由于 `if x = y` 是错误代码，Swift 能帮你避免此类错误发生。

<a name="arithmetic_operators"></a>
## 算术运算符

Swift 中所有数值类型都支持了基本的四则*算术运算符*：

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

与 C 语言和 Objective-C 不同的是，Swift 默认情况下不允许在数值运算中出现溢出情况。但是你可以使用 Swift 的溢出运算符来实现溢出运算（如 `a &+ b`）。详情参见[溢出运算符](../chapter2/25_Advanced_Operators.html#overflow_operators)。

加法运算符也可用于 `String` 的拼接：

```swift
"hello, " + "world"  // 等于 "hello, world"
```

### 求余运算符

*求余运算符*（`a % b`）是计算 `b` 的多少倍刚刚好可以容入`a`，返回多出来的那部分（余数）。

> 注意：  
求余运算符（`%`）在其他语言也叫*取模运算符*。然而严格说来，我们看该运算符对负数的操作结果，「求余」比「取模」更合适些。

我们来谈谈取余是怎么回事，计算 `9 % 4`，你先计算出 `4` 的多少倍会刚好可以容入 `9` 中：

![Art/remainderInteger_2x.png](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/remainderInteger_2x.png "Art/remainderInteger_2x.png")

你可以在 `9` 中放入两个 `4`，那余数是 1（用橙色标出）。

在 Swift 中可以表达为：

```swift
9 % 4    // 等于 1
```

为了得到 `a % b` 的结果，`%` 计算了以下等式，并输出`余数`作为结果：

	a = (b × 倍数) + 余数

当`倍数`取最大值的时候，就会刚好可以容入 `a` 中。

把 `9` 和 `4` 代入等式中，我们得 `1`：

	9 = (4 × 2) + 1

同样的方法，我们来计算 `-9 % 4`：

```swift
-9 % 4   // 等于 -1
```

把 `-9` 和 `4` 代入等式，`-2` 是取到的最大整数：

	-9 = (4 × -2) + -1

余数是 `-1`。

在对负数 `b` 求余时，`b` 的符号会被忽略。这意味着 `a % b` 和 `a % -b` 的结果是相同的。


### 一元负号运算符

数值的正负号可以使用前缀 `-`（即*一元负号符*）来切换：

```swift
let three = 3
let minusThree = -three       // minusThree 等于 -3
let plusThree = -minusThree   // plusThree 等于 3, 或 "负负3"
```

一元负号符（`-`）写在操作数之前，中间没有空格。

### 一元正号运算符

*一元正号符*（`+`）不做任何改变地返回操作数的值：

```swift
let minusSix = -6
let alsoMinusSix = +minusSix  // alsoMinusSix 等于 -6
```

虽然一元正号符什么都不会改变，但当你在使用一元负号来表达负数时，你可以使用一元正号来表达正数，如此你的代码会具有对称美。


<a name="compound_assignment_operators"></a>
## 组合赋值运算符

如同 C 语言，Swift 也提供把其他运算符和赋值运算（`=`）组合的*组合赋值运算符*，组合加运算（`+=`）是其中一个例子：

```swift
var a = 1
a += 2
// a 现在是 3
```

表达式 `a += 2` 是 `a = a + 2` 的简写，一个组合加运算就是把加法运算和赋值运算组合成进一个运算符里，同时完成两个运算任务。

> 注意：  
复合赋值运算没有返回值，`let b = a += 2`这类代码是错误。这不同于上面提到的自增和自减运算符。

在[Swift 标准库运算符参考](https://developer.apple.com/reference/swift/1851035-swift_standard_library_operators)章节里有复合运算符的完整列表。
‌
<a name="comparison_operators"></a>
## 比较运算符（Comparison Operators）

所有标准 C 语言中的*比较运算符*都可以在 Swift 中使用：

- 等于（`a == b`）
- 不等于（`a != b`）
- 大于（`a > b`）
- 小于（`a < b`）
- 大于等于（`a >= b`）
- 小于等于（`a <= b`）

> 注意：
Swift 也提供恒等（`===`）和不恒等（`!==`）这两个比较符来判断两个对象是否引用同一个对象实例。更多细节在[类与结构](../chapter2/09_Classes_and_Structures.html)。

每个比较运算都返回了一个标识表达式是否成立的布尔值：

```swift
1 == 1   // true, 因为 1 等于 1
2 != 1   // true, 因为 2 不等于 1
2 > 1    // true, 因为 2 大于 1
1 < 2    // true, 因为 1 小于2
1 >= 1   // true, 因为 1 大于等于 1
2 <= 1   // false, 因为 2 并不小于等于 1
```

比较运算多用于条件语句，如`if`条件：

```swift
let name = "world"
if name == "world" {
	print("hello, world")
} else {
	print("I'm sorry \(name), but I don't recognize you")
}
// 输出 "hello, world", 因为 `name` 就是等于 "world"
```

关于 `if` 语句，请看[控制流](../chapter2/05_Control_Flow.html)。

当元组中的值可以比较时，你也可以使用这些运算符来比较它们的大小。例如，因为 `Int` 和 `String` 类型的值可以比较，所以类型为 `(Int, String)` 的元组也可以被比较。相反，`Bool` 不能被比较，也意味着存有布尔类型的元组不能被比较。

比较元组大小会按照从左到右、逐值比较的方式，直到发现有两个值不等时停止。如果所有的值都相等，那么这一对元组我们就称它们是相等的。例如：

```swift
(1, "zebra") < (2, "apple")   // true，因为 1 小于 2
(3, "apple") < (3, "bird")    // true，因为 3 等于 3，但是 apple 小于 bird
(4, "dog") == (4, "dog")      // true，因为 4 等于 4，dog 等于 dog
```

在上面的例子中，你可以看到，在第一行中从左到右的比较行为。因为`1`小于`2`，所以`(1, "zebra")`小于`(2, "apple")`，不管元组剩下的值如何。所以`"zebra"`小于`"apple"`没有任何影响，因为元组的比较已经被第一个元素决定了。不过，当元组的第一个元素相同时候，第二个元素将会用作比较-第二行和第三行代码就发生了这样的比较。

>注意：    
Swift 标准库只能比较七个以内元素的元组比较函数。如果你的元组元素超过七个时，你需要自己实现比较运算符。

<a name="ternary_conditional_operator"></a>
## 三目运算符（Ternary Conditional Operator）

*三目运算符*的特殊在于它是有三个操作数的运算符，它的形式是 `问题 ? 答案 1 : 答案 2`。它简洁地表达根据 `问题`成立与否作出二选一的操作。如果 `问题` 成立，返回 `答案 1` 的结果；反之返回 `答案 2` 的结果。

三目运算符是以下代码的缩写形式：

```swift
if question {
	answer1
} else {
	answer2
}
```

这里有个计算表格行高的例子。如果有表头，那行高应比内容高度要高出 50 点；如果没有表头，只需高出 20 点：

```swift
let contentHeight = 40
let hasHeader = true
let rowHeight = contentHeight + (hasHeader ? 50 : 20)
// rowHeight 现在是 90
```

上面的写法比下面的代码更简洁：

```swift
let contentHeight = 40
let hasHeader = true
var rowHeight = contentHeight
if hasHeader {
	rowHeight = rowHeight + 50
} else {
	rowHeight = rowHeight + 20
}
// rowHeight 现在是 90
```

第一段代码例子使用了三目运算，所以一行代码就能让我们得到正确答案。这比第二段代码简洁得多，无需将 `rowHeight` 定义成变量，因为它的值无需在 `if` 语句中改变。

三目运算提供有效率且便捷的方式来表达二选一的选择。需要注意的事，过度使用三目运算符会使简洁的代码变的难懂。我们应避免在一个组合语句中使用多个三目运算符。

<a name="nil_coalescing_operator"></a>
## 空合运算符（Nil Coalescing Operator）

*空合运算符*（`a ?? b`）将对可选类型 `a` 进行空判断，如果 `a` 包含一个值就进行解封，否则就返回一个默认值 `b`。表达式 `a` 必须是 Optional 类型。默认值 `b` 的类型必须要和 `a` 存储值的类型保持一致。

空合运算符是对以下代码的简短表达方法：

```swift
a != nil ? a! : b
```

上述代码使用了三目运算符。当可选类型 `a` 的值不为空时，进行强制解封（`a!`），访问 `a` 中的值；反之返回默认值 `b`。无疑空合运算符（`??`）提供了一种更为优雅的方式去封装条件判断和解封两种行为，显得简洁以及更具可读性。

> 注意：
如果 `a` 为非空值（`non-nil`），那么值 `b` 将不会被计算。这也就是所谓的*短路求值*。

下文例子采用空合运算符，实现了在默认颜色名和可选自定义颜色名之间抉择：

```swift
let defaultColorName = "red"
var userDefinedColorName: String?   //默认值为 nil

var colorNameToUse = userDefinedColorName ?? defaultColorName
// userDefinedColorName 的值为空，所以 colorNameToUse 的值为 "red"
```

`userDefinedColorName` 变量被定义为一个可选的 `String` 类型，默认值为 `nil`。由于 `userDefinedColorName` 是一个可选类型，我们可以使用空合运算符去判断其值。在上一个例子中，通过空合运算符为一个名为 `colorNameToUse` 的变量赋予一个字符串类型初始值。
由于 `userDefinedColorName` 值为空，因此表达式 `userDefinedColorName ?? defaultColorName` 返回 `defaultColorName` 的值，即 `red`。

另一种情况，分配一个非空值（`non-nil`）给 `userDefinedColorName`，再次执行空合运算，运算结果为封包在 `userDefaultColorName` 中的值，而非默认值。

```swift
userDefinedColorName = "green"
colorNameToUse = userDefinedColorName ?? defaultColorName
// userDefinedColorName 非空，因此 colorNameToUse 的值为 "green"
```

<a name="range_operators"></a>
## 区间运算符（Range Operators）

Swift 提供了两个方便表达一个区间的值的*区间运算符*。

### 闭区间运算符
*闭区间运算符*（`a...b`）定义一个包含从 `a` 到 `b`（包括 `a` 和 `b`）的所有值的区间。`a` 的值不能超过 `b`。
‌
闭区间运算符在迭代一个区间的所有值时是非常有用的，如在 `for-in` 循环中：

```swift
for index in 1...5 {
	print("\(index) * 5 = \(index * 5)")
}
// 1 * 5 = 5
// 2 * 5 = 10
// 3 * 5 = 15
// 4 * 5 = 20
// 5 * 5 = 25
```

关于 `for-in`，请看[控制流](../chapter2/05_Control_Flow.html)。

### 半开区间运算符

*半开区间运算符*（`a..<b`）定义一个从 `a` 到 `b` 但不包括 `b` 的区间。
之所以称为*半开区间*，是因为该区间包含第一个值而不包括最后的值。

半开区间的实用性在于当你使用一个从 0 开始的列表（如数组）时，非常方便地从0数到列表的长度。

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

数组有 4 个元素，但 `0..<count` 只数到3（最后一个元素的下标），因为它是半开区间。关于数组，请查阅[数组](../chapter2/04_Collection_Types.html#arrays)。

<a name="logical_operators"></a>
## 逻辑运算符（Logical Operators）

*逻辑运算符*的操作对象是逻辑布尔值。Swift 支持基于 C 语言的三个标准逻辑运算。

- 逻辑非（`!a`）
- 逻辑与（`a && b`）
- 逻辑或（`a || b`）

### 逻辑非运算符

*逻辑非运算符*（`!a`）对一个布尔值取反，使得 `true` 变 `false`，`false` 变 `true`。

它是一个前置运算符，需紧跟在操作数之前，且不加空格。读作 `非 a` ，例子如下：

```swift
let allowedEntry = false
if !allowedEntry {
	print("ACCESS DENIED")
}
// 输出 "ACCESS DENIED"
```

`if !allowedEntry` 语句可以读作「如果非 allowedEntry」，接下一行代码只有在「非 allowedEntry」为 `true`，即 `allowEntry` 为 `false` 时被执行。

在示例代码中，小心地选择布尔常量或变量有助于代码的可读性，并且避免使用双重逻辑非运算，或混乱的逻辑语句。

### 逻辑与运算符

*逻辑与运算符*（`a && b`）表达了只有 `a` 和 `b` 的值都为 `true` 时，整个表达式的值才会是 `true`。

只要任意一个值为 `false`，整个表达式的值就为 `false`。事实上，如果第一个值为 `false`，那么是不去计算第二个值的，因为它已经不可能影响整个表达式的结果了。这被称做*短路计算（short-circuit evaluation）*。

以下例子，只有两个 `Bool` 值都为 `true` 的时候才允许进入 if：

```swift
let enteredDoorCode = true
let passedRetinaScan = false
if enteredDoorCode && passedRetinaScan {
	print("Welcome!")
} else {
	print("ACCESS DENIED")
}
// 输出 "ACCESS DENIED"
```

### 逻辑或运算符

逻辑或运算符（`a || b`）是一个由两个连续的 `|` 组成的中置运算符。它表示了两个逻辑表达式的其中一个为 `true`，整个表达式就为 `true`。

同逻辑与运算符类似，逻辑或也是「短路计算」的，当左端的表达式为 `true` 时，将不计算右边的表达式了，因为它不可能改变整个表达式的值了。

以下示例代码中，第一个布尔值（`hasDoorKey`）为 `false`，但第二个值（`knowsOverridePassword`）为 `true`，所以整个表达是 `true`，于是允许进入：

```swift
let hasDoorKey = false
let knowsOverridePassword = true
if hasDoorKey || knowsOverridePassword {
	print("Welcome!")
} else {
	print("ACCESS DENIED")
}
// 输出 "Welcome!"
```

### 逻辑运算符组合计算

我们可以组合多个逻辑运算符来表达一个复合逻辑：

```swift
if enteredDoorCode && passedRetinaScan || hasDoorKey || knowsOverridePassword {
	print("Welcome!")
} else {
	print("ACCESS DENIED")
}
// 输出 "Welcome!"
```

这个例子使用了含多个 `&&` 和 `||` 的复合逻辑。但无论怎样，`&&` 和 `||` 始终只能操作两个值。所以这实际是三个简单逻辑连续操作的结果。我们来解读一下：

如果我们输入了正确的密码并通过了视网膜扫描，或者我们有一把有效的钥匙，又或者我们知道紧急情况下重置的密码，我们就能把门打开进入。

前两种情况，我们都不满足，所以前两个简单逻辑的结果是 `false`，但是我们是知道紧急情况下重置的密码的，所以整个复杂表达式的值还是 `true`。

> 注意：
Swift 逻辑操作符 `&&` 和 `||` 是左结合的，这意味着拥有多元逻辑操作符的复合表达式优先计算最左边的子表达式。

### 使用括号来明确优先级

为了一个复杂表达式更容易读懂，在合适的地方使用括号来明确优先级是很有效的，虽然它并非必要的。在上个关于门的权限的例子中，我们给第一个部分加个括号，使它看起来逻辑更明确：

```swift
if (enteredDoorCode && passedRetinaScan) || hasDoorKey || knowsOverridePassword {
	print("Welcome!")
} else {
	print("ACCESS DENIED")
}
// 输出 "Welcome!"
```

这括号使得前两个值被看成整个逻辑表达中独立的一个部分。虽然有括号和没括号的输出结果是一样的，但对于读代码的人来说有括号的代码更清晰。可读性比简洁性更重要，请在可以让你代码变清晰的地方加个括号吧！
