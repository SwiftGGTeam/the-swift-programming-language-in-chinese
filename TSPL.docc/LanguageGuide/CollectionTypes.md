# 集合类型

使用数组、集合和字典组织数据。

Swift 提供了三种主要的 **集合类型**，分别是数组、集合和字典，用于存储值集合。数组是有序的值集合。集合是无序的唯一值集合。字典是无序的键值对关联集合。

![](CollectionTypes_intro)

Swift 中的数组、集合和字典对于它们可以存储的值和键的类型始终是明确的。这意味着你不能错误地将一个类型不匹配的值插入到集合中。同时，这也意味着你可以放心地知道从集合中取出的值的类型。

> 注意: Swift 的数组、集合和字典类型是作为 **泛型集合** 实现的。
> 有关泛型类型和集合的更多信息，请参阅 <doc:Generics>.

<!--
  TODO: should I mention the Collection protocol, to which both of these conform?
-->

<!--
  TODO: mention for i in indices(collection) { collection[i] }
-->

<!--
  TODO: discuss collection equality
-->

## 集合的可变性

如果您创建一个数组、集合或字典，并将其赋值给一个变量，则创建的集合将是 **可变的**。这意味着，在创建集合后，您可以通过添加、删除或更改集合中的元素来改变（或称为 **变异**）集合。如果您将数组、集合或字典分配给常量，则该集合是 **不可变的**，并且其大小和内容无法更改。

> 注意: 在所有不需要更改的情况下，创建不可变集合是一种良好的实践。这样做可以使你更容易理解代码，并使 Swift 编译器能够优化你创建的集合的性能。

## 数组

**数组** 将相同类型的值存储在一个有序列表中。相同的值可以在数组中以不同位置多次出现。

