Version Compatibility
=====================

This book describes version 4.0 of the Swift language,
which ships as part of Xcode 9.
You can use Xcode 9 to build targets
that are written in either Swift 4 or Swift 3.

.. assertion:: swift-version

   >> #if swift(>=4.0.1)
   >>     print("Too new")
   >> #elseif swift(>=4.0)
   >>     print("Just right")
   >> #else
   >>     print("Too old")
   >> #endif
   << Just right

When you use Xcode 9 to build Swift 3 code,
most of the new Swift 4 functionality is available.
The following features are available only to Swift 4 code:

.. XXX This list is a rough guess.

- Access to private members from extensions
- Strings and substrings as separate types
- Reduced implicit ``@objc``

A target written in Swift 4 can depend on
a target that's written using Swift 3,
and vice versa.
This means, if you have a large project
that is divided into multiple frameworks,
you can migrate your code from Swift 3 to Swift 4
one framework at a time.

When the Swift 4 compiler is working with Swift 3 code,
it identifies its language version as 3.2 ---
this means you can use conditional compilation blocks
like ``#if swift(>=3.2)``.

.. The incantation to determine which Swift you're on:

   #if swift(>=4)
       print("Swift 4 compiler reading Swift 4 code")
   #elseif swift(>=3.2)
       print("Swift 4 compiler reading Swift 3 code")
   #elseif swift(>=3.1)
       print("Swift 3.1 compiler")
   #else
       print("An older compiler")
   #endif

