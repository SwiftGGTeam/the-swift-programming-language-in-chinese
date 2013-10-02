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

.. refnote:: Language Reference: Integer Literals
  
	Definition::

		integer_literal ::= [0-9][0-9_]*
		integer_literal ::= 0x[0-9a-fA-F][0-9a-fA-F_]*
		integer_literal ::= 0o[0-7][0-7_]*
		integer_literal ::= 0b[01][01_]*

	Integer literal tokens represent simple integer values of unspecified precision. They may be expressed in decimal, binary with the ``0b`` prefix, octal with the ``0o`` prefix, or hexadecimal with the ``0x`` prefix. Unlike C, a leading zero does not affect the base of the literal.
     
	Integer literals may contain underscores at arbitrary positions after the first digit. These underscores may be used for human readability and do not affect the value of the literal.
	
	::

		789
		0789

		1000000
		1_000_000

		0b111_101_101
		0o755

		0b1111_1011
		0xFB

.. refnote:: Language Reference: Floating Point Literals

	Definition::

		floating_literal ::= [0-9][0-9_]*\.[0-9][0-9_]*
		floating_literal ::= [0-9][0-9_]*\.[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*
		floating_literal ::= [0-9][0-9_]*[eE][+-]?[0-9][0-9_]*
		floating_literal ::= 0x[0-9A-Fa-f][0-9A-Fa-f_]*
							   (\.[0-9A-Fa-f][0-9A-Fa-f_]*)?[pP][+-]?[0-9][0-9_]*

	Floating point literal tokens represent floating point values of unspecified precision. Decimal and hexadecimal floating-point literals are supported.

	The integer, fraction, and exponent of a floating point literal may each contain underscores at arbitrary positions after their first digits. These underscores may be used for human readability and do not affect the value of the literal. Each part of the floating point literal must however start with a digit; ``1._0`` would be a reference to the ``_0`` member of ``1``.
	
	::

		1.0
		1000000.75
		1_000_000.75

		0x1.FFFFFFFFFFFFFp1022
		0x1.FFFF_FFFF_FFFF_Fp1_022

	We require a digit on both sides of the dot to allow lexing ``4.km`` as ``4 . km`` instead of ``4. km`` and for a series of dots to be an operator (for ranges). The regex for decimal literals is same as Java, and the one for hex literals is the same as C99, except that we do not allow a trailing suffix that specifies a precision.

.. refnote:: Types and Values: Introduction

	Swift includes a full gamut of basic data types built into the language and
	library and provides first-class support for defining new datatypes.  This
	chapter give a brief survey of the key types built into the in Swift language
	and standard library along with some usage information.

	One interesting note is that Swift follows its naming convention (which requires
	that type names be capitalized) even for builtin datatypes.  This means that,
	for example, the default integer type is named ``Int``, not ``int``.  This is a
	benefit for consistency, and follows from the fact that Swift allows builtin
	datatypes like Int to have user-defined extensions on them, just like other
	types.

.. refnote:: Types and Values: Integer Types

	Like C, Swift supports 8, 16, 32, 64, and 128-bit integer in both signed and
	unsigned form, and supports the same basic operator set.  Swift names these
	types ``Int8``, ``UInt8``, ``Int16``, ``UInt16`` ... ``Int128``, ``UInt128``.
	To provide tidy code and optimize for the common case, Swift provides a standard
	``Int`` alias, which map to ``Int64``::

	  var x : Int8
	  var y : UInt128
	  var z : Int      // Is 64-bit.

	While Swift gives fine-grain control over integer widths, we want general code
	to just use Int as the default types everywhere.  Only code that is
	working with 8-bit bytes, 16-bit audio samples, or that is optimizing memory
	layout of arrays should worry about other widths.

	**Rationale:**  Swift eliminates the C "short" and "long" type specifiers in
	favor of explicit
	widths.  This helps make code more portable across architectures and platforms,
	makes code explicit about what it really needs, and obsoletes the wild 
	collection
	of "``int32_t``" style typedefs that are prolifically reinvented in C libraries.
	It also eliminates "char" as the name for its 8-bit type (``Char`` is distinct
	from integer types, and described later).

	Having "Int" be the one right default answer is important, and NSInteger and
	NSUInteger have worked well for Objective-C.  A 64-bit Int is large enough to
	represent all physical quantities, so we expect people to only need a specific
	custom type if they are micro-optimizing for performance or doing something with
	data that has a known range.

.. refnote:: Types and Values: No Integer Suffixes

	Swift uses type inference to know the width of integer literals, so it does not
	use suffixes like "10ull" to designate the width of a literal::

	  var x : Int128
	  var y : UInt8
	  foo(x / 42)   // 42 has type Int128
	  bar(y / 42)   // 42 has type UInt8

	Because the builtin integer types can have extensions (like any type), it is
	possible to implement "units" support in a library, allowing syntax like:

	  var distance = 42.km + 5.m

	When the language is farther along, we could consider standardizing such a
	feature as part of the standard library, or as an optional library.

.. refnote:: Types and Values: No Implicit Integer Promotions or Conversions

	Unlike C, Swift integer types do not allow silent `implicit conversions
	<http://en.wikipedia.org/wiki/Type_conversion#Implicit_type_conversion>`_ 
	between the types, so this code is diagnosed with an error::

	  var x : Int8
	  var y : Int16
	  y = x + 1          // error, type mismatch!
	  y = Int16(x + 1)   // ok!

	**Rationale:** Disallowing `implicit type conversions
	<http://en.wikipedia.org/wiki/Type_conversion#Implicit_type_conversion>`_ is a
	key decision that eliminates certain
	classes of security and functionality bugs.  We believe that several aspects of
	Swift combine to make this work well in practice (i.e., not requiring casts all
	over the place):

	  - Most code and APIs will take and work with Int.  Only code that is
		optimizing
		storage (e.g. arrays of pixel data) or that want a specific integer width
		(e.g. 16-bit sound sample processing) should use specific-width integers.
	  - Swift has strong type inference, and literals do not require suffixes.  This
		allows ``X = X+1`` to work regardless of which width or signedness X is.

	It is worth pointing out that C# also follows this design, and it has worked out
	well for them in practice.

.. refnote:: Types and Values: No Silent Truncation or Undefined Behavior

	Swift integers implicitly trap on overflow. This is a hard error. If one needs
	wrapping or truncation, then one can use the "masking" form of the arithmetic
	operator by placing an ampersand before the operator. For example::

	  var x = Int.max() + 1  // overflow trap
	  var x = Int.min() - 1  // overflow trap
	  var x = Int.max() * 2  // overflow trap
	  var x = Int.min() / -1 // overflow trap
	  var x = y / 0          // overflow trap
	  var x = y % 0          // overflow trap
	  var x = y &+ z         // "masks" the result of '+'
	  var x = y &- z         // "masks" the result of '-'
	  var x = y &* z         // "masks" the result of '*'
	  var x = y &/ z         // "masks" the result of '/'
	  var x = y &% z         // "masks" the result of '%'

	**Rationale:** Disallowing silent truncation and undefined behavior defines away
	entire classes of bugs and security problems.

	Note:

	  - The result of x &% 0 is zero.
	  - The result of x &/ 0 is zero. Trivia: This is consistent with C on PowerPC.
	  - The result of T.min() &/ -1 is T.min(). This is consistent with
		1) temporarily using a larger type and then truncating the result
		2) "-x == x" if x == T.min()

