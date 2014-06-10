# 控制流

<a name="conditional_statement"></a>
## 条件语句

根据特定的条件执行特定的代码通常是十分有用的，例如：当错误发生时，你可能想运行额外的代码；或者，当输入的值太大或太小时，向用户显示一条消息等。要实现这些功能，你就需要使用*条件语句*。

Swift 提供两种类型的条件语句：`if`语句和`switch`语句。通常，当条件较为简单且可能的情况很少时，使用`if`语句。而`switch`语句更适用于复杂的条件、可能的情况很多且需要用到模式匹配(pattern-matching)的情境。

<a name="if"></a>
### If

`if`语句最简单的形式就是只包含一个条件，当且仅当该条件为`真`时，才执行相关代码：

```swift
var temperatureInFahrenheit = 30
if temperatureInFahrenheit <= 32 {
    println("It's very cold. Consider wearing a scarf.")
}
// prints "It's very cold. Consider wearing a scarf."
```

上面的例子会判断温度是否小于等于32华氏度（水的冰点）。如果是，则打印一条消息；否则，不打印任何消息，继续执行`if`块后面的代码。

当然，`if`语句允许二选一，也就是当条件为假时，执行*else语句*：

```swift
temperatureInFahrenheit = 40
if temperatureInFahrenheit <= 32 {
    println("It's very cold. Consider wearing a scarf.")
} else {
    println("It's not that cold. Wear a t-shirt.")
}
// prints "It's not that cold. Wear a t-shirt."
```

显然，这两条分支中总有一条会被执行。由于温度已升至40华氏度，不算太冷，没必要再围围巾——因此，`else`分支就被触发了。

你可以把多个`if`语句链接在一起，像下面这样：

```swift
temperatureInFahrenheit = 90
if temperatureInFahrenheit <= 32 {
    println("It's very cold. Consider wearing a scarf.")
} else if temperatureInFahrenheit >= 86 {
    println("It's really warm. Don't forget to wear sunscreen.")
} else {
    println("It's not that cold. Wear a t-shirt.")
}
// prints "It's really warm. Don't forget to wear sunscreen."
```

在上面的例子中，额外的`if`语句用于判断是不是特别热。而最后的*else语句*被保留了下来，用于打印既不冷也不热时的消息。

实际上，最后的*else语句*是可选的：

```swift
temperatureInFahrenheit = 72
if temperatureInFahrenheit <= 32 {
    println("It's very cold. Consider wearing a scarf.")
} else if temperatureInFahrenheit >= 86 {
    println("It's really warm. Don't forget to wear sunscreen.")
}
```

在这个例子中，由于既不冷也不热，所以不会触发`if`或`else if`分支，也就不会打印任何消息。

<a name="switch"></a>
### Switch

`switch`语句会尝试把某个值与若干个模式(pattern)进行匹配。根据第一个匹配成功的模式，`switch`语句会执行对应的代码。当有可能的情况较多时，通常用`switch`语句替换`if`语句。

`switch`语句最简单的形式就是把某个值与一个或若干个相同类型的值作比较：

```swift
switch `some value to consider` {
case `value 1`:
    `respond to value 1`
case `value 2`,
`value 3`:
    `respond to value 2 or 3`
default:
    `otherwise, do something else`
}
```

`switch`语句都由多个*case*构成。为了匹配某些更特定的值，Swift 提供了几种更复杂的匹配模式，这些模式将在本节的稍后部分提到。

每一个*case*都是代码执行的一条分支，这与`if`语句类似。与之不同的是，`switch`语句会决定哪一条分支应该被执行。

`switch`语句必须是完备的。这就是说，每一个可能的值都必须至少有一个*case*块与之对应。在某些不可能涵盖所有值的情况下，你可以使用默认(`default`)块满足该要求，这个默认块必须在`switch`语句的最后面。

下面的例子使用`switch`语句来匹配一个名为`someCharacter`的小写字符：

```swift
let someCharacter: Character = "e"
switch someCharacter {
case "a", "e", "i", "o", "u":
    println("\(someCharacter) is a vowel")
case "b", "c", "d", "f", "g", "h", "j", "k", "l", "m",
"n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z":
    println("\(someCharacter) is a consonant")
default:
    println("\(someCharacter) is not a vowel or a consonant")
}
// prints "e is a vowel"
```

在这个例子中，第一个*case*块用于匹配五个元音，第二个*case*块用于匹配所有的辅音。

由于为其它可能的字符写*case*快没有实际的意义，因此在这个例子中使用了默认块来处理剩下的既不是元音也不是辅音的字符——这就保证了`switch`语句的完备性。

#### 不存在隐式的贯穿(Fallthrough)

与C语言和Objective-C中的`switch`语句不同，在 Swift 中，当匹配的*case*块中的代码执行完毕后，程序会终止`switch`语句，而不会继续执行下一个*case*块。这也就是说，不需要在*case*块中显式地使用`break`语句。这使得`switch`语句更安全、更易用，也避免了因忘记写`break`语句而产生的错误。

> 注意：你依然可以在*case*块中的代码执行完毕前跳出，详情请参考[Switch 语句中的 Break`待添加链接`]()

每一个*case*块都*必须*包含至少一条语句。像下面这样书写代码是无效的，因为第一个*case*块是空的：

```swift
let anotherCharacter: Character = "a"
switch anotherCharacter {
case "a":
case "A":
    println("The letter A")
default:
    println("Not the letter A")
}
// this will report a compile-time error
```

不像C语言里的`switch`语句，在 Swift 中，`switch`语句不会同时匹配`"a"`和`"A"`。相反的，上面的代码会引起编译期错误：`case "a": does not contain any executable statements`——这就避免了意外地从一个*case*块贯穿到另外一个，使得代码更安全、也更直观。

