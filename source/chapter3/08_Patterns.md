# 模式（Patterns）
-----------------

> 1.0
> 翻译：[honghaoz](https://github.com/honghaoz)
> 校对：[numbbbbb](https://github.com/numbbbbb), [stanzhai](https://github.com/stanzhai)

> 2.0
> 翻译+校对：[ray16897188](https://github.com/ray16897188),

> 2.1
> 翻译：[BridgeQ](https://github.com/WXGBridgeQ)

本页内容包括：

- [通配符模式（Wildcard Pattern）](#wildcard_pattern)
- [标识符模式（Identifier Pattern）](#identifier_pattern)
- [值绑定模式（Value-Binding Pattern）](#value-binding_pattern)
- [元组模式（Tuple Pattern）](#tuple_pattern)
- [枚举用例模式（Enumeration Case Pattern）](#enumeration_case_pattern)
- [可选模式（Optional Pattern）](#optional_pattern)
- [类型转换模式（Type-Casting Pattern）](#type-casting_patterns)
- [表达式模式（Expression Pattern）](#expression_pattern)

模式代表单个值或者复合值的结构。例如，元组 `(1, 2)` 的结构是由逗号分隔的，包含两个元素的列表。因为模式代表一种值的结构，而不是特定的某个值，你可以利用模式来匹配各种各样的值。比如，`(x, y)` 可以匹配元组 `(1, 2)`，以及任何含两个元素的元组。除了利用模式匹配一个值以外，你可以从复合值中提取出部分或全部值，然后分别把各个部分的值和一个常量或变量绑定起来。

Swift 中的模式分为两类：一种能成功匹配任何类型的值，另一种在运行时匹配某个特定值时可能会失败。

第一类模式用于解构简单变量、常量和可选绑定中的值。此类模式包括通配符模式、标识符模式，以及包含前两种模式的值绑定模式和元组模式。你可以为这类模式指定一个类型标注，从而限制它们只能匹配某种特定类型的值。

第二类模式用于全模式匹配，这种情况下你试图匹配的值在运行时可能不存在。此类模式包括枚举用例模式、可选模式、表达式模式和类型转换模式。你在 `switch` 语句的 `case` 标签中，`do` 语句的 `catch` 子句中，或者在 `if`、`while`、`guard` 和 `for-in` 语句的 `case` 条件句中使用这类模式。

> 模式语法  
<a name="pattern"></a>
> *模式* → [*通配符模式*](#wildcard_pattern) [*类型标注*](03_Types.md#type-annotation)<sub>可选</sub>  
> *模式* → [*标识符模式*](#identifier_pattern) [*类型标注*](03_Types.md#type-annotation)<sub>可选</sub>  
> *模式* → [*值绑定模式*](#value-binding-pattern)  
> *模式* → [*元组模式*](#tuple-pattern) [*类型标注*](03_Types.md#type-annotation)<sub>可选</sub>  
> *模式* → [*枚举用例模式*](#enum-case-pattern)  
> *模式* → [*可选模式*](#optional-pattern)  
> *模式* → [*类型转换模式*](#type-casting-pattern)  
> *模式* → [*表达式模式*](#expression-pattern)  

<a name="wildcard_pattern"></a>
## 通配符模式（Wildcard Pattern）

通配符模式由一个下划线（`_`）构成，用于匹配并忽略任何值。当你想忽略被匹配的值时可以使用该模式。例如，下面这段代码在闭区间 `1...3` 中迭代，每次迭代都忽略该区间的当前值：

```swift
for _ in 1...3 {
    // ...
}
```

> 通配符模式语法  
<a name="wildcard-pattern"></a>
> *通配符模式* → **_**  

<a name="identifier_pattern"></a>
## 标识符模式（Identifier Pattern）

标识符模式匹配任何值，并将匹配的值和一个变量或常量绑定起来。例如，在下面的常量声明中，`someValue` 是一个标识符模式，匹配了 `Int` 类型的 `42`：

```swift
let someValue = 42
```

当匹配成功时，`42` 被绑定（赋值）给常量 `someValue`。

如果一个变量或常量声明的左边是一个标识符模式，那么这个标识符模式是值绑定模式的子模式。

> 标识符模式语法  
<a name="identifier-pattern"></a>
> *标识符模式* → [*标识符*](02_Lexical_Structure.md#identifier)  

<a name="value-binding_pattern"></a>
## 值绑定模式（Value-Binding Pattern）

值绑定模式把匹配到的值绑定给一个变量或常量。把匹配到的值绑定给常量时，用关键字 `let`，绑定给变量时，用关键字 `var`。

在值绑定模式中的标识符模式会把新命名的变量或常量与匹配到的值做绑定。例如，你可以拆开一个元组，然后把每个元素绑定到相应的标识符模式中。

```swift
let point = (3, 2)
switch point {
// 将 point 中的元素绑定到 x 和 y
case let (x, y):
    print("The point is at (\(x), \(y)).")
}
// 打印 “The point is at (3, 2).”
```

在上面这个例子中，`let` 会分配到元组模式 `(x, y)` 中的各个标识符模式。因此，`switch` 语句中 `case let (x, y):` 和 `case (let x, let y):` 的匹配效果是一样的。

> 值绑定模式语法  
<a name="value-binding-pattern"></a>
> *值绑定模式* → **var** [*模式*](#pattern) | **let** [*模式*](#pattern)  

<a name="tuple_pattern"></a>
## 元组模式

元组模式是由逗号分隔的，具有零个或多个模式的列表，并由一对圆括号括起来。元组模式匹配相应元组类型的值。

你可以使用类型标注去限制一个元组模式能匹配哪种元组类型。例如，在常量声明 `let (x, y): (Int, Int) = (1, 2)` 中的元组模式 `(x, y): (Int, Int)` 只匹配两个元素都是 `Int` 类型的元组。

当元组模式被用于 `for-in` 语句或者变量和常量声明时，它仅可以包含通配符模式、标识符模式、可选模式或者其他包含这些模式的元组模式。比如下面这段代码就不正确，因为 `(x, 0)` 中的元素 `0` 是一个表达式模式：

```swift
let points = [(0, 0), (1, 0), (1, 1), (2, 0), (2, 1)]
// 下面的代码是错误的
for (x, 0) in points {
    /* ... */
}
```

只包含一个元素的元组模式的圆括号没有效果，模式只匹配这个单个元素的类型。举例来说，下面的语句是等效的：

```swift
let a = 2        // a: Int = 2
let (a) = 2      // a: Int = 2
let (a): Int = 2 // a: Int = 2
```

> 元组模式语法  
<a name="tuple-pattern"></a>
> *元组模式* → **(** [*元组模式元素列表*](#tuple-pattern-element-list)<sub>可选</sub> **)**  
<a name="tuple-pattern-element-list"></a>
> *元组模式元素列表* → [*元组模式元素*](#tuple-pattern-element) | [*元组模式元素*](#tuple-pattern-element) **,** [*元组模式元素列表*](#tuple-pattern-element-list)  
<a name="tuple-pattern-element"></a>
> *元组模式元素* → [*模式*](#pattern)  

<a name="enumeration_case_pattern"></a>
## 枚举用例模式（Enumeration Case Pattern）

枚举用例模式匹配现有的某个枚举类型的某个用例。枚举用例模式出现在 `switch` 语句中的 `case` 标签中，以及 `if`、`while`、`guard` 和 `for-in` 语句的 `case` 条件中。

如果你准备匹配的枚举用例有任何关联的值，则相应的枚举用例模式必须指定一个包含每个关联值元素的元组模式。关于使用 `switch` 语句来匹配包含关联值的枚举用例的例子，请参阅 [关联值](../chapter2/08_Enumerations.md#associated_values)。

> 枚举用例模式语法  
<a name="enum-case-pattern"></a>
> *枚举用例模式* → [*类型标识*](03_Types.md#type-identifier)<sub>可选</sub> **.** [*枚举用例名*](05_Declarations.md#enum-case-name) [*元组模式*](#tuple-pattern)<sub>可选</sub>  

<a name="optional_pattern"></a>
## 可选模式（Optional Pattern）

可选模式匹配包装在一个 `Optional(Wrapped)` 或者 `ExplicitlyUnwrappedOptional(Wrapped)` 枚举中的 `Some(Wrapped)` 用例中的值。可选模式由一个标识符模式和紧随其后的一个问号组成，可以像枚举用例模式一样使用。

由于可选模式是 `Optional` 和 `ImplicitlyUnwrappedOptional` 枚举用例模式的语法糖，下面两种写法是等效的：

```swift
let someOptional: Int? = 42
// 使用枚举用例模式匹配
if case .Some(let x) = someOptional {
    print(x)
}

// 使用可选模式匹配
if case let x? = someOptional {
    print(x)
}
```

可选模式为 `for-in` 语句提供了一种迭代数组的简便方式，只为数组中非 `nil` 的元素执行循环体。

```swift
let arrayOfOptionalInts: [Int?] = [nil, 2, 3, nil, 5]
// 只匹配非 nil 的元素
for case let number? in arrayOfOptinalInts {
    print("Found a \(number)")
}
// Found a 2
// Found a 3
// Found a 5
```

> 可选模式语法  
<a name="optional-pattern"></a>
> *可选模式* → [*标识符模式*](03_Types.md#type-identifier) **?**

<a name="type-casting_patterns"></a>
## 类型转换模式（Type-Casting Patterns）

有两种类型转换模式，`is` 模式和 `as` 模式。`is` 模式只出现在 `switch` 语句中的 `case` 标签中。`is` 模式和 `as` 模式形式如下：

> is `类型`  
> `模式` as `类型`

`is` 模式仅当一个值的类型在运行时和 `is` 模式右边的指定类型一致，或者是其子类的情况下，才会匹配这个值。`is` 模式和 `is` 运算符有相似表现，它们都进行类型转换，但是 `is` 模式没有返回类型。

`as` 模式仅当一个值的类型在运行时和 `as` 模式右边的指定类型一致，或者是其子类的情况下，才会匹配这个值。如果匹配成功，被匹配的值的类型被转换成 `as` 模式右边指定的类型。

关于使用 `switch` 语句配合 `is` 模式和 `as` 模式来匹配值的例子，请参阅 [Any 和 AnyObject 的类型转换](../chapter2/19_Type_Casting.md#type_casting_for_any_and_anyobject)。

> 类型转换模式语法  
<a name="type-casting-pattern"></a>
> *类型转换模式* → [*is模式*](#is-pattern) | [*as模式*](#as-pattern)  
<a name="is-pattern"></a>
> *is模式* → **is** [*类型*](03_Types.md#type)  
<a name="as-pattern"></a>
> *as模式* → [*模式*](#pattern) **as** [*类型*](03_Types.md#type)  

<a name="expression_pattern"></a>
## 表达式模式（Expression Pattern）

表达式模式代表表达式的值。表达式模式只出现在 `switch` 语句中的 `case` 标签中。

表达式模式代表的表达式会使用 Swift 标准库中的 `~=` 运算符与输入表达式的值进行比较。如果 `~=` 运算符返回 `true`，则匹配成功。默认情况下，`~=` 运算符使用 `==` 运算符来比较两个相同类型的值。它也可以将一个整型数值与一个 `Range` 实例中的一段整数区间做匹配，正如下面这个例子所示：

```swift
let point = (1, 2)
switch point {
case (0, 0):
    print("(0, 0) is at the origin.")
case (-2...2, -2...2):
    print("(\(point.0), \(point.1)) is near the origin.")
default:
    print("The point is at (\(point.0), \(point.1)).")
}
// 打印 “(1, 2) is near the origin.”
```

你可以重载 `~=` 运算符来提供自定义的表达式匹配行为。比如你可以重写上面的例子，将 `point` 表达式与字符串形式表示的点进行比较。

```swift
// 重载 ~= 运算符对字符串和整数进行比较
func ~=(pattern: String, value: Int) -> Bool {
    return pattern == "\(value)"
}

switch point {
case ("0", "0"):
    print("(0, 0) is at the origin.")
default:
    print("The point is at (\(point.0), \(point.1)).")
}
// 打印 “The point is at (1, 2).”
```

> 表达式模式语法  
<a name="expression-pattern"></a>
> *表达式模式* → [*表达式*](04_Expressions.md#expression)  
