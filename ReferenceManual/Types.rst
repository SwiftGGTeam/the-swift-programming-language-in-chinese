Types
=====

.. TODO: Things to discuss/cover in this chapter:
    Meta types
    Materializable Types
    Fully-typed (or fully-specified) types (well-typed expressions)
    Type inference behavior of Swift
    Strong vs weak typing; static vs dynamic typing?
    Type inheritance
    Different kinds of types:
        Builtin types
        Standard Library basic types
        Standard Library derived types
        Language-provided types
    Value types vs reference types?
    Functions are first-class citizens in Swift (but not polymorphic functions)?
    Type attributes? (Some attributes apply to types only; some apply to declarations only)

.. TODO: Discuss "fully-typed types" and "materializable types" in the intro paragraphs,
    rather than in discrete sections. Also, try to come up with better terms for these,
    or just explain the concept without giving them explicit terms.

    Also, discuss the concept of a "meta type" in the metatype types section,
    rather than in the intro paragraphs.

The Swift Standard Library defines a number of common basic datatypes,
including those that represent integers, floating-point integers, unicode scalars,
and strings, as well as datatypes that are derived from these,
including those that represent arrays, dictionaries, and optional types.

In addition to the types defined by the Swift Standard Library,
there are also types defined by the Swift language itself.
These include types that represent functions and tuples and,
in the case of arrays and optionals,
provide syntactic sugar for types defined in the Standard Library.

This chapter discusses the types defined in the Swift language itself
and describes the type inference behavior of Swift.

.. TODO: TR: Should we make the usual distinction between simple or basic types and derived types?
    If so, how should we spilt them up?
    (E.g., typical basic types (Int, Double, String, etc.) are defined in the Standard Library;
    derived types are defined here in the language (function types, tuple types, array types, etc.)
    AND in the Standard Library (array, optional, dictionary, etc.),
    with some overlap in the form of syntactic sugar ('?' for optional, [] for array)?)
    The story here is not exactly clear.

Type Inference
--------------

Fully-Typed Expressions and Types
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When an expression is specified to have a particular type, such as ``var x : Int``,
it is a *fully-typed expression*.
When an expression is not fully typed,
its type must be inferred using information from the surrounding context.

Types may also be fully typed.
A type is *fully typed* when each of its component parts are fully typed;
that is, when each component is either a fully-typed expression or a fully-typed type.

.. TODO: TR: Why is this important information to know?
    How does it relate to Swift's type inference behavior?

Materializable Types
--------------------

A type may be *materializable*.

.. TR:  What does "materializable" mean, exactly?

A type is *not* materializable in either of the following two cases:

1. The type is annotated with an ``inout`` attribute.
2. The type is a tuple type that contains an element whose type is not materializable.

In general, variables must have a materializable type.

.. TR: Why must variables have a materializable type?
    What about variables in function parameters?

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

Each type has a corresponding meta type (with the same name as the type)
that is injected into the standard name lookup scope when a type is declared.
This allows access to *type functions* through dot syntax.

.. TODO: TR: What is the 'standard name loopup scope'?
    How does all of this make it possible to access a type function through dot syntax?

The value of the meta type of a particular type is a reference to a global object that describes the type.
Most meta types are singletons and, therefore, require no storage.
That said, meta types associated with class types
follow the same subtyping rules as their associated class types and, therefore, are not singletons.

.. TODO: Most of the above is from the LangRef and needs to clarified and explained further.
    I'm not sure what all of it means, however.
    Alex, care to explain some, or should we escalate it to a TR?

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
