.. docnote:: Subjects to be covered in this section

   * Classes
   * Objects
   * Structures
   * Instance variables
   * Getters and setters
   * willSet / didSet
   * Constructors and destructors
   * Designated initializers
   * Instance and class methods
   * Working with self and Self
   * Super
   * Memory management via ARC
   * UnsafePointer?
   * Cast operators (?, !, b as D, b is D)
   * Type inference and discovery?
   * "Everything is a type"
   * Stored vs computed properties
   * === vs ==
   * “is” to check for class membership
   * “as” for casting
   * No “self = [super init]” (assignment equates to void)
   * @inout
   * value types and reference types
   * Type functions and variables
   * Nested classes and structures
   * Bound functions
   * @conversion functions for converting between types
   * Subscript getters and setters

Classes and Structures
======================

Enumerations, as introduced in the previous chapter,
give a way to define your own custom types to work with lists of values.
Enumerations are particularly suited to representing a fixed set of values of a similar type.

Swift provides two additional ways to define custom data types.
These are known as :newTerm:`classes` and :newTerm:`structures`,
and can be used to create general-purpose, flexible constructs
to use as the building blocks of your program's code.

Classes and structures have many things in common in Swift.
Both can:

* declare :newTerm:`properties` to store values
  (as described in :doc:`Properties`)
* define :newTerm:`methods` to provide functionality
  (as described in :doc:`Methods`)
* define :newTerm:`subscripts` to provide access to their values using subscript syntax
  (as described in :doc:`Subscripts`)
* define :newTerm:`initializers` to set up their initial state
  (as described in :doc:`Initialization`)
* be :newTerm:`extended` to expand their functionality beyond a default implementation
  (as described in :doc:`Extensions`)
* conform to :newTerm:`protocols` to provide standard functionality of a certain type
  (as described in :doc:`Protocols`)

In addition, classes have several capabilities that structures and enumerations do not:

* :newTerm:`inheritance`, which enables one class to inherit the characteristics of another
  (as described in :doc:`Inheritance`)
* :newTerm:`type casting`, which enables you to check and interpret the type of a class instance at runtime
  (as described in :doc:`Inheritance`)
* :newTerm:`deinitializers`, which enable an instance of a class to clean up after itself
  (as described in :doc:`Initialization`)

.. _ClassesAndStructures_DefiningClassesAndStructures:

Defining Classes and Structures
-------------------------------

Unlike other programming languages,
Swift does not require you to create separate interface and implementation files
for your custom types.
In Swift, you define a class or a structure in a single file,
and the external interface to that class or structure is
automatically made available for other code to use.

.. TODO: add a note here about public and private interfaces,
   once we know how these will be declared in Swift.

.. _ClassesAndStructures_DefinitionSyntax:

Definition Syntax
~~~~~~~~~~~~~~~~~

Classes and structures have a very similar definition syntax.
Classes are introduced by the ``class`` keyword,
and structures are introduced by the ``struct`` keyword.
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
   you are effectively defining a brand new Swift type.
   Types should be given ``UpperCamelCase`` names
   (such as ``SomeClass`` and ``SomeStructure`` here),
   to match the capitalization of standard Swift types
   (such as ``String``, ``Int``, and ``Bool``).
   Named values, functions, and methods should always be given
   ``lowerCamelCase`` names
   (such as ``allowedEntry`` and ``contentHeight``)
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
         var name: String? = .None
      }

The example above defines a new structure called ``Resolution``,
to describe a pixel-based display resolution.
This structure has two :newTerm:`variable stored properties` called ``width`` and ``height``.
Stored properties are named values that are bundled up and stored
as part of the class or structure,
and are described in detail in :doc:`Properties`.
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
and an optional ``String`` value called ``name``,
which has a default value of ``.None``, or “no ``name`` value”.

.. _ClassesAndStructures_ClassAndStructureInstances:

Class and Structure Instances
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The ``Resolution`` structure definition, and the ``VideoMode`` class definition,
only describe what a ``Resolution`` or ``VideoMode`` will look like.
They do not in themselves describe a specific resolution or video mode.
To do that, you need to create an :newTerm:`instance` of the structure or class.

.. QUESTION: this isn't strictly true.
   You could argue that the Resolution structure definition describes a resolution of (0, 0),
   not that this would be a valid resolution.

The syntax for creating instances is very similar for both structures and classes:

.. testcode:: ClassesAndStructures

   -> let someResolution = Resolution()
   << // someResolution : Resolution = Resolution(0, 0)
   -> let someVideoMode = VideoMode()
   << // someVideoMode : VideoMode = <VideoMode instance>

