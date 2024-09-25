# 函数

定义和调用函数，标注参数并使用其返回值。

**函数(Functions)** 是执行特定任务的独立代码块。你可以通过给函数命名来标识某个函数的功能，这个名字可以被用来在需要的时候“调用”这个函数来完成它的任务。

Swift 的统一函数语法非常灵活，从没有形参名称的简单 C 风格函数到每个形参都有局部和外部参数名的复杂 Objective-C 风格方法，它都能表达。形参可以提供默认值，以简化函数调用，也可以作为 in-out 参数传递，在函数执行完毕后，传入的变量值将被修改。

Swift 中的每个函数都有一个类型，由函数的形参值类型和返回值类型组成。您可以像使用 Swift 中的其他类型一样使用该类型，这样就可以简单地将函数作为形参传递给其他函数，也可以从其他函数返回函数。或者还可以在其他函数中编写函数，以便在嵌套函数作用域中封装功能。

## 定义和调用函数
定义函数时，您可以定义一个或多个有名字和类型的值，作为函数的输入，即 **形参**。您还可以选择性地定义某种类型的值作为函数执行结束时的输出，即函数的 **返回类型**。

每个函数都有一个 **函数名**，它描述了函数执行的任务。要使用函数，您需要使用函数名“调用”该函数，并向其传递与函数形参类型相匹配的输入值（称为 **实参**）。函数的实参必须与函数形参表里的顺序一致。

下面示例中的函数名为 'greet(person:)'，因为它要做的就是接收一个人的姓名作为输入，并返回对这个人的问候语句。为此，您需要定义一个名为 `person` 的 `String` 输入参数值，以及一个包含对该人的问候语的 `String` 类型返回值：

```swift
func greet(person: String) -> String {
    let greeting = "Hello, " + person + "!"
    return greeting
}
```

<!--
  - test: `definingAndCalling`

  ```swifttest
  -> func greet(person: String) -> String {
        let greeting = "Hello, " + person + "!"
        return greeting
     }
  ```
-->

所有这些信息都汇总起来成为函数的 **定义(definition)** ，并以 **func** 作为前缀。使用 **返回箭头** `->`（连字符后跟一个直角括号），后面跟要返回的类型名称，来表示函数的返回类型。

定义描述了函数的作用、期望接收的内容以及完成后的返回内容。有了定义，就可以在代码的其他地方明确地调用函数：

```swift
print(greet(person: "Anna"))
// 打印 "Hello, Anna!"
print(greet(person: "Brian"))
// 打印 "Hello, Brian!"
```

<!--
  - test: `definingAndCalling`

  ```swifttest
  -> print(greet(person: "Anna"))
  <- Hello, Anna!
  -> print(greet(person: "Brian"))
  <- Hello, Brian!
  ```
-->

调用 `greet(person:)` 函数时，请在 `person` 参数标签后传递 `String` 值，例如 `greet(person: "Anna")` 。由于函数返回的是 `String` 类型的值，因此 `greet(person:)` 可以被包含在 `print(_:separator:terminator:)` 的调用中，用来输出这个函数的返回值，如上所示。

> 注意: `print(_:separator:terminator:)` 函数的第一个参数并没有设置一个标签，而其他的参数是可选的，因为他们已经有了默认值。
> 关于这些函数语法上的变化详见下方 <doc:Functions#Function-Argument-Labels-and-Parameter-Names> 和 <doc:Functions#Default-Parameter-Values>。

在 `greet(person:)` 的函数体中，先定义了一个新的名为 `greeting` 的 `String` 常量，并将其设置为简单的问候信息。然后用 `return` 关键字把这个问候返回出去。一旦 `return greeting` 被调用，该函数执行完毕并返回 `greeting` 的当前值。

您可以使用不同的输入值多次调用 `greet(person:)` 函数。上面的示例显示了在输入值为 `"Anna"` 和 `"Brian"` 时调用该函数的结果。在每种情况下，函数都会返回一个定制的问候语。

为了简化这个函数的定义，可以将消息的创建和返回语句合并为一行：

```swift
func greetAgain(person: String) -> String {
    return "Hello again, " + person + "!"
}
print(greetAgain(person: "Anna"))
// 打印 "Hello again, Anna!"
```

<!--
  - test: `definingAndCalling`

  ```swifttest
  -> func greetAgain(person: String) -> String {
        return "Hello again, " + person + "!"
     }
  -> print(greetAgain(person: "Anna"))
  <- Hello again, Anna!
  ```
-->

## 函数参数与返回值

Swift 中的函数参数和返回值非常灵活。您可以定义任何函数，从只带有单个未命名参数的简单实用程序函数，到带有丰富参数名和不同参数选项的复杂函数。

