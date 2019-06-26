# 特性（Attributes）

在 Swift 中有两种特性，分别用于修饰声明和类型。特性提供了有关声明和类型的更多信息。例如，使用 `discardableResult` 特性声明的函数，表明该函数虽然有返回值，但如果没有使用该返回值，编译器不会产生警告。

您可以通过以下方式指定一个特性，通过符号 `@` 后跟特性的名称和特性接收的任何参数：

@`特性名`

@`特性名`(`特性参数`)

有些声明特性通过接收参数来指定特性的更多信息以及它是如何修饰某个特定的声明的。这些_特性的参数_写在圆括号内，它们的格式由它们所属的特性来定义。

## 声明特性 {#declaration-attributes}

声明特性只能应用于声明。

### `available` {#available}

将 `available` 特性用于声明时，表示该声明的生命周期是相对于特定的平台和操作系统版本。

`available` 特性经常与参数列表一同出现，该参数列表至少有两个特性参数，参数之间由逗号分隔。这些参数由以下这些平台名字中的一个起头：

- `iOS`
- `iOSApplicationExtension`
- `macOS`
- `macOSApplicationExtension`
- `watchOS`
- `watchOSApplicationExtension`
- `tvOS`
- `tvOSApplicationExtension`
- `swift`

当然，你也可以用一个星号（`*`）来表示上面提到的所有平台。指定 Swift 版本的 `available` 特性参数，不能使用星号表示。

其余的参数，可以按照任何顺序出现，并且可以添加关于声明生命周期的附加信息，包括重要事件。

- `unavailable` 参数表示该声明在指定的平台上是无效的。当指定 Swift 版本可用性时不可使用该参数。
- `introduced` 参数表示指定平台从哪一版本开始引入该声明。格式如下：

`introduced`: `版本号`

*版本号*由一至三个正整数构成，由句点分隔的。

- `deprecated` 参数表示指定平台从哪一版本开始弃用该声明。格式如下：

`deprecated`: `版本号`

可选的*版本号*由一个或多个正整数构成，由句点分隔的。省略版本号表示该声明目前已弃用，当弃用出现时没有给出任何有关信息。如果你省略了版本号，冒号（`:`）也可省略。

- `obsoleted` 参数表示指定平台或语言从哪一版本开始废弃该声明。当一个声明被废弃后，它就从平台或语言中移除，不能再被使用。格式如下：

`obsoleted`: `版本号`

*版本号*由一至三个正整数构成，由句点分隔的。

- `message` 参数用来提供文本信息。当使用被弃用或者被废弃的声明时，编译器会抛出警告或错误信息。格式如下：

`message`: `信息内容`

_信息内容_由一个字符串构成。

- `renamed` 参数用来提供文本信息，用以表示被重命名的声明的新名字。当使用声明的旧名字时，编译器会报错提示新名字。格式如下：

`renamed`: `新名字`

_新名字_由一个字符串构成。

你可以将 `renamed` 参数和 `unavailable` 参数用于 `available` 特性，来表示声明在不同平台和 Swift 版本上的可用性。如下所示，表示声明的名字在一个框架或者库的不同发布版本间发生了变化。以此组合表示该声明被重命名的编译错误。

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

你可以在某个声明上使用多个 `available` 特性，以指定该声明在不同平台和 Swift 版本上的可用性。编译器只有在与 `available` 特性中指定的平台或语言版本匹配时，才会使用 `available` 特性。

如果 `available` 特性除了平台名称参数外，只指定了一个 `introduced` 参数，那么可以使用以下简写语法代替：

@available(`平台名称` `版本号`, *)

@available(swift `版本号`)

`available` 特性的简写语法可以简明地表达出声明在多个平台上的可用性。尽管这两种形式在功能上是相同的，但请尽可能地使用简写语法形式。

```swift
@available(iOS 10.0, macOS 10.12, *)
class MyClass {
    // 这里是类定义
}
```

