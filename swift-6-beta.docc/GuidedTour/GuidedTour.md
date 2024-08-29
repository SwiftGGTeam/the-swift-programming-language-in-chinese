# Swift 导览

探索 Swift 的特性和语法。

按照传统，编程语言教程的第一个程序应该是在屏幕上打印出“Hello, world!”。在 Swift 中，这可以用一行代码实现：

<!--
  K&R uses “hello, world”.
  It seems worth breaking with tradition to use proper casing.
-->

```swift
print("Hello, world!")
// 输出 "Hello, world!"
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> print("Hello, world!")
  <- Hello, world!
  ```
-->

如果你了解其他编程语言，那么你应该很熟悉这种写法——在 Swift 中，这行代码就是一个完整的程序。你不需要为了输出文本或处理字符串而导入一个单独的库。全局作用域中的代码会被当做程序的入口点，因此你不需要 `main()` 函数。你也不需要在每条语句的末尾添加分号。

本导览会通过一系列编程例子来提供给你足够的信息，让你能够开始使用 Swift 编程。如果你有什么不理解的地方也不要担心——本导览中介绍的所有内容都会在本书的后续章节中进行详细地讲解。

## 简单值

使用 `let` 来声明常量，使用 `var` 来声明变量。常量的值不需要在编译时确定，但是你必须且只能为它赋值一次。这意味着你可以用常量来命名那些只需确定一次但要在多处使用的值。

```swift
var myVariable = 42
myVariable = 50
let myConstant = 42
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> var myVariable = 42
  -> myVariable = 50
  -> let myConstant = 42
  ```
-->

常量或变量的类型必须与要赋予它的值的类型一致。不过，你不必总是显式地写出类型。在声明常量或变量时提供一个值，编译器会自动推断出它的类型。在上面的例子中，因为初始值是整数，所以编译器推断出 `myVariable` 是整数类型。

如果初始值无法提供足够的信息（或者没有初始值），那你需要在变量后面声明类型，用冒号分隔。

```swift
let implicitInteger = 70
let implicitDouble = 70.0
let explicitDouble: Double = 70
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> let implicitInteger = 70
  -> let implicitDouble = 70.0
  -> let explicitDouble: Double = 70
  ```
-->

> 练习: 创建一个常量，显式指定类型为 `Float`，并指定值为 4。

值不会被隐式转换为另一种类型。如果你需要把一个值转换成其他类型，需要显式地创建所需类型的实例。

```swift
let label = "The width is "
let width = 94
let widthLabel = label + String(width)
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> let label = "The width is "
  -> let width = 94
  -> let widthLabel = label + String(width)
  >> print(widthLabel)
  << The width is 94
  ```
-->

> 练习: 尝试移除最后一行中的 `String` 类型转换。会显示什么错误？

<!--
  TODO: Discuss with Core Writers ---
  are these experiments that make you familiar with errors
  helping you learn something?
-->

