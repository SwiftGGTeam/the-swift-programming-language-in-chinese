Attributes
==========

:newTerm:`Attributes` provide more information about a declaration or type.
There are two kinds of attributes in Swift, those that apply to declarations
and those that apply to types.

.. NOTE: The first example isn't relevant anymore,
    because ``required`` is now a CS-keyword and no longer an attribute.
    I'm keeping this paragraph in a note so I can bring it back after
    we have a suitable replacement attribute to include in the example.

    For instance, the ``required`` attribute---when applied to a designated or convenience initializer
    declaration of a class---indicates that every subclass must implement that initializer.
    And the ``noreturn`` attribute---when applied to a function or method type---indicates that
    the function or method doesn't return to its caller.

You specify an attribute by writing the ``@`` symbol followed by the attribute's name
and any arguments that the attribute accepts:

.. syntax-outline::

    @<#attribute name#>
    @<#attribute name#>(<#attribute arguments#>)

Some declaration attributes accept arguments that specify more information about the attribute
and how it applies to a particular declaration. These *attribute arguments* are enclosed
in parentheses, and their format is defined by the attribute they belong to.


.. _Attributes_DeclarationAttributes:

Declaration Attributes
----------------------

You can apply a declaration attribute to declarations only. However, you can also apply
the ``noreturn`` attribute to a function or method *type*.

