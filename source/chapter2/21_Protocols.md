# 协议

`Protocol(协议)` 定义了用于完成某项任务或功能的 `方法,属性等` ,它不具备任何功能的细节实现,只用来**统一**`方法,属性等` 的名称和其类型.(*译者注: 其他语言中也把 `Portocol` 称为 `Interface(接口)`* ).协议可以被 `类,枚举,结构体` 采纳并实现,任意满足了协议要求的`类,枚举,结构体`被称之为 `协议遵循者`.  
协议可以要求 `协议遵循者` 必须拥有的某些指定的 `属性,方法,操作符,下标` .

## 协议的语法

`协议` 的定义和 `类,结构体,枚举` 的定义非常相似:

	protocol SomeProtocol {
		// 此处书写协议的内容
	}
	

自定义类型在 类型名称 后加上 协议名称 ,并用冒号(`:`)分隔,从而采纳协议.实现多个协议时,用逗号(`,`)分隔.

	struct SomeStructure: FirstProtocol, AnotherProtocol{
		// 此处书写结构体的定义
	}
	
当某个类实现了协议,并含有父类时,应把父类名放在所有的协议名称之前

	class SomeClass: SomeSuperClass, FirstProtocol, AnotherProtocol{
		// 此处书写类的定义
	}
	
## 属性要求

`协议`能够要求其`遵循者`必须拥有 **特定名称和类型** 的`实例属性(instance property)` 或 `类属性 (type property)`,也可以指定协议中的属性的`settable` 和 `gettable` ,但它并不要求`属性`是 `存储型属性(stored property)` 还是 `计算型属性(calculate property)`.  
当协议要求其中的`某个属性`为 `gettable` 时,即使实现了它的 `getter` 也不会出错. (*译者注:此小节术语较多,可参阅属性章节*)  
属性通常被声明为变量,通过前置 `var` 关键字. 在属性声明后写上 `{ get set }` 指定属性为可读写的. `{ get }` 用来描述属性为可读的.

	protocol SomeProtocol {
		var musBeSettable : Int { get set }
		var doesNotNeedToBeSettable: Int { get }
	}
	
当协议被类实现时,使用 `class` 关键字来说明该属性为类成员 ; 当协议被结构体或枚举实现时,则使用 `static` 关键字

	protocol AnotherProtocol {
		class var someTypeProperty: Int { get set }
	}
	
下边的协议包含了一个实例属性

	protocol FullyNamed {
		var fullName: string { get }
	}	
	
`FullyNamed` 定义了一个拥有 `fullName` 属性的协议. 该协议要求其 `遵循者` 必须拥有一个名为 `fullName`, 类型为 `String` 的可读属性.  
下边有一个`遵循`了 `FullyNamed` 的简单结构体

	struct Person: FullyNamed{
		var fullName: String
	}
	let john = Person(fullName: "John Appleseed")
	//john.fullName 为 "John Appleseed"
	
定义一个名为 `Person` 并实现了 `FullyNamed` 协议的结构体. 每一个 `Person` 实例都拥有一个 `String` 类型,名为 `fullName` 的 `存储型属性`,它满足了`FullyNamed`协议的唯一要求,也意味着 `Person` 完整的遵循了该协议.(如果协议未被完整遵循,Swift编译时会报出错误).  


下边是一个更为复杂的类,该类也实现并遵循了`FullyNamed`协议:
	
	class Starship: FullyNamed {
		var prefix: String?
		var name: String
		init(name: String, prefix: Stirng? = nil ) {
			self.anme = name
			self.prefix = prefix
		}
		var fullName: String {
		return (prefix ? prefix ! + " " : " ") + name
		}
	}
	var ncc1701 = Starship(name: "Enterprise", prefix: "USS")
	// ncc1701.fullName == "USS Enterprise"
	
该类将 `fullName` 实现为`计算型只读属性`. `Starship` 类的每一个实例都有一个名为 `name` 的必备属性和一个名为 `prefix` 的可选属性. 当 `prefix` 存在时,将 `prefix` 插入到 `name` 之前来为 `statship` 构建 `fullName`

## 方法要求
`协议` 可以要求其 `遵循者` 必备某些`实例方法`和`类方法`. 这些方法作为`协议`的一部分,除了不需要方法体外,像普通的方法一样写在协议体中.此外,协议中的方法支持可变参数.  

> 笔记: 协议中的`方法`的语法同普通`方法`一样,但是不支持`默认参数`.  

