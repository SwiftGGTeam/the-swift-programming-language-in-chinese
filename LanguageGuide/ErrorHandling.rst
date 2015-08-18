Error Handling
==============

:newTerm:`Error handling` is the process of responding to
and recovering from error conditions in your program.
Swift provides first-class support for
throwing, catching, propagating, and manipulating
recoverable errors at runtime.

.. TODO: Refactor and expand optionals discussion into separate chapter.
    ^-- why is this to-do even here???

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
allows a program to resolve some errors,
and communicate errors it can't resolve to the user.

.. note::

   Error handling in Swift interoperates with error handling patterns
   that use the ``NSError`` class in Cocoa and Objective-C.
   For more information,
   see `Error Handling <//apple_ref/doc/uid/TP40014216-CH7-ID10>`_
   in `Using Swift with Cocoa and Objective-C <//apple_ref/doc/uid/TP40014216>`_.

.. NOTE:

    If want to make a comparison to exception handling in other languages,
    we'll need to take about performance and other subtle differences.
    Leaving this discussion out for Xcode 7 beta 1.


.. _ErrorHandling_Represent:

Representing and Throwing Errors
--------------------------------

In Swift, errors are represented by
values of types that conform to the ``ErrorType`` protocol.
Types that adopt ``ErrorType``
automatically have the implementation of their conformance synthesized by the compiler.
You throw an error with a ``throw`` statement.

.. TR: Is the above comment about conformance still true?
   Now that ErrorType is public, I think we decided
   that it no longer has any required properties.

.. testcode:: throw-simple-error

   >> enum SomeError: ErrorType { case Error }
   >> let someError = SomeError.Error
   -> throw someError
   xx fatal error

Swift enumerations are particularly well-suited to modeling
a group of related error conditions,
with associated values allowing for additional information
about the nature of an error to be communicated.
For example, here's how you might represent the error conditions
of operating a vending machine inside a game:

.. testcode:: throw-enum-error

   -> enum VendingMachineError: ErrorType {
          case InvalidSelection
          case InsufficientFunds(coinsNeeded: Int)
          case OutOfStock
      }
   -> throw VendingMachineError.InsufficientFunds(coinsNeeded: 5)
   xx fatal error

In this example, a vending machine can fail for the following reasons:

* The requested item is not a valid selection, indicated by ``InvalidSelection``.
* The requested item's cost is greater than the provided funds,
  indicated by ``InsufficientFunds``.
  The associated ``Int`` value represents the additional number
  of coins needed to complete the transaction.
* The request item is out of stock, indicated by ``OutOfStock``.

Here, five additional coins are needed,
so an error is thrown using the ``throw`` statement.


.. _ErrorHandling_Catch:

Handling Errors
---------------

There are four ways to handle errors:

* Use ``try`` in a function marked with ``throws``
  to allow the error to propagate,
  and then handle the error in the scope
  where the function was called.

* Use ``try`` in a ``do``-``catch`` block
  to handle the error using a block of code.

* Use ``try?`` to handle the error as an optional value.

* Use ``try!`` to disable error propagation
  by asserting that no error will be thrown.

You mark an expression that can throw an error
by writing ``try`` in front it.
This keyword calls out the fact that the expression can throw an error
and that the lines of code after the ``try`` might not be run.

.. note::

   Error handling in Swift resembles exception handling in other languages,
   with the use of the ``try``, ``catch`` and ``throw`` keywords.
   Unlike exception handling in many languages ---
   including Objective-C ---
   error handling in Swift does not involve unwinding the call stack,
   which can be computationally expensive.
   As such, the performance characteristics
   of a ``throw`` statement
   are comparable to those of a ``return`` statement.


.. _ErrorHandling_Throw:

Handling Errors By Propagating
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To indicate that a function can propagate errors
that are thrown inside of it
to the scope where the function is called,
you write the ``throws`` keyword in the function's declaration
after its parameters.
A function marked with ``throws`` is called a :newTerm:`throwing function`.
If the function specifies a return type,
you write the ``throws`` keyword before the return arrow (``->``).

.. note::

    Only throwing functions can propagate errors.
    Any errors thrown inside a nonthrowing function
    must be handled inside the function.

.. testcode:: throwingFunctionDeclaration

   -> func canThrowErrors() throws -> String
   >> { return "foo" }
   ---
   -> func cannotThrowErrors() -> String
   >> { return "foo" }

.. assertion:: throwing-function-cant-overload-nonthrowing
   :compile: true

   -> func f() -> Int { return 10 }
   -> func f() throws -> Int { return 10 } // Error
   !!  /tmp/swifttest.swift:2:6: error: invalid redeclaration of 'f()'
   !! func f() throws -> Int { return 10 } // Error
   !! ^
   !! /tmp/swifttest.swift:1:6: note: 'f()' previously declared here
   !! func f() -> Int { return 10 }
   !! ^

.. Above test needs to be compiled or it's not predictable which version of f() gets read first.

.. assertion:: throwing-parameter-can-overload-nonthrowing

   -> func f(callback: Void -> Int) { }
   -> func f(callback: Void throws -> Int) { } // Allowed