### 无参数函数

函数可以没有参数。下面这个函数就是一个无参数函数，每次它被调用时，总是返回固定的 `String` 消息：

```swift
func sayHelloWorld() -> String {
    return "hello, world"
}
print(sayHelloWorld())
// 打印 "hello, world"
```

<!--
  - test: `functionsWithoutParameters`

  ```swifttest
  -> func sayHelloWorld() -> String {
        return "hello, world"
     }
  -> print(sayHelloWorld())
  <- hello, world
  ```
-->

即使函数不需要任何参数，在函数定义的名称后仍需要加上括号。在调用函数时，函数名后面也要加上一对空括号。

### 多参数函数

函数可以有多个输入参数，这些参数写在函数的括号内，用逗号隔开。

下面的函数将一个人的名字和他是否被问候过作为输入，并返回适合该人的问候语：

```swift
func greet(person: String, alreadyGreeted: Bool) -> String {
    if alreadyGreeted {
        return greetAgain(person: person)
    } else {
        return greet(person: person)
    }
}
print(greet(person: "Tim", alreadyGreeted: true))
// 打印 "Hello again, Tim!"
```

<!--
  - test: `definingAndCalling`

  ```swifttest
  -> func greet(person: String, alreadyGreeted: Bool) -> String {
         if alreadyGreeted {
             return greetAgain(person: person)
         } else {
             return greet(person: person)
         }
     }
  -> print(greet(person: "Tim", alreadyGreeted: true))
  <- Hello again, Tim!
  ```
-->

您通过将标有 `person` 的 `String` 参数值和标有 `alreadyGreeted` 的 `Bool` 参数值同时传递给 `greet(person:alreadyGreeted:)` 函数，并用逗号隔开来调用它。请注意，该函数不同于前面章节中的 `greet(person:)` 函数。虽然这两个函数的名称都以 `greet` 开头，但 `greet(person:alreadyGreeted:)` 函数需要两个参数，而 `greet(person:)` 函数只需要一个参数。

### 无返回值函数

函数无需定义返回类型。下面是 `greet(person:)` 函数的另一个版本，它直接打印了一个 `String` 值，而不是返回它：

```swift
func greet(person: String) {
    print("Hello, \(person)!")
}
greet(person: "Dave")
// 打印 "Hello, Dave!"
```

<!--
  - test: `functionsWithoutReturnValues`

  ```swifttest
  -> func greet(person: String) {
        print("Hello, \(person)!")
     }
  -> greet(person: "Dave")
  <- Hello, Dave!
  ```
-->

因为这个函数不需要返回值，所以这个函数的定义中没有返回箭头（`->`）和返回类型。

> 注意:
> 严格来说，这个版本的 `greet(person:)` 函数 **确实** 仍然返回一个值，即使没有定义返回值。
> 没有定义返回类型的函数会返回 `Void` 类型的特殊值。
> 这是一个空元组，写成 `()`。

函数被调用时，其返回值可被忽略：

```swift
func printAndCount(string: String) -> Int {
    print(string)
    return string.count
}
func printWithoutCounting(string: String) {
    let _ = printAndCount(string: string)
}
printAndCount(string: "hello, world")
// 打印 "hello, world" 并返回 12
printWithoutCounting(string: "hello, world")
// 打印 "hello, world" 但没有返回值
```

<!--
  - test: `functionsWithoutReturnValues`

  ```swifttest
  -> func printAndCount(string: String) -> Int {
        print(string)
        return string.count
     }
  -> func printWithoutCounting(string: String) {
        let _ = printAndCount(string: string)
     }
  >> let a =
  -> printAndCount(string: "hello, world")
  << hello, world
  >> assert(a == 12)
  // prints "hello, world" and returns a value of 12
  -> printWithoutCounting(string: "hello, world")
  << hello, world
  // prints "hello, world" but doesn't return a value
  ```
-->

<!--
  Rewrite the above to avoid bare expressions.
  Tracking bug is <rdar://problem/35301593>
-->

第一个函数 `printAndCount(string:)` 打印一个字符串并返回 `Int` 类型的字符数。第二个函数 `printWithoutCounting(string:)` 调用了第一个函数，但是忽略了它的返回值。当第二个函数被调用时，消息依然会被第一个函数打印，但是返回值不会被用到。

> 注意: 
> 返回值可以被忽略，但定义了有返回值的函数必须返回一个值，如果在函数定义底部没有返回任何值，将导致编译时错误。

<!--
FIXME Unless the function is marked @discardableResult,
ignoring its return value triggers a compile-time warning.

If the returned value is coincidental
marking with @discardableResult is good,
like array.removeFirst(...) ---
otherwise, using `_ = foo()` at the call site is better.
-->

