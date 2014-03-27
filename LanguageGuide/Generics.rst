.. docnote:: Subjects to be covered in this section

   * Array
   * Dictionary
   * (any other generics from the Standard Library)
   * Typing of generics
   * Working with subscripts
   * Creating one's own generics

Generics
========

.. write-me::

.. where do I mention SomeType.self, SomeType.Type and all that malarkey?
   I'm going to have to talk about passing around types at some point,
   but that tends to blow people's brains. Might it go in here?

Associated Types
----------------

.. write-me::

.. Associated typealiases
.. …with default types
.. perhaps this should be pushed forward to Generics,
   as that's where it really comes in useful?

Self with a capital S
---------------------

.. write-me::

.. Self as the dynamic type of the current type

Operators
---------

.. write-me::

.. Protocols can require the implementation of operators (though assignment operators are broken)
.. Likewise for requiring custom operators
.. However, Doug thought that this might be better covered by Generics,
   where you know that two things are definitely of the same type.
   Perhaps mention it here, but don't actually show an example?

Subscripts
----------

.. write-me::

.. Protocols can require conforming types to provide specific subscripts
.. These typically return a value of type T, which is why I've moved this here

Collections
-----------

.. Explain that Array<T> and Dictionary<T, U> are actually generics
.. Describe how to create a Stack<T> as an example of custom collections

Generic Enumerations
--------------------

.. Describe how Optional<T> actually works

.. refnote:: References

   * https://[Internal Staging Server]/docs/whitepaper/GuidedTour.html#generics
   * https://[Internal Staging Server]/docs/Generics%20Syntax%20Tradeoffs.html