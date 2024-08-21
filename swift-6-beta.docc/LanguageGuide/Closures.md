# 闭包

对一起执行的代码进行分组，而不创建命名函数。

*闭包*是自包含的函数代码块，可以在代码中被传递和使用。Swift 中的闭包类似于其他编程语言中的闭包、匿名函数、lambda和块。

闭包可以捕获和存储其所在上下文中任意常量和变量的引用。被称为*包裹常量*和变量。 Swift 会为你管理在捕获过程中涉及到的所有内存操作。

> Note: 如果你不熟悉捕获（capturing）这个概念也不用担心。
> 在 <doc:Closures#Capturing-Values> 章节有它更详细的介绍。

在 函数 章节中介绍的全局和嵌套函数实际上也是特殊的闭包，闭包采用如下三种形式之一：

- 全局函数是一个有名字但不会捕获任何值的闭包
- 嵌套函数是一个有名字并可以捕获其封闭函数域内值的闭包
- 闭包表达式是一个利用轻量级语法所写的可以捕获其上下文中变量或常量值的匿名闭包

Swift 的闭包表达式拥有简洁的风格，其优化鼓励在常见场景中使用简短、整洁的语法，主要优化如下：

- 利用上下文推断参数和返回值类型
- 隐式返回单表达式闭包，即单表达式闭包可以省略 return 关键字
- 参数名称缩写
- 尾随闭包语法

## 闭包表达式

嵌套函数, 如 <doc:Functions#Nested-Functions> 中介绍的那样，是一种命名和定义自包含代码块作为更大函数的一部分的便捷方法。当然，编写未完整声明和没有函数名的类函数结构代码是很有用的，尤其是在编码中涉及到函数作为一个或多个参数的那些方法时。

*闭包表达式*是一种以简短、集中的语法编写内联闭包的方法。在保证不丢失它语法清晰和意图的同时，闭包表达式提供了几种优化的语法简写形式。下面的闭包表达式通过对 `sorted(by:)` 这一示例的多次迭代来展示这个过程，每次迭代都使用了更加简洁的方式描述了相同功能。

### Sorted 方法

Swift 标准库提供了名为 `sorted(by:)` 的方法，它会基于你提供的排序闭包表达式的判断结果对数组中的值（类型确定）进行排序。一旦它完成排序过程，`sorted(by:)` 方法会返回一个与旧数组类型大小相同类型的新数组，该数组的元素有着正确的排序顺序。原数组不会被 `sorted(by:)` 方法修改。

下面的闭包表达式示例使用 `sorted(by:)` 方法对一个 `String` 类型的数组进行字母逆序排序。以下是初始数组：

```swift
let names = ["Chris", "Alex", "Ewa", "Barry", "Daniella"]
```

<!--
  - test: `closureSyntax`

  ```swifttest
  -> let names = ["Chris", "Alex", "Ewa", "Barry", "Daniella"]
  ```
-->

`sorted(by:)` 方法接受一个闭包，该闭包函数需要传入与数组元素类型相同的两个值，并返回一个布尔类型值，来表明排序后第一个参数排在第二个参数前面还是后面。如果第一个参数值出现在第二个参数值*前面*，排序闭包函数需要返回 `true`，反之返回 `false`。

该例子对一个 `String` 类型的数组进行排序，因此排序闭包函数类型需为 `(String, String) -> Bool`。

提供排序闭包函数的一种方式是编写一个正确类型的普通函数，并将其作为 `sorted(by:)` 方法的参数传入：

```swift
func backward(_ s1: String, _ s2: String) -> Bool {
    return s1 > s2
}
var reversedNames = names.sorted(by: backward)
// reversedNames is equal to ["Ewa", "Daniella", "Chris", "Barry", "Alex"]
```

<!--
  - test: `closureSyntax`

  ```swifttest
  -> func backward(_ s1: String, _ s2: String) -> Bool {
        return s1 > s2
     }
  -> var reversedNames = names.sorted(by: backward)
  /> reversedNames is equal to \(reversedNames)
  </ reversedNames is equal to ["Ewa", "Daniella", "Chris", "Barry", "Alex"]
  ```
-->

如果第一个字符串 （`s1`） 大于第二个字符串 （`s2`），`backward（_：_：）` 函数将返回 `true`，表示在新的数组中 `s1` 应该出现在 `s2` 前。对于字符串中的字符，“大于”表示“在字母顺序较晚出现”。这意味着字母`“B”`“大于”字母`“A”`，字符串`“Tom”`大于字符串`“Tim”。`这给出了一个字母逆序排序，`将“Barry”`放在`“Alex”`之前，依此类推。

然而，这是一种相当繁琐的编写方式，本质上是一个单表达式函数 （`a > b`）。对于这个例子来说，利用闭包表达式语法可以更好地构造一个内联排序闭包。

### 闭包表达式语法

闭包表达式语法的一般形式如下：

```swift
{ (<#parameters#>) -> <#return type#> in
   <#statements#>
}
```

闭包表达式语法中的*参数*可以是 in-out 参数，但不能具有默认值。如果你命名了可变参数，也可以使用可变参数。元组也可以用作参数类型和返回类型。

