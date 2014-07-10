Access Control
==============

.. see swift/trunk/test/Sema/accessibility.swift for test cases

.. include a full list of things that can have access control
.. principle: no entity can be defined in terms of another entity that has less accessibility

Access Control Levels
---------------------

.. three levels of access: "private", "internal", and "public"
.. private entities can only be accessed from within the source file where they are defined
.. internal entities can be accessed anywhere within the module they are defined (cf with module == app target)
.. public entities can be accessed from anywhere within the module and from any other context that imports the current module

.. 'public' declarations can be accessed from any module
.. 'internal' declarations (the default) can be accessed from within the current module
.. 'private' declarations can be accessed only from within the current file
.. the general principle is that an entity cannot be defined in terms of another entity with less accessibility

.. if you're just developing an app, you may only need internal and never have to write anything else
.. although you can still use private for your own tidiness if you wish
.. if you're developing a framework, then public may also be useful
.. as a general principle, you should avoid writing any access control modifiers unless you need to
.. the defaults should help you with this
.. note that if you're developing a custom framework, it'll be treated as a separate module

.. an app developer doesn't need to know about public except for unit tests; a framework developer does
.. for public, you always have to mark it; nothing defaults to public
.. although in enums, protocols, and extensions, the contents follow the wrapper

.. a module is a unit of code distribution - code that is built and shipped together; a framework or an application, imported with "import"
.. any target is its own module

.. can get optimization benefits from private:
.. private does not imply ObjC; if you mark something private, and there's no dynamic / objc / IBOutlet, it's not exposed to ObjC, so the Swift code accessing that does so directly
.. can also do the "not overridden, so make it final" check much more easily for private things

Access Control Syntax
~~~~~~~~~~~~~~~~~~~~~

.. write the private / internal / public keyword after any attributes, but before the introducer
.. show some examples

Access Context
--------------

.. access to a particular entity is considered relative to the current access context
.. describe what an access context is, with an example
.. brief description of what "access scope" means in Swift (app, framework, file)
.. the access context of an entity is the current file (if ``private``), the current module (if ``internal``), or the current program (if ``public``)
.. a reference to an entity may only be written within the entity's accessibility context

Access Control Defaults
-----------------------

.. by default, most entities in a source file have ``internal`` accessibility
.. this optimizes for the most common case (a single-target application project) while not accidentally revealing entities to clients of a framework module
.. our motivation behind making internal the default: if you are not adding public protocol conformance to public types, and don't want to make things private, then you should never need to actually write an access control modifier

Types
-----

.. can specify access control for an entire type
.. a struct, enum, or class may be used as a type whenever it is accessible

.. (duplicated below) if the type's accessibility is ``private``, the accessibility of its members defaults to ``private``
.. (duplicated below) if the type's accessibility is ``internal`` or ``public``, the accessibility of its members defaults to ``internal``

.. a nominal type's accessibility is the same as the accessibility of the nominal declaration itself

.. a generic type's accessibility is the minimum of the accessibility of the base type and the accessibility of all generic argument types

.. a tuple type's accessibility is the minimum of the accessibility of its elements

.. a function type's accessibility is the minimum accessibility of its input and return types (unless specified to be more private on the function itself?)
.. conversely, a function type may not contain a type with a more private access level than the function's explicitly-specified level (r19519)

.. typealiases are distinct types for access control
.. a typealias may have any accessibility less than or equal to the accessibility of the type it aliases (r19428)
.. that is, a ``private`` typealias can refer to an ``public`` type, but not the other way around
.. this includes associated types used to satisfy protocol conformances

.. a global function, constant, or variable may have any accessibility less than or equal to the accessibility of its type (or compound type, for functions and tuples)
.. that is, a ``private`` global constant can be defined in terms of a type that is ``public``, but not the other way around

.. talk about the access defaults for nested functions and nested types
.. local types (defined within a function) are always private

Classes
~~~~~~~

