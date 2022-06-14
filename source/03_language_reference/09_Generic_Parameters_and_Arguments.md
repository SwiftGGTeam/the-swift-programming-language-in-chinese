# 泛型参数（Generic Parameters and Arguments）

本节涉及泛型类型、泛型函数以及泛型构造器的参数，包括形参和实参。声明泛型类型、函数或构造器时，须指定相应的类型参数。类型参数相当于一个占位符，当实例化泛型类型、调用泛型函数或泛型构造器时，就用具体的类型实参替代之。

关于 Swift 语言的泛型概述，请参阅 [泛型](../02_language_guide/22_Generics.md)。

## 泛型形参子句 {#generic-parameter}
*泛型形参子句*指定泛型类型或函数的类型形参，以及这些参数相关的约束和要求。泛型形参子句用尖括号（`<>`）包住，形式如下：

> <`泛型形参列表`>
> 

泛型形参列表中泛型形参用逗号分开，其中每一个采用以下形式：

> `类型形参` : `约束`
> 

泛型形参由两部分组成：类型形参及其后的可选约束。类型形参只是占位符类型（如 `T`，`U`，`V`，`Key`，`Value` 等）的名字而已。你可以在泛型类型、函数的其余部分或者构造器声明，包括函数或构造器的签名中使用它（以及它的关联类型）。

约束用于指明该类型形参继承自某个类或者符合某个协议或协议组合。例如，在下面的泛型函数中，泛型形参 `T: Comparable` 表示任何用于替代类型形参 `T` 的类型实参必须满足 `Comparable` 协议。

```swift
func simpleMax<T: Comparable>(_ x: T, _ y: T) -> T {
    if x < y {
        return y
    }
    return x
}
```

例如，因为 `Int` 和 `Double` 均满足 `Comparable` 协议，所以该函数可以接受这两种类型。与泛型类型相反，调用泛型函数或构造器时不需要指定泛型实参子句。类型实参由传递给函数或构造器的实参推断而出。

```swift
simpleMax(17, 42) // T 被推断为 Int 类型
simpleMax(3.14159, 2.71828) // T 被推断为 Double 类型
```

### Where 子句 {#where-clauses}
要想对类型形参及其关联类型指定额外要求，可以在函数体或者类型的大括号之前添加 `where` 子句。`where` 子句由关键字 `where` 及其后的用逗号分隔的一个或多个要求组成。

> `where` : `类型要求`
> 

`where` 子句中的要求用于指明该类型形参继承自某个类或符合某个协议或协议组合。尽管 `where` 子句提供了语法糖使其有助于表达类型形参上的简单约束（如 `<T: Comparable>` 等同于 `<T> where T: Comparable`，等等），但是依然可以用来对类型形参及其关联类型提供更复杂的约束，例如你可以强制形参的关联类型遵守协议，如，`<S: Sequence> where S.Iterator.Element: Equatable` 表示泛型类型 `S` 遵守 `Sequence` 协议并且关联类型 `S.Iterator.Element` 遵守 `Equatable` 协议，这个约束确保队列的每一个元素都是符合 `Equatable` 协议的。
> 

也可以用操作符 `==` 来指定两个类型必须相同。例如，泛型形参子句 `<S1: Sequence, S2: Sequence> where S1.Iterator.Element == S2.Iterator.Element` 表示 `S1` 和 `S2` 必须都符合 `SequenceType` 协议，而且两个序列中的元素类型必须相同。
> 

当然，替代类型形参的类型实参必须满足所有的约束和要求。

`where` 子句可以存在于包含类型参数的声明中，或作为声明的一部分，被嵌套另一个在含有类型参数的声明中。被嵌套的 `where` 子句依然可以指向包围它的声明中的类型参数，此时 `where` 子句需要满足的条件仅用于它被声明的地方。

如果外层的声明也有一个 `where` 子句，两个子句的条件都需要满足。下面的例子中，`startsWithZero()` 只有在 `Element` 同时满足 `SomeProtocol` 和 `Numeric` 才有效。

```swift
extension Collection where Element: SomeProtocol {
    func startsWithZero() -> Bool where Element: Numeric {
        return first == .zero
    }
}
```

泛型函数或构造器可以重载，但在泛型形参子句中的类型形参必须有不同的约束或要求，抑或二者皆不同。当调用重载的泛型函数或构造器时，编译器会根据这些约束来决定调用哪个重载函数或构造器。

