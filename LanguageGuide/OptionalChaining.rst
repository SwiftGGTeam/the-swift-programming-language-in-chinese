Optional Chaining
=================

:newTerm:`Optional chaining` is a way to query and call properties and methods
on an optional that may be ``nil``.
If the optional contains an actual value, the property or method access succeeds;
if the optional is ``nil``, the access fails gracefully.

For properties, and for methods that return a value,
optional chaining also gives a way to check if the property or method access succeeded.
Multiple queries can be chained together,
and the entire chain will fail gracefully if any link in the chain is nil.

.. TODO: properties, methods… anything else (e.g. subscripts)?

.. note::

   Optional chaining in Swift is similar to messaging nil in Objective-C,
   but in a way that works for any type, and that can be checked for success or failure.

Optional Chaining as an Alternative to Forced Unwrapping
--------------------------------------------------------

Optional chaining is written by placing a question mark (``?``)
after the optional value that you wish to chain on if it exists.
This is very similar to placing an exclamation mark (``!``)
after an optional value to force the unwrapping of its value.
The main difference is that optional chaining fails gracefully when no value exists,
whereas forced unwrapping triggers an assertion if no value exists.

To reflect the fact that optional chaining can fail if the value is ``nil``,
the result of an optional chaining call will itself be an optional value,
even if the property or method that you are querying returns a non-optional value.
This gives you a way to check if the optional chaining was successful or not.

Here's an example of how optional chaining differs from forced unwrapping
and enables you to check for success.
This example defines two classes, called ``Residence`` and ``Person``:

.. testcode:: chainingIntro, chainingIntroAssert

   -> class Residence {
         var rooms = 1
      }
   ---
   -> class Person {
         var residence: Residence?
      }

``Residence`` instances have a single ``Int`` property called ``rooms``,
with a default value of ``1``.
``Person`` instances have an optional ``residence`` property of type ``Residence?``.

If you create a new ``Person`` instance,
its ``residence`` property is default initialized to ``nil``,
by virtue of being optional.
In the code below, ``john`` has a ``residence`` property value of ``nil``:

.. testcode:: chainingIntro, chainingIntroAssert

   -> let john = Person()
   << // john : Person = C4REPL6Person (has 1 child)

If you try to access the ``rooms`` property of this person's ``residence``,
by placing an exclamation mark after ``residence`` to force the unwrapping of its value,
you will trigger an unrecoverable runtime error, because there is no value to unwrap:

.. testcode:: chainingIntroAssert

   -> let roomCount = john.residence!.rooms
   xx assert
   // this triggers an unrecoverable runtime error

This code would succeed if ``john.residence`` had a non-``nil`` value,
and would set ``roomCount`` to an ``Int`` value containing the appropriate number of rooms.
However, this code will always fail in an unrecoverable way if ``residence`` is ``nil``.

Optional chaining provides an alternative way to try and access the value of ``rooms``.
To use optional chaining, use a question mark in place of the exclamation mark:

.. testcode:: chainingIntro

   -> if let roomCount = john.residence?.rooms {
         println("John's residence has \(roomCount) room(s).")
      } else {
         println("John does not have a residence.")
      }
   <- John does not have a residence.

This tells Swift to “chain“ on the optional ``residence`` property,
and to retrieve the value of ``rooms`` if ``residence`` exists.
Conversely, if ``residence`` does *not* exist, no chaining takes place,
and the attempt to access ``rooms`` fails.

Because the attempt to access ``rooms`` has the potential to fail,
the optional chaining attempt returns a value of type ``Int?``, or “optional ``Int``”.
In the example above, ``residence`` is currently ``nil``,
and so the attempt to access ``rooms`` fails.
This means that ``roomCount`` has a value of ``nil``,
which in this case means “no ``Int`` value”.
This is true even though ``rooms`` is otherwise a non-optional ``Int``.
The fact that it is queried through an optional chain that has the potential to fail
means that the call will always return an ``Int?`` instead of an ``Int``.

You can assign a ``Residence`` instance to ``john.residence``,
so that it no longer has a ``nil`` value:

.. testcode:: chainingIntro

   -> john.residence = Residence()

If you try and access ``rooms`` with the same optional chaining as before,
it will now return an ``Int?`` that contains a value of ``1``:

.. testcode:: chainingIntro

   -> if let roomCount = john.residence?.rooms {
         println("John's residence has \(roomCount) room(s).")
      } else {
         println("John does not have a residence.")
      }
   <- John's residence has 1 room(s).

.. TODO: clarify what "fails gracefully" actually means.

.. show an example of an optional property that has an actual property.
   try and access the actual property; show that you get an optional version back.

.. show an example of an optional property that has an actual method.
   try and call the actual method; show that you get an optional return value back.

.. if a method itself is was optional, as in an optional protocol requirement,
   then the question mark would go *before* the parens.
   However, if the return value of a method is an optional,
   the question mark goes after the parens, because you're chaining on the return value.