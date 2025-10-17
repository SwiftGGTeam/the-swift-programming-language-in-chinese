# Enumerations

Model custom types that define a list of possible values.

An *enumeration* defines a common type for a group of related values
and enables you to work with those values in a type-safe way within your code.

If you are familiar with C,
you will know that C enumerations assign related names to a set of integer values.
Enumerations in Swift are much more flexible,
and don't have to provide a value for each case of the enumeration.
If a value (known as a *raw* value) is provided for each enumeration case,
the value can be a string, a character,
or a value of any integer or floating-point type.

Alternatively, enumeration cases can specify
associated values of *any* type to be stored along with each different case value,
much as unions or variants do in other languages.
You can define a common set of related cases as part of one enumeration,
each of which has a different set of values of appropriate types associated with it.

Enumerations in Swift are first-class types in their own right.
They adopt many features traditionally supported only by classes,
such as computed properties to provide additional information about
the enumeration's current value,
and instance methods to provide functionality related to
the values the enumeration represents.
Enumerations can also define initializers to provide an initial case value;
can be extended to expand their functionality beyond their original implementation;
and can conform to protocols to provide standard functionality.

For more about these capabilities, see
<doc:Properties>, <doc:Methods>, <doc:Initialization>,
<doc:Extensions>, and <doc:Protocols>.

<!--
  TODO: this chapter should probably mention that enums without associated values
  are hashable and equatable by default (and what that means in practice)
-->

## Enumeration Syntax

You introduce enumerations with the `enum` keyword
and place their entire definition within a pair of braces:

```swift
enum SomeEnumeration {
    // enumeration definition goes here
}
```

<!--
  - test: `enums`

  ```swifttest
  -> enum SomeEnumeration {
        // enumeration definition goes here
     }
  ```
-->

Here's an example for the four main points of a compass:

```swift
enum CompassPoint {
    case north
    case south
    case east
    case west
}
```

<!--
  - test: `enums`

  ```swifttest
  -> enum CompassPoint {
        case north
        case south
        case east
        case west
     }
  ```
-->

The values defined in an enumeration
(such as `north`, `south`, `east`, and `west`)
are its *enumeration cases*.
You use the `case` keyword to introduce new enumeration cases.

> Note: Swift enumeration cases don't have an integer value set by default,
> unlike languages like C and Objective-C.
> In the `CompassPoint` example above,
> `north`, `south`, `east` and `west`
> don't implicitly equal
> `0`, `1`, `2` and `3`.
> Instead, the different enumeration cases are values in their own right,
> with an explicitly defined type of `CompassPoint`.

Multiple cases can appear on a single line, separated by commas:

```swift
enum Planet {
    case mercury, venus, earth, mars, jupiter, saturn, uranus, neptune
}
```

<!--
  - test: `enums`

  ```swifttest
  -> enum Planet {
        case mercury, venus, earth, mars, jupiter, saturn, uranus, neptune
     }
  ```
-->

Each enumeration definition defines a new type.
Like other types in Swift, their names
(such as `CompassPoint` and `Planet`)
start with a capital letter.
Give enumeration types singular rather than plural names,
so that they read as self-evident:

```swift
var directionToHead = CompassPoint.west
```

<!--
  - test: `enums`

  ```swifttest
  -> var directionToHead = CompassPoint.west
  ```
-->

The type of `directionToHead` is inferred
when it's initialized with one of the possible values of `CompassPoint`.
Once `directionToHead` is declared as a `CompassPoint`,
you can set it to a different `CompassPoint` value using a shorter dot syntax:

```swift
directionToHead = .east
```

<!--
  - test: `enums`

  ```swifttest
  -> directionToHead = .east
  ```
-->

The type of `directionToHead` is already known,
and so you can drop the type when setting its value.
This makes for highly readable code when working with explicitly typed enumeration values.

## Matching Enumeration Values with a Switch Statement

You can match individual enumeration values with a `switch` statement:

```swift
directionToHead = .south
switch directionToHead {
case .north:
    print("Lots of planets have a north")
case .south:
    print("Watch out for penguins")
case .east:
    print("Where the sun rises")
case .west:
    print("Where the skies are blue")
}
// Prints "Watch out for penguins".
```

<!--
  - test: `enums`

  ```swifttest
  -> directionToHead = .south
  -> switch directionToHead {
        case .north:
           print("Lots of planets have a north")
        case .south:
           print("Watch out for penguins")
        case .east:
           print("Where the sun rises")
        case .west:
           print("Where the skies are blue")
     }
  <- Watch out for penguins
  ```
-->

You can read this code as:

“Consider the value of `directionToHead`.
In the case where it equals `.north`,
print `"Lots of planets have a north"`.
In the case where it equals `.south`,
print `"Watch out for penguins"`.”

…and so on.

As described in <doc:ControlFlow>,
a `switch` statement must be exhaustive when considering an enumeration's cases.
If the `case` for `.west` is omitted,
this code doesn't compile,
because it doesn't consider the complete list of `CompassPoint` cases.
Requiring exhaustiveness ensures that enumeration cases aren't accidentally omitted.

When it isn't appropriate to provide a `case` for every enumeration case,
you can provide a `default` case to cover any cases that aren't addressed explicitly:

```swift
let somePlanet = Planet.earth
switch somePlanet {
case .earth:
    print("Mostly harmless")
default:
    print("Not a safe place for humans")
}
// Prints "Mostly harmless".
```

<!--
  - test: `enums`

  ```swifttest
  -> let somePlanet = Planet.earth
  -> switch somePlanet {
        case .earth:
           print("Mostly harmless")
        default:
           print("Not a safe place for humans")
     }
  <- Mostly harmless
  ```
-->

## Iterating over Enumeration Cases

For some enumerations,
it's useful to have a collection of all of that enumeration's cases.
You enable this by
writing `: CaseIterable` after the enumeration's name.
Swift exposes a collection of all the cases
as an `allCases` property of the enumeration type.
Here's an example:

```swift
enum Beverage: CaseIterable {
    case coffee, tea, juice
}
let numberOfChoices = Beverage.allCases.count
print("\(numberOfChoices) beverages available")
// Prints "3 beverages available".
```

<!--
  - test: `enums`

  ```swifttest
  -> enum Beverage: CaseIterable {
         case coffee, tea, juice
     }
  -> let numberOfChoices = Beverage.allCases.count
  -> print("\(numberOfChoices) beverages available")
  <- 3 beverages available
  ```
-->

In the example above,
you write `Beverage.allCases` to access a collection
that contains all of the cases of the `Beverage` enumeration.
You can use `allCases` like any other collection ---
the collection's elements are instances of the enumeration type,
so in this case they're `Beverage` values.
The example above counts how many cases there are,
and the example below uses a `for`-`in` loop to iterate over all the cases.

```swift
for beverage in Beverage.allCases {
    print(beverage)
}
// coffee
// tea
// juice
```

<!--
  - test: `enums`

  ```swifttest
  -> for beverage in Beverage.allCases {
         print(beverage)
     }
  << coffee
  << tea
  << juice
  // coffee
  // tea
  // juice
  ```
-->

