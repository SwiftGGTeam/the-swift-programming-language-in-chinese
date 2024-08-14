# 控制流

使用分支、循环和提前退出来构建代码。


Swift 提供了多种流程控制结构，包括可以多次执行任务的 `while` 循环，基于特定条件选择执行不同代码分支的 
`if`, `guard`, 和 `switch` 语句，还有控制流程跳转到其他代码位置的 `break` 和 `continue`
语句。
Swift 提供了 `for`-`in` 循环，用来更简单地遍历数组（Array），字典（Dictionary），区间（Range），字符串（String）和其他序列类型。
Swift 还提供了 `defer` 语句，用来包含离开当前代码块时要执行的代码。

Swift 的 `switch` 语句比许多类 C 语言要更加强大。
它的 `case` 可以匹配多种不同的模式，包括区间匹配、元组以及类型转换。
`switch` 语句的 `case` 中匹配的值可以声明为临时常量或变量以便在 `case` 作用域内使用，也可以配合 `where` 来描述更复杂的匹配条件。

## For-In 循环

你可以使用 `for`-`in` 循环来遍历一个集合中的所有元素，例如数组中的元素、范围内的数字或者字符串中的字符。

以下例子使用 `for`-`in` 遍历一个数组所有元素：

```swift
let names = ["Anna", "Alex", "Brian", "Jack"]
for name in names {
    print("Hello, \(name)!")
}
// Hello, Anna!
// Hello, Alex!
// Hello, Brian!
// Hello, Jack!
```

<!--
  - test: `forLoops`

  ```swifttest
  -> let names = ["Anna", "Alex", "Brian", "Jack"]
  -> for name in names {
        print("Hello, \(name)!")
     }
  </ Hello, Anna!
  </ Hello, Alex!
  </ Hello, Brian!
  </ Hello, Jack!
  ```
-->

你也可以通过遍历一个字典来访问它的键值对。遍历字典时，字典的每项元素会以 `(key, value)` 元组的形式返回，你可以在 `for`-`in` 循环中使用显式命名后的常量来解构 `(key, value)` 元组。下面的例子中，字典的键会声明为 `animalName`,
常量，字典的值会声明为 `legCount` 常量：

```swift
let numberOfLegs = ["spider": 8, "ant": 6, "cat": 4]
for (animalName, legCount) in numberOfLegs {
    print("\(animalName)s have \(legCount) legs")
}
// cats have 4 legs
// ants have 6 legs
// spiders have 8 legs
```

<!--
  - test: `forLoops`

  ```swifttest
  -> let numberOfLegs = ["spider": 8, "ant": 6, "cat": 4]
  -> for (animalName, legCount) in numberOfLegs {
        print("\(animalName)s have \(legCount) legs")
     }
  </ cats have 4 legs
  </ ants have 6 legs
  </ spiders have 8 legs
  ```
-->

字典的内容本质上是无序的，遍历元素时的顺序是无法确定的。将元素插入字典的顺序并不会决定它们被遍历的顺序。关于数组和字典的细节，参见 <doc:CollectionTypes>。

<!--
  TODO: provide some advice on how to iterate over a Dictionary in order
  (perhaps sorted by key), using a predicate or array sort or some kind.
-->

`for`-`in` 循环还可以使用数字范围。下面的例子用来输出乘法表的一部分内容：
```swift
for index in 1...5 {
    print("\(index) times 5 is \(index * 5)")
}
// 1 times 5 is 5
// 2 times 5 is 10
// 3 times 5 is 15
// 4 times 5 is 20
// 5 times 5 is 25
```

<!--
  - test: `forLoops`

  ```swifttest
  -> for index in 1...5 {
        print("\(index) times 5 is \(index * 5)")
     }
  </ 1 times 5 is 5
  </ 2 times 5 is 10
  </ 3 times 5 is 15
  </ 4 times 5 is 20
  </ 5 times 5 is 25
  ```
-->

例子中用来进行遍历的元素是由闭区间操作符（`...`）表示的从 `1` 到 `5` 的数字区间（包括 `1` 和 `5` 在内）。`index` 被赋值为闭区间中的第一个数字（`1`），然后循环中的语句被执行一次。在本例中，这个循环只包含一个语句，用来输出当前 `index` 值所对应的乘 5 乘法表的结果。该语句执行后，`index` 的值被更新为闭区间中的第二个数字（`2`），之后 `print(_:separator:terminator:)` 函数会再执行一次。整个过程会进行到闭区间结尾为止。

上面的例子中，`index` 是一个每次循环遍历开始时被自动赋值的常量。这种情况下，`index` 在使用前不需要声明，只需要将它包含在循环的声明中，就可以对其进行隐式声明，而无需使用 `let` 关键字声明。

如果你不需要区间序列内每一项的值，你可以使用下划线（`_`）替代变量名来忽略这个值：

```swift
let base = 3
let power = 10
var answer = 1
for _ in 1...power {
    answer *= base
}
print("\(base) to the power of \(power) is \(answer)")
// 输出 "3 to the power of 10 is 59049"
```

<!--
  - test: `forLoops`

  ```swifttest
  -> let base = 3
  -> let power = 10
  -> var answer = 1
  -> for _ in 1...power {
        answer *= base
     }
  -> print("\(base) to the power of \(power) is \(answer)")
  <- 3 to the power of 10 is 59049
  ```
-->

这个例子计算 `base` 这个数的 `power` 次幂（本例中，也就是 `3` 的 `10` 次幂），从 `1`（`3` 的 `0` 次幂）开始做 `3` 的乘法，使用 `1` 到 `10` 的闭区间循环来进行 10 次。这个计算并不需要知道每一次循环中计数器具体的值，只需要执行了正确的循环次数即可。下划线符号 `_` 来替代循环中的变量能够忽略当前值，并且不提供循环遍历时对值的访问。

在某些情况下，你可能不想使用包括两个端点的闭区间。想象一下，你在一个手表上绘制分钟的刻度线。总共 `60` 个刻度，从 `0` 分开始。使用半开区间运算符（`..<`）来表示一个左闭右开的区间。有关区间的更多信息，请参阅 <doc:BasicOperators#Range-Operators>。

```swift
let minutes = 60
for tickMark in 0..<minutes {
    // 每一分钟都渲染一个刻度线（60次）
}
```

<!--
  - test: `forLoops`

  ```swifttest
  -> let minutes = 60
  >> var result: [Int] = []
  -> for tickMark in 0..<minutes {
        // render the tick mark each minute (60 times)
  >>    result.append(tickMark)
     }
  >> print(result.first!, result.last!, result.count)
  << 0 59 60
  ```
-->

一些用户在其 UI 中可能需要较少的刻度。他们可能更喜欢每 `5` 分钟标记一个刻度。使用 `stride(from:to:by:)` 函数跳过不需要的标记。

```swift
let minuteInterval = 5
for tickMark in stride(from: 0, to: minutes, by: minuteInterval) {
    // 每5分钟渲染一个刻度线（0, 5, 10, 15 ... 45, 50, 55）
}
```

<!--
  - test: `forLoops`

  ```swifttest
  -> let minuteInterval = 5
  >> result = []
  -> for tickMark in stride(from: 0, to: minutes, by: minuteInterval) {
        // render the tick mark every 5 minutes (0, 5, 10, 15 ... 45, 50, 55)
  >>      result.append(tickMark)
     }
  >> print(result.first!, result.last!, result.count)
  << 0 55 12
  ```
-->

可以在闭区间使用 `stride(from:through:by:)` 起到同样作用：

```swift
let hours = 12
let hourInterval = 3
for tickMark in stride(from: 3, through: hours, by: hourInterval) {
    // 每3小时渲染一个刻度线（3, 6, 9, 12）
}
```

<!--
  - test: `forLoops`

  ```swifttest
  -> let hours = 12
  -> let hourInterval = 3
  -> for tickMark in stride(from: 3, through: hours, by: hourInterval) {
        // render the tick mark every 3 hours (3, 6, 9, 12)
  >>    print(tickMark)
     }
  << 3
  << 6
  << 9
  << 12
  ```
-->

