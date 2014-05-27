Attributes
==========

:newTerm:`Attributes` provide more information about a declaration or type.
There are two kinds of attributes in Swift, those that apply to declarations
and those that apply to types.
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

..  ``availability(arguments)`` (OnFunc | OnEnum | OnClass | OnProtocol | OnVar | OnConstructor | OnDestructor; AllowMultipleAttributes)
    Update from Ted:
    "Let’s document this after WWDC, as details continue to evolve.
    Some functionality will be in place before the conference, but this is mainly for API authors.
    Since no Swift APIs will be published until at least 2.0, this isn’t even needed right now.
    It mainly serves as plumbing right now to import the availability information from Clang."

    Keep an eye out for ``virtual``, which is coming soon (probably not for WWDC).
    "It's not there yet, but it'll be there at runtime, trust me."

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

``class_protocol``
    Apply this attribute to a protocol to indicate
    that the protocol can be adopted by class types only.

    If you apply the ``objc`` attribute to a protocol, the ``class_protocol`` attribute
    is implicitly applied to that protocol; there's no need to mark the protocol with
    the ``class_protocol`` attribute explicitly.

``exported``
    Apply this attribute to an import declaration to export
    the imported module, submodule, or declaration from the current module.
    If another module imports the current module, that other module can access
    the items exported by the current module.

``final``
    Apply this attribute to a class or to a property, method,
    or subscript member of a class. It's applied to a class to indicate that the class
    can't be subclassed. It's applied to a property, method, or subscript of a class
    to indicate that that class member can't be overridden in any subclass.

.. TODO: Dave may or may not include an example of how to use the 'final' attribute
    in the guide. If he does, include the following sentence:
    For an example of how to use the ``final`` attribute,
    see :ref:`Inheritance_FinalMethodsPropertiesAndSubscripts`.

``lazy``
    Apply this attribute to a stored variable property of a class or structure
    to indicate that the property's initial value is calculated and stored at most
    once, when the property is first accessed.
    For an example of how to use the ``lazy`` attribute,
    see :ref:`Properties_LazyStoredProperties`.

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

``NSCopying``
    Apply this attribute to a stored variable property of a class.
    This attribute causes the property's setter to be synthesized with a *copy*
    of the property's value---returned by the ``copyWithZone`` method---instead of the
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
    for example, non-nested classes, protocols, properties and methods
    (including getters and setters) of classes and protocols, initializers,
    deinitializers, and subscripts. The ``objc`` attribute tells the compiler
    that a declaration is available to use in Objective-C code.

    If you apply the ``objc`` attribute to a class or protocol, it's
    implicitly applied to the members of that class or protocol.
    The compiler also implicitly adds the ``objc`` attribute to a class
    that inherits from another class marked with the ``objc`` attribute.
    Protocols marked with the ``objc`` attribute can't inherit
    from protocols that aren't.

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
    provide a link to the relevant section. Possibly link to Anna and Jacks guide too.

``optional``
    Apply this attribute to a protocol's property, method,
    or subscript members to indicate that a conforming type isn't required
    to implement those members.

    You can apply the ``optional`` attribute only to protocols that are marked
    with the ``objc`` attribute. As a result, only class types can adopt and conform
    to a protocol that contains optional member requirements.
    For more information about how to use the ``optional`` attribute
    and for guidance about how to access optional protocol members---
    for example, when you're not sure whether a conforming type implements them---
    see :ref:`Protocols_OptionalProtocolRequirements`.

.. TODO: Currently, you can't check for an optional initializer,
    so we're leaving those out of the documentation, even though you can mark
    an initializer with the @optional attribute. It's still being decided by the
    compiler team. Update this section if they decide to make everything work
    properly for optional initializer requirements.

``required``
    Apply this attribute to a designated or convenience initializer
    of a class to indicate that every subclass must implement that initializer.

    Required designated initializers must be implemented explicitly.
    Required convenience initializers can be either implemented explicitly
    or inherited when the subclass directly implements all of the superclass’s designated
    initializers
    (or when the subclass overrides the designated initializers with convenience initializers).

.. TODO: 'weak' is now a CS keyword. Probably need to find somewhere else to describe it.
    If and when Dave includes a section about this in the Guide,
    provide a link to the relevant section.

    ``weak``
        The ``weak`` attribute is applied to a stored property, variable, or constant
        to indicate that the property, variable, or constant has a weak reference to the
        object stored as its value. The type of the property, variable, or constant
        must be an optional class type. Use the ``weak`` attribute to avoid strong
        reference cycles.


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

``auto_closure``
    This attribute is used to delay the evaluation of an expression
    by automatically wrapping that expression in a closure with no arguments.
    Apply this attribute to a function or method type that takes no arguments
    and that returns the type of the expression.
    For an example of how to use the ``auto_closure`` attribute,
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
    attribute      ::= attribute-auto_closure
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
