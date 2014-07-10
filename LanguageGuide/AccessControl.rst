Access Control
==============

.. see swift/trunk/test/Sema/accessibility.swift for test cases

.. principle: no entity can be defined in terms of another entity that has less accessibility
.. the general principle is that an entity cannot be defined in terms of another entity with less accessibility

:newTerm:`Access control` restricts access to parts of your code
from code in other source files and modules.
This enables you to hide the implementation details of your code,
and to specify a preferred interface through with your code can be accessed and used.

Individual types (classes, structures, and enumerations)
can be assigned specific access levels,
as can any properties, methods, initializers, and subscripts implemented by those types.
Protocols can also restrict access to a certain scope,
and even a type's conformance to a protocol can be hidden in certain scopes if appropriate.

Despite offering considerable flexibility around access control,
Swift avoids the need for you to specify access control in many cases
by using appropriate default levels of access in different scenarios.
Indeed, if you are writing a single-target app,
you may not need to implement custom access control at all.

Modules and Source Files
------------------------

Swift's access control model is based on the concept of modules and source files.

A :newTerm:`module` is a single unit of code distribution ---
a framework or application that is built and shipped as a single entity,
and that can potentially be imported by another module with Swift's ``import`` keyword.

Each build target (such as an app bundle or framework) in Xcode
is treated as a separate module in Swift.
If you group together some aspect of your app's code as a stand-alone framework ---
perhaps to encapsulate and re-use that code across multiple applications ---
everything you define within that framework will be part of a separate module
when it is imported and used within an app or another framework.

A :newTerm:`source file` is a single Swift source code file within a module
(i.e. a single file within an app or framework).
While it is traditional to define individual types in separate source files,
a single source file can contain definitions for multiple types, functions, and so on.

Access Levels
-------------

Swift provides three different :newTerm:`access levels` for entities within your code.
These access levels are relative to the source file in which an entity is defined,
and to the module that the source file belongs to.

* :newTerm:`Public access`
  enables entities to be used within any source file inside their defining module,
  and also in any source file from another module that imports the defining module.

* :newTerm:`Internal access`
  enables entities to be used within any source file inside their defining module,
  but not in any source file outside of that module.

* :newTerm:`Private access`
  means that entities are available within their defining source file only.

Public, internal, and private access are typically used as follows:

* Public access is used when specifying the public interface to a framework.
* Internal access is used when defining an app or framework's internal structure.
* Private access is used to hide the implementation details of
  a specific piece of functionality.

Default Access Levels
~~~~~~~~~~~~~~~~~~~~~

All definitions in your code
(with a few specific exceptions, as described later in this chapter)
have a default access level of “internal”
if you do not specify a custom access level yourself.
This default setting means that in many cases you do not need to specify
an explicit access level at all.

Access Levels For Single-Target Apps
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When you write a simple single-target app,
the code in your app is typically self-contained,
and does not need to be made available outside of the app's own module.
The default access level of “internal” already matches this requirement,
and means that you do not need to specify a custom access level if you do not wish to.

Indeed, it is possible to write an entire app without ever specifying
an explicit access level in your code.
You may, however, wish to mark some parts of your code as “private”
in order to hide their implementation details from other code within your app's own module.

.. note::

   You should not mark any declarations in a self-contained app as “public”,
   because those declarations do not need to be made available outside of the app's module.

Access Levels For Frameworks
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When you develop a framework,
you mark the public-facing interface of that framework
as “public” so that it can be viewed and accessed by other modules
(such as an app that imports the framework).
This public-facing interface is known as the :newTerm:`API`
or :newTerm:`Application Programming Interface` for the framework.

Any internal implementation details of your framework can still make use of
the default access level of “internal”,
or can be marked as “private” if you wish to hide them from
other parts of the framework's internal code.

Access Control Syntax
---------------------

.. write the private / internal / public keyword after any attributes, but before the introducer
.. show some examples

Access Context
--------------

.. access to a particular entity is considered relative to the current access context
.. describe what an access context is, with an example
.. brief description of what "access scope" means in Swift (app, framework, file)
.. the access context of an entity is the current file (if ``private``), the current module (if ``internal``), or the current program (if ``public``)
.. a reference to an entity may only be written within the entity's accessibility context

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