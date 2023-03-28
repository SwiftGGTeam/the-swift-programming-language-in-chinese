# Macros

Transform code at compile time to automate repetition and generate code.

XXX OUTLINE:

- Macros transform Swift code at compile time,
  letting you reduce repeated or boilerplate code.
- Macros are written in Swift, typically in a separate module.
- Macros use the Swift Syntax library in their implementation.
- Macros either produce a value ("pound" syntax)
  or modify a declaration ("at" syntax).

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

- Macro declaration includes `@attached`
  followed by information about the kinds of code the macro produces,
  and information about the names of the generated symbols.

- Also called "declaration macros"
  because the result of expansion is a (modified) declaration.

- To apply the macro to a declaration,
  you write its name and any parameters it takes before that declaration,
  like an attribute.
  For example XXX

- Expansion works the same way as for freestanding macros.

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

- Macro attributes and their meaning:
  XXX expand this bullet

    - `@freestanding(expression)`
    - `@attached(peer, names:)`
    - `@attached(member, names:)`
    - `@attached(memberAttribute)`  (XXX TR: Can this take `names:` too?)
    - `@attached(accessor, names:)`

- Every declaration a macro introduces in its expansion
  must be included in the list of names the macro declares.
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

- After the `=` you either write the type name
  if the type that implements the macro is in the same module,
  or you call `#externalMacro(module:type:)`.

- XXX TR: What guidance can we give
  about choosing where the implementation goes?

## Implementing a Macro

[Probably multiple sections]

XXX OUTLINE:

- You use Swift Syntax APIs to modify the AST

- XXX QUESTION: What are the most important APIs to show in examples?

- Tips for debugging a macro

- Ways to view the macro expansion while debugging
  XXX what options does the compiler give you?

XXX APIs to introduce, not yet in teaching order:

- Expression macros:

    - `ExpresionMacro` protocol,
    which implementation of freestanding macro conforms to

    - `FreestandingMacroExpansionSyntax`

    - `MacroExpansionContext` lets you query source location
      and produce diagnostics.
      Use diagnostics for macros that have constraints/requirements,
      to give a meaningful error to users
      instead of letting the compiler try & fail to build the generated code.

    - `ExprSyntax`, which expression macros produce

        - ways to create a syntax node include calling an init
          and conversion from a string literal
          (which can include interpolation)

    - `SyntaxRewriter` visitor pattern for modifying the AST

    - `Diagnostic`, like `SimpleDiagnosticMessage`,
      which you use to create a compile-time warning/error

    - `DiagnosticMessage`

    - `FixIt` maybe?

    - concept of "trivia"

    - `expansion(of:in:)`

    - `TokenSyntax`

- Attached macros:

    - `MemberMacro` and `MemberAttributeMacro` protocols,
    which attached macros conform to

    - concept of "syntax nodes"

    - `AttributeSyntax` and `DeclGroupSyntax`,
    which declaration macros produce

    - `DeclSyntax` and `DeclSyntaxProtocol`

    - `expansion(of:providingAttributesFor:in:)`

    - `expansion(of:attachedTo:providingAttributesFor:in:)`

    - `PeerMacros` and `expansion(of:providingPeersOf:in:)`

    - `ConformanceMacro` and `expansion(of:providingConformanceOf:in:)`


## XXX Figure: The moving parts in macro expansion

XXX Series of figures for ASTs, interleaved with text

QUESTION: Is this better served as nested bulleted lists?
Maybe draw out the full tree the first time,
and then switch to the textual version?

XXX TR: What labels should we use on the nodes here?
Are the type names from Swift Syntax stable enough to use here?

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
