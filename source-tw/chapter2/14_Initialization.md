> 翻譯：[lifedim](https://github.com/lifedim)  
> 校對：[lifedim](https://github.com/lifedim)

# 構造過程（Initialization）

-----------------

本頁包含內容：

- [存儲型屬性的初始賦值](#setting_initial_values_for_stored_properties)
- [定制化構造過程](#customizing_initialization)
- [默認構造器](#default_initializers)
- [值類型的構造器代理](#initializer_delegation_for_value_types)
- [類的繼承和構造過程](#class_inheritance_and_initialization)
- [通過閉包和函數來設置屬性的默認值](#setting_a_default_property_value_with_a_closure_or_function)


構造過程是為了使用某個類、結構體或枚舉類型的實例而進行的準備過程。這個過程包含了為實例中的每個屬性設置初始值和為其執行必要的準備和初始化任務。

構造過程是通過定義構造器（`Initializers`）來實現的，這些構造器可以看做是用來創建特定類型實例的特殊方法。與 Objective-C 中的構造器不同，Swift 的構造器無需返回值，它們的主要任務是保證新實例在第一次使用前完成正確的初始化。

類實例也可以通過定義析構器（`deinitializer`）在類實例釋放之前執行特定的清除工作。想瞭解更多關於析構器的內容，請參考[析構過程](../chapter2/15_Deinitialization.html)。

<a name="setting_initial_values_for_stored_properties"></a>
## 存儲型屬性的初始賦值

類和結構體在實例創建時，必須為所有存儲型屬性設置合適的初始值。存儲型屬性的值不能處於一個未知的狀態。

你可以在構造器中為存儲型屬性賦初值，也可以在定義屬性時為其設置默認值。以下章節將詳細介紹這兩種方法。

>注意：  
當你為存儲型屬性設置默認值或者在構造器中為其賦值時，它們的值是被直接設置的，不會觸發任何屬性觀測器（`property observers`）。

### 構造器

構造器在創建某特定類型的新實例時調用。它的最簡形式類似於一個不帶任何參數的實例方法，以關鍵字`init`命名。

下面例子中定義了一個用來保存華氏溫度的結構體`Fahrenheit`，它擁有一個`Double`類型的存儲型屬性`temperature`：

```swift
struct Fahrenheit {
    var temperature: Double
    init() {
        temperature = 32.0
    }
}
```

```swift
var f = Fahrenheit()
println("The default temperature is \(f.temperature)° Fahrenheit")
// 輸出 "The default temperature is 32.0° Fahrenheit」
```

這個結構體定義了一個不帶參數的構造器`init`，並在裡面將存儲型屬性`temperature`的值初始化為`32.0`（華攝氏度下水的冰點）。

### 默認屬性值

如前所述，你可以在構造器中為存儲型屬性設置初始值；同樣，你也可以在屬性聲明時為其設置默認值。

>注意：  
如果一個屬性總是使用同一個初始值，可以為其設置一個默認值。無論定義默認值還是在構造器中賦值，最終它們實現的效果是一樣的，只不過默認值跟屬性構造過程結合的更緊密。使用默認值能讓你的構造器更簡潔、更清晰，且能通過默認值自動推導出屬性的類型；同時，它也能讓你充分利用默認構造器、構造器繼承（後續章節將講到）等特性。

你可以使用更簡單的方式在定義結構體`Fahrenheit`時為屬性`temperature`設置默認值：

```swift
struct Fahrenheit {
    var temperature = 32.0
}
```

<a name="customizing_initialization"></a>
## 定制化構造過程

你可以通過輸入參數和可選屬性類型來定制構造過程，也可以在構造過程中修改常量屬性。這些都將在後面章節中提到。

### 構造參數

你可以在定義構造器時提供構造參數，為其提供定制化構造所需值的類型和名字。構造器參數的功能和語法跟函數和方法參數相同。

下面例子中定義了一個包含攝氏度溫度的結構體`Celsius`。它定義了兩個不同的構造器：`init(fromFahrenheit:)`和`init(fromKelvin:)`，二者分別通過接受不同刻度表示的溫度值來創建新的實例：

```swift
struct Celsius {
    var temperatureInCelsius: Double = 0.0
    init(fromFahrenheit fahrenheit: Double) {
        temperatureInCelsius = (fahrenheit - 32.0) / 1.8
    }
    init(fromKelvin kelvin: Double) {
        temperatureInCelsius = kelvin - 273.15
    }
}
```

```swift
let boilingPointOfWater = Celsius(fromFahrenheit: 212.0)
// boilingPointOfWater.temperatureInCelsius 是 100.0
let freezingPointOfWater = Celsius(fromKelvin: 273.15)
// freezingPointOfWater.temperatureInCelsius 是 0.0」
```

第一個構造器擁有一個構造參數，其外部名字為`fromFahrenheit`，內部名字為`fahrenheit`；第二個構造器也擁有一個構造參數，其外部名字為`fromKelvin`，內部名字為`kelvin`。這兩個構造器都將唯一的參數值轉換成攝氏溫度值，並保存在屬性`temperatureInCelsius`中。

### 內部和外部參數名

跟函數和方法參數相同，構造參數也存在一個在構造器內部使用的參數名字和一個在調用構造器時使用的外部參數名字。

然而，構造器並不像函數和方法那樣在括號前有一個可辨別的名字。所以在調用構造器時，主要通過構造器中的參數名和類型來確定需要調用的構造器。正因為參數如此重要，如果你在定義構造器時沒有提供參數的外部名字，Swift 會為每個構造器的參數自動生成一個跟內部名字相同的外部名，就相當於在每個構造參數之前加了一個哈希符號。

> 注意：  
如果你不希望為構造器的某個參數提供外部名字，你可以使用下劃線`_`來顯示描述它的外部名，以此覆蓋上面所說的默認行為。

以下例子中定義了一個結構體`Color`，它包含了三個常量：`red`、`green`和`blue`。這些屬性可以存儲0.0到1.0之間的值，用來指示顏色中紅、綠、藍成分的含量。

`Color`提供了一個構造器，其中包含三個`Double`類型的構造參數：

```swift
struct Color {
    let red = 0.0, green = 0.0, blue = 0.0
    init(red: Double, green: Double, blue: Double) {
        self.red   = red
        self.green = green
        self.blue  = blue
    }
}
```

每當你創建一個新的`Color`實例，你都需要通過三種顏色的外部參數名來傳值，並調用構造器。

```swift
let magenta = Color(red: 1.0, green: 0.0, blue: 1.0)
```

注意，如果不通過外部參數名字傳值，你是沒法調用這個構造器的。只要構造器定義了某個外部參數名，你就必須使用它，忽略它將導致編譯錯誤：

```swift
let veryGreen = Color(0.0, 1.0, 0.0)
// 報編譯時錯誤，需要外部名稱
```

### 可選屬性類型

如果你定制的類型包含一個邏輯上允許取值為空的存儲型屬性--不管是因為它無法在初始化時賦值，還是因為它可以在之後某個時間點可以賦值為空--你都需要將它定義為可選類型`optional type`。可選類型的屬性將自動初始化為空`nil`，表示這個屬性是故意在初始化時設置為空的。

下面例子中定義了類`SurveyQuestion`，它包含一個可選字符串屬性`response`：

```swift
class SurveyQuestion {
    var text: String
    var response: String?
    init(text: String) {
        self.text = text
    }
    func ask() {
        println(text)
    }
}
let cheeseQuestion = SurveyQuestion(text: "Do you like cheese?")
cheeseQuestion.ask()
// 輸出 "Do you like cheese?"
cheeseQuestion.response = "Yes, I do like cheese.
```

調查問題在問題提出之後，我們才能得到回答。所以我們將屬性回答`response`聲明為`String?`類型，或者說是可選字符串類型`optional String`。當`SurveyQuestion`實例化時，它將自動賦值為空`nil`，表明暫時還不存在此字符串。

### 構造過程中常量屬性的修改

只要在構造過程結束前常量的值能確定，你可以在構造過程中的任意時間點修改常量屬性的值。

>注意：  
對某個類實例來說，它的常量屬性只能在定義它的類的構造過程中修改；不能在子類中修改。

你可以修改上面的`SurveyQuestion`示例，用常量屬性替代變量屬性`text`，指明問題內容`text`在其創建之後不會再被修改。儘管`text`屬性現在是常量，我們仍然可以在其類的構造器中設置它的值：

```swift
class SurveyQuestion {
    let text: String
    var response: String?
    init(text: String) {
        self.text = text
    }
    func ask() {
        println(text)
    }
}
let beetsQuestion = SurveyQuestion(text: "How about beets?")
beetsQuestion.ask()
// 輸出 "How about beets?"
beetsQuestion.response = "I also like beets. (But not with cheese.)
```

<a name="default_initializers"></a>
## 默認構造器

Swift 將為所有屬性已提供默認值的且自身沒有定義任何構造器的結構體或基類，提供一個默認的構造器。這個默認構造器將簡單的創建一個所有屬性值都設置為默認值的實例。

下面例子中創建了一個類`ShoppingListItem`，它封裝了購物清單中的某一項的屬性：名字（`name`）、數量（`quantity`）和購買狀態 `purchase state`。

```swift
class ShoppingListItem {
    var name: String?
    var quantity = 1
    var purchased = false
}
var item = ShoppingListItem()
```

由於`ShoppingListItem`類中的所有屬性都有默認值，且它是沒有父類的基類，它將自動獲得一個可以為所有屬性設置默認值的默認構造器（儘管代碼中沒有顯式為`name`屬性設置默認值，但由於`name`是可選字符串類型，它將默認設置為`nil`）。上面例子中使用默認構造器創造了一個`ShoppingListItem`類的實例（使用`ShoppingListItem()`形式的構造器語法），並將其賦值給變量`item`。

### 結構體的逐一成員構造器

除上面提到的默認構造器，如果結構體對所有存儲型屬性提供了默認值且自身沒有提供定制的構造器，它們能自動獲得一個逐一成員構造器。

逐一成員構造器是用來初始化結構體新實例裡成員屬性的快捷方法。我們在調用逐一成員構造器時，通過與成員屬性名相同的參數名進行傳值來完成對成員屬性的初始賦值。

下面例子中定義了一個結構體`Size`，它包含兩個屬性`width`和`height`。Swift 可以根據這兩個屬性的初始賦值`0.0`自動推導出它們的類型`Double`。

由於這兩個存儲型屬性都有默認值，結構體`Size`自動獲得了一個逐一成員構造器 `init(width:height:)`。 你可以用它來為`Size`創建新的實例：

```swift
struct Size {
    var width = 0.0, height = 0.0
}
let twoByTwo = Size(width: 2.0, height: 2.0)
```

<a name="initializer_delegation_for_value_types"></a>
## 值類型的構造器代理

構造器可以通過調用其它構造器來完成實例的部分構造過程。這一過程稱為構造器代理，它能減少多個構造器間的代碼重複。

構造器代理的實現規則和形式在值類型和類類型中有所不同。值類型（結構體和枚舉類型）不支持繼承，所以構造器代理的過程相對簡單，因為它們只能代理給本身提供的其它構造器。類則不同，它可以繼承自其它類（請參考[繼承](../chapter2/13_Inheritance.html)），這意味著類有責任保證其所有繼承的存儲型屬性在構造時也能正確的初始化。這些責任將在後續章節[類的繼承和構造過程](#class_inheritance_and_initialization)中介紹。

對於值類型，你可以使用`self.init`在自定義的構造器中引用其它的屬於相同值類型的構造器。並且你只能在構造器內部調用`self.init`。

注意，如果你為某個值類型定義了一個定制的構造器，你將無法訪問到默認構造器（如果是結構體，則無法訪問逐一對像構造器）。這個限制可以防止你在為值類型定義了一個更複雜的，完成了重要準備構造器之後，別人還是錯誤的使用了那個自動生成的構造器。

>注意：  
假如你想通過默認構造器、逐一對像構造器以及你自己定制的構造器為值類型創建實例，我們建議你將自己定制的構造器寫到擴展（`extension`）中，而不是跟值類型定義混在一起。想查看更多內容，請查看[擴展](../chapter2/20_Extensions.html)章節。

下面例子將定義一個結構體`Rect`，用來代表幾何矩形。這個例子需要兩個輔助的結構體`Size`和`Point`，它們各自為其所有的屬性提供了初始值`0.0`。

```swift
struct Size {
    var width = 0.0, height = 0.0
}
struct Point {
    var x = 0.0, y = 0.0
}
```

你可以通過以下三種方式為`Rect`創建實例--使用默認的0值來初始化`origin`和`size`屬性；使用特定的`origin`和`size`實例來初始化；使用特定的`center`和`size`來初始化。在下面`Rect`結構體定義中，我們為這三種方式提供了三個自定義的構造器：

```swift
struct Rect {
    var origin = Point()
    var size = Size()
    init() {}
    init(origin: Point, size: Size) {
        self.origin = origin
        self.size = size
    }
    init(center: Point, size: Size) {
        let originX = center.x - (size.width / 2)
        let originY = center.y - (size.height / 2)
        self.init(origin: Point(x: originX, y: originY), size: size)
    }
}
```

第一個`Rect`構造器`init()`，在功能上跟沒有自定義構造器時自動獲得的默認構造器是一樣的。這個構造器是一個空函數，使用一對大括號`{}`來描述，它沒有執行任何定制的構造過程。調用這個構造器將返回一個`Rect`實例，它的`origin`和`size`屬性都使用定義時的默認值`Point(x: 0.0, y: 0.0)`和`Size(width: 0.0, height: 0.0)`：

```swift
let basicRect = Rect()
// basicRect 的原點是 (0.0, 0.0)，尺寸是 (0.0, 0.0)
```

第二個`Rect`構造器`init(origin:size:)`，在功能上跟結構體在沒有自定義構造器時獲得的逐一成員構造器是一樣的。這個構造器只是簡單地將`origin`和`size`的參數值賦給對應的存儲型屬性：

```swift
let originRect = Rect(origin: Point(x: 2.0, y: 2.0),
    size: Size(width: 5.0, height: 5.0))
// originRect 的原點是 (2.0, 2.0)，尺寸是 (5.0, 5.0)
```

第三個`Rect`構造器`init(center:size:)`稍微複雜一點。它先通過`center`和`size`的值計算出`origin`的坐標。然後再調用（或代理給）`init(origin:size:)`構造器來將新的`origin`和`size`值賦值到對應的屬性中：

```swift
let centerRect = Rect(center: Point(x: 4.0, y: 4.0),
    size: Size(width: 3.0, height: 3.0))
// centerRect 的原點是 (2.5, 2.5)，尺寸是 (3.0, 3.0)
```

構造器`init(center:size:)`可以自己將`origin`和`size`的新值賦值到對應的屬性中。然而盡量利用現有的構造器和它所提供的功能來實現`init(center:size:)`的功能，是更方便、更清晰和更直觀的方法。

>注意：  
如果你想用另外一種不需要自己定義`init()`和`init(origin:size:)`的方式來實現這個例子，請參考[擴展](../chapter2/20_Extensions.html)。

<a name="class_inheritance_and_initialization"></a>
## 類的繼承和構造過程

類裡面的所有存儲型屬性--包括所有繼承自父類的屬性--都必須在構造過程中設置初始值。

Swift 提供了兩種類型的類構造器來確保所有類實例中存儲型屬性都能獲得初始值，它們分別是指定構造器和便利構造器。

### 指定構造器和便利構造器

指定構造器是類中最主要的構造器。一個指定構造器將初始化類中提供的所有屬性，並根據父類鏈往上調用父類的構造器來實現父類的初始化。

每一個類都必須擁有至少一個指定構造器。在某些情況下，許多類通過繼承了父類中的指定構造器而滿足了這個條件。具體內容請參考後續章節[自動構造器的繼承](#automatic_initializer_inheritance)。

便利構造器是類中比較次要的、輔助型的構造器。你可以定義便利構造器來調用同一個類中的指定構造器，並為其參數提供默認值。你也可以定義便利構造器來創建一個特殊用途或特定輸入的實例。

你應當只在必要的時候為類提供便利構造器，比方說某種情況下通過使用便利構造器來快捷調用某個指定構造器，能夠節省更多開發時間並讓類的構造過程更清晰明瞭。

<a name="initialization_chain"></a>
### 構造器鏈

為了簡化指定構造器和便利構造器之間的調用關係，Swift 採用以下三條規則來限制構造器之間的代理調用：

#### 規則 1
指定構造器必須調用其直接父類的的指定構造器。

#### 規則 2
便利構造器必須調用同一類中定義的其它構造器。

#### 規則 3
便利構造器必須最終以調用一個指定構造器結束。

一個更方便記憶的方法是：

- 指定構造器必須總是向上代理
- 便利構造器必須總是橫向代理

這些規則可以通過下面圖例來說明：

![構造器代理圖](https://developer.apple.com/library/prerelease/ios/documentation/swift/conceptual/swift_programming_language/Art/initializerDelegation01_2x.png)

如圖所示，父類中包含一個指定構造器和兩個便利構造器。其中一個便利構造器調用了另外一個便利構造器，而後者又調用了唯一的指定構造器。這滿足了上面提到的規則2和3。這個父類沒有自己的父類，所以規則1沒有用到。

子類中包含兩個指定構造器和一個便利構造器。便利構造器必須調用兩個指定構造器中的任意一個，因為它只能調用同一個類裡的其他構造器。這滿足了上面提到的規則2和3。而兩個指定構造器必須調用父類中唯一的指定構造器，這滿足了規則1。

> 注意：  
這些規則不會影響使用時，如何用類去創建實例。任何上圖中展示的構造器都可以用來完整創建對應類的實例。這些規則只在實現類的定義時有影響。

下面圖例中展示了一種針對四個類的更複雜的類層級結構。它演示了指定構造器是如何在類層級中充當「管道」的作用，在類的構造器鏈上簡化了類之間的相互關係。

![複雜構造器代理圖](https://developer.apple.com/library/prerelease/ios/documentation/swift/conceptual/swift_programming_language/Art/initializerDelegation02_2x.png)

<a name="two_phase_initialization"></a>
### 兩段式構造過程

Swift 中類的構造過程包含兩個階段。第一個階段，每個存儲型屬性通過引入它們的類的構造器來設置初始值。當每一個存儲型屬性值被確定後，第二階段開始，它給每個類一次機會在新實例準備使用之前進一步定制它們的存儲型屬性。

兩段式構造過程的使用讓構造過程更安全，同時在整個類層級結構中給予了每個類完全的靈活性。兩段式構造過程可以防止屬性值在初始化之前被訪問；也可以防止屬性被另外一個構造器意外地賦予不同的值。

> 注意：  
Swift的兩段式構造過程跟 Objective-C 中的構造過程類似。最主要的區別在於階段 1，Objective-C 給每一個屬性賦值`0`或空值（比如說`0`或`nil`）。Swift  的構造流程則更加靈活，它允許你設置定制的初始值，並自如應對某些屬性不能以`0`或`nil`作為合法默認值的情況。

Swift 編譯器將執行 4 種有效的安全檢查，以確保兩段式構造過程能順利完成：

#### 安全檢查 1

指定構造器必須保證它所在類引入的所有屬性都必須先初始化完成，之後才能將其它構造任務向上代理給父類中的構造器。

如上所述，一個對象的內存只有在其所有存儲型屬性確定之後才能完全初始化。為了滿足這一規則，指定構造器必須保證它所在類引入的屬性在它往上代理之前先完成初始化。

#### 安全檢查 2

指定構造器必須先向上代理調用父類構造器，然後再為繼承的屬性設置新值。如果沒這麼做，指定構造器賦予的新值將被父類中的構造器所覆蓋。

#### 安全檢查 3

便利構造器必須先代理調用同一類中的其它構造器，然後再為任意屬性賦新值。如果沒這麼做，便利構造器賦予的新值將被同一類中其它指定構造器所覆蓋。

#### 安全檢查 4

構造器在第一階段構造完成之前，不能調用任何實例方法、不能讀取任何實例屬性的值，也不能引用`self`的值。

以下是兩段式構造過程中基於上述安全檢查的構造流程展示：

#### 階段 1

- 某個指定構造器或便利構造器被調用；
- 完成新實例內存的分配，但此時內存還沒有被初始化；
- 指定構造器確保其所在類引入的所有存儲型屬性都已賦初值。存儲型屬性所屬的內存完成初始化；
- 指定構造器將調用父類的構造器，完成父類屬性的初始化；
- 這個調用父類構造器的過程沿著構造器鏈一直往上執行，直到到達構造器鏈的最頂部；
- 當到達了構造器鏈最頂部，且已確保所有實例包含的存儲型屬性都已經賦值，這個實例的內存被認為已經完全初始化。此時階段1完成。

#### 階段 2

- 從頂部構造器鏈一直往下，每個構造器鏈中類的指定構造器都有機會進一步定制實例。構造器此時可以訪問`self`、修改它的屬性並調用實例方法等等。
- 最終，任意構造器鏈中的便利構造器可以有機會定制實例和使用`self`。

下圖展示了在假定的子類和父類之間構造的階段1：
·
![構造過程階段1](https://developer.apple.com/library/prerelease/ios/documentation/swift/conceptual/swift_programming_language/Art/twoPhaseInitialization01_2x.png)

在這個例子中，構造過程從對子類中一個便利構造器的調用開始。這個便利構造器此時沒法修改任何屬性，它把構造任務代理給同一類中的指定構造器。

如安全檢查1所示，指定構造器將確保所有子類的屬性都有值。然後它將調用父類的指定構造器，並沿著造器鏈一直往上完成父類的構建過程。

父類中的指定構造器確保所有父類的屬性都有值。由於沒有更多的父類需要構建，也就無需繼續向上做構建代理。

一旦父類中所有屬性都有了初始值，實例的內存被認為是完全初始化，而階段1也已完成。

以下展示了相同構造過程的階段2：

![構建過程階段2](https://developer.apple.com/library/prerelease/ios/documentation/swift/conceptual/swift_programming_language/Art/twoPhaseInitialization02_2x.png)

父類中的指定構造器現在有機會進一步來定制實例（儘管它沒有這種必要）。

一旦父類中的指定構造器完成調用，子類的構指定構造器可以執行更多的定制操作（同樣，它也沒有這種必要）。

最終，一旦子類的指定構造器完成調用，最開始被調用的便利構造器可以執行更多的定制操作。

### 構造器的繼承和重載

跟 Objective-C 中的子類不同，Swift 中的子類不會默認繼承父類的構造器。Swift 的這種機制可以防止一個父類的簡單構造器被一個更專業的子類繼承，並被錯誤的用來創建子類的實例。

假如你希望自定義的子類中能實現一個或多個跟父類相同的構造器--也許是為了完成一些定制的構造過程--你可以在你定制的子類中提供和重載與父類相同的構造器。

如果你重載的構造器是一個指定構造器，你可以在子類裡重載它的實現，並在自定義版本的構造器中調用父類版本的構造器。

如果你重載的構造器是一個便利構造器，你的重載過程必須通過調用同一類中提供的其它指定構造器來實現。這一規則的詳細內容請參考[構造器鏈](#initialization_chain)。

>注意：  
與方法、屬性和下標不同，在重載構造器時你沒有必要使用關鍵字`override`。

<a name="automatic_initializer_inheritance"></a>
### 自動構造器的繼承

如上所述，子類不會默認繼承父類的構造器。但是如果特定條件可以滿足，父類構造器是可以被自動繼承的。在實踐中，這意味著對於許多常見場景你不必重載父類的構造器，並且在盡可能安全的情況下以最小的代價來繼承父類的構造器。

假設要為子類中引入的任意新屬性提供默認值，請遵守以下2個規則：

#### 規則 1

如果子類沒有定義任何指定構造器，它將自動繼承所有父類的指定構造器。

#### 規則 2

如果子類提供了所有父類指定構造器的實現--不管是通過規則1繼承過來的，還是通過自定義實現的--它將自動繼承所有父類的便利構造器。

即使你在子類中添加了更多的便利構造器，這兩條規則仍然適用。

>注意：  
子類可以通過部分滿足規則2的方式，使用子類便利構造器來實現父類的指定構造器。

### 指定構造器和便利構造器的語法

類的指定構造器的寫法跟值類型簡單構造器一樣：

```swift
init(parameters) {
    statements
}
```

便利構造器也採用相同樣式的寫法，但需要在`init`關鍵字之前放置`convenience`關鍵字，並使用空格將它們倆分開：

```swift
convenience init(parameters) {
    statements
}
```

### 指定構造器和便利構造器實戰

接下來的例子將在實戰中展示指定構造器、便利構造器和自動構造器的繼承。它定義了包含三個類`Food`、`RecipeIngredient`以及`ShoppingListItem`的類層次結構，並將演示它們的構造器是如何相互作用的。

類層次中的基類是`Food`，它是一個簡單的用來封裝食物名字的類。`Food`類引入了一個叫做`name`的`String`類型屬性，並且提供了兩個構造器來創建`Food`實例：

```swift
class Food {
    var name: String
    init(name: String) {
        self.name = name
    }
    convenience init() {
        self.init(name: "[Unnamed]")
    }
}
```

下圖中展示了`Food`的構造器鏈：

![Food構造器鏈](https://developer.apple.com/library/prerelease/ios/documentation/swift/conceptual/swift_programming_language/Art/initializersExample01_2x.png)

類沒有提供一個默認的逐一成員構造器，所以`Food`類提供了一個接受單一參數`name`的指定構造器。這個構造器可以使用一個特定的名字來創建新的`Food`實例：

```swift
let namedMeat = Food(name: "Bacon")
// namedMeat 的名字是 "Bacon」
```

`Food`類中的構造器`init(name: String)`被定義為一個指定構造器，因為它能確保所有新`Food`實例的中存儲型屬性都被初始化。`Food`類沒有父類，所以`init(name: String)`構造器不需要調用`super.init()`來完成構造。

`Food`類同樣提供了一個沒有參數的便利構造器 `init()`。這個`init()`構造器為新食物提供了一個默認的佔位名字，通過代理調用同一類中定義的指定構造器`init(name: String)`並給參數`name`傳值`[Unnamed]`來實現：

```swift
let mysteryMeat = Food()
// mysteryMeat 的名字是 [Unnamed]
```

類層級中的第二個類是`Food`的子類`RecipeIngredient`。`RecipeIngredient`類構建了食譜中的一味調味劑。它引入了`Int`類型的數量屬性`quantity`（以及從`Food`繼承過來的`name`屬性），並且定義了兩個構造器來創建`RecipeIngredient`實例：

```swift
class RecipeIngredient: Food {
    var quantity: Int
    init(name: String, quantity: Int) {
        self.quantity = quantity
        super.init(name: name)
    }
    convenience init(name: String) {
        self.init(name: name, quantity: 1)
    }
}
```

下圖中展示了`RecipeIngredient`類的構造器鏈：

![RecipeIngredient構造器](https://developer.apple.com/library/prerelease/ios/documentation/swift/conceptual/swift_programming_language/Art/initializersExample02_2x.png)

`RecipeIngredient`類擁有一個指定構造器`init(name: String, quantity: Int)`，它可以用來產生新`RecipeIngredient`實例的所有屬性值。這個構造器一開始先將傳入的`quantity`參數賦值給`quantity`屬性，這個屬性也是唯一在`RecipeIngredient`中新引入的屬性。隨後，構造器將任務向上代理給父類`Food`的`init(name: String)`。這個過程滿足[兩段式構造過程](#two_phase_initialization)中的安全檢查1。

`RecipeIngredient`也定義了一個便利構造器`init(name: String)`，它只通過`name`來創建`RecipeIngredient`的實例。這個便利構造器假設任意`RecipeIngredient`實例的`quantity`為1，所以不需要顯示指明數量即可創建出實例。這個便利構造器的定義可以讓創建實例更加方便和快捷，並且避免了使用重複的代碼來創建多個`quantity`為 1 的`RecipeIngredient`實例。這個便利構造器只是簡單的將任務代理給了同一類裡提供的指定構造器。

注意，`RecipeIngredient`的便利構造器`init(name: String)`使用了跟`Food`中指定構造器`init(name: String)`相同的參數。儘管`RecipeIngredient`這個構造器是便利構造器，`RecipeIngredient`依然提供了對所有父類指定構造器的實現。因此，`RecipeIngredient`也能自動繼承了所有父類的便利構造器。

在這個例子中，`RecipeIngredient`的父類是`Food`，它有一個便利構造器`init()`。這個構造器因此也被`RecipeIngredient`繼承。這個繼承的`init()`函數版本跟`Food`提供的版本是一樣的，除了它是將任務代理給`RecipeIngredient`版本的`init(name: String)`而不是`Food`提供的版本。

所有的這三種構造器都可以用來創建新的`RecipeIngredient`實例：

```swift
let oneMysteryItem = RecipeIngredient()
let oneBacon = RecipeIngredient(name: "Bacon")
let sixEggs = RecipeIngredient(name: "Eggs", quantity: 6)
```

類層級中第三個也是最後一個類是`RecipeIngredient`的子類，叫做`ShoppingListItem`。這個類構建了購物單中出現的某一種調味料。

購物單中的每一項總是從`unpurchased`未購買狀態開始的。為了展現這一事實，`ShoppingListItem`引入了一個布爾類型的屬性`purchased`，它的默認值是`false`。`ShoppingListItem`還添加了一個計算型屬性`description`，它提供了關於`ShoppingListItem`實例的一些文字描述：

```swift
class ShoppingListItem: RecipeIngredient {
    var purchased = false
    var description: String {
    var output = "\(quantity) x \(name.lowercaseString)"
        output += purchased ? " □" : " □"
        return output
    }
}
```

> 注意：  
`ShoppingListItem`沒有定義構造器來為`purchased`提供初始化值，這是因為任何添加到購物單的項的初始狀態總是未購買。

由於它為自己引入的所有屬性都提供了默認值，並且自己沒有定義任何構造器，`ShoppingListItem`將自動繼承所有父類中的指定構造器和便利構造器。

下圖種展示了所有三個類的構造器鏈：

![三類構造器圖](https://developer.apple.com/library/prerelease/ios/documentation/swift/conceptual/swift_programming_language/Art/initializersExample03_2x.png)

你可以使用全部三個繼承來的構造器來創建`ShoppingListItem`的新實例：

```swift
var breakfastList = [
    ShoppingListItem(),
    ShoppingListItem(name: "Bacon"),
    ShoppingListItem(name: "Eggs", quantity: 6),
]
breakfastList[0].name = "Orange juice"
breakfastList[0].purchased = true
for item in breakfastList {
    println(item.description)
}
// 1 x orange juice □
// 1 x bacon □
// 6 x eggs □
```

如上所述，例子中通過字面量方式創建了一個新數組`breakfastList`，它包含了三個新的`ShoppingListItem`實例，因此數組的類型也能自動推導為`ShoppingListItem[]`。在數組創建完之後，數組中第一個`ShoppingListItem`實例的名字從`[Unnamed]`修改為`Orange juice`，並標記為已購買。接下來通過遍歷數組每個元素並打印它們的描述值，展示了所有項當前的默認狀態都已按照預期完成了賦值。

<a name="setting_a_default_property_value_with_a_closure_or_function"></a>
## 通過閉包和函數來設置屬性的默認值

如果某個存儲型屬性的默認值需要特別的定制或準備，你就可以使用閉包或全局函數來為其屬性提供定制的默認值。每當某個屬性所屬的新類型實例創建時，對應的閉包或函數會被調用，而它們的返回值會當做默認值賦值給這個屬性。

這種類型的閉包或函數一般會創建一個跟屬性類型相同的臨時變量，然後修改它的值以滿足預期的初始狀態，最後將這個臨時變量的值作為屬性的默認值進行返回。

下面列舉了閉包如何提供默認值的代碼概要：

```swift
class SomeClass {
    let someProperty: SomeType = {
        // 在這個閉包中給 someProperty 創建一個默認值
        // someValue 必須和 SomeType 類型相同
        return someValue
        }()
}
```

注意閉包結尾的大括號後面接了一對空的小括號。這是用來告訴 Swift 需要立刻執行此閉包。如果你忽略了這對括號，相當於是將閉包本身作為值賦值給了屬性，而不是將閉包的返回值賦值給屬性。

>注意：  
如果你使用閉包來初始化屬性的值，請記住在閉包執行時，實例的其它部分都還沒有初始化。這意味著你不能夠在閉包裡訪問其它的屬性，就算這個屬性有默認值也不允許。同樣，你也不能使用隱式的`self`屬性，或者調用其它的實例方法。

下面例子中定義了一個結構體`Checkerboard`，它構建了西洋跳棋遊戲的棋盤：

![西洋跳棋棋盤](https://developer.apple.com/library/prerelease/ios/documentation/swift/conceptual/swift_programming_language/Art/checkersBoard_2x.png)

西洋跳棋遊戲在一副黑白格交替的 10x10 的棋盤中進行。為了呈現這副遊戲棋盤，`Checkerboard`結構體定義了一個屬性`boardColors`，它是一個包含 100 個布爾值的數組。數組中的某元素布爾值為`true`表示對應的是一個黑格，布爾值為`false`表示對應的是一個白格。數組中第一個元素代表棋盤上左上角的格子，最後一個元素代表棋盤上右下角的格子。

`boardColor`數組是通過一個閉包來初始化和組裝顏色值的：

```swift
struct Checkerboard {
    let boardColors: Bool[] = {
        var temporaryBoard = Bool[]()
        var isBlack = false
        for i in 1...10 {
            for j in 1...10 {
                temporaryBoard.append(isBlack)
                isBlack = !isBlack
            }
            isBlack = !isBlack
        }
        return temporaryBoard
        }()
    func squareIsBlackAtRow(row: Int, column: Int) -> Bool {
        return boardColors[(row * 10) + column]
    }
}
```

每當一個新的`Checkerboard`實例創建時，對應的賦值閉包會執行，一系列顏色值會被計算出來作為默認值賦值給`boardColors`。上面例子中描述的閉包將計算出棋盤中每個格子合適的顏色，將這些顏色值保存到一個臨時數組`temporaryBoard`中，並在構建完成時將此數組作為閉包返回值返回。這個返回的值將保存到`boardColors`中，並可以通`squareIsBlackAtRow`這個工具函數來查詢。

```swift
let board = Checkerboard()
println(board.squareIsBlackAtRow(0, column: 1))
// 輸出 "true"
println(board.squareIsBlackAtRow(9, column: 9))
// 輸出 "false"
```
