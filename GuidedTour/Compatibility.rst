Version Compatibility
=====================

.. XXX Copy the swift-version assertion from USWCAOC into this chapter.

This book describes version 4.0 of the Swift language,
which ships as part of Xcode 9.
You can use Xcode 9 to build targets
that are written in either Swift 4 or Swift 3.

When you use Xcode 9 to build Swift 3 code,
the compiler uses the version number Swift 3.2
and most of the new Swift 4 functionality is available.
The following features are available only to Swift 4 code:

.. XXX This list is a rough guess.

- Access to private members from extensions
- Enforcement of exclusive memory access
- Strings and substrings as separate types
- Reduced implicit ``@objc``

A target written in Swift 4 can depend on
a target that's written using Swift 3,
and vice versa.
This means, if you have a large project
that is divided into multiple frameworks,
you can migrate your code from Swift 3 to Swift 4
one framework at a time.

.. XXX In the paragraph above, is it "target" or "product"?

When the Swift 4 compiler is working with Swift 3 code,
it identifies its language version as 3.2 ---
this means you can use conditional compilation blocks
like ``#if swift(>=3.2)``.

.. XXX How about an example of the exact incantation
   needed to detect Swift 3.2 but not 3.1 or 4.0?

.. Scratch writing...

    - This book describes version 4.0 of the Swift language.

    - The Swift 4 compiler (Xcode 9) supports both Swift 4 code
      and code that was written in Swift 3.

    - Most of the new features of Swift 4
      are still available when you're writing Swift 3 code
      that you compile with the new compiler.

    - The following features of Swift 4/Xcode 9
      are available only in Swift 4 mode.
      
      (...)

    Versions of Xcode that support Swift 4.0
    can also work with existing Swift 3 code
    using a build setting.
    The Swift 4 tools identify as "Swift 3.2"
    when they are compiling Swift 3 code.


    Because Xcode 9 uses the same Swift compiler
    for both Swift 3 and Swift 4 code,
    you can link between targets written in either language version.


    You can use Xcode 9 to compile both Swift 4 code and Swift 3 code,
    and you can mix them.
