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


Strings
-------

.. refnote:: From the Guided Tour:

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


String Interpolation
--------------------

.. refnote:: From the Guided Tour:

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
