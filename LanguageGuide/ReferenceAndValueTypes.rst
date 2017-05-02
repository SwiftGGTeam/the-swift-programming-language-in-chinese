Choosing Between Reference and Value Types
==========================================

.. XXX The chapter title was changed from classes vs structs
   in commit 0909150, which doesn't describe *why* the change was made.
   I don't remember exactly what that reason was,
   and I don't have any notes in email about the feedback Andrew got.
   [Contributor 4485] called out in the dev edit the fact that
   the higher-level headings are about ref/value types
   but the content is about classes and structs.
   Worth re-evaluating which way to frame this.

Classes and structures in Swift have many similarities,
such as properties, methods, subscripts, and initializers,
which means it's not always obvious
when to use a class and when to use a structure.
If you're used to working in languages like Objective-C or C++,
you're probably used to writing a lot of classes.
In Swift, you don't need classes as often as you might expect.

The fundamental difference between classes and structures
is that classes are reference types
but structures are value types,
as introduced in :ref:`Classes_ClassesAreReferenceTypes`
and :ref:`Structures_StructuresAreValueTypes`.
In general,
most of the time you should use a structure
unless you need reference semantics
or the additional dynamic behavior
that classes provide.
The major reasons to use a class are
when you're working with a framework whose API uses classes and
when you want to refer to the same instance of a type in multiple places.

.. _ReferenceAndValueTypes_StructsAndEnums:

Use Structures and Enumerations for Value Semantics
---------------------------------------------------

Structures make it easier to reason about your code.
Because structures are value types,
they help you avoid accidental shared state
between parts of a program.
In order to explore an example
of this kind of unintended mutation,
let's take the ``Temperature`` structure from :doc:`Structures`
and look at the problem that happens when it's a class:

.. testcode:: struct-vs-class-temperature

    -> class Temperature {
           var celsius = 0.0
           var fahrenheit: Double {
               return celsius * 9/5 + 32
           }
       }

You can create ``roomTemperature`` and ``ovenTemperature`` variables
like before to model the ambient temperature of a room
and the temperature of an oven in that room.
Initially,
you set ``ovenTemperature`` to ``roomTemperature``
because the oven is off and at the same temperature as the room:

.. testcode:: struct-vs-class-temperature

    -> var roomTemperature = Temperature()
    << // roomTemperature : Temperature = REPL.Temperature
    -> roomTemperature.celsius = 21.0
    -> var ovenTemperature = roomTemperature
    << // ovenTemperature : Temperature = REPL.Temperature

When you turn on the oven,
you accidentally change the temperature of the room as well:

.. testcode:: struct-vs-class-temperature

    -> ovenTemperature.celsius = 180.0
    -> print("ovenTemperature is now \(ovenTemperature.celsius) degrees Celsius")
    <- ovenTemperature is now 180.0 degrees Celsius
    -> print("roomTemperature is also now \(roomTemperature.celsius) degrees Celsius")
    <- roomTemperature is also now 180.0 degrees Celsius

Because ``Temperature`` is a class, it has reference semantics ---
both``ovenTemperature`` and ``roomTemperature``
refer to the same ``Temperature`` instance.
Changing ``ovenTemperature`` also changes ``roomTemperature``
because there is only one temperature.

.. image:: ../images/sharedStateClass_2x.png
   :align: center

In contrast,
if you declare ``Temperature`` as a structure,
that gives the temperatures value semantics instead of any shared state.
This gives you what you actually wanted: two independent temperatures,
one for the oven and one for the room.

