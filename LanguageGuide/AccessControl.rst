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
are referred to as “entities” in the sections below.)

In addition to offering considerable flexibility around access control,
Swift reduces the need for you to specify explicit access control levels
by using appropriate default levels of access in different scenarios.
Indeed, if you are writing a single-target app,
Swift's default access settings may mean that
you do not need to specify custom access control levels at all.

.. _AccessControl_ModulesAndSourceFiles:

Modules and Source Files
------------------------

Swift's access control model is based on the concept of modules and source files.

A :newTerm:`module` is a single unit of code distribution ---
a framework or application that is built and shipped as a single entity,
and that can potentially be imported by another module
by using Swift's ``import`` keyword.

Each build target (such as an app bundle or framework) in Xcode
is treated as a separate module in Swift.
If you group together some aspect of your app's code as a stand-alone framework ---
perhaps to encapsulate and re-use that code across multiple applications ---
then everything you define within that framework will be part of a separate module
when it is imported and used within an app,
or when it is used within another framework.

A :newTerm:`source file` is a single Swift source code file within a module
(i.e. a single file within an app or framework).
While it is common to define individual types in separate source files,
a single source file can contain definitions for multiple types, functions, and so on.

.. _AccessControl_AccessLevels:

Access Levels
-------------

Swift provides three different :newTerm:`access levels` for entities within your code.
These access levels are relative to the source file in which an entity is defined,
and also relative to the module the source file belongs to.

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
an explicit access in your code.

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

.. note::

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
without an explicit access level modifier if preferred,
and will still have an access level of “internal”:

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
For example, if you define a private class,
that class can only be used as the type of a property,
or as a function parameter or return type,
in the source file in which the private class was originally defined.

The access control level of a type also affects
the default access level of that type's members.
If you define a type's access level as “private”,
the default access level of its properties, methods, subscripts, and initializers
is also private.
Conversely, if you define a type's access level as “internal” or “public”
(or use the default access level of “internal”
without specifying an access level explicitly),
the default access level of the type's
properties, methods, subscripts, and initializers is “internal”.

