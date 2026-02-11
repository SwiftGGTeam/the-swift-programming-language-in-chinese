# 文档修订历史

查看本书的最新更改。

**2025-12-12**

- 更新至 Swift 6.2.3。
- 添加了 <doc:Attributes#export> 章节，
  介绍了如何将定义导出到客户端模块。

**2025-11-03**

- 更新至 Swift 6.2.1。
- 添加了 <doc:GenericParametersAndArguments#Integer-Generic-Parameters> 章节，
  介绍了具有数值的泛型参数。
- 在 <doc:TheBasics#Integers>
  和 <doc:TheBasics#Floating-Point-Numbers> 章节中
  添加了关于在整数和浮点数之间进行选择的信息。

**2025-09-15**

- 更新至 Swift 6.2。
- 添加了 <doc:TheBasics#Memory-Safety> 章节，
  介绍了 Swift 帮助你防止的问题。
- 添加了 <doc:ControlFlow#Patterns> 章节，
  介绍了 `if case` 语法。
- 在 <doc:Concurrency> 章节中
  添加了关于主 actor、隔离和全局 actor 的信息。
- 添加了 <doc:Protocols#Implicit-Conformance-to-a-Protocol> 章节，
  介绍了如何遵循常见协议，
  无需显式编写遵循声明，
  以及如何抑制隐式遵循。
- 添加了 <doc:Generics#Implicit-Constraints> 章节，
  介绍了需要遵循常见协议的泛型约束。

**2025-03-31**

- 更新至 Swift 6.1。
- 添加了 <doc:OpaqueTypes#Opaque-Parameter-Types> 章节，
  介绍了使用 `some` 作为泛型的轻量级语法。
- 在 <doc:Attributes#available> 章节中
  添加了关于 `noasync` 参数的信息。

**2024-09-23**

- 更新至 Swift 6。
- 添加了 <doc:Attributes#preconcurrency> 章节，
  介绍了如何迁移到严格并发检查。
- 添加了 <doc:ErrorHandling#Specifying-the-Error-Type> 章节，
  介绍了如何抛出特定类型的错误。
- 更新了 <doc:Expressions#Macro-Expansion-Expression> 章节，
  现在任何宏都可以用作参数的默认值。
- 在 <doc:AccessControl> 章节中
  添加了关于包级访问的信息。

**2024-03-05**

- 更新至 Swift 5.10。
- 在 <doc:Protocols#Delegation> 章节中
  添加了关于嵌套协议的信息。
- 在 <doc:Attributes#UIApplicationMain>
  和 <doc:Attributes#NSApplicationMain> 章节中
  添加了弃用信息。

**2023-12-11**

- 更新至 Swift 5.9.2。
- 在 <doc:Declarations#Parameter-Modifiers> 章节中
  添加了关于 `borrowing` 和 `consuming` 修饰符的信息。
- 在 <doc:TheBasics#Declaring-Constants-and-Variables> 中
  添加了关于在声明后设置常量值的信息。
- 在 <doc:Concurrency> 章节中
  添加了更多关于任务、任务组和任务取消的信息。
- 在 <doc:Macros> 章节中
  添加了关于在现有 Swift 包中实现宏的信息。
- 更新了 <doc:Attributes#attached> 章节，
  现在扩展宏已经取代了遵循宏。
- 添加了 <doc:Attributes#backDeployed> 章节，
  介绍了反向部署。

**2023-09-18**

- 更新至 Swift 5.9。
- 在 <doc:ControlFlow> 章节
  和 <doc:Expressions#Conditional-Expression> 章节中
  添加了关于 `if` 和 `switch` 表达式的信息。
- 添加了 <doc:Macros> 章节，
  介绍了在编译时生成代码。
- 扩展了 <doc:TheBasics> 中关于可选值的讨论。
- 在 <doc:GuidedTour> 中添加了并发示例。
- 在 <doc:OpaqueTypes> 章节中
  添加了关于封装协议类型的信息。
- 在 <doc:Attributes#Result-Transformations> 章节中
  添加了关于 `buildPartialBlock(first:)`
  和 `buildPartialBlock(accumulated:next:)` 方法的信息。
- 在 <doc:Attributes#available>
  和 <doc:Statements#Conditional-Compilation-Block> 的平台列表中
  添加了 visionOS。
- 格式化了形式文法，使用空行进行分组。

**2023-03-30**

- 更新至 Swift 5.8。
- 添加了 <doc:ControlFlow#Deferred-Actions> 章节，
  展示了在错误处理之外使用 `defer`。
- 采用 Swift-DocC 进行发布。
- 全文进行了小幅修正和补充。

**2022-09-12**

- 更新至 Swift 5.7。
- 添加了 <doc:Concurrency#Sendable-Types> 章节，
  介绍了在 actor 和任务之间发送数据，
  并在 <doc:Attributes#Sendable> 和 <doc:Attributes#unchecked> 章节中
  添加了关于 `@Sendable` 和 `@unchecked` 特性的信息。
- 添加了 <doc:LexicalStructure#Regular-Expression-Literals> 章节，
  介绍了如何创建正则表达式。
- 在 <doc:TheBasics#Optional-Binding> 章节中
  添加了关于 `if`-`let` 简写形式的信息。
- 在 <doc:ControlFlow#Checking-API-Availability> 章节中
  添加了关于 `#unavailable` 的信息。

**2022-03-14**

- 更新至 Swift 5.6。
- 更新了 <doc:Expressions#Explicit-Member-Expression> 章节，
  添加了关于在链式方法调用和其他后缀表达式中使用 `#if` 的信息。
- 更新了全文的图表视觉样式。

**2021-09-20**