Structures and classes both use :newTerm:`initializer syntax` when creating new instances.
The simplest form of initializer syntax uses the type name of the class or structure
followed by empty parentheses, such as ``Resolution()`` or ``VideoMode()``.
This creates a new instance of the class or structure,
with any properties initialized to their default values.
(Class and structure initialization is described in more detail
in :doc:`Initialization`.)

.. TODO: add more detail about inferring a variable's type when using initializer syntax.
.. TODO: note that you can only use the default constructor if you provide default values
   for all properties on a structure or class.

.. _ClassesAndStructures_Terminology:

Terminology
___________

An instance of a *class* (such as ``someVideoMode`` above)
is traditionally known as an :newTerm:`object`.
However, Swift classes and structures are much closer in functionality than in other languages,
and much of this chapter describes functionality that can apply to
instances of *either* a class or a structure type.
Because of this, the more general term :newTerm:`instance` is used below.

.. _ClassesAndStructures_AccessingProperties:

Accessing Properties
~~~~~~~~~~~~~~~~~~~~

The properties of an instance can be accessed using :newTerm:`dot syntax`:

.. testcode:: ClassesAndStructures

   -> println("The width of someResolution is \(someResolution.width)")
   <- The width of someResolution is 0

``someResolution.width`` refers to the ``width`` property of ``someResolution``,
and returns its default initial value of ``0``.

Dot syntax can be used to drill down into sub-properties,
such as the ``width`` property in the ``resolution`` property of a ``VideoMode``:

.. testcode:: ClassesAndStructures

   -> println("The width of someVideoMode is \(someVideoMode.resolution.width)")
   <- The width of someVideoMode is 0

Dot syntax can also be used to assign a new value to a variable property:

.. testcode:: ClassesAndStructures

   -> someVideoMode.resolution.width = 1280
   -> println("The width of someVideoMode is now \(someVideoMode.resolution.width)")
   <- The width of someVideoMode is now 1280

.. _ClassesAndStructures_MemberwiseStructureInitializers:

Memberwise Structure Initializers
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. HACK: this is currently duplicated in Initialization.

All structures have an automatically-generated :newTerm:`memberwise initializer`,
which can be used to initialise the member properties of new structure instances.
Initial values for the properties of the new instance
can be passed to the memberwise initializer by name:

.. testcode:: ClassesAndStructures

   -> let vga = Resolution(width: 640, height: 480)
   << // vga : Resolution = Resolution(640, 480)

Initial values can also be provided without names,
if they are listed in the same order that the properties are declared in the structure's definition:

.. testcode:: ClassesAndStructures

   -> let svga = Resolution(800, 600)
   << // svga : Resolution = Resolution(800, 600)

.. TODO: Include a justifiable reason for why classes do not provide a memberwise initializer.
.. TODO: According to rdar://15670604, we may end up with one for classes as well.
   However, I can't find a Radar tracking this directly.

Unlike structures, class instances do not receive a default memberwise initializer.
(Initializers are described in more detail in :doc:`Initialization`.)

.. _ClassesAndStructures_ValueTypesAndReferenceTypes:

Value Types and Reference Types
-------------------------------

Classes, structures and enumerations have many things in common in Swift.
All three can work with properties, methods, initializers, extensions, and protocols.
However, there is one fundamental difference:

* Structures and enumerations are :newTerm:`value types`
* Classes are :newTerm:`reference types`

This difference is very important when deciding how to define the building blocks of your code.

.. TODO: this section needs updating to clarify that assignment is always like value semantics,
   and it's only really possible to see the difference when looking at the properties of a type.

.. _ClassesAndStructures_ValueTypes:

Value Types
~~~~~~~~~~~

.. TODO: Have I actually described what a 'type' is by this point?

A :newTerm:`value type` is a type that is *copied*
when it is assigned to a variable or constant,
or when it is passed to a function.

You've actually been using value types extensively throughout the previous chapters.
In fact, all of the basic types in Swift –
integers, floating-point numbers, Booleans, strings, arrays and dictionaries –
are value types.

Swift structures and enumerations are also value types.
This means that any structure and enumeration instances you create –
and any value types they have as properties –
will always be copied when they are passed around.

For example, using the ``Resolution`` structure from above:

.. testcode:: ClassesAndStructures

   -> let hd = Resolution(width: 1920, height: 1080)
   << // hd : Resolution = Resolution(1920, 1080)
   -> var cinema = hd
   << // cinema : Resolution = Resolution(1920, 1080)

This example declares a constant called ``hd``,
and sets it to a ``Resolution`` instance initialized with
the width and height of full HD video
(which is ``1920`` pixels wide by ``1080`` pixels high).

