> 翻譯：[xiehurricane](https://github.com/xiehurricane)  
> 校對：[happyming](https://github.com/happyming)

# 類型轉換（Type Casting）
-----------------

本頁包含內容：

- [定義一個類層次作為例子](#defining_a_class_hierarchy_for_type_casting)
- [檢查類型](#checking_type)
- [向下轉型（Downcasting）](#downcasting)
- [`Any`和`AnyObject`的類型轉換](#type_casting_for_any_and_anyobject)


_類型轉換_是一種檢查類實例的方式，並且或者也是讓實例作為它的父類或者子類的一種方式。

類型轉換在 Swift 中使用`is` 和 `as`操作符實現。這兩個操作符提供了一種簡單達意的方式去檢查值的類型或者轉換它的類型。

你也可以用來檢查一個類是否實現了某個協議，就像在 [Checking for Protocol Conformance](Protocols.html#//apple_ref/doc/uid/TP40014097-CH25-XID_363)部分講述的一樣。

<a name="defining_a_class_hierarchy_for_type_casting"></a>
## 定義一個類層次作為例子

你可以將它用在類和子類的層次結構上，檢查特定類實例的類型並且轉換這個類實例的類型成為這個層次結構中的其他類型。這下面的三個代碼段定義了一個類層次和一個包含了幾個這些類實例的數組，作為類型轉換的例子。

第一個代碼片段定義了一個新的基礎類`MediaItem`。這個類為任何出現在數字媒體庫的媒體項提供基礎功能。特別的，它聲明了一個 `String` 類型的 `name` 屬性，和一個`init name`初始化器。（它假定所有的媒體項都有個名稱。）

```swift
class MediaItem {
    var name: String
    init(name: String) {
        self.name = name
    }
}
```

下一個代碼段定義了 `MediaItem` 的兩個子類。第一個子類`Movie`，在父類（或者說基類）的基礎上增加了一個 `director`（導演） 屬性，和相應的初始化器。第二個類在父類的基礎上增加了一個 `artist`（藝術家） 屬性，和相應的初始化器：

```swift
class Movie: MediaItem {
    var director: String
    init(name: String, director: String) {
        self.director = director
        super.init(name: name)
    }
}

class Song: MediaItem {
    var artist: String
    init(name: String, artist: String) {
        self.artist = artist
        super.init(name: name)
    }
}
```

最後一個代碼段創建了一個數組常量 `library`，包含兩個`Movie`實例和三個`Song`實例。`library`的類型是在它被初始化時根據它數組中所包含的內容推斷來的。Swift 的類型檢測器能夠演繹出`Movie` 和 `Song` 有共同的父類 `MediaItem` ，所以它推斷出 `MediaItem[]` 類作為 `library` 的類型。

```swift
let library = [
    Movie(name: "Casablanca", director: "Michael Curtiz"),
    Song(name: "Blue Suede Shoes", artist: "Elvis Presley"),
    Movie(name: "Citizen Kane", director: "Orson Welles"),
    Song(name: "The One And Only", artist: "Chesney Hawkes"),
    Song(name: "Never Gonna Give You Up", artist: "Rick Astley")
]
// the type of "library" is inferred to be MediaItem[]
```

在幕後`library` 裡存儲的媒體項依然是 `Movie` 和 `Song` 類型的，但是，若你迭代它，取出的實例會是 `MediaItem` 類型的，而不是 `Movie` 和 `Song` 類型的。為了讓它們作為它們本來的類型工作，你需要檢查它們的類型或者向下轉換它們的類型到其它類型，就像下面描述的一樣。

<a name="checking_type"></a>
## 檢查類型（Checking Type）

用類型檢查操作符(`is`)來檢查一個實例是否屬於特定子類型。若實例屬於那個子類型，類型檢查操作符返回 `true` ，否則返回 `false` 。

下面的例子定義了兩個變量，`movieCount` 和 `songCount`，用來計算數組`library` 中 `Movie` 和 `Song` 類型的實例數量。

```swift
var movieCount = 0
var songCount = 0

for item in library {
    if item is Movie {
        ++movieCount
    } else if item is Song {
        ++songCount
    }
}

println("Media library contains \(movieCount) movies and \(songCount) songs")
// prints "Media library contains 2 movies and 3 songs"
```

示例迭代了數組 `library` 中的所有項。每一次， `for`-`in` 循環設置
`item` 為數組中的下一個 `MediaItem`。

若當前 `MediaItem` 是一個 `Movie` 類型的實例， `item is Movie` 返回
`true`，相反返回 `false`。同樣的，`item is
Song`檢查item是否為`Song`類型的實例。在循環結束後，`movieCount` 和 `songCount`的值就是被找到屬於各自的類型的實例數量。

<a name="downcasting"></a>
## 向下轉型（Downcasting）

某類型的一個常量或變量可能在幕後實際上屬於一個子類。你可以相信，上面就是這種情況。你可以嘗試向下轉到它的子類型，用類型轉換操作符(`as`)

因為向下轉型可能會失敗，類型轉型操作符帶有兩種不同形式。可選形式（ optional form） `as?` 返回一個你試圖下轉成的類型的可選值（optional value）。強制形式 `as` 把試圖向下轉型和強制解包（force-unwraps）結果作為一個混合動作。

當你不確定向下轉型可以成功時，用類型轉換的可選形式(`as?`)。可選形式的類型轉換總是返回一個可選值（optional value），並且若下轉是不可能的，可選值將是 `nil` 。這使你能夠檢查向下轉型是否成功。

只有你可以確定向下轉型一定會成功時，才使用強制形式。當你試圖向下轉型為一個不正確的類型時，強制形式的類型轉換會觸發一個運行時錯誤。

下面的例子，迭代了`library`裡的每一個 `MediaItem` ，並打印出適當的描述。要這樣做，`item`需要真正作為`Movie` 或 `Song`的類型來使用。不僅僅是作為 `MediaItem`。為了能夠使用`Movie` 或 `Song`的 `director` 或 `artist`屬性，這是必要的。

在這個示例中，數組中的每一個`item`可能是 `Movie` 或 `Song`。   事前你不知道每個`item`的真實類型，所以這裡使用可選形式的類型轉換 （`as?`）去檢查循環裡的每次下轉。

```swift
for item in library {
    if let movie = item as? Movie {
        println("Movie: '\(movie.name)', dir. \(movie.director)")
    } else if let song = item as? Song {
        println("Song: '\(song.name)', by \(song.artist)")
    }
}

// Movie: 'Casablanca', dir. Michael Curtiz
// Song: 'Blue Suede Shoes', by Elvis Presley
// Movie: 'Citizen Kane', dir. Orson Welles
// Song: 'The One And Only', by Chesney Hawkes
// Song: 'Never Gonna Give You Up', by Rick Astley
```

示例首先試圖將 `item` 下轉為 `Movie`。因為 `item` 是一個 `MediaItem`
類型的實例，它可能是一個`Movie`；同樣，它可能是一個 `Song`，或者僅僅是基類
`MediaItem`。因為不確定，`as?`形式在試圖下轉時將返還一個可選值。 `item as Movie` 的返回值是`Movie?`類型或 「optional `Movie`」。

當向下轉型為 `Movie` 應用在兩個 `Song`
實例時將會失敗。為了處理這種情況，上面的例子使用了可選綁定（optional binding）來檢查可選 `Movie`真的包含一個值（這個是為了判斷下轉是否成功。）可選綁定是這樣寫的「`if let movie = item as? Movie`」，可以這樣解讀：

「嘗試將 `item` 轉為 `Movie`類型。若成功，設置一個新的臨時常量 `movie`  來存儲返回的可選`Movie`」

若向下轉型成功，然後`movie`的屬性將用於打印一個`Movie`實例的描述，包括它的導演的名字`director`。當`Song`被找到時，一個相近的原理被用來檢測 `Song` 實例和打印它的描述。

> 注意：  
轉換沒有真的改變實例或它的值。潛在的根本的實例保持不變；只是簡單地把它作為它被轉換成的類來使用。

<a name="type_casting_for_any_and_anyobject"></a>
## `Any`和`AnyObject`的類型轉換

Swift為不確定類型提供了兩種特殊類型別名：

* `AnyObject`可以代表任何class類型的實例。
* `Any`可以表示任何類型，除了方法類型（function types）。

> 注意：  
只有當你明確的需要它的行為和功能時才使用`Any`和`AnyObject`。在你的代碼裡使用你期望的明確的類型總是更好的。

### `AnyObject`類型

當需要在工作中使用 Cocoa APIs，它一般接收一個`AnyObject[]`類型的數組，或者說「一個任何對像類型的數組」。這是因為 Objective-C 沒有明確的類型化數組。但是，你常常可以確定包含在僅從你知道的 API 信息提供的這樣一個數組中的對象的類型。

在這些情況下，你可以使用強制形式的類型轉換(`as`)來下轉在數組中的每一項到比 `AnyObject` 更明確的類型，不需要可選解析（optional unwrapping）。

下面的示例定義了一個 `AnyObject[]` 類型的數組並填入三個`Movie`類型的實例：

```swift
let someObjects: AnyObject[] = [
    Movie(name: "2001: A Space Odyssey", director: "Stanley Kubrick"),
    Movie(name: "Moon", director: "Duncan Jones"),
    Movie(name: "Alien", director: "Ridley Scott")
]
```

因為知道這個數組只包含 `Movie` 實例，你可以直接用(`as`)下轉並解包到不可選的`Movie`類型（ps：其實就是我們常用的正常類型，這裡是為了和可選類型相對比）。

```swift
for object in someObjects {
    let movie = object as Movie
    println("Movie: '\(movie.name)', dir. \(movie.director)")
}
// Movie: '2001: A Space Odyssey', dir. Stanley Kubrick
// Movie: 'Moon', dir. Duncan Jones
// Movie: 'Alien', dir. Ridley Scott
```

為了變為一個更短的形式，下轉`someObjects`數組為`Movie[]`類型來代替下轉每一項方式。

```swift
for movie in someObjects as Movie[] {
    println("Movie: '\(movie.name)', dir. \(movie.director)")
}
// Movie: '2001: A Space Odyssey', dir. Stanley Kubrick
// Movie: 'Moon', dir. Duncan Jones
// Movie: 'Alien', dir. Ridley Scott
```

### `Any`類型

這裡有個示例，使用 `Any` 類型來和混合的不同類型一起工作，包括非`class`類型。它創建了一個可以存儲`Any`類型的數組 `things`。

```swift
var things = Any[]()

things.append(0)
things.append(0.0)
things.append(42)
things.append(3.14159)
things.append("hello")
things.append((3.0, 5.0))
things.append(Movie(name: "Ghostbusters", director: "Ivan Reitman"))
```

`things` 數組包含兩個 `Int` 值，2個 `Double` 值，1個 `String` 值，一個元組 `(Double, Double)` ，Ivan Reitman 導演的電影「Ghostbusters」。

你可以在 `switch` `cases`裡用`is` 和 `as` 操作符來發覺只知道是 `Any` 或 `AnyObject`的常量或變量的類型。 下面的示例迭代 `things`數組中的每一項的並用`switch`語句查找每一項的類型。這幾種`switch`語句的情形綁定它們匹配的值到一個規定類型的常量，讓它們可以打印它們的值：

```swift
for thing in things {
    switch thing {
    case 0 as Int:
        println("zero as an Int")
    case 0 as Double:
        println("zero as a Double")
    case let someInt as Int:
        println("an integer value of \(someInt)")
    case let someDouble as Double where someDouble > 0:
        println("a positive double value of \(someDouble)")
    case is Double:
        println("some other double value that I don't want to print")
    case let someString as String:
        println("a string value of \"\(someString)\"")
    case let (x, y) as (Double, Double):
        println("an (x, y) point at \(x), \(y)")
    case let movie as Movie:
        println("a movie called '\(movie.name)', dir. \(movie.director)")
    default:
        println("something else")
    }
}

// zero as an Int
// zero as a Double
// an integer value of 42
// a positive double value of 3.14159
// a string value of "hello"
// an (x, y) point at 3.0, 5.0
// a movie called 'Ghostbusters', dir. Ivan Reitman
```


> 注意：  
在一個switch語句的case中使用強制形式的類型轉換操作符（as, 而不是 as?）來檢查和轉換到一個明確的類型。在 switch case 語句的內容中這種檢查總是安全的。
