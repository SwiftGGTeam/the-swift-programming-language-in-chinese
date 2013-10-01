Functions and closures
======================

.. docnote:: Functions and closures

	I've grouped functions and closures into a single chapter, as they are so closely interlinked (and frequently interchangeable) in Swift. This also gives us a good opportunity to discuss when it is best to use each approach.

.. docnote:: Subjects to be covered in this section

	* Functions
	* Function signatures (including pattern matching)
	* Naming conventions
	* Closures
	* Trailing closures
	* Nested closures
	* Capturing values
	* Different closure expression forms
	* Anonymous closure arguments
	* Thick and thin functions (?)
	* Attributes (infix, resilience, inout, auto_closure, noreturn)

Functions
---------

.. refnote:: From the Guided Tour:

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


Closures
--------

.. refnote:: From the Guided Tour:

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

