# 嵌套类型
-----------------

> 1.0
> 翻译：[Lin-H](https://github.com/Lin-H)
> 校对：[shinyzhu](https://github.com/shinyzhu)

> 2.0
> 翻译+校对：[SergioChan](https://github.com/SergioChan)

> 2.1
> 校对：[shanks](http://codebuild.me)，2015-11-01
> 
> 2.2
> 翻译+校对：[SketchK](https://github.com/SketchK) 2016-05-16    
> 3.0.1，shanks，2016-11-13

本页包含内容：

- [嵌套类型实践](#nested_types_in_action)
- [引用嵌套类型](#referring_to_nested_types)

枚举常被用于为特定类或结构体实现某些功能。类似的，枚举可以方便的定义工具类或结构体，从而为某个复杂的类型所使用。为了实现这种功能，Swift 允许你定义*嵌套类型*，可以在支持的类型中定义嵌套的枚举、类和结构体。

要在一个类型中嵌套另一个类型，将嵌套类型的定义写在其外部类型的`{}`内，而且可以根据需要定义多级嵌套。

<a name="nested_types_in_action"></a>
## 嵌套类型实践

下面这个例子定义了一个结构体`BlackjackCard`（二十一点），用来模拟`BlackjackCard`中的扑克牌点数。`BlackjackCard`结构体包含两个嵌套定义的枚举类型`Suit`和`Rank`。

在`BlackjackCard`中，`Ace`牌可以表示`1`或者`11`，`Ace`牌的这一特征通过一个嵌套在`Rank`枚举中的结构体`Values`来表示：

```swift
struct BlackjackCard {
    // 嵌套的 Suit 枚举
    enum Suit: Character {
       case Spades = "♠", Hearts = "♡", Diamonds = "♢", Clubs = "♣"
    }

    // 嵌套的 Rank 枚举
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
            return Values(first: self.rawValue, second: nil)
            }
       }
    }

    // BlackjackCard 的属性和方法
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

`Suit`枚举用来描述扑克牌的四种花色，并用一个`Character`类型的原始值表示花色符号。

`Rank`枚举用来描述扑克牌从`Ace`~`10`，以及`J`、`Q`、`K`，这`13`种牌，并用一个`Int`类型的原始值表示牌的面值。（这个`Int`类型的原始值未用于`Ace`、`J`、`Q`、`K`这`4`种牌。）

如上所述，`Rank`枚举在内部定义了一个嵌套结构体`Values`。结构体`Values`中定义了两个属性，用于反映只有`Ace`有两个数值，其余牌都只有一个数值：

- `first`的类型为`Int`
- `second`的类型为`Int?`，或者说“可选 `Int`”

`Rank`还定义了一个计算型属性`values`，它将会返回一个`Values`结构体的实例。这个计算型属性会根据牌的面值，用适当的数值去初始化`Values`实例。对于`J`、`Q`、`K`、`Ace`这四种牌，会使用特殊数值。对于数字面值的牌，使用枚举实例的原始值。

`BlackjackCard`结构体拥有两个属性——`rank`与`suit`。它也同样定义了一个计算型属性`description`，`description`属性用`rank`和`suit`中的内容来构建对扑克牌名字和数值的描述。该属性使用可选绑定来检查可选类型`second`是否有值，若有值，则在原有的描述中增加对`second`的描述。

因为`BlackjackCard`是一个没有自定义构造器的结构体，在[结构体的逐一成员构造器](./14_Initialization.html#memberwise_initializers_for_structure_types)中可知，结构体有默认的成员构造器，所以你可以用默认的构造器去初始化新常量`theAceOfSpades`：

```swift
let theAceOfSpades = BlackjackCard(rank: .Ace, suit: .Spades)
print("theAceOfSpades: \(theAceOfSpades.description)")
// 打印 “theAceOfSpades: suit is ♠, value is 1 or 11”
```

尽管`Rank`和`Suit`嵌套在`BlackjackCard`中，但它们的类型仍可从上下文中推断出来，所以在初始化实例时能够单独通过成员名称（`.Ace`和`.Spades`）引用枚举实例。在上面的例子中，`description`属性正确地反映了黑桃A牌具有`1`和`11`两个值。

<a name="referring_to_nested_types"></a>
## 引用嵌套类型

在外部引用嵌套类型时，在嵌套类型的类型名前加上其外部类型的类型名作为前缀：

```swift
let heartsSymbol = BlackjackCard.Suit.Hearts.rawValue
// 红心符号为 “♡”
```

对于上面这个例子，这样可以使`Suit`、`Rank`和`Values`的名字尽可能的短，因为它们的名字可以由定义它们的上下文来限定。
