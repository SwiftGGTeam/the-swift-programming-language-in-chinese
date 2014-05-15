Strings and Characters
======================

Swift's ``String`` and ``Character`` types provide
a fast, Unicode-compliant way to work with text in your code.
The syntax for string creation and manipulation is lightweight and readable,
with a similar syntax to C strings.
String concatenation is as simple as
adding together two strings with the ``+`` operator,
and string mutability is managed by choosing between a constant or a variable,
just like any other value in Swift.

Despite this simplicity of syntax,
Swift's ``String`` type is a fast, modern string implementation.
Every string is composed of encoding-independent Unicode characters,
and provides support for accessing those characters in various Unicode representations.

Strings can also be used to insert
constants, variables, literals, and expressions into longer strings,
in a process known as string interpolation.
This makes it easy to create custom string values for display, storage, and printing.

.. _StringsAndCharacters_Strings:

Strings
-------

A :newTerm:`string` is an ordered collection of characters,
such as ``"hello, world"`` or ``"albatross"``.
Swift strings are represented by the ``String`` type,
which in turn represents a collection of ``Character`` values.

.. note::

   Swift's ``String`` type is bridged seamlessly to Objective-C's ``NSString`` class.
   If you are working with the Foundation framework in Cocoa or Cocoa Touch,
   the entire ``NSString`` API is available to call on any ``String`` value you create,
   in addition to the ``String`` features described in this chapter.
   You can also use a ``String`` value with any API that requires an ``NSString`` instance.
   
   For more information about using ``String`` with Foundation and Cocoa,
   see *Building Cocoa Apps With Swift*.

.. TODO: make this be a link to BCAWS.

.. _StringsAndCharacters_Literals:

String Literals
~~~~~~~~~~~~~~~

You can include pre-defined ``String`` values within your code as :newTerm:`string literals`.
A string literal is a fixed sequence of textual characters
surrounded by a pair of double quotes (``""``),
and can be used to provide an initial value for a constant or variable:

.. testcode:: stringLiterals

   -> let someString = "Some string literal value"
   << // someString : String = "Some string literal value"

Note that Swift infers a type of ``String`` for the ``someString`` constant,
because it is initialized with a string literal value.

.. _StringsAndCharacters_SpecialCharactersInStringLiterals:

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

.. _StringsAndCharacters_InitializingAnEmptyString:

Initializing an Empty String
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you need to create an empty ``String`` value as the starting point
for building a longer string,
you can do so by assigning an empty string literal to a variable,
or by initializing a new ``String`` with initializer syntax:

.. testcode:: emptyStrings

   -> var emptyString = ""               // empty string literal
   << // emptyString : String = ""
   -> var anotherEmptyString = String()  // initializer syntax
   << // anotherEmptyString : String = ""
   // these two strings are both empty, and are equivalent to each other

.. QUESTION: I've made both of these variables,
   because you'd be likely to use them as such if they start out empty.
   Is this the correct approach to take here?

You can check whether a ``String`` value is empty
by calling its ``isEmpty`` method:

.. testcode:: emptyStrings

   -> if emptyString.isEmpty() {
         println("Nothing to see here")
      }
   <- Nothing to see here

.. TODO: init(size, character)

.. _StringsAndCharacters_StringMutability:

String Mutability
~~~~~~~~~~~~~~~~~

You indicate whether a particular ``String`` can be modified (or *mutated*)
by assigning it to a variable (in which case it can be modified),
or to a constant (in which case it cannot be modified):

.. testcode:: stringMutability

   -> var variableString = "Horse"
   << // variableString : String = "Horse"
   -> variableString += " and carriage"
   /> variableString is now \"\(variableString)\"
   </ variableString is now "Horse and carriage"
   ---
   -> let constantString = "Highlander"
   << // constantString : String = "Highlander"
   -> constantString += " and another Highlander"
   !! <REPL Input>:1:16: error: could not find an overload for '+=' that accepts the supplied arguments
   !! constantString += " and another Highlander"
   !! ~~~~~~~~~~~~~~~^~~~~~~~~~~~~~~~~~~~~~~~~~~~
   // this reports a compile-time error - a constant string cannot be modified

