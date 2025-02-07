
# 方法

定义并调用属于某个实例或者类型的函数。

*方法*是与特定类型关联的函数。
类、结构体和枚举都可以定义实例方法，这些方法封装了特定的任务和功能，用于处理给定类型的实例。
类、结构体和枚举还可以定义类型方法，这些方法与类型本身相关联。
类型方法类似于 Objective-C 中的类方法。

结构体和枚举在 Swift 中能够定义方法，这是与 C 和 Objective-C 的一个重大区别。
在 Objective-C 中，只有类可以定义方法。
而在 Swift 中，无论你选择定义类、结构体或枚举，你都可以灵活地为你创建的类型定义方法。

## 实例方法

*实例方法*是属于某个类、结构体或枚举实例的函数。
它们通过提供访问和修改实例属性的方式，或者提供与实例功能相关的操作，来支持实例的整体功能。
实例方法有着和函数完全一样的语法，具体描述可以参见 <doc:Functions>。

你在所属类型的开闭大括号内编写实例方法。
实例方法可以隐式访问该类型的所有其他实例方法和属性。
实例方法只能在该类型的特定实例上调用，而不能在没有实例的情况下独立调用。

这是一个定义简单“Counter”类的示例，可用于计算某个动作发生的次数：

```swift
class Counter {
    var count = 0
    func increment() {
        count += 1
    }
    func increment(by amount: Int) {
        count += amount
    }
    func reset() {
        count = 0
    }
}
```

<!--
  - test: `instanceMethods`

  ```swifttest
  -> class Counter {
        var count = 0
        func increment() {
           count += 1
        }
        func increment(by amount: Int) {
           count += amount
        }
        func reset() {
           count = 0
        }
     }
  ```
-->

`Counter` 类定义了三个实例方法：

- `increment()` 将计数器增加 `1`。
- `increment(by: Int)` 将计数器增加指定的整数值。
- `reset()` 将计数器重置为零。

`Counter` 类还声明了一个变量属性 `count`，用于跟踪当前的计数器值。

你可以使用与属性相同的点语法来调用实例方法：

```swift
let counter = Counter()
// the initial counter value is 0
counter.increment()
// the counter's value is now 1
counter.increment(by: 5)
// the counter's value is now 6
counter.reset()
// the counter's value is now 0
```

<!--
  - test: `instanceMethods`

  ```swifttest
  -> let counter = Counter()
  /> the initial counter value is \(counter.count)
  </ the initial counter value is 0
  -> counter.increment()
  /> the counter's value is now \(counter.count)
  </ the counter's value is now 1
  -> counter.increment(by: 5)
  /> the counter's value is now \(counter.count)
  </ the counter's value is now 6
  -> counter.reset()
  /> the counter's value is now \(counter.count)
  </ the counter's value is now 0
  ```
-->

函数参数可以同时拥有一个参数名称（在函数体内使用）和一个参数标签（在调用函数时使用），参见<doc:Functions#函数参数标签和参数名称>。
方法参数也是如此，因为方法只是与某种类型关联的函数。

### self 属性

每个类型的实例都有一个隐式属性，称为 `self`，它与实例本身完全等同。
你可以在实例方法中使用 `self` 属性来引用当前实例。

上面示例中的 `increment()` 方法可以这样编写：

```swift
func increment() {
    self.count += 1
}
```

<!--
  - test: `instanceMethodsIncrement`

  ```swifttest
  >> class Counter {
  >> var count: Int = 0
     func increment() {
        self.count += 1
     }
  >> }
  ```
-->

<!--
  NOTE: I'm slightly cheating with my testing of this excerpt, but it works!
-->

实际上，在代码中你不需要经常写 `self`。
如果你没有显式地写出 `self`，当你在方法中使用已知的属性或方法名称时，Swift 会假设你是在引用当前实例的属性或方法。
这种假设在 `Counter` 类的三个实例方法中通过直接使用 `count`（而非 `self.count`）得到了体现。

此规则的主要例外情况发生在实例方法的形参名称与该实例的属性名称相同时。
在这种情况下，形参名称优先，此时就需要以更明确的方式引用属性。你可以使用 `self` 属性来区分形参名称和属性名称。

在如下情况中，`self` 用于区分一个名为 x 的方法形参和一个同样名为 x 的实例属性：

```swift
struct Point {
    var x = 0.0, y = 0.0
    func isToTheRightOf(x: Double) -> Bool {
        return self.x > x
    }
}
let somePoint = Point(x: 4.0, y: 5.0)
if somePoint.isToTheRightOf(x: 1.0) {
    print("This point is to the right of the line where x == 1.0")
}
// Prints "This point is to the right of the line where x == 1.0"
```

