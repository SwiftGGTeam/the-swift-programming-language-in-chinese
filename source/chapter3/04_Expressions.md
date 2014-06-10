# 表达式(Expressions)

---

Swift 中存在四种表达式： 前缀(prefix)表达式，二元(binary)表达式，主要(primary)表达式和后缀(postfix)表达式。表达式可以返回一个值，以及运行某些逻辑(causes a side effect)。

前缀表达式和二元表达式就是对某些表达式使用各种运算符(operators)。 主要表达式是最短小的表达式，它提供了获取(变量的)值的一种途径。 后缀表达式则允许你建立复杂的表达式，例如配合函数调用和成员访问。 每种表达式都在下面有详细论述～

> 表达式的语法
>
> *expression* → *prefix-expression*­*binary-expressions*(opt)
> *expression-list* → *expression*­| *expression*­,­*expression-list*

## 前缀表达式(Prefix Expressions)

前缀表达式由 前缀符号和表达式组成。(这个前缀符号只能接收一个参数)

Swift 标准库支持如下的前缀操作符：

- ++ 自增1 (increment)
- -- 自减1 (decrement)
- ! 逻辑否 (Logical NOT )
- ~ 按位否 (Bitwise NOT )
- + 加(Unary plus)
- - 减(Unary minus)

对于这些操作符的使用，请参见： Basic Operators and Advanced Operators

作为对上面标准库运算符的补充，你也可以对 某个函数的参数使用 '&'运算符。 更多信息，请参见： "In-Out parameters".

> 前缀表达式的语法
>
> *prefix-expression* → *prefix-operator* (opt) *postfix-expression*
> *prefix-expression* → *in-out-expression*­
> *in-out-expression* → &­*identifier*­

## 二元表达式( Binary Expressions)

二元表达式由 "左边参数" + "二元运算符" + "右边参数" 组成, 它有如下的形式：

    `left-hand argument` `operator` `right-hand argument`

Swift 标准库提供了如下的二元运算符：

- 求幂相关（无结合，优先级160）
  - << 按位左移(Bitwise left shift)
  - >> 按位右移(Bitwise right shift)
- 乘除法相关（左结合，优先级150）
  - \* 乘
  - / 除
  - % 求余
  - &* 乘法，忽略溢出( Multiply, ignoring overflow)
  - &/ 除法，忽略溢出(Divide, ignoring overflow)
  - &% 求余, 忽略溢出( Remainder, ignoring overflow)
  - & 位与( Bitwise AND)
- 加减法相关(左结合, 优先级140)
  - + 加
  - - 减
  - &+ Add with overflow
  - &- Subtract with overflow
  - | 按位或(Bitwise OR )
  - ^ 按位异或(Bitwise XOR)
- Range (无结合,优先级 135)
  - .. 半闭值域 Half-closed range
  - ... 全闭值域 Closed range
- 类型转换 (无结合,优先级 132)
  - is 类型检查( type check)
  - as 类型转换( type cast)
- Comparative (无结合,优先级 130)
  - < 小于
  - <= 小于等于
  - > 大于
  - >= 大于等于
  - == 等于
  - != 不等
  - === 恒等于
  - !== 不恒等
  - ~= 模式匹配( Pattern match)
- 合取( Conjunctive) (左结合,优先级 120)
  - && 逻辑与(Logical AND)
- 析取(Disjunctive) (左结合,优先级 110)
  - || 逻辑或( Logical OR)
- 三元条件(Ternary Conditional )(右结合,优先级 100)
  - ?: 三元条件 Ternary conditional
- 赋值 (Assignment) (右结合, 优先级 90)
  - = 赋值(Assign)
  - *=  Multiply and assign
  - /= Divide and assign
  - %= Remainder and assign
  - += Add and assign
  - -= Subtract and assign
  - <<= Left bit shift and assign
  - >>= Right bit shift and assign
  - &= Bitwise AND and assign
  - ^= Bitwise XOR and assign
  - |= Bitwise OR and assign
  - &&= Logical AND and assign
  - ||= Logical OR and assign