在协议中定义`类方法`与`类属性`一样,只需在方法前加上 `class` 关键字; 当协议用于被`枚举`或`结构体`遵循时,`类方法`的关键字需要换为`static`:

	protocol SomeProtocol {
		class func someTypeMethod()
	}
	
下边是拥有一个实例方法的协议的例子

	protocol RandomNumberGenerator {
		func random() -> Double
	}
	
`RandomNumberGenerator` 协议要求其`遵循者`必须拥有一个名为`random`, 返回值类型为`Double` 的示例方法. (尽管协议中并未明确指定,在这假设随机数在 [0,1] 之间). 该协议只为生成随机数提供了一个统一的函数名称,而不去做具体的实现工作.  

这里有一个名为 `LinearCongruentialGenerator` 并且 `遵循`了 `RandomNumberGenerator 协议` 的类. 该类实现了名为 *linear congruential generator* 的假随机数算法

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
	
## 突变方法要求
有时不得不在方法中改变实例的所属的类型.在基于`Value Type`的实例方法( *译者注:指结构体和枚举中的方法*)的 `func` 前加上 `mutating` 关键字 来表明该方法允许改变该实例和属性的所属类型. 这一过程在 [Modifyting Value Types from Within Instance Methods][1] 一节中有详细描述.  

如果你打算在协议中定义一个能够改变实例所属类型的实例方法,只需要在方法前加上 `mutating` 关键字.使得结构体和枚举遵循该协议.(*译者注:类中的变量为 Reference Type ; 结构体和枚举中的变量都为 Value Type, 因此有时需要更改它们的所属类型*)

> 若把协议的实例方法标记为`mutating`,`mutating` 关键字只对结构体和枚举中的实例方法有效;当使用类遵循该协议时,不需要为这个实例方法前加 `mutating` 关键字.

下边的这个例子定义了一个名为 `Togglable`,含有一个 `toggle` 方法的协议.通过名字猜测,`toggle` 方法应该是用来 切换或恢复 某个状态使用的.`toggle` 方法前含有 `mutating` 关键字,用以标识其可以更改`协议遵循者`的实例所属类型

	protocol Togglable {
		mutating func toggle()
	}
	
如果你使用枚举或结构体来实现`Togglabl` 协议,那么在枚举或结构体中也需要在`toggle` 方法前加上 `mutating` 关键字作为标志.

下边这个例子定义了一个名为 `OnOffSwitch`的枚举. 这个枚举可以切换两种状态,用 枚举值 `On`和`Off` 标识. 该枚举中的 `toggle` 也含有`mutating` 标记,用以匹配`Togglable` 协议的要求:

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


## 协议作为类型
尽管协议本身不实现任何功能,但你可以将它当做类型来使用  
因此,你可以在很多允许使用其他类型的地方来使用协议类型,

包括:  
* 作为函数,方法或构造器中的参数类型,返回值类型
* 作为常量,变量,属性的类型
* 作为数组,字典或其他容器中的元素类型

>Note: 因为协议是一种类型,因此你应该向其他类型那样(Int,Double,String),使用驼峰式写法来书写协议

这里有一个使用协议类型的例子:

	class Dice {
		let sides: Int
		let generator: RandomNumberGenerator
		init(sides: Int, generator: RandomNumberGenerator) { 
			self.sides = sides
			self.generator = generator
		}
		func roll() -> Int {
			return Int(generator.random * Double(sides)) +1
		}
	}

这里定义了一个名为 `Dice`的类,用来代表大富翁游戏的中的 N 个面的骰子.

 `Dice` 的实例拥有名为`sides`和`generator`的两个属性,前者用来表示骰子有几个面,后者用来为骰子提供一个随机数的生成器

`generator` 是一个 `RandomNumberGenerator` 协议类型的属性.因此,你可以为它赋值任何`遵循`该协议的类型.

`Dice` 也拥有一个`构造器(initializer)`用来设置它的初始状态.构造器中含有一个名为`generator` ,类型为 `RandomNumberGenerator` 的形参.你可以在此传入任意遵循`RandomNumberGenerator`协议的类型.

`Dice` 拥有一个名为`roll` ,用以返回 1 到 骰子的面数 实例方法. 该方法调用`generator` 的 random 方法来创建一个 [0-1] 之间的随机数,然后使用这个随机数来生成骰子范围内的值. 这里的`generator` 被声明为 采纳了 `RandomNumberGenerator` 协议,用以确保`random` 能够被调用 

下例展示了一个使用 `LinearCongruentialGenerator` 实例作为随机数生成器的六面骰子

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
	