以上示例使用 `for`-`in` 循环来遍历范围、数组、字典和字符串。你可以用它来遍历任何的集合，包括实现了 [`Sequence`](https://developer.apple.com/documentation/swift/sequence) 协议的自定义类或集合类型。

<!--
  TODO: for (index, object) in enumerate(collection)
  and also for i in indices(collection) { collection[i] }
-->

## While 循环

`while` 循环会一直运行一段语句直到条件变成 `false`。这类循环最适合用在迭代次数在第一次迭代开始前无法确定的情况下。Swift 提供两种 `while` 循环形式：

- `while` 循环，每次在循环开始时评估条件是否符合；
- `repeat`-`while` 循环，每次在循环结束时评估条件是否符合。

### While

`while` 循环从计算一个条件开始。如果条件为 `true`，会重复运行一段语句，直到条件变为 `false`。

下面是 `while` 循环的一般格式：

```swift
while <#condition#> {
   <#statements#>
}
```

下面的例子来玩一个叫做蛇和梯子（也叫做滑道和梯子）的小游戏：

<!-- Apple Books screenshot begins here. -->

![](snakesAndLadders)

游戏的规则如下：

- 游戏盘面包括 25 个方格，游戏目标是达到或者超过第 25 个方格；
- 玩家的起始方块是“方块零”，就在棋盘的左下角。
- 每一轮，你通过掷一个六面体骰子来确定你移动方块的步数，移动的路线由上图中横向的虚线所示；
- 如果在某轮结束，你移动到了梯子的底部，可以顺着梯子爬上去；
- 如果在某轮结束，你移动到了蛇的头部，你会顺着蛇的身体滑下去。

游戏盘面可以使用一个 `Int` 数组来表达。
数组的长度由一个 `finalSquare` 常量储存，
用来初始化数组和检测最终胜利条件。
游戏盘面由 26 个 `Int` 0 值初始化，而不是 25 个（由 0 到 25，一共 26 个）：

```swift
let finalSquare = 25
var board = [Int](repeating: 0, count: finalSquare + 1)
```

<!--
  - test: `snakesAndLadders1`

  ```swifttest
  -> let finalSquare = 25
  -> var board = [Int](repeating: 0, count: finalSquare + 1)
  >> assert(board == [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  ```
-->

一些方格被设置成特定的值来表示有蛇或者梯子。梯子底部的方格是一个正值，使你可以向上移动，蛇头处的方格是一个负值，会让你向下移动：

```swift
board[03] = +08; board[06] = +11; board[09] = +09; board[10] = +02
board[14] = -10; board[19] = -11; board[22] = -02; board[24] = -08
```

<!--
  - test: `snakesAndLadders1`

  ```swifttest
  -> board[03] = +08; board[06] = +11; board[09] = +09; board[10] = +02
  -> board[14] = -10; board[19] = -11; board[22] = -02; board[24] = -08
  ```
-->

<!-- Apple Books screenshot ends here. -->

3 号方格是梯子的底部，会让你向上移动到 11 号方格，我们使用 `board[03]` 等于 `+08`（来表示 `11` 和 `3` 之间的差值）。为了对齐语句，这里使用了一元正运算符（`+i`）和一元负运算符（`-i`），并且小于 `10` 的数字都使用 0 补齐（这些语法的技巧不是必要的，只是为了让代码看起来更加整洁）。

```swift
var square = 0
var diceRoll = 0
while square < finalSquare {
    // 掷骰子
    diceRoll += 1
    if diceRoll == 7 { diceRoll = 1 }
    // 根据点数移动
    square += diceRoll
    if square < board.count {
        // 如果玩家还在棋盘上，顺着梯子爬上去或者顺着蛇滑下去
        square += board[square]
    }
}
print("Game over!")
```

<!--
  - test: `snakesAndLadders1`

  ```swifttest
  -> var square = 0
  -> var diceRoll = 0
  -> while square < finalSquare {
        // roll the dice
        diceRoll += 1
        if diceRoll == 7 { diceRoll = 1 }
  >>    print("diceRoll is \(diceRoll)")
        // move by the rolled amount
        square += diceRoll
  >>    print("after diceRoll, square is \(square)")
        if square < board.count {
           // if we're still on the board, move up or down for a snake or a ladder
           square += board[square]
  >>       print("after snakes or ladders, square is \(square)")
        }
     }
  -> print("Game over!")
  << diceRoll is 1
  << after diceRoll, square is 1
  << after snakes or ladders, square is 1
  << diceRoll is 2
  << after diceRoll, square is 3
  << after snakes or ladders, square is 11
  << diceRoll is 3
  << after diceRoll, square is 14
  << after snakes or ladders, square is 4
  << diceRoll is 4
  << after diceRoll, square is 8
  << after snakes or ladders, square is 8
  << diceRoll is 5
  << after diceRoll, square is 13
  << after snakes or ladders, square is 13
  << diceRoll is 6
  << after diceRoll, square is 19
  << after snakes or ladders, square is 8
  << diceRoll is 1
  << after diceRoll, square is 9
  << after snakes or ladders, square is 18
  << diceRoll is 2
  << after diceRoll, square is 20
  << after snakes or ladders, square is 20
  << diceRoll is 3
  << after diceRoll, square is 23
  << after snakes or ladders, square is 23
  << diceRoll is 4
  << after diceRoll, square is 27
  << Game over!
  ```
-->

本例中使用了最简单的方法来模拟掷骰子。`diceRoll` 的值并不是一个随机数，而是以 `0` 为初始值，之后每一次 `while` 循环，`diceRoll` 的值增加 1 ，然后检测是否超出了最大值。当 diceRoll 的值等于 `7` 时，就超过了骰子的最大值，会被重置为 `1`。所以 diceRoll 的取值顺序会一直是 `1`，`2`，`3`，`4`，`5`，`6`，`1`，`2` 等。

掷完骰子后，玩家向前移动 `diceRoll` 个方格，如果玩家移动超过了第 25 个方格，这个时候游戏将会结束，为了应对这种情况，代码会首先判断 `square` 的值是否小于 `board` 的 `count` 属性，只有小于才会在 `board[square]` 上增加 `square`，来向前或向后移动（遇到了梯子或者蛇）。

> 注意:
> 如果没有这个检测（`square < board.count`），`board[square]` 可能会越界访问 `board` 数组，导致运行时错误。

当本轮 `while` 循环运行完毕，会再检测循环条件是否需要再运行一次循环。如果玩家移动到或者超过第 `25` 个方格，循环条件结果为 `false`，此时游戏结束。

`while` 循环比较适合本例中的这种情况，因为在 `while` 循环开始时，我们并不知道游戏要跑多久，只有在达成指定条件时循环才会结束。

### Repeat-While

`while` 循环的另外一种形式是 `repeat`-`while`，它和 `while` 的区别是在判断循环条件*之前*，先执行一次循环的代码块。然后重复循环直到条件为 `false`。

> 注意:
> Swift 语言的 `repeat`-`while` 循环和其他语言中的 `do`-`while` 循环是类似的。

下面是 `repeat`-`while` 循环的一般格式：

```swift
repeat {
   <#statements#>
} while <#condition#>
```

还是*蛇和梯子*的游戏，使用 `repeat`-`while` 循环来替代 `while` 循环。`finalSquare`、`board`、`square` 和 `diceRoll` 的值初始化同 `while` 循环时一样：

```swift
let finalSquare = 25
var board = [Int](repeating: 0, count: finalSquare + 1)
board[03] = +08; board[06] = +11; board[09] = +09; board[10] = +02
board[14] = -10; board[19] = -11; board[22] = -02; board[24] = -08
var square = 0
var diceRoll = 0
```

<!--
  - test: `snakesAndLadders2`

  ```swifttest
  -> let finalSquare = 25
  -> var board = [Int](repeating: 0, count: finalSquare + 1)
  >> assert(board == [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  -> board[03] = +08; board[06] = +11; board[09] = +09; board[10] = +02
  -> board[14] = -10; board[19] = -11; board[22] = -02; board[24] = -08
  -> var square = 0
  -> var diceRoll = 0
  ```
-->

在 `repeat`-`while` 循环版本中，循环中的*第一个*操作就是前进或后退方块上的步数。因为没有梯子会让玩家直接上到第 25 个方格，所以玩家不会通过梯子直接赢得游戏。因此在循环开始时先就执行方块上的步数是安全的。

游戏开始时，玩家在第 `0` 号方格上，`board[0]` 一直等于 0， 不会有什么影响：

```swift
repeat {
    // 顺着梯子爬上去或者顺着蛇滑下去
    square += board[square]
    // 掷骰子
    diceRoll += 1
    if diceRoll == 7 { diceRoll = 1 }
    // 根据点数移动
    square += diceRoll
} while square < finalSquare
print("Game over!")
```

<!--
  - test: `snakesAndLadders2`

  ```swifttest
  -> repeat {
        // move up or down for a snake or ladder
        square += board[square]
  >>      print("after snakes or ladders, square is \(square)")
        // roll the dice
        diceRoll += 1
        if diceRoll == 7 { diceRoll = 1 }
  >>    print("diceRoll is \(diceRoll)")
        // move by the rolled amount
        square += diceRoll
  >>    print("after diceRoll, square is \(square)")
  -> } while square < finalSquare
  -> print("Game over!")
  << after snakes or ladders, square is 0
  << diceRoll is 1
  << after diceRoll, square is 1
  << after snakes or ladders, square is 1
  << diceRoll is 2
  << after diceRoll, square is 3
  << after snakes or ladders, square is 11
  << diceRoll is 3
  << after diceRoll, square is 14
  << after snakes or ladders, square is 4
  << diceRoll is 4
  << after diceRoll, square is 8
  << after snakes or ladders, square is 8
  << diceRoll is 5
  << after diceRoll, square is 13
  << after snakes or ladders, square is 13
  << diceRoll is 6
  << after diceRoll, square is 19
  << after snakes or ladders, square is 8
  << diceRoll is 1
  << after diceRoll, square is 9
  << after snakes or ladders, square is 18
  << diceRoll is 2
  << after diceRoll, square is 20
  << after snakes or ladders, square is 20
  << diceRoll is 3
  << after diceRoll, square is 23
  << after snakes or ladders, square is 23
  << diceRoll is 4
  << after diceRoll, square is 27
  << Game over!
  ```
-->

执行方块上的步数之后，开始掷骰子，然后玩家向前移动 `diceRoll` 个方格，本轮循环结束。

循环条件（`while square < finalSquare`）和 `while` 方式相同，但是只会在循环结束后进行计算。在前面的例子中，`repeat`-`while` 循环比 `while` 循环更适合这个游戏。`repeat`-`while` 方式会在条件判断 `square` *没有超出后直接运行* `square += board[square]`，比起前面 `while` 循环的版本，这种方式可以省去数组越界的检查。

## 条件语句

根据特定的条件执行特定的代码通常是十分有用的。当错误发生时，你可能想运行额外的代码；或者，当值太大或太小时，向用户显示一条消息。要实现这些功能，你就需要使用*条件语句*。

Swift 提供两种类型的条件语句：`if` 语句和 `switch` 语句。通常，使用 `if` 语句来评估只有少数几种可能性的简单条件。而 `switch` 语句更适用于条件较复杂、有更多排列组合的时候。并且 `switch` 在需要用到模式匹配（pattern-matching）的情况下会更有用。

### If

`if` 语句最简单的形式就是只包含一个条件，只有该条件为 `true` 时，才执行相关代码：

```swift
var temperatureInFahrenheit = 30
if temperatureInFahrenheit <= 32 {
    print("It's very cold. Consider wearing a scarf.")
}
// 输出 "It's very cold. Consider wearing a scarf."
```

<!--
  - test: `ifElse`

  ```swifttest
  -> var temperatureInFahrenheit = 30
  -> if temperatureInFahrenheit <= 32 {
        print("It's very cold. Consider wearing a scarf.")
     }
  <- It's very cold. Consider wearing a scarf.
  ```
-->

上面的例子会判断温度是否小于等于 32 华氏度（水的冰点）。如果是，则打印一条消息；否则，不打印任何消息，继续执行 `if` 块后面的代码。

当然，`if` 语句允许二选一执行，叫做 *else 从句*。也就是当条件为 `false` 时，执行 `else` 语句：

```swift
temperatureInFahrenheit = 40
if temperatureInFahrenheit <= 32 {
    print("It's very cold. Consider wearing a scarf.")
} else {
    print("It's not that cold. Wear a T-shirt.")
}
// 输出 "It's not that cold. Wear a T-shirt."
```

<!--
  - test: `ifElse`

  ```swifttest
  -> temperatureInFahrenheit = 40
  -> if temperatureInFahrenheit <= 32 {
        print("It's very cold. Consider wearing a scarf.")
     } else {
        print("It's not that cold. Wear a T-shirt.")
     }
  <- It's not that cold. Wear a T-shirt.
  ```
-->

显然，这两条分支中总有一条会被执行。由于温度已升至 `40` 华氏度，不算太冷，没必要再围围巾。因此，`else` 分支就被触发了。

你可以把多个 `if` 语句链接在一起，来实现更多分支：

```swift
temperatureInFahrenheit = 90
if temperatureInFahrenheit <= 32 {
    print("It's very cold. Consider wearing a scarf.")
} else if temperatureInFahrenheit >= 86 {
    print("It's really warm. Don't forget to wear sunscreen.")
} else {
    print("It's not that cold. Wear a T-shirt.")
}
// 输出 "It's really warm. Don't forget to wear sunscreen."
```

<!--
  - test: `ifElse`

  ```swifttest
  -> temperatureInFahrenheit = 90
  -> if temperatureInFahrenheit <= 32 {
        print("It's very cold. Consider wearing a scarf.")
     } else if temperatureInFahrenheit >= 86 {
        print("It's really warm. Don't forget to wear sunscreen.")
     } else {
        print("It's not that cold. Wear a T-shirt.")
     }
  <- It's really warm. Don't forget to wear sunscreen.
  ```
-->

在上面的例子中，额外的 `if` 语句用于判断是不是特别热。而最后的 `else` 语句被保留了下来，用于打印既不冷也不热时的消息。

实际上，当不需要完整判断情况的时候，最后的 `else` 语句是可选的：

```swift
temperatureInFahrenheit = 72
if temperatureInFahrenheit <= 32 {
    print("It's very cold. Consider wearing a scarf.")
} else if temperatureInFahrenheit >= 86 {
    print("It's really warm. Don't forget to wear sunscreen.")
}
```

<!--
  - test: `ifElse`

  ```swifttest
  -> temperatureInFahrenheit = 72
  -> if temperatureInFahrenheit <= 32 {
        print("It's very cold. Consider wearing a scarf.")
     } else if temperatureInFahrenheit >= 86 {
        print("It's really warm. Don't forget to wear sunscreen.")
     }
  ```
-->

在这个例子中，由于既不冷也不热，所以不会触发 `if` 或 `else if` 分支，也就不会打印任何消息。

Swift 用 `if` 提供了一种在赋值时可用的简便写法。例如，请考虑以下代码：

```swift
let temperatureInCelsius = 25
let weatherAdvice: String

if temperatureInCelsius <= 0 {
    weatherAdvice = "It's very cold. Consider wearing a scarf."
} else if temperatureInCelsius >= 30 {
    weatherAdvice = "It's really warm. Don't forget to wear sunscreen."
} else {
    weatherAdvice = "It's not that cold. Wear a T-shirt."
}

print(weatherAdvice)
// 输出 "It's not that cold. Wear a T-shirt."
```
上面的代码中，每个分支都为 `weatherAdvice` 设置一个值，该值打印在 `if` 语句之后。

使用下面的语法（称为 `if` 表达式），你可以更简洁地编写这段代码：

```swift
let weatherAdvice = if temperatureInCelsius <= 0 {
    "It's very cold. Consider wearing a scarf."
} else if temperatureInCelsius >= 30 {
    "It's really warm. Don't forget to wear sunscreen."
} else {
    "It's not that cold. Wear a T-shirt."
}

print(weatherAdvice)
// 输出 "It's not that cold. Wear a T-shirt."
```

在此 `if` 表达式版本中，每个分支都包含一个值。如果分支的条件为 true，则该分支的值将用作 `weatherAdvice` 赋值中整个 `if` 表达式的值。每个 `if` 分支都有对应的 `else if` 分支或 `else` 分支，确保其中一个分支始终匹配，并且无论哪些条件为真， `if` 表达式始终生成一个值。

由于赋值的语法从 `if` 表达式外部开始，因此无需在每个分支内重复 `weatherAdvice =`。相反，取而代之的是，每个 `if` 表达式分支会产出 `weatherAdvice` 的三个可能值之一，并使用该值为其赋值。

`if` 表达式的所有分支都需要包含相同类型的值。由于 Swift 会单独检查每个分支返回值的类型，所以像 `nil` 这样可以被用于多个类型的值阻碍了 Swift 自动推断 `if` 表达式的类型。因此，在这种情况下你需要明确指定类型 —— 例如：
```swift
let freezeWarning: String? = if temperatureInCelsius <= 0 {
    "It's below freezing. Watch for ice!"
} else {
    nil
}
```

在上面的代码中，`if` 表达式的一个分支有一个字符串值，另一个分支有一个 `nil` 值。`nil` 值可以用作任何可选类型的值，因此你必须明确声明 `freezeWarning` 是一个可选字符串，如<doc:TheBasics#Type-Annotations>中所述。

提供类型信息的另一种方法是为 `nil` 提供显式类型，而不是为 `freezeWarning` 提供显式类型：

```swift
let freezeWarning = if temperatureInCelsius <= 0 {
    "It's below freezing. Watch for ice!"
} else {
    nil as String?
}
```

`if` 表达式可以通过抛出错误或调用如 `fatalError（_：file：line：）` 来响应没有返回值的意外失败。例如：

```swift
let weatherAdvice = if temperatureInCelsius > 100 {
    throw TemperatureError.boiling
} else {
    "It's a reasonable temperature."
}
```

在此示例中，`if` 表达式会检查预报温度是否高于 100° C —— 水的沸点。高于沸点的温度会导致 `if` 表达式抛出 `.boiling` 错误，而不是返回文本摘要。即使这个 `if` 表达式可能会抛出错误，你也不要在它之前使用 `try`。有关处理错误的信息，请参阅 <doc:ErrorHandling>。

除了在赋值的右侧使用 `if` 表达式（如上面的示例所示）之外，你还可以将它们用作函数或闭包的返回值。

### Switch

`switch` 语句会尝试把某个值与若干个模式（pattern）进行匹配。根据第一个匹配成功的模式，`switch` 语句会执行对应的代码。当有可能的情况较多时，通常用 `switch` 语句替换 `if` 语句。

`switch` 语句最简单的形式就是把某个值与一个或若干个相同类型的值作比较：

```swift
switch <#some value to consider#> {
case <#value 1#>:
    <#respond to value 1#>
case <#value 2#>,
    <#value 3#>:
    <#respond to value 2 or 3#>
default:
    <#otherwise, do something else#>
}
```

`switch` 语句由多个 *情况* 构成，每个情况由 `case` 关键字开始。除了与特定值进行比较之外，Swift 还提供了几种方法来进行更复杂的匹配模式。本章稍后将介绍这些方法。

与 `if` 语句类似，每一个 `case` 都是代码执行的一条分支。`switch` 语句会决定哪一条分支应该被执行，这个流程被称作根据给定的值*路由（switching）*。

`switch` 语句必须是*完备的*。这就是说，每一个可能的值都必须至少有一个 `case` 分支与之对应。在某些不可能涵盖所有可能值的情况下，你可以定义一个默认分支来覆盖所有其他未明确列出的值。这个默认分支由 `default` 关键字来标明，并且必须始终出现在最后。

下面的例子使用 `switch` 语句来匹配一个名为 `someCharacter` 的小写字符：

```swift
let someCharacter: Character = "z"
switch someCharacter {
case "a":
    print("The first letter of the Latin alphabet")
case "z":
    print("The last letter of the Latin alphabet")
default:
    print("Some other character")
}
// 输出 "The last letter of the Latin alphabet"
```

<!--
  - test: `switch`

  ```swifttest
  -> let someCharacter: Character = "z"
  -> switch someCharacter {
        case "a":
           print("The first letter of the Latin alphabet")
        case "z":
           print("The last letter of the Latin alphabet")
        default:
           print("Some other character")
     }
  <- The last letter of the Latin alphabet
  ```
-->

在这个例子中，第一个 `case` 分支用于匹配第一个英文字母 `a`，第二个 `case` 分支用于匹配最后一个字母 `z`。因为 `switch` 语句必须有一个 `case` 分支用于覆盖所有可能的字符，而不仅仅是所有的英文字母，所以 `switch` 语句使用 `default` 分支来匹配除了 `a` 和 `z` 外的所有值，这个分支保证了 `switch` 语句的完备性。


和 `if` 语句一样，`switch` 语句也具有表达式形式:

```swift
let anotherCharacter: Character = "a"
let message = switch anotherCharacter {
case "a":
    "The first letter of the Latin alphabet"
case "z":
    "The last letter of the Latin alphabet"
default:
    "Some other character"
}

print(message)
// 输出 "The first letter of the Latin alphabet"
```

在此示例中，`switch` 表达式中的每个 `case` 都包含与 `anotherCharacter` 匹配成功时 `message` 的值。由于 `switch` 始终是完备的，因此始终会分配一个值。

与 `if` 表达式一样，你可以抛出错误或调用类似 `fatalError（_：file：line：）` 这样不返回值的函数，从而不给特定的 `case` 提供返回值。如上例所示，你可以在赋值的右侧使用 `switch` 表达式，也可以用作函数或闭包的返回值。

#### 没有隐式贯穿

与 C 和 Objective-C 中的 `switch` 语句不同，在 Swift 中，当匹配的 `case` 分支中的代码执行完毕后，程序会终止 `switch` 语句，而不会继续执行下一个 `case` 分支。这也就是说，不需要在 `case` 分支中显式地使用 `break` 语句。这使得 `switch` 语句更安全、更易用，也避免了漏写 `break` 语句导致多个 `case` 被执行的错误。

> 注意: 
> 虽然在 Swift 中 `break` 不是必须的，但你依然可以在 `case` 分支中的代码执行完毕前使用 break 跳出，详情请参见<doc:ControlFlow#Break-in-a-Switch-Statement>。

每一个 `case` 分支都*必须*包含至少一条语句。像下面这样书写代码是不合法的，因为第一个 `case` 分支是空的：

```swift
let anotherCharacter: Character = "a"
switch anotherCharacter {
case "a": // 不合法，这个分支下面没有语句
case "A":
    print("The letter A")
default:
    print("Not the letter A")
}
// 这段代码会报编译错误
```

<!--
  - test: `noFallthrough`

  ```swifttest
  -> let anotherCharacter: Character = "a"
  -> switch anotherCharacter {
        case "a": // Invalid, the case has an empty body
        case "A":
           print("The letter A")
        default:
           print("Not the letter A")
     }
  !$ error: 'case' label in a 'switch' must have at least one executable statement
  !!      case "a": // Invalid, the case has an empty body
  !!      ^~~~~~~~~
  !!                break
  // This will report a compile-time error.
  ```
-->

和 C 语言里的 `switch` 语句不同，在 Swift 中，`switch` 语句不会一起匹配 `"a"` 和 `"A"`。相反的，上面的代码会引起编译期错误：`case "a":` 不包含任何可执行语句 ——这就避免了意外地从一个 case 分支贯穿到另外一个，使得代码更安全、也更直观。

为了让单个 `case` 同时匹配 `"a"` 和 `"A"`，可以将这个两个值组合成一个复合匹配，并且用逗号分开：

```swift
let anotherCharacter: Character = "a"
switch anotherCharacter {
case "a", "A":
    print("The letter A")
default:
    print("Not the letter A")
}
// 输出 "The letter A"
```

<!--
  - test: `compoundCaseInsteadOfFallthrough`

  ```swifttest
  -> let anotherCharacter: Character = "a"
  -> switch anotherCharacter {
        case "a", "A":
           print("The letter A")
        default:
           print("Not the letter A")
     }
  <- The letter A
  ```
-->

为了可读性，复合匹配可以写成多行形式，详情请参考 <doc:ControlFlow#Compound-Cases>。

> 注意:
> 如果想要显式贯穿 case 分支，请使用 `fallthrough` 关键字，详情请参考 <doc:ControlFlow#Fallthrough>。

#### 区间匹配

`switch` 中 `case` 分支的模式也可以是一个值的区间。下面的例子展示了如何使用区间匹配来输出任意数量所对应对应的自然语言计数表达：

<!--
  REFERENCE
  Saturn has 62 moons with confirmed orbits.
-->

```swift
let approximateCount = 62
let countedThings = "moons orbiting Saturn"
let naturalCount: String
switch approximateCount {
case 0:
    naturalCount = "no"
case 1..<5:
    naturalCount = "a few"
case 5..<12:
    naturalCount = "several"
case 12..<100:
    naturalCount = "dozens of"
case 100..<1000:
    naturalCount = "hundreds of"
default:
    naturalCount = "many"
}
print("There are \(naturalCount) \(countedThings).")
// 输出 "There are dozens of moons orbiting Saturn."
```

<!--
  - test: `intervalMatching`

  ```swifttest
  -> let approximateCount = 62
  -> let countedThings = "moons orbiting Saturn"
  -> let naturalCount: String
  -> switch approximateCount {
     case 0:
         naturalCount = "no"
     case 1..<5:
         naturalCount = "a few"
     case 5..<12:
         naturalCount = "several"
     case 12..<100:
         naturalCount = "dozens of"
     case 100..<1000:
         naturalCount = "hundreds of"
     default:
         naturalCount = "many"
     }
  -> print("There are \(naturalCount) \(countedThings).")
  <- There are dozens of moons orbiting Saturn.
  ```
-->

在上面的例子中，`approximateCount` 在一个 `switch` 语句中被评估。每一个 `case` 都把这个值与一个数字或区间进行比较。因为 `approximateCount` 落在了 12 到 100 的区间，所以 `naturalCount` 被赋值为 `"dozens of"` 值，然后执行流程就被转移到了 `switch` 语句之外。

#### 元组

我们可以使用元组在同一个 `switch` 语句中测试多个值。可以针对不同的值或值区间来测试元组的每个元素。另外，使用下划线（`_`）来匹配所有可能的值。

下面的例子展示了如何使用一个 `(Int, Int)` 类型的元组来给下图中的点 (x, y) 进行分类：

```swift
let somePoint = (1, 1)
switch somePoint {
case (0, 0):
    print("\(somePoint) is at the origin")
case (_, 0):
    print("\(somePoint) is on the x-axis")
case (0, _):
    print("\(somePoint) is on the y-axis")
case (-2...2, -2...2):
    print("\(somePoint) is inside the box")
default:
    print("\(somePoint) is outside of the box")
}
// 输出 "(1, 1) is inside the box"
```

<!--
  - test: `tuples`

  ```swifttest
  -> let somePoint = (1, 1)
  -> switch somePoint {
        case (0, 0):
           print("\(somePoint) is at the origin")
        case (_, 0):
           print("\(somePoint) is on the x-axis")
        case (0, _):
           print("\(somePoint) is on the y-axis")
        case (-2...2, -2...2):
           print("\(somePoint) is inside the box")
        default:
           print("\(somePoint) is outside of the box")
     }
  <- (1, 1) is inside the box
  ```
-->

![](coordinateGraphSimple)

在上面的例子中，`switch` 语句会判断某个点是否是原点 (0, 0)，是否在红色的 x 轴上，是否在绿色的 y 轴上，是否在一个以原点为中心的4x4的蓝色矩形里，或者在这个矩形外面。

和 C 语言不同，Swift 允许多个 `case` 匹配同一个值。实际上，在这个例子中，四个 `case` 都可以匹配点 (0, 0) 。但是，如果存在多个匹配，那么只会执行第一个被匹配到的 case 分支。由于点 (0, 0) 会首先匹配 `case (0, 0)`，因此剩下的能够匹配的分支都会被忽视掉。

#### 值绑定（Value Bindings）

`switch` 的 `case` 分支允许将匹配的值声明为临时常量或变量，并且在 case 分支体内使用。因为值被绑定在 case 分支体作用域内的临时常量或变量上，所以这种行为被称为*值绑定*（value binding）。

下面的例子展示了如何使用一个 `(Int, Int)` 类型的元组来给下图中的点 (x, y) 进行分类：

```swift
let anotherPoint = (2, 0)
switch anotherPoint {
case (let x, 0):
    print("on the x-axis with an x value of \(x)")
case (0, let y):
    print("on the y-axis with a y value of \(y)")
case let (x, y):
    print("somewhere else at (\(x), \(y))")
}
// 输出 "on the x-axis with an x value of 2"
```

<!--
  - test: `valueBindings`

  ```swifttest
  -> let anotherPoint = (2, 0)
  -> switch anotherPoint {
        case (let x, 0):
           print("on the x-axis with an x value of \(x)")
        case (0, let y):
           print("on the y-axis with a y value of \(y)")
        case let (x, y):
           print("somewhere else at (\(x), \(y))")
     }
  <- on the x-axis with an x value of 2
  ```
-->

![](coordinateGraphMedium)

在上面的例子中，`switch` 语句会判断某个点是否在红色的 x 轴上，是否在绿色的 y 轴上，或者不在坐标轴上。

这三个 `case` 都声明了占位符常量 `x` 和 `y` ，用于临时获取元组 `anotherPoint` 的一个或两个值。第一个 case ——`case (let x, 0)` 将匹配一个纵坐标为 0 的点，并把这个点的横坐标赋给临时的常量 `x`。类似的，第二个 case ——`case (0, let y)` 将匹配一个横坐标为 0 的点，并把这个点的纵坐标赋给临时的常量 `y`。

一旦声明了这些临时的常量，它们就可以在其对应的 case 分支里使用。在这个例子中，它们用于打印给定点的分类。

请注意，这个 `switch` 语句不包含 `default` 分支。这是因为最后一个 case ——`case let(x, y)` 声明了一个可以匹配余下所有值的元组。这使得 switch 语句已经完备了，因此不需要再书写默认分支。

#### Where

`case` 分支可以使用 `where` 从句来判断附加的条件。

下面的例子把下图中的点 (x, y) 进行了分类：

```swift
let yetAnotherPoint = (1, -1)
switch yetAnotherPoint {
case let (x, y) where x == y:
    print("(\(x), \(y)) is on the line x == y")
case let (x, y) where x == -y:
    print("(\(x), \(y)) is on the line x == -y")
case let (x, y):
    print("(\(x), \(y)) is just some arbitrary point")
}
// 输出 "(1, -1) is on the line x == -y"
```

<!--
  - test: `where`

  ```swifttest
  -> let yetAnotherPoint = (1, -1)
  -> switch yetAnotherPoint {
        case let (x, y) where x == y:
           print("(\(x), \(y)) is on the line x == y")
        case let (x, y) where x == -y:
           print("(\(x), \(y)) is on the line x == -y")
        case let (x, y):
           print("(\(x), \(y)) is just some arbitrary point")
     }
  <- (1, -1) is on the line x == -y
  ```
-->

![](coordinateGraphComplex)

在上面的例子中，`switch` 语句会判断某个点是否在绿色的对角线 `x == y` 上，是否在紫色的对角线 `x == -y` 上，或者不在对角线上。

这三个 `case` 声明了占位符常量 `x` 和 `y`，用于临时获取元组 `yetAnotherPoint` 的两个值。这两个常量被用作 `where` 语句的一部分，从而创建一个动态的过滤器（filter）。当且仅当 `where` 语句的条件为 `true` 时，匹配到的 `case` 分支才会被执行。

和值绑定中的例子一样，由于最后一个 case 分支匹配了余下所有可能的值，`switch` 语句就已经完备了，因此不需要再书写 `default` 分支。

#### 复合型 Cases（Compound Cases）

共享同一主体的多个 switch case 可以通过在 `case` 后编写多个模式来组合，每个模式之间用逗号隔开。当 `case` 后面的任意一种模式匹配的时候，这条分支就会被匹配。并且，如果匹配列表过长，还可以分行书写：

```swift
let someCharacter: Character = "e"
switch someCharacter {
case "a", "e", "i", "o", "u":
    print("\(someCharacter) is a vowel")
case "b", "c", "d", "f", "g", "h", "j", "k", "l", "m",
    "n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z":
    print("\(someCharacter) is a consonant")
default:
    print("\(someCharacter) isn't a vowel or a consonant")
}
// 输出 "e is a vowel"
```

<!--
  - test: `compound-switch-case`

  ```swifttest
  -> let someCharacter: Character = "e"
  -> switch someCharacter {
         case "a", "e", "i", "o", "u":
             print("\(someCharacter) is a vowel")
         case "b", "c", "d", "f", "g", "h", "j", "k", "l", "m",
             "n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z":
             print("\(someCharacter) is a consonant")
         default:
             print("\(someCharacter) isn't a vowel or a consonant")
     }
  <- e is a vowel
  ```
-->

这个 `switch` 语句中的第一个 case 匹配了英语中的五个小写元音字母。类似的，第二个 case 匹配了英语中所有的小写辅音字母。最终，`default` 分支匹配了其它所有字符。

复合匹配同样可以包含值绑定。复合匹配里所有的匹配模式，都必须包含相同的值绑定。并且每一个绑定都必须获取到相同类型的值。这保证了，无论复合匹配中的哪个模式发生了匹配，分支体内的代码，都能获取到绑定的值，并且绑定的值都有一样的类型。

```swift
let stillAnotherPoint = (9, 0)
switch stillAnotherPoint {
case (let distance, 0), (0, let distance):
    print("On an axis, \(distance) from the origin")
default:
    print("Not on an axis")
}
// 输出 "On an axis, 9 from the origin"
```

<!--
  - test: `compound-switch-case`

  ```swifttest
  -> let stillAnotherPoint = (9, 0)
  -> switch stillAnotherPoint {
         case (let distance, 0), (0, let distance):
             print("On an axis, \(distance) from the origin")
         default:
             print("Not on an axis")
     }
  <- On an axis, 9 from the origin
  ```
-->

上面的 `case` 有两个模式：`(let distance, 0)` 匹配了在 x 轴上的值，`(0, let distance)` 匹配了在 y 轴上的值。两个模式都绑定了 `distance`，并且 `distance` 在两种模式下，都是整型——这意味着分支体内的代码，只要 `case` 匹配，都可以获取到 `distance` 值。

## 控制转移语句

*控制转移语句*改变你代码的执行顺序，通过它可以实现代码的跳转。Swift 有五种控制转移语句：

- `continue`
- `break`
- `fallthrough`
- `return`
- `throw`

我们将会在下面讨论 `continue` ， `break` 和 `fallthrough` 语句。
`return` 语句将会在 <doc:Functions> 章节讨论，
`throw` 语句会在 <doc:ErrorHandling#Propagating-Errors-Using-Throwing-Functions> 章节讨论。

### Continue

`continue` 语句告诉一个循环体立刻停止本次循环，重新开始下次循环。就好像在说“本次循环我已经执行完了”，但是并不会离开整个循环体。

下面的例子把一个小写字符串中的元音字母和空格字符移除，生成了一个含义模糊的短句：

```swift
let puzzleInput = "great minds think alike"
var puzzleOutput = ""
let charactersToRemove: [Character] = ["a", "e", "i", "o", "u", " "]
for character in puzzleInput {
    if charactersToRemove.contains(character) {
        continue
    }
    puzzleOutput.append(character)
}
print(puzzleOutput)
// 输出 "grtmndsthnklk"
```

<!--
  - test: `continue`

  ```swifttest
  -> let puzzleInput = "great minds think alike"
  -> var puzzleOutput = ""
  -> let charactersToRemove: [Character] = ["a", "e", "i", "o", "u", " "]
  -> for character in puzzleInput {
        if charactersToRemove.contains(character) {
           continue
        }
        puzzleOutput.append(character)
     }
  -> print(puzzleOutput)
  <- grtmndsthnklk
  ```
-->

在上面的代码中，只要匹配到元音字母或者空格字符，就调用 `continue` 语句，使本次循环结束，重新开始下次循环。这种行为使 `switch` 匹配到元音字母和空格字符时不做处理，而不是让每一个匹配到的字符都被打印。

### Break

`break` 语句会立刻结束整个控制流的执行。`break` 可以在 `switch` 或循环语句中使用，用来提前结束 `switch` 或循环语句。

#### 循环语句中的 break

当在一个循环体中使用 `break` 时，会立刻中断该循环体的执行，然后跳转到表示循环体结束的大括号（`}`）后的第一行代码。不会再有本次循环的代码被执行，也不会再有下次的循环产生。

<!--
  TODO: I need an example here.
-->

#### Switch 语句中的 break（Break in a Switch Statement）

当在一个 `switch` 语句中使用 `break` 时，会立即中断该 `switch` 语句的执行，并且跳转到表示 `switch` 语句结束的大括号（`}`）后的第一行代码。

这种特性可以被用来匹配和忽略一个或多个分支。因为 Swift 的 `switch` 语句必须是完备的而且不允许有为空的分支，有时为了使你的意图更明显，需要特意匹配或者忽略某个分支。那么当你想忽略某个分支时，可以在该分支内写上 `break` 语句。当那个分支被匹配到时，分支内的 `break` 语句立即结束 `switch` 代码块。

> 注意: 
> 当一个 `case` 分支仅仅包含注释时，会被报编译时错误。注释不是代码语句而且也不能让 `switch` 分支达到被忽略的效果。你应该使用 `break` 来忽略某个分支。

下面的例子通过 `switch` 来判断一个 `Character` 是否表示下面四种语言之一的数字符号。为了简洁，多个值被包含在了同一个分支中。

```swift
let numberSymbol: Character = "三"  // Chinese symbol for the number 3
var possibleIntegerValue: Int?
switch numberSymbol {
case "1", "١", "一", "๑":
    possibleIntegerValue = 1
case "2", "٢", "二", "๒":
    possibleIntegerValue = 2
case "3", "٣", "三", "๓":
    possibleIntegerValue = 3
case "4", "٤", "四", "๔":
    possibleIntegerValue = 4
default:
    break
}
if let integerValue = possibleIntegerValue {
    print("The integer value of \(numberSymbol) is \(integerValue).")
} else {
    print("An integer value couldn't be found for \(numberSymbol).")
}
// 输出 "The integer value of 三 is 3."
```

<!--
  - test: `breakInASwitchStatement`

  ```swifttest
  -> let numberSymbol: Character = "三"  // Chinese symbol for the number 3
  -> var possibleIntegerValue: Int?
  -> switch numberSymbol {
        case "1", "١", "一", "๑":
           possibleIntegerValue = 1
        case "2", "٢", "二", "๒":
           possibleIntegerValue = 2
        case "3", "٣", "三", "๓":
           possibleIntegerValue = 3
        case "4", "٤", "四", "๔":
           possibleIntegerValue = 4
        default:
           break
     }
  -> if let integerValue = possibleIntegerValue {
        print("The integer value of \(numberSymbol) is \(integerValue).")
     } else {
        print("An integer value couldn't be found for \(numberSymbol).")
     }
  <- The integer value of 三 is 3.
  ```
-->

这个例子检查 `numberSymbol` 是否是拉丁语，阿拉伯语，中文或者泰语中的 `1` 到 `4` 之一。如果被匹配到，该 `switch` 语句的 `case` 分支给 `Int?` 类型变量 `possibleIntegerValue` 设置为对应的整数值。

当 `switch` 代码块执行完后，接下来的代码通过使用可选绑定来判断 `possibleIntegerValue` 是否曾经被设置过值。因为是可选类型的缘故，`possibleIntegerValue` 有一个隐式的初始值 `nil`，所以仅仅当 `possibleIntegerValue` 曾被 `switch` 语句的前四个分支中的某个设置过一个值时，可选的绑定才会被判定为成功。

在上面的例子中，想要把 `Character` 所有的的可能性都枚举出来是不现实的，所以使用 `default` 分支来包含所有上面没有匹配到字符的情况。由于这个 `default` 分支不需要执行任何动作，所以它只写了一条 `break` 语句。一旦落入到 `default` 分支中后，`break` 语句就完成了该分支的所有代码操作，代码继续向下，开始执行 `if let` 语句。

### 贯穿（Fallthrough）

在 Swift 中，`switch` 语句不会从上一个 `case` 分支跳转到下一个 `case` 分支中。这意味着只要第一个匹配到的 `case` 分支完成了它需要执行的语句，整个 `switch` 代码块完成了它的执行。相比之下，C 语言要求你显式地插入 `break` 语句到每个 `case` 分支的末尾来阻止自动落入到下一个 `case` 分支中。Swift 的这种避免默认落入到下一个分支中的特性意味着它的 `switch` 功能要比 C 语言的更加清晰和可预测，可以避免无意识地执行多个 `case` 分支从而引发的错误。

如果你确实需要 C 风格的贯穿的特性，你可以在每个需要该特性的 `case` 分支中使用 `fallthrough` 关键字。下面的例子使用 `fallthrough` 来创建一个数字的描述语句。

```swift
let integerToDescribe = 5
var description = "The number \(integerToDescribe) is"
switch integerToDescribe {
case 2, 3, 5, 7, 11, 13, 17, 19:
    description += " a prime number, and also"
    fallthrough
default:
    description += " an integer."
}
print(description)
// 输出 "The number 5 is a prime number, and also an integer."
```

<!--
  - test: `fallthrough`

  ```swifttest
  -> let integerToDescribe = 5
  -> var description = "The number \(integerToDescribe) is"
  -> switch integerToDescribe {
        case 2, 3, 5, 7, 11, 13, 17, 19:
           description += " a prime number, and also"
           fallthrough
        default:
           description += " an integer."
     }
  -> print(description)
  <- The number 5 is a prime number, and also an integer.
  ```
-->

这个例子定义了一个 `String` 类型的变量 `description` 并且给它设置了一个初始值。函数使用 `switch` 语句来判断 `integerToDescribe` 变量的值。当 `integerToDescribe` 的值属于列表中的质数之一时，该函数在 `description` 后添加一段文字，来表明这个数字是一个质数。然后它使用 `fallthrough` 关键字来“贯穿”到 `default` 分支中。`default` 分支在 `description` 的最后添加一段额外的文字，至此 `switch` 代码块执行完了。

如果 `integerToDescribe` 的值不属于列表中的任何质数，那么它不会匹配到第一个 `case` 分支。而这里没有其他特别的分支情况，所以 `integerToDescribe` 匹配到 `default` 分支中。

当 `switch` 语句执行完后，使用 `print(_:separator:terminator:)` 函数打印该数字的描述。在这个例子中，数字 `5` 被准确的识别为了一个质数。

> 注意: The `fallthrough`
> `fallthrough` 关键字不会检查它下一个将会落入执行的 `case` 中的匹配条件。`fallthrough` 简单地使代码继续连接到下一个 `case` （或 `default`）中的代码，这和 C 语言标准中的 `switch` 语句特性是一样的。

### 带标签的语句

在 Swift 中，你可以在循环体和条件语句中嵌套循环体和条件语句来创造复杂的控制流结构。并且，循环体和条件语句都可以使用 `break` 语句来提前结束整个代码块。因此，显式地指明 `break` 语句想要终止的是哪个循环体或者条件语句，会很有用。类似地，如果你有许多嵌套的循环体，显式指明 `continue` 语句想要影响哪一个循环体也会非常有用。

为了实现这个目的，你可以使用*语句标签（statement label）*来标记一个循环体或者条件语句，对于一个条件语句，你可以使用 `break` 加标签的方式，来结束这个被标记的语句。对于一个循环语句，你可以使用 `break` 或者 `continue` 加标签，来结束或者继续这条被标记语句的执行。

声明一个带标签的语句是通过在该语句的关键字的同一行前面放置一个标签，作为这个语句的前导关键字（introducer keyword），并且该标签后面跟随一个冒号。下面是一个针对 `while` 循环体的标签语法，同样的规则适用于所有的循环体和 `switch` 语句。

```swift
<#label name#>: while <#condition#> {
   <#statements#>
}
```

下面的例子是前面章节中*蛇和梯子*游戏的适配版本，在此版本中，我们在一个带有标签的 `while` 循环体中使用 `break` 和 `continue` 语句。这次，游戏增加了一条额外的规则：

- 为了获胜，你必须*刚好*落在第 25 个方块中。

如果某次掷骰子使你的移动超出第 25 个方块，你必须重新掷骰子，直到你掷出的骰子数刚好使你能落在第 25 个方块中。

游戏的棋盘和之前一样：

![](snakesAndLadders)

`finalSquare`、`board`、`square` 和 `diceRoll` 值使用和之前一样的方式初始化：

```swift
let finalSquare = 25
var board = [Int](repeating: 0, count: finalSquare + 1)
board[03] = +08; board[06] = +11; board[09] = +09; board[10] = +02
board[14] = -10; board[19] = -11; board[22] = -02; board[24] = -08
var square = 0
var diceRoll = 0
```

<!--
  - test: `labels`

  ```swifttest
  -> let finalSquare = 25
  -> var board = [Int](repeating: 0, count: finalSquare + 1)
  >> assert(board == [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  -> board[03] = +08; board[06] = +11; board[09] = +09; board[10] = +02
  -> board[14] = -10; board[19] = -11; board[22] = -02; board[24] = -08
  -> var square = 0
  -> var diceRoll = 0
  ```
-->

这个版本的游戏使用 `while` 循环和 `switch` 语句来实现游戏的逻辑。`while` 循环有一个标签名 `gameLoop`，来表明它是游戏的主循环。

该 `while` 循环体的条件判断语句是 `while square != finalSquare`，这表明你必须刚好落在方格25中。

```swift
gameLoop: while square != finalSquare {
    diceRoll += 1
    if diceRoll == 7 { diceRoll = 1 }
    switch square + diceRoll {
    case finalSquare:
        // 骰子数刚好使玩家移动到最终的方格里，游戏结束。
        break gameLoop
    case let newSquare where newSquare > finalSquare:
        // 骰子数将会使玩家的移动超出最后的方格，那么这种移动是不合法的，玩家需要重新掷骰子
        continue gameLoop
    default:
        // 有效移动，做正常的处理
        square += diceRoll
        square += board[square]
    }
}
print("Game over!")
```

<!--
  - test: `labels`

  ```swifttest
  -> gameLoop: while square != finalSquare {
        diceRoll += 1
        if diceRoll == 7 { diceRoll = 1 }
  >>    print("diceRoll is \(diceRoll)")
        switch square + diceRoll {
           case finalSquare:
              // diceRoll will move us to the final square, so the game is over
  >>          print("finalSquare, game is over")
              break gameLoop
           case let newSquare where newSquare > finalSquare:
              // diceRoll will move us beyond the final square, so roll again
  >>          print("move too far, roll again")
              continue gameLoop
           default:
              // this is a valid move, so find out its effect
              square += diceRoll
  >>          print("after diceRoll, square is \(square)")
              square += board[square]
  >>          print("after snakes or ladders, square is \(square)")
        }
     }
  -> print("Game over!")
  << diceRoll is 1
  << after diceRoll, square is 1
  << after snakes or ladders, square is 1
  << diceRoll is 2
  << after diceRoll, square is 3
  << after snakes or ladders, square is 11
  << diceRoll is 3
  << after diceRoll, square is 14
  << after snakes or ladders, square is 4
  << diceRoll is 4
  << after diceRoll, square is 8
  << after snakes or ladders, square is 8
  << diceRoll is 5
  << after diceRoll, square is 13
  << after snakes or ladders, square is 13
  << diceRoll is 6
  << after diceRoll, square is 19
  << after snakes or ladders, square is 8
  << diceRoll is 1
  << after diceRoll, square is 9
  << after snakes or ladders, square is 18
  << diceRoll is 2
  << after diceRoll, square is 20
  << after snakes or ladders, square is 20
  << diceRoll is 3
  << after diceRoll, square is 23
  << after snakes or ladders, square is 23
  << diceRoll is 4
  << move too far, roll again
  << diceRoll is 5
  << move too far, roll again
  << diceRoll is 6
  << move too far, roll again
  << diceRoll is 1
  << after diceRoll, square is 24
  << after snakes or ladders, square is 16
  << diceRoll is 2
  << after diceRoll, square is 18
  << after snakes or ladders, square is 18
  << diceRoll is 3
  << after diceRoll, square is 21
  << after snakes or ladders, square is 21
  << diceRoll is 4
  << finalSquare, game is over
  << Game over!
  ```
-->

每次循环迭代开始时掷骰子。与之前玩家掷完骰子就立即移动不同，这里使用了 `switch` 语句来考虑每次移动可能产生的结果，从而决定玩家本次是否能够移动。

- 如果骰子数刚好使玩家移动到最终的方格里，游戏结束。`break gameLoop` 语句跳转控制去执行 `while` 循环体后的第一行代码。
- 如果骰子数将会使玩家的移动超出最后的方格，那么这种移动是不合法的，玩家需要重新掷骰子。`continue gameLoop` 语句结束本次 `while` 循环，开始下一次循环。
- 在剩余的所有情况中，骰子数产生的都是有效的移动。玩家向前移动 `diceRoll` 个方格，然后游戏逻辑再处理玩家当前是否处于蛇头或者梯子的底部。接着本次循环结束，控制跳转到 `while` 循环体的条件判断语句处，再决定是否需要继续执行下次循环。


> 注意: 
> 如果上述的 `break` 语句没有使用 `gameLoop` 标签，那么它将会中断 `switch` 语句而不是 `while` 循环。使用 `gameLoop` 标签清晰的表明了 `break` 想要中断的是哪个控制语句。
> 同时请注意，当调用 `continue gameLoop` 去跳转到下一次循环迭代时，这里使用 `gameLoop` 标签并不是严格必须的。因为在这个游戏中，只有一个循环体，所以 `continue` 语句会影响到哪个循环体是没有歧义的。然而，`continue` 语句使用 `gameLoop` 标签也是没有危害的。这样做符合标签的使用规则，同时参照旁边的 `break gameLoop`，能够使游戏的逻辑更加清晰和易于理解。

## 提前退出

像 `if` 语句一样，`guard` 语句的执行取决于一个表达式的布尔值。`guard` 来要求条件必须为真时才会执行 `guard` 语句后的代码。不同于 `if` 语句，`guard` 语句总是有一个 `else` 从句，如果条件不为真则执行 `else` 从句中的代码。

```swift
func greet(person: [String: String]) {
    guard let name = person["name"] else {
        return
    }

    print("Hello \(name)!")

    guard let location = person["location"] else {
        print("I hope the weather is nice near you.")
        return
    }

    print("I hope the weather is nice in \(location).")
}

greet(person: ["name": "John"])
// 输出 "Hello John!"
// 输出 "I hope the weather is nice near you."
greet(person: ["name": "Jane", "location": "Cupertino"])
// 输出 "Hello Jane!"
// 输出 "I hope the weather is nice in Cupertino."
```

<!--
  - test: `guard`

  ```swifttest
  -> func greet(person: [String: String]) {
         guard let name = person["name"] else {
             return
         }
  ---
         print("Hello \(name)!")
  ---
         guard let location = person["location"] else {
             print("I hope the weather is nice near you.")
             return
         }
  ---
         print("I hope the weather is nice in \(location).")
     }
  ---
  -> greet(person: ["name": "John"])
  <- Hello John!
  <- I hope the weather is nice near you.
  -> greet(person: ["name": "Jane", "location": "Cupertino"])
  <- Hello Jane!
  <- I hope the weather is nice in Cupertino.
  ```
-->

如果 `guard` 语句的条件被满足，则继续执行 `guard` 语句大括号后的代码。使用可选绑定作为条件的一部分来进行赋值的任何变量或常量都可用于 `guard` 语句出现后余下的代码块。

如果条件不被满足，在 `else` 分支上的代码就会被执行。这个分支必须转移控制以退出 `guard` 语句所在的代码段。它可以用控制转移语句如 `return`、`break`、`continue` 或者 `throw` 做这件事，或者调用一个不返回的方法或函数，例如 `fatalError()`。

相比于可以实现同样功能的 `if` 语句，按需使用 `guard` 语句会提升我们代码的可读性。它可以使你的代码连贯的被执行而不需要将它包在 `else` 块中，并且它允许你将处理违反条件的代码保留在条件旁边。

## 延迟执行的操作（Deferred Actions）

与 `if` 和 `while` 等控制流结构不同，`if` 和 `while` 允许你控制是否执行部分代码或执行代码的次数，而 `defer` 控制*何时*执行一段代码。你可以使用 `defer` 块编写代码，这些代码将在以后程序到达当前代码块的末尾时执行。例如：

```swift
var score = 1
if score < 10 {
    defer {
        print(score)
    }
    score += 5
}
// 输出 "6"
```

<!--
  - test: `defer-with-if`

  ```swifttest
  -> var score = 1
  -> if score < 10 {
  ->     defer {
  ->         print(score)
  ->     }
  ->     score += 5
  -> }
  <- 6
  ```
-->

在上面的示例中，`defer` 代码块内的代码在退出 `if` 语句作用域之前执行。首先，运行 `if` 语句中的代码，该语句将分数增加 5。然后，在退出 `if` 语句的作用域之前，将运行被延迟的代码，该代码会打印 `score`。

无论程序如何退出该范围，`defer` 内的代码始终运行。这包括提前退出函数、中断 `for` 循环或抛出错误等代码。此特性使得 `defer` 对于需要保证成对的操作非常有用（例如手动分配和释放内存、打开和关闭底层文件描述符以及在数据库中开始和结束事务），因为你可以在代码中将这两个操作写在一起。例如，下面的代码通过在代码块中加减 100 来临时奖励分数：

```swift
var score = 3
if score < 100 {
    score += 100
    defer {
        score -= 100
    }
    // 这里可以写其他使用分数和奖励的代码。
    print(score)
}
// 输出 "103"
```

<!--
  - test: `defer-paired-actions`

  ```swift
  -> var score = 3
  -> if score < 100 {
  ->     score += 100
  ->     defer {
  ->         score -= 100
  ->     }
  ->     // Other code that uses the score with its bonus goes here.
  ->     print(score)
  -> }
  <- 103
  ```
-->

如果在同一作用域中编写多个 `defer` 代码块，则先写的 `defer` 代码块中的代码后执行。

```swift
if score < 10 {
    defer {
        print(score)
    }
    defer {
        print("The score is:")
    }
    score += 5
}
// 输出 "The score is:"
// 输出 "6"
```

<!--
  - test: `defer-with-if`

  ```swifttest
  -> if score < 10 {
  ->     defer {
  ->         print(score)
  ->     }
  ->     defer {
  ->         print("The score is:")
  ->     }
  ->     score += 5
  -> }
  <- 6
  ```
-->

如果你的应用程序停止运行（例如发生了运行时错误或崩溃），则延迟的代码不会执行。但是，延迟代码会在抛出错误之后执行。有关将 `defer` 与错误处理结合使用的信息，请参阅 <doc:ErrorHandling#Specifying-Cleanup-Actions>。

## 检测 API 可用性

Swift 内置了对检查 API 可用性的支持，这可以确保你不会在给定的部署目标上不小心使用不可用的 API。

编译器使用 SDK 中的可用信息来验证我们的代码中使用的所有 API 在项目指定的部署目标上是否可用。如果我们尝试使用一个不可用的 API，Swift 会在编译时报错。

我们在 `if` 或 `guard` 语句中使用 *可用性条件 (availability condition)* 去有条件的执行一段代码，具体取决于你要使用的 API 在运行时是否可用。编译器使用从可用性条件语句中获取的信息去验证，在这个代码块中调用的 API 是否可用。

```swift
if #available(iOS 10, macOS 10.12, *) {
    // 在 iOS 使用 iOS 10 的 API, 在 macOS 使用 macOS 10.12 的 API
} else {
    // 使用先前版本的 iOS 和 macOS 的 API
}
```

<!--
  - test: `availability`

  ```swifttest
  -> if #available(iOS 10, macOS 10.12, *) {
         // Use iOS 10 APIs on iOS, and use macOS 10.12 APIs on macOS
     } else {
         // Fall back to earlier iOS and macOS APIs
     }
  ```
-->

以上可用性条件指定，`if` 语句的代码块仅仅在 iOS 10 或 macOS 10.12 及更高版本才运行。最后一个参数，`*`，是必须的，用于指定在所有其它平台中，如果版本号高于你的设备指定的最低版本，`if` 语句的代码块将会运行。

在它一般的形式中，可用性条件使用了一个平台名字和版本的列表。平台名字可以是 `iOS`，`macOS`，`watchOS`，`tvOS`，和 `visionOS` ---请访问 <doc:Attributes#Declaration-Attributes> 来获取完整列表。除了指定像 iOS 8 或 macOS 10.10 的大版本号，也可以指定像 iOS 11.2.6 以及 macOS 10.13.3 的小版本号。

```swift
if #available(<#platform name#> <#version#>, <#...#>, *) {
    <#statements to execute if the APIs are available#>
} else {
    <#fallback statements to execute if the APIs are unavailable#>
}
```

当你在 `guard` 语句中使用可用性条件时，它将细化用于该代码块中其余代码的可用性信息。

```swift
@available(macOS 10.12, *)
struct ColorPreference {
    var bestColor = "blue"
}

func chooseBestColor() -> String {
    guard #available(macOS 10.12, *) else {
       return "gray"
    }
    let colors = ColorPreference()
    return colors.bestColor
}
```

<!--
  - test: `guard-with-pound-available`

  ```swifttest
  -> @available(macOS 10.12, *)
  -> struct ColorPreference {
         var bestColor = "blue"
     }
  ---
  -> func chooseBestColor() -> String {
        guard #available(macOS 10.12, *) else {
            return "gray"
        }
        let colors = ColorPreference()
        return colors.bestColor
     }
  >> print(chooseBestColor())
  << blue
  ```
-->

在上面的例子中，结构体 `ColorPreference` 需要 macOS 10.12 或更高的版本。函数 `ChooseBestColor()` 先以一个可用性防护开头，若平台版本过低无法运行 `ColorPreference` 时，将回退到总是可用的行为上。而在 `guard` 语句后，你将能够使用 macOS 10.12 或更高版本的API。

除了 `#available` 以外， Swift 还支持通过不可用性条件来进行不可用性检查。举例如下，两种检查都能实现同样的效果：

```swift
if #available(iOS 10, *) {
} else {
    // 回退代码
}

if #unavailable(iOS 10) {
    // 回退代码
}
```

<!--
  - test: `availability-and-unavailability`

  ```swifttest
  -> if #available(iOS 10, *) {
     } else {
        // Fallback code
     }
  ---
  -> if #unavailable(iOS 10) {
        // Fallback code
     }
  ```
-->

若可用性检查只提供了回滚代码，改用 `#unavailable` 能提升程序整体的可读性。

<!--
  FIXME
  Not a general purpose condition; can't combine with &&, etc.
  You can use it with if-let, and other Boolean conditions, using a comma
-->

> 测试版软件:
>
> 本文档包含有关正在开发的 API 或技术的初步信息。此信息可能会发生变化，根据本文档开发的软件应与最终版本的操作系统一起进行测试。
>
> 进一步了解如何使用 [Apple 的 Beta 版软件](https://developer.apple.com/support/beta-software/).

<!--
This source file is part of the Swift.org open source project

Copyright (c) 2014 - 2022 Apple Inc. and the Swift project authors
Licensed under Apache License v2.0 with Runtime Library Exception

See https://swift.org/LICENSE.txt for license information
See https://swift.org/CONTRIBUTORS.txt for the list of Swift project authors
-->
