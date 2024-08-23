<!--
要翻译的文件：https://github.com/SwiftGGTeam/the-swift-programming-language-in-chinese/blob/swift-6-beta-translation/swift-6-beta.docc/ReferenceManual/Attributes.md
Swift 文档源文件地址：https://docs.swift.org/swift-book/documentation/the-swift-programming-language/attributes
翻译估计用时：⭐️⭐️⭐️⭐️⭐️
-->

# 特性

为声明和类型添加信息。

在 Swift 中有两种特性——
适用于声明的特性和适用于类型的特性。特性提供有关声明或类型的附加信息。
例如，函数声明上的 discardableResult 特性表示，
尽管函数返回一个值，
但如果返回值未被使用，
编译器不应生成警告。

您通过写入 @ 符号后跟特性名称及特性接受的任何参数来指定一个特性：

```swift
@<#attribute name#>
@<#attribute name#>(<#attribute arguments#>)
```

有些声明特性接受参数，
这些参数指定有关特性的更多信息以及它如何适用于特定声明。
这些 *特性参数* 被括号括起来，
其格式由它们所属的特性定义。

宏和属性包装器也使用特性语法。
有关宏如何扩展的信息，
参见 doc:Expressions#Macro-Expansion-Expression。
有关属性包装器的信息，
参见 doc:Attributes#propertyWrapper。

## 声明特性

您只能将声明特性应用于声明。

### attached

将 `attached` macro multiple times, once for each role.
将 attached 特性应用于宏声明。
该特性的参数指示宏的角色。
对于具有多个角色的宏，
需应用 attached 宏，
每个角色应用一次。

<!-- TODO:
If there's a stable URL we can use, make the macro protocols below links.
-->

特性的第一个参数指明宏的角色：

- 术语 Peer 宏：
  将 `peer` 作为此特性的第一个参数。
  实现该宏的类型遵循 `PeerMacro` 协议。
  这些宏在与宏附加的声明相同的作用域中生成新的声明。
  例如，
  将 peer 宏应用于结构体的方法可以在该结构体上定义额外的方法和属性。

- 术语 Member 宏：
  将 `member` 作为此特性的第一个参数。
  实现该宏的类型遵循 `MemberMacro` 协议。
  这些宏生成的新声明是该宏所附加的类型或扩展的成员。
  例如，
  将 member 宏应用于结构体声明可以在该结构体上定义额外的方法和属性。

- 术语 Member 特性：
  将 `memberAttribute` 作为此特性的第一个参数。
  实现该宏的类型遵循 `MemberAttributeMacro` 协议。
  这些宏将特性添加到该宏所附加的类型或扩展的成员上。

- 术语 Accessor 宏：
  将 `accessor` 作为此特性的第一个参数。
  实现该宏的类型遵循 `AccessorMacro` 协议。
  这些宏为它们附加的存储属性添加访问器，
  将其转换为计算属性。

- 术语 Extension 展宏：
  将 `extension` 作为此特性的第一个参数。
  实现宏的类型遵循 `ExtensionMacro` 协议。
  这些宏可以添加协议遵循、
  where 从句，
  以及宏附加的类型的成员的新声明。
  如果宏添加了协议遵循，
  请包含 `conformances`: 参数并指定这些协议。
  遵循列表包含协议名称、
  指向遵循列表项的类型别名，
  或者是遵循列表项的协议组合。
  嵌套类型上的扩展宏会展开为该文件顶层的扩展。
  您不能在扩展、类型别名或嵌套在函数内的类型上编写扩展宏，
  也不能使用扩展宏添加具有 peer 宏的扩展。

peer、member 和 accessor 宏角色需要一个 `names:` 参数，
列出宏生成的符号名称。
如果宏在扩展内部添加声明，
扩展宏角色也需要一个 `names:` 参数。
当宏声明包含 `names:` 参数时，
宏实现必须仅生成与该列表匹配的名称的符号。
也就是说，
宏不必为每个列出的名称生成符号。
该参数的值是以下一个或多个项的列表：

- `named(<#name#>)`
  其中 *name* 是那个固定的符号名称，
  用于一个已知的名称。

- `overloaded`
  以便与现有符号同名。

- `prefixed(<#prefix#>)`
  其中 *prefix* 被添加到符号名称前，
  用于以固定字符串开头的名称。

- `suffixed(<#suffix#>)`
  其中 *suffix* 被附加到符号名称后，
  用于以固定字符串结尾的名称。

- `arbitrary`
  用于一个在宏展开之前无法确定的名称。

作为一个特殊情况，
您可以为一个行为类似于属性包装器的宏编写 `prefixed($)`。
<!--
TODO TR: Is there any more detail about this case?
-->

### available

应用此特性以表示声明的生命周期相
对于某些 Swift 语言版本
或某些平台和操作系统版本。

`available` 特性总是
与两个或更多用逗号分隔的特性参数列表一起出现。
这些参数以以下平台或语言名称之一开头：

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
- `visionOS`
- `visionOSApplicationExtension`
- `swift`

<!--
  If you need to add a new platform to this list,
  you probably need to update platform-name in the grammar too.
-->

<!--
  For the list in source, see include/swift/AST/PlatformKinds.def
-->

您还可以使用星号 (*) 来表示
上述所有平台名称的声明可用性。
使用 Swift 版本号指定可用性的 `available` 特性
不能使用星号。

其余参数可以以任何顺序出现，
并指定有关声明生命周期的附加信息，
包括重要的里程碑。

- `unavailable` 参数表示该声明
  在指定平台上不可用。
  指定 Swift 版本可用性时无法使用此参数。
- `introduced` 参数表示声明引入的
  指定平台或语言的第一个版本。
  它具有以下形式：

  ```swift
  introduced: <#version number#>
  ```
  *version number* 由一个到三个正整数组成，
  数字之间用句点分隔。
- `deprecated` 参数表示声明被弃用的
  指定平台或语言的第一个版本。
  它具有以下形式：

  ```swift
  deprecated: <#version number#>
  ```
  可选的 *version number* 由一个到三个正整数组成，
  数字之间用句点分隔。
  省略版本号表示该声明当前已被弃用，
  但没有提供弃用发生的时间。
  如果省略版本号，也要省略冒号 (`:`)。
- 被废弃的指定平台或语言的第一个版本。
  当声明被废弃时，
  它将从指定的平台或语言中移除，无法再使用。
  它具有以下形式：

  ```swift
  obsoleted: <#version number#>
  ```
   *version number* 由一个到三个正整数组成，数字之间用句点分隔。
- `message` 参数提供了一个文本消息，
  当编译器发出关于使用已弃用或过时声明的警告或错误时，会显示该消息。
  它具有以下形式：

  ```swift
  message: <#message#>
  ```
   *message* 由一个字符串字面量组成。
- `renamed` 参数提供了一个文本消息，
  表示已重命名声明的新名称。
  当编译器在发出关于使用重命名声明的错误时，
  会显示新名称。
  它具有以下形式：

  ```swift
  renamed: <#new name#>
  ```
   *new name* 由一个字符串字面量组成。

  您可以将 `available` 特性
  与 `renamed` 和 `unavailable` 参数
  应用于类型别名声明，如下所示，
  以指示声明的名称在框架或库的不同版本之间发生了变化。
  此组合会导致编译时错误，
  表明声明已被重命名。

  ```swift
  // First release
  protocol MyProtocol {
      // protocol definition
  }
  ```


  <!--
    - test: `renamed1`

    ```swifttest
    -> // First release
    -> protocol MyProtocol {
           // protocol definition
       }
    ```
  -->

  ```swift
  // Subsequent release renames MyProtocol
  protocol MyRenamedProtocol {
      // protocol definition
  }

  @available(*, unavailable, renamed: "MyRenamedProtocol")
  typealias MyProtocol = MyRenamedProtocol
  ```


  <!--
    - test: `renamed2`

    ```swifttest
    -> // Subsequent release renames MyProtocol
    -> protocol MyRenamedProtocol {
           // protocol definition
       }
    ---
    -> @available(*, unavailable, renamed: "MyRenamedProtocol")
       typealias MyProtocol = MyRenamedProtocol
    ```
  -->

您可以在单个声明上应用多个 `available` 特性，
以指定该声明在不同平台和不同版本的 Swift 上的可用性。
如果 `available` 特性
指定的平台或语言版本与当前目标不匹配，
则该特性应用的声明将被忽略。
如果您使用多个 `available` 特性，
则有效的可用性是平台和 Swift 可用性的组合。

<!--
  - test: `multipleAvailableAttributes`

  ```swifttest
  -> @available(iOS 9, *)
  -> @available(macOS 10.9, *)
  -> func foo() { }
  -> foo()
  ```
-->

如果一个 `available` 特性仅指定一个 `introduced` 参数
以及一个平台或语言名称参数，
您可以使用以下简写语法：

```swift
@available(<#platform name#> <#version number#>, *)
@available(swift <#version number#>)
```

 `available` 特性的简写语法
 简洁地表达了多个平台的可用性。
 尽管这两种形式在功能上是等效的，
 但在可能的情况下，
 优先使用简写形式。

