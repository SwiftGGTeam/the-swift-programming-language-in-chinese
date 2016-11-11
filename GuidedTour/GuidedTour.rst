A Swift Tour
============

.. editable-in-playground::

Tradition suggests that the first program in a new language
should print the words “Hello, world!” on the screen.
In Swift, this can be done in a single line:

.. K&R uses “hello, world”.
   It seems worth breaking with tradition to use proper casing.

.. test::
   :name: intro
   :prints: Hello, world

   print("Hello, world!")

If you have written code in C or Objective-C,
this syntax looks familiar to you ---
in Swift, this line of code is a complete program.
You don't need to import a separate library for functionality like
input/output or string handling.
Code written at global scope is used
as the entry point for the program,
so you don't need a ``main()`` function.
You also don't need to write semicolons
at the end of every statement.

This tour gives you enough information
to start writing code in Swift
by showing you how to accomplish a variety of programming tasks.
Don’t worry if you don’t understand something ---
everything introduced in this tour
is explained in detail in the rest of this book.

Simple Values
-------------

Use ``let`` to make a constant and ``var`` to make a variable.
The value of a constant
doesn't need to be known at compile time,
but you must assign it a value exactly once.
This means you can use constants to name a value
that you determine once but use in many places.

.. test::
   :name: simple values

   var myVariable = 42
   myVariable = 50
   let myConstant = 42

A constant or variable must have the same type
as the value you want to assign to it.
However, you don't always have to write the type explicitly.
Providing a value when you create a constant or variable
lets the compiler infer its type.
In the example above,
the compiler infers that ``myVariable`` is an integer
because its initial value is an integer.

If the initial value doesn't provide enough information
(or if there is no initial value),
specify the type by writing it after the variable,
separated by a colon.

.. test::
   :name: simple values
   :cont:
   :compiler-warnings: 'is' test is always true
                       'is' test is always true

   let implicitInteger = 70
   let implicitDouble = 70.0
   let explicitDouble: Double = 70
   // -HIDE-
   assert(implicitInteger is Int)
   assert(implicitDouble is Double)
   // -SHOW-

.. admonition:: Experiment

   Create a constant with
   an explicit type of ``Float`` and a value of ``4``.

Values are never implicitly converted to another type.
If you need to convert a value to a different type,
explicitly make an instance of the desired type.

.. test::
   :name: simple values
   :cont:

   let label = "The width is "
   let width = 94
   let widthLabel = label + String(width)
   // -HIDE-
   assert(widthLabel == "The width is 94")
   // -SHOW-

.. admonition:: Experiment

   Try removing the conversion to ``String`` from the last line.
   What error do you get?

.. TODO: Discuss with Core Writers ---
   are these experiments that make you familiar with errors
   helping you learn something?

There's an even simpler way to include values in strings:
Write the value in parentheses,
and write a backslash (``\``) before the parentheses.
For example:

.. test::
   :name: simple values
   :cont:

   let apples = 3
   let oranges = 5
   let appleSummary = "I have \(apples) apples."
   let fruitSummary = "I have \(apples + oranges) pieces of fruit."
   // -HIDE-
   assert(appleSummary == "I have 3 apples.")
   assert(fruitSummary == "I have 8 pieces of fruit.")

.. admonition:: Experiment

   Use ``\()`` to
   include a floating-point calculation in a string
   and to include someone’s name in a greeting.

Create arrays and dictionaries using brackets (``[]``),
and access their elements by writing
the index or key in brackets.
A comma is allowed after the last element.

.. REFERENCE
   Shopping list is a reference to the book "Paper Towns" by John Green
   and the song "The List" by Hank Green.
   See <https://www.youtube.com/watch?v=4JUvTTm0whA>

.. REFERENCE
   Occupations is a reference to Firefly,
   specifically to Mal's joke about Jayne's job on the ship.
    
   

   Can't find the specific episode,
   but it shows up in several lists of Firefly "best of" quotes:

   Mal: Jayne, you will keep a civil tongue in that mouth, or I will sew it shut.
        Is there an understanding between us?
   Jayne: You don't pay me to talk pretty. [...]
   Mal: Walk away from this table. Right now.
   [Jayne loads his plate with food and leaves]
   Simon: What *do* you pay him for?
   Mal: What?
   Simon: I was just wondering what his job is - on the ship.
   Mal: Public relations.

.. test::
   :name: simple values
   :cont:

   var shoppingList = ["catfish", "water", "tulips", "blue paint"]
   shoppingList[1] = "bottle of water"
   assert(shoppingList == ["catfish", "bottle of water", "tulips", "blue paint"]) // -HIDE-

   var occupations = [
       "Malcolm": "Captain",
       "Kaylee": "Mechanic",
    ]
   occupations["Jayne"] = "Public Relations"
   assert(occupations == ["Kaylee": "Mechanic", "Malcolm": "Captain", "Jayne": "Public Relations"]) // -HIDE-

