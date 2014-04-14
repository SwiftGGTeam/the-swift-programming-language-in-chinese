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

Variables and constants are created using the same syntax,
with one difference:
Use ``var`` to declare a variable and use ``let`` for a constant.

The value of a variable can be assigned multiple times,
but constants can have a value assigned only once.

.. testcode:: var

   -> var myVariable = 42
   << // myVariable : Int = 42
   -> myVariable = 50
   >> myVariable
   << // myVariable : Int = 50
   -> let myConstant = 42
   << // myConstant : Int = 42

.. admonition:: Experiment

   Edit the code in the boxes above.
   Try setting different values
   for ``myVariable`` and ``myConstant``.
   What error do you get if you assign a new value to a constant?

.. TR: Is the requirement that constants need an initial value
   a current REPL limitation, or an expected language feature?

Swift enforces the type of a variable ---
assigning a value of the wrong type to a variable is an error.

.. testcode:: typecheck

    -> var greeting = "Hello"
    << // greeting : String = "Hello"
    -> greeting = "Good morning"

.. admonition:: Experiment

   Try assigning a number to ``greeting``.
   What error do you get?

Notice that you didn’t have to explictly
tell the compiler the type of ``string``.
If you don’t specify a type,
Swift determines the variable’s type
based on its initial value.
A type annotation specifies an explicit type for a variable
by writing it after the variable,
separated by a colon.

.. testcode:: type-annotation

   -> let implicitString = "Hello"
   << // implicitString : String = "Hello"
   -> let explicitString : String = "Hello"
   << // explicitString : String = "Hello"

.. admonition:: Experiment

   Try providing an explicit type that doesn’t match
   the variable’s initial value.
   What error do you get?

If you want to cast a value to another type,
you do it explicitly.

.. testcode:: cast

   -> let label = "The width is "
   << // label : String = "The width is "
   -> let width = 94
   << // width : Int = 94
   -> println(label + String(width))
   <- The width is 94

.. admonition:: Experiment

   Try removing the cast to ``String`` from the last line.
   What error do you get?
   
   Try rewriting the last line to use string interpolation.
   Do you still need an explicit cast?

Assignment matches parts on the left side to parts on the right,
which allows you to perform several assignments at once.
For example, to swap the value of ``x`` and ``y``:

.. testcode:: swap

   -> var left = 10
   << // left : Int = 10
   -> var right = 100
   << // right : Int = 100
   -> (left, right) = (right, left)
   >> left
   << // left : Int = 100
   >> right
   << // right : Int = 10

.. TODO: If the PG doesn’t show a good result for x and y in the swap line,
   turn the >> lines into -> lines
   to show the reader that the swap worked.

Strings in Swift have support a special interpolation syntax
that includes the string value of an expression
as part of the string.

.. testcode:: string-interpolation

   -> let apples = 3
   << // apples : Int = 3
   -> let oranges = 5
   << // oranges : Int = 5
   -> let summary = "I have \(apples + oranges) pieces of fruit."
   << // summary : String = "I have 8 pieces of fruit."

.. admonition:: Experiment

   Try using string interpolation
   to include someone’s name in a greeting.

Arrays and dictionaries are written using brackets (``[]``).
Tuples are written using parentheses.

.. testcode:: array-dict

    -> let fruits = ["apple", "orange", "banana"]
    << // fruits : String[] = ["apple", "orange", "banana"]
    -> let occupations = [
           "Malcolm": "Captain",
           "Kayley": "Mechanic",
           "Jayne": "Public Relations",
        ]
    << // occupations : Dictionary<String, String> = Dictionary<String, String>(1.33333, 3, <DictionaryBufferOwner<String, String> instance>)
    -> let origin = (0, 0)
    << // origin : (Int, Int) = (0, 0)
    -> let x = origin.0
    << // x : Int = 0

Arrays and dictionaries use the same syntax
for accessing their elements.

.. testcode:: vegetable-array-dict

    -> var vegetables = Array<String>()
    << // vegetables : Array<String> = []
    -> vegetables.append("carrot")
    -> vegetables.append("cucumber")
    -> vegetables.append("tomato")
    -> vegetables[1] = "onion"
    >> vegetables
    << // vegetables : Array<String> = ["carrot", "onion", "tomato"]
    -> var fruitColors = Dictionary<String, String>()
    << // fruitColors : Dictionary<String, String> = Dictionary<String, String>(1.33333, 0, <DictionaryBufferOwner<String, String> instance>)
    -> fruitColors.add("banana", "yellow")
    << // r0 : Bool = false
    -> fruitColors.add("apple", "red")
    << // r1 : Bool = false
    -> fruitColors["apple"] = "green"

