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

There are times when
it does not make sense
to copy something and
you really do want
to refer to one instance
of a type.

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

What would it even mean
to copy a ``Window``
in the first place?
When you assign ``rootWindow`` to ``currentWindow``,
you would have multiple graphical windows
when there is really only one.
If you need a custom data type
to capture something that there is truly
only one of and you need to access
the exact same instance in multiple places,
use a class.

There are also times
when you need an instance
to connect to some external entity...


.. _ChoosingBetweenClassesAndStructures_WorkingWithExistingClasses:

Working with Existing Classes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



.. when framework gives you a class and you are expected to subclass it... don't fight the frameworks (Cocoa programmers)

.. things with identity... connection to some external system (e.g. sinks, file handlers, network sockets, etc.)

.. delegate object (has identity and will be passed around but different things need to refer to same instance of object)

.. "a thing that has identity" a thing where you want the same instance of a type

.. ToDo: why value types make it easier to reason about code (mutation at a distance & local reasoning)

.. in much the same way that constants make it easier to reason about your code because it can't change,
.. using value type you don't have to worry about where far away changes might be coming from

.. these are some things you might make classes in other languages

.. in Swift, you don't need a class as often as you'd expect

.. when copying doesn't make sense 

.. when there really is just one of something














