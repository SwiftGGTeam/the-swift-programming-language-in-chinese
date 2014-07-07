> 翻譯：[numbbbbb](https://github.com/numbbbbb), [lyuka](https://github.com/lyuka), [JaySurplus](https://github.com/JaySurplus)    
> 校對：[lslxdx](https://github.com/lslxdx)

# 基礎部分
-----------------

本頁包含內容：

- [常量和變量](#constants_and_variables)
- [註釋](#comments)
- [分號](#semicolons)
- [整數](#integers)
- [浮點數](#floating-point_numbers)
- [類型安全和類型推斷](#type_safety_and_type_inference)
- [數值型字面量](#numeric_literals)
- [數值型類型轉換](#numeric_type_conversion)
- [類型別名](#type_aliases)
- [布爾值](#booleans)
- [元組](#tuples)
- [可選](#optionals)
- [斷言](#assertions)

Swift 是 iOS 和 OS X 應用開發的一門新語言。然而，如果你有 C 或者 Objective-C 開發經驗的話，你會發現 Swift 的很多內容都是你熟悉的。

Swift 的類型是在 C 和 Objective-C 的基礎上提出的，`Int`是整型；`Double`和`Float`是浮點型；`Bool`是布爾型；`String`是字符串。Swift 還有兩個有用的集合類型，`Array`和`Dictionary`，請參考[集合類型](04_Collection_Types.html)。

就像 C 語言一樣，Swift 使用變量來進行存儲並通過變量名來關聯值。在 Swift 中，值不可變的變量有著廣泛的應用，它們就是常量，而且比 C 語言的常量更強大。在 Swift 中，如果你要處理的值不需要改變，那使用常量可以讓你的代碼更加安全並且更好地表達你的意圖。

除了我們熟悉的類型，Swift 還增加了 Objective-C 中沒有的類型比如元組（Tuple）。元組可以讓你創建或者傳遞一組數據，比如作為函數的返回值時，你可以用一個元組可以返回多個值。

Swift 還增加了可選（Optional）類型，用於處理值缺失的情況。可選表示「那兒有一個值，並且它等於 x 」或者「那兒沒有值」。可選有點像在 Objective-C 中使用`nil`，但是它可以用在任何類型上，不僅僅是類。可選類型比 Objective-C 中的`nil`指針更加安全也更具表現力，它是 Swift 許多強大特性的重要組成部分。

Swift 是一個類型安全的語言，可選就是一個很好的例子。Swift 可以讓你清楚地知道值的類型。如果你的代碼期望得到一個`String`，類型安全會阻止你不小心傳入一個`Int`。你可以在開發階段盡早發現並修正錯誤。

<a name="constants_and_variables"></a>
## 常量和變量

常量和變量把一個名字（比如`maximumNumberOfLoginAttempts`或者`welcomeMessage`）和一個指定類型的值（比如數字`10`或者字符串`"Hello"`）關聯起來。常量的值一旦設定就不能改變，而變量的值可以隨意更改。

### 聲明常量和變量

常量和變量必須在使用前聲明，用`let`來聲明常量，用`var`來聲明變量。下面的例子展示了如何用常量和變量來記錄用戶嘗試登錄的次數：

```swift
let maximumNumberOfLoginAttempts = 10
var currentLoginAttempt = 0
```

這兩行代碼可以被理解為：

「聲明一個名字是`maximumNumberOfLoginAttempts`的新常量，並給它一個值`10`。然後，聲明一個名字是`currentLoginAttempt`的變量並將它的值初始化為`0`.」

在這個例子中，允許的最大嘗試登錄次數被聲明為一個常量，因為這個值不會改變。當前嘗試登錄次數被聲明為一個變量，因為每次嘗試登錄失敗的時候都需要增加這個值。

你可以在一行中聲明多個常量或者多個變量，用逗號隔開：

```swift
var x = 0.0, y = 0.0, z = 0.0
```

>注意：  
如果你的代碼中有不需要改變的值，請使用`let`關鍵字將它聲明為常量。只將需要改變的值聲明為變量。

### 類型標注

當你聲明常量或者變量的時候可以加上_類型標注（type annotation）_，說明常量或者變量中要存儲的值的類型。如果要添加類型標注，需要在常量或者變量名後面加上一個冒號和空格，然後加上類型名稱。

這個例子給`welcomeMessage`變量添加了類型標注，表示這個變量可以存儲`String`類型的值：

```swift
var welcomeMessage: String
```

聲明中的冒號代表著「是...類型」，所以這行代碼可以被理解為：

「聲明一個類型為`String`，名字為`welcomeMessage`的變量。」

「類型為`String`」的意思是「可以存儲任意`String`類型的值。」

`welcomeMessage`變量現在可以被設置成任意字符串：

```swift
welcomeMessage = "Hello"
```

> 注意：  
一般來說你很少需要寫類型標注。如果你在聲明常量或者變量的時候賦了一個初始值，Swift可以推斷出這個常量或者變量的類型，請參考[類型安全和類型推斷](#type_safety_and_type_inference)。在上面的例子中，沒有給`welcomeMessage`賦初始值，所以變量`welcomeMessage`的類型是通過一個類型標注指定的，而不是通過初始值推斷的。

### 常量和變量的命名

你可以用任何你喜歡的字符作為常量和變量名，包括 Unicode 字符：

```swift
let π = 3.14159
let 你好 = "你好世界"
let □氟□= "dogcow"
```

常量與變量名不能包含數學符號，箭頭，保留的（或者非法的）Unicode 碼位，連線與製表符。也不能以數字開頭，但是可以在常量與變量名的其他地方包含數字。

一旦你將常量或者變量聲明為確定的類型，你就不能使用相同的名字再次進行聲明，或者改變其存儲的值的類型。同時，你也不能將常量與變量進行互轉。

> 注意：  
如果你需要使用與Swift保留關鍵字相同的名稱作為常量或者變量名，你可以使用反引號（`）將關鍵字包圍的方式將其作為名字使用。無論如何，你應當避免使用關鍵字作為常量或變量名，除非你別無選擇。

你可以更改現有的變量值為其他同類型的值，在下面的例子中，`friendlyWelcome`的值從`"Hello!"`改為了`"Bonjour!"`:

```swift
var friendlyWelcome = "Hello!"
friendlyWelcome = "Bonjour!"
// friendlyWelcome 現在是 "Bonjour!"
```

與變量不同，常量的值一旦被確定就不能更改了。嘗試這樣做會導致編譯時報錯：

```swift
let languageName = "Swift"
languageName = "Swift++"
// 這會報編譯時錯誤 - languageName 不可改變
```

### 輸出常量和變量

你可以用`println`函數來輸出當前常量或變量的值:

```swift
println(friendlyWelcome)
// 輸出 "Bonjour!"
```

`println`是一個用來輸出的全局函數，輸出的內容會在最後換行。如果你用 Xcode，`println`將會輸出內容到「console」面板上。(另一種函數叫`print`，唯一區別是在輸出內容最後不會換行。)

`println`函數輸出傳入的`String`值：

```swift
println("This is a string")
// 輸出 "This is a string"
```

與 Cocoa 裡的`NSLog`函數類似的是，`println`函數可以輸出更複雜的信息。這些信息可以包含當前常量和變量的值。

Swift 用_字符串插值（string interpolation）_的方式把常量名或者變量名當做佔位符加入到長字符串中，Swift 會用當前常量或變量的值替換這些佔位符。將常量或變量名放入圓括號中，並在開括號前使用反斜槓將其轉義：

```swift
println("The current value of friendlyWelcome is \(friendlyWelcome)")
// 輸出 "The current value of friendlyWelcome is Bonjour!
```

> 注意：  
字符串插值所有可用的選項，請參考[字符串插值](03_Strings_and_Characters.html#string_interpolation)。

<a name="comments"></a>
## 註釋
請將你的代碼中的非執行文本註釋成提示或者筆記以方便你將來閱讀。Swift 的編譯器將會在編譯代碼時自動忽略掉註釋部分。

Swift 中的註釋與C 語言的註釋非常相似。單行註釋以雙正斜槓（`//`）作為起始標記:

```swift
// 這是一個註釋
```

你也可以進行多行註釋，其起始標記為單個正斜槓後跟隨一個星號（`/*`），終止標記為一個星號後跟隨單個正斜槓（`*/`）:

```swift
/* 這是一個,
多行註釋 */
```

與 C 語言多行註釋不同，Swift 的多行註釋可以嵌套在其它的多行註釋之中。你可以先生成一個多行註釋塊，然後在這個註釋塊之中再嵌套成第二個多行註釋。終止註釋時先插入第二個註釋塊的終止標記，然後再插入第一個註釋塊的終止標記：

```swift
/* 這是第一個多行註釋的開頭
/* 這是第二個被嵌套的多行註釋 */
這是第一個多行註釋的結尾 */
```

通過運用嵌套多行註釋，你可以快速方便的註釋掉一大段代碼，即使這段代碼之中已經含有了多行註釋塊。

<a name="semicolons"></a>
## 分號
與其他大部分編程語言不同，Swift 並不強制要求你在每條語句的結尾處使用分號（`;`），當然，你也可以按照你自己的習慣添加分號。有一種情況下必須要用分號，即你打算在同一行內寫多條獨立的語句：

```swift
let cat = "□□ println(cat)
// 輸出 "□□
```

<a name="integers"></a>
## 整數

整數就是沒有小數部分的數字，比如`42`和`-23`。整數可以是`有符號`（正、負、零）或者`無符號`（正、零）。

Swift 提供了8，16，32和64位的有符號和無符號整數類型。這些整數類型和 C 語言的命名方式很像，比如8位無符號整數類型是`UInt8`，32位有符號整數類型是`Int32`。就像 Swift 的其他類型一樣，整數類型採用大寫命名法。

### 整數範圍

你可以訪問不同整數類型的`min`和`max`屬性來獲取對應類型的最大值和最小值：

```swift
let minValue = UInt8.min  // minValue 為 0，是 UInt8 類型的最小值
let maxValue = UInt8.max  // maxValue 為 255，是 UInt8 類型的最大值
```

### Int

一般來說，你不需要專門指定整數的長度。Swift 提供了一個特殊的整數類型`Int`，長度與當前平台的原生字長相同：

* 在32位平台上，`Int`和`Int32`長度相同。
* 在64位平台上，`Int`和`Int64`長度相同。

除非你需要特定長度的整數，一般來說使用`Int`就夠了。這可以提高代碼一致性和可復用性。即使是在32位平台上，`Int`可以存儲的整數範圍也可以達到`-2147483648`~`2147483647`，大多數時候這已經足夠大了。

### UInt

Swift 也提供了一個特殊的無符號類型`UInt`，長度與當前平台的原生字長相同：

* 在32位平台上，`UInt`和`UInt32`長度相同。
* 在64位平台上，`UInt`和`UInt64`長度相同。

> 注意：  
盡量不要使用`UInt`，除非你真的需要存儲一個和當前平台原生字長相同的無符號整數。除了這種情況，最好使用`Int`，即使你要存儲的值已知是非負的。統一使用`Int`可以提高代碼的可復用性，避免不同類型數字之間的轉換，並且匹配數字的類型推斷，請參考[類型安全和類型推斷](#type_safety_and_type_inference)。

<a name="floating-point_numbers"></a>
## 浮點數

浮點數是有小數部分的數字，比如`3.14159`，`0.1`和`-273.15`。

浮點類型比整數類型表示的範圍更大，可以存儲比`Int`類型更大或者更小的數字。Swift 提供了兩種有符號浮點數類型：

* `Double`表示64位浮點數。當你需要存儲很大或者很高精度的浮點數時請使用此類型。
* `Float`表示32位浮點數。精度要求不高的話可以使用此類型。

> 注意：  
`Double`精確度很高，至少有15位數字，而`Float`最少只有6位數字。選擇哪個類型取決於你的代碼需要處理的值的範圍。

<a name="type_safety_and_type_inference"></a>
## 類型安全和類型推斷

Swift 是一個_類型安全（type safe）_的語言。類型安全的語言可以讓你清楚地知道代碼要處理的值的類型。如果你的代碼需要一個`String`，你絕對不可能不小心傳進去一個`Int`。

由於 Swift 是類型安全的，所以它會在編譯你的代碼時進行_類型檢查（type checks）_，並把不匹配的類型標記為錯誤。這可以讓你在開發的時候盡早發現並修復錯誤。

當你要處理不同類型的值時，類型檢查可以幫你避免錯誤。然而，這並不是說你每次聲明常量和變量的時候都需要顯式指定類型。如果你沒有顯式指定類型，Swift 會使用_類型推斷（type inference）_來選擇合適的類型。有了類型推斷，編譯器可以在編譯代碼的時候自動推斷出表達式的類型。原理很簡單，只要檢查你賦的值即可。

因為有類型推斷，和 C 或者 Objective-C 比起來 Swift 很少需要聲明類型。常量和變量雖然需要明確類型，但是大部分工作並不需要你自己來完成。

當你聲明常量或者變量並賦初值的時候類型推斷非常有用。當你在聲明常量或者變量的時候賦給它們一個_字面量（literal value 或 literal）_即可觸發類型推斷。（字面量就是會直接出現在你代碼中的值，比如`42`和`3.14159`。）

例如，如果你給一個新常量賦值`42`並且沒有標明類型，Swift 可以推斷出常量類型是`Int`，因為你給它賦的初始值看起來像一個整數：

```swift
let meaningOfLife = 42
// meaningOfLife 會被推測為 Int 類型
```

同理，如果你沒有給浮點字面量標明類型，Swift 會推斷你想要的是`Double`：

```swift
let pi = 3.14159
// pi 會被推測為 Double 類型
```

當推斷浮點數的類型時，Swift 總是會選擇`Double`而不是`Float`。

如果表達式中同時出現了整數和浮點數，會被推斷為`Double`類型：

```swift
let anotherPi = 3 + 0.14159
// anotherPi 會被推測為 Double 類型
```

原始值`3`沒有顯式聲明類型，而表達式中出現了一個浮點字面量，所以表達式會被推斷為`Double`類型。

<a name="numeric_literals"></a>
## 數值型字面量

整數字面量可以被寫作：

* 一個十進制數，沒有前綴
* 一個二進制數，前綴是`0b`
* 一個八進制數，前綴是`0o`
* 一個十六進制數，前綴是`0x`

下面的所有整數字面量的十進制值都是`17`:

```swift
let decimalInteger = 17
let binaryInteger = 0b10001       // 二進制的17
let octalInteger = 0o21           // 八進制的17
let hexadecimalInteger = 0x11     // 十六進制的17
```

浮點字面量可以是十進制（沒有前綴）或者是十六進制（前綴是`0x`）。小數點兩邊必須有至少一個十進制數字（或者是十六進制的數字）。浮點字面量還有一個可選的_指數（exponent）_，在十進制浮點數中通過大寫或者小寫的`e`來指定，在十六進制浮點數中通過大寫或者小寫的`p`來指定。

如果一個十進制數的指數為`exp`，那這個數相當於基數和10^exp的乘積：
* `1.25e2` 表示 1.25 × 10^2，等於 `125.0`。
* `1.25e-2` 表示 1.25 × 10^-2，等於 `0.0125`。

如果一個十六進制數的指數為`exp`，那這個數相當於基數和2^exp的乘積：
* `0xFp2` 表示 15 × 2^2，等於 `60.0`。
* `0xFp-2` 表示 15 × 2^-2，等於 `3.75`。

下面的這些浮點字面量都等於十進制的`12.1875`：

```swift
let decimalDouble = 12.1875
let exponentDouble = 1.21875e1
let hexadecimalDouble = 0xC.3p0
```

數值類字面量可以包括額外的格式來增強可讀性。整數和浮點數都可以添加額外的零並且包含下劃線，並不會影響字面量：

```swift
let paddedDouble = 000123.456
let oneMillion = 1_000_000
let justOverOneMillion = 1_000_000.000_000_1
```

<a name="numeric_type_conversion"></a>
## 數值型類型轉換

通常來講，即使代碼中的整數常量和變量已知非負，也請使用`Int`類型。總是使用默認的整數類型可以保證你的整數常量和變量可以直接被復用並且可以匹配整數類字面量的類型推斷。
只有在必要的時候才使用其他整數類型，比如要處理外部的長度明確的數據或者為了優化性能、內存佔用等等。使用顯式指定長度的類型可以及時發現值溢出並且可以暗示正在處理特殊數據。

### 整數轉換

不同整數類型的變量和常量可以存儲不同範圍的數字。`Int8`類型的常量或者變量可以存儲的數字範圍是`-128`~`127`，而`UInt8`類型的常量或者變量能存儲的數字範圍是`0`~`255`。如果數字超出了常量或者變量可存儲的範圍，編譯的時候會報錯：

```swift
let cannotBeNegative: UInt8 = -1
// UInt8 類型不能存儲負數，所以會報錯
let tooBig: Int8 = Int8.max + 1
// Int8 類型不能存儲超過最大值的數，所以會報錯
```

由於每種整數類型都可以存儲不同範圍的值，所以你必須根據不同情況選擇性使用數值型類型轉換。這種選擇性使用的方式，可以預防隱式轉換的錯誤並讓你的代碼中的類型轉換意圖變得清晰。

要將一種數字類型轉換成另一種，你要用當前值來初始化一個期望類型的新數字，這個數字的類型就是你的目標類型。在下面的例子中，常量`twoThousand`是`UInt16`類型，然而常量`one`是`UInt8`類型。它們不能直接相加，因為它們類型不同。所以要調用`UInt16(one)`來創建一個新的`UInt16`數字並用`one`的值來初始化，然後使用這個新數字來計算：

```swift
let twoThousand: UInt16 = 2_000
let one: UInt8 = 1
let twoThousandAndOne = twoThousand + UInt16(one)
```

現在兩個數字的類型都是`UInt16`，可以進行相加。目標常量`twoThousandAndOne`的類型被推斷為`UInt16`，因為它是兩個`UInt16`值的和。

`SomeType(ofInitialValue)`是調用 Swift 構造器並傳入一個初始值的默認方法。在語言內部，`UInt16`有一個構造器，可以接受一個`UInt8`類型的值，所以這個構造器可以用現有的`UInt8`來創建一個新的`UInt16`。注意，你並不能傳入任意類型的值，只能傳入`UInt16`內部有對應構造器的值。不過你可以擴展現有的類型來讓它可以接收其他類型的值（包括自定義類型），請參考[擴展](20_Extensions.html)。

### 整數和浮點數轉換

整數和浮點數的轉換必須顯式指定類型：

```swift
let three = 3
let pointOneFourOneFiveNine = 0.14159
let pi = Double(three) + pointOneFourOneFiveNine
// pi 等於 3.14159，所以被推測為 Double 類型
```

這個例子中，常量`three`的值被用來創建一個`Double`類型的值，所以加號兩邊的數類型須相同。如果不進行轉換，兩者無法相加。

浮點數到整數的反向轉換同樣行，整數類型可以用`Double`或者`Float`類型來初始化：

```swift
let integerPi = Int(pi)
// integerPi 等於 3，所以被推測為 Int 類型
```

當用這種方式來初始化一個新的整數值時，浮點值會被截斷。也就是說`4.75`會變成`4`，`-3.9`會變成`-3`。

> 注意：  
結合數字類常量和變量不同於結合數字類字面量。字面量`3`可以直接和字面量`0.14159`相加，因為數字字面量本身沒有明確的類型。它們的類型只在編譯器需要求值的時候被推測。

<a name="type_aliases"></a>
## 類型別名

_類型別名（type aliases）_就是給現有類型定義另一個名字。你可以使用`typealias`關鍵字來定義類型別名。

當你想要給現有類型起一個更有意義的名字時，類型別名非常有用。假設你正在處理特定長度的外部資源的數據：

```swift
typealias AudioSample = UInt16
```

定義了一個類型別名之後，你可以在任何使用原始名的地方使用別名：

```swift
var maxAmplitudeFound = AudioSample.min
// maxAmplitudeFound 現在是 0
```

本例中，`AudioSample`被定義為`UInt16`的一個別名。因為它是別名，`AudioSample.min`實際上是`UInt16.min`，所以會給`maxAmplitudeFound`賦一個初值`0`。

<a name="booleans"></a>
## 布爾值

Swift 有一個基本的_布爾（Boolean）_類型，叫做`Bool`。布爾值指_邏輯上的（logical）_，因為它們只能是真或者假。Swift 有兩個布爾常量，`true`和`false`：

```swift
let orangesAreOrange = true
let turnipsAreDelicious = false
```

`orangesAreOrange`和`turnipsAreDelicious`的類型會被推斷為`Bool`，因為它們的初值是布爾字面量。就像之前提到的`Int`和`Double`一樣，如果你創建變量的時候給它們賦值`true`或者`false`，那你不需要將常量或者變量聲明為`Bool`類型。初始化常量或者變量的時候如果所賦的值類型已知，就可以觸發類型推斷，這讓 Swift 代碼更加簡潔並且可讀性更高。

當你編寫條件語句比如`if`語句的時候，布爾值非常有用：

```swift
if turnipsAreDelicious {
    println("Mmm, tasty turnips!")
} else {
    println("Eww, turnips are horrible.")
}
// 輸出 "Eww, turnips are horrible."
```

條件語句，例如`if`，請參考[控制流](05_Control_Flow.html)。

如果你在需要使用`Bool`類型的地方使用了非布爾值，Swift 的類型安全機制會報錯。下面的例子會報告一個編譯時錯誤：

```swift
let i = 1
if i {
    // 這個例子不會通過編譯，會報錯
}
```

然而，下面的例子是合法的：

```swift
let i = 1
if i == 1 {
    // 這個例子會編譯成功
}
```

`i == 1`的比較結果是`Bool`類型，所以第二個例子可以通過類型檢查。類似`i == 1`這樣的比較，請參考[基本操作符](05_Control_Flow.html)。

和 Swift 中的其他類型安全的例子一樣，這個方法可以避免錯誤並保證這塊代碼的意圖總是清晰的。

<a name="tuples"></a>
## 元組

_元組（tuples）_把多個值組合成一個復合值。元組內的值可以使任意類型，並不要求是相同類型。

下面這個例子中，`(404, "Not Found")`是一個描述 _HTTP 狀態碼（HTTP status code）_的元組。HTTP 狀態碼是當你請求網頁的時候 web 服務器返回的一個特殊值。如果你請求的網頁不存在就會返回一個`404 Not Found`狀態碼。

```swift
let http404Error = (404, "Not Found")
// http404Error 的類型是 (Int, String)，值是 (404, "Not Found")
```

`(404, "Not Found")`元組把一個`Int`值和一個`String`值組合起來表示 HTTP 狀態碼的兩個部分：一個數字和一個人類可讀的描述。這個元組可以被描述為「一個類型為`(Int, String)`的元組」。

你可以把任意順序的類型組合成一個元組，這個元組可以包含所有類型。只要你想，你可以創建一個類型為`(Int, Int, Int)`或者`(String, Bool)`或者其他任何你想要的組合的元組。

你可以將一個元組的內容_分解（decompose）_成單獨的常量和變量，然後你就可以正常使用它們了：

```swift
let (statusCode, statusMessage) = http404Error
println("The status code is \(statusCode)")
// 輸出 "The status code is 404"
println("The status message is \(statusMessage)")
// 輸出 "The status message is Not Found"
```

如果你只需要一部分元組值，分解的時候可以把要忽略的部分用下劃線（`_`）標記：

```swift
let (justTheStatusCode, _) = http404Error
println("The status code is \(justTheStatusCode)")
// 輸出 "The status code is 404"
```

此外，你還可以通過下標來訪問元組中的單個元素，下標從零開始：

```swift
println("The status code is \(http404Error.0)")
// 輸出 "The status code is 404"
println("The status message is \(http404Error.1)")
// 輸出 "The status message is Not Found"
```

你可以在定義元組的時候給單個元素命名：

```swift
let http200Status = (statusCode: 200, description: "OK")
```

給元組中的元素命名後，你可以通過名字來獲取這些元素的值：

```swift
println("The status code is \(http200Status.statusCode)")
// 輸出 "The status code is 200"
println("The status message is \(http200Status.description)")
// 輸出 "The status message is OK"
```

作為函數返回值時，元組非常有用。一個用來獲取網頁的函數可能會返回一個`(Int, String)`元組來描述是否獲取成功。和只能返回一個類型的值比較起來，一個包含兩個不同類型值的元組可以讓函數的返回信息更有用。請參考[函數參數與返回值](06_Functions.html#Function_Parameters_and_Return_Values)。

> 注意：  
元組在臨時組織值的時候很有用，但是並不適合創建複雜的數據結構。如果你的數據結構並不是臨時使用，請使用類或者結構體而不是元組。請參考[類和結構體](09_Classes_and_Structures.html)。

<a name="optionals"></a>
## 可選類型

使用_可選類型（optionals）_來處理值可能缺失的情況。可選類型表示：

* _有_值，等於 x

或者

* _沒有_值

> 注意：  
C 和 Objective-C 中並沒有可選類型這個概念。最接近的是 Objective-C 中的一個特性，一個方法要不返回一個對像要不返回`nil`，`nil`表示「缺少一個合法的對象」。然而，這只對對像起作用——對於結構體，基本的 C 類型或者枚舉類型不起作用。對於這些類型，Objective-C 方法一般會返回一個特殊值（比如`NSNotFound`）來暗示值缺失。這種方法假設方法的調用者知道並記得對特殊值進行判斷。然而，Swift 的可選類型可以讓你暗示_任意類型_的值缺失，並不需要一個特殊值。

來看一個例子。Swift 的`String`類型有一個叫做`toInt`的方法，作用是將一個`String`值轉換成一個`Int`值。然而，並不是所有的字符串都可以轉換成一個整數。字符串`"123"`可以被轉換成數字`123`，但是字符串`"hello, world"`不行。

下面的例子使用`toInt`方法來嘗試將一個`String`轉換成`Int`：

```swift
let possibleNumber = "123"
let convertedNumber = possibleNumber.toInt()
// convertedNumber 被推測為類型 "Int?"， 或者類型 "optional Int"
```

因為`toInt`方法可能會失敗，所以它返回一個_可選類型（optional）_`Int`，而不是一個`Int`。一個可選的`Int`被寫作`Int?`而不是`Int`。問號暗示包含的值是可選類型，也就是說可能包含`Int`值也可能不包含值。（不能包含其他任何值比如`Bool`值或者`String`值。只能是`Int`或者什麼都沒有。）

### if 語句以及強制解析

你可以使用`if`語句來判斷一個可選是否包含值。如果可選類型有值，結果是`true`；如果沒有值，結果是`false`。

當你確定可選類型_確實_包含值之後，你可以在可選的名字後面加一個感歎號（`!`）來獲取值。這個驚歎號表示「我知道這個可選有值，請使用它。」這被稱為可選值的_強制解析（forced unwrapping）_：

```swift
if convertedNumber {
    println("\(possibleNumber) has an integer value of \(convertedNumber!)")
} else {
    println("\(possibleNumber) could not be converted to an integer")
}
// 輸出 "123 has an integer value of 123"
```

更多關於`if`語句的內容，請參考[控制流](05_Control_Flow.html)。

> 注意：  
使用`!`來獲取一個不存在的可選值會導致運行時錯誤。使用`!`來強制解析值之前，一定要確定可選包含一個非`nil`的值。

<a name="optional_binding"></a>
### 可選綁定

使用_可選綁定（optional binding）_來判斷可選類型是否包含值，如果包含就把值賦給一個臨時常量或者變量。可選綁定可以用在`if`和`while`語句中來對可選類型的值進行判斷並把值賦給一個常量或者變量。`if`和`while`語句，請參考[控制流](05_Control_Flow.html)。

像下面這樣在`if`語句中寫一個可選綁定：

```swift
if let constantName = someOptional {
    statements
}
```

你可以像上面這樣使用可選綁定來重寫`possibleNumber`這個例子：

```swift
if let actualNumber = possibleNumber.toInt() {
    println("\(possibleNumber) has an integer value of \(actualNumber)")
} else {
    println("\(possibleNumber) could not be converted to an integer")
}
// 輸出 "123 has an integer value of 123"
```

這段代碼可以被理解為：

「如果`possibleNumber.toInt`返回的可選`Int`包含一個值，創建一個叫做`actualNumber`的新常量並將可選包含的值賦給它。」

如果轉換成功，`actualNumber`常量可以在`if`語句的第一個分支中使用。它已經被可選類型_包含的_值初始化過，所以不需要再使用`!`後綴來獲取它的值。在這個例子中，`actualNumber`只被用來輸出轉換結果。

你可以在可選綁定中使用常量和變量。如果你想在`if`語句的第一個分支中操作`actualNumber`的值，你可以改成`if var actualNumber`，這樣可選類型包含的值就會被賦給一個變量而非常量。

### nil

你可以給可選變量賦值為`nil`來表示它沒有值：

```swift
var serverResponseCode: Int? = 404
// serverResponseCode 包含一個可選的 Int 值 404
serverResponseCode = nil
// serverResponseCode 現在不包含值
```

> 注意：  
`nil`不能用於非可選的常量和變量。如果你的代碼中有常量或者變量需要處理值缺失的情況，請把它們聲明成對應的可選類型。

如果你聲明一個可選常量或者變量但是沒有賦值，它們會自動被設置為`nil`：

```swift
var surveyAnswer: String?
// surveyAnswer 被自動設置為 nil
```

> 注意：  
Swift 的`nil`和 Objective-C 中的`nil`並不一樣。在 Objective-C 中，`nil`是一個指向不存在對象的指針。在 Swift 中，`nil`不是指針——它是一個確定的值，用來表示值缺失。_任何_類型的可選狀態都可以被設置為`nil`，不只是對像類型。

### 隱式解析可選類型

如上所述，可選類型暗示了常量或者變量可以「沒有值」。可選可以通過`if`語句來判斷是否有值，如果有值的話可以通過可選綁定來解析值。

有時候在程序架構中，第一次被賦值之後，可以確定一個可選類型_總會_有值。在這種情況下，每次都要判斷和解析可選值是非常低效的，因為可以確定它總會有值。

這種類型的可選狀態被定義為_隱式解析可選類型（implicitly unwrapped optionals）_。把想要用作可選的類型的後面的問號（`String?`）改成感歎號（`String!`）來聲明一個隱式解析可選類型。

當可選類型被第一次賦值之後就可以確定之後一直有值的時候，隱式解析可選類型非常有用。隱式解析可選類型主要被用在 Swift 中類的構造過程中，請參考[類實例之間的循環強引用](16_Automatic_Reference_Counting.html#strong_reference_cycles_between_class_instances)。

一個隱式解析可選類型其實就是一個普通的可選類型，但是可以被當做非可選類型來使用，並不需要每次都使用解析來獲取可選值。下面的例子展示了可選類型`String`和隱式解析可選類型`String`之間的區別：

```swift
let possibleString: String? = "An optional string."
println(possibleString!) // 需要驚歎號來獲取值
// 輸出 "An optional string."
```

```swift
let assumedString: String! = "An implicitly unwrapped optional string."
println(assumedString)  // 不需要感歎號
// 輸出 "An implicitly unwrapped optional string."
```

你可以把隱式解析可選類型當做一個可以自動解析的可選類型。你要做的只是聲明的時候把感歎號放到類型的結尾，而不是每次取值的可選名字的結尾。

> 注意：  
如果你在隱式解析可選類型沒有值的時候嘗試取值，會觸發運行時錯誤。和你在沒有值的普通可選類型後面加一個驚歎號一樣。

你仍然可以把隱式解析可選類型當做普通可選類型來判斷它是否包含值：

```swift
if assumedString {
    println(assumedString)
}
// 輸出 "An implicitly unwrapped optional string."
```

你也可以在可選綁定中使用隱式解析可選類型來檢查並解析它的值：

```swift
if let definiteString = assumedString {
    println(definiteString)
}
// 輸出 "An implicitly unwrapped optional string."
```

> 注意：  
如果一個變量之後可能變成`nil`的話請不要使用隱式解析可選類型。如果你需要在變量的生命週期中判斷是否是`nil`的話，請使用普通可選類型。

<a name="assertions"></a>
## 斷言

可選類型可以讓你判斷值是否存在，你可以在代碼中優雅地處理值缺失的情況。然而，在某些情況下，如果值缺失或者值並不滿足特定的條件，你的代碼可能並不需要繼續執行。這時，你可以在你的代碼中觸發一個_斷言（assertion）_來結束代碼運行並通過調試來找到值缺失的原因。

### 使用斷言進行調試

斷言會在運行時判斷一個邏輯條件是否為`true`。從字面意思來說，斷言「斷言」一個條件是否為真。你可以使用斷言來保證在運行其他代碼之前，某些重要的條件已經被滿足。如果條件判斷為`true`，代碼運行會繼續進行；如果條件判斷為`false`，代碼運行停止，你的應用被終止。

如果你的代碼在調試環境下觸發了一個斷言，比如你在 Xcode 中構建並運行一個應用，你可以清楚地看到不合法的狀態發生在哪裡並檢查斷言被觸發時你的應用的狀態。此外，斷言允許你附加一條調試信息。

你可以使用全局`assert`函數來寫一個斷言。向`assert`函數傳入一個結果為`true`或者`false`的表達式以及一條信息，當表達式為`false`的時候這條信息會被顯示：

```swift
let age = -3
assert(age >= 0, "A person's age cannot be less than zero")
// 因為 age < 0，所以斷言會觸發
```

在這個例子中，只有`age >= 0`為`true`的時候代碼運行才會繼續，也就是說，當`age`的值非負的時候。如果`age`的值是負數，就像代碼中那樣，`age >= 0`為`false`，斷言被觸發，結束應用。

斷言信息不能使用字符串插值。斷言信息可以省略，就像這樣：

```swift
assert(age >= 0)
```

### 何時使用斷言

當條件可能為假時使用斷言，但是最終一定要_保證_條件為真，這樣你的代碼才能繼續運行。斷言的適用情景：

* 整數類型的下標索引被傳入一個自定義下標腳本實現，但是下標索引值可能太小或者太大。
* 需要給函數傳入一個值，但是非法的值可能導致函數不能正常執行。
* 一個可選值現在是`nil`，但是後面的代碼運行需要一個非`nil`值。

請參考[下標腳本](12_Subscripts.html)和[函數](06_Functions.html)。

> 注意：  
斷言可能導致你的應用終止運行，所以你應當仔細設計你的代碼來讓非法條件不會出現。然而，在你的應用發佈之前，有時候非法條件可能出現，這時使用斷言可以快速發現問題。