- 更新至 Swift 5.5。
- 在 <doc:Concurrency> 章节，
  以及 <doc:Declarations#Actor-Declaration>、
  <doc:Declarations#Asynchronous-Functions-and-Methods>
  和 <doc:Expressions#Await-Operator> 章节中
  添加了关于异步函数、任务和 actor 的信息。
- 更新了 <doc:LexicalStructure#Identifiers> 章节，
  添加了关于以下划线开头的标识符的信息。

**2021-04-26**

- 更新至 Swift 5.4。
- 添加了 <doc:AdvancedOperators#Result-Builders>
  和 <doc:Attributes#resultBuilder> 章节，
  介绍了结果构造器。
- 添加了 <doc:Expressions#Implicit-Conversion-to-a-Pointer-Type> 章节，
  介绍了 in-out 参数如何在函数调用中
  隐式转换为不安全指针。
- 更新了 <doc:Functions#Variadic-Parameters>
  和 <doc:Declarations#Function-Declaration> 章节，
  现在函数可以有多个可变参数。
- 更新了 <doc:Expressions#Implicit-Member-Expression> 章节，
  现在隐式成员表达式可以链式连接。

**2020-09-16**

- 更新至 Swift 5.3。
- 在 <doc:Closures#Trailing-Closures> 章节中
  添加了关于多个尾随闭包的信息，
  并在 <doc:Expressions#Function-Call-Expression> 章节中
  添加了关于尾随闭包如何匹配参数的信息。
- 在 <doc:Protocols#Adopting-a-Protocol-Using-a-Synthesized-Implementation> 章节中
  添加了关于枚举的 `Comparable` 合成实现的信息。
- 添加了 <doc:Generics#Contextual-Where-Clauses> 章节，
  现在可以在更多地方编写泛型 `where` 子句。
- 添加了 <doc:AutomaticReferenceCounting#Unowned-Optional-References> 章节，
  介绍了如何将无主引用与可选值一起使用。
- 在 <doc:Attributes#main> 章节中
  添加了关于 `@main` 特性的信息。
- 在 <doc:Expressions#Literal-Expression> 章节中添加了 `#filePath`，
  并更新了 `#file` 的讨论。
- 更新了 <doc:Closures#Escaping-Closures> 章节，
  现在闭包可以在更多场景下隐式引用 `self`。
- 更新了 <doc:ErrorHandling#Handling-Errors-Using-Do-Catch>
  和 <doc:Statements#Do-Statement> 章节，
  现在 `catch` 子句可以匹配多个错误。
- 添加了更多关于 `Any` 的信息，
  并将其移至新的 <doc:Types#Any-Type> 章节。
- 更新了 <doc:Properties#Property-Observers> 章节，
  现在惰性属性可以有观察者。
- 更新了 <doc:Declarations#Protocol-Declaration> 章节，
  现在枚举的成员可以满足协议要求。
- 更新了 <doc:Declarations#Stored-Variable-Observers-and-Property-Observers> 章节，
  描述了何时在观察者之前调用 getter。
- 更新了 <doc:MemorySafety> 章节，
  提及了原子操作。

**2020-03-24**

- 更新至 Swift 5.2。
- 在 <doc:Expressions#Key-Path-Expression> 章节中
  添加了关于传递键路径而非闭包的信息。
- 添加了 <doc:Declarations#Methods-with-Special-Names> 章节，
  介绍了让类、结构体和枚举的实例
  能够使用函数调用语法的语法糖。
- 更新了 <doc:Subscripts#Subscript-Options> 章节，
  现在下标支持具有默认值的参数。
- 更新了 <doc:Types#Self-Type> 章节，
  现在 `Self` 可以在更多上下文中使用。
- 更新了 <doc:TheBasics#Implicitly-Unwrapped-Optionals> 章节，
  更清楚地说明了隐式解包可选值
  可以用作可选值或非可选值。

**2019-09-10**

- 更新至 Swift 5.1。
- 在 <doc:OpaqueTypes> 章节中
  添加了关于函数指定其返回值遵循的协议
  而非提供具体命名返回类型的信息。
- 在 <doc:Properties#Property-Wrappers> 章节中
  添加了关于属性包装器的信息。
- 在 <doc:Attributes#frozen> 章节中
  添加了关于为库演进而冻结的枚举和结构体的信息。
- 添加了 <doc:Functions#Functions-With-an-Implicit-Return>
  和 <doc:Properties#Shorthand-Getter-Declaration> 章节，
  介绍了省略 `return` 的函数。
- 在 <doc:Subscripts#Type-Subscripts> 章节中
  添加了关于在类型上使用下标的信息。
- 更新了 <doc:Patterns#Enumeration-Case-Pattern> 章节，
  现在枚举 case 模式可以匹配可选值。
- 更新了 <doc:Initialization#Memberwise-Initializers-for-Structure-Types> 章节，
  现在成员初始化器支持
  为具有默认值的属性省略参数。
- 在 <doc:Attributes#dynamicMemberLookup> 章节中
  添加了关于在运行时通过键路径查找的动态成员的信息。
- 在 <doc:Statements#Conditional-Compilation-Block> 中
  将 `macCatalyst` 添加到目标环境列表。
- 更新了 <doc:Types#Self-Type> 章节，
  现在 `Self` 可以用于引用
  当前类、结构体或枚举声明引入的类型。

**2019-03-25**

- 更新至 Swift 5.0。
- 添加了 <doc:StringsAndCharacters#Extended-String-Delimiters> 章节，
  并更新了 <doc:LexicalStructure#String-Literals> 章节，
  介绍了扩展字符串分隔符。
- 添加了 <doc:Attributes#dynamicCallable> 章节，
  介绍了使用 `dynamicCallable` 特性
  将实例作为函数动态调用的信息。
