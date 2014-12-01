> 翻譯：[fd5788](https://github.com/fd5788)  
> 校對：[yankuangshi](https://github.com/yankuangshi), [stanzhai](https://github.com/stanzhai)

# 泛型參數
---------

本頁包含內容：

- [泛型形參子句](#generic_parameter)
- [泛型實參子句](#generic_argument)

本節涉及泛型類型、泛型函數以及泛型構造器的參數，包括形參和實參。聲明泛型類型、函數或構造器時，須指定相應的類型參數。類型參數相當於一個佔位符，當實例化泛型類型、調用泛型函數或泛型構造器時，就用具體的類型實參替代之。

關於 Swift 語言的泛型概述，見[泛型](../charpter2/22_Generics.md)(第二部分第22章)。

<a name="generic_parameter"></a>
## 泛型形參子句

泛型形參子句指定泛型類型或函數的類型形參，以及這些參數的關聯約束和要求。泛型形參子句用尖括號（<>）包住，並且有以下兩種形式：

> <`generic parameter list`>  
> <`generic parameter list` where `requirements`>

泛型形參列表中泛型形參用逗號分開，每一個採用以下形式：

> `type parameter` : `constrain`

泛型形參由兩部分組成：類型形參及其後的可選約束。類型形參只是佔位符類型（如T，U，V，KeyType，ValueType等）的名字而已。你可以在泛型類型、函數的其餘部分或者構造器聲明，以及函數或構造器的簽名中使用它。

約束用於指明該類型形參繼承自某個類或者遵守某個協議或協議的一部分。例如，在下面的泛型中，泛型形參`T: Comparable`表示任何用於替代類型形參`T`的類型實參必須滿足`Comparable`協議。

```swift
func simpleMin<T: COmparable>(x: T, y: T) -> T {
    if x < y {
        return y
    }
    return x
}
```

如，`Int`和`Double`均滿足`Comparable`協議，該函數接受任何一種類型。與泛型類型相反，調用泛型函數或構造器時不需要指定泛型實參子句。類型實參由傳遞給函數或構造器的實參推斷而出。

```swift
simpleMin(17, 42) // T is inferred to be Int
simpleMin(3.14159, 2.71828) // T is inferred to be Double
```

## Where 子句

要想對類型形參及其關聯類型指定額外要求，可以在泛型形參列表之後添加`where`子句。`where`子句由關鍵字`where`及其後的用逗號分割的多個要求組成。

`where`子句中的要求用於指明該類型形參繼承自某個類或遵守某個協議或協議的一部分。儘管`where`子句有助於表達類型形參上的簡單約束（如`T: Comparable`等同於`T where T: Comparable`，等等），但是依然可以用來對類型形參及其關聯約束提供更複雜的約束。如，`<T where T: C, T: P>`表示泛型類型`T`繼承自類`C`且遵守協議`P`。

如上所述，可以強制約束類型形參的關聯類型遵守某個協議。`<T: Generator where T.Element: Equatable>`表示`T`遵守`Generator`協議，而且`T`的關聯類型`T.Element`遵守`Eauatable`協議（`T`有關聯類型是因為`Generator`聲明了`Element`，而`T`遵守`Generator`協議）。

也可以用操作符`==`來指定兩個類型等效的要求。例如，有這樣一個約束：`T`和`U`遵守`Generator`協議，同時要求它們的關聯類型等同，可以這樣來表達：`<T: Generator, U: Generator where T.Element == U.Element>`。

當然，替代類型形參的類型實參必須滿足所有類型形參所要求的約束和要求。

泛型函數或構造器可以重載，但在泛型形參子句中的類型形參必須有不同的約束或要求，抑或二者皆不同。當調用重載的泛型函數或構造器時，編譯器會用這些約束來決定調用哪個重載函數或構造器。

泛型類可以生成一個子類，但是這個子類也必須是泛型類。

> 泛型形參子句語法  
> *泛型參數子句* → **<** [*泛型參數列表*](GenericParametersAndArguments.html#generic_parameter_list) [*約束子句*](GenericParametersAndArguments.html#requirement_clause) _可選_ **>**  
> *泛型參數列表* → [*泛形參數*](GenericParametersAndArguments.html#generic_parameter) | [*泛形參數*](GenericParametersAndArguments.html#generic_parameter) **,** [*泛型參數列表*](GenericParametersAndArguments.html#generic_parameter_list)  
> *泛形參數* → [*類型名稱*](..\chapter3\03_Types.html#type_name)  
> *泛形參數* → [*類型名稱*](..\chapter3\03_Types.html#type_name) **:** [*類型標識*](..\chapter3\03_Types.html#type_identifier)  
> *泛形參數* → [*類型名稱*](..\chapter3\03_Types.html#type_name) **:** [*協議合成類型*](..\chapter3\03_Types.html#protocol_composition_type)  
> *約束子句* → **where** [*約束列表*](GenericParametersAndArguments.html#requirement_list)  
> *約束列表* → [*約束*](GenericParametersAndArguments.html#requirement) | [*約束*](GenericParametersAndArguments.html#requirement) **,** [*約束列表*](GenericParametersAndArguments.html#requirement_list)  
> *約束* → [*一致性約束*](GenericParametersAndArguments.html#conformance_requirement) | [*同類型約束*](GenericParametersAndArguments.html#same_type_requirement)  
> *一致性約束* → [*類型標識*](..\chapter3\03_Types.html#type_identifier) **:** [*類型標識*](..\chapter3\03_Types.html#type_identifier)  
> *一致性約束* → [*類型標識*](..\chapter3\03_Types.html#type_identifier) **:** [*協議合成類型*](..\chapter3\03_Types.html#protocol_composition_type)  
> *同類型約束* → [*類型標識*](..\chapter3\03_Types.html#type_identifier) **==** [*類型標識*](..\chapter3\03_Types.html#type_identifier)  


<a name="generic_argument"></a>
## 泛型實參子句

泛型實參子句指定_泛型類型_的類型實參。泛型實參子句用尖括號（<>）包住，形式如下：

> <`generic argument list`>

泛型實參列表中類型實參有逗號分開。類型實參是實際具體類型的名字，用來替代泛型類型的泛型形參子句中的相應的類型形參。從而得到泛型類型的一個特化版本。如，Swift標準庫的泛型字典類型定義如下：

```swift
struct Dictionary<KeyTypel: Hashable, ValueType>: Collection, DictionaryLiteralConvertible {
    /* .. */
}
```

泛型`Dictionary`類型的特化版本，`Dictionary<String, Int>`就是用具體的`String`和`Int`類型替代泛型類型`KeyType: Hashable`和`ValueType`產生的。每一個類型實參必須滿足它所替代的泛型形參的所有約束，包括任何`where`子句所指定的額外的要求。上面的例子中，類型形參`KeyType`要求滿足`Hashable`協議，因此`String`也必須滿足`Hashable`協議。

可以用本身就是泛型類型的特化版本的類型實參替代類型形參（假設已滿足合適的約束和要求）。例如，為了生成一個元素類型是整型數組的數組，可以用數組的特化版本`Array<Int>`替代泛型類型`Array<T>`的類型形參`T`來實現。

```swift
let arrayOfArrays: Array<Array<Int>> = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
```

如[泛型形參子句](#generic_parameter)所述，不能用泛型實參子句來指定泛型函數或構造器的類型實參。

> 泛型實參子句語法  
> *(泛型參數子句Generic Argument Clause)* → **<** [*泛型參數列表*](GenericParametersAndArguments.html#generic_argument_list) **>**  
> *泛型參數列表* → [*泛型參數*](GenericParametersAndArguments.html#generic_argument) | [*泛型參數*](GenericParametersAndArguments.html#generic_argument) **,** [*泛型參數列表*](GenericParametersAndArguments.html#generic_argument_list)  
> *泛型參數* → [*類型*](..\chapter3\03_Types.html#type)  