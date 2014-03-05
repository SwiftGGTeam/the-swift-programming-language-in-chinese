.. docnote:: Placeholder tour

    The tour below is the whitepaper's Guided Tour. It has yet to be adapted / rewritten / replaced for use in the book, but in the absence of a new Tour, it's a good starting point for now.

.. docnote:: Subjects to be covered in this section

    * Basic grammar structure
    * Braces, semicolons and whitespace
    * Comments
    * Lack of header files
    * Introduction to the core concepts from each of the chapters in the Language Guide
    * Coding style

A Tour of the Swift Language
============================

So what does Swift look like? History suggests that we start with "Hello, world":

::

    --> print("Hello, world!\n")
    <<< Hello, world!

The syntax should look familiar to any C or Objective-C developer, but it's important to note that this single line of code represents a complete program.

Swift is designed as a *batteries included* language. This means it's easy for beginners to get started without having to type additional lines of boilerplate code just to get a simple example to compile. There's no need to ``#import`` any standard library files for basic types like ``String`` or operations like ``print``, and the first statement declared at global scope is implicitly treated as the initial entry point, which means there's no need for a ``main()`` function declaration.

You'll learn more about Swift syntax and interaction with Objective-C and Cocoa as you work through this guided tutorial, but it's worth emphasizing upfront some of the guiding design principles behind Swift---that code should be **safe**, **consistent**, and **clear**.

This example uses a typed collection to keep track of the shopping list items displayed in the table view::

    --> var items : Array<ShoppingListItem>

You'd get a compile-time error if you tried to insert anything other than a ``ShoppingListItem`` into this array. 

When using a variable to keep track of an item extracted from the collection, note the lack of type in the declaration::

    --> var item = items[row]

You can omit the type in a Swift variable declaration if it can be deduced from the assignment. In this example, the array is typed, so the type of the ``item`` variable can safely be inferred. You don't lose any of the power or safety of strong/static typing by using this concise syntax.

The ``addItem`` action shows an alert if the user attempts to insert a duplicate item. The ``messageText`` for this alert is set using Swift's **string interpolation syntax**, which offers a readable (and, again, safe) way to build a string using values provided inline::

    --> alert.setMessageText("Entry '\(itemName)' already exists in your shopping list.")

Finally, you may have noticed a lack of semi-colons in the examples. While they are accepted as statement separators, Swift syntax is deliberately designed to be unambiguous, so semi-colons are optional. 

Exploring Swift with the REPL
-----------------------------

In addition to speed and efficiency in compiled code, Swift is also suitable for use as a scripting language, or for runtime "just-in-time" compilation. Swift's modern implementation approach means we can provide a Read-Eval-Print-Loop (REPL), offering beginners the perfect environment to learn and experiment with Swift.

Run the ``swift`` binary with no arguments and you'll enter the REPL. This makes it easy to explore Swift's syntax as you work through the rest of this guided tour:

.. image:: /images/swiftREPL.png
   :align: center

Declarations and Basic Syntax
-----------------------------

In addition to the primary goals like safety and performance, Swift was also designed with consistency and clarity in mind. Wherever possible, the syntax follows the natural language order of expressing something. A variable declaration reads as *"declare a variable called X of type Y with initial value Z"*.

Let's start by declaring a variable ``a`` of type ``Int`` with an initial value of ``42``:

::

    --> var a : Int = 42
    <-- // a : Int = 42

Note that ``Int`` is capitalized. Swift follows the Objective-C naming convention consistently for all type names, including built-in types like ``Int`` and ``String``.

As mentioned earlier, you can omit the type and it will be inferred automatically from the assigned value:

::

    --> var b = 10
    <-- // b : Int = 10

Variables can also be named using non-English letters:

::

    --> var 你好 = "你好世界"
    <-- // 你好 : String = "你好世界"
    --> var π = 3.14159
    <-- // π : Double = 3.14159

The standard operators work as expected (note that Swift relies on consistent spacing around operators; see Statements and Expressions for the rationale):

::

    --> var c = a + b
    <-- // c : Int = 52
    --> c - b * a
    <-- // r0 : Int = -368
    --> sin(π/2)
    <-- // r1 : Double = 1.0

Tuples
~~~~~~

As well as simple value types, Swift also supports tuple types for ordered lists of elements.  The elements may be accessed with constant numeric indices:

::

    --> var t = (100, 200, 300)
    <-- // t : (Int, Int, Int) = (100, 200, 300)
    --> t.0 + t.1 + t.2
    <-- // r2 : Int = 600

In this case, ``t`` is a 3-element tuple with integer values. A tuple can also have elements with different types:

::

    --> var u = (1, "hello", 3.14159)
    <-- // u : (Int, String, Double) = (1, "hello", 3.14159)
    --> println(u.1)
    <<< hello
    --> println(u.2)
    <<< 3.14159

Tuples are useful in a variety of situations; Swift uses them as the foundation for passing arguments and returning values, for example. You can extract the elements into individual values:

::

    --> var (v, w, x) = u
    <-- // (v, w, x) : (Int, String, Double) = (1, "hello", 3.14159)
    --> v
    <-- // v : Int = 1
    --> w
    <-- // w : String = "hello"
    --> x
    <-- // x : Double = 3.14159

