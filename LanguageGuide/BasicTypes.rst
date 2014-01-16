.. docnote:: Subjects to be covered in this section

    * Declaration syntax ✔︎
    * Multiple variable declarations and initializations on one line:
    * var i = 1; var j = 2; print(i + j)
    * var k = 1, l = 2
    * …but not… var m, n = 2
    * Naming conventions ✔︎
    * Integer types ✔︎
    * Floating point types ✔︎
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

* *numbers* (including integers and floating-point numbers), and
* *booleans* (for values that can only be true or false)
    
Although these types may be familiar,
Swift expands their capabilities beyond what is possible in other languages.

In addition to these simple types,
Swift introduces some less familiar (but very powerful) advanced types:

* arbitrary groups of values of different types (known as *tuples*)
* types that can be either a known value or a missing value (known as *optionals*)

Each of these types, and the ways in which they can be used,
are discussed in more detail below.

Swift also provides a powerful and flexible way to create and work with string and character types.
These are introduced below, and are discussed in more detail in :doc:`Strings`.

Declaring and Naming Variables
------------------------------

.. QUESTION: Do we need to have introduced the REPL
   (or some other learning environment) before starting this section?

All variables in Swift must be declared before they are used.
Here's a simple variable declaration:

.. testcode:: declaringVariables

    (swift) var a = 1
    // a : Int = 1
    
This can be read as:

“Declare a variable called ``a``, and give it an initial value of ``1``.”

Variable declarations can include a specific *type*,
to be explicit about the kind of variable you want to create:

.. testcode:: declaringVariables

    (swift) var b: String = "Hello"
    // b : String = "Hello"

The colon in the declaration means *“…that is a…”*,
so this can be read as:

“Declare a variable called ``b`` that is a ``String``,
and give it an initial value of ``"Hello"``.”

.. TODO: Update this section to mention let as well as var,
   once let is available and ready for prime-time use.
   Also update the rest of the Guide to use let
   wherever and whenever mutability is not required,
   and note that var is something you should really only opt in to
   when you know that the variable's value should be allowed to mutate.

You can use pretty much any character you like in a variable name,
including `Unicode <http://en.wikipedia.org/wiki/Unicode>`_ characters:

.. testcode:: declaringVariables

    (swift) var π = 3.14159
    // π : Double = 3.14159
    (swift) var 你好 = "你好世界"
    // 你好 : String = "你好世界"
    (swift) var 🐶🐮 = "dogcow"
    // 🐶🐮 : String = "dogcow"

Variable names cannot contain
mathematical symbols, arrows, private-use (or invalid) Unicode code points,
or line- and box-drawing characters.
Variable names also cannot begin with a number
(although numbers may be included elsewhere within the name).

Once you've declared a variable,
you can't redeclare it again with the same name,
but you can set the existing variable to another value of the same type.
You can also print the value of a variable using the ``println`` function,
to see its current value:

.. testcode:: declaringVariables

    (swift) var friendlyWelcome = "hello, world"
    // friendlyWelcome : String = "hello, world"
    (swift) friendlyWelcome = "👋, 🌎"
    (swift) println(friendlyWelcome)
    >>> 👋, 🌎

.. NOTE: this is a deliberately simplistic description of what you can do with println().
   It will be expanded later on.

Integers
--------

Swift provides :term:`integers` in :term:`signed and unsigned` forms at
8, 16, 32 and 64-bit sizes.
These integers follow a similar naming convention to C,
in that an 8-bit unsigned integer is a ``UInt8``,
and a 32-bit signed integer is an ``Int32``.
Like all types in Swift, these integer types have capitalized names.

.. glossary::

    integers
        An integer is a whole number with no fractional component
        (such as ``42``, ``0`` and ``-23``).

    signed and unsigned
        Signed values can be positive or negative.
        Unsigned values can only be positive.

In most cases, there's no need to pick a specific size of integer to use in your code.
Swift provides an additional integer type, ``Int``,
which has the same size as the current platform's architecture:

* On a 32-bit platform, ``Int`` is the same size as ``Int32``
* On a 64-bit platform, ``Int`` is the same size as ``Int64``

Unless you need to work with a specific size of integer,
you should always use ``Int`` for code consistency and interoperability.
Even on 32-bit platforms, ``Int`` can store any value between ``-2,147,483,648`` and ``2,147,483,647``,
and is typically large enough for everyday integer values.

