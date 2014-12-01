> 翻譯：[Lin-H](https://github.com/Lin-H)  
> 校對：[shinyzhu](https://github.com/shinyzhu)

# 嵌套類型
-----------------

本頁包含內容：

- [嵌套類型實例](#nested_types_in_action)
- [嵌套類型的引用](#referring_to_nested_types)

枚舉類型常被用於實現特定類或結構體的功能。也能夠在有多種變量類型的環境中，方便地定義通用類或結構體來使用，為了實現這種功能，Swift允許你定義嵌套類型，可以在枚舉類型、類和結構體中定義支持嵌套的類型。

要在一個類型中嵌套另一個類型，將需要嵌套的類型的定義寫在被嵌套類型的區域{}內，而且可以根據需要定義多級嵌套。

<a name="nested_types_in_action"></a>
##嵌套類型實例

下面這個例子定義了一個結構體`BlackjackCard`(二十一點)，用來模擬`BlackjackCard`中的撲克牌點數。`BlackjackCard`結構體包含2個嵌套定義的枚舉類型`Suit` 和 `Rank`。

在`BlackjackCard`規則中，`Ace`牌可以表示1或者11，`Ace`牌的這一特徵用一個嵌套在枚舉型`Rank`的結構體`Values`來表示。

```swift
struct BlackjackCard {
    // 嵌套定義枚舉型Suit
    enum Suit: Character {
       case Spades = "□", Hearts = "□", Diamonds = "□", Clubs = "□"
    }

    // 嵌套定義枚舉型Rank
    enum Rank: Int {
       case Two = 2, Three, Four, Five, Six, Seven, Eight, Nine, Ten
       case Jack, Queen, King, Ace
       struct Values {
           let first: Int, second: Int?
       }
       var values: Values {
        switch self {
        case .Ace:
            return Values(first: 1, second: 11)
        case .Jack, .Queen, .King:
            return Values(first: 10, second: nil)
        default:
            return Values(first: self.toRaw(), second: nil)
            }
       }
    }
    
    // BlackjackCard 的屬性和方法
    let rank: Rank, suit: Suit
    var description: String {
    var output = "suit is \(suit.toRaw()),"
        output += " value is \(rank.values.first)"
        if let second = rank.values.second {
            output += " or \(second)"
        }
        return output
    }
}
```

枚舉型的`Suit`用來描述撲克牌的四種花色，並分別用一個`Character`類型的值代表花色符號。

枚舉型的`Rank`用來描述撲克牌從`Ace`~10,`J`,`Q`,`K`,13張牌，並分別用一個`Int`類型的值表示牌的面值。(這個`Int`類型的值不適用於`Ace`,`J`,`Q`,`K`的牌)。

如上文所提到的，枚舉型`Rank`在自己內部定義了一個嵌套結構體`Values`。這個結構體包含兩個變量，只有`Ace`有兩個數值，其餘牌都只有一個數值。結構體`Values`中定義的兩個屬性：

`first`, 為` Int`
`second`, 為 `Int?`, 或 「optional `Int`」

`Rank`定義了一個計算屬性`values`，這個計算屬性會根據牌的面值，用適當的數值去初始化`Values`實例，並賦值給`values`。對於`J`,`Q`,`K`,`Ace`會使用特殊數值，對於數字面值的牌使用`Int`類型的值。

`BlackjackCard`結構體自身有兩個屬性—`rank`與`suit`，也同樣定義了一個計算屬性`description`，`description`屬性用`rank`和`suit`的中內容來構建對這張撲克牌名字和數值的描述，並用可選類型`second`來檢查是否存在第二個值，若存在，則在原有的描述中增加對第二數值的描述。

因為`BlackjackCard`是一個沒有自定義構造函數的結構體，在[Memberwise Initializers for Structure Types](https://github.com/CocoaChina-editors/Welcome-to-Swift/blob/master/The%20Swift%20Programming%20Language/02Language%20Guide/14Initialization.md)中知道結構體有默認的成員構造函數，所以你可以用默認的`initializer`去初始化新的常量`theAceOfSpades`:

```swift
let theAceOfSpades = BlackjackCard(rank: .Ace, suit: .Spades)
println("theAceOfSpades: \(theAceOfSpades.description)")
// 打印出 "theAceOfSpades: suit is □, value is 1 or 11"
```

儘管`Rank`和`Suit`嵌套在`BlackjackCard`中，但仍可被引用，所以在初始化實例時能夠通過枚舉類型中的成員名稱單獨引用。在上面的例子中`description`屬性能正確得輸出對`Ace`牌有1和11兩個值。

<a name="referring_to_nested_types"></a>
##嵌套類型的引用

在外部對嵌套類型的引用，以被嵌套類型的名字為前綴，加上所要引用的屬性名：

```swift
let heartsSymbol = BlackjackCard.Suit.Hearts.toRaw()
// 紅心的符號 為 "□"
```

對於上面這個例子，這樣可以使`Suit`, `Rank`, 和 `Values`的名字盡可能的短，因為它們的名字會自然的由被定義的上下文來限定。

preview
