Classes and Structures
======================

:newTerm:`Classes` and :newTerm:`structures` are general-purpose,
flexible constructs that become the building blocks of your program's code.
You define properties and methods to add functionality to your classes and structures,
using exactly the same syntax as for constants, variables, and functions.

Unlike other programming languages,
Swift does not require you to create separate interface and implementation files
for custom classes and structures.
In Swift, you define a class or a structure in a single file,
and the external interface to that class or structure is
automatically made available for other code to use.

.. note::

   An instance of a *class* is traditionally known as an :newTerm:`object`.
   However, Swift classes and structures
   are much closer in functionality than in other languages,
   and much of this chapter describes functionality that can apply to
   instances of *either* a class or a structure type.
   Because of this, the more general term :newTerm:`instance` is used.

.. TODO: add a note here about public and private interfaces,
   once we know how these will be declared in Swift.

.. _ClassesAndStructures_ComparingClassesAndStructures:

Comparing Classes and Structures
--------------------------------

Classes and structures in Swift have many things in common.
Both can:

* Define properties to store values
* Define methods to provide functionality
* Define subscripts to provide access to their values using subscript syntax
* Define initializers to set up their initial state
* Be extended to expand their functionality beyond a default implementation
* Conform to protocols to provide standard functionality of a certain kind

For more information, see
:doc:`Properties`, :doc:`Methods`, :doc:`Subscripts`, :doc:`Initialization`,
:doc:`Extensions`, and :doc:`Protocols`.

Classes have additional capabilities that structures do not:

* Inheritance enables one class to inherit the characteristics of another.
* Type casting enables you to check and interpret the type of a class instance at runtime.
* Deinitializers enable an instance of a class to free up any resources it has assigned.
* Reference counting allows more than one reference to a class instance.

For more information, see
:doc:`Inheritance`, :doc:`TypeCasting`, and :doc:`Initialization`.

.. note::

   Structures are always copied when they are passed around in your code,
   and do not use reference counting.

.. _ClassesAndStructures_DefinitionSyntax:

Definition Syntax
~~~~~~~~~~~~~~~~~

Classes and structures have a similar definition syntax.
You introduce classes with the ``class`` keyword
and structures with the ``struct`` keyword.
Both place their entire definition within a pair of braces:

.. testcode:: ClassesAndStructures

   -> class SomeClass {
         // class definition goes here
      }
   -> struct SomeStructure {
         // structure definition goes here
      }

.. note::

   Whenever you define a new class or structure,
   you effectively define a brand new Swift type.
   Give types ``UpperCamelCase`` names
   (such as ``SomeClass`` and ``SomeStructure`` here)
   to match the capitalization of standard Swift types
   (such as ``String``, ``Int``, and ``Bool``).
   Conversely, always give properties and methods ``lowerCamelCase`` names
   (such as ``frameRate`` and ``incrementCount``)
   to differentiate them from type names.

Here's an example of a structure definition and a class definition:

.. testcode:: ClassesAndStructures

   -> struct Resolution {
         var width = 0
         var height = 0
      }
   -> class VideoMode {
         var resolution = Resolution()
         var interlaced = false
         var frameRate = 0.0
         var name: String?
      }

The example above defines a new structure called ``Resolution``,
to describe a pixel-based display resolution.
This structure has two stored properties called ``width`` and ``height``.
Stored properties are constants or variables that are bundled up and stored
as part of the class or structure.
These two properties are inferred to be of type ``Int``
by setting them to an initial integer value of ``0``.

The example above also defines a new class called ``VideoMode``,
to describe a specific video mode for video display.
This class has four variable stored properties.
The first, ``resolution``, is initialized with a new ``Resolution`` structure instance,
which infers a property type of ``Resolution``.
For the other three properties,
new ``VideoMode`` instances will be initialized with
an ``interlaced`` setting of ``false`` (meaning “non-interlaced video”),
a playback frame rate of ``0.0``,
and an optional ``String`` value called ``name``.
The ``name`` property is automatically given a default value of ``nil``,
or “no ``name`` value”, because it is of an optional type.

.. _ClassesAndStructures_ClassAndStructureInstances:

Class and Structure Instances
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The ``Resolution`` structure definition and the ``VideoMode`` class definition
only describe what a ``Resolution`` or ``VideoMode`` will look like.
They themselves do not describe a specific resolution or video mode.
To do that, you need to create an instance of the structure or class.

