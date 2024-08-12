# 宏

在编译时使用宏来生成代码。

宏会在编译你的源代码时对其进行转换，从而让你避免手动编写重复的代码。在编译过程中，Swift 会先展开代码中的所有宏，然后再像往常一样构建代码。

![一个显示宏展开概貌的图表。左侧是 Swift 代码的风格化表示。右侧是由宏添加了几行的相同的代码。](macro-expansion)

宏展开始终是一种加法操作：宏会添加新代码，但绝不会删除或修改现有代码。

每个宏的输入和宏展开的输出都会被检查，以确保它们是语法上有效的 Swift 代码。同样，你传给宏的值以及宏生成的代码中的值也会被检查，以确保它们具有正确的类型。此外，如果宏的实现在展开宏时遇到错误，编译器会将其视为编译错误。这些保证让使用了宏的代码更容易被推导，也更容易发现诸如宏使用不当或宏实现中的错误这样的问题。

Swift 有两种宏:

- *独立宏*可单独出现，无需被附加到任何声明中。

- *附加宏*会修改它被附加到的声明。

附加宏和独立宏的调用方式略有不同，但它们都遵循相同的宏展开模型，并都使用相同的方法来实现。下面的章节将更详细地描述这两种宏。

## 独立宏

要调用独立宏，需要在其名称前写入数字符号 (`#`)，并在名称后的括号中写入宏的参数。例如：

```swift
func myFunction() {
    print("Currently running \(#function)")
    #warning("Something's wrong")
}
```

在函数内的第一行中，`#function` 调用了 Swift 标准库中的 [`function()`][] 宏。当你编译此代码时，Swift 会调用该宏的实现，将 `#function` 替换为当前函数的名称。当你运行这段代码并调用 `myFunction()` 时，它会打印 “Currently running myFunction()”。在第二行中，`#warning` 调用了 Swift 标准库中的 [`warning(_:)`][] 宏，来生成一个自定义的编译时警告。

[`function()`]: https://developer.apple.com/documentation/swift/function()
[`warning(_:)`]: https://developer.apple.com/documentation/swift/warning(_:)

独立宏可以像 `#function` 所做的那样产出一个值，也可以像 `#warning` 所做的那样在编译时执行一个操作。
<!-- SE-0397: 或者他们也可以生成新的声明。  -->

## 附加宏

要调用附加宏，需要在其名称前写入 at 符号 (`@`) ，并在名称后的括号中写入宏的参数。

附加宏会修改它们所附加到的声明。它们为被附加到的声明添加代码，比如定义一个新的方法或者增加对某个协议的遵循。

例如，请看下面这段不使用宏的代码：

```swift
struct SundaeToppings: OptionSet {
    let rawValue: Int
    static let nuts = SundaeToppings(rawValue: 1 << 0)
    static let cherry = SundaeToppings(rawValue: 1 << 1)
    static let fudge = SundaeToppings(rawValue: 1 << 2)
}
```

在这段代码中，`SundaeToppings` 选项集中的每个选项都包括对初始化器的调用，这是重复的手动操作。这样的实现方式在添加新选项时容易出错，比如在行尾键入错误的数字。

下面是该代码使用宏后的替代版本：

```swift
@OptionSet<Int>
struct SundaeToppings {
    private enum Options: Int {
        case nuts
        case cherry
        case fudge
    }
}
```

此版本的 `SundaeToppings` 调用了 `@OptionSet` 宏。这个宏会读取私有枚举类中的 `case` 列表，生成每个选项的常量列表，并增加对 [`OptionSet`][] 协议的遵循。

[`OptionSet`]: https://developer.apple.com/documentation/swift/optionset

<!--
当 @OptionSet 宏回归后，把这俩链接改回来：

[`@OptionSet`]: https://developer.apple.com/documentation/swift/optionset-swift.macro
[`OptionSet`]: https://developer.apple.com/documentation/swift/optionset-swift.protocol
-->


作为对比，下面是 `@OptionSet` 宏展开后的版本的样子。这段代码不是由你自己编写的，只有当你特别要求 Swift 展示宏的展开时，你才会看到它。

