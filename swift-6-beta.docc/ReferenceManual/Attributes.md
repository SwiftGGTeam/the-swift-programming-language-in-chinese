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

你通过写入 @ 符号后跟特性名称及特性接受的任何参数来指定一个特性：

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

你只能将声明特性应用于声明。

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
  你不能在扩展、类型别名或嵌套在函数内的类型上编写扩展宏，
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
你可以为一个行为类似于属性包装器的宏编写 `prefixed($)`。
<!--
TODO TR: Is there any more detail about this case?
-->

### available

应用此特性以表示声明的生命周期相对于某些 Swift 语言版本
或某些平台和操作系统版本。

`available` 特性总是与两个或更多用逗号分隔的特性参数列表一起出现。
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

你还可以使用星号 (*) 来表示上述所有平台名称的声明可用性。
使用 Swift 版本号指定可用性的 `available` 特性
不能使用星号。

其余参数可以以任何顺序出现，
并指定有关声明生命周期的附加信息，
包括重要的里程碑。

- `unavailable` 参数表示该声明在指定平台上不可用。
  指定 Swift 版本可用性时无法使用此参数。
- `introduced` 参数表示声明引入的指定平台或语言的第一个版本。
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

  你可以将 `available` 特性与 `renamed` 和 `unavailable` 参数
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

你可以在单个声明上应用多个 `available` 特性，
以指定该声明在不同平台和不同版本的 Swift 上的可用性。
如果 `available` 特性指定的平台或语言版本与当前目标不匹配，
则该特性应用的声明将被忽略。
如果你使用多个 `available` 特性，
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

如果一个 `available` 特性仅指定一个 `introduced` 参数以及一个平台或语言名称参数，
你可以使用以下简写语法：

```swift
@available(<#platform name#> <#version number#>, *)
@available(swift <#version number#>)
```

 `available` 特性的简写语法简洁地表达了多个平台的可用性。
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
相反，使用单独的 `available` 特性来指定 Swift 版本的可用性和一个或多个平台的可用性。

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
你使用此特性来标注作为平台一部分发布的符号，
例如与操作系统一起提供的 API。
此特性标记可以通过在访问它们的程序中包含其实现的副本而向后提供的符号。
复制实现也称为 *emitting into the client*。

此特性接受一个 `before:` 参数，
指定提供此符号的平台的第一个版本。
这些平台版本与你为 `available` 特性的平台版本具有相同的含义。
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
> 当调用者的最低部署目标与包含该符号的
> SDK 的第一个版本相同或更高时，
> 编译器可以优化掉运行时检查，
> 直接调用 SDK 的实现。
> 在这种情况下，
> 如果你直接访问回退部署的符号，
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
以在调用返回值的函数或方法而不使用其结果时抑制编译器警告。

### dynamicCallable

将此特性应用于类、结构、枚举或协议，
以将该类型的实例视为可调用函数。
该类型必须实现 `dynamicallyCall(withArguments:)` 方法、
`dynamicallyCall(withKeywordArguments:)` 方法或两者。

你可以像调用函数一样调用动态可调用类型的实例，
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

你可以在动态方法调用中包含实参标签，
如果你实现了 `dynamicallyCall(withKeywordArguments:)` 方法。

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

`dynamicallyCall(withKeywordArguments:)` 方法的声明必须有一个遵循
`ExpressibleByDictionaryLiteral` 协议的单一参数，
返回类型可以是任何类型。
参数的 `Key` 必须遵循 `ExpressibleByStringLiteral`。
前面的例子使用 `KeyValuePairs` 作为参数类型，
以便调用者可以包含重复的参数标签 ---
`a` 和 `b` 在对 `repeat` 的调用中出现多次。

如果你实现了两个 `dynamicallyCall` 方法，
当方法调用包含关键字参数时，
将调用 `dynamicallyCall(withKeywordArguments:)`。
在所有其他情况下，将调用 `dynamicallyCall(withArguments:)`。

