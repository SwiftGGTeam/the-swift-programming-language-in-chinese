Expressions
===========

.. writeme::

.. TODO: Intro prose goes here.

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

.. TODO: Maybe call expression-sequence operator-sequence-expression?

.. The middle part of ?: uses 'expression-sequence'
   which is why we need to keep that part separate from expression.

.. _Expressions_UnaryOperators:

Unary Expressions
-----------------

Unary expressions are formed by combining
an optional prefix operator with an expression.
Prefix operators take one argument,
the expression that follows them.

.. TR: As of r14954, ParsExpr.cpp also has expr-discard
   which consists of an underscore (_).  What is that for?

.. langref-grammar

    expr-unary   ::= operator-prefix* expr-postfix

.. syntax-grammar::

    Grammar of a unary expression

    unary-expression --> prefix-operators-OPT postfix-expression
    prefix-operators --> prefix-operator prefix-operators-OPT


.. _Expressions_BinaryOperators:

Binary Expressions
------------------

Binary expressions are formed by combining
an infix binary operator with the expressions that it takes
as its arguments.

.. writeme::

.. TODO: More intro prose goes here.

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

.. NOTE: You have essentially expression sequences here, and within it are
   parts of the expressions.  We're calling them "expressions" even
   though they aren't what we ordinarily think of as expressions.  We
   have this two-phase thing where we do the expression sequence parsing
   which gives a rough parse tree.  Then after name binding we know
   operator precedence and we do a second phase of parsing that builds
   something that's a more traditional tree.

.. TODO: You're going to care about this if you're adding new operators --
   it's not a high priority.  We could probably loosely describe this
   process by saying that the parser handles it as a flat list and then
   applies the operator precedence to make a more typical parse tree.
   At some point, we will probably have to document the syntax around
   creating operators.  This may need to be discussed in the Language Guide
   in respect to the spacing rules -- ``x + y * z`` is diffirent than
   ``x + y* z``.

.. TODO: Give a list of the unary operators defined in the Swift stdlib.
    Then give a cross-reference to the Swift stdlib for more details.
    Table of operator, meaning, precedence, and associativity.
    Only the most commonly used ones?
    We can discuss them in some detail now, knowing that it could migrate
    to a proper Standar Library Reference book later.

Assignment Operator
~~~~~~~~~~~~~~~~~~~

The :newTerm:`assigment operator` updates the value of variables.
It has the following form:

.. syntax-outline::

   <#variable name#> = <#value#>

The value of the variable on the left of the ``=``
is set to the value obtained by evaluating the expression on the right.

If the left side consists of a tuple,
the value of the right side must be a tuple
with the same number of elements.
The values of the right-hand tuple
are assigned to the corresponding variables in the left-hand tuple.
For example: ::

    // Sets and swaps the value of a and b.
    var (a, b) = (1, 2)
    (a, b) = (b, a)

The assignment operator does not return any value.

.. langref-grammar

    op-binary-or-ternary ::= '='

.. syntax-grammar::

    Grammar of an assignment operator

    assignment-operator --> ``=``

.. _Expressions_ConditionalOperator:

Conditional Operator
~~~~~~~~~~~~~~~~~~~~

The conditional operator evaluates to one of two given values
based on the value of a condition;
it has the following form:

.. syntax-outline::

   <#condition#> ? <#expression used if true#> : <#expression used if false#>

If the *condition* evaluates to ``true``,
the conditional operator evaluates the first expression
and returns its value.
Otherwise, it evaluates the second expression
and returns its value.
The unused expression is not evaluated.

.. The REPL v1-28 allows nesting such as true ? false ? 10 : 20 : 2
   which parses as true ? (false ? 10 : 20) : 2 -- the parens are optional --
   but that's a really bad idea if you want your code to be readable.

.. langref-grammar

    op-binary-or-ternary ::= '?'-infix expr-sequence ':'

.. syntax-grammar::

    Grammar of a conditional operator

    conditional-operator --> ``?`` expression-sequence ``:``

.. _Expressions_Type-CastingOperators:

Type-Checking Operators
~~~~~~~~~~~~~~~~~~~~~~~

There are two type-checking operators,
the ``is`` operator and the ``as`` operator.
They have the following form:

.. syntax-outline::

   <#variable#> as <#type>
   <#variable#> is <#type>

