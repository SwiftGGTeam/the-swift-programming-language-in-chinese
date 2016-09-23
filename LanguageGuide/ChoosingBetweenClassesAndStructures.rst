Choosing Between Reference and Value Types
==========================================

Classes and structures in Swift have many similarities.
Both have properties, methods, subscripts, initializers, use dot syntax,
and so on.
As a result,
it can be hard to know
when to use classes and
when to use structures
for the building blocks
of your program.
The fundamental difference
between structures and classes
is that structures are value types
whereas classes are reference types,
as introduced in :ref:`Structures_StructuresAreValueTypes`
and :ref:`Classes_ClassesAreReferenceTypes`.

.. _ChoosingBetweenClassesAndStructures_WhenToUseAClass:

When to Use a Class
-------------------

If you're used to working
in object-oriented languages
like Objective-C or C++,
you may be in the habit
of writing a lot of classes.
In Swift,
you don't need classes
as often as you might expect,
but they still have their place.
Use a class
when you're working with a framework whose API uses classes and
when you want to refer to the same instance of a type in multiple places.

.. _ChoosingBetweenClassesAndStructures_WorkingWithFrameworksThatUseClasses:

Working With Frameworks That Use Classes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When you are working with resources that you
don't control such as frameworks,
it is common to be given a base class
that you are expected to subclass.
For example,
if you are working with the UIKit framework
and want to create a custom view,
you are expected
to subclass ``UIView``.

It is also common when working with frameworks
to be expected to work with and pass around
class instances.
Many framework APIs have method calls that
expect certain things to be classes.
For example,
a framework might expect you
to pass around a delegate
that must be a class.

In these scenarios
when you are using a framework based in classes,
use classes.

.. _ChoosingBetweenClassesAndStructures_UsingClassesForStableIdentity:

Using Classes For Stable Identity
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Class instances have stable identity.
When you initialize a class instance,
Swift picks out a region in memory
to store that instance.
That region in memory has an address.
Constants or variables
that are assigned
to that instance
store that address
to refer to that instance indirectly.
When you mutate that instance,
Swift keeps that instance stored
in the same region in memory
with the same address.

There are times
when you want an instance
to remain in the same region in memory
with the same address ---
when you really do want
to refer to one instance
of a type.

Take the ``Window`` class
from :doc:`Classes`,
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
because you want to be able to
refer to one instance of a ``Window``
from several places in code,
and it makes no sense to copy it.

Recall
the ``rootWindow`` constant and
the ``currentWindow`` variable:

.. testcode:: choosingbetweenclassesandstructures

    -> let windowOne = Window(width: 500, height: 300)
    << // windowOne : Window = REPL.Window
    -> let windowTwo = Window(width: 400, height: 400)
    << // windowTwo : Window = REPL.Window
    -> var currentWindow = windowOne
    << // currentWindow : Window = REPL.Window

Imagine you wanted
to perform a check
to see if the current window
is ``windowOne``,
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

It is unclear
what it would even mean
to copy a ``Window`` in the first place.
Assigning ``windowOne`` to ``currentWindow``
would give you multiple graphical windows
when you want only one.
When there really is just one of something
and you need to access that one thing
in multiple places in your code,
use a class.

There are other times
when you want the stable identity
of a class because 
the lifetime of an instance
is tied to some external entity,
such as a file
that temporarily appears
on a disk.
Your custom data type instance
that represents that file
needs to exist
in one constant region in memory
so that you can free up that memory
when you are ready to delete the file.
In other words,
you need to manually handle deinitialization ---
something you can only do with classes.
If you are managing a resource
that requires custom deinitialization,
use a class.

Another reason
that graphical windows and files
are good examples
for when to use a class
is that it is likely
that many places in your code
would need to access or modify
the same window or file.
For instance,
you can imagine needing
to read from
and write to
the same file
in multiple places in your code.
When you need
the ability to change
the same instance
from multiple places,
use a class.

.. _ChoosingBetweenClassesAndStructures_WhenToUseAStructure:

When To Use a Structure
-----------------------

If you don't need your custom data construct
to have reference semantics
for any of the reasons discussed above,
use a structure.
In general,
this means you should
use structures by default,
and use classes
in those special cases
discussed above.

.. _ChoosingBetweenClassesAndStructures_WhyToUseAStructure:

Why to Use a Structure
----------------------

Structures make it easier
to reason about your code.
Because structures are value types,
they help you avoid accidental changes
due to confusion about the logic
of your code. 
In order to explore an example
of this kind of unintended mutation,
imagine that the ``Temperature``structure from :doc:`Structures`
was a class instead:

.. testcode:: choosingbetweenclassesandstructureshypothetical

    -> class Temperature {
           var celsius = 0.0
           var fahrenheit: Double {
               return celsius * 9/5 + 32
           }
       }
       
You can create
``roomTemperature`` and ``ovenTemperature`` variables
like before
to model the ambient temperature of a room
and the temperature of an oven in that room.
Initially,
you set ``ovenTemperature`` to ``roomTemperature``
because the oven is off
and at the same temperature
as the room: 

 .. testcode:: choosingbetweenclassesandstructureshypothetical

    -> var roomTemperature = Temperature()
    << // roomTemperature : Temperature = REPL.Temperature
    -> roomTemperature.celsius = 21.0
    -> var ovenTemperature = roomTemperature
    << // ovenTemperature : Temperature = REPL.Temperature

When you turn on the oven,
you accidentally change the temperature
of the room as well: 

.. testcode:: choosingbetweenclassesandstructureshypothetical

    -> ovenTemperature.celsius = 180.0
    -> print("ovenTemperature is now \(ovenTemperature.celsius) degrees Celsius")
    <- ovenTemperature is now 180.0 degrees Celsius
    -> print("roomTemperature is also now \(roomTemperature.celsius) degrees Celsius")
    <- roomTemperature is also now 180.0 degrees Celsius

Because ``Temperature`` is a class,
setting ``ovenTemperature`` to ``roomTemperature``
means that both variables refer
to the same ``Temperature`` instance.
Therefore, changing ``ovenTemperature``
also changes ``roomTemperature``,
which is clearly unintended. 

This example of unintended sharing
is a simple illustration
of a problem
that often comes up
when using classes.
It is clear to see where
things went wrong in this example,
but when you write more complicated code
and changes come from many different places,
it is much more difficult
to reason about your code.

One solution
to unintended sharing
when using classes
is to manually copy
your class instances
as needed.
However,
manually copying
class instances as needed
is hard to justify
when structures
do that for you
with their copy-on-write behavior.

Much like constants,
structures make it
easier to reason about your code
because you don't have to worry
about where far-away changes
might be coming from.
Structures provide a simpler abstraction,
saving you from having
to think about unintended sharing
in those cases when you really
don't need reference semantics.

.. _ChoosingBetweenClassesAndStructures_WhenYouNeedInheritance:

When You Need Inheritance
-------------------------

You might think
you should use a class
when you need inheritance.
In many cases,
Swift's protocols and protocol extensions
make it so that
you can use structures
and still have inheritance.

To show how you can use structures and still have inheritance,
imagine that the ``Vehicle`` base class from :doc:`Inheritance`
was a ``Vehicle`` a protocol instead
with a default implementation provided in a protocol extension: 

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
get a default implementation
of ``description``
that they can override.

With protocols and protocol extensions
at your disposal,
inheritance in itself
is not a compelling reason
to use a class --- 
with the exception
of those times
when you need
to subclass an existing class
from a resource you don't control.
