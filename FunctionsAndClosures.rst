Functions and Closures
======================

.. docnote:: Functions and closures

	I've grouped functions and closures into a single chapter, as they are so closely interlinked (and frequently interchangeable) in Swift. This also gives us a good opportunity to discuss when it is best to use each approach.

.. docnote:: Subjects to be covered in this section

	* Functions
	* Function signatures (including pattern matching)
	* Naming conventions
	* Closures
	* Trailing closures
	* Can only have one variadic parameter
	* Nested closures
	* Capturing values
	* Different closure expression forms
	* Anonymous closure arguments
	* Thick and thin functions (?)
	* Attributes (infix, resilience, inout, auto_closure, noreturn)
	* Typedefs for closure signatures to aid readability?

.. refnote:: Types and Values: Functions

	Swift provides first-class functions. A variable or parameter of
	function type can accept any function or closure of the same function
	type. For example, one can implement a ``reduce()`` function that
	combines the results of performing an operation to all of the integers
	in an array::

	  (swift) func reduce(values : Int[], init : Int, fn : (Int, Int) -> Int) -> Int { 
				var result = init
				for v in values {
				  result = fn(result, v)
				}
				return result
			  }

	The ``fn`` parameter is a function that takes two ``Int`` values and
	returns an ``Int``. It can be supplied with different functions to
	change the behavior of the reduction::

	  (swift) func add(x : Int, y : Int) -> Int { return x + y }
	  (swift) reduce([1, 2, 3, 4, 5], 0, add)
	  // r0 : Int = 15
	  (swift) func mul(x : Int, y : Int) -> Int { return x * y }
	  (swift) reduce([1, 2, 3, 4, 5], 1, mul)
	  // r1 : Int = 120

	Anonymous functions can also be written directly as expressions, in
	which the parameter and return types are optional::

	  (swift) reduce([1, 2, 3, 4, 5], 0, func (x : Int, y : Int) -> Int { 
				  return x + y
				})
	  // r2 : Int = 15
	  (swift) reduce([1, 2, 3, 4, 5], 1, func (x, y) { return x * y })
	  // r4 : Int = 120

	Anonymous functions--or, more specifically, closures--are described
	in greater detail in a later chapter Closures.

.. refnote:: Closures: Introduction

	Closures provide the ability to define function bodies inside of other existing
	functions, while allowing the inner function to refer (and capture) state from
	the outer function.  Closures are an essential part of many modern programming
	languages, key to many expressive `functional and higher-order programming
	<http://en.wikipedia.org/wiki/Functional_programming>`_ idioms, and come in a
	variety of forms.

	An implementation of closures was brought to Objective-C in the form of
	"Blocks". This has been a highly successful extension to Objective-C, making
	APIs like GCD practically usable and solving a number of framework "callback"
	design problems.  That said, retrofiting them into the design of C induced a
	number of limitations on Blocks, leaving us with several unfortunate
	compromises.

	In Swift, we aim to not only to learn from and solve long standing problems
	with Blocks, but also to really redefine the expressive potential you can get in
	the language, aiming to best languages like Ruby in expressiveness.  Some
	specific goals we have are:

	 - Memory safety: no manual Block_copy, no dangling references to the stack,
	   etc.
	 - Integrate perfectly with existing blocks-based APIs.
	 - Unify functions and closures into one concept: no "function pointer" vs
	   "block pointer" choices should be necessary (qsort vs qsort_b).
	 - Closures should infer types from their context, eliminating redundancy in
	   closure definitions.
	 - Capturing should be simple and natural, not requiring programmer
	   micro-annotation with __block.
	 - Fix long-standing bugs like rdar://8812224&8861162, allow closures to be
	   "named" so they show up in stack traces, etc.

	And again, we want generally great syntax, and tight integration with the larger
	language and its goals.  With that as context, lets talk about closures in
	Swift.

.. refnote:: Closures: Functions vs Closures

	Swift makes the observation that functions and closures are fundamentally the
	same thing: functions are just a (really common!) special case of a closure that
	does not close over any variables.  As such, we unify the concepts, runtime
	layout, and syntax for both functions and closures - and the language refers to
	them as "functions" for simplicity.

	Functions and closures have two pieces: the syntax for declaring a *body*, and
	the syntax used for declaring a *type* of a variable.  A very simple example
	is::

	  // Trivial functions/closures that don't capture any state.
	  func add(a : Int, b : Int) -> Int { return a+b }
	  func sub(a : Int, b : Int) -> Int { return a-b }

	  // Declaring a "function/closure pointer".
	  var fp : (Int, Int) -> Int
  
	  // Assignments work as you'd expect.
	  fp = add   // ok
	  fp = sub   // ok
	  fp = (+)   // ok - binary plus of Int chosen by type signature of 'fp'
  
	  // Call the function.
	  var result = fp(1,2)

	Note first that function definitions and function types both use the same 
	"``input -> result``" syntax (the arrow can be read aloud as "returning").  
	These examples contain no closures (and in fact,
	global functions can refer to global variables without needing to "close" over
	anything), but the point is that the function type works with both simple
	functions like these as well as full-blown closures.

