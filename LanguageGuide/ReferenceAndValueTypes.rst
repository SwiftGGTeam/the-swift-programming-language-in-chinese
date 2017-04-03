.. New outline:
    * Classes & structs have a lot in common.
       - It might not be clear to the novice which one to use.
       - Default answer: start with a struct.
    * Structs are value types.
       - They help you avoid unintentional shared  state.
       - They're easier to reason about, which means fewer bugs.
    * I need subclasses!
       - Subclassing a framework class?  Ok, use a class.
       - Try using a protocol + a default implementation.
    * I need reference semantics!
       - Do you really?  Try making the struct a member of a class.
       - Ok, use a class.
    * Modelling an "external system"
       - For example, a file on disk or a view on screen.
       - Needs stable identity or custom init/deinit
       - Ok, use a class.
    * Classes have more dynamic behavior, which comes at a cost.
       - If you don't need it, don't pay for it.
       - ARC and heap allocation are more expensive than static stack allocation.
       - The optimizer can't be as agressive -- for example, with inlining.


Choosing Between Reference and Value Types
==========================================

Classes and structures in Swift have many similarities,
such as properties, methods, subscripts, and initializers,
which means it's not always obvious
when to use a class and when to use a structure.
The fundamental difference between classes and structures
is that classes are reference types
but structures are value types,
as introduced in :ref:`Classes_ClassesAreReferenceTypes`
and :ref:`Structures_StructuresAreValueTypes`.
In general,
most of the time you should use a structure
unless you need that additional dynamic behavior
that classes provide.


.. _ReferenceAndValueTypes_StructsAndEnums:

Using Structures and Enumerations
---------------------------------

Structures make it easier to reason about your code.
Because structures are value types,
they help you avoid accidental changes
due to confusion about the logic of your code.
In order to explore an example
of this kind of unintended mutation,
imagine that the ``Temperature`` structure from :doc:`Structures`
was a class instead:

.. testcode:: choosingbetweenclassesandstructureshypothetical

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

.. testcode:: choosingbetweenclassesandstructureshypothetical

    -> var roomTemperature = Temperature()
    << // roomTemperature : Temperature = REPL.Temperature
    -> roomTemperature.celsius = 21.0
    -> var ovenTemperature = roomTemperature
    << // ovenTemperature : Temperature = REPL.Temperature

When you turn on the oven,
you accidentally change the temperature of the room as well:

.. testcode:: choosingbetweenclassesandstructureshypothetical

    -> ovenTemperature.celsius = 180.0
    -> print("ovenTemperature is now \(ovenTemperature.celsius) degrees Celsius")
    <- ovenTemperature is now 180.0 degrees Celsius
    -> print("roomTemperature is also now \(roomTemperature.celsius) degrees Celsius")
    <- roomTemperature is also now 180.0 degrees Celsius

Because ``Temperature`` is a class,
setting ``ovenTemperature`` to ``roomTemperature``
means that both variables refer to the same ``Temperature`` instance.
Therefore, changing ``ovenTemperature``
also changes ``roomTemperature``,
which is clearly unintended.

This example of unintended sharing
is a simple illustration of a problem that often comes up
when using classes.
It is clear to see where things went wrong in this example,
but when you write more complicated code
and changes come from many different places,
it is much more difficult to reason about your code.

One solution to unintended sharing when using classes
is to manually copy your class instances as needed.
However,
manually copying class instances as needed is hard to justify
when structures do that for you with their copy-on-write behavior.

.. XXX weak argument -- better framed as structs give you (via reference semantics)
   what you were trying to build via defensive copying of class instances

Much like constants,
structures make it easier to reason about your code
because you don't have to worry about
where far-away changes might be coming from.
Structures provide a simpler abstraction,
saving you from having to think about unintended sharing
in those cases when you really don't need reference semantics.

.. _ReferenceAndValueTypes_StructInherit:

Structures and Inheritance
--------------------------

In many cases, even when you need inheritance,
you can still use a structure
by using protocols and default implementations.
For example,
consider the ``Vehicle`` base class from the examples in :doc:`Inheritance`.
You can create a ``Vehicle`` protocol instead,
with a default implementation for the ``description`` property
provided in an extension:

.. testcode:: choosingbetweenclassesandstructureshypothetical

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

.. testcode:: choosingbetweenclassesandstructureshypothetical

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

With protocols and protocol extensions at your disposal,
inheritance in itself is not a compelling reason to use a class ---
with the exception of those times when you need
to subclass an existing class
from a resource you don't control.

XXX When to Use a Reference Type
--------------------------------

If you're used to working in object-oriented languages
like Objective-C or C++,
you may be in the habit of writing a lot of classes.
In Swift,
you don't need classes as often as you might expect.
The major reasons to use a class are
when you're working with a framework whose API uses classes and
when you want to refer to the same instance of a type in multiple places.

XXX Working With Frameworks That Use Classes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A common pattern in frameworks
is to define a class that you are expected to subclass.
For example,
if you are working with the UIKit framework
and want to create a custom view,
you subclass ``UIView``.

