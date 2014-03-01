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

    (swift) protocol FullyNamed {
        var fullName: String { get }
    }
    (swift) class Person : FullyNamed {
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
    (swift) var ironMan = Person(withName: "Robert Downey", suffix: "Jr.")
    // ironMan : Person = <Person instance>
    (swift) println("\(ironMan.name)'s full name is \(ironMan.fullName)")
    >>> Robert Downey's full name is Robert Downey Jr.
    (swift) class Ship : FullyNamed {
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
    (swift) var starship = Ship(withName: "Enterprise", prefix: "USS")
    // starship : Ship = <Ship instance>

Declaring a Protocol
--------------------

Conforming to a Protocol
------------------------

.. Declaring protocol conformance (and the overlap of this with subclass declaration)

Naming of Protocols
-------------------

.. Some advice on how protocols should be named

Instance Methods
----------------

.. Protocols can declare instance methods
.. Methods can have variadic parameters
.. You can't construct from a protocol
.. You can't provide initializers in protocols
.. No default implementations of protocol methods

Properties
----------

.. Protocols can declare stored properties, but can't provide default values
.. Protocols can declare computed instance properties, and specify their access constraints

Class and Static Methods and Properties
---------------------------------------

.. Protocols can provide class (and static) functions and properties
   (although rdar://14620454 and rdar://15242744).

Operators
---------

.. Protocols can require the implementation of operators (though assignment operators are broken)
.. Likewise for requiring custom operators

Subscript
---------

.. Subscript requirements (but it's broken at the moment)

Protocol Inheritance
--------------------

.. Protocols can inherit from other protocols

Using Protocols
---------------

.. Using a protocol as the type for a variable, function parameter, return type etc.
.. Functions can have parameters that are 'anything that implements some protocol'
.. …or 'some multiple protocols'
.. protocol<P1, P2> syntax for "something that conforms to multiple protocols"
.. Protocols can't be nested, but nested types can implement protocols

Associated Types
----------------

.. Associated typealiases
.. …with default types

Optional Requirements
---------------------

.. Non-mandatory protocol requirements via @optional
.. Checking for optional implementations via optional binding and closures

DynamicSelf
-----------

.. Self and DynamicSelf

TBC
---

.. Class-only protocols
.. @obj-c protocols
.. Curried functions in protocols
.. Standard-library protocols such as Sequence, Equatable etc.?

.. refnote:: References

    * https://[Internal Staging Server]/docs/whitepaper/GuidedTour.html#protocols
