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
    Type attributes? (Waiting to find out if should document any of these)

.. NOTE: Don't mention materializability at all.
    The concept is tied to the inout attribute and will be going away.
    The only way to get a non-materializable type is to use @inout.
    The only place where that's even allowed is in a tuple that's part of a
    function declaration. The grammar is shifting and will prevent these
    from showing up anywhere else in the language.

In Swift, there are two kinds of types: named types and compound types.
A *named type* is a type that can be given a particular name when it is defined.
Named types include instances of abstract data types, such as
classes, structures, enumerations, and protocols.
For example,
instances of a user-defined class named ``Foo`` have the type ``Foo``.
In addition to user-defined named types,
the Swift Standard Library defines many commonly used named types,
including those that represent arrays, dictionaries, and optionals.

What are normally considered primitive or basic data types in other languages,
like those that represent numbers, characters, and strings,
are actually named types,
defined and implemented in the Swift Standard Library using structures.
Because they are named types,
you can extend their behavior to suit the needs of your program,
using an extension declaration, discussed in [NEED A LINK].

A *compound type* is a type without a name, defined in the Swift language itself.
There are two compound types in the language: function types and tuple types.
A compound type may contain named types and other compound types.
For instance, the tuple type ``(Int, (Int, Int))`` contains two elements:
the first is the named type ``Int``,
and the second is another compound type ``(Int, Int)``.

The Swift language has builtin, syntactical support ("syntactic sugar")
for conveniently creating two commonly used generic, named types:
``Array<T>`` and ``Optional<T>``.

.. TODO: TR: What about language support for creating string and dictionary literals?

This chapter discusses the types defined in the Swift language itself
and describes the type inference behavior of Swift.


Type Inference
--------------

.. NOTE: TODO: Discuss how it happens at the expression level
    and list/describe the places where you can omit a type or part of a type.

Swift uses type inference extensively,
allowing you to omit the type or part of the type of many variables and expressions in your code.
For example,
instead of writing ``var x : Int = 0``, you can omit the type completely and simply write ``var x = 0``---
the compiler will correctly infer that ``x`` names a value of type ``Int``.
Similarly, you can omit part of a type when the full type can be inferred from context.
For instance, if you write ``let dict : Dictionary = ["A": 1]``,
the compiler will infer that ``dict`` has the type ``Dictionary<String, Int>``.

In both of the examples above,
the type information is passed up from the leaves of the expression tree to its root.
That is,
the type of ``x`` in ``var x : Int = 0`` is inferred by first checking the type of ``0``
and then passing this type information up to the root (the variable ``x``).

In Swift, type information may also flow in the opposite direction---from the root down to the leaves.
In the following example, for instance,
the explicit type annotation (``: Float``) on the variable ``eFloat``
causes the numeric literal ``2.71828`` to have type ``Float`` instead of type ``Double``.::

    var e = 2.71828
    // e : Double = 2.71828
    var eFloat : Float = 2.71828
    // eFloat : Float = 2.71828

Type inference in Swift operates at the level of an expression.
This means that all of the information needed to infer an omitted type or part of a type
in an expression must be accessible from type-checking one of its subexpressions.

.. TODO: Need an example to illustrate this (of something that you can't do).

.. TODO: Email Doug for a list of rules or situations describing when type-inference
    is allowed and when types must be fully typed.

.. Original: We may be able to avoid talking about fully-typed types.
    I'm leaving the original text here in case we find that we do need it.

    Fully-Typed Types
    ~~~~~~~~~~~~~~~~~

    A type may be *fully typed*. A type is fully-typed unless one of the following conditions hold:
    It is a function type whose result or input type is not fully-typed.
    It is a tuple type with an element that is not fully-typed. A tuple element is fully-typed unless it has no explicit type (which is permitted for defaultable elements) or its explicit type is not fully-typed. In other words, a type is fully-typed unless it syntactically contains a tuple element with no explicit type annotation.
    A type being 'fully-typed' informally means that the type is specified directly from its type annotation without needing contextual or other information to resolve its type.

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

    type --> array-type | function-type | type-identifier | tuple-type | optional-type | protocol-composition-type | metatype-type

.. NOTE: Removed "annotated-type" as a syntactic category,
    because having it would allow productions that contain redundancy;
    for example, it would allow "attribute-sequence attribute-sequence function-type".
    Instead, we can simply replace it by its definition ("attribute-sequence-OPT type").


Type Annotation
---------------

A type annotation is used to explicitly specify the type of a variable or expression.
Type annotations begin with a colon (``:``) and end with a type,
as the following examples show::

    let x : (Double, Double) = (3.14159, 2.71828)
    func foo(a: Int) -> Int { /* ... */ }

In the first example,
the expression ``x`` is specified to have the type ``(Double, Double)``,
which is a tuple type.
In the second example,
the parameter ``a`` to the function ``foo`` is specified to have the type ``Int``.

Type annotations may contain an optional list of type attributes.

.. syntax-grammar::

    Grammar of a type annotation

    type-annotation --> ``:`` attribute-sequence-OPT type

.. NOTE: Renamed this back to type-annotation (from type-specifier),
    because "type annotation" is the standard way of talking about
    decorating a value/expression (term) with type information.

Array Type
----------

.. langref-grammar

    type-array ::= type-simple
    type-array ::= type-array '[' ']'
    type-array ::= type-array '[' expr ']'


.. syntax-grammar::

    Grammar of an array type

    array-type --> type ``[`` ``]`` | array-type ``[`` ``]``

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


Type Identifier
---------------

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


Tuple Type
----------

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
-------------

.. langref-grammar

    type-optional ::= type-simple '?'-postfix

.. syntax-grammar::

    Grammar of an optional type

    optional-type --> type ``?``

.. NOTE: The -postfix disambiguates between two terminals
    which have the same text but which have different whitespace.

    Compare:

        bar?.doSomething()
        foo ? 42 : 7

    One way to explain this is to have two different terminals.

    postfix-question --> ``?``
    infix-question --> `` ? ``

    Better -- explain in prose.
    There must not be whitespace between the type and the ?.


Protocol Composition Type
-------------------------

.. langref-grammar

    type-composition ::= 'protocol' '<' type-composition-list? '>'
    type-composition-list ::= type-identifier (',' type-identifier)*

.. syntax-grammar::

    Grammar of a protocol composition type

    protocol-composition-type --> ``protocol`` ``<`` protocol-identifier-list-OPT ``>``
    protocol-identifier-list --> protocol-identifier | protocol-identifier ``,`` protocol-identifier-list
    protocol-identifier --> type-identifier


Metatype Type
-------------

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

    metatype-type --> type ``.`` ``metatype``


Type Inheritance Clause
-----------------------

.. langref-grammar

    inheritance ::= ':' type-identifier (',' type-identifier)*

.. syntax-grammar::

    Grammar of a type inheritance clause

    type-inheritance-clause --> ``:`` type-inheritance-list
    type-inheritance-list --> type-identifier | type-identifier ``,`` type-inheritance-list
