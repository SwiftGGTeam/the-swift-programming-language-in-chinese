
# 下标

访问集合的元素

下标可以定义在类、结构体和枚举中，是访问集合、列表或序列中元素的快捷方式。可以使用下标的索引，设置和获取值，而不需要再调用对应的存取方法。举例来说，用下标访问一个 `Array` 实例中的元素可以写作 `someArray[index]`，访问 `Dictionary` 实例中的元素可以写作 `someDictionary[key]`。

一个类型可以定义多个下标，通过不同索引类型进行对应的重载。下标不限于一维，你可以定义具有多个入参的下标满足自定义类型的需求。

<!--
  TODO: this chapter should provide an example of subscripting an enumeration,
  as per Joe Groff's example from rdar://16555559.
-->

## 下标语法

下标使您能够通过在实例名称后将一个或多个值写在方括号中来查询类型的实例。它们的语法类似于实例方法语法和计算属性语法。您可以使用 `subscript` 关键字编写下标定义，并指定一个或多个输入参数和返回类型，其方式与实例方法相同。与实例方法不同，下标可以是读写或只读。此行为由 getter 和 setter 以与计算属性相同的方式进行传达：

```swift
subscript(index: Int) -> Int {
    get {
        // 返回一个适当的 Int 类型的值
    }
    set(newValue) {
        // 执行适当的赋值操作
    }
}
```

<!--
  - test: `subscriptSyntax`

  ```swifttest
  >> class Test1 {
  -> subscript(index: Int) -> Int {
        get {
           // Return an appropriate subscript value here.
  >>       return 1
        }
        set(newValue) {
           // Perform a suitable setting action here.
        }
     }
  >> }
  ```
-->

`newValue` 的类型与下标的返回值相同。与计算属性一样，您可以选择不指定 setter 的 `（newValue）` 参数。如果您自己不提供一个名为 `newValue` 的默认参数，则会提供给您的设置者。

与只读计算属性一样，您可以通过删除 get 关键字及其大括号来简化只读下标的声明：

```swift
subscript(index: Int) -> Int {
    // 返回一个适当的 Int 类型的值
}
```

<!--
  - test: `subscriptSyntax`

  ```swifttest
  >> class Test2 {
  -> subscript(index: Int) -> Int {
        // Return an appropriate subscript value here.
  >>    return 1
     }
  >> }
  ```
-->

以下是一个只读下标实现的示例，它定义了一个 `TimesTable` 结构体，用于表示一个整数的 n 倍表。

```swift
struct TimesTable {
    let multiplier: Int
    subscript(index: Int) -> Int {
        return multiplier * index
    }
}
let threeTimesTable = TimesTable(multiplier: 3)
print("six times three is \(threeTimesTable[6])")
// 打印“six times three is 18”
```

<!--
  - test: `timesTable`

  ```swifttest
  -> struct TimesTable {
        let multiplier: Int
        subscript(index: Int) -> Int {
           return multiplier * index
        }
     }
  -> let threeTimesTable = TimesTable(multiplier: 3)
  -> print("six times three is \(threeTimesTable[6])")
  <- six times three is 18
  ```
-->

在此示例中，将创建 `TimesTable` 的新实例来表示三次表。通过将值 `3` 作为用于实例的乘数参数的值传递给结构的`初始值设定项`来指示这一点。

您可以通过调用其下标来查询 `threeTimesTable` 实例，如对 `threeTimesTable[6]` 的调用中所示。这将请求 `three-times-table` 中的第 6 个条目，该条目返回值 `18`，即 `3` 乘以 `6`。

>注意:
`TimesTable` 例子基于一个固定的数学公式。将 `threeTimesTable[someIndex]` 设置为新值是不合适的，因此 `TimesTable` 的下标被定义为只读下标。

## 下标用法

“下标”的确切含义取决于使用它的上下文。下标通常用作访问集合、列表或序列中的成员元素的快捷方式。您可以根据特定类或结构的功能以最合适的方式自由实现下标。

例如，Swift 的 `Dictionary` 类型实现了一个下标，用于设置和检索存储在 `Dictionary` 实例中的值。您可以通过在下标括号内提供字典的键类型键，并将字典的值类型的值分配给下标来在字典中设置值：

```swift
var numberOfLegs = ["spider": 8, "ant": 6, "cat": 4]
numberOfLegs["bird"] = 2
```

