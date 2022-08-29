# The Swift Programming Language

This repository contains a version of *The Swift Programming Language*
that you can build using Swift-DocC.

The version of *The Swift Programming Language* published on docs.swift.org
is currently built using a legacy toolchain,
not from this repository or its content.
The goal is to replace that version with a version built from this repository,
working with the community to extend Swift-DocC where needed.

## Contributing

For now,
we’re expecting most pull requests to be enhancements and bug fixes
to support the Swift-DocC publication,
with only minor content changes.

For small changes,
like typo fixes and changes to a few paragraphs,
fork this repository and make a pull request.

A formal contribution process for this document is still in development.
In the meantime,
start a thread in the [Swift forums][forum] for larger changes
to discuss your approach and identify possible issues
before you invest a lot of time in writing.

Content in this book follows [Apple Style Guide][asg]
and [this book’s style guide][tspl-style].

File bugs about the content using the [issues page][bugs] on Github.

Discussions and contributions follow the [Swift Code of Conduct][conduct].

For more information, see [Contributing to The Swift Programming Language][contributing].

[asg]: https://help.apple.com/applestyleguide/
[bugs]: https://github.com/apple/swift-book/issues
[conduct]: https://www.swift.org/code-of-conduct
[contributing]: /CONTRIBUTING.md
[forum]: https://forums.swift.org/c/development/swift-docc/80
[tspl-style]: /Style.md

## Building

Run `swift package --disable-sandbox preview-documentation --target TSPL`
in this repository's root directory.

After running DocC, open the link that `docc` outputs
to display a local preview in your browser.