.. testcode:: struct-vs-class-temperature-correct

    -> struct Temperature {
           var celsius = 0.0
           var fahrenheit: Double {
               return celsius * 9/5 + 32
           }
       }
    ---
    -> var roomTemperature = Temperature()
    << // roomTemperature : Temperature = REPL.Temperature(celsius: 0.0)
    -> roomTemperature.celsius = 21.0
    -> var ovenTemperature = roomTemperature
    << // ovenTemperature : Temperature = REPL.Temperature(celsius: 21.0)
    ---
    -> ovenTemperature.celsius = 180.0
    -> print("ovenTemperature is now \(ovenTemperature.celsius) degrees Celsius")
    <- ovenTemperature is now 180.0 degrees Celsius
    -> print("roomTemperature is still \(roomTemperature.celsius) degrees Celsius")
    <- roomTemperature is still 21.0 degrees Celsius

With value semantics,
there is no shared state between the room temperature and the oven temperature.
Changing one temperature has no effect on the other.

.. image:: ../images/sharedStateStruct_2x.png
   :align: center

This example of unintended sharing
is a simple illustration of a problem that often comes up
when using classes.
It is clear to see where things went wrong in this example,
but when you write more complicated code
and changes come from many different places,
it is much more difficult to reason about your code.
Much like constants,
structures make it easier to reason about your code
because you don't have to worry about
where far-away changes might be coming from.

.. XXX Note from discission with Alex Migicovsky
   If you're coming from another language
   where you model pretty much everything as a class,
   watch for places where you create
   immutable clas instances in that language.
   This is a good example of actually wanting value semantics
   but not having a language that can give it to you.
   For example, consider UIImage.
   ... look for a good example that actually *does* get
   a Swift value type...
   NSDecimalNumber or NSUUID might work

.. _ReferenceAndValueTypes_StructInherit:

Inheritance Using Structures
----------------------------

In many cases, even when you need inheritance,
you can still use a structure
by using protocols and default implementations.
For example,
consider the ``Vehicle`` base class from the examples in :doc:`Inheritance`.
You can create a ``Vehicle`` protocol instead,
with a default implementation for the ``description`` property
provided in an extension:

.. testcode:: struct-vs-class-temperature

    -> protocol Vehicle {
           var currentSpeed: Double { get set }
           func makeNoise()
       }
    -> extension Vehicle {
           var description: String {
               return "traveling at \(currentSpeed) miles per hour"
           }
       }

Instead of using subclasses,
you can use ``Car`` and ``Train`` structures
that conform to the ``Vehicle`` protocol:

.. testcode:: struct-vs-class-temperature

    -> struct Train: Vehicle {
           var currentSpeed = 0.0
           func makeNoise() {
               print("Choo Choo")
           }
       }
    -> struct Car: Vehicle {
           var currentSpeed = 0.0
           var gear = 1
           func makeNoise() {
               print("Vroom Vroom")
           }
           var description: String {
               return "traveling at \(currentSpeed) miles per house in gear \(gear)"
           }
       }

Much like their class counterparts,
the ``Train`` and ``Car`` structures
get a default implementation of ``description``
that they can override.
Like the class version,
``Vehicle`` still provides the default implementation ---
but in the structure version, ``Vehicle`` is a protocol.
``Train`` doesn't implement a ``description`` property,
so it uses the default implementation from ``Vehicle``.
``Car`` implements its own ``description``
which overrides the default implementation.

With protocols and protocol extensions at your disposal,
inheritance in itself is not a compelling reason to use a class ---
with the exception of those times when you need
to subclass an existing class
from a resource you don't control.

.. _ReferenceAndValueTypes_StructSharedState:

Shared State Using Structures
-----------------------------

In many cases,
even when you need shared mutable state,
you can still use a structure
by taking advantage of a containing class.
For example,
consider part of the data model used by a game to track players' scores.
Because the scores need to be shared
between different parts of of the game,
you might initially use a class for everything,
to make sure you get reference semantics.

.. testcode:: struct-shared-state-bad

    -> class Score {
           var points = 0
       }
    ---
    -> class Game {
           var player1: Score
           var player2: Score
           init() {
               self.player1 = Score()
               self.player2 = Score()
           }
       }
    ---
    -> var currentGame = Game()
    -> currentGame.player1.points += 10
    << // currentGame : Game = REPL.Game