.. QUESTION: this isn't strictly true.
   You could argue that the Resolution structure definition describes a resolution of (0, 0),
   not that this would be a valid resolution.

The syntax for creating instances is very similar for both structures and classes:

.. testcode:: ClassesAndStructures

   -> let someResolution = Resolution()
   << // someResolution : Resolution = V4REPL10Resolution (has 2 children)
   -> let someVideoMode = VideoMode()
   << // someVideoMode : VideoMode = C4REPL9VideoMode (has 4 children)

Structures and classes both use initializer syntax for new instances.
The simplest form of initializer syntax uses the type name of the class or structure
followed by empty parentheses, such as ``Resolution()`` or ``VideoMode()``.
This creates a new instance of the class or structure,
with any properties initialized to their default values.
Class and structure initialization is described in more detail
in :doc:`Initialization`.

.. TODO: add more detail about inferring a variable's type when using initializer syntax.
.. TODO: note that you can only use the default constructor if you provide default values
   for all properties on a structure or class.

.. _ClassesAndStructures_AccessingProperties:

Accessing Properties
~~~~~~~~~~~~~~~~~~~~

You can access the properties of an instance using :newTerm:`dot syntax`.
In dot syntax, you write the property name immediately after the instance name,
separated by a period (``.``), without any spaces:

.. testcode:: ClassesAndStructures

   -> println("The width of someResolution is \(someResolution.width)")
   <- The width of someResolution is 0

In this example,
``someResolution.width`` refers to the ``width`` property of ``someResolution``,
and returns its default initial value of ``0``.

You can drill down into sub-properties,
such as the ``width`` property in the ``resolution`` property of a ``VideoMode``:

.. testcode:: ClassesAndStructures

   -> println("The width of someVideoMode is \(someVideoMode.resolution.width)")
   <- The width of someVideoMode is 0

You can also use dot syntax to assign a new value to a variable property:

.. testcode:: ClassesAndStructures

   -> someVideoMode.resolution.width = 1280
   -> println("The width of someVideoMode is now \(someVideoMode.resolution.width)")
   <- The width of someVideoMode is now 1280

.. note::

   Unlike Objective-C,
   Swift enables you to set sub-properties of properties directly.
   In the last example above,
   the ``width`` property of the ``resolution`` property of ``someVideoMode`` is set directly,
   without needing to set the entire ``resolution`` property to a new value.

.. _ClassesAndStructures_MemberwiseInitializersForStructureTypes:

Memberwise Initializers for Structure Types
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

All structures have an automatically-generated :newTerm:`memberwise initializer`,
which you can use to initialize the member properties of new structure instances.
Initial values for the properties of the new instance
can be passed to the memberwise initializer by name:

.. testcode:: ClassesAndStructures

   -> let vga = Resolution(width: 640, height: 480)
   << // vga : Resolution = V4REPL10Resolution (has 2 children)

Unlike structures, class instances do not receive a default memberwise initializer.
Initializers are described in more detail in :doc:`Initialization`.

.. FIXME: The current plan is to introduce a memberwise initializer for classes too,
   as described in rdar://16704095.
   We hope to have this by WWDC, and this section will need updating if this lands.

.. _ClassesAndStructures_StructuresAndEnumerationsAreValueTypes:

Structures and Enumerations Are Value Types
-------------------------------------------

A :newTerm:`value type` is a type that is *copied*
when it is assigned to a variable or constant,
or when it is passed to a function.

You've actually been using value types extensively throughout the previous chapters.
In fact, all of the basic types in Swift ---
integers, floating-point numbers, Booleans, strings, arrays and dictionaries ---
are value types, and are implemented as structures behind the scenes.

All structures and enumerations are value types in Swift.
This means that any structure and enumeration instances you create ---
and any value types they have as properties ---
are always copied when they are passed around in your code.

Consider this example, which uses the ``Resolution`` structure from the previous example:

.. testcode:: ClassesAndStructures

   -> let hd = Resolution(width: 1920, height: 1080)
   << // hd : Resolution = V4REPL10Resolution (has 2 children)
   -> var cinema = hd
   << // cinema : Resolution = V4REPL10Resolution (has 2 children)

This example declares a constant called ``hd``
and sets it to a ``Resolution`` instance initialized with
the width and height of full HD video
(``1920`` pixels wide by ``1080`` pixels high).

It then declares a variable called ``cinema``
and sets it to the current value of ``hd``.
Because ``Resolution`` is a structure,
a *copy* of the existing instance is made,
and this new copy is assigned to ``cinema``.
Even though ``hd`` and ``cinema`` now have the same width and height,
they are two completely different instances behind the scenes.