- 添加了 <doc:Attributes#unknown> 和 <doc:Statements#Switching-Over-Future-Enumeration-Cases> 章节，
  介绍了在 switch 语句中使用
  `unknown` switch case 特性
  处理未来枚举 case 的信息。
- 在 <doc:Expressions#Key-Path-Expression> 章节中
  添加了关于标识键路径（`\.self`）的信息。
- 在 <doc:Statements#Conditional-Compilation-Block> 章节中
  添加了关于在平台条件中使用小于（`<`）运算符的信息。

**2018-09-17**

- 更新至 Swift 4.2。
- 在 <doc:Enumerations#Iterating-over-Enumeration-Cases> 章节中
  添加了关于访问枚举所有 case 的信息。
- 在 <doc:Statements#Compile-Time-Diagnostic-Statement> 章节中
  添加了关于 `#error` 和 `#warning` 的信息。
- 在 <doc:Attributes#Declaration-Attributes> 章节的
  `inlinable` 和 `usableFromInline` 特性下
  添加了关于内联的信息。
- 在 <doc:Attributes#Declaration-Attributes> 章节的
  `dynamicMemberLookup` 特性下
  添加了关于在运行时按名称查找的成员的信息。
- 在 <doc:Attributes#Declaration-Attributes> 章节中
  添加了关于 `requires_stored_property_inits` 和 `warn_unqualified_access` 特性的信息。
- 在 <doc:Statements#Conditional-Compilation-Block> 章节中
  添加了关于根据所使用的 Swift 编译器版本
  条件编译代码的信息。
- 在 <doc:Expressions#Literal-Expression> 章节中
  添加了关于 `#dsohandle` 的信息。

**2018-03-29**

- 更新至 Swift 4.1。
- 在 <doc:AdvancedOperators#Equivalence-Operators> 章节中
  添加了关于等价运算符合成实现的信息。
- 在 <doc:Declarations> 章节的
  <doc:Declarations#Extension-Declaration> 部分，
  以及 <doc:Protocols> 章节的
  <doc:Protocols#Conditionally-Conforming-to-a-Protocol> 部分
  添加了关于条件协议遵循的信息。
- 在 <doc:Generics#Using-a-Protocol-in-Its-Associated-Types-Constraints> 章节中
  添加了关于递归协议约束的信息。
- 在 <doc:Statements#Conditional-Compilation-Block> 中
  添加了关于 `canImport()` 和 `targetEnvironment()` 平台条件的信息。

**2017-12-04**

- 更新至 Swift 4.0.3。
- 更新了 <doc:Expressions#Key-Path-Expression> 章节，
  现在键路径支持下标组件。

**2017-09-19**

- 更新至 Swift 4.0。
- 在 <doc:MemorySafety> 章节中
  添加了关于内存独占访问的信息。
- 添加了 <doc:Generics#Associated-Types-with-a-Generic-Where-Clause> 章节，
  现在可以使用泛型 `where` 子句
  来约束关联类型。
- 在 <doc:StringsAndCharacters> 章节的
  <doc:StringsAndCharacters#String-Literals> 部分，
  以及 <doc:LexicalStructure> 章节的
  <doc:LexicalStructure#String-Literals> 部分
  添加了关于多行字符串字面量的信息。
- 更新了 <doc:Attributes#Declaration-Attributes> 中
  关于 `objc` 特性的讨论，
  现在该特性在更少的地方被推断。
- 添加了 <doc:Generics#Generic-Subscripts> 章节，
  现在下标可以是泛型的。
- 更新了 <doc:Protocols> 章节的
  <doc:Protocols#Protocol-Composition> 部分，
  以及 <doc:Types> 章节的
  <doc:Types#Protocol-Composition-Type> 部分的讨论，
  现在协议组合类型可以包含父类要求。
- 更新了 <doc:Declarations#Extension-Declaration> 中
  关于协议扩展的讨论，
  现在不再允许在其中使用 `final`。
- 在 <doc:TheBasics#Assertions-and-Preconditions> 章节中
  添加了关于前置条件和致命错误的信息。

**2017-03-27**

- 更新至 Swift 3.1。
- 添加了 <doc:Generics#Extensions-with-a-Generic-Where-Clause> 章节，
  介绍了包含要求的扩展。
- 在 <doc:ControlFlow#For-In-Loops> 章节中
  添加了遍历范围的示例。
- 在 <doc:Initialization#Failable-Initializers> 章节中
  添加了可失败数值转换的示例。
- 在 <doc:Attributes#Declaration-Attributes> 章节中
  添加了关于在 Swift 语言版本中使用 `available` 特性的信息。
- 更新了 <doc:Types#Function-Type> 章节的讨论，
  指出在编写函数类型时不允许使用参数标签。
- 更新了 <doc:Statements#Conditional-Compilation-Block> 章节中
  关于 Swift 语言版本号的讨论，
  现在允许可选的补丁版本号。
- 更新了 <doc:Types#Function-Type> 章节的讨论，
  现在 Swift 区分接受多个参数的函数
  和接受单个元组类型参数的函数。
- 从 <doc:Expressions> 章节中
  删除了动态类型表达式部分，
  因为 `type(of:)` 现在是 Swift 标准库函数。

**2016-10-27**

- 更新至 Swift 3.0.1。
- 更新了 <doc:AutomaticReferenceCounting> 章节中
  关于弱引用和无主引用的讨论。
- 在 <doc:Declarations#Declaration-Modifiers> 章节中
  添加了关于 `unowned`、`unowned(safe)` 和 `unowned(unsafe)`
  声明修饰符的信息。
