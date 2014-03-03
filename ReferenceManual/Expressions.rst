Expressions
===========

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

.. _Expressions_UnaryOperators:

Prefix Operators
----------------

Prefix operators take one argument,
the expression that follows them.

.. Postfix operators are discussed under postfix-expression/postfix-operator.
   This section used to be called "Unary Operators" but it really only covers prefixes.

.. Alternately, call these prefix expressions?
   The nonterminal name 'unary-expression' is misleading
   because it only directly includes prefixes.
   Postfixes like foo++ or foo? are also unary.

.. NOTE: We haven't quite decided whether unary expressions should come before or after postfix expressions.

.. langref-grammar

    expr-unary   ::= operator-prefix* expr-postfix

.. syntax-grammar::

    Grammar of a unary expression

    unary-expression --> prefix-operators-OPT postfix-expression


.. TODO: Give a list of the unary operators defined in the Swift stdlib.
    Then give a cross-reference to the Swift stdlib for more details.

.. _Expressions_BinaryOperators:

Binary Operators
----------------

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

.. _Expressions_Built-InBinaryOperators:

Built-In Binary Operators
~~~~~~~~~~~~~~~~~~~~~~~~~

.. _Expressions_AssignmentOperator:

Assignment Operator
+++++++++++++++++++

Assignment names a value using the general form:

.. syntax-outline::

   <#name#> = <#value#>

The expression on the right of the ``=`` is evaluated
and the value of the named value on the left
(a variable or constant)
is set to that value.

.. TODO: Is this terminology of "named values" too strict/functional?

If the left side consists of a tuple,
the value of the right side must be a tuple
with the same number of elements.
Each item in the right-hand tuple
is assigned to the corresponding item in the left-hand tuple.
For example: ::

    // Swap a and b.
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
++++++++++++++++++++

The conditional operator evaluates to one of two given values
based on the value of a condition;
it has the following form:

.. syntax-outline::

   <#condition#> ? <#expression to evaluate if true#> : <#expression to evalate if false#>

If the *condition* evaluates to ``true``,
the conditional operator evaluates to the value of the first expression.
Otherwise, it evaluates to the value of the second expression.

.. The REPL v1-28 allows nesting such as true ? false ? 10 : 20 : 2
   which parses as true ? (false ? 10 : 20) : 2 -- the parens are optional --
   but that's a really bad idea if you want your code to be readable.

.. langref-grammar

    op-binary-or-ternary ::= '?'-infix expr-sequence ':'

.. syntax-grammar::

    Grammar of a conditional operator

    conditional-operator --> ``?`` expression-sequence ``:``

.. _Expressions_Type-CastingOperators:

Type-Casting Operators
++++++++++++++++++++++

.. TODO: The "is" operator isn't really a type *cast*
   it's more of a type *check*.
   Try to tweak this heading.

There are two type-casting operators,
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

The ``as`` operator converts the value of its left-hand argument
to be of the type specified by its right-hand argument.
If it is guaranteed the value can be converted to the type,
the value returned is of the specified type;
otherwise, the value returned is an optional type.
In the case of an optional type,
the cast operator returns ``.None`` if the runtime cast fails.
For example: ::

    let x = SomeType()

    let y = x as SomeSuperType()
    // The type of y is SomeSuperType because casting to a supertype always succeeds.

    let z = x as AnotherType()
    // The type of z is AnotherType? because the cast could fail at runtime.

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
    primary-expression --> delayed-identifier-expression

.. NOTE: One reason for breaking primary expressions out of postfix
   expressions is for exposition -- it makes it easier to organize the
   prose surrounding the production rules.

.. _Expressions_LiteralExpression:

Literal Expression
~~~~~~~~~~~~~~~~~~

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

.. TODO: Discuss in prose: The LangRef has a subsection called 'Generic Disambiguation',
    the contents of which may or may not need to appear here.

.. _Expressions_SuperclassExpression:

Superclass Expression
~~~~~~~~~~~~~~~~~~~~~

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

.. langref-grammar

    expr-closure ::= '{' closure-signature? brace-item* '}'
    closure-signature ::= pattern-tuple func-signature-result? 'in'
    closure-signature ::= identifier (',' identifier)* func-signature-result? 'in'

