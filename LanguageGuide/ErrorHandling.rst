Error Handling
==============

:newTerm:`Error handling` is the process of responding to
and recovering from error conditions in your program.
Swift provides first-class support for
throwing, catching, propagating, and manipulating
recoverable errors at runtime.

.. TODO Refactor and expand optionals discussion into separate chapter.

Some functions and methods
can't be guaranteed to always complete execution or produce a useful output.
Optionals are used to represent the absence of a value,
but when a function fails,
it's often useful to understand what caused the failure,
so that your code can respond accordingly.
In Swift, these are called :newTerm:`throwing functions` and :newTerm:`throwing methods`.

As an example, consider the task of reading and processing data from a file on disk.
There are a number of ways this task can fail, including
the file not existing at the specified path,
the file not having read permissions, or
the file not being encoded in a compatible format.
Distinguishing among these different situations
allows a program to resolve and recover from the error, and ---
if necessary --- communicate it to the user.

.. note::

   Error handling in Swift interoperates with error handling patterns
   that use NSError in Cocoa and Objective-C.
   For more information,
   see `Error Handling <//apple_ref/doc/uid/TP40014216-CH7-ID10>`_.
   in `Using Swift with Cocoa and Objective-C <//apple_ref/doc/uid/TP40014216>`_.

.. NOTE:

    If want to make a comparison to exception handling in other languages,
    we'll need to take about performance and other subtle differences.
    Leaving this discussion out for Xcode 7 beta 1.

.. _ErrorHandling_Represent:

Representing Errors
-------------------

In Swift, errors are represented by
values of types conforming to the ``ErrorType`` protocol.

Swift enumerations are particularly well-suited to modeling
a group of related error conditions,
with associated values allowing for additional information
about the nature of an error to be communicated.
Because of this, Swift enumerations adopt ``ErrorType``
automatically have the implementation of their conformance synthesized by the compiler.

For example, here's how you might represent the error conditions
of operating a vending machine:

.. testcode:: errorHandling

   -> enum VendingMachineError: ErrorType {
          case InvalidSelection
          case InsufficientFunds(required: Double)
          case OutOfStock
      }

In this example, a vending machine can fail for the following reasons:

* The requested item is not a valid selection, indicated by ``InvalidSelection``.
* The requested item's cost is greater than the provided funds,
  indicated by ``InsufficientFunds``.
  The associated ``Double`` value represents the balance
  required to complete the transaction.
* The request item is out of stock, indicated by ``OutOfStock``.

.. _ErrorHandling_Throw:

Throwing Errors
---------------

To indicate that a function or method can throw an error,
you write the ``throws`` keyword in its declaration,
after its parameters.
If it specifies a return type,
you write the ``throws`` keyword before the return arrow (``->``).
A function, method, or closure cannot throw an error unless explicitly indicated.

.. testcode:: throwingFunctionDeclaration

   -> func canThrowErrors() throws -> String
   >> { return "foo" }
   ---
   -> func cannotThrowErrors() -> String
   >> { return "foo" }

.. FIXME (Move to reference)

   Whether a function throws is considered part of its type.
   Function types that cannot throw are subtypes of function types that can throw.
   A function cannot be overloaded based solely on whether the function throws.
   However, a function can be overloaded based on whether a function parameter throws.
   For curried functions, the ``throws`` keyword only applies to the innermost function.

   A method that throws cannot override a method that doesn't throw,
   nor can it satisfy a protocol requirement for a method that doesn't throw.
   However, a method that doesn't throw can override a method that does throw,
   and can satisfy a protocol requirement for a method that does throw.

.. assertion:: throwingFunctionParameterTypeOverloadDeclaration

   -> func f() -> Int {}
   !! <REPL Input>:1:18: error: missing return in a function expected to return 'Int'
   !! func f() -> Int {}
   !! ^
   -> func f() throws -> Int {} // Compiler Error
   !! <REPL Input>:1:25: error: missing return in a function expected to return 'Int'
   !! func f() throws -> Int {} // Compiler Error
   !! ^
   

.. assertion:: throwingFunctionParameterTypeOverloadDeclaration

   -> func f(callback: Void -> Int) { }
   -> func f(callback: Void throws -> Int) { } // Allowed

.. TODO Add more assertions to test these behaviors