Alternatively, you can name the elements in a tuple:

::

    --> var y = (foo: 1, bar: "hello", baz: 3.14159)
    <-- // y : (foo: Int, bar: String, baz: Double) = (1, "hello", 3.14159)

to make it even easier to extract or change the values:

::

    --> y.foo
    <-- // r4 : Int = 1
    --> y.baz
    <-- // r5 : Double = 3.14159
    --> y.bar = "bye"
    --> y
    <-- // y : (foo: Int, bar: String, baz: Double) = (1, "bye", 3.14159)

This is particularly useful with multiple return values (described below).

Branching and Looping
~~~~~~~~~~~~~~~~~~~~~

Swift supports the usual conditional and flow control statements. Parentheses are optional around conditions, but braces are required to avoid ambiguity issues like the dangling else problem, so a typical branch looks like this:

::

    --> if a == 42 {
                println("it's magic")
            } else {
                println("it's just a number")
            }
    <<< it's magic

The ``println()`` function is an alternative to ``print()`` that automatically inserts a final ``\n`` newline.  It is not so useful when you're working with a string literal like this, but is very handy when working with string variables or non-string values.

As you saw in the earlier Objective-C example, Swift provides a for-each-style loop to make it easy to iterate over the contents of a collection. To test this, try iterating over the characters in a string, like this:

::

    --> for eachCharacter in "Hello".chars {
                println(eachCharacter)
            }
    <<< H
    <<< e
    <<< l
    <<< l
    <<< o


.. note:: If you're wondering why/how this works, it's because the return value of ``String.chars`` adopts the ``Sequence`` protocol. `Protocols`_ are covered later in this tour.

Also try the ``..`` operator, which generates a half-open enumerable range between two values:

::

    --> for index in b..15 {
                println(index)
            }
    <<< 10
    <<< 11
    <<< 12
    <<< 13
    <<< 14

As before, there's no need to provide a type for the loop variable because it can be inferred from the elements in the range, which is itself of type ``IntGeneratorType``:

::

    --> b..a
    <-- // r6 : IntGeneratorType = 10..42

The b..a syntax also works great with ``NSRange``, providing natural and elegant syntax for many common idioms.

Some enumerable types use a tuple rather than a single loop variable. If you iterate over a Swift ``Dictionary``, for example, you have access to each key and value through a tuple pair:

::

    --> var dict = ["first" : 1, "second" : 2, "third" : 3]
    <-- // dict : Dictionary<String, Int> = ["third" : 3, "second" : 2, "first" : 1]
    --> for (key, value) in dict {
                println("Key: '\(key)', Value: \(value)")
            }
    <<< Key: 'third', Value: 3
    <<< Key: 'second', Value: 2
    <<< Key: 'first', Value: 1

Functions
~~~~~~~~~

As with variable declaration syntax, Swift function declarations follow the natural language order of "declare a function X, which takes arguments Y, and returns Z." Continuing the theme of consistency, Swift function argument syntax follows the syntactic pattern of a variable declaration, where the colon means "of type":

::

    --> func fibonacci(n : Int) -> Int {
                if n < 2 {
                    return 1
                } else {
                    return fibonacci(n - 2) + fibonacci(n - 1)
                }
            }
    --> fibonacci(10)
    <-- // r0 : Int = 89

Argument names are part of the signature, so you can specify each parameter by name when calling the function, either for clarity, or to supply parameters in a different order:

::

    --> func divideTwoNumbers(numerator : Float, denominator : Float) -> Float {
                assert(denominator != 0)
                return numerator / denominator
            }
    --> divideTwoNumbers(4, 5)
    <-- // r1 : Float = 0.8
    --> divideTwoNumbers(denominator: 5, numerator: 4)
    <-- // r2 : Float = 0.8

And, in the same way that you can assign a value as part of a variable declaration, you can also specify a default value for an argument:

::

    --> func sayHello(name : String = "World") {
                print("Hello, \(name)!\n")
            }
    --> sayHello("Bob")
    <<< Hello, Bob!
    --> sayHello()
    <<< Hello, World!

If you omit the return type, as with this ``sayHello()`` function, the default is Void. To return multiple values from a function, just return a multi-element tuple:

::

    --> func fetchLocalGasPrices() -> (Float, Float, Float) {
                return (3.59, 3.69, 3.79)
            }

Since you name the elements in any tuple, these features work together to make it easier to query the values:

::

    --> func fetchBetterGasPrices() -> (regular : Float, midgrade : Float, premium : Float) {
                return (3.49, 3.59, 3.69)
            }
    --> fetchBetterGasPrices().midgrade
    <-- // r3 : Float = 3.59

Functions can also be defined to take variable argument lists:

::

    --> func addAllTheInts(theInts : Int...) -> Int {
                var sum = 0
                for i in theInts {
                    sum += i
                }
                return sum
            }
    --> addAllTheInts()
    <-- // r4 : Int = 0
    --> addAllTheInts(42, 597, 12)
    <-- // r5 : Int = 651

Variable argument lists act like an array of the element type within the function body.  Compared to C, Swift variable argument lists are type safe, and much more convenient to use.

