# Error Handling

Respond to and recover from errors.

*Error handling* is the process of responding to
and recovering from error conditions in your program.
Swift provides first-class support for
throwing, catching, propagating, and manipulating
recoverable errors at runtime.

Some operations
aren't guaranteed to always complete execution or produce a useful output.
Optionals are used to represent the absence of a value,
but when an operation fails,
it's often useful to understand what caused the failure,
so that your code can respond accordingly.

As an example, consider the task of reading and processing data from a file on disk.
There are a number of ways this task can fail, including
the file not existing at the specified path,
the file not having read permissions, or
the file not being encoded in a compatible format.
Distinguishing among these different situations
allows a program to resolve some errors
and to communicate to the user any errors it can't resolve.

> Note: Error handling in Swift interoperates with error handling patterns
> that use the `NSError` class in Cocoa and Objective-C.
> For more information about this class,
> see [Handling Cocoa Errors in Swift](https://developer.apple.com/documentation/swift/cocoa_design_patterns/handling_cocoa_errors_in_swift).

## Representing and Throwing Errors

In Swift, errors are represented by
values of types that conform to the `Error` protocol.
This empty protocol indicates that a type
can be used for error handling.

Swift enumerations are particularly well suited to modeling
a group of related error conditions,
with associated values allowing for additional information
about the nature of an error to be communicated.
For example, here's how you might represent the error conditions
of operating a vending machine inside a game:

```swift
enum VendingMachineError: Error {
    case invalidSelection
    case insufficientFunds(coinsNeeded: Int)
    case outOfStock
}
```

<!--
  - test: `throw-enum-error`

  ```swifttest
  -> enum VendingMachineError: Error {
         case invalidSelection
         case insufficientFunds(coinsNeeded: Int)
         case outOfStock
     }
  ```
-->

Throwing an error lets you indicate that something unexpected happened
and the normal flow of execution can't continue.
You use a `throw` statement to throw an error.
For example,
the following code throws an error to indicate
that five additional coins are needed by the vending machine:

```swift
throw VendingMachineError.insufficientFunds(coinsNeeded: 5)
```

<!--
  - test: `throw-enum-error`

  ```swifttest
  -> throw VendingMachineError.insufficientFunds(coinsNeeded: 5)
  xx fatal error
  ```
-->

## Handling Errors

When an error is thrown,
some surrounding piece of code must be responsible
for handling the error ---
for example, by correcting the problem,
trying an alternative approach,
or informing the user of the failure.

There are four ways to handle errors in Swift.
You can propagate the error from a function to the code that calls that function,
handle the error using a `do`-`catch` statement,
handle the error as an optional value,
or assert that the error will not occur.
Each approach is described in a section below.

When a function throws an error,
it changes the flow of your program,
so it's important that you can quickly identify places in your code that can throw errors.
To identify these places in your code, write the `try` keyword ---
or the `try?` or `try!` variation ---
before a piece of code that calls a function, method, or initializer that can throw an error.
These keywords are described in the sections below.

> Note: Error handling in Swift resembles exception handling in other languages,
> with the use of the `try`, `catch` and `throw` keywords.
> Unlike exception handling in many languages ---
> including Objective-C ---
> error handling in Swift doesn't involve unwinding the call stack,
> a process that can be computationally expensive.
> As such, the performance characteristics
> of a `throw` statement
> are comparable to those of a `return` statement.

### Propagating Errors Using Throwing Functions

To indicate that a function, method, or initializer can throw an error,
you write the `throws` keyword in the function's declaration
after its parameters.
A function marked with `throws` is called a *throwing function*.
If the function specifies a return type,
you write the `throws` keyword before the return arrow (`->`).

<!--
  TODO Add discussion of throwing initializers
-->

```swift
func canThrowErrors() throws -> String

func cannotThrowErrors() -> String
```

<!--
  - test: `throwingFunctionDeclaration`

  ```swifttest
  -> func canThrowErrors() throws -> String
  >> { return "foo" }

  -> func cannotThrowErrors() -> String
  >> { return "foo" }
  ```
-->

<!--
  - test: `throwing-function-cant-overload-nonthrowing`

  ```swifttest
  -> func f() -> Int { return 10 }
  -> func f() throws -> Int { return 10 } // Error
  !$ error: invalid redeclaration of 'f()'
  !! func f() throws -> Int { return 10 } // Error
  !! ^
  !$ note: 'f()' previously declared here
  !! func f() -> Int { return 10 }
  !! ^
  ```
-->

<!--
  - test: `throwing-parameter-can-overload-nonthrowing`

  ```swifttest
  -> func f(callback: () -> Int) {}
  -> func f(callback: () throws -> Int) {} // Allowed
  ```
-->

<!--
  TODO: Add more assertions to test these behaviors
-->

<!--
  TODO: Write about the fact the above rules that govern overloading
  for throwing and nonthrowing functions.
-->

A throwing function propagates errors that are thrown inside of it
to the scope from which it's called.

> Note: Only throwing functions can propagate errors.
> Any errors thrown inside a nonthrowing function
> must be handled inside the function.

In the example below,
the `VendingMachine` class has a `vend(itemNamed:)` method
that throws an appropriate `VendingMachineError`
if the requested item isn't available,
is out of stock,
or has a cost that exceeds the current deposited amount:

```swift
struct Item {
    var price: Int
    var count: Int
}

class VendingMachine {
    var inventory = [
        "Candy Bar": Item(price: 12, count: 7),
        "Chips": Item(price: 10, count: 4),
        "Pretzels": Item(price: 7, count: 11)
    ]
    var coinsDeposited = 0

    func vend(itemNamed name: String) throws {
        guard let item = inventory[name] else {
            throw VendingMachineError.invalidSelection
        }

        guard item.count > 0 else {
            throw VendingMachineError.outOfStock
        }

        guard item.price <= coinsDeposited else {
            throw VendingMachineError.insufficientFunds(coinsNeeded: item.price - coinsDeposited)
        }

        coinsDeposited -= item.price

        var newItem = item
        newItem.count -= 1
        inventory[name] = newItem

        print("Dispensing \(name)")
    }
}
```

<!--
  - test: `errorHandling`

  ```swifttest
  >> enum VendingMachineError: Error {
  >>     case invalidSelection
  >>     case insufficientFunds(coinsNeeded: Int)
  >>     case outOfStock
  >> }
  -> struct Item {
        var price: Int
        var count: Int
     }

  -> class VendingMachine {
  ->     var inventory = [
             "Candy Bar": Item(price: 12, count: 7),
             "Chips": Item(price: 10, count: 4),
             "Pretzels": Item(price: 7, count: 11)
         ]
  ->     var coinsDeposited = 0

  ->     func vend(itemNamed name: String) throws {
             guard let item = inventory[name] else {
                 throw VendingMachineError.invalidSelection
             }

             guard item.count > 0 else {
                 throw VendingMachineError.outOfStock
             }

             guard item.price <= coinsDeposited else {
                 throw VendingMachineError.insufficientFunds(coinsNeeded: item.price - coinsDeposited)
             }

             coinsDeposited -= item.price

             var newItem = item
             newItem.count -= 1
             inventory[name] = newItem

             print("Dispensing \(name)")
         }
     }
  ```
-->

The implementation of the `vend(itemNamed:)` method
uses `guard` statements to exit the method early and throw appropriate errors
if any of the requirements for purchasing a snack aren't met.
Because a `throw` statement immediately transfers program control,
an item will be vended only if all of these requirements are met.

Because the `vend(itemNamed:)` method propagates any errors it throws,
any code that calls this method must either handle the errors ---
using a `do`-`catch` statement, `try?`, or `try!` ---
or continue to propagate them.
For example,
the `buyFavoriteSnack(person:vendingMachine:)` in the example below
is also a throwing function,
and any errors that the `vend(itemNamed:)` method throws will
propagate up to the point where the `buyFavoriteSnack(person:vendingMachine:)` function is called.

```swift
let favoriteSnacks = [
    "Alice": "Chips",
    "Bob": "Licorice",
    "Eve": "Pretzels",
]
func buyFavoriteSnack(person: String, vendingMachine: VendingMachine) throws {
    let snackName = favoriteSnacks[person] ?? "Candy Bar"
    try vendingMachine.vend(itemNamed: snackName)
}
```

<!--
  - test: `errorHandling`

  ```swifttest
  -> let favoriteSnacks = [
         "Alice": "Chips",
         "Bob": "Licorice",
         "Eve": "Pretzels",
     ]
  -> func buyFavoriteSnack(person: String, vendingMachine: VendingMachine) throws {
         let snackName = favoriteSnacks[person] ?? "Candy Bar"
         try vendingMachine.vend(itemNamed: snackName)
     }
  >> var v = VendingMachine()
  >> v.coinsDeposited = 100
  >> try buyFavoriteSnack(person: "Alice", vendingMachine: v)
  << Dispensing Chips
  ```
-->

In this example,
the `buyFavoriteSnack(person: vendingMachine:)` function looks up a given person's favorite snack
and tries to buy it for them by calling the `vend(itemNamed:)` method.
Because the `vend(itemNamed:)` method can throw an error,
it's called with the `try` keyword in front of it.

Throwing initializers can propagate errors in the same way as throwing functions.
For example,
the initializer for the `PurchasedSnack` structure in the listing below
calls a throwing function as part of the initialization process,
and it handles any errors that it encounters by propagating them to its caller.

```swift
struct PurchasedSnack {
    let name: String
    init(name: String, vendingMachine: VendingMachine) throws {
        try vendingMachine.vend(itemNamed: name)
        self.name = name
    }
}
```

<!--
  - test: `errorHandling`

  ```swifttest
  -> struct PurchasedSnack {
         let name: String
         init(name: String, vendingMachine: VendingMachine) throws {
             try vendingMachine.vend(itemNamed: name)
             self.name = name
         }
     }
  >> do {
  >>     let succeeds = try PurchasedSnack(name: "Candy Bar", vendingMachine: v)
  >>     print(succeeds)
  >> } catch {
  >>     print("Threw unexpected error.")
  >> }
  << Dispensing Candy Bar
  << PurchasedSnack(name: "Candy Bar")
  >> do {
  >>     let throwsError = try PurchasedSnack(name: "Jelly Baby", vendingMachine: v)
  >>     print(throwsError)
  >> } catch {
  >>     print("Threw EXPECTED error.")
  >> }
  << Threw EXPECTED error.
  ```
-->

### Handling Errors Using Do-Catch

You use a `do`-`catch` statement to handle errors
by running a block of code.
If an error is thrown by the code in the `do` clause,
it's matched against the `catch` clauses
to determine which one of them can handle the error.

Here is the general form of a `do`-`catch` statement:

```swift
do {
    try <#expression#>
    <#statements#>
} catch <#pattern 1#> {
    <#statements#>
} catch <#pattern 2#> where <#condition#> {
    <#statements#>
} catch <#pattern 3#>, <#pattern 4#> where <#condition#> {
    <#statements#>
} catch {
    <#statements#>
}
```

You write a pattern after `catch` to indicate what errors
that clause can handle.
If a `catch` clause doesn't have a pattern,
the clause matches any error
and binds the error to a local constant named `error`.
For more information about pattern matching,
see <doc:Patterns>.

<!--
  TODO: Call out the reasoning why we don't let you
  consider a catch clause exhaustive by just matching
  the errors in an given enum without a general catch/default.
-->

For example, the following code matches against all three cases
of the `VendingMachineError` enumeration.

```swift
var vendingMachine = VendingMachine()
vendingMachine.coinsDeposited = 8
do {
    try buyFavoriteSnack(person: "Alice", vendingMachine: vendingMachine)
    print("Success! Yum.")
} catch VendingMachineError.invalidSelection {
    print("Invalid Selection.")
} catch VendingMachineError.outOfStock {
    print("Out of Stock.")
} catch VendingMachineError.insufficientFunds(let coinsNeeded) {
    print("Insufficient funds. Please insert an additional \(coinsNeeded) coins.")
} catch {
    print("Unexpected error: \(error).")
}
// Prints "Insufficient funds. Please insert an additional 2 coins."
```

<!--
  - test: `errorHandling`

  ```swifttest
  -> var vendingMachine = VendingMachine()
  -> vendingMachine.coinsDeposited = 8
  -> do {
         try buyFavoriteSnack(person: "Alice", vendingMachine: vendingMachine)
         print("Success! Yum.")
     } catch VendingMachineError.invalidSelection {
         print("Invalid Selection.")
     } catch VendingMachineError.outOfStock {
         print("Out of Stock.")
     } catch VendingMachineError.insufficientFunds(let coinsNeeded) {
         print("Insufficient funds. Please insert an additional \(coinsNeeded) coins.")
     } catch {
         print("Unexpected error: \(error).")
     }
  <- Insufficient funds. Please insert an additional 2 coins.
  ```
-->

In the above example,
the `buyFavoriteSnack(person:vendingMachine:)` function is called in a `try` expression,
because it can throw an error.
If an error is thrown,
execution immediately transfers to the `catch` clauses,
which decide whether to allow propagation to continue.
If no pattern is matched, the error gets caught by the final `catch`
clause and is bound to a local `error` constant.
If no error is thrown,
the remaining statements in the `do` statement are executed.

The `catch` clauses don't have to handle every possible error
that the code in the `do` clause can throw.
If none of the `catch` clauses handle the error,
the error propagates to the surrounding scope.
However, the propagated error
must be handled by *some* surrounding scope.
In a nonthrowing function,
an enclosing `do`-`catch` statement
must handle the error.
In a throwing function,
either an enclosing `do`-`catch` statement
or the caller
must handle the error.
If the error propagates to the top-level scope
without being handled,
you'll get a runtime error.

For example, the above example can be written so any
error that isn't a `VendingMachineError` is instead
caught by the calling function:

```swift
func nourish(with item: String) throws {
    do {
        try vendingMachine.vend(itemNamed: item)
    } catch is VendingMachineError {
        print("Couldn't buy that from the vending machine.")
    }
}

do {
    try nourish(with: "Beet-Flavored Chips")
} catch {
    print("Unexpected non-vending-machine-related error: \(error)")
}
// Prints "Couldn't buy that from the vending machine."
```

<!--
  - test: `errorHandling`

  ```swifttest
  -> func nourish(with item: String) throws {
         do {
             try vendingMachine.vend(itemNamed: item)
         } catch is VendingMachineError {
             print("Couldn't buy that from the vending machine.")
         }
     }

  -> do {
         try nourish(with: "Beet-Flavored Chips")
     } catch {
         print("Unexpected non-vending-machine-related error: \(error)")
     }
  <- Couldn't buy that from the vending machine.
  ```
-->

In the `nourish(with:)` function,
if `vend(itemNamed:)` throws an error that's
one of the cases of the `VendingMachineError` enumeration,
`nourish(with:)` handles the error by printing a message.
Otherwise,
`nourish(with:)` propagates the error to its call site.
The error is then caught by the general `catch` clause.

Another way to catch several related errors
is to list them after `catch`, separated by commas.
For example:

```swift
func eat(item: String) throws {
    do {
        try vendingMachine.vend(itemNamed: item)
    } catch VendingMachineError.invalidSelection, VendingMachineError.insufficientFunds, VendingMachineError.outOfStock {
        print("Invalid selection, out of stock, or not enough money.")
    }
}
```

<!--
  - test: `errorHandling`

  ```swifttest
  -> func eat(item: String) throws {
         do {
             try vendingMachine.vend(itemNamed: item)
         } catch VendingMachineError.invalidSelection, VendingMachineError.insufficientFunds, VendingMachineError.outOfStock {
             print("Invalid selection, out of stock, or not enough money.")
         }
     }
  >> do {
  >>     try eat(item: "Beet-Flavored Chips")
  >> } catch {
  >>     print("Unexpected error: \(error)")
  >> }
  << Invalid selection, out of stock, or not enough money.
  ```
-->

<!--
  FIXME the catch clause is getting indented oddly in HTML output if I hard wrap it
-->

The `eat(item:)` function lists the vending machine errors to catch,
and its error text corresponds to the items in that list.
If any of the three listed errors are thrown,
this `catch` clause handles them by printing a message.
Any other errors are propagated to the surrounding scope,
including any vending-machine errors that might be added later.

### Converting Errors to Optional Values

You use `try?` to handle an error by converting it to an optional value.
If an error is thrown while evaluating the `try?` expression,
the value of the expression is `nil`.
For example,
in the following code `x` and `y` have the same value and behavior:

```swift
func someThrowingFunction() throws -> Int {
    // ...
}

let x = try? someThrowingFunction()

let y: Int?
do {
    y = try someThrowingFunction()
} catch {
    y = nil
}
```

<!--
  - test: `optional-try`

  ```swifttest
  -> func someThrowingFunction() throws -> Int {
        // ...
  >>    return 40
  -> }

  -> let x = try? someThrowingFunction()
  >> print(x as Any)
  << Optional(40)

  -> let y: Int?
     do {
         y = try someThrowingFunction()
     } catch {
         y = nil
     }
  >> print(y as Any)
  << Optional(40)
  ```
-->

If `someThrowingFunction()` throws an error,
the value of `x` and `y` is `nil`.
Otherwise, the value of `x` and `y` is the value that the function returned.
Note that `x` and `y` are an optional of whatever type `someThrowingFunction()` returns.
Here the function returns an integer, so `x` and `y` are optional integers.

Using `try?` lets you write concise error handling code
when you want to handle all errors in the same way.
For example,
the following code
uses several approaches to fetch data,
or returns `nil` if all of the approaches fail.

```swift
func fetchData() -> Data? {
    if let data = try? fetchDataFromDisk() { return data }
    if let data = try? fetchDataFromServer() { return data }
    return nil
}
```

<!--
  - test: `optional-try-cached-data`

  ```swifttest
  >> struct Data {}
  >> func fetchDataFromDisk() throws -> Data { return Data() }
  >> func fetchDataFromServer() throws -> Data { return Data() }
  -> func fetchData() -> Data? {
         if let data = try? fetchDataFromDisk() { return data }
         if let data = try? fetchDataFromServer() { return data }
         return nil
     }
  ```
-->

### Disabling Error Propagation

Sometimes you know a throwing function or method
won't, in fact, throw an error at runtime.
On those occasions,
you can write `try!` before the expression to disable error propagation
and wrap the call in a runtime assertion that no error will be thrown.
If an error actually is thrown, you'll get a runtime error.

For example, the following code uses a `loadImage(atPath:)` function,
which loads the image resource at a given path
or throws an error if the image can't be loaded.
In this case, because the image is shipped with the application,
no error will be thrown at runtime,
so it's appropriate to disable error propagation.

```swift
let photo = try! loadImage(atPath: "./Resources/John Appleseed.jpg")
```

<!--
  - test: `forceTryStatement`

  ```swifttest
  >> struct Image {}
  >> func loadImage(atPath path: String) throws -> Image {
  >>     return Image()
  >> }
  -> let photo = try! loadImage(atPath: "./Resources/John Appleseed.jpg")
  ```
-->

## Specifying the Error Type

All of the examples above use the most common kind of error handling,
where the errors that your code throws
can be values of any type that conforms to the `Error` protocol.
This approach matches the reality that
you don't know ahead of time every error that could happen
while the code is running,
especially when propagating errors thrown somewhere else.
It also reflects the fact that errors can change over time.
New versions of a library ---
including libraries that your dependencies use ---
can throw new errors,
and the rich complexity of real-world user configurations
can expose failure modes that weren't visible during development or testing.
The error handling code in the examples above
always includes a default case to handle errors
that don't have a specific `catch` clause.

Most Swift code doesn't specify the type for the errors it throws.
However,
you might limit code to throwing errors of only one specific type
in the following special cases:

- When running code on an embedded system
  that doesn't support dynamic allocation of memory.
  Throwing an instance of `any Error` or another boxed protocol type
  requires allocating memory at runtime to store the error.
  In contrast,
  throwing an error of a specific type
  lets Swift avoid heap allocation for errors.

- When the errors are an implementation detail of some unit of code,
  like a library,
  and aren't part of the interface to that code.
  Because the errors come from only the library,
  and not from other dependencies or the library's clients,
  you can make an exhaustive list of all possible failures.
  And because these errors are an implementation detail of the library,
  they're always handled within that library.

- In code that only propagates errors described by generic parameters,
  like a function that takes a closure argument
  and propagates any errors from that closure.
  For a comparison between propagating a specific error type
  and using `rethrows`,
  see <doc:Declarations#Rethrowing-Functions-and-Methods>.

For example,
consider code that summarizes ratings
and uses the following error type:

```swift
enum StatisticsError: Error {
    case noRatings
    case invalidRating(Int)
}
```

To specify that a function throws only `StatisticsError` values as its errors,
you write `throws(StatisticsError)` instead of only `throws`
when declaring the function.
This syntax is also called *typed throws*
because you write the error type after `throws` in the declaration.
For example,
the function below throws `StatisticsError` values as its errors.

```swift
func summarize(_ ratings: [Int]) throws(StatisticsError) {
    guard !ratings.isEmpty else { throw .noRatings }

    var counts = [1: 0, 2: 0, 3: 0]
    for rating in ratings {
        guard rating > 0 && rating <= 3 else { throw .invalidRating(rating) }
        counts[rating]! += 1
    }

    print("*", counts[1]!, "-- **", counts[2]!, "-- ***", counts[3]!)
}
```

In the code above,
the `summarize(_:)` function summarizes a list of ratings
expressed on a scale of 1 to 3.
This function throws an instance of `StatisticsError` if the input isn't valid.
Both places in the code above that throw an error
omit the type of the error
because the function's error type is already defined.
You can use the short form, `throw .noRatings`,
instead of writing `throw StatisticsError.noRatings`
when throwing an error in a function like this.

When you write a specific error type at the start of the function,
Swift checks that you don't throw any other errors.
For example,
if you tried to use `VendingMachineError` from examples earlier in this chapter
in the `summarize(_:)` function above,
that code would produce an error at compile time.

You can call a function that uses typed throws
from within a regular throwing function:

```swift
func someThrowingFunction() throws {
    let ratings = [1, 2, 3, 2, 2, 1]
    try summarize(ratings)
}
```

The code above doesn't specify an error type for `someThrowingFunction()`,
so it throws `any Error`.
You could also write the error type explicitly as `throws(any Error)`;
the code below is equivalent to the code above:

```swift
func someThrowingFunction() throws(any Error) {
    let ratings = [1, 2, 3, 2, 2, 1]
    try summarize(ratings)
}
```

In this code,
`someThrowingFunction()` propagates any errors that `summarize(_:)` throws.
The errors from `summarize(_:)` are always `StatisticsError` values,
which is also a valid error for `someThrowingFunction()` to throw.

Just like you can write a function that never returns
with a return type of `Never`,
you can write a function that never throws with `throws(Never)`:

```swift
func nonThrowingFunction() throws(Never) {
  // ...
}
```
This function can't throw because
it's impossible to create a value of type `Never` to throw.

In addition to specifying a function's error type,
you can also write a specific error type for a `do`-`catch` statement.
For example:

```swift
let ratings = []
do throws(StatisticsError) {
    try summarize(ratings)
} catch {
    switch error {
    case .noRatings:
        print("No ratings available")
    case .invalidRating(let rating):
        print("Invalid rating: \(rating)")
    }
}
// Prints "No ratings available".
```

In this code,
writing `do throws(StatisticsError)` indicates that
the `do`-`catch` statement throws `StatisticsError` values as its errors.
Like other `do`-`catch` statements,
the `catch` clause can either handle every possible error
or propagate unhandled errors for some surrounding scope to handle.
This code handles all of the errors,
using a `switch` statement with one case for each enumeration value.
Like other `catch` clauses that don't have a pattern,
the clause matches any error
and binds the error to a local constant named `error`.
Because the `do`-`catch` statement throws `StatisticsError` values,
`error` is a value of type `StatisticsError`.

The `catch` clause above uses a `switch` statement
to match and handle each possible error.
If you tried to add a new case to `StatisticsError`
without updating the error-handling code,
Swift would give you an error
because the `switch` statement wouldn't be exhaustive anymore.
For a library that catches all of its own errors,
you could use this approach to ensure any new errors
get corresponding new code to handle them.

If a function or `do` block throws errors of only a single type,
Swift infers that this code is using typed throws.
Using this shorter syntax,
you could write the `do`-`catch` example above as follows:

```swift
let ratings = []
do {
    try summarize(ratings)
} catch {
    switch error {
    case .noRatings:
        print("No ratings available")
    case .invalidRating(let rating):
        print("Invalid rating: \(rating)")
    }
}
// Prints "No ratings available".
```

Even though the `do`-`catch` block above
doesn't specify what type of error it throws,
Swift infers that it throws `StatisticsError`.
You can explicitly write `throws(any Error)`
to avoid letting Swift infer typed throws.

## Specifying Cleanup Actions

You use a `defer` statement to execute a set of statements
just before code execution leaves the current block of code.
This statement lets you do any necessary cleanup
that should be performed regardless
of *how* execution leaves the current block of code ---
whether it leaves because an error was thrown
or because of a statement such as `return` or `break`.
For example, you can use a `defer` statement
to ensure that file descriptors are closed
and manually allocated memory is freed.

A `defer` statement defers execution until the current scope is exited.
This statement consists of the `defer` keyword and the statements to be executed later.
The deferred statements may not contain any code
that would transfer control out of the statements,
such as a `break` or a `return` statement,
or by throwing an error.
Deferred actions are executed in the reverse of
the order that they're written in your source code.
That is, the code in the first `defer` statement executes last,
the code in the second `defer` statement executes second to last,
and so on.
The last `defer` statement in source code order executes first.

```swift
func processFile(filename: String) throws {
    if exists(filename) {
        let file = open(filename)
        defer {
            close(file)
        }
        while let line = try file.readline() {
            // Work with the file.
        }
        // close(file) is called here, at the end of the scope.
    }
}
```

<!--
  - test: `defer`

  ```swifttest
  >> func exists(_ file: String) -> Bool { return true }
  >> struct File {
  >>    func readline() throws -> String? { return nil }
  >> }
  >> func open(_ file: String) -> File { return File() }
  >> func close(_ fileHandle: File) {}
  -> func processFile(filename: String) throws {
        if exists(filename) {
           let file = open(filename)
           defer {
              close(file)
           }
           while let line = try file.readline() {
              // Work with the file.
  >>          print(line)
           }
           // close(file) is called here, at the end of the scope.
        }
     }
  ```
-->

The above example uses a `defer` statement
to ensure that the `open(_:)` function
has a corresponding call to `close(_:)`.

You can use a `defer` statement
even when no error handling code is involved.
For more information,
see <doc:ControlFlow#Deferred-Actions>.

<!--
This source file is part of the Swift.org open source project

Copyright (c) 2014 - 2022 Apple Inc. and the Swift project authors
Licensed under Apache License v2.0 with Runtime Library Exception

See https://swift.org/LICENSE.txt for license information
See https://swift.org/CONTRIBUTORS.txt for the list of Swift project authors
-->
