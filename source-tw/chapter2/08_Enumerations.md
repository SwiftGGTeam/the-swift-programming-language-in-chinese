> 翻譯：[yankuangshi](https://github.com/yankuangshi)  
> 校對：[shinyzhu](https://github.com/shinyzhu)

# 枚舉（Enumerations）
---

本頁內容包含：

- [枚舉語法（Enumeration Syntax）](#enumeration_syntax)
- [匹配枚舉值與`Swith`語句（Matching Enumeration Values with a Switch Statement）](#matching_enumeration_values_with_a_switch_statement)
- [相關值（Associated Values）](#associated_values)
- [原始值（Raw Values）](#raw_values)

枚舉定義了一個通用類型的一組相關的值，使你可以在你的代碼中以一個安全的方式來使用這些值。

如果你熟悉 C 語言，你就會知道，在 C 語言中枚舉指定相關名稱為一組整型值。Swift 中的枚舉更加靈活，不必給每一個枚舉成員提供一個值。如果一個值（被認為是「原始」值）被提供給每個枚舉成員，則該值可以是一個字符串，一個字符，或是一個整型值或浮點值。

此外，枚舉成員可以指定任何類型的相關值存儲到枚舉成員值中，就像其他語言中的聯合體（unions）和變體（variants）。你可以定義一組通用的相關成員作為枚舉的一部分，每一組都有不同的一組與它相關的適當類型的數值。

在 Swift 中，枚舉類型是一等（first-class）類型。它們採用了很多傳統上只被類（class）所支持的特徵，例如計算型屬性（computed properties），用於提供關於枚舉當前值的附加信息，□實例方法（instance methods），用於提供和枚舉所代表的值相關聯的功能。枚舉也可以定義構造函數（initializers）來提供一個初始成員值；可以在原始的實現基礎上擴展它們的功能；可以遵守協議（protocols）來提供標準的功能。

欲瞭解更多相關功能，請參見[屬性（Properties）](10_Properties.html)，[方法（Methods）](11_Methods.html)，[構造過程（Initialization）](14_Initialization.html)，[擴展（Extensions）](20_Extensions.html)和[協議（Protocols）](21_Protocols.html)。

<a name="enumeration_syntax"></a>
## 枚舉語法

使用`enum`關鍵詞並且把它們的整個定義放在一對大括號內：

```swift
enum SomeEnumeration {
  // enumeration definition goes here
}
```

以下是指南針四個方向的一個例子：

```swift
enum CompassPoint {
  case North
  case South
  case East
  case West
}
```

一個枚舉中被定義的值（例如 `North`，`South`，`East`和`West`）是枚舉的***成員值***（或者***成員***）。`case`關鍵詞表明新的一行成員值將被定義。

> 注意：  
> 不像 C 和 Objective-C 一樣，Swift 的枚舉成員在被創建時不會被賦予一個默認的整數值。在上面的`CompassPoints`例子中，`North`，`South`，`East`和`West`不是隱式的等於`0`，`1`，`2`和`3`。相反的，這些不同的枚舉成員在`CompassPoint`的一種顯示定義中擁有各自不同的值。  

多個成員值可以出現在同一行上，用逗號隔開：

```swift
enum Planet {
  case Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune
}
```

每個枚舉定義了一個全新的類型。像 Swift 中其他類型一樣，它們的名字（例如`CompassPoint`和`Planet`）必須以一個大寫字母開頭。給枚舉類型起一個單數名字而不是複數名字，以便於讀起來更加容易理解：

```swift
var directionToHead = CompassPoint.West
```

`directionToHead`的類型被推斷當它被`CompassPoint`的一個可能值初始化。一旦`directionToHead`被聲明為一個`CompassPoint`，你可以使用更短的點（.）語法將其設置為另一個`CompassPoint`的值：

```swift
directionToHead = .East
```

`directionToHead`的類型已知時，當設定它的值時，你可以不再寫類型名。使用顯式類型的枚舉值可以讓代碼具有更好的可讀性。

<a name="matching_enumeration_values_with_a_switch_statement"></a>
## 匹配枚舉值和`Switch`語句

你可以匹配單個枚舉值和`switch`語句：

```swift
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
// 輸出 "Watch out for penguins」
```

你可以如此理解這段代碼：

「考慮`directionToHead`的值。當它等於`.North`，打印`「Lots of planets have a north」`。當它等於`.South`，打印`「Watch out for penguins」`。」

等等依次類推。

正如在[控制流（Control Flow）](05_Control_Flow.html)中介紹，當考慮一個枚舉的成員們時，一個`switch`語句必須全面。如果忽略了`.West`這種情況，上面那段代碼將無法通過編譯，因為它沒有考慮到`CompassPoint`的全部成員。全面性的要求確保了枚舉成員不會被意外遺漏。

當不需要匹配每個枚舉成員的時候，你可以提供一個默認`default`分支來涵蓋所有未明確被提出的任何成員：

```swift
let somePlanet = Planet.Earth
switch somePlanet {
case .Earth:
    println("Mostly harmless")
default:
    println("Not a safe place for humans")
}
// 輸出 "Mostly harmless」
```

<a name="associated_values"></a>
## 相關值（Associated Values）

上一小節的例子演示了一個枚舉的成員是如何被定義（分類）的。你可以為`Planet.Earth`設置一個常量或則變量，並且在之後查看這個值。不管怎樣，如果有時候能夠把其他類型的相關值和成員值一起存儲起來會很有用。這能讓你存儲成員值之外的自定義信息，並且當你每次在代碼中使用該成員時允許這個信息產生變化。

你可以定義 Swift 的枚舉存儲任何類型的相關值，如果需要的話，每個成員的數據類型可以是各不相同的。枚舉的這種特性跟其他語言中的可辨識聯合（discriminated unions），標籤聯合（tagged unions），或者變體（variants）相似。

例如，假設一個庫存跟蹤系統需要利用兩種不同類型的條形碼來跟蹤商品。有些商品上標有 UPC-A 格式的一維碼，它使用數字 0 到 9。每一個條形碼都有一個代表「數字系統」的數字，該數字後接 10 個代表「標識符」的數字。最後一個數字是「檢查」位，用來驗證代碼是否被正確掃瞄：

<img width="252" height="120" alt="" src="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/barcode_UPC_2x.png">

其他商品上標有 QR 碼格式的二維碼，它可以使用任何 ISO8859-1 字符，並且可以編碼一個最多擁有 2,953 字符的字符串:

<img width="169" height="169" alt="" src="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/barcode_QR_2x.png">

對於庫存跟蹤系統來說，能夠把 UPC-A 碼作為三個整型值的元組，和把 QR 碼作為一個任何長度的字符串存儲起來是方便的。

在 Swift 中，用來定義兩種商品條碼的枚舉是這樣子的：

```swift
enum Barcode {
  case UPCA(Int, Int, Int)
  case QRCode(String)
}
```

以上代碼可以這麼理解：

「定義一個名為`Barcode`的枚舉類型，它可以是`UPCA`的一個相關值（`Int`，`Int`，`Int`），或者`QRCode`的一個字符串類型（`String`）相關值。」

這個定義不提供任何`Int`或`String`的實際值，它只是定義了，當`Barcode`常量和變量等於`Barcode.UPCA`或`Barcode.QRCode`時，相關值的類型。

然後可以使用任何一種條碼類型創建新的條碼，如：

```swift
var productBarcode = Barcode.UPCA(8, 85909_51226, 3)
```

以上例子創建了一個名為`productBarcode`的新變量，並且賦給它一個`Barcode.UPCA`的相關元組值`(8, 8590951226, 3)`。提供的「標識符」值在整數字中有一個下劃線，使其便於閱讀條形碼。

同一個商品可以被分配給一個不同類型的條形碼，如：

```swift
productBarcode = .QRCode("ABCDEFGHIJKLMNOP")
```

這時，原始的`Barcode.UPCA`和其整數值被新的`Barcode.QRCode`和其字符串值所替代。條形碼的常量和變量可以存儲一個`.UPCA`或者一個`.QRCode`（連同它的相關值），但是在任何指定時間只能存儲其中之一。

像以前那樣，不同的條形碼類型可以使用一個 switch 語句來檢查，然而這次相關值可以被提取作為 switch 語句的一部分。你可以在`switch`的 case 分支代碼中提取每個相關值作為一個常量（用`let`前綴）或者作為一個變量（用`var`前綴）來使用：

```swift
switch productBarcode {
case .UPCA(let numberSystem, let identifier, let check):
    println("UPC-A with value of \(numberSystem), \(identifier), \(check).")
case .QRCode(let productCode):
    println("QR code with value of \(productCode).")
}
// 輸出 "QR code with value of ABCDEFGHIJKLMNOP.」
```

如果一個枚舉成員的所有相關值被提取為常量，或者它們全部被提取為變量，為了簡潔，你可以只放置一個`var`或者`let`標注在成員名稱前：

```swift
switch productBarcode {
case let .UPCA(numberSystem, identifier, check):
    println("UPC-A with value of \(numberSystem), \(identifier), \(check).")
case let .QRCode(productCode):
    println("QR code with value of \(productCode).")
}
// 輸出 "QR code with value of ABCDEFGHIJKLMNOP."
```

<a name="raw_values"></a>
## 原始值（Raw Values）

在[Associated Values](#raw_values)小節的條形碼例子中演示了一個枚舉的成員如何聲明它們存儲不同類型的相關值。作為相關值的替代，枚舉成員可以被默認值（稱為原始值）預先填充，其中這些原始值具有相同的類型。

這裡是一個枚舉成員存儲原始 ASCII 值的例子：

```swift
enum ASCIIControlCharacter: Character {
    case Tab = "\t"
    case LineFeed = "\n"
    case CarriageReturn = "\r"
}
```

在這裡，稱為`ASCIIControlCharacter`的枚舉的原始值類型被定義為字符型`Character`，並被設置了一些比較常見的 ASCII 控制字符。字符值的描述請詳見字符串和字符[`Strings and Characters`](03_Strings_and_Characters.html)部分。

注意，原始值和相關值是不相同的。當你開始在你的代碼中定義枚舉的時候原始值是被預先填充的值，像上述三個 ASCII 碼。對於一個特定的枚舉成員，它的原始值始終是相同的。相關值是當你在創建一個基於枚舉成員的新常量或變量時才會被設置，並且每次當你這麼做得時候，它的值可以是不同的。

原始值可以是字符串，字符，或者任何整型值或浮點型值。每個原始值在它的枚舉聲明中必須是唯一的。當整型值被用於原始值，如果其他枚舉成員沒有值時，它們會自動遞增。

下面的枚舉是對之前`Planet`這個枚舉的一個細化，利用原始整型值來表示每個 planet 在太陽系中的順序：

```swift
enum Planet: Int {
    case Mercury = 1, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune
}
```

自動遞增意味著`Planet.Venus`的原始值是`2`，依次類推。

使用枚舉成員的`toRaw`方法可以訪問該枚舉成員的原始值：

```swift
let earthsOrder = Planet.Earth.toRaw()
// earthsOrder is 3
```

使用枚舉的`fromRaw`方法來試圖找到具有特定原始值的枚舉成員。這個例子通過原始值`7`識別`Uranus`：

```swift
let possiblePlanet = Planet.fromRaw(7)
// possiblePlanet is of type Planet? and equals Planet.Uranus
```

然而，並非所有可能的`Int`值都可以找到一個匹配的行星。正因為如此，`fromRaw`方法可以返回一個***可選***的枚舉成員。在上面的例子中，`possiblePlanet`是`Planet?`類型，或「可選的`Planet`」。

如果你試圖尋找一個位置為9的行星，通過`fromRaw`返回的可選`Planet`值將是`nil`：

```swift
let positionToFind = 9
if let somePlanet = Planet.fromRaw(positionToFind) {
    switch somePlanet {
    case .Earth:
        println("Mostly harmless")
    default:
        println("Not a safe place for humans")
    }
} else {
    println("There isn't a planet at position \(positionToFind)")
}
// 輸出 "There isn't a planet at position 9
```

這個範例使用可選綁定（optional binding），通過原始值`9`試圖訪問一個行星。`if let somePlanet = Planet.fromRaw(9)`語句獲得一個可選`Planet`，如果可選`Planet`可以被獲得，把`somePlanet`設置成該可選`Planet`的內容。在這個範例中，無法檢索到位置為`9`的行星，所以`else`分支被執行。