At any point in the body of a throwing function,
you can throw an error with a ``throw`` statement.
In the example below,
the ``vend(itemNamed:)`` function throws an error if
the requested item is not available,
is out of stock,
or has a cost that exceeds the current deposited amount:

.. testcode:: errorHandling

   -> struct Item {
         var price: Double
         var count: Int
      }
   ---
   -> var inventory = [
          "Candy Bar": Item(price: 1.25, count: 7),
          "Chips": Item(price: 1.00, count: 4),
          "Pretzels": Item(price: 0.75, count: 11)
      ]
   << // inventory : [String : Item] = ["Chips": REPL.Item(price: 1.0, count: 4), "Candy Bar": REPL.Item(price: 1.25, count: 7), "Pretzels": REPL.Item(price: 0.75, count: 11)]
   -> var amountDeposited = 1.00
   << // amountDeposited : Double = 1.0
   ---
   -> func vend(itemNamed name: String) throws {
          guard var item = inventory[name] else {
              throw VendingMachineError.InvalidSelection
          }

          guard item.count > 0 else {
              throw VendingMachineError.OutOfStock
          }

          if amountDeposited >= item.price {
              // Dispense the snack
              amountDeposited -= item.price
              --item.count
              inventory[name] = item
          } else {
              let amountRequired = item.price - amountDeposited
              throw VendingMachineError.InsufficientFunds(required: amountRequired)
          }
      }

First, a ``guard`` statement is used to bind the ``item`` constant and ``count`` variable
to the corresponding values in the current inventory.
If the item is not in the inventory, the ``InvalidSelection`` error is thrown.
Next, the availability of the requested item is determined by checking its count.
If ``count`` is less than or equal to zero,
an ``OutOfStock`` error is thrown.
Finally, the price of the requested item is compared to the current deposited amount.
If the deposited amount can cover the cost of the item,
the price is deducted from the deposited amount,
the count of the stock of the item is decremented in the inventory,
and the function returns the requested item.
Otherwise, the outstanding balance is calculated
and used as an associated value for the thrown ``InsufficientFunds`` error.
Because a ``throw`` statement immediately transfers program control,
an item will be vended only if all of the requirements for purchase ---
that is, a valid, in-stock selection with sufficient funds ---
are met.

When you call a throwing function, you write ``try`` in front of the call.
This keyword calls out the fact that the function can throw an error
and that the lines of code after the ``try`` might not be run.

..
    Calls to methods and functions that can throw
    must be executed in a ``try`` expression,
    which consists of the ``try`` keyword,
    followed by a statement or expression that can implicitly throw.
    A ``try`` statement acknowledges the error
    and allows it to continue propagation.

.. testcode:: errorHandling

    -> let favoriteSnacks = [
           "Alice": "Chips",
           "Bob": "Licorice",
           "Eve": "Pretzels",
       ]
    << // favoriteSnacks : [String : String] = ["Bob": "Licorice", "Alice": "Chips", "Eve": "Pretzels"]
    -> func buyFavoriteSnack(person: String) throws {
           let snackName = favoriteSnacks[person] ?? "Candy Bar"
           try vend(itemNamed: snackName)
       }

The ``buyFavoriteSnack`` function looks up the given person's favorite snack
and tries to buy it for them.
If they don't have a favorite snack listed, it tries to buy a candy bar.
It calls the ``vend`` function, which is a throwing function,
so the function call is marked with ``try`` in front of it.
The ``buyFavoriteSnack`` function is also a throwing function,
so any errors that the ``vend`` function throws
propagate up to the point where the ``buyFavoriteSnack`` function was called.

.. FIXME

    Move this to the Reference

    .. _ErrorHandling_Rethrow:

    rethrows
    ~~~~~~~~

    A function that takes a function parameter that throws
    can be declared with the ``rethrows`` keyword
    to indicate that,
    although the function itself does not throw errors,
    errors thrown by a function parameter will be propagated to the caller.

    .. TODO Example

    .. testcode:: rethrows

       -> func functionWithCallback(callback: () throws -> Int) rethrows {
              try callback()
          }

    .. note::

       A ``rethrows`` function is considered to throw,
       except in the case where a direct call is made and
       none of the function arguments throw.

       A method that throws cannot override a method that rethrows,
       and a rethrows method cannot override a method that doesn't throw.
       However, a method that throws can be overridden by method that rethrows,
       a method that rethrows can be overridden by a method that doesn't throw.
       The same rules apply for methods satisfying protocol requirements
       for methods that rethrow, throw, or don't throw.


