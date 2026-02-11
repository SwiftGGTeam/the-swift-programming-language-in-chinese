# 闭包

将执行的代码组合在一起，而不需要创建命名函数。

**闭包** 是可以在你的代码中传递和使用的独立功能块。Swift 中的闭包类似于其他编程语言中的匿名函数、lambda 表达式和代码块。

闭包可以捕获和存储其所在上下文中任意常量和变量的引用。这个过程可以看作是将这些常量和变量 **包含** 在闭包的作用域内。 Swift 会为你管理在捕获过程中涉及到的所有内存操作。

> 注意: 如果你不熟悉捕获（capturing）这个概念也不用担心。
> 在 <doc:Closures#值捕获> 章节有它更详细的介绍。

在 <doc:Functions> 章节中介绍的全局和嵌套函数实际上也是特殊的闭包，闭包采用如下三种形式之一：

- 全局函数是一个有名字但不会捕获任何值的闭包
- 嵌套函数是一个有名字并可以捕获其封闭函数域内值的闭包
- 闭包表达式是使用轻量级语法编写的匿名闭包，它们能够捕获其上下文中的值。

Swift 中的闭包表达式风格简洁明了，通过一系列优化，使得在常见的情况下可以写出简短而清晰的代码。主要优化如下：

- 利用上下文推断参数和返回值类型
- 单表达式闭包的隐式返回（可以省略 return 关键字）
- 简化参数名称
- 尾随闭包语法

## 闭包表达式

在 <doc:Functions#嵌套函数> 中介绍的嵌套函数，提供了一种便捷的方式，可以在较大的函数内部命名和定义自包含的代码块。然而，有时我们需要更简洁的函数式结构，而不必完整地声明函数名称。这在处理那些接受函数作为参数的函数或方法时特别有用。

**闭包表达式** 是一种以简短、集中的语法编写内联闭包的方法。在保证不丢失它语法清晰和意图的同时，闭包表达式提供了几种优化的语法简写形式。下面的闭包表达式通过对 `sorted(by:)` 这一示例的多次迭代来展示这个过程，每次迭代都使用了更加简洁的方式描述了相同功能。

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

`sorted(by:)` 方法接受一个闭包，该闭包函数需要传入与数组元素类型相同的两个值，并返回一个布尔类型值，来表明排序后第一个参数排在第二个参数前面还是后面。如果第一个参数值出现在第二个参数值 **前面**，排序闭包函数需要返回 `true`，反之返回 `false`。

该例子对一个 `String` 类型的数组进行排序，因此排序闭包函数类型需为 `(String, String) -> Bool`。

提供排序闭包函数的一种方式是编写一个正确类型的普通函数，并将其作为 `sorted(by:)` 方法的参数传入：

