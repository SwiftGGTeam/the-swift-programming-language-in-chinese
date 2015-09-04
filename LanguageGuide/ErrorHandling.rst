Error Handling
==============

:newTerm:`Error handling` is the process of responding to
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

.. note::

   Error handling in Swift interoperates with error handling patterns
   that use the ``NSError`` class in Cocoa and Objective-C.
   For more information about this class,
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
This empty protocol indicates that a type
can be used for error handling.

Swift enumerations are particularly well suited to modeling
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

Throwing an error lets you indicate that something unexpected happened
and the normal flow of execution can't continue.
You use a ``throw`` statement to throw an error.
For example,
the following code throws an error to indicate
that five additional coins are needed by the vending machine:

.. testcode:: throw-enum-error

   -> throw VendingMachineError.InsufficientFunds(coinsNeeded: 5)
   xx fatal error

.. _ErrorHandling_Catch:

Handling Errors
---------------

When an error is thrown,
some surrounding piece of code must be responsible
for handling the error ---
for example, by correcting the problem,
trying an alternative approach,
or informing the user of the failure.

There are four ways to handle errors in Swift.
You can propagate the error from a function to the code that calls that function,
handle the error using a ``do``-``catch`` statement,
handle the error as an optional value,
or assert that the error will not occur.
Each approach is described in a section below.

When a function throws an error,
it changes the flow of your program,
so it's important that you can quickly identify places in your code that can throw errors.
To identify these places in your code, write the ``try`` keyword ---
or the ``try?`` or ``try!`` variation ---
before a piece of code that calls a function, method, or initializer that can throw an error.
These keywords are described in the sections below.

.. note::

   Error handling in Swift resembles exception handling in other languages,
   with the use of the ``try``, ``catch`` and ``throw`` keywords.
   Unlike exception handling in many languages ---
   including Objective-C ---
   error handling in Swift does not involve unwinding the call stack,
   a process that can be computationally expensive.
   As such, the performance characteristics
   of a ``throw`` statement
   are comparable to those of a ``return`` statement.


.. _ErrorHandling_Throw:

Propagating Errors Using Throwing Functions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To indicate that a function, method, or initializer can throw an error,
you write the ``throws`` keyword in the function's declaration
after its parameters.
A function marked with ``throws`` is called a :newTerm:`throwing function`.
If the function specifies a return type,
you write the ``throws`` keyword before the return arrow (``->``).

.. TODO Add discussion of throwing initializers

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

A throwing function propagates errors that are thrown inside of it
to the scope from which it's called.

.. note::

    Only throwing functions can propagate errors.
    Any errors thrown inside a nonthrowing function
    must be handled inside the function.

In the example below,
the ``VendingMachine`` class has a ``vend(itemNamed:)`` method
that throws an appropriate ``VendingMachineError``
if the requested item is not available,
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
              print("Dispensing \(snack)")
          }
   ---
   ->     func vend(itemNamed name: String) throws {
              guard var item = inventory[name] else {
                  throw VendingMachineError.InvalidSelection
              }

              guard item.count > 0 else {
                  throw VendingMachineError.OutOfStock
              }

              guard item.price <= coinsDeposited else {
                  throw VendingMachineError.InsufficientFunds(coinsNeeded: item.price - coinsDeposited)
              }

              coinsDeposited -= item.price
              --item.count
              inventory[name] = item
              dispenseSnack(name)
          }
      }

The implementation of the ``vend(itemNamed:)`` method
uses ``guard`` statements to exit the method early and throw appropriate errors
if any of the requirements for purchasing a snack aren't met.
Because a ``throw`` statement immediately transfers program control,
an item will be vended only if all of these requirements are met.

Because the ``vend(itemNamed:)`` method propagates any errors it throws,
places in your code that call it must either handle the errors directly---
using a ``do``-``catch`` statement, ``try?``, or ``try!``---
or continue to propagate them.
For example,
the ``buyFavoriteSnack(_:vendingMachine:)`` in the example below
is also a throwing function,
and any errors that the ``vend(itemNamed:)`` method throws will
propagate up to the point where the ``buyFavoriteSnack(_:vendingMachine:)`` function is called.

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

In this example,
the ``buyFavoriteSnack(_:vendingMachine:)`` function looks up a given person's favorite snack
and tries to buy it for them by calling the ``vend(itemNamed:)`` method.
Because the ``vend(itemNamed:)`` method can throw an error,
it's called with the ``try`` keyword in front of it.

.. _ErrorHandling_DoCatch:

Handling Errors Using Do-Catch
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You use a ``do``-``catch`` statement to handle errors
by running a block of code.
If an error is thrown by the code in the ``do`` clause,
it is matched against the ``catch`` clauses
to determine which one of them can handle the error.

