Methods
=======

.. write-me::

.. _Methods_InstanceMethods:

Instance Methods
----------------

:newTerm:`Instance methods` are functions that belong to instances of
a particular class, structure or enumeration.
They support the functionality of those instances,
either by providing ways to access and modify their properties,
or by providing useful functionality related to their purpose.
Instance methods can be written in either function-style syntax or selector-style syntax.

Instance methods are written within the opening and closing braces of the type they belong to.
They have implicit access to all of the other instance methods and properties of that type.
Instance methods can only be called on a specific instance of that type.
They cannot be called in isolation without an existing instance.

Here's an example:

.. testcode:: classesAndStructures

   -> class Counter {
         var count: Int = 0
         func increment() {
            count++
         }
         func incrementBy(amount: Int) {
            count += amount
         }
         func reset() {
            count = 0
         }
      }

This example defines a simple ``Counter`` class,
which keeps track of the number of times something has happened.
It defines three instance methods:

* ``increment()``, which simply increments the counter by ``1``
* ``incrementBy(amount: Int)``, which increments the counter by an arbitrary integer amount, and
* ``reset()``, which resets the counter back to zero

It also declares a variable property, ``count``,
for keeping track of the current counter value.

Instance methods are called using the same dot syntax as properties:

.. testcode:: classesAndStructures

   -> let counter = Counter()
   << // counter : Counter = <Counter instance>
   /> initial counter value is \(counter.count)
   </ initial counter value is 0
   -> counter.increment()
   /> counter value is now \(counter.count)
   </ counter value is now 1
   -> counter.incrementBy(5)
   /> counter value is now \(counter.count)
   </ counter value is now 6
   -> counter.reset()
   /> counter value is now \(counter.count)
   </ counter value is now 0

.. _Methods_TheSelfProperty:

The “self” Property
~~~~~~~~~~~~~~~~~~~~

Every instance of a type has an implicit property called ``self``,
which is exactly equivalent to the instance itself.
This implicit ``self`` property can be used
to refer to the current instance within its own instance methods.

For example, the ``increment()`` method from above could have been written like this:

::

   func increment() {
      self.count++
   }

This is effectively saying “I want to increment the ``count`` property of myself”.

In practice, you don't need to write ``self`` in your code very often.
If you don't explicitly write ``self``,
Swift assumes that you are referring to a property or method of the current instance
whenever you use a known property or method name within a method.
This can be seen by the use of ``count`` (rather than ``self.count``)
inside the three instance methods for ``Counter``.

The only exception to this rule is when a method's parameter name
happens to be the same as the name of a property.
In this situation, the parameter name takes precedence,
and it becomes necessary to refer to the property in a more qualified way.
The implicit ``self`` property can be used to make it clear which is which.

Here, ``self`` is used to disambiguate between
a method parameter called ``x``, and an instance property that is also called ``x``:

.. testcode:: self

   -> struct Point {
         var x = 0.0, y = 0.0
         func isToTheRightOfX(x: Double) -> Bool {
            return self.x > x
         }
      }
   -> let somePoint = Point(4.0, 5.0)
   << // somePoint : Point = Point(4.0, 5.0)
   -> if somePoint.isToTheRightOfX(1.0) {
         println("This point is to the right of the line where x == 1.0")
      }
   <- This point is to the right of the line where x == 1.0

Without the ``self`` prefix,
Swift would assume that both uses of ``x`` referred to the method parameter called ``x``.

.. _Methods_MutatingMethodsForValueTypes:

Mutating Methods for Value Types
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Structures and enumerations are :ref:`ClassesAndStructures_ValueTypes`.
By default, the properties of a value type cannot be modified from within its instance methods.

.. TODO: find out why.
.. TODO: once I actually know why, explain it. 

However, if your structure or enumeration needs to modify its properties within a particular method,
it can opt in to :newTerm:`mutating` behavior for that method.
The method is then able to “mutate” (i.e. “change”)
its properties from within the method,
and any changes that it makes are written back to the original structure when the method ends.
It can also assign a completely new instance to its implicit ``self`` property,
and this new instance will replace the existing one when the method ends.

You can opt in to this behavior by placing the ``mutating`` keyword
before the ``func`` keyword for that method:

.. testcode:: selfStructures

   -> struct Point {
         var x = 0.0, y = 0.0
         mutating func moveBy(deltaX: Double, deltaY: Double) {
            x += deltaX
            y += deltaY
         }
      }
   -> var somePoint = Point(1.0, 1.0)
   << // somePoint : Point = Point(1.0, 1.0)
   -> somePoint.moveBy(2.0, 3.0)
   -> println("The point is now at (\(somePoint.x), \(somePoint.y))")
   <- The point is now at (3.0, 4.0)

The ``Point`` structure above defines a mutating ``moveBy()`` method,
which moves a ``Point`` instance by a certain amount.
Instead of returning a new point,
this method actually modifies the point on which it is called.
The ``mutating`` keyword has been added to its definition
to enable it to modify its properties.

Note that you cannot call a mutating method on a constant of structure type,
because its properties cannot be changed, even if they are variable properties
(as described in :ref:`Properties_StoredPropertiesOfConstantStructureInstances`):

.. testcode:: selfStructures

   -> let fixedPoint = Point(3.0, 3.0)
   << // fixedPoint : Point = Point(3.0, 3.0)
   -> fixedPoint.moveBy(2.0, 3.0)
   !! <REPL Input>:1:1: error: 'Point' does not have a member named 'moveBy'
   !! fixedPoint.moveBy(2.0, 3.0)
   !! ^        ~~~~~~
   // this will report an error

.. _Methods_AssigningToSelfWithinAMutatingMethod:

Assigning to Self Within a Mutating Method
__________________________________________

Mutating methods can assign an entirely new instance to the implicit ``self`` property.
The ``Point`` example shown above could have been written in the following way instead:

.. testcode:: selfStructuresAssign

   -> struct Point {
         var x = 0.0, y = 0.0
         mutating func moveBy(deltaX: Double, deltaY: Double) {
            self = Point(x + deltaX, y + deltaY)
         }
      }
   >> var somePoint = Point(1.0, 1.0)
   << // somePoint : Point = Point(1.0, 1.0)
   >> somePoint.moveBy(2.0, 3.0)
   >> println("The point is now at (\(somePoint.x), \(somePoint.y))")
   << The point is now at (3.0, 4.0)

This version of the mutating ``moveBy()`` method creates a brand new structure
whose ``x`` and ``y`` values are set to the target location.
The end result of calling this alternative version of the method
will be exactly the same as for calling the earlier version.

Mutating methods for enumerations can set the implicit ``self`` parameter to be
a different member from the same enumeration:

.. testcode:: selfEnumerations

   -> enum TriStateSwitch {
         case Off, Low, High
         mutating func next() {
            switch self {
               case Off:
                  self = Low
               case Low:
                  self = High
               case High:
                  self = Off
            }
         }
      }
   -> var ovenLight = TriStateSwitch.Low
   << // ovenLight : TriStateSwitch = <unprintable value>
   -> ovenLight.next()
   // ovenLight is now equal to .High
   -> ovenLight.next()
   // ovenLight is now equal to .Off

This example defines an enumeration for a three-state switch.
The switch cycles between three different power states
(``Off``, ``Low`` and ``High``)
every time its ``next()`` method is called.

.. _Methods_TypeMethods:

Type Methods
------------

.. write-me::

.. see release notes from 2013-12-18 for a note about lazy initialization
.. mention that type methods can access type properties (and other type methods?)
   without needing to reference the type's name,
   as they also get an implicit ``self`` parameter.
