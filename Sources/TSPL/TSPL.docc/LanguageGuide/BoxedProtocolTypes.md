# Boxed Protocol Types

XXX chapter abstract goes here

Using a protocol as a type is sometimes called an *existential type*,
which comes from the phrase
"there exists a type *T* such that *T* conforms to the protocol".

<!--

XXX OUTLINE

- explain how they are "boxed"
- introduce the "any" keyword
- revisit the list of where you can use existentials

-->

You can use a protocol in many places where other types are allowed, including:

- As a parameter type or return type in a function, method, or initializer
- As the type of a constant, variable, or property
- As the type of items in an array, dictionary, or other container

> Note: Because protocols are types,
> begin their names with a capital letter
> (such as `FullyNamed` and `RandomNumberGenerator`)
> to match the names of other types in Swift
> (such as `Int`, `String`, and `Double`).

Here's an example of a protocol used as a type:

```swift
class Dice {
   let sides: Int
   let generator: any RandomNumberGenerator
   init(sides: Int, generator: any RandomNumberGenerator) {
      self.sides = sides
      self.generator = generator
   }
   func roll() -> Int {
      return Int(generator.random() * Double(sides)) + 1
   }
}
```

<!--
  - test: `protocols`
  
  ```swifttest
  -> class Dice {
        let sides: Int
        let generator: any RandomNumberGenerator
        init(sides: Int, generator: any RandomNumberGenerator) {
           self.sides = sides
           self.generator = generator
        }
        func roll() -> Int {
           return Int(generator.random() * Double(sides)) + 1
        }
     }
  ```
-->

This example defines a new class called `Dice`,
which represents an *n*-sided dice for use in a board game.
`Dice` instances have an integer property called `sides`,
which represents how many sides they have,
and a property called `generator`,
which provides a random number generator
from which to create dice roll values.

The `generator` property is of type `RandomNumberGenerator`.
Therefore, you can set it to an instance of
*any* type that adopts the `RandomNumberGenerator` protocol.
Nothing else is required of the instance you assign to this property,
except that the instance must adopt the `RandomNumberGenerator` protocol.
Because its type is `RandomNumberGenerator`,
code inside the `Dice` class can only interact with `generator`
in ways that apply to all generators that conform to this protocol.
That means it can't use any methods or properties
that are defined by the underlying type of the generator.
However, you can downcast from a protocol type to an underlying type
in the same way you can downcast from a superclass to a subclass,
as discussed in <doc:TypeCasting#Downcasting>.

`Dice` also has an initializer, to set up its initial state.
This initializer has a parameter called `generator`,
which is also of type `RandomNumberGenerator`.
You can pass a value of any conforming type in to this parameter
when initializing a new `Dice` instance.

`Dice` provides one instance method, `roll`,
which returns an integer value between 1 and the number of sides on the dice.
This method calls the generator's `random()` method to create
a new random number between `0.0` and `1.0`,
and uses this random number to create a dice roll value within the correct range.
Because `generator` is known to adopt `RandomNumberGenerator`,
it's guaranteed to have a `random()` method to call.

Here's how the `Dice` class can be used to create a six-sided dice
with a `LinearCongruentialGenerator` instance as its random number generator:

```swift
var d6 = Dice(sides: 6, generator: LinearCongruentialGenerator())
for _ in 1...5 {
   print("Random dice roll is \(d6.roll())")
}
// Random dice roll is 3
// Random dice roll is 5
// Random dice roll is 4
// Random dice roll is 5
// Random dice roll is 4
```

<!--
  - test: `protocols`
  
  ```swifttest
  -> var d6 = Dice(sides: 6, generator: LinearCongruentialGenerator())
  -> for _ in 1...5 {
        print("Random dice roll is \(d6.roll())")
     }
  </ Random dice roll is 3
  </ Random dice roll is 5
  </ Random dice roll is 4
  </ Random dice roll is 5
  </ Random dice roll is 4
  ```
-->

