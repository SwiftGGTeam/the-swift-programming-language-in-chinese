Choosing Between Classes and Structures
=======================================

Everything a structure can do, a class can do and more,
which raises the question of
when to use a structure and
when to use a class
for your custom data types
in Swift.

The fundamental difference
between structures and classes
is that structures are value types
whereas classes are reference types.

For more information,
see :ref:`Structures_StructuresAreValueTypes`
and :ref:`Classes_ClassesAreReferenceTypes`.

.. _ChoosingBetweenClassesAndStructures_WhenToUseAClass:

When to Use a Class
-------------------

If you're used to working
in object-oriented languages
like C or Objective-C,
you may be in the habit
of writing a lot of classes.
In Swift,
you don't need classes
as often as you might expect,
but they still have their place.

Use a class when you want
to refer to the same instance of a type
in multiple places,
when you need
to subclass an existing class,
or when you are expected
to pass a class instance.

.. _ChoosingBetweenClassesAndStructures_UsingClassesForStableIdentity:

Using Classes for Stable Identity
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Class instances have :newTerm:`stable identity`.
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
By contrast,
when you mutate a structure instance,
Swift moves that instance
to a different region in memory
with a new address.

.. note::

   Swift copies a structure instance in memory
   only if the instance is changed.
   This behavior is called :newTerm:`copy-on-write`.
   While code functions as though structure instances are copied
   when you assign them
   to a new variable or constant,
   Swift copies a structure instance in memory
   only if you change it from the original.
   This optimization saves Swift from doing unnecessary work
   as Swift needs to copy a structure instance
   only if you mutate it.
   

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
and it makes no sense to copy it.

Recall
the ``rootWindow`` constant and
the ``currentWindow`` variable:

.. testcode:: choosingbetweenclassesandstructures

    -> let rootWindow = Window(width: 500, height: 300)
    << // rootWindow : Window = REPL.Window
    -> var currentWindow = rootWindow
    << // currentWindow : Window = REPL.Window

Imagine you wanted
to perform a check
to see if the current window
is the root window,
and if not,
close the current window:

.. testcode:: choosingbetweenclassesandstructures

    -> if currentWindow !== rootWindow {
           // close currentWindow
       }

If ``currentWindow`` were a copy of the current window
rather than a reference to the actual current window,
that would make no sense.
You are trying to close the actual current window ---
not a copy of it.

It is unclear
what it would even mean
to copy a ``Window`` in the first place.
Assigning ``rootWindow`` to ``currentWindow``
would give you multiple graphical windows
when you want only one.
When there really is just one of something
and you need to access that one thing
in multiple places,
use a class.

There are other times
when you want the stable identity
of a class because 
the lifetime of an instance
is tied to some external entity
such as a file
that temporarily appears
on a disk.
Your custom data type instance
to represent that file
needs to exist
in one constant region in memory
so that you can free up that memory
at the end of the file's lifetime.
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

.. _ChoosingBetweenClassesAndStructures_WorkingWithExistingClasses:

Working with Existing Classes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When you are working with frameworks,
it is common to be given a baseclass
that you are expected to subclass
or to be expected
to pass around class instances.
For example,
if you are working with the AppKit framework
and want to create a custom view,
you are expected
to subclass ``NSView``.
In these scenarios,
use a class.

.. _ChoosingBetweenClassesAndStructures_WhenToUseAStructure:

When to Use a Structure
-----------------------

In Swift, structures can and should be
used for more than you might think ---
especially if you are used to working
in object-oriented languages
like C and Objective-C.
As discussed in :doc:`Structures`,
structures in Swift
can do so much more
than store a few simple data values.

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
they help you avoid
the unintended sharing
that often happens
when using classes.

Recall the ``Temperature`` structure
from :doc:`Structures`: 

.. testcode:: choosingbetweenclassesandstructures

    -> struct Temperature {
           var celsius = 0.0
           var fahrenheit: Double {
               return celsius * 9/5 + 32
           }
       }

