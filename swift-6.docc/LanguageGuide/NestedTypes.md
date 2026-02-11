# 嵌套类型

在另一个类型的作用域内定义类型。

枚举常被创建以支持特定类或结构的功能。同样的，为了在更复杂类型的上下文中使用而定义纯工具性结构，以及通常与特定类型结合使用的协议，也显得十分便利。为了实现这一点，Swift 允许你定义 *嵌套类型*，即在支持的类型定义中嵌套枚举、结构和协议等辅助类型。

要在一个类型中嵌套另一个类型，只需将其定义写在外部类型的大括号内。类型可以根据需要嵌套到任意层次。

## 使用嵌套类型

下面的示例定义了一个名为`BlackjackCard` 的结构，用于模拟 Blackjack 游戏中的扑克牌。`BlackjackCard`结构包含两个嵌套的枚举类型，分别是 `Suit` 和`Rank`。

在 Blackjack 中，Ace 牌的值可以是 1 或 11。这个特性通过嵌套在 `Rank`枚举中的一个名为 `Values` 的结构表示：

```swift
struct BlackjackCard {
    // 嵌套的 Suit 枚举
    enum Suit: Character {
        case spades = "♠", hearts = "♡", diamonds = "♢", clubs = "♣"
    }

    // 嵌套的 Rank 枚举
    enum Rank: Int {
        case two = 2, three, four, five, six, seven, eight, nine, ten
        case jack, queen, king, ace
        struct Values {
            let first: Int, second: Int?
        }
        var values: Values {
            switch self {
            case .ace:
                return Values(first: 1, second: 11)
            case .jack, .queen, .king:
                return Values(first: 10, second: nil)
            default:
                return Values(first: self.rawValue, second: nil)
            }
        }
    }

    // BlackjackCard 属性和方法
    let rank: Rank, suit: Suit
    var description: String {
        var output = "suit is \(suit.rawValue),"
        output += " value is \(rank.values.first)"
        if let second = rank.values.second {
            output += " or \(second)"
        }
        return output
    }
}
```

<!--
  - test: `nestedTypes`

  ```swifttest
  -> struct BlackjackCard {
        // nested Suit enumeration
        enum Suit: Character {
           case spades = "♠", hearts = "♡", diamonds = "♢", clubs = "♣"
        }

        // nested Rank enumeration
        enum Rank: Int {
           case two = 2, three, four, five, six, seven, eight, nine, ten
           case jack, queen, king, ace
           struct Values {
              let first: Int, second: Int?
           }
           var values: Values {
              switch self {
                 case .ace:
                    return Values(first: 1, second: 11)
                 case .jack, .queen, .king:
                    return Values(first: 10, second: nil)
                 default:
                    return Values(first: self.rawValue, second: nil)
              }
           }
        }

        // BlackjackCard properties and methods
        let rank: Rank, suit: Suit
        var description: String {
           var output = "suit is \(suit.rawValue),"
           output += " value is \(rank.values.first)"
           if let second = rank.values.second {
              output += " or \(second)"
           }
           return output
        }
     }
  ```
-->

`Suit`枚举描述了四种常见的扑克牌花色，以及用于表示其符号的原始  `Character`  值。

`Rank` 枚举描述了十三种可能的扑克牌等级，以及用于表示其数值的原始 `Int` 值
（这个原始的 `Int` 值不适用于杰克 (Jack)、皇后 (Queen)、国王 (King) 和王牌 (Ace) 牌。）

正如上面提到的，`Rank` 枚举定义了一个它自己的进一步嵌套的结构，叫做 `Values`。
这个结构封装了大多数牌只有一个值，而王牌 (Ace) 有两个值的事实。
`Values` 结构定义了两个属性来表示这一点：

- `first`，类型为 `Int`
- `second`，类型为 `Int?`，或“可选的 `Int`”

`Rank`还定义了一个计算属性`values`，它返回一个 `Values`结构的实例。 该计算属性会根据牌的等级 (rank) 生成一个新的`Values`实例，并为不同的等级分配合适的值。 对于`jack`、`queen`、`king`和`ace`，使用特殊的值。 对于数字牌，则使用等级的原始 `Int` 值。

`BlackjackCard` 结构本身有两个属性 —— `rank` 和 `suit`。它还定义了一个名为 `description` 的计算属性，该属性使用 `rank` 和 `suit` 中存储的值来构建牌的名称和数值的描述。`description` 属性使用可选绑定来检查是否存在第二个值，如果有，则为第二个值插入额外的描述信息。

由于 `BlackjackCard` 是一个没有自定义初始化器的结构体，它具有一个隐式的成员逐一初始化器，正如在 [[doc:Initialization#Memberwise-Initializers-for-Structure-Types](doc:Initialization#Memberwise-Initializers-for-Structure-Types)]中所描述的那样。你可以使用这个初始化器来初始化一个名为 `theAceOfSpades` 的新常量：

```swift
let theAceOfSpades = BlackjackCard(rank: .ace, suit: .spades)
print("theAceOfSpades: \(theAceOfSpades.description)")
// 输出 "theAceOfSpades: suit is ♠, value 是 1 或者 11"。
```

<!--
  - test: `nestedTypes`

  ```swifttest
  -> let theAceOfSpades = BlackjackCard(rank: .ace, suit: .spades)
  -> print("theAceOfSpades: \(theAceOfSpades.description)")
  <- theAceOfSpades: suit is ♠, value is 1 or 11
  ```
-->

尽管 `Rank` 和 `Suit` 嵌套在 `BlackjackCard` 中，它们的类型可以从上下文中推断出来，因此在初始化这个实例时，可以仅通过它们的名称（如 `.ace` 和 `.spades`）来引用枚举的情况。
在上面的示例中，`description` 属性正确地记录了黑桃 A 的值为 `1` 或 `11`。

## 访问嵌套类型

要在定义上下文之外使用嵌套类型，需要在其名称前加上其外部类型的名称前缀：

```swift
let heartsSymbol = BlackjackCard.Suit.hearts.rawValue
// heartsSymbol 是 "♡"
```

<!--
  - test: `nestedTypes`

  ```swifttest
  -> let heartsSymbol = BlackjackCard.Suit.hearts.rawValue
  /> heartsSymbol is \"\(heartsSymbol)\"
  </ heartsSymbol is "♡"
  ```
-->

在上面的例子中，这使得 `Suit`, `Rank`, 和 `Values`的名称可以故意保持简短，因为它们的名称由定义它们的上下文自然限定。

<!--
This source file is part of the Swift.org open source project

Copyright (c) 2014 - 2022 Apple Inc. and the Swift project authors
Licensed under Apache License v2.0 with Runtime Library Exception

See https://swift.org/LICENSE.txt for license information
See https://swift.org/CONTRIBUTORS.txt for the list of Swift project authors
-->


