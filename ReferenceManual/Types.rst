Types
=====

.. TODO: Things to discuss/cover in this chapter:
    Type inference behavior of Swift (see notes below in 'Type Inference')
    Fully-typed (or fully-specified) types (see notes below in 'Fully-Typed Types')
    Type safety; static and dynamic typing:
        Avoid talking about "strong" vs "weak" typing
        in favor of a discussion of type safety.
        Much of that discussion belongs in the Language Guide in introductory material---
        once you have that information, the brief discussions here will just make sense.
        Swift is a statically typed language with some dynamic features. But, again,
        the static/dynamic discussion doesn't really belong in the Reference Manual.
        In the Reference Manual,
        tend toward describing actual behaviors that involve type safety.
    Type inheritance:
        It will show up here because we need to say when it makes sense
        and what can inherit what. Bring it up as needed,
        but don't devote a lot of prose to it. Likewise for value vs reference types.
        A more general and thorough discussion belongs in the Language Guide.
    Different kinds of types:
        Standard Library nominal types
        Standard Library types
        Language-provided compound types (function type, tuple type)
        Language-provided syntactic sugar for Standard Library nominal types
        (``?`` and ``[ ]``)
    Type attributes? (Waiting to find out if should document any of these)

.. NOTE: Don't mention materializability at all.
    The concept is tied to the inout attribute and will be going away.
    The only way to get a non-materializable type is to use @inout.
    The only place where that's even allowed is in a tuple that's part of a
    function declaration. The grammar is shifting and will prevent these
    from showing up anywhere else in the language.

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

.. NOTE: TODO: Greg doesn't like the term "derived" for types,
    because it has other meanings in the object oriented world.
    Calling them "compound" types might be better.

    We also have "nominal" types -- types like struct, class, enum,
    and protocol that have names -- which are in a sense the primitives of the world.
    Grammatically, nominal types are the smallest;
    compound types likes tuples are language constructs that don't actually have names,
    and type sugar that is just an alias for some nominal type.
    The problem is that most languages have primitive types
    so we expect them to appear here, but there really aren't any.
    The things we think of as primatives -- integer charcter etc -- are nominal types
    defined by the Standard Library.
    (Under the hood, they are actually built using things like structs.)

    The trick is to describe what's going on
    without exposing too much of what's actually going on.

    It is important to expose the fact that unlike other languages,
    things that you think of as primative types are actually structs.
    This means for example that you can extend those types.
    This information should appear, in some form or other, in both parts of the book.

Type Inference
--------------

.. NOTE: TODO: Discuss how it happens at the expression level
    and list/describe the places where you can omit a type or part of a type.
    (For example, you can write ``var x = 10``
    and the compiler will infer that ``x`` is of type ``Int``.)
    This is tied to the discussion on fully-typed types, below.

Fully-Typed Types
~~~~~~~~~~~~~~~~~

When an expression is specified to have a particular type, such as ``var x : Int``,
it is a *fully-typed expression*.
When an expression is not fully typed,
its type must be inferred using information from the surrounding context.

Types may also be fully typed.
A type is *fully typed* when each of its component parts are fully typed;
that is, when each component is either a fully-typed expression or a fully-typed type.

.. TODO: Rewrite this section.
    The LangRef is trying to talk about fully-typed types.
    In``(a, b : Int)`` the ``b : Int`` isn't actually a type annotation.
    To get a non-fully typed type you need to be in a pattern matching context
    like ``var (a : Int, b) = (1, 1.5)`` where the second half of the tuple has
    some type variable instead of a fully typed type.
    Likewise ``var a : Dictionary = ["A": 1]`` where the type of ``a`` is inferred.
    The way you form an expression of tuple type like this is to do something
    like ``(t, 5)`` or ``(t, _) = (7, 2)`` where the ``5`` or ``_`` picks up the type
    from context.

    The reason for discussing fully typed types is directly related to type inference
    ---types in a source must be fully typed (as defined here) except in the contexts
    where type inference is allowed.

.. TODO: Email Doug for a list of rules or situations describing when type-inference
    is allowed and when types must be fully typed.

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


Type Annotation
---------------

.. syntax-grammar::

    Grammar of a type annotation

    type-annotation --> ``:`` attribute-sequence-OPT type

.. NOTE: Renamed this back to type-annotation (from type-specifier),
    because "type annotation" is the standard way of talking about
    decorating a value/expression (term) with type information.

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

.. NOTE: Functions are first-class citizens in Swift
    (but not generic functions, i.e., not parametric polymorphic functions).
    This means that monomorphic functions can be assigned to variables
    and can be passed as arguments to other functions.
    As an example, the following three lines of code are OK::

        func polymorphicF<T>(a: Int) -> T { return a }
        func monomorphicF(a: Int) -> Int { return a }
        var myMonomorphicF = monomorphicF

    But, the following is NOT allowed::

        var myPolymorphicF = polymorphicF


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

.. TODO: Write this section based on the info from Doug below:
    Type name is actually a decent thing to call these (or at least to call the section).
    Doug has no strong preference either way.
    This may change depending on how we end up slicing the top-level structure---
    if we call them nominal types, this may change to match.

    The LangRef prose of this section is very much out of date.
    Use this info instead:
    An identifier that refers to a type may refer to
    either a nominal type or a type alias. Nominal means that the name of the type is
    significant---the name of a type alias doesn't create something.


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
    tuple-type-element --> attribute-sequence-OPT type | element-name type-annotation
    element-name --> identifier

.. NOTE: Info from Doug about the relationship between tuple types and tuple patterns:
    A tuple pattern is always of tuple type.
    There is a ton of grammatical overlap right now; some of that will be reduced
    when we get rid of named tuple elements.
    A tuple type is a much simpler (compared to a tuple pattern)
    composition of simpler types.

    The LangRef says that "there are special rules for converting an
    expression to varargs tuple type.
    The subtyping and type conversion chapter (proposed below in 'Metatype Types')
    should discuss these rules.


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

.. TODO: Rewrite this section, using the following notes from our meeting with Doug.
    Just have a grammar approach, rather than saying "here is a magic
    name which shows up in types" like it does now. That doesn't even
    make sense---there isn't even lookup for functions.
    You can just take any type and get .metatype out of it.
    For example:

    class X {
        type func foo ()
    }
    var obj : X

    You can't in Swift or Obj-C write obj.foo(). In Obj-C you write
    [obj.class foo]---you're getting the metatype of the item.
    In Swift, you write obj.metatype.foo().

    var xm : X.metatype = obj.metatype

    We use the term metatype because you can do this with things that
    aren't objects---they don't have classes.
    At some point in the future there will be more reflection; for now,
    the important part is to say that this is how you get at type/class functions.

    TODO: Verify that the above is correct.
    I tried in out in the REPL today, and it doesn't seem to work.


The value of the meta type of a particular type is a reference to a global object that describes the type.
Most meta types are singletons and, therefore, require no storage.
That said, meta types associated with class types
follow the same subtyping rules as their associated class types and, therefore, are not singletons.

.. TODO: Most of the above is from the LangRef, and according to Doug,
    mention of subtyping doesn't really make sense here.
    Somewhere in the reference there should be a chapter/section
    on subtyping and type conversion.

.. TODO: Start planning a chapter on subtyping and type conversions.
    Do we want/need this for WWDC or can it be pushed out to FCS?

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
