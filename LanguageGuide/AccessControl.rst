Access Control
==============

.. see swift/trunk/test/Sema/accessibility.swift for test cases

.. principle: no entity can be defined in terms of another entity that has less accessibility
.. the general principle is that an entity cannot be defined in terms of another entity with less accessibility

:newTerm:`Access control` restricts access to parts of your code
from code in other source files and modules.
This enables you to hide the implementation details of your code,
and to specify a preferred interface through which that code can be accessed and used.

Individual types (classes, structures, and enumerations)
can be assigned specific access levels,
as can properties, methods, initializers, and subscripts implemented by those types.
Protocols can also restrict access to a certain scope,
and a type's conformance to a protocol can be hidden in certain scopes if appropriate.
(The various aspects of your code that can have access control applied to them
are referred to as “entities” in the descriptions below.)

Despite offering considerable flexibility around access control,
Swift avoids the need for you to specify access control in many cases
by using appropriate default levels of access in different scenarios.
Indeed, if you are writing a single-target app,
Swift's default access settings may mean that
you do not need to implement custom access control at all.

.. _AccessControl_ModulesAndSourceFiles:

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
when it is imported and used within an app, or within another framework.

A :newTerm:`source file` is a single Swift source code file within a module
(i.e. a single file within an app or framework).
While it is common to define individual types in separate source files,
a single source file can contain definitions for multiple types, functions, and so on.

.. _AccessControl_AccessLevels:

Access Levels
-------------

Swift provides three different :newTerm:`access levels` for entities within your code.
These access levels are relative to the source file in which an entity is defined,
and to the module that the source file belongs to.

* :newTerm:`Public access`
  enables entities to be used within any source file inside their defining module,
  and also in a source file from another module that imports the defining module.

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

.. _AccessControl_DefaultAccessLevels:

Default Access Levels
~~~~~~~~~~~~~~~~~~~~~

All definitions in your code
(with a few specific exceptions, as described later in this chapter)
have a default access level of “internal”
if you do not specify a custom access level yourself.
This default setting means that in many cases you do not need to specify
an explicit access level at all.

.. _AccessControl_AccessLevelsForSingleTargetApps:

Access Levels For Single-Target Apps
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When you write a simple single-target app,
the code in your app is typically self-contained,
and does not need to be made available outside of the app's own module.
The default access level of “internal” already matches this requirement,
and means that you do not need to specify a custom access level if you do not wish to.

Indeed, it is possible to write an entire single-target app
without ever specifying an explicit access level in your code.
You may, however, wish to mark some parts of your code as “private”
in order to hide their implementation details from other code within your app's own module.

.. note::

   You should not mark any declarations in a self-contained app as “public”,
   because those declarations do not need to be made available outside of the app's module.

.. _AccessControl_AccessLevelsForFrameworks:

Access Levels For Frameworks
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When you develop a framework,
you mark the public-facing interface of that framework
as “public” so that it can be viewed and accessed by other modules
(such as by an app that imports the framework).
This public-facing interface is known as the :newTerm:`API`
or :newTerm:`Application Programming Interface` for the framework.

Any internal implementation details of your framework can still make use of
the default access level of “internal”,
or can be marked as “private” if you wish to hide them from
other parts of the framework's internal code.

.. _AccessControl_AccessControlSyntax:

Access Control Syntax
---------------------

Define the access level for an entity by placing
one of the ``public``, ``internal``, or ``private`` keywords
before the entity's introducer:

.. testcode:: accessControlSyntax

   -> public class SomePublicClass {}
   -> internal class SomeInternalClass {}
   -> private class SomePrivateClass {}
   ---
   -> public var somePublicVariable = 0
   << // somePublicVariable : Int = 0
   -> internal var someInternalConstant = 0
   << // someInternalConstant : Int = 0
   -> private func somePrivateFunction() {}

The default global access level is ``internal``,
as described in :ref:`AccessControl_DefaultAccessLevels`.
This means that ``SomeInternalClass`` and ``someInternalConstant`` can be written
without an explicit access level modifier:

.. testcode:: accessControlDefaulted

   -> class SomeInternalClass {}
   -> var someInternalConstant = 0
   << // someInternalConstant : Int = 0

.. _AccessControl_Types:

Types
-----

You can specify an explicit access level for a custom type
at the point that the type is defined.
The new type can then be used wherever its access level permits.
For example, if you define a ``private`` class,
that class can only be used as the type of a property,
or as a function parameter or return type,
in the source file in which the ``private`` class was originally defined.

The access control level of a type also affects
the default access level of that type's members.
If you define a type's access level as ``private``,
the default access level of its properties, methods, subscripts, and initializers
is also ``private``.
Conversely, if you define a type's access level as ``internal`` or ``public``
(or use the default access level of ``internal``
without specifying an access level explicitly),
the default access level of the type's
properties, methods, subscripts, and initializers is ``internal``.