To create an empty array or dictionary,
use the initializer syntax.

.. test::
   :name: simple values
   :cont:

   let emptyArray = [String]()
   let emptyDictionary = [String: Float]()

If type information can be inferred,
you can write an empty array as ``[]``
and an empty dictionary as ``[:]`` ---
for example, when you set a new value for a variable
or pass an argument to a function.

.. test::
   :name: simple values
   :cont:

   shoppingList = []
   occupations = [:]

Control Flow
------------

Use ``if`` and ``switch`` to make conditionals,
and use ``for``-``in``, ``for``, ``while``, and ``repeat``-``while``
to make loops.
Parentheses around the condition or loop variable are optional.
Braces around the body are required.

.. test::
   :name: control flow
   :prints: 11

   let individualScores = [75, 43, 103, 87, 12]
   var teamScore = 0
   for score in individualScores {
       if score > 50 {
           teamScore += 3
       } else {
           teamScore += 1
       }
   }
   print(teamScore)

.. REFERENCE
   Jelly babies are a candy/sweet that was closely associated
   with past incarnations of the Doctor in Dr. Who.

..
   -> let haveJellyBabies = true
   << // haveJellyBabies : Bool = true
   -> if haveJellyBabies {
      }
   << Would you like a jelly baby?

In an ``if`` statement,
the conditional must be a Boolean expression ---
this means that code such as ``if score { ... }`` is an error,
not an implicit comparison to zero.

You can use ``if`` and ``let`` together
to work with values that might be missing.
These values are represented as optionals.
An optional value either contains a value
or contains ``nil`` to indicate that a value is missing.
Write a question mark (``?``) after the type of a value
to mark the value as optional.

.. REFERENCE
   John Appleseed is a stock Apple fake name,
   going back at least to the contacts database
   that ships with the SDK in the simulator.

.. test::
   :name: control flow
   :cont:
   :prints: false
            Hello, John Appleseed

   var optionalString: String? = "Hello"
   print(optionalString == nil)

   var optionalName: String? = "John Appleseed"
   var greeting = "Hello!"
   if let name = optionalName {
       greeting = "Hello, \(name)"
   }
   print(greeting)

.. admonition:: Experiment

   Change ``optionalName`` to ``nil``.
   What greeting do you get?
   Add an ``else`` clause that sets a different greeting
   if ``optionalName`` is ``nil``.

If the optional value is ``nil``,
the conditional is ``false`` and the code in braces is skipped.
Otherwise, the optional value is unwrapped and assigned
to the constant after ``let``,
which makes the unwrapped value available
inside the block of code.

Another way to handle optional values
is to provide a default value using the ``??`` operator.
If the optional value is missing,
the default value is used instead.

.. test::
   :name: control flow
   :cont:

   let nickName: String? = nil
   let fullName: String = "John Appleseed"
   let informalGreeting = "Hi \(nickName ?? fullName)"
   assert(informalGreeting == "Hi John Appleseed") // -HIDE-

Switches support any kind of data
and a wide variety of comparison operations ---
they aren't limited to integers
and tests for equality.

.. REFERENCE
   The vegetables and foods made from vegetables
   were just a convenient choice for a switch statement.
   They have various properties
   and fit with the apples & oranges used in an earlier example.

.. test::
   :name: control flow
   :cont:
   :prints: Is it a spicy red pepper?

   let vegetable = "red pepper"
   switch vegetable {
       case "celery":
           print("Add some raisins and make ants on a log.")
       case "cucumber", "watercress":
           print("That would make a good tea sandwich.")
       case let x where x.hasSuffix("pepper"):
           print("Is it a spicy \(x)?")
       default:
           print("Everything tastes good in soup.")
   }

.. admonition:: Experiment

   Try removing the default case.
   What error do you get?

Notice how ``let`` can be used in a pattern
to assign the value that matched the pattern
to a constant.

After executing the code inside the switch case that matched,
the program exits from the switch statement.
Execution doesn't continue to the next case,
so there is no need to explicitly break out of the switch
at the end of each case’s code.

.. Omitting mention of "fallthrough" keyword.
   It's in the guide/reference if you need it.

You use ``for``-``in`` to iterate over items in a dictionary
by providing a pair of names to use
for each key-value pair.
Dictionaries are an unordered collection,
so their keys and values are iterated over
in an arbitrary order.

.. REFERENCE
   Prime, square, and fibonacci numbers
   are just convenient sets of numbers
   that many developers are already familiar with
   that we can use for some simple math.

.. test::
   :name: control flow
   :cont:
   :prints: 25

   let interestingNumbers = [
       "Prime": [2, 3, 5, 7, 11, 13],
       "Fibonacci": [1, 1, 2, 3, 5, 8],
       "Square": [1, 4, 9, 16, 25],
   ]
   var largest = 0
   for (kind, numbers) in interestingNumbers {
       for number in numbers {
           if number > largest {
               largest = number
           }
       }
   }
   print(largest)

