A Guided Tour of the Swift Language
===================================

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

    -> var hello = "Hello"
    << // hello : String = "Hello"
    // hello = 123  // Uncomment to see the error

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

You use ``if`` and ``let`` together to work with optional values.
In a similar way to how arrays and dictionaries contain values,
an optional value either contains a value
or ``nil`` to indicate it has no value.
Write a question mark (``?``) after a type
to mark it as optional.

.. testcode::

   -> var optionalString: String? = "Hello"
   << // optionalString : String? = <unprintable value>
   -> optionalString == nil
   <$ : Bool = false
   ---
   -> var optionalName: String? = "John Appleseed"
   << // optionalName : String? = <unprintable value>
   -> var greeting = "Hello!"
   << // greeting : String = "Hello!"
   -> if let name = optionalName {
         greeting = "Hello, \(name)"
      }
   >> greeting
   << // greeting : String = "Hello, John Appleseed"

.. admonition:: Experiment

   Change ``optionalName`` to ``nil``.
   What greeting do you get?
   Add an ``else`` clause that sets a different greeting
   if ``optionalName`` is ``nil``.

If the optional value is ``nil``,
the ``if`` behaves as if you wrote ``if false { ... }``.
Otherwise the optional value is unwrapped and assigned
to the variable after ``let``,
which makes the unwrapped value available
inside the block of code.

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

.. TODO: Call out what -> means in the signature.

.. testcode::

    -> func greet(name: String, day: String) -> String {
          return "Hello \(name), today is \(day)."
       }
    -> greet("Bob", "Tuesday")
    <$ : String = "Hello Bob, today is Tuesday."
    -> greet(name:"Alice", "Wednesday")
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

.. write-me::

* Curried functions
* Custom operators

Objects and Classes
-------------------

.. TODO: Use testcode throughout this section.

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

.. TODO: s/func/def for methods.

.. TODO: Discuss arg names and API arg names.

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

.. write-me::

* deinit
* Local vs API names
* Optional chaining with ?

Enumerations and Structures
---------------------------

You use ``enum`` to create an enumeration.
Like classes and all other types,
enumerations can have methods associated with them.

.. testcode::

    -> enum Suit {
          case Spades, Hearts, Diamonds, Clubs
          func description() -> String {
             switch self {
                case .Spades:
                   return "spades"
                case .Hearts:
                   return "hearts"
                case .Diamonds:
                   return "diamonds"
                case .Clubs:
                   return "clubs"
             }
          }
       }
    -> let hearts = Suit.Hearts
    << // hearts : Suit = <unprintable value>
    -> let heartsDescription = hearts.description()
    << // heartsDescription : String = "hearts"

.. admonition:: Experiment

   Add a ``color`` method to ``Suit`` which returns "black"
   for spades and clubs, and returns "red" for hearts and diamonds.

.. Suits are in Bridge order, which matches Unicode order.
   In other games, orders differ.
   Wikipedia lists a good half dozen orders.

When creating the ``hearts`` constant,
the enumeration member ``Suit.Hearts`` had to be written out in full,
but inside the switch it could be abbreviated as just ``.Hearts``.
You can use the abbreviated form
anytime the value's type is already known.

Enumerations can have a mapping on an underlying raw value,
such as a number or a string.
In the example below,
the underlying value is an integer,
so you only have to specify the first value
and the rest of the raw values
are assigned in order by incrementing the number.
You can also use strings or floating-point numbers
as the raw type of an enumeration.

.. testcode::

    -> enum Rank: Int {
          case Ace = 1
          case Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten
          case Jack, Queen, King
          func description() -> String {
             switch self {
                case .Ace:
                   return "ace"
                case .Jack:
                   return "jack"
                case .Queen:
                   return "queen"
                case .King:
                   return "king"
                default:
                   return String(self.toRaw())
             }
          }
       }
    -> let ace = Rank.Ace
    << // ace : Rank = <unprintable value>
    -> let aceRawValue = ace.toRaw()
    <$ : Int = 1

.. admonition:: Experiment

   Write a function that compares two ``Rank`` values
   by comparing their raw values.

The ``toRaw`` and ``fromRaw`` functions let you convert
between the raw value and the enumeration value.

.. write-me::

    Structs are also pretty much as expected.
    They can have methods too.

    TODO: Use a loop to generate a whole deck.

Use ``struct`` to create a structure.
Structures support many of the same behaviors as classes,
including methods and initializers.
Unlike classes,
structures are always copied when they are passed around in your code.

.. testcode::

    -> struct Card {
          var rank: Rank
          var suit: Suit
          func description() -> String {
             return "The \(rank.description()) of \(suit.description())"
          }
       }
    -> let threeOfSpades = Card(rank: .Three, suit:.Spades)
    << // threeOfSpades : Card = Card(<unprintable value>, <unprintable value>)
    -> let threeOfSpadesDescription = threeOfSpades.description()
    << // threeOfSpadesDescription : String = "The 3 of spades"