下面的示例展示了上面的 `backward（_：_：）` 函数对应的闭包表达式版本：

```swift
reversedNames = names.sorted(by: { (s1: String, s2: String) -> Bool in
    return s1 > s2
})
```

<!--
  - test: `closureSyntax`

  ```swifttest
  -> reversedNames = names.sorted(by: { (s1: String, s2: String) -> Bool in
        return s1 > s2
     })
  >> assert(reversedNames == ["Ewa", "Daniella", "Chris", "Barry", "Alex"])
  ```
-->

需要注意的是，内联闭包的参数和返回类型的声明与 `backward（_：_：）` 函数的声明相同。在这两种情况下，它都写为 `（s1： String， s2： String） -> Bool`。但是在内联闭包表达式中，参数和返回类型都写入*大括号*内，而不是大括号外。

闭包函数主体的开始由 `in` 关键字引入。此关键字表示闭包的参数和返回类型的定义已经完成，闭包的主体即将开始。

因为闭包的主体很短，甚至可以写在一行上：

```swift
reversedNames = names.sorted(by: { (s1: String, s2: String) -> Bool in return s1 > s2 } )
```

<!--
  - test: `closureSyntax`

  ```swifttest
  -> reversedNames = names.sorted(by: { (s1: String, s2: String) -> Bool in return s1 > s2 } )
  >> assert(reversedNames == ["Ewa", "Daniella", "Chris", "Barry", "Alex"])
  ```
-->

这说明对 `sorted（by：）` 方法的整体调用保持不变。一对括号仍然包裹着方法的整个参数。然而，参数现在变为了内联闭包。

### 根据上下文推断类型

因为排序闭包是作为参数传递给方法的，所以 Swift 可以推断其参数的类型和返回的值的类型。`sorted（by：）` 方法被一个字符串数组调用，因此其参数必须是 `（String， String） -> Bool` 类型的函数。这意味着 `（String， String）` 和 `Bool` 类型不需要作为闭包表达式定义的一部分。由于可以推断所有类型，因此也可以省略返回箭头 （`->`） 和参数名称两边的括号：


```swift
reversedNames = names.sorted(by: { s1, s2 in return s1 > s2 } )
```

<!--
  - test: `closureSyntax`

  ```swifttest
  -> reversedNames = names.sorted(by: { s1, s2 in return s1 > s2 } )
  >> assert(reversedNames == ["Ewa", "Daniella", "Chris", "Barry", "Alex"])
  ```
-->

在将闭包作为内联闭包表达式传递给函数或方法时，始终可以推断参数类型和返回类型。因此，当闭包用作函数或方法参数时，你永远不需要以最完整的形式编写内联闭包。

尽管如此，如果你愿意，您仍然可以使类型显式化，并且如果这样做能够提高代码的可读性，则鼓励这样做。而在 `sorted（by：）` 这个例子中，可以清楚地看出闭包的目的是为了排序，并且读者可以正确推测闭包可能正在处理 `String` 值，因为它正在对字符串数组进行排序。

### 单表达式闭包的隐式返回

单表达式闭包可以通过从其声明中省略 `return` 关键字来隐式返回其单表达式的结果，如上版本的例子可以改写为：

```swift
reversedNames = names.sorted(by: { s1, s2 in s1 > s2 } )
```

<!--
  - test: `closureSyntax`

  ```swifttest
  -> reversedNames = names.sorted(by: { s1, s2 in s1 > s2 } )
  >> assert(reversedNames == ["Ewa", "Daniella", "Chris", "Barry", "Alex"])
  ```
-->

在这个例子中，`sorted（by：）` 方法的参数类型明确了闭包必须返回一个 `Bool` 值。因为闭包的主体包含了一个返回 `Bool` 值的单个表达式 （`s1 > s2`），因此不存在歧义，并且可以省略 `return` 关键字。

### 缩写参数名称

Swift 自动为内联闭包提供了缩写参数名称功能，你可以直接通过  `$0`、`$1`、`$2` 等来引用闭包参数的值，以此类推。

如果你在闭包表达式中使用这些缩写参数名称，则可以在其定义中省略闭包的参数列表。缩写参数名称的类型是从预期的函数类型推断出来的。闭包接受的参数的数量取决于所使用的缩写参数的最大编号。也可以省略 `in` 关键字，因为此时闭包表达式完全由闭包函数体构成：

```swift
reversedNames = names.sorted(by: { $0 > $1 } )
```

<!--
  - test: `closureSyntax`

  ```swifttest
  -> reversedNames = names.sorted(by: { $0 > $1 } )
  >> assert(reversedNames == ["Ewa", "Daniella", "Chris", "Barry", "Alex"])
  ```
-->

在这个例子中，`$0` 和 `$1` 表示闭包的第一个和第二个 `String` 参数。由于 `$1` 是编号最大的缩写参数，因此闭包可以理解为需要两个参数。因为这里的 `sorted（by：）` 函数需要一个参数都是字符串的闭包，所以缩写参数 `$0` 和 `$1` 都是 `String` 类型。

