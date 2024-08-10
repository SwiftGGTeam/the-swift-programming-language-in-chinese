# 宏

在编译时使用宏生成代码。

宏会在你编译你的源代码时对其进行转换，从而可以让你避免手动编写重复的代码。在编译过程中，Swift 会先展开代码中的所有宏，然后再像往常一样构建代码。

![一个显示宏展开概貌的图表。左侧是 Swift 代码的风格化表示。右侧是由宏添加了几行的相同的代码。](macro-expansion)

宏展开始终是一种加法操作：宏会添加新代码，但绝不会删除或修改现有代码。

每个宏的输入和宏展开的输出都会被检查，以确保它们是语法上有效的 Swift 代码。同样，你传给宏的值以及宏生成的代码中的值也会被检查，以确保它们具有正确的类型。此外，如果宏的实现在扩展宏时遇到错误，编译器会将其视为编译错误。这些保证让使用了宏的代码更容易被推导，也更容易发现诸如宏使用不当或宏实现中的错误这样的问题。

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

在函数内的第一行中，`#function` 调用了 Swift 标准库中的 [`function()`][] 宏。当你编译此代码时，Swift 会调用该宏的实现，将 `#function` 替换为当前函数的名称。当你运行这段代码并调用 `myFunction()` 时，它会打印 “Currently running myFunction()”。在第二行中，`#warning` 调用了 Swift 标准库中的 [`warning(_:)`][] 宏，以生成一个自定义的编译时警告。

[`function()`]: https://developer.apple.com/documentation/swift/function()
[`warning(_:)`]: https://developer.apple.com/documentation/swift/warning(_:)

独立宏可以像 `#function` 所做的那样产出一个值，也可以像 `#warning` 所做的那样在编译时执行一个操作。
<!-- SE-0397: 或者他们也可以生成新的声明。  -->

## 附加宏

要调用附加宏，需要在其名称前写入 at 符号 (`@`) ，并在名称后的括号中写入宏的参数。

附加宏会修改它们被所附加到的声明。它们为被附加到的声明添加代码，比如定义一个新的方法或者增加对某个协议的遵循。

例如，请看下面这段不使用宏的代码：

```swift
struct SundaeToppings: OptionSet {
    let rawValue: Int
    static let nuts = SundaeToppings(rawValue: 1 << 0)
    static let cherry = SundaeToppings(rawValue: 1 << 1)
    static let fudge = SundaeToppings(rawValue: 1 << 2)
}
```

在这段代码中，`SundaeToppings` 选项集中的每个选项都包括对初始化器的调用，这是重复的手动操作。这样在添加新选项时容易出错，比如在行尾键入错误的数字。

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


作为对比，下面是 `@OptionSet` 宏展开后的版本的样子。这段代码不是由你自己编写的，只有当你特别要求 Swift 显示宏的展开时，你才会看到它。

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

## Macro Declarations

In most Swift code,
when you implement a symbol, like a function or type,
there's no separate declaration.
However, for macros, the declaration and implementation are separate.
A macro's declaration contains its name,
the parameters it takes,
where it can be used,
and what kind of code it generates.
A macro's implementation contains the code
that expands the macro by generating Swift code.

You introduce a macro declaration with the `macro` keyword.
For example,
here's part of the declaration for
the `@OptionSet` macro used in the previous example:

```swift
public macro OptionSet<RawType>() =
        #externalMacro(module: "SwiftMacros", type: "OptionSetMacro")
```

The first line
specifies the macro's name and its arguments ---
the name is `OptionSet`, and it doesn't take any arguments.
The second line
uses the [`externalMacro(module:type:)`][] macro from the Swift standard library
to tell Swift where the macro's implementation is located.
In this case,
the `SwiftMacros` module
contains a type named `OptionSetMacro`,
which implements the `@OptionSet` macro.

[`externalMacro(module:type:)`]: https://developer.apple.com/documentation/swift/externalmacro(module:type:)

Because `OptionSet` is an attached macro,
its name uses upper camel case,
like the names for structures and classes.
Freestanding macros have lower camel case names,
like the names for variables and functions.

> Note:
> Macros are always declared as `public`.
> Because the code that declares a macro
> is in a different module from code that uses that macro,
> there isn't anywhere you could apply a nonpublic macro.

