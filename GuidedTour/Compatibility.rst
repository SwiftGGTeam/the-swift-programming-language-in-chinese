Version Compatibility
=====================

This book describes Swift 4.0,
the default version of Swift that's included in Xcode 9.
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

.. note::

    When the Swift 4 compiler is working with Swift 3 code,
    it identifies its language version as 3.2.
    You can use this behavior
    to write code like ``#if swift(>=3.2)``
    that's compatible with multiple versions of the Swift compiler ---

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

When you use Xcode 9 to build Swift 3 code,
most of the new Swift 4 functionality is available.
However,
the following features are available only to Swift 4 code:

- Substring operations return an instance of the ``Substring`` type,
  instead of ``String``.
- The ``@objc`` attribute is implicitly added in fewer places.
- Extensions to a type in the same file
  can access that type's private members.

A target written in Swift 4 can depend on
a target that's written in Swift 3,
and vice versa.
This means, if you have a large project
that's divided into multiple frameworks,
you can migrate your code from Swift 3 to Swift 4
one framework at a time.