.. _ErrorHandling_Catch:

Catching and Handling Errors
----------------------------

You use a ``do``-``catch`` statement to catch errors and handle them.

.. FIXME A little more intro.

.. syntax-outline::

   do {
      try <#function that throws#>
      <#statements#>
   } catch <#pattern#> {
      <#statements#>
   }

If an error is thrown,
that error is propagated to its outer scope
until it is handled by a ``catch`` clause.
A ``catch`` clause consists of the ``catch`` keyword,
followed by a pattern to match the error against and a set of statements to execute.

Like a ``switch`` statement,
the compiler attempts to infer whether ``catch`` clauses are exhaustive.
If such a determination can be made, the error is considered handled.
Otherwise, the containing scope must handle the error,
or the containing function must be declared with ``throws``.
To ensure that an error is handled,
use a ``catch`` clause with a pattern that matches all errors.
If a ``catch`` clause does not specify a pattern,
the clause will match and bind any error to a local constant named ``error``.

See :doc:`../ReferenceManual/Patterns` for more information about pattern matching.

.. testcode:: errorHandling

   -> do {
          let snack = try vend(itemNamed: "Candy Bar")
          // Enjoy delicious snack
      } catch VendingMachineError.InvalidSelection {
          print("Invalid Selection.")
      } catch VendingMachineError.OutOfStock {
          print("Out of Stock.")
      } catch VendingMachineError.InsufficientFunds(let amountRequired) {
          print("Insufficient funds. Please insert an additional $\(amountRequired).")
      }

In the above example,
the ``vend(itemNamed:)`` function is called.
Because the function can throw an error,
it is executed in a ``try`` expression.
If an error is thrown,
execution immediately transfers out of the ``do`` statement
to the ``catch`` clauses,
which decide whether or not to allow propagation to continue.
If no error is thrown,
the return value of ``vend(itemNamed:)`` is assigned to ``snack``,
and the remaining statements in the ``do`` statement are executed.

.. _ErrorHandling_Force:

Disabling Compiler Checks for Error Handling
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To indicate that a call to a function declared with the ``throws`` keyword
will not throw an error at runtime,
execute it in a :newTerm:`forced-try` expression.
Doing so will wrap the function call in an assertion,
such that if an error is thrown,
a runtime error is triggered.

A forced-try expression takes the same form of a try expression,
except with an exclamation mark (``!``) appended to the ``try`` keyword.

.. testcode:: forceTryStatement

   >> enum Error : ErrorType { case E }
   >> let someError = Error.E
   -> func willOnlyThrowIfTrue(value: Bool) throws {
         if value { throw someError }
      }
   ---
   -> do {
         try willOnlyThrowIfTrue(false)
      } catch {
         // Handle Error
      }
   ---
   -> try! willOnlyThrowIfTrue(false)

.. _ErrorHandling_Defer:

Specifying Clean-Up Actions
~~~~~~~~~~~~~~~~~~~~~~~~~~~

A ``defer`` statement defers execution until the current scope is exited.
It consists of the ``defer`` keyword and the statements to be executed later.
The deferred statements may not contain any code
that would transfer control out of the statements,
such as a ``break`` or a ``return`` statement,
or by throwing an error.
Deferred actions are executed in reverse order of how they are specified ---
that is, the code in the first ``defer`` statement executes
after code in the second, and so on.

You use a ``defer`` statement to do any necessary cleanup
that should be performed regardless of whether an error occurred or not.
Examples include closing any open file descriptors
and freeing any manually allocated memory.

.. TODO Example

.. testcode:: defer

   -> func processFile(filename: String) throws {
         if exists(filename) {
            let file = open(filename)
            defer close(file)
            while let line = try file.readline() {
               /* */
            }
            // close(_:) occurs here, at the end of the formal scope.
         }
      }

The above example uses a ``defer`` statement
to ensure that the ``open(_:)`` function
has a corresponding call to ``close(_:)``.
This statement is executed regardless of whether an error is thrown.
