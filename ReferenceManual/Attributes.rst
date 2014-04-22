Attributes
==========

:newTerm:`Attributes` provide more information about a declaration or type.
There are two kinds of attributes in Swift, those that apply to declarations
and those that apply to types.
For instance, the ``required`` attribute is applied to a designated or convenience initializer
declaration of a class to indicate that every subclass must implement that initializer.
The ``noreturn`` attribute is applied to a function or method type to indicate that
the function or method doesn't return to its caller.

Attributes are specified by writing the ``@`` symbol followed by the attribute's name
and any arguments that the attribute accepts:

.. syntax-outline::

    @<#attribute name#>
    @<#attribute name#>(<#attribute arguments#>)

Some declaration attributes accept arguments that specify more information about the attribute
and how it applies to a particular declaration. These *attribute arguments* are enclosed
in parentheses and their format is defined by the attribute they belong to.

.. TR: Which attributes are inheritable and which attribute imply other attributes?

.. _Attributes_DeclarationAttributes:

Declaration Attributes
----------------------

Declaration attributes are applied to declarations only. However, you can also apply
the ``noreturn`` attribute to a function or method type.

.. Current list of declaration attributes (as of 4/16/14, r16419):
    ✓ ``assignment`` (OnFunc)

    // @availability isn't implemented yet. Find out from Ted when it's going to be.
    ``availability(arguments)`` (OnFunc | OnEnum | OnClass | OnProtocol | OnVar | OnConstructor | OnDestructor; AllowMultipleAttributes)

    ✓ ``class_protocol`` (OnProtocol)
    ✓ ``exported`` (OnImport)
    ✓ ``final`` (OnClass | OnFunc | OnVar | OnSubscript)

    ``NSCopying`` (OnVar)
    ✓ ``noreturn`` (OnFunc)
    ``objc(arguments)`` (OnFunc | OnClass | OnProtocol | OnVar | OnSubscript | OnConstructor | OnDestructor)

    ✓ ``required`` (OnConstructor)

    ``override`` (OnFunc | OnVar | OnSubscript) *Now a contextual keyword, not an attribute

    // Need info about where they can appear and whether they allow multiples:
    ✓ ``optional``
    ``transparent`` // Per Doug's email on 3/25, we probably shouldn't document this.
    ``unowned``
    ``weak``
    ``requires_stored_property_inits``

    ✓ Keep an eye out for ``call_arguments(arguments)``, which is coming soon.
    (We know the behavior of this attribute, so I'm going to document it now.

    Keep an eye out for ``abstract``, which is coming soon (probably for WWDC).
    "I don't provide an implementation, but subclasses **must**."
    Similar to a class cluster in ObjC.

    Keep an eye out for ``virtual``, which is coming soon (probably not for WWDC).
    "It's not there yet, but it'll be there at runtime, trust me."

``assignment``
    The ``assignment`` attribute is applied to functions that overload
    a compound assignment operator.
    Functions that overload a compound assignment operator must mark
    their initial input parameter as ``inout``.
    For an example of how to use the ``assignment`` attribute,
    see :ref:`AdvancedOperators_CompoundAssignmentOperators`.

.. TR: ``assignment doesn't seem to be required as of r16459. Is this correct?
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

``availability``

.. write-me::


``call_arguments(strict)``
    The ``call_arguments(strict)`` attribute is applied to any function or method to
    indicate that you must use the parameter names of that function or method when calling
    it. In addition, you must specify those parameter names in the same order
    in which they are declared as part of the function or methods definition.
    For an example of how to use the ``call_arguments(strict)`` attribute,
    see :ref:`Functions_StrictParameterNames`.

.. TODO: This might not be the final name of this attribute. Update this info
    after it's been implemented.

``class_protocol``
    The ``class_protocol`` attribute is applied to a protocol to indicate
    that the protocol can be adopted by class types only.

    If you apply the ``objc`` attribute to a protocol, the ``class_protocol`` attribute
    is implicitly applied to that protocol; there's no need to mark the protocol with
    the ``class_protocol`` explicitly.

``exported``
    The ``exported`` attribute is applied to an import declaration to export
    the imported module, submodule, or declaration from the current module.
    If another module imports the current module, that other module can access
    the items exported by the current module.

``final``
    The ``final`` attribute can be applied to a class or to a property, method,
    or subscript member of a class. It is applied to class to indicate that the class
    can't be subclassed. It is applied to a property, method, or subscript of a class
    to indicate that those class members can't be overridden in any subclass.

.. TODO: Dave may or may not include an example of how to use the 'final' attribute
    in the guide. If he does, include the following sentence:
    For an example of how to use the ``final`` attribute,
    see :ref:`Inheritance_FinalMethodsPropertiesAndSubscripts`.

``noreturn``
    The ``noreturn`` attribute is applied to a function or method declaration
    to indicate that the corresponding type of that function or method,
    ``T``, is ``@noreturn T``.
    You can mark a function or method type with this attribute to indicate that
    the function or method doesn't return to its caller.

.. You can't override a @noreturn method with a returning one. That said,
    you can override a method that isn't marked with @noreturn with one that is.
    The same holds true for implementing protocol requirements.

.. TR: Need some more info on this attribute. Is the above correct? What else should we
    document here? How about some actual examples?

``NSCopying``

.. write-me::

``objc``

.. write-me::


``optional``
    The ``optional`` attribute is applied to a protocol's property, method,
    or subscript members to indicate that a conforming type isn't required
    to implement those members.

    The ``optional`` attribute can be applied only to protocols that are marked
    with the ``objc`` attribute. As a result, only classes types can adopt and conform
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
    The ``required`` attribute is applied to a designated or convenience initializer
    of a class to indicate that every subclass must implement that initializer.

    Required designated initializers must be implemented explicitly.
    Required convenience initializers can be either implemented explicitly
    or inherited when the subclass directly implements all of the superclass’s designated
    initializers (or overrides the designated initializers with convenience initializers).

``weak``

.. write-me::


.. _Attributes_InterfaceBuilderAttributes:

Interface Builder Attributes
----------------------------

Interface Builder attributes are applied to method and property declarations
and are used by Interface Builder to synchronize with Xcode.

.. Current list of IB attributes (as of 4/16/14, r16419):
    // Talk to Tony and Robert Morrish about where go for more information.
    ``IBAction`` (OnFunc)
    ``IBDesignable`` (OnClass)
    ``IBInspectable`` (OnVar)
    ``IBOutlet`` (OnVar)

``IBAction``

.. write-me::

``IBDesignable``

.. write-me::

``IBInspectable``

.. write-me::

``IBOutlet``

.. write-me::


.. _Attributes_TypeAttributes:

Type Attributes
---------------

Type attributes are applied to types only. However, you can also apply the ``noreturn``
attribute to a function or method declaration.

.. Current list of type attributes (as of 4/16/14, r16419):
    ``auto_closure``
    example:

        func foo(@auto_closure f:() -> ()) {
            f()
        }
        foo(x = 5)


    ``cc`` // Mainly used for SIL at the moment. May eventually surface in the Swift
              type system at some point (for power users that need to tweak calling conventions).
    ✓ ``noreturn``
    ``objc_block`` // Confirm that we shouldn't document this.
    ``thin`` // Mainly used for SIL at the moment. Confirm that we shouldn't document for 1.0
    ``thick`` // Mainly used for SIL at the moment. Confirm that we shouldn't document for 1.0
    ``unchecked`` // May be going away if we can come up with better syntactic sugar.

``auto_closure``


.. write-me::


``noreturn``
    The ``noreturn`` attribute is applied to the type of a function or method
    to indicate that the function or method doesn't return to its caller.
    You can also mark a function or method declaration with this attribute to indicate that
    the corresponding type of that function or method, ``T``, is ``@noreturn T``.

.. TR: Need some more info on this attribute. Is the above correct? What else should we
    document here? How about some actual examples?


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
