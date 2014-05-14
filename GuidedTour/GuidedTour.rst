A Swift Tour
============

Tradition suggests that the first program in a new language
should print the words “Hello, world” on the screen.
In Swift, this can be done in a single line:

.. K&R uses “hello, world”.
   It seems worth breaking with tradition to use proper casing.

.. testcode::

   -> println("Hello, world")
   << Hello, world

If you have written code in C or Objective-C,
this syntax looks familiar to you.
Unlike those languages,
this line of Swift code is a complete program.
You don't need to import a standard library for functionality like
input/output or string handling.
Code written at global scope is used
as the entry point for the program,
so you don't need a ``main`` function.
You also don't need to write semicolons
at the end of every statement.

This tour gives you enough information
to start writing code in Swift
by showing you how you accomplish a variety of programming tasks.
Don’t worry if you don’t understand something ---
everything introduced in this tour
is explained in detail in the following chapters.
Experienced programmers may find that the examples
provide enough information about Swift
thay they can skim the the *Language Guide*
and refer to the *Language Reference*
for answers to specific questions.

.. TODO Should be an xName-No-Link element for the references
   to parts of this book above,
   rather than just putting them in italics.

Simple Values
-------------

You create constants and variables using the same syntax,
with one difference:
Use ``let`` to declare a constant and use ``var`` for a variable.
The value of a constant can be assigned only once,
although it does not need to be known at compile time.
The value of a variable can be assigned multiple times.

.. testcode::

   -> var myVariable = 42
   << // myVariable : Int = 42
   -> myVariable = 50
   >> myVariable
   << // myVariable : Int = 50
   -> let myConstant = 42
   << // myConstant : Int = 42
   // myConstant = 100  // Uncomment to see the error

.. admonition:: Experiment

   Changing ``myConstant`` to be a variable.
   Remove the last line, so ``myConstant`` is only assigned a value once.

.. TR: Is the requirement that constants need an initial value
   a current REPL limitation, or an expected language feature?

A variable must have the same type
as the value you want to assign to it.

.. testcode::

    -> var greeting = "Hello"
    << // greeting : String = "Hello"
    // greeting = 123  // Uncomment to see the error

In the previous example,
the compiler understands that ``greeting`` is a string
because its initial value is a string.
This behavior of determining type information
based on the surrounding code
is known as *type inference*,
and it allows the compiler to warn you
about type-related errors in your code
without requiring you to
write explicit type information everywhere.

When the initial value doesn't provide enough information,
or when there is no initial value,
specify an explicit type
by writing the type after the variable,
separated by a colon.
Type inference allows the compiler
to correctly infer the type of numbers ---
if you write ``4.0 / 2``
it is understood that ``4.0``, ``2``, and the result
all have the type ``Double``.

.. testcode::

   -> let implicitString = "Hello"
   << // implicitString : String = "Hello"
   -> let explicitString: String = "Hello"
   << // explicitString : String = "Hello"
   ---
   -> let implicitInteger = 70
   << // implicitInteger : Int = 70
   -> let implicitDouble = 70.0
   << // implicitDouble : Double = 70.0
   -> let explicitDouble: Double = 70
   << // explicitDouble : Double = 70.0
   -> let explicitFloat: Float = 70
   << // explicitFloat : Float = 70.0

.. admonition:: Experiment

   Create a constant with
   an explicit type of ``Float`` and a value of ``4``.
   Notice how the type of ``4`` is determined based on how you use it.

   Try providing an explicit type that doesn’t match
   the variable’s initial value.
   What error do you get?

Values are never implicitly converted to another type.
If you need to convert a value to a different type,
make an instance of the desired type explicitly.

.. testcode::

   -> let label = "The width is "
   << // label : String = "The width is "
   -> let width = 94
   << // width : Int = 94
   -> println(label + String(width))
   << The width is 94

.. admonition:: Experiment

   Try removing the conversion to ``String`` from the last line.
   What error do you get?

A simpler way to include values in strings
is to write ``\(`` and ``)`` around an expression,
which includes it as part of the string.

.. testcode::

   -> let apples = 3
   << // apples : Int = 3
   -> let oranges = 5
   << // oranges : Int = 5
   -> let summary = "I have \(apples + oranges) pieces of fruit."
   << // summary : String = "I have 8 pieces of fruit."

.. admonition:: Experiment

   Use ``\()`` to
   include a floating point calculation in a string,
   and to include someone’s name in a greeting.

You create arrays and dictionaries using brackets (``[]``),
and access their elements by writing
the index or key in brackets.

.. testcode::

    -> let fruits = ["apple", "orange", "banana"]
    << // fruits : Array<String> = ["apple", "orange", "banana"]
    -> let favoriteFruit = fruits[1]
    << // favoriteFruit : String = "orange"
    ---
    -> var temperatures = [
          "San Francisco": 59.0,
          "Paris": 51.6,
          "Shanghai": 73.2,
       ]
    << // temperatures : Dictionary<String, Double> = Dictionary<String, Double>(1.33333333333333, 3, <DictionaryBufferOwner<String, Double> instance>)
    -> temperatures["San Francisco"] < temperatures["Paris"]
    <$ : Bool = false

.. admonition:: Experiment

   Add you own favorite fruit to the array
   and compare it to ``favoriteFruit`` with the ``==`` operator.
   Add the current temperature of your town
   to the dictionary.

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
    <$ : Bool = false
    ---

An empty array is written ``[]``,
and an empty dictionary is written ``[:]``.
Because the type of an empty array or dictionary
can't be inferred from its content,
use a type annotation to specify it expliticly.

