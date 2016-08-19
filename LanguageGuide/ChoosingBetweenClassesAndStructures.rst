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
















.. when framework gives you a class and you are expected to subclass it... don't fight the frameworks (Cocoa programmers)

.. things with identity... connection to some external system (e.g. sinks, file handlers, network sockets, etc.)

.. delegate object (has identity and will be passed around but different things need to refer to same instance of object)

.. "a thing that has identity" a thing where you want the same instance of a type

.. ToDo: why value types make it easier to reason about code (mutation at a distance & local reasoning)

.. in much the same way that constants make it easier to reason about your code because it can't change,
.. using value type you don't have to worry about where far away changes might be coming from

.. these are some things you might make classes in other languages














