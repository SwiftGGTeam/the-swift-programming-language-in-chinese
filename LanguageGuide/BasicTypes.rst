.. docnote:: Subjects to be covered in this section

    * Declaration syntax ✔︎
    * Multiple variable declarations and initializations on one line:
    * var i = 1; var j = 2; print(i + j)
    * var k = 1, l = 2
    * …but not… var m, n = 2
    * Naming conventions ✔︎
    * Integer types ✔︎
    * Floating point types ✔︎
    * Bool ✔︎
    * Void
    * No suffixes for integers / floats ✔︎
    * Lazy initialization
    * A brief mention of characters and strings
    * Tuples ✔︎
    * Varargs tuples
    * Enums ✔︎
    * Enum element patterns
    * Enums for groups of constants ✔︎
    * Enums with raw values (inc. getting / setting raw values) ✔︎
    * Enum default / unknown values?
    * Enum delayed identifier resolution
    * Option sets
    * Typealiases ✔︎
    * Type inference ✔︎
    * Type casting through type initializers ✔︎
    * Arrays
    * Optional types ✔︎
    * Pattern binding
    * Literals ✔︎
    * Immutability
    * (Don't redeclare objects within a REPL session)
    * min() and max() static functions for integers ✔︎


Basic Types
===========

Swift provides several basic types for working with fundamental values. Some of these types will be familiar to C and Objective-C developers:

* *numbers* (including integers and floating-point numbers)
* *booleans* (for values that can only be true or false)
* *arrays* (which can contain several values in a defined order), and
* *enumerations* (which can specify several different values of a similar type)
    
Although these types may be familiar, Swift expands their capabilities beyond what is possible in other languages.

In addition to these simple types, Swift introduces some less familiar (but very powerful) advanced types:

* arbitrary groups of values of different types (known as *tuples*)
* types that can be either a known value or a missing value (known as *optionals*)

Each of these types, and the ways in which they can be used, are discussed in more detail below.

Swift also provides a powerful and flexible way to create and work with string and character types. These are introduced below, and are discussed in more detail in :doc:`Strings`.

Declaring and Naming Variables
------------------------------

.. QUESTION: Do we need to have introduced the REPL (or some other learning environment) before starting this section?

All variables in Swift must be declared before they are used. Here's a simple variable declaration:

.. testcode:: declaringVariables

    (swift) var a = 1
    // a : Int = 1
    
This can be read as:

    Declare a variable called ``a``, and give it an initial value of ``1``.

Variable definitions can include a specific *type*, to be explicit about the kind of variable you want to create:

.. testcode:: declaringVariables

    (swift) var b : String = "Hello"
    // b : String = "Hello"

The colon in the declaration means *“…that is a…”*, so this can be read as:

    Declare a variable called ``b`` that is a ``String``, and give it an initial value of ``"Hello"``.

You can use pretty much any character you like in a variable name, including `Unicode <http://en.wikipedia.org/wiki/Unicode>`_ characters:

.. testcode:: declaringVariables

    (swift) var π = 3.14159
    // π : Double = 3.14159
    (swift) var 你好 = "你好世界"
    // 你好 : String = "你好世界"
    (swift) var 🐶🐮 = "dogcow"
    // 🐶🐮 : String = "dogcow"

Variable names can't start with a number, but they can contain numbers elsewhere in their name. They also can't contain mathematical symbols, arrows, line and box drawing characters, or private-use or invalid Unicode code points.
    
Once you've declared a variable, you can't redeclare it again with the same name, but you can set the existing variable to another value of the same type. You can also print the value of a variable using the ``println()`` function, to see its current value:

.. testcode:: declaringVariables

    (swift) var friendlyWelcome = "hello, world"
    // friendlyWelcome : String = "hello, world"
    (swift) friendlyWelcome = "👋, 🌎"
    (swift) println(friendlyWelcome)
    >>> 👋, 🌎

.. NOTE: this is a deliberately simplistic description of what you can do with println(). It will be expanded later on.

Numbers
-------

Swift supports two fundamental types of number: :term:`integers`, and :term:`floating-point numbers`. Swift provides both types of number in :term:`signed and unsigned` forms up to 128 bits in size. These basic numeric types follow a similar naming convention to C, in that an 8-bit unsigned integer is a ``UInt8``, and a signed 64-bit floating-point number is a ``Float64``. Like all types in Swift, these basic numeric types have capitalized names. (See the :doc:`../ReferenceManual/ReferenceManual` for a complete list of numeric types.)

.. TODO: do we actually have a Float16? It's mentioned on https://[Internal Staging Server]/docs/whitepaper/TypesAndValues.html#floating-point-types , but doesn't exist as of rev. 9212.

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
* ``Double``, which is the same as ``Float64``, and should be used when floating-point values need to be very large or particularly precise

Unless you need to work with a :term:`specific size` of integer or floating-point number, you should always use ``Int``, ``Float`` or ``Double`` for code consistency and interoperability.

.. glossary::

    specific size
        Certain tasks may require you to be more specific about the type of number that you need. You might use a ``Float16`` to read 16-bit audio samples, or a ``UInt8`` when working with raw 8-bit byte data, for example.

min() and max()
~~~~~~~~~~~~~~~

The minimum and maximum values of each integer type can be accessed using its ``min()`` and ``max()`` functions:

.. testcode:: declaringVariables

    (swift) var minimumValue = UInt8.min()
    // minimumValue : UInt8 = 0
    (swift) var maximumValue = UInt8.max()
    // maximumValue : UInt8 = 255

Note that the ``min()`` and ``max()`` functions return a value that is also of the appropriate number type.

Strong Typing and Type Inference
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Swift is a *strongly-typed* language. This means that it encourages you to be clear about the types of values and objects your code can work with. If some part of your code expects a string, for example, strong typing means that you can't accidentally pass it an integer by mistake.

Because Swift is strongly-typed, it is able to perform *type checks* when compiling your code. Any mismatched types are flagged up as errors so that you can fix them.

Type-checking helps to avoid accidental errors when working with different types of value. However, this doesn't mean that you have to define the type of every variable you use. If you don't specify the type of value you need, Swift will use *type inference* to work out the appropriate type. Type inference is the ability for a compiler to automatically deduce the type of a particular expression when it compiles your code, just by examining the values you provide.

For example: if you assign a :term:`literal value` of ``42`` to a variable, without saying what type it is:

.. glossary::

    literal value
        A *literal value* is a one-off value that appears directly in your source code, such as ``42`` and ``3.14159`` in the examples below.


.. testcode:: typeInference

    (swift) var meaningOfLife = 42
    // meaningOfLife : Int = 42

…Swift will deduce that you want the variable to be an ``Int``, because you have initialized it with a number that looks like an integer.

Likewise, if you don't specify a type for a floating-point literal:

.. testcode:: typeInference

    (swift) var pi = 3.14159
    // pi : Double = 3.14159

…Swift assumes that you want to create a ``Double`` from the value of ``3.14159``. (Note that Swift always chooses ``Double`` rather than ``Float`` when inferring the type of floating-point numbers.)

If you combine integer and floating-point literals in an expression, a type of ``Double`` will be inferred from the context:

.. testcode:: typeInference

    (swift) var anotherPi = 3 + 0.14159
    // anotherPi : Double = 3.14159

Note that the literal value of ``3`` does not have an explicit type in and of itself, and the appropriate output type of ``Double`` is inferred from the presence of a floating-point literal as part of the addition.

Type inference means that Swift requires far fewer type declarations than languages such as C or Objective-C. Variables are still explicitly-typed, but much of the work of specifying their type is done for you.

Number literal expressions
~~~~~~~~~~~~~~~~~~~~~~~~~~

Number literals can be expressed in several different ways:

* Integer literals can be decimal (with no prefix), :term:`binary` (with a ``0b`` prefix), :term:`octal` (``0o``), or :term:`hexadecimal` (``0x``)
* Floating-point literals can be decimal (no prefix) or hexadecimal (``0x``), and can have an optional :term:`exponent` (indicated by an upper- or lower-case ``e`` for decimal floats, and upper- or lower-case ``p`` for hexadecimal floats).

.. glossary::

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

    (swift) var decimalInteger = 17
    // decimalInteger : Int = 17
    (swift) var binaryInteger = 0b10001    // 17 in binary notation
    // binaryInteger : Int = 17
    (swift) var octalInteger = 0o21        // 17 in octal notation
    // octalInteger : Int = 17
    (swift) var hexadecimalInteger = 0x11  // 17 in hexadecimal notation
    // hexadecimalInteger : Int = 17

All of these floating-point literals have a decimal value of ``12.5``:

.. testcode:: numberLiterals

    (swift) var decimalDouble = 12.5
    // decimalDouble : Double = 12.5
    (swift) var exponentDouble = 1.25e1
    // exponentDouble : Double = 12.5
    (swift) var hexadecimalDouble = 0xC.8p0
    // hexadecimalDouble : Double = 12.5

Number literals can contain extra formatting to make them easier to read. Both integers and floats can be padded with :term:`extra zeroes` on the beginning (so ``01234 == 1234``), and can contain underscores to help with readability. Neither type of formatting affects the underlying value of the literal.

.. glossary::

    extra zeroes
        In C, adding an extra zero to the beginning of an integer literal indicates that the literal is in octal notation. This isn't the case in Swift. Always add the ``0o`` prefix if your numbers are in octal notation.

All of these literals are valid in Swift:

.. testcode:: numberLiterals

    (swift) var paddedDouble = 000123.456
    // paddedDouble : Double = 123.456
    (swift) var oneMillion = 1_000_000
    // oneMillion : Int = 1000000
    (swift) var justOverOneMillion = 1_000_000.000_000_1
    // justOverOneMillion : Double = 1e+06

Note that Swift has printed the value of ``justOverOneMillion`` as ``1e+06``. This is a short-form representation of its underlying ``Double`` value of ``1000000.0000001``. The actual value of ``justOverOneMillion`` still has all of the precision of the original.

Number Type Conversion
~~~~~~~~~~~~~~~~~~~~~~

As mentioned above, you should use ``Int`` for all integers in your code, and ``Float`` or ``Double`` for all floating-point numbers, unless you have a specific reason not to do so. This ensures that numbers of a similar nature can be used together safely, and reserves the more specific number types for when the exact size and type is important.

If you *do* need to use specific sizes, be aware that Swift does not allow implicit conversion between variables of different number types. You can't add a ``UInt8`` variable to a ``UInt16`` variable, for example. This avoids accidental errors when working with numbers of specific sizes, and means that number type conversion is something you choose to opt in to on a case-by-case basis. This helps to make type conversion intentions explicit in your code.

Note that this is different to the rule for number *literals* seen earlier – where ``3`` was added to ``0.14159`` – because number literals do not have an explicit type in and of themselves. Their type is only inferred at the point that they are evaluated by the compiler.

To convert from one number type to another, you initialize a new number of the desired type with the existing value, like this:

.. testcode:: typeConversion

    (swift) var twoThousand : UInt16 = 2000
    // twoThousand : UInt16 = 2000
    (swift) var one : UInt8 = 1
    // one : UInt8 = 1
    (swift) var twoThousandAndOne = twoThousand + UInt16(one)
    // twoThousandAndOne : UInt16 = 2001

``twoThousand`` is a ``UInt16``, but ``one`` is a ``UInt8``. They cannot be added together directly, because they are not of the same type. Instead, this code calls ``UInt16(one)`` to create a new ``UInt16`` initialized with the value of ``one``, and uses this value in place of the original. Because both sides of the addition are now of type ``UInt16``, the addition is allowed. (Note that the output variable, ``twoThousandAndOne``, is inferred to be a ``UInt16`` too.)

The syntax seen above – ``SomeType(ofInitialValue)`` – is the default way to call the initializer of a Swift type, and to pass in an initial value. Behind the scenes, ``UInt16`` has an initializer that accepts the ``UInt8`` type, and so it knows how to make a new ``UInt16`` from an existing ``UInt8``. You can't just pass in any type, however – it has to be something that ``UInt16`` already knows how to convert. The :doc:`ProtocolsAndExtensions` chapter shows how to extend existing types to accept new types (including your own type definitions) as initializers.

.. TODO: add a note that this is not traditional type-casting, and perhaps include a forward reference to the objects chapter.

The same is true for conversions between integer and floating-point variables. Conversions must be made explicit, as shown below:

.. testcode:: typeConversion

    (swift) var three = 3
    // three : Int = 3
    (swift) var pointOneFourOneFiveNine = 0.14159
    // pointOneFourOneFiveNine : Double = 0.14159
    (swift) var pi = Double(three) + pointOneFourOneFiveNine
    // pi : Float64 = 3.14159

Here, the value of ``three`` is used to create a new ``Double``, so that both sides of the addition are of the same type.

.. TODO: the return type of pi here is inferred as Float64, but it should really be inferred as Double. This is due to rdar://15211554 . This code sample should be updated once the issue is fixed.

.. NOTE: this section on explicit conversions could be included in the Operators section. I think it's more appropriate here, however, and helps to reinforce the ‘just use Int’ message.

Booleans
--------

Swift has a basic :term:`boolean` type, called ``Bool``. Values of type ``Bool`` can be either ``true`` or ``false``:

.. glossary::

    boolean
        A data type is said to be ‘boolean’ if it can only ever have one of two values: true or false.

.. testcode:: booleans

    (swift) var orangesAreOrange = true
    // orangesAreOrange : Bool = true
    (swift) var turnipsAreDelicious = false
    // turnipsAreDelicious : Bool = false

Note that Swift has inferred the types of ``orangesAreOrange`` and ``turnipsAreDelicious`` from the fact that they were initialized with ``Bool`` values. As with ``Int`` and ``Double`` above, you don't need to declare variables as being ``Bool`` if you set them to ``true`` or ``false`` as soon as you create them. Type inference helps to make Swift code much more concise and readable when initializing variables with known values.

Boolean values are particularly useful when working with conditional statements such as ``if {...} else {...}``:

.. testcode:: booleans

    (swift) if turnipsAreDelicious {
                println("Mmm, tasty turnips!")
            } else {
                println("Eww, turnips are horrible.")
            }
    >>> Eww, turnips are horrible.

Conditional statements are covered in more detail in :doc:`ControlFlow`.

Swift's strict type-checking means that non-boolean values cannot be substituted for ``Bool``. You cannot, for example, say::

    (swift) var i = 1
    // i : Int = 1
    (swift) if i {
                // do stuff
            }

…because ``i`` is not a ``Bool``. However, it is valid to say::

    (swift) if i == 1 {
                // do stuff
            }
    
The result of the ``i == 1`` comparison is a ``Bool``, and so this second example passes the strict type-check. (Comparisons like ``i == 1`` are discussed in :doc:`Operators`.)

As with other examples of strict typing in Swift, this approach avoids accidental errors, and ensures that the intention of a particular section of code is always made clear.

Tuples
------

Tuples are a way to group together multiple values of various types. Here's an example of a tuple:

.. testcode:: tuples

    (swift) var http200Status = (200, "OK")
    // http200Status : (Int, String) = (200, "OK")

``(200, "OK")`` is a tuple that groups together an ``Int`` and a ``String`` to describe an :term:`HTTP status code`. It could be described as “a tuple of type ``(Int, String)``”.

.. glossary::

    HTTP status code
        When a web browser makes a request for a web page (such as http://www.apple.com), it connects to the server and asks for a specific page. The server sends back a response containing a *status code* that describes whether or not the request was successful. Each status code has a number (such as ``200``) and a message (such as ``OK``), to describe the outcome of the request.

You can create tuples from whatever permutation of types you like, and they can contain as many different types as you like. There's nothing stopping you from having a tuple of type ``(Int, Int, Int)``, or ``(String, Bool)``, or indeed any other combination you need.

You can access the individual element values in a tuple using index numbers starting at zero:

.. testcode:: tuples

    (swift) http200Status.0
    // r0 : Int = 200
    (swift) http200Status.1
    // r1 : String = "OK"

You can also optionally name the elements in a tuple:

.. testcode:: tuples

    (swift) var http404Error = (statusCode: 404, description: "Not Found")
    // http404Error : (statusCode: Int, description: String) = (404, "Not Found")

This can be read as:

    Declare a variable called ``http404Error``, and set it to a tuple containing (an element called ``statusCode`` that is ``404``, and an element called ``description`` that is ``"Not Found"``).

Once you've done this, you can retrieve the element values by name, using dot syntax:

.. testcode:: tuples

    (swift) http404Error.statusCode
    // r2 : Int = 404
    (swift) http404Error.description
    // r3 : String = "Not Found"

Tuples are particularly useful as the return values of functions. A function that tries to retrieve a web page might return this ``http404Error`` tuple if it is unable to find the requested page. By returning a tuple with two distinct values, each of a different type, the function is able to provide more useful information about its outcome than if it could only return a single value of a single type.

Typealiases
~~~~~~~~~~~

If you find yourself using a particular type of tuple several times, you can define a ``typealias`` as shorthand for that tuple type. Here's how to define a generic tuple type to describe any HTTP status code:

.. testcode:: tuples

    (swift) typealias HTTPStatus = (statusCode: Int, description: String)

This can be read as:

    Define a ``typealias`` called ``HTTPStatus``, and set it to the tuple type that has (an element called ``statusCode`` that is an ``Int``, and an element called ``description`` that is a ``String``).

Note that this ``typealias`` doesn't set a *value* for ``statusCode`` or ``description``. It's not actually creating a tuple for a specific status code – it's defining what *all* HTTP status codes look like.

Note also that ``HTTPStatus`` has a capitalized name, because it is a new *type* of tuple, rather than an instance of a particular tuple type. This is different from the variable name ``http404Error``, which starts with a lowercase letter, and capitalizes sub-words within the name. This approach – ``CapitalizedWords`` for types, ``lowercaseThenCapitalizedWords`` for variable names – is strongly encouraged for consistency and readability.

Because it's a type, ``HTTPStatus`` can be used to declare new tuple variables of that type:

.. testcode:: tuples

    (swift) var http304Status : HTTPStatus = (statusCode: 304, description: "Not Modified")
    // http304Status : HTTPStatus = (304, "Not Modified")
    
This can be read as:

    Declare a variable called ``http304Status`` that is an ``HTTPStatus``. Initialize it with (a ``statusCode`` that is ``304``, and a ``description`` that is ``"Not Modified"``).

``HTTPStatus`` tuples can also be created in a shorter form, without needing to provide the element names:

.. testcode:: tuples

    (swift) var http500Error : HTTPStatus = (500, "Internal Server Error")
    // http500Error : HTTPStatus = (500, "Internal Server Error")

This can be read as:

    Declare a variable called ``http500Error`` that is an ``HTTPStatus``. Initialize it with (a first element value that is ``500``, and a second element value that is ``"Internal Server Error"``).

This fits the signature of an ``HTTPStatus`` (first element ``Int``, second element ``String``), and so this initialization is allowed by the Swift type-checker.

Because ``http500Error`` was defined as an ``HTTPStatus``, you can still access its elements by name, even though the names were not used to set the values:

.. testcode:: tuples

    (swift) http500Error.statusCode
    // r4 : Int = 500
    (swift) http500Error.description
    // r5 : String = "Internal Server Error"

Initializer Syntax
~~~~~~~~~~~~~~~~~~

Tuple types defined by ``typealias`` are fully-fledged types in Swift. Because ``HTTPStatus`` is now a type, you can also create new ``HTTPStatus`` tuples using *initializer syntax*:

.. testcode:: tuples

    (swift) var http301Status = HTTPStatus(statusCode: 301, description: "Moved Permanently")
    // http301Status : (statusCode: Int, description: String) = (301, "Moved Permanently")

This can be read as:

    Declare a variable called ``http301Status``, and set it to a new ``HTTPStatus`` initialized with (a ``statusCode`` that is ``301``, and a ``description`` that is ``"Moved Permanently"``).

Again, it is not essential to name the elements if they are provided in the same order as they were defined:

.. testcode:: tuples

    (swift) var http403Error = HTTPStatus(403, "Forbidden")
    // http403Error : (statusCode: Int, description: String) = (403, "Forbidden")

Initializer syntax is also used when creating struct and object instances, and is described in more detail in :doc:`ClassesObjectsAndStructs`.

.. QUESTION: Which is the preferred initialization syntax? Should we even give people the option?
.. QUESTION: Is this too early to introduce the concept of the default initializer?

Enumerations
------------

:term:`Enumerations` (also known as *enums*) are used to define multiple items of a similar type. For example: the four main points of a compass are all of a similar type, and can be written as an enumeration using the ``enum`` keyword:

.. glossary::

    Enumerations
        An enumeration list is often used to define all of the possible values of a certain type that a function might accept. For example, a text layout system might allow text to be left-, center- or right-aligned. Each of these three options is of a similar nature, and so an enumeration list could be defined to give all three text alignment options a special value of the same type.

.. testcode:: enums

    (swift) enum CompassPoint {
                case North
                case South
                case East
                case West
            }

The ``case`` keyword is used to indicate each new line of values. Multiple values can appear on a single line, separated by commas:

.. testcode:: enums

    (swift) enum Planet {
                case Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune
            }

Unlike C and Objective-C, Swift enums are not assigned a default integer value when they are created. In the CompassPoints example above, ``North``, ``South``, ``East`` and ``West`` do not implicitly equal ``0``, ``1``, ``2`` and ``3``. Instead, the different ``enum`` members are fully-fledged values in their own right, with an explicitly-defined type of ``CompassPoint``.

Each ``enum`` definition effectively defines a brand new type. As a result, their names (such as ``CompassPoint`` and ``Planet``) should start with a capital letter. ``enum`` types should have singular rather than plural names, so that they read as a sentence when declaring a variable of that type:

.. testcode:: enums

    (swift) var directionToHead = CompassPoint.West
    // directionToHead : CompassPoint = <unprintable value>

Note that the type of ``directionToHead`` has been inferred from the fact that it was initialized with one of the possible values of ``CompassPoint``. Once it is declared as being a ``CompassPoint``, it can be set to a different ``CompassPoint`` value using a shorter dot syntax:

.. testcode:: enums

    (swift) directionToHead = .East

The type of ``directionToHead`` is already known, and so we can drop the type when setting its value. This makes for highly readable code when working with explicitly-typed enumeration values.

The ``switch`` statement
~~~~~~~~~~~~~~~~~~~~~~~~

Enumeration values can be checked with a ``switch`` statement:

.. testcode:: enums

    (swift) directionToHead = .South
    (swift) switch directionToHead {
                case .North:
                    println("Most planets have a north")
                case .South:
                    println("Watch out for penguins")
                case .East:
                    println("Where the sun rises")
                case .West:
                    println("Where the skies are blue")
            }
    >>> Watch out for penguins

``switch`` statements use the ``case`` keyword to indicate each of the possible cases they will consider. You can read this as:

    Consider the value of ``directionToHead``. In the case where it equals ``.North``, print ``"Most planets have a north"``. In the case where it equals ``.South``, print ``"Watch out for penguins"``.

…and so on.

Note that ``switch`` statements in Swift do not ‘fall through’ the bottom of each case and into the next one. Instead, the entire ``switch`` statement completes its execution as soon as the first matching case is completed. This is different from C, which requires you to insert an explicit ``break`` statement at the end of every ``case`` to prevent fall-through. Avoiding default fall-through means that Swift switch statements are much more concise and predictable than their counterparts in C.

``switch`` statements must be exhaustive when working with ``enum`` values. If the ``case`` for ``.West`` had been omitted, this code would not compile, because it would not provide an exhaustive list of ``CompassPoint`` values. Enforcing completeness ensures that cases are not accidentally missed or forgotten, and is part of Swift's goal of completeness and lack of ambiguity.

When it is not appropriate to provide a ``case`` statement for every value, you can define a ``default`` catch-all case to cover any values that are not addressed explicitly. The ``default`` catch-all case should always appear last:

.. testcode:: enums

    (swift) var somePlanet = Planet.Earth
    // somePlanet : Planet = <unprintable value>
    (swift) switch somePlanet {
                case .Earth:
                    println("Mostly harmless")
                default:
                    println("Not a safe place for humans")
            }
    >>> Mostly harmless

``switch`` statements are covered in more detail in :doc:`ControlFlow`.

Enumerations with Associated Values
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The examples above show how the members of an enumeration are a defined (and typed) value in their own right. You can set a variable to the value ``Planet.Earth``, and check for this value later. However, it can sometimes be useful for enumeration members to also store *associated* values of other types alongside their own.

Swift enumerations can be defined to store an associated value of any given type, and this type can be different for each member of the enumeration if needed. These kinds of variables are known as *tagged unions* or *variants* in other programming languages.

For example: imagine an inventory tracking system that needs to track products using two different types of barcode. Some products are labelled with 1D barcodes in `UPC-A <http://en.wikipedia.org/wiki/Universal_Product_Code>`_ format, which uses the numbers ``0`` to ``9``. Each barcode has a ‘number system’ digit, followed by ten ‘identifier’ digits. These are followed by a ‘check‘ digit to verify that the code has been scanned correctly:

.. image:: ../images/barcode_UPC.png
    :height: 80

Other products are labelled with 2D barcodes in `QR code <http://en.wikipedia.org/wiki/QR_Code>`_ format, which can use any `ISO 8859-1 <http://en.wikipedia.org/wiki/ISO_8859-1>`_ character and can encode a string up to 2,953 characters long:

.. image:: ../images/barcode_QR.png
    :height: 80

It would be convenient for an inventory tracking system to be able to store UPC-A barcodes as a tuple of three integers, and QR code barcodes as a string of any length.

In Swift, an enumeration to define product barcodes of either type might look like this:

.. testcode:: enums

    (swift) enum Barcode {
                case UPCA(Int, Int, Int)
                case QRCode(String)
            }

This can be read as:

    Declare an enumeration type called ``Barcode``, than can take either a value of ``UPCA`` with an associated value of type (``Int``, ``Int``, ``Int``), or a value of ``QRCode`` with an associated value of type ``String``.

Note that this definition does not provide any actual ``Int`` or ``String`` values – it just defines the *type* of associated values that ``Barcode`` variables can store when they are equal to ``Barcode.UPCA`` or ``Barcode.QRCode``.

New barcodes can then be created using either of these types, as shown below:

.. testcode:: enums

    (swift) var productBarcode = Barcode.UPCA(8, 85909_51226, 3)
    // productBarcode : Barcode = <unprintable value>

This creates a new variable called ``productBarcode``, and assigns it a value of ``Barcode.UPCA`` with an associated tuple value of ``(8, 8590951226, 3)``. (Note that the provided identifier value has an underscore within its integer literal – ``85909_51226`` – to make it easier to read as a barcode.)

The same product can be changed to have a different type of barcode:

.. testcode:: enums

    (swift) productBarcode = .QRCode("ABCDEFGHIJKLMNOP")

At this point, the original ``Barcode.UPCA`` and its integer values are replaced by the new ``Barcode.QRCode`` and its string value. Variables of type ``Barcode`` can store either a ``.UPCA`` or a ``.QRCode`` (together with their associated values), but they can only store one or the other at a time.

The different barcode types can be checked using a ``switch`` statement, as before. This time, however, the associated values can be extracted as part of the ``switch``:

.. testcode:: enums

    (swift) switch productBarcode {
                case .UPCA(var numberSystem, var identifier, var check):
                    println("This product has a UPC-A barcode with an associated tuple value of \(numberSystem), \(identifier), \(check).")
                case .QRCode(var productCode):
                    println("This product has a QR code barcode with an associated string value of \(productCode).")
            }
    >>> This product has a QR code barcode with an associated string value of ABCDEFGHIJKLMNOP.

These two calls to ``println()`` use a special syntax to insert the values of ``numberSystem``, ``identifier``, ``check`` and ``productCode`` into printed descriptions of the barcodes. This syntax is known as *string interpolation*, and is a handy way to create and print strings that contain the current values of variables. All you need to do is to include ``\(variableName)`` in a longer string, and the current value of ``variableName`` will be inserted in place when the string is printed. (String interpolation is covered in more detail in :doc:`Strings`.)

.. TODO: Going by the Swift Language Reference Manual, it should be possible to name the members of the enum tuples above. However, this isn't currently working (see rdar://15238803). The example above should be updated if this is fixed.

Raw Values
~~~~~~~~~~

The barcode example above shows how members of an enumeration can declare that they store *associated* values of different types. In addition to associated values, enumerations can also come pre-populated with default values (called *raw values*), which are all of the *same* type.

Here's an example that stores raw ASCII values alongside named enumeration members:

.. testcode:: enums

    (swift) enum ASCIIControlCharacter : Char {
                case Tab = '\t'
                case LineFeed = '\n'
                case CarriageReturn = '\r'
            }

Here, the raw values for an ``enum`` called ``ASCIIControlCharacter`` are declared to be of type ``Char`` (short for *single character*), and are set to equal some of the more common ASCII control character values. Values of type ``Char`` are used to store single Unicode characters, and are marked up using single quote marks (``'``) rather than double quote marks (``"``), to distingush them from strings. (``Char`` values are described in more detail in :doc:`Strings`.)

Note that raw values are not the same as associated values. Raw values are set to pre-populated values when the ``enum`` is defined in your code, like the three ASCII codes above. Associated values are only set when you create a new variable based on one of the ``enum`` members.

Raw values can be strings, characters, or any of the integer or floating-point number types. Each raw value must be unique within its ``enum`` declaration. When integers are used for raw values, they auto-increment if no value is specified for some of the enumeration members. The enumeration below defines the first seven chemical elements, and uses raw integer values to represent their atomic numbers:

.. testcode:: optionals

    (swift) enum ChemicalElement : Int {
                case Hydrogen = 1, Helium, Lithium, Beryllium, Boron, Carbon, Nitrogen
            }

Auto-incrementation means that ``ChemicalElement.Helium`` will have a raw value of ``2``, and so on.

The raw value of an ``enum`` member can be accessed using its ``toRaw()`` method:

.. testcode:: optionals

    (swift) var atomicNumberOfCarbon = ChemicalElement.Carbon.toRaw()
    // atomicNumberOfCarbon : Int = 6

The reverse is also true. Raw values can be used to look up their corresponding enumeration member – for example, to find ``ChemicalElement.Nitrogen`` from its raw value of ``7``. This is an example of one of Swift's most powerful features, known as *optionals*.

Optionals
---------

Optionals are a way to handle missing values. They can be used to say:

* There *is* a value, and it equals *x*

…or…

* There *isn't* a value at all

This concept doesn't exist in C or Objective-C. The nearest thing in Objective-C is the ability to return ``nil`` from a method that would otherwise return an object, with ``nil`` meaning ‘the absence of a valid object’. However, this only works for objects – it doesn't work for structs, or basic C types, or enumeration values. For these types, Objective-C methods typically return a special value (such as ``NSNotFound``) to indicate the absence of a value. However, this assumes that the method's caller knows there is a special value to test for, and remembers to check for it. Swift's optionals give a way to indicate the absence of a value for *any type at all*, without the need for special constants or ``nil`` tests.

Here's an example. The ``ChemicalElement`` enumeration above contains elements and raw atomic numbers for the first seven elements in the periodic table. In addition to their ``toRaw()`` method, enumerations also have a ``fromRaw()`` method. This can be used to try and find a chemical element for a given atomic number:

.. testcode:: optionals

    (swift) var possibleElement = ChemicalElement.fromRaw(7)        // Nitrogen
    // possibleElement : ChemicalElement? = <unprintable value>

``ChemicalElement`` has a member with an atomic number of ``7`` (i.e. ``ChemicalElement.Nitrogen``). But what if you try an atomic number of ``8`` (for oxygen)? ``ChemicalElement`` doesn't know about oxygen, so you might expect the following statement to fail:

.. testcode:: optionals

    (swift) possibleElement = ChemicalElement.fromRaw(8)            // Oxygen

However, it turns out that this is a perfectly valid statement. This is because ``fromRaw()`` returns an *optional*. If you look closely at the nitrogen example above, you'll see that ``possibleElement`` has an inferred type of ``ChemicalElement?``, not ``ChemicalElement``. Note the question mark at the end. This indicates that the value of ``possibleElement`` is an *optional* ``ChemicalElement`` – it might contain *some* value of that type, or it might contain *no value at all*.

Optional values are a bit like `Schrödinger's cat <http://en.wikipedia.org/wiki/Schrödinger's_cat>`_. The cat might be alive, or it might be dead – the only way to find out is to look inside the box. An optional's value can be checked using an ``if`` statement, in a similar way to a ``Bool``. If an optional does have a value, it equates to ``true``; if it has no value at all, it equates to ``false``.

When the optional *does* contain a value, the underlying value can accessed by adding an exclamation mark (``!``) to the end of the optional's name. The exclamation mark effectively says “I know that this optional definitely has a value – please use it”:

.. testcode:: optionals

    (swift) if (possibleElement) {
                switch possibleElement! {
                    case .Hydrogen:
                        println("A bit explodey")
                    case .Helium:
                        println("Like a friendly hydrogen")
                    default:
                        println("Some other element")
                }
            } else {
                println("Not an element I know about")
            }
    >>> Not an element I know about

``possibleElement`` was most recently set to an optional ``ChemicalElement`` for the atomic number of oxygen (``8``), which doesn't exist in the enumeration. This means that the optional contains *no value at all* – causing ``if (possibleElement)`` to equate to ``false``, triggering the ``else`` part of the statement above, and printing the text ``"Not an element I know about"``.

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
    * https://[Internal Staging Server]/docs/whitepaper/TypesAndValues.html#enumerations ✔︎
    * https://[Internal Staging Server]/docs/whitepaper/LexicalStructure.html#identifiers-and-operators
    * https://[Internal Staging Server]/docs/whitepaper/LexicalStructure.html#integer-literals
    * https://[Internal Staging Server]/docs/whitepaper/LexicalStructure.html#floating-point-literals
    * https://[Internal Staging Server]/docs/whitepaper/GuidedTour.html#declarations-and-basic-syntax
    * https://[Internal Staging Server]/docs/whitepaper/GuidedTour.html#tuples
    * https://[Internal Staging Server]/docs/whitepaper/GuidedTour.html#enums ✔︎
    * https://[Internal Staging Server]/docs/literals.html
    * http://en.wikipedia.org/wiki/Operator_(computer_programming)