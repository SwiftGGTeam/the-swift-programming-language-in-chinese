Language Guide
==============

.. container:: docdescription

	**Overview**

	The Language Guide will provide a complete guide to all aspects of the language and standard library. It will have the following structure:

	* a one-chapter tour of the key features of the language and standard library, introducing key concepts through brief worked examples
	* a number of chapters, each covering one of the key themes and its sub-themes in more detail through a progressive disclosure narrative with worked examples
	* a chapter (or chapters) covering Swift’s integration with Objective-C and Cocoa

	In addition to covering the language structure and standard library, the Language Guide will describe the preferred formatting style for Swift code, including naming conventions and standard statement structures. It will suggest good practice for writing and structuring Swift code throughout.

	The Language Guide aims to cover every aspect of the language to at least some degree. However, it should not enforce absolute completeness of coverage if this is at the expense of narrative disclosure and the reader’s willingness to progress and learn. Where completeness is better served by a reference work, the Language Guide will point readers to the appropriate section of the :doc:`Reference Manual`.

	The Language Guide and Reference Manual are not obliged to follow the same logical structure or grouping. The Language Guide aims to introduce developers to the language, and will introduce concepts in the most appropriate order for progressive disclosure and discovery. This may or may not be the same structure that best suits a reference work. Where consistency of structure is appropriate, it is to be encouraged; however, it should not be enforced if it is to the detriment of each section’s primary purpose.

	The book’s aim is to introduce the language to developers, rather than to describe the detail of its creation. It will not look ‘behind the scenes’,and neither section of the book will cover the Swift compiler, the Swift Intermediate Language (SIL), or the Swift lexer and type checker.


.. container:: docdescription

	**Overlap between the Language Guide and Reference Manual**

	The Language Guide aims to cover every aspect of the language to at least some degree. However, it should not enforce absolute completeness of coverage if this is at the expense of narrative disclosure and the reader’s willingness to progress and learn. Where completeness is better served by a reference work, the Language Guide will point readers to the appropriate section of the :doc:`Reference Manual`.

	The Language Guide and Reference Manual are not obliged to follow the same logical structure or grouping. The Language Guide aims to introduce developers to the language, and will introduce concepts in the most appropriate order for progressive disclosure and discovery. This may or may not be the same structure that best suits a reference work. Where consistency of structure is appropriate, it is to be encouraged; however, it should not be enforced if it is to the detriment of each section’s primary purpose.

	The book’s aim is to introduce the language to developers, rather than to describe the detail of its creation. It will not look ‘behind the scenes’,and neither section of the book will cover the Swift compiler, the Swift Intermediate Language (SIL), or the Swift lexer and type checker.


.. container:: docdescription

	**Voice and style**

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