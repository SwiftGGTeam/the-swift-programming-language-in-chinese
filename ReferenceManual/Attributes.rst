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

    Notes from Ted/Doug, 4/2/14:
    The grammar should be @ <attribute> ( <optional arguments> )
    Other languages have specific grammar production rules for specific
    attributes, specifying the syntax of them, in addition do the description of
    what they mean.

    Instead of pulling all the known attributesin the grammar, have a general
    production rule.  From the parsing perspective, the attribute name doesn't
    effect the parser.  The grammar is regular enough that even if we don't know
    what to do with an attribute, we can still parse it.
    It's likely that someday we will allow user-defined attributes.

    The structure of what's inside the parens is always going to be special.
    Essentially, the attribute defines its own grammar for what goes in its
    parens.  The stuff in parens should just be (gramatically) a balanced token
    sequence.

.. TODO: Schedule another TR meeting with Ted and Doug to get the specific
    about the new grammar and what we should document.


.. _Attributes_DeclarationAttributes:

Declaration Attributes
----------------------


.. ``assignment`` | ``class_protocol`` | ``mutating`` | ``objc`` | ``optional`` | ``required`` | ``unowned`` | ``weak``


.. _Attributes_TypeAttributes:

Type Attributes
---------------


.. ``unchecked``


.. _Attributes_InterfaceBuilderAttributes:

Interface Builder Attributes
----------------------------


.. ``IBAction`` | ``IBDesignable`` | ``IBInspectable`` | ``IBOutlet``
