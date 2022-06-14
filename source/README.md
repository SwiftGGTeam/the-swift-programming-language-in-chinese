# Swift 文档修订历史

### 2021-07-14

* 更新 [并发](../02_language_guide/28_Concurrency.md) 篇章里的示例，使用当前的并发 API。

### 2021-06-07

* 更新至 Swift 5.5。
* 在 [并发](../02_language_guide/28_Concurrency.md) 篇章、[Actor 声明](03_language_reference/06_Declarations.md#actor-declaration)、[异步函数和方法](03_language_reference/06_Declarations.md#asynchronous-functions-and-methods) 和 [Await 运算符](03_language_reference/04_Expressions.md#await-operators) 中新增了有关异步函数、任务和 actor 的内容。

### 2021-04-26

* 更新至 Swift 5.4。
* 新增 [结果构造器](../02_language_guide/27_Advanced_Operators.md#result-builders) 和 [resultBuilder](03_language_reference/07_Attributes.md#resultbuilder) 章节，其中包含结果构造器的内容。
* 新增 [指针类型的隐式转换](03_language_reference/04_Expressions.md#implicit-conversion-to-a-pointer) 章节，其中包含在函数调用时输入输出形参可以隐式转换到不安全指针的内容。
* 更新 [可变参数](../02_language_guide/06_Functions.md#variadic-parameters) 和 [函数声明](03_language_reference/06_Declarations.md#function-declaration) 章节，现在函数可以有多个可变参数了。
* 更新 [隐式成员表达式](03_language_reference/04_Expressions.md#implicit-member-expression) 章节，现在可以链式调用隐式成员表达式了。

### 2020-09-16

* 更新至 Swift 5.3。
* 在 [尾随闭包](../02_language_guide/07_Closures.md#trailing-closures) 章节中新增了有关多个尾随闭包的内容，在 [函数调用表达式](../03_language_reference/04_Expressions.md#function-call-expression) 章节中新增了有关尾随闭包如何匹配形参的内容。
* 在 [使用合成实现来采纳协议](../02_language_guide/21_Protocols.md#adopting-a-protocol-using-a-synthesized-implementation) 章节中新增了枚举合成实现 `Comparable` 的内容。
* 新增 [包含上下文关系的 where 分句](../02_language_guide/22_Generics.md#contextual-where-clauses) 章节，现在可以在更多位置编写范型 `where` 分句。
* 新增 [无主可选引用](../02_language_guide/24_Automatic_Reference_Counting.md#unowned-optional-references) 章节，其中包含可选值使用无主引用的内容。
* 在 [main](../03_language_reference/07_Attributes.md#main) 章节中新增有关 `@main` 特性的内容。
* 在 [字面量表达式](../03_language_reference/04_Expressions.md#literal-expression) 章节中新增 `#filePath`，并更新了 `#file` 的讨论。
* 更新 [逃逸闭包](../02_language_guide/07_Closures.md#escaping-closures) 章节，现在闭包可以在更多场景隐式引用 `self`。
* 更新 [用 Do-Catch 处理错误](../02_language_guide/17_Error_Handling.md#handling-errors-using-do-Catch) 和 [Do 语句](../03_language_reference/05_Statements.md#do-statements) 章节，现在 `catch` 子句可以匹配多个错误。
* 新增更多有关 `Any` 的内容并移动到新增的 [Any 类型](../03_language_reference/03_Types.md#any-type) 章节。
* 更新 [属性观察器](../02_language_guide/10_Properties.md#property-observers) 章节，现在 lazy 属性可以有观察器。
* 更新 [协议声明](../03_language_reference/06_Declarations.md#protocol-declaration) 章节，现在枚举的成员可以用于遵循协议的要求。
* 更新 [存储型变量和属性的观察器](../03_language_reference/06_Declarations.md#stored-variable-observers-and-property-observers) 章节，描述观察器之前 getter 是何时被调用的。
* 更新 [内存安全](../02_language_guide/25_Memory_Safety.md) 篇章并提及原子操作。

### 2020-03-24

* 更新至 Swift 5.2。
* 在 [Key-Path 表达式](../03_language_reference/04_Expressions.md#key-path-expression) 章节中新增了有关传递 key path 代替闭包的内容。
* 在 [特殊名称方法](../03_language_reference/06_Declarations.md#methods-with-special-names) 章节中新增了有关让类、结构体和枚举的实例作为函数调用语法糖的内容。
* 更新 [下标选项](../02_language_guide/12_Subscripts.md#subscript-options) 章节，现在下标支持形参默认值。
* 更新 [自身类型](../03_language_reference/03_Types.md#self-type-h) 章节，现在 `Self` 可以在更多上下文中使用。
* 更新 [隐式解析可选类型](../02_language_guide/01_The_Basics.md#implicityly-unwrapped-optionals) 章节，明确了隐式解析可选值可以作为可选值或者非可选值使用。

### 2019-09-10

* 更新至 Swift 5.1。
* 在 [不透明类型](../02_language_guide/23_Opaque_Types.md) 篇章中新增了有关函数返回值遵循指定协议，而不需要提供指定返回类型的内容。
* 在 [属性包装器](../02_language_guide/10_Properties.md#property-wrappers) 章节中新增了有关属性包装器的内容。
* 在 [冻结](../03_language_reference/07_Attributes.md#frozen) 章节中新增了有关因库演变而需要的枚举和结构体冻结。
* 新增 [隐式返回的函数](../02_language_guide/06_Functions.md#functions-with-an-implicit-return) 和 [简化 Getter 声明](../02_language_guide/10_Properties.md#shorthand-getter-declaration) 章节，其中包含函数省略 `return` 的内容。
* 在 [类型下标](../02_language_guide/12_Subscripts.md#type-subscripts) 章节中新增了有关在类型中使用下标的内容。
* 更新 [枚举 Case 模式匹配](../03_language_reference/08_Patterns.md#enumeration-case-pattern) 章节，现在枚举 case 模式匹配支持匹配可选值。
* 更新 [结构体的逐一成员构造器](../02_language_guide/14_Initialization.md#memberwise-initializers-for-structure-types) 章节，现在逐一成员构造器支持在属性有默认值时省略形参。
* 在 [动态查找成员](../03_language_reference/07_Attributes.md#dynamicmemberlookup) 章节中新增了有关在运行时用 key path 查找动态成员的内容。
* 在 [条件编译代码块](../03_language_reference/05_Statements.md#Conditional-Compilation-Block) 中的目标环境里添加了 `macCatalyst`。
* 更新 [自身类型](../03_language_reference/03_Types.md#self-type-h) 章节，现在 `Self` 可以指向当前类，结构体或者枚举声明时的类型。

### 2019-03-25

* 更新至 Swift 5。
* 新增 [拓展字符串分隔符](../02_language_guide/03_Strings_and_Characters.md#extended-string-delimiters) 章节。更新 [字符串字面量](../03_language_reference/02_Lexical_Structure.md#string-literal) 章节，拓展有关字符串分隔符的内容。
* 新增 [动态调用](../03_language_reference/07_Attributes.md#dynamiccallable) 章节，其中包含使用 `dynamicCallable` 属性动态调用实例作为函数的内容。
* 新增 [unknown](../03_language_reference/07_Attributes.md#unknown) 和 [未来枚举匹配](../03_language_reference/05_Statements.md#future-case) 章节，其中包含了使用 `unknown` 来处理未来枚举可能发生改变的情形。
* 在 [Key-Path 表达式](../03_language_reference/04_Expressions.md#key-path-expression) 章节新增了有关标示 key path (\\.self) 的内容。
* 在 [可选编译块](../03_language_reference/05_Statements.md#Conditional-Compilation-Block) 章节新增了有关小于比较符 `<` 的内容。

### 2018-09-17

* 更新至 Swift 4.2。
* 在 [遍历枚举情形](../02_language_guide/08_Enumerations.md#iterating-over-enumeration-cases) 章节新增了有关访问所有枚举情形的内容。
* 在 [编译诊断](../03_language_reference/05_Statements.md#compile-time-diagnostic-statement) 章节新增了有关 `#error` 和 `#warning` 的内容。
* 在 [属性声明](../03_language_reference/07_Attributes.md#Ideclaration-attributes) 章节中新增了有关 `inlinable` 和 `usableFromInline` 属性的内容。
* 在 [属性声明](../03_language_reference/07_Attributes.md#Ideclaration-attributes) 章节中新增了有关 `requires-stored-property-inits` 和 `warn-unqualified-access` 属性的内容。
* 在 [可选编译块](../03_language_reference/05_Statements.md#Conditional-Compilation-Block) 章节新增了有关如何根据 Swift 编译器版本对代码进行对应编译处理的内容。
* 在 [字面量语法](../03_language_reference/04_Expressions.md#literal-expression) 章节新增了有关 `#dsohandle` 的内容。

### 2018-03-29

* 更新至 Swift 4.1。
* 在 [等价运算符](../02_language_guide/27_Advanced_Operators.md#equivalence-operators) 章节新增了有关等价运算符的合成实现的内容。
* 在 [声明](../03_language_reference/06_Declarations.md) 篇章中 [声明拓展](../03_language_reference/06_Declarations.md#extension-declaration) 章节和 [协议](../02_language_guide/21_Protocols.md) 篇章中 [有条件地遵循协议](../02_language_guide/21_Protocols.md#Conditionally-Conforming-to-a-Protocol) 章节新增了有关协议有条件遵循的内容。
* 在 [关联类型约束中使用协议](../02_language_guide/22_Generics.md#using-a-protocol-in-its-associated-types-constraints) 章节中新增了有关递归协议约束的内容。
* 在 [条件编译块](../03_language_reference/05_Statements.md#Conditional-Compilation-Block) 章节中新增了有关 `canImport()` 和 `targetEnvironment()` 平台条件的内容。

### 2017-12-04

* 更新至 Swift 4.0.3。
* 更新 [Key-Path 表达式](../03_language_reference/04_Expressions.md#key-path-expression) 章节，现在 key path 支持下标子路径。

### 2017-09-19

* 更新至 Swift 4.0。
* 在 [内存安全](../02_language_guide/25_Memory_Safety.md) 章节新增了有关内存互斥访问的内容。
* 新增 [带有泛型 Where 子句联类型](../02_language_guide/22_Generics.md#associated-types-with-a-generic-where-clause) 章节，现在可以使用泛型 `where` 子句约束关联类型。
* 在 [字符串和字符](../02_language_guide/03_Strings_and_Characters.md) 篇章中 [字面量](../02_language_guide/03_Strings_and_Characters.md#string-literals) 章节以及 [词法结构](../03_language_reference/02_Lexical_Structure.md) 篇章的 [字符串字面量](../03_language_reference/02_Lexical_Structure.md#string-literal) 章节中新增了有关多行字符串字面量的内容。
* 更新 [声明属性](../03_language_reference/07_Attributes.md#Ideclaration-attributes) 中 `objc` 属性的讨论，现在该属性会在更少的位置被推断出来。
* 新增 [范型下标](../02_language_guide/22_Generics.md#generic-subscripts) 章节，现在下标也支持范型特性了。
* 更新 [协议](../02_language_guide/21_Protocols.md) 篇章中 [协议组合](../02_language_guide/21_Protocols.md#protocol-composition) 章节和 [类型](../03_language_reference/03_Types.md) 篇章中 [协议组合类型](../03_language_reference/03_Types.md#protocol-composition-type-h) 章节的讨论，现在协议组合类型支持进行父类约束了。
* 更新 [拓展声明](../03_language_reference/06_Declarations.md#extension-declaration) 中有关协议扩展的讨论，现在它们不支持 `final` 特性了。
* 在 [断言和前置条件](../02_language_guide/01_The_Basics.md#assertions-and-preconditions) 章节中新增了部分前置条件和致命错误的内容。

### 2017-03-27

* 更新至 Swift 3.1。
* 新增 [范型 Where 子句扩展](../02_language_guide/22_Generics.md#extensions-with-a-generic-where-clause) 章节，包含需要的扩展内容。
* 在 [For-In 循环](../02_language_guide/05_Control_Flow.md#for-in-loops) 章节中新增了区间迭代的例子。
* 在 [可失败构造器](../02_language_guide/14_Initialization.md#failable-initializers) 章节中新增了可失败数值转换的例子。
* 在 [声明特性](../03_language_reference/07_Attributes.md#Ideclaration-attributes) 章节中新增了有关使用 Swift 语言版本的 `available` 特性的内容 。
* 更新 [函数类型](../03_language_reference/03_Types.md#function-type-h) 章节中的讨论，注意在写函数类型时不允许使用参数标签。
* 更新 [条件编译块](../03_language_reference/05_Statements.md#Conditional-Compilation-Block) 章节中的 Swift 语言版本号的讨论，现在可以使用可选的补丁版本号。
* 更新 [函数类型](../03_language_reference/03_Types.md#function-type-h) 章节的讨论，现在 Swift 区分了采用多参数的函数和采用元组类型的单个参数的函数。
* 在 [表达式](../03_language_reference/04_Expressions.md) 篇章中删除了动态表达式的章节，现在 `type(of:)` 是 Swift 标准库函数。        

### 2016-10-27

* 更新至 Swift 3.0.1。
* 更新 [自动引用计数](../02_language_guide/24_Automatic_Reference_Counting.md) 章节中有关 weak 和 unowned 引用的讨论。
* 在 [声明标识符](../03_language_reference/06_Declarations.md#declaration-modifiers) 章节中新增了有关新的标识符 `unowned`，`unowend(safe)` 和 `unowned(unsafe)` 的内容。
* 在 [Any 和 AnyObject 的类型转换](../02_language_guide/18_Type_Casting.md#type-casting-for-any-and-anyobject) 章节中新增了一处说明，有关使用类型 `Any` 作为可选值。               
* 更新 [表达式](../03_language_reference/04_Expressions.md) 章节，把括号表达式和元组表达式的描述分开。

### 2016-09-13

* 更新至 Swift 3.0。
* 更新 [函数](../02_language_guide/06_Functions.md) 篇章和 [函数声明](../03_language_reference/06_Declarations.md#function-declaration) 章节中有关函数的讨论，所有函数参数默认都有函数标签。
* 更新 [高级操作符](../02_language_guide/27_Advanced_Operators.md) 篇章中有关操作符的讨论，现在你可以作为类型函数来实现，替代之前的全局函数实现方式。
* 在 [访问控制](../02_language_guide/26_Access_Control.md) 章节中新增有关对新的访问级别描述符 `open` 和 `fileprivate` 的内容。
* 更新 [函数声明](../03_language_reference/06_Declarations.md#function-declaration) 章节中有关 `inout` 的讨论，注意它现在出现在参数类型的前面，而不是在参数名称的前面。
* 更新 [逃逸闭包](../02_language_guide/07_Closures.md#escaping-closures) 和 [自动闭包](../02_language_guide/07_Closures.md#autoclosures) 章节还有 [属性](../03_language_reference/07_Attributes.md) 篇章中有关 `@noescape` 和 `@autoclosure` 的讨论，现在他们是类型属性，而不是定义属性。
* 在 [高级操作符](../02_language_guide/27_Advanced_Operators.md) 篇章中 [自定义中缀操作符的优先级](./02_language_guide/27_Advanced_Operators.md#precedence-and-associativity-for-custom-infix-operators) 章节和 [定义](../03_language_reference/06_Declarations.md) 篇章中 [优先级组声明](../03_language_reference/06_Declarations.md#precedence-group-declaration-modifiers) 章节中新增了有关操作符优先级组的内容。
* 更新一些讨论，使用 macOS 替换掉 OS X， Error 替换掉 ErrorProtocol。更新一些协议名称，比如使用 ExpressibleByStringLiteral 替换掉 StringLiteralConvertible。
* 更新 [泛型](../02_language_guide/22_Generics.md) 篇章中 [泛型 Where 语句](../02_language_guide/22_Generics.md#extensions-with-a-generic-where-clause) 章节和 [泛型形参和实参](../03_language_reference/09_Generic_Parameters_and_Arguments.md) 篇章的讨论，现在泛型的 where 语句写在一个声明的最后。
* 更新 [逃逸闭包](../02_language_guide/07_Closures.md#escaping-closures) 章节中的讨论，现在闭包默认为非逃逸的。
* 更新 [基础部分](../02_language_guide/01_The_Basics.md) 篇章中 [可选绑定](../02_language_guide/01_The_Basics.md#optional-binding) 章节和 [语句](../03_language_reference/05_Statements.md) 篇章中 [While 语句](../03_language_reference/05_Statements.md#while-statement) 章节中的讨论，现在 if，`while` 和 `guard` 语句使用逗号分隔条件列表，不需要使用 `where` 语句。
* 在 [控制流](../02_language_guide/05_Control_Flow.md) 篇章中 [Switch](../02_language_guide/05_Control_Flow.md#switch) 章节和 [语句](../03_language_reference/05_Statements.md) 篇章中 [Switch 语句](../03_language_reference/05_Statements.md#switch-statement) 章节中新增了 switch cases 可以使用多模式的内容。
* 更新 [函数类型](../03_language_reference/03_Types.md#function-type-h) 章节有关现在函数参数标签不包含在函数类型中的讨论。
* 更新 [协议](../02_language_guide/21_Protocols.md) 篇章中 [协议组合](../02_language_guide/21_Protocols.md#protocol-composition) 章节和 [类型](../03_language_reference/03_Types.md) 篇章中 [协议组合类型](../03_language_reference/03_Types.md#protocol-composition-type-h) 章节中有关使用新的 Protocol1 & Protocol2 语法的内容。
* 更新动态类型表达式章节中使用新的 `type(of:)` 表达式的讨论。
* 更新 [行控制表达式](../03_language_reference/05_Statements.md#line-control-statement) 章节中使用 `#sourceLocation(file:line:)` 表达式的讨论。
* 更新 [永不返回函数](../03_language_reference/06_Declarations.md#functions-that-never-return) 章节中使用 新的 `Never` 类型的讨论。
* 在 [字面量表达式](../03_language_reference/04_Expressions.md#literal-expression) 章节中新增了有关 `playground` 字面量的内容。
* 更新 [In-Out 参数](../03_language_reference/06_Declarations.md#in-out-parameters) 章节，标明只有非逃逸闭包能捕获 `in-out` 参数。
* 更新 [默认参数值](../02_language_guide/06_Functions.md#default-parameter-values) 章节，现在默认参数不能在调用时候重新排序。
* 更新 [属性](../03_language_reference/07_Attributes.md) 篇章中有关属性参数使用分号的说明。
* 在 [重新抛出函数和方法](../03_language_reference/06_Declarations.md#rethrowing-functions-and-methods) 章节中新增了有关在 catch 代码块中抛出错误的重新抛出函数的内容。
* 在 [Selector 表达式](../03_language_reference/04_Expressions.md#selector-expression7) 章节中新增了中有关访问 Objective-C 中 Selector 的 getter 和 setter 的内容。
* 在 [类型别名声明](../03_language_reference/06_Declarations.md#type-alias-declaration) 章节中中新增了有关泛型类型别名和在协议内使用类型别名的内容。
* 更新 [函数类型](../03_language_reference/03_Types.md#function-type-h) 章节中有关函数类型的讨论，标明函数类型作为参数类型必须使用括号包裹。
* 更新 [属性](../03_language_reference/07_Attributes.md) 篇章，标明 `@IBAction`，`@IBOutlet` 和 `@NSManaged` 隐式含有 `@objc` 属性。
* 在 [声明属性](../03_language_reference/07_Attributes.md#Ideclaration-attributes) 章节中新增了有关 `@GKInspectable` 的内容。
* 更新 [可选协议要求](../02_language_guide/21_Protocols.md#optional-protocol-requirements) 章节中有关只能在与 `Objective-C` 交互的代码中才能使用可选协议要求的内容。
* 删除 [函数声明](../03_language_reference/06_Declarations.md#function-declaration) 章节中有关显式使用 `let` 关键字作为函数参数的内容。
* 删除 [语句](../03_language_reference/05_Statements.md) 章节中有关 `Boolean` 协议的内容， 现在这个协议已经被 Swift 标准库删除。
* 更正 [声明属性](../03_language_reference/07_Attributes.md#Ideclaration-attributes) 章节中有关 `@NSApplicationMain` 协议的内容。

### 2016-03-21

* 更新至 Swift 2.2。
* 在 [编译配置语句](../03_language_reference/05_Statements.md#Conditional-Compilation-Block) 章节新增了中有关如何根据 Swift 版本进行条件编译。
* 在 [显示成员表达式](../03_language_reference/04_Expressions.md#explicit-member-expression) 章节中新增了有关如何区分只有参数名不同的方法和构造器的内容。
* 在 [选择器表达式](../03_language_reference/04_Expressions.md#selector-expression7) 章节中新增了了针对 Objective-C 选择器的 `#selector` 语法。
* 更新 [关联类型](../02_language_guide/22_Generics.md#associated-types) 和 [协议关联类型声明](../03_language_reference/06_Declarations.md#protocol-associated-type-declaration) 章节中有关使用 `associatedtype` 关键词修饰关联类型的讨论。
* 更新 [可失败构造器](../02_language_guide/14_Initialization.md#failable-initializers) 章节中有关当构造器在实例完全初始化之前返回 `nil` 的相关内容。
* 在 [比较运算符](../02_language_guide/02_Basic_Operators.md#comparison-operators) 章节中新增了比较元组的内容。
* 在 [关键字和标点符号](../03_language_reference/02_Lexical_Structure.md#keywords-and-punctuation) 章节中新增了使用关键字作为外部参数名的内容。
* 更新 [声明特性](../03_language_reference/07_Attributes.md#Ideclaration-attributes) 章节中有关 `@objc` 特性的讨论，并指出枚举和枚举用例。
* 更新 [操作符](../03_language_reference/02_Lexical_Structure.md#operator) 章节中对于自定义运算符的包含了 `.` 的讨论。
* 在 [重新抛出错误的函数和方法](../03_language_reference/06_Declarations.md#rethrowing-functions-and-methods) 章节中新增了一处说明，重新抛出错误函数不能直接抛出错误。
* 在 [属性观察器](../02_language_guide/10_Properties.md#property-observers) 章节中新增了一处说明，当作为 in-out 参数传递属性时，属性观察器的调用行为。
* 在 [Swift 初见](../01_welcome_to_swift/03_a_swift_tour.md) 篇章中新增了错误处理的章节。
* 更新 [弱引用](../02_language_guide/24_Automatic_Reference_Counting.md#weak-references) 章节中的图片用以更清楚的展示重新分配过程。
* 删除 C 语言风格的 `for` 循环，`++` 前缀和后缀运算符，以及 `--` 前缀和后缀运算符。
* 删除对变量函数参数和柯里化函数的特殊语法的讨论。

### 2015-10-20

* 更新至 Swift 2.1。
* 更新 [字符串插值](../02_language_guide/03_Strings_and_Characters.md#string-interpolation) 和 [字符串字面量](../03_language_reference/02_Lexical_Structure.md#string-literal) 章节，现在字符串插值可包含字符串字面量。
* 在 [逃逸闭包](../02_language_guide/07_Closures.md#escaping-closures) 章节中新增了有关 `@noescape` 属性的相关内容。
* 更新 [声明特性](../03_language_reference/07_Attributes.md#Ideclaration-attributes) 和 [编译配置语句](../03_language_reference/05_Statements.md#Conditional-Compilation-Block) 章节中与 tvOS 相关的内容。
* 在 [In-Out 参数](../03_language_reference/06_Declarations.md#in-out-parameters) 章节中新增了与 in-out 参数行为相关的内容。
* 在 [捕获列表](../03_language_reference/04_Expressions.md#capture-lists) 章节新增了有关指定闭包捕获列表被捕获时捕获值的相关内容。
* 更新 [可选链式调用访问属性](../02_language_guide/16_Optional_Chaining.md#accessing-properties-through-optional-chaining) 章节，阐明了如何通过可选链式调用进行赋值。
* 改进 [自动闭包](../02_language_guide/07_Closures.md#autoclosures) 章节中对自闭包的讨论。
* 在 [Swift 初见](../01_welcome_to_swift/03_a_swift_tour.md) 篇章中新增了一个使用 `??` 操作符的例子。

### 2015-09-16

* 更新至 Swift 2.0。
* 在 [错误处理](../02_language_guide/17_Error_Handling.md) 篇章中新增了有关错误处理的相关内容，包括 [Do 语句](../03_language_reference/05_Statements.md#do-statement)、 [Throw 语句](../03_language_reference/05_Statements.md#throw-statement)、 [Defer 语句](../03_language_reference/05_Statements.md##defer-statements) 以及 [try 运算符](../03_language_reference/04_Expressions.md#try-operator)。
* 更新 [错误表示和抛出](../02_language_guide/17_Error_Handling.md#representing-and-throwing-errors) 章节，现在所有类型都可以遵循 `ErrorType` 协议了。
* 在 [将错误装换成可选值](../02_language_guide/17_Error_Handling.md#converting-errors-to-optional-values) 篇章增加了 `try?` 关键字相关内容。
* 在 [枚举](../02_language_guide/08_Enumerations.md) 篇章的 [递归枚举](../02_language_guide/08_Enumerations.md#recursive-enumerations) 章节以及以及 [声明](../03_language_reference/06_Declarations.md) 篇章的 [任意类型用例的枚举](../03_language_reference/06_Declarations.md#enumerations-with-cases-of-any-type) 章节中新增了递归枚举相关内容。
* 在 [控制流](../02_language_guide/05_Control_Flow.md) 篇章的 [API 可用性检查](../02_language_guide/05_Control_Flow.md#checking-api-availability) 章节和 [语句](../03_language_reference/05_Statements.md) 篇章的 [可用性条件](../03_language_reference/05_Statements.md#availability-condition)  章节中新增了有关 API 可用性检查相关的内容。
* 在 [控制流](../02_language_guide/05_Control_Flow.md) 篇章的 [尽早退出](../02_language_guide/05_Control_Flow.md#early-exit) 章节和 [语句](../03_language_reference/05_Statements.md) 篇章的 [Guard 语句](../03_language_reference/05_Statements.md#guard-statement) 章节新增了与 `guard` 语句相关的内容。
* 在 [协议](../02_language_guide/21_Protocols.md) 篇章中 [协议扩展](../02_language_guide/21_Protocols.md#protocol-extensions) 章节中新增了有关协议扩展的内容。
* 在 [访问控制](../02_language_guide/26_Access_Control.md) 篇章的 [单元测试 target 的访问级别](../02_language_guide/26_Access_Control.md#access-levels-for-unit-test-targets) 章节中新增了有关单元测试访问控制相关的内容。
* 在 [模式](../03_language_reference/08_Patterns.md) 篇章的 [可选模式](../03_language_reference/08_Patterns.md#optional-pattern) 章节中新增了可选模式相关内容。
* 更新 [Repeat-While](../02_language_guide/05_Control_Flow.md#repeat-while) 章节中有关 `repeat-while` 循环相关的内容。
* 更新 [字符串和字符](../02_language_guide/03_Strings_and_Characters.md) 章节，现在 `String` 类型在 Swift 标准库中不再遵循 `CollectionType` 协议。
* 在 [常量与变量打印](../02_language_guide/01_The_Basics.md#printing) 章节中新增了新 Swift 标准库中有关 `print(-:separator:terminator) ` 相关内容。
* 在 [枚举](../02_language_guide/08_Enumerations.md) 篇章的 [原始值的隐式赋值](../02_language_guide/08_Enumerations.md#implicitly-assigned-raw-values) 章节和 [声明](../03_language_reference/06_Declarations.md) 篇章的 [包含原始值类型的枚举](../03_language_reference/06_Declarations.md#enumerations-with-cases-of-a-raw-value-type) 章节中新增了有关包含 `String` 原始值的枚举用例的行为相关内容。
* 在 [自动闭包](../02_language_guide/07_Closures.md#autoclosures) 章节中新增了有关 `@autoclosure` 特性的相关内容，包括它的 `@autoclosure(escaping)` 形式。
* 更新 [声明特性](../03_language_reference/07_Attributes.md#Ideclaration-attributes) 章节中有关 `@avaliable` 和 `warn-unused-result` 特性的相关内容。
* 更新 [类型特性](../03_language_reference/07_Attributes.md#type-attributes) 章节中有关 `@convention` 特性的相关内容。
* 在 [可选绑定](../02_language_guide/01_The_Basics.md#optional-binding) 章节中新增了有关使用 `where` 子句进行多可选绑定的相关内容。
* 在 [字符串字面量](../03_language_reference/02_Lexical_Structure.md#string-literal) 章节中新增了有关在编译时使用 `+` 运算符拼接字符串字面量的相关内容。
* 在 [元类型](../03_language_reference/03_Types.md#metatype-type-h) 章节中新增了有关元类型值的比较和使用它们通过构造器表达式构造实例相关内容。
* 在 [断言调试](../02_language_guide/01_The_Basics.md#debugging-with-assertions) 章节中新增了一处说明，有关用户定义断言何时会失效。
* 更新 [声明特性](../03_language_reference/07_Attributes.md#Ideclaration-attributes) 章节中对 `@NSManaged` 特性的讨论，现在这个特性可以被应用到一个确定实例方法。
* 更新 [可变参数](../02_language_guide/06_Functions.md#variadic-parameters) 章节，现在可变参数可以声明在函数参数列表的任意位置中。
* 在 [重写可失败构造器](../02_language_guide/14_Initialization.md#overriding-a-failable-initializer) 章节中新增了有关非可失败构造器相当于一个可失败构造器通过父类构造器的结果进行强制拆包的相关内容。
* 在 [任意类型用例的枚举](../03_language_reference/06_Declarations.md#enumerations-with-cases-of-any-type) 章节中新增了有关枚举用例作为函数的内容。
* 在 [构造器表达式](../03_language_reference/04_Expressions.md#initializer-expression) 章节中新增了有关显式引用一个构造器相关内容。
* 在 [编译控制语句](../03_language_reference/05_Statements.md#compiler-control-statements) 章节中新增了有关编译内容以及行控制语句相关内容。
* 在 [元类型](../03_language_reference/03_Types.md#metatype-type-h) 章节新增了一处说明，有关如何从元类型值中构造类实例相关内容。
* 在 [弱引用](../02_language_guide/24_Automatic_Reference_Counting.md#weak-references) 章节新增了一处说明，有关弱引用作为缓存所存在的不足。
* 更新 [类型特性](../02_language_guide/10_Properties.md#type-properties) 章节，提到了存储型特性其实是懒加载。
* 更新 [捕获类型](../02_language_guide/07_Closures.md#capturing-values) 章节，阐明了变量和常量在闭包中如何被捕获。
* 更新 [声明特性](../03_language_reference/07_Attributes.md#Ideclaration-attributes) 章节，用以描述何时在类中使用 `@objc` 关键字。
* 在 [错误处理](../02_language_guide/17_Error_Handling.md#handling-errors) 章节中新增了一处说明，有关执行 `throw` 语句的性能。在 [Do 语句](../03_language_reference/05_Statements.md#do-statement) 章节的 do 语句部分也新增了类似内容。
* 更新 [类型特性](../02_language_guide/10_Properties.md#type-properties) 章节中有关类、结构体和枚举的存储型和计算型特性相关的内容。
* 更新 [Break 语句](../03_language_reference/05_Statements.md#break-statement) 章节中有关带标签的 break 语句相关内容。
* 在 [属性观察器](../02_language_guide/10_Properties.md#property-observers) 章节更新了一处说明，用来明确 `willSet` 和 `didSet` 观察器的行为。
* 在 [访问级别](../02_language_guide/26_Access_Control.md#access-levels) 章节新增了有关 `private` 作用域的相关内容说明。
* 在 [弱引用](../02_language_guide/24_Automatic_Reference_Counting.md#weak-references) 章节新增了有关弱应用在垃圾回收系统和 ARC 之间的区别的说明。
* 更新 [字符串字面量中特殊字符](../02_language_guide/03_Strings_and_Characters.md#special-characters-in-string-literals) 章节，对 Unicode 标量更精确定义。


### 2015-04-08

* 更新至 Swift 1.2。
* Swift 现在自身提供了一个 `Set` 集合类型，更多内容，请看 [Sets](../02_language_guide/04_Collection_Types.md#sets) 。
* `@autoclosure` 现在是一个参数声明的属性，而不是参数类型的属性。这里还有一个新的参数声明属性 `@noescape`。更多内容，请看 [属性声明](../03_language_reference/07_Attributes.md#Ideclaration-attributes) 。
* 对于类型属性和方法现在可以使用 `static` 关键字作为声明描述符，更多内容，请看 [类型变量属性](../03_language_reference/06_Declarations.md#type-variable-properties)。
* Swift 现在包含一个 `as?` 和 `as!` 的向下可失败类型转换运算符。更多内容，请看 [协议遵循性检查](../02_language_guide/21_Protocols.md#checking-for-protocol-conformance)。
* 新增 [字符串索引](../02_language_guide/03_Strings_and_Characters.md#string-indices) 的新指导章节。
* 在 [溢出运算符](../02_language_guide/27_Advanced_Operators.md#overflow-operators) 一节中删除了溢出除运算符（`&/`）和求余溢出运算符（`&%`）。
* 更新常量和常量属性在声明和构造时的规则，更多内容，请看 [常量声明](../03_language_reference/06_Declarations.md#constant-declaration) 。
* 更新字符串字面量中 Unicode 标量集的定义，请看 [字符串字面量中的特殊字符](../02_language_guide/03_Strings_and_Characters.md#special-characters-in-string-literals) 。
* 更新 [区间运算符](../02_language_guide/02_Basic_Operators.md#range-operators) 章节，注意当半开区间运算符含有相同的起止索引时，其区间为空。
* 更新 [闭包引用类型](../02_language_guide/07_Closures.md#closures-are-reference-types) 章节，对于变量的捕获规则进行了阐明。
* 更新 [值溢出](../02_language_guide/27_Advanced_Operators.md#value-overflow) 章节，对有符号整数和无符号整数的溢出行为进行了阐明。
* 更新 [协议声明](../03_language_reference/06_Declarations.md#protocol-declaration) 章节，对协议声明时的作用域和成员等内容进行了阐明。
* 更新 [捕获列表](../02_language_guide/24_Automatic_Reference_Counting.md#defining-a-capture-list) 章节，对于闭包捕获列表中的弱引用和无主引用的使用语法进行了阐明。
* 更新 [运算符](../03_language_reference/02_Lexical_Structure.md#operator) 章节，明确指明一些例子来说明自定义运算符所支持的特性，如数学运算符，各种符号，Unicode 符号块等。
* 在函数作用域中的常量声明时可以不被初始化，它必须在第一次使用前被赋值。更多的内容，请看 [常量声明](../03_language_reference/06_Declarations.md#constant-declaration)。
* 在构造器中，常量属性有且仅能被赋值一次。更多内容，请看 [在构造过程中给常量属性赋值](../02_language_guide/14_Initialization.md#assigning-constant-properties-during-initialization)。
* 多个可选绑定现在可以在`if`语句后面以逗号分隔的赋值列表的方式出现，更多内容，请看 [可选绑定](../02_language_guide/01_The_Basics.md#optional-binding)。
* 一个 [可选链表达式](../03_language_reference/04_Expressions.md#optional-chaining-expression) 必须出现在后缀表达式中。
* 协议类型转换不再局限于 `@obj` 修饰的协议了。
* 在运行时可能会失败的类型转换可以使用 `as?` 和 `as!` 运算符，而确保不会失败的类型转换现在使用 `as` 运算符。更多内容，请看 [类型转换运算符](../03_language_reference/04_Expressions.md#type-casting-operator)。

### 2014-10-16

* 更新至 Swift 1.1。
* 新增 [失败构造器](../02_language_guide/14_Initialization.md#failable-initializers) 的完整指引。
* 在协议中新增了 [失败构造器要求](../02_language_guide/21_Protocols.md#failable-initializer-requirements) 的描述。
* 常量和变量的 `Any` 类型现可以包含函数实例。更新了有关 `Any` 相关的示例来展示如何在 `switch` 语句中如何检查并转换到一个函数类型。
* 带有原始值的枚举类型增加了一个 `rawValue` 属性替代 `toRaw()` 方法，同时使用了一个以 `rawValue` 为参数的失败构造器来替代 `fromRaw()` 方法。更多的内容，请看 [原始值](../02_language_guide/08_Enumerations.md#raw-values) 和 [带原始值的枚举类型](../03_language_reference/06_Declarations.md#enumerations-with-cases-of-a-raw-value-type)。
* 新增 [Failable Initializer](../03_language_reference/06_Declarations.md#failable-initializers)  的参考章节，它可以触发初始化失败。
* 自定义运算符现在可以包含 `?` 字符，更新了 [运算符](../03_language_reference/02_Lexical_Structure.md#operator) 涉及改进后的规则的部分，并且在 [自定义运算符](../02_language_guide/27-Advanced-Operators.md#custom-operators) 章节中删除了重复的运算符有效字符集合。

### 2014-08-18

* 描述 Swift 1.0 的新文档。Swift 是苹果公司发布的全新编程语言，用于 iOS 和 OS X 应用开发。
* 在协议中新增了 [对构造器的规定](../02_language_guide/21_Protocols.md#initializer-requirements) 章节。
* 新增 [类专属协议](../02_language_guide/21_Protocols.md#class-only-protocol) 章节。
*  [断言](../02_language_guide/01_The_Basics.md#assertions-and-preconditions) 现在可以使用字符串内插语法，并删除了文档中有冲突的注释。
* 更新 [连接字符串和字符](../02_language_guide/03_Strings_and_Characters.md#concatenating-strings-and-characters) 章节来说明字符串和字符不能再用 `+` 号运算符或者复合加法运算符 `+=` 相互连接，这两种运算符现在只能用于字符串之间相连。请使用 `String` 类型的 `append` 方法在一个字符串的尾部增加单个字符。
* 在 [属性声明](../03_language_reference/07_Attributes.md#Ideclaration-attributes) 章节增加了有关  `availability` 特性的一些内容。
*  [可选类型](../02_language_guide/01_The_Basics.md#optionals) 若有值时，不再隐式的转换为 `true`，同样，若无值时，也不再隐式的转换为 `false`，这是为了避免在判别 optional `Bool` 的值时产生困惑。 替代的方案是，用`==` 或 `!=` 运算符显式地去判断 Optinal 是否是 `nil`，以确认其是否包含值。
* Swift 新增了一个 [Nil 合并运算符](../02_language_guide/02_Basic_Operators.md#nil-coalescing-operator)  (`a ?? b`) , 该表达式中，如果 Optional `a` 的值存在，则取得它并返回，若 Optional `a` 为 `nil`，则返回默认值 `b`
* 更新和扩展 [字符串的比较](../02_language_guide/03_Strings_and_Characters.md#comparing-strings) ，用以反映和展示'字符串和字符的比较'，以及'前缀（prefix）/后缀（postfix）比较'都开始基于扩展字符集（extended grapheme clusters）规范的等价比较。
* 现在，你可以通过下标赋值或者 [可选调用链](../02_language_guide/16_Optional_Chaining.md) 中的可变方法和操作符来给属性设值。相应地更新了有关 [通过可选链接访问属性](../02_language_guide/16_Optional_Chaining.md#accessing-properties-through-optional-chaining) 的内容，并扩展了 [通过可选链接调用方法](../02_language_guide/16_Optional_Chaining.md#calling-methods-through-optional-chaining) 时检查方法调用成功的示例，以显示如何检查属性设置是否成功。
* 在可选链中新增了 [访问可选类型的下标脚注](../02_language_guide/16_Optional_Chaining.md#accessing-subscripts-through-optional-chaining) 章节。
* 更新 [访问和修改数组](../02_language_guide/04_Collection_Types.md#accessing-and-modifying-a-dictionary) 章节以标示，从该版本起，不能再通过 `+=` 运算符给一个数组新增一个新的项。对应的替代方案是，使 `append` 方法，或者通过 `+=` 运算符来新增一个只有一个项的数组。
* 新增一处说明，在 [范围运算符](../02_language_guide/02_Basic_Operators.md#range-operators) 中，比如， `a..b` 和 `a..<b` ，起始值 `a` 不能大于结束值 `b`。
* 重写 [继承](../02_language_guide/13_Inheritance.md) 篇章：删除了本章中有关构造器重写的介绍性报道；转而将更多的注意力放到新增的部分——子类的新功能，以及如何通过重写（overrides）修改已有的功能。另外， [重写属性的 Getters 和 Setters](../02_language_guide/13_Inheritance.md#overriding-property-etters-and-setters) 中的例子已经被替换为展示如何重写一个 `description` 属性。 (而有关如何在子类的构造器中修改继承属性的默认值的例子，已经被移到 [构造过程](../02_language_guide/14_Initialization.md) 篇章。) 
* 更新 [构造器的继承与重写](../02_language_guide/14_Initialization.md#initializer-inheritance-and-overriding) 章节以标示： 重写一个特定的构造器必须使用 `override` 修饰符。
* 更新 [Required 构造器](../02_language_guide/14_Initialization.md#required-initializers) 章节以标示：`required` 修饰符现在需要出现在所有子类的 required 构造器的声明中，而 required 构造器的实现，现在可以仅从父类自动继承。
* 中置（Infix）的 [运算符函数](../02_language_guide/27_Advanced_Operators.md#operator-functions) 不再需要 `@infix` 属性。
* [前置和后置运算符](../02_language_guide/27_Advanced_Operators.md#prefix-and-postfix-operators) 的 `@prefix` 和 `@postfix` 属性，已变更为 `prefix` 和 `postfix` 声明修饰符。
* 新增一处说明，在 Prefix 和 postfix 运算符被作用于同一个操作数时 [前置和后置运算符](../02_language_guide/27_Advanced_Operators.md#prefix-and-postfix-operators) 的执行顺序。
* [组合赋值运算符](../02_language_guide/27_Advanced_Operators.md#compound-assignment-operators) 的运算符函数不再使用 `@assignment` 属性来定义函数。
* 在定义 [自定义操作符](../02_language_guide/27_Advanced_Operators.md#custom-operators) 时，`修饰符（Modifiers）的出现顺序发生变化`。比如现在，你该编写 `prefix operator`， 而不是 `operator prefix`。
* 在 [声明修饰符](../03_language_reference/06_Declarations.md#declaration-modifiers) 章节新增了有关 `dynamic` 声明修饰符的内容。
* 新增有关 [字面量](../03_language_reference/02_Lexical_Structure.md#literal) 类型推导内容的内容。
* 新增更多有关柯里化函数的内容。
* 新增 [权限控制](../02_language_guide/26_Access_Control.md) 篇章。
* 更新 [字符串和字符](../02_language_guide/03_Strings_and_Characters.md) 章节，在 Swift 中现在 `Character` 类型代表的是扩展字符集（extended grapheme cluster）中的一个 Unicode，为此，新增了 [Extended Grapheme Clusters](../02_language_guide/03_Strings_and_Characters.md#extended-grapheme-clusters) 章节。同时，[Unicode 标量](../02_language_guide/03-Strings-And-Characters.md#unicode-scalars-representation) 和 [字符串比较](../02_language_guide/03-Strings-And-Characters.md#comparing-strings) 章节新增了更多内容。
* 更新 [字符串字面量](../02_language_guide/03_Strings_and_Characters.md#string-literals) 章节，在一个字符串中，Unicode 标量（Unicode scalars）以 `\u{n}`的形式来表示，`n` 是一个最大可以有8位的16进制数。
* `NSString` `length` 属性已被映射到 Swift 的内建 `String`类型。（注意，这两属性的类型是`utf16Count`，而非 `utf16count`）。
* Swift 的内建 `String` 类型不再拥有 `uppercaseString` 和 `lowercaseString` 属性。在 [字符串和字符](../02_language_guide/03_Strings_and_Characters.md) 章节中删除了对应部分，并更新了各种对应的代码用例。
* 新增 [没有外部名的构造器参数](../02_language_guide/14_Initialization.md#initializer-parameters-without-external-names) 章节。
* 新增 [Required 构造器](../02_language_guide/14_Initialization.md#required-initializers) 章节。
* 新增 [可选元组返回类型](../02_language_guide/06_Functions.md#optional-tuple-return-types) 章节。
* 更新 [类型注解](../02_language_guide/01_The_Basics.md#type-annotations) 章节，多个相关变量可以用"类型注解”在同一行中声明为同一类型。
* `@optional`, `@lazy`, `@final`,  `@required` 等关键字被更新为 `optional`, `lazy`, `final`, `required` 参见 [声明修饰符](../03_language_reference/06_Declarations.md#declaration-modifiers)。
* 更新了整本书中有关 `..<` 的引用，从半闭区间改为了 [半开区间](../02_language_guide/02_Basic_Operators.md#half-open-range-operator)。
* 更新 [读取和修改字典](../02_language_guide/04_Collection_Types.md#accessing-and-modifying-a-dictionary) 章节， `Dictionary` 现在增加了一个 Boolean 型的属性：`isEmpty`。
* 解释了哪些字符（集）可被用来定义 [自定义操作符](../02_language_guide/27_Advanced_Operators.md#custom-operators)。
* `nil` 和布尔运算中的 `true` 和 `false` 现在被定义为 [字面量](../03_language_reference/02_Lexical_Structure.md#literal)。
* Swift 中的数组 （`Array`） 类型从现在起具备了完整的值语义。具体内容被更新到 [集合的可变性](../02_language_guide/04_Collection_Types.md#mutability-of-collections) 和 [数组](../02_language_guide/04_Collection_Types.md#arrays) 两小节，以反映这个新的变化。 此外，还解释了如何给 Strings, Arrays 和 Dictionaries 进行赋值和拷贝。
* [数组类型速记语法](../02_language_guide/04_Collection_Types.md#array-type-shorthand-syntax) 从 `SomeType []` 更新为 ` [SomeType]`。
* 新增 [字典类型的速记语法](../02_language_guide/04_Collection_Types.md#dictionary-type-shorthand-syntax) 章节，现在书写格式为： ` [KeyType: ValueType]`。
* 新增 [字典键类型的哈希值](../02_language_guide/04_Collection_Types.md#hash-values-for-set-types) 章节。
* [闭包表达式](../02_language_guide/07_Closures.md#closure-expressions) 示例中使用新的全局函数 `sorted` 取代原先的全局函数 `sort` 去展示如何返回一个全新的数组。
* 更新 [结构体逐一成员构造器](../02_language_guide/14_Initialization.md#memberwise-initializers-for-structure-types) 章节，即使结构体的成员 `没有默认值`，逐一成员构造器也可以自动获得。
* [半开区间运算符](../02_language_guide/02_Basic_Operators.md#half-open-range-operator) 中`..` 更新为 `..<`。
* 新增 [泛型拓展](../02_language_guide/22_Generics.md#extending-a-generic-type) 的示例。

