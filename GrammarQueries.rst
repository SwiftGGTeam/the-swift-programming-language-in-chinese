Grammar Queries
===============

Lexical Structure
-----------------

Operator Identifiers
~~~~~~~~~~~~~~~~~~~~

.. langref-grammar

    operator ::= [@/=-+*%<>!&|^~]+
    operator ::= \.\.

      Note: excludes '=', see [1]
            excludes '->', see [2]
            excludes unary '&', see [3]
            excludes '//', '/*', and '*/', see [4]
            '..' is an operator, not two '.'s.

    operator-binary ::= operator
    operator-prefix ::= operator
    operator-postfix ::= operator

    left-binder  ::= [ \r\n\t\(\[\{,;:]
    right-binder ::= [ \r\n\t\)\]\},;:]

    any-identifier ::= identifier | operator

.. syntax-grammar::

    Grammar of operators

    operator --> operator-character operator-OPT
    operator --> ``..``

    operator-character --> One of the following characters:
    ``@`` ``/`` ``=`` ``-`` ``+`` ``*`` ``%`` ``<`` ``>`` ``!`` ``&`` ``|`` ``^`` ``~``

    binary-operator --> operator
    prefix-operator --> operator
    postfix-operator --> operator
    postfix-operators --> postfix-operator postfix-operators-OPT

    any-identifier --> identifier | operator

.. TODO: Move any-identifier.  It doesn't belong here -- it's not an operator.

Operators that are followed by one of the following characters are *left bound*:

    Space, Carriage Return, New Line, Horizontal Tab
    ``(`` ``[`` ``{`` ``,`` ``;`` ``:``


Operators that are preceded by one of the following characters are *right bound*:

    Space, Carriage Return, New Line, Horizontal Tab
    ``)`` ``]`` ``}`` ``,`` ``;`` ``:``

Being right/left bound determines whether an operator is
a prefix operator, a postfix operator, or a binary operator.
Operators that are left bound and not right bound are postfix operators.
Operators that are right bound and not left bound are prefix operators.
Operators that are not bound, and operators that are right and left bound, are binary operators.

Any operator immediately followed by a period (``.``)
is not right bound if it is already left bound.
This special case ensures that expressions like ``a!.b`` are parsed
as ``(a!).b`` rather than ``(a) ! (.b)``.

.. docnote:: What causes the ``@`` to be left bound here? ...

    The LangRef says:
    "As an exception, an operator immediately followed by a dot ('.') is
    only considered right-bound if not already left-bound. This allows a@.prop
    to be parsed as (a@).prop rather than as a @ .prop."

.. No space on the left -> left bound; no space on the right ->
   right bound.  Better to use ! rather than @.

If the ``!`` or ``?`` operator is left bound, it is a postfix operator,
regardless of whether it is right bound.
To use the ``?`` operator as syntactic sugar for ``Optional``, it must be left bound;
to use it in the ternary (``? :``) operator, it must not be left bound.


Types
-----

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

.. docnote:: Should we make the usual distinction between simple or basic types and derived types?
    ...

    If so, how should we spilt them up?
    For example,
    typical basic types (``Int``, ``Double``, ``String``, etc.) are defined in the Standard Library;
    derived types are defined here in the language (function types, tuple types, array types, etc.)
    **AND** in the Standard Library (array, optional, dictionary, etc.),
    with some overlap in the form of syntactic sugar (``?`` for optional, ``[ ]`` for array)?
    (This is how I wrote the intro paragraph above.)

    The story here is not exactly clear.

.. Don't like the term "derived" for types because it has other meanings
   in the object oriented world.  Calling them "compound" types might be
   better.  We also have "nominal" types -- types like struct, class,
   enum, and protocol that have names -- which are in a sense the
   primatives of the world.  Grammatically, nominal types are the
   smallest; compound types likes tuples are language constructs that
   don't actually have names, and type sugar that is just an alias for
   some nominal type.  The problem is that most languages have primative
   types so we expect them to appear here, but there really aren't any.
   The things we think of as primatives -- integer charcter etc -- are
   nominal types defined by the Standard Library.  (Under the hood, they
   are actually built using things like structs.)

.. The trick is to describe what's going on without exposing too much of
   what's actually going on.

.. It is important to expose the fact that unlike other languages,
   things that you think of as primative types are actually structs.
   This means for example that you can extend those types.

