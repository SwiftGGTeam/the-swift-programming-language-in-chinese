.. docnote:: Subjects to be covered in this section

    * Definition of protocols
    * Adoption of protocols
    * Standard protocols (Equatable etc.)
    * Default implementations of methods
    * Protocol compositions

Protocols
=========

A :newTerm:`protocol` defines a blueprint or template set of methods and properties
that will implement a specific piece of functionality.
The protocol doesn't actually provide an implementation –
rather, it describes what an implementation will look like.
The protocol can then adopted by a class, structure or enumeration
to provide an actual implementation of that protocol.

Here's an example:

.. testcode:: protocols

    --> protocol FullyNamed {
            var fullName: String { get }
        }
    --> class Person : FullyNamed {
            var name: String
            var suffix: String?
            init withName(name: String) suffix(String? = .None) {
                self.name = name
                self.suffix = suffix
            }
            var fullName: String {
                return name + (suffix ? " " + suffix! : "")
            }
        }
    --> var ironMan = Person(withName: "Robert Downey", suffix: "Jr.")
    <<< // ironMan : Person = <Person instance>
    --> println("\(ironMan.name)'s full name is \(ironMan.fullName)")
    <<< Robert Downey's full name is Robert Downey Jr.
    --> class Ship : FullyNamed {
            var prefix: String?
            var name: String
            init withName(name: String) prefix(String? = .None) {
                self.name = name
                self.prefix = prefix
            }
            var fullName: String {
                return (prefix ? prefix! + " " : "") + name
            }
        }
    --> var starship = Ship(withName: "Enterprise", prefix: "USS")
    <<< // starship : Ship = <Ship instance>

Declaring a Protocol
--------------------

.. write-me::

Conforming to a Protocol
------------------------

.. write-me::

.. Declaring protocol conformance (and the overlap of this with subclass declaration)
.. Show how to make a custom type conform to LogicValue or some other protocol
.. LogicValue certainly needs to be mentioned in here somewhere

Naming of Protocols
-------------------

.. write-me::

.. Some advice on how protocols should be named

Instance Methods
----------------

.. write-me::

.. Protocols can declare instance methods
.. Methods can have variadic parameters
.. You can't construct from a protocol
.. You can't provide initializers in protocols
.. No default implementations of protocol methods

Properties
----------

.. write-me::

.. Protocols can declare stored properties, but can't provide default values
.. Protocols can declare computed instance properties, and specify their access constraints

Class and Static Methods and Properties
---------------------------------------

.. write-me::

.. Protocols can provide class (and static) functions and properties
   (although rdar://14620454 and rdar://15242744).

Operators
---------

.. write-me::

.. Protocols can require the implementation of operators (though assignment operators are broken)
.. Likewise for requiring custom operators

Subscript
---------

.. write-me::

.. Subscript requirements (but it's broken at the moment)

Protocol Inheritance
--------------------

.. write-me::

.. Protocols can inherit from other protocols

Using Protocols
---------------

.. write-me::

.. Using a protocol as the type for a variable, function parameter, return type etc.
.. Functions can have parameters that are 'anything that implements some protocol'
.. …or 'some multiple protocols'
.. protocol<P1, P2> syntax for "something that conforms to multiple protocols"
.. Protocols can't be nested, but nested types can implement protocols

Associated Types
----------------

.. write-me::

.. Associated typealiases
.. …with default types

Optional Requirements
---------------------

.. write-me::

.. Non-mandatory protocol requirements via @optional
.. Checking for optional implementations via optional binding and closures

DynamicSelf
-----------

.. write-me::

.. Self and DynamicSelf

TBC
---

.. write-me::

.. Class-only protocols
.. @obj-c protocols
.. Curried functions in protocols
.. Standard-library protocols such as Sequence, Equatable etc.?

.. refnote:: References

    * https://[Internal Staging Server]/docs/whitepaper/GuidedTour.html#protocols