.. testcode:: accessControl, accessControlWrong

   -> public class SomePublicClass {          // explicitly public class
         var someInternalProperty = 0         // implicitly internal class member
         private func somePrivateMethod() {}  // explicitly private class member
      }
   ---
   -> class SomeInternalClass {               // implicitly internal class
         var someInternalProperty = 0         // implicitly internal class member
         private func somePrivateMethod() {}  // explicitly private class member
      }
   ---
   -> private class SomePrivateClass {        // explicitly private class
         var somePrivateProperty = 0          // implicitly private class member
         func somePrivateMethod() {}          // implicitly private class member
      }

.. _AccessControl_TupleTypes:

Tuple Types
~~~~~~~~~~~

The access level for a tuple type is
the minimum access level of all of the types used in that tuple.
For example, if you compose a tuple from two different types,
one of which is internal and one of which is private,
the access level for that compound tuple type will be private.

.. note::

   Tuple types do not have a stand-alone definition in the way that
   classes, structures, enumerations, and functions do.
   A tuple type's access level is deduced automatically when the tuple type is used,
   and cannot be specified explicitly.

.. _AccessControl_FunctionTypes:

Function Types
~~~~~~~~~~~~~~

The access level for a function type is calculated as
the minimum access level of the function's parameter types and return type.
You must specify the access level explicitly as part of the function's definition
if the function's calculated access level does not match the contextual default.

The example below defines a global function called ``someFunction``,
without providing a specific access level modifier for the function itself.
You might expect this function to have the default access level of ``internal``,
but this is not the case.
In fact, ``someFunction`` will not compile as written below:

.. testcode:: accessControlWrong

   -> func someFunction() -> (SomeInternalClass, SomePrivateClass) {
         // function implementation
   >>    return (SomeInternalClass(), SomePrivateClass())
      }
   !! <REPL Input>:1:6: error: function must be declared private because its result uses a private type
   !! func someFunction() -> (SomeInternalClass, SomePrivateClass) {
   !! ^                                     ~~~~~~~~~~~~~~~~
   !! <REPL Input>:1:15: note: type declared here
   !! private class SomePrivateClass {        // explicitly private class
   !! ^

The function's return type is
a tuple type composed from two of the custom classes defined earlier.
One of these classes was defined as internal,
and the other was defined as private.
Therefore, the overall access level of the compound tuple type is private
(the minimum access level of the tuple's constituent types).

Because the function's return type is private,
the function's overall access level must be marked with the ``private`` keyword
for the function declaration to be valid:

.. testcode:: accessControl

   -> private func someFunction() -> (SomeInternalClass, SomePrivateClass) {
         // function implementation
   >>    return (SomeInternalClass(), SomePrivateClass())
      }

It is not valid to mark the definition of ``someFunction``
as ``public`` or ``internal``, or to use the default setting of ``internal``,
because public or internal users of the function might not have appropriate access
to the private class used in its return type.

.. _AccessControl_TypeAliases:

Type Aliases
~~~~~~~~~~~~

Any type aliases you define are treated as distinct types for the purposes of access control.
A type alias can have an access level less than or equal to the access level of the type it aliases.
For example, a ``private`` type alias can refer to an ``internal`` or ``public`` type,
but a ``public`` type alias cannot refer to an ``internal`` or ``private`` type.
This includes associated types used to satisfy protocol conformances.

.. _AccessControl_GlobalConstantsAndVariables:

Global Constants and Variables
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A global constant or variable can be assigned an explicit access level
that is less than or equal to the accessibility of its type.
For example, a ``private`` constant or variable can be defined as having
a type that is ``public`` or ``internal``.
However, a ``public`` constant or variable cannot be defined as having
a ``private`` or ``internal`` type,
because that type might not be visible to users of the ``public`` constant or variable.

The following global constant and variable definitions are all valid:

.. testcode:: accessControl

   // okay - globalVariable is a private variable with an internally-scoped type
   -> private var globalVariable = SomeInternalClass()
   << // globalVariable : SomeInternalClass = _TtC4REPL17SomeInternalClass
   ---
   // okay - globalConstant is an (implicitly) internal constant
   // with a publicly-scoped type
   -> var globalConstant = SomePublicClass()
   << // globalConstant : SomePublicClass = _TtC4REPL15SomePublicClass

.. _AccessControl_EnumerationTypes:

Enumeration Types
~~~~~~~~~~~~~~~~~

Members of an enumeration automatically receive the same access level as
the enumeration they belong to.
You cannot specify a different access level for individual enumeration members.

In addition, the types used for any raw values or associated values in an enumeration
must have an access level at least as high as the enumeration's access level.
You cannot use a ``private`` type as the raw value type of
an enumeration with an ``internal`` access level, say.

.. _AccessControl_NestedTypes:

Nested Types
~~~~~~~~~~~~

.. talk about the access defaults for nested functions and nested types
.. local types (defined within a function) are always private

.. _AccessControl_Subclassing:

Subclassing
-----------

You can subclass any class that is visible in your code.
A subclass cannot have more visibility than its superclass, however ---
for example, you cannot write a ``public`` subclass of an ``internal`` superclass.
In addition, you can override any class member
(that is, any method, property, subscript, or initializer)
that is visible in your code.

An override can make an inherited class member more public than its superclass version:

.. testcode::

   -> public class Public {
         private func someMethod() {
            println("Public someMethod()")
         }
      }
   ---
   -> internal class Internal : Public {
         override internal func someMethod() {
            println("Internal someMethod()")
         }
      }
   -> let i = Internal()
   -> i.someMethod()

.. overriding can make something more public (go into more detail on what this means)

.. you can make something more public if all the types are more private
.. private members cannot override public members unless they are in a private class (see r19769)

.. _AccessControl_MethodsPropertiesSubscriptsAndInitializers:

Methods, Properties, Subscripts, and Initializers
-------------------------------------------------

.. an initializer, method, subscript, or property may have an access level less than or equal to the access level of its type (including the implicit 'Self' type)

.. if the type's accessibility is ``private``, the accessibility of its members defaults to ``private``
.. if the type's accessibility is ``internal`` or ``public``, the accessibility of its members defaults to ``internal``

.. _AccessControl_PropertiesAndSubscripts:

Properties and Subscripts
-------------------------

.. getters and setters for properties and subscripts have the same access as the property or subscript
.. setters may be explicitly annotated with an access level less than or equal to the access level of the property or subscript
.. this is written as ``private(set)`` or ``internal(set)`` before the ``var`` introducer
.. the same rules apply for getters and setters for global variables
.. a property cannot be more public than its type (r19432)
.. a subscript cannot be more public than its index or element type (r19446)

.. _AccessControl_Initializers:

Initializers
------------

.. if an initializer is ``@required`` by a superclass, it must have at least as much accessibility as the subclass type itself (in order to satisfy the requirement defined by the superclass) (r19383)
.. the implicit memberwise initializer for a structure has the minimum accessibility of all of the structure's stored properties (and is not provided if this is less than the current access context?)
.. the implicit no-argument initializer for structures and classes has the same accessibility as the enclosing type
.. for modules, if you want a "public" initializer that matches the default initializers, you have to provide it yourself
.. the no-argument initializer will be internal always, regardless of the property's access (is this true even if the type is public?)
.. an initializer may not use a type with a more private level than the initializer's own level (r19519)

.. _AccessControl_Deinitializers:

Deinitializers
~~~~~~~~~~~~~~

.. deinitializers are only invoked by the runtime and always have the same accessibility as the enclosing class

.. _AccessControl_Protocols:

Protocols
---------

.. a protocol may have any accessibility less than or equal to the accessibility of the protocols it refines
.. to put it another way, public protocols cannot refine private protocols - otherwise, how is an implementer to know all the requirements? (r19584)
.. the accessibility of a requirement is the accessibility of the enclosing protocol, rather than ``internal``
.. requirements may not be given less accessibility than the enclosing protocol
.. a protocol may be used as a type whenever it is accessible

.. _AccessControl_ProtocolConformance:

Protocol Conformance
~~~~~~~~~~~~~~~~~~~~

.. a type's conformance to a protocol also has a scope
.. the accessibility of the conformance of type T to protocol P is equal to the minimum of T's accessibility and P's accessibility; that is, the conformance is accessible whenever both T and P are accessible
.. if you can't see that a type conforms to a protocol, you can't use it as that protocol type, even if you can see all of the things that would otherwise enable it to satisfy the protocol's requirements

.. if a type's member is used to satisfy a protocol requirement, it must have at least as much accessibility as the protocol conformance (otherwise it wouldn't be visible enough to satisfy it) (r19382)
.. you can't specify private protocol conformance (what about internal)?
.. a nominal can conform to a protocol whenever the protocol is accessible
.. a type may conform to a protocol with less accessibility than the type itself

.. _AccessControl_Extensions:

Extensions
----------

.. a struct, enum, or class may be extended whenever it is accessible
.. members in an extension have the same default accessibility as members declared within the extended type
.. (so presumably if the type was declared as a "private" type, then the extension members are "private" by default?)
.. an extension may be marked with an explicit accessibility modifier (e.g. ``private extension``), in which case the default accessibility of members within the extension is changed to match
.. (presumably this can only make things less accessible, not more so?)
.. extensions with explicit accessibility modifiers may not add new protocol conformances (see r19751)

.. _AccessControl_Generics:

Generics
--------

.. a generic type or function's accessibility is the minimum of the accessibility of the base type and the accessibility of all generic argument types (aka type parameter constraints?)

