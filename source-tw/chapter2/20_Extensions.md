> 翻譯：[lyuka](https://github.com/lyuka)  
> 校對：[Hawstein](https://github.com/Hawstein)

#擴展（Extensions）
----

本頁包含內容：

- [擴展語法](#extension_syntax)
- [計算型屬性](#computed_properties)
- [構造器](#initializers)
- [方法](#methods)
- [下標](#subscripts)
- [嵌套類型](#nested_types)

*擴展*就是向一個已有的類、結構體或枚舉類型添加新功能（functionality）。這包括在沒有權限獲取原始源代碼的情況下擴展類型的能力（即*逆向建模*）。擴展和 Objective-C 中的分類（categories）類似。（不過與Objective-C不同的是，Swift 的擴展沒有名字。）

Swift 中的擴展可以：

- 添加計算型屬性和計算靜態屬性
- 定義實例方法和類型方法
- 提供新的構造器
- 定義下標
- 定義和使用新的嵌套類型
- 使一個已有類型符合某個協議


>注意：  
如果你定義了一個擴展向一個已有類型添加新功能，那麼這個新功能對該類型的所有已有實例中都是可用的，即使它們是在你的這個擴展的前面定義的。

<a name="extension_syntax"></a>
## 擴展語法（Extension Syntax）

聲明一個擴展使用關鍵字`extension`：

```swift
extension SomeType {
    // 加到SomeType的新功能寫到這裡
}
```

一個擴展可以擴展一個已有類型，使其能夠適配一個或多個協議（protocol）。當這種情況發生時，協議的名字應該完全按照類或結構體的名字的方式進行書寫：

```swift
extension SomeType: SomeProtocol, AnotherProctocol {
    // 協議實現寫到這裡
}
```

按照這種方式添加的協議遵循者（protocol conformance）被稱之為[在擴展中添加協議遵循者](21_Protocols.html#adding_protocol_conformance_with_an_extension)

<a name="computed_properties"></a>
## 計算型屬性（Computed Properties）

擴展可以向已有類型添加計算型實例屬性和計算型類型屬性。下面的例子向 Swift 的內建`Double`類型添加了5個計算型實例屬性，從而提供與距離單位協作的基本支持。

```swift
extension Double {
    var km: Double { return self * 1_000.0 }
    var m : Double { return self }
    var cm: Double { return self / 100.0 }
    var mm: Double { return self / 1_000.0 }
    var ft: Double { return self / 3.28084 }
}
let oneInch = 25.4.mm
println("One inch is \(oneInch) meters")
// 打印輸出："One inch is 0.0254 meters"
let threeFeet = 3.ft
println("Three feet is \(threeFeet) meters")
// 打印輸出："Three feet is 0.914399970739201 meters"
```

這些計算屬性表達的含義是把一個`Double`型的值看作是某單位下的長度值。即使它們被實現為計算型屬性，但這些屬性仍可以接一個帶有dot語法的浮點型字面值，而這恰恰是使用這些浮點型字面量實現距離轉換的方式。

在上述例子中，一個`Double`型的值`1.0`被用來表示「1米」。這就是為什麼`m`計算型屬性返回`self`——表達式`1.m`被認為是計算`1.0`的`Double`值。

其它單位則需要一些轉換來表示在米下測量的值。1千米等於1,000米，所以`km`計算型屬性要把值乘以`1_000.00`來轉化成單位米下的數值。類似地，1米有3.28024英尺，所以`ft`計算型屬性要把對應的`Double`值除以`3.28024`來實現英尺到米的單位換算。

這些屬性是只讀的計算型屬性，所有從簡考慮它們不用`get`關鍵字表示。它們的返回值是`Double`型，而且可以用於所有接受`Double`的數學計算中：

```swift
let aMarathon = 42.km + 195.m
println("A marathon is \(aMarathon) meters long")
// 打印輸出："A marathon is 42495.0 meters long"
```


>注意：  
擴展可以添加新的計算屬性，但是不可以添加存儲屬性，也不可以向已有屬性添加屬性觀測器(property observers)。

<a name="initializers"></a>
## 構造器（Initializers）

擴展可以向已有類型添加新的構造器。這可以讓你擴展其它類型，將你自己的定制類型作為構造器參數，或者提供該類型的原始實現中沒有包含的額外初始化選項。  

擴展能向類中添加新的便利構造器，但是它們不能向類中添加新的指定構造器或析構函數。指定構造器和析構函數必須總是由原始的類實現來提供。

> 注意：  
如果你使用擴展向一個值類型添加一個構造器，在該值類型已經向所有的存儲屬性提供默認值，而且沒有定義任何定制構造器（custom initializers）時，你可以在值類型的擴展構造器中調用默認構造器(default initializers)和逐一成員構造器(memberwise initializers)。

正如在值類型的構造器委託中描述的，如果你已經把構造器寫成值類型原始實現的一部分，上述規則不再適用。


下面的例子定義了一個用於描述幾何矩形的定制結構體`Rect`。這個例子同時定義了兩個輔助結構體`Size`和`Point`，它們都把`0.0`作為所有屬性的默認值：

```swift
struct Size {
    var width = 0.0, height = 0.0
}
struct Point {
    var x = 0.0, y = 0.0
}
struct Rect {
    var origin = Point()
    var size = Size()
}
```

因為結構體`Rect`提供了其所有屬性的默認值，所以正如默認構造器中描述的，它可以自動接受一個默認的構造器和一個成員級構造器。這些構造器可以用於構造新的`Rect`實例：

```swift
let defaultRect = Rect()
let memberwiseRect = Rect(origin: Point(x: 2.0, y: 2.0),
    size: Size(width: 5.0, height: 5.0))
```

你可以提供一個額外的使用特殊中心點和大小的構造器來擴展`Rect`結構體：

```swift
extension Rect {
    init(center: Point, size: Size) {
        let originX = center.x - (size.width / 2)
        let originY = center.y - (size.height / 2)
        self.init(origin: Point(x: originX, y: originY), size: size)
    }
}
```

這個新的構造器首先根據提供的`center`和`size`值計算一個合適的原點。然後調用該結構體自動的成員構造器`init(origin:size:)`，該構造器將新的原點和大小存到了合適的屬性中：

```swift
let centerRect = Rect(center: Point(x: 4.0, y: 4.0),
    size: Size(width: 3.0, height: 3.0))
// centerRect的原點是 (2.5, 2.5)，大小是 (3.0, 3.0)
```


>注意：  
如果你使用擴展提供了一個新的構造器，你依舊有責任保證構造過程能夠讓所有實例完全初始化。

<a name="methods"></a>
## 方法（Methods）

擴展可以向已有類型添加新的實例方法和類型方法。下面的例子向`Int`類型添加一個名為`repetitions`的新實例方法：

```swift
extension Int {
    func repetitions(task: () -> ()) {
        for i in 0..self {
            task()
        }
    }
}
```

這個`repetitions`方法使用了一個`() -> ()`類型的單參數（single argument），表明函數沒有參數而且沒有返回值。

定義該擴展之後，你就可以對任意整數調用`repetitions`方法,實現的功能則是多次執行某任務：

```swift
3.repetitions({
    println("Hello!")
    })
// Hello!
// Hello!
// Hello!
```

可以使用 trailing 閉包使調用更加簡潔：

```swift
3.repetitions{
    println("Goodbye!")
}
// Goodbye!
// Goodbye!
// Goodbye!
```

<a name="mutating_instance_methods"></a>
### 修改實例方法（Mutating Instance Methods）

通過擴展添加的實例方法也可以修改該實例本身。結構體和枚舉類型中修改`self`或其屬性的方法必須將該實例方法標注為`mutating`，正如來自原始實現的修改方法一樣。

下面的例子向Swift的`Int`類型添加了一個新的名為`square`的修改方法，來實現一個原始值的平方計算：

```swift
extension Int {
    mutating func square() {
        self = self * self
    }
}
var someInt = 3
someInt.square()
// someInt 現在值是 9
```

<a name="subscripts"></a>
## 下標（Subscripts）

擴展可以向一個已有類型添加新下標。這個例子向Swift內建類型`Int`添加了一個整型下標。該下標`[n]`返回十進制數字從右向左數的第n個數字

- 123456789[0]返回9
- 123456789[1]返回8

...等等

```swift
extension Int {
    subscript(digitIndex: Int) -> Int {
        var decimalBase = 1
            for _ in 1...digitIndex {
                decimalBase *= 10
            }
        return (self / decimalBase) % 10
    }
}
746381295[0]
// returns 5
746381295[1]
// returns 9
746381295[2]
// returns 2
746381295[8]
// returns 7
```

如果該`Int`值沒有足夠的位數，即下標越界，那麼上述實現的下標會返回0，因為它會在數字左邊自動補0：

```swift
746381295[9]
//returns 0, 即等同於：
0746381295[9]
```

<a name="nested_types"></a>
## 嵌套類型（Nested Types）

擴展可以向已有的類、結構體和枚舉添加新的嵌套類型：

```swift
extension Character {
    enum Kind {
        case Vowel, Consonant, Other
    }
    var kind: Kind {
        switch String(self).lowercaseString {
        case "a", "e", "i", "o", "u":
            return .Vowel
        case "b", "c", "d", "f", "g", "h", "j", "k", "l", "m",
             "n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z":
            return .Consonant
        default:
            return .Other
        }
    }
}
```

該例子向`Character`添加了新的嵌套枚舉。這個名為`Kind`的枚舉表示特定字符的類型。具體來說，就是表示一個標準的拉丁腳本中的字符是元音還是輔音（不考慮口語和地方變種），或者是其它類型。

這個例子還向`Character`添加了一個新的計算實例屬性，即`kind`，用來返回合適的`Kind`枚舉成員。

現在，這個嵌套枚舉可以和一個`Character`值聯合使用了：

```swift
func printLetterKinds(word: String) {
    println("'\\(word)' is made up of the following kinds of letters:")
    for character in word {
        switch character.kind {
        case .Vowel:
            print("vowel ")
        case .Consonant:
            print("consonant ")
        case .Other:
            print("other ")
        }
    }
    print("\n")
}
printLetterKinds("Hello")
// 'Hello' is made up of the following kinds of letters:
// consonant vowel consonant consonant vowel
```

函數`printLetterKinds`的輸入是一個`String`值並對其字符進行迭代。在每次迭代過程中，考慮當前字符的`kind`計算屬性，並打印出合適的類別描述。所以`printLetterKinds`就可以用來打印一個完整單詞中所有字母的類型，正如上述單詞`"hello"`所展示的。

>注意：  
由於已知`character.kind`是`Character.Kind`型，所以`Character.Kind`中的所有成員值都可以使用`switch`語句裡的形式簡寫，比如使用 `.Vowel`代替`Character.Kind.Vowel`

