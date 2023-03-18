# Macros

Transform code at compile time to automate repetition and generate code.

XXX OUTLINE XXX


- What's a macro?
- Comes in two flavors:
    - "pound" macros make a value
    - "at" macros modify a declaration
- How do I call a macro?
    - Use macros from the stdlib in examples, like `#line`.
- How does the compiler expand a macro?
- How do I define a new macro?
    - It can go in the same module, or in an external module.
    - Q: What guidance can we give
      about choosing where the implementation goes?
- You use Swift Syntax APIs to modify the AST
    - Q: What are the most important APIs to show in examples?
- Tips for debugging a macro

## Figure: The moving parts in macro expansion

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

Swift compiler serialized the AST
and passes it to a separate binary
that implement the macro.

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

Swift compiler handles the AST
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
