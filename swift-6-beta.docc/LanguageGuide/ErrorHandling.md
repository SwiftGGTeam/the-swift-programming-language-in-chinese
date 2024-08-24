# 错误处理

响应错误并从错误中恢复。

**错误处理(Error handling)** 是对程序中的错误条件做出响应并从中恢复的过程。Swift 为在运行时抛出、捕获、传递和处理可恢复错误提供了一等支持。

有些操作并不能保证总是能执行完成或生成有用的结果。可选类型用于表示值缺失，但当操作失败时，了解造成失败的原因有助于你的代码作出相应的应对。

以从磁盘文件读取和处理数据为例。该任务失败的原因有很多，包括指定路径下的文件不存在、文件没有读取权限或文件编码格式不兼容。通过区分这些不同的失败情况来让程序处理和解决一些错误，并将无法解决的错误告知用户。

> 注意:
> Swift 中的错误处理与 Cocoa 和 Objective-C 中使用 NSError 类的错误处理模式互操作。
> 有关该类的更多信息，请参阅 [在 Swift 中处理 Cocoa 错误](https://developer.apple.com/documentation/swift/cocoa_design_patterns/handling_cocoa_errors_in_swift).

## 表示与抛出错误

在 Swift 中，错误由遵循 Error 协议的类型值表示。这个空协议表示一种类型可用于错误处理。

Swift 枚举特别适用于一组相关的错误条件，枚举的关联值还可以提供错误状态的额外信息。例如，您可以用以下方式表示在游戏中操作自动售货机的错误条件：

```swift
enum VendingMachineError: Error {
    case invalidSelection                       // 不可选择
    case insufficientFunds(coinsNeeded: Int)    // 金额不足
    case outOfStock                             // 缺货
}
```

<!--
  - test: `throw-enum-error`

  ```swifttest
  -> enum VendingMachineError: Error {
         case invalidSelection
         case insufficientFunds(coinsNeeded: Int)
         case outOfStock
     }
  ```
-->

通过抛出错误可以让你表明发生了意外情况，导致正常的流程无法继续执行。您可以使用 throw 语句来抛出错误。例如，下面的代码抛出了一个错误，表示自动售货机还需要 5 枚硬币：

```swift
throw VendingMachineError.insufficientFunds(coinsNeeded: 5)
```

<!--
  - test: `throw-enum-error`

  ```swifttest
  -> throw VendingMachineError.insufficientFunds(coinsNeeded: 5)
  xx fatal error
  ```
-->

## 处理错误

当错误被抛出时，周围的部分代码必须负责处理该错误，例如，纠正这个问题、尝试其他方法或将错误通知用户。

在 Swift 中有四种处理错误的方法。您可以把函数抛出的错误传递给调用此函数的代码、使用 do-catch 语句处理错误、将错误作为可选类型处理、或者断言此错误根本不会发生。下文将对每种方法分段说明。

当函数抛出错误时，程序的流程会发生改变，因此快速识别代码中可能抛出错误的地方非常重要。
要识别代码中的这些地方，请在调用可能抛出错误的函数、方法或构造器的代码之前加上 `try` 关键字或 `try?` 或 `try!` 变体。
下文将对这些关键字进行说明。

> 注意:
> Swift 中的错误处理与其他语言中的错误处理类似，使用 `try`, `catch` and `throw` 关键字。
> 区别于其他语言（包括 Objective-C ）的是，Swift 中的错误处理并不涉及解除调用栈,而解除调用栈的过程可能会耗费大量计算资源。
> 因此，`throw` 语句的性能特征与 `return` 语句的性能特征相当。

### 用抛错函数传递错误

为了表示函数、方法或构造器可以抛出错误，您可以在函数声明中的参数后写入 `throws` 关键字。标有 `throws` 的函数称为 **抛错函数(throwing function)**。如果该函数指定了返回类型，则应在返回箭头（`->`）之前写入 `throws` 关键字。

<!--
  TODO Add discussion of throwing initializers
-->

```swift
func canThrowErrors() throws -> String

func cannotThrowErrors() -> String
```

<!--
  - test: `throwingFunctionDeclaration`

  ```swifttest
  -> func canThrowErrors() throws -> String
  >> { return "foo" }
  ---
  -> func cannotThrowErrors() -> String
  >> { return "foo" }
  ```
-->

<!--
  - test: `throwing-function-cant-overload-nonthrowing`

  ```swifttest
  -> func f() -> Int { return 10 }
  -> func f() throws -> Int { return 10 } // Error
  !$ error: invalid redeclaration of 'f()'
  !! func f() throws -> Int { return 10 } // Error
  !! ^
  !$ note: 'f()' previously declared here
  !! func f() -> Int { return 10 }
  !! ^
  ```
-->

<!--
  - test: `throwing-parameter-can-overload-nonthrowing`

  ```swifttest
  -> func f(callback: () -> Int) {}
  -> func f(callback: () throws -> Int) {} // Allowed
  ```
-->

<!--
  TODO: Add more assertions to test these behaviors
-->

<!--
  TODO: Write about the fact the above rules that govern overloading
  for throwing and nonthrowing functions.
-->

抛错函数会将内部抛出的错误传递到调用它的作用域。

> 注意:
> 只有抛错函数可以传递错误。任何在非抛错函数中抛出的错误都必须在函数内部处理。

在下面的示例中，
`VendingMachine` 类有一个 `vend(itemNamed:)` 方法。
该方法会在请求物品不存在、缺货或者投入金额小于物品价格时，抛出相应的 `VendingMachineError` 错误：

```swift
struct Item {
    var price: Int
    var count: Int
}

class VendingMachine {
    var inventory = [
        "Candy Bar": Item(price: 12, count: 7),
        "Chips": Item(price: 10, count: 4),
        "Pretzels": Item(price: 7, count: 11)
    ]
    var coinsDeposited = 0

    func vend(itemNamed name: String) throws {
        guard let item = inventory[name] else {
            throw VendingMachineError.invalidSelection
        }

        guard item.count > 0 else {
            throw VendingMachineError.outOfStock
        }

        guard item.price <= coinsDeposited else {
            throw VendingMachineError.insufficientFunds(coinsNeeded: item.price - coinsDeposited)
        }

        coinsDeposited -= item.price

        var newItem = item
        newItem.count -= 1
        inventory[name] = newItem

        print("Dispensing \(name)")
    }
}
```

<!--
  - test: `errorHandling`

  ```swifttest
  >> enum VendingMachineError: Error {
  >>     case invalidSelection
  >>     case insufficientFunds(coinsNeeded: Int)
  >>     case outOfStock
  >> }
  -> struct Item {
        var price: Int
        var count: Int
     }
  ---
  -> class VendingMachine {
  ->     var inventory = [
             "Candy Bar": Item(price: 12, count: 7),
             "Chips": Item(price: 10, count: 4),
             "Pretzels": Item(price: 7, count: 11)
         ]
  ->     var coinsDeposited = 0
  ---
  ->     func vend(itemNamed name: String) throws {
             guard let item = inventory[name] else {
                 throw VendingMachineError.invalidSelection
             }

             guard item.count > 0 else {
                 throw VendingMachineError.outOfStock
             }

             guard item.price <= coinsDeposited else {
                 throw VendingMachineError.insufficientFunds(coinsNeeded: item.price - coinsDeposited)
             }

             coinsDeposited -= item.price

             var newItem = item
             newItem.count -= 1
             inventory[name] = newItem

             print("Dispensing \(name)")
         }
     }
  ```
-->

在 `vend(itemNamed:)` 方法的实现中使用 `guard` 语句来确保在物品成功购买所需条件中不满足任一一个条件时提前退出方法并抛出相应的错误。
由于 `throw` 语句会立刻退出方法，所以物品只有在所有条件都满足时才会被售出。

由于 `vend(itemNamed:)` 方法会传递出它抛出的任何错误，
因此调用此方法的代码必须直接处理错误 ---
使用 `do`-`catch` 语句, `try?`, 或 `try!` ---
或者把这些错误继续传递下去。
例如,
下面例子中的 `buyFavoriteSnack(person:vendingMachine:)` 也是一个抛错函数，
所以 `vend(itemNamed:)` 方法抛出的任何错误将传递到调用 `buyFavoriteSnack(person:vendingMachine:)` 函数的位置。

```swift
let favoriteSnacks = [
    "Alice": "Chips",
    "Bob": "Licorice",
    "Eve": "Pretzels",
]
func buyFavoriteSnack(person: String, vendingMachine: VendingMachine) throws {
    let snackName = favoriteSnacks[person] ?? "Candy Bar"
    try vendingMachine.vend(itemNamed: snackName)
}
```

<!--
  - test: `errorHandling`

  ```swifttest
  -> let favoriteSnacks = [
         "Alice": "Chips",
         "Bob": "Licorice",
         "Eve": "Pretzels",
     ]
  -> func buyFavoriteSnack(person: String, vendingMachine: VendingMachine) throws {
         let snackName = favoriteSnacks[person] ?? "Candy Bar"
         try vendingMachine.vend(itemNamed: snackName)
     }
  >> var v = VendingMachine()
  >> v.coinsDeposited = 100
  >> try buyFavoriteSnack(person: "Alice", vendingMachine: v)
  << Dispensing Chips
  ```
-->

在这个示例中， `buyFavoriteSnack(person: vendingMachine:)` 函数会查找某人最喜欢的零食并尝试通过调用 `vend(itemNamed:)` 方法为其购买。
由于 `vend(itemNamed:)` 方法可能会出错，因此在调用该方法时会在前面加上 `try` 关键字。

抛出构造器错误的方式与抛出函数错误的方式相同。例如，下表中的 `PurchasedSnack` 结构体的构造器在初始化过程中调用了一个抛错函数，并将抛出的错误传递给这个构造器的调用者来处理这些错误。

```swift
struct PurchasedSnack {
    let name: String
    init(name: String, vendingMachine: VendingMachine) throws {
        try vendingMachine.vend(itemNamed: name)
        self.name = name
    }
}
```

<!--
  - test: `errorHandling`

  ```swifttest
  -> struct PurchasedSnack {
         let name: String
         init(name: String, vendingMachine: VendingMachine) throws {
             try vendingMachine.vend(itemNamed: name)
             self.name = name
         }
     }
  >> do {
  >>     let succeeds = try PurchasedSnack(name: "Candy Bar", vendingMachine: v)
  >>     print(succeeds)
  >> } catch {
  >>     print("Threw unexpected error.")
  >> }
  << Dispensing Candy Bar
  << PurchasedSnack(name: "Candy Bar")
  >> do {
  >>     let throwsError = try PurchasedSnack(name: "Jelly Baby", vendingMachine: v)
  >>     print(throwsError)
  >> } catch {
  >>     print("Threw EXPECTED error.")
  >> }
  << Threw EXPECTED error.
  ```
-->

### 使用 Do-Catch 处理错误

您可以使用 `do`-`catch` 语句通过运行闭包来处理错误。如果 `do` 子句中的代码抛出错误，就会与 `catch` 子句进行匹配，以确定哪个子句可以处理该错误。

下面是 `do`-`catch` 语句的一般形式：

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

您可以在 `catch` 后编写一个模式，以指示该子句可以处理哪些错误。如果 `catch` 子句没有模式，该子句将匹配任何错误，并将错误绑定到名为 `error` 的局部常量。有关模式匹配的更多信息，请参阅 <doc:Patterns>。

<!--
  TODO: Call out the reasoning why we don't let you
  consider a catch clause exhaustive by just matching
  the errors in an given enum without a general catch/default.
-->

例如，以下代码匹配了 `VendingMachineError` 枚举的全部三种情况。

```swift
var vendingMachine = VendingMachine()
vendingMachine.coinsDeposited = 8
do {
    try buyFavoriteSnack(person: "Alice", vendingMachine: vendingMachine)
    print("Success! Yum.")
} catch VendingMachineError.invalidSelection {
    print("Invalid Selection.")
} catch VendingMachineError.outOfStock {
    print("Out of Stock.")
} catch VendingMachineError.insufficientFunds(let coinsNeeded) {
    print("Insufficient funds. Please insert an additional \(coinsNeeded) coins.")
} catch {
    print("Unexpected error: \(error).")
}
// 打印 "Insufficient funds. Please insert an additional 2 coins."
```

<!--
  - test: `errorHandling`

  ```swifttest
  -> var vendingMachine = VendingMachine()
  -> vendingMachine.coinsDeposited = 8
  -> do {
         try buyFavoriteSnack(person: "Alice", vendingMachine: vendingMachine)
         print("Success! Yum.")
     } catch VendingMachineError.invalidSelection {
         print("Invalid Selection.")
     } catch VendingMachineError.outOfStock {
         print("Out of Stock.")
     } catch VendingMachineError.insufficientFunds(let coinsNeeded) {
         print("Insufficient funds. Please insert an additional \(coinsNeeded) coins.")
     } catch {
         print("Unexpected error: \(error).")
     }
  <- Insufficient funds. Please insert an additional 2 coins.
  ```
-->

在上面的示例中，`buyFavoriteSnack(person:vendingMachine:)` 函数在 `try` 表达式中被调用，因为它可能会抛出错误。
如果抛出错误，执行将立即转移到 `catch` 子句，由其决定是否继续传递。如果错误没有被匹配，它将被最后的 `catch` 子句捕获，并绑定到本地 `error` 常量。
如果没有错误抛出，则执行 `do` 语句中的其余语句。

`catch` 子句不必处理 `do` 子句中的代码可能抛出的所有错误。如果没有 `catch` 子句处理错误，则错误会传播到周围的作用域。但是，传播的错误必须由 **某个** 周围作用域处理。
在非抛错函数中， `do`-`catch` 语句必须处理错误。在抛错函数中，必须由 `do`-`catch` 语句或调用者处理错误。如果错误传递到了顶层作用域却依然没有被处理，则会出现运行时错误。

例如，在编写上述示例时，只要不是 `VendingMachineError` 中声明的错误，都会被调用函数捕获：

```swift
func nourish(with item: String) throws {
    do {
        try vendingMachine.vend(itemNamed: item)
    } catch is VendingMachineError {
        print("Couldn't buy that from the vending machine.")
    }
}

do {
    try nourish(with: "Beet-Flavored Chips")
} catch {
    print("Unexpected non-vending-machine-related error: \(error)")
}
// 打印 "Couldn't buy that from the vending machine."
```

<!--
  - test: `errorHandling`

  ```swifttest
  -> func nourish(with item: String) throws {
         do {
             try vendingMachine.vend(itemNamed: item)
         } catch is VendingMachineError {
             print("Couldn't buy that from the vending machine.")
         }
     }
  ---
  -> do {
         try nourish(with: "Beet-Flavored Chips")
     } catch {
         print("Unexpected non-vending-machine-related error: \(error)")
     }
  <- Couldn't buy that from the vending machine.
  ```
-->

在 `nourish(with:)` 函数中，如果 `vend(itemNamed:)` 抛出的错误属于 `VendingMachineError` 枚举的情况之一，`nourish(with:)` 会通过打印信息来处理该错误。
否则，`nourish(with:)` 会将错误传递到它的调用方。然后，该错误将被通用的 `catch` 子句捕获。

另一种捕获多个相关错误的方式是将它们放在 `catch` 后，并用逗号分隔。
例如：

```swift
func eat(item: String) throws {
    do {
        try vendingMachine.vend(itemNamed: item)
    } catch VendingMachineError.invalidSelection, VendingMachineError.insufficientFunds, VendingMachineError.outOfStock {
        print("Invalid selection, out of stock, or not enough money.")
    }
}
```

<!--
  - test: `errorHandling`

  ```swifttest
  -> func eat(item: String) throws {
         do {
             try vendingMachine.vend(itemNamed: item)
         } catch VendingMachineError.invalidSelection, VendingMachineError.insufficientFunds, VendingMachineError.outOfStock {
             print("Invalid selection, out of stock, or not enough money.")
         }
     }
  >> do {
  >>     try eat(item: "Beet-Flavored Chips")
  >> } catch {
  >>     print("Unexpected error: \(error)")
  >> }
  << Invalid selection, out of stock, or not enough money.
  ```
-->

<!--
  FIXME the catch clause is getting indented oddly in HTML output if I hard wrap it
-->

`eat(item:)` 函数列出了要捕获的自动售货机错误，其错误文本与它列出的相对应。如果列出来的三个错误中任意一个被抛出，该 `catch` 子句将通过打印一条消息来处理这些错误。
任何其他错误都会传播到周围的作用域，包括以后可能添加的任何自动售货机错误(`VendingMachineError`)。

### 将错误转换成可选值

您可以使用 `try?` 将错误转换为可选值来处理错误。如果在计算 `try?` 表达式时抛出错误，则表达式的值为 `nil` 。例如，在以下代码中，`x` 和 `y` 有着相同的数值和等价的含义：

```swift
func someThrowingFunction() throws -> Int {
    // ...
}

let x = try? someThrowingFunction()

let y: Int?
do {
    y = try someThrowingFunction()
} catch {
    y = nil
}
```

<!--
  - test: `optional-try`

  ```swifttest
  -> func someThrowingFunction() throws -> Int {
        // ...
  >>    return 40
  -> }
  ---
  -> let x = try? someThrowingFunction()
  >> print(x as Any)
  << Optional(40)
  ---
  -> let y: Int?
     do {
         y = try someThrowingFunction()
     } catch {
         y = nil
     }
  >> print(y as Any)
  << Optional(40)
  ```
-->

如果 `someThrowingFunction()` 抛出一个错误，泽 `x` 和 `y` 的值是 `nil`。
否则 `x` 和 `y` 的值就是该函数的返回值。注意，无论 `someThrowingFunction()` 的返回值类型是什么类型，`x` 和 `y` 都是这个类型的可选类型。
例子中此函数返回一个整型，所以 `x` 和 `y` 是可选整型。

使用 `try?` 可让您在希望以相同方式处理所有错误时编写简洁的错误处理代码。
例如，以下代码使用多种方法获取数据，如果所有方法都失败，则返回 `nil` 。

```swift
func fetchData() -> Data? {
    if let data = try? fetchDataFromDisk() { return data }
    if let data = try? fetchDataFromServer() { return data }
    return nil
}
```

<!--
  - test: `optional-try-cached-data`

  ```swifttest
  >> struct Data {}
  >> func fetchDataFromDisk() throws -> Data { return Data() }
  >> func fetchDataFromServer() throws -> Data { return Data() }
  -> func fetchData() -> Data? {
         if let data = try? fetchDataFromDisk() { return data }
         if let data = try? fetchDataFromServer() { return data }
         return nil
     }
  ```
-->

### 禁用错误传递

有时，您知道一个抛错函数或方法实际上不会在运行时抛出错误。
在这种情况下，您可以在表达式之前写入 `try!` 以禁用错误传递，并在运行时断言不会抛出错误的情况下封装调用。
如果实际抛出了错误，将会发生运行时错误。

例如，下面的代码使用了 `loadImage(atPath:)` 函数，该函数从给定的路径加载图片资源，如果无法加载图像则抛出一个错误。
在这种情况下，因为图片是和应用绑定的，运行时不会有错误抛出，所以适合禁用错误传递。

```swift
let photo = try! loadImage(atPath: "./Resources/John Appleseed.jpg")
```

<!--
  - test: `forceTryStatement`

  ```swifttest
  >> struct Image {}
  >> func loadImage(atPath path: String) throws -> Image {
  >>     return Image()
  >> }
  -> let photo = try! loadImage(atPath: "./Resources/John Appleseed.jpg")
  ```
-->

## 指定错误类型

上述所有示例都使用了最常见的错误处理方式，即代码抛出的错误可以是符合 `Error` 协议的任何类型的值。
这种方法符合实际情况，即您不可能提前知道代码运行时可能发生的所有错误，尤其是在传递其他地方抛出的错误时。
它还反映了一个事实，即错误会随着时间的推移而改变。
新版本的库，包括你的依赖库使用的库，可能会产生新的错误，而现实世界中用户配置的复杂性可能会暴露出开发或测试过程中不可见的故障模式。
上述示例中的错误处理代码始终包含一个默认情况，用于处理没有特定 `catch` 子句的错误。

大多数 Swift 代码都不会指定所抛出错误的类型。
不过，在以下特殊情况下，您可能会限制代码只抛出一种特定类型的错误：

- 在不支持动态分配内存的嵌入式系统上运行代码时。
  抛出 `any Error` 或其他封装的协议类型(boxed protocol type)的实例需要在运行时分配内存来存储错误。
  相比之下，抛出特定类型的错误可以让 Swift 避免为错误进行堆分配。

- 当错误是代码单元（如库）的实现细节，而不是代码接口的一部分时。
  由于错误只来自于库，而不是来自于其他依赖库或库的客户端，因此您可以列出所有可能出现的错误的详尽列表。
  而且，由于这些错误是库的实现细节，因此可以全部在库内部处理。

- 在只传递由通用参数描述的错误的代码中，例如函数接收一个闭包参数并传递来自该闭包的任何错误。
  有关传播特定错误类型与使用 rethrows 的比较，
  请参阅 <doc:Declarations#Rethrowing-Functions-and-Methods>。

例如，思考一下如何实现汇总评分并使用以下错误类型的代码：

```swift
enum StatisticsError: Error {
    case noRatings
    case invalidRating(Int)
}
```

要指定函数只抛出 `StatisticsError` 值作为其错误，
您可以在声明函数时写入 `throws(StatisticsError)` 而不是 `throws` 。
这种语法也被称为 **指定类型抛错(typed throws)**，因为您在声明中的 `throws` 后面指定了错误类型。
例如，下面的函数抛出 `StatisticsError` 值作为其错误。

```swift
func summarize(_ ratings: [Int]) throws(StatisticsError) {
    guard !ratings.isEmpty else { throw .noRatings }

    var counts = [1: 0, 2: 0, 3: 0]
    for rating in ratings {
        guard rating > 0 && rating <= 3 else { throw .invalidRating(rating) }
        counts[rating]! += 1
    }

    print("*", counts[1]!, "-- **", counts[2]!, "-- ***", counts[3]!)
}
```

上面的代码中，`summarize(_:)` 函数汇总了评分从 1 到 3 数量的列表。
如果输入无效，该函数将抛出 `StatisticsError` 实例。
上面代码中抛出错误的两个地方都省略了错误类型，因为函数已经指定了错误类型。
在这样的函数中抛出错误时，您可以使用省略形式 `throw .noRatings` 代替 `throw StatisticsError.noRatings` 。

当您在函数开头指定错误类型时，Swift 会检查您是否抛出了其他错误。
例如，如果您尝试在 `VendingMachineError` 函数中使用本章前面示例中的 `summarize(_:)` 函数，该代码将在编译时产生错误。

您可以在普通的抛错函数中调用使用指定类型抛错的函数：

```swift
func someThrowingFunction() -> throws {
    let ratings = [1, 2, 3, 2, 2, 1]
    try summarize(ratings)
}
```

上面的代码没有为 `someThrowingFunction()` 指定错误类型，因此它抛出了 `any Error`。
您也可以将错误类型写为 `throws(any Error)`; 下面的代码等同于上面的代码：

```swift
func someThrowingFunction() -> throws(any Error) {
    let ratings = [1, 2, 3, 2, 2, 1]
    try summarize(ratings)
}
```

在此代码中，`someThrowingFunction()` 会传递 `summarize(_:)` 抛出的任何错误。
`summarize(_：)` 抛出的错误总是 `StatisticsError` 值，这也是 `someThrowingFunction()` 可抛出的有效错误。

就像您可以使用 `Never` 的返回类型编写一个永不返回的函数一样，
您也可以使用 `throws(Never)` 编写一个永不抛错的函数：

```swift
func nonThrowingFunction() throws(Never) {
  // ...
}
```
这个函数不能抛错，因为不可能创建一个 `Never` 类型的值来抛出。

除了指定函数的错误类型外，您还可以为 `do`-`catch` 语句编写特定的错误类型子句。例如：

```swift
let ratings = []
do throws(StatisticsError) {
    try summarize(ratings)
} catch {
    switch error {
    case .noRatings:
        print("No ratings available")
    case .invalidRating(let rating):
        print("Invalid rating: \(rating)")
    }
}
// 打印 "No ratings available"
```

在此代码中，写入 `do throws(StatisticsError)` 表明 `do`-`catch` 语句抛出 `StatisticsError` 值作为其错误。
与其他 `do`-`catch` 语句一样，`catch` 子句可以处理所有可能的错误，也可以传递未处理的错误让周围的作用域处理。
此代码使用 `switch` 语句处理所有错误，每个枚举值有一个分支(case)。
与其他没有模式的 `catch` 子句一样，该子句匹配任何错误并将错误绑定到名为 `error` 的局部常量。
`do`-`catch` 语句会抛出 `StatisticsError` 值，所以 `error` 是 `StatisticsError` 类型的值。

上述 `catch` 子句使用 `switch` 语句来匹配和处理每个可能的错误。
如果您尝试在不更新错误处理代码的情况下为 `StatisticsError` 添加新的分支(case)，Swift 将提示您错误，因为 `switch` 语句不再穷尽所有分支。
对于捕获自身所有错误的库，您可以使用这种方法来确保任何新错误都有相应的新代码来处理。

如果函数或 `do` 闭包只抛出单一类型的错误，Swift 会推断该代码使用了指定类型抛错。
使用这种更短的语法，您可以将上述 `do`-`catch` 示例编写如下：

```swift
let ratings = []
do {
    try summarize(ratings)
} catch {
    switch error {
    case .noRatings:
        print("No ratings available")
    case .invalidRating(let rating):
        print("Invalid rating: \(rating)")
    }
}
// 打印 "No ratings available"
```

尽管上面的 `do`-`catch` 块没有指定它抛出的错误类型，Swift 仍会推断它抛出 `StatisticsError` 。
您可以显式地编写 `throws(any Error)` 以避免让 Swift 推断出指定类型抛错。

## 指定清理操作

您可以使用 `defer` 语句在代码执行离开当前代码块之前执行一组语句。
无论是以何种方式离开当前代码块--是由于抛出错误，还是由于 return 或 break 等语句，该语句都可让您执行任何必要的清理。
例如，您可以使用 `defer` 语句来确保关闭文件描述符，以及释放手动分配的内存。

`defer` 语句将代码的执行延迟到当前的作用域退出之前。
该语句由 `defer` 关键字和要被延迟执行的语句组成。
延迟执行的语句不能包含任何控制转移语句，例如 `break`、`return` 语句，或是抛出一个错误。
延迟执行的操作会按照它们声明的顺序从后往前执行——也就是说，第一条 `defer` 语句中的代码最后才执行，第二条 `defer` 语句中的代码倒数第二个执行，以此类推。
最后一条语句会第一个执行。

```swift
func processFile(filename: String) throws {
    if exists(filename) {
        let file = open(filename)
        defer {
            close(file)
        }
        while let line = try file.readline() {
            // 处理文件。
        }
        // close(file) 会在这里被调用，即作用域的最后。
    }
}
```

<!--
  - test: `defer`

  ```swifttest
  >> func exists(_ file: String) -> Bool { return true }
  >> struct File {
  >>    func readline() throws -> String? { return nil }
  >> }
  >> func open(_ file: String) -> File { return File() }
  >> func close(_ fileHandle: File) {}
  -> func processFile(filename: String) throws {
        if exists(filename) {
           let file = open(filename)
           defer {
              close(file)
           }
           while let line = try file.readline() {
              // Work with the file.
  >>          print(line)
           }
           // close(file) is called here, at the end of the scope.
        }
     }
  ```
-->

上面的示例使用 `defer` 语句确保 `open(_:)` 函数有相应的 `close(_:)` 调用。

即使不涉及错误处理代码，您也可以使用 `defer` 语句。
有关详细信息，请参阅 <doc:ControlFlow#Deferred-Actions>。

> 注意:
> 测试版软件
>
> 本文档包含有关正在开发的 API 或技术的初步信息。这些信息可能会发生变化，根据本文档开发实现的软件应与最终的操作系统软件一起进行测试。
>
> 点击了解更多关于使用 [Apple 测试版软件](https://developer.apple.com/support/beta-software/) 的信息。

<!--
This source file is part of the Swift.org open source project

Copyright (c) 2014 - 2022 Apple Inc. and the Swift project authors
Licensed under Apache License v2.0 with Runtime Library Exception

See https://swift.org/LICENSE.txt for license information
See https://swift.org/CONTRIBUTORS.txt for the list of Swift project authors
-->
