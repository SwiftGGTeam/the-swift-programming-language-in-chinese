# Macros

Transform code at compile time to automate repetition and generate code.

XXX OUTLINE:

- Macros transform Swift code at compile time,
  letting you reduce repeated or boilerplate code.
- Macros are written in Swift, typically in a separate module.
- Macros use the Swift Syntax library in their implementation.
- Macros either produce a value ("pound" syntax)
  or modify a declaration ("at" syntax).
- XXX Terminology: Settle on names for the kinds of macros.

## Using a Macro to Produce a Value

XXX OUTLINE:

- Spelled with a pound sign (`#`),
  indicating that this is a compile-time operation.
  Like `#if` etc.

- Macro declaration includes `@freestanding(expression)`.
  These are "freestanding" because they produce a value on their own,
  rather than being attached to another piece of syntax.
  Contrast with "attached" macros, described below.

- Also called "expression macros"
  because the result of expansion is an expression.

- NOTE:
  Today, expression macros are the only kind of freestanding macros,
  but more are expected in the future via
  https://github.com/DougGregor/swift-evolution/blob/freestanding-macros/proposals/nnnn-freestanding-macros.md

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

## Using a Macro to Modify a Declaration

XXX OUTLINE:

- Spelled with an at sign (`@`) like an attribute.
  FIXME: Good example macro from the stdlib

- These are "attached" because you write them as an attribute
  that's attached to a declaration,
  like a structure or a property.

- Macro declaration includes `@attached`
  followed by information about the kinds of code the macro produces,
  and information about the names of the generated symbols.

- Also called "declaration macros"
  because the result of expansion is a (modified) declaration.

- To apply the macro to a declaration,
  you write its name and any parameters it takes before that declaration,
  like an attribute.
  For example XXX

- Expansion works the same way as for expression macros.

- Example of a macro and its expanded form.

## How Macros Are Expanded

XXX OUTLINE:

- The macro expansion process:

  1. The compiler ensures that the code inside the macro call is valid Swift.
  1. The compiler represents your code in memory
     using an abstract syntax tree.
  1. The compiler sends the AST to the code that implements the macro.
  1. The macro implementation modifies the AST and sends it back.
  1. The compiler builds the modified Swift code.

- Figure: moving parts [see ASCII art below]

- Macro arguments are type-checked before macro expansion.
  The macro implementation transforms well-typed, well-formed input
  into well-typed, well-formed output.

- Macros can be nested,
  but macro expansion can't be recursive.
  Nested macros are expanded from the outside in.
  If the AST returned by a macro tries to call other macros,
  that's a compile-time error.

- Macro expansion happens in their surrounding context.
  A macro can affect that environment if it needs to —
  and a macro that has bugs can interfere with that environment.

- Generated symbol names let a macro
  avoid accidentally interacting with symbols in that environment.
  (XXX What’s our spelling of GENSYM?)

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
    - `@attached(memberAttribute)`  (XXX TR: Can this take `names:` too?)
    - `@attached(accessor, names:)`

- Every declaration that a macro creates in its expansion
  must be included in the list of names the macro declares in an attribute.
  Exception: A macro that uses `arbitrary`.
  However, a macro can declare a name
  but omit a corresponding declaration in the expansion.
  (For example, because one already exists.)

- TR: Are any of the options in these macros expected to be uncommon enough
  that we should document them in the reference
  but omit them from the guide's teaching path?

- Macro declaration naming:

    - `named(someDeclarationName)`
    - `arbitrary`
    - `overloaded`
    - `prefixed()` usually `prefixed(_)`
      but others including `$` are allowed.
    - `suffixed()` like `suffixed(_docInfo)`

- After the `=` you either write the type name
  if the type that implements the macro is in the same module,
  or you call `#externalMacro(module:type:)`.

- XXX TR: What guidance can we give
  about choosing where the implementation goes?

## Implementing a Macro

[Probably multiple sections]

XXX OUTLINE:

- You use the Swift Syntax APIs to modify swift code
  by manipulating the abstract syntax tree (AST).

- Link to Swift Syntax repository
  <https://github.com/apple/swift-syntax/>

- XXX Question: Should we show SwiftPM syntax for depending on Swift Syntax?
  Nothing else in TSPL shows how to build projects,
  so it might feel a little out of place here.

- XXX TR: Do you deserialize the AST from JSON?
  From the examples, it seems like this is done for you,
  so I don't think there's anything to say about it.

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
  all the various Swift Syntax node types and find the right one.)

- XXX TR: Many of the example macros look like they're
  creating syntax nodes using string literal,
  but I can't find any conformance to `StringLiteralConvertible` to point to.
  How does this work?

- Tips for debugging a macro

- Ways to view the macro expansion while debugging.
  XXX TR: What options (if any) does the compiler give you?

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
  + [XXX What about `@member(memberAttribute)`?

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

XXX TR: What labels should we use on the nodes here?
Are the type names from Swift Syntax stable enough
that TSPL won't be constantly out of sync with it,
or would English words better?

Starts with your code:

```ascii-art
let line = #line
```

Swift compiler converts code to an to AST:

```ascii-art
    Assignment
    /       \
    |       |
  Constant  \
    |      Macro
    |        \
  line        #line
```

Swift compiler serializes the AST
and passes it to a separate binary
that implement the macro.

[Highlight which part of the AST gets passed over.]

Macro implementation uses Swift Syntax APIs
to manipulate the AST

```ascii-art
    Assignment
    /       \
    |       |
  Constant  \
    |      IntegerLiteral
    |        \
  line        23
```

Macro binary serializes the AST
and returns it the Swift compiler.

The code is compiled
as if it had been written in source
in the expanded form.

```ascii-art
let line = 23
```


<!--
This source file is part of the Swift.org open source project

Copyright (c) 2014 - 2022 Apple Inc. and the Swift project authors
Licensed under Apache License v2.0 with Runtime Library Exception

See https://swift.org/LICENSE.txt for license information
See https://swift.org/CONTRIBUTORS.txt for the list of Swift project authors
-->
