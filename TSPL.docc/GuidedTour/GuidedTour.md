# A Swift Tour

Explore the features and syntax of Swift.

Tradition suggests that the first program in a new language
should print the words “Hello, world!” on the screen.
In Swift, this can be done in a single line:

<!--
  K&R uses “hello, world”.
  It seems worth breaking with tradition to use proper casing.
-->

```swift
print("Hello, world!")
// Prints "Hello, world!"
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> print("Hello, world!")
  <- Hello, world!
  ```
-->

This syntax should look familiar if you know another language ---
in Swift, this line of code is a complete program.
You don't need to import a separate library for functionality like
outputting text or handling strings.
Code written at global scope is used
as the entry point for the program,
so you don't need a `main()` function.
You also don't need to write semicolons
at the end of every statement.

This tour gives you enough information
to start writing code in Swift
by showing you how to accomplish a variety of programming tasks.
Don’t worry if you don’t understand something ---
everything introduced in this tour
is explained in detail in the rest of this book.

## Simple Values

Use `let` to make a constant and `var` to make a variable.
The value of a constant
doesn't need to be known at compile time,
but you must assign it a value exactly once.
This means you can use constants to name a value
that you determine once but use in many places.

```swift
var myVariable = 42
myVariable = 50
let myConstant = 42
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> var myVariable = 42
  -> myVariable = 50
  -> let myConstant = 42
  ```
-->

A constant or variable must have the same type
as the value you want to assign to it.
However, you don't always have to write the type explicitly.
Providing a value when you create a constant or variable
lets the compiler infer its type.
In the example above,
the compiler infers that `myVariable` is an integer
because its initial value is an integer.