```swift
struct SundaeToppings {
    private enum Options: Int {
        case nuts
        case cherry
        case fudge
    }

    typealias RawValue = Int
    var rawValue: RawValue
    init() { self.rawValue = 0 }
    init(rawValue: RawValue) { self.rawValue = rawValue }
    static let nuts: Self = Self(rawValue: 1 << Options.nuts.rawValue)
    static let cherry: Self = Self(rawValue: 1 << Options.cherry.rawValue)
    static let fudge: Self = Self(rawValue: 1 << Options.fudge.rawValue)
}
extension SundaeToppings: OptionSet { }
```

私有枚举类之后的所有代码都来自于 `@OptionSet` 宏。使用宏生成所有静态变量的 `SundaeToppings` 版本比前面手动编码的版本更易于阅读和维护。

## 宏的声明

在大多数 Swift 代码中，当你实现某个符号（如函数或类型）时，不需要单独额外的声明。但是，宏的声明和实现是分开的。宏的声明包含其名称、所需的参数、可以被使用的位置以及它可以生成怎样的代码。宏的实现则包含通过生成 Swift 代码来展开这个宏所需的代码。

你可以使用 `macro` 关键字引入一个宏的声明。例如，下面是前面例子中使用到的 `@OptionSet` 宏的声明的一部分：

```swift
public macro OptionSet<RawType>() =
        #externalMacro(module: "SwiftMacros", type: "OptionSetMacro")
```

第一行指定了宏的名称和它的参数 —— 名称是 `OptionSet`，并且不带任何参数。第二行使用 Swift 标准库中的 [`externalMacro(module:type:)`][] 宏来告诉 Swift 这个宏的实现在哪里。在这个例子中，`SwiftMacros` 模块包含一个名为 `OptionSetMacro` 并实现了 `@OptionSet` 宏的类型。

[`externalMacro(module:type:)`]: https://developer.apple.com/documentation/swift/externalmacro(module:type:)

因为 `OptionSet` 是一个附加宏，它的名称使用大驼峰式命名法，就像结构体和类的名称那样。独立宏的名称使用小驼峰式命名法，就像变量和函数的名称那样。

> 注意:
> 宏的可访问性总是被声明为 `public` 的。
> 由于声明宏的代码与使用宏的代码位于不同的模块中，因此没有任何地方可以应用一个非公共可访问的宏。

宏的声明定义了宏的*角色* —— 包括宏在源代码中可以被调用的位置以及宏可以生成的代码种类。每个宏都有一个或多个角色，作为属性的一部分写在宏声明的开头。下面是 `@OptionSet` 的更完整的声明，包括了指定它的角色的属性：

```swift
@attached(member)
@attached(extension, conformances: OptionSet)
public macro OptionSet<RawType>() =
        #externalMacro(module: "SwiftMacros", type: "OptionSetMacro")
```

`@attached` 属性在此声明中出现了两次，每个宏角色各用了一次。第一次使用时，`@attached(member)` 表示这个宏会向被作用到的类型添加新的成员。按 `OptionSet` 协议以及一些附加成员的要求，`@OptionSet` 宏添加了一个 `init(rawValue:)` 初始化器。第二次使用时，`@attached(extension, conformances: OptionSet)` 声明了 `@OptionSet` 会添加对 `OptionSet` 协议的遵循。`@OptionSet` 宏会扩展被作用到的类型，使其遵循 `OptionSet` 协议。

对于独立宏，你可以编写 `@freestanding` 属性来指定其角色：

```
@freestanding(expression)
public macro line<T: ExpressibleByIntegerLiteral>() -> T =
        /* ... 宏实现的位置 ... */
```

<!--
Elided the implementation of #line above
because it's a compiler built-in:

public macro line<T: ExpressibleByIntegerLiteral>() -> T = Builtin.LineMacro
-->

上面的 `#line` 宏具有 `expression`（表达式）的角色。表达式宏可以产生一个值，或者执行一个编译时操作，比如生成一个警告。

除了宏的角色外，宏的声明还提供了有关这个宏所生成的符号名称的信息。当宏的声明提供了一个名称列表时，它保证只生成使用这些名称的声明，这有助于理解和调试生成的代码。下面是 `@OptionSet` 的完整声明：

```swift
@attached(member, names: named(RawValue), named(rawValue),
        named(`init`), arbitrary)
@attached(extension, conformances: OptionSet)
public macro OptionSet<RawType>() =
        #externalMacro(module: "SwiftMacros", type: "OptionSetMacro")
```

