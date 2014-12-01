> 翻譯：[JaySurplus](https://github.com/JaySurplus)  
> 校對：[sg552](https://github.com/sg552)

# 類和結構體

本頁包含內容：

- [類和結構體對比](#comparing_classes_and_structures)
- [結構體和枚舉是值類型](#structures_and_enumerations_are_value_types)
- [類是引用類型](#classes_are_reference_types)
- [類和結構體的選擇](#choosing_between_classes_and_structures)
- [集合（collection）類型的賦值與複製行為](#assignment_and_copy_behavior_for_collection_types)

類和結構體是人們構建代碼所用的一種通用且靈活的構造體。為了在類和結構體中實現各種功能，我們必須要嚴格按照常量、變量以及函數所規定的語法規則來定義屬性和添加方法。

與其他編程語言所不同的是，Swift 並不要求你為自定義類和結構去創建獨立的接口和實現文件。你所要做的是在一個單一文件中定義一個類或者結構體，系統將會自動生成面向其它代碼的外部接口。

>  注意：  
通常一個`類`的實例被稱為`對像`。然而在Swift 中，類和結構體的關係要比在其他語言中更加的密切，本章中所討論的大部分功能都可以用在類和結構體上。因此，我們會主要使用`實例`而不是`對像`。

<a name="comparing_classes_and_structures"></a>
###類和結構體對比

Swift 中類和結構體有很多共同點。共同處在於：

* 定義屬性用於存儲值
* 定義方法用於提供功能
* 定義附屬腳本用於訪問值
* 定義構造器用於生成初始化值
* 通過擴展以增加默認實現的功能
* 符合協議以對某類提供標準功能

更多信息請參見 [屬性](10_Properties.html)，[方法](11_Methods.html)，[下標腳本](12_Subscripts.html)，[初始過程](14_Initialization.html)，[擴展](20_Extensions.html)，和[協議](21_Protocols.html)。

與結構體相比，類還有如下的附加功能：

* 繼承允許一個類繼承另一個類的特徵
* 類型轉換允許在運行時檢查和解釋一個類實例的類型
* 解構器允許一個類實例釋放任何其所被分配的資源
* 引用計數允許對一個類的多次引用

更多信息請參見[繼承](http://)，[類型轉換](http://)，[初始化](http://)，和[自動引用計數](http://)。

> 注意：  
結構體總是通過被複製的方式在代碼中傳遞，因此請不要使用引用計數。

### 定義

類和結構體有著類似的定義方式。我們通過關鍵字`class`和`struct`來分別表示類和結構體，並在一對大括號中定義它們的具體內容：

```swift
class SomeClass {
	// class definition goes here
}
struct SomeStructure {
	// structure definition goes here
}
```

>  注意：  
在你每次定義一個新類或者結構體的時候，實際上你是有效地定義了一個新的 Swift 類型。因此請使用 `UpperCamelCase` 這種方式來命名（如 `SomeClass` 和`SomeStructure`等），以便符合標準Swift 類型的大寫命名風格（如`String`，`Int`和`Bool`）。相反的，請使用`lowerCamelCase`這種方式為屬性和方法命名（如`framerate`和`incrementCount`），以便和類區分。

以下是定義結構體和定義類的示例：

```swift
struct Resolution {
	var width = 0
	var heigth = 0
}
class VideoMode {
	var resolution = Resolution()
	var interlaced = false
	var frameRate = 0.0
	var name: String?
}
```

在上面的示例中我們定義了一個名為`Resolution`的結構體，用來描述一個顯示器的像素分辨率。這個結構體包含了兩個名為`width`和`height`的存儲屬性。存儲屬性是捆綁和存儲在類或結構體中的常量或變量。當這兩個屬性被初始化為整數`0`的時候，它們會被推斷為`Int`類型。

在上面的示例中我們還定義了一個名為`VideoMode`的類，用來描述一個視頻顯示器的特定模式。這個類包含了四個儲存屬性變量。第一個是`分辨率`，它被初始化為一個新的`Resolution`結構體的實例，具有`Resolution`的屬性類型。新`VideoMode`實例同時還會初始化其它三個屬性，它們分別是，初始值為`false`(意為「non-interlaced video」)的`interlaced`，回放幀率初始值為`0.0`的`frameRate`和值為可選`String`的`name`。`name`屬性會被自動賦予一個默認值`nil`，意為「沒有`name`值」，因為它是一個可選類型。

### 類和結構體實例

`Resolution`結構體和`VideoMode`類的定義僅描述了什麼是`Resolution`和`VideoMode`。它們並沒有描述一個特定的分辨率（resolution）或者視頻模式（video mode）。為了描述一個特定的分辨率或者視頻模式，我們需要生成一個它們的實例。

生成結構體和類實例的語法非常相似：

```swift
let someResolution = Resolution()
let someVideoMode = VideoMode()
```

結構體和類都使用構造器語法來生成新的實例。構造器語法的最簡單形式是在結構體或者類的類型名稱後跟隨一個空括弧，如`Resolution()`或`VideoMode()`。通過這種方式所創建的類或者結構體實例，其屬性均會被初始化為默認值。[構造過程](14_Initialization.html)章節會對類和結構體的初始化進行更詳細的討論。

### 屬性訪問

通過使用*點語法*（*dot syntax*），你可以訪問實例中所含有的屬性。其語法規則是，實例名後面緊跟屬性名，兩者通過點號(.)連接：

```swift
println("The width of someResolution is \(someResolution.width)")
// 輸出 "The width of someResolution is 0"
```

在上面的例子中，`someResolution.width`引用`someResolution`的`width`屬性，返回`width`的初始值`0`。

你也可以訪問子屬性，如何`VideoMode`中`Resolution`屬性的`width`屬性：

```swift
println("The width of someVideoMode is \(someVideoMode.resolution.width)")
// 輸出 "The width of someVideoMode is 0"
```

你也可以使用點語法為屬性變量賦值：

```swift
someVideoMode.resolution.width = 12880
println("The width of someVideoMode is now \(someVideoMode.resolution.width)")
// 輸出 "The width of someVideoMode is now 1280"
```

>  注意：  
與 Objective-C 語言不同的是，Swift 允許直接設置結構體屬性的子屬性。上面的最後一個例子，就是直接設置了`someVideoMode`中`resolution`屬性的`width`這個子屬性，以上操作並不需要重新設置`resolution`屬性。

### 結構體類型的成員逐一構造器(Memberwise Initializers for structure Types)

所有結構體都有一個自動生成的成員逐一構造器，用於初始化新結構體實例中成員的屬性。新實例中各個屬性的初始值可以通過屬性的名稱傳遞到成員逐一構造器之中：

```swift
let vga = resolution(width:640, heigth: 480)
```

與結構體不同，類實例沒有默認的成員逐一構造器。[構造過程](14_Initialization.html)章節會對構造器進行更詳細的討論。

<a name="structures_and_enumerations_are_value_types"></a>
## 結構體和枚舉是值類型

值類型被賦予給一個變量，常數或者本身被傳遞給一個函數的時候，實際上操作的是其的拷貝。

在之前的章節中，我們已經大量使用了值類型。實際上，在 Swift 中，所有的基本類型：整數（Integer）、浮點數（floating-point）、布爾值（Booleans）、字符串（string)、數組（array）和字典（dictionaries），都是值類型，並且都是以結構體的形式在後台所實現。

在 Swift 中，所有的結構體和枚舉都是值類型。這意味著它們的實例，以及實例中所包含的任何值類型屬性，在代碼中傳遞的時候都會被複製。

請看下面這個示例，其使用了前一個示例中`Resolution`結構體：

```swift
let hd = Resolution(width: 1920, height: 1080)
var cinema = hd
```

在以上示例中，聲明了一個名為`hd`的常量，其值為一個初始化為全高清視頻分辨率（1920 像素寬，1080 像素高）的`Resolution`實例。

然後示例中又聲明了一個名為`cinema`的變量，其值為之前聲明的`hd`。因為`Resolution`是一個結構體，所以`cinema`的值其實是`hd`的一個拷貝副本，而不是`hd`本身。儘管`hd`和`cinema`有著相同的寬（width）和高（height）屬性，但是在後台中，它們是兩個完全不同的實例。

下面，為了符合數碼影院放映的需求（2048 像素寬，1080 像素高），`cinema`的`width`屬性需要作如下修改：

```swift
cinema.width = 2048
```

這裡，將會顯示`cinema`的`width`屬性確已改為了`2048`：

```swift
println("cinema is now  \(cinema.width) pixels wide")
// 輸出 "cinema is now 2048 pixels wide"
```

然而，初始的`hd`實例中`width`屬性還是`1920`：

```swift
println("hd is still \(hd.width	) pixels wide")
// 輸出 "hd is still 1920 pixels wide"
```

在將`hd`賦予給`cinema`的時候，實際上是將`hd`中所存儲的`值（values）`進行拷貝，然後將拷貝的數據存儲到新的`cinema`實例中。結果就是兩個完全獨立的實例碰巧包含有相同的數值。由於兩者相互獨立，因此將`cinema`的`width`修改為`2048`並不會影響`hd`中的寬（width）。

枚舉也遵循相同的行為準則：

```swift
enum CompassPoint {
	case North, South, East, West
}
var currentDirection = CompassPoint.West
let rememberedDirection = currentDirection
currentDirection = .East
if rememberDirection == .West {
	println("The remembered direction is still .West")
}
// 輸出 "The remembered direction is still .West"
```

上例中`rememberedDirection`被賦予了`currentDirection`的值（value），實際上它被賦予的是值（value）的一個拷貝。賦值過程結束後再修改`currentDirection`的值並不影響`rememberedDirection`所儲存的原始值（value）的拷貝。

<a name="classes_are_reference_types"></a>
## 類是引用類型

與值類型不同，引用類型在被賦予到一個變量、常量或者被傳遞到一個函數時，操作的是引用，其並不是拷貝。因此，引用的是已存在的實例本身而不是其拷貝。

請看下面這個示例，其使用了之前定義的`VideoMode`類：

```swift
let tenEighty = VideoMode()
tenEighty.resolution = hd
tenEighty.interlaced = true
tenEighty.name = "1080i"
tenEighty.frameRate = 25.0
```

以上示例中，聲明了一個名為`tenEighty`的常量，其引用了一個`VideoMode`類的新實例。在之前的示例中，這個視頻模式（video mode）被賦予了HD分辨率（1920*1080）的一個拷貝（`hd`）。同時設置為交錯（interlaced）,命名為`「1080i」`。最後，其幀率是`25.0`幀每秒。

然後，`tenEighty` 被賦予名為`alsoTenEighty`的新常量，同時對`alsoTenEighty`的幀率進行修改：

```swift
let alsoTenEighty = tenEighty
alsoTenEighty.frameRate = 30.0
```

因為類是引用類型，所以`tenEight`和`alsoTenEight`實際上引用的是相同的`VideoMode`實例。換句話說，它們是同一個實例的兩種叫法。

下面，通過查看`tenEighty`的`frameRate`屬性，我們會發現它正確的顯示了基本`VideoMode`實例的新幀率，其值為`30.0`：

```swift
println("The frameRate property of tenEighty is now \(tenEighty.frameRate)")
// 輸出 "The frameRate property of theEighty is now 30.0"
```

需要注意的是`tenEighty`和`alsoTenEighty`被聲明為*常量（（constants）*而不是變量。然而你依然可以改變`tenEighty.frameRate`和`alsoTenEighty.frameRate`,因為這兩個常量本身不會改變。它們並不`存儲`這個`VideoMode`實例，在後台僅僅是對`VideoMode`實例的引用。所以，改變的是被引用的基礎`VideoMode`的`frameRate`參數，而不改變常量的值。

### 恆等運算符

因為類是引用類型，有可能有多個常量和變量在後台同時引用某一個類實例。（對於結構體和枚舉來說，這並不成立。因為它們作為值類型，在被賦予到常量、變量或者傳遞到函數時，其值總是會被拷貝。）

如果能夠判定兩個常量或者變量是否引用同一個類實例將會很有幫助。為了達到這個目的，Swift 內建了兩個恆等運算符：

* 等價於 （ === ）
* 不等價於 （ !== ）

以下是運用這兩個運算符檢測兩個常量或者變量是否引用同一個實例：

```swift
if tenEighty === alsoTenTighty {
	println("tenTighty and alsoTenEighty refer to the same Resolution instance.")
}
//輸出 "tenEighty and alsoTenEighty refer to the same Resolution instance."
```

請注意```「等價於"```（用三個等號表示，===） 與```「等於"```（用兩個等號表示，==）的不同：

* 「等價於」表示兩個類類型（class type）的常量或者變量引用同一個類實例。
* 「等於」表示兩個實例的值「相等」或「相同」，判定時要遵照類設計者定義定義的評判標準，因此相比於「相等」，這是一種更加合適的叫法。

當你在定義你的自定義類和結構體的時候，你有義務來決定判定兩個實例「相等」的標準。在章節[運算符函數(Operator Functions)](23_Advanced_Operators.html#operator_functions)中將會詳細介紹實現自定義「等於」和「不等於」運算符的流程。

### 指針

如果你有 C，C++ 或者 Objective-C 語言的經驗，那麼你也許會知道這些語言使用指針來引用內存中的地址。一個 Swift 常量或者變量引用一個引用類型的實例與 C 語言中的指針類似，不同的是並不直接指向內存中的某個地址，而且也不要求你使用星號（*）來表明你在創建一個引用。Swift 中這些引用與其它的常量或變量的定義方式相同。

<a name="choosing_between_classes_and_structures"></a>
## 類和結構體的選擇

在你的代碼中，你可以使用類和結構體來定義你的自定義數據類型。

然而，結構體實例總是通過值傳遞，類實例總是通過引用傳遞。這意味兩者適用不同的任務。當你在考慮一個工程項目的數據構造和功能的時候，你需要決定每個數據構造是定義成類還是結構體。

按照通用的準則，當符合一條或多條以下條件時，請考慮構建結構體：

* 結構體的主要目的是用來封裝少量相關簡單數據值。
* 有理由預計一個結構體實例在賦值或傳遞時，封裝的數據將會被拷貝而不是被引用。
* 任何在結構體中儲存的值類型屬性，也將會被拷貝，而不是被引用。
* 結構體不需要去繼承另一個已存在類型的屬性或者行為。

合適的結構體候選者包括：

* 幾何形狀的大小，封裝一個`width`屬性和`height`屬性，兩者均為`Double`類型。
* 一定範圍內的路徑，封裝一個`start`屬性和`length`屬性，兩者均為`Int`類型。
* 三維坐標系內一點，封裝`x`，`y`和`z`屬性，三者均為`Double`類型。

在所有其它案例中，定義一個類，生成一個它的實例，並通過引用來管理和傳遞。實際中，這意味著絕大部分的自定義數據構造都應該是類，而非結構體。

<a name="assignment_and_copy_behavior_for_collection_types"></a>
## 集合（Collection）類型的賦值和拷貝行為

Swift 中`數組（Array）`和`字典（Dictionary）`類型均以結構體的形式實現。然而當數組被賦予一個常量或變量，或被傳遞給一個函數或方法時，其拷貝行為與字典和其它結構體有些許不同。

以下對`數組`和`結構體`的行為描述與對`NSArray`和`NSDictionary`的行為描述在本質上不同，後者是以類的形式實現，前者是以結構體的形式實現。`NSArray`和`NSDictionary`實例總是以對已有實例引用,而不是拷貝的方式被賦值和傳遞。

> 注意：  
以下是對於數組，字典，字符串和其它值的`拷貝`的描述。
在你的代碼中，拷貝好像是確實是在有拷貝行為的地方產生過。然而，在 Swift 的後台中，只有確有必要，`實際（actual）`拷貝才會被執行。Swift 管理所有的值拷貝以確保性能最優化的性能，所以你也沒有必要去避免賦值以保證最優性能。（實際賦值由系統管理優化）

### 字典類型的賦值和拷貝行為

無論何時將一個`字典`實例賦給一個常量或變量，或者傳遞給一個函數或方法，這個字典會即會在賦值或調用發生時被拷貝。在章節[結構體和枚舉是值類型](#structures_and_enumerations_are_value_types)中將會對此過程進行詳細介紹。

如果`字典`實例中所儲存的鍵（keys）和/或值（values）是值類型（結構體或枚舉），當賦值或調用發生時，它們都會被拷貝。相反，如果鍵（keys）和/或值（values）是引用類型，被拷貝的將會是引用，而不是被它們引用的類實例或函數。`字典`的鍵和值的拷貝行為與結構體所儲存的屬性的拷貝行為相同。

下面的示例定義了一個名為`ages`的字典，其中儲存了四個人的名字和年齡。`ages`字典被賦予了一個名為`copiedAges`的新變量，同時`ages`在賦值的過程中被拷貝。賦值結束後，`ages`和`copiedAges`成為兩個相互獨立的字典。

```swift
var ages = ["Peter": 23, "Wei": 35, "Anish": 65, "Katya": 19]
var copiedAges = ages
```

這個字典的鍵（keys）是`字符串（String）`類型，值（values）是`整（Int）`類型。這兩種類型在Swift 中都是值類型（value types），所以當字典被拷貝時，兩者都會被拷貝。

我們可以通過改變一個字典中的年齡值（age value），檢查另一個字典中所對應的值，來證明`ages`字典確實是被拷貝了。如果在`copiedAges`字典中將`Peter`的值設為`24`，那麼`ages`字典仍然會返回修改前的值`23`：

```swift
copiedAges["Peter"] = 24
println(ages["Peter"])
// 輸出 "23"
```

### 數組的賦值和拷貝行為

在Swift 中，`數組（Arrays）`類型的賦值和拷貝行為要比`字典（Dictionary）`類型的複雜的多。當操作數組內容時，`數組（Array）`能提供接近C語言的的性能，並且拷貝行為只有在必要時才會發生。

如果你將一個`數組（Array）`實例賦給一個變量或常量，或者將其作為參數傳遞給函數或方法調用，在事件發生時數組的內容`不`會被拷貝。相反，數組公用相同的元素序列。當你在一個數組內修改某一元素，修改結果也會在另一數組顯示。

對數組來說，拷貝行為僅僅當操作有可能修改數組`長度`時才會發生。這種行為包括了附加（appending）,插入（inserting）,刪除（removing）或者使用範圍下標（ranged subscript）去替換這一範圍內的元素。只有當數組拷貝確要發生時，數組內容的行為規則與字典中鍵值的相同，參見章節[集合（collection）類型的賦值與複製行為](#assignment_and_copy_behavior_for_collection_types。

下面的示例將一個`整數（Int）`數組賦給了一個名為`a`的變量，繼而又被賦給了變量`b`和`c`：

```swift
var a = [1, 2, 3]
var b = a
var c = a
```

我們可以在`a`,`b`,`c`上使用下標語法以得到數組的第一個元素：

```swift
println(a[0])
// 1
println(b[0])
// 1
println(c[0])
// 1
```

如果通過下標語法修改數組中某一元素的值，那麼`a`,`b`,`c`中的相應值都會發生改變。請注意當你用下標語法修改某一值時，並沒有拷貝行為伴隨發生，因為下表語法修改值時沒有改變數組長度的可能：

```swift
a[0] = 42
println(a[0])
// 42
println(b[0])
// 42
println(c[0])
// 42
```

然而，當你給`a`附加新元素時，數組的長度`會`改變。
當附加元素這一事件發生時，Swift 會創建這個數組的一個拷貝。從此以後，`a`將會是原數組的一個獨立拷貝。

拷貝發生後，如果再修改`a`中元素值的話，`a`將會返回與`b`，`c`不同的結果，因為後兩者引用的是原來的數組：

```swift
a.append(4)
a[0] = 777
println(a[0])
// 777
println(b[0])
// 42
println(c[0])
// 42
```

### 確保數組的唯一性

在操作一個數組，或將其傳遞給函數以及方法調用之前是很有必要先確定這個數組是有一個唯一拷貝的。通過在數組變量上調用`unshare`方法來確定數組引用的唯一性。（當數組賦給常量時，不能調用`unshare`方法）

如果一個數組被多個變量引用，在其中的一個變量上調用`unshare`方法，則會拷貝此數組，此時這個變量將會有屬於它自己的獨立數組拷貝。當數組僅被一個變量引用時，則不會有拷貝發生。

在上一個示例的最後，`b`和`c`都引用了同一個數組。此時在`b`上調用`unshare`方法則會將`b`變成一個唯一個拷貝：

```swift
b.unshare()
```

在`unshare`方法調用後再修改`b`中第一個元素的值，這三個數組（`a`,`b`,`c`）會返回不同的三個值：

```swift
b[0] = -105
println(a[0])
// 77
println(b[0])
// -105
println(c[0])
// 42
```


### 判定兩個數組是否共用相同元素

我們通過使用恆等運算符（identity operators）（ === 和 !==）來判定兩個數組或子數組共用相同的儲存空間或元素。

下面這個示例使用了「等同（identical to）」 運算符（===） 來判定`b`和`c`是否共用相同的數組元素：

```swift
if b === c {
	println("b and c still share the same array elements.")
} else {
	println("b and c now refer to two independent sets of array elements.")
}
```

```swift
// 輸出 "b and c now refer totwo independent sets of array elements."
```

此外，我們還可以使用恆等運算符來判定兩個子數組是否共用相同的元素。下面這個示例中，比較了`b`的兩個相等的子數組，並且確定了這兩個子數組都引用相同的元素：

```swift
if b[0...1] === b[0...1] {
	println("These two subarrays share the same elements.")
} else {
	println("These two subarrays do not share the same elements.")
}
// 輸出 "These two subarrays share the same elements."
```

### 強制複製數組

我們通過調用數組的`copy`方法進行強制顯式複製。這個方法對數組進行了淺拷貝（shallow copy），並且返回一個包含此拷貝數組的新數組。

下面這個示例中定義了一個`names`數組，其包含了七個人名。還定義了一個`copiedNames`變量，用以儲存在`names`上調用`copy`方法所返回的結果：

```swift
var names = ["Mohsen", "Hilary", "Justyn", "Amy", "Rich", "Graham", "Vic"]
var copiedNames = names.copy()
```

我們可以通過修改數組中某一個元素，並且檢查另一個數組中對應元素的方法來判定`names`數組確已被複製。如果你將`copiedNames`中第一個元素從"`Mohsen`"修改為"`Mo`",則`names`數組返回的仍是拷貝發生前的"`Mohsen`"：

```swift
copiedName[0] = "Mo"
println(name[0])
// 輸出 "Mohsen"
```

> 注意：  
如果你僅需要確保你對數組的引用是唯一引用，請調用`unshare`方法，而不是`copy`方法。`unshare`方法僅會在確有必要時才會創建數組拷貝。`copy`方法會在任何時候都創建一個新的拷貝，即使引用已經是唯一引用。

