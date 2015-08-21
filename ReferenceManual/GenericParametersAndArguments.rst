Generic Parameters and Arguments
================================

This chapter describes parameters and arguments for generic types, functions, and
initializers. When you declare a generic type, function, or initializer,
you specify the type parameters that the generic type, function, or initializer
can work with. These type parameters act as placeholders that
are replaced by actual concrete type arguments when an instance of a generic type is
created or a generic function or initializer is called.

For an overview of generics in Swift, see :doc:`../LanguageGuide/Generics`.

.. NOTE: Generic types are sometimes referred to as :newTerm:`parameterized types`
    because they are declared with one or more type parameters.

.. _GenericParametersAndArguments_GenericParameterClause:


Generic Parameter Clause
------------------------

A :newTerm:`generic parameter clause` specifies the type parameters of a generic
type or function, along with any associated constraints and requirements on those parameters.
A generic parameter clause is enclosed in angle brackets (<>)
and has one of the following forms:

.. syntax-outline::

    <<#generic parameter list#>>
    <<#generic parameter list#> where <#requirements#>>

The *generic parameter list* is a comma-separated list of generic parameters,
each of which has the following form:

.. syntax-outline::

    <#type parameter#>: <#constraint#>

A generic parameter consists of a *type parameter* followed by
an optional *constraint*. A :newTerm:`type parameter` is simply the name
of a placeholder type
(for instance, ``T``, ``U``, ``V``, ``Key``, ``Value``, and so on).
You have access to the type parameters (and any of their associated types) in the rest of the
type, function, or initializer declaration, including in the signature of the function
or initializer.

The *constraint* specifies that a type parameter inherits
from a specific class or conforms to a protocol or protocol composition.
For instance, in the generic function below, the generic parameter ``T: Comparable``
indicates that any type argument substituted
for the type parameter ``T`` must conform to the ``Comparable`` protocol.

.. testcode:: generic-params

    -> func simpleMax<T: Comparable>(x: T, _ y: T) -> T {
          if x < y {
             return y
          }
             return x
       }

Because ``Int`` and ``Double``, for example, both conform to the ``Comparable`` protocol,
this function accepts arguments of either type. In contrast with generic types, you don't
specify a generic argument clause when you use a generic function or initializer.
The type arguments are instead inferred from the type of the arguments passed
to the function or initializer.

.. testcode:: generic-params

    -> simpleMax(17, 42) // T is inferred to be Int
    << // r0 : Int = 42
    -> simpleMax(3.14159, 2.71828) // T is inferred to be Double
    << // r1 : Double = 3.14159


.. _GenericParametersAndArguments_WhereClauses:

Where Clauses
~~~~~~~~~~~~~

You can specify additional requirements on type parameters and their associated types
by including a ``where`` clause after the *generic parameter list*.
A ``where`` clause consists of the keyword ``where``,
followed by a comma-separated list of one or more *requirements*.

The *requirements* in a ``where`` clause specify that a type parameter inherits from
a class or conforms to a protocol or protocol composition.
Although the ``where`` clause provides syntactic
sugar for expressing simple constraints on type parameters
(for instance, ``T: Comparable`` is equivalent to ``T where T: Comparable`` and so on),
you can use it to provide more complex constraints on type parameters
and their associated types. For instance, you can express the constraints that
a generic type ``T`` inherits from a class ``C`` and conforms to a protocol ``P`` as
``<T where T: C, T: P>``.

As mentioned above,
you can constrain the associated types of type parameters to conform to protocols.
For example, the generic parameter clause ``<S: SequenceType where S.Generator.Element: Equatable>``
specifies that ``S`` conforms to the ``SequenceType`` protocol
and that the associated type ``S.Generator.Element``
conforms to the ``Equatable`` protocol.
This constraint ensures that each element of the sequence is equatable.

You can also specify the requirement that two types be identical,
using the ``==`` operator. For example, the generic parameter clause
``<S1: SequenceType, S2: SequenceType where S1.Generator.Element == S2.Generator.Element>``
expresses the constraints that ``S1`` and ``S2`` conform to the ``SequenceType`` protocol
and that the elements of both sequences must be of the same type.

Any type argument substituted for a type parameter must
meet all the constraints and requirements placed on the type parameter.

You can overload a generic function or initializer by providing different
constraints, requirements, or both on the type parameters in the generic parameter clause.
When you call an overloaded generic function or initializer,
the compiler uses these constraints to resolve which overloaded function
or initializer to invoke.

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
    generic-parameter --> type-name
    generic-parameter --> type-name ``:`` type-identifier
    generic-parameter --> type-name ``:`` protocol-composition-type

    requirement-clause --> ``where`` requirement-list
    requirement-list --> requirement | requirement ``,`` requirement-list
    requirement --> conformance-requirement | same-type-requirement

    conformance-requirement --> type-identifier ``:`` type-identifier
    conformance-requirement --> type-identifier ``:`` protocol-composition-type
    same-type-requirement --> type-identifier ``==`` type

.. NOTE: A conformance requirement can only have one type after the colon,
    otherwise, you'd have a syntactic ambiguity
    (a comma separated list types inside of a comma separated list of requirements).


.. _GenericParametersAndArguments_GenericArgumentClause:

Generic Argument Clause
-----------------------

A :newTerm:`generic argument clause` specifies the type arguments of a generic
type.
A generic argument clause is enclosed in angle brackets (<>)
and has the following form:

.. syntax-outline::

    <<#generic argument list#>>

The *generic argument list* is a comma-separated list of type arguments.
A :newTerm:`type argument` is the name of an actual concrete type that replaces
a corresponding type parameter in the generic parameter clause of a generic type.
The result is a specialized version of that generic type. As an example,
the Swift standard library defines a generic dictionary type as:

.. code-block:: swift

    struct Dictionary<Key: Hashable, Value>: CollectionType, DictionaryLiteralConvertible {
        /* ... */
    }

.. TODO: How are we supposed to wrap code lines like the above?

The specialized version of the generic ``Dictionary`` type, ``Dictionary<String, Int>``
is formed by replacing the generic parameters ``Key: Hashable`` and ``Value``
with the concrete type arguments ``String`` and ``Int``. Each type argument must satisfy
all the constraints of the generic parameter it replaces, including any additional
requirements specified in a ``where`` clause. In the example above,
the ``Key`` type parameter is constrained to conform to the ``Hashable`` protocol
and therefore ``String`` must also conform to the ``Hashable`` protocol.

You can also replace a type parameter with a type argument that is itself
a specialized version of a generic type (provided it satisfies the appropriate
constraints and requirements). For example, you can replace the type parameter
``Element`` in ``Array<Element>`` with a specialized version of an array, ``Array<Int>``,
to form an array whose elements are themselves arrays of integers.

.. testcode:: array-of-arrays

    -> let arrayOfArrays: Array<Array<Int>> = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    << // arrayOfArrays : Array<Array<Int>> = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

As mentioned in :ref:`GenericParametersAndArguments_GenericParameterClause`,
you don't use a generic argument clause to specify the type arguments
of a generic function or initializer.

.. langref-grammar

    generic-args ::= '<' generic-arg (',' generic-arg)* '>'
    generic-arg ::= type

.. syntax-grammar::

    Grammar of a generic argument clause

    generic-argument-clause --> ``<`` generic-argument-list ``>``
    generic-argument-list --> generic-argument | generic-argument ``,`` generic-argument-list
    generic-argument --> type
