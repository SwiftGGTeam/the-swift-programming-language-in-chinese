Methods
=======

:newTerm:`Methods` are named functions that are associated with a particular type.
Classes, structures, and enumerations can all define instance methods,
which encapsulate specific tasks and functionality for working with an instance of a given type.
Classes, structures, and enumerations can also define type methods,
which are associated with the type itself.
Type methods are similar to class methods in Objective-C.

The fact that structures and enumerations can define methods in Swift
is a major difference from C and Objective-C.
In Objective-C, classes are the only types that can define methods.
In Swift, you can choose whether to define a class, structure, or enumeration,
and still have the flexibility to define methods on the type you create.

All methods have access to an implicit ``self`` property.
When used in an instance method, ``self`` is equivalent to the instance itself;
for type methods, it is equivalent to the type.
The ``self`` property is used to disambiguate between parameters and properties
that have the same name.

By default, an instance method on a structure or an enumeration
cannot modify the properties of that instance.
However, these methods can be marked as “mutating” methods,
which *are* allowed to modify the instance's properties.
Mutating instance methods can also assign
an entirely new instance of the structure or enumeration to ``self`` from within the method.

.. _Methods_InstanceMethods:

Instance Methods
----------------

:newTerm:`Instance methods` are functions that belong to instances of
a particular class, structure, or enumeration.
They support the functionality of those instances,
either by providing ways to access and modify their properties,
or by providing useful functionality related to their purpose.
Instance methods have exactly the same syntax as functions.

.. TODO: remove this last sentence once the syntaxes are unified.

You write an instance method within the opening and closing braces of the type it belongs to.
An instance method has implicit access to all of the other instance methods and properties of that type.
An instance method can only be called on a specific instance of the type it belongs to.
It cannot be called in isolation without an existing instance.

Here's an example that defines a simple ``Counter`` class,
which counts the number of times something has happened:

.. testcode:: instanceMethods

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

The ``Counter`` class defines three instance methods:

* ``increment``, which simply increments the counter by ``1``
* ``incrementBy(amount: Int)``, which increments the counter by an arbitrary integer amount
* ``reset``, which resets the counter to zero

The ``Counter`` class also declares a variable property, ``count``,
to keep track of the current counter value.

Instance methods are called using the same dot syntax as properties:

.. testcode:: instanceMethods

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

.. QUESTION: I've used count++ rather than ++count here.
   Is this consistent with my advice and usage elsewhere?

.. _Methods_TheSelfProperty:

The “self” Property
~~~~~~~~~~~~~~~~~~~~

Every instance of a type has an implicit property called ``self``,
which is exactly equivalent to the instance itself.
This implicit ``self`` property can be used
to refer to the current instance within its own instance methods.

The ``increment`` method in the example above could have been written like this:

::

   func increment() {
      self.count++
   }

In practice, you don't need to write ``self`` in your code very often.
If you don't explicitly write ``self``,
Swift assumes that you are referring to a property or method of the current instance
whenever you use a known property or method name within a method.
This assumption is demonstrated by the use of ``count`` (rather than ``self.count``)
inside the three instance methods for ``Counter``.

The exception to this rule occurs when a method's parameter name
is the same as the name of a property.
In this situation, the parameter name takes precedence,
and it becomes necessary to refer to the property in a more qualified way.
You use the implicit ``self`` property to
distinguish between the parameter name and the property name.

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

.. _Methods_ModifyingValueTypesFromWithinInstanceMethods:

Modifying Value Types from Within Instance Methods
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Structures and enumerations are *value types*.
By default, the properties of a value type cannot be modified from within its instance methods.

.. TODO: find out why.
.. TODO: once I actually know why, explain it. 

However, if you need to modify the properties of your structure or enumeration
within a particular method,
you can opt in to :newTerm:`mutating` behavior for that method.
The method can then mutate (that is, change)
its properties from within the method,
and any changes that it makes are written back to the original structure when the method ends.
The method can also assign a completely new instance to its implicit ``self`` property,
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

The ``Point`` structure above defines a mutating ``moveBy`` method,
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
   !! <REPL Input>:1:1: error: immutable value of type 'Point' only has mutating members named 'moveBy'
   !! fixedPoint.moveBy(2.0, 3.0)
   !! ^          ~~~~~~
   // this will report an error

.. TODO: talk about @!mutating as well.
   Struct setters are implicitly 'mutating' by default and thus do not work on 'let's.
   However, JoeG says that this ought to work
   if the setter for the computed property is explicitly defined as @!mutating.

.. _Methods_AssigningToSelfWithinAMutatingMethod:

Assigning to “self” Within a Mutating Method
____________________________________________

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

This version of the mutating ``moveBy`` method creates a brand new structure
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
every time its ``next`` method is called.

.. _Methods_TypeMethods:

Type Methods
------------

Instance methods, as described above,
are methods that are called on an instance of a particular type.
You can also define methods that are called on the type itself.
These kinds of methods are called :newTerm:`type methods`.
Type methods on classes are prefixed with the word ``class``,
and type methods on structures and enumerations are prefixed with the word ``static``:

.. testcode:: typeMethods

   -> class SomeClass {
         class func someTypeMethod() {
            // method body goes here
         }
      }
   -> struct SomeStructure {
         static func someTypeMethod() {
            // method body goes here
         }
      }
   -> enum SomeEnumeration {
         static func someTypeMethod() {
            // method body goes here
         }
      }

.. note::

   In Objective-C, you can only define type-level methods for Objective-C classes.
   In Swift, you can define type-level methods for all classes, structures and enumerations.
   Each type method is explicitly scoped to the type it supports.

Type methods are called with dot syntax, just like instance methods.
However, type methods are called on the type they belong to,
and not on an instance of that type.
To call a type method on a class called ``SomeClass``, for example,
you write the following:

.. testcode:: typeMethods

   -> SomeClass.someTypeMethod()

.. see release notes from 2013-12-18 for a note about lazy initialization
.. mention that static methods can access static properties (and other static methods?)
   without needing to reference the type's name,
   as they also get an implicit ``self`` parameter.

.. _Methods_MethodBinding:

Method Binding
--------------

.. write-me::

.. you can get a function that refers to a method, either with or without the 'self' argument already being bound:
.. class C {
..    func foo(x: Int) -> Float { ... }
.. }
.. var c = C()
.. var boundFunc = c.foo 	// a function with type (Int) -> Float
.. var unboundFunc = C.foo // a function with type (C) -> (Int) -> Float
.. selector-style methods can be referenced as foo.bar:bas:
   (see Doug's comments from the 2014-03-12 release notes)