.. admonition:: Note

    Swift's ``Int`` type will have a platform-specific size, as described above.
    However, this has yet to be implemented.
    In the meantime, ``Int`` is a typealias for ``Int64`` on both 32 and 64-bit platforms.

.. TODO: Remove this admonition as per rdar://15612057 once rdar://15612767 is completed.

Floating-Point Numbers
----------------------

Swift provides two signed :term:`floating-point number` types:

* ``Double``, which represents a 64-bit floating-point number,
  and should be used when floating-point values need to be very large or particularly precise
* ``Float``, which represents a 32-bit floating point number,
  and should be used when floating-point values do not require 64-bit precision

.. glossary::

    floating-point number
        A floating-point number (also known as a float) is a number with a fractional component
        (such as ``3.14159``, ``0.1`` or ``-273.15``).

Strong Typing and Type Inference
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Swift is a *strongly-typed* language.
This means that it encourages you to be clear about the types of values and objects your code can work with.
If some part of your code expects a string, for example,
strong typing means that you can't accidentally pass it an integer by mistake.

Because Swift is strongly-typed,
it is able to perform *type checks* when compiling your code.
Any mismatched types are flagged as errors so that you can fix them.

Type-checking helps to avoid accidental errors when working with different types of value.
However, this doesn't mean that you have to define the type of every variable you use.
If you don't specify the type of value you need,
Swift will use *type inference* to work out the appropriate type.
Type inference is the ability for a compiler to automatically deduce the type of a particular expression when it compiles your code,
just by examining the values you provide.

For example: if you assign a :term:`literal value` of ``42`` to a variable,
without saying what type it is,
Swift will deduce that you want the variable to be an ``Int``,
because you have initialized it with a number that looks like an integer:

.. glossary::

    literal value
        A *literal value* is a one-off value that appears directly in your source code,
        such as ``42`` and ``3.14159`` in the examples below.

.. testcode:: typeInference

    (swift) var meaningOfLife = 42
    // meaningOfLife : Int = 42

Likewise, if you don't specify a type for a floating-point literal,
Swift assumes that you want to create a ``Double`` from the floating-point value:

.. testcode:: typeInference

    (swift) var pi = 3.14159
    // pi : Double = 3.14159

Swift always chooses ``Double`` (rather than ``Float``)
when inferring the type of floating-point numbers.

If you combine integer and floating-point literals in an expression,
a type of ``Double`` will be inferred from the context:

.. testcode:: typeInference

    (swift) var anotherPi = 3 + 0.14159
    // anotherPi : Double = 3.14159

The literal value of ``3`` does not have an explicit type in and of itself,
and so an appropriate output type of ``Double`` is inferred
from the presence of a floating-point literal as part of the addition.

Type inference means that Swift requires far fewer type declarations than languages such as C or Objective-C.
Variables are still explicitly-typed,
but much of the work of specifying their type is done for you.

Numeric Literals
~~~~~~~~~~~~~~~~

Integer literals can be
decimal (with no prefix);
:term:`binary` (with a ``0b`` prefix);
:term:`octal` (with a ``0o`` prefix);
or :term:`hexadecimal` (with a ``0x`` prefix).

.. glossary::

    binary
        Binary numbers are counted with two (rather than ten) basic units.
        They only ever contain the numbers ``0`` and ``1``.
        In binary notation,
        ``1`` is ``0b1``, and ``2`` is ``0b10``.

    octal
        Octal numbers are counted with eight (rather than ten) basic values.
        They only ever contain the numbers ``0`` to ``7``.
        In octal notation,
        ``7`` is ``0o7``, and ``8`` is ``0o10``.

    hexadecimal
        Hexadecimal numbers are counted with 16 (rather than ten) basic values.
        They contain the numbers ``0`` to ``9``, plus the letters ``A`` through ``F``
        (to represent base units with values of ``10`` through ``15``).
        In hexadecimal notation,
        ``9`` is ``0x9``, ``10`` is ``0xA``, ``15`` is ``0xF``, and ``16`` is ``0x10``.

All of these integer literals have a decimal value of ``17``:

.. testcode:: numberLiterals

    (swift) var decimalInteger = 17
    // decimalInteger : Int = 17
    (swift) var binaryInteger = 0b10001        // 17 in binary notation
    // binaryInteger : Int = 17
    (swift) var octalInteger = 0o21            // 17 in octal notation
    // octalInteger : Int = 17
    (swift) var hexadecimalInteger = 0x11      // 17 in hexadecimal notation
    // hexadecimalInteger : Int = 17

