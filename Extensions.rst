Extensions
==========

.. docnote:: Subjects to be covered in this section

	* Extending classes and structures
	* Start by extending an existing thing to have something it didn't
	* Continue by extending String to have an initializer for something it doesn't by default

.. docnote:: Extensions and protocols

	I'm wondering whether extensions and protocols should be combined into a single chapter, or indeed if they should be part of a super-chapter with Classes, Objects and Structs.
	
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