.. refnote:: Types and Values: Separators in Literals

	Swift numeric literals may contain underscores as separators. These separators
	don't affect the value of the literal, but can aid readability and make typos
	more apparent in long literals::

	  var billion = 1_000_000_000
	  var MAXINT = 0x7FFF_FFFF_FFFF_FFFF

.. refnote:: Types and Values: Floating Point Types

	Swift names its floating point types ``Float32``, ``Float64`` (and eventually
	``Float16``, ``Float80``, ``Float128``, etc).  In addition to these canonical
	names, the standard library provides aliases ``Float`` and ``Double`` (for 
	Float32 and Float64, respectively), which is what general code should use.  As
	with integers, implicit conversions between floating point types (and integer
	types) are not allowed.

	These types support the standard set of floating operations as C, and follow
	the same IEEE rules.  One extension beyond C is that Swift supports the ``%``
	operation.

	Like integer literals, floating-point literals in Swift do not require ``f``
	or ``L`` suffixes and infer their type from context::

	  // The literals inside vertexArray are automatically single-precision.
	  var vertexArray : Float32[] = [
		-1.0,    0.0,
		-0.707, -0.707,
		 0.0,   -1.0,
		 0.707, -0.707,
		 1.0,    0.0,
		 0.707, -0.707,
		 0.0,   -1.0,
		-0.707, -0.707
	  ]

	Integer literals may also infer a floating-point type from context, so the
	above could also be written::

	  var vertexArray : Float32[] = [
		-1,        0,
		-sqrt(2), -sqrt(2),
		 0,       -1,
		/* etc. */
	  ]

	Floating-point literals may also contain underscore separators::

	  var price = 1_999.99
	  var SMALLEST_DENORM = 0x0.0000_0000_0000_1p-1022

	**Rationale:** General code will use ``Float`` and ``Double`` everywhere, just
	like code uses ``float`` and ``double`` in C.

	**Commentary:** We expect Swift to interoperate with a lot of C APIs (e.g.
	CoreGraphics) that uses its own floating point value typedefs (e.g. CGFloat).
	Notably, CGFloat is target-specific and sometimes is actually 64-bits.  This
	means that, just like in C and Objective-C, that ``float`` and ``CGFloat``
	should be treated as different types by the programmer.  The decision about what
	Swift does with Float and Double is completely independent of what CGFloat does
	for a particular target architecture.

