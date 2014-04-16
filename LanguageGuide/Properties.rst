Properties
==========

:newTerm:`Properties` associate values with a particular class, structure, or enumeration.
Stored properties store a constant or variable named value alongside an instance,
whereas computed properties calculate (rather than store) a value.

Stored and computed properties are usually associated with instances of a particular type.
However, they can also be associated with the type itself.
Such properties are known as type properties.

.. note::

   Computed properties can be provided by classes, structures, and enumerations.
   Stored properties can only be provided by classes and structures.

.. QUESTION: should I mention dot syntax again?
   I introduced it in Custom Types out of necessity,
   but maybe it should be mentioned here too.

.. _Properties_StoredProperties:

Stored Properties
-----------------

In its simplest form, a stored property is just a named value
that is stored alongside an instance of a particular class or structure.
Stored properties can be either
:newTerm:`variable stored properties` (introduced by the ``var`` keyword),
or :newTerm:`constant stored properties` (introduced by the ``let`` keyword):

.. testcode:: storedProperties

   -> struct FixedLengthRange {
         var firstValue: Int
         let length: Int
      }
   -> var rangeOfThreeItems = FixedLengthRange(firstValue: 0, length: 3)
   << // rangeOfThreeItems : FixedLengthRange = FixedLengthRange(0, 3)
   // the range represents integer values 0, 1, and 2
   -> rangeOfThreeItems.firstValue = 6
   // the range now represents integer values 6, 7, and 8

The example above defines a structure called ``FixedLengthRange``,
which describes a range of integers
whose range length cannot be changed once it is created.
Instances of ``FixedLengthRange`` have
a variable stored property called ``firstValue``,
and a constant stored property called ``length``.
In the example above, ``length`` is initialized when the new range is created,
and cannot be changed thereafter, because it is a constant property.

The value of a constant stored property can be changed
at any point until the initializer for the class or structure it belongs to
completes its initialization.
Instance initialization is described in :doc:`Initialization`.

.. _Properties_StoredPropertiesOfConstantStructureInstances:

Stored Properties of Constant Structure Instances
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you create an instance of a structure
and assign that instance to a constant property or constant named value,
you cannot modify the instance's properties,
even if they were declared as variable properties:

.. testcode:: storedProperties

   -> let rangeOfFourItems = FixedLengthRange(firstValue: 0, length: 4)
   << // rangeOfFourItems : FixedLengthRange = FixedLengthRange(0, 4)
   // this range represents integer values 0, 1, 2, and 3
   -> rangeOfFourItems.firstValue = 6
   !! <REPL Input>:1:29: error: cannot assign to 'firstValue' in 'rangeOfFourItems'
   !! rangeOfFourItems.firstValue = 6
   !! ~~~~~~~~~~~~~~~~~~~~~~~~~~~ ^
   // this will report an error, even thought firstValue is a variable property

Because ``rangeOfFourItems`` is declared as a constant named value (with the ``let`` keyword),
it is not possible to change its ``firstValue`` property,
even though ``firstValue`` is a variable property.

This behavior is due to the fact that structures are *value types*.
When an instance of a value type is marked as being a constant,
so are all of its properties.

The same is not true for classes, which are *reference types*.
If you assign an instance of a reference type
to a constant property or constant named value,
you can still change that instance's variable properties.

.. TODO: this explanation could still do to be improved.