### 多重返回值函数

你可以用元组（tuple）类型让多个值作为一个复合值从函数中返回。

下面的示例定义了一个名为 `minMax(array:)` 的函数，用于查找 `Int` 数组中最小值和最大值：

```swift
func minMax(array: [Int]) -> (min: Int, max: Int) {
    var currentMin = array[0]
    var currentMax = array[0]
    for value in array[1..<array.count] {
        if value < currentMin {
            currentMin = value
        } else if value > currentMax {
            currentMax = value
        }
    }
    return (currentMin, currentMax)
}
```

<!--
  - test: `tupleTypesAsReturnTypes`

  ```swifttest
  -> func minMax(array: [Int]) -> (min: Int, max: Int) {
        var currentMin = array[0]
        var currentMax = array[0]
        for value in array[1..<array.count] {
           if value < currentMin {
              currentMin = value
           } else if value > currentMax {
              currentMax = value
           }
        }
        return (currentMin, currentMax)
     }
  ```
-->

`minMax(array:)` 函数返回一个包含两个 `Int` 值的元组。这些值被标记为 `min` 和 `max` 以便在查询函数返回值时可以通过名称访问它们。

在 `minMax(array:)` 的函数体中，在开始的时候设置两个工作变量 `currentMin` 和 `currentMax` 的值为数组中的第一个数。然后函数会遍历数组中剩余的值并检查该值是否分别小于或大于 `currentMin` 和 `currentMax`。最后数组中的最小值与最大值作为一个包含两个 `Int` 值的元组返回。

由于元组的成员值已经被命名，因此可以使用点语法访问它们，以获取最小值和最大值：

```swift
let bounds = minMax(array: [8, -6, 2, 109, 3, 71])
print("min is \(bounds.min) and max is \(bounds.max)")
// 打印 "min is -6 and max is 109"
```

<!--
  - test: `tupleTypesAsReturnTypes`

  ```swifttest
  -> let bounds = minMax(array: [8, -6, 2, 109, 3, 71])
  -> print("min is \(bounds.min) and max is \(bounds.max)")
  <- min is -6 and max is 109
  ```
-->

请注意，元组的成员无需在元组从函数中返回时命名，因为它们的名字已经在函数返回类型中指定了。

#### 可选元组返回类型

如果函数返回的元组类型有可能整个元组都“没有值”，你可以使用 **可选** 元组返回类型反映整个元组可以是 `nil` 的事实。您可以通过在元组类型的结尾括号后放置问号来定义可选的元组返回类型，例如 `(Int, Int)?` 或 `(String, Int, Bool)?`。

> 注意: 可选元组类型如 `(Int, Int)?` 与元组包含可选类型如 `(Int?, Int?)` 是不同的。
> 可选的元组类型，整个元组是可选的，而不只是元组中的每个元素值。

上面的 `minMax(array:)` 函数返回一个包含两个 `Int` 值的元组。但是，该函数没有对传入的数组执行任何安全检查。如果 `array` 参数为一个空数组，则上面定义的 `minMax(array:)` 函数在尝试访问 `array[0]` 时将触发运行时错误。

为了安全地处理空数组问题，将 `minMax(array:)` 函数改写为使用可选元组返回类型，并且当数组为空时返回 `nil`：

```swift
func minMax(array: [Int]) -> (min: Int, max: Int)? {
    if array.isEmpty { return nil }
    var currentMin = array[0]
    var currentMax = array[0]
    for value in array[1..<array.count] {
        if value < currentMin {
            currentMin = value
        } else if value > currentMax {
            currentMax = value
        }
    }
    return (currentMin, currentMax)
}
```

<!--
  - test: `tupleTypesAsReturnTypes2`

  ```swifttest
  -> func minMax(array: [Int]) -> (min: Int, max: Int)? {
        if array.isEmpty { return nil }
        var currentMin = array[0]
        var currentMax = array[0]
        for value in array[1..<array.count] {
           if value < currentMin {
              currentMin = value
           } else if value > currentMax {
              currentMax = value
           }
        }
        return (currentMin, currentMax)
     }
  ```
-->

您可以使用可选绑定来检查此版本的 `minMax(array:)` 函数是返回实际元组值还是 `nil` 值：

```swift
if let bounds = minMax(array: [8, -6, 2, 109, 3, 71]) {
    print("min is \(bounds.min) and max is \(bounds.max)")
}
// 打印 "min is -6 and max is 109"
```

<!--
  - test: `tupleTypesAsReturnTypes2`

  ```swifttest
  -> if let bounds = minMax(array: [8, -6, 2, 109, 3, 71]) {
        print("min is \(bounds.min) and max is \(bounds.max)")
     }
  <- min is -6 and max is 109
  ```