If the initial value doesn't provide enough information
(or if there isn't an initial value),
specify the type by writing it after the variable,
separated by a colon.

```swift
let implicitInteger = 70
let implicitDouble = 70.0
let explicitDouble: Double = 70
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> let implicitInteger = 70
  -> let implicitDouble = 70.0
  -> let explicitDouble: Double = 70
  ```
-->

> Experiment: Create a constant with
> an explicit type of `Float` and a value of `4`.

Values are never implicitly converted to another type.
If you need to convert a value to a different type,
explicitly make an instance of the desired type.

```swift
let label = "The width is "
let width = 94
let widthLabel = label + String(width)
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> let label = "The width is "
  -> let width = 94
  -> let widthLabel = label + String(width)
  >> print(widthLabel)
  << The width is 94
  ```
-->

> Experiment: Try removing the conversion to `String` from the last line.
> What error do you get?

<!--
  TODO: Discuss with Core Writers ---
  are these experiments that make you familiar with errors
  helping you learn something?
-->

There's an even simpler way to include values in strings:
Write the value in parentheses,
and write a backslash (`\`) before the parentheses.
For example:

```swift
let apples = 3
let oranges = 5
let appleSummary = "I have \(apples) apples."
let fruitSummary = "I have \(apples + oranges) pieces of fruit."
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> let apples = 3
  -> let oranges = 5
  -> let appleSummary = "I have \(apples) apples."
  >> print(appleSummary)
  << I have 3 apples.
  -> let fruitSummary = "I have \(apples + oranges) pieces of fruit."
  >> print(fruitSummary)
  << I have 8 pieces of fruit.
  ```
-->

> Experiment: Use `\()` to
> include a floating-point calculation in a string
> and to include someone’s name in a greeting.

Use three double quotation marks (`"""`) for strings
that take up multiple lines.
Indentation at the start of each quoted line is removed,
as long as it matches the indentation of the closing quotation marks.
For example:

```swift
let quotation = """
        Even though there's whitespace to the left,
        the actual lines aren't indented.
            Except for this line.
        Double quotes (") can appear without being escaped.

        I still have \(apples + oranges) pieces of fruit.
        """
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> let quotation = """
     I said "I have \(apples) apples."
     And then I said "I have \(apples + oranges) pieces of fruit."
     """
  ```
-->

<!--
  Can't show an example of indentation in the triple-quoted string above.
  <rdar://problem/49129068> Swift code formatting damages indentation
-->

Create arrays and dictionaries using brackets (`[]`),
and access their elements by writing
the index or key in brackets.
A comma is allowed after the last element.

<!--
  REFERENCE
  The list of fruits comes from the colors that the original iMac came in,
  following the initial launch of the iMac in Bondi Blue, ordered by SKU --
  which also lines up with the order they appeared in ads:

       M7389LL/A (266 MHz Strawberry)
       M7392LL/A (266 MHz Lime)
       M7391LL/A (266 MHz Tangerine)
       M7390LL/A (266 MHz Grape)
       M7345LL/A (266 MHz Blueberry)

       M7441LL/A (333 MHz Strawberry)
       M7444LL/A (333 MHz Lime)
       M7443LL/A (333 MHz Tangerine)
       M7442LL/A (333 MHz Grape)
       M7440LL/A (333 MHz Blueberry)
-->

<!--
  REFERENCE
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
-->

```swift
var fruits = ["strawberries", "limes", "tangerines"]
fruits[1] = "grapes"

var occupations = [
    "Malcolm": "Captain",
    "Kaylee": "Mechanic",
 ]
occupations["Jayne"] = "Public Relations"
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> var fruits = ["strawberries", "limes", "tangerines"]
  -> fruits[1] = "grapes"

  -> var occupations = [
         "Malcolm": "Captain",
         "Kaylee": "Mechanic",
      ]
  -> occupations["Jayne"] = "Public Relations"
  ```
-->

<!-- Apple Books screenshot begins here. -->

Arrays automatically grow as you add elements.

```swift
fruits.append("blueberries")
print(fruits)
// Prints "["strawberries", "grapes", "tangerines", "blueberries"]".
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> fruits.append("blueberries")
  -> print(fruits)
  <- ["strawberries", "grapes", "tangerines", "blueberries"]
  ```
-->

You also use brackets to write an empty array or dictionary.
For an array, write `[]`,
and for a dictionary, write `[:]`.

```swift
fruits = []
occupations = [:]
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> fruits = []
  -> occupations = [:]
  ```
-->

If you're assigning an empty array or dictionary to a new variable,
or another place where there isn't any type information,
you need to specify the type.

```swift
let emptyArray: [String] = []
let emptyDictionary: [String: Float] = [:]
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> let emptyArray: [String] = []
  -> let emptyDictionary: [String: Float] = [:]

  -> let anotherEmptyArray = [String]()
  -> let emptyDictionary = [String: Float]()
  ```
-->

## Control Flow

Use `if` and `switch` to make conditionals,
and use `for`-`in`, `while`, and `repeat`-`while`
to make loops.
Parentheses around the condition or loop variable are optional.
Braces around the body are required.

```swift
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
// Prints "11".
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> let individualScores = [75, 43, 103, 87, 12]
  -> var teamScore = 0
  -> for score in individualScores {
         if score > 50 {
             teamScore += 3
         } else {
             teamScore += 1
         }
     }
  -> print(teamScore)
  <- 11
  ```
-->

<!--
  REFERENCE
  Jelly babies are a candy/sweet that was closely associated
  with past incarnations of the Doctor in Dr. Who.
-->

<!--
  -> let haveJellyBabies = true
  -> if haveJellyBabies {
     }
  << Would you like a jelly baby?
-->

In an `if` statement,
the conditional must be a Boolean expression ---
this means that code such as `if score { ... }` is an error,
not an implicit comparison to zero.

You can write `if` or `switch`
after the equal sign (`=`) of an assignment
or after `return`,
to choose a value based on the condition.

```swift
let scoreDecoration = if teamScore > 10 {
    "🎉"
} else {
    ""
}
print("Score:", teamScore, scoreDecoration)
// Prints "Score: 11 🎉".
```

You can use `if` and `let` together
to work with values that might be missing.
These values are represented as optionals.
An optional value either contains a value
or contains `nil` to indicate that a value is missing.
Write a question mark (`?`) after the type of a value
to mark the value as optional.

<!-- Apple Books screenshot ends here. -->

<!--
  REFERENCE
  John Appleseed is a stock Apple fake name,
  going back at least to the contacts database
  that ships with the SDK in the simulator.
-->

```swift
var optionalString: String? = "Hello"
print(optionalString == nil)
// Prints "false".

var optionalName: String? = "John Appleseed"
var greeting = "Hello!"
if let name = optionalName {
    greeting = "Hello, \(name)"
}
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> var optionalString: String? = "Hello"
  -> print(optionalString == nil)
  <- false

  -> var optionalName: String? = "John Appleseed"
  -> var greeting = "Hello!"
  -> if let name = optionalName {
         greeting = "Hello, \(name)"
     }
  >> print(greeting)
  << Hello, John Appleseed
  ```
-->

> Experiment: Change `optionalName` to `nil`.
> What greeting do you get?
> Add an `else` clause that sets a different greeting
> if `optionalName` is `nil`.

If the optional value is `nil`,
the conditional is `false` and the code in braces is skipped.
Otherwise, the optional value is unwrapped and assigned
to the constant after `let`,
which makes the unwrapped value available
inside the block of code.

Another way to handle optional values
is to provide a default value using the `??` operator.
If the optional value is missing,
the default value is used instead.

```swift
let nickname: String? = nil
let fullName: String = "John Appleseed"
let informalGreeting = "Hi \(nickname ?? fullName)"
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> let nickname: String? = nil
  -> let fullName: String = "John Appleseed"
  -> let informalGreeting = "Hi \(nickname ?? fullName)"
  >> print(informalGreeting)
  << Hi John Appleseed
  ```
-->

You can use a shorter spelling to unwrap a value,
using the same name for that unwrapped value.

```swift
if let nickname {
    print("Hey, \(nickname)")
}
// Doesn't print anything, because nickname is nil.
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> if let nickname {
         print("Hey, \(nickname)")
     }
  ```
-->

Switches support any kind of data
and a wide variety of comparison operations ---
they aren't limited to integers
and tests for equality.

<!--
  REFERENCE
  The vegetables and foods made from vegetables
  were just a convenient choice for a switch statement.
  They have various properties
  and fit with the apples & oranges used in an earlier example.
-->

```swift
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
// Prints "Is it a spicy red pepper?"
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> let vegetable = "red pepper"
  -> switch vegetable {
         case "celery":
             print("Add some raisins and make ants on a log.")
         case "cucumber", "watercress":
             print("That would make a good tea sandwich.")
         case let x where x.hasSuffix("pepper"):
             print("Is it a spicy \(x)?")
         default:
             print("Everything tastes good in soup.")
     }
  <- Is it a spicy red pepper?
  ```
-->

> Experiment: Try removing the default case.
> What error do you get?

Notice how `let` can be used in a pattern
to assign the value that matched the pattern
to a constant.

After executing the code inside the switch case that matched,
the program exits from the switch statement.
Execution doesn't continue to the next case,
so you don't need to explicitly break out of the switch
at the end of each case’s code.

<!--
  Omitting mention of "fallthrough" keyword.
  It's in the guide/reference if you need it.
-->

You use `for`-`in` to iterate over items in a dictionary
by providing a pair of names to use
for each key-value pair.
Dictionaries are an unordered collection,
so their keys and values are iterated over
in an arbitrary order.

<!--
  REFERENCE
  Prime, square, and Fibonacci numbers
  are just convenient sets of numbers
  that many developers are already familiar with
  that we can use for some simple math.
-->

```swift
let interestingNumbers = [
    "Prime": [2, 3, 5, 7, 11, 13],
    "Fibonacci": [1, 1, 2, 3, 5, 8],
    "Square": [1, 4, 9, 16, 25],
]
var largest = 0
for (_, numbers) in interestingNumbers {
    for number in numbers {
        if number > largest {
            largest = number
        }
    }
}
print(largest)
// Prints "25".
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> let interestingNumbers = [
         "Prime": [2, 3, 5, 7, 11, 13],
         "Fibonacci": [1, 1, 2, 3, 5, 8],
         "Square": [1, 4, 9, 16, 25],
     ]
  -> var largest = 0
  -> for (_, numbers) in interestingNumbers {
         for number in numbers {
             if number > largest {
                 largest = number
             }
         }
     }
  -> print(largest)
  <- 25
  ```
-->

> Experiment: Replace the `_` with a variable name,
> and keep track of which kind of number was the largest.

Use `while` to repeat a block of code until a condition changes.
The condition of a loop can be at the end instead,
ensuring that the loop is run at least once.

<!--
  REFERENCE
  This example is rather skeletal -- m and n are pretty boring.
  I couldn't come up with anything suitably interesting at the time though,
  so I just went ahead and used this.
-->

```swift
var n = 2
while n < 100 {
    n *= 2
}
print(n)
// Prints "128".

var m = 2
repeat {
    m *= 2
} while m < 100
print(m)
// Prints "128".
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> var n = 2
  -> while n < 100 {
         n *= 2
     }
  -> print(n)
  <- 128

  -> var m = 2
  -> repeat {
         m *= 2
     } while m < 100
  -> print(m)
  <- 128
  ```
-->

> Experiment:
> Change the condition from `m < 100` to `m < 0`
> to see how `while` and `repeat`-`while` behave differently
> when the loop condition is already false.

You can keep an index in a loop
by using `..<` to make a range of indexes.

```swift
var total = 0
for i in 0..<4 {
    total += i
}
print(total)
// Prints "6".
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> var total = 0
  -> for i in 0..<4 {
         total += i
     }
  -> print(total)
  <- 6
  ```
-->

Use `..<` to make a range that omits its upper value,
and use `...` to make a range that includes both values.

## Functions and Closures

Use `func` to declare a function.
Call a function by following its name
with a list of arguments in parentheses.
Use `->` to separate the parameter names and types
from the function's return type.

<!--
  REFERENCE
  Bob is used as just a generic name,
  but also a callout to Alex's dad.
  Tuesday is used on the assumption that lots of folks would be reading
  on the Tuesday after the WWDC keynote.
-->

```swift
func greet(person: String, day: String) -> String {
    return "Hello \(person), today is \(day)."
}
greet(person: "Bob", day: "Tuesday")
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> func greet(person: String, day: String) -> String {
         return "Hello \(person), today is \(day)."
     }
  >> let greetBob =
  -> greet(person: "Bob", day: "Tuesday")
  >> print(greetBob)
  << Hello Bob, today is Tuesday.
  ```
-->

> Experiment: Remove the `day` parameter.
> Add a parameter to include today’s lunch special in the greeting.

By default,
functions use their parameter names
as labels for their arguments.
Write a custom argument label before the parameter name,
or write `_` to use no argument label.

```swift
func greet(_ person: String, on day: String) -> String {
    return "Hello \(person), today is \(day)."
}
greet("John", on: "Wednesday")
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> func greet(_ person: String, on day: String) -> String {
         return "Hello \(person), today is \(day)."
     }
  >> let greetJohn =
  -> greet("John", on: "Wednesday")
  >> print(greetJohn)
  << Hello John, today is Wednesday.
  ```
-->

Use a tuple to make a compound value ---
for example, to return multiple values from a function.
The elements of a tuple can be referred to
either by name or by number.

<!--
  REFERENCE
  Min, max, and sum are convenient for this example
  because they're all simple operations
  that are performed on the same kind of data.
  This gives the function a reason to return a tuple.
-->

```swift
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
// Prints "120".
print(statistics.2)
// Prints "120".
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> func calculateStatistics(scores: [Int]) -> (min: Int, max: Int, sum: Int) {
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
  -> let statistics = calculateStatistics(scores: [5, 3, 100, 3, 9])
  >> print(statistics)
  << (min: 3, max: 100, sum: 120)
  -> print(statistics.sum)
  <- 120
  -> print(statistics.2)
  <- 120
  ```
-->

Functions can be nested.
Nested functions have access to variables
that were declared in the outer function.
You can use nested functions
to organize the code in a function
that's long or complex.

```swift
func returnFifteen() -> Int {
    var y = 10
    func add() {
        y += 5
    }
    add()
    return y
}
returnFifteen()
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> func returnFifteen() -> Int {
         var y = 10
         func add() {
             y += 5
         }
         add()
         return y
     }
  >> let fifteen =
  -> returnFifteen()
  >> print(fifteen)
  << 15
  ```
-->

Functions are a first-class type.
This means that a function can return another function as its value.

```swift
func makeIncrementer() -> ((Int) -> Int) {
    func addOne(number: Int) -> Int {
        return 1 + number
    }
    return addOne
}
var increment = makeIncrementer()
increment(7)
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> func makeIncrementer() -> ((Int) -> Int) {
         func addOne(number: Int) -> Int {
             return 1 + number
         }
         return addOne
     }
  -> var increment = makeIncrementer()
  >> let incrementResult =
  -> increment(7)
  >> print(incrementResult)
  << 8
  ```
-->

A function can take another function as one of its arguments.

```swift
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
hasAnyMatches(list: numbers, condition: lessThanTen)
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> func hasAnyMatches(list: [Int], condition: (Int) -> Bool) -> Bool {
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
  >> let anyMatches =
  -> hasAnyMatches(list: numbers, condition: lessThanTen)
  >> print(anyMatches)
  << true
  ```
-->

Functions are actually a special case of closures:
blocks of code that can be called later.
The code in a closure has access to things like variables and functions
that were available in the scope where the closure was created,
even if the closure is in a different scope when it's executed ---
you saw an example of this already with nested functions.
You can write a closure without a name
by surrounding code with braces (`{}`).
Use `in` to separate the arguments and return type from the body.

```swift
numbers.map({ (number: Int) -> Int in
    let result = 3 * number
    return result
})
```

<!--
  - test: `guided-tour`

  ```swifttest
  >> let numbersMap =
  -> numbers.map({ (number: Int) -> Int in
         let result = 3 * number
         return result
     })
  >> print(numbersMap)
  << [60, 57, 21, 36]
  ```
-->

> Experiment: Rewrite the closure to return zero for all odd numbers.

You have several options for writing closures more concisely.
When a closure's type is already known,
such as the callback for a delegate,
you can omit the type of its parameters,
its return type, or both.
Single statement closures implicitly return the value
of their only statement.

```swift
let mappedNumbers = numbers.map({ number in 3 * number })
print(mappedNumbers)
// Prints "[60, 57, 21, 36]".
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> let mappedNumbers = numbers.map({ number in 3 * number })
  -> print(mappedNumbers)
  <- [60, 57, 21, 36]
  ```
-->

You can refer to parameters by number instead of by name ---
this approach is especially useful in very short closures.
A closure passed as the last argument to a function
can appear immediately after the parentheses.
When a closure is the only argument to a function,
you can omit the parentheses entirely.

```swift
let sortedNumbers = numbers.sorted { $0 > $1 }
print(sortedNumbers)
// Prints "[20, 19, 12, 7]".
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> let sortedNumbers = numbers.sorted { $0 > $1 }
  -> print(sortedNumbers)
  <- [20, 19, 12, 7]
  ```
-->

<!--
  Called sorted() on a variable rather than a literal to work around an issue in Xcode.  See <rdar://17540974>.
-->

<!--
  Omitted sort(foo, <) because it often causes a spurious warning in Xcode.  See <rdar://17047529>.
-->

<!--
  Omitted custom operators as "advanced" topics.
-->

## Objects and Classes

Use `class` followed by the class's name to create a class.
A property declaration in a class is written the same way
as a constant or variable declaration,
except that it's in the context of a class.
Likewise, method and function declarations are written the same way.

<!--
  REFERENCE
  Shapes are used as the example object
  because they're familiar and they have a sense of properties
  and a sense of inheritance/subcategorization.
  They're not a perfect fit --
  they might be better off modeled as structures --
  but that wouldn't let them inherit behavior.
-->

```swift
class Shape {
    var numberOfSides = 0
    func simpleDescription() -> String {
        return "A shape with \(numberOfSides) sides."
    }
}
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> class Shape {
         var numberOfSides = 0
         func simpleDescription() -> String {
             return "A shape with \(numberOfSides) sides."
         }
     }
  >> print(Shape().simpleDescription())
  << A shape with 0 sides.
  ```
-->

> Experiment: Add a constant property with `let`,
> and add another method that takes an argument.

Create an instance of a class
by putting parentheses after the class name.
Use dot syntax to access
the properties and methods of the instance.

```swift
var shape = Shape()
shape.numberOfSides = 7
var shapeDescription = shape.simpleDescription()
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> var shape = Shape()
  -> shape.numberOfSides = 7
  -> var shapeDescription = shape.simpleDescription()
  >> print(shapeDescription)
  << A shape with 7 sides.
  ```
-->

This version of the `Shape` class is missing something important:
an initializer to set up the class when an instance is created.
Use `init` to create one.

```swift
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
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> class NamedShape {
         var numberOfSides: Int = 0
         var name: String

         init(name: String) {
            self.name = name
         }

         func simpleDescription() -> String {
            return "A shape with \(numberOfSides) sides."
         }
     }
  >> print(NamedShape(name: "test name").name)
  << test name
  >> print(NamedShape(name: "test name").simpleDescription())
  << A shape with 0 sides.
  ```
-->

Notice how `self` is used to distinguish the `name` property
from the `name` argument to the initializer.
The arguments to the initializer are passed like a function call
when you create an instance of the class.
Every property needs a value assigned ---
either in its declaration (as with `numberOfSides`)
or in the initializer (as with `name`).

Use `deinit` to create a deinitializer
if you need to perform some cleanup
before the object is deallocated.

Subclasses include their superclass name
after their class name,
separated by a colon.
There's no requirement for classes to subclass any standard root class,
so you can include or omit a superclass as needed.

Methods on a subclass that override the superclass's implementation
are marked with `override` ---
overriding a method by accident, without `override`,
is detected by the compiler as an error.
The compiler also detects methods with `override`
that don't actually override any method in the superclass.

```swift
class Square: NamedShape {
    var sideLength: Double

    init(sideLength: Double, name: String) {
        self.sideLength = sideLength
        super.init(name: name)
        numberOfSides = 4
    }

    func area() -> Double {
        return sideLength * sideLength
    }

    override func simpleDescription() -> String {
        return "A square with sides of length \(sideLength)."
    }
}
let test = Square(sideLength: 5.2, name: "my test square")
test.area()
test.simpleDescription()
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> class Square: NamedShape {
         var sideLength: Double

         init(sideLength: Double, name: String) {
             self.sideLength = sideLength
             super.init(name: name)
             numberOfSides = 4
         }

         func area() -> Double {
             return sideLength * sideLength
         }

         override func simpleDescription() -> String {
             return "A square with sides of length \(sideLength)."
         }
     }
  -> let test = Square(sideLength: 5.2, name: "my test square")
  >> let testArea =
  -> test.area()
  >> print(testArea)
  << 27.040000000000003
  >> let testDesc =
  -> test.simpleDescription()
  >> print(testDesc)
  << A square with sides of length 5.2.
  ```
-->

> Experiment: Make another subclass of `NamedShape`
> called `Circle`
> that takes a radius and a name
> as arguments to its initializer.
> Implement an `area()` and a `simpleDescription()` method
> on the `Circle` class.

In addition to simple properties that are stored,
properties can have a getter and a setter.

```swift
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
// Prints "9.3".
triangle.perimeter = 9.9
print(triangle.sideLength)
// Prints "3.3000000000000003".
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> class EquilateralTriangle: NamedShape {
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
  -> var triangle = EquilateralTriangle(sideLength: 3.1, name: "a triangle")
  -> print(triangle.perimeter)
  <- 9.3
  -> triangle.perimeter = 9.9
  -> print(triangle.sideLength)
  <- 3.3000000000000003
  ```
-->

In the setter for `perimeter`,
the new value has the implicit name `newValue`.
You can provide an explicit name in parentheses after `set`.

Notice that the initializer for the `EquilateralTriangle` class
has three different steps:

1. Setting the value of properties that the subclass declares.
2. Calling the superclass's initializer.
3. Changing the value of properties defined by the superclass.
   Any additional setup work that uses methods, getters, or setters
   can also be done at this point.

If you don't need to compute the property
but still need to provide code that's run before and after setting a new value,
use `willSet` and `didSet`.
The code you provide is run any time the value changes outside of an initializer.
For example, the class below ensures
that the side length of its triangle
is always the same as the side length of its square.

<!--
  This triangle + square example could use improvement.
  The goal is to show why you would want to use willSet,
  but it was constrained by the fact that
  we're working in the context of geometric shapes.
-->

```swift
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
// Prints "10.0".
print(triangleAndSquare.triangle.sideLength)
// Prints "10.0".
triangleAndSquare.square = Square(sideLength: 50, name: "larger square")
print(triangleAndSquare.triangle.sideLength)
// Prints "50.0".
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> class TriangleAndSquare {
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
  -> var triangleAndSquare = TriangleAndSquare(size: 10, name: "another test shape")
  -> print(triangleAndSquare.square.sideLength)
  <- 10.0
  -> print(triangleAndSquare.triangle.sideLength)
  <- 10.0
  -> triangleAndSquare.square = Square(sideLength: 50, name: "larger square")
  -> print(triangleAndSquare.triangle.sideLength)
  <- 50.0
  ```
-->

<!--
  Grammatically, these clauses are general to variables.
  Not sure what it would look like
  (or if it's even allowed)
  to use them outside a class or a struct.
-->

When working with optional values,
you can write `?` before operations like methods, properties, and subscripting.
If the value before the `?` is `nil`,
everything after the `?` is ignored
and the value of the whole expression is `nil`.
Otherwise, the optional value is unwrapped,
and everything after the `?` acts on the unwrapped value.
In both cases,
the value of the whole expression is an optional value.

```swift
let optionalSquare: Square? = Square(sideLength: 2.5, name: "optional square")
let sideLength = optionalSquare?.sideLength
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> let optionalSquare: Square? = Square(sideLength: 2.5, name: "optional square")
  -> let sideLength = optionalSquare?.sideLength
  ```
-->

## Enumerations and Structures

Use `enum` to create an enumeration.
Like classes and all other named types,
enumerations can have methods associated with them.

<!--
  REFERENCE
  Playing cards work pretty well to demonstrate enumerations
  because they have two aspects, suit and rank,
  both of which come from a small finite set.
  The deck used here is probably the most common,
  at least through most of Europe and the Americas,
  but there are many other regional variations.
-->

```swift
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
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> enum Rank: Int {
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
  -> let ace = Rank.ace
  -> let aceRawValue = ace.rawValue
  >> print(aceRawValue)
  << 1
  ```
-->

> Experiment: Write a function that compares two `Rank` values
> by comparing their raw values.

By default, Swift assigns the raw values starting at zero
and incrementing by one each time,
but you can change this behavior by explicitly specifying values.
In the example above, `Ace` is explicitly given a raw value of `1`,
and the rest of the raw values are assigned in order.
You can also use strings or floating-point numbers
as the raw type of an enumeration.
Use the `rawValue` property to access the raw value of an enumeration case.

Use the `init?(rawValue:)` initializer
to make an instance of an enumeration from a raw value.
It returns either the enumeration case matching the raw value
or `nil` if there's no matching `Rank`.

```swift
if let convertedRank = Rank(rawValue: 3) {
    let threeDescription = convertedRank.simpleDescription()
}
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> if let convertedRank = Rank(rawValue: 3) {
         let threeDescription = convertedRank.simpleDescription()
  >> print(threeDescription)
  << 3
  -> }
  ```
-->

The case values of an enumeration are actual values,
not just another way of writing their raw values.
In fact,
in cases where there isn't a meaningful raw value,
you don't have to provide one.

```swift
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
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> enum Suit {
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
  -> let hearts = Suit.hearts
  -> let heartsDescription = hearts.simpleDescription()
  >> print(heartsDescription)
  << hearts
  ```
-->

> Experiment: Add a `color()` method to `Suit` that returns "black"
> for spades and clubs, and returns "red" for hearts and diamonds.

<!--
  Suits are in Bridge order, which matches Unicode order.
  In other games, orders differ.
  Wikipedia lists a good half dozen orders.
-->

Notice the two ways that the `hearts` case of the enumeration
is referred to above:
When assigning a value to the `hearts` constant,
the enumeration case `Suit.hearts` is referred to by its full name
because the constant doesn't have an explicit type specified.
Inside the switch,
the enumeration case is referred to by the abbreviated form `.hearts`
because the value of `self` is already known to be a suit.
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

<!--
  REFERENCE
  The server response is a simple way to essentially re-implement Optional
  while sidestepping the fact that I'm doing so.

  "Out of cheese" is a reference to a Terry Pratchett book,
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
-->

```swift
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
// Prints "Sunrise is at 6:00 am and sunset is at 8:09 pm."
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> enum ServerResponse {
         case result(String, String)
         case failure(String)
     }

  -> let success = ServerResponse.result("6:00 am", "8:09 pm")
  -> let failure = ServerResponse.failure("Out of cheese.")

  -> switch success {
         case let .result(sunrise, sunset):
             print("Sunrise is at \(sunrise) and sunset is at \(sunset).")
         case let .failure(message):
             print("Failure...  \(message)")
     }
  <- Sunrise is at 6:00 am and sunset is at 8:09 pm.
  ```
-->

> Experiment: Add a third case to `ServerResponse` and to the switch.

Notice how the sunrise and sunset times
are extracted from the `ServerResponse` value
as part of matching the value against the switch cases.

Use `struct` to create a structure.
Structures support many of the same behaviors as classes,
including methods and initializers.
One of the most important differences
between structures and classes is that
structures are always copied when they're passed around in your code,
but classes are passed by reference.

```swift
struct Card {
    var rank: Rank
    var suit: Suit
    func simpleDescription() -> String {
        return "The \(rank.simpleDescription()) of \(suit.simpleDescription())"
    }
}
let threeOfSpades = Card(rank: .three, suit: .spades)
let threeOfSpadesDescription = threeOfSpades.simpleDescription()
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> struct Card {
         var rank: Rank
         var suit: Suit
         func simpleDescription() -> String {
             return "The \(rank.simpleDescription()) of \(suit.simpleDescription())"
         }
     }
  -> let threeOfSpades = Card(rank: .three, suit: .spades)
  -> let threeOfSpadesDescription = threeOfSpades.simpleDescription()
  >> print(threeOfSpadesDescription)
  << The 3 of spades
  ```
-->

> Experiment: Write a function that returns an array containing
> a full deck of cards,
> with one card of each combination of rank and suit.

## Concurrency

Use `async` to mark a function that runs asynchronously.

```swift
func fetchUserID(from server: String) async -> Int {
    if server == "primary" {
        return 97
    }
    return 501
}
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> func fetchUserID(from server: String) async -> Int {
         if server == "primary" {
             return 97
         }
         return 501
     }
  ```
-->

You mark a call to an asynchronous function by writing `await` in front of it.

```swift
func fetchUsername(from server: String) async -> String {
    let userID = await fetchUserID(from: server)
    if userID == 501 {
        return "John Appleseed"
    }
    return "Guest"
}
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> func fetchUsername(from server: String) async -> String {
         let userID = await fetchUserID(from: server)
         if userID == 501 {
             return "John Appleseed"
         }
         return "Guest"
     }
  ```
-->

Use `async let` to call an asynchronous function,
letting it run in parallel with other asynchronous code.
When you use the value it returns, write `await`.

```swift
func connectUser(to server: String) async {
    async let userID = fetchUserID(from: server)
    async let username = fetchUsername(from: server)
    let greeting = await "Hello \(username), user ID \(userID)"
    print(greeting)
}
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> func connectUser(to server: String) async {
         async let userID = fetchUserID(from: server)
         async let username = fetchUsername(from: server)
         let greeting = await "Hello \(username), user ID \(userID)"
         print(greeting)
     }
  ```
-->

Use `Task` to call asynchronous functions from synchronous code,
without waiting for them to return.

```swift
Task {
    await connectUser(to: "primary")
}
// Prints "Hello Guest, user ID 97".
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> Task {
         await connectUser(to: "primary")
     }
  >> import Darwin; sleep(1)  // Pause for task to run
  <- Hello Guest, user ID 97
  ```
-->

Use task groups to structure concurrent code.

```swift
let userIDs = await withTaskGroup(of: Int.self) { group in
    for server in ["primary", "secondary", "development"] {
        group.addTask {
            return await fetchUserID(from: server)
        }
    }

    var results: [Int] = []
    for await result in group {
        results.append(result)
    }
    return results
}
```

Actors are similar to classes,
except they ensure that different asynchronous functions
can safely interact with an instance of the same actor at the same time.

```swift
actor ServerConnection {
    var server: String = "primary"
    private var activeUsers: [Int] = []
    func connect() async -> Int {
        let userID = await fetchUserID(from: server)
        // ... communicate with server ...
        activeUsers.append(userID)
        return userID
    }
}
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> actor Oven {
         var contents: [String] = []
         func bake(_ food: String) -> String {
             contents.append(food)
             // ... wait for food to bake ...
             return contents.removeLast()
         }
     }
  ```
-->

When you call a method on an actor or access one of its properties,
you mark that code with `await`
to indicate that it might have to wait for other code
that's already running on the actor to finish.

```swift
let server = ServerConnection()
let userID = await server.connect()
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> let oven = Oven()
  -> let biscuits = await oven.bake("biscuits")
  ```
-->

## Protocols and Extensions

Use `protocol` to declare a protocol.

```swift
protocol ExampleProtocol {
     var simpleDescription: String { get }
     mutating func adjust()
}
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> protocol ExampleProtocol {
          var simpleDescription: String { get }
          mutating func adjust()
     }
  ```
-->

Classes, enumerations, and structures can all adopt protocols.

<!--
  REFERENCE
  The use of adjust() is totally a placeholder
  for some more interesting operation.
  Likewise for the struct and classes -- placeholders
  for some more interesting data structure.
-->

```swift
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

struct SimpleStructure: ExampleProtocol {
     var simpleDescription: String = "A simple structure"
     mutating func adjust() {
          simpleDescription += " (adjusted)"
     }
}
var b = SimpleStructure()
b.adjust()
let bDescription = b.simpleDescription
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> class SimpleClass: ExampleProtocol {
          var simpleDescription: String = "A very simple class."
          var anotherProperty: Int = 69105
          func adjust() {
               simpleDescription += "  Now 100% adjusted."
          }
     }
  -> var a = SimpleClass()
  -> a.adjust()
  -> let aDescription = a.simpleDescription
  >> print(aDescription)
  << A very simple class.  Now 100% adjusted.

  -> struct SimpleStructure: ExampleProtocol {
          var simpleDescription: String = "A simple structure"
          mutating func adjust() {
               simpleDescription += " (adjusted)"
          }
     }
  -> var b = SimpleStructure()
  -> b.adjust()
  -> let bDescription = b.simpleDescription
  >> print(bDescription)
  << A simple structure (adjusted)
  ```
-->

> Experiment: Add another requirement to `ExampleProtocol`.
> What changes do you need to make
> to `SimpleClass` and `SimpleStructure`
> so that they still conform to the protocol?

Notice the use of the `mutating` keyword
in the declaration of `SimpleStructure`
to mark a method that modifies the structure.
The declaration of `SimpleClass` doesn't need
any of its methods marked as mutating
because methods on a class can always modify the class.

Use `extension` to add functionality to an existing type,
such as new methods and computed properties.
You can use an extension to add protocol conformance
to a type that's declared elsewhere,
or even to a type that you imported from a library or framework.

```swift
extension Int: ExampleProtocol {
    var simpleDescription: String {
        return "The number \(self)"
    }
    mutating func adjust() {
        self += 42
    }
 }
print(7.simpleDescription)
// Prints "The number 7".
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> extension Int: ExampleProtocol {
         var simpleDescription: String {
             return "The number \(self)"
         }
         mutating func adjust() {
             self += 42
         }
      }
  -> print(7.simpleDescription)
  <- The number 7
  ```
-->

> Experiment: Write an extension for the `Double` type
> that adds an `absoluteValue` property.

You can use a protocol name just like any other named type ---
for example, to create a collection of objects
that have different types
but that all conform to a single protocol.
When you work with values whose type is a boxed protocol type,
methods outside the protocol definition aren't available.

```swift
let protocolValue: any ExampleProtocol = a
print(protocolValue.simpleDescription)
// Prints "A very simple class.  Now 100% adjusted."
// print(protocolValue.anotherProperty)  // Uncomment to see the error
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> let protocolValue: ExampleProtocol = a
  -> print(protocolValue.simpleDescription)
  <- A very simple class.  Now 100% adjusted.
  // print(protocolValue.anotherProperty)  // Uncomment to see the error
  ```
-->

Even though the variable `protocolValue`
has a runtime type of `SimpleClass`,
the compiler treats it as the given type of `ExampleProtocol`.
This means that you can't accidentally access
methods or properties that the class implements
in addition to its protocol conformance.

## Error Handling

You represent errors using any type that adopts the `Error` protocol.

<!--
  REFERENCE
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
-->

```swift
enum PrinterError: Error {
    case outOfPaper
    case noToner
    case onFire
}
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> enum PrinterError: Error {
         case outOfPaper
         case noToner
         case onFire
     }
  ```
-->

Use `throw` to throw an error
and `throws` to mark a function that can throw an error.
If you throw an error in a function,
the function returns immediately and the code that called the function
handles the error.

```swift
func send(job: Int, toPrinter printerName: String) throws -> String {
    if printerName == "Never Has Toner" {
        throw PrinterError.noToner
    }
    return "Job sent"
}
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> func send(job: Int, toPrinter printerName: String) throws -> String {
         if printerName == "Never Has Toner" {
             throw PrinterError.noToner
         }
         return "Job sent"
     }
  ```
-->

There are several ways to handle errors.
One way is to use `do`-`catch`.
Inside the `do` block,
you mark code that can throw an error by writing `try` in front of it.
Inside the `catch` block,
the error is automatically given the name `error`
unless you give it a different name.

```swift
do {
    let printerResponse = try send(job: 1040, toPrinter: "Bi Sheng")
    print(printerResponse)
} catch {
    print(error)
}
// Prints "Job sent".
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> do {
         let printerResponse = try send(job: 1040, toPrinter: "Bi Sheng")
         print(printerResponse)
     } catch {
         print(error)
     }
  <- Job sent
  ```
-->

> Experiment: Change the printer name to `"Never Has Toner"`,
> so that the `send(job:toPrinter:)` function throws an error.

<!--
  Assertion tests the change that the Experiment box instructs you to make.
-->

<!--
  - test: `guided-tour`

  ```swifttest
  >> do {
         let printerResponse = try send(job: 500, toPrinter: "Never Has Toner")
         print(printerResponse)
     } catch {
         print(error)
     }
  <- noToner
  ```
-->

You can provide multiple `catch` blocks
that handle specific errors.
You write a pattern after `catch` just as you do
after `case` in a switch.

<!--
  REFERENCE
  The "rest of the fire" quote comes from The IT Crowd, season 1 episode 2.
-->

```swift
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
// Prints "Job sent".
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> do {
         let printerResponse = try send(job: 1440, toPrinter: "Gutenberg")
         print(printerResponse)
     } catch PrinterError.onFire {
         print("I'll just put this over here, with the rest of the fire.")
     } catch let printerError as PrinterError {
         print("Printer error: \(printerError).")
     } catch {
         print(error)
     }
  <- Job sent
  ```
-->

> Experiment: Add code to throw an error inside the `do` block.
> What kind of error do you need to throw
> so that the error is handled by the first `catch` block?
> What about the second and third blocks?

Another way to handle errors
is to use `try?` to convert the result to an optional.
If the function throws an error,
the specific error is discarded and the result is `nil`.
Otherwise, the result is an optional containing
the value that the function returned.

```swift
let printerSuccess = try? send(job: 1884, toPrinter: "Mergenthaler")
let printerFailure = try? send(job: 1885, toPrinter: "Never Has Toner")
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> let printerSuccess = try? send(job: 1884, toPrinter: "Mergenthaler")
  >> print(printerSuccess as Any)
  << Optional("Job sent")
  -> let printerFailure = try? send(job: 1885, toPrinter: "Never Has Toner")
  >> print(printerFailure as Any)
  << nil
  ```
-->

Use `defer` to write a block of code
that's executed after all other code in the function,
just before the function returns.
The code is executed regardless of whether the function throws an error.
You can use `defer` to write setup and cleanup code next to each other,
even though they need to be executed at different times.

```swift
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
if fridgeContains("banana") {
    print("Found a banana")
}
print(fridgeIsOpen)
// Prints "false".
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> var fridgeIsOpen = false
  -> let fridgeContent = ["milk", "eggs", "leftovers"]

  -> func fridgeContains(_ food: String) -> Bool {
         fridgeIsOpen = true
         defer {
             fridgeIsOpen = false
         }

         let result = fridgeContent.contains(food)
         return result
     }
  >> let containsBanana =
  -> fridgeContains("banana")
  >> print(containsBanana)
  << false
  -> print(fridgeIsOpen)
  <- false
  ```
-->

## Generics

Write a name inside angle brackets
to make a generic function or type.

<!--
  REFERENCE
  The four knocks is a reference to Dr Who series 4,
  in which knocking four times is a running aspect
  of the season's plot.
-->

```swift
func makeArray<Item>(repeating item: Item, numberOfTimes: Int) -> [Item] {
    var result: [Item] = []
    for _ in 0..<numberOfTimes {
         result.append(item)
    }
    return result
}
makeArray(repeating: "knock", numberOfTimes: 4)
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> func makeArray<Item>(repeating item: Item, numberOfTimes: Int) -> [Item] {
         var result: [Item] = []
         for _ in 0..<numberOfTimes {
              result.append(item)
         }
         return result
     }
  >> let fourKnocks =
  -> makeArray(repeating: "knock", numberOfTimes: 4)
  >> print(fourKnocks)
  << ["knock", "knock", "knock", "knock"]
  ```
-->

You can make generic forms of functions and methods,
as well as classes, enumerations, and structures.

```swift
// Reimplement the Swift standard library's optional type
enum OptionalValue<Wrapped> {
    case none
    case some(Wrapped)
}
var possibleInteger: OptionalValue<Int> = .none
possibleInteger = .some(100)
```

<!--
  - test: `guided-tour`

  ```swifttest
  // Reimplement the Swift standard library's optional type
  -> enum OptionalValue<Wrapped> {
         case none
         case some(Wrapped)
     }
  -> var possibleInteger: OptionalValue<Int> = .none
  -> possibleInteger = .some(100)
  ```
-->

Use `where` right before the body
to specify a list of requirements ---
for example,
to require the type to implement a protocol,
to require two types to be the same,
or to require a class to have a particular superclass.

```swift
func anyCommonElements<T: Sequence, U: Sequence>(_ lhs: T, _ rhs: U) -> Bool
    where T.Element: Equatable, T.Element == U.Element
{
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
```

<!--
  - test: `guided-tour`

  ```swifttest
  -> func anyCommonElements<T: Sequence, U: Sequence>(_ lhs: T, _ rhs: U) -> Bool
         where T.Element: Equatable, T.Element == U.Element
     {
         for lhsItem in lhs {
             for rhsItem in rhs {
                 if lhsItem == rhsItem {
                     return true
                 }
             }
         }
        return false
     }
  >> let hasAnyCommon =
  -> anyCommonElements([1, 2, 3], [3])
  >> print(hasAnyCommon)
  << true
  ```
-->

> Experiment: Modify the `anyCommonElements(_:_:)` function
> to make a function that returns an array
> of the elements that any two sequences have in common.

Writing `<T: Equatable>`
is the same as writing `<T> ... where T: Equatable`.

<!--
This source file is part of the Swift.org open source project

Copyright (c) 2014 - 2022 Apple Inc. and the Swift project authors
Licensed under Apache License v2.0 with Runtime Library Exception

See https://swift.org/LICENSE.txt for license information
See https://swift.org/CONTRIBUTORS.txt for the list of Swift project authors
-->
