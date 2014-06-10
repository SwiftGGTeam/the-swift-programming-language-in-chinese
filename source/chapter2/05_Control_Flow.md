# 控制流
-----------------

Swift提供了类似C语言的流程控制结构，包括可以多次执行任务的`for`和`while`循环，基于特定条件选择执行不同代码分支的`if`和`switch`语句，还有控制流程跳转到其他代码的`break`和`continue`语句。

除了C里面传统的 `for` 条件递增循环，Swift 还增加了 `for-in` 循环，用来更简单地遍历数组(array)，字典(dictionary)，范围（range），字符串（string）和其他序列类型。

Swift 的 `switch` 语句比 C 语言中更加强大。在 C 语言中，如果某个 case 不小心漏写了 `break`，这个 case 就会“掉入”下一个 case，Swift 无需写 `break`，所以不会发生这种“掉入”的情况。Case 还可以匹配更多的类型模式，包括范围（range）匹配，元组（tuple）和特定类型的描述。`switch` case 语句中匹配的值可以是由 case 体内部临时的常量或者变量决定，也可以由 `where` 分句描述更复杂的匹配条件。

##For 循环
`for` 循环用来按照指定的次数多次执行一系列语句。Swift 提供两种 `for` 循环形式：

* `for-in` 用来遍历一个范围(range)，队列(sequence)，集合(collection)，系列(progression)里面所有的元素执行一系列语句。

* `for` 条件递增语句(`for-condition-increment`)，用来重复执行一系列语句直到特定条件达成，一般通过在每次循环完成后增加计数器的值来实现。


###For-In
你可以使用 `for-in` 循环来遍历一个集合里面的所有元素，例如由数字表示的范围、数组中的元素、字符串中的字符。

下面的例子用来输出乘5乘法表前面一部分内容：

```
for index in 1...5 {
    println("\(index) times 5 is \(index * 5)")
}
// 1 times 5 is 5
// 2 times 5 is 10
// 3 times 5 is 15
// 4 times 5 is 20
// 5 times 5 is 25
```

例子中用来进行遍历的元素是一组使用闭区间操作符(...)表示的从1到5的闭区间数字。`index` 被赋值为闭区间范围中的第一个数字（1），然后循环中的语句被执行一次。在本例中，这个循环只包含一个语句，用来输出当前 `index` 值所对应的乘5乘法表结果。该语句执行后，`index` 的值被更新为闭区间范围中的第二个数字（2），之后 `println` 方法会再执行一次。整个过程会进行到闭区间范围结尾为止。

上面的例子中，`index` 是一个每次循环遍历开始时被自动赋值的常量。这种情况下，`index` 在使用前不需要声明，只需要将它包含在循环的声明中，就可以对其进行隐式声明，而无需使用 `let` 关键字声明。

```
注意：

index 常量只存在于循环的生命周期里。如果你想在循环完成后访问 index 的值，又或者想让 index 成为一个变量而不是常量，你必须在循环之前自己进行声明。

```

如果你不需要知道范围内每一项的值，你可以使用下划线（_）替代变量名来忽略对值的访问：

```
let base = 3
let power = 10
var answer = 1
for _ in 1...power {
    answer *= base
}
println("\(base) to the power of \(power) is \(answer)")
// prints "3 to the power of 10 is 59049
```
这个例子计算 base 这个数的 power 次幂（本例中，是 3 的 10 次幂），从 1 开始做 3 的乘法（3 的 0 次幂）， 进行 10 次，使用 0 到 9 的半闭区间循环。这个计算并不需要知道每一次循环中计数器具体的值，只需要执行了正确的循环次数即可。下划线符号 _ （替代循环中的变量）能够忽略具体的值，并且不提供循环遍历时对值的访问。

使用 `for-in` 遍历一个数组所有元素：

```
let names = ["Anna", "Alex", "Brian", "Jack"]
for name in names {
    println("Hello, \(name)!")
}
// Hello, Anna!
// Hello, Alex!
// Hello, Brian!
// Hello, Jack!
```
你也可以通过遍历一个字典来访问它的键值对(key-value pairs)。遍历字典时，字典的每项元素会以 （key, value）元组的形式返回，你可以在 `for-in` 循环中使用显式的常量名称来解读 （key, value）元组。下面的例子中，字典的键(key)解读为 `animalName` 常量，字典的值会被解读为 `legCount` 常量：

