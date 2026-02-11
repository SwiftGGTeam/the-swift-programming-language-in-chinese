# Generics

Write code that works for multiple types and specify requirements for those types.

*Generic code* enables you to write flexible, reusable functions and types
that can work with any type, subject to requirements that you define.
You can write code that avoids duplication
and expresses its intent in a clear, abstracted manner.

Generics are one of the most powerful features of Swift,
and much of the Swift standard library is built with generic code.
In fact, you've been using generics throughout the *Language Guide*,
even if you didn't realize it.
For example, Swift's `Array` and `Dictionary` types
are both generic collections.
You can create an array that holds `Int` values,
or an array that holds `String` values,
or indeed an array for any other type that can be created in Swift.
Similarly, you can create a dictionary to store values of any specified type,
and there are no limitations on what that type can be.

## The Problem that Generics Solve

Here's a standard, nongeneric function called `swapTwoInts(_:_:)`,
which swaps two `Int` values:

```swift
func swapTwoInts(_ a: inout Int, _ b: inout Int) {
    let temporaryA = a
    a = b
    b = temporaryA
}
```

<!--
  - test: `whyGenerics`

  ```swifttest
  -> func swapTwoInts(_ a: inout Int, _ b: inout Int) {
        let temporaryA = a
        a = b
        b = temporaryA
     }
  ```
-->

This function makes use of in-out parameters to swap the values of `a` and `b`,
as described in <doc:Functions#In-Out-Parameters>.

The `swapTwoInts(_:_:)` function swaps the original value of `b` into `a`,
and the original value of `a` into `b`.
You can call this function to swap the values in two `Int` variables:

```swift
var someInt = 3
var anotherInt = 107
swapTwoInts(&someInt, &anotherInt)
print("someInt is now \(someInt), and anotherInt is now \(anotherInt)")
// Prints "someInt is now 107, and anotherInt is now 3".
```

<!--
  - test: `whyGenerics`

  ```swifttest
  -> var someInt = 3
  -> var anotherInt = 107
  -> swapTwoInts(&someInt, &anotherInt)
  -> print("someInt is now \(someInt), and anotherInt is now \(anotherInt)")
  <- someInt is now 107, and anotherInt is now 3
  ```
-->

The `swapTwoInts(_:_:)` function is useful, but it can only be used with `Int` values.
If you want to swap two `String` values,
or two `Double` values,
you have to write more functions,
such as the `swapTwoStrings(_:_:)` and `swapTwoDoubles(_:_:)` functions shown below:

```swift
func swapTwoStrings(_ a: inout String, _ b: inout String) {
    let temporaryA = a
    a = b
    b = temporaryA
}

func swapTwoDoubles(_ a: inout Double, _ b: inout Double) {
    let temporaryA = a
    a = b
    b = temporaryA
}
```

<!--
  - test: `whyGenerics`

  ```swifttest
  -> func swapTwoStrings(_ a: inout String, _ b: inout String) {
        let temporaryA = a
        a = b
        b = temporaryA
     }

  -> func swapTwoDoubles(_ a: inout Double, _ b: inout Double) {
        let temporaryA = a
        a = b
        b = temporaryA
     }
  ```
-->

You may have noticed that the bodies of
the `swapTwoInts(_:_:)`, `swapTwoStrings(_:_:)`, and `swapTwoDoubles(_:_:)` functions are identical.
The only difference is the type of the values that they accept
(`Int`, `String`, and `Double`).

It's more useful, and considerably more flexible,
to write a single function that swaps two values of *any* type.
Generic code enables you to write such a function.
(A generic version of these functions is defined below.)

> Note: In all three functions,
> the types of `a` and `b` must be the same.
> If `a` and `b` aren't of the same type,
> it isn't possible to swap their values.
> Swift is a type-safe language,
> and doesn't allow (for example) a variable of type `String`
> and a variable of type `Double`
> to swap values with each other.
> Attempting to do so results in a compile-time error.

## Generic Functions

*Generic functions* can work with any type.
Here's a generic version of the `swapTwoInts(_:_:)` function from above,
called `swapTwoValues(_:_:)`:

```swift
func swapTwoValues<T>(_ a: inout T, _ b: inout T) {
    let temporaryA = a
    a = b
    b = temporaryA
}
```

<!--
  - test: `genericFunctions`

  ```swifttest
  -> func swapTwoValues<T>(_ a: inout T, _ b: inout T) {
        let temporaryA = a
        a = b
        b = temporaryA
     }
  ```
-->

<!--
  This could be done in one line using a tuple pattern: (a, b) = (b, a)
  That's probably not as approachable here, and the novel syntax to avoid an
  explicit placeholder variable might distract from the discussion of
  generics.
-->

The body of the `swapTwoValues(_:_:)` function
is identical to the body of the `swapTwoInts(_:_:)` function.
However, the first line of `swapTwoValues(_:_:)`
is slightly different from `swapTwoInts(_:_:)`.
Here's how the first lines compare:

```swift
func swapTwoInts(_ a: inout Int, _ b: inout Int)
func swapTwoValues<T>(_ a: inout T, _ b: inout T)
```

<!--
  - test: `genericFunctionsComparison`

  ```swifttest
  -> func swapTwoInts(_ a: inout Int, _ b: inout Int)
  >> {
  >>    let temporaryA = a
  >>    a = b
  >>    b = temporaryA
  >> }
  -> func swapTwoValues<T>(_ a: inout T, _ b: inout T)
  >> {
  >>    let temporaryA = a
  >>    a = b
  >>    b = temporaryA
  >> }
  ```
-->

The generic version of the function
uses a *placeholder* type name (called `T`, in this case)
instead of an *actual* type name (such as `Int`, `String`, or `Double`).
The placeholder type name doesn't say anything about what `T` must be,
but it *does* say that both `a` and `b` must be of the same type `T`,
whatever `T` represents.
The actual type to use in place of `T`
is determined each time the `swapTwoValues(_:_:)` function is called.

The other difference between a generic function and a nongeneric function
is that the generic function's name (`swapTwoValues(_:_:)`)
is followed by the placeholder type name (`T`) inside angle brackets (`<T>`).
The brackets tell Swift that `T` is a placeholder type name
within the `swapTwoValues(_:_:)` function definition.
Because `T` is a placeholder, Swift doesn't look for an actual type called `T`.

The `swapTwoValues(_:_:)` function can now be called in the same way as `swapTwoInts`,
except that it can be passed two values of *any* type,
as long as both of those values are of the same type as each other.
Each time `swapTwoValues(_:_:)` is called,
the type to use for `T` is inferred from the types of values passed to the function.

In the two examples below, `T` is inferred to be `Int` and `String` respectively:

```swift
var someInt = 3
var anotherInt = 107
swapTwoValues(&someInt, &anotherInt)
// someInt is now 107, and anotherInt is now 3

var someString = "hello"
var anotherString = "world"
swapTwoValues(&someString, &anotherString)
// someString is now "world", and anotherString is now "hello"
```