.. testcode:: accessControl, accessControlWrong

   -> public class SomePublicClass {          // explicitly public class
         public var somePublicProperty = 0    // explicitly public class member
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
If you compose a tuple from two different types,
one of which is internal and one of which is private,
the access level for that compound tuple type will be “private”.

.. sourcefile:: tupleTypes_Module1, tupleTypes_Module1_PublicAndInternal, tupleTypes_Module1_Private

   -> public struct PublicStruct {}
   -> internal struct InternalStruct {}
   -> private struct PrivateStruct {}
   -> public func returnPublicTuple() -> (PublicStruct, PublicStruct) {
         return (PublicStruct(), PublicStruct())
      }
   -> func returnInternalTuple() -> (PublicStruct, InternalStruct) {
         return (PublicStruct(), InternalStruct())
      }
   -> private func returnPrivateTuple() -> (PublicStruct, PrivateStruct) {
         return (PublicStruct(), PrivateStruct())
      }

.. sourcefile:: tupleTypes_Module1_PublicAndInternal

   // tuples with (at least) internal members can be accessed within their own module
   -> let publicTuple = returnPublicTuple()
   -> let internalTuple = returnInternalTuple()

.. sourcefile:: tupleTypes_Module1_Private

   // a tuple with one or more private members can't be accessed from outside of its source file
   -> let privateTuple = returnPrivateTuple()
   !! /tmp/sourcefile_1.swift:1:20: error: use of unresolved identifier 'returnPrivateTuple'
   !! let privateTuple = returnPrivateTuple()
   !! ^

.. sourcefile:: tupleTypes_Module2_Public

   // a public tuple with all-public members can be used in another module
   -> import tupleTypes_Module1
   -> let publicTuple = returnPublicTuple()

.. sourcefile:: tupleTypes_Module2_InternalAndPrivate

   // tuples with internal or private members can't be used outside of their own module
   -> import tupleTypes_Module1
   -> let internalTuple = returnInternalTuple()
   -> let privateTuple = returnPrivateTuple()
   !! /tmp/sourcefile_0.swift:2:21: error: use of unresolved identifier 'returnInternalTuple'
   !! let internalTuple = returnInternalTuple()
   !! ^
   !! /tmp/sourcefile_0.swift:3:20: error: use of unresolved identifier 'returnPrivateTuple'
   !! let privateTuple = returnPrivateTuple()
   !! ^

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
You might expect this function to have the default access level of “internal”,
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
One of these classes was defined as “internal”,
and the other was defined as “private”.
Therefore, the overall access level of the compound tuple type is “private”
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
with the ``public`` or ``internal`` keywords,
or to use the default setting of “internal”,
because public or internal users of the function might not have appropriate access
to the private class used in the function's return type.

.. _AccessControl_EnumerationTypes:

Enumeration Types
~~~~~~~~~~~~~~~~~

Members of an enumeration automatically receive the same access level as
the enumeration they belong to.
You cannot specify a different access level for individual enumeration members.

.. TODO: add a test for the first assertion in the paragraph above.

.. assertion:: enumerationMembersCantHaveAccessLevels

   -> enum PublicEnum {
         public case A
         internal case B
         private case C
      }
   !! <REPL Input>:2:6: error: 'public' attribute cannot be applied to this declaration
   !! public case A
   !! ^~~~~~
   !!-
   !! <REPL Input>:3:6: error: 'internal' attribute cannot be applied to this declaration
   !! internal case B
   !! ^~~~~~~~
   !!-
   !! <REPL Input>:4:6: error: 'private' attribute cannot be applied to this declaration
   !! private case C
   !! ^~~~~~~
   !!-

In addition, the types used for any raw values or associated values in an enumeration
must have an access level at least as high as the enumeration's access level.
You cannot use a ``private`` type as the raw value type of
an enumeration with an ``internal`` access level, say.

.. _AccessControl_NestedTypes:

Nested Types
~~~~~~~~~~~~

Nested types defined within a private type have an automatic access level of private.
Nested types defined within a public type or an internal type
have an automatic access level of internal.
This means that if you want a nested type within a public type to be publicly available,
you must explicitly declare the nested type as public.

.. sourcefile:: nestedTypes_Module1, nestedTypes_Module1_PublicAndInternal, nestedTypes_Module1_Private

   -> public struct PublicStruct {
         public enum PublicEnumInsidePublicStruct { case A, B }
         internal enum InternalEnumInsidePublicStruct { case A, B }
         private enum PrivateEnumInsidePublicStruct { case A, B }
         enum AutomaticEnumInsidePublicStruct { case A, B }
      }
   -> internal struct InternalStruct {
         internal enum InternalEnumInsideInternalStruct { case A, B }
         private enum PrivateEnumInsideInternalStruct { case A, B }
         enum AutomaticEnumInsideInternalStruct { case A, B }
      }
   -> private struct PrivateStruct {
         enum AutomaticEnumInsidePrivateStruct { case A, B }
         private enum PrivateEnumInsidePrivateStruct { case A, B }
      }

.. sourcefile:: nestedTypes_Module1_PublicAndInternal

   // these are all expected to succeed within the same module
   -> let publicNestedInsidePublic = PublicStruct.PublicEnumInsidePublicStruct.A
   -> let internalNestedInsidePublic = PublicStruct.InternalEnumInsidePublicStruct.A
   -> let automaticNestedInsidePublic = PublicStruct.AutomaticEnumInsidePublicStruct.A
   ---
   -> let internalNestedInsideInternal = InternalStruct.InternalEnumInsideInternalStruct.A
   -> let automaticNestedInsideInternal = InternalStruct.AutomaticEnumInsideInternalStruct.A

.. sourcefile:: nestedTypes_Module1_Private

   // these are all expected to fail, because they are private to the other file
   -> let privateNestedInsidePublic = PublicStruct.PrivateEnumInsidePublicStruct.A
   ---
   -> let privateNestedInsideInternal = InternalStruct.PrivateEnumInsideInternalStruct.A
   ---
   -> let privateNestedInsidePrivate = PrivateStruct.PrivateEnumInsidePrivateStruct.A
   -> let automaticNestedInsidePrivate = PrivateStruct.AutomaticEnumInsidePrivateStruct.A
   ---
   !! /tmp/sourcefile_1.swift:1:33: error: 'PublicStruct.Type' does not have a member named 'PrivateEnumInsidePublicStruct'
   !! let privateNestedInsidePublic = PublicStruct.PrivateEnumInsidePublicStruct.A
   !! ^            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   !! /tmp/sourcefile_1.swift:2:35: error: 'InternalStruct.Type' does not have a member named 'PrivateEnumInsideInternalStruct'
   !! let privateNestedInsideInternal = InternalStruct.PrivateEnumInsideInternalStruct.A
   !! ^              ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   !! /tmp/sourcefile_1.swift:3:34: error: use of unresolved identifier 'PrivateStruct'
   !! let privateNestedInsidePrivate = PrivateStruct.PrivateEnumInsidePrivateStruct.A
   !! ^
   !! /tmp/sourcefile_1.swift:4:36: error: use of unresolved identifier 'PrivateStruct'
   !! let automaticNestedInsidePrivate = PrivateStruct.AutomaticEnumInsidePrivateStruct.A
   !! ^

.. sourcefile:: nestedTypes_Module2_Public

   // this is the only expected to succeed within the second module
   -> import nestedTypes_Module1
   -> let publicNestedInsidePublic = PublicStruct.PublicEnumInsidePublicStruct.A

.. sourcefile:: nestedTypes_Module2_InternalAndPrivate

   // these are all expected to fail, because they are private or internal to the other module
   -> import nestedTypes_Module1
   -> let internalNestedInsidePublic = PublicStruct.InternalEnumInsidePublicStruct.A
   -> let automaticNestedInsidePublic = PublicStruct.AutomaticEnumInsidePublicStruct.A
   -> let privateNestedInsidePublic = PublicStruct.PrivateEnumInsidePublicStruct.A
   ---
   -> let internalNestedInsideInternal = InternalStruct.InternalEnumInsideInternalStruct.A
   -> let automaticNestedInsideInternal = InternalStruct.AutomaticEnumInsideInternalStruct.A
   -> let privateNestedInsideInternal = InternalStruct.PrivateEnumInsideInternalStruct.A
   ---
   -> let privateNestedInsidePrivate = PrivateStruct.PrivateEnumInsidePrivateStruct.A
   -> let automaticNestedInsidePrivate = PrivateStruct.AutomaticEnumInsidePrivateStruct.A
   ---
   !! /tmp/sourcefile_0.swift:2:34: error: 'PublicStruct.Type' does not have a member named 'InternalEnumInsidePublicStruct'
   !! let internalNestedInsidePublic = PublicStruct.InternalEnumInsidePublicStruct.A
   !! ^            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   !! /tmp/sourcefile_0.swift:3:35: error: 'PublicStruct.Type' does not have a member named 'AutomaticEnumInsidePublicStruct'
   !! let automaticNestedInsidePublic = PublicStruct.AutomaticEnumInsidePublicStruct.A
   !! ^            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   !! /tmp/sourcefile_0.swift:4:33: error: 'PublicStruct.Type' does not have a member named 'PrivateEnumInsidePublicStruct'
   !! let privateNestedInsidePublic = PublicStruct.PrivateEnumInsidePublicStruct.A
   !! ^            ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   !! /tmp/sourcefile_0.swift:5:36: error: use of unresolved identifier 'InternalStruct'
   !! let internalNestedInsideInternal = InternalStruct.InternalEnumInsideInternalStruct.A
   !! ^
   !! /tmp/sourcefile_0.swift:6:37: error: use of unresolved identifier 'InternalStruct'
   !! let automaticNestedInsideInternal = InternalStruct.AutomaticEnumInsideInternalStruct.A
   !! ^
   !! /tmp/sourcefile_0.swift:7:35: error: use of unresolved identifier 'InternalStruct'
   !! let privateNestedInsideInternal = InternalStruct.PrivateEnumInsideInternalStruct.A
   !! ^
   !! /tmp/sourcefile_0.swift:8:34: error: use of unresolved identifier 'PrivateStruct'
   !! let privateNestedInsidePrivate = PrivateStruct.PrivateEnumInsidePrivateStruct.A
   !! ^
   !! /tmp/sourcefile_0.swift:9:36: error: use of unresolved identifier 'PrivateStruct'
   !! let automaticNestedInsidePrivate = PrivateStruct.AutomaticEnumInsidePrivateStruct.A
   !! ^

.. _AccessControl_Subclassing:

Subclassing
-----------

You can subclass any class that is visible in a certain access scope.
A subclass cannot have more visibility than its superclass, however ---
for example, you cannot write a public subclass of an internal superclass.

In addition, you can override any class member
(method, property, subscript, or initializer)
that is visible in a certain access scope.

An override can make an inherited class member more public than its superclass version.
In the example below, class ``A`` is a public class with a private method called ``someMethod``.
Class ``B`` is a subclass of ``A``, with a reduced access level of “internal”.
Nonetheless, class ``B`` provides an override of ``someMethod``
with an access level of “internal”, which is *higher* than
the original implementation of ``someMethod``:

.. testcode:: subclassingNoCall

   -> public class A {
         private func someMethod() {}
      }
   ---
   -> internal class B: A {
         override internal func someMethod() {}
      }

It is even valid for a subclass member to call
a superclass member with lower access permissions than itself,
as long as the call to the superclass's member takes place within
an allowed access level context
(i.e. within the same source file for a superclass private member call,
or within the same module for a superclass internal member call):

.. testcode:: subclassingWithCall

   -> public class A {
         private func someMethod() {}
      }
   ---
   -> internal class B: A {
         override internal func someMethod() {
            super.someMethod()
         }
      }

Because class ``A`` and ``B`` are defined in the same source file,
it is valid for the ``B`` implementation of ``someMethod`` to call
the ``A`` implementation of ``someMethod``,
even though the implementation from ``A`` is defined as private.

.. _AccessControl_ConstantsVariablesPropertiesAndSubscripts:

Constants, Variables, Properties, and Subscripts
------------------------------------------------

A constant, variable, or property cannot be more public than its type.
It is not valid to write a public property with a private type, for example.
Similarly, a subscript cannot be more public than either its index type or return type.

If a constant, variable, property, or subscript makes use of a private type,
the constant, variable, property, or subscript must also be marked as ``private``:

.. testcode:: accessControl

   -> private var privateInstance = SomePrivateClass()
   << // privateInstance : SomePrivateClass = _TtC4REPL16SomePrivateClass

.. assertion:: useOfPrivateTypeRequiresPrivateKeyword

   -> private class SomePrivateClass {}
   -> let privateConstant = SomePrivateClass()
   !! <REPL Input>:1:5: error: constant must be declared private because its type 'SomePrivateClass' uses a private type
   !! let privateConstant = SomePrivateClass()
   !! ^
   -> var privateVariable = SomePrivateClass()
   !! <REPL Input>:1:5: error: variable must be declared private because its type 'SomePrivateClass' uses a private type
   !! var privateVariable = SomePrivateClass()
   !! ^
   -> class C {
         var privateProperty = SomePrivateClass()
         subscript(index: Int) -> SomePrivateClass {
            return SomePrivateClass()
         }
      }
   !! <REPL Input>:2:10: error: property must be declared private because its type 'SomePrivateClass' uses a private type
   !! var privateProperty = SomePrivateClass()
   !! ^
   !! <REPL Input>:3:6: error: subscript must be declared private because its element type uses a private type
   !! subscript(index: Int) -> SomePrivateClass {
   !! ^                        ~~~~~~~~~~~~~~~~
   !! <REPL Input>:1:15: note: type declared here
   !! private class SomePrivateClass {}
   !! ^

Getters and setters for constants, variables, properties, and subscripts
automatically receive the same access level as
the constant, variable, property, or subscript they belong to.
If desired, a setter can be given a *lower* access level than its corresponding getter,
to restrict the read-write scope of that variable, property, or subscript.
This is indicated by writing ``private(set)`` or ``internal(set)``
before the ``var`` or ``subscript`` introducer.

.. note::

   This rule applies to stored properties as well as computed properties.
   Even though you do not write an explicit getter and setter for a stored property,
   Swift still synthesizes an implicit getter and setter for you
   to provide access to the stored property's backing storage.
   You can use ``private(set)`` and ``internal(set)`` to change the access level
   of this synthesized setter in exactly the same way as for an explicit setter
   in a computed property.

The example below defines a structure called ``TrackedString``,
which keeps track of the number of times that a string property is modified:

.. testcode:: reducedSetterScope

   -> struct TrackedString {
         private(set) var numberOfEdits = 0
         var value: String = "" {
            didSet {
               numberOfEdits++
            }
         }
      }

The ``TrackedString`` structure defines a stored string property called ``value``,
with an initial value of ``""`` (an empty string).
The structure also defines a stored integer property called ``numberOfEdits``,
which is used to track the number of times that ``value`` is modified.
This modification tracking is implemented with
a ``didSet`` property observer on the ``value`` property,
which increments ``numberOfEdits`` every time the ``value`` property is set to a new value.

The ``TrackedString`` structure and the ``value`` property
both receive the default access level of “internal”.
However, the access level for the ``numberOfEdits`` property is treated differently.
Even though it is a stored (rather than a computed) property,
its setter is marked with a ``private(set)`` annotation
to indicate that the property should only be settable from within the same source file.
The property's getter still has the default access level of “internal”,
but its setter is now private to the source file in which ``TrackedString`` is defined.
This enables ``TrackedString`` to modify the ``numberOfEdits`` property internally,
but to present the property as a read-only property
when it is used by other source files within the same module.

If you create a ``TrackedString`` instance and modify its string value a few times,
you can see the ``numberOfEdits`` property value change to match the number of modifications:

.. testcode:: reducedSetterScope

   -> var stringToEdit = TrackedString()
   << // stringToEdit : TrackedString = _TtV4REPL13TrackedString
   -> stringToEdit.value = "This string will be tracked."
   -> stringToEdit.value += " This edit will increment numberOfEdits."
   -> stringToEdit.value += " So will this one."
   -> println("The number of edits is \(stringToEdit.numberOfEdits)")
   <- The number of edits is 3

Although you can query the current value of the ``numberOfEdits`` property
from within another source file,
you are not able to *modify* the property from another source file.
This protects the implementation details of the ``TrackedString`` edit-tracking functionality,
while still providing convenient access to an aspect of that functionality.

.. TODO: find a way to demonstrate this within the constraints of
   a non-multi-file-based book.

.. _AccessControl_Initializers:

Initializers
------------

Custom initializers can be assigned an access level less than or equal to
the type that they initialize.
The only exception is for initializers that are required by a superclass
(as defined in :ref:`Initialization_RequiredInitializers`).
A required initializer on a subclass must have
the same access level as the subclass itself.

As with function and method parameters,
the types of an initializer's parameters cannot be more private than
the initializer's own access level.

.. note::

   Deinitializers always have the same access level as their enclosing class.
   Deinitializers are invoked by the Swift runtime, and cannot be called directly.

.. _AccessControl_DefaultInitializers:

Default Initializers
~~~~~~~~~~~~~~~~~~~~

Swift provides a :newTerm:`default initializer` (without any arguments)
for any structure or base class
that provides default values for all of its properties
and does not provide at least one initializer itself.
This default initializer is described in :ref:`Initialization_DefaultInitializers`.
Where available, the default initializer
has the same accessibility as the type it initializes.

For a type that is defined as ``public``,
the default initializer can only be accessed
within the module in which the type is defined.
If you want a public type to be initializable with a no-argument initializer
when used in another module,
provide a custom implementation of a public no-argument initializer
as part of the type's definition.

.. _AccessControl_DefaultMemberwiseInitializersForStructureTypes:

Default Memberwise Initializers for Structure Types
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The default memberwise initializer for a structure type is private unless
all of the struct's stored properties are internal or public,
in which case the initializer is internal.

As with the default initializer above,
if you want a public structure type to be initializable with a memberwise initializer
when used in another module,
you must provide a memberwise initializer yourself as part of the type's definition.

.. _AccessControl_Protocols:

Protocols
---------

Protocol types can be assigned an access level when they are defined.
This enables you to create protocols that can only be adopted within
a certain access scope.

The access level of each requirement within a protocol definition
is automatically set to the same access level as the protocol.
You cannot set a protocol requirement to a different access level than
the protocol it supports.
This ensures that all of the protocol's requirements will be visible
on any type that adopts the protocol.

.. assertion:: protocolRequirementsCannotBeDifferentThanTheProtocol

   -> public protocol PublicProtocol {
         public var publicProperty: Int { get }
         internal var internalProperty: Int { get }
         private var privateProperty: Int { get }
      }
   !! <REPL Input>:2:6: error: 'public' attribute cannot be used in protocols
   !! public var publicProperty: Int { get }
   !! ^~~~~~
   !!-
   !! <REPL Input>:3:6: error: 'internal' attribute cannot be used in protocols
   !! internal var internalProperty: Int { get }
   !! ^~~~~~~~
   !!-
   !! <REPL Input>:4:6: error: 'private' attribute cannot be used in protocols
   !! private var privateProperty: Int { get }
   !! ^~~~~~~
   !!-

.. note::

   If you define a public protocol,
   the protocol's requirements default to requiring a “public” access level
   for those requirements when they are implemented.
   This behavior is different from other types,
   where a “public” type definition implies
   a default access level of “internal”.

.. sourcefile:: protocols_Module1, protocols_Module1_PublicAndInternal, protocols_Module1_Private

   -> public protocol PublicProtocol {
         var publicProperty: Int { get }
         func publicMethod()
      }
   -> internal protocol InternalProtocol {
         var internalProperty: Int { get }
         func internalMethod()
      }
   -> private protocol PrivateProtocol {
         var privateProperty: Int { get }
         func privateMethod()
      }

.. sourcefile:: protocols_Module1_PublicAndInternal

   // these should all be allowed without problem
   -> public class PublicClassConformingToPublicProtocol: PublicProtocol {
         public var publicProperty = 0
         public func publicMethod() {}
      }
   -> internal class InternalClassConformingToPublicProtocol: PublicProtocol {
         var publicProperty = 0
         func publicMethod() {}
      }
   -> private class PrivateClassConformingToPublicProtocol: PublicProtocol {
         var publicProperty = 0
         func publicMethod() {}
      }
   ---
   -> public class PublicClassConformingToInternalProtocol: InternalProtocol {
         var internalProperty = 0
         func internalMethod() {}
      }
   -> internal class InternalClassConformingToInternalProtocol: InternalProtocol {
         var internalProperty = 0
         func internalMethod() {}
      }
   -> private class PrivateClassConformingToInternalProtocol: InternalProtocol {
         var internalProperty = 0
         func internalMethod() {}
      }

.. sourcefile:: protocols_Module1_Private

   // these will fail, because PrivateProtocol is not visible outside of its file
   -> public class PublicClassConformingToPrivateProtocol: PrivateProtocol {
         var privateProperty = 0
         func privateMethod() {}
      }
   !! /tmp/sourcefile_1.swift:1:54: error: use of undeclared type 'PrivateProtocol'
   !! public class PublicClassConformingToPrivateProtocol: PrivateProtocol {
   !! ^~~~~~~~~~~~~~~

.. sourcefile:: protocols_Module2_Public

   // these should all be allowed without problem
   -> import protocols_Module1
   -> public class PublicClassConformingToPublicProtocol: PublicProtocol {
         public var publicProperty = 0
         public func publicMethod() {}
      }
   -> internal class InternalClassConformingToPublicProtocol: PublicProtocol {
         var publicProperty = 0
         func publicMethod() {}
      }
   -> private class PrivateClassConformingToPublicProtocol: PublicProtocol {
         var publicProperty = 0
         func publicMethod() {}
      }

.. sourcefile:: protocols_Module2_InternalAndPrivate

   // these will both fail, becauswe InternalProtocol and PrivateProtocol
   // are not visible to other modules
   -> import protocols_Module1
   -> public class PublicClassConformingToInternalProtocol: InternalProtocol {
         var internalProperty = 0
         func internalMethod() {}
      }
   -> public class PublicClassConformingToPrivateProtocol: PrivateProtocol {
         var privateProperty = 0
         func privateMethod() {}
      }
   !! /tmp/sourcefile_0.swift:2:55: error: use of undeclared type 'InternalProtocol'
   !! public class PublicClassConformingToInternalProtocol: InternalProtocol {
   !! ^~~~~~~~~~~~~~~~
   !! /tmp/sourcefile_0.swift:6:54: error: use of undeclared type 'PrivateProtocol'
   !! public class PublicClassConformingToPrivateProtocol: PrivateProtocol {
   !! ^~~~~~~~~~~~~~~

.. _AccessControl_ProtocolInheritance:

Protocol Inheritance
~~~~~~~~~~~~~~~~~~~~

If you define a new protocol that inherits from an existing protocol,
the new protocol can have at most the same access level as the protocol it inherits from.
You cannot write a public protocol that inherits from an internal protocol, for example.

.. _AccessControl_ProtocolConformance:

Protocol Conformance
~~~~~~~~~~~~~~~~~~~~

A type can conform to a protocol with less accessibility than the type itself.
For example, this enables you to define a public type that can be used anywhere,
but whose conformance to a certain protocol can only be taken advantage of
within the type's original defining module.

The scope in which a type conforms to a particular protocol
has an automatic access level equal to the minimum of the type's access level
and the protocol's access level.
If a type is public, but the protocol it conforms to is internal,
the the fact that the type conforms to the protocol has an automatic access level of internal.

.. note::

   If you can't see that a type conforms to a protocol,
   you cannot use that type as an instance of the protocol type,
   even if you can see all of the type members that would otherwise enable
   the type to satisfy the protocol requirements.
   The actual protocol conformance must be visible in order for a type to be used
   as an instance of a protocol type.

When you write or extend a type to conform to a protocol,
you must ensure that the type's implementation of each protocol requirement
has at least the same access level as the type's conformance to that protocol.
For example, if a public type conforms to an internal protocol ---
giving a protocol conformance level of “internal” ---
then the type's implementation of each protocol requirement must be at least “internal” too.

.. note::

   In Swift, as in Objective-C, protocol conformance is global ---
   it is not possible for a type to conform to a protocol in two different ways
   within the same program.
   This means that if you write or extend a type to conform to a public protocol,
   you must explicitly mark the implementation of each protocol requirement as ``public``.

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

.. _AccessControl_TypeAliases:

Type Aliases
------------

Any type aliases you define are treated as distinct types for the purposes of access control.
A type alias can have an access level less than or equal to the access level of the type it aliases.
For example, a ``private`` type alias can refer to an ``internal`` or ``public`` type,
but a ``public`` type alias cannot refer to an ``internal`` or ``private`` type.

.. note::

   This rule also applies to associated types used to satisfy protocol conformances.

.. sourcefile:: typeAliases

   -> public struct PublicStruct {}
   -> internal struct InternalStruct {}
   -> private struct PrivateStruct {}
   ---
   -> public typealias PublicAliasOfPublicType = PublicStruct
   -> internal typealias InternalAliasOfPublicType = PublicStruct
   -> private typealias PrivateAliasOfPublicType = PublicStruct
   ---
   -> public typealias PublicAliasOfInternalType = InternalStruct     // not allowed
   -> internal typealias InternalAliasOfInternalType = InternalStruct
   -> private typealias PrivateAliasOfInternalType = InternalStruct
   ---
   -> public typealias PublicAliasOfPrivateType = PrivateStruct       // not allowed
   -> internal typealias InternalAliasOfPrivateType = PrivateStruct   // not allowed
   -> private typealias PrivateAliasOfPrivateType = PrivateStruct
   ---
   !! /tmp/sourcefile_0.swift:7:18: error: type alias cannot be declared public because its underlying type uses an internal type
   !! public typealias PublicAliasOfInternalType = InternalStruct     // not allowed
   !! ^                           ~~~~~~~~~~~~~~
   !! /tmp/sourcefile_0.swift:2:17: note: type declared here
   !! internal struct InternalStruct {}
   !! ^
   !! /tmp/sourcefile_0.swift:10:18: error: type alias cannot be declared public because its underlying type uses a private type
   !! public typealias PublicAliasOfPrivateType = PrivateStruct       // not allowed
   !! ^                          ~~~~~~~~~~~~~
   !! /tmp/sourcefile_0.swift:3:16: note: type declared here
   !! private struct PrivateStruct {}
   !! ^
   !! /tmp/sourcefile_0.swift:11:20: error: type alias cannot be declared internal because its underlying type uses a private type
   !! internal typealias InternalAliasOfPrivateType = PrivateStruct   // not allowed
   !! ^                            ~~~~~~~~~~~~~
   !! /tmp/sourcefile_0.swift:3:16: note: type declared here
   !! private struct PrivateStruct {}
   !! ^