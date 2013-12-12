Generics
========

Generic Parameters
------------------

.. langref-grammar

    generic-params ::= '<' generic-param (',' generic-param)* where-clause? '>'

    generic-param ::= identifier
    generic-param ::= identifier ':' type-identifier
    generic-param ::= identifier ':' type-composition

    where-clause ::= 'where' requirement (',' requirement) *

    requirement ::= conformance-requirement
                ::= same-type-requirement

    conformance-requirement ::= type-identifier ':' type-identifier
    conformance-requirement ::= type-identifier ':' type-composition

    same-type-requirement ::= type-identifier '==' type-identifier


Generic Arguments
-----------------


.. langref-grammar

    generic-args ::= '<' generic-arg (',' generic-arg)* '>'

    generic-arg ::= type
