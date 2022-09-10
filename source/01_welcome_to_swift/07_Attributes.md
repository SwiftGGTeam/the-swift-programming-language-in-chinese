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
- `macCatalyst`
- `macCatalystApplicationExtension`
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

可选的*版本号*由一个或多个正整数构成，由句点分隔的。省略版本号表示该声明目前已弃用，而不提供有关弃用发生时间的任何信息。如果你省略了版本号，冒号（`:`）也可省略。

- `obsoleted` 参数表示指定平台或语言从哪一版本开始废弃该声明。当一个声明被废弃后，它就从平台或语言中移除，不能再被使用。格式如下：

`obsoleted`: `版本号`

*版本号*由一至三个正整数构成，由句点分隔的。

- `message` 参数用来提供文本信息。当使用被弃用或者被废弃的声明时，编译器会抛出该信息作为警告或错误。格式如下：

`message`: `信息内容`

_信息内容_由一个字符串构成。

- `renamed` 参数用来提供文本信息，用以表示被重命名声明的新名字。当使用声明的旧名字时，编译器会报错并提示新名字。格式如下：

`renamed`: `新名字`

_新名字_由一个字符串构成。

你可以将带有 `renamed` 和 `unavailable` 参数的 `available` 特性应用于类型别名声明，如下所示，来表明框架和库发行版本之间的声明名称已经被更改。这个组合会导致声明已重命名的编译时错误。

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

你可以在某个声明上使用多个 `available` 特性，以指定该声明在不同平台和 Swift 版本上的可用性。如果当前目标与 `available` 特性中指定的平台或语言版本不匹配时，该声明将会被忽略。如果你使用了多个 `available` 特性，则最终效果是平台和 Swift 可用性的组合。

如果 `available` 特性除了平台名称或者语言版本参数之外，只指定了一个 `introduced` 参数，那么可以使用以下简写语法代替：

@available(`平台名称` `版本号`, *)

@available(swift `版本号`)

`available` 特性的简写语法简洁的表示了多个平台的可用性。尽管这两种形式在功能上是相同的，但请尽可能地使用简写语法形式。

```swift
@available(iOS 10.0, macOS 10.12, *)
class MyClass {
    // 这里是类定义
}
```

当需要同时指定 Swift 版本和平台可用性，需要使用一个单独的 `available` 特性来指明 Swift 版本，以及一个或者多个 `available` 特性来声明平台可用性。

```swift
@available(swift 3.0.2)
@available(macOS 10.12, *)
struct MyStruct {
    // 这里是结构体定义
}
```

### `discardableResult` {#discardableresult}

该特性用于的函数或方法声明，以抑制编译器中函数或方法被调用而其返回值没有被使用时的警告。

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

如果实现 `dynamicallyCall(withKeywordArguments:)` 方法，则可以在动态方法调用中包含标签。

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