.. refnote:: Closures: Nested Functions

	The simplest form of a closure in Swift is a nested function.  Lets look at a
	more interesting example than the one above::

	  (swift) func makeIncrementor(inc : Int) -> () -> Int {
				var sum : Int
				func inner() -> Int {
				  sum += inc
				  return sum
				}
				return inner
			  }

	  (swift) var fp = makeIncrementor(1)
	  // fp : () -> Int = <unprintable value>
	  (swift) fp()
	  // Int = 1
	  (swift) fp()
	  // Int = 2
	  (swift) fp()
	  // Int = 3

	  (swift) fp = makeIncrementor(10)
	  (swift) fp()
	  // Int = 10
	  (swift) fp()
	  // Int = 20
	  (swift) fp()
	  // Int = 30

	This example demonstrates a few interesting things: first, Swift supports nested
	functions.  Among other things, this provides a simple form of name hiding: the
	"inner" function is inaccessible outside of the "makeIncrementor" function.

	More interesting is that "inner" very naturally closes over the "sum" and "inc"
	variables, automatically manages their lifetime, and has mutable access to the
	"sum" variable with no special syntax required.  Swift leaves it up to the
	compiler to know that it can capture "inc" by value but must capture "sum" by
	reference because it mutates.

	Nested functions have the advantage that their name shows up visibly in stack
	traces (making it easy to track down where they came from) and they make
	recursive closures easy to write.  That said, they are a syntactically
	heavy-weight construct, and sometimes you *don't* want to have to come up with a
	name for a closure.

.. refnote:: Closures: Closure Expressions

	Closure expressions are used when you want to define a closure inline
	with another expression or statement, often as a function argument.
	For example, say you're working with an array of strings::

	  (swift) var s = ["foo", "Baz", "bar" ]
	  // s : String[] = ["foo", "Baz", "bar" ]
	  (swift) sort(s)
	  // String[] = ["Baz", "bar", "foo"]

	The standard library-defined sort function defaults to sorting strings in
	lexicographic order.  If that isn't right for your application, you can specify
	a function or closure to specify a better ordering.  For example, if you want to
	sort backwards, you can do so with a function::

	  (swift) func backward(lhs : String, rhs : String) -> Bool { return rhs < lhs }
	  (swift) sort(s, backward)
	  // String[] = ["foo", "bar", "Baz"]

	... but this is a natural place to use a closure expression.  This can be done
	with a closure expression, which is an (anonymous) function body whose
	parameter are specified within the curly braces::

	  (swift) sort(s, { (lhs : String, rhs : String) -> Bool in
				return rhs < lhs 
			  })
	  // String[] = ["foo", "bar", "Baz"]

	Of course, it is obvious from context what the type of the arguments and results
	should be and Swift has a really powerful system of type inference.  This means
	the much more natural form "just works" as you would expect::

	  (swift) sort(s, { (lhs, rhs) in
				return rhs < lhs 
			  })
	  // String[] = ["foo", "bar", "Baz"]

	[Tool P]-based sorting is useful for lots of different kinds of scenarios, for
	example, a case-insensitive sort can be expressed simply as::

	  (swift) sort(s, { (lhs, rhs) in
				return lhs.toLower() < rhs.toLower() 
			  })
	  // String[] = ["bar", "Baz", "foo"]

	Functional programming idioms like "map" and "reduce" can be really powerful
	when combined with advanced data structures, and tuples, and are a highly touted
	feature of Ruby (among many other languages).  These features combine to
	directly lead one to want to define lots of small closures whose meaning is
	obvious from context. Swift's closure expressions have two additional
	syntactic optimizations for small closures: single-expression closures
	can omit the ``return``, and closures can use anonymous, numbered
	parameters ``$0``, ``$1``, etc. rather than explicitly writing a
	parameter list. The following syntactically-minimal closure expressions
	provide the same behavior as the previous two examples::

	  (swift) sort(s, { $1 < $0 })
	  // String[] = ["foo", "bar", "Baz"]
	  (swift) sort(s, { $0.toLower() <$1.toLower() })
	  // String[] = ["bar", "Baz", "foo"]

	Other examples include::

	  (swift) s.each({ println($0) })
	  foo
	  Baz
	  bar
	  (swift) map(s, { $0.toUpper() })
	  FOO
	  BAZ
	  BAR
	  (swift) dispatch_once({ print("hello on the first time\n") })
	  hello on the first time

.. refnote:: Closures: Trailing Closures

	By convention, functions that accept closures typically have the
	closure as the last argument. Swift allows such closures to be written
	after the function call::

	  (swift) sort(s) { (lhs, rhs) in
				return lhs.toLower() < rhs.toLower() 
			  }
	  // String[] = ["bar", "Baz", "foo"]