<!--
  - test: `genericFunctions`

  ```swifttest
  -> var someInt = 3
  -> var anotherInt = 107
  -> swapTwoValues(&someInt, &anotherInt)
  /> someInt is now \(someInt), and anotherInt is now \(anotherInt)
  </ someInt is now 107, and anotherInt is now 3

  -> var someString = "hello"
  -> var anotherString = "world"
  -> swapTwoValues(&someString, &anotherString)
  /> someString is now \"\(someString)\", and anotherString is now \"\(anotherString)\"
  </ someString is now "world", and anotherString is now "hello"
  ```
-->

> Note: The `swapTwoValues(_:_:)` function defined above is inspired by
> a generic function called `swap`, which is part of the Swift standard library,
> and is automatically made available for you to use in your apps.
> If you need the behavior of the `swapTwoValues(_:_:)` function in your own code,
> you can use Swift's existing `swap(_:_:)` function rather than providing your own implementation.

## Type Parameters

In the `swapTwoValues(_:_:)` example above,
the placeholder type `T` is an example of a *type parameter*.
Type parameters specify and name a placeholder type,
and are written immediately after the function's name,
between a pair of matching angle brackets (such as `<T>`).

Once you specify a type parameter,
you can use it to define the type of a function's parameters
(such as the `a` and `b` parameters of the `swapTwoValues(_:_:)` function),
or as the function's return type,
or as a type annotation within the body of the function.
In each case, the type parameter
is replaced with an *actual* type whenever the function is called.
(In the `swapTwoValues(_:_:)` example above,
`T` was replaced with `Int` the first time the function was called,
and was replaced with `String` the second time it was called.)

You can provide more than one type parameter
by writing multiple type parameter names within the angle brackets,
separated by commas.

## Naming Type Parameters

In most cases, type parameters have descriptive names,
such as `Key` and `Value` in `Dictionary<Key, Value>`
and `Element` in `Array<Element>`,
which tells the reader about the relationship between the type parameter
and the generic type or function it's used in.
However, when there isn't a meaningful relationship between them,
it's traditional to name them using single letters such as `T`, `U`, and `V`,
such as `T` in the `swapTwoValues(_:_:)` function above.

Use upper camel case names for type parameters,
like `T` and `MyTypeParameter`,
to indicate that they're a placeholder for a *type*, not a value.

> Note:
> If you don't need to name a type parameter
> and its generic type constraints are simple,
> there's an alternate, lightweight syntax you can use instead,
> as described in <doc:OpaqueTypes#Opaque-Parameter-Types>.
<!--
Comparison between this syntax and the lightweight syntax
is in the Opaque Types chapter, not here ---
the reader hasn't learned about constraints yet,
so it wouldn't make sense to list what is/isn't supported.
-->

## Generic Types

In addition to generic functions,
Swift enables you to define your own *generic types*.
These are custom classes, structures, and enumerations
that can work with *any* type, in a similar way to `Array` and `Dictionary`.

This section shows you how to write a generic collection type called `Stack`.
A stack is an ordered set of values, similar to an array,
but with a more restricted set of operations than Swift's `Array` type.
An array allows new items to be inserted and removed at any location in the array.
A stack, however, allows new items to be appended only to the end of the collection
(known as *pushing* a new value on to the stack).
Similarly, a stack allows items to be removed only from the end of the collection
(known as *popping* a value off the stack).

> Note: The concept of a stack is used by the `UINavigationController` class
> to model the view controllers in its navigation hierarchy.
> You call the `UINavigationController` class
> `pushViewController(_:animated:)` method to add (or push)
> a view controller on to the navigation stack,
> and its `popViewControllerAnimated(_:)` method to remove (or pop)
> a view controller from the navigation stack.
> A stack is a useful collection model whenever you need a strict
> “last in, first out” approach to managing a collection.

The illustration below shows the push and pop behavior for a stack:

![](stackPushPop)

1. There are currently three values on the stack.
2. A fourth value is pushed onto the top of the stack.
3. The stack now holds four values, with the most recent one at the top.
4. The top item in the stack is popped.
5. After popping a value, the stack once again holds three values.

Here's how to write a nongeneric version of a stack,
in this case for a stack of `Int` values:

```swift
struct IntStack {
    var items: [Int] = []
    mutating func push(_ item: Int) {
        items.append(item)
    }
    mutating func pop() -> Int {
        return items.removeLast()
    }
}
```

<!--
  - test: `genericStack`

  ```swifttest
  -> struct IntStack {
        var items: [Int] = []
        mutating func push(_ item: Int) {
           items.append(item)
        }
        mutating func pop() -> Int {
           return items.removeLast()
        }
     }
  >> var intStack = IntStack()
  >> intStack.push(1)
  >> intStack.push(2)
  >> intStack.push(3)
  >> intStack.push(4)
  >> print("the stack now contains \(intStack.items.count) integers")
  << the stack now contains 4 integers
  ```
-->

This structure uses an `Array` property called `items` to store the values in the stack.
`Stack` provides two methods, `push` and `pop`,
to push and pop values on and off the stack.
These methods are marked as `mutating`,
because they need to modify (or *mutate*) the structure's `items` array.

The `IntStack` type shown above can only be used with `Int` values, however.
It would be much more useful to define a *generic* `Stack` structure,
that can manage a stack of *any* type of value.

Here's a generic version of the same code:

```swift
struct Stack<Element> {
    var items: [Element] = []
    mutating func push(_ item: Element) {
        items.append(item)
    }
    mutating func pop() -> Element {
        return items.removeLast()
    }
}
```

<!--
  - test: `genericStack`

  ```swifttest
  -> struct Stack<Element> {
        var items: [Element] = []
        mutating func push(_ item: Element) {
           items.append(item)
        }
        mutating func pop() -> Element {
           return items.removeLast()
        }
     }
  ```
-->

Note how the generic version of `Stack`
is essentially the same as the nongeneric version,
but with a type parameter called `Element`
instead of an actual type of `Int`.
This type parameter is written within a pair of angle brackets (`<Element>`)
immediately after the structure's name.

`Element` defines a placeholder name for
a type to be provided later.
This future type can be referred to as `Element`
anywhere within the structure's definition.
In this case, `Element` is used as a placeholder in three places:

- To create a property called `items`,
  which is initialized with an empty array of values of type `Element`
- To specify that the `push(_:)` method has a single parameter called `item`,
  which must be of type `Element`
- To specify that the value returned by the `pop()` method
  will be a value of type `Element`

Because it's a generic type,
`Stack` can be used to create a stack of *any* valid type in Swift,
in a similar manner to `Array` and `Dictionary`.

You create a new `Stack` instance by writing
the type to be stored in the stack within angle brackets.
For example, to create a new stack of strings,
you write `Stack<String>()`:

```swift
var stackOfStrings = Stack<String>()
stackOfStrings.push("uno")
stackOfStrings.push("dos")
stackOfStrings.push("tres")
stackOfStrings.push("cuatro")
// the stack now contains 4 strings
```

<!--
  - test: `genericStack`

  ```swifttest
  -> var stackOfStrings = Stack<String>()
  -> stackOfStrings.push("uno")
  -> stackOfStrings.push("dos")
  -> stackOfStrings.push("tres")
  -> stackOfStrings.push("cuatro")
  /> the stack now contains \(stackOfStrings.items.count) strings
  </ the stack now contains 4 strings
  ```
-->

Here's how `stackOfStrings` looks after pushing these four values on to the stack:

![](stackPushedFourStrings)

