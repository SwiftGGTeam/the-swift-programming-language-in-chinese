A Guided Tour of the Swift Language
===================================

Tradition suggests that the first program in a new language
should print the words “Hello, world” on the screen.
In Swift, this can be done in a single line:

.. K&R uses “hello, world”.
   It seems worth breaking with tradition to use proper casing.

.. testcode:: hello-world

   -> println("Hello, world")
   << Hello, world

If you have written code in a language like C or Objective-C,
this syntax probably looks familiar to you.
Unlike those languages,
this line of Swift code is a complete program.
There is no need to import a standard library for functionality like
input/output or string handling.
Code written at global scope is used
as the entry point for the program,
so there is no need for a ``main`` function.
Also notice that there are no semicolons.
You can use semicolons to separate statements written on a single line,
but otherwise there is no need to mark the end of a statement or line.

The rest of this tour shows examples
of how to accomplish a variety of programming tasks in Swift
without giving an explanation of the concepts.
It gives you a broad (but shallow) overview of the language
to help you start writing actual code.
Don’t worry if there is something that you don’t understand ---
everything introduced in this tour
is explained in detail in the following chapters.
Experienced programmers may find that the examples in this chapter
give them enough information about Swift
thay they can skim the rest of the language guide
and refer to the reference manual for specific questions.

Simple Values
-------------

Constants and variables are created using the same syntax,
with one difference:
Use ``let`` to declare a constant and use ``var`` for a variable.
The value of a constant can be assigned only once,
although it does not need to be known at compile time.
The value of a variable can be assigned multiple times.

.. testcode:: var

   -> var myVariable = 42
   << // myVariable : Int = 42
   -> myVariable = 50
   >> myVariable
   << // myVariable : Int = 50
   -> let myConstant = 42
   << // myConstant : Int = 42
   -> myConstant = 100  // error
   !! <REPL Input>:1:12: error: cannot assign to 'let' value 'myConstant'
   !! myConstant = 100  // error
   !! ~~~~~~~~~~ ^

.. admonition:: Experiment

   Edit the code in the boxes above.
   Try changing ``myConstant`` to be a variable.
   Try removing the last line, so it is only assigned a value once.

.. TR: Is the requirement that constants need an initial value
   a current REPL limitation, or an expected language feature?

A variable must have the same type
as the value you want to assign to it.

.. testcode:: typecheck

    -> var greeting = "Hello"
    << // greeting : String = "Hello"
    -> greeting = 123
    !! <REPL Input>:1:10: error: expression does not type-check
    !! greeting = 123
    !! ~~~~~~~~~^~~~~

In the previous example,
the compiler understands that ``greeting`` is a string
because its initial value is a string.
This behavior of determining type information
based on the surrounding code
is known as *type inference*,
and it allows you to take advantage of type checking
without writing explicit type information everywhere.

When the initial value doesn't provide enough information,
or when there is no initial value,
specify an explicit type
by writing the type after the variable,
separated by a colon.

.. testcode:: type-annotation

   -> let implicitString = "Hello"
   << // implicitString : String = "Hello"
   -> let explicitString: String = "Hello"
   << // explicitString : String = "Hello"

.. admonition:: Experiment

   Try creating a constant with
   an explicit type of ``Float`` and a value of ``4``.
   Notice how the type of ``4`` is determined based on how you use it.

   Try providing an explicit type that doesn’t match
   the variable’s initial value.
   What error do you get?

Values are never implicitly converted or cast to another type.
If you need to convert a value to a different type,
make an instance of the desired type explicitly.

.. testcode:: cast

   -> let label = "The width is "
   << // label : String = "The width is "
   -> let width = 94
   << // width : Int = 94
   -> println(label + String(width))
   << The width is 94

.. admonition:: Experiment

   Try removing the cast to ``String`` from the last line.
   What error do you get?

A simpler way to include values in strings
is to use the special escape ``\(`` ``)`` in a string,
which includes the string value of an expression
as part of the string.

.. testcode:: string-interpolation

   -> let apples = 3
   << // apples : Int = 3
   -> let oranges = 5
   << // oranges : Int = 5
   -> let summary = "I have \(apples + oranges) pieces of fruit."
   << // summary : String = "I have 8 pieces of fruit."

.. admonition:: Experiment

   Try using string interpolation to
   include a floating point calculation in a string,
   and to include someone’s name in a greeting.

