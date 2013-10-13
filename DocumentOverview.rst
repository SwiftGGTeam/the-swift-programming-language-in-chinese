Document Overview
=================

Introduction
------------

Developer Publications are creating a new book called *The Swift Programming Language*, to help with the adoption of Swift. A first edition of the complete book will be made available at WWDC 2014. An overview of its structure and purpose is provided below.

Please send any comments on this book to Dave Addey (`dave.addey@apple.com <mailto:dave.addey@apple.com?subject=The%20Swift%20Programming%20Language%20book>`_), Senior Writer, Developer Publications.


The Swift Programming Language
------------------------------

This book will be Swift’s equivalent of `The C Programming Language <http://en.wikipedia.org/wiki/The_C_Programming_Language>`_ – i.e. the canonical work on the language, its syntax, and its standard library of functions.

Structure
---------

`The Swift Programming Language` will be split into three parts:

* an :doc:`Introduction` positioning why the language has been created (and how it relates to other languages), together with a statement of its overall design goals and principles;
* a :doc:`LanguageGuide/LanguageGuide`, introducing the language and standard library through code examples and exercises; and
* a complete :doc:`ReferenceManual/ReferenceManual` for the language and standard library.

Language Guide
~~~~~~~~~~~~~~

The Language Guide will provide a complete guide to all aspects of the language and standard library. It will have the following structure:

* a one-chapter tour of the key features of the language and standard library, introducing key concepts through brief worked examples
* a number of chapters, each covering one of the key themes and its sub-themes in more detail through a progressive disclosure narrative with worked examples
* a chapter (or chapters) covering Swift’s integration with Objective-C and Cocoa

In addition to covering the language structure and standard library, the Language Guide will describe the preferred formatting style for Swift code, including naming conventions and standard statement structures. It will suggest good practice for writing and structuring Swift code throughout.

Reference Manual
~~~~~~~~~~~~~~~~

The Reference Manual will provide a complete reference to every aspect of the language and its standard library. Although it is a reference work, it is still intended to be fully human-readable. It is intended as a reference work for programmers, not for compiler authors (for whom the language’s actual specification – not included in this book – is the primary work).

Overlap between the Language Guide and Reference Manual
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The Language Guide aims to cover every aspect of the language to at least some degree. However, it should not enforce absolute completeness of coverage if this is at the expense of narrative disclosure and the reader’s willingness to progress and learn. Where completeness is better served by a reference work, the Language Guide will point readers to the appropriate section of the Reference Manual.

The Language Guide and Reference Manual are not obliged to follow the same logical structure or grouping. The Language Guide aims to introduce developers to the language, and will introduce concepts in the most appropriate order for progressive disclosure and discovery. This may or may not be the same structure that best suits a reference work. Where consistency of structure is appropriate, it is to be encouraged; however, it should not be enforced if it is to the detriment of each section’s primary purpose.

The book’s aim is to introduce the language to developers, rather than to describe the detail of its creation. It will not look ‘behind the scenes’, and neither section of the book will cover the Swift compiler, the Swift Intermediate Language (SIL), or the Swift lexer and type checker.

Audience
--------

The audience for `The Swift Programming Language` is very broad. It includes:

* developers who have created a single iOS app in Objective-C, and are only vaguely aware of its principles and structure
* developers who have been coding in Objective-C for some years, and are confident and comfortable with its syntax and principle
* developers from other languages who are considering Swift as a language to learn, in order to undertake iOS or Mac development
* students who are studying Swift as part of their education or degree

Given this breadth of audience, the book will have to introduce programming concepts at a slightly more fundamental level than, say, `The C++ Programming Language <http://en.wikipedia.org/wiki/The_C%2B%2B_Programming_Language>`_ (which can assumes reasonable fluency in C). We should certainly not assume that the reader is proficient in C (or even Objective-C); however, I suggest that we assume that they have at least some programming experience in another language.

I propose we adopt the same approach as *The C Programming Language*:

	“The book is not an introductory programming manual; it assumes some familiarity with basic programming concepts like variables, assignment statements, loops, and functions. Nonetheless, a novice programmer should be able to read along and pick up the language, although access to a more knowledgeable colleague will help.”

Purpose
-------

`The Swift Programming Language` has a dual role:

1. It is the definitive reference work to the Swift language and standard library
2. It is the language reference work for anyone looking to undertake development for Apple platforms, specifically iOS and OS X

There are tensions between these two roles. Swift is tightly integrated with Cocoa and other Apple frameworks, but it is not dependent upon their presence. It exists as a language outside of its use for Apple development, and does not need to be used with Apple technologies. However, this is an Apple-published book, and is being created by Apple primarily to enable developers to adopt Apple’s new preferred language in order to develop for Apple technologies.