- 在 <doc:TypeCasting#Type-Casting-for-Any-and-AnyObject> 章节中
  添加了关于在需要 `Any` 类型值时使用可选值的注释。
- 更新了 <doc:Expressions> 章节，
  分离了括号表达式和元组表达式的讨论。

**2016-09-13**

- 更新至 Swift 3.0。
- 更新了 <doc:Functions> 章节
  和 <doc:Declarations#Function-Declaration> 部分中关于函数的讨论，
  指出所有参数默认都有参数标签。
- 更新了 <doc:AdvancedOperators> 章节中
  关于运算符的讨论，
  现在将它们作为类型方法而非全局函数来实现。
- 在 <doc:AccessControl> 章节中
  添加了关于 `open` 和 `fileprivate` 访问级别修饰符的信息。
- 更新了 <doc:Declarations#Function-Declaration> 部分中
  关于 `inout` 的讨论，
  指出它出现在参数类型之前
  而非参数名称之前。
- 更新了 <doc:Closures#Escaping-Closures> 和 <doc:Closures#Autoclosures> 部分
  以及 <doc:Attributes> 章节中
  关于 `@noescape` 和 `@autoclosure` 特性的讨论，
  现在它们是类型特性而非声明特性。
- 在 <doc:AdvancedOperators> 章节的
  <doc:AdvancedOperators#Precedence-for-Custom-Infix-Operators> 部分，
  以及 <doc:Declarations> 章节的
  <doc:Declarations#Precedence-Group-Declaration> 部分
  添加了关于运算符优先级组的信息。
- 更新了整个文档的讨论，
  使用 macOS 代替 OS X，
  使用 `Error` 代替 `ErrorProtocol`，
  使用 `ExpressibleByStringLiteral` 等协议名称
  代替 `StringLiteralConvertible`。
- 更新了 <doc:Generics> 章节的
  <doc:Generics#Generic-Where-Clauses> 部分
  以及 <doc:GenericParametersAndArguments> 章节的讨论，
  现在泛型 `where` 子句写在声明的末尾。
- 更新了 <doc:Closures#Escaping-Closures> 部分的讨论，
  现在闭包默认是非逃逸的。
- 更新了 <doc:TheBasics> 章节的
  <doc:TheBasics#Optional-Binding> 部分
  以及 <doc:Statements> 章节的
  <doc:Statements#While-Statement> 部分的讨论，
  现在 `if`、`while` 和 `guard` 语句
  使用逗号分隔的条件列表而不使用 `where` 子句。
- 在 <doc:ControlFlow> 章节的
  <doc:ControlFlow#Switch> 部分
  以及 <doc:Statements> 章节的
  <doc:Statements#Switch-Statement> 部分
  添加了关于具有多个模式的 switch case 的信息。
- 更新了 <doc:Types#Function-Type> 部分中
  关于函数类型的讨论，
  现在函数参数标签不再是函数类型的一部分。
- 更新了 <doc:Protocols> 章节的
  <doc:Protocols#Protocol-Composition> 部分
  以及 <doc:Types> 章节的
  <doc:Types#Protocol-Composition-Type> 部分中
  关于协议组合类型的讨论，
  使用新的 `Protocol1 & Protocol2` 语法。
- 更新了动态类型表达式部分的讨论，
  使用新的 `type(of:)` 语法表示动态类型表达式。
- 更新了 <doc:Statements#Line-Control-Statement> 部分中
  关于行控制语句的讨论，
  使用 `#sourceLocation(file:line:)` 语法。
- 更新了 <doc:Declarations#Functions-that-Never-Return> 中的讨论，
  使用新的 `Never` 类型。
- 在 <doc:Expressions#Literal-Expression> 部分
  添加了关于 playground 字面量的信息。
- 更新了 <doc:Declarations#In-Out-Parameters> 部分的讨论，
  指出只有非逃逸闭包可以捕获 in-out 参数。
- 更新了 <doc:Functions#Default-Parameter-Values> 部分中
  关于默认参数的讨论，
  现在它们不能在函数调用中重新排序。
- 更新了特性参数以使用冒号
  在 <doc:Attributes> 章节中。
- 在 <doc:Declarations#Rethrowing-Functions-and-Methods> 部分
  添加了关于在重新抛出函数的 catch 块内抛出错误的信息。
- 在 <doc:Expressions#Selector-Expression> 部分
  添加了关于访问 Objective-C 属性的 getter 或 setter 选择器的信息。
- 在 <doc:Declarations#Type-Alias-Declaration> 部分
  添加了关于泛型类型别名和在协议内使用类型别名的信息。
- 更新了 <doc:Types#Function-Type> 部分中
  关于函数类型的讨论，
  指出参数类型周围的括号是必需的。
- 更新了 <doc:Attributes> 章节，
  指出 `@IBAction`、`@IBOutlet` 和 `@NSManaged` 特性
  隐含了 `@objc` 特性。
- 在 <doc:Attributes#Declaration-Attributes> 部分
  添加了关于 `@GKInspectable` 特性的信息。
- 更新了 <doc:Protocols#Optional-Protocol-Requirements> 部分中
  关于可选协议要求的讨论，
  澄清它们仅用于与 Objective-C 互操作的代码。
- 从 <doc:Declarations#Function-Declaration> 部分
  删除了关于在函数参数中显式使用 `let` 的讨论。
- 从 <doc:Statements> 章节中
  删除了关于 `Boolean` 协议的讨论，
  因为该协议已从 Swift 标准库中移除。
- 修正了 <doc:Attributes#Declaration-Attributes> 部分中
  关于 `@NSApplicationMain` 特性的讨论。

**2016-03-21**