Arrays and dictionaries are written using brackets (``[]``)
and their elements are accessed by writing
the index or key in brackets.

.. testcode:: array-dict

    -> let fruits = ["apple", "orange", "banana"]
    << // fruits : Array<String> = ["apple", "orange", "banana"]
    -> let favoriteFruit = fruits[1]
    << // favoriteFruit : String = "orange"
    ---
    -> var forecasts = [
          "San Francisco": 59.0,
          "Paris": 51.6,
          "Shanghai": 73.2,
       ]
    << // forecasts : Dictionary<String, Double> = Dictionary<String, Double>(1.33333333333333, 3, <DictionaryBufferOwner<String, Double> instance>)
    -> forecasts["San Francisco"] < forecasts["Paris"]
    << // r0 : Bool = false

.. admonition:: Experiment

   Try sorting ``fruits`` using the Swift Standard Library ``sort`` function.

.. Forcasts above are real current conditions from 9:14 pm April 28, 2014.

.. Old Firefly example
   which doesn't follow our editorial guidelines for names of people
    -> var occupations = [
          "Malcolm": "Captain",
          "Kayley": "Mechanic",
          "Jayne": "Public Relations",
        ]
    << // occupations : Dictionary<String, String> = Dictionary<String, String>(1.33333333333333, 3, <DictionaryBufferOwner<String, String> instance>)
    -> occupations["Jayne"] == "Doctor"
    << // r0 : Bool = false
    ---

An empty array is written ``[]``
and an empty dictionary is written ``[:]``.
since the type of an empty array or dictionary
can't be inferred from its content ---
specify it expliticly.

.. testcode:: empty-array-dict

   -> var emptyArray: Array<String> = []
   << // emptyArray : Array<String> = []
   -> var emptyDictionary: Dictionary<String, Float> = [:]
   << // emptyDictionary : Dictionary<String, Float> = Dictionary<String, Float>(1.33333333333333, 0, <DictionaryBufferOwner<String, Float> instance>)

.. The REPL output after creating a dictionary doesn’t make any sense.
   No way to get it to pretty-print the keys and values.

Control Flow
------------

Use ``if`` to choose between blocks of code
by checking Boolean conditions.

.. testcode:: if

   -> let haveJellyBabies = false
   << // haveJellyBabies : Bool = false
   -> let remainingGummiBears = 5
   << // remainingGummiBears : Int = 5
   -> if haveJellyBabies {
         println("Would you like a jelly baby?")
      } else if remainingGummiBears > 0 {
         println("Would you like a gummi bear?")
      } else {
         println("Sorry, all we have left are fruits and vegetables.")
      }
   << Would you like a gummi bear?

There are no parentheses around the conditional,
and the braces around the body are required.
The conditional must be a Boolean expression;
code like ``if remainingGummiBears { ... }`` is an error,
not an implicit comparison to zero.

Use ``switch`` to choose between blocks of code
where each block of code is associated
with a possible value.

.. testcode:: simple-switch

   -> let vegetable = "cucumber"
   << // vegetable : String = "cucumber"
   -> switch vegetable {
         case "lettuce":
            println("Let’s make salad.")
         case "celery":
            println("Add some raisins and make ants on a log.")
         case "cucumber":
            println("How about a cucumber sandwich?")
         default:
            println("Everything tastes good in soup.")
      }
   << How about a cucumber sandwich?

.. admonition:: Experiment

   Try removing the default case.
   What error do you get?

Switches support any kind of data, not just integers.
You need to provide a case for every possible value
or use ``default`` to specify what happens if none of the cases match.
Execution does not implicitly “fall through”
so there is no need to explicitly break out of the switch
at the end of each case‘s code.

.. Omitting mention of "fallthrough" keyword.
   It's in the guide/reference if you need it.

Switches support a variety of complex matching criteria,
such as tuple unpacking and ``where`` clauses:

.. testcode:: fancy-switch

   -> let somePoint = (1, 1)
   << // somePoint : (Int, Int) = (1, 1)
   -> switch somePoint {
         case (0, 0):
            println("(0, 0) is at the origin")
         case (_, 0):
            println("(\(somePoint.0), 0) is on the x-axis")
         case (0, _):
            println("(0, \(somePoint.1)) is on the y-axis")
         case let (x, y) where x == y:
            println("(\(x), \(y)) is on the diagonal")
         default:
            println("The point is somewhere else.")
      }
   << (1, 1) is on the diagonal

