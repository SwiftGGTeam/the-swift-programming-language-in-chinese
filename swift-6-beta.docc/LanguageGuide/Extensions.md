# 扩展

为现有类型添加功能。

**扩展（Extensions）**用于为现有的类、结构体、枚举或协议类型添加新功能。这包括了扩展那些您无法访问原始源代码的类型的能力（即*追溯建模*）。扩展和 Objective-C 的分类很相似。（与 Objective-C 分类不同的是，Swift 扩展是没有名字的。）

Swift 中的扩展可以：

 - 添加计算实例属性和计算类属性
 - 定义实例方法和类方法
 - 提供新的构造器
 - 定义下标
 - 定义和使用新的嵌套类型
 - 使已经存在的类型遵循一个协议

在 Swift 中，你甚至可以扩展协议以提供其需要的实现，或者添加额外功能给遵循的类型所使用。你可以从 <doc:Protocols#Protocol-Extensions> 获取更多细节。

> 注意:
> 扩展可以给一个类型添加新的功能，但是不能重写已经存在的功能。

<!--
  - test: `extensionsCannotOverrideExistingBehavior`

  ```swifttest
  -> class C {
        var x = 0
        func foo() {}
     }
  -> extension C {
        override var x: Int {
           didSet {
              print("new x is \(x)")
           }
        }
        override func foo() {
           print("called overridden foo")
        }
     }
  !$ error: property does not override any property from its superclass
  !! override var x: Int {
  !! ~~~~~~~~     ^
  !$ error: ambiguous use of 'x'
  !! print("new x is \(x)")
  !!            ^
  !$ note: found this candidate
  !! var x = 0
  !!     ^
  !$ note: found this candidate
  !! override var x: Int {
  !!              ^
  !$ error: invalid redeclaration of 'x'
  !! override var x: Int {
  !!              ^
  !$ note: 'x' previously declared here
  !! var x = 0
  !!     ^
  !$ error: method does not override any method from its superclass
  !! override func foo() {
  !! ~~~~~~~~      ^
  !$ error: invalid redeclaration of 'foo()'
  !! override func foo() {
  !!               ^
  !$ note: 'foo()' previously declared here
  !! func foo() {}
  !!      ^
  ```
-->

## 扩展的语法

使用 `extension` 关键字声明扩展：

```swift
extension SomeType {
    // 在这里给 SomeType 添加新的功能
}
```

<!--
  - test: `extensionSyntax`

  ```swifttest
  >> struct SomeType {}
  -> extension SomeType {
        // new functionality to add to SomeType goes here
     }
  ```
-->

扩展可以扩充一个现有的类型，给它添加一个或多个协议。在添加协议的遵循声明时，协议名称的写法和类或者结构体一样：

```swift
extension SomeType: SomeProtocol, AnotherProtocol {
    // 协议所需要的实现写在这里
}
```

<!--
  - test: `extensionSyntax`

  ```swifttest
  >> protocol SomeProtocol {}
  >> protocol AnotherProtocol {}
  -> extension SomeType: SomeProtocol, AnotherProtocol {
        // implementation of protocol requirements goes here
     }
  ```
-->

这种遵循协议的方式在 <doc:Protocols#Adding-Protocol-Conformance-with-an-Extension> 中有描述。

扩展可以使用在现有泛型类型上，就像 <doc:Generics#Extending-a-Generic-Type> 中描述的一样。你还可以使用扩展给泛型类型有条件地添加功能，就像 <doc:Generics#Extensions-with-a-Generic-Where-Clause> 中描述的一样。

> 注意: 对一个现有的类型，如果你定义了一个扩展来添加新的功能，那么这个类型的所有实例都可以使用这个新功能，包括那些在扩展定义之前就存在的实例。

## 计算属性

扩展可以给现有类型添加计算实例属性和计算类属性。这个例子给 Swift 内建的 `Double` 类型添加了五个计算型实例属性，以提供基本的距离单位处理功能：

```swift
extension Double {
    var km: Double { return self * 1_000.0 }
    var m: Double { return self }
    var cm: Double { return self / 100.0 }
    var mm: Double { return self / 1_000.0 }
    var ft: Double { return self / 3.28084 }
}
let oneInch = 25.4.mm
print("One inch is \(oneInch) meters")
// 打印“One inch is 0.0254 meters”
let threeFeet = 3.ft
print("Three feet is \(threeFeet) meters")
// 打印“Three feet is 0.914399970739201 meters”
```

