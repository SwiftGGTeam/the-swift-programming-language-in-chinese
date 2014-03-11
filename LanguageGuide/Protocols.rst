.. docnote:: Subjects to be covered in this section

    * Definition of protocols
    * Adoption of protocols
    * Standard protocols (Equatable etc.)
    * Default implementations of methods
    * Protocol compositions

Protocols
=========

A :newTerm:`protocol` defines a blueprint or template set of
methods, properties, and other requirements
that suit a particular task or piece of functionality.
The protocol doesn't actually provide an *implementation* for any of these requirements –
it only describes what an implementation will look like.
The protocol can then adopted by a class, structure or enumeration
to provide an actual implementation of those requirements.

Any type that satisfies the requirements of a protocol is said to
:newTerm:`conform` to that protocol.

Protocols can require that conforming types have specific
instance properties, instance methods, type properties, type methods,
initializers, operators, and subscripts.

Protocol Syntax
---------------

Protocols are defined in a very similar way to classes, structures and enumerations:

::

    protocol SomeProtocol {
        // protocol definition goes here
    }

Custom types declare that they implement a particular protocol
by placing the protocol's name after the type's name,
separated by a colon, as part of their own definition:

::

    struct SomeStructure : SomeProtocol {
        // structure definition goes here
    }

.. QUESTION: is "declare" the correct word to use here?

If a class has a superclass, the superclass name should be listed
before any protocols it implements, followed by a comma.
Multiple protocols can also be listed, separated by commas:

::

    class SomeClass : SomeSuperclass, FirstProtocol, AnotherProtocol {
        // class definition goes here
    }

Instance Properties
-------------------

A protocol can require any conforming type to provide
an instance property with a particular name and type.
The protocol doesn't specify whether the property is
a stored property or a computed property –
it just specifies the property name and type.

The protocol also specifies whether each property must be either:

* gettable *and* settable, or
* gettable

If a protocol requires a property to be both gettable and settable,
that property requirement cannot be fulfilled by
a constant stored property or a read-only computed property,
because neither of these are settable.

If the protocol only requires a property to be gettable,
the requirement can be satisfied by any kind of property.
The property does not have to be settable,
although it is perfectly valid for it to also be settable
if this is useful for your own code.

Property requirements are always declared as variable properties,
prefixed with the ``var`` keyword.
Gettable-and-settable properties are indicated by writing
``{ get set }`` after their type declaration,
and gettable properties are indicated by writing ``{ get }``.

::

    protocol SomeProtocol {
        var mustBeSettable: Int { get set }
        var doesNotNeedToBeSettable: Int { get }
    }

Here's an example of a protocol with a single property requirement:

.. testcode:: protocols

    --> protocol FullyNamed {
            var fullName: String { get }
        }

The ``FullyNamed`` protocol defines any kind of thing that has a fully-qualified name.
It doesn't specify what *kind* of thing it must be –
it only specifies that the thing must be able to provide a full name for itself.
It implements this requirement by stating that any ``FullyNamed`` type must have
a gettable instance property called ``fullName``, which is of type ``String``.

Here's an example of a simple structure that conforms to
the ``FullyNamed`` protocol:

.. testcode:: protocols

    --> struct Person : FullyNamed {
            var fullName: String
        }
    --> let john = Person(fullName: "John Appleseed")
    /-> john.fullName is \"\(john.fullName)\"
    <-/ john.fullName is "John Appleseed"

This example defines a structure called ``Person``,
which represents a specific named person.
It declares that it implements the ``FullyNamed`` protocol
as part of the first line of its definition.

Each instance of ``Person`` has a single stored property called ``fullName``,
which is of type ``String``.
This matches the single requirement of the ``FullyNamed`` protocol,
and means that ``Person`` has correctly conformed to the protocol.
(Swift will report an error at compile-time if a protocol requirement is not fulfilled.)

Here's a more complex class, which also conforms to the ``FullyNamed`` protocol:

.. testcode:: protocols

    --> class Starship : FullyNamed {
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
    --> var ncc1701 = Starship(withName: "Enterprise", prefix: "USS")
    <<< // ncc1701 : Starship = <Ship instance>
    /-> ncc1701.fullName is \"\(ncc1701.fullName)\"
    <-/ ncc1701.fullName is "USS Enterprise"

This class implements ``fullName`` as a computed read-only property for a starship.
Each ``Starship`` class instance stores a mandatory ``name``, and an optional ``prefix``.
The ``fullName`` property uses the ``prefix`` value if it exists,
and prepends it on to the beginning of ``name`` to create a full name for the starship.

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