Enumerations can have other values associated with them.
This is different than a raw value:
the raw value is always the same,
but you provide the associated values
when you create the instance of the enumeration.
For example,
consider the case of requesting
the sunrise and sunset time from a server.
The server either responds with the information,
or it responds with some error information.

.. TODO: Would be better to use a non-string here...
   Avoiding temperatures because of the F/C problem.
   What about a collection of data that has some missing values?

.. testcode::

    -> enum ServerResponse {
          case Result(String, String)
          case Error(String)
       }
    ---
    -> let success = ServerResponse.Result("6:00 am", "8:09 pm")
    << // success : ServerResponse = <unprintable value>
    -> let failure = ServerResponse.Error("Out of cheese.")
    << // failure : ServerResponse = <unprintable value>
    ---
    >> var test_response: String = ""
    >> switch success {
    >>    case let .Result(sunrise, sunset):
    >>       test_response = "Sunrise is at \(sunrise) and sunset is at \(sunset)."
    >>    case let .Error(error):
    >>       test_response = "Failure...  \(error)"
    >> }
    >> test_response
    << // test_response : String = "Sunrise is at 6:00 am and sunset is at 8:09 pm."
    -> switch success {
          case let .Result(sunrise, sunset):
             let serverResponse = "Sunrise is at \(sunrise) and sunset is at \(sunset)."
          case let .Error(error):
             let serverResponse = "Failure...  \(error)"
       }

.. Note:
   The repetition ond odd structure for the switch above is because
   the REPL requires an initial value for variables to make it testable.
   From a playground side, I can see the value of a variable
   that's scoped only within the switch,
   so I don't need a variable in the outer scope.

.. admonition:: Experiment

   Add a third case to ``ServerResponse`` and to the switch.

Notice how the sunrise and sunset times
are extracted from the ``ServerResponse`` value
as part of a pattern matching operation.

Protocols
---------

.. write-me::

* Supported by both reference and value types
* First class type -- usable in variable declarations etc.
* Can provide a default implementation.


Generics
--------

Write a name inside angle brackets
to make a generic function or type.

.. testcode::

    -> func repeat<ItemType>(item: ItemType, times: Int) -> ItemType[] {
          var result = Array<ItemType>()
          for i in 0...times {
              result += item
          }
          return result
       }
    -> repeat("knock", 4)
    <$ : String[] = [knock, knock, knock, knock]

.. admonition:: Experiment

   Make a version of anyMatch that accepts an array of any type,
   not just an array if integers.

You can make generic forms of functions and methods,
as well as classes, enumerations, and structures.

.. This example makes the REPL segfault.
   <rdar://problem/16947344> REPL segfaults when creating instance of generic enum

.. FIXME: Add testcode expectation lines.

.. testcode::

    -> enum Tree<T> {
          case LeafNode(T)
          case InternalNode(Tree, Tree)
          func leafCount() -> Int {
             switch self {
                case let .LeafNode(item):
                   return 1
                case let .InternalNode(leftNode, rightNode):
                   return leftNode.leafCount() + rightNode.leafCount()
             }
          }
       }
    -> let leafOne = Tree.LeafNode(1)
    -> let leafTwo = Tree.LeafNode(7)
    -> let tree = Tree.InternalNode(leafOne, leafTwo)
    -> let leaves = tree.leafCount()

..

    This bit doesn't quite work yet...
    it needs to either return a copy of the tree
    or create new nodes and update ``self``
    to give you back a new tree.

        func map(transform: T -> T) {
            switch self {
                case let .Leaf(item):
                    item = transform(item)
                case let .Branch(leftNode, rightNode):
                    leftNode.map(transform)
                    rightNode.map(transform)
            }
        }




Use ``where`` after the type name
to specify a list of requirements ---
for example,
a protocol that that the type must implement
or a class that it must be a subclass of.

    func anyCommonElements <T, U where
            T: Collection, U: Collection,
            T.GeneratorType.Element: Equatable,
            U.GeneratorType.Element: Equatable,
            T.GeneratorType.Element == U.GeneratorType.Element>
    (lhs: T, rhs: U) -> Bool {
        for lhsItem in lhs {
            for rhsItem in rhs {
                if lhsItem == rhsItem {
                    return true
                }
            }
        }
        return false
    }

    anyCommonElements([1, 2, 3], [3])
    // r0 : Bool = true
    anyCommonElements([1, 2, 3], [5])
    // r1 : Bool = false

    <T: Generator where T.Element: Equatable>

In the simple cases,
you can omit ``where`` and just write
you can just write the protocol or class name after a colon.
Writing ```<T: Equatable>``
is the same as writing ``<T where T: Equatable>``.