It then declares a variable called ``cinema``,
and sets it to the current value of ``hd``.
Because ``Resolution`` is a structure,
a *copy* of the existing instance is made,
and this new copy is assigned to ``cinema``.
Even though ``hd`` and ``cinema`` now have the same width and height,
they are two completely different instances behind the scenes.

Next, the ``width`` property of ``cinema`` is amended to be
the width of the slightly-wider 2K standard used for digital cinema projection
(which is ``2048`` pixels wide and ``1080`` pixels high):

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
The end result was two completely separate instances,
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
   << // currentDirection : CompassPoint = <unprintable value>
   -> let rememberedDirection = currentDirection
   << // rememberedDirection : CompassPoint = <unprintable value>
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

.. _ClassesAndStructures_ReferenceTypes:

Reference Types
~~~~~~~~~~~~~~~

Unlike value types, an instance of a :newTerm:`reference type` is *not* copied
when it is assigned to a variable or constant,
or when it is passed to a function.
Rather than making a copy, a :newTerm:`reference` to the same existing instance is used instead.

.. TODO: This enables you to have multiple variables and constants
   that all refer to the same one instance. 

Here's an example, using the ``VideoMode`` class defined above:

.. testcode:: ClassesAndStructures

   -> let tenEighty = VideoMode()
   << // tenEighty : VideoMode = <VideoMode instance>
   -> tenEighty.resolution = hd
   -> tenEighty.interlaced = true
   -> tenEighty.name = "1080i"
   -> tenEighty.frameRate = 25.0

This example declares a new constant called ``tenEighty``,
and sets it to refer to a new instance of the ``VideoMode`` class.
The video mode is assigned a copy of the HD resolution of ``1920`` by ``1080`` from before.
It is set to be interlaced, and is given a name of ``"1080i"``.
Finally, it is set to a frame rate of ``25.0`` frames per second.

Next, ``tenEighty`` is assigned to a new constant, called ``alsoTenEighty``,
and the frame rate of ``alsoTenEighty`` is modified:

.. testcode:: ClassesAndStructures

   -> let alsoTenEighty = tenEighty
   << // alsoTenEighty : VideoMode = <VideoMode instance>
   -> alsoTenEighty.frameRate = 30.0

Because classes are reference types,
``tenEighty`` and ``alsoTenEighty`` actually both refer to the *same* ``VideoMode`` instance.
Effectively, they are just two different names for the same single reference.

Checking the ``frameRate`` property of ``tenEighty``
shows that it correctly reports the new frame rate of ``30.0``
from the underlying ``VideoMode`` instance:

.. testcode:: ClassesAndStructures

   -> println("The frameRate property of tenEighty is now \(tenEighty.frameRate)")
   <- The frameRate property of tenEighty is now 30.0

Note that ``tenEighty`` and ``alsoTenEighty`` are declared as *constants*,
rather than variables.
However, it is still possible to change
``tenEighty.frameRate`` and ``alsoTenEighty.frameRate``.
This is allowed because
the values of the ``tenEighty`` and ``alsoTenEighty`` constants themselves do not actually change.
``tenEighty`` and ``alsoTenEighty`` do not themselves “store” the ``VideoMode`` instance –
instead, they both *refer* to a ``VideoMode`` instance behind the scenes.
It is the ``frameRate`` property of the underlying ``VideoMode`` that is changed,
not the values of the constant references to that ``VideoMode``.

.. TODO: reiterate here that arrays and dictionaries are value types rather than reference types,
   and demonstrate what that means for the values they store
   when they themselves are value types or reference types.
   Also make a note about what this means for key copying,
   as per the swift-discuss email thread "Dictionaries and key copying"
   started by Alex Migicovsky on Mar 1 2014.

.. _ClassesAndStructures_Pointers:

Pointers
________

If you have experience with C, C++ or Objective-C,
you may be familiar with the fact that these languages use :newTerm:`pointers` to refer to objects.
Variables, constants and properties that refer to an instance of a reference type
are very similar to pointers in C-like languages,
but do not use the reference operator (``&``) or dereference operator (``*``)
to differentiate between a pointer and the memory it points to.
Instead, a reference type in Swift is declared like any other named value,
and the value it contains is always a reference to a particular instance of that type.

.. TODO: We need something here to say
   "but don't worry, you can still do all of the stuff you're used to".

.. TODO: Add a justification here to say why this is a good thing.

.. TODO: Add a section about using the identity operator
   to check if two reference named values point to the same instance.
   This is currently blocked on rdar://problem/15566395 .
   
.. TODO: Saying that we don't use the reference operator is actually untrue.
   We use it at the call-site for inout function parameters.

.. _ClassesAndStructures_ChoosingBetweenClassesAndStructures:

Choosing Between Classes and Structures
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Classes and structures have many things in common,
and both can be used to define custom data types to use as
the building blocks of your program's code.

However, the fact that structure instances are always passed by *value*,
and class instances are always passed by *reference*,
means that they are suited to different kinds of tasks.
As you consider the data constructs and functionality that you need for a project,
you will need to decide whether each data construct should be
defined as a class or as a structure.

.. note::

   Enumerations have many useful features in Swift,
   but are not really suited to creating general-purpose data types
   in the same way as classes and structures.
   Enumerations should only be used when you need the specific capabilities
   that they offer.

As a general rule, you should only define a new structure when:

* the structure's primary purpose is to encapsulate a few relatively simple data values
* the structure will not have particularly complex functionality
  (although it may provide one or two convenience methods to work with its stored values)
* it is reasonable to expect that the encapsulated values will be copied rather than referenced
  when assigning or passing around an instance of that structure
* any properties stored by the structure are themselves value types,
  which would also be expected to be copied rather than referenced
* there is no need to inherit properties or behavior from some other existing type

Examples of good candidates for structures include:

* the size of a geometric shape
  (perhaps encapsulating a ``width`` property and a ``height`` property,
  both of type ``Double``)
* a way to refer to ranges within a series
  (perhaps encapsulating a ``start`` property and a ``length`` property,
  both of type ``Int``)
* a point in a 3D coordinate system
  (perhaps encapsulating ``x``, ``y`` and ``z`` properties, each of type ``Double``)

In all other cases, you should define a class, and create instances of that class,
to be managed and passed by reference.
In practice, this means that most custom data constructs should be classes,
not structures.

.. QUESTION: what's the deal with tuples and reference types / value types?

.. TODO: Tim has suggested using Window as a good example here –
   its location is a structure, but it doesn't make sense for Window
   to be a value type, as it is not copied when passed around.

.. _ClassesAndStructures_IdentityOperators:

Identity Operators
------------------

Because classes are *reference types*,
it is possible for multiple named values to refer to
the same single instance of a class behind the scenes.
(The same is not true for structures and enumerations,
because they are *value types*,
and are always copied when they are assigned to a named value
or passed to a function.)

It can sometimes be useful to find out if two named values refer to
exactly the same instance of a class.
To enable this, Swift provides two :newTerm:`identity operators`:

* Identical to (``===``)
* Not identical to (``!==``)

These operators can be used to check if two named values refer to the same single instance:

.. testcode:: ClassesAndStructures

   -> if tenEighty === alsoTenEighty {
         println("tenEighty and alsoTenEighty refer to the same Resolution instance.")
      }
   <- tenEighty and alsoTenEighty refer to the same Resolution instance.

Note that “identical to” (represented by three equals signs, or ``===``)
does not mean the same thing as “equal to” (represented by two equals signs, or ``==``):

* :newTerm:`Identity` means that
  two named values of class type refer to exactly the same class instance.
* :newTerm:`Equality` means that
  two instances are considered “equal” or “equivalent” in value,
  for some appropriate meaning of “equal”, as defined by the type's designer.

When you define your own custom classes and structures,
it is your responsibility to decide what qualifies as two instances being “equal”.
The process of defining your own implementations of the “equal to” and “not equal to” operators
is described in :ref:`AdvancedOperators_EquivalenceOperators`.

.. note::

   The identity operators are not used with structure and enumeration types,
   because they are value types that store their values directly,
   rather than referencing an instance of that type behind the scenes.

.. _ClassesAndStructures_TypeAliases:

Type Aliases
------------

:newTerm:`Type aliases` are a way to define an alternative name
(or :newTerm:`alias`) for an existing type.
Type aliases are defined with the ``typealias`` keyword:

.. testcode:: typeAliases

   -> typealias BlackjackCard = PlayingCard

Type aliases can be useful when you want to refer to an existing type
by a name that is contextually more appropriate.
Once you have defined a type alias,
you can use the alias anywhere you might use the original name:

.. testcode:: typeAliases

   -> let theQueenOfHearts = BlackjackCard(.Queen, .Hearts)
   << // theQueenOfHearts : PlayingCard = PlayingCard(<unprintable value>, <unprintable value>)

.. note::

   Type aliases do not actually define a new type in Swift.
   They are just an alternative name for an existing type.
   In the example above,
   ``theQueenOfHearts`` is of type ``PlayingCard``, not ``BlackjackCard``.

.. TODO: this example used to have the PlayingCard example above it.
   It needs to change to be something else, as currently it fails swifttest.
   However, I'm holding off updating it until I hear back from the core design team
   as to whether they want to mention type aliases here at all.