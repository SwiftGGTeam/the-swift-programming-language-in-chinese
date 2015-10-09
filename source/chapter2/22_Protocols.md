# 协议（Protocols）
-----------------

> 1.0
> 翻译：[geek5nan](https://github.com/geek5nan)
> 校对：[dabing1022](https://github.com/dabing1022)

> 2.0
> 翻译+校对：[futantan](https://github.com/futantan)，[小铁匠Linus](https://github.com/kevin833752)

本页包含内容：

- [协议的语法（Protocol Syntax）](#protocol_syntax)
- [对属性的规定（Property Requirements）](#property_requirements)
- [对方法的规定（Method Requirements）](#method_requirements)
- [对Mutating方法的规定（Mutating Method Requirements）](#mutating_method_requirements)
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
- [协议扩展（Protocol Extensions）](#protocol_extensions)


`协议`定义了一个蓝图，规定了用来实现某一特定工作或者功能所必需的方法和属性。类，结构体或枚举类型都可以遵循协议，并提供具体实现来完成协议定义的方法和功能。任意能够满足协议要求的类型被称为`遵循(conform)`这个协议。

<a name="protocol_syntax"></a>
## 协议的语法

协议的定义方式与类，结构体，枚举的定义非常相似。

```swift
protocol SomeProtocol {
	// 协议内容
}
```

要使类遵循某个协议，需要在类型名称后加上协议名称，中间以冒号`:`分隔，作为类型定义的一部分。遵循多个协议时，各协议之间用逗号`,`分隔。

```swift
struct SomeStructure: FirstProtocol, AnotherProtocol {
	// 结构体内容
}
```

如果类在遵循协议的同时拥有父类，应该将父类名放在协议名之前，以逗号分隔。

```swift
class SomeClass: SomeSuperClass, FirstProtocol, AnotherProtocol {
	// 类的内容
}
```

<a name="property_requirements"></a>
## 对属性的规定

协议可以规定其`遵循者`提供特定名称和类型的`实例属性(instance property)`或`类属性(type property)`，而不指定是`存储型属性(stored property)`还是`计算型属性(calculate property)`。此外还必须指明是只读的还是可读可写的。

如果协议规定属性是可读可写的，那么这个属性不能是常量或只读的计算属性。如果协议只要求属性是只读的(gettable)，那个属性不仅可以是只读的，如果你代码需要的话，也可以是可写的。

协议中的通常用var来声明属性，在类型声明后加上`{ set get }`来表示属性是可读可写的，只读属性则用`{ get }`来表示。

```swift
protocol SomeProtocol {
	var mustBeSettable : Int { get set }
	var doesNotNeedToBeSettable: Int { get }
}
```

在协议中定义类属性(type property)时，总是使用`static`关键字作为前缀。当协议的遵循者是类时，可以使用`class`或`static`关键字来声明类属性，但是在协议的定义中，仍然要使用`static`关键字。

```swift
protocol AnotherProtocol {
	static var someTypeProperty: Int { get set }
}
```

如下所示，这是一个含有一个实例属性要求的协议。

```swift
protocol FullyNamed {
	var fullName: String { get }
}
```

`FullyNamed`协议除了要求协议的遵循者提供fullName属性外，对协议对遵循者的类型并没有特别的要求。这个协议表示，任何遵循`FullyNamed`协议的类型，都具有一个可读的`String`类型实例属性`fullName`。

下面是一个遵循`FullyNamed`协议的简单结构体。

```swift
struct Person: FullyNamed{
	var fullName: String
}
let john = Person(fullName: "John Appleseed")
//john.fullName 为 "John Appleseed"
```

这个例子中定义了一个叫做`Person`的结构体，用来表示具有名字的人。从第一行代码中可以看出，它遵循了`FullyNamed`协议。

`Person`结构体的每一个实例都有一个叫做`fullName`，`String`类型的存储型属性。这正好满足了`FullyNamed`协议的要求，也就意味着，`Person`结构体完整的`遵循`了协议。(如果协议要求未被完全满足,在编译时会报错)

下面是一个更为复杂的类，它采用并遵循了`FullyNamed`协议:

```swift
class Starship: FullyNamed {
    var prefix: String?
    var name: String
    init(name: String, prefix: String? = nil) {
        self.name = name
        self.prefix = prefix
    }
    var fullName: String {
        return (prefix != nil ? prefix! + " " : "") + name
    }
}
var ncc1701 = Starship(name: "Enterprise", prefix: "USS")
// ncc1701.fullName is "USS Enterprise"
```

Starship类把`fullName`属性实现为只读的计算型属性。每一个`Starship`类的实例都有一个名为`name`的属性和一个名为`prefix`的可选属性。 当`prefix`存在时，将`prefix`插入到`name`之前来为Starship构建`fullName`，`prefix`不存在时，则将直接用`name`构建`fullName`。

<a name="method_requirements"></a>
## 对方法的规定

协议可以要求其遵循者实现某些指定的实例方法或类方法。这些方法作为协议的一部分，像普通的方法一样放在协议的定义中，但是不需要大括号和方法体。可以在协议中定义具有可变参数的方法，和普通方法的定义方式相同。但是在协议的方法定义中，不支持参数默认值。

正如对属性的规定中所说的，在协议中定义类方法的时候，总是使用`static`关键字作为前缀。当协议的遵循者是类的时候，虽然你可以在类的实现中使用`class`或者`static`来实现类方法，但是在协议中声明类方法，仍然要使用`static`关键字。

```swift
protocol SomeProtocol {
	static func someTypeMethod()
}
```

下面的例子定义了含有一个实例方法的协议。

```swift
protocol RandomNumberGenerator {
	func random() -> Double
}
```

`RandomNumberGenerator`协议要求其遵循者必须拥有一个名为`random`， 返回值类型为`Double`的实例方法。尽管这里并未指明，但是我们假设返回值在[0，1)区间内。

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
print("Here's a random number: \(generator.random())")
// 输出 : "Here's a random number: 0.37464991998171"
print("And another one: \(generator.random())")
// 输出 : "And another one: 0.729023776863283"
```

<a name="mutating_method_requirements"></a>
## 对Mutating方法的规定

有时需要在方法中改变它的实例。例如，值类型(结构体，枚举)的实例方法中，将`mutating`关键字作为函数的前缀，写在`func`之前，表示可以在该方法中修改它所属的实例及其实例属性的值。这一过程在[在实例方法中修改值类型](./11_Methods.html#modifying_value_types_from_within_instance_methods)章节中有详细描述。

如果你在协议中定义了一个方法旨在改变遵循该协议的实例，那么在协议定义时需要在方法前加`mutating`关键字。这使得结构和枚举遵循协议并满足此方法要求。


>注意:  
>用类实现协议中的`mutating`方法时，不用写`mutating`关键字;用结构体，枚举实现协议中的`mutating`方法时，必须写`mutating`关键字。

如下所示，`Togglable`协议含有名为`toggle`的实例方法。根据名称推测，`toggle()`方法将通过改变实例属性，来切换遵循该协议的实例的状态。

`toggle()`方法在定义的时候，使用`mutating`关键字标记，这表明当它被调用时该方法将会改变协议遵循者实例的状态。

```swift
protocol Togglable {
	mutating func toggle()
}
```

当使用`枚举`或`结构体`来实现`Togglable`协议时，需要提供一个带有`mutating`前缀的`toggle`方法。

下面定义了一个名为`OnOffSwitch`的枚举类型。这个枚举类型在两种状态之间进行切换，用枚举成员`On`和`Off`表示。枚举类型的`toggle`方法被标记为`mutating`以满足`Togglable`协议的要求。

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

协议可以要求它的遵循者实现指定的构造器。你可以像书写普通的构造器那样，在协议的定义里写下构造器的声明，但不需要写花括号和构造器的实体：

```swift
protocol SomeProtocol {
    init(someParameter: Int)
}
```

### 协议构造器规定在类中的实现

你可以在遵循该协议的类中实现构造器，并指定其为类的指定构造器(designated initializer)或者便利构造器(convenience initializer)。在这两种情况下，你都必须给构造器实现标上"required"修饰符：

```swift
class SomeClass: SomeProtocol {
    required init(someParameter: Int) {
        //构造器实现
    }
}
```

使用`required`修饰符可以保证：所有的遵循该协议的子类，同样能为构造器规定提供一个显式的实现或继承实现。

关于`required`构造器的更多内容，请参考[必要构造器](./14_Initialization.html#required_initializers)。

>注意  
>如果类已经被标记为`final`，那么不需要在协议构造器的实现中使用`required`修饰符。因为final类不能有子类。关于`final`修饰符的更多内容，请参见[防止重写](./13_Inheritance.html#preventing_overrides)。

如果一个子类重写了父类的指定构造器，并且该构造器遵循了某个协议的规定，那么该构造器的实现需要被同时标示`required`和`override`修饰符

```swift
protocol SomeProtocol {
    init()
}


class SomeSuperClass {
    init() {
        // 构造器的实现
    }
}


class SomeSubClass: SomeSuperClass, SomeProtocol {
    // 因为遵循协议，需要加上"required"; 因为继承自父类，需要加上"override"
    required override init() {
        // 构造器实现
    }
}
```

### 可失败构造器的规定

可以通过给协议`Protocols`中添加[可失败构造器](./14_Initialization.html#failable_initializers)来使遵循该协议的类型必须实现该可失败构造器。

如果在协议中定义一个可失败构造器，则在遵顼该协议的类型中必须添加同名同参数的可失败构造器或非可失败构造器。如果在协议中定义一个非可失败构造器，则在遵循该协议的类型中必须添加同名同参数的非可失败构造器或隐式解析类型的可失败构造器（`init!`）。


<a name="protocols_as_types"></a>
## 协议类型

尽管协议本身并不实现任何功能，但是协议可以被当做类型来使用。

协议可以像其他普通类型一样使用，使用场景:

* 作为函数、方法或构造器中的参数类型或返回值类型
* 作为常量、变量或属性的类型
* 作为数组、字典或其他容器中的元素类型

> 注意  
> 协议是一种类型，因此协议类型的名称应与其他类型(Int，Double，String)的写法相同，使用大写字母开头的驼峰式写法，例如(`FullyNamed`和`RandomNumberGenerator`)

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

例子中定义了一个`Dice`类，用来代表桌游中的拥有N个面的骰子。`Dice`的实例含有`sides`和`generator`两个属性，前者是整型，用来表示骰子有几个面，后者为骰子提供一个随机数生成器。

 `generator`属性的类型为`RandomNumberGenerator`，因此任何遵循了`RandomNumberGenerator`协议的类型的实例都可以赋值给`generator`，除此之外，无其他要求。

`Dice`类中也有一个构造器(initializer)，用来进行初始化操作。构造器中含有一个名为`generator`，类型为`RandomNumberGenerator`的形参。在调用构造方法时创建`Dice`的实例时，可以传入任何遵循`RandomNumberGenerator`协议的实例给generator。

`Dice`类也提供了一个名为`roll`的实例方法用来模拟骰子的面值。它先使用`generator`的`random()`方法来创建一个[0,1)区间内的随机数，然后使用这个随机数生成正确的骰子面值。因为generator遵循了`RandomNumberGenerator`协议，因而保证了`random`方法可以被调用。

下面的例子展示了如何使用`LinearCongruentialGenerator`的实例作为随机数生成器创建一个六面骰子:

```swift
var d6 = Dice(sides: 6, generator: LinearCongruentialGenerator())
for _ in 1...5 {
	print("Random dice roll is \(d6.roll())")
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

委托是一种设计模式，它允许`类`或`结构体`将一些需要它们负责的功能`交由(委托)`给其他的类型的实例。委托模式的实现很简单: 定义协议来封装那些需要被委托的函数和方法， 使其`遵循者`拥有这些被委托的`函数和方法`。委托模式可以用来响应特定的动作或接收外部数据源提供的数据，而无需要知道外部数据源的类型信息。

下面的例子是两个基于骰子游戏的协议:

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

`DiceGame`协议可以在任意含有骰子的游戏中实现。`DiceGameDelegate`协议可以用来追踪`DiceGame`的游戏过程

如下所示，`SnakesAndLadders`是`Snakes and Ladders`([Control Flow](./05_Control_Flow.html)章节有该游戏的详细介绍)游戏的新版本。新版本使用`Dice`作为骰子，并且实现了`DiceGame`和`DiceGameDelegate`协议，后者用来记录游戏的过程:

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

这个版本的游戏封装到了`SnakesAndLadders`类中，该类遵循了`DiceGame`协议，并且提供了相应的可读的`dice`属性和`play`实例方法。(`dice`属性在构造之后就不再改变，且协议只要求`dice`为只读的，因此将`dice`声明为常量属性。)

游戏使用`SnakesAndLadders`类的`构造器(initializer)`初始化游戏。所有的游戏逻辑被转移到了协议中的`play`方法，`play`方法使用协议规定的`dice`属性提供骰子摇出的值。

注意:`delegate`并不是游戏的必备条件，因此`delegate`被定义为遵循`DiceGameDelegate`协议的可选属性。因为`delegate`是可选值，因此在初始化的时候被自动赋值为`nil`。随后，可以在游戏中为`delegate`设置适当的值。

`DicegameDelegate`协议提供了三个方法用来追踪游戏过程。被放置于游戏的逻辑中，即`play()`方法内。分别在游戏开始时，新一轮开始时，游戏结束时被调用。

因为`delegate`是一个遵循`DiceGameDelegate`的可选属性，因此在`play()`方法中使用了`可选链`来调用委托方法。 若`delegate`属性为`nil`， 则delegate所调用的方法失效，并不会产生错误。若`delegate`不为`nil`，则方法能够被调用

如下所示，`DiceGameTracker`遵循了`DiceGameDelegate`协议

```swift
class DiceGameTracker: DiceGameDelegate {
    var numberOfTurns = 0
    func gameDidStart(game: DiceGame) {
        numberOfTurns = 0
        if game is SnakesAndLadders {
            print("Started a new game of Snakes and Ladders")
        }
        print("The game is using a \(game.dice.sides)-sided dice")
    }
    func game(game: DiceGame, didStartNewTurnWithDiceRoll diceRoll: Int) {
        ++numberOfTurns
        print("Rolled a \(diceRoll)")
    }
    func gameDidEnd(game: DiceGame) {
        print("The game lasted for \(numberOfTurns) turns")
    }
}
```

`DiceGameTracker`实现了`DiceGameDelegate`协议规定的三个方法，用来记录游戏已经进行的轮数。 当游戏开始时，`numberOfTurns`属性被赋值为0; 在每新一轮中递增; 游戏结束后，输出打印游戏的总轮数。

`gameDidStart`方法从`game`参数获取游戏信息并输出。`game`在方法中被当做`DiceGame`类型而不是`SnakeAndLadders`类型，所以方法中只能访问`DiceGame`协议中的成员。当然了，这些方法也可以在类型转换之后调用。在上例代码中，通过`is`操作符检查`game`是否为 `SnakesAndLadders`类型的实例，如果是，则打印出相应的内容。

无论当前进行的是何种游戏，`game`都遵循`DiceGame`协议以确保`game`含有`dice`属性，因此在`gameDidStart(_:)`方法中可以通过传入的`game`参数来访问`dice`属性，进而打印出`dice`的`sides`属性的值。

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

即便无法修改源代码，依然可以通过扩展(Extension)来扩充已存在类型(*译者注: 类，结构体，枚举等*)。扩展可以为已存在的类型添加属性，方法，下标脚本，协议等成员。详情请在[扩展](./21_Extensions.html)章节中查看。

> 注意  
> 通过扩展为已存在的类型遵循协议时，该类型的所有实例也会随之添加协议中的方法

例如`TextRepresentable`协议，任何想要表示一些文本内容的类型都可以遵循该协议。这些想要表示的内容可以是类型本身的描述，也可以是当前内容的版本:

```swift
protocol TextRepresentable {
	func asText() -> String
}
```

可以通过扩展，为上一节中提到的`Dice`增加类遵循`TextRepresentable`协议的功能

```swift
extension Dice: TextRepresentable {
	func asText() -> String {
		return "A \(sides)-sided dice"
	}
}
```
现在，通过扩展使得`Dice`类型遵循了一个新的协议，这和`Dice`类型在定义的时候声明为遵循`TextRepresentable`协议的效果相同。在扩展的时候，协议名称写在类型名之后，以冒号隔开，在大括号内写明新添加的协议内容。

现在所有`Dice`的实例都遵循了`TextRepresentable`协议:

```swift
let d12 = Dice(sides: 12,generator: LinearCongruentialGenerator())
print(d12.asText())
// 输出 "A 12-sided dice"
```

同样`SnakesAndLadders`类也可以通过`扩展`的方式来遵循`TextRepresentable`协议：

```swift
extension SnakesAndLadders: TextRepresentable {
	func asText() -> String {
		return "A game of Snakes and Ladders with \(finalSquare) squares"
	}
}
print(game.asText())
// 输出 "A game of Snakes and Ladders with 25 squares"
```

<a name="declaring_protocol_adoption_with_an_extension"></a>
## 通过扩展补充协议声明

当一个类型已经实现了协议中的所有要求，却没有声明为遵循该协议时，可以通过扩展(空的扩展体)来补充协议声明:

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
print(somethingTextRepresentable.asText())
// 输出 "A hamster named Simon"
```

> 注意  
> 即使满足了协议的所有要求，类型也不会自动转变，因此你必须为它做出显式的协议声明

<a name="collections_of_protocol_types"></a>
## 集合中的协议类型

协议类型可以在集合使用，表示集合中的元素均为协议类型，下面的例子创建了一个类型为`TextRepresentable`的数组:

```swift
let things: [TextRepresentable] = [game,d12,simonTheHamster]
```

如下所示，`things`数组可以被直接遍历，并打印每个元素的文本表示:

```swift
for thing in things {
	print(thing.asText())
}
// A game of Snakes and Ladders with 25 squares
// A 12-sided dice
// A hamster named Simon
```

`thing`被当做是`TextRepresentable`类型而不是`Dice`，`DiceGame`，`Hamster`等类型。因此能且仅能调用`asText`方法

<a name="protocol_inheritance"></a>
## 协议的继承

协议能够继承一个或多个其他协议，可以在继承的协议基础上增加新的内容要求。协议的继承语法与类的继承相似，多个被继承的协议间用逗号分隔:

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

例子中定义了一个新的协议`PrettyTextRepresentable`，它继承自`TextRepresentable`协议。任何遵循`PrettyTextRepresentable`协议的类型在满足该协议的要求时，也必须满足`TextRepresentable`协议的要求。在这个例子中，`PrettyTextRepresentable`协议要求其遵循者提供一个返回值为`String`类型的`asPrettyText`方法。

如下所示，扩展`SnakesAndLadders`，让其遵循`PrettyTextRepresentable`协议:

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

上述扩展使得`SnakesAndLadders`遵循了`PrettyTextRepresentable`协议，并为每个`SnakesAndLadders`类型提供了了协议要求的`asPrettyText()`方法。每个`PrettyTextRepresentable`类型同时也是`TextRepresentable`类型，所以在`asPrettyText`的实现中，可以调用`asText()`方法。之后在每一行加上换行符，作为输出的开始。然后遍历数组中的元素，输出一个几何图形来表示遍历的结果:

* 当从数组中取出的元素的值大于0时，用`▲`表示
* 当从数组中取出的元素的值小于0时，用`▼`表示
* 当从数组中取出的元素的值等于0时，用`○`表示

任意`SankesAndLadders`的实例都可以使用`asPrettyText()`方法。

```swift
print(game.asPrettyText())
// A game of Snakes and Ladders with 25 squares:
// ○ ○ ▲ ○ ○ ▲ ○ ○ ▲ ▲ ○ ○ ○ ▼ ○ ○ ○ ○ ▼ ○ ○ ▼ ○ ▼ ○
```

<a name="class_only_protocol"></a>
## 类专属协议
你可以在协议的继承列表中,通过添加`class`关键字,限制协议只能适配到类（class）类型。（结构体或枚举不能遵循该协议）。该`class`关键字必须是第一个出现在协议的继承列表中，其后，才是其他继承协议。

```swift
protocol SomeClassOnlyProtocol: class, SomeInheritedProtocol {
    // class-only protocol definition goes here
}
```

在以上例子中，协议`SomeClassOnlyProtocol`只能被类（class）类型适配。如果尝试让结构体或枚举类型适配该协议，则会出现编译错误。

<!--TODO 链接-->

>注意  
>当协议想要定义的行为，要求（或假设）它的遵循类型必须是引用语义而非值语义时，应该采用类专属协议。关于引用语义，值语义的更多内容，请查看[结构体和枚举是值类型](./09_Classes_and_Structures.html#structures_and_enumerations_are_value_types)和[类是引用类型](./09_Classes_and_Structures.html#classes_are_reference_types)。


<a name="protocol_composition"></a>
## 协议合成

有时候需要同时遵循多个协议。你可以将多个协议采用`protocol<SomeProtocol， AnotherProtocol>`这样的格式进行组合，称为`协议合成(protocol composition)`。你可以在`<>`中罗列任意多个你想要遵循的协议，以逗号分隔。

下面的例子中，将`Named`和`Aged`两个协议按照上述的语法组合成一个协议:

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
    print("Happy birthday \(celebrator.name) - you're \(celebrator.age)!")
}
let birthdayPerson = Person(name: "Malcolm", age: 21)
wishHappyBirthday(birthdayPerson)
// 输出 "Happy birthday Malcolm - you're 21!
```

`Named`协议包含`String`类型的`name`属性;`Aged`协议包含`Int`类型的`age`属性。`Person`结构体`遵循`了这两个协议。

`wishHappyBirthday`函数的形参`celebrator`的类型为`protocol<Named，Aged>`。可以传入任意`遵循`这两个协议的类型的实例。

上面的例子创建了一个名为`birthdayPerson`的`Person`实例，作为参数传递给了`wishHappyBirthday(_:)`函数。因为`Person`同时遵循这两个协议，所以这个参数合法，函数将输出生日问候语。

> 注意  
> `协议合成`并不会生成一个新协议类型，而是将多个协议合成为一个临时的协议，超出范围后立即失效。

<a name="checking_for_protocol_conformance"></a>
## 检验协议的一致性

<!--TODO 链接-->
你可以使用`is`和`as`操作符来检查是否遵循某一协议或强制转化为某一类型。检查和转化的语法和之前相同(*详情查看[类型转换](./20_Type_Casting.html)*):

* `is`操作符用来检查实例是否`遵循`了某个`协议`
* `as?`返回一个可选值，当实例`遵循`协议时，返回该协议类型;否则返回`nil`
* `as`用以强制向下转型，如果强转失败，会引起运行时错误。

下面的例子定义了一个`HasArea`的协议，要求有一个`Double`类型可读的`area`:

```swift
protocol HasArea {
    var area: Double { get }
}
```

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

`Circle`，`Country`，`Animal`并没有一个相同的基类，然而，它们都是类，它们的实例都可以作为`AnyObject`类型的变量，存储在同一个数组中:

```swift
let objects: [AnyObject] = [
	Circle(radius: 2.0),
	Country(area: 243_610),
	Animal(legs: 4)
]
```

`objects`数组使用字面量初始化，数组包含一个`radius`为2的`Circle`的实例，一个保存了英国面积的`Country`实例和一个`legs`为4的`Animal`实例。

如下所示，`objects`数组可以被迭代，对迭代出的每一个元素进行检查，看它是否遵循了`HasArea`协议:

```swift
for object in objects {
    if let objectWithArea = object as? HasArea {
        print("Area is \(objectWithArea.area)")
    } else {
        print("Something that doesn't have an area")
    }
}
// Area is 12.5663708
// Area is 243610.0
// Something that doesn't have an area
```

当迭代出的元素遵循`HasArea`协议时，通过`as?`操作符将其`可选绑定(optional binding)`到`objectWithArea`常量上。`objectWithArea`是`HasArea`协议类型的实例，因此`area`属性是可以被访问和打印的。

`objects`数组中元素的类型并不会因为强转而丢失类型信息，它们仍然是`Circle`，`Country`，`Animal`类型。然而，当它们被赋值给`objectWithArea`常量时，则只被视为`HasArea`类型，因此只有`area`属性能够被访问。

<a name="optional_protocol_requirements"></a>
## 对可选协议的规定

协议可以含有可选成员，其`遵循者`可以选择是否实现这些成员。在协议中使用`optional`关键字作为前缀来定义可选成员。

<!--TODO 链接-->
可选协议在调用时使用`可选链`，因为协议的遵循者可能没有实现可选内容，详细内容在[可空链式调用](./17_Optional_Chaining.html)章节中查看。

像`someOptionalMethod?(someArgument)`这样，你可以在可选方法名称后加上`?`来检查该方法是否被实现。可选方法和可选属性都会返回一个`可选值(optional value)`，当其不可访问时，`?`之后语句不会执行，并整体返回`nil`

> 注意  
> 可选协议只能在含有`@objc`前缀的协议中生效。且`@objc`的协议只能被`类`遵循  
> 这个前缀表示协议将暴露给Objective-C代码，详情参见`Using Swift with Cocoa and Objective-C`。即使你不打算和Objective-C有什么交互，如果你想要指明协议包含可选属性，那么还是要加上`@obj`前缀

下面的例子定义了一个叫`Counter`的整数加法类，它使用外部的数据源来实现每次的增量。数据源是两个可选属性，在`CounterDataSource`协议中定义:

```swift
@objc protocol CounterDataSource {
    optional func incrementForCount(count: Int) -> Int
    optional var fixedIncrement: Int { get }
}
```

`CounterDataSource`含有`incrementForCount`可选方法和`fiexdIncrement`可选属性，它们使用了不同的方法来从数据源中获取合适的增量值。

> 注意  
> `CounterDataSource`中的属性和方法都是可选的，因此可以在类中声明都不实现这些成员，尽管技术上允许这样做，不过最好不要这样写。

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

类`Counter`使用`count`来存储当前的值。该类同时定义了一个`increment`方法，每次调用该方法的时候，将会增加`count`的值。

`increment()`方法首先试图使用`incrementForCount(_:)`方法来得到每次的增量。`increment()`方法使用可选链来尝试调用`incrementForCount(_:)`，并将当前的`count`值作为参数传入。

这里使用了两种可选链方法。由于`dataSource`可能为`nil`，因此在`dataSource`后边加上了`?`标记来表明只在`dataSource`非空时才去调用`incrementForCount`方法。即使`dataSource`存在，但是也无法保证其是否实现了`incrementForCount`方法，因此在`incrementForCount`方法后边也加有`?`标记。

调用`incrementForCount`方法在上述两种情形都有可能失败，所以返回值为*可选*`Int`类型。虽然在`CounterDataSource`中，`incrementForCount`被定义为一个非可选`Int`(non-optional)，但是这里我们仍然需要返回*可选*`Int`类型。

在调用`incrementForCount`方法后，`Int`型`可选值`通过`可选绑定(optional binding)`自动拆包并赋值给常量`amount`。如果可选值确实包含一个数值，这表示`delegate`和方法都存在，之后便将`amount`加到`count`上，增加操作完成。

如果没有从`incrementForCount(_:)`获取到值，可能是`dataSource`为nil，或者它并没有实现`incrementForCount`方法——那么`increment()`方法将试图从数据源的`fixedIncrement`属性中获取增量。`fixedIncrement`也是一个可选型，所以在属性名的后面添加`?`来试图取回可选属性的值。和之前一样，返回值为可选型。

`ThreeSource`实现了`CounterDataSource`协议，它实现来可选属性`fixedIncrement`，每次返回值`3`:

```swift
@objc class ThreeSource: CounterDataSource {
	let fixedIncrement = 3
}
```

可以使用`ThreeSource`的实例作为`Counter`实例的数据源:

```swift
var counter = Counter()
counter.dataSource = ThreeSource()
for _ in 1...4 {
    counter.increment()
    print(counter.count)
}
// 3
// 6
// 9
// 12
```

上述代码新建了一个`Counter`实例；将它的数据源设置为`TreeSource`实例；调用`increment()`4次。和你预想的一样，每次在调用的时候，`count`的值增加3.

下面是一个更为复杂的数据源`TowardsZeroSource`，它将使得最后的值变为0:

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

`TowardsZeroSource`实现了`CounterDataSource`协议中的`incrementForCount(_:)`方法，以`count`参数为依据，计算出每次的增量。如果`count`已经为0，方法返回0，这表示之后不会再有增量。

你可以配合使用`TowardsZeroSource`实例和`Counter`实例来从`-4`增加到`0`.一旦增加到`0`，数值便不会再有变动。

在下面的例子中，将从`-4`增加到`0`。一旦结果为`0`，便不在增加:

```swift
counter.count = -4
counter.dataSource = TowardsZeroSource()
for _ in 1...5 {
    counter.increment()
    print(counter.count)
}
// -3
// -2
// -1
// 0
// 0
```

<a name="protocol_extensions"></a>
## 协议扩展

使用扩展协议的方式可以为遵循者提供方法或属性的实现。通过这种方式，可以让你无需在每个遵循者中都实现一次，无需使用全局函数，你可以通过扩展协议的方式进行定义。

例如，可以扩展`RandomNumberGenerator`协议，让其提供`randomBool()`方法。该方法使用`random()`方法返回一个随机的`Bool`值:

```swift
extension RandomNumberGenerator {
    func randomBool() -> Bool {
        return random() > 0.5
    }
}
```

通过扩展协议，所有协议的遵循者，在不用任何修改的情况下，都自动得到了这个扩展所增加的方法。

```swift
let generator = LinearCongruentialGenerator()
print("Here's a random number: \(generator.random())")
// 输出 "Here's a random number: 0.37464991998171"
print("And here's a random Boolean: \(generator.randomBool())")
// 输出 "And here's a random Boolean: true"
```

### 提供默认实现

可以通过协议扩展的方式来为协议规定的属性和方法提供默认的实现。如果协议的遵循者对规定的属性和方法提供了自己的实现，那么遵循者提供的实现将被使用。

> 注意  
> 通过扩展协议提供的协议实现和可选协议规定有区别。虽然协议遵循者无需自己实现，通过扩展提供的默认实现，可以不是用可选链调用。

例如，`PrettyTextRepresentable`协议，继承自`TextRepresentable`协议，可以为其提供一个默认的`prettyTextualDescription`属性，来简化访问`textualDescription`属性。

```swift
extension PrettyTextRepresentable  {
    var prettyTextualDescription: String {
        return textualDescription
    }
}
```

### 为协议扩展添加限制条件

在扩展协议的时候，可以指定一些限制，只有满足这些限制的协议遵循者，才能获得协议扩展提供的属性和方法。这些限制写在协议名之后，使用`where`关键字来描述限制情况。([Where语句](./23_Generics.html#where_clauses))。:

例如，你可以扩展`CollectionType`协议，但是只适用于元素遵循`TextRepresentable`的情况:

```swift
extension CollectionType where Generator.Element : TextRepresentable {
    var textualDescription: String {
        let itemsAsText = self.map { $0.textualDescription }
        return "[" + itemsAsText.joinWithSeparator(", ") + "]"
    }
}
```

`textualDescription`属性将每个元素的文本描述以逗号分隔的方式连接起来。

现在我们来看`Hamster`，它遵循`TextRepresentable`协议:

```swift
let murrayTheHamster = Hamster(name: "Murray")
let morganTheHamster = Hamster(name: "Morgan")
let mauriceTheHamster = Hamster(name: "Maurice")
let hamsters = [murrayTheHamster, morganTheHamster, mauriceTheHamster]
```

因为`Array`遵循`CollectionType`协议，数组的元素又遵循`TextRepresentable`协议，所以数组可以使用`textualDescription`属性得到数组内容的文本表示:

```swift
print(hamsters.textualDescription)
// 输出 "(A hamster named Murray, A hamster named Morgan, A hamster named Maurice)"
```

> 注意  
> 如果有多个协议扩展，而一个协议的遵循者又同时满足它们的限制，那么将会使用所满足限制最多的那个扩展。
