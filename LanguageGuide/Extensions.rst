Extensions
==========

:newTerm:`Extensions` are a way to add functionality to an existing
class, structure or enumeration type.
This includes the ability to extend types
for which you do not have access to the original source code
(known as :newTerm:`retroactive modeling`).
Extensions are similar to :newTerm:`categories` in Objective-C.
Unlike Objective-C categories, Swift extensions do not have names.

Extensions can:

* add computed properties and computed static properties
* define instance methods and type methods
* provide new initializers
* define subscripts
* define and use new nested types

Extensions can also be used to make an existing type conform to a protocol.
This process is described in :ref:`Protocols_AddingProtocolConformanceWithAnExtension`.

.. QUESTION: I've put operator conformance in the Classes and Structures chapter,
   rather than this chapter, because it isn't actually implemented via an extension
   (at least, not right now). Is this the right choice?
   Moving it to here could be a way to rebalance the chapters a little…

.. QUESTION: What are the rules for overloading via extensions?

.. TODO: Talk about extending enumerations to have additional member values

Extension Syntax
----------------

Extensions are declared with the ``extension`` keyword:

.. testcode:: extensionSyntax

   >> struct SomeType {}
   -> extension SomeType {
         // new functionality to add to SomeType goes here
      }

An extension can also extend an existing type to make it adopt one or more protocols.
Where this is the case,
the protocol names are written in exactly the same way as for a class or structure:

.. testcode:: extensionSyntax

   >> protocol SomeProtocol {}
   >> protocol AnotherProtocol {}
   -> extension SomeType: SomeProtocol, AnotherProtocol {
         // implementation of protocol requirements goes here
      }

Adding protocol conformance in this way is described in
:ref:`Protocols_AddingProtocolConformanceWithAnExtension`.

.. _Extensions_ComputedProperties:

Computed Properties
-------------------

Extensions can add computed instance properties to existing types.
Extensions can also add computed static properties to existing structures and enumerations.

This example adds five computed instance properties to Swift's built-in ``Double`` type,
to provide basic support for working with distance units:

.. testcode:: extensionsComputedProperties

   -> extension Double {
         var km: Double { return self * 1_000.00 }
         var m: Double { return self }
         var cm: Double { return self / 100.00 }
         var mm: Double { return self / 1_000.00 }
         var ft: Double { return self / 3.28084 }
      }
   -> let oneInch = 25.4.mm
   << // oneInch : Double = 0.0254
   -> println("One inch is \(oneInch) meters")
   <- One inch is 0.0254 meters
   -> let threeFeet = 3.ft
   << // threeFeet : Double = 0.914399970739201
   -> println("Three feet is \(threeFeet) meters")
   <- Three feet is 0.914399970739201 meters

These computed properties give a way to express that a ``Double`` value
should be considered as a certain unit of length.
Although they are implemented as computed properties,
they can be accessed via dot syntax,
which gives a neat way to append them onto a number to perform distance conversions.

In this example, a ``Double`` value of ``1.0`` is considered to represent “one meter”.
This is why the ``m`` computed property returns ``self`` –
the expression ``1.m`` is considered to calculate a ``Double`` value of ``1.0``.

Other units require some conversion to be expressed as a value measured in meters.
One kilometer is the same as 1,000 meters,
so the ``km`` computed property multiplies the value by ``1_000.00``
to convert into a number expressed in meters.
Similarly, there are 3.28024 feet in a meter,
and so the ``ft`` computed property divides the underlying ``Double`` value
by ``3.28024``, to convert it from feet to meters.

These properties are read-only computed properties,
and so they have been expressed without the ``get`` keyword, for brevity.
Their return value is inferred to be of type ``Double``,
and can be used within mathematical calculations wherever a ``Double`` is accepted:

.. testcode:: extensionsComputedProperties

   -> let aMarathon = 42.km + 195.m
   << // aMarathon : Double = 42195.0
   -> println("A marathon is \(aMarathon) meters long")
   <- A marathon is 42195.0 meters long

.. note::

   Extensions can add new computed properties, but they cannot add stored properties,
   or add property observers to existing properties.

.. TODO: change this example to something more advisable / less contentious.

.. _Extensions_Initializers:

Initializers
------------

Extensions can add new initializers to existing types.
This enables you to extend other types to accept
your own custom types as initializer parameters.

.. note::

   Extensions can add new convenience initializers to a class,
   but they cannot add new designated initializers or deinitializers to a class.
   Designated initializers and deinitializers
   must always be provided by the original class implementation.

This approach can be used to extend the basic ``String`` type
to accept an instance of your own custom type as an initializer parameter,
for use with string interpolation,
as described in :ref:`Strings_StringInterpolation`.