```
let numberOfLegs = ["spider": 8, "ant": 6, "cat": 4]
for (animalName, legCount) in numberOfLegs {
    println("\(animalName)s have \(legCount) legs")
}
// spiders have 8 legs
// ants have 6 legs
// cats have 4 legs
```
字典元素的遍历顺序和插入顺序可能不同，字典的内容在内部是无序的，所以遍历元素时不能保证顺序。更多数组和字典相关内容，查看[集合类型章节](http://numbbbbb.github.io/the-swift-programming-language-in-chinese/chapter2/04_Collection_Types.html)。

除了数组和字典，你也可以使用 `for-in` 循环来遍历字符串中的字符：

```
for character in "Hello" {
    println(character)
}
// H
// e
// l
// l
// o
```
###For条件递增（for-condition-increment）

除了 `for-in` 循环，Swift 提供使用条件判断和递增方法的标准C样式 `for` 循环:

```
for var index = 0; index < 3; ++index {
    println("index is \(index)")
}
// index is 0
// index is 1
// index is 2
```
下面是一般情况下这种循环方式的格式：

```
for initialization; condition; increment {
    statements
}
```

和 C 语言中一样，分号将循环的定义分为 3 个部分，不同的是，Swift 不需要使用圆括号将“initialization; condition; increment”包括起来。

这个循环执行流程如下：


1. 循环首次启动时，初始化表达式（_initialization expression_）被调用一次，用来初始化循环所需的所有常量和变量。
2. 条件表达式（_condition expression_）被调用，如果表达式调用结果为 `false`，循环结束，继续执行 `for` 循环关闭大括号(})之后的代码。如果表达式调用结果为 `true`，则会执行大括号内部的代码（_statements_）。
3. 执行所有语句（_statements_）之后，执行递增表达式（_increment expression_）。通常会增加或减少计数器的值，或者根据语句（_statements_）输出来修改某一个初始化的变量。当递增表达式运行完成后，重复执行第2步，条件表达式会再次执行。

上述描述和循环格式等同于：

```
initialization
while condition {
    statements
    increment
}
```

在初始化表达式中声明的常量和变量(比如 var index = 0)只在 `for` 循环的生命周期里有效。如果想在循环结束后访问 index 的值，你必须要在循环生命周期开始前声明 index。

```
var index: Int
for index = 0; index < 3; ++index {
    println("index is \(index)")
}
// index is 0
// index is 1
// index is 2
println("The loop statements were executed \(index) times")
// prints "The loop statements were executed 3 times
```
注意 `index` 在循环结束后最终的值是 3 而不是 2。最后一次调用递增表达式 `++index` 会将 `index` 设置为 3，从而导致 `index < 3` 条件为 `false`，并终止循环。

##While 循环

`While` 循环运行一系列语句直到条件变成 `false`。这类循环适合使用在第一次迭代前迭代次数未知的情况下。Swift 提供两种 `while` 循环形式：

* `while` 循环，每次在循环开始时计算条件是否符合；

* `do-while` 循环，每次在循环结束时计算条件是否符合。

###While

`While` 循环从计算单一条件开始。如果条件为 `true`，会重复运行一系列语句，直到条件变为`false`。

下面是一般情况下 `while` 循环格式：

```
while condition {
    statements
}
```

下面的例子来玩一个叫做 _蛇和梯子_ 的小游戏（也叫做 _滑道和梯子_ ）:

![image](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/snakesAndLadders_2x.png)

游戏的规则如下：

* 游戏盘面包括 25 个方格，游戏目标是达到或者超过第 25 个方格；
* 每一轮，你通过掷一个6边的骰子来确定你移动方块的步数，移动的路线由上图中横向的虚线所示；
* 如果在某轮结束，你移动到了梯子的底部，可以顺着梯子爬上去；
* 如果在某轮结束，你移动到了蛇的头部，你会顺着蛇的身体滑下去。

游戏盘面可以使用一个 `Int` 数组来表达。数组的长度由一个 `finalSquare` 常量储存，用来初始化数组和检测最终胜利条件。游戏盘面由 26 个 `Int` 0 值初始化，而不是 25个 （由 0 到 25，一共 26 个）：

```
let finalSquare = 25
var board = Int[](count: finalSquare + 1, repeatedValue: 0)
```

一些方块被设置成有蛇或者梯子的指定值。梯子底部的方块是一个正值，是你可以向上移动，蛇头处的方块是一个负值，会让你向下移动：