.. a class may be subclassed whenever it is accessible
.. a class may have any accessibility less than or equal to the accessibility of its superclass
.. a class member may be overridden whenever it is accessible
.. public classes may not have private superclasses (r19588)

.. overriding can make something more public (go into more detail on what this means)

.. you can make something more public if all the types are more private
.. private members cannot override public members unless they are in a private class (see r19769)

Enumerations
~~~~~~~~~~~~

.. enumeration cases always have the same accessibility as the enclosing enumeration
.. public enum cases cannot have private payloads, because you can't match them properly in switches (r19620)
.. a public enum cannot have a private raw type (r19587)

Initializers, Methods, Properties, and Subscripts
-------------------------------------------------

.. an initializer, method, subscript, or property may have an access level less than or equal to the access level of its type (including the implicit 'Self' type)

.. if the type's accessibility is ``private``, the accessibility of its members defaults to ``private``
.. if the type's accessibility is ``internal`` or ``public``, the accessibility of its members defaults to ``internal``

Properties and Subscripts
-------------------------

.. getters and setters for properties and subscripts have the same access as the property or subscript
.. setters may be explicitly annotated with an access level less than or equal to the access level of the property or subscript
.. this is written as ``private(set)`` or ``internal(set)`` before the ``var`` introducer
.. the same rules apply for getters and setters for global variables
.. a property cannot be more public than its type (r19432)
.. a subscript cannot be more public than its index or element type (r19446)

Initializers
------------

.. if an initializer is ``@required`` by a superclass, it must have at least as much accessibility as the subclass type itself (in order to satisfy the requirement defined by the superclass) (r19383)
.. the implicit memberwise initializer for a structure has the minimum accessibility of all of the structure's stored properties (and is not provided if this is less than the current access context?)
.. the implicit no-argument initializer for structures and classes has the same accessibility as the enclosing type
.. for modules, if you want a "public" initializer that matches the default initializers, you have to provide it yourself
.. the no-argument initializer will be internal always, regardless of the property's access (is this true even if the type is public?)
.. an initializer may not use a type with a more private level than the initializer's own level (r19519)

Deinitializers
~~~~~~~~~~~~~~

.. deinitializers are only invoked by the runtime and always have the same accessibility as the enclosing class

Protocols
---------

.. a protocol may have any accessibility less than or equal to the accessibility of the protocols it refines
.. to put it another way, public protocols cannot refine private protocols - otherwise, how is an implementer to know all the requirements? (r19584)
.. the accessibility of a requirement is the accessibility of the enclosing protocol, rather than ``internal``
.. requirements may not be given less accessibility than the enclosing protocol
.. a protocol may be used as a type whenever it is accessible

Protocol Conformance
~~~~~~~~~~~~~~~~~~~~

.. a type's conformance to a protocol also has a scope
.. the accessibility of the conformance of type T to protocol P is equal to the minimum of T's accessibility and P's accessibility; that is, the conformance is accessible whenever both T and P are accessible
.. if you can't see that a type conforms to a protocol, you can't use it as that protocol type, even if you can see all of the things that would otherwise enable it to satisfy the protocol's requirements

.. if a type's member is used to satisfy a protocol requirement, it must have at least as much accessibility as the protocol conformance (otherwise it wouldn't be visible enough to satisfy it) (r19382)
.. you can't specify private protocol conformance (what about internal)?
.. a nominal can conform to a protocol whenever the protocol is accessible
.. a type may conform to a protocol with less accessibility than the type itself

Extensions
----------

.. a struct, enum, or class may be extended whenever it is accessible
.. members in an extension have the same default accessibility as members declared within the extended type
.. (so presumably if the type was declared as a "private" type, then the extension members are "private" by default?)
.. an extension may be marked with an explicit accessibility modifier (e.g. ``private extension``), in which case the default accessibility of members within the extension is changed to match
.. (presumably this can only make things less accessible, not more so?)
.. extensions with explicit accessibility modifiers may not add new protocol conformances (see r19751)