A macro declaration defines the macro's *roles* ---
the places in source code where that macro can be called,
and the kinds of code the macro can generate.
Every macro has one or more roles,
which you write as part of the attributes
at the beginning of the macro declaration.
Here's a bit more of the declaration for `@OptionSet`,
including the attributes for its roles:

```swift
@attached(member)
@attached(extension, conformances: OptionSet)
public macro OptionSet<RawType>() =
        #externalMacro(module: "SwiftMacros", type: "OptionSetMacro")
```

The `@attached` attribute appears twice in this declaration,
once for each macro role.
The first use, `@attached(member)`, indicates that the macro
adds new members to the type you apply it to.
The `@OptionSet` macro adds an `init(rawValue:)` initializer
that's required by the `OptionSet` protocol,
as well as some additional members.
The second use, `@attached(extension, conformances: OptionSet)`,
tells you that `@OptionSet`
adds conformance to the `OptionSet` protocol.
The `@OptionSet` macro
extends the type that you apply the macro to,
to add conformance to the `OptionSet` protocol.

For a freestanding macro,
you write the `@freestanding` attribute to specify its role:

```
@freestanding(expression)
public macro line<T: ExpressibleByIntegerLiteral>() -> T =
        /* ... location of the macro implementation... */
```

<!--
Elided the implementation of #line above
because it's a compiler built-in:

public macro line<T: ExpressibleByIntegerLiteral>() -> T = Builtin.LineMacro
-->

The `#line` macro above has the `expression` role.
An expression macro produces a value,
or performs a compile-time action like generating a warning.

In addition to the macro's role,
a macro's declaration provides information about
the names of the symbols that the macro generates.
When a macro declaration provides a list of names,
it's guaranteed to produce only declarations that use those names,
which helps you understand and debug the generated code.
Here's the full declaration of `@OptionSet`:

```swift
@attached(member, names: named(RawValue), named(rawValue),
        named(`init`), arbitrary)
@attached(extension, conformances: OptionSet)
public macro OptionSet<RawType>() =
        #externalMacro(module: "SwiftMacros", type: "OptionSetMacro")
```

In the declaration above,
the `@attached(member)` macro includes arguments after the `names:` label
for each of the symbols that the `@OptionSet` macro generates.
The macro adds declarations for symbols named
`RawValue`, `rawValue`, and `init` ---
because those names are known ahead of time,
the macro declaration lists them explicitly.

The macro declaration also includes `arbitrary` after the list of names,
allowing the macro to generate declarations
whose names aren't known until you use the macro.
For example,
when the `@OptionSet` macro is applied to the `SundaeToppings` above,
it generates type properties that correspond to the enumeration cases,
`nuts`, `cherry`, and `fudge`.

For more information,
including a full list of macro roles,
see <doc:Attributes#attached> and <doc:Attributes#freestanding>
in <doc:Attributes>.

## Macro Expansion

When building Swift code that uses macros,
the compiler calls the macros' implementation to expand them.

