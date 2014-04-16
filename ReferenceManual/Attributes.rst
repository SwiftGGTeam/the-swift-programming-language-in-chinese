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
    ``assignment`` (OnFunc)
    ``availability(arguments)`` (OnFunc | OnEnum | OnClass | OnProtocol | OnVar | OnConstructor | OnDestructor; AllowMultipleAttributes)
    ``class_protocol`` (OnProtocol)
    ``exported`` (OnImport)
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

    Keep an eye out for ``call_arguments(arguments)``, which is coming soon.


.. _Attributes_TypeAttributes:

Type Attributes
---------------

.. Current list of type attributes (as of 4/16/14, r16419):
    ``auto_closure``
    ``cc``
    ``noreturn``
    ``objc_block``
    ``thin``
    ``thick``
    ``unchecked``


.. _Attributes_InterfaceBuilderAttributes:

Interface Builder Attributes
----------------------------

.. Current list of IB attributes (as of 4/16/14, r16419):
    ``IBAction``
    ``IBDesignable``
    ``IBInspectable``
    ``IBOutlet``