你只能使用与你在某个 `dynamicallyCall` 方法实现中
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
如果你实现了两个下标，
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
以限制你对类型所能进行的更改。
此特性仅在以库演进模式编译时允许。
库的未来版本不能通过添加、删除或重新排序枚举的成员或结构体的存储实例属性来更改其声明。
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

冻结类型、冻结结构体的存储属性类型以及冻结枚举的枚举关联值必须是
public 的或标记为 `usableFromInline` 特性。
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

对一个冻结的枚举进行的 switch 语句不需要一个 `default` 枚举成员，
如文档中所讨论的 <doc:Statements#Switching-Over-Future-Enumeration-Cases>。
当在冻结的枚举上进行切换时，包括 `default` 或 `@unknown default` 枚举成员会产生警告，
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

将此特性应用于将自定义 GameplayKit 组件特性暴露给 SpriteKit 编辑器 UI。
应用此特性还意味着 `objc` 特性。

<!--
  See also <rdar://problem/27287369> Document @GKInspectable attribute
  which we will want to link to, once it's written.
-->

### inlinable

将此特性应用于函数、方法、计算属性、下标、
便利构造器或析构器声明，
以将该声明的实现公开为模块的公共接口的一部分。
编译器可以允许在调用位置用符号实现的副本替换对可内联符号的调用。

可内联代码可以与任何模块中声明的
`open` 和 `public` 符号进行交互，
并且可以与同一模块中标记为
`usableFromInline` 特性的 `internal` 符号进行交互。
可内联代码无法与 `private` 或 `fileprivate` 符号进行交互。

此特性不能应用于嵌套在函数内部的声明，
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
你在其上编写此特性的类型必须满足与符合以下假设协议的类型相同的要求：

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

将此特性应用于方法、属性、下标或构造器声明，
以抑制隐式 `objc` 特性。
`nonobjc` 特性告诉编译器此声明在 Objective-C 代码中不可用，
尽管在 Objective-C 中可以表示它。

将此特性应用于扩展的效果与将其应用于该扩展中未明确标记为
`objc` 特性的每个成员相同。

你使用 `nonobjc` 特性来解决标记为
`objc` 特性的类中的桥接方法的循环问题，
并允许在标记为
`objc` 特性的类中
重载方法和构造器。

标记为 `nonobjc` 特性的方法不能被标记为`objc` 特性的方法重写。
然而，标记为 `objc` 特性的方法可以被标记为 `nonobjc` 特性的方法重写。
同样，标记为 `nonobjc` 特性的方法不能满足标记为 `objc` 特性的方法的协议要求。

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

如果你不使用此特性，
请提供一个在顶层调用 `NSApplicationMain(_:_:)` 函数的 `main.swift` 文件，如下所示：

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
此特性会导致属性的 setter 被合成为使用通过
`copyWithZone(_:)` 方法返回的属性值*副本*，
而不是属性值本身。
属性的类型必须符合 NSCopying 协议。

`NSCopying` 特性的行为类似于 Objective-C 的 `copy` 属性特性。

<!--
  TODO: If and when Dave includes a section about this in the Guide,
  provide a link to the relevant section.
-->

### NSManaged

将此特性应用于从 `NSManagedObject` 继承的类的实例方法或存储属性变量，
以表明 Core Data 会在运行时根据关联的实体描述动态提供其实现。
对于标有 `NSManaged` 特性的属性，
Core Data 还会在运行时提供存储。
应用此特性也隐含了 `objc` 特性。

### objc

将此特性应用于任何可以用 Objective-C 表示的声明 ---
例如，非嵌套类、协议、
非泛型枚举（限制为整数原始值类型）、
类的属性和方法（包括 getter 和 setter）、
协议的可选成员、构造化器和下标。
`objc` 特性告诉编译器该声明可以在 Objective-C 代码中使用。

将此特性应用于扩展的效果与将其应用于该扩展中未明确标记为
`nonobjc` 特性的每个成员相同。