<!--
  - test: `closure-syntax-arity-inference`

  ```swifttest
  >> let a: [String: String] = [:]
  >> var b: [String: String] = [:]
  >> b.merge(a, uniquingKeysWith: { $1 })
  >> b.merge(a, uniquingKeysWith: { $0 })
  !$ error: contextual closure type '(String, String) throws -> String' expects 2 arguments, but 1 was used in closure body
  !! b.merge(a, uniquingKeysWith: { $0 })
  !! ^
  ```
-->

### 运算符方法

实际上有一种*更短的*方法来编写上面的闭包表达式。Swift 的 `String` 类型定义了关于大于运算符 （`>`） 的字符串实现方法，该方法具有两个 `String` 类型的参数，并返回一个 `Bool` 类型的值。这与 `sorted（by：）` 方法所需的方法类型完全匹配。因此，你可以简单地传入大于号运算符，Swift 会推断出特定于字符串的实现：

```swift
reversedNames = names.sorted(by: >)
```

<!--
  - test: `closureSyntax`

  ```swifttest
  -> reversedNames = names.sorted(by: >)
  >> assert(reversedNames == ["Ewa", "Daniella", "Chris", "Barry", "Alex"])
  ```
-->

更多关于运算符方法的内容请查看 <doc:AdvancedOperators#Operator-Methods>.

## 尾随闭包

如果你需要将闭包表达式作为函数的最后一个参数传递给函数，并且闭包表达式很长，则将其编写为*尾随闭包*的形式可能会很有用。在函数调用的括号后编写一个尾随闭包，该尾随闭包仍然会作为该函数的一个参数。使用尾随闭包语法时，不用在函数调用过程中为第一个闭包声明参数名。函数调用可以包含多个尾随闭包；但是，下面的前几个示例只使用了单个尾随闭包。

```swift
func someFunctionThatTakesAClosure(closure: () -> Void) {
    // function body goes here
}

// Here's how you call this function without using a trailing closure:

someFunctionThatTakesAClosure(closure: {
    // closure's body goes here
})

// Here's how you call this function with a trailing closure instead:

someFunctionThatTakesAClosure() {
    // trailing closure's body goes here
}
```

<!--
  - test: `closureSyntax`

  ```swifttest
  -> func someFunctionThatTakesAClosure(closure: () -> Void) {
        // function body goes here
     }
  ---
  -> // Here's how you call this function without using a trailing closure:
  ---
  -> someFunctionThatTakesAClosure(closure: {
        // closure's body goes here
     })
  ---
  -> // Here's how you call this function with a trailing closure instead:
  ---
  -> someFunctionThatTakesAClosure() {
        // trailing closure's body goes here
     }
  ```
-->

上面 <doc:Closures#Closure-Expression-Syntax> 部分的字符串排序闭包可以写在 `sorted（by：）` 方法的括号之外作为尾随闭包：

```swift
reversedNames = names.sorted() { $0 > $1 }
```

<!--
  - test: `closureSyntax`

  ```swifttest
  -> reversedNames = names.sorted() { $0 > $1 }
  >> assert(reversedNames == ["Ewa", "Daniella", "Chris", "Barry", "Alex"])
  ```
-->


如果一个闭包表达式是函数或方法的唯一参数，并且把该表达式写作尾随闭包，则在调用函数或方法时，无需在函数名或方法名后编写一对括号 `（）：`

```swift
reversedNames = names.sorted { $0 > $1 }
```

<!--
  - test: `closureSyntax`

  ```swifttest
  -> reversedNames = names.sorted { $0 > $1 }
  >> assert(reversedNames == ["Ewa", "Daniella", "Chris", "Barry", "Alex"])
  ```
-->

当闭包足够长以至于无法在单行上内联写入时，尾随闭包变得非常有用。例如，Swift 的 `Array` 类型有一个 `map（_：）` 方法，该方法将闭包表达式作为其唯一参数。对于数组中的每一个元素，都将调用一次闭包，并返回该元素的映射值（可能是其他类型的）。你可以通过在传递给 `map（_：）` 的闭包中编写代码来指定映射的性质和返回值的类型。

将提供的闭包应用于每个数组元素后，`map（_：）` 方法返回一个新数组，其中包含了所有新的映射值，其顺序与原始数组中的相应值相同。

下例是如何使用带有尾随闭包的 `map（_：）` 方法将 `Int` 类型数组转换为 `String` 类型数组。数组 `[16， 58， 510]` 用于创建新的数组 `[“OneSix”， “FiveEight”， “FiveOneZero”]`：

```swift
let digitNames = [
    0: "Zero", 1: "One", 2: "Two",   3: "Three", 4: "Four",
    5: "Five", 6: "Six", 7: "Seven", 8: "Eight", 9: "Nine"
]
let numbers = [16, 58, 510]
```

<!--
  - test: `arrayMap`

  ```swifttest
  -> let digitNames = [
        0: "Zero", 1: "One", 2: "Two",   3: "Three", 4: "Four",
        5: "Five", 6: "Six", 7: "Seven", 8: "Eight", 9: "Nine"
     ]
  -> let numbers = [16, 58, 510]
  ```
-->

上面的代码创建了一个整型数位和它们英文版本名字相映射的字典。同时还定义了一个准备转换为字符串数组的整型数组。

你现在可以通过将一个闭包表达式作为尾随闭包传递给数组的 `map（_：）` 方法， 来使用`numbers` 数组创建一个 `String` 类型的数组。