```swift
@available(iOS 10.0, macOS 10.12, *)
class MyClass {
    // class definition
}
```

<!--
  - test: `availableShorthand`

  ```swifttest
  -> @available(iOS 10.0, macOS 10.12, *)
  -> class MyClass {
         // class definition
     }
  ```
-->

一个 `available` 特性，
用于使用 Swift 版本号指定可用性，
不能额外指定声明的平台可用性。
相反，使用单独的 `available` 特性来指定 Swift 版本
的可用性和一个或多个平台的可用性。

```swift
@available(swift 3.0.2)
@available(macOS 10.12, *)
struct MyStruct {
    // struct definition
}
```

<!--
  - test: `availableMultipleAvailabilities`

  ```swifttest
  -> @available(swift 3.0.2)
  -> @available(macOS 10.12, *)
  -> struct MyStruct {
         // struct definition
     }
  ```
-->

### backDeployed

将此特性应用于函数、方法、下标或计算属性，
以在调用或访问该符号的程序中包含符号实现的副本。
您使用此特性来标注作为平台一部分发布的符号，
例如与操作系统一起提供的 API。
此特性标记可以通过在访问它们的程序中包含其实现的副本而向后提供的符号。
复制实现也称为 *emitting into the client*。

此特性接受一个 `before:` 参数，
指定提供此符号的平台的第一个版本。
这些平台版本与您为 `available` 特性的
平台版本具有相同的含义。
与 `available` 特性不同，
列表中不能包含星号 (`*`) 来指代所有版本。
例如，考虑以下代码：

```swift
@available(iOS 16, *)
@backDeployed(before: iOS 17)
func someFunction() { /* ... */ }
```

在上面的例子中，
iOS SDK 从 iOS 17 开始提供 `someFunction()`。
此外，
SDK 通过向后兼容在 iOS 16 上提供 `someFunction()`。

在编译调用此函数的代码时，
Swift 插入了一层间接调用，以找到该函数的实现。
如果使用包含此函数的 SDK 版本运行代码，
则使用 SDK 的实现。
否则，将使用调用者中包含的副本。
在上面的示例中，
当在 iOS 17 或更高版本上运行时，
调用 someFunction() 使用 SDK 的实现，
而在 iOS 16 上运行时，
则使用调用者中包含的 someFunction() 的副本。

> 注意：
> 当调用者的最低部署目标
> 与包含该符号的 SDK 的第一个版本
> 相同或更高时，
> 编译器可以优化掉运行时检查，
> 直接调用 SDK 的实现。
> 在这种情况下，
> 如果您直接访问回退部署的符号，
> 编译器也可以省略客户端中符号实现的副本。

<!--
Stripping out the copy emitted into the client
depends on a chain of optimizations that must all take place --
inlining the thunk,
constant-folding the availability check,
and stripping the emitted copy as dead code --
and the details could change over time,
so we don't guarantee in docs that it always happens.
-->

满足以下标准的函数、方法、下标和计算属性可以进行回退部署：

- 声明是 `public` 或 `@usableFromInline`。
- 对于实例方法和类方法，该方法被标记为final，
  并且没有标记`@objc`。
- 该实现满足<doc:Attributes#inlinable>中描述的可内联函数的要求。

### discardableResult

将此特性应用于函数或方法声明，
以在调用返回值的函数或方法
而不使用其结果时抑制编译器警告。

### dynamicCallable

将此特性应用于类、结构、枚举或协议，
以将该类型的实例视为可调用函数。
该类型必须实现 `dynamicallyCall(withArguments:)` 方法、
`dynamicallyCall(withKeywordArguments:)` 方法或两者。

您可以像调用函数一样调用动态可调用类型的实例，
该函数可以接受任意数量的参数。

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

// Use a dynamic method call.
dial(4, 1, 1)
// Prints "Get Swift help on forums.swift.org"

dial(8, 6, 7, 5, 3, 0, 9)
// Prints "Unrecognized number"

// Call the underlying method directly.
dial.dynamicallyCall(withArguments: [4, 1, 1])
```

<!--
  - test: `dynamicCallable`

  ```swifttest
  -> @dynamicCallable
  -> struct TelephoneExchange {
         func dynamicallyCall(withArguments phoneNumber: [Int]) {
             if phoneNumber == [4, 1, 1] {
                 print("Get Swift help on forums.swift.org")
             } else {
                 print("Unrecognized number")
             }
         }
     }
  ---
  -> let dial = TelephoneExchange()
  ---
  -> // Use a dynamic method call.
  -> dial(4, 1, 1)
  <- Get Swift help on forums.swift.org
  ---
  -> dial(8, 6, 7, 5, 3, 0, 9)
  <- Unrecognized number
  ---
  -> // Call the underlying method directly.
  -> dial.dynamicallyCall(withArguments: [4, 1, 1])
  << Get Swift help on forums.swift.org
  ```
-->

`dynamicallyCall(withArguments:)` 方法的声明必须有一个符合
[`ExpressibleByArrayLiteral`](https://developer.apple.com/documentation/swift/expressiblebyarrayliteral)
协议的单一参数——就像上面的例子中的 `[Int]`。
返回类型可以是任何类型。

您可以在动态方法调用中包含实参标签，
如果您实现了 `dynamicallyCall(withKeywordArguments:)` 方法。

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

<!--
  - test: `dynamicCallable`

  ```swifttest
  -> @dynamicCallable
     struct Repeater {
         func dynamicallyCall(withKeywordArguments pairs: KeyValuePairs<String, Int>) -> String {
             return pairs
                 .map { label, count in
                     repeatElement(label, count: count).joined(separator: " ")
                 }
                 .joined(separator: "\n")
         }
     }
  ---
  -> let repeatLabels = Repeater()
  -> print(repeatLabels(a: 1, b: 2, c: 3, b: 2, a: 1))
  </ a
  </ b b
  </ c c c
  </ b b
  </ a
  ```
-->

`dynamicallyCall(withKeywordArguments:)` 方法的声明
必须有一个遵循 `ExpressibleByDictionaryLiteral` 协议的单一参数，
返回类型可以是任何类型。
参数的 `Key` 必须遵循 `ExpressibleByStringLiteral`。
前面的例子使用 `KeyValuePairs` 作为参数类型，
以便调用者可以包含重复的参数标签 ---
`a` 和 `b` 在对 `repeat` 的调用中出现多次。

如果您实现了两个 `dynamicallyCall` 方法，
当方法调用包含关键字参数时，
将调用 `dynamicallyCall(withKeywordArguments:)`。
在所有其他情况下，将调用 `dynamicallyCall(withArguments:)`。

您只能使用与您在某个 `dynamicallyCall` 方法实现中
指定的类型匹配的参数和返回值来调用动态可调用实例。
以下示例中的调用无法编译，
因为没有接受`KeyValuePairs<String, String>`的
`dynamicallyCall(withArguments:)`的实现。

```swift
repeatLabels(a: "four") // Error
```

<!--
  - test: `dynamicCallable-err`

  ```swifttest
  >> @dynamicCallable
  >> struct Repeater {
  >>     func dynamicallyCall(withKeywordArguments pairs: KeyValuePairs<String, Int>) -> String {
  >>         return pairs
  >>             .map { label, count in
  >>                 repeatElement(label, count: count).joined(separator: " ")
  >>             }
  >>             .joined(separator: "\n")
  >>     }
  >> }
  >> let repeatLabels = Repeater()
  -> repeatLabels(a: "four") // Error
  !$ error: cannot convert value of type 'String' to expected argument type 'Int'
  !! repeatLabels(a: "four") // Error
  !! ^
  ```
-->

### dynamicMemberLookup

将此特性应用于类、结构、枚举或协议，
以便在运行时按名称查找成员。
该类型必须实现一个 `subscript(dynamicMember:)` 下标

在显式成员表达式中，
如果没有对应的命名成员声明，
则该表达式被理解为对类型的 `subscript(dynamicMember:)` 下标的调用，
将有关成员的信息作为参数传递。
下标可以接受一个参数，
该参数可以是键路径或成员名称；
如果您实现了两个下标，
则使用接受键路径参数的下标。

`subscript(dynamicMember:)` 的实现可以接受
[`KeyPath`](https://developer.apple.com/documentation/swift/keypath),
[`WritableKeyPath`](https://developer.apple.com/documentation/swift/writablekeypath),
或 [`ReferenceWritableKeyPath`](https://developer.apple.com/documentation/swift/referencewritablekeypath)
类型的参数来使用键路径。
它可以接受遵循
[`ExpressibleByStringLiteral`](https://developer.apple.com/documentation/swift/expressiblebystringliteral)
协议的的成员名作为参数 --- 通常是 String。
下标的返回类型可以是任何类型。

通过成员名称的动态成员查找，
可以创建一个包装类型，
用于处理在编译时无法进行类型检查的数据，
例如在将其他语言的数据桥接到 Swift 时。比如：

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

// Use dynamic member lookup.
let dynamic = s.someDynamicMember
print(dynamic)
// Prints "325"

// Call the underlying subscript directly.
let equivalent = s[dynamicMember: "someDynamicMember"]
print(dynamic == equivalent)
// Prints "true"
```

