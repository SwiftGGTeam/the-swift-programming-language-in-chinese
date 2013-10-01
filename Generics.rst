Generics
========

.. docnote:: Generics

	I've given generics their own chapter, as the ability to define one's own generics (in addition to the library-provided ones) is such a powerful part of Swift. I've also included Delayed Identifier Resolution here, as it feels conceptually like part of Swift's ability to deal with types in a generic way.

.. docnote:: Subjects to be covered in this section

	* Vector
	* Array
	* Dictionary
	* (any other generics from the Standard Library)
	* Typing of generics
	* Working with subscripts
	* Creating generic functions, classes etc.
	* Delayed Identifier Resolution

.. refnote:: Types and Values: Arrays

	Swift provides support for creating and manipulating arrays. Arrays can
	be created with the ``new`` operator::

	  (swift) var array = new Int[10]
	  // array : Int[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

	One can use subscripting to access or modify elements of
	the array. This operation is bounds-checked to provide memory safety::

	  (swift) for i in 0..10 { array[i] = i }
	  (swift) array
	  // array : Int[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

	The type ``Int[]`` is an array *slice* with elements of type ``Int``,
	meaning it refers to all or part of an existing array. For example, if
	one assigns it to another variable, only the reference is copied: the
	two slices share the same underlying data::

	  (swift) var array2 = array
	  // array2 : Int[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
	  (swift) array2[0] = 11
	  (swift) array2
	  // array2 : Int[] = [11, 1, 2, 3, 4, 5, 6, 7, 8, 9]
	  (swift) array
	  // array : Int[] = [11, 1, 2, 3, 4, 5, 6, 7, 8, 9]

	As implied by the name, array slices can themselves be sliced by
	subscripting with an index range. For example, one can select the
	elements from index 3 to index 7 (noninclusive) with::

	  (swift) array[3..7]
	  // r1 : Int[] = [3, 4, 5, 6]

	Arrays can also be constructed with array literals, which are
	comma-separted lists of array elements enclosed in square brackets::

	  (swift) array = [1, 1, 2, 3, 5, 8]
	  (swift) array
	  // array : Int[] = [1, 1, 2, 3, 5, 8]

.. refnote:: Guided Tour: Generics

	Swift supports generics through parameterized types. As an example, the standard library includes the ``Vector`` class, which makes it easy to work with typed collections (though it is important to note that the entire standard library is at best a strawman design right now)::

		(swift) var names = Vector<String>()
		// names : Vector<String> = <unprintable value>
		(swift) names.append("William")
		(swift) names.append("Hilary")
		(swift) names.append("Carlton")
		(swift) 

	This vector can only be used with ``String`` elements; you'll get an error if you attempt to insert anything else, like an integer.

	Swift generics offer transparent support for both class and value types without the need for boxing. This means you can work with a collection of integer values, for example, in exactly the same way as you would work with a collection of objects:

	.. code-block:: swift

		var intCollection = Vector<Int>()
		intCollection.append(42)
		intCollection.append(314)
	
		class Test { .. }
		var testCollection = Vector<Test>()
		testCollection.append(Test())
		testCollection.append(Test())

	It's even safe in Swift to mix by-reference and value types if you use a protocol for a parameterized type declaration::

		(swift) protocol Workable {
				  func work()
				}
		(swift) class Foo : Workable {
				  func work() {
					println("A foo is working")
				  }
				}
		(swift) struct Bar : Workable {
				  func work() {
					println("A bar is working")
				  }
				}
		(swift) extension Int : Workable {
				  func work() {
					println("An integer is working")
				  }
				}
		(swift) var foo = Foo()
		// foo : Foo = <unprintable value>
		(swift) var bar : Bar
		(swift) var workers = Vector<Workable>()
		// workers : Vector<Workable> = <unprintable value>
		(swift) workers.append(foo)
		(swift) workers.append(bar)
		(swift) workers.append(42)
		(swift) for eachThing in workers {
				  eachThing.work()
				}
		A foo is working
		A bar is working
		An integer is working
		(swift) 

	Swift makes it easy to create your own parameterized types, like this simple implementation of a stack class::

		(swift) class Stack<Type> {
				  var elements : Vector<Type>
				  constructor() {
					elements = Vector<Type>()
				  }
				  func push(element : Type) {
					elements.append(element)
				  }
				  func pop() -> Type {
					assert(elements.length > 0, "can't pop an empty stack")
					var tmp = elements[elements.length - 1]
					elements.popBack()
					return tmp
				  }
				}
		(swift) 

	As with a Swift ``Vector``, this generic ``Stack`` class is unrestricted, which means you can create an instance of the class to hold any first class type, including value and by-reference types::

		(swift) var intStack = Stack<Int>()
		// intStack : Stack<Int> = <unprintable value>
		(swift) intStack.push(1)
		(swift) intStack.push(5)
		(swift) intStack.pop()
		// Int = 5
		(swift) intStack.pop()
		// Int = 1
		(swift) var stringStack = Stack<String>()
		// stringStack : Stack<String> = <unprintable value>
		(swift) stringStack.push("bye")
		(swift) stringStack.push("hello")
		(swift) stringStack.pop()
		// String = "hello"
		(swift) stringStack.pop()
		// String = "bye"
		(swift) 

	Definining a type or algorithm to take any type means that you only have access to basic operations that all types support, like copyability.

	In order to use more specific behavior, you need to indicate which behavior the data structure requires. If you require a ``work()`` function, for example, just indicate that that the type should conform to the ``Workable`` protocol::

		(swift) class Workforce<Type : Workable> {
				  var workers : Vector<Type>
				  func startWorking() {
					for eachWorker in workers {
					  eachWorker.work()
					}
				  }
				}
		(swift) 

	Once you have generic data structures, you'll likely need to be able to implement generic algorithms to act on them. As an example, first consider a trivial non-generic function to find the index of a string in an array of strings::

		(swift) func findIndexOfString(strings : String[], searchString : String) -> Int {
				  for index in 0..strings.length {
					if strings[index] == searchString {
					  return index
					}
				  }
				  return -1
				}
		(swift) 

	Without generics, you'd need to write an identical function for each type you wanted to support---``findIndexOfInt()``, ``findIndexOfFloat``, etc.

	Swift makes it easy to write a generic version, which works with any element that supports an equality test::

		(swift) func findIndexOf<Type : Equatable>(elements : Type[], searchElement : Type) -> Int {
				  var index = 0
				  for eachElement in elements {
					if eachElement == searchElement {
					  return index
					}
					++index
				  }
				  return -1
				}
		(swift) 

	Test this with an array of integers::

		(swift) var integers = [1,2,3,4,5]
		// integers : Int[] = [1, 2, 3, 4, 5]
		(swift) findIndexOf(integers, 4)
		// Int = 3
		(swift) 

	(Note, the Swift standard library already includes a ``find()`` function, as well as other useful generic functions like ``min()``, ``max()``, ``map()``, ``swap()``, and the ``sort()`` function described earlier in the Closures section. *FIXME: Not all of these have been genericized yet*)