-->

### 隐式返回的函数

如果函数的整个主体是一个表达式，则函数隐式返回该表达式。例如，下面的两个函数具有相同的行为：

```swift
func greeting(for person: String) -> String {
    "Hello, " + person + "!"
}
print(greeting(for: "Dave"))
// 打印 "Hello, Dave!"

func anotherGreeting(for person: String) -> String {
    return "Hello, " + person + "!"
}
print(anotherGreeting(for: "Dave"))
// 打印 "Hello, Dave!"
```

<!--
  - test: `implicit-func-return`

  ```swifttest
  -> func greeting(for person: String) -> String {
        "Hello, " + person + "!"
     }
  -> print(greeting(for: "Dave"))
  <- Hello, Dave!
  ---
  -> func anotherGreeting(for person: String) -> String {
        return "Hello, " + person + "!"
     }
  -> print(anotherGreeting(for: "Dave"))
  <- Hello, Dave!
  ```
-->

`greeting(for:)` 函数的完整定义就是它返回的问候信息，这意味着它可以使用这种较短的形式。`anotherGreeting(for:)` 函数使用 `return` 关键字返回相同的问候信息但显得函数更长。如果您编写的函数只有一行 `return` ，则可以省略 `return` 。

正如你将会在 <doc:Properties#Shorthand-Getter-Declaration> 里看到的，属性的 getter 也可以使用隐式返回。

> 注意: 
> 作为隐式返回值编写的代码必须返回某个值。
> 例如，你不能使用 `print(13)` 作为隐式返回值。
> 然而，你可以使用不返回值的函数（如 `fatalError("Oh no!")`）作为隐式返回值，因为 Swift 知道它们并不会产生任何隐式返回。

<!--
  - test: `implicit-return-print-instead`

  ```swifttest
  // This is ok:
  >> func testFatal() -> Int {
  >>     fatalError("Oh no!")
  >> }
  ---
  // But not this:
  >> func testPrint() -> Int {
  >>     print(13)
  >> }
  !$ error: cannot convert return expression of type '()' to return type 'Int'
  !! print(13)
  !! ^~~~~~~~~
  ```
-->

## 函数参数标签和参数名称

每个函数参数都有一个 **参数标签（argument label）** 和 **参数名称（parameter name）**。参数标签在调用函数时使用；调用的时候需要将函数的参数标签写在对应的参数前面。参数名称用于函数的实现；默认情况下，函数参数使用参数名称来作为它们的参数标签。

```swift
func someFunction(firstParameterName: Int, secondParameterName: Int) {
    // 在函数体内，firstParameterName 和 secondParameterName 代表参数中的第一个和第二个参数值
}
someFunction(firstParameterName: 1, secondParameterName: 2)
```

<!--
  - test: `functionParameterNames`

  ```swifttest
  -> func someFunction(firstParameterName: Int, secondParameterName: Int) {
        // In the function body, firstParameterName and secondParameterName
        // refer to the argument values for the first and second parameters.
     }
  -> someFunction(firstParameterName: 1, secondParameterName: 2)
  ```
-->

所有参数都必须有唯一的名称。虽然多个参数有可能具有相同的参数标签，但唯一的参数标签有助于提高代码的可读性。

<!--
  - test: `non-unique-external-name`

  ```swifttest
  -> func foo(external a: Int, external b: Int) {}
  -> foo(external: 7, external: 12)
  ```
-->

### 指定参数标签

在参数名之前写入参数标签，用空格隔开：

```swift
func someFunction(argumentLabel parameterName: Int) {
    // In the function body, parameterName refers to the argument value
    // for that parameter.
}
```

<!--
  - test: `externalParameterNames`

  ```swifttest
  -> func someFunction(argumentLabel parameterName: Int) {
        // In the function body, parameterName refers to the argument value
        // for that parameter.
     }
  ```
-->

下面是 `greet(person:)` 函数的一个变体，它接收一个人的名字和家乡，并返回一个问候语：

```swift
func greet(person: String, from hometown: String) -> String {
    return "Hello \(person)!  Glad you could visit from \(hometown)."
}
print(greet(person: "Bill", from: "Cupertino"))
// 打印 "Hello Bill!  Glad you could visit from Cupertino."
```

<!--
  - test: `externalParameterNames`

  ```swifttest
  -> func greet(person: String, from hometown: String) -> String {
         return "Hello \(person)!  Glad you could visit from \(hometown)."
     }
  -> print(greet(person: "Bill", from: "Cupertino"))
  <- Hello Bill!  Glad you could visit from Cupertino.
  ```
-->

参数标签的使用能够让一个函数在调用时更有表达力，更类似自然语言，并且仍保持了函数内部的可读性以及清晰的意图。