关于这些运算符(operators)的更多信息，请参见：Basic Operators and Advanced Operators.

>> 注意
>>
>> 在解析时,  一个二元表达式表示为一个一级数组(a flat list), 这个数组(List)根据运算符的先后顺序，被转换成了一个tree. 例如： 2 + 3 * 5 首先被认为是：  2, + , `` 3``, *, 5. 随后它被转换成 tree (2 + (3 * 5))

> 二元表达式的语法
>
> *binary-expression* → *binary-operator*­*prefix-expression*­
> *binary-expression* → *assignment-operator*­prefix-expression*
> *binary-expression* → *conditional-operator*­prefix-expression*
> *binary-expression* → *type-casting-operator*­
> *binary-expression*s → *binary-expression*­*binary-expressions*(opt­)

## 赋值表达式( Assignment Operator)

The assigment operator sets a new value for a given expression. It has the following form:
赋值表达式会对某个给定的表达式赋值。 它有如下的形式；

    `expression` = `value`

就是把右边的 *value* 赋值给左边的 *expression*. 如果左边的*expression* 需要接收多个参数（是一个tuple )，那么右边必须也是一个具有同样数量参数的tuple. (允许嵌套的tuple)

```swift
(a, _, (b, c)) = ("test", 9.45, (12, 3))
// a is "test", b is 12, c is 3, and 9.45 is ignored
```

赋值运算符不返回任何值。

> GRAMMAR OF AN ASSIGNMENT OPERATOR
>
> *assignment-operator* → =­

三元条件运算符(Ternary Conditional Operator)

三元条件运算符 是根据条件来获取值。 形式如下：

    `condition` ? `expression used if true` : `expression used if false`

如果 `condition` 是true, 那么返回 第一个表达式的值(此时不会调用第二个表达式）， 否则返回第二个表达式的值(此时不会调用第一个表达式）。

想看三元条件运算符的例子，请参见： Ternary Conditional Operator.

> 三元条件表达式
>
> `conditional-operator` → ?­`expression`­:­

## 类型转换运算符(Type-Casting Operators)

There are two type-casting operators, the as operator and the is operator. They have the following form:
有两种类型转换操作符： as 和 is.  它们有如下的形式：

expression as type
expression as? type
expression is type

The as operator performs a cast of the expression to the specified type. It behaves as follows:
as 运算符会把目标表达式转换成指定的类型(specified type)，过程如下：

If conversion to the specified type is guaranteed to succeed, the value of the expression is returned as an instance of the specified type. An example is casting from a subclass to a superclass.
如果类型转换成功， 那么目标表达式就会返回指定类型的实例(instance). 例如：把子类(subclass)变成父类(superclass)时.

If conversion to the specified type is guaranteed to fail, a compile-time error is raised.
如果转换失败，则会抛出编译错误( compile-time error)。

Otherwise, if it’s not known at compile time whether the conversion will succeed, the type of the cast expresion is an optional of the specified type. At runtime, if the cast succeeds, the value of expression is wrapped in an optional and returned; otherwise, the value returned is nil. An example is casting from a superclass to a subclass.
如果上述两个情况都不是（也就是说，编译器在编译时期无法确定转换能否成功，) 那么目标表达式就会变成指定的类型的optional. (is an optional of the specified type ) 然后在运行时，如果转换成功， 目标表达式就会作为 optional的一部分来返回， 否则，目标表达式返回nil. 对应的例子是： 把一个 superclass 转换成一个 subclass.

class SomeSuperType {}
class SomeType: SomeSuperType {}
class SomeChildType: SomeType {}
let s = SomeType()

let x = s as SomeSuperType  // known to succeed; type is SomeSuperType
let y = s as Int            // known to fail; compile-time error
let z = s as SomeChildType  // might fail at runtime; type is SomeChildType?

Specifying a type with as provides the same information to the compiler as a type annotation, as shown in the following example:
使用'as'做类型转换跟正常的类型声明，对于编译器来说是一样的。

let y1 = x as SomeType  // Type information from 'as'
let y2: SomeType = x    // Type information from an annotation

The is operator checks at runtime to see whether the expression is of the specified type. If so, it returns true; otherwise, it returns false.
'as' 运算符在“运行时(runtime)”会做检查。 成功会返回true, 否则 false

The check must not be known to be true or false at compile time. The following are invalid:
上述检查在“编译时(compile time)”不能使用。 例如下面的使用是错误的：

"hello" is String
"hello" is Int

For more information about type casting and to see more examples that use the type-casting operators, see Type Casting.

GRAMMAR OF A TYPE-CASTING OPERATOR

type-casting-operator → is­type­  as­?­opt­type­

主要表达式(Primary Expressions)

Primary expressions are the most basic kind of expression. They can be used as expressions on their own, and they can be combined with other tokens to make prefix expressions, binary expressions, and postfix expressions.
主要表达式是最基本的表达式。 它们可以跟 前缀表达式，二元表达式，后缀表达式以及其他主要表达式组合使用。

GRAMMAR OF A PRIMARY EXPRESSION

primary-expression → identifier­generic-argument-clause­opt­
primary-expression → literal-expression­
primary-expression → self-expression­
primary-expression → superclass-expression­
primary-expression → closure-expression­
primary-expression → parenthesized-expression­
primary-expression → implicit-member-expression­
primary-expression → wildcard-expression­

字符型表达式
Literal Expression

A literal expression consists of either an ordinary literal (such as a string or a number), an array or dictionary literal, or one of the following special literals:
它由这些内容组成：普通的字符（string, number) , 一个字符的字典或者数组，或者下面列表中的特殊字符。