.. TODO: Add more assertions to test these behaviors

.. TODO: Write about the fact the above rules that govern overloading
   for throwing and nonthrowing functions.

In the example below,
the ``vend(itemNamed:)`` function throws an error if
the requested item is not available,
is out of stock,
or has a cost that exceeds the current deposited amount:

.. testcode:: errorHandling

   >> enum VendingMachineError: ErrorType {
   >>     case InvalidSelection
   >>     case InsufficientFunds(coinsNeeded: Int)
   >>     case OutOfStock
   >> }
   -> struct Item {
         var price: Int
         var count: Int
      }
   ---
   -> class VendingMachine {
   ->     var inventory = [
              "Candy Bar": Item(price: 12, count: 7),
              "Chips": Item(price: 10, count: 4),
              "Pretzels": Item(price: 7, count: 11)
          ]
   ->     var coinsDeposited = 0
   ->     func dispenseSnack(snack: String) {
   >>        print("Dispensing \(snack)")
   ->        // ...
          }
   ---
   ->     func vend(itemNamed name: String) throws {
              guard var item = inventory[name] else {
                  throw VendingMachineError.InvalidSelection
              }

              guard item.count > 0 else {
                  throw VendingMachineError.OutOfStock
              }

              guard item.price < coinsDeposited else {
                  throw VendingMachineError.InsufficientFunds(coinsNeeded: item.price - coinsDeposited)
              }

              coinsDeposited -= item.price
              --item.count
              inventory[name] = item
              self.dispenseSnack(name)
          }
      }

First, a ``guard`` statement is used
to bind the ``item`` constant and ``count`` variable
to the corresponding values in the current inventory.
If the item is not in the inventory, the ``InvalidSelection`` error is thrown.
Next, the availability of the requested item is determined by checking its count.
If ``count`` is less than or equal to zero,
an ``OutOfStock`` error is thrown.
Finally, the price of the requested item is compared to the current deposited amount.
If the deposited amount can cover the cost of the item,
the price is deducted from the deposited amount,
the count of the stock of the item is decremented in the inventory,
and the requested item is dispensed.
Otherwise, the outstanding balance is calculated
and used as an associated value for the thrown ``InsufficientFunds`` error.
Because a ``throw`` statement immediately transfers program control,
an item will be vended only if all of the requirements for purchase ---
that is, a valid, in-stock selection with sufficient funds ---
are met.

.. testcode:: errorHandling

   -> let favoriteSnacks = [
          "Alice": "Chips",
          "Bob": "Licorice",
          "Eve": "Pretzels",
      ]
   << // favoriteSnacks : [String : String] = ["Bob": "Licorice", "Alice": "Chips", "Eve": "Pretzels"]
   -> func buyFavoriteSnack(person: String, vendingMachine: VendingMachine) throws {
          let snackName = favoriteSnacks[person] ?? "Candy Bar"
          try vendingMachine.vend(itemNamed: snackName)
      }
   >> var v = VendingMachine()
   << // v : VendingMachine = REPL.VendingMachine
   >> v.coinsDeposited = 100
   >> try buyFavoriteSnack("Alice", vendingMachine: v)
   << Dispensing Chips

The ``buyFavoriteSnack(_:)`` function looks up the given person's favorite snack
and tries to buy it for them.
If they don't have a favorite snack listed, it tries to buy a candy bar.
It calls the ``vend`` function, which is a throwing function,
so the function call is marked with ``try`` in front of it.
The ``buyFavoriteSnack(_:)`` function is also a throwing function,
so any errors that the ``vend`` function throws
propagate up to the point where the ``buyFavoriteSnack(_:)`` function was called.

.. _ErrorHandling_DoCatch:

Handling Errors Using a Block of Code
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You use a ``do``-``catch`` statement to handle errors
by running a block of code.
If an error is thrown by the code in the ``do`` clause,
it is matched against the ``catch`` clauses
to determine which one of them can handle the error.

Here is the general form of a ``do``-``catch`` statement:

.. syntax-outline::

   do {
      <#statements#>
   } catch <#pattern#> {
      <#statements#>
   }

You write a pattern after ``catch`` to indicate what errors
that clause can handle.
If a ``catch`` clause does have a pattern,
the clause matches any error
and binds the error to a local constant named ``error``.
For more information about pattern matching,
see :doc:`../ReferenceManual/Patterns`.

A ``do``-``catch`` clause doesn't have to handle every possible error
that the code in its ``do`` clause could throw.
If none of the ``catch`` clauses can handle the error,
the error continues to propagate to the surrounding scope.
However, the error must handled by some surrounding scope ---
either by another larger ``do``-``catch`` statement
with a ``catch`` clause that can handle the error,
or by being inside a function marked with ``throws``.
For example, the following code handles all three cases
of the ``VendingMachineError`` enumeration,
but any other error would have to be handled by its surrounding scope.