Next, the ``width`` property of ``cinema`` is amended to be
the width of the slightly-wider 2K standard used for digital cinema projection
(``2048`` pixels wide and ``1080`` pixels high):

.. testcode:: ClassesAndStructures

   -> cinema.width = 2048

Checking the ``width`` property of ``cinema``
shows that it has indeed changed to be ``2048``:

.. testcode:: ClassesAndStructures

   -> println("cinema is now \(cinema.width) pixels wide")
   <- cinema is now 2048 pixels wide

However, the ``width`` property of the original ``hd`` instance
still has the old value of ``1920``:

.. testcode:: ClassesAndStructures

   -> println("hd is still \(hd.width) pixels wide")
   <- hd is still 1920 pixels wide

When ``cinema`` was given the current value of ``hd``,
the *values* stored in ``hd`` were copied into the new ``cinema`` instance.
The end result is two completely separate instances,
which just happened to contain the same numeric values.
Because they are separate instances,
setting the width of ``cinema`` to ``2048``
doesn't affect the width stored in ``hd``.

The same behavior applies to enumerations:

.. testcode:: ClassesAndStructures

   -> enum CompassPoint {
         case North, South, East, West
      }
   -> var currentDirection = CompassPoint.West
   << // currentDirection : CompassPoint = <opaque>
   -> let rememberedDirection = currentDirection
   << // rememberedDirection : CompassPoint = <opaque>
   -> currentDirection = .East
   -> if rememberedDirection == .West {
         println("The remembered direction is still .West")
      }
   <- The remembered direction is still .West

When ``rememberedDirection`` is assigned the value of ``currentDirection``,
it is actually set to a copy of that value.
Changing the value of ``currentDirection`` thereafter does not affect
the copy of the original value that was stored in ``rememberedDirection``.

.. TODO: Should I give an example of passing a value type to a function here?

.. _ClassesAndStructures_ClassesAreReferenceTypes:

Classes Are Reference Types
---------------------------

Unlike value types, :newTerm:`reference types` are *not* copied
when they are assigned to a variable or constant,
or when they are passed to a function.
Rather than a copy, a reference to the same existing instance is used instead.

Here's an example, using the ``VideoMode`` class defined above:

.. testcode:: ClassesAndStructures

   -> let tenEighty = VideoMode()
   << // tenEighty : VideoMode = C4REPL9VideoMode (has 4 children)
   -> tenEighty.resolution = hd
   -> tenEighty.interlaced = true
   -> tenEighty.name = "1080i"
   -> tenEighty.frameRate = 25.0

This example declares a new constant called ``tenEighty``
and sets it to refer to a new instance of the ``VideoMode`` class.
The video mode is assigned a copy of the HD resolution of ``1920`` by ``1080`` from before.
It is set to be interlaced, and is given a name of ``"1080i"``.
Finally, it is set to a frame rate of ``25.0`` frames per second.

Next, ``tenEighty`` is assigned to a new constant, called ``alsoTenEighty``,
and the frame rate of ``alsoTenEighty`` is modified:

.. testcode:: ClassesAndStructures

   -> let alsoTenEighty = tenEighty
   << // alsoTenEighty : VideoMode = C4REPL9VideoMode (has 4 children)
   -> alsoTenEighty.frameRate = 30.0

Because classes are reference types,
``tenEighty`` and ``alsoTenEighty`` actually both refer to the *same* ``VideoMode`` instance.
Effectively, they are just two different names for the same single instance.

Checking the ``frameRate`` property of ``tenEighty``
shows that it correctly reports the new frame rate of ``30.0``
from the underlying ``VideoMode`` instance:

.. testcode:: ClassesAndStructures

   -> println("The frameRate property of tenEighty is now \(tenEighty.frameRate)")
   <- The frameRate property of tenEighty is now 30.0

Note that ``tenEighty`` and ``alsoTenEighty`` are declared as *constants*,
rather than variables.
However, you can still change ``tenEighty.frameRate`` and ``alsoTenEighty.frameRate`` because
the values of the ``tenEighty`` and ``alsoTenEighty`` constants themselves do not actually change.
``tenEighty`` and ``alsoTenEighty`` themselves do not “store” the ``VideoMode`` instance ---
instead, they both *refer* to a ``VideoMode`` instance behind the scenes.
It is the ``frameRate`` property of the underlying ``VideoMode`` that is changed,
not the values of the constant references to that ``VideoMode``.