.. testcode:: extensionsInitializers

   -> struct Point {
         var x = 0.0, y = 0.0
      }
   -> extension String {
         init(_ point: Point) {
            self = "(\(point.x), \(point.y))"
         }
      }
   -> let somePoint = Point(x: 3.0, y: 5.0)
   << // somePoint : Point = Point(3.0, 5.0)
   -> let pointDescription = String(somePoint)
   << // pointDescription : String = "(3.0, 5.0)"
   /> pointDescription is \"\(pointDescription)\"
   </ pointDescription is "(3.0, 5.0)"

.. FIXME: if you don't use an underbar to avoid an external parameter name,
   the initializer can't be used with string interpolation.
   This is a side-effect of the stricter paramerter name rules
   introduced in Swift r17743.
   I've filed this fact as rdar://16862627,
   and have updated the example above so that it works with swifttest,
   but I haven't yet described this as a requirement
   because I'm awaiting feedback on that Radar.
   I'll need to explain this requirement above if rdar://16862627 is not fixed by WWDC.
   
This example defines a new structure called ``Point`` to represent an ``(x, y)`` co-ordinate.
It also extends ``String`` to add a new initializer implementation,
which accepts a single ``Point`` instance as an initialization parameter.
The initializer's implementation creates a string containing the two point values
expressed within parentheses with a comma and a space between them –
which in this case gives a string value of ``"(3.0, 5.0)"``.

The new initializer can now be used to construct a ``String`` using initializer syntax
by passing in a point, such as with ``String(somePoint)`` above.

Now that a ``String`` can be initialized with a ``Point``,
you can use ``Point`` instances directly within string interpolation syntax
to incorporate their values as part of a longer string:

.. testcode:: extensionsInitializers

   -> let anotherPoint = Point(x: -2.0, y: 6.0)
   << // anotherPoint : Point = Point(-2.0, 6.0)
   -> println("anotherPoint's value is \(anotherPoint)")
   <- anotherPoint's value is (-2.0, 6.0)

Whenever string interpolation discovers an instance in the string,
it checks to see if ``String`` has an initializer that accepts instances of that type.
In this case, it successfully finds a ``String`` initializer that accepts ``Point`` instances;
creates a new ``String`` using the initializer;
and inserts this new string into the interpolated string.
(Defining multiple initializers,
and choosing which one to use based on the type of parameter passed to the initializer,
is known as :newTerm:`initializer overloading`.)

.. note::

   If you provide a new initializer via an extension,
   you are still responsible for making sure that each instance is fully initialized
   once the initializer has completed.

.. QUESTION: You can use 'self' in this way for structs and enums.
   How might you do this kind of construction for a class?

.. _Extensions_Methods:

Methods
-------

Extensions can add new instance methods and type methods to existing types.
The following example adds a new instance method called ``toSpooky`` to the ``String`` type:

.. testcode:: extensionsInstanceMethods

   -> extension String {
         func toSpooky() -> String {
            var i = 0
            var spooky = ""
            for character in self {
               let charString = String(character)
               spooky += (i % 2 == 0) ? charString.uppercase : charString.lowercase
               ++i
            }
            return spooky
         }
      }

.. TODO: improve the fact that I have to convert character to a String
   to get this to work, based on where we end up with uppercase / lowercase conversions,
   particularly for the Character type.

The ``toSpooky`` method returns a spookier version of the original string,
by converting odd-numbered characters to uppercase,
and even-numbered characters to lowercase.

After this extension is defined,
you can call the ``toSpooky`` method on any ``String`` instance:

.. testcode:: extensionsInstanceMethods

   -> let boring = "woooooooooooo, i am a ghost!"
   << // boring : String = "woooooooooooo, i am a ghost!"
   -> let spooky = boring.toSpooky()
   << // spooky : String = "WoOoOoOoOoOoO, i aM A GhOsT!"
   /> \"\(spooky)\"
   </ "WoOoOoOoOoOoO, i aM A GhOsT!"

.. _Extensions_MutatingInstanceMethods:

Mutating Instance Methods
~~~~~~~~~~~~~~~~~~~~~~~~~

Instance methods added via an extension can also modify (or *mutate*) the instance itself.
Structure and enumeration methods that modify ``self`` or its properties
must mark the instance method as ``mutating``,
just like mutating methods from an original implementation:

.. testcode:: extensionsInstanceMethods

   -> extension Int {
         mutating func shiftRight(numberOfDecimalPlaces: Int) {
            for _ in 0...numberOfDecimalPlaces {
               self /= 10
            }
         }
      }
   -> var someInt = 123_456
   << // someInt : Int = 123456
   -> someInt.shiftRight(3)
   /> someInt is now \(someInt)
   </ someInt is now 123

