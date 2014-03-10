Inheritance
===========

Classes can :newTerm:`inherit` methods, properties and other characteristics
from existing classes.
Inheritance is one of the fundamental behaviors that differentiate classes
from other types in Swift.

Here's an example:

.. testcode:: inheritance

    --> class Vehicle {
            var numberOfWheels = 0
            var maxPassengers = 1
            func description() -> String {
                return "\(numberOfWheels) wheels; up to \(maxPassengers) passengers"
            }
        }

This example starts by defining a “base” class called ``Vehicle``.
This base class declares two properties that are universal to all vehicles,
and initializes them with suitable default values.
(It is assumed that any vehicle can carry at least one passenger –
it wouldn't be a very useful vehicle otherwise.)
``Vehicle`` also defines a method called ``description()``,
which returns a ``String`` description of its characteristics.

The next example defines a second, more-specific class, called ``Bicycle``.
This new class is based on the existing capabilities of ``Vehicle``.
The ``Bicycle`` class is defined by placing the name of its base class – ``Vehicle``
– after the name of the new class, separated by a colon. This can be read as:

“Define a new class called ``Bicycle``, which inherits the characteristics of ``Vehicle``”:

.. testcode:: inheritance

    --> class Bicycle : Vehicle {
            init() {
                super.init()
                numberOfWheels = 2
            }
        }

In this example, ``Bicycle`` is said to be a :newTerm:`subclass` of ``Vehicle``, 
and ``Vehicle`` is said to be the :newTerm:`superclass` of ``Bicycle``.
The new ``Bicycle`` class automatically gains all of the characteristics of ``Vehicle``,
and is able to tailor those characteristics (and add new ones) to suit its needs.

.. note::

    Swift classes do not inherit from a universal “base” class.
    Any classes you define without specifying a superclass
    will automatically become base classes for you to build upon.

The ``Bicycle`` class declares an initializer called ``init()``
to set up its tailored characteristics.
This initializer first calls ``super.init()``,
which calls the ``init()`` method for ``Bicycle``\ 's superclass, ``Vehicle``.

Although ``Vehicle`` does not have an explicit initializer itself,
it still has an implicit default initializer,
as described in :ref:`Initialization_Initializers`.
This call to ``super.init()`` triggers ``Vehicle``\ 's default initializer,
and ensures that all of the inherited properties are initialized by ``Vehicle``
before ``Bicycle`` tries to modify them.

The default value of ``maxPassengers`` provided by ``Vehicle`` is already correct for a bicycle,
and so it is not changed within the initializer for ``Bicycle``.
The original value of ``numberOfWheels`` is not correct, however,
and so it is replaced by a new value of ``2``.

If you create an instance of ``Bicycle``, and print its description,
you can see how its properties have been updated:

.. testcode:: inheritance

    --> let bicycle = Bicycle()
    <<< // bicycle : Bicycle = <Bicycle instance>
    --> println("Bicycle: \(bicycle.description())")
    <-- Bicycle: 2 wheels; up to 1 passengers

.. TODO: work out how best to describe super.init() in light of the next section below.

Subclasses can themselves be subclassed, as shown in the next example:

.. testcode:: inheritance

    --> class Tandem : Bicycle {
            init() {
                super.init()
                maxPassengers = 2
            }
        }

This example creates a subclass of ``Bicycle`` for a two-seater bicycle
(known as a “tandem”).
``Tandem`` inherits all of the characteristics of ``Bicycle``,
which in turn inherits from ``Vehicle``.
``Tandem`` doesn't change the number of wheels – it's still a bicycle, after all –
but it does update ``maxPassengers`` to have the correct value for a tandem.

.. note::

    Subclasses are only allowed to modify
    *variable* properties of superclasses during initialization.
    Inherited constant properties may not be modified by subclasses.

Again, if you create an instance of ``Tandem``, and print its description,
you can see how its properties have been updated:

.. testcode:: inheritance

    --> let tandem = Tandem()
    <<< // tandem : Tandem = <Tandem instance>
    --> println("Tandem: \(tandem.description())")
    <-- Tandem: 2 wheels; up to 2 passengers

Note that the ``description()`` method has also been inherited
by ``Bicycle`` and ``Tandem``.
Instance methods of a class are inherited by any and all subclasses of that class.

.. QUESTION: Should I mention that you can subclass from NSObject?

.. _Inheritance_OverridingInstanceMethods:

Overriding Instance Methods
---------------------------

A subclass can provide its own custom implementation of an instance method
that it would otherwise inherit from a superclass.
This is known as :newTerm:`overriding` the method.

If you define a subclass method that overrides a superclass method,
you must prefix the overriding method definition with the ``@override`` attribute.
This makes it clear that you intended to provide an override,
and did not just accidentally provide a method with
the same name, parameter types and return type by mistake.
(Accidentally overriding a method can cause unexpected behavior,
and method overriding without the ``@override`` attribute is
diagnosed as an error when your code is compiled.)

In addition, the ``@override`` attribute prompts the Swift compiler
to check that the superclass has a method declaration that matches
the one you have provided.
This helps to ensure that your overriding method definition is correct,
and has not used an incorrect name, type or parameter order by mistake.

.. QUESTION: have I introduced the concept of "attributes" by this point?
   If not, when / where should I do so?

For example:

.. testcode:: inheritance

    --> class Car : Vehicle {
            var isConvertible: Bool = false
            init() {
                super.init()
                maxPassengers = 5
                numberOfWheels = 4
            }
            @override func description() -> String {
                return super.description() + "; "
                    + (isConvertible ? "convertible" : "not convertible")
            }
        }
    --> var car = Car()
    <<< // car : Car = <Car instance>
    --> println("Car: \(car.description())")
    <-- Car: 4 wheels; up to 5 passengers; not convertible

This example declares a new subclass of ``Vehicle``, called ``Car``.
``Car`` declares a new Boolean property called ``isConvertible``,
in addition to the properties it inherits from ``Vehicle``.
This property defaults to ``false``, as most cars are not convertibles.
``Car`` also has a custom initializer,
which sets the maximum number of passengers to ``5``,
and the default number of wheels to ``4``.

``Car`` then overrides its inherited ``description()`` method.
It does this by defining a function with the same declaration as
the one it would otherwise inherit,
prefixed by the ``@override`` attribute.
Rather than providing a completely custom implementation of ``description()``,
it actually starts by calling ``super.description()`` to retrieve
the description provided by its superclass.
It then appends some additional information onto the end,
and returns the complete description.

.. TODO: provide more information about function signatures,
   and what does / does not make them unique.
   For example, the parameter names do not have to match
   in order for a function to override a similar signature in its parent.
   (This is true for both of the function declaration syntaxes.)

.. note::

    Overriding of properties is not yet implemented.

.. _Inheritance_TypeCasting:

Type Casting
------------

It is sometimes necessary to check the specific class of an instance
in order to decide how it should be used.
It can also be necessary to treat a specific instance as if it is a different
superclass or subclass from its own class hierarchy.
Both of these tasks are achieved using :newTerm:`type casting`.

.. TODO: the wording of this para is unclear in its use of pronouns.

The next few code snippets define three classes,
and an array containing instances of those classes,
for use in an example of type casting.

The first snippet defines a new base class called ``MediaItem``.
This class provides basic functionality for any kind of item that might appear
in a digital media library.
Specifically, it declares a ``name`` property of type ``String``,
and an ``init withName()`` initializer.
(It is assumed that all media items, including all movies and songs, will have a name.)

.. testcode:: typeCasting

    --> class MediaItem {
            var name: String
            init withName(name: String) {
                self.name = name
            }
        }

The next snippet defines two subclasses of ``MediaItem``.
The first subclass, ``Movie``, encapsulates additional information about a movie or film.
It adds a ``director`` property on top of the base ``MediaItem`` class,
with a corresponding initializer.
The second subclass, ``Song``, adds an ``artist`` property and initializer
on top of the base class:

.. testcode:: typeCasting

    --> class Movie : MediaItem {
            var director: String
            init withName(name: String) director(director: String) {
                self.director = director
                super.init(withName: name)
            }
        }
    --> class Song : MediaItem {
            var artist: String
            init withName(name: String) artist(artist: String) {
                self.artist = artist
                super.init(withName: name)
            }
        }

Because ``Movie`` and ``Song`` are both subclasses of ``MediaItem``,
their instances can be used wherever a ``MediaItem`` instance can be used:

.. testcode:: typeCasting

    --> var library = Array<MediaItem>()
    <<< // library : Array<MediaItem> = []
    --> library.append(Movie("Casablanca", director: "Michael Curtiz"))
    --> library.append(Song("Blue Suede Shoes", artist: "Elvis Presley"))
    --> library.append(Movie("Citizen Kane", director: "Orson Welles"))
    --> library.append(Song("The One And Only", artist: "Chesney Hawkes"))
    --> library.append(Song("Never Gonna Give You Up", artist: "Rick Astley"))

The snippet above declares and initializes a new empty array called ``library``,
which is declared as an ``Array`` of type ``MediaItem``.
This means that it can only accept instances that are of type ``MediaItem``.

The snippet then appends some ``Movie`` and ``Song`` instances to the ``library`` array.
A ``Movie`` or a ``Song`` is also a ``MediaItem``,
and so an instance of either class can be added to the array.

.. note::

    The ``withName:`` selector has been left out of each of these initializer calls, for brevity.
    The initializers for ``Movie`` and ``Song`` both have their ``name`` value as the first parameter,
    and it is clear from the context that this is the correct initializer to use.
    As a result, leaving out the ``withName:`` selector does not cause any ambiguity.

.. _Inheritance_CheckingType:

Checking Type
~~~~~~~~~~~~~

You can check whether an instance is of a certain type by using the ``is`` operator:

.. testcode:: typeCasting

    --> var movieCount = 0
    <<< // movieCount : Int = 0
    --> var songCount = 0
    <<< // songCount : Int = 0
    --> for item in library {
            if item is Movie {
                ++movieCount
            } else if item is Song {
                ++songCount
            }
        }
    --> println("Media library contains \(movieCount) movies and \(songCount) songs")
    <-- Media library contains 2 movies and 3 songs

This example iterates through all of the items in the ``library`` array.
On each pass, the ``for``-``in`` loop sets the ``item`` constant
to the next ``MediaItem`` in the array.

``item is Movie`` returns ``true`` if the current ``MediaItem``
is an instance of the ``Movie`` type, and ``false`` if it is not.
Similarly, ``item is Song`` checks to see if the item is a ``Song`` instance.
At the end of the ``for``-``in`` loop, the values of ``movieCount`` and ``songCount``
contain a count of how many ``MediaItem`` instances were found of each type.

.. QUESTION: is it correct to refer to 'is' and 'as' as 'operators'?
   Or is there some better name we could use?

.. _Inheritance_Downcasting:

Downcasting
~~~~~~~~~~~

A constant or variable of a certain class type may actually refer to
an instance of a subclass behind the scenes. Where this is the case,
you can try and :newTerm:`downcast` to the subclass using the ``as`` operator:

.. testcode:: typeCasting

    --> for item in library {
            if let movie = item as Movie {
                println("Movie: '\(movie.name)', dir. \(movie.director)")
            } else if let song = item as Song {
                println("Song: '\(song.name)', by \(song.artist)")
            }
        }
    <-/ Movie: 'Casablanca', dir. Michael Curtiz
    <-/ Song: 'Blue Suede Shoes', by Elvis Presley
    <-/ Movie: 'Citizen Kane', dir. Orson Welles
    <-/ Song: 'The One And Only', by Chesney Hawkes
    <-/ Song: 'Never Gonna Give You Up', by Rick Astley

This example iterates over each ``MediaItem`` in ``library``,
and prints an appropriate description for each one.
To do this, it needs to access each item as if it is a true ``Movie`` or ``Song``,
and not just a generic ``MediaItem``.
This is necessary in order for it to be able to access
the ``director`` or ``artist`` property for use in the description.

The example starts by trying to downcast the current ``item`` as a ``Movie``.
Because ``item`` is a ``MediaItem`` instance, it's possible that it *might* be a ``Movie``;
equally, it's also possible that it might a ``Song``,
or even just a base ``MediaItem``.
Because of this uncertainty, the ``as`` operator returns an *optional* value
when attempting to downcast to a subclass type.
The result of ``item as Movie`` is of type ``Movie?``, or “optional ``Movie``”.

Downcasting to ``Movie`` will fail when trying to downcast
the two ``Song`` instances in the library array.
To cope with this, the example above uses :ref:`BasicTypes_OptionalBinding`
to check whether the optional ``Movie`` actually contains a value
(i.e. to find out whether the downcast succeeded.)
This optional binding is written “``if let movie = item as Movie``”,
which can be read as:

“Try and access ``item`` as a ``Movie``.
If this is successful,
set a new temporary constant called ``movie`` to
the value stored in the returned ``Movie?`` optional.”

If the downcasting succeeds, the properties of ``movie`` are then used
to print a description for that ``Movie`` instance, including the name of its ``director``.
A similar principle is used to check for ``Song`` instances,
and to print an appropriate description (including ``artist`` name)
whenever a ``Song`` is found in the library.

.. note::

    Casting does not actually modify the instance, or change its values.
    The underlying instance remains the same; it is just treated and accessed
    as an instance of the type to which it has been cast.

.. TODO: casting also needs to be mentioned in the context of protocol conformance.

.. TODO: talk about the use of "as" outside of an "if" statement sense,
   once rdar://16063985 is fixed.

.. TODO: this section needs to address the question of "a named value having a type"
   as distinct from "a class instance having a type".
   This is also relevant in a protocol context.

.. QUESTION: should I mention upcasting here?
   I can't think of an example where it's useful.
   However, it does display different behavior from downcasting,
   in that upcasting always works, and so it doesn't return an optional.
   