Popping a value from the stack removes and returns the top value, `"cuatro"`:

```swift
let fromTheTop = stackOfStrings.pop()
// fromTheTop is equal to "cuatro", and the stack now contains 3 strings
```

<!--
  - test: `genericStack`

  ```swifttest
  -> let fromTheTop = stackOfStrings.pop()
  /> fromTheTop is equal to \"\(fromTheTop)\", and the stack now contains \(stackOfStrings.items.count) strings
  </ fromTheTop is equal to "cuatro", and the stack now contains 3 strings
  ```
-->

Here's how the stack looks after popping its top value:

![](stackPoppedOneString)

## Extending a Generic Type

When you extend a generic type,
you don't provide a type parameter list as part of the extension's definition.
Instead, the type parameter list from the *original* type definition
is available within the body of the extension,
and the original type parameter names are used to refer to
the type parameters from the original definition.

The following example extends the generic `Stack` type to add
a read-only computed property called `topItem`,
which returns the top item on the stack without popping it from the stack:

```swift
extension Stack {
    var topItem: Element? {
        return items.isEmpty ? nil : items[items.count - 1]
    }
}
```

<!--
  - test: `genericStack`

  ```swifttest
  -> extension Stack {
        var topItem: Element? {
           return items.isEmpty ? nil : items[items.count - 1]
        }
     }
  ```
-->

The `topItem` property returns an optional value of type `Element`.
If the stack is empty, `topItem` returns `nil`;
if the stack isn't empty, `topItem` returns the final item in the `items` array.

Note that this extension doesn't define a type parameter list.
Instead, the `Stack` type's existing type parameter name, `Element`,
is used within the extension to indicate the optional type of
the `topItem` computed property.

The `topItem` computed property can now be used with any `Stack` instance
to access and query its top item without removing it.

```swift
if let topItem = stackOfStrings.topItem {
    print("The top item on the stack is \(topItem).")
}
// Prints "The top item on the stack is tres."
```

<!--
  - test: `genericStack`

  ```swifttest
  -> if let topItem = stackOfStrings.topItem {
        print("The top item on the stack is \(topItem).")
     }
  <- The top item on the stack is tres.
  ```
-->

Extensions of a generic type can also include requirements
that instances of the extended type must satisfy
in order to gain the new functionality,
as discussed in <doc:Generics#Extensions-with-a-Generic-Where-Clause> below.

## Type Constraints

The `swapTwoValues(_:_:)` function and the `Stack` type can work with any type.
However, it's sometimes useful to enforce
certain *type constraints* on the types that can be used with
generic functions and generic types.
Type constraints specify that a type parameter must
inherit from a specific class,
or conform to a particular protocol or protocol composition.

For example,
Swift's `Dictionary` type places a limitation on
the types that can be used as keys for a dictionary.
As described in <doc:CollectionTypes#Dictionaries>,
the type of a dictionary's keys must be *hashable*.
That is, it must provide a way to make itself uniquely representable.
`Dictionary` needs its keys to be hashable so that it can
check whether it already contains a value for a particular key.
Without this requirement, `Dictionary` couldn't tell
whether it should insert or replace a value for a particular key,
nor would it be able to find a value for a given key that's already in the dictionary.

