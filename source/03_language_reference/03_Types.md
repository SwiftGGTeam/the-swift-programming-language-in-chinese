# 类型（Types）

Swift 语言存在两种类型：命名型类型和复合型类型。*命名型类型*是指定义时可以给定名字的类型。命名型类型包括类、结构体、枚举和协议。比如，一个用户定义类 `MyClass` 的实例拥有类型 `MyClass`。除了用户定义的命名型类型，Swift 标准库也定义了很多常用的命名型类型，包括那些表示数组、字典和可选值的类型。

那些通常被其它语言认为是基本或原始的数据型类型，比如表示数字、字符和字符串的类型，实际上就是命名型类型，这些类型在 Swift 标准库中是使用结构体来定义和实现的。因为它们是命名型类型，因此你可以按照 [扩展](../02_language_guide/20_Extensions.md) 和 [扩展声明](./06_Declarations.md#extension-declaration) 中讨论的那样，声明一个扩展来增加它们的行为以满足你程序的需求。

*复合型类型*是没有名字的类型，它由 Swift 本身定义。Swift 存在两种复合型类型：函数类型和元组类型。一个复合型类型可以包含命名型类型和其它复合型类型。例如，元组类型 `(Int, (Int, Int))` 包含两个元素：第一个是命名型类型 `Int`，第二个是另一个复合型类型 `(Int, Int)`。

你可以在命名型类型和复合型类型使用小括号。但是在类型旁加小括号没有任何作用。举个例子，`(Int)` 等同于 `Int`。

本节讨论 Swift 语言本身定义的类型，并描述 Swift 中的类型推断行为。

#### type {#type}

> 类型语法
> 
> *类型* → [函数类型](#function-type)
> 
> *类型* → [数组类型](#array-type)
> 
> *类型* → [字典类型](#dictionary-type)
> 
> *类型* → [类型标识](#type-identifier)
> 
> *类型* → [元组类型](#tuple-type)
> 
> *类型* → [可选类型](#optional-type)
> 
> *类型* → [隐式解析可选类型](#implicitly-unwrapped-optional-type)
> 
> *类型* → [协议合成类型](#protocol-composition-type)
> 
> *类型* →[不透明类型](#opaque-type)
> 
> *类型* → [元型类型](#metatype-type)
> 
> *类型* → [自身类型](#self-type)
> 
> *类型* → **Any**
> 
> *类型* → **（** [类型](#type) **）**

## 类型注解 {#type-annotation-h}
*类型注解*显式地指定一个变量或表达式的类型。类型注解从冒号 （`:`）开始， 以类型结尾，比如下面两个例子：

```swift
let someTuple: (Double, Double) = (3.14159, 2.71828)
func someFunction(a: Int) { /* ... */ }
```

在第一个例子中，表达式 `someTuple` 的类型被指定为 `(Double, Double)`。在第二个例子中，函数 `someFunction` 的形参 `a` 的类型被指定为 `Int`。

类型注解可以在类型之前包含一个类型特性的可选列表。

> 类型注解语法
> 

#### type-annotation {#type-annotation}
> *类型注解* → **:** [特性列表](./07_Attributes.md#attributes)<sub>可选</sub> **输入输出参数**<sub>可选</sub> [类型](#type)

## 类型标识符 {#type-identifier-h}
*类型标识符*可以引用命名型类型，还可引用命名型或复合型类型的别名。

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
> 

#### type-identifier {#type-identifier}
> *类型标识符* → [类型名称](#type-name) [泛型实参子句](./09-Generic-Parameters-and-Arguments.md#generic-argument-clause)<sub>可选</sub> | [类型名称](#type-name) [泛型实参子句](./09-Generic-Parameters-and-Arguments.md#generic-argument-clause)<sub>可选</sub> **.** [类型标识符](#type-identifier)

#### type-name {#type-name}
> *类型名称* → [标识符](./02_Lexical_Structure.md#identifier)

## 元组类型 {#tuple-type-h}
*元组类型*是使用括号括起来的零个或多个类型，类型间用逗号隔开。

你可以使用元组类型作为一个函数的返回类型，这样就可以使函数返回多个值。你也可以命名元组类型中的元素，然后用这些名字来引用每个元素的值。元素的名字由一个标识符紧跟一个冒号 `(:)` 组成。[函数和多返回值](../02_language_guide/06_Functions.md#functions-with-multiple-return-values) 章节里有一个展示上述特性的例子。

当一个元组类型的元素有名字的时候，这个名字就是类型的一部分。

```swift
var someTuple = (top: 10, bottom: 12)  // someTuple 的类型为 (top: Int, bottom: Int)
someTuple = (top: 4, bottom: 42) // 正确：命名类型匹配
someTuple = (9, 99)              // 正确：命名类型被自动推断
someTuple = (left: 5, right: 5)  // 错误：命名类型不匹配
```

所有的元组类型都包含两个及以上元素， 除了 `Void`。`Void` 是空元组类型 `()` 的别名。

> 元组类型语法
> 

#### tuple-type {#tuple-type}
> *元组类型* → **(** **)** | **(** [元组类型元素](#tuple-type-element) **,** [元组类型元素列表](#tuple-type-element-list) **)**
> 

#### tuple-type-element-list {#tuple-type-element-list}
> *元组类型元素列表* → [元组类型元素](#tuple-type-element) | [元组类型元素](#tuple-type-element) **,** [元组类型元素列表](#tuple-type-element-list)
> 

#### tuple-type-element {#tuple-type-element}
> *元组类型元素* → [元素名](#element-name) [类型注解](#type-annotation) | [类型](#type)
> 

#### element-name {#element-name}
> *元素名* → [标识符](./02_Lexical_Structure.md#identifier)
> 

## 函数类型 {#function-type-h}
*函数类型*表示一个函数、方法或闭包的类型，它由形参类型和返回值类型组成，中间用箭头（`->`）隔开：

> （`形参类型`）->（`返回值类型`）

*形参类型*是由逗号间隔的类型列表。由于*返回值类型*可以是元组类型，所以函数类型支持多返回值的函数与方法。

你可以对形参类型为 `() -> T`（其中 T 是任何类型）的函数使用 `autoclosure` 特性，这会在调用侧隐式创建一个闭包。这从语法结构上提供了一种便捷：延迟对表达式的求值，直到其值在函数体中被调用。以自动闭包做为形参的函数类型的例子详见 [自动闭包](../02_language_guide/07_Closures.md#autoclosures)。

函数类型可以拥有一个可变参数在*形参类型*中。从语法角度上讲，可变参数由一个基础类型名字紧随三个点（`...`）组成，如 `Int...`。可变参数被认为是一个包含了基础类型元素的数组。即 `Int...` 就是 `[Int]`。关于使用可变参数的例子，请参阅 [可变参数](../02_language_guide/06_Functions.md#variadic-parameters)。

为了指定一个 `in-out` 参数，可以在形参类型前加 `inout` 前缀。但是你不可以对可变参数或返回值类型使用 `inout`。关于这种形参的详细讲解请参阅 [输入输出参数](../02_language_guide/06_Functions.md#in-out-parameters)。

如果函数类型只有一个类型是元组类型的一个形参，那么元组类型在写函数类型的时候必须用圆括号括起来。比如说，`((Int, Int)) -> Void` 是接收一个元组 `(Int, Int)` 作为形参并且不返回任何值的函数类型。与此相对，不加括号的 `(Int, Int) -> Void` 是一个接收两个 `Int` 作为形参并且不返回任何值的函数类型。相似地，因为 `Void` 是空元组类型 `()` 的别名，函数类型 `(Void)-> Void` 与 `(()) -> ()` 是一样的 - 一个将空元组作为唯一实参的函数。但这些类型和 `() -> ()` 是不一样的 - 一个无实参的函数。

函数和方法中的实参名并不是函数类型的一部分。例如：

```swift
func someFunction(left: Int, right: Int) {}
func anotherFunction(left: Int, right: Int) {}
func functionWithDifferentLabels(top: Int, bottom: Int) {}

var f = someFunction // 函数 f 的类型为 (Int, Int) -> Void, 而不是 (left: Int, right: Int) -> Void.
 
f = anotherFunction              // 正确
f = functionWithDifferentLabels  // 正确

func functionWithDifferentArgumentTypes(left: Int, right: String) {}
f = functionWithDifferentArgumentTypes     // 错误

func functionWithDifferentNumberOfArguments(left: Int, right: Int, top: Int) {}
f = functionWithDifferentNumberOfArguments // 错误
```

由于实参标签不是函数类型的一部分，你可以在写函数类型的时候省略它们。

```swift
var operation: (lhs: Int, rhs: Int) -> Int      // 错误
var operation: (_ lhs: Int, _ rhs: Int) -> Int  // 正确
var operation: (Int, Int) -> Int                // 正确
```

如果一个函数类型包涵多个箭头（->），那么函数类型将从右向左进行组合。例如，函数类型 `(Int) -> (Int) -> Int` 可以理解为 `(Int) -> ((Int) -> Int)`，也就是说，该函数传入 `Int`，并返回另一个传入并返回 `Int` 的函数。

函数类型若要抛出或重抛错误就必须使用 `throws` 关键字来标记。`throws` 关键字是函数类型的一部分，非抛出函数是抛出函数的子类型。因此，在使用抛出函数的地方也可以使用不抛出函数。抛出和重抛函数的相关描述见章节 [抛出函数与方法](./06_Declarations.md#throwing-functions-and-methods) 和 [重抛函数与方法](./06-Declarations.md#rethrowing-functions-and-methods)。

### 对非逃逸闭包的限制 {#Restrictions for Nonescaping Closures}
当非逃逸闭包函数是形参时，不能存储在属性、变量或任何 `Any` 类型的常量中，因为这可能导致值的逃逸。  

当非逃逸闭包函数是形参时，不能作为实参传递到另一个非逃逸闭包函数中。这样的限制可以让 Swift 在编译时就完成更好的内存访问冲突检查，而不是在运行时。举个例子：

```swift
let external: (Any) -> Void = { _ in () }
func takesTwoFunctions(first: (Any) -> Void, second: (Any) -> Void) {
    first(first)    // 错误
    second(second)  // 错误
    
    first(second)   // 错误
    second(first)   // 错误
    
    first(external) // 正确
    external(first) // 正确
}
```

在上面代码里，`takesTwoFunctions(first:second:)` 的两个形参都是函数。它们都没有标记为 `@escaping`, 因此它们都是非逃逸的。

上述例子里的被标记为“错误”的四个函数调用会产生编译错误。因为形参 `first` 和 `second` 是非逃逸函数，它们不能够作为实参被传递到另一个非闭包函数。相对的, 标记“正确”的两个函数不会产生编译错误。这些函数调用不会违反限制，因为 `external` 不是 `takesTwoFunctions(first:second:)` 的形参之一。

如果你需要避免这个限制，标记其中一个形参为逃逸，或者使用 `withoutActuallyEscaping(_:do:)` 函数临时转换其中一个非逃逸函数形参为逃逸函数。关于避免内存访问冲突，可以参阅 [内存安全](../02_language_guide/25_Memory_Safety.md)。

> 函数类型语法
> 

#### function-type {#function-type}
> *函数类型* → [特性列表](./07_Attributes.md#attributes)<sub>可选</sub> [函数类型子句](#function-type-argument-clause) **throws**<sub>可选</sub> **->** [类型](#type)

#### function-type-argument-clause {#function-type-argument-clause}
> *函数类型子句* → **(**­  **)**­  
> *函数类型子句* → **(** [函数类型实参列表](#function-type-argument-list) *...*­ <sub>可选</sub> **)**  

#### function-type-argument-list {#function-type-argument-list}
> *函数类型实参列表* → [函数类型实参](function-type-argument) | [函数类型实参](function-type-argument)， [函数类型实参列表](#function-type-argument-list)

#### function-type-argument {#function-type-argument}

> *函数类型实参* → [特性列表](./07_Attributes.md#attributes)<sub>可选</sub> **输入输出参数**<sub>可选</sub> [类型](#type) | [实参标签](#argument-label) [类型注解](#type-annotation)

#### argument-label {#argument-label}
> *形参标签* → [标识符](./02_Lexical_Structure.md#identifier)

## 数组类型 {#array-type-h}
Swift 语言为标准库中定义的 `Array<Element>` 类型提供了如下语法糖：

> [`类型`]
> 

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

关于 Swift 标准库中 `Array` 类型的详细讨论，请参阅 [数组](../02_language_guide/04_Collection_Types.md#arrays)。

> 数组类型语法
> 

#### array-type {#array-type}
> *数组类型* → **[** [类型](#type) **]**
> 

## 字典类型 {#dictionary-type-h}
Swift 语言为标准库中定义的 `Dictionary<Key, Value>` 类型提供了如下语法糖：

> [`键类型` : `值类型`]
> 

换句话说，下面两个声明是等价的：

```swift
let someDictionary: [String: Int] = ["Alex": 31, "Paul": 39]
let someDictionary: Dictionary<String, Int> = ["Alex": 31, "Paul": 39]
```

上面两种情况，常量 `someDictionary` 被声明为一个字典，其中键为 `String` 类型，值为 `Int` 类型。

字典中的值可以通过下标来访问，这个下标在方括号中指明了具体的键：`someDictionary["Alex"]` 返回键 `Alex` 对应的值。通过下标访问会获取对应值的可选类型。如果键在字典中不存在的话，则这个下标返回 `nil`。

字典中键的类型必须符合 Swift 标准库中的 `Hashable` 协议。

关于 Swift 标准库中 `Dictionary` 类型的详细讨论，请参阅 [字典](../02_language_guide/04_Collection_Types.md#dictionaries)。

> 字典类型语法
> 

#### dictionary-type {#dictionary-type}
> *字典类型* → **[** [类型](#type) **:** [类型](#type) **]**
> 

## 可选类型 {#optional-type-h}
Swift 定义后缀 `?` 来作为标准库中定义的命名型类型 `Optional<Wrapped>` 的语法糖。换句话说，下面两个声明是等价的：

```swift
var optionalInteger: Int?
var optionalInteger: Optional<Int>
```

在上述两种情况下，变量 `optionalInteger` 都被声明为可选整型类型。注意在类型和 `?` 之间没有空格。

类型 `Optional<Wrapped>` 是一个枚举，有两个成员，`none` 和 `some(Wrapped)`，用来表示可能有也可能没有的值。任意类型都可以被显式地声明（或隐式地转换）为可选类型。如果你在声明可选变量或属性的时候没有提供初始值，它的值则会自动赋为默认值 `nil`。

如果一个可选类型的实例包含一个值，那么你就可以使用后缀运算符 `!` 来获取该值，正如下面描述的：

```swift
optionalInteger = 42
optionalInteger! // 42
```

使用 `!` 运算符解包值为 `nil` 的可选值会导致运行错误。

你也可以使用可选链式调用和可选绑定来选择性在可选表达式上执行操作。如果值为 `nil`，不会执行任何操作，因此也就没有运行错误产生。

更多细节以及更多如何使用可选类型的例子，请参阅 [可选类型](../02_language_guide/01_The_Basics.md#optionals)。

> 可选类型语法
> 

#### optional-type {#optional-type}
> *可选类型* → [类型](#type) **?**
> 

## 隐式解析可选类型 {#implicitly-unwrapped-optional-type-h}
当可以被访问时，Swift 语言定义后缀 `!` 作为标准库中命名类型 `Optional<Wrapped>` 的语法糖，来实现自动解包的功能。如果尝试对一个值为 `nil` 的可选类型进行隐式解包，将会产生运行时错误。因为隐式解包，下面两个声明等价：

```swift
var implicitlyUnwrappedString: String!
var explicitlyUnwrappedString: Optional<String>
```

注意类型与 `!` 之间没有空格。

由于隐式解包会更改包含该类型的声明语义，嵌套在元组类型或泛型中可选类型（比如字典元素类型或数组元素类型），不能被标记为隐式解包。例如：

```swift
let tupleOfImplicitlyUnwrappedElements: (Int!, Int!)  // 错误
let implicitlyUnwrappedTuple: (Int, Int)!             // 正确

let arrayOfImplicitlyUnwrappedElements: [Int!]        // 错误
let implicitlyUnwrappedArray: [Int]!                  // 正确
```

由于隐式解析可选类型和可选类型有同样的类型 `Optional<Wrapped>`，你可以在所有使用可选类型的地方使用隐式解析可选类型。比如，你可以将隐式解析可选类型的值赋给变量、常量和可选属性，反之亦然。

正如可选类型一样，如果你在声明隐式解析可选类型的变量或属性的时候没有指定初始值，它的值则会自动赋为默认值 `nil`。

可以使用可选链式调用对隐式解析可选表达式选择性地执行操作。如果值为 `nil`，就不会执行任何操作，因此也不会产生运行错误。

关于隐式解析可选类型的更多细节，请参阅 [隐式解析可选类型](../02_language_guide/01_The_Basics.md#implicityly-unwrapped-optionals)。

> 隐式解析可选类型语法
> 

#### implicitly-unwrapped-optional-type {#implicitly-unwrapped-optional-type}
> *隐式解析可选类型* → [类型](#type) **!**
> 

## 协议合成类型 {#protocol-composition-type-h}
*协议合成类型*定义了一种遵循协议列表中每个指定协议的类型，或者一个现有类型的子类并遵循协议列表中每个指定协议。协议合成类型只能用在类型注解、泛型形参子句和泛型 `where` 子句中指定类型。

协议合成类型的形式如下：

> `Protocol 1` & `Procotol 2`

协议合成类型允许你指定一个值，其类型遵循多个协议的要求而不需要定义一个新的命名型协议来继承它想要符合的各个协议。比如，协议合成类型 `Protocol A & Protocol B & Protocol C` 等效于一个从 `Protocol A`，`Protocol B`，`Protocol C` 继承而来的新协议。同样的，你可以使用 `SuperClass & ProtocolA` 来取代申明一个新的协议作为 `SuperClass` 的子类并遵循 `ProtocolA`。

协议合成列表中的每一项都必须是下面所列情况之一，列表中最多只能包含一个类：  

- 类名  
- 协议名  
- 一个类型别名，它的潜在类型是一个协议合成类型、一个协议或者一个类  

当协议合成类型包含类型别名时，同一个协议可能多次出现在定义中 — 重复被忽略。例如，下面代码中定义的 `PQR` 等同于 `P & Q & R`。  

```swift
typealias PQ = P & Q
typealias PQR = PQ & Q & R
```

> 协议合成类型语法
> 

#### protocol-composition-type {#protocol-composition-type}
> *协议合成类型* → [协议标识符](#protocol-identifier) & [协议合成延续](#protocol-composition-continuation)
> 

#### protocol-composition-continuation {#protocol-composition-continuation}
> *协议合成延续* → [协议标识符](#protocol-identifier) | [协议合成类型](#protocol-composition-type)

## 不透明类型 {#opaque-type-h}

*不透明类型*定义了遵循某个协议或者合成协议的类型，但不需要指明底层的具体类型。

不透明类型可以作为函数或下标的返回值，亦或是属性的类型使用。

不透明类型不能作为元组类型的一部分或范型类型使用，比如数组元素类型或者可选值的包装类型。

不透明类型的形式如下：

> some `constraint`

*constraint* 可以是类类型，协议类型，协议组合类型或者 `Any`。值只有当它遵循该协议或者组合协议，或者从该类继承的时候，才能作为这个不透明类型的实例使用。和不透明值交互的代码只能使用该值定义在 *constraint* 上的接口。

协议声明里不能包括不透明类型。类不能使用不透明类型作为非 final 方法的返回值。

使用不透明类型作为返回值的函数必须返回单一公用底层类型。返回的类型可以包含函数范型类型形参的一部分。举个例子，函数 `someFunction<T>()` 可以返回类型 `T` 或者 `Dictionary<String,T>` 的值。

> 不透明类型语法

#### opaque-type {#opaque-type}

> *不透明类型* → **some** [type](#type)

## 元类型 {#metatype-type-h}

*元类型*是指任意类型的类型，包括类类型、结构体类型、枚举类型和协议类型。

类、结构体或枚举类型的元类型是相应的类型名紧跟 `.Type`。协议类型的元类型——并不是运行时遵循该协议的具体类型——是该协议名字紧跟 `.Protocol`。比如，类 `SomeClass` 的元类型就是 `SomeClass.Type`，协议 `SomeProtocol` 的元类型就是 `SomeProtocal.Protocol`。

你可以使用后缀 `self` 表达式来获取类型。比如，`SomeClass.self` 返回 `SomeClass` 本身，而不是 `SomeClass` 的一个实例。同样，`SomeProtocol.self` 返回 `SomeProtocol` 本身，而不是运行时遵循 `SomeProtocol` 的某个类型的实例。还可以对类型的实例使用 `type(of:)` 表达式来获取该实例动态的、在运行阶段的类型，如下所示：

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
// 打印“SomeSubClass”
```

更多信息可以查看 Swift 标准库里的 [type(of:)](https://developer.apple.com/documentation/swift/2885064-type)。

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
> 

#### metatype-type {#metatype-type}
> *元类型* → [类型](#type) **.** **Type** | [类型](#type) **.** **Protocol**

## 自身类型 {#self-type-h}

`Self` 类型不是具体的类型，而是让你更方便的引用当前类型，不需要重复或者知道该类的名字。

在协议声明或者协议成员声明时，`Self` 类型引用的是最终遵循该协议的类型。

在结构体，类或者枚举值声明时，`Self` 类型引用的是声明的类型。在某个类型成员声明时，`Self` 类型引用的是该类型。在类成员声明时，`Self` 可以在方法的返回值和方法体中使用，但不能在其他上下文中使用。举个例子，下面的代码演示了返回值是 `Self` 的实例方法 `f` 。

```swift
class Superclass {
    func f() -> Self { return self }
}
let x = Superclass()
print(type(of: x.f()))
// 打印 "Superclass"

class Subclass: Superclass { }
let y = Subclass()
print(type(of: y.f()))
// 打印 "Subclass"

let z: Superclass = Subclass()
print(type(of: z.f()))
// 打印 "Subclass"
```

上面例子的最后一部分表明 `Self` 引用的是值 `z` 的运行时类型 `Subclass` ，而不是变量本身的编译时类型 `Superclass` 。

在嵌套类型声明时，`Self` 类型引用的是最内层声明的类型。

`Self` 类型引用的类型和 Swift 标准库中 [type(of:)](https://developer.apple.com/documentation/swift/2885064-type) 函数的结果一样。使用 `Self.someStaticMember` 访问当前类型中的成员和使用 `type(of: self).someStaticMember` 是一样的。

> 自身类型语法

#### self-type{#self-type}

> *自身类型* → **Self**

## 类型继承子句 {#type-inheritance-clause-h}

*类型继承子句*被用来指定一个命名型类型继承自哪个类、采纳哪些协议。类型继承子句开始于冒号 `:`，其后是类型标识符列表。

类可以继承自单个超类，并遵循任意数量的协议。当定义一个类时，超类的名字必须出现在类型标识符列表首位，然后跟上该类需要遵循的任意数量的协议。如果一个类不是从其它类继承而来，那么列表可以以协议开头。关于类继承更多的讨论和例子，请参阅 [继承](../02_language_guide/13_Inheritance.md)。

其它命名型类型只能继承自或采纳一系列协议。协议类型可以继承自任意数量的其他协议。当一个协议类型继承自其它协议时，其它协议中定义的要求会被整合在一起，然后从当前协议继承的任意类型必须符合所有这些条件。

枚举定义中的类型继承子句可以是一系列协议，或者是指定单一的命名类型，此时枚举为其用例分配原始值。在枚举定义中使用类型继承子句来指定原始值类型的例子，请参阅 [原始值](../02_language_guide/08_Enumerations.md#raw-values)。

> 类型继承子句语法
> 

#### type-inheritance-clause {#type-inheritance-clause}
> *类型继承子句* → **:** [类型继承列表](#type-inheritance-list)
> 

#### type-inheritance-list {#type-inheritance-list}
> *类型继承列表* → [类型标识符](#type-identifier) | [类型标识符](#type-identifier) **,** [类型继承列表](#type-inheritance-list)

## 类型推断

Swift 广泛使用*类型推断*，从而允许你省略代码中很多变量和表达式的类型或部分类型。比如，对于 `var x: Int = 0`，你可以完全省略类型而简写成 `var x = 0`，编译器会正确推断出 `x` 的类型 `Int`。类似的，当完整的类型可以从上下文推断出来时，你也可以省略类型的一部分。比如，如果你写了 `let dict: Dictionary = ["A" : 1]`，编译器能推断出 `dict` 的类型是 `Dictionary<String, Int>`。

在上面的两个例子中，类型信息从表达式树的叶子节点传向根节点。也就是说，`var x: Int = 0` 中 `x` 的类型首先根据 `0` 的类型进行推断，然后将该类型信息传递到根节点（变量 `x`）。

在 Swift 中，类型信息也可以反方向流动——从根节点传向叶子节点。在下面的例子中，常量 `eFloat` 上的显式类型注解（`: Float`）将导致数字字面量 `2.71828` 的类型是 `Float` 而非 `Double`。

```swift
let e = 2.71828 // e 的类型会被推断为 Double
let eFloat: Float = 2.71828 // eFloat 的类型为 Float
```

Swift 中的类型推断在单独的表达式或语句上进行。这意味着所有用于类型推断的信息必须可以从表达式或其某个子表达式的类型检查中获取到。
