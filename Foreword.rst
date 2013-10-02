Foreword
========

.. docnote:: Foreword authoring and attribution

   The foreword is an introduction from the language’s authors, positioning why the language has been created (and how it relates to other languages), together with a statement of its overall design goals and principles.
   
.. refnote:: Major Design Influences

	*Principle: Safe*

	TODO, not yet written:
	Must not require direct pointers to memory, and must use automatic memory management, so it is easy to create secure, stable software.

	*Principle: High Performance*

	TODO, not yet written:
	Runtime performance should be predictable and consistently faster than code written in Objective-C, approaching that of C.  The simplest way to write a common design pattern should result in the fastest executing program.

	*Principle: Access to hardware*

	TODO, not yet written:
	To be used as a systems language like C or Objective-C, must offer an unsafe mode to allow direct access to hardware (e.g. device drivers.)  Must run efficiently on multiple architectures, including ARM and x86.

	*Principle: Efficient calling to C and Objective-C*

	TODO, not yet written:
	Must include a robust, complete standard library to perform most low-level operations. When needing to access C or Objective-C platform APIs, the syntax must feel native, with excellent performance.

	*Principle: Modern*

	TODO, not yet written:
	Must be enjoyable to use, have a clean syntax, include a robust
	Consistent

	*Influence: C Inspired Syntax*

	While Swift is not a C-*derived* language like Objective-C or C++ - which
	are (mostly) compatible extensions to C - Swift is definitely *inspired* by
	C, and we want it to syntactically feel like a member of the same family of
	languages as C, Objective-C, Javascript, Java, C#, etc.  While these languages
	all differ quite a lot in their implementation and semantics, they have many
	commonalities, including basic expression structure, control flow statements,
	and their "semicolons and curly braces" nature.

	This is an influence because we want obviously want it to be similar to
	Objective-C, but also because we want it to be easy for programmers in these
	other communities to come to Swift.  Notably, Java and Javascript are two
	extremely common programming languages taught in Universities over the last 15+
	years, so there is a large base of programmers who are familiar with this class
	of languages, many of whom have not made the leap to Objective-C.

	Beyond the C family of languages, Swift is also influenced by a wide variety of
	other languages, including Haskell, Ruby, Python, and many others.
	While these languages have a large influence on Swift in various ways, it is a
	non-goal to follow their syntactic structure.

	*Goal: Design for Great Developer Tools*

	We want a REPL, great debugger, indexer, source editor, refactoring, etc.

	*Goal: Common Coding Style*

	Though the compiler does not enforce it, we would like Swift code in general to
	follow common coding style.  This includes capitalization of identifiers and
	general formatting of code.

	We generally follow the Objective-C standard, including capitalized type names,
	lower case variables, etc.  Even builtin datatypes like "``Int``",
	"``Float``", and "``String``" are capitalized to encourage uniformity.