This example adds a ``shiftRight`` method to instances of ``Int``.
This method is similar to the bitwise right shift operator
(as described in :ref:`AdvancedOperators_BitwiseLeftAndRightShifts`),
except that it shifts by powers of ten, rather than powers of two.

The method shifts an ``Int`` to the right by ``numberOfDecimalPlaces``.
It does this by diving the ``Int`` by ten, ``numberOfDecimalPlaces`` times.
Because ``Int`` instances can only store whole numbers,
and do not have a fractional component,
the number is rounded down to the nearest whole number each time the division takes place.
Calling ``shiftRight(3)`` on an integer variable containing the number ``123456``
shifts the number to the right by three decimal places,
and changes the variable to have a value of ``123``.

.. _Extensions_Subscripts:

Subscripts
----------

Extensions can add new subscripts to an existing type.
This example adds an integer subscript to Swift's built-in ``Int`` type.
This subscript ``[n]`` returns the decimal digit ``n`` places in
from the right of the number,
so:

* ``123456789[0]`` returns ``9``
* ``123456789[1]`` returns ``8``

…and so on:

.. testcode:: extensionsSubscripts

   -> extension Int {
         subscript(digitIndex: Int) -> Int {
            var decimalBase = 1
            for _ in 0...digitIndex {
               decimalBase *= 10
            }
            return (self / decimalBase) % 10
         }
      }
   -> 746381295[0]
   << // r0 : Int = 5
   /> returns \(r0)
   </ returns 5
   -> 746381295[1]
   << // r1 : Int = 9
   /> returns \(r1)
   </ returns 9
   -> 746381295[2]
   << // r2 : Int = 2
   /> returns \(r2)
   </ returns 2
   -> 746381295[8]
   << // r3 : Int = 7
   /> returns \(r3)
   </ returns 7

If the ``Int`` value does not have enough digits for the requested index,
the subscript implementation will return ``0``,
as if the number had been padded with zeroes to the left:

.. testcode:: extensionsSubscripts

   -> 746381295[9]
   << // r4 : Int = 0
   /> returns \(r4), as if you had requested:
   </ returns 0, as if you had requested:
   -> 0746381295[9]
   << // r5 : Int = 0

.. TODO: provide an explanation of this example

.. _Extensions_NestedTypes:

Nested Types
------------

Extensions can add new nested types to existing classes, structures and enumerations:

.. testcode:: extensionsNestedTypes

   -> extension Character {
         enum Kind {
            case Vowel, Consonant, Other
         }
         var kind: Kind {
            switch String(self).lowercase {
               case "a", "e", "i", "o", "u":
                  return .Vowel
               case "b", "c", "d", "f", "g", "h", "j", "k", "l", "m",
                  "n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z":
                  return .Consonant
               default:
                  return .Other
            }
         }
      }

.. TODO: improve the fact that I have to convert character to a String
   to get this to work, based on where we end up with uppercase / lowercase conversions,
   particularly for the Character type.

This example adds a new nested enumeration to ``Character``.
This enumeration, called ``Kind``,
gives a way to express the kind of letter that a particular character represents.
Specifically, it expresses whether the character is
a vowel or a consonant in a standard Latin script
(without taking into account accents or regional variations),
or whether it is some other kind of character.

This example also adds a new computed instance property to ``Character``,
called ``kind``,
which returns the appropriate ``Kind`` enumeration member for that character.

The nested enumeration can now be used with ``Character`` values:

.. testcode:: extensionsNestedTypes

   -> func printLetterKinds(word: String) {
         println("'\(word)' is made up of the following kinds of letters:")
         for character in word {
            switch character.kind {
               case .Vowel:
                  print("vowel ")
               case .Consonant:
                  print("consonant ")
               case .Other:
                  print("other ")
            }
         }
         print("\n")
      }
   -> printLetterKinds("Hello")
   </ 'Hello' is made up of the following kinds of letters:
   </ consonant vowel consonant consonant vowel

This function, ``printLetterKinds``,
takes an input ``String`` value and iterates over its characters.
For each character, it considers the ``kind`` computed property for that character,
and prints an appropriate description of that kind.
The ``printLetterKinds`` function can then be called
to print the kinds of letters in an entire word,
as shown here for the word ``"Hello"``.

.. note::

   ``character.kind`` is already known to be of type ``Character.Kind``.
   Because of this, all of the ``Character.Kind`` member values
   can be written in shorthand form inside the ``switch`` statement,
   such as ``.Vowel`` rather than ``Character.Kind.Vowel``.