<!--
  - test: `extensionsComputedProperties`

  ```swifttest
  -> extension Double {
        var km: Double { return self * 1_000.0 }
        var m: Double { return self }
        var cm: Double { return self / 100.0 }
        var mm: Double { return self / 1_000.0 }
        var ft: Double { return self / 3.28084 }
     }
  -> let oneInch = 25.4.mm
  -> print("One inch is \(oneInch) meters")
  <- One inch is 0.0254 meters
  -> let threeFeet = 3.ft
  -> print("Three feet is \(threeFeet) meters")
  <- Three feet is 0.914399970739201 meters
  ```
-->

这些计算属性表示一个 `Double` 值应该被视为某种长度单位。尽管它们是作为计算属性实现的，但是这些属性的名称可以使用点语法附加到浮点字面量值之后，作为一种使用该字面量值执行距离转换的方式。

在这个例子中，`Double` 类型的 `1.0` 代表的是“一米”。这就是为什么计算属性 `m` 返回的是 `self` ——表达式 `1.m` 被认为是计算一个 `Double` 类型的 `1.0`。

其他单位需要进行一些转换，才能表示为以米为单位的值。一千米等于 1000 米，所以计算属性 `km` 将该值乘以 `1_000.00`来将其转换为以米为单位的数字。类似地，一米等于 3.28084 英尺，因此计算属性 `ft` 将底层的 `Double` 值除以 `3.28084` 来将其从英尺转换为米。

这些属性是只读的计算属性，因此为了简便，它们的表达方式省略了 `get` 关键字。它们的返回值是 `Double` 类型，可以在任何接受 `Double` 的数学计算中使用:

```swift
let aMarathon = 42.km + 195.m
print("A marathon is \(aMarathon) meters long")
// 打印“A marathon is 42195.0 meters long”
```

<!--
  - test: `extensionsComputedProperties`

  ```swifttest
  -> let aMarathon = 42.km + 195.m
  -> print("A marathon is \(aMarathon) meters long")
  <- A marathon is 42195.0 meters long
  ```
-->

> 注意: 扩展可以添加新的计算属性，但是它们不能添加存储属性，也不能为现有属性添加属性观察器。

<!--
  - test: `extensionsCannotAddStoredProperties`

  ```swifttest
  -> class C {}
  -> extension C { var x = 0 }
  !$ error: extensions must not contain stored properties
  !! extension C { var x = 0 }
  !!                   ^
  ```
-->

<!--
  TODO: change this example to something more advisable / less contentious.
-->

## 构造器

扩展可以为现有类型添加新的构造器。这使你可以扩展其他类型以接受你自己的自定义类型作为构造器参数，或提供类型的原始实现中未包含的其他构造选项。

扩展可以为一个类添加新的便利构造器（convenience initializer），但是它们不能为一个类添加新的指定构造器（designated initializer）或析构器（deinitializer）。指定构造器和析构器必须始终由类的原始实现提供。

如果你使用扩展为一个值类型添加构造器，并且该值类型提供了所有存储属性的默认值，且没有定义任何自定义构造器，你就可以在扩展的构造器中调用该值类型的默认构造器和成员构造器。如果你已经将构造器写在该值类型的原始实现中，则不适用于这种情况，正如 <doc:Initialization#Initializer-Delegation-for-Value-Types> 中所描述的那样。

如果你使用扩展为另一个模块中声明的结构体添加构造器，那么在调用定义模块中的构造器之前，新的构造器是不能访问 `self` 的。

以下示例定义了一个自定义的 `Rect` 结构体来表示几何矩形。该示例还定义了两个辅助结构体 `Size` 和 `Point`，它们都为所有属性提供了默认值 `0.0`：

```swift
struct Size {
    var width = 0.0, height = 0.0
}
struct Point {
    var x = 0.0, y = 0.0
}
struct Rect {
    var origin = Point()
    var size = Size()
}
```

<!--
  - test: `extensionsInitializers`

  ```swifttest
  -> struct Size {
        var width = 0.0, height = 0.0
     }
  -> struct Point {
        var x = 0.0, y = 0.0
     }
  -> struct Rect {
        var origin = Point()
        var size = Size()
     }
  ```
-->

因为 `Rect` 结构体为所有属性都提供了默认值，它会自动获得默认构造器和成员构造器，如 <doc:Initialization#Default-Initializers> 中所述。这些构造器可用于创建新的 `Rect` 实例:

```swift
let defaultRect = Rect()
let memberwiseRect = Rect(origin: Point(x: 2.0, y: 2.0),
    size: Size(width: 5.0, height: 5.0))
```

<!--
  - test: `extensionsInitializers`

  ```swifttest
  -> let defaultRect = Rect()
  -> let memberwiseRect = Rect(origin: Point(x: 2.0, y: 2.0),
        size: Size(width: 5.0, height: 5.0))
  ```
-->