当 `available` 特性需要同时指定 Swift 版本和平台可用性，需要使用单独的 `available` 特性来声明。

```swift
@available(swift 3.0.2)
@available(macOS 10.12, *)
struct MyStruct {
    // 这里是结构体定义
}
```

### `discardableResult` {#discardableresult}

该特性用于的函数或方法声明，以抑制编译器中函数或方法的返回值被调而没有使用其结果的警告。

### `dynamicCallable` {#dynamiccallable}

该特性用于类、结构体、枚举或协议，以将该类型的实例视为可调用的函数。该类型必须实现 `dynamicallyCall(withArguments:)`、`dynamicallyCall(withKeywordArguments:)` 方法之一，或两者同时实现。

你可以调用 `dynamicCallable` 特性的实例，就像是调用一个任意数量参数的函数。

```swift
@dynamicCallable
struct TelephoneExchange {
    func dynamicallyCall(withArguments phoneNumber: [Int]) {
        if phoneNumber == [4, 1, 1] {
            print("Get Swift help on forums.swift.org")
        } else {
            print("Unrecognized number")
        }
    }
}

let dial = TelephoneExchange()

// 使用动态方法调用
dial(4, 1, 1)
// 打印“Get Swift help on forums.swift.org”

dial(8, 6, 7, 5, 3, 0, 9)
// 打印“Unrecognized number”

// 直接调用底层方法
dial.dynamicallyCall(withArguments: [4, 1, 1])
```