### 省略参数标签

如果不需要参数的参数标签，请写一个下划线（`_`）来代替该参数的显式参数标签。

```swift
func someFunction(_ firstParameterName: Int, secondParameterName: Int) {
    // 在函数体内，firstParameterName 和 secondParameterName 代表参数中的第一个和第二个参数值
}
someFunction(1, secondParameterName: 2)
```

<!--
  - test: `omittedExternalParameterNames`

  ```swifttest
  -> func someFunction(_ firstParameterName: Int, secondParameterName: Int) {
        // In the function body, firstParameterName and secondParameterName
        // refer to the argument values for the first and second parameters.
     }
  -> someFunction(1, secondParameterName: 2)
  ```
-->

如果参数有参数标签，则在调用函数时 **必须** 使用标签来标示参数。

### 默认参数值

你可以在函数体中通过给参数赋值来为任意一个 **参数定义默认值（Deafult Value）**。如果定义了默认值，您就可以在调用函数时省略该参数。

```swift
func someFunction(parameterWithoutDefault: Int, parameterWithDefault: Int = 12) {
    // 如果你在调用时候不传第二个参数，parameterWithDefault 会值为 12 传入到函数体中。
}
someFunction(parameterWithoutDefault: 3, parameterWithDefault: 6) // parameterWithDefault is 6
someFunction(parameterWithoutDefault: 4) // parameterWithDefault is 12
```

<!--
  - test: `omittedExternalParameterNames`

  ```swifttest
  -> func someFunction(parameterWithoutDefault: Int, parameterWithDefault: Int = 12) {
        // If you omit the second argument when calling this function, then
        // the value of parameterWithDefault is 12 inside the function body.
     }
  -> someFunction(parameterWithoutDefault: 3, parameterWithDefault: 6) // parameterWithDefault is 6
  -> someFunction(parameterWithoutDefault: 4) // parameterWithDefault is 12
  ```
-->

将不带有默认值的参数放在函数参数列表的最前。没有缺省值的参数通常对函数的意义更为重要--将它们写在前面，无论是否省略了任何缺省参数，都能更容易地识别出调用的是同一个函数。

### 可变参数

**可变参数（variadic parameter）** 接受零个或多个指定类型的值。使用可变参数可以指定在调用函数时，参数可以传入不同数量的输入值。通过在参数类型名称后插入三个句点字符（`...`）来编写可变参数。

可变参数的值将在函数体中变为相应类型的数组。例如，名称为 `numbers` 和类型为 `Double...` 的可变参数，在函数体中以名为 `numbers` 类型为 `[Double]` 的数组常量形式提供。

下面的示例计算任意长度数字列表的 **算术平均数（arithmetic mean）**（也称为 **平均值（average）**）：

```swift
func arithmeticMean(_ numbers: Double...) -> Double {
    var total: Double = 0
    for number in numbers {
        total += number
    }
    return total / Double(numbers.count)
}
arithmeticMean(1, 2, 3, 4, 5)
// 返回 3.0，是这 5 个数的平均数
arithmeticMean(3, 8.25, 18.75)
// 返回 10.0，是这 3 个数的平均数
```

<!--
  - test: `variadicParameters`

  ```swifttest
  -> func arithmeticMean(_ numbers: Double...) -> Double {
        var total: Double = 0
        for number in numbers {
           total += number
        }
        return total / Double(numbers.count)
     }
  >> let r0 =
  -> arithmeticMean(1, 2, 3, 4, 5)
  /> returns \(r0), which is the arithmetic mean of these five numbers
  </ returns 3.0, which is the arithmetic mean of these five numbers
  >> let r1 =
  -> arithmeticMean(3, 8.25, 18.75)
  /> returns \(r1), which is the arithmetic mean of these three numbers
  </ returns 10.0, which is the arithmetic mean of these three numbers
  ```
-->

<!--
  Rewrite the above to avoid bare expressions.
  Tracking bug is <rdar://problem/35301593>
-->

一个函数可以有多个可变参数。可变参数之后的第一个形参必须有参数标签。通过参数标签，可以清楚地知道哪些参数传递给可变参数，哪些参数传递给可变参数之后的形参。

<!--
  - test: `variadic-parameters-and-labels`

  ```swifttest
  // Labeled, immediately after
  >> func f(_ a: Int..., b: String) {}
  ---
  // Unlabeled, not immediately after
  >> func g(_ a: Int..., b: String, _ c: Int) {}
  ---
  // Multiple
  >> func h(_a: Int..., b: String, _ c: Int..., d: String) {}
  ```
-->