Here is the general form of a ``do``-``catch`` statement:

.. syntax-outline::

   do {
       try <#expression#>
       <#statements#>
   } catch <#pattern 1#> {
       <#statements#>
   } catch <#pattern 2#> where <#condition#> {
       <#statements#>
   }

You write a pattern after ``catch`` to indicate what errors
that clause can handle.
If a ``catch`` clause doesn't have a pattern,
the clause matches any error
and binds the error to a local constant named ``error``.
For more information about pattern matching,
see :doc:`../ReferenceManual/Patterns`.

The ``catch`` clauses don't have to handle every possible error
that the code in its ``do`` clause can throw.
If none of the ``catch`` clauses handle the error,
the error propagates to the surrounding scope.
However, the error must handled by *some* surrounding scope ---
either by an enclosing ``do``-``catch`` clause
that handles the error
or by being inside a throwing function.
For example, the following code handles all three cases
of the ``VendingMachineError`` enumeration,
but all other errors have to be handled by its surrounding scope:

.. TODO: Call out the reasoning why we don't let you
   consider a catch clause exhaustive by just matching
   the errors in an given enum without a general catch/default.

.. testcode:: errorHandling

   -> var vendingMachine = VendingMachine()
   << // vendingMachine : VendingMachine = REPL.VendingMachine
   -> vendingMachine.coinsDeposited = 8
   -> do {
          try buyFavoriteSnack("Alice", vendingMachine: vendingMachine)
      } catch VendingMachineError.InvalidSelection {
          print("Invalid Selection.")
      } catch VendingMachineError.OutOfStock {
          print("Out of Stock.")
      } catch VendingMachineError.InsufficientFunds(let coinsNeeded) {
          print("Insufficient funds. Please insert an additional \(coinsNeeded) coins.")
      }
   <- Insufficient funds. Please insert an additional 2 coins.

In the above example,
the ``buyFavoriteSnack(_:vendingMachine:)`` function is called in a ``try`` expression,
because it can throw an error.
If an error is thrown,
execution immediately transfers to the ``catch`` clauses,
which decide whether to allow propagation to continue.
If no error is thrown,
the remaining statements in the ``do`` statement are executed.

.. _ErrorHandling_Optional:

Converting Errors to Optional Values
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You use ``try?`` to handle an error by converting it to an optional value.
If an error is thrown while evaluating the ``try?`` expression,
the value of the expression is ``nil``.
For example,
in the following code ``x`` and ``y`` have the same value and behavior:

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

Using ``try?`` lets you write concise error handling code
when you want to handle all errors in the same way.
For example,
the following code
uses several approaches to fetch data,
or returns ``nil`` if all of the approaches fail.

.. testcode:: optional-try-cached-data

    >> struct Data {}
    >> func fetchDataFromDisk() throws -> Data { return Data() }
    >> func fetchDataFromServer() throws -> Data { return Data() }
    -> func fetchData() -> Data? {
           if let data = try? fetchDataFromDisk() { return data }
           if let data = try? fetchDataFromServer() { return data }
           return nil
       }

.. _ErrorHandling_Force:

Disabling Error Propagation
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Sometimes you know a throwing function or method
won't, in fact, throw an error at runtime.
On those occasions,
you can write ``try!`` before the expression to disable error propagation
and wrap the call in a runtime assertion that no error will be thrown.
If an error actually is thrown, you'll get a runtime error.

For example, the following code uses a ``loadImage(_:)`` function,
which loads the image resource at a given path
or throws an error if the image can't be loaded.
In this case, because the image is shipped with the application,
no error will be thrown at runtime,
so it is appropriate to disable error propagation.

.. testcode:: forceTryStatement

   >> struct Image {}
   >> func loadImage(path: String) throws -> Image {
   >>     return Image()
   >> }
   -> let photo = try! loadImage("./Resources/John Appleseed.jpg")
   << // photo : Image = REPL.Image()

.. _ErrorHandling_Defer:

Specifying Cleanup Actions
--------------------------

You use a ``defer`` statement to execute a set of statements
just before code execution leaves the current block of code.
This statement lets you do any necessary cleanup
that should be performed regardless
of *how* execution leaves the current block of code ---
whether it leaves because an error was thrown
or because of a statement such as ``return`` or ``break``.
For example, you can use a ``defer`` statement
to ensure that file descriptors are closed
and manually allocated memory is freed.

A ``defer`` statement defers execution until the current scope is exited.
This statement consists of the ``defer`` keyword and the statements to be executed later.
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
    even when no error handling code is involved.
