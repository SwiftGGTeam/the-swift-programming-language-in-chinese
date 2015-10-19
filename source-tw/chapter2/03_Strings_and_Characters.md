> 翻譯：[wh1100717](https://github.com/wh1100717)  
> 校對：[Hawstein](https://github.com/Hawstein)

# 字符串和字符（Strings and Characters）
-----------------

本頁包含內容：

- [字符串字面量](#string_literals)
- [初始化空字符串](#initializing_an_empty_string)
- [字符串可變性](#string_mutability)
- [字符串是值類型](#strings_are_value_types)
- [使用字符](#working_with_characters)
- [計算字符數量](#counting_characters)
- [連接字符串和字符](#concatenating_strings_and_characters)
- [字符串插值](#string_interpolation)
- [比較字符串](#comparing_strings)
- [字符串大小寫](#uppercase_and_lowercase_strings)
- [Unicode](#unicode)

`String`是例如「hello, world」，「海賊王」 這樣的有序的`Character`（字符）類型的值的集合，通過`String`類型來表示。

Swift 的`String`和`Character`類型提供了一個快速的，兼容 Unicode 的方式來處理代碼中的文本信息。
創建和操作字符串的語法與 C 語言中字符串操作相似，輕量並且易讀。
字符串連接操作只需要簡單地通過`+`號將兩個字符串相連即可。
與 Swift 中其他值一樣，能否更改字符串的值，取決於其被定義為常量還是變量。

儘管語法簡易，但`String`類型是一種快速、現代化的字符串實現。
每一個字符串都是由獨立編碼的 Unicode 字符組成，並提供了以不同 Unicode 表示（representations）來訪問這些字符的支持。

Swift 可以在常量、變量、字面量和表達式中進行字符串插值操作，可以輕鬆創建用於展示、存儲和打印的自定義字符串。

> 注意：  
Swift 的`String`類型與 Foundation `NSString`類進行了無縫橋接。如果您利用 Cocoa 或 Cocoa Touch 中的 Foundation 框架進行工作。所有`NSString` API 都可以調用您創建的任意`String`類型的值。除此之外，還可以使用本章介紹的`String`特性。您也可以在任意要求傳入`NSString`實例作為參數的 API 中使用`String`類型的值作為替代。
>更多關於在 Foundation 和 Cocoa 中使用`String`的信息請查看 [Using Swift with Cocoa and Objective-C](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/BuildingCocoaApps/index.html#//apple_ref/doc/uid/TP40014216)。  

<a name="string_literals"></a>
## 字符串字面量（String Literals）

您可以在您的代碼中包含一段預定義的字符串值作為字符串字面量。
字符串字面量是由雙引號 ("") 包裹著的具有固定順序的文本字符集。

字符串字面量可以用於為常量和變量提供初始值。

```swift
let someString = "Some string literal value"
```

> 注意：  
`someString`變量通過字符串字面量進行初始化，Swift 因此推斷該變量為`String`類型。

字符串字面量可以包含以下特殊字符：

* 轉義字符`\0`(空字符)、`\\`(反斜線)、`\t`(水平製表符)、`\n`(換行符)、`\r`(回車符)、`\"`(雙引號)、`\'`(單引號)。
* 單字節 Unicode 標量，寫成`\xnn`，其中`nn`為兩位十六進制數。
* 雙字節 Unicode 標量，寫成`\unnnn`，其中`nnnn`為四位十六進制數。
* 四字節 Unicode 標量，寫成`\Unnnnnnnn`，其中`nnnnnnnn`為八位十六進制數。

下面的代碼為各種特殊字符的使用示例。
`wiseWords`常量包含了兩個轉移特殊字符 (雙括號)；
`dollarSign`、`blackHeart`和`sparklingHeart`常量演示了三種不同格式的 Unicode 標量：

```swift
let wiseWords = "\"我是要成為海賊王的男人\" - 路飛"
// "我是要成為海賊王的男人" - 路飛
let dollarSign = "\x24"             // $,  Unicode 標量 U+0024
let blackHeart = "\u2665"           // □,  Unicode 標量 U+2665
let sparklingHeart = "\U0001F496"  // □欠Unicode 標量 U+1F496
```

<a name="initializing_an_empty_string"></a>
## 初始化空字符串 (Initializing an Empty String)

為了構造一個很長的字符串，可以創建一個空字符串作為初始值。
可以將空的字符串字面量賦值給變量，也可以初始化一個新的`String`實例：

```swift
var emptyString = ""               // 空字符串字面量
var anotherEmptyString = String()  // 初始化 String 實例
// 兩個字符串均為空並等價。
```

您可以通過檢查其`Boolean`類型的`isEmpty`屬性來判斷該字符串是否為空：

```swift
if emptyString.isEmpty {
    println("什麼都沒有")
}
// 打印輸出："什麼都沒有"
```

<a name="string_mutability"></a>
## 字符串可變性 (String Mutability)

您可以通過將一個特定字符串分配給一個變量來對其進行修改，或者分配給一個常量來保證其不會被修改：

```swift
var variableString = "Horse"
variableString += " and carriage"
// variableString 現在為 "Horse and carriage"
let constantString = "Highlander"
constantString += " and another Highlander"
// 這會報告一個編譯錯誤 (compile-time error) - 常量不可以被修改。
```

> 注意：  
在 Objective-C 和 Cocoa 中，您通過選擇兩個不同的類(`NSString`和`NSMutableString`)來指定該字符串是否可以被修改，Swift 中的字符串是否可以修改僅通過定義的是變量還是常量來決定，實現了多種類型可變性操作的統一。

<a name="strings_are_value_types"></a>
## 字符串是值類型（Strings Are Value Types）

Swift 的`String`類型是值類型。
如果您創建了一個新的字符串，那麼當其進行常量、變量賦值操作或在函數/方法中傳遞時，會進行值拷貝。
任何情況下，都會對已有字符串值創建新副本，並對該新副本進行傳遞或賦值操作。
值類型在 [結構體和枚舉是值類型](09_Classes_and_Structures.html#structures_and_enumerations_are_value_types) 中進行了說明。

> 注意：  
與 Cocoa 中的`NSString`不同，當您在 Cocoa 中創建了一個`NSString`實例，並將其傳遞給一個函數/方法，或者賦值給一個變量，您傳遞或賦值的是該`NSString`實例的一個引用，除非您特別要求進行值拷貝，否則字符串不會生成新的副本來進行賦值操作。

Swift 默認字符串拷貝的方式保證了在函數/方法中傳遞的是字符串的值。
很明顯無論該值來自於哪裡，都是您獨自擁有的。
您可以放心您傳遞的字符串本身不會被更改。

在實際編譯時，Swift 編譯器會優化字符串的使用，使實際的複製只發生在絕對必要的情況下，這意味著您將字符串作為值類型的同時可以獲得極高的性能。

<a name="working_with_characters"></a>
## 使用字符（Working with Characters）

Swift 的`String`類型表示特定序列的`Character`（字符） 類型值的集合。
每一個字符值代表一個 Unicode 字符。
您可利用`for-in`循環來遍歷字符串中的每一個字符：

```swift
for character in "Dog!□梠{
    println(character)
}
// D
// o
// g
// !
// □捊```

for-in 循環在 [For Loops](05_Control_Flow.html#for_loops) 中進行了詳細描述。

另外，通過標明一個`Character`類型註解並通過字符字面量進行賦值，可以建立一個獨立的字符常量或變量：

```swift
let yenSign: Character = "￥"
```

<a name="counting_characters"></a>
## 計算字符數量 (Counting Characters)

通過調用全局`countElements`函數，並將字符串作為參數進行傳遞，可以獲取該字符串的字符數量。

```swift
let unusualMenagerie = "Koala □謠Snail □□Penguin □笠Dromedary □□
println("unusualMenagerie has \(countElements(unusualMenagerie)) characters")
// 打印輸出："unusualMenagerie has 40 characters"
```

> 注意：  
不同的 Unicode 字符以及相同 Unicode 字符的不同表示方式可能需要不同數量的內存空間來存儲。所以 Swift 中的字符在一個字符串中並不一定佔用相同的內存空間。因此字符串的長度不得不通過迭代字符串中每一個字符的長度來進行計算。如果您正在處理一個長字符串，需要注意`countElements`函數必須遍歷字符串中的字符以精準計算字符串的長度。
> 另外需要注意的是通過`countElements`返回的字符數量並不總是與包含相同字符的`NSString`的`length`屬性相同。`NSString`的`length`屬性是基於利用 UTF-16 表示的十六位代碼單元數字，而不是基於 Unicode 字符。為了解決這個問題，`NSString`的`length`屬性在被 Swift 的`String`訪問時會成為`utf16count`。  

<a name="concatenating_strings_and_characters"></a>
## 連接字符串和字符 (Concatenating Strings and Characters)

字符串和字符的值可以通過加法運算符（`+`）相加在一起並創建一個新的字符串值：

```swift
let string1 = "hello"
let string2 = " there"
let character1: Character = "!"
let character2: Character = "?"

let stringPlusCharacter = string1 + character1        // 等於 "hello!"
let stringPlusString = string1 + string2              // 等於 "hello there"
let characterPlusString = character1 + string1        // 等於 "!hello"
let characterPlusCharacter = character1 + character2  // 等於 "!?"
```

您也可以通過加法賦值運算符 (`+=`) 將一個字符串或者字符添加到一個已經存在字符串變量上：

```swift
var instruction = "look over"
instruction += string2
// instruction 現在等於 "look over there"

var welcome = "good morning"
welcome += character1
// welcome 現在等於 "good morning!"
```

> 注意：  
您不能將一個字符串或者字符添加到一個已經存在的字符變量上，因為字符變量只能包含一個字符。

<a name="string_interpolation"></a>
## 字符串插值 (String Interpolation)

字符串插值是一種構建新字符串的方式，可以在其中包含常量、變量、字面量和表達式。
您插入的字符串字面量的每一項都被包裹在以反斜線為前綴的圓括號中：

```swift
let multiplier = 3
let message = "\(multiplier) 乘以 2.5 是 \(Double(multiplier) * 2.5)"
// message 是 "3 乘以 2.5 是 7.5"
```

在上面的例子中，`multiplier`作為`\(multiplier)`被插入到一個字符串字面量中。
當創建字符串執行插值計算時此佔位符會被替換為`multiplier`實際的值。

`multiplier`的值也作為字符串中後面表達式的一部分。
該表達式計算`Double(multiplier) * 2.5`的值並將結果 (7.5) 插入到字符串中。
在這個例子中，表達式寫為`\(Double(multiplier) * 2.5)`並包含在字符串字面量中。

> 注意：  
插值字符串中寫在括號中的表達式不能包含非轉義雙引號 (`"`) 和反斜槓 (`\`)，並且不能包含回車或換行符。

<a name="comparing_strings"></a>
## 比較字符串 (Comparing Strings)

Swift 提供了三種方式來比較字符串的值：字符串相等、前綴相等和後綴相等。

<a name="string_equality"></a>
### 字符串相等 (String Equality)

如果兩個字符串以同一順序包含完全相同的字符，則認為兩者字符串相等：

```swift
let quotation = "我們是一樣一樣滴."
let sameQuotation = "我們是一樣一樣滴."
if quotation == sameQuotation {
    println("這兩個字符串被認為是相同的")
}
// 打印輸出："這兩個字符串被認為是相同的"
```

<a name="prefix_and_suffix_equality"></a>
### 前綴/後綴相等 (Prefix and Suffix Equality)

通過調用字符串的`hasPrefix`/`hasSuffix`方法來檢查字符串是否擁有特定前綴/後綴。
兩個方法均需要以字符串作為參數傳入並傳出`Boolean`值。
兩個方法均執行基本字符串和前綴/後綴字符串之間逐個字符的比較操作。

下面的例子以一個字符串數組表示莎士比亞話劇《羅密歐與朱麗葉》中前兩場的場景位置：

```swift
let romeoAndJuliet = [
    "Act 1 Scene 1: Verona, A public place",
    "Act 1 Scene 2: Capulet's mansion",
    "Act 1 Scene 3: A room in Capulet's mansion",
    "Act 1 Scene 4: A street outside Capulet's mansion",
    "Act 1 Scene 5: The Great Hall in Capulet's mansion",
    "Act 2 Scene 1: Outside Capulet's mansion",
    "Act 2 Scene 2: Capulet's orchard",
    "Act 2 Scene 3: Outside Friar Lawrence's cell",
    "Act 2 Scene 4: A street in Verona",
    "Act 2 Scene 5: Capulet's mansion",
    "Act 2 Scene 6: Friar Lawrence's cell"
]
```

您可以利用`hasPrefix`方法來計算話劇中第一幕的場景數：

```swift
var act1SceneCount = 0
for scene in romeoAndJuliet {
    if scene.hasPrefix("Act 1 ") {
        ++act1SceneCount
    }
}
println("There are \(act1SceneCount) scenes in Act 1")
// 打印輸出："There are 5 scenes in Act 1"
```

相似地，您可以用`hasSuffix`方法來計算發生在不同地方的場景數：

```swift
var mansionCount = 0
var cellCount = 0
for scene in romeoAndJuliet {
    if scene.hasSuffix("Capulet's mansion") {
        ++mansionCount
    } else if scene.hasSuffix("Friar Lawrence's cell") {
        ++cellCount
    }
}
println("\(mansionCount) mansion scenes; \(cellCount) cell scenes")
// 打印輸出："6 mansion scenes; 2 cell scenes」
```

<a name="uppercase_and_lowercase_strings"></a>
### 大寫和小寫字符串（Uppercase and Lowercase Strings）

您可以通過字符串的`uppercaseString`和`lowercaseString`屬性來訪問大寫/小寫版本的字符串。

```swift
let normal = "Could you help me, please?"
let shouty = normal.uppercaseString
// shouty 值為 "COULD YOU HELP ME, PLEASE?"
let whispered = normal.lowercaseString
// whispered 值為 "could you help me, please?"
```

<a name="unicode"></a>
## Unicode

Unicode 是一個國際標準，用於文本的編碼和表示。
它使您可以用標準格式表示來自任意語言幾乎所有的字符，並能夠對文本文件或網頁這樣的外部資源中的字符進行讀寫操作。

Swift 的字符串和字符類型是完全兼容 Unicode 標準的，它支持如下所述的一系列不同的 Unicode 編碼。

<a name="unicode_terminology"></a>
### Unicode 術語（Unicode Terminology）

Unicode 中每一個字符都可以被解釋為一個或多個 unicode 標量。
字符的 unicode 標量是一個唯一的21位數字(和名稱)，例如`U+0061`表示小寫的拉丁字母A ("a")，`U+1F425`表示小雞表情 ("□墩

當 Unicode 字符串被寫進文本文件或其他存儲結構當中，這些 unicode 標量將會按照 Unicode 定義的集中格式之一進行編碼。其包括`UTF-8`（以8位代碼單元進行編碼） 和`UTF-16`（以16位代碼單元進行編碼）。

<a name="unicode_representations_of_strings"></a>
### 字符串的 Unicode 表示（Unicode Representations of Strings）

Swift 提供了幾種不同的方式來訪問字符串的 Unicode 表示。

您可以利用`for-in`來對字符串進行遍歷，從而以 Unicode 字符的方式訪問每一個字符值。
該過程在 [使用字符](#working_with_characters) 中進行了描述。

另外，能夠以其他三種 Unicode 兼容的方式訪問字符串的值：

* UTF-8 代碼單元集合 (利用字符串的`utf8`屬性進行訪問)
* UTF-16 代碼單元集合 (利用字符串的`utf16`屬性進行訪問)
* 21位的 Unicode 標量值集合 (利用字符串的`unicodeScalars`屬性進行訪問)

下面由`D``o``g``!`和`□栨`DOG FACE`，Unicode 標量為`U+1F436`)組成的字符串中的每一個字符代表著一種不同的表示：

```swift
let dogString = "Dog!□皂
```

<a name="UTF-8"></a>
### UTF-8

您可以通過遍歷字符串的`utf8`屬性來訪問它的`UTF-8`表示。
其為`UTF8View`類型的屬性，`UTF8View`是無符號8位 (`UInt8`) 值的集合，每一個`UInt8`值都是一個字符的 UTF-8 表示：

```swift
for codeUnit in dogString.utf8 {
    print("\(codeUnit) ")
}
print("\n")
// 68 111 103 33 240 159 144 182
```

上面的例子中，前四個10進制代碼單元值 (68, 111, 103, 33) 代表了字符`D` `o` `g`和`!`，它們的 UTF-8 表示與 ASCII 表示相同。
後四個代碼單元值 (240, 159, 144, 182) 是`DOG FACE`的4字節 UTF-8 表示。

<a name="UTF-16"></a>
### UTF-16

您可以通過遍歷字符串的`utf16`屬性來訪問它的`UTF-16`表示。
其為`UTF16View`類型的屬性，`UTF16View`是無符號16位 (`UInt16`) 值的集合，每一個`UInt16`都是一個字符的 UTF-16 表示：

```swift
for codeUnit in dogString.utf16 {
    print("\(codeUnit) ")
}
print("\n")
// 68 111 103 33 55357 56374
```

同樣，前四個代碼單元值 (68, 111, 103, 33) 代表了字符`D` `o` `g`和`!`，它們的 UTF-16 代碼單元和 UTF-8 完全相同。

第五和第六個代碼單元值 (55357 和 56374) 是`DOG FACE`字符的UTF-16 表示。
第一個值為`U+D83D`(十進制值為 55357)，第二個值為`U+DC36`(十進制值為 56374)。

<a name="unicode_scalars"></a>
### Unicode 標量 (Unicode Scalars)

您可以通過遍歷字符串的`unicodeScalars`屬性來訪問它的 Unicode 標量表示。
其為`UnicodeScalarView`類型的屬性， `UnicodeScalarView`是`UnicodeScalar`的集合。
`UnicodeScalar`是21位的 Unicode 代碼點。

每一個`UnicodeScalar`擁有一個值屬性，可以返回對應的21位數值，用`UInt32`來表示。

```swift
for scalar in dogString.unicodeScalars {
    print("\(scalar.value) ")
}
print("\n")
// 68 111 103 33 128054
```

同樣，前四個代碼單元值 (68, 111, 103, 33) 代表了字符`D` `o` `g`和`!`。
第五位數值，128054，是一個十六進制1F436的十進製表示。
其等同於`DOG FACE`的Unicode 標量 U+1F436。

作為查詢字符值屬性的一種替代方法，每個`UnicodeScalar`值也可以用來構建一個新的字符串值，比如在字符串插值中使用：

```swift
for scalar in dogString.unicodeScalars {
    println("\(scalar) ")
}
// D
// o
// g
// !
// □捊```
