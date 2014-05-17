Optional Chaining
=================

:newTerm:`Optional chaining` is a way to query and call
properties, methods, and subscripts on an optional that may be ``nil``.
If the optional contains an actual value,
the property, method, or subscript access succeeds;
if the optional is ``nil``, the access fails without reporting an error.

Optional chaining also gives a way to check if
a property, method, or subscript access succeeded.
Multiple queries can be chained together,
and the entire chain fails gracefully if any link in the chain is ``nil``.

.. note::

   Optional chaining in Swift is similar to messaging nil in Objective-C,
   but in a way that works for any type, and that can be checked for success or failure.

.. _OptionalChaining_OptionalChainingAsAnAlternativeToForcedUnwrapping:

Optional Chaining as an Alternative to Forced Unwrapping
--------------------------------------------------------

Optional chaining is written by placing a question mark (``?``)
after the optional value that you wish to chain on if it exists.
This is very similar to placing an exclamation mark (``!``)
after an optional value to force the unwrapping of its value.
The main difference is that optional chaining fails gracefully when no value exists,
whereas forced unwrapping triggers an assertion if no value exists.

To reflect the fact that optional chaining can fail,
the result of an optional chaining call is always an optional value,
even if the property, method, or subscript you are querying returns a non-optional value.
This gives a way to check if the optional chaining was successful.

Specifically, the result of an optional chaining call
is of the same type as the expected return value, but wrapped in an optional.
A property that normally returns an ``Int`` will return an ``Int?``
when accessed through optional chaining.

Here's an example of how optional chaining differs from forced unwrapping
and enables you to check for success.
This example defines two classes called ``Person`` and ``Residence``:

.. testcode:: optionalChainingIntro, optionalChainingIntroAssert
   :compile: true

   -> class Person {
         var residence: Residence?
      }
   ---
   -> class Residence {
         var numberOfRooms = 1
      }

``Residence`` instances have a single ``Int`` property called ``numberOfRooms``,
with a default value of ``1``.
``Person`` instances have an optional ``residence`` property of type ``Residence?``.

If you create a new ``Person`` instance,
its ``residence`` property is default initialized to ``nil``,
by virtue of being optional.
In the code below, ``john`` has a ``residence`` property value of ``nil``:

.. testcode:: optionalChainingIntro, optionalChainingIntroAssert
   :compile: true

   -> let john = Person()

If you try to access the ``numberOfRooms`` property of this person's ``residence``,
by placing an exclamation mark after ``residence`` to force the unwrapping of its value,
you will trigger an unrecoverable runtime error,
because there is no ``residence`` value to unwrap:

.. testcode:: optionalChainingIntroAssert
   :compile: true

   -> let roomCount = john.residence!.numberOfRooms
   xx assert
   // this triggers an unrecoverable runtime error

This code will succeed when ``john.residence`` has a non-``nil`` value,
and will set ``roomCount`` to an ``Int`` value containing the appropriate number of rooms.
However, this code will always fail in an unrecoverable way when ``residence`` is ``nil``,
as illustrated above.

Optional chaining provides an alternative way to access the value of ``numberOfRooms``.
To use optional chaining, use a question mark in place of the exclamation mark:

.. testcode:: optionalChainingIntro
   :compile: true

   -> if let roomCount = john.residence?.numberOfRooms {
         println("John's residence has \(roomCount) room(s).")
      } else {
         println("Unable to retrieve the number of rooms.")
      }
   <- Unable to retrieve the number of rooms.

This tells Swift to “chain” on the optional ``residence`` property,
and to retrieve the value of ``numberOfRooms`` if ``residence`` exists.
Conversely, if ``residence`` does *not* exist, no chaining takes place,
and the attempt to access ``numberOfRooms`` fails without error.

Because the attempt to access ``numberOfRooms`` has the potential to fail,
the optional chaining attempt returns a value of type ``Int?``, or “optional ``Int``”.
In the example above, ``residence`` is currently ``nil``,
and so the attempt to access ``numberOfRooms`` fails.
This means that ``roomCount`` has a value of ``nil``,
which in this case means “no ``Int`` value”.
This is true even though ``numberOfRooms`` is a non-optional ``Int``.
The fact that it is queried through an optional chain that has the potential to fail
means that the call will always return an ``Int?`` instead of an ``Int``.

You can assign a ``Residence`` instance to ``john.residence``,
so that it no longer has a ``nil`` value:

.. testcode:: optionalChainingIntro
   :compile: true

   -> john.residence = Residence()