.. admonition:: Experiment

   Try adding a case statement
   that matches points where ``x`` is greater than ``y``,
   and one that matches points where ``x`` is odd.

Repeat a block of code for each item in a collection with ``for``.

.. testcode:: for-each

    -> let listOfNumbers = 1..5
    << // listOfNumbers : Range<Int> = Range<Int>(1, 6)
    -> var sum = 0
    << // sum : Int = 0
    -> for n in listOfNumbers {
          sum += n
       }
    >> sum
    << // sum : Int = 15

.. admonition:: Experiment

   Try changing ``1..5`` to ``1...5``.
   Notice that 5 is omitted from the sum.
   When would you want to include or exclude the final number?

.. testcode:: for-dict

   -> let interestingNumbers = [
         "Prime": [2, 3, 5, 7, 11, 13],
         "Fibonacci": [1, 1, 2, 3, 5, 8],
         "Square": [1, 4, 9, 16, 25],
      ]
   << // interestingNumbers : Dictionary<String, Array<Int>> = Dictionary<String, Array<Int>>(1.33333333333333, 3, <DictionaryBufferOwner<String, Array<Int>> instance>)
   -> var largest = 0
   << // largest : Int = 0
   -> for (kind, numbers) in interestingNumbers {
         for number in numbers {
            if number > largest {
                largest = number
            }
         }
      }
   >> largest
   << // largest : Int = 25

.. admonition:: Experiment

   Try keeping track of which kind of number
   was the largest, as well as what that largest number was.

Loops can keep an explicit counter or index.

.. testcode:: c-for

   -> for var i = 0; i < 5; ++i {
         println(i)
      }
   << 0
   << 1
   << 2
   << 3
   << 4

Repeat a block of code until a condition changes using ``while``.
The condition of a loop can be an the end instead,
ensuring that the loop is run at least once.

.. testcode:: while

   -> var n = 2
   << // n : Int = 2
   -> while n < 100 {
         n = n * 2
      }
   -> println("n is \(n)")
   << n is 128
   ---
   -> var m = 2
   << // m : Int = 2
   -> do {
         m = m * 2
      } while m < 100
   -> println("m is \(m)")
   << m is 128

Functions and Closures
----------------------

Functions are declared using ``func``
and are called with a parenthesized list of arguments.
Argument names are part of the function's name;
you can specify each parameter by name when calling the function.

.. TODO: I've hand waved here by saying args are part of the "name".

.. TR: Technically, right now, the argument names are actually
   part of the *type* rather than the *name*
   That is, "init (withFoo : Int)" and "init (withBar : String)"
   both have the function name "init", but have different types.

.. testcode:: func

    -> func greet(name: String, day: String) -> String {
          return "Hello \(name), today is \(day)."
       }
    -> greet("Bob", "Tuesday")
    << // r0 : String = "Hello Bob, today is Tuesday."
    -> greet(name:"Alice", "Wednesday")
    << // r1 : String = "Hello Alice, today is Wednesday."

.. admonition:: Experiment

   Try removing the day of the week parameter.
   Try adding a third parameter to include today’s lunch special in the greeting.

Functions can return multiple values using a tuple.

.. testcode:: func-tuple

   -> func getGasPrices() -> (Double, Double, Double) {
         return (3.59, 3.69, 3.79)
      }
   >> getGasPrices()
   << // r0 : (Double, Double, Double) = (3.59, 3.69, 3.79)

Functions can also take a variable number of arguments,
collecting them into an array.

.. testcode:: functions

   -> // Reimplement the Standard Library sum function for Int values.
   -> func sumOf(numbers: Int...) -> Int {
         var sum = 0
         for number in numbers {
            sum += number
         }
         return sum
      }
   -> sumOf()
   << // r0 : Int = 0
   -> sumOf(42, 597, 12)
   << // r1 : Int = 651

.. admonition:: Experiment

   Try writing a function that calculates the average.

Functions can be nested.
Nested functions have access to variables
that were declared in the outer function.

.. testcode:: nested-func

    -> func returnFifteen () -> Int {
          var y = 10
          func add () -> () {
             y += 5
          }
          add()
          return y
       }
    -> returnFifteen()
    << // r0 : Int = 15

.. admonition:: Experiment

   Try removing the call to the ``add`` function.
   Try calling the ``add`` function twice.
   What happens?