在上面的声明中，`@attached(member)` 宏在 `names:` 标签后为 `@OptionSet` 宏所生成的每个符号添加了参数。这个宏声明了名为 `RawValue`, `rawValue` 和 `init` 的符号 —— 因为这些名称是预先知道的，宏的声明明确列出了它们。

这个宏声明还在名称列表后添加了 `arbitrary`，这将允许宏生成一些在使用该宏之前未知名称的声明。例如，当 `@OptionSet` 宏被应用于上述的 `SundaeToppings` 结构体时，它将生成与枚举类成员 `nuts`, `cherry` 和 `fudge` 相对应的类型属性。

要了解更多信息，包括宏角色的完整列表，请参阅 <doc:Attributes> 中的 <doc:Attributes#attached> 和 <doc:Attributes#freestanding>。

## 宏的展开

在构建使用了宏的 Swift 代码时，编译器会调用宏的实现来展开它们。

![显示宏展开的四个步骤的图表。输入是 Swift 源代码。源代码变成了一棵树，代表代码的结构。宏的实现向这棵树添加了新的分支。结果是带有添加过代码的 Swift 源代码。](macro-expansion-full)

具体来说，Swift 会以以下方式展开宏：

1. 编译器读取代码，创建语法的内存表示。

2. 编译器将部分内存表示发送给宏的实现，宏将在此基础上展开。

3. 编译器将宏的调用替换为它的展开形式。

4. 编译器使用展开后的源代码继续进行编译。

为了阐述具体的步骤，用以下代码来举例：

```
let magicNumber = #fourCharacterCode("ABCD")
```

`#fourCharacterCode` 宏接受一个长度为四个字符的字符串作为输入，并返回一个无符号的 32 位整数，该整数对应于组成字符串的字符的 ASCII 码值的组合。一些文件格式使用这样的整数来标识数据，因为它们紧凑且在调试器中仍然可读。下面的 <doc:宏#实现一个宏> 的部分展示了如何实现这个宏。

为了展开上述代码中的宏，编译器读取 Swift 文件并创建该代码的内存表示，也就是*抽象语法树*（AST）。AST 使得代码的结构变得清晰，也使得编写与该结构进行交互的代码变得更容易 —— 例如编写编译器或宏的实现，都需要与 AST 进行交互。以下是上述代码的 AST 表示，略微简化，省略了一些额外的细节：

![一个树状图，以常量作为根结点。该常量有一个名为 magicNumber 的名称和一个值。该常量的值是一个宏调用。这个宏调用有一个名为 fourCharacterCode 的名称和它的参数。参数是一个值为 ABCD 的字符串字面量。](macro-ast-original)

上面的图展示了该代码的结构是如何在内存中表示的。AST 中的每个结点对应源代码的一部分。AST 的 “Constant declaration（常量声明）”结点下有两个子结点，分别表示常量声明的两个部分：它的名称和它的值。“Macro call（宏调用）”结点则有表示宏的名称和传递给宏的参数列表的子结点。

作为构建这个 AST 的一部分，编译器会检查源代码是否是有效的 Swift 代码。例如，`#fourCharacterCode` 只接受一个参数，且该参数必须是一个字符串。如果你尝试传递一个整数参数，或者在字符串字面量的末尾忘记了引号 (`"`)，你会在这个过程中的这个点上获得一个错误。

编译器会找到代码中调用宏的地方，并加载实现这些宏的外部二进制文件。对于每个宏调用，编译器将抽象语法树（AST）的一部分传递给该宏的实现。以下是这个部分 AST 的表示：

![一个树状图，以一个宏调用（Macro call）作为根结点。这个宏调用有一个名为 fourCharacterCode 的名称和参数。这个参数是一个值为 ABCD 的字符串字面量。](macro-ast-input)

`#fourCharacterCode` 宏的实现会在展开这个宏时读取这个部分 AST 作为输入。宏的实现仅对其接收到的部分 AST 进行操作，这意味着无论这个宏的前后代码是什么，它的展开方式始终不变。这一限制有助于使宏展开更易于理解，并帮助你的代码能更快得到构建，因为 Swift 可以不必展开那些未变更过的宏。
<!-- TODO TR: Confirm -->
Swift 能通过限制实现宏的代码，帮助宏的作者避免意外读取其他输入：

- 传递给宏实现的抽象语法树（AST）仅包含表示该宏的 AST 结点，而不包括其前后的任何代码。

