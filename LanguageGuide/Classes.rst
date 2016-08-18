Classes
=======

:newTerm:`Classes` in Swift provide
the same functionality as structures
and more.
They can have
properties, methods, subscripts, initializers, and so on.

Unlike structures, classes can also:

* Inherit the characteristics of another class
* Have their instance type checked and interpreted at runtime through type casting
* Free up assigned resources using a deinitializer
* Have more than one reference to a class instance through reference counting

For more information, see
:doc:`Inheritance`,
:doc:`TypeCasting`,
:doc:`Deinitialization`,
and :doc:`AutomaticReferenceCounting`.

For an in-depth discussion of
when to use classes and
when to use structures,
see :doc:`ChoosingBetweenClassesAndStructures`.

.. _Classes_ClassSyntax:

Class Syntax
------------

You introduce a class with the ``class`` keyword and place its definition
within a pair of braces:

.. testcode:: classes

    -> class SomeClass {
           // class definition goes here
       }

Here is an example of a class definition:

.. testcode:: classes

    -> class Window {
           var width: Int
           var height: Int
           
           init(width: Int, height: Int) {
               self.width = width
               self.height = height
           }
       }

The example above defines a new class called ``Window`` 
to describe a graphical window.
This class has two variable stored properties
called ``width`` and ``height``.
These two properties are explicitly defined
to be of type ``Int`` and are set
to the integer values passed in to the initializer.

A class definition describes only
what an instance will look like.
It does not describe a specific instance.
To do that, you create an instance of the class.

To initialize a class,
as with a structure,
the simplest form of initializer syntax
uses the type name of the class
followed by empty parentheses:

.. testcode:: classes

    -> let someInstance = SomeClass()
    << // someInstance : SomeClass = REPL.SomeClass

However, you can use this initializer syntax
only if
all stored properties are set to initial values
in the class definition and
no custom initializers are defined.

Because the two stored properties belonging to ``Window``
are not set to initial values by default,
``Window`` needs a custom initializer
to be defined.

To initialize a class like ``Window``
with a custom initializer,
use the type name of the class
followed by any parameters needed
for initialization in parentheses:

.. testcode:: classes

    -> let someWindow = Window(width: 500, height: 300)
    << // someWindow : Window = REPL.Window

This creates a new instance of the ``Window`` class
and initializes its ``width`` to ``500`` and ``height`` to 300.

Class initialization is covered in more detail in :doc:`Initialization`.

.. _Classes_AccessingPropertiesOfClasses:

Accessing Properties of Classes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

As with structures, you can access and set the properties
of a class instance
using dot syntax:

.. testcode:: classes

    -> print("The width of the window is \(someWindow.width)")
    <- The width of the window is 500
    -> print("The height of the window is \(someWindow.height)")
    <- The height of the window is 300
    -> someWindow.width = 550
    -> print("The width of the window is now \(someWindow.width)")
    <- The width of the window is now 550


.. _Classes_ClassesAreReferenceTypes:

Classes Are Reference Types
---------------------------

A :newTerm:`reference type` is a type
whose instance is referenced rather than copied
when it is assigned
to a variable or constant,
or when it is passed
to a function.

Consider this example:

.. testcode:: classes

    -> let rootWindow = Window(width: 500, height: 300)
    << // rootWindow : Window = REPL.Window

This example declares a constant called ``rootWindow`` and
sets it to a new ``Window`` instance
with width ``500`` and height ``300``.

Next, a new variable called ``currentWindow`` is assigned ``rootWindow``:

.. testcode:: classes

    -> var currentWindow = rootWindow
    << // currentWindow : Window = REPL.Window
    -> currentWindow.width = 800

Because classes are reference types,
``rootWindow`` and ``currentWindow``
both refer to the *same* ``Window`` instance.
``rootWindow`` and ``currentWindow`` are effectively
two different names for the same instance.
As a result, changing the width of ``currentWindow``
changes the width of ``rootWindow``.

Checking the ``width`` property of ``rootWindow``
confirms that it changed to ``800``:

.. testcode:: classes

    -> print("The width of rootWindow is now \(rootWindow.width)")
    <- The width of rootWindow is now 800

.. note:: 
   ``rootWindow`` is declared as a *constant*,
   rather than a variable.
   However, you can still change
   the properties of ``rootWindow``
   such as ``rootWindow.width``.
   This is because the value
   of the ``rootWindow`` constant itself
   does not "store" the ``Window`` instance ---
   it *refers* to a ``Window`` instance.
   It is the ``width`` property
   of the underlying ``Window`` that is changed ---
   not the value of the constant reference to that ``Window``.

.. _Classes_ComparingReferenceTypesForIdentity:

Comparing Reference Types For Identity
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Because classes are reference types,
it is possible for multiple constants and variables
to refer to the same single instance of a class
behind the scenes.

As mentioned in :ref:`BasicOperators_ComparisonOperators`,
Swift provides two identity operators (``===`` and ``!==``)
that allow you to check
if two constants or variables
refer to the same instance of a class.

Here is an example
that uses the ``rootWindow`` and ``currentWindow`` instances from above
to show an identity operator in use:

.. testcode:: classes

    -> if currentWindow === rootWindow {
           print("rootWindow and currentWindow refer to the same Window instance")
       }
    <- rootWindow and currentWindow refer to the same Window instance

.. _Classes_WorkingWithPointers:

Working With Pointers
~~~~~~~~~~~~~~~~~~~~~

If you have experience with C, C++, or Objective-C,
you may know that these languages use :newTerm:`pointers`
to refer to addresses in memory.
A Swift constant or variable
that refers to an instance of some reference type
is similar to a pointer in C,
but is not a direct pointer to an address in memory,
and does not require you to write an asterisk (``*``)
to indicate that you are creating a reference.
Instead, these references are defined
like any other Swift constant or variable.

.. TODO: Add a brief comment on why this protection is a good thing

.. note:: 

    The Swift standard library provides utility types
    that enable you to work with memory pointers
    to reference types for interoperability
    with low-level C code.
    For more information,
    see [name of appropriate Swift type or types]
    in the Swift Standard Library Reference.

.. url for unsafe pointer doc: https://developer.apple.com/library/watchos/documentation/Swift/Reference/Swift_UnsafePointer_Structure/index.html#//apple_ref/swift/struct/s:SP