你可以通过扩展 `Rect` 结构体来额外提供一个允许指定 center 和 size 的构造器：

```swift
extension Rect {
    init(center: Point, size: Size) {
        let originX = center.x - (size.width / 2)
        let originY = center.y - (size.height / 2)
        self.init(origin: Point(x: originX, y: originY), size: size)
    }
}
```

<!--
  - test: `extensionsInitializers`

  ```swifttest
  -> extension Rect {
        init(center: Point, size: Size) {
           let originX = center.x - (size.width / 2)
           let originY = center.y - (size.height / 2)
           self.init(origin: Point(x: originX, y: originY), size: size)
        }
     }
  ```
-->

这个新的构造器首先根据提供的 `center` 和 `size` 计算一个适当的原点。然后这个构造器调用结构体自带的成员构造器 `init(origin:size:)`，它会将新的 origin 和 size 值储存在相应的属性中：

```swift
let centerRect = Rect(center: Point(x: 4.0, y: 4.0),
    size: Size(width: 3.0, height: 3.0))
// centerRect 的 origin 是 (2.5, 2.5) 并且它的 size 是 (3.0, 3.0)
```

<!--
  - test: `extensionsInitializers`

  ```swifttest
  -> let centerRect = Rect(center: Point(x: 4.0, y: 4.0),
        size: Size(width: 3.0, height: 3.0))
  /> centerRect's origin is (\(centerRect.origin.x), \(centerRect.origin.y)) and its size is (\(centerRect.size.width), \(centerRect.size.height))
  </ centerRect's origin is (2.5, 2.5) and its size is (3.0, 3.0)
  ```
-->

> 注意: 如果你使用扩展提供了一个新的构造器，你仍然需要确保在构造器完成时每个实例都被完全初始化。

## 方法

扩展可以为现有类型添加新的实例方法和类方法。以下示例为 `Int` 类型添加了一个名为 `repetitions` 的新实例方法：

```swift
extension Int {
    func repetitions(task: () -> Void) {
        for _ in 0..<self {
            task()
        }
    }
}
```

<!--
  - test: `extensionsInstanceMethods`

  ```swifttest
  -> extension Int {
        func repetitions(task: () -> Void) {
           for _ in 0..<self {
              task()
           }
        }
     }
  ```
-->

`repetitions(task:)` 方法仅接受一个类型为 `() -> Void` 的参数，它表示一个没有参数没有返回值的函数。

定义了这个扩展之后，你可以对任意整形数值调用 `repetitions(task:)` 方法，以执行指定次数的任务:

```swift
3.repetitions {
    print("Hello!")
}
// Hello!
// Hello!
// Hello!
```

<!--
  - test: `extensionsInstanceMethods`

  ```swifttest
  -> 3.repetitions {
        print("Hello!")
     }
  </ Hello!
  </ Hello!
  </ Hello!
  ```
-->

### 变值实例方法

通过扩展添加的实例方法同样也可以修改（modify）（或 *改变（mutating）*）实例本身。修改 `self` 或其属性的结构体和枚举方法，必须将实例方法标记为 `mutating`，就像原始实现中的变值方法（mutating methods）一样。

下面的示例为 Swift 的 `Int` 类型添加了一个新的变值方法 `square`，它可以计算原始值的平方：

```swift
extension Int {
    mutating func square() {
        self = self * self
    }
}
var someInt = 3
someInt.square()
// someInt 现在是 9
```

<!--
  - test: `extensionsInstanceMethods`

  ```swifttest
  -> extension Int {
        mutating func square() {
           self = self * self
        }
     }
  -> var someInt = 3
  -> someInt.square()
  /> someInt is now \(someInt)
  </ someInt is now 9
  ```
-->

## 下标

扩展可以为现有类型添加新的下标。这个示例为 Swift 内置的 `Int` 类型添加了一个整数下标。下标 `[n]` 返回数字从右边数第 `n` 位的十进制数字:

- `123456789[0]` 返回 `9`
- `123456789[1]` 返回 `8`

……以此类推：

```swift
extension Int {
    subscript(digitIndex: Int) -> Int {
        var decimalBase = 1
        for _ in 0..<digitIndex {
            decimalBase *= 10
        }
        return (self / decimalBase) % 10
    }
}
746381295[0]
// 返回 5
746381295[1]
// 返回 9
746381295[2]
// 返回 2
746381295[8]
// 返回 7
```