```swift
let strings = numbers.map { (number) -> String in
    var number = number
    var output = ""
    repeat {
        output = digitNames[number % 10]! + output
        number /= 10
    } while number > 0
    return output
}
// strings is inferred to be of type [String]
// its value is ["OneSix", "FiveEight", "FiveOneZero"]
```

<!--
  - test: `arrayMap`

  ```swifttest
  -> let strings = numbers.map { (number) -> String in
        var number = number
        var output = ""
        repeat {
           output = digitNames[number % 10]! + output
           number /= 10
        } while number > 0
        return output
     }
  // strings is inferred to be of type [String]
  /> its value is [\"\(strings[0])\", \"\(strings[1])\", \"\(strings[2])\"]
  </ its value is ["OneSix", "FiveEight", "FiveOneZero"]
  ```
-->

`map（_：）` 方法为数组中的每个元素调用一次闭包表达式。你无需指定闭包的输入参数 `number` 的类型，因为可以从要映射的数组类型进行推断。

在此示例中，局部变量 `number` 使用闭包的 `number` 参数的值进行初始化，以便可以在闭包函数内部对其进行修改。（函数和闭包的参数始终是常量。闭包表达式还指定了 `String` 作为返回类型，以表明存储映射值的新数组的类型。


闭包表达式每次调用时都会生成一个名为 `output` 的字符串。它使用求余运算符 （`number % 10`） 计算`number`的最后一位数字，并使用此数字在 `digitNames` 字典中查找所映射的字符串。这个闭包可用于创建任何一个大于零的整数的字符串表示形式。

> 注意：字典 `digitNames` 的下标后跟着一个感叹号 （`！）`，因为字典下标返回一个可选值，以表示如果该key不存在，字典查找可能会失败。在上面的示例中，可以保证`数字 % 10` 始终是 `digitNames` 字典的有效下标值，因此使用感叹号来对存储在该下标的可选类型返回值中的 `String` 进行强制解包。



The string retrieved from the `digitNames` dictionary
is added to the *front* of `output`,
effectively building a string version of the number in reverse.
(The expression `number % 10` gives a value of
`6` for `16`, `8` for `58`, and `0` for `510`.)

从 `digitNames` 字典中检索的字符串被添加到`输出`的*前面*，从而有效地逆序构建了数字的字符串版本。（在表达式`number % 10` 中，number 为`16` 则返回 `6`，` 58` 对应 `8`,`510` 对应 `0`。）

然后将 `number` 变量除以 `10`。因为它是一个整数，所以在除法过程中会向下舍入，所以 `16` 变成 `1` , `58` 变成 `5` , `510` 变成 `51` 。

重复该过程，直到 `number` 等于 `0`，此时闭包返回 `output` 字符串，并通过 `map（_：）` 方法添加到输出到映射数组中。

在上面的示例中使用尾随闭包语法，巧妙地在函数后封装了闭包的具体功能，而无需将整个闭包包裹在 `map（_：）` 方法的外括号中。

如果一个函数采用多个闭包，则省略第一个尾随闭包的参数名，并声明其余的尾随闭包。例如，以下函数将为照片库加载图片：


```swift
func loadPicture(from server: Server, completion: (Picture) -> Void, onFailure: () -> Void) {
    if let picture = download("photo.jpg", from: server) {
        completion(picture)
    } else {
        onFailure()
    }
}
```

<!--
  - test: `multiple-trailing-closures`

  ```swifttest
  >> struct Server { }
  >> struct Picture { }
  >> func download(_ path: String, from server: Server) -> Picture? {
  >>     return Picture()
  >> }
  -> func loadPicture(from server: Server, completion: (Picture) -> Void, onFailure: () -> Void) {
         if let picture = download("photo.jpg", from: server) {
             completion(picture)
         } else {
             onFailure()
         }
     }
  ```
-->

当您调用此函数来加载图片时，将提供两个闭包。第一个闭包是一个完成处理程序，在成功下载后显示图片。第二个闭包是一个错误处理程序，用于向用户显示错误。

```swift
loadPicture(from: someServer) { picture in
    someView.currentPicture = picture
} onFailure: {
    print("Couldn't download the next picture.")
}
```

<!--
  - test: `multiple-trailing-closures`

  ```swifttest
  >> struct View {
  >>    var currentPicture = Picture() { didSet { print("Changed picture") } }
  >> }
  >> var someView = View()
  >> let someServer = Server()
  -> loadPicture(from: someServer) { picture in
         someView.currentPicture = picture
     } onFailure: {
         print("Couldn't download the next picture.")
     }
  << Changed picture
  ```
-->

在此示例中，`loadPicture（from：completion：onFailure：）` 函数将其网络任务分配到后台，并在网络任务完成时调用两个完成处理程序之一。通过这种方法编写函数，可以清楚地将负责处理网络故障的代码与在成功下载后更新用户界面的代码分开，而不是只使用一个闭包处理两种情况。


> 提醒: Completion handlers 可能很难阅读，特别是您必须嵌套多个完成处理程序时。另一种方法是使用异步代码，如章节
>  <doc:Concurrency> 中所述。