- 更新至 Swift 2.2。
- 在 <doc:Statements#Conditional-Compilation-Block> 部分
  添加了关于如何根据所使用的 Swift 版本
  条件编译代码的信息。
- 在 <doc:Expressions#Explicit-Member-Expression> 部分
  添加了关于如何区分
  仅参数名称不同的方法或初始化器的信息。
- 在 <doc:Expressions#Selector-Expression> 部分
  添加了关于 Objective-C 选择器的
  `#selector` 语法的信息。
- 在 <doc:Generics#Associated-Types>
  和 <doc:Declarations#Protocol-Associated-Type-Declaration> 部分
  更新了关于关联类型的讨论，
  使用 `associatedtype` 关键字。
- 在 <doc:Initialization#Failable-Initializers> 部分
  更新了关于在实例完全初始化之前
  返回 `nil` 的初始化器的信息。
- 在 <doc:BasicOperators#Comparison-Operators> 章节中
  添加了关于比较元组的信息。
- 在 <doc:LexicalStructure#Keywords-and-Punctuation> 部分
  添加了关于使用关键字作为外部参数名称的信息。
- 更新了 <doc:Attributes#Declaration-Attributes> 部分中
  关于 `@objc` 特性的讨论，
  指出枚举和枚举 case 可以使用该特性。
- 更新了 <doc:LexicalStructure#Operators> 部分，
  讨论了包含点的自定义运算符。
- 在 <doc:Declarations#Rethrowing-Functions-and-Methods> 部分
  添加了注释，
  指出重新抛出函数不能直接抛出错误。
- 在 <doc:Properties#Property-Observers> 部分
  添加了关于当属性作为 in-out 参数传递时
  属性观察者被调用的注释。
- 在 <doc:GuidedTour> 章节中
  添加了关于错误处理的部分。
- 更新了 <doc:AutomaticReferenceCounting#Weak-References> 部分的图表，
  更清楚地展示了释放过程。
- 删除了关于 C 风格 `for` 循环、
  `++` 前缀和后缀运算符，
  以及 `--` 前缀和后缀运算符的讨论。
- 删除了关于可变函数参数
  和柯里化函数特殊语法的讨论。

**2015-10-20**

- 更新至 Swift 2.1。
- 更新了 <doc:StringsAndCharacters#String-Interpolation>
  和 <doc:LexicalStructure#String-Literals> 部分，
  现在字符串插值可以包含字符串字面量。
- 添加了 <doc:Closures#Escaping-Closures> 部分，
  介绍了 `@noescape` 特性。
- 更新了 <doc:Attributes#Declaration-Attributes>
  和 <doc:Statements#Conditional-Compilation-Block> 部分，
  添加了关于 tvOS 的信息。
- 在 <doc:Declarations#In-Out-Parameters> 部分
  添加了关于 in-out 参数行为的信息。
- 在 <doc:Expressions#Capture-Lists> 部分
  添加了关于闭包捕获列表中指定的值如何被捕获的信息。
- 更新了 <doc:OptionalChaining#Accessing-Properties-Through-Optional-Chaining> 部分，
  澄清了通过可选链进行赋值的行为方式。
- 改进了 <doc:Closures#Autoclosures> 部分中
  关于自动闭包的讨论。
- 在 <doc:GuidedTour> 章节中
  添加了使用 `??` 运算符的示例。

**2015-09-16**

- 更新至 Swift 2.0。
- 在 <doc:ErrorHandling> 章节、
  <doc:Statements#Do-Statement> 部分、
  <doc:Statements#Throw-Statement> 部分、
  <doc:Statements#Defer-Statement> 部分
  和 <doc:Expressions#Try-Operator> 部分
  添加了关于错误处理的信息。
- 更新了 <doc:ErrorHandling#Representing-and-Throwing-Errors> 部分，
  现在所有类型都可以遵循 `ErrorType` 协议。
- 添加了关于新的 `try?` 关键字的信息
  到 <doc:ErrorHandling#Converting-Errors-to-Optional-Values> 部分。
- 在 <doc:Enumerations> 章节的
  <doc:Enumerations#Recursive-Enumerations> 部分
  以及 <doc:Declarations> 章节的
  <doc:Declarations#Enumerations-with-Cases-of-Any-Type> 部分
  添加了关于递归枚举的信息。
- 在 <doc:ControlFlow> 章节的
  <doc:ControlFlow#Checking-API-Availability> 部分
  以及 <doc:Statements> 章节的
  <doc:Statements#Availability-Condition> 部分
  添加了关于 API 可用性检查的信息。
- 在 <doc:ControlFlow> 章节的
  <doc:ControlFlow#Early-Exit> 部分
  以及 <doc:Statements> 章节的
  <doc:Statements#Guard-Statement> 部分
  添加了关于新的 `guard` 语句的信息。
- 在 <doc:Protocols> 章节的
  <doc:Protocols#Protocol-Extensions> 部分
  添加了关于协议扩展的信息。
- 在 <doc:AccessControl> 章节的
  <doc:AccessControl#Access-Levels-for-Unit-Test-Targets> 部分
  添加了关于单元测试访问控制的信息。
- 在 <doc:Patterns> 章节的
  <doc:Patterns#Optional-Pattern> 部分
  添加了关于新的可选模式的信息。
- 更新了 <doc:ControlFlow#Repeat-While> 部分，
  添加了关于 `repeat`-`while` 循环的信息。
- 更新了 <doc:StringsAndCharacters> 章节，
  因为 `String` 不再遵循
  Swift 标准库的 `CollectionType` 协议。
- 在 <doc:TheBasics#Printing-Constants-and-Variables> 部分
  添加了关于新的 Swift 标准库
  `print(_:separator:terminator)` 函数的信息。
