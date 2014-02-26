.. docnote:: Subjects to be covered in this section

    * Declaration syntax ✔︎
    * Multiple variable declarations and initializations on one line:
    * var i = 1; var j = 2; print(i + j)
    * var k = 1, l = 2
    * …but not… var m, n = 2
    * Naming conventions ✔︎
    * Integer types ✔︎
    * Floating-point types ✔︎
    * infinity and -infinity
    * Bool ✔︎
    * Void
    * No suffixes for integers / floats ✔︎
    * Lazy initialization
    * A brief mention of characters and strings
    * Tuples ✔︎
    * Varargs tuples
    * Typealiases ✔︎
    * Type inference ✔︎
    * Type casting through type initializers ✔︎
    * Arrays
    * Optional types ✔︎
    * Pattern binding
    * Literals ✔︎
    * Immutability
    * (Don't redeclare objects within a REPL session)
    * min and max for integers ✔︎

Basic Types
===========

Swift provides several basic types for working with fundamental values.
Some of these types will be familiar to C and Objective-C developers:

* :newTerm:`Numbers` (including integers and floating-point numbers)
* :newTerm:`Booleans` (for values that can only be true or false)
* :newTerm:`Arrays` (for ordered lists of values)
* :newTerm:`Dictionaries` (for collections of values that can be referenced
  and looked up via an unique identifier or “key”)

Although these types may be familiar,
Swift expands their capabilities beyond what is possible in other languages.

In addition to these simple types,
Swift incorporates some less familiar (but very powerful) advanced types:

* arbitrary groups of values of different types (known as :newTerm:`tuples`)
* types that can be either a known value or a missing value (known as :newTerm:`optionals`)

Each of these types, and the ways in which they can be used,
are discussed in more detail below.

Swift also provides a powerful and flexible way to create and work with string and character types.
These are introduced below, and are discussed in more detail in :doc:`Strings`.

.. _BasicTypes_NamedValues:

Named Values
------------

.. QUESTION: Do we need to have introduced the REPL
   (or some other learning environment) before starting this section?

Before describing the types themselves,
it is important to understand how they are used to create new values
and to refer to these values in your code.
This section introduces the concept of :newTerm:`named values`,
which give a way to store and pass around specific values by name.

A named value is a way to store a particular value
(such as the number ``42``, or the string ``"hello"``)
and refer to it with a name of your choosing.
Swift provides two types of named values:

* :newTerm:`constant named values`, also known as :newTerm:`constants`, and
* :newTerm:`variable named values`, also known as :newTerm:`variables`

A constant has a fixed value that cannot be changed once it is set,
whereas a variable can be set to a different value in the future.

All named values must be declared before they are used.
Constants are declared using the ``val`` keyword,
and variables are declared using the ``var`` keyword.
Here's an example of how constants and variables could be used
to track the number of login attempts a user has made:

.. testcode:: namedValues

    (swift) val maximumNumberOfLoginAttempts = 10
    // maximumNumberOfLoginAttempts : Int = 10
    (swift) var currentLoginAttempt = 0
    // currentLoginAttempt : Int = 0

This can be read as:

“Declare a new constant called ``maximumNumberOfLoginAttempts``,
and give it a value of ``10``.
Then, declare a new variable called ``currentLoginAttempt``,
and give it an initial value of ``0``.”

The maximum number of allowed login attempts is declared as a constant,
because that maximum value never changes.
The current login attempt counter is declared as a variable, however,
because this value must be incremented after each failed login attempt.

If a named value in your code is not going to change,
it should always be declared as a constant with the ``val`` keyword.
Variables should only be used for
named values that need to be able to change their value.

Named value declarations can include a specific *type*,
to be explicit about the kind of values they can store:

.. testcode:: namedValues

    (swift) val welcomeMessage: String = "Hello"
    // welcomeMessage : String = "Hello"

The colon in the declaration means *“…of type…,”*
so this can be read as:

“Declare a constant called ``welcomeMessage`` that is of type ``String``,
and give it a value of ``"Hello"``.”

The phrase “of type ``String``” means “can store any ``String`` value”.
Think of it as meaning “the type of thing” (or “the kind of thing”) that can be stored.

You can use almost any character you like for constant and variable names,
including Unicode characters:

.. testcode:: namedValues

    (swift) val π = 3.14159
    // π : Double = 3.14159
    (swift) val 你好 = "你好世界"
    // 你好 : String = "你好世界"
    (swift) val 🐶🐮 = "dogcow"
    // 🐶🐮 : String = "dogcow"

Constant and variable names cannot contain
mathematical symbols, arrows, private-use (or invalid) Unicode code points,
or line- and box-drawing characters.
They also cannot begin with a number
(although numbers may be included elsewhere within the name).

Once you've declared a named value of a certain type,
you can't redeclare it again with the same name,
or set it to store values of a different type.
You also can't change it from a constant to a variable (or vice versa).

The value of an existing variable can be changed to another value of a compatible type.
You can also print the value of a named value by using the ``println`` function:

.. testcode:: namedValues

    (swift) var friendlyWelcome = "hello, world"
    // friendlyWelcome : String = "hello, world"
    (swift) friendlyWelcome = "👋, 🌎"
    (swift) println(friendlyWelcome)
    >>> 👋, 🌎

.. NOTE: this is a deliberately simplistic description of what you can do with println().
   It will be expanded later on.

.. QUESTION: is this *too* simplistic?
   Strictly speaking, you can't print the value of *any* named value –
   you can only print values of types for which String has a constructor.

Unlike a variable, the value of a constant cannot be changed once it is set,
and attempting to do so will result in an error:

.. testcode:: namedValues

    (swift) val languageName = "Swift"
    // languageName : String = "Swift"
    (swift) languageName = "Swift++"
    !!! <REPL Input>:1:14: error: cannot assign to 'val' value 'languageName'
    !!! languageName = "Swift++"
    !!! ~~~~~~~~~~~~ ^

.. _BasicTypes_Integers:

Integers
--------

:newTerm:`Integers` are whole numbers with no fractional component,
such as ``42`` and ``-23``.
Integers are either :newTerm:`signed` (which means they can be positive, zero or negative),
or :newTerm:`unsigned` (which means they can only be positive or zero).

Swift provides integers in signed and unsigned forms in sizes of
8, 16, 32, and 64 bits.
These integers follow a naming convention similar to C,
in that an 8-bit unsigned integer is of type ``UInt8``,
and a 32-bit signed integer is of type ``Int32``.
Like all types in Swift, these integer types have capitalized names.

In most cases, there's no need to pick a specific size of integer to use in your code.
Swift provides an additional integer type, ``Int``,
which has the same size as the current platform's architecture:

* On a 32-bit platform, ``Int`` is the same size as ``Int32``.
* On a 64-bit platform, ``Int`` is the same size as ``Int64``.

Unless you need to work with a specific size of integer,
you should always use ``Int`` for code consistency and interoperability.
Even on 32-bit platforms, ``Int`` can store any value between ``-2,147,483,648`` and ``2,147,483,647``,
and is large enough for many integer ranges.

.. _BasicTypes_FloatingPointNumbers:

Floating-Point Numbers
----------------------

:newTerm:`Floating-point numbers` are numbers with a fractional component,
such as ``3.14159``, ``0.1`` and ``-273.15``.

Swift provides two signed floating-point number types:

* ``Double``, which represents a 64-bit floating-point number,
  and should be used when floating-point values need to be very large or particularly precise
* ``Float``, which represents a 32-bit floating-point number,
  and should be used when floating-point values do not require 64-bit precision

.. _BasicTypes_TypeSafetyAndTypeInference:

Type Safety and Type Inference
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Swift is a :newTerm:`type safe` language.
This means that it encourages you to be clear about the types of values and objects your code can work with.
If some part of your code expects a string,
type safety means that you can't accidentally pass it an integer by mistake.

Because Swift is type safe,
it performs :newTerm:`type checks` when compiling your code.
Any mismatched types are flagged as errors so that you can fix them.

Type-checking helps to avoid accidental errors when you're working with different types of values.
However, this doesn't mean that you have to define the type of
every constant and variable that you declare.
If you don't specify the type of value you need,
Swift will use :newTerm:`type inference` to work out the appropriate type.
Type inference is the ability for a compiler to automatically deduce the type of a particular expression when it compiles your code,
just by examining the values you provide.

Type inference means that Swift requires far fewer type declarations than languages such as C or Objective-C.
Named values are still explicitly-typed,
but much of the work of specifying their type is done for you.

Type inference is particularly useful
when you declare a constant or variable with an initial value.
This is often done by assigning a :newTerm:`literal value` (or :newTerm:`literal`)
to the constant or variable at the point that you declare it.
(A literal value is a one-off value that appears directly in your source code,
such as ``42`` and ``3.14159`` in the examples below.)

For example, if you assign a literal value of ``42`` to a new constant
without saying what type it is,
Swift infers that you want the constant to be an ``Int``,
because you have initialized it with a number that looks like an integer:

.. testcode:: typeInference

    (swift) val meaningOfLife = 42
    // meaningOfLife : Int = 42

Likewise, if you don't specify a type for a floating-point literal,
Swift assumes that you want to create a ``Double``:

.. testcode:: typeInference

    (swift) val pi = 3.14159
    // pi : Double = 3.14159

Swift always chooses ``Double`` (rather than ``Float``)
when inferring the type of floating-point numbers.

If you combine integer and floating-point literals in an expression,
a type of ``Double`` will be inferred from the context:

.. testcode:: typeInference

    (swift) val anotherPi = 3 + 0.14159
    // anotherPi : Double = 3.14159

The literal value of ``3`` has no explicit type in and of itself,
and so an appropriate output type of ``Double`` is inferred
from the presence of a floating-point literal as part of the addition.

.. _BasicTypes_NumericLiterals:

Numeric Literals
~~~~~~~~~~~~~~~~

Integer literals can be written as any of the following:

* A :newTerm:`decimal` number, with no prefix
* A :newTerm:`binary` number, with a ``0b`` prefix
* An :newTerm:`octal` number, with a ``0o`` prefix
* A :newTerm:`hexadecimal` number, with a ``0x`` prefix

All of these integer literals have a decimal value of ``17``:

.. testcode:: numberLiterals

    (swift) val decimalInteger = 17
    // decimalInteger : Int = 17
    (swift) val binaryInteger = 0b10001        // 17 in binary notation
    // binaryInteger : Int = 17
    (swift) val octalInteger = 0o21            // 17 in octal notation
    // octalInteger : Int = 17
    (swift) val hexadecimalInteger = 0x11      // 17 in hexadecimal notation
    // hexadecimalInteger : Int = 17

Floating-point literals can be decimal (with no prefix),
or hexadecimal (with a ``0x`` prefix).
They must always have a number (or hexadecimal number) on both sides of the decimal point.
They can also have an optional :newTerm:`exponent`,
indicated by an upper- or lowercase ``e`` for decimal floats,
or an upper- or lowercase ``p`` for hexadecimal floats.

For decimal numbers with an exponent of ``exp``,
the base number is multiplied by 10\ :superscript:`exp`:

* ``1.25e2`` means 1.25 ⨉ 10\ :superscript:`2`, or ``125.0``
* ``1.25e-2`` means 1.25 ⨉ 10\ :superscript:`-2`, or ``0.0125``

For hexadecimal numbers with an exponent of ``exp``,
the base number is multiplied by 2\ :superscript:`exp`:

* ``0xFp2`` means 15 ⨉ 2\ :superscript:`2`, or ``60.0``
* ``0xFp-2`` means 15 ⨉ 2\ :superscript:`-2`, or ``3.75``

All of these floating-point literals have a decimal value of ``12.5``:

.. testcode:: numberLiterals

    (swift) val decimalDouble = 12.5
    // decimalDouble : Double = 12.5
    (swift) val exponentDouble = 1.25e1
    // exponentDouble : Double = 12.5
    (swift) val hexadecimalDouble = 0xC.8p0
    // hexadecimalDouble : Double = 12.5

Numeric literals can contain extra formatting to make them easier to read.
Both integers and floats can be padded with extra zeroes at the beginning
and can contain underscores to help with readability.
Neither type of formatting affects the underlying value of the literal:

.. testcode:: numberLiterals

    (swift) val paddedDouble = 000123.456
    // paddedDouble : Double = 123.456
    (swift) val oneMillion = 1_000_000
    // oneMillion : Int = 1000000
    (swift) val justOverOneMillion = 1_000_000.000_000_1
    // justOverOneMillion : Double = 1e+06

In the example above, the value of ``justOverOneMillion`` has been printed as ``1e+06``.
This is a short-form representation of its underlying ``Double`` value of ``1000000.0000001``.
The actual value of ``justOverOneMillion`` still has all of the precision of the original.

.. _BasicTypes_NumericTypeConversion:

Numeric Type Conversion
~~~~~~~~~~~~~~~~~~~~~~~

The ``Int`` type should be used for all general-purpose integer named values in your code,
even if they are known to be nonnegative.
Using the default integer type in everyday situations means that
integer named values are immediately interoperable in your code
and will match the inferred type for integer literal values.

Other integer types should be used only when they are are specifically needed for the task at hand,
due to explicitly-sized data from an external source,
or for performance, memory usage, or other optimization.
Using explicitly-sized types in these situations
helps to catch any accidental value overflows
and implicitly documents the nature of the data being used.

.. _BasicTypes_IntegerConversion:

Integer Conversion
__________________

The range of numbers that can be stored in an integer named value
is different for each numeric type.
An ``Int8`` named value can store numbers between ``-128`` and ``127``,
whereas a ``UInt8`` named value can store numbers between ``0`` and ``255``.
A number that can be stored in one numeric type
cannot necessarily be stored in another numeric type.

Because of these differences,
numeric type conversion is something you must opt in to on a case-by-case basis.
This opt-in approach avoids accidental errors
and helps to make type conversion intentions explicit in your code.

To convert from one specific number type to another,
you initialize a new number of the desired type with the existing value:

.. testcode:: typeConversion

    (swift) val twoThousand: UInt16 = 2_000
    // twoThousand : UInt16 = 2000
    (swift) val one: UInt8 = 1
    // one : UInt8 = 1
    (swift) val twoThousandAndOne = twoThousand + UInt16(one)
    // twoThousandAndOne : UInt16 = 2001

The constant ``twoThousand`` is of type ``UInt16``,
whereas the constant ``one`` is of type ``UInt8``.
They cannot be added together directly,
because they are not of the same type.
Instead, this code calls ``UInt16(one)`` to create a new ``UInt16`` initialized with the value of ``one``,
and uses this value in place of the original.
Because both sides of the addition are now of type ``UInt16``,
the addition is allowed.
The output constant (``twoThousandAndOne``) is inferred to be of type ``UInt16``,
because it is the sum of two ``UInt16`` values.

``SomeType(ofInitialValue)`` is the default way to call the initializer of a Swift type
and pass in an initial value.
Behind the scenes, ``UInt16`` has an initializer that accepts a ``UInt8`` value,
and so this initializer is used to make a new ``UInt16`` from an existing ``UInt8``.
You can't just pass in *any* type here, however –
it has to be a type for which ``UInt16`` provides an initializer.
Extending existing types to provide initializers that accept new types
(including your own type definitions)
is covered in :doc:`Extensions`.

.. TODO: add a note that this is not traditional type-casting,
   and perhaps include a forward reference to the objects chapter.

.. _BasicTypes_IntegerToFloatingPointConversion:

Integer to Floating-Point Conversion
____________________________________

Conversions between integer and floating-point numeric types must also be made explicit:

.. testcode:: typeConversion

    (swift) val three = 3
    // three : Int = 3
    (swift) val pointOneFourOneFiveNine = 0.14159
    // pointOneFourOneFiveNine : Double = 0.14159
    (swift) val pi = Double(three) + pointOneFourOneFiveNine
    // pi : Float64 = 3.14159

Here, the value of the constant ``three`` is used to create a new value of type ``Double``,
so that both sides of the addition are of the same type.
Without this conversion in place, the addition would not be allowed.

The rules for numeric named values are different from
the rules for numeric literal values seen earlier –
where the literal value ``3`` was added to the literal value ``0.14159`` –
because number literals do not have an explicit type in and of themselves.
Their type is inferred only at the point that they are evaluated by the compiler.

.. TODO: the return type of pi here is inferred as Float64,
   but it should really be inferred as Double.
   This is due to rdar://15211554.
   This code sample should be updated once the issue is fixed.

.. NOTE: this section on explicit conversions could be included in the Operators section.
   I think it's more appropriate here, however,
   and helps to reinforce the “just use Int” message.

.. _BasicTypes_NumericBounds:

Numeric Bounds
~~~~~~~~~~~~~~

The minimum and maximum values of each integer type can be accessed using its ``min`` and ``max`` properties:

.. testcode:: namedValues

    (swift) val minimumValue = UInt8.min
    // minimumValue : UInt8 = 0
    (swift) val maximumValue = UInt8.max
    // maximumValue : UInt8 = 255

The values of these properties are of the appropriate sized number type
(such as ``UInt8`` in the example above)
and can therefore be used in expressions alongside other values of the same type.

.. _BasicTypes_Booleans:

Booleans
--------

Swift has a basic :newTerm:`Boolean` type, called ``Bool``.
Boolean values are referred to as :newTerm:`logical`,
because they can only ever be ``true`` or ``false``:

.. testcode:: booleans

    (swift) val orangesAreOrange = true
    // orangesAreOrange : Bool = true
    (swift) val turnipsAreDelicious = false
    // turnipsAreDelicious : Bool = false

The types of ``orangesAreOrange`` and ``turnipsAreDelicious`` have been inferred
from the fact that they were initialized with ``Bool`` values.
As with ``Int`` and ``Double`` above,
you don't need to declare named values as ``Bool``
if you set them to ``true`` or ``false`` as soon as you create them.
Type inference helps to make Swift code much more concise and readable
when initializing named values with other values whose type is already known.

Boolean values are particularly useful when working with conditional statements such as ``if else``:

.. testcode:: booleans

    (swift) if turnipsAreDelicious {
        println("Mmm, tasty turnips!")
    } else {
        println("Eww, turnips are horrible.")
    }
    >>> Eww, turnips are horrible.

Conditional statements such as ``if else`` are covered in more detail in :doc:`ControlFlow`.

Swift's type safety means that non-Boolean values cannot be substituted for ``Bool``.
You cannot, for example, say::

    (swift) val i = 1
    // i : Int = 1
    (swift) if i {
        // do stuff
    }

…because ``i`` is not of type ``Bool``.
However, it is valid to say::

    (swift) if i == 1 {
        // do stuff
    }
    
The result of the ``i == 1`` comparison is of type ``Bool``,
and so this second example passes the type-check.
(Comparisons like ``i == 1`` are discussed in :doc:`Operators`.)

As with other examples of type safety in Swift,
this approach avoids accidental errors,
and ensures that the intention of a particular section of code is always made clear.

.. _BasicTypes_Arrays:

Arrays
------

[to be written]

.. _BasicTypes_Dictionaries:

Dictionaries
------------

[to be written]

.. _BasicTypes_Tuples:

Tuples
------

:newTerm:`Tuples` are a way to group together multiple values of various types.
They provide a simple way to pass around multiple values as a single entity.

Here's an example of a tuple:

.. testcode:: tuples

    (swift) val statusCode = (404, "Not Found")
    // statusCode : (Int, String) = (404, "Not Found")

``(404, "Not Found")`` is a tuple that describes an *HTTP status code*.
An HTTP status code is a special value returned by a web server whenever you request a web page.
A status code of ``404 Not Found`` is returned if you request a webpage that doesn't exist.

The ``(404, "Not Found")`` tuple groups together an ``Int`` and a ``String``
to give the HTTP status code two separate values:
a number, and a human-readable description.
It can be described as “a tuple of type ``(Int, String)``”.

You can create tuples from whatever permutation of types you like,
and they can contain as many different types as you like.
There's nothing stopping you from having
a tuple of type ``(Int, Int, Int)``, or ``(String, Bool)``,
or indeed any other permutation you require.

You can access the individual element values in a tuple using index numbers starting at zero:

.. testcode:: tuples

    (swift) statusCode.0
    // r0 : Int = 404
    (swift) statusCode.1
    // r1 : String = "Not Found"

Tuples are particularly useful as the return values of functions.
A function that tries to retrieve a web page might return this ``(Int, String)`` tuple type
to describe the success or failure of the page retrieval.
By returning a tuple with two distinct values,
each of a different type,
the function can provide more useful information about its outcome
than if it could only return a single value of a single type.
Functions are described in detail in :doc:`Functions`.

Tuples are useful for temporary groups of related values.
They are not suited to the creation of complex data structures.
If your data structure would benefit from named member values,
or is likely to persist beyond a temporary scope,
it should be modeled as a :newTerm:`class` or :newTerm:`structure`,
rather than as a tuple.
Classes and structures are described in detail in :doc:`ClassesAndStructures`.

.. _BasicTypes_Optionals:

Optionals
---------

:newTerm:`Optionals` are a way to handle missing values.
They can be used to say:

* There *is* a value, and it equals *x*

…or…

* There *isn't* a value at all

This concept doesn't exist in C or Objective-C.
The nearest thing in Objective-C is
the ability to return ``nil`` from a method that would otherwise return an object,
with ``nil`` meaning “the absence of a valid object”.
However, this only works for objects – it doesn't work for
structs, or basic C types, or enumeration values.
For these types,
Objective-C methods typically return a special value (such as ``NSNotFound``) to indicate the absence of a value.
This assumes that the method's caller knows there is a special value to test for,
and remembers to check for it.
Swift's optionals give a way to indicate the absence of a value for *any type at all*,
without the need for special constants or ``nil`` tests.

Here's an example.
Swift's ``String`` type has a function called ``toInt()``,
which tries to convert a ``String`` value into an ``Int`` value.
However, it's not possible to convert every possible string into an integer.
The string ``"123"`` can be converted into the numeric value ``123``,
but the string ``"hello, world"`` does not have an obvious numeric value to convert to.

The example below shows how to use ``toInt()`` to try to convert a ``String`` into an ``Int``:

.. testcode:: optionals

    (swift) val possibleNumber = "123"
    // possibleNumber : String = "123"
    (swift) val convertedNumber = possibleNumber.toInt()
    // convertedNumber : Int? = <unprintable value>

``convertedNumber`` has an inferred type of ``Int?``, not ``Int``.
The question mark indicates that the value it contains is an *optional* ``Int``,
meaning that it might contain *some* ``Int`` value,
or it might contain *no value at all*.
(It can't contain anything else, such as a ``Bool`` value or a ``String`` value –
it's either an ``Int``, or it's nothing at all.)

You can use an ``if``-``else`` statement to find out whether or not an optional contains a value.
If an optional does have a value, it equates to ``true``;
if it has no value at all, it equates to ``false``.

Once you're sure that the optional *does* contain a value,
you can access its underlying value
by adding an exclamation mark (``!``) to the end of the optional's name.
The exclamation mark effectively says,
“I know that this optional definitely has a value – please use it”.

.. testcode:: optionals

    (swift) if convertedNumber {
        println(convertedNumber!)
    } else {
        println("The string could not be converted into an integer")
    }
    >>> 123

``if``-``else`` statements are described in more detail in :doc:`ControlFlow`.

.. note::

    Trying to use ``!`` to access a non-existent optional value will trigger
    an unrecoverable runtime error.

.. TODO: Add a section about arrays and dictionaries once their design is more tied down.

.. refnote:: References

    * https://[Internal Staging Server]/docs/LangRef.html#integer_literal ✔︎
    * https://[Internal Staging Server]/docs/LangRef.html#floating_literal ✔︎
    * https://[Internal Staging Server]/docs/LangRef.html#expr-delayed-identifier ✔︎
    * https://[Internal Staging Server]/docs/LangRef.html#type-tuple
    * https://[Internal Staging Server]/docs/whitepaper/TypesAndValues.html#types-and-values ✔︎
    * https://[Internal Staging Server]/docs/whitepaper/TypesAndValues.html#integer-types ✔︎
    * https://[Internal Staging Server]/docs/whitepaper/TypesAndValues.html#no-integer-suffixes ✔︎
    * https://[Internal Staging Server]/docs/whitepaper/TypesAndValues.html#no-implicit-integer-promotions-or-conversions ✔︎
    * https://[Internal Staging Server]/docs/whitepaper/TypesAndValues.html#no-silent-truncation-or-undefined-behavior
    * https://[Internal Staging Server]/docs/whitepaper/TypesAndValues.html#separators-in-literals ✔︎
    * https://[Internal Staging Server]/docs/whitepaper/TypesAndValues.html#floating-point-types ✔︎
    * https://[Internal Staging Server]/docs/whitepaper/TypesAndValues.html#bool ✔︎
    * https://[Internal Staging Server]/docs/whitepaper/TypesAndValues.html#tuples
    * https://[Internal Staging Server]/docs/whitepaper/TypesAndValues.html#arrays
    * https://[Internal Staging Server]/docs/whitepaper/LexicalStructure.html#identifiers-and-operators
    * https://[Internal Staging Server]/docs/whitepaper/LexicalStructure.html#integer-literals
    * https://[Internal Staging Server]/docs/whitepaper/LexicalStructure.html#floating-point-literals
    * https://[Internal Staging Server]/docs/whitepaper/GuidedTour.html#declarations-and-basic-syntax
    * https://[Internal Staging Server]/docs/whitepaper/GuidedTour.html#tuples
    * https://[Internal Staging Server]/docs/literals.html
    * http://en.wikipedia.org/wiki/Operator_(computer_programming)
