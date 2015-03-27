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

``availability``
    Apply this attribute to any declaration to indicate the declaration's lifecycle
    relative to certain platforms and operating system versions.

    The ``availability`` attribute always appears
    with a list of two or more comma-separated attribute arguments.
    These arguments begin with one of the following platform names:
    ``iOS``, ``iOSApplicationExtension``, ``OSX``, or
    ``OSXApplicationExtension``. You can also use an asterisk (``*``) to indicate the
    availability of the declaration on all of the platform names listed above.
    The remaining arguments can appear in any order
    and specify additional information about the declaration's lifecycle,
    including important milestones.

    * The ``unavailable`` argument indicates that the declaration isn't available on the specified platform.
    * The ``introduced`` argument indicates the first version of the specified platform in which the declaration was introduced.
      It has the following form:

      .. syntax-outline::

          introduced=<#version number#>

      The *version number* consists of a positive integer or floating-point decimal number.
    * The ``deprecated`` argument indicates the first version of the specified platform in which the declaration was deprecated.
      It has the following form:

      .. syntax-outline::

          deprecated=<#version number#>

      The *version number* consists of a positive integer or floating-point decimal number.
    * The ``obsoleted`` argument indicates the first version of the specified platform in which the declaration was obsoleted.
      When a declaration is obsoleted, it's removed from the specified platform and can no longer be used.
      It has the following form:

      .. syntax-outline::

          obsoleted=<#version number#>

      The *version number* consists of a positive integer or floating-point decimal number.
    * The ``message`` argument is used to provide a textual message that's displayed by the compiler
      when emitting a warning or error about the use of a deprecated or obsoleted declaration.
      It has the following form:

      .. syntax-outline::

          message=<#message#>

      The *message* consists of a string literal.
    * The ``renamed`` argument is used to provide a textual message
      that indicates the new name for a declaration that's been renamed.
      The new name is displayed by the compiler when emitting an error about the use of a renamed declaration.
      It has the following form:

      .. syntax-outline::

          renamed=<#new name#>

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
         -> @availability(*, unavailable, renamed="MyRenamedProtocol")
            typealias MyProtocol = MyRenamedProtocol

    You can apply multiple ``availability`` attributes on a single declaration
    to specify the declaration's availability on different platforms.
    The compiler uses an ``availability`` attribute only when the attribute specifies
    a platform that matches the current target platform.

..    Keep an eye out for ``virtual``, which is coming soon (probably not for WWDC).
    "It's not there yet, but it'll be there at runtime, trust me."

.. NOTE: As of Beta 5, 'assignment' is removed from the language.
    I'm keeping the prose here in case it comes back for some reason.

    ``assignment``
        Apply this attribute to functions that overload
        a compound assignment operator.
        Functions that overload a compound assignment operator must mark
        their initial input parameter as ``inout``.
        For an example of how to use the ``assignment`` attribute,
        see :ref:`AdvancedOperators_CompoundAssignmentOperators`.

.. NOTE: ``assignment doesn't seem to be required as of r16459.
    Emailed swift-dev on 4/17/14 with the following example:

    (swift) struct Vector2D {
             var x = 0.0, y = 0.0
        }
    (swift) func += (inout lhs: Vector2D, rhs: Vector2D) {
              lhs = Vector2D(lhs.x + rhs.x, lhs.y + rhs.y)
            }
    (swift) var original = Vector2D(1.0, 2.0)
    // original : Vector2D = Vector2D(1.0, 2.0)
    (swift) let vectorToAdd = Vector2D(3.0, 4.0)
    // vectorToAdd : Vector2D = Vector2D(3.0, 4.0)
    (swift) original += vectorToAdd
    (swift) original
    // original : Vector2D = Vector2D(4.0, 6.0)

    Update from [Contributor 7746]: This is a bug; he filed <rdar://problem/16656024> to track it.

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

.. Note: At the design meeting on June 17th,
    it was decided that we don't want people to be using "exported" at the moment.
    It's really only intended for framework development (it's used in the Obj-C overlay).
    Commenting this out until this attribute is ready for prime time,
    to fix <rdar://problem/17346713> Remove the "exported" attribute from the Reference

    ``exported``
        Apply this attribute to an import declaration to export
        the imported module, submodule, or declaration from the current module.
        If another module imports the current module, that other module can access
        the items exported by the current module.

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
    ``NSApplicationMain`` function and
    passing this class's name as the name of the delegate class.

    If you do not use this attribute,
    supply a ``main.swift`` file with a ``main`` function
    that calls the ``NSApplicationMain`` function.
    For example,
    if your app uses a custom subclass of ``NSApplication``
    as its principal class,
    call the ``NSApplicationMain`` function
    instead of using this attribute.

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
    Apply this attribute to a stored variable property of a class that inherits from
    ``NSManagedObject`` to indicate that the storage and implementation of the
    property are provided dynamically by Core Data at runtime
    based on the associated entity description.

