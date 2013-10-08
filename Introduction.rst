Introduction
============

.. docnote:: Introduction authoring and attribution

	This section will be an introduction from the language’s authors, positioning why the language has been created (and how it relates to other languages), together with a statement of its overall design goals and principles.
   
.. refnote:: Language Reference: Basic Goals

	In no particular order, and not explained well:

	1. Support building great frameworks and applications, with a specific focus on permiting rich and powerful APIs.
	2. Get the defaults right: this reduces the barrier to entry and increases the odds that the right thing happens.
	3. Through our support for building great APIs, we aim to provide an expressive and productive language that is fun to program in.
	4. Support low-level system programming.  We should want to write compilers, operating system kernels, and media codecs in Swift.  This means that being able to obtain high performance is really quite important.
	5. Provide really great tools, like an IDE, debugger, profiling, etc.
	6. Where possible, steal great ideas instead of innovating new things that will work out in unpredictable ways.  It turns out that there are a lot of good ideas already out there.
	7. Memory safe by default: array overrun errors, uninitialized values, and other problems endemic to C should not occur in Swift, even if it means some amount of runtime overhead.  Eventually these checks will be disablable for people who want ultimate performance in production builds.
	8. Efficiently implementable with a static compiler: runtime compilation is great technology and Swift may eventually get a runtime optimizer, but it is a strong goal to be able to implement swift with just a static compiler.
	9. Interoperate as transparently as possible with C, Objective-C, and C++ without having to write an equivalent of "extern C" for every referenced definition.
	10. Great support for efficient by-value types.
	11. Elegant and natural syntax, aiming to be familiar and easy to transition to for "C" people.  Differences from the C family should only be done when it provides a significant win (e.g. eliminate declarator syntax).
	12. Lots of other stuff too.
  
	A smaller wishlist goal is to support embedded sub-languages in swift, so that we don't get the OpenCL-is-like-C-but-very-different-in-many-details problem.

.. refnote:: Language Reference: Basic Approach

	The basic approach in designing and implementing the Swift prototype was to start at the very bottom of the stack (simple expressions and the trivial bits of the type system) and incrementally build things up one brick at a time.  There is a big focus on making things as simple as possible and having a clean internal core.  Where it makes sense, sugar is added on top to make the core more expressive for common situations.
	
	One major aspect that dovetails with expressivity, learnability, and focus on API development is that much of the language is implemented in a standard library (inspired in part by the Haskell Standard Prelude).  This means that things like 'Int' and 'Void' are not part of the language itself, but are instead part of the standard library.

	Pushing as much of the language as realistic out of the compiler and into the library is generally good for a few reasons: 1) we end up with a smaller core language.  2) we force the language that is left to be highly expressive and extensible.  3) this highly expressive language core can then be used to build a lot of other great libraries, hopefully many we can't even anticipate at this point.

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