Functions are a first-class type.
This means a function can return another function as its value.

.. testcode:: return-func

    -> func makeIncrementer() -> (Int -> Int) {
          func addOne (number: Int) -> Int {
             return 1 + number
          }
          return addOne
       }
    -> var increment = makeIncrementer()
    << // increment : (Int -> Int) = <unprintable value>
    -> increment(7)
    << // r0 : Int = 8

.. TODO: Confirm spelling of "incrementer" (not "incrementor").

A function can take another function as one of its argument.

.. testcode:: pass-func

    -> // Re-implement the Standard Library sort function.
    -> func bubbleSort (var list: Array<Int>, outOfOrder: (Int, Int) -> Bool) -> Array<Int> {
          for i in 0...list.count {
             for j in 0...list.count {
                if outOfOrder(list[i], list[j]) {
                   (list[i], list[j]) = (list[j], list[i])
                }
             }
          }
          return list
       }
    -> func greaterThan (x : Int, y : Int) -> Bool {
          return x > y
       }
    -> var numbers = [8, 3, 5, 6]
    << // numbers : Array<Int> = [8, 3, 5, 6]
    -> var sortedNumbers = bubbleSort(numbers, greaterThan)
    << // sortedNumbers : Array<Int> = [8, 6, 5, 3]

Closures are just like a function
except you don't give them a name when you declare them.
They are written as code surrounded by braces (``{}``)
and have their arguments separated from their body by ``in``.

.. testcode:: closure

    -> let triple: Int -> Int = {
          (number: Int) in
          let result = 3 * number
          return result
       }
    << // triple : Int -> Int = <unprintable value>
    -> triple(5)
    << // r0 : Int = 15

.. The type of "number" can be omitted above,
   and in fact the parens are probably not needed either.
   I've written them for now
   so that I start with the most verbose function-y syntax.

There are several conveniences for writing closures more concisely.
When the closure's type is already known,
such as the callback for a delegate,
the type of its parameters can be omitted.
For even more brevity,
the parameters can be referred to by number instead of by name.
Single statement closures implicitly return the value
of their only statement.

.. testcode:: closure-brief

    -> let shortTriple: Int -> Int = { 3 * $0 }
    << // shortTriple : Int -> Int = <unprintable value>
    -> shortTriple(5)
    << // r0 : Int = 15

A closure passed as the last argument to a function
can appear immediately after the function call.

.. testcode:: trailing-closure

    -> sort([1, 5, 3, 12, 2]) { $0 > $1 }
    << // r0 : Array<Int> = [12, 5, 3, 2, 1]

.. admonition:: Experiment

   Try rewriting the bubble sort function above
   so it takes a trailing closure to do comparisons.

The previous listing can be written without a closure at all
by passing the ``>`` operator
as the second argument to the ``sort`` function.

.. testcode:: operator-closure

    -> sort([1, 5, 3, 12, 2], >)
    << // r0 : Array<Int> = [12, 5, 3, 2, 1]

Objects and Classes
-------------------

Classes are created using ``class``,
followed by the class's properties and methods in braces.
A property declaration is the same
as a constant or variable declaration,
except that it is in the context of a class.
Likewise, method and function declarations are the same.

::

    class Shape {
       var numberOfSides: Int = 0
       func description() -> String {
          return "A shape with \(numberOfSides) sides."
       }
    }

.. admonition:: Experiment

   Try adding a constant property using ``let``
   and adding another method that takes an argument.

Instances of the class are created
by putting parentheses after the class name,
and the properties an methods of the instance
are accessed using dot syntax.

::

    var shape = Shape()
    shape.numberOfSides = 7
    var shapeDescription = shape.description()

This version of the ``Shape`` class is missing something important:
an initializer to set up the class when an instance is created.
The initializer similar to a function,
but it begins with ``init`` instead of ``func`` and has no function name.

.. TODO: Probably worth pointing out that the initializer isn't a method.

::

    class NamedShape {
       var numberOfSides: Int = 0
       var name: String

       init(name: String) {
          self.name = name
       }

       func description() -> String {
          return "A shape with \(numberOfSides) sides."
       }
    }

Notice how ``self`` is used to distinguish the ``name`` property
from the ``name`` argument to the initializer.
The arguments to the initializer are passed like a function call
when you create an instance of the class.
Every property needs to either have a value assigned
when it is declared (like ``numberOfSides``)
or in the initializer (like ``name``).

