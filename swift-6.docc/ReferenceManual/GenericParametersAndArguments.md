# 泛型形参和实参

将参数声明抽象化以脱离具体类型。

本节描述泛型类型、泛型函数和泛型构造器的形参和实参。在声明泛型类型、函数或构造器时，需要指定泛型可处理的类型形参。这些类型形参相当于占位符，当实例化泛型类型或调用泛型函数、初始化器时，会被具体的类型实参替换。

关于 Swift 语言中的“泛型”，参阅 <doc:Generics>.

<!--
  NOTE: Generic types are sometimes referred to as :newTerm:`parameterized types`
  because they're declared with one or more type parameters.
-->

## 泛型形参子句

*泛型形参子句* 指定了泛型类型或函数的类型形参，以及对这些形参的任何相关约束和要求。泛型形参用尖括号（<>）括起来，格式如下：

```swift
<<#generic parameter list#>>
```

多个*泛型形参*用逗号分开，每个形参的形式如下：

```swift
<#type parameter#>: <#constraint#>
```

泛型形参由一个*类型形参*和一个可选的*约束*组成。*类型形参*只是一个占位符（如 `T`，`U`，`V`，`Key`，`Value`等），用来表示类型。在声明类型、函数或构造器时（包括函数或构造器的签名），你可以访问这些类型形参及其任何关联的类型。

*约束*指定了类型形参要继承自特定类，或遵循某个协议或协议组合。例如：在下面的泛型函数中，泛型形参 `T: Comparable` 表示任何替代类型形参 `T` 的类型实参都必须遵循 `Comparable` 协议。

```swift
func simpleMax<T: Comparable>(_ x: T, _ y: T) -> T {
    if x < y {
        return y
    }
    return x
}
```

<!--
  - test: `generic-params`

  ```swifttest
  -> func simpleMax<T: Comparable>(_ x: T, _ y: T) -> T {
        if x < y {
           return y
        }
        return x
     }
  ```
-->

以`Int`和`Double`，因为都遵循 `Comparable` 协议，所以该函数可以接受这两种类型的参数。与泛型类型不同，调用泛型函数或构造器时，你不需要指定泛型实参子句。泛型实参的类型会根据传给函数或构造器的参数类型推断出来。

```swift
simpleMax(17, 42) // T is inferred to be Int
simpleMax(3.14159, 2.71828) // T is inferred to be Double
```

<!--
  - test: `generic-params`

  ```swifttest
  >> let r0 =
  -> simpleMax(17, 42) // T is inferred to be Int
  >> assert(r0 == 42)
  >> let r1 =
  -> simpleMax(3.14159, 2.71828) // T is inferred to be Double
  >> assert(r1 == 3.14159)
  ```
-->

<!--
  Rewrite the above to avoid bare expressions.
  Tracking bug is <rdar://problem/35301593>
-->

泛型参数列表中的最后一个泛型参数后面可以跟一个可选的逗号。

### 整数泛型参数

*整数泛型参数*作为整数值而不是类型的占位符。它具有以下形式：

```swift
let <#type parameter#>: <#type>
```

*类型*必须是 Swift 标准库中的 `Int` 类型，或者解析为 `Int` 的类型别名或泛型类型。

你为整数泛型参数提供的值必须是整数字面量，或者是来自封闭泛型上下文的另一个整数泛型参数。例如：

```swift
struct SomeStruct<let x: Int> { }
let a: SomeStruct<2>  // OK: integer literal

struct AnotherStruct<let x: Int, T, each U> {
    let b: SomeStruct<x>  // OK: another integer generic parameter

    static let c = 42
    let d: SomeStruct<c>  // Error: Can't use a constant.

    let e: SomeStruct<T>  // Error: Can't use a generic type parameter.
    let f: SomeStruct<U>  // Error: Can't use a parameter pack.
}
```

类型上的整数泛型参数的值可以作为该类型的静态常量成员访问，具有与类型本身相同的可见性。函数上的整数泛型参数的值可以从函数内部作为常量访问。在表达式中使用时，这些常量的类型为 `Int`。

