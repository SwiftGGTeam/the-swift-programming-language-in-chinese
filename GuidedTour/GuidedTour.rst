A Guided Tour of the Swift Language
===================================

Tradition suggests that the first program you write in a new language
should print the words "Hello, world" on your screen.
In Swift, this can be done in a single line:

.. K&R uses "hello, world".
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
   -> println(myVariable)
   << 42
   -> myVariable = 50
   -> println(myVariable)
   << 50

In contrast, constants can only have a value assigned once:

.. testcode:: let

   -> let myConstant = 42
   << // myConstant : Int = 42
   -> myConstant = 50
   !! <REPL Input>:1:12: error: cannot assign to 'let' value 'myConstant'
   !! myConstant = 50
   !! ~~~~~~~~~~ ^

.. note: Experiment

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
    -> string = 98.5
    !!  <REPL Input>:1:8: error: expression does not type-check
    !! string = 98.5
    !! ~~~~~~~^~~~~~

Notice that you didn’t have to explictly
tell the compiler the type of ``string``.
If you don't specify a type,
Swift determines the variable's type
based on its initial value.

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

.. note: Experiment

   How would you use string interpolation
   to include someone's name in a greeting?

Control Flow
------------

Swift includes if and switch statements
to choose between alternatives.
Switch statements in Swift support comparison of any type,
and there are a wide range of matching mechanisms.

.. TODO: Example with if/else if/else

.. TODO: Simple example with switch

.. TODO: Forward pointer or handwave about complex switch

.. testcode:: switch
   -> let somePoint = (1, 1)
   << // somePoint : (Int, Int) = (1, 1)
   -> switch somePoint {
         case (0, 0):
            println("(0, 0) is at the origin")
         case (_, 0):
            println("(\(somePoint.0), 0) is on the x-axis")
         case (0, _):
            println("(0, \(somePoint.1)) is on the y-axis")
         case (x, y) where x == y:
            println("\(x), \(y)) is on the diagonal")
         default:
            println("The point is somewhere else.")
      }
   <- (1, 1) is on the diagonal stnhsnthsnch

Swift also includes for and while loops
to repeat code.

Array and dictionary literals are represented
using values inside ``[`` and ``]``.

.. TODO: Array/dict literals are here because I need them for loops.
   It might be more natural to move them earlier.

.. testcode:: for-loop
    -> let listOfNumbers = [8, 3, 5]
    << // listOfNumbers : Int[] = [8, 3, 5]
    -> var sum = 0
    << // sum : Int = 0
    -> for n in listOfNumbers {
          sum += n
       }
    >> sum
    << sum : Int = 16



Functions
---------

.. Define functions with "func"
.. Call functions with "()" postfix.
.. [No discussion of selector style syntax here.]

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