.. admonition:: Experiment

   Add another variable to keep track of which kind of number
   was the largest, as well as what that largest number was.

Use ``while`` to repeat a block of code until a condition changes.
The condition of a loop can be at the end instead,
ensuring that the loop is run at least once.


.. REFERENCE
   This example is rather skeletal -- m and n are pretty boring.
   I couldn't come up with anything suitably interesting at the time though,
   so I just went ahead and used this.

.. test::
   :name: control flow
   :cont:
   :prints: 128
            128

   var n = 2
   while n < 100 {
       n = n * 2
   }
   print(n)

   var m = 2
   repeat {
       m = m * 2
   } while m < 100
   print(m)

You can keep an index in a loop
by using ``..<`` to make a range of indexes.

.. test::
   :name: control flow
   :cont:
   :prints: 6

   var total = 0
   for i in 0..<4 {
       total += i
   }
   print(total)

Use ``..<`` to make a range that omits its upper value,
and use ``...`` to make a range that includes both values.

Functions and Closures
----------------------

Use ``func`` to declare a function.
Call a function by following its name
with a list of arguments in parentheses.
Use ``->`` to separate the parameter names and types
from the function's return type.

.. REFERENCE
   Bob is used as just a generic name,
   but also a callout to Alex's dad.
   Tuesday is used on the assumption that lots of folks would be reading
   on the Tuesday after the WWDC keynote.

.. test::
   :name: functions

   func greet(person: String, day: String) -> String {
       return "Hello \(person), today is \(day)."
   }
   let result_greet_1 = // -HIDE-
   greet(person: "Bob", day: "Tuesday")
   assert(result_greet_1 == "Hello Bob, today is Tuesday.") // -HIDE-

.. admonition:: Experiment

   Remove the ``day`` parameter.
   Add a parameter to include today’s lunch special in the greeting.

By default,
functions use their parameter names
as labels for their arguments.
Write a custom argument label before the parameter name,
or write ``_`` to use no argument label.

.. test::
   :name: functions
   :cont:

   func greet(_ person: String, on day: String) -> String {
       return "Hello \(person), today is \(day)."
   }
   let result_greet_2 = // -HIDE-
   greet("John", on: "Wednesday")
   assert(result_greet_2 == "Hello John, today is Wednesday.") // -HIDE-

Use a tuple to make a compound value ---
for example, to return multiple values from a function.
The elements of a tuple can be referred to
either by name or by number.

.. REFERENCE
   Min, max, and sum are convenient for this example
   because they are all simple operations
   that are performed on the same kind of data.
   This gives the function a reason to return a tuple.

.. test::
   :name: functions
   :cont:
   :prints: 120
            120

   func calculateStatistics(scores: [Int]) -> (min: Int, max: Int, sum: Int) {
       var min = scores[0]
       var max = scores[0]
       var sum = 0

       for score in scores {
           if score > max {
               max = score
           } else if score < min {
               min = score
           }
           sum += score
       }

       return (min, max, sum)
   }

   let statistics = calculateStatistics(scores: [5, 3, 100, 3, 9])
   print(statistics.sum)
   print(statistics.2)

Functions can also take a variable number of arguments,
collecting them into an array.

.. test::
   :name: functions
   :cont:

   func sumOf(numbers: Int...) -> Int {
       var sum = 0
       for number in numbers {
           sum += number
       }
       return sum
   }
   let result_sumOf_1 = // -HIDE-
   sumOf()
   assert(result_sumOf_1 == 0) // -HIDE-
   let result_sumOf_2 = // -HIDE-
   sumOf(numbers: 42, 597, 12)
   assert(result_sumOf_2 == 651) // -HIDE-

.. admonition:: Experiment

   Write a function that calculates the average of its arguments.

Functions can be nested.
Nested functions have access to variables
that were declared in the outer function.
You can use nested functions
to organize the code in a function
that is long or complex.

.. test::
   :name: functions
   :cont:

   func returnFifteen() -> Int {
       var y = 10
       func add() {
           y += 5
       }
       add()
       return y
   }
   let result_returnFifteen =  // -HIDE-
   returnFifteen()
   assert(result_returnFifteen == 15) // -HIDE-

Functions are a first-class type.
This means that a function can return another function as its value.

.. test::
   :name: functions
   :cont:

   func makeIncrementer() -> ((Int) -> Int) {
       func addOne(number: Int) -> Int {
           return 1 + number
       }
       return addOne
   }
   var increment = makeIncrementer()
   let result_increment = // -HIDE-
   increment(7)
   assert(result_increment == 8) // -HIDE-

A function can take another function as one of its arguments.

.. test::
   :name: functions
   :cont:

   func hasAnyMatches(list: [Int], condition: (Int) -> Bool) -> Bool {
       for item in list {
           if condition(item) {
               return true
           }
       }
       return false
   }

   func lessThanTen(number: Int) -> Bool {
       return number < 10
   }

   var numbers = [20, 19, 7, 12]
   let result_hasAnyMatches = // -HIDE-
   hasAnyMatches(list: numbers, condition: lessThanTen)
   assert(result_hasAnyMatches == true) // -HIDE-

