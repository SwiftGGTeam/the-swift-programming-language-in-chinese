> 翻译：[Hawstein](https://github.com/Hawstein)  
> 校对：[numbbbbb](https://github.com/numbbbbb), [stanzhai](https://github.com/stanzhai)

# 特性
-----------------

本页内容包括：

- [声明特性](#declaration_attributes)
- [类型特性](#type_attributes)

特性提供了关于声明和类型的更多信息。在Swift中有两类特性，用于修饰声明的以及用于修饰类型的。例如，`required`特性，当应用于一个类的指定或便利初始化器声明时，表明它的每个子类都必须实现那个初始化器。再比如`noreturn`特性，当应用于函数或方法类型时，表明该函数或方法不会返回到它的调用者。

通过以下方式指定一个特性：符号`@`后面跟特性名，如果包含参数，则把参数带上：

> @`attribute name`  
> @`attribute name`(`attribute arguments`)  

有些声明特性通过接收参数来指定特性的更多信息以及它是如何修饰一个特定的声明的。这些特性的参数写在小括号内，它们的格式由它们所属的特性来定义。

<a name="declaration_attributes"></a>
## 声明特性

声明特性只能应用于声明。然而，你也可以将`noreturn`特性应用于函数或方法类型。

`availability`


将`availability`特性用于声明时，将表示该声明的生命周期会依赖于特定的平台和操作系统版本。
`availability`特性总会与参数列表一同出现，该参数列表至少有两个参数，参数之间由逗号分隔。第一个参数由以下这些平台名字中的一个起头：iOS, iOSApplicationExtension, OSX, or OSXApplicationExtension。当然，你也可以用一个星号(*)来表示，该声明在上面提到的所有平台上都是有效的。剩下的参数，可以以任何顺序出现，并且可以附加关于声明生命周期的附加信息，包括重要的里程碑。

- `unavailable`参数表示该声明在特定的平台上是无效的


- `introduced`参数表示：特定的平台上，该声明被使用的第一个版本。格式如下:<p>`introduced=version number`<p>这里的`version number`由一个正的十进制整数或浮点数构成。

- `deprecated`参数表示：特定的平台上，该声明被建议弃用的第一个版本。格式如下：
<p>`deprecated=version number`<p>这里的`version number`由一个正的十进制整数或浮点数构成。

- `obsoleted`参数表示：特定的平台上，该声明被弃用的第一个版本。格式如下：
<p>`deprecated=version number`<p>这里的`version number`由一个正的十进制整数或浮点数构成。

- `message`参数用来提供文本信息，并在因使用建议弃用或者被弃用的声明而遇到警告或错误时，由编译器抛出。格式如下：
<p>`message=message`<p>这里的`message`由一个字符串文字构成。

- `renamed`参数用来提供文本信息，用以表示被重命名的声明的新名字。当使用这个重命名的声明遇到错误时，该新名字会被编译器显示出来。格式如下：
<p>`renamed=new name`<p>这里的`new name`由一个字符串文字构成。

你可以将`renamed`参数和`unavailable`参数以及类型别名声明组合使用，以向用户表示：在你的代码中，一个声明已经被重命名。当一个声明的名字在一个框架或者库的不同发布版本间发生变化时，这会相当管用。

```swift
// First release
protocol MyProtocol {
    // protocol definition
}
// Subsequent release renames MyProtocol
protocol MyRenamedProtocol {
    // protocol definition
}
 
@availability(*, unavailable, renamed="MyRenamedProtocol")
typealias MyProtocol = MyRenamedProtocol
```


你可以在一个单独的声明上使用多个`availability`特性，以详细说明该声明在不同平台上的有效性。编译器只有在当前的目标平台和`availability`特性中指定的平台匹配时，才会使用`availability`特性

`exported`

该特性用于修饰导入声明，以此来导出已导入的模块，子模块，或当前模块的声明。如果另一个模块导入了当前模块，那么那个模块可以访问当前模块的导出项。


`noreturn`

该特性用于修饰函数或方法声明，表明该函数或方法的对应类型，`T`，是`@noreturn T`。你可以用这个特性修饰函数或方法的类型，这样一来，函数或方法就不会返回到它的调用者中去。

对于一个没有用`noreturn`特性标记的函数或方法，你可以将它重写(override)为用该特性标记的。相反，对于一个已经用`noreturn`特性标记的函数或方法，你则不可以将它重写为没使用该特性标记的。相同的规则试用于当你在一个comforming类型中实现一个协议方法时。

`NSCopying`

该特性用于修饰一个类的存储型变量属性。该特性将使属性的setter与属性值的一个副本合成，由`copyWithZone`方法返回，而不是属性本身的值。该属性的类型必需遵循`NSCopying`协议。

`NSCopying`特性的行为与Objective-C中的`copy`特性相似。

`NSManaged`

该特性用于修饰`NSManagedObject`子类中的存储型变量属性，表明属性的存储和实现由Core Data在运行时基于相关实体描述动态提供。

`objc`

该特性用于修饰任意可以在Objective-C中表示的声明，比如，非嵌套类，协议，类和协议中的属性和方法（包含getter和setter），初始化器，析构器，以及下标。`objc`特性告诉编译器该声明可以在Objective-C代码中使用。

如果你将`objc`特性应用于一个类或协议，它也会隐式地应用于那个类或协议的成员。对于标记了`objc`特性的类，编译器会隐式地为它的子类添加`objc`特性。标记了`objc`特性的协议不能继承自没有标记`objc`的协议。

`objc`特性有一个可选的参数，由标记符组成。当你想把`objc`所修饰的实体以一个不同的名字暴露给Objective-C，你就可以使用这个特性参数。你可以使用这个参数来命名类，协议，方法，getters，setters，以及初始化器。下面的例子把`ExampleClass`中`enabled`属性的getter暴露给Objective-C，名字是`isEnabled`，而不是它原来的属性名。

```swift
@objc
class ExampleClass {
    var enabled: Bool {
    @objc(isEnabled) get {
        // Return the appropriate value
    }
    }
}
```

`optional`

用该特性修饰协议的属性，方法或下标成员，表示实现这些成员并不需要一致性类型（conforming type）。

你只能用`optional`特性修饰那些标记了`objc`特性的协议。因此，只有类类型可以adopt和comform to那些包含可选成员需求的协议。更多关于如何使用`optional`特性以及如何访问可选协议成员的指导，例如，当你不确定一个conforming类型是否实现了它们，请见：[可选协议需求]()。

`required`

用该特性修饰一个类的指定或便利初始化器，表示该类的所有子类都必需实现该初始化器。

加了该特性的指定初始化器必需显式地实现，而便利初始化器既可显式地实现，也可以在子类实现了超类所有指定初始化器后继承而来（或者当子类使用便利初始化器重写了指定初始化器）。

### Interface Builder使用的声明特性

Interface Builder特性是Interface Builder用来与Xcode同步的声明特性。Swift提供了以下的Interface Builder特性：`IBAction`，`IBDesignable`，`IBInspectable`，以及`IBOutlet`。这些特性与Objective-C中对应的特性在概念上是相同的。

`IBOutlet`和`IBInspectable`用于修饰一个类的属性声明；`IBAction`特性用于修饰一个类的方法声明；`IBDesignable`用于修饰类的声明。

<a name="type_attributes"></a>
## 类型特性

类型特性只能用于修饰类型。然而，你也可以用`noreturn`特性去修饰函数或方法声明。

`auto_closure`

这个特性通过自动地将表达式封闭到一个无参数闭包中来延迟表达式的求值。使用该特性修饰无参的函数或方法类型，返回表达式的类型。一个如何使用`auto_closure`特性的例子，见[函数类型]()

`noreturn`

该特性用于修饰函数或方法的类型，表明该函数或方法不会返回到它的调用者中去。你也可以用它标记函数或方法的声明，表示函数或方法的相应类型，`T`，是`@noreturn T`。

> 特性语法  
> *特性* → **@** [*特性名*](..\chapter3\06_Attributes.html#attribute_name) [*特性参数子句*](..\chapter3\06_Attributes.html#attribute_argument_clause) _可选_  
> *特性名* → [*标识符*](LexicalStructure.html#identifier)  
> *特性参数子句* → **(** [*平衡令牌列表*](..\chapter3\06_Attributes.html#balanced_tokens) _可选_ **)**  
> *特性(Attributes)列表* → [*特色*](..\chapter3\06_Attributes.html#attribute) [*特性(Attributes)列表*](..\chapter3\06_Attributes.html#attributes) _可选_  
> *平衡令牌列表* → [*平衡令牌*](..\chapter3\06_Attributes.html#balanced_token) [*平衡令牌列表*](..\chapter3\06_Attributes.html#balanced_tokens) _可选_  
> *平衡令牌* → **(** [*平衡令牌列表*](..\chapter3\06_Attributes.html#balanced_tokens) _可选_ **)**  
> *平衡令牌* → **[** [*平衡令牌列表*](..\chapter3\06_Attributes.html#balanced_tokens) _可选_ **]**  
> *平衡令牌* → **{** [*平衡令牌列表*](..\chapter3\06_Attributes.html#balanced_tokens) _可选_ **}**  
> *平衡令牌* → **任意标识符, 关键字, 字面量或运算符**  
> *平衡令牌* → **任意标点除了(, ), [, ], {, 或 }**