.. note::

   This approach is different from Objective-C and Cocoa,
   where you choose between two classes (``NSString`` and ``NSMutableString``)
   to indicate whether a string can be mutated.

.. _StringsAndCharacters_StringsAreValueTypes:

Strings are Value Types
~~~~~~~~~~~~~~~~~~~~~~~

Swift's ``String`` type is a *value type*.
This means that if you create a new ``String`` value,
that ``String`` value is *copied* when it is passed to a function or method,
or when it is assigned to a constant or variable.
In each case, a new copy of the existing ``String`` value is created,
and the new copy is passed or assigned, not the original version.
(Value types are described in :ref:`ClassesAndStructures_ValueTypesAndReferenceTypes`.)

.. note::

   This behavior is different from ``NSString`` in Cocoa.
   When you create an ``NSString`` instance in Cocoa,
   and pass it to a function or method or assign it to a variable,
   you are always passing or assigning a *reference* to the same single ``NSString``.
   No copying of the string takes place, unless you specifically request it.

Swift's copy-by-default ``String`` behavior means that
when a function or method passes you a ``String`` value,
it is clear that you own that exact ``String`` value,
regardless of where it came from.
You can be confident that the string you are passed will not be modified
unless you modify it yourself.

Behind the scenes, Swift's compiler optimizes string usage
so that actual copying only takes place when absolutely necessary.
This ensures that you always get great performance
when working with strings as value types.

.. _StringsAndCharacters_Characters:

Characters
----------

Individual characters are represented in Swift by the ``Character`` type,
which represents a single Unicode character.
You can access the individual ``Character`` values in a string
by iterating over that string with a ``for``-``in`` loop:

.. testcode:: characters

   -> for character in "Dog!🐶" {
         println(character)
      }
   </ D
   </ o
   </ g
   </ !
   </ 🐶

The ``for``-``in`` loop is described in :ref:`ControlFlow_ForLoops`.

You can also create a stand-alone ``Character`` constant or variable
from a single-character string literal by providing a ``Character`` type annotation:

.. testcode:: characters

   -> let yenSign: Character = "¥"
   << // yenSign : Character = <unprintable value>

.. _StringsAndCharacters_StringAndCharacterConcatenation:

String and Character Concatenation
----------------------------------

``String`` and ``Character`` values can be added together (or *concatenated*)
with the addition operator (``+``) to create a new ``String`` value:

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

You can also append a ``String`` or ``Character`` value onto
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

.. TODO: how to construct from length and Character (cf Array)

.. _StringsAndCharacters_StringInterpolation:

String Interpolation
--------------------

String interpolation enables you to construct a new ``String`` value
from a mix of constants, variables, literals, and expressions
by including their values inside a string literal.
Each item that you insert into the string literal is wrapped in
a pair of parentheses, prefixed by a backslash:

.. testcode:: stringInterpolation

   -> let multiplier = 3
   << // multiplier : Int = 3
   -> let message = "\(multiplier) times 2.5 is \(Double(multiplier) * 2.5)"
   << // message : String = "3 times 2.5 is 7.5"
   /> message is \"\(message)\"
   </ message is "3 times 2.5 is 7.5"

In the example above,
the value of ``multiplier`` is inserted into a string literal as ``\(multiplier)``.
This placeholder is replaced with the actual value of ``multiplier``
when the string interpolation is evaluated to create an actual string.

The value of ``multiplier`` is also used as part of a larger expression later in the string.
This expression calculates the value of ``Double(multiplier) * 2.5``,
and inserts the result (``7.5``) into the string.
In this case, the expression is written as ``\(Double(multiplier) * 2.5)``
when it is included inside the string literal.