- 在 <doc:Enumerations> 章节的
  <doc:Enumerations#Implicitly-Assigned-Raw-Values> 部分
  以及 <doc:Declarations> 章节的
  <doc:Declarations#Enumerations-with-Cases-of-a-Raw-Value-Type> 部分
  添加了关于具有 `String` 原始值的枚举 case 行为的信息。
- 在 <doc:Closures#Autoclosures> 部分
  添加了关于 `@autoclosure` 特性的信息，
  包括其 `@autoclosure(escaping)` 形式。
- 更新了 <doc:Attributes#Declaration-Attributes> 部分，
  添加了关于 `@available`
  和 `@warn_unused_result` 特性的信息。
- 更新了 <doc:Attributes#Type-Attributes> 部分，
  添加了关于 `@convention` 特性的信息。
- 添加了使用多个可选绑定的示例
  以及 `where` 子句
  到 <doc:TheBasics#Optional-Binding> 部分。
- 在 <doc:LexicalStructure#String-Literals> 部分
  添加了关于使用 `+` 运算符连接字符串字面量
  在编译时发生的信息。
- 在 <doc:Types#Metatype-Type> 部分
  添加了关于比较元类型值以及使用它们
  通过初始化器表达式构造实例的信息。
- 在 <doc:TheBasics#Debugging-with-Assertions> 部分
  添加了关于何时禁用用户定义断言的注释。
- 更新了 <doc:Attributes#Declaration-Attributes> 部分中
  关于 `@NSManaged` 特性的讨论，
  现在该特性可以应用于某些实例方法。
- 更新了 <doc:Functions#Variadic-Parameters> 部分，
  现在可变参数可以在函数参数列表的
  任何位置声明。
- 在 <doc:Initialization#Overriding-a-Failable-Initializer> 部分
  添加了关于非可失败初始化器如何
  通过强制解包父类初始化器的结果
  向上委托到可失败初始化器的信息。
- 在 <doc:Declarations#Enumerations-with-Cases-of-Any-Type> 部分
  添加了关于将枚举 case 用作函数的信息。
- 在 <doc:Expressions#Initializer-Expression> 部分
  添加了关于显式引用初始化器的信息。
- 在 <doc:Statements#Compiler-Control-Statements> 部分
  添加了关于构建配置
  和行控制语句的信息。
- 在 <doc:Types#Metatype-Type> 部分
  添加了关于从元类型值构造类实例的注释。
- 在 <doc:AutomaticReferenceCounting#Weak-References> 部分
  添加了关于弱引用不适合用于缓存的注释。
- 更新了 <doc:Properties#Type-Properties> 部分的注释，
  提到存储型类型属性是惰性初始化的。
- 更新了 <doc:Closures#Capturing-Values> 部分，
  澄清了变量和常量如何在闭包中被捕获。
- 更新了 <doc:Attributes#Declaration-Attributes> 部分，
  描述了何时可以将 `@objc` 特性应用于类。
- 在 <doc:ErrorHandling#Handling-Errors> 部分
  添加了关于执行 `throw` 语句性能的注释。
  在 <doc:Statements#Do-Statement> 部分
  添加了关于 `do` 语句的类似信息。
- 更新了 <doc:Properties#Type-Properties> 部分，
  添加了关于类、结构体和枚举的
  存储型和计算型类型属性的信息。
- 更新了 <doc:Statements#Break-Statement> 章节，
  添加了关于带标签的 break 语句的信息。
- 更新了 <doc:Properties#Property-Observers> 部分的注释，
  澄清了 `willSet` 和 `didSet` 观察者的行为。
- 在 <doc:AccessControl#Access-Levels> 部分
  添加了关于 `private` 访问范围的注释。
- 在 <doc:AutomaticReferenceCounting#Weak-References> 部分
  添加了关于垃圾回收系统和 ARC 之间
  弱引用差异的注释。
- 更新了 <doc:StringsAndCharacters#Special-Characters-in-String-Literals> 部分，
  提供了 Unicode 标量的更精确定义。

**2015-04-08**

- 更新至 Swift 1.2。
- Swift 现在有原生的 `Set` 集合类型。
  更多信息请参阅 <doc:CollectionTypes#Sets>。
- `@autoclosure` 现在是参数声明的特性，
  而不是其类型的特性。
  还有一个新的 `@noescape` 参数声明特性。
  更多信息请参阅 <doc:Attributes#Declaration-Attributes>。
- 类型方法和属性现在使用 `static` 关键字
  作为声明修饰符。
  更多信息请参阅 <doc:Declarations#Type-Variable-Properties>。
- Swift 现在包含 `as?` 和 `as!` 可失败向下转型运算符。
  更多信息请参阅
  <doc:Protocols#Checking-for-Protocol-Conformance>。
- 添加了关于
  <doc:StringsAndCharacters#String-Indices> 的新指南章节。
- 从 <doc:AdvancedOperators#Overflow-Operators> 中
  删除了溢出除法（`&/`）和
  溢出求余（`&%`）运算符。
- 更新了常量和
  常量属性声明与初始化的规则。
  更多信息请参阅 <doc:Declarations#Constant-Declaration>。
- 更新了字符串字面量中 Unicode 标量的定义。
  参阅 <doc:StringsAndCharacters#Special-Characters-in-String-Literals>。
- 更新了 <doc:BasicOperators#Range-Operators>，注明
  起始和结束索引相同的半开区间将为空。
- 更新了 <doc:Closures#Closures-Are-Reference-Types>，澄清
  变量的捕获规则。
- 更新了 <doc:AdvancedOperators#Value-Overflow>，澄清
  有符号和无符号整数的溢出行为。
- 更新了 <doc:Declarations#Protocol-Declaration>，澄清
  协议声明作用域和成员。
