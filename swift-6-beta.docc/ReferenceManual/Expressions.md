# 表达式

访问、修改和分配值。

Swift 中存在四种表达式：前缀表达式，中缀表达式，基本表达式和后缀表达式。表达式在返回一个值的同时还可以引发副作用。

通过前缀表达式和中缀表达式可以对简单表达式使用各种运算符。基本表达式从概念上讲是最简单的一种表达式，它是一种访问值的方式。后缀表达式则允许你建立复杂的表达式，例如函数调用和成员访问。每种表达式都在下面有详细论述。

> 表达式语法：
>
> *expression* → *try-operator*_?_ *await-operator*_?_ *prefix-expression* *infix-expressions*_?_ \

## 前缀表达式

前缀表达式由可选的前缀运算符和表达式组成。前缀运算符只接收一个参数，表达式则紧随其后。

关于这些运算符的更多信息，请参阅 <doc:BasicOperators> 和 <doc:AdvancedOperators>.

关于 Swift 标准库提供的运算符的更多信息，请参阅  [Operator Declarations](https://developer.apple.com/documentation/swift/operator_declarations).

> 前缀表达式语法
>
> *prefix-expression* → *prefix-operator*_?_ *postfix-expression* \
> *prefix-expression* → *in-out-expression*

### In-Out 表达式

 *in-out表达式*将函数调用表达式传入的变量标记为输入输出实参。

```swift
&<#表达式#>
```

输入输出表达式也可以用于将非指针实参传入到需要指针的上下文中，如 <doc:Functions#In-Out-Parameters>.

In-out 表达式也可以用于将非指针实参传入到需要指针的上下文中，如 <doc:Expressions#Implicit-Conversion-to-a-Pointer-Type>.

> Grammar of an in-out expression:
>
> *in-out-expression* → **`&`** *标识符*

### Try 运算符

*try表达式*由 `try` 运算符加上紧随其后的可抛出错误的表达式组成，形式如下：

```swift
try <#表达式#>
```

`try` 表达式的返回值是该表达式的值。

*可选 try* 表达式由 `try?` 运算符加上紧随其后的可抛出错误的表达式组成，形式如下：

```swift
try? <#表达式#>
```

如果*表达式*没有抛出错误，可选 try 表达式的返回值是可选的该表达式的值，否则，返回值为 `nil`。

*强制 try 表达式*由 `try!` 运算符加上紧随其后的可抛出错误的表达式组成，形式如下：

```swift
try! <#表达式#>
```

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

更多关于 `try`、`try?` 和 `try!` 的信息，以及该如何使用的例子，请参阅 <doc:ErrorHandling>.

> Try 表达式语法
>
> *try运算符* → **`try`** | **`try`** **`?`** | **`try`** **`!`**

### Await 运算符

 *await表达式*由 await 运算符加上紧随其后的异步操作结果的表达式。形式如下：

```swift
await <#表达式#>
```

 `await` 表达式返回值就是该*表达式*的值。

被 `await` 标记的表达式被称为*潜在的暂停点*。

异步函数的执行可以在每个标记 `await` 的表达式的位置暂停。除此之外，并发代码的执行永远不会在其他位置暂停。这意味着在潜在暂停点之间的代码可以暂时打破不变量的状态进行安全更新，只要更新在下一个潜在暂停点之前完成。

await 表达式只能在异步的上下文中出现，比如传入 `async(priority:operation:)` 函数的尾随闭包中。它不能在 `defer` 语句的闭包中，或者在同步函数的自动闭包中出现。

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


> Await 表达式语法:
>
> *await运算符* → **`await`**

## 中缀表达式

*中缀表达式*由中缀运算符和左右参数表达式组成。形式如下：

```swift
<#left-左侧参数#> <#中缀运算符#> <#右侧参数t#>
```

关于这些运算符的更多信息，请参阅<doc:BasicOperators> 和 <doc:AdvancedOperators>.

关于 Swift 标准库提供的运算符的更多信息，请参阅[Operator Declarations](https://developer.apple.com/documentation/swift/operator_declarations).

> 注意
> 在解析时，一个中缀表达式将作为一个扁平列表表示，然后根据运算符的优先级，再进一步进行组合。例如，> `2 + 3 * 5` 首先被看作具有五个元素的列表，即 `2`、`+`、`3`、`*`、`5`，随后根据运算符优先级组合为 `(2 + > (3 * 5))`。

> Grammar of an infix expression:
>
> *infix-expression* → *infix-operator* *prefix-expression* \
> *infix-expression* → *assignment-operator* *try-operator*_?_ *await-operator*_?_ *prefix-expression* \
> *infix-expression* → *conditional-operator* *try-operator*_?_ *await-operator*_?_ *prefix-expression* \
> *infix-expression* → *type-casting-operator* \
> *infix-expressions* → *infix-expression* *infix-expressions*_?_

### 赋值表达式

赋值表达式会为某个给定的表达式赋值，形式如下；

```swift
<#表达式#> = <#值#>
```

右边的值会被赋值给左边的表达式。如果左边表达式是一个元组，那么右边必须是一个具有同样元素个数的元组。（嵌套元组也是允许的。）右边的值中的每一部分都会被赋值给左边的表达式中的相应部分。例如：

```swift
(a, _, (b, c)) = ("test", 9.45, (12, 3))
//  a 为 "test"，b 为 12，c 为 3，9.45 会被忽略
```

赋值运算符不返回任何值。

> Grammar of an assignment operator:
>
> *assignment-operator* → **`=`**

### 三元条件运算符

*三元条件运算符*会根据条件来对两个给定表达式中的一个进行求值，形式如下：

```swift
<#条件#> ? <#表达式 (条件为真则使用)#> : <#表达式（条件为假则使用）#>
```

如果条件为真，那么对第一个表达式进行求值并返回结果。否则，对第二个表达式进行求值并返回结果。未使用的表达式不会进行求值。

关于使用三元条件运算符的例子，请参阅 <doc:BasicOperators#Ternary-Conditional-Operator>.

> Grammar of a conditional operator:
>
> *conditional-operator* → **`?`** *expression* **`:`**

### 类型转换运算符

有 4 种类型转换运算符：is、as、as? 和 as!。它们有如下的形式：

```swift
<#表达式#> is <#类型#>
<#表达式#> as <#类型#>
<#表达式#> as? <#类型#>
<#表达式#> as! <#类型#>
```

`is` 运算符在运行时检查表达式能否向下转化为指定的类型，如果可以则返回 `ture`，否则返回 false。

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

桥接可将 Swift 标准库中的类型（例如 `String`）作为一个与之相关的 Foundation 类型（例如 `NSString`）来使用，而不需要新建一个实例。关于桥接的更多信息，请参阅[Working with Foundation Types](https://developer.apple.com/documentation/swift/imported_c_and_objective_c_apis/working_with_foundation_types).

`as?` 运算符有条件地执行类型转换，返回目标类型的可选值。在运行时，如果转换成功，返回的可选值将包含转换后的值，否则返回 `nil`。如果在编译时就能确定转换一定会成功或是失败，则会导致编译报错。

`as!` 运算符执行强制类型转换，返回目标类型的非可选值。如果转换失败，则会导致运行时错误。表达式 `x as! T` 效果等同于 `(x as? T)!`。

关于类型转换的更多内容和例子，请参阅 <doc:TypeCasting>.
要查看使用类型转换运算符的示例，请参阅 <doc:TypeCasting#Type-Casting-Operators>.

> Grammar of a type-casting operator:
>
> *type-casting-operator* → **`is`** *type* \
> *type-casting-operator* → **`as`** *type* \
> *type-casting-operator* → **`as`** **`?`** *type* \
> *type-casting-operator* → **`as`** **`!`** *type*

## 基本表达式

*基本表达式是最基本的表达式。它们可以单独使用，也可以跟前缀表达式、中置表达式、后缀表达式组合使用。

> Grammar of a primary expression:
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

字面量表达式可由普通字面量（例如字符串或者数字），字典或者数组字面量，或者下面列表中的特殊字面量组成：

> 注意：
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

数组中的最后一个表达式可以紧跟一个逗号。数组字面量的类型是 `[T]`，这个 `T` 就是数组中元素的类型。如果数组中包含多种类型，`T`  则是跟这些类型最近的的公共父类型。空数组字面量由一组方括号定义，可用来创建特定类型的空数组。

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

更多关于在 Xcode 中使用 playground 字面量的信息，请参阅[Add a color, file, or image literal](https://help.apple.com/xcode/mac/current/#/dev4c60242fc)
in Xcode Help.

> Grammar of a literal expression:
>
> *literal-expression* → *literal* \
> *literal-expression* → *array-literal* | *dictionary-literal* | *playground-literal*
>
> *array-literal* → **`[`** *array-literal-items*_?_ **`]`** \
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

 `self` 表达式是对当前类型或者当前实例的显式引用，它有如下形式：

```swift
self
self.<#成员名称#>
self[<#下标索引#>]
self(<#初始化器参数#>)
self.init(<#初始化器参数#>)
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

> Grammar of a self expression:
>
> *self-expression* → **`self`** | *self-method-expression* | *self-subscript-expression* | *self-initializer-expression*
>
> *self-method-expression* → **`self`** **`.`** *identifier* \
> *self-subscript-expression* → **`self`** **`[`** *function-call-argument-list* **`]`** \
> *self-initializer-expression* → **`self`** **`.`** **`init`**

### 父类表达式

*父类表达式*可以使我们在某个类中访问它的父类，它有如下形式：

```swift
super.<#成员名称#>
super[<#下标索引#>]
super.init(<#初始化器参数#>)
```

第一种形式用来访问父类的某个成员，第二种形式用来访问父类的下标，第三种形式用来访问父类的构造器。

子类可以通过父类表达式在它们的成员、下标和构造器中使用父类中的实现。

> Grammar of a superclass expression:
>
> *superclass-expression* → *superclass-method-expression* | *superclass-subscript-expression* | *superclass-initializer-expression*
>
> *superclass-method-expression* → **`super`** **`.`** *identifier* \
> *superclass-subscript-expression* → **`super`** **`[`** *function-call-argument-list* **`]`** \
> *superclass-initializer-expression* → **`super`** **`.`** **`init`**

### 闭包表达式

*闭包表达式*会创建一个闭包，在其他语言中也叫 *lambda* 或匿名函数。跟函数一样，闭包包含了待执行的代码，不同的是闭包还会捕获所在环境中的常量和变量。它的形式如下：

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

如果闭包的主体中含有 try 表达式，则认为该闭包会引发异常。同理，若闭包主体含有 await 表达式，则认为该闭包是异步的。

闭包还有几种特殊的形式，能让闭包使用起来更加简洁：

  - 作为变量赋值的值。
  - 作为变量或常量声明的初始值。
  - 作为 `throw` 表达式引发的错误。
  - 作为函数、闭包或属性 getter 的返回值。
  - 作为条件表达式分支中的值。

条件表达式的分支是穷尽的，确保表达式总是会返回一个值，无论条件如何。这意味着每个 `if` 分支都需要一个对应的 `else` 分支。

无论条件如何，这意味着每个 `if` 分支都需要一个对应的 `else` 分支。

每个分支包含一个单独的表达式，该表达式在该分支的条件为真时用作条件表达式的值，或者是一个 `throw` 语句，或是一个永不返回的函数调用。

每个分支必须产生相同类型的值。由于每个分支的类型检查是独立的，有时你需要明确指定值的类型，例如当分支包含不同类型的字面量，或者当某个分支的值为 `nil` 时。当你需要提供这些信息时，可以在结果赋值的变量上添加类型注解，或者在分支值上添加 `as` 类型转换。

```swift
let number: Double = if someCondition { 10 } else { 12.34 }
let number = if someCondition { 10 as Double } else { 12.34 }
```

在结果构建器内，条件表达式只能作为变量或常量的初始值出现。这种行为意味着，当你在结果构建器中编写 `if` 或 `switch` —— 在变量或常量声明之外 —— 这段代码被理解为分支语句，并且结果构建器的一个方法会对这段代码进行转换。

即使条件表达式的某个分支会抛出异常，也不要将条件表达式放入 try 表达式中。

> Grammar of a conditional expression:
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

*闭包表达式*会创建一个闭包，在其他语言中也叫 *lambda* 或匿名函数。跟函数一样，闭包包含了待执行的代码，不同的是闭包还会捕获所在环境中的常量和变量。它的形式如下：

```swift
{ (<#parameters#>) -> <#return type#> in
   <#statements#>
}
```

闭包的参数声明形式跟函数一样，请参阅 <doc:Declarations#Function-Declaration>.

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

关于逃逸闭包的内容，请参阅<doc:Closures#Escaping-Closures>.

#### 捕获列表

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
// 打印 "10 10"
```

如果捕获列表中的值是类类型，你可以使用 `weak` 或者 `unowned` 来修饰它，闭包会分别用弱引用和无主引用来捕获该值。

```swift
myFunction { print(self.title) }                    // implicit strong capture
myFunction { [self] in print(self.title) }          // explicit strong capture
myFunction { [weak self] in print(self!.title) }    // weak capture
myFunction { [unowned self] in print(self.title) }  // unowned capture
```

在捕获列表中，也可以将任意表达式的值绑定到一个常量上。该表达式会在闭包被创建时进行求值，闭包会按照指定的引用类型来捕获表达式的值。例如：

```swift
// 以弱引用捕获 self.parent 并赋值给 parent
myFunction { [weak parent = self.parent] in print(parent!.title) }
```

关于闭包表达式的更多信息和例子，请参阅 <doc:Closures#Closure-Expressions>.

关于捕获列表的更多信息和例子，请参阅 <doc:AutomaticReferenceCounting#Resolving-Strong-Reference-Cycles-for-Closures>.

> Grammar of a closure expression:
>
> *closure-expression* → **`{`** *attributes*_?_ *closure-signature*_?_ *statements*_?_ **`}`**
>
> *closure-signature* → *capture-list*_?_ *closure-parameter-clause* **`async`**_?_ *throws-clause*_?_ *function-result*_?_ **`in`** \
> *closure-signature* → *capture-list* **`in`**
>
> *closure-parameter-clause* → **`(`** **`)`** | **`(`** *closure-parameter-list* **`)`** | *identifier-list* \
> *closure-parameter-list* → *closure-parameter* | *closure-parameter* **`,`** *closure-parameter-list* \
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

*若类型*可被推断出来，可以使用*隐式成员表达式*来访问某个类型的成员（例如某个枚举成员或某个类型方法），形式如下：

```swift
.<#成员名称#>
```

例如：

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

> Grammar of an implicit member expression:
>
> *implicit-member-expression* → **`.`** *identifier* \
> *implicit-member-expression* → **`.`** *identifier* **`.`** *postfix-expression*

### 圆括号表达式

圆括号表达式是由圆括号包围的表达式。你可以用圆括号说明成组的表达式的先后操作。成组的圆括号不会改变表达式的类型 - 例如 `(1)` 的类型就是简单的 `Int`。

> Grammar of a parenthesized expression:
>
> *parenthesized-expression* → **`(`** *expression* **`)`**

### 元组表达式

元组表达式由圆括号和其中多个逗号分隔的子表达式组成。每个子表达式前面可以有一个标识符，用冒号隔开。元组表达式形式如下：

```swift
(<#标识符 1#>: <#表达式 1#>, <#标识符 2#>: <#表达式 2#>, <#...#>)
```

元组表达式里的每一个标识符在表达式作用域里必须是唯一的。在嵌套的元组表达式中，同嵌套层级里的标识符也必须是唯一的。例如，`(a: 10, a: 20)` 是不合法的，因为标签 `a` 在同一层级出现了两次。然而，`(a: 10, b: (a: 1, x: 2))` 是合法的，尽管 `a` 出现了两次，但有一次在外层元组里，一次在内层元组里。

元组表达式可以一个表达式都没有，也可以包含两个或是更多的表达式。单个表达式用括号括起来就是括号表达式了。

> Note: Both an empty tuple expression and an empty tuple type
> are written `()` in Swift.
> Because `Void` is a type alias for `()`,
> you can use it to write an empty tuple type.
> However, like all type aliases, `Void` is always a type ---
> you can't use it to write an empty tuple expression.

> Grammar of a tuple expression:
>
> *tuple-expression* → **`(`** **`)`** | **`(`** *tuple-element* **`,`** *tuple-element-list* **`)`** \
> *tuple-element-list* → *tuple-element* | *tuple-element* **`,`** *tuple-element-list* \
> *tuple-element* → *expression* | *identifier* **`:`** *expression*

### 通配符表达式

*通配符表达式*可以在赋值过程中显式忽略某个值。例如下面的代码中，`10` 被赋值给 `x`，而 `20` 则被忽略：

```swift
(x, _) = (10, 20)
// x  为 10，20 被忽略
```

> Grammar of a wildcard expression:
>
> *wildcard-expression* → **`_`**

### 宏扩展表达式

*宏扩展表达式*由一个宏名称和一个用逗号分隔的宏参数列表（在括号内）组成。宏在编译时被扩展。宏扩展表达式的形式如下：

```swift
<#macro name#>(<#macro argument 1#>, <#macro argument 2#>)
```

如果宏不接受任何参数，宏扩展表达式可以省略宏名称后面的括号。

宏扩展表达式不能作为参数的默认值，除了 Swift 标准库中的 [`file()`][] 和 [`line()`][] 宏。当这些宏作为函数或方法参数的默认值时，它们会使用调用位置的源代码位置进行评估，而不是在函数定义中出现的位置。

[`file()`]: https://developer.apple.com/documentation/swift/file()
[`line()`]: https://developer.apple.com/documentation/swift/line()

你使用宏表达式来调用独立宏。要调用附加宏，请使用在 <doc:Attributes>.
中描述的自定义属性语法。独立宏和附加宏的扩展方式如下：

1. Swift 解析源代码以生成抽象语法树（AST）。

2. 宏实现接收 AST 节点作为输入，并执行该宏所需的转换。

3. 宏实现生成的转换后 AST 节点会被添加到原始 AST 中。

每个宏的扩展是独立且自包含的。然而，为了优化性能，Swift 可能会启动一个外部进程来实现宏，并重用同一个进程来扩展多个宏。当你实现一个宏时，该代码不能依赖于你的代码之前扩展过的宏，也不能依赖于任何其他外部状态，例如当前时间。

对于嵌套宏和具有多个角色的附加宏，扩展过程会重复。嵌套的宏扩展表达式是从外到内进行扩展的。例如，在下面的代码中，`outerMacro(_:)` 首先被扩展，未扩展的对 `innerMacro(_:)` 的调用出现在 `outerMacro(_:)` 作为输入接收的抽象语法树中。

```swift
#outerMacro(12, #innerMacro(34), "some text")
```

一个具有多个角色的附加宏会针对每个角色进行一次扩展。每次扩展都接收相同的原始 AST 作为输入。Swift 通过收集所有生成的 AST 节点，并将它们放入 AST 中相应的位置，形成整体扩展。

有关 Swift 中宏的概述 请参阅 <doc:Macros>。

> Grammar of a macro-expansion expression:
>
> *macro-expansion-expression* → **`#`** *identifier* *generic-argument-clause*_?_ *function-call-argument-clause*_?_ *trailing-closures*_?_

### Key-Path 表达式

Key-path 表达式引用一个类型的属性或下标。在动态语言中使场景可以使用 Key-path 表达式，例如观察键值对。格式为：

```swift
\<#类型名#>.<#路径#>
```

*类型名*是一个具体类型的名称，包含任何泛型参数，例如 `String`、`[Int]` 或 `Set<Int>`。

*路径*可由属性名称、下标、可选链表达式或者强制解包表达式组成。以上任意 key-path 组件可以以任何顺序重复多次。

在编译期，key-path 表达式会被一个 [`KeyPath`](https://developer.apple.com/documentation/swift/keypath) 类的实例替换。

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
// Equivalent to compoundValue = (a: 10, b: 20)
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
// nestedValue is 24
```

路径中也可以包含使用中括号的下标访问，只要下标访问的参数类型满足 `Hashable` 协议即可。下面的例子在 key path 中使用了下标来访问数组的第二个元素。

```swift
let greetings = ["hello", "hola", "bonjour", "안녕"]
let myGreeting = greetings[keyPath: \[String].[1]]
// myGreeting is 'hola'
```

T下标访问中使用的值可以是一个变量或者字面量，并且 key-path 表达式会使用值语义来捕获此值。下面的代码在 key-path 表达式和闭包中都使用了 `index` 变量来访问 `greetings` 数组的第三个元素。当 `index` 被修改时，key-path 表达式仍旧引用数组第三个元素，而闭包则使用了新的索引值。

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

//  'fn' 闭包使用了新值。
print(fn(greetings))
// 打印 "안녕"
```

路径可以使用可选链和强制解包。下面的代码在 key path 中使用了可选链来访问可选字符串的属性。

```swift
let firstGreeting: String? = greetings.first
print(firstGreeting?.count as Any)
// Prints "Optional(5)"

// Do the same thing using a key path.
let count = greetings[keyPath: \[String].first?.count]
print(count as Any)
// Prints "Optional(5)"
```

可以混合使用各种 key path 组件来访问一些深度嵌套类型的值。下面的代码通过组合不同的组件，使用 key-path 表达式访问了一个字典数组中不同的值和属性。

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
// The line below calls makeIndex().
let taskKeyPath = \[Task][makeIndex()]
// Prints "Made an index"

// Using taskKeyPath doesn't call makeIndex() again.
let someTask = toDoList[keyPath: taskKeyPath]
```

关于更多如何使用 key path 与 Objective-C APIs 交互的信息，请参阅 [Using Objective-C Runtime Features in Swift](https://developer.apple.com/documentation/swift/using_objective_c_runtime_features_in_swift).
关于更多 key-value 编程和 key-value 观察的信息，请参阅 [Key-Value Coding Programming Guide](https://developer.apple.com/library/content/documentation/Cocoa/Conceptual/KeyValueCoding/index.html#//apple_ref/doc/uid/10000107i)
和 [Key-Value Observing Programming Guide](https://developer.apple.com/library/content/documentation/Cocoa/Conceptual/KeyValueObserving/KeyValueObserving.html#//apple_ref/doc/uid/10000177i).

> Grammar of a key-path expression:
>
> *key-path-expression* → **`\`** *type*_?_ **`.`** *key-path-components* \
> *key-path-components* → *key-path-component* | *key-path-component* **`.`** *key-path-components* \
> *key-path-component* → *identifier* *key-path-postfixes*_?_ | *key-path-postfixes*
>
> *key-path-postfixes* → *key-path-postfix* *key-path-postfixes*_?_ \
> *key-path-postfix* → **`?`** | **`!`** | **`self`** | **`[`** *function-call-argument-list* **`]`**

### 选择器表达式

*选择器表达式*可以让你通过选择器来引用在 Objective-C 中方法（method）和属性（property）的 setter 和 getter 方法。

```swift
#selector(<#method name#>)
#selector(getter: <#property name#>)
#selector(setter: <#property name#>)
```

方法名和属性名必须是存在于 Objective-C 运行时中的方法和属性的引用。选择器表达式的返回值是一个 Selector 类型的实例。例如：

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

当为属性的 getter 创建选择器时，属性名可以是变量属性或者常量属性的引用。但是当为属性的 setter 创建选择器时，属性名只可以是对变量属性的引用。

方法名称可以包含圆括号来进行分组，并使用 as 操作符来区分具有相同方法名但类型不同的方法，例如:

```swift
extension SomeClass {
    @objc(doSomethingWithString:)
    func doSomething(_ x: String) { }
}
let anotherSelector = #selector(SomeClass.doSomething(_:) as (SomeClass) -> (String) -> Void)
```

由于选择器是在编译时创建的，因此编译器可以检查方法或者属性是否存在，以及是否在运行时暴露给了 Objective-C 。

> Note: Although the *method name* and the *property name* are expressions,
> they're never evaluated.

更多关于如何在 Swift 代码中使用选择器来与 Objective-C API 进行交互的信息，请参阅 [Using Objective-C Runtime Features in Swift](https://developer.apple.com/documentation/swift/using_objective_c_runtime_features_in_swift).

> Grammar of a selector expression:
>
> *selector-expression* → **`#selector`** **`(`** *expression* **`)`** \
> *selector-expression* → **`#selector`** **`(`** **`getter:`** *expression* **`)`** \
> *selector-expression* → **`#selector`** **`(`** **`setter:`** *expression* **`)`**

### Key-Path 字符串表达式

key-path 字符串表达式可以访问一个引用 Objective-C 属性的字符串，通常在 key-value 编程和 key-value 观察 APIs 中使用。其格式如下：

```swift
#keyPath(<#property name#>)
```

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
        return #keyPath(someProperty)
    }
}
print(keyPath == c.getSomeKeyPath())
// 打印 "true"
```

由于 key-path 字符串表达式在编译期才创建，编译期可以检查属性是否存在，以及属性是否暴露给 Objective-C 运行时。

关于更多如何使用 key path 与 Objective-C APIs 交互的信息，请参阅 [Using Objective-C Runtime Features in Swift](https://developer.apple.com/documentation/swift/using_objective_c_runtime_features_in_swift).
关于更多 key-value 编程和 key-value 观察的信息，请参阅 [Key-Value Coding Programming Guide](https://developer.apple.com/library/content/documentation/Cocoa/Conceptual/KeyValueCoding/index.html#//apple_ref/doc/uid/10000107i)
和 [Key-Value Observing Programming Guide](https://developer.apple.com/library/content/documentation/Cocoa/Conceptual/KeyValueObserving/KeyValueObserving.html#//apple_ref/doc/uid/10000177i).

> Note: Although the *property name* is an expression, it's never evaluated.

> Grammar of a key-path string expression:
>
> *key-path-string-expression* → **`#keyPath`** **`(`** *expression* **`)`**

## 后缀表达式

*后缀表达式*就是在某个表达式的后面运用后缀运算符或其他后缀语法。从语法构成上来看，基本表达式也是后缀表达式。

关于这些运算符的更多信息，请参阅 <doc:BasicOperators> 和 <doc:AdvancedOperators>.

关于 Swift 标准库提供的运算符的更多信息，请参阅 [Operator Declarations](https://developer.apple.com/documentation/swift/operator_declarations).

> Grammar of a postfix expression:
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

*函数调用表达式*由函数名和在括号里以逗号分隔的参数列表组成。函数调用表达式形式如下：

```swift
<#function name#>(<#argument value 1#>, <#argument value 2#>)
```

函数名可以是值为函数类型的任意表达式。

如果函数声明中指定了形参的名字，那么在调用的时候也必须得写出来，并通过冒号（`:`）分隔。这种函数调用表达式具有以下形式：

```swift
<#function name#>(<#argument name 1#>: <#argument value 1#>, <#argument name 2#>: <#argument value 2#>)
```

函数调用表达式可以在函数调用表达式的尾部（右圆括号之后）加上多个尾随闭包，该闭包会作为函数的实参，在括号中最后一个实参后面添加。第一个闭包表达式时没有实参签名的，其他任意闭包表达式签名都有实参标签。如下两种写法是等价的，区别在是否使用尾随闭包语法：

```swift
// someFunction 接受整型和闭包的实参
someFunction(x: x, f: { $0 == 13 })
someFunction(x: x) { $0 == 13 }

// anotherFunction 接受一个整型和两个闭包的实参
anotherFunction(x: x, f: { $0 == 13 }, g: { print(99) })
anotherFunction(x: x) { $0 == 13 } g: { print(99) }
```

如果闭包是该函数的唯一实参，那么圆括号可以省略。

```swift
// someMethod 只接受一个闭包参数
myData.someMethod() { $0 == 13 }
myData.someMethod { $0 == 13 }
```

为了支持实参中的尾随闭包，编译器从左到右检查形参列表，如下所示：

| 尾随闭包 | 形参 | 行为 |
| ---------------- | --------- | ------ |
| 有标签 | 有标签 | 如果标签相同，闭包和形参匹配，否则跳过该形参 |
| 有标签 | 无标签 | 跳过该形参 |
| 无标签 | 有标签或无标签 | 如果形参在结构上类似于下面定义的函数类型，和闭包匹配，否则跳过该形参|

尾随闭包作为其匹配形参的实参传递。

在扫描过程被跳过的形参不传递实参——例如，它们使用的是默认形参。当匹配后，扫描会继续下一个尾随闭包和形参。匹配过程结束后，所有的尾随闭包必须有对应的匹配。

如果形参不是输入输出参数，并且类似下面的情况，则算是结构上类似函数类型：

- 函数类型的形参，例如 `(Bool) -> Int`
- 函数类型表达式的自动闭包形参，例如 `@autoclosure () -> ((Bool) -> Int)`
- 元素是函数类型的可变参数，例如 `((Bool) -> Int)...`
- 单层或多层可选类型的形参，例如 `Optional<(Bool) -> Int>`
- 由上面这些类型组合而成的形参，例如 `(Optional<(Bool) -> Int>)...`

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


如 <doc:Declarations#Methods-with-Special-Names>所述，通过声明几种方法中的一种，类、结构体或枚举类型可以为函数调用语法启用语法糖。

#### 指针类型的隐式转换

在函数调用表达式里，如果实参和形参的类型不一致，编译器会尝试通过下面的规则进行隐式转换来匹配类型：

- `inout SomeType` can become
  `UnsafePointer<SomeType>` or `UnsafeMutablePointer<SomeType>`
- `inout Array<SomeType>` can become
  `UnsafePointer<SomeType>` or `UnsafeMutablePointer<SomeType>`
- `Array<SomeType>` can become `UnsafePointer<SomeType>`
- `String` can become `UnsafePointer<CChar>`

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

> Note: When implicitly converting an array to an unsafe pointer,
> Swift ensures that the array's storage is contiguous
> by converting or copying the array as needed.
> For example, you can use this syntax
> with an array that was bridged to `Array`
> from an `NSArray` subclass that makes no API contract about its storage.
> If you need to guarantee that the array's storage is already contiguous,
> so the implicit conversion never needs to do this work,
> use `ContiguousArray` instead of `Array`.

使用 `&` 代替类似 `withUnsafePointer(to:)` 的显式函数可以在调用底层 C 函数的可读性更高，特别是当函数传入多个指针实参时。如果是其他 Swift 代码调用函数，避免使用 `&` 代替显式的不安全 API。

> Grammar of a function call expression:
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

*构造器表达式*用于访问某个类型的构造器，形式如下：

```swift
<#expression#>.init(<#initializer arguments#>)
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

> Grammar of an initializer expression:
>
> *initializer-expression* → *postfix-expression* **`.`** **`init`** \
> *initializer-expression* → *postfix-expression* **`.`** **`init`** **`(`** *argument-names* **`)`**

### 显式成员表达式

*显式成员表达式*允许我们访问命名类型、元组或者模块的成员，其形式如下：

```swift
<#expression#>.<#member name#>
```

命名类型的某个成员在原始实现或者扩展中定义，例如：

```swift
class SomeClass {
    var someProperty = 42
}
let c = SomeClass()
let y = c.someProperty  // 访问成员
```

元组的成员会隐式地根据表示它们出现顺序的整数来命名，以 0 开始，例如：

```swift
var t = (10, 20, 30)
t.0 = t.1
// 现在元组 (20, 20, 30)
```

对于模块的成员来说，只能直接访问顶级声明中的成员。

使用 `dynamicMemberLookup` 属性声明的类型包含可以在运行时查找的成员，具体请参阅 <doc:Attributes>.

为了区分只有参数名有所不同的方法或构造器，在圆括号中写出参数名，参数名后紧跟一个冒号，对于没有参数名的参数，使用下划线代替参数名。而对于重载方法，则需使用类型注解进行区分。例如：

```swift
class SomeClass {
    func someMethod(x: Int, y: Int) {}
    func someMethod(x: Int, z: Int) {}
    func overloadedMethod(x: Int, y: Int) {}
    func overloadedMethod(x: Int, y: Bool) {}
}
let instance = SomeClass()

let a = instance.someMethod              // Ambiguous
let b = instance.someMethod(x:y:)        // Unambiguous

let d = instance.overloadedMethod        // Ambiguous
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

你可以将这种多行链式语法与编译器控制语句结合，以控制调用每个方法的时间。例如，以下代码在 iOS 上应用了不同的过滤规则：

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

> Grammar of an explicit member expression:
>
> *explicit-member-expression* → *postfix-expression* **`.`** *decimal-digits* \
> *explicit-member-expression* → *postfix-expression* **`.`** *identifier* *generic-argument-clause*_?_ \
> *explicit-member-expression* → *postfix-expression* **`.`** *identifier* **`(`** *argument-names* **`)`** \
> *explicit-member-expression* → *postfix-expression* *conditional-compilation-block*
>
> *argument-names* → *argument-name* *argument-names*_?_ \
> *argument-name* → *identifier* **`:`**

### 后缀 Self 表达式

后缀 `self` 表达式由某个表达式或类型名紧跟 `.self` 组成，其形式如下：

```swift
<#expression#>.self
<#type#>.self
```

第一种形式返回表达式的值。例如：`x.self` 返回 `x`。

第二种形式返回相应的类型。我们可以用它来获取某个实例的类型作为一个值来使用。例如，`SomeClass.self` 会返回 `SomeClass` 类型本身，你可以将其传递给相应函数或者方法作为参数。

> Grammar of a postfix self expression:
>
> *postfix-self-expression* → *postfix-expression* **`.`** **`self`**

### 下标表达式

可通过*下标表达式*访问相应的下标，形式如下：

```swift
<#expression#>[<#index expressions#>]
```

要获取下标表达式的值，可将索引表达式作为下标表达式的参数来调用下标 getter。下标 setter 的调用方式与之一样。

关于下标的声明，请参阅 <doc:Declarations#Protocol-Subscript-Declaration>.

> Grammar of a subscript expression:
>
> *subscript-expression* → *postfix-expression* **`[`** *function-call-argument-list* **`]`**

### 强制取值表达式

当你确定可选值不是 `nil` 时，可以使用*强制取值表达式*来强制解包，形式如下：

```swift
<#expression#>!
```

I如果该表达式的值不是 `nil`，则返回解包后的值。否则，抛出运行时错误。

返回的值可以被修改，无论是修改值本身，还是修改值的成员。例如：

```swift
var x: Int? = 0
x! += 1
// x 现在是 1

var someDictionary = ["a": [1, 2, 3], "b": [10, 20]]
someDictionary["a"]![0] = 100
// someDictionary 现在是 ["a": [100, 2, 3], "b": [10, 20]]
```

> Grammar of a forced-value expression:
>
> *forced-value-expression* → *postfix-expression* **`!`**

### 可选链表达式

可选链表达式提供了一种使用可选值的便捷方法，形式如下：

```swift
<#expression#>?
```

后缀 `?` 运算符会根据表达式生成可选链表达式而不会改变表达式的值。

如果某个后缀表达式包含可选链表达式，那么它的执行过程会比较特殊。如果该可选链表达式的值是 `nil`，整个后缀表达式会直接返回 `nil`。如果该可选链表达式的值不是 `nil`，则返回可选链表达式解包后的值，并将该值用于后缀表达式中剩余的表达式。在这两种情况下，整个后缀表达式的值都会是可选类型。

如果某个后缀表达式中包含了可选链表达式，那么只有最外层的表达式会返回一个可选类型。例如，在下面的例子中，如果 c 不是 `nil`，那么它的值会被解包，然后通过 `.property` 访问它的属性，接着进一步通过 `.performAction()` 调用相应方法。整个 `c?.property.performAction()` 表达式返回一个可选类型的值，而不是多重可选类型。

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

>可选链表达式语法：
>
> *可选链表达式* → *后缀表达式* **`?`**

> 测试版软件：
>
> 此文档包含有关正在开发的 API 或技术的初步信息。这些信息可能会发生变化，按照此文档实现的软件应在最终操作系统软件下进行测试。
>
> 了解更多关于使用的内容[Apple's beta software](https://developer.apple.com/support/beta-software/).

