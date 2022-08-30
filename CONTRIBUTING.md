# Contributing to *The Swift Programming Language* book

By submitting a pull request,
you represent that you have the right to license your contribution
to Apple and the community,
and agree by submitting the patch
that your contributions are licensed under
the [Swift license](https://swift.org/LICENSE.txt).

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

[asg]: https://help.apple.com/applestyleguide/
[forum]: https://forums.swift.org/c/development/swift-docc/80
[tspl-style]: /Style.md

## Submitting a pull request

Use the following steps when creating a new pull request:

1. Create a local fork of this repository with your changes.
2. Test that your changes build locally by running `swift package plugin generate-documentation --target TSPL --transform-for-static-hosting`.
3. Create a pull request in this repository.
4. Add @amartini51 and @krilnon as reviewers.
5. Confirm that your changes build in CI by commenting `@swift-ci please test` on your pull request.
