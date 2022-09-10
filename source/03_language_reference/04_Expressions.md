# 表达式（Expressions）

Swift 中存在四种表达式：前缀表达式，中缀表达式，基本表达式和后缀表达式。表达式在返回一个值的同时还可以引发副作用。

通过前缀表达式和中缀表达式可以对简单表达式使用各种运算符。基本表达式从概念上讲是最简单的一种表达式，它是一种访问值的方式。后缀表达式则允许你建立复杂的表达式，例如函数调用和成员访问。每种表达式都在下面有详细论述。

> 表达式语法

#### expression {#expression}
> *表达式* → [try 运算符](#try-operator)<sub>可选</sub>  [await 运算符](#await-operator)<sub>可选</sub>  [前缀表达式](#prefix-expression) [中缀表达式列表](#infix-expressions)<sub>可选</sub>

#### expression-list {#expression-list}

> *表达式列表* → [表达式](#expression) | [表达式](#expression) **,** [表达式列表](#expression-list)

## 前缀表达式 {#prefix-expressions}
前缀表达式由可选的前缀运算符和表达式组成。前缀运算符只接收一个参数，表达式则紧随其后。

关于这些运算符的更多信息，请参阅 [基本运算符](../02_language_guide/02_Basic_Operators.md) 和 [高级运算符](../02_language_guide/27_Advanced_Operators.md)。

关于 Swift 标准库提供的运算符的更多信息，请参阅 [*Operators Declarations*](https://developer.apple.com/documentation/swift/operator_declarations)。

除了标准库运算符，你也可以对某个变量使用 `&` 运算符，从而将其传递给函数的输入输出参数。更多信息，请参阅 [输入输出参数](../02_language_guide/06_Functions.md#in-out-parameters)。

> 前缀表达式语法

#### prefix-expression {#prefix-expression}
> *前缀表达式* → [前缀运算符](./02_Lexical_Structure.md#prefix-operator)<sub>可选</sub> [后缀表达式](#postfix-expression)
> 
> *前缀表达式* → [输入输出表达式](#in-out-expression)

### 输入输出表达式

*输入输出表达式* 将函数调用表达式传入的变量标记为输入输出实参。

> &`表达式` 

更多关于输入输出形参的信息和例子，请参阅 [输入输出形参](../02_language_guide/06_Functions.md#in-out-parameters)。

输入输出表达式也可以用于将非指针实参传入到需要指针的上下文中，如 [指针类型的隐式转换](#implicit-conversion-to-a-pointer) 中所述。

#### in-out-expression {#in-out-expression}
> *输入输出表达式* → **&** [标识符](./02_Lexical_Structure.md#identifier)

### Try 运算符 {#try-operator}

*try 表达式*由 `try` 运算符加上紧随其后的可抛出错误的表达式组成，形式如下：

> try `表达式`

 `try` 表达式的返回值是该*表达式*的值。

*可选 try 表达式*由 `try?` 运算符加上紧随其后的可抛出错误的表达式组成，形式如下：

> try? `表达式`

如果*表达式*没有抛出错误，可选 try 表达式的返回值是可选的该*表达式*的值，否则，返回值为 `nil`。

*强制 try 表达式*由 `try!` 运算符加上紧随其后的可抛出错误的表达式组成，形式如下：

> try! `表达式`

强制 try 表达式的返回值是该*表达式*的值。如果该*表达式*抛出了错误，将会引发运行时错误。

在中缀运算符左侧的表达式被标记上 `try`、`try?` 或者 `try!` 时，这个运算符对整个中缀表达式都产生作用。也就是说，你可以使用括号来明确运算符的作用范围。

```swift
 // try 对两个函数调用都产生作用
sum = try someThrowingFunction() + anotherThrowingFunction() 

// try 对两个函数调用都产生作用
sum = try (someThrowingFunction() + anotherThrowingFunction()) 

// 错误：try 只对第一个函数调用产生作用
sum = (try someThrowingFunction()) + anotherThrowingFunction() 
```

`try` 表达式不能出现在中缀运算符的的右侧，除非中缀运算符是赋值运算符或者 `try` 表达式是被圆括号括起来的。

如果表达式中同时包含 `try` 和 `await` 运算符，`try` 运算符必须在前面。

更多关于 `try`、`try?` 和 `try!` 的信息，以及该如何使用的例子，请参阅 [错误处理](../02_language_guide/17_Error_Handling.md)。
> Try 表达式语法

#### try-operator {#try-operator}
> *try 运算符*  → **try** | **try?** | **try!**

### Await 运算符{#await-operators}

*await 表达式*由 `await` 运算符加上紧随其后的异步操作结果的表达式。形式如下：

> await `表达式`

`await` 表达式返回值就是该*表达式*的值。

被 `await` 标记的表达式被称为*潜在的暂停点*。

异步函数的执行可以在每个标记 `await` 的表达式的位置暂停。除此之外，并发代码的执行永远不会在其他位置暂停。这意味着在潜在暂停点之间的代码可以暂时打破不变量的状态进行安全更新，只要更新在下一个潜在暂停点之前完成。

`await` 表达式只能在异步的上下文中出现，比如传入 `async(priority:operation:)` 函数的尾随闭包中。它不能在 `defer` 语句的闭包中，或者在同步函数的自动闭包中出现。

在中缀运算符左侧的表达式被标记上 `await` 运算符时，这个运算符对整个中缀表达式都产生作用。也就是说，你可以使用括号来明确运算符的作用范围。

```swift
// await 对两个函数调用都产生作用
sum = await someAsyncFunction() + anotherAsyncFunction()

// await 对两个函数调用都产生作用
sum = await (someAsyncFunction() + anotherAsyncFunction())

// 错误：await 只对第一个函数调用产生作用
sum = (await someAsyncFunction()) + anotherAsyncFunction()
```

`await` 表达式不能出现在中缀运算符的的右侧，除非中缀运算符是赋值运算符或者 `await` 表达式是被圆括号括起来的。

如果表达式中同时包含 `try` 和 `await` 运算符，`try` 运算符必须在前面。

> Await 表达式语法

#### await-operator {#await-operator}
> *await 运算符*  → **await** 


## 中缀表达式 {#infix-expressions}

*中缀表达式*由中缀运算符和左右参数表达式组成。形式如下：

> `左侧参数` `中缀运算符` `右侧参数`

关于这些运算符的更多信息，请参阅 [基本运算符](../02_language_guide/02_Basic_Operators.md) 和 [高级运算符](../02_language_guide/27_Advanced_Operators.md)。

关于 Swift 标准库提供的运算符的更多信息，请参阅 [*Swift Standard Library Operators Reference*](https://developer.apple.com/documentation/swift/operator_declarations)。

> 注意
> 
> 在解析时，一个中缀表达式将作为一个扁平列表表示，然后根据运算符的优先级，再进一步进行组合。例如，`2 + 3 * 5` 首先被看作具有五个元素的列表，即 `2`、`+`、`3`、`*`、`5`，随后根据运算符优先级组合为 `(2 + (3 * 5))`。


#### infix-expression {#infix-expression}
> 中置表达式语法
> 
> *中置表达式* → [中置运算符](./02_Lexical_Structure.md#infix-operator) [前缀表达式](#prefix-expression)
> 
> *中置表达式* → [赋值运算符](#assignment-operator) [try 运算符](#try-operator)<sub>可选</sub> [前缀表达式](#prefix-expression)
> 
> *中置表达式* → [条件运算符](#conditional-operator) [try 运算符](#try-operator)<sub>可选</sub> [前缀表达式](#prefix-expression)
> 
> *中置表达式* → [类型转换运算符](#type-casting-operator)

#### infix-expressions {#infix-expressions}
> *中置表达式列表* → [中置表达式](#infix-expression) [中置表达式列表](#infix-expressions)<sub>可选</sub>

### 赋值表达式 {#assignment-operator}
赋值表达式会为某个给定的表达式赋值，形式如下；

> `表达式` = `值`

右边的值会被赋值给左边的表达式。如果左边表达式是一个元组，那么右边必须是一个具有同样元素个数的元组。（嵌套元组也是允许的。）右边的值中的每一部分都会被赋值给左边的表达式中的相应部分。例如：

```swift
(a, _, (b, c)) = ("test", 9.45, (12, 3))
// a 为 "test"，b 为 12，c 为 3，9.45 会被忽略
```

赋值运算符不返回任何值。

> 赋值运算符语法

#### assignment-operator {#assignment-operator}
> *赋值运算符* → **=**

### 三元条件运算符 {#ternary-conditional-operator}
*三元条件运算符*会根据条件来对两个给定表达式中的一个进行求值，形式如下：

> `条件` ? `表达式（条件为真则使用）` : `表达式（条件为假则使用）`

如果条件为真，那么对第一个表达式进行求值并返回结果。否则，对第二个表达式进行求值并返回结果。未使用的表达式不会进行求值。

关于使用三元条件运算符的例子，请参阅 [三元条件运算符](../02_language_guide/02_Basic_Operators.md#ternary-conditional-operator)。

> 三元条件运算符语法

#### conditional-operator {#conditional-operator}
> *三元条件运算符* → **?** [表达式](#expression) **:**

### 类型转换运算符 {#type-casting-operators}
有 4 种类型转换运算符：`is`、`as`、`as? ` 和 `as!`。它们有如下的形式：

> `表达式` is `类型`
> 
> `表达式` as `类型`
> 
> `表达式` as? `类型`
> 
> `表达式` as! `类型`

`is` 运算符在运行时检查表达式能否向下转化为指定的类型，如果可以则返回 `ture`，否则返回 `false`。

`as` 运算符在编译时执行向上转换和桥接。向上转换可将表达式转换成父类的实例而无需使用任何中间变量。以下表达式是等价的：

```swift
func f(any: Any) { print("Function for Any") }
func f(int: Int) { print("Function for Int") }
let x = 10
f(x)
// 打印“Function for Int”

let y: Any = x
f(y)
// 打印“Function for Any”

f(x as Any)
// 打印“Function for Any”
```

桥接可将 Swift 标准库中的类型（例如 `String`）作为一个与之相关的 Foundation 类型（例如 `NSString`）来使用，而不需要新建一个实例。关于桥接的更多信息，请参阅 [*Working with Foundation Types*](https://developer.apple.com/documentation/swift/imported_c_and_objective_c_apis/working_with_foundation_types)。

`as?` 运算符有条件地执行类型转换，返回目标类型的可选值。在运行时，如果转换成功，返回的可选值将包含转换后的值，否则返回 `nil`。如果在编译时就能确定转换一定会成功或是失败，则会导致编译报错。

`as!` 运算符执行强制类型转换，返回目标类型的非可选值。如果转换失败，则会导致运行时错误。表达式 `x as! T` 效果等同于 `(x as? T)!`。

关于类型转换的更多内容和例子，请参阅 [类型转换](../02_language_guide/18_Type_Casting.md)。


#### type-casting-operator {#type-casting-operator}
> 类型转换运算符语法
> 
> *类型转换运算符* → **is** [类型](./03_Types.md#type)
> 
> *类型转换运算符* → **as** [类型](./03_Types.md#type)
> 
> *类型转换运算符* → **as** **?** [类型](./03_Types.md#type)
> 
> *类型转换运算符* → **as** **!** [类型](./03_Types.md#type)

## 基本表达式 {#primary-expressions}
*基本表达式*是最基本的表达式。它们可以单独使用，也可以跟前缀表达式、中置表达式、后缀表达式组合使用。

> 基本表达式语法

#### primary-expression {#primary-expression}
> *基本表达式* → [标识符](./02_Lexical_Structure.md#identifier) [泛型实参子句](./09_Generic_Parameters_and_Arguments.md#generic-argument-clause)<sub>可选</sub>
> 
> *基本表达式* → [字面量表达式](#literal-expression)
> 
> *基本表达式* → [self 表达式](#self-expression)
> 
> *基本表达式* → [父类表达式](#superclass-expression)
> 
> *基本表达式* → [闭包表达式](#closure-expression)
> 
> *基本表达式* → [圆括号表达式](#parenthesized-expression)
> 
> *基本表达式* → [隐式成员表达式](#implicit-member-expression)
> 
> *基本表达式* → [通配符表达式](#wildcard-expression)
> 
> *基本表达式* → [选择器表达式](#selector-expression)
> 
> *基本表达式* → [key-path字符串表达式](#key-patch-string-expression)

### 字面量表达式 {#literal-expression}
*字面量表达式*可由普通字面量（例如字符串或者数字），字典或者数组字面量，或者下面列表中的特殊字面量组成：

字面量 | 类型 | 值
:------------- | :---------- | :----------
`#file` | `String` | 所在的文件名及模块 
`#filePath` | `String` | 所在的文件路径
`#line` | `Int` | 所在的行数
`#column` | `Int` | 所在的列数
`#function` | `String` | 所在的声明的名字
`#dsohandle` | `UnsafeRawPointer` | 所使用的 DSO（动态共享对象）句柄

`#file` 表达式的值的格式是 *module*/*file*，*file* 是表达式所在的文件名，*module* 是文件所所在的模块名。`#filePath` 表达式的字符串值是表达式所在的文件在整个文件系统里的路径。所有这些值可以被 `#sourceLocation` 改变，详见 [行控制语句](./05_Statements.md#line-control-statements)。 

> 注意
>
> 要解析 `#file` 表达式，第一个斜杠（/）之前的文本作为模块名，最后一个斜杠之后的文本作为文件名。将来，该字符串可能包含多个斜杠，例如 `MyModule/some/disambiguation/MyFile.swift`。

对于 `#function`，在函数中会返回当前函数的名字，在方法中会返回当前方法的名字，在属性的存取器中会返回属性的名字，在特殊的成员如 `init` 或 `subscript` 中会返回这个关键字的名字，在某个文件中会返回当前模块的名字。

当其作为函数或者方法的默认参数值时，该字面量的值取决于函数或方法的调用环境。

```swift
func logFunctionName(string: String = #function) {
    print(string)
}
func myFunction() {
    logFunctionName()
}
myFunction() // 打印“myFunction()”
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

Xcode 使用 playground 字面量对程序编辑器中的颜色、文件或者图片创建可交互的展示。在 Xcode 之外的空白文本中，playground 字面量使用一种特殊的字面量语法来展示。

更多关于在 Xcode 中使用 playground 字面量的信息，请参阅 [添加颜色、文件或图片字面量](https://help.apple.com/xcode/mac/current/#/dev4c60242fc)。

> 字面量表达式语法
> 
>
> 
####  literal-expression {#literal-expression}
> 
> *字面量表达式* → [字面量](./02_Lexical_Structure.md#literal)
> 
> *字面量表达式* → [数组字面量](#array-literal) | [字典字面量](#dictionary-literal) | [练习场字面量](#playground-literal)
> 
> *字面量表达式* → **#file** ｜ **#filePath** | **#line** | **#column** | **#function**


> 
####  array-literal {#array-literal}
> 
> *数组字面量* → [[数组字面量项列表](#array-literal-items)<sub>可选</sub> **]**
> 
> 
####  array-literal-items {#array-literal-items}
> 
> *数组字面量项列表* → [数组字面量项](#array-literal-item) **,**<sub>可选</sub> | [数组字面量项](#array-literal-item) **,** [数组字面量项列表](#array-literal-items)
> 
> 
####  array-literal-item {#array-literal-item}
> 
> *数组字面量项* → [表达式](#expression)
> 
>
> 
####  dictionary-literal {#dictionary-literal}
> 
> *字典字面量* → [[字典字面量项列表](#dictionary-literal-items) **]** | **[** **:** **]**
> 
> 
####  dictionary-literal-items {#dictionary-literal-items}
> 
> *字典字面量项列表* → [字典字面量项](#dictionary-literal-item) **,**<sub>可选</sub> | [字典字面量项](#dictionary-literal-item) **,** [字典字面量项列表](#dictionary-literal-items)
> 
> 
####  dictionary-literal-item {#dictionary-literal-item}
> 
> *字典字面量项* → [表达式](#expression) **:** [表达式](#expression)。
> 
> 
####  playground-literal {#playground-literal}
> 
> *playground 字面量* → **#colorLiteral ( red :  [表达式](#expression) , green :[表达式](#expression) [表达式](#e[*表达式*](#expression) xpression) ,  blue :[表达式](#expression) , alpha : [表达式](#expression) )**
> 
> *playground 字面量* → **#fileLiteral ( resourceName : [表达式](#expression) )**
> 
> ####  playground 字面量* → **#imageLiteral ( resourceName : [表达式](#expression) )**self-expression {#self-expression}

### Self 表达式

`self` 表达式是对当前类型或者当前实例的显式引用，它有如下形式：

> self
> 
> self.`成员名称`
> 
> self[`下标索引`]
> 
> self(`构造器参数`)
> 
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

> Self 表达式语法

#### self-expression {#self-expression}
> *self 表达式* → **self**  | [self 方法表达式](#self-method-expression) ｜ [self 下标表达式](#self-subscript-expression) | [self 构造器表达式](#self-initializer-expression)
> 
>

#### self-method-expression {#self-method-expression}
> *self 方法表达式* → **self** **.** [标识符](./02_Lexical_Structure.md#identifier)

#### self-subscript-expression {#self-subscript-expression}
> *self 下标表达式* → **self** **[** [函数调用参数表](#function-call-argument-list­) **]**

#### self-initializer-expression {#self-initializer-expression}
> *self 构造器表达式* → **self** **.** **init**

### 父类表达式 {#superclass-expression}
*父类*表达式可以使我们在某个类中访问它的父类，它有如下形式：

> super.`成员名称`
> 
> super[`下标索引`]
> 
> super.init(`构造器参数`)

第一种形式用来访问父类的某个成员，第二种形式用来访问父类的下标，第三种形式用来访问父类的构造器。

子类可以通过父类表达式在它们的成员、下标和构造器中使用父类中的实现。

> 父类表达式语法

#### superclass-expression {#superclass-expression}
> *父类表达式* → [父类方法表达式](#superclass-method-expression) | [父类下标表达式](#superclass-subscript-expression) | [父类构造器表达式](#superclass-initializer-expression)

#### superclass-method-expression {#superclass-method-expression}
> *父类方法表达式* → **super** **.** [标识符](./02_Lexical_Structure.md#identifier)

#### superclass-subscript-expression {#superclass-subscript-expression}
> *父类下标表达式* → **super** [[函数调用参数表](#function-call-argument-list­) **]**

#### superclass-initializer-expression {#superclass-initializer-expression}
> *父类构造器表达式* → **super** **.** **init**

### 闭包表达式 {#closure-expression}
*闭包表达式*会创建一个闭包，在其他语言中也叫 *lambda* 或*匿名*函数。跟函数一样，闭包包含了待执行的代码，不同的是闭包还会捕获所在环境中的常量和变量。它的形式如下：

```swift
{ (parameters) -> return type in
    statements
}
```

闭包的参数声明形式跟函数一样，请参阅 [函数声明](./06_Declarations.md#function-declaration)。

在闭包表达式中写入 `throws` 或 `async` 将显式地将闭包标记为丢掷或异步的。

```swift
{ (parameters) async throws -> return type in
	statements
}
```

如果闭包的主体中含有 try 表达式，则认为该闭包会引发异常。同理，若闭包主体含有 await 表达式，则认为该闭包是异步的。

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

关于如何将闭包作为参数来传递的内容，请参阅 [函数调用表达式](#function-call-expression)。

使用闭包表达式时，可以不必将其存储在一个变量或常量中，例如作为函数调用的一部分来立即使用一个闭包。在上面的例子中，传入 `myFunction` 的闭包表达式就是这种立即使用类型的闭包。因此，一个闭包是否逃逸与其使用时的上下文相关。一个会被立即调用或者作为函数的非逃逸参数传递的闭包表达式是非逃逸的，否则，这个闭包表达式是逃逸的。

关于逃逸闭包的内容，请参阅 [逃逸闭包](../02_language_guide/07_Closures.md#escaping-closures)。

## 捕获列表 {#capture-lists}
默认情况下，闭包会捕获附近作用域中的常量和变量，并使用强引用指向它们。你可以通过一个*捕获列表*来显式指定它的捕获行为。

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
// 打印“0 10”
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
// 打印“10 10”
```

如果捕获列表中的值是类类型，你可以使用 `weak` 或者 `unowned` 来修饰它，闭包会分别用弱引用和无主引用来捕获该值。

```swift
myFunction { print(self.title) }                    // 隐式强引用捕获
myFunction { [self] in print(self.title) }             // 显式强引用捕获
myFunction { [weak self] in print(self!.title) }   // 弱引用捕获
myFunction { [unowned self] in print(self.title) } // 无主引用捕获
```

在捕获列表中，也可以将任意表达式的值绑定到一个常量上。该表达式会在闭包被创建时进行求值，闭包会按照指定的引用类型来捕获表达式的值。例如：

```swift
// 以弱引用捕获 self.parent 并赋值给 parent
myFunction { [weak parent = self.parent] in print(parent!.title) }
```

关于闭包表达式的更多信息和例子，请参阅 [闭包表达式](../02_language_guide/07_Closures.md#closure-expressions)。关于捕获列表的更多信息和例子，请参阅 [解决闭包引起的循环强引用](../02_language_guide/24_Automatic_Reference_Counting.md#resolving-strong-reference-cycles-for-closures)。

> 闭包表达式语法
>
> 
>
> ####  closure-expression {#closure-expression}
>
> *闭包表达式* → **{** [特性](#attribute)<sub>可选</sub> [闭包签名](#closure-signature)<sub>可选</sub> [语句](#statements) **}**
>
> ####  closure-signature {#closure-signature}
>
> *闭包签名* → [捕获列表](#capture-list)<sub>可选</sub> [闭包形参子句](#closure-parameter-clause)  **async**<sub>可选</sub> **throws**<sub>可选</sub> [函数结果](./06_Declarations.md#function-result)<sub>可选</sub> **in** 
>
> *闭包签名* → [捕获列表](#capture-list) **in**
>
>  
> ####  closure-parameter-clause {#closure-parameter-clause}
> 
> *闭包形参子句*  → **（ ）**｜**（**[闭包形参列表](#closure-parameter-list)**)**|[标识符列表](./02_Lexical_Structure.md#identifier-list)
>
> ####  closure-parameter-list {#closure-parameter-list}
> 
> *闭包形参列表* → [闭包形参](#closure-parameter) ｜[闭包形参](#closure-parameter) **,** [闭包形参列表](#closure-parameter-list)
>
> #### closure-parameter{#closure-parameter}
> 
> *闭包形参* → [闭包形参名字](#closure-parameter-name) [类型注解](./03_Types.md#type-annotation)<sub>可选</sub>
> 
> *闭包形参* → [闭包形参名字](#closure-parameter-name) [类型注解](./03_Types.md#type-annotation) **...**
> 
> #### closure-parameter-name{#closure-parameter-name}
> 
> *闭包形参名字* → [标识符](./02_Lexical_Structure.md#identifier)
>
> #### closure-list{#closure-list}
> 
> *捕获列表* → **[** [捕获列表项列表](#capture-list-items) **]**
> 
>####  capture-list-items {#capture-list-items}
> 
>*捕获列表项列表* → [捕获列表项](#capture-list-item) | [捕获列表项](#capture-list-item) **,** [捕获列表项列表](#capture-list-items)
> 
>####  capture-list-item {#capture-list-item}
> 
>*捕获列表项* → [捕获说明符](#capture-specifier)<sub>可选</sub>  [标识符](./02_Lexical_Structure.md#identifier)
>
> *捕获列表项* → [捕获说明符](#capture-specifier)<sub>可选</sub>  [标识符](./02_Lexical_Structure.md#identifier) **=** [表达式](#expression)
> 
> *捕获列表项* → [捕获说明符](#capture-specifier)<sub>可选</sub>  [标识符](./02_Lexical_Structure.md#identifier) [Self 表达式](##self-expression)
> 
>####  capture-specifier {#capture-specifier}
> 
>*捕获说明符* → **weak** | **unowned** | **unowned(safe)** | **unowned(unsafe)**

### 隐式成员表达式 {#implicit-member-expression}
若类型可被推断出来，可以使用*隐式成员表达式*来访问某个类型的成员（例如某个枚举成员或某个类型方法），形式如下：

> .`成员名称`

例如：

```swift
var x = MyEnumeration.someValue
x = .anotherValue
```

如果推断的是可选类型，可以在隐式成员表达式里使用不可选类型的成员。

```swift
var someOptional: MyEnumeration? = .someValue
```

隐式成员表达式可以跟在后缀运算符或者其他在 [后缀表达式](#postfix-expressions) 里介绍的语法后面。这被称为 *链式隐式成员表达式*。尽管链式后缀表达式大多都是相同类型，但其实只需要整个链式成员表达式可以转换为上下文的类型就行了。更具体的，如果隐式类型是可选的，则可以使用非可选类型的值，如果隐式类型是类类型，则可以使用其子类的值。例如：

```swift
class SomeClass {
    static var shared = SomeClass()
    static var sharedSubclass = SomeSubclass()
    var a = AnotherClass()
}
class SomeSubclass: SomeClass { }
class AnotherClass {
    static var s = SomeClass()
    func f() -> SomeClass { return AnotherClass.s }
}
let x: SomeClass = .shared.a.f()
let y: SomeClass? = .shared
let z: SomeClass = .sharedSubclass
```

上面的代码中，`x` 的类型和上下文的隐式类型完全匹配，`y` 的类型是从 `SomeClass` 转换成 `SomeClass?`，`z` 的类型是从 `SomeSubclass` 转换成 `SomeClass`。


> 隐式成员表达式语法

#### implicit-member-expression {#implicit-member-expression}
> *隐式成员表达式* → **.** [标识符](./02_Lexical_Structure.md#identifier)

### 圆括号表达式 {#parenthesized-expression}
*圆括号表达式*是由圆括号包围的表达式。你可以用圆括号说明成组的表达式的先后操作。成组的圆括号不会改变表达式的类型 - 例如 `(1)` 的类型就是简单的 `Int`。

> 圆括号表达式语法

#### parenthesized-expression {#parenthesized-expression}
> *圆括号表达式* → **( [表达式](#expression) )**

### 元组表达式 {#Tuple-Expression}
*元组表达式*由圆括号和其中多个逗号分隔的子表达式组成。每个子表达式前面可以有一个标识符，用冒号隔开。元组表达式形式如下：

> (`标识符 1` : `表达式 1`, `标识符 2` : `表达式 2`, `...`)

元组表达式里的每一个标识符在表达式作用域里必须是唯一的。在嵌套的元组表达式中，同嵌套层级里的标识符也必须是唯一的。例如，`(a: 10, a: 20)` 是不合法的，因为标签 `a` 在同一层级出现了两次。然而，`(a: 10, b: (a: 1, x: 2))` 是合法的，尽管 `a` 出现了两次，但有一次在外层元组里，一次在内层元组里。

元组表达式可以一个表达式都没有，也可以包含两个或是更多的表达式。单个表达式用括号括起来就是括号表达式了。

> 注意
> 
>
> 在 Swift 中，空的元组表达式和空的元组类型都写作 `()`。由于 `Void` 是 `()` 的类型别名，因此可以使用它来表示空的元组类型。虽然如此，`Void` 就像所有的类型别名一样，永远是一个类型——不能表示空的元组表达式。


> 元组表达式语法

#### tuple-expression {#tuple-expression}
> *元组表达式* → **( )** | **(**[元组元素](#tuple-element)， [元组元素列表](#tuple-element-list) **)**

#### tuple-element-list {#tuple-element-list}
> *元组元素列表* → [元组元素](#tuple-element) | [元组元素](#tuple-element) **,** [元组元素列表](#tuple-element-list)

#### tuple-element {#tuple-element}
> *元组元素* → [表达式](#expression) | [标识符](#identifier) **:** [表达式](#expression)

### 通配符表达式 {#wildcard-expression}
*通配符表达式*可以在赋值过程中显式忽略某个值。例如下面的代码中，`10` 被赋值给 `x`，而 `20` 则被忽略：

```swift
(x, _) = (10, 20)
// x 为 10，20 被忽略
```

> 通配符表达式语法

#### wildcard-expression {#wildcard-expression}
> *通配符表达式* → **_**


### Key-path 表达式 {#key-path-expression}
Key-path 表达式引用一个类型的属性或下标。在动态语言中使场景可以使用 Key-path 表达式，例如观察键值对。格式为：

> **\类型名.路径**

*类型名*是一个具体类型的名称，包含任何泛型参数，例如 `String`、`[Int]` 或 `Set<Int>`。

*路径*可由属性名称、下标、可选链表达式或者强制解包表达式组成。以上任意 key-path 组件可以以任何顺序重复多次。

在编译期，key-path 表达式会被一个 [KeyPath](https://developer.apple.com/documentation/swift/keypath) 类的实例替换。

对于所有类型，都可以通过传递 key-path 参数到下标方法 `subscript(keyPath:)` 来访问它的值。例如：

```swift
struct SomeStructure {
    var someValue: Int
}

let s = SomeStructure(someValue: 12)
let pathToProperty = \SomeStructure.someValue

let value = s[keyPath: pathToProperty]
// 值为 12
```

在一些可以通过类型推断来确定所访问的具体类型的上下文中，可以省略 key-path 前的类型名字。下面的代码使用 `\.someProperty` 代替了 `SomeClass.someProperty` ：

```swift
class SomeClass: NSObject {
    @objc dynamic var someProperty: Int
    init(someProperty: Int) {
        self.someProperty = someProperty
    }
}

let c = SomeClass(someProperty: 10)
c.observe(\.someProperty) { object, change in
    // ...
}
```

使用 `self` 作为路径可以创建一个恒等 key path (`\.self`)。恒等 key path 可以作为整个实例的引用，因此你仅需一步操作便可以利用它来访问以及修改其存储的所有数据。例如：

```swift
var compoundValue = (a: 1, b: 2)
// 等价于 compoundValue = (a: 10, b: 20)
compoundValue[keyPath: \.self] = (a: 10, b: 20)
```

通过点语法，可以让路径包含多个属性名称，以此来访问某实例的属性的属性。下面的代码使用 key-path 表达式 `\OuterStructure.outer.someValue` 来访问 `OuterStructure` 类型中 `outer` 属性的 `someValue` 属性。

```swift
struct OuterStructure {
    var outer: SomeStructure
    init(someValue: Int) {
        self.outer = SomeStructure(someValue: someValue)
    }
}

let nested = OuterStructure(someValue: 24)
let nestedKeyPath = \OuterStructure.outer.someValue

let nestedValue = nested[keyPath: nestedKeyPath]
// nestedValue 的值为 24
```

路径中也可以包含使用中括号的下标访问，只要下标访问的参数类型满足 `Hashable` 协议即可。下面的例子在 key path 中使用了下标来访问数组的第二个元素。

```swift
let greetings = ["hello", "hola", "bonjour", "안녕"]
let myGreeting = greetings[keyPath: \[String].[1]]
// myGreeting 的值为 'hola'
```

下标访问中使用的值可以是一个变量或者字面量，并且 key-path 表达式会使用值语义来捕获此值。下面的代码在 key-path 表达式和闭包中都使用了 `index` 变量来访问 `greetings` 数组的第三个元素。当 `index` 被修改时，key-path 表达式仍旧引用数组第三个元素，而闭包则使用了新的索引值。

```swift
var index = 2
let path = \[String].[index]
let fn: ([String]) -> String = { strings in strings[index] }

print(greetings[keyPath: path])
// 打印 "bonjour"
print(fn(greetings))
// 打印 "bonjour"

// 将 'index' 设置为一个新的值不会影响到 'path'
index += 1
print(greetings[keyPath: path])
// 打印 "bonjour"

// 'fn' 闭包使用了新值。
print(fn(greetings))
// 打印 "안녕"
```

路径可以使用可选链和强制解包。下面的代码在 key path 中使用了可选链来访问可选字符串的属性。

```swift
let firstGreeting: String? = greetings.first
print(firstGreeting?.count as Any)
// 打印 "Optional(5)"

// 使用 key path 实现同样的功能
let count = greetings[keyPath: \[String].first?.count]
print(count as Any)
// 打印 "Optional(5)"
```

可以混合使用各种 key path 组件来访问一些深度嵌套类型的值。下面的代码通过组合不同的组件，使用 key-path 表达式访问了一个字典数组中不同的值和属性。

```swift
let interestingNumbers = ["prime": [2, 3, 5, 7, 11, 13, 17],
                          "triangular": [1, 3, 6, 10, 15, 21, 28],
                          "hexagonal": [1, 6, 15, 28, 45, 66, 91]]
print(interestingNumbers[keyPath: \[String: [Int]].["prime"]] as Any)
// 打印 "Optional([2, 3, 5, 7, 11, 13, 17])"
print(interestingNumbers[keyPath: \[String: [Int]].["prime"]![0]])
// 打印 "2"
print(interestingNumbers[keyPath: \[String: [Int]].["hexagonal"]!.count])
// 打印 "7"
print(interestingNumbers[keyPath: \[String: [Int]].["hexagonal"]!.count.bitWidth])
// 打印 "64"
```

你可以在平时提供函数或者闭包的上下文里使用 key path 表达式。特别地，你可以用根类型是 `SomeType` 和路径产生 `Value` 类型值的 key path 表达式来替换类型是 `(SomeType) -> Value` 的函数或者闭包。

```swift
struct Task {
    var description: String
    var completed: Bool
}
var toDoList = [
    Task(description: "Practice ping-pong.", completed: false),
    Task(description: "Buy a pirate costume.", completed: true),
    Task(description: "Visit Boston in the Fall.", completed: false),
]

// 下面两种写法是等价的。
let descriptions = toDoList.filter(\.completed).map(\.description)
let descriptions2 = toDoList.filter { $0.completed }.map { $0.description }
```

任何 key path 表达式的副作用发生的关键在于表达式在哪里被执行。例如，如果你在 key path 表达式中的一个下标里使用函数调用，该函数只会在表达式计算的时候调用一次，而不是每次这个 key path 被使用的时候。

```swift
func makeIndex() -> Int {
    print("Made an index")
    return 0
}
// 下面这行调用 makeIndex()。
let taskKeyPath = \[Task][makeIndex()]
// 打印 "Made an index"

// 使用 taskKeyPath 不会再次调用 makeIndex()。
let someTask = toDoList[keyPath: taskKeyPath]
```

关于更多如何使用 key path 与 Objective-C APIs 交互的信息，请参阅 [在 Swift 中使用 Objective-C 运行时特性](https://developer.apple.com/documentation/swift/using_objective_c_runtime_features_in_swift)。关于更多 key-value 编程和 key-value 观察的信息，请参阅 [Key-Value 编程](https://developer.apple.com/library/content/documentation/Cocoa/Conceptual/KeyValueCoding/index.html#//apple-ref/doc/uid/10000107i) 和 [Key-Value 观察编程](https://developer.apple.com/library/content/documentation/Cocoa/Conceptual/KeyValueObserving/KeyValueObserving.html#//apple-ref/doc/uid/10000177i)。

> key-path 表达式语法
> 
>
> 
####  key-path-expression {#key-path-expression}
> 
> *key-path 表达式* → **\\**  [类型](./03_Types.md#type)<sub>可选</sub>  **.**  [多个 key-path 组件](#key-path-components)
> 
> 
####  key-path-components {#key-path-components}
> 
> *多个 key-path 组件* → [key-path 组件](#key-path-component) | [key-path 组件](#key-path-component) **.** [多个 key-path 组件](#key-path-components)
> 
> 
####  key-path-component {#key-path-component}
> 
> *key-path 组件* →  [标识符](./02_Lexical_Structure.md#identifier) [多个 key-path 后缀](#key-path-postfixes)<sub>可选<sub> | [多个 key-path 后缀](#key-path-postfixes)
> 
> 
####  key-path-postfixes {#key-path-postfixes}
> 
> 
####  *多个 key-path 后缀* →  [key-path 后缀](#key-path-postfix) [多个 key-path 后缀](#key-path-postfixes)<sub>可选<sub> key-path-postfixes {#key-path-postfixes}
> 
> *key-path 后缀* → **?** | **!** | **self** | **\[** [函数调用参数表](#function-call-argument-list) **\]** 



### 选择器表达式 {#selector-expression}
*选择器表达式*可以让你通过选择器来引用在 Objective-C 中方法（method）和属性（property）的 setter 和 getter 方法。

> \#selector(方法名)
> 
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
let selectorForMethod = #selector(SomeClass.doSomething(-:))
let selectorForPropertyGetter = #selector(getter: SomeClass.property)
```

当为属性的 getter 创建选择器时，属性名可以是变量属性或者常量属性的引用。但是当为属性的 setter 创建选择器时，属性名只可以是对变量属性的引用。

方法名称可以包含圆括号来进行分组，并使用 as 操作符来区分具有相同方法名但类型不同的方法，例如:

```swift
extension SomeClass {
    @objc(doSomethingWithString:)
    func doSomething(_ x: String) { }
}
let anotherSelector = #selector(SomeClass.doSomething(-:) as (SomeClass) -> (String) -> Void)
```

由于选择器是在编译时创建的，因此编译器可以检查方法或者属性是否存在，以及是否在运行时暴露给了 Objective-C 。

> 注意
> 
> 虽然方法名或者属性名是个表达式，但是它不会被求值。

更多关于如何在 Swift 代码中使用选择器来与 Objective-C API 进行交互的信息，请参阅 [在 Swift 中使用 Objective-C 运行时特性](https://developer.apple.com/documentation/swift/using_objective_c_runtime_features_in_swift)。

> 选择器表达式语法

#### selector-expression {#selector-expression}
> *选择器表达式* → __#selector-- **(** [表达式](#expression) **)**
> 
> *选择器表达式* → __#selector-- **(** [getter:表达式](#expression) **)**
> 
> *选择器表达式* → __#selector-- **(** [setter:表达式](#expression) **)**

## Key-path 字符串表达式 {#key-path-string-expressions}
key-path 字符串表达式可以访问一个引用 Objective-C 属性的字符串，通常在 key-value 编程和 key-value 观察 APIs 中使用。其格式如下：

> `#keyPath` ( `属性名` )

属性名必须是一个可以在 Objective-C 运行时使用的属性的引用。在编译期，key-path 字符串表达式会被一个字符串字面量替换。例如：

```swift
class SomeClass: NSObject {
    @objc var someProperty: Int
    init(someProperty: Int) {
        self.someProperty = someProperty
    }
}

let c = SomeClass(someProperty: 12)
let keyPath = #keyPath(SomeClass.someProperty)

if let value = c.value(forKey: keyPath) {
    print(value)
}
// 打印 "12"
```

当在一个类中使用 key-path 字符串表达式时，可以省略类名，直接使用属性名来访问这个类的某个属性。

```swift
extension SomeClass {
    func getSomeKeyPath() -> String {
> 
        return #keyPath(someProperty)
    }
}
print(keyPath == c.getSomeKeyPath())
// 打印 "true"
```

由于 key-path 字符串表达式在编译期才创建，编译期可以检查属性是否存在，以及属性是否暴露给 Objective-C 运行时。

关于更多如何使用 key path 与 Objective-C APIs 交互的信息，请参阅 [在 Swift 中使用 Objective-C 运行时特性](https://developer.apple.com/documentation/swift/using_objective_c_runtime_features_in_swift)。关于更多 key-value 编程和 key-value 观察的信息，请参阅 [Key-Value 编程](https://developer.apple.com/library/content/documentation/Cocoa/Conceptual/KeyValueCoding/index.md#//apple-ref/doc/uid/10000107i) 和 [Key-Value 观察编程](https://developer.apple.com/library/content/documentation/Cocoa/Conceptual/KeyValueObserving/KeyValueObserving.md#//apple-ref/doc/uid/10000177i)。

> 注意
> 
>
> 尽管*属性名*是一个表达式，但它永远不会被求值

> key-path 字符串表达式语法
> 
> 
####  key-path-string-expression {#key-path-string-expression}
> 
> *key-path 字符串表达式* → **#keyPath (** [表达式](#expression)  **)**

## 后缀表达式 {#postfix-expressions}
*后缀表达式*就是在某个表达式的后面运用后缀运算符或其他后缀语法。从语法构成上来看，基本表达式也是后缀表达式。

关于这些运算符的更多信息，请参阅 [基本运算符](../02_language_guide/02_Basic_Operators.md) 和 [高级运算符](../02_language_guide/27_Advanced_Operators.md)。

关于 Swift 标准库提供的运算符的更多信息，请参阅 [运算符定义](https://developer.apple.com/documentation/swift/operator_declarations)。

> 后缀表达式语法

#### postfix-expression {#postfix-expression}
> *后缀表达式* → [基本表达式](#primary-expression)
> 
> *后缀表达式* → [后缀表达式](#postfix-expression) [后缀运算符](./02_Lexical_Structure.md#postfix-operator)
> 
> *后缀表达式* → [函数调用表达式](#function-call-expression)
> 
> *后缀表达式* → [构造器表达式](#initializer-expression)
> 
> *后缀表达式* → [显式成员表达式](#explicit-member-expression)
> 
> *后缀表达式* → [后缀 self 表达式](#postfix-self-expression)
> 
> *后缀表达式* → [dynamicType 表达式](#dynamic-type-expression)
> 
> *后缀表达式* → [下标表达式](#subscript-expression)
> 
> *后缀表达式* → [强制取值表达式](#forced-value-expression)
> 
> *后缀表达式* → [可选链表达式](#optional-chaining-expression)

### 函数调用表达式 {#function-call-expression}
*函数调用表达式*由函数名和在括号里以逗号分隔的参数列表组成。函数调用表达式形式如下：

> `函数名`(`参数 1`, `参数 2`)

函数名可以是值为函数类型的任意表达式。

如果函数声明中指定了形参的名字，那么在调用的时候也必须得写出来，并通过冒号（`:`）分隔。这种函数调用表达式具有以下形式：

> `函数名`(`参数名 1`: `参数 1`, `参数名 2`: `参数 2`)

函数调用表达式可以在函数调用表达式的尾部（右圆括号之后）加上多个尾随闭包，该闭包会作为函数的实参，在括号中最后一个实参后面添加。第一个闭包表达式时没有实参签名的，其他任意闭包表达式签名都有实参标签。如下两种写法是等价的，区别在是否使用尾随闭包语法：

```swift
// someFunction 接受整型和闭包的实参
someFunction(x, f: {$0 == 13})
someFunction(x) {$0 == 13}

// anotherFunction 接受一个整型和两个闭包的实参
anotherFunction(x: x, f: { $0 == 13 }, g: { print(99) })
anotherFunction(x: x) { $0 == 13 } g: { print(99) }
```

如果闭包是该函数的唯一实参，那么圆括号可以省略。

```swift
// someFunction 只接受一个闭包参数
myData.someMethod() {$0 == 13}
myData.someMethod {$0 == 13}
```

为了支持实参中的尾随闭包，编译器从左到右检查形参列表，如下所示：

| 尾随闭包 | 形参           | 行为                                                         |
| -------- | -------------- | ------------------------------------------------------------ |
| 有标签   | 有标签         | 如果标签相同，闭包和形参匹配，否则跳过该形参                 |
| 有标签   | 无标签         | 跳过该形参                                                   |
| 无标签   | 有标签或无标签 | 如果形参在结构上类似于下面定义的函数类型，和闭包匹配，否则跳过该形参 |

尾随闭包作为其匹配形参的实参传递。

在扫描过程被跳过的形参不传递实参——例如，它们使用的是默认形参。当匹配后，扫描会继续下一个尾随闭包和形参。匹配过程结束后，所有的尾随闭包必须有对应的匹配。

如果形参不是输入输出参数，并且类似下面的情况，则算是*结构上类似*函数类型：

* 函数类型的形参，例如 `(Bool) -> Int`
* 函数类型表达式的自动闭包形参，例如 `@autoclosure () -> ((Bool) -> Int)`
* 元素是函数类型的可变参数，例如 `((Bool) -> Int)...`
* 单层或多层可选类型的形参，例如 `Optional<(Bool) -> Int>`
* 由上面这些类型组合而成的形参，例如 `(Optional<(Bool) -> Int>)...`

尾随闭包和结构上类似函数类型的形参匹配，但它并不是函数，所以闭包会按需包装。例如，如果形参类是是可选类型，闭包会自动包装成 `Optional`。

为了简化 Swift 5.3 之前版本（从右到左匹配）的代码迁移 —— 编译器会同时检查从左到右和从右到左的顺序。如果不同的扫描方向产生了不同的结果，编译器则使用旧的从右到左的顺序，并生成警告。Swift 的未来版本将都使用从左到右的顺序。

```swift
typealias Callback = (Int) -> Int
func someFunction(firstClosure: Callback? = nil,
                  secondClosure: Callback? = nil) {
    let first = firstClosure?(10)
    let second = secondClosure?(20)
    print(first ?? "-", second ?? "-")
}

someFunction()  // 打印 "- -"
someFunction { return $0 + 100 }  // 歧义
someFunction { return $0 } secondClosure: { return $0 }  // 打印 "10 20"
```

在上面的例子中，Swift 5.3 中被标记为“歧义”的函数调用会打印”- 120“并产生一个编辑器警告。未来版本的 Swift 会打印”110 -“。

如 [特殊名称方法](./06_Declarations.md#methods-with-special-names) 所述，通过声明几种方法中的一种，类、结构体或枚举类型可以为函数调用语法启用语法糖。

### 指针类型的隐式转换{#implicit-conversion-to-a-pointer}

在函数调用表达式里，如果实参和形参的类型不一致，编译器会尝试通过下面的规则进行隐式转换来匹配类型：

* 输入输出的 `SomeType` 可以转换为 `UnsafePointer<SomeType>` 或者 `UnsafeMutablePointer<SomeType>` 
* 输入输出的 `Array<SomeType>` 可以转换为 `UnsafePointer<SomeType>` 或者 `UnsafeMutablePointer<SomeType>`
* `Array<SomeType>` 可以转换为 `UnsafePointer<SomeType>`
* `String` 可以转换为 `UnsafePointer<CChar>`

下面两个函数调用是等价的：

```swift
func unsafeFunction(pointer: UnsafePointer<Int>) {
    // ...
}
var myNumber = 1234

unsafeFunction(pointer: &myNumber)
withUnsafePointer(to: myNumber) { unsafeFunction(pointer: $0) }
```

隐式转换创建的指针仅在函数调用期间有效。为了避免发生未定义行为，确保代码在函数调用结束后没有继续持有这些指针。

> 注意
>
> 当将数组隐式转换为不安全指针时，Swift 会按需转换或复制数组来确保数组的存储是连续的。例如，可以用此语法将没有约定存储 API 的 `NSArray` 子类桥接到 `Array` 的数组。如果能确保数组的存储是连续的，就不需要隐式转换来做这个工作，这种情况下可以用 `ContiguousArray` 代替 `Array`。

使用 `&` 代替类似 `withUnsafePointer(to:)` 的显式函数可以在调用底层 C 函数的可读性更高，特别是当函数传入多个指针实参时。如果是其他 Swift 代码调用函数，避免使用 `&` 代替显式的不安全 API。

> 函数调用表达式语法
>
>
> ####  function-call-expression {#function-call-expression}
>
> *函数调用表达式* → [后缀表达式](#postfix-expression) [函数调用参数子句](#function-call-argument-clause)
>
> *函数调用表达式* → [后缀表达式](#postfix-expression) [函数调用参数子句](#function-call-argument-clause)<sub>可选</sub> [尾随闭包](#trailing-closure)
>
> ####  function-call-argument-clause {#function-call-argument-clause}
>
> *函数调用参数子句* → **(**  **)**  | **(** [函数调用参数表](#function-call-argument-list) **)**
>
> ####  function-call-argument-list {#function-call-argument-list}
>
> *函数调用参数表* → [函数调用参数](#function-call-argument) | [函数调用参数](#function-call-argument) **,** [*函数调用参数表*](#function-call-argument-list)
>
>
> ####  function-call-argument {#function-call-argument}
>
> *函数调用参数* → [表达式](#expression) | [标识符](./02_Lexical_Structure.md#identifier) **:** [表达式](#expression)
>
> *函数调用参数* → [运算符](./02_Lexical_Structure.md#operator) | [标识符](./02_Lexical_Structure.md#identifier) **:** [运算符](./02_Lexical_Structure.md#operator)
>
> ####  trailing-closure {#trailing-closure}
>
> *尾随闭包* → [闭包表达式](#closure-expression) [标签尾随闭包集](#labeled-trailing-closures)<sub>可选</sub>
>
> #### labeled-trailing-closures {#labeled-trailing-closures}
>
> *标签尾随闭包集*  → [标签尾随闭包](#labeled-trailing-closure) [标签尾随闭包集](#labeled-trailing-closures)<sub>可选</sub>
>
> #### labeled-trailing-closure {#labeled-trailing-closure}
>
> *标签尾随闭包* → [标识符](./02_Lexical_Structure.md#identifier) **:** [闭包表达式](#closure-expression) 

### 构造器表达式 {#initializer-expression}

*构造器表达式*用于访问某个类型的构造器，形式如下：

> `表达式`.init(`构造器参数`)

你可以在函数调用表达式中使用构造器表达式来初始化某个类型的新实例。也可以使用构造器表达式来代理给父类构造器。

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
// 打印“123”
```

如果通过名字来指定某个类型，可以不用构造器表达式而直接使用类型的构造器。在其他情况下，你必须使用构造器表达式。

```swift
let s1 = SomeType.init(data: 3) // 有效
let s2 = SomeType(data: 1)      // 有效

let s4 = someValue.dynamicType(data: 5)      // 错误
let s3 = someValue.dynamicType.init(data: 7) // 有效
```

> 构造器表达式语法

#### initializer-expression {#initializer-expression}
> *构造器表达式* → [后缀表达式](#postfix-expression) **.** **init**
> 
> *构造器表达式* → [后缀表达式](#postfix-expression) **.** **init** **(** [参数名称](#argument-names) **)**

### 显式成员表达式 {#explicit-member-expression}
*显式成员表达式*允许我们访问命名类型、元组或者模块的成员，其形式如下：

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

使用 `dynamicMemberLookup` 属性声明的类型包含可以在运行时查找的成员，具体请参阅 [属性](./07_Attributes.md)。

为了区分只有参数名有所不同的方法或构造器，在圆括号中写出参数名，参数名后紧跟一个冒号，对于没有参数名的参数，使用下划线代替参数名。而对于重载方法，则需使用类型注解进行区分。例如：

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

你可以将这种多行链式语法与编译器控制语句结合，以控制调用每个方法的时间。例如，以下代码在 iOS 上应用了不同的过滤规则：

```swift
let numbers = [10, 20, 33, 43, 50]
#if os(iOS)
.filter { $0 < 40}
#else
.filter {$0 > 25}
#endif
```

在 `#if`、`#endif` 和其它编译指令之间的条件编译块可以包含一个隐式成员表达式，后跟零个或多个后缀，以形成一个后缀表达式。这些条件编译块还可以包含另一个条件编译块，或者这些表达式和块的组合体。

除了顶级代码（top-level code）以外，你还可以在任何能编写显式成员表达式的地方使用上述语法。

在条件编译块中，编译指令 `#if` 的分支必须包含至少一个表达式，其它分支可以为空。

> 显式成员表达式语法

#### explicit-member-expression {#explicit-member-expression}
> *显式成员表达式* → [后缀表达式](#postfix-expression) **.** [十进制数字](./02_Lexical_Structure.md#decimal-digit)
> 
> *显式成员表达式* → [后缀表达式](#postfix-expression) **.** [标识符](./02_Lexical_Structure.md#identifier) [泛型实参子句](./09_Generic_Parameters_and_Arguments.md#generic-argument-clause)<sub>可选</sub><br/>
> 
> *显式成员表达式* → [后缀表达式](#postfix-expression) **.** [标识符](./02_Lexical_Structure.md#identifier) **(** [参数名称](#argument-names) **)**

> *显示成员表达式* → [后缀表达式](#postfix-expression) [条件编译块](#conditional-compilation-block)

#### argument-names {#argument-names}
> *参数名称* → [参数名](#argument-name) [参数名称](#argument-names)<sub>可选</sub><br/>

#### argument-name {#argument-name}
> *参数名* → [标识符](./02_Lexical_Structure.md#identifier) **:**

### 后缀 self 表达式 {#postfix-self-expression}
后缀 `self` 表达式由某个表达式或类型名紧跟 `.self` 组成，其形式如下：

> `表达式`.self
> 
> `类型`.self

第一种形式返回表达式的值。例如：`x.self` 返回 `x`。

第二种形式返回相应的类型。我们可以用它来获取某个实例的类型作为一个值来使用。例如，`SomeClass.self` 会返回 `SomeClass` 类型本身，你可以将其传递给相应函数或者方法作为参数。

> 后缀 self 表达式语法

#### postfix-self-expression {#postfix-self-expression}
> *后缀 self 表达式* → [后缀表达式](#postfix-expression) **.** **self**


### 下标表达式 {#subscript-expression}
可通过*下标表达式*访问相应的下标，形式如下：

> `表达式`[`索引表达式`]

要获取下标表达式的值，可将索引表达式作为下标表达式的参数来调用下标 getter。下标 setter 的调用方式与之一样。

关于下标的声明，请参阅 [协议下标声明](./06_Declarations.md#protocol-subscript-declaration)。

> 下标表达式语法

#### subscript-expression {#subscript-expression}
> *下标表达式* → [后缀表达式](#postfix-expression) **[** [表达式列表](#expression-list) **]**

### 强制取值表达式 {#forced-Value-expression}
当你确定可选值不是 `nil` 时，可以使用*强制取值表达式*来强制解包，形式如下：

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

#### forced-value-expression {#forced-value-expression}
> *强制取值表达式* → [后缀表达式](#postfix-expression) **!**

### 可选链表达式 {#optional-chaining-expression}
*可选链表达式*提供了一种使用可选值的便捷方法，形式如下：

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

#### optional-chaining-expression {#optional-chaining-expression}
> *可选链表达式* → [后缀表达式](#postfix-expression) **?**