The syntax used in the examples above
marks the enumeration as conforming to the
[`CaseIterable`](https://developer.apple.com/documentation/swift/caseiterable) protocol.
For information about protocols, see <doc:Protocols>.

## Associated Values

The examples in the previous section show how the cases of an enumeration are
a defined (and typed) value in their own right.
You can set a constant or variable to `Planet.earth`,
and check for this value later.
However, it's sometimes useful to be able to store
values of other types alongside these case values.
This additional information is called an *associated value*,
and it varies each time you use that case as a value in your code.

You can define Swift enumerations to store associated values of any given type,
and the value types can be different for each case of the enumeration if needed.
Enumerations similar to these are known as
*discriminated unions*, *tagged unions*, or *variants*
in other programming languages.

For example, suppose an inventory tracking system needs to
track products by two different types of barcode.
Some products are labeled with 1D barcodes in UPC format,
which uses the numbers `0` to `9`.
Each barcode has a number system digit,
followed by five manufacturer code digits and five product code digits.
These are followed by a check digit to verify that the code has been scanned correctly:

![](barcode_UPC)

Other products are labeled with 2D barcodes in QR code format,
which can use any ISO 8859-1 character
and can encode a string up to 2,953 characters long:

![](barcode_QR)

It's convenient for an inventory tracking system to store UPC barcodes
as a tuple of four integers,
and QR code barcodes as a string of any length.

In Swift, an enumeration to define product barcodes of either type might look like this:

```swift
enum Barcode {
    case upc(Int, Int, Int, Int)
    case qrCode(String)
}
```

<!--
  - test: `enums`

  ```swifttest
  -> enum Barcode {
        case upc(Int, Int, Int, Int)
        case qrCode(String)
     }
  ```
-->

This can be read as:

“Define an enumeration type called `Barcode`,
which can take either a value of `upc`
with an associated value of type (`Int`, `Int`, `Int`, `Int`),
or a value of `qrCode` with an associated value of type `String`.”

This definition doesn't provide any actual `Int` or `String` values ---
it just defines the *type* of associated values
that `Barcode` constants and variables can store
when they're equal to `Barcode.upc` or `Barcode.qrCode`.

You can then create new barcodes using either type:

```swift
var productBarcode = Barcode.upc(8, 85909, 51226, 3)
```

<!--
  - test: `enums`

  ```swifttest
  -> var productBarcode = Barcode.upc(8, 85909, 51226, 3)
  ```
-->

This example creates a new variable called `productBarcode`
and assigns it a value of `Barcode.upc`
with an associated tuple value of `(8, 85909, 51226, 3)`.

You can assign the same product a different type of barcode:

```swift
productBarcode = .qrCode("ABCDEFGHIJKLMNOP")
```

<!--
  - test: `enums`

  ```swifttest
  -> productBarcode = .qrCode("ABCDEFGHIJKLMNOP")
  ```
-->

At this point,
the original `Barcode.upc` and its integer values are replaced by
the new `Barcode.qrCode` and its string value.
Constants and variables of type `Barcode` can store either a `.upc` or a `.qrCode`
(together with their associated values),
but they can store only one of them at any given time.

You can check the different barcode types using a switch statement,
similar to the example in
<doc:Enumerations#Matching-Enumeration-Values-with-a-Switch-Statement>.
This time, however,
the associated values are extracted as part of the switch statement.
You extract each associated value as a constant (with the `let` prefix)
or a variable (with the `var` prefix)
for use within the `switch` case's body:

```swift
switch productBarcode {
case .upc(let numberSystem, let manufacturer, let product, let check):
    print("UPC: \(numberSystem), \(manufacturer), \(product), \(check).")
case .qrCode(let productCode):
    print("QR code: \(productCode).")
}
// Prints "QR code: ABCDEFGHIJKLMNOP."
```

<!--
  - test: `enums`

  ```swifttest
  -> switch productBarcode {
        case .upc(let numberSystem, let manufacturer, let product, let check):
           print("UPC: \(numberSystem), \(manufacturer), \(product), \(check).")
        case .qrCode(let productCode):
           print("QR code: \(productCode).")
     }
  <- QR code: ABCDEFGHIJKLMNOP.
  ```
-->

If all of the associated values for an enumeration case
are extracted as constants, or if all are extracted as variables,
you can place a single `let` or `var` annotation before the case name, for brevity:

```swift
switch productBarcode {
case let .upc(numberSystem, manufacturer, product, check):
    print("UPC : \(numberSystem), \(manufacturer), \(product), \(check).")
case let .qrCode(productCode):
    print("QR code: \(productCode).")
}
// Prints "QR code: ABCDEFGHIJKLMNOP."
```

<!--
  - test: `enums`

  ```swifttest
  -> switch productBarcode {
        case let .upc(numberSystem, manufacturer, product, check):
           print("UPC : \(numberSystem), \(manufacturer), \(product), \(check).")
        case let .qrCode(productCode):
           print("QR code: \(productCode).")
     }
  <- QR code: ABCDEFGHIJKLMNOP.
  ```
-->

When you're matching just one case of an enumeration ---
for example,
to extract its associated value ---
you can use an `if`-`case` statement
instead of writing a full switch statement.
Here's what it looks like:

```swift
if case .qrCode(let productCode) = productBarcode {
    print("QR code: \(productCode).")
}
```

Just like in the switch statement earlier,
the `productBarcode` variable is matched against
the pattern `.qrCode(let productCode)` here.
And as in the switch case,
writing `let` extracts the associated value as a constant.
For more information about `if`-`case` statements,
see <doc:ControlFlow#Patterns>.

## Raw Values

The barcode example in <doc:Enumerations#Associated-Values>
shows how cases of an enumeration can declare that they store
associated values of different types.
As an alternative to associated values,
enumeration cases can come prepopulated with default values
(called *raw values*),
which are all of the same type.

Here's an example that stores raw ASCII values alongside named enumeration cases:

```swift
enum ASCIIControlCharacter: Character {
    case tab = "\t"
    case lineFeed = "\n"
    case carriageReturn = "\r"
}
```

<!--
  - test: `rawValues`

  ```swifttest
  -> enum ASCIIControlCharacter: Character {
        case tab = "\t"
        case lineFeed = "\n"
        case carriageReturn = "\r"
     }
  ```
-->

Here, the raw values for an enumeration called `ASCIIControlCharacter`
are defined to be of type `Character`,
and are set to some of the more common ASCII control characters.
`Character` values are described in <doc:StringsAndCharacters>.

Raw values can be
strings, characters, or any of the integer or floating-point number types.
Each raw value must be unique within its enumeration declaration.

Although you can use both raw values and associated values
to give an enumeration an additional value,
it's important to understand the difference between them.
You pick the raw value for an enumeration case
when you define that enumeration case in your code,
such as the three ASCII codes above.
The raw value for a particular enumeration case is always the same.
In contrast,
you pick associated values when you create a new constant or variable
using one of the enumeration's cases,
and you can pick a different value each time you do so.

### Implicitly Assigned Raw Values

When you're working with enumerations that store integer or string raw values,
you don't have to explicitly assign a raw value for each case.
When you don't, Swift automatically assigns the values for you.

For example, when integers are used for raw values,
the implicit value for each case is one more than the previous case.
If the first case doesn't have a value set, its value is `0`.

The enumeration below is a refinement of the earlier `Planet` enumeration,
with integer raw values to represent each planet's order from the sun:

```swift
enum Planet: Int {
    case mercury = 1, venus, earth, mars, jupiter, saturn, uranus, neptune
}
```

<!--
  - test: `rawValues`

  ```swifttest
  -> enum Planet: Int {
        case mercury = 1, venus, earth, mars, jupiter, saturn, uranus, neptune
     }
  ```
-->

In the example above,
`Planet.mercury` has an explicit raw value of `1`,
`Planet.venus` has an implicit raw value of `2`, and so on.

When strings are used for raw values,
the implicit value for each case is the text of that case's name.

The enumeration below is a refinement of the earlier `CompassPoint` enumeration,
with string raw values to represent each direction's name:

```swift
enum CompassPoint: String {
    case north, south, east, west
}
```

<!--
  - test: `rawValues`

  ```swifttest
  -> enum CompassPoint: String {
        case north, south, east, west
     }
  ```
-->

In the example above,
`CompassPoint.south` has an implicit raw value of `"south"`, and so on.

You access the raw value of an enumeration case with its `rawValue` property:

```swift
let earthsOrder = Planet.earth.rawValue
// earthsOrder is 3

let sunsetDirection = CompassPoint.west.rawValue
// sunsetDirection is "west"
```

<!--
  - test: `rawValues`

  ```swifttest
  -> let earthsOrder = Planet.earth.rawValue
  /> earthsOrder is \(earthsOrder)
  </ earthsOrder is 3

  -> let sunsetDirection = CompassPoint.west.rawValue
  /> sunsetDirection is \"\(sunsetDirection)\"
  </ sunsetDirection is "west"
  ```
-->

### Initializing from a Raw Value

If you define an enumeration with a raw-value type,
the enumeration automatically receives an initializer
that takes a value of the raw value's type (as a parameter called `rawValue`)
and returns either an enumeration case or `nil`.
You can use this initializer to try to create a new instance of the enumeration.

This example identifies Uranus from its raw value of `7`:

```swift
let possiblePlanet = Planet(rawValue: 7)
// possiblePlanet is of type Planet? and equals Planet.uranus
```

<!--
  - test: `rawValues`

  ```swifttest
  -> let possiblePlanet = Planet(rawValue: 7)
  >> print(type(of: possiblePlanet))
  << Optional<Planet>
  >> assert(possiblePlanet == .uranus)
  // possiblePlanet is of type Planet? and equals Planet.uranus
  ```
-->

Not all possible `Int` values will find a matching planet, however.
Because of this, the raw value initializer always returns an *optional* enumeration case.
In the example above, `possiblePlanet` is of type `Planet?`,
or “optional `Planet`.”

> Note: The raw value initializer is a failable initializer,
> because not every raw value will return an enumeration case.
> For more information, see <doc:Declarations#Failable-Initializers>.

If you try to find a planet with a position of `11`,
the optional `Planet` value returned by the raw value initializer will be `nil`:

```swift
let positionToFind = 11
if let somePlanet = Planet(rawValue: positionToFind) {
    switch somePlanet {
    case .earth:
        print("Mostly harmless")
    default:
        print("Not a safe place for humans")
    }
} else {
    print("There isn't a planet at position \(positionToFind)")
}
// Prints "There isn't a planet at position 11".
```

<!--
  - test: `rawValues`

  ```swifttest
  -> let positionToFind = 11
  -> if let somePlanet = Planet(rawValue: positionToFind) {
        switch somePlanet {
           case .earth:
              print("Mostly harmless")
           default:
              print("Not a safe place for humans")
        }
     } else {
        print("There isn't a planet at position \(positionToFind)")
     }
  <- There isn't a planet at position 11
  ```
-->

This example uses optional binding to try to access a planet with a raw value of `11`.
The statement `if let somePlanet = Planet(rawValue: 11)` creates an optional `Planet`,
and sets `somePlanet` to the value of that optional `Planet` if it can be retrieved.
In this case, it isn't possible to retrieve a planet with a position of `11`,
and so the `else` branch is executed instead.

<!--
  TODO: Switch around the order of this chapter so that all of the non-union stuff
  is together, and the union bits (aka Associated Values) come last.
-->

## Recursive Enumerations

A *recursive enumeration* is an enumeration
that has another instance of the enumeration
as the associated value for one or more of the enumeration cases.
You indicate that an enumeration case is recursive
by writing `indirect` before it,
which tells the compiler to insert the necessary layer of indirection.

For example, here is an enumeration that stores simple arithmetic expressions:

```swift
enum ArithmeticExpression {
    case number(Int)
    indirect case addition(ArithmeticExpression, ArithmeticExpression)
    indirect case multiplication(ArithmeticExpression, ArithmeticExpression)
}
```

<!--
  - test: `recursive-enum-intro`

  ```swifttest
  -> enum ArithmeticExpression {
         case number(Int)
         indirect case addition(ArithmeticExpression, ArithmeticExpression)
         indirect case multiplication(ArithmeticExpression, ArithmeticExpression)
     }
  ```
-->

You can also write `indirect` before the beginning of the enumeration
to enable indirection for all of the enumeration's cases that have an associated value:

```swift
indirect enum ArithmeticExpression {
    case number(Int)
    case addition(ArithmeticExpression, ArithmeticExpression)
    case multiplication(ArithmeticExpression, ArithmeticExpression)
}
```

<!--
  - test: `recursive-enum`

  ```swifttest
  -> indirect enum ArithmeticExpression {
         case number(Int)
         case addition(ArithmeticExpression, ArithmeticExpression)
         case multiplication(ArithmeticExpression, ArithmeticExpression)
     }
  ```
-->

This enumeration can store three kinds of arithmetic expressions:
a plain number,
the addition of two expressions,
and the multiplication of two expressions.
The `addition` and `multiplication` cases have associated values
that are also arithmetic expressions ---
these associated values make it possible to nest expressions.
For example, the expression `(5 + 4) * 2`
has a number on the right-hand side of the multiplication
and another expression on the left-hand side of the multiplication.
Because the data is nested,
the enumeration used to store the data also needs to support nesting ---
this means the enumeration needs to be recursive.
The code below shows the `ArithmeticExpression` recursive enumeration
being created for `(5 + 4) * 2`:

```swift
let five = ArithmeticExpression.number(5)
let four = ArithmeticExpression.number(4)
let sum = ArithmeticExpression.addition(five, four)
let product = ArithmeticExpression.multiplication(sum, ArithmeticExpression.number(2))
```

<!--
  - test: `recursive-enum`

  ```swifttest
  -> let five = ArithmeticExpression.number(5)
  -> let four = ArithmeticExpression.number(4)
  -> let sum = ArithmeticExpression.addition(five, four)
  -> let product = ArithmeticExpression.multiplication(sum, ArithmeticExpression.number(2))
  ```
-->

A recursive function is a straightforward way
to work with data that has a recursive structure.
For example, here's a function that evaluates an arithmetic expression:

```swift
func evaluate(_ expression: ArithmeticExpression) -> Int {
    switch expression {
    case let .number(value):
        return value
    case let .addition(left, right):
        return evaluate(left) + evaluate(right)
    case let .multiplication(left, right):
        return evaluate(left) * evaluate(right)
    }
}

print(evaluate(product))
// Prints "18".
```

<!--
  - test: `recursive-enum`

  ```swifttest
  -> func evaluate(_ expression: ArithmeticExpression) -> Int {
         switch expression {
             case let .number(value):
                 return value
             case let .addition(left, right):
                 return evaluate(left) + evaluate(right)
             case let .multiplication(left, right):
                 return evaluate(left) * evaluate(right)
         }
     }

  -> print(evaluate(product))
  <- 18
  ```
-->

This function evaluates a plain number
by simply returning the associated value.
It evaluates an addition or multiplication
by evaluating the expression on the left-hand side,
evaluating the expression on the right-hand side,
and then adding them or multiplying them.

<!--
This source file is part of the Swift.org open source project

Copyright (c) 2014 - 2022 Apple Inc. and the Swift project authors
Licensed under Apache License v2.0 with Runtime Library Exception

See https://swift.org/LICENSE.txt for license information
See https://swift.org/CONTRIBUTORS.txt for the list of Swift project authors
-->
