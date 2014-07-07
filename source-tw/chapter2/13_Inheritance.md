> 翻譯：[Hawstein](https://github.com/Hawstein)  
> 校對：[menlongsheng](https://github.com/menlongsheng)

# 繼承（Inheritance）
-------------------

本頁包含內容：

- [定義一個基類（Base class）](#defining_a_base_class)
- [子類生成（Subclassing）](#subclassing)
- [重寫（Overriding）](#overriding)
- [防止重寫](#preventing_overrides)

一個類可以*繼承（inherit）*另一個類的方法（methods），屬性（property）和其它特性。當一個類繼承其它類時，繼承類叫*子類（subclass）*，被繼承類叫*超類（或父類，superclass）*。在 Swift 中，繼承是區分「類」與其它類型的一個基本特徵。

在 Swift 中，類可以調用和訪問超類的方法，屬性和下標腳本（subscripts），並且可以重寫（override）這些方法，屬性和下標腳本來優化或修改它們的行為。Swift 會檢查你的重寫定義在超類中是否有匹配的定義，以此確保你的重寫行為是正確的。

可以為類中繼承來的屬性添加屬性觀察器（property observer），這樣一來，當屬性值改變時，類就會被通知到。可以為任何屬性添加屬性觀察器，無論它原本被定義為存儲型屬性（stored property）還是計算型屬性（computed property）。

<a name="defining_a_base_class"></a>
## 定義一個基類（Base class）

不繼承於其它類的類，稱之為*基類（base calss）*。

> 注意：  
Swift 中的類並不是從一個通用的基類繼承而來。如果你不為你定義的類指定一個超類的話，這個類就自動成為基類。

下面的例子定義了一個叫`Vehicle`的基類。這個基類聲明了兩個對所有車輛都通用的屬性（`numberOfWheels`和`maxPassengers`）。這些屬性在`description`方法中使用，這個方法返回一個`String`類型的，對車輛特徵的描述：

```swift
class Vehicle {
    var numberOfWheels: Int
    var maxPassengers: Int
    func description() -> String {
        return "\(numberOfWheels) wheels; up to \(maxPassengers) passengers"
    }
    init() {
        numberOfWheels = 0
        maxPassengers = 1
    }
}
```

`Vehicle`類定義了*構造器（initializer）*來設置屬性的值。構造器會在[構造過程](../chapter2/_14Initialization.html)一節中詳細介紹，這裡我們做一下簡單介紹，以便於講解子類中繼承來的屬性如何被修改。

構造器用於創建某個類型的一個新實例。儘管構造器並不是方法，但在語法上，兩者很相似。構造器的工作是準備新實例以供使用，並確保實例中的所有屬性都擁有有效的初始化值。

構造器的最簡單形式就像一個沒有參數的實例方法，使用`init`關鍵字：

```swift
init() {
    // 執行構造過程
}
```

如果要創建一個`Vehicle`類的新實例，使用*構造器*語法調用上面的初始化器，即類名後面跟一個空的小括號：

```swift
let someVehicle = Vehicle()
```

這個`Vehicle`類的構造器為任意的一輛車設置一些初始化屬性值（`numberOfWheels = 0 `和`maxPassengers = 1`）。

`Vehicle`類定義了車輛的共同特性，但這個類本身並沒太大用處。為了使它更為實用，你需要進一步細化它來描述更具體的車輛。

<a name="subclassing"></a>
## 子類生成（Subclassing）

*子類生成（Subclassing）*指的是在一個已有類的基礎上創建一個新的類。子類繼承超類的特性，並且可以優化或改變它。你還可以為子類添加新的特性。

為了指明某個類的超類，將超類名寫在子類名的後面，用冒號分隔：

```swift
class SomeClass: SomeSuperclass {
    // 類的定義
}
```

下一個例子，定義一個更具體的車輛類叫`Bicycle`。這個新類是在 `Vehicle`類的基礎上創建起來。因此你需要將`Vehicle`類放在 `Bicycle`類後面，用冒號分隔。

我們可以將這讀作：

「定義一個新的類叫`Bicycle `，它繼承了`Vehicle`的特性」；

```swift
class Bicycle: Vehicle {
    init() {
        super.init()
        numberOfWheels = 2
    }
}
```
preview
 `Bicycle`是`Vehicle`的子類，`Vehicle`是`Bicycle`的超類。新的`Bicycle`類自動獲得`Vehicle`類的特性，比如 `maxPassengers`和`numberOfWheels`屬性。你可以在子類中定制這些特性，或添加新的特性來更好地描述`Bicycle`類。

`Bicycle`類定義了一個構造器來設置它定制的特性（自行車只有2個輪子）。`Bicycle`的構造器調用了它父類`Vehicle`的構造器 `super.init()`，以此確保在`Bicycle`類試圖修改那些繼承來的屬性前`Vehicle`類已經初始化過它們了。

> 注意：  
不像 Objective-C，在 Swift 中，初始化器默認是不繼承的，見[初始化器的繼承與重寫](../chapter2/_14Initialization.html#initializer_inheritance_and_ overriding)

`Vehicle`類中`maxPassengers`的默認值對自行車來說已經是正確的，因此在`Bicycle`的構造器中並沒有改變它。而`numberOfWheels`原來的值對自行車來說是不正確的，因此在初始化器中將它更改為 2。

`Bicycle`不僅可以繼承`Vehicle`的屬性，還可以繼承它的方法。如果你創建了一個`Bicycle`類的實例，你就可以調用它繼承來的`description`方法，並且可以看到，它輸出的屬性值已經發生了變化：

```swift
let bicycle = Bicycle()
println("Bicycle: \(bicycle.description())")
// Bicycle: 2 wheels; up to 1 passengers
```

子類還可以繼續被其它類繼承：

```swift
class Tandem: Bicycle {
    init() {
        super.init()
        maxPassengers = 2
    }
}
```

上面的例子創建了`Bicycle`的一個子類：雙人自行車（tandem）。`Tandem`從`Bicycle`繼承了兩個屬性，而這兩個屬性是`Bicycle`從`Vehicle`繼承而來的。`Tandem`並不修改輪子的數量，因為它仍是一輛自行車，有 2 個輪子。但它需要修改`maxPassengers`的值，因為雙人自行車可以坐兩個人。

> 注意：  
子類只允許修改從超類繼承來的變量屬性，而不能修改繼承來的常量屬性。

創建一個`Tandem`類的實例，打印它的描述，即可看到它的屬性已被更新：

```swift
let tandem = Tandem()
println("Tandem: \(tandem.description())")
// Tandem: 2 wheels; up to 2 passengers
```

注意，`Tandem`類也繼承了`description`方法。一個類的實例方法會被這個類的所有子類繼承。

<a name="overriding"></a>
## 重寫（Overriding）

子類可以為繼承來的實例方法（instance method），類方法（class method），實例屬性（instance property），或下標腳本（subscript）提供自己定制的實現（implementation）。我們把這種行為叫*重寫（overriding）*。

如果要重寫某個特性，你需要在重寫定義的前面加上`override`關鍵字。這麼做，你就表明了你是想提供一個重寫版本，而非錯誤地提供了一個相同的定義。意外的重寫行為可能會導致不可預知的錯誤，任何缺少`override`關鍵字的重寫都會在編譯時被診斷為錯誤。

`override`關鍵字會提醒 Swift 編譯器去檢查該類的超類（或其中一個父類）是否有匹配重寫版本的聲明。這個檢查可以確保你的重寫定義是正確的。

### 訪問超類的方法，屬性及下標腳本

當你在子類中重寫超類的方法，屬性或下標腳本時，有時在你的重寫版本中使用已經存在的超類實現會大有裨益。比如，你可以優化已有實現的行為，或在一個繼承來的變量中存儲一個修改過的值。

在合適的地方，你可以通過使用`super`前綴來訪問超類版本的方法，屬性或下標腳本：

* 在方法`someMethod`的重寫實現中，可以通過`super.someMethod()`來調用超類版本的`someMethod`方法。
* 在屬性`someProperty`的 getter 或 setter 的重寫實現中，可以通過`super.someProperty`來訪問超類版本的`someProperty`屬性。
* 在下標腳本的重寫實現中，可以通過`super[someIndex]`來訪問超類版本中的相同下標腳本。

### 重寫方法

在子類中，你可以重寫繼承來的實例方法或類方法，提供一個定制或替代的方法實現。

下面的例子定義了`Vehicle`的一個新的子類，叫`Car`，它重寫了從`Vehicle`類繼承來的`description`方法：

```swift
class Car: Vehicle {
    var speed: Double = 0.0
    init() {
        super.init()
        maxPassengers = 5
        numberOfWheels = 4
    }
    override func description() -> String {
        return super.description() + "; "
            + "traveling at \(speed) mph"
    }
}
```

`Car`聲明了一個新的存儲型屬性`speed`，它是`Double`類型的，默認值是`0.0`，表示「時速是0英里」。`Car`有自己的初始化器，它將乘客的最大數量設為5，輪子數量設為4。

`Car`重寫了繼承來的`description`方法，它的聲明與`Vehicle`中的`description`方法一致，聲明前面加上了`override`關鍵字。

`Car`中的`description`方法並非完全自定義，而是通過`super.description`使用了超類`Vehicle`中的`description`方法，然後再追加一些額外的信息，比如汽車的當前速度。

如果你創建一個`Car`的新實例，並打印`description`方法的輸出，你就會發現描述信息已經發生了改變：

```swift
let car = Car()
println("Car: \(car.description())")
// Car: 4 wheels; up to 5 passengers; traveling at 0.0 mph
```

### 重寫屬性

你可以重寫繼承來的實例屬性或類屬性，提供自己定制的getter和setter，或添加屬性觀察器使重寫的屬性觀察屬性值什麼時候發生改變。

#### 重寫屬性的Getters和Setters

你可以提供定制的 getter（或 setter）來重寫任意繼承來的屬性，無論繼承來的屬性是存儲型的還是計算型的屬性。子類並不知道繼承來的屬性是存儲型的還是計算型的，它只知道繼承來的屬性會有一個名字和類型。你在重寫一個屬性時，必需將它的名字和類型都寫出來。這樣才能使編譯器去檢查你重寫的屬性是與超類中同名同類型的屬性相匹配的。

你可以將一個繼承來的只讀屬性重寫為一個讀寫屬性，只需要你在重寫版本的屬性裡提供 getter 和 setter 即可。但是，你不可以將一個繼承來的讀寫屬性重寫為一個只讀屬性。

> 注意：  
如果你在重寫屬性中提供了 setter，那麼你也一定要提供 getter。如果你不想在重寫版本中的 getter 裡修改繼承來的屬性值，你可以直接返回`super.someProperty`來返回繼承來的值。正如下面的`SpeedLimitedCar`的例子所示。

以下的例子定義了一個新類，叫`SpeedLimitedCar`，它是`Car`的子類。類`SpeedLimitedCar`表示安裝了限速裝置的車，它的最高速度只能達到40mph。你可以通過重寫繼承來的`speed`屬性來實現這個速度限制：

```swift
class SpeedLimitedCar: Car {
    override var speed: Double  {
    get {
        return super.speed
    }
    set {
        super.speed = min(newValue, 40.0)
    }
    }
}
```

當你設置一個`SpeedLimitedCar`實例的`speed`屬性時，屬性setter的實現會去檢查新值與限制值40mph的大小，它會將超類的`speed`設置為`newValue`和`40.0`中較小的那個。這兩個值哪個較小由`min`函數決定，它是Swift標準庫中的一個全局函數。`min`函數接收兩個或更多的數，返回其中最小的那個。

如果你嘗試將`SpeedLimitedCar`實例的`speed`屬性設置為一個大於40mph的數，然後打印`description`函數的輸出，你會發現速度被限制在40mph：

```swift
let limitedCar = SpeedLimitedCar()
limitedCar.speed = 60.0
println("SpeedLimitedCar: \(limitedCar.description())")
// SpeedLimitedCar: 4 wheels; up to 5 passengers; traveling at 40.0 mph
```

#### 重寫屬性觀察器（Property Observer）

你可以在屬性重寫中為一個繼承來的屬性添加屬性觀察器。這樣一來，當繼承來的屬性值發生改變時，你就會被通知到，無論那個屬性原本是如何實現的。關於屬性觀察器的更多內容，請看[屬性觀察器](../chapter2/_10Properties.html#property_observer)。

> 注意：  
你不可以為繼承來的常量存儲型屬性或繼承來的只讀計算型屬性添加屬性觀察器。這些屬性的值是不可以被設置的，所以，為它們提供`willSet`或`didSet`實現是不恰當。此外還要注意，你不可以同時提供重寫的 setter 和重寫的屬性觀察器。如果你想觀察屬性值的變化，並且你已經為那個屬性提供了定制的 setter，那麼你在 setter 中就可以觀察到任何值變化了。

下面的例子定義了一個新類叫`AutomaticCar`，它是`Car`的子類。`AutomaticCar`表示自動擋汽車，它可以根據當前的速度自動選擇合適的擋位。`AutomaticCar`也提供了定制的`description`方法，可以輸出當前擋位。

```swift
class AutomaticCar: Car {
    var gear = 1
    override var speed: Double {
    didSet {
        gear = Int(speed / 10.0) + 1
    }
    }
    override func description() -> String {
        return super.description() + " in gear \(gear)"
    }
}
```

當你設置`AutomaticCar`的`speed`屬性，屬性的`didSet`觀察器就會自動地設置`gear`屬性，為新的速度選擇一個合適的擋位。具體來說就是，屬性觀察器將新的速度值除以10，然後向下取得最接近的整數值，最後加1來得到檔位`gear`的值。例如，速度為10.0時，擋位為1；速度為35.0時，擋位為4：

```swift
let automatic = AutomaticCar()
automatic.speed = 35.0
println("AutomaticCar: \(automatic.description())")
// AutomaticCar: 4 wheels; up to 5 passengers; traveling at 35.0 mph in gear 4
```

<a name="preventing_overrides"></a>
## 防止重寫

你可以通過把方法，屬性或下標腳本標記為*`final`*來防止它們被重寫，只需要在聲明關鍵字前加上`@final`特性即可。（例如：`@final var`, `@final func`, `@final class func`, 以及 `@final subscript`）

如果你重寫了`final`方法，屬性或下標腳本，在編譯時會報錯。在擴展中，你添加到類裡的方法，屬性或下標腳本也可以在擴展的定義裡標記為 final。

你可以通過在關鍵字`class`前添加`@final`特性（`@final class`）來將整個類標記為 final 的，這樣的類是不可被繼承的，否則會報編譯錯誤。

