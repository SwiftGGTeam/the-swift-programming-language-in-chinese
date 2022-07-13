This repository contains a version of “The Swift Programming Language”
that can be built using Swift DocC.

The version of “The Swift Programming Language” published on docs.swift.org
is currently built using a legacy toolchain,
not from this repository.
Our goal is to replace that version with a version built from this repository,
working with the community to extend Swift DocC where needed.

# Contributing

For small changes,
like typo fixes and changes to a few paragraphs,
fork this repository and make a pull request.

For larger changes,
start a pitch thread in the [Swift forums][forum]
to discuss the approach and possible issues
before you invest a lot of time writing.
Because changes in this repository
must be manually ported back to the published version,
expect a very high bar for large changes.

Discussions and contributions follow the [Swift Code of Conduct][conduct].

[forum]: https://forums.swift.org/c/swift-book
[conduct]: https://www.swift.org/code-of-conduct

<!-- FIXME: The 'forum' link above is speculative -->

# Building

1. Install [Swift DocC](https://github.com/apple/swift-docc).

1. Run `docc preview` in this repository.

1. Open the link to <http://localhost:8000/> that `docc` prints,
   to view the local preview.