The ``is`` operator checks at runtime
whether the value of its left-hand argument
has the type specified by its right-hand argument
or one of its subtypes.
If so, it returns ``true``; otherwise, it returs ``false``.

The ``as`` operator explicitly specifies that the value of its left-hand argument
should be understood to be of the type specified by its right-hand argument.
If it is guaranteed the value is of that type
or that it can be converted to the type,
the value returned is of the specified type;
otherwise, the value returned is an optional type.
In the case of an optional type,
the cast operator returns ``.None`` if the runtime type conversion fails.
For example: ::

    class SomeType : SomeSuperType {}
    let x = SomeType()

    let y = x as SomeSuperType
    // The type of y is SomeSuperType because conversion to a supertype always succeeds.

    let z = x as AnotherType
    // The type of z is AnotherType? because the cast could fail at runtime.

Specifying a type with ``as`` provides the same type context
to the compiler as a function call and a variable type annotation.
For example, the following examples
are equivalent to the ones above: ::

    let y : SomeSuperType = x
    let z : AnotherType? = x

Likewise, being passed as an function parameter: ::

    func f (a : SomeSuperType) -> SomeSuperType { /* ... */ }
    f(x)  // Because of the type of f(), x is treated as SomeSuperType.

.. TODO: Some of the above detail and example belongs in the guide.

.. TODO: List the exact rules for when a type cast
   is guaranteed to suceed.

.. TODO: Contrast explicit "as" casts with implicit casts
   that happen because of a function call or type annotation.

.. [Contributor 6004] wrote on Feb 24, 2014 in swift-discuss@group.apple.com

    If the compiler isn't sure whether the coercion will succeed, it gives
    you a 'Foo?' instead—an Optional Foo.

    someNSResponder as NSWindow
    disks.objectAtIndex(row) as SKDisk

    However, both function calls and variable type annotations provide the same
    sort of type context as an explicit coercion using "as", so the most
    concise way to write this is as follows:

    var aDisk: SKDisk = disks.objectAtIndex(row)!
    useDisk(disks.objectAtIndex(row)!)


.. langref-grammar

    expr-cast ::= 'is' type
    expr-cast ::= 'as' type

.. syntax-grammar::

    Grammar of an expression cast

    expression-cast --> ``is`` type | ``as`` type

.. _Expressions_PrimaryExpressions:

Primary Expressions
-------------------

.. writeme::

.. TODO: Intro prose goes here.

.. The most common expression type
   Used to build up more complex expressions
   Not made up of sub-expressions

.. langref-grammar

    expr-primary  ::= expr-literal
    expr-primary  ::= expr-identifier
    expr-primary  ::= expr-super
    expr-primary  ::= expr-closure
    expr-primary  ::= expr-anon-closure-arg
    expr-primary  ::= expr-paren
    expr-primary  ::= expr-delayed-identifier

.. syntax-grammar::

    Grammar of a primary expression

    primary-expression --> literal-expression
    primary-expression --> identifier-expression
    primary-expression --> superclass-expression
    primary-expression --> closure-expression
    primary-expression --> anonymous-closure-argument
    primary-expression --> parenthesized-expression
    primary-expression --> implicit-member-expression

.. NOTE: One reason for breaking primary expressions out of postfix
   expressions is for exposition -- it makes it easier to organize the
   prose surrounding the production rules.

.. _Expressions_LiteralExpression:

Literal Expression
~~~~~~~~~~~~~~~~~~

A :newTerm:`literal expression` consists of
either an ordinary literal (such as a string or a number)
or one of the following special literals:

================    ======  ===============================================
Literal             Type    Value
================    ======  ===============================================
``__FILE__``        String  The name of the file in which it appears
``__LINE__``        Int     The line number on which it appears
``__COLUMN__``      Int     The column number in which it begins
``__FUNCTION__``    String  The name of the declaration in which it appears
================    ======  ===============================================

Inside a function,
the value of ``__FUNCTION__`` is the name of that function,
inside a method it is the name of that method,
inside a property getter or setter it is the name of that property,
inside special members like ``init`` or ``subscript`` it is the name of that keyword,
and at the top level of a file it is the name of the current module.

.. langref-grammar

    expr-literal ::= integer_literal
    expr-literal ::= floating_literal
    expr-literal ::= character_literal
    expr-literal ::= string_literal
    expr-literal ::= '__FILE__'
    expr-literal ::= '__LINE__'
    expr-literal ::= '__COLUMN__'

