Types
=====

.. TODO: Discuss "fully-typed types" and "materializable types" in the intro paragraphs,
    rather than in discrete sections. Also, try to come up with better terms for these,
    or just explain the concept without giving them explicit terms.

    Also, discuss the concept of a "metatype" in the intro paragraphs.

.. langref-grammar

    type ::= type-function
    type ::= type-array
    type-simple ::= type-identifier
    type-simple ::= type-tuple
    type-simple ::= type-composition
    type-simple ::= type-metatype
    type-simple ::= type-optional
    type-annotation ::= attribute-list type

.. syntax-grammar::

    Grammar of a type

    type --> array-type | function-type | basic-type

.. NOTE: Removed "annotated-type" as a syntactic category,
    because having it would allow productions that contain redundancy;
    for example, it would allow "attribute-sequence attribute-sequence function-type".
    Instead, we can simply replace it by its definition ("attribute-sequence-OPT type").


Type Specifier
--------------

.. syntax-grammar::

    Grammar of a type specifier

    type-specifier --> ``:`` attribute-sequence-OPT type


Array Types
-----------


.. langref-grammar

    type-array ::= type-simple
    type-array ::= type-array '[' ']'
    type-array ::= type-array '[' expr ']'


.. syntax-grammar::

    Grammar of an array type

    array-type --> basic-type ``[`` ``]`` | array-type ``[`` ``]``

.. NOTE: Writing it this way rather than as a basic type followed by
   a list of []s -- that preserves grouping of the type as you recurse
   down the tree.

   Arrays of fixed size are not currently supported.
   As a result, we removed "type-array '[' expr ']'" from the grammar.
   They may or may not be supported in the future.


Function Type
-------------

.. langref-grammar

    type-function ::= type-tuple '->' type-annotation


.. syntax-grammar::

    Grammar of a function type

    function-type --> tuple-type ``->`` attribute-sequence-OPT type


Basic Types
-----------

.. langref-grammar

    type-simple ::= type-identifier
    type-simple ::= type-tuple
    type-simple ::= type-composition
    type-simple ::= type-metatype
    type-simple ::= type-optional

.. syntax-grammar::

    Grammar of a basic type

    basic-type --> type-identifier | tuple-type | optional-type | protocol-composition-type | metatype-type


Type Identifiers
~~~~~~~~~~~~~~~~

.. langref-grammar

    type-identifier ::= type-identifier-component ('.' type-identifier-component)*
    type-identifier-component ::= identifier generic-args?


.. syntax-grammar::

    Grammar of a type identifier

    type-identifier --> type-name generic-argument-clause-OPT | type-name generic-argument-clause-OPT ``.`` type-identifier
    type-name --> identifier

.. TODO: Decide on which one of these two grammars we want for type identifiers.

.. syntax-grammar::

    Grammar of a type identifier

    type-identifier --> type-name generic-argument-clause-OPT
    type-identifier --> type-name generic-argument-clause-OPT ``.`` type-identifier
    type-name --> identifier


Tuple Types
~~~~~~~~~~~

.. langref-grammar

    type-tuple ::= '(' type-tuple-body? ')'
    type-tuple-body ::= type-tuple-element (',' type-tuple-element)* '...'?
    type-tuple-element ::= identifier ':' type-annotation
    type-tuple-element ::= type-annotation

.. syntax-grammar::

    Grammar of a tuple type

    tuple-type --> ``(`` tuple-type-body-OPT ``)``
    tuple-type-body --> tuple-type-element-list ``...``-OPT
    tuple-type-element-list --> tuple-type-element | tuple-type-element ``,`` tuple-type-element-list
    tuple-type-element --> attribute-sequence-OPT type | element-name type-specifier


Optional Type
~~~~~~~~~~~~~

.. langref-grammar

    type-optional ::= type-simple '?'-postfix

.. syntax-grammar::

    Grammar of an optional type

    optional-type --> basic-type ``?``

.. NOTE: The -postfix disambiguates between two terminals
    which have the same text but which have different whitespace.

    Compare:

        bar?.doSomething()
        foo ? 42 : 7

    One way to explain this is to have two different terminals.

    postfix-question --> ``?``
    infix-question --> `` ? ``

    Better -- explain in prose.
    There must not be whitespace between the basic-type and the ?.


Protocol Composition Type
~~~~~~~~~~~~~~~~~~~~~~~~~

.. langref-grammar

    type-composition ::= 'protocol' '<' type-composition-list? '>'
    type-composition-list ::= type-identifier (',' type-identifier)*

.. syntax-grammar::

    Grammar of a protocol composition type

    protocol-composition-type --> ``protocol`` ``<`` protocol-identifier-list-OPT ``>``
    protocol-identifier-list --> protocol-identifier | protocol-identifier ``,`` protocol-identifier-list
    protocol-identifier --> type-identifier


Enumeration Types
~~~~~~~~~~~~~~~~~

.. TODO: Discuss in prose: There is no associated syntax for an enumeration type.
    Enumeration types are simply created when an enumeration is declared
    using the syntax of an enumeration declaration.


Metatype Type
~~~~~~~~~~~~~

.. langref-grammar

    type-metatype ::= type-simple '.' 'metatype'

.. syntax-grammar::

    Grammar of a metatype type

    metatype-type --> basic-type ``.`` ``metatype``


Type Inheritance Clause
-----------------------

.. langref-grammar

    inheritance ::= ':' type-identifier (',' type-identifier)*

.. syntax-grammar::

    Grammar of a type inheritance clause

    type-inheritance-clause --> ``:`` type-inheritance-list
    type-inheritance-list --> type-identifier | type-identifier ``,`` type-inheritance-list
