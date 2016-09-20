Classes
=======

:newTerm:`Classes` in Swift provide
the same functionality as structures
and more.
They can have
properties, methods, subscripts, initializers, and so on.
Just like with structures,
you use dot syntax to access and set
properties of class instances.

While classes are similar to structures in these ways,
classes have additional capabilities that structures do not:

* Inheritance enables one class to inherit the characteristics of another, as described in :doc:`Inheritance`.
* Type casting enables you to check and interpret the type of a class instance at runtime, as described in :doc:`TypeCasting`.
* Deinitializers enable an instance of a class to free up any resources it has assigned, as described in :doc:`Deinitialization`.
* Reference counting allows more than one reference to a class instance, as described in :doc:`AutomaticReferenceCounting`.

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
for a window's width and height,
these two properties are explicitly defined
to be of type ``Int`` and are set
to the integer values passed in to the initializer.

As with structures,
the simplest form of initializer syntax for classes
uses the type name of the class
followed by empty parentheses:

.. testcode:: classes

    -> let someInstance = SomeClass()
    << // someInstance : SomeClass = REPL.SomeClass

However, you can use this initializer syntax
only if you set all of the stored properties in your class
to initial values in the class definition.

Unlike structures, classes do not have
a default memberwise initializer.
Instead, you define custom initializers
that provide the initialization logic you need.
Because the two stored properties belonging to ``Window``
are not set to initial values by default,
``Window`` needs a custom initializer.

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

For more information on class initialization, see :doc:`Initialization`.

.. _Classes_ClassesAreReferenceTypes:

Classes Are Reference Types
---------------------------

Classes have different behavior from structures
because they are reference types ---
not value types.
For information on
when to use classes and
when to use structures,
see :doc:`ChoosingBetweenClassesAndStructures`.

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

Next, declare a new variable called ``currentWindow``
and set it equal to ``windowOne``:

.. testcode:: classes

    -> var currentWindow = windowOne
    << // currentWindow : Window = REPL.Window
    -> currentWindow.width = 800

Because classes are reference types,
``windowOne`` and ``currentWindow``
both refer to the *same* ``Window`` instance.
Another way of thinking about it is that
``windowOne`` and ``currentWindow`` are
two different names for the same instance.
As a result, changing the width of ``currentWindow``
changes the width of ``windowOne``.

Checking the ``width`` property of ``windowOne``
confirms that it changed to ``800``:

.. testcode:: classes

    -> print("The width of windowOne is now \(windowOne.width)")
    <- The width of windowOne is now 800
   
.. _Classes_ComparingReferenceTypesForIdentity:

Comparing Reference Types for Identity
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Because classes are reference types,
it is possible for multiple constants and variables
to refer to the same instance of a class
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

.. note:: 

   “Identical to” (represented by three equals signs, or ``===``)
   does not mean the same thing
   as “equal to” (represented by two equals signs, or ``==``).
   “Identical to” means that
   two constants or variables
   of class type refer
   to exactly the same class instance.
   “Equal to” means that
   two instances are considered “equal” or “equivalent” in value,
   for some appropriate meaning of “equal”,
   as defined by the type's designer.

.. _Classes_ConstantsAndReferenceTypes:

Constants and Reference Types
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

One of the fundamental characteristics
of reference semantics is that
it gives you more flexibility.
In the example above,
you may have noticed that
``windowOne`` is declared as a *constant*,
rather than a variable.
However, you can still change
the variable properties of ``windowOne``
such as ``windowOne.width``.
This is because the value
of the ``windowOne`` constant itself
does not store the ``Window`` instance ---
it *refers* to a ``Window`` instance.
It is the ``width`` property
of the underlying ``Window`` that is changed ---
not the value of the constant reference to that ``Window``.

Consider the following example: 

.. testcode:: classes

    -> class ExampleClass {
           let constant = 5
           var variable = 8
       }
    
    -> let classInstance = ExampleClass()
    << // classInstance : ExampleClass = REPL.ExampleClass
    -> classInstance.constant = 10 // Invalid, cannot mutate a constant
    !! <REPL Input>:1:24: error: cannot assign to property: 'constant' is a 'let' constant
    !! classInstance.constant = 10 // Invalid, cannot mutate a constant
    !! ~~~~~~~~~~~~~~~~~~~~~~ ^
    !! <REPL Input>:2:7: note: change 'let' to 'var' to make it mutable
    !! let constant = 5
    !! ^~~
    !! var
    -> classInstance.variable = 16
    -> classInstance = Window() // Invalid, classInstance is a constant 
    !! <REPL Input>:1:15: error: cannot assign to value: 'classInstance' is a 'let' constant
    !! classInstance = Window() // Invalid, classInstance is a constant
    !! ~~~~~~~~~~~~~ ^
    !! <REPL Input>:1:1: note: change 'let' to 'var' to make it mutable
    !! let classInstance = ExampleClass()
    !! ^~~
    !! var

Because ``classInstance`` is a class instance,
it refers to an ``ExampleClass`` instance
rather than storing it.
As a result,
it is valid to mutate the ``variable`` property
and invalid to mutate the ``constant`` property
of ``classInstance``.
Additionally,
you cannot reassign ``classInstance``
to a different class instance
because it is a constant reference.
This feature of being able to
change the underlying variable properties
of the same instance
is something unique you get
when working with classes.
By contrast,
changing the variable properties of a structure instance
gives you a whole new structure instance
instead of the same instance modified in place.

.. _Classes_WorkingWithPointers:

Working With Pointers
~~~~~~~~~~~~~~~~~~~~~

If you have experience with C, C++, or Objective-C,
you may know that these languages use pointers
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
    see `Interacting with Objective-C APIs  <//apple_ref/doc/uid/TP40014216-CH6>`_
    in `Using Swift with Cocoa and Objective-C <//apple_ref/doc/uid/TP40014216>`_.

.. url for unsafe pointer doc: https://developer.apple.com/library/content/documentation/Swift/Conceptual/BuildingCocoaApps/InteractingWithObjective-CAPIs.html#//apple_ref/doc/uid/TP40014216-CH4-ID35