Pattern Matching
~~~~~~~~~~~~~~~~

Swift supports a switch statement superficially similar to the one in C:

::

    --> switch 5 {
            case 2:
            case 3:
            case 5:
            case 7:
                println("prime")
            default:
                println("not prime, or greater than 7")
            }
    <<< prime

Note that, unlike C, cases do not implicitly fallthrough to their neighboring statement, so you don't need to "break" out of cases. Consecutive case labels all apply to the next block of statements, and the block ends with the next case, default, or closing brace, at which point control moves out of the switch. You can however explicitly continue execution using the "fallthrough" statement if that's what you want:

::

    --> switch 5 {
            case 2:
            case 3:
            case 5:
            case 7:
                println("prime")
                fallthrough
            default:
                println("integer")
            }
    <<< prime
    <<< integer

As shorthand, you can also specify multiple values in a single case separated by commas:

::

    --> switch 5 {
            case 2, 3, 5, 7:
                println("prime")
                fallthrough
            default:
                println("integer")
            }
    <<< prime
    <<< integer

Swift's switch is considerably more powerful than C's. For one thing, it can be used with non-integer types:

::

    --> for fruit in ["orange", "key", "cherry", "strawberry"] {
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
    <<< 500 pts
    <<< not a fruit
    <<< 100 pts
    <<< 300 pts

Values can also be tested for inclusion in a range:

::

    --> func naturalCount(x : Int) -> String {
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
    --> println("There are \(naturalCount(8)) planets in the solar system!")
    <<< There are a handful of planets in the solar system!
    --> println("There are \(naturalCount(1024)) bytes in a kilobyte!")
    <<< There are thousands of bytes in a kilobyte!

Multiple values can be tested at once in the same switch using tuples. Each
element of a tuple may be individually tested against a literal value, a range,
or ignored using the special ``_`` identifier:

::

    --> func classifyPoint(x : Int, y : Int) {
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
    --> classifyPoint(0, 0)
    <<< origin
    --> classifyPoint(2, 0)
    <<< on the X axis
    --> classifyPoint(0, 100)
    <<< on the Y axis
    --> classifyPoint(-5, 5)
    <<< near the origin
    --> classifyPoint(-5, 50)
    <<< far from the origin

Variables can be bound to individual tuple elements, which then
become available in the scope of the following case. Additional conditions for
a case may be tested using a ``where`` expression:

::

    --> func classifyPoint2(p : (Int, Int)) {
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
                    println("\(sqrt(Double(x*x) + Double(y*y))) units from the origin")
                }
            }
    --> classifyPoint2(1, 1)
    <<< on the + diagonal
    --> classifyPoint2(-1, 1)
    <<< on the - diagonal
    --> classifyPoint2(30, 40)
    <<< 50.0 units from the origin

Enums
~~~~~

Swift supports ``enum`` types. Values of the enum are introduced with the
``case`` keyword, and are scoped inside the enum type:

::

  (swift) enum Color {
              case Red, Green, Blue
          }
  (swift) var c = Color.Green
  // c : Color = <unprintable value>

The type name can also be inferred from context if a case is referenced by a
leading dot:

::

  (swift) c = .Blue
  (swift) c
  // c : Color = <unprintable value>

Enum values can be used in ``switch`` statements, including in patterns. The
compiler enforces exhaustiveness (which you can silence by adding a ``default``):

::

  (swift) switch c {
          case .Blue:
              println("blue")
          case .Red:
          case .Green:
              println("not blue")
          }
  >>> blue

Unlike a C enum (but like an algebraic datatype in functional languages like Haskell or ML), the cases of a switch don't need to be purely symbolic.
A case can have data associated with itself:

::

  (swift) enum Path {
              case Point(Int, Int)
              case Line((Int, Int), (Int, Int))
          }
  (swift) var p : Path = .Point(0, 0)
  // p : Path = <unprintable value>

This data can then be pattern-matched and accessed when the case itself is
matched:

::

  (swift) func pathLength(p : Path) -> Double {
              switch p {
              case .Point(_):
                  return 0
              case .Line((var fx, var fy), (var tx, var ty)):
                  var dx = tx - fx
                  var dy = ty - fy
                  return sqrt(Double(dx*dx) + Double(dy*dy))
              }
          }
  (swift) pathLength(.Point(219, 0))
  // r0 : Double = 0.0
  (swift) pathLength(.Line((0, 0), (3, 4)))
  // r1 : Double = 5.0

Objects and Classes
~~~~~~~~~~~~~~~~~~~

As you might expect, the ``class`` keyword is used to declare a new Swift class:

::

    --> class Shape {
                var numberOfSides : Int
            }

Note that there's no need for a Swift class to inherit from any base class.  Of course, it is still fine to inherit from ``NSObject`` if you would like to get its methods.

You create an instance with function call syntax (referred to as initialization syntax):

::

    --> var blob = Shape()
    <-- // blob : Shape = <Shape instance>

and memory is managed automatically for you using ARC (Automatic Reference Counting) for great performance and maximum compatibility with our frameworks.

When you create subclasses, you use the familiar colon ``:`` to indicate the inherited type:

::

    --> class Quadrilateral : Shape {
                init() {
                    numberOfSides = 4
                }
            }

Instance variables can be accessed via the ``.`` operator:

::

    --> var square = Quadrilateral()
    <-- // square : Quadrilateral = <Quadrilateral instance>
    --> println("A square has \(square.numberOfSides) sides.")
    <<< A square has 4 sides.

Variables declared in a class are properties. By default, they have implicit getters and setters that access an underlying (unnamed) instance variable, but you can also specify a custom getter and/or setter:

::

    --> class Circle : Shape {
                var radius : Float
                init() {
                    numberOfSides = 1
                }
                var circumference : Float {
                get:
                    return radius * 2 * 3.14159
                set (circumf): 
                    radius = circumf / (2 * 3.14159)
                }
            }
    --> var circle = Circle()
    <-- // circle : Circle = <Circle instance>
    --> circle.radius = 5
    --> circle.circumference
    <-- // r0 : Float = 31.4159
    --> circle.circumference = 62.8318
    --> circle.radius
    <-- // r1 : Float = 10.0

Notice that there are no asterisks in any of the variable declarations for objects::
 
    --> var circle = Circle()

This is one of the primary safety features --- **Swift does not require you to manipulate and manage direct pointers to memory**. It means you can define a function that takes an argument like this:

::

    --> func enlarge(circle : Circle) {
                circle.radius *= 2
            }
    
…and call it like this:

::

    --> enlarge(circle)
    --> circle.radius
    <-- // r2 : Float = 20.0

The compiler manages the necessary mechanisms to safely pass the object by reference.  However, because we use ARC, the programmer is still responsible for reasoning about and breaking cycles (e.g. with weak pointers).


Structures
~~~~~~~~~~

For types that should be passed by value (i.e., by copying it), like graphics coordinates or sizes, you can create a ``struct``:

::

    --> struct Size {
                var width, height : Float
            }

Unlike other languages, Swift structures aren't limited just to holding values, they can also have functions and initializers, as well as adopt protocols and be extended (as described later in this tour):

::

    --> struct Point {
              var x, y : Float
              
              init(inX : Float, inY : Float) {
                x = inX
                y = inY
              }
              
              func moveToTheRightBy(value : Float) {
                x += value
              }
            }

Because Swift is statically-typed, the compiler always knows whether a type is passed by-value or by-reference so there's no need for any differences in syntax:

::

    --> var myPoint = Point(50, 200)
    <-- // myPoint : Point = Point(50.0, 200.0)
    --> myPoint.moveToTheRightBy(200)
    --> myPoint
    <-- // myPoint : Point = Point(250.0, 200.0)

Note that it's not necessary to include the initializer implementation shown for ``Point``, because a default initializer is automatically provided to set the values:

::

    --> var size = Size(50, 100)
    <-- // size : Size = Size(50.0, 100.0)

Strings
-------

Because strings are such a common and essential part of any codebase, they are built right into Swift as a native datatype.  Swift strings are designed with natural and expressive syntax, to be fast and memory efficient, and to maintain transparent interoperation with Cocoa APIs and ``NSString``.

Swift string literals use double-quote marks, like this:

::

    --> var firstWord = "Hello"
    <-- // firstWord : String = "Hello"

The standard operators are supported for string concatenation:

::

    --> var message = firstWord + ", world"
    <-- // message : String = "Hello, world"
    --> message += "!"
    --> message
    <-- // message : String = "Hello, world!"

and you can refer to a substring, or slice, using a character range:

::

    --> var name = message[7..12]
    <-- // name : String = "world"

Swift strings are immutable, which means we can make string slicing extremely efficient in terms of memory and processor cycles. Rather than having to copy the substring characters to a new memory location, the slice simply refers to a sub-range from the original string:

.. image:: /images/swiftStringAndSlice.png
   :width: 30em
   :align: center

Continuing with the theme of efficiency, Swift strings are encoded internally as UTF-8, keeping storage compact. When iterating over the characters in a string, Swift decodes UTF-8 on the fly to produce a sequence of ``Char`` values (each of which holds a UTF-32 codepoint), making it easy to work with multi-byte characters, for example:

::

    --> var emoji = "🙉😈😄👏"
    <-- // emoji : String = "🙉😈😄👏"
    --> for eachChar in emoji.chars {
                println(eachChar)
            }
    <<< 🙉 
    <<< 😈
    <<< 😄
    <<< 👏
    --> emoji.length
    <-- // r0 : Int = 4

You can also iterate by lines:

::

    --> var multiline = "Once upon a time\nThe end"
    <-- // multiline : String = "Once upon a time\nThe end"
    --> for eachLine in multiline.lines {
                println(eachLine)
            }
    <<< Once upon a time
    <<< The end

…or even by bytes:

::

    --> var singleEmoji = "🙉"
    <-- // singleEmoji : String = "🙉" 
    --> for eachByte in singleEmoji.bytes {
                println(Int64(eachByte))
            }
    <<< 240
    <<< 159
    <<< 153
    <<< 137

String Interpolation
~~~~~~~~~~~~~~~~~~~~

You've already seen various ways to create a Swift string, including concatenating substrings using ``+``:

::

    --> var message = "Hello" + ", world" + "!"
    <-- // message : String = "Hello, world!"

If you need to append string representations of other types, you can create a Swift string from a value:

::

    --> var someValue = 42
    <-- // someValue : Int = 42
    --> var magic = "The magic number is: " + String(someValue) + "!"
    <-- // magic : String = "The magic number is: 42!"

Interpolating values into strings is such a common task, however, that Swift provides an alternative, more readable syntax:

::

    --> var blackMagic = "The magic number is: \(someValue)!"
    <-- // blackMagic : String = "The magic number is: 42!"

You can also use this syntax to interpolate the values of arbitrary expressions:

::

    --> var luckyForSome = 13
    <-- // luckyForSome : Int = 13
    --> var addMessage = "Adding \(luckyForSome) to \(someValue) gives \(luckyForSome + someValue)"
    <-- // addMessage : String = "Adding 13 to 42 gives 55"

Rather than requiring you to think about how best to format a value every time you want to insert it into a string, it's up to the developer of the original type to provide an implementation for the string conversion. This involves adding a suitable initializer to the Swift ``String`` type through the use of an extension, as discussed later in this tour (see Extensions_).

For more power and flexibility, the Swift standard library also provides a type-safe ``printf()`` function::

    --> printf("Take %v and sell it for $%.2v\n", 42, 3.14159)
    <<< Take 42 and sell it for $3.14159

Protocols
---------

A protocol is an abstract description of behavior --- usually related functions and/or properties --- that can be adopted by one or more types:

::

    --> struct Point {
              var x = 0.0, y = 0.0
            }
    --> protocol HitTestable {
                func containsPoint(point : Point) -> Bool 
            }

All named Swift types (i.e., classes, structs and enums, but not tuples), can adopt protocols and implement the required behavior:

::

    --> struct Size {
                var width = 0.0, height = 0.0
            }
    --> struct Rect : HitTestable {
                var origin : Point = Point()
                var size : Size = Size()
                func containsPoint(point : Point) -> Bool {
                    return point.x >= origin.x && 
                        point.x < (origin.x + size.width) &&
                        point.y >= origin.y &&
                        point.y < (origin.y + size.height)
                }
            }

The ``: HitTestable`` syntax in this structure declaration indicates conformance to the protocol. As with all other ``:`` use in Swift, you can read the colon as *is a*, so *"a Rect is a HitTestable type"*.  

You can use a protocol in a variable declaration to indicate the variable has some unknown, dynamic type that conforms to that protocol. If you do, you can only assign a value if its type conforms to the protocol:

::

    --> var rect = Rect(Point(0.0, 0.0), Size(2.0, 2.0))
    <-- // rect : Rect = Rect(Point(0.0, 0.0), Size(2.0, 2.0))
    --> var testableThing : HitTestable = rect
    <-- // testableThing : HitTestable = <unprintable value>
    --> var hitPoint = Point(4.0, 5.0)
    <-- // hitPoint : Point = Point(4.0, 5.0)
    --> testableThing.containsPoint(hitPoint)
    <-- // r0 : Bool = false

and Swift ensures that you can only call functions or access properties that are defined as part of the protocol:

.. code-block:: swift

    --> testableThing.origin
    <REPL Buffer>:51:14: error: protocol 'HitTestable' has no member named 'origin'
    testableThing.origin
    ~~~~~~~~~~~~~^~~~~~~ 

This guarantees safety when dealing with different types, such as when hit-testing a series of different elements:

.. code-block:: swift

    struct Circle : HitTestable { ... }
    class Elephant : HitTestable { ... }

    func findFirstHitElement(point : Point, elements : HitTestable...) -> HitTestable? {
        for eachElement in elements {
            if eachElement.containsPoint(point) {
                return eachElement
            }
        }
        return .None
    } 

    var circle : Circle
    var elephant = Elephant()
    var element = findFirstHitElement(pt, circle, elephant)

This example uses a variable argument list and returns an optional value
(to either return an element or not), which are discussed later in this tour.

Extensions
----------

An extension allows you to add functions or properties to an existing class or structure. As described earlier, you might use an extension to add suitable initializers to the Swift ``String`` class:

::

    --> extension String {
                init(point : Point) {
                    self = "{\(point.x), \(point.y)}"
                }
            }

to make it easy to convert your own classes or structures into strings, either by constructing a ``String`` explicitly:

::

    --> String(hitPoint)
    <-- // r1 : String = "{4.0, 5.0}"

or implicitly with Swift's interpolation syntax:

::

    --> println("The hit point is \(hitPoint)")
    <<< The hit point is {4.0, 5.0}

You can also use an extension to add protocol conformance to an existing class or structure:

::

    --> extension Point : HitTestable {
                func containsPoint(point : Point) -> Bool {
                    return self.x == point.x && self.y == point.y
                }
            }
    --> var someOtherPoint = Point(5.0, 10.0)
    <-- // someOtherPoint : Point = Point(5.0, 10.0)
    --> hitPoint.containsPoint(someOtherPoint)
    <-- // r2 : Bool = false
    --> hitPoint.containsPoint(hitPoint)
    <-- // r3 : Bool = true

This is particularly important for "retroactive modeling", which is important
when you make two libraries work together, when you cannot change their code.

Closures
--------

A closure is just a function without a name. As an example, the ``sort()`` library function takes an array of strings and sorts them using a comparison closure:

::

    --> var strings = ["Hello", "Bye", "Good day"]
    <-- // strings : String[] = ["Hello", "Bye", "Good day"]
    --> var sortedStrings = sort(strings, {
                (lhs : String, rhs : String) -> Bool in
                return lhs.uppercase < rhs.uppercase
            })
    <-- // sortedStrings : String[] = ["Bye", "Good day", "Hello"]
    --> for eachString in sortedStrings {
                println(eachString)
            }
    <<< Bye
    <<< Good day
    <<< Hello

The closure in this example is described in curly braces:

.. code-block:: swift

    { 
        (lhs : String, rhs : String) -> Bool in
        return lhs.uppercase < rhs.uppercase
    }

The parentheses denote the parameters of the closure, followed by the
return type, then "in" to separate the signature of the closure from
its body. As you've already seen throughout this tour, the types in a Swift expression can be omitted if they can be inferred from the context. In this case, the parameter and return types can be inferred, so aren't necessary:

::

    --> sortedStrings = sort(strings, { (lhs, rhs) in
                return lhs.uppercase < rhs.uppercase
            })

One can also omit the names of the parameters, using the positional
placeholders ``$0``, ``$1``, and so on. The ``return`` can also be
omitted from single-expression closures, as in:

::

    --> sortedStrings = sort(strings, {$0 < $1})

Closures can also capture any variable from the local scope:

::

    --> var uppercase = true
    <-- // uppercase : Bool = true
    --> sortedStrings = sort(strings, { (x, y) in 
                    if uppercase {
                        x = x.uppercase
                        y = y.uppercase
                    }
                    return x < y
                }
            )

Note that if a closure captures a value, Swift automatically manages the storage of the original variable such that you can change the value from within the closure without the need for any keywords on the original declaration. Internally, Swift also makes sure that if the closure outlives the scope of the original variable declaration, everything still "just works":

.. code-block:: swift

    var someValue = 42
    
    dispatch_async(someQueue, {
        println("Value is \(someValue)")
        someValue += 1
    })

Closures are typically the last argument to a function. In such cases,
one can place the closure outside of the parentheses:

.. code-block:: swift

    var someValue = 42
    
    dispatch_async(someQueue) {
        println("Value is \(someValue)")
        someValue += 1
    }
    
For longer closures, cases where the same function will be re-used
several times, or cases where you want a descriptive name to show up in a stack
trace, you may prefer to use a local function instead:

::

    --> func compareStrings(lhs : String, rhs : String) -> Bool {
                if uppercase {
                    lhs = lhs.uppercase
                    rhs = rhs.uppercase
                }
                return lhs < rhs
            }
    --> sortedStrings = sort(strings, compareStrings)

A closure argument to a function is just like any other argument, with a colon ``:`` "is a," followed by the function arguments and return type:

::

    --> func repeat(count : Int, myClosure : () -> Void) {
                for i in 0..count {
                    myClosure()
                }
            }
    --> repeat(3, {println("Hello!")})
    <<< Hello!
    <<< Hello!
    <<< Hello!

Generics
--------

Swift supports generics through parameterized types. As an example, the standard library includes the ``Array`` class, which makes it easy to work with typed collections (though it is important to note that the entire standard library is at best a strawman design right now):

::

    --> var names = Array<String>()
    <-- // names : Array<String> = []
    --> names.append("William")
    --> names.append("Hilary")
    --> names.append("Carlton")

This array can only be used with ``String`` elements; you'll get an error if you attempt to insert anything else, like an integer.

Swift generics offer transparent support for both class and value types without the need for boxing. This means you can work with a collection of integer values, for example, in exactly the same way as you would work with a collection of objects:

.. code-block:: swift

    var intCollection = Array<Int>()
    intCollection.append(42)
    intCollection.append(314)
    
    class Test { .. }
    var testCollection = Array<Test>()
    testCollection.append(Test())
    testCollection.append(Test())

It's even safe in Swift to mix by-reference and value types if you use a protocol for a parameterized type declaration:

::

    --> protocol Workable {
                func work()
            }
    --> class Foo : Workable {
                func work() {
                    println("A foo is working")
                }
            }
    --> struct Bar : Workable {
                func work() {
                    println("A bar is working")
                }
            }
    --> extension Int : Workable {
                func work() {
                    println("An integer is working")
                }
            }
    --> var foo = Foo()
    <-- // foo : Foo = <Foo instance>
    --> var bar = Bar()
    <-- // bar : Bar = Bar()
    --> var workers = Array<Workable>()
    <-- // workers : Array<Workable> = []
    --> workers.append(foo)
    --> workers.append(bar)
    --> workers.append(42)
    --> for eachThing in workers {
              eachThing.work()
            }
    <<< A foo is working
    <<< A bar is working
    <<< An integer is working

Swift makes it easy to create your own parameterized types, like this simple implementation of a stack class:

::

    --> class Stack<ElementType> {
              var elements : Array<ElementType>
              init() {
                elements = Array<ElementType>()
              }
              func push(element : ElementType) {
                elements.append(element)
              }
              func pop() -> ElementType {
                assert(elements.count > 0, "can't pop an empty stack")
                var tmp = elements[elements.count - 1]
                elements.popLast()
                return tmp
              }
            }

As with a Swift ``Array``, this generic ``Stack`` class is unrestricted, which means you can create an instance of the class to hold any first class type, including value and by-reference types:

::

    --> var intStack = Stack<Int>()
    <-- // intStack : Stack<Int> = <Stack<Int> instance>
    --> intStack.push(1)
    --> intStack.push(5)
    --> intStack.pop()
    <-- // r0 : Int = 5
    --> intStack.pop()
    <-- // r1 : Int = 1
    --> var stringStack = Stack<String>()
    <-- // stringStack : Stack<String> = <Stack<String> instance>
    --> stringStack.push("bye")
    --> stringStack.push("hello")
    --> stringStack.pop()
    <-- // r2 : String = "hello"
    --> stringStack.pop()
    <-- // r3 : String = "bye"

Definining a type or algorithm to take any type means that you only have access to basic operations that all types support, like copyability.

In order to use more specific behavior, you need to indicate which behavior the data structure requires. If you require a ``work()`` function, for example, just indicate that that the type should conform to the ``Workable`` protocol:

::

    --> class Workforce<Type : Workable> {
              var workers : Array<Type>
              func startWorking() {
                for eachWorker in workers {
                  eachWorker.work()
                }
              }
            }

Once you have generic data structures, you'll likely need to be able to implement generic algorithms to act on them. As an example, first consider a trivial non-generic function to find the index of a string in an array of strings:

::

    --> func findIndexOfString(strings : String[], searchString : String) -> Int {
              for index in 0..strings.count {
                if strings[index] == searchString {
                  return index
                }
              }
              return -1
            }

Without generics, you'd need to write an identical function for each type you wanted to support---``findIndexOfInt()``, ``findIndexOfFloat``, etc.

Swift makes it easy to write a generic version, which works with any element that supports an equality test:

::

    --> func findIndexOf<Type : Equatable>(elements : Type[], searchElement : Type) -> Int {
              var index = 0
              for eachElement in elements {
                if eachElement == searchElement {
                  return index
                }
                ++index
              }
              return -1
            }

Test this with an array of integers:

::

    --> var integers = [1,2,3,4,5]
    <-- // integers : Int[] = [1, 2, 3, 4, 5]
    --> findIndexOf(integers, 4)
    <-- // r4 : Int = 3

Note: the Swift standard library already includes a ``find()`` function, as well as other useful generic functions like ``min()``, ``max()``, ``map()``, ``swap()``, and the ``sort()`` function described earlier in the Closures section.


Interacting with Objective-C and Cocoa
--------------------------------------

The major design goal for Swift is seamless interoperation with Objective-C and
our existing frameworks. You use the same syntax to work with Cocoa framework
concepts like ``NSArray`` or ``NSWindow`` as you do Swift classes and "C-like"
concepts.  Swift implements the same object model as Objective-C and uses
the same dispatch and runtime for ``NSObject``\ s.  This is a key design point that
allows you to mix and match Swift code with Objective-C code in the same
project, allowing smooth adoption for existing apps and frameworks.

Swift uses a module system for its frameworks (rather than a header-based
approach), so any Objective-C framework that's accessible as an Objective-C
module can be directly imported into Swift.  It is not implemented yet, but we
fully expect Swift modules to be importable by Clang.

Even the REPL works great with Cocoa.  To see this, start by importing the Clang
Cocoa module (which is built directly from Cocoa.h)::

    --> import Cocoa 

You can create an instance of a Cocoa class just like any other class::

    --> var array = NSMutableArray()
    <-- // array : NSMutableArray = [
    <-- // 
    <-- // ]
    --> var date = NSDate()
    <-- // date : NSDate = 2013-02-27 20:17:39 +0000

As you would expect, simple things like type inference work great with Cocoa
types.  The REPL even knows to use the output of the ``description()`` method
to pretty print objects.

Everything that we've described works great with Cocoa classes, including
calling simple methods on them::

    --> array.addObject(date)
    --> array.count()
    <-- // NSUInteger = 1
    --> array
    <-- // array : NSMutableArray = (
    <-- //     "2013-02-27 20:17:39 +0000"
    <-- // )

You can also use Swift's literal syntax to create Cocoa arrays and dictionaries,
if there is a contextual type (as in a function call or explicitly typed
local variable) to indicate that you want an NSArray instead of a basic language
array::

    --> var stringArray : NSArray = ["This", "is", "awesome!"]
    <-- // stringArray : NSArray = [
    <-- //   "This",
    <-- //   "is",
    <-- //   "awesome!"
    <-- // ]

Swift's builtin ``String`` and ``NSString`` work great together, so everything "just works". Try building a string from the components in the array::

    --> var string = stringArray.componentsJoinedByString(" ")
    <-- // string : String = This is awesome!

You can even use Swift's interpolation syntax::

    --> var mutableString = NSMutableString()
    --> for index in 1..4 {
              mutableString.appendString("\nNumber \(index)")
            }
    --> mutableString
    <-- // mutableString : NSMutableString = 
    <-- // Number 1
    <-- // Number 2
    <-- // Number 3

You can initialize Objective-C objects using ``initWith...`` methods by supplying initializer arguments::

    --> var number = NSNumber(true)
    <-- // number : NSNumber = 1

Because Swift uses the standard Objective-C object model, you can extend a class
written in Objective-C with a Swift extension (which just defines a "category"
in Objective-C parlance)::

    --> extension NSString {
              func stringByTrimmingWhitespace() -> NSString {
                var wsSet = NSCharacterSet.whitespaceCharacterSet()
                return self.stringByTrimmingCharactersInSet(NSCharacterSet(wsSet))
              }
            }
    --> string = "       trim me       "
    --> string.stringByTrimmingWhitespace()
    <-- // NSString = trim me
    
and you can even extend non-class Objective-C types, like structures::

    --> extension NSRect {
              func area() -> CGFloat {
                return self.size.height * self.size.width
              }
            } 
    --> var rect = NSRect(4,5,200,400)
    <-- // rect : NSRect = NSRect(CGPoint(4.0, 5.0), CGSize(200.0, 400.0))
    --> rect.area()
    <-- // CGFloat = 80000.0

If you do this, the extensions are not visible to Objective-C code, because it
has no way to model this.  It is extremely useful in Swift code though.


Invoking Objective-C Selectors
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When invoking an Objective-C selector that takes one argument (or no arguments), you simply use the Swift function call syntax::

    --> string.uppercaseString()
    <-- // NSString =        TRIM ME       

For selectors that take more than one argument, you have a variety of options. In situations where there is only one possible selector for a given set of arguments, just supply them in order::

    --> string.rangeOfString("m", NSBackwardsSearch)
    <-- // NSRange = NSRange(12, 1)

If there are multiple possible selectors, or if you prefer to be explicit, you can name the arguments::

    --> string.rangeOfString("m", options:NSBackwardsSearch)
    <-- // NSRange = NSRange(12, 1)


AppKit Magic
~~~~~~~~~~~~

You're not just limited to working with Foundation classes in the REPL. When importing Cocoa, the REPL sets up a run loop for you, so you can also test AppKit classes, like ``NSWindow``::
    
    --> var frame = NSRect(200, 200, 700, 400)
    <-- // frame : NSRect = NSRect(CGPoint(200.0, 200.0), CGSize(700.0, 400.0))
    --> var mask = Int(NSTitledWindowMask|NSClosableWindowMask|NSResizableWindowMask)
    <-- // mask : Int64 = 11
    --> var backing = NSBackingStoreType(NSBackingStoreBuffered)
    <-- // backing : Int64 = 2
    --> var window = NSWindow(withContentRect:frame, styleMask:mask, backing:backing, defer:false)
    <-- // window : NSWindow = <NSWindow: 0x3fb3cefa3dfe>
    --> window.setReleasedWhenClosed(false)
    --> window.makeKeyAndOrderFront(nil)

Try interacting with the window that opens---you'll find that you can resize it, maximize it, move it, or close it (but don't close it for now).

You can then use the REPL to change property values and see the window update immediately::

    --> window.setTitle("My Lovely Window")

This provides a fantastic learning experience for developers new to Cocoa. Add a text field and watch how its appearance changes as you set each property::

    --> var field = NSTextField(NSRect(150, 200, 400, 50))
    <-- // field : NSTextField = <NSTextField: 0x7fca58fad540>
    --> var content = window.contentView() as! NSView
    <-- // content : NSView = <NSView: 0x7fca5041dc90>
    --> content.addSubview(field)
    --> field.setStringValue("Hello, world!")
    --> field.setEditable(false)
    --> field.setAlignment(Int(NSCenterTextAlignment))
    --> field.setFont(NSFont.systemFontOfSize(42))
    --> field.setBezeled(false)
    --> field.setDrawsBackground(false)
    --> field.setTextColor(NSColor.redColor())

Next add a button and create an instance of a Swift class to act as the target::

    --> var button = NSButton(NSRect(300, 50, 100, 25))
    <-- // button : NSButton = <NSButton: 0x7fdd81578224>
    --> content.addSubview(button)
    --> button.setBezelStyle(NSRoundedBezelStyle)
    --> class Delegate : NSObject {
              func doSomething(sender : id) {
                println("Doing something!")
              }
            }
    --> var delegate = Delegate()
    <-- // delegate : Delegate = <Delegate: 0x7fdd82433d3>
    --> button.setTarget(delegate)
    --> button.setAction("doSomething:")

Click the button and you'll see the message appear in the REPL:

.. image:: /images/swiftCocoa.png
   :align: center
   :width: 30em

.. refnote:: References

    * https://[Internal Staging Server]/docs/LangRef.html#whitespace
    * https://[Internal Staging Server]/docs/whitepaper/LexicalStructure.html#lexical-structure
    * https://[Internal Staging Server]/docs/whitepaper/LexicalStructure.html#whitespace
    * https://[Internal Staging Server]/docs/whitepaper/LexicalStructure.html#comments
    * https://[Internal Staging Server]/docs/whitepaper/LexicalStructure.html#keywords
    * https://[Internal Staging Server]/docs/SwiftCodingStyle.html