> 注意: Swift 的 `Array` 类型与 Foundation 的 `NSArray` 类进行了桥接。
> 有关如何在 Foundation 和 Cocoa 中使用 `Array` 的更多信息，请参阅相关文档 
> [Bridging Between Array and NSArray](https://developer.apple.com/documentation/swift/array#2846730).

### 数组类型简写语法

Swift 数组的类型完整写作 `Array<Element>`，其中 `Element` 是数组允许存储的值的类型。你也可以以简写形式 `[Element]` 来表示数组的类型。虽然这两种形式在功能上是相同的，但简写形式更受欢迎，并且在本指南中提到数组类型时将优先使用这种形式。

### 创建空数组

在 Swift 中，你可以使用两种方法来创建空数组。如果上下文已经提供了类型信息，例如一个函数参数，或者一个已经明确类型的变量或常量，那么你可以使用一个空数组字面量，它写作 `[]`（一对空的方括号）：

```swift
var someInts: [Int] = []
print("someInts is of type [Int] with \(someInts.count) items.")
// 打印 “someInts is of type [Int] with 0 items.“
```

<!--
  - test: `arraysEmpty`

  ```swifttest
  -> var someInts: [Int] = []
  -> print("someInts is of type [Int] with \(someInts.count) items.")
  <- someInts is of type [Int] with 0 items.
  ```
-->

或者，你可以使用显式的初始化器语法来创建某种特定类型的空数组，即在方括号中写入元素类型，后面再跟上一对圆括号——例如下面代码中的 `[Int]()`：

```swift
var someInts = [Int]()
print("someInts is of type [Int] with \(someInts.count) items.")
// 打印输出 "someInts is of type [Int] with 0 items."
```

这两种方法效果相同。不过，空数组字面量写法更短，通常也更易读。

无论使用哪种初始化方法，你都可以使用空数组字面量 (`[]`)将一个空数组重新赋值给一个已存在的变量：

```swift
someInts.append(3)
// someInts 现在包含 1 个类型为 Int 的值
someInts = []
// someInts 现在是一个空数组, 但它仍是 [Int] 类型的
```

<!--
  - test: `arraysEmpty`

  ```swifttest
  -> someInts.append(3)
  /> someInts now contains \(someInts.count) value of type Int
  </ someInts now contains 1 value of type Int
  -> someInts = []
  // someInts is now an empty array, but is still of type [Int]
  ```
-->

### 使用默认值创建数组

Swift 的 `Array` 类型还提供了一个构造器，用于创建特定大小的数组，其所有值都设置为相同的默认值。您向此构造器传递适当类型的默认值（称为 `repeating`）：以及该值在新数组中重复的次数（称为 `count`）：

```swift
var threeDoubles = Array(repeating: 0.0, count: 3)
// threeDoubles 的类型是 [Double]，并且等于 [0.0, 0.0, 0.0]
```

<!--
  - test: `arraysEmpty`

  ```swifttest
  -> var threeDoubles = Array(repeating: 0.0, count: 3)
  /> threeDoubles is of type [Double], and equals [\(threeDoubles[0]), \(threeDoubles[1]), \(threeDoubles[2])]
  </ threeDoubles is of type [Double], and equals [0.0, 0.0, 0.0]
  ```
-->

### 通过合并两个数组创建一个新数组

您可以通过使用加法运算符 `（+）` 将两个具有兼容类型的现有数组相加来创建新数组。新数组的类型是从您相加的两个数组的类型推断出来的：

```swift
var anotherThreeDoubles = Array(repeating: 2.5, count: 3)
// anotherThreeDoubles 的类型是 [Double]，并且等于 [2.5, 2.5, 2.5]

var sixDoubles = threeDoubles + anotherThreeDoubles
// sixDoubles 被推断为 [Double] 类型，并且等于 [0.0, 0.0, 0.0, 2.5, 2.5, 2.5]
```

<!--
  - test: `arraysEmpty`

  ```swifttest
  -> var anotherThreeDoubles = Array(repeating: 2.5, count: 3)
  /> anotherThreeDoubles is of type [Double], and equals [\(anotherThreeDoubles[0]), \(anotherThreeDoubles[1]), \(anotherThreeDoubles[2])]
  </ anotherThreeDoubles is of type [Double], and equals [2.5, 2.5, 2.5]

  -> var sixDoubles = threeDoubles + anotherThreeDoubles
  /> sixDoubles is inferred as [Double], and equals \(sixDoubles)
  </ sixDoubles is inferred as [Double], and equals [0.0, 0.0, 0.0, 2.5, 2.5, 2.5]
  ```
-->

<!--
  TODO: func find<T: Equatable>(array: [T], value: T) -> Int?
  This is defined in Algorithm.swift,
  and gives a way to find the index of a value in an array if it exists.
  I'm holding off writing about it until NewArray lands.
-->

<!--
  TODO: mutating func sort(by: (T, T) -> Bool)
  This is defined in Array.swift.
  Likewise I'm holding off writing about it until NewArray lands.
-->

### 使用数组字面量创建数组

您还可以使用 **数组字面量** 来初始化数组，这是将一个或多个值写入数组集合的简写方法。数组字面量以值列表的形式写入，用逗号分隔，用一对方括号括起来：

```swift
[<#value 1#>, <#value 2#>, <#value 3#>]
```

下面的示例创建了一个名为 `shoppingList` 的数组来存储 `String` 值：

```swift
var shoppingList: [String] = ["Eggs", "Milk"]
// shoppingList 已经用两个初始项进行了初始化
```

<!--
  - test: `arrays`

  ```swifttest
  -> var shoppingList: [String] = ["Eggs", "Milk"]
  // shoppingList has been initialized with two initial items
  ```
-->

`shoppingList` 变量被声明为“字符串值数组”，写作 `[String]`。由于该数组指定了值类型为 `String`，因此它只允许存储 `String` 类型的值。在这里，`shoppingList` 数组通过数组字面量初始化了两个 `String` 值（`"Eggs"` 和 `"Milk"`）。

> 注意: `shoppingList` 数组被声明为变量（使用 `var` 关键字）而不是常量（使用 `let` 关键字），因为在下面的示例中，更多的商品要被添加到购物清单中。

在这个例子中，数组字面量只包含两个 `String` 值，且没有其他内容。这与 `shoppingList` 变量的声明类型（一个只能包含 `String` 值的数组）相匹配，因此允许使用这个数组字面量来初始化 `shoppingList`，并包含两个初始项目。

得益于 Swift 的类型推断功能，如果您使用包含相同类型值的数组字面量进行初始化，则无需显式地写出数组的类型。`shoppingList` 的初始化可以改为以更简短的形式编写：

```swift
var shoppingList = ["Eggs", "Milk"]
```

<!--
  - test: `arraysInferred`

  ```swifttest
  -> var shoppingList = ["Eggs", "Milk"]
  ```
-->

由于数组字面量中的所有值都是相同类型，Swift 可以推断出 `[String]` 是 `shoppingList` 变量的正确类型。

你可以在数组字面量的最后一个值之后包含一个逗号，这被称为*尾随逗号*：

```swift
var shoppingList = [
    "Eggs",
    "Milk",
]
```

因为尾随逗号使每一行的结尾都一样，所以在编写像上面这样每行一个值的数组时，这是一种很有用的方式。当你修改数组时，你只需要添加、删除或重新排列值 —— 而不需要添加或删除逗号。

### 访问和修改数组

您可以通过数组的方法和属性或使用下标语法来访问和修改数组。

要找出数组中的项数，可以检查其只读属性 `count`：

```swift
print("The shopping list contains \(shoppingList.count) items.")
// 打印 “The shopping list contains 2 items.“
```

<!--
  - test: `arraysInferred`

  ```swifttest
  -> print("The shopping list contains \(shoppingList.count) items.")
  <- The shopping list contains 2 items.
  ```
-->

使用布尔值 `isEmpty` 属性作为检查 `count` 属性是否等于 `0` 的快捷方式：

```swift
if shoppingList.isEmpty {
    print("The shopping list is empty.")
} else {
    print("The shopping list isn't empty.")
}
// 打印 “The shopping list isn't empty.“
```

<!--
  - test: `arraysInferred`

  ```swifttest
  -> if shoppingList.isEmpty {
        print("The shopping list is empty.")
     } else {
        print("The shopping list isn't empty.")
     }
  <- The shopping list isn't empty.
  ```
-->

您可以通过调用数组的 `append(_:)` 方法将新元素添加到数组的末尾：

```swift
shoppingList.append("Flour")
// shoppingList 现在包含 3 项，而有人正在做煎饼
```

<!--
  - test: `arraysInferred`

  ```swifttest
  -> shoppingList.append("Flour")
  /> shoppingList now contains \(shoppingList.count) items, and someone is making pancakes
  </ shoppingList now contains 3 items, and someone is making pancakes
  ```
-->

或者，可以使用加法赋值运算符（`+=`）将一个或多个兼容项的数组追加到现有数组中：

```swift
shoppingList += ["Baking Powder"]
// shoppingList 现在包含 4 项
shoppingList += ["Chocolate Spread", "Cheese", "Butter"]
// shoppingList 现在包含 7 项
```

<!--
  - test: `arraysInferred`

  ```swifttest
  -> shoppingList += ["Baking Powder"]
  /> shoppingList now contains \(shoppingList.count) items
  </ shoppingList now contains 4 items
  -> shoppingList += ["Chocolate Spread", "Cheese", "Butter"]
  /> shoppingList now contains \(shoppingList.count) items
  </ shoppingList now contains 7 items
  ```
-->

使用 **下标语法** 从数组中检索值，在数组名称后面的方括号内传递要检索的值的索引：

```swift
var firstItem = shoppingList[0]
// firstItem 的值为 “Eggs”
```

<!--
  - test: `arraysInferred`

  ```swifttest
  -> var firstItem = shoppingList[0]
  /> firstItem is equal to \"\(firstItem)\"
  </ firstItem is equal to "Eggs"
  ```
-->

> 注意: 数组中的第一项的索引为 `0`，而不是 `1`。Swift 中的数组始终是零索引的。

您可以使用下标语法来更改给定索引处的现有值：

```swift
shoppingList[0] = "Six eggs"
// 列表中的第一个项现在是 “Six eggs” 而不是 “Eggs”
```

<!--
  - test: `arraysInferred`

  ```swifttest
  -> shoppingList[0] = "Six eggs"
  /> the first item in the list is now equal to \"\(shoppingList[0])\" rather than \"Eggs\"
  </ the first item in the list is now equal to "Six eggs" rather than "Eggs"
  ```
-->

当您使用下标语法时，您指定的索引需要有效。例如，编写 `shoppingList[shoppingList.count] = "Salt"` 以尝试将项目追加到数组末尾会导致运行时错误。

<!--
  Unlike Ruby and Javascript, where accessing an invalid index
  extends the array with nil or similar placeholder values,
  to make that index become valid.
-->

您还可以使用下标语法一次更改一个范围的值，即使替换值集的长度与要替换的范围不同。以下示例将 `"Chocolate Spread"`, `"Cheese"` 和 `"Butter"` 替换为 `"Bananas"` 和 `"Apples"`：

```swift
shoppingList[4...6] = ["Bananas", "Apples"]
// shoppingList 现在包含 6 项
```

<!--
  - test: `arraysInferred`

  ```swifttest
  -> shoppingList[4...6] = ["Bananas", "Apples"]
  /> shoppingList now contains \(shoppingList.count) items
  </ shoppingList now contains 6 items
  ```
-->

要将项目插入数组中指定索引处，请调用数组的 `insert(_:at:)` 方法：

```swift
shoppingList.insert("Maple Syrup", at: 0)
// shoppingList 现在包含 7 项
// ”Maple Syrup“ 现在是列表中的第一项
```

<!--
  - test: `arraysInferred`

  ```swifttest
  -> shoppingList.insert("Maple Syrup", at: 0)
  /> shoppingList now contains \(shoppingList.count) items
  </ shoppingList now contains 7 items
  /> \"\(shoppingList[0])\" is now the first item in the list
  </ "Maple Syrup" is now the first item in the list
  ```
-->

对 `insert(_:at:)` 方法的调用会在购物清单的最开头插入一个值为 `"Maple Syrup"` 的新项目，由索引 `0` 表示。

同样，使用 `remove(at:)` 方法从数组中删除项目。此方法删除指定索引处的项目并返回已删除的项目（如果您不需要，可以忽略返回的值）：

```swift
let mapleSyrup = shoppingList.remove(at: 0)
// 索引 0 处的项刚刚被移除了
// shoppingList 现在包含 6 项，且不包含 Maple Syrup
// mapleSyrup 常量现在等于已移除的 “Maple Syrup” 字符串
```

<!--
  - test: `arraysInferred`

  ```swifttest
  -> let mapleSyrup = shoppingList.remove(at: 0)
  // the item that was at index 0 has just been removed
  /> shoppingList now contains \(shoppingList.count) items, and no Maple Syrup
  </ shoppingList now contains 6 items, and no Maple Syrup
  /> the mapleSyrup constant is now equal to the removed \"\(mapleSyrup)\" string
  </ the mapleSyrup constant is now equal to the removed "Maple Syrup" string
  ```
-->

> 注意: 如果您尝试访问或修改超出数组现有边界的索引的值，将触发运行时错误。您可以在使用索引之前通过将其与数组的 `count` 属性进行比较来检查索引是否有效。数组中最大的有效索引是 `count - 1`，因为数组是从零开始编制索引的，---但是，当 `count` 为 `0`（意味着数组为空）时，没有有效的索引。

当删除一个项目时，数组中的任何间隙都会被关闭，因此索引 `0` 处的值再次等于 `"Six eggs"`：

```swift
firstItem = shoppingList[0]
// firstItem 现在等于 “Six eggs”
```

<!--
  - test: `arraysInferred`

  ```swifttest
  -> firstItem = shoppingList[0]
  /> firstItem is now equal to \"\(firstItem)\"
  </ firstItem is now equal to "Six eggs"
  ```
-->

如果要从数组中删除最后一项，请使用 `removeLast()` 方法而不是 `remove(at:)` 方法，以避免查询数组的 `count` 属性。与 `remove(at:)` 方法一样，`removeLast()` 返回已删除的项目：

```swift
let apples = shoppingList.removeLast()
// 数组中的最后一项刚刚被移除了
// shoppingList 现在包含 5 项，且不包含 apples
// apples 常量现在等于已移除的 “Apples” 字符串
```

<!--
  - test: `arraysInferred`

  ```swifttest
  -> let apples = shoppingList.removeLast()
  // the last item in the array has just been removed
  /> shoppingList now contains \(shoppingList.count) items, and no apples
  </ shoppingList now contains 5 items, and no apples
  /> the apples constant is now equal to the removed \"\(apples)\" string
  </ the apples constant is now equal to the removed "Apples" string
  ```
-->

### 遍历一个数组

您可以使用 `for`-`in` 循环遍历数组中整个的值的集合：

```swift
for item in shoppingList {
    print(item)
}
// Six eggs
// Milk
// Flour
// Baking Powder
// Bananas
```

<!--
  - test: `arraysInferred`

  ```swifttest
  -> for item in shoppingList {
        print(item)
     }
  </ Six eggs
  </ Milk
  </ Flour
  </ Baking Powder
  </ Bananas
  ```
-->

如果你需要每个项目的整数索引及其值，请使用 `enumerated()` 方法遍历数组。对于数组中的每个元素，`enumerated()` 方法返回一个由整数和项组成的元组。整数从 0 开始，每个项目按 1 计数; 如果枚举整个数组，则这些整数将与这元素的索引匹配。您可以将这些元组分解为临时常量或变量，作为遍历的一部分：

```swift
for (index, value) in shoppingList.enumerated() {
    print("Item \(index + 1): \(value)")
}
// Item 1: Six eggs
// Item 2: Milk
// Item 3: Flour
// Item 4: Baking Powder
// Item 5: Bananas
```

<!--
  - test: `arraysInferred`

  ```swifttest
  -> for (index, value) in shoppingList.enumerated() {
        print("Item \(index + 1): \(value)")
     }
  </ Item 1: Six eggs
  </ Item 2: Milk
  </ Item 3: Flour
  </ Item 4: Baking Powder
  </ Item 5: Bananas
  ```
-->

有关 `for`-`in` 循环的更多信息，请参阅 <doc:ControlFlow#For-In-循环>.

## 集合

**集合** 将相同类型的不同值存储在没有定义序列化的集合中。当项的顺序不重要，或者需要确保项只出现一次时，可以使用集合而不是数组。

> 注意: Swift 的 `Set` 类型桥接到 Foundation 的 `NSSet` 类。
>
> 有关将 `Set` 与 Foundation 和 Cocoa 一起使用的更多信息，请参阅 [Bridging Between Set and NSSet](https://developer.apple.com/documentation/swift/set#2845530).

<!--
  TODO: Add note about performance characteristics of contains on sets as opposed to arrays?
-->

### 集合类型的哈希值

一个类型必须是 **可哈希的** 才能存储在集合中---也就是说，该类型必须提供一种为自身计算 **哈希值** 的方法。哈希值是一个 `Int` 类型的值，对于所有相等的对象，它们的哈希值相同。也就是说，如果 `a == b`，那么 `a` 的哈希值必须等于 `b` 的哈希值。

Swift 的所有基本类型（如 `String`、`Int`、`Double` 和 `Bool`）默认都是可哈希的，可以用作集合的值类型或字典的键类型。没有关联值的枚举 case 值（如 <doc:Enumerations> 中描述的那样）默认也是可哈希的。

> 注意: 你可以通过让自定义类型遵循 Swift 标准库中的 `Hashable` 协议，将它们用作集合的值类型或字典的键类型。有关实现所需 `hash(into:)` 方法的信息，请参阅 [`Hashable`](https://developer.apple.com/documentation/swift/hashable)。有关遵守协议的信息，请参阅 <doc:Protocols>。

### 集类型语法

Swift 集合的类型写作 `Set<Element>`，其中 `Element` 是集合允许存储的类型。与数组不同，集合没有相应的简写形式。

### 创建和初始化一个空集

你可以使用构造器语法创建一个特定类型的空集：

```swift
var letters = Set<Character>()
print("letters is of type Set<Character> with \(letters.count) items.")
// 打印 “letters is of type Set<Character> with 0 items.“
```

<!--
  - test: `setsEmpty`

  ```swifttest
  -> var letters = Set<Character>()
  -> print("letters is of type Set<Character> with \(letters.count) items.")
  <- letters is of type Set<Character> with 0 items.
  ```
-->

> 注意: `letters` 变量的类型根据构造器的类型推断为 `Set<Character>`。

或者如果上下文已经提供了类型信息，例如函数参数或已经定义类型的变量或常量，您可以使用空数组字面量创建一个空集合：

```swift
letters.insert("a")
// letters 现在包含 1 个类型为 Character 的值
letters = []
// letters 现在是一个空集合，但仍然是 Set<Character> 类型
```

<!--
  - test: `setsEmpty`

  ```swifttest
  -> letters.insert("a")
  /> letters now contains \(letters.count) value of type Character
  </ letters now contains 1 value of type Character
  -> letters = []
  // letters is now an empty set, but is still of type Set<Character>
  ```
-->

### 使用数组字面量创建集合

你也可以使用数组字面量初始化一个集合，这是一种将一个或多个值写入集合的简写方式。

下面的示例创建了一个名为 `favoriteGenres` 的集合，用于存储 `String` 值：

```swift
var favoriteGenres: Set<String> = ["Rock", "Classical", "Hip hop"]
// favoriteGenres 已经用三个初始元素进行了初始化
```

<!--
  - test: `sets`

  ```swifttest
  -> var favoriteGenres: Set<String> = ["Rock", "Classical", "Hip hop"]
  // favoriteGenres has been initialized with three initial items
  ```
-->

`favoriteGenres` 变量被声明为“`String` 值的集合”，写作 `Set<String>`。由于该集合指定了值类型为 `String`，因此它 **只能** 存储 `String` 值。在这里，`favoriteGenres` 集合通过数组字面量初始化了三个 `String` 值（`"Rock"`、`"Classical"` 和 `"Hip hop"`）。

> 注意: `favoriteGenres` 集合被声明为变量（使用 `var` 关键字），而不是常量（使用 `let` 关键字），因为在后续的示例中会添加和移除元素。

集合类型无法仅通过数组字面量推断，因此必须显式声明类型 `Set`。但是，由于 Swift 的类型推断功能，如果你使用一个只包含单一类型值的数组字面量进行初始化，就无需写出集合元素的类型。`favoriteGenres` 的初始化可以用更简短的形式编写为：

```swift
var favoriteGenres: Set = ["Rock", "Classical", "Hip hop"]
```

<!--
  - test: `setsInferred`

  ```swifttest
  -> var favoriteGenres: Set = ["Rock", "Classical", "Hip hop"]
  ```
-->

因为数组字面量中的所有值都是相同的类型，Swift 可以推断出 `Set<String>` 是 `favoriteGenres` 变量的正确类型。

### 访问和修改集合

您可以通过集合的方法和属性来访问和修改集合。

要查找集合中的元素数量，可以检查其只读属性 `count`：

```swift
print("I have \(favoriteGenres.count) favorite music genres.")
// 打印 “I have 3 favorite music genres.“
```

<!--
  - test: `setUsage`

  ```swifttest
  >> var favoriteGenres: Set = ["Rock", "Classical", "Hip hop"]
  -> print("I have \(favoriteGenres.count) favorite music genres.")
  <- I have 3 favorite music genres.
  ```
-->

使用布尔类型的 `isEmpty` 属性作为检查 `count` 属性是否等于 `0` 的快捷方式：

```swift
if favoriteGenres.isEmpty {
    print("As far as music goes, I'm not picky.")
} else {
    print("I have particular music preferences.")
}
// 打印 “I have particular music preferences.“
```

<!--
  - test: `setUsage`

  ```swifttest
  -> if favoriteGenres.isEmpty {
        print("As far as music goes, I'm not picky.")
     } else {
        print("I have particular music preferences.")
     }
  <- I have particular music preferences.
  ```
-->

您可以通过调用集合的 `insert(_:)` 方法将新元素添加到集合中：

```swift
favoriteGenres.insert("Jazz")
// favoriteGenres 现在包含 4 项
```

<!--
  - test: `setUsage`

  ```swifttest
  -> favoriteGenres.insert("Jazz")
  /> favoriteGenres now contains \(favoriteGenres.count) items
  </ favoriteGenres now contains 4 items
  ```
-->

你可以通过调用集合的 `remove(_:)` 方法从集合中移除一个元素，该方法会在元素是集合的成员时将其移除，并返回被移除的值；如果集合中不包含该元素，则返回 `nil`。另外，可以使用 `removeAll()` 方法移除集合中的所有元素。

```swift
if let removedGenre = favoriteGenres.remove("Rock") {
    print("\(removedGenre)? I'm over it.")
} else {
    print("I never much cared for that.")
}
// 打印 “Rock? I'm over it.“
```

<!--
  - test: `setUsage`

  ```swifttest
  -> if let removedGenre = favoriteGenres.remove("Rock") {
        print("\(removedGenre)? I'm over it.")
     } else {
        print("I never much cared for that.")
     }
  <- Rock? I'm over it.
  ```
-->

要检查集合是否包含特定元素，可以使用 `contains(_:)` 方法。

```swift
if favoriteGenres.contains("Funk") {
    print("I get up on the good foot.")
} else {
    print("It's too funky in here.")
}
// 打印 “It's too funky in here.“
```

<!--
  - test: `setUsage`

  ```swifttest
  -> if favoriteGenres.contains("Funk") {
         print("I get up on the good foot.")
     } else {
         print("It's too funky in here.")
     }
  <- It's too funky in here.
  ```
-->

### 遍历集合

您可以使用 `for`-`in` 循环遍历集合中的值。

```swift
for genre in favoriteGenres {
    print("\(genre)")
}
// Classical
// Jazz
// Hip hop
```

<!--
  - test: `setUsage`

  ```swifttest
  -> for genre in favoriteGenres {
        print("\(genre)")
     }
  </ Classical
  </ Jazz
  </ Hip hop
  ```
-->

有关 `for`-`in` 循环的更多信息，请参阅 <doc:ControlFlow#For-In-循环>.

Swift 的 `Set` 类型没有定义的顺序。要按特定顺序遍历集合中的值，可以使用 `sorted()` 方法，该方法返回集合的元素作为一个数组，并按 `<` 运算符排序。

```swift
for genre in favoriteGenres.sorted() {
    print("\(genre)")
}
// Classical
// Hip hop
// Jazz
```

<!--
  - test: `setUsage`

  ```swifttest
  -> for genre in favoriteGenres.sorted() {
        print("\(genre)")
     }
  </ Classical
  </ Hip hop
  </ Jazz
  ```
-->

## 执行集合操作

你可以高效地执行基本的集合操作，例如将两个集合组合在一起、确定两个集合之间的共同值，或判断两个集合是否包含相同的所有值、部分值或没有相同的值。

### 基本集合操作

下图描绘了 --- `a` 和 `b` --- 两个集合，其中各种集合操作的结果由阴影区域表示。

![](setVennDiagram)

- 使用 `intersection(_:)` 方法创建一个只包含两个集合共有值的新集合。
- 使用 `symmetricDifference(_:)` 方法创建一个包含两个集合中存在但不同时存在的值的新集合。
- 使用 `union(_:)` 方法创建一个包含两个集合中所有值的新集合。
- 使用 `subtracting(_:)` 方法创建一个不包含指定集合中值的新集合。

```swift
let oddDigits: Set = [1, 3, 5, 7, 9]
let evenDigits: Set = [0, 2, 4, 6, 8]
let singleDigitPrimeNumbers: Set = [2, 3, 5, 7]

oddDigits.union(evenDigits).sorted()
// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
oddDigits.intersection(evenDigits).sorted()
// []
oddDigits.subtracting(singleDigitPrimeNumbers).sorted()
// [1, 9]
oddDigits.symmetricDifference(singleDigitPrimeNumbers).sorted()
// [1, 2, 9]
```

<!--
  - test: `setOperations`

  ```swifttest
  -> let oddDigits: Set = [1, 3, 5, 7, 9]
  -> let evenDigits: Set = [0, 2, 4, 6, 8]
  -> let singleDigitPrimeNumbers: Set = [2, 3, 5, 7]

  >> let a =
  -> oddDigits.union(evenDigits).sorted()
  >> assert(a == [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
  // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  >> let b =
  -> oddDigits.intersection(evenDigits).sorted()
  >> assert(b == [])
  // []
  >> let c =
  -> oddDigits.subtracting(singleDigitPrimeNumbers).sorted()
  >> assert(c == [1, 9])
  // [1, 9]
  >> let d =
  -> oddDigits.symmetricDifference(singleDigitPrimeNumbers).sorted()
  >> assert(d == [1, 2, 9])
  // [1, 2, 9]
  ```
-->

<!--
  Rewrite the above to avoid bare expressions.
  Tracking bug is <rdar://problem/35301593>
-->

### 集合成员关系与相等

下图描述了三个集合 --- `a`、`b` 和 `c`，其中重叠区域表示集合间共享的元素。集合 `a` 是集合 `b` 的 **超集**，因为 `a` 包含了 `b` 中的所有元素。相反，集合 `b` 是集合 `a` 的 **子集**，因为 `b` 中的所有元素都包含在 `a` 中。集合 `b` 和集合 `c` 是 **不相交的**，因为它们没有任何共同的元素。

![](setEulerDiagram)

- 使用 “等于” 运算符 （`==`）判断两个集合是否包含相同的所有值。
- 使用 `isSubset(of:)` 方法判断一个集合的所有值是否包含在指定集合中。
- 使用 `isSuperset(of:)` 方法判断一个集合是否包含指定集合中的所有值。
- 使用 `isStrictSubset(of:)` 或 `isStrictSuperset(of:)` 方法判断一个集合是否是指定集合的子集或超集（但不相等）。
- 使用 `isDisjoint(with:)` 方法判断两个集合是否没有共同的值。

```swift
let houseAnimals: Set = ["🐶", "🐱"]
let farmAnimals: Set = ["🐮", "🐔", "🐑", "🐶", "🐱"]
let cityAnimals: Set = ["🐦", "🐭"]

houseAnimals.isSubset(of: farmAnimals)
// true
farmAnimals.isSuperset(of: houseAnimals)
// true
farmAnimals.isDisjoint(with: cityAnimals)
// true
```

<!--
  - test: `setOperations`

  ```swifttest
  -> let houseAnimals: Set = ["🐶", "🐱"]
  -> let farmAnimals: Set = ["🐮", "🐔", "🐑", "🐶", "🐱"]
  -> let cityAnimals: Set = ["🐦", "🐭"]

  >> let aa =
  -> houseAnimals.isSubset(of: farmAnimals)
  >> assert(aa == true)
  // true
  >> let bb =
  -> farmAnimals.isSuperset(of: houseAnimals)
  >> assert(bb == true)
  // true
  >> let cc =
  -> farmAnimals.isDisjoint(with: cityAnimals)
  >> assert(cc == true)
  // true
  ```
-->

<!--
  Rewrite the above to avoid bare expressions.
  Tracking bug is <rdar://problem/35301593>
-->

## 字典

**字典** 将相同类型的键与集合中相同类型的值之间的关联存储在集合中，没有定义顺序。每个值都与一个唯一键相关联，该 **键** 充当字典中该值的标识符。与数组中的元素不同，字典中的元素没有指定的顺序。当您需要根据值的标识符查找值时可以使用字典，其方式与使用实际字典查找特定单词的定义的方式大致相同。

> 注意: Swift 的 `Dictionary` 类型与 Foundation 的 `NSDictionary` 类相互桥接。
> 
> 有关将 `Dictionary` 与 Foundation 和 Cocoa 一起使用的更多信息，请查阅 [Bridging Between Dictionary and NSDictionary](https://developer.apple.com/documentation/swift/dictionary#2846239).


### 字典类型简写语法

Swift 字典的完整类型写作 `Dictionary<Key, Value>`，其中 `Key` 是可以用作字典键的值类型，而 `Value` 是字典为这些键存储的值类型。

> 注意: 字典 `Key` 类型必须遵循 `Hashable` 协议，这与集合的值类型相同。

您也可以将字典的类型以简写形式写成 `[Key: Value]`。虽然这两种形式在功能上是相同的，但简写形式更受欢迎，并且在本指南中提到字典类型时将使用这种形式。

### 创建空字典

与数组一样，您可以使用构造器语法创建特定类型的空 `Dictionary`：

```swift
var namesOfIntegers: [Int: String] = [:]
// namesOfIntegers 是一个空的 [Int: String] 字典
```

<!--
  - test: `dictionariesEmpty`

  ```swifttest
  -> var namesOfIntegers: [Int: String] = [:]
  // namesOfIntegers is an empty [Int: String] dictionary
  ```
-->

此示例创建了一个类型为 `[Int: String]` 的空字典，以存储整数值的可读名称。它的键的类型为 `Int`，值的类型为 `String`。

如果上下文已经提供了类型信息，您可以使用空字典字面量创建一个空字典，写作 `[:]`（在一对方括号内的冒号）。

```swift
namesOfIntegers[16] = "sixteen"
// namesOfIntegers 现在包含 1 个键值对
namesOfIntegers = [:]
// namesOfIntegers 再次成为一个类型为 [Int: String] 的空字典
```

<!--
  - test: `dictionariesEmpty`

  ```swifttest
  -> namesOfIntegers[16] = "sixteen"
  /> namesOfIntegers now contains \(namesOfIntegers.count) key-value pair
  </ namesOfIntegers now contains 1 key-value pair
  -> namesOfIntegers = [:]
  // namesOfIntegers is once again an empty dictionary of type [Int: String]
  ```
-->

### 使用字典字面量创建字典

您还可以使用 **字典字面量** 初始化字典，其语法与之前看到的数组字面量类似。字典字面量是一种简便方式，可以将一个或多个键值对写成 `Dictionary` 集合。

**键值对** 是键与值的组合。在字典字面量中，每个键值对中的键和值由冒号分隔。键值对以列表形式书写，用逗号分隔，并用一对方括号括起来：

```swift
[<#key 1#>: <#value 1#>, <#key 2#>: <#value 2#>, <#key 3#>: <#value 3#>]
```

下面的示例创建了一个字典，用于存储国际机场的名称。在这个字典中，键是三个字母的国际航空运输协会代码，而值是机场名称：

```swift
var airports: [String: String] = ["YYZ": "Toronto Pearson", "DUB": "Dublin"]
```

<!--
  - test: `dictionaries`

  ```swifttest
  -> var airports: [String: String] = ["YYZ": "Toronto Pearson", "DUB": "Dublin"]
  ```
-->

`airports` 字典被声明为类型 `[String: String]`，这意味着“这是一个键的类型为 `String`，值的类型也为 `String` 的字典”。

> 注意: `airports` 字典被声明为一个变量（使用 `var` 关键字），而不是常量（使用 `let` 关键字），因为在下面的示例中会向字典中添加更多机场。

`airports` 字典通过一个包含两个键值对的字典字面量进行初始化。第一个键值对的键是 `"YYZ"`，值是 `"Toronto Pearson"`。第二个键值对的键是 `"DUB"`，值是 `"Dublin"`。

这个字典字面量包含两个 `String: String` 键值对。这个键值类型与 `airports` 变量声明的类型匹配（即只能 `String` 键和只能 `String` 值的字典），因此将字典字面量赋值给 `airports` 字典是允许的，从而用两个初始项初始化该字典。

与数组一样，如果使用的字典字面量的键和值具有一致的类型，则不必指定字典的类型。`airports` 的初始化可以用更简短的形式来编写，如下所示：

```swift
var airports = ["YYZ": "Toronto Pearson", "DUB": "Dublin"]
```

<!--
  - test: `dictionariesInferred`

  ```swifttest
  -> var airports = ["YYZ": "Toronto Pearson", "DUB": "Dublin"]
  ```
-->

因为字面量中的所有键都是同一类型，所有值也是同一类型，Swift 能够推断出 `[String: String]` 是用于 `airports` 字典的正确类型。

与数组字面量一样，字典字面量也可以在最后一个键值对之后包含尾随逗号：

```swift
var airports = [
    "YYZ": "Toronto Pearson",
    "DUB": "Dublin",
]
```

### 访问和修改字典

您可以通过字典的方法和属性，或者使用下标语法来访问和修改字典。

与数组一样，您可以通过检查字典的只读属性 `count` 来获取 `Dictionary` 中元素的数量。

```swift
print("The airports dictionary contains \(airports.count) items.")
// 打印 “The airports dictionary contains 2 items.“
```

<!--
  - test: `dictionariesInferred`

  ```swifttest
  -> print("The airports dictionary contains \(airports.count) items.")
  <- The airports dictionary contains 2 items.
  ```
-->

使用布尔 `isEmpty` 属性可以快速检查 `count` 属性是否等于 `0`。

```swift
if airports.isEmpty {
    print("The airports dictionary is empty.")
} else {
    print("The airports dictionary isn't empty.")
}
// 打印 “The airports dictionary isn't empty.“
```

<!--
  - test: `dictionariesInferred`

  ```swifttest
  -> if airports.isEmpty {
        print("The airports dictionary is empty.")
     } else {
        print("The airports dictionary isn't empty.")
     }
  <- The airports dictionary isn't empty.
  ```
-->

您可以使用下标语法向字典添加新元素。使用适当类型的新键作为下标索引，并分配一个适当类型的新值：

```swift
airports["LHR"] = "London"
// airports 字典现在包含 3 项
```

<!--
  - test: `dictionariesInferred`

  ```swifttest
  -> airports["LHR"] = "London"
  /> the airports dictionary now contains \(airports.count) items
  </ the airports dictionary now contains 3 items
  ```
-->

您还可以使用下标语法来更改与特定键关联的值：

```swift
airports["LHR"] = "London Heathrow"
// “LHR”的值已更改为“London Heathrow”
```

<!--
  - test: `dictionariesInferred`

  ```swifttest
  -> airports["LHR"] = "London Heathrow"
  /> the value for \"LHR\" has been changed to \"\(airports["LHR"]!)\"
  </ the value for "LHR" has been changed to "London Heathrow"
  ```
-->

作为下标的替代方法，请使用字典的 `updateValue(_:forKey:)` 方法来设置或更新特定键的值。与上面的下标示例一样，`updateValue(_:forKey:)` 方法会在键不存在时为该键设置一个值，或者在该键已存在时更新其值。但是，与下标不同的是，`updateValue(_:forKey:)` 方法在执行更新后返回 **旧** 值。这使您能够检查是否进行了更新。

`updateValue(_:forKey:)` 方法返回字典值类型的可选值。例如，对于存储 `String` 值的字典，该方法返回类型为 `String?`，即“可选的 `String`”。这个可选值在更新前如果该键存在，则包含该键的旧值；如果该键之前没有值，则返回 `nil`。

```swift
if let oldValue = airports.updateValue("Dublin Airport", forKey: "DUB") {
    print("The old value for DUB was \(oldValue).")
}
// 打印 “The old value for DUB was Dublin.“
```

<!--
  - test: `dictionariesInferred`

  ```swifttest
  -> if let oldValue = airports.updateValue("Dublin Airport", forKey: "DUB") {
        print("The old value for DUB was \(oldValue).")
     }
  <- The old value for DUB was Dublin.
  ```
-->

您还可以使用下标语法从字典中为特定键检索值。由于可能请求不存在值的键，字典的下标会返回该字典值类型的可选值。如果字典中包含所请求键的值，下标将返回一个包含该键现有值的可选值。否则，下标将返回 `nil`。

```swift
if let airportName = airports["DUB"] {
    print("The name of the airport is \(airportName).")
} else {
    print("That airport isn't in the airports dictionary.")
}
// 打印 “The name of the airport is Dublin Airport.“
```

<!--
  - test: `dictionariesInferred`

  ```swifttest
  -> if let airportName = airports["DUB"] {
        print("The name of the airport is \(airportName).")
     } else {
        print("That airport isn't in the airports dictionary.")
     }
  <- The name of the airport is Dublin Airport.
  ```
-->

你可以使用下标语法通过为某个键赋值为 `nil` 来从字典中删除一个键值对。

```swift
airports["APL"] = "Apple International"
// “Apple International“ 不是APL的真实机场，所以删除它
airports["APL"] = nil
// APL 已经从字典中删除
```

<!--
  - test: `dictionariesInferred`

  ```swifttest
  -> airports["APL"] = "Apple International"
  // "Apple International" isn't the real airport for APL, so delete it
  -> airports["APL"] = nil
  // APL has now been removed from the dictionary
  >> if let deletedName = airports["APL"] {
  >>    print("The key-value pair for APL has *not* been deleted, but it should have been!")
  >>    print("It still has a value of \(deletedName)")
  >> } else {
  >>    print("APL has now been removed from the dictionary")
  >> }
  << APL has now been removed from the dictionary
  ```
-->

您还可以使用 `removeValue(forKey:)` 方法从字典中删除键值对。该方法在键值对存在时会将其移除并返回被移除的值，如果不存在该值，则返回 `nil`。

```swift
if let removedValue = airports.removeValue(forKey: "DUB") {
    print("The removed airport's name is \(removedValue).")
} else {
    print("The airports dictionary doesn't contain a value for DUB.")
}
// 打印 “The removed airport's name is Dublin Airport.“
```

<!--
  - test: `dictionariesInferred`

  ```swifttest
  -> if let removedValue = airports.removeValue(forKey: "DUB") {
        print("The removed airport's name is \(removedValue).")
     } else {
        print("The airports dictionary doesn't contain a value for DUB.")
     }
  <- The removed airport's name is Dublin Airport.
  ```
-->

### 遍历字典

您可以使用 `for`-`in` 循环遍历字典中的键值对。字典中的每个元素会作为一个 `(key, value)` 元组返回，您可以在迭代过程中将元组的成员分解为临时常量或变量。

```swift
for (airportCode, airportName) in airports {
    print("\(airportCode): \(airportName)")
}
// LHR: London Heathrow
// YYZ: Toronto Pearson
```

<!--
  - test: `dictionariesInferred`

  ```swifttest
  -> for (airportCode, airportName) in airports {
        print("\(airportCode): \(airportName)")
     }
  </ LHR: London Heathrow
  </ YYZ: Toronto Pearson
  ```
-->

有关 `for`-`in` 循环的更多信息，请参阅 <doc:ControlFlow#For-In-循环>.

您还可以通过访问字典的 `keys` 和 `values` 属性，获取字典的键或值的可遍历集合。

```swift
for airportCode in airports.keys {
    print("Airport code: \(airportCode)")
}
// Airport code: LHR
// Airport code: YYZ

for airportName in airports.values {
    print("Airport name: \(airportName)")
}
// Airport name: London Heathrow
// Airport name: Toronto Pearson
```

<!--
  - test: `dictionariesInferred`

  ```swifttest
  -> for airportCode in airports.keys {
        print("Airport code: \(airportCode)")
     }
  </ Airport code: LHR
  </ Airport code: YYZ

  -> for airportName in airports.values {
        print("Airport name: \(airportName)")
     }
  </ Airport name: London Heathrow
  </ Airport name: Toronto Pearson
  ```
-->

如果您需要将字典的键或值与采用 `Array` 实例的 API 一起使用，可以使用 `keys` 或 `values` 属性初始化一个新的数组。

```swift
let airportCodes = [String](airports.keys)
// airportCodes 赋值为 ["LHR", "YYZ"]

let airportNames = [String](airports.values)
// airportNames 赋值为 ["London Heathrow", "Toronto Pearson"]
```

<!--
  - test: `dictionariesInferred`

  ```swifttest
  -> let airportCodes = [String](airports.keys)
  /> airportCodes is [\"\(airportCodes[0])\", \"\(airportCodes[1])\"]
  </ airportCodes is ["LHR", "YYZ"]

  -> let airportNames = [String](airports.values)
  /> airportNames is [\"\(airportNames[0])\", \"\(airportNames[1])\"]
  </ airportNames is ["London Heathrow", "Toronto Pearson"]
  ```
-->

Swift 的 `Dictionary` 类型没有定义的顺序。要以特定顺序迭代字典的键或值，可以对其 `keys` 或 `values` 属性使用 `sorted()` 方法。

<!--
This source file is part of the Swift.org open source project

Copyright (c) 2014 - 2022 Apple Inc. and the Swift project authors
Licensed under Apache License v2.0 with Runtime Library Exception

See https://swift.org/LICENSE.txt for license information
See https://swift.org/CONTRIBUTORS.txt for the list of Swift project authors
-->
