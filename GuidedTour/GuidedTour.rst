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
You don't need to import a separate library for functionality like
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
Use ``let`` for a constant and use ``var`` for a variable.
The value of a constant 
doesn't need to be known at compile time,
as long as it assigned only once.
This means you can use constants to name a value
that you determine once but use in many places.

.. testcode::

   -> var myVariable = 42
   << // myVariable : Int = 42
   -> myVariable = 50
   >> myVariable
   << // myVariable : Int = 50
   -> let myConstant = 42

.. TR: Is the requirement that constants need an initial value
   a current REPL limitation, or an expected language feature?

A constant or variable must have the same type
as the value you want to assign to it.
However, you don't have to explicitly write
the type of every single constant and variable.
Providing an initial value lets the compiler infer
the type of the constant or variable.
For example, in example above
the compiler infers that ``myVariable`` is an integer
because its initial value is a integer.

If the initial value doesn't provide enough information
(or if there is no initial value)
by writing the type after the variable,
separated by a colon.

.. testcode::

   -> let implicitInteger = 70
   << // implicitInteger : Int = 70
   -> let implicitDouble = 70.0
   << // implicitDouble : Double = 70.0
   -> let explicitDouble: Double = 70
   << // explicitDouble : Double = 70.0

.. admonition:: Experiment

   Create a constant with
   an explicit type of ``Float`` and a value of ``4``.

   Try providing an explicit type of ``String``
   for a variable with an initial value of 3.
   What error do you get?

.. TODO: Needs to go somewhere, but not here.

   Numeric literals that don't have a decimal point
   are treated as an integer by default,
   but type inference can make them floating point numbers
   if the expression would otherwise be invalid.
   For example,
   if the value of ``seven`` is the integer ``7``,
   the result of ``seven / 2`` is the integer ``3``.
   However, if its value is ``7.0``
   the result of ``seven / 2`` is ``3.5`` ---
   dividing a floating point number by an integer would be a type error,
   so the type of ``2`` is understood as ``2.0``.

   7 / 2     // 3 (an integer)
   7.0 / 2   // 3.5
   let seven = 7.0
   let two = 2
   seven / two  // type error

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

    -> var shoppingList = ["catfish", "water", "tulips", "blue paint"]
    << // shoppingList : Array<String> = ["catfish", "water", "tulips", "blue paint"]
    -> shoppingList[1] = "bottle of water"
    ---
    -> var occupations = [
          "Malcolm": "Captain",
          "Kayley": "Mechanic",
          "Jayne": "Public Relations",
        ]
    << // occupations : Dictionary<String, String> = Dictionary<String, String>(1.33333333333333, 3, <DictionaryBufferOwner<String, String> instance>)

To create an empty array or dictionary,
use the initializer syntax.

.. testcode::

   -> let emptyArray = String[]()
   << // emptyArray : Array<String> = []
   -> let emptyDictionary = Dictionary<String, Float>()
   << // emptyDictionary : Dictionary<String, Float> = Dictionary<String, Float>(1.33333333333333, 0, <DictionaryBufferOwner<String, Float> instance>)

If type information can be inferred,
such as when you set a new value for a variable
or pass an argument to a function,
you can write an empty array as ``[]``
and an empty dictionary as ``[:]``.

.. testcode::

   -> shoppingList = []   // Went shopping and bought everything.

Control Flow
------------

Use ``if`` and ``switch`` to make conditionals,
and use ``for``-``in``, ``for``, ``while``, and ``do``-``while``
to make loops.
Parentheses around the condition or loop variable are optional.
Braces around the body are required.

.. testcode::

    -> let individualScores = [75, 43, 103, 87, 12]
    << // individualScores : Array<Int> = [75, 43, 103, 87, 12]
    -> var teamScore = 0
    << // teamScore : Int = 0
    -> for score in individualScores {
           if score > 50 {
               teamScore += 3
           } else {
               teamScore += 1
           }
       }
    >> teamScore
    << // teamScore : Int = 11

..
   -> let haveJellyBabies = true
   << // haveJellyBabies : Bool = true
   -> if haveJellyBabies {
      }
   << Would you like a jelly baby?

In an ``if`` statement,
the conditional must be a Boolean expression;
code like ``if score { ... }`` is an error,
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

