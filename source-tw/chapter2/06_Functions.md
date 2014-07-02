> 翻譯：[honghaoz](https://github.com/honghaoz)
> 校對：[LunaticM](https://github.com/LunaticM)

# 函數（Functions）
-----------------

本頁包含內容：

- [函數定義與調用（Defining and Calling Functions）](#Defining_and_Calling_Functions)
- [函數參數與返回值（Function Parameters and Return Values）](#Function_Parameters_and_Return_Values)
- [函數參數名稱（Function Parameter Names）](#Function_Parameter_Names)
- [函數類型（Function Types）](#Function_Types)
- [函數嵌套（Nested Functions）](#Nested_Functions)

函數是用來完成特定任務的獨立的代碼塊。你給一個函數起一個合適的名字，用來標識函數做什麼，並且當函數需要執行的時候，這個名字會被「調用」。

Swift 統一的函數語法足夠靈活，可以用來表示任何函數，包括從最簡單的沒有參數名字的 C 風格函數，到複雜的帶局部和外部參數名的 Objective-C 風格函數。參數可以提供默認值，以簡化函數調用。參數也可以既當做傳入參數，也當做傳出參數，也就是說，一旦函數執行結束，傳入的參數值可以被修改。

在 Swift 中，每個函數都有一種類型，包括函數的參數值類型和返回值類型。你可以把函數類型當做任何其他普通變量類型一樣處理，這樣就可以更簡單地把函數當做別的函數的參數，也可以從其他函數中返回函數。函數的定義可以寫在在其他函數定義中，這樣可以在嵌套函數範圍內實現功能封裝。

<a name="Defining_and_Calling_Functions"></a>
## 函數的定義與調用（Defining and Calling Functions）

當你定義一個函數時，你可以定義一個或多個有名字和類型的值，作為函數的輸入（稱為參數，parameters），也可以定義某種類型的值作為函數執行結束的輸出（稱為返回類型）。

每個函數有個函數名，用來描述函數執行的任務。要使用一個函數時，你用函數名「調用」，並傳給它匹配的輸入值（稱作實參，arguments）。一個函數的實參必須與函數參數表裡參數的順序一致。

在下面例子中的函數叫做`"greetingForPerson"`，之所以叫這個名字是因為這個函數用一個人的名字當做輸入，並返回給這個人的問候語。為了完成這個任務，你定義一個輸入參數-一個叫做 `personName` 的 `String` 值，和一個包含給這個人問候語的 `String` 類型的返回值：

```swift
func sayHello(personName: String) -> String {
    let greeting = "Hello, " + personName + "!"
    return greeting
}
```

所有的這些信息匯總起來成為函數的定義，並以 `func` 作為前綴。指定函數返回類型時，用返回箭頭 `->`（一個連字符後跟一個右尖括號）後跟返回類型的名稱的方式來表示。

該定義描述了函數做什麼，它期望接收什麼和執行結束時它返回的結果是什麼。這樣的定義使的函數可以在別的地方以一種清晰的方式被調用：

```swift
println(sayHello("Anna"))
// prints "Hello, Anna!"
println(sayHello("Brian"))
// prints "Hello, Brian!"
```

調用 `sayHello` 函數時，在圓括號中傳給它一個 `String` 類型的實參。因為這個函數返回一個 `String` 類型的值，`sayHello` 可以被包含在 `println` 的調用中，用來輸出這個函數的返回值，正如上面所示。

在 `sayHello` 的函數體中，先定義了一個新的名為 `greeting` 的 `String` 常量，同時賦值了給 `personName` 的一個簡單問候消息。然後用 `return` 關鍵字把這個問候返回出去。一旦 `return greeting` 被調用，該函數結束它的執行並返回 `greeting` 的當前值。

你可以用不同的輸入值多次調用 `sayHello`。上面的例子展示的是用`"Anna"`和`"Brian"`調用的結果，該函數分別返回了不同的結果。

為了簡化這個函數的定義，可以將問候消息的創建和返回寫成一句：

```swift
func sayHelloAgain(personName: String) -> String {
    return "Hello again, " + personName + "!"
}
println(sayHelloAgain("Anna"))
// prints "Hello again, Anna!"
```

<a name="Function_Parameters_and_Return_Values"></a>
## 函數參數與返回值（Function Parameters and Return Values）

函數參數與返回值在Swift中極為靈活。你可以定義任何類型的函數，包括從只帶一個未名參數的簡單函數到複雜的帶有表達性參數名和不同參數選項的複雜函數。

### 多重輸入參數（Multiple Input Parameters）

函數可以有多個輸入參數，寫在圓括號中，用逗號分隔。

下面這個函數用一個半開區間的開始點和結束點，計算出這個範圍內包含多少數字：

```swift
func halfOpenRangeLength(start: Int, end: Int) -> Int {
    return end - start
}
println(halfOpenRangeLength(1, 10))
// prints "9"
```

### 無參函數（Functions Without Parameters）

函數可以沒有參數。下面這個函數就是一個無參函數，當被調用時，它返回固定的 `String` 消息：

```swift
func sayHelloWorld() -> String {
    return "hello, world"
}
println(sayHelloWorld())
// prints "hello, world"
```

儘管這個函數沒有參數，但是定義中在函數名後還是需要一對圓括號。當被調用時，也需要在函數名後寫一對圓括號。

### 無返回值函數（Functions Without Return Values）

函數可以沒有返回值。下面是 `sayHello` 函數的另一個版本，叫 `waveGoodbye`，這個函數直接輸出 `String` 值，而不是返回它：

```swift
func sayGoodbye(personName: String) {
    println("Goodbye, \(personName)!")
}
sayGoodbye("Dave")
// prints "Goodbye, Dave!"
```

因為這個函數不需要返回值，所以這個函數的定義中沒有返回箭頭（->）和返回類型。

> 注意：
> 嚴格上來說，雖然沒有返回值被定義，`sayGoodbye` 函數依然返回了值。沒有定義返回類型的函數會返回特殊的值，叫 `Void`。它其實是一個空的元組（tuple），沒有任何元素，可以寫成`()`。

被調用時，一個函數的返回值可以被忽略：

```swift
func printAndCount(stringToPrint: String) -> Int {
    println(stringToPrint)
    return countElements(stringToPrint)
}
func printWithoutCounting(stringToPrint: String) {
    printAndCount(stringToPrint)
}
printAndCount("hello, world")
// prints "hello, world" and returns a value of 12
printWithoutCounting("hello, world")
// prints "hello, world" but does not return a value

```

第一個函數 `printAndCount`，輸出一個字符串並返回 `Int` 類型的字符數。第二個函數 `printWithoutCounting`調用了第一個函數，但是忽略了它的返回值。當第二個函數被調用時，消息依然會由第一個函數輸出，但是返回值不會被用到。

> 注意：
> 返回值可以被忽略，但定義了有返回值的函數必須返回一個值，如果在函數定義底部沒有返回任何值，這將導致編譯錯誤（compile-time error）。

### 多重返回值函數（Functions with Multiple Return Values）

你可以用元組（tuple）類型讓多個值作為一個復合值從函數中返回。

下面的這個例子中，`count` 函數用來計算一個字符串中元音，輔音和其他字母的個數（基於美式英語的標準）。

```swift
func count(string: String) -> (vowels: Int, consonants: Int, others: Int) {
    var vowels = 0, consonants = 0, others = 0
    for character in string {
        switch String(character).lowercaseString {
        case "a", "e", "i", "o", "u":
            ++vowels
        case "b", "c", "d", "f", "g", "h", "j", "k", "l", "m",
          "n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z":
            ++consonants
        default:
            ++others
        }
    }
    return (vowels, consonants, others)
}
```

你可以用 `count` 函數來處理任何一個字符串，返回的值將是一個包含三個 `Int` 型值的元組（tuple）：

```swift
let total = count("some arbitrary string!")
println("\(total.vowels) vowels and \(total.consonants) consonants")
// prints "6 vowels and 13 consonants"
```

需要注意的是，元組的成員不需要在函數中返回時命名，因為它們的名字已經在函數返回類型中有了定義。

<a name="Function_Parameter_Names"></a>
## 函數參數名稱（Function Parameter Names）

以上所有的函數都給它們的參數定義了`參數名（parameter name）`：

```swift
func someFunction(parameterName: Int) {
    // function body goes here, and can use parameterName
    // to refer to the argument value for that parameter
}
```

但是，這些參數名僅在函數體中使用，不能在函數調用時使用。這種類型的參數名被稱作`局部參數名（local parameter name）`，因為它們只能在函數體中使用。

### 外部參數名（External Parameter Names）

有時候，調用函數時，給每個參數命名是非常有用的，因為這些參數名可以指出各個實參的用途是什麼。

如果你希望函數的使用者在調用函數時提供參數名字，那就需要給每個參數除了局部參數名外再定義一個`外部參數名`。外部參數名寫在局部參數名之前，用空格分隔。

```swift
func someFunction(externalParameterName localParameterName: Int) {
    // function body goes here, and can use localParameterName
    // to refer to the argument value for that parameter
}
```

> 注意：
> 如果你提供了外部參數名，那麼函數在被調用時，必須使用外部參數名。

以下是個例子，這個函數使用一個`結合者（joiner）`把兩個字符串聯在一起：

```swift
func join(s1: String, s2: String, joiner: String) -> String {
    return s1 + joiner + s2
}
```

當你調用這個函數時，這三個字符串的用途是不清楚的：

```swift
join("hello", "world", ", ")
// returns "hello, world"
```

為了讓這些字符串的用途更為明顯，我們為 `join` 函數添加外部參數名：

```swift
func join(string s1: String, toString s2: String, withJoiner joiner: String) -> String {
    return s1 + joiner + s2
}
```

在這個版本的 `join` 函數中，第一個參數有一個叫 `string` 的外部參數名和 `s1` 的局部參數名，第二個參數有一個叫 `toString` 的外部參數名和 `s2` 的局部參數名，第三個參數有一個叫 `withJoiner` 的外部參數名和 `joiner` 的局部參數名。

現在，你可以使用這些外部參數名以一種清晰地方式來調用函數了：

```swift
join(string: "hello", toString: "world", withJoiner: ", ")
// returns "hello, world"
```

使用外部參數名讓第二個版本的 `join` 函數的調用更為有表現力，更為通順，同時還保持了函數體是可讀的和有明確意圖的。

> 注意：
> 當其他人在第一次讀你的代碼，函數參數的意圖顯得不明顯時，考慮使用外部參數名。如果函數參數名的意圖是很明顯的，那就不需要定義外部參數名了。

### 簡寫外部參數名（Shorthand External Parameter Names）

如果你需要提供外部參數名，但是局部參數名已經定義好了，那麼你不需要寫兩次參數名。相反，只寫一次參數名，並用`井號（#）`作為前綴就可以了。這告訴 Swift 使用這個參數名作為局部和外部參數名。

下面這個例子定義了一個叫 `containsCharacter` 的函數，使用`井號（#）`的方式定義了外部參數名：

```swift
func containsCharacter(#string: String, #characterToFind: Character) -> Bool {
    for character in string {
        if character == characterToFind {
            return true
        }
    }
    return false
}
```

這樣定義參數名，使得函數體更為可讀，清晰，同時也可以以一個不含糊的方式被調用：

```swift
let containsAVee = containsCharacter(string: "aardvark", characterToFind: "v")
// containsAVee equals true, because "aardvark" contains a "v」
```

### 默認參數值（Default Parameter Values）

你可以在函數體中為每個參數定義`默認值`。當默認值被定義後，調用這個函數時可以忽略這個參數。

> 注意：
> 將帶有默認值的參數放在函數參數列表的最後。這樣可以保證在函數調用時，非默認參數的順序是一致的，同時使得相同的函數在不同情況下調用時顯得更為清晰。

以下是另一個版本的`join`函數，其中`joiner`有了默認參數值：

```swift
func join(string s1: String, toString s2: String, withJoiner joiner: String = " ") -> String {
    return s1 + joiner + s2
}
```

像第一個版本的 `join` 函數一樣，如果 `joiner` 被賦值時，函數將使用這個字符串值來連接兩個字符串：

```swift
join(string: "hello", toString: "world", withJoiner: "-")
// returns "hello-world"
```

當這個函數被調用時，如果 `joiner` 的值沒有被指定，函數會使用默認值（" "）：

```swift
join(string: "hello", toString:"world")
// returns "hello world"
```

### 默認值參數的外部參數名（External Names for Parameters with Default Values）

在大多數情況下，給帶默認值的參數起一個外部參數名是很有用的。這樣可以保證當函數被調用且帶默認值的參數被提供值時，實參的意圖是明顯的。

為了使定義外部參數名更加簡單，當你未給帶默認值的參數提供外部參數名時，Swift 會自動提供外部名字。此時外部參數名與局部名字是一樣的，就像你已經在局部參數名前寫了`井號（#）`一樣。

下面是 `join` 函數的另一個版本，這個版本中並沒有為它的參數提供外部參數名，但是 `joiner` 參數依然有外部參數名：

```swift
func join(s1: String, s2: String, joiner: String = " ") -> String {
    return s1 + joiner + s2
}
```

在這個例子中，Swift 自動為 `joiner` 提供了外部參數名。因此，當函數調用時，外部參數名必須使用，這樣使得參數的用途變得清晰。

```swift
join("hello", "world", joiner: "-")
// returns "hello-world"
```

> 注意：
> 你可以使用`下劃線（_）`作為默認值參數的外部參數名，這樣可以在調用時不用提供外部參數名。但是給帶默認值的參數命名總是更加合適的。

### 可變參數（Variadic Parameters）

一個`可變參數（variadic parameter）`可以接受一個或多個值。函數調用時，你可以用可變參數來傳入不確定數量的輸入參數。通過在變量類型名後面加入`（...）`的方式來定義可變參數。

傳入可變參數的值在函數體內當做這個類型的一個數組。例如，一個叫做 `numbers` 的 `Double...` 型可變參數，在函數體內可以當做一個叫 `numbers` 的 `Double[]` 型的數組常量。

下面的這個函數用來計算一組任意長度數字的算術平均數：

```swift
func arithmeticMean(numbers: Double...) -> Double {
    var total: Double = 0
    for number in numbers {
        total += number
    }
    return total / Double(numbers.count)
}
arithmeticMean(1, 2, 3, 4, 5)
// returns 3.0, which is the arithmetic mean of these five numbers
arithmeticMean(3, 8, 19)
// returns 10.0, which is the arithmetic mean of these three numbers
```

> 注意：
> 一個函數至多能有一個可變參數，而且它必須是參數表中最後的一個。這樣做是為了避免函數調用時出現歧義。

如果函數有一個或多個帶默認值的參數，而且還有一個可變參數，那麼把可變參數放在參數表的最後。

### 常量參數和變量參數（Constant and Variable Parameters）

函數參數默認是常量。試圖在函數體中更改參數值將會導致編譯錯誤。這意味著你不能錯誤地更改參數值。

但是，有時候，如果函數中有傳入參數的變量值副本將是很有用的。你可以通過指定一個或多個參數為變量參數，從而避免自己在函數中定義新的變量。變量參數不是常量，你可以在函數中把它當做新的可修改副本來使用。

通過在參數名前加關鍵字 `var` 來定義變量參數：

```swift
func alignRight(var string: String, count: Int, pad: Character) -> String {
    let amountToPad = count - countElements(string)
    for _ in 1...amountToPad {
        string = pad + string
    }
    return string
}
let originalString = "hello"
let paddedString = alignRight(originalString, 10, "-")
// paddedString is equal to "-----hello"
// originalString is still equal to "hello"
```

這個例子中定義了一個新的叫做 `alignRight` 的函數，用來右對齊輸入的字符串到一個長的輸出字符串中。左側空餘的地方用指定的填充字符填充。這個例子中，字符串`"hello"`被轉換成了`"-----hello"`。

`alignRight` 函數將參數 `string` 定義為變量參數。這意味著 `string` 現在可以作為一個局部變量，用傳入的字符串值初始化，並且可以在函數體中進行操作。

該函數首先計算出多少個字符需要被添加到 `string` 的左邊，以右對齊到總的字符串中。這個值存在局部常量 `amountToPad` 中。這個函數然後將 `amountToPad` 多的填充（pad）字符填充到 `string` 左邊，並返回結果。它使用了 `string` 這個變量參數來進行所有字符串操作。

> 注意：
> 對變量參數所進行的修改在函數調用結束後便消失了，並且對於函數體外是不可見的。變量參數僅僅存在於函數調用的生命週期中。

### 輸入輸出參數（In-Out Parameters）

變量參數，正如上面所述，僅僅能在函數體內被更改。如果你想要一個函數可以修改參數的值，並且想要在這些修改在函數調用結束後仍然存在，那麼就應該把這個參數定義為輸入輸出參數（In-Out Parameters）。

定義一個輸入輸出參數時，在參數定義前加 `inout` 關鍵字。一個輸入輸出參數有傳入函數的值，這個值被函數修改，然後被傳出函數，替換原來的值。

你只能傳入一個變量作為輸入輸出參數。你不能傳入常量或者字面量（literal value），因為這些量是不能被修改的。當傳入的參數作為輸入輸出參數時，需要在參數前加`&`符，表示這個值可以被函數修改。

> 注意：
> 輸入輸出參數不能有默認值，而且可變參數不能用 `inout` 標記。如果你用 `inout` 標記一個參數，這個參數不能被 `var` 或者 `let` 標記。

下面是例子，`swapTwoInts` 函數，有兩個分別叫做 `a` 和 `b` 的輸入輸出參數：

```swift
func swapTwoInts(inout a: Int, inout b: Int) {
    let temporaryA = a
    a = b
    b = temporaryA
}
```

這個 `swapTwoInts` 函數僅僅交換 `a` 與 `b` 的值。該函數先將 `a` 的值存到一個暫時常量 `temporaryA` 中，然後將 `b` 的值賦給 `a`，最後將 `temporaryA` 幅值給 `b`。

你可以用兩個 `Int` 型的變量來調用 `swapTwoInts`。需要注意的是，`someInt` 和 `anotherInt` 在傳入 `swapTwoInts` 函數前，都加了 `&` 的前綴：

```swift
var someInt = 3
var anotherInt = 107
swapTwoInts(&someInt, &anotherInt)
println("someInt is now \(someInt), and anotherInt is now \(anotherInt)")
// prints "someInt is now 107, and anotherInt is now 3」
```

從上面這個例子中，我們可以看到 `someInt` 和 `anotherInt` 的原始值在 `swapTwoInts` 函數中被修改，儘管它們的定義在函數體外。

> 注意：
> 輸出輸出參數和返回值是不一樣的。上面的 `swapTwoInts` 函數並沒有定義任何返回值，但仍然修改了 `someInt` 和 `anotherInt` 的值。輸入輸出參數是函數對函數體外產生影響的另一種方式。

<a name="Function_Types"></a>
## 函數類型（Function Types）

每個函數都有種特定的函數類型，由函數的參數類型和返回類型組成。

例如：

```swift
func addTwoInts(a: Int, b: Int) -> Int {
    return a + b
}
func multiplyTwoInts(a: Int, b: Int) -> Int {
    return a * b
}
```

這個例子中定義了兩個簡單的數學函數：`addTwoInts` 和 `multiplyTwoInts`。這兩個函數都傳入兩個 `Int` 類型， 返回一個合適的`Int`值。

這兩個函數的類型是 `(Int, Int) -> Int`，可以讀作「這個函數類型，它有兩個 `Int` 型的參數並返回一個 `Int` 型的值。」。

下面是另一個例子，一個沒有參數，也沒有返回值的函數：

```swift
func printHelloWorld() {
    println("hello, world")
}
```

這個函數的類型是：`() -> ()`，或者叫「沒有參數，並返回 `Void` 類型的函數」。沒有指定返回類型的函數總返回 `Void`。在Swift中，`Void` 與空的元組是一樣的。

### 使用函數類型（Using Function Types）

在 Swift 中，使用函數類型就像使用其他類型一樣。例如，你可以定義一個類型為函數的常量或變量，並將函數賦值給它：

```swift
var mathFunction: (Int, Int) -> Int = addTwoInts
```

這個可以讀作：

「定義一個叫做 `mathFunction` 的變量，類型是『一個有兩個 `Int` 型的參數並返回一個 `Int` 型的值的函數』，並讓這個新變量指向 `addTwoInts` 函數」。

`addTwoInts` 和 `mathFunction` 有同樣的類型，所以這個賦值過程在 Swift 類型檢查中是允許的。

現在，你可以用 `mathFunction` 來調用被賦值的函數了：

```swift
println("Result: \(mathFunction(2, 3))")
// prints "Result: 5"
```

有相同匹配類型的不同函數可以被賦值給同一個變量，就像非函數類型的變量一樣：

```swift
mathFunction = multiplyTwoInts
println("Result: \(mathFunction(2, 3))")
// prints "Result: 6"
```

就像其他類型一樣，當賦值一個函數給常量或變量時，你可以讓 Swift 來推斷其函數類型：

```swift
let anotherMathFunction = addTwoInts
// anotherMathFunction is inferred to be of type (Int, Int) -> Int
```

### 函數類型作為參數類型（Function Types as Parameter Types）

你可以用`(Int, Int) -> Int`這樣的函數類型作為另一個函數的參數類型。這樣你可以將函數的一部分實現交由給函數的調用者。

下面是另一個例子，正如上面的函數一樣，同樣是輸出某種數學運算結果：

```swift
func printMathResult(mathFunction: (Int, Int) -> Int, a: Int, b: Int) {
    println("Result: \(mathFunction(a, b))")
}
printMathResult(addTwoInts, 3, 5)
// prints "Result: 8」
```

這個例子定義了 `printMathResult` 函數，它有三個參數：第一個參數叫 `mathFunction`，類型是`(Int, Int) -> Int`，你可以傳入任何這種類型的函數；第二個和第三個參數叫 `a` 和 `b`，它們的類型都是 `Int`，這兩個值作為已給的函數的輸入值。

當 `printMathResult` 被調用時，它被傳入 `addTwoInts` 函數和整數`3`和`5`。它用傳入`3`和`5`調用 `addTwoInts`，並輸出結果：`8`。

`printMathResult` 函數的作用就是輸出另一個合適類型的數學函數的調用結果。它不關心傳入函數是如何實現的，它只關心這個傳入的函數類型是正確的。這使得 `printMathResult` 可以以一種類型安全（type-safe）的方式來保證傳入函數的調用是正確的。

### 函數類型作為返回類型（Function Type as Return Types）

你可以用函數類型作為另一個函數的返回類型。你需要做的是在返回箭頭（`->`）後寫一個完整的函數類型。

下面的這個例子中定義了兩個簡單函數，分別是 `stepForward` 和`stepBackward`。`stepForward` 函數返回一個比輸入值大一的值。`stepBackward` 函數返回一個比輸入值小一的值。這兩個函數的類型都是 `(Int) -> Int`：

```swift
func stepForward(input: Int) -> Int {
    return input + 1
}
func stepBackward(input: Int) -> Int {
    return input - 1
}
```

下面這個叫做 `chooseStepFunction` 的函數，它的返回類型是 `(Int) -> Int` 的函數。`chooseStepFunction` 根據布爾值 `backwards` 來返回 `stepForward` 函數或 `stepBackward` 函數：

```swift
func chooseStepFunction(backwards: Bool) -> (Int) -> Int {
    return backwards ? stepBackward : stepForward
}
```

你現在可以用 `chooseStepFunction` 來獲得一個函數，不管是那個方向：

```swift
var currentValue = 3
let moveNearerToZero = chooseStepFunction(currentValue > 0)
// moveNearerToZero now refers to the stepBackward() function
```

上面這個例子中計算出從 `currentValue` 逐漸接近到`0`是需要向正數走還是向負數走。`currentValue` 的初始值是`3`，這意味著 `currentValue > 0` 是真的（`true`），這將使得 `chooseStepFunction` 返回 `stepBackward` 函數。一個指向返回的函數的引用保存在了 `moveNearerToZero` 常量中。

現在，`moveNearerToZero` 指向了正確的函數，它可以被用來數到`0`：

```swift
println("Counting to zero:")
// Counting to zero:
while currentValue != 0 {
    println("\(currentValue)... ")
    currentValue = moveNearerToZero(currentValue)
}
println("zero!")
// 3...
// 2...
// 1...
// zero!
```

<a name="Nested_Functions"></a>
## 嵌套函數（Nested Functions）

這章中你所見到的所有函數都叫全局函數（global functions），它們定義在全局域中。你也可以把函數定義在別的函數體中，稱作嵌套函數（nested functions）。

默認情況下，嵌套函數是對外界不可見的，但是可以被他們封閉函數（enclosing function）來調用。一個封閉函數也可以返回它的某一個嵌套函數，使得這個函數可以在其他域中被使用。

你可以用返回嵌套函數的方式重寫 `chooseStepFunction` 函數：

```swift
func chooseStepFunction(backwards: Bool) -> (Int) -> Int {
    func stepForward(input: Int) -> Int { return input + 1 }
    func stepBackward(input: Int) -> Int { return input - 1 }
    return backwards ? stepBackward : stepForward
}
var currentValue = -4
let moveNearerToZero = chooseStepFunction(currentValue > 0)
// moveNearerToZero now refers to the nested stepForward() function
while currentValue != 0 {
    println("\(currentValue)... ")
    currentValue = moveNearerToZero(currentValue)
}
println("zero!")
// -4...
// -3...
// -2...
// -1...
// zero!
```