<!--
  - test: `variadic-parameters-and-labels-failure`

  ```swifttest
  // Unlabeled, immediately after
  >> func f(_ a: Int..., _ b: String) {}
  !$ error: a parameter following a variadic parameter requires a label
  !! func f(_ a: Int..., _ b: String) {}
  !! ^
  ```
-->

### 输入输出参数

函数参数默认为常量。在函数体中更改函数参数的值会导致编译时错误。这意味着您不能错误地更改参数的值。如果您希望函数修改参数的值，并希望这些更改在函数调用结束后仍然有效，请将该参数定义为 **in-out parameter（输入输出参数）**。

您可以通过在参数类型前添加 `inout` 关键字来编写输入输出参数。输入输出参数有一个值，该值 **传入** 给函数，被函数修改后，然后被 **传出** 函数，以替换原来的值。有关传入传出参数行为及相关编译器优化的详细讨论，请参阅 <doc:Declarations#In-Out-Parameters>。

你只能传递变量给输入输出参数。不能传入常量或者字面量，因为这些是不能被修改的。当传入的参数作为输入输出参数时，需要在参数名前加 （`&`） 符，表示这个值可以被函数修改。

> 注意: 
> 输入输出参数不能有默认值，而且可变参数不能标记为 `inout`。

下例中，`swapTwoInts(_:_:)` 函数有两个分别叫做 `a` 和 `b` 的输入输出参数：

```swift
func swapTwoInts(_ a: inout Int, _ b: inout Int) {
    let temporaryA = a
    a = b
    b = temporaryA
}
```

<!--
  - test: `inoutParameters`

  ```swifttest
  -> func swapTwoInts(_ a: inout Int, _ b: inout Int) {
        let temporaryA = a
        a = b
        b = temporaryA
     }
  ```
-->

`swapTwoInts(_:_:)` 函数简单地交换 `a` 与 `b` 的值。该函数先将 `a` 的值存到一个临时常量 `temporaryA` 中，然后将 `b` 的值赋给 `a`，最后将 `temporaryA` 赋值给 `b`。

您可以使用两个类型为 `Int` 的变量调用 `swapTwoInts(_:_:)` 函数来交换它们的值。请注意，`someInt` 和 `anotherInt` 在传递给 `swapTwoInts(_：_:)` 函数前，都加了 & 前缀：

```swift
var someInt = 3
var anotherInt = 107
swapTwoInts(&someInt, &anotherInt)
print("someInt is now \(someInt), and anotherInt is now \(anotherInt)")
// 打印 "someInt is now 107, and anotherInt is now 3"
```

<!--
  - test: `inoutParameters`

  ```swifttest
  -> var someInt = 3
  -> var anotherInt = 107
  -> swapTwoInts(&someInt, &anotherInt)
  -> print("someInt is now \(someInt), and anotherInt is now \(anotherInt)")
  <- someInt is now 107, and anotherInt is now 3
  ```
-->

上面的示例展示了 `someInt` 和 `anotherInt` 的原始值被 `swapTwoInt(_：_:)` 函数修改，即使它们是在函数体外定义的。

> 注意: 
> 输入输出参数和函数的返回值是不一样的。
> 上面的 `swapTwoInts` 函数并没有定义任何返回类型或返回值，但仍然修改了 `someInt` 和 `anotherInt` 的值。
> 输入输出参数是函数在其函数体范围之外产生影响的另一种方式。

<!--
  TODO: you can pass a subproperty of something as an inout reference.
  Would be great to show an example of this as a way to avoid temporary variables.
-->

## 函数类型

每个函数都有一个特定的 **函数类型**，由函数的参数类型和返回类型组成。

例如：

```swift
func addTwoInts(_ a: Int, _ b: Int) -> Int {
    return a + b
}
func multiplyTwoInts(_ a: Int, _ b: Int) -> Int {
    return a * b
}
```

<!--
  - test: `functionTypes`

  ```swifttest
  -> func addTwoInts(_ a: Int, _ b: Int) -> Int {
        return a + b
     }
  >> print(type(of: addTwoInts))
  << (Int, Int) -> Int
  -> func multiplyTwoInts(_ a: Int, _ b: Int) -> Int {
        return a * b
     }
  >> print(type(of: multiplyTwoInts))
  << (Int, Int) -> Int
  ```
-->

此示例定义了两个简单的数学函数，分别称为 `addTwoInt` 和 `multiplyTwoInt`。这些函数分别接收两个 `Int` 值，并返回一个 `Int` 值，执行有关的数学运算的结果。

这两个函数的类型都是 `(Int, Int) -> Int`。这可以理解为：

“这个函数类型有两个 `Int` 型的参数并返回一个 `Int` 型的值”。

下面是另一个例子，一个没有参数或返回值的函数：

```swift
func printHelloWorld() {
    print("hello, world")
}
```