```swift
print(a.x)  // Prints "4"
```

整数泛型参数的值可以从初始化类型或调用函数时使用的参数类型中推断出来。

```swift
struct AnotherStruct<let y: Int> {
    var s: SomeStruct<y>
}
func someFunction<let z: Int>(s: SomeStruct<z>) {
    print(z)
}

let s1 = SomeStruct<12>()
let s2 = AnotherStruct(s: s1)  // AnotherStruct.y is inferred to be 12.
someFunction(s: s1)  // Prints "12"
```

### 泛型 Where 子句

你可以通过在类型或函数体的起始大括号前包含一个泛型`where`子句，来对类型形参及其相关类型指定额外的要求。泛型 `where`子句由`where`关键字组成，后跟一个或多个要求，多个*要求*用逗号进行分隔。

```swift
where <#requirements#>
```

泛型 `where` 子句中的*要求*指明类型形参要继承自某个类或遵循某个协议或协议组合。虽然 `where` 子句为表达类型形参的简单约束提供了语法糖（比如，`<T: Comparable>` 等同于 `where T: Comparable` 等），但它可以用于为类型形参及其关联类型提供更复杂的约束。比如，你可以指定类型形参的关联类型遵循某个协议：`<S: Sequence> where S.Iterator.Element: Equatable`  指定了`S`遵循 `Sequence`协议，并且`S`的关联类型`S.Iterator.Element`遵循`Equatable`协议。此约束确保序列中的每个元素都是符合`Equatable`协议的。整数泛型参数不能有协议或超类要求。整数泛型参数不能有协议或超类要求。

还可以使用 == 运算符来指定两个类型必须相同。例如， `<S1: Sequence, S2: Sequence> where S1.Iterator.Element == S2.Iterator.Element`，表示 S1 和 S2 都遵循 Sequence 协议，并且两个序列元素的类型必须相同。对于整数泛型参数，== 运算符指定对其值的要求。你可以要求两个整数泛型参数具有相同的值，或者可以为整数泛型参数要求特定的整数值。

任何替代类型形参的类型实参都必须满足对该类型形参指定的所有约束与要求。

 `where`子句可以出现在包含类型形参的声明中，或作为声明的一部分，被嵌套另一个在含有类型形参的声明中。被嵌套的泛型 `where`子句依然可以指向包围它的声明中的类型形参，然而此时 `where`子句指定的要求仅用于它被声明的地方。

如果外层的声明也有一个 `where` 子句，那么两个子句的要求会合并。在下面的示例中，`startsWithZero()`仅在 `Element` 同时遵循`someProtocol`和`Numeric`协议时可用。

```swift
extension Collection where Element: SomeProtocol {
    func startsWithZero() -> Bool where Element: Numeric {
        return first == .zero
    }
}
```

<!--
  - test: `contextual-where-clauses-combine`

  ```swifttest
  >> protocol SomeProtocol { }
  >> extension Int: SomeProtocol { }
  -> extension Collection where Element: SomeProtocol {
         func startsWithZero() -> Bool where Element: Numeric {
             return first == .zero
         }
     }
  >> print( [1, 2, 3].startsWithZero() )
  << false
  ```
-->

<!--
  - test: `contextual-where-clause-combine-err`

  ```swifttest
  >> protocol SomeProtocol { }
  >> extension Bool: SomeProtocol { }

  >> extension Collection where Element: SomeProtocol {
  >>     func returnTrue() -> Bool where Element == Bool {
  >>         return true
  >>     }
  >>     func returnTrue() -> Bool where Element == Int {
  >>         return true
  >>     }
  >> }
  !$ error: no type for 'Self.Element' can satisfy both 'Self.Element == Int' and 'Self.Element : SomeProtocol'
  !! func returnTrue() -> Bool where Element == Int {
  !!                                            ^
  ```
-->

重载泛型函数或构造器，泛型形参子句中的类型形参必须有不同的约束或要求。当调用重载的泛型函数或构造器时，编译器会使用这些约束来决定调用哪个重载的函数或构造器。

