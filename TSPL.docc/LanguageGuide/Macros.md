# Macros

Transform code at compile time to automate repetition and generate code.

Macros transform your source code when you compile it,
letting you avoid writing out repetitive code by hand
and omit boilerplate code.
You can identify a call to a macro in Swift code
because it starts with either a number sign (`#`) or an at sign (`@`).
For example:

```swift
let currentLine = #line

#warning("Some custom compile-time warning.")

@OptionSet<UInt8>
struct SundaeToppings<UInt8> {
    private enum Options: Int {
        case whippedCream
        case nuts
        case cherry
        case chocolateSyrup
    }
}
```

<!-- XXX The above code is untested -->

The code above calls three macros:

- In the first line,
  `#line` is a call to the `line` macro from the Swift standard library.
  You can recognize that it's a call to a macro
  because of the `#` in front of it.
  When you compile this code,
  Swift calls that macro's implementation,
  and replaces `#line` with the current line number.

- In the second line,
  `#warning` calls another macro from the standard library
  to produce a custom warning when the code is compiled.
  Again, the `#` marks this as a macro call.
  Unlike `#line`, `#warning` doesn't produce any value.

- In the remaining lines,
  `@OptionSet` creates a type that conforms to the [`OptionSet`][] protocol,
  automatically declaring the necessary static members.
  Here, the `@` marks a macro that behaves like an attribute,
  modifying the declaration that the macro is attached to.

[`OptionSet`]: https://developer.apple.com/documentation/swift/optionset

Macros like `@OptionSet` are known as *attached macros*
because they are always attached to a declaration.
Attached macros can add members to the declaration that they're attached to.
Macros like `#line` and `#warning` are known as *freestanding macros*
because they can appear on their own,
without being attached to a declaration.
Freestanding macros can produce a value, like `#line`,
they can perform some compile-time action, like `#warning`,
or they can generate new declarations.
Both attached and freestanding macros are always additive:
They can expand to add new code,
but they can't ever delete code
or modify code that you wrote by hand.

Swift expands both attached and freestanding macros
using the following general steps:

1. The compiler reads the code, just like when it's compiling,
   creating an in-memory representation of the syntax.
   This representation is known as an _abstract syntax tree_ or AST.

1. The compiler passes part of that in-memory representation
   <!-- XXX which part? just the part that needs to be expanded -->
   to the implementation of the macro,
   which returns the macro's expansion.

1. The compiler replaces the macro with its expanded form,
   and then continues compilation.

[XXX FIGURE XXX]

```
let currentLine = #line
       |
       v
    #line
       |
       v
      123
       |
       v
let currentLine = 123
```

<!--
XXX
If #colorLiteral will be a macro in the stdlib, use that in the figure instead.
It's a more interesting example because it has more than just 1 syntax node.
-->

If you've used macros in another programming language,
some parts of Swift macros will be familiar
and some parts will feel different.
All of the components of the Swift macro system are made up of Swift code:

- The declaration of a Swift macro,
  including information about where it can appear
  and what kind of output it produces,
  is written in Swift like the declaration of a structure or function.

- The implementation of a macro is written in Swift,
  using the functionality provided by the [SwiftSyntax][] module
  to read Swift code and add to it.
  Even though there are convenience APIs in SwiftSyntax
  to create new syntax nodes using strings,
  the input, expansion, and output all consists of
  structured information (AST nodes).
  <!-- XXX don't introduce AST mid bulleted list -->

- The result of macro expansion is Swift code,
  which you can debug as normal.
  XXX debugging - how to expand macros

[SwiftSyntax]: http://github.com/apple/swift-syntax/

Both the input to a macro and the output of macro expansion
are always valid Swift code ---
they're syntactically well-formed
and the values type-check.

<!-- XXX try to avoid "type check" above; too much jargon -->

<!-- XXX OUTLINE NOTE
Why can't my macro and the rest of my code all be in one target?
In brief, because that would create a circular dependency.
A macro's implementation has to be compiled
before it can be used to compile other code.
So if your single-target project contained both the macro
and other code that used the macro,
then the compiler would have had to already compiled your code
in order to have the macro expanded and be able to compiler your code.
-->

## Freestanding Macros

XXX OUTLINE:

- Spelled with a pound sign (`#`),
  indicating that this is a compile-time operation.
  This spelling looks like `#if` and other things that happen at compile time.

- Macro declaration includes `@freestanding(expression)`.
  These are "freestanding" because
  they produce a value or declaration on their own,
  rather than being attached to another piece of syntax.
  Contrast with "attached" macros, described below.

- If the macro doesn't take arguments,
  you just write its name to call it.
  For example: `#line`.

- If the macro takes arguments,
  you write them after the name like a function call.
  For example XXX.

- When you compile your code,
  the macro implementation modifies your code.
  (very brief version with xref to section below)