Floating-point literals can be decimal (with no prefix),
or hexadecimal (with a ``0x`` prefix).
The must always have a number (or hexadecimal number) on both sides of the decimal point.
They can also have an optional *exponent*,
indicated by an upper- or lower-case ``e`` for decimal floats,
or an upper- or lower-case ``p`` for hexadecimal floats.

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

    (swift) var decimalDouble = 12.5
    // decimalDouble : Double = 12.5
    (swift) var exponentDouble = 1.25e1
    // exponentDouble : Double = 12.5
    (swift) var hexadecimalDouble = 0xC.8p0
    // hexadecimalDouble : Double = 12.5

Numeric literals can contain extra formatting to make them easier to read.
Both integers and floats can be padded with extra zeroes on the beginning,
and can contain underscores to help with readability.
Neither type of formatting affects the underlying value of the literal:

.. testcode:: numberLiterals

    (swift) var paddedDouble = 000123.456
    // paddedDouble : Double = 123.456
    (swift) var oneMillion = 1_000_000
    // oneMillion : Int = 1000000
    (swift) var justOverOneMillion = 1_000_000.000_000_1
    // justOverOneMillion : Double = 1e+06

In the example above, the value of ``justOverOneMillion`` has been printed as ``1e+06``.
This is a short-form representation of its underlying ``Double`` value of ``1000000.0000001``.
The actual value of ``justOverOneMillion`` still has all of the precision of the original.

Numeric Type Conversion
~~~~~~~~~~~~~~~~~~~~~~~

The ``Int`` type should be used for all general-purpose integer variables in your code,
even if they are known to be non-negative.
Using the default integer type in everyday situations means that
integer variables are immediately interoperable in your code,
and will match the inferred type for integer literal values.

Other integer types should only be used when they are are specifically needed for the task at hand,
due to explicitly-sized data from an external source,
or for performance, memory usage, or other optimization.
Using explicitly-sized types in these situations
helps to catch any accidental value overflows,
and implicitly documents the nature of the data being used.

Integer Conversion
__________________

The range of numbers that can be stored in a numeric variable
is different for each numeric type.
An ``Int8`` variable can store numbers between ``-128`` and ``127``,
whereas a ``UInt8`` variable can store numbers between ``0`` and ``255``.
A value that can be stored in one numeric type
cannot necessarily be stored in another numeric type.

Because of this, numeric type conversion is something you must opt in to on a case-by-case basis.
This avoids accidental errors, and helps to make type conversion intentions explicit in your code.

To convert from one specific number type to another,
you initialize a new number of the desired type with the existing value:

.. testcode:: typeConversion

    (swift) var twoThousand: UInt16 = 2_000
    // twoThousand : UInt16 = 2000
    (swift) var one: UInt8 = 1
    // one : UInt8 = 1
    (swift) var twoThousandAndOne = twoThousand + UInt16(one)
    // twoThousandAndOne : UInt16 = 2001

The variable ``twoThousand`` is a ``UInt16``,
whereas the variable ``one`` is a ``UInt8``.
They cannot be added together directly,
because they are not of the same type.
Instead, this code calls ``UInt16(one)`` to create a new ``UInt16`` initialized with the value of ``one``,
and uses this value in place of the original.
Because both sides of the addition are now of type ``UInt16``,
the addition is allowed.
The output variable (``twoThousandAndOne``) is inferred to be a ``UInt16``,
because it is the sum of two ``UInt16`` values.

The syntax seen above –
``SomeType(ofInitialValue)`` –
is the default way to call the initializer of a Swift type,
and to pass in an initial value.
Behind the scenes, ``UInt16`` has an initializer that accepts a ``UInt8`` value,
and so this initializer is used to make a new ``UInt16`` from an existing ``UInt8``.
You can't just pass in *any* type here, however –
it has to be a type for which ``UInt16`` provides an initializer.
Extending existing types to accept new types
(including your own type definitions) as initializers
is covered in :doc:`ProtocolsAndExtensions`.

.. TODO: add a note that this is not traditional type-casting,
   and perhaps include a forward reference to the objects chapter.

Integer to Floating-Point Conversion
____________________________________

Conversions between integer and floating-point variable types must also be made explicit:

.. testcode:: typeConversion

    (swift) var three = 3
    // three : Int = 3
    (swift) var pointOneFourOneFiveNine = 0.14159
    // pointOneFourOneFiveNine : Double = 0.14159
    (swift) var pi = Double(three) + pointOneFourOneFiveNine
    // pi : Float64 = 3.14159