Functions are actually a special case of closures:
blocks of code that can be called later.
The code in a closure has access to things like variables and functions
that were available in the scope where the closure was created,
even if the closure is in a different scope when it is executed ---
you saw an example of this already with nested functions.
You can write a closure without a name
by surrounding code with braces (``{}``).
Use ``in`` to separate the arguments and return type from the body.

.. test::
   :name: functions
   :cont:

   let result_numbersMap = // -HIDE-
   numbers.map({
       (number: Int) -> Int in
       let result = 3 * number
       return result
   })
   assert(result_numbersMap == [60, 57, 21, 36]) // -HIDE-

.. admonition:: Experiment

   Rewrite the closure to return zero for all odd numbers.

You have several options for writing closures more concisely.
When a closure's type is already known,
such as the callback for a delegate,
you can omit the type of its parameters,
its return type, or both.
Single statement closures implicitly return the value
of their only statement.

.. test::
   :name: functions
   :cont:
   :prints: [60, 57, 21, 36]

   let mappedNumbers = numbers.map({ number in 3 * number })
   print(mappedNumbers)

You can refer to parameters by number instead of by name ---
this approach is especially useful in very short closures.
A closure passed as the last argument to a function
can appear immediately after the parentheses.
When a closure is the only argument to a function,
you can omit the parentheses entirely.

.. test::
   :name: functions
   :cont:
   :prints: [20, 19, 12, 7]

   let sortedNumbers = numbers.sorted { $0 > $1 }
   print(sortedNumbers)

.. Called sorted() on a variable rather than a literal to work around an issue in Xcode.  See <rdar://17540974>.

.. Omitted sort(foo, <) because it often causes a spurious warning in Xcode.  See <rdar://17047529>.

.. Omitted custom operators as "advanced" topics.

Objects and Classes
-------------------

Use ``class`` followed by the class's name to create a class.
A property declaration in a class is written the same way
as a constant or variable declaration,
except that it is in the context of a class.
Likewise, method and function declarations are written the same way.

.. REFERENCE
   Shapes are used as the example object
   because they're familiar and they have a sense of properties
   and a sense of inheritence/subcategorization.
   They're not a perfect fit --
   they might be better off modeled as structures --
   but that wouldn't let them inherit behavior.

.. test::
   :name: classes

   class Shape {
       var numberOfSides = 0
       func simpleDescription() -> String {
           return "A shape with \(numberOfSides) sides."
       }
   }

.. admonition:: Experiment

   Add a constant property with ``let``,
   and add another method that takes an argument.

Create an instance of a class
by putting parentheses after the class name.
Use dot syntax to access
the properties and methods of the instance.

.. test::
   :name: classes
   :cont:

   var shape = Shape()
   shape.numberOfSides = 7
   var shapeDescription = shape.simpleDescription()
   assert(shapeDescription == "A shape with 7 sides.") // -HIDE-

This version of the ``Shape`` class is missing something important:
an initializer to set up the class when an instance is created.
Use ``init`` to create one.

.. test::
   :name: classes
   :cont:

   class NamedShape {
       var numberOfSides: Int = 0
       var name: String
   
       init(name: String) {
          self.name = name
       }
   
       func simpleDescription() -> String {
          return "A shape with \(numberOfSides) sides."
       }
   }
   let result_namedShape = // -HIDE-
   NamedShape(name: "test name").simpleDescription()
   assert(result_namedShape == "A shape with 0 sides.") // -HIDE-

Notice how ``self`` is used to distinguish the ``name`` property
from the ``name`` argument to the initializer.
The arguments to the initializer are passed like a function call
when you create an instance of the class.
Every property needs a value assigned ---
either in its declaration (as with ``numberOfSides``)
or in the initializer (as with ``name``).

Use ``deinit`` to create a deinitializer
if you need to perform some cleanup
before the object is deallocated.

Subclasses include their superclass name
after their class name,
separated by a colon.
There is no requirement for classes to subclass any standard root class,
so you can include or omit a superclass as needed.

Methods on a subclass that override the superclass's implementation
are marked with ``override`` ---
overriding a method by accident, without ``override``,
is detected by the compiler as an error.
The compiler also detects methods with ``override``
that don't actually override any method in the superclass.

.. test::
   :name: classes
   :cont:

   class Square: NamedShape {
       var sideLength: Double

       init(sideLength: Double, name: String) {
           self.sideLength = sideLength
           super.init(name: name)
           numberOfSides = 4
       }

       func area() ->  Double {
           return sideLength * sideLength
       }

       override func simpleDescription() -> String {
           return "A square with sides of length \(sideLength)."
       }
   }

   let test = Square(sideLength: 5.2, name: "my test square")
   let result_testArea = // -HIDE-
   test.area()
   let result_testDescription = // -HIDE-
   test.simpleDescription()
   assert(result_testArea == 27.040000000000003) // -HIDE-
   assert(result_testDescription == "A square with sides of length 5.2.") // -HIDE-