## 值捕获

闭包可以从定义它的环境上下文中*捕获*常量和变量。即使定义这些常量和变量的原作用域已经不存在，闭包仍然可以在闭包函数体内引用和修改这些值。

在 Swift 中，可以捕获值的最简单的闭包形式是嵌套函数，它编写在另一个函数体中。嵌套函数可以捕获其外部函数的任何参数，也可以捕获在外部函数中定义的任何常量和变量。

下面是一个名为 `makeIncrementer` 的函数示例，其中包含一个名为 `incrementer` 的嵌套函数。嵌套函数 `incrementer（）` 从其周围的上下文中捕获两个值，`runningTotal` 和 `amount`。捕获这些值后，`makeIncrementer` 将 incrementer 作为闭包返回，每次调用它时，`incrementer` 都会以 `amount` 作为增量增加 `runningTotal` 的值。


```swift
func makeIncrementer(forIncrement amount: Int) -> () -> Int {
    var runningTotal = 0
    func incrementer() -> Int {
        runningTotal += amount
        return runningTotal
    }
    return incrementer
}
```

<!--
  - test: `closures`

  ```swifttest
  -> func makeIncrementer(forIncrement amount: Int) -> () -> Int {
        var runningTotal = 0
        func incrementer() -> Int {
           runningTotal += amount
           return runningTotal
        }
        return incrementer
     }
  ```
-->

`makeIncrementer` 的返回类型为 `（） -> Int`。这意味着它返回一个*函数*，而不是一个简单的值。它返回的函数没有参数，每次调用它时都返回一个 `Int` 值。要了解函数如何返回其他函数，请参阅  <doc:Functions#Function-Types-as-Return-Types> 。

`makeIncrementer（forIncrement：）` 函数定义了一个名为 `runningTotal` 的整数变量，该值初始值为 `0` ，用来存储当前总计数值，该值会作为 incrementer 的返回值。

`makeIncrementer（forIncrement：）` 函数有一个 `Int` 类型的参数，其外部参数名为 `forIncrement`，内部参数名称为 `amount`。该参数值指定每次调用 incrementer 时将要增加的值 `runningTotal` 是多少。`makeIncrementer` 函数定义了一个名为 `incrementer` 的嵌套函数，该函数执行实际的增加操作。此函数只是将 `amount` 增加到 `runningTotal` 上，并返回结果。

如果单独考虑嵌套的 `incrementer（）` 函数，可能看起来很不寻常：

```swift
func incrementer() -> Int {
    runningTotal += amount
    return runningTotal
}
```

<!--
  - test: `closuresPullout`

  ```swifttest
  -> func incrementer() -> Int {
  >>    var runningTotal = 0
  >>    let amount = 1
        runningTotal += amount
        return runningTotal
     }
  ```
-->

`incrementer（）` 函数没有任何参数，但它引用了其函数主体内的 `runningTotal` 和 `amount`。它通过从外围函数捕获对 `runningTotal` 和 `amount` 的*引用*并在其自己的函数体中使用它们来实现这一点。通过引用捕获可确保在对 `makeIncrementer` 的调用结束时，`runningTotal` 和 `amount` 不会消失，并且还可以确保 `runningTotal` 在下次调用 `incrementer` 函数时可用。

> 注意：作为一项优化，如果值不会被闭包改变，并且该值在创建闭包后不会改变，那么 Swift 可能会捕获并存储该值的*副本*。
>
> Swift 也会负责被捕获变量涉及的所有内存管理工作，包括释放不再需要的变量。

下面是一个使用 makeIncrementer 的例子：

```swift
let incrementByTen = makeIncrementer(forIncrement: 10)
```

<!--
  - test: `closures`

  ```swifttest
  -> let incrementByTen = makeIncrementer(forIncrement: 10)
  ```
-->

此示例定义了一个名为 `incrementByTen` 的常量，以引用一个 incrementer 函数，该函数在每次调用时，会将其 `runningTotal` 变量增加 `10` 。调用这个函数多次可以得到以下结果：

```swift
incrementByTen()
// returns a value of 10
incrementByTen()
// returns a value of 20
incrementByTen()
// returns a value of 30
```

<!--
  - test: `closures`

  ```swifttest
  >> let r0 =
  -> incrementByTen()
  /> returns a value of \(r0)
  </ returns a value of 10
  >> let r1 =
  -> incrementByTen()
  /> returns a value of \(r1)
  </ returns a value of 20
  >> let r2 =
  -> incrementByTen()
  /> returns a value of \(r2)
  </ returns a value of 30
  ```
-->

<!--
  Rewrite the above to avoid discarding the function's return value.
  Tracking bug is <rdar://problem/35301593>
-->

如果创建了第二个 incrementer，它会有属于自己的引用，指向一个全新、独立的 `runningTotal` 变量，它具有自己的存储引用 ：

```swift
let incrementBySeven = makeIncrementer(forIncrement: 7)
incrementBySeven()
// returns a value of 7
```

<!--
  - test: `closures`

  ```swifttest
  -> let incrementBySeven = makeIncrementer(forIncrement: 7)
  >> let r3 =
  -> incrementBySeven()
  /> returns a value of \(r3)
  </ returns a value of 7
  ```