This requirement is enforced by a type constraint on the key type for `Dictionary`,
which specifies that the key type must conform to the `Hashable` protocol,
a special protocol defined in the Swift standard library.
All of Swift's basic types (such as `String`, `Int`, `Double`, and `Bool`)
are hashable by default.
For information about
making your own custom types conform to the `Hashable` protocol,
see [Conforming to the Hashable Protocol](https://developer.apple.com/documentation/swift/hashable#2849490).

You can define your own type constraints when creating custom generic types,
and these constraints provide much of the power of generic programming.
Abstract concepts like `Hashable`
characterize types in terms of their conceptual characteristics,
rather than their concrete type.

### Type Constraint Syntax

You write type constraints by placing a single class or protocol constraint
after a type parameter's name, separated by a colon,
as part of the type parameter list.
The basic syntax for type constraints on a generic function is shown below
(although the syntax is the same for generic types):

```swift
func someFunction<T: SomeClass, U: SomeProtocol>(someT: T, someU: U) {
    // function body goes here
}
```

<!--
  - test: `typeConstraints`

  ```swifttest
  >> class SomeClass {}
  >> protocol SomeProtocol {}
  -> func someFunction<T: SomeClass, U: SomeProtocol>(someT: T, someU: U) {
        // function body goes here
     }
  ```
-->

The hypothetical function above has two type parameters.
The first type parameter, `T`, has a type constraint
that requires `T` to be a subclass of `SomeClass`.
The second type parameter, `U`, has a type constraint
that requires `U` to conform to the protocol `SomeProtocol`.

### Type Constraints in Action

Here's a nongeneric function called `findIndex(ofString:in:)`,
which is given a `String` value to find
and an array of `String` values within which to find it.
The `findIndex(ofString:in:)` function returns an optional `Int` value,
which will be the index of the first matching string in the array if it's found,
or `nil` if the string can't be found:

```swift
func findIndex(ofString valueToFind: String, in array: [String]) -> Int? {
    for (index, value) in array.enumerated() {
        if value == valueToFind {
            return index
        }
    }
    return nil
}
```

<!--
  - test: `typeConstraints`

  ```swifttest
  -> func findIndex(ofString valueToFind: String, in array: [String]) -> Int? {
        for (index, value) in array.enumerated() {
           if value == valueToFind {
              return index
           }
        }
        return nil
     }
  ```
-->

The `findIndex(ofString:in:)` function can be used to find a string value in an array of strings:

```swift
let strings = ["cat", "dog", "llama", "parakeet", "terrapin"]
if let foundIndex = findIndex(ofString: "llama", in: strings) {
    print("The index of llama is \(foundIndex)")
}
// Prints "The index of llama is 2".
```

<!--
  - test: `typeConstraints`

  ```swifttest
  -> let strings = ["cat", "dog", "llama", "parakeet", "terrapin"]
  -> if let foundIndex = findIndex(ofString: "llama", in: strings) {
        print("The index of llama is \(foundIndex)")
     }
  <- The index of llama is 2
  ```
-->

The principle of finding the index of a value in an array isn't useful only for strings, however.
You can write the same functionality as a generic function
by replacing any mention of strings with values of some type `T` instead.

Here's how you might expect a generic version of `findIndex(ofString:in:)`,
called `findIndex(of:in:)`, to be written.
Note that the return type of this function is still `Int?`,
because the function returns an optional index number,
not an optional value from the array.
Be warned, though --- this function doesn't compile,
for reasons explained after the example:

```swift
func findIndex<T>(of valueToFind: T, in array:[T]) -> Int? {
    for (index, value) in array.enumerated() {
        if value == valueToFind {
            return index
        }
    }
    return nil
}
```

<!--
  - test: `typeConstraints-err`

  ```swifttest
  -> func findIndex<T>(of valueToFind: T, in array:[T]) -> Int? {
        for (index, value) in array.enumerated() {
           if value == valueToFind {
              return index
           }
        }
        return nil
     }
  !$ error: binary operator '==' cannot be applied to two 'T' operands
  !!       if value == valueToFind {
  !!          ~~~~~ ^  ~~~~~~~~~~~
  ```
-->

This function doesn't compile as written above.
The problem lies with the equality check, “`if value == valueToFind`”.
Not every type in Swift can be compared with the equal to operator (`==`).
If you create your own class or structure to represent a complex data model, for example,
then the meaning of “equal to” for that class or structure
isn't something that Swift can guess for you.
Because of this, it isn't possible to guarantee that this code will work
for *every* possible type `T`,
and an appropriate error is reported when you try to compile the code.

All is not lost, however.
The Swift standard library defines a protocol called `Equatable`,
which requires any conforming type to implement
the equal to operator (`==`) and the not equal to operator (`!=`)
to compare any two values of that type.
All of Swift's standard types automatically support the `Equatable` protocol.

<!--
  TODO: write about how to make your own types conform to Equatable
  once we have some documentation that actually describes it.
  The text to use is something like:
  and you can make your own types conform to ``Equatable`` too,
  as described in <link>.
-->

Any type that's `Equatable` can be used safely with the `findIndex(of:in:)` function,
because it's guaranteed to support the equal to operator.
To express this fact, you write a type constraint of `Equatable`
as part of the type parameter's definition when you define the function:

```swift
func findIndex<T: Equatable>(of valueToFind: T, in array:[T]) -> Int? {
    for (index, value) in array.enumerated() {
        if value == valueToFind {
            return index
        }
    }
    return nil
}
```

<!--
  - test: `typeConstraintsEquatable`

  ```swifttest
  -> func findIndex<T: Equatable>(of valueToFind: T, in array:[T]) -> Int? {
        for (index, value) in array.enumerated() {
           if value == valueToFind {
              return index
           }
        }
        return nil
     }
  ```
-->

The single type parameter for `findIndex(of:in:)` is written as `T: Equatable`,
which means “any type `T` that conforms to the `Equatable` protocol.”

The `findIndex(of:in:)` function now compiles successfully
and can be used with any type that's `Equatable`, such as `Double` or `String`:

```swift
let doubleIndex = findIndex(of: 9.3, in: [3.14159, 0.1, 0.25])
// doubleIndex is an optional Int with no value, because 9.3 isn't in the array
let stringIndex = findIndex(of: "Andrea", in: ["Mike", "Malcolm", "Andrea"])
// stringIndex is an optional Int containing a value of 2
```

<!--
  - test: `typeConstraintsEquatable`

  ```swifttest
  -> let doubleIndex = findIndex(of: 9.3, in: [3.14159, 0.1, 0.25])
  /> doubleIndex is an optional Int with no value, because 9.3 isn't in the array
  </ doubleIndex is an optional Int with no value, because 9.3 isn't in the array
  -> let stringIndex = findIndex(of: "Andrea", in: ["Mike", "Malcolm", "Andrea"])
  /> stringIndex is an optional Int containing a value of \(stringIndex!)
  </ stringIndex is an optional Int containing a value of 2
  ```
-->

<!--
  TODO: providing different type parameters on individual methods within a generic type
-->

<!--
  TODO: likewise providing type parameters for initializers
-->

## Associated Types

When defining a protocol,
it's sometimes useful to declare one or more associated types
as part of the protocol's definition.
An *associated type* gives a placeholder name
to a type that's used as part of the protocol.
The actual type to use for that associated type
isn't specified until the protocol is adopted.
Associated types are specified with the `associatedtype` keyword.

### Associated Types in Action

Here's an example of a protocol called `Container`,
which declares an associated type called `Item`:

```swift
protocol Container {
    associatedtype Item
    mutating func append(_ item: Item)
    var count: Int { get }
    subscript(i: Int) -> Item { get }
}
```

<!--
  - test: `associatedTypes, associatedTypes-err`

  ```swifttest
  -> protocol Container {
        associatedtype Item
        mutating func append(_ item: Item)
        var count: Int { get }
        subscript(i: Int) -> Item { get }
     }
  ```
-->

The `Container` protocol defines three required capabilities
that any container must provide:

- It must be possible to add a new item to the container with an `append(_:)` method.
- It must be possible to access a count of the items in the container
  through a `count` property that returns an `Int` value.
- It must be possible to retrieve each item in the container with a subscript
  that takes an `Int` index value.

This protocol doesn't specify how the items in the container should be stored
or what type they're allowed to be.
The protocol only specifies the three bits of functionality
that any type must provide in order to be considered a `Container`.
A conforming type can provide additional functionality,
as long as it satisfies these three requirements.

Any type that conforms to the `Container` protocol must be able to specify
the type of values it stores.
Specifically, it must ensure that only items of the right type
are added to the container,
and it must be clear about the type of the items returned by its subscript.

To define these requirements,
the `Container` protocol needs a way to refer to
the type of the elements that a container will hold,
without knowing what that type is for a specific container.
The `Container` protocol needs to specify that
any value passed to the `append(_:)` method
must have the same type as the container's element type,
and that the value returned by the container's subscript
will be of the same type as the container's element type.

To achieve this,
the `Container` protocol declares an associated type called `Item`,
written as  `associatedtype Item`.
The protocol doesn't define what `Item` is ---
that information is left for any conforming type to provide.
Nonetheless, the `Item` alias provides a way to refer to
the type of the items in a `Container`,
and to define a type for use with the `append(_:)` method and subscript,
to ensure that the expected behavior of any `Container` is enforced.

Here's a version of the nongeneric `IntStack` type
from <doc:Generics#Generic-Types> above,
adapted to conform to the `Container` protocol:

```swift
struct IntStack: Container {
    // original IntStack implementation
    var items: [Int] = []
    mutating func push(_ item: Int) {
        items.append(item)
    }
    mutating func pop() -> Int {
        return items.removeLast()
    }
    // conformance to the Container protocol
    typealias Item = Int
    mutating func append(_ item: Int) {
        self.push(item)
    }
    var count: Int {
        return items.count
    }
    subscript(i: Int) -> Int {
        return items[i]
    }
}
```

<!--
  - test: `associatedTypes`

  ```swifttest
  -> struct IntStack: Container {
        // original IntStack implementation
        var items: [Int] = []
        mutating func push(_ item: Int) {
           items.append(item)
        }
        mutating func pop() -> Int {
           return items.removeLast()
        }
        // conformance to the Container protocol
        typealias Item = Int
        mutating func append(_ item: Int) {
           self.push(item)
        }
        var count: Int {
           return items.count
        }
        subscript(i: Int) -> Int {
           return items[i]
        }
     }
  ```
-->

The `IntStack` type implements all three of the `Container` protocol's requirements,
and in each case wraps part of the `IntStack` type's existing functionality
to satisfy these requirements.

Moreover, `IntStack` specifies that for this implementation of `Container`,
the appropriate `Item` to use is a type of `Int`.
The definition of `typealias Item = Int` turns the abstract type of `Item`
into a concrete type of `Int` for this implementation of the `Container` protocol.

Thanks to Swift's type inference,
you don't actually need to declare a concrete `Item` of `Int`
as part of the definition of `IntStack`.
Because `IntStack` conforms to all of the requirements of the `Container` protocol,
Swift can infer the appropriate `Item` to use,
simply by looking at the type of the `append(_:)` method's `item` parameter
and the return type of the subscript.
Indeed, if you delete the `typealias Item = Int` line from the code above,
everything still works, because it's clear what type should be used for `Item`.

You can also make the generic `Stack` type conform to the `Container` protocol:

```swift
struct Stack<Element>: Container {
    // original Stack<Element> implementation
    var items: [Element] = []
    mutating func push(_ item: Element) {
        items.append(item)
    }
    mutating func pop() -> Element {
        return items.removeLast()
    }
    // conformance to the Container protocol
    mutating func append(_ item: Element) {
        self.push(item)
    }
    var count: Int {
        return items.count
    }
    subscript(i: Int) -> Element {
        return items[i]
    }
}
```

<!--
  - test: `associatedTypes, associatedTypes-err`

  ```swifttest
  -> struct Stack<Element>: Container {
        // original Stack<Element> implementation
        var items: [Element] = []
        mutating func push(_ item: Element) {
           items.append(item)
        }
        mutating func pop() -> Element {
           return items.removeLast()
        }
        // conformance to the Container protocol
        mutating func append(_ item: Element) {
           self.push(item)
        }
        var count: Int {
           return items.count
        }
        subscript(i: Int) -> Element {
           return items[i]
        }
     }
  ```
-->

This time, the type parameter `Element` is used as
the type of the `append(_:)` method's `item` parameter
and the return type of the subscript.
Swift can therefore infer that `Element` is the appropriate type to use
as the `Item` for this particular container.

### Extending an Existing Type to Specify an Associated Type

You can extend an existing type to add conformance to a protocol,
as described in <doc:Protocols#Adding-Protocol-Conformance-with-an-Extension>.
This includes a protocol with an associated type.

Swift's `Array` type already provides an `append(_:)` method,
a `count` property, and a subscript with an `Int` index to retrieve its elements.
These three capabilities match the requirements of the `Container` protocol.
This means that you can extend `Array` to conform to the `Container` protocol
simply by declaring that `Array` adopts the protocol.
You do this with an empty extension,
as described in <doc:Protocols#Declaring-Protocol-Adoption-with-an-Extension>:

```swift
extension Array: Container {}
```

<!--
  - test: `associatedTypes`

  ```swifttest
  -> extension Array: Container {}
  ```
-->

Array's existing `append(_:)` method and subscript enable Swift to infer
the appropriate type to use for `Item`,
just as for the generic `Stack` type above.
After defining this extension, you can use any `Array` as a `Container`.

### Adding Constraints to an Associated Type

You can add type constraints to an associated type in a protocol
to require that conforming types satisfy those constraints.
For example,
the following code defines a version of `Container`
that requires the items in the container to be equatable.

```swift
protocol Container {
    associatedtype Item: Equatable
    mutating func append(_ item: Item)
    var count: Int { get }
    subscript(i: Int) -> Item { get }
}
```

<!--
  - test: `associatedTypes-equatable`

  ```swifttest
  -> protocol Container {
        associatedtype Item: Equatable
        mutating func append(_ item: Item)
        var count: Int { get }
        subscript(i: Int) -> Item { get }
     }
  ```
-->

To conform to this version of `Container`,
the container's `Item` type has to conform to the `Equatable` protocol.

### Using a Protocol in Its Associated Type's Constraints

A protocol can appear as part of its own requirements.
For example,
here's a protocol that refines the `Container` protocol,
adding the requirement of a `suffix(_:)` method.
The `suffix(_:)` method
returns a given number of elements from the end of the container,
storing them in an instance of the `Suffix` type.

```swift
protocol SuffixableContainer: Container {
    associatedtype Suffix: SuffixableContainer where Suffix.Item == Item
    func suffix(_ size: Int) -> Suffix
}
```

<!--
  - test: `associatedTypes`

  ```swifttest
  -> protocol SuffixableContainer: Container {
         associatedtype Suffix: SuffixableContainer where Suffix.Item == Item
         func suffix(_ size: Int) -> Suffix
     }
  ```
-->

In this protocol,
`Suffix` is an associated type,
like the `Item` type in the `Container` example above.
`Suffix` has two constraints:
It must conform to the `SuffixableContainer` protocol
(the protocol currently being defined),
and its `Item` type must be the same
as the container's `Item` type.
The constraint on `Item` is a generic `where` clause,
which is discussed in <doc:Generics#Associated-Types-with-a-Generic-Where-Clause> below.

Here's an extension of the `Stack` type
from <doc:Generics#Generic-Types> above
that adds conformance to the `SuffixableContainer` protocol:

```swift
extension Stack: SuffixableContainer {
    func suffix(_ size: Int) -> Stack {
        var result = Stack()
        for index in (count-size)..<count {
            result.append(self[index])
        }
        return result
    }
    // Inferred that Suffix is Stack.
}
var stackOfInts = Stack<Int>()
stackOfInts.append(10)
stackOfInts.append(20)
stackOfInts.append(30)
let suffix = stackOfInts.suffix(2)
// suffix contains 20 and 30
```

<!--
  - test: `associatedTypes`

  ```swifttest
  -> extension Stack: SuffixableContainer {
         func suffix(_ size: Int) -> Stack {
             var result = Stack()
             for index in (count-size)..<count {
                 result.append(self[index])
             }
             return result
         }
         // Inferred that Suffix is Stack.
     }
  -> var stackOfInts = Stack<Int>()
  -> stackOfInts.append(10)
  -> stackOfInts.append(20)
  -> stackOfInts.append(30)
  >> assert(stackOfInts.suffix(0).items == [])
  -> let suffix = stackOfInts.suffix(2)
  // suffix contains 20 and 30
  >> assert(suffix.items == [20, 30])
  ```
-->

In the example above,
the `Suffix` associated type for `Stack` is also `Stack`,
so the suffix operation on `Stack` returns another `Stack`.
Alternatively,
a type that conforms to `SuffixableContainer`
can have a `Suffix` type that's different from itself ---
meaning the suffix operation can return a different type.
For example,
here's an extension to the nongeneric `IntStack` type
that adds `SuffixableContainer` conformance,
using `Stack<Int>` as its suffix type instead of `IntStack`:

```swift
extension IntStack: SuffixableContainer {
    func suffix(_ size: Int) -> Stack<Int> {
        var result = Stack<Int>()
        for index in (count-size)..<count {
            result.append(self[index])
        }
        return result
    }
    // Inferred that Suffix is Stack<Int>.
}
```

<!--
  - test: `associatedTypes`

  ```swifttest
  -> extension IntStack: SuffixableContainer {
         func suffix(_ size: Int) -> Stack<Int> {
             var result = Stack<Int>()
             for index in (count-size)..<count {
                 result.append(self[index])
             }
             return result
         }
         // Inferred that Suffix is Stack<Int>.
     }
  >> var intStack = IntStack()
  >> intStack.append(10)
  >> intStack.append(20)
  >> intStack.append(30)
  >> assert(intStack.suffix(0).items == [])
  >> assert(intStack.suffix(2).items == [20, 30])
  ```
-->

## Generic Where Clauses

Type constraints, as described in <doc:Generics#Type-Constraints>,
enable you to define requirements on the type parameters associated with
a generic function, subscript, or type.

It can also be useful to define requirements for associated types.
You do this by defining a *generic where clause*.
A generic `where` clause enables you to require that
an associated type must conform to a certain protocol,
or that certain type parameters and associated types must be the same.
A generic `where` clause starts with the `where` keyword,
followed by constraints for associated types
or equality relationships between types and associated types.
You write a generic `where` clause right before the opening curly brace
of a type or function's body.

The example below defines a generic function called `allItemsMatch`,
which checks to see if two `Container` instances contain
the same items in the same order.
The function returns a Boolean value of `true` if all items match
and a value of `false` if they don't.

The two containers to be checked don't have to be
the same type of container (although they can be),
but they do have to hold the same type of items.
This requirement is expressed through a combination of type constraints
and a generic `where` clause:

```swift
func allItemsMatch<C1: Container, C2: Container>
        (_ someContainer: C1, _ anotherContainer: C2) -> Bool
        where C1.Item == C2.Item, C1.Item: Equatable {

    // Check that both containers contain the same number of items.
    if someContainer.count != anotherContainer.count {
        return false
    }

    // Check each pair of items to see if they're equivalent.
    for i in 0..<someContainer.count {
        if someContainer[i] != anotherContainer[i] {
            return false
        }
    }

    // All items match, so return true.
    return true
}
```

<!--
  - test: `associatedTypes`

  ```swifttest
  -> func allItemsMatch<C1: Container, C2: Container>
           (_ someContainer: C1, _ anotherContainer: C2) -> Bool
           where C1.Item == C2.Item, C1.Item: Equatable {

        // Check that both containers contain the same number of items.
        if someContainer.count != anotherContainer.count {
           return false
        }

        // Check each pair of items to see if they're equivalent.
        for i in 0..<someContainer.count {
           if someContainer[i] != anotherContainer[i] {
              return false
           }
        }

        // All items match, so return true.
        return true
     }
  ```
-->

This function takes two arguments called
`someContainer` and `anotherContainer`.
The `someContainer` argument is of type `C1`,
and the `anotherContainer` argument is of type `C2`.
Both `C1` and `C2` are type parameters
for two container types to be determined when the function is called.

The following requirements are placed on the function's two type parameters:

- `C1` must conform to the `Container` protocol (written as `C1: Container`).
- `C2` must also conform to the `Container` protocol (written as `C2: Container`).
- The `Item` for `C1` must be the same as the `Item` for `C2`
  (written as `C1.Item == C2.Item`).
- The `Item` for `C1` must conform to the `Equatable` protocol
  (written as `C1.Item: Equatable`).

The first and second requirements are defined in the function's type parameter list,
and the third and fourth requirements are defined in the function's generic `where` clause.

These requirements mean:

- `someContainer` is a container of type `C1`.
- `anotherContainer` is a container of type `C2`.
- `someContainer` and `anotherContainer` contain the same type of items.
- The items in `someContainer` can be checked with the not equal operator (`!=`)
  to see if they're different from each other.

The third and fourth requirements combine to mean that
the items in `anotherContainer` can *also* be checked with the `!=` operator,
because they're exactly the same type as the items in `someContainer`.

These requirements enable the `allItemsMatch(_:_:)` function to compare the two containers,
even if they're of a different container type.

The `allItemsMatch(_:_:)` function starts by checking that
both containers contain the same number of items.
If they contain a different number of items, there's no way that they can match,
and the function returns `false`.

After making this check, the function iterates over all of the items in `someContainer`
with a `for`-`in` loop and the half-open range operator (`..<`).
For each item, the function checks whether the item from `someContainer` isn't equal to
the corresponding item in `anotherContainer`.
If the two items aren't equal, then the two containers don't match,
and the function returns `false`.

If the loop finishes without finding a mismatch,
the two containers match, and the function returns `true`.

Here's how the `allItemsMatch(_:_:)` function looks in action:

```swift
var stackOfStrings = Stack<String>()
stackOfStrings.push("uno")
stackOfStrings.push("dos")
stackOfStrings.push("tres")

var arrayOfStrings = ["uno", "dos", "tres"]

if allItemsMatch(stackOfStrings, arrayOfStrings) {
    print("All items match.")
} else {
    print("Not all items match.")
}
// Prints "All items match."
```

<!--
  - test: `associatedTypes`

  ```swifttest
  -> var stackOfStrings = Stack<String>()
  -> stackOfStrings.push("uno")
  -> stackOfStrings.push("dos")
  -> stackOfStrings.push("tres")

  -> var arrayOfStrings = ["uno", "dos", "tres"]

  -> if allItemsMatch(stackOfStrings, arrayOfStrings) {
        print("All items match.")
     } else {
        print("Not all items match.")
     }
  <- All items match.
  ```
-->

The example above creates a `Stack` instance to store `String` values,
and pushes three strings onto the stack.
The example also creates an `Array` instance initialized with
an array literal containing the same three strings as the stack.
Even though the stack and the array are of a different type,
they both conform to the `Container` protocol,
and both contain the same type of values.
You can therefore call the `allItemsMatch(_:_:)` function
with these two containers as its arguments.
In the example above, the `allItemsMatch(_:_:)` function correctly reports that
all of the items in the two containers match.

## Extensions with a Generic Where Clause

You can also use a generic `where` clause as part of an extension.
The example below
extends the generic `Stack` structure from the previous examples
to add an `isTop(_:)` method.

```swift
extension Stack where Element: Equatable {
    func isTop(_ item: Element) -> Bool {
        guard let topItem = items.last else {
            return false
        }
        return topItem == item
    }
}
```

<!--
  - test: `associatedTypes`

  ```swifttest
  -> extension Stack where Element: Equatable {
         func isTop(_ item: Element) -> Bool {
             guard let topItem = items.last else {
                 return false
             }
             return topItem == item
         }
     }
  ```
-->

This new `isTop(_:)` method
first checks that the stack isn't empty,
and then compares the given item
against the stack's topmost item.
If you tried to do this without a generic `where` clause,
you would have a problem:
The implementation of `isTop(_:)` uses the `==` operator,
but the definition of `Stack` doesn't require
its items to be equatable,
so using the `==` operator results in a compile-time error.
Using a generic `where` clause
lets you add a new requirement to the extension,
so that the extension adds the `isTop(_:)` method
only when the items in the stack are equatable.

Here's how the `isTop(_:)` method looks in action:

```swift
if stackOfStrings.isTop("tres") {
    print("Top element is tres.")
} else {
    print("Top element is something else.")
}
// Prints "Top element is tres."
```

<!--
  - test: `associatedTypes`

  ```swifttest
  -> if stackOfStrings.isTop("tres") {
        print("Top element is tres.")
     } else {
        print("Top element is something else.")
     }
  <- Top element is tres.
  ```
-->

If you try to call the `isTop(_:)` method
on a stack whose elements aren't equatable,
you'll get a compile-time error.

```swift
struct NotEquatable { }
var notEquatableStack = Stack<NotEquatable>()
let notEquatableValue = NotEquatable()
notEquatableStack.push(notEquatableValue)
notEquatableStack.isTop(notEquatableValue)  // Error
```

<!--
  - test: `associatedTypes-err`

  ```swifttest
  -> struct NotEquatable { }
  -> var notEquatableStack = Stack<NotEquatable>()
  -> let notEquatableValue = NotEquatable()
  -> notEquatableStack.push(notEquatableValue)
  -> notEquatableStack.isTop(notEquatableValue)  // Error
  !$ error: value of type 'Stack<NotEquatable>' has no member 'isTop'
  !! notEquatableStack.isTop(notEquatableValue)  // Error
  !! ~~~~~~~~~~~~~~~~~ ^~~~~
  ```
-->

You can use a generic `where` clause with extensions to a protocol.
The example below extends the `Container` protocol from the previous examples
to add a `startsWith(_:)` method.

```swift
extension Container where Item: Equatable {
    func startsWith(_ item: Item) -> Bool {
        return count >= 1 && self[0] == item
    }
}
```

<!--
  - test: `associatedTypes`

  ```swifttest
  -> extension Container where Item: Equatable {
        func startsWith(_ item: Item) -> Bool {
           return count >= 1 && self[0] == item
        }
     }
  ```
-->

<!--
  Using Container rather than Sequence/Collection
  to continue running with the same example through the chapter.
  This does, however, mean I can't use a for-in loop.
-->

The `startsWith(_:)` method
first makes sure that the container has at least one item,
and then it checks
whether the first item in the container matches the given item.
This new `startsWith(_:)` method
can be used with any type that conforms to the `Container` protocol,
including the stacks and arrays used above,
as long as the container's items are equatable.

```swift
if [9, 9, 9].startsWith(42) {
    print("Starts with 42.")
} else {
    print("Starts with something else.")
}
// Prints "Starts with something else."
```

<!--
  - test: `associatedTypes`

  ```swifttest
  -> if [9, 9, 9].startsWith(42) {
        print("Starts with 42.")
     } else {
        print("Starts with something else.")
     }
  <- Starts with something else.
  ```
-->

The generic `where` clause in the example above
requires `Item` to conform to a protocol,
but you can also write a generic `where` clauses that require `Item`
to be a specific type.
For example:

```swift
extension Container where Item == Double {
    func average() -> Double {
        var sum = 0.0
        for index in 0..<count {
            sum += self[index]
        }
        return sum / Double(count)
    }
}
print([1260.0, 1200.0, 98.6, 37.0].average())
// Prints "648.9".
```

<!--
  - test: `associatedTypes`

  ```swifttest
  -> extension Container where Item == Double {
         func average() -> Double {
             var sum = 0.0
             for index in 0..<count {
                 sum += self[index]
             }
             return sum / Double(count)
         }
     }
  -> print([1260.0, 1200.0, 98.6, 37.0].average())
  <- 648.9
  ```
-->

This example adds an `average()` method
to containers whose `Item` type is `Double`.
It iterates over the items in the container to add them up,
and divides by the container's count to compute the average.
It explicitly converts the count from `Int` to `Double`
to be able to do floating-point division.

You can include multiple requirements in a generic `where` clause
that's part of an extension,
just like you can for a generic `where` clause that you write elsewhere.
Separate each requirement in the list with a comma.

<!--
  No example of a compound where clause
  because Container only has one generic part ---
  there isn't anything to write a second constraint for.
-->

## Contextual Where Clauses

You can write a generic `where` clause
as part of a declaration that doesn't have its own generic type constraints,
when you're already working in the context of generic types.
For example,
you can write a generic `where` clause
on a subscript of a generic type
or on a method in an extension to a generic type.
The `Container` structure is generic,
and the `where` clauses in the example below
specify what type constraints have to be satisfied
to make these new  methods available on a container.

```swift
extension Container {
    func average() -> Double where Item == Int {
        var sum = 0.0
        for index in 0..<count {
            sum += Double(self[index])
        }
        return sum / Double(count)
    }
    func endsWith(_ item: Item) -> Bool where Item: Equatable {
        return count >= 1 && self[count-1] == item
    }
}
let numbers = [1260, 1200, 98, 37]
print(numbers.average())
// Prints "648.75".
print(numbers.endsWith(37))
// Prints "true".
```

<!--
  - test: `associatedTypes`

  ```swifttest
  -> extension Container {
         func average() -> Double where Item == Int {
             var sum = 0.0
             for index in 0..<count {
                 sum += Double(self[index])
             }
             return sum / Double(count)
         }
         func endsWith(_ item: Item) -> Bool where Item: Equatable {
             return count >= 1 && self[count-1] == item
         }
     }
  -> let numbers = [1260, 1200, 98, 37]
  -> print(numbers.average())
  <- 648.75
  -> print(numbers.endsWith(37))
  <- true
  ```
-->

This example
adds an `average()` method to `Container` when the items are integers,
and it adds an `endsWith(_:)` method when the items are equatable.
Both functions include a generic `where` clause
that adds type constraints to the generic `Item` type parameter
from the original declaration of `Container`.

If you want to write this code without using contextual `where` clauses,
you write two extensions,
one for each generic `where` clause.
The example above and the example below have the same behavior.

```swift
extension Container where Item == Int {
    func average() -> Double {
        var sum = 0.0
        for index in 0..<count {
            sum += Double(self[index])
        }
        return sum / Double(count)
    }
}
extension Container where Item: Equatable {
    func endsWith(_ item: Item) -> Bool {
        return count >= 1 && self[count-1] == item
    }
}
```

<!--
  - test: `associatedTypes-err`

  ```swifttest
  -> extension Container where Item == Int {
         func average() -> Double {
             var sum = 0.0
             for index in 0..<count {
                 sum += Double(self[index])
             }
             return sum / Double(count)
         }
     }
     extension Container where Item: Equatable {
         func endsWith(_ item: Item) -> Bool {
             return count >= 1 && self[count-1] == item
         }
     }
  ```
-->

In the version of this example that uses contextual `where` clauses,
the implementation of `average()` and `endsWith(_:)`
are both in the same extension
because each method's generic `where` clause
states the requirements that need to be satisfied
to make that method available.
Moving those requirements to the extensions' generic `where` clauses
makes the methods available in the same situations,
but requires one extension per requirement.

## Associated Types with a Generic Where Clause

You can include a generic `where` clause on an associated type.
For example, suppose you want to make a version of `Container`
that includes an iterator,
like what the `Sequence` protocol uses in the Swift standard library.
Here's how you write that:

```swift
protocol Container {
    associatedtype Item
    mutating func append(_ item: Item)
    var count: Int { get }
    subscript(i: Int) -> Item { get }

    associatedtype Iterator: IteratorProtocol where Iterator.Element == Item
    func makeIterator() -> Iterator
}
```

<!--
  - test: `associatedTypes-iterator`

  ```swifttest
  -> protocol Container {
        associatedtype Item
        mutating func append(_ item: Item)
        var count: Int { get }
        subscript(i: Int) -> Item { get }

        associatedtype Iterator: IteratorProtocol where Iterator.Element == Item
        func makeIterator() -> Iterator
     }
  ```
-->

<!--
  Adding makeIterator() to Container lets it conform to Sequence,
  although we don't call that out here.
-->

The generic `where` clause on `Iterator` requires that
the iterator must traverse over elements
of the same item type as the container's items,
regardless of the iterator's type.
The `makeIterator()` function provides access to a container's iterator.

<!--
  This example requires SE-0157 Recursive protocol constraints
  which is tracked by rdar://20531108

   that accepts a ranged of indexes it its subscript
   and returns a subcontainer ---
   similar to how ``Collection`` works in the Swift standard library.

   .. testcode:: associatedTypes-subcontainer

      -> protocol Container {
            associatedtype Item
            associatedtype SubContainer: Container where SubContainer.Item == Item

            mutating func append(_ item: Item)
            var count: Int { get }
            subscript(i: Int) -> Item { get }
            subscript(range: Range<Int>) -> SubContainer { get }
         }

   The generic ``where`` clause on ``SubContainer`` requires that
   the subcontainer must have the same item type as the container has,
   regardless of what type the subcontainer is.
   The original container and the subcontainer
   could be represented by the same type
   or by different types.
   The new subscript that accepts a range
   uses this new associated type as its return value.
-->

For a protocol that inherits from another protocol,
you add a constraint to an inherited associated type
by including the generic `where` clause in the protocol declaration.
For example, the following code
declares a `ComparableContainer` protocol
that requires `Item` to conform to `Comparable`:

```swift
protocol ComparableContainer: Container where Item: Comparable { }
```

<!--
  - test: `associatedTypes`

  ```swifttest
  -> protocol ComparableContainer: Container where Item: Comparable { }
  ```
-->

<!--
  This version throws a warning as of Swift commit de66b0c25c70:
  "redeclaration of associated type %0 from protocol %1 is better
  expressed as a 'where' clause on the protocol"

   -> protocol ComparableContainer: Container {
          associatedtype Item: Comparable
      }
-->

<!--
  Exercise the new container -- this might not actually be needed,
  and it adds a level of complexity.

  function < (lhs: ComparableContainer, rhs: ComparableContainer) -> Bool {
      // Sort empty containers before nonempty containers.
      if lhs.count == 0 {
          return true
      } else if rhs.count  == 0 {
          return false
      }

      // Sort nonempty containers by their first element.
      // (In real code, you would want to compare the second element
      // if the first elements are equal, and so on.)
      return lhs[0] < rhs[0]
  }
-->

## Generic Subscripts

Subscripts can be generic,
and they can include generic `where` clauses.
You write the placeholder type name inside angle brackets after `subscript`,
and you write a generic `where` clause right before the opening curly brace
of the subscript's body.
For example:

<!--
  The paragraph above borrows the wording used to introduce
  generics and 'where' clauses earlier in this chapter.
-->

```swift
extension Container {
    subscript<Indices: Sequence>(indices: Indices) -> [Item]
            where Indices.Iterator.Element == Int {
        var result: [Item] = []
        for index in indices {
            result.append(self[index])
        }
        return result
    }
}
```

<!--
  - test: `genericSubscript`

  ```swifttest
  >> protocol Container {
  >>    associatedtype Item
  >>    mutating func append(_ item: Item)
  >>    var count: Int { get }
  >>    subscript(i: Int) -> Item { get }
  >> }
  -> extension Container {
         subscript<Indices: Sequence>(indices: Indices) -> [Item]
                 where Indices.Iterator.Element == Int {
             var result: [Item] = []
             for index in indices {
                 result.append(self[index])
             }
             return result
         }
     }
  ```
-->

<!--
  - test: `genericSubscript`

  ```swifttest
  >> struct IntStack: Container {
        // original IntStack implementation
        var items: [Int] = []
        mutating func push(_ item: Int) {
           items.append(item)
        }
        mutating func pop() -> Int {
           return items.removeLast()
        }
        // conformance to the Container protocol
        typealias Item = Int
        mutating func append(_ item: Int) {
           self.push(item)
        }
        var count: Int {
           return items.count
        }
        subscript(i: Int) -> Int {
           return items[i]
        }
     }
  >> var s = IntStack()
  >> s.push(10); s.push(20); s.push(30)
  >> let items = s[ [0, 2] ]
  >> assert(items == [10, 30])
  ```
-->

This extension to the `Container` protocol
adds a subscript that takes a sequence of indices
and returns an array containing the items at each given index.
This generic subscript is constrained as follows:

- The generic parameter `Indices` in angle brackets
  has to be a type that conforms to the `Sequence` protocol
  from the Swift standard library.
- The subscript takes a single parameter, `indices`,
  which is an instance of that `Indices` type.
- The generic `where` clause requires
  that the iterator for the sequence
  must traverse over elements of type `Int`.
  This ensures that the indices in the sequence
  are the same type as the indices used for a container.

Taken together, these constraints mean that
the value passed for the `indices` parameter
is a sequence of integers.

## Implicit Constraints

In addition to constraints you write explicitly,
many places in your generic code also implicitly require
conformance to some very common protocols like [`Copyable`][].
<!-- When SE-0446 is implemented, add Escapable above. -->
These generic constraints that you don't have to write
are known as *implicit constraints*.
For example, both of the following function declarations
require `MyType` to be copyable:

[`Copyable`]: https://developer.apple.com/documentation/swift/copyable

```swift
function someFunction<MyType> { ... }
function someFunction<MyType: Copyable> { ... }
```

In the code above,
the first declaration has an implicit constraint,
and the second version lists the conformance explicitly.
In most code,
types also implicitly conform to these common protocols.
For more information,
see <doc:Protocols#Implicit-Conformance-to-a-Protocol>.

Because most types in Swift conform to these protocols,
writing them almost everywhere would be repetitive.
Instead, by marking only the exceptions,
you call out the places that omit a common constraint.
To suppress an implicit constraint,
write the protocol name with a tilde (`~`) in front of it.
You can read `~Copyable` as "maybe copyable" ---
this suppressed constraint allows
both copyable and noncopyable types in this position.
Note that `~Copyable` doesn't *require* the type to be noncopyable.
For example:

```swift
func f<MyType>(x: inout MyType) {
    let x1 = x  // The value of x1 is a copy of x's value.
    let x2 = x  // The value of x2 is a copy of x's value.
}

func g<AnotherType: ~Copyable>(y: inout AnotherType) {
    let y1 = y  // The assignment consumes y's value.
    let y2 = y  // Error: Value consumed more than once.
}
```

In the code above,
the function `f()` implicitly requires `MyType` to be copyable.
Within the function body,
the value of `x` is copied to `x1` and `x2` in the assignment.
In contrast, `g()` suppresses the implicit constraint on `AnotherType`,
which allows you to pass either a copyable or noncopyable value.
Within the function body,
you can't copy the value of `y`
because `AnotherType` might be noncopyable.
Assignment consumes the value of `y`
and it's an error to consume that value more than once.
Noncopyable values like `y`
must be passed as in-out, borrowing, or consuming parameters ---
for more information,
see <doc:Declarations#Borrowing-and-Consuming-Parameters>.

For details about when generic code
includes an implicit constraint to a given protocol,
see the reference for that protocol.

<!--
  TODO: Generic Enumerations
  --------------------------
-->

<!--
  TODO: Describe how Optional<Wrapped> works
-->

<!--
This source file is part of the Swift.org open source project

Copyright (c) 2014 - 2022 Apple Inc. and the Swift project authors
Licensed under Apache License v2.0 with Runtime Library Exception

See https://swift.org/LICENSE.txt for license information
See https://swift.org/CONTRIBUTORS.txt for the list of Swift project authors
-->