一个*case*也可以包含多个模式，用逗号把它们分开（如果太长了也可以分行写）：

```swift
switch `some value to consider` {
case `value 1`,
`value 2`:
    `statements`
}
```

> 注意：如果想要贯穿特定的*case*块中，请使用`fallthrough`语句，详情请参考[贯穿 (Fallthrough)`待添加链接`]()

#### 范围匹配

*case*块的模式也可以是一个值的范围。下面的例子展示了如何使用范围匹配来输出任意数字对应的自然语言格式：

```swift
let count = 3_000_000_000_000
let countedThings = "stars in the Milky Way"
var naturalCount: String
switch count {
case 0:
    naturalCount = "no"
case 1...3:
    naturalCount = "a few"
case 4...9:
    naturalCount = "several"
case 10...99:
    naturalCount = "tens of"
case 100...999:
    naturalCount = "hundreds of"
case 1000...999_999:
    naturalCount = "thousands of"
default:
    naturalCount = "millions and millions of"
}
println("There are \(naturalCount) \(countedThings).")
// prints "There are millions and millions of stars in the Milky Way."
```

#### 元组 (Tuple)

你可以使用元组在同一个`switch`语句中测试多个值。元组中的元素可以是值，也可以是范围。另外，使用下划线(_)来匹配所有可能的值。

下面的例子展示了如何使用一个`(Int, Int)`类型的元组来分类下图中的点(x, y)：

```swift
let somePoint = (1, 1)
switch somePoint {
case (0, 0):
    println("(0, 0) is at the origin")
case (_, 0):
    println("(\(somePoint.0), 0) is on the x-axis")
case (0, _):
    println("(0, \(somePoint.1)) is on the y-axis")
case (-2...2, -2...2):
    println("(\(somePoint.0), \(somePoint.1)) is inside the box")
default:
    println("(\(somePoint.0), \(somePoint.1)) is outside of the box")
}
// prints "(1, 1) is inside the box"
```

<img src="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/coordinateGraphSimple_2x.png" width="288" height="288">

在上面的例子中，`switch`语句会判断某个点是否是原点(0, 0)，是否在红色的x轴上，是否在黄色y轴上，是否在一个以原点为中心的4x4的矩形里，或者在这个矩形外面。

不像C语言，Swift 允许多个*case*匹配同一个值。实际上，在这个例子中，点(0, 0)可以匹配所有*四个case*。但是，如果存在多个匹配，那么只会执行第一个被匹配到的*case*块。考虑点(0, 0)会首先匹配`case (0, 0)`，因此剩下的能够匹配(0, 0)的*case*块都会被忽视掉。

#### 值绑定 (Value Bindings)

*case*块的模式允许将匹配的值绑定到一个临时的常量或变量，这些常量或变量在该*case*块里就可以被引用了——这种行为被称为*值绑定*。

下面的例子展示了如何在一个`(Int, Int)`类型的元组中使用值绑定来分类下图中的点(x, y)：

```swift
let anotherPoint = (2, 0)
switch anotherPoint {
case (let x, 0):
    println("on the x-axis with an x value of \(x)")
case (0, let y):
    println("on the y-axis with a y value of \(y)")
case let (x, y):
    println("somewhere else at (\(x), \(y))")
}
// prints "on the x-axis with an x value of 2"
```

<img src="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/coordinateGraphMedium_2x.png" width="288" height="288">

在上面的例子中，`switch`语句会判断某个点是否在红色的x轴上，是否在黄色y轴上，或者不在坐标轴上。

这三个*case*都声明了常量`x`和`y`的占位符，用于临时获取元组`anotherPoint`的一个或两个值。第一个*case*——`case (let x, 0)`将匹配一个纵坐标为`0`的点，并把这个点的横坐标赋给临时的常量`x`。类似的，第二个*case*——`case (0, let y)`将匹配一个横坐标为`0`的点，并把这个点的纵坐标赋给临时的常量`y`。

一旦声明了这些临时的常量，它们就可以在其对应的*case*块里引用。在这个例子中，它们用于简化`println`的书写。

请注意，这个`switch`语句不包含默认块。这是因为最后一个*case*——`case let(x, y)`声明了一个可以匹配余下所有值的元组。这使得`switch`语句已经完备了，因此不需要再书写默认块。

在上面的例子中，`x`和`y`是常量，这是因为没有必要在其对应的*case*块中修改它们的值。然而，它们也可以是变量——程序将会创建临时变量，并用相应的值初始化它。修改这些变量只会影响其对应的*case*块。

#### Where

*case*块的模式可以使用`where`语句来判断额外的条件。

下面的例子把下图中的点(x, y)进行了分类：

```swift
let yetAnotherPoint = (1, -1)
switch yetAnotherPoint {
case let (x, y) where x == y:
    println("(\(x), \(y)) is on the line x == y")
case let (x, y) where x == -y:
    println("(\(x), \(y)) is on the line x == -y")
case let (x, y):
    println("(\(x), \(y)) is just some arbitrary point")
}
// prints "(1, -1) is on the line x == -y"
```

<img src="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/coordinateGraphComplex_2x.png" width="289" height="290">

在上面的例子中，`switch`语句会判断某个点是否在绿色的对角线`x == y`上，是否在紫色的对角线`x == -y`上，或者不在对角线上。

这三个*case*都声明了常量`x`和`y`的占位符，用于临时获取元组`yetAnotherPoint`的两个值。这些常量被用作`where`语句的一部分，从而创建一个动态的过滤器(filter)。当且仅当`where`语句的条件为`真`时，匹配到的*case*块才会被执行。

就像是值绑定中的例子，由于最后一个*case*块匹配了余下所有可能的值，`switch`语句就已经完备了，因此不需要再书写默认块。