```swift
func backward(_ s1: String, _ s2: String) -> Bool {
    return s1 > s2
}
var reversedNames = names.sorted(by: backward)
// reversedNames 等于 ["Ewa", "Daniella", "Chris", "Barry", "Alex"]
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

如果第一个字符串 （ `s1` ） 大于第二个字符串 （ `s2` ），`backward(_:_:)` 函数将返回 `true`，表示在新的数组中 `s1` 应该出现在 `s2` 前。对于字符串中的字符，“大于”表示“在字母顺序较晚出现”。这意味着字母 `"B"` “大于”字母 `"A"`，字符串 `"Tom"` 大于字符串 `"Tim"`。这给出了一个字母逆序排序，将 `"Barry"` 放在 `"Alex"` 之前，依此类推。

然而，这是一种相当繁琐的编写方式，本质上是一个单表达式函数 (`a > b`)。对于这个例子来说，利用闭包表达式语法可以更好地构造一个内联排序闭包。

### 闭包表达式语法

闭包表达式语法的一般形式如下：

```swift
{ (<#parameters#>) -> <#return type#> in
   <#statements#>
}
```

闭包表达式语法中的 **参数** 可以是 in-out 参数，但不能具有默认值。如果你命名了可变参数，也可以使用可变参数。元组也可以用作参数类型和返回类型。

下面的示例展示了上面的 `backward(_:_:)` 函数对应的闭包表达式版本：

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

需要注意的是，内联闭包的参数和返回类型的声明与 `backward(_:_:)` 函数的声明相同。在这两种情况下，它都写为 `(s1: String, s2: String) -> Bool`。但是在内联闭包表达式中，参数和返回类型都写入 **大括号** 内，而不是大括号外。

闭包函数主体的开始以 `in` 关键字开始。这个关键字表示闭包的参数和返回类型定义已经结束，接下来是闭包的实际内容。

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

这说明对 `sorted(by:)` 方法的整体调用保持不变。一对括号仍然包裹着方法的整个参数。然而，参数现在变为了内联闭包。

### 根据上下文推断类型

因为排序闭包是作为参数传递给方法的，所以 Swift 可以推断其参数的类型和返回的值的类型。`sorted(by:)` 方法被一个字符串数组调用，因此其参数必须是 `(String, String) -> Bool` 类型的函数。这意味着 `(String, String)` 和 `Bool` 类型不需要作为闭包表达式定义的一部分。由于可以推断所有类型，因此也可以省略返回箭头 （ `->` ） 和参数名称两边的括号：


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

当将闭包作为内联表达式传递给函数或方法时，Swift 通常能够推断出参数类型和返回类型。这意味着，在使用闭包作为函数或方法参数时，你不必写出完整的闭包形式。

不过，如果你希望让代码更加清晰，也可以显式地声明类型。特别是当这样做能避免给读者造成歧义时，我们鼓励这种做法。以 `sorted(by:)` 方法为例，从排序这个操作就可以清楚地看出闭包的用途。读者可以安全地假设这个闭包很可能在处理 `String` 类型的值，因为它是用来协助对字符串数组进行排序的。

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

在这个例子中，`sorted(by:)` 方法的参数类型明确了闭包必须返回一个 `Bool` 值。因为闭包的主体包含了一个返回 `Bool` 值的单个表达式 （ `s1 > s2` ），因此不存在歧义，并且可以省略 `return` 关键字。

### 简写参数名称

Swift 自动为内联闭包提供了简写参数名称功能，你可以直接通过  `$0`、`$1`、`$2` 等来引用闭包参数的值，以此类推。

如果在闭包表达式中使用这些简写参数名，你可以省略闭包定义中的参数列表。Swift 会根据函数的预期类型来推断出这些简写参数的类型。你使用的最大编号的简写参数决定了闭包接受的参数数量。由于此时闭包表达式仅由其函数体组成，因此 `in` 关键字也可以省略：

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

在这个例子中，`$0` 和 `$1` 表示闭包的第一个和第二个 `String` 参数。由于 `$1` 是编号最大的简写参数，因此闭包可以理解为需要两个参数。因为这里的 `sorted(by:)` 函数需要一个参数都是字符串的闭包，所以简写参数 `$0` 和 `$1` 都是 `String` 类型。

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

实际上有一种 **更短** 的方法来编写上面的闭包表达式。Swift 的 `String` 类型定义了关于大于运算符 （ `>` ） 的字符串实现方法，该方法具有两个 `String` 类型的参数，并返回一个 `Bool` 类型的值。这正好符合 `sorted(by:)` 方法所需的函数类型。因此，你可以直接传入大于运算符，Swift 会推断出你想使用它的字符串特定实现：

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

更多关于运算符方法的内容请查看 <doc:AdvancedOperators#运算符方法>.

## 尾随闭包

如果你需要将闭包表达式作为函数的最后一个参数传递给函数，并且闭包表达式很长，则将其编写为 **尾随闭包** 的形式可能会很有用。在函数调用的括号后编写一个尾随闭包，该尾随闭包仍然会作为该函数的一个参数。使用尾随闭包语法时，不用在函数调用过程中为第一个闭包声明参数名。函数调用可以包含多个尾随闭包；但是，下面的前几个示例只使用了单个尾随闭包。

```swift
func someFunctionThatTakesAClosure(closure: () -> Void) {
    // 函数主体在这里
}

// 以下是如何在不使用尾随闭包的情况下调用此函数的示例：

someFunctionThatTakesAClosure(closure: {
    // 闭包的主体在这里
})

// 以下是如何使用尾随闭包调用此函数的示例：

someFunctionThatTakesAClosure() {
    // 尾随闭包的主体在这里
}
```

<!--
  - test: `closureSyntax`

  ```swifttest
  -> func someFunctionThatTakesAClosure(closure: () -> Void) {
        // function body goes here
     }

  -> // Here's how you call this function without using a trailing closure:

  -> someFunctionThatTakesAClosure(closure: {
        // closure's body goes here
     })

  -> // Here's how you call this function with a trailing closure instead:

  -> someFunctionThatTakesAClosure() {
        // trailing closure's body goes here
     }
  ```
-->

上面 <doc:Closures#闭包表达式语法> 部分的字符串排序闭包可以写在 `sorted(by:)` 方法的括号之外作为尾随闭包：

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


如果一个闭包表达式是函数或方法的唯一参数，并且把该表达式写作尾随闭包，则在调用函数或方法时，无需在函数名或方法名后编写一对括号 `()` ：

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

当闭包足够长以至于无法在单行上内联写入时，尾随闭包变得非常有用。例如，Swift 的 `Array` 类型有一个 `map(_:)` 方法，该方法将闭包表达式作为其唯一参数。对于数组中的每一个元素，都将调用一次闭包，并返回该元素的映射值（可能是其他类型的）。你可以通过在传递给 `map(_:)` 的闭包中编写代码来指定映射的性质和返回值的类型。

将提供的闭包应用于每个数组元素后，`map(_:)` 方法返回一个新数组，其中包含了所有新的映射值，其顺序与原始数组中的相应值相同。

下例是如何使用带有尾随闭包的 `map(_:)` 方法将 `Int` 类型数组转换为 `String` 类型数组。数组 `[16, 58, 510]` 用于创建新的数组 `["OneSix", "FiveEight", "FiveOneZero"]` ：

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

你现在可以通过将一个闭包表达式作为尾随闭包传递给数组的 `map(_:)` 方法， 来使用 `numbers` 数组创建一个 `String` 类型的数组。

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
// strings 的类型被推断为 [String]
// 它的值是 ["OneSix", "FiveEight", "FiveOneZero"]
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

`map(_:)` 方法为数组中的每个元素调用一次闭包表达式。你无需指定闭包的输入参数 `number` 的类型，因为可以从要映射的数组类型进行推断。

在这个例子中，变量 `number` 被初始化为闭包参数 `number` 的值，这样就可以在闭包内部修改这个值。（注意，函数和闭包的参数本身总是常量。）闭包表达式还指定了 `String` 作为返回类型，表明映射后的新数组将存储字符串类型的值。


闭包表达式每次调用时都会生成一个名为 `output` 的字符串。它使用求余运算符 （ `number % 10` ） 计算 `number` 的最后一位数字，并使用此数字在 `digitNames` 字典中查找所映射的字符串。这个闭包可用于创建任何一个大于零的整数的字符串表示形式。

> 注意: 对 `digitNames` 字典的下标访问后面跟着一个感叹号（ `!` ）。这是因为字典的下标返回一个可选值，表示如果键不存在，字典查找可能会失败。在上面的例子中，我们可以保证 number % 10 总是 digitNames 字典的有效键，所以使用感叹号来强制解包下标返回的可选 `String` 值。

从 `digitNames` 字典中获取的字符串会被添加到 `output` 的开头，这样就巧妙地实现了数字的反向字符串构建。（例如，`number % 10` 的计算结果：对于 `16` 得到 `6`，对于 `58` 得到 `8`，对于 `510` 得到 `0`。）

然后将 `number` 变量除以 `10`。因为它是一个整数，所以在除法过程中会向下舍入，所以 `16` 变成 `1` , `58` 变成 `5` , `510` 变成 `51` 。

重复该过程，直到 `number` 等于 `0`，此时闭包返回 `output` 字符串，并通过 `map(_:)` 方法添加到输出到映射数组中。

在上面的示例中使用尾随闭包语法，巧妙地在函数后封装了闭包的具体功能，而无需将整个闭包包裹在 `map(_:)` 方法的外括号中。

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

在此示例中，`loadPicture(from:completion:onFailure:)` 函数将其网络任务分配到后台，并在网络任务完成时调用两个完成处理程序之一。通过这种方法编写函数，可以清楚地将负责处理网络故障的代码与在成功下载后更新用户界面的代码分开，而不是只使用一个闭包处理两种情况。

> 注意: （完成处理）Completion handlers 可能会变得难以阅读，特别是当你需要嵌套多个处理时。一种替代方法是使用异步代码，详情请参阅 <doc:Concurrency>  章节。

## 值捕获

闭包可以从定义它的环境上下文中 **捕获** 常量和变量。即使定义这些常量和变量的原作用域已经不存在，闭包仍然可以在闭包函数体内引用和修改这些值。

在 Swift 中，可以捕获值的最简单的闭包形式是嵌套函数，它编写在另一个函数体中。嵌套函数可以捕获其外部函数的任何参数，也可以捕获在外部函数中定义的任何常量和变量。

`makeIncrementer(forIncrement:)` 函数有一个 `Int` 类型的参数，其参数标签是 `forIncrement`，参数名是 `amount`。传递给这个参数的值指定了每次调用返回的增量器函数时，`runningTotal` 应该增加的数量。`makeIncrementer` 函数内部定义了一个名为 `incrementer` 的嵌套函数，它执行实际的增量操作。这个函数只是将 `amount` 加到 `runningTotal` 上，并返回结果

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

`makeIncrementer` 的返回类型为 `() -> Int`。这意味着它返回一个 **函数**，而不是一个简单的值。它返回的函数没有参数，每次调用它时都返回一个 `Int` 值。要了解函数如何返回其他函数，请参阅  <doc:Functions#函数类型作为返回类型> 。

`makeIncrementer(forIncrement:)` 函数定义了一个名为 `runningTotal` 的整数变量，用于存储即将返回的增量器的当前累计总和。这个变量初始化为 `0`。

`makeIncrementer(forIncrement:)` 函数有一个 `Int` 类型的参数，其外部参数名为 `forIncrement`，内部参数名称为 `amount`。该参数值指定每次调用 incrementer 时将要增加的值 `runningTotal` 是多少。`makeIncrementer` 函数定义了一个名为 `incrementer` 的嵌套函数，该函数执行实际的增加操作。此函数只是将 `amount` 增加到 `runningTotal` 上，并返回结果。

如果单独看这个嵌套的 `incrementer()` 函数，可能会觉得有些奇怪：

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

`incrementer()` 函数没有任何参数，但它在函数体内引用了 `runningTotal` 和 `amount`。这是通过捕获外围函数中 `runningTotal` 和 `amoun`t 的 引用 来实现的，并在自己的函数体中使用这些引用。通过引用捕获可以确保当 `makeIncrementer` 函数调用结束时，`runningTotal` 和 `amount` 不会消失。同时，这也保证了在下次调用 `incrementer` 函数时，`runningTotal` 仍然可用。

> 注意: 作为一项优化，如果值不会被闭包改变，并且该值在创建闭包后不会改变，那么 Swift 可能会捕获并存储该值的 **副本**。
>
> Swift 也会负责被捕获变量涉及的所有内存管理工作，包括释放不再需要的变量。

下面是一个使用 `makeIncrementer` 的例子：

```swift
let incrementByTen = makeIncrementer(forIncrement: 10)
```

<!--
  - test: `closures`

  ```swifttest
  -> let incrementByTen = makeIncrementer(forIncrement: 10)
  ```
-->

这个例子定义了一个名为 `incrementByTen` 的常量，它引用了一个增量器函数。这个函数每次被调用时都会将其 `runningTotal` 变量增加 `10`。多次调用这个函数可以看到这个行为的实际效果：

```swift
incrementByTen()
// 返回值为 10
incrementByTen()
// 返回值为 20
incrementByTen()
// 返回值为 30
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

如果你创建第二个增量器，它会有自己的独立的 runningTotal 变量引用：

```swift
let incrementBySeven = makeIncrementer(forIncrement: 7)
incrementBySeven()
// 返回值为 7
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

再次调用原来的增量器（ `incrementByTen` ）会继续增加它自己的 `runningTotal` 变量，而不会影响 `incrementBySeven` 捕获的变量：

```swift
incrementByTen()
// 返回值为 40
```
--------
<!--
  - test: `closures`

  ```swifttest
  >> let r4 =
  -> incrementByTen()
  /> returns a value of \(r4)
  </ returns a value of 40
  ```
-->

> 注意: 如果将闭包赋值给类实例的属性，并且闭包通过引用实例或其成员来捕获该实例，则将在闭包和实例之间创建一个强循环引用。Swift 使用 **捕获列表** 来打破这些强循环引用。有关更多信息，请参阅 <doc:AutomaticReferenceCounting#闭包的强引用循环>.

## 闭包是引用类型

在上面的示例中，`incrementBySeven` 和 `incrementByTen` 是常量，但这些常量引用的闭包仍然能够递增它们捕获的 `runningTotal` 变量。这是因为函数和闭包是 **引用类型**。

每当你将函数或闭包赋值给一个常量或变量时，你实际上是在将该常量或变量设置为对函数或闭包的 **引用**。在上面的示例中，`incrementByTen` **引用** 的闭包选择是常量，而不是闭包本身的内容。

这也意味着，如果将闭包分配给两个不同的常量或变量，则这两个常量或变量都引用同一闭包。

```swift
let alsoIncrementByTen = incrementByTen
alsoIncrementByTen()
// 返回值为 50

incrementByTen()
// 返回值为 60
```

<!--
  - test: `closures`

  ```swifttest
  -> let alsoIncrementByTen = incrementByTen
  >> let r5 =
  -> alsoIncrementByTen()
  /> returns a value of \(r5)
  </ returns a value of 50

  >> let r6 =
  -> incrementByTen()
  /> returns a value of \(r6)
  </ returns a value of 60
  ```
-->

上面的示例表明，调用 `alsoIncrementByTen` 与调用 `incrementByTen` 相同。由于它们都引用相同的闭包，因此它们都会递增并返回相同的 runningTotal 值。

## 逃逸闭包

当闭包作为参数传递给函数，但是这个闭包在函数返回之后才被执行，该闭包被称为 **逃逸** 函数。当你声明一个将闭包作为其参数之一的函数时，你可以在参数的类型之前写入 `@escaping`，以表示这个闭包是允许逃逸的。

闭包逃逸的一种常见方式是将其存储在函数外部定义的变量中。例如，许多启动异步操作的函数会接受一个闭包作为完成处理器（completion handler）。这种函数在启动操作后就会返回，但闭包要等到操作完成后才会被调用——这就需要闭包逃逸，以便稍后调用。示例如下：

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

`someFunctionWithEscapingClosure(_:)` 函数将闭包作为其参数，并将其添加到函数外部声明的数组中。如果不用 `@escaping` 标记此函数的参数，则会收到编译错误。

在逃逸闭包中引用 `self` 时，如果 `self` 指向一个类的实例，就需要特别注意。在逃逸闭包中捕获 `self` 很容易意外创建强引用循环。关于引用循环的更多信息，请参见  <doc:AutomaticReferenceCounting> 。

通常情况下，闭包会通过在其体内使用变量来隐式捕获这些变量，但在这种情况下，你需要显式地进行捕获。如果你想捕获 `self`，在使用时要明确写出 self，或者将 self 包含在闭包的捕获列表中。明确地写出 `self` 可以表达你的意图，并提醒你检查是否存在引用循环。例如，在下面的代码中，传递给 `someFunctionWithEscapingClosure(_:)` 的闭包明确地引用了 `self`。相比之下，传递给 `someFunctionWithNonescapingClosure(_:)` 的闭包是一个非逃逸闭包，这意味着它可以隐式地引用 `self`。

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
// 打印 "200"。

completionHandlers.first?()
print(instance.x)
// 打印 "100"。
```

<!--
  - test: `noescape-closure-as-argument`

  ```swifttest
  -> func someFunctionWithNonescapingClosure(closure: () -> Void) {
         closure()
     }

  -> class SomeClass {
         var x = 10
         func doSomething() {
             someFunctionWithEscapingClosure { self.x = 100 }
             someFunctionWithNonescapingClosure { x = 200 }
         }
     }

  -> let instance = SomeClass()
  -> instance.doSomething()
  -> print(instance.x)
  <- 200

  -> completionHandlers.first?()
  -> print(instance.x)
  <- 100
  ```
-->

这是 `doSomething()` 的一个版本，它通过将 `self` 包含在闭包的捕获列表中来捕获 `self`，然后隐式引用 `self`：

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

如果 `self` 是结构体或枚举的实例，则始终可以隐式引用 `self`。但是逃逸闭包无法捕获其对 `self` 的可变引用。结构体和枚举不允许共享可变性，如 <doc:ClassesAndStructures#结构体和枚举是值类型> 中所述。

```swift
struct SomeStruct {
    var x = 10
    mutating func doSomething() {
        someFunctionWithNonescapingClosure { x = 200 }  // OK
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
             someFunctionWithNonescapingClosure { x = 200 }  // OK
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

在上面的示例中，对 `someFunctionWithEscapingClosure` 函数的调用是一个错误，因为它位于一个可变函数中，因此 `self` 是可变的。这违反了规则，即逃逸闭包不能捕获对结构的 `self` 的可变引用。

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

  >> completionHandlers = []
  >> var s = S()
  >> s.doSomething()
  >> s.x = 99  // No effect on self.x already captured -- S is a value type
  >> completionHandlers.first?()
  << 10
  ```
-->

## 自动闭包

**自动闭包** 是一种自动创建的闭包，用于包装作为参数传递给函数的表达式。它不接受任何参数，当它被调用时，它返回包裹在其内部的表达式的值。这种便利语法让你能够省略闭包的大括号，用一个普通的表达式来代替显式的闭包。

我们经常会 **调用** 采用自动闭包的函数，但是很少去 **实现** 这样的函数。例如，`assert(condition:message:file:line:)` 函数接受自动闭包作为它的 `condition` 和 `message` 参数; 其 `condition` 参数仅在 Debug 版本中计算，而其 `message` 参数仅在 `condition` 为 `false` 时计算。

自动闭包允许您延迟计算，因为在你调用这个闭包之前，内部代码不会运行。延迟计算对于有副作用或高计算成本的代码非常有用，因为它使得你能控制代码的执行时机。下面的代码展示了闭包如何延时计算。

```swift
var customersInLine = ["Chris", "Alex", "Ewa", "Barry", "Daniella"]
print(customersInLine.count)
// 打印 "5"。

let customerProvider = { customersInLine.remove(at: 0) }
print(customersInLine.count)
// 打印 "5"。

print("Now serving \(customerProvider())!")
// 打印 “Now serving Chris!”
print(customersInLine.count)
// 打印 "4"。
```

<!--
  - test: `autoclosures`

  ```swifttest
  -> var customersInLine = ["Chris", "Alex", "Ewa", "Barry", "Daniella"]
  -> print(customersInLine.count)
  <- 5

  -> let customerProvider = { customersInLine.remove(at: 0) }
  -> print(customersInLine.count)
  <- 5

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

即使 `customersInLine` 数组的第一个元素被闭包内的代码删除，但在实际调用闭包之前，不会删除数组中的元素。如果从不调用闭包，则永远不会计算闭包内的表达式，这意味着永远不会删除数组元素。请注意，`customerProvider` 的类型不是 `String`，而是 `() -> String` --- 一个返回字符串的没有参数的函数。

将闭包作为参数传递给函数时，你能获得同样的延时计算行为。

```swift
// customersInLine 是 ["Alex", "Ewa", "Barry", "Daniella"]
func serve(customer customerProvider: () -> String) {
    print("Now serving \(customerProvider())!")
}
serve(customer: { customersInLine.remove(at: 0) } )
// 打印 “Now serving Alex!”
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

上面列表中的 `serve(customer:)` 函数接受一个显式的闭包，该闭包返回顾客的名字。下面的 `serve(customer:)` 版本执行相同的操作，但它不接受显式的闭包，而是通过将其参数类型标记为 `@autoclosure` 特性来接受一个自动闭包。现在你可以调用这个函数，就像它接受一个 `String` 参数而不是闭包一样。因为 customerProvider 参数的类型被标记为 `@autoclosure` 特性，所以参数会自动转换为闭包。

```swift
// customersInLine 是 ["Ewa", "Barry", "Daniella"]
func serve(customer customerProvider: @autoclosure () -> String) {
    print("Now serving \(customerProvider())!")
}
serve(customer: customersInLine.remove(at: 0))
// 打印 “Now serving Ewa!”
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

> 注意: 过度使用自动闭包可能会使您的代码难以理解。上下文和函数名称应明确表示计算正在被推迟。

如果您想要允许一个自动闭包可以逃逸，请同时使用 `@autoclosure` 和 `@escaping` 属性。`@escaping` 属性在上面的 <doc:Closures#逃逸闭包> 中进行了描述。

```swift
// customersInLine 是 ["Barry", "Daniella"]
var customerProviders: [() -> String] = []
func collectCustomerProviders(_ customerProvider: @autoclosure @escaping () -> String) {
    customerProviders.append(customerProvider)
}
collectCustomerProviders(customersInLine.remove(at: 0))
collectCustomerProviders(customersInLine.remove(at: 0))

print("Collected \(customerProviders.count) closures.")
// 打印 “Collected 2 closures.”
for customerProvider in customerProviders {
    print("Now serving \(customerProvider())!")
}
// 打印 “Now serving Barry!”
// 打印 ”Now serving Daniella!“
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

  -> print("Collected \(customerProviders.count) closures.")
  <- Collected 2 closures.
  -> for customerProvider in customerProviders {
         print("Now serving \(customerProvider())!")
     }
  <- Now serving Barry!
  <- Now serving Daniella!
  ```
-->

在上面的代码中，`collectCustomerProviders(_:)` 函数将闭包追加到 `customerProviders` 数组中，而不是调用作为其 `customerProvider` 参数传递给它的闭包。数组是在函数的作用域之外声明的，这意味着数组中的闭包可以在函数返回后执行。因此 `customerProvider` 参数必须允许逃逸出函数的作用域。

<!--
This source file is part of the Swift.org open source project

Copyright (c) 2014 - 2022 Apple Inc. and the Swift project authors
Licensed under Apache License v2.0 with Runtime Library Exception

See https://swift.org/LICENSE.txt for license information
See https://swift.org/CONTRIBUTORS.txt for the list of Swift project authors
-->
