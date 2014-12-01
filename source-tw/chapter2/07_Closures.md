> 翻譯：[wh1100717](https://github.com/wh1100717)  
> 校對：[lyuka](https://github.com/lyuka)

# 閉包（Closures）
-----------------

本頁包含內容：

- [閉包表達式（Closure Expressions）](#closure_expressions)
- [尾隨閉包（Trailing Closures）](#trailing_closures)
- [值捕獲（Capturing Values）](#capturing_values)
- [閉包是引用類型（Closures Are Reference Types）](#closures_are_reference_types)

閉包是自包含的函數代碼塊，可以在代碼中被傳遞和使用。
Swift 中的閉包與 C 和 Objective-C 中的代碼塊（blocks）以及其他一些編程語言中的 lambdas 函數比較相似。

閉包可以捕獲和存儲其所在上下文中任意常量和變量的引用。
這就是所謂的閉合併包裹著這些常量和變量，俗稱閉包。Swift 會為您管理在捕獲過程中涉及到的所有內存操作。

> 注意：  
> 如果您不熟悉捕獲（capturing）這個概念也不用擔心，您可以在 [值捕獲](#capturing_values) 章節對其進行詳細瞭解。  

在[函數](../chapter2/06_Functions.html) 章節中介紹的全局和嵌套函數實際上也是特殊的閉包，閉包採取如下三種形式之一：

* 全局函數是一個有名字但不會捕獲任何值的閉包
* 嵌套函數是一個有名字並可以捕獲其封閉函數域內值的閉包
* 閉包表達式是一個利用輕量級語法所寫的可以捕獲其上下文中變量或常量值的匿名閉包

Swift 的閉包表達式擁有簡潔的風格，並鼓勵在常見場景中進行語法優化，主要優化如下：

* 利用上下文推斷參數和返回值類型
* 隱式返回單表達式閉包，即單表達式閉包可以省略`return`關鍵字
* 參數名稱縮寫
* 尾隨（Trailing）閉包語法

<a name="closure_expressions"></a>
## 閉包表達式（Closure Expressions）


[嵌套函數](../chapter2/06_Functions.html#nested_function) 是一個在較複雜函數中方便進行命名和定義自包含代碼模塊的方式。當然，有時候撰寫小巧的沒有完整定義和命名的類函數結構也是很有用處的，尤其是在您處理一些函數並需要將另外一些函數作為該函數的參數時。

閉包表達式是一種利用簡潔語法構建內聯閉包的方式。
閉包表達式提供了一些語法優化，使得撰寫閉包變得簡單明瞭。
下面閉包表達式的例子通過使用幾次迭代展示了`sort`函數定義和語法優化的方式。
每一次迭代都用更簡潔的方式描述了相同的功能。

<a name="the_sort_function"></a>
### sort 函數（The Sort Function）

Swift 標準庫提供了`sort`函數，會根據您提供的基於輸出類型排序的閉包涵數將已知類型數組中的值進行排序。
一旦排序完成，函數會返回一個與原數組大小相同的新數組，該數組中包含已經正確排序的同類型元素。

下面的閉包表達式示例使用`sort`函數對一個`String`類型的數組進行字母逆序排序，以下是初始數組值：

```swift
let names = ["Chris", "Alex", "Ewa", "Barry", "Daniella"]
```

`sort`函數需要傳入兩個參數：

* 已知類型的數組
* 閉包涵數，該閉包涵數需要傳入與數組類型相同的兩個值，並返回一個布爾類型值來告訴`sort`函數當排序結束後傳入的第一個參數排在第二個參數前面還是後面。如果第一個參數值出現在第二個參數值前面，排序閉包涵數需要返回`true`，反之返回`false`。

該例子對一個`String`類型的數組進行排序，因此排序閉包涵數類型需為`(String, String) -> Bool`。

提供排序閉包涵數的一種方式是撰寫一個符合其類型要求的普通函數，並將其作為`sort`函數的第二個參數傳入：

```swift
func backwards(s1: String, s2: String) -> Bool {
    return s1 > s2
}
var reversed = sort(names, backwards)
// reversed 為 ["Ewa", "Daniella", "Chris", "Barry", "Alex"]
```

如果第一個字符串 (`s1`) 大於第二個字符串 (`s2`)，`backwards`函數返回`true`，表示在新的數組中`s1`應該出現在`s2`前。
對於字符串中的字符來說，「大於」 表示 「按照字母順序較晚出現」。
這意味著字母`"B"`大於字母`"A"`，字符串`"Tom"`大於字符串`"Tim"`。
其將進行字母逆序排序，`"Barry"`將會排在`"Alex"`之後。

然而，這是一個相當冗長的方式，本質上只是寫了一個單表達式函數 (a > b)。
在下面的例子中，利用閉合表達式語法可以更好的構造一個內聯排序閉包。

<a name="closure_expression_syntax"></a>
### 閉包表達式語法（Closure Expression Syntax）

閉包表達式語法有如下一般形式：

```swift
{ (parameters) -> returnType in
    statements
}
```

閉包表達式語法可以使用常量、變量和`inout`類型作為參數，不提供默認值。
也可以在參數列表的最後使用可變參數。
元組也可以作為參數和返回值。

下面的例子展示了之前`backwards`函數對應的閉包表達式版本的代碼：

```swift
reversed = sort(names, { (s1: String, s2: String) -> Bool in
    return s1 > s2
})
```

需要注意的是內聯閉包參數和返回值類型聲明與`backwards`函數類型聲明相同。
在這兩種方式中，都寫成了`(s1: String, s2: String) -> Bool`。
然而在內聯閉包表達式中，函數和返回值類型都寫在大括號內，而不是大括號外。

閉包的函數體部分由關鍵字`in`引入。
該關鍵字表示閉包的參數和返回值類型定義已經完成，閉包涵數體即將開始。

因為這個閉包的函數體部分如此短以至於可以將其改寫成一行代碼：

```swift
reversed = sort(names, { (s1: String, s2: String) -> Bool in return s1 > s2 } )
```

這說明`sort`函數的整體調用保持不變，一對圓括號仍然包裹住了函數中整個參數集合。而其中一個參數現在變成了內聯閉包（相比於`backwards`版本的代碼）。

<a name="inferring_type_from_context"></a>
### 根據上下文推斷類型（Inferring Type From Context）

因為排序閉包涵數是作為`sort`函數的參數進行傳入的，Swift可以推斷其參數和返回值的類型。
`sort`期望第二個參數是類型為`(String, String) -> Bool`的函數，因此實際上`String`,`String`和`Bool`類型並不需要作為閉包表達式定義中的一部分。
因為所有的類型都可以被正確推斷，返回箭頭 (`->`) 和圍繞在參數周圍的括號也可以被省略：

```swift
reversed = sort(names, { s1, s2 in return s1 > s2 } )
```

實際上任何情況下，通過內聯閉包表達式構造的閉包作為參數傳遞給函數時，都可以推斷出閉包的參數和返回值類型，這意味著您幾乎不需要利用完整格式構造任何內聯閉包。

<a name="implicit_returns_from_single_expression_closures"></a>
### 單表達式閉包隱式返回（Implicit Return From Single-Expression Clossures）

單行表達式閉包可以通過隱藏`return`關鍵字來隱式返回單行表達式的結果，如上版本的例子可以改寫為：

```swift
reversed = sort(names, { s1, s2 in s1 > s2 } )
```

在這個例子中，`sort`函數的第二個參數函數類型明確了閉包必須返回一個`Bool`類型值。
因為閉包涵數體只包含了一個單一表達式 (`s1 > s2`)，該表達式返回`Bool`類型值，因此這裡沒有歧義，`return`關鍵字可以省略。

<a name="shorthand_argument_names"></a>
### 參數名稱縮寫（Shorthand Argument Names）

Swift 自動為內聯函數提供了參數名稱縮寫功能，您可以直接通過`$0`,`$1`,`$2`來順序調用閉包的參數。

如果您在閉包表達式中使用參數名稱縮寫，您可以在閉包參數列表中省略對其的定義，並且對應參數名稱縮寫的類型會通過函數類型進行推斷。
`in`關鍵字也同樣可以被省略，因為此時閉包表達式完全由閉包涵數體構成：

```swift
reversed = sort(names, { $0 > $1 } )
```

在這個例子中，`$0`和`$1`表示閉包中第一個和第二個`String`類型的參數。

<a name="operator_functions"></a>
### 運算符函數（Operator Functions）

實際上還有一種更簡短的方式來撰寫上面例子中的閉包表達式。
Swift 的`String`類型定義了關於大於號 (`>`) 的字符串實現，其作為一個函數接受兩個`String`類型的參數並返回`Bool`類型的值。
而這正好與`sort`函數的第二個參數需要的函數類型相符合。
因此，您可以簡單地傳遞一個大於號，Swift可以自動推斷出您想使用大於號的字符串函數實現：

```swift
reversed = sort(names, >)
```

更多關於運算符表達式的內容請查看 [運算符函數](../chapter2/23_Advanced_Operators.html#operator_functions)。

<a name="trailing_closures"></a>
## 尾隨閉包（Trailing Closures）


如果您需要將一個很長的閉包表達式作為最後一個參數傳遞給函數，可以使用尾隨閉包來增強函數的可讀性。
尾隨閉包是一個書寫在函數括號之後的閉包表達式，函數支持將其作為最後一個參數調用。

```swift
func someFunctionThatTakesAClosure(closure: () -> ()) {
    // 函數體部分
}

// 以下是不使用尾隨閉包進行函數調用
someFunctionThatTakesAClosure({
    // 閉包主體部分
})

// 以下是使用尾隨閉包進行函數調用
someFunctionThatTakesAClosure() {
  // 閉包主體部分
}
```

> 注意：  
> 如果函數只需要閉包表達式一個參數，當您使用尾隨閉包時，您甚至可以把`()`省略掉。  

在上例中作為`sort`函數參數的字符串排序閉包可以改寫為：

```swift
reversed = sort(names) { $0 > $1 }
```

當閉包非常長以至於不能在一行中進行書寫時，尾隨閉包變得非常有用。
舉例來說，Swift 的`Array`類型有一個`map`方法，其獲取一個閉包表達式作為其唯一參數。
數組中的每一個元素調用一次該閉包涵數，並返回該元素所映射的值(也可以是不同類型的值)。
具體的映射方式和返回值類型由閉包來指定。

當提供給數組閉包涵數後，`map`方法將返回一個新的數組，數組中包含了與原數組一一對應的映射後的值。

下例介紹了如何在`map`方法中使用尾隨閉包將`Int`類型數組`[16,58,510]`轉換為包含對應`String`類型的數組`["OneSix", "FiveEight", "FiveOneZero"]`:

```swift
let digitNames = [
    0: "Zero", 1: "One", 2: "Two",   3: "Three", 4: "Four",
    5: "Five", 6: "Six", 7: "Seven", 8: "Eight", 9: "Nine"
]
let numbers = [16, 58, 510]
```

如上代碼創建了一個數字位和它們名字映射的英文版本字典。
同時定義了一個準備轉換為字符串的整型數組。

您現在可以通過傳遞一個尾隨閉包給`numbers`的`map`方法來創建對應的字符串版本數組。
需要注意的時調用`numbers.map`不需要在`map`後面包含任何括號，因為其只需要傳遞閉包表達式這一個參數，並且該閉包表達式參數通過尾隨方式進行撰寫：

```swift
let strings = numbers.map {
    (var number) -> String in
    var output = ""
    while number > 0 {
        output = digitNames[number % 10]! + output
        number /= 10
    }
    return output
}
// strings 常量被推斷為字符串類型數組，即 String[]
// 其值為 ["OneSix", "FiveEight", "FiveOneZero"]
```

`map`在數組中為每一個元素調用了閉包表達式。
您不需要指定閉包的輸入參數`number`的類型，因為可以通過要映射的數組類型進行推斷。

閉包`number`參數被聲明為一個變量參數（變量的具體描述請參看[常量參數和變量參數](../chapter2/06_Functions.html#constant_and_variable_parameters)），因此可以在閉包涵數體內對其進行修改。閉包表達式制定了返回類型為`String`，以表明存儲映射值的新數組類型為`String`。

閉包表達式在每次被調用的時候創建了一個字符串並返回。
其使用求余運算符 (number % 10) 計算最後一位數字並利用`digitNames`字典獲取所映射的字符串。

> 注意：  
> 字典`digitNames`下標後跟著一個歎號 (!)，因為字典下標返回一個可選值 (optional value)，表明即使該 key 不存在也不會查找失敗。  
> 在上例中，它保證了`number % 10`可以總是作為一個`digitNames`字典的有效下標 key。  
> 因此歎號可以用於強制解析 (force-unwrap) 存儲在可選下標項中的`String`類型值。  

從`digitNames`字典中獲取的字符串被添加到輸出的前部，逆序建立了一個字符串版本的數字。
（在表達式`number % 10`中，如果number為16，則返回6，58返回8，510返回0）。

`number`變量之後除以10。
因為其是整數，在計算過程中未除盡部分被忽略。
因此 16變成了1，58變成了5，510變成了51。

整個過程重複進行，直到`number /= 10`為0，這時閉包會將字符串輸出，而`map`函數則會將字符串添加到所映射的數組中。

上例中尾隨閉包語法在函數後整潔封裝了具體的閉包功能，而不再需要將整個閉包包裹在`map`函數的括號內。

<a name="capturing_values"></a>
## 捕獲值（Capturing Values）


閉包可以在其定義的上下文中捕獲常量或變量。
即使定義這些常量和變量的原域已經不存在，閉包仍然可以在閉包涵數體內引用和修改這些值。

Swift最簡單的閉包形式是嵌套函數，也就是定義在其他函數的函數體內的函數。
嵌套函數可以捕獲其外部函數所有的參數以及定義的常量和變量。

下例為一個叫做`makeIncrementor`的函數，其包含了一個叫做`incrementor`嵌套函數。
嵌套函數`incrementor`從上下文中捕獲了兩個值，`runningTotal`和`amount`。
之後`makeIncrementor`將`incrementor`作為閉包返回。
每次調用`incrementor`時，其會以`amount`作為增量增加`runningTotal`的值。

```swift
func makeIncrementor(forIncrement amount: Int) -> () -> Int {
    var runningTotal = 0
    func incrementor() -> Int {
        runningTotal += amount
        return runningTotal
    }
    return incrementor
}
```

`makeIncrementor`返回類型為`() -> Int`。
這意味著其返回的是一個函數，而不是一個簡單類型值。
該函數在每次調用時不接受參數只返回一個`Int`類型的值。
關於函數返回其他函數的內容，請查看[函數類型作為返回類型](../chapter2/06_Functions.html#function_types_as_return_types)。

`makeIncrementor`函數定義了一個整型變量`runningTotal`(初始為0) 用來存儲當前跑步總數。
該值通過`incrementor`返回。

`makeIncrementor`有一個`Int`類型的參數，其外部命名為`forIncrement`， 內部命名為`amount`，表示每次`incrementor`被調用時`runningTotal`將要增加的量。

`incrementor`函數用來執行實際的增加操作。
該函數簡單地使`runningTotal`增加`amount`，並將其返回。

如果我們單獨看這個函數，會發現看上去不同尋常：

```swift
func incrementor() -> Int {
    runningTotal += amount
    return runningTotal
}
```

`incrementor`函數並沒有獲取任何參數，但是在函數體內訪問了`runningTotal`和`amount`變量。這是因為其通過捕獲在包含它的函數體內已經存在的`runningTotal`和`amount`變量而實現。

由於沒有修改`amount`變量，`incrementor`實際上捕獲並存儲了該變量的一個副本，而該副本隨著`incrementor`一同被存儲。

然而，因為每次調用該函數的時候都會修改`runningTotal`的值，`incrementor`捕獲了當前`runningTotal`變量的引用，而不是僅僅複製該變量的初始值。捕獲一個引用保證了當`makeIncrementor`結束時候並不會消失，也保證了當下一次執行`incrementor`函數時，`runningTotal`可以繼續增加。

> 注意：  
> Swift 會決定捕獲引用還是拷貝值。  
> 您不需要標注`amount`或者`runningTotal`來聲明在嵌入的`incrementor`函數中的使用方式。  
> Swift 同時也處理`runingTotal`變量的內存管理操作，如果不再被`incrementor`函數使用，則會被清除。  

下面代碼為一個使用`makeIncrementor`的例子：

```swift
let incrementByTen = makeIncrementor(forIncrement: 10)
```

該例子定義了一個叫做`incrementByTen`的常量，該常量指向一個每次調用會加10的`incrementor`函數。
調用這個函數多次可以得到以下結果：

```swift
incrementByTen()
// 返回的值為10
incrementByTen()
// 返回的值為20
incrementByTen()
// 返回的值為30
```

如果您創建了另一個`incrementor`，其會有一個屬於自己的獨立的`runningTotal`變量的引用。
下面的例子中，`incrementBySevne`捕獲了一個新的`runningTotal`變量，該變量和`incrementByTen`中捕獲的變量沒有任何聯繫：

```swift
let incrementBySeven = makeIncrementor(forIncrement: 7)
incrementBySeven()
// 返回的值為7
incrementByTen()
// 返回的值為40
```

> 注意：  
> 如果您將閉包賦值給一個類實例的屬性，並且該閉包通過指向該實例或其成員來捕獲了該實例，您將創建一個在閉包和實例間的強引用環。  
> Swift 使用捕獲列表來打破這種強引用環。更多信息，請參考 [閉包引起的循環強引用](../chapter2/16_Automatic_Reference_Counting.html#strong_reference_cycles_for_closures)。  

<a name="closures_are_reference_types"></a>
## 閉包是引用類型（Closures Are Reference Types）

上面的例子中，`incrementBySeven`和`incrementByTen`是常量，但是這些常量指向的閉包仍然可以增加其捕獲的變量值。
這是因為函數和閉包都是引用類型。

無論您將函數/閉包賦值給一個常量還是變量，您實際上都是將常量/變量的值設置為對應函數/閉包的引用。
上面的例子中，`incrementByTen`指向閉包的引用是一個常量，而並非閉包內容本身。

這也意味著如果您將閉包賦值給了兩個不同的常量/變量，兩個值都會指向同一個閉包：

```swift
let alsoIncrementByTen = incrementByTen
alsoIncrementByTen()
// 返回的值為50
```