Literal
Type
Value
__FILE__
String

The name of the file in which it appears.

__LINE__
Int

The line number on which it appears.

__COLUMN__
Int

The column number in which it begins.

__FUNCTION__

String

The name of the declaration in which it appears.

Inside a function, the value of __FUNCTION__ is the name of that function, inside a method it is the name of that method, inside a property getter or setter it is the name of that property, inside special members like init or subscript it is the name of that keyword, and at the top level of a file it is the name of the current module.

在某个函数(function)中，__FUNCTION__ 会返回当前函数的名字。 在某个方法(method)中，它会返回当前方法的名字。 在某个property 的getter/setter中会返回这个属性的名字。 在init/subscript 只有的特殊成员(member)中会返回这个keyword的名字，在某个文件的顶端(the top level of a file)，它返回的是当前module的名字。

An array literal is an ordered collection of values. It has the following form:
一个array literal，是一个有序的值的集合。 它的形式是：

[value 1, value 2, ...]

The last expression in the array can be followed by an optional comma. An empty array literal is written as an empty pair of brackets ([]). The value of an array literal has type T[], where T is the type of the expressions inside it. If there are expressions of multiple types, T is their closest common supertype.
数组中的最后一个表达式可以紧跟一个逗号(','). [] 表示空数组 。 array literal的type是 T[], 这个T就是数组中元素的type. 如果该数组中有多种type, T则是跟这些type的公共supertype最接近的type.(closest common supertype)

A dictionary literal is an unordered collection of key-value pairs. It has the following form:
一个dictionary literal 是一个包含无序的键值对(key-value pairs)的集合，它的形式是:

[key 1: value 1, key 2: value 2, ...]

The last expression in the dictionary can be followed by an optional comma. An empty dictionary literal is written as a colon inside a pair of brackets ([:]) to distinguish it from an empty array literal. The value of a dictionary literal has type Dictionary<KeyType, ValueType>, where KeyType is the type of its key expressions and ValueType is the type of its value expressions. If there are expressions of multiple types, KeyType and ValueType are the closest common supertype for their respective values.
dictionary 的最后一个表达式可以是一个逗号(','). [:] 表示一个空的dictionary. 它的type是 Dictionary<KeyType, ValueType> (这里KeyType表示 key的type, ValueType表示 value的type) 如果这个dictionary 中包含多种 types, 那么KeyType, Value 则对应着它们的公共supertype最接近的type( closest common supertype).

