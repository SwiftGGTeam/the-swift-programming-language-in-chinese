# 表达式（Expressions）
-----------------

> 1.0
> 翻译：[sg552](https://github.com/sg552)
> 校对：[numbbbbb](https://github.com/numbbbbb), [stanzhai](https://github.com/stanzhai)

> 2.0
> 翻译+校对：[EudeMorgen](https://github.com/EudeMorgen)

> 2.1
> 翻译：[mmoaay](https://github.com/mmoaay)

> 2.2 
> 校对：[175](https://github.com/Brian175)

> 3.0 
> 翻译+校对：[chenmingjia](https://github.com/chenmingjia)

本页包含内容：

- [前缀表达式](#prefix_expressions)
    - [try 运算符](#try_operator)
- [二元表达式](#binary_expressions)
    - [赋值表达式](#assignment_operator)
    - [三元条件运算符](#ternary_conditional_operator)
    - [类型转换运算符](#type-casting_operators)
- [基本表达式](#primary_expressions)
    - [字面量表达式](#literal_expression)
    - [self 表达式](#self_expression)
    - [超类表达式](#superclass_expression)
    - [闭包表达式](#closure_expression)
    - [隐式成员表达式](#implicit_member_expression)
    - [圆括号表达式](#parenthesized_expression)
    - [通配符表达式](#wildcard_expression)
    - [选择器表达式](#selector_expression)
- [后缀表达式](#postfix_expressions)
    - [函数调用表达式](#function_call_expression) 
    - [构造器表达式](#initializer_expression)
    - [显式成员表达式](#explicit_member_expression)
    - [后缀 self 表达式](#postfix_self_expression)
    - [dynamicType 表达式](#dynamic_type_expression)
    - [下标表达式](#subscript_expression)
    - [强制取值表达式](#forced-Value_expression)
    - [可选链表达式](#optional-chaining_expression)

Swift 中存在四种表达式：前缀表达式，二元表达式，基本表达式和后缀表达式。表达式在返回一个值的同时还可以引发副作用。

通过前缀表达式和二元表达式可以对简单表达式使用各种运算符。基本表达式从概念上讲是最简单的一种表达式，它是一种访问值的方式。后缀表达式则允许你建立复杂的表达式，例如函数调用和成员访问。每种表达式都在下面有详细论述。

> 表达式语法  
<a name="expression"></a>
> *表达式* → [*try运算符*](#try-operator)<sub>可选</sub> [*前缀表达式*](#prefix-expression) [*二元表达式列表*](#binary-expressions)<sub>可选</sub>  
<a name="expression-list"></a>
> *表达式列表* → [*表达式*](#expression) | [*表达式*](#expression) **,** [*表达式列表*](#expression-list)  

<a name="prefix_expressions"></a>
## 前缀表达式
 
前缀表达式由可选的前缀运算符和表达式组成。前缀运算符只接收一个参数，表达式则紧随其后。

关于这些运算符的更多信息，请参阅 [基本运算符](../chapter2/02_Basic_Operators.md) 和 [高级运算符](../chapter2/25_Advanced_Operators.md)。

关于 Swift 标准库提供的运算符的更多信息，请参阅 [*Swift Standard Library Operators Reference*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Reference/Swift_StandardLibrary_Operators/index.html#//apple_ref/doc/uid/TP40016054)。

除了标准库运算符，你也可以对某个变量使用 `&` 运算符，从而将其传递给函数的输入输出参数。更多信息，请参阅 [输入输出参数](../chapter2/06_Functions.html#in_out_parameters)。

> 前缀表达式语法  
<a name="prefix-expression"></a>
> *前缀表达式* → [*前缀运算符*](02_Lexical_Structure.md#prefix-operator)<sub>可选</sub> [*后缀表达式*](#postfix-expression)  
> *前缀表达式* → [*输入输出表达式*](#in-out-expression)  
<a name="in-out-expression"></a>
> *输入输出表达式* → **&** [*标识符*](02_Lexical_Structure.md#identifier)  

<a name="try_operator"></a>
### try 运算符

try 表达式由 `try` 运算符加上紧随其后的可抛出错误的表达式组成，形式如下：

> try `可抛出错误的表达式`

可选的 try 表达式由 `try?` 运算符加上紧随其后的可抛出错误的表达式组成，形式如下：

> try? `可抛出错误的表达式`

如果可抛出错误的表达式没有抛出错误，整个表达式返回的可选值将包含可抛出错误的表达式的返回值，否则，该可选值为 `nil`。

强制的 try 表达式由 `try!` 运算符加上紧随其后的可抛出错误的表达式组成，形式如下：

> try! `可抛出错误的表达式`

如果可抛出错误的表达式抛出了错误，将会引发运行时错误。

在二进制运算符左侧的表达式被标记上 `try`、`try?` 或者 `try!` 时，这个运算符对整个二进制表达式都产生作用。也就是说，你可以使用括号来明确运算符的作用范围。

```swift
sum = try someThrowingFunction() + anotherThrowingFunction()   // try 对两个函数调用都产生作用
sum = try (someThrowingFunction() + anotherThrowingFunction()) // try 对两个函数调用都产生作用
sum = (try someThrowingFunction()) + anotherThrowingFunction() // 错误：try 只对第一个函数调用产生作用
```

`try` 表达式不能出现在二进制运算符的的右侧，除非二进制运算符是赋值运算符或者 `try` 表达式是被圆括号括起来的。

关于 `try`、`try?` 和 `try!` 的更多信息，以及该如何使用的例子，请参阅 [错误处理](../chapter2/18_Error_Handling.html)。
> try 表达式语法  
<a name="try-operator"></a> 
> *try 运算符* → **try** | **try?** | **try!**

<a name="binary_expressions"></a>
## 二元表达式

二元表达式由中缀运算符和左右参数表达式组成。形式如下：

> `左侧参数` `二元运算符` `右侧参数`

关于这些运算符的更多信息，请参阅 [基本运算符](../chapter2/02_Basic_Operators.md) 和 [高级运算符](../chapter2/25_Advanced_Operators.md)。

关于 Swift 标准库提供的运算符的更多信息，请参阅 [*Swift Standard Library Operators Reference*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Reference/Swift_StandardLibrary_Operators/index.html#//apple_ref/doc/uid/TP40016054)。

> 注意  
> 在解析时，一个二元表达式将作为一个扁平列表表示，然后根据运算符的优先级，再进一步进行组合。例如，`2 + 3 * 5` 首先被看作具有五个元素的列表，即 `2`、`+`、`3`、`*`、`5`，随后根据运算符优先级组合为 `(2 + (3 * 5))`。

<a name="binary-expression"></a>
> 二元表达式语法  
> *二元表达式* → [*二元运算符*](02_Lexical_Structure.md#binary-operator) [*前缀表达式*](#prefix-expression)  
> *二元表达式* → [*赋值运算符*](#assignment-operator) [*try运算符*](#try-operator)<sub>可选</sub> [*前缀表达式*](#prefix-expression)  
> *二元表达式* → [*条件运算符*](#conditional-operator) [*try运算符*](#try-operator)<sub>可选</sub> [*前缀表达式*](#prefix-expression)  
> *二元表达式* → [*类型转换运算符*](#type-casting-operator)  
<a name="binary-expressions"></a>
> *二元表达式列表* → [*二元表达式*](#binary-expression) [*二元表达式列表*](#binary-expressions)<sub>可选</sub>

<a name="assignment_operator"></a>
### 赋值表达式

赋值表达式会为某个给定的表达式赋值，形式如下；

> `表达式` = `值`

右边的值会被赋值给左边的表达式。如果左边表达式是一个元组，那么右边必须是一个具有同样元素个数的元组。（嵌套元组也是允许的。）右边的值中的每一部分都会被赋值给左边的表达式中的相应部分。例如：

```swift
(a, _, (b, c)) = ("test", 9.45, (12, 3))
// a 为 "test"，b 为 12，c 为 3，9.45 会被忽略
```

赋值运算符不返回任何值。

> 赋值运算符语法  
<a name="assignment-operator"></a>
> *赋值运算符* → **=**  

<a name="ternary_conditional_operator"></a>
### 三元条件运算符

三元条件运算符会根据条件来对两个给定表达式中的一个进行求值，形式如下：

> `条件` ? `表达式（条件为真则使用）` : `表达式（条件为假则使用）`

如果条件为真，那么对第一个表达式进行求值并返回结果。否则，对第二个表达式进行求值并返回结果。未使用的表达式不会进行求值。

关于使用三元条件运算符的例子，请参阅 [三元条件运算符](../chapter2/02_Basic_Operators.md#ternary_conditional_operator)。

> 三元条件运算符语法  
<a name="conditional-operator"></a>
> *三元条件运算符* → **?** [try运算符](#try-operator)<sub>可选</sub> [*表达式*](#expression) **:**  

<a name="type-casting_operators"></a>
### 类型转换运算符

有 4 种类型转换运算符：`is`、`as`、`as? `和`as!`。它们有如下的形式：

> `表达式` is `类型`  
`表达式` as `类型`  
`表达式` as? `类型`  
`表达式` as! `类型`  

`is` 运算符在运行时检查表达式能否向下转化为指定的类型，如果可以则返回 `ture`，否则返回 `false`。

`as` 运算符在编译时执行向上转换和桥接。向上转换可将表达式转换成超类的实例而无需使用任何中间变量。以下表达式是等价的：

```swift
func f(any: Any) { print("Function for Any") }
func f(int: Int) { print("Function for Int") }
let x = 10
f(x)
// 打印 “Function for Int”
 
let y: Any = x
f(y)
// 打印 “Function for Any”
 
f(x as Any)
// 打印 “Function for Any”
```

桥接可将 Swift 标准库中的类型（例如 `String`）作为一个与之相关的 Foundation 类型（例如 `NSString`）来使用，而不需要新建一个实例。关于桥接的更多信息，请参阅 [*Using Swift with Cocoa and Objective-C (Swift2.2)*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/BuildingCocoaApps/index.html#//apple_ref/doc/uid/TP40014216) 中的 [Working with Cocoa Data Types](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/BuildingCocoaApps/WorkingWithCocoaDataTypes.html#//apple_ref/doc/uid/TP40014216-CH6)。

`as?` 运算符有条件地执行类型转换，返回目标类型的可选值。在运行时，如果转换成功，返回的可选值将包含转换后的值，否则返回 `nil`。如果在编译时就能确定转换一定会成功或是失败，则会导致编译报错。

`as!` 运算符执行强制类型转换，返回目标类型的非可选值。如果转换失败，则会导致运行时错误。表达式 `x as! T` 效果等同于 `(x as? T)!`。

关于类型转换的更多内容和例子，请参阅 [类型转换](../chapter2/19_Type_Casting.md)。

<a name="type-casting-operator"></a>
> 类型转换运算符语法  
> *类型转换运算符* → **is** [*类型*](03_Types.md#type)  
> *类型转换运算符* → **as** [*类型*](03_Types.md#type)  
> *类型转换运算符* → **as** **?** [*类型*](03_Types.md#type)  
> *类型转换运算符* → **as** **!** [*类型*](03_Types.md#type)   

<a name="primary_expressions"></a>
## 基本表达式

基本表达式是最基本的表达式。它们可以单独使用，也可以跟前缀表达式、二元表达式、后缀表达式组合使用。

> 基本表达式语法  
<a name="primary-expression"></a>
> *基本表达式* → [*标识符*](02_Lexical_Structure.md#identifier) [*泛型实参子句*](08_Generic_Parameters_and_Arguments.md#generic-argument-clause)<sub>可选</sub>  
> *基本表达式* → [*字面量表达式*](#literal-expression)  
> *基本表达式* → [*self表达式*](#self-expression)  
> *基本表达式* → [*超类表达式*](#superclass-expression)  
> *基本表达式* → [*闭包表达式*](#closure-expression)  
> *基本表达式* → [*圆括号表达式*](#parenthesized-expression)  
> *基本表达式* → [*隐式成员表达式*](#implicit-member-expression)  
> *基本表达式* → [*通配符表达式*](#wildcard-expression)  
> *基本表达式* → [*选择器表达式*](#selector-expression)

<a name="literal_expression"></a>
### 字面量表达式

字面量表达式可由普通字面量（例如字符串或者数字），字典或者数组字面量，或者下面列表中的特殊字面量组成：

字面量 | 类型 | 值
:------------- | :---------- | :----------
`#file` | `String` | 所在的文件名
`#line` | `Int` | 所在的行数
`#column` | `Int` | 所在的列数
`#function` | `String` | 所在的声明的名字

`#line`除了上述含义外，还有另一种含义。当它出现在单独一行时，会被理解成行控制语句，请参阅[线路控制语句](../chapter3/10_Statements.md#线路控制语句)。

对于 `＃function`，在函数中会返回当前函数的名字，在方法中会返回当前方法的名字，在属性的存取器中会返回属性的名字，在特殊的成员如 `init` 或 `subscript` 中会返回这个关键字的名字，在某个文件中会返回当前模块的名字。

`#function` 作为函数或者方法的默认参数值时，该字面量的值取决于函数或方法的调用环境。

```swift
func logFunctionName(string: String = #function) {
    print(string)
}
func myFunction() {
    logFunctionName() 
}
myFunction() // 打印 “myFunction()”
```

数组字面量是值的有序集合，形式如下：

> [`值 1`, `值 2`, `...`]

数组中的最后一个表达式可以紧跟一个逗号。数组字面量的类型是 `[T]`，这个 `T` 就是数组中元素的类型。如果数组中包含多种类型，`T` 则是跟这些类型最近的的公共父类型。空数组字面量由一组方括号定义，可用来创建特定类型的空数组。

```swift
var emptyArray: [Double] = []
```

字典字面量是一个包含无序键值对的集合，形式如下：

> [`键 1` : `值 1`, `键 2` : `值 2`, `...`]

字典中的最后一个表达式可以紧跟一个逗号。字典字面量的类型是 `[Key : Value]`，`Key` 表示键的类型，`Value` 表示值的类型。如果字典中包含多种类型，那么 `Key` 表示的类型则为所有键最接近的公共父类型，`Value` 与之相似。一个空的字典字面量由方括号中加一个冒号组成（`[:]`），从而与空数组字面量区分开，可以使用空字典字面量来创建特定类型的字典。

```swift
var emptyDictionary: [String : Double] = [:]
```

> 字面量表达式语法  

<a name="literal-expression"></a>
> *字面量表达式* → [*字面量*](02_Lexical_Structure.md#literal)  
> *字面量表达式* → [*数组字面量*](#array-literal) | [*字典字面量*](#dictionary-literal)  
> *字面量表达式* → **#file** | **#line** | **#column** | **#function**  

<a name="array-literal"></a>
> *数组字面量* → **[** [*数组字面量项列表*](#array-literal-items)<sub>可选</sub> **]**  
<a name="array-literal-items"></a>
> *数组字面量项列表* → [*数组字面量项*](#array-literal-item) **,**<sub>可选</sub> | [*数组字面量项*](#array-literal-item) **,** [*数组字面量项列表*](#array-literal-items)  
<a name="array-literal-item"></a>
> *数组字面量项* → [*表达式*](#expression)  

<a name="dictionary-literal"></a>
> *字典字面量* → **[** [*字典字面量项列表*](#dictionary-literal-items) **]** | **[** **:** **]**  
<a name="dictionary-literal-items"></a>
> *字典字面量项列表* → [*字典字面量项*](#dictionary-literal-item) **,**<sub>可选</sub> | [*字典字面量项*](#dictionary-literal-item) **,** [*字典字面量项列表*](#dictionary-literal-items)  
<a name="dictionary-literal-item"></a>
> *字典字面量项* → [*表达式*](#expression) **:** [*表达式*](#expression)  

<a name="self_expression"></a>
### self 表达式

`self` 表达式是对当前类型或者当前实例的显式引用，它有如下形式：

> self  
> self.`成员名称`  
> self[`下标索引`]  
> self(`构造器参数`)  
> self.init(`构造器参数`)

如果在构造器、下标、实例方法中，`self` 引用的是当前类型的实例。在一个类型方法中，`self` 引用的是当前的类型。

当访问成员时，`self` 可用来区分重名变量，例如函数的参数：

```swift
class SomeClass {
    var greeting: String
    init(greeting: String) {
        self.greeting = greeting
    }
}
```

在 `mutating` 方法中，你可以对 `self` 重新赋值：

```swift
struct Point {
    var x = 0.0, y = 0.0
    mutating func moveByX(deltaX: Double, y deltaY: Double) {
        self = Point(x: x + deltaX, y: y + deltaY)
    }
}
```

> self 表达式语法  
<a name="self-expression"></a>
> *self 表达式* → **self**  | [*self 方法表达式*](#self-method-expression) ｜ [*self 下标表达式*](#self-subscript-expression) | [*self 构造器表达式*](#self-initializer-expression)
>
<a name="self-method-expression"></a>
> *self 方法表达式* → **self** **.** [*标识符*](02_Lexical_Structure.md#identifier)  
<a name="self-subscript-expression"></a>
> *self 下标表达式* → **self** **[** [*表达式*](#expression) **]** 
<a name="self-initializer-expression"></a> 
> *self 构造器表达式* → **self** **.** **init**  

<a name="superclass_expression"></a>
### 超类表达式

超类表达式可以使我们在某个类中访问它的超类，它有如下形式：

> super.`成员名称`  
> super[`下标索引`]  
> super.init(`构造器参数`)

第一种形式用来访问超类的某个成员，第二种形式用来访问超类的下标，第三种形式用来访问超类的构造器。

子类可以通过超类表达式在它们的成员、下标和构造器中使用超类中的实现。

> 超类表达式语法  
<a name="superclass-expression"></a>
> *超类表达式* → [*超类方法表达式*](#superclass-method-expression) | [*超类下标表达式*](#superclass-subscript-expression) | [*超类构造器表达式*](#superclass-initializer-expression)  
<a name="superclass-method-expression"></a>
> *超类方法表达式* → **super** **.** [*标识符*](02_Lexical_Structure.md#identifier)  
<a name="superclass-subscript-expression"></a>
> *超类下标表达式* → **super** **[** [*表达式*](#expression) **]**  
<a name="superclass-initializer-expression"></a>
> *超类构造器表达式* → **super** **.** **init**  

<a name="closure_expression"></a>
### 闭包表达式

闭包表达式会创建一个闭包，在其他语言中也叫 *lambda* 或匿名函数。跟函数一样，闭包包含了待执行的代码，不同的是闭包还会捕获所在环境中的常量和变量。它的形式如下：

```swift
{ (parameters) -> return type in  
    statements  
}
```

闭包的参数声明形式跟函数一样，请参阅 [函数声明](05_Declarations.md#function_declaration)。

闭包还有几种特殊的形式，能让闭包使用起来更加简洁：

- 闭包可以省略它的参数和返回值的类型。如果省略了参数名和所有的类型，也要省略 `in` 关键字。如果被省略的类型无法被编译器推断，那么就会导致编译错误。
- 闭包可以省略参数名，参数会被隐式命名为 `$` 加上其索引位置，例如 `$0`、`$1`、`$2` 分别表示第一个、第二个、第三个参数，以此类推。
- 如果闭包中只包含一个表达式，那么该表达式的结果就会被视为闭包的返回值。表达式结果的类型也会被推断为闭包的返回类型。

下面几个闭包表达式是等价的：

```swift
myFunction {
    (x: Int, y: Int) -> Int in
    return x + y
}

myFunction {
    (x, y) in
    return x + y
}

myFunction { return $0 + $1 }

myFunction { $0 + $1 }
```

关于如何将闭包作为参数来传递的内容，请参阅 [函数调用表达式](#function_call_expression)。

#### 捕获列表

默认情况下，闭包会捕获附近作用域中的常量和变量，并使用强引用指向它们。你可以通过一个捕获列表来显式指定它的捕获行为。

捕获列表在参数列表之前，由中括号括起来，里面是由逗号分隔的一系列表达式。一旦使用了捕获列表，就必须使用 `in` 关键字，即使省略了参数名、参数类型和返回类型。

捕获列表中的项会在闭包创建时被初始化。每一项都会用闭包附近作用域中的同名常量或者变量的值初始化。例如下面的代码示例中，捕获列表包含 `a` 而不包含 `b`，这将导致这两个变量具有不同的行为。

```swift
var a = 0
var b = 0
let closure = { [a] in
    print(a, b)
}

a = 10
b = 10
closure()
// 打印 “0 10”
```

在示例中，变量 `b` 只有一个，然而，变量 `a` 有两个，一个在闭包外，一个在闭包内。闭包内的变量 `a` 会在闭包创建时用闭包外的变量 `a` 的值来初始化，除此之外它们并无其他联系。这意味着在闭包创建后，改变某个 `a` 的值都不会对另一个 `a` 的值造成任何影响。与此相反，闭包内外都是同一个变量 `b`，因此在闭包外改变其值，闭包内的值也会受影响。

如果闭包捕获的值具有引用语义则有所不同。例如，下面示例中，有两个变量 `x`，一个在闭包外，一个在闭包内，由于它们的值是引用语义，虽然这是两个不同的变量，它们却都引用着同一实例。

```swift
class SimpleClass {
    var value: Int = 0
}
var x = SimpleClass()
var y = SimpleClass()
let closure = { [x] in
    print(x.value, y.value)
}

x.value = 10
y.value = 10
closure()
// 打印 “10 10”
```

如果捕获列表中的值是类类型，你可以使用 `weak` 或者 `unowned` 来修饰它，闭包会分别用弱引用和无主引用来捕获该值。

```swift
myFunction { print(self.title) }                   // 以强引用捕获
myFunction { [weak self] in print(self!.title) }   // 以弱引用捕获
myFunction { [unowned self] in print(self.title) } // 以无主引用捕获
```

在捕获列表中，也可以将任意表达式的值绑定到一个常量上。该表达式会在闭包被创建时进行求值，闭包会按照指定的引用类型来捕获表达式的值。例如：

```swift
// 以弱引用捕获 self.parent 并赋值给 parent
myFunction { [weak parent = self.parent] in print(parent!.title) }
```

关于闭包表达式的更多信息和例子，请参阅 [闭包表达式](../chapter2/07_Closures.md#closure_expressions)。关于捕获列表的更多信息和例子，请参阅 [解决闭包引起的循环强引用](../chapter2/16_Automatic_Reference_Counting.md#resolving_strong_reference_cycles_for_closures)。

> 闭包表达式语法  

<a name="closure-expression"></a>
> *闭包表达式* → **{** [*闭包签名*](#closure-signature)<sub>可选</sub> [*语句*](10_Statements.md#statements) **}**  

<a name="closure-signature"></a>
> *闭包签名* → [*参数子句*](05_Declarations.md#parameter-clause) [*函数结果*](05_Declarations.md#function-result)<sub>可选</sub> **in**  
> *闭包签名* → [*标识符列表*](02_Lexical_Structure.md#identifier-list) [*函数结果*](05_Declarations.md#function-result)<sub>可选</sub> **in**  
> *闭包签名* → [*捕获列表*](#capture-list) [*参数子句*](05_Declarations.md#parameter-clause) [*函数结果*](05_Declarations.md#function-result)<sub>可选</sub> **in**  
> *闭包签名* → [*捕获列表*](#capture-list) [*标识符列表*](02_Lexical_Structure.md#identifier-list) [*函数结果*](05_Declarations.md#function-result)<sub>可选</sub> **in**  
> *闭包签名* → [*捕获列表*](#capture-list) **in**  

<a name="capture-list"></a>
> *捕获列表* → **[** [*捕获列表项列表*](#capture-list-items) **]**  
<a name="capture-list-items"></a>
> *捕获列表项列表* → [*捕获列表项*](#capture-list-item) | [*捕获列表项*](#capture-list-item) **,** [*捕获列表项列表*](#capture-list-items)
<a name="capture-list-item"></a>  
> *捕获列表项* → [*捕获说明符*](#capture-specifier)<sub>可选</sub> [*表达式*](#expression)
<a name="capture-specifier"></a>  
> *捕获说明符* → **weak** | **unowned** | **unowned(safe)** | **unowned(unsafe)**  

<a name="implicit_member_expression"></a>
### 隐式成员表达式

若类型可被推断出来，可以使用隐式成员表达式来访问某个类型的成员（例如某个枚举成员或某个类型方法），形式如下：

> .`成员名称`

例如：

```swift
var x = MyEnumeration.SomeValue
x = .AnotherValue
```

> 隐式成员表达式语法  
<a name="implicit-member-expression"></a>
> *隐式成员表达式* → **.** [*标识符*](02_Lexical_Structure.md#identifier)  

<a name="parenthesized_expression"></a>
### 圆括号表达式

圆括号表达式由圆括号和其中多个逗号分隔的子表达式组成。每个子表达式前面可以有一个标识符，用冒号隔开。圆括号表达式形式如下：

> (`标识符 1` : `表达式 1`, `标识符 2` : `表达式 2`, `...`)

使用圆括号表达式来创建元组，然后将其作为参数传递给函数。如果某个圆括号表达式中只有一个子表达式，那么它的类型就是子表达式的类型。例如，表达式 `(1)` 的类型是 `Int`，而不是 `(Int)`。

> 圆括号表达式语法  
<a name="parenthesized-expression"></a>
> *圆括号表达式* → **(** [*表达式元素列表*](#expression-element-list)<sub>可选</sub> **)**
<a name="expression-element-list"></a>  
> *表达式元素列表* → [*表达式元素*](#expression-element) | [*表达式元素*](#expression-element) **,** [*表达式元素列表*](#expression-element-list)
<a name="expression-element"></a>  
> *表达式元素* → [*表达式*](#expression) | [*标识符*](02_Lexical_Structure.md#identifier) **:** [*表达式*](#expression)  

<a name="wildcard_expression"></a>
### 通配符表达式

通配符表达式可以在赋值过程中显式忽略某个值。例如下面的代码中，`10` 被赋值给 `x`，而 `20` 则被忽略：

```swift
(x, _) = (10, 20)
// x 为 10，20 被忽略
```

> 通配符表达式语法  
<a name="wildcard-expression"></a>
> *通配符表达式* → **_**  

<a name="selector_expression"></a>
### 选择器表达式

选择器表达式可以让你通过选择器来引用在Objective-C中方法(method)和属性(property)的setter和getter方法。

> \#selector(方法名)
\#selector(getter: 属性名)
\#selector(setter: 属性名)

方法名和属性名必须是存在于 Objective-C 运行时中的方法和属性的引用。选择器表达式的返回值是一个 Selector 类型的实例。例如：

```swift
class SomeClass: NSObject {
    let property: String
    @objc(doSomethingWithInt:)
    func doSomething(_ x: Int) { }
    
    init(property: String) {
        self.property = property
    }
}
let selectorForMethod = #selector(SomeClass.doSomething(_:))
let selectorForPropertyGetter = #selector(getter: SomeClass.property)
```
当为属性的getter创建选择器时,属性名可以是变量属性或者常量属性的引用。但是当为属性的setter创建选择器时,属性名只可以是对变量属性的引用。

方法名称可以包含圆括号来进行分组,并使用as 操作符来区分具有相同方法名但类型不同的方法, 例如:

```swift
extension SomeClass {
    @objc(doSomethingWithString:)
    func doSomething(_ x: String) { }
}
let anotherSelector = #selector(SomeClass.doSomething(_:) as (SomeClass) -> (String) -> Void)
```

由于选择器是在编译时创建的，因此编译器可以检查方法或者属性是否存在，以及是否在运行时暴露给了 Objective-C 。

> 注意  
> 虽然方法名或者属性名是个表达式，但是它不会被求值。

更多关于如何在 Swift 代码中使用选择器来与 Objective-C API 进行交互的信息，请参阅 [Using Swift with Cocoa and Objective-C (Swift 3)](https://developer.apple.com/library/prerelease/content/documentation/Swift/Conceptual/BuildingCocoaApps/index.html#//apple_ref/doc/uid/TP40014216) 中[Objective-C Selectors](https://developer.apple.com/library/prerelease/content/documentation/Swift/Conceptual/BuildingCocoaApps/InteractingWithObjective-CAPIs.html#//apple_ref/doc/uid/TP40014216-CH4-ID59)部分。

> 选择器表达式语法  
<a name="selector-expression"></a>
> *选择器表达式* → __#selector__ **(** [*表达式*](#expression) **)**  
> *选择器表达式* → __#selector__ **(** [*getter:表达式*](#expression) **)**  
> *选择器表达式* → __#selector__ **(** [*setter:表达式*](#expression) **)**


<a name="postfix_expressions"></a>
## 后缀表达式

后缀表达式就是在某个表达式的后面运用后缀运算符或其他后缀语法。从语法构成上来看，基本表达式也是后缀表达式。

关于这些运算符的更多信息，请参阅 [基本运算符](../chapter2/02_Basic_Operators.md) 和 [高级运算符](../chapter2/25_Advanced_Operators.md)。

关于 Swift 标准库提供的运算符的更多信息，请参阅 [*Swift Standard Library Operators Reference*](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Reference/Swift_StandardLibrary_Operators/index.html#//apple_ref/doc/uid/TP40016054)。

> 后缀表达式语法  
<a name="postfix-expression"></a>
> *后缀表达式* → [*基本表达式*](#primary-expression)  
> *后缀表达式* → [*后缀表达式*](#postfix-expression) [*后缀运算符*](02_Lexical_Structure.md#postfix-operator)  
> *后缀表达式* → [*函数调用表达式*](#function-call-expression)  
> *后缀表达式* → [*构造器表达式*](#initializer-expression)  
> *后缀表达式* → [*显式成员表达式*](#explicit-member-expression)  
> *后缀表达式* → [*后缀 self 表达式*](#postfix-self-expression)  
> *后缀表达式* → [*dynamicType 表达式*](#dynamic-type-expression)  
> *后缀表达式* → [*下标表达式*](#subscript-expression)  
> *后缀表达式* → [*强制取值表达式*](#forced-value-expression)  
> *后缀表达式* → [*可选链表达式*](#optional-chaining-expression)

<a name="function_call_expression"></a>
### 函数调用表达式

函数调用表达式由函数名和参数列表组成，形式如下：

> `函数名`(`参数 1`, `参数 2`)

函数名可以是值为函数类型的任意表达式。

如果函数声明中指定了参数的名字，那么在调用的时候也必须得写出来。这种函数调用表达式具有以下形式：

> `函数名`(`参数名 1`: `参数 1`, `参数名 2`: `参数 2`)

如果函数的最后一个参数是函数类型，可以在函数调用表达式的尾部（右圆括号之后）加上一个闭包，该闭包会作为函数的最后一个参数。如下两种写法是等价的：

```swift
// someFunction 接受整数和闭包参数
someFunction(x, f: {$0 == 13})
someFunction(x) {$0 == 13}
```

如果闭包是该函数的唯一参数，那么圆括号可以省略。

```swift
// someFunction 只接受一个闭包参数
myData.someMethod() {$0 == 13}
myData.someMethod {$0 == 13}
```

> 函数调用表达式语法  
<a name="function-call-expression"></a>
> *函数调用表达式* → [*后缀表达式*](#postfix-expression) [*圆括号表达式*](#parenthesized-expression)  
> *函数调用表达式* → [*后缀表达式*](#postfix-expression) [*圆括号表达式*](#parenthesized-expression)<sub>可选</sub> [*尾随闭包*](#trailing-closure)  
<a name="trailing-closure"></a>
> *尾随闭包* → [*闭包表达式*](#closure-expression)  

<a name="initializer_expression"></a>
### 构造器表达式

构造器表达式用于访问某个类型的构造器，形式如下：

> `表达式`.init(`构造器参数`)

你可以在函数调用表达式中使用构造器表达式来初始化某个类型的新实例。也可以使用构造器表达式来代理给超类构造器。

```swift
class SomeSubClass: SomeSuperClass {
    override init() {
        // 此处为子类构造过程
        super.init()
    }
}
```

和函数类似，构造器表达式可以作为一个值。 例如：

```swift
// 类型注解是必须的，因为 String 类型有多种构造器
let initializer: Int -> String = String.init
let oneTwoThree = [1, 2, 3].map(initializer).reduce("", combine: +)
print(oneTwoThree)
// 打印 “123”
```

如果通过名字来指定某个类型，可以不用构造器表达式而直接使用类型的构造器。在其他情况下，你必须使用构造器表达式。

```swift
let s1 = SomeType.init(data: 3) // 有效
let s2 = SomeType(data: 1)      // 有效

let s4 = someValue.dynamicType(data: 5)      // 错误
let s3 = someValue.dynamicType.init(data: 7) // 有效
```

> 构造器表达式语法  
<a name="initializer-expression"></a>
> *构造器表达式* → [*后缀表达式*](#postfix-expression) **.** **init**  
> *构造器表达式* → [*后缀表达式*](#postfix-expression) **.** **init** **(** [*参数名称*](#argument-names) **)**

<a name="explicit_member_expression"></a>
### 显式成员表达式

显式成员表达式允许我们访问命名类型、元组或者模块的成员，其形式如下：

> `表达式`.`成员名`

命名类型的某个成员在原始实现或者扩展中定义，例如：

```swift
class SomeClass {
    var someProperty = 42
}
let c = SomeClass()
let y = c.someProperty // 访问成员
```

元组的成员会隐式地根据表示它们出现顺序的整数来命名，以 0 开始，例如：

```swift
var t = (10, 20, 30)
t.0 = t.1
// 现在元组 t 为 (20, 20, 30)
```

对于模块的成员来说，只能直接访问顶级声明中的成员。

为了区分只有参数名有所不同的方法或构造器，在圆括号中写出参数名，参数名后紧跟一个冒号，对于没有参数名的参数，使用下划线代替参数名。而对于重载方法，则需使用类型标注进行区分。例如：

```swift
class SomeClass {
    func someMethod(x: Int, y: Int) {}
    func someMethod(x: Int, z: Int) {}
    func overloadedMethod(x: Int, y: Int) {}
    func overloadedMethod(x: Int, y: Bool) {}
}
let instance = SomeClass()

let a = instance.someMethod              // 有歧义
let b = instance.someMethod(_:y:)        // 无歧义

let d = instance.overloadedMethod        // 有歧义
let d = instance.overloadedMethod(_:y:)  // 有歧义
let d: (Int, Bool) -> Void  = instance.overloadedMethod(_:y:)  // 无歧义
```

如果点号（`.`）出现在行首，它会被视为显式成员表达式的一部分，而不是隐式成员表达式的一部分。例如如下代码所展示的被分为多行的链式方法调用：

```swift
let x = [10, 3, 20, 15, 4]
    .sort()
    .filter { $0 > 5 }
    .map { $0 * 100 }
```

> 显式成员表达式语法  
<a name="explicit-member-expression"></a>
> *显式成员表达式* → [*后缀表达式*](#postfix-expression) **.** [*十进制数字*](02_Lexical_Structure.md#decimal-digit)  
> *显式成员表达式* → [*后缀表达式*](#postfix-expression) **.** [*标识符*](02_Lexical_Structure.md#identifier) [*泛型实参子句*](08_Generic_Parameters_and_Arguments.md#generic-argument-clause)<sub>可选</sub><br/> 
> *显式成员表达式* → [*后缀表达式*](#postfix-expression) **.** [*标识符*](02_Lexical_Structure.md#identifier) **(** [*参数名称*](#argument-names) **)**
> 
<a name="argument-names"></a>
> *参数名称* → [*参数名*](#argument-name) [*参数名称*](#argument-names)<sub>可选</sub><br/>
<a name="argument-name"></a>
> *参数名* → [*标识符*](02_Lexical_Structure.md#identifier) **:**

<a name="postfix_self_expression"></a>
### 后缀 self 表达式

后缀 `self` 表达式由某个表达式或类型名紧跟 `.self` 组成，其形式如下：

> `表达式`.self  
> `类型`.self  

第一种形式返回表达式的值。例如：`x.self` 返回 `x`。

第二种形式返回相应的类型。我们可以用它来获取某个实例的类型作为一个值来使用。例如，`SomeClass.self` 会返回 `SomeClass` 类型本身，你可以将其传递给相应函数或者方法作为参数。

> 后缀 self 表达式语法  
<a name="postfix-self-expression"></a>
> *后缀 self 表达式* → [*后缀表达式*](#postfix-expression) **.** **self**  

<a name="dynamic_type_expression"></a>
### dynamicType 表达式

dynamicType 表达式由类似[函数调用表达式(Function Call Expression)](#function-call-expression)的特殊语法表达式组成,形式如下:

> type(of:`表达式`)

上述形式中的表达式不能是类型名。type(of:) 表达式会返回某个实例在运行时的类型，具体请看下面的例子：

```swift
class SomeBaseClass {
    class func printClassName() {
        print("SomeBaseClass")
    }
}
class SomeSubClass: SomeBaseClass {
    override class func printClassName() {
        print("SomeSubClass")
    }
}
let someInstance: SomeBaseClass = SomeSubClass()
// someInstance 在编译时的静态类型为 SomeBaseClass，
// 在运行时的动态类型为 SomeSubClass
type(of: someInstance).printClassName()
// 打印 “SomeSubClass”
```

> 动态类型表达式语法  
<a name="dynamic-type-expression"></a>
> *动态类型表达式* → type(of:表达式) **.** **dynamicType**  

<a name="subscript_expression"></a>
### 下标表达式

可通过下标表达式访问相应的下标，形式如下：

> `表达式`[`索引表达式`]

要获取下标表达式的值，可将索引表达式作为下标表达式的参数来调用下标 getter。下标 setter 的调用方式与之一样。

关于下标的声明，请参阅 [协议下标声明](05_Declarations.md#protocol_subscript_declaration)。

> 下标表达式语法  
<a name="subscript-expression"></a>
> *下标表达式* → [*后缀表达式*](#postfix-expression) **[** [*表达式列表*](#expression-list) **]**  

<a name="forced-Value_expression"></a>
### 强制取值表达式

当你确定可选值不是 `nil` 时，可以使用强制取值表达式来强制解包，形式如下：

> `表达式`!

如果该表达式的值不是 `nil`，则返回解包后的值。否则，抛出运行时错误。

返回的值可以被修改，无论是修改值本身，还是修改值的成员。例如：

```swift
var x: Int? = 0
x!++
// x 现在是 1
 
var someDictionary = ["a": [1, 2, 3], "b": [10, 20]]
someDictionary["a"]![0] = 100
// someDictionary 现在是 [b: [10, 20], a: [100, 2, 3]] 
```

> 强制取值语法  
<a name="forced-value-expression"></a>
> *强制取值表达式* → [*后缀表达式*](#postfix-expression) **!**  

<a name="optional-chaining_expression"></a>
### 可选链表达式

可选链表达式提供了一种使用可选值的便捷方法，形式如下：

> `表达式`?

后缀 `?` 运算符会根据表达式生成可选链表达式而不会改变表达式的值。

如果某个后缀表达式包含可选链表达式，那么它的执行过程会比较特殊。如果该可选链表达式的值是 `nil`，整个后缀表达式会直接返回 `nil`。如果该可选链表达式的值不是 `nil`，则返回可选链表达式解包后的值，并将该值用于后缀表达式中剩余的表达式。在这两种情况下，整个后缀表达式的值都会是可选类型。

如果某个后缀表达式中包含了可选链表达式，那么只有最外层的表达式会返回一个可选类型。例如，在下面的例子中，如果 `c` 不是 `nil`，那么它的值会被解包，然后通过 `.property` 访问它的属性，接着进一步通过 `.performAction()` 调用相应方法。整个 `c?.property.performAction()` 表达式返回一个可选类型的值，而不是多重可选类型。

```swift
var c: SomeClass?
var result: Bool? = c?.property.performAction()
```

上面的例子跟下面的不使用可选链表达式的例子等价：

```swift
var result: Bool? = nil
if let unwrappedC = c {
    result = unwrappedC.property.performAction()
}
```

可选链表达式解包后的值可以被修改，无论是修改值本身，还是修改值的成员。如果可选链表达式的值为 `nil`，则表达式右侧的赋值操作不会被执行。例如：

```swift
func someFunctionWithSideEffects() -> Int {
    // 译者注：为了能看出此函数是否被执行，加上了一句打印
    print("someFunctionWithSideEffects") 
    return 42 
}
var someDictionary = ["a": [1, 2, 3], "b": [10, 20]]

someDictionary["not here"]?[0] = someFunctionWithSideEffects()
// someFunctionWithSideEffects 不会被执行
// someDictionary 依然是 ["b": [10, 20], "a": [1, 2, 3]]

someDictionary["a"]?[0] = someFunctionWithSideEffects()
// someFunctionWithSideEffects 被执行并返回 42
// someDictionary 现在是 ["b": [10, 20], "a": [42, 2, 3]]
```

> 可选链表达式语法  
<a name="optional-chaining-expression"></a>
> *可选链表达式* → [*后缀表达式*](#postfix-expression) **?**  
