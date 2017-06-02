Memory Safety
=============

.. write-me::

.. OUTLINE

   Memory Safety vs Type Safety
   they both prevent nonsense/invalid operators
   type safety prevents things like let x: Int = "s"
   memory safety prevents things like array[9] on an eight-element array

   Trapping Is a Good Thing
   the choices at runtime are limited when an action would be unsafe
   we could return a sentinel/invalid/made-up value that looks probably valid, hiding the error
   we could do like C does and let the compiler just make something up
   we could trap -- immediate & predictable means easier to debug

   Safety is enforced at compile time, at runtime, and by your code review.

   compile time: let x: Int8 = 9000
   compile time: array.sort { $0 < array[0] }

   runtime: array[i] // i is out of bounds
   runtime: 

   "Your code review" or "manually" is for places where you explicitly took
   ownership of the safety of a piece of code -- for example using an UnsafeFoo
   pointer type or marking something with @exclusivity(unchecked).  This is
   typically done because the compiler would need to use dynamic checks, but
   the runtime cost of such checks is too great, so you do manual static
   checking instead.

.. Useful bits from the release notes:

   Static checks are used for most local variables, constants, and parameters. In
   Swift 4 mode, static failures are errors and will block code from successfully
   compiling. In general, developers will need to rearrange their code (for
   example, by adding a local copy) to prevent these conflicting accesses. In
   Swift 3 mode, static failures are merely a warning, but this will be
   strengthened to an error in a future release of Swift, so developers should
   take action to fix any of these warnings they find.

   Dynamic checks are used for global variables, static type properties, class
   instance properties, and local variables that have been captured in an
   @escaping closure. In Swift 4 mode, failing a dynamic check will cause a trap,
   much like integer overflow does. In Swift 3 mode, failing a dynamic check
   merely causes a warning to be printed to stderr.

   The compile-time and run-time checks enforce the rule for accesses that occur
   within the same thread. Thread Sanitizer will be able to catch most (but not
   all) violations that occur from different threads.

Exclusive Access to Memory
--------------------------

Swift enforces :newTerm:`exclusive access` to memory,
which is defined as follows:
Two accesses to the same mutable memory ---
global and local variables, class and structure properties, and so on ---
are not allowed to overlap, unless both accesses are reads.

Exclusive access is enforced in three different ways:

- **Statically**
  Swift detects some violations at compile time
  and gives you a warning or an error.

- **Dynamically**
  Swift inserts runtime checks
  for things that it can't enforce at compile time.

- **Manually**
  When working with unsafe pointers,
  and in code that you have explicitly marked
  with ``@exclusivity(unchecked)``,
  Swift doesn't enforce exclusivity.
  It's your responsibility to ensure the correctness of this code.

.. List what you can enforce statically vs dynamically.

.. Additions from the re-review of the SE proposal.

    https://github.com/apple/swift-evolution/commit/d61c07df2f02bee6c00528e73fbe33738288179a

    Local variables captured by escaping closures usually require dynamic enforcement.
    Local variables captured by non-escaping closures always use static enforcement.

    - A function may not call a non-escaping function parameter
      passing a non-escaping function parameter as an argument.

      For the purposes of this rule, a closure which captures a
      non-escaping function parameter is treated as if it were
      that parameter.

    - Programmers using ``withoutActuallyEscaping`` should take
      care not to allow the result to be recursively invoked.

       A nonescaping closure can't be called from inside another nonescaping closure
       if both closures capture the same local variables.
       (Unless one is defined inside the other,