Classes that inherit from other classes
include the superclass's name, separated by a colon.
It's just fine to have a class with no superclass though ---
classes in Swift don't all have a common root class.

Methods on a subclass that override the superclass's implentation
are marked with ``override`` ---
overriding a method by accident, without ``override``,
is detected by the compiler as an error.
The compiler also detects methods with ``override``
that don't actually override any method in the superclass.

::

    class Square: NamedShape {
       var sideLength: Double

       init(sideLength: Double, name: String) {
          self.sideLength = sideLength
          super.init(name)
          numberOfSides = 4
       }

       func area() ->  Double {
          return sideLength * sideLength
       }

       override description() -> String {
          return "A square with sides of length \(sideLength)."
       }
    }

.. admonition:: Experiment

   Try making another subclass of ``NamedShape``
   called ``Circle``
   which takes a radius and a name
   as arguments to its initializer,
   and implements an ``area`` and ``describe`` method.

The initializer of a class with a superclass
has three parts:

1. Setting the value of properties that the subclass declares.

2. Calling the superclass's initializer.

3. Setting or changing the value of properties that the superclass declares.

In addition to simple properties,
properties can use an explicit getter and setter
to create a computed property.

::

    let PI = 3.14159265
    let TWO_PI = 2 * PI

    class Circle: NamedShape {
        var radius: Double

        // A computed property
        var circumference: Double {
            get {
                return TWO_PI * radius
            }
            set {
                radius = newValue / TWO_PI
            }
        }

        // A read-only computed property
        var area: Double {
           get {
              return PI * radius * radius
           }
        }

        init(radius: Double, name: String) {
            self.radius = radius
            super.init(name)
            numberOfSides = 1
        }

        func area() -> Double {
            return PI * radius * radius
        }

        override description() -> String {
           return "A circle with radius of length \(radius)."
        }
    }

In the setter for ``circumference`` the new value
has the implicit name ``newValue``.
You can provide an explicit name in parentheses after ``set``.

If you don't need to computer the property
but still need to provide code that is run before and after setting a new value,
use ``willSet`` and ``didSet``.
For example, the class below ensures
that the radius of its circle
is always the same as the side length of its square.

::

   class CircleAndSquare {
      var circle: Circle {
         didSet {
            square.sideLength = newValue.radius
         }
      }
      var square: Square {
         didSet {
            circle.radius = newValue.sideLength
         }
      }
      init(size: Double, name: String) {
         square = Square(size, name)
         circle = Circle(size, name)
      }
   }

.. What is getter-setter-keyword-clause for?
   It looks like you write var foo: Type { get }
   but what does that even mean?

.. Grammatically, these clauses are general to variables.
   Not sure what it would look like
   (or if it's even allowed)
   to use them outside a class or a struct.

Enumerations and Structures
---------------------------

.. write-me::

* Differences from objects (reference types)
* Use structs for complex multipart data
* Use enums when values come from a list
* Associating additional data with enums
* Indicate protocol conformance using “:”

Protocols
---------

.. write-me::

* Supported by both reference and value types
* First class type -- usable in variable declarations etc.
* Can provide a default implementation.

Optionals
---------

.. write-me::

* Contrast with nil/NULL
* Implemented as enum (no magic)
* Convenience syntax “?” and "!"

Additional Topics
-----------------

.. write-me::

* Generics -- on objects, methods, etc.
* Pattern matching in switches
* Curried functions
* Custom operators [could go under Functions]

xxx Approach to Writing xxx
---------------------------

**This section is for reviewers, not to be published.**

- Assume the reader has a background in programming.

- Assume that if the reader gets to confused,
  they will play with the code a bit,
  and/or skip to the guide.

- Think of having a chat over lunch with a developer,
  walking them through the cool aspects of the language.

- Scope experiment boxes to moderate size exercises.
  Avoid trivial code changes,
  although those are inevitable early on.

- Leave details to the guide.
  Repeat facts here only if they are especially interesting or important.

- Use joyful and approachable prose.

  Avoid terms like "statement" which are too technical for this context,
  phrases like "you can (do x)" which are mostly filler,
  and task-oriented phrases like "to (do x)"
  which are inappropriate in a non-task-oriented context.

  Refer to code voice terms only if needed,
  but omit the head noun.
   