``available``
    Apply this attribute to any declaration to indicate the declaration's lifecycle
    relative to certain platforms and operating system versions.

    The ``available`` attribute always appears
    with a list of two or more comma-separated attribute arguments.
    These arguments begin with one of the following platform names:

    * ``iOS``
    * ``iOSApplicationExtension``
    * ``OSX``
    * ``OSXApplicationExtension``
    * ``watchOS``
    * ``watchOSApplicationExtension``
    * ``tvOS``
    * ``tvOSApplicationExtension``

    .. For the list in source, see include/swift/AST/PlatformKinds.def

    You can also use an asterisk (``*``) to indicate the
    availability of the declaration on all of the platform names listed above.

    The remaining arguments can appear in any order
    and specify additional information about the declaration's lifecycle,
    including important milestones.

    * The ``unavailable`` argument indicates that the declaration isn't available on the specified platform.
    * The ``introduced`` argument indicates the first version of the specified platform in which the declaration was introduced.
      It has the following form:

      .. syntax-outline::

          introduced: <#version number#>

      The *version number* consists of one or more positive integers, separated by periods.
    * The ``deprecated`` argument indicates the first version of the specified platform in which the declaration was deprecated.
      It has the following form:

      .. syntax-outline::

          deprecated: <#version number#>

      The optional *version number* consists of one or more positive integers, separated by periods.
      Omitting the version number indicates that the declaration is currently deprecated,
      without giving any information about when the deprecation occurred.
      If you omit the version number, omit the colon (``:``) as well.
    * The ``obsoleted`` argument indicates the first version of the specified platform in which the declaration was obsoleted.
      When a declaration is obsoleted, it's removed from the specified platform and can no longer be used.
      It has the following form:

      .. syntax-outline::

          obsoleted: <#version number#>

      The *version number* consists of one or more positive integers, separated by periods.
    * The ``message`` argument is used to provide a textual message that's displayed by the compiler
      when emitting a warning or error about the use of a deprecated or obsoleted declaration.
      It has the following form:

      .. syntax-outline::

          message: <#message#>

      The *message* consists of a string literal.
    * The ``renamed`` argument is used to provide a textual message
      that indicates the new name for a declaration that's been renamed.
      The new name is displayed by the compiler when emitting an error about the use of a renamed declaration.
      It has the following form:

      .. syntax-outline::

          renamed: <#new name#>

      The *new name* consists of a string literal.

      You can use the ``renamed`` argument in conjunction with the ``unavailable``
      argument and a type alias declaration to indicate to clients of your code
      that a declaration has been renamed. For example, this is useful when the name
      of a declaration is changed between releases of a framework or library.

      .. testcode:: renamed1
         :compile: true

         -> // First release
         -> protocol MyProtocol {
                // protocol definition
            }

      .. testcode:: renamed2
         :compile: true

         -> // Subsequent release renames MyProtocol
         -> protocol MyRenamedProtocol {
                // protocol definition
            }
         ---
         -> @available(*, unavailable, renamed: "MyRenamedProtocol")
            typealias MyProtocol = MyRenamedProtocol

    You can apply multiple ``available`` attributes on a single declaration
    to specify the declaration's availability on different platforms.
    The compiler uses an ``available`` attribute only when the attribute specifies
    a platform that matches the current target platform.

    If an ``available`` attribute only specifies an ``introduced`` argument
    in addition to a platform name argument,
    the following shorthand syntax can be used instead:

    .. syntax-outline::

        @available(<#platform name#> <#version number#>, *)

    The shorthand syntax for ``available`` attributes allows for
    availability for multiple platforms to be expressed concisely.
    Although the two forms are functionally equivalent,
    the shorthand form is preferred whenever possible.

    .. testcode:: availableShorthand
       :compile: true

       -> @available(iOS 8.0, OSX 10.10, *)
       -> class MyClass {
              // class definition
          }

..    Keep an eye out for ``virtual``, which is coming soon (probably not for WWDC).
    "It's not there yet, but it'll be there at runtime, trust me."

.. NOTE: As of Beta 5, 'class_protocol' is removed from the language.
    I'm keeping the prose here in case it comes back for some reason.
    Semantically, the it's replaced with a 'class' requirement,
    e.g., @class_protocol protocol P {} --> protocol P: class {}

    ``class_protocol``
        Apply this attribute to a protocol to indicate
        that the protocol can be adopted by class types only.

        If you apply the ``objc`` attribute to a protocol, the ``class_protocol`` attribute
        is implicitly applied to that protocol; there's no need to mark the protocol with
        the ``class_protocol`` attribute explicitly.

``discardableResult``
   Apply this attribute to a function or method declaration
   to suppress the compiler warning
   when the function or method that returns a value
   is called without using its result.

``GKInspectable``
    Apply this attribute to expose a custom GameplayKit component property 
    to the SpriteKit editor UI.

.. See also <rdar://problem/27287369> Document @GKInspectable attribute
   which we will want to link to, once it's written.

``objc``
    Apply this attribute to any declaration that can be represented in Objective-C---
    for example, non-nested classes, protocols,
    nongeneric enumerations (constrained to integer raw-value types),
    properties and methods (including getters and setters) of classes and protocols,
    initializers, deinitializers, and subscripts.
    The ``objc`` attribute tells the compiler
    that a declaration is available to use in Objective-C code.

    Classes marked with the ``objc`` attribute
    must inherit from a class defined in Objective-C.
    If you apply the ``objc`` attribute to a class or protocol, it's
    implicitly applied to the Objective-C compatible members of that class or protocol.
    The compiler also implicitly adds the ``objc`` attribute to a class
    that inherits from another class marked with the ``objc`` attribute
    or a class defined in Objective-C.
    Protocols marked with the ``objc`` attribute can't inherit
    from protocols that aren't.

    If you apply the ``objc`` attribute to an enumeration,
    each enumeration case is exposed to Objective-C code
    as the concatenation of the enumeration name and the case name.
    The first letter of the case name is capitalized.
    For example, a case named ``venus`` in a Swift ``Planet`` enumeration
    is exposed to Objective-C code as a case named ``PlanetVenus``.

    The ``objc`` attribute optionally accepts a single attribute argument,
    which consists of an identifier.
    Use this attribute when you want to expose a different
    name to Objective-C for the entity the ``objc`` attribute applies to.
    You can use this argument to name
    classes, enumerations, enumeration cases, protocols,
    methods, getters, setters, and initializers.
    The example below exposes
    the getter for the ``enabled`` property of the ``ExampleClass``
    to Objective-C code as ``isEnabled``
    rather than just as the name of the property itself.

    .. testcode:: objc-attribute
       :compile: true

       >> import Foundation
       -> @objc
          class ExampleClass: NSObject {
             var enabled: Bool {
                @objc(isEnabled) get {
                   // Return the appropriate value
       >>          return true
                }
             }
          }

.. TODO: If and when Dave includes a section about this in the Guide,
    provide a link to the relevant section.
    Possibly link to Anna and Jack's guide too.

``nonobjc``
    Apply this attribute to a
    method, property, subscript, or initializer declaration
    to suppress an implicit ``objc`` attribute.
    The ``nonobjc`` attribute tells the compiler
    to make the declaration unavailable in Objective-C code,
    even though it is possible to represent it in Objective-C.

    You use the ``nonobjc`` attribute to resolve circularity
    for bridging methods in a class marked with the ``objc`` attribute,
    and to allow overloading of methods and initializers
    in a class marked with the ``objc`` attribute.

    A method marked with the ``nonobjc`` attribute
    cannot override a method marked with the ``objc`` attribute.
    However, a method marked with the ``objc`` attribute
    can override a method marked with the ``nonobjc`` attribute.
    Similarly, a method marked with the ``nonobjc`` attribute
    cannot satisfy a protocol requirement
    for a method marked with the ``objc`` attribute.

``noreturn``
    Apply this attribute to a function or method declaration
    to indicate that the corresponding type of that function or method,
    ``T``, is ``@noreturn T``.
    You can mark a function or method type with this attribute to indicate that
    the function or method doesn't return to its caller.

    You can override a function or method that is not marked with the ``noreturn``
    attribute with a function or method that is. That said, you can't override
    a function or method that is marked with the ``noreturn`` attribute with a function
    or method that is not. Similar rules apply when you implement a protocol
    method in a conforming type.

``NSApplicationMain``
    Apply this attribute to a class
    to indicate that it is the application delegate.
    Using this attribute is equivalent to calling the
    ``NSApplicationMain(_:_:)`` function.

    If you do not use this attribute,
    supply a ``main.swift`` file with code at the top level
    that calls the ``NSApplicationMain(_:_:)`` function as follows:

    .. testcode:: nsapplicationmain

       -> import AppKit
       -> NSApplicationMain(Process.argc, Process.unsafeArgv)
       !$ No Info.plist file in application bundle or no NSPrincipalClass in the Info.plist file, exiting

``NSCopying``
    Apply this attribute to a stored variable property of a class.
    This attribute causes the property's setter to be synthesized with a *copy*
    of the property's value---returned by the ``copyWithZone(_:)`` method---instead of the
    value of the property itself.
    The type of the property must conform to the ``NSCopying`` protocol.

    The ``NSCopying`` attribute behaves in a way similar to the Objective-C ``copy``
    property attribute.

.. TODO: If and when Dave includes a section about this in the Guide,
    provide a link to the relevant section.

``NSManaged``
    Apply this attribute to an instance method or stored variable property
    of a class that inherits from ``NSManagedObject``
    to indicate that Core Data dynamically provides its implementation at runtime,
    based on the associated entity description.
    For a property marked with the ``NSManaged`` attribute,
    Core Data also provides the storage at runtime.
    Applying this attribute also implies the ``objc`` attribute.

``testable``
    Apply this attribute to ``import`` declarations
    for modules compiled with testing enabled
    to access any entities marked with the ``internal`` access level modifier
    as if they were declared with the ``public`` access level modifier.

``UIApplicationMain``
    Apply this attribute to a class
    to indicate that it is the application delegate.
    Using this attribute is equivalent to calling the
    ``UIApplicationMain`` function and
    passing this class's name as the name of the delegate class.

    If you do not use this attribute,
    supply a ``main.swift`` file with code at the top level
    that calls the ``UIApplicationMain(_:_:_:)`` function.
    For example,
    if your app uses a custom subclass of ``UIApplication``
    as its principal class,
    call the ``UIApplicationMain(_:_:_:)`` function
    instead of using this attribute.

.. TODO: Replace the code voice above with the following:
   `UIApplicationMain <//apple_ref/c/func/UIApplicationMain>`_ function.
   Blocked by <rdar://problem/17682758> RST: Add support for uAPI links.

.. _Attributes_DeclarationAttributesUsedByInterfaceBuilder:

Declaration Attributes Used by Interface Builder
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Interface Builder attributes are declaration attributes
used by Interface Builder to synchronize with Xcode.
Swift provides the following Interface Builder attributes:
``IBAction``, ``IBOutlet``, ``IBDesignable``, and ``IBInspectable``.
These attributes are conceptually the same as their
Objective-C counterparts.

.. TODO: Need to link to the relevant discussion of these attributes in Objc.

You apply the ``IBOutlet`` and ``IBInspectable`` attributes
to property declarations of a class. You apply the ``IBAction`` attribute
to method declarations of a class and the ``IBDesignable`` attribute
to class declarations.

Both the ``IBAction`` and ``IBOutlet`` attributes imply the ``objc`` attribute.


.. _Attributes_TypeAttributes:

Type Attributes
---------------

You can apply type attributes to types only.
However, you can also apply the ``noreturn`` attribute
to a function or method *declaration*.

``autoclosure``
    This attribute is used to delay the evaluation of an expression
    by automatically wrapping that expression in a closure with no arguments.
    Apply this attribute to a parameter's type in a method or function declaration,
    for a parameter of a function type that takes no arguments
    and that returns a value of the type of the expression.
    Declarations with the ``autoclosure`` attribute imply ``noescape`` as well,
    except when passed the optional attribute argument ``escaping``.
    For an example of how to use the ``autoclosure`` attribute,
    see :ref:`Closures_Autoclosures` and :ref:`Types_FunctionType`.

``convention``
   Apply this attribute to the type of a function
   to indicate its calling conventions.

   The ``convention`` attribute always appears with
   one of the attribute arguments below.

   * The ``swift`` argument is used to indicate a Swift function reference.
     This is the standard calling convention for function values in Swift.
   * The ``block`` argument is used to indicate an Objective-C compatible block reference.
     The function value is represented as a reference to the block object,
     which is an ``id``-compatible Objective-C object that embeds its invocation
     function within the object.
     The invocation function uses the C calling convention.
   * The ``c`` argument is used to indicate a C function reference.
     The function value carries no context and uses the C calling convention.

   A function with C function calling conventions can be used as
   a function with Objective-C block calling conventions,
   and a function with Objective-C block calling conventions can be used as
   a function with Swift function calling conventions.
   However, only nongeneric global functions, and
   local functions or closures that don't capture any local variables,
   can be used as a function with C function calling conventions.

``noescape``
    Apply this attribute to a parameter's type in a method or function declaration
    to indicate that the parameter's value will not be stored for later execution.
    This means that the value is guaranteed not to outlive the lifetime of the call.
    Function type parameters with the ``noescape`` declaration attribute
    do not require explicit use of ``self.`` for properties or methods.
    For an example of how to use the ``noescape`` attribute,
    see :ref:`Closures_Noescape`.

``noreturn``
    Apply this attribute to the type of a function or method
    to indicate that the function or method doesn't return to its caller.
    You can also mark a function or method declaration with this attribute to indicate that
    the corresponding type of that function or method, ``T``, is ``@noreturn T``.

.. langref-grammar

    attribute-list        ::= /*empty*/
    attribute-list        ::= attribute-list-clause attribute-list
    attribute-list-clause ::= '@' attribute
    attribute-list-clause ::= '@' attribute ','? attribute-list-clause
    attribute      ::= attribute-infix
    attribute      ::= attribute-resilience
    attribute      ::= attribute-inout
    attribute      ::= attribute-autoclosure
    attribute      ::= attribute-noreturn

.. NOTE: LangRef grammar is way out of date.

.. syntax-grammar::

    Grammar of an attribute

    attribute --> ``@`` attribute-name attribute-argument-clause-OPT
    attribute-name --> identifier
    attribute-argument-clause --> ``(`` balanced-tokens-OPT ``)``
    attributes --> attribute attributes-OPT

    balanced-tokens --> balanced-token balanced-tokens-OPT
    balanced-token --> ``(`` balanced-tokens-OPT ``)``
    balanced-token --> ``[`` balanced-tokens-OPT ``]``
    balanced-token --> ``{`` balanced-tokens-OPT ``}``
    balanced-token --> Any identifier, keyword, literal, or operator
    balanced-token --> Any punctuation except ``(``, ``)``, ``[``, ``]``, ``{``, or ``}``
