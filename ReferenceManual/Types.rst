Types
=====

.. TODO:

    Discuss "fully-typed types" and "materializable types" in the intro paragraphs,
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


.. TODO:

   TR: Why is there a distinction between simple types "type-simple"
   and other kinds of types?
   For example, based on this distiction,
   there isn't a syntactic way to have an array of functions:
   type-array and type-simple don't expand to type-function.



.. syntax-grammar::

    Grammar of a type
    
    type --> annotated-type | array-type | function-type | (contents of type-simple)



Annotated Type
--------------


.. langref-grammar

        type-annotation ::= attribute-list type



.. syntax-grammar::

    Grammar of an annotated type
    
    annotated-type --> attribute-sequence-OPT type



Array Types
-----------


.. langref-grammar

    type-array ::= type-simple
    type-array ::= type-array '[' ']'
    type-array ::= type-array '[' expr ']'


.. syntax-grammar::

    Grammar of an array type
    
    array-type --> type array-brackets
    array-brackets --> ``[`` expression-OPT ``]`` array-brackets-OPT

.. TODO: 'array-brackets' isn't a great name...



Function Type
-------------


.. langref-grammar

    type-function ::= type-tuple '->' type-annotation


.. syntax-grammar::

    Grammar of a function type

    function-type --> tuple-type ``->`` annotated-type



Simple Types
------------


.. langref-grammar

    type-simple ::= type-identifier
    type-simple ::= type-tuple
    type-simple ::= type-composition
    type-simple ::= type-metatype
    type-simple ::= type-optional


.. syntax-grammar::

    Grammar of a simple type
    
    simple-type --> type-identifier | tuple-type | optional-type | protocol-composition-type | metatype-type


Type Identifiers
~~~~~~~~~~~~~~~~


.. langref-grammar

    type-identifier ::= type-identifier-component ('.' type-identifier-component)*
    type-identifier-component ::= identifier generic-args?


.. syntax-grammar::

    Grammar of a type identifier
    
    type-identifier --> type-name generic-arguments-OPT | type-name generic-arguments-OPT ``.`` type-identifier
    type-name --> identifier

.. TODO:

    Decide on which one of these two grammars we want for type identifiers.


.. syntax-grammar::

    Grammar of a type identifier
    
    type-identifier --> type-name generic-arguments-OPT
    type-identifier --> type-name generic-arguments-OPT ``.`` type-identifier
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
    tuple-type-element --> annotated-type | element-name ``:`` annotated-type


Optional Type
~~~~~~~~~~~~~


.. langref-grammar

    type-optional ::= type-simple '?'-postfix


.. syntax-grammar::

    Grammar of an optional type
    
    optional-type --> simple-type ``?``




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

.. TODO:

    There is no associated syntax for an enumeration type. Enumeration types are simple
    created when an enumeration is declared using the syntax of an enumeration declaration.
    Just discuss this in prose without a grammar box.


Metatype Type
~~~~~~~~~~~~~


.. langref-grammar

    type-metatype ::= type-simple '.' 'metatype'


.. syntax-grammar::

    Grammar of a metatype type
    
    metatype-type --> simple-type ``.`` ``metatype``



Type Inheritance List
---------------------


.. langref-grammar

    inheritance ::= ':' type-identifier (',' type-identifier)*


.. syntax-grammar::

    Grammar of a type inheritance list
    
    type-inheritance-list --> type-identifier | type-identifier ``,`` type-inheritance-list