However,
notice that all code that interacts with the scores
accesses them as properties of ``currentGame``,
which has reference semantics because it's also a class.
This is a fairly common pattern:
This shared data model is shaped like a tree,
with one object that contains several other shared objects.
When you see this pattern,
you can make a class for the outermost container,
like ``Game`` in this example,
and then use structures for all of the data inside it.
Here's what that approach looks like:

.. testcode:: struct-shared-state-good

    -> struct Score {
           var points = 0
       }
    ---
    -> class Game {
           var player1: Score
           var player2: Score
           init() {
               self.player1 = Score()
               self.player2 = Score()
           }
       }
    ---
    -> var currentGame = Game()
    -> currentGame.player1.points += 10
    << // currentGame : Game = REPL.Game

Any code that needs to access the board or players
goes through ``game``.
Because ``game`` itself is shared,
all of its properties are also shared.
For example,
in the all-classes approach,
the code in your underlying game engine
and the code in your user interface
both could refer to ``Score`` objects directly.
(Although, many coding styles would recommend against this.)
In the approach where only ``Game`` is a class,
all of your code keeps a reference to the ``Game`` object
and uses the game to access the its scores.

.. Referring from the view directly to a score object
   is at least an in-spirit violation of the Law of Demeter.
   I don't have a good reason to call it straight-out "wrong"
   but it's certainly not good code either.

.. XXX ART

::

   XXX FIGURE GOES HERE XXX

              game
               ||
   Model --> player1: Score <-- View
         --> player2: Score <-- View

   Model -->  game <-- View
               ||
             player1: Score
             player2: Score

.. note::

   This arrangement of a class that contains several structures
   is sometimes called :newTerm:`composition`.
   Composition can also be used to divide up a complex class
   into a simpler class plus several structures
   that are each responsible for one part of the overall logic or behavior.

   Using composition can also make your code easier to test.
   For example,
   if you a testing code used to calculate the size
   of different parts of a complex user interface,
   it is easier to test a structure
   that is responsible for only the calculations
   that is responsible for both calculations and drawing.
   The structure has fewer dependencies,
   and it exposes the calculated results directly.

.. _ReferenceAndValueTypes_ClassRefSemantics:

Use Classes For Reference Semantics
-----------------------------------

The most common reason to use a class
instead of a structure or an enumeration
is because you need reference semantics.
In the example above,
although it was possible to model the players' scores using structures,
at some point in the data you need to have a single shared game object.
Because structures have value semantics,
you can use them for shared state
only when they are part of some larger data structure.
For example,
it wouldn't work to make ``Game`` a structure ---
then there wouldn't be any overarching shared state.

Another reason you need reference semantics
is when you need to model some external entity.
For example,
a custom data type instance that represents a file on disk
needs to have reference semantics
so that all of your code that interacts with the object
is able to interact with the same on-disk file,
and sees that file in the same state.

In addition, when the object is no longer needed
the on-disk file needs to be deleted.
In other words,
you need to manually handle deinitialization ---
something you can only do with classes.

.. XXX classes have *identity*

.. XXX copying a class gives you a new unrelated thing
       (or is a nonsensical operation)
       because structs have no identity,
       copying one doesn't mean anything

.. XXX being something that the user interacts with
   is sometimes a good indication that it should be a reference type
   (a physical object or a simulation of one,
   like a window on the screen)

.. _ReferenceAndValueTypes_ClassFrameworks:

Working with Frameworks That Expect Classes
-------------------------------------------

Many frameworks define base classes
that you are expected to subclass
as part of using the framework.
For example,
if you are working with the UIKit framework
and want to create a custom view,
you subclass ``UIView``.
In these cases,
it doesn't matter whether you want reference semantics or value semantics ---
you always use a class,
because only classes can have superclasses.

Another common scenario where the framework expects you to provide a class
is when you provide a delegate or a data source.
For these patterns,
the framework defines a protocol that your class adopts,
and you provide an instance of your class
when configuring some object provided by the framework.
