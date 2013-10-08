Protocols and Extensions
========================

.. docnote:: Subjects to be covered in this section

	* Definition of protocols
	* Adoption of protocols
	* Standard protocols (Equatable etc.)
	* Default implementations of methods
	* Protocol compositions
	* Extending classes and structures
	* Start by extending an existing thing to have something it didn't
	* Continue by extending String to have an initializer for something it doesn't by default

.. docnote:: Extensions and protocols

	I'm wondering whether extensions and protocols should be part of a super-chapter with Classes, Objects and Structs.

.. refnote:: Guided Tour: Protocols

	A protocol is an abstract description of behavior---usually related functions and/or properties---that can be adopted by one or more types::

		(swift) protocol HitTestable {
				  func containsPoint(point : Point) -> Bool 
				}
		(swift) 

	All Swift types, including structures, can adopt protocols and implement the required behavior::

		(swift) struct Rect : HitTestable {
				  var origin : Point
				  var size : Size
				  func containsPoint(point : Point) -> Bool {
					return point.x >= origin.x && 
						   point.x < (origin.x + size.width) &&
						   point.y >= origin.y &&
						   point.y < (origin.y + size.height)
				  }
				}
		(swift) 

	The ``: HitTestable`` syntax in this structure declaration indicates conformance to the protocol. As with all other ``:`` use in Swift, you can read the colon as *is a*, so *"a Rect is a HitTestable type"*.  

	You can use a protocol in a variable declaration to indicate the variable has some unknown, dynamic type that conforms to that protocol::

		(swift) var testableThing : HitTestable
		(swift) 

	You can only assign a value if its type conforms to the protocol::

		(swift) var rect : Rect
		(swift) testableThing = rect
				// <segfault> - see <rdar://problem/13126342> Segfault when assigning variable with protocol type a value with concrete type

	and Swift ensures that you can only call functions or access properties that are defined as part of the protocol::

		(swift) var pt : Point(4, 5)
		// (Double, Double) = (4.0, 5.0)
		(swift) testableThing.containsPoint(pt)
		// Bool = false
		(swift) testableThing.origin
		<REPL Buffer>:51:14: error: protocol 'HitTestable' has no member named 'origin'
		testableThing.origin
		~~~~~~~~~~~~~^~~~~~~ 

	This guarantees safety when dealing with different types, such as when hit-testing a series of different elements:

	.. code-block:: swift

		struct Circle : HitTestable { ... }
		class Elephant : HitTestable { ... }

		func findFirstHitElement(point : Point, elements : HitTestable...) -> HitTestable? {
			for eachElement in elements {
				if eachElement.containsPoint(point) {
					return eachElement
				}
			}
			return .None
		} 

		var circle : Circle
		var elephant = Elephant()
		var element = findFirstHitElement(pt, circle, elephant)


	This example uses a variable argument list and returns an optional value
	(to either return an element or not), which are discussed later in this tour.

.. refnote:: Guided Tour: Extensions

	An extension allows you to add functions or properties to an existing class or structure. As described earlier, you might use an extension to add suitable constructors to the Swift ``String`` class::

		(swift) extension String {
				  constructor(point : Point) {
					this = "{\(point.x), \(point.y)}"
				  }
				}
		(swift) 

	to make it easy to convert your own classes or structures into strings, either by constructing a ``String`` explicitly::

		(swift) String(pt)
		// String = "{4.0, 5.0}"
		(swift) 

	or implicitly with Swift's interpolation syntax::

		(swift) println("The point is \(pt)")
		The point is {4.0, 5.0}
		(swift) 

	You can also use an extension to add protocol conformance to an existing class or structure::

		(swift) extension Point : HitTestable {
				  func containsPoint(point : Point) -> Bool {
					return self.x == point.x && self.y == point.y
				  }
				}
		(swift) var testPoint = Point(5.0, 10.0)
		(swift) pt.containsPoint(testPoint)
		// false
		(swift) 

	This is particularly important for "retroactive modeling", which is important
	when you make two libraries work together, when you cannot change their code.