<!--
  - test: `dictionarySubscript`

  ```swifttest
  -> var numberOfLegs = ["spider": 8, "ant": 6, "cat": 4]
  -> numberOfLegs["bird"] = 2
  ```
-->

上面的示例定义了一个名为 `numberOfLegs` 的变量，并使用包含三个键值对的字典文本对其进行初始化。`numberOfLegs` 字典的类型推断为 `[String： Int]`。创建字典后，此示例使用下标赋值将 `String` 键`bird`和 `Int` 值 `2` 添加到字典中。

有关字典下标的更多信息，请参阅 doc： <doc:CollectionTypes#Accessing-and-Modifying-a-Dictionary>.

>注意:
>Swift 的 `Dictionary` 类型将其键值下标实现为接受并返回可选类型的下标。对于上面的 `numberOfLegs` 字典，键值下标接>受并返回 `Int?`（可选 int）类型的值。`Dictionary` 类型使用可选的下标类型来对并非每个键都有值这一事实进行建模，并通过为该>键分配 `nil` 值来提供删除该键的值的方法。

## 下标选项

下标可以采用任意数量的输入参数，这些输入参数可以是任何类型。下标还可以返回任何类型的值。

与函数一样，下标可以接受不同数量的参数并为其参数提供默认值，如 <doc:Functions#Variadic-Parameters> 和 <doc:Functions#Default-Parameter-Values>中所述。但是，与函数不同，下标不能使用 in-out 参数。

<!--
  - test: `subscripts-can-have-default-arguments`

  ```swifttest
  >> struct Subscriptable {
  >>     subscript(x: Int, y: Int = 0) -> Int {
  >>         return 100
  >>     }
  >> }
  >> let s = Subscriptable()
  >> print(s[0])
  << 100
  ```
-->

类或结构可以根据需要提供任意数量的下标实现，并且将根据使用下标时下标括号中包含的值的类型推断要使用的相应下标。多个下标的这种定义称为*下标重载*。

虽然下标采用单个参数是最常见的，但如果它适合您的类型，您也可以定义具有多个参数的下标。下面的示例定义一个 `Matrix` 结构，该结构表示 `Double` 值的二维矩阵。`Matrix` 结构的下标采用两个整数参数：

```swift
struct Matrix {
    let rows: Int, columns: Int
    var grid: [Double]
    init(rows: Int, columns: Int) {
        self.rows = rows
        self.columns = columns
        grid = Array(repeating: 0.0, count: rows * columns)
    }
    func indexIsValid(row: Int, column: Int) -> Bool {
        return row >= 0 && row < rows && column >= 0 && column < columns
    }
    subscript(row: Int, column: Int) -> Double {
        get {
            assert(indexIsValid(row: row, column: column), "Index out of range")
            return grid[(row * columns) + column]
        }
        set {
            assert(indexIsValid(row: row, column: column), "Index out of range")
            grid[(row * columns) + column] = newValue
        }
    }
}
```

<!--
  - test: `matrixSubscript, matrixSubscriptAssert`

  ```swifttest
  -> struct Matrix {
        let rows: Int, columns: Int
        var grid: [Double]
        init(rows: Int, columns: Int) {
           self.rows = rows
           self.columns = columns
           grid = Array(repeating: 0.0, count: rows * columns)
        }
        func indexIsValid(row: Int, column: Int) -> Bool {
           return row >= 0 && row < rows && column >= 0 && column < columns
        }
        subscript(row: Int, column: Int) -> Double {
           get {
              assert(indexIsValid(row: row, column: column), "Index out of range")
              return grid[(row * columns) + column]
           }
           set {
              assert(indexIsValid(row: row, column: column), "Index out of range")
              grid[(row * columns) + column] = newValue
           }
        }
     }
  ```
-->

`Matrix` 提供了一个初始值设定项，该初始值设定项采用两个称为 `rows` 和 `columns` 的参数，并创建一个足够大的数组来存储 `Double` 类型的`rows * columns`值。矩阵中的每个位置的初始值为 `0.0`。为了实现这一点，数组的大小和初始单元格值 `0.0` 被传递给数组初始值设定项，该初始值设定项创建并初始化正确大小的新数<doc:CollectionTypes#Creating-an-Array-with-a-Default-Value>.中对此初始值设定项进行了更详细的描述。

