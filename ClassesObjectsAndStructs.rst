Classes, objects and structures
===============================

.. docnote:: Objects and structs

	I've grouped ``object`` and ``struct`` together because they are very similar in Swift, at least in practice. This enables me to cover how they *do* differ in practice – something which has the potential to trip people up – and to discuss Swift's approach to passing by value and by reference in more detail.

.. docnote:: Subjects to be covered in this section

	* Classes
	* Objects
	* Structures
	* Instance variables
	* Getters and setters
	* Constructors and destructors
	* Instance and class methods
	* Working with self and Self
	* Super
	* Memory management

.. refnote:: Types and Values: Structures

	Structure types in Swift are used to aggregate values together, acting
	essentially as named tuples. For example, one can declare a
	``Complex`` struct with real and imaginary parts::

	  (swift) struct Complex {
				var real, imag : Double
			  }

	Values of the structure can then be created with constructor syntax,
	providing values for each of the fields::

	  (swift) var c1 = Complex(1.0, 1.0)
	  // c1 : Complex = Complex(1.0, 1.0)

	Those fields of a structure can then be accessed with dot syntax::

	  (swift) c1.real = -c1.real
	  (swift) c1
	  // c1 : Complex = Complex(-1.0, 1.0)

	Assigning a structure value or passing it to a function makes a copy
	of the data, so changing the copy does not change the source::

	  (swift) var c2 = c1
	  // c2 : Complex = Complex(1.0, 1.0)
	  (swift) c2.real = 17
	  (swift) c2
	  // c2 : Complex = Complex(17.0, 1.0)
	  (swift) c1
	  // c1 : Complex = Complex(-1.0, 1.0)

	Because structures are copied by value, they should generally be used
	for data aggregation of a small number of values. Moreover, the data
	for structures will be stored "inline", e.g., directly on the stack or
	within an enclosing structure, so they are extremely efficient
	(requiring no memory allocation) when they are small.

	Structures can have methods and properties on them. These methods and
	properties can be included as part of the original struct definition,
	or added later via an extension::

	  (swift) extension Complex {
				var magnitude : Double {
				get:
				  return sqrt(real * real + imag * imag)
				}
			  }
	  (swift) c1 = Complex(3, 1.5)
	  // c1 : Complex = Complex(3.0, 1.5)
	  (swift) c1.magnitude
	  // r1 : Double = 3.3541

.. refnote:: Types and Values: Classes

	Swift provides classes with methods, properties, and instance
	variables, declared with the ``class`` keyword. For example, we can
	declare a simple ``Animal`` class::

	  class Animal {
		var name : String

		constructor (inName : String) {
		  name = inName
		}

		func speak() { 
		  print("The \(name) is silent...\n")
		}
	  }

	The ``constructor`` is used to initialize the class by providing
	values for its instance variables. Objects of class type are allocated
	with ``new``, which also calls a constructor::

	  (swift) var animal = new Animal("orangutan")
	  // animal : Animal = <Animal instance>
	  (swift) animal.speak()
	  The orangutan is silent...

	Swift classes support single inheritance, as follows::

	  class Dog : Animal {
		constructor (inName : String) {
		  super.constructor(inName)
		}

		func speak() {
		  print("Woof!\n")
		}
	  }

	``Dog`` inherits from ``Animal``. Its constructor first calls the
	appropriate superclass constructor (via ``super.constructor``), and in
	this case doesn't require any more setup. The ``speak`` method
	overrides the corresponding method from the base class::

	  (swift) animal = new Dog("Brianna")
	  (swift) animal.speak()
	  Woof!

	As with structures, new properties and methods can be added to classes
	via extensions::

	  extension Animal {
		func rename(newName : String) {
		  self.name = newName
		}
	  }

	Such extensions are available for that class and any of its
	subclasses::

	  (swift) animal.rename("Duncan")
	  (swift) animal.name
	  // r4 : String = "Duncan"

.. refnote:: Guided Tour: Objects and Classes

	As you might expect, the ``class`` keyword is used to declare a new Swift class::

		(swift) class Shape {
				  var numberOfSides : Int
				}
		(swift) 

	Note that there's no need for a Swift class to inherit from any base class.  Of course, it is still fine to inherit from NSObject if you would like to get its methods.

	You create an instance with function call syntax::

		(swift) var blob = Shape()
		// blob : Shape = <unprintable value>
		(swift) 

	and memory is managed automatically for you using ARC (Automatic Reference Counting) for great performance and maximum compatibility with our frameworks.

	When you create subclasses, you use the familiar colon ``:`` to indicate the inherited type::

		(swift) class Quadrilateral : Shape {
				  constructor() {
					numberOfSides = 4
				  }
				}

	Instance variables can be accessed via the ``.`` operator::

		(swift) var square = Quadrilateral()
		// square : Quadrilateral = <unprintable value>
		(swift) println("A square has \(square.numberOfSides) sides.")
		// A square has 4 sides.
		(swift) 

	Variables declared in a class are properties. By default, they have implicit getters and setters that access an underlying (unnamed) instance variable, but you can also specify a custom getter and/or setter::

		(swift) class Circle : Shape {
				  var radius : Float
				  constructor() {
					numberOfSides = 1
				  }
				  var circumference : Float {
				  get:
					return radius * 2 * 3.14159
				  set (circ): 
					radius = circ / (2 * 3.14159)
				  }
				}
		(swift) var circle = Circle()
		// circle : Circle = <unprintable value>
		(swift) circle.radius = 5
		(swift) circle.circumference
		// Float = 31.4159
		(swift) circle.circumference = 62.8318
		(swift) circle.radius
		// Float = 10.0

	Notice that there are no asterisks in any of the variable declarations for objects:

	.. code-block:: swift
 
		var circle = Circle()

	This is one of the primary safety features---**Swift does not require you to manipulate and manage direct pointers to memory**. It means you can define a function that takes an argument like this::

		(swift) func enlarge(circle : Circle) {
				  circle.radius *= 2
				}
		(swift) 
	
	and call it like this::

		(swift) enlarge(circle)
		(swift) circle.radius
		// Float = 20.0

	The compiler manages the necessary mechanisms to pass the object by reference. 

.. refnote:: Guided Tour: Structures

	For types that should be passed by value, like graphics coordinates or sizes, you can create a ``struct``::

		(swift) struct Size {
				  var width, height : Float
				}

	Unlike other languages, Swift structures aren't limited just to holding values, they can also have functions and constructors, as well as adopt protocols and be extended (as described later in this tour)::

		(swift) struct Point {
				  var x, y : Float
			  
				  constructor(inX : Float, inY : Float) {
					x = inX
					y = inY
				  }
			  
				  func moveToTheRightBy(value : Float) {
					x += value
				  }
				}
		(swift) 

	Because Swift is statically-typed, the compiler always knows whether a type is passed by-value or by-reference so there's no need for any differences in syntax::

		(swift) var myPoint = Point(50, 200)
		// myPoint : Point = Point(50.0, 200.0)
		(swift) myPoint.moveToTheRightBy(200)
		(swift) myPoint
		// myPoint : Point = Point(250.0, 200.0)
		(swift) 

	Note that it's not necessary to include the constructor implementation shown for ``Point``, because a default constructor is automatically provided to set the values::

		(swift) var size = Size(50, 100)
		// size : Size = Size(50.0, 100.0)
		(swift) 
