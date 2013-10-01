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
