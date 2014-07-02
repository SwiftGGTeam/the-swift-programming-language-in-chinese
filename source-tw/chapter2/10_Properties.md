> 翻譯：[shinyzhu](https://github.com/shinyzhu)  
> 校對：[pp-prog](https://github.com/pp-prog)

# 屬性 (Properties)
---

本頁包含內容：

- [存儲屬性（Stored Properties）](#stored_properties)
- [計算屬性（Computed Properties）](#computed_properties)
- [屬性觀察器（Property Observers）](#property_observers)
- [全局變量和局部變量（Global and Local Variables）](global_and_local_variables)
- [類型屬性（Type Properties）](#type_properties)

**屬性**將值跟特定的類、結構或枚舉關聯。存儲屬性存儲常量或變量作為實例的一部分，計算屬性計算（而不是存儲）一個值。計算屬性可以用於類、結構體和枚舉裡，存儲屬性只能用於類和結構體。

存儲屬性和計算屬性通常用於特定類型的實例，但是，屬性也可以直接用於類型本身，這種屬性稱為類型屬性。

另外，還可以定義屬性觀察器來監控屬性值的變化，以此來觸發一個自定義的操作。屬性觀察器可以添加到自己寫的存儲屬性上，也可以添加到從父類繼承的屬性上。

<a name="stored_properties"></a>
## 存儲屬性

簡單來說，一個存儲屬性就是存儲在特定類或結構體的實例裡的一個常量或變量，存儲屬性可以是*變量存儲屬性*（用關鍵字`var`定義），也可以是*常量存儲屬性*（用關鍵字`let`定義）。

可以在定義存儲屬性的時候指定默認值，請參考[構造過程](../chapter2/14_Initialization.html)一章的[默認屬性值](../chapter2/14_Initialization.html#default_property_values)一節。也可以在構造過程中設置或修改存儲屬性的值，甚至修改常量存儲屬性的值，請參考[構造過程](../chapter2/14_Initialization.html)一章的[在初始化階段修改常量存儲屬性](../chapter2/14_Initialization.html#modifying_constant_properties_during_initialization)一節。

下面的例子定義了一個名為`FixedLengthRange`的結構體，它描述了一個在創建後無法修改值域寬度的區間：

```swift
struct FixedLengthRange {
    var firstValue: Int
    let length: Int
}
var rangeOfThreeItems = FixedLengthRange(firstValue: 0, length: 3)
// 該區間表示整數0，1，2
rangeOfThreeItems.firstValue = 6
// 該區間現在表示整數6，7，8
```

`FixedLengthRange`的實例包含一個名為`firstValue`的變量存儲屬性和一個名為`length`的常量存儲屬性。在上面的例子中，`length`在創建實例的時候被賦值，因為它是一個常量存儲屬性，所以之後無法修改它的值。

<a name="stored_properties_of_constant_structure_instances"></a>
### 常量和存儲屬性

如果創建了一個結構體的實例並賦值給一個常量，則無法修改實例的任何屬性，即使定義了變量存儲屬性：

```swift
let rangeOfFourItems = FixedLengthRange(firstValue: 0, length: 4)
// 該區間表示整數0，1，2，3
rangeOfFourItems.firstValue = 6
// 儘管 firstValue 是個變量屬性，這裡還是會報錯
```

因為`rangeOfFourItems`聲明成了常量（用`let`關鍵字），即使`firstValue`是一個變量屬性，也無法再修改它了。

這種行為是由於結構體（struct）屬於*值類型*。當值類型的實例被聲明為常量的時候，它的所有屬性也就成了常量。

屬於*引用類型*的類（class）則不一樣，把一個引用類型的實例賦給一個常量後，仍然可以修改實例的變量屬性。

<a name="lazy_stored_properties"></a>
### 延遲存儲屬性

延遲存儲屬性是指當第一次被調用的時候才會計算其初始值的屬性。在屬性聲明前使用`@lazy`來標示一個延遲存儲屬性。

> 注意：  
> 必須將延遲存儲屬性聲明成變量（使用`var`關鍵字），因為屬性的值在實例構造完成之前可能無法得到。而常量屬性在構造過程完成之前必須要有初始值，因此無法聲明成延遲屬性。  

延遲屬性很有用，當屬性的值依賴於在實例的構造過程結束前無法知道具體值的外部因素時，或者當屬性的值需要複雜或大量計算時，可以只在需要的時候來計算它。

下面的例子使用了延遲存儲屬性來避免複雜類的不必要的初始化。例子中定義了`DataImporter`和`DataManager`兩個類，下面是部分代碼：

```swift
class DataImporter {
    /*
    DataImporter 是一個將外部文件中的數據導入的類。
    這個類的初始化會消耗不少時間。
    */
    var fileName = "data.txt"
    // 這是提供數據導入功能
}

class DataManager {
    @lazy var importer = DataImporter()
    var data = String[]()
    // 這是提供數據管理功能
}

let manager = DataManager()
manager.data += "Some data"
manager.data += "Some more data"
// DataImporter 實例的 importer 屬性還沒有被創建
```

`DataManager`類包含一個名為`data`的存儲屬性，初始值是一個空的字符串（`String`）數組。雖然沒有寫出全部代碼，`DataManager`類的目的是管理和提供對這個字符串數組的訪問。

`DataManager`的一個功能是從文件導入數據，該功能由`DataImporter`類提供，`DataImporter`需要消耗不少時間完成初始化：因為它的實例在初始化時可能要打開文件，還要讀取文件內容到內存。

`DataManager`也可能不從文件中導入數據。所以當`DataManager`的實例被創建時，沒必要創建一個`DataImporter`的實例，更明智的是當用到`DataImporter`的時候才去創建它。

由於使用了`@lazy`，`importer`屬性只有在第一次被訪問的時候才被創建。比如訪問它的屬性`fileName`時：

```swift
println(manager.importer.fileName)
// DataImporter 實例的 importer 屬性現在被創建了
// 輸出 "data.txt」
```

<a name="stored_properties_and_instance_variables"></a>
### 存儲屬性和實例變量

如果您有過 Objective-C 經驗，應該知道Objective-C為類實例存儲值和引提供兩種方用。對於屬性來說，也可以使用實例變量作為屬性值的後端存儲。

Swift 編程語言中把這些理論統一用屬性來實現。Swift 中的屬性沒有對應的實例變量，屬性的後端存儲也無法直接訪問。這就避免了不同場景下訪問方式的困擾，同時也將屬性的定義簡化成一個語句。
一個類型中屬性的全部信息——包括命名、類型和內存管理特徵——都在唯一一個地方（類型定義中）定義。

<a name="computed_properties"></a>
## 計算屬性

除存儲屬性外，類、結構體和枚舉可以定義*計算屬性*，計算屬性不直接存儲值，而是提供一個 getter 來獲取值，一個可選的 setter 來間接設置其他屬性或變量的值。

```swift
struct Point {
    var x = 0.0, y = 0.0
}
struct Size {
    var width = 0.0, height = 0.0
}
struct Rect {
    var origin = Point()
    var size = Size()
    var center: Point {
    get {
        let centerX = origin.x + (size.width / 2)
        let centerY = origin.y + (size.height / 2)
        return Point(x: centerX, y: centerY)
    }
    set(newCenter) {
        origin.x = newCenter.x - (size.width / 2)
        origin.y = newCenter.y - (size.height / 2)
    }
    }
}
var square = Rect(origin: Point(x: 0.0, y: 0.0),
    size: Size(width: 10.0, height: 10.0))
let initialSquareCenter = square.center
square.center = Point(x: 15.0, y: 15.0)
println("square.origin is now at (\(square.origin.x), \(square.origin.y))")
// 輸出 "square.origin is now at (10.0, 10.0)」
```

這個例子定義了 3 個幾何形狀的結構體：

- `Point`封裝了一個`(x, y)`的坐標
- `Size`封裝了一個`width`和`height`
- `Rect`表示一個有原點和尺寸的矩形

`Rect`也提供了一個名為`center`的計算屬性。一個矩形的中心點可以從原點和尺寸來算出，所以不需要將它以顯式聲明的`Point`來保存。`Rect`的計算屬性`center`提供了自定義的 getter 和 setter 來獲取和設置矩形的中心點，就像它有一個存儲屬性一樣。

例子中接下來創建了一個名為`square`的`Rect`實例，初始值原點是`(0, 0)`，寬度高度都是`10`。如圖所示藍色正方形。

`square`的`center`屬性可以通過點運算符（`square.center`）來訪問，這會調用 getter 來獲取屬性的值。跟直接返回已經存在的值不同，getter 實際上通過計算然後返回一個新的`Point`來表示`square`的中心點。如代碼所示，它正確返回了中心點`(5, 5)`。

`center`屬性之後被設置了一個新的值`(15, 15)`，表示向右上方移動正方形到如圖所示橙色正方形的位置。設置屬性`center`的值會調用 setter 來修改屬性`origin`的`x`和`y`的值，從而實現移動正方形到新的位置。

<img src="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/computedProperties_2x.png" alt="Computed Properties sample" width="388" height="387" />

<a name="shorthand_setter_declaration"></a>
### 便捷 setter 聲明

如果計算屬性的 setter 沒有定義表示新值的參數名，則可以使用默認名稱`newValue`。下面是使用了便捷 setter 聲明的`Rect`結構體代碼：

```swift
struct AlternativeRect {
    var origin = Point()
    var size = Size()
    var center: Point {
    get {
        let centerX = origin.x + (size.width / 2)
        let centerY = origin.y + (size.height / 2)
        return Point(x: centerX, y: centerY)
    }
    set {
        origin.x = newValue.x - (size.width / 2)
        origin.y = newValue.y - (size.height / 2)
    }
    }
}
```

<a name="readonly_computed_properties"></a>
### 只讀計算屬性

只有 getter 沒有 setter 的計算屬性就是*只讀計算屬性*。只讀計算屬性總是返回一個值，可以通過點運算符訪問，但不能設置新的值。

<<<<<<< HEAD
> 注意：  
> 必須使用`var`關鍵字定義計算屬性，包括只讀計算屬性，因為他們的值不是固定的。`let`關鍵字只用來聲明常量屬性，表示初始化後再也無法修改的值。  
=======
> 注意：
>
> 必須使用`var`關鍵字定義計算屬性，包括只讀計算屬性，因為它們的值不是固定的。`let`關鍵字只用來聲明常量屬性，表示初始化後再也無法修改的值。
>>>>>>> a516af6a531a104ec88da0d236ecf389a5ec72af

只讀計算屬性的聲明可以去掉`get`關鍵字和花括號：

```swift
struct Cuboid {
    var width = 0.0, height = 0.0, depth = 0.0
    var volume: Double {
    return width * height * depth
    }
}
let fourByFiveByTwo = Cuboid(width: 4.0, height: 5.0, depth: 2.0)
println("the volume of fourByFiveByTwo is \(fourByFiveByTwo.volume)")
// 輸出 "the volume of fourByFiveByTwo is 40.0"
```

這個例子定義了一個名為`Cuboid`的結構體，表示三維空間的立方體，包含`width`、`height`和`depth`屬性，還有一個名為`volume`的只讀計算屬性用來返回立方體的體積。設置`volume`的值毫無意義，因為通過`width`、`height`和`depth`就能算出`volume`。然而，`Cuboid`提供一個只讀計算屬性來讓外部用戶直接獲取體積是很有用的。

<a name="property_observers"></a>
## 屬性觀察器

*屬性觀察器*監控和響應屬性值的變化，每次屬性被設置值的時候都會調用屬性觀察器，甚至新的值和現在的值相同的時候也不例外。

可以為除了延遲存儲屬性之外的其他存儲屬性添加屬性觀察器，也可以通過重載屬性的方式為繼承的屬性（包括存儲屬性和計算屬性）添加屬性觀察器。屬性重載請參考[繼承](chapter/13_Inheritance.html)一章的[重載](chapter/13_Inheritance.html#overriding)。

> 注意：  
> 不需要為無法重載的計算屬性添加屬性觀察器，因為可以通過 setter 直接監控和響應值的變化。  

可以為屬性添加如下的一個或全部觀察器：

- `willSet`在設置新的值之前調用
- `didSet`在新的值被設置之後立即調用

`willSet`觀察器會將新的屬性值作為固定參數傳入，在`willSet`的實現代碼中可以為這個參數指定一個名稱，如果不指定則參數仍然可用，這時使用默認名稱`newValue`表示。

類似地，`didSet`觀察器會將舊的屬性值作為參數傳入，可以為該參數命名或者使用默認參數名`oldValue`。

<<<<<<< HEAD
> 注意：  
> `willSet`和`didSet`觀察器在屬性初始化過程中不會被調用，他們只會當屬性的值在初始化之外的地方被設置時被調用。  
=======
> 注意：
>
> `willSet`和`didSet`觀察器在屬性初始化過程中不會被調用，它們只會當屬性的值在初始化之外的地方被設置時被調用。
>>>>>>> a516af6a531a104ec88da0d236ecf389a5ec72af

這裡是一個`willSet`和`didSet`的實際例子，其中定義了一個名為`StepCounter`的類，用來統計當人步行時的總步數，可以跟計步器或其他日常鍛煉的統計裝置的輸入數據配合使用。

```swift
class StepCounter {
    var totalSteps: Int = 0 {
    willSet(newTotalSteps) {
        println("About to set totalSteps to \(newTotalSteps)")
    }
    didSet {
        if totalSteps > oldValue  {
            println("Added \(totalSteps - oldValue) steps")
        }
    }
    }
}
let stepCounter = StepCounter()
stepCounter.totalSteps = 200
// About to set totalSteps to 200
// Added 200 steps
stepCounter.totalSteps = 360
// About to set totalSteps to 360
// Added 160 steps
stepCounter.totalSteps = 896
// About to set totalSteps to 896
// Added 536 steps
```

`StepCounter`類定義了一個`Int`類型的屬性`totalSteps`，它是一個存儲屬性，包含`willSet`和`didSet`觀察器。

當`totalSteps`設置新值的時候，它的`willSet`和`didSet`觀察器都會被調用，甚至當新的值和現在的值完全相同也會調用。

例子中的`willSet`觀察器將表示新值的參數自定義為`newTotalSteps`，這個觀察器只是簡單的將新的值輸出。

`didSet`觀察器在`totalSteps`的值改變後被調用，它把新的值和舊的值進行對比，如果總的步數增加了，就輸出一個消息表示增加了多少步。`didSet`沒有提供自定義名稱，所以默認值`oldValue`表示舊值的參數名。

> 注意：  
> 如果在`didSet`觀察器裡為屬性賦值，這個值會替換觀察器之前設置的值。  

<a name="global_and_local_variables"></a>
##全局變量和局部變量

計算屬性和屬性觀察器所描述的模式也可以用於*全局變量*和*局部變量*，全局變量是在函數、方法、閉包或任何類型之外定義的變量，局部變量是在函數、方法或閉包內部定義的變量。

前面章節提到的全局或局部變量都屬於存儲型變量，跟存儲屬性類似，它提供特定類型的存儲空間，並允許讀取和寫入。

另外，在全局或局部範圍都可以定義計算型變量和為存儲型變量定義觀察器，計算型變量跟計算屬性一樣，返回一個計算的值而不是存儲值，聲明格式也完全一樣。

> 注意：  
> 全局的常量或變量都是延遲計算的，跟[延遲存儲屬性](#lazy_stored_properties)相似，不同的地方在於，全局的常量或變量不需要標記`@lazy`特性。  
> 局部範圍的常量或變量不會延遲計算。  

<a name="type_properties"></a>
##類型屬性

實例的屬性屬於一個特定類型實例，每次類型實例化後都擁有自己的一套屬性值，實例之間的屬性相互獨立。

也可以為類型本身定義屬性，不管類型有多少個實例，這些屬性都只有唯一一份。這種屬性就是*類型屬性*。

類型屬性用於定義特定類型所有實例共享的數據，比如所有實例都能用的一個常量（就像 C 語言中的靜態常量），或者所有實例都能訪問的一個變量（就像 C 語言中的靜態變量）。

對於值類型（指結構體和枚舉）可以定義存儲型和計算型類型屬性，對於類（class）則只能定義計算型類型屬性。

值類型的存儲型類型屬性可以是變量或常量，計算型類型屬性跟實例的計算屬性一樣定義成變量屬性。

> 注意：  
> 跟實例的存儲屬性不同，必須給存儲型類型屬性指定默認值，因為類型本身無法在初始化過程中使用構造器給類型屬性賦值。  

<a name="type_property_syntax"></a>
###類型屬性語法

在 C 或 Objective-C 中，靜態常量和靜態變量的定義是通過特定類型加上`global`關鍵字。在 Swift 編程語言中，類型屬性是作為類型定義的一部分寫在類型最外層的花括號內，因此它的作用範圍也就在類型支持的範圍內。

使用關鍵字`static`來定義值類型的類型屬性，關鍵字`class`來為類（class）定義類型屬性。下面的例子演示了存儲型和計算型類型屬性的語法：

```swift
struct SomeStructure {
    static var storedTypeProperty = "Some value."
    static var computedTypeProperty: Int {
    // 這裡返回一個 Int 值
    }
}
enum SomeEnumeration {
    static var storedTypeProperty = "Some value."
    static var computedTypeProperty: Int {
    // 這裡返回一個 Int 值
    }
}
class SomeClass {
    class var computedTypeProperty: Int {
    // 這裡返回一個 Int 值
    }
}
```

> 注意：  
> 例子中的計算型類型屬性是只讀的，但也可以定義可讀可寫的計算型類型屬性，跟實例計算屬性的語法類似。  

<a name="querying_and_setting_type_properties"></a>
###獲取和設置類型屬性的值

跟實例的屬性一樣，類型屬性的訪問也是通過點運算符來進行，但是，類型屬性是通過類型本身來獲取和設置，而不是通過實例。比如：

```swift
println(SomeClass.computedTypeProperty)
// 輸出 "42"

println(SomeStructure.storedTypeProperty)
// 輸出 "Some value."
SomeStructure.storedTypeProperty = "Another value."
println(SomeStructure.storedTypeProperty)
// 輸出 "Another value.」
```

下面的例子定義了一個結構體，使用兩個存儲型類型屬性來表示多個聲道的聲音電平值，每個聲道有一個 0 到 10 之間的整數表示聲音電平值。

後面的圖表展示了如何聯合使用兩個聲道來表示一個立體聲的聲音電平值。當聲道的電平值是 0，沒有一個燈會亮；當聲道的電平值是 10，所有燈點亮。本圖中，左聲道的電平是 9，右聲道的電平是 7。

<img src="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/staticPropertiesVUMeter_2x.png" alt="Static Properties VUMeter" width="243" height="357" />

上面所描述的聲道模型使用`AudioChannel`結構體來表示：

```swift
struct AudioChannel {
    static let thresholdLevel = 10
    static var maxInputLevelForAllChannels = 0
    var currentLevel: Int = 0 {
    didSet {
        if currentLevel > AudioChannel.thresholdLevel {
            // 將新電平值設置為閥值
            currentLevel = AudioChannel.thresholdLevel
        }
        if currentLevel > AudioChannel.maxInputLevelForAllChannels {
            // 存儲當前電平值作為新的最大輸入電平
            AudioChannel.maxInputLevelForAllChannels = currentLevel
        }
    }
    }
}
```

結構`AudioChannel`定義了 2 個存儲型類型屬性來實現上述功能。第一個是`thresholdLevel`，表示聲音電平的最大上限閾值，它是一個取值為 10 的常量，對所有實例都可見，如果聲音電平高於 10，則取最大上限值 10（見後面描述）。

第二個類型屬性是變量存儲型屬性`maxInputLevelForAllChannels`，它用來表示所有`AudioChannel`實例的電平值的最大值，初始值是 0。

`AudioChannel`也定義了一個名為`currentLevel`的實例存儲屬性，表示當前聲道現在的電平值，取值為 0 到 10。

屬性`currentLevel`包含`didSet`屬性觀察器來檢查每次新設置後的屬性值，有如下兩個檢查：

- 如果`currentLevel`的新值大於允許的閾值`thresholdLevel`，屬性觀察器將`currentLevel`的值限定為閾值`thresholdLevel`。
- 如果修正後的`currentLevel`值大於任何之前任意`AudioChannel`實例中的值，屬性觀察器將新值保存在靜態屬性`maxInputLevelForAllChannels`中。

> 注意：  
> 在第一個檢查過程中，`didSet`屬性觀察器將`currentLevel`設置成了不同的值，但這時不會再次調用屬性觀察器。  

可以使用結構體`AudioChannel`來創建表示立體聲系統的兩個聲道`leftChannel`和`rightChannel`：

```swift
var leftChannel = AudioChannel()
var rightChannel = AudioChannel()
```

如果將左聲道的電平設置成 7，類型屬性`maxInputLevelForAllChannels`也會更新成 7：

```swift
leftChannel.currentLevel = 7
println(leftChannel.currentLevel)
// 輸出 "7"
println(AudioChannel.maxInputLevelForAllChannels)
// 輸出 "7"
```

如果試圖將右聲道的電平設置成 11，則會將右聲道的`currentLevel`修正到最大值 10，同時`maxInputLevelForAllChannels`的值也會更新到 10：

```swift
rightChannel.currentLevel = 11
println(rightChannel.currentLevel)
// 輸出 "10"
println(AudioChannel.maxInputLevelForAllChannels)
// 輸出 "10"
```