- 宏的实现运行在一个沙箱环境中，这可以防止其访问文件系统或网络。

除了这些保护措施，宏的作者有责任不读取或修改宏输入以外的任何内容。例如，宏的展开不得依赖于当前的时间。

`#fourCharacterCode` 的实现会生成了一个包含展开后代码的新 AST。以下是上述代码会返回给编译器的内容：

![一个具有 UInt32 类型的整型字面量 1145258561 的树形图。](macro-ast-output)

当编译器接收到这个展开结果时，它用包含了这个宏展开结果的 AST 结点替换掉包含了宏调用的 AST 结点。在宏展开后，编译器会再次检查以确保程序仍然是语法上有效的 Swift 代码，并且所有的类型都是正确的。这会生成一个可以像往常一样编译的最终 AST：

![一个树状图，以常量作为根结点。该常量有一个名为 magicNumber 的名称和一个值。该常量的值是 UInt32 类型的整型字面量 1145258561。](macro-ast-result)

这个 AST 对应于如下的 Swift 代码：

```
let magicNumber = 1145258561 as UInt32
```

在这个例子中，作为输入的源代码只有一个宏，但一个真实的程序可能有某个相同宏的多个实例以及对不同宏的多个调用。编译器会一次展开一个宏。

如果一个宏出现在另一个宏的内部，则先展开外部宏 —— 这使得外部宏可以在自己被展开之前修改它的内部宏。

<!-- OUTLINE

- TR: Is there any limit to nesting?
  TR: Is it valid to nest like this -- if so, anything to note about it?

  ```
  let something = #someMacro {
      struct A { }
      @someMacro struct B { }
  }
  ```

- Macro recursion is limited.
  One macro can call another,
  but a given macro can't directly or indirectly call itself.
  The result of macro expansion can include other macros,
  but it can't include a macro that uses this macro in its expansion
  or declare a new macro.
  (TR: Likely need to iterate on details here)
-->

## 实现一个宏

要实现一个宏，你需要两个组件：一个是执行这个宏展开的类型，另一个是用来声明这个宏并将其暴露为 API 的库。这些部分与使用这个宏的代码分开构建，即使这个宏和它的使用端是一起开发的也是如此，因为这个宏的实现是作为构建这个宏的使用端的一部分而运行的。

要使用 Swift 包管理器来创建新的宏，请运行 `swift package init --type macro` —— 这会创建几个文件，包括一个宏的实现和声明的模板。

要在现有项目中添加宏，请按如下方式编辑 `Package.swift` 文件的开头：

- 在 `swift-tools-version` 注释中设置 Swift 工具版本为 5.9 或更高版本。
- 导入 `CompilerPluginSupport` 模块。
- 在 `platforms` 列表中将 macOS 10.15 作为最低部署目标。

下面的代码展示了作为示例的 `Package.swift` 文件的开头。

```swift
// swift-tools-version: 5.9

import PackageDescription
import CompilerPluginSupport

let package = Package(
    name: "MyPackage",
    platforms: [ .iOS(.v17), .macOS(.v13)],
    // ...
)
```

接下来，在现有的 `Package.swift` 文件中为宏的实现和宏的声明所在的库分别添加一个构建目标。例如，你可以添加类似于下面这样的内容，注意更改名称以匹配你的项目：

```swift
targets: [
    // 执行源代码转换的宏的实现。
    .macro(
        name: "MyProjectMacros",
        dependencies: [
            .product(name: "SwiftSyntaxMacros", package: "swift-syntax"),
            .product(name: "SwiftCompilerPlugin", package: "swift-syntax")
        ]
    ),

    // 暴露宏作为它的 API 的一部分的库。
    .target(name: "MyProject", dependencies: ["MyProjectMacros"]),
]
```

上面的代码定义了两个构建目标：`MyProjectMacros` 包含宏的实现，而 `MyProject` 则让这些宏变得可被使用。

宏的实现使用 [SwiftSyntax][] 模块，通过 AST 以结构化的方式与 Swift 代码进行交互。如果你使用 Swift 包管理器创建了一个新的宏包，生成的 `Package.swift` 文件将自动包含对 SwiftSyntax 的依赖关系。如果你要在现有项目中添加宏，请自行在 `Package.swift` 文件中添加对 SwiftSyntax 的依赖：