.. docnote:: Here is a list of things we were thinking about covering in this chapter.
    What do you think?
    Are there some things that we should omit, or are there obvious things that we missed?
    ...

    * Meta types
    * Materializable Types
    * Fully-typed (or fully-specified) types (well-typed expressions)
    * Type inference behavior of Swift
    * Strong vs weak typing; static vs dynamic typing; type safety?
    * Type inheritance
    * Different kinds of types:
        * Builtin types
        * Standard Library basic types
        * Standard Library derived types
        * Language-provided types
    * Value types vs reference types?
    * Functions are first-class citizens in Swift (but not polymorphic functions)?
    * Type attributes? (Some attributes apply to types only; some apply to declarations only)

.. Don't talk about materializable types.

.. Type inference behavior -- talk about how it happens at expression
   level and list/describe the places where you can omit a type or part
   of a type.  (For example, you can write ``var x = 10`` and it will
   know that it's an Int.)

.. Avoid talking about "strong" vs "weak" typing in favor of discussion
   of type safety.  Much of that discussion belongs in the guide in
   introductory materials -- once you have that information, the
   decisions made here will just make sense.  It's a staticly typed
   language with some dynamic features.  Again, the umbrella
   static/dynamic discussion doesn't really belong in this document.
   In the reference, tend towards describing actual behaviors that
   involve type safety -- we shouldn't have a discussion of type safety
   and how Swift does it here in the reference.

.. Type inheritance will show up here because we need to say when it
   makes sense and what can inherit what.  Bring it up as needed, don't
   devote a lot of prose her to it.  Likewise with value/reference
   types.

.. Functions -- correct.

.. Defining attributes -- some apply only to types and some only to
   declarations.  Keep them together in the Declarations chapter because
   there's some cross-over and shared information -- xref to it as
   needed.  If needed, pull it out into its own chapter.  In some cases
   (like @objc) we might actually want to scatter that information
   throughout the book rather than gathering it all up into one long
   section.

.. Fully typed -- langref is trying to talk about fully-typed types.  In
   (a, b : Int) the `b : Int` isn't actually a type annotation.  To get
   a non-fully typed type you need to be in a pattern matching context
   like `var (a : Int, b) = (1, 1.5)` where the second half of the tuple
   hase some type variable instead of a fully typed type.  Likewise `var
   a : Dictionary = ["A": 1]` where the type of a is inferred.  The way
   you form an expression of tuple type like this is to do something
   like `(t, 5)` or `(t, _) = (7, 2)` where the 5 or _ picks up type
   from context.

.. The reason for discussing fully typed types is directly related to
   type inference -- types in a source must be fully typed (as defined
   here) except in the contexts where type inference is allowed.


Fully-Typed Expressions and Types
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When an expression is specified to have a particular type, such as ``var x : Int``,
it is a *fully-typed expression*.
When an expression is not fully typed,
its type must be inferred using information from the surrounding context.

Types may also be fully typed.
A type is *fully typed* when each of its component parts are fully typed;
that is, when each component is either a fully-typed expression or a fully-typed type.

.. docnote:: LangRef says:
    "A type may be fully-typed. ...

    A type is fully-typed unless one of the following conditions hold:

        1. It is a function type whose result or input type is not fully-typed.
        2. It is a tuple type with an element that is not fully-typed.
        A tuple element is fully-typed unless it has no explicit type (which is permitted for defaultable elements)
        or its explicit type is not fully-typed.
        In other words, *a type is fully-typed unless it syntactically contains a tuple element with no explicit type annotation*.

    A type being 'fully-typed' informally means that the type is specified directly from its type annotation
    without needing contextual or other information to resolve its type."

    Does this mean:

        1. A type T = (t, Int) is not fully typed because t is a type variable, not a concrete type;
        2. A type T = (expr, b : Int) is not fully typed because expr is an expression with no type annotation?

.. docnote:: Why is this important information to know?
    How does it relate to Swift's type inference behavior?

Materializable Types
~~~~~~~~~~~~~~~~~~~~

A type may be *materializable*.
A type is *not* materializable in either of the following two cases:

1. The type is annotated with an ``inout`` attribute.
2. The type is a tuple type that contains an element whose type is not materializable.

In general, variables must have a materializable type.

.. docnote:: What does "materializable" mean, exactly?

.. What it means is that you can create a valua in memory that
   represents that type.  That's true of an integer or an object that is
   an NSDictionary, but an inout is sort of just a reference to
   something else that's up the stack.  You can have a pointer in memory
   but it's not actually a thing.

.. docnote:: Why must variables have a materializable type?
    What about variables in function parameters?

.. This is getting killed, so don't spend time working on it.  The only
   way to get a non-materializable type is to use @inout.  The only
   place where that's even allowed is in a tuple that's part of a
   function declaration.  The grammar is shifting and will prevent these
   from showing up anywhere else in the language.  Suggest expunging
   everything about materializable.

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

Metatype Type
~~~~~~~~~~~~~

Each type has a corresponding meta type (with the same name as the type)
that is injected into the standard name lookup scope when a type is declared.
This allows access to *type functions* through dot syntax.

.. docnote:: What is the 'standard name loopup scope'?
    How does all of this make it possible to access a type function through dot syntax?

.. Just have a grammar approach, rather than saying "here is a magic
   name which shows up in types" like it does now.  That doesn't even
   make sense -- there isn't even lookup for functions.  You can just
   take any type and get .metatype out of it.

.. For example:

   class X {
    type func foo ()
   }
   var obj : X

   You can't in Swift or Obj-C write obj.foo().  In Obj-C you write
   [obj.class foo] -- you're getting the metatype of the item.  In Swift,
   you write obj.metatype.foo().

   var xm : X.metatype = obj.metatype

   We use the term metatype because you can do this with things that
   aren't objects -- they don't have classes.  At some point in the
   future there will be more reflection -- for now the important part is
   to say that this is how you get at the type/class functions.

The value of the meta type of a particular type is a reference to a global object that describes the type.
Most meta types are singletons and, therefore, require no storage.
That said, meta types associated with class types
follow the same subtyping rules as their associated class types and, therefore, are not singletons.

.. docnote:: This is from the LangRef, and we're not clear about what it all means.
    Can you walk us through this?
    What else do developers need to know about metatype types?

.. Mention of subtyping doesn't really make sense here.  Somewhere in
   the reference there should be a chapter/section on subtyping and type
   conversion.

.. langref-grammar

    type-metatype ::= type-simple '.' 'metatype'

.. syntax-grammar::

    Grammar of a metatype type

    metatype-type --> basic-type ``.`` ``metatype``


Type Identifiers
~~~~~~~~~~~~~~~~

.. langref-grammar

    type-identifier ::= type-identifier-component ('.' type-identifier-component)*
    type-identifier-component ::= identifier generic-args?

.. syntax-grammar::

    Grammar of a type identifier

    type-identifier --> type-name generic-argument-clause-OPT | type-name generic-argument-clause-OPT ``.`` type-identifier
    type-name --> identifier

.. docnote:: The LangRef calls this section "Named Types" and says ...

    "Named types may be used simply by using their name.
    Named types are introduced by typealias declarations
    *or through types declarations that expand to one*."

    What does the "expand to one" part mean?

.. Type name is actually a decent thing to call these.  No strong
   preference either way.  This will change depending on how we end up
   slicing the top-level structure -- if we call them nominal types,
   this will change to match.

   An identifier that refers to a type may refer to either a nominal
   type or a type alias.  Nominal means that the name of the type is
   significant -- the name of a type alias doesn't create something.


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
    element-name --> identifier

.. docnote:: What the relationship between tuple types and tuple patterns?

.. A tuple pattern is always of tuple type.  There is a ton of
   grammatical overlap right now; some of that will be reduced when we
   get rid of named tuple elements.  A tuple type is a much simpler
   composition of simpler types.

.. docnote:: The LangRef says that "there are special rules for converting an expression
    to varargs tuple type?" What are they?

.. The subtype conversion chapter will discuss that.  Keep the note so
   we don't forget about it, but a lot of it will be subsumed.


Expressions
-----------

.. langref-grammar

    expr          ::= expr-basic
    expr          ::= expr-trailing-closure expr-cast?

    expr-basic    ::= expr-sequence expr-cast?

    expr-sequence ::= expr-unary expr-binary*


.. syntax-grammar::

    Grammar of an expression

    expression --> expression-sequence expression-cast-OPT
    expression-sequence --> unary-expression binary-expressions-OPT
    expression-list --> expression | expression ``,`` expression-list

.. docnote:: A trailing-closure-expression seems to be allowed only in the context of function calling.
    ...

    As a result, there's no need to have it at the top level of the expression grammar.
    Therefore, we can move it to the function-call-expression grammar
    (see `Function Call Expressions`_)
    and remove basic-expression as a syntactic category.

    Is this change OK?

    Original LangRef grammar for comparison:

    | expr          ::= expr-basic
    | expr          ::= expr-trailing-closure expr-cast?
    | expr-basic    ::= expr-sequence expr-cast?
    | expr-sequence ::= expr-unary expr-binary*


Function Call Expressions
~~~~~~~~~~~~~~~~~~~~~~~~~

.. langref-grammar

    expr-call ::= expr-postfix expr-paren
    expr-trailing-closure ::= expr-postfix expr-closure+

.. syntax-grammar::

    Grammar of a function call expression

    function-call-expression --> postfix-expression parenthesized-expression trailing-closure-OPT
    trailing-closure --> closure-expressions expression-cast-OPT

.. docnote:: Follow up from note above about trailing closures. ...

    Confirm that putting the trailing closure here,
    as part of the function call syntax,
    rather than as part of the general syntax of an expression
    is still correct.

    Assuming that it's correct, it reduces overgeneration
    and is easier to read.

    Original LangRef grammar for comparison:

    | expr-call ::= expr-postfix expr-paren
    | expr-trailing-closure ::= expr-postfix expr-closure+

.. We probably need to pull this back because of things like

   [1, 2, 3].map {$0 * 2}
        ==> [2, 4, 6]

   The parens after map are optional.  You have [].map which is an
   expression followed by a trailing closure -- it's not a call

   Add a grammar production of function-call --> parens-OPT closure


Binary Operators
~~~~~~~~~~~~~~~~

.. langref-grammar

    expr-binary ::= op-binary-or-ternary expr-unary expr-cast?
    op-binary-or-ternary ::= operator-binary
    op-binary-or-ternary ::= '='
    op-binary-or-ternary ::= '?'-infix expr-sequence ':'

.. syntax-grammar::

    Grammar of a binary expression

    binary-expression --> binary-operator unary-expression expression-cast-OPT
    binary-expression --> assignment-operator unary-expression expression-cast-OPT
    binary-expression --> conditional-operator unary-expression expression-cast-OPT
    binary-expressions --> binary-expression binary-expressions-OPT

.. TODO: Give a list of the binary operators defined in the Swift stdlib.
    Then give a cross-reference to the Swift stdlib for more details.

.. docnote:: Strictly speaking, a binary-expression is not an actual expression; ...

    rather, it is *part* of an expression
    (the expression is well-formed (in the normal sense)
    when it's the continuation of a unary expression).
    Example: ``+ 3`` is a binary-expression according to the current grammar,
    but it's not what we would normally consider an expression.

    The same goes for expression-cast (expression-cast --> ``is`` type | ``as`` type).

    What's the reason behind formulating the grammar in this way?

.. You have essentially expression sequences here, and within it are
   parts of the expressions.  We're calling them "expressions" even
   though they aren' what we ordinarily think of as expressions.  We
   have this two-phase thing where we do the expression sequence parsing
   which gives a rough parse tree.  Then after name binding we know
   operator precedence and we do a second phase of parsing that builds
   something that's a more traditional tree.

.. You're going to care about this if you're adding new operators --
   it's not a high priority.  We could probably loosely describe this
   process by saying that the parser handles it as a flat list and then
   applies the operator precedence to make a more typical parse tree.
   At some point, we will probably have to document the syntax around
   creating operators.  This may need to come up in the language guide
   in respect to the spacing rules -- ``x + y * z`` is diffirent than
   ``x + y* z``.

.. TODO: Depending on how strict we want to be with naming our syntactic categories,
    and the answer to the tech review question above,
    we may want to rename this to something like a binary-expression-clause,
    because the current formulation (on it's own) doesn't produce a well-formed expression.


Closure Expression
~~~~~~~~~~~~~~~~~~

.. langref-grammar

    expr-closure ::= '{' closure-signature? brace-item-list '}'
    closure-signature ::= pattern-tuple func-signature-result? 'in'
    closure-signature ::= identifier (',' identifier*) func-signature-result? 'in'

.. docnote:: In the original LangRef grammar ...

    | expr-closure ::= '{' closure-signature? brace-item-list '}'
    | closure-signature ::= pattern-tuple func-signature-result? 'in'
    | closure-signature ::= identifier (',' identifier)* func-signature-result? 'in'

    A required brace-item-list doesn't seem correct (brace-item-list ::= '{' brace-item* '}'),
    because it requires everything following the ``in`` to be enclosed in braces.
    Rather, it seems like it should be brace-item*. Is this just a typo?

    If it were correct, it would mean that the following is invalid ::

        magic(42, { (x : Int, y : Int) -> Bool in
            print("Comparing \(x) to \(y).\n")
            return y < x
        })

    because ``print(...)`` and ``return y < x`` aren't enclosed in braces.

.. Yes, it's a typo.

.. syntax-grammar::

    Grammar of a closure expression

    closure-expression --> ``{`` closure-signature-OPT code-block-items ``}``
    closure-expressions --> closure-expression closure-expressions-OPT

    closure-signature --> tuple-pattern function-signature-result-OPT ``in``
    closure-signature --> identifier-list function-signature-result-OPT ``in``

.. TODO: Add grammar for identifier-list to Identifiers in Lexical Structure.
    (identifier-list --> identifier | identifier ``,`` identifier-list)


New Expression
~~~~~~~~~~~~~~

.. langref-grammar

    expr-new        ::= 'new' type-identifier expr-new-bounds
    expr-new-bounds ::= expr-new-bound
    expr-new-bounds ::= expr-new-bounds expr-new-bound
    expr-new-bound  ::= '[' expr? ']'

.. syntax-grammar::

    Grammar of a new expression

    new-expression --> ``new`` type-identifier new-expression-bounds
    new-expression-bounds --> new-expression-bounds-OPT new-expression-bound
    new-expression-bound --> ``[`` expression-OPT ``]``

.. TODO: Come back and clean up this grammar.
    Also, note that this is *explicitly* left-recursive.

.. docnote:: What use-cases does the 'new' grammar apply to?

.. These are going away -- apply minimal effort.


Statements
----------

Swift provides several statements that are used to control the flow of execution in a program.
There are three types of control flow statements in Swift:
loop statements, branch statements, and control transfer statements.
Each type of statement can be used in function bodies and in top-level code.

Loop statements allow a block of code to be executed repeatedly,
while branch statements allow a certain block of code to be executed
only when certain conditions are met.
Control transfer statements provide a way to alter the order in which code is executed.
Each type of statement is described in detail below.


.. langref-grammar

    stmt ::= stmt-semicolon
    stmt ::= stmt-if
    stmt ::= stmt-while
    stmt ::= stmt-for-c-style
    stmt ::= stmt-for-each
    stmt ::= stmt-switch
    stmt ::= stmt-control-transfer

.. syntax-grammar::

    Grammar of a statement

    statement --> loop-statement
    statement --> branch-statement
    statement --> control-transfer-statement
    statement --> semicolon-statement

.. docnote:: Are these the only things considered statements in Swift? ...

    What about certain expressions and declarations?

    In other languages,
    the most common type of statements are expression statements---
    that is, an expression followed by a semicolon.
    These are usually function calls, assignments,
    or a variable followed by the increment or decrement operator.

    For instance, in C++ all expressions and declarations are also considered statements:

    | statement ::= expression-statement (expression-statement ::= expression-OPT ``;``)
    | statement ::= declaration-statement (declaration-statement ::= declaration)

    Do we have analogs to these?

.. What you wrote down makes sense to Doug.  A brace item list should
   just contain statements -- expressions and declarations can be kinds
   of statements.

.. The intent is that semicolon is not even a statement -- it's an
   optional terminator used when multiple statements are on a single
   line.  We should move away from having it as a statement -- it's an
   optional token that can appear after any statement.

.. Open question -- can you have semicolon after a control statement?
   For example if () { ... }; ?

.. The semicolon isn't required for the compiler -- we added a rule that
   requires them to enforce a certain amount of readability.  The
   compiler would be perfectly happy if you juts wrote your program on
   one long line with no semicolons.


Collection-Based For Statement
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. Other rejected headings included range-based, enumerator-based,
   container-based sequence-based and for-each.

Collection-based for statements allow a block of code to be executed
once for each item in a collection
that conforms to the ``Stream`` protocol.

A collection-based for statement has the general form:

.. syntax-outline::

    for <#item#> in <#collection#> {
        <#code to execute#>
    }

The ``generate`` method is called on the *collection* expression
to obtain a value of a stream type---that is,
a type that conforms to the ``Stream`` protocol.
The program begins executing a loop
by calling the ``next`` method on the stream.
If the value returned is not ``None``,
it is assigned to the *item* pattern,
the program executes the code block,
and then continues execution at the beginning of the loop.
Otherwise, the program does not perform assignment or execute the code block,
and it is finished executing the statement.


.. docnote:: Are the above method calls correct? ...

   What about the protocol conformance requirement?

   I've determined this information be looking at the declarations in the REPL
   so there may be aspects we don't want to document
   or want to describe differently.

.. Should be the Sequence protocol.  The generate() bit is correct, as
   is the rest of it.  Consider calling this "Sequence-Based For
   Statement" -- they've pretty much settled on  the difference between
   Collection and Sequence.  A collection has some implication that
   the collection could be iterated multiple times -- it could just be a
   random number generator.


.. langref-grammar

    stmt-for-each ::= 'for' pattern 'in' expr-basic brace-item-list

.. syntax-grammar::

    Grammar of a collection-based for statement

    collection-based-for-statement --> ``for`` pattern ``in`` expression code-block


Return Statements
~~~~~~~~~~~~~~~~~

A return statement may occur only in the body of a function or method definition
and causes program execution to return to the calling function or method.
Program execution continues at the point immediately following the function or method call.

A return statement may consist only of the keyword ``return``,
or it may consist of the keyword ``return`` followed by an expression, as shown below.

.. syntax-outline::

    return <#expression#>

A return statement that is not followed by an expression
can be used only to return from a function or method that does not return a value
(that is, when the return type of the function or method is ``Void`` or ``()``).

When a return statement is followed by an expression,
the value of the expression is returned to the calling function or method.
If the value of the expression does not match the value of the return type
declared in the function or method declaration,
the expression's value is converted to the return type
before it is returned to the calling function or method.

.. docnote:: Converted how? ...

    The LangRef says:

    "[The return statement] sets the return value by converting the specified expression result
    (or '()' if none is specified) to the return type of the 'func'."

.. See the chapter on type conversions.

.. langref-grammar

    stmt-return ::= 'return' expr
    stmt-return ::= 'return'


.. syntax-grammar::

    Grammar of a return statement

    return-statement --> ``return`` | ``return`` expression



Declarations
------------

Variable Declarations
~~~~~~~~~~~~~~~~~~~~~

.. syntax-outline::

    var <#variable name#> : <#type#> = <#expression#>

.. syntax-outline::

    var <#variable name#> : <#type#> {
    get:
        <#code to execute#>
    set(<#setter name#>):
        <#code to execute#>
    }


.. langref-grammar

    decl-var        ::= attribute-list 'type'? 'var' pattern initializer?  (',' pattern initializer?)*
    decl-var        ::= attribute-list 'var' identifier ':' type-annotation brace-item-list
    decl-var        ::= attribute-list 'var' identifier ':' type-annotation '{' get-set '}'
    initializer     ::= '=' expr
    get-set         ::= get set?
    get-set         ::= set get
    get             ::= 'get:' brace-item*
    set             ::= 'set' set-name? ':' brace-item*
    set-name        ::= '(' identifier ')'

.. syntax-grammar::

    Grammar of a variable declaration

    variable-declaration --> attribute-sequence-OPT ``type``-OPT ``var`` pattern-initializer-list
    variable-declaration --> attribute-sequence-OPT ``var`` variable-name type-specifier code-block
    variable-declaration --> attribute-sequence-OPT ``var`` variable-name type-specifier getter-setter-block
    variable-name --> identifier

    pattern-initializer-list --> pattern-initializer | pattern-initializer ``,`` pattern-initializer-list
    pattern-initializer --> pattern initializer-OPT
    initializer --> ``=`` expression

    getter-setter-block --> ``{`` getter setter-OPT ``}`` | ``{`` setter getter ``}``
    getter --> ``get`` ``:`` code-block-items-OPT
    setter --> ``set`` setter-name-OPT ``:`` code-block-items-OPT
    setter-name --> ``(`` identifier ``)``

.. docnote:: Why is ``type`` restricted to variables declared using the first variable-declaration grammar?

.. This is a temporary compiler limitation.


Extension Declarations
~~~~~~~~~~~~~~~~~~~~~~

.. syntax-outline::

    extension <#type#> : <#adopted protocols#> {
        <#declarations#>
    }

.. langref-grammar

    decl-extension ::= 'extension' type-identifier inheritance? '{' decl* '}'

.. syntax-grammar::

    Grammar of an extension declaration

    extension-declaration --> ``extension`` type-identifier type-inheritance-clause-OPT extension-body
    extension-body --> ``{`` declarations-OPT ``}``


.. docnote:: The LangRef says ...

    "'extension' declarations allow adding member declarations to existing types,
    even in other source files and modules. There are different semantic rules for each type that is extended.
    enum, struct, and class declaration extensions.

    FIXME: Write this section."

    What is the relevant, missing information?
    What are the semantic rules associated with extending different types?

.. Yes, we do need this.  Defer for now and come back once they have
   written down the rules themselves.

Attribute Sequences
~~~~~~~~~~~~~~~~~~~

.. langref-grammar

    attribute-list        ::= /*empty*/
    attribute-list        ::= attribute-list-clause attribute-list
    attribute-list-clause ::= '@' attribute
    attribute-list-clause ::= '@' attribute ','? attribute-list-clause
    attribute      ::= attribute-infix
    attribute      ::= attribute-resilience
    attribute      ::= attribute-inout
    attribute      ::= attribute-auto_closure
    attribute      ::= attribute-noreturn

.. syntax-grammar::

    Grammar of an attribute sequence

    attribute-sequence --> attribute-clause attribute-sequence-OPT
    attribute-clause --> ``@`` attribute-list attribute-clause-OPT
    attribute-list --> attribute | attribute ``,`` attribute-list
    attribute --> One of the following:
    ``auto_closure`` ``inout`` ``cc`` ``noreturn`` ``objc_block`` ``thin`` ``assignment``
    ``class_protocol`` ``conversion`` ``exported`` ``infix`` ``mutating`` ``resilient``
    ``fragile`` ``born_fragile`` ``asmname`` ``prefix`` ``postfix`` ``objc`` ``optional``
    ``transparent`` ``unowned`` ``weak`` ``IBOutlet`` ``IBAction`` ``IBLiveView``


.. docnote:: From looking at /swift/include/swift/AST/Attr.def ...

    there are ATTR(...), TYPE_ATTR(...), and IB_ATTR(...).

    Assuming that TYPE_ATTR(...)s can be applied to types only,
    what are the restrictions on plain ATTR(...)s?

    Are they restricted to declarations only?
    (But, 'noreturn' is in both ATTR(...) and TYPE_ATTR(...); why?)

    If attributes are neatly separated into mutually exclusive categories,
    e.g., declaration attributes, type attributes, and IB attributes,
    then we could could break down the attribute grammar accordingly.

.. The noreturn attribute can be specified on the declaration or on the
   function type.  It seems like they are going to fall into mutually
   exclusive buckets.

.. docnote:: Which attributes should we focus on documenting,
    and where can we find information about each attribute?

.. Many of these are probably not worth documenting for a while now.
   Look at the following first: mutating objc weak unowned optional
   class_protocol, and the IB attributes.  The others should be omitted
   -- they're really only used in the standard library.

.. It's likely than inout will get folded into the function stuff.
   Resilience is totally pointless because we're not doing it for 1.0.
   Leave them off entirely.

Infix Attribute
+++++++++++++++

.. langref-grammar

    attribute-infix ::= 'infix_left'  '=' integer_literal
    attribute-infix ::= 'infix_right' '=' integer_literal
    attribute-infix ::= 'infix        '=' integer_literal

.. NOTE: There is now only one infix attribute ('infix'),
    which no longer takes an assignment ('=' integer-literal).
    Tested this in r11445 on 12/23/2013.

Resilience Attributes
+++++++++++++++++++++

.. langref-grammar

    attribute-resilience ::= 'resilient'
    attribute-resilience ::= 'fragile'
    attribute-resilience ::= 'born_fragile'


Swift has three resilience attributes: ``resilient``, ``fragile``, and ``born_fragile``.


The In-Out Attribute
++++++++++++++++++++

.. langref-grammar

    attribute-inout ::= 'inout'


The Auto-Closure Attribute
++++++++++++++++++++++++++

.. langref-grammar

    attribute-auto_closure ::= 'auto_closure'


The No-Return Attribute
+++++++++++++++++++++++

.. langref-grammar

    attribute-noreturn ::= 'noreturn'

