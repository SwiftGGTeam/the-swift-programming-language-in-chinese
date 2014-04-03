A Guided Tour of the Swift Language
===================================

Tradition suggests that the first program you write in a new language
should print the words "Hello, world" on your screen.
In Swift, this can be done in a single line:

.. K&R uses "hello, world".
   It seems worth breaking with tradition to use proper casing.

.. testcode:: hello-world

   -> println("Hello, world")
   <- Hello, world

If you have written code in a language like C or Objective-C,
this syntax probably looks familiar to you.
Unlike those languages,
this line of Swift code is a complete program.
There is no need to import a standard library for functionality like
input/output or string handling.
The first statement at global scope is used
as entry point for the program,
so there is no need for a ``main`` function.
Also notice that there are no semicolons.
You can use semicolons to separate two statements on a single line,
but otherwise there is no need to mark the end of a statement.
These illustrate some of the design goals of the language:
code written in Swift should be **safe**, **consistent**, and **clear**.

The rest of this tour show you examples
of how to accomplish a variety of programming tasks in Swift
without explaining the concepts in detail.
It gives you a broad (but shallow) overview of the language
to help you start writing actual code in Swift.
Don't worry if you don't understand all of the examples ---
all of the subjects covered in this tour are explained in detail later in this book.
Experienced programmers may find that the examples in this chapter
give them enough information about Swift
thay they can skim the rest of the language guide
and refer to the reference manual for specific questions.

Simple Values
-------------

Variables and constants are created using the same syntax,
with one difference:
variables use the ``var`` keyword
and constants use the ``let`` keyword.

The value of a variable can be re-assigned:

.. testcode:: var

   -> var myVariable = 42
   << // myVariable : Int = 42
   -> myVariable = 50
   >> myVariable
   << // myVariable : Int = 50

In contrast, constants can only have a value assigned once:

.. testcode:: let

   -> let myConstant = 42
   << // myConstant : Int = 42
   -> myConstant = 50
   !! <REPL Input>:1:12: error: cannot assign to 'let' value 'myConstant'
   !! myConstant = 50
   !! ~~~~~~~~~~ ^

.. admonition:: Experiment

   Edit the code in the boxes above.
   Try setting a different values
   for ``myVariable`` and ``myConstant``.
   Try changing their names.
   What characters are not allowed in variable names?
   What happens if you try to assign a new value to a constant?

.. TR: Is the requirement that constants have a value
   a current REPL limitation, or an expected language feature?

Swift enforces the type of a variable ---
assigning a value of the wrong type to a variable is an error.

.. testcode:: typecheck

    -> var string = "Hello"
    << // string : String = "Hello"
    -> string = 98.5  // error
    !!  <REPL Input>:1:8: error: expression does not type-check
    !! string = 98.5  // error
    !! ~~~~~~~^~~~~~

Notice that you didn’t have to explictly
tell the compiler the type of ``string``.
If you don't specify a type,
Swift determines the variable's type
based on its initial value.

Assignment matches parts on the left side to parts on the right,
which allows you to perform several assignments at once.
For example, to swap the value of ``x`` and ``y``:

.. testcode:: swap

   -> var x = 10
   << // x : Int = 10
   -> var y = 100
   << // y : Int = 100
   -> (x, y) = (y, x)
   -> x
   << // x : Int = 100
   -> y
   << // y : Int = 10

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

   How would you use string interpolation
   to include someone's name in a greeting?

The previous examples have used integers, floating-point numbers, and strings.
The other basic data types are arrays and dictionaries,
which are written using square brackets (``[`` and ``]``),
and tuples which are written using parenthesis (``(`` and ``)``).

.. testcode:: array-dict

    -> let fruits = ["apple", "orange", "banana"]
    << // fruits : String[] = ["apple", "orange", "banana"]
    -> let ages = [
           "John Appleseed": 7,
           "Anna Haro": 12,
           "Daniel Higgins": 21,
        ]
    << // ages : Dictionary<String, Int> = Dictionary<String, Int>(1.33333, 3, <DictionaryBufferOwner<String, Int> instance>)
    -> let origin = (0, 0)
    << // origin : (Int, Int) = (0, 0)
    -> let x = origin.0
    << // x : Int = 0

Arrays and dictionaries use the same syntax
for accessing their elements.
An empty array or dictionary needs its type explicitly specified
because there are no elements in it to let the compiler infer its type.

.. testcode:: vegetable-array-dict

    -> var vegetables : String[] = []
    << // vegetables : String[] = []
    -> vegetables.append("carrot")
    -> vegetables.append("cucumber")
    -> vegetables.append("tomato")
    -> vegetables[1] = "onion"
    >> vegetables
    << // vegetables : String[] = ["carrot", "onion", "tomato"]
    -> var fruitColors : Dictionary<String, String> = [:]
    << // fruitColors : Dictionary<String, String> = Dictionary<String, String>(1.33333, 0, <DictionaryBufferOwner<String, String> instance>)
    -> fruitColors.add("banana", "yellow")
    << // r0 : Bool = false
    -> fruitColors.add("apple", "red")
    << // r1 : Bool = false
    -> fruitColors["apple"] = "green"

.. admonition:: Experiment

    Can you use square brackets to set the second element of an empty array?
    What about setting the value for a key of an empty dictionary?

.. TR: Style question... is this better than writing the following?  Why?
       var vegetables = Array<String>()
       var vegetableColors = Dictionary<String, String>()
   You can't write String[]() -- it tries to subscript the String type and crashes.

.. The REPL output after creating a dictionary doesn't make any sense.
   No way to get it to pretty-print the keys and values.

Control Flow
------------

