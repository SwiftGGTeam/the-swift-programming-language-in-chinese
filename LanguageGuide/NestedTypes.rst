Nested Types
============

Enumerations are often created to support a specific class or structure's functionality.
Similarly, it can sometimes be convenient to define utility classes and structures
purely for use within the context of a more complex type.
To achieve this, Swift provides a way to define :newTerm:`nested types`.
Nested types enable you to nest supporting enumerations, classes and structures
within the definition of the type they support.

The definition for a nested type is written within the braces of the type it supports.
Types can be nested to as many levels as are required:

.. testcode:: nestedTypes

   -> struct BlackjackCard {
         enum Suit: Character {
            case Spades = "♠", Hearts = "♡", Diamonds = "♢", Clubs = "♣"
         }
         enum Rank: String {
            case Two = "2", Three = "3", Four = "4", Five = "5", Six = "6"
            case Seven = "7", Eight = "8", Nine = "9", Ten = "10"
            case Jack = "Jack", Queen = "Queen", King = "King", Ace = "Ace"
            struct Values {
               let first: Int
               let second: Int?
            }
            var values: Values {
               switch self {
                  case .Ace:
                     return Values(first: 1, second: 11)
                  case .Jack, .Queen, .King:
                     return Values(first: 10, second: nil)
                  default:
                     return Values(first: self.toRaw().toInt()!, second: nil)
               }
            }
         }
         let rank: Rank
         let suit: Suit
         func description() -> String {
            var output = "the \(rank.toRaw()) of \(suit.toRaw())"
            output += " is worth \(rank.values.first)"
            if let second = rank.values.second {
               output += " or \(second)"
            }
            return output
         }
      }
   -> let theAceOfSpades = BlackjackCard(rank: .Ace, suit: .Spades)
   << // theAceOfSpades : BlackjackCard = BlackjackCard(<unprintable value>, <unprintable value>)
   -> println("Blackjack value: \(theAceOfSpades.description())")
   <- Blackjack value: the Ace of ♠ is worth 1 or 11

This example defines a playing card for use in the game of Blackjack.
One notable feature of Blackjack is that the Ace card has a value of
either one or eleven. This characteristic is encapsulated in the logic above.

The ``BlackjackCard`` structure defines two nested enumerations:

* ``Suit``, which describes the four common playing card suits,
  together with a raw ``Character`` value to represent their symbol
* ``Rank``, which describes the thirteen possible playing card ranks,
  together with a raw ``String`` value to represent their name

The ``Rank`` enumeration defines a further nested structure of its own, called ``Values``.
This structure encapsulates the fact that most cards have one value,
but the Ace card has two values.
The ``Values`` structure defines two properties to represent this:

* ``firstValue``, of type ``Int``
* ``secondValue``, of type ``Int?``, i.e. “optional ``Int``”

``Rank`` also defines a computed property, ``values``,
which returns an instance of the ``Values`` structure.
This computed property considers the rank of the card,
and initializes a new ``Values`` instance with appropriate values based on its rank.
It uses special values for ``Jack``, ``Queen``, ``King`` and ``Ace``.
For the numeric cards, it converts the rank's raw ``String`` value into an ``Int?``
using ``String``'s ``toInt`` method.
Because every numeric card value is known to definitely convert to an ``Int``,
the value of this optional ``Int`` is accessed via an exclamation mark (``!``)
without being checked, and is used as the first value of the ``Values`` structure.

The ``BlackjackCard`` structure itself is pretty simple.
It actually only has two properties – ``rank``, and ``suit``.
It also defines a method called ``description``,
which uses the values stored in ``rank`` and ``suit`` to build
a textual description of the card.
The ``description`` method uses optional binding to check if there is
a second value to display, and inserts addition description detail if so.

Because ``BlackjackCard`` is a structure with no custom initializers,
it has an implicit memberwise initializer
(as described in :ref:`Initialization_MemberwiseInitializersForStructureTypes`).
This is used to initialize a new constant called ``theAceOfSpades``.
Even though ``Rank`` and ``Suit`` are nested within ``BlackjackCard``,
their type can still be inferred from the context,
and so the initialization of this instance is able to refer to the enumeration members
by their member names (``.Ace`` and ``.Spades``) alone.

.. _NestedTypes_ReferringToNestedTypes:

Referring to Nested Types
-------------------------

A nested type can be used outside of its definition context,
by prefixing its name with the name of the type it is nested within:

.. testcode:: nestedTypes

   -> let heartsSymbol = BlackjackCard.Suit.Hearts.toRaw()
   << // heartsSymbol : Character = <unprintable value>
   /> heartsSymbol is \"\(heartsSymbol)\"
   </ heartsSymbol is "♡"

For the example above, 
this enables the names of ``Suit``, ``Rank`` and ``Values`` to be kept deliberately short,
because their names are naturally qualified by the context in which they are defined.