```
board[03] = +08; board[06] = +11; board[09] = +09; board[10] = +02
board[14] = -10; board[19] = -11; board[22] = -02; board[24] = -08
```

3 号方块是梯子的底部，会让你向上移动到 11 号方格，我们使用 `board[03]` 等于 `+08` 来表示（11 和 3 之间的差值）。使用一元加运算符（+i）是为了和一元减运算符（-i）对称，为了让盘面代码整齐，小于 10 的数字都使用 0 补齐（这些风格上的调整都不是必须的，只是为了让代码看起来更加整洁）。

玩家由左下角编号为 0 的方格开始游戏。一般来说玩家第一次掷骰子后才会进入游戏盘面：

```
var square = 0
var diceRoll = 0
while square < finalSquare {
    // roll the dice
    if ++diceRoll == 7 { diceRoll = 1 }
    // move by the rolled amount
    square += diceRoll
    if square < board.count {
        // if we're still on the board, move up or down for a snake or a ladder
        square += board[square]
    }
}
println("Game over!")
```
本例中使用了最简单的方法来模拟掷骰子。 `diceRoll` 的值并不是一个随机数，而是以 0 为初始值，之后每一次 `while` 循环，`diceRoll` 的值使用前置自增操作符(++i)来自增 1 ，然后检测是否超出了最大值。`++diceRoll` 调用完成后，返回值等于 `diceRoll` 自增后的值。任何时候如果 `diceRoll` 的值等于7时，就超过了骰子的最大值，会被重置为 1。所以 `diceRoll` 的取值顺序会一直是 1, 2, 3, 4, 5, 6, 1, 2。

掷完骰子后，玩家向前移动 `diceRoll` 个方格，如果玩家移动超过了第 25 个方格，这个时候游戏结束，相应的，代码会在 ` square` 增加 `board[square]` 的值向前或向后移动（遇到了梯子或者蛇）之前，检测 `square` 的值是否小于 `board` 的 `count` 属性。

如果没有这个检测（`square < board.count`），`board[square]` 可能会越界访问 `board` 数组，导致错误。例如如果 `square` 等于 26， 代码会去尝试访问 `board[26]`，超过数组的长度。

当本轮 `while` 循环运行完毕，会再检测循环条件是否需要再运行一次循环。如果玩家移动到或者超过第 25 个方格，循环条件结果为 `false`，此时游戏结束。

`while` 循环比较适合本例中的这种情况，因为在 `while` 循环开始时，我们并不知道游戏的长度或者循环的次数，只有在达成指定条件时循环才会结束。

###Do-While
`while` 循环的另外一种形式是 `do-while`，它和 `while` 的区别是在判断循环条件之前，先执行一次循环的代码块，然后重复循环直到条件为 `false`。

下面是一般情况下 `do-while` 循环的格式：

```
do {
    statements
} while condition
```

还是蛇和梯子的游戏，使用 `do-while` 循环来替代 `while` 循环。`finalSquare`，`board`，`square` 和 `diceRoll` 的值初始化同 `while` 循环一样：

```
let finalSquare = 25
var board = Int[](count: finalSquare + 1, repeatedValue: 0)
board[03] = +08; board[06] = +11; board[09] = +09; board[10] = +02
board[14] = -10; board[19] = -11; board[22] = -02; board[24] = -08
var square = 0
var diceRoll = 0
```

`do-while` 的循环版本，循环中第一步就需要去检测是否在梯子或者蛇的方块上。没有梯子会让玩家直接上到第 25 个方格，所以玩家不会通过梯子直接赢得游戏。这样在循环开始时先检测是否踩在梯子或者蛇上是安全的。

游戏开始时，玩家在第 0 个方格上，`board[0]` 一直等于 0， 不会有什么影响：

```
do {
    // move up or down for a snake or ladder
    square += board[square]
    // roll the dice
    if ++diceRoll == 7 { diceRoll = 1 }
    // move by the rolled amount
    square += diceRoll
} while square < finalSquare
println("Game over!")
```

检测完玩家是否踩在梯子或者蛇上之后，开始掷骰子，然后玩家向前移动 `diceRoll` 个方格，本轮循环结束。

循环条件（`while square < finalSquare`）和 `while` 方式相同，但是只会在循环结束后进行计算。在这个游戏中，`do-while` 表现得比 `while` 循环更好。 `do-while` 方式会在条件判断 `square` 没有超出后直接运行 `square += board[square]` ，这种方式可以去掉 `while` 版本中的数组越界判断。

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