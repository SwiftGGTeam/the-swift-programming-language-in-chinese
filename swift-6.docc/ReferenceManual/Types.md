# 类型

使用内置的命名类型和复合类型。

在 Swift 中，有两种类型:命名类型和复合类型。
*命名类型*是在定义时可以赋予特定名称的类型。
命名类型包括类、结构体、枚举和协议。
例如，用户定义的名为 `MyClass` 的类的实例的类型为 `MyClass`。
除了用户自定义的命名类型，Swift 标准库还定义了许多常用的命名类型，包括表示数组、字典和可选值的类型。

在很多编程语言中通常被认为是基本或原始的数据类型——例如表示数字、字符和字符串的类型——实际上是使用结构体在 Swift 标准库中定义和实现的命名类型。
因为这些基本数据类型是命名类型，所以您可以使用扩展声明(在<doc:Extensions>和<doc:Declarations#扩展声明>中讨论)来扩展它们的行为，以满足您程序的需求。

复合类型指的是在 Swift 语言本身中定义的没有名称的类型。有两种复合类型:函数类型和元组类型。
复合类型可能包含命名类型和其他复合类型。
例如，元组类型 `(Int, (Int, Int))` 包含两个元素:第一个是命名类型 `Int`，第二个是另一个复合类型 `(Int, Int)`。

您可以在命名类型或复合类型周围加上括号。
但是，在类型周围添加括号不会产生任何影响。
例如，`(Int)` 等同于 `Int`。

本章讨论了 Swift 语言本身定义的类型，并描述了 Swift 的类型推断行为。

> 类型的语法:
>
> *type* → *function-type* \
> *type* → *array-type* \
> *type* → *dictionary-type* \
> *type* → *type-identifier* \
> *type* → *tuple-type* \
> *type* → *optional-type* \
> *type* → *implicitly-unwrapped-optional-type* \
> *type* → *protocol-composition-type* \
> *type* → *opaque-type* \
> *type* → *boxed-protocol-type* \
> *type* → *metatype-type* \
> *type* → *any-type* \
> *type* → *self-type* \
> *type* → **`(`** *type* **`)`**

## 类型注解

*类型注解*显式指定变量或表达式的类型。
类型注解以冒号 (`:`) 开头，以类型结尾，如下例所示:

```swift 
let someTuple: (Double, Double) = (3.14159, 2.71828)
func someFunction(a: Int) { /* ... */ }
```

在第一个示例中，表达式 `someTuple` 被指定为元组类型 `(Double, Double)`。
在第二个示例中，函数 `someFunction` 的参数 `a` 被指定为类型 `Int`。

类型注解可以在类型之前包含一个可选的类型属性列表。

> 类型注解的语法:
>
> *type-annotation* → **`:`** *attributes*_?_ *type*

## 类型标识符

*类型标识符*指的是命名类型，或命名类型、复合类型的类型别名。

大多数情况下，类型标识符直接指的是与标识符同名的命名类型。
例如，`Int` 是一个类型标识符，直接指的是命名类型 `Int`，类型标识符 `Dictionary<String, Int>` 直接指的是命名类型 `Dictionary<String, Int>`。

有两种情况，类型标识符不是指与其同名的类型。
第一种情况，类型标识符指的是命名类型或复合类型的类型别名。
例如，在下面的示例中，类型注解中使用的 `Point` 指的是元组类型 `(Int, Int)`。

```swift
typealias Point = (Int, Int)
let origin: Point = (0, 0)
```

第二种情况，类型标识符使用点(.)语法来引用声明在其他模块中或嵌套在其他类型中的命名类型。例如，以下代码中的类型标识符引用了在 ExampleModule 模块中声明的命名类型 MyType。

```swift
var someValue: ExampleModule.MyType
```

元组类型是一个用逗号分隔的类型列表，用括号括起来。你可以将元组类型用作函数的返回类型，以使函数能够返回包含多个值的单个元组。你还可以命名元组类型的元素，并使用这些名称来引用各个元素的值。元素名称由一个标识符后跟一个冒号(:)组成。有关演示这两个特性的示例，请参阅<doc:Functions#多重返回值函数>。当元组类型的元素有名称时，该名称是类型的一部分。

```swift
var someTuple = (top: 10, bottom: 12)  // someTuple 的类型为 (top: Int, bottom: Int)
someTuple = (top: 4, bottom: 42) // OK: 名称匹配
someTuple = (9, 99)              // OK: 名称被推断
someTuple = (left: 5, right: 5)  // 错误: 名称不匹配
```

除了 Void 是空元组类型 () 的类型别名外，所有元组类型都包含两个或更多类型。

## 函数类型

函数类型表示函数、方法或闭包的类型，由一个参数类型和返回类型组成，用箭头(->)分隔:

```swift
(<#参数类型#>) -> <#返回类型#>
```

参数类型是一个用逗号分隔的类型列表。由于返回类型可以是元组类型，函数类型支持返回多个值的函数和方法。

函数类型 () -> T (其中 T 是任何类型)的参数可以应用 autoclosure 属性，在调用时隐式创建闭包。这提供了一种语法上方便的方式，在调用函数时延迟表达式的计算，而无需编写显式闭包。有关 autoclosure 函数类型参数的示例，请参阅<doc:Closures#自动闭包>。

函数类型可以在其参数类型中有可变参数。在语法上，可变参数由一个基本类型名后跟三个点(...)组成，如 Int...。可变参数被视为包含基本类型名元素的数组。例如，可变参数 Int... 被视为 [Int]。有关使用可变参数的示例，请参阅<doc:Functions#可变参数>。

要指定一个输入输出参数，需要在参数类型前加上 `inout` 关键字。你不能在可变参数或返回类型上使用 `inout` 关键字。输入输出参数在 <doc:Functions#输入输出参数> 中有讨论。

如果函数类型只有一个参数，且参数类型为元组，则在写该函数类型时必须给元组加括号。例如，`((Int, Int)) -> Void` 是一个接受单个参数的函数类型，该参数的类型为 `(Int, Int)`，并且不返回任何值。相反，如果不加括号，`(Int, Int) -> Void` 是一个接受两个 `Int` 参数并且不返回任何值的函数类型。同样，因为 `Void` 是 `()` 的类型别名，所以函数类型 `(Void) -> Void` 与 `(()) -> ()` 相同 --- 一个接受单个参数为空元组的函数。这些类型与 `() -> ()` 不同 --- 一个不接受任何参数的函数。

函数和方法中的参数名不是相应函数类型的一部分。例如:

```swift
func someFunction(left: Int, right: Int) {}
func anotherFunction(left: Int, right: Int) {}
func functionWithDifferentLabels(top: Int, bottom: Int) {}

var f = someFunction // f 的类型是 (Int, Int) -> Void，而不是 (left: Int, right: Int) -> Void。
f = anotherFunction // OK  
f = functionWithDifferentLabels // OK

func functionWithDifferentArgumentTypes(left: Int, right: String) {}
f = functionWithDifferentArgumentTypes // 错误

func functionWithDifferentNumberOfArguments(left: Int, right: Int, top: Int) {}
f = functionWithDifferentNumberOfArguments // 错误
```

因为参数标签不是函数类型的一部分，所以在写函数类型时要省略它们。

```swift
var operation: (lhs: Int, rhs: Int) -> Int // 错误
var operation: (_ lhs: Int, _ rhs: Int) -> Int // OK
var operation: (Int, Int) -> Int // OK
```

如果一个函数类型包含多个箭头(`->`)时，表示该函数类型实际上是一个高阶函数，它接受一些参数并返回另一个函数。在这种情况下，函数类型是从右向左进行分组的。例如，函数类型`(Int) -> (Int) -> Int`被理解为`(Int) -> ((Int) -> Int)` --- 即一个接受`Int`参数并返回另一个接受`Int`参数并返回`Int`结果的函数。

可能抛出或重新抛出错误的函数类型必须包含`throws`关键字。你可以在`throws`后面加上括号中的类型来指定函数抛出的错误类型。抛出的错误类型必须符合`Error`协议。写`throws`而不指定类型等同于写`throws(any Error)`。省略`throws`等同于写`throws(Never)`。函数抛出的错误类型可以是任何符合`Error`协议的类型，包括泛型类型、装箱协议类型和不透明类型。

函数抛出的错误类型是该函数类型的一部分，错误类型之间的子类型关系意味着相应的函数类型也是子类型关系。例如，如果你声明了一个自定义的`MyError`类型，一些函数类型之间的关系如下，从超类型到子类型:

1. 抛出任何错误的函数，标记为`throws(any Error)` 
2. 抛出特定错误的函数，标记为`throws(MyError)`
3. 不抛出错误的函数，标记为`throws(Never)`

由于这些子类型关系:

- 你可以在需要抛出函数的地方使用不抛出函数。
- 你可以在需要抛出函数的地方使用抛出具体错误类型的函数。
- 你可以在需要抛出更一般错误类型的函数的地方使用抛出更特定错误类型的函数。

如果使用关联类型或泛型类型参数指定抛出的错误类型，那么该关联类型或泛型类型参数隐式地需要符合`Error`协议。

异步函数的函数类型必须用`async`关键字标记。`async`关键字是函数类型的一部分，同步函数是异步函数的子类型。因此，你可以在需要异步函数的地方使用同步函数。

非逃逸函数类型的参数不能存储在`Any`类型的属性、变量或常量中，因为这可能会导致值逃逸。值逃逸指的是将一个本应在特定作用域内使用的闭包逃逸到了该作用域之外，从而可能导致意外行为或内存泄漏。因此，Swift 对非逃逸闭包做了这个限制。

一个非逃逸函数不能作为另一个非逃逸函数的参数传入。这个限制有助于 Swift 在编译时而不是运行时执行更多对内存访问冲突的检查。例如:

```swift
let external: (() -> Void) -> Void = { _ in () } 
func takesTwoFunctions(first: (() -> Void) -> Void, second: (() -> Void) -> Void) {
    first { first {} }       // 错误
    second { second {}  }    // 错误

    first { second {} }      // 错误 
    second { first {} }      // 错误

    first { external {} }    // 正确
    external { first {} }    // 正确
}
```

在上述代码中，`takesTwoFunctions(first:second:)` 的两个参数都是函数。由于它们都没有标记为 `@escaping`，因此它们都是非逃逸的。

上述代码中标记为"错误"的四个函数调用会导致编译器错误。因为 `first` 和 `second` 参数是非逃逸函数，所以它们不能被传递给另一个非逃逸函数参数。另一方面，标记为"正确"的两个函数调用不会导致编译器错误。这些函数调用没有违反限制，因为 `external` 不是 `takesTwoFunctions(first:second:)` 的参数之一。

如果你需要避免这个限制，可以将其中一个参数标记为逃逸的，或者使用 `withoutActuallyEscaping(_:do:)` 函数临时将其中一个非逃逸函数参数转换为逃逸函数。有关避免内存访问冲突的信息，请参阅 <doc:MemorySafety>。

> 函数类型的语法:
>
> *function-type* → *attributes*_?_ *function-type-argument-clause* **`async`**_?_ *throws-clause*_?_ **`->`** *type*
>
> *function-type-argument-clause* → **`(`** **`)`** \
> *function-type-argument-clause* → **`(`** *function-type-argument-list* **`...`**_?_ **`)`**
>
> *function-type-argument-list* → *function-type-argument* | *function-type-argument* **`,`** *function-type-argument-list* \
> *function-type-argument* → *attributes*_?_ *parameter-modifier*_?_ *type* | *argument-label* *type-annotation* \
> *argument-label* → *identifier*
>
> *throws-clause* → **`throws`** | **`throws`** **`(`** *type* **`)`**

func polymorphicF<T>(a: Int) -> T { return a } 是一个泛型函数，可以返回任何类型的值。而 monomorphicF(a: Int) -> Int { return a } 是一个单态函数，只能返回 Int 类型的值。

var myMonomorphicF = monomorphicF 这种赋值是允许的。

但是，以下赋值是不允许的:

var myPolymorphicF = polymorphicF -->

## 数组类型

Swift 语言为 Swift 标准库 `Array<Element>` 类型提供了以下语法糖:

```swift
[<#类型#>]
```

换句话说，以下两个声明是等价的:

```swift 
let someArray: Array<String> = ["Alex", "Brian", "Dave"]
let someArray: [String] = ["Alex", "Brian", "Dave"]
```

在这两种情况下，常量 `someArray` 都被声明为一个字符串数组。可以通过使用方括号指定有效的索引值来访问数组的元素:
`someArray[0]` 指的是索引为 0 的元素 `"Alex"`。

你可以通过嵌套方括号对来创建多维数组，其中基本元素类型的名称包含在最内层的方括号对中。
例如，你可以使用三组方括号创建一个三维整数数组:

```swift
var array3D: [[[Int]]] = [[[1, 2], [3, 4]], [[5, 6], [7, 8]]]
```

当访问多维数组的元素时，最左边的下标索引指的是最外层数组中该索引处的元素。下一个向右的下标索引指的是嵌套一层的数组中该索引处的元素。以此类推。这意味着在上面的示例中，`array3D[0]` 指的是 `[[1, 2], [3, 4]]`、`array3D[0][1]` 指的是 `[3, 4]`、`array3D[0][1][1]` 指的是值 4。

有关 Swift 标准库 `Array` 类型的详细讨论，请参阅 <doc:CollectionTypes#数组>。

> 数组类型的语法:
>
> *array-type* → **`[`** *type* **`]`**

## 字典类型

Swift 语言为 Swift 标准库 `Dictionary<Key, Value>` 类型提供了以下语法糖:

```swift
[<#键类型#>: <#值类型#>] 
```

换句话说，以下两个声明是等价的:

```swift
let someDictionary: [String: Int] = ["Alex": 31, "Paul": 39]
let someDictionary: Dictionary<String, Int> = ["Alex": 31, "Paul": 39]
```

在这两种情况下，常量 `someDictionary` 都被声明为一个以字符串作为键、整数作为值的字典。

可以通过在方括号中指定相应的键来访问字典的值:`someDictionary["Alex"]` 指的是与键 `"Alex"` 关联的值。
下标返回字典值类型的可选值。
如果指定的键不在字典中，下标将返回 `nil`。

字典的键类型必须符合 Swift 标准库 `Hashable` 协议。

有关 Swift 标准库 `Dictionary` 类型的详细讨论，请参阅 <doc:CollectionTypes#字典>。

> 字典类型的语法:
>
> *dictionary-type* → **`[`** *type* **`:`** *type* **`]`**

## 可选类型

Swift 语言将后缀 `?` 定义为命名类型 `Optional<Wrapped>` 的语法糖，该类型定义在 Swift 标准库中。换句话说，以下两个声明是等价的:

```swift
var optionalInteger: Int?
var optionalInteger: Optional<Int>
```

在这两种情况下，变量 `optionalInteger` 都被声明为可选整数类型。注意，类型和 `?` 之间不能有空格。

`Optional<Wrapped>` 类型是一个枚举，有两种情况 `none` 和 `some(Wrapped)`，用于表示值可能存在或不存在。任何类型都可以显式声明为(或隐式转换为)可选类型。如果在声明可选变量或属性时没有提供初始值，它的值会自动默认为 `nil`。

如果一个可选类型的实例包含值，你可以使用后缀操作符 `!` 访问该值，如下所示:

```swift
optionalInteger = 42
optionalInteger! // 42
```

使用 `!` 操作符解包值为 `nil` 的可选值会导致运行时错误。

你也可以使用可选链和可选绑定来有条件地对可选表达式执行操作。如果值为 `nil`，则不执行任何操作，因此也不会产生运行时错误。

有关更多信息和示例说明如何使用可选类型，请参阅 <doc:TheBasics#可选项>。

> 可选类型的语法:
>
> *optional-type* → *type* **`?`**

## 隐式解包可选类型

隐式解包是指在访问可选值时自动将其解包。Swift 语言将后缀 `!` 定义为命名类型 `Optional<Wrapped>` 的语法糖，该类型定义在 Swift 标准库中，附加行为是在访问时自动解包。如果尝试使用值为 `nil` 的隐式解包可选值，你会得到一个运行时错误。

除了隐式解包行为外，以下两个声明是等价的:

```swift
var implicitlyUnwrappedString: String!
var explicitlyUnwrappedString: Optional<String>
```

注意，类型和 `!` 之间不能有空格。嵌套在元组类型或泛型类型(如字典或数组的元素类型)中的可选类型不能标记为隐式解包，因为隐式解包会改变包含该类型声明的含义。例如:

```swift
let tupleOfImplicitlyUnwrappedElements: (Int!, Int!)  // 错误
let implicitlyUnwrappedTuple: (Int, Int)!             // 正确

let arrayOfImplicitlyUnwrappedElements: [Int!]        // 错误  
let implicitlyUnwrappedArray: [Int]!                  // 正确
```

由于隐式解包可选值与可选值具有相同的 `Optional<Wrapped>` 类型，因此在任何可以使用可选值的地方，也可以使用隐式解包可选值。例如，你可以将隐式解包可选值赋值给可选变量、常量和属性，反之亦然。

与可选值一样，如果在声明隐式解包可选变量或属性时没有提供初始值，它的值会自动默认为 `nil`。

使用可选链来有条件地对隐式解包可选表达式执行操作。如果值为 `nil`，则不执行任何操作，因此也不会产生运行时错误。

有关隐式解包可选类型的更多信息，请参阅 <doc:TheBasics#隐式解包可选>。

为参数编写不透明类型是使用泛型类型的一种语法糖，并且没有为泛型类型参数指定名称。这个隐式的泛型类型参数有一个约束，要求它遵循不透明类型中指定的协议。如果你编写了多个不透明类型，每一个都会创建自己的泛型类型参数。例如，下面的声明是等价的：

```swift
func someFunction(x: some MyProtocol, y: some MyProtocol) { }
func someFunction<T1: MyProtocol, T2: MyProtocol>(x: T1, y: T2) { }
```

在第二个声明中，因为泛型类型参数 T1 和 T2 有名称，你可以在代码的其他地方引用这些类型。相反，第一个声明中的泛型类型参数没有名称，也不能在其他代码中引用。你不能在可变参数的类型中使用不透明类型。你也不能使用不透明类型作为正在返回的函数类型的参数，或者作为参数类型是函数类型的参数。在这些位置，函数的调用者将不得不构造一个该未知类型的值。

```swift
protocol MyProtocol { }
func badFunction() -> (some MyProtocol) -> Void { }  // Error
func anotherBadFunction(callback: (some MyProtocol) -> Void) { }  // Error
```

> 隐式解包可选类型的语法:
>
> *implicitly-unwrapped-optional-type* → *type* **`!`**  

## 协议组合类型

一个*协议组合类型*定义了一种类型，该类型符合指定协议列表中的每个协议。它也可以定义一种从给定类继承并符合指定协议列表中每个协议的类型。

协议组合类型具有以下形式:

```swift
<#协议 1#> & <#协议 2#>
```

协议组合类型允许你指定一个值的类型符合多个协议的要求，而无需显式定义一个新的命名协议来继承你希望该类型符合的每个协议。你可以使用协议组合类型`ProtocolA & ProtocolB & ProtocolC`而不是声明一个新的协议继承自`ProtocolA`、`ProtocolB`和`ProtocolC`。同样，你可以使用`SuperClass & ProtocolA`而不是声明一个新的协议，该协议是`SuperClass`的子类并符合`ProtocolA`。

协议组合列表中的每一项都是以下之一，列表最多可以包含一个类:

- 类的名称
- 协议的名称
- 底层类型是协议组合类型、协议或类的类型别名

当协议组合类型包含类型别名时，同一协议可能会在定义中出现多次，重复项会被忽略。例如，下面代码中`PQR`的定义等同于`P & Q & R`。

```swift 
typealias PQ = P & Q
typealias PQR = PQ & Q & R
```

一个*不透明类型*定义了一种符合协议或协议组合的类型，而不指定底层具体类型。不透明类型出现在函数或下标的返回类型中，或属性的类型中。不透明类型不能作为元组类型或泛型类型的一部分出现，例如数组的元素类型或可选类型的包装类型。

不透明类型具有以下形式:

```swift
some <#约束#>
```

*约束*是类类型、协议类型、协议组合类型或`Any`。只有当值是符合列出的协议或协议组合的类型实例，或者从列出的类继承时，才能将该值用作不透明类型的实例。与不透明值交互的代码只能以*约束*定义的接口中的方式使用该值。

在编译时，不透明类型的值具有特定的具体类型，Swift 可以使用该底层类型进行优化。但是，不透明类型形成了一个边界，关于该底层类型的信息不能跨越该边界。

协议声明不能包含不透明类型。类不能将不透明类型用作非 final 方法的返回类型。使用不透明类型作为返回类型的函数必须返回共享单个底层类型的值。返回类型可以包括函数的泛型类型参数中的类型。例如，函数`someFunction<T>()`可以返回类型为`T`或`Dictionary<String, T>`的值。

一个*装箱协议类型*定义了一种符合协议或协议组合的类型，该类型在程序运行时可以变化。装箱协议类型具有以下形式:

```swift 
any <#约束#>
```

*约束*是协议类型、协议组合类型、协议类型的元类型或协议组合类型的元类型。

在运行时，一个装箱协议类型是指可以存储任何符合该协议约束的类型值的类型。装箱协议类型的实例可以包含满足协议约束的任何类型的值。这种行为与不透明类型的工作方式形成对比，在不透明类型中，编译时已知某个特定的符合类型。

在使用装箱协议类型时，需要通过一个额外的间接层级来访问值，这种间接访问的方式称为装箱。装箱通常需要单独的内存分配用于存储，并且访问时需要额外的间接层级，这在运行时会产生性能开销。  

对 `Any` 或 `AnyObject` 类型应用 `any` 没有任何效果，因为这些类型已经是装箱协议类型。

元类型指的是描述一个类型本身的类型，包括类类型、结构体类型、枚举类型和协议类型。

类、结构体或枚举类型的元类型是该类型的名称后跟 .Type。协议类型的元类型(而不是运行时符合该协议的具体类型)是该协议的名称后跟 .Protocol。例如，类型 SomeClass 的元类型是 SomeClass.Type，协议 SomeProtocol 的元类型是 SomeProtocol.Protocol。

你可以使用后缀 self 表达式以值的形式访问一个类型。例如，SomeClass.self 返回 SomeClass 本身，而不是 SomeClass 的实例。SomeProtocol.self 返回 SomeProtocol 本身，而不是运行时符合 SomeProtocol 的类型的实例。你可以使用 type(of:) 函数和一个类型的实例来访问该实例的动态运行时类型作为一个值，如下例所示:

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
// someInstance 的编译时类型是 SomeBaseClass,
// someInstance 的运行时类型是 SomeSubClass
type(of: someInstance).printClassName() // 打印 "SomeSubClass"
```

使用初始化表达式可以从该类型的元类型值构造该类型的实例。对于类实例，被调用的初始化方法必须使用 required 关键字标记，或者该类被标记为 final 类。

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

<!-- - test: `metatype-type`

  ```swifttest -> class AnotherSubClass: SomeBaseClass { let string: String required init(string: String) { self.string = string } override class func printClassName() { print("AnotherSubClass") } } -> let metatype: AnotherSubClass.Type = AnotherSubClass.self -> let anotherInstance = metatype.init(string: "some string") ``` -->

> 元类型语法:
>
> *metatype-type* → *type* **`.`** **`Type`** | *type* **`.`** **`Protocol`**  

## Any 类型

`Any` 类型可以包含来自所有其他类型的值。
`Any` 可以用作以下任何类型实例的具体类型:

- 类、结构或枚举
- 元类型，如 `Int.self`
- 具有任何类型组件的元组
- 闭包或函数类型

```swift
let mixed: [Any] = ["one", 2, true, (4, 5.3), { () -> Int in return 6 }]
```

<!-- - test: `any-type`

  ```swifttest -> let mixed: [Any] = ["one", 2, true, (4, 5.3), { () -> Int in return 6 }] ``` -->

当您使用 `Any` 作为实例的具体类型时，您需要在访问其属性或方法之前将实例转换为已知类型。
具有 `Any` 具体类型的实例保持其原始动态类型，并且可以使用类型转换运算符 --- `as`、`as?` 或 `as!` 转换为该类型。
例如，使用 `as?` 有条件地将异构数组中的第一个对象向下转换为 `String`，如下所示:

```swift
if let first = mixed.first as? String {
  print("第一项 '\(first)' 是字符串。")
}
// 打印 "第一项 'one' 是字符串。"
```

<!-- - test: `any-type`

  ```swifttest -> if let first = mixed.first as? String { print("第一项 '\(first)' 是字符串。") } <- 第一项 'one' 是字符串。
  ``` -->

有关转换的更多信息，请参阅 <doc:TypeCasting>。

`AnyObject` 协议类似于 `Any` 类型。
所有类型都隐式符合 `AnyObject`。
与由语言定义的 `Any` 不同， `AnyObject` 由 Swift 标准库定义。
有关更多信息，请参阅 <doc:Protocols#类专属协议> 和 [`AnyObject`](https://developer.apple.com/documentation/swift/anyobject)。

> Any 类型语法:
>
> *any-type* → **`Any`**

## Self 类型  

`Self` 类型不是特定类型，而是让您方便地引用当前类型而无需重复或知道该类型的名称。

在协议声明或协议成员声明中， `Self` 类型指的是最终符合该协议的类型。

在结构、类或枚举声明中， `Self` 类型指的是由声明引入的类型。
在类型成员的声明中， `Self` 类型指的是该类型。
在类声明的成员中， `Self` 只能出现在以下位置:

- 作为方法的返回类型
- 作为只读下标的返回类型
- 作为只读计算属性的类型
- 在方法体内

例如，下面的代码显示了一个实例方法 `f`，其返回类型是 `Self`。

<!-- - test: `self-in-class-cant-be-a-parameter-type`

  ```swifttest -> class C { func f(c: Self) { } } !$ error: covariant 'Self' or 'Self?' can only appear as the type of a property, subscript or method result; did you mean 'C'?
  !! class C { func f(c: Self) { } } !!                     ^~~~ !!                     C ``` -->

<!-- - test: `self-in-class-can-be-a-subscript-param`

  ```swifttest >> class C { subscript(s: Int) -> Self { return self } } >> let c = C() >> _ = c[12] ``` -->

<!-- - test: `self-in-class-can-be-a-computed-property-type`

  ```swifttest >> class C { var s: Self { return self } } >> let c = C() >> _ = c.s ``` -->

上面的例子最后一部分展示了，`Self` 指的是 `z` 值的运行时类型 `子类`，而不是变量本身的编译时类型 `超类`。

在嵌套类型声明中，`Self` 类型指的是最内层类型声明引入的类型。

`Self` 类型指的是与 Swift 标准库中的 `type(of:)` 函数相同的类型。写 `Self.someStaticMember` 来访问当前类型的成员与写 `type(of: self).someStaticMember` 是一样的。

> Self 类型的语法:
> 
> *self-type* → **`Self`**

## 类型继承子句

*类型继承子句* 用于指定命名类型继承自哪个类以及符合哪些协议。类型继承子句以冒号 (:) 开头，后跟一系列类型标识符。

类可以继承自单个超类并符合任意数量的协议。在定义类时，超类的名称必须出现在类型标识符列表的首位，后跟该类必须符合的任意数量的协议。如果该类不继承自其他类，则列表可以从协议开始。有关类继承的扩展讨论和几个示例，请参阅 <doc:Inheritance>。

其他命名类型只能继承自或符合一系列协议。协议类型可以继承自任意数量的其他协议。当一个协议类型继承自其他协议时，来自那些其他协议的要求会被聚合在一起，任何继承自当前协议的类型都必须符合所有这些要求。

对于为枚举案例分配原始值的枚举定义，类型继承子句可以是指定这些原始值类型的单个命名类型。有关使用类型继承子句指定其原始值类型的枚举定义示例，请参阅 <doc:Enumerations#原始值>。

> 类型继承子句的语法:
>
> *type-inheritance-clause* → **`:`** *type-inheritance-list* 
> *type-inheritance-list* → *attributes*_?_ *type-identifier* | *attributes*_?_ *type-identifier* **`,`** *type-inheritance-list*

## 类型推断

Swift 广泛使用 *类型推断*，允许你在代码中省略许多变量和表达式的类型或部分类型。

例如，你可以写 `var x = 0`，而不是 `var x: Int = 0`，完全省略类型 —— 编译器正确推断 `x` 命名的是 `Int` 类型的值。

同样，当完整类型可以从上下文推断出来时，你可以省略部分类型。例如，写下 `let dict: Dictionary = ["A": 1]`更简洁，编译器会推断 `dict` 的类型是 `Dictionary<String, Int>`。

在上面的两个示例中，类型信息从表达式树的叶子传递到根部。也就是说，`var x: Int = 0` 中 `x` 的类型是通过首先检查 `0` 的类型，然后将此类型信息传递至根 (变量 `x`) 来推断的。

在 Swift 中，类型信息也可以从根向下流向叶子节点。例如，在下面的例子中，常量 `eFloat` 使得数字字面量 (`: Float`) 导致数字字面量 `2.71828` 被推断为 `Float` 类型，而不是 `Double` 类型。

```swift
let e = 2.71828 // e 的类型被推断为 Double
let eFloat: Float = 2.71828 // eFloat 的类型为 Float
```

<!-- - test: `type-inference`

  ```swifttest 
  -> let e = 2.71828 // e 的类型被推断为 Double
  -> let eFloat: Float = 2.71828 // eFloat 的类型为 Float
  ``` -->

Swift 的类型推断是在单个表达式或语句层级进行的。这意味着推断一个省略的类型或表达式中部分类型所需的所有信息，必须可从类型检查该表达式或其子表达式中获得。

<!-- TODO: Email Doug for a list of rules or situations describing when type-inference is allowed and when types must be fully typed.
-->

<!--
This source file is part of the Swift.org open source project

Copyright (c) 2014 - 2022 Apple Inc. and the Swift project authors
Licensed under Apache License v2.0 with Runtime Library Exception

See https://swift.org/LICENSE.txt for license information
See https://swift.org/CONTRIBUTORS.txt for the list of Swift project authors -->