<!--
  - test: `self`

  ```swifttest
  -> struct Point {
        var x = 0.0, y = 0.0
        func isToTheRightOf(x: Double) -> Bool {
           return self.x > x
        }
     }
  -> let somePoint = Point(x: 4.0, y: 5.0)
  -> if somePoint.isToTheRightOf(x: 1.0) {
        print("This point is to the right of the line where x == 1.0")
     }
  <- This point is to the right of the line where x == 1.0
  ```
-->

如果没有 `self` 前缀，Swift 会假定 `x` 的两个使用都指的是名为 `x` 的方法形参。

### 从实例方法内部修改值类型

结构体和枚举是 *值类型*。默认情况下，值类型的属性不能在其实例方法内部被修改。

<!--
  TODO: find out why.  once I actually know why, explain it.
-->

然而，如果你需要在特定方法内部修改结构体或枚举的属性，你可以为该方法启用 *mutating* 行为。
这样方法就可以在内部改变其属性，并且所有的更改在方法结束时会写回到原始结构体中。
该方法还可以将一个全新的实例赋值给隐式的 `self` 属性，并且这个新实例将在方法结束时替换现有实例。

你可以通过在该方法的 `func` 关键字前添加 `mutating` 关键字来启用这种行为：

```swift
struct Point {
    var x = 0.0, y = 0.0
    mutating func moveBy(x deltaX: Double, y deltaY: Double) {
        x += deltaX
        y += deltaY
    }
}
var somePoint = Point(x: 1.0, y: 1.0)
somePoint.moveBy(x: 2.0, y: 3.0)
print("The point is now at (\(somePoint.x), \(somePoint.y))")
// Prints "The point is now at (3.0, 4.0)"
```

<!--
  - test: `selfStructures`

  ```swifttest
  -> struct Point {
        var x = 0.0, y = 0.0
        mutating func moveBy(x deltaX: Double, y deltaY: Double) {
           x += deltaX
           y += deltaY
        }
     }
  -> var somePoint = Point(x: 1.0, y: 1.0)
  -> somePoint.moveBy(x: 2.0, y: 3.0)
  -> print("The point is now at (\(somePoint.x), \(somePoint.y))")
  <- The point is now at (3.0, 4.0)
  ```
-->

上面的 `Point` 结构体定义了一个 mutating 的 `moveBy(x:y:)` 方法，该方法可以将一个 `Point` 实例移动一定的距离。
这个方法直接修改其调用的点，而不是返回一个新的点。为了使该方法能够修改其属性，`mutating` 关键字被添加到它的定义中。

请注意，你不能在结构体类型的常量上调用 mutating 方法，因为其属性不能被改变，即使它们是可变属性，
参见：<doc:Properties#常量结构体实例的存储属性>

```swift
let fixedPoint = Point(x: 3.0, y: 3.0)
fixedPoint.moveBy(x: 2.0, y: 3.0)
// this will report an error
```

<!--
  - test: `selfStructures-err`

  ```swifttest
  >> struct Point {
  >>    var x = 0.0, y = 0.0
  >>    mutating func moveBy(x deltaX: Double, y deltaY: Double) {
  >>       x += deltaX
  >>       y += deltaY
  >>    }
  >> }
  -> let fixedPoint = Point(x: 3.0, y: 3.0)
  -> fixedPoint.moveBy(x: 2.0, y: 3.0)
  !$ error: cannot use mutating member on immutable value: 'fixedPoint' is a 'let' constant
  !! fixedPoint.moveBy(x: 2.0, y: 3.0)
  !! ~~~~~~~~~~ ^
  !$ note: change 'let' to 'var' to make it mutable
  !! let fixedPoint = Point(x: 3.0, y: 3.0)
  !! ^~~
  !! var
  // this will report an error
  ```
-->

<!--
  TODO: talk about nonmutating as well.
  Struct setters are implicitly 'mutating' by default and thus don't work on 'let's.
  However, JoeG says that this ought to work
  if the setter for the computed property is explicitly defined as @!mutating.
-->

### 在 mutating 方法中给 self 赋值

mutating 方法可以将一个全新的实例赋值给隐式的 `self` 属性。上面的 `Point` 示例可以改写为以下方式：

```swift
struct Point {
    var x = 0.0, y = 0.0
    mutating func moveBy(x deltaX: Double, y deltaY: Double) {
        self = Point(x: x + deltaX, y: y + deltaY)
    }
}
```

<!--
  - test: `selfStructuresAssign`

  ```swifttest
  -> struct Point {
        var x = 0.0, y = 0.0
        mutating func moveBy(x deltaX: Double, y deltaY: Double) {
           self = Point(x: x + deltaX, y: y + deltaY)
        }
     }
  >> var somePoint = Point(x: 1.0, y: 1.0)
  >> somePoint.moveBy(x: 2.0, y: 3.0)
  >> print("The point is now at (\(somePoint.x), \(somePoint.y))")
  << The point is now at (3.0, 4.0)
  ```
