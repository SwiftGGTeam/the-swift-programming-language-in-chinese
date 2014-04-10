Attributes
==========

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

.. syntax-grammar::

    Grammar of an attribute list

    attribute-list --> ``@`` attribute | ``@`` attribute attribute-list
    attribute --> declaration-attribute | type-attribute | interface-builder-attribute

.. NOTE: Our grammar doesn't have empty terminals (no epsilon)
   so we need to make attribute-list actually contain something.
   This means that instead of having "empty" as a possible expansion,
   attribute-list always appears as -OPT.

.. TODO: Update the grammar to accomodate things like @objc(:some:selector:).
    Also, now that the optional comma is removed, should consider remaning
    attribute-list to simply attributes and simplifying the grammar accordingly.

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

.. syntax-grammar::

    Grammar of a declaration attribute

    declaration-attribute --> ``assignment`` | ``class_protocol`` | ``infix`` | ``mutating`` | ``objc`` | ``optional`` | ``postfix`` | ``prefix`` | ``required`` | ``unowned`` | ``weak``


.. _Attributes_TypeAttributes:

Type Attributes
---------------

.. syntax-grammar::

    Grammar of a type attribute

    type-attribute --> ``unchecked``


.. _Attributes_InterfaceBuilderAttributes:

Interface Builder Attributes
----------------------------

.. syntax-grammar::

    Grammar of an interface builder attribute

    interface-builder-attribute -->  ``IBAction`` | ``IBDesignable`` | ``IBInspectable`` | ``IBOutlet``