Switches support any kind of data, not just integers,
and the matching criteria can be more complex
than simple comparison.

.. testcode::

   -> let vegetable = "red pepper"
   << // vegetable : String = "red pepper"
   -> switch vegetable {
         case "celery":
            println("Add some raisins and make ants on a log.")
         case "cucumber", "watercress":
            println("That would make a good tea sandwich.")
         case let x where x.hasSuffix("pepper"):
            println("Is it a spicy \(x)?")
         default:
            println("Everything tastes good in soup.")
      }
   << Is it a spicy red pepper?

.. admonition:: Experiment

   Add a case for vegetable names that start
   with an uppercase letter.

   Try removing the default case.
   What error do you get?

.. TODO: The "starts with uppercase" is probably too much of a stretch
   before having learned about string operations.

After executing the code inside the switch case that matched,
the program exits from the switch statement.
Execution doesn't continue or "fall through" to the next case,
so there is no need to explicitly break out of the switch
at the end of each case‘s code.

.. Omitting mention of "fallthrough" keyword.
   It's in the guide/reference if you need it.

.. Haven't shown structs or enums yet --
   revisit switch statements at that point
   to show another cool thing.


.. the focus here should be on .. and ...

It loops that use an index,
the range operators ``..`` and ``...``
let you write code that is easier to read.
The ``..`` operator includes both its start and end in the range,
like writing ``<=`` in a conditional of a ``for`` loop.
the ``...`` operator includes the start but not the end,
like writing ``<`` in a conditional of a ``for`` loop.
These two loops do the same thing:

.. testcode::

   -> for i in 0...5 {
         println(i)
      }
   << 0
   << 1
   << 2
   << 3
   << 4
   -> for var i = 0; i < 5; ++i {
         println(i)
      }
   << 0
   << 1
   << 2
   << 3
   << 4

You can also use ``for`` to iterate over items in a dictionary
by providing a variable name to use
for each key-value pair.

.. EDIT: key/value or key-value?