- Example of a macro and its expanded form.

  `#colorLiteral(red:green:blue)` expands to `Color.init(red:green:blue)`

- NOTE:
  Today, expression macros are the only kind of freestanding macros,
  but more are expected in the future via
  https://github.com/DougGregor/swift-evolution/blob/freestanding-macros/proposals/nnnn-freestanding-macros.md

## Attached Macros

XXX OUTLINE:

- Spelled with an at sign (`@`).
  This looks like an attribute because XXX

- FIXME: Example attached macro from the stdlib

- These are "attached" because you write them as an attribute
  that's attached to a declaration,
  like a structure or a property.
  Attached macros augment the declaration they're attached to ---
  for example, by adding additional members to a structure declaration.

- Macro declaration includes `@attached`
  followed by information about the kinds of code the macro produces,
  and information about the names of the generated symbols.

- To apply the macro to a declaration,
  you write its name and any parameters it takes before that declaration,
  like an attribute.
  For example XXX

- Expansion works the same way as for freestanding macros.
  Arguments also work the same way.

- Example of a macro and its expanded form.

## How Macros Are Expanded

XXX OUTLINE:

- The macro expansion process:

  1. The compiler ensures that the code inside the macro call is valid Swift.
  1. The compiler represents your code in memory
     using an abstract syntax tree.
  1. The compiler calls the code that implements the macro,
     passing it information about context where the macro appeared.
  1. The macro implementation creates new AST nodes.
  1. The compiler splices the new AST nodes into the declaration.
  1. The compiler builds the expanded Swift code.

- Figure: moving parts [see ASCII art below]

- Macro arguments are type-checked before macro expansion.
  The macro implementation transforms well-typed, well-formed input
  into well-typed, well-formed output.

- Macros can be nested.
  Nested macros are expanded from the outside in.

- Macro recursion is limited.
  One macro can call another,
  but a given macro can't directly or indirectly call itself.
  The result of macro expansion can include other macros,
  but it can't include a macro that uses this macro in its expansion
  or declare a new macro.
  (XXX likely need to iterate with Doug here)