.. TODO: reiterate here that arrays and dictionaries are value types rather than reference types,
   and demonstrate what that means for the values they store
   when they themselves are value types or reference types.
   Also make a note about what this means for key copying,
   as per the swift-discuss email thread "Dictionaries and key copying"
   started by Alex Migicovsky on Mar 1 2014.

.. _ClassesAndStructures_IdentityOperators:

Identity Operators
~~~~~~~~~~~~~~~~~~

Because classes are reference types,
it is possible for multiple constants and variables to refer to
the same single instance of a class behind the scenes.
(The same is not true for structures and enumerations,
because they are value types
and are always copied when they are assigned to a constant or variable,
or passed to a function.)

It can sometimes be useful to find out if two constants or variables refer to
exactly the same instance of a class.
To enable this, Swift provides two identity operators:

* Identical to (``===``)
* Not identical to (``!==``)

Use these operators to check whether two constants or variables refer to the same single instance:

.. testcode:: ClassesAndStructures

   -> if tenEighty === alsoTenEighty {
         println("tenEighty and alsoTenEighty refer to the same Resolution instance.")
      }
   <- tenEighty and alsoTenEighty refer to the same Resolution instance.

Note that “identical to” (represented by three equals signs, or ``===``)
does not mean the same thing as “equal to” (represented by two equals signs, or ``==``):

* “Identical to” means that
  two constants or variables of class type refer to exactly the same class instance.
* “Equal to” means that
  two instances are considered “equal” or “equivalent” in value,
  for some appropriate meaning of “equal”, as defined by the type's designer.

When you define your own custom classes and structures,
it is your responsibility to decide what qualifies as two instances being “equal”.
The process of defining your own implementations of the “equal to” and “not equal to” operators
is described in :ref:`AdvancedOperators_EquivalenceOperators`.

.. TODO: This needs clarifying with regards to function references.

.. _ClassesAndStructures_Pointers:

Pointers
~~~~~~~~

If you have experience with C, C++, or Objective-C,
you may know that these languages use :newTerm:`pointers` to refer to addresses in memory.
A Swift constant or variable that refers to an instance of some reference type
is similar to a pointer in C,
but is not a direct pointer to an address in memory,
and does not require you to write an asterisk (``*``)
to indicate that you are creating a reference.
Instead, these references are defined like any other constant or variable in Swift.

.. TODO: functions aren't "instances". This needs clarifying.

.. TODO: Add a justification here to say why this is a good thing.

.. _ClassesAndStructures_ChoosingBetweenClassesAndStructures:

Choosing Between Classes and Structures
---------------------------------------

You can use both classes and structures to define custom data types to use as
the building blocks of your program's code.

However, structure instances are always passed by *value*,
and class instances are always passed by *reference*.
This means that they are suited to different kinds of tasks.
As you consider the data constructs and functionality that you need for a project,
decide whether each data construct should be defined as a class or as a structure.

As a general guideline, consider creating a structure when
one or more of these conditions apply:

* The structure's primary purpose is to encapsulate a few relatively simple data values.
* It is reasonable to expect that the encapsulated values will be copied rather than referenced
  when you assign or pass around an instance of that structure.
* Any properties stored by the structure are themselves value types,
  which would also be expected to be copied rather than referenced.
* The structure does not need to inherit properties or behavior from another existing type.

Examples of good candidates for structures include:

* The size of a geometric shape,
  perhaps encapsulating a ``width`` property and a ``height`` property,
  both of type ``Double``.
* A way to refer to ranges within a series,
  perhaps encapsulating a ``start`` property and a ``length`` property,
  both of type ``Int``.
* A point in a 3D coordinate system,
  perhaps encapsulating ``x``, ``y`` and ``z`` properties, each of type ``Double``.

In all other cases, define a class, and create instances of that class
to be managed and passed by reference.
In practice, this means that most custom data constructs should be classes,
not structures.

.. QUESTION: what's the deal with tuples and reference types / value types?

.. TODO: Tim has suggested using Window as a good example here ---
   its location is a structure, but it doesn't make sense for Window
   to be a value type, as it is not copied when passed around.

.. _ClassesAndStructures_AssignmentAndCopyBehaviorForCollectionTypes:

Assignment and Copy Behavior for Collection Types
-------------------------------------------------