.. admonition:: Experiment

    Try using brackets to set the second element of an empty array
    and to set the value for a key of an empty dictionary.
    Why do you think empty arrays and dictionaries
    have this difference in behavior?

.. An empty array or dictionary needs its type explicitly specified
   because there are no elements in it to let the compiler infer its type.
   
.. Mention [] and [:] as empty array/dict literals.
   They aren’t fully typed, so they require a type annotation in a variable declaration,
   but they are useful when calling a function or re-assigning the value of a variable.

.. The REPL output after creating a dictionary doesn’t make any sense.
   No way to get it to pretty-print the keys and values.

Control Flow
------------

Choose between alternative blocks of code with ``if`` and ``switch``.

Use ``if`` as follows:

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

Use ``switch`` as follows:

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

Switches in Swift support any kind of data, not just integers.
You must write a switch case for every possible value
or use ``default`` to specify what happens if none of the cases match.
Execution does not “fall through” from one case statement to the next
unless you use ``fallthough`` to opt in to that behavior.

.. testcode:: fallthrough-switch

    -> let birdsSinging = true
    << // birdsSinging : Bool = true
    -> switch birdsSinging {
           case true:
               println("The birds are singing.")
               fallthrough
           default:
               println("It’s a beautiful day.")
       }
    << The birds are singing.
    << It’s a beautiful day.

.. See also <rdar://problem/16514545>
   I’m using default here instead of case false as a workaround to this bug.

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
   <- (1, 1) is on the diagonal

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

.. testcode:: while

   -> var n = 2
   << // n : Int = 2
   -> while n < 100 {
          n = n * 2
      }
   -> println("n is \(n)")
   << n is 128

The condition of a loop can be an the end instead,
ensuring that the loop is run at least once.

.. testcode:: do-while

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
Argument names are part of the function signature;
you can specify each parameter by name when calling the function.

.. TR: Technically, right now, the argument names are actually
   part of the *type* rather than the *name*
   That is, "init (withFoo : Int)" and "init (withBar : String)"
   both have the function name "init", but have different types.

.. testcode:: func

    -> func greet(name : String, day : String) -> String {
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

Functions can also be defined to take a variable number of arguments.

.. testcode:: functions

   -> // Reimplement the Standard Library sum function for Int values.
   -> func sumOf(numbers : Int...) -> Int {
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
This means a function can accept functions as arguments
and have a function as its return value.

.. testcode:: return-func

    -> func makeIncrementer() -> (Int -> Int) {
           func addOne (number : Int) -> Int {
               return 1 + number
           }
           return addOne
       }
    -> var increment = makeIncrementer()
    << // increment : (Int -> Int) = <unprintable value>
    -> increment(7)
    << // r0 : Int = 8

.. TODO: Confirm spelling of "incrementer" (not "incrementor").

.. testcode:: pass-func

    -> // Re-implement the Standard Library sort function.
    -> func bubbleSort (var list : Int[], outOfOrder : (Int, Int) -> Bool) -> Int[] {
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
    << // numbers : Int[] = [8, 3, 5, 6]
    -> var sortedNumbers = bubbleSort(numbers, greaterThan)
    << // sortedNumbers : Int[] = [8, 6, 5, 3]

Closures are surrounded by braces (``{}``)
and have their arguments separated from their body by ``in``.

.. testcode:: closure

    -> let triple : Int -> Int = {
           (number : Int) in
           let result = 3 * number
           return result
       }
    << // triple : Int -> Int = <unprintable value>
    -> triple(5)
    << // r0 : Int = 15

There are several conveniences for writing closures more concisely.
Parameter names can be omitted
and the parameters can be referred to by number.
Single statement closures implicitly return the value
of their only statement.

.. testcode:: closure-brief

    -> let shortTriple : Int -> Int = { 3 * $0 }
    << // shortTriple : Int -> Int = <unprintable value>
    -> shortTriple(5)
    << // r0 : Int = 15

A closure passed as the last argument to a function
can appear immediately after the function call.

.. testcode:: trailing-closure

    -> sort([1, 5, 3, 12, 2]) { $0 > $1 }
    << // r0 : Int[] = [12, 5, 3, 2, 1]

Objects
-------

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

Value Types
-----------

.. write-me::

* Differences from objects (reference types)
* Use tuples for simple multipart data
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