<!--
  - test: `functionTypes`

  ```swifttest
  -> func printHelloWorld() {
        print("hello, world")
     }
  >> print(type(of: printHelloWorld))
  << () -> ()
  ```
-->

该函数的类型是 `() -> Void`，或“没有参数，并返回 `Void` 类型的函数”。

### 使用函数类型

在 Swift 中，您可以像使用其他类型一样使用函数类型。例如，你可以定义一个类型为函数的常量或变量，并将适当的函数赋值给它：

```swift
var mathFunction: (Int, Int) -> Int = addTwoInts
```

<!--
  - test: `functionTypes`

  ```swifttest
  -> var mathFunction: (Int, Int) -> Int = addTwoInts
  ```
-->

这可以理解为：

”定义一个叫做 `mathFunction` 的变量，类型是‘接收两个 `Int` 值并返回一个 `Int` 值的函数’。将此新变量设置为引用名为 `addTwoInts` 的函数"。

`addTwoInts(_:_:)` 函数与 `mathFunction` 变量具有相同的类型，所以这个赋值过程在 Swift 类型检查（type-check）中是允许的。

现在，你可以用 `mathFunction` 来调用被赋值的函数了：

```swift
print("Result: \(mathFunction(2, 3))")
// Prints "Result: 5"
```

<!--
  - test: `functionTypes`

  ```swifttest
  -> print("Result: \(mathFunction(2, 3))")
  <- Result: 5
  ```
-->

与非函数类型相同，具有相同匹配类型的不同函数也可以分配给同一个变量：

```swift
mathFunction = multiplyTwoInts
print("Result: \(mathFunction(2, 3))")
// 打印 "Result: 6"
```

<!--
  - test: `functionTypes`

  ```swifttest
  -> mathFunction = multiplyTwoInts
  -> print("Result: \(mathFunction(2, 3))")
  <- Result: 6
  ```
-->

与其他类型一样，当您将函数赋值给常量或变量时，可以让 Swift 来推断函数类型：

```swift
let anotherMathFunction = addTwoInts
// anotherMathFunction 被推断为 (Int, Int) -> Int 类型
```

<!--
  - test: `functionTypes`

  ```swifttest
  -> let anotherMathFunction = addTwoInts
  >> print(type(of: anotherMathFunction))
  << (Int, Int) -> Int
  // anotherMathFunction is inferred to be of type (Int, Int) -> Int
  ```
-->

<!--
  TODO: talk about defining typealiases for function types somewhere?
-->

### 函数类型作为参数类型

您可以使用函数类型例如 `(Int, Int) -> Int` 作为另一个函数的参数类型。这样你可以将函数的一部分实现留给函数的调用者来提供。

下面是一个打印上述数学函数结果的示例：

```swift
func printMathResult(_ mathFunction: (Int, Int) -> Int, _ a: Int, _ b: Int) {
    print("Result: \(mathFunction(a, b))")
}
printMathResult(addTwoInts, 3, 5)
// 打印 "Result: 8"
```

<!--
  - test: `functionTypes`

  ```swifttest
  -> func printMathResult(_ mathFunction: (Int, Int) -> Int, _ a: Int, _ b: Int) {
        print("Result: \(mathFunction(a, b))")
     }
  -> printMathResult(addTwoInts, 3, 5)
  <- Result: 8
  ```
-->

此示例定义了 `printMathResult(_:_:_:)` 函数，它有三个参数。第一个参数名为 `mathFunction`, 其类型为 `(Int, Int) -> Int`。您可以传入任何这种类型的函数作为第一个参数。第二个和第三个参数分别为 `a` 和 `b`，它们都是 `Int` 类型。这些值将用作所提供数学函数的两个输入值。

当 `printMathResult(_:_:_:)` 被调用时，它被传入 `addTwoInts(_:_:)` 函数以及整数值 `3` 和 `5`。它用传入的 `3` 和 `5` 调用传入的函数，并输出结果：`8`。

`printMathResult(_:_:_:)` 的作用是打印调用适当类型数学函数的结果。它不关心传入函数是如何实现的，重要的是函数的类型是不是正确的。这使得 `printMathResult(_:_:_:)` 能够以类型安全的方式将其部分功能移交给函数的调用者。

### 函数类型作为返回类型

你可以将函数类型作为另一个函数的返回类型。方法是在返回函数的返回箭头（`->`）后紧接着写入一个完整的函数类型。

下一个示例定义了两个简单函数，分别称为 `stepForward(_:)` 和 `stepBackward(_:)`。`stepForward(_:)` 函数返回的值比输入值大 1，而 `stepBackward(_:)` 函数返回的值比输入值小 1。这两个函数的类型都是 `(Int) -> Int`：

