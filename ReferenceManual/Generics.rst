Generics
========

.. write-me:: Need to write an introduction.
    Should probably mention associated types at this level.

.. TODO: Verify the grammar for both of these sections.

.. Resources to look at:
    swift/docs/Generics.html
    swift/lib/Parse/ParseGeneric.cpp
    swift/include/swift/AST/Decl.h
    Various test files in swift/test


.. _Generics_GenericParameterClause:

Generic Parameter Clause
------------------------

.. write-me::

.. langref-grammar

    generic-params ::= '<' generic-param (',' generic-param)* where-clause? '>'
    generic-param ::= identifier
    generic-param ::= identifier ':' type-identifier
    generic-param ::= identifier ':' type-composition
    where-clause ::= 'where' requirement (',' requirement)*
    requirement ::= conformance-requirement
                ::= same-type-requirement
    conformance-requirement ::= type-identifier ':' type-identifier
    conformance-requirement ::= type-identifier ':' type-composition
    same-type-requirement ::= type-identifier '==' type-identifier

.. syntax-grammar::

    Grammar of a generic parameter clause

    generic-parameter-clause --> ``<`` generic-parameter-list requirement-clause-OPT ``>``
    generic-parameter-list --> generic-parameter | generic-parameter ``,`` generic-parameter-list
    generic-parameter --> type-name type-inheritance-clause-OPT | type-name ``:`` protocol-composition-type

    requirement-clause --> ``where`` requirement-list
    requirement-list --> requirement | requirement ``,`` requirement-list
    requirement --> conformance-requirement | same-type-requirement

    conformance-requirement --> type-identifier ``:`` type-identifier
    conformance-requirement --> type-identifier ``:`` protocol-composition-type
    same-type-requirement --> type-identifier ``==`` type-identifier

.. NOTE: A conformance requirement can only have one type after the colon,
    otherwise, you'd have a syntactic ambiguity
    (a comma separated list types inside of a comma separated list of requirements).


.. _Generics_GenericArgumentClause:

Generic Argument Clause
-----------------------

.. write-me::

.. langref-grammar

    generic-args ::= '<' generic-arg (',' generic-arg)* '>'
    generic-arg ::= type

.. syntax-grammar::

    Grammar of a generic argument clause

    generic-argument-clause --> ``<`` generic-argument-list ``>``
    generic-argument-list --> generic-argument | generic-argument ``,`` generic-argument-list
    generic-argument --> type
