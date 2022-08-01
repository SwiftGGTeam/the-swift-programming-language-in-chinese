# The Swift Programming Language

This repository contains a version of “The Swift Programming Language”
that you can build using Swift-DocC.

The version of “The Swift Programming Language” published on docs.swift.org
was built using a legacy toolchain,
not from this repository or its content.
The goal is to replace that version with a version built from this repository,
working with the community to extend Swift-DocC where needed.

## Contributing

For small changes,
like typo fixes and changes to a few paragraphs,
fork this repository and make a pull request.

A formal contribution process for this document is still being developed.
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
[forum]: https://forums.swift.org/c/swift-book
[tsyl-style]: /Style.md

<!-- FIXME The 'forum' link above is speculative -->

<!-- TODO Confirm that the link to TSPL's style guide works in prod -->

## Building

1. If you don’t have a Swift toolchain installed,
   install [Swift-DocC](https://github.com/apple/swift-docc).

1. Run `docc preview` in this repository.

1. Open the link to <http://localhost:8000/> that `docc` prints
   to view the local preview.
