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
    <-- Robert Downey's full name is Robert Downey Jr.
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
    --> println("The \(starship.name)'s full name is \(starship.fullName)")
    <-- The Enterprise's full name is USS Enterprise

Declaring a Protocol
--------------------

.. write-me::

.. General declaration syntax
.. Some advice on how protocols should be named

Conforming to a Protocol
------------------------

.. write-me::

.. Declaring protocol conformance (and the overlap of this with subclass declaration)
.. Show how to make a custom type conform to LogicValue or some other protocol
   …although this requires everything from below to be in place
.. LogicValue certainly needs to be mentioned in here somewhere
.. Ideally illustrate this with a delegate-style protocol too

Adding Protocol Conformance With Extensions
-------------------------------------------

.. write-me::

.. Extensions can make an existing type conform to a protocol

Instance Methods
----------------

.. write-me::

.. Protocols can declare instance methods
.. Methods can have variadic parameters
.. No default implementations of protocol methods
.. Method properties can't (yet) have default values specified in the protocol

Initializers
------------

.. write-me::

.. You can't construct from a protocol
.. You can define initializer requirements in protocols

Properties
----------

.. write-me::

.. Protocols can declare properties, and specify their access constraints (get / set)
.. Properties declared in protocols can be implemented as either type (stored or computed)
.. As a result, they can't have default values assigned in the protocol

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
.. However, Doug thought that this might be better covered by Generics,
   where you know that two things are definitely of the same type.
   Perhaps mention it here, but don't actually show an example?

Subscript
---------

.. write-me::

.. Subscript requirements (but it's broken at the moment)

Protocol Inheritance
--------------------

.. write-me::

.. Protocols can inherit from other protocols
.. Perhaps use a Printable and FancyPrintable kind of example

Checking Protocol Conformance
-----------------------------

.. is and as
.. Perhaps follow on from the Printable and FancyPrintable example
   to check for conformance and call the appropriate print method

Using Protocols
---------------

.. write-me::

.. Using a protocol as the type for a variable, function parameter, return type etc.
.. Functions can have parameters that are 'anything that implements some protocol'
.. …or 'some multiple protocols'
.. protocol<P1, P2> syntax for protocol conformance aka "something that conforms to multiple protocols"
.. accessing protocol methods, properties etc. through a named value that is *just* of protocol type
.. Protocols can't be nested, but nested types can implement protocols

Optional Requirements
---------------------

.. write-me::

.. Non-mandatory protocol requirements via @optional
.. Checking for (and calling) optional implementations via optional binding and closures
.. all dependent on the implementation of rdar://16101161

TBC
---

.. write-me::

.. Class-only protocols
.. @obj-c protocols
.. Curried functions in protocols
.. Standard-library protocols such as Sequence, Equatable etc.?

.. refnote:: References

    * https://[Internal Staging Server]/docs/whitepaper/GuidedTour.html#protocols
