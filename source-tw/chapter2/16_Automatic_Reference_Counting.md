> 翻譯：[TimothyYe](https://github.com/TimothyYe)  
> 校對：[Hawstein](https://github.com/Hawstein)

# 自動引用計數
-----------------

本頁包含內容：

- [自動引用計數的工作機制](#how_arc_works)
- [自動引用計數實踐](#arc_in_action)
- [類實例之間的循環強引用](#strong_reference_cycles_between_class_instances)
- [解決實例之間的循環強引用](#resolving_strong_reference_cycles_between_class_instances)
- [閉包引起的循環強引用](#strong_reference_cycles_for_closures)
- [解決閉包引起的循環強引用](#resolving_strong_reference_cycles_for_closures)

Swift 使用自動引用計數（ARC）這一機制來跟蹤和管理你的應用程序的內存。通常情況下，Swift 的內存管理機制會一直起著作用，你無須自己來考慮內存的管理。ARC 會在類的實例不再被使用時，自動釋放其佔用的內存。

然而，在少數情況下，ARC 為了能幫助你管理內存，需要更多的關於你的代碼之間關係的信息。本章描述了這些情況，並且為你示範怎樣啟用 ARC 來管理你的應用程序的內存。

> 注意:  
引用計數僅僅應用於類的實例。結構體和枚舉類型是值類型，不是引用類型，也不是通過引用的方式存儲和傳遞。

<a name="how_arc_works"></a>
## 自動引用計數的工作機制

當你每次創建一個類的新的實例的時候，ARC 會分配一大塊內存用來儲存實例的信息。內存中會包含實例的類型信息，以及這個實例所有相關屬性的值。此外，當實例不再被使用時，ARC 釋放實例所佔用的內存，並讓釋放的內存能挪作他用。這確保了不再被使用的實例，不會一直佔用內存空間。

然而，當 ARC 收回和釋放了正在被使用中的實例，該實例的屬性和方法將不能再被訪問和調用。實際上，如果你試圖訪問這個實例，你的應用程序很可能會崩潰。

為了確保使用中的實例不會被銷毀，ARC 會跟蹤和計算每一個實例正在被多少屬性，常量和變量所引用。哪怕實例的引用數為一，ARC都不會銷毀這個實例。

為了使之成為可能，無論你將實例賦值給屬性，常量或者是變量，屬性，常量或者變量，都會對此實例創建強引用。之所以稱之為強引用，是因為它會將實例牢牢的保持住，只要強引用還在，實例是不允許被銷毀的。

<a name="arc_in_action"></a>
## 自動引用計數實踐

下面的例子展示了自動引用計數的工作機制。例子以一個簡單的`Person`類開始，並定義了一個叫`name`的常量屬性：

```swift
class Person {
    let name: String
    init(name: String) {
        self.name = name
        println("\(name) is being initialized")
    }
    deinit {
        println("\(name) is being deinitialized")
    }
}
```

`Person`類有一個構造函數，此構造函數為實例的`name`屬性賦值並打印出信息，以表明初始化過程生效。`Person`類同時也擁有析構函數，同樣會在實例被銷毀的時候打印出信息。

接下來的代碼片段定義了三個類型為`Person?`的變量，用來按照代碼片段中的順序，為新的`Person`實例建立多個引用。由於這些變量是被定義為可選類型（Person?，而不是Person），它們的值會被自動初始化為`nil`，目前還不會引用到`Person`類的實例。

```swift
var reference1: Person?
var reference2: Person?
var reference3: Person?
```

現在你可以創建`Person`類的新實例，並且將它賦值給三個變量其中的一個：

```swift
reference1 = Person(name: "John Appleseed")
// prints "John Appleseed is being initialized」
```

應當注意到當你調用`Person`類的構造函數的時候，"John Appleseed is being initialized」會被打印出來。由此可以確定構造函數被執行。

由於`Person`類的新實例被賦值給了`reference1`變量，所以`reference1`到`Person`類的新實例之間建立了一個強引用。正是因為這個強引用，ARC 會保證`Person`實例被保持在內存中不被銷毀。

如果你將同樣的`Person`實例也賦值給其他兩個變量，該實例又會多出兩個強引用：

```swift
reference2 = reference1
reference3 = reference1
```

現在這個`Person`實例已經有三個強引用了。

如果你通過給兩個變量賦值`nil`的方式斷開兩個強引用（）包括最先的那個強引用），只留下一個強引用，`Person`實例不會被銷毀：

```swift
reference1 = nil
reference2 = nil
```

ARC 會在第三個，也即最後一個強引用被斷開的時候，銷毀`Person`實例，這也意味著你不再使用這個`Person`實例：

```swift
reference3 = nil
// prints "John Appleseed is being deinitialized"
```

<a name="strong_reference_cycles_between_class_instances"></a>
## 類實例之間的循環強引用

在上面的例子中，ARC 會跟蹤你所新創建的`Person`實例的引用數量，並且會在`Person`實例不再被需要時銷毀它。

然而，我們可能會寫出這樣的代碼，一個類永遠不會有0個強引用。這種情況發生在兩個類實例互相保持對方的強引用，並讓對方不被銷毀。這就是所謂的循環強引用。

你可以通過定義類之間的關係為弱引用或者無主引用，以此替代強引用，從而解決循環強引用的問題。具體的過程在[解決類實例之間的循環強引用](#resolving_strong_reference_cycles_between_class_instances)中有描述。不管怎樣，在你學習怎樣解決循環強引用之前，很有必要瞭解一下它是怎樣產生的。

下面展示了一個不經意產生循環強引用的例子。例子定義了兩個類：`Person`和`Apartment`，用來建模公寓和它其中的居民:

```swift
class Person {
    let name: String
    init(name: String) { self.name = name }
    var apartment: Apartment?
    deinit { println("\(name) is being deinitialized") }
}
```

```swift
class Apartment {
    let number: Int
    init(number: Int) { self.number = number }
    var tenant: Person?
    deinit { println("Apartment #\(number) is being deinitialized") }
}
```

每一個`Person`實例有一個類型為`String`，名字為`name`的屬性，並有一個可選的初始化為`nil`的`apartment`屬性。`apartment`屬性是可選的，因為一個人並不總是擁有公寓。

類似的，每個`Apartment`實例有一個叫`number`，類型為`Int`的屬性，並有一個可選的初始化為`nil`的`tenant`屬性。`tenant`屬性是可選的，因為一棟公寓並不總是有居民。

這兩個類都定義了析構函數，用以在類實例被析構的時候輸出信息。這讓你能夠知曉`Person`和`Apartment`的實例是否像預期的那樣被銷毀。

接下來的代碼片段定義了兩個可選類型的變量`john`和`number73`,並分別被設定為下面的`Apartment`和`Person`的實例。這兩個變量都被初始化為`nil`，並為可選的：

```swift
var john: Person?
var number73: Apartment?
```

現在你可以創建特定的`Person`和`Apartment`實例並將類實例賦值給`john`和`number73`變量：

```swift
john = Person(name: "John Appleseed")
number73 = Apartment(number: 73)
```

在兩個實例被創建和賦值後，下圖表現了強引用的關係。變量`john`現在有一個指向`Person`實例的強引用，而變量`number73`有一個指向`Apartment`實例的強引用：

![](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/referenceCycle01_2x.png)

現在你能夠將這兩個實例關聯在一起，這樣人就能有公寓住了，而公寓也有了房客。注意感歎號是用來展開和訪問可選變量`john`和`number73`中的實例，這樣實例的屬性才能被賦值：

```swift
john!.apartment = number73
number73!.tenant = john
```

在將兩個實例聯繫在一起之後，強引用的關係如圖所示：

![](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/referenceCycle02_2x.png)

不幸的是，將這兩個實例關聯在一起之後，一個循環強引用被創建了。`Person`實例現在有了一個指向`Apartment`實例的強引用，而`Apartment`實例也有了一個指向`Person`實例的強引用。因此，當你斷開`john`和`number73`變量所持有的強引用時，引用計數並不會降為 0，實例也不會被 ARC 銷毀：

```swift
john = nil
number73 = nil
```

注意，當你把這兩個變量設為`nil`時，沒有任何一個析構函數被調用。強引用循環阻止了`Person`和`Apartment`類實例的銷毀，並在你的應用程序中造成了內存洩漏。

在你將`john`和`number73`賦值為`nil`後，強引用關係如下圖：

![](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/referenceCycle03_2x.png)

`Person`和`Apartment`實例之間的強引用關係保留了下來並且不會被斷開。

<a name="resolving_strong_reference_cycles_between_class_instances"></a>
## 解決實例之間的循環強引用

Swift 提供了兩種辦法用來解決你在使用類的屬性時所遇到的循環強引用問題：弱引用（weak reference）和無主引用（unowned reference）。

弱引用和無主引用允許循環引用中的一個實例引用另外一個實例而不保持強引用。這樣實例能夠互相引用而不產生循環強引用。

對於生命週期中會變為`nil`的實例使用弱引用。相反的，對於初始化賦值後再也不會被賦值為`nil`的實例，使用無主引用。

### 弱引用

弱引用不會牢牢保持住引用的實例，並且不會阻止 ARC 銷毀被引用的實例。這種行為阻止了引用變為循環強引用。聲明屬性或者變量時，在前面加上`weak`關鍵字表明這是一個弱引用。

在實例的生命週期中，如果某些時候引用沒有值，那麼弱引用可以阻止循環強引用。如果引用總是有值，則可以使用無主引用，在[無主引用](#2)中有描述。在上面`Apartment`的例子中，一個公寓的生命週期中，有時是沒有「居民」的，因此適合使用弱引用來解決循環強引用。

> 注意:  
> 弱引用必須被聲明為變量，表明其值能在運行時被修改。弱引用不能被聲明為常量。  

因為弱引用可以沒有值，你必須將每一個弱引用聲明為可選類型。可選類型是在 Swift 語言中推薦的用來表示可能沒有值的類型。

因為弱引用不會保持所引用的實例，即使引用存在，實例也有可能被銷毀。因此，ARC 會在引用的實例被銷毀後自動將其賦值為`nil`。你可以像其他可選值一樣，檢查弱引用的值是否存在，你永遠也不會遇到被銷毀了而不存在的實例。

下面的例子跟上面`Person`和`Apartment`的例子一致，但是有一個重要的區別。這一次，`Apartment`的`tenant`屬性被聲明為弱引用：

```swift
class Person {
    let name: String
    init(name: String) { self.name = name }
    var apartment: Apartment?
    deinit { println("\(name) is being deinitialized") }
}
```

```swift
class Apartment {
    let number: Int
    init(number: Int) { self.number = number }
    weak var tenant: Person?
    deinit { println("Apartment #\(number) is being deinitialized") }
}
```

然後跟之前一樣，建立兩個變量（john和number73）之間的強引用，並關聯兩個實例：

```swift
var john: Person?
var number73: Apartment?

john = Person(name: "John Appleseed")
number73 = Apartment(number: 73)

john!.apartment = number73
number73!.tenant = john
```

現在，兩個關聯在一起的實例的引用關係如下圖所示：

![](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/weakReference01_2x.png)

`Person`實例依然保持對`Apartment`實例的強引用，但是`Apartment`實例只是對`Person`實例的弱引用。這意味著當你斷開`john`變量所保持的強引用時，再也沒有指向`Person`實例的強引用了：

![](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/weakReference02_2x.png)

由於再也沒有指向`Person`實例的強引用，該實例會被銷毀：

```swift
john = nil
// prints "John Appleseed is being deinitialized"
```

唯一剩下的指向`Apartment`實例的強引用來自於變量`number73`。如果你斷開這個強引用，再也沒有指向`Apartment`實例的強引用了：

![](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/weakReference03_2x.png)

由於再也沒有指向`Apartment`實例的強引用，該實例也會被銷毀：

```swift
number73 = nil
// prints "Apartment #73 is being deinitialized"
```

上面的兩段代碼展示了變量`john`和`number73`在被賦值為`nil`後，`Person`實例和`Apartment`實例的析構函數都打印出「銷毀」的信息。這證明了引用循環被打破了。

<a name="2"></a>
### 無主引用

和弱引用類似，無主引用不會牢牢保持住引用的實例。和弱引用不同的是，無主引用是永遠有值的。因此，無主引用總是被定義為非可選類型（non-optional type）。你可以在聲明屬性或者變量時，在前面加上關鍵字`unowned`表示這是一個無主引用。

由於無主引用是非可選類型，你不需要在使用它的時候將它展開。無主引用總是可以被直接訪問。不過 ARC 無法在實例被銷毀後將無主引用設為`nil`，因為非可選類型的變量不允許被賦值為`nil`。

> 注意:  
>如果你試圖在實例被銷毀後，訪問該實例的無主引用，會觸發運行時錯誤。使用無主引用，你必須確保引用始終指向一個未銷毀的實例。  
> 還需要注意的是如果你試圖訪問實例已經被銷毀的無主引用，程序會直接崩潰，而不會發生無法預期的行為。所以你應當避免這樣的事情發生。  

下面的例子定義了兩個類，`Customer`和`CreditCard`，模擬了銀行客戶和客戶的信用卡。這兩個類中，每一個都將另外一個類的實例作為自身的屬性。這種關係會潛在的創造循環強引用。

`Customer`和`CreditCard`之間的關係與前面弱引用例子中`Apartment`和`Person`的關係截然不同。在這個數據模型中，一個客戶可能有或者沒有信用卡，但是一張信用卡總是關聯著一個客戶。為了表示這種關係，`Customer`類有一個可選類型的`card`屬性，但是`CreditCard`類有一個非可選類型的`customer`屬性。

此外，只能通過將一個`number`值和`customer`實例傳遞給`CreditCard`構造函數的方式來創建`CreditCard`實例。這樣可以確保當創建`CreditCard`實例時總是有一個`customer`實例與之關聯。

由於信用卡總是關聯著一個客戶，因此將`customer`屬性定義為無主引用，用以避免循環強引用：

```swift
class Customer {
    let name: String
    var card: CreditCard?
    init(name: String) {
        self.name = name
    }
    deinit { println("\(name) is being deinitialized") }
}
```

```swift
class CreditCard {
    let number: Int
    unowned let customer: Customer
    init(number: Int, customer: Customer) {
        self.number = number
        self.customer = customer
    }
    deinit { println("Card #\(number) is being deinitialized") }
}
```

下面的代碼片段定義了一個叫`john`的可選類型`Customer`變量，用來保存某個特定客戶的引用。由於是可選類型，所以變量被初始化為`nil`。

```swift
var john: Customer?
```

現在你可以創建`Customer`類的實例，用它初始化`CreditCard`實例，並將新創建的`CreditCard`實例賦值為客戶的`card`屬性。

```swift
john = Customer(name: "John Appleseed")
john!.card = CreditCard(number: 1234_5678_9012_3456, customer: john!)
```

在你關聯兩個實例後，它們的引用關係如下圖所示：

![](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/unownedReference01_2x.png)

`Customer`實例持有對`CreditCard`實例的強引用，而`CreditCard`實例持有對`Customer`實例的無主引用。

由於`customer`的無主引用，當你斷開`john`變量持有的強引用時，再也沒有指向`Customer`實例的強引用了：

![](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/unownedReference02_2x.png)

由於再也沒有指向`Customer`實例的強引用，該實例被銷毀了。其後，再也沒有指向`CreditCard`實例的強引用，該實例也隨之被銷毀了：

```swift
john = nil
// prints "John Appleseed is being deinitialized"
// prints "Card #1234567890123456 is being deinitialized"
```

最後的代碼展示了在`john`變量被設為`nil`後`Customer`實例和`CreditCard`實例的構造函數都打印出了「銷毀」的信息。

###無主引用以及隱式解析可選屬性

上面弱引用和無主引用的例子涵蓋了兩種常用的需要打破循環強引用的場景。

`Person`和`Apartment`的例子展示了兩個屬性的值都允許為`nil`，並會潛在的產生循環強引用。這種場景最適合用弱引用來解決。

`Customer`和`CreditCard`的例子展示了一個屬性的值允許為`nil`，而另一個屬性的值不允許為`nil`，並會潛在的產生循環強引用。這種場景最適合通過無主引用來解決。

然而，存在著第三種場景，在這種場景中，兩個屬性都必須有值，並且初始化完成後不能為`nil`。在這種場景中，需要一個類使用無主屬性，而另外一個類使用隱式解析可選屬性。

這使兩個屬性在初始化完成後能被直接訪問（不需要可選展開），同時避免了循環引用。這一節將為你展示如何建立這種關係。

下面的例子定義了兩個類，`Country`和`City`，每個類將另外一個類的實例保存為屬性。在這個模型中，每個國家必須有首都，而每一個城市必須屬於一個國家。為了實現這種關係，`Country`類擁有一個`capitalCity`屬性，而`City`類有一個`country`屬性：

```swift
class Country {
    let name: String
    let capitalCity: City!
    init(name: String, capitalName: String) {
        self.name = name
        self.capitalCity = City(name: capitalName, country: self)
    }
}
```

```swift
class City {
    let name: String
    unowned let country: Country
    init(name: String, country: Country) {
        self.name = name
        self.country = country
    }
}
```

為了建立兩個類的依賴關係，`City`的構造函數有一個`Country`實例的參數，並且將實例保存為`country`屬性。

`Country`的構造函數調用了`City`的構造函數。然而，只有`Country`的實例完全初始化完後，`Country`的構造函數才能把`self`傳給`City`的構造函數。（[在兩段式構造過程中有具體描述](14_Initialization.html)）

為了滿足這種需求，通過在類型結尾處加上感歎號（City!）的方式，將`Country`的`capitalCity`屬性聲明為隱式解析可選類型的屬性。這表示像其他可選類型一樣，`capitalCity`屬性的默認值為`nil`，但是不需要展開它的值就能訪問它。（[在隱式解析可選類型中有描述](01_The_Basics.html)）

由於`capitalCity`默認值為`nil`，一旦`Country`的實例在構造函數中給`name`屬性賦值後，整個初始化過程就完成了。這代表一旦`name`屬性被賦值後，`Country`的構造函數就能引用並傳遞隱式的`self`。`Country`的構造函數在賦值`capitalCity`時，就能將`self`作為參數傳遞給`City`的構造函數。

以上的意義在於你可以通過一條語句同時創建`Country`和`City`的實例，而不產生循環強引用，並且`capitalCity`的屬性能被直接訪問，而不需要通過感歎號來展開它的可選值：

```swift
var country = Country(name: "Canada", capitalName: "Ottawa")
println("\(country.name)'s capital city is called \(country.capitalCity.name)")
// prints "Canada's capital city is called Ottawa"
```

在上面的例子中，使用隱式解析可選值的意義在於滿足了兩個類構造函數的需求。`capitalCity`屬性在初始化完成後，能像非可選值一樣使用和存取同時還避免了循環強引用。

<a name="strong_reference_cycles_for_closures"></a>
##閉包引起的循環強引用

前面我們看到了循環強引用環是在兩個類實例屬性互相保持對方的強引用時產生的，還知道了如何用弱引用和無主引用來打破循環強引用。

循環強引用還會發生在當你將一個閉包賦值給類實例的某個屬性，並且這個閉包體中又使用了實例。這個閉包體中可能訪問了實例的某個屬性，例如`self.someProperty`，或者閉包中調用了實例的某個方法，例如`self.someMethod`。這兩種情況都導致了閉包 「捕獲" `self`，從而產生了循環強引用。

循環強引用的產生，是因為閉包和類相似，都是引用類型。當你把一個閉包賦值給某個屬性時，你也把一個引用賦值給了這個閉包。實質上，這跟之前的問題是一樣的－兩個強引用讓彼此一直有效。但是，和兩個類實例不同，這次一個是類實例，另一個是閉包。

Swift 提供了一種優雅的方法來解決這個問題，稱之為閉包佔用列表（closuer capture list）。同樣的，在學習如何用閉包佔用列表破壞循環強引用之前，先來瞭解一下循環強引用是如何產生的，這對我們是很有幫助的。

下面的例子為你展示了當一個閉包引用了`self`後是如何產生一個循環強引用的。例子中定義了一個叫`HTMLElement`的類，用一種簡單的模型表示 HTML 中的一個單獨的元素：

```swift
class HTMLElement {

    let name: String
    let text: String?

    @lazy var asHTML: () -> String = {
        if let text = self.text {
            return "<\(self.name)>\(text)</\(self.name)>"
        } else {
            return "<\(self.name) />"
        }
    }

    init(name: String, text: String? = nil) {
        self.name = name
        self.text = text
    }

    deinit {
        println("\(name) is being deinitialized")
    }

}
```

`HTMLElement`類定義了一個`name`屬性來表示這個元素的名稱，例如代表段落的"p"，或者代表換行的"br"。`HTMLElement`還定義了一個可選屬性`text`，用來設置和展現 HTML 元素的文本。

除了上面的兩個屬性，`HTMLElement`還定義了一個`lazy`屬性`asHTML`。這個屬性引用了一個閉包，將`name`和`text`組合成 HTML 字符串片段。該屬性是`() -> String`類型，或者可以理解為「一個沒有參數，返回`String`的函數」。

默認情況下，閉包賦值給了`asHTML`屬性，這個閉包返回一個代表 HTML 標籤的字符串。如果`text`值存在，該標籤就包含可選值`text`；如果`text`不存在，該標籤就不包含文本。對於段落元素，根據`text`是"some text"還是`nil`，閉包會返回"`<p>some text</p>`"或者"`<p />`"。

可以像實例方法那樣去命名、使用`asHTML`屬性。然而，由於`asHTML`是閉包而不是實例方法，如果你想改變特定元素的 HTML 處理的話，可以用自定義的閉包來取代默認值。

> 注意:  
`asHTML`聲明為`lazy`屬性，因為只有當元素確實需要處理為HTML輸出的字符串時，才需要使用`asHTML`。也就是說，在默認的閉包中可以使用`self`，因為只有當初始化完成以及`self`確實存在後，才能訪問`lazy`屬性。

`HTMLElement`類只提供一個構造函數，通過`name`和`text`（如果有的話）參數來初始化一個元素。該類也定義了一個析構函數，當`HTMLElement`實例被銷毀時，打印一條消息。

下面的代碼展示了如何用`HTMLElement`類創建實例並打印消息。

```swift
var paragraph: HTMLElement? = HTMLElement(name: "p", text: "hello, world")
println(paragraph!.asHTML())
// prints"hello, world"
```

>注意:  
上面的`paragraph`變量定義為`可選HTMLElement`，因此我們可以賦值`nil`給它來演示循環強引用。

不幸的是，上面寫的`HTMLElement`類產生了類實例和`asHTML`默認值的閉包之間的循環強引用。循環強引用如下圖所示：

![](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/closureReferenceCycle01_2x.png)

實例的`asHTML`屬性持有閉包的強引用。但是，閉包在其閉包體內使用了`self`（引用了`self.name`和`self.text`），因此閉包捕獲了`self`，這意味著閉包又反過來持有了`HTMLElement`實例的強引用。這樣兩個對象就產生了循環強引用。（更多關於閉包捕獲值的信息，請參考[值捕獲](07_Closures.html)）。

>注意:  
雖然閉包多次使用了`self`，它只捕獲`HTMLElement`實例的一個強引用。

如果設置`paragraph`變量為`nil`，打破它持有的`HTMLElement`實例的強引用，`HTMLElement`實例和它的閉包都不會被銷毀，也是因為循環強引用：

```swift
paragraph = nil
```

注意`HTMLElementdeinitializer`中的消息並沒有別打印，證明了`HTMLElement`實例並沒有被銷毀。

<a name="resolving_strong_reference_cycles_for_closures"></a>
##解決閉包引起的循環強引用

在定義閉包時同時定義捕獲列表作為閉包的一部分，通過這種方式可以解決閉包和類實例之間的循環強引用。捕獲列表定義了閉包體內捕獲一個或者多個引用類型的規則。跟解決兩個類實例間的循環強引用一樣，聲明每個捕獲的引用為弱引用或無主引用，而不是強引用。應當根據代碼關係來決定使用弱引用還是無主引用。

>注意:  
Swift 有如下要求：只要在閉包內使用`self`的成員，就要用`self.someProperty`或者`self.someMethod`（而不只是`someProperty`或`someMethod`）。這提醒你可能會不小心就捕獲了`self`。

###定義捕獲列表

捕獲列表中的每個元素都是由`weak`或者`unowned`關鍵字和實例的引用（如`self`或`someInstance`）成對組成。每一對都在方括號中，通過逗號分開。

捕獲列表放置在閉包參數列表和返回類型之前：

```swift
@lazy var someClosure: (Int, String) -> String = {
    [unowned self] (index: Int, stringToProcess: String) -> String in
    // closure body goes here
}
```

如果閉包沒有指定參數列表或者返回類型，則可以通過上下文推斷，那麼可以捕獲列表放在閉包開始的地方，跟著是關鍵字`in`：

```swift
@lazy var someClosure: () -> String = {
    [unowned self] in
    // closure body goes here
}
```

###弱引用和無主引用

當閉包和捕獲的實例總是互相引用時並且總是同時銷毀時，將閉包內的捕獲定義為無主引用。

相反的，當捕獲引用有時可能會是`nil`時，將閉包內的捕獲定義為弱引用。弱引用總是可選類型，並且當引用的實例被銷毀後，弱引用的值會自動置為`nil`。這使我們可以在閉包內檢查它們是否存在。

>注意:  
如果捕獲的引用絕對不會置為`nil`，應該用無主引用，而不是弱引用。

前面的`HTMLElement`例子中，無主引用是正確的解決循環強引用的方法。這樣編寫`HTMLElement`類來避免循環強引用：

```swift
class HTMLElement {

    let name: String
    let text: String?

    @lazy var asHTML: () -> String = {
        [unowned self] in
        if let text = self.text {
            return "<\(self.name)>\(text)</\(self.name)>"
        } else {
            return "<\(self.name) />"
        }
    }

    init(name: String, text: String? = nil) {
        self.name = name
        self.text = text
    }

    deinit {
        println("\(name) is being deinitialized")
    }

}
```

上面的`HTMLElement`實現和之前的實現一致，只是在`asHTML`閉包中多了一個捕獲列表。這裡，捕獲列表是`[unowned self]`，表示「用無主引用而不是強引用來捕獲`self`」。

和之前一樣，我們可以創建並打印`HTMLElement`實例：

```swift
var paragraph: HTMLElement? = HTMLElement(name: "p", text: "hello, world")
println(paragraph!.asHTML())
// prints "<p>hello, world</p>"
```

使用捕獲列表後引用關係如下圖所示：

![](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/closureReferenceCycle02_2x.png)

這一次，閉包以無主引用的形式捕獲`self`，並不會持有`HTMLElement`實例的強引用。如果將`paragraph`賦值為`nil`，`HTMLElement`實例將會被銷毀，並能看到它的析構函數打印出的消息。

```swift
paragraph = nil
// prints "p is being deinitialized"
```

