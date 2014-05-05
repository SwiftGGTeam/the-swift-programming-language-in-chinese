Types
=====

.. TODO: Things to discuss/cover in this chapter:
    Type attributes? (Waiting to find out if should document any of these)

.. NOTE: Don't mention materializability at all.
    The concept is tied to the inout attribute and will be going away.
    The only way to get a non-materializable type is to use @inout.
    The only place where that's even allowed is in a tuple that's part of a
    function declaration. The grammar is shifting and will prevent these
    from showing up anywhere else in the language.

In Swift, there are two kinds of types: named types and compound types.
A :newTerm:`named type` is a type that can be given a particular name when it is defined.
Named types include classes, structures, enumerations, and protocols.
For example,
instances of a user-defined class named ``MyClass`` have the type ``MyClass``.
In addition to user-defined named types,
the Swift Standard Library defines many commonly used named types,
including those that represent arrays, dictionaries, and optional values.

.. TODO: Discuss with Jeanne: What do we call instances of the "Optional" type?

Data types that are normally considered basic or primitive in other languages---
such as types that represent numbers, characters, and strings---
are actually named types,
defined and implemented in the Swift Standard Library using structures.
Because they are named types,
you can extend their behavior to suit the needs of your program,
using an extension declaration,
discussed in :doc:`../LanguageGuide/Extensions` and :ref:`Declarations_ExtensionDeclaration`.

A :newTerm:`compound type` is a type without a name, defined in the Swift language itself.
There are two compound types: function types and tuple types.
A compound type may contain named types and other compound types.
For instance, the tuple type ``(Int, (Int, Int))`` contains two elements:
The first is the named type ``Int``,
and the second is another compound type ``(Int, Int)``.

.. TODO: TR: What about language support (syntactic sugar) for creating dictionary literals?

This chapter discusses the types defined in the Swift language itself
and describes the type inference behavior of Swift.

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

    type --> array-type | function-type | type-identifier | tuple-type | optional-type | implicitly-unwrapped-optional-type | protocol-composition-type | metatype-type


.. _Types_TypeAnnotation:

Type Annotation
---------------

A :newTerm:`type annotation` explicitly specifies the type of a variable or expression.
Type annotations begin with a colon (``:``) and end with a type,
as the following examples show::

    let x: (Double, Double) = (3.14159, 2.71828)
    func foo(a: Int) -> Int { /* ... */ }

In the first example,
the expression ``x`` is specified to have the tuple type ``(Double, Double)``.
In the second example,
the parameter ``a`` to the function ``foo`` is specified to have the type ``Int``.

Type annotations may contain an optional list of type attributes before the type.

.. syntax-grammar::

    Grammar of a type annotation

    type-annotation --> ``:`` attributes-OPT type


.. _Types_TypeIdentifier:

Type Identifier
---------------

A type identifier refers to either a named type
or a type alias of a named or compound type.

Most of the time, a type identifier directly refers to a named type
with the same name as the identifier.
For example, ``Int`` is a type identifier that directly refers to the named type ``Int``,
and the type identifier ``Dictionary<String, Int>`` directly refers
to the named type ``Dictionary<String, Int>``.

There are two cases in which a type identifier does not refer to a type with the same name.
In the first case, a type identifier refers to a type alias of a named or compound type.
For instance, in the example below,
the use of ``Point`` in the type annotation refers to the tuple type ``(Double, Double)``.
::

    typealias Point = (Double, Double)
    let origin: Point = (0, 0)
    // origin: Point = (0.0, 0.0)

In the second case, a type identifier uses dot (``.``) syntax to refer to named types
declared in other modules or nested within other types.
For example, the type identifier in the following code references the named type ``MyType``
that is declared in the ``ExampleModule`` module.
::

    var someValue: ExampleModule.MyType

.. langref-grammar

    type-identifier ::= type-identifier-component ('.' type-identifier-component)*
    type-identifier-component ::= identifier generic-args?

