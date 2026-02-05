# 内存安全

通过合理地组织代码来避免内存访问冲突。

默认情况下，Swift 会阻止代码中不安全的行为。例如，Swift 会确保所有变量都在使用前被初始化、内存不可在被释放后访问、还会对数组的下标做越界检查。

Swift 会要求修改内存的代码拥有对被修改区域的独占访问权，以确保对同一块内存区域的多次访问不会产生冲突。由于 Swift 会自动管理内存，大多数情况下你不需要考虑内存访问相关的问题。但是，为了避免编写出会产生内存访问冲突的代码，你还是很有必要了解什么情况下会出现这种问题。如果你的代码有内存访问冲突的问题，系统会在编译时或运行时报错。

<!--
  TODO: maybe re-introduce this text...

  Memory safety refers to...
  The term *safety* usually refers to :newTerm:`memory safety`...
  Unsafe access to memory is available, if you ask for it explicitly...
-->

## 理解内存访问冲突

在进行变量赋值、函数传参这样的操作时，你的代码会访问内存。举个例子，下面的代码包含了一次读操作和一次写操作：

```swift
// 向 one 所在的内存区域发起一次写操作
var one = 1

// 向 one 所在的内存区域发起一次读操作
print("We're number \(one)!")
```

<!--
  - test: `memory-read-write`

  ```swifttest
  // A write access to the memory where one is stored.
  -> var one = 1

  // A read access from the memory where one is stored.
  -> print("We're number \(one)!")
  << We're number 1!
  ```
-->

<!--
  Might be worth a different example,
  or else I'm going to keep getting "We are Number One" stuck in my head.
-->

当多个不同地方的代码试图访问同一块内存区域时，访问冲突就有可能出现。对一块内存区域的同时访问可能导致程序出现无法预测或不稳定的行为。Swift 中有许多修改数值的方式，其中一些会横跨多行代码，这意味着修改某个数值的过程本身也有可能产生对此数值的访问。

要理解这个问题，你可以尝试想象一下在纸上更新一个预算表的流程。更新预算表分为两步：第一步你需要先添加每个预算项目的名字和数额，第二步才是更新预算总额。在整个更新流程的之前及之后，你可以从预算中读取任何信息，而这些信息都是正确的，就像下图所示一样。

![](memory_shopping)

但是，在你向预算表添加项目的过程中，它会短暂地处于一个临时、不合法的状态，因为预算总额此时还没有被更新以反映这些新添加的项目。在项目添加的过程中读取到的总额是不正确的。

这个例子还展示了一个在你修复内存访问冲突问题中会遇到的挑战：有时可能存在多种修复冲突的方式，但它们最终产生的结果并不相同，且很难确定到底哪种结果是符合预期的。在这个例子中，$5 或者 $320 都可以是正确答案 —— 这取决于你的「预期」是读取到更新前的总额还是更新后的总额。在你修复访问冲突之前，你需要先明确内存访问的目的和预期结果是什么。

