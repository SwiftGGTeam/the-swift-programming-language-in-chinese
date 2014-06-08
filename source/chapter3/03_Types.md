# 类型（Types）

---

本页包含内容：

-   类型标注（Type Annotation）
-   类型标识符（Type Identifier）
-   元组类型（Tuple Type）
-   函数类型（Function Type）
-   数组类型（Array Type）
-   可选类型（Optional Type）
-   隐式解析可选类型（Implicitly Unwrapped Optional Type）
-   协议合成类型（Protocal Composition Type）
-   元类型（Metatype Type）
-   类型继承子句（Type Inheritance Clause）
-   类型推断（Type Inference）

Swift语言存在两种类型：命名型类型和复合型类型。*命名型类型*是指定义时可以给定名字的类型。命名型类型包括类、结构体、枚举和协议。比如，一个用户定义的类`MyClass`的实例拥有类型`MyClass`。除了用户定义的命名型类型，Swift标准库也定义了很多常用的命名型类型，包括那些表示数组、字典和可选值的类型。

那些通常被其它语言认为是基本或初级的数据型类型（Data types）——比如表示数字、字符和字符串——实际上就是命名型类型，Swift标准库是使用结构体定义和实现它们的。因为它们是命名型类型，因此你可以按照“扩展和扩展声明”章节里讨论的那样，声明一个扩展来增加它们的行为以适应你程序的需求。

*复合型类型*是没有名字的类型，它由Swift本身定义。Swift存在两种复合型类型：函数类型和元组类型。一个复合型类型可以包含命名型类型和其它复合型类型。例如，元组类型`(Int, (Int, Int))`包含两个元素：第一个是命名型类型`Int`，第二个是另一个复合型类型`(Int, Int)`.

本节讨论Swift语言本身定义的类型，并描述Swift中的类型推断行为。

类型的语法

type → array-type­ function-type­ type-identifier­ tuple-type­ optional-
type­ implicitly-unwrapped-optional-type­ protocol-composition-type­ metatype-type­