<!--
  - test: `extensionsSubscripts`

  ```swifttest
  -> extension Int {
        subscript(digitIndex: Int) -> Int {
           var decimalBase = 1
           for _ in 0..<digitIndex {
              decimalBase *= 10
           }
           return (self / decimalBase) % 10
        }
     }
  >> let r0 =
  -> 746381295[0]
  /> returns \(r0)
  </ returns 5
  >> let r1 =
  -> 746381295[1]
  /> returns \(r1)
  </ returns 9
  >> let r2 =
  -> 746381295[2]
  /> returns \(r2)
  </ returns 2
  >> let r3 =
  -> 746381295[8]
  /> returns \(r3)
  </ returns 7
  ```
-->

<!--
  Rewrite the above to avoid bare expressions.
  Tracking bug is <rdar://problem/35301593>
-->

<!--
  TODO: Replace the for loop above with an exponent,
  if/when integer exponents land in the stdlib.
  Darwin's pow() function is only for floating point.
-->

如果 `Int` 值的数字位数不足以满足所请求的索引，那么下标实现会返回 `0`，就好像在数字左边补上了 0：

```swift
746381295[9]
// 返回 0，就好像你进行了这个请求：
0746381295[9]
```

<!--
  - test: `extensionsSubscripts`

  ```swifttest
  >> let r4 =
  -> 746381295[9]
  /> returns \(r4), as if you had requested:
  </ returns 0, as if you had requested:
  >> let r5 =
  -> 0746381295[9]
  ```
-->

<!--
  TODO: provide an explanation of this example
-->

<!--
  Rewrite the above to avoid bare expressions.
  Tracking bug is <rdar://problem/35301593>
-->

## 嵌套类型

扩展可以给现有的类，结构体，和枚举添加新的嵌套类型：

```swift
extension Int {
    enum Kind {
        case negative, zero, positive
    }
    var kind: Kind {
        switch self {
        case 0:
            return .zero
        case let x where x > 0:
            return .positive
        default:
            return .negative
        }
    }
}
```

<!--
  - test: `extensionsNestedTypes`

  ```swifttest
  -> extension Int {
        enum Kind {
           case negative, zero, positive
        }
        var kind: Kind {
           switch self {
              case 0:
                 return .zero
              case let x where x > 0:
                 return .positive
              default:
                 return .negative
           }
        }
     }
  ```
-->

这个例子给 `Int` 添加了一个新的嵌套枚举。这个枚举叫做 `Kind`，表示特定整数所代表的数字类型。具体来说，它表示数字是负数、零还是正数。

这个例子也给 `Int` 添加了一个新的计算实例属性，叫做 `kind`，它返回被操作整数所对应的 `Kind` 枚举值。

现在，这个嵌套枚举可以用于任何 `Int` 值：

```swift
func printIntegerKinds(_ numbers: [Int]) {
    for number in numbers {
        switch number.kind {
        case .negative:
            print("- ", terminator: "")
        case .zero:
            print("0 ", terminator: "")
        case .positive:
            print("+ ", terminator: "")
        }
    }
    print("")
}
printIntegerKinds([3, 19, -27, 0, -6, 0, 7])
// 打印“+ + - 0 - 0 + ”
```

<!--
  - test: `extensionsNestedTypes`

  ```swifttest
  -> func printIntegerKinds(_ numbers: [Int]) {
        for number in numbers {
           switch number.kind {
              case .negative:
                 print("- ", terminator: "")
              case .zero:
                 print("0 ", terminator: "")
              case .positive:
                 print("+ ", terminator: "")
           }
        }
        print("")
     }
  -> printIntegerKinds([3, 19, -27, 0, -6, 0, 7])
  << + + - 0 - 0 +
  // Prints "+ + - 0 - 0 + "
  ```
-->

<!--
  Workaround for rdar://26016325
-->

这个函数 `printIntegerKinds(_:)` 接受一个 `Int` 值的数组作为输入，并逐个遍历这些值。对于数组中的每个整数，该函数都会检查它的 `kind` 计算属性，然后打印适当的描述。

> 注意: `number.kind` 已经被认为是 `Int.Kind` 类型。所以，在 `switch` 语句中所有的 `Int.Kind` 枚举值可以被缩写，例如使用 `.negative` 替代 `Int.Kind.negative`。

> 测试版软件:
>
> 本文档包含有关正在开发的 API 或技术的初步信息。此信息可能会发生变化，根据本文档实施的软件应使用最终操作系统软件进行测试。
>
> 了解有关使用 [Apple 测试版软件](https://developer.apple.com/support/beta-software/) 的更多信息.

<!--
This source file is part of the Swift.org open source project
Copyright (c) 2014 - 2022 Apple Inc. and the Swift project authors
Licensed under Apache License v2.0 with Runtime Library Exception
See https://swift.org/LICENSE.txt for license information
See https://swift.org/CONTRIBUTORS.txt for the list of Swift project authors
-->