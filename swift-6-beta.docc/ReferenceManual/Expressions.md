# 表达

访问,修改和赋值. 

在Swift中,有四种表达式:
前缀表达式,中缀表达式,主表达式和后缀表达式
计算表达式会返回一个值,
产生一个副作用,或同时产生这两个结果。

前缀和中间缀表达式允许您
将运算符应用于更小的表达式。
主表达式在概念上是最简单的表达式,
它们提供了一种访问值的方法。
后缀表达式
与前缀和中间缀表达式一样
允许您使用后缀(如函数调用和成员访问)
构建更复杂的表达式。
每种表达式都将在
以下部分中详细描述。

> 表达语法:
>
> *expression* → *try-operator*_?_ *await-operator*_?_ *prefix-expression* *infix-expressions*_?_ \

## 前缀表达式

*前缀表达式* 将
可选的前缀运算符与表达式结合在一起。
前缀运算符接受一个参数,
即紧随其后的表达式

有关这些运营商行为的信息,
看 <doc:BasicOperators> 和 <doc:AdvancedOperators>.

有关Swift标准库提供的操作符的信息,
看[Operator Declarations](https://developer.apple.com/documentation/swift/operator_declarations).

> 前缀表达的语法:
>
> *prefix-expression* → *prefix-operator*_?_ *postfix-expression* \
> *prefix-expression* → *in-out-expression*

### 输入输出表达式

*输入输出表达式* 标记作为输入输出参数传递给函数调用表达式的变量.

```swift
&<#expression#>
```

如需了解进出参数的更多信息并查看示例,
看 <doc:Functions#In-Out-Parameters>.

在需要指针的上下文中提供非指针参数时，也会使用输入输出表达式，如 <doc:Expressions#Implicit-Conversion-to-a-Pointer-Type>.

> 输入输出表达式的语法:
>
> *in-out-expression* → **`&`** *primary-expression*

### 尝试操作员

 *try 表达式* 由 try 操作符
后跟一个可能引发错误的表达式组成。
其格式如下:

```swift
try <#expression#>
```
`try` 表达式的值是 *表达式*的值.

可选尝试表达式由`try?` 操作符
后跟可能引发错误的表达式组成。
其形式如下:


```swift
try? <#expression#>
```

如果 *表达式* 没有引发错误,
可选-尝试表达式的值
是一个可选的,包含 *表达式的值* .
否则,可选-尝试表达式的值为`nil`.

一个*强制-尝试表达式*由`try!`操作符
后跟一个可能引发错误的表达式组成。
它具有以下形式:

```swift
try! <#expression#>
```

强制尝试表达式的值就是*表达式的值。
如果*表达式*抛出错误,
就会产生运行时错误。

当中缀运算符左侧的表达式
带有 `try`、`try?`或 `try!`标记时,
该运算符将应用于整个中缀表达式。
也就是说,你可以使用括号来明确运算符的应用范围.

```swift
// try applies to both function calls
sum = try someThrowingFunction() + anotherThrowingFunction()

// try applies to both function calls
sum = try (someThrowingFunction() + anotherThrowingFunction())

// Error: try applies only to the first function call
sum = (try someThrowingFunction()) + anotherThrowingFunction()
```

<!--
  - test: `placement-of-try`

  ```swifttest
  >> func someThrowingFunction() throws -> Int { return 10 }
  >> func anotherThrowingFunction() throws -> Int { return 5 }
  >> var sum = 0
  // try applies to both function calls
  -> sum = try someThrowingFunction() + anotherThrowingFunction()
  ---
  // try applies to both function calls
  -> sum = try (someThrowingFunction() + anotherThrowingFunction())
  ---
  // Error: try applies only to the first function call
  -> sum = (try someThrowingFunction()) + anotherThrowingFunction()
  !$ error: call can throw but is not marked with 'try'
  !! sum = (try someThrowingFunction()) + anotherThrowingFunction()
  !!                                      ^~~~~~~~~~~~~~~~~~~~~~~~~
  !$ note: did you mean to use 'try'?
  !! sum = (try someThrowingFunction()) + anotherThrowingFunction()
  !!                                      ^
  !!                                      try
  !$ note: did you mean to handle error as optional value?
  !! sum = (try someThrowingFunction()) + anotherThrowingFunction()
  !!                                      ^
  !!                                      try?
  !$ note: did you mean to disable error propagation?
  !! sum = (try someThrowingFunction()) + anotherThrowingFunction()
  !!                                      ^
  !!                                      try!
  ```
-->

`try`表达式不能出现在中缀运算符的右侧,
除非中缀运算符是赋值运算符,
或者`try`表达式被括在括号内


<!--
  - test: `try-on-right`

  ```swifttest
  >> func someThrowingFunction() throws -> Int { return 10 }
  >> var sum = 0
  -> sum = 7 + try someThrowingFunction() // Error
  !$ error: 'try' cannot appear to the right of a non-assignment operator
  !! sum = 7 + try someThrowingFunction() // Error
  !!           ^
  -> sum = 7 + (try someThrowingFunction()) // OK
  ```
-->

如果一个表达式同时包含`try`和`await`操作符,
则`try`操作符必须出现在前面。


<!--
  The "try await" ordering is also part of the grammar for 'expression',
  but it's important enough to be worth re-stating in prose.
-->

欲了解更多信息,并查看如何使用`try`、`try?`和`try!`的示例,
请参阅 <doc:ErrorHandling>.

> 尝试表达的语法:
>
> *try-operator* → **`try`** | **`try`** **`?`** | **`try`** **`!`**

### 等待操作员

*等待表达式*由`await`操作符
后跟使用异步操作结果的表达式组成.
其形式如下:

```swift
await <#expression#>
```
带有`await`的表达式称为*潜在暂停点*。
异步函数的执行可以暂停
在每个带有`await`的表达式。
此外,
并发代码的执行永远不会暂停在任何其他点。
这意味着潜在暂停点之间的代码
可以安全地更新需要暂时打破不变量的状态,
前提是它完成更新
在下一个潜在暂停点之前。

`await` 表达式只能出现在异步上下文中,
例如传递给 `async(priority:operation:)` 函数的尾部闭包。
它不能出现在 `defer` 语句的体内,
也不能出现在同步函数类型的自动闭包中。

当中缀运算符左侧的表达式
带有`await`运算符时,
该运算符将应用于整个中缀表达式。
也就是说,你可以使用括号
来明确运算符的应用范围。

```swift
// await applies to both function calls
sum = await someAsyncFunction() + anotherAsyncFunction()

// await applies to both function calls
sum = await (someAsyncFunction() + anotherAsyncFunction())

// Error: await applies only to the first function call
sum = (await someAsyncFunction()) + anotherAsyncFunction()
```

<!--
  - test: `placement-of-await`

  ```swifttest
  >> func someAsyncFunction() async -> Int { return 10 }
  >> func anotherAsyncFunction() async -> Int { return 5 }
  >> func f() async {
  >> var sum = 0
  // await applies to both function calls
  -> sum = await someAsyncFunction() + anotherAsyncFunction()
  ---
  // await applies to both function calls
  -> sum = await (someAsyncFunction() + anotherAsyncFunction())
  ---
  // Error: await applies only to the first function call
  -> sum = (await someAsyncFunction()) + anotherAsyncFunction()
  >> _ = sum  // Suppress irrelevant written-but-not-read warning
  >> }
  !$ error: expression is 'async' but is not marked with 'await'
  !! sum = (await someAsyncFunction()) + anotherAsyncFunction()
  !! ^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  !! await
  !$ note: call is 'async'
  !! sum = (await someAsyncFunction()) + anotherAsyncFunction()
  !! ^
  ```
-->

`await`表达式不能出现在中缀运算符的右侧,
除非中缀运算符是赋值运算符,
或者”等待"表达式被括在括号内。

<!--
  - test: `await-on-right`

  ```swifttest
  >> func f() async {
  >> func someAsyncFunction() async -> Int { return 10 }
  >> var sum = 0
  >> sum = 7 + await someAsyncFunction()    // Error
  !$ error: 'await' cannot appear to the right of a non-assignment operator
  !! sum = 7 + await someAsyncFunction()    // Error
  !! ^
  >> sum = 7 + (await someAsyncFunction())  // OK
  >> _ = sum  // Suppress irrelevant written-but-not-read warning
  >> }
  ```
-->

如果一个表达式同时包含`await`和`try`操作符,
则`try`操作符必须放在前面.

<!--
  The "try await" ordering is also part of the grammar for 'expression',
  but it's important enough to be worth re-stating in prose.
-->

> 等待表达的语法:
>
> *await-operator* → **`await`**

## 中间词表达

*中缀表达式*将
中缀二元运算符与其
作为左右参数的表达式结合在一起。
其形式如下:

```swift
<#left-hand argument#> <#operator#> <#right-hand argument#>
```

关于这些运营商的行为,
请参阅 <doc:BasicOperators> 和 <doc:AdvancedOperators>.

有关Swift标准库提供的操作符的信息,
请参阅 [Operator Declarations](https://developer.apple.com/documentation/swift/operator_declarations).

<!--
  You have essentially expression sequences here, and within it are
  parts of the expressions.  We're calling them "expressions" even
  though they aren't what we ordinarily think of as expressions.  We
  have this two-phase thing where we do the expression sequence parsing
  which gives a rough parse tree.  Then after name binding we know
  operator precedence and we do a second phase of parsing that builds
  something that's a more traditional tree.
-->

> 备注:解析时,
> 由中缀运算符组成的表达式用
> 作为一张平面列表.
> 这个列表会变成一棵树
> 通过应用运算符优先级.
> 例如,表达 `2 + 3 * 5`
> 最初被理解为五个项目的列表,
> `2`, `+`, `3`, `*`, 和 `5`.
> 这个过程将树木转化成 (2 + (3 * 5)).

> 中缀表达的语法:
>
> *infix-expression* → *infix-operator* *prefix-expression* \
> *infix-expression* → *assignment-operator* *try-operator*_?_ *await-operator*_?_ *prefix-expression* \
> *infix-expression* → *conditional-operator* *try-operator*_?_ *await-operator*_?_ *prefix-expression* \
> *infix-expression* → *type-casting-operator* \
> *infix-expressions* → *infix-expression* *infix-expressions*_?_

### 作业员

*赋值运算符*为给定的表达式设置新的值。

其形式如下:

```swift
<#expression#> = <#value#>
```

*表达式*的值
由计算*值*得到的值确定。
如果*表达式*是一个元组,
*value*必须是一个
元素数量相同的元组
(允许嵌套元组)。
赋值从*value*的每个部分
到*表达式*的对应部分。
例如:

```swift
(a, _, (b, c)) = ("test", 9.45, (12, 3))
// a is "test", b is 12, c is 3, and 9.45 is ignored
```

<!--
  - test: `assignmentOperator`

  ```swifttest
  >> var (a, _, (b, c)) = ("test", 9.45, (12, 3))
  -> (a, _, (b, c)) = ("test", 9.45, (12, 3))
  /> a is \"\(a)\", b is \(b), c is \(c), and 9.45 is ignored
  </ a is "test", b is 12, c is 3, and 9.45 is ignored
  ```
-->

赋值运算符不返回任何值.

> 赋值运算符的语法:
>
> *assignment-operator* → **`=`**

### 三元条件运算符

*三元条件运算符* 根据条件值
计算两个给定值之一。
其形式如下:

```swift
<#condition#> ? <#expression used if true#> : <#expression used if false#>
```

如果*条件*的值为`true`,
则条件运算符将计算第一个表达式
并返回其值。
否则,它将计算第二个表达式
并返回其值。
未使用的表达式将不进行计算

For an example that uses the ternary conditional operator,
see <doc:BasicOperators#Ternary-Conditional-Operator>.

> 条件运算符的语法:
>
> *conditional-operator* → **`?`** *expression* **`:`**

### 类型铸造操作员

有四种类型转换操作符:
`is`操作符、
`as`操作符、
`as?`操作符、
以及`as!`操作符

它们具有以下形式:

```swift
<#expression#> is <#type#>
<#expression#> as <#type#>
<#expression#> as? <#type#>
<#expression#> as! <#type#>
```

`is`运算符在运行时检查*表达式*
是否可以转换为指定的*类型*。
如果*表达式*可以转换为指定的*类型*,则返回`true`;
否则返回`false`.

<!--
  - test: `triviallyTrueIsAndAs`

  ```swifttest
  -> assert("hello" is String)
  -> assert(!("hello" is Int))
  !$ warning: 'is' test is always true
  !! assert("hello" is String)
  !!                ^
  !$ warning: cast from 'String' to unrelated type 'Int' always fails
  !! assert(!("hello" is Int))
  !!          ~~~~~~~ ^  ~~~
  ```
-->

<!--
  - test: `is-operator-tautology`

  ```swifttest
  -> class Base {}
  -> class Subclass: Base {}
  -> var s = Subclass()
  -> var b = Base()
  ---
  -> assert(s is Base)
  !$ warning: 'is' test is always true
  !! assert(s is Base)
  !!          ^
  ```
-->

当在编译时
已知转换总是成功时,
`as` 运算符执行转换,
例如上转换或桥接。
上转换允许您将表达式用作其类型超类型的实例,
而无需使用中间变量。
以下方法等效:

```swift
func f(_ any: Any) { print("Function for Any") }
func f(_ int: Int) { print("Function for Int") }
let x = 10
f(x)
// Prints "Function for Int"

let y: Any = x
f(y)
// Prints "Function for Any"

f(x as Any)
// Prints "Function for Any"
```

<!--
  - test: `explicit-type-with-as-operator`

  ```swifttest
  -> func f(_ any: Any) { print("Function for Any") }
  -> func f(_ int: Int) { print("Function for Int") }
  -> let x = 10
  -> f(x)
  <- Function for Int
  ---
  -> let y: Any = x
  -> f(y)
  <- Function for Any
  ---
  -> f(x as Any)
  <- Function for Any
  ```
-->

桥接功能允许您将Swift标准库类型
(如String)
作为其对应的Foundation类型(如NSString)
使用,而无需创建新实例。
有关桥接的更多信息,
请参阅[Working with Foundation Types](https://developer.apple.com/documentation/swift/imported_c_and_objective_c_apis/working_with_foundation_types).

`as?` 运算符
将 *表达式*
转换为指定的 *类型*。
`as?` 运算符返回指定 *类型* 的可选值。
在运行时,如果转换成功,
*表达式* 的值将被封装为可选值并返回;
否则,返回的值为 `nil`。
如果转换为指定的 *类型*
保证失败或保证成功,
将引发编译时错误。

`as!` 运算符强制将 *expression* 转换为指定的 *type*。
`as!` 运算符返回指定 *type* 的值,而非可选类型。
如果转换失败,将引发运行时错误。
`x as! T`  的行为与 `(x as? T)!` 的行为相同。

如需了解有关类型转换的更多信息
并查看使用类型转换运算符的示例,
请参阅<doc:TypeCasting>.

> 类型转换运算符的语法:
>
> *type-casting-operator* → **`is`** *type* \
> *type-casting-operator* → **`as`** *type* \
> *type-casting-operator* → **`as`** **`?`** *type* \
> *type-casting-operator* → **`as`** **`!`** *type*

## 主要表达方式

*基本表达式*
是最基本的表达式。
它们可以单独使用,
也可以与其他标记结合,
构成前缀表达式、中缀表达式和后缀表达式。

> 初级表达语法:
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

<!--
  NOTE: One reason for breaking primary expressions out of postfix
  expressions is for exposition -- it makes it easier to organize the
  prose surrounding the production rules.
-->

<!--
  TR: Is a generic argument clause allowed
  after an identifier in expression context?
  It seems like that should only occur when an identifier
  is a *type* identifier.
-->

### 字面表达

一个*字面表达式*由
普通字面(如字符串或数字)、
数组或字典字面、
或游戏字面.

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

<!--
  - test: `pound-file-flavors`

  ```swifttest
  >> print(#file == #filePath)
  << true
  >> print(#file == #fileID)
  << false
  ```
-->

*数组字面量*是
有序的数值集合。
它具有以下形式:

```swift
[<#value 1#>, <#value 2#>, <#...#>]
```

数组中的最后一个表达式后面可以跟一个可选的逗号。
数组字面值的类型为`[T]`,
其中`T`是数组中表达式的类型。
如果有多种类型的表达式,
`T`是它们最接近的公共超类型。
空数组字面值用一对空
方括号表示,可用于创建指定类型的空数组.

```swift
var emptyArray: [Double] = []
```

<!--
  - test: `array-literal-brackets`

  ```swifttest
  -> var emptyArray: [Double] = []
  ```
-->

*字典字面意思*是
一个无序的键值对集合。
它具有以下形式:

```swift
[<#key 1#>: <#value 1#>, <#key 2#>: <#value 2#>, <#...#>]
```

字典中的最后一个表达式后面可以跟一个可选的逗号。
字典字面值的类型为[键:值],
其中键是其键表达式的类型,
值是其值表达式的类型。
如果有多种类型的表达式,
键和值是各自值的最接近的公共超类型。

空字典字面值用
,放在一对括号(`[:]`)内,
以区别于空数组字面量。
您可以使用空字典字面量创建
具有指定键和值类型的.

```swift
var emptyDictionary: [String: Double] = [:]
```

<!--
  - test: `dictionary-literal-brackets`

  ```swifttest
  -> var emptyDictionary: [String: Double] = [:]
  ```
-->

Xcode使用*playground literal*
在程序编辑器中创建
颜色、文件或图像的交互式表示。
Xcode之外的纯文本playground literal
使用特殊的文字语法表示。

有关在Xcode中使用playground literal的信息,
请参阅[Add a color, file, or image literal](https://help.apple.com/xcode/mac/current/#/dev4c60242fc)
在Xcode帮助中

> 字面表达的语法:
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

### 自我表达

`self` 表达是指对当前类型
或类型实例的明确引用。
它有以下几种形式:

```swift
self
self.<#member name#>
self[<#subscript index#>]
self(<#initializer arguments#>)
self.init(<#initializer arguments#>)
```

<!--
  TODO: Come back and explain the second to last form (i.e., self(arg: value)).
-->

在初始化器、下标或实例方法中,`self` 指的是当前
出现的类型实例。在类型方法中,
`self` 指的是当前出现的类型。

`self` 表达式用于在访问成员时指定作用域,
当作用域中存在
另一个同名变量时,
例如函数参数,
提供消除歧义的功能。
例如:

```swift
class SomeClass {
    var greeting: String
    init(greeting: String) {
        self.greeting = greeting
    }
}
```

<!--
  - test: `self-expression`

  ```swifttest
  -> class SomeClass {
         var greeting: String
         init(greeting: String) {
             self.greeting = greeting
         }
     }
  ```
-->

在值类型的变体方法中,
您可以将值类型的新实例赋值给`self`。
例如:

```swift
struct Point {
    var x = 0.0, y = 0.0
    mutating func moveBy(x deltaX: Double, y deltaY: Double) {
        self = Point(x: x + deltaX, y: y + deltaY)
    }
}
```

<!--
  - test: `self-expression`

  ```swifttest
  -> struct Point {
        var x = 0.0, y = 0.0
        mutating func moveBy(x deltaX: Double, y deltaY: Double) {
           self = Point(x: x + deltaX, y: y + deltaY)
        }
     }
  >> var somePoint = Point(x: 1.0, y: 1.0)
  >> somePoint.moveBy(x: 2.0, y: 3.0)
  >> print("The point is now at (\(somePoint.x), \(somePoint.y))")
  << The point is now at (3.0, 4.0)
  ```
-->

<!-- Apple Books screenshot begins here. -->

> 自我表达的语法:
>
> *self-expression* → **`self`** | *self-method-expression* | *self-subscript-expression* | *self-initializer-expression*
>
> *self-method-expression* → **`self`** **`.`** *identifier* \
> *self-subscript-expression* → **`self`** **`[`** *function-call-argument-list* **`]`** \
> *self-initializer-expression* → **`self`** **`.`** **`init`**

### 超级表达

*超类表达式*允许类
与其超类进行交互。
它有以下几种形式:

```swift
super.<#member name#>
super[<#subscript index#>]
super.init(<#initializer arguments#>)
```

第一种形式用于访问超类的成员。
第二种形式用于访问超类的下标实现。
第三种形式用于访问超类的初始化器。

子类可以在成员、下标和初始化器的实现中使用超类表达式,
以利用其超类的实现.

> 超级表达的语法:
>
> *superclass-expression* → *superclass-method-expression* | *superclass-subscript-expression* | *superclass-initializer-expression*
>
> *superclass-method-expression* → **`super`** **`.`** *identifier* \
> *superclass-subscript-expression* → **`super`** **`[`** *function-call-argument-list* **`]`** \
> *superclass-initializer-expression* → **`super`** **`.`** **`init`**

### 条件表达式

一个*条件表达式*根据条件值计算出几个给定值中的一个.

它有以下几种形式:

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

条件表达式
的行为和语法与`if`语句或`switch`语句相同,
但以下段落描述的差异除外。

条件表达式仅出现在以下几种情况下:

- 作为赋给变量的值。
- 作为变量或常量声明中的初始值。
- 作为`throw`表达式抛出的错误。
- 作为函数、闭包或属性getter返回的值。
- 作为条件表达式分支中的值。

条件表达式的分支是穷举的,
确保表达式总是产生一个值,
无论条件如何。
这意味着每个`if`分支都需要一个对应的`else`分支。

每个分支包含一个表达式,
当分支的条件为真时,该表达式用作条件表达式的值,

一个`throw`语句,
或对从不返回的函数的调用。

每个分支必须产生相同类型的值。
由于每个分支的类型检查都是独立的,
有时需要明确指定值的类型,
例如当分支包含不同类型的字面量时,
或者当分支的值为`nil`时。
当需要提供此信息时,
请在结果被分配到的变量上添加类型注释,
或者在分支的值上添加`as`转换.

```swift
let number: Double = if someCondition { 10 } else { 12.34 }
let number = if someCondition { 10 as Double } else { 12.34 }
```

在结果生成器中,
条件表达式只能
作为变量或常量的初始值出现。
这意味着,当您在结果生成器中编写`if`或`switch`语句时——
在变量或常量声明之外——
该代码将被视为分支语句,
结果生成器的某个方法将转换该代码。

不要在`try`表达式中放置条件表达式,
即使条件表达式的分支之一正在抛出异常。

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

### 结束语 表达

*闭包表达式*用于创建闭包,
在其他编程语言中也被称为*lambda*或*匿名函数*。

与函数声明类似,
闭包包含语句,
并捕获其外围作用域中的常量和变量。
其形式如下:

```swift
{ (<#parameters#>) -> <#return type#> in
   <#statements#>
}
```

*参数*的形式
与函数声明中的参数相同,
如 <doc:Declarations#Function-Declaration>.

在闭包表达式中写上`throws`或 `async`,
即可明确标记闭包为抛出或异步。

```swift
{ (<#parameters#>) async throws -> <#return type#> in
   <#statements#>
}
```

如果闭包的体包含一个`throws`语句或一个`try`表达式,
且该语句或表达式未嵌套在具有详尽错误处理的`do`语句中,
则该闭包被视为抛出。
如果抛出闭包仅抛出一种类型的错误,
则该闭包被视为抛出该错误类型;
否则,则被视为抛出“任何错误”。
同样,如果体包含一个`await`表达式,
则理解为异步。

有几种特殊形式
可以更简洁地编写闭包:

<!-- Apple Books screenshot ends here. -->

- 闭包可以省略
参数类型、返回类型或两者。
如果省略了参数名称和两种类型,
请省略语句前的`in`关键字。
如果省略的类型无法推断,
则会产生编译时错误。
- 闭包可以省略参数名称。
此时,参数的隐式命名
为`$`后跟位置:
`$0`、`$1`、`$2`,以此类推。
- 仅包含单个表达式的闭包
会被理解为返回该表达式的值。
在对周围表达式进行类型推断时,也会考虑该表达式的内容

以下闭包表达式是等价的:

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

<!--
  - test: `closure-expression-forms`

  ```swifttest
  >> func myFunction(f: (Int, Int) -> Int) {}
  -> myFunction { (x: Int, y: Int) -> Int in
         return x + y
     }
  ---
  -> myFunction { x, y in
         return x + y
     }
  ---
  -> myFunction { return $0 + $1 }
  ---
  -> myFunction { $0 + $1 }
  ```
-->

有关将闭合传递给函数的更多信息,
请参阅 <doc:Expressions#Function-Call-Expression>.

闭包表达式可以
不存储在变量或常量中,
例如,当您立即将闭包用作函数调用的一部分时。
在上述代码中传递给`myFunction`的闭包表达式是
这种立即使用的示例。
因此,
闭包表达式是转义还是非转义取决于
表达式的上下文。
如果立即调用
或作为非转义函数参数传递。
否则,闭包表达式为转义
有关转义闭包的更多信息,请参阅<doc:Closures#Escaping-Closures>.

#### 捕捉列表

默认情况下,闭包表达式捕获
其周围作用域中的常量和变量,
并对这些值进行强引用。
您可以使用*捕获列表*来明确控制
闭包中如何捕获值。

捕获列表以逗号分隔的表达式列表的形式书写,
用方括号括起来,
放在参数列表之前。
如果使用捕获列表,则必须同时使用`in`关键字,
即使省略了参数名称、参数类型和返回类型。

捕获列表中的条目在
创建闭包时初始化。
对于捕获列表中的每个条目,
一个常量被初始化为
周围作用域中具有相同名称的常量或变量的值。

例如,在下面的代码中,
`a`包含在捕获列表中,但`b`没有,
这导致它们的行为不同。

```swift
var a = 0
var b = 0
let closure = { [a] in
 print(a, b)
}

a = 10
b = 10
closure()
// Prints "0 10"
```

<!--
  - test: `capture-list-value-semantics`

  ```swifttest
  -> var a = 0
  -> var b = 0
  -> let closure = { [a] in
      print(a, b)
  }
  ---
  -> a = 10
  -> b = 10
  -> closure()
  <- 0 10
  ```
-->

有两个不同的东西名为`a`,
一个是周围作用域中的变量,
一个是闭包作用域中的常量,
但只有一个变量名为`b`。
当闭包创建时,内部作用域中的`a`
使用外部作用域中`a`的值进行初始化,
但它们的值没有以特殊方式连接。
这意味着外部作用域中`a`的值发生变化
不会影响内部作用域中`a`的值,
也不会影响闭包内部`a`的值。

相反,只有一个名为`b`的变量——
外部作用域中的`b`——
因此,闭包内部或外部所做的更改在两个地方都可见。

<!--
  [Contributor 6004] also describes the distinction as
  "capturing the variable, not the value"
  but he notes that we don't have a rigorous definition of
  capturing a variable in Swift
  (unlike some other languages)
  so that description's not likely to be very helpful for developers.
-->

当捕获的变量的类型具有引用语义时,这种区别是不可见的。

例如,
在下面的代码中,有两个名为`x`的东西,
一个是外层作用域中的变量,一个是内层作用域中的常量,
但它们都引用同一个对象,
因为引用语义

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

<!--
  - test: `capture-list-reference-semantics`

  ```swifttest
  -> class SimpleClass {
         var value: Int = 0
     }
  -> var x = SimpleClass()
  -> var y = SimpleClass()
  -> let closure = { [x] in
         print(x.value, y.value)
     }
  ---
  -> x.value = 10
  -> y.value = 10
  -> closure()
  <- 10 10
  ```
-->

<!--
  - test: `capture-list-with-commas`

  ```swifttest
  -> var x = 100
  -> var y = 7
  -> var f: () -> Int = { [x, y] in x+y }
  >> let r0 = f()
  >> assert(r0 == 107)
  ```
-->

<!--
  It's not an error to capture things that aren't included in the capture list,
  although maybe it should be.  See also rdar://17024367.
-->

<!--
  - test: `capture-list-is-not-exhaustive`

  ```swifttest
  -> var x = 100
     var y = 7
     var f: () -> Int = { [x] in x }
     var g: () -> Int = { [x] in x+y }
  ---
  -> let r0 = f()
  -> assert(r0 == 100)
  -> let r1 = g()
  -> assert(r1 == 107)
  ```
-->

如果表达式值的类型是类,
则可以在捕获列表中用
`weak`或`unowned`标记表达式,以捕获
对表达式值的弱引用或非自有引用。.

```swift
myFunction { print(self.title) }                    // implicit strong capture
myFunction { [self] in print(self.title) }          // explicit strong capture
myFunction { [weak self] in print(self!.title) }    // weak capture
myFunction { [unowned self] in print(self.title) }  // unowned capture
```

<!--
  - test: `closure-expression-weak`

  ```swifttest
  >> func myFunction(f: () -> Void) { f() }
  >> class C {
  >> let title = "Title"
  >> func method() {
  -> myFunction { print(self.title) }                    // implicit strong capture
  -> myFunction { [self] in print(self.title) }          // explicit strong capture
  -> myFunction { [weak self] in print(self!.title) }    // weak capture
  -> myFunction { [unowned self] in print(self.title) }  // unowned capture
  >> } }
  >> C().method()
  << Title
  << Title
  << Title
  << Title
  ```
-->

您还可以将任意表达式
绑定到捕获列表中的命名值。
表达式将在创建闭包时进行求值,
并以指定的强度捕获值。
例如:

```swift
// Weak capture of "self.parent" as "parent"
myFunction { [weak parent = self.parent] in print(parent!.title) }
```

<!--
  - test: `closure-expression-capture`

  ```swifttest
  >> func myFunction(f: () -> Void) { f() }
  >> class P { let title = "Title" }
  >> class C {
  >> let parent = P()
  >> func method() {
  // Weak capture of "self.parent" as "parent"
  -> myFunction { [weak parent = self.parent] in print(parent!.title) }
  >> } }
  >> C().method()
  << Title
  ```
-->

欲了解更多关于结束语的表达方式和示例,
请参阅 <doc:Closures#Closure-Expressions>.
如需了解更多信息以及捕获列表示例,
请参阅<doc:AutomaticReferenceCounting#Resolving-Strong-Reference-Cycles-for-Closures>.

<!--
  - test: `async-throwing-closure-syntax`

  ```swifttest
  >> var a = 12
  >> let c1 = { [a] in return a }                  // OK -- no async or throws
  >> let c2 = { [a] async in return a }            // ERROR
  >> let c3 = { [a] async -> in return a }         // ERROR
  >> let c4 = { [a] () async -> Int in return a }  // OK -- has () and ->
  !$ error: expected expression
  !! let c3 = { [a] async -> in return a }         // ERROR
  !! ^
  !$ error: unable to infer type of a closure parameter 'async' in the current context
  !! let c2 = { [a] async in return a }            // ERROR
  !! ^
  // NOTE: The error message for c3 gets printed by the REPL before the c2 error.
  ```
-->

> 封闭表达的语法:
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

*隐式成员表达式*
是一种访问类型成员的简写方式,
例如枚举情况或类型方法,
在类型推断
可以确定隐式类型的情况下。
它具有以下形式:

```swift
.<#member name#>
```

例如:

```swift
var x = MyEnumeration.someValue
x = .anotherValue
```

<!--
  - test: `implicitMemberEnum`

  ```swifttest
  >> enum MyEnumeration { case someValue, anotherValue }
  -> var x = MyEnumeration.someValue
  -> x = .anotherValue
  ```
-->

如果推断的类型是可选的,
你也可以在隐式成员表达式中使用非可选类型的成员.

```swift
var someOptional: MyEnumeration? = .someValue
```

<!--
  - test: `implicitMemberEnum`

  ```swifttest
  -> var someOptional: MyEnumeration? = .someValue
  ```
-->

隐式成员表达式后面可以跟
后缀运算符或《指南》中列出的其他后缀语法
<doc:Expressions#Postfix-Expressions>.
这被称为“链式隐式成员表达式”。
虽然所有链式后缀表达式通常
具有相同的类型,
但唯一的要求是整个链式隐式成员表达式
必须能够转换为其上下文隐含的类型。
具体来说,
如果隐含类型是可选的,
则可以使用非可选类型的值,
如果隐含类型是类类型,
则可以使用其子类之一的值。
例如:

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

<!--
  - test: `implicit-member-chain`

  ```swifttest
  -> class SomeClass {
         static var shared = SomeClass()
         static var sharedSubclass = SomeSubclass()
         var a = AnotherClass()
     }
  -> class SomeSubclass: SomeClass { }
  -> class AnotherClass {
         static var s = SomeClass()
         func f() -> SomeClass { return AnotherClass.s }
     }
  -> let x: SomeClass = .shared.a.f()
  -> let y: SomeClass? = .shared
  -> let z: SomeClass = .sharedSubclass
  ```
-->

在上面的代码中,
`x`的类型与其上下文隐含的类型完全匹配,
`y`的类型可以从`SomeClass`转换为`SomeClass?`,
而`z`的类型可以从`SomeSubclass`转换为`SomeClass`。

> 隐式成员表达式的语法:
>
> *implicit-member-expression* → **`.`** *identifier* \
> *implicit-member-expression* → **`.`** *identifier* **`.`** *postfix-expression*

<!--
  The grammar above allows the additional pieces tested below,
  which work even though they're omitted from the SE-0287 list.
  The grammar also overproduces, allowing any primary expression
  because of the definition of postfix-expression.
-->

<!--
  - test: `implicit-member-grammar`

  ```swifttest
  // self expression
  >> enum E { case left, right }
  >> let e: E = .left
  >> let e2: E = .left.self
  >> assert(e == e2)
  ---
  // postfix operator
  >> postfix operator ~
  >> extension E {
  >>     static postfix func ~ (e: E) -> E {
  >>         switch e {
  >>         case .left: return .right
  >>         case .right: return .left
  >>         }
  >>     }
  >> }
  >> let e3: E = .left~
  >> assert(e3 == .right)
  ---
  // initializer expression
  >> class S {
  >>     var num: Int
  >>     init(bestNumber: Int) { self.num = bestNumber }
  >> }
  >> let s: S = .init(bestNumber: 42)
  ```
-->

### 带括号的表达式

A带*括号的表达式*由
带括号的表达式组成。
您可以使用括号来明确分组表达式,
从而指定运算的优先级。
括号分组不会改变表达式的类型——
例如,(1)的类型就是Int。

<!--
  See "Tuple Expression" below for langref grammar.
-->

> 带括号的表达式的语法:
>
> *parenthesized-expression* → **`(`** *expression* **`)`**

### 元组表达式

一个*元组表达式*由
一组用逗号分隔的表达式组成,并用括号括起来。
每个表达式前都可以有一个可选的标识符,
用冒号(`:`)隔开。
其格式如下:

```swift
(<#identifier 1#>: <#expression 1#>, <#identifier 2#>: <#expression 2#>, <#...#>)
```

元组表达式中的每个标识符在
元组表达式的范围内必须是唯一的。
在嵌套元组表达式中,
同一嵌套级别的标识符必须是唯一的。
例如,
`(a: 10, a: 20)` 是无效的,
因为标签 `a` 在同一级别出现了两次。
然而,`(a: 10, b: (a: 1, x: 2))`是有效的——
尽管`a`出现了两次,
但一次出现在外层元组中,一次出现在内层元组中。

<!--
  - test: `tuple-labels-must-be-unique`

  ```swifttest
  >> let bad = (a: 10, a: 20)
  >> let good = (a: 10, b: (a: 1, x: 2))
  !$ error: cannot create a tuple with a duplicate element label
  !! let bad = (a: 10, a: 20)
  !! ^
  ```
-->

一个元组表达式可以包含零个表达式,
也可以包含两个或更多表达式。
括号内的单个表达式是一个带括号的表达式。

> 注意:在Swift中,空元组表达式和空元组类型
> 都写成`()`。
> 因为`Void`是`()`的类型别名,
> 所以可以用它来表示空元组类型。
> 然而,像所有类型别名一样,`Void`始终是一个类型——
> 不能用它来表示空元组表达式。

> 元组表达式的语法:
>
> *tuple-expression* → **`(`** **`)`** | **`(`** *tuple-element* **`,`** *tuple-element-list* **`)`** \
> *tuple-element-list* → *tuple-element* | *tuple-element* **`,`** *tuple-element-list* \
> *tuple-element* → *expression* | *identifier* **`:`** *expression*

### 通配符表达式

*通配符表达式*
用于在赋值期间明确忽略某个值。
例如,在以下赋值中
10被赋给`x`,而20被忽略:

```swift
(x, _) = (10, 20)
// x is 10, and 20 is ignored
```

<!--
  - test: `wildcardTuple`

  ```swifttest
  >> var (x, _) = (10, 20)
  -> (x, _) = (10, 20)
  -> // x is 10, and 20 is ignored
  ```
-->

> 通配符表达式的语法:
>
> *wildcard-expression* → **`_`**

### 宏扩展表达式

*宏扩展表达式*由宏名称
后跟以逗号分隔的宏参数列表(括号内)组成。
宏在编译时扩展。
宏扩展表达式具有以下形式:

```swift
<#macro name#>(<#macro argument 1#>, <#macro argument 2#>)
```

宏扩展表达式省略了宏名称后的括号,
如果宏不接收任何参数。

宏扩展表达式不能作为参数的默认值出现,
Swift标准库中的[`file()`][]和[`line()`][]宏除外。
当用作函数或方法参数的默认值时,
这些宏的计算使用调用位置的源代码位置,
而不是它们在函数定义中的位置.

[`file()`]: https://developer.apple.com/documentation/swift/file()
[`line()`]: https://developer.apple.com/documentation/swift/line()

使用宏表达式调用独立宏。
要调用附加宏,
请使用自定义属性语法,如 <doc:Attributes>.
独立宏和附加宏的扩展方式如下:

1.  Swift解析源代码
以生成抽象语法树(AST)。

2. 宏执行将AST节点作为输入
并执行该宏所需的转换。

3. 宏执行生成的转换后的AST节点
将添加到原始的AST中。

每个宏的扩展都是独立且自包含的。
然而,作为性能优化,
Swift可能会启动一个外部进程来执行宏,
并重复使用相同的进程来扩展多个宏。
当您执行宏时,
该代码不能依赖于您的代码之前扩展的宏,
或任何其他外部状态,如当前时间。

对于具有多重作用的嵌套宏和附加宏,
扩展过程会重复进行。
嵌套宏扩展表达式从外向内扩展。
例如,在以下代码中
`outerMacro(_:)`首先扩展,而未扩展的`innerMacro(_:)`调用
出现在抽象语法树中,
作为输入传递给`outerMacro(_:)`

```swift
#outerMacro(12, #innerMacro(34), "some text")
```

一个具有多种作用的附加宏会为每个作用扩展一次。
每次扩展都会收到相同的原始抽象语法树作为输入。
Swift通过收集所有生成的抽象语法树节点
并将其放置在抽象语法树中的相应位置
来形成整体扩展.

有关Swift宏的概述,请参阅 <doc:Macros>.

> 宏扩展表达式的语法:
>
> *macro-expansion-expression* → **`#`** *identifier* *generic-argument-clause*_?_ *function-call-argument-clause*_?_ *trailing-closures*_?_

### 关键路径表达式

*键路径表达式*
是指一个类型的属性或下标。
您可以在动态编程任务中使用键路径表达式,
例如键值观察。
它们具有以下形式:

```swift
\<#type name#>.<#path#>
```

*类型名称*是具体类型的名称,
包括任何通用参数,
例如`String`、`[Int]`或`Set<Int>`。

*路径*由
属性名称、下标、可选链式表达式和
强制解包表达式组成。
这些关键路径组件中的每一个
都可以根据需要重复任意次数,
且顺序不限。

在编译时,关键路径表达式
会被替换为
 [`KeyPath`](https://developer.apple.com/documentation/swift/keypath)  类

要使用键路径访问一个值,
请将键路径传递给`下标(keyPath:)`下标,
该下标适用于所有类型。
例如:

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

在类型推断
可以确定隐含类型的情况下,可以省略
类型名称。
以下代码使用`\.someProperty`
代替`\SomeClass.someProperty` :

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

<!--
  - test: `keypath-expression-implicit-type-name`

  ```swifttest
  >> import Foundation
  -> class SomeClass: NSObject {
  ->     @objc dynamic var someProperty: Int
  ->     init(someProperty: Int) {
  ->         self.someProperty = someProperty
  ->     }
  -> }
  ---
  -> let c = SomeClass(someProperty: 10)
  >> let r0 =
  -> c.observe(\.someProperty) { object, change in
         // ...
     }
  ```
-->

<!--
  Rewrite the above to avoid discarding the function's return value.
  Tracking bug is <rdar://problem/35301593>
-->

*路径*可以包含多个属性名称,
以句点分隔,
以引用属性值的属性。
此代码使用关键路径表达式
`\OuterStructure.outer.someValue`
来访问
`OuterStructure`类型`outer`属性的
`someValue`属性:

```swift
var compoundValue = (a: 1, b: 2)
// Equivalent to compoundValue = (a: 10, b: 20)
compoundValue[keyPath: \.self] = (a: 10, b: 20)
```

<!--
  - test: `keypath-expression-self-keypath`

  ```swifttest
  -> var compoundValue = (a: 1, b: 2)
  // Equivalent to compoundValue = (a: 10, b: 20)
  -> compoundValue[keyPath: \.self] = (a: 10, b: 20)
  ```
-->

*路径*可以包含多个属性名称,
以句点分隔,
以引用属性值的属性。
此代码使用关键路径表达式
`\OuterStructure.outer.someValue`
来访问
`OuterStructure`类型`outer`属性的
`someValue`属性:

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

<!--
  - test: `keypath-expression`

  ```swifttest
  -> struct OuterStructure {
         var outer: SomeStructure
         init(someValue: Int) {
             self.outer = SomeStructure(someValue: someValue)
         }
     }
  ---
  -> let nested = OuterStructure(someValue: 24)
  -> let nestedKeyPath = \OuterStructure.outer.someValue
  ---
  -> let nestedValue = nested[keyPath: nestedKeyPath]
  /> nestedValue is \(nestedValue)
  </ nestedValue is 24
  ```
-->

*路径*可以使用括号包含下标,
只要下标的参数类型符合可哈希(Hashable)协议即可。
本例在键路径中使用下标
来访问数组的第二个元素:

```swift
let greetings = ["hello", "hola", "bonjour", "안녕"]
let myGreeting = greetings[keyPath: \[String].[1]]
// myGreeting is 'hola'
```

<!--
  - test: `keypath-expression`

  ```swifttest
  -> let greetings = ["hello", "hola", "bonjour", "안녕"]
  -> let myGreeting = greetings[keyPath: \[String].[1]]
  /> myGreeting is '\(myGreeting)'
  </ myGreeting is 'hola'
  ```
-->

<!--
  TODO: Update examples here and below to remove type names once
  inference bugs are fixed. The compiler currently gives an error
  that the usage is ambiguous.
  <rdar://problem/34376681> [SR-5865]: Key path expression is "ambiguous without more context"
-->

下标中使用的值可以是命名值或文字。
使用值语义在键路径中捕获值。
以下代码在键路径表达式和闭包中均使用变量`index`
来访问
`greetings`数组的第三个元素。
当修改`index`时,
键路径表达式仍引用第三个元素,
而闭包使用新的索引.

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

<!--
  - test: `keypath-expression`

  ```swifttest
  -> var index = 2
  -> let path = \[String].[index]
  -> let fn: ([String]) -> String = { strings in strings[index] }
  ---
  -> print(greetings[keyPath: path])
  <- bonjour
  -> print(fn(greetings))
  <- bonjour
  ---
  // Setting 'index' to a new value doesn't affect 'path'
  -> index += 1
  -> print(greetings[keyPath: path])
  <- bonjour
  ---
  // Because 'fn' closes over 'index', it uses the new value
  -> print(fn(greetings))
  <- 안녕
  ```
-->

*路径*可以使用可选链和强制解包。
这段代码在键:

```swift
let firstGreeting: String? = greetings.first
print(firstGreeting?.count as Any)
// Prints "Optional(5)"

// Do the same thing using a key path.
let count = greetings[keyPath: \[String].first?.count]
print(count as Any)
// Prints "Optional(5)"
```

<!--
  - test: `keypath-expression`

  ```swifttest
  -> let firstGreeting: String? = greetings.first
  -> print(firstGreeting?.count as Any)
  <- Optional(5)
  ---
  // Do the same thing using a key path.
  -> let count = greetings[keyPath: \[String].first?.count]
  -> print(count as Any)
  <- Optional(5)
  ```
-->

<!--
  The test above is failing, which appears to be a compiler bug.
  <rdar://problem/58484319> Swift 5.2 regression in keypaths
-->

您可以混合和匹配关键路径的组件,以访问
嵌套在类型中的
值。以下代码通过组合这些组件的关键路径表达式
访问数组字典
的不同值和属性.

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

<!--
  - test: `keypath-expression`

  ```swifttest
  -> let interestingNumbers = ["prime": [2, 3, 5, 7, 11, 13, 17],
                               "triangular": [1, 3, 6, 10, 15, 21, 28],
                               "hexagonal": [1, 6, 15, 28, 45, 66, 91]]
  -> print(interestingNumbers[keyPath: \[String: [Int]].["prime"]] as Any)
  <- Optional([2, 3, 5, 7, 11, 13, 17])
  -> print(interestingNumbers[keyPath: \[String: [Int]].["prime"]![0]])
  <- 2
  -> print(interestingNumbers[keyPath: \[String: [Int]].["hexagonal"]!.count])
  <- 7
  -> print(interestingNumbers[keyPath: \[String: [Int]].["hexagonal"]!.count.bitWidth])
  <- 64
  ```
-->

您可以在通常提供函数或闭包的上下文中使用键路径表达式。

具体来说,
您可以使用
根类型为 `SomeType` 
且路径生成`Value`类型值的
键路径表达式,
而不是`(SomeType) -> Value`类型的函数或闭包.

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

<!--
  - test: `keypath-expression`

  ```swifttest
  -> struct Task {
         var description: String
         var completed: Bool
     }
  -> var toDoList = [
         Task(description: "Practice ping-pong.", completed: false),
         Task(description: "Buy a pirate costume.", completed: true),
         Task(description: "Visit Boston in the Fall.", completed: false),
     ]
  ---
  // Both approaches below are equivalent.
  -> let descriptions = toDoList.filter(\.completed).map(\.description)
  -> let descriptions2 = toDoList.filter { $0.completed }.map { $0.description }
  >> assert(descriptions == descriptions2)
  ```
-->

<!--
  REFERENCE
  The to-do list above draws from the lyrics of the song
  "The Pirates Who Don't Do Anything".
-->

关键路径表达式的任何副作用
仅在表达式被评估时进行评估。
例如,
如果您在关键路径表达式中的下标内进行函数调用,
则该函数仅在评估表达式时调用一次,
而不是在每次使用关键路径时调用.

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

<!--
  - test: `keypath-expression`

  ```swifttest
  -> func makeIndex() -> Int {
         print("Made an index")
         return 0
     }
  // The line below calls makeIndex().
  -> let taskKeyPath = \[Task][makeIndex()]
  <- Made an index
  >> print(type(of: taskKeyPath))
  << WritableKeyPath<Array<Task>, Task>
  ---
  // Using taskKeyPath doesn't call makeIndex() again.
  -> let someTask = toDoList[keyPath: taskKeyPath]
  ```
-->

如需了解有关在
与Objective-C API交互的代码中使用关键路径的更多信息,
请参阅 [Using Objective-C Runtime Features in Swift](https://developer.apple.com/documentation/swift/using_objective_c_runtime_features_in_swift).
有关键值编码和键值观察的信息,
请参阅[Key-Value Coding Programming Guide](https://developer.apple.com/library/content/documentation/Cocoa/Conceptual/KeyValueCoding/index.html#//apple_ref/doc/uid/10000107i)
和 [Key-Value Observing Programming Guide](https://developer.apple.com/library/content/documentation/Cocoa/Conceptual/KeyValueObserving/KeyValueObserving.html#//apple_ref/doc/uid/10000177i).

> 键路径表达式的语法:
>
> *key-path-expression* → **`\`** *type*_?_ **`.`** *key-path-components* \
> *key-path-components* → *key-path-component* | *key-path-component* **`.`** *key-path-components* \
> *key-path-component* → *identifier* *key-path-postfixes*_?_ | *key-path-postfixes*
>
> *key-path-postfixes* → *key-path-postfix* *key-path-postfixes*_?_ \
> *key-path-postfix* → **`?`** | **`!`** | **`self`** | **`[`** *function-call-argument-list* **`]`**

### 选择器 表达

选择器表达式允许您访问
Objective-C中用于引用方法或属性
getter或setter的选择器。
其格式如下:

```swift
#selector(<#method name#>)
#selector(getter: <#property name#>)
#selector(setter: <#property name#>)
```

*方法名*和*属性名*必须引用
Objective-C运行时中可用
的某个方法或属性。选择器表达式的值是`Selector`类型的实例。
例如:

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

在为属性的getter创建选择器时,
*属性名称*可以是指向变量或常量属性的引用。
相反,在为属性的setter创建选择器时,
*属性名称*必须仅是指向变量属性的引用。

*方法名称*可以包含用于分组的括号,
以及用于区分同名但类型不同的方法的`as`运算符

例如:

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

因为选择器是在编译时创建的,而不是在运行时创建的,
编译器可以检查方法或属性是否存在
以及它们是否暴露给Objective-C运行时.

> Note: Although the *method name* and the *property name* are expressions,
> they're never evaluated.

如需了解如何使用选择器
在Swift代码中与Objective-C API交互,
请参阅[Using Objective-C Runtime Features in Swift](https://developer.apple.com/documentation/swift/using_objective_c_runtime_features_in_swift).

> Grammar of a selector expression:
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

键路径字符串表达式允许您访问
用于在Objective-C中引用属性的字符串,
用于键值编码和键值观察API。
其格式如下:

```swift
#keyPath(<#property name#>)
```

*属性名称*必须引用
Objective-C运行时中可用的
属性。在编译时,键路径字符串表达式将被替换为字符串字面量。
例如:

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

当您在类中使用键路径字符串表达式时,
只需写上属性名称即可引用该类的属性,
而无需写上类名称

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

因为键路径字符串是在编译时创建的,而不是在运行时创建的,
编译器可以检查属性是否存在
以及该属性是否暴露给Objective-C运行时。

如需了解如何使用
Swift代码中的关键路径与Objective-C API交互,
请参阅[Using Objective-C Runtime Features in Swift](https://developer.apple.com/documentation/swift/using_objective_c_runtime_features_in_swift).
有关键值编码和键值观察的信息,
请参阅 [Key-Value Coding Programming Guide](https://developer.apple.com/library/content/documentation/Cocoa/Conceptual/KeyValueCoding/index.html#//apple_ref/doc/uid/10000107i)
和 [Key-Value Observing Programming Guide](https://developer.apple.com/library/content/documentation/Cocoa/Conceptual/KeyValueObserving/KeyValueObserving.html#//apple_ref/doc/uid/10000177i).

> Note: Although the *property name* is an expression, it's never evaluated.

> Grammar of a key-path string expression:
>
> *key-path-string-expression* → **`#keyPath`** **`(`** *expression* **`)`**

## 后缀表达式

*后缀表达式*是通过
将后缀运算符或其他后缀语法
应用到表达式来形成的。
从语法上讲,每个主要表达式也是后缀表达式。

有关这些运算符的行为,
请参阅<doc:BasicOperators> and <doc:AdvancedOperators>.

有关Swift标准库提供的操作符的信息,
请参阅[Operator Declarations](https://developer.apple.com/documentation/swift/operator_declarations).

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

*函数调用表达式*由函数名称
后跟以逗号分隔的函数参数列表组成,参数列表放在括号内。
函数调用表达式具有以下形式:

```swift
<#function name#>(<#argument value 1#>, <#argument value 2#>)
```

*函数名称*可以是任何表达式,其值是函数类型。

如果函数定义包括其参数的名称,
则函数调用必须在参数值之前包含名称,
并用冒号(`:`)分隔。
这种函数调用表达式具有以下形式:

```swift
<#function name#>(<#argument name 1#>: <#argument value 1#>, <#argument name 2#>: <#argument value 2#>)
```

函数调用表达式可以包含
紧接在右括号之后的闭包表达式形式的尾部闭包。
尾部闭包被理解为函数的参数,
添加在最后一个带括号的参数之后。
第一个闭包表达式没有标签;
任何附加的闭包表达式前面都有其参数标签。
下面的示例显示了
使用和不使用尾部闭包语法的函数调用的等效版本:

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

如果尾随闭合是该函数的唯一参数,
则可以省略括号.

```swift
// someMethod takes a closure as its only argument
myData.someMethod() { $0 == 13 }
myData.someMethod { $0 == 13 }
```

<!--
  - test: `no-paren-trailing-closure`

  ```swifttest
  >> class Data {
  >>    let data = 10
  >>    func someMethod(f: (Int) -> Bool) -> Bool {
  >>       return f(self.data)
  >>    }
  >> }
  >> let myData = Data()
  // someMethod takes a closure as its only argument
  >> let r0 =
  -> myData.someMethod() { $0 == 13 }
  >> assert(r0 == false)
  >> let r1 =
  -> myData.someMethod { $0 == 13 }
  >> assert(r1 == false)
  ```
-->

<!--
  Rewrite the above to avoid bare expressions.
  Tracking bug is <rdar://problem/35301593>
-->

为了在参数中包含尾部闭合,
编译器从左到右检查函数的参数,如下所示:

| 尾随关闭 | 参数 | 行为 |
| ---------------- | --------- | ------ |
| 贴标签 | 贴标签| 如果标签相同,则封口与参数匹配; 否则,参数将被跳过. |
| 有标签 | 无标签 | 跳过参数 |
| 无标签 | 有标签或无标签 | 如果参数在结构上类似于如下定义的函数类型,则闭包与参数匹配;否则,跳过该参数. |

尾随闭包作为参数传递给它匹配的参数。
在扫描过程中跳过的参数
没有传递给它们的参数 ---
例如,它们可以使用默认参数。
找到匹配项后,扫描继续
下一个尾随闭包和下一个参数。
在匹配过程结束时,
所有尾随闭包都必须有匹配项。

如果参数不是输入输出参数,则该参数在结构上与函数类型
类似,
且该参数属于以下类型之一:

- 类型为函数类型的参数,
如 `(Bool) -> Int`
- 自动闭包参数,
其包装表达式的类型为函数类型,
如 `@autoclosure () -> ((Bool) -> Int)`
- 可变参数,
其数组元素类型为函数类型,
如 `((Bool) -> Int)...`
- 类型被一层或多层可选包装的参数,
如 `Optional<(Bool) -> Int>`
- 参数类型结合了这些允许的类型,
如 `(Optional<(Bool) -> Int>)...`

当尾随闭包与参数匹配时,
其类型在结构上类似于函数类型,但不是函数,
则根据需要包装闭包。
例如,如果参数的类型是可选类型,
则自动将闭包包装在 `Optional` 中.

<!--
  - test: `when-can-you-use-trailing-closure`

  ```swifttest
  // These tests match the example types given above
  // when describing what "structurally resembles" a function type.
  ---
  >> func f1(x: Int, y: (Bool)->Int) { print(x + y(true)) }
  >> f1(x: 10) { $0 ? 1 : 100 }
  << 11
  >> func f2(x: Int, y: @autoclosure ()->((Bool)->Int)) { print(x + y()(false)) }
  >> f2(x: 20) { $0 ? 2 : 200 }
  << 220
  >> func f3(x: Int, y: ((Bool)->Int)...) { print(x + y[0](true)) }
  >> f3(x: 30) { $0 ? 3 : 300}
  << 33
  >> func f4(x: Int, y: Optional<(Bool)->Int>) { print(x + y!(false)) }
  >> f4(x: 40) { $0 ? 4 : 400 }
  << 440
  >> func f5(x: Int, y: (Optional<(Bool) -> Int>)...) { print(x + y[0]!(true)) }
  >> f5(x: 50) { $0 ? 5 : 500 }
  << 55
  ```
-->

为了简化从Swift 5.3之前的版本迁移代码的过程——
该版本从右向左进行匹配——
编译器会同时检查从左向右和从右向左的顺序。
如果扫描方向产生不同的结果,
则使用旧的从右向左顺序,
编译器会生成警告。
未来的Swift版本将始终使用从左向右的顺序.

```swift
typealias Callback = (Int) -> Int
func someFunction(firstClosure: Callback? = nil,
                secondClosure: Callback? = nil) {
    let first = firstClosure?(10)
    let second = secondClosure?(20)
    print(first ?? "-", second ?? "-")
}

someFunction()  // Prints "- -"
someFunction { return $0 + 100 }  // Ambiguous
someFunction { return $0 } secondClosure: { return $0 }  // Prints "10 20"
```

<!--
  - test: `trailing-closure-scanning-direction`

  ```swifttest
  -> typealias Callback = (Int) -> Int
  -> func someFunction(firstClosure: Callback? = nil,
                     secondClosure: Callback? = nil) {
         let first = firstClosure?(10)
         let second = secondClosure?(20)
         print(first ?? "-", second ?? "-")
     }
  ---
  -> someFunction()  // Prints "- -"
  << - -
  -> someFunction { return $0 + 100 }  // Ambiguous
  << - 120
  !$ warning: backward matching of the unlabeled trailing closure is deprecated; label the argument with 'secondClosure' to suppress this warning
  !! someFunction { return $0 + 100 }  // Ambiguous
  !!              ^
  !!              (secondClosure:     )
  !$ note: 'someFunction(firstClosure:secondClosure:)' declared here
  !! func someFunction(firstClosure: Callback? = nil,
  !!      ^
  -> someFunction { return $0 } secondClosure: { return $0 }  // Prints "10 20"
  << 10 20
  ```
-->

在上面的例子中,
标记为'Ambiguous'的函数调用
在Swift 5.3上打印“- 120”并产生编译器警告。
未来版本的Swift将打印'110 -'.

<!--
  Smart quotes on the line above are needed
  because the regex heuristics gets the close quote wrong.
-->

类、结构或枚举类型
可通过声明多种方法之一,
为函数调用语法提供语法糖,
如 <doc:Declarations#Methods-with-Special-Names>.

#### 隐式转换为指针类型

在函数调用表达式中,
如果参数和参数的类型不同,
编译器会尝试通过
应用以下列表中的隐式转换之一来使它们的类型匹配:

- `inout SomeType` 可以成为
`UnsafePointer<SomeType>` 或 `UnsafeMutablePointer<SomeType>`
- `inout Array<SomeType>` 可以成为
`UnsafePointer<SomeType>`或`UnsafeMutablePointer<SomeType>`
- `Array<SomeType>`可以成为`UnsafePointer<SomeType>`
- `String`可以成为`UnsafePointer<CChar>`

以下两个函数调用是等价的:

```swift
func unsafeFunction(pointer: UnsafePointer<Int>) {
    // ...
}
var myNumber = 1234

unsafeFunction(pointer: &myNumber)
withUnsafePointer(to: myNumber) { unsafeFunction(pointer: $0) }
```

<!--
  - test: `inout-unsafe-pointer`

  ```swifttest
  -> func unsafeFunction(pointer: UnsafePointer<Int>) {
  ->     // ...
  >>     print(pointer.pointee)
  -> }
  -> var myNumber = 1234
  ---
  -> unsafeFunction(pointer: &myNumber)
  -> withUnsafePointer(to: myNumber) { unsafeFunction(pointer: $0) }
  << 1234
  << 1234
  ```
-->

这些隐式转换创建的指针
仅在函数调用期间有效。
为避免出现未定义行为,
请确保您的代码
在函数调用结束后不会保留指针.

> Note: When implicitly converting an array to an unsafe pointer,
> Swift ensures that the array's storage is contiguous
> by converting or copying the array as needed.
> For example, you can use this syntax
> with an array that was bridged to `Array`
> from an `NSArray` subclass that makes no API contract about its storage.
> If you need to guarantee that the array's storage is already contiguous,
> so the implicit conversion never needs to do this work,
> use `ContiguousArray` instead of `Array`.

使用`&`代替`withUnsafePointer(to:)`等显式函数
有助于提高低级C函数调用的可读性,
尤其是当函数需要多个指针参数时。
然而,当从其他Swift代码调用函数时,
应避免使用`&`代替显式使用不安全的API.

<!--
  - test: `implicit-conversion-to-pointer`

  ```swifttest
  >> import Foundation
  >> func takesUnsafePointer(p: UnsafePointer<Int>) { }
  >> func takesUnsafeMutablePointer(p: UnsafeMutablePointer<Int>) { }
  >> func takesUnsafePointerCChar(p: UnsafePointer<CChar>) { }
  >> func takesUnsafeMutablePointerCChar(p: UnsafeMutablePointer<CChar>) { }
  >> var n = 12
  >> var array = [1, 2, 3]
  >> var nsarray: NSArray = [10, 20, 30]
  >> var bridgedNSArray = nsarray as! Array<Int>
  >> var string = "Hello"
  ---
  // bullet 1
  >> takesUnsafePointer(p: &n)
  >> takesUnsafeMutablePointer(p: &n)
  ---
  // bullet 2
  >> takesUnsafePointer(p: &array)
  >> takesUnsafeMutablePointer(p: &array)
  >> takesUnsafePointer(p: &bridgedNSArray)
  >> takesUnsafeMutablePointer(p: &bridgedNSArray)
  ---
  // bullet 3
  >> takesUnsafePointer(p: array)
  >> takesUnsafePointer(p: bridgedNSArray)
  ---
  // bullet 4
  >> takesUnsafePointerCChar(p: string)
  ---
  // invalid conversions
  >> takesUnsafeMutablePointer(p: array)
  !$ error: cannot convert value of type '[Int]' to expected argument type 'UnsafeMutablePointer<Int>'
  !! takesUnsafeMutablePointer(p: array)
  !!                              ^
  >> takesUnsafeMutablePointerCChar(p: string)
  !$ error: cannot convert value of type 'String' to expected argument type 'UnsafeMutablePointer<CChar>' (aka 'UnsafeMutablePointer<Int8>')
  !! takesUnsafeMutablePointerCChar(p: string)
  !!                                   ^
  ```
-->

> 函数调用表达式的语法:
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

### 初始化表达式

*初始化表达式*用于访问
类型的初始化器。
其形式如下:

```swift
<#expression#>.init(<#initializer arguments#>)
```

在函数调用表达式中使用初始化表达式
来初始化一个类型的新实例。
还可以使用初始化表达式
来委托给超类的初始化器.

```swift
class SomeSubClass: SomeSuperClass {
    override init() {
        // subclass initialization goes here
        super.init()
    }
}
```

<!--
  - test: `init-call-superclass`

  ```swifttest
  >> class SomeSuperClass { }
  -> class SomeSubClass: SomeSuperClass {
  ->     override init() {
  ->         // subclass initialization goes here
  ->         super.init()
  ->     }
  -> }
  ```
-->

初始化器可以像函数一样用作值。
例如:

```swift
// Type annotation is required because String has multiple initializers.
let initializer: (Int) -> String = String.init
let oneTwoThree = [1, 2, 3].map(initializer).reduce("", +)
print(oneTwoThree)
// Prints "123"
```

<!--
  - test: `init-as-value`

  ```swifttest
  // Type annotation is required because String has multiple initializers.
  -> let initializer: (Int) -> String = String.init
  -> let oneTwoThree = [1, 2, 3].map(initializer).reduce("", +)
  -> print(oneTwoThree)
  <- 123
  ```
-->

如果您指定了类型名称,
则无需使用初始化表达式即可访问该类型的初始化程序。
在其他情况下,您必须使用初始化表达式.

```swift
let s1 = SomeType.init(data: 3)  // Valid
let s2 = SomeType(data: 1)       // Also valid

let s3 = type(of: someValue).init(data: 7)  // Valid
let s4 = type(of: someValue)(data: 5)       // Error
```

<!--
  - test: `explicit-implicit-init`

  ```swifttest
  >> struct SomeType {
  >>     let data: Int
  >> }
  -> let s1 = SomeType.init(data: 3)  // Valid
  -> let s2 = SomeType(data: 1)       // Also valid
  ---
  >> let someValue = s1
  -> let s3 = type(of: someValue).init(data: 7)  // Valid
  -> let s4 = type(of: someValue)(data: 5)       // Error
  !$ error: initializing from a metatype value must reference 'init' explicitly
  !! let s4 = type(of: someValue)(data: 5)       // Error
  !!                              ^
  !!                              .init
  ```
-->

> 初始化表达式的语法:
>
> *initializer-expression* → *postfix-expression* **`.`** **`init`** \
> *initializer-expression* → *postfix-expression* **`.`** **`init`** **`(`** *argument-names* **`)`**

### 明确的会员表达

*显式成员表达式*允许访问
已命名类型、元组或模块的成员。
它由句点(`.`)分隔,
位于项目与其成员标识符之间.

```swift
<#expression#>.<#member name#>
```

命名类型的成员在
类型声明或扩展中命名。
例如:

```swift
class SomeClass {
    var someProperty = 42
}
let c = SomeClass()
let y = c.someProperty  // Member access
```

<!--
  - test: `explicitMemberExpression`

  ```swifttest
  -> class SomeClass {
         var someProperty = 42
     }
  -> let c = SomeClass()
  -> let y = c.someProperty  // Member access
  ```
-->

元组的成员
按出现顺序用整数隐式命名,
从0开始。
例如:

```swift
var t = (10, 20, 30)
t.0 = t.1
// Now t is (20, 20, 30)
```

<!--
  - test: `explicit-member-expression`

  ```swifttest
  -> var t = (10, 20, 30)
  -> t.0 = t.1
  -> // Now t is (20, 20, 30)
  ```
-->

模块的成员可以访问
该模块的顶层声明。

使用`dynamicMemberLookup`属性声明的类型
包括在运行时查找的成员,
如 <doc:Attributes>.

为了区分名称仅因参数名称而不同的方法或初始化器,

请将参数名称放在括号内,
每个参数名称后加一个冒号(`:`)。
对于没有名称的参数,请写一个下划线(`_`)。
为了区分重载方法,
请使用类型注释。
例如:

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

<!--
  - test: `function-with-argument-names`

  ```swifttest
  -> class SomeClass {
         func someMethod(x: Int, y: Int) {}
         func someMethod(x: Int, z: Int) {}
         func overloadedMethod(x: Int, y: Int) {}
         func overloadedMethod(x: Int, y: Bool) {}
     }
  -> let instance = SomeClass()
  ---
  -> let a = instance.someMethod              // Ambiguous
  !$ error: ambiguous use of 'someMethod'
  !! let a = instance.someMethod              // Ambiguous
  !!         ^
  !$ note: found this candidate
  !!              func someMethod(x: Int, y: Int) {}
  !!                   ^
  !$ note: found this candidate
  !!              func someMethod(x: Int, z: Int) {}
  !!                   ^
  -> let b = instance.someMethod(x:y:)        // Unambiguous
  ---
  -> let d = instance.overloadedMethod        // Ambiguous
  !$ error: ambiguous use of 'overloadedMethod(x:y:)'
  !! let d = instance.overloadedMethod        // Ambiguous
  !!         ^
  !$ note: found this candidate
  !!              func overloadedMethod(x: Int, y: Int) {}
  !!                   ^
  !$ note: found this candidate
  !!              func overloadedMethod(x: Int, y: Bool) {}
  !!                   ^
  -> let d = instance.overloadedMethod(x:y:)  // Still ambiguous
  !$ error: ambiguous use of 'overloadedMethod(x:y:)'
  !!     let d = instance.overloadedMethod(x:y:)  // Still ambiguous
  !!             ^
  !$ note: found this candidate
  !!              func overloadedMethod(x: Int, y: Int) {}
  !!                   ^
  !$ note: found this candidate
  !!              func overloadedMethod(x: Int, y: Bool) {}
  !!                   ^
  -> let d: (Int, Bool) -> Void  = instance.overloadedMethod(x:y:)  // Unambiguous
  ```
-->

如果一行开头出现句点,
则应理解为显式成员表达式的一部分,
而非隐式成员表达式。
例如,以下列表显示了
分几行显示的链式方法调用:

```swift
let x = [10, 3, 20, 15, 4]
    .sorted()
    .filter { $0 > 5 }
    .map { $0 * 100 }
```

<!--
  - test: `period-at-start-of-line`

  ```swifttest
  -> let x = [10, 3, 20, 15, 4]
  ->     .sorted()
  ->     .filter { $0 > 5 }
  ->     .map { $0 * 100 }
  >> print(x)
  << [1000, 1500, 2000]
  ```
-->

您可以将这种多行链式语法
与编译器控制语句
相结合,以控制每个方法的调用时间。
例如,
以下代码在iOS上使用不同的过滤规则:

```swift
let numbers = [10, 20, 33, 43, 50]
#if os(iOS)
    .filter { $0 < 40 }
#else
    .filter { $0 > 25 }
#endif
```

<!--
  - test: `pound-if-inside-postfix-expression`

  ```swifttest
  -> let numbers = [10, 20, 33, 43, 50]
     #if os(iOS)
         .filter { $0 < 40 }
     #else
         .filter { $0 > 25 }
     #endif
  >> print(numbers)
  << [33, 43, 50]
  ```
-->

在`#if`、`#endif`和其他编译指令之间,
条件编译块可以包含
一个隐式成员表达式,
后面可以跟零个或多个后缀,
以形成后缀表达式。
它也可以包含
另一个条件编译块,
或这些表达式和块的组合。

您可以在任何可以编写
显式成员表达式的
地方使用这种语法,而不仅仅局限于顶层代码。

在条件编译块中,
`#if`编译指令的分支
必须至少包含一个表达式。
其他分支可以留空

<!--
  - test: `pound-if-empty-if-not-allowed`

  ```swifttest
  >> let numbers = [10, 20, 33, 43, 50]
  >> #if os(iOS)
  >> #else
  >>     .filter { $0 > 25 }
  >> #endif
  !$ error: reference to member 'filter' cannot be resolved without a contextual type
  !! .filter { $0 > 25 }
  !! ~^~~~~~
  ```
-->

<!--
  - test: `pound-if-else-can-be-empty`

  ```swifttest
  >> let numbers = [10, 20, 33, 43, 50]
  >> #if os(iOS)
  >>     .filter { $0 > 25 }
  >> #else
  >> #endif
  >> print(numbers)
  << [10, 20, 33, 43, 50]
  ```
-->

<!--
  - test: `pound-if-cant-use-binary-operators`

  ```swifttest
  >> let s = "some string"
  >> #if os(iOS)
  >>     + " on iOS"
  >> #endif
  !$ error: unary operator cannot be separated from its operand
  !! + " on iOS"
  !! ^~
  !!-
  ```
-->

> 显式成员表达式的语法:
>
> *explicit-member-expression* → *postfix-expression* **`.`** *decimal-digits* \
> *explicit-member-expression* → *postfix-expression* **`.`** *identifier* *generic-argument-clause*_?_ \
> *explicit-member-expression* → *postfix-expression* **`.`** *identifier* **`(`** *argument-names* **`)`** \
> *explicit-member-expression* → *postfix-expression* *conditional-compilation-block*
>
> *argument-names* → *argument-name* *argument-names*_?_ \
> *argument-name* → *identifier* **`:`**

<!--
  The grammar for method-name doesn't include the following:
      method-name -> identifier argument-names-OPT
  because the "postfix-expression . identifier" line above already covers that case.
-->

<!--
  See grammar for initializer-expression for the related "argument name" production there.
-->

### 后缀自我表达

后缀`self`表达式由表达式或类型名称组成,
后跟:

```swift
<#expression#>.self
<#type#>.self
```

第一种形式计算表达式的值。
例如,`x.self`计算为`x`。

第二种形式计算类型的值。使用这种形式
可以访问类型作为值。例如,
因为`SomeClass.self`计算为`SomeClass`类型本身,
你可以将它传递给接受类型级参数的函数或方法。

> 后缀自我表达的语法:
>
> *postfix-self-expression* → *postfix-expression* **`.`** **`self`**

### 下标表达式

*下标表达式*通过
相应的下标声明的getter和setter
提供下标访问。
其形式如下:

```swift
<#expression#>[<#index expressions#>]
```

为了评估下标表达式的值,
调用下标获取器,获取*表达式*的类型,
并将*索引表达式*作为下标参数传递。
为了设置其值,
以相同的方式调用下标设置器.

<!--
  TR: Confirm that indexing on
  a comma-separated list of expressions
  is intentional, not just a side effect.
  I see this working, for example:
  (swift) class Test {
            subscript(a: Int, b: Int) -> Int { return 12 }
          }
  (swift) var t = Test()
  // t : Test = <Test instance>
  (swift) t[1, 2]
  // r0 : Int = 12
-->

有关下标声明的信息,
请参阅 <doc:Declarations#Protocol-Subscript-Declaration>.

> 下标表达式的语法:
>
> *subscript-expression* → *postfix-expression* **`[`** *function-call-argument-list* **`]`**

<!--
  - test: `subscripts-can-take-operators`

  ```swifttest
  >> struct S {
         let x: Int
         let y: Int
         subscript(operation: (Int, Int) -> Int) -> Int {
             return operation(x, y)
         }
     }
  >> let s = S(x: 10, y: 20)
  >> assert(s[+] == 30)
  ```
-->

### 强制值表达式

*强制值表达式*用于展开一个可选值,
您确定该值不是`null`
其形式如下:

```swift
<#expression#>!
```

如果*表达式*的值不为`nil`,
则可选值将被解包
并以相应的非可选类型返回。
否则,将引发运行时错误。

强制值表达式的解包值可以被修改,
通过改变值本身,
或通过赋值给值的某个成员。
例如:

```swift
var x: Int? = 0
x! += 1
// x is now 1

var someDictionary = ["a": [1, 2, 3], "b": [10, 20]]
someDictionary["a"]![0] = 100
// someDictionary is now ["a": [100, 2, 3], "b": [10, 20]]
```

<!--
  - test: `optional-as-lvalue`

  ```swifttest
  -> var x: Int? = 0
  -> x! += 1
  /> x is now \(x!)
  </ x is now 1
  ---
  -> var someDictionary = ["a": [1, 2, 3], "b": [10, 20]]
  -> someDictionary["a"]![0] = 100
  /> someDictionary is now \(someDictionary)
  </ someDictionary is now ["a": [100, 2, 3], "b": [10, 20]]
  ```
-->

> 强制值表达式的语法:
>
> *forced-value-expression* → *postfix-expression* **`!`**

### 可选链式表达式

一个*可选链式表达式*提供了
在后缀表达式中使用可选值的简化语法。
它具有以下形式:

```swift
<#expression#>?
```

后缀`?`运算符使一个可选链式表达式
从一个表达式中产生,而不改变表达式的值。

可选链式表达式必须出现在后缀表达式中,
它们以特殊的方式导致后缀表达式的计算。
如果可选链式表达式的值为`nil`,
后缀表达式中的所有其他操作将被忽略,
整个后缀表达式的计算结果为`nil`。
如果可选链表达式的值不是`nil`,
则可选链表达式的值将被展开
并用于计算后缀表达式的其余部分。
无论哪种情况,
后缀表达式的值仍然是可选类型。

如果包含可选链表达式的后缀表达式
嵌套在其他后缀表达式中,
则只有最外层的表达式返回可选类型。
在下面的例子中,
当`c`不为`nil`时,
其值被解包并用于计算`.property`,
而`.property`的值则用于计算`.performAction()`。
整个表达式`c?.property.performAction()`
的值为可选类型

```swift
var c: SomeClass?
var result: Bool? = c?.property.performAction()
```

<!--
  - test: `optional-chaining`

  ```swifttest
  >> class OtherClass { func performAction() -> Bool {return true} }
  >> class SomeClass { var property: OtherClass = OtherClass() }
  -> var c: SomeClass?
  -> var result: Bool? = c?.property.performAction()
  >> assert(result == nil)
  ```
-->

以下示例显示了
上述示例
在不使用可选链式操作时的行为.

```swift
var result: Bool?
if let unwrappedC = c {
    result = unwrappedC.property.performAction()
}
```

<!--
  - test: `optional-chaining-alt`

  ```swifttest
  >> class OtherClass { func performAction() -> Bool {return true} }
  >> class SomeClass { var property: OtherClass = OtherClass() }
  >> var c: SomeClass?
  -> var result: Bool?
  -> if let unwrappedC = c {
        result = unwrappedC.property.performAction()
     }
  ```
-->

可选链表达式的未包装值可以修改,
通过改变值本身,
或通过赋值给值的成员之一。
如果可选链表达式的值为“nil”,
赋值运算符右侧的表达式
将不会计算。
例如:

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

<!--
  - test: `optional-chaining-as-lvalue`

  ```swifttest
  -> func someFunctionWithSideEffects() -> Int {
        return 42  // No actual side effects.
     }
  -> var someDictionary = ["a": [1, 2, 3], "b": [10, 20]]
  ---
  -> someDictionary["not here"]?[0] = someFunctionWithSideEffects()
  // someFunctionWithSideEffects isn't evaluated
  /> someDictionary is still \(someDictionary)
  </ someDictionary is still ["a": [1, 2, 3], "b": [10, 20]]
  ---
  -> someDictionary["a"]?[0] = someFunctionWithSideEffects()
  /> someFunctionWithSideEffects is evaluated and returns \(someFunctionWithSideEffects())
  </ someFunctionWithSideEffects is evaluated and returns 42
  /> someDictionary is now \(someDictionary)
  </ someDictionary is now ["a": [42, 2, 3], "b": [10, 20]]
  ```
-->

> 选链式表达式的语法:
>
> *optional-chaining-expression* → *postfix-expression* **`?`**

> 测试版软件:
>
> 本文件包含有关开发中的API或技术的初步信息。这些信息可能会发生变化,根据本文件实施的软件应与最终操作系统软件一起测试。.
>
> 了解更多关于使用 [Apple's beta software](https://developer.apple.com/support/beta-software/).