Swift includes if and switch statements
to choose between alternatives.
Switch statements in Swift support comparison of any type,
and there are a wide range of matching mechanisms.

An if statement is written as follows:

.. testcode:: if

   -> let haveJellyBabies = false
   << // haveJellyBabies : Bool = false
   -> let haveGummiBears = true
   << // haveGummiBears : Bool = true
   -> if haveJellyBabies {
          println("Would you like a jelly baby?")
      } else if haveGummiBears {
          println("Would you like a gummi bear?")
      } else {
          println("Sorry, all we have left are fruits and vegetables.")
      }
   << Would you like a gummi bear?

Note that there are no parenthesis around the conditional,
and that the braces around the body are required.

Switch statements are written as follows:

.. testcode:: simple-switch

   -> let vegetable = "cucumber"
   << // vegetable : String = "cucumber"
   -> switch vegetable {
          case "lettuce":
              println("Let's make salad.")
          case "celery":
              println("Get raisins and make ants on a log.")
          case "cucumber":
             println("How about a cucumber sandwich?")
          default:
              println("Everything tastes good in soup.")
      }
    << How about a cucumber sandwich?

.. admonition:: Experiment

   What error do you get if you remove the default case?

There must be a switch case for every possible value ---
for most types of value, this means you need a default clause.
Execion does not "fall through" from one case statement to the next
unless you add the explicit ``fallthough`` keyword.

.. testcode:: fallthrough-switch

    -> let birdsSinging = true
    << // birdsSinging : Bool = true
    -> switch birdsSinging {
           case true:
               println("The birds are singing.")
               fallthrough
           default:
               println("It's a beautiful day.")
       }
    << The birds are singing.
    << It's a beautiful day.

.. See also <rdar://problem/16514545>
   I'm using default here instead of case false as a workaround to this bug.

Switch statements support a variety of complex matching criteria:

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

   Add a case statement that matches points where x is greater than y,
   and one that matches points where x is odd.

Swift also includes for and while loops
to repeat code.

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

   Change ``1..5`` to ``1...5`` --- notice that 5 is omitted from the sum.
   In what situations would you want to include or exclude the final number?

.. testcode:: while
   -> var n = 2
   << n : Int = 2
   -> while n < 100 {
          n = n * 2
      }
   -> println("n is \(n)")
   << n is 64

Functions and Closures
----------------------

Functions are declared using ``func``
and called with a parenthesized list of arguments.
Argument names are part of the signature;
you can specify each parameter by name when calling the function.

.. testcode:: func

    -> func greet(name : String, day : String) -> String {
           return "Hello \(name), today is \(day)."
       }
    -> greet("Bob", "Tuesday")
    << // r0 : String = "Hello Bob, today is Tuesday."
    -> greet(name:"Alice", "Wednesday")
    << // r1 : String = "Hello Alice, today is Wednesday."

.. admonition:: Experiment

   Remove the day of the week parameter.
   Add a third parameter to include today's lunch special in the greeting.

Functions can return multiple values using a tuple.

.. testcode:: func-tuple

   -> func fetchLocalGasPrices() -> (Double, Double, Double) {
         return (3.59, 3.69, 3.79)
      }

Since you name the elements in any tuple,
these features work together to make it easier to query the values:

.. testcode:: func-labelled-tuple

   -> func fetchBetterGasPrices() -> (regular: Double, midgrade: Double, premium: Double) {
         return (3.49, 3.59, 3.69)
      }
   -> fetchBetterGasPrices().midgrade
   << // r0 : Double = 3.59

.. TODO: If named tuples go away, remove this example.

Functions can also be defined to take variable argument lists.

.. testcode:: functions

   -> func addAllTheInts(theInts: Int...) -> Int {
         var sum = 0
         for i in theInts {
            sum += i
         }
         return sum
      }
   -> addAllTheInts()
   << // r0 : Int = 0
   -> addAllTheInts(42, 597, 12)
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

Functions are considered first-class types.
This means a function can accept other functions as arguments
and return another function.

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

.. testcode pass-func

    // Re-implement the Standard Library sort function.
    func bubbleSort (list : Int[], outOfOrder : (Int, Int) -> Bool) -> Int[] {
        for i in 0...list.count {
            for j in 0...list.count {
                if outOfOrder(list[i], list[j]) {
                    // TODO: Fails to type check
                    (list[i], list[j]) = (list[j], list[i])
                }
            }
        }
        return list
    }
    func greaterThan (x : Int, y : Int) -> Bool {
        return x > y
    }
    var numbers = [8, 3, 5, 6]
    var sortedNumbers = bubbleSort(numbers, lessThan)

.. admonition:: Experiment

   After you have read the section about generics,
   change this function to accept any array,
   not just an array of integers.

A closure is just a function that isn't given a name when it is declared.
.. TODO

Objects
-------

.. Declare classes with "class"
.. Declare methods with "func"
.. Declare properties with "var" and "let"
.. Make instances with "Class()"
.. Access methods and properties with "."
.. Customize object lifecycle with "init" and "deinit"

.. Indicate superclass and protocol conformance with ":"
.. Override superclass methods with "@override"
.. Call the superclass's implentation with "super"

Value Types
-----------

.. Differences from objects (reference types)
.. Use tuples for simple multipart data
.. Use structs for complex multipart data
.. Use enums when values come from a list
.. Associating additional data with enums
.. Indicate protocol conformance using ":"

Protocols
---------

.. Again, supported by both reference and value types
.. Distinguish is/has/can ...
.. Can be used as a first-class type (ie in variable declaration)

Optionals
---------

.. Contrast with nil/NULL
.. Implemented as enum (no magic)
.. Convenience syntax "?" and "!"

Generics
--------

Patterns and Advanced Switches
------------------------------