-->

这个版本的 mutating `moveBy(x:y:)` 方法创建了一个新的结构体，其 `x` 和 `y` 值被设置为目标位置。
调用这个替代版本方法与调用早期版本方法的最终结果完全相同。

枚举的 mutating 方法可以将隐式的 `self` 参数设置为同一枚举的不同case：

```swift
enum TriStateSwitch {
    case off, low, high
    mutating func next() {
        switch self {
        case .off:
            self = .low
        case .low:
            self = .high
        case .high:
            self = .off
        }
    }
}
var ovenLight = TriStateSwitch.low
ovenLight.next()
// ovenLight is now equal to .high
ovenLight.next()
// ovenLight is now equal to .off
```

<!--
  - test: `selfEnumerations`

  ```swifttest
  -> enum TriStateSwitch {
        case off, low, high
        mutating func next() {
           switch self {
              case .off:
                 self = .low
              case .low:
                 self = .high
              case .high:
                 self = .off
           }
        }
     }
  -> var ovenLight = TriStateSwitch.low
  -> ovenLight.next()
  // ovenLight is now equal to .high
  -> ovenLight.next()
  // ovenLight is now equal to .off
  ```
-->

这个示例定义了一个三状态开关的枚举。每次调用其 `next()` 方法时，开关将在三种不同的电源状态（`off`, `low` 和 `high`）之间循环切换。

## 类型方法

如上所述，实例方法是在特定类型的实例上调用的方法。
你还可以定义在类型本身上调用的方法。这类方法称为 *类型方法*。
你可以通过在方法的 `func` 关键字前添加 `static` 关键字来标识类型方法。
类可以使用 `class` 关键字代替 `static` ，以允许子类覆盖父类对该方法的实现。

> 注意：在 Objective-C 中，你只能为 Objective-C 类定义类型级方法。
> 在 Swift 中，你可以为所有类、结构体和枚举定义类型级方法。
> 每个类型方法都明确作用于其对应的类型。

类型方法与实例方法一样，使用点语法调用。
然而你是在类型上调用类型方法，而不是在该类型的实例上调用。
下面是如何在一个名为 `SomeClass`的类上调用类型方法的示例：

```swift
class SomeClass {
    class func someTypeMethod() {
        // type method implementation goes here
    }
}
SomeClass.someTypeMethod()
```

<!--
  - test: `typeMethods`

  ```swifttest
  -> class SomeClass {
        class func someTypeMethod() {
           // type method implementation goes here
        }
     }
  -> SomeClass.someTypeMethod()
  ```
-->

在类型方法的主体内部，隐式的 `self` 属性指的是类型本身，而不是该类型的实例。
这意味着你可以使用 `self` 来区分类型属性和类型方法形参，正如你在实例属性和实例方法形参中所做的那样。

更一般地说，在类型方法的主体内使用的任何未限定的方法和属性名称，都将指向其他类型级的方法和属性。
类型方法可以直接通过其他方法的名称调用另一个类型方法，而无需在前面加上类型名称。
类似地，结构体和枚举上的类型方法可以通过使用类型属性的名称来访问类型属性，无需加类型名称前缀。

下面的示例定义了一个名为 `LevelTracker` 的结构，用于跟踪玩家在游戏不同关卡或阶段的进度。
这是一个单人游戏，但可以在单个设备上存储多个玩家的信息。

游戏的所有关卡（除了第一关）在首次游玩时都是锁定的。
每当一个玩家完成一个关卡，该关卡将对设备上的所有玩家解锁。
`LevelTracker` 结构使用类型属性和方法来跟踪游戏中哪些关卡已被解锁。
同时，它还跟踪每个玩家的当前关卡。

```swift
struct LevelTracker {
    static var highestUnlockedLevel = 1
    var currentLevel = 1

    static func unlock(_ level: Int) {
        if level > highestUnlockedLevel { highestUnlockedLevel = level }
    }

    static func isUnlocked(_ level: Int) -> Bool {
        return level <= highestUnlockedLevel
    }

    @discardableResult
    mutating func advance(to level: Int) -> Bool {
        if LevelTracker.isUnlocked(level) {
            currentLevel = level
            return true
        } else {
            return false
        }
    }
}
```

<!--
  - test: `typeMethods`

  ```swifttest
  -> struct LevelTracker {
        static var highestUnlockedLevel = 1
        var currentLevel = 1
  ---
  ->    static func unlock(_ level: Int) {
           if level > highestUnlockedLevel { highestUnlockedLevel = level }
        }
  ---
  ->    static func isUnlocked(_ level: Int) -> Bool {
           return level <= highestUnlockedLevel
        }
  ---
  ->    @discardableResult
        mutating func advance(to level: Int) -> Bool {
           if LevelTracker.isUnlocked(level) {
              currentLevel = level
              return true
           } else {
              return false
           }
        }
     }
  ```