Here, the value of the variable ``three`` is used to create a new ``Double``,
so that both sides of the addition are of the same type.
The addition would not be allowed without this conversion in place.

The rules for numeric variables are different from the rules for numeric literals seen earlier –
where the literal value ``3`` was added to the literal value ``0.14159`` –
because number literals do not have an explicit type in and of themselves.
Their type is only inferred at the point that they are evaluated by the compiler.

.. TODO: the return type of pi here is inferred as Float64,
   but it should really be inferred as Double.
   This is due to rdar://15211554.
   This code sample should be updated once the issue is fixed.

.. NOTE: this section on explicit conversions could be included in the Operators section.
   I think it's more appropriate here, however,
   and helps to reinforce the ‘just use Int’ message.

Numeric Bounds
~~~~~~~~~~~~~~

The minimum and maximum values of each integer type can be accessed using its ``min`` and ``max`` properties:

.. testcode:: declaringVariables

    (swift) var minimumValue = UInt8.min
    // minimumValue : UInt8 = 0
    (swift) var maximumValue = UInt8.max
    // maximumValue : UInt8 = 255

The values of these properties are of the appropriate sized number type
(such as ``UInt8`` in the example above),
and can therefore be used in expressions alongside other values of the same type.

Booleans
--------

Swift has a basic :term:`boolean` type, called ``Bool``.
Values of type ``Bool`` can be either ``true`` or ``false``:

.. glossary::

    boolean
        A data type is said to be ‘boolean’ if it can only ever have one of two values:
        true or false.

.. testcode:: booleans

    (swift) var orangesAreOrange = true
    // orangesAreOrange : Bool = true
    (swift) var turnipsAreDelicious = false
    // turnipsAreDelicious : Bool = false

The types of ``orangesAreOrange`` and ``turnipsAreDelicious`` have been inferred
from the fact that they were initialized with ``Bool`` values.
As with ``Int`` and ``Double`` above,
you don't need to declare variables as being ``Bool`` if you set them to ``true`` or ``false`` as soon as you create them.
Type inference helps to make Swift code much more concise and readable when initializing variables with known values.

Boolean values are particularly useful when working with conditional statements such as ``if else``:

.. testcode:: booleans

    (swift) if turnipsAreDelicious {
        println("Mmm, tasty turnips!")
    } else {
        println("Eww, turnips are horrible.")
    }
    >>> Eww, turnips are horrible.

Conditional statements such as ``if else`` are covered in more detail in :doc:`ControlFlow`.

Swift's strong type-checking means that non-boolean values cannot be substituted for ``Bool``.
You cannot, for example, say::

    (swift) var i = 1
    // i : Int = 1
    (swift) if i {
        // do stuff
    }

…because ``i`` is not a ``Bool``.
However, it is valid to say::

    (swift) if i == 1 {
        // do stuff
    }
    
The result of the ``i == 1`` comparison is a ``Bool``,
and so this second example passes the strong type-check.
(Comparisons like ``i == 1`` are discussed in :doc:`Operators`.)

As with other examples of strong typing in Swift,
this approach avoids accidental errors,
and ensures that the intention of a particular section of code is always made clear.

Tuples
------

Tuples are a way to group together multiple values of various types.
Here's an example of a tuple:

.. testcode:: tuples

    (swift) var http404Error = (404, "Not Found")
    // http404Error : (Int, String) = (404, "Not Found")

``(404, "Not Found")`` is a tuple that groups together an ``Int`` and a ``String`` to describe an :term:`HTTP status code`.
It could be described as “a tuple of type ``(Int, String)``”.