-->

再次调用原来的 incrementer （`incrementByTen`） 会继续增加它自己的 `runningTotal` 变量，并且不会影响 `incrementBySeven` 捕获的变量：

```swift
incrementByTen()
// returns a value of 40
```

<!--
  - test: `closures`

  ```swifttest
  >> let r4 =
  -> incrementByTen()
  /> returns a value of \(r4)
  </ returns a value of 40
  ```
-->

> 注意：如果将闭包赋值给类实例的属性，并且闭包通过引用实例或其成员来捕获该实例，则将在闭包和实例之间创建一个强引用循环。Swift 使用_捕获列表_来打破这些强引用循环。有关更多信息，请参阅 <doc:AutomaticReferenceCounting#Strong-Reference-Cycles-for-Closures>.

## Closures Are Reference Types

In the example above,
`incrementBySeven` and `incrementByTen` are constants,
but the closures these constants refer to are still able to increment
the `runningTotal` variables that they have captured.
This is because functions and closures are *reference types*.

Whenever you assign a function or a closure to a constant or a variable,
you are actually setting that constant or variable to be
a *reference* to the function or closure.
In the example above,
it's the choice of closure that `incrementByTen` *refers to* that's constant,
and not the contents of the closure itself.

This also means that if you assign a closure to two different constants or variables,
both of those constants or variables refer to the same closure.

```swift
let alsoIncrementByTen = incrementByTen
alsoIncrementByTen()
// returns a value of 50

incrementByTen()
// returns a value of 60
```

<!--
  - test: `closures`

  ```swifttest
  -> let alsoIncrementByTen = incrementByTen
  >> let r5 =
  -> alsoIncrementByTen()
  /> returns a value of \(r5)
  </ returns a value of 50
  ---
  >> let r6 =
  -> incrementByTen()
  /> returns a value of \(r6)
  </ returns a value of 60
  ```
-->

The example above shows that calling `alsoIncrementByTen`
is the same as calling `incrementByTen`.
Because both of them refer to the same closure,
they both increment and return the same running total.

## Escaping Closures

A closure is said to *escape* a function
when the closure is passed as an argument to the function,
but is called after the function returns.
When you declare a function that takes a closure as one of its parameters,
you can write `@escaping` before the parameter's type
to indicate that the closure is allowed to escape.

One way that a closure can escape
is by being stored in a variable that's defined outside the function.
As an example,
many functions that start an asynchronous operation
take a closure argument as a completion handler.
The function returns after it starts the operation,
but the closure isn't called until the operation is completed ---
the closure needs to escape, to be called later.
For example:

```swift
var completionHandlers: [() -> Void] = []
func someFunctionWithEscapingClosure(completionHandler: @escaping () -> Void) {
    completionHandlers.append(completionHandler)
}
```

<!--
  - test: `noescape-closure-as-argument, implicit-self-struct`

  ```swifttest
  -> var completionHandlers: [() -> Void] = []
  -> func someFunctionWithEscapingClosure(completionHandler: @escaping () -> Void) {
         completionHandlers.append(completionHandler)
     }
  ```
-->

The `someFunctionWithEscapingClosure(_:)` function takes a closure as its argument
and adds it to an array that's declared outside the function.
If you didn't mark the parameter of this function with `@escaping`,
you would get a compile-time error.

An escaping closure that refers to `self`
needs special consideration if `self` refers to an instance of a class.
Capturing `self` in an escaping closure
makes it easy to accidentally create a strong reference cycle.
For information about reference cycles,
see <doc:AutomaticReferenceCounting>.

Normally, a closure captures variables implicitly
by using them in the body of the closure,
but in this case you need to be explicit.
If you want to capture `self`,
write `self` explicitly when you use it,
or include `self` in the closure's capture list.
Writing `self` explicitly lets you express your intent,
and reminds you to confirm that there isn't a reference cycle.
For example, in the code below,
the closure passed to `someFunctionWithEscapingClosure(_:)`
refers to `self` explicitly.
In contrast, the closure passed to `someFunctionWithNonescapingClosure(_:)`
is a nonescaping closure, which means it can refer to `self` implicitly.

```swift
func someFunctionWithNonescapingClosure(closure: () -> Void) {
    closure()
}

class SomeClass {
    var x = 10
    func doSomething() {
        someFunctionWithEscapingClosure { self.x = 100 }
        someFunctionWithNonescapingClosure { x = 200 }
    }
}

let instance = SomeClass()
instance.doSomething()
print(instance.x)
// Prints "200"

completionHandlers.first?()
print(instance.x)
// Prints "100"
```

<!--
  - test: `noescape-closure-as-argument`

  ```swifttest
  -> func someFunctionWithNonescapingClosure(closure: () -> Void) {
         closure()
     }
  ---
  -> class SomeClass {
         var x = 10
         func doSomething() {
             someFunctionWithEscapingClosure { self.x = 100 }
             someFunctionWithNonescapingClosure { x = 200 }
         }
     }
  ---
  -> let instance = SomeClass()
  -> instance.doSomething()
  -> print(instance.x)
  <- 200
  ---
  -> completionHandlers.first?()
  -> print(instance.x)
  <- 100
  ```
