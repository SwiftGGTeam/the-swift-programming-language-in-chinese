Strings and characters
======================

.. docnote:: Strings and characters

	I've given string definition and manipulation its own chapter, as it's such a fundamental thing that developers do all the time, and we have a lot of flexibility to cover.

.. docnote:: Subjects to be covered in this section

	* String literals
	* Substrings and iteration
	* String encoding and Unicode support
	* String interpolation
	* printf() and string formatting

.. refnote:: Types and Values: Char

	Swift aims to have full `Unicode <http://en.wikipedia.org/wiki/Unicode>`_ 
	support "out of the box".  As such, the ``Char`` type holds a full `UTF-32
	<http://en.wikipedia.org/wiki/UTF-32>`_ code point, and is thus 32 bits in size.
	Character literals use single quotes and support standard escape sequences::

	  var a = 'a'
	  var b = '\n'
	  var c = '\\'

	TODO: Describe the operations on Char here.

	**Rationale:** We carefully considered whether to make Char be a 16-bit value
	(like Cocoa's ``unichar`` type, Java's character, and many other systems).
	UTF-16 was rapidly adopted early on in Unicode's life because it provides a
	fixed size encoding and was very simple.

	Since then, Unicode has grown to the point where some Unicode characters (e.g.
	Emoji) do not fit in a 16-bit encoding, thus requiring two 16-bit elements to
	represent (using a so-called "surrogate pair").  This means that UTF-16 is
	actually a variable width encoding (like UTF-8).  In practice, applications that
	target systems with 16-bit character very frequently ignore the complexity of
	UTF-16, and are thus mishandle these high characters (e.g., see the long tail of
	bugs handling Emoji on these systems).

	For this (and other) reasons many language implementors that chose UTF-16 regret
	the decision, and we settled on a combination of UTF-8 for ``String`` with
	UTF-32 for ``Char``.  If you are interested in more details, `this blog post
	<http://unspecified.wordpress.com/2012/04/19/the-importance-of-language-level-abstract-unicode-strings/>`_
	has a great description of the issues.

.. refnote:: Types and Values: String

	``String`` is the builtin datatype in Swift for text manipulation. Among other
	things, it supports concatenation, subscripting, and enumeration::

	  (swift) var x = "hello world"
	  // x : String = "hello world"
	  (swift) var y = x + "!\n"
	  // y : String = "hello world!\n"
	  (swift) y[6]
	  // Char = 'w'
	  (swift) for c in "hey".chars { println(c) }
	  h
	  e
	  y

	``String`` is fully Unicode enabled, encoded in `UTF-8 
	<http://en.wikipedia.org/wiki/UTF-8>`_ and is immutable.  Subscripting into a
	String returns a ``Char``, which is a full UTF-32 codepoint.  String does not
	transparently handle combining characters by returning a grapheme cluster,
	though a higher level API could be added to do this.

	``String`` itself is actually a value that represents a slice (pointer+range)
	into a shared string representation.  This means that substring/slicing
	operations are constant time (requiring no copying of character data) in time
	and space.  They use the Swift-standard syntax of subscripting with a half-open
	range::

	  (swift) y[2..5]
	  // String = "llo"
	  (swift) y[6..11]
	  // String = "world"

	Powerful and efficient string manipulation facilities are a strong goal of
	Swift.  We do not support regular expressions yet, but we fully intend to add
	them.

	**Rationale:** Full Unicode support is incredibly important to have built into
	the language from the starting point.  See the rationale for ``Char`` for more
	details on this design.

.. refnote:: Guided Tour: Strings

	Because strings are such a common and essential part of any codebase, they are built right into Swift as a native datatype.  Swift strings are designed with natural and expressive syntax, to be fast and memory efficient, and to maintain transparent interoperation with Cocoa APIs and ``NSString``.

	Swift string literals use double-quote marks, like this::

		(swift) var firstWord = "Hello"
		// firstWord : String = "Hello"
		(swift) 

	The standard operators are supported for string concatenation::

		(swift) var message = firstWord + ", world"
		// message : String = "Hello, world"
		(swift) message += "!"
		(swift) message
		// String = Hello, world!
		(swift) 

	and you can refer to a substring, or slice, using a character range::

		(swift) var name = message[7..12]
		// name : String = "world"
		(swift) 

	Swift strings are immutable, which means we can make string slicing extremely efficient in terms of memory and processor cycles. Rather than having to copy the substring characters to a new memory location, the slice simply refers to a sub-range from the original string:

	.. image:: /images/swiftStringAndSlice.png
	   :width: 30em
	   :align: center

	Continuing with the theme of efficiency, Swift strings are encoded internally as UTF-8, keeping storage compact. When iterating over the characters in a string, Swift decodes UTF-8 on the fly to produce a sequence of ``Char`` values (each of which holds a UTF-32 codepoint), making it easy to work with multi-byte characters, for example::

		(swift) var emoji = "🙉😈😄👏"
		// emoji : String = "🙉😈😄👏"
		(swift) for eachChar in emoji.chars {
				  println(eachChar)
				}
		🙉 
		😈
		😄
		👏
		(swift) emoji.length
		// Int = 4
		(swift) 

	You can also iterate by lines::

		(swift) var multiline = "Once upon a time\nThe end"
		(swift) for eachLine in multiline.lines {
				  println(eachLine)
				}
		Once upon a time
		The end
		(swift) 

	or even by bytes::

		(swift) var singleEmoji = "🙉"
		// singleEmoji : String = "🙉" 
		(swift) for eachByte in singleEmoji.bytes {
				  println(Int64(eachByte))
				}
		240
		159
		153
		137
		(swift) 

.. refnote:: Guided Tour: String Interpolation

	You've already seen various ways to construct a Swift string, including concatenating substrings using ``+``:

	.. code-block:: swift

		var message = "Hello" + ", world" + "!"

	If you need to append string representations of other types, you can construct a Swift string from a value::

		(swift) var someValue = 42
		// someValue : Int = 42
		(swift) var magic = "The magic number is: " + String(someValue) + "!"
		// magic : String = "The magic number is: 42!"
		(swift) 

	Interpolating values into strings is such a common task, however, that Swift provides an alternative, more readable syntax::

		(swift) var blackMagic = "The magic number is: \(someValue)!"
		// blackMagic : String = "The magic number is: 42!"
		(swift) 

	You can also use this syntax to interpolate the values of arbitrary expressions::

		(swift) var luckyForSome = 13
		luckyForSome : Int = 13
		(swift) var addMessage = "Adding \(luckyForSome) to \(someValue) gives \(luckyForSome + someValue)"
		addMessage : String = "Adding 13 to 42 gives 55"
		(swift) 

	Rather than requiring you to think about how best to format a value every time you want to insert it into a string, it's up to the developer of the original type to provide an implementation for the string conversion. This involves adding a suitable constructor to the Swift ``String`` type through the use of an extension, as discussed later in this tour (see Extensions).

	For more power and flexibility, the Swift standard library also provides a type-safe ``printf()`` function::

		(swift) printf("Take %v and sell it for $%.2v", 42, 3.14159)
		Take 42 and sell it for $3.14159
		(swift)
