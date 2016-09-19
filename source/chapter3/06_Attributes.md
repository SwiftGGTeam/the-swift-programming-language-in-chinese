# 特性（Attributes）
-----------------

> 1.0
> 翻译：[Hawstein](https://github.com/Hawstein)
> 校对：[numbbbbb](https://github.com/numbbbbb), [stanzhai](https://github.com/stanzhai)

> 2.0
> 翻译+校对：[KYawn](https://github.com/KYawn)

> 2.1
> 翻译：[小铁匠Linus](https://github.com/kevin833752)

本页内容包括：

- [声明特性](#declaration_attributes)
- [Interface Builder 使用的声明特性](#declaration_attributes_used_by_interface_builder)
- [类型特性](#type_attributes)

特性提供了有关声明和类型的更多信息。在Swift中有两种特性，分别用于修饰声明和类型。

您可以通过以下方式指定一个特性:符号`@`后跟特性的名称和特性接收的任何参数：

> @ `特性名`

> @ `特性名`（`特性参数`）

有些声明特性通过接收参数来指定特性的更多信息以及它是如何修饰某个特定的声明的。这些特性的参数写在圆括号内，它们的格式由它们所属的特性来定义。

<a name="declaration_attributes"></a>
##声明特性
声明特性只能应用于声明。

`available`

将 `available` 特性用于声明时，表示该声明的生命周期与特定的平台和操作系统版本有关。

`available` 特性经常与参数列表一同出现，该参数列表至少有两个特性参数，参数之间由逗号分隔。这些参数由以下这些平台名字中的一个起头：

- iOS
- iOSApplicationExtension
- macOS
- macOSApplicationExtension
- watchOS
- watchOSApplicationExtension
- tvOS
- tvOSApplicationExtension

当然，你也可以用一个星号（*）来表示上面提到的所有平台。
其余的参数，可以按照任何顺序出现，并且可以添加关于声明生命周期的附加信息，包括重要事件。

- `unavailable`参数表示该声明在指定的平台上是无效的。
- `introduced` 参数表示指定平台从哪一版本开始引入该声明。格式如下：

`introduced`=`版本号`

*版本号*由一个或多个正整数构成，由句点分隔的。

- `deprecated`参数表示指定平台从哪一版本开始弃用该声明。格式如下：

`deprecated`=`版本号`

可选的*版本号*由一个或多个正整数构成，由句点分隔的。省略版本号表示该声明目前已弃用，当弃用出现时无需给出任何有关信息。如果你省略了版本号，冒号（:）也可省略。

- `obsoleted` 参数表示指定平台从哪一版本开始废弃该声明。当一个声明被废弃后，它就从平台中移除，不能再被使用。格式如下：

`obsoleted`=`版本号`

*版本号*由一个或多个正整数构成，由句点分隔的。

- `message` 参数用来提供文本信息。当使用被弃用或者被废弃的声明时，编译器会抛出警告或错误信息。格式如下：

`message`=`信息内容`

信息内容由一个字符串构成。

- `renamed` 参数用来提供文本信息，用以表示被重命名的声明的新名字。当使用声明的旧名字时，编译器会报错提示新名字。格式如下：

`renamed`=`新名字`

新名字由一个字符串构成。

你可以将`renamed` 参数和 `unavailable` 参数以及类型别名声明组合使用，以此向用户表示某个声明已经被重命名。当某个声明的名字在一个框架或者库的不同发布版本间发生变化时，这会相当有用。

```swift
// 首发版本
protocol MyProtocol {
// 这里是协议定义
}
```

```swift
// 后续版本重命名了 MyProtocol
protocol MyRenamedProtocol {
// 这里是协议定义
}
@available(*, unavailable, renamed:"MyRenamedProtocol")
typealias MyProtocol = MyRenamedProtocol
```

你可以在某个声明上使用多个 `available` 特性，以指定该声明在不同平台上的可用性。编译器只有在当前目标平台和 `available` 特性中指定的平台匹配时，才会使用 `available` 特性。

如果 `available` 特性除了平台名称参数外，只指定了一个 `introduced` 参数，那么可以使用以下简写语法代替：

@available（平台名称 版本号，*）

`available` 特性的简写语法可以简明地表达出声明在多个平台上的可用性。尽管这两种形式在功能上是相同的，但请尽可能地使用简写语法形式。

```swift
@available(iOS 10.0, macOS 10.12, *)
class MyClass {
// 这里是类定义
}
```

`discardableResult`

该特性用于的函数或方法声明,以抑制编译器中 函数或方法的返回值被调而没有使用其结果的警告。

`GKInspectable`

应用此属性，暴露一个自定义GameplayKit组件属性给SpriteKit编辑器UI。

`objc`

该特性用于修饰任何可以在 Objective-C 中表示的声明。比如，非嵌套类、协议、非泛型枚举（仅限原始值为整型的枚举）、类和协议中的属性和方法（包括存取方法）、构造器、析构器以及下标运算符。`objc` 特性告诉编译器这个声明可以在 Objective-C 代码中使用。

标有 `objc` 特性的类必须继承自 Objective-C 中定义的类。如果你将 `objc` 特性应用于一个类或协议，它也会隐式地应用于类或协议中兼容 Objective-C 的成员。对于标记了 `objc` 特性的类，编译器会隐式地为它的子类添加 `objc` 特性。标记了 `objc` 特性的协议不能继承没有标记 `objc` 的协议。

如果你将 `objc` 特性应用于枚举，每一个枚举用例都会以枚举名称和用例名称组合的方式暴露在 Objective-C 代码中。例如，在 `Planet` 枚举中有一个名为 `Venus` 的用例，该用例暴露在 Objective-C 代码中时叫做 `PlanetVenus`。

`objc` 特性有一个可选的参数，由标识符构成。当你想把 objc 所修饰的实体以一个不同的名字暴露给 Objective-C 时，你就可以使用这个特性参数。你可以使用这个参数来命名类、枚举类型、枚举用例、协议、方法、存取方法以及构造器。下面的例子把 `ExampleClass` 中的 `enabled` 属性的取值方法暴露给 Objective-C，名字是 `isEnabled`，而不是它原来的属性名。

```swift
@objc
class ExampleClass: NSObject {
var enabled: Bool {
@objc(isEnabled) get {
// 返回适当的值        }
}
}
```
`nonobjc`

该特性用于方法、属性、下标、或构造器的声明，这些声明本可以在 Objective-C 代码中使用，而使用 `nonobjc` 特性则告诉编译器这个声明不能在 Objective-C 代码中使用。

可以使用 `nonobjc` 特性解决标有 `objc` 的类中桥接方法的循环问题，该特性还允许对标有 `objc` 的类中的构造器和方法进行重载。

标有 `nonobjc` 特性的方法不能重写标有 `objc` 特性的方法。然而，标有 `objc` 特性的方法可以重写标有 `nonobjc` 特性的方法。同样，标有 `nonobjc` 特性的方法不能满足标有 `@objc` 特性的协议中的方法要求。

`NSApplicationMain`

在类上使用该特性表示该类是应用程序委托类，使用该特性与调用 `NSApplicationMain`(\_:_:) 函数并且把该类的名字作为委托类的名字传递给函数的效果相同。

如果你不想使用这个特性，可以提供一个 main.swift 文件，并在代码**顶层**调用`NSApplicationMain`(\_:_:) 函数,如下所示:

```swift
import AppKit
NSApplicationMain(CommandLine.argc, CommandLine.unsafeArgv)
```
`NSCopying`

该特性用于修饰一个类的存储型变量属性。该特性将使属性的设值方法使用传入值的副本进行赋值，这个值由传入值的 `copyWithZone`(\_:) 方法返回。该属性的类型必需符合 `NSCopying` 协议。

`NSCopying` 特性的行为与 Objective-C 中的 `copy` 特性相似。

`NSManaged`

该特性用于修饰 `NSManagedObject` 子类中的实例方法或存储型变量属性，表明它们的实现由 `Core Data` 在运行时基于相关实体描述动态提供。对于标记了 `NSManaged` 特性的属性，`Core Data` 也会在运行时为其提供存储。应用这个特性也意味着`objc`特性。

`testable`

在导入允许测试的编译模块时，该特性用于修饰 `import` 声明，这样就能访问被导入模块中的任何标有 `internal` 访问级别修饰符的实体，犹如它们被标记了 `public` 访问级别修饰符。测试也可以访问使用`internal`或者`public`访问级别修饰符标记的类和类成员,就像它们是`open`访问修饰符声明的。

`UIApplicationMain`

在类上使用该特性表示该类是应用程序委托类，使用该特性与调用 `UIApplicationMain`函数并且把该类的名字作为委托类的名字传递给函数的效果相同。

如果你不想使用这个特性，可以提供一个 main.swift 文件，并在代码顶层调用 `UIApplicationMain`(\_:\_:\_:) 函数。比如，如果你的应用程序使用一个继承于 UIApplication 的自定义子类作为主要类，你可以调用 `UIApplicationMain`(\_:\_:\_:) 函数而不是使用该特性。

<a name="declaration_attributes_used_by_interface_builder"></a>
###Interface Builder 使用的声明特性
`Interface Builder` 特性是 `Interface Builder` 用来与 Xcode 同步的声明特性。`Swift` 提供了以下的 `Interface Builder` 特性：`IBAction`，`IBOutlet`，`IBDesignable`，以及`IBInspectable` 。这些特性与 Objective-C 中对应的特性在概念上是相同的。

`IBOutlet` 和 `IBInspectable` 用于修饰一个类的属性声明，`IBAction` 特性用于修饰一个类的方法声明，`IBDesignable` 用于修饰类的声明。

`IBAction` 和 `IBOutlet` 特性都意味着`objc`特性。

<a name="type_attributes"></a>
##类型特性
类型特性只能用于修饰类型。

`autoclosure`

这个特性通过把表达式自动封装成无参数的闭包来延迟表达式的计算。它可以修饰类型为返回表达式结果类型的无参数函数类型的函数参数。关于如何使用 autoclosure 特性的例子，请参阅 [自动闭包](http://wiki.jikexueyuan.com/project/swift/chapter2/07_Closures.html/) 和 [函数类型](http://wiki.jikexueyuan.com/project/swift/chapter3/03_Types.html)。

`convention`
该特性用于修饰函数类型，它指出了函数调用的约定。

convention 特性总是与下面的参数之一一起出现。

- `swift` 参数用于表示一个 Swift 函数引用。这是 Swift 中函数值的标准调用约定。

- `block` 参数用于表示一个 Objective-C 兼容的块引用。函数值会作为一个块对象的引用，块是一种 `id` 兼容的 Objective-C 对象，其中嵌入了调用函数。调用函数使用 C 的调用约定。

- `c` 参数用于表示一个 C 函数引用。函数值没有上下文，不具备捕获功能，同样使用 C 的调用约定。

使用 C 函数调用约定的函数也可用作使用 Objective-C 块调用约定的函数，同时使用 Objective-C 块调用约定的函数也可用作使用 Swift 函数调用约定的函数。然而，只有非泛型的全局函数、局部函数以及未捕获任何局部变量的闭包，才可以被用作使用 C 函数调用约定的函数。

`escaping`
在函数或者方法声明上使用该特性，它表示参数将不会被存储以供延迟执行，这将确保参数不会超出函数调用的生命周期。在使用 `escaping` 声明特性的函数类型中访问属性和方法时不需要显式地使用 `self.`。关于如何使用 `escaping` 特性的例子，请参阅 [逃逸闭包](http://wiki.jikexueyuan.com/project/swift/chapter2/07_Closures.html)。

>特性语法

> *特性 *→ @ <font color = 0x3386c8>特性名 特性参数子句</font><sub>可选</sub>

> *特性名* → <font color = 0x3386c8>标识符

> *特性参数子句* → ( <font color = 0x3386c8>均衡令牌列表</font><sub>可选</sub> )

> *特性列表* → <font color = 0x3386c8>特性 特性列表</font><sub>可选</sub>

> *均衡令牌列表* → <font color = 0x3386c8>均衡令牌 均衡令牌列表</font><sub>可选</sub>

> *均衡令牌* → ( <font color = 0x3386c8>均衡令牌列表</font><sub>可选</sub> )

> *均衡令牌* → [ <font color = 0x3386c8>均衡令牌列表</font><sub>可选</sub> ]

> *均衡令牌* → { <font color = 0x3386c8>均衡令牌列表</font><sub>可选</sub>}

> *均衡令牌* → 任意标识符，关键字，字面量或运算符

> *均衡令牌* → 任意标点除了 (，)，[，]，{，或 }
