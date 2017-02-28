> 翻譯：[xielingwang](https://github.com/xielingwang)    
> 校對：[Evilcome](https://github.com/Evilcome)

# 基本運算符
-----------------

本頁包含內容：

- [術語](#terminology)
- [賦值運算符](#assignment_operator)
- [數值運算符](#arithmetic_operators)
- [組合賦值運算符（Compound Assignment Operators）](#compound_assignment_operators)
- [比較運算符](#comparison_operators)
- [三元條件運算符（Ternary Conditional Operator）](#ternary_conditional_operator)
- [區間運算符](#range_operators)
- [邏輯運算符](#logical_operators)

運算符是檢查、改變、合併值的特殊符號或短語。例如，加號`+`將兩個數相加（如`let i = 1 + 2`）。複雜些的運算例如邏輯與運算符`&&`（如`if enteredDoorCode && passedRetinaScan`），或讓 i 值加1的便捷自增運算符`++i`等。

Swift 支持大部分標準 C 語言的運算符，且改進許多特性來減少常規編碼錯誤。如：賦值符（`=`）不返回值，以防止把想要判斷相等運算符（`==`）的地方寫成賦值符導致的錯誤。數值運算符（`+`，`-`，`*`，`/`，`%`等）會檢測並不允許值溢出，以此來避免保存變量時由於變量大於或小於其類型所能承載的範圍時導致的異常結果。當然允許你使用 Swift 的溢出運算符來實現溢出。詳情參見[溢出運算符](23_Advanced_Operators.html#overflow_operators)。

區別於 C 語言，在 Swift 中你可以對浮點數進行取余運算（`%`），Swift 還提供了 C 語言沒有的表達兩數之間的值的區間運算符，（`a..b`和`a...b`），這方便我們表達一個區間內的數值。

本章節只描述了 Swift 中的基本運算符，[高級運算符](23_Advanced_Operators.html)包含了高級運算符，及如何自定義運算符，及如何進行自定義類型的運算符重載。

<a name="terminology"></a>
## 術語

運算符有一元、二元和三元運算符。

- 一元運算符對單一操作對像操作（如`-a`）。一元運算符分前置符和後置運算符，前置運算符需緊排操作對像之前（如`!b`），後置運算符需緊跟操作對像之後（如`i++`）。
- 二元運算符操作兩個操作對像（如`2 + 3`），是中置的，因為它們出現在兩個操作對像之間。
- 三元運算符操作三個操作對象，和 C 語言一樣，Swift 只有一個三元運算符，就是三元條件運算符（`a ? b : c`）。

受運算符影響的值叫操作數，在表達式`1 + 2`中，加號`+`是二元運算符，它的兩個操作數是值`1`和`2`。

<a name="assignment_operator"></a>
## 賦值運算符

賦值運算（`a = b`），表示用`b`的值來初始化或更新`a`的值：

```swift
let b = 10
var a = 5
a = b
// a 現在等於 10
```

如果賦值的右邊是一個多元組，它的元素可以馬上被分解多個變量或變量：

```swiflt
let (x, y) = (1, 2)
// 現在 x 等於 1, y 等於 2
```

與 C 語言和 Objective-C 不同，Swift 的賦值操作並不返回任何值。所以以下代碼是錯誤的：

```swift
if x = y {
    // 此句錯誤, 因為 x = y 並不返回任何值
}
```

這個特性使你無法把（`==`）錯寫成（`=`），由於`if x = y`是錯誤代碼，Swift 從底層幫你避免了這些錯誤代碼。

<a name="arithmetic_operators"></a>
## 數值運算

Swift 中所有數值類型都支持了基本的四則運算：

- 加法（`+`）
- 減法（`-`）
- 乘法（`*`）
- 除法（`/`）

```swift
1 + 2       // 等於 3
5 - 3       // 等於 2
2 * 3       // 等於 6
10.0 / 2.5  // 等於 4.0
```

與 C 語言和 Objective-C 不同的是，Swift 默認不允許在數值運算中出現溢出情況。但你可以使用 Swift 的溢出運算符來達到你有目的的溢出（如`a &+ b`）。詳情參見[溢出運算符](23_Advanced_Operators.html#overflow_operators)。

加法運算符也可用於`String`的拼接：

```swift
"hello, " + "world"  // 等於 "hello, world"
```

兩個`Character`值或一個`String`和一個`Character`值，相加會生成一個新的`String`值：

```swift
let dog: Character = "d"
let cow: Character = "c"
let dogCow = dog + cow
// 譯者注: 原來的引號內是很可愛的小狗和小牛, 但win os下不支持表情字符, 所以改成了普通字符
// dogCow 現在是 "dc"
```

詳情參見[字符，字符串的拼接](03_Strings_and_Characters.html#concatenating_strings_and_characters)。

### 求余運算

求余運算（`a % b`）是計算`b`的多少倍剛剛好可以容入`a`，返回多出來的那部分（餘數）。

>注意：  
求余運算（`%`）在其他語言也叫取模運算。然而嚴格說來，我們看該運算符對負數的操作結果，"求余"比"取模"更合適些。

我們來談談取余是怎麼回事，計算`9 % 4`，你先計算出`4`的多少倍會剛好可以容入`9`中：

![Art/remainderInteger_2x.png](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/remainderInteger_2x.png "Art/remainderInteger_2x.png")

2倍，非常好，那餘數是1（用橙色標出）

在 Swift 中這麼來表達：

```swift
9 % 4    // 等於 1
```

為了得到`a % b`的結果，`%`計算了以下等式，並輸出`餘數`作為結果：

*a = (b × 倍數) + 餘數*

當`倍數`取最大值的時候，就會剛好可以容入`a`中。

把`9`和`4`代入等式中，我們得`1`：

```swift
9 = (4 × 2) + 1
```

同樣的方法，我來們計算 `-9 % 4`：

```swift
-9 % 4   // 等於 -1
```

把`-9`和`4`代入等式，`-2`是取到的最大整數：

```swift
-9 = (4 × -2) + -1
```

餘數是`-1`。

在對負數`b`求余時，`b`的符號會被忽略。這意味著 `a % b` 和 `a % -b`的結果是相同的。

### 浮點數求余計算

不同於 C 語言和 Objective-C，Swift 中是可以對浮點數進行求余的。

```swift
8 % 2.5 // 等於 0.5
```

這個例子中，`8`除於`2.5`等於`3`余`0.5`，所以結果是一個`Double`值`0.5`。

![Art/remainderFloat_2x.png](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Art/remainderFloat_2x.png "Art/remainderFloat_2x.png")

### 自增和自增運算

和 C 語言一樣，Swift 也提供了方便對變量本身加1或減1的自增（`++`）和自減（`--`）的運算符。其操作對象可以是整形和浮點型。
□
```swift
var i = 0
++i      // 現在 i = 1
```

每調用一次`++i`，`i`的值就會加1。實際上，`++i`是`i = i + 1`的簡寫，而`--i`是`i = i - 1`的簡寫。

`++`和`--`既是前置又是後置運算。`++i`，`i++`，`--i`和`i--`都是有效的寫法。

我們需要注意的是這些運算符修改了`i`後有一個返回值。如果你只想修改`i`的值，那你就可以忽略這個返回值。但如果你想使用返回值，你就需要留意前置和後置操作的返回值是不同的。

- 當`++`前置的時候，先自增再返回。

- 當`++`後置的時候，先返回再自增。

例如：

```swift
var a = 0
let b = ++a // a 和 b 現在都是 1
let c = a++ // a 現在 2, 但 c 是 a 自增前的值 1
```

上述例子，`let b = ++a`先把`a`加1了再返回`a`的值。所以`a`和`b`都是新值`1`。

而`let c = a++`，是先返回了`a`的值，然後`a`才加1。所以`c`得到了`a`的舊值1，而`a`加1後變成2。

除非你需要使用`i++`的特性，不然推薦你使用`++i`和`--i`，因為先修改後返回這樣的行為更符合我們的邏輯。


### 一元負號

數值的正負號可以使用前綴`-`（即一元負號）來切換：

```swift
let three = 3
let minusThree = -three       // minusThree 等於 -3
let plusThree = -minusThree   // plusThree 等於 3, 或 "負負3"
```

一元負號（`-`）寫在操作數之前，中間沒有空格。

### 一元正號

一元正號（`+`）不做任何改變地返回操作數的值。

```swift
let minusSix = -6
let alsoMinusSix = +minusSix  // alsoMinusSix 等於 -6
```
雖然一元`+`做無用功，但當你在使用一元負號來表達負數時，你可以使用一元正號來表達正數，如此你的代碼會具有對稱美。


<a name="compound_assignment_operators"></a>
## 復合賦值（Compound Assignment Operators）

如同強大的 C 語言，Swift 也提供把其他運算符和賦值運算（`=`）組合的復合賦值運算符，加賦運算（`+=`）是其中一個例子：

```swift
var a = 1
a += 2 // a 現在是 3
```

表達式`a += 2`是`a = a + 2`的簡寫，一個加賦運算就把加法和賦值兩件事完成了。

>注意：  
復合賦值運算沒有返回值，`let b = a += 2`這類代碼是錯誤。這不同於上面提到的自增和自減運算符。

在[表達式](../chapter3/04_Expressions.html)章節裡有復合運算符的完整列表。
□
<a name="comparison_operators"></a>
## 比較運算

所有標準 C 語言中的比較運算都可以在 Swift 中使用。

- 等於（`a == b`）
- 不等於（`a != b`）
- 大於（`a > b`）
- 小於（`a < b`）
- 大於等於（`a >= b`）
- 小於等於（`a <= b`）

> 注意：  
Swift 也提供恆等`===`和不恆等`!==`這兩個比較符來判斷兩個對象是否引用同一個對像實例。更多細節在[類與結構](09_Classes_and_Structures.html)。

每個比較運算都返回了一個標識表達式是否成立的布爾值：

```swift
1 == 1   // true, 因為 1 等於 1
2 != 1   // true, 因為 2 不等於 1
2 > 1    // true, 因為 2 大於 1
1 < 2    // true, 因為 1 小於2
1 >= 1   // true, 因為 1 大於等於 1
2 <= 1   // false, 因為 2 並不小於等於 1
```

比較運算多用於條件語句，如`if`條件：

```swift
let name = "world"
if name == "world" {
    println("hello, world")
} else {
    println("I'm sorry \(name), but I don't recognize you")
}
// 輸出 "hello, world", 因為 `name` 就是等於 "world"
```

關於`if`語句，請看[控制流](05_Control_Flow.html)。

<a name="ternary_conditional_operator"></a>
## 三元條件運算(Ternary Conditional Operator)

三元條件運算的特殊在於它是有三個操作數的運算符，它的原型是 `問題 ? 答案1 : 答案2`。它簡潔地表達根據`問題`成立與否作出二選一的操作。如果`問題`成立，返回`答案1`的結果; 如果不成立，返回`答案2`的結果。

使用三元條件運算簡化了以下代碼：

```swift
if question: {
  answer1
} else {
  answer2
}
```

這裡有個計算表格行高的例子。如果有表頭，那行高應比內容高度要高出50像素; 如果沒有表頭，只需高出20像素。

```swift
let contentHeight = 40
let hasHeader = true
let rowHeight = contentHeight + (hasHeader ? 50 : 20)
// rowHeight 現在是 90
```

這樣寫會比下面的代碼簡潔：

```swift
let contentHeight = 40
let hasHeader = true
var rowHeight = contentHeight
if hasHeader {
    rowHeight = rowHeight + 50
} else {
    rowHeight = rowHeight + 20
}
// rowHeight 現在是 90
```

第一段代碼例子使用了三元條件運算，所以一行代碼就能讓我們得到正確答案。這比第二段代碼簡潔得多，無需將`rowHeight`定義成變量，因為它的值無需在`if`語句中改變。

三元條件運算提供有效率且便捷的方式來表達二選一的選擇。需要注意的事，過度使用三元條件運算就會由簡潔的代碼變成難懂的代碼。我們應避免在一個組合語句使用多個三元條件運算符。

<a name="range_operators"></a>
## 區間運算符

Swift 提供了兩個方便表達一個區間的值的運算符。

### 閉區間運算符
閉區間運算符（`a...b`）定義一個包含從`a`到`b`(包括`a`和`b`)的所有值的區間。
□
閉區間運算符在迭代一個區間的所有值時是非常有用的，如在`for-in`循環中：

```swift
for index in 1...5 {
    println("\(index) * 5 = \(index * 5)")
}
// 1 * 5 = 5
// 2 * 5 = 10
// 3 * 5 = 15
// 4 * 5 = 20
// 5 * 5 = 25
```

關於`for-in`，請看[控制流](05_Control_Flow.html)。

### 半閉區間

半閉區間（`a..b`）定義一個從`a`到`b`但不包括`b`的區間。
之所以稱為半閉區間，是因為該區間包含第一個值而不包括最後的值。

半閉區間的實用性在於當你使用一個0始的列表(如數組)時，非常方便地從0數到列表的長度。

```swift
let names = ["Anna", "Alex", "Brian", "Jack"]
let count = names.count
for i in 0..count {
    println("第 \(i + 1) 個人叫 \(names[i])")
}
// 第 1 個人叫 Anna
// 第 2 個人叫 Alex
// 第 3 個人叫 Brian
// 第 4 個人叫 Jack
```

數組有4個元素，但`0..count`只數到3(最後一個元素的下標)，因為它是半閉區間。關於數組，請查閱[數組](04_Collection_Types.html#arrays)。

<a name="logical_operators"></a>
## 邏輯運算

邏輯運算的操作對象是邏輯布爾值。Swift 支持基於 C 語言的三個標準邏輯運算。

- 邏輯非（`!a`）
- 邏輯與（`a && b`）
- 邏輯或（`a || b`）

### 邏輯非

邏輯非運算（`!a`）對一個布爾值取反，使得`true`變`false`，`false`變`true`。

它是一個前置運算符，需出現在操作數之前，且不加空格。讀作`非 a`，然後我們看以下例子：

```swift
let allowedEntry = false
if !allowedEntry {
    println("ACCESS DENIED")
}
// 輸出 "ACCESS DENIED"
```

`if !allowedEntry`語句可以讀作 "如果 非 alowed entry。"，接下一行代碼只有在如果 "非 allow entry" 為`true`，即`allowEntry`為`false`時被執行。

在示例代碼中，小心地選擇布爾常量或變量有助於代碼的可讀性，並且避免使用雙重邏輯非運算，或混亂的邏輯語句。

### 邏輯與
邏輯與（`a && b`）表達了只有`a`和`b`的值都為`true`時，整個表達式的值才會是`true`。

只要任意一個值為`false`，整個表達式的值就為`false`。事實上，如果第一個值為`false`，那麼是不去計算第二個值的，因為它已經不可能影響整個表達式的結果了。這被稱做 "短路計算（short-circuit evaluation）"。

以下例子，只有兩個`Bool`值都為`true`值的時候才允許進入：

```swift
let enteredDoorCode = true
let passedRetinaScan = false
if enteredDoorCode && passedRetinaScan {
    println("Welcome!")
} else {
    println("ACCESS DENIED")
}
// 輸出 "ACCESS DENIED"
```

### 邏輯或
邏輯或（`a || b`）是一個由兩個連續的`|`組成的中置運算符。它表示了兩個邏輯表達式的其中一個為`true`，整個表達式就為`true`。

同邏輯與運算類似，邏輯或也是"短路計算"的，當左端的表達式為`true`時，將不計算右邊的表達式了，因為它不可能改變整個表達式的值了。

以下示例代碼中，第一個布爾值（`hasDoorKey`）為`false`，但第二個值（`knowsOverridePassword`）為`true`，所以整個表達是`true`，於是允許進入：

```swift
let hasDoorKey = false
let knowsOverridePassword = true
if hasDoorKey || knowsOverridePassword {
    println("Welcome!")
} else {
    println("ACCESS DENIED")
}
// 輸出 "Welcome!"
```

### 組合邏輯

我們可以組合多個邏輯運算來表達一個復合邏輯：

```swift
if enteredDoorCode && passedRetinaScan || hasDoorKey || knowsOverridePassword {
    println("Welcome!")
} else {
    println("ACCESS DENIED")
}
// 輸出 "Welcome!"
```

這個例子使用了含多個`&&`和`||`的復合邏輯。但無論怎樣，`&&`和`||`始終只能操作兩個值。所以這實際是三個簡單邏輯連續操作的結果。我們來解讀一下：

如果我們輸入了正確的密碼並通過了視網膜掃瞄; 或者我們有一把有效的鑰匙; 又或者我們知道緊急情況下重置的密碼，我們就能把門打開進入。

前兩種情況，我們都不滿足，所以前兩個簡單邏輯的結果是`false`，但是我們是知道緊急情況下重置的密碼的，所以整個複雜表達式的值還是`true`。

### 使用括號來明確優先級

為了一個複雜表達式更容易讀懂，在合適的地方使用括號來明確優先級是很有效的，雖然它並非必要的。在上個關於門的權限的例子中，我們給第一個部分加個括號，使用它看起來邏輯更明確：

```swift
if (enteredDoorCode && passedRetinaScan) || hasDoorKey || knowsOverridePassword {
    println("Welcome!")
} else {
    println("ACCESS DENIED")
}
// 輸出 "Welcome!"
```

這括號使得前兩個值被看成整個邏輯表達中獨立的一個部分。雖然有括號和沒括號的輸出結果是一樣的，但對於讀代碼的人來說有括號的代碼更清晰。可讀性比簡潔性更重要，請在可以讓你代碼變清晰地地方加個括號吧！