> 注意：如果你编写过并发或多线程代码，访问冲突问题可能对你来说并不陌生。但是，这里讨论的访问冲突即便在单线程环境中也有可能产生，而此时并没有并发或多线程的代码存在。
>
> 如果你的程序在单线程上运行时产生了内存访问冲突问题，Swift 保证会抛出编译时或运行时错误。对于多线程代码，你可以使用 [Thread Sanitizer](https://developer.apple.com/documentation/xcode/diagnosing_memory_thread_and_crash_issues_early) 来检测不同线程间的访问冲突。

<!--
  TODO: The xref above doesn't seem to give enough information.
  What should I be looking for when I get to the linked page?
-->

### 内存访问的特点

在访问冲突的语境下，我们需要考虑内存访问的三个特点：此次访问是读还是写、访问的时长、被访问内存区域的位置。特别地，两次内存访问会在满足以下所有条件时产生冲突：

- 它们不是都是读操作，也不是都是原子化操作。
- 它们访问的是同一块内存区域。
- 它们的时间窗口出现了重叠。

读操作和写操作之间的区别是显而易见的：写操作会改变内存区域，而读操作不会。「内存区域」指的是被访问的内容（例如变量、常量、属性）。内存访问的要么瞬间完成，要么持续较长时间。

一次访问如果满足以下条件之一则为*原子*访问:
- 是对 [`Atomic`] 或 [`AtomicLazyReference`] 的原子操作调用
- 仅使用 C 原子操作
否则就是非原子访问。
关于 C 原子函数的列表,请参阅 `stdatomic(3)` 手册页。

[`Atomic`]: https://developer.apple.com/documentation/synchronization/atomic
[`AtomicLazyReference`]: https://developer.apple.com/documentation/synchronization/atomiclazyreference

<!--
  Using these functions from Swift requires some shimming -- for example:
  https://github.com/apple/swift-se-0282-experimental/tree/master/Sources/_AtomicsShims
-->

如果在一次内存访问的过程中没有任何其他代码可以在其开始后、结束前运行，则这次访问是**瞬时**完成的。其性质决定了两次瞬时访问不可能同时发生。大多数内存访问都是瞬时完成的。比如，下面这段代码中的所有读写操作都是瞬时完成的：

```swift
func oneMore(than number: Int) -> Int {
    return number + 1
}

var myNumber = 1
myNumber = oneMore(than: myNumber)
print(myNumber)
// Prints "2"
```

<!--
  - test: `memory-instantaneous`

  ```swifttest
  -> func oneMore(than number: Int) -> Int {
         return number + 1
     }

  -> var myNumber = 1
  -> myNumber = oneMore(than: myNumber)
  -> print(myNumber)
  <- 2
  ```
-->

然而，也有其他被称作**长时访问**的内存访问 —— 它们的执行过程会「横跨」其它代码的执行。长时访问和瞬时访问的区别在于：前者执行开始后、结束前的这段时间内，其它的代码有可能会执行，我们称之为**重叠**。一次长时访问可以与其它的长时或瞬时访问重叠。

重叠访问通常出现在函数和方法的 in-out 参数以及结构体的变值方法中。下文中会讨论 Swift 中具体哪些类型的代码会使用长时访问。



## 对 In-Out 参数的访问冲突

一个函数会对它所有的 in-out 参数保持长时写访问。in-out 参数的写访问会在所有非 in-out 参数处理完之后开始，直到函数执行完毕为止。如果存在多个 in-out 参数，则写访问的开始顺序和参数的排列顺序一致。

这种长时保持的写访问带来的问题是：即便作用域和访问权限规则允许，你也不能再访问以 in-out 形式传入的原始变量。这是因为任何访问原始变量的行为都会造成冲突，例如：

```swift
var stepSize = 1

func increment(_ number: inout Int) {
    number += stepSize
}

increment(&stepSize)
// 错误：stepSize 访问冲突
```

<!--
  - test: `memory-increment`

  ```swifttest
  -> var stepSize = 1

  -> func increment(_ number: inout Int) {
         number += stepSize
     }

  -> increment(&stepSize)
  // Error: conflicting accesses to stepSize
  xx Simultaneous accesses to 0x10e8667d8, but modification requires exclusive access.
  xx Previous access (a modification) started at  (0x10e86b032).
  xx Current access (a read) started at:
  ```
-->

在上面的代码里，`stepSize` 是一个全局变量，并且它可以通常可以在 `increment(_:)` 里被访问。然而，对于 `stepSize` 的读访问与 `number` 的写访问重叠了。就像下面展示的那样，`number` 和 `stepSize` 都指向了同一个内存区域。针对同一块内存区域的读和写访问重叠了，因此产生了冲突。

![](memory_increment)

其中一个解决冲突的方式是显式地复制一份 `stepSize`：

```swift
// 显式复制
var copyOfStepSize = stepSize
increment(&copyOfStepSize)

// 更新原来的值
stepSize = copyOfStepSize
// stepSize 现在的值是 2
```

<!--
  - test: `memory-increment-copy`

  ```swifttest
  >> var stepSize = 1
  >> func increment(_ number: inout Int) {
  >>     number += stepSize
  >> }
  // Make an explicit copy.
  -> var copyOfStepSize = stepSize
  -> increment(&copyOfStepSize)

  // Update the original.
  -> stepSize = copyOfStepSize
  /> stepSize is now \(stepSize)
  </ stepSize is now 2
  ```
-->

由于你在调用 `increment(_:)` 前复制了 `stepSize`，显然 `copyOfStepSize` 会以当前 `stepSize` 的值增加。读访问在写访问开始前就结束了，所以不会产生冲突。

对于 in-out 参数保持长时写访问的另一个后果是，往同一个函数的多个 in-out 参数里传入同一个变量也会产生冲突。例如：

```swift
func balance(_ x: inout Int, _ y: inout Int) {
    let sum = x + y
    x = sum / 2
    y = sum - x
}
var playerOneScore = 42
var playerTwoScore = 30
balance(&playerOneScore, &playerTwoScore)  // OK
balance(&playerOneScore, &playerOneScore)
// 错误：playerOneScore 访问冲突
```

<!--
  - test: `memory-balance`

  ```swifttest
  -> func balance(_ x: inout Int, _ y: inout Int) {
         let sum = x + y
         x = sum / 2
         y = sum - x
     }
  -> var playerOneScore = 42
  -> var playerTwoScore = 30
  -> balance(&playerOneScore, &playerTwoScore)  // OK
  -> balance(&playerOneScore, &playerOneScore)
  // Error: conflicting accesses to playerOneScore
  !$ error: inout arguments are not allowed to alias each other
  !! balance(&playerOneScore, &playerOneScore)
  !!                          ^~~~~~~~~~~~~~~
  !$ note: previous aliasing argument
  !! balance(&playerOneScore, &playerOneScore)
  !!         ^~~~~~~~~~~~~~~
  !$ error: overlapping accesses to 'playerOneScore', but modification requires exclusive access; consider copying to a local variable
  !! balance(&playerOneScore, &playerOneScore)
  !!                          ^~~~~~~~~~~~~~~
  !$ note: conflicting access is here
  !! balance(&playerOneScore, &playerOneScore)
  !!         ^~~~~~~~~~~~~~~
  ```
-->

上面的  `balance(_:_:)` 函数会将传入的两个参数平均化。将 `playerOneScore` 和 `playerTwoScore` 作为参数传入不会产生错误 —— 虽然这两个写访问在时间上重叠了，但它们访问的是不同的内存位置；相反，将 `playerOneScore` 同时传入两个参数则会冲突，因为这样会发起两次在时间上重叠、针对同一内存位置的写访问。

> 因为操作符也是函数，它们也会对 in-out 参数保持长时访问。例如，假设 `balance(_:_:)` 是一个名为 `<^>` 的操作符函数，那么 `playerOneScore <^> playerOneScore` 也会造成像 `balance(&playerOneScore, &playerOneScore)` 一样的冲突。



## 方法中的 self 访问冲突

<!--
  This (probably?) applies to all value types,
  but structures are the only place you can observe it.
  Enumerations can have mutating methods
  but you can't mutate their associated values in place,
  and tuples can't have methods.
-->

<!--
  Methods behave like self is passed to the method as inout
  because, under the hood, that's exactly what happens.
-->

一个结构体的变值（mutating）方法会在其被调用期间保持对于 `self` 的长时写访问。想象这样一个游戏：其中每个玩家都有一定的生命值，受到伤害时会减少；玩家还会有能量值，会在玩家使用特殊技能时减少。

```swift
struct Player {
    var name: String
    var health: Int
    var energy: Int

    static let maxHealth = 10
    mutating func restoreHealth() {
        health = Player.maxHealth
    }
}
```

<!--

  - test: `memory-player-share-with-self`

  ```swifttest
  >> func balance(_ x: inout Int, _ y: inout Int) {
  >>     let sum = x + y
  >>     x = sum / 2
  >>     y = sum - x
  >> }
  -> struct Player {
         var name: String
         var health: Int
         var energy: Int

         static let maxHealth = 10
         mutating func restoreHealth() {
             health = Player.maxHealth
         }
     }
  ```
-->

在上面的 `restoreHealth()` 方法中，对于 `self` 的写访问开始于方法的开头，并持续到方法返回为止。在这个例子中，`restoreHealth()` 中没有任何其他的代码会对 `Player` 实例的属性产生重叠访问。但是，下面的 `shareHealth(with:)` 方法会将另一个 `Player` 实例作为 in-out 参数接受，这样则会产生重叠访问的可能性。

```swift
extension Player {
    mutating func shareHealth(with teammate: inout Player) {
        balance(&teammate.health, &health)
    }
}

var oscar = Player(name: "Oscar", health: 10, energy: 10)
var maria = Player(name: "Maria", health: 5, energy: 10)
oscar.shareHealth(with: &maria)  // OK
```

<!--
  - test: `memory-player-share-with-self`

  ```swifttest
  -> extension Player {
         mutating func shareHealth(with teammate: inout Player) {
             balance(&teammate.health, &health)
         }
     }

  -> var oscar = Player(name: "Oscar", health: 10, energy: 10)
  -> var maria = Player(name: "Maria", health: 5, energy: 10)
  -> oscar.shareHealth(with: &maria)  // OK
  ```
-->

在上面的例子中，通过调用 `shareHealth(with:)` 方法来将 Oscar 的生命值分享给 Maria 并不会造成冲突。因为 `oscar` 是变值方法中 `self` 所对应的值，所以方法执行过程存在对于 `oscar` 的写访问；在相同的时间窗口内，方法对于 `maria` 也会有写访问，因为 `maria` 是作为 in-out 参数传入的。尽管这两次写访问在时间上发生了重叠，它们并不冲突。 

![](memory_share_health_maria)

然而，如果你将 `oscar` 所谓参数传入 `shareHealth(with:)`，就会产生冲突了：

```swift
oscar.shareHealth(with: &oscar)
// 错误：对 oscar 的访问出现冲突
```

<!--
  - test: `memory-player-share-with-self`

  ```swifttest
  -> oscar.shareHealth(with: &oscar)
  // Error: conflicting accesses to oscar
  !$ error: inout arguments are not allowed to alias each other
  !! oscar.shareHealth(with: &oscar)
  !!                         ^~~~~~
  !$ note: previous aliasing argument
  !! oscar.shareHealth(with: &oscar)
  !! ^~~~~
  !$ error: overlapping accesses to 'oscar', but modification requires exclusive access; consider copying to a local variable
  !! oscar.shareHealth(with: &oscar)
  !!                          ^~~~~
  !$ note: conflicting access is here
  !! oscar.shareHealth(with: &oscar)
  !! ^~~~~~
  ```
-->

在整个变值方法执行期间，方法不仅需要对保持对 `self` 的写访问，其 in-out 参数还需要对 `teammate` 保持相同时长的写访问。在方法内，`self` 和 `teammate` 都指向了内存中的同一位置（如下图所示）。因为两次写访问不仅在时间上重叠，访问的内存区域也重叠了，所以产生了冲突。

![](memory_share_health_oscar)

## 属性访问冲突

结构体、元组、枚举这样的类型是由多个独立的值构成的（例如结构体的属性、元组的元素）。它们都是值类型，所以修改值的任何一部分都是对于整个值的修改。这意味着对于其中任何一个属性的读或写访问，都需要对于整个值的访问。例如，对于元组元素的重叠写访问会造成冲突：

```swift
var playerInformation = (health: 10, energy: 20)
balance(&playerInformation.health, &playerInformation.energy)
// 错误：对 playerInformation 的属性访问有冲突
```

<!--
  - test: `memory-tuple`

  ```swifttest
  >> func balance(_ x: inout Int, _ y: inout Int) {
  >>     let sum = x + y
  >>     x = sum / 2
  >>     y = sum - x
  >> }
  -> var playerInformation = (health: 10, energy: 20)
  -> balance(&playerInformation.health, &playerInformation.energy)
  // Error: conflicting access to properties of playerInformation
  xx Simultaneous accesses to 0x10794d848, but modification requires exclusive access.
  xx Previous access (a modification) started at  (0x107952037).
  xx Current access (a modification) started at:
  ```
-->

在上面的示例中，因为出现了对于 `playerInformation` 的重叠写访问，对元组中的元素调用 `balance(_:_:)` 就会产生冲突。`playerInformation.health` 和 `playerInformation.energy` 都被作为 in-out 参数被传入了，这意味着 `balance(_:_:)` 在执行期间需要保持对它们的写访问，而这又意味着 `balance(_:_:)` 需要保持两次对 `playerInformation` 整体的重叠写访问，这样一来就发生了访问冲突。

下方的代码展示了对一个存储在全局变量中的结构体的重叠写访问，这会导致相同的错误。

```swift
var holly = Player(name: "Holly", health: 10, energy: 10)
balance(&holly.health, &holly.energy)  // 错误
```

<!--
  - test: `memory-share-health-global`

  ```swifttest
  >> struct Player {
  >>     var name: String
  >>     var health: Int
  >>     var energy: Int
  >> }
  >> func balance(_ x: inout Int, _ y: inout Int) {
  >>     let sum = x + y
  >>     x = sum / 2
  >>     y = sum - x
  >> }
  -> var holly = Player(name: "Holly", health: 10, energy: 10)
  -> balance(&holly.health, &holly.energy)  // Error
  xx Simultaneous accesses to 0x10794d848, but modification requires exclusive access.
  xx Previous access (a modification) started at  (0x107952037).
  xx Current access (a modification) started at:
  ```
-->

在实践中，大多数时候对于结构体属性的重叠访问是安全的。举个例子，如果上方例子中的变量 `holly` 是一个本地变量而非全局变量，编译器可以证明对于该结构体的属性的重叠访问是安全的：

```swift
func someFunction() {
    var oscar = Player(name: "Oscar", health: 10, energy: 10)
    balance(&oscar.health, &oscar.energy)  // OK
}
```

<!--

  - test: `memory-share-health-local`

  ```swifttest
  >> struct Player {
  >>     var name: String
  >>     var health: Int
  >>     var energy: Int
  >> }
  >> func balance(_ x: inout Int, _ y: inout Int) {
  >>     let sum = x + y
  >>     x = sum / 2
  >>     y = sum - x
  >> }
  -> func someFunction() {
         var oscar = Player(name: "Oscar", health: 10, energy: 10)
         balance(&oscar.health, &oscar.energy)  // OK
     }
  >> someFunction()
  ```
-->

在上方的例子中，Oscar 的生命值和能量值被作为两个 in-out 参数传递给了 `balance(_:_:)`。此时编译器能够证明内存是安全的，因为这两个属性并不会以任何方式交互。

要保证内存安全，限制结构体属性的重叠访问并不总是必要的。内存安全性是我们想获得的一种保证，但是「独占访问」是相比「内存安全」更加严格的一种要求 —— 这意味着即使有些代码违反了「独占访问」的原则，它也可以是内存安全的。只要编译器可以「证明」这种非专属的访问是内存安全的，Swift 就会允许这样的代码存在。特别地，在以下条件满足时，编译器就可以证明对结构体属性的重叠访问是安全的：

- 代码只访问了实例的存储属性，而没有访问计算属性或类属性
- 结构体是本地变量，而非全局变量的值
- 结构体要么没有被闭包捕获，要么只被非逃逸闭包捕获了

如果编译器无法证明访问安全性，它就会拒绝访问。

<!--
  Because there's no syntax
  to mutate an enum's associated value in place,
  we can't show that overlapping mutations
  to two different associated values on the same enum
  would violate exclusivity.
  Otherwise, we'd want an example of that
  in this section too --
  it's the moral equivalent of property access.
-->

<!--
  .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. .. ..
-->

<!--
  In Swift 4, the only way to create a long-term read
  is to use implicit pointer conversion
  when passing a value as a nonmutating unsafe pointer parameter,
  as in the example below.
  There's discussion in <rdar://problem/33115142>
  about changing the semantics of nonmutating method calls
  to be long-term reads,
  but it's not clear if/when that change will land.

  ::

      var global = 4
    
      func foo(_ x: UnsafePointer<Int>){
          global = 7
      }
    
      foo(&global)
      print(global)
    
      // Simultaneous accesses to 0x106761618, but modification requires exclusive access.
      // Previous access (a read) started at temp2`main + 87 (0x10675e417).
      // Current access (a modification) started at:
      // 0    libswiftCore.dylib                 0x0000000106ac7b90 swift_beginAccess + 605
      // 1    temp2                              0x000000010675e500 foo(_:) + 39
      // 2    temp2                              0x000000010675e3c0 main + 102
      // 3    libdyld.dylib                      0x00007fff69c75144 start + 1
      // Fatal access conflict detected.
-->

<!--
  TEXT FOR THE FUTURE

  Versions of Swift before Swift 5 ensure memory safety
  by aggressively making a copy of the shared mutable state
  when a conflicting access is possible.
  The copy is no longer shared, preventing the possibility of conflicts.
  However, the copying approach has a negative impact
  on performance and memory usage.
-->

<!--
This source file is part of the Swift.org open source project

Copyright (c) 2014 - 2022 Apple Inc. and the Swift project authors
Licensed under Apache License v2.0 with Runtime Library Exception

See https://swift.org/LICENSE.txt for license information
See https://swift.org/CONTRIBUTORS.txt for the list of Swift project authors
-->


[`Atomic`]: https://developer.apple.com/documentation/synchronization/atomic
[`AtomicLazyReference`]: https://developer.apple.com/documentation/synchronization/atomiclazyreference