更多关于泛型 `where` 从句的内容和关于泛型函数声明的例子，参阅 <doc:Generics#泛型-Where-语句>.

> 泛型形参子句的语法格式：
>
> *泛型形参子句* → **`<`** *泛型形参列表* **`,`**_?_ **`>`** \
> *泛型形参列表* → *泛型形参* | *泛型形参* **`,`** *泛型形参列表* \
> *泛型形参* → *类型名称* \
> *泛型形参* → *类型名称* **`:`** *类型标识符* \
> *泛型形参* → *类型名称* **`:`** *协议合成类型* \
> *泛型形参* → **`let`** *类型名称* **`:`** *类型* \
>
> *泛型 where 子句* → **`where`** *约束列表* \
> *要求列表* → *要求* | *要求* **`,`** *要求列表* \
> *要求* → *一致性要求* | *同类型要求*
>
> *一致性要求* → *类型标识符* **`:`** *类型标识符* \
> *一致性要求* → *类型标识符* **`:`** *协议合成类型* \
> *同类型要求* → *类型标识符* **`==`** *类型* \
> *同类型要求* → *类型标识符* **`==`** *有符号整数字面量*

<!--
  NOTE: A conformance requirement can only have one type after the colon,
  otherwise, you'd have a syntactic ambiguity
  (a comma-separated list types inside of a comma-separated list of requirements).
-->

## 泛型实参子句

*泛型实参* 指定了泛型类型的类型实参。泛型实参用尖括号（<>）包围，格式如下

```swift
<<#generic argument list#>>
```

多个泛型实参用逗号分开。类型实参是实际具体类型的名称，用来替代泛型类型的泛型参数子句中相应的类型参数——或者对于整数泛型参数，是替换该整数泛型参数的整数值。从而得到该泛型类型的特定版本。下面的示例展示了 Swift 标准库中的泛型字典类型的简化版本：

```swift
struct Dictionary<Key: Hashable, Value>: Collection, ExpressibleByDictionaryLiteral {
    /* ... */
}
```

<!--
  TODO: How are we supposed to wrap code lines like the above?
-->

泛型`Dictionary`的特定版本`Dictionary<String, Int>`是通过具体的类型实参（`String`和`Int`）来替换泛型形参（`Key: Hashable` 和 `Value`）而形成的。每个类型实参必须满足它替换的泛型形参的所有约束，包括在泛型`where`子句中指定的额外要求。在上述例子中，`Key`类型形参要遵循`Hashable`协议，因此传入的实参`String`也要遵循`Hashable`协议。

还可以用本身就是泛型类型的特定版本的类型实参替代类型形参（假设已满足合适的约束和关联类型要求）。例如，可以将 `Array<Element>`中的类型形参 `Element` 替换 Array 泛型专用版本 `Array<Int>` ，以形成一个元素本身是整数数组的二维数组。

```swift
let arrayOfArrays: Array<Array<Int>> = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
```

<!--
  - test: `array-of-arrays`

  ```swifttest
  -> let arrayOfArrays: Array<Array<Int>> = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
  ```
-->

正如在<doc:GenericParametersAndArguments#泛型形参子句>中提到的，在指定泛型函数或构造器的类型实参时，不能使用泛型实参子句。

泛型实参列表中的最后一个类型实参后面可以跟一个可选的逗号。

> 泛型实参的语法格式：
>
> *generic-argument-clause* → **`<`** *generic-argument-list* **`,`**_?_ **`>`** \
> *generic-argument-list* → *generic-argument* | *generic-argument* **`,`** *generic-argument-list* \
> *generic-argument* → *type* | *signed-integer-literal*

<!--
This source file is part of the Swift.org open source project

Copyright (c) 2014 - 2022 Apple Inc. and the Swift project authors
Licensed under Apache License v2.0 with Runtime Library Exception

See https://swift.org/LICENSE.txt for license information
See https://swift.org/CONTRIBUTORS.txt for the list of Swift project authors
-->