-->

Here's a version of `doSomething()` that captures `self`
by including it in the closure's capture list,
and then refers to `self` implicitly:

```swift
class SomeOtherClass {
    var x = 10
    func doSomething() {
        someFunctionWithEscapingClosure { [self] in x = 100 }
        someFunctionWithNonescapingClosure { x = 200 }
    }
}
```

<!--
  - test: `noescape-closure-as-argument`

  ```swifttest
  -> class SomeOtherClass {
         var x = 10
         func doSomething() {
             someFunctionWithEscapingClosure { [self] in x = 100 }
             someFunctionWithNonescapingClosure { x = 200 }
         }
     }
  >> completionHandlers = []
  >> let instance2 = SomeOtherClass()
  >> instance2.doSomething()
  >> print(instance2.x)
  << 200
  >> completionHandlers.first?()
  >> print(instance2.x)
  << 100
  ```
-->

If `self` is an instance of a structure or an enumeration,
you can always refer to `self` implicitly.
However,
an escaping closure can't capture a mutable reference to `self`
when `self` is an instance of a structure or an enumeration.
Structures and enumerations don’t allow shared mutability,
as discussed in <doc:ClassesAndStructures#Structures-and-Enumerations-Are-Value-Types>.

```swift
struct SomeStruct {
    var x = 10
    mutating func doSomething() {
        someFunctionWithNonescapingClosure { x = 200 }  // Ok
        someFunctionWithEscapingClosure { x = 100 }     // Error
    }
}
```

<!--
  - test: `struct-capture-mutable-self`

  ```swifttest
  >> var completionHandlers: [() -> Void] = []
  >> func someFunctionWithEscapingClosure(completionHandler: @escaping () -> Void) {
  >>     completionHandlers.append(completionHandler)
  >> }
  >> func someFunctionWithNonescapingClosure(closure: () -> Void) {
  >>     closure()
  >> }
  -> struct SomeStruct {
         var x = 10
         mutating func doSomething() {
             someFunctionWithNonescapingClosure { x = 200 }  // Ok
             someFunctionWithEscapingClosure { x = 100 }     // Error
         }
     }
  !$ error: escaping closure captures mutating 'self' parameter
  !! someFunctionWithEscapingClosure { x = 100 }     // Error
  !! ^
  !$ note: captured here
  !! someFunctionWithEscapingClosure { x = 100 }     // Error
  !! ^
  ```
-->

The call to the `someFunctionWithEscapingClosure` function
in the example above is an error
because it's inside a mutating method,
so `self` is mutable.
That violates the rule that escaping closures can't capture
a mutable reference to `self` for structures.

<!--
  - test: `noescape-closure-as-argument`

  ```swifttest
  // Test the non-error portion of struct-capture-mutable-self
  >> struct SomeStruct {
  >>     var x = 10
  >>     mutating func doSomething() {
  >>         someFunctionWithNonescapingClosure { x = 200 }
  >>     }
  >> }
  ---
  >> completionHandlers = []
  >> var instance3 = SomeStruct()
  >> instance3.doSomething()
  >> print(instance3.x)
  << 200
  ```
-->

<!--
  - test: `noescape-closure-as-argument`

  ```swifttest
  >> struct S {
  >>     var x = 10
  >>     func doSomething() {
  >>         someFunctionWithEscapingClosure { print(x) }  // OK
  >>     }
  >> }
  ---
  >> completionHandlers = []
  >> var s = S()
  >> s.doSomething()
  >> s.x = 99  // No effect on self.x already captured -- S is a value type
  >> completionHandlers.first?()
  << 10
  ```
-->

## Autoclosures

An *autoclosure* is a closure that's automatically created
to wrap an expression that's being passed as an argument to a function.
It doesn't take any arguments,
and when it's called, it returns the value
of the expression that's wrapped inside of it.
This syntactic convenience lets you omit braces around a function's parameter
by writing a normal expression instead of an explicit closure.

It's common to *call* functions that take autoclosures,
but it's not common to *implement* that kind of function.
For example,
the `assert(condition:message:file:line:)` function
takes an autoclosure for its `condition` and `message` parameters;
its `condition` parameter is evaluated only in debug builds
and its `message` parameter is evaluated only if `condition` is `false`.

An autoclosure lets you delay evaluation,
because the code inside isn't run until you call the closure.
Delaying evaluation is useful for code
that has side effects or is computationally expensive,
because it lets you control when that code is evaluated.
The code below shows how a closure delays evaluation.

```swift
var customersInLine = ["Chris", "Alex", "Ewa", "Barry", "Daniella"]
print(customersInLine.count)
// Prints "5"

let customerProvider = { customersInLine.remove(at: 0) }
print(customersInLine.count)
// Prints "5"

print("Now serving \(customerProvider())!")
// Prints "Now serving Chris!"
print(customersInLine.count)
// Prints "4"
```

<!--
  - test: `autoclosures`

  ```swifttest
  -> var customersInLine = ["Chris", "Alex", "Ewa", "Barry", "Daniella"]
  -> print(customersInLine.count)
  <- 5
  ---
  -> let customerProvider = { customersInLine.remove(at: 0) }
  -> print(customersInLine.count)
  <- 5
  ---
  -> print("Now serving \(customerProvider())!")
  <- Now serving Chris!
  -> print(customersInLine.count)
  <- 4
  ```