- Macro expansion happens in their surrounding context.
  A macro can affect that environment if it needs to —
  and a macro that has bugs can interfere with that environment.
  (XXX Give guidance on when you'd do this.  It should be rare.)

- Generated symbol names let a macro
  avoid accidentally interacting with symbols in that environment.
  To generate a unique symbol name,
  call the `MacroExpansionContext.makeUniqueName()` method.

## Declaring a Macro

XXX OUTLINE:

- A macro has two parts: the declaration, and the implementation.
  This is different from most things in Swift,
  where the declaration also contains the implementation.

- Macro declaration includes the `macro` keyword.
  Attributes on the macro declaration specify where and how it is used.
  [`@freestanding` and `@attached` introduced already above]

- The first half of the declaration,
  the parts before the equals sign (`=`)
  specify how the macro is used.
  The second half tells you which type implements the macro
  and what module that type is in.

- Freestanding macros are marked with `@freestanding`.
  Attached macros are marked with `@attached`.

- Arguments to those macros describe usage more specifically:

    - `@freestanding(expression)`   (XXX TR: Any other kind of freestanding?)
    - `@attached(peer, names:)`
    - `@attached(member, names:)`
    - `@attached(memberAttribute)`  (Note: You can't specify names here.)
    - `@attached(accessor, names:)`

- Every declaration that a macro creates in its expansion
  must be included in the list of names the macro declares in an attribute.
  Exception: A macro that uses `arbitrary`.
  However, a macro can declare a name
  but omit a corresponding declaration in the expansion.
  (For example, because one already exists.)

- Macro declaration naming:

    - `named(someDeclarationName)`
    - `arbitrary`
    - `overloaded`
    - `prefixed()` usually `prefixed(_)`
      but others including `$` are allowed.
    - `suffixed()` like `suffixed(_docInfo)`

- After the `=` you either write `#externalMacro(module:type:)`
  or call a different macro that expands to the macro's implementation.

- XXX TR: What guidance can we give
  about choosing where the implementation goes?

## Implementing a Macro

[TODO: Re-order for better flow, and split into multiple sections.]

XXX OUTLINE:

- You use the `SwiftSyntax` APIs to modify swift code
  by manipulating the abstract syntax tree (AST).

- Link to `SwiftSyntax` repository
  <https://github.com/apple/swift-syntax/>

- Setting up the SwiftPM bits.
  This should include an example `Package.swift` file
  and a list of the moving parts:
  a package that contains the macro implementation,
  a package that exposes the macro as API,
  and your code that uses the macro
  (which might be in a different package).

- Note:
  Behind the scenes, Swift serializes and deserializes the AST,
  to pass the data across process boundaries,
  but your macro implementation doesn't need to deal with any of that.

- Your type that implements an expression macro
  conforms to the `ExpresionMacro` protocol,
  and implements the required method:

  ```swift
  static func expansion<
    Node: FreestandingMacroExpansionSyntax,
    Context: MacroExpansionContext
  >(
    of node: Node,
    in context: Context
  ) throws -> ExprSyntax
  ```

- This method is passed the specific AST node representing your macro.

- This method is also passed a macro-expansion context, which you use to:

    + Generate unique symbol names
    + Produce diagnostics (`Diagnostic` and `SimpleDiagnosticMessage`)
    + Find a node's location in source

- Use diagnostics for macros that have constraints/requirements
  so your code can give a meaningful error to users when those aren't met,
  instead of letting the compiler try & fail to build the generated code.

- Ways to create a syntax node include
  Making an instance of the `Syntax` struct,
  or `SyntaxToken`
  or `ExprSyntax`.
  (Need to give folks some general ideas,
  and enough guidance so they can sort through
  all the various `SwiftSyntax` node types and find the right one.)

- Implementation tip:
  All of the types you need to return
  (`ExprSyntax`, `DeclSyntax`, `TypeSyntax`, and so on)
  conform to the `StringLiteralConvertible` protocol ---
  so you can use string interpolation to create the resulting AST nodes.
  XXX show an example of the `\(raw:)` and non-raw version.

  The APIs come from here
  https://github.com/apple/swift-syntax/blob/main/Sources/SwiftSyntaxBuilder/Syntax%2BStringInterpolation.swift

## Debugging macros

- Ways to view the macro expansion while debugging.
  The SE prototype provides `-Xfrontend -dump-macro-expansions` for this.
  [XXX TR: Is this flag what we should suggest folks use,
  or will there be better command-line options coming?]

- Attached macros follow the same general model as expression macros,
  but with more moving parts.

- Pick the subprotocol of `AttachedMacro` to conform to,
  depending on which kind of attached macro you're making.
  [This is probably a table]

  + `AccessorMacro` goes with `@attached(accessor)`
  + `ConformanceMacro` goes with `@attached(conformance)`
    [XXX missing from the list under Declaring a Macro]
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

- Because macros are deterministic and stateless ---
  they don't depend on any external state,
  don't have any side effects ---
  they're a great place to use use test cases during development.

XXX Additional APIs and concepts to introduce in the future,
in no particular order:

- Using `SyntaxRewriter` and the visitor pattern for modifying the AST

- Adding a suggested correction using `FixIt`

- concept of trivia

- `TokenSyntax`

## XXX Figure: The moving parts in macro expansion

Series of figures for ASTs, interleaved with text

QUESTION: Is this better served as nested bulleted lists?
Maybe draw out the full tree the first time,
and then switch to the textual version?

XXX
ASTs below are illustrative only,
and need to be rewritten to at least follow the shape
of what your macro will actually see.
However, for teaching purposes,
I still plan use a simplified AST in this example,
omitting the full details of the SwiftSyntax tree.

Starts with your code as an unparsed string:

```swift
let line = #colorLiteral(red: 10, green: 20, blue: 30)
```

Swift compiler parses the code to build an AST:

- assignment
  - identifier `line`
  - macro
    - identifier `colorLiteral`
    - label `red:`
    - integer 10
    - label `green:`
    - integer 20
    - label `blue:`
    - integer 30

Swift compiler passes the AST nodes that correspond to the macro
to the separate binary that implement the macro.
Here, that means the AST nodes that correspond to `line =` are omitted.

- macro
  - identifier `colorLiteral`
  - label `red:`
  - integer 10
  - label `green:`
  - integer 20
  - label `blue:`
  - integer 30

Macro implementation uses `SwiftSyntax` APIs
to manipulate the AST.

- function call
  - member access
    - identifier `Color`
    - identifier `init`
  - label `red:`
  - integer 10
  - label `green:`
  - integer 20
  - label `blue:`
  - integer 30

Macro binary and returns AST nodes the Swift compiler.
The compiler type-checks that result,
and replaces the macro node with the new syntax tree.

- assignment
  - identifier `line`
  - function call
    - member access
      - identifier `Color`
      - identifier `init`
    - label `red:`
    - integer 10
    - label `green:`
    - integer 20
    - label `blue:`
    - integer 30

The code is compiled
as if it had been written in source
in the expanded form.

```swift
let line = Color.init(red: 10, green: 20, blue: 30)
```

(This might be a good point to mention the "dump macro expansion" flag.)

<!--
This source file is part of the Swift.org open source project

Copyright (c) 2014 - 2022 Apple Inc. and the Swift project authors
Licensed under Apache License v2.0 with Runtime Library Exception

See https://swift.org/LICENSE.txt for license information
See https://swift.org/CONTRIBUTORS.txt for the list of Swift project authors
-->
