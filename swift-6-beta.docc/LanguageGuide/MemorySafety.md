# 内存安全

通过合理地组织代码来避免内存访问冲突。

默认情况下，Swift 会阻止代码中不安全的行为。例如，Swift 会确保所有变量都在使用前被初始化、内存不可在被释放后访问，还会对数组的下标做越界检查。

Swift 还会要求修改内存的代码拥有对被修改区域的独占访问权，以确保对同一块内存区域的多次访问不会产生冲突。由于 Swift 会自动管理内存，大多数情况下你不需要考虑内存访问相关的问题。但是，为了避免编写出会产生内存访问冲突的代码，你还是很有必要了解什么情况下会出现这种问题。如果你的代码有内存访问冲突的问题，系统会在编译时或运行时报错。

<!--
  TODO: maybe re-introduce this text...

  Memory safety refers to...
  The term *safety* usually refers to :newTerm:`memory safety`...
  Unsafe access to memory is available, if you ask for it explicitly...
-->

## 理解内存访问冲突

在做为变量赋值、给函数传参这样的事情时，你的代码会访问内存。举个例子，下面的代码包含了一次读操作和一次写操作：

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
  ---
  // A read access from the memory where one is stored.
  -> print("We're number \(one)!")
  << We're number 1!
  ```
-->

<!--
  Might be worth a different example,
  or else I'm going to keep getting "We are Number One" stuck in my head.
-->

当代码中的不同部分试图访问同一块内存区域时，访问冲突就有可能出现。对一块内存区域的同时访问可能导致程序出现无法预测或不稳定的行为。Swift 中有许多修改数值的方式，其中一些会横跨多行代码，这意味着修改某个数值的过程本身也有可能产生对此数值的访问。

要理解这个问题，你可以尝试想象一下在纸上更新一个预算表的流程。更新预算表分为两步，第一步你需要先添加每个预算项目的名字和数额，第二步才是更新预算总额。在整个更新流程的之前及之后，你可以从预算中读取任何信息，而这些信息都是正确的，就像下图所示一样。

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

- 至少其中一次访问是写入操作或非原子化访问。
- 它们访问的是同一块内存区域。
- 它们的时间窗口出现了重叠。

读操作和写操作之间的区别是显而易见的：写操作会改变内存区域，而读操作不会。「内存区域」指的是被访问的内容（例如变量、常量、属性）。内存访问的时长要么瞬间完成，要么持续较长时间。

如果一项操作仅仅使用了 C 的原子化操作，则这项操作本身也是**原子化**的。请查看 `stdatomic(3)` 手册来了解有哪些函数满足这个定义。

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
  ---
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

这种长期保持的写访问带来的问题是：即便作用域和访问权限规则允许，你也不能再访问以 in-out 形式传入的原始变量。这是因为任何访问原始变量的行为都会造成冲突，例如：

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
  ---
  -> func increment(_ number: inout Int) {
         number += stepSize
     }
  ---
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
  ---
  // Update the original.
  -> stepSize = copyOfStepSize
  /> stepSize is now \(stepSize)
  </ stepSize is now 2
  ```
-->

由于你在调用 `increment(_:)` 前复制了 `stepSize`，显然 `copyOfStepSize` 会以当前 `stepSize` 的值增加。读访问在写访问开始前就结束了，所以不会产生冲突。

对于 in-out 参数保持长期写访问的另一个后果是，往同一个函数的多个 in-out 参数里传入同一个变量也会产生冲突。例如：

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



## 在方法中对 self 的访问冲突

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

一个结构体的变值方法会在其被调用期间保持对于 `self` 的长时写访问。想象这样一个游戏：其中每个玩家都有一定的生命值，受到伤害时会减少；玩家还会有能量值，会在玩家使用特殊技能时减少。

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
  ---
  -> var oscar = Player(name: "Oscar", health: 10, energy: 10)
  -> var maria = Player(name: "Maria", health: 5, energy: 10)
  -> oscar.shareHealth(with: &maria)  // OK
  ```
-->

在上面的例子中，通过调用 `shareHealth(with:)` 方法来将

In the example above,
calling the `shareHealth(with:)` method
for Oscar's player to share health with Maria's player
doesn't cause a conflict.
There's a write access to `oscar` during the method call
because `oscar` is the value of `self` in a mutating method,
and there's a write access to `maria`
for the same duration
because `maria` was passed as an in-out parameter.
As shown in the figure below,
they access different locations in memory.
Even though the two write accesses overlap in time,
they don't conflict.

![](memory_share_health_maria)

However,
if you pass `oscar` as the argument to `shareHealth(with:)`,
there's a conflict:

```swift
oscar.shareHealth(with: &oscar)
// Error: conflicting accesses to oscar
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

The mutating method needs write access to `self`
for the duration of the method,
and the in-out parameter needs write access to `teammate`
for the same duration.
Within the method,
both `self` and `teammate` refer to
the same location in memory ---
as shown in the figure below.
The two write accesses
refer to the same memory and they overlap,
producing a conflict.

![](memory_share_health_oscar)

## Conflicting Access to Properties

Types like structures, tuples, and enumerations
are made up of individual constituent values,
such as the properties of a structure or the elements of a tuple.
Because these are value types, mutating any piece of the value
mutates the whole value,
meaning read or write access to one of the properties
requires read or write access to the whole value.
For example,
overlapping write accesses to the elements of a tuple
produces a conflict:

```swift
var playerInformation = (health: 10, energy: 20)
balance(&playerInformation.health, &playerInformation.energy)
// Error: conflicting access to properties of playerInformation
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

In the example above,
calling `balance(_:_:)` on the elements of a tuple
produces a conflict
because there are overlapping write accesses to `playerInformation`.
Both `playerInformation.health` and `playerInformation.energy`
are passed as in-out parameters,
which means `balance(_:_:)` needs write access to them
for the duration of the function call.
In both cases, a write access to the tuple element
requires a write access to the entire tuple.
This means there are two write accesses to `playerInformation`
with durations that overlap,
causing a conflict.

The code below shows that the same error appears
for overlapping write accesses
to the properties of a structure
that's stored in a global variable.

```swift
var holly = Player(name: "Holly", health: 10, energy: 10)
balance(&holly.health, &holly.energy)  // Error
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

In practice,
most access to the properties of a structure
can overlap safely.
For example,
if the variable `holly` in the example above
is changed to a local variable instead of a global variable,
the compiler can prove that overlapping access
to stored properties of the structure is safe:

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

In the example above,
Oscar's health and energy are passed
as the two in-out parameters to `balance(_:_:)`.
The compiler can prove that memory safety is preserved
because the two stored properties don't interact in any way.

The restriction against
overlapping access to properties of a structure
isn't always necessary to preserve memory safety.
Memory safety is the desired guarantee,
but exclusive access is a stricter requirement than memory safety ---
which means some code preserves memory safety,
even though it violates exclusive access to memory.
Swift allows this memory-safe code if the compiler can prove
that the nonexclusive access to memory is still safe.
Specifically, it can prove
that overlapping access to properties of a structure is safe
if the following conditions apply:

- You're accessing only stored properties of an instance,
  not computed properties or class properties.
- The structure is the value of a local variable,
  not a global variable.
- The structure is either not captured by any closures,
  or it's captured only by nonescaping closures.

If the compiler can't prove the access is safe,
it doesn't allow the access.

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
