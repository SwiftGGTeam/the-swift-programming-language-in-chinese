Memory Safety
=============

In Swift, the term _safety_ generally refers to :newTerm:`memory safety`.
Although there are other types of safety, such as type safety,


You can see this by looking in the standard library
for types and functions that include the word "unsafe" in their name.
Those APIs don't guarantee memory safety,
so it's your responsibility to review your code
when you use them.

Some safety violations are detected by the compiler,
which gives you a compile-time error.
Some violations can't be detected at compile time,
such as an array index being past the end of the array,
and these are detected at runtime.
In general,
Swift detects as many safety violations as possible
at compile time.

At runtime,
when a safety violation is detected,
program execution stops immediately.
(Using a mechanism called a "trap" to halt
in a controlled, predictable manner.)
Because safety violations are *programmer errors*,
Swift traps instead of throwing an error.
Swift's error-handling mechanism is for recoverable errors;
programmer error, such as a safety violation,
is not recoverable.
Stopping execution immediately, at the point of the violation,
prevents propogating invalid state to other parts of the program
which can corrupt the program's state and the user's data.
A predictable, immediate failure is also easier to debug.

There are several aspects of memory safety that Swift enforces:

* Variables must have a value assigned to them
  before they can be read.
  This guarantee is sometimes called :newTerm:`definite initialization`.

.. TR: Definite or difinitive?  I prefer the former, but I've seen both.

* Only memory that is part of a data structure
  can be accessed through that data structure.
  For example, reading past the end of an array
  is an error,
  it doesn't access the adjacent memory.

* The only kind of overlapping access to a region of memory
  is a read overlapping with a read.

The third guarantee above is called :newTerm:`exclusive access`.
The rest of this chapter discusses this guarantee.

.. XXX: Above needs a bit of polish.

Memory Access Isn't Always Instantaneous
----------------------------------------

When you think about how your program executes,
in many cases the smallest unit you consider
is an individual line of code.
However, within each line of code,
Swift performs several actions.
For example,
consider the steps needed
to execute the second line in the following code listing::

	let numbers = [10, 20, 30]
	let newNumbers = numbers.map { $1 + 100 }

Swift performs the following granular steps:

* Start reading from ``numbers``.
* Execute the body of the closure three times,
  accumulating the result in a new array.
* Finish reading from ``numbers``.
* Assign the new array as the value of ``newNumbers``.

Note in particular that
Swift is accessing ``numbers`` for the entire duration
of the ``map`` operation.
Because the read access spans several steps
in the execution,
it's possible for it to overlap with other accesses.
For example::

	let numbers = [10, 20, 30]
	let newNumbers = numbers.map { $1 + numbers[0] }

This time,
instead of adding a constant amount to each element,
the closure body adds the value of the first element
to each element in ``numbers``.
This overlapping access is safe
because both accesses are reading from the array.

.. XXX: FIGURE: map

In contrast,
consider an in-place version of ``map`` called ``mapInPlace``:

.. XXX: Add an implementation of mapInPlace.
   The outline has one based on Collection.map,
   but there might be a way to simplify it.

	var numbers = [10, 20, 30]
	numbers.mapInPlace { $1 + numbers[0] }  // Error

Because ``mapInPlace`` changes the array,
it has a write access to ``numbers`` for the duration.
Just like the read access for ``map``,
the write access for ``mapInPlace`` spans several steps ---
overlapping with the read inside the closure
to get the first element of the array.
Differt parts of the program
are reading from and writing to the same memory at the same time.
In this case,
you can see the ambiguity
by considering what the value of ``numbers`` should be
after running the code.
Should ``numbers[0]`` access the first element
of the original array,
giving an answer of ``[20, 30, 40]``
or should it access the first element
after it was transformed in place,
giving an answer of ``[20, 40, 50]``?




Swift provides safe access to the memory used to run your app.
Fundamental data abstractions like variables, structures, arrays, and functions
are built around principled use and reuse of the underlying memory.
The principles used to build these abstractions are what provide
memory safety in Swift.

Memory safety protects against using a given region of memory
for anything other than the purposes required by your code.
For example, memory safety prevents you from accessing the hundredth element
in a ten-element array.




.. OUTLINE
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
