Classes
=======

:newTerm:`Classes` provide the same functionality as structures.

Like structures, classes can:

* Define properties to store values
* Define methods to provide functionality
* Define subscripts to provide access to their values using subscript syntax
* Define initializers to set up their initial state
* Be extended to provide added functionality
* Conform to protocols to [fill in]

For more information, see
:doc:`Properties`, :doc:`Methods`, :doc:`Subscripts`, :doc:`Initialization`,
:doc:`Extensions`, and :doc:`Protocols`.

Classes have additional functionality that structures do not.
Inheritance enables one class to inherit the characteristics of another.
Type casting enables you to check and interpret the type of a class instance at runtime.
Deinitializers enable an instance of a class to free up any resources it has assigned.
Reference counting allows more than one reference to a class instance.

For more information, see
:doc:`Inheritance`,
:doc:`TypeCasting`,
:doc:`Deinitialization`,
and :doc:`AutomaticReferenceCounting`.

.. note::

   While structures do not inherit from one another
   in the way that classes do,
   you can achieve similar inheritance behavior with structures
   by using protocols and protocol extensions.
   For information on protocols and protocol extensions,
   see :doc:`Protocols`.

For an in-depth discussion of
when to use classes and
when to use structures,
see :doc:`ChoosingBetweenClassesAndStructures`.

.. _Classes_DefinitionSyntax:

Definition Syntax
-----------------

You introduce a class with the ``class`` keyword and place its definition
within a pair of braces:

.. testcode:: classes

    -> class SomeClass {
           // class definition goes here
       }

Here is an example of a class definition:

.. testcode:: classes

    -> class Window {
           var width = 0
           var height = 0
       }

The example above defines a new class called ``Window`` 
to describe a graphical window.
This class has two variable stored properties
called ``width`` and ``height``.
These two properties are inferred to be of type ``Int``
by setting them to an initial integer value of ``0``.

.. _Classes_InitializationSyntax:

Initialization Syntax
---------------------

The ``Window`` class describes only
what a ``Window`` instance will look like.
It does not describe a specific ``Window`` instance.
To do that, you create an instance of the class.

The simplest form of initialization syntax for classes
uses the type name of the class
followed by empty parentheses:

.. testcode:: classes

    -> let someWindow = Window()
    << // someWindow : Window = REPL.Window

This creates a new instance of the ``Window`` class
and initializes its properties to their default values.

Class initialization is covered in more detail in :doc:`Initialization`.

.. _Classes_AccessingProperties:

Accessing Properties
--------------------

You can access the properties
of a class instance
using dot syntax:

.. testcode:: classes

    -> print("The width of the window is \(someWindow.width)")
    <- The width of the window is 0
    -> print("The height of the window is \(someWindow.height)")
    <- The height of the window is 0

In this example,
``someWindow.width`` and ``someWindow.height``
refer to the ``width`` and ``height`` properties 
of ``someWindow``,
and return their default initial value of ``0``.

As with structures,
you can use dot syntax
to assign a new value
to a variable property:

.. testcode:: classes

    -> someWindow.width = 1024
    -> print("The width of the window is now \(someWindow.width)")
    <- The width of the window is now 1024


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
    -> let rootWindow = Window()
    -> var currentWindow = Window()
    -> newWindow.width = 1024

This example sets the ``width`` property
of ``newWindow`` to ``1024``.

Next, a new constant called ``alsoNewWindow`` is assigned ``newWindow``:

.. testcode:: classes

    -> let alsoNewWindow = newWindow
    << // alsoNewWindow : Window = REPL.Window
    -> alsoNewWindow.width = 800

Because classes are reference types,
``newWindow`` and ``alsoNewWindow``
actually both refer to the *same* ``Window`` instance.
As a result, changing the width of ``alsoNewWindow``
changes the width of ``newWindow``.
``newWindow`` and ``alsoNewWindow`` are effectively
two different names for the same single instance.

Checking the ``width`` property of ``newWindow``
confirms that it changed to `800`:

.. testcode:: classes

    -> print("The width of newWindow is now \(newWindow.width)")
    <- The width of newWindow is now 800

Note that ``newWindow`` and ``alsoNewWindow``
are declared as *constants*,
rather than variables.
However, you can still change
the properties of ``newWindow`` and ``alsoNewWindow``
such as ``newWindow.width`` and ``alsoNewWindow.width``.
This is because the values
of the ``newWindow`` and ``alsoNewWindow`` constants themselves
do not "store" the ``Window`` instance ---
they both *refer* to a ``Window`` instance.
It is the ``width`` property
of the underlying ``Window`` that is changed ---
not the values of the constant references to that ``Window``.

.. _Classes_ComparingReferenceTypesForIdentity:

Comparing Reference Types For Identity
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Because classes are reference types,
it is possible for multiple constants and variables
to refer to the same single instance of a class
behind the scenes.

As mentioned in :ref:`BasicOperators_ComparisonOperators`
Swift provides two identity operators (=== and !===)
that allow you to check
if two constants or variables
refer to the exact same instance of a class.

Here is an example
that uses the ``newWindow`` and ``alsoNewWindow`` instances from above
to show an identity operator in use:

.. testcode:: classes

    -> if newWindow === alsoNewWindow {
           print("newWindow and alsoNewWindow refer to the same Window instance")
       }
    <- newWindow and alsoNewWindow refer to the same Window instance

When you define your own custom classes and structures,
it is your responsibility to decide
what qualifies as two instances being “equal”.
The process of defining your own implementations
of the “equal to” and “not equal to” operators
is described in :ref:`AdvancedOperators_EquivalenceOperators`.

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

    Swift’s Standard Library provides utility types
    that enable you to work with memory pointers
    to Swift reference types for interoperability
    with low-level C code.
    For more information,
    see [name of appropriate Swift type or types]
    in the Swift Standard Library Reference. 

.. url for unsafe pointer doc: https://developer.apple.com/library/watchos/documentation/Swift/Reference/Swift_UnsafePointer_Structure/index.html#//apple_ref/swift/struct/s:SP