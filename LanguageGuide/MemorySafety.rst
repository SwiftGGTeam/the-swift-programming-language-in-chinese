Memory Safety
=============

.. write-me::

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