.. syntax-grammar::

    Grammar of a type identifier

    type-identifier --> type-name generic-argument-clause-OPT | type-name generic-argument-clause-OPT ``.`` type-identifier
    type-name --> identifier

.. _Types_TupleType:

Tuple Type
----------

.. write-me:: Waiting for design decisions from compiler team. See notes below.

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
    tuple-type-element --> attributes-OPT ``inout``-OPT type | ``inout``-OPT element-name type-annotation
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

.. TODO: Tuple types and function types are in flux at the moment.
    Let's hold off on writing about these until they are nailed down.
    There are a couple of questions here:
    1. Are tuple types going to be allowed to contain named elements?
    2. Are function parameter names going to be part of the function type?
    3. Related to (1) and (2): Are tuple types going to used as the left-hand side
       of a function type (as in the current grammar)?
    UPDATE from Doug, 4/2/14:
    Re: 1: For WWDC and likely 1.0, tuples will keep their labels. (Our endgame
    and where we are now are different.)
    Re: 2: Yes, in cases like: (a: Int) -> Int
    Re: 3: No, it's now just type (before, we were relying on tuple-types
    to enforce parens). Of course, a tuple-type is a type, so you can
    still have (a: Int) -> Int.


.. _Types_FunctionType:

Function Type
-------------

.. write-me:: Waiting for design decisions from compiler team. See notes below.

.. langref-grammar

    type-function ::= type-tuple '->' type-annotation


.. syntax-grammar::

    Grammar of a function type

    function-type --> type ``->`` type

.. NOTE: Functions are first-class citizens in Swift,
    except for generic functions, i.e., parametric polymorphic functions.
    This means that monomorphic functions can be assigned to variables
    and can be passed as arguments to other functions.
    As an example, the following three lines of code are OK::

        func polymorphicF<T>(a: Int) -> T { return a }
        func monomorphicF(a: Int) -> Int { return a }
        var myMonomorphicF = monomorphicF

    But, the following is NOT allowed::

        var myPolymorphicF = polymorphicF

.. TODO: Tuple types and function types are in flux at the moment.
    Let's hold off on writing about these until they are nailed down.
    There are a couple of questions here:
    1. Are tuple types going to be allowed to contain named elements?
    2. Are function parameter names going to be part of the function type?
    3. Related to (1) and (2): Are tuple types going to used as the left-hand side
       of a function type (as in the current grammar)?
    UPDATE from Doug, 4/2/14:
    Re: 1: For WWDC and likely 1.0, tuples will keep their labels. (Our endgame
    and where we are now are different.)
    Re: 2: Yes, in cases like: (a: Int) -> Int
    Re: 3: No, it's now just type (before, we were relying on tuple-types
    to enforce parens). Of course, a tuple-type is a type, so you can
    still have (a: Int) -> Int.

    Function *declarations* on the other hand are still flux. Doug will be writing
    a new grammar for them soon. One notable change is that they will no longer
    use patterns in the function parameters.


.. _Types_ArrayType:

Array Type
----------

.. write-me:: Waiting for design decisions from compiler team. See notes below.

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

.. TODO: Array types are in flux at the moment;
    Joe has a proposal on the table, but no decision has been made.
    Let's hold off on writing about these until they are nailed down.
    Update: [Contributor 5711] is now DRI for rewriting/implementing Arrays.

    UPDATE from Doug, 4/2/14:
    We're getting pretty close.  Dave's still working on it and keeps claiming
    it will be tomorrow.  Really all we have to document is that there's a sugar
    for array types and show people how multiple sets of array brackets work
    (for multi-dimensional arrays) -- and bounce them over to the Standard
    Library Reference for the details.

.. _Types_OptionalType:

Optional Type
-------------

The Swift language defines the postfix operator ``?`` as syntactic sugar for
the named type ``Optional<T>``, which is defined in the Swift Standard Library.
In other words, the following two declarations are equivalent::

    var optionalInteger: Int?
    var optionalInteger: Optional<Int>

.. TODO: Rewrite the first sentence. In this case, '?' isn't the operator at all;
    it's just punctuation.