`dynamicallyCall(withKeywordArguments:)` 方法声明必须只有一个遵循 [`ExpressibleByDictionaryLiteral`](https://developer.apple.com/documentation/swift/expressiblebydictionaryliteral) 协议的参数，返回值可以任意类型。参数的 [`Key`](https://developer.apple.com/documentation/swift/expressiblebydictionaryliteral/2294108-key) 必须遵循 [`ExpressibleByStringLiteral`](https://developer.apple.com/documentation/swift/expressiblebystringliteral) 协议。上述的示例使用 [`KeyValuePairs`](https://developer.apple.com/documentation/swift/keyvaluepairs) 作为参数类型，以便调用者可以传入重复的参数标签，`a` 和 `b` 在调用 `repeat`中多次使用。

如果你同时实现两种 `dynamicallyCall` 方法，则当在方法调用中包含关键字参数时，会调用 `dynamicallyCall(withKeywordArguments:)` 方法，否则调用 `dynamicallyCall(withArguments:)` 方法。

你只能调用参数和返回值与 `dynamicallyCall` 方法实现匹配的动态调用实例。在下面示例的调用无法编译，因为其 `dynamicallyCall(withArguments:)` 实现不接受 `KeyValuePairs<String, String>` 参数。

```swift
repeatLabels(a: "four") // Error
```

### `dynamicMemberLookup` {#dynamicmemberlookup}

该特性用于类、结构体、枚举或协议，让其能在运行时查找成员。该类型必须实现 `subscript(dynamicMember:)` 下标。

在显式成员表达式中，如果指定成员没有相应的声明，则该表达式被理解为对该类型的 `subscript(dynamicMember:)` 下标调用，将有关该成员的信息作为参数传递。下标接收参数既可以是键路径，也可以是成员名称字符串；如果你同时实现这两种方式的下标调用，那么以键路径参数方式为准。

 `subscript(dynamicMember:)` 实现允许接收 [`KeyPath`](https://developer.apple.com/documentation/swift/keypath)，[`WritableKeyPath`](https://developer.apple.com/documentation/swift/writablekeypath) 或 [`ReferenceWritableKeyPath`](https://developer.apple.com/documentation/swift/referencewritablekeypath) 类型的键路径参数。它可以使用遵循 [`ExpressibleByStringLiteral`](https://developer.apple.com/documentation/swift/expressiblebystringliteral) 协议的类型作为参数来接受成员名 -- 通常情况下是 `String`。下标返回值类型可以为任意类型。

按成员名进行的动态成员查找可用于围绕编译时无法进行类型检查的数据创建包装类型，例如在将其他语言的数据桥接到 `Swift` 时。例如：

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

根据键路径来动态地查找成员，可用于创建一个包裹数据的包装类型，该类型支持在编译时期进行类型检查。例如：

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

### `frozen` {#frozen}

针对枚举或者结构体的声明使用该特性，可以限制你对该类型的修改。它只有在编译迭代库时被允许使用。未来版本的库不能通过添加、删除或重新排序枚举的 case 或结构的存储实例属性来更改声明。在未冻结的类型上，这些操作都是允许的，但是他们破坏了冻结类型的 ABI 兼容性。

> 注意  
> 当编译器不处于迭代库的模式，所有的结构体和枚举都是隐性冻结，并且该特性会被忽视。

在迭代库的模式中，与未冻结结构体和枚举的成员进行交互的代码在被编译时，允许它在不重新编译的情况下继续工作，即使在新版本的库中添加、删除或重新排序该类型的成员。编译器用类似运行时查找信息和添加间接层的技术使之可能。将一个枚举或者结构体标记为冻结将以放弃这种灵活性为代价来获取性能上的提升：未来版本的库只能对类型进行有限的更改，但编译器可以对与类型成员交互的代码进行额外的优化。

使用冻结类型，结构体存储属性的类型以及枚举 case 的关联值必须是 `public` 或使用 `usablefrominline` 特性标记。冻结结构体的属性不能有属性观察器，为存储实例属性提供初始值的表达式必须遵循与 `inlinable` 函数相同的限制，如 [`inlinable`](#inlinable) 中所述。

要在命令行上启用迭代库模式，请将 `-enable-library-evolution` 选项传递给 Swift 编译器。要在 Xcode 中支持它，则将生成设置 “Build Libraries for Distribution”（`BUILD_LIBRARY_FOR_DISTRIBUTION`）设置为 Yes，详情查看 [`Xcode 帮助文档`](https://help.apple.com/xcode/mac/current/#/dev04b3a04ba)。

针对冻结枚举的 switch 语法，不需要 `default` case，就像 [`对未来枚举的 case 进行 switch`](./05_Statements.md#future-case)。在针对冻结枚举使用 switch 语法时包含 `default` 或 `@unknown default` case 将生成警告，因为该代码永远不会执行。

### `GKInspectable` {#gkinspectable}

应用此特性可将自定义 GameplayKit 组件属性公开到 SpriteKit 编辑器 UI。应用此特性同时表示应用了 `objc` 特性。

### `inlinable` {#inlinable}

该特性用于函数、方法、计算属性、下标、便利构造器或析构器的声明，以将该声明的实现公开为模块公开接口的一部分。编译器允许在调用处把 `inlinable` 标记的符号替换为符号实现的副本。

内联代码可以与任意模块中 `public` 访问级别的符号进行交互，同时可以与在相同模块中标记 `usableFromInline` 特性的 `internal` 访问级别的符号进行交互。内联代码不能与 `private` 或 `fileprivate` 级别的符号进行交互。

该特性不能用于嵌套在函数内的声明，也不能用于 `fileprivate` 或 `private` 访问级别的声明。在内联函数内定义的函数和闭包都是隐式内联的，即使他们不能标记该特性。

### `main` {#main}

将该特性用于结构体、类，或枚举的声明，表示它包含了程序流的顶级入口。类型必须提供一个不接收任何参数，且返回值为 `Void` 的 `main` 类型函数。如下所示：

```swift
@main
struct MyTopLevel {
    static func main() {
        // 顶级代码从这里开始
    }
}
```

换一个说法，应用了 `main` 特性的类型所必须满足的条件，与遵循下面这个假想的协议一样：

```swift
protocol ProvidesMain {
    static func main() throws
}
```

编译生成可执行程序的 Swift 代码最多只能拥有一个顶级代码入口，请参阅[顶级代码](../03_language_reference/06_Declarations.md#top-level-code)。

### `nonobjc` {#nonobjc}

针对方法、属性、下标、或构造器的声明使用该特性将覆盖隐式的 `objc` 特性。`nonobjc` 特性告诉编译器该声明不能在 Objective-C 代码中使用，即便它能在 Objective-C 中表示。

该特性用在扩展中，与在没有明确标记为 `objc` 特性的扩展中给每个成员添加该特性具有相同效果。

可以使用 `nonobjc` 特性解决标有 `objc` 的类中桥接方法的循环问题，该特性还允许对标有 `objc` 的类中的构造器和方法进行重载。

标有 `nonobjc` 特性的方法不能重写标有 `objc` 特性的方法。然而，标有 `objc` 特性的方法可以重写标有 `nonobjc` 特性的方法。同样，标有 `nonobjc` 特性的方法不能满足标有 `@objc` 特性的协议中的方法要求。

### `NSApplicationMain` {#nsapplicationmain}

在类上使用该特性表示该类是应用程序委托类。使用该特性与调用 `NSApplicationMain(_:_:)` 函数的效果相同。

如果你不想使用这个特性，可以提供一个 `main.swift` 文件，并在代码顶层调用 `NSApplicationMain(_:_:)` 函数，如下所示:

```swift
import AppKit
NSApplicationMain(CommandLine.argc, CommandLine.unsafeArgv)
```

编译生成可执行程序的 Swift 代码最多只能拥有一个顶级代码入口，请参阅[顶级代码](../03_language_reference/06_Declarations.md#top-level-code)。

### `NSCopying` {#nscopying}

该特性用于修饰一个类的存储型变量属性。该特性将使属性的设值方法使用传入值的`副本`进行赋值，这个值由传入值的 `copyWithZone(_:)` 方法返回，而不是传入值本身。该属性的类型必需符合 `NSCopying` 协议。

`NSCopying` 特性的行为与 Objective-C 中的 `copy` 属性特性相似。

### `NSManaged` {#nsmanaged}

该特性用于修饰 `NSManagedObject` 子类中的实例方法或存储型变量属性，表明它们的实现由 `Core Data` 在运行时基于相关实体描述动态提供。对于标记了 `NSManaged` 特性的属性，`Core Data` 也会在运行时为其提供存储。应用这个特性也意味着 `objc` 特性。

### `objc` {#objc}

该特性用于修饰任何可以在 Objective-C 中表示的声明。比如，非嵌套类、协议、非泛型枚举（仅限原始值为整型的枚举）、类的属性和方法（包括存取方法）、协议以及协议中的可选成员、构造器以及下标运算符。`objc` 特性告诉编译器这个声明可以在 Objective-C 代码中使用。

该特性用在扩展中，与在没有明确标记为 `nonobjc` 特性的扩展中给每个成员添加该特性具有相同效果。

编译器隐式地将 `objc` 特性添加到 Objective-C 中定义的任何类的子类。但是，子类不能是泛型的，并且不能继承于任何泛型类。你可以将 `objc` 特性显式添加到满足这些条件的子类，来指定其 Objective-C 名称，如下所述。添加了 `objc` 的协议不能继承于没有此特性的协议。

在以下情况中同样会隐式的添加 `objc` 特性：

- 父类有 `objc` 特性，且重写为子类的声明。
- 遵循带有 `objc` 特性协议的声明。
- 带有 `IBAction`、`IBSegueAction`、`IBOutlet`、`IBDesignable`、`IBInspectable`、`NSManaged` 或 `GKInspectable` 特性的声明。

如果你将 `objc` 特性应用于枚举，每一个枚举 case 都会以枚举名称和 case 名称组合的方式暴露在 Objective-C 代码中。实例名称的首字母大写。例如，在 Swift 枚举类型 `Planet` 中有一个名为 `Venus` 的 case，该 case 暴露在 Objective-C 代码中时叫做 `PlanetVenus`。

`objc` 特性可以接受一个可选的特性参数，由标识符构成。当你想把 `objc` 所修饰的实体以一个不同的名字暴露给 Objective-C 时，你就可以使用这个特性参数。你可以使用这个参数来命名类、枚举类型、枚举 case、协议、方法、存取方法以及构造器。如果你要指定类、协议或枚举在 Objective-C 下的名称，请在名称上包含三个字母的前缀，就像 [Objective-C 编程](https://developer.apple.com/library/content/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/Introduction/Introduction.html#//apple-ref/doc/uid/TP40011210) 中的 [约定](https://developer.apple.com/library/content/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/Conventions/Conventions.html#//apple-ref/doc/uid/TP40011210-CH10-SW1)描述的一样。下面的例子把 `ExampleClass` 中的 `enabled` 属性的取值方法暴露给 Objective-C，名字是 `isEnabled`，而不是它原来的属性名。

```swift
class ExampleClass: NSObject {
    @objc var enabled: Bool {
        @objc(isEnabled) get {
            // 返回适当的值
        }
    }
}
```
更多相关信息，请参考 [把 Swift 导入 Objective-C](https://developer.apple.com/documentation/swift/imported_c_and_objective-c_apis/importing_swift_into_objective-c)。

> 注意
> 具有 `objc` 特性的实参也会改变那个声明的运行时名称。在调用与 Objective-C 运行时交互的函数时，比如 [NSClassFromString](https://developer.apple.com/documentation/foundation/1395135-nsclassfromstring)，以及在应用程序的 info.plist 文件中指定类名时，你会用到运行时名称。如果你通过传递实参的方式来指定名称，这个名称会作为 Objective-C 代码中的名称和运行时名称。如果你不使用这个实参，在 Objective-C 代码中使用的名称会与 Swift 代码中的名称匹配，并且运行时名称会遵循标准 Swift 编译器名称管理的惯例。

### `objcMembers` {#objcmembers}

该特性用于类声明，以将 `objc` 特性应用于该类、扩展、子类以及子类的扩展的所有 Objective-C 兼容成员。

大多数代码应该使用 `objc` 特性，以暴露所需的声明。如果需要暴露多个声明，可以将其分组到添加 `objc` 特性的扩展中。`objcMembers` 特性为大量使用 Objective-C 运行时的内省工具的库提供了便利。添加不必要的 `objc` 特性会增加二进制体积并影响性能。

### `propertyWrapper` {#propertywrapper}

在类、结构体或者枚举的声明时使用该特性，可以让其成为一个属性包装器。如果将该特性应用在一个类型上，将会创建一个与该类型同名的自定义特性。将这个新的特性用于类、结构体、枚举的属性，则可以通过包装器的实例封装对该属性的访问；本地存储变量声明也能利用这个特性完成对它的访问封装。局部和全局变量不能使用属性包装器。

包装器必须定义一个 `wrappedValue` 实例属性。该属性 _wrapped value_ 是该属性存取方法暴露的值。大多数时候，`wrappedValue` 是一个计算属性，但它可以是一个存储属性。包装器负责定义和管理其包装值所需的任何底层存储。编译器通过在包装属性的名称前加下划线（`_`）来为包装器的实例提供同步存储。例如，`someProperty` 的包装器存储为 `_someProperty`。包装器的同步存储具有 `private` 的访问控制级别。

拥有属性包装器的属性可以包含 `willSet` 和 `didSet` 闭包，但是不能重写编译器合成的 `get` 和 `set` 闭包。

Swift 为属性包装器的构造函数提供了两种形式的语法糖。可以在包装值的定义中使用赋值语法，将赋值语句右侧的表达式作为值传递给属性包装器构造函数中的 `wrappedValue` 参数。同样的，你也可以为包装器提供一些参数，这些参数将会传递给包装器的构造函数。就像下面的例子，`SomeStruct` 中，定义 `SomeWrapper` 的地方各自调用了对应的构造函数。

```swift
@propertyWrapper
struct SomeWrapper {
    var wrappedValue: Int
    var someValue: Double
    init() {
        self.wrappedValue = 100
        self.someValue = 12.3
    }
    init(wrappedValue: Int) {
        self.wrappedValue = wrappedValue
        self.someValue = 45.6
    }
    init(wrappedValue value: Int, custom: Double) {
        self.wrappedValue = value
        self.someValue = custom
    }
}

struct SomeStruct {
    // 使用 init()
    @SomeWrapper var a: Int

    // 使用 init(wrappedValue:)
    @SomeWrapper var b = 10

    // 两个都是使用 init(wrappedValue:custom:)
    @SomeWrapper(custom: 98.7) var c = 30
    @SomeWrapper(wrappedValue: 30, custom: 98.7) var d
}
```

属性包装器中 _projected value_ 是它可以用来暴露额外功能的第二个值。属性包装器的作者负责确认其映射值的含义并定义公开映射值的接口。若要通过属性包装器来映射值，请在包装器的类型上定义 `projectedValue` 实例属性。编译器通过在包装属性的名称前面加上美元符号（`$`）来合成映射值的标识符。例如，`someProperty` 的映射值是 `$someProperty`。映射值具有与原始包装属性相同的访问控制级别。

```swift
@propertyWrapper
struct WrapperWithProjection {
    var wrappedValue: Int
    var projectedValue: SomeProjection {
        return SomeProjection(wrapper: self)
    }
}
struct SomeProjection {
    var wrapper: WrapperWithProjection
}

struct SomeStruct {
    @WrapperWithProjection var x = 123
}
let s = SomeStruct()
s.x           // Int value
s.$x          // SomeProjection value
s.$x.wrapper  // WrapperWithProjection value
```

### `resultBuilder` {#result-builder}

将该特性应用于类、结构体或者枚举，可以把它作为结果构造器使用。结果构造器能按顺序构造一组嵌套的数据结构。利用它，可以以一种自然的声明式语法为嵌套数据结构实现一套领域专门语言（DSL）。想了解如何使用 `resultBuild`，请参阅 [结果构造器](../02_language_guide/27_Advanced_Operators.md#result-builders)。

#### 结果构造方法 {#result-building-methods}

结果构造器实现了下面的静态方法。它所有的功能已经通过静态方法暴露了，因此不需要初始化一个实例。`buildBlock(_:)` 方法是必须实现的，而那些能让领域专门语言（DSL）拥有额外能力的方法则是可选的。事实上，结果构造器类型的声明不需要遵循任何协议。

这些静态方法的描述中用到了三种类型。`Expression` 为构造器的输入类型，`Component` 为中间结果类型，`FinalResult` 为构造器最终生成结果的类型。将它们替换成你构造器所使用的类型。如果结果构造方法中没有明确 `Expression` 或 `FinalResult`，默认会使用 `Component` 的类型。

结果构造方法如下：

- `static func buildBlock(_ components: Component...) -> Component`
    将可变数量的中间结果合并成一个中间结果。必须实现这个方法。
- `static func buildOptional(_ component: Component?) -> Component`
    将可选的中间结果构造成新的中间结果。用于支持不包含 `else` 闭包的 `if` 表达式。
- `static func buildEither(first: Component) -> Component`
    构造一个由条件约束的中间结果。同时实现它与 `buildEither(second:)` 来支持 `switch` 与包含 `else` 闭包的 `if` 表达式。 
- `static func buildEither(second: Component) -> Component`
    构造一个由条件约束的中间结果。同时实现它与 `buildEither(first:)` 来支持 `switch` 与包含 `else` 闭包的 `if` 表达式。 
- `static func buildArray(_ components: [Component]) -> Component`
    将中间结果数组构造成中间结果。用于支持 `for` 循环。
- `static func buildExpression(_ expression: Expression) -> Component`
    将表达式构造成中间结果。利用它来执行预处理，比如，将入参转换为内部类型，或为使用方提供额外的类型推断信息。
- `static func buildFinalResult(_ component: Component) -> FinalResult`
    将中间结果构造成最终结果。可以在中间结果与最终结果类型不一致的结果构造器中实现这个方法，或是在最终结果返回前对它做处理。
- `static func buildLimitedAvailability(_ component: Component) -> Component`
    构建中间结果，用于在编译器控制（compiler-control）语句进行可用性检查之外，传递或擦除类型信息。可以在不同的条件分支上擦除类型信息。（译者注：这里的编译器控制语句主要指 `if #available`，参考 https://github.com/apple/swift-evolution/blob/main/proposals/0289-result-builders.md#result-building-methods）

下面的代码定义了一个简易的结果构造器，用于构造整型数组。类型别名明确了 `Compontent` 与 `Expression`，以一种简单的方式让下面的例子满足上面的方法。

```swift
@resultBuilder
struct ArrayBuilder {
    typealias Component = [Int]
    typealias Expression = Int
    static func buildExpression(_ element: Expression) -> Component {
        return [element]
    }
    static func buildOptional(_ component: Component?) -> Component {
        guard let component = component else { return [] }
        return component
    }
    static func buildEither(first component: Component) -> Component {
        return component
    }
    static func buildEither(second component: Component) -> Component {
        return component
    }
    static func buildArray(_ components: [Component]) -> Component {
        return Array(components.joined())
    }
    static func buildBlock(_ components: Component...) -> Component {
        return Array(components.joined())
    }
}
```

#### 结果转换 {#result-transformations}

使用了结果构造器语法的代码会被递归地转换，成为对结果构造器类型静态方法的调用：

- 如果结果构造器实现了 `buildExpression(_:)` 方法，每个表达式都会转换成一次方法调用。这是转换的第一步。下面的声明方式是等价的：

    ```swift
    @ArrayBuilder var builderNumber: [Int] { 10 }
    var manualNumber = ArrayBuilder.buildExpression(10)
    ```

- 赋值语句也会像表达式一样被转换，但它的类型会被当作 `()`。重载 `buildExpression(_:)` 方法，接收实参类型为 `()` 来特殊处理赋值。（译者注：重载方法参考 https://github.com/apple/swift-evolution/blob/main/proposals/0289-result-builders.md#assignments）

- 分支语句中对可用性的检查会转换成 `buildLimitedAvailability(_:)` 调用。这个转换早于 `buildEither(first:)`、`buildEither(second:)` 或 `buildOptional(_:)`。类型信息会因进入的条件分支不同发生改变，使用 `buildLimitedAvailability(_:)` 方法可以将它擦除。下面的实例中 `buildEither(first:)` 和 `buildEither(second:)` 使用泛型捕获了不同条件分支的具体类型信息。

    ```swift
    protocol Drawable {
        func draw() -> String
    }
    struct Text: Drawable {
        var content: String
        init(_ content: String) { self.content = content }
        func draw() -> String { return content }
    }
    struct Line<D: Drawable>: Drawable {
        var elements: [D]
        func draw() -> String {
            return elements.map { $0.draw() }.joined(separator: "")
        }
    }
    struct DrawEither<First: Drawable, Second: Drawable>: Drawable {
        var content: Drawable
        func draw() -> String { return content.draw() }
    }

    @resultBuilder
    struct DrawingBuilder {
        static func buildBlock<D: Drawable>(_ components: D...) -> Line<D> {
            return Line(elements: components)
        }
        static func buildEither<First, Second>(first: First)
            -> DrawEither<First, Second> {
                return DrawEither(content: first)
        }
        static func buildEither<First, Second>(second: Second)
            -> DrawEither<First, Second> {
                return DrawEither(content: second)
        }
    }
    ```

    然而，在面对有可用性检测的代码时会出现问题：

    ```swift
    @available(macOS 99, *)
    struct FutureText: Drawable {
        var content: String
        init(_ content: String) { self.content = content }
        func draw() -> String { return content }
    }
    @DrawingBuilder var brokenDrawing: Drawable {
        if #available(macOS 99, *) {
            FutureText("Inside.future")  // 问题所在
        } else {
            Text("Inside.present")
        }
    }
    // brokenDrawing 的类型是 Line<DrawEither<Line<FutureText>, Line<Text>>>
    ```

    上面的代码中，由于 `FutureText` 是 `DrawEither` 泛型的一个类型，它成为了 `brokenDrawing` 类型的组成部分。`FutureText` 如果在运行时不可用会引起程序的崩溃，即使它没有被显式使用。

    为了解决这个问题，实现 `buildLimitedAvailability(_:)` 方法擦除类型信息。举例来说，下面的代码构造了一个 `AnyDrawable` 用于可用性检查。

    ```swift
    struct AnyDrawable: Drawable {
        var content: Drawable
        func draw() -> String { return content.draw() }
    }
    extension DrawingBuilder {
        static func buildLimitedAvailability(_ content: Drawable) -> AnyDrawable {
            return AnyDrawable(content: content)
        }
    }

    @DrawingBuilder var typeErasedDrawing: Drawable {
        if #available(macOS 99, *) {
            FutureText("Inside.future")
        } else {
            Text("Inside.present")
        }
    }
    // typeErasedDrawing 的类型是 Line<DrawEither<AnyDrawable, Line<Text>>>
    ```

- 分支语句会被转换成一连串 `buildEither(first:)` 与 `buildEither(second:)` 的方法调用。语句的不同条件分支会被映射到一颗二叉树的叶子结点上，语句则变成了从根节点到叶子结点路径的嵌套 `buildEither` 方法调用。
  
    举例来说，如果你的 `switch` 语句有三个条件分支，编译器会生成一颗拥有 3 个叶子结点的二叉树。同样地，从根节点到第二个分支相当于走了“第二个子节点”再到“第一个子节点”这样的路径，这种情况会转化成 `buildEither(first: buildEither(second: ... ))` 这样的嵌套调用。下面的声明方式是等价的：

    ```swift
    let someNumber = 19
    @ArrayBuilder var builderConditional: [Int] {
        if someNumber < 12 {
            31
        } else if someNumber == 19 {
            32
        } else {
            33
        }
    }

    var manualConditional: [Int]
    if someNumber < 12 {
        let partialResult = ArrayBuilder.buildExpression(31)
        let outerPartialResult = ArrayBuilder.buildEither(first: partialResult)
        manualConditional = ArrayBuilder.buildEither(first: outerPartialResult)
    } else if someNumber == 19 {
        let partialResult = ArrayBuilder.buildExpression(32)
        let outerPartialResult = ArrayBuilder.buildEither(second: partialResult)
        manualConditional = ArrayBuilder.buildEither(first: outerPartialResult)
    } else {
        let partialResult = ArrayBuilder.buildExpression(33)
        manualConditional = ArrayBuilder.buildEither(second: partialResult)
    }
    ```

- 分支语句不一定会产生值，就像没有 `else` 闭包的 `if` 语句，会转换成 `buildOptional(_:)` 方法调用。如果 `if` 语句满足条件，它的代码块会被转换，作为实参进行传递；否则，`buildOptional(_:)` 会被调用，并用 `nil` 作为它的实参。下面的声明方式是等价的：

    ```swift
    @ArrayBuilder var builderOptional: [Int] {
        if (someNumber % 2) == 1 { 20 }
    }

    var partialResult: [Int]? = nil
    if (someNumber % 2) == 1 {
        partialResult = ArrayBuilder.buildExpression(20)
    }
    var manualOptional = ArrayBuilder.buildOptional(partialResult)
    ```

- 代码块或 `do` 语句会转换成 `buildBlock(_:)` 调用。闭包中的每一条语句都会被转换，完成后作为实参传入 `buildBlock(_:)`。下面的声明方式是等价的：

    ```swift
    @ArrayBuilder var builderBlock: [Int] {
        100
        200
        300
    }

    var manualBlock = ArrayBuilder.buildBlock(
        ArrayBuilder.buildExpression(100),
        ArrayBuilder.buildExpression(200),
        ArrayBuilder.buildExpression(300)
    )
    ```

- `for` 循环的转换分为三个部分：一个临时数组，一个 `for` 循环，以及一次 `buildArray(_:)` 方法调用。新的 `for` 循环会遍历整个序列，并把每一个中间结果存入临时数组。临时数组会作为实参传递给 `buildArray(_:)` 调用。下面的声明方式是等价的：

    ```swift
    @ArrayBuilder var builderArray: [Int] {
        for i in 5...7 {
            100 + i
        }
    }

    var temporary: [[Int]] = []
    for i in 5...7 {
        let partialResult = ArrayBuilder.buildExpression(100 + i)
        temporary.append(partialResult)
    }
    let manualArray = ArrayBuilder.buildArray(temporary)
    ```

- 如果结果构造器实现了 `buildFinalResult(_:)` 方法，最终结果会转换成对于这个方法的调用。它永远最后执行。

虽然转换行为描述中会出现临时变量，但结果构造器不会创建任何对代码可见的临时变量。

不能在结果构造器的转换中使用 `break`、`continue`、`defer`、`guard`，或是 `return` 语句、`while` 语句、`do-catch` 语句。

转换过程不会改变代码中的声明，这样就可以使用临时常量或变量一步一步构造表达式。它也不会改变 `throw` 语句、编译时诊断语句，或包含 `return` 语句的闭包。

在可能的情况下转换会被合并。例如，表达式 `4 + 5 * 6` 会被直接转换成 `buildExpression(4 + 5 * 6)` 而不是多个函数调用。同样地，嵌套分支语句也只会变成一颗调用 `buildEither` 方法的二叉树。

#### 自定义结果构造器特性 {#custom-result-builder-attributes}

创建一个结果构造器类型的同时也创建了一个同名的自定义特性。你可以将它应用于如下场景：

- 用于函数声明时，会构造函数体
- 用于变量或包含 getter 方法的下标声明时，会构造 getter 的函数体
- 用于函数声明中的形参时，会构造传递相应实参的闭包

应用结果构造器特性并不会影响 ABI 稳定。在形参上应用结果构造器，会把这个特性变成函数接口的一部分，从而影响源码稳定性。

### `requires_stored_property_inits` {#requires-stored-property-inits}

该特性用于类声明，以要求类中所有存储属性提供默认值作为其定义的一部分。对于从中继承的任何类都推断出 `NSManagedObject` 特性。

### `testable` {#testable}

将此特性应用于 `import` 声明以导入该模块，并更改其访问控制以简化对该模块代码的测试。这样就能访问被导入模块中的任何标有 `internal` 访问级别修饰符的实体，犹如它们被标记了 `public` 访问级别修饰符。测试也可以访问使用 `internal` 或者 `public` 访问级别修饰符标记的类和类成员，就像它们是 `open` 访问修饰符声明的。被导入的模块必须以允许测试的方式编译。

### `UIApplicationMain` {#uiapplicationmain}

在类上使用该特性表示该类是应用程序委托类。使用该特性与调用 `UIApplicationMain` 函数并且把该类的名字作为委托类的名字传递给函数的效果相同。

如果你不想使用这个特性，可以提供一个 `main.swift` 文件，并在代码顶层调用 `UIApplicationMain(_:_:_:_:)` 函数。比如，如果你的应用程序使用一个继承于 `UIApplication` 的自定义子类作为主要类，你可以调用 `UIApplicationMain(_:_:_:_:)` 函数而不是使用该特性。

编译生成可执行程序的 Swift 代码最多只能拥有一个顶级代码入口，请参阅[顶级代码](../03_language_reference/06_Declarations.md#top-level-code)。

### `unchecked` {#unchecked}

该特性用于协议类型，将其作为已采用协议的类型声明列表的一部分，以关闭该协议要求的强制执行。

仅支持 [Sendable](https://developer.apple.com/documentation/swift/sendable) 协议。

### `usableFromInline` {#usablefrominline}

该特性用于函数、方法、计算属性、下标、构造器或析构器的声明，以在同一模块中允许该符号用于内联代码的声明。声明必须具有 `internal` 访问级别修饰符。被标记为 `usableFromInline` 的结构体或类它们属性的类型只能是被标记为 public 或者 `usableFromInline` 的类型。被标记为 `usableFromInline` 的枚举，它 case 的真实值或者关联类型只能是被标记为 public 或者 `usableFromInline` 的类型。

与 `public` 访问修饰符相同的是，该特性将声明公开为模块公共接口的一部分。区别于 `public`，编译器不允许在模块外部的代码通过名称引用 `usableFromInline` 标记的声明，即使导出了声明符号也无法引用。但是，模块外的代码仍然可以通过运行时与声明符号进行交互。

标记为 `inlinable` 特性的声明，在内联代码中可以隐式使用。虽然 `inlinable` 或 `usableFromInline` 可以用于 `internal` 声明，但这两者不能同时使用。

### `warn-unqualified-access` {#warn-unqualified-access}

该特性应用于顶级函数、实例方法、类方法或静态方法，以在没有前置限定符（例如模块名称、类型名称、实例变量或常量）的情况下使用该函数或方法时触发警告。使用该特性可以减少在同一作用域里访问的同名函数之间的歧义。

例如，Swift 标准库包含 [`min(_:_:)`](https://developer.apple.com/documentation/swift/1538339-min/) 顶级函数和用于序列比较元素的 [`min()`](https://developer.apple.com/documentation/swift/sequence/1641174-min) 方法。序列方法声明使用了 `warn_unqualified_access`，以减少在 `Sequence` 扩展中使用它们的歧义。

### Interface Builder 使用的声明特性 {#declaration-attributes-used-by-interface-builder}

Interface Builder 特性是 Interface Builder 用来与 Xcode 同步的声明特性。Swift 提供了以下的 Interface Builder 特性：`IBAction`，`IBSegueAction`，`IBOutlet`，`IBDesignable`，以及 `IBInspectable`。这些特性与 Objective-C 中对应的特性在概念上是相同的。

`IBOutlet` 和 `IBInspectable` 用于修饰一个类的属性声明。`IBAction` 和 `IBSegueAction` 特性用于修饰一个类的方法声明，`IBDesignable` 用于修饰类的声明。

应用 `IBAction`、`IBSegueAction`、`IBOutlet`、`IBDesignable` 或者 `IBInspectable` 特性都意味着同时应用 `objc` 特性。

## 类型特性 {#type-attributes}

类型特性只能用于修饰类型。

### `autoclosure` {#autoclosure}

这个特性通过把表达式自动封装成无参数的闭包来延迟表达式的计算。它可以修饰类型为返回表达式结果类型的无参数函数类型的函数参数。关于如何使用 `autoclosure` 特性的例子，请参阅 [自动闭包](../02_language_guide/07_Closures.md#autoclosures) 和 [函数类型](./03_Types.md#function-type)。

### `convention` {#convention}

该特性用于修饰函数类型，它指出了函数调用的约定。

`convention` 特性总是与下面的参数之一一起出现。

- `swift` 参数用于表示一个 Swift 函数引用。这是 Swift 中函数值的标准调用约定。

- `block` 参数用于表示一个 Objective-C 兼容的块引用。函数值会作为一个块对象的引用，块是一种 `id` 兼容的 Objective-C 对象，其中嵌入了调用函数。调用函数使用 C 的调用约定。

- `c` 参数用于表示一个 C 函数引用。函数值没有上下文，不具备捕获功能，并且使用 C 的调用约定。

除了少数例外，当函数需要任何其他调用约定时，可以转换成任意调用约定的函数。非范型全局函数、不捕获任何局部变量的局部函数或不捕获任何局部变量的闭包可以转换为 C 调用约定。其余的 Swift 函数不能转换成 C 调用约定。一个 Objective-C 块调用约定的函数不能转换成 C 调用约定。

### `escaping` {#escaping}

在函数或者方法声明上使用该特性，它表示参数将不会被存储以供延迟执行。这将确保参数不会超出函数调用的生命周期。在使用 `escaping` 特性声明的函数类型中访问属性和方法时需要显式地使用 `self.`。关于如何使用 `escaping` 特性的例子，请参阅 [逃逸闭包](../02_language_guide/07_Closures.md#escaping-closures)。

### `Sendable` {#Sendable}

在函数类型上使用该特性以指示该函数是闭包或可发送的。在函数类型上使用该特性与使非函数类型符合 `Sendable` 协议具有相同的意义。

当一个函数或闭包被用在需要可发送值的情况，且该函数或闭包满足可发送的要求，则可以在该函数或闭包上推断此特性。

可发送函数类型是对应的不可发送函数类型的一个子类型。

## Switch Case 特性 {#switch-case-attributes}

你只能在 switch cases 语句中使用 switch case 特性。

### `unknown` {#unknown}

该特性用于 switch case，用于没有匹配上代码编译时已知 case 的情况。有关如何使用 `unknown` 特性的示例，可参阅 [对未来枚举的 `case` 进行 `switch`](./05_Statements.md#future-case)。

> 特性语法
> 
>
> 
####  attribute {#attribute}
> 
> *特性* → @ [特性名](#attribute-name) [特性参数子句](#atribute-argument-clause)<sub>可选</sub>
> 
> 
####  attribute-name {#attribute-name}
> 
> *特性名* → [标识符](./02_Lexical_Structure.md#identifier)
> 
> 
####  atribute-argument-clause {#atribute-argument-clause}
> 
> *特性参数子句* → **(** [均衡令牌列表](#balanced-tokens)<sub>可选</sub> **)**
> 
> 
####  attributes {#attributes}
> 
> *特性列表* → [特性](#attribute) [特性列表](#attributes)<sub>可选</sub>
> 
>
> 
####  balanced-tokens {#balanced-tokens}
> 
> *均衡令牌列表* → [均衡令牌](#balanced-token) [均衡令牌列表](#balanced-tokens)<sub>可选</sub>
> 
> 
####  balanced-token {#balanced-token}
> 
> *均衡令牌* → **(** [均衡令牌列表](#balanced-tokens)<sub>可选</sub> **)**
> 
> *均衡令牌* → **\[** [均衡令牌列表](#balanced-tokens)<sub>可选</sub> **\]**
> 
> *均衡令牌* → **{** [均衡令牌列表](#balanced-tokens)<sub>可选</sub> **}**
> 
> *均衡令牌* → 任意标识符，关键字，字面量或运算符
> 
> *均衡令牌* → 任意标点除了 **(**，**)**，**[**，**]**，**{**，或 **}**
> 
