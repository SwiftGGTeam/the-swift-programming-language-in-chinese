# 结构体和类

封装数据的自定义模型类型。

*结构体*和*类*是通用、灵活的构造，是程序代码的基石。
你可以使用与定义常量、变量和函数相同的语法，
为结构体和类添加属性和方法以增加功能。

与其他编程语言不同，Swift 不需要为自定义结构体和类创建单独的接口和实现文件。
在 Swift 中，当你在单个文件中定义结构体或类，
该类或结构体的外部接口会自动提供给其他代码使用。

> 注意: 类的实例我们通常称为*对象*。
> 但是，与其他语言相比，Swift 中的*结构体*和*类*在功能上更为接近，
> 本章大部分介绍的功能都适用于结构体*或*类的实例，
> 因此，本章使用了更通用的术语：*实例*。

## 比较结构体和类

Swift 中的结构体和类有许多共同点。两者都可以:

- 定义属性来存储值
- 定义方法来提供功能  
- 定义下标来使用下标语法访问其值
- 定义构造器来设置初始状态
- 被扩展以增加默认实现之外的功能
- 遵循协议以提供某种标准功能

更多信息，请参阅 <doc:Properties>、<doc:Methods>、<doc:Subscripts>、<doc:Initialization>、<doc:Extensions> 和 <doc:Protocols>。

相比结构体,类有一些额外的功能:

- 一个类可以继承另一个类的特征。
- 类型转换允许你在运行时检查和解释类实例的类型。
- 析构器允许一个类的实例释放其分配的任何资源。
- 引用计数允许对类实例有多个引用。

更多信息，请参阅 <doc:Inheritance>、<doc:TypeCasting>、<doc:Deinitialization> 和 <doc:AutomaticReferenceCounting>。

