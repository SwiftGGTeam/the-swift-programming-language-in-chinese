Attributes
==========

.. syntax-outline::

    @<#attribute name#>
    @<#attribute name#>(<#attribute arguments#>)


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

    What should the new grammar look like (also taking into account ``!`` inverted attributes)?
    What should we call the "arguments" that attributes take? ("options"?)

    The structure of what's inside the parens is always going to be special.
    Essentially, the attribute defines its own grammar for what goes in its
    parens.  The stuff in parens should just be (gramatically) a balanced token
    sequence.

.. TODO: Schedule another TR meeting with Ted and Doug to get the specific
    about the new grammar and what we should document.


.. _Attributes_DeclarationAttributes:

Declaration Attributes
----------------------


.. Current list of declaration attributes (as of 4/16/14, r16419):
    ✓ ``assignment`` (OnFunc)
    ``availability(arguments)`` (OnFunc | OnEnum | OnClass | OnProtocol | OnVar | OnConstructor | OnDestructor; AllowMultipleAttributes)
    ✓ ``class_protocol`` (OnProtocol)
    ✓ ``exported`` (OnImport)
    ``final`` (OnClass | OnFunc | OnVar | OnSubscript)
    ``NSCopying`` (OnVar)
    ``noreturn`` (OnFunc)
    ``objc(arguments)`` (OnFunc | OnClass | OnProtocol | OnVar | OnSubscript | OnConstructor | OnDestructor)
    ``required`` (OnConstructor)

    ``override`` (OnFunc | OnVar | OnSubscript) *Now a contextual keyword, not an attribute

    // Need info about where they can appear and whether they allow multiples:
    ``optional``
    ``transparent``
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


``call_arguments(strict)``
    The ``call_arguments(strict)`` attribute is applied to any function or method to
    indicate that you must use the parameter names of that function or method when calling
    it. In addition, you must specify those parameter names in the same order
    in which they are declared as part of the function or methods definition.
    For an example of how to use the ``call_arguments(strict)`` attribute,
    see :ref:`Functions_StrictParameterNames`.

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

``required``
    The ``required`` attribute is applied to a designated or convenience initializer
    of a class to indicate that every subclass must implement that initializer.

    Required designated initializers must be implemented explicitly.
    Required convenience initializers can be either implemented explicitly
    or inherited when the subclass implements all of the superclass’s designated initializers.


.. _Attributes_TypeAttributes:

Type Attributes
---------------

.. Current list of type attributes (as of 4/16/14, r16419):
    ``auto_closure``
    example:

        func foo(@auto_closure f:() -> ()) {
            f()
        }
        foo(x = 5)



    ``cc``
    ``noreturn``
    ``objc_block`` // Confirm that we shouldn't document this.
    ``thin``
    ``thick``
    ``unchecked``


.. _Attributes_InterfaceBuilderAttributes:

Interface Builder Attributes
----------------------------

.. Current list of IB attributes (as of 4/16/14, r16419):
    // Talk to Tony and Robert Morrish about where go for more information.
    ``IBAction``
    ``IBDesignable``
    ``IBInspectable``
    ``IBOutlet``