It is for this reason that I have positioned the chapter (or chapters) on Swift’s integration with Objective-C and Cocoa after the chapters on the language and standard library. In theory, the book could be published without this additional material as a stand-alone reference with no Apple-specific context. (However, this is not something I believe we intend to do in the immediate future.)

`The Swift Programming Language` is not intended to act as a migration guide for developers moving their code from Objective-C to Swift, and a separate document will be created to serve this purpose. Wherever possible, The Swift Programming Language will be written in such a way that it is a timeless description of the language and standard library, rather than a document that has been created specifically for WWDC 2014.

Where appropriate, the Language Guide may describe how Swift’s use of particular concepts is similar to or different from other languages. This will, however, primarily focus on its relationship to Objective-C, as this is the language with which we expect many readers to have at least some familiarity.

Core language vs standard library
---------------------------------

One of the design principles of Swift is that the language and its standard library are very tightly integrated. To this end, `The Swift Programming Language` will not differentiate between the two within either the Language Guide or Reference Manual sections. Rather, it will introduce the concepts developers need from both sources in the order that is most useful for learning and comprehension.

Voice and style
---------------

The two top-level sections of the book will each be written with a consistent voice within that section. While the two sections will also aim for overall consistency, they each serve quite different purposes, and as such should not enforce unity of voice if it is to the detriment of clarity of communication given each section’s purpose.

Language Guide
~~~~~~~~~~~~~~
	
The Language Guide will have a conversational style. It will be friendly but not too personal. It will be written as a continuing narrative, starting each subject with a simple code example, and building further complexity into the same example until it is no longer the best way to illustrate the current subject, or until the subject changes sufficiently as to require a different example.

Humor
^^^^^

Humor will be allowed within this conversational style, but not simply for humor’s sake. In most cases, this humor will be gently introduced through appropriate choices of example code within the text, although never at the expense of clarity.

Terms and concepts
^^^^^^^^^^^^^^^^^^

Every new term and concept will be introduced and defined the first time it is used, even if it is a common programming term. We will not assume that readers know what a tuple (or even an array) is typically used for. This enables newer developers to pick up the language if they are not familiar with existing terminology. It also provides an opportunity to position the choice of terminology used in Swift, and to describe how Swift’s use of that terminology differs from the same term’s use in other languages. Notably, where Swift uses terminology not found in Objective-C (such as vectors and closures), this gives an opportunity to compare and contrast the Swift language with the terms that the reader has previously encountered.

Terms that are first encountered in the Language Guide’s one-chapter tour will be introduced or defined as briefly as is appropriate in the tour. A more complete definition will follow in a subsequent chapter, where that concept is covered in more detail.

Code examples
^^^^^^^^^^^^^

The Language Guide will make use of code examples throughout the text. These are intended to be *example* code (as opposed to *sample* code). This distinction is a subtle one, but important. The scope of each example is self-contained, and while they will follow Swift best practices, they are not intended to fulfill the same purpose as (say) a WWDC sample code project. They are deliberately short in scope, and exist primarily to illustrate the concepts as an aid to progressive learning disclosure, rather than to provide a reference guide as to how to code that particular concept in Swift. They may also satisfy this second criterion; however, it is not their primary purpose.

Wherever possible, code examples will be written with the intent of being human-parseable on a first read by anyone who has been following the book until that point. This will be achieved through an appropriate use of descriptive naming conventions and structure (rather than code comments) wherever possible.

All code examples in the electronic edition of `The Swift Programming Language` will be displayed with syntax coloring, and this coloring will match how the code will be displayed when entered in Xcode.

Every code example will show its output for a given sample input (or set of inputs), to aid the reader in understanding its functionality in practice.

Exercises
^^^^^^^^^

The Language Guide will include exercises for the reader within its narrative chapters. These exercises will be included as appropriate at the end of logical sections of each chapter, and not just at the end of the chapter itself. Each exercise will encourage the reader to experiment with and build upon the concepts within that section of the chapter. It will be possible to complete these exercises without the need for the reader to refer to new concepts that have yet to be introduced.

Standard answers for every exercise will be written as part of the book’s creation. For the book’s electronic edition, these will be made available as part of the Swift playground system. For the printed book, the standard answers will be made available as part of an accompanying source code download file.

Reference Manual
----------------

The Reference Manual’s prose style will be based around short, succinct statements of fact, rather than a flowing narrative. Its aim is brevity of definition, together with clarity and lack of ambiguity. It will be complete, and will include tables and reference charts where these are the best way to provide this completeness.