.. docnote:: Subjects to be covered in this section

	* Declaration syntax
	* Multiple variable declarations and initializations on one line
	* Naming conventions
	* Integer types
	* Floating point types
	* Bool
	* Void
	* No suffixes for integers / floats
	* Lack of promotion and truncation
	* Lazy initialization
	* A brief mention of characters and strings
	* Tuples
	* Enums
	* Enum element patterns
	* Enums for groups of constants
	* Enums with raw values (inc. getting / setting raw values)
	* Enum default / unknown values?
	* Enums with multiple identical values?
	* Enum delayed identifier resolution
	* Typealiases
	* Type inference
	* Type casting through type initializers
	* Arrays
	* Optional types
	* Pattern binding
	* Literals
	* Immutability
	* (Don't redeclare objects within a REPL session)
	* C primitive types

Basic Types
===========

Numbers
-------

Swift provides :term:`integers` and :term:`floating-point numbers` in :term:`signed and unsigned` forms up to 128 bits in size. These basic numeric types follow a similar naming convention to C, in that an 8-bit unsigned integer is a ``UInt8``, and a signed 64-bit floating-point number is a ``Float64``. However, unlike C, these base types have capitalized names (``UInt8`` rather than ``uint8``). All types have capitalized names in Swift, and numbers are no exception. (See the :doc:`ReferenceManual` for a complete list of numeric types.)

.. glossary::

	integers
		An integer is a whole number with no fractional component (such as ``42``, ``0`` and ``-23``).

	floating-point numbers
		A floating-point number (also known as a float) is a number with a fractional component (such as ``3.14159``, ``0.1`` or ``-273.15``).

	signed and unsigned
		Signed values can be positive or negative. Unsigned values can only be positive.

In most cases, there's no need to pick a specific size of integer or floating-point number to use in your code. Swift provides three standard number types:

* ``Int``, which is the same as ``Int64``, and should be used for general integer values
* ``Float``, which is the same as ``Float32``, and should be used for normal floating-point values
* ``Double``, which is the same as ``Float64``, and should be used when floating-point values need to be very large or precise

Unless you need to work with a :term:`specific size` of integer or floating-point number, you should always use ``Int``, ``Float`` or ``Double`` for code consistency and interoperability.

.. glossary::

	specific size
		Certain tasks may require you to be more specific about the type of number that you need. You might use a ``Float16`` to read 16-bit audio samples, or a ``UInt8`` when working with raw 8-bit byte data, for example.

Strong typing and type inference
--------------------------------

Swift is a :term:`strongly-typed language`. Strong typing enables Swift to perform type checks when it compiles your code, which helps to avoid accidental errors when working with different value types. However, this doesn't mean that you always have to provide an explicit type definition. If you don't specify the type of value you need, Swift will use :term:`type inference` to work out the appropriate type to use.

.. glossary::

	strongly-typed language
		Strongly-typed languages require you to be clear about the types of values and objects your code can work with. If some part of your code expects a string, for example, strong typing means that you can't accidentally pass it an integer by mistake.

	type inference
		Type inference is the ability for a compiler to automatically deduce the type of a particular expression at compile-time (rather than at run-time). The Swift compiler can often infer the type of a variable without the need for explicit type definitions, just by examining the values you provide.

For example: if you assign the value ``42`` to a variable, without saying what type it is:

.. testcode:: typeInference

	(swift) var a = 42
	// a : Int = 42

…Swift will deduce that you want the variable to be an ``Int``, because you have initialized it with an integer value.

Likewise, if you don't specify a type for a floating-point number:

.. testcode:: typeInference

	(swift) var pi = 3.1415926
	// pi : Double = 3.14159

…Swift assumes that you want to create a ``Double`` from the value of ``3.1415926``. (Swift always chooses ``Double`` rather than ``Float`` when inferring the type of floating-point numbers.)

Number literals
---------------

:term:`Number literals` can be expressed in several different ways:

* Integer literals can be decimal (with no prefix), :term:`binary` (with a ``0b`` prefix), :term:`octal` (``0o``), or :term:`hexadecimal` (``0x``)
* Floating-point literals can be decimal (no prefix) or hexadecimal (``0x``), and can have an optional :term:`exponent` (indicated by an upper- or lower-case ``e`` for decimal floats, and upper- or lower-case ``p`` for hexadecimal floats).

.. glossary::

	number literals
		Number literals are fixed-value numbers included directly in your source code, such as ``42`` or ``3.14159``.

	binary
		Binary numbers are counted with two (rather than ten) basic units. They only ever contain the numbers ``0`` and ``1``. In binary notation, ``1`` is ``0b1``, and ``2`` is ``0b10``.

	octal
		Octal numbers are counted with eight (rather than ten) basic values. They only ever contain the numbers ``0`` to ``7``. In octal notation, ``7`` is ``0o7``, and ``8`` is ``0o10``.

	hexadecimal
		Hexadecimal numbers are counted with 16 (rather than ten) basic values. They contain the numbers ``0`` to ``9``, plus the letters ``A`` through ``F`` (to represent base units with values of ``10`` through ``15``). In hexadecimal notation, ``9`` is ``0x9``, ``10`` is ``0xA``, ``15`` is ``0xF``, and ``16`` is ``0x10``.

	exponent
		Floating-point values with an exponent are of the form ‘*[number]* shifted by *[exponent]* decimal places’ (such as ``1.25e2``). All the exponent does is to shift the number right or left by that many decimal places. Positive exponents move the number to the left; negative exponents move it to the right. So, ``1.25e2`` means ‘``1.25`` shifted ``2`` places to the left’ (aka ``125.0``), and ``1.25e-2`` means ‘``1.25`` shifted ``2`` places to the right’ (aka ``0.0125``).

All of these integer literals have a decimal value of ``17``:

.. testcode:: numberLiterals

	(swift) var dec = 17
	// dec : Int = 17
	(swift) var bin = 0b10001	// 17 in binary notation
	// bin : Int = 17
	(swift) var oct = 0o21		// 17 in octal notation
	// oct : Int = 17
	(swift) var hex = 0x11		// 17 in hexadecimal notation
	// hex : Int = 17

All of these floating-point literals have a decimal value of ``12.5``:

.. testcode:: numberLiterals

	(swift) var dec = 12.5
	// dec : Double = 12.5
	(swift) var exp = 1.25e1
	// exp : Double = 12.5
	(swift) var hex = 0xC.8p0
	// hex : Double = 12.5

Number literals can contain extra formatting to make them easier to read. Both integers and floats can be padded with :term:`extra zeroes` on the beginning (so ``01234 == 1234``), and can contain underscores to help with readability. Neither type of formatting affects the underlying value of the literal.

.. glossary::

	extra zeroes
		In C, adding an extra zero to the beginning of an integer literal indicates that the literal is in octal notation. This isn't the case in Swift. Always add the ``0o`` prefix if your numbers are in octal notation.

All of these literals are valid in Swift:

.. testcode:: numberLiterals

	(swift) var oneMillion = 1_000_000
	// oneMillion : Int = 1000000
	(swift) var justOverOneMillion = 1_000_000.000_000_1
	// justOverOneMillion : Double = 1e+06
	(swift) var paddedDouble = 000123.456
	// paddedDouble : Double = 123.456

.. refnote:: References

	* https://[Internal Staging Server]/docs/LangRef.html#integer_literal ✔︎
	* https://[Internal Staging Server]/docs/LangRef.html#floating_literal
	* https://[Internal Staging Server]/docs/LangRef.html#expr-delayed-identifier
	* https://[Internal Staging Server]/docs/whitepaper/TypesAndValues.html#types-and-values
	* https://[Internal Staging Server]/docs/whitepaper/TypesAndValues.html#integer-types ✔︎
	* https://[Internal Staging Server]/docs/whitepaper/TypesAndValues.html#no-integer-suffixes
	* https://[Internal Staging Server]/docs/whitepaper/TypesAndValues.html#no-implicit-integer-promotions-or-conversions
	* https://[Internal Staging Server]/docs/whitepaper/TypesAndValues.html#no-silent-truncation-or-undefined-behavior
	* https://[Internal Staging Server]/docs/whitepaper/TypesAndValues.html#separators-in-literals ✔︎
	* https://[Internal Staging Server]/docs/whitepaper/TypesAndValues.html#floating-point-types
	* https://[Internal Staging Server]/docs/whitepaper/TypesAndValues.html#bool
	* https://[Internal Staging Server]/docs/whitepaper/TypesAndValues.html#tuples
	* https://[Internal Staging Server]/docs/whitepaper/TypesAndValues.html#arrays
	* https://[Internal Staging Server]/docs/whitepaper/TypesAndValues.html#enumerations
	* https://[Internal Staging Server]/docs/whitepaper/LexicalStructure.html#identifiers-and-operators
	* https://[Internal Staging Server]/docs/whitepaper/LexicalStructure.html#integer-literals
	* https://[Internal Staging Server]/docs/whitepaper/LexicalStructure.html#floating-point-literals
	* https://[Internal Staging Server]/docs/whitepaper/GuidedTour.html#declarations-and-basic-syntax
	* https://[Internal Staging Server]/docs/whitepaper/GuidedTour.html#tuples
	* https://[Internal Staging Server]/docs/whitepaper/GuidedTour.html#enums