In both cases, the variable ``optionalInteger``
is declared to have the type of an optional integer.
Note that no whitespace may appear between the type and the ``?`` operator.

The type ``Optional<T>`` is an enumeration with two cases, ``None`` and ``Some(T)``,
which are used to represent values that may or may not be present.
Any type can be explicitly declared to be (or implicitly converted to) an optional type.
When declaring an optional type,
be sure to use parentheses to properly scope the ``?`` operator.
As an example,
to declare an optional array of integers, write the type annotation as ``(Int[])?``;
writing ``Int[]?`` produces an error.

Optionals conform to the ``LogicValue`` protocol and therefore may occur in a Boolean context.
In that context,
if an instance of an optional type ``T?`` contains any value of type ``T``
(that is, it's value is ``Optional.Some(T)``),
the optional type evaluates to ``true``. Otherwise, it evaluates to ``false``.

If an instance of an optional type contains a value,
you can access that value using the postfix operator ``!``, as shown below::

    optionalInteger = 42
    optionalInteger!
    // 42

Unwrapping an optional
that has a value of ``Optional.None`` results in a runtime error.

For examples that show how to use optional types,
see :ref:`TheBasics_Optionals`.

.. langref-grammar

    type-optional ::= type-simple '?'-postfix

.. NOTE: The -postfix disambiguates between two terminals
    which have the same text but which have different whitespace.

.. syntax-grammar::

    Grammar of an optional type

    optional-type --> type ``?``


.. _Types_ImplicitlyUnwrappedOptionalType:

Implicitly Unwrapped Optional Type
----------------------------------

.. write-me::

.. syntax-grammar::

    Grammar of an implicitly unwrapped optional type

    implicitly-unwrapped-optional-type --> type ``!``


.. _Types_ProtocolCompositionType:

Protocol Composition Type
-------------------------

A protocol composition type describes a type that conforms to each protocol
in a list of specified protocols.
Protocol composition types may be used in type annotations and in generic parameters.

Protocol composition types have the following form:

.. syntax-outline::

    protocol<<#Protocol 1#>, <#Protocol 2#>>

A protocol composition type allows you to specify a value whose type conforms to the requirements
of multiple protocols without having to explicitly define a new, named protocol
that inherits from each protocol you want the type to conform to.
For example,
specifying a protocol composition type ``protocol<ProtocolA, ProtocolB, ProtocolC>`` is
effectively the same as defining a new protocol ``ProtocolD``
that inherits from ``ProtocolA``, ``ProtocolB``, and ``ProtocolC``,
but without having to introduce a new name.

Each item in a protocol composition list
must be either the name of protocol or a type alias of a protocol composition type.
If the list is empty, it specifies the empty protocol composition type,
which every type conforms to.

.. langref-grammar

    type-composition ::= 'protocol' '<' type-composition-list? '>'
    type-composition-list ::= type-identifier (',' type-identifier)*

.. syntax-grammar::

    Grammar of a protocol composition type

    protocol-composition-type --> ``protocol`` ``<`` protocol-identifier-list-OPT ``>``
    protocol-identifier-list --> protocol-identifier | protocol-identifier ``,`` protocol-identifier-list
    protocol-identifier --> type-identifier

.. _Types_MetatypeType:

Metatype Type
-------------

.. write-me:: Waiting for design decisions from compiler team. See notes below.

.. TR: How do metatypes types work?
    What information is important to convey in this section?
    Would it be helpful to include a diagram here?

.. TR: Metatype types don't seem to working quite right.
    For example, any time I try to invoke ``.metatype`` on a class or instance of a class,
    I get the following error: "error: expected member name following '.'"
    Some examples:

    (swift) class X {
          type func foo(a: Int) -> Int {
            return 10
          }
        }
    (swift) var x = X()
    // x : X = <X instance>
    (swift) x.foo(1)
    <REPL Input>:1:1: error: 'X' does not have a member named 'foo'
    x.foo(1)
    ^ ~~~
    (swift) X.foo(1)
    // r0 : Int = 10
    (swift) x.metatype.foo(1)
    <REPL Input>:1:3: error: expected member name following '.'
    x.metatype.foo(1)
      ^
    (swift) X.metatype.foo(1)
    <REPL Input>:1:3: error: expected member name following '.'
    X.metatype.foo(1)
      ^
    (swift) X
    // r1 : X.metatype = <unprintable value>

    But this works:
    typealias AnyX = X.metatype

    Let's hold off on writing this until we figure out what's going on.

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

.. TODO: Most of the info from the LangRef is, according to Doug,
    out of date and/or not applicable. For example,
    mention of subtyping doesn't really make sense here.
    Somewhere in the reference there should be a chapter/section
    on subtyping and type conversion.

.. TODO: Start planning a chapter on subtyping and type conversions.
    Do we want/need this for WWDC or can it be pushed out to FCS?

.. langref-grammar

    type-metatype ::= type-simple '.' 'metatype'

.. syntax-grammar::

    Grammar of a metatype type

    metatype-type --> type ``.`` ``Type`` | type ``.`` ``Protocol``

.. _Types_TypeInheritanceClause:

Type Inheritance Clause
-----------------------

A type inheritance clause is used to specify which class a named type inherits from
and which protocols a named type conforms to.
A type inheritance clause begins with a colon (``:``),
followed by a comma-separated list of type identifiers.

Class types may inherit from a single superclass and conform to any number of protocols.
When defining a class,
the name of the superclass must appear first in the list of type identifiers,
followed by any number of protocols the class must conform to.
If the class does not inherit from another class,
the list may begin with a protocol instead.
For an extended discussion and several examples of class inheritance,
see :doc:`../LanguageGuide/Inheritance`.

Other named types may only inherit from or conform to a list of protocols.
Protocol types may inherit from any number of other protocols.
When a protocol type inherits from other protocols,
the set of requirements from those other protocols are aggregated together,
and any type that inherits from the current protocol must conform to all of those requirements.

A type inheritance clause in an enumeration definition may be either a list of protocols,
or in the case of an enumeration that assigns raw values to its cases,
a single, named type that specifies the type of those raw values.
For an example of an enumeration definition that uses a type inheritance clause
to specify the type of its raw values, see :ref:`Enumerations_RawValues`.

.. langref-grammar

    inheritance ::= ':' type-identifier (',' type-identifier)*

.. syntax-grammar::

    Grammar of a type inheritance clause

    type-inheritance-clause --> ``:`` type-inheritance-list
    type-inheritance-list --> type-identifier | type-identifier ``,`` type-inheritance-list

.. _Types_TypeInference:

Type Inference
--------------

.. NOTE: TODO: Discuss how it happens at the expression level
    and list/describe the places where you can omit a type or part of a type.

Swift uses type inference extensively,
allowing you to omit the type or part of the type of many variables and expressions in your code.
For example,
instead of writing ``var x: Int = 0``, you can omit the type completely and simply write ``var x = 0``---
the compiler correctly infers that ``x`` names a value of type ``Int``.
Similarly, you can omit part of a type when the full type can be inferred from context.
For instance, if you write ``let dict: Dictionary = ["A": 1]``,
the compiler infers that ``dict`` has the type ``Dictionary<String, Int>``.

In both of the examples above,
the type information is passed up from the leaves of the expression tree to its root.
That is,
the type of ``x`` in ``var x: Int = 0`` is inferred by first checking the type of ``0``
and then passing this type information up to the root (the variable ``x``).

In Swift, type information can also flow in the opposite direction---from the root down to the leaves.
In the following example, for instance,
the explicit type annotation (``: Float``) on the constant ``eFloat``
causes the numeric literal ``2.71828`` to have type ``Float`` instead of type ``Double``.::

    let e = 2.71828
    // e: Double = 2.71828
    let eFloat: Float = 2.71828
    // eFloat: Float = 2.71828

Type inference in Swift operates at the level of a single expression or statement.
This means that all of the information needed to infer an omitted type or part of a type
in an expression must be accessible from type-checking
the expression or one of its subexpressions.

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
