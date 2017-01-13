<a name="declarations"></a>
# 声明（Declarations）
-----------------

> 1.0
> 翻译：[marsprince](https://github.com/marsprince) [Lenhoon](https://github.com/marsprince)[(微博)](http://www.weibo.com/lenhoon)
> 校对：[numbbbbb](https://github.com/numbbbbb), [stanzhai](https://github.com/stanzhai)

> 2.0
> 翻译+校对：[Lenhoon](https://github.com/Lenhoon),
> [BridgeQ](https://github.com/WXGBridgeQ)

> 2.1 
> 翻译：[mmoaay](https://github.com/mmoaay), [shanks](http://codebuild.me)
> 校对：[shanks](http://codebuild.me)

> 2.2
> 翻译：[星夜暮晨](https://github.com/SemperIdem)

> 3.0
> 翻译：[chenmingjia](https://github.com/chenmingjia)

本页包含内容：

- [顶级代码](#top-level_code)
- [代码块](#code_blocks)
- [导入声明](#import_declaration)
- [常量声明](#constant_declaration)
- [变量声明](#variable_declaration)
  - [存储型变量和存储型变量属性](#stored_variables_and_stored_variable_properties)
  - [计算型变量和计算型属性](#computed_variables_and_computed_properties)
  - [存储型变量和属性的观察器](#stored_variable_observers_and_property_observers)
  - [类型变量属性](#type_variable_properties)
- [类型别名声明](#type_alias_declaration)
- [函数声明](#function_declaration)
  - [参数名](#parameter_names)
  - [输入输出参数](#in-out_parameters)
  - [特殊参数](#special_kinds_of_parameters)
  - [特殊方法](#special_kinds_of_methods)
  - [抛出错误的函数和方法](#throwing_functions_and_methods)
  - [重抛错误的函数和方法](#rethrowing_functions_and_methods)
- [枚举声明](#enumeration_declaration)
  - [任意类型的枚举用例](#enumerations_with_cases_of_any_type)
  - [递归枚举](#enumerations_with_indirection)
  - [拥有原始值的枚举用例](#enumerations_with_cases_of_a_raw-value_type)
  - [访问枚举用例](#accessing_enumeration_cases)
- [结构体声明](#structure_declaration)
- [类声明](#class_declaration)
- [协议声明](#protocol_declaration)
  - [协议属性声明](#protocol_property_declaration)
  - [协议方法声明](#protocol_method_declaration)
  - [协议构造器声明](#protocol_initializer_declaration)
  - [协议下标声明](#protocol_subscript_declaration)
  - [协议关联类型声明](#protocol_associated_type_declaration)
- [构造器声明](#initializer_declaration)
  - [可失败构造器](#failable_initializers)
- [析构器声明](#deinitializer_declaration)
- [扩展声明](#extension_declaration)
- [下标声明](#subscript_declaration)
- [运算符声明](#operator_declaration)
- [声明修饰符](#declaration_modifiers)
  - [访问控制级别](#access_control_levels)

*声明 (declaration)* 用以向程序里引入新的名字或者结构。举例来说，可以使用声明来引入函数和方法，变量和常量，或者定义新的具有命名的枚举、结构、类和协议类型。还可以使用声明来扩展一个既有的具有命名的类型的行为，或者在程序里引入在其它地方声明的符号。

在 Swift 中，大多数声明在某种意义上讲也是定义，因为声明往往伴随着实现或初始化。由于协议并不提供实现，大多数协议成员仅仅只是声明而已。为了方便起见，也是因为这些区别在 Swift 中并不是很重要，“声明”这个术语同时包含了声明和定义两种含义。

> 声明语法  
> <a name="declaration"></a>
> *声明* → [*导入声明*](#import-declaration)  
> *声明* → [*常量声明*](#constant-declaration)  
> *声明* → [*变量声明*](#variable-declaration)  
> *声明* → [*类型别名声明*](#typealias-declaration)  
> *声明* → [*函数声明*](#function-declaration)  
> *声明* → [*枚举声明*](#enum-declaration)  
> *声明* → [*结构体声明*](#struct-declaration)  
> *声明* → [*类声明*](#class-declaration)  
> *声明* → [*协议声明*](#protocol-declaration)  
> *声明* → [*构造器声明*](#initializer-declaration)  
> *声明* → [*析构器声明*](#deinitializer-declaration)  
> *声明* → [*扩展声明*](#extension-declaration)  
> *声明* → [*下标声明*](#subscript-declaration)  
> *声明* → [*运算符声明*](#operator-declaration)  
> <a name="declarations"></a>
> *多条声明* → [*声明*](#declaration) [*多条声明*](#declarations)<sub>可选</sub>

<a name="top-level_code"></a>
## 顶级代码

Swift 的源文件中的顶级代码 (top-level code) 由零个或多个语句、声明和表达式组成。默认情况下，在一个源文件的顶层声明的变量，常量和其他具有命名的声明可以被同模块中的每一个源文件中的代码访问。可以使用一个访问级别修饰符来标记声明来覆盖这种默认行为，请参阅 [访问控制级别](#access_control_levels)。

> 顶级声明语法  
> *顶级声明* → [*多条语句*](10_Statements.md#statements)<sub>可选</sub>

<a name="code_blocks"></a>
## 代码块

*代码块 (code block)* 可以将一些声明和控制结构组织在一起。它有如下的形式：

```swift
{
	语句
}
```
代码块中的“语句”包括声明、表达式和各种其他类型的语句，它们按照在源码中的出现顺序被依次执行。

> 代码块语法  
> <a name="code-block"></a>
> *代码块* → **{** [*多条语句*](10_Statements.md#statements)<sub>可选</sub> **}**  

<a name="import_declaration"></a>
## 导入声明

*导入声明 (import declaration)* 让你可以使用在其他文件中声明的内容。导入语句的基本形式是导入整个模块，它由 `import` 关键字和紧随其后的模块名组成：

```swift
import 模块
```

可以对导入操作提供更细致的控制，如指定一个特殊的子模块或者指定一个模块或子模块中的某个声明。提供了这些限制后，在当前作用域中，只有被导入的符号是可用的，而不是整个模块中的所有声明。

```swift
import 导入类型 模块.符号名
import 模块.子模块
```

<a name="grammer_of_an_import_declaration"></a>
> 导入声明语法  
> <a name="import-declaration"></a>
> *导入声明* → [*特性列表*](06_Attributes.md#attributes)<sub>可选</sub> **import** [*导入类型*](#import-kind)<sub>可选</sub> [*导入路径*](#import-path)  
> <a name="import-kind"></a>
> *导入类型* → **typealias** | **struct** | **class** | **enum** | **protocol** | **var** | **func**  
> <a name="import-path"></a>
> *导入路径* → [*导入路径标识符*](#import-path-identifier) | [*导入路径标识符*](#import-path-identifier) **.** [*导入路径*](#import-path)  
> <a name="import-path-identifier"></a>
> *导入路径标识符* → [*标识符*](02_Lexical_Structure.md#identifier) | [*运算符*](02_Lexical_Structure.md#operator)  

<a name="constant_declaration"></a>
## 常量声明

*常量声明 (constant declaration)* 可以在程序中引入一个具有命名的常量。常量以关键字 `let` 来声明，遵循如下格式：

```swift
let 常量名称: 类型 = 表达式
```

常量声明在“常量名称”和用于初始化的“表达式”的值之间定义了一种不可变的绑定关系；当常量的值被设定之后，它就无法被更改。这意味着，如果常量以类对象来初始化，对象本身的内容是可以改变的，但是常量和该对象之间的绑定关系是不能改变的。

当一个常量被声明为全局常量时，它必须拥有一个初始值。在类或者结构中声明一个常量时，它将作为*常量属性 (constant property)*。常量声明不能是计算型属性，因此也没有存取方法。

如果常量名称是元组形式，元组中每一项的名称都会和初始化表达式中对应的值进行绑定。

```swift
let (firstNumber, secondNumber) = (10, 42)
```

在上例中，`firstNumber` 是一个值为 `10` 的常量，`secnodeName` 是一个值为 `42` 的常量。所有常量都可以独立地使用：

```swift
print("The first number is \(firstNumber).")
// 打印 “The first number is 10.”
print("The second number is \(secondNumber).")
// 打印 “The second number is 42.”
```

当常量名称的类型 (`:` 类型) 可以被推断出时，类型标注在常量声明中是可选的，正如 [类型推断](03_Types.md#type_inference) 中所描述的。

声明一个常量类型属性要使用 `static` 声明修饰符。类型属性在 [类型属性](../chapter2/10_Properties.md#type_properties)中有介绍。

如果还想获得更多关于常量的信息或者想在使用中获得帮助，请参阅 [常量和变量](../chapter2/01_The_Basics.md#constants_and_variables) 和 [存储属性](../chapter2/10_Properties.md#stored_properties)。

<a name="grammer_of_a_constant_declaration"></a>
> 常量声明语法  
> <a name="constant-declaration"></a>
> *常量声明* → [*特性列表*](06_Attributes.md#attributes)<sub>可选</sub> [*声明修饰符列表*](#declaration-modifiers)<sub>可选</sub> **let** [*模式构造器列表*](pattern-initializer-list)  
> <a name="pattern-initializer-list"></a>
> *模式构造器列表* → [*模式构造器*](#pattern-initializer) | [*模式构造器*](#pattern-initializer) **,** [*模式构造器列表*](#pattern-initializer-list)  
> <a name="pattern-initializer"></a>
> *模式构造器* → [*模式*](07_Patterns.md#pattern) [*构造器*](#initializer)<sub>可选</sub>  
> <a name="initializer"></a>
> *构造器* → **=** [*表达式*](04_Expressions.md#expression)  

<a name="variable_declaration"></a>
## 变量声明

*变量声明 (variable declaration)* 可以在程序中引入一个具有命名的变量，它以关键字 `var` 来声明。

变量声明有几种不同的形式，可以声明不同种类的命名值和可变值，如存储型和计算型变量和属性，属性观察器，以及静态变量属性。所使用的声明形式取决于变量声明的适用范围和打算声明的变量类型。

> 注意  
> 也可以在协议声明中声明属性，详情请参阅 [协议属性声明](#protocol_property_declaration)。

可以在子类中重写继承来的变量属性，使用 `override` 声明修饰符标记属性的声明即可，详情请参阅 [重写](../chapter2/13_Inheritance.md#overriding)。

<a name="stored_variables_and_stored_variable_properties"></a>
### 存储型变量和存储型变量属性

使用如下形式声明一个存储型变量或存储型变量属性：

```swift
var 变量名称: 类型 = 表达式
```

可以在全局范围，函数内部，或者在类和结构的声明中使用这种形式来声明一个变量。当变量以这种形式在全局范围或者函数内部被声明时，它代表一个存储型变量。当它在类或者结构中被声明时，它代表一个*存储型变量属性 (stored variable property)*。

用于初始化的表达式不可以在协议的声明中出现，在其他情况下，该表达式是可选的。如果没有初始化表达式，那么变量声明必须包含类型标注 (`:` *type*)。

如同常量声明，如果变量名称是元组形式，元组中每一项的名称都会和初始化表达式中对应的值进行绑定。

正如名字所示，存储型变量和存储型变量属性的值会存储在内存中。

<a name="computed_variables_and_computed_properties"></a>
### 计算型变量和计算型属性

使用如下形式声明一个计算型变量或计算型属性：

```swift
var 变量名称: 类型 {  
	get {  
		语句
	}  
	set(setter 名称) {  
		语句
	}  
}  
```

可以在全局范围、函数内部，以及类、结构、枚举、扩展的声明中使用这种形式的声明。当变量以这种形式在全局范围或者函数内部被声明时，它表示一个计算型变量。当它在类、结构、枚举、扩展声明的上下文中被声明时，它表示一个*计算型属性 (computed property)*。

getter 用来读取变量值，setter 用来写入变量值。setter 子句是可选的，getter 子句是必须的。不过也可以将这些子句都省略，直接返回请求的值，正如在 [只读计算型属性](../chapter2/10_Properties.md#computed_properties) 中描述的那样。但是如果提供了一个 setter 子句，就必须也提供一个 getter 子句。

setter 的圆括号以及 setter 名称是可选的。如果提供了 setter 名称，它就会作为 setter 的参数名称使用。如果不提供 setter 名称，setter 的参数的默认名称为 `newValue`，正如在 [便捷 setter 声明](../chapter2/10_Properties.md#shorthand_setter_declaration) 中描述的那样。

与存储型变量和存储型属性不同，计算型变量和计算型属性的值不存储在内存中。

要获得更多关于计算型属性的信息和例子，请参阅 [计算型属性](../chapter2/10_Properties.md#computed_properties)。

<a name="stored_variable_observers_and_property_observers"></a>
### 存储型变量和属性的观察器

可以在声明存储型变量或属性时提供 `willSet` 和 `didSet` 观察器。一个包含观察器的存储型变量或属性以如下形式声明：

```swift
var 变量名称: 类型 = 表达式 {  
	willSet(setter 名称) {  
		语句
	}  
	didSet(setter 名称) {  
		语句
	}  
}  
```

可以在全局范围、函数内部，或者类、结构的声明中使用这种形式的声明。当变量以这种形式在全局范围或者函数内部被声明时，观察器表示一个存储型变量观察器。当它在类和结构的声明中被声明时，观察器表示一个属性观察器。

可以为任何存储型属性添加观察器。也可以通过重写父类属性的方式为任何继承的属性（无论是存储型还是计算型的）添加观察器
，正如 [重写属性观察器](../chapter2/13_Inheritance.md#overriding_property_observers) 中所描述的。

用于初始化的表达式在类或者结构的声明中是可选的，但是在其他声明中则是必须的。如果可以从初始化表达式中推断出类型信息，那么可以不提供类型标注。

当变量或属性的值被改变时，`willSet` 和 `didSet` 观察器提供了一种观察方法。观察器会在变量的值被改变时调用，但不会在初始化时被调用。

`willSet` 观察器只在变量或属性的值被改变之前调用。新的值作为一个常量传入 `willSet` 观察器，因此不可以在 `willSet` 中改变它。`didSet` 观察器在变量或属性的值被改变后立即调用。和 `willSet` 观察器相反，为了方便获取旧值，旧值会传入 `didSet` 观察器。这意味着，如果在变量或属性的 `didiset` 观察器中设置值，设置的新值会取代刚刚在 `willSet` 观察器中传入的那个值。

在 `willSet` 和 `didSet` 中，圆括号以及其中的 setter 名称是可选的。如果提供了一个 setter 名称，它就会作为 `willSet` 和 `didSet` 的参数被使用。如果不提供 setter 名称，`willSet` 观察器的默认参数名为 `newValue`，`didSet` 观察器的默认参数名为 `oldValue`。

提供了 `willSet` 时，`didSet` 是可选的。同样的，提供了 `didSet` 时，`willSet` 则是可选的。

要获得更多信息以及查看如何使用属性观察器的例子，请参阅 [属性观察器](../chapter2/10_Properties.md#property_observers)。

<a name="type_variable_properties"></a>
### 类型变量属性

要声明一个类型变量属性，用 `static` 声明修饰符标记该声明。类可以改用 `class` 声明修饰符标记类的类型计算型属性从而允许子类重写超类的实现。类型属性在 [类型属性](../chapter2/10_Properties.md#type_properties) 章节有详细讨论。

> 注意  
> 在一个类声明中，使用关键字 `static` 与同时使用 `class` 和 `final` 去标记一个声明的效果相同。

<a name="grammer_of_a_variable_declaration"></a>
> 变量声明语法  

<a name="variable-declaration"></a>
> *变量声明* → [*变量声明头*](#variable-declaration-head) [*模式构造器列表*](#pattern-initializer-list)  
> *变量声明* → [*变量声明头*](#variable-declaration-head) [*变量名称*](#variable-name) [*类型标注*](03_Types.md#type-annotation) [*代码块*](#code-block)  
> *变量声明* → [*变量声明头*](#variable-declaration-head) [*变量名称*](#variable-name) [*类型标注*](03_Types.md#type-annotation) [*getter-setter代码块*](#getter-setter-block)  
> *变量声明* → [*变量声明头*](#variable-declaration-head) [*变量名称*](#variable-name) [*类型标注*](03_Types.md#type-annotation) [*getter-setter关键字代码块*](#getter-setter-keyword-block)   
> *变量声明* → [*变量声明头*](#variable-declaration-head) [*变量名称*](#variable-name) [*构造器*](#initializer) [*willSet-didSet代码块*](#willSet-didSet-block)   
> *变量声明* → [*变量声明头*](#variable-declaration-head) [*变量名称*](#variable-name) [*类型标注*](03_Types.md#type-annotation) [*构造器*](#initializer)<sub>可选</sub> [*willSet-didSet代码块*](#willSet-didSet-block)  

<a name="variable-declaration-head"></a>
> *变量声明头* → [*特性列表*](06_Attributes.md#attributes)<sub>可选</sub> [*声明修饰符列表*](#declaration-modifiers)<sub>可选</sub> **var**  
> <a name="variable-name"></a>
> *变量名称* → [*标识符*](02_Lexical_Structure.md#identifier)  

<a name="getter-setter-block"></a>
> *getter-setter 代码块* → [*代码块*](#code-block)  
> *getter-setter 代码块* → **{** [*getter子句*](#getter-clause) [*setter子句*](#setter-clause)<sub>可选</sub> **}**  
> *getter-setter 代码块* → **{** [*setter子句*](#setter-clause) [*getter子句*](#getter-clause) **}**  
> <a name="getter-clause"></a>
> *getter 子句* → [*特性列表*](06_Attributes.md#attributes)<sub>可选</sub> **get** [*代码块*](#code-block)  
> <a name="setter-clause"></a>
> *setter 子句* → [*特性列表*](06_Attributes.md#attributes)<sub>可选</sub> **set** [*setter名称*](#setter-name)<sub>可选</sub> [*代码块*](#code-block)  
> <a name="setter-name"></a>
> *setter 名称* → **(** [*标识符*](02_Lexical_Structure.md#identifier) **)**  

<a name="getter-setter-keyword-block"></a>
> *getter-setter 关键字代码块* → **{** [*getter关键字子句*](#getter-keyword-clause) [*setter关键字子句*](#setter-keyword-clause)<sub>可选</sub> **}**  
> *getter-setter 关键字代码块* → **{** [*setter关键字子句*](#setter-keyword-clause) [*getter关键字子句*](#getter-keyword-clause) **}**  
> <a name="getter-keyword-clause"></a>
> *getter 关键字子句* → [*特性列表*](06_Attributes.md#attributes)<sub>可选</sub> **get**  
> <a name="setter-keyword-clause"></a>
> *setter 关键字子句* → [*特性列表*](06_Attributes.md#attributes)<sub>可选</sub> **set**  

<a name="willSet-didSet-block"></a>
> *willSet-didSet 代码块* → **{** [*willSet子句*](#willSet-clause) [*didSet子句*](#didSet-clause)<sub>可选</sub> **}**  
> *willSet-didSet 代码块* → **{** [*didSet子句*](#didSet-clause) [*willSet子句*](#willSet-clause)<sub>可选</sub> **}**  
> <a name="willSet-clause"></a>
> *willSet 子句* → [*特性列表*](06_Attributes.md#attributes)<sub>可选</sub> **willSet** [*setter名称*](#setter-name)<sub>可选</sub> [*代码块*](#code-block)  
> <a name="didSet-clause"></a>
> *didSet 子句* → [*特性列表*](06_Attributes.md#attributes)<sub>可选</sub> **didSet** [*setter名称*](#setter-name)<sub>可选</sub> [*代码块*](#code-block)  

<a name="type_alias_declaration"></a>
## 类型别名声明

*类型别名 (type alias)* 声明可以在程序中为一个既有类型声明一个别名。类型别名声明语句使用关键字 `typealias` 声明，遵循如下的形式：

```swift
typealias 类型别名 = 现存类型
```

当声明一个类型的别名后，可以在程序的任何地方使用“别名”来代替现有类型。现有类型可以是具有命名的类型或者混合类型。类型别名不产生新的类型，它只是使用别名来引用现有类型。
类型别名声明可以通过泛型参数来给一个现有泛型类型提供名称。类型别名为现有类型的一部分或者全部泛型参数提供具体类型。例如:
```swift
typealias StringDictionary<Value> = Dictionary<String, Value>
 
// 下列两个字典拥有同样的类型
var dictionary1: StringDictionary<Int> = [:]
var dictionary2: Dictionary<String, Int> = [:]
```
当一个类型别名带着泛型参数一起被声明时,这些参数的约束必须与现有参数的约束完全匹配。例如:
```swift
typealias DictionaryOfInts<Key: Hashable> = Dictionary<Key, Int>
```
因为类型别名可以和现有类型相互交换使用,类型别名不可以引入额外的类型约束。
在协议声明中,类型别名可以为那些经常使用的类型提供一个更短更方便的名称,例如:
```swift
protocol Sequence {
    associatedtype Iterator: IteratorProtocol
    typealias Element = Iterator.Element
}
 
func sum<T: Sequence>(_ sequence: T) -> Int where T.Element == Int {
    // ...
}
```
假如没有类型别名,sum函数将必须引用关联类型通过T.Iterator.Element的形式来替代 T.Element。

另请参阅 [协议关联类型声明](#protocol_associated_type_declaration)。

<a name="grammer_of_a_type_alias_declaration"></a>
> 类型别名声明语法  
> <a name="typealias-declaration"></a>
> *类型别名声明* → [*类型别名头*](#typealias-head) [*类型别名赋值*](#typealias-assignment)  
> <a name="typealias-head"></a>
> *类型别名头* → [*特性列表*](06_Attributes.md#attributes)<sub>可选</sub> [*访问级别修饰符*](#access-level-modifier)<sub>可选</sub> **typealias** [*类型别名名称*](#typealias-name)  
> <a name="typealias-name"></a>
> *类型别名名称* → [*标识符*](02_Lexical_Structure.md#identifier)  
> <a name="typealias-assignment"></a>
> *类型别名赋值* → **=** [*类型*](03_Types.md#type)  

<a name="function_declaration"></a>
## 函数声明

使用*函数声明 (function declaration)* 在程序中引入新的函数或者方法。在类、结构体、枚举，或者协议中声明的函数会作为方法。函数声明使用关键字 `func`，遵循如下的形式：

```swift
func 函数名称(参数列表) -> 返回类型 {  
	语句 
}
```

如果函数返回 `Void` 类型，返回类型可以省略，如下所示：

```swift
func 函数名称(参数列表) {  
	语句
}
```

每个参数的类型都要标明，因为它们不能被推断出来。如果您在某个参数类型前面加上了 `inout`，那么这个参数就可以在这个函数作用域当中被修改。更多关于 `inout` 参数的讨论，请参阅 [输入输出参数](#in-out_parameters)。

函数可以使用元组类型作为返回类型来返回多个值。

函数定义可以出现在另一个函数声明内。这种函数被称作*嵌套函数 (nested function)*。更多关于嵌套函数的讨论，请参阅 [嵌套函数](../chapter2/06_Functions.md#Nested_Functions)。

<a name="parameter_names"></a>
### 参数名

函数的参数列表由一个或多个函数参数组成，参数间以逗号分隔。函数调用时的参数顺序必须和函数声明时的参数顺序一致。最简单的参数列表有着如下的形式：

`参数名称`: `参数类型`

一个参数有一个内部名称，这个内部名称可以在函数体内被使用。还有一个外部名称，当调用函数时这个外部名称被作为实参的标签来使用。默认情况下，第一个参数的外部名称会被省略，第二个和之后的参数使用它们的内部名称作为它们的外部名称。例如：

```swift
func f(x: Int, y: Int) -> Int { return x + y }
f(1, y: 2) // 参数 y 有标签，参数 x 则没有
```

可以按照如下两种形式之一，重写参数名称的默认行为：

`外部参数名称` `内部参数名称`: `参数类型`    
_ `内部参数名称`: `参数类型`

在内部参数名称前的名称会作为这个参数的外部名称，这个名称可以和内部参数的名称不同。外部参数名称在函数被调用时必须被使用，即对应的参数在方法或函数被调用时必须有外部名。

内部参数名称前的下划线（`_`）可使该参数在函数被调用时没有名称。在函数或方法调用时，对应的参数必须没有名字。

```swift
func f(x x: Int, withY y: Int, _ z: Int) -> Int { return x + y + z }
f(x: 1, withY: 2, 3) // 参数 x 和 y 是有标签的，参数 z 则没有
```

<a name="in-out_parameters"></a>
### 输入输出参数

输入输出参数被传递时遵循如下规则：

1. 函数调用时，参数的值被拷贝。
2. 函数体内部，拷贝后的值被修改。
3. 函数返回后，拷贝后的值被赋值给原参数。

这种行为被称为*拷入拷出 (copy-in copy-out)* 或*值结果调用 (call by value result)*。例如，当一个计算型属性或者一个具有属性观察器的属性被用作函数的输入输出参数时，其 getter 会在函数调用时被调用，而其 setter 会在函数返回时被调用。

作为一种优化手段，当参数值存储在内存中的物理地址时，在函数体内部和外部均会使用同一内存位置。这种优化行为被称为*引用调用 (call by reference)*，它满足了拷入拷出模式的所有要求，且消除了复制带来的开销。在代码中，要规范使用拷入拷出模式，不要依赖于引用调用。

不要使用传递给输入输出参数的值，即使原始值在当前作用域中依然可用。当函数返回时，你对原始值所做的更改会被拷贝的值所覆盖。不要依赖于引用调用的优化机制来试图避免这种覆盖。

不能将同一个值传递给多个输入输出参数，因为这种情况下的拷贝与覆盖行为的顺序是不确定的，因此原始值的最终值也将无法确定。例如：

```swift
var x = 10
func f(inout a: Int, inout _ b: Int) {
    a += 1
    b += 10
}
f(&x, &x) // 编译报错 error: inout arguments are not allowed to alias each other
```

如果嵌套函数在外层函数返回后才调用，嵌套函数对输入输出参数造成的任何改变将不会影响到原始值。例如：

```swift
func outer(inout a: Int) -> () -> Void {
    func inner() {
        a += 1
    }
    return inner
}

var x = 10
let f = outer(&x)
f()
print(x)
// 打印 “10”
```

调用嵌套函数 `inner()` 对 `a` 递增后，`x` 的值并未发生改变，因为 `inner()` 在外层函数 `outer()` 返回后才被调用。若要改变 `x` 的值，必须在 `outer()` 返回前调用 `inner()`。

关于输入输出参数的详细讨论，请参阅 [输入输出参数](../chapter2/06_Functions.md#in_out_parameters)。

<a name="special_kinds_of_parameters"></a>
### 特殊参数

参数可以被忽略，数量可以不固定，还可以为其提供默认值，使用形式如下：

```swift
_ : 参数类型
参数名称: 参数类型...  
参数名称: 参数类型 = 默认参数值  
```

以下划线（`_`）命名的参数会被显式忽略，无法在函数体内使用。

一个参数的基本类型名称如果紧跟着三个点（`...`），会被视为可变参数。一个函数至多可以拥有一个可变参数，且必须是最后一个参数。可变参数会作为包含该参数类型元素的数组处理。举例来讲，可变参数 `Int...` 会作为 `[Int]` 来处理。关于使用可变参数的例子，请参阅 [可变参数](../chapter2/06_Functions.md#variadic_parameters)。

如果在参数类型后面有一个以等号（`=`）连接的表达式，该参数会拥有默认值，即给定表达式的值。当函数被调用时，给定的表达式会被求值。如果参数在函数调用时被省略了，就会使用其默认值。

```swift
func f(x: Int = 42) -> Int { return x }
f()     // 有效，使用默认值
f(7)    // 有效，提供了值
f(x: 7) // 无效，该参数没有外部名称
```

<a name="special_kinds_of_methods"></a>
### 特殊方法

枚举或结构体的方法如果会修改 `self`，则必须以 `mutating` 声明修饰符标记。

子类重写超类中的方法必须以 `override` 声明修饰符标记。重写方法时不使用 `override` 修饰符，或者被 `override` 修饰符修饰的方法并未对超类方法构成重写，都会导致编译错误。

枚举或者结构体中的类型方法，要以 `static` 声明修饰符标记，而对于类中的类型方法，除了使用 `static`，还可使用 `class` 声明修饰符标记。

<a name="throwing_functions_and_methods"></a>
### 抛出错误的函数和方法

可以抛出错误的函数或方法必须使用 `throws` 关键字标记。这类函数和方法被称为抛出函数和抛出方法。它们有着下面的形式:

```swift
func 函数名称(参数列表) throws -> 返回类型 {
	语句
}
```

抛出函数或抛出方法的调用必须包裹在 `try` 或者 `try!` 表达式中（也就是说，在作用域内使用 `try` 或者 `try!` 运算符）。

`throws` 关键字是函数的类型的一部分，非抛出函数是抛出函数的子类型。所以，可以在使用抛出函数的地方使用非抛出函数。

不能仅基于函数能否抛出错误来进行函数重载。也就是说，可以基于函数的函数类型的参数能否抛出错误来进行函数重载。

抛出方法不能重写非抛出方法，而且抛出方法不能满足协议对于非抛出方法的要求。也就是说，非抛出方法可以重写抛出方法，而且非抛出方法可以满足协议对于抛出方法的要求。

<a name="rethrowing_functions_and_methods"></a>
### 重抛错误的函数和方法

函数或方法可以使用 `rethrows` 关键字来声明，从而表明仅当该函数或方法的一个函数类型的参数抛出错误时，该函数或方法才抛出错误。这类函数和方法被称为重抛函数和重抛方法。重新抛出错误的函数或方法必须至少有一个参数的类型为抛出函数。

```swift
func someFunction(callback: () throws -> Void) rethrows {
    try callback()
}
```

重抛函数或者方法不能够从自身直接抛出任何错误，这意味着它不能够包含 `throw` 语句。它只能够传递作为参数的抛出函数所抛出的错误。例如，在 `do-catch` 代码块中调用抛出函数，并在 `catch` 子句中抛出其它错误都是不允许的。

抛出方法不能重写重抛方法，而且抛出方法不能满足协议对于重抛方法的要求。也就是说，重抛方法可以重写抛出方法，而且重抛方法可以满足协议对于抛出方法的要求。

<a name="functions_that_never_return"></a>
### 永不返回的函数

Swift定义了`Never`类型，它表示函数或者方法不会返回给它的调用者。`Never`返回类型的函数或方法可以称为不归,不归函数、方法要么引发不可恢复的错误,要么永远不停地运作,这会使调用后本应执行得代码就不再执行了。但即使是不归函数、方法,抛错函数和重抛出函数也可以将程序控制转移到合适的`catch`代码块。

不归函数、方法可以在guard语句的else字句中调用,具体讨论在[*Guard语句*](10_Statements.md#guard_statements)。  
你可以重载一个不归方法,但是新的方法必须保持原有的返回类型和没有返回的行为。

<a name="grammer_of_a_function_declaration"></a>
> 函数声明语法  

<a name="function-declaration"></a>
> *函数声明* → [*函数头*](#function-head) [*函数名*](#function-name) [*泛型形参子句*](08_Generic_Parameters_and_Arguments.md#generic-parameter-clause)<sub>可选</sub> [*函数签名*](#function-signature) [*函数体*](#function-body)<sub>可选</sub>  

<a name="function-head"></a>
> *函数头* → [*特性列表*](06_Attributes.md#attributes)<sub>可选</sub> [*声明修饰符列表*](#declaration-modifiers)<sub>可选</sub> **func**  
> <a name="function-name"></a>
> *函数名* → [*标识符*](02_Lexical_Structure.md#identifier) | [*运算符*](02_Lexical_Structure.md#operator)  

<a name="function-signature"></a>
> *函数签名* → [*参数子句列表*](#parameter-clauses) **throws**<sub>可选</sub> [*函数结果*](#function-result)<sub>可选</sub>  
> *函数签名* → [*参数子句列表*](#parameter-clauses) **rethrows** [*函数结果*](#function-result)<sub>可选</sub>  
> <a name="function-result"></a>
> *函数结果* → **->** [*特性列表*](06_Attributes.md#attributes)<sub>可选</sub> [*类型*](03_Types.md#type)  
> <a name="function-body"></a>
> *函数体* → [*代码块*](#code-block)  

<a name="parameter-clauses"></a>
> *参数子句列表* → [*参数子句*](#parameter-clause) [*参数子句列表*](#parameter-clauses)<sub>可选</sub>  
> <a name="parameter-clause"></a>
> *参数子句* → **(** **)** | **(** [*参数列表*](#parameter-list) **)**  
> <a name="parameter-list"></a>
> *参数列表* → [*参数*](#parameter) | [*参数*](#parameter) **,** [*参数列表*](#parameter-list)  
> <a name="parameter"></a>
> *参数* → **let**<sub>可选</sub> [*外部参数名*](#external-parameter-name)<sub>可选</sub> [*内部参数名*](#local-parameter-name) [*类型标注*](03_Types.md#type-annotation) [*默认参数子句*](#default-argument-clause)<sub>可选</sub>  
> *参数* → **inout** [*外部参数名*](#external-parameter-name)<sub>可选</sub> [*内部参数名*](#local-parameter-name) [*类型标注*](03_Types.md#type-annotation)  
> *参数* → [*外部参数名*](#external-parameter-name)<sub>可选</sub> [*内部参数名*](#local-parameter-name) [*类型标注*](03_Types.md#type-annotation) **...**  
> <a name="external-parameter-name"></a>
> *外部参数名* → [*标识符*](02_Lexical_Structure.md#identifier) | **_**  
> <a name="local-parameter-name"></a>
> *内部参数名* → [*标识符*](02_Lexical_Structure.md#identifier) | **_**  
> <a name="default-argument-clause"></a>
> *默认参数子句* → **=** [*表达式*](04_Expressions.md#expression)  




<a name="enumeration_declaration"></a>
## 枚举声明

在程序中使用*枚举声明 (enumeration declaration)* 来引入一个枚举类型。

枚举声明有两种基本形式，使用关键字 `enum` 来声明。枚举声明体包含零个或多个值，称为枚举用例，还可包含任意数量的声明，包括计算型属性、实例方法、类型方法、构造器、类型别名，甚至其他枚举、结构体和类。枚举声明不能包含析构器或者协议声明。

枚举类型可以采纳任意数量的协议，但是枚举不能从类、结构体和其他枚举继承。

不同于类或者结构体，枚举类型并不隐式提供默认构造器，所有构造器必须显式声明。一个构造器可以委托给枚举中的其他构造器，但是构造过程仅当构造器将一个枚举用例赋值给 `self` 后才算完成。

和结构体类似但是和类不同，枚举是值类型。枚举实例在被赋值到变量或常量时，或者传递给函数作为参数时会被复制。更多关于值类型的信息，请参阅 [结构体和枚举是值类型](../chapter2/09_Classes_and_Structures.md#structures_and_enumerations_are_value_types)。

可以扩展枚举类型，正如在 [扩展声明](#extension_declaration) 中讨论的一样。

<a name="enumerations_with_cases_of_any_type"></a>
### 任意类型的枚举用例

如下的形式声明了一个包含任意类型枚举用例的枚举变量：

```swift
enum 枚举名称: 采纳的协议 {
	case 枚举用例1
	case 枚举用例2(关联值类型)
}
```

这种形式的枚举声明在其他语言中有时被叫做可识别联合。

在这种形式中，每个用例块由关键字 `case` 开始，后面紧接一个或多个以逗号分隔的枚举用例。每个用例名必须是独一无二的。每个用例也可以指定它所存储的指定类型的值，这些类型在关联值类型的元组中被指定，紧跟用例名之后。

具有关联值的枚举用例可以像函数一样使用，通过指定的关联值创建枚举实例。和真正的函数一样，你可以获取枚举用例的引用，然后在后续代码中调用它。

```swift
enum Number {
    case Integer(Int)
    case Real(Double)
}

// f 的类型为 (Int) -> Number
let f = Number.Integer

// 利用 f 把一个整数数组转成 Number 数组
let evenInts: [Number] = [0, 2, 4, 6].map(f)
```

要获得更多关于具有关联值的枚举用例的信息和例子，请参阅 [关联值](../chapter2/08_Enumerations.md#associated_values)。

<a name="enumerations_with_indirection"></a>
#### 递归枚举

枚举类型可以具有递归结构，就是说，枚举用例的关联值类型可以是枚举类型自身。然而，枚举类型的实例具有值语义，这意味着它们在内存中有固定布局。为了支持递归，编译器必须插入一个间接层。

要让某个枚举用例支持递归，使用 `indirect` 声明修饰符标记该用例。

```swift
enum Tree<T> {
	case Empty
	indirect case Node(value: T, left: Tree, right:Tree)
}
```

要让一个枚举类型的所有用例都支持递归，使用 `indirect` 修饰符标记整个枚举类型，当枚举有多个用例且每个用例都需要使用 `indirect` 修饰符标记的时候这将非常便利。

被 `indirect` 修饰符标记的枚举用例必须有一个关联值。使用 `indirect` 修饰符标记的枚举类型可以既包含有关联值的用例，同时还可包含没有关联值的用例。但是，它不能再单独使用 `indirect` 修饰符来标记某个用例。

<a name="enumerations_with_cases_of_a_raw-value_type"></a>
### 拥有原始值的枚举用例

以下形式声明了一种枚举类型，其中各个枚举用例的类型均为同一种基本类型：

```swift
enum 枚举名称: 原始值类型, 采纳的协议 {  
	case 枚举用例1 = 原始值1
	case 枚举用例2 = 原始值2
}  
```

在这种形式中，每一个用例块由 `case` 关键字开始，后面紧跟一个或多个以逗号分隔的枚举用例。和第一种形式的枚举用例不同，这种形式的枚举用例包含一个基础值，叫做原始值，各个枚举用例的原始值的类型必须相同。这些原始值的类型通过原始值类型指定，必须表示一个整数、浮点数、字符串或者字符。原始值类型必须符合 `Equatable` 协议和下列字面量转换协议中的一种：整型字面量需符合 `IntergerLiteralConvertible` 协议，浮点型字面量需符合 `FloatingPointLiteralConvertible` 协议，包含任意数量字符的字符串型字面量需符合 `StringLiteralConvertible` 协议，仅包含一个单一字符的字符串型字面量需符合 `ExtendedGraphemeClusterLiteralConvertible` 协议。每一个用例的名字和原始值必须唯一。

如果原始值类型被指定为 `Int`，则不必为用例显式地指定原始值，它们会隐式地被赋值 `0`、`1`、`2` 等。每个未被赋值的 `Int` 类型的用例会被隐式地赋值，其值为上一个用例的原始值加 `1`。

```Swift
enum ExampleEnum: Int {
    case A, B, C = 5, D
}
```

在上面的例子中，`ExampleEnum.A` 的原始值是 `0`，`ExampleEnum.B` 的原始值是 `1`。因为 `ExampleEnum.C` 的原始值被显式地设定为 `5`，因此 `ExampleEnum.D` 的原始值会自动增长为 `6`。

如果原始值类型被指定为 `String` 类型，你不用明确地为用例指定原始值，每个没有指定原始值的用例会隐式地将用例名字作为原始值。

```swift
enum WeekendDay: String {
    case Saturday, Sunday
}
```

在上面这个例子中，`WeekendDay.Saturday` 的原始值是 `"Saturday"`，`WeekendDay.Sunday` 的原始值是 `"Sunday"`。

枚举用例具有原始值的枚举类型隐式地符合定义在 Swift 标准库中的 `RawRepresentable` 协议。所以，它们拥有一个 `rawValue` 属性和一个可失败构造器 `init?(rawValue: RawValue)`。可以使用 `rawValue` 属性去获取枚举用例的原始值，例如 `ExampleEnum.B.rawValue`。还可以根据原始值来创建一个相对应的枚举用例，只需调用枚举的可失败构造器，例如 `ExampleEnum(rawValue: 5)`，这个可失败构造器返回一个可选类型的用例。要获得更多关于具有原始值的枚举用例的信息和例子，请参阅 [原始值](../chapter2/08_Enumerations.md#raw_values)。

<a name="accessing_enumeration_cases"></a>
### 访问枚举用例

使用点语法（`.`）来引用枚举类型的枚举用例，例如 `EnumerationType.EnumerationCase`。当枚举类型可以由上下文推断而出时，可以省略它（但是 `.` 仍然需要），正如 [枚举语法](../chapter2/08_Enumerations.md#enumeration_syntax) 和 [显式成员表达式](04_Expressions.md#explicit_member_expression) 所述。

可以使用 `switch` 语句来检验枚举用例的值，正如 [使用 switch 语句匹配枚举值](../chapter2/08_Enumerations.md#matching_enumeration_values_with_a_switch_statement) 所述。枚举类型是模式匹配的，依靠 `switch` 语句 `case` 块中的枚举用例模式，正如 [枚举用例模式](07_Patterns.md#enumeration_case_pattern) 所述。

<a name="grammer_of_an_enumeration_declaration"></a>
> 枚举声明语法 

<a name="enum-declaration"></a>
> *枚举声明* → [*特性列表*](06_Attributes.md#attributes)<sub>可选</sub> [*访问级别修饰符*](#access-level-modifier)<sub>可选</sub> [*联合风格枚举*](#union-style-enum)  
> *枚举声明* → [*特性列表*](06_Attributes.md#attributes)<sub>可选</sub> [*访问级别修饰符*](#access-level-modifier) <sub>可选</sub> [*原始值风格枚举*](#raw-value-style-enum) 

<a name="union-style-enum"></a>
> *联合风格枚举* → **indirect**<sub>可选</sub> **enum** [*枚举名称*](#enum-name) [*泛型形参子句*](08_Generic_Parameters_and_Arguments.md#generic-parameter-clause)<sub>可选</sub> [类型继承子句](03_Types.md#type-inheritance-clause)<sub>可选</sub> **{** [*多个联合风格枚举成员*](#union-style-enum-members)<sub>可选</sub> **}**  
> <a name="union-style-enum-members"></a>
> *多个联合风格枚举成员* → [*联合风格枚举成员*](#union-style-enum-member) [*多个联合风格枚举成员*](#union-style-enum-members)<sub>可选</sub>  
> <a name="union-style-enum-member"></a>
> *联合风格枚举成员* → [*声明*](#declaration) | [*联合风格枚举用例子句*](#union-style-enum-case-clause)  
> <a name="union-style-enum-case-clause"></a>
> *联合风格枚举用例子句* → [*特性列表*](06_Attributes.md#attributes)<sub>可选</sub> **indirect**<sub>可选</sub> **case** [*联合风格枚举用例列表*](#union-style-enum-case-list)  
> <a name="union-style-enum-case-list"></a>
> *联合风格枚举用例列表* → [*联合风格枚举用例*](#union-style-enum-case) | [*联合风格枚举用例*](#union-style-enum-case) **,** [*联合风格枚举用例列表*](#union-style-enum-case-list)  
> <a name="union-style-enum-case"></a>
> *联合风格枚举用例* → [*枚举用例名称*](#enum-case-name) [*元组类型*](03_Types.md#tuple-type)<sub>可选</sub>  
> <a name="enum-name"></a>
> *枚举名称* → [*标识符*](02_Lexical_Structure.md#identifier)  
> <a name="enum-case-name"></a>
> *枚举用例名称* → [*标识符*](02_Lexical_Structure.md#identifier)  

<a name="raw-value-style-enum"></a>
> *原始值风格枚举* → **enum** [*枚举名称*](#enum-name) [*泛型形参子句*](08_Generic_Parameters_and_Arguments.md#generic-parameter-clause)<sub>可选</sub> [类型继承子句](03_Types.md#type-inheritance-clause) **{** [*多个原始值风格枚举成员*](#raw-value-style-enum-members) **}**  
> <a name="raw-value-style-enum-members"></a>
> *多个原始值风格枚举成员* → [*原始值风格枚举成员*](#raw-value-style-enum-member) [*多个原始值风格枚举成员*](#raw-value-style-enum-members)<sub>可选</sub>  
> <a name="raw-value-style-enum-member"></a>
> *原始值风格枚举成员* → [*声明*](#declaration) | [*原始值风格枚举用例子句*](#raw-value-style-enum-case-clause)  
> <a name="raw-value-style-enum-case-clause"></a>
> *原始值风格枚举用例子句* → [*特性列表*](06_Attributes.md#attributes)<sub>可选</sub> **case** [*原始值风格枚举用例列表*](#raw-value-style-enum-case-list)  
> <a name="raw-value-style-enum-case-list"></a>
> *原始值风格枚举用例列表* → [*原始值风格枚举用例*](#raw-value-style-enum-case) | [*原始值风格枚举用例*](#raw-value-style-enum-case) **,** [*原始值风格枚举用例列表*](#raw-value-style-enum-case-list)  
> <a name="raw-value-style-enum-case"></a>
> *原始值风格枚举用例* → [*枚举用例名称*](#enum-case-name) [*原始值赋值*](#raw-value-assignment)<sub>可选</sub>  
> <a name="raw-value-assignment"></a>
> *原始值赋值* → **=** [*原始值字面量*](#raw-value-literal)  
> <a name="raw-value-literal"></a>
> *原始值字面量* → [数字型字面量](02_Lexical_Structure.md#numeric-literal) | [字符串型字面量](02_Lexical_Structure.md#static-string-literal) | [布尔型字面量](02_Lexical_Structure.md#boolean-literal)

<a name="structure_declaration"></a>
## 结构体声明

使用*结构体声明 (structure declaration)* 可以在程序中引入一个结构体类型。结构体声明使用 `struct` 关键字，遵循如下的形式：

```swift
struct 结构体名称: 采纳的协议 {  
	多条声明
}
```

结构体内可包含零个或多个声明。这些声明可以包括存储型和计算型属性、类型属性、实例方法、类型方法、构造器、下标、类型别名，甚至其他结构体、类、和枚举声明。结构体声明不能包含析构器或者协议声明。关于结构体的详细讨论和示例，请参阅 [类和结构体](../chapter2/09_Classes_and_Structures.md)。

结构体可以采纳任意数量的协议，但是不能继承自类、枚举或者其他结构体。

有三种方法可以创建一个已声明的结构体实例：

* 调用结构体内声明的构造器，正如 [构造器](../chapter2/14_Initialization.md#initializers) 所述。

* 如果没有声明构造器，调用结构体的成员逐一构造器，正如 [结构体类型的成员逐一构造器](../chapter2/14_Initialization.md#memberwise_initializers_for_structure_types) 所述。

* 如果没有声明构造器，而且结构体的所有属性都有初始值，调用结构体的默认构造器，正如 [默认构造器](../chapter2/14_Initialization.md#default_initializers) 所述。

结构体的构造过程请参阅 [构造过程](../chapter2/14_Initialization.md)。

结构体实例的属性可以用点语法（`.`）来访问，正如 [访问属性](../chapter2/09_Classes_and_Structures.md#accessing_properties) 所述。

结构体是值类型。结构体的实例在被赋予变量或常量，或传递给函数作为参数时会被复制。关于值类型的更多信息，请参阅
[结构体和枚举是值类型](../chapter2/09_Classes_and_Structures.md#structures_and_enumerations_are_value_types)。

可以使用扩展声明来扩展结构体类型的行为，请参阅 [扩展声明](#extension_declaration)。

<a name="grammer_of_a_structure_declaration"></a>
> 结构体声明语法  
> <a name="struct-declaration"></a>
> *结构体声明* → [*特性列表*](06_Attributes.md#attributes)<sub>可选</sub> [*访问级别修饰符*](#access-level-modifier) <sub>可选</sub> **struct** [*结构体名称*](#struct-name) [*泛型形参子句*](08_Generic_Parameters_and_Arguments.md#generic-parameter-clause)<sub>可选</sub> [类型继承子句](03_Types.md#type-inheritance-clause)<sub>可选</sub> [*结构体主体*](#struct-body)  
> <a name="struct-name"></a>
> *结构体名称* → [*标识符*](02_Lexical_Structure.md#identifier)  
> <a name="struct-body"></a>
> *结构体主体* → **{** [*多条声明*](#declarations)<sub>可选</sub> **}**  

<a name="class_declaration"></a>
## 类声明

可以在程序中使用*类声明 (class declaration)* 来引入一个类。类声明使用关键字 `class`，遵循如下的形式：

```swift
class 类名: 超类, 采纳的协议 {  
	多条声明
}
```

类内可以包含零个或多个声明。这些声明可以包括存储型和计算型属性、实例方法、类型方法、构造器、唯一的析构器、下标、类型别名，甚至其他结构体、类和枚举声明。类声明不能包含协议声明。关于类的详细讨论和示例，请参阅 [类和结构体](../chapter2/09_Classes_and_Structures.md)。

一个类只能继承自一个超类，但是可以采纳任意数量的协议。超类紧跟在类名和冒号后面，其后跟着采纳的协议。泛型类可以继承自其它泛型类和非泛型类，但是非泛型类只能继承自其它非泛型类。当在冒号后面写泛型超类的名称时，必须写上泛型类的全名，包括它的泛型形参子句。

正如 [构造器声明](#initializer_declaration) 所讨论的，类可以有指定构造器和便利构造器。类的指定构造器必须初始化类中声明的所有属性，并且必须在调用超类构造器之前。

类可以重写属性、方法、下标以及构造器。重写的属性、方法、下标和指定构造器必须以 `override` 声明修饰符标记。

为了要求子类去实现超类的构造器，使用 `required` 声明修饰符标记超类的构造器。子类实现超类构造器时也必须使用 `required` 声明修饰符。

虽然超类属性和方法声明可以被当前类继承，但是超类声明的指定构造器却不能。即便如此，如果当前类重写了超类的所有指定构造器，它就会继承超类的所有便利构造器。Swift 的类并不继承自一个通用基础类。

有两种方法来创建已声明的类的实例：

* 调用类中声明的构造器，请参阅 [构造器](../chapter2/14_Initialization.md#initializers)。

* 如果没有声明构造器，而且类的所有属性都被赋予了初始值，调用类的默认构造器，请参阅 [默认构造器](../chapter2/14_Initialization.md#default_initializers)。

类实例属性可以用点语法（`.`）来访问，请参阅 [访问属性](../chapter2/09_Classes_and_Structures.md#accessing_properties)。

类是引用类型。当被赋予常量或变量，或者传递给函数作为参数时，类的实例会被引用，而不是被复制。关于引用类型的更多信息，请参阅 [结构体和枚举是值类型](../chapter2/09_Classes_and_Structures.md#structures_and_enumerations_are_value_types)。

可以使用扩展声明来扩展类的行为，请参阅 [扩展声明](#extension_declaration)。

<a name="grammer_of_a_class_declaration"></a>
> 类声明语法  
> <a name="class-declaration"></a>
> *类声明* → [*特性列表*](06_Attributes.md#attributes)<sub>可选</sub> [访问级别修饰符](#access-level-modifier)<sub>可选</sub> **class** [*类名*](#class-name) [*泛型形参子句*](08_Generic_Parameters_and_Arguments.md#generic-parameter-clause)<sub>可选</sub> [*类型继承子句*](03_Types.md#type-inheritance-clause)<sub>可选</sub> [*类主体*](#class-body)  
> <a name="class-name"></a>
> *类名* → [*标识符*](02_Lexical_Structure.md#identifier)  
> <a name="class-body"></a>
> *类主体* → **{** [*多条声明*](#declarations)<sub>可选</sub> **}**  

<a name="protocol_declaration"></a>
## 协议声明

*协议声明 (protocol declaration)* 可以为程序引入一个命名的协议类型。协议声明只能在全局区域使用 `protocol` 关键字来进行声明，并遵循如下形式：

```swift
protocol 协议名称: 继承的协议 {  
	协议成员声明
}  
```

协议的主体包含零个或多个协议成员声明，这些成员描述了任何采纳该协议的类型必须满足的一致性要求。一个协议可以声明采纳者必须实现的某些属性、方法、构造器以及下标。协议也可以声明各种各样的类型别名，叫做关联类型，它可以指定协议的不同声明之间的关系。协议声明不能包括类、结构体、枚举或者其它协议的声明。协议成员声明会在后面进行讨论。

协议类型可以继承自任意数量的其它协议。当一个协议类型继承自其它协议的时候，来自其它协议的所有要求会聚合在一起，而且采纳当前协议的类型必须符合所有的这些要求。关于如何使用协议继承的例子，请参阅 [协议继承](../chapter2/22_Protocols.md#protocol_inheritance)。

> 注意  
> 也可以使用协议合成类型来聚合多个协议的一致性要求，请参阅 [协议合成类型](03_Types.md#protocol_composition_type) 和 [协议合成](../chapter2/22_Protocols.md#protocol_composition)。

可以通过类型的扩展声明来采纳协议，从而为之前声明的类型添加协议一致性。在扩展中，必须实现所有采纳协议的要求。如果该类型已经实现了所有的要求，可以让这个扩展声明的主体留空。

默认地，符合某个协议的类型必须实现所有在协议中声明的属性、方法和下标。即便如此，可以用 `optional` 声明修饰符标注协议成员声明，以指定它们的实现是可选的。`optional` 修饰符仅仅可以用于使用 `objc` 特性标记过的协议。因此，仅仅类类型可以采用并符合包含可选成员要求的协议。更多关于如何使用 `optional` 声明修饰符的信息，以及如何访问可选协议成员的指导——例如不能确定采纳协议的类型是否实现了它们时——请参阅 [可选协议要求](../chapter2/22_Protocols.md#optional_protocol_requirements)

为了限制协议只能被类类型采纳，需要使用 `class` 关键字来标记协议，将 `class` 关键在写在冒号后面的继承的协议列表的首位。例如，下面的协议只能被类类型采纳：

```swift
protocol SomeProtocol: class {
	/* 这里是协议成员 */
}
```

任何继承自标记有 `class` 关键字的协议的协议也仅能被类类型采纳。

> 注意  
> 如果协议已经用 `objc` 特性标记了，`class` 要求就隐式地应用于该协议，无需显式使用 `class` 关键字。

协议类型是命名的类型，因此它们可以像其他命名类型一样使用，正如 [协议作为类型](../chapter2/22_Protocols.md#protocols_as_types) 所讨论的。然而，不能构造一个协议的实例，因为协议实际上不提供它们指定的要求的实现。

可以使用协议来声明作为代理的类或者结构体应该实现的方法，正如 [委托(代理)模式](../chapter2/22_Protocols.md#delegation) 中所述。

<a name="grammer_of_a_protocol_declaration"></a>
> 协议声明语法  

<a name="protocol-declaration"></a>
> *协议声明* → [*特性列表*](06_Attributes.md#attributes)<sub>可选</sub> [访问级别修饰符](#access-level-modifier)<sub>可选</sub> **protocol** [*协议名称*](#protocol-name) [*类型继承子句*](03_Types.html#type-inheritance-clause)<sub>可选</sub> [*协议主体*](#protocol-body)  
> <a name="protocol-name"></a>
> *协议名称* → [*标识符*](02_Lexical_Structure.md#identifier)  
> <a name="protocol-body"></a>
> *协议主体* → **{** [*协议成员声明列表*](#protocol-member-declarations)<sub>可选</sub> **}**  

<a name="protocol-member-declaration"></a>
> *协议成员声明* → [*协议属性声明*](#protocol-property-declaration)  
> *协议成员声明* → [*协议方法声明*](#protocol-method-declaration)  
> *协议成员声明* → [*协议构造器声明*](#protocol-initializer-declaration)  
> *协议成员声明* → [*协议下标声明*](#protocol-subscript-declaration)  
> *协议成员声明* → [*协议关联类型声明*](#protocol-associated-type-declaration)  
> <a name="protocol-member-declarations"></a>
> *协议成员声明列表* → [*协议成员声明*](#protocol-member-declaration) [*协议成员声明列表*](#protocol-member-declarations)<sub>可选</sub>  

<a name="protocol_property_declaration"></a>
### 协议属性声明

协议可以通过在协议声明主体中引入一个协议属性声明，来声明符合的类型必须实现的属性。协议属性声明有一种特殊的变量声明形式：

```swift
var 属性名: 类型 { get set }
```

同其它协议成员声明一样，这些属性声明仅仅针对符合该协议的类型声明了 getter 和 setter 要求，你不能在协议中直接实现 getter 和 setter。

符合类型可以通过多种方式满足 getter 和 setter 要求。如果属性声明包含 `get` 和 `set` 关键字，符合类型就可以用存储型变量属性或可读可写的计算型属性来满足此要求，但是属性不能以常量属性或只读计算型属性实现。如果属性声明仅仅包含 `get` 关键字的话，它可以作为任意类型的属性被实现。关于如何实现协议中的属性要求的例子，请参阅 [属性要求](../chapter2/22_Protocols.md#property_requirements)

另请参阅 [变量声明](#variable_declaration)。

<a name="grammer_of_an_import_declaration"></a>
> 协议属性声明语法  
> <a name="protocol-property-declaration"></a>
> *协议属性声明* → [*变量声明头*](#variable-declaration-head) [*变量名称*](#variable-name) [*类型标注*](03_Types.md#type-annotation) [*getter-setter关键字代码块*](#getter-setter-keyword-block)  

<a name="protocol_method_declaration"></a>
### 协议方法声明

协议可以通过在协议声明主体中引入一个协议方法声明，来声明符合的类型必须实现的方法。协议方法声明和函数方法声明有着相同的形式，但有两项例外：它们不包括函数体，也不能包含默认参数。关于如何实现协议中的方法要求的例子，请参阅 [方法要求](../chapter2/22_Protocols.md#method_requirements)。

使用 `static` 声明修饰符可以在协议声明中声明一个类型方法。结构体实现这些方法时使用 `static` 声明修饰符，类在实现这些方法时，除了使用 `static` 声明修饰符，还可以选择使用 `class` 声明修饰符。通过扩展实现时亦是如此。

另请参阅 [函数声明](#function_declaration)。

<a name="grammer_of_a_protocol_declaration"></a>
> 协议方法声明语法  
> <a name="protocol-method-declaration"></a>
> *协议方法声明* → [*函数头*](#function-head) [*函数名*](#function-name) [*泛型形参子句*](08_Generic_Parameters_and_Arguments.md#generic-parameter-clause)<sub>可选</sub> [*函数签名*](#function-signature)  

<a name="protocol_initializer_declaration"></a>
### 协议构造器声明

协议可以通过在协议声明主体中引入一个协议构造器声明，来声明符合的类型必须实现的构造器。协议构造器声明
除了不包含实现主体外，和构造器声明有着相同的形式。

符合类型可以通过实现一个非可失败构造器或者 `init!` 可失败构造器来满足一个非可失败协议构造器的要求，可以通过实现任意类型的构造器来满足一个可失败协议构造器的要求。

类在实现一个构造器去满足一个协议的构造器要求时，如果这个类还没有用 `final` 声明修饰符标记，这个构造器必须用 `required` 声明修饰符标记。

另请参阅 [构造器声明](#initializer_declaration)。

<a name="grammer_of_a_protocol_initializer_declaration"></a>
> 协议构造器声明语法  
> <a name="protocol-initializer-declaration"></a>
> *协议构造器声明* → [*构造器头*](#initializer-head) [*泛型形参子句*](08_Generic_Parameters_and_Arguments.md#generic-parameter-clause)<sub>可选</sub> [*参数子句*](#parameter-clause)  **throws**<sub>可选</sub>  
> *协议构造器声明* → [*构造器头*](#initializer-head) [*泛型形参子句*](08_Generic_Parameters_and_Arguments.md#generic-parameter-clause)<sub>可选</sub> [*参数子句*](#parameter-clause)  **rethrows**

<a name="protocol_subscript_declaration"></a>
### 协议下标声明

协议可以通过在协议声明主体中引入一个协议下标声明，来声明符合的类型必须实现的下标。协议下标声明有一个特殊的下标声明形式：

```swift
subscript (参数列表) -> 返回类型 { get set }
```

下标声明只为符合类型声明了 getter 和 setter 要求。如果下标声明包含 `get` 和 `set` 关键字，符合类型也必须实现 getter 和 setter 子句。如果下标声明只包含 `get` 关键字，符合类型必须实现 getter 子句，可以选择是否实现 setter 子句。

另请参阅 [下标声明](#subscript_declaration)。

<a name="grammer_of_a_protocol_subscript_declaration"></a>
> 协议下标声明语法  
> <a name="protocol-subscript-declaration"></a>
> *协议下标声明* → [*下标头*](#subscript-head) [*下标结果*](#subscript-result) [*getter-setter关键字代码块*](#getter-setter-keyword-block)  

<a name="protocol_associated_type_declaration"></a>
### 协议关联类型声明

使用关键字 `associatedtype` 来声明协议关联类型。关联类型为作为协议声明的一部分，为某种类型提供了一个别名。关联类型和泛型参数子句中的类型参数很相似，但是它们和 `Self` 一样，用于协议中。`Self` 指代采纳协议的类型。要获得更多信息和例子，请参阅 [关联类型](../chapter2/23_Generics.md#associated_types)。

另请参阅 [类型别名声明](#type_alias_declaration)。

<a name="grammer_of_a_protocol_associated_type_declaration"></a>
> 协议关联类型声明语法  
> <a name="protocol-associated-type-declaration"></a>
> *协议关联类型声明* → [*类型别名头*](#typealias-head) [*类型继承子句*](03_Types.md#type-inheritance-clause)<sub>可选</sub> [*类型别名赋值*](#typealias-assignment)<sub>可选</sub>  

<a name="initializer_declaration"></a>
## 构造器声明

构造器声明会为程序中的类、结构体或枚举引入构造器。构造器使用关键字 `init` 来声明，有两种基本形式。

结构体、枚举、类可以有任意数量的构造器，但是类的构造器具有不同的规则和行为。不同于结构体和枚举，类有两种构造器，即指定构造器和便利构造器，请参阅 [构造过程](../chapter2/14_Initialization.md)。

采用如下形式声明结构体和枚举的构造器，以及类的指定构造器：

```swift
init(参数列表) {  
	构造语句
}  
```

类的指定构造器直接将类的所有属性初始化。它不能调用类中的其他构造器，如果类有超类，则必须调用超类的一个指定构造器。如果该类从它的超类继承了属性，必须在调用超类的指定构造器后才能修改这些属性。

指定构造器只能在类声明中声明，不能在扩展声明中声明。

结构体和枚举的构造器可以调用其他已声明的构造器，从而委托其他构造器来进行部分或者全部构造过程。

要为类声明一个便利构造器，用 `convenience` 声明修饰符来标记构造器声明：

```swift
convenience init(参数列表) {  
	构造语句
}  
```

便利构造器可以将构造过程委托给另一个便利构造器或一个指定构造器。但是，类的构造过程必须以一个将类中所有属性完全初始化的指定构造器的调用作为结束。便利构造器不能调用超类的构造器。

可以使用 `required` 声明修饰符，将便利构造器和指定构造器标记为每个子类都必须实现的构造器。这种构造器的子类实现也必须使用 `required` 声明修饰符标记。

默认情况下，超类中的构造器不会被子类继承。但是，如果子类的所有存储型属性都有默认值，而且子类自身没有定义任何构造器，它将继承超类的构造器。如果子类重写了超类的所有指定构造器，子类将继承超类的所有便利构造器。

和方法、属性和下标一样，需要使用 `override` 声明修饰符标记重写的指定构造器。

> 注意  
> 如果使用 `required` 声明修饰符标记一个构造器，在子类中重写这种构造器时，无需使用 `override` 修饰符。

就像函数和方法，构造器也可以抛出或者重抛错误，你可以在构造器参数列表的圆括号之后使用 `throws` 或 `rethrows` 关键字来表明相应的抛出行为。

关于在不同类型中声明构造器的例子，请参阅 [构造过程](../chapter2/14_Initialization.md)。

<a name="failable_initializers"></a>
### 可失败构造器

可失败构造器可以生成所属类型的可选实例或者隐式解包可选实例，因此，这种构造器通过返回 `nil` 来指明构造过程失败。

声明生成可选实例的可失败构造器时，在构造器声明的 `init` 关键字后加追加一个问号（`init?`）。声明生成隐式解包可选实例的可失败构造器时，在构造器声明后追加一个叹号（`init!`）。使用 `init?` 可失败构造器生成结构体的一个可选实例的例子如下。

```swift
struct SomeStruct {
	let string: String
	//生成一个 SomeStruct 的可选实例
	init?(input: String) {
		if input.isEmpty {
			// 丢弃 self，并返回 nil
			return nil
		}
		string = input
	}
}
```

调用 `init?` 可失败构造器和调用非可失败构造器的方式相同，不过你需要处理可选类型的返回值。

```swift
if let actualInstance = SomeStruct(input: "Hello") {
	// 利用 SomeStruct 实例做些事情
} else {
	// SomeStruct 实例的构造过程失败，构造器返回了 nil
}
```

可失败构造器可以在构造器实现中的任意位置返回 `nil`。

可失败构造器可以委托任意种类的构造器。非可失败可以委托其它非可失败构造器或者 `init!` 可失败构造器。非可失败构造器可以委托超类的 `init?` 可失败指定构造器，但是需要使用强制解包，例如 `super.init()!`。

构造过程失败通过构造器委托来传递。具体来说，如果可失败构造器委托的可失败构造器构造过程失败并返回 `nil`，那么该可失败构造器也会构造失败并隐式地返回 `nil`。如果非可失败构造器委托的 `init!` 可失败构造器构造失败并返回了 `nil`，那么会发生运行时错误（如同使用 `!` 操作符去强制解包一个值为 `nil` 的可选值）。

子类可以用任意种类的指定构造器重写超类的可失败指定构造器，但是只能用非可失败指定构造器重写超类的非可失败指定构造器。

更多关于可失败构造器的信息和例子，请参阅 [可失败构造器](../chapter2/14_Initialization.md#failable_initializers)。

<a name="grammer_of_an_initializer_declaration"></a>
> 构造器声明语法  
> <a name="initializer-declaration"></a>
> *构造器声明* → [*构造器头*](#initializer-head) [*泛型形参子句*](08_Generic_Parameters_and_Arguments.md#generic-parameter-clause)<sub>可选</sub> [*参数子句*](#parameter-clause) **throws**<sub>可选</sub> [*构造器主体*](#initializer-body)  
> *构造器声明* → [*构造器头*](#initializer-head) [*泛型形参子句*](08_Generic_Parameters_and_Arguments.md#generic-parameter-clause)<sub>可选</sub> [*参数子句*](#parameter-clause) **rethrows**<sub>可选</sub> [*构造器主体*](#initializer-body)  
> <a name="initializer-head"></a>
> *构造器头* → [*特性列表*](06_Attributes.md#attributes)<sub>可选</sub> [*声明修饰符列表*](#declaration-modifiers)<sub>可选</sub> **init**  
> *构造器头* → [*特性列表*](06_Attributes.md#attributes)<sub>可选</sub> [*声明修饰符列表*](#declaration-modifiers)<sub>可选</sub> **init** **?**  
> *构造器头* → [*特性列表*](06_Attributes.md#attributes)<sub>可选</sub> [*声明修饰符列表*](#declaration-modifiers)<sub>可选</sub> **init** **!**  
> <a name="initializer-body"></a>
> *构造器主体* → [*代码块*](#code-block)  

<a name="deinitializer_declaration"></a>
## 析构器声明

*析构器声明 (deinitializer declaration)* 可以为类声明一个析构器。析构器没有参数，遵循如下格式：

```swift
deinit {  
	语句
}
```

当没有任何强引用引用着类的对象，对象即将被释放时，析构器会被自动调用。析构器只能在类主体的声明中声明，不能在类的扩展声明中声明，并且每个类最多只能有一个析构器。

子类会继承超类的析构器，并会在子类对象将要被释放时隐式调用。继承链上的所有析构器全部调用完毕后子类对象才会被释放。

析构器不能直接调用。

关于如何在类声明中使用析构器的例子，请参阅 [析构过程](../chapter2/15_Deinitialization.md)。

<a name="grammer_of_a_deinitializer_declaration"></a>
> 析构器声明语法  
> <a name="deinitializer-declaration"></a>
> *析构器声明* → [*特性列表*](06_Attributes.md#attributes)<sub>可选</sub> **deinit** [*代码块*](#code-block)  

<a name="extension_declaration"></a>
## 扩展声明

*扩展声明 (extension declaration)* 可以扩展一个现存的类、结构体和枚举类型的行为。扩展声明使用关键字 `extension`，遵循如下格式：

```swift
extension 类型名称: 采纳的协议 {  
	声明语句
}
```

扩展声明体可包含零个或多个声明语句。这些声明语句可以包括计算型属性、计算型类型属性、实例方法、类型方法、构造器、下标声明，甚至其他结构体、类和枚举声明。扩展声明不能包含析构器、协议声明、存储型属性、属性观察器或其他扩展声明。关于扩展声明的详细讨论，以及各种扩展声明的例子，请参阅 [扩展](../chapter2/21_Extensions.md)。

扩展声明可以为现存的类、结构体、枚举添加协议一致性，但是不能为类添加超类，因此在扩展声明的类型名称的冒号后面仅能指定一个协议列表。

现存类型的属性、方法、构造器不能在扩展中被重写。

扩展声明可以包含构造器声明。这意味着，如果被扩展的类型在其他模块中定义，构造器声明必须委托另一个在那个模块中声明的构造器，以确保该类型能被正确地初始化。

<a name="grammer_of_an_extension_declaration"></a>
> 扩展声明语法  
> <a name="extension-declaration"></a>
> *扩展声明* → [访问级别修饰符](#access-level-modifier)<sub>可选</sub> **extension** [*类型标识符*](03_Types.md#type-identifier) [*类型继承子句*](03_Types.md#type-inheritance-clause)<sub>可选</sub> [*扩展主体*](#extension-body)  
> <a name="extension-body"></a>
> *扩展主体* → **{** [*多条声明*](#declarations)<sub>可选</sub> **}**  

<a name="subscript_declaration"></a>
## 下标声明

*下标声明 (subscript declaration)* 用于为特定类型的对象添加下标支持，通常也用于为访问集合、列表和序列中的元素提供语法便利。下标声明使用关键字 `subscript`，形式如下：

```swift
subscript (参数列表) -> 返回类型 {
	get {
		语句
	}
	set(setter 名称) {
		语句
	}
}
```

下标声明只能出现在类、结构体、枚举、扩展和协议的声明中。

参数列表指定一个或多个用于在相关类型的下标表达式中访问元素的索引（例如，表达式 `object[i]` 中的 `i`）。索引可以是任意类型，但是必须包含类型标注。返回类型指定了被访问的元素的类型。

和计算型属性一样，下标声明支持对元素的读写操作。getter 用于读取值，setter 用于写入值。setter 子句是可选的，当仅需要一个 getter 子句时，可以将二者都忽略，直接返回请求的值即可。但是，如果提供了 setter 子句，就必须提供 getter 子句。

圆括号以及其中的 setter 名称是可选的。如果提供了 setter 名称，它会作为 setter 的参数名称。如果不提供 setter 名称，那么 setter 的参数名称默认是 `value`。setter 名称的类型必须与返回类型相同。

可以重载下标，只要参数列表或返回类型不同即可。还可以重写继承自超类的下标，此时必须使用 `override` 声明修饰符声明被重写的下标。

同样可以在协议声明中声明下标，正如 [协议下标声明](#protocol_subscript_declaration) 中所述。

更多关于下标的信息和例子，请参阅 [下标](../chapter2/12_Subscripts.md)。

<a name="grammer_of_a_subscript_declaration"></a>
> 下标声明语法  
> <a name="subscript-declaration"></a>
> *下标声明* → [*下标头*](#subscript-head) [*下标结果*](#subscript-result) [*代码块*](#code-block)  
> *下标声明* → [*下标头*](#subscript-head) [*下标结果*](#subscript-result) [*getter-setter代码块*](#getter-setter-block)  
> *下标声明* → [*下标头*](#subscript-head) [*下标结果*](#subscript-result) [*getter-setter关键字代码块*](#getter-setter-keyword-block)  
> <a name="subscript-head"></a>
> *下标头* → [*特性列表*](06_Attributes.md#attributes)<sub>可选</sub> [*声明修饰符列表*](#declaration-modifiers)<sub>可选</sub> **subscript** [*参数子句*](#parameter-clause)  
> <a name="subscript-result"></a>
> *下标结果* → **->** [*特性列表*](06_Attributes.md#attributes)<sub>可选</sub> [*类型*](03_Types.md#type)   

<a name="operator_declaration"></a>
## 运算符声明

*运算符声明 (operator declaration)* 会向程序中引入中缀、前缀或后缀运算符，使用关键字 `operator` 来声明。

可以声明三种不同的缀性：中缀、前缀和后缀。运算符的缀性指定了运算符与其运算对象的相对位置。

运算符声明有三种基本形式，每种缀性各一种。运算符的缀性通过在 `operator` 关键字之前添加声明修饰符 `infix`，`prefix` 或 `postfix` 来指定。每种形式中，运算符的名字只能包含 [运算符](02_Lexical_Structure.md#operators) 中定义的运算符字符。

下面的形式声明了一个新的中缀运算符：

```swift
infix operator 运算符名称: 优先级组
```

中缀运算符是二元运算符，置于两个运算对象之间，例如加法运算符（`+`）位于表达式 `1 + 2` 的中间。

中缀运算符可以选择指定优先级组。如果没有为运算符设置优先级组,Swift会设置默认优先级组`DefaultPrecedence`,它的优先级比三目优先级`TernaryPrecedence`要高,更多内容参考[*优先级组声明*](#precedence_group_declaration_modifiers)  

下面的形式声明了一个新的前缀运算符：

```swift
prefix operator 运算符名称 {}
```

出现在运算对象前边的前缀运算符是一元运算符，例如表达式 `!a` 中的前缀非运算符（`!`）。

前缀运算符的声明中不指定优先级，而且前缀运算符是非结合的。

下面的形式声明了一个新的后缀运算符：

```swift
postfix operator 运算符名称 {}
```

紧跟在运算对象后边的后缀运算符是一元运算符，例如表达式 `a!` 中的后缀强制解包运算符（`!`）。

和前缀运算符一样，后缀运算符的声明中不指定优先级，而且后缀运算符是非结合的。

声明了一个新的运算符以后，需要实现一个跟这个运算符同名的函数来实现这个运算符。如果是实现一个前缀或者后缀运算符，也必须使用相符的 `prefix` 或者 `postfix` 声明修饰符标记函数声明。如果是实现中缀运算符，则不需要使用 `infix` 声明修饰符标记函数声明。关于如何实现一个新的运算符的例子，请参阅 [自定义运算符](../chapter2/25_Advanced_Operators.md#custom_operators)。

<a name="grammer_of_an_operator_declaration"></a>
> 运算符声明语法  

<a name="operator-declaration"></a>
> *运算符声明* → [*前缀运算符声明*](#prefix-operator-declaration) | [*后缀运算符声明*](#postfix-operator-declaration) | [*中缀运算符声明*](#infix-operator-declaration)  

<a name="prefix-operator-declaration"></a>
> *前缀运算符声明* → **prefix** **运算符** [*运算符*](02_Lexical_Structure.md#operator) **{** **}**  
> <a name="postfix-operator-declaration"></a>
> *后缀运算符声明* → **postfix** **运算符** [*运算符*](02_Lexical_Structure.md#operator) **{** **}**  
> <a name="infix-operator-declaration"></a>
> *中缀运算符声明* → **infix** **运算符** [*运算符*](02_Lexical_Structure.md#operator) **{** [*中缀运算符属性*](#infix-operator-attributes)<sub>可选</sub> **}**  

<a name="infix-operator-group"></a>
> *中缀运算符组* → [*优先级组名称*](#precedence-group-name)


<a name="precedence_group_declaration_modifiers"></a>

## 优先级组声明

*优先级组声明 (A precedence group declaration)* 会向程序的中缀运算符引入一个全新的优先级组。当没有用圆括号分组时,运算符优先级反应了运算符与它的操作数的关系的紧密程度。  
优先级组的声明如下所示:

```swift
precedencegroup 优先级组名称{
    higherThan: 较低优先级组的名称
    lowerThan: 较高优先级组的名称
    associativity: 结合性
    assignment: 赋值性
}
```  
较低优先级组和较高优先级组的名称说明了新建的优先级组是依赖于现存的优先级组的。 `lowerThan`优先级组的属性只可以引用当前模块外的优先级组。当两个运算符为同一个操作数竞争时,比如表达式`2 + 3 * 5`,优先级更高的运算符将优先参与运算。 

> 注意  
> 使用较低和较高优先级组相互联系的优先级组必须保持单一层次关系,但它们不必是线性关系。这意味着优先级组也许会有未定义的相关优先级。这些优先级组的运算符在没有用圆括号分组的情况下是不能紧邻着使用的。  

Swift定义了大量的优先级组来与标准库的运算符配合使用,例如相加(`+`)和相减(`-`)属于`AdditionPrecedence`组,相乘(`*`)和相除(`/`)属于` MultiplicationPrecedence`组,详细关于Swift标准库中一系列运算符和优先级组内容,参阅[Swift标准库操作符参考](https://developer.apple.com/reference/swift/1851035-swift_standard_library_operators)。  

运算符的结合性表示在没有圆括号分组的情况下,同样优先级的一系列运算符是如何被分组的。你可以指定运算符的结合性通过上下文关键字`left`、`right`或者`none`,如果没有指定结合性,默认是`none`关键字。左关联性的运算符是从左至右分组的,例如,相减操作符(-)是左关联性的,所以表达式`4 - 5 - 6`被分组为`(4 - 5) - 6`,得出结果-7。右关联性的运算符是从右往左分组的,指定为`none`结合性的运算符就没有结合性。同样优先级没有结合性的运算符不能相邻出现,例如`<`运算符是`none`结合性,那表示`1 < 2 < 3`就不是一个有效表达式。  

优先级组的赋值性表示在包含可选链操作时的运算符优先级。当设为true时,与优先级组对应的运算符在可选链操作中使用和标准库中赋值运算符同样的分组规则,当设为false或者不设置,该优先级组的运算符与不赋值的运算符遵循同样的可选链规则。

<a name="grammer_of_a_precedence_group_declaration"></a>
> 优先级组声明语法  

<a name="precedence-group-declaration"></a>
> *优先级组声明* → **precedence**[*优先级组名称*](#precedence-group-name){[*多优先级组属性*](#precedence-group-attributes)<sub>可选</sub> }   
<a name="precedence-group-attributes"></a>
> *优先级组属性* → [*优先级组属性*](#precedence-group-attribute)[*多优先级组属性*](#precedence-group-attributes)<sub>可选</sub> **{** **}**  
<a name="precedence-group-attribute"></a>
> *优先级组属性* → [*优先级组关系*](#precedence-group-relation)  
> *优先级组属性* → [*优先级组赋值性*](#precedence-group-assignment)  
> *优先级组属性* → [*优先级组相关性*](#precedence-group-associativity)  
> <a name="precedence-group-relation"></a>
> *优先级组关系* → **higherThan:**[*多优先级组名称*](#precedence-group-names)   
> *优先级组关系* → **lowerThan:**[*多优先级组名称*](#precedence-group-names)   
> <a name="precedence-group-assignment"></a>
> *优先级组赋值* → **assignment:**[*布尔字面值*](02_Lexical_Structure.md#boolean-literal)      
<a name="precedence-group-associativity"></a>
> *优先级组结合性* → **associativity:left**    
> *优先级组结合性* → **associativity:right**   
> *优先级组结合性* → **associativity:none**  
<a name="precedence-group-names"></a>
> *多优先级组名称* → [*优先级组名称*](#precedence-group-name) | [*优先级组名称*](#precedence-group-name) | [*优先级组名称*](#precedence-group-name)
<a name="precedence-group-name"></a>
> *优先级组名称* →[*标识符*](02_Lexical_Structure.md#identifier) 


## 声明修饰符

声明修饰符都是关键字或上下文相关的关键字，可以修改一个声明的行为或者含义。可以在声明的特性（如果存在）和引入该声明的关键字之间，利用声明修饰符的关键字或上下文相关的关键字指定一个声明修饰符。

`dynamic`

该修饰符用于修饰任何兼容 Objective-C 的类的成员。访问被 `dynamic` 修饰符标记的类成员将总是由 Objective-C 运行时系统进行动态派发，而不会由编译器进行内联或消虚拟化。

因为被标记 `dynamic` 修饰符的类成员会由 Objective-C 运行时系统进行动态派发，所以它们会被隐式标记 `objc` 特性。

`final`

该修饰符用于修饰类或类中的属性、方法以及下标。如果用它修饰一个类，那么这个类不能被继承。如果用它修饰类中的属性、方法或下标，那么它们不能在子类中被重写。

`lazy`

该修饰符用于修饰类或结构体中的存储型变量属性，表示该属性的初始值最多只被计算和存储一次，且发生在它被第一次访问时。关于如何使用 `lazy` 修饰符的例子，请参阅 [惰性存储型属性](../chapter2/10_Properties.md#lazy_stored_properties)。

`optional`

该修饰符用于修饰协议中的属性、方法以及下标成员，表示符合类型可以不实现这些成员要求。

只能将 `optional` 修饰符用于被 `objc` 特性标记的协议。这样一来，就只有类类型可以采纳并符合拥有可选成员要求的协议。关于如何使用 `optional` 修饰符，以及如何访问可选协议成员（比如，不确定符合类型是否已经实现了这些可选成员）的信息，请参阅 [可选协议要求](../chapter2/22_Protocols.md#optional_protocol_requirements)。

`required`

该修饰符用于修饰类的指定构造器或便利构造器，表示该类所有的子类都必须实现该构造器。在子类实现该构造器时，必须同样使用 `required` 修饰符修饰该构造器。

`weak`

该修饰符用于修饰变量或存储型变量属性，表示该变量或属性持有其存储的对象的弱引用。这种变量或属性的类型必须是可选的类类型。使用 `weak` 修饰符可避免强引用循环。关于 `weak` 修饰符的更多信息和例子，请参阅 [弱引用](../chapter2/16_Automatic_Reference_Counting.md#resolving_strong_reference_cycles_between_class_instances)。

<a name="access_control_levels"></a>
### 访问控制级别

Swift 提供了三个级别的访问控制：`public`、`internal` 和 `private`。可以使用以下任意一种访问级别修饰符来指定声明的访问级别。访问控制在 [访问控制](../chapter2/24_Access_Control.md) 中有详细讨论。

`public`

该修饰符表示声明可被同模块的代码访问，只要其他模块导入了声明所在的模块，也可以进行访问。

`internal`

该修饰符表示声明只能被同模块的代码访问。默认情况下，绝大多数声明会被隐式标记 `internal` 访问级别修饰符。

`private`

该修饰符表示声明只能被所在源文件的代码访问。

以上访问级别修饰符都可以选择带上一个参数，该参数由一对圆括号和其中的 `set` 关键字组成（例如，`private(set)`）。使用这种形式的访问级别修饰符来限制某个属性或下标的 setter 的访问级别低于其本身的访问级别，正如 [Getter 和 Setter](../chapter2/24_Access_Control.md#getters_and_setters) 中所讨论的。

<a name="grammer_of_a_declaration_modifier"></a>
> 声明修饰符的语法

<a name="declaration-modifier"></a>
> *声明修饰符* → **class** | **convenience**| **dynamic** | **final** | **infix** | **lazy** | **mutating** | **nonmutating** | **optional** | **override** | **postfix** | **prefix** | **required** | **static** | **unowned** | **unowned ( safe )** | **unowned ( unsafe )** | **weak**  
> 声明修饰符 → [*访问级别修饰符*](#access-level-modifier)  
> <a name="declaration-modifiers"></a>
> *声明修饰符列表* → [*声明修饰符*](#declaration-modifier) [*声明修饰符列表*](#declaration-modifiers)<sub>可选</sub>

<a name="access-level-modifier"></a>
>访问级别修饰符 → **internal** | **internal ( set )**  
>访问级别修饰符 → **private** | **private ( set )**  
>访问级别修饰符 → **public** | **public ( set )**  