.. syntax-grammar::

    Grammar of a literal expression

    literal-expression --> literal | ``__FILE__`` | ``__LINE__`` | ``__COLUMN__``

.. _Expressions_IdentifierExpression:

Identifier Expression
~~~~~~~~~~~~~~~~~~~~~

.. langref-grammar

    expr-identifier ::= identifier generic-args?

.. syntax-grammar::

    Grammar of an identifier expression

    identifier-expression --> identifier generic-argument-clause-OPT

.. TODO: [Contributor 6004] notes: Arbitrary identifiers cannot have generic arguments, only those in a type context. (We do have to do some magic to determine what might be a type context.)

.. TODO: Discuss in prose: The LangRef has a subsection called 'Generic Disambiguation',
    the contents of which may or may not need to appear here.

.. _Expressions_SuperclassExpression:

Superclass Expression
~~~~~~~~~~~~~~~~~~~~~

A :newTerm:`superclass expression` lets a class
interact with its superclass.
It has one of the following forms:

.. syntax-outline::

   super.<#member name#>
   super[<#subscript index#>]
   super.init

The first form is understood as a member of the superclass.
This allows a subclass to call the superclass's
implementation of a method that it overrides,
to get and set propertiess defined by its superclass,
and to access its superclass's implementation of getters and setters.

.. TR: Confirm the above about properties.

The second form is understood as a call
to the superclass's subscript method.
This allows a subclass to use its superclass's support for subscripting
in the subclass's support for subscripting.

The third form is understood as the superclass's initializer.
This allows a subclass to call the initializer of its superclass
as part of the subclass's initializer.

.. TR: ParseExpr.cpp as of r14954 has a second form of expr-super
   where super.init is followed by 'identifier' and 'expr-call-suffix'
   What is this for?  What does it mean?

.. langref-grammar

    expr-super ::= expr-super-method
    expr-super ::= expr-super-subscript
    expr-super ::= expr-super-constructor
    expr-super-method ::= 'super' '.' expr-identifier
    expr-super-subscript ::= 'super' '[' expr ']'
    expr-super-constructor ::= 'super' '.' 'init'

.. syntax-grammar::

    Grammar of a superclass expression

    superclass-expression --> superclass-method-expression | superclass-subscript-expression | superclass-constructor-expression

    superclass-method-expression --> ``super`` ``.`` identifier-expression
    superclass-subscript-expression --> ``super`` ``[`` expression ``]``
    superclass-constructor-expression --> ``super`` ``.`` ``init``

.. _Expressions_ClosureExpression:

Closure Expression
~~~~~~~~~~~~~~~~~~

A :newTerm:`closure expression` creates a closure,
also known as a *lambda* or an *anonymous function*.
Like function declarations,
closures contain statements which they execute,
and they can capture values from their enclosing scope.
.. values --> variables and constants
Unlike function declarations,
the return type and parameter types can be omitted.
The omitted type information is inferred
from the context in which the closure is used.

A closure that consists of only a single expression
is understood to return the value of that expression.
In this special case,
type information from the expression
is used to infer omitted parameter or return types.

A closure may also omit names for its parameters.
Its parameters are then implicitly named
``$`` followed by their position:
``$0``, ``$1``, ``$2``, and so on.

Omitting types and parameter names allows closures
to be used with a very brief syntax when needed.
All of the following examples have the same behavior
when called with two integers: ::

    // Full function declaration, for comparison
    func a (x : Int, y : Int) {
        let result = x + y
        return result
    }

    b = { (x : Int, y : Int) -> Int in
        let result = x + y
        return x + y
    }

    c = { (x, y) in x + y }

    d = { $0 + $1 }

.. langref-grammar

    expr-closure ::= '{' closure-signature? brace-item* '}'
    closure-signature ::= pattern-tuple func-signature-result? 'in'
    closure-signature ::= identifier (',' identifier)* func-signature-result? 'in'
    expr-anon-closure-arg ::= dollarident

.. syntax-grammar::

    Grammar of a closure expression

    closure-expression --> ``{`` closure-signature-OPT statements ``}``
    closure-expressions --> closure-expression closure-expressions-OPT

    closure-signature --> tuple-pattern function-signature-result-OPT ``in``
    closure-signature --> identifier-list function-signature-result-OPT ``in``

    anonymous-closure-argument --> dollar-identifier


.. _Expressions_DelayedIdentifierExpression:

Implicit Member Expression
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

An :newTerm:`implicit member expression`
is an abbreviated way to access a member of a type,
such as an enumerator or a class method,
in a context where type inference
can determine the implied type.
It has the following form:

.. syntax-outline::

   .<#member name#>

For example, the following pairs of assignments are equivalent: ::

    var x : ExampleEnumeration
    x = ExampleEnumeration.SomeValue
    x = .SomeValue

    var y : ExampleClass
    y = .someClassMethod()
    y = ExampleClass.someClassMethod()

.. langref-grammar

    expr-delayed-identifier ::= '.' identifier


.. syntax-grammar::

    Grammar of a implicit member expression

    implicit-member-expression --> ``.`` identifier

.. _Expressions_ParenthesizedExpression:

Parenthesized Expression
~~~~~~~~~~~~~~~~~~~~~~~~

A :newTerm:`parenthesized expression` consists of
a comma-separated list of expressions surrounded by paretheses.
Each expression in it may have an optional identifier before it,
set off by a colon (``:``).
It has the following form:

.. syntax-outline::

   (<#identifier#>: <#expression#>, <#identifier#>: <#expression#>)

.. TR: Is this still correct?
   There's been a lot of flux around these recently,
   partly as a side effect of changes to the grammar
   for method/function declarations.

.. langref-grammar

    expr-paren      ::= '(' ')'
    expr-paren      ::= '(' expr-paren-element (',' expr-paren-element)* ')'
    expr-paren-element ::= (identifier ':')? expr


.. syntax-grammar::

    Grammar of a parenthesized expression

    parenthesized-expression --> ``(`` expression-element-list-OPT ``)``
    expression-element-list --> expression-element | expression-element ``,`` expression-element-list
    expression-element --> expression | identifier ``:`` expression

.. _Expressions_PostfixExpressions:

Postfix Expressions
-------------------

.. writeme::

.. TODO: Intro prose goes here.

.. Formed by putting a postfix operator or postfix-operator-like suffix
   after an expression.

.. langref-grammar

    expr-postfix  ::= expr-primary
    expr-postfix  ::= expr-postfix operator-postfix
    expr-postfix  ::= expr-new
    expr-postfix  ::= expr-init
    expr-postfix  ::= expr-dot
    expr-postfix  ::= expr-metatype
    expr-postfix  ::= expr-subscript
    expr-postfix  ::= expr-call
    expr-postfix  ::= expr-optional
    expr-force-value  ::= expr-force-value (typo in the langref; lhs should be expr-postfix)

.. syntax-grammar::

    Grammar of a postfix expression

    postfix-expression --> primary-expression
    postfix-expression --> postfix-expression postfix-operator
    postfix-expression --> function-call-expression
    postfix-expression --> new-expression
    postfix-expression --> initializer-expression
    postfix-expression --> dot-expression
    postfix-expression --> metatype-expression
    postfix-expression --> subscript-expression
    postfix-expression --> forced-expression
    postfix-expression --> optional-expression

.. _Expressions_FunctionCallExpression:

Function Call Expression
~~~~~~~~~~~~~~~~~~~~~~~~

:newTerm:`Function-style calls` calls consist of a function
followed by its arguments in parenthesis.
Arguments are separated by commas
and support optional lables.
They have the following form
(showing a function that takes no arguments,
one that takes a single argument,
and one that takes three arguments):

.. syntax-outline::

    <#function>()
    <#function>(<#argument#>)
    <#function>(<#argument 1#>, <#argument 2#>, <#argument 3#>)

The function portion of the function call expression
can be any expression whose value is of a functional type
(

A function call expression can include a :newTerm:`trailing closure`
in the form of a closure expression immediately after the parenthesis.
The trailing closure is understood as an additional argument to the function,
added after the last parenthesized argument.
The following function calls are equivalent: ::

    exampleFunction(x, {$0 == 13})
    exampleFunction(x) {$0 == 13}

The parentheses can be omitted
when calling a function that takes only one argument: ::

    myData.process() {$0 * 2}
    myData.process {$0 * 2}

:Term:`Selector-style function calls` consist of a function
followed by interleaved parts of its selector and its argements.

.. TODO: Skipping for now until the selector call syntax settles down

.. write-me ::

.. langref-grammar

    expr-call ::= expr-postfix expr-paren
    expr-trailing-closure ::= expr-postfix expr-closure+

.. syntax-grammar::

    Grammar of a function call expression

    function-call-expression --> postfix-expression parenthesized-expression trailing-closure-OPT
    function-call-expression --> postfix-expression parenthesized-expression-OPT trailing-closure
    trailing-closure --> closure-expressions

.. Multiple trailing closures in LangRef is an error,
   and so is the trailing typecast,
   per [Contributor 6004] 2014-03-04 email.


.. _Expressions_NewExpression:

New Expression
~~~~~~~~~~~~~~

A :newTerm:`new expression` allocates and initializes an array
of a given type and dimension,
in the following form:

.. syntax-outline:

   new <#type#>[<#size#>]

It consists of the keyword ``new``,
followed by a type identifier,
followed by one or more expressions in square brackets (``[`` and ``]``)
which specify the initial dimensions of the array.

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

.. NOTE: The 'new expression' is most likely going away completely.
    Currently, its use is restricted to creating new arrays with an initial size.
    Apply minimal effort to document it.

.. _Expressions_InitializerExpression:

Initializer Expression
~~~~~~~~~~~~~~~~~~~~~~

An :newTerm:`initializer expression` is understood
as a reference to the class's initializer.
It has the following form:

.. syntax-outline::

    <#instance of a class#>.init

The value of this expression is a function
which can be called,
set as the value of a variable,
and so on,
just as with any other function.

.. langref-grammar

    expr-init ::= expr-postfix '.' 'init'

.. syntax-grammar::

    Grammar of an initializer expression

    initializer-expression --> postfix-expression ``.`` ``init``

.. _Expressions_DotExpression:

Dot Expression
~~~~~~~~~~~~~~

A :newTerm:`dot expression` allows access
to the members of a class, structure, enumerator, or module.
It consists of a period (``.``) between the item
and the identifier of its member.

.. TR: Is this list exhaustive?  Or are there other things that can use dots?

.. syntax-grammar::

   <#expression#>.<#member name#>

The members of a tuple
are implictly named using integers in the order they appear,
beginning with zero.
For example: ::

    var t = (10, 20, 30)
    t.0 = t.1
    // Now t is (20, 20, 30)

.. langref-grammar

    expr-dot ::= expr-postfix '.' dollarident
    expr-dot ::= expr-postfix '.' expr-identifier

.. syntax-grammar::

    Grammar of a dot expression

    dot-expression --> postfix-expression ``.`` decimal-digit
    dot-expression --> postfix-expression ``.`` named-expression

.. _Expressions_MetatypeExpression:

Metatype Expression
~~~~~~~~~~~~~~~~~~~

.. NOTE: There is no definition for metatype-expression in the LangRef.
    This was probably just an oversight, according to Ted and Doug.

.. I think this changed to .type recently.

.. syntax-grammar::

    Grammar of a metatype expression

    metatype-expression --> postfix-expression ``.`` ``metatype``

.. TR: Is this going away?

.. _Expressions_SubscriptExpression:

Subscript Expression
~~~~~~~~~~~~~~~~~~~~

.. langref-grammar

    expr-subscript ::= expr-postfix '[' expr ']'

.. syntax-grammar::

    Grammar of a subscript expression

    subscript-expression --> postfix-expression ``[`` expression ``]``


Forcing an Expression's Value
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. langref-grammar

    expr-force-value ::= expr-postfix '!'

.. syntax-grammar::

    Grammar of a force-value expression

    forced-expression --> postfix-expression ``!``


Optional Chaining
~~~~~~~~~~~~~~~~~

.. TODO: Better title.
   Something like "unwrapping optional values" might work.

.. langref-grammar

    expr-optional ::= expr-postfix '?'-postfix

.. syntax-grammar::

   Grammar of an optional expression

   optional-expression --> postfix-expression ``?``

.. NOTE: The fact that ? must be postfix when it's used for Optional
   is in "Lexical Structure", under the discussion of left/right binding.

.. TODO: Try to re-title.  It's about chaining of optional operators,
   not about the optional kind of chaining.
