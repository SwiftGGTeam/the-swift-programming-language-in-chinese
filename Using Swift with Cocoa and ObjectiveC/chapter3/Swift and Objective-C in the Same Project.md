--- [@haolloyin](https://github.com/haolloyin) 翻译自苹果官方文档 [Using Swift with Cocoa and Objective-C](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/BuildingCocoaApps/MixandMatch.html#//apple_ref/doc/uid/TP40014216-CH10-XID_75) 的 [Mix and Match](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/BuildingCocoaApps/MixandMatch.html) 章节



# Swift and Objective-C in the Same Project - 在同个工程中使用 Swift 和 Objc

Swift 与 Objc 的兼容能力使你可以在同一个工程中同时使用两种语言。你可以用这种叫做 `mix and match` 的特性来开发基于混合语言的应用，可以用 Swfit 的最新特性实现应用的一部分功能，并无缝地并入已有的 Objc 的代码中。

## Mix and Match 概述

Objc 和 Swift 文件可以在一个工程中并存，不管这个工程原本是基于 Objc 还是 Swift。你可以直接往现有工程中简单地添加另一种语言的源文件。这种自然的工作流使得创建混合语言的应用或框架 target，与用单独一种语言时一样简单。

混合语言的工作流程只有一点点区别，这取决于你是在写应用还是写框架。下面描述了普通的用两种语言在一个 target 中导入模型的情况，后续章节会有更多细节。

![DAG_2x.png](https://raw.githubusercontent.com/haolloyin/the-swift-programming-language-in-chinese/translate/Using%20Swift%20with%20Cocoa%20and%20ObjectiveC/chapter3/DAG_2x.png?raw=true)

## Importing Code from Within the Same App Target - 在同个应用的 target 中导入

如果你在写混合语言的应用，可能需要用 Swift 代码访问 Objc 代码，或者反之。下面的流程描述了在非框架 target 中的应用。

### Importing Objective-C into Swift - 将 Objc 导入 Swift

在一个应用的 target 中导入一些 Objc 文件供 Swift 代码使用时，你需要依赖与 Objc 的桥接头文件（`bridging header`）来暴露给 Swift。当你添加 Swift 文件到现有的 Objc 应用（或反之）时，Xcode 会自动创建这些头文件。

![bridgingheader_2x.png](https://raw.githubusercontent.com/haolloyin/the-swift-programming-language-in-chinese/translate/Using%20Swift%20with%20Cocoa%20and%20ObjectiveC/chapter3/bridgingheader_2x.png?raw=true)

如果你同意，Xcode 会在源文件创建的同时生成头文件，并用 product 的模块名加上 `-Bridging-Header.h` 命名。关于 product 的模块名，详见 [Naming Your Product Module](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/BuildingCocoaApps/MixandMatch.html#//apple_ref/doc/uid/TP40014216-CH10-XID_85)。

你应该编辑这个头文件来对 Swift 暴露出 Objc 代码。

##### To import Objective-C code into Swift from the same target


1.在 Objc 桥接头文件中，import 任何你想暴露给 Swift 的头文件，例如：

```
    // OBJECTIVE-C
    
    #import "XYZCustomCell.h"
    #import "XYZCustomView.h"
    #import "XYZCustomViewController.h"
```

2.确保在 `Build Settings` 中 Objc 桥接头文件的 `build setting` 是基于 Swfit 编译器，即 `Code Generation` 含有头文件的路径。这个路径必须是头文件自身的路径，而不是它所在的目录。

这个路径应该是你工程的相对路径，类似 `Info.plist` 在 `Build Settings` 中指定的路径。在大多数情况下，你不需要修改这个设置。

在这个桥接头文件中列出的所有 public 的 Objc 头文件都会对 Swift 可见。之后当前 target 的所有 Swift 文件都可以使用这些头文件中的方法，不需要任何 import 语句。用 Swift 语法使用这些 Objc 代码，就像使用系统自带的 Swift 类一样。

```
    // SWIFT
    
    let myCell = XYZCustomCell()
    myCell.subtitle = "A custom cell"
```

### Importing Swift into Objective-C - 将 Swift 导入 Objc

向 Objc 中导入Swift 代码时，你依赖 Xcode 生成的头文件来向 Objc 暴露 Swift 代码。这是自动生成 Objc 头文件，它包含了你的 target 中所有 Swift 代码中定义的接口。可以把这个 Objc 头文件看作 Swift 代码的 `umbrella header`。它以 product 模块名加 `-Swift.h` 来命名。关于 product 的模块名，详见 [Naming Your Product Module](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/BuildingCocoaApps/MixandMatch.html#//apple_ref/doc/uid/TP40014216-CH10-XID_85)。

你不需要做任何事情来生成这个头文件，只需要将它导入到你的 Objc 代码来使用它。注意这个头文件中的 Swift 接口包含了它所使用到的所有 Objc 类型。如果你在 Swift 代码中使用你自己的 Objc 类型，确保先将对应的 Objc 头文件导入到你的 Swift 代码中，然后才将 Swift 自动生成的头文件导入到 Objc .m 源文件中来访问 Swift 代码。

##### To import Swift code into Objective-C from the same target

- 在相同 target 的 Objc .m 源文件中，用下面的语法来导入Swift 代码：

```
    // OBJECTIVE-C
    
    #import "ProductModuleName-Swift.h"
```

target 中任何 Swift 文件将会对 Objc .m 源文件可见，包括这个 import 语句。关于在 Objc 代码中使用 Swift 代码，详见 [Using Swift from Objective-C](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/BuildingCocoaApps/MixandMatch.html#//apple_ref/doc/uid/TP40014216-CH10-XID_84)。

   | 导入到 Swift | 导入到 Objc  
---------- | ---------- | ----------
Swift 代码 | 不需要import语句 | #import <ProductName/ProductModuleName-Swift.h>  
Objc 代码 | 不需要import语句；需要 Objc `umbrella头文件` | #import "Header.h"

## Importing Code from Within the Same Framework Target - 在同个 Framework 的 target 中导入

如果你在写一个混合语言的框架，可能会从 Swift 代码访问 Objc 代码，或者反之。

### Importing Objective-C into Swift - 将 Objc 导入 Swift

要将一些 Objc 文件导入到同个框架 target 的 Swift 代码中去，你需要将这些文件导入到 Objc 的 `umbrella header` 来供框架使用。

##### To import Objective-C code into Swift from the same framework

确保将框架 target 的 `Build Settings > Packaging > Defines Module` 设置为 `Yes`。然后在你的 `umbrella header` 头文件中导入你想暴露给 Swift 访问的 Objc 头文件，例如：

```
    // OBJECTIVE-C
    #import <XYZ/XYZCustomCell.h>
    #import <XYZ/XYZCustomView.h>
    #import <XYZ/XYZCustomViewController.h>
```

Swift 将会看到所有你在 `umbrella header` 中公开暴露出来的头文件，框架 target 中的所有 Swift 文件都可以访问你 Objc 文件的内容，不需要任何 import 语句。

```
    // SWIFT
    
    let myCell = XYZCustomCell()
    myCell.subtitle = "A custom cell"
```

### Importing Swift into Objective-C - 将 Swift 导入 Objc

要将一些 Swift 文件导入到同个框架的 target 的 Objc 代码去，你不需要导入任何东西到 `umbrella header` 文件，而是将 Xcode 为你的 Swift 代码自动生成的头文件导入到你的 Obj .m 源文件去，以便在 Objc 代码中访问 Swift 代码。

##### To import Swift code into Objective-C from the same framework

确保将框架 target 的 `Build Settings > Packaging` 中的 `Defines Module` 设置为 `Yes`。用下面的语法将 Swift 代码导入到同个框架 target 下的 Objc .m 源文件去。

```
    // OBJECTIVE-C
    #import <ProductName/ProductModuleName-Swift.h>
```

这个 import 语句所包含的 Swift 文件都可以被同个框架 target 下的 Objc .m 源文件访问。关于在 Objc 代码中使用 Swift 代码，详见 [Using Swift from Objective-C](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/BuildingCocoaApps/MixandMatch.html#//apple_ref/doc/uid/TP40014216-CH10-XID_84)。

   | 导入到 Swift | 导入到 Objc  
---------- | ---------- | ----------
Swift 代码 | 不需要import语句 | #import <ProductName/ProductModuleName-Swift.h>  
Objc 代码 | 不需要import语句；需要 Objc `umbrella头文件` | #import "Header.h"


## Importing External Frameworks - 导入外部 Framework

你可以导入外部框架，不管这个框架是纯 Objc，纯 Swift，还是混合语言的。import 外部框架的流程都是一样的，不管这个框架是用一种语言写的，还是包含两种语言。当你导入外部框架时，确保 `Build Setting > Pakaging > Defines Module` 设置为 `Yes`。

用下面的语法将框架导入到不同 target 的 Swift 文件中：

```
    // SWIFT
    
    import FrameworkName
```

用下面的语法将框架导入到不同 target 的 Objc .m 文件中：

```
    OBJECTIVE-C
    
    @import FrameworkName;
```

Import into Swift
Import into Objective-C
Any language framework
import FrameworkName
@import FrameworkName;


## Using Swift from Objective-C - 在 Objc 中使用 Swift

当你将 Swift 代码导入 Objc 文件之后，用普通的 Objc 语法使用 Swift 类。

```
// OBJECTIVE-C

MySwiftClass *swiftObject = [[MySwiftClass alloc] init];
[swiftObject swiftMethod];
```

Swift 的类或协议必须用 `@objc attribute` 来标记，以便在 Objc 中可访问。这个 attribute 告诉编译器这个 Swift 代码可以从 Objc 代码中访问。如果你的 Swift 类是 Objc 类的子类，编译器会自动为你添加 `@objc attribute`。详见 [Swift Type Compatibility](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/BuildingCocoaApps/InteractingWithObjective-CAPIs.html#//apple_ref/doc/uid/TP40014216-CH4-XID_36)。

你可以访问 Swift 类或协议中用 `@objc attribute` 标记过东西，只要它和 Objc 兼容。不包括一下这些 Swift 独有的特性：

Generics - 范型  

Tuples - 元组  

Enumerations defined in Swift - Swift 中定义的枚举  

Structures defined in Swift - Swift 中定义的结构体  

Top-level functions defined in Swift - Swift Swift 中定义的顶层函数  

Global variables defined in Swift - Swift 中定义的全局变量  

Typealiases defined in Swift - Swift 中定义的类型别名  

Swift-style variadics  

Nested types - 嵌套类型  

Curried functions - 柯里化后的函数  

例如带有范型类型作为参数，或者返回元组的方法不能在 Objc 中使用。

为了避免循环引用，不要将 Swift 代码导入到 Objc 头文件中。但是你可以在 Objc 头文件中前向声明（`forward declare`）一个 Swift 类来使用它，然而，注意**不能在 Objc 中继承一个 Swift 类。**

### To reference a Swift class in an Objective-C header file

这样前向声明 Swift 类：

```
// OBJECTIVE-C
// MyObjcClass.h
 
@class MySwiftClass;
 
@interface MyObjcClass : NSObject
- (MySwiftClass *)returnSwiftObject;
/* ... */
@end
```

## Naming Your Product Module - Product 模块命名

Xcode 为 Swift 代码生成的头文件的名称，以及 Xcode 创建的 Objc 桥接头文件名称，都是从你的 product 模块名生成的。默认你的 product 模块名和 product 名一样。然而，如果你的 product 名有特殊字符（nonalphanumeric，非数字、字母的字符），例如点号，那么它们会被下划线（`_`）替换之后作为你的 product 模块名。如果 product 名以数字开头，那么第一个数字会用下划线替换掉。

你可以给 product 模块名提供一个自定义的名称，Xcode 会用这个名称来命名桥接的和自动生成的头文件。你只需要在修改在 `build setting` 中的 `Product Module Name` 即可。


## Troubleshooting Tips and Reminders

- 把 Swift 和 Objc 文件看作相同的代码集合，并注意命名冲突；

- 如果你用框架，确保 `Build Setting > Pakaging > Defines Module` 设置为 `Yes`；

- 如果你使用 Objc 桥接头文件，确保在 `Build Settings` 中 Objc 桥接头文件的 `build setting` 是基于 Swfit 编译器，即 `Code Generation` 含有头文件的路径。这个路径必须是头文件自身的路径，而不是它所在的目录。

- Xcode 使用你的 product 模块名，而不是 target 名来命名 Objc 桥接头文件和为 Swift 自动生成的头文件。详见 [Naming Your Product Module](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/BuildingCocoaApps/MixandMatch.html#//apple_ref/doc/uid/TP40014216-CH10-XID_85)；

- 为了在 Objc 中可用， Swift 类必须是 Objc 类的子类，或者用 `@objc` 标记；

- 当你将 Swift 导入到 Objc 中时，记住 Objc 不会将 Swift 独有的特性翻译成 Objc 对应的特性。详见列表 [Using Swift from Objective-C](https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/BuildingCocoaApps/MixandMatch.html#//apple_ref/doc/uid/TP40014216-CH10-XID_84);

- 如果你在 Swift 代码中使用你自己的 Objc 类型，确保先将对应的 Objc 头文件导入到你的 Swift 代码中，然后才将 Swift 自动生成的头文件 import 到 Objc .m 源文件中来访问 Swift 代码。