- 更新了 <doc:AutomaticReferenceCounting#Defining-a-Capture-List>，
  澄清闭包捕获列表中
  弱引用和无主引用的语法。
- 更新了 <doc:LexicalStructure#Operators>，明确提及
  自定义运算符支持的字符示例，
  例如数学运算符、杂项符号
  和装饰符号 Unicode 块中的字符。
- 常量现在可以在局部函数作用域中
  声明而不初始化。
  它们必须在首次使用前被赋值。
  更多信息请参阅 <doc:Declarations#Constant-Declaration>。
- 在初始化器中，常量属性现在只能被赋值一次。
  更多信息请参阅
  <doc:Initialization#Assigning-Constant-Properties-During-Initialization>。
- 多个可选绑定现在可以出现在单个 `if` 语句中，
  以逗号分隔的赋值表达式列表形式。
  更多信息请参阅 <doc:TheBasics#Optional-Binding>。
- <doc:Expressions#Optional-Chaining-Expression>
  必须出现在后缀表达式中。
- 协议转换不再仅限于 `@objc` 协议。
- 运行时可能失败的类型转换
  现在使用 `as?` 或 `as!` 运算符，
  而保证不会失败的类型转换使用 `as` 运算符。
  更多信息请参阅 <doc:Expressions#Type-Casting-Operators>。

**2014-10-16**

- 更新至 Swift 1.1。
- 添加了关于 <doc:Initialization#Failable-Initializers> 的完整指南。
- 添加了协议的
  <doc:Protocols#Failable-Initializer-Requirements> 说明。
- 类型为 `Any` 的常量和变量现在可以包含
  函数实例。更新了 <doc:TypeCasting#Type-Casting-for-Any-and-AnyObject> 中的示例，
  展示如何在 `switch` 语句中
  检查和转换为函数类型。
- 具有原始值的枚举
  现在具有 `rawValue` 属性而不是 `toRaw()` 方法，
  以及具有 `rawValue` 参数的可失败初始化器
  而不是 `fromRaw()` 方法。
  更多信息请参阅 <doc:Enumerations#Raw-Values>
  和 <doc:Declarations#Enumerations-with-Cases-of-a-Raw-Value-Type>。
- 添加了关于
  <doc:Declarations#Failable-Initializers> 的新参考部分，
  该部分可以触发初始化失败。
- 自定义运算符现在可以包含 `?` 字符。
  更新了 <doc:LexicalStructure#Operators> 参考以描述
  修订后的规则。
  从 <doc:AdvancedOperators#Custom-Operators> 中
  删除了运算符字符有效集的重复描述。

**2014-08-18**

- New document that describes Swift 1.0,
  Apple’s new programming language for building iOS and OS X apps.
- 添加了关于协议中
  <doc:Protocols#Initializer-Requirements> 的新章节。
- 添加了关于 <doc:Protocols#Class-Only-Protocols> 的新章节。
- <doc:TheBasics#Assertions-and-Preconditions> 现在可以使用字符串插值。
  删除了相反的注释。
- 更新了
  <doc:StringsAndCharacters#Concatenating-Strings-and-Characters> 章节，
  以反映 `String` 和 `Character` 值
  不能再使用加法运算符（`+`）
  或加法赋值运算符（`+=`）组合。
  这些运算符现在仅用于 `String` 值。
  使用 `String` 类型的 `append(_:)` 方法
  将单个 `Character` 值追加到字符串末尾。
- 在 <doc:Attributes#Declaration-Attributes> 章节中
  添加了关于 `availability` 特性的信息。
- <doc:TheBasics#Optionals> 不再在有值时隐式求值为 `true`，
  在没有值时求值为 `false`，
  以避免在处理可选 `Bool` 值时产生混淆。
  相反，使用 `==` 或 `!=` 运算符
  对 `nil` 进行显式检查，
  以确定可选值是否包含值。
- Swift 现在有 <doc:BasicOperators#Nil-Coalescing-Operator>
  （`a ?? b`），如果存在则解包可选值，
  如果可选值为 `nil` 则返回默认值。
- 更新并扩展了
  <doc:StringsAndCharacters#Comparing-Strings> 章节，
  以反映并演示字符串和字符比较
  以及前缀/后缀比较现在基于
  扩展字形簇的 Unicode 规范等价性。
- 您现在可以尝试通过
  <doc:OptionalChaining>
  设置属性值、分配给下标
  或调用可变方法或运算符。
  关于
  <doc:OptionalChaining#Accessing-Properties-Through-Optional-Chaining>
  的信息已相应更新，
  <doc:OptionalChaining#Calling-Methods-Through-Optional-Chaining> 中
  检查方法调用成功的示例
  已扩展以展示如何检查属性设置成功。
- 添加了关于通过可选链
  <doc:OptionalChaining#Accessing-Subscripts-of-Optional-Type>
  的新章节。
- 更新了 <doc:CollectionTypes#Accessing-and-Modifying-an-Array> 章节，
  说明不能再使用 `+=` 运算符
  将单个项追加到数组中。
  应使用 `append(_:)` 方法，
  或使用 `+=` 运算符追加单元素数组。
- 添加了注释，说明
  <doc:BasicOperators#Range-Operators> `a...b` 和 `a..<b` 的起始值 `a`
  不能大于结束值 `b`。
- 重写了 <doc:Inheritance> 章节，
  删除了关于初始化器重写的介绍性内容。
  本章现在更多地关注
  在子类中添加新功能，
  以及使用重写修改现有功能。
  章节中关于
  <doc:Inheritance#Overriding-Property-Getters-and-Setters> 的示例
  已被重写以展示如何重写 `description` 属性。
  （在子类初始化器中修改继承属性默认值的示例
  已移至
  <doc:Initialization> 章节。）