![Diagram showing the four steps of expanding macros.  The input is Swift source code.  This becomes a tree, representing the code's structure.  The macro implementation adds branches to the tree.  The result is Swift source with additional code.](macro-expansion-full)

Specifically, Swift expands macros in the following way:

1. The compiler reads the code,
   creating an in-memory representation of the syntax.

1. The compiler sends part of the in-memory representation
   to the macro implementation,
   which expands the macro.

1. The compiler replaces the macro call with its expanded form.

1. The compiler continues with compilation,
   using the expanded source code.

To go through the specific steps, consider the following:

```
let magicNumber = #fourCharacterCode("ABCD")
```

The `#fourCharacterCode` macro takes a string that's four characters long
and returns an unsigned 32-bit integer
that corresponds to the ASCII values in the string joined together.
Some file formats use integers like this to identify data
because they're compact but still readable in a debugger.
The <doc:Macros#Implementing-a-Macro> section below
shows how to implement this macro.

To expand the macros in the code above,
the compiler reads the Swift file
and creates an in-memory representation of that code
known as an *abstract syntax tree*, or AST.
The AST makes the code's structure explicit,
which makes it easier to write code that interacts with that structure ---
like a compiler or a macro implementation.
Here's a representation of the AST for the code above,
slightly simplified by omitting some extra detail:

![A tree diagram, with a constant as the root element.  The constant has a name, magic number, and a value.  The constant's value is a macro call.  The macro call has a name, fourCharacterCode, and arguments.  The argument is a string literal, ABCD.](macro-ast-original)

The diagram above shows how the structure of this code
is represented in memory.
Each element in the AST
corresponds to a part of the source code.
The "Constant declaration" AST element
has two child elements under it,
which represent the two parts of a constant declaration:
its name and its value.
The "Macro call" element has child elements
that represent the macro's name
and the list of arguments being passed to the macro.

As part of constructing this AST,
the compiler checks that the source code is valid Swift.
For example, `#fourCharacterCode` takes a single argument,
which must be a string.
If you tried to pass an integer argument,
or forgot the quotation mark (`"`) at the end of the string literal,
you'd get an error at this point in the process.

The compiler finds the places in the code where you call a macro,
and loads the external binary that implements those macros.
For each macro call,
the compiler passes part of the AST to that macro's implementation.
Here's a representation of that partial AST:

![A tree diagram, with a macro call as the root element.  The macro call has a name, fourCharacterCode, and arguments.  The argument is a string literal, ABCD.](macro-ast-input)

The implementation of the `#fourCharacterCode` macro
reads this partial AST as its input when expanding the macro.
A macro's implementation
operates only on the partial AST that it receives as its input,
meaning a macro always expands the same way
regardless of what code comes before and after it.
This limitation helps make macro expansion easier to understand,
and helps your code build faster
because Swift can avoid expanding macros that haven't changed.
<!-- TODO TR: Confirm -->
Swift helps macro authors avoid accidentally reading other input
by restricting the code that implements macros:

- The AST passed to a macro implementation
  contains only the AST elements that represent the macro,
  not any of the code that comes before or after it.

- The macro implementation runs in a sandboxed environment
  that prevents it from accessing the file system or the network.

In addition to these safeguards,
the macro's author is responsible for not reading or modifying anything
outside of the macro's inputs.
For example, a macro's expansion must not depend on the current time of day.

The implementation of `#fourCharacterCode`
generates a new AST containing the expanded code.
Here's what that code returns to the compiler:

![A tree diagram with the integer literal 1145258561 of type UInt32.](macro-ast-output)

When the compiler receives this expansion,
it replaces the AST element that contains the macro call
with the element that contains the macro's expansion.
After macro expansion,
the compiler checks again to ensure
the program is still syntactically valid Swift
and all the types are correct.
That produces a final AST that can be compiled as usual:

![A tree diagram, with a constant as the root element.  The constant has a name, magic number, and a value.  The constant's value is the integer literal 1145258561 of type UInt32.](macro-ast-result)

This AST corresponds to Swift code like this:

```
let magicNumber = 1145258561 as UInt32
```

In this example, the input source code has only one macro,
but a real program could have several instances of the same macro
and several calls to different macros.
The compiler expands macros one at a time.

If one macro appears inside another,
the outer macro is expanded first ---
this lets the outer macro modify the inner macro before it's expanded.

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

## Implementing a Macro

To implement a macro, you make two components:
A type that performs the macro expansion,
and a library that declares the macro to expose it as API.
These parts are built separately from code that uses the macro,
even if you're developing the macro and its clients together,
because the macro implementation runs
as part of building the macro's clients.

To create a new macro using Swift Package Manager,
run `swift package init --type macro` ---
this creates several files,
including a template for a macro implementation and declaration.

To add macros to an existing project,
edit the beginning of your `Package.swift` file as follows:

- Set a Swift tools version of 5.9 or later in the `swift-tools-version` comment.
- Import the `CompilerPluginSupport` module.
- Include macOS 10.15 as a minimum deployment target in the `platforms` list.

The code below shows the beginning of an example `Package.swift` file.

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

Next, add a target for the macro implementation
and a target for the macro library
to your existing `Package.swift` file.
For example,
you can add something like the following,
changing the names to match your project:

```swift
targets: [
    // Macro implementation that performs the source transformations.
    .macro(
        name: "MyProjectMacros",
        dependencies: [
            .product(name: "SwiftSyntaxMacros", package: "swift-syntax"),
            .product(name: "SwiftCompilerPlugin", package: "swift-syntax")
        ]
    ),

    // Library that exposes a macro as part of its API.
    .target(name: "MyProject", dependencies: ["MyProjectMacros"]),
]
```

The code above defines two targets:
`MyProjectMacros` contains the implementation of the macros,
and `MyProject` makes those macros available.

The implementation of a macro
uses the [SwiftSyntax][] module to interact with Swift code
in a structured way, using an AST.
If you created a new macro package with Swift Package Manager,
the generated `Package.swift` file
automatically includes a dependency on SwiftSyntax.
If you're adding macros to an existing project,
add a dependency on SwiftSyntax in your `Package.swift` file:

[SwiftSyntax]: http://github.com/apple/swift-syntax/

```swift
dependencies: [
    .package(url: "https://github.com/apple/swift-syntax", from: "509.0.0")
],
```

Depending on your macro's role,
there's a corresponding protocol from SwiftSyntax
that the macro implementation conforms to.
For example,
consider `#fourCharacterCode` from the previous section.
Here's a structure that implements that macro:

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

If you're adding this macro to an existing Swift Package Manager project,
add a type that acts as the entry point for the macro target
and lists the macros that the target defines:

```swift
import SwiftCompilerPlugin

@main
struct MyProjectMacros: CompilerPlugin {
    var providingMacros: [Macro.Type] = [FourCharacterCode.self]
}
```

The `#fourCharacterCode` macro
is a freestanding macro that produces an expression,
so the `FourCharacterCode` type that implements it
conforms to the `ExpressionMacro` protocol.
The `ExpressionMacro` protocol has one requirement,
an `expansion(of:in:)` method that expands the AST.
For the list of macro roles and their corresponding SwiftSyntax protocols,
see <doc:Attributes#attached> and <doc:Attributes#freestanding>
in <doc:Attributes>.

To expand the `#fourCharacterCode` macro,
Swift sends the AST for the code that uses this macro
to the library that contains the macro implementation.
Inside the library, Swift calls `FourCharacterCode.expansion(of:in:)`,
passing in the AST and the context as arguments to the method.
The implementation of `expansion(of:in:)`
finds the string that was passed as an argument to `#fourCharacterCode`
and calculates the corresponding 32-bit unsigned integer literal value.

In the example above,
the first `guard` block extracts the string literal from the AST,
assigning that AST element to `literalSegment`.
The second `guard` block
calls the private `fourCharacterCode(for:)` function.
Both of these blocks throw an error if the macro is used incorrectly ---
the error message becomes a compiler error
at the malformed call site.
For example,
if you try to call the macro as `#fourCharacterCode("AB" + "CD")`
the compiler shows the error "Need a static string".

The `expansion(of:in:)` method returns an instance of `ExprSyntax`,
a type from SwiftSyntax that represents an expression in an AST.
Because this type conforms to the `StringLiteralConvertible` protocol,
the macro implementation uses a string literal
as a lightweight syntax to create its result.
All of the SwiftSyntax types that you return from a macro implementation
conform to `StringLiteralConvertible`,
so you can use this approach when implementing any kind of macro.

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

## Developing and Debugging Macros

Macros are well suited to development using tests:
They transform one AST into another AST
without depending on any external state,
and without making changes to any external state.
In addition, you can create syntax nodes from a string literal,
which simplifies setting up the input for a test.
You can also read the `description` property of an AST
to get a string to compare against an expected value.
For example,
here's a test of the `#fourCharacterCode` macro from previous sections:

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

The example above tests the macro using a precondition,
but you could use a testing framework instead.

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

> Beta Software:
>
> This documentation contains preliminary information about an API or technology in development. This information is subject to change, and software implemented according to this documentation should be tested with final operating system software.
>
> Learn more about using [Apple's beta software](https://developer.apple.com/support/beta-software/).

<!--
This source file is part of the Swift.org open source project

Copyright (c) 2014 - 2023 Apple Inc. and the Swift project authors
Licensed under Apache License v2.0 with Runtime Library Exception

See https://swift.org/LICENSE.txt for license information
See https://swift.org/CONTRIBUTORS.txt for the list of Swift project authors
-->