有一种更简单的方法可以在字符串中包含值：将值写在括号中，并在括号前加上反斜杠（`\`）。例如：

```swift
let apples = 3
let oranges = 5
let appleSummary = "I have \(apples) apples."
let fruitSummary = "I have \(apples + oranges) pieces of fruit."
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> let apples = 3
  -> let oranges = 5
  -> let appleSummary = "I have \(apples) apples."
  >> print(appleSummary)
  << I have 3 apples.
  -> let fruitSummary = "I have \(apples + oranges) pieces of fruit."
  >> print(fruitSummary)
  << I have 8 pieces of fruit.
  ```
-->

> 练习: 使用 `\()` 将一个浮点计算包含在字符串中，并在一句问候语中包含某人的名字。

对于占用多行的字符串，使用三个双引号（`"""`）来表示。每行开头的缩进只要与结尾引号的缩进相匹配，都会被移除。例如：

```swift
let quotation = """
        Even though there's whitespace to the left,
        the actual lines aren't indented.
            Except for this line.
        Double quotes (") can appear without being escaped.

        I still have \(apples + oranges) pieces of fruit.
        """
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> let quotation = """
     I said "I have \(apples) apples."
     And then I said "I have \(apples + oranges) pieces of fruit."
     """
  ```
-->

<!--
  Can't show an example of indentation in the triple-quoted string above.
  <rdar://problem/49129068> Swift code formatting damages indentation
-->

使用方括号（`[]`）来创建数组和字典，并通过在方括号内写上索引（index）或键（key）来访问它们的元素。最后一个元素后面允许有个逗号。

<!--
  REFERENCE
  The list of fruits comes from the colors that the original iMac came in,
  following the initial launch of the iMac in Bondi Blue, ordered by SKU --
  which also lines up with the order they appeared in ads:

       M7389LL/A (266 MHz Strawberry)
       M7392LL/A (266 MHz Lime)
       M7391LL/A (266 MHz Tangerine)
       M7390LL/A (266 MHz Grape)
       M7345LL/A (266 MHz Blueberry)

       M7441LL/A (333 MHz Strawberry)
       M7444LL/A (333 MHz Lime)
       M7443LL/A (333 MHz Tangerine)
       M7442LL/A (333 MHz Grape)
       M7440LL/A (333 MHz Blueberry)
-->

<!--
  REFERENCE
  Occupations is a reference to Firefly,
  specifically to Mal's joke about Jayne's job on the ship.

  Can't find the specific episode,
  but it shows up in several lists of Firefly "best of" quotes:

  Mal: Jayne, you will keep a civil tongue in that mouth, or I will sew it shut.
       Is there an understanding between us?
  Jayne: You don't pay me to talk pretty. [...]
  Mal: Walk away from this table. Right now.
  [Jayne loads his plate with food and leaves]
  Simon: What *do* you pay him for?
  Mal: What?
  Simon: I was just wondering what his job is - on the ship.
  Mal: Public relations.
-->

```swift
var fruits = ["strawberries", "limes", "tangerines"]
fruits[1] = "grapes"

var occupations = [
    "Malcolm": "Captain",
    "Kaylee": "Mechanic",
 ]
occupations["Jayne"] = "Public Relations"
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> var fruits = ["strawberries", "limes", "tangerines"]
  -> fruits[1] = "grapes"
  ---
  -> var occupations = [
         "Malcolm": "Captain",
         "Kaylee": "Mechanic",
      ]
  -> occupations["Jayne"] = "Public Relations"
  ```
-->

<!-- Apple Books screenshot begins here. -->

数组在添加元素时会自动变大。

```swift
fruits.append("blueberries")
print(fruits)
// 输出 "["strawberries", "grapes", "tangerines", "blueberries"]"
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> fruits.append("blueberries")
  -> print(fruits)
  <- ["strawberries", "grapes", "tangerines", "blueberries"]
  ```
-->

你也可以使用方括号来表示空数组或空字典。对于数组，使用 `[]`；对于字典，使用 `[:]`。

```swift
fruits = []
occupations = [:]
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> fruits = []
  -> occupations = [:]
  ```
-->

如果你要将一个空数组或空字典赋值给一个新变量，或者赋值到没有任何类型信息的地方，那么你需要显式指定类型。

```swift
let emptyArray: [String] = []
let emptyDictionary: [String: Float] = [:]
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> let emptyArray: [String] = []
  -> let emptyDictionary: [String: Float] = [:]
  ---
  -> let anotherEmptyArray = [String]()
  -> let emptyDictionary = [String: Float]()
  ```
-->

## 控制流

使用 `if` 和 `switch` 来创建条件语句，使用 `for`-`in`、`while` 和 `repeat`-`while` 来创建循环。包裹条件或循环变量的圆括号是可选的，但包裹代码块的花括号是必须的。

```swift
let individualScores = [75, 43, 103, 87, 12]
var teamScore = 0
for score in individualScores {
    if score > 50 {
        teamScore += 3
    } else {
        teamScore += 1
    }
}
print(teamScore)
// 输出 "11"
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> let individualScores = [75, 43, 103, 87, 12]
  -> var teamScore = 0
  -> for score in individualScores {
         if score > 50 {
             teamScore += 3
         } else {
             teamScore += 1
         }
     }
  -> print(teamScore)
  <- 11
  ```
-->

<!--
  REFERENCE
  Jelly babies are a candy/sweet that was closely associated
  with past incarnations of the Doctor in Dr. Who.
-->

<!--
  -> let haveJellyBabies = true
  -> if haveJellyBabies {
     }
  << Would you like a jelly baby?
-->

在 `if` 语句中，条件必须是一个布尔表达式——这意味着像 `if score { ... }` 这样的代码是错误的，而不是隐式地将 `score` 与零进行比较。

你可以在赋值操作符（`=`）或 `return` 之后使用 `if` 或 `switch`，以根据条件选择一个值。

```swift
let scoreDecoration = if teamScore > 10 {
    "🎉"
} else {
    ""
}
print("Score:", teamScore, scoreDecoration)
// 输出 "Score: 11 🎉"
```

你可以将 `if` 和 `let` 结合使用，来处理值可能缺失的情况。这些值用可选值来表示。一个可选值要么包含一个值，要么包含 `nil` 来表示值缺失。在一个值的类型后面加一个问号（`?`）来标记该值是可选值。

<!-- Apple Books screenshot ends here. -->

<!--
  REFERENCE
  John Appleseed is a stock Apple fake name,
  going back at least to the contacts database
  that ships with the SDK in the simulator.
-->

```swift
var optionalString: String? = "Hello"
print(optionalString == nil)
// 输出 "false"

var optionalName: String? = "John Appleseed"
var greeting = "Hello!"
if let name = optionalName {
    greeting = "Hello, \(name)"
}
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> var optionalString: String? = "Hello"
  -> print(optionalString == nil)
  <- false
  ---
  -> var optionalName: String? = "John Appleseed"
  -> var greeting = "Hello!"
  -> if let name = optionalName {
         greeting = "Hello, \(name)"
     }
  >> print(greeting)
  << Hello, John Appleseed
  ```
-->

> 练习: 将 `optionalName` 的值设置为 `nil`，`greeting` 会是什么？添加一个 `else` 分支，当 `optionalName` 是 `nil` 时，给 `greeting` 赋一个不同的值。

如果可选值是 `nil`，条件会判断为 `false`，花括号中的代码将被跳过。如果不是 `nil`，会将值解包并赋给 `let` 后面的常量，这样代码块中就可以使用这个解包后的值了。

另一种处理可选值的方法是使用 `??` 运算符提供一个默认值。如果可选值缺失的话，则使用默认值来代替。

```swift
let nickname: String? = nil
let fullName: String = "John Appleseed"
let informalGreeting = "Hi \(nickname ?? fullName)"
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> let nickname: String? = nil
  -> let fullName: String = "John Appleseed"
  -> let informalGreeting = "Hi \(nickname ?? fullName)"
  >> print(informalGreeting)
  << Hi John Appleseed
  ```
-->

你可以使用更简洁的写法来解包一个值，解包后的值用同样的名字来表示。

```swift
if let nickname {
    print("Hey, \(nickname)")
}
// 不会输出任何东西，因为 nickname 为 nil 。
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> if let nickname {
         print("Hey, \(nickname)")
     }
  ```
-->

`switch` 语句支持任意类型的数据和多种比较操作——不仅限于整数和等值比较。

<!--
  REFERENCE
  The vegetables and foods made from vegetables
  were just a convenient choice for a switch statement.
  They have various properties
  and fit with the apples & oranges used in an earlier example.
-->

```swift
let vegetable = "red pepper"
switch vegetable {
case "celery":
    print("Add some raisins and make ants on a log.")
case "cucumber", "watercress":
    print("That would make a good tea sandwich.")
case let x where x.hasSuffix("pepper"):
    print("Is it a spicy \(x)?")
default:
    print("Everything tastes good in soup.")
}
// 输出 "Is it a spicy red pepper?"
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> let vegetable = "red pepper"
  -> switch vegetable {
         case "celery":
             print("Add some raisins and make ants on a log.")
         case "cucumber", "watercress":
             print("That would make a good tea sandwich.")
         case let x where x.hasSuffix("pepper"):
             print("Is it a spicy \(x)?")
         default:
             print("Everything tastes good in soup.")
     }
  <- Is it a spicy red pepper?
  ```
-->

> 练习: 删除 `default` 分支，会显示什么错误？

注意 `let` 在上述例子的匹配模式中是如何使用的，它将匹配到的值赋给常量 `x`。

运行 `switch` 中匹配到的 `case` 语句之后，程序会退出 `switch` 语句，并不会继续向下运行，所以不需要在每个子句结尾写 `break`。

<!--
  Omitting mention of "fallthrough" keyword.
  It's in the guide/reference if you need it.
-->

你可以使用 `for-in` 来遍历字典，使用一对变量来表示每个键值对。字典是一个无序的集合，所以它们的键和值会以任意顺序遍历完。

<!--
  REFERENCE
  Prime, square, and Fibonacci numbers
  are just convenient sets of numbers
  that many developers are already familiar with
  that we can use for some simple math.
-->

```swift
let interestingNumbers = [
    "Prime": [2, 3, 5, 7, 11, 13],
    "Fibonacci": [1, 1, 2, 3, 5, 8],
    "Square": [1, 4, 9, 16, 25],
]
var largest = 0
for (_, numbers) in interestingNumbers {
    for number in numbers {
        if number > largest {
            largest = number
        }
    }
}
print(largest)
// 输出 "25"
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> let interestingNumbers = [
         "Prime": [2, 3, 5, 7, 11, 13],
         "Fibonacci": [1, 1, 2, 3, 5, 8],
         "Square": [1, 4, 9, 16, 25],
     ]
  -> var largest = 0
  -> for (_, numbers) in interestingNumbers {
         for number in numbers {
             if number > largest {
                 largest = number
             }
         }
     }
  -> print(largest)
  <- 25
  ```
-->

> 练习: 将 `_` 替换成变量名，以便记录最大的数字是属于哪一类的。

使用 `while` 来重复运行一段代码，直到条件改变。循环条件也可以放在末尾，以确保至少循环一次。

<!--
  REFERENCE
  This example is rather skeletal -- m and n are pretty boring.
  I couldn't come up with anything suitably interesting at the time though,
  so I just went ahead and used this.
-->

```swift
var n = 2
while n < 100 {
    n *= 2
}
print(n)
// 输出 "128"

var m = 2
repeat {
    m *= 2
} while m < 100
print(m)
// 输出 "128"
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> var n = 2
  -> while n < 100 {
         n *= 2
     }
  -> print(n)
  <- 128
  ---
  -> var m = 2
  -> repeat {
         m *= 2
     } while m < 100
  -> print(m)
  <- 128
  ```
-->

> 练习: 将条件从 `m < 100` 改为 `m < 0`，以观察 `while` 和 `repeat-while` 在循环条件一开始就为假时的区别。

你可以在循环中使用 `..<` 来创建一个索引范围。

```swift
var total = 0
for i in 0..<4 {
    total += i
}
print(total)
// 输出 "6"
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> var total = 0
  -> for i in 0..<4 {
         total += i
     }
  -> print(total)
  <- 6
  ```
-->

使用 `..<` 创建不包含上限值的范围，使用 `...` 创建包含上限值的范围。

## 函数和闭包

使用 `func` 来声明一个函数。在函数名后面加上括号并传入参数列表来调用函数。使用 `->` 将参数名称和类型与函数的返回类型分隔开。

<!--
  REFERENCE
  Bob is used as just a generic name,
  but also a callout to Alex's dad.
  Tuesday is used on the assumption that lots of folks would be reading
  on the Tuesday after the WWDC keynote.
-->

```swift
func greet(person: String, day: String) -> String {
    return "Hello \(person), today is \(day)."
}
greet(person: "Bob", day: "Tuesday")
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> func greet(person: String, day: String) -> String {
         return "Hello \(person), today is \(day)."
     }
  >> let greetBob =
  -> greet(person: "Bob", day: "Tuesday")
  >> print(greetBob)
  << Hello Bob, today is Tuesday.
  ```
-->

> 练习: 删除参数 `day`，再添加一个参数，在欢迎语中包含今天的特价菜。

默认情况下，函数使用参数名作为参数的标签。可以在参数名之前自定义参数标签，或者使用 `_` 来表示不使用参数标签。

```swift
func greet(_ person: String, on day: String) -> String {
    return "Hello \(person), today is \(day)."
}
greet("John", on: "Wednesday")
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> func greet(_ person: String, on day: String) -> String {
         return "Hello \(person), today is \(day)."
     }
  >> let greetJohn =
  -> greet("John", on: "Wednesday")
  >> print(greetJohn)
  << Hello John, today is Wednesday.
  ```
-->

使用元组来创建复合值——例如，用于从函数中返回多个值。元组的元素可以通过名称或编号来引用。

<!--
  REFERENCE
  Min, max, and sum are convenient for this example
  because they're all simple operations
  that are performed on the same kind of data.
  This gives the function a reason to return a tuple.
-->

```swift
func calculateStatistics(scores: [Int]) -> (min: Int, max: Int, sum: Int) {
    var min = scores[0]
    var max = scores[0]
    var sum = 0

    for score in scores {
        if score > max {
            max = score
        } else if score < min {
            min = score
        }
        sum += score
    }

    return (min, max, sum)
}
let statistics = calculateStatistics(scores: [5, 3, 100, 3, 9])
print(statistics.sum)
// 输出 "120"
print(statistics.2)
// 输出 "120"
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> func calculateStatistics(scores: [Int]) -> (min: Int, max: Int, sum: Int) {
         var min = scores[0]
         var max = scores[0]
         var sum = 0

         for score in scores {
             if score > max {
                 max = score
             } else if score < min {
                 min = score
             }
             sum += score
         }

         return (min, max, sum)
     }
  -> let statistics = calculateStatistics(scores: [5, 3, 100, 3, 9])
  >> print(statistics)
  << (min: 3, max: 100, sum: 120)
  -> print(statistics.sum)
  <- 120
  -> print(statistics.2)
  <- 120
  ```
-->

函数可以嵌套。嵌套函数可以访问外部函数中声明的变量。你可以使用嵌套函数来组织长或复杂的函数代码。

```swift
func returnFifteen() -> Int {
    var y = 10
    func add() {
        y += 5
    }
    add()
    return y
}
returnFifteen()
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> func returnFifteen() -> Int {
         var y = 10
         func add() {
             y += 5
         }
         add()
         return y
     }
  >> let fifteen =
  -> returnFifteen()
  >> print(fifteen)
  << 15
  ```
-->

函数是一等类型。这意味着函数可以作为另一个函数的返回值。

```swift
func makeIncrementer() -> ((Int) -> Int) {
    func addOne(number: Int) -> Int {
        return 1 + number
    }
    return addOne
}
var increment = makeIncrementer()
increment(7)
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> func makeIncrementer() -> ((Int) -> Int) {
         func addOne(number: Int) -> Int {
             return 1 + number
         }
         return addOne
     }
  -> var increment = makeIncrementer()
  >> let incrementResult =
  -> increment(7)
  >> print(incrementResult)
  << 8
  ```
-->

函数可以将另一个函数作为参数传入。

```swift
func hasAnyMatches(list: [Int], condition: (Int) -> Bool) -> Bool {
    for item in list {
        if condition(item) {
            return true
        }
    }
    return false
}
func lessThanTen(number: Int) -> Bool {
    return number < 10
}
var numbers = [20, 19, 7, 12]
hasAnyMatches(list: numbers, condition: lessThanTen)
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> func hasAnyMatches(list: [Int], condition: (Int) -> Bool) -> Bool {
         for item in list {
             if condition(item) {
                 return true
             }
         }
         return false
     }
  -> func lessThanTen(number: Int) -> Bool {
         return number < 10
     }
  -> var numbers = [20, 19, 7, 12]
  >> let anyMatches =
  -> hasAnyMatches(list: numbers, condition: lessThanTen)
  >> print(anyMatches)
  << true
  ```
-->

函数实际上是一种特殊的闭包：它是能在之后被调用的代码块。闭包中的代码能访问闭包作用域中的变量和函数，即使闭包在执行时处于不同的作用域中——你在嵌套函数的例子中已经见过这种情况。你可以使用（`{}`）来创建一个匿名闭包。使用 `in` 将参数和返回类型与代码主体分隔开。

```swift
numbers.map({ (number: Int) -> Int in
    let result = 3 * number
    return result
})
```

<!--
  - test: `guided-tour`

  ```swifttest
  >> let numbersMap =
  -> numbers.map({ (number: Int) -> Int in
         let result = 3 * number
         return result
     })
  >> print(numbersMap)
  << [60, 57, 21, 36]
  ```
-->

> 练习: 重写闭包，使其对所有奇数返回零。

你有多种方法可以更简洁地编写闭包。当闭包的类型已知时，比如作为代理的回调函数，你可以省略参数类型、返回类型，或者两者都省略。对于单个语句的闭包，它会隐式返回该语句的值。

```swift
let mappedNumbers = numbers.map({ number in 3 * number })
print(mappedNumbers)
// 输出 "[60, 57, 21, 36]"
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> let mappedNumbers = numbers.map({ number in 3 * number })
  -> print(mappedNumbers)
  <- [60, 57, 21, 36]
  ```
-->

你可以通过编号而不是名称来引用参数——这种方式在非常简短的闭包中特别有用。如果闭包是函数的最后一个参数，它可以直接写在括号后面。当闭包是函数的唯一参数时，甚至可以省略括号。

```swift
let sortedNumbers = numbers.sorted { $0 > $1 }
print(sortedNumbers)
// 输出 "[20, 19, 12, 7]"
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> let sortedNumbers = numbers.sorted { $0 > $1 }
  -> print(sortedNumbers)
  <- [20, 19, 12, 7]
  ```
-->

<!--
  Called sorted() on a variable rather than a literal to work around an issue in Xcode.  See <rdar://17540974>.
-->

<!--
  Omitted sort(foo, <) because it often causes a spurious warning in Xcode.  See <rdar://17047529>.
-->

<!--
  Omitted custom operators as "advanced" topics.
-->

## 对象和类

使用 `class` 和类名来创建一个类。类中属性的声明方式与常量或变量相同，只不过是在类的上下文中。同样，方法的声明方式也与函数相同。

<!--
  REFERENCE
  Shapes are used as the example object
  because they're familiar and they have a sense of properties
  and a sense of inheritance/subcategorization.
  They're not a perfect fit --
  they might be better off modeled as structures --
  but that wouldn't let them inherit behavior.
-->

```swift
class Shape {
    var numberOfSides = 0
    func simpleDescription() -> String {
        return "A shape with \(numberOfSides) sides."
    }
}
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> class Shape {
         var numberOfSides = 0
         func simpleDescription() -> String {
             return "A shape with \(numberOfSides) sides."
         }
     }
  >> print(Shape().simpleDescription())
  << A shape with 0 sides.
  ```
-->

> 练习: 使用 `let` 添加一个常量属性，再添加一个接收一个参数的方法。

通过在类名后加括号来创建一个类的实例。使用点语法来访问该实例的属性和方法。

```swift
var shape = Shape()
shape.numberOfSides = 7
var shapeDescription = shape.simpleDescription()
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> var shape = Shape()
  -> shape.numberOfSides = 7
  -> var shapeDescription = shape.simpleDescription()
  >> print(shapeDescription)
  << A shape with 7 sides.
  ```
-->

这个版本的 `Shape` 类缺少了一个重要的部分：用于在创建实例时初始化类的构造器。使用 `init` 来创建一个构造器。

```swift
class NamedShape {
    var numberOfSides: Int = 0
    var name: String

    init(name: String) {
       self.name = name
    }

    func simpleDescription() -> String {
       return "A shape with \(numberOfSides) sides."
    }
}
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> class NamedShape {
         var numberOfSides: Int = 0
         var name: String
  ---
         init(name: String) {
            self.name = name
         }
  ---
         func simpleDescription() -> String {
            return "A shape with \(numberOfSides) sides."
         }
     }
  >> print(NamedShape(name: "test name").name)
  << test name
  >> print(NamedShape(name: "test name").simpleDescription())
  << A shape with 0 sides.
  ```
-->

注意 `self` 是如何被用来区分 `name` 属性和构造器中的 `name` 参数。在创建类的实例时，像函数调用传入参数那样给构造器传入参数。每个属性都必须被赋值——要么在声明时赋值（如 `numberOfSides`），要么在构造器中赋值（如 `name`）。

如果需要在对象被释放之前执行一些清理操作，可以使用 `deinit` 来创建一个析构函数。

子类的定义方法是在它们的类名后面加上父类的名字，用冒号分割。创建类的时候并不需要一个标准的根类，因此你可以根据需要选择是否指定父类。

在子类中重写父类的方法时需要使用 `override` 进行标记——如果不小心重写了方法但没有使用 `override`，编译器会报错。如果使用了 `override`，但实际上没有重写父类的任何方法，编译器也会检测到并报错。

```swift
class Square: NamedShape {
    var sideLength: Double

    init(sideLength: Double, name: String) {
        self.sideLength = sideLength
        super.init(name: name)
        numberOfSides = 4
    }

    func area() -> Double {
        return sideLength * sideLength
    }

    override func simpleDescription() -> String {
        return "A square with sides of length \(sideLength)."
    }
}
let test = Square(sideLength: 5.2, name: "my test square")
test.area()
test.simpleDescription()
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> class Square: NamedShape {
         var sideLength: Double
  ---
         init(sideLength: Double, name: String) {
             self.sideLength = sideLength
             super.init(name: name)
             numberOfSides = 4
         }
  ---
         func area() -> Double {
             return sideLength * sideLength
         }
  ---
         override func simpleDescription() -> String {
             return "A square with sides of length \(sideLength)."
         }
     }
  -> let test = Square(sideLength: 5.2, name: "my test square")
  >> let testArea =
  -> test.area()
  >> print(testArea)
  << 27.040000000000003
  >> let testDesc =
  -> test.simpleDescription()
  >> print(testDesc)
  << A square with sides of length 5.2.
  ```
-->

> 练习: 创建 `NamedShape` 的另一个子类 `Circle`，它的构造器接受半径和名称作为参数。在 `Circle` 类中实现 `area()` 和 `simpleDescription()` 方法。

除了简单的存储属性，属性还可以有 getter 和 setter 方法。

```swift
class EquilateralTriangle: NamedShape {
    var sideLength: Double = 0.0

    init(sideLength: Double, name: String) {
        self.sideLength = sideLength
        super.init(name: name)
        numberOfSides = 3
    }

    var perimeter: Double {
        get {
             return 3.0 * sideLength
        }
        set {
            sideLength = newValue / 3.0
        }
    }

    override func simpleDescription() -> String {
        return "An equilateral triangle with sides of length \(sideLength)."
    }
}
var triangle = EquilateralTriangle(sideLength: 3.1, name: "a triangle")
print(triangle.perimeter)
// 输出 "9.3"
triangle.perimeter = 9.9
print(triangle.sideLength)
// 输出 "3.3000000000000003"
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> class EquilateralTriangle: NamedShape {
         var sideLength: Double = 0.0
  ---
         init(sideLength: Double, name: String) {
             self.sideLength = sideLength
             super.init(name: name)
             numberOfSides = 3
         }
  ---
         var perimeter: Double {
             get {
                  return 3.0 * sideLength
             }
             set {
                 sideLength = newValue / 3.0
             }
         }
  ---
         override func simpleDescription() -> String {
             return "An equilateral triangle with sides of length \(sideLength)."
         }
     }
  -> var triangle = EquilateralTriangle(sideLength: 3.1, name: "a triangle")
  -> print(triangle.perimeter)
  <- 9.3
  -> triangle.perimeter = 9.9
  -> print(triangle.sideLength)
  <- 3.3000000000000003
  ```
-->

在 `perimeter` 的 setter 中，新值有一个默认的名字 `newValue`。你可以在 `set` 后的括号中显式地指定一个名字。

注意 `EquilateralTriangle` 类的构造器执行了三步：

1. 设置子类中声明的属性值。
2. 调用父类的构造器。
3. 修改父类中定义的属性值。其他的工作比如调用方法、getters 和 setters 也可以在这个阶段完成。

如果你不需要计算属性，但仍然需要在设置新值前后执行一些代码，可以使用 `willSet` 和 `didSet`。这些代码会在属性值发生变化时运行，但不包含构造器中发生值改变的情况。比如，下面的类确保其三角形的边长始终与正方形的边长相同。

<!--
  This triangle + square example could use improvement.
  The goal is to show why you would want to use willSet,
  but it was constrained by the fact that
  we're working in the context of geometric shapes.
-->

```swift
class TriangleAndSquare {
    var triangle: EquilateralTriangle {
        willSet {
            square.sideLength = newValue.sideLength
        }
    }
    var square: Square {
        willSet {
            triangle.sideLength = newValue.sideLength
        }
    }
    init(size: Double, name: String) {
        square = Square(sideLength: size, name: name)
        triangle = EquilateralTriangle(sideLength: size, name: name)
    }
}
var triangleAndSquare = TriangleAndSquare(size: 10, name: "another test shape")
print(triangleAndSquare.square.sideLength)
// 输出 "10.0"
print(triangleAndSquare.triangle.sideLength)
// 输出 "10.0"
triangleAndSquare.square = Square(sideLength: 50, name: "larger square")
print(triangleAndSquare.triangle.sideLength)
// 输出 "50.0"
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> class TriangleAndSquare {
         var triangle: EquilateralTriangle {
             willSet {
                 square.sideLength = newValue.sideLength
             }
         }
         var square: Square {
             willSet {
                 triangle.sideLength = newValue.sideLength
             }
         }
         init(size: Double, name: String) {
             square = Square(sideLength: size, name: name)
             triangle = EquilateralTriangle(sideLength: size, name: name)
         }
     }
  -> var triangleAndSquare = TriangleAndSquare(size: 10, name: "another test shape")
  -> print(triangleAndSquare.square.sideLength)
  <- 10.0
  -> print(triangleAndSquare.triangle.sideLength)
  <- 10.0
  -> triangleAndSquare.square = Square(sideLength: 50, name: "larger square")
  -> print(triangleAndSquare.triangle.sideLength)
  <- 50.0
  ```
-->

<!--
  Grammatically, these clauses are general to variables.
  Not sure what it would look like
  (or if it's even allowed)
  to use them outside a class or a struct.
-->

处理可选值时，可以在方法、属性或下标操作前加上 `?`。如果 `?` 前的值是 `nil`，那么 `?` 后的所有操作都会被忽略，整个表达式的结果为 `nil`。否则，可选值会被解包，`?` 后的操作会作用于解包后的值。在这两种情况下，整个表达式的值仍然是一个可选值。

```swift
let optionalSquare: Square? = Square(sideLength: 2.5, name: "optional square")
let sideLength = optionalSquare?.sideLength
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> let optionalSquare: Square? = Square(sideLength: 2.5, name: "optional square")
  -> let sideLength = optionalSquare?.sideLength
  ```
-->

## 枚举和结构体

使用 `enum` 来创建枚举。与类和其他所有命名类型一样，枚举也可以包含方法。

<!--
  REFERENCE
  Playing cards work pretty well to demonstrate enumerations
  because they have two aspects, suit and rank,
  both of which come from a small finite set.
  The deck used here is probably the most common,
  at least through most of Europe and the Americas,
  but there are many other regional variations.
-->

```swift
enum Rank: Int {
    case ace = 1
    case two, three, four, five, six, seven, eight, nine, ten
    case jack, queen, king

    func simpleDescription() -> String {
        switch self {
        case .ace:
            return "ace"
        case .jack:
            return "jack"
        case .queen:
            return "queen"
        case .king:
            return "king"
        default:
            return String(self.rawValue)
        }
    }
}
let ace = Rank.ace
let aceRawValue = ace.rawValue
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> enum Rank: Int {
         case ace = 1
         case two, three, four, five, six, seven, eight, nine, ten
         case jack, queen, king
  ---
         func simpleDescription() -> String {
             switch self {
                 case .ace:
                     return "ace"
                 case .jack:
                     return "jack"
                 case .queen:
                     return "queen"
                 case .king:
                     return "king"
                 default:
                     return String(self.rawValue)
             }
         }
     }
  -> let ace = Rank.ace
  -> let aceRawValue = ace.rawValue
  >> print(aceRawValue)
  << 1
  ```
-->

> 练习: 写一个函数，通过比较它们的原始值来比较两个 `Rank` 值。

默认情况下，Swift 按照从 0 开始每次加 1 的方式为原始值进行赋值，不过你可以通过显式赋值进行改变。在上面的例子中，`Ace` 被显式赋值为 `1`，剩下的原始值会按照顺序进行赋值。你也可以使用字符串或者浮点数作为枚举的原始值。使用 `rawValue` 属性来访问一个枚举成员的原始值。

要根据原始值创建枚举实例，可以使用 `init?(rawValue:)` 构造器。它会返回与该原始值匹配的枚举成员，如果没有匹配的 `Rank` 则返回 `nil`。

```swift
if let convertedRank = Rank(rawValue: 3) {
    let threeDescription = convertedRank.simpleDescription()
}
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> if let convertedRank = Rank(rawValue: 3) {
         let threeDescription = convertedRank.simpleDescription()
  >> print(threeDescription)
  << 3
  -> }
  ```
-->

枚举值是实际值，并不是原始值的另一种表达方法。实际上，如果原始值没有意义，你就不需要提供原始值。

```swift
enum Suit {
    case spades, hearts, diamonds, clubs

    func simpleDescription() -> String {
        switch self {
        case .spades:
            return "spades"
        case .hearts:
            return "hearts"
        case .diamonds:
            return "diamonds"
        case .clubs:
            return "clubs"
        }
    }
}
let hearts = Suit.hearts
let heartsDescription = hearts.simpleDescription()
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> enum Suit {
         case spades, hearts, diamonds, clubs
  ---
         func simpleDescription() -> String {
             switch self {
                 case .spades:
                     return "spades"
                 case .hearts:
                     return "hearts"
                 case .diamonds:
                     return "diamonds"
                 case .clubs:
                     return "clubs"
             }
         }
     }
  -> let hearts = Suit.hearts
  -> let heartsDescription = hearts.simpleDescription()
  >> print(heartsDescription)
  << hearts
  ```
-->

> 练习: 给 `Suit` 添加一个 `color()` 方法，对 spades 和 clubs 返回“black”，对 hearts 和 diamonds 返回“red”。

<!--
  Suits are in Bridge order, which matches Unicode order.
  In other games, orders differ.
  Wikipedia lists a good half dozen orders.
-->

注意在上面的例子中用了两种方式引用 `hearts` 枚举成员：给 `hearts` 常量赋值时，由于没有显式指定常量的类型，因此使用了枚举成员的全名 `Suit.hearts` 来引用。在 `switch` 语句中，由于 `self` 的类型已经被确定为 `Suit`，因此枚举成员可以使用缩写 `.hearts` 来引用。只要值的类型已经明确就可以使用缩写。

如果枚举成员有原始值，那么这些值是在声明的时候就已经确定了，这意味着每个枚举实例的枚举成员总是具有相同的原始值。我们也可以为枚举成员设定关联值——这些值是在创建实例时确定的，这样同一枚举成员在不同实例的关联值可以不相同。你可以将关联值理解为枚举成员实例的存储属性。例如，在从服务器请求日出和日落时间时，服务器可能会返回所请求的日出和日落时间，或者返回一个描述错误的消息。

<!--
  REFERENCE
  The server response is a simple way to essentially re-implement Optional
  while sidestepping the fact that I'm doing so.

  "Out of cheese" is a reference to a Terry Pratchet book,
  which features a computer named Hex.
  Hex's other error messages include:

       - Out of Cheese Error. Redo From Start.
       - Mr. Jelly! Mr. Jelly! Error at Address Number 6, Treacle Mine Road.
       - Melon melon melon
       - +++ Wahhhhhhh! Mine! +++
       - +++ Divide By Cucumber Error. Please Reinstall Universe And Reboot +++
       - +++Whoops! Here comes the cheese! +++

  These messages themselves are references to BASIC interpreters
  (REDO FROM START) and old Hayes-compatible modems (+++).

  The "out of cheese error" may be a reference to a military computer
  although I can't find the source of this story anymore.
  As the story goes, during the course of a rather wild party,
  one of the computer's vacuum tube cabinets
  was opened to provide heat to a cold room in the winter.
  Through great coincidence,
  when a cheese tray got bashed into it during the celebration,
  the computer kept on working even though some of the tubes were broken
  and had cheese splattered & melted all over them.
  Tech were dispatched to make sure the computer was ok
  and told add more cheese if necessary --
  the officer in charge said that he didn't want
  an "out of cheese error" interrupting the calculation.
-->

```swift
enum ServerResponse {
    case result(String, String)
    case failure(String)
}

let success = ServerResponse.result("6:00 am", "8:09 pm")
let failure = ServerResponse.failure("Out of cheese.")

switch success {
case let .result(sunrise, sunset):
    print("Sunrise is at \(sunrise) and sunset is at \(sunset).")
case let .failure(message):
    print("Failure...  \(message)")
}
// 输出 "Sunrise is at 6:00 am and sunset is at 8:09 pm."
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> enum ServerResponse {
         case result(String, String)
         case failure(String)
     }
  ---
  -> let success = ServerResponse.result("6:00 am", "8:09 pm")
  -> let failure = ServerResponse.failure("Out of cheese.")
  ---
  -> switch success {
         case let .result(sunrise, sunset):
             print("Sunrise is at \(sunrise) and sunset is at \(sunset).")
         case let .failure(message):
             print("Failure...  \(message)")
     }
  <- Sunrise is at 6:00 am and sunset is at 8:09 pm.
  ```
-->

> 练习: 给 `ServerResponse` 和 switch 添加第三种情况。

注意在 `switch` 语句中匹配 `ServerResponse` 值时，是如何提取出日出和日落时间的。

使用 `struct` 来创建结构体。结构体和类有很多相同的地方，包括方法和构造器。它们之间最大的一个区别就是结构体是传值，类是传引用。

```swift
struct Card {
    var rank: Rank
    var suit: Suit
    func simpleDescription() -> String {
        return "The \(rank.simpleDescription()) of \(suit.simpleDescription())"
    }
}
let threeOfSpades = Card(rank: .three, suit: .spades)
let threeOfSpadesDescription = threeOfSpades.simpleDescription()
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> struct Card {
         var rank: Rank
         var suit: Suit
         func simpleDescription() -> String {
             return "The \(rank.simpleDescription()) of \(suit.simpleDescription())"
         }
     }
  -> let threeOfSpades = Card(rank: .three, suit: .spades)
  -> let threeOfSpadesDescription = threeOfSpades.simpleDescription()
  >> print(threeOfSpadesDescription)
  << The 3 of spades
  ```
-->

> 练习: 写一个函数，返回一个的数组，数组中包含拥有所有花色和点数的整副扑克牌。

## 并发性

使用 `async` 标记异步运行的函数。

```swift
func fetchUserID(from server: String) async -> Int {
    if server == "primary" {
        return 97
    }
    return 501
}
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> func fetchUserID(from server: String) async -> Int {
         if server == "primary" {
             return 97
         }
         return 501
     }
  ```
-->

你可以通过在函数名前添加 `await` 来标记对异步函数的调用。

```swift
func fetchUsername(from server: String) async -> String {
    let userID = await fetchUserID(from: server)
    if userID == 501 {
        return "John Appleseed"
    }
    return "Guest"
}
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> func fetchUsername(from server: String) async -> String {
         let userID = await fetchUserID(from: server)
         if userID == 501 {
             return "John Appleseed"
         }
         return "Guest"
     }
  ```
-->

使用 `async let` 来调用异步函数，并让它与其它异步函数并行运行。如果要使用该异步函数的返回值，需要写上 `await`。

```swift
func connectUser(to server: String) async {
    async let userID = fetchUserID(from: server)
    async let username = fetchUsername(from: server)
    let greeting = await "Hello \(username), user ID \(userID)"
    print(greeting)
}
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> func connectUser(to server: String) async {
         async let userID = fetchUserID(from: server)
         async let username = fetchUsername(from: server)
         let greeting = await "Hello \(username), user ID \(userID)"
         print(greeting)
     }
  ```
-->

使用 `Task` 从同步代码中调用异步函数且不等待它们的返回结果。

```swift
Task {
    await connectUser(to: "primary")
}
// 输出 "Hello Guest, user ID 97"
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> Task {
         await connectUser(to: "primary")
     }
  >> import Darwin; sleep(1)  // Pause for task to run
  <- Hello Guest, user ID 97
  ```
-->

使用任务组可以更好地组织并发代码。

```swift
let userIDs = await withTaskGroup(of: Int.self) { group in
    for server in ["primary", "secondary", "development"] {
        group.addTask {
            return await fetchUserID(from: server)
        }
    }

    var results: [Int] = []
    for await result in group {
        results.append(result)
    }
    return results
}
```

actor 和类很相似，但它可以确保同一时刻不同的异步函数可以安全地与同一个 actor 的实例交互。

```swift
actor ServerConnection {
    var server: String = "primary"
    private var activeUsers: [Int] = []
    func connect() async -> Int {
        let userID = await fetchUserID(from: server)
        // ... 和服务器通讯 ...
        activeUsers.append(userID)
        return userID
    }
}
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> actor Oven {
         var contents: [String] = []
         func bake(_ food: String) -> String {
             contents.append(food)
             // ... wait for food to bake ...
             return contents.removeLast()
         }
     }
  ```
-->

当调用一个 actor 实例的方法或访问其属性时，用 `await` 来表示可能需要等待已经在 actor 实例中运行的其他代码完成。

```swift
let server = ServerConnection()
let userID = await server.connect()
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> let oven = Oven()
  -> let biscuits = await oven.bake("biscuits")
  ```
-->


## 协议和扩展

使用 `protocol` 来声明一个协议。

```swift
protocol ExampleProtocol {
     var simpleDescription: String { get }
     mutating func adjust()
}
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> protocol ExampleProtocol {
          var simpleDescription: String { get }
          mutating func adjust()
     }
  ```
-->

类、枚举和结构体都可以遵循协议。

<!--
  REFERENCE
  The use of adjust() is totally a placeholder
  for some more interesting operation.
  Likewise for the struct and classes -- placeholders
  for some more interesting data structure.
-->

```swift
class SimpleClass: ExampleProtocol {
     var simpleDescription: String = "A very simple class."
     var anotherProperty: Int = 69105
     func adjust() {
          simpleDescription += "  Now 100% adjusted."
     }
}
var a = SimpleClass()
a.adjust()
let aDescription = a.simpleDescription

struct SimpleStructure: ExampleProtocol {
     var simpleDescription: String = "A simple structure"
     mutating func adjust() {
          simpleDescription += " (adjusted)"
     }
}
var b = SimpleStructure()
b.adjust()
let bDescription = b.simpleDescription
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> class SimpleClass: ExampleProtocol {
          var simpleDescription: String = "A very simple class."
          var anotherProperty: Int = 69105
          func adjust() {
               simpleDescription += "  Now 100% adjusted."
          }
     }
  -> var a = SimpleClass()
  -> a.adjust()
  -> let aDescription = a.simpleDescription
  >> print(aDescription)
  << A very simple class.  Now 100% adjusted.
  ---
  -> struct SimpleStructure: ExampleProtocol {
          var simpleDescription: String = "A simple structure"
          mutating func adjust() {
               simpleDescription += " (adjusted)"
          }
     }
  -> var b = SimpleStructure()
  -> b.adjust()
  -> let bDescription = b.simpleDescription
  >> print(bDescription)
  << A simple structure (adjusted)
  ```
-->

> 练习: 给 `ExampleProtocol` 增加一个要求。你需要怎么修改 `SimpleClass` 和 `SimpleStructure` 才能保证它们仍旧遵循这个协议？

注意在 `SimpleStructure` 的声明中，使用了 `mutating` 关键字来标记那些会修改结构体的方法。而 `SimpleClass` 的声明中不需要将其方法标记为 `mutating`，因为类的方法总是可以修改类本身。

可以使用 `extension` 为已有的类型添加新功能，比如新的方法和计算属性。扩展（extension）还可以为在其他地方声明的类型添加需要遵循的协议，包括那些从库或框架中导入的类型。

```swift
extension Int: ExampleProtocol {
    var simpleDescription: String {
        return "The number \(self)"
    }
    mutating func adjust() {
        self += 42
    }
 }
print(7.simpleDescription)
// 输出 "The number 7"
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> extension Int: ExampleProtocol {
         var simpleDescription: String {
             return "The number \(self)"
         }
         mutating func adjust() {
             self += 42
         }
      }
  -> print(7.simpleDescription)
  <- The number 7
  ```
-->

> 练习: 给 `Double` 类型写一个扩展，添加一个 `absoluteValue` 属性。

你可以像使用其他命名类型一样使用协议名——例如，创建一个有不同类型但是都遵循同一个协议的对象集合。当你处理的是一个封装的协议类型时，协议外定义的方法不可用。

```swift
let protocolValue: any ExampleProtocol = a
print(protocolValue.simpleDescription)
// 输出 "A very simple class.  Now 100% adjusted."
// print(protocolValue.anotherProperty)  // 去掉注释可以看到错误
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> let protocolValue: ExampleProtocol = a
  -> print(protocolValue.simpleDescription)
  <- A very simple class.  Now 100% adjusted.
  // print(protocolValue.anotherProperty)  // Uncomment to see the error
  ```
-->

尽管变量 `protocolValue` 的运行时类型是 `SimpleClass`，但编译器还是会将其视为 `ExampleProtocol` 类型。这意味着你不能访问在协议之外的方法或者属性。

## 错误处理

你可以使用任何遵循 `Error` 协议的类型来表示错误。

<!--
  REFERENCE
  PrinterError.OnFire is a reference to the Unix printing system's "lp0 on
  fire" error message, used when the kernel can't identify the specific error.
  The names of printers used in the examples in this section are names of
  people who were important in the development of printing.

  Bi Sheng is credited with inventing the first movable type out of porcelain
  in China in the 1040s.  It was a mixed success, in large part because of the
  vast number of characters needed to write Chinese, and failed to replace
  wood block printing.  Johannes Gutenberg is credited as the first European
  to use movable type in the 1440s --- his metal type enabled the printing
  revolution.  Ottmar Mergenthaler invented the Linotype machine in the 1884,
  which dramatically increased the speed of setting type for printing compared
  to the previous manual typesetting.  It set an entire line of type (hence
  the name) at a time, and was controlled by a keyboard.  The Monotype
  machine, invented in 1885 by Tolbert Lanston, performed similar work.
-->

```swift
enum PrinterError: Error {
    case outOfPaper
    case noToner
    case onFire
}
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> enum PrinterError: Error {
         case outOfPaper
         case noToner
         case onFire
     }
  ```
-->

使用 `throw` 来抛出错误，并使用 `throws` 标记可能抛出错误的函数。如果在函数中抛出错误，函数会立即返回，并由调用该函数的代码来处理这个错误。

```swift
func send(job: Int, toPrinter printerName: String) throws -> String {
    if printerName == "Never Has Toner" {
        throw PrinterError.noToner
    }
    return "Job sent"
}
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> func send(job: Int, toPrinter printerName: String) throws -> String {
         if printerName == "Never Has Toner" {
             throw PrinterError.noToner
         }
         return "Job sent"
     }
  ```
-->

处理错误有多种方式，其中一种是使用 `do`-`catch`。在 `do` 代码块中，你需要在可以抛出错误的代码前加上 `try`。在 `catch` 代码块中，除非你另外命名，否则错误会被默认命名为 `error`。

```swift
do {
    let printerResponse = try send(job: 1040, toPrinter: "Bi Sheng")
    print(printerResponse)
} catch {
    print(error)
}
// 输出 "Job sent"
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> do {
         let printerResponse = try send(job: 1040, toPrinter: "Bi Sheng")
         print(printerResponse)
     } catch {
         print(error)
     }
  <- Job sent
  ```
-->

> 练习: 将 printer name 改为 `"Never Has Toner"`，使 `send(job:toPrinter:)` 函数抛出错误。

<!--
  Assertion tests the change that the Experiment box instructs you to make.
-->

<!--
  - test: `guided-tour`

  ```swifttest
  >> do {
         let printerResponse = try send(job: 500, toPrinter: "Never Has Toner")
         print(printerResponse)
     } catch {
         print(error)
     }
  <- noToner
  ```
-->

可以提供多个 `catch` 块来处理特定的错误。和 switch 中 `case` 的写法一样，在 `catch` 后写匹配模式。

<!--
  REFERENCE
  The "rest of the fire" quote comes from The IT Crowd, season 1 episode 2.
-->

```swift
do {
    let printerResponse = try send(job: 1440, toPrinter: "Gutenberg")
    print(printerResponse)
} catch PrinterError.onFire {
    print("I'll just put this over here, with the rest of the fire.")
} catch let printerError as PrinterError {
    print("Printer error: \(printerError).")
} catch {
    print(error)
}
// 输出 "Job sent"
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> do {
         let printerResponse = try send(job: 1440, toPrinter: "Gutenberg")
         print(printerResponse)
     } catch PrinterError.onFire {
         print("I'll just put this over here, with the rest of the fire.")
     } catch let printerError as PrinterError {
         print("Printer error: \(printerError).")
     } catch {
         print(error)
     }
  <- Job sent
  ```
-->

> 练习: 在 `do` 代码块中添加抛出错误的代码。你需要抛出哪种错误使其被第一个 `catch` 块处理？对于第二个和第三个 `catch` 块，又需要抛出哪种错误呢？

另一种处理错误的方式是使用 `try?` 将结果转换为可选的。如果函数抛出错误，该错误会被抛弃并且结果为 `nil`。否则，结果会是一个包含函数返回值的可选值。

```swift
let printerSuccess = try? send(job: 1884, toPrinter: "Mergenthaler")
let printerFailure = try? send(job: 1885, toPrinter: "Never Has Toner")
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> let printerSuccess = try? send(job: 1884, toPrinter: "Mergenthaler")
  >> print(printerSuccess as Any)
  << Optional("Job sent")
  -> let printerFailure = try? send(job: 1885, toPrinter: "Never Has Toner")
  >> print(printerFailure as Any)
  << nil
  ```
-->

使用 `defer` 代码块来表示在函数返回前，函数中最后执行的代码。无论函数是否会抛出错误，这段代码都将执行。使用 `defer` 可以把初始化代码和扫尾代码写在一起，即使它们在不同的时机执行。

```swift
var fridgeIsOpen = false
let fridgeContent = ["milk", "eggs", "leftovers"]

func fridgeContains(_ food: String) -> Bool {
    fridgeIsOpen = true
    defer {
        fridgeIsOpen = false
    }

    let result = fridgeContent.contains(food)
    return result
}
if fridgeContains("banana") {
    print("Found a banana")
}
print(fridgeIsOpen)
// 输出 "false"
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> var fridgeIsOpen = false
  -> let fridgeContent = ["milk", "eggs", "leftovers"]
  ---
  -> func fridgeContains(_ food: String) -> Bool {
         fridgeIsOpen = true
         defer {
             fridgeIsOpen = false
         }
  ---
         let result = fridgeContent.contains(food)
         return result
     }
  >> let containsBanana =
  -> fridgeContains("banana")
  >> print(containsBanana)
  << false
  -> print(fridgeIsOpen)
  <- false
  ```
-->

## 泛型

在尖括号里写一个名字来创建一个泛型函数或者泛型类型。

<!--
  REFERENCE
  The four knocks is a reference to Dr Who series 4,
  in which knocking four times is a running aspect
  of the season's plot.
-->

```swift
func makeArray<Item>(repeating item: Item, numberOfTimes: Int) -> [Item] {
    var result: [Item] = []
    for _ in 0..<numberOfTimes {
         result.append(item)
    }
    return result
}
makeArray(repeating: "knock", numberOfTimes: 4)
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> func makeArray<Item>(repeating item: Item, numberOfTimes: Int) -> [Item] {
         var result: [Item] = []
         for _ in 0..<numberOfTimes {
              result.append(item)
         }
         return result
     }
  >> let fourKnocks =
  -> makeArray(repeating: "knock", numberOfTimes: 4)
  >> print(fourKnocks)
  << ["knock", "knock", "knock", "knock"]
  ```
-->

你可以为函数和方法创建泛型，也可以为类、枚举和结构体创建泛型。

```swift
// 重新实现 Swift 标准库中的可选类型
enum OptionalValue<Wrapped> {
    case none
    case some(Wrapped)
}
var possibleInteger: OptionalValue<Int> = .none
possibleInteger = .some(100)
```

<!--
  - test: `guided-tour`

  ```swifttest
  // Reimplement the Swift standard library's optional type
  -> enum OptionalValue<Wrapped> {
         case none
         case some(Wrapped)
     }
  -> var possibleInteger: OptionalValue<Int> = .none
  -> possibleInteger = .some(100)
  ```
-->

在代码主体之前使用 `where` 来指定对类型的一系列要求——例如，要求类型实现特定协议，要求两个类型是相同的，或者要求某个类具有特定的父类。

```swift
func anyCommonElements<T: Sequence, U: Sequence>(_ lhs: T, _ rhs: U) -> Bool
    where T.Element: Equatable, T.Element == U.Element
{
    for lhsItem in lhs {
        for rhsItem in rhs {
            if lhsItem == rhsItem {
                return true
            }
        }
    }
   return false
}
anyCommonElements([1, 2, 3], [3])
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> func anyCommonElements<T: Sequence, U: Sequence>(_ lhs: T, _ rhs: U) -> Bool
         where T.Element: Equatable, T.Element == U.Element
     {
         for lhsItem in lhs {
             for rhsItem in rhs {
                 if lhsItem == rhsItem {
                     return true
                 }
             }
         }
        return false
     }
  >> let hasAnyCommon =
  -> anyCommonElements([1, 2, 3], [3])
  >> print(hasAnyCommon)
  << true
  ```
-->

> 练习: 修改 `anyCommonElements(_:_:)` 函数，使其返回一个数组，该数组包含任意两个序列中共有的元素。

`<T: Equatable>` 和 `<T> ... where T: Equatable` 的写法是等价的。

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