GRAMMAR OF A LITERAL EXPRESSION

literal-expression → literal­
literal-expression → array-literal­  dictionary-literal­
literal-expression → __FILE__­  __LINE__­  __COLUMN__­  __FUNCTION__­
array-literal → [­array-literal-items­opt­]­
array-literal-items → array-literal-item­,­opt­  array-literal-item­,­array-literal-items­
array-literal-item → expression­
dictionary-literal → [­dictionary-literal-items­]­  [­:­]­
dictionary-literal-items → dictionary-literal-item­,­opt­  dictionary-literal-item­,­dictionary-literal-items­
dictionary-literal-item → expression­:­expression­

self表达式(Self Expression)

The self expression is an explicit reference to the current type or instance of the type in which it occurs. It has the following forms:
self表达式是对 当前type 或者当前instance的引用。它的形式如下：

self
self.member name
self[subscript index]
self(initializer arguments)
self.init(initializer arguments)

In an initializer, subscript, or instance method, self refers to the current instance of the type in which it occurs. In a static or class method, self refers to the current type in which it occurs.
如果在 initializer, subscript, instance method中，self等同于当前type的instance. 在一个静态方法(static method), 类方法(class method)中， self等同于当前的type.

The self expression is used to specify scope when accessing members, providing disambiguation when there is another variable of the same name in scope, such as a function parameter. For example:

当访问 member（成员变量时）， self 用来区分重名变量(例如函数的参数).  例如，
(下面的 self.greeting 指的是 var greeting: String, 而不是 init(greeting: String) )

class SomeClass {
    var greeting: String
    init(greeting: String) {
        self.greeting = greeting
    }
}

In a mutating method of value type, you can assign a new instance of that value type to self. For example:
在mutating 方法中， 你可以使用self 对 该instance进行赋值。

struct Point {
    var x = 0.0, y = 0.0
    mutating func moveByX(deltaX: Double, y deltaY: Double) {
        self = Point(x: x + deltaX, y: y + deltaY)
    }
}

GRAMMAR OF A SELF EXPRESSION

self-expression → self­
self-expression → self­.­identifier­
self-expression → self­[­expression­]­
self-expression → self­.­init­

超类表达式(Superclass Expression)

A superclass expression lets a class interact with its superclass. It has one of the following forms:
超类表达式可以使我们在某个class中访问它的超类. 它有如下形式：

super.member name
super[subscript index]
super.init(initializer arguments)

The first form is used to access a member of the superclass. The second form is used to access the superclass’s subscript implementation. The third form is used to access an initializer of the superclass.
形式1 用来访问超类的某个成员(member). 形式2 用来访问该超类的 subscript 实现。 形式3 用来访问该超类的 initializer.

Subclasses can use a superclass expression in their implementation of members, subscripting, and initializers to make use of the implementation in their superclass.
子类(subclass)可以通过超类(superclass)表达式在它们的 member, subscripting 和 initializers 中来利用它们超类中的某些实现(既有的方法或者逻辑)。

GRAMMAR OF A SUPERCLASS EXPRESSION

superclass-expression → superclass-method-expression­  superclass-subscript-expression­ superclass-initializer-expression­
superclass-method-expression → super­.­identifier­
superclass-subscript-expression → super­[­expression­]­
superclass-initializer-expression → super­.­init­

闭包表达式(Closure Expression)