.. QUESTION: the same is actually true for computed properties of structures too
   (which surprised me, as they don't have storage).
   Does this mean I should mention it again later on?
   For now, I've deliberately said "properties" rather than "stored properties"
   in the first paragraph of this section, to set expectations.
   (I've also asked whether this is intentional, in rdar://16338553.)

.. _Properties_StoredPropertiesAndInstanceVariables:

Stored Properties and Instance Variables
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you have experience with Objective-C,
you may know that it provides *two* ways
to store values and references alongside instances of a class.
In addition to properties,
you can use instance variables as a backing store for the values stored in a property.

Swift unifies these two separate concepts into a single property declaration.
There is no longer a distinction between properties and instance variables,
and the backing store for a property is not accessed directly.
This avoids confusion about how the value is accessed in different contexts,
and simplifies the property's declaration into a single, definitive statement.
All of the information about the property –
including its name, type, and memory management characteristics –
is defined in a single location as part of the type's definition.

.. TODO: research and write up the story for @weak

.. TODO: what happens if one property of a constant structure is an object reference?

.. TODO: You can initialize a property with a block with parens on the end.
   I should write up how to do so.

.. TODO: There's a design plan to introduce a @lazy attribute for lazy property init.
   This is being tracked in rdar://16432427.

.. _Properties_ComputedProperties:

Computed Properties
-------------------

Classes and structures can also define :newTerm:`computed properties`,
which do not actually store a value.
Instead, they provide a getter, and an optional setter,
to retrieve and set other properties and values indirectly.

.. testcode:: computedProperties

   -> struct Point {
         var x = 0.0, y = 0.0
      }
   -> struct Size {
         var width = 0.0, height = 0.0
      }
   -> struct Rect {
         var origin = Point()
         var size = Size()
         var center: Point {
            get {
               let centerX = origin.x + (size.width / 2)
               let centerY = origin.y + (size.height / 2)
               return Point(centerX, centerY)
            }
            set(newCenter) {
               origin.x = newCenter.x - (size.width / 2)
               origin.y = newCenter.y - (size.height / 2)
            }
         }
      }
   -> var square = Rect(origin: Point(0.0, 0.0), size: Size(10.0, 10.0))
   << // square : Rect = Rect(Point(0.0, 0.0), Size(10.0, 10.0))
   -> let initialSquareCenter = square.center
   << // initialSquareCenter : Point = Point(5.0, 5.0)
   -> square.center = Point(x: 15.0, y: 15.0)
   -> println("square.origin is now at (\(square.origin.x), \(square.origin.y))")
   <- square.origin is now at (10.0, 10.0)

This example defines three structures for working with geometric shapes:

* ``Point``, which encapsulates an ``(x, y)`` coordinate
* ``Size``, which encapsulates a ``width`` and a ``height``
* ``Rect``, which defines a rectangle by an origin point and a size

The ``Rect`` structure also provides a computed property called ``center``.
The current center position of a ``Rect`` can always be determined from its ``origin`` and ``size``,
and so you don't need to store the center point as an explicit ``Point`` value.
Instead, ``Rect`` defines a custom getter and setter for a computed variable called ``center``,
to enable you to work with the rectangle's ``center`` as if it were a real stored property.

The example creates a new ``Rect`` variable called ``square``.
The ``square`` variable is initialized with an origin point of ``(0, 0)``,
and a width and height of ``10``.
This square is represented by the blue square in the diagram below.

The ``square`` variable's ``center`` property is then accessed through dot syntax (``square.center``),
which causes the getter for ``center`` to be called,
to retrieve the current property value.
Rather than returning an existing value,
the getter actually calculates and returns a new ``Point`` to represent the center of the square.
As can be seen above, the getter correctly returns a center point of ``(5, 5)``.

The ``center`` property is then set to a new value of ``(15, 15)``,
which moves the square up and to the right,
to the new position shown by the orange square in the diagram below.
Setting the ``center`` property calls the setter for ``center``,
which modifies the ``x`` and ``y`` values of the stored ``origin`` property,
and moves the square to its new position.

.. image:: ../images/computedProperties.png
   :align: center

.. _Properties_ShorthandSetterDeclaration:

Shorthand Setter Declaration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If a computed property's setter does not define a name for the new value to be set,
a default name of ``newValue`` is used.
Here's an alternative version of the ``Rect`` structure,
which takes advantage of this shorthand notation:

.. testcode:: computedProperties

   -> struct AlternativeRect {
         var origin = Point()
         var size = Size()
         var center: Point {
            get {
               let centerX = origin.x + (size.width / 2)
               let centerY = origin.y + (size.height / 2)
               return Point(centerX, centerY)
            }
            set {
               origin.x = newValue.x - (size.width / 2)
               origin.y = newValue.y - (size.height / 2)
            }
         }
      }

.. _Properties_ReadOnlyComputedProperties:

Read-Only Computed Properties
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A computed property with a getter but no setter is known as a :newTerm:`read-only computed property`.
Read-only computed properties enable you to
define a property that will always return a value,
and can be accessed through dot syntax,
but which cannot be set to a different value by users of your class or structure.

.. note::

   Computed properties – including read-only computed properties –
   must be declared as variable properties with the ``var`` keyword,
   because their value is not fixed.
   The ``let`` keyword is only used for constant properties,
   to indicate that their values cannot be changed once they are set
   as part of instance initialization.

The declaration of a read-only computed property can be simplified
by removing the ``get`` keyword:

.. testcode:: computedProperties

   -> struct Cuboid {
         var width = 0.0, height = 0.0, depth = 0.0
         var volume: Double {
            return width * height * depth
         }
      }
   -> let fourByFiveByTwo = Cuboid(4.0, 5.0, 2.0)
   << // fourByFiveByTwo : Cuboid = Cuboid(4.0, 5.0, 2.0)
   -> println("the volume of fourByFiveByTwo is \(fourByFiveByTwo.volume)")
   <- the volume of fourByFiveByTwo is 40.0

This example defines a new structure called ``Cuboid``,
which represents a 3D rectangular box with ``width``, ``height``, and ``depth`` properties.
This structure also has a read-only computed property called ``volume``,
which calculates and returns the current volume of the cuboid.
It doesn't make sense for ``volume`` to be settable,
as it would be ambiguous as to which values of ``width``, ``height``, and ``depth``
should be used for a particular ``volume`` value.
Nonetheless, it is useful for a ``Cuboid`` to provide a read-only computed property
to enable external users to discover its current calculated volume.

.. note::

   Read-only computed properties are not the same as constant stored properties.
   A read-only computed property can return a different value every time it is called,
   whereas a constant stored property will always return the same value.

.. NOTE: getters and setters are also allowed for named values
   that are not associated with a particular class or struct.
   Where should this be mentioned?
   
.. TODO: Anything else from https://[Internal Staging Server]/docs/StoredAndComputedVariables.html

.. TODO: Add an example of a computed property for an enumeration
   (now that the Enumerations chapter no longer has an example of this itself).

.. _Properties_PropertyObservers:

Property Observers
------------------

:newTerm:`Property observers` are a way to observe and respond to
changes in a property's value.
Property observers are called every time a property's value is set,
even if the new value is the same as the property's current value.

You can add property observers to any stored properties you define.
You can also add property observers to any inherited property (whether stored or computed)
by overriding the property within a subclass.
Inheritance and overriding are described in :doc:`Inheritance`.

.. TODO: update this link to point to the specific section on property overriding
   once it has been written.

.. note::

   You don't need to define property observers for non-overridden computed properties,
   because you can observe and respond to changes to their value
   from directly within the computed property's setter.

You have the option to define either or both of these observers on a property:

* ``willSet``, which is called just before the value is stored
* ``didSet``, which is called immediately after the new value is stored

If you implement a ``willSet`` observer,
it will be passed the new property value as a constant parameter.
You can specify a name for this parameter as part of your ``willSet`` implementation.
If you choose not to write the parameter name and parentheses within your implementation,
the parameter will still be made available with a default parameter name of ``newValue``.

Similarly, if you implement a ``didSet`` observer,
it will be passed a constant parameter containing the old property value.
You can name the parameter if you wish,
or use the default parameter name of ``oldValue``.

.. note::

   ``willSet`` and ``didSet`` observers are not called when
   a property is first initialized.
   They are only called when the property's value is set
   outside of an initialization context.

Here's an example of ``willSet`` and ``didSet`` in action:

.. testcode:: storedProperties

   -> class StepCounter {
         var totalSteps: Int = 0 {
            willSet(newTotalSteps) {
               println("About to set totalSteps to \(newTotalSteps)")
            }
            didSet {
               if totalSteps > oldValue  {
                  println("Added \(totalSteps - oldValue) steps")
               }
            }
         }
      }
   -> let stepCounter = StepCounter()
   << // stepCounter : StepCounter = <StepCounter instance>
   -> stepCounter.totalSteps = 200
   </ About to set totalSteps to 200
   </ Added 200 steps
   -> stepCounter.totalSteps = 360
   </ About to set totalSteps to 360
   </ Added 160 steps
   -> stepCounter.totalSteps = 896
   </ About to set totalSteps to 896
   </ Added 536 steps

This example defines a new class called ``StepCounter``,
which keeps track of the total number of steps that a person has taken while walking.
This class might be used with input data from a pedometer or other step counter
to keep track of a person's exercise during their daily routine.

The ``StepCounter`` class declares a ``totalSteps`` property of type ``Int``.
This is a stored property with ``willSet`` and ``didSet`` observers.

The ``willSet`` and ``didSet`` observers for ``totalSteps`` are called
whenever the property is assigned a new value.
This is true even if the new value is the same as the current value.

This example's ``willSet`` observer uses
a custom parameter name of ``newTotalSteps`` for the upcoming new value.
In this example, it simply prints out the value that is about to be set.

The ``didSet`` observer is called after the value of ``totalSteps`` has been updated.
In this example, it looks at the new value of ``totalSteps``,
and compares it against the old value.
If the total number of steps has increased,
a message is printed to indicate how many new steps have been taken.
The ``didSet`` observer does not provide a custom parameter name for the old value,
and the default name of ``oldValue`` is used instead.

.. note::

   If you assign a value to a property within its own ``didSet`` observer,
   the new value that you assign will replace the one that was just set.

.. TODO: mention that this also works for global / local variables

.. TODO: mention that you can't override to observe a read-only property,
   as there will never be anything to actually observe
   The same will be true for overriden constant properties
   once stored property overriding is implemented.

.. _Properties_TypeProperties:

Type Properties
---------------

.. write-me::

.. see release notes from 2013-12-18 for a note about lazy initialization
.. mention that type methods can access type properties (and other type methods?)
   without needing to reference the type's name,
   as they also get an implicit ``self`` parameter.
.. as it stands, this is the first time I'll mention .dynamicType (assuming I do)
   is this the right place to introduce it?
.. mention that you can get at type properties a few different ways:
   TypeName.propertyName; someInstance.dynamicType.propertyName;
   just plain old propertyName if you're already at a type level in that type
   (likewise for methods in the methods chapter)
.. type properties *must* have an initializer or a getter/setter,
   because there's no "+ initialize" during which to init them otherwise
