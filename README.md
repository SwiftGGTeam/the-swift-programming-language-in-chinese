# The Swift Programming Language

This repository contains a version of *The Swift Programming Language*
that you can build using Swift-DocC.

The version of *The Swift Programming Language* published on docs.swift.org
is currently built using a legacy toolchain,
not from this repository or its content.
The goal is to replace that version with a version built from this repository,
working with the community to extend Swift-DocC where needed.

## Contributing

For small changes,
like typo fixes and changes to a few paragraphs,
fork this repository and make a pull request.

A formal contribution process for this document is still in development.
In the meantime,
start a thread in the [Swift forums][forum] for larger changes
to discuss the approach and possible issues
before you invest a lot of time in writing.

Content in this book follows [Apple Style Guide][asg]
and [this book’s style guide][tspl-style].

File bugs about the content using the [issues page][bugs] on Github.

Discussions and contributions follow the [Swift Code of Conduct][conduct].

[asg]: https://help.apple.com/applestyleguide/
[bugs]: https://github.com/apple/swift-book/issues
[conduct]: https://www.swift.org/code-of-conduct
[forum]: https://forums.swift.org/c/development/swift-docc/80
[tspl-style]: /Style.md

## Building

If you have Xcode installed,
run `xcrun docc preview` in this repository.

If you have a Swift toolchain installed,
or if you installed [Swift-DocC](https://github.com/apple/swift-docc) directly,
run `docc preview` in this repository.

After running DocC,
open the link that `docc` outputs for the local preview.