.. refnote:: Guided Tour: Functions

	As with variable declaration syntax, Swift function declarations follow the natural language order of "declare a function X, which takes arguments Y, and returns Z." Continuing the theme of consistency, Swift function argument syntax follows the syntactic pattern of a variable declaration, where the colon ``:`` means "of type"::

		(swift) func fibonacci(n : Int) -> Int {
		            if n < 2 {
		        return 1
		             } else {
		        return fibonacci(n - 2) + fibonacci(n - 1)
		             }
		        }
		(swift) fibonacci(10)
		// Int = 89

	Argument names are part of the signature, so you can specify each parameter by name when calling the function, either for clarity, or to supply parameters in a different order::

		(swift) func divideTwoNumbers(numerator : Float, denominator : Float) -> Float {
		            assert(denominator != 0)
		            return numerator / denominator
		        }
		(swift) divideTwoNumbers(4, 5)
		// Float = 0.8
		(swift) divideTwoNumbers(denominator: 5, numerator: 4)
		// Float = 0.8

	And, in the same way that you can assign a value as part of a variable declaration, you can also specify a default value for an argument::

		(swift) func sayHello(name : String = "World") {
		            print("Hello, \(name)!\n")
		        }
		(swift) sayHello("Bob")
		Hello, Bob!
		(swift) sayHello()
		Hello, World!

	If you omit the return type, as with this ``sayHello()`` function, the default is Void. To return multiple values from a function, just return a multi-element tuple::

		(swift) func fetchLocalGasPrices() -> (Float, Float, Float) {
		            return (3.59, 3.69, 3.79)
		        }

	You can even name the elements in the tuple to make it easier to query the values::

		(swift) func fetchBetterGasPrices() -> (regular : Float, midgrade : Float, premium : Float) {
		            return (3.49, 3.59, 3.69)
		        }
		(swift) fetchBetterGasPrices().midgrade
		// Float = 3.59

.. refnote:: Guided Tour: Closures

	A closure is just a function without a name. As an example, the ``sort()`` library function takes an array of strings and sorts them using a comparison closure::

		(swift) var strings = ["Hello", "Bye", "Good day"]
		// strings : String[] = ["Hello", "Bye", "Good day"]
		(swift) var sortedStrings = sort(strings, {
					(lhs : String, rhs : String) -> Bool in
					return lhs.toUpper() < rhs.toUpper()
				  })
		// sortedStrings : String[] = ["Bye", "Good day", "Hello"]
		(swift) for eachString in sortedStrings {
				  println(eachString)
				}
		Bye
		Good day
		Hello
		(swift)

	The closure in this example is described in curly braces:

	.. code-block:: swift

		{ 
		  (lhs : String, rhs : String) -> Bool in
		  return lhs.toUpper() < rhs.toUpper() 
		}

	The parentheses denote the parameters of the closure, followed by the
	return type, then "in" to separate the signature of the closure from
	its body. As you've already seen throughout this tour, the types in a Swift expression can be omitted if they can be inferred from the context. In this case, the parameter and return types can be inferred, so aren't necessary::

		(swift) sortedStrings = sort(strings, { (lhs, rhs) in
				  return lhs.toUpper() < rhs.toUpper() 
				})
		(swift) 

	One can also omit the names of the parameters, using the positional
	placeholders ``$0``, ``$1``, and so on. The ``return`` can also be
	omitted from single-expression closures, as in::

		(swift) sortedStrings = sort(strings, {$0 < $1})
		(swift) 

	Closures can also capture any variable from the local scope::

		(swift) var uppercase = true
		// uppercase : Bool = true
		(swift) sortedStrings = sort(strings, { (x, y) in 
					if uppercase {
					  x = x.toUpper()
					  y = y.toUpper()
					}
					return x < y
				  }
				)
		(swift) 

	Note that if a closure captures a value, Swift automatically manages the storage of the original variable such that you can change the value from within the closure without the need for any keywords on the original declaration. Internally, Swift also makes sure that if the closure outlives the scope of the original variable declaration, everything still "just works":

	.. code-block:: swift

		var someValue = 42
	
		dispatch_async(someQueue, {
			println("Value is \(someValue)")
			someValue += 1
		})

	Closures are typically the last argument to a function. In such cases,
	one can place the closure outside of the parentheses:

	.. code-block:: swift

		var someValue = 42
	
		dispatch_async(someQueue) {
			println("Value is \(someValue)")
			someValue += 1
		}
	
	For longer closures, or cases where the same function will be re-used
	several times, you may prefer to use a local function instead::

		(swift) func compareStrings(lhs : String, rhs : String) -> Bool {
				  if uppercase {
					lhs = lhs.toUpper()
					rhs = rhs.toUpper()
				  }
				  return lhs < rhs
				}
		(swift) sortedStrings = sort(strings, compareStrings)
		(swift) 

	A closure argument to a function is just like any other argument, with a colon ``:`` "is a," followed by the function arguments and return type::

		(swift) func repeat(count : Int, myClosure : () -> Void) {
				  for i in 0..count {
					myClosure()
				  }
				}
		(swift) repeat(3, {println("Hello!")})
		Hello!
		Hello!
		Hello!
		(swift) 

