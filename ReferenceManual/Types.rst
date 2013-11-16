Types
=====



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

    Grammar of types
    
    type --> annotated-type | simple-type | array-type | function-type

.. ROUGH-OUTLINE:

    Need to match things like:

    (Int...)
    (Int, Int...)
    (Int, Int, Int)
    (Int, Int, Int...)

    tuple-type --> ``(`` tuple-type-body-OPT ``)``

    tuple-type-body --> tuple-element-list vararg-tail-OPT | vararg
    vararg-tail --> ``,`` vararg

    tuple-type-body --> tuple-element-list | vararg-tuple-element-list

    tuple-element-list --> tuple-element |  tuple-element ``,`` tuple-element-list
    vararg-tuple-element-list --> vararg | tuple-element-list ``,`` vararg

    vararg --> tuple-element `...`
    tuple-element --> annotated-type | element-name ``:`` annotated-type
    element-name --> identifier-or-any

    TODO: Confirm that you can have an ANY here in place of an IDENTIFIER.

    Other names for varargs:
    trailing-tuple-element
    packed-tuple-element
    variable-tuple-element
    variable-argument-list
    variable-element-list
    variable-tuple-type-element-list
    variable-length-tuple-element
    unpacked-tuple-element
    vararg-tuple-element
    variadic-tuple-element

    tuple-element-list --> tuple-element
                           tuple-element ``,`` varargs
                           tuple-element ``,`` tuple-element-list
                           tuple-element ``,`` tuple-element-list ``,`` varargs
                           varargs



Metatypes
---------


Fully-Typed Types
-----------------


Materializable Types
--------------------


Named Types
-----------


Tuple Types
-----------


Function Types
--------------


Enumeration Types
-----------------


Array Types
-----------


Metatype Types
--------------


Optional Types
--------------


Protocol Composition Types
--------------------------


Type Inheritance
----------------