更多关于泛型 where 从句的信息和关于泛型函数声明的例子，可以看一看 [泛型 where 子句](../02_language_guide/22_Generics.md#where-clauses)。

> 泛型形参子句语法
> 

#### generic-parameter-clause {#generic-parameter-clause}
> *泛型形参子句* → **<** [泛型形参列表](#generic-parameter-list) [约束子句](#requirement-clause)<sub>可选</sub> **>**
> 

#### generic-parameter-list {#generic-parameter-list}
> *泛型形参列表* → [泛形形参](#generic-parameter) | [泛形形参](#generic-parameter) **,** [泛型形参列表](#generic-parameter-list)
> 

#### generic-parameter {#generic-parameter}
> *泛形形参* → [类型名称](./03_Types.md#type-name)
> 
> *泛形形参* → [类型名称](./03_Types.md#type-name)    **:** [类型标识符](./03_Types.md#type-identifier)
> 
> *泛形形参* → [类型名称](./03_Types.md#type-name)    **:** [协议合成类型](./03_Types.md#protocol-composition-type)
> 
> 
####  requirement-clause {#requirement-clause}
> 
> *约束子句* → **where** [约束列表](#requirement-list)
> 

#### requirement-list {#requirement-list}
> *约束列表* → [约束](#requirement) | [约束](#requirement) **,** [约束列表](#requirement-list)
> 

#### requirement {#requirement}
> *约束* → [一致性约束](#conformance-requirement) | [同类型约束](#same-type-requirement)
> 
> 
####  conformance-requirement {#conformance-requirement}
> 
> *一致性约束* → [类型标识符](./03_Types.md#type-identifier) **:** [类型标识符](./03_Types.md#type-identifier)
> 
> *一致性约束* → [类型标识符](./03_Types.md#type-identifier) **:** [协议合成类型](./03_Types.md#protocol-composition-type)
> 

#### same-type-requirement {#same-type-requirement}
> *同类型约束* → [类型标识符](./03_Types.md#type-identifier) **==** [类型](./03_Types.md#type)
> 

## 泛型实参子句 {#generic-argument}
*泛型实参子句*指定泛型类型的类型实参。泛型实参子句用尖括号（`<>`）包住，形式如下：

> <`泛型实参列表`>
> 

泛型实参列表中类型实参用逗号分开。类型实参是实际具体类型的名字，用来替代泛型类型的泛型形参子句中的相应的类型形参。从而得到泛型类型的一个特化版本。例如，Swift 标准库中的泛型字典类型的的简化定义如下：

```swift
struct Dictionary<Key: Hashable, Value>: CollectionType, DictionaryLiteralConvertible {
    /* ... */
}
```

泛型 `Dictionary` 类型的特化版本，`Dictionary<String, Int>` 就是用具体的 `String` 和 `Int` 类型替代泛型类型 `Key: Hashable` 和 `Value` 产生的。每一个类型实参必须满足它所替代的泛型形参的所有约束，包括任何 `where` 子句所指定的额外的关联类型要求。上面的例子中，类型形参 `Key` 的类型必须符合 `Hashable` 协议，因此 `String` 也必须满足 `Hashable` 协议。

可以用本身就是泛型类型的特化版本的类型实参替代类型形参（假设已满足合适的约束和关联类型要求）。例如，为了生成一个元素类型是整型数组的数组，可以用数组的特化版本 `Array<Int>` 替代泛型类型 `Array<T>` 的类型形参 `T` 来实现。

```swift
let arrayOfArrays: Array<Array<Int>> = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
```

如 [泛型形参子句](#generic-parameter) 所述，不能用泛型实参子句来指定泛型函数或构造器的类型实参。

> 泛型实参子句语法
> 

#### generic-argument-clause {#generic-argument-clause}
> *泛型实参子句* → **<** [泛型实参列表](#generic-argument-list) **>**
> 

#### generic-argument-list {#generic-argument-list}
> *泛型实参列表* → [泛型实参](#generic-argument) | [泛型实参](#generic-argument) **,** [泛型实参列表](#generic-argument-list)
> 

#### generic-argument {#generic-argument}
> *泛型实参* → [类型](./03_Types.md#type)
> 