您可以通过将适当的 `row` 和 `column` 计数传递给其初始值设定项来构造新的 `Matrix` 实例：

```swift
var matrix = Matrix(rows: 2, columns: 2)
```

<!--
  - test: `matrixSubscript, matrixSubscriptAssert`

  ```swifttest
  -> var matrix = Matrix(rows: 2, columns: 2)
  >> assert(matrix.grid == [0.0, 0.0, 0.0, 0.0])
  ```
-->

上面的示例创建了一个包含两行和两列的新 `Matrix` 实例。此 `Matrix` 实例的`grid`数组实际上是矩阵的扁平化版本，从左上角到右下角如下图所示：

将 `row` 和 `column` 的值传入下标来为矩阵设值，下标的入参使用逗号分隔：

```swift
matrix[0, 1] = 1.5
matrix[1, 0] = 3.2
```

<!--
  - test: `matrixSubscript, matrixSubscriptAssert`

  ```swifttest
  -> matrix[0, 1] = 1.5
  >> print(matrix[0, 1])
  << 1.5
  -> matrix[1, 0] = 3.2
  >> print(matrix[1, 0])
  << 3.2
  ```
-->

上面两条语句分别调用下标的 setter 将矩阵右上角位置（即 `row` 为 `0`、`column` 为 `1` 的位置）的值设置为 `1.5`，将矩阵左下角位置（即 `row` 为 `1`、`column` 为 `0` 的位置）的值设置为 `3.2`：

`Matrix` 下标的 getter 和 setter 中都含有断言，用来检查下标入参 `row` 和 `column` 的值是否有效。为了方便进行断言，`Matrix` 包含了一个名为 `indexIsValid(row:column:)` 的便利方法，用来检查入参 `row` 和 `column` 的值是否在矩阵范围内：

```swift
func indexIsValid(row: Int, column: Int) -> Bool {
    return row >= 0 && row < rows && column >= 0 && column < columns
}
```

<!--
  - test: `matrixSubscript`

  ```swifttest
  >> var rows = 2
  >> var columns = 2
  -> func indexIsValid(row: Int, column: Int) -> Bool {
        return row >= 0 && row < rows && column >= 0 && column < columns
     }
  ```
-->

断言在下标越界时触发：

```swift
let someValue = matrix[2, 2]
// 断言将会触发，因为 [2, 2] 已经超过了 matrix 的范围
```

<!--
  - test: `matrixSubscriptAssert`

  ```swifttest
  -> let someValue = matrix[2, 2]
  xx assert
  // This triggers an assert, because [2, 2] is outside of the matrix bounds.
  ```
-->

## 类型下标

正如上节所述，实例下标是在特定类型的一个实例上调用的下标。你也可以定义一种在这个类型自身上调用的下标。这种下标被称作_类型下标_。你可以通过在 `subscript` 关键字之前写下 `static` 关键字的方式来表示一个类型下标。类型可以使用 `class` 关键字来代替 `static`，它允许子类重写父类中对那个下标的实现。下面的例子展示了如何定义和调用一个类型下标：

```swift
enum Planet: Int {
    case mercury = 1, venus, earth, mars, jupiter, saturn, uranus, neptune
    static subscript(n: Int) -> Planet {
        return Planet(rawValue: n)!
    }
}
let mars = Planet[4]
print(mars)
```

<!--
  - test: `static-subscript`

  ```swifttest
  -> enum Planet: Int {
        case mercury = 1, venus, earth, mars, jupiter, saturn, uranus, neptune
        static subscript(n: Int) -> Planet {
           return Planet(rawValue: n)!
        }
     }
  -> let mars = Planet[4]
  >> assert(mars == Planet.mars)
  -> print(mars)
  << mars
  ```
-->

>测试版软件:
>本文档包含有关正在开发的 API 或技术的初步信息。此信息可能会发生变化，根据本文档实施的软件应使用最终操作系统软件进行测试。
>了解有关使用  [Apple 测试版软件](https://developer.apple.com/support/beta-software/)的更多信息.

<!--
This source file is part of the Swift.org open source project

Copyright (c) 2014 - 2022 Apple Inc. and the Swift project authors
Licensed under Apache License v2.0 with Runtime Library Exception

See https://swift.org/LICENSE.txt for license information
See https://swift.org/CONTRIBUTORS.txt for the list of Swift project authors
-->