```swift
func stepForward(_ input: Int) -> Int {
    return input + 1
}
func stepBackward(_ input: Int) -> Int {
    return input - 1
}
```

<!--
  - test: `functionTypes`

  ```swifttest
  -> func stepForward(_ input: Int) -> Int {
        return input + 1
     }
  -> func stepBackward(_ input: Int) -> Int {
        return input - 1
     }
  ```
-->

如下名为 `chooseStepFunction(backward:)` 的函数，它的返回类型是 `(Int) -> Int`。`chooseStepFunction(backward:)` 根据布尔值 `backward` 来返回 `stepForward(_:)` 函数或 `stepBackward(_:)` 函数：

```swift
func chooseStepFunction(backward: Bool) -> (Int) -> Int {
    return backward ? stepBackward : stepForward
}
```

<!--
  - test: `functionTypes`

  ```swifttest
  -> func chooseStepFunction(backward: Bool) -> (Int) -> Int {
        return backward ? stepBackward : stepForward
     }
  ```
-->

您现在可以用 `chooseStepFunction(backward:)` 来获得一个前进或后退方向的函数：

```swift
var currentValue = 3
let moveNearerToZero = chooseStepFunction(backward: currentValue > 0)
// moveNearerToZero 现在指向 stepBackward() 函数。
```

<!--
  - test: `functionTypes`

  ```swifttest
  -> var currentValue = 3
  -> let moveNearerToZero = chooseStepFunction(backward: currentValue > 0)
  >> print(type(of: moveNearerToZero))
  << (Int) -> Int
  // moveNearerToZero now refers to the stepBackward() function
  ```
-->

上面的示例确定是否需要一个正步长或负步长来使 `currentValue` 的变量逐渐趋近于零。`currentValue` 的初始值为 3，这意味着 `currentValue > 0` 返回 `true`，这使得 `chooseStepFunction(backward:)` 返回 `stepBackward(_:)` 函数。返回函数的引用存储在了 `moveNearerToZero` 的常量中。

现在， `moveNearerToZero` 指向了正确的函数，它可以用来计数归零：

```swift
print("Counting to zero:")
// Counting to zero:
while currentValue != 0 {
    print("\(currentValue)... ")
    currentValue = moveNearerToZero(currentValue)
}
print("zero!")
// 3...
// 2...
// 1...
// zero!
```

<!--
  - test: `functionTypes`

  ```swifttest
  -> print("Counting to zero:")
  </ Counting to zero:
  -> while currentValue != 0 {
        print("\(currentValue)... ")
        currentValue = moveNearerToZero(currentValue)
     }
  -> print("zero!")
  </ 3...
  </ 2...
  </ 1...
  </ zero!
  ```
-->

## 嵌套函数

到目前为止，您在本章中遇到的所有函数都是 **全局函数（global functions）**，它们定义在全局域中。您还可以在其他函数的主体中定义函数，即 **嵌套函数（nested functions）**。

默认情况下，嵌套函数是对外界不可见的，但仍可被其外围函数（enclosing function）调用。外围函数也可以返回它的某个嵌套函数，以便在另一个作用域中使用这个函数。

您可以重写上面的 `chooseStepFunction(backward:)` 示例，以使用并返回嵌套函数：

```swift
func chooseStepFunction(backward: Bool) -> (Int) -> Int {
    func stepForward(input: Int) -> Int { return input + 1 }
    func stepBackward(input: Int) -> Int { return input - 1 }
    return backward ? stepBackward : stepForward
}
var currentValue = -4
let moveNearerToZero = chooseStepFunction(backward: currentValue > 0)
// moveNearerToZero 现在引用了嵌套的 stepForward() 函数
while currentValue != 0 {
    print("\(currentValue)... ")
    currentValue = moveNearerToZero(currentValue)
}
print("zero!")
// -4...
// -3...
// -2...
// -1...
// zero!
```

<!--
  - test: `nestedFunctions`

  ```swifttest
  -> func chooseStepFunction(backward: Bool) -> (Int) -> Int {
        func stepForward(input: Int) -> Int { return input + 1 }
        func stepBackward(input: Int) -> Int { return input - 1 }
        return backward ? stepBackward : stepForward
     }
  -> var currentValue = -4
  -> let moveNearerToZero = chooseStepFunction(backward: currentValue > 0)
  >> print(type(of: moveNearerToZero))
  << (Int) -> Int
  // moveNearerToZero now refers to the nested stepForward() function
  -> while currentValue != 0 {
        print("\(currentValue)... ")
        currentValue = moveNearerToZero(currentValue)
     }
  -> print("zero!")
  </ -4...
  </ -3...
  </ -2...
  </ -1...
  </ zero!
  ```
-->

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
