# 表达式

访问、修改和分配值。

在 Swift 中，有四种表达式：前缀表达式、中缀表达式、主表达式和后缀表达式。计算表达式会返回一个值、导致副作用，或两者兼而有之。

前缀和中缀表达式允许您将运算符应用于较小的表达式。主表达式在概念上是最简单的表达式，它们提供了一种访问值的方法。后缀表达式与前缀和中缀表达式一样，允许您使用后缀构建更复杂的表达式，例如函数调用和成员访问。下面各节详细描述了每种表达式。

> 表达式的语法：
>
> *expression* → *try-operator*_?_ *await-operator*_?_ *prefix-expression* *infix-expressions*_?_ \

##  前缀表达式

前缀表达式将可选的前缀运算符与表达式结合起来。前缀运算符采用一个参数，即它们后面的表达式。

有关这些运算符的行为的信息，请参阅<doc:BasicOperators> 和 <doc:AdvancedOperators>。

有关 Swift 标准库提供的运算符的信息，请参阅[Operator Declarations](https://developer.apple.com/documentation/swift/operator_declarations)。

> 前缀表达式的语法：
>
> *prefix-expression* → *prefix-operator*_?_ *postfix-expression* \
> *prefix-expression* → *in-out-expression*

### 输入输出表达式

输入输出表达式标记作为输入输出参数传递给函数调用表达式的变量。

```swift
&<#expression#>
```

有关输入输出参数的更多信息以及查看示例，请参阅<doc:Functions#In-Out-Parameters>.

在需要指针的上下文中提供非指针参数时，也会使用输入输出表达式，如 <doc:Expressions#Implicit-Conversion-to-a-Pointer-Type>中所述。

> 输入输出表达式的语法：
>
> *in-out-expression* → **`&`** *primary-expression*

### 尝试操作员

 try 表达式由`try` 运算符后跟一个可能引发错误的表达式组成。它具有以下形式：

```swift
try <#expression#>
```
`try` 表达式的值是 *表达式*的值.

可选的 try 表达式由`try?` 组成。运算符后跟可能引发错误的表达式。它具有以下形式：


```swift
try? <#expression#>
```

如果表达式没有抛出错误，则可选尝试表达式的值是包含表达式值的可选值。否则，可选尝试表达式的值为 `nil`。

强制尝试表达式由`try!` 组成。运算符后跟可能引发错误的表达式。它具有以下形式：



```swift
try! <#expression#>
```

强制尝试表达式的值是表达式的值。如果表达式抛出错误，则会产生运行时错误。

当中缀运算符左侧的表达式标有 `try` 时， `try?` ，或者 `try!` ，该运算符适用于整个中缀表达式。也就是说，您可以使用括号来明确运算符应用程序的范围。

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

`try` 表达式不能出现在中缀运算符的右侧，除非中缀运算符是赋值运算符或者 `try`表达式括在括号中。


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

如果表达式同时包含`try`和`await`运算符,则`try`运算符必须首先出现。


<!--
  The "try await" ordering is also part of the grammar for 'expression',
  but it's important enough to be worth re-stating in prose.
-->

有关更多信息并查看如何使用`try`、`try?`的示例,并 `try! ` 请参阅 <doc:ErrorHandling>.

> try 表达式的语法:
>
> *try-operator* → **`try`** | **`try`** **`?`** | **`try`** **`!`**

### 等待接线员

*wait*  表达式由`await`运算符后跟一个使用异步操作结果的表达式组成。它具有以下形式

```swift
await <#expression#>
```
`await`表达式的值是expression的值。标有await表达式称为 *潜在挂起点* 。异步函数的执行可以在每个用 `await`标记的表达式处暂停。此外，并发代码的执行永远不会在任何其他点暂停。这意味着潜在挂起点之间的代码可以安全地更新需要暂时破坏不变量的状态，前提是它在下一个潜在挂起点之前完成更新。



`await` 表达式只能出现在异步上下文中，例如传递给 `async(priority:operation:)`函数的尾随闭包。它不能出现在defer语句的主体中，也不能出现在同步函数类型的自动闭包中。

当中缀运算符左侧的表达式用`await`运算符标记时，该运算符适用于整个中缀表达式。也就是说，您可以使用括号来明确运算符应用程序的范围。

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

`await`表达式不能出现在中缀运算符的右侧，除非中缀运算符是赋值运算符或者将await表达式括在括号中。

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

如果表达式同时包含 `await`和try运算符，则try运算符必须首先出现。

<!--
  The "try await" ordering is also part of the grammar for 'expression',
  but it's important enough to be worth re-stating in prose.
-->

> 等待表达的语法:
>
> *等待运算符* → **`await`**

## 中缀表达式

*中缀表达式* 将中缀二元运算符与其作为其左侧和右侧参数的表达式组合起来。它具有以下形式：

```swift
<#left-hand argument#> <#operator#> <#right-hand argument#>
```

有关这些运算符的行为的信息，请参阅 <doc:BasicOperators> 和 <doc:AdvancedOperators>.

有关 Swift 标准库提供的运算符的信息，请参阅 [Operator Declarations](https://developer.apple.com/documentation/swift/operator_declarations).

<!--
  You have essentially expression sequences here, and within it are
  parts of the expressions.  We're calling them "expressions" even
  though they aren't what we ordinarily think of as expressions.  We
  have this two-phase thing where we do the expression sequence parsing
  which gives a rough parse tree.  Then after name binding we know
  operator precedence and we do a second phase of parsing that builds
  something that's a more traditional tree.
-->

> 注意：在解析时，由中缀运算符组成的表达式表示为平面列表。通过应用运算符优先级将该列表转换为树。例如，表达式2 + 3 * 5最初被理解为五个项目2 、 + 、 3 、 *和5的平面列表。此过程将其转换为树 (2 + (3 * 5))。

> 中缀表达式的语法：
>
> *infix-expression* → *infix-operator* *prefix-expression* \
> *infix-expression* → *assignment-operator* *try-operator*_?_ *await-operator*_?_ *prefix-expression* \
> *infix-expression* → *conditional-operator* *try-operator*_?_ *await-operator*_?_ *prefix-expression* \
> *infix-expression* → *type-casting-operator* \
> *infix-expressions* → *infix-expression* *infix-expressions*_?_

### 赋值运算符

*赋值运算符* 为给定表达式设置新值。它具有以下形式：

```swift
<#expression#> = <#value#>
```

*表达式* 的值设置为通过计算*value* 获得的值。如果表达式是元组，则值必须是具有相同元素数量的元组。 （允许嵌套元组。）从值的每个部分到表达式的相应部分执行赋值。例如：

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

赋值运算符不返回任何值。

> 赋值运算符的语法：
>
> *赋值运算符* → **`=`**

### 三元条件运算符

*三元条件运算符*根据条件值计算两个给定值之一。它具有以下形式：

```swift
<#condition#> ? <#expression used if true#> : <#expression used if false#>
```

如果*条件*计算结果为`true` ，则条件运算符计算第一个表达式并返回其值。否则，它计算第二个表达式并返回其值。不计算未使用的表达式。

有关使用三元条件运算符的示例，请参阅文档： <doc:BasicOperators#Ternary-Conditional-Operator>.

> 条件运算符的语法：
>
> *条件运算符* → **`?`** *表达* **`:`**

###  类型转换运算符

有四种类型转换运算符： `is`运算符、`as`运算符、`as?`运算符和`as!`操作员。

它们具有以下形式：

```swift
<#expression#> is <#type#>
<#expression#> as <#type#>
<#expression#> as? <#type#>
<#expression#> as! <#type#>
```

`is`运算符在运行时检查表达式是否可以转换为指定类型。如果*表达式*可以转换为指定*类型*，则返回`true` ；否则，返回`false` 。

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

当在编译时已知转换始终成功时，`as`运算符会执行转换，例如向上转换或桥接。向上转换允许您使用表达式作为其类型的超类型的实例，而无需使用中间变量。以下方法是等效的：

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

桥接允许您使用`Swift` 标准库类型（例如String的表达式作为其相应的基础类型（例如NSString ，而无需创建新实例。有关桥接的更多信息，请参阅[Working with Foundation Types](https://developer.apple.com/documentation/swift/imported_c_and_objective_c_apis/working_with_foundation_types).

`as?`运算符执行表达式到指定类型的条件转换。 `as?`运算符返回指定类型的可选值。在运行时，如果转换成功，则将表达式的值包装在可选值中并返回；否则，返回值为`nil` 。如果强制转换为指定类型肯定会失败或一定会成功，则会引发编译时错误。

`as!`运算符将表达式强制转换为指定类型。 `as!`运算符返回指定类型的值，而不是可选类型。如果转换失败，则会引发运行时错误。 `x as! T`与 `(x as? T)!` 。

有关类型转换的更多信息以及查看使用类型转换运算符的示例，请参阅<doc:TypeCasting>.

> 类型转换运算符的语法：
>
> *类型转换运算符* → **`is`** *类型* \
> *类型转换运算符* → **`as`** *类型* \
> *类型转换运算符* → **`as`** **`?`** *类型* \
> *类型转换运算符* → **`as`** **`!`** *类型*

## 主要表达

*初级表达式*是最基本的表达式。它们可以单独用作表达式，也可以与其他标记组合以构成前缀表达式、中缀表达式和后缀表达式。

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

### 文字表达

文字表达式由普通文字（例如字符串或数字）、数组或字典文字或游乐场文字组成

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

*数组文字*是值的有序集合。它具有以下形式：

```swift
[<#value 1#>, <#value 2#>, <#...#>]
```

数组中的最后一个表达式后面可以跟一个可选的逗号。数组文字的值具有类型`[T]`  ，其中T是其中表达式的类型。如果存在多种类型的表达式，则`T` 是它们最接近的公共超类型。空数组文字使用一对空方括号编写，可用于创建指定类型的空数组。

```swift
var emptyArray: [Double] = []
```

<!--
  - test: `array-literal-brackets`

  ```swifttest
  -> var emptyArray: [Double] = []
  ```
-->

*字典文字* 是键值对的无序集合。它具有以下形式：

```swift
[<#key 1#>: <#value 1#>, <#key 2#>: <#value 2#>, <#...#>]
```

字典中的最后一个表达式后面可以跟一个可选的逗号。字典文字的值具有类型`[Key: Value]` ，其中 `Key`是其键表达式的类型， `Value` 是其值表达式的类型。如果存在多种类型的表达式，则`Key`和`Value`是其各自值最接近的公共超类型。空字典文字被写为一对括号 `( [:] )` 内的冒号，以将其与空数组文字区分开。您可以使用空字典文字来创建指定键和值类型的空字典文字。

```swift
var emptyDictionary: [String: Double] = [:]
```

<!--
  - test: `dictionary-literal-brackets`

  ```swifttest
  -> var emptyDictionary: [String: Double] = [:]
  ```
-->

Xcode 使用 *Playground* 文字在程序编辑器中创建颜色、文件或图像的交互式表示。 Xcode 之外的纯文本 Playground 文字使用特殊的文字语法表示。

有关在 Xcode 中使用 Playground 文字的信息，请参阅 Xcode 帮助中[Add a color, file, or image literal](https://help.apple.com/xcode/mac/current/#/dev4c60242fc)

> 文字表达式的语法：
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

`self`表达式是对当前类型或它所在类型的实例的显式引用。它有以下几种形式：

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

在初始值设定项、下标或实例方法中， `self`指的是它出现的类型的当前实例。在类型方法中， `self`指的是它出现的当前类型。

`self`表达式用于在访问成员时指定作用域，当作用域中存在另一个同名变量（例如函数参数）时，可以消除歧义。例如：

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

在值类型的变异方法中，您可以将该值类型的新实例分配给 `self` 。例如：

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

> 自我表达的语法：
>
> *self-expression* → **`self`** | *self-method-expression* | *self-subscript-expression* | *self-initializer-expression*
>
> *self-method-expression* → **`self`** **`.`** *identifier* \
> *self-subscript-expression* → **`self`** **`[`** *function-call-argument-list* **`]`** \
> *self-initializer-expression* → **`self`** **`.`** **`init`**

### 超类表达式

*超类表达式*允许类与其超类交互。它具有以下形式之一：

```swift
super.<#member name#>
super[<#subscript index#>]
super.init(<#initializer arguments#>)
```

第一种形式用于访问超类的成员。第二种形式用于访问超类的下标实现。第三种形式用于访问超类的初始值设定项。

子类可以在其成员、下标和初始化器的实现中使用超类表达式，以利用其超类中的实现。

> 超类表达式的语法：
>
> *superclass-expression* → *superclass-method-expression* | *superclass-subscript-expression* | *superclass-initializer-expression*
>
> *superclass-method-expression* → **`super`** **`.`** *identifier* \
> *superclass-subscript-expression* → **`super`** **`[`** *function-call-argument-list* **`]`** \
> *superclass-initializer-expression* → **`super`** **`.`** **`init`**

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

闭包表达式创建一个闭包，在其他编程语言中也称为*lambda*或匿名函数。与函数声明一样，闭包包含语句，并且它从其封闭范围捕获常量和变量。它具有以下形式：

```swift
{ (<#parameters#>) -> <#return type#> in
   <#statements#>
}
```

这些参数与函数声明中的参数具有相同的形式，如<doc:Declarations#Function-Declaration>。

在闭包表达式中写入`throws`或`async`显式地将闭包标记为抛出或异步。

```swift
{ (<#parameters#>) async throws -> <#return type#> in
   <#statements#>
}
```

如果闭包的主体包含一个`throws`语句或一个未嵌套在具有详尽错误处理的`do`语句内的`try`表达式，则该闭包被理解为抛出。如果抛出闭包仅抛出单一类型的错误，则该闭包被理解为抛出该错误类型；否则，它被理解为抛出 `any Error` 。同样，如果主体包含`await`表达式，则它被理解为异步的。

有几种特殊的形式可以让闭包写得更简洁：

<!-- Apple Books screenshot ends here. -->

- 闭包可以省略其参数类型、返回类型或两者。如果省略参数名称和两种类型，请省略语句前的`in`关键字。如果无法推断省略的类型，则会引发编译时错误。

- 闭包可以省略其参数的名称。然后，其参数隐式命名为`$`后跟其位置： `$0` 、 `$1 ` 、 `$2`等。

- 仅包含单个表达式的闭包被理解为返回该表达式的值。对周围表达式执行类型推断时，也会考虑该表达式的内容。

以下闭包表达式是等效的：

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

有关将闭包作为参数传递给函数的信息，请参阅 <doc:Expressions#Function-Call-Expression>.

闭包表达式可以在不存储在变量或常量中的情况下使用，例如当您立即使用闭包作为函数调用的一部分时。上面代码中传递给`myFunction`闭包表达式就是这种立即使用的示例。因此，闭包表达式是转义还是非转义取决于表达式的周围上下文。如果立即调用闭包表达式或作为非转义函数参数传递，则闭包表达式是非转义的。否则，闭包表达式就会转义。

有关转义闭包的更多信息，请参阅文档：<doc:Closures#Escaping-Closures>.

#### 捕获列表

默认情况下，闭包表达式从其周围范围捕获常量和变量，并对这些值进行强引用。您可以使用捕获列表来显式控制如何在闭包中捕获值。

捕获列表写为以逗号分隔的表达式列表，并用方括号括起来，位于参数列表之前。如果使用捕获列表，则即使省略参数名称、参数类型和返回类型，也必须使用`in`关键字。

捕获列表中的条目在创建闭包时被初始化。对于捕获列表中的每个条目，常量被初始化为周围范围中具有相同名称的常量或变量的值。例如，在下面的代码中， `a`包含在捕获列表中，但`b`不包含在捕获列表中，这使它们具有不同的行为。

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

有两种不同的东西，名为`a` ，周围作用域中的变量和闭包作用域中的常量，但只有一个名为`b` 变量。创建闭包时，内部作用域中的`a`会使用外部作用域中a的值进行初始化，但它们的值不会以任何特殊方式连接。这意味着外部作用域中a值的更改不会影响内部作用域中`a`的值，闭包内部a的更改也不会影响闭包外部a的值。相比之下，只有一个名为b的变量——外部作用域中的`b`因此来自闭包内部或外部的更改在两个地方都可见。

<!--
  [Contributor 6004] also describes the distinction as
  "capturing the variable, not the value"
  but he notes that we don't have a rigorous definition of
  capturing a variable in Swift
  (unlike some other languages)
  so that description's not likely to be very helpful for developers.
-->

当捕获的变量的类型具有引用语义时，这种区别不可见。例如，下面的代码中有两个名为`x`的东西，外部作用域中的变量和内部作用域中的常量，但由于引用语义，它们都引用同一个对象。

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

如果表达式值的类型是类，则可以使用`weak`或`unowned`标记捕获列表中的表达式，以捕获对该表达式值的弱或无主引用。

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

您还可以将任意表达式绑定到捕获列表中的命名值。创建闭包时将对表达式求值，并以指定的强度捕获该值。例如：

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

有关闭包表达式的更多信息和示例，请参阅文档： <doc:Closures#Closure-Expressions>.
关捕获列表的更多信息和示例，请参阅文档：<doc:AutomaticReferenceCounting#Resolving-Strong-Reference-Cycles-for-Closures>.

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

> 闭包表达式的语法：
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

*隐式成员*表达式是在类型推断可以确定隐含类型的上下文中访问类型成员（例如枚举情况或类型方法）的缩写方式。它具有以下形式：

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

如果推断类型是可选类型，则还可以在隐式成员表达式中使用非可选类型的成员。

```swift
var someOptional: MyEnumeration? = .someValue
```

<!--
  - test: `implicitMemberEnum`

  ```swifttest
  -> var someOptional: MyEnumeration? = .someValue
  ```
-->

隐式成员表达式后面可以跟后缀运算符或<doc:Expressions#Postfix-Expressions>中列出的其他后缀语法。这称为*链式隐式成员表达式*。尽管所有链接的后缀表达式都具有相同的类型是很常见的，但唯一的要求是整个链接的隐式成员表达式需要可转换为其上下文隐含的类型。具体来说，如果隐含类型是可选类型，则可以使用非可选类型的值，如果隐含类型是类类型，则可以使用其子类之一的值。例如：

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

在上面的代码中， `x` 的类型与其上下文隐含的类型完全匹配， `y` 的类型可以从 `SomeClass` 转换为 `SomeClass?` ，并且 `z` 的类型可以从 `SomeSubclass` 转换为 `SomeClass` 。

> 隐式成员表达式的语法：
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

带括号的表达式由括号包围的表达式组成。您可以使用括号通过显式分组表达式来指定运算的优先级。分组括号不会更改表达式的类型 --- 例如， `(1)` 的类型只是 `Int`

<!--
  See "Tuple Expression" below for langref grammar.
-->

> 括号表达式的语法
>
> *parenthesized-expression* → **`(`** *expression* **`)`**

### 元组表达式

*元组表达式*由逗号分隔的表达式列表组成，并用括号括起来。每个表达式前面可以有一个可选标识符，用冒号 (`:`) 分隔。它具有以下形式：

```swift
(<#identifier 1#>: <#expression 1#>, <#identifier 2#>: <#expression 2#>, <#...#>)
```

元组表达式中的每个标识符在元组表达式的范围内必须是唯一的。在嵌套元组表达式中，同一嵌套级别的标识符必须是唯一的。例如， `(a: 10, a: 20)` 是无效的，因为标签 `a` 在同一级别出现了两次。然而， `(a: 10, b: (a: 1, x: 2))` 是有效的——虽然 `a`出现了两次，但它在外元组中出现一次，在内元组中出现一次。

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

元组表达式可以包含零个表达式，也可以包含两个或多个表达式。括号内的单个表达式是括号表达式。

> 注意：Swift 中空元组表达式和空元组类型都写成 `()` 。因为 `Void` 是 `()` 的类型别名，所以您可以使用它来编写空元组类型。然而，像所有类型别名一样， `Void` 始终是一种类型——您不能使用它来编写空元组表达式。

> 元组表达式的语法：
>
> *tuple-expression* → **`(`** **`)`** | **`(`** *tuple-element* **`,`** *tuple-element-list* **`)`** \
> *tuple-element-list* → *tuple-element* | *tuple-element* **`,`** *tuple-element-list* \
> *tuple-element* → *expression* | *identifier* **`:`** *expression*

### 通配符表达式

*通配符表达式* 用于在赋值期间显式忽略某个值。例如，在以下赋值中，`10` 被分配给x ，20 被忽略：



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

### 宏展开表达式

*宏扩展表达式* 由宏名称和后跟括号中的以逗号分隔的宏参数列表组成。宏在编译时展开。宏展开表达式具有以下形式：

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

该*路径* 可以引用self来创建身份密钥路径 `( \.self )`。身份键路径引用整个实例，因此您可以使用它一步来访问和更改存储在变量中的所有数据。例如：

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

*路径*可以包含使用括号的下标，只要下标的参数类型符合 `Hashable` 协议即可。此示例使用键路径中的下标来访问数组的第二个元素：

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

为了在参数中包含尾随闭包，编译器从左到右检查函数的参数，如下所示：

| 尾随闭包 | 范围 | 行动 |
| ---------------- | --------- | ------ |
| 贴上标签 | 贴上标签 | 如果标签相同，则闭包与参数匹配；否则，该参数将被跳过。|
| 贴上标签 | 未标记 | 该参数被跳过。 |
| 未标记 | 有标签或无标签 | 如果参数在结构上类似于函数类型（如下定义），则闭包与参数匹配；否则，该参数将被跳过。 |

尾随闭包作为其匹配参数的参数传递。在扫描过程中跳过的参数没有传递给它们的参数——例如，它们可以使用默认参数。找到匹配项后，将继续扫描下一个尾随闭包和下一个参数。在匹配过程结束时，所有尾随闭包都必须有匹配项。

如果参数不是输入输出参数，并且参数是以下之一，则该参数在结构上类似于函数类型：

- 类型为函数类型的参数，如`(Bool) -> Int`
- 一个自动闭包参数，其包装表达式的类型是函数类型，例如 `@autoclosure () -> ((Bool) -> Int)`
- 数组元素类型为函数类型的可变参数，例如`((Bool) -> Int)...`
- 其类型被包裹在一层或多层可选中的参数，例如`Optional<(Bool) -> Int>`
- 其类型组合了这些允许类型的参数，例如 `(Optional<(Bool) -> Int>)...`

当尾随闭包与结构上类似于函数类型但不是函数的参数匹配时，闭包将根据需要进行包装。例如，如果参数的类型是可选类型，则闭包会自动包装在 `Optional` 中.

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

为了简化从 5.3 之前的 Swift 版本（执行从右到左的匹配）的代码迁移，编译器会检查从左到右和从右到左的顺序。如果扫描方向产生不同的结果，则使用旧的从右到左排序，并且编译器会生成警告。 Swift 的未来版本将始终使用从左到右的排序。

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

在上面的示例中，标记为“Ambigitude”的函数调用会打印“- 120”，并在 Swift 5.3 上生成编译器警告。 Swift 的未来版本将打印“110 -”。

<!--
  Smart quotes on the line above are needed
  because the regex heuristics gets the close quote wrong.
-->

类、结构或枚举类型可以通过声明多种方法之一来启用函数调用语法的语法糖，如 <doc:Declarations#Methods-with-Special-Names>中所述。

#### 隐式转换为指针类型

在函数调用表达式中，如果参数和参数具有不同的类型，编译器会尝试通过应用以下列表中的隐式转换之一来使它们的类型匹配：

- `inout SomeType` 可以成为
`UnsafePointer<SomeType>` 或 `UnsafeMutablePointer<SomeType>`
- `inout Array<SomeType>` 可以成为
`UnsafePointer<SomeType>`或`UnsafeMutablePointer<SomeType>`
- `Array<SomeType>`可以成为`UnsafePointer<SomeType>`
- `String`可以成为`UnsafePointer<CChar>`

以下两个函数调用是等效的：

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

通过这些隐式转换创建的指针仅在函数调用期间有效。为了避免未定义的行为，请确保您的代码在函数调用结束后永远不会保留指针。

> 当将数组隐式转换为不安全指针时，Swift 通过根据需要转换或复制数组来确保数组的存储是连续的。例如，您可以将此语法与从 `NSArray` 子类桥接到 `Array` 的数组一起使用，该子类不对其存储制定任何 API 约定。如果您需要保证数组的存储已经是连续的，因此隐式转换永远不需要执行此工作，请使用 `ContiguousArray` 而不是 `Array` 。

使用`&`而不是像`withUnsafePointer(to:)`这样的显式函数可以帮助提高对低级 C 函数的调用的可读性，特别是当函数采用多个指针参数时。但是，当从其他 Swift 代码调用函数时，请避免使用`&`而应显式使用不安全的 API。

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

### 初始化表达式

初始值设定项表达式提供对类型的初始值设定项的访问。它具有以下形式：

```swift
<#expression#>.init(<#initializer arguments#>)
```

您可以在函数调用表达式中使用初始化表达式来初始化类型的新实例。您还可以使用初始值设定项表达式来委托给超类的初始值设定项。

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

与函数一样，初始化器可以用作值。例如：

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

如果按名称指定类型，则可以访问该类型的初始值设定项，而无需使用初始值设定项表达式。在所有其他情况下，您必须使用初始化表达式。

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

> 初始化表达式的语法：
>
> *initializer-expression* → *postfix-expression* **`.`** **`init`** \
> *initializer-expression* → *postfix-expression* **`.`** **`init`** **`(`** *argument-names* **`)`**

### 显式成员表达式

*显式成员表达式*允许访问命名类型、元组或模块的成员。它由项目与其成员标识符之间的句点 ( `.` ) 组成。

```swift
<#expression#>.<#member name#>
```

命名类型的成员被命名为类型声明或扩展的一部分。例如：

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

元组的成员按照它们出现的顺序使用整数隐式命名，从零开始。例如：

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

模块的成员访问该模块的顶级声明。

使用`dynamicMemberLookup`属性声明的类型包括在运行时查找的成员，如 <doc:Attributes>中所述。

为了区分名称仅因参数名称而不同的方法或初始化器,

要区分名称仅因参数名称不同的方法或初始值设定项，请将参数名称包含在括号中，每个参数名称后跟一个冒号 `:` )。为没有名称的参数写入下划线 ( `_` )。要区分重载方法，请使用类型注释。例如：

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

如果句点出现在行的开头，则它将被理解为显式成员表达式的一部分，而不是隐式成员表达式。例如，以下清单显示了分为几行的链式方法调用：

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

您可以将此多行链式语法与编译器控制语句结合起来，以控制每个方法的调用时间。例如，以下代码在 iOS 上使用不同的过滤规则：

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

在 `#if` 、 `#endif`和其他编译指令之间，条件编译块可以包含隐式成员表达式，后跟零个或多个后缀，以形成后缀表达式。它还可以包含另一个条件编译块，或这些表达式和块的组合。

您可以在任何可以编写显式成员表达式的地方使用此语法，而不仅仅是在顶级代码中。

在条件编译块中， `#if` 编译指令的分支必须至少包含一个表达式。其他分支可以为空。

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

### 自我表达

后缀`self` 表达式由表达式或类型名称组成，后跟 `.self` 。它有以下几种形式：

```swift
<#expression#>.self
<#type#>.self
```

第一种形式计算表达式的值。例如， `x.self` 计算结果为 `x` 。

第二种形式求值为*type*的值。使用此形式将类型作为值进行访问。例如，由于 `SomeClass.self` 计算结果为 `SomeClass` 类型本身，因此您可以将其传递给接受类型级参数的函数或方法。

> 后缀自我表达的语法:
>
> *postfix-self-expression* → *postfix-expression* **`.`** **`self`**

### 下标表达式

*下标表达式*使用相应下标声明的 getter 和 setter 提供下标访问。它具有以下形式：

```swift
<#expression#>[<#index expressions#>]
```

为了计算下标表达式的值，需要调用表达式类型的下标 getter，并将索引表达式作为下标参数传递。为了设置它的值，以同样的方式调用下标设置器。

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

有关下标声明的信息，请参阅 <doc:Declarations#Protocol-Subscript-Declaration>.

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

###  强制值表达

*强制值表达式*会解包您确定不是 `nil` 的可选值。它具有以下形式：

```swift
<#expression#>!
```

如果表达式的值不是 `nil` ，则可选值将被解包并以相应的非可选类型返回。否则，会引发运行时错误。

可以通过改变值本身或分配给值的成员之一来修改强制值表达式的展开值。例如：

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
> *强制值表达式* → *后缀表达式* **`!`**

### 可选链式表达式

*可选链表达式*提供了在后缀表达式中使用可选值的简化语法。它具有以下形式：

```swift
<#expression#>?
```

后缀 `?` 运算符从表达式创建可选链表达式而不更改表达式的值。

可选链表达式必须出现在后缀表达式中，并且它们会导致后缀表达式以特殊方式进行计算。如果可选链表达式的值为 `nil` ，则后缀表达式中的所有其他操作都将被忽略，并且整个后缀表达式的计算结果为 `nil` 。如果可选链表达式的值不是 `nil` ，则可选链表达式的值将被展开并用于计算后缀表达式的其余部分。无论哪种情况，后缀表达式的值仍然是可选类型。

如果包含可选链表达式的后缀表达式嵌套在其他后缀表达式中，则只有最外面的表达式返回可选类型。在下面的示例中，当 `c `不为 `nil`时，其值将被展开并用于计算 `.property` ，其值用于计算 `.performAction()` 。整个表达式 `c?.property.performAction()`具有可选类型的值。

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

以下示例显示了上面示例的行为，而不使用可选链。

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

可以通过改变值本身或分配给值的成员之一来修改可选链表达式的展开值。如果可选链表达式的值为nil ，则不计算赋值运算符右侧的表达式。例如：

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

> 可选链表达式的语法：
>
> *optional-chaining-expression* → *postfix-expression* **`?`**

> 测试版软件:
>
> 本文档包含有关正在开发的 API 或技术的初步信息。该信息可能会发生变化，并且根据本文档实现的软件应使用最终操作系统软件进行测试。.
>
> 了解更多关于使用 [Apple's beta software](https://developer.apple.com/support/beta-software/).

