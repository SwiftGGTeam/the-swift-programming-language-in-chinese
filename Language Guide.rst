Language Guide
==============

.. docnote:: Overview

	The Language Guide will provide a complete guide to all aspects of the language and standard library. It will have the following structure:

	* a one-chapter tour of the key features of the language and standard library, introducing key concepts through brief worked examples
	* a number of chapters, each covering one of the key themes and its sub-themes in more detail through a progressive disclosure narrative with worked examples
	* a chapter (or chapters) covering Swift’s integration with Objective-C and Cocoa

	In addition to covering the language structure and standard library, the Language Guide will describe the preferred formatting style for Swift code, including naming conventions and standard statement structures. It will suggest good practice for writing and structuring Swift code throughout.

	The Language Guide aims to cover every aspect of the language to at least some degree. However, it should not enforce absolute completeness of coverage if this is at the expense of narrative disclosure and the reader’s willingness to progress and learn. Where completeness is better served by a reference work, the Language Guide will point readers to the appropriate section of the :doc:`Reference Manual`.

	The Language Guide and Reference Manual are not obliged to follow the same logical structure or grouping. The Language Guide aims to introduce developers to the language, and will introduce concepts in the most appropriate order for progressive disclosure and discovery. This may or may not be the same structure that best suits a reference work. Where consistency of structure is appropriate, it is to be encouraged; however, it should not be enforced if it is to the detriment of each section’s primary purpose.

	The book’s aim is to introduce the language to developers, rather than to describe the detail of its creation. It will not look ‘behind the scenes’,and neither section of the book will cover the Swift compiler, the Swift Intermediate Language (SIL), or the Swift lexer and type checker.


.. docnote:: Overlap between the Language Guide and Reference Manual

	The Language Guide aims to cover every aspect of the language to at least some degree. However, it should not enforce absolute completeness of coverage if this is at the expense of narrative disclosure and the reader’s willingness to progress and learn. Where completeness is better served by a reference work, the Language Guide will point readers to the appropriate section of the :doc:`Reference Manual`.

	The Language Guide and Reference Manual are not obliged to follow the same logical structure or grouping. The Language Guide aims to introduce developers to the language, and will introduce concepts in the most appropriate order for progressive disclosure and discovery. This may or may not be the same structure that best suits a reference work. Where consistency of structure is appropriate, it is to be encouraged; however, it should not be enforced if it is to the detriment of each section’s primary purpose.

	The book’s aim is to introduce the language to developers, rather than to describe the detail of its creation. It will not look ‘behind the scenes’,and neither section of the book will cover the Swift compiler, the Swift Intermediate Language (SIL), or the Swift lexer and type checker.


.. docnote:: Voice and style

	The Language Guide will have a conversational style. It will be friendly but not too personal. It will be written as a continuing narrative, starting each subject with a simple code example, and building further complexity into the same example until it is no longer the best way to illustrate the current subject, or until the subject changes sufficiently as to require a different example.

	*Humor*

	Humor will be allowed within this conversational style, but not simply for humor’s sake. In most cases, this humor will be gently introduced through appropriate choices of example code within the text, although never at the expense of clarity.

	*Terms and concepts*

	Every new term and concept will be introduced and defined the first time it is used, even if it is a common programming term. We will not assume that readers know what a tuple (or even an array) is typically used for. This enables newer developers to pick up the language if they are not familiar with existing terminology. It also provides an opportunity to position the choice of terminology used in Swift, and to describe how Swift’s use of that terminology differs from the same term’s use in other languages. Notably, where Swift uses terminology not found in Objective-C (such as vectors and closures), this gives an opportunity to compare and contrast the Swift language with the terms that the reader has previously encountered.

	Terms that are first encountered in the Language Guide’s one-chapter tour will be introduced or defined as briefly as is appropriate in the tour. A more complete definition will follow in a subsequent chapter, where that concept is covered in more detail.

	*Code examples*

	The Language Guide will make use of code examples throughout the text. These are intended to be example code (as opposed to sample code). This distinction is a subtle one, but important. The scope of each example is self-contained, and while they will follow Swift best practices, they are not intended to fulfill the same purpose as (say) a WWDC sample code project. They are deliberately short in scope, and exist primarily to illustrate the concepts as an aid to progressive learning disclosure, rather than to provide a reference guide as to how to code that particular concept in Swift. They may also satisfy this second criterion; however, it is not their primary purpose.

	Wherever possible, code examples will be written with the intent of being human-parseable on a first read by anyone who has been following the book until that point. This will be achieved through an appropriate use of descriptive naming conventions and structure (rather than code comments) wherever possible.

	All code examples in the electronic edition of The Swift Programming Language will be displayed with syntax coloring, and this coloring will match how the code will be displayed when entered in Xcode.

	Every code example will show its output for a given sample input (or set of inputs), to aid the reader in understanding its functionality in practice.

	*Exercises*

	The Language Guide will include exercises for the reader within its narrative chapters. These exercises will be included as appropriate at the end of logical sections of each chapter, and not just at the end of the chapter itself. Each exercise will encourage the reader to experiment with and build upon the concepts within that section of the chapter. It will be possible to complete these exercises without the need for the reader to refer to new concepts that have yet to be introduced.

	Standard answers for every exercise will be written as part of the book’s creation. For the book’s electronic edition, these will be made available as part of the Swift playground system. For the printed book, the standard answers will be made available as part of an accompanying source code download file, to be hosted on Apple servers.


