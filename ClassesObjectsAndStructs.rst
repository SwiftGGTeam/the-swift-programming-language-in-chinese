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


Objects and Classes
-------------------

.. refnote:: From the Guided Tour:

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


Structures
----------

.. refnote:: From the Guided Tour:

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
