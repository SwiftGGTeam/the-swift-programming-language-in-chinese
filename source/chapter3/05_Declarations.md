<a name="declarations"></a>
# 声明（Declarations）
-----------------

> 1.0
> 翻译：[marsprince](https://github.com/marsprince) [Lenhoon](https://github.com/marsprince)[(微博)](http://www.weibo.com/lenhoon)
> 校对：[numbbbbb](https://github.com/numbbbbb), [stanzhai](https://github.com/stanzhai)

> 2.0
> 翻译+校对：[Lenhoon](https://github.com/Lenhoon),
> [BridgeQ](https://github.com/WXGBridgeQ)

本页包含内容：

- [顶级代码](#top-level_code)
- [代码块](#code_blocks)
- [引入声明](#import_declaration)
- [常量声明](#constant_declaration)
- [变量声明](#variable_declaration)
- [类型的别名声明](#type_alias_declaration)
- [函数声明](#function_declaration)
- [枚举声明](#enumeration_declaration)
- [结构体声明](#structure_declaration)
- [类声明](#class_declaration)
- [协议声明](#protocol_declaration)
- [构造器声明](#initializer_declaration)
- [析构声明](#deinitializer_declaration)
- [扩展声明](#extension_declaration)
- [下标脚本声明](#subscript_declaration)
- [运算符声明](#operator_declaration)
- [声明修饰符](#declaration_modifiers)

一条*声明(declaration)*可以在程序里引入新的名字或者构造。举例来说，可以使用声明来引入函数和方法，变量和常量，或者来定义新的命名好的枚举，结构，类和协议类型。可以使用一条声明来延长一个已经存在的命名好的类型的行为。或者在程序里引入在其它地方声明的符号。

在Swift中，大多数声明在某种意义上讲也是执行或同时声明它们的初始化定义。这意味着，因为协议和它们的成员不匹配，大多数协议成员需要单独的声明。为了方便起见，也因为这些区别在Swift里不是很重要，*声明语句(declaration)*同时包含了声明和定义。

> 声明语法  
> *声明* → [*导入声明*](#grammer_of_an_import_declaration)  
> *声明* → [*常量声明*](#grammer_of_a_constant_declaration)  
> *声明* → [*变量声明*](#grammer_of_a_variable_declaration)  
> *声明* → [*类型别名声明*](#grammer_of_a_type_alias_declaration)  
> *声明* → [*函数声明*](#grammer_of_a_function_declaration)  
> *声明* → [*枚举声明*](#grammer_of_a_enumeration_declaration)  
> *声明* → [*结构体声明*](#grammer_of_a_structure_declaration)  
> *声明* → [*类声明*](#grammer_of_a_class_declaration)  
> *声明* → [*协议声明*](#grammer_of_a_protocol_declaration)  
> *声明* → [*构造器声明*](#grammer_of_an_initializer_declaration)  
> *声明* → [*析构器声明*](#grammer_of_a_deinitializer_declaration)  
> *声明* → [*扩展声明*](#grammer_of_an_extension_declaration)  
> *声明* → [*附属脚本声明*](#grammer_of_a_subscript_declaration)  
> *声明* → [*运算符声明*](#grammer_of_an_operator_declaration)  
> *声明(Declarations)列表* → [*声明*](#declaration) [*声明(Declarations)列表*](#declarations) _可选_    

<a name="top-level_code"></a>
##顶级代码

Swift的源文件中的顶级代码由零个或多个语句，声明和表达式组成。默认情况下，在一个源文件的顶层声明的变量，常量和其他命名的声明语句可以被同一模块部分里的每一个源文件中的代码访问。可以通过使用一个访问级别修饰符来标记这个声明，从而重写这个默认行为，[访问控制级别(Access Control Levels)](#access_control_levels)中有所介绍。

> 顶级(Top Level) 声明语法  
> *顶级声明* → [*多条语句(Statements)*](TODO) _可选_  

<a name="code_blocks"></a>
##代码块

*代码块*用来将一些声明和控制结构的语句组织在一起。它有如下的形式：

> {  
>     `statements`  
> }  

代码块中的*语句(statements)*包括声明，表达式和各种其他类型的语句，它们按照在源码中的出现顺序被依次执行。

> 代码块语法  
> *代码块* → **{** [*多条语句(Statements)*](TODO) _可选_ **}**  

<a name="import_declaration"></a>
##引入声明

可以使用在其他文件中声明的内容*引入声明(import declaration)*。引入语句的基本形式是引入整个代码模块；它由`import`关键字开始，后面
紧跟一个模块名：

> import `module`

可以提供更多的细节来限制引入的符号，如声明一个特殊的子模块或者在一个模块或子模块中做特殊的声明。（待改进）
当使用了这些细节后，在当前的程序汇总只有引入的符号是可用的（并不是声明的整个模块）。

> import `import kind` `module`.`symbol name`  
> import `module`.`submodule`  

<a name="grammer_of_an_import_declaration"></a>
> 导入(Import)声明语法  
> *导入声明* → [*特性(attributes)列表*](TODO) _可选_ **import** [*导入类型*](../chapter3/05_Declarations.html#import_kind) _可选_ [*导入路径*](../chapter3/05_Declarations.html#import_path)  
> *导入类型* → **typealias** | **struct** | **class** | **enum** | **protocol** | **var** | **func**  
> *导入路径* → [*导入路径标识符*](../chapter3/05_Declarations.html#import_path_identifier) | [*导入路径标识符*](../chapter3/05_Declarations.html#import_path_identifier) **.** [*导入路径*](../chapter3/05_Declarations.html#import_path)  
> *导入路径标识符* → [*标识符*](TODO) | [*运算符*](TODO)  

<a name="constant_declaration"></a>
##常量声明

*常量声明(constant declaration)*可以在程序里命名一个常量。常量以关键词`let`来声明，遵循如下的格式:

> let `constant name`: `type` = `expression`

当常量的值被给定后，常量就将*常量名称(constant name)*和*表达式(expression)*初始值不变的结合在了一起，而且不能更改。

这意味着如果常量以类的形式被初始化，类本身的内容是可以改变的，但是常量和类之间的结合关系是不能改变的。

当一个常量被声明为全局变量，它必须被给定一个初始值。当一个常量在类或者结构体中被声明时，它被认为是一个*常量属性(constant property)*。常量并不是可计算的属性，因此不包含getters和setters。

如果*常量名(constant name)*是一个元组形式，元组中的每一项初始化*表达式(expression)*中都要有对应的值。

```swift
let (firstNumber, secondNumber) = (10, 42)
```

在上例中，`firstNumber`是一个值为`10`的常量，`secnodeName`是一个值为`42`的常量。所有常量都可以独立的使用：

```swift
println("The first number is /(firstNumber).")
// prints "The first number is 10."
println("The second number is /(secondNumber).")
// prints "The second number is 42."
```

当*常量名称(constant name)*的类型可以被推断出时，类型标注*（:type）*在常量声明中是一个可选项，它可以用来描述在[类型推断(Type Inference)](TODO)中找到的类型。

声明一个常量类型属性要使用关键字`static`声明修饰符。类型属性在[类型属性(Type Properties)](TODO)中有介绍。

如果还想获得更多关于常量的信息或者想在使用中获得帮助，请查看[常量和变量(Constants and Variables)](TODO)和[存储属性(Stored Properties)](TODO)等节。

<a name="grammer_of_a_constant_declaration"></a>
> 常数声明语法  
> *常量声明* → [*特性(Attributes)列表*](../chapter3/06_Attributes.html#attributes) _可选_ [*声明修饰符(Specifiers)列表*](../chapter3/05_Declarations.html#declaration_specifiers) _可选_ **let** [*模式构造器列表*](../chapter3/05_Declarations.html#pattern_initializer_list)  
> *模式构造器列表* → [*模式构造器*](../chapter3/05_Declarations.html#pattern_initializer) | [*模式构造器*](../chapter3/05_Declarations.html#pattern_initializer) **,** [*模式构造器列表*](../chapter3/05_Declarations.html#pattern_initializer_list)  
> *模式构造器* → [*模式*](../chapter3/07_Patterns.html#pattern) [*构造器*](../chapter3/05_Declarations.html#initializer) _可选_  
> *构造器* → **=** [*表达式*](../chapter3/04_Expressions.html#expression)  

<a name="variable_declaration"></a>
##变量声明

*变量声明(variable declaration)*可以在程序里声明一个变量，它以关键字`var`来声明。

变量声明有几种不同的形式声明不同种类的命名值和计算型值，如存储和计算变量和属性，存储变量和属性监视，和静态变量属性。所使用的声明形式取决于变量所声明的范围和打算声明的变量类型。

>注意：  
>也可以在协议声明的上下文声明属性，详情参见[协议属性声明(Protocal Property Declaration)](TODO)。

可以重载一个子类中的属性，通过使用'override'声明修饰符来标记子类的属性声明，[重写(Overriding)](TODO)中有所介绍。

<a name="stored_variables_and_stored_variable_properties"></a>
###存储型变量和存储型属性

下面的形式声明了一个存储型变量或存储型变量属性

> var `variable name`: `type` = `expression`

可以在全局，函数内，或者在类和结构体的声明(context)中使用这种形式来声明一个变量。当变量以这种形式
在全局或者一个函数内被声明时，它代表一个*存储型变量(stored variable)*。当它在类或者结构体中被声明时，它代表一个*存储型变量属性(stored variable property)*。

初始化的*表达式（expression）*不可以在协议的声明中出现，在其他情况下，初始化*表达式(expression)*是可选的（optional），如果没有初始化*表达式(expression)*，那么变量定义时必须显示包括类型标注（*:type*)

对于常量的定义，如果*变量名字（variable name）*是一个元组（tuple），元组中每一项的名称都要和初始化*表达式(expression)*中的相应值一致。

正如名字一样，存储型变量的值或存储型变量属性存储在内存中。

<a name="computed_variables_and_computed_properties"></a>
###计算型变量和计算型属性

如下形式声明一个一个存储型变量或存储型属性：

> var `variable name`: `type` {  
> get {  
>     `statements`  
> }  
> set(`setter name`) {  
>     `statements`  
> }  
> }  

可以在全局，函数体内或者类，结构体，枚举，扩展声明的上下文中使用这种形式的声明。当变量以这种形式在全局或者一个函数内被声明时，它代表一个*计算型变量(computed variable)*。当它在类，结构体，枚举，扩展声明的上下文中中被声明时，它代表一个*计算型变量(computed variable)*。

getter用来读取变量值，setter用来写入变量值。setter子句是可选择的，只有getter是必需的，可以将这些语句
都省略，只是简单的直接返回请求值，正如在[只读计算属性(Read-Only Computed Properties)](TODO)中描述的那样。但是如果提供了一个setter语句，也必需提供一个getter语句。

setter的名字和圆括号内的语句是可选的。如果写了一个setter名，它就会作为setter的参数被使用。如果不写setter名，setter的初始名为'newValue'，正如在[setter声明速记(Shorthand Setter Declaration)](TODO)中提到的那样。

不像存储型变量和存储型属性那样，计算型属性和计算型变量的值不存储在内存中。

获得更多信息，查看更多关于计算型属性的例子，请查看[计算型属性(Computed Properties)](TODO)一节。

<a name="stored_variable_observers_and_property_observers"></a>
###存储型变量监视器和属性监视器

可以用`willset`和`didset`监视器来声明一个存储型变量或属性。一个包含监视器的存储型变量或属性按如下的形式声明：

> var `variable name`: `type` = expression {  
> willSet(setter name) {  
>     `statements`  
> }  
> didSet(`setter name`) {  
>     `statements`  
> }  
> }  

可以在全局，函数体内或者类，结构体，枚举，扩展声明的上下文中使用这种形式的声明。当变量以这种形式在全局或者一个函数内被声明时，监视器代表一个*存储型变量监视器(stored variable observers)*；当它在类，结构体，枚举，扩展声明的上下文中被声明时，监视器代表*属性监视器(property observers)*。

可以为适合的监视器添加任何存储型属性。也可以通过重写子类属性的方式为适合的监视器添加任何继承的属性
(无论是存储型还是计算型的)，参见[重写属性监视器(Overriding Property Observers)](TODO)。

初始化*表达式(expression)*在一个类中或者结构体的声明中是可选的，但是在其他地方是必需的。当类型可以从初始化*表达式(expression)*中推断而来，那么这个*类型(type)*标注是可选的。

当变量或属性的值被改变时，`willset`和`didset`监视器提供了一个监视方法（适当的回应）。
监视器不会在变量或属性第一次初始化时运行，它们只有在值被外部初始化语句改变时才会被运行。

`willset`监视器只有在变量或属性值被改变之前运行。新的值作为一个常量经过过`willset`监视器，因此不可以在`willset`语句中改变它。`didset`监视器在变量或属性值被改变后立即运行。和`willset`监视器相反，为了以防止仍然需要获得旧的数据，旧变量值或者属性会经过`didset`监视器。这意味着，如果在变量或属性自身的`didiset`监视器语句中设置了一个值，设置的新值会取代刚刚在`willset`监视器中经过的那个值。

在`willset`和`didset`语句中，*setter名(setter name)*和圆括号的语句是可选的。如果写了一个setter名，它就会作为`willset`和`didset`的参数被使用。如果不写setter名，
`willset`监视器初始名为`newvalue`，`didset`监视器初始名为`oldvalue`。

当提供一个`willset`语句时，`didset`语句是可选的。同样的，在提供了一个`didset`语句时，`willset`语句是可选的。

获得更多信息，查看如何使用属性监视器的例子，请查看[属性监视器(Property Observers)](TODO)一节。
声明修饰符

<a name="type_variable_properties"></a>
###类型变量属性

声明一个类型变量属性，要用`static`声明修饰符标记该声明。类可能需要`class`声明修饰符去标记类的类型计算型属性从而允许子类可以重写超类的实现。类型属性在[类型属性(Type Properties)](TODO)章节讨论。

>>注意
>>
>在一个类声明中，关键字`static`与用声明修饰符`class`和`final`去标记一个声明的效果相同

<a name="grammer_of_a_variable_declaration"></a>
> 变量声明语法  
> *变量声明* → [*变量声明头(Head)*](../chapter3/05_Declarations.html#variable_declaration_head) [*模式构造器列表*](../chapter3/05_Declarations.html#pattern_initializer_list)  
> *变量声明* → [*变量声明头(Head)*](../chapter3/05_Declarations.html#variable_declaration_head) [*变量名*](../chapter3/05_Declarations.html#variable_name) [*类型标注*](../chapter3/03_Types.html#type_annotation) [*代码块*](../chapter3/05_Declarations.html#code_block)  
> *变量声明* → [*变量声明头(Head)*](../chapter3/05_Declarations.html#variable_declaration_head) [*变量名*](../chapter3/05_Declarations.html#variable_name) [*类型标注*](../chapter3/03_Types.html#type_annotation) [*getter-setter块*](../chapter3/05_Declarations.html#getter_setter_block)  
> *变量声明* → [*变量声明头(Head)*](../chapter3/05_Declarations.html#variable_declaration_head) [*变量名*](../chapter3/05_Declarations.html#variable_name) [*类型标注*](../chapter3/03_Types.html#type_annotation) [*getter-setter关键字(Keyword)块*](../chapter3/05_Declarations.html#getter_setter_keyword_block)   
> *变量声明* → [*变量声明头(Head)*](../chapter3/05_Declarations.html#variable_declaration_head) [*变量名*](../chapter3/05_Declarations.html#variable_name) [*构造器*](../chapter3/05_Declarations.html#initializer) [*willSet-didSet代码块*](../chapter3/05_Declarations.html#willSet_didSet_block)   
> *变量声明* → [*变量声明头(Head)*](../chapter3/05_Declarations.html#variable_declaration_head) [*变量名*](../chapter3/05_Declarations.html#variable_name) [*类型标注*](../chapter3/03_Types.html#type_annotation) [*构造器*](../chapter3/05_Declarations.html#initializer) _可选_ [*willSet-didSet代码块*](../chapter3/05_Declarations.html#willSet_didSet_block)  
> *变量声明头(Head)* → [*特性(Attributes)列表*](../chapter3/06_Attributes.html#attributes) _可选_ [*声明修饰符(Specifiers)列表*](../chapter3/05_Declarations.html#declaration_specifiers) _可选_ **var**  
> *变量名称* → [*标识符*](LexicalStructure.html#identifier)  
> *getter-setter块* → **{** [*getter子句*](../chapter3/05_Declarations.html#getter_clause) [*setter子句*](../chapter3/05_Declarations.html#setter_clause) _可选_ **}**  
> *getter-setter块* → **{** [*setter子句*](../chapter3/05_Declarations.html#setter_clause) [*getter子句*](../chapter3/05_Declarations.html#getter_clause) **}**  
> *getter子句* → [*特性(Attributes)列表*](../chapter3/06_Attributes.html#attributes) _可选_ **get** [*代码块*](../chapter3/05_Declarations.html#code_block)  
> *setter子句* → [*特性(Attributes)列表*](../chapter3/06_Attributes.html#attributes) _可选_ **set** [*setter名称*](../chapter3/05_Declarations.html#setter_name) _可选_ [*代码块*](../chapter3/05_Declarations.html#code_block)  
> *setter名称* → **(** [*标识符*](LexicalStructure.html#identifier) **)**  
> *getter-setter关键字(Keyword)块* → **{** [*getter关键字(Keyword)子句*](../chapter3/05_Declarations.html#getter_keyword_clause) [*setter关键字(Keyword)子句*](../chapter3/05_Declarations.html#setter_keyword_clause) _可选_ **}**  
> *getter-setter关键字(Keyword)块* → **{** [*setter关键字(Keyword)子句*](../chapter3/05_Declarations.html#setter_keyword_clause) [*getter关键字(Keyword)子句*](../chapter3/05_Declarations.html#getter_keyword_clause) **}**  
> *getter关键字(Keyword)子句* → [*特性(Attributes)列表*](../chapter3/06_Attributes.html#attributes) _可选_ **get**  
> *setter关键字(Keyword)子句* → [*特性(Attributes)列表*](../chapter3/06_Attributes.html#attributes) _可选_ **set**  
> *willSet-didSet代码块* → **{** [*willSet子句*](../chapter3/05_Declarations.html#willSet_clause) [*didSet子句*](../chapter3/05_Declarations.html#didSet_clause) _可选_ **}**  
> *willSet-didSet代码块* → **{** [*didSet子句*](../chapter3/05_Declarations.html#didSet_clause) [*willSet子句*](../chapter3/05_Declarations.html#willSet_clause) **}**  
> *willSet子句* → [*特性(Attributes)列表*](../chapter3/06_Attributes.html#attributes) _可选_ **willSet** [*setter名称*](../chapter3/05_Declarations.html#setter_name) _可选_ [*代码块*](../chapter3/05_Declarations.html#code_block)  
> *didSet子句* → [*特性(Attributes)列表*](../chapter3/06_Attributes.html#attributes) _可选_ **didSet** [*setter名称*](../chapter3/05_Declarations.html#setter_name) _可选_ [*代码块*](../chapter3/05_Declarations.html#code_block)  

<a name="type_alias_declaration"></a>
##类型的别名声明

*类型别名声明(type alias declaration)*可以在程序里为一个已存在的类型声明一个别名。类型的别名声明语句使用关键字`typealias`声明，遵循如下的形式：

> `typealias name` = `existing type`

当声明一个类型的别名后，可以在程序的任何地方使用别*名(name)*来代替*已存在的类型(existing type)*。已存在的类型可以是已经被命名的类型或者是混合类型。类型的别名不产生新的类型，它只是简单的和已存在的类型做名称替换。

查看更多[协议关联类型声明(Protocol Associated Type Declaration)](TODO).

<a name="grammer_of_a_type_alias_declaration"></a>
> 类型别名声明语法  
> *类型别名声明* → [*类型别名头(Head)*](../chapter3/05_Declarations.html#typealias_head) [*类型别名赋值*](../chapter3/05_Declarations.html#typealias_assignment)  
> *类型别名头(Head)* → [*属性列表*](todo) _可选_ [*访问级别修饰符*]((TODO) _可选_ **typealias** [*类型别名名称*](../chapter3/05_Declarations.html#typealias_name)  
> *类型别名名称* → [*标识符*](LexicalStructure.html#identifier)  
> *类型别名赋值* → **=** [*类型*](../chapter3/03_Types.html#type)  

<a name="function_declaration"></a>
##函数声明

使用*函数声明(function declaration)*在程序里引入新的函数或者方法。一个函数被声明在类的上下文，结构体，枚举，或者协议中，从而作为*方法(method)*被引用。
函数声明使用关键字`func`，遵循如下的形式：

> func `function name`(`parameters`) -> `return type` {  
>     `statements`  
> }  

如果函数返回`Void`类型，返回类型可以被忽略，如下所示：

> func `function name`(`parameters`) {  
>     `statements`  
> }  

每个参数的类型都要标明，它们不能被推断出来。虽然函数的参数默认是常量，也可以使用参数名前使用`let`来强调这一行为。在这些参数前面添加`var`使它们成为变量，作用域内任何对变量的改变只在函数体内有效，或者用`inout`使的这些改变可以在调用域内生效。更多关于in-out参数的讨论，参见[In-Out参数(In-Out Parameters)](TODO)

函数可以使用元组类型作为返回值来返回多个变量。

函数定义可以出现在另一个函数声明内。这种函数被称作nested函数。更多关于*嵌套函数(Nested Functions)*的讨论，参见[嵌套函数(Nested Functions)](TODO)。

<a name="parameter_names"></a>
###参数名

函数的参数是一个以逗号分隔的列表 。函数调用是的变量顺序必须和函数声明时的参数顺序一致。
最简单的参数列表有着如下的形式：

> `parameter name`: `parameter type`

一个参数有一个内部名称，这个内部名称可以在函数体内被使用。同样也可以作为外部名称，当调用方法时这个外部名称被作为实参的标签来使用。默认情况下，第一个参数的外部名称省略不写，第二个和其之后的参数使用它们的内部名称作为它们的外部名称。

```swift
func f(x: Int, y: Int) -> Int{ return x + y}
f(1, y: 2) // y是有标记的，x没有
```

可以按如下的一种形式，重写参数名被使用的默认过程：

> `external parameter name` `local parameter name`: `parameter type`    
> _ `local parameter name`: `parameter type`  

在内部参数名前的名称赋予这个参数一个外部名称，这个名称可以和内部参数的名称不同。外部参数名在函数被调用时必须被使用。对应的参数在方法或函数被调用时必须有外部名 。

内部参数名前的强调字符下划线(_)使参数在函数被调用时没有名称。在函数或方法调用时，与其对应的语句必须没有名字。

```swift
func f(x x: Int, withY y: Int, _z: Int) -> Int{
	return x + y + z }
f(x: 1, withY: 2, 3) // x和y是有标记的，z没有
```

<a name="special_kinds_of_parameters"></a>
###特殊类型的参数

参数可以被忽略，参数的值的数量可变，并且还可以提供默认值，使用形式如下：

> _ : `parameter type`.  
> `parameter name`: `parameter type`...  
> `parameter name`: `parameter type` = `default argument value`  

以下划线(_)命名的参数是明确忽略的，在函数体内不能被访问。

一个以基础类型名的参数，如果紧跟着三个点(`...`)，被理解为是可变参数。一个函数至多可以拥有一个可变参数，且必须是最后一个参数。可变参数被作为该基本类型名的数组来看待。举例来讲，可变参数`Int...`被看做是`[Int]`。查看可变参数的使用例子，详见[可变参数(Variadic Parameters)](TODO)一节。

在参数的类型后面有一个以等号(`=`)连接的表达式，这样的参数被看做有着给定表达式的初始值。当函数被调用时，给定的表达式被求值。如果参数在函数调用时被省略了，就会使用初始值。

```swift
func f(x: Int = 42) -> Int { return x}
f()  // 有效的，使用默认值
f(7) // 有效的，提供了值，没有提供值的名称
f(x: 7) //无效的，值和值的名称都提供了
```
<a name="special_kinds_of_methods"></a>
###特殊方法

枚举或结构体的方法来修改`self`属性，必须以`mutating`声明修饰符标记。

子类方法重写超类中的方法必须以`override`声明修饰符标记。重写一个方法不使用`override`修饰符，或者使用了`override`修饰符却并没有重写超类方法都会产生一个编译时错误。

枚举或者结构体中的类型方法而不是实例方法，要以`static`声明修饰符标记，而对于类中的类型方法，要使用`class`声明修饰符标记。

<a name="curried_functions"></a>
###柯里化函数(Curried Functions)

可以重写一个带有多个参数的函数使它等同于一个只有一个参数并且返回一个函数的函数，这个返回函数携带下一个参数并且返回另外一个函数，一直持续到再没有剩余的参数，此时要返回的函数返回原来的多参函数要返回的原始值。这个重写的函数被称为*柯里化函数(curried function)*。例如，可以为`addTwoInts(a:b:)`重写一个等价的`addTwoIntsCurried(a:)(b:)`的函数。

```swift
func addTwoInts(a: Int, b: Int) -> Int {
    return a + b
}

func addTwoIntsCurried(a: Int) -> (Int -> Int) {
    func addTheOtherInt(b: Int) -> Int {
        return a + b
    }
    return addTheOtherInt
}
```

这个`addTwoInts(a:b:)`函数带有两个整型值并且返回他们的和。`addTwoIntsCurried(a:)(b:)`函数带有一个整型值，并且返回另外一个带有第二个整型值的函数并使其和第一个整型值相加（这个内嵌的函数从包含它的函数中捕获第一个整型参数的值）。

在Swift中，可以通过以下语法非常简明的写一个柯里化函数：

> func `function name`(`parameter`)(`parameter`) -> `return type` {  
> `statements`  
> }  

举例来说，下面的两个声明是等价的:

```swift
func addTwoIntsCurried(a a: Int)(b: Int) -> Int {
    return a + b
}

func addTwoIntsCurried(a a: Int) -> (Int -> Int) 
			{
    func addTheOtherInt(b: Int) -> Int {
        return a + b
    }
    return addTheOtherInt
}
```

为了像使用非柯里化函数一样的方式使用`addTwoIntsCurried(a:)(b:)`函数，必须用第一个整型参数调用`addTwoIntsCurried(a:)(b:)`,紧接着用第二个整型参数调用其返回的函数：

```swift
addTwoInts(a: 4, b: 5)
//返回值为9
addTwoIntsCurried(a: 4)(b: 5)
//返回值为9
```

虽然在每次调用一个非柯里化函数时必须提供所有的参数，可以使用函数的柯里化形式把参数分配在多次函数调用中，称之为“*偏函数应用(partial function application)*”，例如可以为`addTwoIntsCurried(a:)(b:)`函数使用参数`1`然后把返回的结果赋值给常量`plusOne`：

```swift
let plusOne = addTwoIntsCurried(a: 1)
// plusOne 是类型为 Int -> Int的函数
```

因为`plusOne`是函数`addTwoIntsCurried(a:)(b:)`绑定参数为`1`时结果，所以可以调用`plusOne`并且传入一个整型使其和`1`相加。

```swift
plusOne(10)
// 返回值为11
```

<a name="throwing_functions_and_methods"></a>
###抛出异常函数和抛出异常方法(Throwing Functions and Methods)

可以抛出一个错误的函数或方法必需使用`throws`关键字标记。这些函数和方法被称为*抛出异常函数(throwing functions)*和*抛出异常方法(throwing methods)*。它们有着下面的形式:

>	func `function name`(`parameters`) throws ->
>		`return type`	{
>			`statements`
>		}

调用一个抛出异常函数或抛出异常方法必需用一个`try`或者`try!`表达式来封装（也就是说，在一个范围内使用一个`try`或者`try!`运算符）。

`throws`关键字是函数的类型的一部分，不抛出异常的函数是抛出异常函数的一个子类型。所以，可以在使用抛出异常函数的地方使用不抛出异常函数。对于柯里化函数，`throws`关键字仅运用于最内层的函数。

不能重写一个仅基于是否能抛出错误的函数。也就是说，可以重载一个基于函数*参数(parameter)*能否抛出一个错误的函数。

一个抛出异常的方法不能重写一个不能抛出异常的方法，而且一个异常抛出方法不能满足一个协议对于不抛出异常方法的需求。也就是说，一个不抛出异常的方法可以重写一个抛出异常的方法，而且一个不抛出异常的方法可以满足一个协议对于抛出异常的需求。

<a name="rethrowing_functions_and_methods"></a>
###重抛出异常函数和重抛出异常方法(Rethrowing Functions and Methods)

一个函数或方法可以使用`rethrows`关键字来声明，从而表明仅当这个函数或方法的一个函数参数抛出错误时这个函数或方法才抛出错误。这些函数和方法被称为*重抛出异常函数(rethrowing functions)*和*重抛出异常方法(rethrowing methods)*。重抛出异常函数或方法必需有至少一个抛出异常函数参数。

```
	func functionWithCallback(callback: () throws -> Int) rethrows {
		try callback()
	}
```
一个抛出异常函数方法不能重写一个重抛出异常函数方法，一个抛出异常方法不能满足一个协议对于重抛出异常方法的需求。也就是说，一个重抛出异常方法可以重写一个抛出异常方法，而且一个重抛出异常方法可以满足一个协议对于抛出异常方法的需求。

<a name="grammer_of_a_function_declaration"></a>
> 函数声明语法  
> *函数声明* → [*函数头*](../chapter3/05_Declarations.html#function_head) [*函数名*](../chapter3/05_Declarations.html#function_name) [*泛型参数子句*](GenericParametersAndArguments.html#generic_parameter_clause) _可选_ [*函数签名(Signature)*](../chapter3/05_Declarations.html#function_signature) [*函数体*](../chapter3/05_Declarations.html#function_body)  
> *函数头* → [*特性(Attributes)列表*](../chapter3/06_Attributes.html#attributes) _可选_ [*声明修饰符(Specifiers)列表*](../chapter3/05_Declarations.html#declaration_specifiers) _可选_ **func**  
> *函数名* → [*标识符*](LexicalStructure.html#identifier) | [*运算符*](LexicalStructure.html#operator)  
> *函数签名(signature)* → [*parameter-clauses*](../chapter3/05_Declarations.html#parameter_clauses) **throws** [*函数结果*](../chapter3/05_Declarations.html#function_result) _可选_  
> *函数签名(signature)* → [*parameter-clauses*](../chapter3/05_Declarations.html#parameter_clauses) **rethrows** [*函数结果*](../chapter3/05_Declarations.html#function_result) _可选_  
> *函数结果* → **->** [*特性(Attributes)列表*](../chapter3/06_Attributes.html#attributes) _可选_ [*类型*](../chapter3/03_Types.html#type)  
> *函数体* → [*代码块*](../chapter3/05_Declarations.html#code_block)  
> *parameter-clauses* → [*参数子句*](../chapter3/05_Declarations.html#parameter_clause) [*parameter-clauses*](../chapter3/05_Declarations.html#parameter_clauses) _可选_  
> *参数子句* → **(** **)** | **(** [*参数列表*](../chapter3/05_Declarations.html#parameter_list) **...** _可选_ **)**  
> *参数列表* → [*参数*](../chapter3/05_Declarations.html#parameter) | [*参数*](../chapter3/05_Declarations.html#parameter) **,** [*参数列表*](../chapter3/05_Declarations.html#parameter_list)  
> *参数* → **inout** _可选_ **let** _可选_ [*外部参数名*](../chapter3/05_Declarations.html#parameter_name)_可选_ [*内部参数名*](../chapter3/05_Declarations.html#local_parameter_name) [*类型标注*](../chapter3/03_Types.html#type_annotation) [*默认参数子句*](../chapter3/05_Declarations.html#default_argument_clause) _可选_  
> *参数* → **inout** _可选_ **var** [*外部参数名*](../chapter3/05_Declarations.html#parameter_name) [*内部参数名*](../chapter3/05_Declarations.html#local_parameter_name) [*类型标注*](../chapter3/03_Types.html#type_annotation) [*默认参数子句*](../chapter3/05_Declarations.html#default_argument_clause) _可选_  
> *参数* → [*特性(Attributes)列表*](../chapter3/06_Attributes.html#attributes) _可选_ [*类型*](../chapter3/03_Types.html#type)  
> *参数名* → [*标识符*](LexicalStructure.html#identifier) | **_**  
> *内部参数名* → [*标识符*](LexicalStructure.html#identifier) | **_**  
> *默认参数子句* → **=** [*表达式*](../chapter3/04_Expressions.html#expression)  

<a name="enumeration_declaration"></a>
##枚举声明

在程序里使用*枚举声明(enumeration)*来引入一个枚举类型。

枚举声明有两种基本的形式，使用关键字`enum`来声明。枚举声明体使用从零开始的变量——叫做*枚举用例(enumeration cases)*，和任意数量的声明，包括计算型属性，实例方法，类型方法，构造器，类型别名，甚至其他枚举，结构体，和类。枚举声明不能包含析构器或者协议声明。

枚举类型可以采用任何数量的协议，但是这些协议不能从类，结构体和其他的枚举继承。

不像类或者结构体。枚举类型并不提供隐式的初始构造器，所有构造器必须显式的声明。构造器可以委托枚举中的其他构造器，但是构造过程仅当构造器将一个枚举用例指定给`self`才全部完成。

和结构体类似但是和类不同，枚举是值类型：枚举实例在赋予变量或常量时，或者被函数调用时被复制。
更多关于值类型的信息，参见结构体和枚举都是[值类型(Structures and Enumerations Are Value Types)](TODO)一节。

可以扩展枚举类型，正如在[扩展声明(Extension Declaration)](TODO)中讨论的一样。

<a name="enumerations_with_cases_of_any_type"></a>
###任意用例类型的枚举

如下的形式声明了一个包含任意类型枚举用例的枚举变量

> enum `enumeration name`: `adopted protocols`{  
>     case `enumeration case 1`  
>     case `enumeration case 2`(`associated value types`)  
> }  

这种形式的枚举声明在其他语言中有时被叫做*可识别联合(discrinminated)*。

这种形式中，每一个用例块由关键字`case`开始，后面紧接着一个或多个以逗号分隔的枚举用例。每一个用例名必须是独一无二的。每一个用例也可以指定它所存储的指定类型的值，这些类型在*关联值类型(associated values types)*的元组里被指定，立即书写在用例名后。

枚举用例也可以指定函数作为其存储的值，从而通过特定的关联值创建一个枚举实例。和真正的函数一样，你可以获取一个枚举用例的引用，然后在后续代码中调用它。

```swift
enum Number {
    case Integer(Int)
    case Real(Double)
}
let f = Number.Integer
// f is a function of type (Int) -> Number
// f 是一个传入 Int 返回 Number 类型的函数
 
// Apply f to create an array of Number instances with integer values
// 利用函数 f 把一个整数数组转成 Number 数组
let evenInts: [Number] = [0, 2, 4, 6].map(f)
```

获得更多关于关联值类型的信息和例子，请查看[关联值(Associated Values)](TODO)一节。

枚举有一个递归结构，就是说，枚举有着枚举类型自身实例的关联值的用例。然而，枚举类型的实例有值语义，意味着它们在内存中有着固定的位置。为了支持递归，编译器必需插入一个间接层。

为间接使用特殊的枚举用例，使用`indirect`声明修饰符标记。

> enum Tree<T> {
> 		case Empty
> 		indirect case Node(value: T, left: Tree, right:Tree)
> }

为了间接的使用一个枚举的所有用例，使用`indirect`修饰符标记整个枚举-当枚举有许多用例且每个用例都需要使用`indirect`修饰符标记的时候这将非常便利。

一个被`indirect`修饰符标记的枚举用例必需有一个关联值。一个使用`indirect`修饰符标记的枚举包含有着关联值的用例和没有关联值的用例的混合。就是说，它不能包含任何也使用`indirect`修饰符标记的用例。


<a name="enumerations_with_cases_of_a_raw-value_type"></a>
###使用原始值类型用例的枚举(Enumerations with Cases of a Raw-Value Type)

以下的形式声明了一个包含相同基础类型的枚举用例的枚举：

> 	enum `enumeration name`: `raw value type`, `adopted protocols`{  
>		case `enumeration case 1` = `raw value 1`  
>		case `enumeration case 2` = `raw value 2`  
> }  

在这种形式中，每一个用例块由`case`关键字开始，后面紧接着一个或多个以逗号分隔的枚举用例。和第一种形式的枚举用例不同，这种形式的枚举用例包含一个同类型的基础值，叫做*原始值(raw value)*。这些值的类型在*原始值类型(raw-value type)*中被指定，必须表示一个整数，浮点数，字符串，或者一个字符。特别是*原始值类型(raw-value type)*必需遵守`Equatable`类型的协议和下列形式中的一种字面量构造协议(literal-convertible protocols):整型字面量有`IntergerLiteralConvertible`，浮点行字面量有`FloatingPointLiteralConvertible`，包含任意数量字符的字符串型字面量有`StringLiteralConvertible`，仅包含一个单一字符的字符串型字面量有`ExtendedGraphemeClusterLiteralConvertible`。每一个用例必须有唯一的名字，必须有一个唯一的初始值。

如果初始值类型被指定为`Int`，则不必为用例显式的指定值，它们会隐式的被标为值`0,1,2`等。每一个没有被赋值的`Int`类型时间会隐式的赋予一个初始值，它们是自动递增的。

```Swift
num ExampleEnum: Int {
    case A, B, C = 5, D
}
```

在上面的例子中，`ExampleEnum.A`的值是`0`，`ExampleEnum.B`的值是`1`。因为`ExampleEnum.C`的值被显式的设定为`5`，因此`ExampleEnum.D`的值会自动增长为`6`。

如果原始值类型被指定为`String`类型，你不用明确的为用例指定值，每一个没有指定的用例会隐式地用与用例名字相同的字符串指定。

> enum WeekendDay: String {
> 		case Saturday, Sunday
> }

在上面这个例子中，`WeekendDay.Saturday`的原始值是`"Saturday"`,`WeekendDay.Sunday`的原始值是`"Sunday"`。

拥有多种用例的原始值类型的枚举含蓄地遵循定义在Swift标准库中的`RawRepresentable`协议。所以，它们拥有一个原始值(`rawValue`)属性和一个有着`init?(rawValue: RawValue)`签名的可失败构造器(a failable initializer)。可以使用原始值属性去取的枚举用例的原始值，就像在`ExampleEnum.B.rawValue`中一样。如果有一个用例符合，也可以使用原始值去找到一个符合的用例，通过调用枚举的可失败构造器，如`ExampleEnum(rawValue: 5)`,这个可失败构造器返回一个可选的用例。想得到更多的信息和关于原始值类型查看更多信息和获取初始值类型用例的信息，参阅初始值[原始值(Raw Values)](TODO)。

<a name="accessing_enumeration_cases"></a>
###获得枚举用例

使用点(.)来引用枚举类型的用例，如`EnumerationType.EnumerationCase`。当枚举类型可以上下文推断出时，可以省略它(.仍然需要)，参照枚举语法[(Enumeration Syntax)](TODO)和[显式成员表达(Implicit Member Expression)](TODO)。

使用`switch`语句来检验枚举用例的值，正如使用[switch语句匹配枚举值（Matching Enumeration Values with a Switch Statement)](TODO)一节描述的那样。枚举类型是模式匹配(pattern-matched)的，和其相反的是`switch`语句case块中枚举用例匹配，在[枚举用例类型(Enumeration Case Pattern)](TODO)中有描述。

<a name="grammer_of_an_enumeration_declaration"></a>
> 枚举声明语法 
> *枚举声明* → [*特性(Attributes)列表*](../chapter3/06_Attributes.html#attributes) _可选_ [*访问级别修饰符*](TODO) _可选_ [*联合式枚举*](TODO) 
> *枚举声明* → [*特性(Attributes)列表*](../chapter3/06_Attributes.html#attributes) _可选_ [*访问级别修饰符*](TODO)  _可选_ [*原始值式枚举*](../chapter3/05_Declarations.html#raw_value_style_enum) 
> *联合式枚举* → **indirect** _可选_ **enum** [*枚举名*](../chapter3/05_Declarations.html#enum_name) [*泛型参数子句*](GenericParametersAndArguments.html#generic_parameter_clause) _可选_ [类型继承子句](TODO)_可选_ **{** [*union-style-enum-members*](../chapter3/05_Declarations.html#union_style_enum_members) _可选_ **}**  
> *union-style-enum-members* → [*union-style-enum-member*](../chapter3/05_Declarations.html#union_style_enum_member) [*union-style-enum-members*](../chapter3/05_Declarations.html#union_style_enum_members) _可选_  
> *union-style-enum-member* → [*声明*](../chapter3/05_Declarations.html#declaration) | [*联合式(Union Style)的枚举case子句*](../chapter3/05_Declarations.html#union_style_enum_case_clause)  
> *联合式(Union Style)的枚举case子句* → [*特性(Attributes)列表*](../chapter3/06_Attributes.html#attributes) _可选_ **indirect** _可选_ **case** [*联合式(Union Style)的枚举case列表*](../chapter3/05_Declarations.html#union_style_enum_case_list)  
> *联合式(Union Style)的枚举case列表* → [*联合式(Union Style)的case*](../chapter3/05_Declarations.html#union_style_enum_case) | [*联合式(Union Style)的case*](../chapter3/05_Declarations.html#union_style_enum_case) **,** [*联合式(Union Style)的枚举case列表*](../chapter3/05_Declarations.html#union_style_enum_case_list)  
> *联合式(Union Style)的case* → [*枚举的case名*](../chapter3/05_Declarations.html#enum_case_name) [*元组类型*](../chapter3/03_Types.html#tuple_type) _可选_  
> *枚举名* → [*标识符*](LexicalStructure.html#identifier)  
> *枚举的case名* → [*标识符*](LexicalStructure.html#identifier)  
> *原始值式枚举* → **enum** [*枚举名*](../chapter3/05_Declarations.html#enum_name) [*泛型参数子句*](GenericParametersAndArguments.html#generic_parameter_clause) _可选_ [*类型继承子句*](TODO) **{** [*原始值式枚举成员列表*](../chapter3/05_Declarations.html#raw_value_style_enum_members) **}**  
> *原始值式枚举成员列表* → [*原始值式枚举成员*](../chapter3/05_Declarations.html#raw_value_style_enum_member) [*原始值式枚举成员列表*](../chapter3/05_Declarations.html#raw_value_style_enum_members) _可选_  
> *原始值式枚举成员* → [*声明*](../chapter3/05_Declarations.html#declaration) | [*原始值式枚举case子句*](../chapter3/05_Declarations.html#raw_value_style_enum_case_clause)  
> *原始值式枚举case子句* → [*特性(Attributes)列表*](../chapter3/06_Attributes.html#attributes) _可选_ **case** [*原始值式枚举case列表*](../chapter3/05_Declarations.html#raw_value_style_enum_case_list)  
> *原始值式枚举case列表* → [*原始值式枚举case*](../chapter3/05_Declarations.html#raw_value_style_enum_case) | [*原始值式枚举case*](../chapter3/05_Declarations.html#raw_value_style_enum_case) **,** [*原始值式枚举case列表*](../chapter3/05_Declarations.html#raw_value_style_enum_case_list)  
> *原始值式枚举case* → [*枚举的case名*](../chapter3/05_Declarations.html#enum_case_name) [*原始值赋值*](../chapter3/05_Declarations.html#raw_value_assignment) _可选_  
> *原始值赋值* → **=** [*原始值字面量*](TODO)  
> *原始值字面量* → [数字型字面量](TODO)|[字符串型字面量](TODO)|[布尔型字面量](TODO)

<a name="structure_declaration"></a>
##结构体声明

使用*结构体声明(strucre declaration)*可以在程序里引入一个结构体类型。结构体声明使用`struct`关键字，遵循如下的形式：

> struct `structure name`: `adopted protocols` {  
>     `declarations`  
> }  

结构体内包含零或多个声明*声明(declarations)*。这些*声明(declarations)*可以包括存储型和计算型属性，类型属性，实例方法，类型方法，构造器，下标脚本，类型别名，甚至其他结构体，类，和枚举声明。结构体声明不能包含析构器或者协议声明。详细讨论和包含多种结构体声明的实例，参见[类和结构体(Classes and Structures)](TODO)一节。

结构体可以包含任意数量的协议，但是不能继承自类，枚举或者其他结构体。

有三种方法可以创建一个声明过的结构体实例：

* 调用结构体内声明的构造器，参照[构造器(Initializers)](TODO)一节。

* 如果没有声明构造器，调用结构体的逐个构造器，详情参见[Memberwise Initializers for Structure Types](TODO)。

* 如果没有声明析构器，结构体的所有属性都有初始值，调用结构体的默认构造器，详情参见[默认构造器(Default Initializers)](TODO)。

结构体的构造过程参见[构造过程(Initiaization)](TODO)一节。

结构体实例属性可以用点(.)来获得，详情参见[获得属性(Accessing Properties)](TODO)一节。

结构体是值类型；结构体的实例在被赋予变量或常量，被函数调用时被复制。获得关于值类型更多信息，参见
[结构体和枚举是值类型(Structures and Enumerations Are Value Types)](TODO)一节。

可以使用扩展声明来扩展结构体类型的行为，参见[扩展声明(Extension Declaration)](TODO)。

<a name="grammer_of_a_structure_declaration"></a>
> 结构体声明语法  
> *结构体声明* → [*特性(Attributes)列表*](../chapter3/06_Attributes.html#attributes) _可选_ [访问级别修饰符](TODO )_可选_ **struct** [*结构体名称*](../chapter3/05_Declarations.html#struct_name) [*泛型参数子句*](GenericParametersAndArguments.html#generic_parameter_clause) _可选_ [*类型继承子句*](../chapter3/03_Types.html#type_inheritance_clause) _可选_ [*结构体主体*](../chapter3/05_Declarations.html#struct_body)  
> *结构体名称* → [*标识符*](LexicalStructure.html#identifier)  
> *结构体主体* → **{** [*声明(Declarations)列表*](../chapter3/05_Declarations.html#declarations) _可选_ **}**  

<a name="class_declaration"></a>
##类声明

可以在程序中使用*类声明(class declaration)*来引入一个类。类声明使用关键字`class`，遵循如下的形式：

> class `class name`: `superclass`, `adopted protocols` {  
>     `declarations`  
> }  

一个类内包含零或多个*声明(declarations)*。这些*声明(declarations)*可以包括存储型和计算型属性，实例方法，类型方法，构造器，单独的析构器，下标脚本，类型别名，甚至其他结构体，类，和枚举声明。类声明不能包含协议声明。详细讨论和包含多种类声明的实例，参见[类和结构体(Classes and Structures)](TODO)一节。

一个类只能继承一个父类，*超类(superclass)*，但是可以包含任意数量的协议。*超类(superclass)*第一次出现在*类名(class name)*和冒号后面，其后跟着*采用的协议(adopted protocols)*。泛型类可以继承其它类型类和非泛型类，但是非泛型类只能继承其它的非泛型类。当在冒号后面写泛型超类的名称时，必须写那个泛型类的全名，包括它的泛型参数子句。

正如在[初始化声明(Initializer Declaration)](TODO)谈及的那样，类可以有指定构造器和方便构造器。类的指定构造器必须初始化类所有的已声明的属性，它必须在超类构造器调用前被执行。

类可以重写属性，方法，下表脚本和它的超类构造器。重写的属性，方法，下标脚本，和指定构造器必须以`override`声明修饰符标记。

为了要求子类去实现超类的构造器，使用`required`声明修饰符去标记超类的构造器。在子类实现父类构造器时也必须使用`required`声明修饰符去标记。

虽然*超类(superclass)*的属性和方法声明可以被当前类继承，但是*超类(superclass)*声明的指定构造器却不能。这意味着，如果当前类重写了超类的所有指定构造器，它就继承了超类的方便构造器。Swift的类并不是继承自一个全局基础类。

有两种方法来创建已声明的类的实例：

* 调用类的一个构造器，参见[构造器(Initializers)](TODO)。

* 如果没有声明构造器，而且类的所有属性都被赋予了初始值，调用类的默认构造器，参见[默认构造器(Default Initializers)](TODO)。

类实例属性可以用点(.)来获得，详情参见[获得属性(Accessing Properties)](TODO)一节。

类是引用类型；当被赋予常量或变量，函数调用时，类的实例是被引用，而不是复制。获得更多关于引用类型的信息，[结构体和枚举都是值类型(Structures and Enumerations Are Value Types)](TODO)一节。

可以使用扩展声明来扩展类的行为，参见[扩展声明(Extension Declaration)](TODO)。

<a name="grammer_of_a_class_declaration"></a>
> 类声明语法  
> *类声明* → [*特性(Attributes)列表*](../chapter3/06_Attributes.html#attributes) _可选_ [访问级别修饰符](TODO)**class** [*类名*](../chapter3/05_Declarations.html#class_name) [*泛型参数子句*](GenericParametersAndArguments.html#generic_parameter_clause) _可选_ [*类型继承子句*](../chapter3/03_Types.html#type_inheritance_clause) _可选_ [*类主体*](../chapter3/05_Declarations.html#class_body)  
> *类名* → [*标识符*](LexicalStructure.html#identifier)  
> *类主体* → **{** [*声明(Declarations)列表*](../chapter3/05_Declarations.html#declarations) _可选_ **}**  

<a name="protocol_declaration"></a>
##协议声明(translated by 小一)

一个*协议声明(protocol declaration)*为程序引入一个命名了的协议类型。协议声明在一个全局访问的区域使用 `protocol` 关键词来进行声明并有下面这样的形式：

> protocol `protocol name`: `inherited protocols` {  
>     `protocol member declarations`  
> }  

协议的主体包含零或多个*协议成员声明(protocol member declarations)*，这些成员描述了任何采用该协议必须满足的一致性要求。特别的，一个协议可以声明必须实现某些属性、方法、初始化程序及下标脚本的一致性类型。协议也可以声明专用种类的类型别名，叫做*关联类型(associated types)*，它可以指定协议的不同声明之间的关系。协议声明不包括类，结构体，枚举或者其它协议的声明。协议成员声明会在下面的详情里进行讨论。

协议类型可以从很多其它协议那继承。当一个协议类型从其它协议那继承的时候，来自其它协议的所有要求就集合了，而且从当前协议继承的任何类型必须符合所有的这些要求。对于如何使用协议继承的例子，查看[协议继承(Protocol Inheritance)](../chapter2/21_Protocols.html#protocol_inheritance)

> 注意：  
也可以使用协议合成类型集合多个协议的一致性要求，详情参见[协议合成类型(Protocol Composition Type)](../chapter3/03_Types.html#protocol_composition_type)和[协议合成(Protocol Composition)](../chapter2/21_Protocols.html#protocol_composition)

可以通过采用在类型的扩展声明中的协议来为之前声明的类型添加协议一致性。在扩展中必须实现所有采用协议的要求。如果该类型已经实现了所有的要求，可以让这个扩展声明的主题留空。

默认地，符合某一个协议的类型必须实现所有声明在协议中的属性、方法和下标脚本。也就是说，可以用`optional`声明修饰符标注这些协议成员声明以指定它们的一致性类型实现是可选的。`optional`修饰符仅仅可以用于使用`objc`属性标记过的协议。这样的结果就是仅仅类类型可以采用并符合包含可选成员要求的协议。更多关于如何使用`optional`属性的信息及如何访问可选协议成员的指导——比如当不能肯定是否一致性的类型实现了它们——参见[可选协议要求(Optional Protocol Requirements)](../chapter2/21_Protocols.html#optional_protocol_requirements)

为了限制协议的采用仅仅针对类类型，需要强制使用`class`来标记协议，通过将`class`关键在写在冒号后面的*继承协议列表(inherited protocols)*的第一个位置。例如，下面的协议形式只能被类类型采用：

```swift
protocol SomeProtocol:class{
	/* Protocol member go here */
}
```

任意继承自需要标记有`class`协议的协议都可以智能地仅能被类类型采用。

>注意：  
>如果协议已经用`object`属性标记了，`class`条件就隐性地应用于该协议；没有必要再明确地使用`class`条件来标记该协议了。

协议是命名的类型，因此它们可以以另一个命名类型出现在代码的所有地方，就像[协议类型(Protocol as Types)](../chapter2/21_Protocols.html#protocols_as_types)里讨论的那样。然而不能构造一个协议的实例，因为协议实际上不提供它们指定的要求的实现。

可以使用协议来声明一个类的代理的方法或者应该实现的结构，就像[委托(代理)模式(Delegation)](../chapter2/21_Protocols.html#delegation)描述的那样。

<a name="grammer_of_a_protocol_declaration"></a>
> 协议(Protocol)声明语法  
> *协议声明* → [*特性(Attributes)列表*](../chapter3/06_Attributes.html#attributes) _可选_ [*访问级别修饰符*](TODO) _可选_ **protocol** [*协议名*](../chapter3/05_Declarations.html#protocol_name) [*类型继承子句*](../chapter3/03_Types.html#type_inheritance_clause) _可选_ [*协议主体*](../chapter3/05_Declarations.html#protocol_body)  
> *协议名* → [*标识符*](LexicalStructure.html#identifier)  
> *协议主体* → **{** [*协议成员声明(Declarations)列表*](../chapter3/05_Declarations.html#protocol_member_declarations) _可选_ **}**  
> *协议成员声明* → [*协议属性声明*](../chapter3/05_Declarations.html#protocol_property_declaration)  
> *协议成员声明* → [*协议方法声明*](../chapter3/05_Declarations.html#protocol_method_declaration)  
> *协议成员声明* → [*协议构造器声明*](../chapter3/05_Declarations.html#protocol_initializer_declaration)  
> *协议成员声明* → [*协议附属脚本声明*](../chapter3/05_Declarations.html#protocol_subscript_declaration)  
> *协议成员声明* → [*协议关联类型声明*](../chapter3/05_Declarations.html#protocol_associated_type_declaration)  
> *协议成员声明(Declarations)列表* → [*协议成员声明*](../chapter3/05_Declarations.html#protocol_member_declaration) [*协议成员声明(Declarations)列表*](../chapter3/05_Declarations.html#protocol_member_declarations) _可选_  

<a name="protocol_property_declaration"></a>
###协议属性声明

协议声明了一致性类型必须在协议声明的主体里通过引入一个*协议属性声明(protocol property declaraion)*来实现一个属性。协议属性声明有一种特殊的类型声明形式：

> var `property name`: `type` { get set }

同其它协议成员声明一样，这些属性声明仅仅针对符合该协议的类型声明了`getter`和`setter`要求。结果就是不需要在协议里它被声明的地方实现`getter`和`setter`。

`getter`和`setter`要求可以通过一致性类型以各种方式满足。如果属性声明包含`get`和`set`关键词，一致性类型就可以用可读写（实现了`getter`和`setter`）的存储型变量属性或计算型属性，但是属性不能以常量属性或只读计算型属性实现。如果属性声明仅仅包含`get`关键词的话，它可以作为任意类型的属性被实现。比如说实现了协议的属性要求的一致性类型，参见[属性要求(Property Requirements)](../chapter2/21_Protocols.html#property_requirements)

更多参见[变量声明(Variabel Declaration)](../chapter3/05_Declarations.html#variable_declaration)

<a name="grammer_of_an_import_declaration"></a>
> 协议属性声明语法  
> *协议属性声明* → [*变量声明头(Head)*](../chapter3/05_Declarations.html#variable_declaration_head) [*变量名*](../chapter3/05_Declarations.html#variable_name) [*类型标注*](../chapter3/03_Types.html#type_annotation) [*getter-setter关键字(Keyword)块*](../chapter3/05_Declarations.html#getter_setter_keyword_block)  

<a name="protocol_method_declaration"></a>
###协议方法声明

协议声明了一致性类型必须在协议声明的主体里通过引入一个协议方法声明来实现一个方法。协议方法声明和函数方法声明有着相同的形式，包含如下两条规则：它们不包括函数体，不能在类的声明内为它们的参数提供初始值.举例来说，符合的类型执行协议必需的方法。参见[必需方法(Method Requirements)](TODO)一节。

使用`static`声明修饰符可以在协议声明中声明一个类或必需的静态方法。执行这些方法的类用修饰符`class`声明。相反的，执行这些方法的结构体必须以`static`声明修饰符声明。如果想使用扩展方法，在扩展类时使用`class`修饰符，在扩展结构体时使用`static`修饰符。

更多请参阅[函数声明(Function Declaration)](TODO)。

<a name="grammer_of_a_protocol_declaration"></a>
> 协议方法声明语法  
> *协议方法声明* → [*函数头*](../chapter3/05_Declarations.html#function_head) [*函数名*](../chapter3/05_Declarations.html#function_name) [*泛型参数子句*](GenericParametersAndArguments.html#generic_parameter_clause) _可选_ [*函数签名(Signature)*](../chapter3/05_Declarations.html#function_signature)  

<a name="protocol_initializer_declaration"></a>
###协议构造器声明

协议声明了一致性类型必须在协议声明的主体里通过引入一个协议构造器声明来实现一个构造器。协议构造器声明
除了不包含构造器体外，和构造器声明有着相同的形式。

一个一致性类型可以通过实现一个非可失败构造器或者`init!`可失败构造器去满足一个非可失败协议构造器的需求。一个一致性类型通过实现任意类型的构造器可以满足一个可失败协议构造器的需求。

当一个类去实现一个构造器去满足一个协议的构造器的需求，如果这个类还没有用`final`声明修饰符标记，这个构造器必需使用`required`声明修饰符去标记。

更多请参阅[构造器声明(Initializer Declaration)](TODO)。

<a name="grammer_of_a_protocol_initializer_declaration"></a>
> 协议构造器声明语法  
> *协议构造器声明* → [*构造器头(Head)*](../chapter3/05_Declarations.html#initializer_head) [*泛型参数子句*](GenericParametersAndArguments.html#generic_parameter_clause) _可选_ [*参数子句*](../chapter3/05_Declarations.html#parameter_clause)  

<a name="protocol_subscript_declaration"></a>
###协议下标脚本声明

协议声明了一致性类型必须在协议声明的主体里通过引入一个协议下标脚本声明来实现一个下标脚本。协议下标脚本声明对下标脚本声明有一个特殊的形式：

> subscript (`parameters`) -> `return type` { get set }

下标脚本声明只为和协议一致的类型声明了必需的最小数量的的getter和setter。如果下标脚本申明包含get和set关键字，一致的类型也必须有一个getter和setter语句。如果下标脚本声明值包含get关键字，一致的类型必须*至少(at least)*包含一个getter语句，可以选择是否包含setter语句。

更多参阅[下标脚本声明(Subscript Declaration)](TODO)。

<a name="grammer_of_a_protocol_subscript_declaration"></a>
> 协议附属脚本声明语法  
> *协议附属脚本声明* → [*附属脚本头(Head)*](../chapter3/05_Declarations.html#subscript_head) [*附属脚本结果(Result)*](../chapter3/05_Declarations.html#subscript_result) [*getter-setter关键字(Keyword)块*](../chapter3/05_Declarations.html#getter_setter_keyword_block)  

<a name="protocol_associated_type_declaration"></a>
###协议相关类型声明

协议声明相关类型使用关键字`typealias`。相关类型为作为协议声明的一部分的类型提供了一个别名。相关类型和参数语句中的类型参数很相似，但是它们在声明的协议中包含`self`关键字。在这些语句中，`self`指代和协议一致的可能的类型。获得更多信息和例子，查看[关联类型(Associated Types)](TODO)一节或[类型别名声明(Type Alias Declaration)](TODO)一节。

<a name="grammer_of_a_protocol_associated_type_declaration"></a>
> 协议关联类型声明语法  
> *协议关联类型声明* → [*类型别名头(Head)*](../chapter3/05_Declarations.html#typealias_head) [*类型继承子句*](../chapter3/03_Types.html#type_inheritance_clause) _可选_ [*类型别名赋值*](../chapter3/05_Declarations.html#typealias_assignment) _可选_  

<a name="initializer_declaration"></a>
##构造器声明

*构造器(initializer)*声明会为程序内的类，结构体或枚举引入构造器。构造器使用关键字`init`来声明，遵循两条基本形式。

结构体，枚举，类可以有任意数量的构造器，但是类的构造器的规则和行为是不一样的。不像结构体和枚举那样，类有两种结构体，designed initializers 和convenience initializers，参见[构造器(Initialization)](TODO)一节。

如下的形式声明了结构体，枚举和类的指定构造器：

> init(`parameters`) {  
>     `statements`  
> }  

类的指定构造器将类的所有属性直接初始化。如果类有超类，它不能调用该类的其他构造器,它只能调用超类的一个指定构造器。如果该类从它的超类处继承了任何属性，这些属性在当前类内被赋值或修饰时，必须调用一个超类的指定构造器。

指定构造器可以在类声明的上下文中声明，因此它不能用扩展声明的方法加入一个类中。

结构体和枚举的构造器可以调用其他的已声明的构造器，委托其中一个或所有的构造器进行初始化过程。

以`convenience`声明修饰符来标记构造器声明来声明一个类的便利构造器：

> convenience init(`parameters`) {  
>    `statements`  
> }  

便利构造器可以将初始化过程委托给另一个便利构造器或类的一个指定构造器。这意味着，类的初始化过程必须
以一个将所有类属性完全初始化的指定构造器的调用作为结束。便利构造器不能调用超类的构造器。

可以使用required声明修饰符，将便利构造器和指定构造器标记为每个子类的构造器都必须实现的。一个子类的关于这个构造器的实现也必须使用`required`声明修饰符标记。

默认情况下，声明在超类的构造器没有被子类继承。也就是说，如果一个子类使用默认的值去构造它所有的存储属性，而且没有定义任何自己的构造器，它将继承超类的构造器。如果子类重写所有超类的指定构造器，子类继承超类的便利构造器。

和方法，属性和下表脚本一样，需要使用`override`声明修饰符标记重写了的制定构造器。

>注意
>如果使用`required`声明修饰符去标记一个构造器，当在子类中重写必要构造器时，也不要用`override`修饰符去标记构造器。

查看更多关于不同声明方法的构造器的例子，参阅[构造过程(Initialization)](TODO)一节。

<a name="failable_initializers"></a>
###可失败构造器(Failable Initializers)

*可失败构造器*是一种可以生成可选实例或者是一类构造器声明的隐式解析可选实例(an implicitly unwrapped optional instance)类型。所以，构造区通过返回`nil`来指明构造过程失败。

声明可以生成可选实例的可失败构造器，在构造器声明的`init`关键字后加追加一个问号(`init?`)。声明可生成隐式解析可选实例的可失败构造器，在构造器声明后追加一个叹号(`init!`)。使用`init?`可失败构造器生成结构体的一个可选实例的例子如下。

```swift
struct SomeStruct {
	let string: String
	//生成一个'SomeStruct'的可选实例
	init?(input: String) {
		if input.isEmpty {
			// 弃用'self' 返回 'nil'
		}
		string = input
	}
}
```

除非必需处理结果的可选性，可以使用调用非可失败构造器的方式调用`init?`可失败构造器。

```swift
if let actualInstance = SomeStruct(input: "Hello") {
	//'SomeStruct'实例相关
} else {
	//'SomeStruct'实例构造过程失败，构造器返回'nil'
}
```

在实现构造体的任何时间，结构体或者枚举的可失败构造器可以返回`nil`。然而，类的可失败构造器，仅在类的所有存储属性被构造之后且`self.init`或`super.init`被调用之后才返回`nil`（就是说，构造器的委托被执行）。

可失败构造器可以委托任何种类的构造器。非可失败可以委托其它非可失败构造器或者`init!`可失败构造器。

构造过程的失败由构造器的委托产生。特别的，如果可失败构造器代理一个构造器失败且返回`nil`，那么之后被委托的构造器也会失败且隐式的返回`nil`。如果非可失败构造器代理`init!`可失败构造器失败了且返回`nil`，那么后出现一个运行时错误（如同使用`!`操作符去解析一个有着`nil`值的可选项）。

可失败指定构造器可以在子类中任何一种指定构造器重写。非可失败指定构造器在子类中仅能通过非可失败构造器被重写。

得到更多的信息并且了解更多关于可失败构造器的例子，请参阅[可失败构造器(Failable Initializer)](TODO)

<a name="grammer_of_an_initializer_declaration"></a>
> 构造器声明语法  
> *构造器声明* → [*构造器头(Head)*](../chapter3/05_Declarations.html#initializer_head) [*泛型参数子句*](GenericParametersAndArguments.html#generic_parameter_clause) _可选_ [*参数子句*](../chapter3/05_Declarations.html#parameter_clause) [*构造器主体*](../chapter3/05_Declarations.html#initializer_body)  
> *构造器头(Head)* → [*特性(Attributes)列表*](../chapter3/06_Attributes.html#attributes) _可选_ [*声明修饰符列表(modifiers)*](TODO) _可选_ **init**       
> *构造器头(Head)* → [*特性(Attributes)列表*](../chapter3/06_Attributes.html#attributes) _可选_ [*声明修饰符列表(modifiers)*](TODO) _可选_ **init ?**           
> *构造器头(Head)* → [*特性(Attributes)列表*](../chapter3/06_Attributes.html#attributes) _可选_ [*声明修饰符列表(modifiers)*](TODO) _可选_ **init !** 
> *构造器主体* → [*代码块*](../chapter3/05_Declarations.html#code_block)  

<a name="deinitializer_declaration"></a>
##析构声明

*析构声明(deinitializer declaration)*为类声明了一个析构器。析构器没有参数，遵循如下的格式：

> deinit {  
>    `statements`  
> }  

当类没有任何语句时将要被释放时，析构器会自动的被调用。析构器在类的声明体内只能被声明一次——但是不能在
类的扩展声明内，每个类最多只能有一个。

子类继承了它的超类的析构器，在子类将要被释放时隐式的调用。子类在所有析构器被执行完毕前不会被释放。

析构器不会被直接调用。

查看例子和如何在类的声明中使用析构器，参见[析构过程Deinitialization](TODO)一节。

<a name="grammer_of_a_deinitializer_declaration"></a>
> 析构器声明语法  
> *析构器声明* → [*特性(Attributes)列表*](../chapter3/06_Attributes.html#attributes) _可选_ **deinit** [*代码块*](../chapter3/05_Declarations.html#code_block)  

<a name="extension_declaration"></a>
##扩展声明

*扩展声明(extension declaration)*用于扩展一个现存的类，结构体，枚举的行为。扩展声明使用关键字`extension`，遵循如下的规则：

> extension `type name`: `adopted protocols` {  
>    `declarations`  
> }  

一个扩展声明体包括零个或多个*声明语句(declarations)*。这些*声明语句(declarations)*可以包括计算型属性，计算型类型属性，实例方法，类型方法，构造器，下标脚本声明，甚至其他结构体，类，和枚举声明。扩展声明不能包含析构器，协议声明，存储型属性，属性监测器或其他的扩展属性。详细讨论和查看包含多种扩展声明的实例，参见[扩展(Extensions)](TODO)一节。

扩展声明可以向现存的类，结构体，枚举内添加*一致的协议(adopted protocols)*。扩展声明不能向一个类中添加继承的类，因此在*类型名称*的冒号后面仅能指定一个协议列表。

属性，方法，现存类型的构造器不能被它们类型的扩展所重写。

扩展声明可以包含构造器声明，这意味着，如果扩展的类型在其他模块中定义，构造器声明必须委托另一个在
那个模块里声明的构造器来恰当的初始化。

<a name="grammer_of_an_extension_declaration"></a>
> 扩展(Extension)声明语法  
> *扩展声明* → [访问级别修饰符](TODO) _可选_ **extension** [*类型标识*](../chapter3/03_Types.html#type_identifier) [*类型继承子句*](../chapter3/03_Types.html#type_inheritance_clause) _可选_ [*extension-body*](../chapter3/05_Declarations.html#extension_body)  
> *extension-body* → **{** [*声明(Declarations)列表*](../chapter3/05_Declarations.html#declarations) _可选_ **}**  

<a name="subscript_declaration"></a>
##下标脚本声明

*下标脚本(subscript)*声明用于向特定类型添加附属脚本支持，通常为访问集合，列表和序列的元素时提供语法便利。附属脚本声明使用关键字`subscript`，声明形式如下：

> subscript (`parameter`) -> (return type){  
>     get{    
>       `statements`    
>     }    
>     set(`setter name`){    
>       `statements`    
>     }    
> }    

附属脚本声明只能在类，结构体，枚举，扩展和协议声明的上下文进行声明。

*参数列表(parameters)*指定一个或多个用于在相关类型的下标脚本中访问元素的索引（例如，表达式`object[i]`中的`i`）。尽管用于元素访问的索引可以是任意类型的，但是每个变量必须包含一个用于指定每种索引类型的类型标注。*返回类型(return type)*指定被访问的元素的类型。

和计算性属性一样，下标脚本声明支持对访问元素的读写操作。getter用于读取值，setter用于写入值。setter子句是可选的，当仅需要一个getter子句时，可以将二者都忽略且直接返回请求的值即可。也就是说，如果使用了setter子句，就必须使用getter子句。

*setter名称(setter name)*和封闭的括号是可选的。如果使用了setter名称，它会被当做传给setter的变量的名称。如果不使用setter名称，那么传给setter的变量的名称默认是`value`。*setter名称(setter name)*的类型必须与*返回类型(return type)*的类型相同。

可以在下标脚本声明的类型中，可以重载下标脚本，只要*参数列表(parameters)*或*返回类型(return type)*与先前的不同即可。也可以重写继承自超类的下标脚本声明。此时，必须使用`override`声明修饰符声明那个被重写的下标脚本。(待定)

同样可以在协议声明的上下文中声明下标脚本，[协议下标脚本声明(Protocol Subscript Declaration)](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/doc/uid/TP40014097-CH34-XID_619)中有所描述。

更多关于下标脚本和下标脚本声明的例子，请参考[下标脚本(Subscripts)](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Subscripts.html#//apple_ref/doc/uid/TP40014097-CH16-XID_393)。

<a name="grammer_of_a_subscript_declaration"></a>
> 附属脚本声明语法  
> *附属脚本声明* → [*附属脚本头(Head)*](../chapter3/05_Declarations.html#subscript_head) [*附属脚本结果(Result)*](../chapter3/05_Declarations.html#subscript_result) [*代码块*](../chapter3/05_Declarations.html#code_block)  
> *附属脚本声明* → [*附属脚本头(Head)*](../chapter3/05_Declarations.html#subscript_head) [*附属脚本结果(Result)*](../chapter3/05_Declarations.html#subscript_result) [*getter-setter块*](../chapter3/05_Declarations.html#getter_setter_block)  
> *附属脚本声明* → [*附属脚本头(Head)*](../chapter3/05_Declarations.html#subscript_head) [*附属脚本结果(Result)*](../chapter3/05_Declarations.html#subscript_result) [*getter-setter关键字(Keyword)块*](../chapter3/05_Declarations.html#getter_setter_keyword_block)  
> *附属脚本头(Head)* → [*特性(Attributes)列表*](../chapter3/06_Attributes.html#attributes) _可选_ [*声明修饰符列表(declaration-modifiers)*](TODO) _可选_ **subscript** [*参数子句*](../chapter3/05_Declarations.html#parameter_clause)  
> *附属脚本结果(Result)* → **->** [*特性(Attributes)列表*](../chapter3/06_Attributes.html#attributes) _可选_ [*类型*](../chapter3/03_Types.html#type)   

<a name="operator_declaration"></a>
##运算符声明(translated by 林)

*运算符声明(operator declaration)*会向程序中引入中缀、前缀或后缀运算符，它使用关键字`operator`声明。

可以声明三种不同的缀性：中缀、前缀和后缀。操作符的*缀性(fixity)*描述了操作符与它的操作数的相对位置。

运算符声明有三种基本形式，每种缀性各一种。运算符的缀性通过在`operator`关键字之前添加声明修饰符`infix`，`prefix`或`postfix`来指定。每种形式中，运算符的名字只能包含[运算符(Operators)](TODO)中定义的运算符字符。

下面的这种形式声明了一个新的中缀运算符：
> 	infix operator `operator name` {  
>     precedence `precedence level`  
>     associativity `associativity`  
> }  

*中缀运算符(infix operator)*是二元运算符，它可以被置于两个操作数之间，比如表达式`1 + 2` 中的加法运算符(`+`)。

中缀运算符可以可选地指定优先级，结合性，或两者同时指定。

运算符的*优先级(precedence)*可以指定在没有括号包围的情况下，运算符与它的操作数如何紧密绑定的。可以使用上下文关键字`precedence`并*优先级(precedence level)*一起来指定一个运算符的优先级。*优先级(precedence level)*可以是0到255之间的任何一个数字(十进制整数)；与十进制整数字面量不同的是，它不可以包含任何下划线字符。尽管优先级是一个特定的数字，但它仅用作与另一个运算符比较(大小)。也就是说，一个操作数可以同时被两个运算符使用时，例如`2 + 3 * 5`，优先级更高的运算符将优先与操作数绑定。

运算符的*结合性(associativit)*可以指定在没有括号包围的情况下，优先级相同的运算符以何种顺序被分组的。可以使用上下文关键字`associativity`并_结合性(associativity)_一起来指定一个运算符的结合性，其中_结合性_可以说是上下文关键字`left`，`right`或`none`中的任何一个。左结合运算符以从左到右的形式分组。例如，减法运算符(`-`)具有左结合性，因此`4 - 5 - 6`被以`(4 - 5) - 6`的形式分组，其结果为`-7`。
右结合运算符以从右到左的形式分组，对于设置为`none`的非结合运算符，它们不以任何形式分组。具有相同优先级的非结合运算符，不可以互相邻接。例如，表达式`1 < 2 < 3`非法的。

声明时不指定任何优先级或结合性的中缀运算符，它们的优先级会被初始化为100，结合性被初始化为`none`。

下面的这种形式声明了一个新的前缀运算符：
> prefix operator `operator name`{}  

紧跟在操作数前边的*前缀运算符(prefix operator)*是一元运算符，例如表达式`++i`中的前缀递增运算符(`++`)。

前缀运算符的声明中不指定优先级。前缀运算符是非结合的。

下面的这种形式声明了一个新的后缀运算符：

> postfix operator `operator name`{}  

紧跟在操作数后边的*后缀运算符(postfix operator)*是一元运算符，例如表达式`i++`中的前缀递增运算符(`++`)。

和前缀运算符一样，后缀运算符的声明中不指定优先级。后缀运算符是非结合的。

声明了一个新的运算符以后，需要声明一个跟这个运算符同名的函数来实现这个运算符。如果在实现一个前缀或者后缀操作符，也必须使用相符的`prefix`或者`postfix`声明修饰符标记函数声明。如果实现中缀操作符，不需要使用`infix`声明修饰符标记函数声明。如何实现一个新的运算符，请参考[Custom Operators](TODO)。

<a name="grammer_of_an_operator_declaration"></a>
> 运算符声明语法  
> *运算符声明* → [*前置运算符声明*](../chapter3/05_Declarations.html#prefix_operator_declaration) | [*后置运算符声明*](../chapter3/05_Declarations.html#postfix_operator_declaration) | [*中置运算符声明*](../chapter3/05_Declarations.html#infix_operator_declaration)  
> *前置运算符声明* → **prefix** **运算符** [*运算符*](LexicalStructure.html#operator) **{** **}**  
> *后置运算符声明* → **postfix** **运算符** [*运算符*](LexicalStructure.html#operator) **{** **}**  
> *中置运算符声明* → **infix** **运算符** [*运算符*](LexicalStructure.html#operator) **{** [*中置运算符属性*](../chapter3/05_Declarations.html#infix_operator_attributes) _可选_ **}**  
> *中置运算符属性* → [*优先级子句*](../chapter3/05_Declarations.html#precedence_clause) _可选_ [*结和性子句*](../chapter3/05_Declarations.html#associativity_clause) _可选_  
> *优先级子句* → **precedence** [*优先级水平*](../chapter3/05_Declarations.html#precedence_level)  
> *优先级水平* → 十进制整数 0 到 255  
> *结和性子句* → **associativity** [*结和性*](../chapter3/05_Declarations.html#associativity)  
> *结和性* → **left** | **right** | **none**  


<a name="declaration_modifiers"></a>
## 声明修饰符

*声明修饰符(Declaration modifiers)*是关键字或者说是上下文相关的关键字，它可以修改一个声明的行为或者含义。可以在一个声明的特性和引进该声明的关键字之间，指定一个声明修饰符，并写下它的关键字或上下文相关的关键字。

`dynamic`
可以将该修饰符用于任何可以出现在Objective-C中的类成员上。当将`dynamic`修饰符用于一个成员声明上时，对该成员的访问总是由Objective-C的实时系统动态地安排，而永远不会由编译器内联或去虚拟化。
因为当一个声明被标识`dynamic`修饰符时，会由Objective-C的实时系统动态地安排，所以他们是被隐式的标识了`objc`特性的。

`final`

该修饰符用于修饰一个类或类中的属性，方法，以及下标成员。如果用它修饰一个类，那么这个类则不能被继承。如果用它修饰类中的属性，方法或下标，则表示在子类中，它们不能被重写。

`lazy`

该修饰符用于修饰类或结构体中的存储型变量属性，表示该属性的初始值最多只被计算和存储一次，且发生在第一次访问它时。如何使用`lazy`特性的一个例子，请见：[惰性存储型属性(Lazy Stored Properties)](TODO)。

`optional`

该修饰符用于修饰一个类或类中的属性，方法，以及下标成员,表示遵循类型没有被要求实现这些成员。
只能将`optional`修饰符用于被`objc`标识的协议。这样一来，只有类类型可以适配或遵循拥有可选成员需求的协议。关于如何使用`optional`修饰符,以及如何访问可选协议成员的指导(比如，不确定遵循类型是否已经实现了这些可选成员)，可以参见[可选成员需求(Optional Protocol Requirements)](TODO)一章

`required`

该修饰符用于修饰一个类的特定构造器或便捷构造器,表示该类所有的子类都需要实现该构造器。在子类实现该构造器时，同样必须使用`required`修饰符修饰该构造器。


`weak`

`weak`修饰符用于修饰一个变量或一个存储型变量属性，表示该变量或属性通过一个弱引用指向存储其值的对象。该变量或属性的类型必须是一个可选类类型。通过`weak`修饰符可避免强引用循环。关于`weak`修饰符的例子和更多信息，可以参见[弱引用(Weak References)](TODO)一章

<a name="access_control_levels"></a>
### 访问控制级别

Swift提供了三个级别的权限控制：`public`, `internal`, 和 `private`。可以给声明标识以下访问级别修饰符中的一个以指定声明的权限级别。访问控制在[访问控制(Access Control)](TODO)一章有详细说明。

`public`

修饰符用于修饰声明时，表示该声明可被同一个模块中的代码访问。被`public`权限级别修饰符修饰的声明，还可被其他模块的代码访问，只要该模块注入了该声明所在的模块。

`internal`

修饰符用于修饰声明时，表示该声明只能被同一模块中的代码访问。默认的，绝大多数声明会被隐式的标识上`internal`权限级别修饰符


`private`

修饰符用于修饰声明时，表示该声明只能被同一源文件中的代码访问。


以上的任意一个权限级别修饰符都可以有选择的带上一个参数，该参数由关键字`set`和一对括号组成（比如，`private(set)`）。当想要指明一个变量或下标脚注的setter的访问级别要低于或等于该变量或下标脚注的实际访问级别时，使用这种格式的权限级别修饰符，就像[Getters and Setters](TODO)一章中讨论的一样。

<a name="grammer_of_a_declaration_modifier"></a>
>声明修饰符的语法

>声明修饰符 → **class**­ | **convenience­**| **dynamic**­ | **final**­ | **infix**­ | **lazy­** | **mutating**­ | **nonmutating**­ | **optional**­ | **override**­ | **postfix**|­ **prefix­** | **required­** | **static**­ | **unowned­** | **unowned­(­safe­)**­ | **unowned­(­unsafe­)­** | **weak**­

>声明修饰符 → 权限级别修饰符­
>
>访问级别修饰符 → **internal**­ | **internal­(­set­)­**
>
>访问级别修饰符 → **private­** | **private­(­set­)­**
>
>访问级别修饰符 → **public­** | **public­(­set­)­**
>
>访问级别修饰符 → [访问级别修饰符(access-level-modeifier)](TODO) [访问级别修饰符列表(access-level-modeifiers)](TODO) _可选_
­