.. TODO: Shorten listing

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

    -> func returnFifteen() -> Int {
          var y = 10
          func add() -> () {
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
          func addOne(number: Int) -> Int {
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

    -> func hasAnyMatches(list: Int[], condition: Int -> Bool) -> Bool {
          for item in list {
             if condition(item) {
                return true
             }
          }
          return false
       }
    -> func lessThanTen(number: Int) -> Bool {
          return number < 10
       }
    -> var numbers = [20, 19, 7, 12]
    << // numbers : Array<Int> = [8, 3, 5, 6]
    -> hasAnyMatches(numbers, lessThanTen)
    <$ : Bool = true

Closures are the same as functions with one difference:
you don't give them a name when you declare them.
You write a closure as code surrounded by braces (``{}``)
and use ``in`` to separate the arguments from the body.

.. TODO: This notion of closures being "just" un-named functions is problematic.
   See Dave's recent work in the Guide comparing the two.

.. EDIT: Second sentence above reads better as describing singular closure.

.. testcode::

    -> numbers.map({
          (number: Int) -> Int in
          let result = 3 * number
          return result
       })
    <$ : Array<Int> = [24, 9, 15, 18]

.. The closure's return type has to be specified here
   because type inference can't determine it.
   If the value of the whole expression
   is assigned to a variable of known type,
   then it can be omitted.
   The whole point of this first example
   is that it *doesn't* omit anything.

   var l: Int[] = numbers.map({
             (number: Int) in
             let result = 3 * number
             return result
          })
       

You have several options for writing closures more concisely.
When the closure's type is already known,
such as the callback for a delegate,
you can omit the type of its parameters,
its return type, or both.
Single statement closures implicitly return the value
of their only statement.

.. testcode::

    -> numbers.map({ number in 3 * number })
    <$ : Array<Int> = [24, 9, 15, 18]

For even more brevity,
you can refer to parameters by number instead of by name.
A closure passed as the last argument to a function
can appear immediately after the parentheses.

.. testcode::

    -> sort([1, 5, 3, 12, 2]) { $0 > $1 }
    <$ : Array<Int> = [12, 5, 3, 2, 1]

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

.. testcode::

    -> class Shape {
          var numberOfSides: Int = 0
          func description() -> String {
             return "A shape with \(numberOfSides) sides."
          }
       }
    >> Shape().description()
    <$ : String = "A shape with 0 sides."

.. admonition:: Experiment

   Try adding a constant property using ``let``
   and adding another method that takes an argument.

Instances of the class are created
by putting parentheses after the class name,
and the properties an methods of the instance
are accessed using dot syntax.

.. testcode::

    -> var shape = Shape()
    << // shape : Shape = <Shape instance>
    -> shape.numberOfSides = 7
    -> var shapeDescription = shape.description()
    << // shapeDescription : String = "A shape with 7 sides."

This version of the ``Shape`` class is missing something important:
an initializer to set up the class when an instance is created.
The initializer similar to a function,
but it begins with ``init`` instead of ``func`` and has no function name.

.. TODO: Probably worth pointing out that the initializer isn't a method.

.. TODO: s/func/def for methods.

.. TODO: Discuss arg names and API arg names.

.. testcode::

    -> class NamedShape {
          var numberOfSides: Int = 0
          var name: String

          init(name: String) {
             self.name = name
          }

          func description() -> String {
             return "A shape with \(numberOfSides) sides."
          }
       }
    >> NamedShape(name: "test name").name
    <$ : String = "test name"
    >> NamedShape(name: "test name").description()
    <$ : String = "A shape with 0 sides."


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

.. testcode::

    -> class Square: NamedShape {
          var sideLength: Double

          init(sideLength: Double, name: String) {
             self.sideLength = sideLength
             super.init(name: name)
             numberOfSides = 4
          }

          func area() ->  Double {
             return sideLength * sideLength
          }

          override func description() -> String {
             return "A square with sides of length \(sideLength)."
          }
       }
    -> let test = Square(sideLength: 5.2, name: "my test square")
    << // test : Square = <Square instance>
    -> test.area()
    <$ : Double = 27.04
    -> test.description()
    <$ : String = "A square with sides of length 5.2."

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

.. testcode::

    -> let PI = 3.14159265
    << // PI : Double = 3.14159265
    -> let TWO_PI = 2 * PI
    << // TWO_PI : Double = 6.2831853
    ---
    -> class Circle: NamedShape {
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
               super.init(name: name)
               numberOfSides = 1
           }

           override func description() -> String {
              return "A circle with radius of length \(radius)."
           }
       }
    -> var circle = Circle(radius: 12.7, name: "a circle")
    <$ : Circle = <Circle instance>
    -> circle.area
    <$ : Double = 506.7074785185
    -> circle.circumference = 31.4
    -> circle.radius
    <$ : Double = 4.99746521879595

In the setter for ``circumference`` the new value
has the implicit name ``newValue``.
You can provide an explicit name in parentheses after ``set``.

If you don't need to computer the property
but still need to provide code that is run before and after setting a new value,
use ``willSet`` and ``didSet``.
For example, the class below ensures
that the radius of its circle
is always the same as the side length of its square.

.. testcode::

   -> class CircleAndSquare {
         var circle: Circle {
            willSet {
               square.sideLength = newValue.radius
            }
         }
         var square: Square {
            willSet {
               circle.radius = newValue.sideLength
            }
         }
         init(size: Double, name: String) {
            square = Square(size, name)
            circle = Circle(size, name)
         }
      }
   -> var circleAndSquare = CircleAndSquare(size: 10, name: "another test shape")
   << // circleAndSquare : CircleAndSquare = <CircleAndSquare instance>
   -> circleAndSquare.square.sideLength
   <$ : Double = 10.0
   -> circleAndSquare.circle.radius
   <$ : Double = 10.0
   -> circleAndSquare.square = Square(sideLength: 50, name: "larger square")
   -> circleAndSquare.circle.radius
   <$ : Double = 50.0

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
Like classes and all other named types,
enumerations can have methods associated with them.

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
    << // ace : Rank = <opaque>
    -> let aceRawValue = ace.toRaw()
    <$ : Int = 1

.. admonition:: Experiment

   Write a function that compares two ``Rank`` values
   by comparing their raw values.

In the example above,
the raw value type of the enuration is ``Int``,
so you only have to specify the first raw value.
The rest of the raw values are assigned in order.
You can also use strings or floating-point numbers
as the raw type of an enumeration.

The ``toRaw`` and ``fromRaw`` functions let you convert
between the raw value and the enumeration value.

.. testcode::

    >> var test_threeDescription = ""
    -> if let convertedRank = Rank.fromRaw(3) {
    ->    let threeDescription = convertedRank.description()
    >>    test_threeDescription = threeDescription
    -> }
    >> test_threeDescription
    <$ : String "3"

The member values of an enumeration are actual values,
not just another way of writing their raw values.
In fact,
in cases where there isn't a meaningful raw value,
you don't have to provide one.

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
    << // hearts : Suit = <opaque>
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

Use ``struct`` to create a structure.
Structures support many of the same behaviors as classes,
including methods and initializers.
One of the most important differences
between structures and classes is that
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
    << // threeOfSpades : Card = V4REPL4Card (has 2 children)
    -> let threeOfSpadesDescription = threeOfSpades.description()
    << // threeOfSpadesDescription : String = "The 3 of spades"

.. admonition:: Experiment

   Add a method to ``Card`` that creates
   a full deck of cards,
   with one card of each combination of rank and suit.

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

Protocols and Extensions
------------------------

Use ``protocol`` to declare a protocol:

.. testcode::

    -> protocol ExampleProtocol {
           var simpleDescription: String { get }
           mutating func adjust()
       }

Classes, enumerations, and structs can all adopt protocols.

.. testcode::

    -> class SimpleClass: ExampleProtocol {
           var simpleDescription: String = "A very simple class."
           var anotherProperty: Int = 69105
           func adjust() {
               simpleDescription += "  Now 100% adjusted."
           }
       }
    -> var a = SimpleClass()
    << // a : SimpleClass = <SimpleClass instance>
    -> a.adjust()
    -> let aDescription = a.simpleDescription
    << // aDescription : String = "A very simple class.  Now 100% adjusted"
    ---
    -> struct SimpleStructure: ExampleProtocol {
           var simpleDescription: String = "A simple structure"
           mutating func adjust() {
               simpleDescription += " (adjusted)"
           }
       }
    -> var b = SimpleStructure()
    << // b : SimpleStructure = SimpleStructure("A simple structure")
    -> b.adjust()
    -> let bDescription = b.simpleDescription
    << // bDescription : String = "A simple structure (adjusted)"

.. admonition:: Experiment

   Write an enumeration that conforms to this protocol.

Notice the use of ``mutating`` in the declaration of ``SimpleStruct``
to mark a struct method that modifies the structure.
It is not needed in the declaration of ``SimpleClass``
because any method on a class can modify the class.

Use ``extension`` to add functionality to an existing type,
such as new methods and computed properties.
You can use an extension to add protocol conformance
to a type that is declared elsewhere,
or even a type you imported from a library or framework.

.. testcode::

    -> extension Int: ExampleProtocol {
           var simpleDescription: String {
               return "The number \(self)"
           }
           mutating func adjust() {
               self += 42
           }
        }
    -> 7.simpleDescription
    << // r0 : String = "The number 7"

.. admonition:: Experiment

   Write an extension for the ``Double`` type
   that adds an ``absoluteValue`` property.

You can use a protocol name just like any other named type ---
for example, to create a collection of objects
that have different types
but all conform to a particular protocol.
When you work with values whose type is a protocol type,
methods outside the protocol definition are not available.

.. testcode::

    -> let protocolValue: ExampleProtocol = a
    << protocolValue : ExampleProtocol = <ExampleProtocol instance>
    -> l.simpleDescription
    <$ : String = "A very simple class.  Now 100% adjusted"
    // l[0].anotherProperty  // Uncomment to see the error

Even though the first element of the array
has a runtime type of ``SimpleClass``,
the compiler treats it as the given type of ``ExampleProtocol``.
This means that you can't accidentally access
methods or properties that the class implements
in addition to its protocol conformance.

Generics
--------

.. write-me::

* On function (repeat X n times, re-implementing Array init feature)
* On classes, structures, and enumerations

.. TODO: Add a "Continue Reading" section
   which gives folks who opened this in a playground
   a link back to the web version of the book.