``john.residence`` now contains an actual ``Residence`` instance, rather than ``nil``.
If you try and access ``numberOfRooms`` with the same optional chaining as before,
it will now return an ``Int?`` that contains
the default ``numberOfRooms`` value of ``1``:

.. testcode:: optionalChainingIntro
   :compile: true

   -> if let roomCount = john.residence?.numberOfRooms {
         println("John's residence has \(roomCount) room(s).")
      } else {
         println("Unable to retrieve the number of rooms.")
      }
   <- John's residence has 1 room(s).

.. _OptionalChaining_DefiningModelClassesForOptionalChaining:

Defining Model Classes for Optional Chaining
--------------------------------------------

You can use optional chaining with multi-level calls to properties, methods, and subscripts.
This enables you to use optional chaining to drill down into sub-properties
within complex models of interrelated types,
and to check whether it is possible to access
properties, methods, and subscripts on those sub-properties.

The code snippets below define four model classes
for use in several subsequent examples of optional chaining.
These classes expand upon the ``Person`` and ``Residence`` model from above
by adding a ``Room`` and ``Address`` class,
with associated properties, methods, and subscripts.

The ``Person`` class is defined in the same way as before:

.. testcode:: optionalChaining
   :compile: true

   -> class Person {
         var residence: Residence?
      }

The ``Residence`` class is more complex than before.
This time, the ``Residence`` class defines a variable property called ``rooms``,
which is initialized with an empty array of type ``Room[]``:

.. testcode:: optionalChaining
   :compile: true

   -> class Residence {
         var rooms = Room[]()
         var numberOfRooms: Int {
            return rooms.count
         }
         subscript(i: Int) -> Room {
            assert(i >= 0 || i < rooms.count, "Room index out of range")
            return rooms[i]
         }
         func printNumberOfRooms() {
            println("The number of rooms is \(numberOfRooms)")
         }
         var address: Address?
      }

Because this version of ``Residence`` stores an array of ``Room`` instances,
its ``numberOfRooms`` property is implemented as a computed property,
not a stored property.
The computed ``numberOfRooms`` property simply returns
the value of the ``count`` property from the ``rooms`` array.

As a shorthand way to access its ``rooms`` array,
this version of ``Residence`` provides a read-only subscript,
which starts by asserting that the index passed to the subscript is valid.
If the index is valid, the subscript returns
the room at the requested index in the ``rooms`` array.

This version of ``Residence`` also provides a method called ``printNumberOfRooms``,
which simply prints the number of rooms in the residence.
This method does not specify a return type,
and so it has an implicit return type of ``Void``.

Finally, ``Residence`` defines an optional property called ``address``,
with a type of ``Address?``.
The ``Address`` class type for this property is defined below.

The ``Room`` class used for the ``rooms`` array is
a simple class with one property called ``name``,
and an initializer to set that property to a suitable room name:

.. testcode:: optionalChaining
   :compile: true

   -> class Room {
         let name: String
         init(name: String) { self.name = name }
      }

The final class in this model is called ``Address``.
This class has three optional properties of type ``String?``.
The first two properties, ``buildingName`` and ``buildingNumber``,
are alternative ways to identify a particular building as part of an address.
The third property, ``street``, is used to name the street for that address:

.. testcode:: optionalChaining
   :compile: true

   -> class Address {
         var buildingName: String?
         var buildingNumber: String?
         var street: String?
         func buildingIdentifier() -> String? {
            if buildingName {
               return buildingName
            } else if buildingNumber {
               return buildingNumber
            } else {
               return nil
            }
         }
      }

The ``Address`` class also provides a method called ``buildingIdentifier``,
which has a return type of ``String?``.
This method checks the ``buildingName`` and ``buildingNumber`` properties,
and returns ``buildingName`` if it has a value;
or ``buildingNumber`` if it has a value;
or ``nil`` if neither property has a value.

.. QUESTION: you could write this in a shorter form by just returning buildingNumber
   if buildingName is nil. However, I think the code above is clearer in intent.
   What do others think?
   I could always call this out, of course,
   but this preamble section is already pretty long.

You can use these classes to create a new ``Person`` instance,
and to try and access its ``numberOfRooms`` property as before:

.. testcode:: optionalChaining

   -> let john = Person()
   -> if let roomCount = john.residence?.numberOfRooms {
         println("John's residence has \(roomCount) room(s).")
      } else {
         println("Unable to retrieve the number of rooms.")
      }
   <- Unable to retrieve the number of rooms.

Because ``john.residence`` is ``nil``,
this optional chaining call fails in the same way as before, without error.