.. testcode::

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

.. testcode::

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

.. testcode::

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

After executing the code inside the switch case that matched,
the program exits from the switch statement.
Execution doesn't continue or "fall through" to the next case,
so there is no need to explicitly break out of the switch
at the end of each case‘s code.

.. Omitting mention of "fallthrough" keyword.
   It's in the guide/reference if you need it.

Switches support a variety of complex matching criteria,
such as tuple unpacking and ``where`` clauses:

.. testcode::

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

Use ``for`` to iterate over a collection of items.

.. TR: Will we end up having Collection and Container protocols
   in the WWDC timeframe?
   Let's match the English noun I use here to the protocol name,
   if it makes sense.

.. testcode::

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

You can also use ``for`` to iterate over items in a dictionary
by providing a variable name to use
for each key-value pair.

.. EDIT: key/value or key-value?

.. testcode::

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

.. testcode::

   -> for var i = 0; i < 5; ++i {
         println(i)
      }
   << 0
   << 1
   << 2
   << 3
   << 4

Use ``while`` to repeat a block of code until a condition changes.
The condition of a loop can be at the end instead,
ensuring that the loop is run at least once.

.. testcode::

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

Use ``func`` to declare functions
and call them by following their name
with a parenthesized list of arguments.

.. TODO: Argument names are postponed to the discussion of methods.

.. testcode::

    -> func greet(name: String, day: String) -> String {
          return "Hello \(name), today is \(day)."
       }
    -> greet("Bob", "Tuesday")
    <$ : String = "Hello Bob, today is Tuesday."
    -> greet("Alice", "Wednesday")
    <$ : String = "Hello Alice, today is Wednesday."

.. admonition:: Experiment

   Remove the ``day`` parameter.
   Add a parameter to include today’s lunch special in the greeting.

Functions can return multiple values by using a tuple.

.. testcode::

   -> func getGasPrices() -> (Double, Double, Double) {
         return (3.59, 3.69, 3.79)
      }
   >> getGasPrices()
   <$ : (Double, Double, Double) = (3.59, 3.69, 3.79)

Functions can also take a variable number of arguments,
collecting them into an array.

.. testcode::

   -> // Reimplement the Standard Library sum function for Int values.
   -> func sumOf(numbers: Int...) -> Int {
         var sum = 0
         for number in numbers {
            sum += number
         }
         return sum
      }
   -> sumOf()
   <$ : Int = 0
   -> sumOf(42, 597, 12)
   <$ : Int = 651

.. admonition:: Experiment

   Write a function that calculates the average of its arguments.

Functions can be nested.
Nested functions have access to variables
that were declared in the outer function.
You can use nested functions
to organize the code in a function
that is long or complex.

.. TR: Any objections to this guidance?

.. testcode::

    -> func returnFifteen () -> Int {
          var y = 10
          func add () -> () {
             y += 5
          }
          add()
          return y
       }
    -> returnFifteen()
    <$ : Int = 15

Functions are a first-class type.
This means a function can return another function as its value.

.. testcode::

    -> func makeIncrementer() -> (Int -> Int) {
          func addOne (number: Int) -> Int {
             return 1 + number
          }
          return addOne
       }
    -> var increment = makeIncrementer()
    << // increment : (Int -> Int) = <unprintable value>
    -> increment(7)
    <$ : Int = 8

.. EDIT: Confirm spelling of "incrementer" (not "incrementor").

A function can take another function as one of its arguments.

.. testcode::

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

Closures are the same as functions with one difference:
you don't give them a name when you declare them.
You write a closure as code surrounded by braces (``{}``)
and use ``in`` to separate the arguments from the body.

.. EDIT: Second sentence above reads better as describing singular closure.

.. testcode::

    -> let triple: Int -> Int = {
          (number: Int) in
          let result = 3 * number
          return result
       }
    << // triple : Int -> Int = <unprintable value>
    -> triple(5)
    <$ : Int = 15

.. The type of "number" can be omitted above,
   and in fact the parens are probably not needed either.
   I've written them for now
   so that I start with the most verbose function-y syntax.

You have several options for writing closures more concisely.
When the closure's type is already known,
such as the callback for a delegate,
you can omit the type of its parameters,
its return type, or both.
For even more brevity,
you can refer to parameters by number instead of by name.
Single statement closures implicitly return the value
of their only statement.

.. testcode::

    -> let shortTriple: Int -> Int = { 3 * $0 }
    << // shortTriple : Int -> Int = <unprintable value>
    -> shortTriple(5)
    <$ : Int = 15

A closure passed as the last argument to a function
can appear immediately after the parentheses.

.. testcode::

    -> sort([1, 5, 3, 12, 2]) { $0 > $1 }
    <$ : Array<Int> = [12, 5, 3, 2, 1]

.. admonition:: Experiment

   Rewrite the bubble sort function above
   so it takes a trailing closure to do comparisons.

The previous listing can be written without a closure at all
by passing the ``>`` operator
as the second argument to the ``sort`` function.

.. testcode::

    -> sort([1, 5, 3, 12, 2], >)
    <$ : Array<Int> = [12, 5, 3, 2, 1]

Objects and Classes
-------------------

.. TODO: Pull in the Shape example code from old tour.

.. write-me::

* Declare classes with “class”
* Declare methods with “func”
* Declare properties with “var” and "let"
* Make instances with “Class()”
* Access methods and properties with “.”
* Customize object lifecycle with “init” and "deinit"

.. write-me::

* Indicate superclass and protocol conformance with “:”
* Override superclass methods with “@override”
* Call the superclass’s implentation with “super”

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
