> 翻譯：[honghaoz](https://github.com/honghaoz)  
> 校對：[numbbbbb](https://github.com/numbbbbb), [stanzhai](https://github.com/stanzhai)

# 模式（Patterns）
-----------------

本頁內容包括：

- [通配符模式（Wildcard Pattern）](#wildcard_pattern)
- [標識符模式（Identifier Pattern）](#identifier_pattern)
- [值綁定模式（Value-Binding Pattern）](#value-binding_pattern)
- [元組模式（Tuple Pattern）](#tuple_pattern)
- [枚舉用例模式（Enumeration Case Pattern）](#enumeration_case_pattern)
- [類型轉換模式（Type-Casting Patterns）](#type-casting_patterns)
- [表達式模式（Expression Pattern）](#expression_pattern)

模式（pattern）代表了單個值或者復合值的結構。例如，元組`(1, 2)`的結構是逗號分隔的，包含兩個元素的列表。因為模式代表一種值的結構，而不是特定的某個值，你可以把模式和各種同類型的值匹配起來。比如，`(x, y)`可以匹配元組`(1, 2)`，以及任何含兩個元素的元組。除了將模式與一個值匹配外，你可以從合成值中提取出部分或全部，然後分別把各個部分和一個常量或變量綁定起來。

在Swift中，模式出現在變量和常量的聲明（在它們的左側），`for-in`語句和`switch`語句（在它們的case標籤）中。儘管任何模式都可以出現在`switch`語句的case標籤中，但在其他情況下，只有通配符模式（wildcard pattern），標識符模式（identifier pattern）和包含這兩種模式的模式才能出現。

你可以為通配符模式（wildcard pattern），標識符模式（identifier pattern）和元組模式（tuple pattern）指定類型註釋，用來限制這種模式只匹配某種類型的值。

> 模式(Patterns) 語法  
> *模式* → [*通配符模式*](..\chapter3\07_Patterns.html#wildcard_pattern) [*類型註解*](..\chapter3\03_Types.html#type_annotation) _可選_  
> *模式* → [*標識符模式*](..\chapter3\07_Patterns.html#identifier_pattern) [*類型註解*](..\chapter3\03_Types.html#type_annotati(Value Binding)on) _可選_  
> *模式* → [*值綁定模式*](..\chapter3\07_Patterns.html#value_binding_pattern)  
> *模式* → [*元組模式*](..\chapter3\07_Patterns.html#tuple_pattern) [*類型註解*](..\chapter3\03_Types.html#type_annotation) _可選_  
> *模式* → [*enum-case-pattern*](..\chapter3\07_Patterns.html#enum_case_pattern)  
> *模式* → [*type-casting-pattern*](..\chapter3\07_Patterns.html#type_casting_pattern)  
> *模式* → [*表達式模式*](..\chapter3\07_Patterns.html#expression_pattern)  

<a name="wildcard_pattern"></a>
## 通配符模式（Wildcard Pattern）

通配符模式匹配並忽略任何值，包含一個下劃線（_）。當你不關心被匹配的值時，可以使用此模式。例如，下面這段代碼進行了`1...3`的循環，並忽略了每次循環的值：

```swift
for _ in 1...3 {
    // Do something three times.
}
```

> 通配符模式語法  
> *通配符模式* → **_**  

<a name="identifier_pattern"></a>
## 標識符模式（Identifier Pattern）

標識符模式匹配任何值，並將匹配的值和一個變量或常量綁定起來。例如，在下面的常量申明中，`someValue`是一個標識符模式，匹配了類型是`Int`的`42`。

```swift
let someValue = 42
```

當匹配成功時，`42`被綁定（賦值）給常量`someValue`。

當一個變量或常量申明的左邊是標識符模式時，此時，標識符模式是隱式的值綁定模式（value-binding pattern）。

> 標識符模式語法  
> *標識符模式* → [*標識符*](LexicalStructure.html#identifier)  

<a name="value-binding_pattern"></a>
## 值綁定模式（Value-Binding Pattern）

值綁定模式綁定匹配的值到一個變量或常量。當綁定匹配值給常量時，用關鍵字`let`,綁定給變量時，用關鍵字`var`。

標識符模式包含在值綁定模式中，綁定新的變量或常量到匹配的值。例如，你可以分解一個元組的元素，並把每個元素綁定到相應的標識符模式中。

```swift
let point = (3, 2)
switch point {
    // Bind x and y to the elements of point.
case let (x, y):
    println("The point is at (\(x), \(y)).")
}
// prints "The point is at (3, 2).」
```

在上面這個例子中，`let`將元組模式`(x, y)`分配到各個標識符模式。因為這種行為，`switch`語句中`case let (x, y):`和`case (let x, let y):`匹配的值是一樣的。

> 值綁定(Value Binding)模式語法  
> *值綁定模式* → **var** [*模式*](..\chapter3\07_Patterns.html#pattern) | **let** [*模式*](..\chapter3\07_Patterns.html#pattern)  

<a name="tuple_pattern"></a>
## 元組模式（Tuple Pattern）

元組模式是逗號分隔的列表，包含一個或多個模式，並包含在一對圓括號中。元組模式匹配相應元組類型的值。

你可以使用類型註釋來限制一個元組模式來匹配某種元組類型。例如，在常量申明`let (x, y): (Int, Int) = (1, 2)`中的元組模式`(x, y): (Int, Int)`，只匹配兩個元素都是`Int`這種類型的元組。如果僅需要限制一個元組模式中的某幾個元素，只需要直接對這幾個元素提供類型註釋即可。例如，在`let (x: String, y)`中的元組模式，只要某個元組類型是包含兩個元素，且第一個元素類型是`String`，則被匹配。

當元組模式被用在`for-in`語句或者變量或常量申明時，它可以包含通配符模式，標識符模式或者其他包含這兩種模式的模式。例如，下面這段代碼是不正確的，因為`(x, 0)`中的元素`0`是一個表達式模式：

```swift
let points = [(0, 0), (1, 0), (1, 1), (2, 0), (2, 1)]
// This code isn't valid.
for (x, 0) in points {
    /* ... */
}
```

對於只包含一個元素的元組，括號是不起作用的。模式匹配那個單個元素的類型。例如，下面是等效的：

```swift
let a = 2        // a: Int = 2
let (a) = 2      // a: Int = 2
let (a): Int = 2 // a: Int = 2
```

> 元組模式語法  
> *元組模式* → **(** [*元組模式元素列表*](..\chapter3\07_Patterns.html#tuple_pattern_element_list) _可選_ **)**  
> *元組模式元素列表* → [*元組模式元素*](..\chapter3\07_Patterns.html#tuple_pattern_element) | [*元組模式元素*](..\chapter3\07_Patterns.html#tuple_pattern_element) **,** [*元組模式元素列表*](..\chapter3\07_Patterns.html#tuple_pattern_element_list)  
> *元組模式元素* → [*模式*](..\chapter3\07_Patterns.html#pattern)  

<a name="enumeration_case_pattern"></a>
## 枚舉用例模式（Enumeration Case Pattern）

枚舉用例模式匹配現有的枚舉類型的某種用例。枚舉用例模式僅在`switch`語句中的`case`標籤中出現。

如果你準備匹配的枚舉用例有任何關聯的值，則相應的枚舉用例模式必須指定一個包含每個關聯值元素的元組模式。關於使用`switch`語句來匹配包含關聯值枚舉用例的例子，請參閱`Associated Values`.

> 枚舉用例模式語法  
> *enum-case-pattern* → [*類型標識*](..\chapter3\03_Types.html#type_identifier) _可選_ **.** [*枚舉的case名*](..\chapter3\05_Declarations.html#enum_case_name) [*元組模式*](..\chapter3\07_Patterns.html#tuple_pattern) _可選_  

<a name="type-casting_patterns"></a>
## 類型轉換模式（Type-Casting Patterns）

有兩種類型轉換模式，`is`模式和`as`模式。這兩種模式均只出現在`switch`語句中的`case`標籤中。`is`模式和`as`模式有以下形式：

> is `type`  
> `pattern` as `type`

`is`模式匹配一個值，如果這個值的類型在運行時（runtime）和`is`模式右邊的指定類型（或者那個類型的子類）是一致的。`is`模式和`is`操作符一樣，它們都進行類型轉換，但是拋棄了返回的類型。

`as`模式匹配一個值，如果這個值的類型在運行時（runtime）和`as`模式右邊的指定類型（或者那個類型的子類）是一致的。一旦匹配成功，匹配的值的類型被轉換成`as`模式左邊指定的模式。

關於使用`switch`語句來匹配`is`模式和`as`模式值的例子，請參閱`Type Casting for Any and AnyObject`。

> 類型轉換模式語法  
> *type-casting-pattern* → [*is模式*](..\chapter3\07_Patterns.html#is_pattern) | [*as模式*](..\chapter3\07_Patterns.html#as_pattern)  
> *is模式* → **is** [*類型*](..\chapter3\03_Types.html#type)  
> *as模式* → [*模式*](..\chapter3\07_Patterns.html#pattern) **as** [*類型*](..\chapter3\03_Types.html#type)  

<a name="expression_pattern"></a>
## 表達式模式（Expression Pattern）

表達式模式代表了一個表達式的值。這個模式只出現在`switch`語句中的`case`標籤中。

由表達式模式所代表的表達式用Swift標準庫中的`~=`操作符與輸入表達式的值進行比較。如果`~=`操作符返回`true`，則匹配成功。默認情況下，`~=`操作符使用`==`操作符來比較兩個相同類型的值。它也可以匹配一個整數值與一個`Range`對像中的整數範圍，正如下面這個例子所示：

```swift
let point = (1, 2)
switch point {
case (0, 0):
    println("(0, 0) is at the origin.")
case (-2...2, -2...2):
    println("(\(point.0), \(point.1)) is near the origin.")
default:
    println("The point is at (\(point.0), \(point.1)).")
}
// prints "(1, 2) is near the origin.」
```

你可以重載`~=`操作符來提供自定義的表達式行為。例如，你可以重寫上面的例子，以實現用字符串表達的點來比較`point`表達式。

```swift
// Overload the ~= operator to match a string with an integer
func ~=(pattern: String, value: Int) -> Bool {
    return pattern == "\(value)"
}
switch point {
case ("0", "0"):
    println("(0, 0) is at the origin.")
case ("-2...2", "-2...2"):
    println("(\(point.0), \(point.1)) is near the origin.")
default:
    println("The point is at (\(point.0), \(point.1)).")
}
// prints "(1, 2) is near the origin.」
```

> 表達式模式語法  
> *表達式模式* → [*表達式*](..\chapter3\04_Expressions.html#expression)  