.. docnote:: Subjects to be covered in this section

    * Enums ✔︎
    * Enum element patterns
    * Enums for groups of constants ✔︎
    * Enums with raw values (inc. getting / setting raw values) ✔︎
    * Enum default / unknown values?
    * Enum delayed identifier resolution
    * Option sets
    * Enum special capabilities such as embeddability, type properties etc.

Enumerations
============

:newTerm:`Enumerations` are a way to define multiple related values of a similar kind,
and to work with those values in a type-safe way within your code.

Enumerations in Swift are much more flexible than their counterparts in C and Objective-C.
Swift enumerations can:

* store :newTerm:`associated values` of any type along with each member value
* provide :newTerm:`raw values` for each enumeration member

These capabilities are described in detail within this chapter.

In addition, enumerations can:

* declare :newTerm:`computed properties` to provide additional information about their values
  (as described in :doc:`Properties`)
* define :newTerm:`methods` to provide functionality related to the values they represent
  (as described in :doc:`Methods`)
* define :newTerm:`initializers` to provide an initial member value
  (as described in :doc:`Initialization`)
* be :newTerm:`extended` to expand their functionality beyond their original implementation
  (as described in :doc:`Extensions`)
* conform to :newTerm:`protocols` to provide standard functionality of a certain type
  (as described in :doc:`Protocols`)

.. _Enumerations_EnumerationSyntax:

Enumeration Syntax
------------------

Enumerations are introduced by the ``enum`` keyword,
and place their entire definition within a pair of braces:

.. testcode:: enums

    --> enum SomeEnumeration {
            // enumeration definition goes here
        }

Here's an example for the four main points of a compass:

.. testcode:: enums

    --> enum CompassPoint {
            case North
            case South
            case East
            case West
        }

The values defined in an enumeration
(such as ``North``, ``South``, ``East``, and ``West``)
are known as the :newTerm:`member values` (or :newTerm:`members`) of that enumeration.
The ``case`` keyword is used to indicate that a new line of member values
is about to be defined.

.. note::

    Unlike C and Objective-C,
    Swift enumeration members are not assigned a default integer value when they are created.
    In the ``CompassPoints`` example above,
    ``North``, ``South``, ``East`` and ``West``
    do not implicitly equal
    ``0``, ``1``, ``2`` and ``3``.
    Instead, the different enumeration members are fully-fledged values in their own right,
    with an explicitly-defined type of ``CompassPoint``.

Multiple member values can appear on a single line, separated by commas:

.. testcode:: enums

    --> enum Planet {
            case Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune
        }

Each enumeration definition effectively defines a brand new type.
As a result, their names
(such as ``CompassPoint`` and ``Planet``)
should start with a capital letter.
Enumeration types should have singular rather than plural names,
so that they read as a sentence when declaring a named value of that type:

.. testcode:: enums

    --> var directionToHead = CompassPoint.West
    <<< // directionToHead : CompassPoint = <unprintable value>

The type of ``directionToHead`` has been inferred
from the fact that it was initialized with one of the possible values of ``CompassPoint``.
Once it is declared as being a ``CompassPoint``,
it can be set to a different ``CompassPoint`` value using a shorter dot syntax:

.. testcode:: enums

    --> directionToHead = .East

The type of ``directionToHead`` is already known,
and so we can drop the type when setting its value.
This makes for highly readable code when working with explicitly-typed enumeration values.

.. _Enumerations_ConsideringEnumerationValuesWithASwitchStatement:

Considering Enumeration Values with a Switch Statement
------------------------------------------------------

Enumeration values can be checked with a ``switch`` statement:

.. testcode:: enums

    --> directionToHead = .South
    --> switch directionToHead {
            case .North:
                println("Lots of planets have a north")
            case .South:
                println("Watch out for penguins")
            case .East:
                println("Where the sun rises")
            case .West:
                println("Where the skies are blue")
        }
    <-- Watch out for penguins

You can read this as:

“Consider the value of ``directionToHead``.
In the case where it equals ``.North``,
print ``"Lots of planets have a north"``.
In the case where it equals ``.South``,
print ``"Watch out for penguins"``.”

…and so on.

A ``switch`` statement must be exhaustive when considering an enumeration's members.
If the ``case`` for ``.West`` had been omitted,
this code would not compile,
because it would not consider the complete list of ``CompassPoint`` members.
Enforcing completeness ensures that enumeration members are not accidentally missed or forgotten,
and is part of Swift's goal of completeness and lack of ambiguity.

When it is not appropriate to provide a ``case`` statement for every enumeration member,
you can provide a ``default`` case to cover any members that are not addressed explicitly:

.. testcode:: enums

    --> let somePlanet = Planet.Earth
    <<< // somePlanet : Planet = <unprintable value>
    --> switch somePlanet {
            case .Earth:
                println("Mostly harmless")
            default:
                println("Not a safe place for humans")
        }
    <-- Mostly harmless

.. _Enumerations_AssociatedValues:

Associated Values
-----------------

The examples above show how the members of an enumeration are
a defined (and typed) value in their own right.
You can set a named value to ``Planet.Earth``,
and check for this value later.
However, it can sometimes be useful for enumeration members to also store
:newTerm:`associated values` of other types alongside their own.

Swift enumerations can be defined to store an associated value of any given type,
and this type can be different for each member of the enumeration if needed.
These kinds of associated values are known as
:newTerm:`tagged unions` or :newTerm:`variants` in other programming languages.

For example: imagine an inventory tracking system that needs to
track products using two different types of barcode.
Some products are labelled with 1D barcodes
in `UPC-A <http://en.wikipedia.org/wiki/Universal_Product_Code>`_ format,
which uses the numbers ``0`` to ``9``.
Each barcode has a “number system” digit,
followed by ten “identifier” digits.
These are followed by a “check” digit to verify that the code has been scanned correctly:

.. image:: ../images/barcode_UPC.png
    :height: 80
    :align: center

Other products are labelled with 2D barcodes in `QR code <http://en.wikipedia.org/wiki/QR_Code>`_ format,
which can use any `ISO 8859-1 <http://en.wikipedia.org/wiki/ISO_8859-1>`_ character
and can encode a string up to 2,953 characters long:

.. image:: ../images/barcode_QR.png
    :height: 80
    :align: center

It would be convenient for an inventory tracking system to be able to store UPC-A barcodes
as a tuple of three integers,
and QR code barcodes as a string of any length.

In Swift, an enumeration to define product barcodes of either type might look like this:

.. testcode:: enums

    --> enum Barcode {
            case UPCA(Int, Int, Int)
            case QRCode(String)
        }

This can be read as:

“Declare an enumeration type called ``Barcode``,
that can take either a value of ``UPCA`` with an associated value of type (``Int``, ``Int``, ``Int``),
or a value of ``QRCode`` with an associated value of type ``String``.”

This definition does not provide any actual ``Int`` or ``String`` values –
it just defines the *type* of associated values that ``Barcode`` named values can store
when they are equal to ``Barcode.UPCA`` or ``Barcode.QRCode``.

New barcodes can then be created using either of these types,
as shown below:

.. testcode:: enums

    --> var productBarcode = Barcode.UPCA(8, 85909_51226, 3)
    <<< // productBarcode : Barcode = <unprintable value>

This creates a new variable called ``productBarcode``,
and assigns it a value of ``Barcode.UPCA`` with an associated tuple value of ``(8, 8590951226, 3)``.
(The provided “identifier” value has an underscore within its integer literal –
``85909_51226`` –
to make it easier to read as a barcode.)

The same product can be changed to have a different type of barcode:

.. testcode:: enums

    --> productBarcode = .QRCode("ABCDEFGHIJKLMNOP")

At this point,
the original ``Barcode.UPCA`` and its integer values are replaced by
the new ``Barcode.QRCode`` and its string value.
Named values of type ``Barcode`` can store either a ``.UPCA`` or a ``.QRCode``
(together with their associated values),
but they can only store one or the other at a time.

