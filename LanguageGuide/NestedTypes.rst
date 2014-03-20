Nested Types
============

:newTerm:`Nested types` are a way to define custom enumerations, classes and structures
to support the functionality of another type.
The definition for a nested type is written within the braces of the type it supports,
and types can be nested to as many levels as are required.

For example:

.. testcode:: nestedTypes

    --> struct PlayingCard {
            let rank: Rank
            let suit: Suit
            enum Rank {
                case Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten
                case Jack, Queen, King, Ace
            }
            enum Suit : UnicodeScalar {
                case Spades = '♠', Hearts = '♡', Diamonds = '♢', Clubs = '♣'
            }
        }
    --> let theAceOfSpades = PlayingCard(.Ace, .Spades)
    <<< // theAceOfSpades : PlayingCard = PlayingCard(<unprintable value>, <unprintable value>)

This example defines a structure to represent any of
the 52 playing cards in a standard deck.

The ``PlayingCard`` structure has two properties,
called ``rank`` and ``suit``.
Their types are defined by two nested enumerations:

* ``Rank``, which enumerates the thirteen possible playing card ranks
* ``Suit``, which enumerates the four common playing card suits,
  and associates each of them with
  a raw ``UnicodeScalar`` value to represent their symbol

Because ``PlayingCard`` is a structure with no custom initializers,
it has an implicit memberwise initializer
(as described in :ref:`Initialization_MemberwiseStructureInitializers`).
This is used to initialize a new constant called ``theAceOfSpades``.
Even though ``Rank`` and ``Suit`` are nested within ``PlayingCard``,
their type can still be inferred from the context,
and so the initialization of this instance is able to refer to the enumeration members
by their member names (``.Ace`` and ``.Spades``) alone.

.. QUESTION: should the "Memberwise Structure Initializers" link in this paragraph
   go to the short introduction of the subject in this chapter,
   or should it go to somewhere in the Initializers chapter?

.. _NestedTypes_ReferringToNestedTypes:

Referring to Nested Types
~~~~~~~~~~~~~~~~~~~~~~~~~

A nested type can be used outside of its definition context,
by prefixing its name with the name of the type it is nested within:

.. testcode:: nestedTypes

    --> let heartsSymbol = PlayingCard.Suit.Hearts.toRaw()
    <<< // heartsSymbol : UnicodeScalar = '♡'
    /-> heartsSymbol is '\(heartsSymbol)'
    <-/ heartsSymbol is '♡'

For the example above, 
this enables the names of ``Suit`` and ``Rank`` to be kept short,
because their names are naturally qualified by the context in which they are defined.
