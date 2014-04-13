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
   * Type inference ✔︎
   * Type casting through type initializers ✔︎
   * Optional types ✔︎
   * Pattern binding
   * Literals ✔︎
   * Immutability
   * (Don't redeclare objects within a REPL session)
   * min and max for integers ✔︎

Basic Types
===========

Swift provides several basic types for working with fundamental values.
These types will be familiar to C and Objective-C developers:

* :newTerm:`Integer numbers`, for numbers without a fractional component
* :newTerm:`Floating-point numbers`, for numbers with a fractional component
* :newTerm:`Booleans`, for values that can only be true or false

In addition to these simple types,
Swift incorporates some less familiar (but very powerful) advanced types:

* arbitrary groups of values of different types (known as :newTerm:`tuples`)
* types that can be either a known value or a missing value (known as :newTerm:`optionals`)

Each of these types, and the ways in which they can be used,
are discussed in more detail below.

Swift also provides powerful and flexible versions of the following common types:

* :newTerm:`Strings`, for working with text
  (as introduced below, and discussed in detail in :doc:`Strings`)
* :newTerm:`Arrays` and :newTerm:`Dictionaries`, for working with collections of values
  (as described in :doc:`CollectionTypes`)
* :newTerm:`Enumerations`, for defining multiple values of a similar kind
  (as described in :doc:`Enumerations`)

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
Constants are declared using the ``let`` keyword,
and variables are declared using the ``var`` keyword.
Here's an example of how constants and variables could be used
to track the number of login attempts a user has made:

.. testcode:: namedValues

   -> let maximumNumberOfLoginAttempts = 10
   << // maximumNumberOfLoginAttempts : Int = 10
   -> var currentLoginAttempt = 0
   << // currentLoginAttempt : Int = 0

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
it should always be declared as a constant with the ``let`` keyword.
Variables should only be used for
named values that need to be able to change their value.

Named value declarations can include a specific :newTerm:`type`,
to be explicit about the kind of values they can store:

.. testcode:: namedValues

   -> let welcomeMessage: String = "Hello"
   << // welcomeMessage : String = "Hello"

The colon in the declaration means *“…of type…,”*
so this can be read as:

“Declare a constant called ``welcomeMessage`` that is of type ``String``,
and give it a value of ``"Hello"``.”

The phrase “of type ``String``” means “can store any ``String`` value.”
Think of it as meaning “the type of thing” (or “the kind of thing”) that can be stored.

You can use almost any character you like for constant and variable names,
including Unicode characters:

.. testcode:: namedValues

   -> let π = 3.14159
   << // π : Double = 3.14159
   -> let 你好 = "你好世界"
   << // 你好 : String = "你好世界"
   -> let 🐶🐮 = "dogcow"
   << // 🐶🐮 : String = "dogcow"

Constant and variable names cannot contain
mathematical symbols, arrows, private-use (or invalid) Unicode code points,
or line- and box-drawing characters.
They also cannot begin with a number
(although numbers may be included elsewhere within the name).

Once you've declared a named value of a certain type,
you can't redeclare it again with the same name,
or set it to store values of a different type.
You also can't change it from a constant to a variable (or vice versa).

The value of an existing variable can be changed to another value of a compatible type:

.. testcode:: namedValues

   -> var friendlyWelcome = "hello, world"
   << // friendlyWelcome : String = "hello, world"
   /> friendlyWelcome is \"\(friendlyWelcome)\"
   </ friendlyWelcome is "hello, world"
   -> friendlyWelcome = "👋, 🌎"
   /> friendlyWelcome is now \"\(friendlyWelcome)\"
   </ friendlyWelcome is now "👋, 🌎"

Unlike a variable, the value of a constant cannot be changed once it is set,
and attempting to do so will result in an error:

.. testcode:: namedValues

   -> let languageName = "Swift"
   << // languageName : String = "Swift"
   -> languageName = "Swift++"
   // this will result in an error – languageName cannot be changed
   !! <REPL Input>:1:14: error: cannot assign to 'let' value 'languageName'
   !! languageName = "Swift++"
   !! ~~~~~~~~~~~~ ^

.. QUESTION: should this section mention that Swift-clashing names
   can be qualified with a backtick (e.g. let `protocol` = 1)?
   It's of a kind with the contents of this section, but it's pretty damn niche…

.. _BasicTypes_PrintingNamedValues:

Printing Named Values
~~~~~~~~~~~~~~~~~~~~~

The current value of a constant or variable can be printed with the ``println`` function:

.. testcode:: namedValues

   -> println(friendlyWelcome)
   <- 👋, 🌎

``println`` is a special global function that prints a value,
followed by a line break, to an appropriate output.
If you are working in Xcode, for example,
``println`` will print its output in Xcode's “console” pane.
(A second function, ``print``, performs the same task
without appending a line break to the end of the value to be printed.)

.. QUESTION: have I referred to Xcode's console correctly here?
   Should I mention other output streams, such as the REPL / playgrounds?

.. NOTE: this is a deliberately simplistic description of what you can do with println().
   It will be expanded later on.

.. QUESTION: is this *too* simplistic?
   Strictly speaking, you can't print the value of *any* named value –
   you can only print values of types for which String has a constructor.

The ``println`` function will print any ``String`` value you pass to it:

.. testcode:: namedValues

   -> println("This is a string")
   <- This is a string

.. _BasicTypes_StringInterpolation:

String Interpolation
____________________

The ``println`` function can be used to print more complex logging messages,
in a similar manner to Cocoa's ``NSLog`` function.
These messages can include the current values of constants and variables.

Swift uses :newTerm:`string interpolation` to include named values
as part of a longer string.
String interpolation gives a way to include a constant or variable's name
as a placeholder in a string,
and to prompt Swift to replace it with the current value of that constant or variable.
The constant or variable's name should be wrapped by parentheses,
and escaped with a backslash before the opening parenthesis:

.. testcode:: namedValues

   -> println("The current value of friendlyWelcome is \(friendlyWelcome)")
   <- The current value of friendlyWelcome is 👋, 🌎

.. TODO: this still doesn't talk about all of the things that string interpolation can do.
   It should still be covered in more detail in the Strings and Characters chapter.

.. _BasicTypes_Comments:

Comments
--------

As you may have noticed from the examples above:

::

   // ...single-line comments begin with two forward-slashes, like in C.

You can also write multi-line comments:

::

   /* ...which start with a forward-slash followed by an asterisk,
      and end with an asterisk followed by a forward-slash, also like C. */

Unlike C, multi-line comments can also be nested:

::

   /* This is done by starting a new block of comments,
      /* then starting another new block inside of the first block.
      The second block is then closed... */
   ...followed by the original block. */

.. TODO: These multiline comments can't be tested by swifttest,
   because they aren't supported by the REPL.
   They should be tested manually before release.

.. _BasicTypes_Semicolons:

Semicolons
----------

Unlike many other languages,
Swift does not require you to write a semicolon (``;``) after each statement in your code
(although you can do so if you wish).
Semicolons *are* required, however,
if you want to write multiple separate statements on a single line:

.. testcode:: semiColons

   -> let cat = "🐱"; let dog = "🐶"
   << // cat : String = "🐱"
   << // dog : String = "🐶"

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

.. _BasicTypes_Int:

Int
~~~

In most cases, there's no need to pick a specific size of integer to use in your code.
Swift provides an additional integer type, ``Int``,
which has the same size as the current platform's architecture:

* On a 32-bit platform, ``Int`` is the same size as ``Int32``.
* On a 64-bit platform, ``Int`` is the same size as ``Int64``.

Unless you need to work with a specific size of integer,
you should always use ``Int`` for code consistency and interoperability.
Even on 32-bit platforms, ``Int`` can store any value between ``-2,147,483,648`` and ``2,147,483,647``,
and is large enough for many integer ranges.

.. _BasicTypes_UInt:

UInt
~~~~

Swift also provides an unsigned integer type, ``UInt``,
which has the same size as the current platform's architecture:

* On a 32-bit platform, ``UInt`` is the same size as ``UInt32``.
* On a 64-bit platform, ``UInt`` is the same size as ``UInt64``.

.. note::

   ``UInt`` should only be used when you specifically need
   an unsigned integer type with the same size as the platform's architecture.
   If this is not the case, ``Int`` should be preferred,
   even when the values to be stored are known to be non-negative.
   A consistent use of ``Int`` for integer values helps with code interoperability,
   and provides consistency when using type inference, as described below.

.. _BasicTypes_FloatingPointNumbers:

Floating-Point Numbers
----------------------

:newTerm:`Floating-point numbers` are numbers with a fractional component,
such as ``3.14159``, ``0.1``, and ``-273.15``.

Floating-point types can represent a much wider range of values than integer types,
and can store numbers that are much larger or smaller than can be stored in an ``Int``.
Swift provides two signed floating-point number types:

* ``Double``, which represents a 64-bit floating-point number,
  and should be used when floating-point values need to be very large or particularly precise
* ``Float``, which represents a 32-bit floating-point number,
  and should be used when floating-point values do not require 64-bit precision

``Double`` has a precision of at least 15 digits,
whereas the precision of ``Float`` can be as little as 6 digits.
The appropriate floating-point type to use will depend on the nature and range of
values you need to work with in your code.

.. _BasicTypes_TypeSafetyAndTypeInference:

Type Safety and Type Inference
------------------------------

Swift is a :newTerm:`type safe` language.
This means that it encourages you to be clear about the types of values and objects your code can work with.
If some part of your code expects a string,
type safety means that you can't accidentally pass it an integer by mistake.

Because Swift is type safe,
it performs :newTerm:`type checks` when compiling your code.
Any mismatched types are flagged as errors so that you can fix them.

Type-checking helps to avoid accidental errors when you're working with different types of values.
However, this doesn't mean that you have to specify the type of
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

   -> let meaningOfLife = 42
   << // meaningOfLife : Int = 42
   // meaningOfLife is inferred to be of type Int

Likewise, if you don't specify a type for a floating-point literal,
Swift assumes that you want to create a ``Double``:

.. testcode:: typeInference

   -> let pi = 3.14159
   << // pi : Double = 3.14159
   // pi is inferred to be of type Double

Swift always chooses ``Double`` (rather than ``Float``)
when inferring the type of floating-point numbers.

If you combine integer and floating-point literals in an expression,
a type of ``Double`` will be inferred from the context:

.. testcode:: typeInference

   -> let anotherPi = 3 + 0.14159
   << // anotherPi : Double = 3.14159
   // anotherPi is also inferred to be of type Double

The literal value of ``3`` has no explicit type in and of itself,
and so an appropriate output type of ``Double`` is inferred
from the presence of a floating-point literal as part of the addition.

.. _BasicTypes_NumericLiterals:

Numeric Literals
----------------

Integer literals can be written as any of the following:

* A :newTerm:`decimal` number, with no prefix
* A :newTerm:`binary` number, with a ``0b`` prefix
* An :newTerm:`octal` number, with a ``0o`` prefix
* A :newTerm:`hexadecimal` number, with a ``0x`` prefix

All of these integer literals have a decimal value of ``17``:

.. testcode:: numberLiterals

   -> let decimalInteger = 17
   << // decimalInteger : Int = 17
   -> let binaryInteger = 0b10001      // 17 in binary notation
   << // binaryInteger : Int = 17
   -> let octalInteger = 0o21         // 17 in octal notation
   << // octalInteger : Int = 17
   -> let hexadecimalInteger = 0x11     // 17 in hexadecimal notation
   << // hexadecimalInteger : Int = 17

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

All of these floating-point literals have a decimal value of ``12.1875``:

.. testcode:: numberLiterals

   -> let decimalDouble = 12.1875
   << // decimalDouble : Double = 12.1875
   -> let exponentDouble = 1.21875e1
   << // exponentDouble : Double = 12.1875
   -> let hexadecimalDouble = 0xC.3p0
   << // hexadecimalDouble : Double = 12.1875

Numeric literals can contain extra formatting to make them easier to read.
Both integers and floats can be padded with extra zeroes at the beginning
and can contain underscores to help with readability.
Neither type of formatting affects the underlying value of the literal:

.. testcode:: numberLiterals

   -> let paddedDouble = 000123.456
   << // paddedDouble : Double = 123.456
   -> let oneMillion = 1_000_000
   << // oneMillion : Int = 1000000
   -> let justOverOneMillion = 1_000_000.000_000_1
   << // justOverOneMillion : Double = 1e+06

.. _BasicTypes_NumericTypeConversion:

Numeric Type Conversion
-----------------------

The ``Int`` type should be used for all general-purpose integer named values in your code,
even if they are known to be nonnegative.
Using the default integer type in everyday situations means that
integer named values are immediately interoperable in your code
and will match the inferred type for integer literal values.

Other integer types should be used only when they are are specifically needed for the task at hand,
due to explicitly-sized data from an external source,
or for performance, memory usage, or other necessary optimization.
Using explicitly-sized types in these situations
helps to catch any accidental value overflows
and implicitly documents the nature of the data being used.

.. _BasicTypes_IntegerBounds:

Integer Bounds
~~~~~~~~~~~~~~

The minimum and maximum values of each integer type can be accessed using its ``min`` and ``max`` properties:

.. testcode:: namedValues

   -> let minValue = UInt8.min  // minValue is equal to 0, and is of type UInt8
   << // minValue : UInt8 = 0
   -> let maxValue = UInt8.max  // maxValue is equal to 255, and is of type UInt8
   << // maxValue : UInt8 = 255

The values of these properties are of the appropriate sized number type
(such as ``UInt8`` in the example above)
and can therefore be used in expressions alongside other values of the same type.

.. _BasicTypes_IntegerConversion:

Integer Conversion
~~~~~~~~~~~~~~~~~~

The range of numbers that can be stored in an integer named value
is different for each numeric type.
An ``Int8`` named value can store numbers between ``-128`` and ``127``,
whereas a ``UInt8`` named value can store numbers between ``0`` and ``255``.
A number that can be stored in one numeric type
cannot necessarily be stored in another numeric type,
and trying to do so is reported as an error when your code is compiled:

.. testcode:: namedValuesOverflowError

   -> let cannotBeNegative: UInt8 = -1
   !! <REPL Input>:1:31: error: integer literal overflows when stored into 'UInt8'
   !! let cannotBeNegative: UInt8 = -1
   !!                        ^
   // UInt8 cannot store negative numbers, and so this will report an error
   -> let tooBig: Int8 = Int8.max + 1
   !! <REPL Input>:1:29: error: arithmetic operation '127 + 1' (on type 'Int8') results in an overflow
   !! let tooBig: Int8 = Int8.max + 1
   !!                      ^
   // Int8 cannot store a number larger than its maximum value,
   // and so this will also report an error

Because of this,
numeric type conversion is something you must opt in to on a case-by-case basis.
This opt-in approach avoids accidental errors
and helps to make type conversion intentions explicit in your code.

To convert from one specific number type to another,
you initialize a new number of the desired type with the existing value:

.. testcode:: typeConversion

   -> let twoThousand: UInt16 = 2_000
   << // twoThousand : UInt16 = 2000
   -> let one: UInt8 = 1
   << // one : UInt8 = 1
   -> let twoThousandAndOne = twoThousand + UInt16(one)
   << // twoThousandAndOne : UInt16 = 2001

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

.. _BasicTypes_IntegerAndFloatingPointConversion:

Integer and Floating-Point Conversion
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Conversions between integer and floating-point numeric types must also be made explicit:

.. testcode:: typeConversion

   -> let three = 3
   << // three : Int = 3
   -> let pointOneFourOneFiveNine = 0.14159
   << // pointOneFourOneFiveNine : Double = 0.14159
   -> let pi = Double(three) + pointOneFourOneFiveNine
   << // pi : Float64 = 3.14159
   /> pi equals \(pi), and is inferred to be of type Double
   </ pi equals 3.14159, and is inferred to be of type Double

Here, the value of the constant ``three`` is used to create a new value of type ``Double``,
so that both sides of the addition are of the same type.
Without this conversion in place, the addition would not be allowed.

.. TODO: the return type of pi here is inferred as Float64,
   but it should really be inferred as Double.
   This is due to rdar://15211554.
   This code sample should be updated once the issue is fixed.

The reverse is also true for floating-point to integer conversion,
in that an integer type can be initialized with a ``Double`` or ``Float`` value:

.. testcode:: typeConversion

   -> let integerPi = Int(pi)
   << // integerPi : Int = 3
   /> integerPi equals \(integerPi), and is inferred to be of type Int
   </ integerPi equals 3, and is inferred to be of type Int

Floating-point values are always truncated when used to initialize a new integer value in this way.
This means that ``4.75`` becomes ``4``, and ``-3.9`` becomes ``-3``.

.. TODO: negative floating-point numbers cause an overflow when used
   to initialize an unsigned integer type.
   This has been filed as rdar://problem/16206455,
   and this section may need updating based on the outcome of that Radar.

.. note::

   The rules for combining numeric named values are different to
   the rules for numeric literals.
   The literal value ``3`` can be added directly to the literal value ``0.14159``,
   because number literals do not have an explicit type in and of themselves.
   Their type is inferred only at the point that they are evaluated by the compiler.

.. NOTE: this section on explicit conversions could be included in the Operators section.
   I think it's more appropriate here, however,
   and helps to reinforce the “just use Int” message.

.. _BasicTypes_TypeAliases:

Type Aliases
------------

:newTerm:`Type aliases` define an alternative name for an existing type.
You define type aliases with the ``typealias`` keyword.

Type aliases are useful when you want to refer to an existing type
by a name that is contextually more appropriate,
such as when working with data of a specific size from an external source:

.. testcode:: typeAliases

   -> typealias AudioSample = UInt16

Once you define a type alias,
you can use the alias anywhere you might use the original name:

.. testcode:: typeAliases

   -> var maxAmplitudeFound = AudioSample.min
   << // maxAmplitudeFound : UInt16 = 0
   /> maxAmplitudeFound is now \(maxAmplitudeFound)
   </ maxAmplitudeFound is now 0

Here, ``AudioSample`` is defined as an alias for ``UInt16``.
Because it is an alias,
the call to ``AudioSample.min`` actually calls ``UInt16.min``,
which provides an initial value of ``0`` for the ``maxAmplitudeFound`` variable.

.. note::

   Type aliases do not actually define a new type in Swift.
   They are just an alternative name for an existing type.
   In the example above,
   ``maxAmplitudeFound`` is of type ``UInt16``, not ``AudioSample``.

.. _BasicTypes_Booleans:

Booleans
--------

Swift has a basic :newTerm:`Boolean` type, called ``Bool``.
Boolean values are referred to as :newTerm:`logical`,
because they can only ever be true or false.
To represent this fact, Swift provides two Boolean literal values,
``true`` and ``false``:

.. testcode:: booleans

   -> let orangesAreOrange = true
   << // orangesAreOrange : Bool = true
   -> let turnipsAreDelicious = false
   << // turnipsAreDelicious : Bool = false

The types of ``orangesAreOrange`` and ``turnipsAreDelicious``
have been inferred as ``Bool`` from the fact that
they were initialized with Boolean literal values.
As with ``Int`` and ``Double`` above,
you don't need to declare named values as ``Bool``
if you set them to ``true`` or ``false`` as soon as you create them.
Type inference helps to make Swift code much more concise and readable
when initializing named values with other values whose type is already known.

Boolean values are particularly useful when working with conditional statements
such as the ``if``-``else`` statement:

.. testcode:: booleans

   -> if turnipsAreDelicious {
         println("Mmm, tasty turnips!")
      } else {
         println("Eww, turnips are horrible.")
      }
   <- Eww, turnips are horrible.

Conditional statements such as ``if``-``else`` are covered in more detail in :doc:`ControlFlow`.

Swift's type safety means that non-Boolean values cannot be substituted for ``Bool``.
The following example will produce an error:

.. testcode:: booleansNotLogicValue

   -> let i = 1
   << // i : Int = 1
   -> if i {
         // this example will not compile, and will report an error
      }
   !! <REPL Input>:1:4: error: type 'Int' does not conform to protocol 'LogicValue'
   !! if i {
   !!   ^

However, it is valid to say:

.. testcode:: booleansIsLogicValue

   -> let i = 1
   << // i : Int = 1
   -> if i == 1 {
         // this example will compile successfully
      }

The result of the ``i == 1`` comparison is of type ``Bool``,
and so this second example passes the type-check.
(Comparisons like ``i == 1`` are discussed in :doc:`BasicOperators`.)

As with other examples of type safety in Swift,
this approach avoids accidental errors,
and ensures that the intention of a particular section of code is always made clear.

.. note::

   Strictly speaking, an ``if``-``else`` statement's condition expression
   can be of any type that conforms to the ``LogicValue`` protocol.
   ``Bool`` is one example of a type that conforms to this protocol,
   but there are others, such as :newTerm:`optionals`, described below.
   The ``LogicValue`` protocol is described in more detail in :doc:`Protocols`.

.. TODO: I'm not quite happy with this yet.
   Introducing the LogicValue protocol at this early stage is a bit overkill.
   I'd like to revisit this if time permits, and maybe move this to Control Flow.

.. TODO: the LogicValue protocol is not yet described in the Protocols chapter.

.. _BasicTypes_Tuples:

Tuples
------

:newTerm:`Tuples` are a way to group together multiple values of various types.
They provide a simple way to pass around multiple values as a single entity.

Here's an example of a tuple:

.. testcode:: tuples

   -> let httpStatus = (404, "Not Found")
   << // httpStatus : (Int, String) = (404, "Not Found")
   /> httpStatus is of type (Int, String), and equals (\(httpStatus.0), \"\(httpStatus.1)\")
   </ httpStatus is of type (Int, String), and equals (404, "Not Found")

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

   -> println("The status code is \(httpStatus.0)")
   <- The status code is 404
   -> println("The status message is \(httpStatus.1)")
   <- The status message is Not Found

As an alternative,
you can :newTerm:`decompose` a tuple's contents into separate named values,
which can then be used as normal:

.. testcode:: tuples

   -> let (statusCode, statusMessage) = httpStatus
   << // (statusCode, statusMessage) : (Int, String) = (404, "Not Found")
   -> println("The status code is \(statusCode)")
   <- The status code is 404
   -> println("The status message is \(statusMessage)")
   <- The status message is Not Found

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
These are described in detail in :doc:`ClassesAndStructures`.

.. _BasicTypes_Optionals:

Optionals
---------

:newTerm:`Optionals` are a way to handle missing values.
They can be used to say:

* There *is* a value, and it equals *x*

…or…

* There *isn't* a value at all

.. note::

   This concept doesn't exist in C or Objective-C.
   The nearest thing in Objective-C is
   the ability to return ``nil`` from a method that would otherwise return an object,
   with ``nil`` meaning “the absence of a valid object.”
   However, this only works for objects – it doesn't work for
   structs, or basic C types, or enumeration values.
   For these types,
   Objective-C methods typically return a special value (such as ``NSNotFound``) to indicate the absence of a value.
   This assumes that the method's caller knows there is a special value to test against,
   and remembers to check for it.
   Swift's optionals give a way to indicate the absence of a value for *any type at all*,
   without the need for special constants or ``nil`` tests.

Here's an example.
Swift's ``String`` type has a method called ``toInt``,
which tries to convert a ``String`` value into an ``Int`` value.
However, not every string can be converted into an integer.
The string ``"123"`` can be converted into the numeric value ``123``,
but the string ``"hello, world"`` does not have an obvious numeric value to convert to.

The example below shows how to use ``toInt`` to try and convert a ``String`` into an ``Int``:

.. testcode:: optionals

   -> let possibleNumber = "123"
   << // possibleNumber : String = "123"
   -> let convertedNumber = possibleNumber.toInt()
   << // convertedNumber : Int? = <unprintable value>
   // convertedNumber is inferred to be of type "Int?", or "optional Int"

Because the ``toInt`` method might fail,
it returns an *optional* ``Int``, rather than an ``Int``.
An optional ``Int`` is written as ``Int?``, not ``Int``.
The question mark indicates that the value it contains is optional,
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
“I know that this optional definitely has a value – please use it.”

.. testcode:: optionals

   -> if convertedNumber {
         println("\(possibleNumber) has an integer value of \(convertedNumber!)")
      } else {
         println("\(possibleNumber) could not be converted to an integer")
      }
   <- 123 has an integer value of 123

``if``-``else`` statements are described in more detail in :doc:`ControlFlow`.

.. note::

   Trying to use ``!`` to access a non-existent optional value will trigger
   an unrecoverable runtime error.

.. _BasicTypes_OptionalBinding:

Optional Binding
~~~~~~~~~~~~~~~~

:newTerm:`Optional binding` is a convenient way to find out if an optional contains a value,
and to make that value available if it exists.
Optional binding can be used with ``if``-``else`` and ``while`` statements
to simplify and shorten the unwrapping of a value contained within an optional.
(``if``-``else`` and ``while`` statements are described in more detail in :doc:`ControlFlow`.)

Optional bindings for the ``if``-``else`` statement are written in the following form:

.. syntax-outline::

   if let <#constantName#> = <#someOptional#> {
      <#statements#>
   }

The example from above can be can be rewritten to use optional binding:

.. testcode:: optionals

   -> if let actualNumber = possibleNumber.toInt() {
         println("\(possibleNumber) has an integer value of \(actualNumber)")
      } else {
         println("\(possibleNumber) could not be converted to an integer")
      }
   <- 123 has an integer value of 123

As before, this example uses the ``toInt`` method from ``String``
to try and convert ``"123"`` into an ``Int``.
It then prints a message to indicate if the conversion was successful.

``if let actualNumber = possibleNumber.toInt()`` can be read as:

“If the optional ``Int`` returned by ``possibleNumber.toInt`` contains a value,
set a new constant called ``actualNumber`` to the value contained in the optional.”

If the conversion is successful,
the ``actualNumber`` constant becomes available for use within
the first branch of the ``if``-``else`` statement.
It has already been initialized with the value contained *within* the optional,
and so there is no need to use the ``!`` suffix to access its value.
In this example, ``actualNumber`` is simply used to print the result of the conversion.

You can use both constants and variables with optional binding.
If you wanted to manipulate the value of ``actualNumber``
within the first block of the ``if``-``else`` statement,
you could write ``if var actualNumber`` instead,
and the value contained within the optional
would be made available as a variable rather than a constant.

.. note::

   Constants or variables created with optional binding
   are only available within the code block following their creation,
   as in the first branch of the ``if``-``else`` statement above.
   If you want to work with the optional's value outside of this code block,
   you should declare a constant or variable yourself
   before the ``if``-``else`` statement begins.

.. _BasicTypes_Nil:

nil
~~~

You can set an optional variable back to a valueless state
by assigning it the special value ``nil``:

.. testcode:: optionals

   -> var serverResponseCode: Int? = 404
   << // serverResponseCode : Int? = <unprintable value>
   /> serverResponseCode contains an actual Int value of \(serverResponseCode!)
   </ serverResponseCode contains an actual Int value of 404
   -> serverResponseCode = nil
   // serverResponseCode now contains no value

.. note::

   ``nil`` cannot be used with non-optional constants and variables.
   If a named value in your code needs to be able to cope with
   the absence of a value under certain conditions,
   it should always be declared as an optional value of the appropriate type.

If you define an optional constant or variable without providing a default value,
the constant or variable is automatically set to ``nil`` for you:

.. testcode:: optionals

   -> var surveyAnswer: String?
   << // surveyAnswer : String? = <unprintable value>
   // surveyAnswer is automatically set to nil

.. note::

   Swift's ``nil`` is not the same as ``nil`` in Objective-C.
   In Objective-C, ``nil`` is a pointer to a non-existent object.
   In Swift, ``nil`` is not a pointer – it is the absence of a value of a certain type.
   Optionals of *any* type can be set to ``nil``, not just object types.

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
   * https://[Internal Staging Server]/docs/whitepaper/LexicalStructure.html#identifiers-and-operators
   * https://[Internal Staging Server]/docs/whitepaper/LexicalStructure.html#integer-literals
   * https://[Internal Staging Server]/docs/whitepaper/LexicalStructure.html#floating-point-literals
   * https://[Internal Staging Server]/docs/whitepaper/GuidedTour.html#declarations-and-basic-syntax
   * https://[Internal Staging Server]/docs/whitepaper/GuidedTour.html#tuples
   * https://[Internal Staging Server]/docs/literals.html
   * http://en.wikipedia.org/wiki/Operator_(computer_programming)