Swift's ``Array`` and ``Dictionary`` types are implemented as structures.
However, arrays have slightly different behavior to dictionaries and other structures
when they are assigned to a constant or variable,
or when they are passed to a function or method.

.. _ClassesAndStructures_AssignmentAndCopyBehaviorForDictionaries:

Assignment and Copy Behavior for Dictionaries
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Whenever you assign a ``Dictionary`` instance to a constant or variable,
or pass a ``Dictionary`` instance as an argument to a function or method call,
the dictionary is *copied* at the point that
the assignment or call takes place,
as described above in :ref:`ClassesAndStructures_StructuresAndEnumerationsAreValueTypes`.

If the keys and/or values stored in the ``Dictionary`` instance are value types
(that is, structures or enumerations),
they too are copied when the assignment or call takes place.
Conversely, if the keys and/or values are reference types
(that is, classes or functions),
the references are copied, but not the class instances or functions that they refer to.
This behavior is the same as when stored properties on other value types are copied,
and is known as a :newTerm:`shallow copy` of the dictionary.

.. note::

   The behavior described above is different from the behavior of ``NSDictionary``,
   which assigns and passes around a dictionary
   as a reference to a single ``NSDictionary`` instance,
   rather than making a copy.

The example below defines a dictionary called ``ages``,
which stores the names and ages of four people.
The ``ages`` dictionary is then assigned to a new variable called ``copiedAges``,
and is copied when this assignment takes place.
After the assignment, ``ages`` and ``copiedAges`` are two separate dictionaries.

.. testcode:: assignmentAndCopyForDictionaries

   -> var ages = ["Peter": 23, "Wei": 35, "Anish": 65, "Katya": 19]
   << // ages : Dictionary<String, Int> = ["Anish": 65, "Wei": 35, "Peter": 23, "Katya": 19]
   -> var copiedAges = ages
   << // copiedAges : Dictionary<String, Int> = ["Anish": 65, "Wei": 35, "Peter": 23, "Katya": 19]

The keys for this dictionary are of type ``String``,
and the values are of type ``Int``.
Both of these types are value types in Swift,
and so the keys and values are also copied when the dictionary copy takes place.

You can prove that the ``ages`` dictionary has been copied
by changing an age value in one of the dictionaries
and checking the corresponding value in the other.
If you set the value for ``"Peter"`` in the ``copiedAges`` dictionary to ``24``,
the ``ages`` dictionary still returns the old value of ``23``
from before the copy took place:

.. testcode:: assignmentAndCopyForDictionaries

   -> copiedAges["Peter"] = 24
   -> println(ages["Peter"])
   <- 23

.. _ClassesAndStructures_AssignmentAndCopyBehaviorForArrays:

Assignment and Copy Behavior for Arrays
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The assignment and copy behavior for Swift's ``Array`` type
is more complex than for its ``Dictionary`` type.
This enables ``Array`` to provide C-like performance when working with an array's contents,
and to copy an array's contents only when copying is necessary.

If you assign an ``Array`` instance to a constant or variable,
or pass an ``Array`` instance as an argument to a function or method call,
the contents of the array are *not* copied at the point that
the assignment or call takes place.
This is different from the behavior of ``Dictionary`` described above,
which is always copied.

For arrays, copying only takes place when you perform an action
that has the potential to modify the *length* of the array.
This includes appending, inserting, or removing items,
or using a ranged subscript to replace a range of items in the array.
If and when array copying does take place,
the copy behavior for an array's contents is the same shallow copy as for
a dictionary's keys and values,
as described in :ref:`ClassesAndStructures_AssignmentAndCopyBehaviorForDictionaries`.

.. note::

   The behavior described above is different from the behavior of ``NSArray``,
   which assigns and passes around an array
   as a reference to a single ``NSArray`` instance,
   rather than making a copy.

The example below assigns a new array of ``Int`` values to a variable called ``a``.
This array is also assigned to two further variables called ``b`` and ``c``:

.. testcode:: assignmentAndCopyForArrays

   -> var a = [1, 2, 3]
   << // a : Array<Int> = [1, 2, 3]
   -> var b = a
   << // b : Array<Int> = [1, 2, 3]
   -> var c = a
   << // c : Array<Int> = [1, 2, 3]

You can retrieve the first value in the array with subscript syntax
on either ``a``, ``b``, or ``c``:

.. testcode:: assignmentAndCopyForArrays

   -> println(a[0])
   </ 1
   -> println(b[0])
   </ 1
   -> println(c[0])
   </ 1