## 委托(代理)
委托是一种设计模式(*译者注:想起了那年 UITableViewDelegate 中的奔跑,那是我逝去的青春...*),它允许类或结构体将一些需要它们负责的功能或任务交由(委托)给其他的类型.

代理设计模式的实现很简单,首先定义一个`协议`来`封装`那些需要被委托的功能的`函数和方法`; 然后确保其`遵循者`拥有这些被委托的`函数和方法`.
委托模式可以用来相应特定的动作,或接收外部数据源提供的数据而无需要知道外部数据源的类型.

下边这个例子展示了两个基于骰子游戏的两个协议: 

	protocol DiceGame {
		var dice: Dice { get }
		func play()
	}
	protocol DiceGameDelegate {
		func gameDidStart(game: DiceGame)
		func game(game: DiceGame, didStartNewTurnWithDiceRoll diceRoll:Int)
		func gameDidEnd(game: DiceGame)
	}
	
`DiceGame`协议可以被任何包含骰子的游戏采纳. `DiceGameDelegate` 协议可以用来追踪`DiceGame` 的游戏过程
	
下边是一个 `Snakes and Ladders` 游戏的新版本([Control Flow](2)*含有关于该游戏的介绍*).新版本使用`Dice`中的骰子,实现`DiceGame`和`DiceGameDelegate`协议

	class SnakesAndLadders: DiceGame {
		let finalSquare = 25
		let dic = Dice(sides: 6, generator: LinearCongruentialGenerator())
		var square = 0
		var board: Int[]
		init() {
			board = Int[](count: finalSquare + 1, repeatedValue: 0)
			board[03] = +08; board[06] = +11; borad[09] = +09; board[10] = +02
			borad[14] = -10; board[19] = -11; borad[22] = -02; board[24] = -08
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
 			delegate?.gameDIdEnd(self)
 		}
	}
	
更详细的 `Shakes and Ladders` 游戏描述,请在 [Control Flow -> Break](3) 章节查看.  
这个版本的游戏被包装到了名为 `SnakeAndLadders` 并实现了`DiceGame` 协议的类中. 该类含有一个可读的 `dice` 属性和一个 `play` 方法用来遵循协议.

游戏的初始化设置(`setup`)被为类的构造器(`init()`)来实现.所有的游戏逻辑被转移到了协议方法`play` 中.

注意:`delegate` 被定义为遵循`DiceGameDelegate`协议的可选属性,因为委托并不是该游戏的必备条件.
因为`delegate` 是可选的,它的默认值为`nil`

`DicegameDelegate` 提供了三个方法用来追踪游戏过程.被放置于游戏的逻辑中,即`play()`方法内.分别在游戏开始时,新一轮开始时,游戏结束时被调用.

因为 `delegate` 是一个遵循 `DiceGameDelegate` 的可选属性,因此在 `play()` 方法中使用了`可选链`来调用委托方法. 如果`delegate` 属性为 `nil` , 则委托调用*优雅的,不含错误的*失败.如果`delegate` 不为`nil`, 则这些委托方法被调用,并且把`SnakesAndLadders`的这个实例当做参数一并传递

下边的这个例子展示了一个名为`DiceGameTracker`,实现`DiceGameDelegate` 协议的类

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

`DiceGameTracker` 实现了` DiceGameDelegate` 协议中要求的全部方法.用来记录游戏已经进行的轮数. 当游戏开始时, `numberOfTurns` 属性被赋值为0; 在每新一轮中递加; 游戏结束后,输出打印游戏的总轮数.


`gameDidStart` 使用 `game` 参数来打印游戏的一些介绍信息. `game` 的类型是`DiceGame`而不是 `SnakeAndLadders`, 因此`gameDidStart` 只能访问和使用`DiceGame`协议中的成员. 但是仍然可以使用类型转换来访问其实例. 在`gameDidStart`中,当`game`是`SnakesAndLadders` 的实例时,会打印出适当的信息. 因为`game` 是被视为遵循了`DiceGame`协议的属性,也就是说它拥有`dice 属性`,所以`gameDidStart`方法可以访问和打印`dice` 的 `sides` 属性,而无需知道这是一场什么游戏....

这是 `DiceGameTracker` 的运行实例:

	“let tracker = DiceGameTracker()
	let game = SnakesAndLadders()
	game.delegate = tracker
	game.play()
	// Started a new game of Snakes and Ladders
	// The game is using a 6-sided dice
	// Rolled a 3
	// Rolled a 5
	// Rolled a 4
	// Rolled a 5
	// The game lasted for 4 turns”



[1]:http://baidu.com
[2]:http://baidu.com
[3]:http://baidu.com