.. refnote:: Types and Values: Bool

	The ``Bool`` type has exactly two possible values: ``true`` and ``false``.  The
	type behaves the same ways as _Bool/bool do in C99 and C++, and support the same
	operators.  One notable difference between Swift and C is that the lack of
	implicit conversions to Bool mean that you cannot use integer values directly in
	control flow statements::

	  if 1 {} // error: Int is not a boolean type
	  if true {} // ok
	  if 1 != 0 {} // ok

	  var anInt : Int
	  if anInt {} // error: Int is not a boolean type
	  if anInt != 0 {} // ok

	**Rationale:** Without source-level compatibility to worry about, it is
	straight-forward to have and enforce bool cleanliness onto Swift code.  This
	defines away a large number of subtle bugs that Clang has grown warnings for
	over the years, and has very few drawbacks.

	We currently do not allow reference types in a boolean context.  We believe that
	forcing ``if obj != nil {`` instead of allowing ``if obj {`` improves readabilty
	with very little cost to expressiveness, but may reverse this if it is too
	unwieldy in practice.

.. refnote:: Types and Values: Tuples

	Swift provides built-in tuples, which make it easy to compose multiple
	values together::

	  (swift) var t1 = (3.14159, "Pi")
	  // t1 : (Double, String) = (3.14159, "Pi")

	Here, ``t1`` is a tuple containing a ``Double`` and a ``String``. One
	can access the elements using constant integer values, e.g.::

	  (swift) t1.0
	  // r0 : Double = 3.14159
	  (swift) t1.1
	  // r1 : String = "Pi"

	The elements of tuples can also be named, which makes access to them
	more readable::

	  (swift) var t2 = (value:3.14159, name:"Pi")
	  // t2 : (value : Double, name : String) = (3.14159, "Pi")
	  (swift) t2.name
	  // r2 : String = "Pi"
	  (swift) t2.value
	  // r3 : Double = 3.14159

	Tuples can be used as values anywhere, which includes using them to
	support multiple return values::

	  (swift) func divmod(x : Int, y : Int) -> (quotient : Int, remainder : Int) {
				return (x / y, x % y)
			  }
	  (swift) divmod(22, 7)
	  // r0 : (quotient : Int, remainder : Int) = (3, 1)

	Tuples also show up when using dictionaries, because iteration over a
	dictionary produces a sequence of key/value tuples::

	  (swift) var dict = ["Hello" : 1, "Swift" : 2, "World" : 3]
	  // dict : Dictionary = ["Swift" : 2, "World" : 3, "Hello" : 1]
	  (swift) for t in dict {
				print("\(t.key) => \(t.value)\n")
			  }
	  Swift => 2
	  World => 3
	  Hello => 1

	Further, one can use patterns to decompose a tuple into separate
	variables, either when declaring variables or iterating through a
	container::

	  (swift) var (quot, rem) = divmod(22, 7)
	  // (quot, rem) : (quotient : Int, remainder : Int) = (3, 1)
	  (swift) for (key, value) in dict {
				print("\(key) => \(value)\n")
			  }
	  Swift => 2
	  World => 3
	  Hello => 1

	Tuples can have any number of elements, including zero. In fact, the
	``Void`` type is simply an alias of the empty tuple type ``()``::

	  typealias Void = ()

.. refnote:: Types and Values: Enumerations

	Enumerations in Swift are described using the same ``enum`` declaration as C.
	A minor difference is that the ``case`` keyword is used to introduce enumerated
	values. A simple ``Color`` enumeration could be described as::

	  enum Color { case red, green, blue }

	The color values are accessible using the ``.`` operator::

	  var c = Color.red

	However, when there is contextual type information (e.g., we know that
	we need a ``Color`` here), we can drop the ``Color`` before the
	``.``. For example, we can re-assign ``c`` with::

	  c = .blue

	Unlike in C or C++, there are no implicit conversions between enumerations and
	integer values.  Swift enums also allow any (or all) of the cases to have
	values associated with them::

	  enum Variant {
		case integer(Int)
		case floating(Double)
		case string(String)
	  }

	To create a value, one selects one of the options (``integer``,
	``floating``, ``string``) and provides it with a value of the stored
	type::

	  var v = Variant.integer(5)
	  v = .string("hello")

	This gives an effect similar to C unions, but is type safe, meaning that one
	can only access the value corresponding to the currently active choice: if
	``v`` contains a ``string`` (at run time), then only the string value
	can be accessed. The value is accessed by pattern-matching the enum value
	in a ``switch`` statement::

	  switch v {
	  case .integer(var n):
		println("integer value \(n)")
	  case .string(var s):
		println("string value \(s)")
	  }

.. refnote:: Lexical Structure: Identifiers and Operators

	Basic identifiers (e.g. used for variable, function and type names) in Swift
	follow the regular expression ``[a-zA-Z_][a-zA-Z0-9_]*``. Unicode alphanumeric
	and combining characters can also be used in identifiers::

	  var one = 1
	  var _0 = one - one
	  var π = 3.14159

	  protocol Mathematician {
		var erdősNumber : Int
	  }

	  class Животное { }
	  class Собака : Животное { }
	  class Кошка : Животное { }

	For operators, Swift uses the ``/=-+*%<>!&|^~.`` punctuation characters in various
	combinations.

	.. TODO: DollarIdent is $[0-9a-zA-Z_$]*

.. refnote:: Lexical Structure: Integer Literals

	Literal integers may be written in decimal, hexidecimal, octal or binary form,
	following one of these regular expressions::

	   integer_literal  ::= [0-9][0-9_]*
	   integer_literal  ::= 0x[0-9a-fA-F][0-9a-fA-F_]*
	   integer_literal  ::= 0o[0-7][0-7_]*
	   integer_literal  ::= 0b[01][01_]*

	Unlike in C, integers that start with a 0 (such as ``01234``) are not implicitly
	octal.  This means that ``01234 == 1234`` in Swift, not ``01234 == 668`` as in
	C.  To write an octal identifier, you must use the 0o prefix (e.g. ``0o1234``)
	which makes the code more explicit and avoids a class of accidental errors.

	If no other type is inferred, integer literals default to type ``Int``.  These
	are equivalent::

	  var x = 4
	  var x : Int = 4

	Swift does not use suffixes (e.g. `42ULL`) to denote literals of a specific
	type.  These are generally unnecessary with Swift's strong type inference, and
	an explicit type can be provided with a type cast if needed.  These
	are three equivalent ways to achieve the same thing::

	  var x1 : Int8 = 4
	  var x2 = Int8(4)
	  var x3 : Int8; x3 = 4

	Swift allows the use of the underscore character as a digit separator,
	so you can write large, easy to read literals, such as ``1_000_000``.

.. refnote:: Lexical Structure: Floating Point Literals

	Floating point literals follow one of these regular expressions::

	   floating_literal ::= [0-9][0-9]_*\.[0-9][0-9_]*
	   floating_literal ::= [0-9][0-9]*\.[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*
	   floating_literal ::= [0-9][0-9_]*[eE][+-]?[0-9][0-9_]*
	   floating_literal ::= 0x[0-9A-Fa-f][0-9A-Fa-f_]*
							  (\.[0-9A-Fa-f][0-9A-Fa-f_]*)?[pP][+-]?[0-9][0-9_]*

	We require a digit on both sides of the dot to allow lexing ``4.km`` as
	``4 . km`` instead of ``4. km`` and for a series of dots to be an operator (for
	ranges).  The regex for decimal literals is same as Java, and the one for
	hex literals is the same as C99, except that we do not allow a trailing
	suffix that specifies a precision.

	If no type is inferred, floating point literals default to having type
	``Double``.  As with integer literals, suffixes are not used to select specific
	types (e.g. ``0.1f`` in C).

	As with integer literals, underscores may be used as separator characters
	in arbitrary positions, such as ``3.1415_9265_359`` to improve
	readability.

.. refnote:: Guided Tour: Declaration syntax

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

.. refnote:: Guided Tour: Tuples

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

.. refnote:: Guided Tour: Enums

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
