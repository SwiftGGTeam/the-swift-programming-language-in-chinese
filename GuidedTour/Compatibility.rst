Version Compatibility
=====================

This book describes Swift 5.3,
the default version of Swift that's included in Xcode 12.
You can use Xcode 12 to build targets
that are written in either Swift 5.3, Swift 4.2, or Swift 4.

.. assertion:: swift-version

   >> #if swift(>=5.3.1)
   >>     print("Too new")
   >> #elseif swift(>=5.3)
   >>     print("Just right")
   >> #else
   >>     print("Too old")
   >> #endif
   << Just right

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

When you use Xcode 12 to build Swift 4 and Swift 4.2 code,
most Swift 5.3 functionality is available.
That said,
the following changes are available only to code that uses Swift 5.3 or later:

- Functions that return an opaque type require the Swift 5.1 runtime.
- The ``try?`` expression doesn't introduce an extra level of optionality
  to expressions that already return optionals.
- Large integer literal initialization expressions are inferred
  to be of the correct integer type.
  For example, ``UInt64(0xffff_ffff_ffff_ffff)`` evaluates to the correct value
  rather than overflowing.

A target written in Swift 5.3 can depend on
a target that's written in Swift 4.2 or Swift 4,
and vice versa.
This means, if you have a large project
that's divided into multiple frameworks,
you can migrate your code from Swift 4 to Swift 5.3
one framework at a time.