编译器隐式地将 `objc` 特性添加到任何在 Objective-C 中定义的类的子类中。
然而，子类不能是泛型的，
也不能继承任何泛型类。
你可以显式地将 `objc` 特性添加到符合这些标准的子类，
以指定其 Objective-C 名称，
如下所述。标记为 `objc` 特性的协议不能继承未标记此特性的协议

`objc` 特性在以下情况下也会被隐式添加：

- 该声明是在子类中的重写，
  超类的声明具有 `objc` 特性。
- 该声明满足具有 `objc` 特性的协议的要求。
- 声明包含 IBAction、IBSegueAction、IBOutlet、
  IBDesignable、IBInspectable、
  NSManaged 或 GKInspectable 特性。

如果你将 `objc` 特性应用于枚举，
每个枚举成员都会在 Objective-C 代码中以枚举名称和枚举成员名称的组合形式暴露出来，
且枚举成员名称的首字母会大写。
例如，在 Swift 中名为 `Planet` 的枚举中的一个名为 `venus` 的枚举成员
在 Objective-C 代码中将会显示为 `PlanetVenus`。

`objc` 特性可选地接受一个单一的特性参数，
该参数由一个标识符组成。
该标识符指定要暴露给 Objective-C 的实体名称，
`objc` 特性适用于该实体。
你可以使用此参数为类、枚举、枚举案例、协议、
方法、getter、setter 构造器命名。
如果你为类、协议或枚举指定 Objective-C 名称，
请在名称前加上三个字母的前缀，
如 [Conventions](https://developer.apple.com/library/content/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/Conventions/Conventions.html#//apple_ref/doc/uid/TP40011210-CH10-SW1)
和 [Programming with Objective-C](https://developer.apple.com/library/content/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/Introduction/Introduction.html#//apple_ref/doc/uid/TP40011210) 中所述。
下面的示例将 `ExampleClass`
的 `enabled` 属性的 getter 暴露给
Objective-C 代码，名称为 `isEnabled`，
而不仅仅是属性本身的名称。

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

更多信息，请参见 [Importing Swift into Objective-C](https://developer.apple.com/documentation/swift/imported_c_and_objective-c_apis/importing_swift_into_objective-c)。

> 注意：objc 特性的参数也可以更改该声明的运行时名称。
> 当调用与 Objective-C 运行时交互的函数时，
> 例如 [`NSClassFromString(_:)`](https://developer.apple.com/documentation/foundation/1395135-nsclassfromstring)，
> 以及在应用的 Info.plist 文件中指定类名时，
> 你会使用运行时名称。
> 如果通过传递参数指定名称，
> 则该名称将用作 Objective-C 代码中的名称和运行时名称。
> 如果省略参数，
> 则在 Objective-C 代码中使用的名称与 Swift 代码中的名称匹配，
> 运行时名称遵循正常的 Swift 编译器名称修饰约定。

### objcMembers

将此特性应用于类声明，
以隐式地将 `objc` 特性
应用于该类、其扩展、其子类及其子类的所有扩展的所有与 Objective-C 兼容的成员。

大多数代码应该使用 `objc` 特性，
以仅暴露所需的声明。
如果需要暴露多个声明，
可以将它们分组在一个具有 `objc` 特性的扩展中。
`objcMembers`特性是一个方便的工具，
适用于大量使用 Objective-C 运行时的自省功能的库。
在不需要时应用 `obj`c 特性
可能会增加你的二进制文件大小并对性能产生不利影响。

<!--
  The binary size comes from the additional thunks
  to translate between calling conventions.
  The performance of linking and launch are slower
  because of the larger symbol table slowing dyld down.
-->

### preconcurrency

将此特性应用于声明，
以抑制严格的并发检查。
你可以将此特性应用于以下类型的声明：

- 导入
- 结构体, 类和 actors
- 枚举和枚举成员
- 协议
- 变量和常量
- 下标
- 构造器
- 函数

在导入声明中，
此特性降低了对使用导入模块类型的代码的并发检查的严格性。
具体而言，
未明确标记为不可发送的导入模块类型可以在需要可发送类型的上下文中使用。

在其他声明中，
此特性降低了对使用被声明符号的代码的并发检查的严格性。
当你在具有最小并发检查的范围内使用此符号时，
该符号指定的与并发相关的约束，
例如 Sendable 要求或全局演员，
将不会被检查。

你可以按如下方式使用此特性，
以帮助将代码迁移到严格的并发检查：

1. 启用严格检查。
1. 对尚未启用严格检查的模块，
   用 `preconcurrency` 特性注释导入。
1. 在将模块迁移到严格检查后，
   移除 `preconcurrency` 特性。
   编译器会警告你关于导入中 `preconcurrency` 特性
   不再有效并应被移除的任何地方。

对于其他声明，
当你在声明中添加与并发相关的约束时，
如果你仍有未迁移到严格检查的客户端，
请添加 `preconcurrency` 特性。
在所有客户端迁移后，
删除 `preconcurrency` 特性。

来自 Objective-C 的声明
在导入时始终被视为带有 `preconcurrency` 特性标记。

### propertyWrapper

将此特性应用于类、结构或枚举声明，
以将该类型用作属性包装。
当你将此特性应用于某个类型时，
你会创建一个与该类型同名的自定义特性。
将该新特性应用于类、结构体的属性或枚举，
以通过包装类型的实例包装对该属性的访问；
将特性应用于局部存储变量声明，
以以相同方式包装对变量的访问。
计算变量、全局变量和常量不能使用属性包装。

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

包装必须定义一个 `wrappedValue` 实例属性。
该属性的 包装值 是 getter 和 setter 所暴露的值。
在大多数情况下，*wrappedValue* 是一个计算值，
但它也可以是一个存储值。
包装定义并管理其包装值所需的任何底层存储。
编译器通过在包装属性的名称前加下划线 (`_`)
来合成包装器类型实例的存储 ---
例如，`someProperty` 的包装器存储为 `_someProperty`。
包装器的合成存储具有 `private` 的访问控制级别。

一个具有属性包装的属性
可以包含 willSet 和 didSet 块，
但它不能覆盖编译器合成的 get 或 set 块。

Swift 提供了两种语法糖形式用于初始化属性包装。
你可以在包装值的定义中使用赋值语法，
将赋值右侧的表达式作为参数传递给属性包装构造器的 wrappedValue 参数。
你还可以在将特性应用于属性时提供参数，
这些参数会传递给属性包装的构造器。
例如，在下面的代码中，SomeStruct 调用 SomeWrapper 定义的每个初始化器。

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

对于一个包装属性，
*被呈现值*是一个可以让属性包装用来暴露额外功能的第二个值。
属性包装类型的作者负责确定其被呈现值的含义，
并定义被呈现值所暴露的接口。
要从属性包装中投影一个值，
请在包装器类型上定义一个 `projectedValue` 实例属性。
编译器通过在包装属性的名称前
加上美元符号（`$`）来合成被呈现值的标识符 ---
例如，`someProperty`的被呈现值是`$someProperty`。
被呈现值具有与原始包装属性相同的访问控制级别。

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

将此特性应用于类、结构体或枚举，
以将该类型用作结果构造器。
*结果构造器*是一种逐步构建嵌套数据结构的类型。
你可以使用结果构造器来实现一种用于以自然、声明式方式
创建嵌套数据结构的领域特定语言（DSL）。
有关如何使用 resultBuilder 属性的示例，
见 <doc:AdvancedOperators#Result-Builders>。

#### 结果构建方法

结果构造器实现了以下描述的静态方法。
由于结果构造器的所有功能都是通过静态方法暴露的，
因此你永远不需要初始化该类型的实例。
结果构造器必须实现 `buildBlock(_:)` 方法，
或者同时实现 `buildPartialBlock(first:)`
和 `buildPartialBlock(accumulated:next:)` 方法。
其他方法（这些方法在 DSL 中启用额外功能）是可选的。
结果构造器类型的声明实际上不必包含任何协议一致性。

静态方法的描述中使用了三种类型作为占位符。
`Expression` 是构建器输入类型的占位符，
`Component` 是部分结果类型的占位符，
而 `FinalResult` 是构建器生成的结果类型的占位符。
你需要用结果构造器实际使用的类型替换这些占位符。
如果你的结果构建方法没有为 `Expression`
或 `FinalResult` 指定类型，
那么它们默认与 `Component` 类型相同。

块的构建的方法如下：

- `static func buildBlock(_ components: Component...) -> Component`:
  将一组部分结果组合成一个单一的部分结果。

- `static func buildPartialBlock(first: Component) -> Component`:
  从第一个组件构建一个部分结果组件。
  实现此方法和 `buildPartialBlock(accumulated:next:)`
  以支持一次构建一个组件的块。
  与 `buildBlock(_:)` 相比，
  这种方法减少了处理不同数量参数的泛型重载的需求。

- `static func buildPartialBlock(accumulated: Component, next: Component) -> Component`:
  通过将一个累积的组件与一个新组件结合，
  构建一个部分结果组件。
  实现此方法和 `buildPartialBlock(first:)` 以支持一次构建一个组件的块。
  与 `buildBlock(_:)` 相比，
  这种方法减少了处理不同数量参数的泛型重载的需求。

结果构造器可以实现上述列出的所有三种块构建方法；
在这种情况下，可用性决定调用哪个方法。
默认情况下，Swift 调用 `buildPartialBlock(first:)`
和 `buildPartialBlock(accumulated:next:)` 方法。
要使 Swift 调用 `buildBlock(_:)`，
请将封闭声明标记为在你为 `buildPartialBlock(first:)`
和 `buildPartialBlock(accumulated:next:)` 上编写的可用性之前可用。

附加的结果构建方法如下：

`static func buildOptional(_ component: Component?) -> Component`:
  从可以为 nil 的部分结果构建一个部分结果。
  实现此方法以支持不包含 `else` 子句的 `if` 语句。

- `static func buildEither(first: Component) -> Component`:
  构建一个部分结果，
  其值根据某些条件而变化。
  实现此方法和 `buildEither(second:)`
  以支持 `switch` 语句和包含 `else` 子句的 `if` 语句。

- `static func buildEither(second: Component) -> Component`:
  构建一个部分结果，
  其值根据某些条件而变化。
  实现此方法和 `buildEither(first:)`
  以支持 `switch` 语句和包含 `else` 子句的 `if` 语句。

- `static func buildArray(_ components: [Component]) -> Component`:
  从部分结果的数组构建部分结果。
  实现此方法以支持 `for` 循环。

- `static func buildExpression(_ expression: Expression) -> Component`:
  从表达式构建部分结果。
  你可以实现此方法以执行预处理——例如，
  将表达式转换为内部类型——或在使用站提供额外的信息以进行类型推断。

- `static func buildFinalResult(_ component: Component) -> FinalResult`:
  从部分结果构建最终结果。
  你可以将此方法实现为使用不同类型的部分和最终结果的结果构造器的一部分，
  或者在返回结果之前对结果进行其他后处理。

- `static func buildLimitedAvailability(_ component: Component) -> Component`:
  构建一个擦除类型信息的部分结果。
  你可以实现此方法，
  以防止类型信息在执行可用性检查的编译器控制语句之外传播。

例如，下面的代码定义了一个简单的结果构造器，
用于构建一个整数数组。
此代码将 `Component` 和 `Expression` 定义为类型别名，
以便更容易将下面的示例与上面的函数列表进行匹配。

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

#### 结果转换

以下语法转换会递归地应用，
将使用结果构造器语法的代码转换为调用结果构造器类型的静态方法的代码：

- 如果结果构造器有一个 `buildExpression(_:)` 方法，
  则每个表达式都变成对该方法的调用。
  这个转换总是首先进行。
  例如，以下声明是等价的：

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
- 赋值语句的转换方式类似于表达式，
  但被理解为计算为 `()`。
  你可以定义一个重载的 `buildExpression(_:)`，
  该重载接受类型为 `()` 的参数，以专门处理赋值。
- 当分支语句检查可用性条件时，
  如果实现了 `buildLimitedAvailability(_:)` 方法，
  该分支语句将被转换为对 `buildLimitedAvailability(_:)` 方法的调用。
  如果未实现 `buildLimitedAvailability(_:)` 方法，
  那么检查可用性的分支语句将使用与其他分支语句相同的转换。
  这种转换发生在转换为调用
  `buildEither(first:)`、`buildEither(second:)` 或 `buildOptional(_:)`
  方法之前。

  你使用 `buildLimitedAvailability(_:)` 方法来擦除根据所采取的分支而变化的类型信息。
  例如，下面的 `buildEither(first:)` 和 `buildEither(second:)` 方法
  使用一个泛型类型，该类型捕获有关两个分支的类型信息。

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

  然而，这种方法在具有可用性检查的代码中会导致问题：

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

  在上面的代码中，
  `FutureText` 作为 `brokenDrawing` 的一种类型出现，
  因为它是 `DrawEither` 泛型类型中的一种。
  如果在运行时 `FutureText` 不可用，
  即使在该类型显式未被使用的情况下，
  这可能会导致你的程序崩溃。

  为了解决这个问题，
  实现一个 `buildLimitedAvailability(_:)` 方法，
  通过返回一个始终可用的类型来擦除类型信息。
  例如，
  下面的代码通过可用性检查构建一个 `AnyDrawable` 值。

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

- 一个分支语句变成了一系列对 `buildEither(first:)`
  和 `buildEither(second:)` 方法的嵌套调用。
  语句的条件和分支情况被映射到二叉树的叶子节点上，
  语句变成了一个嵌套调用buildEither方法，
  沿着从根节点到该叶子节点的路径。

  例如，如果你编写一个包含三个分支的 switch 语句，
  编译器将使用一个具有三个叶节点的二叉树。
  同样，由于从根节点到第二个案例的路径是第二个子节点”，
  然后是“第一个子节点”，
  该分支变成了一个嵌套调用，
  如 `buildEither(first: buildEither(second: ... ))`。
  以下声明是等效的：

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
- 一个可能不产生值的分支语句，
  比如没有 `else` 子句的 `if` 语句，
  变成了对 `buildOptional(_:)` 的调用。
  如果 `if` 语句的条件满足，
  它的代码块会被转换并作为参数传递；
  否则，`buildOptional(_:)` 会以 `nil` 作为参数被调用。
  例如，以下声明是等价的：

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
- 如果结果构造器实现了 `buildPartialBlock(first:)`
  和 `buildPartialBlock(accumulated:next:)` 方法，
  则代码块或 `do` 语句将变成对这些方法的调用。
  块内的第一条语句被转换为 `buildPartialBlock(first:)` 方法的一个参数，
  其余语句则变成对 `buildPartialBlock(accumulated:next:)` 方法的嵌套调用。
  例如，以下声明是等效的：

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
- 否则，代码块或 `do` 语句会变成对 `buildBlock(_:)` 方法的调用。
  块内的每个语句都会逐个转换，
  并成为 `buildBlock(_:)` 方法的参数。
  例如，以下声明是等价的。

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
- 一个 `for` 循环变成一个临时变量，
  一个 `for` 循环，
  以及对 `buildArray(_:)` 方法的调用。
  新的 `for` 循环遍历序列，
  并将每个部分结果附加到该数组中。
  临时数组作为参数传递给 `buildArray(_:)` 调用。
  例如，以下声明是等价的：

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
- 如果结果构造器有一个 `buildFinalResult(_:)` 方法，
  则最终结果变为对该方法的调用。
  此转换始终是最后进行的。

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

尽管转换行为是通过临时变量来描述的，
但使用结果构造器实际上并不会创建任何在代码其他部分可见的新声明。

你不能在结果构造器转换的代码中使用 `break`、`continue`、`defer`、`guard`
或 `return` 语句、`while` 语句或 `do-catch` 语句。

转换过程不会改变代码中的声明，
这使得你可以使用临时常量和变量逐步构建表达式。
它也不会改变throw语句、
编译时诊断语句或包含return语句的闭包。

每当可能时，变换会被合并。
例如，表达式 `4 + 5 * 6`
变为 `buildExpression(4 + 5 * 6)`，
而不是多次调用该函数。
同样，嵌套的分支语句变为对 buildEither 方法的单一二叉树调用。

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

#### 自定义结果构造器特性

创建结果构造器类型会创建一个同名的自定义特性。你可以在以下位置应用该特性：

- 在函数声明中，
  结果构造器构建函数的主体。
- 在包含 getter 的变量或下标声明中，
  结果构造器构建 getter 的主体
- 在函数声明中的一个参数上，
  结果构造器构建一个作为相应参数传递的闭包的主体。

应用结果构造器特性不会影响 ABI 兼容性。
将结果构造器特性应用于参数使该特性成为函数接口的一部分，
这可能会影响源兼容性。

### requires_stored_property_inits

将此特性应用于类声明，
以要求类中的所有存储特性在其定义中提供默认值。
对于任何继承自 NSManagedObject 的类，
都会推断出此特性。

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

将此特性应用于导入声明时，
可以通过修改访问控制来简化对模块代码的测试。
导入的模块中标记为 `internal` 访问级别的实体
将被导入并视为 `public` 访问级别声明的实体。
标记为 `internal` 或 `public` 访问级别的类和类成员
将被导入并视为 `open` 访问级别声明的实体。
导入的模块必须在启用了测试的情况下编译。

### UIApplicationMain

> 已弃用：此特性已弃用；
> 请改用 <doc:Attributes#main> 特性。
> 在 Swift 6 中，使用此特性将会导致错误。

将此特性应用于一个类，
以指示它是应用程序委托。
使用此特性相当于调用 `UIApplicationMain` 函数，
并将此类的名称作为委托类的名称传递。

如果你不使用此特性，
请提供一个包含顶层代码的 `main.swift` 文件，
该代码调用 `UIApplicationMain(_:_:_:_:)` 函数。
例如，如果你的应用使用自定义的 `UIApplication` 子类作为其主类，
请调用 `UIApplicationMain(_:_:_:_:)` 函数，
而不是使用此特性。

编译为可执行文件的 Swift 代码最多只能包含一个顶级入口点，
正如文档中所讨论的 <doc:Declarations#Top-Level-Code>。

### unchecked

将此属性应用于协议类型，
作为类型声明中采用的协议列表的一部分，
以关闭对该协议要求的强制执行

唯一支持的协议是 [`Sendable`](https://developer.apple.com/documentation/swift/sendable)。

### usableFromInline

将此属性应用于函数、方法、计算属性、下标、构造器或析构器声明，
以允许该符号在与声明位于同一模块中定义的内联代码中使用。
声明必须具有 `internal` 访问级别修饰符。
标记为 `usableFromInline` 的结构或类只能对其属性使用公共类型或 `usableFromInline` 类型。
标记为 `usableFromInline` 的枚举只能对其枚举成员的原始值和关联值使用公共类型或 `usableFromInline` 类型。

像 `public` 访问级别修饰符一样，
这个属性将声明暴露为模块公共接口的一部分。
与 `public` 不同，
编译器不允许在模块外的代码中按名称引用标记为 `usableFromInline` 的声明，
即使声明的符号已被导出。
然而，模块外的代码仍然可以通过使用运行时行为与声明的符号进行交互。

标记为 `inlinable` 特性的声明
可以隐式地从可内联代码中使用。
虽然 `inlinable` 或 `usableFromInline`
都可以应用于 `internal` 声明，
但同时应用这两个特性是错误的。

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

将此特性应用于顶级函数、实例方法、类方法或静态方法，
以在使用该函数或方法时触发警告，
前提是没有前置限定符，
例如模块名称、类型名称或实例变量或常量。
使用此特性可以帮助减少在同一作用域中可访问的同名函数之间的歧义。

例如，Swift 标准库包括一个顶级函数
[`min(_:_:)`](https://developer.apple.com/documentation/swift/1538339-min/)
和一个用于具有可比较元素的序列的
[`min()`](https://developer.apple.com/documentation/swift/sequence/1641174-min) 方法。
序列方法使用 `warn_unqualified_access` 特性声明，
以帮助减少在 `Sequence` 扩展中尝试使用其中一个或另一个时的混淆。

### Interface Builder 使用的声明特性

Interface Builder 特性是用于 Interface Builder 的声明特性，
用于与 Xcode 同步。
Swift 提供了以下 Interface Builder 特性：
`IBAction`、`IBSegueAction`、`IBOutlet`、
`IBDesignable`和 `IBInspectable`。
这些特性在概念上与其 Objective-C 对应项相同。

<!--
  TODO: Need to link to the relevant discussion of these attributes in Objc.
-->

你将 `IBOutlet` 和 `IBInspectable` 特性应用于类的属性声明。
你将 `IBAction` 和 `IBSegueAction` 特性应用于类的方法声明，
并将 `IBDesignable` 特性应用于类声明。

应用 `IBAction`, `IBSegueAction`, `IBOutlet`,
`IBDesignable`, 或 `IBInspectable` 特性也意味着 `objc` 特性。

## 类型特性

你只能将类型特性应用于类型。

### autoclosure

将此特性应用于延迟表达式的求值，
通过自动将该表达式包装在一个没有参数的闭包中。
你将其应用于函数或方法声明中的参数类型，
适用于类型为不带参数且返回表达式类型值的函数类型的参数。
有关如何使用 `autoclosure` 特性的示例，
请参见文档：<doc:Closures#Autoclosures> 和文档：<doc:Types#Function-Type>。

### convention

将此特性应用于函数的类型，以指示其调用约定。

`convention` 特性总是与以下参数之一一起出现：

- `swift` 参数表示一个 Swift 函数引用。这是 Swift 中函数值的标准调用约定。
- `block` 参数表示一个与 Objective-C 兼容的块引用。
  函数值表示为对块对象的引用，
  该对象是一个 `id` 类型兼容的 Objective-C 对象，
  嵌入了其调用函数。
  调用函数使用 C 调用约定。
- `c` 参数表示一个 C 函数引用。函数值不携带上下文，并使用 C 调用约定。

<!--
  Note: @convention(thin) is private, even though it doesn't have an underscore
  https://forums.swift.org/t/12087/6
-->

除了少数例外，
任何调用约定的函数都
可以在需要其他调用约定的函数时使用。
一个非泛型的全局函数、
一个不捕获任何局部变量的局部函数，
或者一个不捕获任何局部变量的闭包
可以转换为 C 调用约定。
其他 Swift 函数无法转换为 C 调用约定。
具有 Objective-C 块调用约定的函数
无法转换为 C 调用约定。

### escaping

将此特性应用于函数或方法声明中的参数类型，
以指示参数的值可以存储以供后续执行。
这意味着该值可以超出这次调用的生命周期。
具有 `escaping` 类型特性的函数类型参数
需要对特性或方法显式使用 `self.`。
有关如何使用 `escaping` 特性的示例，
见 <doc:Closures#Escaping-Closures>。

### Sendable

将此特性应用于函数的类型，
以指示该函数或闭包是可发送的。
将此特性应用于函数类型的含义与将非函数类型符合 [`Sendable`](https://developer.apple.com/documentation/swift/sendable) 协议相同。

如果函数或闭包在期望 sendable 值的上下文中使用，
并且函数或闭包满足 sendable 的要求，
那么该特性会被推断到这些函数和闭包上。

可发送函数类型是相应的不可发送函数类型的子类型。

## Switch Case 特性

你只能将 switch case 特性应用于 switch case。

### unknown

将此特性应用于 switch case，
以指示在代码编译时不期望与任何已知的枚举 case 匹配。
有关如何使用 `unknown` 特性的示例，
见 <doc:Statements#Switching-Over-Future-Enumeration-Cases>。

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