Imagine ``Temperature`` was a class instead:

.. testcode:: choosingbetweenclassesandstructureshypothetical

    -> class Temperature {
           var celsius = 0.0
           var fahrenheit: Double {
               return celsius * 9/5 + 32
           }
       }
       
You can create ``roomTemperature`` and ``ovenTemperature`` variables
like before, but now they are class instances: 

 .. testcode:: choosingbetweenclassesandstructureshypothetical

    -> var roomTemperature = Temperature()
    << // roomTemperature : Temperature = REPL.Temperature
    -> roomTemperature.celsius = 21.0
    -> var ovenTemperature = roomTemperature
    << // ovenTemperature : Temperature = REPL.Temperature

When you go to turn on the oven like before,
you change the temperature of the room as well: 

.. testcode:: choosingbetweenclassesandstructureshypothetical

    -> ovenTemperature.celsius = 180.0
    -> print("ovenTemperature is now \(ovenTemperature.celsius) degrees Celsius")
    <- ovenTemperature is now 180.0 degrees Celsius
    -> print("roomTemperature is also now \(roomTemperature.celsius) degrees Celsius")
    <- roomTemperature is also now 180.0 degrees Celsius

Because ``Temperature`` is now a class,
setting ``ovenTemperature`` to ``roomTemperature``
means that both variables refer
to the same ``Temperature`` instance.
Therefore, changing ``ovenTemperature``
also changes ``roomTemperature``,
which is clearly unintended. 

This example of unintended sharing
is a simple example of a problem
that often comes up
when using classes.
It is clear to see where
things went wrong in this example,
but when you write more complicated code
and have to worry
about changes coming from many different places,
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
do that for you.

In much the same way
that constants
make it easier
to reason about your code,
structures make it
so you don't have to worry
about where far-away changes
might be coming from.

.. _ChoosingBetweenClassesAndStructures_OnInheritance:

On Inheritance
--------------

You might think
you should use a class
because you need inheritance.
In Swift,
protocols and protocol extensions
make it so that
you can use structures
and still have inheritance.

Consider the ``Vehicle`` base class
from :doc:`Inheritance`: 

.. testcode:: choosingbetweenclassesandstructures

    -> class Vehicle {
           var currentSpeed = 0.0
           var description: String {
               return "traveling at \(currentSpeed) miles per hour"
           }
           
           func makeNoise() {
               // do nothing - an arbitrary vehicle doesn't necessarily make a noise
           }
       }

As discussed in :doc:`Inheritance`,
you can create subclasses of ``Vehicle``
that inherit its properties,
such as ``Train`` and ``Car``:

.. testcode:: choosingbetweenclassesandstructures

    -> class Train: Vehicle {
           override func makeNoise() {
               print("Choo Choo")
           }
       }
    -> class Car: Vehicle {
           var gear = 1
           override var description: String {
               return super.description + " in gear \(gear)"
           }
       } 

Instead of using a ``Vehicle`` base class,
you can make ``Vehicle`` a protocol
and provide a default implementation
in a protocol extension: 

.. testcode:: choosingbetweenclassesandstructureshypothetical

    -> protocol Vehicle {
           var currentSpeed: Double { get set }
       }
    -> extension Vehicle { 
           var description: String { 
               return "traveling at \(currentSpeed) miles per hour"
           }
           
           func makeNoise() {
               // do nothing - an arbitrary vehicle doesn't necessarily make a noise
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
           var description: String {
               return "traveling at \(currentSpeed) miles per house in gear \(gear)"
           }
       }

Much like their class counterparts,
the ``Train`` and ``Car`` structures
inherit implementations
of ``description`` and ``makeNoise()``
that they can override.

With protocols and protocol extensions
at your disposal,
inheritance in itself
is not a compelling reason
to use a class --- 
with the exception
of those cases
when you need
to subclass an existing class.













