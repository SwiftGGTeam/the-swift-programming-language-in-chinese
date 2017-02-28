# 类型（Types）
-----------------

> 1.0
> 翻译：[lyuka](https://github.com/lyuka)
> 校对：[numbbbbb](https://github.com/numbbbbb), [stanzhai](https://github.com/stanzhai)

> 2.0
> 翻译+校对：[EudeMorgen](https://github.com/EudeMorgen)

> 2.1
> 翻译：[mmoaay](https://github.com/mmoaay)

本页包含内容：

- [类型注解](#type_annotation)
- [类型标识符](#type_identifier)
- [元组类型](#tuple_type)
- [函数类型](#function_type)
- [数组类型](#array_type)
- [字典类型](#dictionary_type)
- [可选类型](#optional_type)
- [隐式解析可选类型](#implicitly_unwrapped_optional_type)
- [协议合成类型](#protocol_composition_type)
- [元类型](#metatype_type)
- [类型继承子句](#type_inheritance_clause)
- [类型推断](#type_inference)

Swift 语言存在两种类型：命名型类型和复合型类型。命名型类型是指定义时可以给定名字的类型。命名型类型包括类、结构体、枚举和协议。比如，一个用户定义的类 `MyClass` 的实例拥有类型 `MyClass`。除了用户定义的命名型类型，Swift 标准库也定义了很多常用的命名型类型，包括那些表示数组、字典和可选值的类型。

那些通常被其它语言认为是基本或原始的数据型类型，比如表示数字、字符和字符串的类型，实际上就是命名型类型，这些类型在 Swift 标准库中是使用结构体来定义和实现的。因为它们是命名型类型，因此你可以按照 [扩展](../chapter2/21_Extensions.html) 和 [扩展声明](05_Declarations.html#extension_declaration) 中讨论的那样，声明一个扩展来增加它们的行为以满足你程序的需求。

复合型类型是没有名字的类型，它由 Swift 本身定义。Swift 存在两种复合型类型：函数类型和元组类型。一个复合型类型可以包含命名型类型和其它复合型类型。例如，元组类型 `(Int, (Int, Int))` 包含两个元素：第一个是命名型类型 `Int`，第二个是另一个复合型类型 `(Int, Int)`。

本节讨论 Swift 语言本身定义的类型，并描述 Swift 中的类型推断行为。

> 类型语法  
<a name="type"></a>
> *类型* → [*数组类型*](#array-type) | [*字典类型*](#dictionary-type) | [*函数类型*](#function-type) | [*类型标识*](#type-identifier) | [*元组类型*](#tuple-type) | [*可选类型*](#optional-type) | [*隐式解析可选类型*](#implicitly-unwrapped-optional-type) | [*协议合成类型*](#protocol-composition-type) | [*元型类型*](#metatype-type) | **任意类型** | **自身类型**

<a name="type_annotation"></a>
## 类型注解

类型注解显式地指定一个变量或表达式的值。类型注解始于冒号 `:` 终于类型，比如下面两个例子：

```swift
let someTuple: (Double, Double) = (3.14159, 2.71828)
func someFunction(a: Int) { /* ... */ }
```
在第一个例子中，表达式 `someTuple` 的类型被指定为 `(Double, Double)`。在第二个例子中，函数 `someFunction` 的参数 `a` 的类型被指定为 `Int`。

类型注解可以在类型之前包含一个类型特性的可选列表。

> 类型注解语法  
<a name="type-annotation"></a>
> *类型注解* → **:** [*特性列表*](06_Attributes.html#attributes)<sub>可选</sub> **输入输出参数**<sub>可选</sub> [*类型*](#type)

<a name="type_identifier"></a>
## 类型标识符

类型标识符引用命名型类型，还可引用命名型或复合型类型的别名。

大多数情况下，类型标识符引用的是与之同名的命名型类型。例如类型标识符 `Int` 引用命名型类型 `Int`，同样，类型标识符 `Dictionary<String, Int>` 引用命名型类型 `Dictionary<String, Int>`。

在两种情况下类型标识符不引用同名的类型。情况一，类型标识符引用的是命名型或复合型类型的类型别名。比如，在下面的例子中，类型标识符使用 `Point` 来引用元组 `(Int, Int)`：

```swift
typealias Point = (Int, Int)
let origin: Point = (0, 0)
```

情况二，类型标识符使用点语法（`.`）来表示在其它模块或其它类型嵌套内声明的命名型类型。例如，下面例子中的类型标识符引用在 `ExampleModule` 模块中声明的命名型类型 `MyType`：

```swift
var someValue: ExampleModule.MyType
```

> 类型标识符语法  
<a name="type-identifier"></a>
> *类型标识符* → [*类型名称*](#type-name) [*泛型参数子句*](08_Generic_Parameters_and_Arguments.html#generic_argument_clause)<sub>可选</sub> | [*类型名称*](#type-name) [*泛型参数子句*](08_Generic_Parameters_and_Arguments.html#generic_argument_clause)<sub>可选</sub> **.** [*类型标识符*](#type-identifier)  
<a name="type-name"></a>
> *类型名称* → [*标识符*](02_Lexical_Structure.html#identifier)  

<a name="tuple_type"></a>
## 元组类型

元组类型是使用括号括起来的零个或多个类型，类型间用逗号隔开。

你可以使用元组类型作为一个函数的返回类型，这样就可以使函数返回多个值。你也可以命名元组类型中的元素，然后用这些名字来引用每个元素的值。元素的名字由一个标识符紧跟一个冒号 `(:)` 组成。[函数和多返回值](../chapter2/06_Functions.html#functions_with_multiple_return_values) 章节里有一个展示上述特性的例子。

当一个元组类型的元素有名字的时候，这个名字就是类型的一部分。

```swift
var someTuple = (top: 10, bottom: 12)  // someTuple 的类型为 (top: Int, bottom: Int)
someTuple = (top: 4, bottom: 42) // 正确：命名类型匹配
someTuple = (9, 99)              // 正确：命名类型被自动推断
someTuple = (left: 5, right: 5)  // 错误：命名类型不匹配
```

`Void` 是空元组类型 `()` 的别名。如果括号内只有一个元素，那么该类型就是括号内元素的类型。比如，`(Int)` 的类型是 `Int` 而不是 `(Int)`。所以，只有当元组类型包含的元素个数在两个及以上时才可以命名元组元素。

> 元组类型语法
<a name="tuple-type"></a>
> *元组类型* → **(** [*元组类型元素列表*](#tuple-type-element-list) <sub>可选</sub> **)**  
<a name="tuple-type-element-list"></a>
> *元组类型元素列表* → [*元组类型元素*](#tuple-type-element) | [*元组类型元素*](#tuple-type-element) **,** [*元组类型元素列表*](#tuple-type-element-list)  
<a name="tuple-type-element"></a>
> *元组类型元素* → [*元素名*](#element-name) [*类型注解*](#type-annotation) | [*类型*](#type)
<a name="element-name"></a>
> *元素名* → [*标识符*](02_Lexical_Structure.html#identifier)  

<a name="function_type"></a>
## 函数类型

函数类型表示一个函数、方法或闭包的类型，它由参数类型和返回值类型组成，中间用箭头（`->`）隔开：

> `参数类型` -> `返回值类型`

参数类型是由逗号间隔的类型列表。由于参数类型和返回值类型可以是元组类型，所以函数类型支持多参数与多返回值的函数与方法。

你可以对函数参数使用 `autoclosure` 特性。这会自动将参数表达式转化为闭包，表达式的结果即闭包返回值。这从语法结构上提供了一种便捷：延迟对表达式的求值，直到其值在函数体中被使用。以自动闭包做为参数的函数类型的例子详见 [自动闭包](../chapter2/07_Closures.html#autoclosures) 。

函数类型可以拥有一个可变长参数作为参数类型中的最后一个参数。从语法角度上讲，可变长参数由一个基础类型名字紧随三个点（`...`）组成，如 `Int...`。可变长参数被认为是一个包含了基础类型元素的数组。即 `Int...` 就是 `[Int]`。关于使用可变长参数的例子，请参阅 [可变参数](../chapter2/06_Functions.html#variadic_parameters)。

为了指定一个 `in-out` 参数，可以在参数类型前加 `inout` 前缀。但是你不可以对可变长参数或返回值类型使用 `inout`。关于这种参数的详细讲解请参阅 [输入输出参数](../chapter2/06_Functions.html#in_out_parameters)。

函数和方法中的参数名并不是函数类型的一部分。例如：

```swift
func someFunction(left: Int, right: Int) {}
func anotherFunction(left: Int, right: Int) {}
func functionWithDifferentLabels(top: Int, bottom: Int) {}
 
var f = someFunction // 函数f的类型为 (Int, Int) -> Void, 而不是 (left: Int, right: Int) -> Void.
f = anotherFunction              // 正确
f = functionWithDifferentLabels  // 正确
 
func functionWithDifferentArgumentTypes(left: Int, right: String) {}
func functionWithDifferentNumberOfArguments(left: Int, right: Int, top: Int) {}
 
f = functionWithDifferentArgumentTypes     // 错误
f = functionWithDifferentNumberOfArguments // 错误
```

如果一个函数类型包涵多个箭头(->)，那么函数类型将从右向左进行组合。例如，函数类型 `Int -> Int -> Int` 可以理解为 `Int -> (Int -> Int)`，也就是说，该函数类型的参数为 `Int` 类型，其返回类型是一个参数类型为 `Int`，返回类型为 `Int` 的函数类型。

函数类型若要抛出错误就必须使用 `throws` 关键字来标记，若要重抛错误则必须使用 `rethrows` 关键字来标记。`throws` 关键字是函数类型的一部分，非抛出函数是抛出函数函数的一个子类型。因此，在使用抛出函数的地方也可以使用不抛出函数。抛出和重抛函数的相关描述见章节 [抛出函数与方法](05_Declarations.html#throwing_functions_and_methods) 和 [重抛函数与方法](05_Declarations.html#rethrowing_functions_and_methods)。

> 函数类型语法  
<a name="function-type"></a>
> *函数类型* → [*特性列表*](06_Attributes.html#attributes)<sub>可选</sub> [*函数类型子句*](#function-type-argument-clause) **throws**<sub>可选</sub> **->** [*类型*](#type)
> *函数类型* → [*特性列表*](06_Attributes.html#attributes)<sub>可选</sub> [*函数类型子句*](#function-type-argument-clause) **rethrows­** **->** [*类型*](#type) 
<a name="function-type-argument-clause"></a>
> *函数类型子句* → (­)­
> *函数类型子句* → ([*函数类型参数列表*](#function-type-argument-list)*...*­<sub>可选</sub>)­
<a name="function-type-argument-list"></a>
> *函数类型参数列表* → [*函数类型参数*](function-type-argument) | [*函数类型参数*](function-type-argument)， [*函数类型参数列表*](#function-type-argument-list)
<a name="function-type-argument"></a>
> *函数类型参数* → [*特性列表*](06_Attributes.html#attributes)<sub>可选</sub> **输入输出参数**<sub>可选</sub> [*类型*](#type) | [*参数标签*](#argument-label) [*类型注解*](#type-annotation)
<a name="argument-label"></a>
> *参数标签* → [*标识符*](02_Lexical_Structure.html#identifier) 

<a name="array_type"></a>
## 数组类型

Swift 语言为标准库中定义的 `Array<Element>` 类型提供了如下语法糖：

> [`类型`]

换句话说，下面两个声明是等价的：

```swift
let someArray: Array<String> = ["Alex", "Brian", "Dave"]
let someArray: [String] = ["Alex", "Brian", "Dave"]
```

上面两种情况下，常量 `someArray` 都被声明为字符串数组。数组的元素也可以通过下标访问：`someArray[0]` 是指第 0 个元素 `"Alex"`。

你也可以嵌套多对方括号来创建多维数组，最里面的方括号中指明数组元素的基本类型。比如，下面例子中使用三对方括号创建三维整数数组：

```swift
var array3D: [[[Int]]] = [[[1, 2], [3, 4]], [[5, 6], [7, 8]]]
```

访问一个多维数组的元素时，最左边的下标指向最外层数组的相应位置元素。接下来往右的下标指向第一层嵌入的相应位置元素，依次类推。这就意味着，在上面的例子中，`array3D[0]` 是 `[[1, 2], [3, 4]]`，`array3D[0][1]` 是 `[3, 4]`，`array3D[0][1][1]` 则是 `4`。

关于 Swift 标准库中 `Array` 类型的详细讨论，请参阅 [数组](../chapter2/04_Collection_Types.html#arrays)。

> 数组类型语法  
<a name="array-type"></a>
> *数组类型* → **[** [*类型*](#type) **]**

<a name="dictionary_type"></a>
## 字典类型

Swift 语言为标准库中定义的 `Dictionary<Key, Value>` 类型提供了如下语法糖：

> [`键类型` : `值类型`]

换句话说，下面两个声明是等价的：

```swift
let someDictionary: [String: Int] = ["Alex": 31, "Paul": 39]
let someDictionary: Dictionary<String, Int> = ["Alex": 31, "Paul": 39]
```

上面两种情况，常量 `someDictionary` 被声明为一个字典，其中键为 `String` 类型，值为 `Int` 类型。

字典中的值可以通过下标来访问，这个下标在方括号中指明了具体的键：`someDictionary["Alex"]` 返回键 `Alex` 对应的值。如果键在字典中不存在的话，则这个下标返回 `nil`。

字典中键的类型必须符合 Swift 标准库中的 `Hashable` 协议。

关于 Swift 标准库中 `Dictionary` 类型的详细讨论，请参阅 [字典](../chapter2/04_Collection_Types.html#dictionaries)。

> 字典类型语法  
<a name="dictionary-type"></a>
> *字典类型* → **[** [*类型*](#type) **:** [*类型*](#type) **]** 

<a name="optional_type"></a>
## 可选类型

Swift 定义后缀 `?` 来作为标准库中的定义的命名型类型 `Optional<Wrapped>` 的语法糖。换句话说，下面两个声明是等价的：

```swift
var optionalInteger: Int?
var optionalInteger: Optional<Int>
```

在上述两种情况下，变量 `optionalInteger` 都被声明为可选整型类型。注意在类型和 `?` 之间没有空格。

类型 `Optional<Wrapped>` 是一个枚举，有两个成员，`none` 和 `some(Wrapped)`，用来表示可能有也可能没有的值。任意类型都可以被显式地声明（或隐式地转换）为可选类型。如果你在声明或定义可选变量或属性的时候没有提供初始值，它的值则会自动赋为默认值 `nil`。

如果一个可选类型的实例包含一个值，那么你就可以使用后缀运算符 `!` 来获取该值，正如下面描述的：

```swift
optionalInteger = 42
optionalInteger! // 42
```

使用 `!` 运算符解包值为 `nil` 的可选值会导致运行错误。

你也可以使用可选链式调用和可选绑定来选择性地在可选表达式上执行操作。如果值为 `nil`，不会执行任何操作，因此也就没有运行错误产生。

更多细节以及更多如何使用可选类型的例子，请参阅 [可选类型](../chapter2/01_The_Basics.html#optionals)。

> 可选类型语法  
<a name="optional-type"></a>
> *可选类型* → [*类型*](#type) **?**  

<a name="implicitly_unwrapped_optional_type"></a>
## 隐式解析可选类型

当可以被访问时，Swift 语言定义后缀 `!` 作为标准库中命名类型 `Optional<Wrapped>` 的语法糖，来实现自动解包的功能。换句话说，下面两个声明等价：

```swift
var implicitlyUnwrappedString: String!
var explicitlyUnwrappedString: Optional<String>
```

注意类型与 `!` 之间没有空格。

由于隐式解包修改了包涵其类型的声明语义，嵌套在元组类型或泛型的可选类型（比如字典元素类型或数组元素类型），不能被标记为隐式解包。例如：

```swift
let tupleOfImplicitlyUnwrappedElements: (Int!, Int!)  // 错误
let implicitlyUnwrappedTuple: (Int, Int)!             // 正确
 
let arrayOfImplicitlyUnwrappedElements: [Int!]        // 错误
let implicitlyUnwrappedArray: [Int]!                  // 正确
```

由于隐式解析可选类型和可选类型有同样的表达式`Optional<Wrapped>`，你可以在使用可选类型的地方使用隐式解析可选类型。比如，你可以将隐式解析可选类型的值赋给变量、常量和可选属性，反之亦然。

正如可选类型一样，你在声明隐式解析可选类型的变量或属性的时候也不用指定初始值，因为它有默认值 `nil`。

可以使用可选链式调用来在隐式解析可选表达式上选择性地执行操作。如果值为 `nil`，就不会执行任何操作，因此也不会产生运行错误。

关于隐式解析可选类型的更多细节，请参阅 [隐式解析可选类型](../chapter2/01_The_Basics.html#implicityly_unwrapped_optionals)。

> 隐式解析可选类型语法  
<a name="implicitly-unwrapped-optional-type"></a>
> *隐式解析可选类型* → [*类型*](#type) **!**  

<a name="protocol_composition_type"></a>
## 协议合成类型

协议合成类型是一种符合协议列表中每个指定协议的类型。协议合成类型可能会用在类型注解和泛型参数中。

协议合成类型的形式如下：

> `Protocol 1` & `Procotol 2`

协议合成类型允许你指定一个值，其类型符合多个协议的要求且不需要定义一个新的命名型协议来继承它想要符合的各个协议。比如，协议合成类型 `Protocol A & Protocol B & Protocol C` 等效于一个从 `Protocol A`，`Protocol B`， `Protocol C` 继承而来的新协议 `Protocol D`，很显然这样做有效率的多，甚至不需引入一个新名字。

协议合成列表中的每项必须是协议名或协议合成类型的类型别名。

> 协议合成类型语法  
<a name="protocol-composition-type"></a>
> *协议合成类型* → [*协议标识符*](#protocol-identifier) & [*协议合成延续*](#protocol-composition-continuation)
<a name="protocol-composition-continuation"></a>
> *协议合成延续* → [*协议标识符*](#protocol-identifier) | [*协议合成类型*](#protocol-composition-type)
<a name="protocol-identifier"></a>
> *协议标识符* → [*类型标识符*](#type-identifier) 

<a name="metatype_type"></a>
## 元类型

元类型是指类型的类型，包括类类型、结构体类型、枚举类型和协议类型。

类、结构体或枚举类型的元类型是相应的类型名紧跟 `.Type`。协议类型的元类型——并不是运行时符合该协议的具体类型——而是该协议名字紧跟 `.Protocol`。比如，类 `SomeClass` 的元类型就是 `SomeClass.Type`，协议 `SomeProtocol` 的元类型就是 `SomeProtocal.Protocol`。

你可以使用后缀 `self` 表达式来获取类型。比如，`SomeClass.self` 返回 `SomeClass` 本身，而不是 `SomeClass` 的一个实例。同样，`SomeProtocol.self` 返回 `SomeProtocol` 本身，而不是运行时符合 `SomeProtocol` 的某个类型的实例。还可以对类型的实例使用 `type(of:)` 表达式来获取该实例在运行阶段的类型，如下所示：

```swift
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
// someInstance 在编译期是 SomeBaseClass 类型，
// 但是在运行期则是 SomeSubClass 类型
type(of: someInstance).printClassName()
// 打印 “SomeSubClass”
```

可以使用恒等运算符（`===` 和 `!==`）来测试一个实例的运行时类型和它的编译时类型是否一致。

```swift
if type(of: someInstance) === someInstance.self {
    print("The dynamic and static type of someInstance are the same")
} else {
    print("The dynamic and static type of someInstance are different")
}
// 打印 "The dynamic and static type of someInstance are different"
```

可以使用初始化表达式从某个类型的元类型构造出一个该类型的实例。对于类实例，被调用的构造器必须使用 `required` 关键字标记，或者整个类使用 `final` 关键字标记。

```swift
class AnotherSubClass: SomeBaseClass {
    let string: String
    required init(string: String) {
        self.string = string
    }
    override class func printClassName() {
        print("AnotherSubClass")
    }
}
let metatype: AnotherSubClass.Type = AnotherSubClass.self
let anotherInstance = metatype.init(string: "some string")
```

> 元类型语法  
<a name="metatype-type"></a>
> *元类型* → [*类型*](#type) **.** **Type** | [*类型*](#type) **.** **Protocol** 

<a name="type_inheritance_clause"></a>
## 类型继承子句

类型继承子句被用来指定一个命名型类型继承自哪个类、采纳哪些协议。类型继承子句也用来指定一个类类型专属协议。类型继承子句开始于冒号 `:`，其后是所需要的类、类型标识符列表或两者都有。

类可以继承单个超类，采纳任意数量的协议。当定义一个类时，超类的名字必须出现在类型标识符列表首位，然后跟上该类需要采纳的任意数量的协议。如果一个类不是从其它类继承而来，那么列表可以以协议开头。关于类继承更多的讨论和例子，请参阅 [继承](../chapter2/13_Inheritance.html)。

其它命名型类型可能只继承或采纳一系列协议。协议类型可以继承自任意数量的其他协议。当一个协议类型继承自其它协议时，其它协议中定义的要求会被整合在一起，然后从当前协议继承的任意类型必须符合所有这些条件。正如在 [协议声明](05_Declarations.html#protocol_declaration) 中所讨论的那样，可以把 `class` 关键字放到协议类型的类型继承子句的首位，这样就可以声明一个类类型专属协议。

枚举定义中的类型继承子句可以是一系列协议，或是枚举的原始值类型的命名型类型。在枚举定义中使用类型继承子句来指定原始值类型的例子，请参阅 [原始值](../chapter2/08_Enumerations.html#raw_values)。

> 类型继承子句语法  
<a name="type_inheritance_clause"></a>
> *类型继承子句* → **:** [*类要求*](#class-requirement) **,** [*类型继承列表*](#type-inheritance-list)  
> *类型继承子句* → **:** [*类要求*](#class-requirement)  
> *类型继承子句* → **:** [*类型继承列表*](#type-inheritance-list)  
<a name="type-inheritance-list"></a>
> *类型继承列表* → [*类型标识符*](#type-identifier) | [*类型标识符*](#type-identifier) **,** [*类型继承列表*](#type-inheritance-list)  
<a name="class-requirement"></a>
> *类要求* → **class**

<a name="type_inference"></a>
## 类型推断

Swift 广泛使用类型推断，从而允许你省略代码中很多变量和表达式的类型或部分类型。比如，对于 `var x: Int = 0`，你可以完全省略类型而简写成 `var x = 0`，编译器会正确推断出 `x` 的类型 `Int`。类似的，当完整的类型可以从上下文推断出来时，你也可以省略类型的一部分。比如，如果你写了 `let dict: Dictionary = ["A" : 1]`，编译器能推断出 `dict` 的类型是 `Dictionary<String, Int>`。

在上面的两个例子中，类型信息从表达式树的叶子节点传向根节点。也就是说，`var x: Int = 0` 中 `x` 的类型首先根据 `0` 的类型进行推断，然后将该类型信息传递到根节点（变量 `x`）。

在 Swift 中，类型信息也可以反方向流动——从根节点传向叶子节点。在下面的例子中，常量 `eFloat` 上的显式类型注解（`: Float`）将导致数字字面量 `2.71828` 的类型是 `Float` 而非 `Double`。

```swift
let e = 2.71828 // e 的类型会被推断为 Double
let eFloat: Float = 2.71828 // eFloat 的类型为 Float
```

Swift 中的类型推断在单独的表达式或语句上进行。这意味着所有用于类型推断的信息必须可以从表达式或其某个子表达式的类型检查中获取到。