.. admonition:: Experiment

   Make another subclass of ``NamedShape``
   called ``Circle``
   that takes a radius and a name
   as arguments to its initializer.
   Implement an ``area()`` and a ``simpleDescription()`` method
   on the ``Circle`` class.

In addition to simple properties that are stored,
properties can have a getter and a setter.

.. test::
   :name: classes
   :cont:
   :prints: 9.3
            3.3

   class EquilateralTriangle: NamedShape {
       var sideLength: Double = 0.0

       init(sideLength: Double, name: String) {
           self.sideLength = sideLength
           super.init(name: name)
           numberOfSides = 3
       }

       var perimeter: Double {
           get {
                return 3.0 * sideLength
           }
           set {
               sideLength = newValue / 3.0
           }
       }

       override func simpleDescription() -> String {
           return "An equilateral triangle with sides of length \(sideLength)."
       }
   }

   var triangle = EquilateralTriangle(sideLength: 3.1, name: "a triangle")
   print(triangle.perimeter)

   triangle.perimeter = 9.9
   print(triangle.sideLength)

In the setter for ``perimeter``,
the new value has the implicit name ``newValue``.
You can provide an explicit name in parentheses after ``set``.

Notice that the initializer for the ``EquilateralTriangle`` class
has three different steps:

1. Setting the value of properties that the subclass declares.

2. Calling the superclass's initializer.

3. Changing the value of properties defined by the superclass.
   Any additional setup work that uses methods, getters, or setters
   can also be done at this point.

If you don't need to compute the property
but still need to provide code that is run before and after setting a new value,
use ``willSet`` and ``didSet``.
The code you provide is run any time the value changes outside of an initializer.
For example, the class below ensures
that the side length of its triangle
is always the same as the side length of its square.

.. This triangle + square example could use improvement.
   The goal is to show why you would want to use willSet,
   but it was constrained by the fact that
   we're working in the context of geometric shapes.

.. test::
   :name: classes
   :cont:
   :prints: 10.0
            10.0
            50.0

   class TriangleAndSquare {
       var triangle: EquilateralTriangle {
           willSet {
               square.sideLength = newValue.sideLength
           }
       }
       var square: Square {
           willSet {
               triangle.sideLength = newValue.sideLength
           }
       }
       init(size: Double, name: String) {
           square = Square(sideLength: size, name: name)
           triangle = EquilateralTriangle(sideLength: size, name: name)
       }
   }

   var triangleAndSquare = TriangleAndSquare(size: 10, name: "another test shape")
   print(triangleAndSquare.square.sideLength)
   print(triangleAndSquare.triangle.sideLength)

   triangleAndSquare.square = Square(sideLength: 50, name: "larger square")
   print(triangleAndSquare.triangle.sideLength)