.. syntax-grammar::

    Grammar of a closure expression

    closure-expression --> ``{`` closure-signature-OPT statements ``}``
    closure-expressions --> closure-expression closure-expressions-OPT

    closure-signature --> tuple-pattern function-signature-result-OPT ``in``
    closure-signature --> identifier-list function-signature-result-OPT ``in``

.. _Expressions_AnonymousClosureArgument:

Anonymous Closure Argument
++++++++++++++++++++++++++

.. langref-grammar

    expr-anon-closure-arg ::= dollarident


.. syntax-grammar::

    Grammar of an anonymous closure argument

    anonymous-closure-argument --> dollar-identifier

.. _Expressions_DelayedIdentifierExpression:

Delayed Identifier Expression
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. langref-grammar

    expr-delayed-identifier ::= '.' identifier


.. syntax-grammar::

    Grammar of a delayed identifier expression

    delayed-identifier-expression --> ``.`` enumerator-name

.. TODO: Come up with a better name for delayed-identifier-expression.

.. _Expressions_ParenthesizedExpression:

Parenthesized Expression
~~~~~~~~~~~~~~~~~~~~~~~~

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
    postfix-expression --> force-value-expression
    postfix-expression --> optional-expression

.. _Expressions_FunctionCallExpression:

Function Call Expression
~~~~~~~~~~~~~~~~~~~~~~~~

.. langref-grammar

    expr-call ::= expr-postfix expr-paren
    expr-trailing-closure ::= expr-postfix expr-closure+

.. syntax-grammar::

    Grammar of a function call expression

    function-call-expression --> postfix-expression parenthesized-expression trailing-closure-OPT
    function-call-expression --> postfix-expression parenthesized-expression-OPT trailing-closure
    trailing-closure --> closure-expressions expression-cast-OPT

.. TR: Is it the case that you can have one or more expr-closure (i.e., expr-closure+)?
    This doesn't seem right.

.. NOTE: The following are three equivalent ways of doing the same thing:

        [1, 2, 3].map {$0 * 2}
        [1, 2, 3].map() {$0 * 2}
        [1, 2, 3].map({$0 * 2})

    TODO: Consider giving the above examples in prose.

.. _Expressions_NewExpression:

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

.. NOTE: The 'new expression' is most likely going away completely.
    Currently, its use is restricted to creating new arrays with an initial size.
    Apply minimal effort to document it.

.. _Expressions_InitializerExpression:

Initializer Expression
~~~~~~~~~~~~~~~~~~~~~~

.. langref-grammar

    expr-init ::= expr-postfix '.' 'init'

.. syntax-grammar::

    Grammar of an initializer expression

    initializer-expression --> postfix-expression ``.`` ``init``

.. _Expressions_DotExpression:

Dot Expression
~~~~~~~~~~~~~~

.. langref-grammar

    expr-dot ::= expr-postfix '.' dollarident
    expr-dot ::= expr-postfix '.' expr-identifier

.. syntax-grammar::

    Grammar of a dot expression

    dot-expression --> postfix-expression ``.`` dollar-identifier
    dot-expression --> postfix-expression ``.`` named-expression

.. _Expressions_MetatypeExpression:

Metatype Expression
~~~~~~~~~~~~~~~~~~~

.. NOTE: There is no definition for metatype-expression in the LangRef.
    This was probably just an oversight, according to Ted and Doug.

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

    force-value-expression --> postfix-expression ``!``

.. TODO: Also, come up with a better name for force-value-expression.
    Possibly call it "unwrapped-expression"?


Optional Chaining
~~~~~~~~~~~~~~~~~

.. langref-grammar

    expr-optional ::= expr-postfix '?'-postfix

.. syntax-grammar::

   Grammar of an optional expression

   optional-expression --> postfix-expression ``?``

.. NOTE: The fact that ? must be postfix when it's used for Optional
   is in "Lexical Structure", under the discussion of left/right binding.

.. TODO: Try to re-title.  It's about chaining of optional operators,
   not about the optional kind of chaining.