A closure expression creates a closure, also known as a lambda or an anonymous function in other programming languages. Like function declarations, closures contain statements which they execute, and they capture values from their enclosing scope. It has the following form:
闭包(closure) 表达式可以建立一个闭包(在其他语言中也叫 lambda, 或者 匿名函数(anonymous function)). 跟函数(function)的声明一样， 闭包(closure)包含了可执行的代码(跟方法主体(statement)类似） 以及接收(capture)的参数。 它的形式如下：

{ (parameters) -> return type in
    statements
}

The parameters have the same form as the parameters in a function declaration, as described in Function Declaration.
闭包的参数声明形式跟方法中的声明一样。

There are several special forms that allow closures to be written more concisely:
闭包还有几种特殊的形式, 让使用更加简洁：

A closure can omit the types of its parameters, its return type, or both. If you omit the parameter names and both types, omit the in keyword before the statements. If the omitted types can’t be inferred, a compile-time error is raised.
闭包可以省略 它的参数的type 和返回值的type. 如果省略了参数和参数类型，就也要省略 'in'关键字。 如果被省略的type 无法被编译器获知(inferred) ，那么就会抛出编译错误。

A closure may omit names for its parameters. Its parameters are then implicitly named $ followed by their position: $0, $1, $2, and so on.
闭包可以省略参数，转而在方法体(statement)中使用 $0, $1, $2 来引用出现的第一个，第二个，第三个参数。

A closure that consists of only a single expression is understood to return the value of that expression. The contents of this expression is also considered when performing type inference on the surrounding expression.
如果闭包中只包含了一个表达式，那么该表达式就会自动成为该闭包的返回值。 在执行 'type inference '时，该表达式也会返回。

The following closure expressions are equivalent:
下面几个 闭包表达式是 等价的：

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

For information about passing a closure as an argument to a function, see Function Call Expression.
关于 向闭包中传递参数的内容，参见： Function Call Expression.

A closure expression can explicitly specify the values that it captures from the surrounding scope using a capture list. A capture list is written as a comma separated list surrounded by square brackets, before the list of parameters. If you use a capture list, you must also use the in keyword, even if you omit the parameter names, parameter types, and return type.
闭包表达式可以通过一个参数列表(capture list) 来显式指定它需要的参数。 参数列表 由中括号 [] 括起来，里面的参数由逗号','分隔。一旦使用了参数列表，就必须使用'in'关键字(在任何情况下都得这样做，包括忽略参数的名字，type, 返回值时等等）。

Each entry in the capture list can be marked as weak or unowned to capture a weak or unowned reference to the value.
在闭包的参数列表( capture list)中， 参数可以声明为 'weak' 或者 'unowned' .

myFunction { print(self.title) }                    // strong capture
myFunction { [weak self] in print(self!.title) }    // weak capture
myFunction { [unowned self] in print(self.title) }  // unowned capture

You can also bind arbitrary expression to named values in the capture list. The expression is evaluated when the closure is formed, and captured with the specified strength. For example:
在参数列表中，也可以使用任意表达式来赋值. 该表达式会在 闭包被执行时赋值，然后按照不同的力度来获取(这句话请慎重理解)。(captured with the specified strength. ) 例如：

// Weak capture of "self.parent" as "parent"
myFunction { [weak parent = self.parent] in print(parent!.title) }

For more information and examples of closure expressions, see Closure Expressions.

GRAMMAR OF A CLOSURE EXPRESSION

closure-expression → {­closure-signature­opt­statements­}­
closure-signature → parameter-clause­function-result­opt­in­
closure-signature → identifier-list­function-result­opt­in­
closure-signature → capture-list­parameter-clause­function-result­opt­in­
closure-signature → capture-list­identifier-list­function-result­opt­in­
closure-signature → capture-list­in­
capture-list → [­capture-specifier­expression­]­
capture-specifier → weak­  unowned­  unowned(safe)­  unowned(unsafe)­

隐式成员表达式(Implicit Member Expression)

An implicit member expression is an abbreviated way to access a member of a type, such as an enumeration case or a class method, in a context where type inference can determine the implied type. It has the following form:
在可以判断出类型(type)的上下文(context)中，隐式成员表达式是访问某个type的member( 例如 class method, enumeration case) 的简洁方法。 它的形式是：

.member name

For example:

var x = MyEnumeration.SomeValue
x = .AnotherValue

GRAMMAR OF A IMPLICIT MEMBER EXPRESSION

implicit-member-expression → .­identifier­

圆括号表达式(Parenthesized Expression)

A parenthesized expression consists of a comma-separated list of expressions surrounded by parentheses. Each expression can have an optional identifier before it, separated by a colon (:). It has the following form:
圆括号表达式由多个子表达式和逗号','组成。 每个子表达式前面可以有 identifier x: 这样的可选前缀。形式如下：

(identifier 1: expression 1, identifier 2: expression 2, ...)

Use parenthesized expressions to create tuples and to pass arguments to a function call. If there is only one value inside the parenthesized expression, the type of the parenthesized expression is the type of that value. For example, the type of the parenthesized expression (1) is Int, not (Int).
圆括号表达式用来建立tuples ， 然后把它做为参数传递给 function. 如果某个圆括号表达式中只有一个 子表达式，那么它的type就是 子表达式的type。例如： (1)的 type是Int, 而不是(Int)

GRAMMAR OF A PARENTHESIZED EXPRESSION

parenthesized-expression → (­expression-element-list­opt­)­
expression-element-list → expression-element­  expression-element­,­expression-element-list­
expression-element → expression­  identifier­:­expression­

通配符表达式( Wildcard Expression)

A wildcard expression is used to explicitly ignore a value during an assignment. For example, in the following assignment 10 is assigned to x and 20 is ignored:
通配符表达式用来忽略传递进来的某个参数。例如：下面的代码中，10被传递给x, 20被忽略（译注：好奇葩的语法。。。）

(x, _) = (10, 20)
// x is 10, 20 is ignored

GRAMMAR OF A WILDCARD EXPRESSION

wildcard-expression → _­

后缀表达式( Postfix Expressions)

Postfix expressions are formed by applying a postfix operator or other postfix syntax to an expression. Syntactically, every primary expression is also a postfix expression.
后缀表达式就是在某个表达式的后面加上 操作符。 严格的讲，每个主要表达式(primary expression)都是一个后缀表达式

The Swift standard library provides the following postfix operators:
Swift 标准库提供了下列后缀表达式：

++ Increment
-- Decrement

For information about the behavior of these operators, see Basic Operators and Advanced Operators.

GRAMMAR OF A POSTFIX EXPRESSION

postfix-expression → primary-expression­
postfix-expression → postfix-expression­postfix-operator­
postfix-expression → function-call-expression­
postfix-expression → initializer-expression­
postfix-expression → explicit-member-expression­
postfix-expression → postfix-self-expression­
postfix-expression → dynamic-type-expression­
postfix-expression → subscript-expression­
postfix-expression → forced-value-expression­
postfix-expression → optional-chaining-expression­

函数调用表达式( Function Call Expression)

A function call expression consists of a function name followed by a comma-separated list of the function’s arguments in parentheses. Function call expressions have the following form:
函数调用表达式由函数名和参数列表组成。它的形式如下：

function name(argument value 1, argument value 2)

The function name can be any expression whose value is of a function type.
(不用翻译了, 太罗嗦）

If the function definition includes names for its parameters, the function call must include names before its argument values separated by a colon (:). This kind of function call expression has the following form:
如果该function 的声明中指定了参数的名字，那么在调用的时候也必须得写出来. 例如：

function name(argument name 1: argument value 1, argument name 2: argument value 2)

A function call expression can include a trailing closure in the form of a closure expression immediately after the closing parenthesis. The trailing closure is understood as an argument to the function, added after the last parenthesized argument. The following function calls are equivalent:
可以在 函数调用表达式的尾部(最后一个参数之后)加上 一个闭包(closure) ， 该闭包会被目标函数理解并执行。它具有如下两种写法：

// someFunction takes an integer and a closure as its arguments
someFunction(x, {$0 == 13})
someFunction(x) {$0 == 13}

If the trailing closure is the function’s only argument, the parentheses can be omitted.
如果闭包是该函数的唯一参数，那么圆括号可以省略。

// someFunction takes a closure as its only argument
myData.someMethod() {$0 == 13}
myData.someMethod {$0 == 13}

GRAMMAR OF A FUNCTION CALL EXPRESSION

function-call-expression → postfix-expression­parenthesized-expression­
function-call-expression → postfix-expression­parenthesized-expression­opt­trailing-closure­
trailing-closure → closure-expression­

初始化函数表达式(Initializer Expression)

An initializer expression provides access to a type’s initializer. It has the following form:
Initializer表达式用来给某个Type初始化。 它的形式如下：

expression.init(initializer arguments)

You use the initializer expression in a function call expression to initialize a new instance of a type. Unlike functions, an initializer can’t be used as a value. For example:
(Initializer表达式用来给某个Type初始化。) 跟函数(function)不同， initializer 不能返回值。

var x = SomeClass.someClassFunction // ok
var y = SomeClass.init              // error

You also use an initializer expression to delegate to the initializer of a superclass.
可以通过 initializer 表达式来委托调用(delegate to )到superclass的initializers.

class SomeSubClass: SomeSuperClass {
    init() {
        // subclass initialization goes here
        super.init()
    }
}

GRAMMAR OF AN INITIALIZER EXPRESSION

initializer-expression → postfix-expression­.­init­

显式成员表达式(Explicit Member Expression)

A explicit member expression allows access to the members of a named type, a tuple, or a module. It consists of a period (.) between the item and the identifier of its member.
显示成员表达式允许我们访问type, tuple, module的成员变量。它的形式如下：

expression.member name

The members of a named type are named as part of the type’s declaration or extension. For example:
该member 就是某个type在声明时候所定义(declaration or extension) 的变量, 例如：

class SomeClass {
    var someProperty = 42
}
let c = SomeClass()
let y = c.someProperty  // Member access

The members of a tuple are implicitly named using integers in the order they appear, starting from zero. For example:
对于tuple, 要根据它们出现的顺序(0, 1, 2...)来使用:

var t = (10, 20, 30)
t.0 = t.1
// Now t is (20, 20, 30)

The members of a module access the top-level declarations of that module.
(不确定：对于某个module的member的调用，只能调用在top-level声明中的member.)

GRAMMAR OF AN EXPLICIT MEMBER EXPRESSION

explicit-member-expression → postfix-expression­.­decimal-digit­
explicit-member-expression → postfix-expression­.­identifier­generic-argument-clause­opt­

后缀self表达式(Postfix Self Expression)

A postfix self expression consists of an expression or the name of a type, immediately followed by .self. It has the following forms:
后缀表达式由 某个表达式 + '.self' 组成. 形式如下：

expression.self
type.self

The first form evaluates to the value of the expression. For example, x.self evaluates to x.
形式1 表示会返回 expression 的值。例如： x.self 返回 x

The second form evaluates to the value of the type. Use this form to access a type as a value. For example, because SomeClass.self evaluates to the SomeClass type itself, you can pass it to a function or method that accepts a type-level argument.
形式2：返回对应的type。我们可以用它来动态的获取某个instance的type。

GRAMMAR OF A SELF EXPRESSION

postfix-self-expression → postfix-expression­.­self­

动态类型表达式(Dynamic Type Expression)

A dynamicType expression consists of an expression, immediately followed by .dynamicType. It has the following form:
动态类型表达式由 某个表达式 + '.dynamicType' 组成。

expression.dynamicType

The expression can’t be the name of a type. The entire dynamicType expression evaluates to the value of the runtime type of the expression, as the following example shows:
上面的形式中， expression 不能是某type的名字(当然了，如果我都知道它的名字了还需要动态来获取它吗）。动态类型表达式会返回"运行时"某个instance的type, 具体请看下面的列子：

class SomeBaseClass {
    class func printClassName() {
        println("SomeBaseClass")
    }
}
class SomeSubClass: SomeBaseClass {
    override class func printClassName() {
        println("SomeSubClass")
    }
}
let someInstance: SomeBaseClass = SomeSubClass()

// someInstance is of type SomeBaseClass at compile time, but
// someInstance is of type SomeSubClass at runtime
someInstance.dynamicType.printClassName()
// prints "SomeSubClass"

GRAMMAR OF A DYNAMIC TYPE EXPRESSION

dynamic-type-expression → postfix-expression­.­dynamicType­

下标表达式( Subscript Expression)

A subscript expression provides subscript access using the getter and setter of the corresponding subscript declaration. It has the following form:
下标表达式提供了通过下标访问getter/setter 的方法。它的形式是：

expression[index expressions]

To evaluate the value of a subscript expression, the subscript getter for the expression’s type is called with the index expressions passed as the subscript parameters. To set its value, the subscript setter is called in the same way.
可以通过下标表达式通过getter获取某个值，或者通过setter赋予某个值.

For information about subscript declarations, see Protocol Subscript Declaration.

GRAMMAR OF A SUBSCRIPT EXPRESSION

subscript-expression → postfix-expression­[­expression-list­]­

强制取值表达式(Forced-Value Expression)

A forced-value expression unwraps an optional value that you are certain is not nil. It has the following form:
强制取值表达式用来获取某个目标表达式的值(该目标表达式的值必须不是nil )。它的形式如下：

expression!

If the value of the expression is not nil, the optional value is unwrapped and returned with the corresponding nonoptional type. Otherwise, a runtime error is raised.
如果该表达式的值不是nil, 则返回对应的值。 否则，抛出运行时错误(runtime error)。

GRAMMAR OF A FORCED-VALUE EXPRESSION

forced-value-expression → postfix-expression­!­

可选链表达式(Optional-Chaining Expression)

An optional-chaining expression provides a simplified syntax for using optional values in postfix expressions. It has the following form:
可选链表达式由目标表达式 + '?' 组成，形式如下：

expression?

On its own, the postfix ? operator simply returns the value of its argument as an optional.
后缀'?' 返回目标表达式的值，把它做为可选的参数传递给后续的表达式

Postfix expressions that contain an optional-chaining expression are evaluated in a special way. If the optional-chaining expression is nil, all of the other operations in the postfix expression are ignored and the entire postfix expression evaluates to nil. If the optional-chaining expression is not nil, the value of the optional-chaining expression is unwrapped and used to evaluate the rest of the postfix expression. In either case, the value of the postfix expression is still of an optional type.
如果某个后缀表达式包含了可选链表达式，那么它的执行过程就比较特殊： 首先先判断该可选链表达式的值，如果是 nil, 整个后缀表达式都返回 nil, 如果该可选链的值不是nil, 则正常返回该后缀表达式的值(依次执行它的各个子表达式）。在这两种情况下，该后缀表达式仍然是一个optional type(In either case, the value of the postfix expression is still of an optional type)

If a postfix expression that contains an optional-chaining expression is nested inside other postfix expressions, only the outermost expression returns an optional type. In the example below, when c is not nil, its value is unwrapped and used to evaluate both .property and .performAction(), and the entire expression c?.property.performAction() has a value of an optional type.

如果某个"后缀表达式"的"子表达式"中包含了"可选链表达式"，那么只有最外层的表达式返回的才是一个optional type. 例如，在下面的例子中， 如果c 不是nil, 那么 c?.property.performAction() 这句代码在执行时，就会先获得c 的property方法，然后调用 performAction()方法。 然后对于 "c?.property.performAction()" 这个整体，它的返回值是一个optional type.

var c: SomeClass?
var result: Bool? = c?.property.performAction()

The following example shows the behavior of the example above without using optional chaining.
如果不使用可选链表达式，那么 上面例子的代码跟下面例子等价：

if let unwrappedC = c {
    result = unwrappedC.property.performAction()
}

GRAMMAR OF AN OPTIONAL-CHAINING EXPRESSION

optional-chaining-expression → postfix-expression­?­
