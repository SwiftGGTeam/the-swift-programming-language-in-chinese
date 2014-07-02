> 翻譯：[lyuka](https://github.com/lyuka)  
> 校對：[numbbbbb](https://github.com/numbbbbb), [stanzhai](https://github.com/stanzhai)

# 類型（Types）
-----------------

本頁包含內容：

- [類型註解（Type Annotation）](#type_annotation)
- [類型標識符（Type Identifier）](#type_identifier)
- [元組類型（Tuple Type）](#tuple_type)
- [函數類型（Function Type）](#function_type)
- [數組類型（Array Type）](#array_type)
- [可選類型（Optional Type）](#optional_type)
- [隱式解析可選類型（Implicitly Unwrapped Optional Type）](#implicitly_unwrapped_optional_type)
- [協議合成類型（Protocol Composition Type）](#protocol_composition_type)
- [元類型（Metatype Type）](#metatype_type)
- [類型繼承子句（Type Inheritance Clause）](#type_inheritance_clause)
- [類型推斷（Type Inference）](#type_inference)

Swift 語言存在兩種類型：命名型類型和複合型類型。*命名型類型*是指定義時可以給定名字的類型。命名型類型包括類、結構體、枚舉和協議。比如，一個用戶定義的類`MyClass`的實例擁有類型`MyClass`。除了用戶定義的命名型類型，Swift 標準庫也定義了很多常用的命名型類型，包括那些表示數組、字典和可選值的類型。

那些通常被其它語言認為是基本或初級的數據型類型（Data types）——比如表示數字、字符和字符串——實際上就是命名型類型，Swift 標準庫是使用結構體定義和實現它們的。因為它們是命名型類型，因此你可以按照「擴展和擴展聲明」章節裡討論的那樣，聲明一個擴展來增加它們的行為以適應你程序的需求。

*複合型類型*是沒有名字的類型，它由 Swift 本身定義。Swift 存在兩種複合型類型：函數類型和元組類型。一個複合型類型可以包含命名型類型和其它複合型類型。例如，元組類型`(Int, (Int, Int))`包含兩個元素：第一個是命名型類型`Int`，第二個是另一個複合型類型`(Int, Int)`.

本節討論 Swift 語言本身定義的類型，並描述 Swift 中的類型推斷行為。

> 類型語法  
> *類型* → [*數組類型*](..\chapter3\03_Types.html#array_type) | [*函數類型*](..\chapter3\03_Types.html#function_type) | [*類型標識*](..\chapter3\03_Types.html#type_identifier) | [*元組類型*](..\chapter3\03_Types.html#tuple_type) | [*可選類型*](..\chapter3\03_Types.html#optional_type) | [*隱式解析可選類型*](..\chapter3\03_Types.html#implicitly_unwrapped_optional_type) | [*協議合成類型*](..\chapter3\03_Types.html#protocol_composition_type) | [*元型類型*](..\chapter3\03_Types.html#metatype_type)  

<a name="type_annotation"></a>
##類型註解

類型註解顯式地指定一個變量或表達式的值。類型註解始於冒號`:`終於類型，比如下面兩個例子：

```swift
let someTuple: (Double, Double) = (3.14159, 2.71828)
func someFunction(a: Int){ /* ... */ }
```
在第一個例子中，表達式`someTuple`的類型被指定為`(Double, Double)`。在第二個例子中，函數`someFunction`的參數`a`的類型被指定為`Int`。

類型註解可以在類型之前包含一個類型特性（type attributes）的可選列表。

> 類型註解語法  
> *類型註解* → **:** [*特性(Attributes)列表*](..\chapter3\06_Attributes.html#attributes) _可選_ [*類型*](..\chapter3\03_Types.html#type)  

<a name="type_identifier"></a>
##類型標識符

類型標識符引用命名型類型或者是命名型/複合型類型的別名。

大多數情況下，類型標識符引用的是同名的命名型類型。例如類型標識符`Int`引用命名型類型`Int`，同樣，類型標識符`Dictionary<String, Int>`引用命名型類型`Dictionary<String, Int>`。

在兩種情況下類型標識符引用的不是同名的類型。情況一，類型標識符引用的是命名型/複合型類型的類型別名。比如，在下面的例子中，類型標識符使用`Point`來引用元組`(Int, Int)`：

```swift
typealias Point = (Int, Int)
let origin: Point = (0, 0)
```

情況二，類型標識符使用dot(`.`)語法來表示在其它模塊（modules）或其它類型嵌套內聲明的命名型類型。例如，下面例子中的類型標識符引用在`ExampleModule`模塊中聲明的命名型類型`MyType`：

```swift
var someValue: ExampleModule.MyType
```

> 類型標識語法  
> *類型標識* → [*類型名稱*](..\chapter3\03_Types.html#type_name) [*泛型參數子句*](GenericParametersAndArguments.html#generic_argument_clause) _可選_ | [*類型名稱*](..\chapter3\03_Types.html#type_name) [*泛型參數子句*](GenericParametersAndArguments.html#generic_argument_clause) _可選_ **.** [*類型標識*](..\chapter3\03_Types.html#type_identifier)  
> *類名* → [*標識符*](LexicalStructure.html#identifier)  

<a name="tuple_type"></a>
##元組類型

元組類型使用逗號隔開並使用括號括起來的0個或多個類型組成的列表。

你可以使用元組類型作為一個函數的返回類型，這樣就可以使函數返回多個值。你也可以命名元組類型中的元素，然後用這些名字來引用每個元素的值。元素的名字由一個標識符和`:`組成。「函數和多返回值」章節裡有一個展示上述特性的例子。

`void`是空元組類型`()`的別名。如果括號內只有一個元素，那麼該類型就是括號內元素的類型。比如，`(Int)`的類型是`Int`而不是`(Int)`。所以，只有當元組類型包含兩個元素以上時才可以標記元組元素。

> 元組類型語法  
> *元組類型* → **(** [*元組類型主體*](..\chapter3\03_Types.html#tuple_type_body) _可選_ **)**  
> *元組類型主體* → [*元組類型的元素列表*](..\chapter3\03_Types.html#tuple_type_element_list) **...** _可選_  
> *元組類型的元素列表* → [*元組類型的元素*](..\chapter3\03_Types.html#tuple_type_element) | [*元組類型的元素*](..\chapter3\03_Types.html#tuple_type_element) **,** [*元組類型的元素列表*](..\chapter3\03_Types.html#tuple_type_element_list)  
> *元組類型的元素* → [*特性(Attributes)列表*](..\chapter3\06_Attributes.html#attributes) _可選_ **inout** _可選_ [*類型*](..\chapter3\03_Types.html#type) | **inout** _可選_ [*元素名*](..\chapter3\03_Types.html#element_name) [*類型註解*](..\chapter3\03_Types.html#type_annotation)  
> *元素名* → [*標識符*](LexicalStructure.html#identifier)  

<a name="function_type"></a>
##函數類型

函數類型表示一個函數、方法或閉包的類型，它由一個參數類型和返回值類型組成，中間用箭頭`->`隔開：

- `parameter type` -> `return type`

由於 *參數類型* 和 *返回值類型* 可以是元組類型，所以函數類型可以讓函數與方法支持多參數與多返回值。

你可以對函數類型應用帶有參數類型`()`並返回表達式類型的`auto_closure`屬性（見類型屬性章節）。一個自動閉包涵數捕獲特定表達式上的隱式閉包而非表達式本身。下面的例子使用`auto_closure`屬性來定義一個很簡單的assert函數：

```swift
func simpleAssert(condition: @auto_closure () -> Bool, message: String){
    if !condition(){
        println(message)
    }
}
let testNumber = 5
simpleAssert(testNumber % 2 == 0, "testNumber isn't an even number.")
// prints "testNumber isn't an even number."
```
函數類型可以擁有一個可變長參數作為參數類型中的最後一個參數。從語法角度上講，可變長參數由一個基礎類型名字和`...`組成，如`Int...`。可變長參數被認為是一個包含了基礎類型元素的數組。即`Int...`就是`Int[]`。關於使用可變長參數的例子，見章節「可變長參數」。

為了指定一個`in-out`參數，可以在參數類型前加`inout`前綴。但是你不可以對可變長參數或返回值類型使用`inout`。關於In-Out參數的討論見章節In-Out參數部分。

柯裡化函數（curried function）的類型相當於一個嵌套函數類型。例如，下面的柯裡化函數`addTwoNumber()()`的類型是`Int -> Int -> Int`：

```swift
func addTwoNumbers(a: Int)(b: Int) -> Int{
    return a + b
}
addTwoNumbers(4)(5)      // returns 9
```

柯裡化函數的函數類型從右向左組成一組。例如，函數類型`Int -> Int -> Int`可以被理解為`Int -> (Int -> Int)`——也就是說，一個函數傳入一個`Int`然後輸出作為另一個函數的輸入，然後又返回一個`Int`。例如，你可以使用如下嵌套函數來重寫柯裡化函數`addTwoNumbers()()`：

```swift
func addTwoNumbers(a: Int) -> (Int -> Int){
    func addTheSecondNumber(b: Int) -> Int{
        return a + b
    }
    return addTheSecondNumber
}
addTwoNumbers(4)(5)     // Returns 9
```

> 函數類型語法  
> *函數類型* → [*類型*](..\chapter3\03_Types.html#type) **->** [*類型*](..\chapter3\03_Types.html#type)  

<a name="array_type"></a>
##數組類型

Swift語言使用類型名緊接中括號`[]`來簡化標準庫中定義的命名型類型`Array<T>`。換句話說，下面兩個聲明是等價的：

```swift
let someArray: String[] = ["Alex", "Brian", "Dave"]
let someArray: Array<String> = ["Alex", "Brian", "Dave"]
```
上面兩種情況下，常量`someArray`都被聲明為字符串數組。數組的元素也可以通過`[]`獲取訪問：`someArray[0]`是指第0個元素`「Alex」`。

上面的例子同時顯示，你可以使用`[]`作為初始值構造數組，空的`[]`則用來來構造指定類型的空數組。

```swift
var emptyArray: Double[] = []
```
你也可以使用鏈接起來的多個`[]`集合來構造多維數組。例如，下例使用三個`[]`集合來構造三維整型數組：

```swift
var array3D: Int[][][] = [[[1, 2], [3, 4]], [[5, 6], [7, 8]]]
```
訪問一個多維數組的元素時，最左邊的下標指向最外層數組的相應位置元素。接下來往右的下標指向第一層嵌入的相應位置元素，依次類推。這就意味著，在上面的例子中，`array3D[0]`是指`[[1, 2], [3, 4]]`，`array3D[0][1]`是指`[3, 4]`，`array3D[0][1][1]`則是指值`4`。

關於Swift標準庫中`Array`類型的細節討論，見章節Arrays。

> 數組類型語法  
> *數組類型* → [*類型*](..\chapter3\03_Types.html#type) **[** **]** | [*數組類型*](..\chapter3\03_Types.html#array_type) **[** **]**  

<a name="optional_type"></a>
##可選類型

Swift定義後綴`?`來作為標準庫中的定義的命名型類型`Optional<T>`的簡寫。換句話說，下面兩個聲明是等價的：

```swift
var optionalInteger: Int?
var optionalInteger: Optional<Int>
```
在上述兩種情況下，變量`optionalInteger`都被聲明為可選整型類型。注意在類型和`?`之間沒有空格。

類型`Optional<T>`是一個枚舉，有兩種形式，`None`和`Some(T)`，又來代表可能出現或可能不出現的值。任意類型都可以被顯式的聲明（或隱式的轉換）為可選類型。當聲明一個可選類型時，確保使用括號給`?`提供合適的作用範圍。比如說，聲明一個整型的可選數組，應寫作`(Int[])?`，寫成`Int[]?`的話則會出錯。

如果你在聲明或定義可選變量或特性的時候沒有提供初始值，它的值則會自動賦成缺省值`nil`。

可選符合`LogicValue`協議，因此可以出現在布爾值環境下。此時，如果一個可選類型`T?`實例包含有類型為`T`的值（也就是說值為`Optional.Some(T)`），那麼此可選類型就為`true`，否則為`false`。

如果一個可選類型的實例包含一個值，那麼你就可以使用後綴操作符`!`來獲取該值，正如下面描述的：

```swift
optionalInteger = 42
optionalInteger!      // 42
```
使用`!`操作符獲取值為`nil`的可選項會導致運行錯誤（runtime error）。

你也可以使用可選鏈和可選綁定來選擇性的執行可選表達式上的操作。如果值為`nil`，不會執行任何操作因此也就沒有運行錯誤產生。

更多細節以及更多如何使用可選類型的例子，見章節「可選」。

> 可選類型語法  
> *可選類型* → [*類型*](..\chapter3\03_Types.html#type) **?**  

<a name="implicitly_unwrapped_optional_type"></a>
##隱式解析可選類型

Swift語言定義後綴`!`作為標準庫中命名類型`ImplicitlyUnwrappedOptional<T>`的簡寫。換句話說，下面兩個聲明等價：

```swift
var implicitlyUnwrappedString: String!
var implicitlyUnwrappedString: ImplicitlyUnwrappedOptional<String>
```
上述兩種情況下，變量`implicitlyUnwrappedString`被聲明為一個隱式解析可選類型的字符串。注意類型與`!`之間沒有空格。

你可以在使用可選的地方同樣使用隱式解析可選。比如，你可以將隱式解析可選的值賦給變量、常量和可選特性，反之亦然。

有了可選，你在聲明隱式解析可選變量或特性的時候就不用指定初始值，因為它有缺省值`nil`。

由於隱式解析可選的值會在使用時自動解析，所以沒必要使用操作符`!`來解析它。也就是說，如果你使用值為`nil`的隱式解析可選，就會導致運行錯誤。

使用可選鏈會選擇性的執行隱式解析可選表達式上的某一個操作。如果值為`nil`，就不會執行任何操作，因此也不會產生運行錯誤。

關於隱式解析可選的更多細節，見章節「隱式解析可選」。

> 隱式解析可選類型(Implicitly Unwrapped Optional Type)語法  
> *隱式解析可選類型* → [*類型*](..\chapter3\03_Types.html#type) **!**  

<a name="protocol_composition_type"></a>
##協議合成類型

協議合成類型是一種符合每個協議的指定協議列表類型。協議合成類型可能會用在類型註解和泛型參數中。

協議合成類型的形式如下：

```swift
protocol<Protocol 1, Procotol 2>
```

協議合成類型允許你指定一個值，其類型可以適配多個協議的條件，而且不需要定義一個新的命名型協議來繼承其它想要適配的各個協議。比如，協議合成類型`protocol<Protocol A, Protocol B, Protocol C>`等效於一個從`Protocol A`，`Protocol B`， `Protocol C`繼承而來的新協議`Protocol D`，很顯然這樣做有效率的多，甚至不需引入一個新名字。

協議合成列表中的每項必須是協議名或協議合成類型的類型別名。如果列表為空，它就會指定一個空協議合成列表，這樣每個類型都能適配。

> 協議合成類型語法  
> *協議合成類型* → **protocol** **<** [*協議標識符列表*](..\chapter3\03_Types.html#protocol_identifier_list) _可選_ **>**  
> *協議標識符列表* → [*協議標識符*](..\chapter3\03_Types.html#protocol_identifier) | [*協議標識符*](..\chapter3\03_Types.html#protocol_identifier) **,** [*協議標識符列表*](..\chapter3\03_Types.html#protocol_identifier_list)  
> *協議標識符* → [*類型標識*](..\chapter3\03_Types.html#type_identifier)  

<a name="metatype_type"></a>
##元類型

元類型是指所有類型的類型，包括類、結構體、枚舉和協議。

類、結構體或枚舉類型的元類型是相應的類型名緊跟`.Type`。協議類型的元類型——並不是運行時適配該協議的具體類型——是該協議名字緊跟`.Protocol`。比如，類`SomeClass`的元類型就是`SomeClass.Type`，協議`SomeProtocol`的元類型就是`SomeProtocal.Protocol`。

你可以使用後綴`self`表達式來獲取類型。比如，`SomeClass.self`返回`SomeClass`本身，而不是`SomeClass`的一個實例。同樣，`SomeProtocol.self`返回`SomeProtocol`本身，而不是運行時適配`SomeProtocol`的某個類型的實例。還可以對類型的實例使用`dynamicType`表達式來獲取該實例在運行階段的類型，如下所示：

```swift
class SomeBaseClass {
    class func printClassName() {
        println("SomeBaseClass")
    }
}
class SomeSubClass: SomeBaseClass {
    override class func printClassName() {
        println("SomeSubClass")
    }
}
let someInstance: SomeBaseClass = SomeSubClass()
// someInstance is of type SomeBaseClass at compile time, but
// someInstance is of type SomeSubClass at runtime
someInstance.dynamicType.printClassName()
// prints "SomeSubClass
```

> 元(Metatype)類型語法  
> *元類型* → [*類型*](..\chapter3\03_Types.html#type) **.** **Type** | [*類型*](..\chapter3\03_Types.html#type) **.** **Protocol**  x

<a name="type_inheritance_clause"></a>
##類型繼承子句

類型繼承子句被用來指定一個命名型類型繼承哪個類且適配哪些協議。類型繼承子句開始於冒號`:`，緊跟由`,`隔開的類型標識符列表。

類可以繼承單個超類，適配任意數量的協議。當定義一個類時，超類的名字必須出現在類型標識符列表首位，然後跟上該類需要適配的任意數量的協議。如果一個類不是從其它類繼承而來，那麼列表可以以協議開頭。關於類繼承更多的討論和例子，見章節「繼承」。

其它命名型類型可能只繼承或適配一個協議列表。協議類型可能繼承於其它任意數量的協議。當一個協議類型繼承於其它協議時，其它協議的條件集合會被集成在一起，然後其它從當前協議繼承的任意類型必須適配所有這些條件。

枚舉定義中的類型繼承子句可以是一個協議列表，或是指定原始值的枚舉，一個單獨的指定原始值類型的命名型類型。使用類型繼承子句來指定原始值類型的枚舉定義的例子，見章節「原始值」。

> 類型繼承子句語法  
> *類型繼承子句* → **:** [*類型繼承列表*](..\chapter3\03_Types.html#type_inheritance_list)  
> *類型繼承列表* → [*類型標識*](..\chapter3\03_Types.html#type_identifier) | [*類型標識*](..\chapter3\03_Types.html#type_identifier) **,** [*類型繼承列表*](..\chapter3\03_Types.html#type_inheritance_list)

<a name="type_inference"></a>
##類型推斷

Swift廣泛的使用類型推斷，從而允許你可以忽略很多變量和表達式的類型或部分類型。比如，對於`var x: Int = 0`，你可以完全忽略類型而簡寫成`var x = 0`——編譯器會正確的推斷出`x`的類型`Int`。類似的，當完整的類型可以從上下文推斷出來時，你也可以忽略類型的一部分。比如，如果你寫了`let dict: Dictionary = ["A": 1]`，編譯提也能推斷出`dict`的類型是`Dictionary<String, Int>`。

在上面的兩個例子中，類型信息從表達式樹（expression tree）的葉子節點傳向根節點。也就是說，`var x: Int = 0`中`x`的類型首先根據`0`的類型進行推斷，然後將該類型信息傳遞到根節點（變量`x`）。

在Swift中，類型信息也可以反方向流動——從根節點傳向葉子節點。在下面的例子中，常量`eFloat`上的顯式類型註解（`:Float`）導致數字字面量`2.71828`的類型是`Float`而非`Double`。

```swift
let e = 2.71828 // The type of e is inferred to be Double.
let eFloat: Float = 2.71828 // The type of eFloat is Float.
```

Swift中的類型推斷在單獨的表達式或語句水平上進行。這意味著所有用於推斷類型的信息必須可以從表達式或其某個子表達式的類型檢查中獲取。
