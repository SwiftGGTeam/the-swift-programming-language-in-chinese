> 翻譯：[siemenliu](https://github.com/siemenliu)  
> 校對：[zq54zquan](https://github.com/zq54zquan)


# 下標腳本（Subscripts）
-----------------

本頁包含內容：

- [下標腳本語法](#subscript_syntax)
- [下標腳本用法](#subscript_usage)
- [下標腳本選項](#subscript_options)

*下標腳本* 可以定義在類（Class）、結構體（structure）和枚舉（enumeration）這些目標中，可以認為是訪問對像、集合或序列的快捷方式，不需要再調用實例的特定的賦值和訪問方法。舉例來說，用下標腳本訪問一個數組(Array)實例中的元素可以這樣寫 `someArray[index]` ，訪問字典(Dictionary)實例中的元素可以這樣寫 `someDictionary[key]`。

對於同一個目標可以定義多個下標腳本，通過索引值類型的不同來進行重載，而且索引值的個數可以是多個。

> 譯者：這裡附屬腳本重載在本小節中原文並沒有任何演示  

<a name="subscript_syntax"></a>
## 下標腳本語法

下標腳本允許你通過在實例後面的方括號中傳入一個或者多個的索引值來對實例進行訪問和賦值。語法類似於實例方法和計算型屬性的混合。與定義實例方法類似，定義下標腳本使用`subscript`關鍵字，顯式聲明入參（一個或多個）和返回類型。與實例方法不同的是下標腳本可以設定為讀寫或只讀。這種方式又有點像計算型屬性的getter和setter：

```swift
subscript(index: Int) -> Int {
    get {
      // 返回與入參匹配的Int類型的值
    }

    set(newValue) {
      // 執行賦值操作
    }
}
```

`newValue`的類型必須和下標腳本定義的返回類型相同。與計算型屬性相同的是set的入參聲明`newValue`就算不寫，在set代碼塊中依然可以使用默認的`newValue`這個變量來訪問新賦的值。

與只讀計算型屬性一樣，可以直接將原本應該寫在`get`代碼塊中的代碼寫在`subscript`中：

```swift
subscript(index: Int) -> Int {
    // 返回與入參匹配的Int類型的值
}
```

下面代碼演示了一個在`TimesTable`結構體中使用只讀下標腳本的用法，該結構體用來展示傳入整數的*n*倍。

```swift
struct TimesTable {
    let multiplier: Int
    subscript(index: Int) -> Int {
      return multiplier * index
    }
}
let threeTimesTable = TimesTable(multiplier: 3)
println("3的6倍是\(threeTimesTable[6])")
// 輸出 "3的6倍是18"
```

在上例中，通過`TimesTable`結構體創建了一個用來表示索引值三倍的實例。數值`3`作為結構體`構造函數`入參初始化實例成員`multiplier`。

你可以通過下標腳本來得到結果，比如`threeTimesTable[6]`。這條語句訪問了`threeTimesTable`的第六個元素，返回`6`的`3`倍即`18`。

>注意：  
> `TimesTable`例子是基於一個固定的數學公式。它並不適合開放寫權限來對`threeTimesTable[someIndex]`進行賦值操作，這也是為什麼附屬腳本只定義為只讀的原因。  

<a name="subscript_usage"></a>
## 下標腳本用法

根據使用場景不同下標腳本也具有不同的含義。通常下標腳本是用來訪問集合（collection），列表（list）或序列（sequence）中元素的快捷方式。你可以在你自己特定的類或結構體中自由的實現下標腳本來提供合適的功能。

例如，Swift 的字典（Dictionary）實現了通過下標腳本來對其實例中存放的值進行存取操作。在下標腳本中使用和字典索引相同類型的值，並且把一個字典值類型的值賦值給這個下標腳本來為字典設值：

```swift
var numberOfLegs = ["spider": 8, "ant": 6, "cat": 4]
numberOfLegs["bird"] = 2
```

上例定義一個名為`numberOfLegs`的變量並用一個字典字面量初始化出了包含三對鍵值的字典實例。`numberOfLegs`的字典存放值類型推斷為`Dictionary<String, Int>`。字典實例創建完成之後通過下標腳本的方式將整型值`2`賦值到字典實例的索引為`bird`的位置中。

更多關於字典（Dictionary）下標腳本的信息請參考[讀取和修改字典](../chapter2/04_Collection_Types.html)

> 注意：  
> Swift 中字典的附屬腳本實現中，在`get`部分返回值是`Int?`，上例中的`numberOfLegs`字典通過附屬腳本返回的是一個`Int?`或者說「可選的int」，不是每個字典的索引都能得到一個整型值，對於沒有設過值的索引的訪問返回的結果就是`nil`；同樣想要從字典實例中刪除某個索引下的值也只需要給這個索引賦值為`nil`即可。  

<a name="subscript_options"></a>
## 下標腳本選項

下標腳本允許任意數量的入參索引，並且每個入參類型也沒有限制。下標腳本的返回值也可以是任何類型。下標腳本可以使用變量參數和可變參數，但使用寫入讀出（in-out）參數或給參數設置默認值都是不允許的。

一個類或結構體可以根據自身需要提供多個下標腳本實現，在定義下標腳本時通過入參個類型進行區分，使用下標腳本時會自動匹配合適的下標腳本實現運行，這就是*下標腳本的重載*。

一個下標腳本入參是最常見的情況，但只要有合適的場景也可以定義多個下標腳本入參。如下例定義了一個`Matrix`結構體，將呈現一個`Double`類型的二維矩陣。`Matrix`結構體的下標腳本需要兩個整型參數：

```swift
struct Matrix {
    let rows: Int, columns: Int
    var grid: Double[]
    init(rows: Int, columns: Int) {
      self.rows = rows
      self.columns = columns
      grid = Array(count: rows * columns, repeatedValue: 0.0)
    }
    func indexIsValidForRow(row: Int, column: Int) -> Bool {
        return row >= 0 && row < rows && column >= 0 && column < columns
    }
    subscript(row: Int, column: Int) -> Double {
        get {
            assert(indexIsValidForRow(row, column: column), "Index out of range")
            return grid[(row * columns) + column]
        }
        set {
            assert(indexIsValidForRow(row, column: column), "Index out of range")
            grid[(row * columns) + columns] = newValue
        }
    }
}
```

`Matrix`提供了一個兩個入參的構造方法，入參分別是`rows`和`columns`，創建了一個足夠容納`rows * columns`個數的`Double`類型數組。為了存儲，將數組的大小和數組每個元素初始值0.0，都傳入數組的構造方法中來創建一個正確大小的新數組。關於數組的構造方法和析構方法請參考[創建並且構造一個數組](../chapter2/04_Collection_Types.html)。

你可以通過傳入合適的`row`和`column`的數量來構造一個新的`Matrix`實例：

```swift
var matrix = Matrix(rows: 2, columns: 2)
```

上例中創建了一個新的兩行兩列的`Matrix`實例。在閱讀順序從左上到右下的`Matrix`實例中的數組實例`grid`是矩陣二維數組的扁平化存儲：

```swift
// 示意圖
grid = [0.0, 0.0, 0.0, 0.0]

      col0  col1
row0   [0.0,     0.0,
row1    0.0,  0.0]
```

將值賦給帶有`row`和`column`下標腳本的`matrix`實例表達式可以完成賦值操作，下標腳本入參使用逗號分割

```swift
matrix[0, 1] = 1.5
matrix[1, 0] = 3.2
```

上面兩條語句分別`讓matrix`的右上值為 1.5，坐下值為 3.2：

```swift
[0.0, 1.5,
 3.2, 0.0]
```

`Matrix`下標腳本的`getter`和`setter`中同時調用了下標腳本入參的`row`和`column`是否有效的判斷。為了方便進行斷言，`Matrix`包含了一個名為`indexIsValid`的成員方法，用來確認入參的`row`或`column`值是否會造成數組越界：

```swift
func indexIsValidForRow(row: Int, column: Int) -> Bool {
    return row >= 0 && row < rows && column >= 0 && column < columns
}
```

斷言在下標腳本越界時觸發：

```swift
let someValue = matrix[2, 2]
// 斷言將會觸發，因為 [2, 2] 已經超過了matrix的最大長度
```
