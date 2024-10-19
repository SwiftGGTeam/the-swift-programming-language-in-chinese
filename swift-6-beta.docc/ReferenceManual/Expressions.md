# 表达式

访问、修改和分配值。

Swift 中存在四种表达式：前缀表达式，中缀表达式，基本表达式和后缀表达式。表达式在返回一个值的同时还可以引发副作用。

通过前缀表达式和中缀表达式可以对简单表达式使用各种运算符。基本表达式从概念上讲是最简单的一种表达式，它是一种访问值的方式。后缀表达式则允许你建立复杂的表达式，例如函数调用和成员访问。每种表达式都在下面有详细论述。

> 表达式语法：
>
> *表达式语法* → *try 运算符*_?_ *await运算符*_?_ *前缀表达式* *中缀表达式*_?_ \

##  前缀表达式

前缀表达式由可选的前缀运算符和表达式组成。前缀运算符只接收一个参数，表达式则紧随其后。

关于这些运算符的更多信息，请参阅<doc:BasicOperators> 和 <doc:AdvancedOperators>。

关于 Swift 标准库提供的运算符的更多信息，请参阅[Operator Declarations](https://developer.apple.com/documentation/swift/operator_declarations)。

> 前缀表达式语法：
>
> *前缀表达式* → *前缀运算符*_?_ *后缀表达式* \
> *前缀表达式* → *输入输出表达式*

### 输入输出表达式

输入输出表达式 将函数调用表达式传入的变量标记为输入输出实参。

```swift
&<#表达式#>
```

更多关于输入输出形参的信息和例子，请参阅<doc:Functions#In-Out-Parameters>.

输入输出表达式也可以用于将非指针实参传入到需要指针的上下文中，如 <doc:Expressions#Implicit-Conversion-to-a-Pointer-Type>中所述。

> 输入输出表达式语法：
>
> *输入输出表达式* → **`&`** *标识符*

### Try 运算符

 try 表达式由`try` 运算符加上紧随其后的可抛出错误的表达式组成，形式如下：

```swift
try <#表达式#>
```
`try` 表达式的返回值是该*表达式*的值。

可选的 try 表达式由`try?` 运算符加上紧随其后的可抛出错误的表达式组成，形式如下：


```swift
try? <#表达式#>
```

如果表达式没有抛出错误，可选 try 表达式的返回值是可选的该表达式的值，否则，返回值为 `nil`。

强制 try 表达式由 `try!` 运算符加上紧随其后的可抛出错误的表达式组成，形式如下：

```swift
try! <#表达式#>
```

强制 try 表达式的返回值是该表达式的值。如果该表达式抛出了错误，将会引发运行时错误。

在中缀运算符左侧的表达式被标记上 `try`、`try?` 或者 `try!` 时，这个运算符对整个中缀表达式都产生作用。也就是说，你可以使用括号来明确运算符的作用范围。

```swift
// try 对两个函数调用都产生作用
sum = try someThrowingFunction() + anotherThrowingFunction()

// try 对两个函数调用都产生作用
sum = try (someThrowingFunction() + anotherThrowingFunction())

// 错误：try 只对第一个函数调用产生作用
sum = (try someThrowingFunction()) + anotherThrowingFunction()
```

`try` 表达式不能出现在中缀运算符的的右侧，除非中缀运算符是赋值运算符或者  `try`表达式是被圆括号括起来的。

如果表达式同时包含`try`和`await`运算符,则`try`运算符必须在前面。


更多关于`try`、`try?`的示例,并 `try!`  的信息，以及该如何使用的例子，请参阅 <doc:ErrorHandling>.

> try 表达式语法:
>
> *try-运算符* → **`try`** | **`try`** **`?`** | **`try`** **`!`**

### Await 运算符

*await*  表达式由`await` 运算符加上紧随其后的异步操作结果的表达式。形式如下：

```swift
await <#表达式#>
```
`await`表达式返回值就是该*表达式*的值。被 `await` 标记的表达式被称为潜在的暂停点。 异步函数的执行可以在每个标记 `await` 的表达式的位置暂停。除此之外，并发代码的执行永远不会在其他位置暂停。这意味着在潜在暂停点之间的代码可以暂时打破不变量的状态进行安全更新，只要更新在下一个潜在暂停点之前完成。

`await` 表达式只能在异步的上下文中出现，比如传入 `async(priority:operation:)` 函数的尾随闭包中。它不能在`defer` 语句的闭包中，或者在同步函数的自动闭包中出现。

在中缀运算符左侧的表达式被标记上 `await` 运算符时，这个运算符对整个中缀表达式都产生作用。也就是说，你可以使用括号来明确运算符的作用范围。

```swift
// await 对两个函数调用都产生作用
sum = await someAsyncFunction() + anotherAsyncFunction()

// await 对两个函数调用都产生作用
sum = await (someAsyncFunction() + anotherAsyncFunction())

// 错误：await 只对第一个函数调用产生作用
sum = (await someAsyncFunction()) + anotherAsyncFunction()
```
`await`表达式不能出现在中缀运算符的的右侧，除非中缀运算符是赋值运算符或者`await` 表达式是被圆括号括起来的。

如果表达式中同时包含 `try` 和 `await` 运算符，`try` 运算符必须在前面。

> Await 表达式语法：
>
> *await运算符* → **`await`**

## 中缀表达式

*中缀表达式*由中缀运算符和左右参数表达式组成。形式如下：

```swift
<#左侧参数#> <#中缀运算符#> <#右侧参数#>
```

关于这些运算符的更多信息，请参阅 <doc:BasicOperators> 和 <doc:AdvancedOperators>.

关于 Swift 标准库提供的运算符的更多信息，请参阅 [Operator Declarations](https://developer.apple.com/documentation/swift/operator_declarations).

> 注意：在解析时，一个中缀表达式将作为一个扁平列表表示，然后根据运算符的优先级，再进一步进行组合。例如，`2 + 3 * 5` 首先被看作具有五个元素的列表，即 `2`、`+`、`3`、`*`、`5`，随后根据运算符优先级组合为 `(2 + (3 * 5))`。

> 中置表达式语法
>
> *中置表达式 * → *中置运算符* *前缀表达式* \
> *中置表达式 * → *赋值运算符* *try 运算符*_?_ *await运算符*_?_ *前缀表达式* \
> *中置表达式 * → *条件运算符* *条件运算符 try运算符*_?_ *await运算符*_?_ * 前缀表达式* \
> *中置表达式 * → *类型转换运算符* \
> *中置表达式 * → *中置表达式* *中置表达式列表*_?_

### 赋值运算符

*赋值表达式*会为某个给定的表达式赋值，形式如下；

```swift
<#表达#> = <#值#>
```

右边的值会被赋值给左边的表达式。如果左边表达式是一个元组，那么右边必须是一个具有同样元素个数的元组。（嵌套元组也是允许的。）右边的值中的每一部分都会被赋值给左边的表达式中的相应部分。例如：

```swift
(a, _, (b, c)) = ("test", 9.45, (12, 3))
// a 为 "test"，b 为 12，c 为 3，9.45 会被忽略
```
赋值运算符不返回任何值。

> 赋值运算符语法
>
> *赋值运算符* → **`=`**

### 三元条件运算符

*三元条件运算符*会根据条件来对两个给定表达式中的一个进行求值，形式如下：

```swift
<#条件#> ? <#表达式（条件为真则使用）#> : <#表达式（条件为假则使用) #>
```

如果条件为真，那么对第一个表达式进行求值并返回结果。否则，对第二个表达式进行求值并返回结果。未使用的表达式不会进行求值。

关于使用三元条件运算符的例子，请参阅： <doc:BasicOperators#Ternary-Conditional-Operator>.

> 三元条件运算符语法
>
> *三元条件运算符* → **`?`** *表达* **`:`**

###  类型转换运算符

有四种类型转换运算符： `is`运算符、`as`运算符、`as?`运算符和`as!`操作员。

它们具有以下形式：

```swift
<#表达式#> is <#类型#>
<#表达式#> as <#类型#>
<#表达式#> as? <#类型#>
<#表达式#> as! <#类型#>
```

`is` 运算符在运行时检查表达式能否向下转化为指定的类型，如果可以则返回 `ture`，否则返回 `false`。

`as` 运算符在编译时执行向上转换和桥接。向上转换可将表达式转换成父类的实例而无需使用任何中间变量。以下表达式是等价的：

```swift
func f(_ any: Any) { print("Function for Any") }
func f(_ int: Int) { print("Function for Int") }
let x = 10
f(x)
// 打印 "Function for Int"

let y: Any = x
f(y)
// 打印 "Function for Any"

f(x as Any)
// 打印 "Function for Any"
```

桥接可将 Swift 标准库中的类型（例如 `String`）作为一个与之相关的 Foundation 类型（例如 `NSString`）来使用，而不需要新建一个实例。关于桥接的更多信息，请参阅 [Working with Foundation Types](https://developer.apple.com/documentation/swift/imported_c_and_objective_c_apis/working_with_foundation_types).

`as?` 运算符有条件地执行类型转换，返回目标类型的可选值。在运行时，如果转换成功，返回的可选值将包含转换后的值，否则返回 nil。如果在编译时就能确定转换一定会成功或是失败，则会导致编译报错。

as! 运算符执行强制类型转换，返回目标类型的非可选值。如果转换失败，则会导致运行时错误。表达式 `x as! T` 效果等同于 `(x as? T)!`。

关于类型转换的更多内容和例子，请参阅<doc:TypeCasting>.

> 类型转换运算符的语法：
>
> *类型转换运算符* → **`is`** *类型* \
> *类型转换运算符* → **`as`** *类型* \
> *类型转换运算符* → **`as`** **`?`** *类型* \
> *类型转换运算符* → **`as`** **`!`** *类型*

## 基本表达式

*基本表达式*是最基本的表达式。它们可以单独使用，也可以跟前缀表达式、中置表达式、后缀表达式组合使用。

> 基本表达式的语法：
>
> *primary-expression* → *identifier* *generic-argument-clause*_?_ \
> *primary-expression* → *literal-expression* \
> *primary-expression* → *self-expression* \
> *primary-expression* → *superclass-expression* \
> *primary-expression* → *conditional-expression* \
> *primary-expression* → *closure-expression* \
> *primary-expression* → *parenthesized-expression* \
> *primary-expression* → *tuple-expression* \
> *primary-expression* → *implicit-member-expression* \
> *primary-expression* → *wildcard-expression* \
> *primary-expression* → *macro-expansion-expression* \
> *primary-expression* → *key-path-expression* \
> *primary-expression* → *selector-expression* \
> *primary-expression* → *key-path-string-expression*


### 字面量表达式

*字面量表达式*可由普通字面量（例如字符串或者数字），字典或者数组字面量，或者下面列表中的特殊字面量组成：

> Note:
> Prior to Swift 5.9,
> the following special literals were recognized:
> `#column`,
> `#dsohandle`,
> `#fileID`,
> `#filePath`,
> `#file`,
> `#function`,
> and `#line`.
> These are now implemented as macros in the Swift standard library:
> [`column()`](https://developer.apple.com/documentation/swift/column()),
> [`dsohandle()`](https://developer.apple.com/documentation/swift/dsohandle()),
> [`fileID()`](https://developer.apple.com/documentation/swift/fileID()),
> [`filePath()`](https://developer.apple.com/documentation/swift/filePath()),
> [`file()`](https://developer.apple.com/documentation/swift/file()),
> [`function()`](https://developer.apple.com/documentation/swift/function()),
> and [`line()`](https://developer.apple.com/documentation/swift/line()).


数组字面量是值的有序集合，形式如下：

```swift
[<#值 1#>, <#值 2#>, <#...#>]
```

数组中的最后一个表达式可以紧跟一个逗号。数组字面量的类型是 `[T]`，这个 `T` 就是数组中元素的类型。如果数组中包含多种类型，`T` 则是跟这些类型最近的的公共父类型。空数组字面量由一组方括号定义，可用来创建特定类型的空数组。

```swift
var emptyArray: [Double] = []
```
字典字面量是一个包含无序键值对的集合，形式如下：

```swift
[<#键 1#>: <#值 1#>, <#键 2#>: <#值 2#>, <#...#>]
```

字典中的最后一个表达式可以紧跟一个逗号。字典字面量的类型是 `[Key : Value]`，`Key` 表示键的类型，`Value` 表示值的类型。如果字典中包含多种类型，那么 `Key` 表示的类型则为所有键最接近的公共父类型，`Value` 与之相似。一个空的字典字面量由方括号中加一个冒号组成（`[:]`），从而与空数组字面量区分开，可以使用空字典字面量来创建特定类型的字典。

```swift
var emptyDictionary: [String: Double] = [:]
```

Xcode 使用 playground 字面量对程序编辑器中的颜色、文件或者图片创建可交互的展示。在 Xcode 之外的空白文本中，playground 字面量使用一种特殊的字面量语法来展示。

更多关于在 Xcode 中使用 playground 字面量的信息，请参阅 [Add a color, file, or image literal](https://help.apple.com/xcode/mac/current/#/dev4c60242fc)

> 字面量表达式语法：
>
> *字面量表达式* → *字面量* \
> *字面量表达式* → *数组字面量* | *字典字面量* | *练习场字面量*
>
> *字面量表达式* → **`[`** *array-literal-items*_?_ **`]`** \
> *array-literal-items* → *array-literal-item* **`,`**_?_ | *array-literal-item* **`,`** *array-literal-items* \
> *array-literal-item* → *expression*
>
> *dictionary-literal* → **`[`** *dictionary-literal-items* **`]`** | **`[`** **`:`** **`]`** \
> *dictionary-literal-items* → *dictionary-literal-item* **`,`**_?_ | *dictionary-literal-item* **`,`** *dictionary-literal-items* \
> *dictionary-literal-item* → *expression* **`:`** *expression*
>
> *playground-literal* → **`#colorLiteral`** **`(`** **`red`** **`:`** *expression* **`,`** **`green`** **`:`** *expression* **`,`** **`blue`** **`:`** *expression* **`,`** **`alpha`** **`:`** *expression* **`)`** \
> *playground-literal* → **`#fileLiteral`** **`(`** **`resourceName`** **`:`** *expression* **`)`** \
> *playground-literal* → **`#imageLiteral`** **`(`** **`resourceName`** **`:`** *expression* **`)`**

### Self 表达式

`self`表达式是对当前类型或者当前实例的显式引用，它有如下形式：

```swift
self
self.<#成员名称#>
self[<#下标索引#>]
self(<#构造器参数#>)
self.init(<#构造器参数#>)
```

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
    mutating func moveBy(x deltaX: Double, y deltaY: Double) {
        self = Point(x: x + deltaX, y: y + deltaY)
    }
}
```

> Self 表达式语法：
>
> *self表达式* → **`self`** | *self表达式* | *self下标表达式* | *self构造表达式*
>
> *self方法表达式* → **`self`** **`.`** *.标识符* \
> *self下标表达式* → **`self`** **`[`** *函数调用参数表* **`]`** \
> *self构造器表达式* → **`self`** **`.`** **`init`**

### 父类表达式

*父类表达式*可以使我们在某个类中访问它的父类，它有如下形式：

```swift
super.<#成员名称#>
super[<#下标索引#>]
super.init(<#构造器参数#>)
```

第一种形式用来访问父类的某个成员，第二种形式用来访问父类的下标，第三种形式用来访问父类的构造器。

子类可以通过父类表达式在它们的成员、下标和构造器中使用父类中的实现。

> 父类表达式语法：
>
> *父类表达式* → *父类方法表达式* | *父类下标表达式* | *父类构造器表达式*
>
> *父类方法表达式* → **`super`** **`.`** *标识符* \
> *父类下标表达式* → **`super`** **`[`** *函数调用参数表* **`]`** \
> *父类构造器表达式* → **`super`** **`.`** **`init`**

### 条件表达式

*条件表达式*根据条件值计算为多个给定值之一。它具有以下形式之一：

```swift
if <#condition 1#> {
   <#expression used if condition 1 is true#>
} else if <#condition 2#> {
   <#expression used if condition 2 is true#>
} else {
   <#expression used if both conditions are false#>
}

switch <#expression#> {
case <#pattern 1#>:
    <#expression 1#>
case <#pattern 2#> where <#condition#>:
    <#expression 2#>
default:
    <#expression 3#>
}
```

除了以下段落描述的差异之外，条件表达式与`if`语句或`switch`语句具有相同的行为和语法。

条件表达式仅出现在以下上下文中：

- 作为分配给变量的值。
- 作为变量或常量声明中的初始值。
- 作为由 `throw `表达式引发的错​​误。
- 作为函数、闭包或属性 `getter` 返回的值。
- 作为条件表达式分支内的值。

条件表达式的分支是详尽的，确保无论条件如何，表达式始终生成一个值。这意味着每个if分支都需要一个相应的else分支。

每个分支包含一个表达式（当该分支的条件为 true 时用作条件表达式的值）、一个 `throw`语句或对永不返回的函数的调用。

每个分支必须产生相同类型的值。由于每个分支的类型检查是独立的，因此有时需要显式指定值的类型，例如当分支包含不同类型的文字时，或者当分支的值为`nil`时。当您需要提供此信息时，请向结果分配到的变量添加类型注释，或向分支的值添加`as`强制转换。

```swift
let number: Double = if someCondition { 10 } else { 12.34 }
let number = if someCondition { 10 as Double } else { 12.34 }
```

在结果生成器中，条件表达式只能显示为变量或常量的初始值。此行为意味着当您在结果生成器中编写`if`或`switch` 时（在变量或常量声明之外），该代码将被理解为分支语句，并且结果生成器的方法之一会转换该代码。

不要将条件表达式放入try表达式中，即使条件表达式的分支之一抛出异常。

> 条件句语法:
>
> *conditional-expression* → *if-expression* | *switch-expression*
>
> *if-expression* → **`if`** *condition-list* **`{`** *statement* **`}`** *if-expression-tail* \
> *if-expression-tail* → **`else`** *if-expression* \
> *if-expression-tail* → **`else`** **`{`** *statement* **`}`**
>
> *switch-expression* → **`switch`** *expression* **`{`** *switch-expression-cases* **`}`** \
> *switch-expression-cases* → *switch-expression-case* *switch-expression-cases*_?_ \
> *switch-expression-case* → *case-label* *statement* \
> *switch-expression-case* → *default-label* *statement*

### 闭包表达式

闭包表达式会创建一个闭包，在其他语言中也叫 *lambda* 或匿名函数。跟函数一样，闭包包含了待执行的代码，不同的是闭包还会捕获所在环境中的常量和变量。它的形式如下：

```swift
{ (<#parameters#>) -> <#return type#> in
   <#statements#>
}
```

闭包的参数声明形式跟函数一样，请参阅<doc:Declarations#Function-Declaration>。

在闭包表达式中写入 `throws` 或 `async` 将显式地将闭包标记为丢掷或异步的。

```swift
{ (<#parameters#>) async throws -> <#return type#> in
   <#statements#>
}
```

如果闭包的主体中含有 try 表达式，则认为该闭包会引发异常。同理，若闭包主体含有 await 表达式，则认为该闭包是异步的。

闭包还有几种特殊的形式，能让闭包使用起来更加简洁：

- 闭包可以省略它的参数和返回值的类型。如果省略了参数名和所有的类型，也要省略 `in` 关键字。如果被省略的类型无法被编译器推断，那么就会导致编译错误。

- 闭包可以省略参数名，参数会被隐式命名为 `$` 加上其索引位置，例如 `$0`、`$1`、`$2` 分别表示第一个、第二个、第三个参数，以此类推。

- 如果闭包中只包含一个表达式，那么该表达式的结果就会被视为闭包的返回值。表达式结果的类型也会被推断为闭包的返回类型。

下面几个闭包表达式是等价的：

```swift
myFunction { (x: Int, y: Int) -> Int in
    return x + y
}

myFunction { x, y in
    return x + y
}

myFunction { return $0 + $1 }

myFunction { $0 + $1 }
```

关于如何将闭包作为参数来传递的内容，请参阅 <doc:Expressions#Function-Call-Expression>.

使用闭包表达式时，可以不必将其存储在一个变量或常量中，例如作为函数调用的一部分来立即使用一个闭包。在上面的例子中，传入 `myFunction` 的闭包表达式就是这种立即使用类型的闭包。因此，一个闭包是否逃逸与其使用时的上下文相关。一个会被立即调用或者作为函数的非逃逸参数传递的闭包表达式是非逃逸的，否则，这个闭包表达式是逃逸的。

关于逃逸闭包的内容，请参阅：<doc:Closures#Escaping-Closures>.

#### 捕获列表

默认情况下，闭包表达式从其周围范围捕获常量和变量，并使用强引用指向它们。你可以通过一个捕获列表来显式指定它的捕获行为。

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
// 打印 "0 10"
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
// Prints "10 10"
```
如果捕获列表中的值是类类型，你可以使用 `weak` 或者 `unowned` 来修饰它，闭包会分别用弱引用和无主引用来捕获该值。

```swift
myFunction { print(self.title) }                    // 隐式强引用捕获
myFunction { [self] in print(self.title) }          // 显式强引用捕获
myFunction { [weak self] in print(self!.title) }    // 弱引用捕获
myFunction { [unowned self] in print(self.title) }  // 无主引用捕获
```
在捕获列表中，也可以将任意表达式的值绑定到一个常量上。该表达式会在闭包被创建时进行求值，闭包会按照指定的引用类型来捕获表达式的值。例如：

```swift
// 以弱引用捕获 self.parent 并赋值给 parent
myFunction { [weak parent = self.parent] in print(parent!.title) }
```
关于闭包表达式的更多信息和例子，请参阅 <doc:Closures#Closure-Expressions>.
关于捕获列表的更多信息和例子，请参阅 <doc:AutomaticReferenceCounting#Resolving-Strong-Reference-Cycles-for-Closures>.

> 闭包表达式语法
>
> *闭包表达式* → **`{`** *特性*_?_ *闭包签名*_?_ *语句*_?_ **`}`**
>
> *闭包签名* → *捕获列表*_?_ *闭包形参子句* **`async`**_?_ *throws*_?_ *函数结果*_?_ **`in`** \
> *闭包签名 * → *捕获列表* **`in`**
>
> *闭包形参子句* → **`(`** **`)`** | **`(`** *闭包形参列表* **`)`** | *标识符列表* \
> *闭包形参列表* → *闭包形参* | *闭包形参* **`,`** *闭包形参列表* \
> *closure-parameter* → *closure-parameter-name* *type-annotation*_?_ \
> *closure-parameter* → *closure-parameter-name* *type-annotation* **`...`** \
> *closure-parameter-name* → *identifier*
>
> *capture-list* → **`[`** *capture-list-items* **`]`** \
> *capture-list-items* → *capture-list-item* | *capture-list-item* **`,`** *capture-list-items* \
> *capture-list-item* → *capture-specifier*_?_ *identifier* \
> *capture-list-item* → *capture-specifier*_?_ *identifier* **`=`** *expression* \
> *capture-list-item* → *capture-specifier*_?_ *self-expression* \
> *capture-specifier* → **`weak`** | **`unowned`** | **`unowned(safe)`** | **`unowned(unsafe)`**

### 隐式成员表达式

若类型可被推断出来，可以使用*隐式成员表达式*来访问某个类型的成员（例如某个枚举成员或某个类型方法），形式如下：

```swift
.<#成员名称#>
```

例如:

```swift
var x = MyEnumeration.someValue
x = .anotherValue
```
如果推断的是可选类型，可以在隐式成员表达式里使用不可选类型的成员。

```swift
var someOptional: MyEnumeration? = .someValue
```

隐式成员表达式可以跟在后缀运算符或者其他在<doc:Expressions#Postfix-Expressions>里介绍的语法后面。这被称为 链式隐式成员表达式。尽管链式后缀表达式大多都是相同类型，但其实只需要整个链式成员表达式可以转换为上下文的类型就行了。更具体的，如果隐式类型是可选的，则可以使用非可选类型的值，如果隐式类型是类类型，则可以使用其子类的值。例如：

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
>
> *implicit-member-expression* → **`.`** *identifier* \
> *implicit-member-expression* → **`.`** *identifier* **`.`** *postfix-expression*

### 圆括号表达式

*圆括号表达式*是由圆括号包围的表达式。你可以用圆括号说明成组的表达式的先后操作。成组的圆括号不会改变表达式的类型 - 例如 `(1)` 的类型就是简单的 `Int`。

> 圆括号表达式语法
>
> *圆括号表达式* → **`(`** *表达式* **`)`**

### 元组表达式

*元组表达式*由圆括号和其中多个逗号分隔的子表达式组成。每个子表达式前面可以有一个标识符，用冒号隔开。元组表达式形式如下：

```swift
(<#标识符 1#>: <#表达式 1#>, <#标识符 2#>: <#表达式 2#>, <#...#>)
```

元组表达式里的每一个标识符在表达式作用域里必须是唯一的。在嵌套的元组表达式中，同嵌套层级里的标识符也必须是唯一的。例如，`(a: 10, a: 20)` 是不合法的，因为标签 `a` 在同一层级出现了两次。然而，`(a: 10, b: (a: 1, x: 2))` 是合法的，尽管 `a` 出现了两次，但有一次在外层元组里，一次在内层元组里。

元组表达式可以一个表达式都没有，也可以包含两个或是更多的表达式。单个表达式用括号括起来就是括号表达式了。

> 注意：在 Swift 中，空的元组表达式和空的元组类型都写作 `()`。由于 `Void` 是 `()` 的类型别名，因此可以使用它来表示空的元组类型。虽然如此，`Void` 就像所有的类型别名一样，永远是一个类型——不能表示空的元组表达式。

> 元组表达式语法
>
> *tuple-expression* → **`(`** **`)`** | **`(`** *tuple-element* **`,`** *tuple-element-list* **`)`** \
> *tuple-element-list* → *tuple-element* | *tuple-element* **`,`** *tuple-element-list* \
> *tuple-element* → *expression* | *identifier* **`:`** *expression*

### 通配符表达式

*通配符表达式*可以在赋值过程中显式忽略某个值。例如下面的代码中，10 被赋值给 x，而 20 则被忽略：



```swift
(x, _) = (10, 20)
// x 为 10，20 被忽略
```
> 通配符表达式语法
>
> *通配符表达式* → **`_`**

### 宏表达式

Key-path 表达式引用一个类型的属性或下标。在动态语言中使场景可以使用 Key-path 表达式，例如观察键值对。格式为：

```swift
<#macro name#>(<#macro argument 1#>, <#macro argument 2#>)
```

宏扩展表达式不能作为参数的默认值出现，除了 Swift 标准库中的 `file()` 和 `line()` 宏。当用作函数或方法参数的默认值时，这些宏将使用调用站点的源代码位置（而不是它们在函数定义中出现的位置）进行计算。

[`file()`]: https://developer.apple.com/documentation/swift/file()
[`line()`]: https://developer.apple.com/documentation/swift/line()

您可以使用宏表达式来调用独立宏。要调用附加的宏，请使用  <doc:Attributes>中描述的自定义属性语法。独立宏和附加宏都扩展如下：


1. Swift 解析源代码以生成抽象语法树（AST）。

2. 宏实现接收 AST 节点作为其输入并执行该宏所需的转换。

3. 宏实现生成的转换后的 AST 节点将添加到原始 AST 中。

每个宏的扩展都是独立且自成体系的。但是，作为性能优化，Swift 可能会启动一个实现宏的外部进程，并重用同一进程来扩展多个宏。当您实现宏时，该代码不得依赖于您的代码之前扩展的宏，或任何其他外部状态（例如当前时间）。

对于具有多个角色的嵌套宏和附加宏，会重复展开过程。嵌套宏展开表达式从外向内展开。例如，在下面的代码中， `outerMacro(_:) `首先展开，未展开的对`innerMacro(_:)`调用出现在 `outerMacro(_:)`接收的抽象语法树中。输入

```swift
#outerMacro(12, #innerMacro(34), "some text")
```

具有多个角色的附加宏将为每个角色扩展一次。每个扩展都接收相同的原始 AST 作为其输入。 Swift 通过收集所有生成的 AST 节点并将它们放在 AST 中相应的位置来形成整体扩展。

有关 Swift 中宏的概述，请参阅 <doc:Macros>.

> 宏展开表达式的语法：
>
> *macro-expansion-expression* → **`#`** *identifier* *generic-argument-clause*_?_ *function-call-argument-clause*_?_ *trailing-closures*_?_

### 键路径表达式

*键路径表达式*指的是类型的属性或下标。您可以在动态编程任务中使用键路径表达式，例如键值观察。它们具有以下形式：

```swift
\<#type name#>.<#path#>
```

*类型名称*是具体类型的名称，包括任何泛型参数，例如 `String` 、 `[Int]` 或 `Set<Int>` 。

该*路径*由属性名称、下标、可选链表达式和强制展开表达式组成。这些关键路径组件中的每一个都可以根据需要以任何顺序重复多次。

在编译时，键路径表达式被[`KeyPath`](https://developer.apple.com/documentation/swift/keypath)   类的实例替换。

要使用键路径访问值，请将键路径传递给 `subscript(keyPath:)` 下标，该下标适用于所有类型。例如：

<!--
  The subscript name subscript(keyPath:) above is a little odd,
  but it matches what would be displayed on the web.
  There isn't actually an extension on Any that implements this subscript;
  it's a special case in the compiler.
-->

```swift
struct SomeStructure {
    var someValue: Int
}

let s = SomeStructure(someValue: 12)
let pathToProperty = \SomeStructure.someValue

let value = s[keyPath: pathToProperty]
// value is 12
```

<!--
  - test: `keypath-expression`

  ```swifttest
  -> struct SomeStructure {
         var someValue: Int
     }
  ---
  -> let s = SomeStructure(someValue: 12)
  -> let pathToProperty = \SomeStructure.someValue
  ---
  -> let value = s[keyPath: pathToProperty]
  /> value is \(value)
  </ value is 12
  ```
-->

在类型推断可以确定隐含类型的上下文中，可以省略类型名称。以下代码使用 `\.someProperty` 而不是 `\SomeClass.someProperty` ：

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

该*路径* 可以引用self来创建身份密钥路径 `( \.self )`。身份键路径引用整个实例，因此您可以使用它一步来访问和更改存储在变量中的所有数据。例如：

```swift
var compoundValue = (a: 1, b: 2)
// Equivalent to compoundValue = (a: 10, b: 20)
compoundValue[keyPath: \.self] = (a: 10, b: 20)
```

该路径可以包含多个属性名称，以句点分隔，以引用属性值的属性。此代码使用关键路径表达式 `\OuterStructure.outer.someValue` 访问 `OuterStructure` 类型的 `outer` 属性的 `someValue` 属性：

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
// nestedValue is 24
```

*路径*可以包含使用括号的下标，只要下标的参数类型符合 `Hashable` 协议即可。此示例使用键路径中的下标来访问数组的第二个元素：

```swift
let greetings = ["hello", "hola", "bonjour", "안녕"]
let myGreeting = greetings[keyPath: \[String].[1]]
// myGreeting is 'hola'
```
下标中使用的值可以是命名值或文字。使用值语义在关键路径中捕获值。以下代码在键路径表达式和闭包中使用变量 `index` 来访问 `greetings` 数组的第三个元素。当 `index` 被修改时，键路径表达式仍然引用第三个元素，而闭包使用新索引。

```swift
var index = 2
let path = \[String].[index]
let fn: ([String]) -> String = { strings in strings[index] }

print(greetings[keyPath: path])
// Prints "bonjour"
print(fn(greetings))
// Prints "bonjour"

// Setting 'index' to a new value doesn't affect 'path'
index += 1
print(greetings[keyPath: path])
// Prints "bonjour"

// Because 'fn' closes over 'index', it uses the new value
print(fn(greetings))
// Prints "안녕"
```
该路径可以使用可选链接和强制展开。此代码在键路径中使用可选链接来访问可选字符串的属性：

```swift
let firstGreeting: String? = greetings.first
print(firstGreeting?.count as Any)
// Prints "Optional(5)"

// Do the same thing using a key path.
let count = greetings[keyPath: \[String].first?.count]
print(count as Any)
// Prints "Optional(5)"
```
您可以混合和匹配关键路径的组件来访问深度嵌套在类型中的值。以下代码通过使用组合这些组件的键路径表达式来访问数组字典的不同值和属性。

```swift
let interestingNumbers = ["prime": [2, 3, 5, 7, 11, 13, 17],
                          "triangular": [1, 3, 6, 10, 15, 21, 28],
                          "hexagonal": [1, 6, 15, 28, 45, 66, 91]]
print(interestingNumbers[keyPath: \[String: [Int]].["prime"]] as Any)
// Prints "Optional([2, 3, 5, 7, 11, 13, 17])"
print(interestingNumbers[keyPath: \[String: [Int]].["prime"]![0]])
// Prints "2"
print(interestingNumbers[keyPath: \[String: [Int]].["hexagonal"]!.count])
// Prints "7"
print(interestingNumbers[keyPath: \[String: [Int]].["hexagonal"]!.count.bitWidth])
// Prints "64"
```
您可以在通常提供函数或闭包的上下文中使用键路径表达式。具体来说，您可以使用根类型为 `SomeType` 且其路径生成 `Value` 类型的值的键路径表达式，而不是 `(SomeType) -> Value` 类型的函数或闭包。

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

// Both approaches below are equivalent.
let descriptions = toDoList.filter(\.completed).map(\.description)
let descriptions2 = toDoList.filter { $0.completed }.map { $0.description }
```
关键路径表达式的任何副作用仅在计算表达式的点进行计算。例如，如果您在关键路径表达式的下标内进行函数调用，则该函数仅在计算表达式时调用一次，而不是每次使用关键路径时都被调用。

```swift
func makeIndex() -> Int {
    print("Made an index")
    return 0
}
// The line below calls makeIndex().
let taskKeyPath = \[Task][makeIndex()]
// Prints "Made an index"

// Using taskKeyPath doesn't call makeIndex() again.
let someTask = toDoList[keyPath: taskKeyPath]
```

有关在与 Objective-C API 交互的代码中使用关键路径的更多信息，请参阅 [Using Objective-C Runtime Features in Swift](https://developer.apple.com/documentation/swift/using_objective_c_runtime_features_in_swift).
有关键值编码和键值观察的信息，请参阅[Key-Value Coding Programming Guide](https://developer.apple.com/library/content/documentation/Cocoa/Conceptual/KeyValueCoding/index.html#//apple_ref/doc/uid/10000107i)
和 [Key-Value Observing Programming Guide](https://developer.apple.com/library/content/documentation/Cocoa/Conceptual/KeyValueObserving/KeyValueObserving.html#//apple_ref/doc/uid/10000177i).

> 键路径表达式的语法:
>
> *key-path-expression* → **`\`** *type*_?_ **`.`** *key-path-components* \
> *key-path-components* → *key-path-component* | *key-path-component* **`.`** *key-path-components* \
> *key-path-component* → *identifier* *key-path-postfixes*_?_ | *key-path-postfixes*
>
> *key-path-postfixes* → *key-path-postfix* *key-path-postfixes*_?_ \
> *key-path-postfix* → **`?`** | **`!`** | **`self`** | **`[`** *function-call-argument-list* **`]`**

### 选择器表达式

选择器表达式允许您访问用于引用 Objective-C 中的方法或属性的 getter 或 setter 的选择器。它具有以下形式：

```swift
#selector(<#method name#>)
#selector(getter: <#property name#>)
#selector(setter: <#property name#>)
```

方法名称和属性名称必须是对 Objective-C 运行时中可用的方法或属性的引用。选择器表达式的值是 `Selector` 类型的实例。例如：

```swift
class SomeClass: NSObject {
    @objc let property: String

    @objc(doSomethingWithInt:)
    func doSomething(_ x: Int) { }

    init(property: String) {
        self.property = property
    }
}
let selectorForMethod = #selector(SomeClass.doSomething(_:))
let selectorForPropertyGetter = #selector(getter: SomeClass.property)
```

<!--
  - test: `selector-expression`

  ```swifttest
  >> import Foundation
  -> class SomeClass: NSObject {
  ->     @objc let property: String
  ---
  ->     @objc(doSomethingWithInt:)
         func doSomething(_ x: Int) { }
  ---
         init(property: String) {
             self.property = property
         }
     }
  -> let selectorForMethod = #selector(SomeClass.doSomething(_:))
  -> let selectorForPropertyGetter = #selector(getter: SomeClass.property)
  ```
-->

为属性的 getter 创建选择器时，*属性名称*可以是对变量或常量属性的引用。相反，当为属性的设置器创建选择器时，*属性名称* 必须仅是对变量属性的引用。

*方法名称*可以包含用于分组的括号，以及用于消除共享名称但具有不同类型签名的方法之间的歧义的 `as`运算符。例如：

```swift
extension SomeClass {
    @objc(doSomethingWithString:)
    func doSomething(_ x: String) { }
}
let anotherSelector = #selector(SomeClass.doSomething(_:) as (SomeClass) -> (String) -> Void)
```

<!--
  - test: `selector-expression-with-as`

  ```swifttest
  >> import Foundation
  >> class SomeClass: NSObject {
  >>     @objc let property: String
  >>     @objc(doSomethingWithInt:)
  >>     func doSomething(_ x: Int) {}
  >>     init(property: String) {
  >>         self.property = property
  >>     }
  >> }
  -> extension SomeClass {
  ->     @objc(doSomethingWithString:)
         func doSomething(_ x: String) { }
     }
  -> let anotherSelector = #selector(SomeClass.doSomething(_:) as (SomeClass) -> (String) -> Void)
  ```
-->

因为选择器是在编译时创建的，而不是在运行时创建的，所以编译器可以检查方法或属性是否存在以及它们是否暴露给 Objective-C 运行时。

> 注意：虽然*方法名称*和*属性名称*是表达式，但它们永远不会被求值

有关在与 Objective-C API 交互的 Swift 代码中使用选择器的更多信息，请参阅[Using Objective-C Runtime Features in Swift](https://developer.apple.com/documentation/swift/using_objective_c_runtime_features_in_swift).

> 选择器表达式的语法:
>
> *selector-expression* → **`#selector`** **`(`** *expression* **`)`** \
> *selector-expression* → **`#selector`** **`(`** **`getter:`** *expression* **`)`** \
> *selector-expression* → **`#selector`** **`(`** **`setter:`** *expression* **`)`**

<!--
  Note: The parser does allow an arbitrary expression inside #selector(), not
  just a member name.  For example, see changes in Swift commit ef60d7289d in
  lib/Sema/CSApply.cpp -- there's explicit code to look through parens and
  optional binding.
-->

### 键路径字符串表达式

键路径字符串表达式允许您访问用于引用 Objective-C 中的属性的字符串，以用于键值编码和键值观察 API。它具有以下形式：

```swift
#keyPath(<#property name#>)
```

*属性名称*必须是对 Objective-C 运行时中可用的属性的引用。在编译时，键路径字符串表达式被替换为字符串文字。例如：

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
// Prints "12"
```

<!--
  - test: `keypath-string-expression`

  ```swifttest
  >> import Foundation
  -> class SomeClass: NSObject {
  ->    @objc var someProperty: Int
        init(someProperty: Int) {
            self.someProperty = someProperty
        }
     }
  ---
  -> let c = SomeClass(someProperty: 12)
  -> let keyPath = #keyPath(SomeClass.someProperty)
  ---
  -> if let value = c.value(forKey: keyPath) {
  ->     print(value)
  -> }
  <- 12
  ```
-->

当您在类中使用键路径字符串表达式时，您可以通过仅编写属性名称而不编写类名称来引用该类的属性。

```swift
extension SomeClass {
    func getSomeKeyPath() -> String {
        return #keyPath(someProperty)
    }
}
print(keyPath == c.getSomeKeyPath())
// Prints "true"
```

<!--
  - test: `keypath-string-expression`

  ```swifttest
  -> extension SomeClass {
        func getSomeKeyPath() -> String {
           return #keyPath(someProperty)
        }
     }
  -> print(keyPath == c.getSomeKeyPath())
  <- true
  ```
-->

由于关键路径字符串是在编译时而不是运行时创建的，因此编译器可以检查该属性是否存在以及该属性是否公开给 Objective-C 运行时。

有关在与 Objective-C API 交互的 Swift 代码中使用关键路径的更多信息，请参阅[Using Objective-C Runtime Features in Swift](https://developer.apple.com/documentation/swift/using_objective_c_runtime_features_in_swift)。
有关键值编码和键值观察的信息，请参阅 [Key-Value Coding Programming Guide](https://developer.apple.com/library/content/documentation/Cocoa/Conceptual/KeyValueCoding/index.html#//apple_ref/doc/uid/10000107i)
和 [Key-Value Observing Programming Guide](https://developer.apple.com/library/content/documentation/Cocoa/Conceptual/KeyValueObserving/KeyValueObserving.html#//apple_ref/doc/uid/10000177i)。

> 注意：虽然*属性名称*是一个表达式，但它永远不会被计算。

> 键路径字符串表达式的语法：
>
> *键路径字符串表达式* → **`#keyPath`** **`(`** *表达式* **`)`**

## 后缀表达式

*后缀表达式*是通过对表达式应用后缀运算符或其他后缀语法来形成的。从语法上来说，每个主表达式也是一个后缀表达式。

有关这些运算符的行为的信息，请参阅<doc:BasicOperators> 和<doc:AdvancedOperators>。

有关 Swift 标准库提供的运算符的信息，请参阅[Operator Declarations](https://developer.apple.com/documentation/swift/operator_declarations)。

> 后缀表达式的语法:
>
> *postfix-expression* → *primary-expression* \
> *postfix-expression* → *postfix-expression* *postfix-operator* \
> *postfix-expression* → *function-call-expression* \
> *postfix-expression* → *initializer-expression* \
> *postfix-expression* → *explicit-member-expression* \
> *postfix-expression* → *postfix-self-expression* \
> *postfix-expression* → *subscript-expression* \
> *postfix-expression* → *forced-value-expression* \
> *postfix-expression* → *optional-chaining-expression*

### 函数调用表达式

<!--
  TODO: After we rewrite function decls,
  revisit this section to make sure that the names for things match.
-->

函数调用*表达式*由函数名称和后跟括号中的以逗号分隔的函数参数列表组成。函数调用表达式具有以下形式：

```swift
<#function name#>(<#argument value 1#>, <#argument value 2#>)
```

*函数名称*可函数名可以是任何其值是函数类型的表达式。

如果函数定义包含其参数名称，则函数调用必须在其参数值之前包含名称，并用冒号(`:`)分隔。
这种函数调用表达式具有以下形式:

```swift
<#function name#>(<#argument name 1#>: <#argument value 1#>, <#argument name 2#>: <#argument value 2#>)
```

函数调用表达式可以在紧跟在右括号之后以闭包表达式的形式包含尾随闭包。尾随闭包被理解为函数的参数，添加在最后一个带括号的参数之后。第一个闭包表达式是无标签的；任何其他闭包表达式前面都有其参数标签。下面的示例显示了使用和不使用尾随闭包语法的函数调用的等效版本：

```swift
// someFunction takes an integer and a closure as its arguments
someFunction(x: x, f: { $0 == 13 })
someFunction(x: x) { $0 == 13 }

// anotherFunction takes an integer and two closures as its arguments
anotherFunction(x: x, f: { $0 == 13 }, g: { print(99) })
anotherFunction(x: x) { $0 == 13 } g: { print(99) }
```

<!--
  - test: `trailing-closure`

  ```swifttest
  >> func someFunction (x: Int, f: (Int) -> Bool) -> Bool {
  >>    return f(x)
  >> }
  >> let x = 10
  // someFunction takes an integer and a closure as its arguments
  >> let r0 =
  -> someFunction(x: x, f: { $0 == 13 })
  >> assert(r0 == false)
  >> let r1 =
  -> someFunction(x: x) { $0 == 13 }
  >> assert(r1 == false)
  ---
  >> func anotherFunction(x: Int, f: (Int) -> Bool, g: () -> Void) -> Bool {
  >>    g(); return f(x)
  >> }
  // anotherFunction takes an integer and two closures as its arguments
  >> let r2 =
  -> anotherFunction(x: x, f: { $0 == 13 }, g: { print(99) })
  << 99
  >> assert(r2 == false)
  >> let r3 =
  -> anotherFunction(x: x) { $0 == 13 } g: { print(99) }
  << 99
  >> assert(r3 == false)
  ```
-->

<!--
  Rewrite the above to avoid bare expressions.
  Tracking bug is <rdar://problem/35301593>
-->

如果尾随闭包是函数的唯一参数，则可以省略括号。

```swift
// someMethod takes a closure as its only argument
myData.someMethod() { $0 == 13 }
myData.someMethod { $0 == 13 }
```

为了在参数中包含尾随闭包，编译器从左到右检查函数的参数，如下所示：

| 尾随闭包 | 形参 | 行动 |
| ---------------- | --------- | ------ |
| 有标签 | 有标签 | 如果标签相同，闭包和形参匹配，否则跳过该形参|
| 有标签 | 无标记 | 跳过该形参 |
| 无标签 | 有标签或无标签 | 如果形参在结构上类似于下面定义的函数类型，和闭包匹配，否则跳过该形参 |

尾随闭包作为其匹配形参的实参传递。在扫描过程被跳过的形参不传递实参——例如，它们使用的是默认形参。当匹配后，扫描会继续下一个尾随闭包和形参。匹配过程结束后，所有的尾随闭包必须有对应的匹配。

如果形参不是输入输出参数，并且类似下面的情况，则算是结构上类似函数类型：

- 类型为函数类型的参数，如`(Bool) -> Int`
- 一个自动闭包参数，其包装表达式的类型是函数类型，例如 `@autoclosure () -> ((Bool) -> Int)`
- 数组元素类型为函数类型的可变参数，例如`((Bool) -> Int)...`
- 其类型被包裹在一层或多层可选中的参数，例如`Optional<(Bool) -> Int>`
- 其类型组合了这些允许类型的参数，例如 `(Optional<(Bool) -> Int>)...`

尾随闭包和结构上类似函数类型的形参匹配，但它并不是函数，所以闭包会按需包装。例如，如果形参类是是可选类型，闭包会自动包装成 `Optional` 。


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

如 <doc:Declarations#Methods-with-Special-Names> 所述，通过声明几种方法中的一种，类、结构体或枚举类型可以为函数调用语法启用语法糖。

#### 指针类型的隐式转换

在函数调用表达式里，如果实参和形参的类型不一致，编译器会尝试通过下面的规则进行隐式转换来匹配类型：

- `inout SomeType` 可以成为
`UnsafePointer<SomeType>` 或 `UnsafeMutablePointer<SomeType>`
- `inout Array<SomeType>` 可以成为
`UnsafePointer<SomeType>`或`UnsafeMutablePointer<SomeType>`
- `Array<SomeType>`可以成为`UnsafePointer<SomeType>`
- `String`可以成为`UnsafePointer<CChar>`

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
> 当将数组隐式转换为不安全指针时，Swift 会按需转换或复制数组来确保数组的存储是连续的。例如，可以用此语法将没有> 约定存储 API 的 `NSArray` 子类桥接到 `Array` 的数组。如果能确保数组的存储是连续的，就不需要隐式转换来做这个工> 作，这种情况下可以用 `ContiguousArray` 代替 `Array`。

使用 `&` 代替类似 `withUnsafePointer(to:)` 的显式函数可以在调用底层 C 函数的可读性更高，特别是当函数传入多个指针实参时。如果是其他 Swift 代码调用函数，避免使用 `&` 代替显式的不安全 API。

> 函数调用表达式的语法：
>
> *function-call-expression* → *postfix-expression* *function-call-argument-clause* \
> *function-call-expression* → *postfix-expression* *function-call-argument-clause*_?_ *trailing-closures*
>
> *function-call-argument-clause* → **`(`** **`)`** | **`(`** *function-call-argument-list* **`)`** \
> *function-call-argument-list* → *function-call-argument* | *function-call-argument* **`,`** *function-call-argument-list* \
> *function-call-argument* → *expression* | *identifier* **`:`** *expression* \
> *function-call-argument* → *operator* | *identifier* **`:`** *operator*
>
> *trailing-closures* → *closure-expression* *labeled-trailing-closures*_?_ \
> *labeled-trailing-closures* → *labeled-trailing-closure* *labeled-trailing-closures*_?_ \
> *labeled-trailing-closure* → *identifier* **`:`** *closure-expression*

### 构造器表达式

构造器表达式用于访问某个类型的构造器，形式如下：

```swift
<#表达式#>.init(<#构造函数#>)
```

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
let initializer: (Int) -> String = String.init
let oneTwoThree = [1, 2, 3].map(initializer).reduce("", +)
print(oneTwoThree)
// 打印 "123"
```
如果通过名字来指定某个类型，可以不用构造器表达式而直接使用类型的构造器。在其他情况下，你必须使用构造器表达式。

```swift
let s1 = SomeType.init(data: 3)  // 有效
let s2 = SomeType(data: 1)       // 有效

let s3 = type(of: someValue).init(data: 7)  // 有效
let s4 = type(of: someValue)(data: 5)       // 错误
```

> 构造器表达式语法：
>
> *构造器表达式语法* → *后缀表达式* **`.`** **`init`** \
> *构造器表达式 * → *后缀表达式* **`.`** **`init`** **`(`** *参数名称* **`)`**

### 显式成员表达式

*显式成员表达式*允许我们访问命名类型、元组或者模块的成员，其形式如下：

```swift
<#表达名#>.<#成员名#>
```

命名类型的某个成员在原始实现或者扩展中定义，例如：

```swift
class SomeClass {
    var someProperty = 42
}
let c = SomeClass()
let y = c.someProperty  // 访问成员
```
元组的成员按照它们出现的顺序使用整数隐式命名，从零开始。例如：

```swift
var t = (10, 20, 30)
t.0 = t.1
// 现在元组 t 为 (20, 20, 30)
```
对于模块的成员来说，只能直接访问顶级声明中的成员。

使用 `dynamicMemberLookup` 属性声明的类型包含可以在运行时查找的成员，具体请参阅 <doc:Attributes>。

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
let b = instance.someMethod(x:y:)        // 无歧义

let d = instance.overloadedMethod        // 有歧义
let d = instance.overloadedMethod(x:y:)  // Still ambiguous
let d: (Int, Bool) -> Void  = instance.overloadedMethod(x:y:)  // Unambiguous
```

如果点号（`.`）出现在行首，它会被视为显式成员表达式的一部分，而不是隐式成员表达式的一部分。例如如下代码所展示的被分为多行的链式方法调用：

```swift
let x = [10, 3, 20, 15, 4]
    .sorted()
    .filter { $0 > 5 }
    .map { $0 * 100 }
```
你可以将这种多行链式语法与编译器控制语句结合，以控制调用每个方法的时间。例如，以下代码在 iOS 上应用了不同的过滤规则：：

```swift
let numbers = [10, 20, 33, 43, 50]
#if os(iOS)
    .filter { $0 < 40 }
#else
    .filter { $0 > 25 }
#endif
```
在 `#if`、`#endif` 和其它编译指令之间的条件编译块可以包含一个隐式成员表达式，后跟零个或多个后缀，以形成一个后缀表达式。这些条件编译块还可以包含另一个条件编译块，或者这些表达式和块的组合体。

除了顶级代码（top-level code）以外，你还可以在任何能编写显式成员表达式的地方使用上述语法。

在条件编译块中，编译指令 `#if` 的分支必须包含至少一个表达式，其它分支可以为空。

> 显式成员表达式语法:
>
> *explicit-member-expression* → *postfix-expression* **`.`** *decimal-digits* \
> *explicit-member-expression* → *postfix-expression* **`.`** *identifier* *generic-argument-clause*_?_ \
> *explicit-member-expression* → *postfix-expression* **`.`** *identifier* **`(`** *argument-names* **`)`** \
> *explicit-member-expression* → *postfix-expression* *conditional-compilation-block*
>
> *argument-names* → *argument-name* *argument-names*_?_ \
> *argument-name* → *identifier* **`:`**

### 后缀 self 表达式

后缀`self` 表达式由某个表达式或类型名紧跟 `.self` 组成，其形式如下：

```swift
<#表达式#>.self
<#类型#>.self
```

第一种形式返回表达式的值。例如：`x.self` 返回 `x`。

第二种形式返回相应的类型。我们可以用它来获取某个实例的类型作为一个值来使用。例如，`SomeClass.self` 会返回 `SomeClass` 类型本身，你可以将其传递给相应函数或者方法作为参数。

> 后缀 self 表达式语法
>
> *后缀 self 表达式* → * 后缀表达式* **`.`** **`self`**

### 下标表达式

可通过下标表达式访问相应的下标，形式如下：

```swift
<#表达式#>[<#索引表达式#>]
```

要获取下标表达式的值，可将索引表达式作为下标表达式的参数来调用下标 getter。下标 setter 的调用方式与之一样。


有关下标声明的信息，请参阅 <doc:Declarations#Protocol-Subscript-Declaration>.

> 下标表达式语法:
>
> *subscript-expression* → *postfix-expression* **`[`** *function-call-argument-list* **`]`**

### 强制取值表达式

当你确定可选值不是 `nil` 时，可以使用强制取值表达式来强制解包，形式如下：

```swift
<#表达式#>!
```

如果该表达式的值不是 `nil`，则返回解包后的值。否则，抛出运行时错误。

返回的值可以被修改，无论是修改值本身，还是修改值的成员。例如：

```swift
var x: Int? = 0
x! += 1
// x 现在是 1

var someDictionary = ["a": [1, 2, 3], "b": [10, 20]]
someDictionary["a"]![0] = 100
// someDictionary 现在是 ["a": [100, 2, 3], "b": [10, 20]]
```
> 强制取值语法
>
> *强制值表达式* → *后缀表达式* **`!`**

### 可选链式表达式

*可选链表达式*提供了一种使用可选值的便捷方法，形式如下：

```swift
<#表达式#>?
```

后缀 `?` 运算符会根据表达式生成可选链表达式而不会改变表达式的值。

如果某个后缀表达式包含可选链表达式，那么它的执行过程会比较特殊。如果该可选链表达式的值是 `nil`，整个后缀表达式会直接返回 `nil`。如果该可选链表达式的值不是 `nil`，则返回可选链表达式解包后的值，并将该值用于后缀表达式中剩余的表达式。在这两种情况下，整个后缀表达式的值都会是可选类型。

如果某个后缀表达式中包含了可选链表达式，那么只有最外层的表达式会返回一个可选类型。例如，在下面的例子中，如果 `c` 不是 `nil`，那么它的值会被解包，然后通过 `.property` 访问它的属性，接着进一步通过 `.performAction()` 调用相应方法。整个 `c?.property.performAction()` 表达式返回一个可选类型的值，而不是多重可选类型。

```swift
var c: SomeClass?
var result: Bool? = c?.property.performAction()
```
上面的例子跟下面的不使用可选链表达式的例子等价：

```swift
var result: Bool?
if let unwrappedC = c {
    result = unwrappedC.property.performAction()
}
```
可选链表达式解包后的值可以被修改，无论是修改值本身，还是修改值的成员。如果可选链表达式的值为 `nil`，则表达式右侧的赋值操作不会被执行。例如：

```swift
func someFunctionWithSideEffects() -> Int {
    return 42  // No actual side effects.
}
var someDictionary = ["a": [1, 2, 3], "b": [10, 20]]

someDictionary["not here"]?[0] = someFunctionWithSideEffects()
// someFunctionWithSideEffects isn't evaluated
// someDictionary is still ["a": [1, 2, 3], "b": [10, 20]]

someDictionary["a"]?[0] = someFunctionWithSideEffects()
// someFunctionWithSideEffects is evaluated and returns 42
// someDictionary is now ["a": [42, 2, 3], "b": [10, 20]]
```
> 可选链表达式的语法：
>
> *可选链表达式* → *后缀表达式* **`?`**

> 测试版软件:
>
> 本文档包含有关正在开发的 API 或技术的初步信息。该信息可能会发生变化，并且根据本文档实现的软件应使用最终操作系统软件进行测试。.
>
> 了解更多关于使用 [Apple's beta software](https://developer.apple.com/support/beta-software/).

