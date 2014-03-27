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

..  Here's the current list (as of 3/6/2014):

        // Type attributes
    TYPE_ATTR(auto_closure)
    TYPE_ATTR(cc)
    TYPE_ATTR(noreturn)
    TYPE_ATTR(objc_block)
    TYPE_ATTR(thin)
    TYPE_ATTR(thick)
    TYPE_ATTR(unchecked)

    ATTR(assignment)
    ATTR(class_protocol)
    ATTR(conversion)
    ATTR(exported)
    ATTR(infix)
    ATTR(mutating)
    ATTR(resilient)
    ATTR(fragile)
    ATTR(born_fragile)
    ATTR(asmname)
    ATTR(noreturn)
    ATTR(prefix)
    ATTR(postfix)
    ATTR(objc)
    ATTR(optional)
    ATTR(override)
    ATTR(required)
    ATTR(transparent)
    ATTR(unowned)
    ATTR(weak)
    ATTR(requires_stored_property_inits)

    IB_ATTR(IBOutlet)
    IB_ATTR(IBAction)
    IB_ATTR(IBDesignable)
    IB_ATTR(IBInspectable)

    // "Virtual" attributes can not be spelled in the source code.
    VIRTUAL_ATTR(raw_doc_comment)

    According to Doug (1/29/14), many of these attributes are not worth documenting
    either in the near future or at all. We should really focus on the following first:
    ``mutating``, ``objc``, ``weak``, ``unowned``, ``optional``, ``class_protocol``,
    ``IBOutlet``, ``IBAction``, ``IBLiveView``, and ``IBInspectable``.
    The rest should be omitted (at least for now)---they're really
    only used in the Standard Library.
    In addition, it's likely that inout will get folder into the function stuff,
    and resilience is totally pointless (for now),
    because we're not doing it for Swift 1.0. Leave both of them off entirely.

    TR: None of the attributes Doug mentioned above are type attributes.
    Are there any types attributes that we should bother documenting?

    TODO: For the attributes we are planning on documenting in the near future,
    we need to get more information about their use and behavior.
    Find out what we can from current documentation,
    and email Doug or swift-dev for anything that's missing.


.. _Attributes_DeclarationAttributes:

Declaration Attributes
----------------------

.. syntax-grammar::

    Grammar of a declaration attribute

    declaration-attribute --> ``assignment`` | ``class_protocol`` | ``infix`` | ``mutating`` | ``objc`` | ``optional`` | ``override`` | ``postfix`` | ``prefix`` | ``required`` | ``unowned`` | ``weak``


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