``objc``
    Apply this attribute to any declaration that can be represented in Objective-C---
    for example, non-nested classes, protocols,
    nongeneric enumerations (constrained to integer raw-value types),
    properties and methods (including getters and setters) of classes and protocols,
    initializers, deinitializers, and subscripts.
    The ``objc`` attribute tells the compiler
    that a declaration is available to use in Objective-C code.

    If you apply the ``objc`` attribute to a class or protocol, it's
    implicitly applied to the members of that class or protocol.
    The compiler also implicitly adds the ``objc`` attribute to a class
    that inherits from another class marked with the ``objc`` attribute.
    Protocols marked with the ``objc`` attribute can't inherit
    from protocols that aren't.

    If you apply the ``objc`` attribute to an enumeration,
    each enumeration case is exposed to Objective-C code
    as the concatenation of the enumeration name and the case name.
    For example, a case named ``Venus`` in a Swift ``Planet`` enumeration
    is exposed to Objective-C code as a case named ``PlanetVenus``.

    The ``objc`` attribute optionally accepts a single attribute argument,
    which consists of an identifier.
    Use this attribute when you want to expose a different
    name to Objective-C for the entity the ``objc`` attribute applies to.
    You can use this argument to name classes, protocols, methods,
    getters, setters, and initializers. The example below exposes
    the getter for the ``enabled`` property of the ``ExampleClass``
    to Objective-C code as ``isEnabled``
    rather than just as the name of the property itself.

    .. testcode:: objc-attribute
       :compile: true

       >> import Foundation
       -> @objc
          class ExampleClass {
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

``UIApplicationMain``
    Apply this attribute to a class
    to indicate that it is the application delegate.
    Using this attribute is equivalent to calling the
    ``UIApplicationMain`` function and
    passing this class's name as the name of the delegate class.

    If you do not use this attribute,
    supply a ``main.swift`` file with a ``main`` function
    that calls the ``UIApplicationMain`` function.
    For example,
    if your app uses a custom subclass of ``UIApplication``
    as its principal class,
    call the ``UIApplicationMain`` function
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
``IBAction``, ``IBDesignable``, ``IBInspectable``, and ``IBOutlet``.
These attributes are conceptually the same as their
Objective-C counterparts.

.. TODO: Need to link to the relevant discussion of these attributes in Objc.

You apply the ``IBOutlet`` and ``IBInspectable`` attributes
to property declarations of a class. You apply the ``IBAction`` attribute
to method declarations of a class and the ``IBDesignable`` attribute
to class declarations.


.. _Attributes_TypeAttributes:

Type Attributes
---------------

You can apply type attributes to types only. However, you can also apply the ``noreturn``
attribute to a function or method *declaration*.

..  ``cc`` // Mainly used for SIL at the moment. May eventually surface in the Swift
              type system at some point (for power users that need to tweak calling conventions).
    ``objc_block`` // Not documenting.
    ``thin`` // Mainly used for SIL at the moment. Not documenting for 1.0.
    ``thick`` // Mainly used for SIL at the moment. Not documenting for 1.0.

    // @thin and @cc are only accepted in SIL. (from attributes.swift test)
    var thinFunc : @thin () -> () // expected-error {{attribute is not supported}}
    var ccFunc : @cc(cdecl) () -> () // expected-error {{attribute is not supported}}

``autoclosure``
    This attribute is used to delay the evaluation of an expression
    by automatically wrapping that expression in a closure with no arguments.
    Apply this attribute to a function or method type that takes no arguments
    and that returns the type of the expression.
    For an example of how to use the ``autoclosure`` attribute,
    see :ref:`Types_FunctionType`.

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


.. TODO:
    Find out if there's a solution to the "!" inverted attributes problem.
    It'd be nice if we didn't have to use ! for this meaning too.
    If we decide to keep it, I'll need to update the grammar accordingly.
    UPDATE: According to [Contributor 7746], we'll leave it in for now, so that we can
    eventually use it for @!objc. We probably won't have @!objc before WWDC.