The different barcode types can be checked using a switch statement, as before.
This time, however, the associated values can be extracted as part of the switch statement:

.. testcode:: enums

    --> switch productBarcode {
            case .UPCA(let numberSystem, let identifier, let check):
                println("UPC-A with value of \(numberSystem), \(identifier), \(check).")
            case .QRCode(let productCode):
                println("QR code with value of \(productCode).")
        }
    <-- QR code with value of ABCDEFGHIJKLMNOP.

.. _Enumerations_RawValues:

Raw Values
----------

The barcode example above shows how members of an enumeration can declare that they store
associated values of different types.
In addition to associated values,
enumeration members can also come pre-populated with default values (called :newTerm:`raw values`),
which are all of the same type.

Here's an example that stores raw ASCII values alongside named enumeration members:

.. testcode:: enums

    --> enum ASCIIControlCharacter : UnicodeScalar {
            case Tab = '\t'
            case LineFeed = '\n'
            case CarriageReturn = '\r'
        }

Here, the raw values for an enumeration called ``ASCIIControlCharacter``
are declared to be of type ``UnicodeScalar``,
and are set to some of the more common ASCII control characters.
(``UnicodeScalar`` values are described in more detail in :doc:`Strings`.)

Note that raw values are *not* the same as associated values.
Raw values are set to pre-populated values when the enumeration is first defined in your code,
like the three ASCII codes above.
Associated values are only set when you create a new constant or variable
based on one of the enumeration's members.

Raw values can be
strings, characters, or any of the integer or floating-point number types.
Each raw value must be unique within its enumeration declaration.
When integers are used for raw values,
they auto-increment if no value is specified for some of the enumeration members.
The enumeration below defines the first seven chemical elements,
and uses raw integer values to represent their atomic numbers:

.. testcode:: optionals

    --> enum ChemicalElement : Int {
            case Hydrogen = 1, Helium, Lithium, Beryllium, Boron, Carbon, Nitrogen
        }

Auto-incrementation means that ``ChemicalElement.Helium`` has a raw value of ``2``,
and so on.

The raw value of an enumeration member can be accessed using its ``toRaw`` method:

.. testcode:: optionals

    --> let atomicNumberOfCarbon = ChemicalElement.Carbon.toRaw()
    <<< // atomicNumberOfCarbon : Int = 6
    /-> atomicNumberOfCarbon is \(atomicNumberOfCarbon)
    <-/ atomicNumberOfCarbon is 6

The reverse is also true.
In addition to a ``toRaw`` method,
enumerations also have a ``fromRaw`` method,
which can be used to try and find an enumeration member with a particular raw value.
The ``fromRaw`` method could be used to find ``ChemicalElement.Nitrogen`` from its raw value of ``7``, say.

.. testcode:: optionals

    --> var possibleElement = ChemicalElement.fromRaw(7)        // Nitrogen
    <<< // possibleElement : ChemicalElement? = <unprintable value>
    /// possibleElement is ChemicalElement.Nitrogen

Not all possible ``Int`` values will find a matching chemical element, however.
Because of this, the ``fromRaw`` method returns an *optional* enumeration member.
(Optional values are described in more detail in :doc:`BasicTypes`.)

If you try and find an enumeration member with an atomic number of ``8`` (for oxygen),
then the returned optional value will equal ``.None``:

.. testcode:: optionals

    --> if let element = ChemicalElement.fromRaw(8) {
            switch element {
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
    <-- Not an element I know about

This example uses :ref:`BasicTypes_OptionalBinding`
to try and access an element with a raw value of ``8``.
``if let element = ChemicalElement.fromRaw(8)`` retrieves an optional ``ChemicalElement``,
and sets ``element`` to the contents of that optional if it can be retrieved.
In this case, it is not possible to retrieve an element for ``8``,
and so the ``else`` branch is executed instead.
