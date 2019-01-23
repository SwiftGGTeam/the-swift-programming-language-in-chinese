Version Compatibility
=====================

This book describes Swift 5,
the default version of Swift that's included in Xcode 10.2.
You can use Xcode 10.2 to build targets
that are written in either Swift 5, Swift 4.2, or Swift 4.

.. assertion:: swift-version

   >> #if swift(>=5.0.1)
   >>     print("Too new")
   >> #elseif swift(>=5.0.0)
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


A target written in Swift 5 can depend on
a target that's written in Swift 4.2 or Swift 4,
and vice versa.
This means, if you have a large project
that's divided into multiple frameworks,
you can migrate your code from Swift 4 to Swift 5
one framework at a time.