.. glossary::

    HTTP status code
        When a web browser makes a request for a web page (such as http://www.apple.com),
        it connects to the server and asks for a specific page.
        The server sends back a response containing a *status code* that describes whether or not the request was successful.
        Each status code has a number (such as ``404``) and a message (such as ``Not Found``),
        to describe the outcome of the request.

You can create tuples from whatever permutation of types you like,
and they can contain as many different types as you like.
There's nothing stopping you from having
a tuple of type ``(Int, Int, Int)``, or ``(String, Bool)``,
or indeed any other permutation you require.

You can access the individual element values in a tuple using index numbers starting at zero:

.. testcode:: tuples

    (swift) http404Error.0
    // r0 : Int = 404
    (swift) http404Error.1
    // r1 : String = "Not Found"

Tuples are particularly useful as the return values of functions.
A function that tries to retrieve a web page might return this ``http404Error`` tuple
if it is unable to find the requested page.
By returning a tuple with two distinct values,
each of a different type,
the function is able to provide more useful information about its outcome
than if it could only return a single value of a single type.

Type Aliases
~~~~~~~~~~~~

If you find yourself using a particular type of tuple several times,
you can define a type alias as shorthand for that tuple type.
Here's how to define a generic tuple type to describe any HTTP status code:

.. testcode:: tuples

    (swift) typealias HTTPStatus = (Int, String)

This can be read as:

“Define a ``typealias`` called ``HTTPStatus``,
and set it to the tuple type (``Int``, ``String``).”

``HTTPStatus`` has a capitalized name
because it is a new *type* of tuple,
rather than an instance of a particular tuple type.
This is different from the variable name ``http404Error``,
which starts with a lowercase letter,
and capitalizes sub-words within the name.
Type names should always be in ``UpperCamelCase``,
and variable names should always be in ``lowerCamelCase``,
for consistency and readability.

This new type alias doesn't set a value for the status code or description.
It's not actually creating a tuple for a specific status code –
rather, it's defining what *all* HTTP status codes look like.
Because it is a fully-fledged type,
``HTTPStatus`` can be used to declare new tuple variables of that type:

.. testcode:: tuples

    (swift) var http500Error: HTTPStatus = (500, "Internal Server Error")
    // http500Error : HTTPStatus = (500, "Internal Server Error")

This can be read as:

“Declare a variable called ``http500Error`` that is an ``HTTPStatus``.
Initialize it with
(a first element value that is ``500``,
and a second element value that is ``"Internal Server Error"``).”

This fits the signature of an ``HTTPStatus``
(first element ``Int``, second element ``String``),
and so this initialization is allowed by the Swift type-checker.

Initializer Syntax
~~~~~~~~~~~~~~~~~~

Because ``HTTPStatus`` is now a type,
you can create new ``HTTPStatus`` tuples using *initializer syntax*:

.. testcode:: tuples

    (swift) var http301Status = HTTPStatus(301, "Moved Permanently")
    // http301Status : (Int, String) = (301, "Moved Permanently")

This can be read as:

“Declare a variable called ``http301Status``,
and set it to a new ``HTTPStatus`` initialized with
(a first value that is ``301``,
and a second value that is ``"Moved Permanently"``).”

Initializer syntax is also used when creating struct and object instances,
and is described in more detail in :doc:`ClassesObjectsAndStructs`.

.. QUESTION: Which is the preferred initialization syntax?
   Should we even give people the option?
.. QUESTION: Is this too early to introduce the concept of the default initializer?

Optionals
---------

Optionals are a way to handle missing values.
They can be used to say:

* There *is* a value, and it equals *x*

…or…

* There *isn't* a value at all

This concept doesn't exist in C or Objective-C.
The nearest thing in Objective-C is
the ability to return ``nil`` from a method that would otherwise return an object,
with ``nil`` meaning ‘the absence of a valid object’.
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
which trys to convert a ``String`` value into an ``Int`` value.
However, it is not possible to convert every possible string into an integer.
The string ``"123"`` can be converted into the numeric value ``123``,
but the string ``"hello, world"`` does not have an obvious numeric value to convert to.

The example below shows how to use ``toInt()`` to try and convert a ``String`` into an ``Int``:

.. testcode:: optionals

    (swift) var possibleNumber = "123"
    // possibleNumber : String = "123"
    (swift) var convertedNumber = possibleNumber.toInt()
    // convertedNumber : Int? = <unprintable value>

``convertedNumber`` has an inferred type of ``Int?``, not ``Int``.
The question mark indicates that the value is an *optional* ``Int``,
meaning that it might contain *some* ``Int`` value,
or it might contain *no value at all*.
(It can't contain anything else, such as a ``Bool`` or a ``String`` –
it's either an ``Int``, or it's nothing at all.)

You can use an ``if else`` statement to find out whether or not an optional contains a value.
If an optional does have a value, it equates to ``true``;
if it has no value at all, it equates to ``false``.

Once you are sure that the optional *does* contain a value,
you can access its underlying value
by adding an exclamation mark (``!``) to the end of the optional's name.
The exclamation mark effectively says
“I know that this optional definitely has a value – please use it”.

.. testcode:: optionals

    (swift) if convertedNumber {
        println(convertedNumber!)
    } else {
        println("The string could not be converted into an integer")
    }
    >>> 123

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