<!--
  - test: `dynamicMemberLookup`

  ```swifttest
  -> @dynamicMemberLookup
  -> struct DynamicStruct {
         let dictionary = ["someDynamicMember": 325,
                           "someOtherMember": 787]
         subscript(dynamicMember member: String) -> Int {
             return dictionary[member] ?? 1054
         }
     }
  -> let s = DynamicStruct()
  ---
  // Use dynamic member lookup.
  -> let dynamic = s.someDynamicMember
  -> print(dynamic)
  <- 325
  ---
  // Call the underlying subscript directly.
  -> let equivalent = s[dynamicMember: "someDynamicMember"]
  -> print(dynamic == equivalent)
  <- true
  ```
-->

通过键路径的动态成员查找可以实现一种包装类型，
支持编译时类型检查。
例如：

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

<!--
  - test: `dynamicMemberLookup`

  ```swifttest
  -> struct Point { var x, y: Int }
  ---
  -> @dynamicMemberLookup
     struct PassthroughWrapper<Value> {
         var value: Value
         subscript<T>(dynamicMember member: KeyPath<Value, T>) -> T {
             get { return value[keyPath: member] }
         }
     }
  ---
  -> let point = Point(x: 381, y: 431)
  -> let wrapper = PassthroughWrapper(value: point)
  -> print(wrapper.x)
  << 381
  ```
-->

### freestanding

将 `freestanding` 属性应用于独立宏的声明。

<!--

For the future, when other roles are supported:

The arguments to this attribute indicate the macro's roles:

- `expression`
  A macro that produces an expression

- `declaration`
  A macro that produces a declaration

Or are those supported today?
I see #error and #warning as @freestanding(declaration)
in the stdlib already:

https://github.com/apple/swift/blob/main/stdlib/public/core/Macros.swift#L102
-->

### frozen

将此特性应用于结构体或枚举声明，
以限制您对类型所能进行的更改。
此特性仅在以库演进模式编译时允许。
库的未来版本不能通过添加、删除或重新排序枚举的case
或结构体的存储实例属性来更改其声明。
这些更改在非冻结类型上是允许的，
但会破坏冻结类型的 ABI 兼容性。

> 注意：当编译器不处于库演进模式时，
> 所有结构体和枚举都被隐式冻结，
> 此属性将被忽略

<!--
  - test: `can-use-frozen-without-evolution`

  ```swifttest
  >> @frozen public enum E { case x, y }
  >> @frozen public struct S { var a: Int = 10 }
  ```
-->

<!--
  <rdar://problem/54041692> Using @frozen without Library Evolution has inconsistent error messages [SE-0260]
-->

<!--
  - test: `frozen-is-fine-with-evolution`

  ```swifttest
  >> @frozen public enum E { case x, y }
  >> @frozen public struct S { var a: Int = 10 }
  ```
-->

在库演化模式下，
与非冻结结构体和枚举的成员交互的代码以一种方式编译，
使其即使在未来版本的库添加、删除或重新排序该类型的某些成员时，
也能继续工作而无需重新编译。
编译器通过在运行时查找信息和添加间接层等技术实现了这一点。
将结构体或枚举标记为冻结放弃了这种灵活性以获得性能：
库的未来版本只能对该类型进行有限的更改，
但编译器可以对与该类型的成员交互的代码进行额外的优化。

冻结类型、冻结结构体的存储属性类型
以及冻结枚举的枚举关联值必须是 public 的或标记为 `usableFromInline` 特性。
冻结结构体的属性不能有属性观察者，
并且提供存储实例属性初始值的表达式
必须遵循与内联函数相同的限制，
如文档中所讨论的 <doc:Attributes#inlinable>。

<!--
  - test: `frozen-struct-prop-init-cant-refer-to-private-type`

  ```swifttest
  >> public protocol P { }
  >> private struct PrivateStruct: P { }
  >>         public struct S1 { var fine: P = PrivateStruct() }
  >> @frozen public struct S2 { var nope: P = PrivateStruct() }
  !$ error: struct 'PrivateStruct' is private and cannot be referenced from a property initializer in a '@frozen' type
  !! @frozen public struct S2 { var nope: P = PrivateStruct() }
  !!                                          ^
  !$ note: struct 'PrivateStruct' is not '@usableFromInline' or public
  !! private struct PrivateStruct: P { }
  !!                ^
  !$ error: initializer 'init()' is private and cannot be referenced from a property initializer in a '@frozen' type
  !! @frozen public struct S2 { var nope: P = PrivateStruct() }
  !! ^
  !$ note: initializer 'init()' is not '@usableFromInline' or public
  !! private struct PrivateStruct: P { }
  !! ^
  ```
-->