类支持的额外功能以增加其复杂性为代价。
作为一般准则，我们会优先使用结构体，
因为它们更易于理解，并在适当或必要时使用类。
在实践中，这意味着你定义的大多数自定义类型将是结构体和枚举。
有关更详细的比较，请参阅 [选择结构体和类](https://developer.apple.com/documentation/swift/choosing_between_structures_and_classes)。

> 注意: 类和 actor 共享许多相同的特征和行为。
> 有关 actor 的信息，请参阅 <doc:Concurrency>。

### 定义语法  

结构体和类有类似的定义语法。
你使用 `struct` 关键字引入结构体，
使用 `class` 关键字引入类。
两者都将整个定义放在一对大括号中：

```swift
struct SomeStructure {
    // 结构体定义在这里
}

class SomeClass {
    // 类定义在这里
} 
```

<!--
  - test: `ClassesAndStructures`

  ```swifttest
  -> struct SomeStructure {
        // 结构体定义在这里
     }
  -> class SomeClass {
        // 类定义在这里
  ```
-->

> 注意: 每当你定义新的结构体或类时，
> 你就定义了一个新的 Swift 类型。
> 使用 `UpperCamelCase` 来命名类型
> （如此处的 `SomeStructure` 和 `SomeClass`），
> 以匹配标准 Swift 类型的大小写
> （如 `String`、`Int` 和 `Bool`）。
> 使用 `lowerCamelCase` 来命名属性和方法
> （如 `frameRate` 和 `incrementCount`），
> 以便将它们与类型名称区分开。

下面是结构体定义和类定义的示例：

```swift
struct Resolution {
    var width = 0 
    var height = 0
}
class VideoMode {
    var resolution = Resolution()
    var interlaced = false
    var frameRate = 0.0
    var name: String?
}
```

<!--
  - test: `ClassesAndStructures`

  ```swifttest
  -> struct Resolution {
        var width = 0
        var height = 0
     }
  -> class VideoMode {
        var resolution = Resolution()
        var interlaced = false
        var frameRate = 0.0
        var name: String?
     }
  ```
-->

上面的示例定义了一个名为 `Resolution` 的新结构体，
用于描述基于像素的显示分辨率。
该结构体包含了名为 `width` 和 `height` 的两个储存属性。
存储属性是作为结构体或类的一部分绑定存储的常量或变量。
当这两个属性初始整数值为 `0` 时，他们会被推断为 `Int` 类型。

上面的示例还定义了一个名为 `VideoMode` 的类，
用于描述视频显示的特定视频模式。
该结构体有四个变量存储属性。
第一个 `resolution` 被初始化为一个新的 `Resolution` 结构体实例，
它的属性类型被推断为 `Resolution`。
新的 `VideoMode` 实例还会初始化其他三个属性。
分别是初始化为 `false` 的 `interlaced`（表示 “非隔行扫描视频”）、
初始化为 `0.0` 的播放帧率和一个值为可选 `String` 的 `name`。
由于 `name` 属性是可选类型，它会自动获得默认值 `nil`，又称 “空 `name` 值”。

### 结构体和类的实例

`Resolution` 结构体定义和 `VideoMode` 类定义本身
只描述了 `Resolution` 或 `VideoMode` 将是什么样子。
它们并不描述特定的分辨率或视频模式。
要做到这一点，你需要创建结构体的实例。

创建实例的语法对于结构体和类都非常相似：

```swift
let someResolution = Resolution()
let someVideoMode = VideoMode()
```

<!--
  - test: `ClassesAndStructures`

  ```swifttest
  -> let someResolution = Resolution()
  -> let someVideoMode = VideoMode()
  ```
-->

结构体和类都使用构造器语法来创建新实例。
最简单的初始化语法形式是使用结构体的类型名后跟空括号，
例如 `Resolution()` 或 `VideoMode()`。
这将创建类或结构体的新实例，并将任何属性初始化为其默认值。
类和结构体的初始化在 <doc:Initialization> 中有更详细的描述。

<!--
  TODO: 需要注意的是，
  只有为结构体或类的所有属性提供默认值时，才能使用默认构造函数。
-->

### 访问属性

你可以使用*点语法*访问实例的属性。
在点语法中，实例名后面紧跟属性名，
中间用句点（`.`）分隔，不留任何空格：

```swift
print("The width of someResolution is \(someResolution.width)")
// 打印 "The width of someResolution is 0" 
```

<!--
  - test: `ClassesAndStructures`

  ```swifttest
  -> print("The width of someResolution is \(someResolution.width)")
  <- The width of someResolution is 0
  ```
-->

在这个例子中，`someResolution.width` 指的是 
`someResolution` 的 `width` 属性，
并返回其默认初始值 `0`。

你可以深入到子属性，
例如 `VideoMode` 中 `resolution` 属性的 `width` 属性：

```swift
print("The width of someVideoMode is \(someVideoMode.resolution.width)")
// 打印 "The width of someVideoMode is 0"
```

<!--
  - test: `ClassesAndStructures`

  ```swifttest
  -> print("The width of someVideoMode is \(someVideoMode.resolution.width)")
  <- The width of someVideoMode is 0
  ```
-->

你还可以使用点语法为可变属性赋值：

```swift
someVideoMode.resolution.width = 1280
print("The width of someVideoMode is now \(someVideoMode.resolution.width)") 
// 打印 "The width of someVideoMode is now 1280"
```

<!--
  - test: `ClassesAndStructures`

  ```swifttest
  -> someVideoMode.resolution.width = 1280
  -> print("The width of someVideoMode is now \(someVideoMode.resolution.width)")
  <- The width of someVideoMode is now 1280
  ```
-->

### 结构体逐一成员构造器

所有结构体都有一个自动生成的*逐一成员构造器*，
你可以使用它来初始化新结构体实例的成员属性。
可以通过属性成员名称将新实例的属性初始值传递给成员构造器：

```swift
let vga = Resolution(width: 640, height: 480)
```

<!--
  - test: `ClassesAndStructures`

  ```swifttest
  -> let vga = Resolution(width: 640, height: 480)
  ```
-->

与结构体不同，类实例没有默认的逐一成员构造器。
构造器在 <doc:Initialization> 中有更详细的描述。

<!--
  - test: `classesDontHaveADefaultMemberwiseInitializer`

  ```swifttest
  -> class C { var x = 0, y = 0 }
  -> let c = C(x: 1, y: 1)
  !$ error: argument passed to call that takes no arguments
  !! let c = C(x: 1, y: 1)
  !!         ^~~~~~~~~~~~
  !!-
  ```
-->

## 结构体和枚举是值类型

*值类型*是一种在被赋值给变量或常量时，
或者在传递给函数时，其值会被*复制*的类型。

<!--
  替代定义：
  当某个类型的一个变量的变体永远无法通过同一类型的其他变量观察到时，
  该类型就具有值语义。
-->

在前面的章节中，您实际上已经广泛使用了值类型。
事实上，Swift 中所有的基本类型：整数、浮点数、布尔值、字符串、数组和字典都是值类型，
在底层它们都是以结构体的形式实现的。

在 Swift 中，所有的结构体和枚举都是值类型。
这意味着它们的实例，以及实例中所包含的任何值类型的属性在代码中传递时都会被复制。

> 注意: Swift 标准库定义的集合类型，如数组、字典和字符串，
> 使用了一种优化技术来降低复制操作的性能消耗。它们不会立即进行复制，
> 而是共享了原始实例和任何副本之间存储元素的内存。
> 如果集合的某个副本被修改，则在修改之前会复制元素。
> 您在代码中看到的样子就像立即进行了复制一样。

考虑下面这个使用前面示例中的 `Resolution` 结构体的例子：

```swift
let hd = Resolution(width: 1920, height: 1080) 
var cinema = hd
```

<!--
  - test: `ClassesAndStructures`

  ```swifttest
  -> let hd = Resolution(width: 1920, height: 1080)
  -> var cinema = hd
  ```
-->

这个例子声明了一个名为 `hd` 的常量，
并将其设置为一个使用全高清视频宽度和高度 
(1920 像素宽、1080 像素高) 初始化的 `Resolution` 实例。

然后，它声明了一个名为 `cinema` 的变量，
并将其设置为 `hd` 的当前值。因为 `Resolution` 是一个结构体，
所以会对现有实例进行*复制*，并将这个新副本赋值给 `cinema`。
尽管 `hd` 和 `cinema` 现在具有相同的宽度和高度，
但在底层它们是两个完全不同的实例。

接下来，为符合数字电影放映的需求（2048 像素宽、1080 像素高），`cinema` 的 `width` 属性被修改为稍微宽一点的 2K 标准：

```swift
cinema.width = 2048
```

<!--
  - test: `ClassesAndStructures`

  ```swifttest
  -> cinema.width = 2048
  ```
-->

检查 `cinema` 的 `width` 属性会发现它确实已经变为 `2048`：

```swift
print("cinema is now \(cinema.width) pixels wide")
// 打印 "cinema is now 2048 pixels wide"
```

<!--
  - test: `ClassesAndStructures`

  ```swifttest
  -> print("cinema is now \(cinema.width) pixels wide")
  <- cinema is now 2048 pixels wide
  ```
-->

然而,原始 `hd` 实例的 `width` 属性仍然保持旧值 `1920`:

```swift 
print("hd is still \(hd.width) pixels wide")
// 打印 "hd is still 1920 pixels wide"
```

<!--
  - test: `ClassesAndStructures`

  ```swifttest
  -> print("hd is still \(hd.width) pixels wide")
  <- hd is still 1920 pixels wide
  ```
-->

当 `hd` 赋值给 `cinema` 时，
存储在 `hd` 中的*值*被复制到了新的 `cinema` 实例中。
最终结果是拥有完全相同值的两个独立的实例。
然而，由于它们是独立的实例，将 `cinema` 的宽度设置为 `2048` 
并不会影响存储在 `hd` 中的宽度，如下图所示：

![](sharedStateStruct)

枚举的行为也是一样的：

```swift
enum CompassPoint { 
    case north, south, east, west
    mutating func turnNorth() {
        self = .north
    }
}
var currentDirection = CompassPoint.west
let rememberedDirection = currentDirection
currentDirection.turnNorth()

print("The current direction is \(currentDirection)")
// 打印 "The current direction is north"
print("The remembered direction is \(rememberedDirection)")
// 打印 "The current direction is west"
```

<!--
  - test: `ClassesAndStructures`

  ```swifttest
  -> enum CompassPoint {
        case north, south, east, west
        mutating func turnNorth() {
           self = .north
        }
     }
  -> var currentDirection = CompassPoint.west
  -> let rememberedDirection = currentDirection
  -> currentDirection.turnNorth()
  ---
  -> print("The current direction is \(currentDirection)")
  -> print("The remembered direction is \(rememberedDirection)")
  <- The current direction is north
  <- The remembered direction is west
  ```
-->

当 `currentDirection` 赋值给 `rememberedDirection`，
它实际上是拷贝了这个值。
赋值过程结束后再修改 `currentDirection` 的值并不影响 
`rememberedDirection`所储存的原始值的拷贝。

<!--
  TODO: 我是否应该举例说明如何将值类型传递给函数？
-->

## 类是引用类型

不同于值类型每次都会创建一个新的副本，
引用类型在被赋值给变量或常量，
或者在被传递给函数时不会被复制。
而是指向同一个现有实例的引用。

下面通过一个例子来说明引用类型的工作原理：

```swift
let tenEighty = VideoMode()
tenEighty.resolution = hd
tenEighty.interlaced = true
tenEighty.name = "1080i"
tenEighty.frameRate = 25.0
```

<!--
  - test: `ClassesAndStructures`

  ```swifttest
  -> let tenEighty = VideoMode()
  -> tenEighty.resolution = hd
  -> tenEighty.interlaced = true
  -> tenEighty.name = "1080i"
  -> tenEighty.frameRate = 25.0
  ```
-->

这个例子声明了一个名为 `tenEighty` 的新常量，
并将其设置为指向 `VideoMode` 类的一个新实例。
视频模式的分辨率被设置为之前的 HD 分辨率 `1920` x `1080`，
它被设置为逐行扫描模式，名称设置为 `"1080i"`，
帧率设置为每秒 25.0 帧。

接下来，将 `tenEighty` 赋值给一个名为 `alsoTenEighty` 的新常量，并修改 `alsoTenEighty` 的帧率：

```swift
let alsoTenEighty = tenEighty
alsoTenEighty.frameRate = 30.0
```

<!--
  - test: `ClassesAndStructures`

  ```swifttest
  -> let alsoTenEighty = tenEighty
  -> alsoTenEighty.frameRate = 30.0
  ```
-->

由于类是引用类型，tenEighty 和 alsoTenEighty 实际上
指向的是同一个 `VideoMode` 实例。
换句话说，它们只是同一个实例的两个不同名称，如下图所示：

![](sharedStateClass)

通过检查 `tenEighty` 的 `frameRate`，
可以看到它正确地显示了 `VideoMode` 实例的新帧率 `30.0`。

```swift
print("The frameRate property of tenEighty is now \(tenEighty.frameRate)")
// 打印 "The frameRate property of tenEighty is now 30.0"
```

<!--
  - test: `ClassesAndStructures`

  ```swifttest
  -> print("The frameRate property of tenEighty is now \(tenEighty.frameRate)")
  <- The frameRate property of tenEighty is now 30.0
  ```
-->

这个例子也展示了引用类型更难理解和维护。
如果 `tenEighty` 和 `alsoTenEighty` 在你程序的代码中相距很远，
那么很难找到所有改变视频模式的方式。
无论你在哪里使用 `tenEighty`，
你也必须考虑使用 `alsoTenEighty` 的代码，反之亦然。
相比之下，值类型更容易理解，因为操作同一个值的代码都集中在一起。

需要注意的是，`tenEighty` 和 `alsoTenEighty` 虽然被声明为常量而不是变量，
但你仍然可以修改 `tenEighty.frameRate` 和 `alsoTenEighty.frameRate`，
tenEighty 和 alsoTenEighty 常量的值本身并没有变化。
它们并不“存储”这个 VideoMode 实例，
而仅仅是对 VideoMode 实例的引用。
所以，改变的是底层 `VideoMode` 实例的 `frameRate` 属性，
而不是指向 `VideoMode` 的常量引用的值。

<!--
  TODO: 在此重申数组和字典是值类型而不是引用类型，
  并演示当它们本身是值类型或引用类型时，这对它们存储的值意味着什么。
  此外，根据 Alex Migicovsky 于 2014 年 3 月 1 日发起的 
  swift-discuss 电子邮件主题 "Dictionaries and key copying"，
  请注意这对键复制意味着什么。
-->

<!--
  TODO: 增加关于具有某种引用类型成员的结构体本身实际上是一种引用类型的讨论，
  以及关于如何创建一个值类型的类的讨论。
-->

### 恒等运算符

因为类是引用类型，所以多个常量和变量在底层可能会引用同一个类实例。
（对于结构体和枚举来说则不是这样，因为它们在被赋值给常量、
变量或传递给函数时，总是会被复制。

<!--
  - test: `structuresDontSupportTheIdentityOperators`

  ```swifttest
  -> struct S { var x = 0, y = 0 }
  -> let s1 = S()
  -> let s2 = S()
  -> if s1 === s2 { print("s1 === s2") } else { print("s1 !== s2") }
  !$ error: argument type 'S' expected to be an instance of a class or class-constrained type
  !! if s1 === s2 { print("s1 === s2") } else { print("s1 !== s2") }
  !!       ^
  !$ error: argument type 'S' expected to be an instance of a class or class-constrained type
  !! if s1 === s2 { print("s1 === s2") } else { print("s1 !== s2") }
  !!       ^
  ```
-->

<!--
  - test: `enumerationsDontSupportTheIdentityOperators`

  ```swifttest
  -> enum E { case a, b }
  -> let e1 = E.a
  -> let e2 = E.b
  -> if e1 === e2 { print("e1 === e2") } else { print("e1 !== e2") }
  !$ error: argument type 'E' expected to be an instance of a class or class-constrained type
  !! if e1 === e2 { print("e1 === e2") } else { print("e1 !== e2") }
  !!       ^
  !$ error: argument type 'E' expected to be an instance of a class or class-constrained type
  !! if e1 === e2 { print("e1 === e2") } else { print("e1 !== e2") }
  !!       ^
  ```
-->

有时需要找出两个常量或变量是否引用了同一个类的实例。
为了实现这一点，Swift 提供了两个恒等运算符：

- 恒等 (`===`) 
- 不恒等 (`!==`)

使用这些运算符来检查两个常量或变量是否引用了同一个实例：

```swift
if tenEighty === alsoTenEighty {
    print("tenEighty and alsoTenEighty refer to the same VideoMode instance.")
} 
// 打印 "tenEighty and alsoTenEighty refer to the same VideoMode instance."
```

<!--
  - test: `ClassesAndStructures`

  ```swifttest
  -> if tenEighty === alsoTenEighty {
        print("tenEighty and alsoTenEighty refer to the same VideoMode instance.")
     }
  <- tenEighty and alsoTenEighty refer to the same VideoMode instance.
  ```
-->

注意*恒等*（用三个等号 `===` 表示）与*相等*（用两个等号`==`表示）意义不同。
*恒等*意味着两个类型的常量或变量引用了完全相同的类实例。
*相等*意味着两个实例在值上被认为是相等或等价的，
具体的*相等*定义由类型的设计者决定。

当你定义自己的自定义结构体和类时，
你有责任决定什么才算作两个实例相等。
定义自己的 `==` 和 `!=` 运算符实现的过程在 <doc:AdvancedOperators#Equivalence-Operators> 中有描述。

<!--
  - test: `classesDontGetEqualityByDefault`

  ```swifttest
  -> class C { var x = 0, y = 0 }
  -> let c1 = C()
  -> let c2 = C()
  -> if c1 == c2 { print("c1 == c2") } else { print("c1 != c2") }
  !$ error: binary operator '==' cannot be applied to two 'C' operands
  !! if c1 == c2 { print("c1 == c2") } else { print("c1 != c2") }
  !!    ~~ ^  ~~
  ```
-->

<!--
  - test: `structuresDontGetEqualityByDefault`

  ```swifttest
  -> struct S { var x = 0, y = 0 }
  -> let s1 = S()
  -> let s2 = S()
  -> if s1 == s2 { print("s1 == s2") } else { print("s1 != s2") }
  !$ error: binary operator '==' cannot be applied to two 'S' operands
  !! if s1 == s2 { print("s1 == s2") } else { print("s1 != s2") }
  !!    ~~ ^  ~~
  ```
-->

<!--
  TODO: 这需要对功能引用进行澄清。
-->

### 指针

如果你有 C、C++ 或 Objective-C 的经验，
你可能知道这些语言使用指针来引用内存中的地址。
一个指向某个引用类型实例的 Swift 常量或变量相当于 C 中的指针，
但它不是直接指向内存地址，也不需要使用星号（`*`）来表示创建引用。
相反，这些引用像 Swift 中任何其他常量或变量一样定义。
Swift 标准库提供了指针和缓冲区类型，
如果你需要直接与指针交互，请参阅 [手动内存管理](https://developer.apple.com/documentation/swift/swift_standard_library/manual_memory_management)。

<!--
  TODO: Swift 中的函数不是"实例"。这需要进一步阐明。
-->

<!--
  TODO: 在这里添加理由说明使用引用类型和值类型是一个好的设计
-->

<!--
  问题: 元组与引用类型/值类型之间的关系是
-->

> 测试版软件: 
>
> 本文档包含有关正在开发的 API 或技术的初步信息。此信息可能会发生变化，根据本文档实施的软件应使用最终操作系统软件进行测试。
>
> 了解有关使用 [Apple 测试版软件](https://developer.apple.com/support/beta-software/) 的更多信息.


<!--
此源文件属于 Swift.org 开源项目的一部分

版权所有 (c) 2014 - 2022 Apple Inc. 及 Swift 项目作者
根据 Apache License v2.0 许可证及运行库例外条款授权

有关许可证信息，请参见 https://swift.org/LICENSE.txt
有关 Swift 项目作者的列表，请参见 https://swift.org/CONTRIBUTORS.txt
-->