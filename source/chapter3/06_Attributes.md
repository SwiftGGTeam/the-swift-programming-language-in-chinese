# 特性（Attributes）
-----------------

> 1.0
> 翻译：[Hawstein](https://github.com/Hawstein)
> 校对：[numbbbbb](https://github.com/numbbbbb), [stanzhai](https://github.com/stanzhai)

> 2.0
> 翻译+校对：[KYawn](https://github.com/KYawn)，[小铁匠Linus](https://github.com/kevin833752)

本页内容包括：

- [声明特性](#declaration_attributes)
- [类型特性](#type_attributes)

特性提供了关于声明和类型的更多信息。在Swift中有两类特性，用于修饰声明的以及用于修饰类型的。

通过以下方式指定一个特性：符号`@`后面跟特性名，如果包含参数，则把参数带上：

> @`attribute name`  
> @`attribute name`(`attribute arguments`)  

有些声明特性通过接收参数来指定特性的更多信息以及它是如何修饰一个特定的声明的。这些特性的参数写在小括号内，它们的格式由它们所属的特性来定义。

<a name="declaration_attributes"></a>
## 声明特性

声明特性只能应用于声明。然而，你也可以将`noreturn`特性应用于函数或方法类型。

`autoclosure`

这个特性通过把表达式自动封装成无参数的闭包来延迟表达式的计算。它可以声明返回表达式自身类型的没有参数的方法类型，也可以用于函数参数的声明。含有`autoclosure`特性的声明同时也具有`noescape`的特性，除非传递可选参数`escaping`.关于怎样使用`autoclosure`特性的例子，参见[函数类型](./03_Types.html#function_type).

`available`

将`available`特性用于声明时，意味着该声明的生命周期会依赖于特定的平台和操作系统版本。

`available`特性经常与参数列表一同出现，该参数列表至少有两个参数，参数之间由逗号分隔。这些参数由以下这些平台名字中的一个起头：

- `iOS`
- `iOSApplicationExtension`
- `OSX`
- `OSXApplicationExtension`
- `watchOS`

当然，你也可以用一个星号(*)来表示，该声明在上面提到的所有平台上都是有效的。

剩下的参数，可以以任何顺序出现，并且可以添加关于声明生命周期的附加信息，包括重要的里程碑。

- `unavailable`参数表示：该声明在特定的平台上是无效的

- `introduced`参数表示：该声明第一次被引入时所在平台的版本。格式如下：
<p>`introduced=version number`<p>这里的`version number`由一个正的十进制整数或浮点数构成。

- `deprecated`参数表示：该声明第一次被建议弃用时所在平台的版本。格式如下：
<p>`deprecated=version number`<p>这里的`version number`由一个正的十进制整数或浮点数构成。

- `obsoleted`参数表示：该声明第一次被弃用时所在平台的版本。当一个声明被弃用时，它就从此平台中被移除，不能再被使用。格式如下：
<p>`obsoleted=version number`<p>这里的`version number`由一个正的十进制整数或浮点数构成。

- `message`参数用来提供文本信息。当使用建议弃用或者被弃用的声明时，编译器会抛出错误或警告信息。格式如下：
<p>`message=message`<p>这里的`message`由一个字符串文字构成。

- `renamed`参数用来提供文本信息，用以表示被重命名的声明的新名字。当使用这个重命名的声明遇到错误时，编译器会显示出该新名字。格式如下：
<p>`renamed=new name`<p>这里的`new name`由一个字符串文字构成。

你可以将`renamed`参数和`unavailable`参数以及类型别名声明组合使用，以向用户表示：在你的代码中，一个声明已经被重命名。当一个声明的名字在一个框架或者库的不同发布版本间发生变化时，这会相当有用。

```swift
// First release
protocol MyProtocol {
    // protocol definition
}
```

```swift
// Subsequent release renames MyProtocol
protocol MyRenamedProtocol {
    // protocol definition
}
 
@available(*, unavailable, renamed="MyRenamedProtocol")
typealias MyProtocol = MyRenamedProtocol
```

你可以在一个单独的声明上使用多个`available`特性，以详细说明该声明在不同平台上的有效性。编译器只有在当前的目标平台和`available`特性中指定的平台匹配时，才会使用`available`特性。

如果`available`特性除了平台名称参数外，只指定了一个`introduced `参数，那么可以使用以下简写语法代替：

@available(`platform name` `version number`, *)

`available`特性的简写语法可以简明地表达出多个平台的可用性。尽管这两种形式在功能上是相同的，但请尽可能地使用简明语法形式。

```swift
@available(iOS 8.0, OSX 10.10, *)
class MyClass {
    // class definition
}
```

`objc`

该特性用于修饰任何可以在Objective-C中表示的声明。比如，非嵌套类、协议、非泛型枚举（仅限整型值类型）、类和协议的属性和方法（包括`getter`和`setter`）、构造器、析构器以及下标。`objc`特性告诉编译器这个声明可以在Objective-C代码中使用。

标有`objc`特性的类必须继承自Objective-C中定义的类。如果你将`objc`特性应用于一个类或协议，它也会隐式地应用于那个类的成员或协议。对于标记了`objc`特性的类，编译器会隐式地为它的子类添加`objc`特性。标记了`objc`特性的协议不能继承没有标记`objc`的协议。

如果你将`objc`特性应用于枚举，每一个枚举的`case`都会以枚举名称和`case`名称组合的方式暴露在Objective-C代码中。例如：一个名为`Venus`的`case`在`Planet`枚举中，这个`case`暴露在Objective-C代码中时叫做`PlanetVenus`。

`objc`特性有一个可选的参数，由标记符组成。当你想把`objc`所修饰的实体以一个不同的名字暴露给Objective-C时，你就可以使用这个特性参数。你可以使用这个参数来命名类，协议，方法，getters，setters，以及构造器。下面的例子把`ExampleClass`中`enabled`属性的getter暴露给Objective-C，名字是`isEnabled`，而不是它原来的属性名。

```swift
@objc
class ExampleClass: NSObject {
    var enabled: Bool {
    @objc(isEnabled) get {
        // Return the appropriate value
        }
    }
}
```

`noescape`

在函数或者方法声明上使用该特性，它表示参数将不会被存储用作后续的计算，其用来确保不会超出函数调用的生命周期。对于其属性或方法来说，使用`noescape`声明属性的函数类型不需要显式的使用`self.`。

`nonobjc`

该特性用于方法、属性、下标、或构造器的声明，这些声明本是可以在Objective-C代码中表示的。使用`nonobjc`特性告诉编译器这个声明不能在Objective-C代码中使用。

可以使用`nonobjc`特性解决标有`objc`的类中桥接方法的循环问题，该特性还允许标有`objc`的类的构造器和方法进行重载(overload)。

标有`nonobjc`特性的方法不能重写(override)一个标有`objc`特性的方法。然而，标有`objc`特性的方法可以重写标有`nonobjc`特性的方法。同样，标有`nonobjc`特性的方法不能满足一个需要标有`@objc`特性的方法的协议。

`noreturn`

该特性用于修饰函数或方法声明，表明该函数或方法的对应类型，`T`，是`@noreturn T`。你可以用这个特性修饰函数或方法的类型，这样一来，函数或方法就不会返回到它的调用者中去。

对于一个没有用`noreturn`特性标记的函数或方法，你可以将它重写为用该特性标记的。相反，对于一个已经用`noreturn`特性标记的函数或方法，你则不可以将它重写为没使用该特性标记的。当你在一个comforming类型中实现一个协议方法时，该规则同样适用。

`NSApplicationMain`

在类上使用该特性表示该类是应用程序委托类，使用该特性与调用`NSApplicationMain(_:_:)`函数并且把该类的名字作为委托类的名字传递给函数的效果相同。

如果你不想使用这个特性，可以提供一个`main.swift`文件，并且提供一个`main()`函数去调用`NSApplicationMain(_:_:)`函数。比如，如果你的应用程序使用一个派生于`NSApplication`的自定义子类作为主要类，你可以调用`NSApplicationMain`函数而不是使用该特性。

`NSCopying`

该特性用于修饰一个类的存储型变量属性。该特性将使属性的setter与属性值的一个副本合成，这个值由`copyWithZone(_:)`方法返回，而不是属性本身的值。该属性的类型必需遵循`NSCopying`协议。

`NSCopying`特性的原理与Objective-C中的`copy`特性相似。

`NSManaged`

该特性用于修饰`NSManagedObject`子类中的实例方法或存储型变量属性，表明属性的存储和实现由Core Data在运行时基于相关实体描述动态提供。对于标记了`NSManaged`特性的属性，Core Data也会在运行时提供存储。

`testable`

该特性用于`import`声明可以测试的编译模块，它能访问任何标有`internal`权限标识符的实体，这和将它声明为`public`权限标识符有同样的效果。

`UIApplicationMain`

在类上使用该特性表示该类是应用程序委托类，使用该特性与调用`UIApplicationMain(_:_:)`函数并且把该类的名字作为委托类的名字传递给函数的效果相同。

如果你不想使用这个特性，可以提供一个`main.swift`文件，并且提供一个`main`函数去调用`UIApplicationMain(_:_:)`函数。比如，如果你的应用程序使用一个派生于`UIApplication`的自定义子类作为主要类，你可以调用`UIApplicationMain`函数而不是使用该特性。

`warn_unused_result`

该特性应用于方法或函数声明，当方法或函数被调用，但其结果未被使用时，该特性会让编译器会产生警告。

你可以使用这个特性提供一个警告信息，这个警告信息是关于不正确地使用未变异的方法，这个方法也有一个对应的变异方法。

`warn_unused_result`特性会有选择地采用下面两个参数之一。

- `message`参数用来提供警告信息。在当方法或函数被调用，但其结果未被使用时，会显示警告信息。格式如下：
<p>`message=message`<p>这里的`message`由一个字符串文字构成。

- `mutable_variant`参数用于提供变异方法的名称，如果未变异方法以一个可变的值被调用而且其结果并未被使用时，应该使用此变异方法。格式如下（方法名有字符串构成）：<p>`mutable_variant=method name`<p>
比如，Swift标准库同时提供了变异方法`sortInPlace()`和未变异方法`sort()`集合，它们的元素生成器符合`Comparable`协议。如果你调用了`sort()`方法，而没有使用它的结果，其实很有可能，你是打算使用变异方法`sortInPlace()`。

### Interface Builder使用的声明特性

Interface Builder特性是Interface Builder用来与Xcode同步的声明特性。Swift提供了以下的Interface Builder特性：`IBAction`，`IBDesignable`，`IBInspectable`，以及`IBOutlet`。这些特性与Objective-C中对应的特性在概念上是相同的。

`IBOutlet`和`IBInspectable`用于修饰一个类的属性声明；`IBAction`特性用于修饰一个类的方法声明；`IBDesignable`用于修饰类的声明。

<a name="type_attributes"></a>
## 类型特性

类型特性只能用于修饰类型。然而，你也可以用`noreturn`特性去修饰函数或方法声明。

`convention`

该特性用于函数的类型，它指出函数调用的约定。

`convention`特性总是与下面的参数之一一起出现。

- `swift`参数用于表明一个Swift函数引用。这是Swift中标准的函数值调用约定。

- `block`参数用于表明一个Objective-C兼容的块引用。函数值表示为一个块对象的引用，这是一个`id-`兼容的Objective-C对象，对象中嵌入了调用函数。调用函数使用C的调用约定。

- `c`参数用于表明一个C函数引用。函数值没有上下文，这个函数也使用C的调用约定。

使用C函数调用约定的函数也可用作使用Objective-C块调用约定的函数，同时使用Objective-C块调用约定的函数也可用作使用Swift函数调用约定的函数。然而，只有非泛型的全局函数和本地函数或者不使用任何本地变量的闭包可以被用作使用C函数调用约定的函数。

`noreturn`

该特性用于修饰函数或方法的类型，表明该函数或方法不会返回到它的调用者中去。你也可以用它标记函数或方法的声明，表示函数或方法的相应类型，`T`，是`@noreturn T`。

> 特性语法
> *特性* → **@** [*特性名*](#attribute_name) [*特性参数子句*](#attribute_argument_clause) (可选)
> *特性名* → [*标识符*](02_Lexical_Structure.html#identifiers)  
> *特性参数子句* → **(** [*平衡令牌列表*](#balanced_tokens) (可选) **)**  
> *特性(Attributes)列表* → [*特色*](#attribute) [*特性(Attributes)列表*](#attributes) (可选)  
> *平衡令牌列表* → [*平衡令牌*](#balanced_token) [*平衡令牌列表*](#balanced_tokens) (可选)  
> *平衡令牌* → **(** [*平衡令牌列表*](#balanced_tokens) (可选) **)**  
> *平衡令牌* → **[** [*平衡令牌列表*](#balanced_tokens) (可选) **]**  
> *平衡令牌* → **{** [*平衡令牌列表*](#balanced_tokens) (可选) **}**  
> *平衡令牌* → **任意标识符, 关键字, 字面量或运算符**  
> *平衡令牌* → **任意标点除了(, ), [, ], {, 或 }**