[SwiftSyntax]: http://github.com/apple/swift-syntax/

```swift
dependencies: [
    .package(url: "https://github.com/apple/swift-syntax", from: "509.0.0")
],
```

根据宏的角色，宏的实现需要遵守 SwiftSyntax 中的相应协议。例如，对于上一节中的 `#fourCharacterCode`，下面是一个实现该宏的结构：

```swift
import SwiftSyntax
import SwiftSyntaxMacros

public struct FourCharacterCode: ExpressionMacro {
    public static func expansion(
        of node: some FreestandingMacroExpansionSyntax,
        in context: some MacroExpansionContext
    ) throws -> ExprSyntax {
        guard let argument = node.argumentList.first?.expression,
              let segments = argument.as(StringLiteralExprSyntax.self)?.segments,
              segments.count == 1,
              case .stringSegment(let literalSegment)? = segments.first
        else {
            throw CustomError.message("Need a static string")
        }

        let string = literalSegment.content.text
        guard let result = fourCharacterCode(for: string) else {
            throw CustomError.message("Invalid four-character code")
        }

        return "\(raw: result) as UInt32"
    }
}

private func fourCharacterCode(for characters: String) -> UInt32? {
    guard characters.count == 4 else { return nil }

    var result: UInt32 = 0
    for character in characters {
        result = result << 8
        guard let asciiValue = character.asciiValue else { return nil }
        result += UInt32(asciiValue)
    }
    return result
}
enum CustomError: Error { case message(String) }
```

如果要将此宏添加到现有的使用 Swift 包管理的项目中，请添加一个类型作为宏的构建目标的入口点，并列出构建目标定义的宏：

```swift
import SwiftCompilerPlugin

@main
struct MyProjectMacros: CompilerPlugin {
    var providingMacros: [Macro.Type] = [FourCharacterCode.self]
}
```

`#fourCharacterCode` 宏是一个产出一个表达式的独立宏，因此，实现它的 `FourCharacterCode` 类型需遵循 `ExpressionMacro` 协议。`ExpressionMacro` 协议有一个要求，即有一个 `expansion(of:in:)` 方法来展开 AST。有关宏的角色列表及其相应的 SwiftSyntax 协议，请参阅 <doc:Attributes> 中的 <doc:Attributes#attached> 和 <doc:Attributes#freestanding>。

要展开 `#fourCharacterCode` 宏，Swift 会将使用了此宏的代码的 AST 发送给包含该宏的实现的库。在这个库的内部，Swift 会调用 `FourCharacterCode.expansion(of:in:)` 方法，并将 AST 和上下文作为参数传递给该方法。`expansion(of:in:)` 的实现会找到作为参数传递给 `#fourCharacterCode` 的字符串，并计算出相对应的 32 位无符号整型字面量的值。

在上面的示例中，第一个 `guard` 块从 AST 中提取出字符串字面量，并将该 AST 结点赋值给 `literalSegment`。第二个 `guard` 块调用私有 `fourCharacterCode(for:)` 函数。如果宏使用不当，这两个代码块都可能会抛出错误 —— 错误信息会在被不当调用的位置作为编译器错误抛出。例如，如果你尝试以 `#fourCharacterCode("AB" + "CD")` 的方式来调用该宏，编译器会显示错误信息 "Need a static string"（“需要一个静态字符串”）。

`expansion(of:in:)` 方法返回了一个 `ExprSyntax` 的实例，`ExprSyntax` 是 SwiftSyntax 中的一种用于表示 AST 中的表达式的类型。由于此类型遵循  `StringLiteralConvertible` 协议，作为一种轻量级的语法，这个宏的实现就使用了一个简单字符串字面量来创建其结果。所有从宏实现中返回的 SwiftSyntax 类型都遵循 `StringLiteralConvertible` 协议，因此你也可以在实现任何宏时使用这种方法。

<!-- TODO contrast the `\(raw:)` and non-raw version.  -->

<!--
The return-a-string APIs come from here

https://github.com/apple/swift-syntax/blob/main/Sources/SwiftSyntaxBuilder/Syntax%2BStringInterpolation.swift
-->


<!-- OUTLINE:

- Note:
  Behind the scenes, Swift serializes and deserializes the AST,
  to pass the data across process boundaries,
  but your macro implementation doesn't need to deal with any of that.

