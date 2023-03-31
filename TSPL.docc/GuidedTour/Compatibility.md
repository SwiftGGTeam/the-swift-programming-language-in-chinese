# Version Compatibility

Learn what functionality is available in older language modes.

This book describes Swift 5.9,
the default version of Swift that's included in Xcode 15.
You can use Xcode 15 to build targets
that are written in either Swift 5.9, Swift 4.2, or Swift 4.

<!--
  - test: `swift-version`

  ```swifttest
  >> #if swift(>=5.9.1)
  >>     print("Too new")
  >> #elseif swift(>=5.9)
  >>     print("Just right")
  >> #else
  >>     print("Too old")
  >> #endif
  << Just right
  ```
-->

When you use Xcode 15 to build Swift 4 and Swift 4.2 code,
most Swift 5.9 functionality is available.
That said,
the following changes are available only to code that uses Swift 5.9 or later:

- Functions that return an opaque type require the Swift 5.1 runtime.
- The `try?` expression doesn't introduce an extra level of optionality
  to expressions that already return optionals.
- Large integer literal initialization expressions are inferred
  to be of the correct integer type.
  For example, `UInt64(0xffff_ffff_ffff_ffff)` evaluates to the correct value
  rather than overflowing.

Concurrency requires Swift 5.9 or later,
and a version of the Swift standard library
that provides the corresponding concurrency types.
On Apple platforms, set a deployment target
of at least iOS 13, macOS 10.15, tvOS 13, or watchOS 6.

A target written in Swift 5.9 can depend on
a target that's written in Swift 4.2 or Swift 4,
and vice versa.
This means, if you have a large project
that's divided into multiple frameworks,
you can migrate your code from Swift 4 to Swift 5.9
one framework at a time.

> Beta Software:
>
> This documentation contains preliminary information about an API or technology in development. This information is subject to change, and software implemented according to this documentation should be tested with final operating system software.
>
> Learn more about using [Apple's beta software](https://developer.apple.com/support/beta-software/).

<!--
This source file is part of the Swift.org open source project

Copyright (c) 2014 - 2022 Apple Inc. and the Swift project authors
Licensed under Apache License v2.0 with Runtime Library Exception

See https://swift.org/LICENSE.txt for license information
See https://swift.org/CONTRIBUTORS.txt for the list of Swift project authors
-->