.. note::

   The expressions you write inside parentheses within an interpolated string
   cannot contain an unescaped double quote (``"``) or backslash (``\``),
   and cannot contain a carriage return or line feed.

.. _StringsAndCharacters_StringInitializersForStringInterpolation:

String Initializers for String Interpolation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Any value that you use with string interpolation must be of a type that can be used
to initialize a new ``String`` instance.
In the example above, the first interpolated value (``multiplier``) is an ``Int``,
and the second interpolated value (``Double(multiplier) * 2.5``) equates to a ``Double``.
Both of these types can be used to construct a ``String`` value,
and so the interpolation is valid.

.. note::

   If you want to make your own custom types available for use with string interpolation,
   you can extend ``String`` to give it a new initializer that takes
   an instance of your custom type. This process is described in :doc:`Extensions`.

.. _StringsAndCharacters_CharacterCount:

Character Count
---------------

Swift's ``String`` type represents a collection of ``Character`` values in a specified order.
Each of these ``Character`` values represents a single Unicode character.
You can retrieve a count of these characters by calling
the global ``countElements`` function,
and passing in a string as the function's sole parameter:

.. testcode:: characterCount

   -> let unusualMenagerie = "Koala 🐨, Snail 🐌, Penguin 🐧, Dromedary 🐪"
   << // unusualMenagerie : String = "Koala 🐨, Snail 🐌, Penguin 🐧, Dromedary 🐪"
   -> println("unusualMenagerie has \(countElements(unusualMenagerie)) characters")
   <- unusualMenagerie has 40 characters

.. note::

   Different Unicode characters, and different representations of the same character,
   can require different amounts of memory to store.
   Because of this, characters in Swift do not each take up
   the same amount of memory within a string's representation.
   As a result, the length of a string cannot be calculated
   without iterating through the string to consider each of its characters in turn.
   If you are working with particularly long string values,
   be aware that the ``countElements`` function will need to
   iterate over the characters within a string
   in order to calculate an accurate character count for that string.

   Note also that the character count returned by ``countElements``
   will not always be the same as the ``length`` property of
   an ``NSString`` that contains the same characters.
   The length of an ``NSString`` is based on
   the number of 16-bit code units within the string's UTF-16 representation,
   and not the number of Unicode characters within the string.

.. _StringsAndCharacters_ComparingStrings:

Comparing Strings
-----------------

Swift provides three ways to compare ``String`` values.
These are string equality, prefix equality, and suffix equality.

.. _StringsAndCharacters_StringEquality:

String Equality
~~~~~~~~~~~~~~~

Two ``String`` values are considered equal if they contain
exactly the same characters in the same order:

.. testcode:: stringEquality

   -> let quotation = "We're a lot alike, you and I."
   << // quotation : String = "We\'re a lot alike, you and I."
   -> let sameQuotation = "We're a lot alike, you and I."
   << // sameQuotation : String = "We\'re a lot alike, you and I."
   -> if quotation == sameQuotation {
         println("These two strings are considered equal")
      }
   <- These two strings are considered equal

.. _StringsAndCharacters_PrefixAndSuffixEquality:

Prefix and Suffix Equality
~~~~~~~~~~~~~~~~~~~~~~~~~~

You can check if a string has a particular string prefix or suffix
by calling the string's ``hasPrefix`` and ``hasSuffix`` methods,
both of which take a single argument of type ``String`` and return a Boolean value.
Both methods perform a character-by-character comparison
between the base string and the prefix or suffix string.

The examples below consider an array of strings representing
the scene locations from the first two acts of Shakespeare's *Romeo and Juliet*:

.. testcode:: prefixesAndSuffixes

   -> let romeoAndJuliet = [
         "Act 1 Scene 1: Verona, A public place",
         "Act 1 Scene 2: Capulet's mansion",
         "Act 1 Scene 3: A room in Capulet's mansion",
         "Act 1 Scene 4: A street outside Capulet's mansion",
         "Act 1 Scene 5: The Great Hall in Capulet's mansion",
         "Act 2 Scene 1: Outside Capulet's mansion",
         "Act 2 Scene 2: Capulet's orchard",
         "Act 2 Scene 3: Outside Friar Lawrence's cell",
         "Act 2 Scene 4: A street in Verona",
         "Act 2 Scene 5: Capulet's mansion",
         "Act 2 Scene 6: Friar Lawrence's cell"
      ]
   << // romeoAndJuliet : Array<String> = ["Act 1 Scene 1: Verona, A public place", "Act 1 Scene 2: Capulet\'s mansion", "Act 1 Scene 3: A room in Capulet\'s mansion", "Act 1 Scene 4: A street outside Capulet\'s mansion", "Act 1 Scene 5: The Great Hall in Capulet\'s mansion", "Act 2 Scene 1: Outside Capulet\'s mansion", "Act 2 Scene 2: Capulet\'s orchard", "Act 2 Scene 3: Outside Friar Lawrence\'s cell", "Act 2 Scene 4: A street in Verona", "Act 2 Scene 5: Capulet\'s mansion", "Act 2 Scene 6: Friar Lawrence\'s cell"]

You can use the ``hasPrefix`` method with the ``romeoAndJuliet`` array
to count the number of scenes in Act 1 of the play:

.. testcode:: prefixesAndSuffixes

   -> var act1SceneCount = 0
   << // act1SceneCount : Int = 0
   -> for scene in romeoAndJuliet {
         if scene.hasPrefix("Act 1 ") {
            ++act1SceneCount
         }
      }
   -> println("There are \(act1SceneCount) scenes in Act 1")
   <- There are 5 scenes in Act 1

Similarly, you can use the ``hasSuffix`` method to count the number of scenes
that take place in or around Capulet's mansion and Friar Lawrence's cell:

.. testcode:: prefixesAndSuffixes

   -> var mansionCount = 0
   << // mansionCount : Int = 0
   -> var cellCount = 0
   << // cellCount : Int = 0
   -> for scene in romeoAndJuliet {
         if scene.hasSuffix("Capulet's mansion") {
            ++mansionCount
         } else if scene.hasSuffix("Friar Lawrence's cell") {
            ++cellCount
         }
      }
   -> println("\(mansionCount) mansion scenes; \(cellCount) cell scenes")
   <- 6 mansion scenes; 2 cell scenes

.. _StringsAndCharacters_UppercaseAndLowercase:

Uppercase and Lowercase
-----------------------

You can access an uppercase or lowercase version of a string
with its ``uppercaseString`` and ``lowercaseString`` properties:

.. testcode:: uppercaseAndLowercase

   -> let normal = "Could you help me, please?"
   << // normal : String = "Could you help me, please?"
   -> let shouty = normal.uppercaseString
   << // shouty : String = "COULD YOU HELP ME, PLEASE?"
   /> shouty is equal to \"\(shouty)\"
   </ shouty is equal to "COULD YOU HELP ME, PLEASE?"
   -> let whispered = normal.lowercaseString
   << // whispered : String = "could you help me, please?"
   /> whispered is equal to \"\(whispered)\"
   </ whispered is equal to "could you help me, please?"

.. _StringsAndCharacters_Unicode:

Unicode
-------

:newTerm:`Unicode` is an international standard for encoding and representing text.
It provides a way to represent almost any character from any language in a standardized form,
and to read and write those characters to and from an external source
such as a text file or web page.

Swift's ``String`` and ``Character`` types are fully Unicode-compliant,
and support a number of different Unicode encodings, as described below.

.. _StringsAndCharacters_UnicodeTerminology:

Unicode Terminology
~~~~~~~~~~~~~~~~~~~

Every character in Unicode can be represented by one or more :newTerm:`code points`.
A code point is an unique 21-bit number (and name) for a character or modifier,
such as ``U+0061`` for ``LOWERCASE LATIN LETTER A`` (``a``),
or ``U+1F425`` for ``FRONT-FACING BABY CHICK`` (``🐥``).

When a Unicode string is written to a text file or some other storage,
these code points are encoded in one of several Unicode-defined formats.
Each of these formats encodes the string in small chunks known as :newTerm:`code units`.
These include the UTF-8 format (which encodes a string as 8-bit code units),
and the UTF-16 format (which encodes a string as 16-bit code units).

.. _StringsAndCharacters_UnicodeRepresentationsOfStrings:

Unicode Representations of Strings
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Swift provides four different ways to decompose a ``String`` value into smaller units.

Firstly, you can iterate over the string with a ``for``-``in`` statement,
to access its individual ``Character`` values as Unicode characters.
This process is described in :ref:`StringsAndCharacters_Characters`.

Alternatively, you can access a ``String`` value
in one of three other Unicode-compliant representations:

* A collection of UTF-8 code units (accessed with the string's ``utf8`` property)
* A collection of UTF-16 code units (accessed with the string's ``utf16`` property)
* A collection of 21-bit Unicode scalar values
  (accessed with the string's ``unicodeScalars`` property)

Each of the three examples below shows a different representation of the following string,
which is made up of the characters ``D``, ``o``, ``g``, ``!``,
and the 🐶 character (``DOG FACE``, or Unicode code point ``U+1F436``):

.. testcode:: unicodeRepresentations

   -> let dogString = "Dog!🐶"
   << // dogString : String = "Dog!🐶"

.. _StringsAndCharacters_UTF8:

UTF-8
_____

You can access a UTF-8 representation of a ``String``
by iterating over its ``utf8`` property.
This property is of type ``UTF8View``,
which is a collection of unsigned 8-bit (``UInt8``) values,
one for each byte in the string's UTF-8 representation:

.. testcode:: unicodeRepresentations

   -> for codeUnit in dogString.utf8 {
         print("\(codeUnit) ")
      }
   -> print("\n")
   </ 68 111 103 33 240 159 144 182

In the example above, the first four decimal ``codeUnit`` values
(``68``, ``111``, ``103``, ``33``)
represent the characters ``D``, ``o``, ``g``, and ``!``,
whose UTF-8 representation is the same as their ASCII representation.
The last four ``codeUnit`` values (``240``, ``159``, ``144``, ``182``)
are a four-byte UTF-8 representation of the 🐶 character.

.. TODO: contiguousUTF8()

.. TODO: nulTerminatedUTF8()
   (which returns a NativeArray, but handwave this for now)

.. _StringsAndCharacters_UTF16:

UTF-16
______

You can access a UTF-16 representation of a ``String``
by iterating over its ``utf16`` property.
This property is of type ``UTF16View``,
which is a collection of unsigned 16-bit (``UInt16``) values,
one for each 16-bit code unit in the string's UTF-16 representation:

.. testcode:: unicodeRepresentations

   -> for codeUnit in dogString.utf16 {
         print("\(codeUnit) ")
      }
   -> print("\n")
   </ 68 111 103 33 55357 56374

Again, the first four ``codeUnit`` values
(``68``, ``111``, ``103``, ``33``)
represent the characters ``D``, ``o``, ``g``, and ``!``,
whose UTF-16 code units have the same values as in the string's UTF-8 representation.

The fifth and sixth ``codeUnit`` values (``55357`` and ``56374``)
are a UTF-16 surrogate pair representation of the 🐶 character.
In UTF code point terms, these values are
a lead surrogate value of ``U+D83D`` (decimal value ``55357``),
and a trail surrogate value of ``U+DC36`` (decimal value ``56374``).

.. _StringsAndCharacters_UnicodeScalars:

Unicode Scalars
_______________

The third and final Unicode representation of a ``String``
enables you to access the string as a collection of Unicode scalars.
A Unicode scalar is any 21-bit Unicode code point that is not
a lead surrogate or trail surrogate code point.

You can access a Unicode scalar representation of a ``String`` value
by iterating over its ``unicodeScalars`` property.
This property is of type ``UnicodeScalarView``,
which is a collection of values of type ``UnicodeScalar``.

Each ``UnicodeScalar`` has a ``value`` property that returns
the scalar's 21-bit code point, represented within a ``UInt32`` value:

.. testcode:: unicodeRepresentations

   -> for scalar in dogString.unicodeScalars {
         print("\(scalar.value) ")
      }
   -> print("\n")
   </ 68 111 103 33 128054

.. FIXME: at the time of writing,
   the ``unicodeScalars`` property actually returns a ``UTF16Scalars``,
   which needs to be renamed to ``UnicodeScalarView``.
   This is being tracked in rdar://16821900.

The ``value`` property for the first four ``UnicodeScalar`` values
(``68``, ``111``, ``103``, ``33``)
once again represent the characters ``D``, ``o``, ``g``, and ``!``.
The ``value`` property of the fifth and final ``UnicodeScalar``, ``128054``,
is a decimal equivalent of the hexadecimal value ``1F436``,
which is equivalent to the Unicode code point ``U+1F436``, or 🐶.

As an alternative to querying their ``value`` properties,
each ``UnicodeScalar`` value can also be used to construct a new ``String`` value,
such as with string interpolation:

.. testcode:: unicodeRepresentations

   -> for scalar in dogString.unicodeScalars {
         println("\(scalar) ")
      }
   </ D 
   </ o 
   </ g 
   </ ! 
   </ 🐶 
