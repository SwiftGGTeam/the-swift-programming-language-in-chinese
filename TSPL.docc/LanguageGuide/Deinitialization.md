# 析构过程

释放需要自定义清理的资源。

析构器仅适用于类类型，**析构器**会在类实例被释放之前立即调用。使用 `deinit` 关键字来编写析构器，类似于使用 `init` 关键字编写构造器。

## 析构过程原理

Swift 会在实例不再需要时自动释放它们，以释放资源。Swift 通过**自动引用计数**（*ARC*）来管理实例的内存，如 <doc:AutomaticReferenceCounting> 中所述。通常，在实例被释放时不需要执行手动清理。然而，当你处理自己的资源时，可能需要进行一些额外的清理。例如，如果创建一个自定义类来打开文件并向其中写入数据，可能需要在类实例被释放之前关闭文件。

类定义中每个类最多只能有一个析构器。析构器不接受任何参数，并且是没有括号的：

```swift
deinit {
    // 执行析构过程
}
```

<!--
  - test: `deinitializer`

  ```swifttest
  >> class Test {
  -> deinit {
        // 执行析构过程
     }
  >> }
  ```
-->

析构器会在实例释放之前自动调用。不能自行调用析构器。父类的析构器会被子类继承，并且在子类析构器实现的末尾被自动调用。即使子类没有提供自己的析构器，父类的析构器也总是会被调用。

由于实例在析构器调用完成后才会被释放，因此析构器可以访问该实例的所有属性，并可以根据这些属性修改其行为（例如查找需要关闭的文件的名称）。

## 析构器实践

下面是一个析构器实践的例子。这个例子定义了两个新类型，`Bank` 和 `Player`，用于一个简单的游戏。`Bank` 类管理一种虚构的货币，这种货币的流通量永远不会超过 10,000 个金币。游戏中只能有一个 `Bank`，因此 `Bank` 被实现为一个类，使用类型属性和类型方法来存储和管理其当前状态：

```swift
class Bank {
    static var coinsInBank = 10_000
    static func distribute(coins numberOfCoinsRequested: Int) -> Int {
        let numberOfCoinsToVend = min(numberOfCoinsRequested, coinsInBank)
        coinsInBank -= numberOfCoinsToVend
        return numberOfCoinsToVend
    }
    static func receive(coins: Int) {
        coinsInBank += coins
    }
}
```

<!--
  - test: `deinitializer`

  ```swifttest
  -> class Bank {
        static var coinsInBank = 10_000
        static func distribute(coins numberOfCoinsRequested: Int) -> Int {
           let numberOfCoinsToVend = min(numberOfCoinsRequested, coinsInBank)
           coinsInBank -= numberOfCoinsToVend
           return numberOfCoinsToVend
        }
        static func receive(coins: Int) {
           coinsInBank += coins
        }
     }
  ```
-->

`Bank` 通过其 `coinsInBank` 属性跟踪当前持有的金币数量。它还提供了两个方法——`distribute(coins:)` 和 `receive(coins:)`——来处理金币的分发和接收。

`distribute(coins:)` 方法在分发金币之前检查银行中是否有足够的金币。如果金币不足，`Bank` 会返回一个比请求的数量更小的数字（如果银行中没有金币，则返回零）。该方法返回一个整型值，表示实际提供的金币数量。

`receive(coins:)` 方法只是将接收到的金币数量重新添加到银行的金币库中。

`Player` 类描述了游戏中的一个玩家。每个玩家的钱包中随时都会存储一定数量的金币，由 `coinsInPurse` 属性表示：

```swift
class Player {
    var coinsInPurse: Int
    init(coins: Int) {
        coinsInPurse = Bank.distribute(coins: coins)
    }
    func win(coins: Int) {
        coinsInPurse += Bank.distribute(coins: coins)
    }
    deinit {
        Bank.receive(coins: coinsInPurse)
    }
}
```

<!--
  - test: `deinitializer`

  ```swifttest
  -> class Player {
        var coinsInPurse: Int
        init(coins: Int) {
           coinsInPurse = Bank.distribute(coins: coins)
        }
        func win(coins: Int) {
           coinsInPurse += Bank.distribute(coins: coins)
        }
        deinit {
           Bank.receive(coins: coinsInPurse)
        }
     }
  ```
