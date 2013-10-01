Basic types
===========

.. docnote:: Subjects to be covered in this section

	* Declaration syntax
	* Naming conventions
	* Integer types
	* Floating point types
	* Bool
	* Void
	* No suffixes for integers / floats
	* Lack of promotion and truncation
	* Lazy initialization
	* A brief mention of characters and strings
	* Tuples
	* Enums
	* Enum element patterns
	* Typealiases
	* Type inference
	* Type casting through type initializers
	* Metatypes and static functions on types
	* Optional types
	* Pattern binding
	* Literals

.. docnote:: Metatypes and static functions

	Is this the right section for metatypes and static functions? My understanding (from an initial reading) is that they are roughly analogous to class methods in Objective-C, but can be implemented on any type; however, this may be a slightly over-complex concept for this early in the book.


Declaration syntax
------------------

.. refnote:: From the Guided Tour:

	In addition to the primary goals like safety and performance, Swift was also designed with consistency and clarity in mind. Wherever possible, the syntax follows the natural language order of expressing something. A variable declaration reads as *"declare a variable called X of type Y with initial value Z"*.

	Let's start by declaring a variable ``a`` of type ``Int`` with an initial value of ``42``::

		Welcome to swift.  Type ':help' for assistance.
		(swift) var a : Int = 42
		// a : Int = 42
		(swift)   

	Note that ``Int`` is capitalized. Swift follows the Objective-C naming convention consistently for all type names, including built-in types like ``Int`` and ``String``.

	As mentioned earlier, you can omit the type and it will be inferred automatically from the assigned value::

		(swift) var b = 10
		// b : Int = 10 
		(swift) 

	Variables can also be named using non-English letters::

		(swift) var 你好 = "你好世界"
		// 你好 : String = "你好世界"
		(swift) var π = 3.1415926535
		// π : Double = 3.14159

	The standard operators work as expected (note that Swift relies on consistent spacing around operators; see Statements and Expressions for the rationale)::

		(swift) var c = a + b
		// c : Int = 52
		(swift) c - b * a
		// Int = -368
		(swift) sin(π/2)
		// r1 : Double = 1.0

Tuples
------

.. refnote:: From the Guided Tour:

	As well as simple value types, Swift also supports tuple types for ordered lists of elements.  The elements may be accessed with constant numeric indices::

		(swift) var t = (100, 200, 300)
		// t : (Int, Int, Int) = (100, 200, 300)
		(swift) t.0 + t.1 + t.2
		// r5 : Int = 600
		(swift)

	In this case, ``t`` is a 3-element tuple with integer values. A tuple can also have elements with different types::

		(swift) var u = (1, "hello", 3.14159)
		// u : (Int, String, Double) = (1, "hello", 3.14159)
		(swift) println(u.1)
		hello
		(swift) println(u.2)
		3.14159
		(swift)

	Tuples are useful in a variety of situations; Swift uses them as the foundation for passing arguments and returning values, for example. You can extract the elements into individual values::

		(swift) var (v, w, x) = u
		// (v, w, x) : (Int, String, Double) = (1, "hello", 3.14159)
		(swift) v
		// Int = 1
		(swift) w
		// String = "hello"
		(swift) x
		// Double = 3.14159
		(swift) 

	Alternatively, you can name the elements in a tuple::

		(swift) var y = (foo: 1, bar: "hello", baz: 3.14159)
		// y : (foo : Int, bar : String, baz : Double) = (1, "hello", 3.14159)
		(swift) 

	to make it even easier to extract or change the values::

		(swift) y.foo
		// Int = 1
		(swift) y.baz
		// Double = 3.14159
		(swift) y.bar = "bye"
		(swift) y
		// (foo : Int, bar : String, baz : Double) = (1, "bye", 3.14159)

Enums
-----

.. refnote:: From the Guided Tour:

	Swift supports ``enum`` types. Values of the enum are introduced with the
	``case`` keyword, and are scoped inside the enum type::

	  (swift) enum Color {
				case Red, Green, Blue
			  }
	  (swift) var c = Color.Green
	  // c : Color = .Green

	The type name can also be inferred from context if a case is referenced by a
	leading dot::

	  (swift) c = .Blue
	  (swift) c
	  // c : Color = .Blue

	Enum values can be used in ``switch`` statements, including in patterns. The
	compiler enforces exhaustiveness::

	  (swift) switch c {
			  case .Blue:
				println("blue")
			  case .Red:
			  case .Green:
				println("not blue")
			  }
	  blue

	Unlike a C enum, the cases of a switch don't need to be purely symbolic.
	A case can have data associated with itself::

	  (swift) union Path {
				case Point(Int, Int)
				case Line((Int, Int), (Int, Int))
			  }
	  (swift) var p : Path = .Point(0, 0)
	  // p : Path = .Point(0, 0)

	This data can then be pattern-matched and accessed when the case itself is
	matched::

	  (swift) func pathLength(p:Path) -> Double {
				switch p {
				case .Point(_):
				  return 0
				case .Line((var fx, var fy), (var tx, var ty)):
				  var dx = tx - fx
				  var dy = ty - fy
				  return sqrt(Double(dx*dx), Double(dy*dy))
				}
			  }
	  (swift) pathLength(.Point(219, 0))
	  // r0 : Double = 0
	  (swift) pathLength(.Line((0, 0), (3, 4)))
	  // r0 : Double = 5