.. Grammatically, these clauses are general to variables.
   Not sure what it would look like
   (or if it's even allowed)
   to use them outside a class or a struct.

When working with optional values,
you can write ``?`` before operations like methods, properties, and subscripting.
If the value before the ``?`` is ``nil``,
everything after the ``?`` is ignored
and the value of the whole expression is ``nil``.
Otherwise, the optional value is unwrapped,
and everything after the ``?`` acts on the unwrapped value.
In both cases,
the value of the whole expression is an optional value.

.. test::
   :name: classes
   :cont:

   let optionalSquare: Square? = Square(sideLength: 2.5, name: "optional square")
   let sideLength = optionalSquare?.sideLength
   assert(sideLength == Optional(2.5)) // -HIDE-

Enumerations and Structures
---------------------------

Use ``enum`` to create an enumeration.
Like classes and all other named types,
enumerations can have methods associated with them.

.. REFERENCE
   Playing cards work pretty well to demonstrate enumerations
   because they have two aspects, suit and rank,
   both of which come from a small finite set.
   The deck used here is probably the most common,
   at least through most of Europe and the Americas,
   but there are many other regional variations.

.. test::
   :name: enum and struct

   enum Rank: Int {
       case ace = 1
       case two, three, four, five, six, seven, eight, nine, ten
       case jack, queen, king
       func simpleDescription() -> String {
           switch self {
               case .ace:
                   return "ace"
               case .jack:
                   return "jack"
               case .queen:
                   return "queen"
               case .king:
                   return "king"
               default:
                   return String(self.rawValue)
           }
       }
   }
   let ace = Rank.ace
   let aceRawValue = ace.rawValue
   assert(aceRawValue == 1) // -HIDE-

.. admonition:: Experiment

   Write a function that compares two ``Rank`` values
   by comparing their raw values.

By default, Swift assigns the raw values starting at zero
and incrementing by one each time,
but you can change this behavior by explicitly specifying values.
In the example above, ``Ace`` is explicitly given a raw value of ``1``,
and the rest of the raw values are assigned in order.
You can also use strings or floating-point numbers
as the raw type of an enumeration.
Use the ``rawValue`` property to access the raw value of an enumeration case.

Use the ``init?(rawValue:)`` initializer
to make an instance of an enumeration from a raw value.

.. test::
   :name: enum and struct
   :cont:

   if let convertedRank = Rank(rawValue: 3) {
       let threeDescription = convertedRank.simpleDescription()
       assert(threeDescription == "3") // -HIDE-
   }

The case values of an enumeration are actual values,
not just another way of writing their raw values.
In fact,
in cases where there isn't a meaningful raw value,
you don't have to provide one.

.. test::
   :name: enum and struct
   :cont:

   enum Suit {
       case spades, hearts, diamonds, clubs
       func simpleDescription() -> String {
           switch self {
               case .spades:
                   return "spades"
               case .hearts:
                   return "hearts"
               case .diamonds:
                   return "diamonds"
               case .clubs:
                   return "clubs"
           }
       }
   }

   let hearts = Suit.hearts
   let heartsDescription = hearts.simpleDescription()
   assert(heartsDescription == "hearts") // -HIDE-

.. admonition:: Experiment

   Add a ``color()`` method to ``Suit`` that returns "black"
   for spades and clubs, and returns "red" for hearts and diamonds.

.. Suits are in Bridge order, which matches Unicode order.
   In other games, orders differ.
   Wikipedia lists a good half dozen orders.

Notice the two ways that the ``hearts`` case of the enumeration
is referred to above:
When assigning a value to the ``hearts`` constant,
the enumeration case ``Suit.hearts`` is referred to by its full name
because the constant doesn't have an explicit type specified.
Inside the switch,
the enumeration case is referred to by the abbreviated form ``.hearts``
because the value of ``self`` is already known to be a suit.
You can use the abbreviated form
anytime the value's type is already known.

If an enumeration has raw values,
those values are determined as part of the declaration,
which means every instance of a particular enumeration case
always has the same raw value.
Another choice for enumeration cases
is to have values associated with the case ---
these values are determined when you make the instance,
and they can be different for each instance of an enumeration case.
You can think of the associated values
as behaving like stored properties of the enumeration case instance.
For example,
consider the case of requesting
the sunrise and sunset times from a server.
The server either responds with the requested information,
or it responds with a description of what went wrong.

.. REFERENCE
   The server response is a simple way to essentially re-implement Optional
   while sidestepping the fact that I'm doing so.

   "Out of cheese" is a reference to a Terry Pratchet book,
   which features a computer named Hex.
   Hex's other error messages include:

        - Out of Cheese Error. Redo From Start.
        - Mr. Jelly! Mr. Jelly! Error at Address Number 6, Treacle Mine Road.
        - Melon melon melon
        - +++ Wahhhhhhh! Mine! +++
        - +++ Divide By Cucumber Error. Please Reinstall Universe And Reboot +++
        - +++Whoops! Here comes the cheese! +++

   These messages themselves are references to BASIC interpreters
   (REDO FROM START) and old Hayes-compatible modems (+++).

   The "out of cheese error" may be a reference to a military computer
   although I can't find the source of this story anymore.
   As the story goes, during the course of a rather wild party,
   one of the computer's vacuum tube cabinets
   was opened to provide heat to a cold room in the winter.
   Through great coincidence,
   when a cheese tray got bashed into it during the celebration,
   the computer kept on working even though some of the tubes were broken
   and had cheese splattered & melted all over them.
   Tech were dispatched to make sure the computer was ok
   and told add more cheese if necessary --
   the officer in charge said that he didn't want
   an "out of cheese error" interrupting the calculation.

.. test::
   :name: enum and struct
   :cont:
   :prints: Sunrise is at 6:00 am and sunset is at 8:09 pm.

   enum ServerResponse {
       case result(String, String)
       case failure(String)
   }

   let success = ServerResponse.result("6:00 am", "8:09 pm")
   let failure = ServerResponse.failure("Out of cheese.")

   switch success {
       case let .result(sunrise, sunset):
           print("Sunrise is at \(sunrise) and sunset is at \(sunset).")
       case let .failure(message):
           print("Failure...  \(message)")
   }

.. admonition:: Experiment

   Add a third case to ``ServerResponse`` and to the switch.

Notice how the sunrise and sunset times
are extracted from the ``ServerResponse`` value
as part of matching the value against the switch cases.

Use ``struct`` to create a structure.
Structures support many of the same behaviors as classes,
including methods and initializers.
One of the most important differences
between structures and classes is that
structures are always copied when they are passed around in your code,
but classes are passed by reference.

.. test::
   :name: enum and struct
   :cont:

   struct Card {
       var rank: Rank
       var suit: Suit
       func simpleDescription() -> String {
           return "The \(rank.simpleDescription()) of \(suit.simpleDescription())"
       }
   }

   let threeOfSpades = Card(rank: .three, suit: .spades)
   let threeOfSpadesDescription = threeOfSpades.simpleDescription()
   assert(threeOfSpadesDescription == "The 3 of spades") // -HIDE-

.. admonition:: Experiment

   Add a method to ``Card`` that creates
   a full deck of cards,
   with one card of each combination of rank and suit.

Protocols and Extensions
------------------------

Use ``protocol`` to declare a protocol.

.. test::
   :name: protocols and extensions

   protocol ExampleProtocol {
        var simpleDescription: String { get }
        mutating func adjust()
   }

Classes, enumerations, and structs can all adopt protocols.

.. REFERENCE
   The use of adjust() is totally a placeholder
   for some more interesting operation.
   Likewise for the struct and classes -- placeholders
   for some more interesting data structure.

.. test::
   :name: protocols and extensions
   :cont:

   class SimpleClass: ExampleProtocol {
        var simpleDescription: String = "A very simple class."
        var anotherProperty: Int = 69105
        func adjust() {
             simpleDescription += "  Now 100% adjusted."
        }
   }
   var a = SimpleClass()
   a.adjust()
   let aDescription = a.simpleDescription
   assert(aDescription == "A very simple class.  Now 100% adjusted.") // -HIDE-

   struct SimpleStructure: ExampleProtocol {
        var simpleDescription: String = "A simple structure"
        mutating func adjust() {
             simpleDescription += " (adjusted)"
        }
   }
   var b = SimpleStructure()
   b.adjust()
   let bDescription = b.simpleDescription
   assert(bDescription == "A simple structure (adjusted)") // -HIDE-

.. admonition:: Experiment

   Write an enumeration that conforms to this protocol.

Notice the use of the ``mutating`` keyword
in the declaration of ``SimpleStructure``
to mark a method that modifies the structure.
The declaration of ``SimpleClass`` doesn't need
any of its methods marked as mutating
because methods on a class can always modify the class.

Use ``extension`` to add functionality to an existing type,
such as new methods and computed properties.
You can use an extension to add protocol conformance
to a type that is declared elsewhere,
or even to a type that you imported from a library or framework.

.. test::
   :name: protocols and extensions
   :cont:
   :prints: The number 7

   extension Int: ExampleProtocol {
       var simpleDescription: String {
           return "The number \(self)"
       }
       mutating func adjust() {
           self += 42
       }
   }
   print(7.simpleDescription)

.. admonition:: Experiment

   Write an extension for the ``Double`` type
   that adds an ``absoluteValue`` property.

You can use a protocol name just like any other named type ---
for example, to create a collection of objects
that have different types
but that all conform to a single protocol.
When you work with values whose type is a protocol type,
methods outside the protocol definition are not available.

.. test::
   :name: protocols and extensions
   :cont:
   :prints: A very simple class.  Now 100% adjusted.

   let protocolValue: ExampleProtocol = a
   print(protocolValue.simpleDescription)
   // print(protocolValue.anotherProperty)  // Uncomment to see the error

Even though the variable ``protocolValue``
has a runtime type of ``SimpleClass``,
the compiler treats it as the given type of ``ExampleProtocol``.
This means that you can't accidentally access
methods or properties that the class implements
in addition to its protocol conformance.

Error Handling
--------------

You represent errors using any type that adopts the ``Error`` protocol.

.. REFERENCE
   PrinterError.OnFire is a reference to the Unix printing system's "lp0 on
   fire" error message, used when the kernel can't identify the specific error.
   The names of printers used in the examples in this section are names of
   people who were important in the development of printing.

   Bi Sheng is credited with inventing the first movable type out of porcelain
   in China in the 1040s.  It was a mixed success, in large part because of the
   vast number of characters needed to write Chinese, and failed to replace
   wood block printing.  Johannes Gutenberg is credited as the first European
   to use movable type in the 1440s --- his metal type enabled the printing
   revolution.  Ottmar Mergenthaler invented the Linotype machine in the 1884,
   which dramatically increased the speed of setting type for printing compared
   to the previous manual typesetting.  It set an entire line of type (hence
   the name) at a time, and was controlled by a keyboard.  The Monotype
   machine, invented in 1885 by Tolbert Lanston, performed similar work.

.. test::
   :name: errors

   enum PrinterError: Error {
       case outOfPaper
       case noToner
       case onFire
   }

Use ``throw`` to throw an error
and ``throws`` to mark a function that can throw an error.
If you throw an error in a function,
the function returns immediately and the code that called the function
handles the error.

.. test::
   :name: errors
   :cont:

   func send(job: Int, toPrinter printerName: String) throws -> String {
       if printerName == "Never Has Toner" {
           throw PrinterError.noToner
       }
       return "Job sent"
   }

There are several ways to handle errors.
One way is to use ``do``-``catch``.
Inside the ``do`` block,
you mark code that can throw an error by writing ``try`` in front of it.
Inside the ``catch`` block,
the error is automatically given the name ``error``
unless you give it a different name.

.. test::
   :name: errors
   :cont:
   :prints: Job sent

   do {
       let printerResponse = try send(job: 1040, toPrinter: "Bi Sheng")
       print(printerResponse)
   } catch {
       print(error)
   }

.. admonition:: Experiment

   Change the printer name to ``"Never Has Toner"``,
   so that the ``send(job:toPrinter:)`` function throws an error.

.. Assertion tests the change that the Experiment box instructs you to make.

.. test::
   :name: errors
   :cont:
   :hidden:
   :prints: noToner

   do {
       let printerResponse = try send(job: 500, toPrinter: "Never Has Toner")
       print(printerResponse)
   } catch {
       print(error)
   }

You can provide multiple ``catch`` blocks
that handle specific errors.
You write a pattern after ``catch`` just as you do
after ``case`` in a switch.

.. REFERENCE
   The "rest of the fire" quote comes from The IT Crowd, season 1 episode 2.

.. test::
   :name: errors
   :cont:
   :prints: Job sent

   do {
       let printerResponse = try send(job: 1440, toPrinter: "Gutenberg")
       print(printerResponse)
   } catch PrinterError.onFire {
       print("I'll just put this over here, with the rest of the fire.")
   } catch let printerError as PrinterError {
       print("Printer error: \(printerError).")
   } catch {
       print(error)
   }

.. admonition:: Experiment

   Add code to throw an error inside the ``do`` block.
   What kind of error do you need to throw
   so that the error is handled by the first ``catch`` block?
   What about the second and third blocks?

Another way to handle errors
is to use ``try?`` to convert the result to an optional.
If the function throws an error,
the specific error is discarded and the result is ``nil``.
Otherwise, the result is an optional containing
the value that the function returned.

.. test::
   :name: errors
   :cont:

   let printerSuccess = try? send(job: 1884, toPrinter: "Mergenthaler")
   let printerFailure = try? send(job: 1885, toPrinter: "Never Has Toner")
   assert(printerSuccess == Optional("Job sent")) // -HIDE-
   assert(printerFailure == nil) // -HIDE-

Use ``defer`` to write a block of code
that is executed after all other code in the function,
just before the function returns.
The code is executed regardless of whether the function throws an error.
You can use ``defer`` to write setup and cleanup code next to each other,
even though they need to be executed at different times.

.. test::
   :name: errors
   :cont:
   :prints: false

   var fridgeIsOpen = false
   let fridgeContent = ["milk", "eggs", "leftovers"]

   func fridgeContains(_ food: String) -> Bool {
       fridgeIsOpen = true
       defer {
           fridgeIsOpen = false
       }

       let result = fridgeContent.contains(food)
       return result
   }

   let result_fridgeContains = // -HIDE-
   fridgeContains("banana")
   assert (result_fridgeContains == false) // -HIDE-
   print(fridgeIsOpen)

Generics
--------

Write a name inside angle brackets
to make a generic function or type.

.. REFERENCE
   The four knocks is a reference to Dr Who series 4,
   in which knocking four times is a running aspect
   of the season's plot.

.. testcode:: guided-tour

    -> func makeArray<Item>(repeating item: Item, numberOfTimes: Int) -> [Item] {
           var result = [Item]()
           for _ in 0..<numberOfTimes {
                result.append(item)
           }
           return result
       }
    -> makeArray(repeating: "knock", numberOfTimes:4)
    <$ : [String] = ["knock", "knock", "knock", "knock"]

You can make generic forms of functions and methods,
as well as classes, enumerations, and structures.

.. testcode:: guided-tour

    // Reimplement the Swift standard library's optional type
    -> enum OptionalValue<Wrapped> {
           case none
           case some(Wrapped)
       }
    -> var possibleInteger: OptionalValue<Int> = .none
    << // possibleInteger : OptionalValue<Int> = REPL.OptionalValue<Swift.Int>.none
    -> possibleInteger = .some(100)

Use ``where`` right before the body
to specify a list of requirements ---
for example,
to require the type to implement a protocol,
to require two types to be the same,
or to require a class to have a particular superclass.

.. testcode:: guided-tour

   -> func anyCommonElements<T: Sequence, U: Sequence>(_ lhs: T, _ rhs: U) -> Bool
          where T.Iterator.Element: Equatable, T.Iterator.Element == U.Iterator.Element {
          for lhsItem in lhs {
              for rhsItem in rhs {
                  if lhsItem == rhsItem {
                      return true
                  }
              }
          }
         return false
      }
   -> anyCommonElements([1, 2, 3], [3])
   <$ : Bool = true

.. admonition:: Experiment

   Modify the ``anyCommonElements(_:_:)`` function
   to make a function that returns an array
   of the elements that any two sequences have in common.

Writing ``<T: Equatable>``
is the same as writing ``<T> ... where T: Equatable>``.
