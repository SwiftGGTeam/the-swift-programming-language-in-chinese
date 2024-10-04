# 方法

定义并调用属于实例或类型的函数。

*方法*是与特定类型关联的函数。
类、结构体和枚举都可以定义实例方法，这些方法封装了处理给定类型实例的特定任务和功能。
类、结构体和枚举还可以定义类型方法，这些方法与类型本身相关联。
类型方法类似于 Objective-C 中的类方法。

结构体和枚举在 Swift 中能够定义方法，这是与 C 和 Objective-C 的一个重大区别。
在 Objective-C 中，只有类可以定义方法。
而在 Swift 中，无论你选择定义类、结构体或枚举，你都可以灵活地为你创建的类型定义方法。

## 实例方法

*实例方法*是属于某个类、结构体或枚举实例的函数。
它们通过提供访问和修改实例属性的方法，或者提供与实例功能相关的操作，来支持实例的整体功能。
实例方法的语法与函数完全相同，具体描述可以参见 <doc:Functions>。

你在定义类型时，将实例方法写在类型的大括号内。
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

函数参数可以同时拥有一个参数名称（在函数体内使用）和一个参数标签（在调用函数时使用），参见<doc:Functions#Function-Argument-Labels-and-Parameter-Names>。
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
如果你没有显式地写出 `self`，Swift会假定你在方法内部使用已知的属性或方法名时，指的是当前实例的属性或方法。
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
参见：<doc:Properties#Stored-Properties-of-Constant-Structure-Instances>

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

## Type Methods

Instance methods, as described above,
are methods that you call on an instance of a particular type.
You can also define methods that are called on the type itself.
These kinds of methods are called *type methods*.
You indicate type methods by writing
the `static` keyword before the method's `func` keyword.
Classes can use the `class` keyword instead,
to allow subclasses to override the superclass’s implementation of that method.

> Note: In Objective-C, you can define type-level methods only for Objective-C classes.
> In Swift, you can define type-level methods for all classes, structures, and enumerations.
> Each type method is explicitly scoped to the type it supports.

Type methods are called with dot syntax, like instance methods.
However, you call type methods on the type, not on an instance of that type.
Here's how you call a type method on a class called `SomeClass`:

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

Within the body of a type method,
the implicit `self` property refers to the type itself,
rather than an instance of that type.
This means that you can use `self` to disambiguate between
type properties and type method parameters,
just as you do for instance properties and instance method parameters.

More generally, any unqualified method and property names that you use
within the body of a type method will refer to other type-level methods and properties.
A type method can call another type method with the other method's name,
without needing to prefix it with the type name.
Similarly, type methods on structures and enumerations can access type properties
by using the type property's name without a type name prefix.

The example below defines a structure called `LevelTracker`,
which tracks a player's progress through the different levels or stages of a game.
It's a single-player game,
but can store information for multiple players on a single device.

All of the game's levels (apart from level one) are locked when the game is first played.
Every time a player finishes a level,
that level is unlocked for all players on the device.
The `LevelTracker` structure uses type properties and methods
to keep track of which levels of the game have been unlocked.
It also tracks the current level for an individual player.

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

The `LevelTracker` structure keeps track of the highest level that any player has unlocked.
This value is stored in a type property called `highestUnlockedLevel`.

`LevelTracker` also defines two type functions to work with
the `highestUnlockedLevel` property.
The first is a type function called `unlock(_:)`,
which updates the value of `highestUnlockedLevel` whenever a new level is unlocked.
The second is a convenience type function called `isUnlocked(_:)`,
which returns `true` if a particular level number is already unlocked.
(Note that these type methods can access the `highestUnlockedLevel` type property
without your needing to write it as `LevelTracker.highestUnlockedLevel`.)

In addition to its type property and type methods,
`LevelTracker` tracks an individual player's progress through the game.
It uses an instance property called `currentLevel` to track
the level that a player is currently playing.

To help manage the `currentLevel` property,
`LevelTracker` defines an instance method called `advance(to:)`.
Before updating `currentLevel`,
this method checks whether the requested new level is already unlocked.
The `advance(to:)` method returns a Boolean value to indicate
whether or not it was actually able to set `currentLevel`.
Because it's not necessarily a mistake for
code that calls the `advance(to:)` method
to ignore the return value,
this function is marked with the `@discardableResult` attribute.
For more information about this attribute,
see <doc:Attributes>.

The `LevelTracker` structure is used with the `Player` class, shown below,
to track and update the progress of an individual player:

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

The `Player` class creates a new instance of `LevelTracker`
to track that player's progress.
It also provides a method called `complete(level:)`,
which is called whenever a player completes a particular level.
This method unlocks the next level for all players
and updates the player's progress to move them to the next level.
(The Boolean return value of `advance(to:)` is ignored,
because the level is known to have been unlocked
by the call to `LevelTracker.unlock(_:)` on the previous line.)

You can create an instance of the `Player` class for a new player,
and see what happens when the player completes level one:

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

If you create a second player, whom you try to move to a level
that's not yet unlocked by any player in the game,
the attempt to set the player's current level fails:

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