.. testcode:: errorHandling

   -> var vendingMachine = VendingMachine()
   << // vendingMachine : VendingMachine = REPL.VendingMachine
   -> vendingMachine.coinsDeposited = 10
   -> do {
          try vendingMachine.vend(itemNamed: "Candy Bar")
          // Enjoy delicious snack
      } catch VendingMachineError.InvalidSelection {
          print("Invalid Selection.")
      } catch VendingMachineError.OutOfStock {
          print("Out of Stock.")
      } catch VendingMachineError.InsufficientFunds(let coinsNeeded) {
          print("Insufficient funds. Please insert an additional \(coinsNeeded) coins.")
      }
   << Insufficient funds. Please insert an additional 2 coins.

In the above example,
the ``vend(itemNamed:)`` function is called in a ``try`` expression,
because it can throw an error.
If an error is thrown,
execution immediately transfers to the ``catch`` clauses,
which decide whether to allow propagation to continue.
If no error is thrown,
the remaining statements in the ``do`` statement are executed.

.. _ErrorHandling_Optional:

Handling Errors as Optional Values
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You use ``try?`` to handle an error by converting it to an optional value.
If an error is thrown while evaluating the ``try?`` expression,
the value of the expression is ``nil``.
For example, ``x`` and ``y`` have the same value and behavior in the following code:

.. testcode:: optional-try
    :compile: true

    -> func someThrowingFunction() throws -> Int {
          // ...
    >>    return 40
    -> }
    ---
    -> let x = try? someThrowingFunction()
    >> print(x)
    << Optional(40)
    ---
    -> let y: Int?
       do {
           y = try someThrowingFunction()
       } catch {
           y = nil
       }
    >> print(y)
    << Optional(40)

If ``someThrowingFunction()`` throws an error,
the value of ``x`` and ``y`` is ``nil``.
Otherwise, the value of ``x`` and ``y`` is the value that the function returned.
Note that ``x`` and ``y`` are an optional of whatever type ``someThrowingFunction()`` returns.
Here the function returns an integer, so ``x`` and ``y`` are optional integers.

.. TODO: Moving back from low-level up to high level.
   Suggest folding the para below into the para before the code listing,
   and combining the listings.

Using ``try?`` lets you write concise error handling code
for situations where you want to handle all errors in the same way.
For example,
the following code listing
displays cached data while waiting for new data to load.

.. testcode:: optional-try-cached-data

    >> func loadNewDataInBackground() -> Void { }
    >> func loadCachedData() throws -> Int { return 10 }
    >> func loadDataFromDisk() throws -> Int { return 10 }
    -> loadNewDataInBackground()
    -> if let data = try? loadCachedData() {
            // Show the cached data.
       } else if let data = try? loadDataFromDisk() {
            // Show the data from disk.
       } else {
           // Show UI that data is loading over the network
       }

Using optional binding with ``try?`` and ``else``-``if`` blocks
lets you express fallback code paths.
In the example above,
if attempting to load data from the cache throws an error,
it falls back to loading data from disk ---
if that also throws an error,
it handles the error by letting the user know
that data is being loaded over the network.


.. _ErrorHandling_Force:

Disabling Error Propagation
~~~~~~~~~~~~~~~~~~~~~~~~~~~

There are some cases in which you know a throwing function or method
won't, in fact, throw an error at run time.
In these cases,
you can write ``try!`` before the expression to disable error propagation
and wrap the call in a runtime assertion that no error will be thrown.
If an error actually is thrown, you'll get a runtime error.

.. testcode:: forceTryStatement

   >> enum Error : ErrorType { case E }
   >> let someError = Error.E
   << // someError : Error = REPL.Error.E
   -> func throwsIfArrayIsEmpty(array: [Any]) throws -> Void {
         if array.isEmpty {
            throw someError
         }
      }
   -> try! throwsIfArrayIsEmpty([1, 2, 3])

.. _ErrorHandling_Defer:

Specifying Clean-Up Actions
---------------------------

You use a ``defer`` statement to execute a set of statements
just before code execution leaves the current block of code.
This lets you do any necessary cleanup
that should be performed regardless
of *how* execution leaves the current block of code ---
whether it leaves because an error was thrown
or because of a statement like ``return`` or ``break``.
For example, you can use a ``defer`` statement
to ensure file descriptors are closed
and manually allocated memory is freed.

A ``defer`` statement defers execution until the current scope is exited.
It consists of the ``defer`` keyword and the statements to be executed later.
The deferred statements may not contain any code
that would transfer control out of the statements,
such as a ``break`` or a ``return`` statement,
or by throwing an error.
Deferred actions are executed in reverse order of how they are specified ---
that is, the code in the first ``defer`` statement executes
after code in the second, and so on.

.. testcode:: defer

   >> func exists(file: String) -> Bool { return true }
   >> struct File {
   >>    func readline() throws -> String? { return nil }
   >> }
   >> func open(file: String) -> File { return File() }
   >> func close(fileHandle: File) { }
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

The above example uses a ``defer`` statement
to ensure that the ``open(_:)`` function
has a corresponding call to ``close(_:)``.

.. note::

    You can use a ``defer`` statement
    even when there is no error handling code involved.