It is also common when working with frameworks
to be expected to work with and pass around class instances.
Many framework APIs have method calls
that expect certain things to be classes.
For example,
a framework might expect you to pass around a delegate
that must be a class.

.. XXX needs a bit of meat -- "pass around" is too colloquial

In these scenarios when you are using a framework based in classes,
use classes.

XXX Using Classes For Stable Identity
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Class instances have stable identity.
When you initialize a class instance,
Swift allocates a region in memory to store that instance.
That region in memory has an address.
Constants or variables that are assigned to that instance
store that address to refer to that instance indirectly.
When you mutate that instance,
Swift keeps that instance stored in the same region in memory
with the same address.

.. XXX Talk about one thing at a time.

.. XXX can we have this discussion without talking about raw memory?
   many readers won't know what that is either

There are times when you want an instance
to remain in the same region in memory with the same address ---
when you really do want to refer to one instance of a type.

Take the ``Window`` class from :doc:`Classes`,
which represents a graphical window:

.. testcode:: choosingbetweenclassesandstructures

    -> class Window {
           var width: Int
           var height: Int

           init(width: Int, height: Int) {
               self.width = width
               self.height = height
           }
       }

It makes sense for ``Window`` to be a class
because you want to be able to refer to one instance of a ``Window``
from several places in code,
and it makes no sense to copy it.

.. XXX it's representing a resource

.. XXX fix the wording so it's not about "making sense";
   give a real reason instead

.. XXX being something that he user interacts with
   is a good indication that it should be a reference type
   (a physical object or a simulation of one,
   like a window on the screen)

Recall the ``rootWindow`` constant and the ``currentWindow`` variable:

.. testcode:: choosingbetweenclassesandstructures

    -> let windowOne = Window(width: 500, height: 300)
    << // windowOne : Window = REPL.Window
    -> let windowTwo = Window(width: 400, height: 400)
    << // windowTwo : Window = REPL.Window
    -> var currentWindow = windowOne
    << // currentWindow : Window = REPL.Window

Imagine you wanted to perform a check
to see if the current window is ``windowOne``,
and if not,
close the current window:

.. testcode:: choosingbetweenclassesandstructures

    -> if currentWindow !== windowOne {
           // close currentWindow
       }

This example makes sense only if ``currentWindow``
is a class instance rather than a structure instance.
If ``currentWindow`` were a copy of the current window
rather than a reference to the actual current window,
that would make no sense.
You are trying to close the actual current window ---
not a copy of it.

.. XXX the window object above is representing a resource

It is unclear what it would even mean
to copy a ``Window`` in the first place.
Assigning ``windowOne`` to ``currentWindow``
would give you multiple graphical windows
when you want only one.
When there really is just one of something
and you need to access that one thing
in multiple places in your code,
use a class.

.. XXX polish prose in para above & below for clarity

There are other times
when you want the stable identity of a class because
the lifetime of an instance is tied to some external entity,
such as a file that temporarily appears on a disk.
A custom data type instance that represents that file
needs to have reference semantics
so that all of your code that interacts with the object
is able to interact with the same on-disk file
and sees that file in the same state.
In addition, when the object is no longer needed
the on-disk file needs to be deleted.
In other words,
you need to manually handle deinitialization ---
something you can only do with classes.
If you are managing a resource that requires custom deinitialization,
use a class.

Another reason that graphical windows and files
are good examples for when to use a class
is that it is likely that many places in your code
would need to access or modify the same window or file.
For instance,
you can imagine needing to read from and write to the same file
in multiple places in your code.
When you need the ability
to change the same instance from multiple places,
use a class.

XXX When To Use a Value Type
----------------------------

If you don't need your custom data construct
to have reference semantics
for any of the reasons discussed above,
use a structure.
In general,
this means you should use structures by default,
and use classes in those special cases discussed above.

.. XXX the first part of this is all about unintended sharing
   due to using reference semantics when they're the wrong thing


XXX When You Need Inheritance
-----------------------------

.. XXX is this the right place for this?
   Maybe it should have gone in the Protocols chapter,
   with an xref from the Inheritance chapter
   and from this chapter.





.. XXX Both can do abstraction via protocols

.. XXX General question: what happens when I put a class instance inside a struct?
   In particular, call out the fact that this breaks value semantics,
   because copies of the struct all refer to the same classs instance.
   In contrast, composing value semantics preserves value semantics.

.. XXX Notes from WWDC 2016 session on Swift performance
   https://developer.apple.com/videos/play/wwdc2016/416/

   Classes give you a high degree of flexibility and dynamic behavior...
   but there's a cost to that dynamism.
   If you aren't using it, use a struct instead.

   Classes are allocated on the heap, which is more expensive
   than stack allocation for classes.

   Classes are reference counted, which takes time,
   and structs aren't.

   Classes have dynamic dispatch, which takes a little more time
   and which can't be optimized very much.
   (Final classes are a little better,
   as are classes that aren't exposed outside your module.)
   Structs use static dispatch, which can be aggressively optimized
   to do inlining.

   Not from that talk, but there's also a cognitive cost to using classes,
   because reference semantics requires you to think about every place
   that could be using the object,
   rather than being able to know that only code nearby
   is affected by changes to a struct's state.

