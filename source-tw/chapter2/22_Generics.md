
> 翻譯：[takalard](https://github.com/takalard)  
> 校對：[lifedim](https://github.com/lifedim)

# 泛型

------

本頁包含內容：

- [泛型所解決的問題](#the_problem_that_generics_solve)
- [泛型函數](#generic_functions)
- [類型參數](#type_parameters)
- [命名類型參數](#naming_type_parameters)
- [泛型類型](#generic_types)
- [類型約束](#type_constraints)
- [關聯類型](#associated_types)
- [`Where`語句](#where_clauses)

*泛型代碼*可以讓你寫出根據自我需求定義、適用於任何類型的，靈活且可重用的函數和類型。它的可以讓你避免重複的代碼，用一種清晰和抽像的方式來表達代碼的意圖。

泛型是 Swift 強大特徵中的其中一個，許多 Swift 標準庫是通過泛型代碼構建出來的。事實上，泛型的使用貫穿了整本語言手冊，只是你沒有發現而已。例如，Swift 的數組和字典類型都是泛型集。你可以創建一個`Int`數組，也可創建一個`String`數組，或者甚至於可以是任何其他 Swift 的類型數據數組。同樣的，你也可以創建存儲任何指定類型的字典（dictionary），而且這些類型可以是沒有限制的。

<a name="the_problem_that_generics_solve"></a>
## 泛型所解決的問題

這裡是一個標準的，非泛型函數`swapTwoInts`,用來交換兩個Int值：

```swift
func swapTwoInts(inout a: Int, inout b: Int)
  let temporaryA = a
  a = b
  b = temporaryA
}
```

這個函數使用寫入讀出（in-out）參數來交換`a`和`b`的值，請參考[寫入讀出參數](../chapter2/06_Functions.html)。

`swapTwoInts`函數可以交換`b`的原始值到`a`，也可以交換a的原始值到`b`，你可以調用這個函數交換兩個`Int`變量值：

```swift
var someInt = 3
var anotherInt = 107
swapTwoInts(&someInt, &anotherInt)
println("someInt is now \(someInt), and anotherInt is now \(anotherInt)")
// 輸出 "someInt is now 107, and anotherInt is now 3"
```


`swapTwoInts`函數是非常有用的，但是它只能交換`Int`值，如果你想要交換兩個`String`或者`Double`，就不得不寫更多的函數，如 `swapTwoStrings`和`swapTwoDoublesfunctions `，如同如下所示：

```swift
func swapTwoStrings(inout a: String, inout b: String) {
    let temporaryA = a
    a = b
    b = temporaryA
}

func swapTwoDoubles(inout a: Double, inout b: Double) {
    let temporaryA = a
    a = b
    b = temporaryA
}
```

你可能注意到 `swapTwoInts`、 `swapTwoStrings`和`swapTwoDoubles`函數功能都是相同的，唯一不同之處就在於傳入的變量類型不同，分別是`Int`、`String`和`Double`。

但實際應用中通常需要一個用處更強大並且盡可能的考慮到更多的靈活性單個函數，可以用來交換兩個任何類型值，很幸運的是，泛型代碼幫你解決了這種問題。（一個這種泛型函數後面已經定義好了。）

>注意：  
在所有三個函數中，`a`和`b`的類型是一樣的。如果`a`和`b`不是相同的類型，那它們倆就不能互換值。Swift 是類型安全的語言，所以它不允許一個`String`類型的變量和一個`Double`類型的變量互相交換值。如果一定要做，Swift 將報編譯錯誤。

<a name="generic_functions"></a>
## 泛型函數

`泛型函數`可以工作於任何類型，這裡是一個上面`swapTwoInts`函數的泛型版本，用於交換兩個值：

```swift
func swapTwoValues<T>(inout a: T, inout b: T) {
    let temporaryA = a
    a = b
    b = temporaryA
}
```

`swapTwoValues`函數主體和`swapTwoInts`函數是一樣的，它只在第一行稍微有那麼一點點不同於`swapTwoInts`，如下所示：

```swift
func swapTwoInts(inout a: Int, inout b: Int)
func swapTwoValues<T>(inout a: T, inout b: T)
```


這個函數的泛型版本使用了佔位類型名字（通常此情況下用字母`T`來表示）來代替實際類型名（如`In`、`String`或`Doubl`）。佔位類型名沒有提示`T`必須是什麼類型，但是它提示了`a`和`b`必須是同一類型`T`，而不管`T`表示什麼類型。只有`swapTwoValues`函數在每次調用時所傳入的實際類型才能決定`T`所代表的類型。

另外一個不同之處在於這個泛型函數名後面跟著的展位類型名字（T）是用尖括號括起來的（`<T>`）。這個尖括號告訴 Swift 那個`T`是`swapTwoValues`函數所定義的一個類型。因為`T`是一個佔位命名類型，Swift 不會去查找命名為T的實際類型。

`swapTwoValues`函數除了要求傳入的兩個任何類型值是同一類型外，也可以作為`swapTwoInts`函數被調用。每次`swapTwoValues`被調用，T所代表的類型值都會傳給函數。

在下面的兩個例子中,`T`分別代表`Int`和`String`：

```swift
var someInt = 3
var anotherInt = 107
swapTwoValues(&someInt, &anotherInt)
// someInt is now 107, and anotherInt is now 3
```

```swift
var someString = "hello"
var anotherString = "world"
swapTwoValues(&someString, &anotherString)
// someString is now "world", and anotherString is now "hello"
```


>注意  
上面定義的函數`swapTwoValues`是受`swap`函數啟發而實現的。`swap`函數存在於 Swift 標準庫，並可以在其它類中任意使用。如果你在自己代碼中需要類似`swapTwoValues`函數的功能，你可以使用已存在的交換函數`swap`函數。

<a name="type_parameters"></a>
## 類型參數

在上面的`swapTwoValues`例子中，佔位類型`T`是一種類型參數的示例。類型參數指定並命名為一個佔位類型，並且緊隨在函數名後面，使用一對尖括號括起來（如`<T>`）。

一旦一個類型參數被指定，那麼其可以被使用來定義一個函數的參數類型（如`swapTwoValues`函數中的參數`a`和`b`），或作為一個函數返回類型，或用作函數主體中的註釋類型。在這種情況下，被類型參數所代表的佔位類型不管函數任何時候被調用，都會被實際類型所替換（在上面`swapTwoValues`例子中，當函數第一次被調用時，`T`被`Int`替換，第二次調用時，被`String`替換。）。

你可支持多個類型參數，命名在尖括號中，用逗號分開。

<a name="naming_type_parameters"></a>
## 命名類型參數

在簡單的情況下，泛型函數或泛型類型需要指定一個佔位類型（如上面的`swapTwoValues`泛型函數，或一個存儲單一類型的泛型集，如數組），通常用一單個字母`T`來命名類型參數。不過，你可以使用任何有效的標識符來作為類型參數名。

如果你使用多個參數定義更複雜的泛型函數或泛型類型，那麼使用更多的描述類型參數是非常有用的。例如，Swift 字典（Dictionary）類型有兩個類型參數，一個是鍵，另外一個是值。如果你自己寫字典，你或許會定義這兩個類型參數為`KeyType`和`ValueType`，用來記住它們在你的泛型代碼中的作用。

>注意  
請始終使用大寫字母開頭的駝峰式命名法（例如`T`和`KeyType`）來給類型參數命名，以表明它們是類型的佔位符，而非類型值。

<a name="generic_types"></a>
## 泛型類型


通常在泛型函數中，Swift 允許你定義你自己的泛型類型。這些自定義類、結構體和枚舉作用於任何類型，如同`Array`和`Dictionary`的用法。

這部分向你展示如何寫一個泛型集類型--`Stack`（棧）。一個棧是一系列值域的集合，和`Array`（數組）類似，但其是一個比 Swift 的`Array`類型更多限制的集合。一個數組可以允許其裡面任何位置的插入/刪除操作，而棧，只允許在集合的末端添加新的項（如同*push*一個新值進棧）。同樣的一個棧也只能從末端移除項（如同*pop*一個值出棧）。

>注意  
棧的概念已被`UINavigationController`類使用來模擬試圖控制器的導航結構。你通過調用`UINavigationController`的`pushViewController:animated:`方法來為導航棧添加（add）新的試圖控制器；而通過`popViewControllerAnimated:`的方法來從導航棧中移除（pop）某個試圖控制器。每當你需要一個嚴格的`後進先出`方式來管理集合，堆棧都是最實用的模型。

下圖展示了一個棧的壓棧(push)/出棧(pop)的行為：  

![此處輸入圖片的描述](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/stackPushPop_2x.png)

1. 現在有三個值在棧中；
2. 第四個值「pushed」到棧的頂部；
3. 現在有四個值在棧中，最近的那個在頂部；
4. 棧中最頂部的那個項被移除，或稱之為「popped」；
5. 移除掉一個值後，現在棧又重新只有三個值。

這裡展示了如何寫一個非泛型版本的棧，`Int`值型的棧：

```swift
struct IntStack {
    var items = Int[]()
    mutating func push(item: Int) {
        items.append(item)
    }
    mutating func pop() -> Int {
        return items.removeLast()
    }
}
```

這個結構體在棧中使用一個`Array`性質的`items`存儲值。`Stack`提供兩個方法：`push`和`pop`，從棧中壓進一個值和移除一個值。這些方法標記為可變的，因為它們需要修改（或*轉換*）結構體的`items`數組。

上面所展現的`IntStack`類型只能用於`Int`值，不過，其對於定義一個泛型`Stack`類（可以處理*任何*類型值的棧）是非常有用的。

這裡是一個相同代碼的泛型版本：


```swift
struct Stack<T> {
    var items = T[]()
    mutating func push(item: T) {
        items.append(item)
    }
    mutating func pop() -> T {
        return items.removeLast()
    }
}
```


注意到`Stack`的泛型版本基本上和非泛型版本相同，但是泛型版本的佔位類型參數為T代替了實際`Int`類型。這種類型參數包含在一對尖括號裡（`<T>`），緊隨在結構體名字後面。

`T`定義了一個名為「某種類型T」的節點提供給後來用。這種將來類型可以在結構體的定義裡任何地方表示為「T」。在這種情況下，`T`在如下三個地方被用作節點：

- 創建一個名為`items`的屬性，使用空的T類型值數組對其進行初始化；
- 指定一個包含一個參數名為`item`的`push`方法，該參數必須是T類型；
- 指定一個`pop`方法的返回值，該返回值將是一個T類型值。

當創建一個新單例並初始化時， 通過用一對緊隨在類型名後的尖括號裡寫出實際指定棧用到類型，創建一個`Stack`實例，同創建`Array`和`Dictionary`一樣：

```swift
var stackOfStrings = Stack<String>()
stackOfStrings.push("uno")
stackOfStrings.push("dos")
stackOfStrings.push("tres")
stackOfStrings.push("cuatro")
// 現在棧已經有4個string了
```

下圖將展示`stackOfStrings`如何`push`這四個值進棧的過程：

![此處輸入圖片的描述](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/stackPushedFourStrings_2x.png)

從棧中`pop`並移除值"cuatro"：

```swift
let fromTheTop = stackOfStrings.pop()
// fromTheTop is equal to "cuatro", and the stack now contains 3 strings
```

下圖展示了如何從棧中pop一個值的過程：  
![此處輸入圖片的描述](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/stackPoppedOneString_2x.png)

由於`Stack`是泛型類型，所以在 Swift 中其可以用來創建任何有效類型的棧，這種方式如同`Array`和`Dictionary`。

<a name="type_constraints"></a>
##類型約束

`swapTwoValues`函數和`Stack`類型可以作用於任何類型，不過，有的時候對使用在泛型函數和泛型類型上的類型強制約束為某種特定類型是非常有用的。類型約束指定了一個必須繼承自指定類的類型參數，或者遵循一個特定的協議或協議構成。

例如，Swift 的`Dictionary`類型對作用於其鍵的類型做了些限制。在[字典](../chapter2/04_Collection_Types.html)的描述中，字典的鍵類型必須是*可哈希*，也就是說，必須有一種方法可以使其被唯一的表示。`Dictionary`之所以需要其鍵是可哈希是為了以便於其檢查其是否已經包含某個特定鍵的值。如無此需求，`Dictionary`既不會告訴是否插入或者替換了某個特定鍵的值，也不能查找到已經存儲在字典裡面的給定鍵值。

這個需求強制加上一個類型約束作用於`Dictionary`的鍵上，當然其鍵類型必須遵循`Hashable`協議（Swift 標準庫中定義的一個特定協議）。所有的 Swift 基本類型（如`String`，`Int`， `Double`和 `Bool`）默認都是可哈希。

當你創建自定義泛型類型時，你可以定義你自己的類型約束，當然，這些約束要支持泛型編程的強力特徵中的多數。抽像概念如`可哈希`具有的類型特徵是根據它們概念特徵來界定的，而不是它們的直接類型特徵。

### 類型約束語法

你可以寫一個在一個類型參數名後面的類型約束，通過冒號分割，來作為類型參數鏈的一部分。這種作用於泛型函數的類型約束的基礎語法如下所示（和泛型類型的語法相同）：

```swift
func someFunction<T: SomeClass, U: SomeProtocol>(someT: T, someU: U) {
    // function body goes here
}
```

上面這個假定函數有兩個類型參數。第一個類型參數`T`，有一個需要`T`必須是`SomeClass`子類的類型約束；第二個類型參數`U`，有一個需要`U`必須遵循`SomeProtocol`協議的類型約束。

### 類型約束行為

這裡有個名為`findStringIndex`的非泛型函數，該函數功能是去查找包含一給定`String`值的數組。若查找到匹配的字符串，`findStringIndex`函數返回該字符串在數組中的索引值（`Int`），反之則返回`nil`：

```swift
func findStringIndex(array: String[], valueToFind: String) -> Int? {
    for (index, value) in enumerate(array) {
        if value == valueToFind {
            return index
        }
    }
    return nil
}
```


`findStringIndex`函數可以作用於查找一字符串數組中的某個字符串:

```swift
let strings = ["cat", "dog", "llama", "parakeet", "terrapin"]
if let foundIndex = findStringIndex(strings, "llama") {
    println("The index of llama is \(foundIndex)")
}
// 輸出 "The index of llama is 2"
```

如果只是針對字符串而言查找在數組中的某個值的索引，用處不是很大，不過，你可以寫出相同功能的泛型函數`findIndex`，用某個類型`T`值替換掉提到的字符串。

這裡展示如何寫一個你或許期望的`findStringIndex`的泛型版本`findIndex`。請注意這個函數仍然返回`Int`，是不是有點迷惑呢，而不是泛型類型?那是因為函數返回的是一個可選的索引數，而不是從數組中得到的一個可選值。需要提醒的是，這個函數不會編譯，原因在例子後面會說明：

```swift
func findIndex<T>(array: T[], valueToFind: T) -> Int? {
    for (index, value) in enumerate(array) {
        if value == valueToFind {
            return index
        }
    }
    return nil
}
```

上面所寫的函數不會編譯。這個問題的位置在等式的檢查上，`「if value == valueToFind」`。不是所有的 Swift 中的類型都可以用等式符（==）進行比較。例如，如果你創建一個你自己的類或結構體來表示一個複雜的數據模型，那麼 Swift 沒法猜到對於這個類或結構體而言「等於」的意思。正因如此，這部分代碼不能可能保證工作於每個可能的類型`T`，當你試圖編譯這部分代碼時估計會出現相應的錯誤。

不過，所有的這些並不會讓我們無從下手。Swift 標準庫中定義了一個`Equatable`協議，該協議要求任何遵循的類型實現等式符（==）和不等符（!=）對任何兩個該類型進行比較。所有的 Swift 標準類型自動支持`Equatable`協議。

任何`Equatable`類型都可以安全的使用在`findIndex`函數中，因為其保證支持等式操作。為了說明這個事實，當你定義一個函數時，你可以寫一個`Equatable`類型約束作為類型參數定義的一部分：

```swift
func findIndex<T: Equatable>(array: T[], valueToFind: T) -> Int? {
    for (index, value) in enumerate(array) {
        if value == valueToFind {
            return index
        }
    }
    return nil
}
```


`findIndex`中這個單個類型參數寫做：`T: Equatable`，也就意味著「任何T類型都遵循`Equatable`協議」。

`findIndex`函數現在則可以成功的編譯過，並且作用於任何遵循`Equatable`的類型，如`Double`或`String`:

```swift
let doubleIndex = findIndex([3.14159, 0.1, 0.25], 9.3)
// doubleIndex is an optional Int with no value, because 9.3 is not in the array
let stringIndex = findIndex(["Mike", "Malcolm", "Andrea"], "Andrea")
// stringIndex is an optional Int containing a value of 2
```

<a name="associated_types"></a>
##關聯類型(Associated Types)

當定義一個協議時，有的時候聲明一個或多個關聯類型作為協議定義的一部分是非常有用的。一個關聯類型作為協議的一部分，給定了類型的一個佔位名（或別名）。作用於關聯類型上實際類型在協議被實現前是不需要指定的。關聯類型被指定為`typealias`關鍵字。

### 關聯類型行為

這裡是一個`Container`協議的例子，定義了一個ItemType關聯類型：

```swift
protocol Container {
    typealias ItemType
    mutating func append(item: ItemType)
    var count: Int { get }
    subscript(i: Int) -> ItemType { get }
}
```

`Container`協議定義了三個任何容器必須支持的兼容要求：

- 必須可能通過`append`方法添加一個新item到容器裡；
- 必須可能通過使用`count`屬性獲取容器裡items的數量，並返回一個`Int`值；
- 必須可能通過容器的`Int`索引值下標可以檢索到每一個item。

這個協議沒有指定容器裡item是如何存儲的或何種類型是允許的。這個協議只指定三個任何遵循`Container`類型所必須支持的功能點。一個遵循的類型在滿足這三個條件的情況下也可以提供其他額外的功能。

任何遵循`Container`協議的類型必須指定存儲在其裡面的值類型，必須保證只有正確類型的items可以加進容器裡，必須明確可以通過其下標返回item類型。

為了定義這三個條件，`Container`協議需要一個方法指定容器裡的元素將會保留，而不需要知道特定容器的類型。`Container`協議需要指定任何通過`append`方法添加到容器裡的值和容器裡元素是相同類型，並且通過容器下標返回的容器元素類型的值的類型是相同類型。

為了達到此目的，`Container`協議聲明了一個ItemType的關聯類型，寫作`typealias ItemType`。這個協議不會定義`ItemType`是什麼的別名，這個信息將由任何遵循協議的類型來提供。儘管如此，`ItemType`別名提供了一種識別Container中Items類型的方法，並且用於`append`方法和`subscript`方法的類型定義，以便保證任何`Container`期望的行為能夠被執行。

這裡是一個早前IntStack類型的非泛型版本，遵循Container協議：

```swift
struct IntStack: Container {
    // IntStack的原始實現
    var items = Int[]()
    mutating func push(item: Int) {
        items.append(item)
    }
    mutating func pop() -> Int {
        return items.removeLast()
    }
    // 遵循Container協議的實現
    typealias ItemType = Int
    mutating func append(item: Int) {
        self.push(item)
    }
    var count: Int {
    return items.count
    }
    subscript(i: Int) -> Int {
        return items[i]
    }
}
```


`IntStack`類型實現了`Container`協議的所有三個要求，在`IntStack`類型的每個包含部分的功能都滿足這些要求。

此外，`IntStack`指定了`Container`的實現，適用的ItemType被用作`Int`類型。對於這個`Container`協議實現而言，定義 `typealias ItemType = Int`，將抽像的`ItemType`類型轉換為具體的`Int`類型。

感謝Swift類型參考，你不用在`IntStack`定義部分聲明一個具體的`Int`的`ItemType`。由於`IntStack`遵循`Container`協議的所有要求，只要通過簡單的查找`append`方法的item參數類型和下標返回的類型，Swift就可以推斷出合適的`ItemType`來使用。確實，如果上面的代碼中你刪除了 `typealias ItemType = Int`這一行，一切仍舊可以工作，因為它清楚的知道ItemType使用的是何種類型。

你也可以生成遵循`Container`協議的泛型`Stack`類型：

```swift
struct Stack<T>: Container {
    // original Stack<T> implementation
    var items = T[]()
    mutating func push(item: T) {
        items.append(item)
    }
    mutating func pop() -> T {
        return items.removeLast()
    }
    // conformance to the Container protocol
    mutating func append(item: T) {
        self.push(item)
    }
    var count: Int {
    return items.count
    }
    subscript(i: Int) -> T {
        return items[i]
    }
}
```

這個時候，佔位類型參數`T`被用作`append`方法的item參數和下標的返回類型。Swift 因此可以推斷出被用作這個特定容器的`ItemType`的`T`的合適類型。


### 擴展一個存在的類型為一指定關聯類型

在[使用擴展來添加協議兼容性](../chapter2/21_Protocols.html)中有描述擴展一個存在的類型添加遵循一個協議。這個類型包含一個關聯類型的協議。

Swift的`Array`已經提供`append`方法，一個`count`屬性和通過下標來查找一個自己的元素。這三個功能都達到`Container`協議的要求。也就意味著你可以擴展`Array`去遵循`Container`協議，只要通過簡單聲明`Array`適用於該協議而已。如何實踐這樣一個空擴展，在[使用擴展來聲明協議的採納](../chapter2/21_Protocols.html)中有描述這樣一個實現一個空擴展的行為：

```swift
extension Array: Container {}
```

如同上面的泛型`Stack`類型一樣，`Array的append`方法和下標保證`Swift`可以推斷出`ItemType`所使用的適用的類型。定義了這個擴展後，你可以將任何`Array`當作`Container`來使用。

<a name="where_clauses"></a>
## Where 語句

[類型約束](#type_constraints)能夠確保類型符合泛型函數或類的定義約束。

對關聯類型定義約束是非常有用的。你可以在參數列表中通過*where*語句定義參數的約束。一個`where`語句能夠使一個關聯類型遵循一個特定的協議，以及（或）那個特定的類型參數和關聯類型可以是相同的。你可以寫一個`where`語句，緊跟在在類型參數列表後面，where語句後跟一個或者多個針對關聯類型的約束，以及（或）一個或多個類型和關聯類型間的等價(equality)關係。

下面的例子定義了一個名為`allItemsMatch`的泛型函數，用來檢查兩個`Container`實例是否包含相同順序的相同元素。如果所有的元素能夠匹配，那麼返回一個為`true`的`Boolean`值，反之則為`false`。

被檢查的兩個`Container`可以不是相同類型的容器（雖然它們可以是），但它們確實擁有相同類型的元素。這個需求通過一個類型約束和`where`語句結合來表示：

```swift
func allItemsMatch<
    C1: Container, C2: Container
    where C1.ItemType == C2.ItemType, C1.ItemType: Equatable>
    (someContainer: C1, anotherContainer: C2) -> Bool {

        // 檢查兩個Container的元素個數是否相同
        if someContainer.count != anotherContainer.count {
            return false
        }

        // 檢查兩個Container相應位置的元素彼此是否相等
        for i in 0..someContainer.count {
            if someContainer[i] != anotherContainer[i] {
                return false
            }
        }

        // 如果所有元素檢查都相同則返回true
        return true

}
```


這個函數用了兩個參數：`someContainer`和`anotherContainer`。`someContainer`參數是類型`C1`，`anotherContainer`參數是類型`C2`。`C1`和`C2`是容器的兩個佔位類型參數，決定了這個函數何時被調用。

這個函數的類型參數列緊隨在兩個類型參數需求的後面：

- `C1`必須遵循`Container`協議 (寫作 `C1: Container`)。
- `C2`必須遵循`Container`協議 (寫作 `C2: Container`)。
- `C1`的`ItemType`同樣是C2的`ItemType`（寫作 `C1.ItemType == C2.ItemType`）。
- `C1`的`ItemType`必須遵循`Equatable`協議 (寫作 `C1.ItemType: Equatable`)。

第三個和第四個要求被定義為一個`where`語句的一部分，寫在關鍵字`where`後面，作為函數類型參數鏈的一部分。

這些要求意思是：

`someContainer`是一個`C1`類型的容器。
`anotherContainer`是一個`C2`類型的容器。
`someContainer`和`anotherContainer`包含相同的元素類型。
`someContainer`中的元素可以通過不等於操作(`!=`)來檢查它們是否彼此不同。

第三個和第四個要求結合起來的意思是`anotherContainer`中的元素也可以通過 `!=` 操作來檢查，因為它們在`someContainer`中元素確實是相同的類型。

這些要求能夠使`allItemsMatch`函數比較兩個容器，即便它們是不同的容器類型。

`allItemsMatch`首先檢查兩個容器是否擁有同樣數目的items，如果它們的元素數目不同，沒有辦法進行匹配，函數就會`false`。

檢查完之後，函數通過`for-in`循環和半閉區間操作（..）來迭代`someContainer`中的所有元素。對於每個元素，函數檢查是否`someContainer`中的元素不等於對應的`anotherContainer`中的元素，如果這兩個元素不等，則這兩個容器不匹配，返回`false`。

如果循環體結束後未發現沒有任何的不匹配，那表明兩個容器匹配，函數返回`true`。

這裡演示了allItemsMatch函數運算的過程：

```swift
var stackOfStrings = Stack<String>()
stackOfStrings.push("uno")
stackOfStrings.push("dos")
stackOfStrings.push("tres")

var arrayOfStrings = ["uno", "dos", "tres"]

if allItemsMatch(stackOfStrings, arrayOfStrings) {
    println("All items match.")
} else {
    println("Not all items match.")
}
// 輸出 "All items match."
```

 上面的例子創建一個`Stack`單例來存儲`String`，然後壓了三個字符串進棧。這個例子也創建了一個`Array`單例，並初始化包含三個同棧裡一樣的原始字符串。即便棧和數組是不同的類型，但它們都遵循`Container`協議，而且它們都包含同樣的類型值。因此你可以調用`allItemsMatch`函數，用這兩個容器作為它的參數。在上面的例子中，`allItemsMatch`函數正確的顯示了所有的這兩個容器的`items`匹配。

  [1]: ../chapter2/06_Functions.html
  [2]: https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/stackPushPop_2x.png
  [3]: https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/stackPushedFourStrings_2x.png
  [4]: https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/stackPoppedOneString_2x.png
  [5]: ../chapter2/04_Collection_Types.html
  [6]: ../chapter2/21_Protocols.html
  [7]: ../chapter2/21_Protocols.html
  [8]: #type_constraints
