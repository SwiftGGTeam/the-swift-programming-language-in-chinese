> 翻譯：[geek5nan](https://github.com/geek5nan)  
> 校對：[dabing1022](https://github.com/dabing1022)

# 協議
-----------------

本頁包含內容：

- [協議的語法（Protocol Syntax）](#protocol_syntax)
- [對屬性的規定（Property Requirements）](#property_requirements)
- [對方法的規定（Method Requirements）](#method_requirements)
- [對突變方法的的規定（Mutating Method Requirements）](#mutating_method_requirements)
- [協議類型（Protocols as Types）](#protocols_as_types)
- [委託(代理)模式（Delegation）](#delegation)
- [在擴展中添加協議成員（Adding Protocol Conformance with an Extension）](#adding_protocol_conformance_with_an_extension)
- [通過擴展補充協議聲明（Declaring Protocol Adoption with an Extension）](#declaring_protocol_adoption_with_an_extension)
- [集合中的協議類型（Collections of Protocol Types）](#collections_of_protocol_types)
- [協議的繼承（Protocol Inheritance）](#protocol_inheritance)
- [協議合成（Protocol Composition）](#protocol_composition)
- [檢驗協議的一致性（Checking for Protocol Conformance）](#checking_for_protocol_conformance)
- [對可選協議的規定（Optional Protocol Requirements）](#optional_protocol_requirements)

`協議(Protocol)`用於定義完成某項任務或功能所必須的方法和屬性，協議實際上並不提供這些功能或任務的具體`實現(Implementation)`--而只用來描述這些實現應該是什麼樣的。類，結構體，枚舉通過提供協議所要求的方法，屬性的具體實現來`採用(adopt)`協議。任意能夠滿足協議要求的類型被稱為協議的`遵循者`。

`協議`可以要求其`遵循者`提供特定的實例屬性，實例方法，類方法，操作符或`下標(subscripts)`等。

<a name="protocol_syntax"></a>
## 協議的語法

`協議`的定義方式與`類，結構體，枚舉`的定義都非常相似，如下所示:

```swift
protocol SomeProtocol {
	// 協議內容
}
```

在類型名稱後加上`協議名稱`，中間以冒號`:`分隔即可實現協議；實現多個協議時，各協議之間用逗號`,`分隔，如下所示:

```swift
struct SomeStructure: FirstProtocol, AnotherProtocol {
	// 結構體內容
}
```

如果一個類在含有`父類`的同時也採用了協議，應當把`父類`放在所有的`協議`之前，如下所示:

```swift
class SomeClass: SomeSuperClass, FirstProtocol, AnotherProtocol {
	// 類的內容
}
```

<a name="property_requirements"></a>
## 對屬性的規定

協議可以規定其`遵循者`提供特定名稱與類型的`實例屬性(instance property)`或`類屬性(type property)`，而不管其是`存儲型屬性(stored property)`還是`計算型屬性(calculate property)`。此外也可以指定屬性是只讀的還是可讀寫的。

如果協議要求屬性是可讀寫的，那麼這個屬性不能是常量`存儲型屬性`或只讀`計算型屬性`；如果協議要求屬性是只讀的(gettable)，那麼`計算型屬性`或`存儲型屬性`都能滿足協議對屬性的規定，在你的代碼中，即使為只讀屬性實現了寫方法(settable)也依然有效。

協議中的屬性經常被加以`var`前綴聲明其為變量屬性，在聲明後加上`{ set get }`來表示屬性是可讀寫的，只讀的屬性則寫作`{ get }`，如下所示:

```swift
protocol SomeProtocol {
	var musBeSettable : Int { get set }
	var doesNotNeedToBeSettable: Int { get }
}
```

如下所示，通常在協議的定義中使用`class`前綴表示該屬性為類成員；在枚舉和結構體實現協議時中，需要使用`static`關鍵字作為前綴。

```swift
protocol AnotherProtocol {
	class var someTypeProperty: Int { get set }
}

如下所示，這是一個含有一個實例屬性要求的協議:

protocol FullyNamed {
	var fullName: String { get }
}
```

`FullyNamed`協議定義了任何擁有`fullName`的類型。它並不指定具體類型，而只是要求類型必須提供一個`fullName`。任何`FullyNamed`類型都得有一個只讀的`fullName`屬性，類型為`String`。

如下所示，這是一個實現了`FullyNamed`協議的簡單結構體:

```swift
struct Person: FullyNamed{
	var fullName: String
}
let john = Person(fullName: "John Appleseed")
//john.fullName 為 "John Appleseed"
```

這個例子中定義了一個叫做`Person`的結構體，用來表示具有指定名字的人。從第一行代碼中可以看出，它採用了`FullyNamed`協議。

`Person`結構體的每一個實例都有一個叫做`fullName`，`String`類型的存儲型屬性，這正好匹配了`FullyNamed`協議的要求，也就意味著，`Person`結構體完整的`遵循`了協議。(如果協議要求未被完全滿足,在編譯時會報錯)

這有一個更為複雜的類，它採用並實現了`FullyNamed`協議，如下所示:

```swift
class Starship: FullyNamed {
	var prefix: String?
	var name: String
	init(name: String, prefix: String? = nil ) {
		self.anme = name
		self.prefix = prefix
	}
	var fullName: String {
	return (prefix ? prefix ! + " " : " ") + name
	}
}
var ncc1701 = Starship(name: "Enterprise", prefix: "USS")
// ncc1701.fullName == "USS Enterprise"
```

`Starship`類把`fullName`屬性實現為只讀的`計算型屬性`。每一個`Starship`類的實例都有一個名為`name`的必備屬性和一個名為`prefix`的可選屬性。 當`prefix`存在時，將`prefix`插入到`name`之前來為`Starship`構建`fullName`，`prefix`不存在時，則將直接用`name`構建`fullName`

<a name="method_requirements"></a>
## 對方法的規定

`協議`可以要求其`遵循者`實現某些指定的`實例方法`或`類方法`。這些方法作為協議的一部分，像普通的方法一樣清晰的放在協議的定義中，而不需要大括號和方法體。

>注意：
>協議中的方法支持`變長參數(variadic parameter)`，不支持`參數默認值(default value)`。

如下所示，協議中類方法的定義與類屬性的定義相似，在協議定義的方法前置`class`關鍵字來表示。當在`枚舉`或`結構體`實現類方法時，需要使用`static`關鍵字來代替。

```swift
protocol SomeProtocol {
	class func someTypeMethod()
}
```

如下所示，定義了含有一個實例方法的的協議。

```
protocol RandomNumberGenerator {
	func random() -> Double
}
```

`RandomNumberGenerator`協議要求其`遵循者`必須擁有一個名為`random`， 返回值類型為`Double`的實例方法。 (儘管這裡並未指明，但是我們假設返回值在[0，1]區間內)。

`RandomNumberGenerator`協議並不在意每一個隨機數是怎樣生成的，它只強調這裡有一個隨機數生成器。

如下所示，下邊的是一個遵循了`RandomNumberGenerator`協議的類。該類實現了一個叫做*線性同餘生成器(linear congruential generator)*的偽隨機數算法。


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
// 輸出 : "Here's a random number: 0.37464991998171"
println("And another one: \(generator.random())")
// 輸出 : "And another one: 0.729023776863283"
```

<a name="mutating_method_requirements"></a>
## 對突變方法的規定

有時不得不在方法中更改實例的所屬類型。在基於`值類型(value types)`(結構體，枚舉)的實例方法中，將`mutating`關鍵字作為函數的前綴，寫在`func`之前，表示可以在該方法中修改實例及其屬性的所屬類型。這一過程在[Modifyting Value Types from Within Instance Methods](1)章節中有詳細描述。

如果協議中的實例方法打算改變其`遵循者`實例的類型，那麼在協議定義時需要在方法前加`mutating`關鍵字，才能使`結構體，枚舉`來採用並滿足協議中對方法的規定。


>注意: 
>用`類`實現協議中的`mutating`方法時，不用寫`mutating`關鍵字;用`結構體`，`枚舉`實現協議中的`mutating`方法時，必須寫`mutating`關鍵字。

如下所示，`Togglable`協議含有名為`toggle`的突變實例方法。根據名稱推測，`toggle`方法應該是用於切換或恢復其`遵循者`實例或其屬性的類型。

```swift
protocol Togglable {
	mutating func toggle()
}
```

當使用`枚舉`或`結構體`來實現`Togglabl`協議時，需要提供一個帶有`mutating`前綴的`toggle`方法。

如下所示，`OnOffSwitch`枚舉`遵循`了`Togglable`協議，`On`，`Off`兩個成員用於表示當前狀態。枚舉的`toggle`方法被標記為`mutating`，用以匹配`Togglabel`協議的規定。

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
//lightSwitch 現在的值為 .On
```

<a name="protocols_as_types"></a>
## 協議類型

儘管`協議`本身並不實現任何功能，但是`協議`可以被當做類型來使用。

使用場景:  

* `協議類型`作為函數、方法或構造器中的參數類型或返回值類型
* `協議類型`作為常量、變量或屬性的類型
* `協議類型`作為數組、字典或其他容器中的元素類型

> 注意: 協議是一種類型，因此協議類型的名稱應與其他類型(Int，Double，String)的寫法相同，使用駝峰式寫法

如下所示，這個示例中將協議當做類型來使用

```swift
class Dice {
	let sides: Int
	let generator: RandomNumberGenerator
	init(sides: Int, generator: RandomNumberGenerator) {
		self.sides = sides
		self.generator = generator
	}
	func roll() -> Int {
		return Int(generator.random() * Double(sides)) +1
	}
}
```

例子中又一個`Dice`類，用來代表桌游中的擁有N個面的骰子。`Dice`的實例含有`sides`和`generator`兩個屬性，前者是整型，用來表示骰子有幾個面，後者為骰子提供一個隨機數生成器。

 `generator`屬性的類型為`RandomNumberGenerator`，因此任何遵循了`RandomNumberGenerator`協議的類型的實例都可以賦值給`generator`，除此之外，無其他要求。

`Dice`類中也有一個`構造器(initializer)`，用來進行初始化操作。構造器中含有一個名為`generator`，類型為`RandomNumberGenerator`的形參。在調用構造方法時創建`Dice`的實例時，可以傳入任何遵循`RandomNumberGenerator`協議的實例給generator。

`Dice`類也提供了一個名為`roll`的實例方法用來模擬骰子的面值。它先使用`generator`的`random`方法來創建一個[0-1]區間內的隨機數種子，然後加工這個隨機數種子生成骰子的面值。generator被認為是遵循了`RandomNumberGenerator`的類型，因而保證了`random`方法可以被調用。

如下所示，這裡展示了如何使用`LinearCongruentialGenerator`的實例作為隨機數生成器創建一個六面骰子:

```swift
var d6 = Dice(sides: 6,generator: LinearCongruentialGenerator())
for _ in 1...5 {
	println("Random dice roll is \(d6.roll())")
}
//輸出結果
//Random dice roll is 3
//Random dice roll is 5
//Random dice roll is 4
//Random dice roll is 5
//Random dice roll is 4
```

<a name="delegation"></a>
## 委託(代理)模式

委託是一種設計模式(*譯者注: 想起了那年 UITableViewDelegate 中的奔跑，那是我逝去的Objective-C。。。*)，它允許`類`或`結構體`將一些需要它們負責的功能`交由(委託)`給其他的類型的實例。

委託模式的實現很簡單: 定義`協議`來`封裝`那些需要被委託的`函數和方法`， 使其`遵循者`擁有這些被委託的`函數和方法`。

委託模式可以用來響應特定的動作或接收外部數據源提供的數據，而無需要知道外部數據源的所屬類型(*譯者注:只要求外部數據源`遵循`某協議*)。

下文是兩個基於骰子遊戲的協議: 

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

`DiceGame`協議可以在任意含有骰子的遊戲中實現，`DiceGameDelegate`協議可以用來追蹤`DiceGame`的遊戲過程
	
如下所示，`SnakesAndLadders`是`Snakes and Ladders`(譯者注:[Control Flow](2)章節有該遊戲的詳細介紹)遊戲的新版本。新版本使用`Dice`作為骰子，並且實現了`DiceGame`和`DiceGameDelegate`協議，後者用來記錄遊戲的過程:

```swift
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
```

這個版本的遊戲封裝到了`SnakesAndLadders`類中，該類採用了`DiceGame`協議，並且提供了`dice`屬性和`play`實例方法用來`遵循`協議。(`dice`屬性在構造之後就不在改變，且協議只要求`dice`為只讀的，因此將`dice`聲明為常量屬性。)

在`SnakesAndLadders`類的`構造器(initializer)`初始化遊戲。所有的遊戲邏輯被轉移到了`play`方法中，`play`方法使用協議規定的`dice`屬性提供骰子搖出的值。

> 注意:`delegate`並不是遊戲的必備條件，因此`delegate`被定義為遵循`DiceGameDelegate`協議的可選屬性，`delegate`使用`nil`作為初始值。

`DicegameDelegate`協議提供了三個方法用來追蹤遊戲過程。被放置於遊戲的邏輯中，即`play()`方法內。分別在遊戲開始時，新一輪開始時，遊戲結束時被調用。

因為`delegate`是一個遵循`DiceGameDelegate`的可選屬性，因此在`play()`方法中使用了`可選鏈`來調用委託方法。 若`delegate`屬性為`nil`， 則delegate所調用的方法失效。若`delegate`不為`nil`，則方法能夠被調用

如下所示，`DiceGameTracker`遵循了`DiceGameDelegate`協議

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

`DiceGameTracker`實現了`DiceGameDelegate`協議規定的三個方法，用來記錄遊戲已經進行的輪數。 當遊戲開始時，`numberOfTurns`屬性被賦值為0; 在每新一輪中遞加; 遊戲結束後，輸出打印遊戲的總輪數。

`gameDidStart`方法從`game`參數獲取遊戲信息並輸出。`game`在方法中被當做`DiceGame`類型而不是`SnakeAndLadders`類型，所以方法中只能訪問`DiceGame`協議中的成員。

`DiceGameTracker`的運行情況，如下所示:

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
## 在擴展中添加協議成員

即便無法修改源代碼，依然可以通過`擴展(Extension)`來擴充已存在類型(*譯者注: 類，結構體，枚舉等*)。`擴展`可以為已存在的類型添加`屬性`，`方法`，`下標`，`協議`等成員。詳情請在[擴展](4)章節中查看。

> 注意: 通過`擴展`為已存在的類型`遵循`協議時，該類型的所有實例也會隨之添加協議中的方法

`TextRepresentable`協議含有一個`asText`，如下所示：

```swift
protocol TextRepresentable {
	func asText() -> String
}
```

通過`擴展`為上一節中提到的`Dice`類遵循`TextRepresentable`協議

```swift
extension Dice: TextRepresentable {
	func asText() -> String {
		return "A \(sides)-sided dice"
	}
}
```

從現在起，`Dice`類型的實例可被當作`TextRepresentable`類型：

```swift
let d12 = Dice(sides: 12,generator: LinearCongruentialGenerator())
println(d12.asText())
// 輸出 "A 12-sided dice"
```

`SnakesAndLadders`類也可以通過`擴展`的方式來遵循協議：

```swift
extension SnakeAndLadders: TextRepresentable {
	func asText() -> String {
		return "A game of Snakes and Ladders with \(finalSquare) squares"
	}
}
println(game.asText())
// 輸出 "A game of Snakes and Ladders with 25 squares"
```

<a name="declaring_protocol_adoption_with_an_extension"></a>
## 通過擴展補充協議聲明

當一個類型已經實現了協議中的所有要求，卻沒有聲明時，可以通過`擴展`來補充協議聲明:

```swift
struct Hamster {
	var name: String
	func asText() -> String {
		return "A hamster named \(name)"
	}
}
extension Hamster: TextRepresentable {}
```

從現在起，`Hamster`的實例可以作為`TextRepresentable`類型使用

```swift
let simonTheHamster = Hamster(name: "Simon")
let somethingTextRepresentable: TextRepresentable = simonTheHamester
println(somethingTextRepresentable.asText())
// 輸出 "A hamster named Simon"
```

> 注意: 即時滿足了協議的所有要求，類型也不會自動轉變，因此你必須為它做出明顯的協議聲明

<a name="collections_of_protocol_types"></a>
## 集合中的協議類型

協議類型可以被集合使用，表示集合中的元素均為協議類型:

```swift
let things: TextRepresentable[] = [game,d12,simoTheHamster]
```

如下所示，`things`數組可以被直接遍歷，並調用其中元素的`asText()`函數:

```swift
for thing in things {
	println(thing.asText())
}
// A game of Snakes and Ladders with 25 squares
// A 12-sided dice
// A hamster named Simon
```

`thing`被當做是`TextRepresentable`類型而不是`Dice`，`DiceGame`，`Hamster`等類型。因此能且僅能調用`asText`方法

<a name="protocol_inheritance"></a>
## 協議的繼承

協議能夠繼承一到多個其他協議。語法與類的繼承相似，多個協議間用逗號`，`分隔

```swift
protocol InheritingProtocol: SomeProtocol, AnotherProtocol {
	// 協議定義
}
```

如下所示，`PrettyTextRepresentable`協議繼承了`TextRepresentable`協議

```swift
protocol PrettyTextRepresentable: TextRepresentable {
	func asPrettyText() -> String
}
```

遵循`PrettyTextRepresentable`協議的同時，也需要遵循`TextRepresentable`協議。

如下所示，用`擴展`為`SnakesAndLadders`遵循`PrettyTextRepresentable`協議:

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

在`for in`中迭代出了`board`數組中的每一個元素:

* 當從數組中迭代出的元素的值大於0時，用`▲`表示
* 當從數組中迭代出的元素的值小於0時，用`▼`表示
* 當從數組中迭代出的元素的值等於0時，用`○`表示

任意`SankesAndLadders`的實例都可以使用`asPrettyText()`方法。

```swift
println(game.asPrettyText())
// A game of Snakes and Ladders with 25 squares:
// ○ ○ ▲ ○ ○ ▲ ○ ○ ▲ ▲ ○ ○ ○ ▼ ○ ○ ○ ○ ▼ ○ ○ ▼ ○ ▼ ○
```

<a name="protocol_composition"></a>
## 協議合成

一個協議可由多個協議採用`protocol<SomeProtocol， AnotherProtocol>`這樣的格式進行組合，稱為`協議合成(protocol composition)`。

舉個例子：

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
// 輸出 "Happy birthday Malcolm - you're 21!
```

`Named`協議包含`String`類型的`name`屬性;`Aged`協議包含`Int`類型的`age`屬性。`Person`結構體`遵循`了這兩個協議。

`wishHappyBirthday`函數的形參`celebrator`的類型為`protocol<Named，Aged>`。可以傳入任意`遵循`這兩個協議的類型的實例

> 注意: `協議合成`並不會生成一個新協議類型，而是將多個協議合成為一個臨時的協議，超出範圍後立即失效。

<a name="checking_for_protocol_conformance"></a>
## 檢驗協議的一致性

使用`is`和`as`操作符來檢查協議的一致性或轉化協議類型。檢查和轉化的語法和之前相同(*詳情查看[Typy Casting章節](5)*):

* `is`操作符用來檢查實例是否`遵循`了某個`協議`。 
* `as?`返回一個可選值，當實例`遵循`協議時，返回該協議類型;否則返回`nil`
* `as`用以強制向下轉型。  

```swift
@objc protocol HasArea {
    var area: Double { get }
}
```

> 注意: `@objc`用來表示協議是可選的，也可以用來表示暴露給`Objective-C`的代碼，此外，`@objc`型協議只對`類`有效，因此只能在`類`中檢查協議的一致性。詳情查看*[Using Siwft with Cocoa and Objectivei-c](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/BuildingCocoaApps/index.html#//apple_ref/doc/uid/TP40014216)*。

如下所示，定義了`Circle`和`Country`類，它們都遵循了`haxArea`協議

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

`Circle`類把`area`實現為基於`存儲型屬性`radius的`計算型屬性`，`Country`類則把`area`實現為`存儲型屬性`。這兩個類都`遵循`了`haxArea`協議。

如下所示，Animal是一個沒有實現`HasArea`協議的類

```swift
class Animal {
	var legs: Int
	init(legs: Int) { self.legs = legs }
}
```

`Circle，Country，Animal`並沒有一個相同的基類，因而採用`AnyObject`類型的數組來裝載在他們的實例，如下所示:

```swift
let objects: AnyObject[] = [
	Circle(radius: 2.0),
	Country(area: 243_610),
	Animal(legs: 4)
]
```

`objects`數組使用字面量初始化，數組包含一個`radius`為2。0的`Circle`的實例，一個保存了英國面積的`Country`實例和一個`legs`為4的`Animal`實例。

如下所示，`objects`數組可以被迭代，對迭代出的每一個元素進行檢查，看它是否遵循`了`HasArea`協議:

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

當迭代出的元素遵循`HasArea`協議時，通過`as?`操作符將其`可選綁定(optional binding)`到`objectWithArea`常量上。`objectWithArea`是`HasArea`協議類型的實例，因此`area`屬性是可以被訪問和打印的。

`objects`數組中元素的類型並不會因為`向下轉型`而改變，它們仍然是`Circle`，`Country`，`Animal`類型。然而，當它們被賦值給`objectWithArea`常量時，則只被視為`HasArea`類型，因此只有`area`屬性能夠被訪問。

<a name="optional_protocol_requirements"></a>
## 對可選協議的規定

可選協議含有可選成員，其`遵循者`可以選擇是否實現這些成員。在協議中使用`@optional`關鍵字作為前綴來定義可選成員。

可選協議在調用時使用`可選鏈`，詳細內容在[Optional Chaning](7)章節中查看。

像`someOptionalMethod?(someArgument)`這樣，你可以在可選方法名稱後加上`?`來檢查該方法是否被實現。`可選方法`和`可選屬性`都會返回一個`可選值(optional value)`，當其不可訪問時，`?`之後語句不會執行，並整體返回`nil`

> 注意: 可選協議只能在含有`@objc`前綴的協議中生效。且`@objc`的協議只能被`類`遵循

如下所示，`Counter`類使用含有兩個可選成員的`CounterDataSource`協議類型的外部數據源來提供`增量值(increment amount)`

```swift
@objc protocol CounterDataSource {
    @optional func incrementForCount(count: Int) -> Int
    @optional var fixedIncrement: Int { get }
}
```

`CounterDataSource`含有`incrementForCount`的`可選方法`和`fiexdIncrement`的`可選屬性`，它們使用了不同的方法來從數據源中獲取合適的增量值。

> 注意: `CounterDataSource`中的屬性和方法都是可選的，因此可以在類中聲明但不實現這些成員，儘管技術上允許這樣做，不過最好不要這樣寫。

`Counter`類含有`CounterDataSource?`類型的可選屬性`dataSource`，如下所示:

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

`count`屬性用於存儲當前的值，`increment`方法用來為`count`賦值。

`increment`方法通過`可選鏈`，嘗試從兩種`可選成員`中獲取`count`。
	
1. 由於`dataSource`可能為`nil`，因此在`dataSource`後邊加上了`?`標記來表明只在`dataSource`非空時才去調用`incrementForCount`方法。

2. 即使`dataSource`存在，但是也無法保證其是否實現了`incrementForCount`方法，因此在`incrementForCount`方法後邊也加有`?`標記

在調用`incrementForCount`方法後，`Int`型`可選值`通過`可選綁定(optional binding)`自動拆包並賦值給常量`amount`。

當`incrementForCount`不能被調用時，嘗試使用可選屬性`fixedIncrement`來代替。

`ThreeSource`實現了`CounterDataSource`協議，如下所示:

	class ThreeSource: CounterDataSource {
		let fixedIncrement = 3
	}

使用`ThreeSource`作為數據源開實例化一個`Counter`:

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

`TowardsZeroSource`實現了`CounterDataSource`協議中的`incrementForCount`方法，如下所示:

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

下邊是執行的代碼：

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
