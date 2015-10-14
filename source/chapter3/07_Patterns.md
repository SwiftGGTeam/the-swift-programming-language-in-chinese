# 模式（Patterns）
-----------------

> 1.0
> 翻译：[honghaoz](https://github.com/honghaoz)
> 校对：[numbbbbb](https://github.com/numbbbbb), [stanzhai](https://github.com/stanzhai)

> 2.0
> 翻译+校对：[ray16897188](https://github.com/ray16897188),
> [BridgeQ](https://github.com/WXGBridgeQ)

本页内容包括：

- [通配符模式（Wildcard Pattern）](#wildcard_pattern)
- [标识符模式（Identifier Pattern）](#identifier_pattern)
- [值绑定模式（Value-Binding Pattern）](#value-binding_pattern)
- [元组模式（Tuple Pattern）](#tuple_pattern)
- [枚举用例模式（Enumeration Case Pattern）](#enumeration_case_pattern)
- [可选模式（Optional Pattern）](#optional_pattern)
- [类型转换模式（Type-Casting Pattern）](#type-casting_pattern)
- [表达式模式（Expression Pattern）](#expression_pattern)

模式（pattern）代表了单个值或者复合值的结构。例如，元组`(1, 2)`的结构是逗号分隔的，包含两个元素的列表。因为模式代表一种值的结构，而不是特定的某个值，你可以把模式和各种同类型的值匹配起来。比如，`(x, y)`可以匹配元组`(1, 2)`，以及任何含两个元素的元组。除了将模式与一个值匹配外，你可以从复合值中提取出部分或全部，然后分别把各个部分和一个常量或变量绑定起来。

swift语言中模式有2个基本的分类：一类能成功和任何值的类型相匹配，另一类在运行时（runtime）和某特定值匹配时可能会失败。

第一类模式用于解构简单变量，常量和可选绑定中的值。此类模式包括通配符模式（wildcard patterns），标识符模式（identifier patterns），以及任何包含了它们的值绑定模式（value binding patterns）或者元祖模式（tuple patterns）。你可以为这类模式指定一个类型标注（type annotation）从而限制它们只能匹配某种特定类型的值。

第二类模式用于全模式匹配，这种情况下你用来相比较的值在运行时可能还不存在。此类模式包括枚举用例模式（enumeration case patterns），可选模式（optional patterns），表达式模式（expression patterns）和类型转换模式（type-casting patterns）。你在`switch`语句的case标签中，`do`语句的`catch`从句中，或者在`if, while, guard`和`for-in`语句的case条件句中使用这类模式。

> 模式(Patterns) 语法  
> *模式* → [*通配符模式*](../chapter3/07_Patterns.html#wildcard_pattern) [*类型标注*](../chapter3/03_Types.html#type_annotation) _可选_  
> *模式* → [*标识符模式*](../chapter3/07_Patterns.html#identifier_pattern) [*类型标注*](../chapter3/03_Types.html#type_annotati(Value Binding)on) _可选_  
> *模式* → [*值绑定模式*](../chapter3/07_Patterns.html#value_binding_pattern)  
> *模式* → [*元组模式*](../chapter3/07_Patterns.html#tuple_pattern) [*类型标注*](../chapter3/03_Types.html#type_annotation) _可选_  
> *模式* → [*枚举用例模式*](../chapter3/07_Patterns.html#enum_case_pattern)  
> *模式* → [*可选模式*](../chapter3/07_Patterns.html#optional_pattern)  
> *模式* → [*类型转换模式*](../chapter3/07_Patterns.html#type_casting_pattern)  
> *模式* → [*表达式模式*](../chapter3/07_Patterns.html#expression_pattern)  

<a name="wildcard_pattern"></a>
## 通配符模式（Wildcard Pattern）

通配符模式由一个下划线（_）构成，且匹配并忽略任何值。当你不在乎被匹配的值时可以使用该模式。例如，下面这段代码在闭区间`1...3`中循环，每次循环时忽略该区间内的当前值：

```swift
for _ in 1...3 {
    // Do something three times.
}
```

> 通配符模式语法  
> *通配符模式* → **_**  

<a name="identifier_pattern"></a>
## 标识符模式（Identifier Pattern）

标识符模式匹配任何值，并将匹配的值和一个变量或常量绑定起来。例如，在下面的常量声明中，`someValue`是一个标识符模式，匹配了类型是`Int`的`42`。

```swift
let someValue = 42
```

当匹配成功时，`42`被绑定（赋值）给常量`someValue`。

如果一个变量或常量声明的左边的模式是一个标识符模式，那么这个标识符模式是一个隐式的值绑定模式（value-binding pattern）。

> 标识符模式语法  
> *标识符模式* → [*标识符*](LexicalStructure.html#identifier)  

<a name="value-binding_pattern"></a>
## 值绑定模式（Value-Binding Pattern）

值绑定模式把匹配到的值绑定给一个变量或常量名。把绑定匹配到的值绑定给常量时，用关键字`let`,绑定给变量时，用关键字`var`。

在值绑定模式中的标识符模式会把新命名的变量或常量与匹配值做绑定。例如，你可以拆开一个元组的元素，然后把每个元素绑定到其相应一个的标识符模式中。

```swift
let point = (3, 2)
switch point {
    // Bind x and y to the elements of point.
case let (x, y):
    print("The point is at (\(x), \(y)).")
}
// prints "The point is at (3, 2).”
```

在上面这个例子中，`let`将元组模式`(x, y)`分配到各个标识符模式。正是由于这么做，`switch`语句中`case let (x, y):`和`case (let x, let y):`匹配到的值是一样的。

> 值绑定(Value Binding)模式语法  
> *值绑定模式* → **var** [*模式*](../chapter3/07_Patterns.html#pattern) | **let** [*模式*](../chapter3/07_Patterns.html#pattern)  

<a name="tuple_pattern"></a>
## 元组模式（Tuple Pattern）

元组模式是逗号分隔的，有零个或多个模式的列表，并被一对圆括号括起来。元组模式匹配相应元组类型的值。

你可以使用类型标注去限制一个元组模式能匹配哪些种元组类型。例如，在常量声明`let (x, y): (Int, Int) = (1, 2)`中的元组模式`(x, y): (Int, Int)`只匹配两个元素都是`Int`这种类型的元组。如果仅需要限制一个元组模式中的某几个元素，只需要直接对这几个元素提供类型标注即可。例如，在`let (x: String, y)`中的元组模式可以和任何有两个元素，且第一个元素类型是`String`的元组类型匹配。

当元组模式被用在`for-in`语句或者变量或常量声明时，它仅可以包含通配符模式，标识符模式，可选模式或者其他包含这些模式的元祖模式。比如下面这段代码就不正确，因为`(x, 0)`中的元素`0`是一个表达式模式：

```swift
let points = [(0, 0), (1, 0), (1, 1), (2, 0), (2, 1)]
// This code isn't valid.
for (x, 0) in points {
    /* ... */
}
```

对于只包含一个元素的元组，括号是不起作用的。模式只匹配这个单个元素的类型。举例来说，下面3条语句是等效的：

```swift
let a = 2        // a: Int = 2
let (a) = 2      // a: Int = 2
let (a): Int = 2 // a: Int = 2
```

> 元组模式语法  
> *元组模式* → **(** [*元组模式元素列表*](../chapter3/07_Patterns.html#tuple_pattern_element_list) _可选_ **)**  
> *元组模式元素列表* → [*元组模式元素*](../chapter3/07_Patterns.html#tuple_pattern_element) | [*元组模式元素*](../chapter3/07_Patterns.html#tuple_pattern_element) **,** [*元组模式元素列表*](../chapter3/07_Patterns.html#tuple_pattern_element_list)  
> *元组模式元素* → [*模式*](../chapter3/07_Patterns.html#pattern)  

<a name="enumeration_case_pattern"></a>
## 枚举用例模式（Enumeration Case Pattern）

一个枚举用例模式匹配现有的某个枚举类型的某个用例（case）。枚举用例模式出现在`switch`语句中的case标签中，以及`if`，`while`，`guard`和`for-in`语句的case条件中。

如果你准备匹配的枚举用例有任何关联的值，则相应的枚举用例模式必须指定一个包含每个关联值元素的元组模式。关于使用`switch`语句来匹配包含关联值枚举用例的例子，请参阅`Associated Values`.

> 枚举用例模式语法  
> *enum-case-pattern* → [*类型标识*](../chapter3/03_Types.html#type_identifier) _可选_ **.** [*枚举的case名*](../chapter3/05_Declarations.html#enum_case_name) [*元组模式*](../chapter3/07_Patterns.html#tuple_pattern) _可选_  

<a name="optional_pattern"></a>
## 可选模式（Optional Pattern）

可选模式与封装在一个`Optional(Wrapped)`或者一个`ExplicitlyUnwrappedOptional(Wrapped)`枚举中的`Some(Wrapped)`用例相匹配。可选模式由一个标识符模式和紧随其后的一个问号组成，在某些情况下表现为枚举用例模式。

由于可选模式是`optional`和`ImplicitlyUnwrappedOptional`枚举用例模式的语法糖（syntactic sugar），下面的2种写法是一样的：

```swift
let someOptional: Int? = 42
// Match using an enumeration case pattern
if case .Some(let x) = someOptional {
    print(x)
}

// Match using an optional pattern
if case let x? = someOptional {
    print(x)
}
```
如果一个数组的元素是可选类型，可选模式为`for-in`语句提供了一种在该数组中迭代的简便方式，只为数组中的非空`non-nil`元素执行循环体。

```swift
let arrayOfOptionalInts: [Int?] = [nil, 2, 3, nil, 5]
// Match only non-nil values
for case let number? in arrayOfOptinalInts {
    print("Found a \(number)")
}
//Found a 2
//Found a 3
//Found a 5

```
> 可选模式语法  
> *可选模式* → [*标识符模式*](../chapter3/03_Types.html#type_identifier) ?

<a name="type-casting_patterns"></a>
## 类型转换模式（Type-Casting Patterns）

有两种类型转换模式，`is`模式和`as`模式。这两种模式只出现在`switch`语句中的case标签中。`is`模式和`as`模式有以下形式：

> is `type`  
> `pattern` as `type`

`is`模式仅当一个值的类型在运行时（runtime）和`is`模式右边的指定类型一致 - 或者是该类型的子类 - 的情况下，才会匹配这个值。`is`模式和`is`操作符有相似表现，它们都进行类型转换，却舍弃返回的类型。

`as`模式仅当一个值的类型在运行时（runtime）和`as`模式右边的指定类型一致 - 或者是该类型的子类 - 的情况下，才会匹配这个值。如果匹配成功，被匹配的值的类型被转换成`as`模式左边指定的模式。

关于使用`switch`语句来匹配`is`模式和`as`模式值的例子，请参阅`Type Casting for Any and AnyObject`。

> 类型转换模式语法  
> *type-casting-pattern* → [*is模式*](../chapter3/07_Patterns.html#is_pattern) | [*as模式*](../chapter3/07_Patterns.html#as_pattern)  
> *is模式* → **is** [*类型*](../chapter3/03_Types.html#type)  
> *as模式* → [*模式*](../chapter3/07_Patterns.html#pattern) **as** [*类型*](../chapter3/03_Types.html#type)  

<a name="expression_pattern"></a>
## 表达式模式（Expression Pattern）

一个表达式模式代表了一个表达式的值。表达式模式只出现在`switch`语句中的`case`标签中。

由表达式模式所代表的表达式与使用了Swift标准库中`~=`操作符的输入表达式的值进行比较。如果`~=`操作符返回`true`，则匹配成功。默认情况下，`~=`操作符使用`==`操作符来比较两个相同类型的值。它也可以将一个整型数值与一个`Range`对象中的一段整数区间做匹配，正如下面这个例子所示：

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
// prints "(1, 2) is near the origin.”
```

你可以重载`~=`操作符来提供自定义的表达式匹配行为。比如你可以重写上面的例子，拿`point`表达式去比较字符串形式的点。

```swift
// Overload the ~= operator to match a string with an integer
func ~=(pattern: String, value: Int) -> Bool {
    return pattern == "\(value)"
}
switch point {
case ("0", "0"):
    print("(0, 0) is at the origin.")
default:
    print("The point is at (\(point.0), \(point.1)).")
}
// prints "(1, 2) is near the origin.”
```

> 表达式模式语法  
> *表达式模式* → [*表达式*](../chapter3/04_Expressions.html#expression)  
