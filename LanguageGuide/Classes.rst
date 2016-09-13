Classes
=======

:newTerm:`Classes` in Swift provide
the same functionality as structures
and more.
They can have
properties, methods, subscripts, initializers, and so on.

Classes have additional capabilities that structures do not:

* Inheritance enables one class to inherit the characteristics of another.
* Type casting enables you to check and interpret the type of a class instance at runtime.
* Deinitializers enable an instance of a class to free up any resources it has assigned.
* Reference counting allows more than one reference to a class instance.

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
Because there is no natural default
to a window's width and height,
these two properties are explicitly defined
to be of type ``Int`` and are set
to the integer values passed in to the initializer.

To initialize a class,
as with a structure,
the simplest form of initializer syntax
uses the type name of the class
followed by empty parentheses:

.. testcode:: classes

    -> let someInstance = SomeClass()
    << // someInstance : SomeClass = REPL.SomeClass

However, you can use this initializer syntax
only if all stored properties are set to initial values
in the class definition and
no custom initializers are defined.

Unlike structures, classes do not have
a default memberwise initializer.
Instead, you define custom initializers
that provide the initialization logic you need.
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

Imagine an application that can have multiple windows open and
needs to keep track of the currently selected window.

Suppose there are two windows to keep track of:

.. testcode:: classes

    -> let windowOne = Window(width: 500, height: 300)
    << // windowOne : Window = REPL.Window
    -> let windowTwo = Window(width: 400, height: 400)
    << // windowTwo : Window = REPL.Window

This example declares two constants called ``windowOne`` and
``windowTwo`` and sets their ``width`` and ``height`` properties.

Next, a new variable called ``currentWindow`` is assigned ``windowOne``:

.. testcode:: classes

    -> var currentWindow = windowOne
    << // currentWindow : Window = REPL.Window
    -> currentWindow.width = 800

Because classes are reference types,
``windowOne`` and ``currentWindow``
both refer to the *same* ``Window`` instance.
``windowOne`` and ``currentWindow`` are effectively
two different names for the same instance.
As a result, changing the width of ``currentWindow``
changes the width of ``windowOne``.

Checking the ``width`` property of ``windowOne``
confirms that it changed to ``800``:

.. testcode:: classes

    -> print("The width of windowOne is now \(windowOne.width)")
    <- The width of windowOne is now 800

.. note:: 
   ``windowOne`` is declared as a *constant*,
   rather than a variable.
   However, you can still change
   the properties of ``windowOne``
   such as ``windowOne.width``.
   This is because the value
   of the ``windowOne`` constant itself
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
that uses the ``windowOne`` and ``currentWindow`` instances from above
to show an identity operator in use:

.. testcode:: classes

    -> if currentWindow === windowOne {
           print("windowOne and currentWindow refer to the same Window instance")
       }
    <- windowOne and currentWindow refer to the same Window instance

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