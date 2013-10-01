Contents
========

.. toctree::
	:maxdepth: 2

	Foreword
	LanguageGuide
	ReferenceManual


.. docnote:: Positioning Statement

	This book will be Swift’s equivalent of `The C Programming Language <http://en.wikipedia.org/wiki/The_C_Programming_Language>`_ – i.e. the canonical work on the language, its syntax, and its standard library of functions.


.. docnote:: Structure

	`The Swift Programming Language` will be split into three parts:
	
	* an introductory :doc:`Foreword` from the language’s authors, positioning why the language has been created (and how it relates to other languages), together with a statement of its overall design goals and principles;
	* a :doc:`LanguageGuide`, introducing the language and standard library through code examples and exercises; and
	* a complete :doc:`ReferenceManual` for the language and standard library.


.. docnote:: Audience

	The audience for `The Swift Programming Language` is very broad. It includes:

	* developers who have created a single iOS app in Objective-C, and are only vaguely aware of its principles and structure
	* developers who have been coding in Objective-C for some years, and are confident and comfortable with its syntax and principle
	* developers from other languages who are considering Swift as a language to learn, in order to undertake iOS or Mac development
	* students who are studying Swift as part of their education or degree

	Given this breadth of audience, the book will have to introduce programming concepts at a slightly more fundamental level than, say, `The C++ Programming Language <http://en.wikipedia.org/wiki/The_C%2B%2B_Programming_Language>`_ (which can assumes reasonable fluency in C). We should certainly not assume that the reader is proficient in C (or even Objective-C); however, I suggest that we assume that they have at least some programming experience in another language.

	I propose we adopt the same approach as *The C Programming Language*:

		“The book is not an introductory programming manual; it assumes some familiarity with basic programming concepts like variables, assignment statements, loops, and functions. Nonetheless, a novice programmer should be able to read along and pick up the language, although access to a more knowledgeable colleague will help.”


.. docnote:: Purpose

	`The Swift Programming Language` has a dual role:

	1. It is the definitive reference work to the Swift language and standard library, including if that language is open-sourced at some point in the future
	2. It is the language reference work for anyone looking to undertake development for Apple platforms, specifically iOS and OS X

	There are tensions between these two roles. Swift is tightly integrated with Cocoa and other Apple frameworks, but it is not dependent upon their presence. It exists as a language outside of its use for Apple development, and does not need to be used with Apple technologies. However, this is an Apple-published book, and is being created by Apple primarily to enable developers to adopt Apple’s new preferred language in order to develop for Apple technologies.

	It is for this reason that I have positioned the chapter (or chapters) on Swift’s integration with Objective-C and Cocoa after the chapters on the language and standard library. In theory, the book could be published without this additional material as a stand-alone reference with no Apple-specific context. (However, this is not something I believe we intend to do in the immediate future.)

	`The Swift Programming Language` is not intended to act as a migration guide for developers moving their code from Objective-C to Swift, and a separate document will be created to serve this purpose. Wherever possible, The Swift Programming Language will be written in such a way that it is a timeless description of the language and standard library, rather than a document that has been created specifically for WWDC 2014.

	Where appropriate, the :doc:`LanguageGuide` may describe how Swift’s use of particular concepts is similar to or different from other languages. This will, however, primarily focus on its relationship to Objective-C, as this is the language with which we expect many readers to have at least some familiarity.


.. docnote:: Core language vs standard library

	One of the design principles of Swift is that the language and its standard library are very tightly integrated. To this end, `The Swift Programming Language` will not differentiate between the two within either the :doc:`LanguageGuide` or :doc:`ReferenceManual` sections. Rather, it will introduce the concepts developers need from both sources in the order that is most useful for learning and comprehension.


.. docnote:: Voice and style

	The two top-level sections of the book will each be written with a consistent voice within that section. While the two sections will also aim for overall consistency, they each serve quite different purposes, and as such should not enforce unity of voice if it is to the detriment of clarity of communication given each section’s purpose.