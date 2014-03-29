Generic Parameters and Arguments
================================

.. Resources to look at:
    swift/docs/Generics.html
    swift/lib/Parse/ParseGeneric.cpp
    swift/include/swift/AST/Decl.h
    Various test files in swift/test

.. TODO: This intro section needs more work.

In Swift, you can declare generic types---including generic classes, structures, and
enumerations---functions, and initializers.
Generics allow you to express the essential interface
of a data structure or an algorithm without mentioning any particular,
concrete data type.

When you declare a generic type, function, or initializer,
you specify the :newTerm:`type parameters` the generic type, function, or initializer
can work with.
These type parameters act as placeholders that
are replaced by actual, concrete :newTerm:`type arguments`
when a generic type is created or a generic function or initializer is called.
This chapter describes the syntax and associated rules for generic parameters
and arguments.

For an overview of generics in Swift, see :doc:`../LanguageGuide/Generics`.

.. NOTE: Generic types are sometimes referred to as :newTerm:`parameterized types`
    because they are declared with one or more type parameters.

.. _GenericParametersAndArguments_GenericParameterClause:

Generic Parameter Clause
------------------------

A :newTerm:`generic parameter clause` specifies the type parameters of a generic
type or function along with any associated contraints and requirements on those parameters.
A generic parameter clause is enclosed in angle bracket (``< >``)
and has one of the following forms:

.. syntax-outline::

    <<#generic parameter list#>>
    <<#generic parameter list#> where <#requirements#>>

The *generic parameter list* is a comma-separated list of generic paramaters,
each of which has the following form:

.. syntax-outline::

    <<#type parameter#> : <#constraints#>>

A generic parameter consists of a *type parameter* followed by
zero or more *constraints*. The type parameter is simply the name
of a placeholder type
(for instance, ``T``, ``U``, ``V``, ``KeyType``, ``ValueType``, and so on).
Type parameters and any of their associated types are in scope for the rest of the
type, function, or initializer declaration, including the signature of the function
or initializer.

The *constraints* specify that a type parameter inherits
from a specific class or conforms to any number of protocols
(either a comma-separated list of protocols or a single protocol composition)
or both.
For instance, in the generic function below, the generic parameter ``T : Comparable``
indicates that any type argument substituted
for the type parameter ``T`` must conform to the ``Comparable`` protocol.

::

    func min<T : Comparable>(x: T, y: T) -> T {
        if x < y {
            return y
        }
        return x
    }

Because ``Int`` and ``Double``, for example, conform to the ``Comparable`` protocol,
this function accepts arguments of either type. Unlike with generic types, you don't
specify a generic argument clause when you use a generic function or initializer.
The type arguments are instead inferred from the type of the arguments passed
to the function or initializer::

    min(17, 42) // T is inferred to be Int
    min(3.14159, 2.71828) // T is inferred to be Double


.. _GenericParametersAndArguments_WhereClauses:

Where Clauses
~~~~~~~~~~~~~

You can specify additional requirements on type parameters and their associated types
by including a ``where`` clause after the *generic parameter list*.
A ``where`` clause consists of the keyword ``where``,
followed by comma-separated list of one or more *requirements*.

The *requirements* in a ``where`` clause specify that a type paramater conforms
to a protocol or protocol composition. Although you can express all of the constrains
of a generic parameter in the requirements of a ``where`` clause
(for instance, ``T : Comparable`` is equivalent to ``T where T : Comparable`` and so on),
you can also express two kinds of constraints on the associated types of the type parameters.

You can constrain the associated types of type parameters to conform to protocols.
For example, the generic parameter clause ``<T : Generator where T.Element : Equatable>``
specifies that ``T`` conforms to the ``Generator`` protocol
and the associated type of ``T``, ``T.Element``, conforms to the ``Equatable`` protocol
(``T`` has the associated type ``Element`` because ``Generator`` declares ``Element``
and ``T`` conforms to ``Generator``).

You can also specify the requirement that two types be identical,
using the ``==`` operator. For example, the generic parameter clause
``<T : Generator, U : Generator where T.Element == U.Element>``
expresses the constraints that ``T`` and ``U`` conform to the ``Generator`` protocol
and their associated types must be identical.

Any concrete, type argument substituted for a type parameter must
meet all the constraints and requirements placed on the type parameter.

.. NOTE: Generic functions can be overloaded on the basis of constraints alone.
.. NOTE: Classes derived from generic classes must also be generic.

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


.. _GenericParametersAndArguments_GenericArgumentClause:

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
