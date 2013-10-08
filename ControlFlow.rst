Control flow
============

.. docnote:: Control flow

	Some aspects of control flow will already have been introduced before this chapter as part of the language tour. I'm envisaging that the basic flow control introduced in that chapter will provide enough flexibility to get us through the chapters on types, operators, strings and generics, before going into much more detail on all the possibilities here.

.. docnote:: Subjects to be covered in this section

	* Conditional branching (if)
	* Looping (while, do while, for, for in)
	* Iterators
	* Switch statement (including pattern matching)
	* Pattern matching on classes?
	* Control transfer (return, break, continue, fallthrough)
	* Ranges
	* Clarity around half-closed (1..10) and closed (1...10) ranges

.. refnote:: Guided Tour: Branching and Looping

	Swift supports the usual conditional and flow control statements. Parentheses are optional around conditions, but braces are required to avoid ambiguity issues like the dangling else problem, so a typical branch looks like this::

		(swift) if a == 42 {
		            println("it's magic")
		        } else {
		            println("it's just a number")
		        }
		it's magic
		(swift) 

	The ``println()`` function is an alternative to ``print()`` that automatically inserts a final ``\n`` newline.

	As you saw in the earlier Objective-C example, Swift provides a for-each-style loop to make it easy to iterate over the contents of a collection. To test this, try iterating over the characters in a string, like this::

		(swift) for eachCharacter in "Hello".chars {
		            println(eachCharacter)
		        }
		H
		e
		l
		l
		o
		(swift) 


	.. note:: If you're wondering why/how this works, it's because ``String`` adopts the ``Enumerable`` protocol. `Protocols`_ are covered later in this tour.

	Also try the ``..`` operator, which generates a half-open enumerable range between two values::

		(swift) for index in b..15 {
		            println(index)
		        }
		10
		11
		12
		13
		14
		(swift) 

	As before, there's no need to provide a type for the loop variable because it can be inferred from the elements in the range, which is itself of type ``IntEnumeratorType``::

		(swift) b..a
		// IntEnumeratorType =  10..42

	The b..a syntax also works great with NSRange, providing natural and elegant syntax for many common idioms.

	Some enumerable types use a tuple rather than a single loop variable. If you iterate over a Swift ``Dictionary``, for example, you have access to each key and value through a tuple pair::

		(swift) var dict = ["first" : 1, "second" : 2, "third" : 3]
		// dict : Dictionary = <swift.Dictionary instance>
		(swift) for (key, value) in dict {
		            println("Key: '\(key)', Value: \(value)")
		        }
		Key: 'first', Value: 1
		Key: 'second', Value: 2
		Key: 'third', Value: 3

.. refnote:: Guided Tour: Switch

	Swift supports a switch statement superficially similar to the one in C::

		(swift) switch 5 {
				case 2:
				case 3:
				case 5:
				case 7:
				  println("prime")

				default:
				  println("not prime, or greater than 7")
				}
		prime

	Note that, unlike C, you do not need to "break" out of cases. Consecutive
	case labels all apply to the next block of statements, and the block ends
	with the next case, default, or closing brace, at which point control moves
	out of the switch. You can however explicitly continue execution using the
	"fallthrough" statement if that's what you want::

		(swift) switch 5 {
				case 2:
				case 3:
				case 5:
				case 7:
				  println("prime")
				  fallthrough

				default:
				  println("integer")
				}
		prime
		integer

	As shorthand, you can also specify multiple values in a single case separated
	by commas::

		(swift) switch 5 {
				case 2, 3, 5, 7:
				  println("prime")
				  fallthrough

				default:
				  println("integer")
				}
		prime
		integer

	Swift's switch is considerably more powerful than C's. For one thing, it
	can be used with non-integer types::

		(swift) for fruit in ["orange", "key", "cherry", "strawberry"] {
				  switch fruit {
				  case "cherry":
					println("100 pts")
				  case "strawberry":
					println("300 pts")
				  case "orange":
					println("500 pts")
				  default:
					println("not a fruit")
				  }
				}
		500 pts
		not a fruit
		100 pts
		300 pts

	Values can also be tested for inclusion in a range::

		(swift) func naturalCount(x:Int) -> String {
				  switch x {
				  case 0:
					return "no"
				  case 1:
					return "one"
				  case 2:
					return "a couple of"
				  case 3..12:
					return "a handful of"
				  case 12..100:
					return "dozens of"
				  case 100..1000:
					return "hundreds of"
				  case 1000..1000000:
					return "thousands of"
				  default:
					return "bajillions of"
				  }
				}
		(swift) println("There are \(naturalCount(8)) planets in the solar system!")
		There are a handful of planets in the solar system!
		(swift) println("There are \(naturalCount(1024)) bytes in a kilobyte!")
		There are thousands of bytes in a kilobyte!

	Multiple values can be tested at once in the same switch using tuples. Each
	element of a tuple may be individually tested against a literal value, a range,
	or ignored using the special ``_`` identifier::

		(swift) func classifyPoint(x:Int, y:Int) {
				  switch (x, y) {
				  case (0, 0):
					println("origin")
				  case (_, 0):
					println("on the X axis")
				  case (0, _):
					println("on the Y axis")
				  case (-10..10, -10..10):
					println("near the origin")
				  default:
					println("far from the origin")
				  }
				}
		(swift) classifyPoint(0, 0)
		origin
		(swift) classifyPoint(2, 0)
		on the X axis
		(swift) classifyPoint(0, 100)
		on the Y axis
		(swift) classifyPoint(-5, 5)
		near the origin
		(swift) classifyPoint(-5, 50)
		far from the origin

	Variables can be bound to individual tuple elements, which then
	become available in the scope of the following case. Additional conditions for
	a case may be tested using a ``where`` expression::

		(swift) func classifyPoint2(p:(Int, Int)) {
				  switch p {
				  case (0, 0):
					println("origin")
				  case (_, 0):
					println("on the X axis")
				  case (0, _):
					println("on the Y axis")
				  case (var x, var y) where x == y:
					println("on the + diagonal")
				  case (var x, var y) where x == -y:
					println("on the - diagonal")
				  case (-10..10, -10..10):
					println("near the origin")
				  case (var x, var y):
					println("\(sqrt(x*x + y*y)) units from the origin")
				  }
				}
		(swift) classifyPoint2(1, 1)
		on the + diagonal
		(swift) classifyPoint2(-1, 1)
		on the - diagonal
		(swift) classifyPoint2(30, 40)
		50 units from the origin
