# 枚举（Enumerations）
---

> 1.0
> 翻译：[yankuangshi](https://github.com/yankuangshi)
> 校对：[shinyzhu](https://github.com/shinyzhu)

> 2.0
> 翻译+校对：[futantan](https://github.com/futantan)

本页内容包含：

- [枚举语法（Enumeration Syntax）](#enumeration_syntax)
- [匹配枚举值与`Swith`语句（Matching Enumeration Values with a Switch Statement）](#matching_enumeration_values_with_a_switch_statement)
- [相关值（Associated Values）](#associated_values)
- [原始值（Raw Values）](#raw_values)
- [递归枚举（Recursive Enumerations）](#recursive_enumerations)

**枚举**定义了一个通用类型的一组相关值，使你可以在你的代码中以一种安全的方式来使用这些值。

如果你熟悉 C 语言，你就会知道，在 C 语言中枚举将枚举名和一个整型值相对应。Swift 中的枚举更加灵活，不必给每一个枚举成员提供一个值。如果给枚举成员提供一个值（称为“原始”值），则该值的类型可以是字符串，字符，或是一个整型值或浮点数。

此外，枚举成员可以指定任何类型的相关值存储到枚举成员值中，就像其他语言中的联合体（unions）和变体（variants）。你可以定义一组通用的相关成员作为枚举的一部分，每一组都有不同的一组与它相关的适当类型的数值。

在 Swift 中，枚举类型是一等公民（first-class）。它们采用了很多传统上只被类（class）所支持的特征，例如计算型属性（computed properties），用于提供关于枚举当前值的附加信息，实例方法（instance methods），用于提供和枚举所代表的值相关联的功能。枚举也可以定义构造函数（initializers）来提供一个初始值；可以在原始的实现基础上扩展它们的功能；可以遵守协议（protocols）来提供标准的功能。

欲了解更多相关信息，请参见[属性（Properties）](./10_Properties.html)，[方法（Methods）](./11_Methods.html)，[构造过程（Initialization）](./14_Initialization.html)，[扩展（Extensions）](./20_Extensions.html)和[协议（Protocols）](./21_Protocols.html)。

<a name="enumeration_syntax"></a>
## 枚举语法

使用`enum`关键词来创建枚举并且把它们的整个定义放在一对大括号内：

```swift
enum SomeEnumeration {
  // 枚举定义放在这里
}
```

下面是指南针四个方向的例子：

```swift
enum CompassPoint {
  case North
  case South
  case East
  case West
}
```

枚举中定义的值（如 `North`，`South`，`East`和`West`）是这个枚举的**成员值**（或**成员**）。`case`关键词表示一行新的成员值将被定义。

> 注意：
> 和 C 和 Objective-C 不同，Swift 的枚举成员在被创建时不会被赋予一个默认的整型值。在上面的`CompassPoint`例子中，`North`，`South`，`East`和`West`不会隐式地赋值为`0`，`1`，`2`和`3`。相反，这些枚举成员本身就有完备的值，这些值是已经明确定义好的`CompassPoint`类型。

多个成员值可以出现在同一行上，用逗号隔开：

```swift
enum Planet {
  case Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune
}
```

每个枚举定义了一个全新的类型。像 Swift 中其他类型一样，它们的名字（例如`CompassPoint`和`Planet`）必须以一个大写字母开头。给枚举类型起一个单数名字而不是复数名字，以便于读起来更加容易理解：

```swift
var directionToHead = CompassPoint.West
```

`directionToHead`的类型可以在它被`CompassPoint`的一个可能值初始化时推断出来。一旦`directionToHead`被声明为一个`CompassPoint`，你可以使用一个缩写语法（.）将其设置为另一个`CompassPoint`的值：

```swift
directionToHead = .East
```

当`directionToHead`的类型已知时，再次为其赋值可以省略枚举名。使用显式类型的枚举值可以让代码具有更好的可读性。

<a name="matching_enumeration_values_with_a_switch_statement"></a>
## 匹配枚举值和`Switch`语句

你可以使用`switch`语句匹配单个枚举值：

```swift
directionToHead = .South
switch directionToHead {
	case .North:
	    print("Lots of planets have a north")
	case .South:
	    print("Watch out for penguins")
	case .East:
	    print("Where the sun rises")
	case .West:
	    print("Where the skies are blue")
}
// 输出 "Watch out for penguins”
```

你可以这样理解这段代码：

“判断`directionToHead`的值。当它等于`.North`，打印`“Lots of planets have a north”`。当它等于`.South`，打印`“Watch out for penguins”`。”

等等以此类推。

正如在[控制流（Control Flow）](./05_Control_Flow.html)中介绍的那样，在判断一个枚举类型的值时，`switch`语句必须穷举所有情况。如果忽略了`.West`这种情况，上面那段代码将无法通过编译，因为它没有考虑到`CompassPoint`的全部成员。强制性全部穷举的要求确保了枚举成员不会被意外遗漏。

当不需要匹配每个枚举成员的时候，你可以提供一个默认`default`分支来涵盖所有未明确被提出的枚举成员：

```swift
let somePlanet = Planet.Earth
switch somePlanet {
case .Earth:
    print("Mostly harmless")
default:
    print("Not a safe place for humans")
}
// 输出 "Mostly harmless”
```

<a name="associated_values"></a>
## 相关值（Associated Values）

上一小节的例子演示了如何定义（分类）枚举的成员。你可以为`Planet.Earth`设置一个常量或者变量，并且在赋值之后查看这个值。不管怎样，如果有时候能够把其他类型的**相关值**和成员值一起存储起来会很有用。这能让你存储成员值之外的自定义信息，并且当你每次在代码中使用该成员时允许这个信息产生变化。

你可以定义 Swift 的枚举存储任何类型的相关值，如果需要的话，每个成员的数据类型可以是各不相同的。枚举的这种特性跟其他语言中的可辨识联合（discriminated unions），标签联合（tagged unions），或者变体（variants）相似。

例如，假设一个库存跟踪系统需要利用两种不同类型的条形码来跟踪商品。有些商品上标有 UPC-A 格式的一维条形码，它使用数字 0 到 9。每一个条形码都有一个代表“数字系统”的数字，该数字后接 5 个代表“生产代码”的数字，接下来是5位“产品代码”。最后一个数字是“检查”位，用来验证代码是否被正确扫描：

<img width="252" height="120" alt="" src="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/barcode_UPC_2x.png">

其他商品上标有 QR 码格式的二维码，它可以使用任何 ISO 8859-1 字符，并且可以编码一个最多拥有 2953 个字符的字符串:

<img width="169" height="169" alt="" src="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/barcode_QR_2x.png">

对于库存跟踪系统来说，能够把 UPC-A 码作为四个整型值的元组，和把 QR 码作为一个任何长度的字符串存储起来是方便的。

在 Swift 中，使用如下方式定义两种商品条码的枚举：

```swift
enum Barcode {
  case UPCA(Int, Int, Int, Int)
  case QRCode(String)
}
```

以上代码可以这么理解：

“定义一个名为`Barcode`的枚举类型，它可以是`UPCA`的一个相关值（`Int`，`Int`，`Int`，`Int`），或者是`QRCode`的一个字符串类型（`String`）相关值。”

这个定义不提供任何`Int`或`String`的实际值，它只是定义了，当`Barcode`常量和变量等于`Barcode.UPCA`或`Barcode.QRCode`时，相关值的类型。

然后可以使用任何一种条码类型创建新的条码，如：

```swift
var productBarcode = Barcode.UPCA(8, 85909, 51226, 3)
```

以上例子创建了一个名为`productBarcode`的变量，并且赋给它一个`Barcode.UPCA`的相关元组值`(8, 85909, 51226, 3)`。

同一个商品可以被分配给一个不同类型的条形码，如：

```swift
productBarcode = .QRCode("ABCDEFGHIJKLMNOP")
```

这时，原始的`Barcode.UPCA`和其整数值被新的`Barcode.QRCode`和其字符串值所替代。条形码的常量和变量可以存储一个`.UPCA`或者一个`.QRCode`（连同它的相关值），但是在任何指定时间只能存储其中之一。

像以前那样，不同的条形码类型可以使用一个 switch 语句来检查，然而这次相关值可以被提取作为 switch 语句的一部分。你可以在`switch`的 case 分支代码中提取每个相关值作为一个常量（用`let`前缀）或者作为一个变量（用`var`前缀）来使用：

```swift
switch productBarcode {
case .UPCA(let numberSystem, let manufacturer, let product, let check):
    print("UPC-A: \(numberSystem), \(manufacturer), \(product), \(check).")
case .QRCode(let productCode):
    print("QR code: \(productCode).")
}
// 输出 "QR code: ABCDEFGHIJKLMNOP."
```

如果一个枚举成员的所有相关值被提取为常量，或者它们全部被提取为变量，为了简洁，你可以只放置一个`var`或者`let`标注在成员名称前：

```swift
switch productBarcode {
case let .UPCA(numberSystem, manufacturer, product, check):
    print("UPC-A: \(numberSystem), \(manufacturer), \(product), \(check).")
case let .QRCode(productCode):
    print("QR code: \(productCode).")
}
// 输出 "QR code: ABCDEFGHIJKLMNOP."
```

<a name="raw_values"></a>
## 原始值（Raw Values）

在[相关值](#raw_values)小节的条形码例子中演示了一个枚举的成员如何声明它们存储不同类型的相关值。作为相关值的另一种选择，枚举成员可以被默认值（称为原始值）赋值，其中这些原始值具有相同的类型。

这里是一个枚举成员存储 ASCII 码的例子：

```swift
enum ASCIIControlCharacter: Character {
    case Tab = "\t"
    case LineFeed = "\n"
    case CarriageReturn = "\r"
}
```

在这里，`ASCIIControlCharacter`的枚举类型的原始值类型被定义为字符型`Character`，并被设置了一些比较常见的 ASCII 控制字符。字符值的描述请详见[字符串和字符](./03_Strings_and_Characters.html)部分。


原始值可以是字符串，字符，或者任何整型值或浮点型值。每个原始值在它的枚举声明中必须是唯一的。

>注意：  
>原始值和相关值是不相同的。当你开始在你的代码中定义枚举的时候原始值是被预先填充的值，像上述三个 ASCII 码。对于一个特定的枚举成员，它的原始值始终是相同的。相关值是当你在创建一个基于枚举成员的新常量或变量时才会被设置，并且每次当你这么做得时候，它的值可以是不同的。

### 原始值的隐式赋值（Implicitly Assigned Raw Values）

在使用原始值为整数或者字符串类型的枚举时，不需要显式的为每一个成员赋值，这时，Swift将会自动为你赋值。

例如，当使用整数作为原始值时，隐式赋值的值依次递增1。如果第一个值没有被赋初值，将会被自动置为0。

下面的枚举是对之前`Planet`这个枚举的一个细化，利用原始整型值来表示每个 planet 在太阳系中的顺序：

```swift
enum Planet: Int {
    case Mercury = 1, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune
}
```

在上面的例子中，`Plant.Mercury`赋了初值`1`，`Planet.Venus`会拥有隐式赋值`2`，依次类推。

当使用字符串作为枚举类型的初值时，每个枚举成员的隐式初值则为该成员的名称。

下面的例子是`CompassPoint`枚举类型的精简版，使用字符串作为初值类型，隐式初始化为各个方向的名称：

```swift
enum CompassPoint: String {
    case North, South, East, West
}
```

上面例子中，`CompassPoint.South`拥有隐式初值`South`，依次类推。

使用枚举成员的`rawValue`属性可以访问该枚举成员的原始值：

```swift
let earthsOrder = Planet.Earth.rawValue
// earthsOrder 值为 3

let sunsetDirection = CompassPoint.West.rawValue
// sunsetDirection 值为 "West"
```

### 使用原始值初始化枚举变量（Initializing from a Raw Value）

如果在定义枚举类型的时候使用了原始值，那么将会自动获得一个初始化方法，这个方法将原始值类型作为参数，返回值是枚举成员或`nil`。你可以使用这种初始化方法来创建一个新的枚举变量。

这个例子通过原始值`7`从而创建枚举成员：

```swift
let possiblePlanet = Planet(rawValue: 7)
// possiblePlanet 类型为 Planet? 值为 Planet.Uranus
```

然而，并非所有可能的`Int`值都可以找到一个匹配的行星。正因为如此，构造函数可以返回一个**可选**的枚举成员。在上面的例子中，`possiblePlanet`是`Planet?`类型，或“可选的`Planet`”。

>注意：
>原始值构造器是一个可失败构造器，因为并不是每一个原始值都有与之对应的枚举成员。更多信息请参见[可失败构造器](../chapter3/05_Declarations#failable_initializers)

如果你试图寻找一个位置为9的行星，通过参数为`rawValue`构造函数返回的可选`Planet`值将是`nil`：

```swift
let positionToFind = 9
if let somePlanet = Planet(rawValue: positionToFind) {
    switch somePlanet {
    case .Earth:
        print("Mostly harmless")
    default:
        print("Not a safe place for humans")
    }
} else {
    print("There isn't a planet at position \(positionToFind)")
}
// 输出 "There isn't a planet at position 9
```

这个范例使用可选绑定（optional binding），通过原始值`9`试图访问一个行星。`if let somePlanet = Planet(rawValue: 9)`语句获得一个可选`Planet`，如果可选`Planet`可以被获得，把`somePlanet`设置成该可选`Planet`的内容。在这个范例中，无法检索到位置为`9`的行星，所以`else`分支被执行。

<a name="recursive_enumerations"></a>
## 递归枚举（Recursive Enumerations）

在对操作符进行描述的时候，使用枚举类型来对数据建模很方便，因为需要考虑的情况固定可枚举。操作符可以将两个由数字组成的算数表达式连接起来，例如，将`5`连接成复杂一些的表达式`5+4`。

算术表达式的一个重要特性是，表达式可以嵌套使用。例如，表达式`(5 + 4) * 2`乘号右边是一个数字，左边则是另一个表达式。因为数据是嵌套的，因而用来存储数据的枚举类型也许要支持这种嵌套————这表示枚举类型需要支持递归。

`递归枚举（recursive enumeration）`是一种枚举类型，表示它的枚举中，有一个或多个枚举成员拥有该枚举的其他成员作为相关值。使用递归枚举时，编译器会插入一个中间层。你可以在枚举成员前加上`indirect`来表示这成员可递归。

例如，下面的例子中，枚举类型存储了简单的算数表达式：


```swift
enum ArithmeticExpression {
    case Number(Int)
    indirect case Addition(ArithmeticExpression, ArithmeticExpression)
    indirect case Multiplication(ArithmeticExpression, ArithmeticExpression)
}
```

你也可以在枚举类型开头加上`indirect`关键字来表示它的所有成员都是可递归的：

```swift
indirect enum ArithmeticExpression {
    case Number(Int)
    case Addition(ArithmeticExpression, ArithmeticExpression)
    case Multiplication(ArithmeticExpression, ArithmeticExpression)
}
```

上面定义的枚举类型可以存储三种算数表达式：纯数字、两个表达式的相加、两个表达式相乘。`Addition` 和 `Multiplication`成员的相关值也是算数表达式————这些相关值使得嵌套表达式成为可能。

递归函数可以很直观地使用具有递归性质的数据结构。例如，下面是一个计算算术表达式的函数：

```swift
func evaluate(expression: ArithmeticExpression) -> Int {
    switch expression {
    case .Number(let value):
        return value
    case .Addition(let left, let right):
        return evaluate(left) + evaluate(right)
    case .Multiplication(let left, let right):
        return evaluate(left) * evaluate(right)
    }
}
 
// 计算 (5 + 4) * 2
let five = ArithmeticExpression.Number(5)
let four = ArithmeticExpression.Number(4)
let sum = ArithmeticExpression.Addition(five, four)
let product = ArithmeticExpression.Multiplication(sum, ArithmeticExpression.Number(2))
print(evaluate(product))
// 输出 "18"
```

该函数如果遇到纯数字，就直接返回该数字的值。如果遇到的是加法或乘法运算，则分别计算左边表达式和右边表达式的值，然后相加或相乘。