-->

<!--
  Using remove(at:) instead of popFirst() because the latter only works
  with ArraySlice, not with Array:
      customersInLine[0..<3].popLast()     // fine
      customersInLine[0..<3].popFirst()    // fine
      customersInLine.popLast()            // fine
      customersInLine.popFirst()           // FAIL
  It also returns an optional, which complicates the listing.
-->

<!--
  TODO: It may be worth describing the differences between ``lazy`` and autoclousures.
-->

Even though the first element of the `customersInLine` array is removed
by the code inside the closure,
the array element isn't removed until the closure is actually called.
If the closure is never called,
the expression inside the closure is never evaluated,
which means the array element is never removed.
Note that the type of `customerProvider` isn't `String`
but `() -> String` ---
a function with no parameters that returns a string.

You get the same behavior of delayed evaluation
when you pass a closure as an argument to a function.

```swift
// customersInLine is ["Alex", "Ewa", "Barry", "Daniella"]
func serve(customer customerProvider: () -> String) {
    print("Now serving \(customerProvider())!")
}
serve(customer: { customersInLine.remove(at: 0) } )
// Prints "Now serving Alex!"
```

<!--
  - test: `autoclosures-function`

  ```swifttest
  >> var customersInLine = ["Alex", "Ewa", "Barry", "Daniella"]
  /> customersInLine is \(customersInLine)
  </ customersInLine is ["Alex", "Ewa", "Barry", "Daniella"]
  -> func serve(customer customerProvider: () -> String) {
         print("Now serving \(customerProvider())!")
     }
  -> serve(customer: { customersInLine.remove(at: 0) } )
  <- Now serving Alex!
  ```
-->

The `serve(customer:)` function in the listing above
takes an explicit closure that returns a customer's name.
The version of `serve(customer:)` below
performs the same operation but, instead of taking an explicit closure,
it takes an autoclosure
by marking its parameter's type with the `@autoclosure` attribute.
Now you can call the function
as if it took a `String` argument instead of a closure.
The argument is automatically converted to a closure,
because the `customerProvider` parameter's type is marked
with the `@autoclosure` attribute.

```swift
// customersInLine is ["Ewa", "Barry", "Daniella"]
func serve(customer customerProvider: @autoclosure () -> String) {
    print("Now serving \(customerProvider())!")
}
serve(customer: customersInLine.remove(at: 0))
// Prints "Now serving Ewa!"
```

<!--
  - test: `autoclosures-function-with-autoclosure`

  ```swifttest
  >> var customersInLine = ["Ewa", "Barry", "Daniella"]
  /> customersInLine is \(customersInLine)
  </ customersInLine is ["Ewa", "Barry", "Daniella"]
  -> func serve(customer customerProvider: @autoclosure () -> String) {
         print("Now serving \(customerProvider())!")
     }
  -> serve(customer: customersInLine.remove(at: 0))
  <- Now serving Ewa!
  ```
-->

> Note: Overusing autoclosures can make your code hard to understand.
> The context and function name should make it clear
> that evaluation is being deferred.

If you want an autoclosure that's allowed to escape,
use both the `@autoclosure` and `@escaping` attributes.
The `@escaping` attribute is described above in <doc:Closures#Escaping-Closures>.

```swift
// customersInLine is ["Barry", "Daniella"]
var customerProviders: [() -> String] = []
func collectCustomerProviders(_ customerProvider: @autoclosure @escaping () -> String) {
    customerProviders.append(customerProvider)
}
collectCustomerProviders(customersInLine.remove(at: 0))
collectCustomerProviders(customersInLine.remove(at: 0))

print("Collected \(customerProviders.count) closures.")
// Prints "Collected 2 closures."
for customerProvider in customerProviders {
    print("Now serving \(customerProvider())!")
}
// Prints "Now serving Barry!"
// Prints "Now serving Daniella!"
```

<!--
  - test: `autoclosures-function-with-escape`

  ```swifttest
  >> var customersInLine = ["Barry", "Daniella"]
  /> customersInLine is \(customersInLine)
  </ customersInLine is ["Barry", "Daniella"]
  -> var customerProviders: [() -> String] = []
  -> func collectCustomerProviders(_ customerProvider: @autoclosure @escaping () -> String) {
         customerProviders.append(customerProvider)
     }
  -> collectCustomerProviders(customersInLine.remove(at: 0))
  -> collectCustomerProviders(customersInLine.remove(at: 0))
  ---
  -> print("Collected \(customerProviders.count) closures.")
  <- Collected 2 closures.
  -> for customerProvider in customerProviders {
         print("Now serving \(customerProvider())!")
     }
  <- Now serving Barry!
  <- Now serving Daniella!
  ```
-->

In the code above,
instead of calling the closure passed to it
as its `customerProvider` argument,
the `collectCustomerProviders(_:)` function
appends the closure to the `customerProviders` array.
The array is declared outside the scope of the function,
which means the closures in the array can be executed after the function returns.
As a result,
the value of the `customerProvider` argument
must be allowed to escape the function's scope.

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