-->

每个 `Player` 实例在初始化时都会从银行获得指定的金币作为初始津贴，但是如果可用金币不足，`Player` 实例获得的金币数量可能会少于指定数量。

`Player` 类定义了一个 `win(coins:)` 方法，该方法从银行获取一定数量的金币并将其添加到玩家的钱包中。`Player` 类还实现了一个析构器，该析构器在 `Player` 实例被释放之前调用。在这里，析构器只是将玩家的所有金币返还给银行：

```swift
var playerOne: Player? = Player(coins: 100)
print("A new player has joined the game with \(playerOne!.coinsInPurse) coins")
// 打印 "A new player has joined the game with 100 coins"。
print("There are now \(Bank.coinsInBank) coins left in the bank")
// 打印 "There are now 9900 coins left in the bank"。
```

<!--
  - test: `deinitializer`

  ```swifttest
  -> var playerOne: Player? = Player(coins: 100)
  -> print("A new player has joined the game with \(playerOne!.coinsInPurse) coins")
  <- A new player has joined the game with 100 coins
  -> print("There are now \(Bank.coinsInBank) coins left in the bank")
  <- There are now 9900 coins left in the bank
  ```
-->

创建了一个新的 `Player` 实例的时候，会向 `Bank` 请求获取 100 个金币（如果有的话）。这个 `Player` 实例被存储在一个名为 `playerOne` 的可选类型变量中。这里使用可选变量是因为玩家可以在任何时候退出游戏。通过可选类型可以跟踪当前是否有玩家在游戏中。

由于 `playerOne` 是一个可选类型，因此在访问其 `coinsInPurse` 属性以打印默认金币数量时，以及每次调用其 `win(coins:)` 方法时，都需要使用感叹号（`!`）来强制解包：

```swift
playerOne!.win(coins: 2_000)
print("PlayerOne won 2000 coins & now has \(playerOne!.coinsInPurse) coins")
// 打印 "PlayerOne won 2000 coins & now has 2100 coins"。
print("The bank now only has \(Bank.coinsInBank) coins left")
// 打印 "The bank now only has 7900 coins left"。
```

<!--
  - test: `deinitializer`

  ```swifttest
  -> playerOne!.win(coins: 2_000)
  -> print("PlayerOne won 2000 coins & now has \(playerOne!.coinsInPurse) coins")
  <- PlayerOne won 2000 coins & now has 2100 coins
  -> print("The bank now only has \(Bank.coinsInBank) coins left")
  <- The bank now only has 7900 coins left
  ```
-->

在这里，玩家赢得了 2,000 个金币。玩家的钱包现在有 2,100 个金币，而银行只剩下 7,900 个金币。

```swift
playerOne = nil
print("PlayerOne has left the game")
// 打印 "PlayerOne has left the game"。
print("The bank now has \(Bank.coinsInBank) coins")
// 打印 "The bank now has 10000 coins"。
```

<!--
  - test: `deinitializer`

  ```swifttest
  -> playerOne = nil
  -> print("PlayerOne has left the game")
  <- PlayerOne has left the game
  -> print("The bank now has \(Bank.coinsInBank) coins")
  <- The bank now has 10000 coins
  ```
-->

玩家现在已经退出游戏。这是通过将可选类型变量 `playerOne` 设置为 `nil` 来表示的，意味着“没有 `Player` 实例”。在这一刻，`playerOne` 变量对 `Player` 实例的引用被断开。没有其他属性或变量仍然引用该 `Player` 实例，因此它会被释放以回收其内存。在此之前，它的析构器会被自动调用，并将其金币返还给银行。

<!--
This source file is part of the Swift.org open source project

Copyright (c) 2014 - 2022 Apple Inc. and the Swift project authors
Licensed under Apache License v2.0 with Runtime Library Exception

See https://swift.org/LICENSE.txt for license information
See https://swift.org/CONTRIBUTORS.txt for the list of Swift project authors
-->
