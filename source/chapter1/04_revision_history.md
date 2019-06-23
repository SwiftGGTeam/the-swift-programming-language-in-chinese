# Swift 文档修订历史

### 2019-01-24

* 更新到 Swift 5。
* 增加了[拓展字符串分隔符](../chapter2/03_Strings_And_Characters.md#extended-string-delimiters)部分，另外在[字符串字面量](../chapter3/03_Lexical_Structure.md#string-literal)部分更新了拓展字符串分隔符相关内容。
* 添加了[动态调用](../chapter3/07_Attributes.md#dynamiccallable)章节，其中包含有关使用 `dynamicCallable` 属性动态调用实例作为函数的信息。
* 添加了[unknown](../chapter3/07_Attributes.md#unknown)和[未来枚举匹配](../chapter3/05_Statements.md#future-case2)章节，其中包含了使用 `unknown` 来处理未来枚举可能发生改变的情形。
* 在[Key-Path](../chapter3/04_Expressions.md#key-path-expression)表达式章节添加了标示 key path (\.self) 相关内容。
* 在[可选编译块](../chapter3/05_Statements.md#Conditional-Compilation-Block)章节新增了小于比较符 `<` 相关内容。

### 2018-09-17

* 更新至 Swift 4.2。
* 在[遍历枚举情形](../chapter2/08_Enumerations.md#iterating-over-enumeration-cases)章节添加了访问所有枚举情形的内容。
* 在[编译诊断](../chapter3/05_Statements.md#compile-time-diagnostic-statement)章节添加了有关 `#error` 和 `#warning` 相关内容。
* 在[属性声明](../chapter3/07_Attributes.md#Ideclaration-attributes)章节中补充了 `inlinable` 和 `usableFromInline` 属性相关的内联信息。
* 在[属性声明](../chapter3/07_Attributes.md#Ideclaration-attributes)章节中添加了 `requires_stored_property_inits` 和 `warn_unqualified_access` 属性相关的信息。
* 在[可选编译块](../chapter3/05_Statements.md#Conditional-Compilation-Block)章节新增了如何根据 Swift 编译器版本对代码进行对应编译处理的内容。
* 在[字面量语法](../chapter3/04_Expressions.md#literal-expression)章节补充了 `#dsohandle` 相关内容。

### 2018-03-29

* 更新至 Swift 4.1。
* 在[等价运算符](../chapter2/26_Advanced_Operators.md#equivalence-operators)章节添加了等价运算符的合成实现信息。
* 在[声明](../chapter3/06_Declarations.md)一章的[申明拓展](../chapter3/06_Declarations.md#extension-declaration)部分和[协议](../chapter2/21_Protocols.md)一章的[有条件地遵循协议](../chapter2/21_Protocols.md#Conditionally-Conforming-to-a-Protocol)部分添加了协议的有条件遵循相关内容。
* 在[关联类型约束中使用协议](../chapter2/22_Generics.md##using-a-protocol-in-its-associated-type’s-constraints)章节中添加了递归协议约束的内容。
* 在[条件编译块](../chapter3/05_Statements.md#Conditional-Compilation-Block)章节中添加了 `canImport()` 和 `targetEnvironment()` 平台条件相关内容。

### 2017-12-04

* 更新至 Swift 4.0.3。
* 更新[Key-Path](../chapter3/04_Expressions.md#key-path-expression)表达式章节，现在 key path 支持下标子路径。

### 2017-09-19

* 更新至 Swift 4.0。
* 在[内存安全](../chapter2/24_MemorySafety.md)章节补充了内存互斥访问相关的内容。
* 添加了[带有泛型 Where 子句联类型](../chapter2/22_Generics.md#associated-types-with-a-generic-where-clause)章节，现在可以使用泛型 `where` 子句约束关联类型。
* 在[字符串和字符](../chapter2/03_Strings_And_Characters.md)的[字面量](../chapter2/03_Strings_And_Characters.md#string-literals)一节以及[词法结构](../chapter3/02_Lexical_Structure.md)的[字符串字面量](../chapter3/02_Lexical_Structure.md#string-literal)一节中新增了多行字符串字面量相关内容。
* 更新了[声明属性](../chapter3/07_Attributes.md#Ideclaration-attributes)中 `objc` 属性的讨论，现在该属性是在更少的位置推断出来的。
* 添加了[范型下标](../chapter2/22_Generics.md#generic-subscripts)章节，现在下标也支持范型特性了。
* 更新了[协议](../chapter2/21_Protocols.md)一章中[协议组合](../chapter2/21_Protocols.md#protocol-composition)部分以及[类型](../chapter3/03_Types.md)一章中[协议组合类型](../chapter3/03_Types.md#protocol-composition)部分的讨论，现在协议组合类型支持进行父类约束了。
* 更新了[拓展声明](../chapter3/06_Declarations.md#extension-declaration)中关于协议的讨论，现在它们不支持 `final` 特性了。
* 在[断言和前置条件](../chapter2/01_TheBasics.md#assertions-and-preconditions)部分增加了部分前置条件和致命错误的内容。

### 2017-03-27

* 更新至 Swift 3.1。
* 增加[范型 Where 子句扩展](../chapter2/22_Generics.md#extensions-with-a-generic-where-clause)，其中包含需要的扩展信息。
* 增加了一个区间迭代的例子到[For-In 循环](../chapter2/05_Control_Flow.md#for-in-loops)。
* 增加一个可失败数值转换的例子[到可失败构造器](../chapter2/14_Initialization.md#failable-initializers)章节。
* 增加关于使用 Swift 语言版本的 `available` 特性内容到[声明特性](../chapter3/07_Attributes.md#Ideclaration-attributes)章节。
* 更新了[函数类型](../chapter3/03_Types.md#function_type)章节中的描述，注意在写函数类型时不允许使用参数标签。
* 更新了[条件编译块](../chapter3/05_Statements.md#Conditional-Compilation-Block)章节中的 Swift 语言版本号的描述，现在可以使用可选的补丁版本号。
* 更新了[函数类型](../chapter3/03_Types.md#function_type)>章节的描述，现在 Swift 区分了采用多参数的函数和采用元组类型的单个参数的函数。
* 从[表达式](../chapter3/04_Expressions.md)章节中删除了动态表达式的部分，现在 `type(of:)` 是 Swift 标准库函数。        

### 2016-10-27

* 更新至 Swift 3.0.1。
* 更新[自动引用计数](../chapter2/23_Automatic_Reference_Counting.md)章节中关于 weak 和 unowned 引用的讨论。
* 增加[声明标识符](../chapter3/06_Declarations.md#declaration-modifiers)章节中关于新的标识符 `unowned`，`unowend(safe)` 和 `unowned(unsafe)` 的描述。
* 增加[Any 和 AnyObject 的类型转换](../chapter2/18_Type_Casting.md#type-casting-for-any-and-anyobject)一节中关于使用类型 `Any` 作为可选值的描述。               
* 更新[表达式](../chapter3/04_Expressions.md)章节，把括号表达式和元组表达式的描述分开。

### 2016-09-13

* 更新至 Swift 3.0。
* 更新[函数](../chapter2/06_Functions.md)一章和[函数声明](../chapter3/06_Declarations.md#function-declaration)部分关于函数的讨论，在一节中，标明所有函数参数默认都有函数标签。
* 更新[高级操作符](../chapter2/26_Advanced_Operators.md)章节中关于操作符的讨论，现在你可以作为类型函数来实现，替代之前的全局函数实现方式。
* 增加[访问控制](../chapter2/25_Access_Control.md)章节中关于对新的访问级别描述符 `open` 和 `fileprivate` 的信息。
* 更新[函数声明](../chapter3/06_Declarations.md#function-declaration)中关于 `inout` 的讨论，注意它现在出现在参数类型的前面，而不是在参数名称的前面。
* 更新[逃逸闭包](../chapter2/07_Closures.md#escaping-closures)和[自动闭包](../chapter2/07_Closures.md#autoclosures)还有[属性](../chapter3/07_Attributes.md)章节中关于 `@noescape` 和 `@autoclosure` 的讨论，现在他们是类型属性，而不是定义属性。
* 增加[高级操作符](../chapter2/26_Advanced_Operators.md)一章中[自定义中缀操作符的优先级](./chapter2/26_Advanced_Operators.md#precedence-and-associativity-for-custom-infix-operators)部分和[定义](../chapter3/06_Declarations.md)一章中[优先级组声明](../chapter3/06_Declarations.md#precedence-group-declaration-modifiers)部分中关于操作符优先级组的信息。
* 更新一些讨论：使用 macOS 替换掉 OS X， Error 替换掉 ErrorProtocol，和更新一些协议名称，比如使用 ExpressibleByStringLiteral 替换掉 StringLiteralConvertible。
* 更新[泛型](../chapter2/22_Generics.md)和[泛型形参和实参](../chapter3/09_Generic_Parameters_And_Arguments.md)章节中[泛型 Where 语句](../chapter2/22_Generics.md#extensions-with-a-generic-where-clause)部分，现在泛型的 where 语句写在一个声明的最后。
* 更新[逃逸闭包](../chapter2/07_Closures.md#escaping-closures)一节，现在闭包默认为非逃逸的（noescaping）。
* 更新[基础部分](../chapter2/01_TheBasics.md)一章中[可选绑定](../chapter2/01_TheBasics.md#optional-binding)部分和[语句](../chapter3/05_Statements.md)一章中[While 语句](../chapter3/05_Statements.md#while-statement)部分，现在 if，`while` 和 `guard` 语句使用逗号分隔条件列表，不需要使用 `where` 语句。
* 在[控制流](../chapter2/05_Control_Flow.md)一章的[Switch](../chapter2/05_Control_Flow.md#switch)和[语句](../chapter3/05_Statements.md)一章的[Switch 语句](../chapter3/05_Statements.md#switch-statement)部分中增加关于 switch cases 可以使用多模式的信息。
* 更新[函数类型](../chapter3/03_Types.md#function_type)一节，现在函数参数标签不包含在函数类型中。
* 更新[协议](../chapter2/21_Protocols.md)一章[协议组合](../chapter2/21_Protocols.md#protocol-composition)部分和[类型](../chapter3/03_Types.md)一章[协议组合类型](../chapter3/03_Types.md#protocol-composition)部分关于使用新的 Protocol1 & Protocol2 语法的信息。
* 更新动态类型表达式一节使用新的 `type(of:)` 表达式的信息。
* 更新[行控制表达式](../chapter3/05_Statements.md#line-control-statement)一节使用 `#sourceLocation(file:line:)` 表达式的信息。
* 更新[永不返回函数](../chapter3/06_Declarations.md#functions-that-never-return)一节使用 新的 `Never` 类型的信息。
* 增加[字面量表达式](../chapter3/04_Expressions.md#literal-expression)一节关于 `playground` 字面量的信息。
* 更新[In-Out 参数](../chapter3/06_Declarations.md#in-out_parameters)一节，标明只有非逃逸闭包能捕获 `in-out` 参数。
* 更新[默认参数值](../chapter2/06_Functions.md#default-parameter-values)一节，现在默认参数不能在调用时候重新排序。
* 更新[属性](../chapter3/07_Attributes.md)章节中关于属性参数使用分号的说明。
* 增加[重新抛出函数和方法](../chapter3/06_Declarations.md#rethrowing-functions-and-methods)一节中关于在 catch 代码块中抛出错误的重新抛出函数的信息。
* 增加[Selector 表达式](../chapter3/04_Expressions.md#selector-expression7)一节中关于访问 Objective-C 中 Selector 的 getter 和 setter 的信息。
* 增加[类型别名声明](../chapter3/06_Declarations.md#type-alias-declaration)一节，标明函数类型作为参数类型必须使用括号包裹。
* 增加[函数类型](../chapter3/03_Types.md#function_type)一节中关于泛型类型别名和在协议内使用类型别名的信息。
* 更新[属性](../chapter3/07_Attributes.md)章节，标明 `@IBAction`，`@IBOutlet` 和 `@NSManaged` 隐式含有 `@objc` 属性。
* 增加[声明属性](../chapter3/07_Attributes.md#Ideclaration-attributes)一节中关于 `@GKInspectable` 的信息。
* 更新[可选协议要求](../chapter2/21_Protocols.md#optional-protocol-requirements)一节中关于只能在与 `Objective-C` 交互的代码中才能使用可选协议要求的信息。
* 删除[函数声明](../chapter3/06_Declarations.md#function-declaration)一节中关于显式使用 `let` 关键字作为函数参数的信息。
* 删除[语句](../chapter3/05_Statements.md)一节中关于 `Boolean` 协议的信息， 现在这个协议已经被 Swift 标准库删除。
* 更正[声明属性](../chapter3/07_Attributes.md#Ideclaration-attributes)一节中关于 `@NSApplicationMain` 协议的信息。

### 2016-03-21

* 更新至 Swift 2.2。
* 增加了[编译配置语句](../chapter3/05_Statements.md#Conditional-Compilation-Block)一节中关于如何根据 Swift 版本进行条件编译。
* 增加了[显示成员表达式](../chapter3/04_Expressions.md#explicit-member-expression)一节中关于如何区分只有参数名不同的方法和构造器的信息。
* 增加了[选择器表达式](../chapter3/04_Expressions.md#selector-expression7)一节中针对 Objective-C 选择器的 `#selector` 语法。
* 更新了[关联类型](../chapter2/22_Generics.md#associated-types)和[协议关联类型声明](../chapter3/06_Declarations.md#protocol_associated_type_declaration)中的关于使用 `associatedtype` 关键词修饰关联类型的讨论。
* 更新了[可失败构造器](../chapter2/14_Initialization.md#failable-initializers)一节中关于当构造器在实例完全初始化之前返回 `nil` 的相关信息。
* 增加了[比较运算符](../chapter2/BasicOperators.md#comparison-operators)一节中关于比较元组的信息。
* 增加了[关键字和标点符号](../chapter3/02_Lexical_Structure.md#keywords-and-punctuation)一节中关于使用关键字作为外部参数名的信息。
* 增加了[声明特性](../chapter3/07_Attributes.md#Ideclaration-attributes)一节中关于 `@objc` 特性的讨论，并指出枚举和枚举用例。
* 增加了[操作符](../chapter3/02_Lexical_Structure.md#operator)一节中对于自定义运算符的讨论包含了 `.`。
* 增加了[重新抛出错误的函数和方法](../chapter3/06_Declarations.md#rethrowing-functions-and-methods)一节中关于重新抛出错误函数不能直接抛出错误的笔记。
* 增加了[属性观察器](../chapter2/10_Properties.md#property-observers)一节中关于当作为 in-out 参数传递属性时，属性观察器的调用行为。
* 增加了[Swift 初见](./03_a_swift_tour.md)一节中关于错误处理的内容。
* 更新了[弱引用](../chapter2/23_Automatic_Reference_Counting.md#weak-references)一节中的图片用以更清楚的展示重新分配过程。
* 删除了 C 语言风格的 `for` 循环，`++` 前缀和后缀运算符，以及 `--` 前缀和后缀运算符。
* 删除了对变量函数参数和柯里化函数的特殊语法的讨论。

### 2015-10-20

* 更新至 Swift 2.1。
* 更新了[字符串插值](../chapter2/03_Strings_And_Characters.md#string-interpolation)和[字符串字面量](../chapter3/02_Lexical_Structure.md#string-literal)小节，现在字符串插值可包含字符串字面量。
* 增加了在[逃逸闭包](../chapter2/07_Closures.md#escaping-closures)一节中关于 `@noescape` 属性的相关内容。
* 更新了[声明特性]((../chapter3/07_Attributes.md#Ideclaration-attributes)和[编译配置语句](../chapter3/05_Statements.md#Conditional-Compilation-Block)小节中与 tvOS 相关的信息。
* 增加了[In-Out 参数](../chapter3/06_Declarations.md#in-out_parameters)小节中与 in-out 参数行为相关的信息。
* 增加了在[捕获列表](../chapter3/04_Expressions.md#capture-lists)一节中关于指定闭包捕获列表被捕获时捕获值的相关内容。
* 更新了使用[可选链式调用访问属性](../chapter2/16_Optional_Chaining.md#accessing-properties-through-optional-chaining)一节，阐明了如何通过可选链式调用进行赋值。
* 改进了[自动闭包](../chapter2/07_Closures.md#autoclosures)一节中对自闭包的讨论。
* 在[Swift 初见](./03_a_swift_tour.md)一节中更新了一个使用 `??` 操作符的例子。

### 2015-09-16

* 更新至 Swift 2.0。
* 在[错误处理](../chapter2/17_Error_Handling.md)一章中增加了关于错误处理的相关内容，包括[Do 语句](../chapter3/05_Statements.md#do-statement)、[Throw 语句](../chapter3/05_Statements.md#throw-statement)、[Defer 语句](../chapter3/05_Statements.md##defer-statements)以及[try 运算符](../chapter3/04_Expressions.md#try-operator)。
* 更新了[错误表示和抛出](../chapter2/17_Error_Handling.md#representing-and-throwing-errors)一节，现在所有类型都可以遵循 `ErrorType` 协议了。
* 在[将错误装换成可选值](../chapter2/17_Error_Handling.md#converting_errors_to_optional_values)一节增加了 `try` 关键字相关信息。
* 在[枚举](../chapter2/08_Enumerations.md)一章的[递归枚举](../chapter2/08_Enumerations.md#recursive-enumerations)部分以及以及[声明](../chapter3/06_Declarations.md)一章的[任意类型用例的枚举](../chapter3/06_Declarations.md#enumerations-with-cases-of-any-type)一节中新增了递归枚举相关信息。
* 在[控制流](../chapter2/05_Control_Flow.md)一章的[API 可用性检查](../chapter2/05_Control_Flow.md#checking-api-availability)一节和[语句](../chapter3/05_Statements.md)一章的[可用性条件一节](../chapter3/05_Statements.md#availability-condition)中增加了关于 API 可用性检查相关的内容。
* 在[控制流](../chapter2/05_Control_Flow.md)一章的[尽早退出](../chapter2/05_Control_Flow.md#early-exit)一节和[语句](../chapter3/05_Statements.md)一章的[Guard 语句](../chapter3/05_Statements.md#guard-statement)部分新增了与 `guard` 语句相关的内容。
* 在[协议](../chapter2/21_Protocols.md)一章中[协议扩展](../chapter2/21_Protocols.md#protocol-extensions)一节中新增了关于协议扩展的内容。
* 在[访问控制](../chapter2/25_Access_Control.md)一章的[单元测试 target 的访问级别](../chapter2/25_Access_Control.md#access-levels-for-unit-test-targets)一节中新增了关于单元测试访问控制相关的内容。
* 在[模式](../chapter3/08_Patterns.md)一章的[可选模式](../chapter3/08_Patterns.md#optional-pattern)一节中增加了可选模式相关内容。
* 更新了[Repeat-While](../chapter2/05_Control_Flow.md#repeat-while)一节中关于 `repeat-while` 循环相关的内容。
* 更新了[字符串和字符](../chapter2/03_Strings_And_Characters.md)一章，现在 `String` 类型在 Swift 标准库中不再遵循 `CollectionType` 协议。
* 在[常量与变量打印](../chapter2/01_TheBasics.md#printing)一节中增加了新 Swift 标准库中关于 `print(_:separator:terminator)` 相关内容。
* 在[枚举](../chapter2/08_Enumerations.md)一章中的[原始值的隐式赋值](../chapter2/08_Enumerations.md#implicitly-assigned-raw-values)一节和[声明](../chapter3/06_Declarations.md)一章的[包含原始值类型的枚举](../chapter3/06_Declarations.md#enumerations-with-cases-of-a-raw-value-type)一节中增加了关于包含 `String` 原始值的枚举用例的行为相关内容。
* 在[自动闭包](../chapter2/07_Closures.md#autoclosures)一节中增加了关于 `@autoclosure` 特性的相关信息，包括它的 `@autoclosure(escaping)` 形式。
* 更新了[声明特性](../chapter3/07_Attributes.md#Ideclaration-attributes)一节中关于 `@avaliable` 和 `warn_unused_result` 特性的相关内容。
* 更新了[类型特性](../chapter3/07_Attributes.md#type-attributes)一节中关于 `@convention` 特性的相关信息。
* 在[可选绑定](../chapter2/01_TheBasics.md#optional-binding)一节中增加了关于使用 `where` 子句进行多可选绑定的相关内容。
* 在[字符串字面量](../chapter3/02_Lexical_Structure.md#string-literal)一节中新增了关于在编译时使用 `+` 运算符拼接字符串字面量的相关信息。
* 在[元类型](../chapter3/03_Types.md#metatype-type)一节中新增了关于元类型值的比较和使用它们通过构造器表达式构造实例相关内容。
* 在[断言调试](../chapter2/01_TheBasics.md#debugging-with-assertions)一节中新增了关于用户定义断言何时会失效的注释内容。
* 更新了[声明特性](../chapter3/07_Attributes.md#Ideclaration-attributes)一节中对 `@NSManaged` 特性的讨论，现在这个特性可以被应用到一个确定实例方法。
* 更新了[可变参数](../chapter2/06_Functions.md#variadic-parameters)一节，现在可变参数可以声明在函数参数列表的任意位置中。
* 在[重写可失败构造器](../chapter2/14_Initialization.md#overriding-a-failable-initializer)一节中新增了关于非可失败构造器相当于一个可失败构造器通过父类构造器的结果进行强制拆包的相关内容。
* 在[任意类型用例的枚举](../chapter3/06_Declarations.md#enumerations-with-cases-of-any-type)一节中增加了关于枚举用例作为函数的内容。
* 在[构造器表达式](../chapter3/04_Expressions.md#initializer-expression)一节中新增关于显式引用一个构造器相关内容。
* 在[编译控制语句](../chapter3/05_Statements.md#compiler-control-statements)一节中新增了关于编译信息以及行控制语句相关信息。
* 在[元类型](../chapter3/03_Types.md#metatype-type)一节中新增了关于如何从元类型值中构造类实例相关内容。
* 在[弱引用](../chapter2/23_Automatic_Reference_Counting.md#weak-references)一节中关于弱引用作为缓存所存在的不足的注释说明。
* 更新了[类型特性](../chapter2/10_Properties.md#type-properties)一节，提到了存储型特性其实是懒加载。
* 更新了[捕获类型](../chapter2/07_Closures.md#capturing_values)一节，阐明了变量和常量在闭包中如何被捕获。
* 更新了[声明特性](../chapter3/07_Attributes.md#Ideclaration-attributes)一节，用以描述何时在类中使用 `@objc` 关键字。
* 在[错误处理](../chapter2/17_Error_Handling.md#handling-errors)一节中增加了关于执行 `throw` 语句的性能的讨论。在[Do 语句](../chapter3/05_Statements.md#do-statement)一节的 do 语句部分也增加了类似内容。
* 更新了[类型特性](../chapter2/10_Properties.md#type-properties)一节中关于类、结构体和枚举的存储型和计算型特性相关的内容。
* 更新了[Break 语句](../chapter3/05_Statements.md#break_statement)一节中关于带标签的 break 语句相关内容。
* 在[属性观察器](../chapter2/10_Properties.md#property-observers)一节中更新了一处注释，用来明确 `willSet` 和 `didSet` 观察器的行为。
* 在[访问级别](../chapter2/25_Access_Control.md#access-levels)一节中新增了关于 `private` 作用域的相关信息说明。
* 在[弱引用](../chapter2/23_Automatic_Reference_Counting.md#weak-references)一节中增加了关于弱应用在垃圾回收系统和 ARC 之间的区别的说明。
* 更新了[字符串字面量中特殊字符](../chapter2/03_Strings_And_Characters.md#special-characters-in-string-literals)一节中对 Unicode 标量更精确的定义。


### 2015-4-8

* 更新至 Swift 1.2。
* Swift 现在自身提供了一个 `Set` 集合类型，更多信息请看[Sets](../chapter2/CollectionTypes.md#sets)。
* `@autoclosure` 现在是一个参数声明的属性，而不是参数类型的属性。这里还有一个新的参数声明属性 `@noescape`。更多信息，请看[属性声明](../chapter3/07_Attributes.md#Ideclaration-attributes)。
* 对于类型属性和方法现在可以使用 `static` 关键字作为声明描述符，更多信息，请看[类型变量属性](../chapter3/06_Declarations.md#type-variable-properties)。
* Swift 现在包含一个 `as?` 和 `as!` 的向下可失败类型转换运算符。更多信息，请看[协议遵循性检查](../chapter2/21_Protocols.md#checking-for-protocol-conformance)。
* 增加了一个关于[字符串索引](../chapter2/03_Strings_And_Characters.md#string-indices)的新指导章节。
* 从[溢出运算符](../chapter2/26_Advanced_Operators.md#overflow-operators)一节中移除了溢出除运算符（&/）和求余溢出运算符（&%）。
* 更新了常量和常量属性在声明和构造时的规则，更多信息，请看[常量声明](../chapter3/06_Declarations.md#constant-declaration)。
* 更新了字符串字面量中 Unicode 标量集的定义，请看[字符串字面量中的特殊字符](../chapter2/03_Strings_And_Characters.md#special-characters-in-string-literals)。
* 更新了[区间运算符](../chapter2/BasicOperators.md#range-operators)章节来提示当半开区间运算符含有相同的起止索引时，其区间为空。
* 更新了[闭包引用类型](../chapter2/07_Closures.md#closures-are-reference-types)章节来阐明对于变量的捕获规则。
* 更新了[值溢出](../chapter2/26_Advanced_Operators.md#value-overflow)章节堆有符号整数和无符号整数的溢出行为进行了阐明。
* 更新了[协议声明](../chapter3/06_Declarations.md#protocol-declaration)章节对协议声明时的作用域和成员等内容进行了阐明。
* 更新了[捕获列表](../chapter2/23_Automatic_Reference_Counting.md#defining-a-capture-list)章节对于闭包捕获列表中的弱引用和无主引用的使用语法进行了阐明。
* 更新了[运算符](../chapter3/02_Lexical_Structure.md#operator)章节，明确指明一些例子来说明自定义运算符所支持的特性，如数学运算符，各种符号，Unicode 符号块等。
* 在函数作用域中的常量声明时可以不被初始化，它必须在第一次使用前被赋值。更多的信息，请看[常量声明](../chapter3/06_Declarations.md#constant-declaration)。
* 在构造器中，常量属性有且仅能被赋值一次。更多信息，请看[在构造过程中给常量属性赋值](../chapter2/14_Initialization.md{#assigning-constant-properties-during-initialization)。
* 多个可选绑定现在可以在`if`语句后面以逗号分隔的赋值列表的方式出现，更多信息，请看[可选绑定](../chapter2/01_TheBasics.md#optional-binding)。
* 一个[可选链表达式](../chapter3/04_Expressions.md#optional-chaining-expression)必须出现在后缀表达式中。
* 协议类型转换不再局限于 `@obj` 修饰的协议了。
* 在运行时可能会失败的类型转换可以使用 `as?` 和 `as!` 运算符，而确保不会失败的类型转换现在使用 `as` 运算符。更多信息，请看[类型转换运算符](../chapter3/04_Expressions.md#type-casting-operator)。

### 2014-10-16

* 更新至 Swift 1.1。
* 增加了关于[失败构造器](../chapter2/14_Initialization.md#failable-initializers)的完整章节。
* 增加了协议中关于[失败构造器要求](../chapter2/21_Protocols.md#failable-initializer-requirements)的描述。
* 常量和变量的 `Any` 类型现可以包含函数实例。更新了关于 `Any` 相关的示例来展示如何在 `switch` 语句中如何检查并转换到一个函数类型。
* 带有原始值的枚举类型增加了一个 `rawValue` 属性替代 `toRaw()` 方法，同时使用了一个以 `rawValue` 为参数的失败构造器来替代 `fromRaw()` 方法。更多的信息，请看[原始值](../chapter2/08_Enumerations.md#raw-values)和[带原始值的枚举类型](../chapter3/06_Declarations.md#enumerations-with-cases-of-a-raw-value-type)部分。
* 添加了一个关于 [Failable Initializer](../chapter3/06_Declarations.md#failable-initializers) 的新参考章节，它可以触发初始化失败。
* 自定义运算符现在可以包含 `?` 字符，更新[运算符](../chapter3/02_Lexical_Structure.md#operator)章节描述了改进后的规则，并且从[自定义运算符](../chapter2/26_Advanced_Operators.md#custom-operators)章节删除了重复的运算符有效字符集合。

### 2014-08-18

* 发布新的文档用以详述 Swift 1.0，苹果公司针对 iOS 和 OS X 应用的全新开发语言。
* 在章节协议中，增加新的小节：[对构造器的规定](../chapter2/21_Protocols.md#initializer-requirements)。
* 在章节协议中，增加新的小节：[类专属协议](../chapter2/21_Protocols.md#class-only-protocol)。
* [断言](../chapter2/01_TheBasics.md#assertions-and-preconditions)现在可以使用字符串内插语法，并删除了文档中有冲突的注释。
* 更新了[连接字符串和字符](../chapter2/03_Strings_And_Characters.md#concatenating-strings-and-characters)小节来说明一个事实，那就是字符串和字符不能再用 `+` 号运算符或者复合加法运算符 `+=` 相互连接，这两种运算符现在只能用于字符串之间相连。请使用 `String` 类型的 `append` 方法在一个字符串的尾部增加单个字符。
* 在[属性申明](../chapter3/07_Attributes.md#Ideclaration-attributes)章节增加了关于  `availability` 特性的一些信息。
* [可选类型](../chapter2/01_TheBasics.md#optionals)若有值时，不再隐式的转换为 `true`，同样，若无值时，也不再隐式的转换为 `false`，这是为了避免在判别 optional `Bool` 的值时产生困惑。 替代的方案是，用`==` 或 `!=` 运算符显式地去判断 Optinal 是否是 `nil`，以确认其是否包含值。
* Swift 新增了一个[Nil 合并运算符](../chapter2/BasicOperators.md#nil-coalescing-operator)(`a ?? b`), 该表达式中，如果 Optional `a` 的值存在，则取得它并返回，若 Optional `a`为`nil`，则返回默认值 `b`
* 更新和扩展[字符串的比较](../chapter2/03_Strings_And_Characters.md#comparing-strings)，用以反映和展示'字符串和字符的比较'，以及'前缀（prefix）/后缀（postfix）比较'都开始基于扩展字符集（extended grapheme clusters）规范的等价比较。
* 现在，你可以通过下标赋值或者[可选调用链](../chapter2/16_Optional_Chaining.md)中的可变方法和操作符来给属性设值。相应地更新了有关[通过可选链接访问属性](../chapter2/16_Optional_Chaining.md#accessing-properties-through-optional-chaining)的信息，并扩展了[通过可选链接调用方法](../chapter2/16_Optional_Chaining.md#calling-methods-through-optional-chaining)时检查方法调用成功的示例，以显示如何检查属性设置是否成功。
* 在章节可选链中，增加一个新的小节[访问可选类型的下标脚注](../chapter2/16_Optional_Chaining.md#accessing-subscripts-through-optional-chaining)。
* 更新章节[访问和修改数组](../chapter2/CollectionTypes.md#accessing-and-modifying-a-dictionary)以标示：从该版本起，不能再通过 `+=` 运算符给一个数组添加一个新的项。对应的替代方案是，使 `append` 方法，或者通过 `+=` 运算符来添加一个只有一个项的数组。
* 添加了一个提示：在[范围运算符](../chapter2/BasicOperators.md#range-operators)中，比如， `a..b` 和 `a..<b` ，起始值 `a` 不能大于结束值 `b`。
* 重写了[继承](../chapter2/13_Inheritance.md)这一章：删除了本章中关于构造器重写的介绍性报道；转而将更多的注意力放到新增的部分——子类的新功能，以及如何通过重写（overrides）修改已有的功能。另外，[重写属性的 Getters 和 Setters](../chapter2/13_Inheritance.md#overriding-property-etters-and-setters)中的例子已经被替换为展示如何重写一个 `description` 属性。 (而关于如何在子类的构造器中修改继承属性的默认值的例子，已经被移到[构造过程](../chapter2/14_Initialization.md)这一章。)
* 更新了[构造器的继承与重写](../chapter2/14_Initialization.md#initializer-inheritance-and-overriding)小节以标示： 重写一个特定的构造器必须使用 `override` 修饰符。
* 更新[Required 构造器](../chapter2/14_Initialization.md#required-initializers)小节以标示：`required` 修饰符现在需要出现在所有子类的 required 构造器的声明中，而 required 构造器的实现，现在可以仅从父类自动继承。
* 中置（Infix）的[运算符函数](../chapter2/26_Advanced_Operators.md#operator-functions)不再需要 `@infix` 属性。
* [前置和后置运算符](../chapter2/26_Advanced_Operators.md#prefix-and-postfix-operators)的 `@prefix` 和 `@postfix` 属性，已变更为 `prefix` 和 `postfix` 声明修饰符。
* 增加一条注解：当 Prefix 和 postfix 运算符被作用于同一个操作数时，关于[前置和后置运算符](../chapter2/26_Advanced_Operators.md#prefix-and-postfix-operators)的执行顺序。
* 在运算符函数中，[组合赋值运算符](../chapter2/26_Advanced_Operators.md#compound-assignment-operators)不再使用 `@assignment` 属性来定义函数。
* 在这个版本中，在定义[自定义操作符](../chapter2/26_Advanced_Operators.md#custom-operators)时，`修饰符（Modifiers）的出现顺序发生变化`。比如现在，你该编写 `prefix operator`， 而不是 `operator prefix`。
* 在[声明修饰符](../chapter3/06_Declarations.md#declaration-modifiers)章节增加关于 `dynamic` 声明修饰符的信息。
* 增加[字面量](../chapter3/02_Lexical_Structure.md#literal)的类型推导内容。
* 为章节 Curried Functions 添加了更多的信息。
* 加入新的章节[权限控制(../chapter2/25_Access_Control.md)。
* 更新了[字符串和字符](../chapter2/03_Strings_And_Characters.md)章节用以表明，在 Swift 中，`Character` 类型现在代表的是扩展字符集（extended grapheme cluster）中的一个 Unicode，为此，新增了小节[Extended Grapheme Clusters](../chapter2/03_Strings_And_Characters.md#extended-grapheme-clusters)。同时，为小节[Unicode 标量](../chapter2/03_Strings_And_Characters.md#unicode-scalars-representation)和[字符串比较](../chapter2/03_Strings_And_Characters.md#comparing-strings)增加了更多内容。
* 更新[字符串字面量](../chapter2/03_Strings_And_Characters.md#string-literals)章节：在一个字符串中，Unicode 标量（Unicode scalars）以 `\u{n}`的形式来表示，`n` 是一个最大可以有8位的16进制数。
* `NSString` `length` 属性已被映射到 Swift 的内建 `String`类型。（注意，这两属性的类型是`utf16Count`，而非 `utf16count`）。
* Swift 的内建 `String` 类型不再拥有 `uppercaseString` 和 `lowercaseString` 属性。其对应部分在章节[字符串和字符](../chapter2/03_Strings_And_Characters.md)已经被删除，并且各种对应的代码用例也已被更新。
* 加入新的章节[没有外部名的构造器参数](../chapter2/14_Initialization.md#initializer-parameters-without-external-names)。
* 加入新的章节[Required 构造器](../chapter2/14_Initialization.md#required-initializers)。
* 加入新的章节[可选元组返回类型](../chapter2/06_Functions.md#optional-tuple-return-types)。
* 更新了[类型标注](../chapter2/01_TheBasics.md#type-annotations)章节：多个相关变量可以用"类型标注”在同一行中声明为同一类型。
* `@optional`, `@lazy`, `@final`,  `@required` 等关键字被更新为 `optional`, `lazy`, `final`, `required` 参见[声明修饰符](../chapter3/06_Declarations.md#declaration-modifiers)。
* 更新整本书中关于 `..<` 的引用，从半闭区间改为了[半开区间](../chapter2/BasicOperators.md#half-open-range-operator)。
* 更新了小节[读取和修改字典](../chapter2/CollectionTypes.md#accessing-and-modifying-a-dictionary)：  `Dictionary` 现在增加了一个 Boolean 型的属性：`isEmpty`。
* 解释了哪些字符（集）可被用来定义[自定义操作符](../chapter2/26_Advanced_Operators.md#custom-operators)。
* `nil` 和布尔运算中的 `true` 和 `false` 现在被定义为[字面量](../chapter3/02_Lexical_Structure.md#literal)。
* Swift 中的数组 （`Array`） 类型从现在起具备了完整的值语义。具体信息被更新到[集合的可变性](../chapter2/CollectionTypes.md#mutability-of-collections)和[数组](../chapter2/CollectionTypes.md#arrays)两小节，以反映这个新的变化。 此外，还解释了如何给 Strings, Arrays 和 Dictionaries 进行赋值和拷贝。
* [数组类型速记语法](../chapter2/CollectionTypes.md#array-type-shorthand-syntax)从 `SomeType[]` 更新为 `[SomeType]`。
* 新增关于[字典类型的速记语法](../chapter2/CollectionTypes.md#dictionary-type-shorthand-syntax)的内容，现在书写格式为： `[KeyType: ValueType]`。
* 加入新的小节：[字典键类型的哈希值](../chapter2/CollectionTypes.md#hash-values-for-set-types)。
* [闭包表达式](../chapter2/07_Closures.md#closure-expressions)示例中使用新的全局函数 `sorted` 取代原先的全局函数 `sort` 去展示如何返回一个全新的数组。
* 更新关于[结构体逐一成员构造器](../chapter2/14_Initialization.md#memberwise-initializers-for-structure-types)的描述：即使结构体的成员 `没有默认值`，逐一成员构造器也可以自动获得。
* [半开区间运算符](../chapter2/BasicOperators.md#half-open-range-operator)由`..` 改为 `..<`。
* 添加一个[泛型拓展](../chapter2/22_Generics.md#extending-a-generic-type)的示例。
