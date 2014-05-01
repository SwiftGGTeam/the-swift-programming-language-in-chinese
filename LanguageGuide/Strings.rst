Strings and Characters
======================

Strings
-------

.. write-me::

.. x the String type
.. x mention bridging to NSString
.. x how to construct a String from a double-quote string literal
.. x how to construct an empty String
.. x how to construct from length and Character (cf Array)
.. x strings are immutable / relationship with var and let
.. x strings are value types, not reference types

Characters
----------

.. write-me::

.. x the Character type (handwavey for now as to what it means in Unicode terms)
.. x escaped characters such as '\n'
.. x unicode escaped code points such as '\u0041' and '\U0001F436'
.. x how to construct a Character from a single-quote character literal
.. x how to construct an empty Character

String and Character Concatenation
----------------------------------

.. write-me::

.. x adding two Strings / a String and a Character / two Characters to make a String
.. x appending a String or a Character onto a String

String as a Collection of Characters
------------------------------------

.. write-me::

.. x iterating over a String
.. x String is a collection of Characters
.. x countElements(someString) to get the number of Characters in a String, *not* length
.. x explain the difference between String's Characters, and NSString's UTF-16 code unit length

Comparing Strings
-----------------

.. write-me::

.. x equivalence for String in Swift (right now)
.. x isEmpty property for == ""

String Functions and Methods
----------------------------

.. write-me::

.. .split()
.. .startsWith() and .endsWith()
.. slicing a String (based on a good example to come from Dave)
.. String can't be indexed with integers (again, cf NSString)
.. bidirectional indexing (and why this is the case)
.. uppercaseString and lowercaseString??
.. will Character have an uppercase and lowercase method?
.. other generic functions from Collection
   Reverse / reverse()?
   Reverse is a type that you can construct from a Collection that has a BidirectionalIndex
   startIndex
   endIndex
   subscript
.. isAlpha() - on Character too?
.. isDigit() - on Character too?
.. isSpace() - on Character too? Don't mention these three until after the second API meeting.
.. init from other types to print their values (do we cover this?)
.. toInt()
.. substr()
.. splitFirst()
.. splitFirstIf()
.. splitIf()