- 更新了
  <doc:Initialization#Initializer-Inheritance-and-Overriding> 章节，
  说明指定初始化器的重写
  现在必须标记为 `override` 修饰符。
- 更新了 <doc:Initialization#Required-Initializers> 章节，
  说明 `required` 修饰符现在写在
  必需初始化器的每个子类实现之前，
  并且必需初始化器的要求
  现在可以通过自动继承的初始化器来满足。
- 中缀 <doc:AdvancedOperators#Operator-Methods> 不再需要
  `@infix` 特性。
- <doc:AdvancedOperators#Prefix-and-Postfix-Operators> 的
  `@prefix` 和 `@postfix` 特性
  已被 `prefix` 和 `postfix` 声明修饰符取代。
- 添加了关于当前缀和后缀运算符
  都应用于同一操作数时，
  <doc:AdvancedOperators#Prefix-and-Postfix-Operators> 应用顺序的注释。
- <doc:AdvancedOperators#Compound-Assignment-Operators> 的
  运算符函数在定义函数时
  不再使用 `@assignment` 特性。
- 定义 <doc:AdvancedOperators#Custom-Operators> 时
  指定修饰符的顺序已更改。
  例如，现在写 `prefix operator` 而不是 `operator prefix`。
- 在 <doc:Declarations#Declaration-Modifiers> 中
  添加了关于 `dynamic` 声明修饰符的信息。
- 添加了关于类型推断如何与
  <doc:LexicalStructure#Literals> 配合工作的信息。
- 添加了更多关于柯里化函数的信息。
- 添加了关于 <doc:AccessControl> 的新章节。
- 更新了 <doc:StringsAndCharacters> 章节，
  以反映 Swift 的 `Character` 类型现在表示
  单个 Unicode 扩展字形簇。
  包括关于
  <doc:StringsAndCharacters#Extended-Grapheme-Clusters> 的新章节，
  以及关于
  <doc:StringsAndCharacters#Unicode-Scalar-Values>
  和 <doc:StringsAndCharacters#Comparing-Strings> 的更多信息。
- 更新了 <doc:StringsAndCharacters#String-Literals> 章节，
  说明字符串字面量中的 Unicode 标量
  现在写作 `\u{n}`，
  其中 `n` 是介于 0 和 10FFFF 之间的十六进制数字，
  即 Unicode 代码空间的范围。
- `NSString` 的 `length` 属性现在映射到
  Swift 原生 `String` 类型为 `utf16Count`，而不是 `utf16count`。
- Swift 原生 `String` 类型不再有
  `uppercaseString` 或 `lowercaseString` 属性。
  <doc:StringsAndCharacters> 中
  相应的章节
  已被删除，各种代码示例已被更新。
- 添加了关于
  <doc:Initialization#Initializer-Parameters-Without-Argument-Labels> 的新章节。
- 添加了关于
  <doc:Initialization#Required-Initializers> 的新章节。
- 添加了关于 <doc:Functions#Optional-Tuple-Return-Types> 的新章节。
- 更新了 <doc:TheBasics#Type-Annotations> 章节，说明
  多个相关变量可以在单行中定义，
  使用一个类型注解。
- `@optional`、`@lazy`、`@final` 和 `@required` 特性
  现在是 `optional`、`lazy`、`final` 和 `required`
  <doc:Declarations#Declaration-Modifiers>。
- Updated the entire book to refer to `..<` as
  the <doc:BasicOperators#Half-Open-Range-Operator>
  (rather than the “half-closed range operator”).
- 更新了 <doc:CollectionTypes#Accessing-and-Modifying-a-Dictionary> 章节，
  说明 `Dictionary` 现在有
  布尔值 `isEmpty` 属性。
- 澄清了定义 <doc:AdvancedOperators#Custom-Operators> 时
  可以使用的完整字符列表。
- `nil` 和布尔值 `true` 和 `false` 现在是 <doc:LexicalStructure#Literals>。
- Swift 的 `Array` 类型现在具有完整的值语义。
  更新了关于 <doc:CollectionTypes#Mutability-of-Collections>
  和 <doc:CollectionTypes#Arrays> 的信息以反映新方法。
  还澄清了字符串、数组和字典的赋值和复制行为。
- <doc:CollectionTypes#Array-Type-Shorthand-Syntax> 现在写作
  `[SomeType]` 而不是 `SomeType[]`。
- 添加了关于 <doc:CollectionTypes#Dictionary-Type-Shorthand-Syntax> 的新章节，
  写作 `[KeyType: ValueType]`。
- 添加了关于 <doc:CollectionTypes#Hash-Values-for-Set-Types> 的新章节。
- <doc:Closures#Closure-Expressions> 的示例现在使用
  全局 `sorted(_:_:)` 函数
  而不是全局 `sort(_:_:)` 函数，
  以反映新的数组值语义。
- 更新了关于 <doc:Initialization#Memberwise-Initializers-for-Structure-Types> 的信息，
  澄清即使结构体的存储属性没有默认值，
  也会提供成员逐一初始化器。
- 更新为使用 `..<` 而不是 `..`
  作为 <doc:BasicOperators#Half-Open-Range-Operator>。
- 添加了 <doc:Generics#Extending-a-Generic-Type> 的示例。

<!--
This source file is part of the Swift.org open source project

Copyright (c) 2014 - 2022 Apple Inc. and the Swift project authors
Licensed under Apache License v2.0 with Runtime Library Exception

See https://swift.org/LICENSE.txt for license information
See https://swift.org/CONTRIBUTORS.txt for the list of Swift project authors
-->