-->

`LevelTracker` 结构跟踪所有玩家已解锁的最高关卡。
该值存储在名为 `highestUnlockedLevel` 的类型属性中。

`LevelTracker` 还定义了两个类型函数来处理 `highestUnlockedLevel` 属性。
第一个是名为 `unlock(_:)` 的类型函数，它在解锁新关卡时更新 `highestUnlockedLevel` 的值。
第二个是名为 `isUnlocked(_:)` 的便利类型函数，如果特定关卡编号已经解锁，则返回 `true`。
（请注意，这些类型方法可以直接访问 `highestUnlockedLevel` 类型属性，而不需要写成 `LevelTracker.highestUnlockedLevel`。）

除了类型属性和类型方法，`LevelTracker` 还跟踪每个玩家在游戏中的进度。
它使用一个名为 `currentLevel` 的实例属性来记录玩家当前正在玩的关卡。

为了帮助管理 `currentLevel` 属性，`LevelTracker` 定义了一个名为 `advance(to:)` 的实例方法。
在更新 `currentLevel` 之前，该方法会检查请求的新关卡是否已经解锁。
`advance(to:)` 方法返回一个布尔值，以指示是否成功设置了 `currentLevel`。
由于调用 `advance(to:)` 方法的代码不一定会关注返回值，因此该函数被标记为 `@discardableResult` 属性。
有关此属性的更多信息，请参见 <doc:Attributes>。

`LevelTracker` 结构与下面展示的 `Player` 类一起使用，用于跟踪和更新每个玩家的进度：

```swift
class Player {
    var tracker = LevelTracker()
    let playerName: String
    func complete(level: Int) {
        LevelTracker.unlock(level + 1)
        tracker.advance(to: level + 1)
    }
    init(name: String) {
        playerName = name
    }
}
```

<!--
  - test: `typeMethods`

  ```swifttest
  -> class Player {
        var tracker = LevelTracker()
        let playerName: String
        func complete(level: Int) {
           LevelTracker.unlock(level + 1)
           tracker.advance(to: level + 1)
        }
        init(name: String) {
           playerName = name
        }
     }
  ```
-->

`Player` 类创建了一个新的 `LevelTracker` 实例来跟踪该玩家的进度。
它还提供了一个名为 `complete(level:)`的方法，每当玩家完成某个关卡时调用。
此方法为所有玩家解锁下一个关卡，并更新该玩家的进度，使其进入下一个关卡。
（ `advance(to:)` 的Boolean返回值被忽略，因为通过前一行对 `LevelTracker.unlock(_:)` 的调用，关卡已被解锁。）

你可以为一个新玩家创建 `Player` 类的实例，并查看当该玩家完成第一关时会发生什么：

```swift
var player = Player(name: "Argyrios")
player.complete(level: 1)
print("highest unlocked level is now \(LevelTracker.highestUnlockedLevel)")
// Prints "highest unlocked level is now 2"
```

<!--
  - test: `typeMethods`

  ```swifttest
  -> var player = Player(name: "Argyrios")
  -> player.complete(level: 1)
  -> print("highest unlocked level is now \(LevelTracker.highestUnlockedLevel)")
  <- highest unlocked level is now 2
  ```
-->

如果你创建第二个玩家，并尝试将其移动到尚未被任何玩家解锁的关卡，那么尝试设置玩家的当前关卡时会失败：

```swift
player = Player(name: "Beto")
if player.tracker.advance(to: 6) {
    print("player is now on level 6")
} else {
    print("level 6 hasn't yet been unlocked")
}
// Prints "level 6 hasn't yet been unlocked"
```

<!--
  - test: `typeMethods`

  ```swifttest
  -> player = Player(name: "Beto")
  -> if player.tracker.advance(to: 6) {
        print("player is now on level 6")
     } else {
        print("level 6 hasn't yet been unlocked")
     }
  <- level 6 hasn't yet been unlocked
  ```
-->

<!--
  TODO: Method Binding
  --------------------

  TODO: you can get a function that refers to a method, either with or without the 'self' argument already being bound:
  class C {
     func foo(x: Int) -> Float { ... }
  }
  var c = C()
  var boundFunc = c.foo   // a function with type (Int) -> Float
  var unboundFunc = C.foo // a function with type (C) -> (Int) -> Float

  TODO: selector-style methods can be referenced as foo.bar:bas:
  (see Doug's comments from the 2014-03-12 release notes)
-->

<!--
This source file is part of the Swift.org open source project

Copyright (c) 2014 - 2022 Apple Inc. and the Swift project authors
Licensed under Apache License v2.0 with Runtime Library Exception

See https://swift.org/LICENSE.txt for license information
See https://swift.org/CONTRIBUTORS.txt for the list of Swift project authors
-->
