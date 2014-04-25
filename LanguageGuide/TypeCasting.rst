Type Casting
============

It is sometimes necessary to check the specific class of an instance
in order to decide how it should be used.
It can also be necessary to treat a specific instance as if it is a different
superclass or subclass from somewhere else in its own class hierarchy.
Both of these tasks are achieved using :newTerm:`type casting`.

The next three code snippets define three classes,
and an array containing instances of those classes,
for use in an example of type casting.

This first snippet defines a new base class called ``MediaItem``.
This class provides basic functionality for any kind of item that might appear
in a digital media library.
Specifically, it declares a ``name`` property of type ``String``,
and an ``init name`` initializer.
(It is assumed that all media items, including all movies and songs, will have a name.)

.. testcode:: typeCasting

   -> class MediaItem {
         var name: String
         init(name: String) {
            self.name = name
         }
      }

This next snippet defines two subclasses of ``MediaItem``.
The first subclass, ``Movie``, encapsulates additional information about a movie or film.
It adds a ``director`` property on top of the base ``MediaItem`` class,
with a corresponding initializer.
The second subclass, ``Song``, adds an ``artist`` property and initializer
on top of the base class:

.. testcode:: typeCasting

   -> class Movie: MediaItem {
         var director: String
         init(name: String, director: String) {
            self.director = director
            super.init(name: name)
         }
      }
   -> class Song: MediaItem {
         var artist: String
         init(name: String, artist: String) {
            self.artist = artist
            super.init(name: name)
         }
      }

This final snippet creates a constant array called ``library``,
which contains two ``Movie`` instances and three ``Song`` instances.
Here, the type of the ``library`` array is inferred
by initializing it with the contents of an array literal.
Swift's type-checker is able to deduce that ``Movie`` and ``Song`` have
a common superclass of ``MediaItem``,
and so it infers a type of ``Array<MediaItem>`` for the ``library`` array:

.. testcode:: typeCasting

   -> let library = [
         Movie("Casablanca", director: "Michael Curtiz"),
         Song("Blue Suede Shoes", artist: "Elvis Presley"),
         Movie("Citizen Kane", director: "Orson Welles"),
         Song("The One And Only", artist: "Chesney Hawkes"),
         Song("Never Gonna Give You Up", artist: "Rick Astley")
      ]
   << // library : MediaItem[] = [<MediaItem instance>, <MediaItem instance>, <MediaItem instance>, <MediaItem instance>, <MediaItem instance>]
   // the type of "library" is inferred to be Array<MediaItem>

The items stored in ``library`` are still ``Movie`` and ``Song`` instances behind the scenes.
However, if you iterate over the contents of this array,
the items you receive back will be typed as ``MediaItem``,
and not as ``Movie`` or ``Song``.
In order to work with them as their native type,
you will need to *check* their type,
or *downcast* them to a different type,
as described below.

.. note::

   The ``name:`` label has been left out of each of these
   ``Movie`` and ``Song`` initializer calls, for brevity.
   The initializers for ``Movie`` and ``Song`` both have their ``name`` value as the first parameter,
   and it is clear from the context that this is the correct initializer to use.
   As a result, leaving out the ``name:`` label does not cause any ambiguity.

.. _TypeCasting_CheckingType:

Checking Type
-------------

You can check whether an instance is of a certain subclass type by using the ``is`` operator.
The ``is`` operator returns ``true`` if the instance is of that subclass type,
and ``false`` if it is not:

.. testcode:: typeCasting

   -> var movieCount = 0
   << // movieCount : Int = 0
   -> var songCount = 0
   << // songCount : Int = 0
   -> for item in library {
         if item is Movie {
            ++movieCount
         } else if item is Song {
            ++songCount
         }
      }
   -> println("Media library contains \(movieCount) movies and \(songCount) songs")
   <- Media library contains 2 movies and 3 songs

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

.. _TypeCasting_Downcasting:

Downcasting
-----------

A constant or variable of a certain class type may actually refer to
an instance of a subclass behind the scenes. Where this is the case,
you can try and :newTerm:`downcast` to the subclass type by using the ``as`` operator.
Because downcasting can fail,
the ``as`` operator returns an *optional* value of the type you are trying to downcast to:

.. testcode:: typeCasting

   -> for item in library {
         if let movie = item as Movie {
            println("Movie: '\(movie.name)', dir. \(movie.director)")
         } else if let song = item as Song {
            println("Song: '\(song.name)', by \(song.artist)")
         }
      }
   </ Movie: 'Casablanca', dir. Michael Curtiz
   </ Song: 'Blue Suede Shoes', by Elvis Presley
   </ Movie: 'Citizen Kane', dir. Orson Welles
   </ Song: 'The One And Only', by Chesney Hawkes
   </ Song: 'Never Gonna Give You Up', by Rick Astley

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
To cope with this, the example above uses optional binding
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

.. _TypeCasting_AnyAndAnyObject:

Any and AnyObject
-----------------

Swift provides two special type aliases for working with non-specific types:

* ``AnyObject``, which can represent an instance of any class type
* ``Any``, which can represent an instance of any type at all,
  apart from function types

.. TODO: remove the note about function types if / when rdar://16406907 is fixed.

Here's an example of using ``Any`` to work with a mix of different types:

.. testcode:: typeCasting

   -> var things = Array<Any>()
   << // things : Array<Any> = []
   -> things.append(0)
   -> things.append(0.0)
   -> things.append(42)
   -> things.append(3.14159)
   -> things.append("hello")
   -> things.append((3.0, 5.0))
   -> things.append(Movie("Ghostbusters", director: "Ivan Reitman"))

This example creates a new array called ``things``, which can store values of type ``Any``.
In this case, it contains
two ``Int`` values, two ``Double`` values, a ``String`` value,
a tuple of type ``(Double, Double)``,
and the movie “Ghostbusters”, directed by Ivan Reitman.

.. note::

   ``Any`` and ``AnyObject`` should only be used when you explicitly need
   the behavior and capabilities they provide.
   It is always better to be specific about the types you expect to work with in your code.

.. _TypeCasting_CheckedCastsInSwitchStatements:

Checked Casts in Switch Statements
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you are working with a constant or variable
whose type is only known to be ``Any`` or ``AnyObject``,
you can use the ``is`` and ``as`` operators to find out about the types they hold,
and to work with them as more specific types.
This is true even if they are not class types.

For example, the ``is`` and ``as`` operators can be used within
the cases of a ``switch`` statement to check and match values of a certain type,
and to assign those values to temporary constants or variables
(as described in :ref:`ControlFlow_ValueBindings`):

.. testcode:: typeCasting

   -> for thing in things {
         switch thing {
            case 0 as Int:
               println("zero as an Int")
            case 0 as Double:
               println("zero as a Double")
            case let someInt as Int:
               println("an integer value of \(someInt)")
            case let someDouble as Double where someDouble > 0:
               println("a positive double value of \(someDouble)")
            case is Double:
               println("some other double value that I don't want to print")
            case let someString as String where someString == someString.lowercase:
               println("a lowercase string value of \"\(someString)\"")
            case let (x, y) as (Double, Double):
               println("an (x, y) point at \(x), \(y)")
            case let movie as Movie:
               println("a movie called '\(movie.name)', dir. \(movie.director)")
            default:
               println("something else")
         }
      }
   </ zero as an Int
   </ zero as a Double
   </ an integer value of 42
   </ a positive double value of 3.14159
   </ a lowercase string value of "hello"
   </ an (x, y) point at 3.0, 5.0
   </ a movie called 'Ghostbusters', dir. Ivan Reitman

.. TODO: Where should I mention “AnyClass”?

.. TODO: casting also needs to be mentioned in the context of protocol conformance.

.. TODO: talk about the use of "as" outside of an "if" statement sense,
   once rdar://16063985 is fixed.

.. TODO: this section needs to address the question of "a constant or variable having a type"
   as distinct from "a class instance having a type".
   This is also relevant in a protocol context.

.. QUESTION: should I mention upcasting here?
   I can't think of an example where it's useful.
   However, it does display different behavior from downcasting,
   in that upcasting always works, and so it doesn't return an optional.