- This method is also passed a macro-expansion context, which you use to:

    + Generate unique symbol names
    + Produce diagnostics (`Diagnostic` and `SimpleDiagnosticMessage`)
    + Find a node's location in source

- Macro expansion happens in their surrounding context.
  A macro can affect that environment if it needs to ---
  and a macro that has bugs can interfere with that environment.
  (Give guidance on when you'd do this.  It should be rare.)

- Generated symbol names let a macro
  avoid accidentally interacting with symbols in that environment.
  To generate a unique symbol name,
  call the `MacroExpansionContext.makeUniqueName()` method.

- Ways to create a syntax node include
  Making an instance of the `Syntax` struct,
  or `SyntaxToken`
  or `ExprSyntax`.
  (Need to give folks some general ideas,
  and enough guidance so they can sort through
  all the various `SwiftSyntax` node types and find the right one.)

- Attached macros follow the same general model as expression macros,
  but with more moving parts.

- Pick the subprotocol of `AttachedMacro` to conform to,
  depending on which kind of attached macro you're making.
  [This is probably a table]

  + `AccessorMacro` goes with `@attached(accessor)`
  + `ConformanceMacro` goes with `@attached(conformance)`
    [missing from the list under Declaring a Macro]
  + `MemberMacro` goes with `@attached(member)`
  + `PeerMacro` goes with `@attached(peer)`
  + `MemberAttributeMacro` goes with `@member(memberAttribute)`

- Code example of conforming to `MemberMacro`.

  ```
  static func expansion<
    Declaration: DeclGroupSyntax,
    Context: MacroExpansionContext
  >(
    of node: AttributeSyntax,
    providingMembersOf declaration: Declaration,
    in context: Context
  ) throws -> [DeclSyntax]
  ```

- Adding a new member by making an instance of `Declaration`,
  and returning it as part of the `[DeclSyntax]` list.

-->

## 开发和调试宏

宏非常适合使用测试驱动的方式进行开发：宏可以将一个 AST 转换成另一个 AST，而无需依赖任何外部状态，也无需更改任何外部状态。此外，你还可以用字符串字面量创建语法节点，从而简化了测试输入的设置。你还可以读取 AST 的 `description` 属性来获取一个用来与预期值进行比较的字符串。例如，下面是对前面章节中的 `#fourCharacterCode` 宏的一个测试：

```swift
let source: SourceFileSyntax =
    """
    let abcd = #fourCharacterCode("ABCD")
    """

let file = BasicMacroExpansionContext.KnownSourceFile(
    moduleName: "MyModule",
    fullFilePath: "test.swift"
)

let context = BasicMacroExpansionContext(sourceFiles: [source: file])

let transformedSF = source.expand(
    macros:["fourCharacterCode": FourCharacterCode.self],
    in: context
)

let expectedDescription =
    """
    let abcd = 1145258561 as UInt32
    """

precondition(transformedSF.description == expectedDescription)
```

上面的示例使用了一个 precondition 来测试宏，但你也可以使用测试框架来代替它。

<!-- OUTLINE:

- Ways to view the macro expansion while debugging.
  The SE prototype provides `-Xfrontend -dump-macro-expansions` for this.
  [TR: Is this flag what we should suggest folks use,
  or will there be better command-line options coming?]

- Use diagnostics for macros that have constraints/requirements
  so your code can give a meaningful error to users when those aren't met,
  instead of letting the compiler try & fail to build the generated code.

Additional APIs and concepts to introduce in the future,
in no particular order:

- Using `SyntaxRewriter` and the visitor pattern for modifying the AST

- Adding a suggested correction using `FixIt`

- concept of trivia

- `TokenSyntax`
-->

> 测试版软件:
>
> 本文档包含有关正在开发的 API 或技术的初步信息。这些信息可能会发生变化，根据本文档实施的软件应与最终的操作系统软件一起进行测试。
>
> 了解更多有关使用 [Apple's beta software](https://developer.apple.com/support/beta-software/) 的信息。

<!--
This source file is part of the Swift.org open source project

Copyright (c) 2014 - 2023 Apple Inc. and the Swift project authors
Licensed under Apache License v2.0 with Runtime Library Exception

See https://swift.org/LICENSE.txt for license information
See https://swift.org/CONTRIBUTORS.txt for the list of Swift project authors
-->
