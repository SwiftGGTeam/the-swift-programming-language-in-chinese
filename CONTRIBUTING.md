# Contributing to *The Swift Programming Language* book

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

[asg]: https://help.apple.com/applestyleguide/
[bugs]: https://github.com/apple/swift-book/issues
[conduct]: https://www.swift.org/code-of-conduct
[forum]: https://forums.swift.org/c/development/swift-docc/80
[tspl-style]: /Style.md

## Submitting a pull request

Use the following steps when creating a new pull request:

- Create a local fork of this repo with your changes.
- Test that your changes build locally with `swift package plugin generate-documentation --target TSPL --transform-for-static-hosting`.
- Create a pull request in this repo.
- Add @amartini51 and @krilnon as reviewers.
- Check that your changes build in CI by commenting with request "@swift-ci please test"."