要在命令行上启用库演化模式，
请将 `-enable-library-evolution` 选项传递给 Swift 编译器。
要在 Xcode 中启用它，
请将 "Build Libraries for Distribution" 构建设置
(`BUILD_LIBRARY_FOR_DISTRIBUTION`) 设置 Yes，
见：[Xcode Help](https://help.apple.com/xcode/mac/current/#/dev04b3a04ba)。

<!--
  This is the first time we're talking about a specific compiler flag/option.
  In the long term, the discussion of library evolution mode
  will need to move to a new chapter in the guide
  that also talks about things like @available and ABI.
  See <rdar://problem/51929017> TSPL: Give guidance to library authors about @available @frozen and friends
-->

对一个冻结的枚举进行的 switch 语句不需要一个 `default` case，
如文档中所讨论的 <doc:Statements#Switching-Over-Future-Enumeration-Cases>。
当在冻结的枚举上进行切换时，包括 `default` 或 `@unknown default` case会产生警告，
因为那段代码永远不会被执行。

<!--
  - test: `NoUnknownDefaultOverFrozenEnum`

  ```swifttest
  >> public enum E { case x, y }
  >> @frozen public enum F { case x, y }
  ```
-->

<!--
  - test: `NoUnknownDefaultOverFrozenEnum_Test1`

  ```swifttest
  >> import NoUnknownDefaultOverFrozenEnum
  >> func main() {
  >>     let e = NoUnknownDefaultOverFrozenEnum.E.x
  >>     switch e {
  >>         case .x: print(9)
  >>         case .y: print(8)
  >>         @unknown default: print(0)
  >>     }
  >> }
  // Note that there's no warning -- this is fine because E isn't frozen.
  ```
-->

<!--
  - test: `NoUnknownDefaultOverFrozenEnum_Test2`

  ```swifttest
  >> import NoUnknownDefaultOverFrozenEnum
  >> func main() {
  >>     let f = NoUnknownDefaultOverFrozenEnum.F.x
  >>     switch f {
  >>         case .x: print(9)
  >>         case .y: print(8)
  >>         @unknown default: print(0)
  >>     }
  >> }
  // --- Main warning ---
  !! /tmp/sourcefile_0.swift:7:18: warning: case is already handled by previous patterns; consider removing it
  !! @unknown default: print(0)
  !! ~~~~~~~~~^~~~~~~~~~~~~~~~~
  !! /tmp/sourcefile_0.swift:7:9: warning: default will never be executed
  !! @unknown default: print(0)
  !! ^
  // --- Junk/ancillary warnings ---
  !! /tmp/sourcefile_0.swift:4:12: warning: switch condition evaluates to a constant
  !! switch f {
  !! ^
  !! /tmp/sourcefile_0.swift:6:24: note: will never be executed
  !! case .y: print(8)
  !! ^
  ```
-->

### GKInspectable

将此特性应用于将自定义 GameplayKit 组件特性
暴露给 SpriteKit 编辑器 UI。
应用此特性还意味着 `objc` 特性。

<!--
  See also <rdar://problem/27287369> Document @GKInspectable attribute
  which we will want to link to, once it's written.
-->

### inlinable

将此特性应用于
函数、方法、计算属性、下标、
便利初始化器或析构器声明，
以将该声明的实现公开为模块的公共接口的一部分。
编译器可以允许在调用位置
用符号实现的副本替换对可内联符号的调用。

可内联代码
可以与任何模块中声明的 `open` 和 `public` 符号进行交互，
并且可以与同一模块中
标记为 `usableFromInline` 特性的 `internal` 符号进行交互。
可内联代码无法与 `private` 或 `fileprivate` 符号进行交互。

此特性不能应用于
嵌套在函数内部的声明，
也不能应用于 `fileprivate` 或 `private` 声明。
定义在可内联函数内部的函数和闭包是隐式可内联的，
即使它们不能被标记为此特性。

<!--
  - test: `cant-inline-private`

  ```swifttest
  >> @inlinable private func f() { }
  !$ error: '@inlinable' attribute can only be applied to public declarations, but 'f' is private
  !! @inlinable private func f() { }
  !! ^~~~~~~~~~~
  ```
-->

<!--
  - test: `cant-inline-nested`

  ```swifttest
  >> public func outer() {
  >>    @inlinable func f() { }
  >> }
  !$ error: '@inlinable' attribute can only be applied to public declarations, but 'f' is private
  !! @inlinable func f() { }
  !! ^~~~~~~~~~~
  !!-
  ```
-->

<!--
  TODO: When we get resilience, this will actually be a problem.
  Until then, per discussion with [Contributor 6004], there's no (supported) way
  for folks to get into the state where this behavior would be triggered.

  If a project uses a module that includes inlinable functions,
  the inlined copies aren't necessarily updated
  when the module's implementation of the function changes.
  For this reason,
  an inlinable function must be compatible with
  every past version of that function.
  In most cases, this means
  externally visible aspects of their implementation can't be changed.
  For example,
  an inlinable hash function can't change what algorithm is used ---
  inlined copies outside the module would use the old algorithm
  and the noninlined copy would use the new algorithm,
  yielding inconsistent results.
-->

### main

将此特性应用于结构、类或枚举声明，
以表示它包含程序流程的顶级入口点。
该类型必须提供一个不接受任何参数并返回Void的main类型函数。
例如：

```swift
@main
struct MyTopLevel {
    static func main() {
        // Top-level code goes here
    }
}
```

<!--
  - test: `atMain`

  ```swifttest
  -> @main
  -> struct MyTopLevel {
  ->     static func main() {
  ->         // Top-level code goes here
  >>         print("Hello")
  ->     }
  -> }
  << Hello
  ```
-->

另一种描述main特性要求的方法是，
您在其上编写此特性的类型
必须满足与符合以下假设协议的类型相同的要求：

```swift
protocol ProvidesMain {
    static func main() throws
}
```

<!--
  - test: `atMain_ProvidesMain`

  ```swifttest
  -> protocol ProvidesMain {
         static func main() throws
     }
  ```
-->

编译为可执行文件的 Swift 代码最多只能包含一个顶级入口点，
正如文档中所讨论的 <doc:Declarations#Top-Level-Code>。

<!--
  - test: `no-at-main-in-top-level-code`

  ```swifttest
  // This is the same example as atMain, but without :compile: true.
  >> @main
  >> struct MyTopLevel {
  >>     static func main() {
  >>         print("Hello")
  >>     }
  >> }
  !$ error: 'main' attribute cannot be used in a module that contains top-level code
  !! @main
  !! ^
  !$ note: top-level code defined in this source file
  !! @main
  !! ^
  ```
-->

<!--
  - test: `atMain_library`

  ```swifttest
  -> // In file "library.swift"
  -> open class C {
         public static func main() { print("Hello") }
     }
  ```
-->

<!--
  - test: `atMain_client`

  ```swifttest
  -> import atMain_library
  -> @main class CC: C { }
  ```
-->

### nonobjc

将此特性应用于方法、属性、下标或初始化器声明，
以抑制隐式 `objc` 特性。
`nonobjc` 特性告诉编译器
此声明在 Objective-C 代码中不可用，
尽管在 Objective-C 中可以表示它。

将此特性应用于扩展的效果
与将其应用于该扩展中
未明确标记为 `objc` 特性
的每个成员相同。

您使用 `nonobjc` 特性
来解决标记为 `objc` 特性的类中
的桥接方法的循环问题，
并允许在标记为 `objc` 特性的类中
重载方法和初始化器。

标记为 `nonobjc` 特性的方法
不能被标记为 `objc` 特性的方法重写。
然而，标记为 `objc` 特性的方法
可以被标记为 `nonobjc` 特性的方法重写。
同样，标记为 `nonobjc` 特性的方法
不能满足标记为 `objc` 特性的方法的协议要求。

### NSApplicationMain

> 已弃用：
> 此特性已弃用；
> 请改用 <doc:Attributes#main> 特性。
> 在 Swift 6 中，
> 使用此特性将会导致错误。

将此特性应用于一个类，
以指示它是应用程序委托。
使用此特性等同于调用
`NSApplicationMain(_:_:)` 函数

如果您不使用此特性，
请提供一个在顶层调用 `NSApplicationMain(_:_:)` 函数
的 `main.swift` 文件，如下所示：

```swift
import AppKit
NSApplicationMain(CommandLine.argc, CommandLine.unsafeArgv)
```

<!--
  Above code isn't tested because it hangs the REPL indefinitely,
  which is correct behavior if you call a non-returning function like this.
-->

你编译为可执行文件的 Swift 代码
最多只能包含一个顶级入口点，
见 <doc:Declarations#Top-Level-Code> 中的讨论。

### NSCopying

将此特性应用于类的存储属性变量。
此特性会导致属性的 setter
被合成为使用通过 `copyWithZone(_:)` 方法
返回的属性值*副本*，
而不是属性值本身。
属性的类型必须符合 NSCopying 协议。

`NSCopying` 特性的行为类似于 Objective-C 的 `copy` 属性特性。

<!--
  TODO: If and when Dave includes a section about this in the Guide,
  provide a link to the relevant section.
-->

### NSManaged

将此特性应用于从 `NSManagedObject` 继承的类
的实例方法或存储属性变量，
以表明 Core Data 会在运行时
根据关联的实体描述动态提供其实现。
对于标有 `NSManaged` 特性的属性，
Core Data 还会在运行时提供存储。
应用此特性也隐含了 `objc` 特性。

### objc

Apply this attribute to any declaration that can be represented in Objective-C ---
for example, nonnested classes, protocols,
nongeneric enumerations (constrained to integer raw-value types),
properties and methods (including getters and setters) of classes,
protocols and optional members of a protocol,
initializers, and subscripts.
The `objc` attribute tells the compiler
that a declaration is available to use in Objective-C code.

Applying this attribute to an extension
has the same effect as
applying it to every member of that extension
that isn't explicitly marked with the `nonobjc` attribute.

The compiler implicitly adds the `objc` attribute
to subclasses of any class defined in Objective-C.
However, the subclass must not be generic,
and must not inherit from any generic classes.
You can explicitly add the `objc` attribute
to a subclass that meets these criteria,
to specify its Objective-C name as discussed below.
Protocols that are marked with the `objc` attribute can't inherit
from protocols that aren't marked with this attribute.

The `objc` attribute is also implicitly added in the following cases:

- The declaration is an override in a subclass,
  and the superclass's declaration has the `objc` attribute.
- The declaration satisfies a requirement
  from a protocol that has the `objc` attribute.
- The declaration has the `IBAction`, `IBSegueAction`, `IBOutlet`,
  `IBDesignable`, `IBInspectable`,
  `NSManaged`, or `GKInspectable` attribute.

If you apply the `objc` attribute to an enumeration,
each enumeration case is exposed to Objective-C code
as the concatenation of the enumeration name and the case name.
The first letter of the case name is capitalized.
For example, a case named `venus` in a Swift `Planet` enumeration
is exposed to Objective-C code as a case named `PlanetVenus`.

The `objc` attribute optionally accepts a single attribute argument,
which consists of an identifier.
The identifier specifies the name to be exposed to Objective-C
for the entity that the `objc` attribute applies to.
You can use this argument to name
classes, enumerations, enumeration cases, protocols,
methods, getters, setters, and initializers.
If you specify the Objective-C name
for a class, protocol, or enumeration,
include a three-letter prefix on the name,
as described in [Conventions](https://developer.apple.com/library/content/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/Conventions/Conventions.html#//apple_ref/doc/uid/TP40011210-CH10-SW1)
in [Programming with Objective-C](https://developer.apple.com/library/content/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/Introduction/Introduction.html#//apple_ref/doc/uid/TP40011210).
The example below exposes
the getter for the `enabled` property of the `ExampleClass`
to Objective-C code as `isEnabled`
rather than just as the name of the property itself.

```swift
class ExampleClass: NSObject {
    @objc var enabled: Bool {
        @objc(isEnabled) get {
            // Return the appropriate value
        }
    }
}
```

<!--
  - test: `objc-attribute`

  ```swifttest
  >> import Foundation
  -> class ExampleClass: NSObject {
  ->    @objc var enabled: Bool {
  ->       @objc(isEnabled) get {
  ->          // Return the appropriate value
  >>          return true
  ->       }
  ->    }
  -> }
  ```
-->

For more information, see
[Importing Swift into Objective-C](https://developer.apple.com/documentation/swift/imported_c_and_objective-c_apis/importing_swift_into_objective-c).

> Note: The argument to the `objc` attribute
> can also change the runtime name for that declaration.
> You use the runtime name when calling functions
> that interact with the Objective-C runtime,
> like [`NSClassFromString(_:)`](https://developer.apple.com/documentation/foundation/1395135-nsclassfromstring),
> and when specifying class names in an app's Info.plist file.
> If you specify a name by passing an argument,
> that name is used as the name in Objective-C code
> and as the runtime name.
> If you omit the argument,
> the name used in Objective-C code matches the name in Swift code,
> and the runtime name follows the normal Swift compiler convention
> of name mangling.

### objcMembers

Apply this attribute to a class declaration,
to implicitly apply the `objc` attribute
to all Objective-C compatible members of the class,
its extensions, its subclasses, and all of the extensions of its subclasses.

Most code should use the `objc` attribute instead,
to expose only the declarations that are needed.
If you need to expose many declarations,
you can group them in an extension that has the `objc` attribute.
The `objcMembers` attribute is a convenience for
libraries that make heavy use of
the introspection facilities of the Objective-C runtime.
Applying the `objc` attribute when it isn't needed
can increase your binary size and adversely affect performance.

<!--
  The binary size comes from the additional thunks
  to translate between calling conventions.
  The performance of linking and launch are slower
  because of the larger symbol table slowing dyld down.
-->

### preconcurrency

Apply this attribute to a declaration,
to suppress strict concurrency checking.
You can apply this attribute
to the following kinds of declarations:

- Imports
- Structures, classes, and actors
- Enumerations and enumeration cases
- Protocols
- Variables and constants
- Subscripts
- Initializers
- Functions

On an import declaration,
this attribute reduces the strictness of concurrency checking
for code that uses types from the imported module.
Specifically,
types from the imported module
that aren't explicitly marked as nonsendable
can be used in a context that requires sendable types.

On other declarations,
this attribute reduces the strictness of concurrency checking
for code that uses the symbol being declared.
When you use this symbol in a scope that has minimal concurrency checking,
concurrency-related constraints specified by that symbol,
such as `Sendable` requirements or global actors,
aren't checked.

You can use this attribute as follows,
to aid in migrating code to strict concurrency checking:

1. Enable strict checking.
1. Annotate imports with the `preconcurrency` attribute
   for modules that haven't enabled strict checking.
1. After migrating a module to strict checking,
   remove the `preconcurrency` attribute.
   The compiler warns you about
   any places where the `preconcurrency` attribute on an import
   no longer has an effect and should be removed.

For other declarations,
add the `preconcurrency` attribute
when you add concurrency-related constraints to the declaration,
if you still have clients
that haven't migrated to strict checking.
Remove the `preconcurrency` attribute after all your clients have migrated.

Declarations from Objective-C are always imported
as if they were marked with the `preconcurrency` attribute.

### propertyWrapper

Apply this attribute to a class, structure, or enumeration declaration
to use that type as a property wrapper.
When you apply this attribute to a type,
you create a custom attribute with the same name as the type.
Apply that new attribute to a property of a class, structure, or enumeration
to wrap access to the property through an instance of the wrapper type;
apply the attribute to a local stored variable declaration
to wrap access to the variable the same way.
Computed variables, global variables, and constants can't use property wrappers.

<!--
  - test: `property-wrappers-can-go-on-stored-variable`

  ```swifttest
  >> @propertyWrapper struct UselessWrapper { var wrappedValue: Int }
  >> func f() {
  >>     @UselessWrapper var d: Int = 20
  >>     print(d)
  >> }
  >> f()
  << 20
  ```
-->

<!--
  - test: `property-wrappers-cant-go-on-constants`

  ```swifttest
  >> @propertyWrapper struct UselessWrapper { var wrappedValue: Int }
  >> func f() {
  >>     @UselessWrapper let d: Int = 20
  >>     print(d)
  >> }
  !$ error: property wrapper can only be applied to a 'var'
  !! @UselessWrapper let d: Int = 20
  !! ^
  ```
-->

<!--
  - test: `property-wrappers-cant-go-on-computed-variable`

  ```swifttest
  >> @propertyWrapper struct UselessWrapper { var wrappedValue: Int }
  >> func f() {
  >>     @UselessWrapper var d: Int { return 20 }
  >>     print(d)
  >> }
  >> f()
  !$ error: property wrapper cannot be applied to a computed property
  !! @UselessWrapper var d: Int { return 20 }
  !! ^
  ```
-->

The wrapper must define a `wrappedValue` instance property.
The *wrapped value* of the property
is the value that the getter and setter for this property expose.
In most cases, `wrappedValue` is a computed value,
but it can be a stored value instead.
The wrapper defines and manages
any underlying storage needed by its wrapped value.
The compiler synthesizes storage for the instance of the wrapper type
by prefixing the name of the wrapped property with an underscore (`_`) ---
for example, the wrapper for `someProperty` is stored as `_someProperty`.
The synthesized storage for the wrapper has an access control level of `private`.

A property that has a property wrapper
can include `willSet` and `didSet` blocks,
but it can't override the compiler-synthesized `get` or `set` blocks.

Swift provides two forms of syntactic sugar
for initialization of a property wrapper.
You can use assignment syntax in the definition of a wrapped value
to pass the expression on the right-hand side of the assignment
as the argument to the `wrappedValue` parameter
of the property wrapper's initializer.
You can also provide arguments to the attribute
when you apply it to a property,
and those arguments are passed to the property wrapper's initializer.
For example, in the code below,
`SomeStruct` calls each of the initializers that `SomeWrapper` defines.

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
    // Uses init()
    @SomeWrapper var a: Int

    // Uses init(wrappedValue:)
    @SomeWrapper var b = 10

    // Both use init(wrappedValue:custom:)
    @SomeWrapper(custom: 98.7) var c = 30
    @SomeWrapper(wrappedValue: 30, custom: 98.7) var d
}
```

<!--
  - test: `propertyWrapper`

  ```swifttest
  -> @propertyWrapper
  -> struct SomeWrapper {
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
  ---
  -> struct SomeStruct {
  ->     // Uses init()
  ->     @SomeWrapper var a: Int
  ---
  ->     // Uses init(wrappedValue:)
  ->     @SomeWrapper var b = 10
  ---
  ->     // Both use init(wrappedValue:custom:)
  ->     @SomeWrapper(custom: 98.7) var c = 30
  ->     @SomeWrapper(wrappedValue: 30, custom: 98.7) var d
  -> }
  ```
-->

<!--
  Comments in the SomeStruct part of the example above
  are on the line before instead of at the end of the line
  because the last example gets too long to fit on one line.
-->

<!--
  Initialization of a wrapped property using ``init(wrappedValue:)``
  can be split across multiple statements.
  However, you can only see that behavior using local variables
  which currently can't have a property wrapper.
  It would look like this:

  -> @SomeWrapper var e
  -> e = 20  // Uses init(wrappedValue:)
  -> e = 30  // Uses the property setter
-->

The *projected value* for a wrapped property is a second value
that a property wrapper can use to expose additional functionality.
The author of a property wrapper type
is responsible for determining the meaning of its projected value
and defining the interface that the projected value exposes.
To project a value from a property wrapper,
define a `projectedValue` instance property on the wrapper type.
The compiler synthesizes an identifier for the projected value
by prefixing the name of the wrapped property with a dollar sign (`$`) ---
for example, the projected value for `someProperty` is `$someProperty`.
The projected value has the same access control level
as the original wrapped property.

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

<!--
  - test: `propertyWrapper-projection`

  ```swifttest
  -> @propertyWrapper
  -> struct WrapperWithProjection {
         var wrappedValue: Int
         var projectedValue: SomeProjection {
             return SomeProjection(wrapper: self)
         }
  }
  -> struct SomeProjection {
         var wrapper: WrapperWithProjection
  }
  ---
  -> struct SomeStruct {
  ->     @WrapperWithProjection var x = 123
  -> }
  -> let s = SomeStruct()
  >> _ =
  -> s.x           // Int value
  >> _ =
  -> s.$x          // SomeProjection value
  >> _ =
  -> s.$x.wrapper  // WrapperWithProjection value
  ```
-->

### resultBuilder

Apply this attribute to a class, structure, enumeration
to use that type as a result builder.
A *result builder* is a type
that builds a nested data structure step by step.
You use result builders to implement a domain-specific language (DSL)
for creating nested data structures in a natural, declarative way.
For an example of how to use the `resultBuilder` attribute,
see <doc:AdvancedOperators#Result-Builders>.

#### Result-Building Methods

A result builder implements static methods described below.
Because all of the result builder's functionality
is exposed through static methods,
you don't ever initialize an instance of that type.
A result builder must implement either the `buildBlock(_:)` method
or both the `buildPartialBlock(first:)`
and `buildPartialBlock(accumulated:next:)` methods.
The other methods ---
which enable additional functionality in the DSL ---
are optional.
The declaration of a result builder type
doesn't actually have to include any protocol conformance.

The description of the static methods uses three types as placeholders.
The type `Expression` is a placeholder
for the type of the result builder's input,
`Component` is a placeholder for the type of a partial result,
and `FinalResult` is a placeholder
for the type of the result that the result builder produces.
You replace these types with the actual types that your result builder uses.
If your result-building methods
don't specify a type for `Expression` or `FinalResult`,
they default to being the same as `Component`.

The block-building methods are as follows:

- term `static func buildBlock(_ components: Component...) -> Component`:
  Combines an array of partial results into a single partial result.

- term `static func buildPartialBlock(first: Component) -> Component`:
  Builds a partial result component from the first component.
  Implement both this method and `buildPartialBlock(accumulated:next:)`
  to support building blocks one component at a time.
  Compared to `buildBlock(_:)`,
  this approach reduces the need for generic overloads
  that handle different numbers of arguments.

- term `static func buildPartialBlock(accumulated: Component, next: Component) -> Component`:
  Builds a partial result component
  by combining an accumulated component with a new component.
  Implement both this method and `buildPartialBlock(first:)`
  to support building blocks one component at a time.
  Compared to `buildBlock(_:)`,
  this approach reduces the need for generic overloads
  that handle different numbers of arguments.

A result builder can implement all three of the block-building methods listed above;
in that case, availability determines which method is called.
By default, Swift calls the `buildPartialBlock(first:)` and `buildPartialBlock(accumulated:next:)`
methods. To make Swift call `buildBlock(_:)` instead,
mark the enclosing declaration as being available
before the availability you write on `buildPartialBlock(first:)` and
`buildPartialBlock(accumulated:next:)`.

The additional result-building methods are as follows:

- term `static func buildOptional(_ component: Component?) -> Component`:
  Builds a partial result from a partial result that can be `nil`.
  Implement this method to support `if` statements
  that don’t include an `else` clause.

- term `static func buildEither(first: Component) -> Component`:
  Builds a partial result whose value varies depending on some condition.
  Implement both this method and `buildEither(second:)`
  to support `switch` statements
  and `if` statements that include an `else` clause.

- term `static func buildEither(second: Component) -> Component`:
  Builds a partial result whose value varies depending on some condition.
  Implement both this method and `buildEither(first:)`
  to support `switch` statements
  and `if` statements that include an `else` clause.

- term `static func buildArray(_ components: [Component]) -> Component`:
  Builds a partial result from an array of partial results.
  Implement this method to support `for` loops.

- term `static func buildExpression(_ expression: Expression) -> Component`:
  Builds a partial result from an expression.
  You can implement this method to perform preprocessing ---
  for example, converting expressions to an internal type ---
  or to provide additional information for type inference at use sites.

- term `static func buildFinalResult(_ component: Component) -> FinalResult`:
  Builds a final result from a partial result.
  You can implement this method as part of a result builder
  that uses a different type for partial and final results,
  or to perform other postprocessing on a result before returning it.

- term `static func buildLimitedAvailability(_ component: Component) -> Component`:
  Builds a partial result that erases type information.
  You can implement this method to prevent type information
  from propagating outside a compiler-control statement
  that performs an availability check.

For example, the code below defines a simple result builder
that builds an array of integers.
This code defines `Component` and `Expression` as type aliases,
to make it easier to match the examples below to the list of methods above.

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

<!--
  - test: `array-result-builder`

  ```swifttest
  -> @resultBuilder
  -> struct ArrayBuilder {
         typealias Component = [Int]
         typealias Expression = Int
         static func buildExpression(_ element: Expression) -> Component {
             return [element]
         }
         static func buildOptional(_ component: Component?) -> Component {
  >>         print("Building optional...", component as Any)
             guard let component = component else { return [] }
             return component
         }
         static func buildEither(first component: Component) -> Component {
  >>         print("Building first...", component)
             return component
         }
         static func buildEither(second component: Component) -> Component {
  >>         print("Building second...", component)
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
-->

#### Result Transformations

The following syntactic transformations are applied recursively
to turn code that uses result-builder syntax
into code that calls the static methods of the result builder type:

- If the result builder has a `buildExpression(_:)` method,
  each expression becomes a call to that method.
  This transformation is always first.
  For example, the following declarations are equivalent:

  ```swift
  @ArrayBuilder var builderNumber: [Int] { 10 }
  var manualNumber = ArrayBuilder.buildExpression(10)
  ```


  <!--
    - test: `array-result-builder`

    ```swifttest
    -> @ArrayBuilder var builderNumber: [Int] { 10 }
    -> var manualNumber = ArrayBuilder.buildExpression(10)
    >> assert(builderNumber == manualNumber)
    ```
  -->
- An assignment statement is transformed like an expression,
  but is understood to evaluate to `()`.
  You can define an overload of `buildExpression(_:)`
  that takes an argument of type `()` to handle assignments specifically.
- A branch statement that checks an availability condition
  becomes a call to the `buildLimitedAvailability(_:)` method,
  if that method is implemented.
  If you don't implement `buildLimitedAvailability(_:)`,
  then branch statements that check availability
  use the same transformations as other branch statements.
  This transformation happens before the transformation into a call to
  `buildEither(first:)`, `buildEither(second:)`, or `buildOptional(_:)`.

  You use the `buildLimitedAvailability(_:)` method to erase type information
  that changes depending on which branch is taken.
  For example,
  the `buildEither(first:)` and  `buildEither(second:)` methods below
  use a generic type that captures type information about both branches.

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

  <!-- Comment block with swifttest for the code listing above is after the end of this bulleted list, due to tooling limitations. -->

  However, this approach causes a problem in code that has availability checks:

  ```swift
  @available(macOS 99, *)
  struct FutureText: Drawable {
      var content: String
      init(_ content: String) { self.content = content }
      func draw() -> String { return content }
  }
  @DrawingBuilder var brokenDrawing: Drawable {
      if #available(macOS 99, *) {
          FutureText("Inside.future")  // Problem
      } else {
          Text("Inside.present")
      }
  }
  // The type of brokenDrawing is Line<DrawEither<Line<FutureText>, Line<Text>>>
  ```

  <!-- Comment block with swifttest for the code listing above is after the end of this bulleted list, due to tooling limitations. -->

  In the code above,
  `FutureText` appears as part of the type of `brokenDrawing`
  because it's one of the types in the `DrawEither` generic type.
  This could cause your program to crash if `FutureText`
  isn't available at runtime,
  even in the case where that type is explicitly not being used.

  To solve this problem,
  implement a `buildLimitedAvailability(_:)` method
  to erase type information by returning a type that's always available.
  For example, the code below builds an `AnyDrawable` value
  from its availability check.

  ```swift
  struct AnyDrawable: Drawable {
      var content: Drawable
      func draw() -> String { return content.draw() }
  }
  extension DrawingBuilder {
      static func buildLimitedAvailability(_ content: some Drawable) -> AnyDrawable {
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
  // The type of typeErasedDrawing is Line<DrawEither<AnyDrawable, Line<Text>>>
  ```

  <!-- Comment block with swifttest for the code listing above is after the end of this bulleted list, due to tooling limitations. -->

- A branch statement becomes a series of nested calls to the
  `buildEither(first:)` and `buildEither(second:)` methods.
  The statements' conditions and cases are mapped onto
  the leaf nodes of a binary tree,
  and the statement becomes
  a nested call to the `buildEither` methods
  following the path to that leaf node from the root node.

  For example, if you write a switch statement that has three cases,
  the compiler uses a binary tree with three leaf nodes.
  Likewise,
  because the path from the root node to the second case is
  "second child" and then "first child",
  that case becomes a nested call like
  `buildEither(first: buildEither(second: ... ))`.
  The following declarations are equivalent:

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


  <!--
    - test: `array-result-builder`

    ```swifttest
    -> let someNumber = 19
    -> @ArrayBuilder var builderConditional: [Int] {
           if someNumber < 12 {
               31
           } else if someNumber == 19 {
               32
           } else {
               33
           }
       }
    << Building second... [32]
    << Building first... [32]
    ---
    -> var manualConditional: [Int]
    -> if someNumber < 12 {
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
    >> assert(builderConditional == manualConditional)
    << Building second... [32]
    << Building first... [32]
    ```
  -->
- A branch statement that might not produce a value,
  like an `if` statement without an `else` clause,
  becomes a call to `buildOptional(_:)`.
  If the `if` statement's condition is satisfied,
  its code block is transformed and passed as the argument;
  otherwise, `buildOptional(_:)` is called with `nil` as its argument.
  For example, the following declarations are equivalent:

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


  <!--
    - test: `array-result-builder`

    ```swifttest
    -> @ArrayBuilder var builderOptional: [Int] {
           if (someNumber % 2) == 1 { 20 }
       }
    << Building optional... Optional([20])
    ---
    -> var partialResult: [Int]? = nil
    -> if (someNumber % 2) == 1 {
           partialResult = ArrayBuilder.buildExpression(20)
       }
    -> var manualOptional = ArrayBuilder.buildOptional(partialResult)
    << Building optional... Optional([20])
    >> assert(builderOptional == manualOptional)
    ```
  -->
- If the result builder implements
  the `buildPartialBlock(first:)`
  and `buildPartialBlock(accumulated:next:)` methods,
  a code block or `do` statement becomes a call to those methods.
  The first statement inside of the block
  is transformed to become an argument
  to the `buildPartialBlock(first:)` method,
  and the remaining statements become nested calls
  to the `buildPartialBlock(accumulated:next:)` method.
  For example, the following declarations are equivalent:

  ```swift
  struct DrawBoth<First: Drawable, Second: Drawable>: Drawable {
      var first: First
      var second: Second
      func draw() -> String { return first.draw() + second.draw() }
  }

  @resultBuilder
  struct DrawingPartialBlockBuilder {
      static func buildPartialBlock<D: Drawable>(first: D) -> D {
          return first
      }
      static func buildPartialBlock<Accumulated: Drawable, Next: Drawable>(
          accumulated: Accumulated, next: Next
      ) -> DrawBoth<Accumulated, Next> {
          return DrawBoth(first: accumulated, second: next)
      }
  }

  @DrawingPartialBlockBuilder var builderBlock: some Drawable {
      Text("First")
      Line(elements: [Text("Second"), Text("Third")])
      Text("Last")
  }

  let partialResult1 = DrawingPartialBlockBuilder.buildPartialBlock(first: Text("first"))
  let partialResult2 = DrawingPartialBlockBuilder.buildPartialBlock(
      accumulated: partialResult1,
      next: Line(elements: [Text("Second"), Text("Third")])
  )
  let manualResult = DrawingPartialBlockBuilder.buildPartialBlock(
      accumulated: partialResult2,
      next: Text("Last")
  )
  ```

  <!--
    - test: `drawing-partial-block-builder`

    ```swifttest
    -> @resultBuilder
    -> struct DrawingPartialBlockBuilder {
           static func buildPartialBlock<D: Drawable>(first: D) -> D {
               return first
           }
           static func buildPartialBlock<Accumulated: Drawable, Next: Drawable>(
               accumulated: Accumulated, next: Next
           ) -> DrawBoth<Accumulated, Next> {
               return DrawBoth(first: accumulated, second: next)
           }
       }
    -> @DrawingPartialBlockBuilder var builderBlock: some Drawable {
          Text("First")
          Line(elements: [Text("Second"), Text("Third")])
          Text("Last")
       }
    ---
    -> let partialResult1 = DrawingPartialBlockBuilder.buildPartialBlock(first: Text("first"))
    -> let partialResult2 = DrawingPartialBlockBuilder.buildPartialBlock(
          accumulated: partialResult1,
          next: Line(elements: [Text("Second"), Text("Third")])
       )
       let manualResult = DrawingPartialBlockBuilder.buildPartialBlock(
           accumulated: partialResult2,
           next: Text("Last")
       )
    >> assert(type(of: builderBlock) == type(of: manualResult))
    ```
  -->
- Otherwise, a code block or `do` statement
  becomes a call to the `buildBlock(_:)` method.
  Each of the statements inside of the block is transformed,
  one at a time,
  and they become the arguments to the `buildBlock(_:)` method.
  For example, the following declarations are equivalent:

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


  <!--
    - test: `array-result-builder`

    ```swifttest
    -> @ArrayBuilder var builderBlock: [Int] {
           100
           200
           300
       }
    ---
    -> var manualBlock = ArrayBuilder.buildBlock(
           ArrayBuilder.buildExpression(100),
           ArrayBuilder.buildExpression(200),
           ArrayBuilder.buildExpression(300)
       )
    >> assert(builderBlock == manualBlock)
    ```
  -->
- A `for` loop becomes a temporary variable, a `for` loop,
  and call to the `buildArray(_:)` method.
  The new `for` loop iterates over the sequence
  and appends each partial result to that array.
  The temporary array is passed as the argument in the `buildArray(_:)` call.
  For example, the following declarations are equivalent:

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


  <!--
    - test: `array-result-builder`

    ```swifttest
    -> @ArrayBuilder var builderArray: [Int] {
           for i in 5...7 {
               100 + i
           }
       }
    ---
    -> var temporary: [[Int]] = []
    -> for i in 5...7 {
           let partialResult = ArrayBuilder.buildExpression(100 + i)
           temporary.append(partialResult)
       }
    -> let manualArray = ArrayBuilder.buildArray(temporary)
    >> assert(builderArray == manualArray)
    ```
  -->
- If the result builder has a `buildFinalResult(_:)` method,
  the final result becomes a call to that method.
  This transformation is always last.

<!--
  - test: `result-builder-limited-availability-broken, result-builder-limited-availability-ok`, `drawing-partial-result-builder`

  ```swifttest
  -> protocol Drawable {
         func draw() -> String
     }
  -> struct Text: Drawable {
         var content: String
         init(_ content: String) { self.content = content }
         func draw() -> String { return content }
     }
  -> struct Line<D: Drawable>: Drawable {
         var elements: [D]
         func draw() -> String {
             return elements.map { $0.draw() }.joined(separator: "")
         }
     }
  -> struct DrawEither<First: Drawable, Second: Drawable>: Drawable {
         var content: Drawable
         func draw() -> String { return content.draw() }
     }
  ---
  -> @resultBuilder
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
-->

<!--
  - test: `result-builder-limited-availability-broken`

  ```swifttest
  -> @available(macOS 99, *)
  -> struct FutureText: Drawable {
         var content: String
         init(_ content: String) { self.content = content }
         func draw() -> String { return content }
     }
  -> @DrawingBuilder var brokenDrawing: Drawable {
         if #available(macOS 99, *) {
             FutureText("Inside.future")  // Problem
         } else {
             Text("Inside.present")
         }
     }
  /> The type of brokenDrawing is \(type(of: brokenDrawing))
  </ The type of brokenDrawing is Line<DrawEither<Line<FutureText>, Line<Text>>>
  !$ warning: result builder 'DrawingBuilder' does not implement 'buildLimitedAvailability'; this code may crash on earlier versions of the OS
  !! if #available(macOS 99, *) {
  !! ^
  !$ note: add 'buildLimitedAvailability(_:)' to the result builder 'DrawingBuilder' to erase type information for less-available types
  !! struct DrawingBuilder {
  !! ^
  ```
-->

<!--
  - test: `result-builder-limited-availability-ok`

  ```swifttest
  >> @available(macOS 99, *)
  >> struct FutureText: Drawable {
  >>     var content: String
  >>     init(_ content: String) { self.content = content }
  >>     func draw() -> String { return content }
  >> }
  >> @DrawingBuilder var x: Drawable {
  >>     if #available(macOS 99, *) {
  >>         FutureText("Inside.future")
  >>     } else {
  >>         Text("Inside.present")
  >>     }
  >> }
  -> struct AnyDrawable: Drawable {
         var content: Drawable
         func draw() -> String { return content.draw() }
     }
  -> extension DrawingBuilder {
         static func buildLimitedAvailability(_ content: some Drawable) -> AnyDrawable {
             return AnyDrawable(content: content)
         }
     }
  ---
  -> @DrawingBuilder var typeErasedDrawing: Drawable {
         if #available(macOS 99, *) {
             FutureText("Inside.future")
         } else {
             Text("Inside.present")
         }
     }
  /> The type of typeErasedDrawing is \(type(of: typeErasedDrawing))
  </ The type of typeErasedDrawing is Line<DrawEither<AnyDrawable, Line<Text>>>
  ```
-->

Although the transformation behavior is described in terms of temporary variables,
using a result builder doesn't actually create any new declarations
that are visible from the rest of your code.

You can't use
`break`, `continue`, `defer`, `guard`, or `return` statements,
`while` statements,
or `do`-`catch` statements
in the code that a result builder transforms.

The transformation process doesn't change declarations in the code,
which lets you use temporary constants and variables
to build up expressions piece by piece.
It also doesn't change
`throw` statements,
compile-time diagnostic statements,
or closures that contain a `return` statement.

Whenever possible, transformations are coalesced.
For example, the expression `4 + 5 * 6` becomes
`buildExpression(4 + 5 * 6)` rather multiple calls to that function.
Likewise, nested branch statements become
a single binary tree of calls to the `buildEither` methods.

<!--
  - test: `result-builder-transform-complex-expression`

  ```swifttest
  >> @resultBuilder
  >> struct ArrayBuilder {
  >>     static func buildExpression(_ element: Int) -> [Int] {
  >>         print("Building", element)
  >>         return [element]
  >>     }
  >>     static func buildBlock(_ components: [Int]...) -> [Int] {
  >>         return Array(components.joined())
  >>     }
  >> }
  >> @ArrayBuilder var x: [Int] {
  >>     10+12*3
  >> }
  << Building 46
  >> print(x)
  << [46]
  ```
-->

#### Custom Result-Builder Attributes

Creating a result builder type creates a custom attribute with the same name.
You can apply that attribute in the following places:

- On a function declaration,
  the result builder builds the body of the function.
- On a variable or subscript declaration that includes a getter,
  the result builder builds the body of the getter.
- On a parameter in a function declaration,
  the result builder builds the body of a closure
  that's passed as the corresponding argument.

Applying a result builder attribute doesn't impact ABI compatibility.
Applying a result builder attribute to a parameter
makes that attribute part of the function's interface,
which can affect source compatibility.

### requires_stored_property_inits

Apply this attribute to a class declaration
to require all stored properties within the class
to provide default values as part of their definitions.
This attribute is inferred for any class
that inherits from `NSManagedObject`.

<!--
  - test: `requires_stored_property_inits-requires-default-values`

  ```swifttest
  >> @requires_stored_property_inits class DefaultValueProvided {
         var value: Int = -1
         init() { self.value = 0 }
     }
  -> @requires_stored_property_inits class NoDefaultValue {
         var value: Int
         init() { self.value = 0 }
     }
  !$ error: stored property 'value' requires an initial value
  !! var value: Int
  !! ^
  !$ note: class 'NoDefaultValue' requires all stored properties to have initial values
  !! @requires_stored_property_inits class NoDefaultValue {
  !! ^
  ```
-->

### testable

Apply this attribute to an `import` declaration
to import that module with changes to its access control
that simplify testing the module's code.
Entities in the imported module
that are marked with the `internal` access-level modifier
are imported as if they were declared with the `public` access-level modifier.
Classes and class members
that are marked with the `internal` or `public` access-level modifier
are imported as if they were declared with the `open` access-level modifier.
The imported module must be compiled with testing enabled.

### UIApplicationMain

> Deprecated:
> This attribute is deprecated;
> use the <doc:Attributes#main> attribute instead.
> In Swift 6,
> using this attribute will be an error.

Apply this attribute to a class
to indicate that it's the app delegate.
Using this attribute is equivalent to calling the
`UIApplicationMain` function and
passing this class's name as the name of the delegate class.

If you don't use this attribute,
supply a `main.swift` file with code at the top level
that calls the [`UIApplicationMain(_:_:_:_:)`](https://developer.apple.com/documentation/uikit/1622933-uiapplicationmain) function.
For example,
if your app uses a custom subclass of `UIApplication`
as its principal class,
call the `UIApplicationMain(_:_:_:_:)` function
instead of using this attribute.

The Swift code you compile to make an executable
can contain at most one top-level entry point,
as discussed in <doc:Declarations#Top-Level-Code>.

### unchecked

Apply this attribute to a protocol type
as part of a type declaration's list of adopted protocols
to turn off enforcement of that protocol's requirements.

The only supported protocol is [`Sendable`](https://developer.apple.com/documentation/swift/sendable).

### usableFromInline

Apply this attribute to a
function, method, computed property, subscript,
initializer, or deinitializer declaration
to allow that symbol to be used in inlinable code
that's defined in the same module as the declaration.
The declaration must have the `internal` access-level modifier.
A structure or class marked `usableFromInline`
can use only types that are public or `usableFromInline` for its properties.
An enumeration marked `usableFromInline`
can use only types that are public or `usableFromInline`
for the raw values and associated values of its cases.

Like the `public` access-level modifier,
this attribute
exposes the declaration as part of the module's public interface.
Unlike `public`,
the compiler doesn't allow declarations marked with `usableFromInline`
to be referenced by name in code outside the module,
even though the declaration's symbol is exported.
However, code outside the module might still be able
to interact with the declaration's symbol by using runtime behavior.

Declarations marked with the `inlinable` attribute
are implicitly usable from inlinable code.
Although either `inlinable` or `usableFromInline`
can be applied to `internal` declarations,
applying both attributes is an error.

<!--
  - test: `usableFromInline-and-inlinable-is-redundant`

  ```swifttest
  >> @usableFromInline @inlinable internal func f() { }
  !$ warning: '@usableFromInline' attribute has no effect on '@inlinable' global function 'f()'
  !! @usableFromInline @inlinable internal func f() { }
  !! ^~~~~~~~~~~~~~~~~~
  ```
-->

### warn_unqualified_access

Apply this attribute to a
top-level function, instance method, or class or static method
to trigger warnings when that function or method is used
without a preceding qualifier,
such as a module name, type name, or instance variable or constant.
Use this attribute to help discourage ambiguity between functions
with the same name that are accessible from the same scope.

For example,
the Swift standard library includes both a top-level
[`min(_:_:)`](https://developer.apple.com/documentation/swift/1538339-min/)
function and a
[`min()`](https://developer.apple.com/documentation/swift/sequence/1641174-min)
method for sequences with comparable elements.
The sequence method is declared with the `warn_unqualified_access` attribute
to help reduce confusion
when attempting to use one or the other from within a `Sequence` extension.

### Declaration Attributes Used by Interface Builder

Interface Builder attributes are declaration attributes
used by Interface Builder to synchronize with Xcode.
Swift provides the following Interface Builder attributes:
`IBAction`, `IBSegueAction`, `IBOutlet`,
`IBDesignable`, and `IBInspectable`.
These attributes are conceptually the same as their
Objective-C counterparts.

<!--
  TODO: Need to link to the relevant discussion of these attributes in Objc.
-->

You apply the `IBOutlet` and `IBInspectable` attributes
to property declarations of a class.
You apply the `IBAction` and `IBSegueAction` attribute
to method declarations of a class
and the `IBDesignable` attribute to class declarations.

Applying the `IBAction`, `IBSegueAction`, `IBOutlet`,
`IBDesignable`, or `IBInspectable` attribute
also implies the `objc` attribute.

## Type Attributes

You can apply type attributes to types only.

### autoclosure

Apply this attribute to delay the evaluation of an expression
by automatically wrapping that expression in a closure with no arguments.
You apply it to a parameter's type in a function or method declaration,
for a parameter whose type is a function type that takes no arguments
and that returns a value of the type of the expression.
For an example of how to use the `autoclosure` attribute,
see <doc:Closures#Autoclosures> and <doc:Types#Function-Type>.

### convention

Apply this attribute to the type of a function
to indicate its calling conventions.

The `convention` attribute always appears with
one of the following arguments:

- The `swift` argument indicates a Swift function reference.
  This is the standard calling convention for function values in Swift.
- The `block` argument indicates an Objective-C compatible block reference.
  The function value is represented as a reference to the block object,
  which is an `id`-compatible Objective-C object that embeds its invocation
  function within the object.
  The invocation function uses the C calling convention.
- The `c` argument indicates a C function reference.
  The function value carries no context and uses the C calling convention.

<!--
  Note: @convention(thin) is private, even though it doesn't have an underscore
  https://forums.swift.org/t/12087/6
-->

With a few exceptions,
a function of any calling convention can be used
when a function any other calling convention is needed.
A nongeneric global function,
a local function that doesn't capture any local variables,
or a closure that doesn't capture any local variables
can be converted to the C calling convention.
Other Swift functions can't be converted to the C calling convention.
A function with the Objective-C block calling convention
can't be converted to the C calling convention.

### escaping

Apply this attribute to a parameter's type in a function or method declaration
to indicate that the parameter's value can be stored for later execution.
This means that the value is allowed to outlive the lifetime of the call.
Function type parameters with the `escaping` type attribute
require explicit use of `self.` for properties or methods.
For an example of how to use the `escaping` attribute,
see <doc:Closures#Escaping-Closures>.

### Sendable

Apply this attribute to the type of a function
to indicate that the function or closure is sendable.
Applying this attribute to a function type
has the same meaning as conforming a non–function type
to the [`Sendable`](https://developer.apple.com/documentation/swift/sendable) protocol.

This attribute is inferred on functions and closures
if the function or closure is used in a context
that expects a sendable value,
and the function or closure satisfies the requirements to be sendable.

A sendable function type
is a subtype of the corresponding nonsendable function type.

## Switch Case Attributes

You can apply switch case attributes to switch cases only.

### unknown

Apply this attribute to a switch case
to indicate that it isn't expected to be matched
by any case of the enumeration that's known
at the time the code is compiled.
For an example of how to use the `unknown` attribute,
see <doc:Statements#Switching-Over-Future-Enumeration-Cases>.

> Grammar of an attribute:
>
> *attribute* → **`@`** *attribute-name* *attribute-argument-clause*_?_ \
> *attribute-name* → *identifier* \
> *attribute-argument-clause* → **`(`** *balanced-tokens*_?_ **`)`** \
> *attributes* → *attribute* *attributes*_?_
>
> *balanced-tokens* → *balanced-token* *balanced-tokens*_?_ \
> *balanced-token* → **`(`** *balanced-tokens*_?_ **`)`** \
> *balanced-token* → **`[`** *balanced-tokens*_?_ **`]`** \
> *balanced-token* → **`{`** *balanced-tokens*_?_ **`}`** \
> *balanced-token* → Any identifier, keyword, literal, or operator \
> *balanced-token* → Any punctuation except  **`(`**,  **`)`**,  **`[`**,  **`]`**,  **`{`**, or  **`}`**

> Beta Software:
>
> This documentation contains preliminary information about an API or technology in development. This information is subject to change, and software implemented according to this documentation should be tested with final operating system software.
>
> Learn more about using [Apple's beta software](https://developer.apple.com/support/beta-software/).

<!--
This source file is part of the Swift.org open source project

Copyright (c) 2014 - 2022 Apple Inc. and the Swift project authors
Licensed under Apache License v2.0 with Runtime Library Exception

See https://swift.org/LICENSE.txt for license information
See https://swift.org/CONTRIBUTORS.txt for the list of Swift project authors
-->