`dynamicallyCall(withArguments:)` 方法的声明必须至少有一个参数遵循 [`ExpressibleByArrayLiteral`](https://developer.apple.com/documentation/swift/expressiblebyarrayliteral) 协议，如 `[Int]`，而返回值类型可以是任意类型。

```swift
@dynamicCallable
struct Repeater {
    func dynamicallyCall(withKeywordArguments pairs: KeyValuePairs<String, Int>) -> String {
        return pairs
            .map { label, count in
                repeatElement(label, count: count).joined(separator: " ")
            }
            .joined(separator: "\n")
    }
}

let repeatLabels = Repeater()
print(repeatLabels(a: 1, b: 2, c: 3, b: 2, a: 1))
// a
// b b
// c c c
// b b
// a
```

`dynamicallyCall(withKeywordArguments:)` 方法声明必须至少有一个参数遵循 [`ExpressibleByDictionaryLiteral`](https://developer.apple.com/documentation/swift/expressiblebydictionaryliteral) 协议，返回值可以任意类型。参数的 [`Key`](https://developer.apple.com/documentation/swift/expressiblebydictionaryliteral/2294108-key) 必须遵循 [`ExpressibleByStringLiteral`](https://developer.apple.com/documentation/swift/expressiblebystringliteral) 协议。上述的示例使用 [`KeyValuePairs`](https://developer.apple.com/documentation/swift/keyvaluepairs) 作为参数类型，以便调用者可以传入重复的参数标签，`a` 和 `b` 在调用 `repeat`中多次使用。

如果你同时实现两种 `dynamicallyCall` 方法，则当在方法调用中包含关键字参数时，会调用 `dynamicallyCall(withKeywordArguments:)` 方法，否则调用 `dynamicallyCall(withArguments:)` 方法。

你只能调用参数和返回值与 `dynamicallyCall` 方法实现匹配的动态调用实例。在下面示例的调用无法编译，因为其 `dynamicallyCall(withArguments:)` 实现不接受 `KeyValuePairs<String, String>` 参数。

```swift
repeatLabels(a: "four") // Error
```

### `dynamicMemberLookup` {#dynamicmemberlookup}

该特性用于类、结构体、枚举或协议，让其能在运行时查找成员。该类型必须实现 `subscript(dynamicMemberLookup:)` 下标。

在显式成员表达式中，如果没有成名指定成员，则该表达式被理解为对该类型的 `subscript(dynamicMemberLookup:)` 下标的调用，传递包含成员名称字符串的参数。下标接收参数既可以是键路径，也可以是成员名称字符串；如果你同时实现这两种方式的下标调用，那么以键路径参数方式为准。

 `subscript(dynamicMemberLookup:)`  实现允许接收 [`KeyPath`](https://developer.apple.com/documentation/swift/keypath)，[`WritableKeyPath`](https://developer.apple.com/documentation/swift/writablekeypath) 或 [`ReferenceWritableKeyPath`](https://developer.apple.com/documentation/swift/referencewritablekeypath) 类型的键路径参数。而遵循 [`ExpressibleByStringLiteral`](https://developer.apple.com/documentation/swift/expressiblebystringliteral) 协议，下标调用接收参数为成员名称字符串 ——  在大多数情况下，下标的参数是一个 `String` 值。下标返回值类型可以为任意类型。

根据成员名称来动态地查找成员，可以帮助我们创建一个包裹数据的包装类型，但该类型无法在编译时进行类型检查，例如其他语言的数据桥接到 Swift 语言时。例如：

```swift
@dynamicMemberLookup
struct DynamicStruct {
    let dictionary = ["someDynamicMember": 325,
                      "someOtherMember": 787]
    subscript(dynamicMember member: String) -> Int {
        return dictionary[member] ?? 1054
    }
}
let s = DynamicStruct()

// 使用动态成员查找
let dynamic = s.someDynamicMember
print(dynamic)
// 打印“325”

// 直接调用底层下标
let equivalent = s[dynamicMember: "someDynamicMember"]
print(dynamic == equivalent)
// 打印“true”
```

根据键路径来动态地查找成员，可用于创建一个包裹数据的包装类型，该类型在编译时期进行类型检查。例如：

```swift
struct Point { var x, y: Int }

@dynamicMemberLookup
struct PassthroughWrapper<Value> {
    var value: Value
    subscript<T>(dynamicMember member: KeyPath<Value, T>) -> T {
        get { return value[keyPath: member] }
    }
}

let point = Point(x: 381, y: 431)
let wrapper = PassthroughWrapper(value: point)
print(wrapper.x)
```

### `GKInspectable` {#gkinspectable}

应用此属性，暴露一个自定义 GameplayKit 组件属性给 SpriteKit 编辑器 UI。

### `inlinable` {#inlinable}

该特性用于函数、方法、计算属性、下标、便利构造器或析构器的声明，以将该声明的实现公开为模块公开接口的一部分。编译器允许在调用处把 `inlinable` 标记的符号替换为符号实现的副本。

内联代码可以与任意模块中 `public` 访问级别的符号进行交互，同时可以与在相同模块中标记 `usableFromInline` 特性的 `internal` 访问级别的符号进行交互。内联代码不能与 `private` 或 `fileprivate` 级别的符号进行交互。

该特性不能用于嵌套在函数内的声明，也不能用于 `fileprivate` 或 `private` 访问级别的声明。在内联函数定义的函数和闭包是隐式非内联的，即使他们不能标记该特性。

### `nonobjc` {#nonobjc}

该特性用于方法、属性、下标、或构造器的声明，这些声明本可以在 Objective-C 代码中使用，而使用 `nonobjc` 特性则告诉编译器这个声明不能在 Objective-C 代码中使用。

该特性用在扩展中，与在没有明确标记为 `objc` 特性的扩展中给每个成员添加该特性具有相同效果。

可以使用 `nonobjc` 特性解决标有 `objc` 的类中桥接方法的循环问题，该特性还允许对标有 `objc` 的类中的构造器和方法进行重载。

标有 `nonobjc` 特性的方法不能重写标有 `objc` 特性的方法。然而，标有 `objc` 特性的方法可以重写标有 `nonobjc` 特性的方法。同样，标有 `nonobjc` 特性的方法不能满足标有 `@objc` 特性的协议中的方法要求。

### `NSApplicationMain` {#nsapplicationmain}

在类上使用该特性表示该类是应用程序委托类，使用该特性与调用 `NSApplicationMain(_:_:)` 函数并且把该类的名字作为委托类的名字传递给函数的效果相同。

如果你不想使用这个特性，可以提供一个 `main.swift` 文件，并在代码**顶层**调用 `NSApplicationMain(_:_:)` 函数，如下所示:

```swift
import AppKit
NSApplicationMain(CommandLine.argc, CommandLine.unsafeArgv)
```

### `NSCopying` {#nscopying}

该特性用于修饰一个类的存储型变量属性。该特性将使属性的设值方法使用传入值的副本进行赋值，这个值由传入值的 `copyWithZone(_:)` 方法返回。该属性的类型必需符合 `NSCopying` 协议。

`NSCopying` 特性的行为与 Objective-C 中的 `copy` 特性相似。

### `NSManaged` {#nsmanaged}

该特性用于修饰 `NSManagedObject` 子类中的实例方法或存储型变量属性，表明它们的实现由 `Core Data` 在运行时基于相关实体描述动态提供。对于标记了 `NSManaged` 特性的属性，`Core Data` 也会在运行时为其提供存储。应用这个特性也意味着 `objc` 特性。

### `objc` {#objc}

该特性用于修饰任何可以在 Objective-C 中表示的声明。比如，非嵌套类、协议、非泛型枚举（仅限原始值为整型的枚举）、类和协议中的属性和方法（包括存取方法）、构造器、析构器以及下标运算符。`objc` 特性告诉编译器这个声明可以在 Objective-C 代码中使用。

该特性用在扩展中，与在没有明确标记为 `nonobjc` 特性的扩展中给每个成员添加该特性具有相同效果。

编译器隐式地将 `objc` 特性添加到 Objective-C 中定义的任何类的子类。但是，子类不能是泛型的，并且不能继承于任何泛型类。你可以将 `objc` 特性显式添加到满足这些条件的子类，来指定其 Objective-C 名称，如下所述。添加了 `objc` 的协议不能继承于没有此特性的协议。

在以下情况中隐式添加了 `objc` 特性。

- 父类有 `objc` 特性，且重写为子类的声明。
- 遵循带有 `objc` 特性协议的声明。
- 带有 `IBAction`、 `IBSegueAction` 、 `IBOutlet` 、 `IBDesignable` 、 `IBInspectable` 、 `NSManaged` 或 `GKInspectable` 特性的声明。

如果你将 `objc` 特性应用于枚举，每一个枚举用例都会以枚举名称和用例名称组合的方式暴露在 Objective-C 代码中。例如，在 `Planet` 枚举中有一个名为 `Venus` 的用例，该用例暴露在 Objective-C 代码中时叫做 `PlanetVenus`。

`objc` 特性有一个可选的参数，由标识符构成。当你想把 `objc` 所修饰的实体以一个不同的名字暴露给 Objective-C 时，你就可以使用这个特性参数。你可以使用这个参数来命名类、枚举类型、枚举用例、协议、方法、存取方法以及构造器。如果你要指定类、协议或枚举在 Objective-C 下的名称，在名称上包含三个字母的前缀，如 [Objective-C 编程](https://developer.apple.com/library/content/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/Introduction/Introduction.html#//apple_ref/doc/uid/TP40011210) 中的 [约定](https://developer.apple.com/library/content/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/Conventions/Conventions.html#//apple_ref/doc/uid/TP40011210-CH10-SW1)。下面的例子把 `ExampleClass` 中的 `enabled` 属性的取值方法暴露给 Objective-C，名字是 `isEnabled`，而不是它原来的属性名。

```swift
class ExampleClass: NSObject {
    @objc var enabled: Bool {
        @objc(isEnabled) get {
            // 返回适当的值
        }
    }
}
```

### `objcMembers` {#objcmembers}

该特性用于类声明，以将 `objc` 特性应用于该类、扩展、子类以及子类的扩展的所有 Objective-C 兼容成员。

大多数代码应该使用 `objc` 特性，以暴露所需的声明。如果需要暴露多个声明，可以将其分组到添加 `objc` 特性的扩展中。`objcMembers` 特性为大量使用 Objective-C 运行时的内省工具的库提供了便利。添加不必要的 `objc` 特性会增加二进制体积并影响性能。

### `requires_stored_property_inits` {#requires-stored-property-inits}

该特性用于类声明，以要求类中所有存储属性提供默认值作为其定义的一部分。对于从中继承的任何类都推断出 `NSManagedObject` 特性。

### `testable` {#testable}

在导入允许测试的编译模块时，该特性用于修饰 `import` 声明，这样就能访问被导入模块中的任何标有 `internal` 访问级别修饰符的实体，犹如它们被标记了 `public` 访问级别修饰符。测试也可以访问使用 `internal` 或者 `public` 访问级别修饰符标记的类和类成员，就像它们是 `open` 访问修饰符声明的。

### `UIApplicationMain` {#uiapplicationmain}

在类上使用该特性表示该类是应用程序委托类，使用该特性与调用 `UIApplicationMain` 函数并且把该类的名字作为委托类的名字传递给函数的效果相同。

如果你不想使用这个特性，可以提供一个 `main.swift` 文件，并在代码顶层调用 `UIApplicationMain(_:_:_:_:)` 函数。比如，如果你的应用程序使用一个继承于 UIApplication 的自定义子类作为主要类，你可以调用 `UIApplicationMain(_:_:_:_:)` 函数而不是使用该特性。

### `usableFromInline` {#usablefrominline}

该特性用于函数、方法、计算属性、下标、构造器或析构器的声明，以在同一模块中允许该符号用于内联代码的声明。声明必须具有 `internal` 访问级别修饰符。

与 `public` 访问修饰符相同的是，该特性将声明公开为模块公共接口的一部分。区别于 `public`，编译器不允许在模块外部的代码通过名称引用 `usableFromInline` 标记的声明，即使导出了声明符号也是无法引用。但是，模块外的代码仍然可以通过运行时交换声明符号。

标记为 `inlinable` 特性的声明，在内联代码中可以隐式使用。虽然 `inlinable` 或 `usableFromInline` 可以用于 `internal` 声明，但这两者不能同时使用。

### `warn_unqualified_access` {#warn-unqualified-access}

该特性应用于顶级函数、实例方法、类方法或静态方法，以在没有前置限定符（例如模块名称、类型名称、实例变量或常量）的情况下使用该函数或方法时触发警告。使用该特性可以帮助减少在同一作用于访问同名函数之间的歧义。

例如，Swift 标准库包含 [`min(_:_:)`](https://developer.apple.com/documentation/swift/1538339-min/) 顶级函数和用于序列比较元素的 [`min()`](https://developer.apple.com/documentation/swift/sequence/1641174-min) 方法。序列方法声明使用了  `warn_unqualified_access`，以减少在 `Sequence` 扩展中使用它们的歧义。

### Interface Builder 使用的声明特性 {#declaration-attributes-used-by-interface-builder}

`Interface Builder` 特性是 `Interface Builder` 用来与 Xcode 同步的声明特性。`Swift` 提供了以下的 `Interface Builder` 特性：`IBAction`，`IBSegueAction`，`IBOutlet`，`IBDesignable`，以及 `IBInspectable` 。这些特性与 Objective-C 中对应的特性在概念上是相同的。

`IBOutlet` 和 `IBInspectable` 用于修饰一个类的属性声明，`IBAction` 特性用于修饰一个类的方法声明，`IBDesignable` 用于修饰类的声明。

应用 `IBAction`、`IBSegueAction`、`IBOutlet`、`IBDesignable` 或者 `IBInspectable`  特性都意味着同时应用 `objc` 特性。

## 类型特性 {#type-attributes}

类型特性只能用于修饰类型。

### `autoclosure` {#autoclosure}

这个特性通过把表达式自动封装成无参数的闭包来延迟表达式的计算。它可以修饰类型为返回表达式结果类型的无参数函数类型的函数参数。关于如何使用 autoclosure 特性的例子，请参阅 [自动闭包](../chapter2/07_Closures.md#autoclosures) 和 [函数类型](./03_Types.md#function_type)。

### `convention` {#convention}

该特性用于修饰函数类型，它指出了函数调用的约定。

convention 特性总是与下面的参数之一一起出现。

- `swift` 参数用于表示一个 Swift 函数引用。这是 Swift 中函数值的标准调用约定。

- `block` 参数用于表示一个 Objective-C 兼容的块引用。函数值会作为一个块对象的引用，块是一种 `id` 兼容的 Objective-C 对象，其中嵌入了调用函数。调用函数使用 C 的调用约定。

- `c` 参数用于表示一个 C 函数引用。函数值没有上下文，不具备捕获功能，同样使用 C 的调用约定。

使用 C 函数调用约定的函数也可用作使用 Objective-C 块调用约定的函数，同时使用 Objective-C 块调用约定的函数也可用作使用 Swift 函数调用约定的函数。然而，只有非泛型的全局函数、局部函数以及未捕获任何局部变量的闭包，才可以被用作使用 C 函数调用约定的函数。

### `escaping` {#escaping}

在函数或者方法声明上使用该特性，它表示参数将不会被存储以供延迟执行，这将确保参数不会超出函数调用的生命周期。在使用 `escaping` 声明特性的函数类型中访问属性和方法时不需要显式地使用 `self.`。关于如何使用 `escaping` 特性的例子，请参阅 [逃逸闭包](../chapter2/07_Closures.md#escaping_closures)。

## Switch Case 特性 {#switch-case-attributes}

你只能在 switch cases 中使用 switch case 特性。

### `unknown` {#unknown}

次特性用于 switch case，表示在编译时该地方不会匹配枚举的任何情况。有关如何使用 `unknown` 特性的示例，可参阅 [对未来枚举的 `case` 进行 `switch`](./05_Statements.md#future-case)。

> 特性语法
> 
>
> 
####  attribute {#attribute}
> 
> *特性*→ [特性名](#attribute_name) [特性参数子句](#atribute_argument_clause)<sub>可选</sub>
> 
> 
####  attribute_name {#attribute-name}
> 
> *特性名* → [标识符](./02_Lexical_Structure.md#identifier)
> 
> 
####  atribute_argument_clause {#atribute-argument-clause}
> 
> *特性参数子句* → **(** [均衡令牌列表](#balanced_tokens)<sub>可选</sub> **)**
> 
> 
####  attributes {#attributes}
> 
> *特性列表* → [特性](#attribute) [特性列表](#attributes)<sub>可选</sub>
> 
>
> 
####  balanced_tokens {#balanced-tokens}
> 
> *均衡令牌列表* → [均衡令牌](#balanced_token) [均衡令牌列表](#balanced_tokens)<sub>可选</sub>
> 
> 
####  balanced_token {#balanced-token}
> 
> *均衡令牌* → **(** [均衡令牌列表](#balanced_tokens)<sub>可选</sub> **)**
> 
> *均衡令牌* → **\[** [均衡令牌列表](#balanced_tokens)<sub>可选</sub> **\]**
> 
> *均衡令牌* → **{** [均衡令牌列表](#balanced_tokens)<sub>可选</sub> **}**
> 
> *均衡令牌* → 任意标识符，关键字，字面量或运算符
> 
> *均衡令牌* → 任意标点除了 **(**，**)**，**[**，**]**，**{**，或 **}**
> 
