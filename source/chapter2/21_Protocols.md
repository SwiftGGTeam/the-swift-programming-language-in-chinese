> 翻译：[geek5nan](https://github.com/geek5nan)  
> 校对：[dabing1022](https://github.com/dabing1022)

# 协议
-----------------

本页包含内容：

- [协议的语法（Protocol Syntax）](#protocol_syntax)
- [对属性的规定（Property Requirements）](#property_requirements)
- [对方法的规定（Method Requirements）](#method_requirements)
- [对突变方法的规定（Mutating Method Requirements）](#mutating_method_requirements)
- [对构造器的规定（Initializer Requirements）](#initializer_requirements)
- [协议类型（Protocols as Types）](#protocols_as_types)
- [委托(代理)模式（Delegation）](#delegation)
- [在扩展中添加协议成员（Adding Protocol Conformance with an Extension）](#adding_protocol_conformance_with_an_extension)
- [通过扩展补充协议声明（Declaring Protocol Adoption with an Extension）](#declaring_protocol_adoption_with_an_extension)
- [集合中的协议类型（Collections of Protocol Types）](#collections_of_protocol_types)
- [协议的继承（Protocol Inheritance）](#protocol_inheritance)
- [类专属协议（Class-Only Protocol）](#class_only_protocol)
- [协议合成（Protocol Composition）](#protocol_composition)
- [检验协议的一致性（Checking for Protocol Conformance）](#checking_for_protocol_conformance)
- [对可选协议的规定（Optional Protocol Requirements）](#optional_protocol_requirements)

`协议(Protocol)`用于定义完成某项任务或功能所必须的方法和属性，协议实际上并不提供这些功能或任务的具体`实现(Implementation)`--而只用来描述这些实现应该是什么样的。类，结构体，枚举通过提供协议所要求的方法，属性的具体实现来`采用(adopt)`协议。任意能够满足协议要求的类型被称为协议的`遵循者`。

`协议`可以要求其`遵循者`提供特定的实例属性，实例方法，类方法，操作符或下标脚本等。

<a name="protocol_syntax"></a>
## 协议的语法

`协议`的定义方式与`类，结构体，枚举`的定义都非常相似，如下所示:

```swift
protocol SomeProtocol {
	// 协议内容
}
```

在类型名称后加上`协议名称`，中间以冒号`:`分隔即可实现协议；实现多个协议时，各协议之间用逗号`,`分隔，如下所示:

```swift
struct SomeStructure: FirstProtocol, AnotherProtocol {
	// 结构体内容
}
```

如果一个类在含有`父类`的同时也采用了协议，应当把`父类`放在所有的`协议`之前，如下所示:

```swift
class SomeClass: SomeSuperClass, FirstProtocol, AnotherProtocol {
	// 类的内容
}
```

<a name="property_requirements"></a>
## 对属性的规定

协议可以规定其`遵循者`提供特定名称与类型的`实例属性(instance property)`或`类属性(type property)`，而不管其是`存储型属性(stored property)`还是`计算型属性(calculate property)`。此外也可以指定属性是只读的还是可读写的。

如果协议要求属性是可读写的，那么这个属性不能是常量`存储型属性`或只读`计算型属性`；如果协议要求属性是只读的(gettable)，那么`计算型属性`或`存储型属性`都能满足协议对属性的规定，在你的代码中，即使为只读属性实现了写方法(settable)也依然有效。

协议中的属性经常被加以`var`前缀声明其为变量属性，在声明后加上`{ set get }`来表示属性是可读写的，只读的属性则写作`{ get }`，如下所示:

```swift
protocol SomeProtocol {
	var mustBeSettable : Int { get set }
	var doesNotNeedToBeSettable: Int { get }
}
```

如下所示，通常在协议的定义中使用`class`前缀表示该属性为类成员；在枚举和结构体实现协议时中，需要使用`static`关键字作为前缀。

```swift
protocol AnotherProtocol {
	class var someTypeProperty: Int { get set }
}
```

如下所示，这是一个含有一个实例属性要求的协议:

```swift
protocol FullyNamed {
	var fullName: String { get }
}
```

`FullyNamed`协议定义了任何拥有`fullName`的类型。它并不指定具体类型，而只是要求类型必须提供一个`fullName`。任何`FullyNamed`类型都得有一个只读的`fullName`属性，类型为`String`。

如下所示，这是一个实现了`FullyNamed`协议的简单结构体:

```swift
struct Person: FullyNamed{
	var fullName: String
}
let john = Person(fullName: "John Appleseed")
//john.fullName 为 "John Appleseed"
```

这个例子中定义了一个叫做`Person`的结构体，用来表示具有指定名字的人。从第一行代码中可以看出，它采用了`FullyNamed`协议。

`Person`结构体的每一个实例都有一个叫做`fullName`，`String`类型的存储型属性，这正好匹配了`FullyNamed`协议的要求，也就意味着，`Person`结构体完整的`遵循`了协议。(如果协议要求未被完全满足,在编译时会报错)

这有一个更为复杂的类，它采用并实现了`FullyNamed`协议，如下所示:

```swift
class Starship: FullyNamed {
	var prefix: String?
	var name: String
	init(name: String, prefix: String? = nil ) {
		self.name = name
		self.prefix = prefix
	}
	var fullName: String {
	return (prefix != nil ? prefix! + " " : " ") + name
	}
}
var ncc1701 = Starship(name: "Enterprise", prefix: "USS")
// ncc1701.fullName == "USS Enterprise"
```

`Starship`类把`fullName`属性实现为只读的`计算型属性`。每一个`Starship`类的实例都有一个名为`name`的必备属性和一个名为`prefix`的可选属性。 当`prefix`存在时，将`prefix`插入到`name`之前来为`Starship`构建`fullName`，`prefix`不存在时，则将直接用`name`构建`fullName`

<a name="method_requirements"></a>
## 对方法的规定

`协议`可以要求其`遵循者`实现某些指定的`实例方法`或`类方法`。这些方法作为协议的一部分，像普通的方法一样清晰的放在协议的定义中，而不需要大括号和方法体。

>注意：
>协议中的方法支持`变长参数(variadic parameter)`，不支持`参数默认值(default value)`。

如下所示，协议中类方法的定义与类属性的定义相似，在协议定义的方法前置`class`关键字来表示。当在`枚举`或`结构体`实现类方法时，需要使用`static`关键字来代替。

```swift
protocol SomeProtocol {
	class func someTypeMethod()
}
```

如下所示，定义了含有一个实例方法的的协议。

```swift
protocol RandomNumberGenerator {
	func random() -> Double
}
```

`RandomNumberGenerator`协议要求其`遵循者`必须拥有一个名为`random`， 返回值类型为`Double`的实例方法。 (尽管这里并未指明，但是我们假设返回值在[0，1]区间内)。

`RandomNumberGenerator`协议并不在意每一个随机数是怎样生成的，它只强调这里有一个随机数生成器。

如下所示，下边的是一个遵循了`RandomNumberGenerator`协议的类。该类实现了一个叫做*线性同余生成器(linear congruential generator)*的伪随机数算法。


```swift
class LinearCongruentialGenerator: RandomNumberGenerator {
	var lastRandom = 42.0
	let m = 139968.0
	let a = 3877.0
	let c = 29573.0
	func random() -> Double {
		lastRandom = ((lastRandom * a + c) % m)
		return lastRandom / m
	}
}
let generator = LinearCongruentialGenerator()
println("Here's a random number: \(generator.random())")
// 输出 : "Here's a random number: 0.37464991998171"
println("And another one: \(generator.random())")
// 输出 : "And another one: 0.729023776863283"
```

<a name="mutating_method_requirements"></a>
## 对突变方法的规定

有时不得不在方法中更改实例的所属类型。在基于`值类型(value types)`(结构体，枚举)的实例方法中，将`mutating`关键字作为函数的前缀，写在`func`之前，表示可以在该方法中修改实例及其属性的所属类型。这一过程在[Modifyting Value Types from Within Instance Methods](1)章节中有详细描述。

如果协议中的实例方法打算改变其`遵循者`实例的类型，那么在协议定义时需要在方法前加`mutating`关键字，才能使`结构体，枚举`来采用并满足协议中对方法的规定。


>注意: 
>用`类`实现协议中的`mutating`方法时，不用写`mutating`关键字;用`结构体`，`枚举`实现协议中的`mutating`方法时，必须写`mutating`关键字。

如下所示，`Togglable`协议含有名为`toggle`的突变实例方法。根据名称推测，`toggle`方法应该是用于切换或恢复其`遵循者`实例或其属性的类型。

```swift
protocol Togglable {
	mutating func toggle()
}
```

当使用`枚举`或`结构体`来实现`Togglabl`协议时，需要提供一个带有`mutating`前缀的`toggle`方法。

如下所示，`OnOffSwitch`枚举`遵循`了`Togglable`协议，`On`，`Off`两个成员用于表示当前状态。枚举的`toggle`方法被标记为`mutating`，用以匹配`Togglabel`协议的规定。

```swift
enum OnOffSwitch: Togglable {
	case Off, On
	mutating func toggle() {
		switch self {
		case Off:
			self = On
		case On:
			self = Off
		}
	}
}
var lightSwitch = OnOffSwitch.Off
lightSwitch.toggle()
//lightSwitch 现在的值为 .On
```

<a name="initializer_requirements"></a>
## 对构造器的规定

协议可以要求它的遵循类型实现特定的构造器。你可以像书写普通的构造器那样，在协议的定义里写下构造器的需求，但不需要写花括号和构造器的实体：

```swift
protocol SomeProtocol {
    init(someParameter: Int)
}
```

**协议构造器规定在类中的实现**

你可以在遵循该协议的类中实现构造器，并指定其为类的特定构造器或者便捷构造器。在这两种情况下，你都必须给构造器实现标上"required"修饰符：

```swift
class SomeClass: SomeProtocol {
    required init(someParameter: Int) {
        //构造器实现
    }
}
```

使用`required`修饰符可以保证：所有的遵循该协议的子类，同样能为构造器规定提供一个显式的实现或继承实现。

关于`required`构造器的更多内容，请参考<a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/TheBasics.html#//apple_ref/doc/uid/TP40014097-CH5-XID_454">`required`构造器 </a>

>注意
>
>如果类已经被“final”修饰符所标示，你就不需要在协议构造器规定的实现中使用"required"修饰符。因为final类不能有子类。关于`final`修饰符的更多内容，请参见<a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Initialization.html#//apple_ref/doc/uid/TP40014097-CH18-XID_339">防止重写</a>

如果一个子类重写了父类的指定构造器，并且该构造器遵循了某个协议的规定，那么该构造器的实现需要被同时标示`required`和`override`修饰符

```swift
protocol SomeProtocol {
    init()
}


class SomeSuperClass {
    init() {
        //协议定义
    }
}

 
class SomeSubClass: SomeSuperClass, SomeProtocol {
    // "required" from SomeProtocol conformance; "override" from SomeSuperClass
    required override init() {
        // 构造器实现
    }
}
```

<a name="protocols_as_types"></a>
## 协议类型

尽管`协议`本身并不实现任何功能，但是`协议`可以被当做类型来使用。

使用场景:  

* `协议类型`作为函数、方法或构造器中的参数类型或返回值类型
* `协议类型`作为常量、变量或属性的类型
* `协议类型`作为数组、字典或其他容器中的元素类型

> 注意: 协议是一种类型，因此协议类型的名称应与其他类型(Int，Double，String)的写法相同，使用驼峰式写法

如下所示，这个示例中将协议当做类型来使用

```swift
class Dice {
	let sides: Int
	let generator: RandomNumberGenerator
	init(sides: Int, generator: RandomNumberGenerator) {
		self.sides = sides
		self.generator = generator
	}
	func roll() -> Int {
		return Int(generator.random() * Double(sides)) + 1
	}
}
```

例子中又一个`Dice`类，用来代表桌游中的拥有N个面的骰子。`Dice`的实例含有`sides`和`generator`两个属性，前者是整型，用来表示骰子有几个面，后者为骰子提供一个随机数生成器。

 `generator`属性的类型为`RandomNumberGenerator`，因此任何遵循了`RandomNumberGenerator`协议的类型的实例都可以赋值给`generator`，除此之外，无其他要求。

`Dice`类中也有一个`构造器(initializer)`，用来进行初始化操作。构造器中含有一个名为`generator`，类型为`RandomNumberGenerator`的形参。在调用构造方法时创建`Dice`的实例时，可以传入任何遵循`RandomNumberGenerator`协议的实例给generator。

`Dice`类也提供了一个名为`roll`的实例方法用来模拟骰子的面值。它先使用`generator`的`random`方法来创建一个[0-1]区间内的随机数种子，然后加工这个随机数种子生成骰子的面值。generator被认为是遵循了`RandomNumberGenerator`的类型，因而保证了`random`方法可以被调用。

如下所示，这里展示了如何使用`LinearCongruentialGenerator`的实例作为随机数生成器创建一个六面骰子:

```swift
var d6 = Dice(sides: 6,generator: LinearCongruentialGenerator())
for _ in 1...5 {
	println("Random dice roll is \(d6.roll())")
}
//输出结果
//Random dice roll is 3
//Random dice roll is 5
//Random dice roll is 4
//Random dice roll is 5
//Random dice roll is 4
```

<a name="delegation"></a>
## 委托(代理)模式

委托是一种设计模式(*译者注: 想起了那年 UITableViewDelegate 中的奔跑，那是我逝去的Objective-C。。。*)，它允许`类`或`结构体`将一些需要它们负责的功能`交由(委托)`给其他的类型的实例。

委托模式的实现很简单: 定义`协议`来`封装`那些需要被委托的`函数和方法`， 使其`遵循者`拥有这些被委托的`函数和方法`。

委托模式可以用来响应特定的动作或接收外部数据源提供的数据，而无需要知道外部数据源的所属类型(*译者注:只要求外部数据源`遵循`某协议*)。

下文是两个基于骰子游戏的协议: 

```swift
protocol DiceGame {
	var dice: Dice { get }
	func play()
}

protocol DiceGameDelegate {
	func gameDidStart(game: DiceGame)
	func game(game: DiceGame, didStartNewTurnWithDiceRoll diceRoll:Int)
	func gameDidEnd(game: DiceGame)
}
```

`DiceGame`协议可以在任意含有骰子的游戏中实现，`DiceGameDelegate`协议可以用来追踪`DiceGame`的游戏过程
	
如下所示，`SnakesAndLadders`是`Snakes and Ladders`(译者注:[Control Flow](2)章节有该游戏的详细介绍)游戏的新版本。新版本使用`Dice`作为骰子，并且实现了`DiceGame`和`DiceGameDelegate`协议，后者用来记录游戏的过程:

```swift
class SnakesAndLadders: DiceGame {
	let finalSquare = 25
	let dice = Dice(sides: 6, generator: LinearCongruentialGenerator())
	var square = 0
	var board: [Int]
	init() {
		board = [Int](count: finalSquare + 1, repeatedValue: 0)
		board[03] = +08; board[06] = +11; board[09] = +09; board[10] = +02
		board[14] = -10; board[19] = -11; board[22] = -02; board[24] = -08
	}
 	var delegate: DiceGameDelegate?
 	func play() {
 		square = 0
 		delegate?.gameDidStart(self)
 		gameLoop: while square != finalSquare {
 			let diceRoll = dice.roll()
 			delegate?.game(self,didStartNewTurnWithDiceRoll: diceRoll)
 			switch square + diceRoll {
 			case finalSquare:
 				break gameLoop
 			case let newSquare where newSquare > finalSquare:
 				continue gameLoop
 			default:
 			square += diceRoll
 			square += board[square]
 			}
 		}
 		delegate?.gameDidEnd(self)
 	}
}
```

这个版本的游戏封装到了`SnakesAndLadders`类中，该类采用了`DiceGame`协议，并且提供了`dice`属性和`play`实例方法用来`遵循`协议。(`dice`属性在构造之后就不在改变，且协议只要求`dice`为只读的，因此将`dice`声明为常量属性。)

在`SnakesAndLadders`类的`构造器(initializer)`初始化游戏。所有的游戏逻辑被转移到了`play`方法中，`play`方法使用协议规定的`dice`属性提供骰子摇出的值。

> 注意:`delegate`并不是游戏的必备条件，因此`delegate`被定义为遵循`DiceGameDelegate`协议的可选属性，`delegate`使用`nil`作为初始值。

`DicegameDelegate`协议提供了三个方法用来追踪游戏过程。被放置于游戏的逻辑中，即`play()`方法内。分别在游戏开始时，新一轮开始时，游戏结束时被调用。

因为`delegate`是一个遵循`DiceGameDelegate`的可选属性，因此在`play()`方法中使用了`可选链`来调用委托方法。 若`delegate`属性为`nil`， 则delegate所调用的方法失效。若`delegate`不为`nil`，则方法能够被调用

如下所示，`DiceGameTracker`遵循了`DiceGameDelegate`协议

```swift
class DiceGameTracker: DiceGameDelegate {
    var numberOfTurns = 0
    func gameDidStart(game: DiceGame) {
        numberOfTurns = 0
        if game is SnakesAndLadders {
            println("Started a new game of Snakes and Ladders")
        }
        println("The game is using a \(game.dice.sides)-sided dice")
    }
    func game(game: DiceGame, didStartNewTurnWithDiceRoll diceRoll: Int) {
        ++numberOfTurns
        println("Rolled a \(diceRoll)")
    }
    func gameDidEnd(game: DiceGame) {
        println("The game lasted for \(numberOfTurns) turns")
    }
}
```

`DiceGameTracker`实现了`DiceGameDelegate`协议规定的三个方法，用来记录游戏已经进行的轮数。 当游戏开始时，`numberOfTurns`属性被赋值为0; 在每新一轮中递加; 游戏结束后，输出打印游戏的总轮数。

`gameDidStart`方法从`game`参数获取游戏信息并输出。`game`在方法中被当做`DiceGame`类型而不是`SnakeAndLadders`类型，所以方法中只能访问`DiceGame`协议中的成员。当然了，这些方法也可以在类型转换之后调用。在上例代码中，通过`is`操作符检查`game`是否为 `SnakesAndLadders`类型的实例，如果是，则打印出相应的内容。

无论当前进行的是何种游戏，`game`都遵循`DiceGame`协议以确保`game`含有`dice`属性，因此在`gameDidStart`方法中可以通过传入的`game`参数来访问`dice`属性，进而打印出`dice`的`sides`属性的值。

`DiceGameTracker`的运行情况，如下所示:

```swift
let tracker = DiceGameTracker()
let game = SnakesAndLadders()
game.delegate = tracker
game.play()
// Started a new game of Snakes and Ladders
// The game is using a 6-sided dice
// Rolled a 3
// Rolled a 5
// Rolled a 4
// Rolled a 5
// The game lasted for 4 turns
```

<a name="adding_protocol_conformance_with_an_extension"></a>
## 在扩展中添加协议成员

即便无法修改源代码，依然可以通过`扩展(Extension)`来扩充已存在类型(*译者注: 类，结构体，枚举等*)。`扩展`可以为已存在的类型添加`属性`，`方法`，`下标脚本`，`协议`等成员。详情请在[扩展](4)章节中查看。

> 注意: 通过`扩展`为已存在的类型`遵循`协议时，该类型的所有实例也会随之添加协议中的方法

`TextRepresentable`协议含有一个`asText`，如下所示：

```swift
protocol TextRepresentable {
	func asText() -> String
}
```

通过`扩展`为上一节中提到的`Dice`类遵循`TextRepresentable`协议

```swift
extension Dice: TextRepresentable {
	func asText() -> String {
		return "A \(sides)-sided dice"
	}
}
```

从现在起，`Dice`类型的实例可被当作`TextRepresentable`类型：

```swift
let d12 = Dice(sides: 12,generator: LinearCongruentialGenerator())
println(d12.asText())
// 输出 "A 12-sided dice"
```

`SnakesAndLadders`类也可以通过`扩展`的方式来遵循协议：

```swift
extension SnakesAndLadders: TextRepresentable {
	func asText() -> String {
		return "A game of Snakes and Ladders with \(finalSquare) squares"
	}
}
println(game.asText())
// 输出 "A game of Snakes and Ladders with 25 squares"
```

<a name="declaring_protocol_adoption_with_an_extension"></a>
## 通过扩展补充协议声明

当一个类型已经实现了协议中的所有要求，却没有声明时，可以通过`扩展`来补充协议声明:

```swift
struct Hamster {
	var name: String
	func asText() -> String {
		return "A hamster named \(name)"
	}
}
extension Hamster: TextRepresentable {}
```

从现在起，`Hamster`的实例可以作为`TextRepresentable`类型使用

```swift
let simonTheHamster = Hamster(name: "Simon")
let somethingTextRepresentable: TextRepresentable = simonTheHamster
println(somethingTextRepresentable.asText())
// 输出 "A hamster named Simon"
```

> 注意: 即使满足了协议的所有要求，类型也不会自动转变，因此你必须为它做出明显的协议声明

<a name="collections_of_protocol_types"></a>
## 集合中的协议类型

协议类型可以被集合使用，表示集合中的元素均为协议类型:

```swift
let things: [TextRepresentable] = [game,d12,simonTheHamster]
```

如下所示，`things`数组可以被直接遍历，并调用其中元素的`asText()`函数:

```swift
for thing in things {
	println(thing.asText())
}
// A game of Snakes and Ladders with 25 squares
// A 12-sided dice
// A hamster named Simon
```

`thing`被当做是`TextRepresentable`类型而不是`Dice`，`DiceGame`，`Hamster`等类型。因此能且仅能调用`asText`方法

<a name="protocol_inheritance"></a>
## 协议的继承

协议能够继承一到多个其他协议。语法与类的继承相似，多个协议间用逗号`，`分隔

```swift
protocol InheritingProtocol: SomeProtocol, AnotherProtocol {
	// 协议定义
}
```

如下所示，`PrettyTextRepresentable`协议继承了`TextRepresentable`协议

```swift
protocol PrettyTextRepresentable: TextRepresentable {
	func asPrettyText() -> String
}
```

遵循`PrettyTextRepresentable`协议的同时，也需要遵循`TextRepresentable`协议。

如下所示，用`扩展`为`SnakesAndLadders`遵循`PrettyTextRepresentable`协议:

```swift
extension SnakesAndLadders: PrettyTextRepresentable {
    func asPrettyText() -> String {
        var output = asText() + ":\n"
        for index in 1...finalSquare {
            switch board[index] {
            	case let ladder where ladder > 0:
                output += "▲ "
            case let snake where snake < 0:
                output += "▼ "
            default:
                output += "○ "
            }
        }
        return output
    }
}
```

在`for in`中迭代出了`board`数组中的每一个元素:

* 当从数组中迭代出的元素的值大于0时，用`▲`表示
* 当从数组中迭代出的元素的值小于0时，用`▼`表示
* 当从数组中迭代出的元素的值等于0时，用`○`表示

任意`SankesAndLadders`的实例都可以使用`asPrettyText()`方法。

```swift
println(game.asPrettyText())
// A game of Snakes and Ladders with 25 squares:
// ○ ○ ▲ ○ ○ ▲ ○ ○ ▲ ▲ ○ ○ ○ ▼ ○ ○ ○ ○ ▼ ○ ○ ▼ ○ ▼ ○
```

<a name="class_only_protocol"></a>
## 类专属协议
你可以在协议的继承列表中,通过添加“class”关键字,限制协议只能适配到类（class）类型。（结构体或枚举不能遵循该协议）。该“class”关键字必须是第一个出现在协议的继承列表中，其后，才是其他继承协议。

```swift
protocol SomeClassOnlyProtocol: class, SomeInheritedProtocol {
    // class-only protocol definition goes here
}
```
在以上例子中，协议SomeClassOnlyProtocol只能被类（class）类型适配。如果尝试让结构体或枚举类型适配该协议，则会出现编译错误。

>注意
>
>当协议需求定义的行为，要求（或假设）它的遵循类型必须是引用语义而非值语义时，应该采用类专属协议。关于引用语义，值语义的更多内容，请查看<a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/ClassesAndStructures.html#//apple_ref/doc/uid/TP40014097-CH13-XID_145">结构体和枚举是值类型</a>和<a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/ClassesAndStructures.html#//apple_ref/doc/uid/TP40014097-CH13-XID_146">类是引用类型</a>



<a name="protocol_composition"></a>
## 协议合成

一个协议可由多个协议采用`protocol<SomeProtocol， AnotherProtocol>`这样的格式进行组合，称为`协议合成(protocol composition)`。

举个例子：

```swift
protocol Named {
    var name: String { get }
}
protocol Aged {
    var age: Int { get }
}
struct Person: Named, Aged {
    var name: String
    var age: Int
}
func wishHappyBirthday(celebrator: protocol<Named, Aged>) {
    println("Happy birthday \(celebrator.name) - you're \(celebrator.age)!")
}
let birthdayPerson = Person(name: "Malcolm", age: 21)
wishHappyBirthday(birthdayPerson)
// 输出 "Happy birthday Malcolm - you're 21!
```

`Named`协议包含`String`类型的`name`属性;`Aged`协议包含`Int`类型的`age`属性。`Person`结构体`遵循`了这两个协议。

`wishHappyBirthday`函数的形参`celebrator`的类型为`protocol<Named，Aged>`。可以传入任意`遵循`这两个协议的类型的实例

> 注意: `协议合成`并不会生成一个新协议类型，而是将多个协议合成为一个临时的协议，超出范围后立即失效。

<a name="checking_for_protocol_conformance"></a>
## 检验协议的一致性

使用`is`和`as`操作符来检查协议的一致性或转化协议类型。检查和转化的语法和之前相同(*详情查看[Typy Casting章节](5)*):

* `is`操作符用来检查实例是否`遵循`了某个`协议`。 
* `as?`返回一个可选值，当实例`遵循`协议时，返回该协议类型;否则返回`nil`
* `as`用以强制向下转型。  

```swift
@objc protocol HasArea {
    var area: Double { get }
}
```

> 注意: `@objc`用来表示协议是可选的，也可以用来表示暴露给`Objective-C`的代码，此外，`@objc`型协议只对`类`有效，因此只能在`类`中检查协议的一致性。详情查看*[Using Siwft with Cocoa and Objectivei-c](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/BuildingCocoaApps/index.html#//apple_ref/doc/uid/TP40014216)*。

如下所示，定义了`Circle`和`Country`类，它们都遵循了`HasArea`协议

```swift
class Circle: HasArea {
    let pi = 3.1415927
    var radius: Double
    var area: Double { return pi * radius * radius }
    init(radius: Double) { self.radius = radius }
}
class Country: HasArea {
    var area: Double
    init(area: Double) { self.area = area }
}
```

`Circle`类把`area`实现为基于`存储型属性`radius的`计算型属性`，`Country`类则把`area`实现为`存储型属性`。这两个类都`遵循`了`HasArea`协议。

如下所示，Animal是一个没有实现`HasArea`协议的类

```swift
class Animal {
	var legs: Int
	init(legs: Int) { self.legs = legs }
}
```

`Circle，Country，Animal`并没有一个相同的基类，因而采用`AnyObject`类型的数组来装载在他们的实例，如下所示:

```swift
let objects: [AnyObject] = [
	Circle(radius: 2.0),
	Country(area: 243_610),
	Animal(legs: 4)
]
```

`objects`数组使用字面量初始化，数组包含一个`radius`为2。0的`Circle`的实例，一个保存了英国面积的`Country`实例和一个`legs`为4的`Animal`实例。

如下所示，`objects`数组可以被迭代，对迭代出的每一个元素进行检查，看它是否遵循了`HasArea`协议:

```swift
for object in objects {
    if let objectWithArea = object as? HasArea {
        println("Area is \(objectWithArea.area)")
    } else {
        println("Something that doesn't have an area")
    }
}
// Area is 12.5663708
// Area is 243610.0
// Something that doesn't have an area
```

当迭代出的元素遵循`HasArea`协议时，通过`as?`操作符将其`可选绑定(optional binding)`到`objectWithArea`常量上。`objectWithArea`是`HasArea`协议类型的实例，因此`area`属性是可以被访问和打印的。

`objects`数组中元素的类型并不会因为`向下转型`而改变，它们仍然是`Circle`，`Country`，`Animal`类型。然而，当它们被赋值给`objectWithArea`常量时，则只被视为`HasArea`类型，因此只有`area`属性能够被访问。

<a name="optional_protocol_requirements"></a>
## 对可选协议的规定

可选协议含有可选成员，其`遵循者`可以选择是否实现这些成员。在协议中使用`@optional`关键字作为前缀来定义可选成员。

可选协议在调用时使用`可选链`，详细内容在[Optional Chaning](7)章节中查看。

像`someOptionalMethod?(someArgument)`这样，你可以在可选方法名称后加上`?`来检查该方法是否被实现。`可选方法`和`可选属性`都会返回一个`可选值(optional value)`，当其不可访问时，`?`之后语句不会执行，并整体返回`nil`

> 注意: 可选协议只能在含有`@objc`前缀的协议中生效。且`@objc`的协议只能被`类`遵循

如下所示，`Counter`类使用含有两个可选成员的`CounterDataSource`协议类型的外部数据源来提供`增量值(increment amount)`

```swift
@objc protocol CounterDataSource {
    optional func incrementForCount(count: Int) -> Int
    optional var fixedIncrement: Int { get }
}
```

`CounterDataSource`含有`incrementForCount`的`可选方法`和`fiexdIncrement`的`可选属性`，它们使用了不同的方法来从数据源中获取合适的增量值。

> 注意: `CounterDataSource`中的属性和方法都是可选的，因此可以在类中声明但不实现这些成员，尽管技术上允许这样做，不过最好不要这样写。

`Counter`类含有`CounterDataSource?`类型的可选属性`dataSource`，如下所示:

```swift
@objc class Counter {
    var count = 0
    var dataSource: CounterDataSource?
    func increment() {
        if let amount = dataSource?.incrementForCount?(count) {
            count += amount
        } else if let amount = dataSource?.fixedIncrement? {
            count += amount
        }
    }
}
```

`count`属性用于存储当前的值，`increment`方法用来为`count`赋值。

`increment`方法通过`可选链`，尝试从两种`可选成员`中获取`count`。
	
1. 由于`dataSource`可能为`nil`，因此在`dataSource`后边加上了`?`标记来表明只在`dataSource`非空时才去调用`incrementForCount`方法。

2. 即使`dataSource`存在，但是也无法保证其是否实现了`incrementForCount`方法，因此在`incrementForCount`方法后边也加有`?`标记

在调用`incrementForCount`方法后，`Int`型`可选值`通过`可选绑定(optional binding)`自动拆包并赋值给常量`amount`。

当`incrementForCount`不能被调用时，尝试使用可选属性`fixedIncrement`来代替。

`ThreeSource`实现了`CounterDataSource`协议，如下所示:

	class ThreeSource: CounterDataSource {
		let fixedIncrement = 3
	}

使用`ThreeSource`作为数据源开实例化一个`Counter`:

```swift
var counter = Counter()
counter.dataSource = ThreeSource()
for _ in 1...4 {
    counter.increment()
    println(counter.count)
}
// 3
// 6
// 9
// 12
```

`TowardsZeroSource`实现了`CounterDataSource`协议中的`incrementForCount`方法，如下所示:

```swift
class TowardsZeroSource: CounterDataSource {
func incrementForCount(count: Int) -> Int {
        if count == 0 {
            return 0
        } else if count < 0 {
            return 1
        } else {
            return -1
        }
    }
}
```

下边是执行的代码：

```swift
counter.count = -4
counter.dataSource = TowardsZeroSource()
for _ in 1...5 {
    counter.increment()
    println(counter.count)
}
// -3
// -2
// -1
// 0
// 0
```