A Tour of the Swift Language
----------------------------

* Basic grammar structure
* Braces, semicolons and whitespace
* Comments
* Lack of header files
* Introduction to the core concepts from the chapters below

Basic types
-----------

* Declaration syntax
* Naming conventions
* Integer types
* Floating point types
* Bool
* Void
* No suffixes for integers / floats
* Lack of promotion and truncation
* Lazy initialization
* A brief mention of characters and strings
* Tuples
* Enums
* Enum element patterns
* Typealiases
* Type inference
* Type casting through type initializers
* Metatypes and static functions on types
* Optional types
* Pattern binding
* Literals

.. docnote:: Metatypes and static functions

	Is this the right section for metatypes and static functions? My understanding (from an initial reading) is that they are roughly analogous to class methods in Objective-C, but can be implemented on any type; however, this may be a slightly over-complex concept for this early in the book.

Operators and expressions
-------------------------

* Arithmetic operators
* Relational and equality operators
* Short circuiting logical operators
* Expressions
* The ‘is’ pattern

Strings and characters
----------------------

* String literals
* Substrings and iteration
* String encoding and Unicode support
* String interpolation
* printf() and string formatting

.. docnote:: Strings and characters

	I've given string definition and manipulation its own chapter, as it's such a fundamental thing that developers do all the time, and we have a lot of flexibility to cover.

Generics
--------

* Vector
* Array
* Dictionary
* (any other generics from the Standard Library)
* Typing of generics
* Working with subscripts
* Creating generic functions, classes etc.
* Delayed Identifier Resolution

.. docnote:: Generics

	I've given generics their own chapter, as the ability to define one's own generics (in addition to the library-provided ones) is such a powerful part of Swift. I've also included Delayed Identifier Resolution here, as it feels conceptually like part of Swift's ability to deal with types in a generic way.

Control flow
------------

* Conditional branching (if)
* Looping (while, do while, for, for in)
* Iterators
* Switch statement (including pattern matching)
* Control transfer (return, break, continue, fallthrough)

.. docnote:: Control flow

	Some aspects of control flow will already have been introduced before this chapter as part of the language tour. I'm envisaging that the basic flow control introduced in that chapter will provide enough flexibility to get us through the chapters on types, operators, strings and generics, before going into much more detail on all the possibilities here.

Functions and closures
----------------------

* Functions
* Function signatures (including pattern matching)
* Naming conventions
* Closures
* Trailing closures
* Nested closures
* Capturing values
* Different closure expression forms
* Anonymous closure arguments
* Thick and thin functions (?)
* Attributes (infix, resilience, inout, auto_closure, noreturn)

.. docnote:: Functions and closures

	I've grouped functions and closures into a single chapter, as they are so closely interlinked (and frequently interchangeable) in Swift. This also gives us a good opportunity to discuss when it is best to use each approach.

Classes, objects and structures
-------------------------------

* Classes
* Objects
* Structures
* Instance variables
* Getters and setters
* Constructors and destructors
* Instance and class methods
* Working with self and Self
* Super
* Memory management

.. docnote:: Objects and structs

	I've grouped ``object`` and ``struct`` together because they are very similar in Swift, at least in practice. This enables me to cover how they *do* differ in practice – something which has the potential to trip people up – and to discuss Swift's approach to passing by value and by reference in more detail.

Extensions
----------

* Extending classes and structures

Protocols
---------

* Definition of protocols
* Adoption of protocols
* Standard protocols (Equatable etc.)
* Default implementations of methods
* Protocol compositions

.. docnote:: Extensions and protocols

	I'm wondering whether extensions and protocols should be combined into a single chapter.

Standard functions
------------------

* find()
* min()
* max()
* map()
* swap()
* sort()
* etc.

.. docnote:: Standard functions vs Standard Library

	I deliberately haven't referred to this as the ‘Standard Library’, for reasons mentioned previously. However, this does beg the question: are there enough standard functions to warrant a stand-alone (and potentially rather dry) chapter? Should some of these (find, swap, sort, map) be covered under Generics, and others (min, max) under Basic Types instead?

Interacting with Objective-C
----------------------------

* Compatibility with Objective-C (and related C) basic data types
* Importing modules
* Working with Objective-C classes, methods and properties
* id compatibility
* Inheriting Objective-C classes
* Objective-C protocols
* Objective-C containers, structures and enums
* Initializing Objective-C objects
* Extending Objective-C types
* Working with Objective-C selectors
* Dot syntax
* Blocks, and how they relate to closures
* Importing Objective-C macros
* Overloading and selectors
* Relationship to message send syntax


.. docnote:: Things I haven't yet found a good home for

	* ``import``
	* Name binding
	

.. docnote:: Things I deliberately haven't included in the Language Guide (which may or may not be correct)

	* AppKit
	* Integration with Interface Builder
	* Concurrency