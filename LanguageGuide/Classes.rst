Classes
=======

:newTerm:`Classes` in Swift provide much 
of the same functionality as structures,
albeit often at the expense
of the improved safety, readability and performance
that structures provide.

Like structures, classes can:

* Define properties to store values
* Define methods to provide functionality
* Define subscripts to provide access to their values using subscript syntax
* Define initializers to set up their initial state
* Be extended to expand their functionality beyond a default implementation
* Conform to protocols to [fill in]

For more information, see
:doc:`Properties`, :doc:`Methods`, :doc:`Subscripts`, :doc:`Initialization`,
:doc:`Extensions`, and :doc:`Protocols`.

Classes have additional functionality that structures do not:

* Inheritance enables one class to inherit the characteristics of another.
* Type casting enables you to check and interpret the type of a class instance at runtime.
* Deinitializers enable an instance of a class to free up any resources it has assigned.
* Reference counting allows more than one reference to a class instance.

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

For an in-depth discussion
of classes and structures and
when to use which,
see [chapter that has yet to be written]

.. _Classes_DefinitionSyntax:

Definition Syntax
-----------------

You introduce a class with the ``class`` keyword and place its definition
within a pair of braces:

.. testcode:: classes

    -> class someClass {
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

Class initialization is covered in more detail in :doc:`Initialization`

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

You can use dot syntax
to assign a new value
to a variable property:

.. testcode:: classes

    -> someWindow.width = 1024
    -> print("The width of the window is now \(someWindow.width)")
    <- The width of the window is now 1024

To show how you can use dot syntax
to access sub-properties,
consider the following addition
to the ``Window`` class:

.. testcode:: classesExpanded

    -> struct Point {
           var x = 0
           var y = 0
       }
    -> class Window {
           var origin = Point()
           
           var width = 0
           var height = 0
       }

In order to store the window's origin,
a structure called ``Point`` is created
with the stored variable properties ``x`` and ``y``.
The ``Window`` class is now initialized
with a new ``origin`` property
initialized to a ``Point`` structure instance.

You can access sub-properties,
such as the ``x`` and ``y`` properties
in the ``origin`` property of a ``Window``:

.. testcode:: classesExpanded

    -> let newWindow = Window()
    << // newWindow : Window = REPL.Window
    -> print("The origin of newWindow is (\(newWindow.origin.x), \(newWindow.origin.y))")
    <- The origin of newWindow is (0, 0)

.. note::

   Unlike Objective-C,
   Swift enables you to set sub-properties
   of a structure property directly.
   In the last example above,
   the ``width`` property of the ``resolution`` property
   of ``someVideoMode`` is set directly,
   without your needing to set
   the entire ``resolution`` property to a new value.

.. _Classes_ClassesAreReferenceTypes:

Classes Are Reference Types
---------------------------

A :newTerm:`reference type` is a type
whose instance is referenced rather than copied
when it is assigned
to a variable or constant,
or when it is passed
to a function.

Here is an example,
using the ``newWindow`` instance
of the ``Window`` class defined above:

.. testcode:: classesExpanded

    -> newWindow.width = 1024

This example sets the ``width`` property
of ``newWindow`` to ``1024``.

Next, a new constant called ``alsoNewWindow`` is assigned ``newWindow``:

.. testcode:: classesExpanded

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

.. testcode:: classesExpanded

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

.. _Classes_ComparingIdentitiesOfReferenceTypes:

Comparing Identities of Reference Types
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Because classes are reference types,
it is possible for multiple constants and variables
to refer to the same single instance of a class
behind the scenes.

Swift provides two identity operators
that allow you to check
if two constants or variables
refer to the exact same instance of a class:

* Identical to (``===``)
* Not identical to (``!==``)

Here is an example
that uses the ``newWindow`` and ``alsoNewWindow` instances from above
to show an identity operator in use:

.. testcode:: classesExpanded

    -> if newWindow === alsoNewWindow {
           print("newWindow and alsoNewWindow refer to the same Window instance")
       }
    <- newWindow and alsoNewWindow refer to the same Window instance

Note that “identical to” (represented by three equals signs, or ``===``)
does not mean the same thing
as “equal to” (represented by two equals signs, or ``==``):

* “Identical to” means that
  two constants or variables
  of class type refer
  to exactly the same class instance.
* “Equal to” means that
  two instances are considered “equal” or “equivalent” in value,
  for some appropriate meaning of “equal”,
  as defined by the type's designer.

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

While pointers are handled for you in Swift,
there are facilities to work with pointers.
It is still possible to get access
to places in memory,
but you do so at your own risk
as the compiler can no longer
ensure safety for you.

For information on unsafe pointers,
see [https://developer.apple.com/reference/swift/unsafepointer].