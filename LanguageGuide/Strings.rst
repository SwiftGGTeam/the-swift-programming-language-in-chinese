Strings and Characters
======================

A :newTerm:`string` is an ordered collection of characters,
such as ``"hello, world"`` or ``"albatross"``.
Swift strings are represented by the ``String`` type,
which is a collection of multiple ``Character`` values in a defined order.
Any ``String`` can be iterated as a collection
to retrieve each of its ``Character`` member values in turn.

Strings
-------

.. write-me::

.. note::

   Swift's ``String`` type is bridged seamlessly to Objective-C's ``NSString`` class.
   If you are working with the Foundation framework in Cocoa or Cocoa Touch,
   the entire ``NSString`` API is available to call on any ``String`` value you create,
   in addition to the ``String`` features described in this chapter.
   You can also use a ``String`` value with any API that requires an ``NSString`` instance.
   
   For more information about using ``String`` with Foundation and Cocoa,
   see *Building Cocoa Apps With Swift*.

.. TODO: make this be a link to BCAWS.

.. QUESTION: This chapter is the only time I talk in detail about bridging in the Guide.
   Is this okay to do?

Strings are Value Types in Swift
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Swift's ``String`` type is a *value type*.
This means that if you create a new ``String`` value,
that ``String`` value is *copied* when it is passed to a function or method,
or when it is assigned to a constant or variable.
In each case, a new copy of the existing ``String`` value is created,
and the new copy is passed or assigned, rather than the original version.
(Value types are described in :ref:`ClassesAndStructures_ValueTypesAndReferenceTypes`.)

.. note::

   This behavior is different to ``NSString`` in Cocoa.
   When you create an ``NSString`` instance in Cocoa,
   and pass it to a function or method or assign it to a variable,
   you are always passing or assigning a *reference* to the same single ``NSString``.
   No copying of the string takes place, unless you specifically request it.

Swift's copy-by-default ``String`` behavior
matches the way that strings are used in code in practice.
When a function or method passes you a ``String`` value,
it is clear that you own that exact ``String`` value,
regardless of where it came from.
You can be confident that the string you are passed will not be modified
unless you modify it yourself.

Behind the scenes, Swift's compiler optimizes string usage
so that actual copying only takes place when absolutely necessary.
This ensures that you always get great performance
when working with strings as value types within your code.

.. TODO: talk about what this means for bridging to NSString,
   and how the semantics for working with NSString
   relate to the default value semantics used by String.

String Mutability
~~~~~~~~~~~~~~~~~

In Objective-C and Cocoa,
you choose between two classes (``NSString`` and ``NSMutableString``)
to determine whether a string is allowed to be modified (or *mutated*).
Swift does not have this distinction.
Instead, you indicate whether a particular ``String`` can be modified
by assigning it to a variable (in which case it can be modified),
or to a constant (in which case it cannot be modified):

.. testcode:: stringMutability

   -> var variableString = "Mary had"
   << // variableString : String = "Mary had"
   -> variableString += " a little lamb"
   /> variableString is now \"\(variableString)\"
   </ variableString is now "Mary had a little lamb"
   ---
   -> let constantString = "its fleece was"
   << // constantString : String = "its fleece was"
   -> constantString += " white as snow"
   !! <REPL Input>:1:16: error: expression does not type-check
   !! constantString += " white as snow"
   !! ~~~~~~~~~~~~~~~^~~~~~~~~~~~~~~~~~~
   // this reports a compile-time error - a constant string cannot be modified

String Literals
~~~~~~~~~~~~~~~

You can include fixed ``String`` values within your code as :newTerm:`string literals`.
String literals are a sequence of textual characters
surrounded by a pair of double quotes (``""``),
and can be used to provide an initial value for a constant or variable:

.. testcode:: stringLiterals

   -> let someString = "Some string literal value"
   << // someString : String = "Some string literal value"

Note that Swift infers a type of ``String`` for the ``someString`` constant,
because it is initialized with a string literal value.

Special Characters in String Literals
_____________________________________

String literals can include the following special characters:

* The escaped special characters ``\0`` (null character), ``\\`` (backslash),
  ``\t`` (horizontal tab), ``\n`` (line feed), ``\r`` (carriage return),
  ``\"`` (double quote) and ``\'`` (single quote)
* Two-byte Unicode code points, written as ``\xnn``,
  where ``nn`` is two hexadecimal digits
* Four-byte Unicode code points, written as ``\unnnn``,
  where ``nnnn`` is four hexadecimal digits
* Eight-byte Unicode code points, written as ``\Unnnnnnnn``,
  where ``nnnnnnnn`` is eight hexadecimal digits

For example:

