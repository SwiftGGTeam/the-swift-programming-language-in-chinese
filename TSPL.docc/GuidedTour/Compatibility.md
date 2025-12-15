# Version Compatibility

Learn what functionality is available in older language modes.

This book describes Swift 6.2.3,
the default version of Swift that's included in Xcode 26.2.
You can use the Swift 6.2.3 compiler to build code
that's written in Swift 6.2.3, Swift 5, Swift 4.2, or Swift 4.

When you use the Swift 6.2.3 compiler
to build code that uses the Swift 5 language mode,
you can use the new features from Swift 6.2.3 ---
they're enabled either by default or by an upcoming feature flag.
However, to enable strict concurrency checking,
you need to upgrade to the Swift 6.2.3 language mode.

In addition,
when you use Xcode 15.3 to build Swift 4 and Swift 4.2 code,
most Swift 5 functionality is still available.
That said,
the following changes are available only to code
that uses the Swift 5 language mode:

- Functions that return an opaque type require the Swift 5.1 runtime.
- The `try?` expression doesn't introduce an extra level of optionality
  to expressions that already return optionals.
- Large integer literal initialization expressions are inferred
  to be of the correct integer type.
  For example, `UInt64(0xffff_ffff_ffff_ffff)` evaluates to the correct value
  rather than overflowing.

Concurrency requires the Swift 5 language mode
and a version of the Swift standard library
that provides the corresponding concurrency types.
On Apple platforms, set a deployment target
of at least iOS 13, macOS 10.15, tvOS 13, watchOS 6, or visionOS 1.

A target written in Swift 6.2.3 can depend on
a target that's written in Swift 5, Swift 4.2 or Swift 4,
and vice versa.
This means, if you have a large project
that's divided into multiple frameworks,
you can migrate your code to a newer language version
one framework at a time.

<!--
This source file is part of the Swift.org open source project

Copyright (c) 2014 - 2022 Apple Inc. and the Swift project authors
Licensed under Apache License v2.0 with Runtime Library Exception

See https://swift.org/LICENSE.txt for license information
See https://swift.org/CONTRIBUTORS.txt for the list of Swift project authors
-->
