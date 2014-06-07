# 枚举

本页内容包含：

-	枚举语法
-	匹配枚举值与`Swith`语句
-	实例值
-	原始值

枚举（enumeration）定义了一个通用类型的一组相关的值，使你可以在你的代码中以一个安全的方式来使用这些值。

如果你熟悉C语言，你就会知道，在C语言中枚举会把一些整型值赋予枚举标识符。Swift中的枚举更加灵活，不需要给每一个枚举成员提供一个值。如果一个值（一个“原始”值）被提供给每个枚举成员（enumeration member），则该值可以是一个字符串，一个字符，或是一个整型值或浮点值。

此外，枚举成员可以指定任何类型的实例值（associated value）被每个枚举成

在Swift中，枚举类型是一等公民类型。它们采用了很多传统上只被类（class)所支持的特征，例如计算属性（computed properties)，用于提供关于枚举当前值的附加信息， 实例方法（instance methods），用于提供和枚举所代表的值相关联的功能。枚举也可以定义实例初始化（initializers）来提供一个初始成员值；可以在原始的实现基础上扩展它们的功能；可以遵守协议（protocols）来提供标准的功能。

欲了解更多相关功能，请参见属性（Properties），方法（Methods），构造过程（Initialization），扩展（Extensions），和接口（Protocols）。

## 枚举语法

使用`enum`关键词并且把它们的整个定义放在一对大括号内：

	enum SomeEumeration {
		// enumeration definition goes here
	}

以下是一个指南针四个方向的例子：

	enum CompassPoint {
		case North
		case South
		case East
		case West
	}
	
在一个枚举中定义的值（例如 `North`，`South`，`East`和`West`）是枚举的***成员值***（或者***成员***）。`case`关键词表明新的一行成员值将被定义。

> 注意：
> 不像C和Objective-C一样，Swift的枚举成员在被创建时不会被赋予一个默认的整数值。在上面的`CompassPoints`例子中，`North`，`South`，`East`和`West`不是隐示得等于`0`，`1`，`2`和`3`。相反的，这些不同的枚举成员在`CompassPoint`的一种显示定义中拥有各自不同的值。

多个成员值可以出现在同一行上，用逗号隔开：

	enum Planet {
		case Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Nepturn
	}
	
每个枚举定义了一个全新的类型。像Swift中其他类型一样，它们的名字（例如`CompassPoint`和`Planet`）必须以一个大写字母开头。给枚举类型单数名字而不是复数名字，以便于读起来更加容易理解：

	var directionToHead = CompassPoint.West

`directionToHead`的类型被推断当它被`CompassPoint`的一个可能值初始化。一旦`directionToHead`被声明为一个`CompassPoint`，你可以使用更短的（.）语法将其设置为另一个`CompassPoint`的值：

	directionToHead = .East
	
`directionToHead`的类型已知时，当设定它的值时，你可以不写类型名。使用显示类型的枚举值可以让代码具有更好的可读性。

## 匹配枚举值和`Switch`语句

你可以匹配单个枚举值和`switch`语句：

	directionToHead = .South
	switch directionToHead {
	case .North:
    	println("Lots of planets have a north")
	case .South:
    	println("Watch out for penguins")
	case .East:
    	println("Where the sun rises")
	case .West:
    	println("Where the skies are blue")
	}
	// prints "Watch out for penguins”

你可以如此这段代码：

“考虑`directionToHead`的值。当它等于`.North`，打印`“Lots of planets have a north”`。当它等于`.South`，打印`“Watch out for penguins”`。”

。。。。。。等等。

正如在控制流（Control Flow）中介绍，当考虑一个枚举的成员们时，一个`switch`语句必须全面。如果忽略了`.West`这种情况，上面那段代码将如果通过编译，因为它没有考虑到`CompassPoint`的全部成员。全面性的要求确保了枚举成员不会被意外遗漏。

当不需要匹配每个枚举成员的时候，你可以提供一个默认`default`分支来涵盖所有未明确提出的任何成员：

	let somePlanet = Planet.Earth
	switch somePlanet {
	case .Earth:
    	println("Mostly harmless")
	default:
    	println("Not a safe place for humans")
	}
	// prints "Mostly harmless”

## 实例值（associated values）

上一小节的例子演示了一个枚举的成员是如何被定义（分类）的。你可以为`Planet.Earth`设置一个常量或则变量，并且在之后查看这个值。然而，有时候会很有用如果能够把其他类型的实例值和成员值一起存储起来。这能让你随着成员值存储额外的自定义信息，并且当每次你在代码中利用该成员时允许这个信息产生变化。

你可以定义Swift的枚举存储任何类型的实例值，如果需要的话，每个成员的数据类型可以是各不相同的。枚举的这种特性跟其他语言中的可辨识联合（discriminated unions），标签联合（tagged unions），或者变体（variants）相似。

例如，假设一个库存跟踪系统需要利用两种不同类型的条形码来跟踪商品。有些商品上标有UPC-A格式的一维码，它使用数字0到9.每一个条形码都有一个代表“数字系统”的数字，该数字后接10个代表“标识符”的数字。最后一个数字是“检查”位，用来验证代码是否被正确扫描：

其他商品上标有QR码格式的二维码，它可以使用任何ISO8859-1字符，并且可以编码一个最多拥有2,953字符的字符串。

对于库存跟踪系统来说，能够把UPC-A码作为三个整型值的元组，和把QR码作为一个任何长度的字符串存储起来是方便的。