.. testcode:: specialCharacters

   -> let wiseWords = "\"Imagination is more important than knowledge\" - Einstein"
   << // wiseWords : String = "\"Imagination is more important than knowledge\" - Einstein"
   >> println(wiseWords)
   </ "Imagination is more important than knowledge" - Einstein
   -> let dollarSign = "\x24"        // $,  Unicode code point U+0024
   << // dollarSign : String = "$"
   -> let blackHeart = "\u2665"      // ♥,  Unicode code point U+2665
   << // blackHeart : String = "♥"
   -> let swiftHeart = "\U0001F496"  // 💖, Unicode code point U+1F496
   << // swiftHeart : String = "💖"

.. what about SNOWMAN WITHOUT SNOW?
   Unicode: U+26C4 U+FE0F, UTF-8: E2 9B 84 EF B8 8F
   U+FE0F is the unicode variation selector.
.. x how to construct a Character from a single-quote character literal
.. x how to construct an empty Character

Initializing an Empty String
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you need to create an empty ``String`` value as the starting point
for building a longer string,
you can do so by assigning an empty string literal to a variable,
or by initializing a new ``String`` with initialization syntax:

.. testcode:: emptyStrings

   -> var emptyString = ""               // empty string literal
   << // emptyString : String = ""
   -> var anotherEmptyString = String()  // initialization syntax
   << // anotherEmptyString : String = ""
   // these two strings are both empty, and are equivalent to each other

.. QUESTION: I've made both of these variables,
   because you'd be likely to use them as such if they start out empty.
   Is this the correct approach to take here?

Characters
----------

.. write-me::

.. x the Character type (handwavey for now as to what it means in Unicode terms)

String and Character Concatenation
----------------------------------

``String`` and ``Character`` values can be concatenated with the addition operator (``+``)
to create a new ``String`` value:

.. testcode:: emptyStrings

   -> let string1 = "hello"
   << // string1 : String = "hello"
   -> let string2 = " there"
   << // string2 : String = " there"
   -> let character1: Character = "!"
   << // character1 : Character = <unprintable value>
   -> let character2: Character = "?"
   << // character2 : Character = <unprintable value>
   ---
   -> let stringPlusCharacter = string1 + character1        // equals "hello!"
   << // stringPlusCharacter : String = "hello!"
   -> let stringPlusString = string1 + string2              // equals "hello there"
   << // stringPlusString : String = "hello there"
   -> let characterPlusString = character1 + string1        // equals "!hello"
   << // characterPlusString : String = "!hello"
   -> let characterPlusCharacter = character1 + character2  // equals "!?"
   << // characterPlusCharacter : String = "!?"

You can also append a ``String`` or ``Character`` onto
an existing ``String`` variable with the addition assignment operator (``+=``):

.. testcode:: emptyStrings

   -> var instruction = "look over"
   << // instruction : String = "look over"
   -> instruction += string2
   /> instruction now equals \"\(instruction)\"
   </ instruction now equals "look over there"
   ---
   -> var welcome = "good morning"
   << // welcome : String = "good morning"
   -> welcome += character1
   /> welcome now equals \"\(welcome)\"
   </ welcome now equals "good morning!"

.. note::

   You can't append a ``String`` or ``Character`` onto an existing ``Character`` variable,
   because a ``Character`` value can only ever be one character long.

.. x adding two Strings / a String and a Character / two Characters to make a String
.. x appending a String or a Character onto a String
.. x how to construct from length and Character (cf Array)

String Interpolation
--------------------

.. write-me::

Strings as a Collection of Characters
-------------------------------------

.. write-me::

.. x iterating over a String
.. x String is a collection of Characters
.. x countElements(someString) to get the number of Characters in a String, *not* length
.. x explain the difference between String's Characters, and NSString's UTF-16 code unit length

Comparing Strings
-----------------

.. write-me::

.. x equivalence for String in Swift (right now)
.. x isEmpty property for == ""

Slicing Strings
---------------

.. write-me::

.. slicing a String (based on a good example to come from Dave)
.. String can't be indexed with integers (again, cf NSString)
.. bidirectional indexing (and why this is the case)

String Functions and Methods
----------------------------

.. write-me::

.. .split()
.. .startsWith() and .endsWith()
.. uppercaseString and lowercaseString??
.. will Character have an uppercase and lowercase method?
.. other generic functions from Collection
   Reverse / reverse()?
   Reverse is a type that you can construct from a Collection that has a BidirectionalIndex
   startIndex
   endIndex
   subscript
.. isAlpha() - on Character too?
.. isDigit() - on Character too?
.. isSpace() - on Character too? Don't mention these three until after the second API meeting.
.. init from other types to print their values (do we cover this?)
.. toInt()
.. substr()
.. splitFirst()
.. splitFirstIf()
.. splitIf()