If you set an item in the array to a new value with subscript syntax,
all three of ``a``, ``b``, and ``c`` will return the new value.
Note that the array is not copied when you set a new value with subscript syntax,
because setting a single value with subscript syntax
does not have the potential to change the array's length:

.. testcode:: assignmentAndCopyForArrays

   -> a[0] = 42
   -> println(a[0])
   </ 42
   -> println(b[0])
   </ 42
   -> println(c[0])
   </ 42

However, if you append a new item to ``a``, you *do* modify the array's length.
This prompts Swift to create a new copy of the array
at the point that you append the new value.
Henceforth, ``a`` is a separate, independent copy of the array.

If you change a value in ``a`` after the copy is made,
``a`` will return a different value from ``b`` and ``c``,
which both still reference the original array contents from before the copy took place:

.. testcode:: assignmentAndCopyForArrays

   -> a.append(4)
   -> a[0] = 777
   -> println(a[0])
   </ 777
   -> println(b[0])
   </ 42
   -> println(c[0])
   </ 42

.. _ClassesAndStructures_EnsuringThatAnArrayIsUnique:

Ensuring that an Array is Unique
________________________________

It can sometimes be useful to ensure that you have a unique copy of an array
before performing an action on that array's contents,
or before passing that array to a function or method.
You ensure the uniqueness of an array reference by calling the array's ``unshare`` method.

If multiple constants or variables currently refer to the same array,
and you call the ``unshare`` method on one of those constants or variables,
the array is copied,
so that the constant or variable has its own independent copy of the array.
However, no copying takes place if the constant or variable
is already the only reference to the array.

At the end of the previous example,
``b`` and ``c`` both reference the same array.
Call the ``unshare`` method on ``b`` to make it become a unique copy:

.. testcode:: assignmentAndCopyForArrays

   -> b.unshare()

If you change the first value in ``b`` after calling the ``unshare`` method,
all three arrays will now report a different value:

.. testcode:: assignmentAndCopyForArrays

   -> b[0] = -105
   -> println(a[0])
   </ 777
   -> println(b[0])
   </ -105
   -> println(c[0])
   </ 42

.. _ClassesAndStructures_CheckingWhetherTwoArraysShareTheSameStorage:

Checking Whether Two Arrays Share the Same Storage
__________________________________________________

You can check whether two constants or variables share the same array storage
by comparing them with the identity operators,
as described in :ref:`ClassesAndStructures_IdentityOperators`.
The example below uses the “identical to” operator (``===``)
to check whether ``b`` and ``c`` still refer to the same array:

.. testcode:: assignmentAndCopyForArrays

   -> if b === c {
         println("b and c still refer to the same array.")
      } else {
         println("b and c now refer to two independent arrays.")
      }
   <- b and c now refer to two independent arrays.

.. _ClassesAndStructures_ForcingACopyOfAnArray:

Forcing a Copy of an Array
__________________________

You can force an explicit copy of an array
by calling the array's ``copy`` method.
This method performs a shallow copy of the array
and returns a new array containing the copied items.

The example below defines an array called ``names``,
which stores the names of seven people.
A new variable called ``copiedNames`` is set to the result of calling
the ``copy`` method on the ``names`` array:

.. testcode:: assignmentAndCopyForArrays

   -> var names = ["Mohsen", "Hilary", "Justyn", "Amy", "Rich", "Graham", "Vic"]
   << // names : Array<String> = ["Mohsen", "Hilary", "Justyn", "Amy", "Rich", "Graham", "Vic"]
   -> var copiedNames = names.copy()
   << // copiedNames : Array<String> = ["Mohsen", "Hilary", "Justyn", "Amy", "Rich", "Graham", "Vic"]

You can prove that the ``names`` array has been copied
by changing an item in one of the arrays
and checking the corresponding item in the other.
If you set the first item in the ``copiedNames`` array
to ``"Mo"`` rather than ``"Mohsen"``,
the ``names`` array still returns the old value of ``"Mohsen"``
from before the copy took place:

.. testcode:: assignmentAndCopyForArrays

   -> copiedNames[0] = "Mo"
   -> println(names[0])
   <- Mohsen

.. note::

   If you just need to be sure that your reference to an array's contents
   is the only reference in existence,
   always call the ``unshare`` method, not the ``copy`` method.
   The ``unshare`` method does not make a copy of the array
   unless it is necessary to do so.
   The ``copy`` method always copies the array,
   even if it is already unique.