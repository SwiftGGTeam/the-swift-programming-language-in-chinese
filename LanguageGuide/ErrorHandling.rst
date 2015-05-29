Error Handling
==============

:newTerm:`Error handling` is the process of responding to
and recovering from error conditions in your program.
Swift provides a performant way to
throw, catch, propagate, and manipulate
recoverable errors at runtime.

.. TODO Refactor and expand optionals discussion into separate chapter.

Some functions and methods
cannot be guaranteed to always complete execution or produce a useful output.
Optionals are often used to represent the absence of a value,
but when a function fails,
it's often useful to understand what caused the failure,
so that your code can respond accordingly.

As an example, consider the task of reading and processing data from a file on disk.
There are a number of ways that this task can fail, including
the file not existing at the specified path,
the file not having read permissions, or
the file not being encoded in a compatible format.
Distinguishing among these different situations
allows a program to resolve and recover from the error, and ---
if necessary --- communicate it to the user.

.. note::

   Error handling in Swift is similar to exception handling in other languages,
   and is bridged to Cocoa's ``NSError`` class in Objective-C.

   For more information about error handling with Foundation and Cocoa,
   see `Using Swift with Cocoa and Objective-C <//apple_ref/doc/uid/TP40014216>`_.

Representing Errors
-------------------

In Swift, errors are represented by
instances of types conforming to the ``ErrorType`` protocol.

Swift enumerations automatically conform to ``ErrorType``,
making them particularly well-suited to modeling
a group of related error conditions.
Using associated values for enumeration cases provides
more specific information about the nature of a particular error.

For example, here's how you might represent the error conditions
of operating a vending machine:

.. testcode:: errorType

   -> enum VendingMachineError: ErrorType {
          case InvalidSelection
          case InsufficientFunds(required: Double)
          case OutOfStock
      }

In this example, a vending machine can fail for the following reasons:

* ``InvalidSelection``: The requested item is not a valid selection.
* ``InsufficientFunds``: The requested item's cost is greater than the provided funds.
  The associated ``Double`` value represents the balance
  required to complete the transaction.
* ``OutOfStock``: The request item is out of stock.

Throwing Errors
---------------

A function type indicates that it manages an error condition
by including the ``throws`` keyword in its declaration.
If a function type specifies an explicit return type,
the ``throws`` keyword is placed before the return arrow (``->``).
A function, method, or closure cannot throw an error unless explicitly indicated.

.. testcode:: throwingFunctionDeclaration

   -> func canThrowErrors() throws -> Void
   >> { }
   ---
   -> func cannotThrowErrors() -> Void
   >> { }

.. note::

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

   -> func foo() -> Int {}
   !! error: missing return in a function expected to return 'Int'
   -> func foo() throws -> Int {} // Compiler Error
   !! error: invalid redeclaration of foo()

.. assertion:: throwingFunctionParameterTypeOverloadDeclaration

   -> func bar(callback: Void -> Int) { }
   -> func bar(callback: Void throws -> Int) { } // Allowed

.. TODO Add more assertions to test these behaviors

A function type that throws may trigger an error condition
at any point in its execution with a ``throw`` statement,
which consists of the ``throw`` keyword,
followed by an instance of a type that conforms to the ``ErrorType`` protocol.

.. TODO Original example

.. testcode:: errorHandling

   >> enum AudioOutputError {
   >>    case Overload
   >> }
   >> var volume = 5
   >> let maximumVolume = 11
   -> func increaseVolume() throws -> Int {
         if volume >= maximumVolume {
            throw AudioOutputError.Overload
         }
         return ++volume
      }

In the above example,
an error is thrown if incrementing the volume would exceed the maximum allowed value.
Because ``throw`` immediately transfers program control,
the ``volume`` variable is not incremented in the case of an error.

rethrows
~~~~~~~~

A function that takes a function parameter that throws
can be declared with the ``rethrows`` keyword
to indicate that,
although the function itself does not throw errors,
errors thrown by a function parameter will be propagated to the caller.

.. TODO Example

.. testcode:: rethrow

   -> func foo(callback: Void throws -> Int) rethrows {
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


Catching and Handling Errors
----------------------------

Statements and expressions that can implicitly throw
must be executed in a ``try`` expression,
which consists of the ``try`` keyword
followed by a statement or expression that can implicitly throw.

If an error is thrown,
that error is propagated to the outer scope of the ``try`` expression
until it is handled by a ``catch`` clause.
A ``catch`` clause consists of the ``catch`` keyword,
followed by a pattern to match the error against and a set of statements to execute.

.. testcode:: catchStatementDeclaration

   -> do {
         try foo()
      } catch let error as StandardError.IO {
         // Handle I/O Error
      } catch let error as StandardError {
         // Handle other StandardError
      } catch let error {
         // Handle any other error
      }

Like a ``switch`` statement,
the compiler attempts to infer whether ``catch`` clauses are exhaustive.
If such a determination can be made, the error is considered handled.
Otherwise, the containing scope must handle the error,
or the containing function must be declared with ``throws``.
To ensure that an error is handled,
use a ``catch`` clause with no pattern as a catch-all case.

.. TODO Reference Pattern Matching chapter

See :doc:`../ReferenceManual/Patterns` for more information about pattern matching.

.. TODO Real example

.. testcode:: errorHandling

   -> do {
         let newVolume = try increaseVolume()
      }
      catch AudioOutputError.Overload {
         // Handle audio overload.
      }
      catch {
         // Handle any other error.
      }

In the above example,
the function ``increaseVolume()`` is called.
Because the function can throw an error,
it is executed in a ``try`` expression.
If an error is thrown by ``increaseVolume()``,
execution immediately transfers out of the ``do`` statement,
and evaluates each ``catch`` clause until a matching pattern is found.
If no error is thrown,
the return value of ``increaseVolume()`` is assigned to ``newVolume``.

Disabling Compiler Checks for Error Handling
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To indicate that a function declared with the ``throws`` keyword
will not actually throw an error at runtime,
append an exclamation point (``!``) to the ``try`` keyword of a ``try`` expression.
Doing so will disable any compiler checks for error handling,
and treat the expression as if it did not throw.

.. testcode:: forceTryStatement

   -> func willNotActuallyThrowAnError() throws {}
   ---
   -> do {
         try willNotActuallyThrowAnError()
      } catch {
         // Handle Error
      }
   ---
   -> try! willNotActuallyThrowAnError()

If an error is thrown by a function wrapped in a forced-try statement,
a runtime error is triggered.

Deferring Statements During Error Handling
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A ``defer`` statement defers execution until the current scope is exited.
It consists of the ``defer`` keyword and the statements to be executed later.
The deferred statements may not contain a control transfer statement,
such as ``break`` or ``return``,
or a statement that would otherwise cause the function to terminate early.

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
