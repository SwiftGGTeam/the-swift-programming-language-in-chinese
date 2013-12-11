Grammar Queries
===============

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

.. TODO:

    In prose: discuss that 'name' can also be a pattern in the first syntax-outline.
    Also, discuss that when you only want to provide a getter, 'get:' is optional
    (as shown in the third form of the grammar).



.. langref-grammar

    decl-var        ::= attribute-list 'var' pattern initializer?  (',' pattern initializer?)*
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

    variable-declaration --> attribute-sequence-OPT ``var`` pattern-initializer-list
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
    
.. TODO:

    TR: Are the type specifiers in the second and third lines optional or mandatory?
    
.. docnote:: Are the type specifiers in the second and third lines optional or mandatory?

.. docnote:: Are attributes allowed before 'var' in a variable declaration?
    Same question for other declarations (e.g., function, class, protocol, etc.).
    See REPL error, below.

::

    (swift) @inout error : NSError? = .None
    <REPL Input>:1:2: error: attribute can only be applied to types, not declarations
    @inout error : NSError? = .None


Function Declarations
~~~~~~~~~~~~~~~~~~~~~

.. syntax-outline::

    func <#function name#> (<#arguments#>) -> <#return type#> {
        <#code to execute#>
    }

.. TODO:

    Discuss in prose: Variadic functions and the other permutations of function declarations.
    Also, write a syntax-outline for selector-style functions, once these are nailed down.

Function Signatures
+++++++++++++++++++


.. langref-grammar

    decl-func        ::= attribute-list 'static'? 'func' any-identifier generic-params? func-signature brace-item-list?
    func-signature ::= func-arguments func-signature-result?
    func-arguments ::= pattern-tuple+
    func-arguments ::= selector-tuple
    selector-tuple ::= '(' pattern-tuple-element ')' (identifier-or-any '(' pattern-tuple-element ')')+
    func-signature-result ::= '->' type-annotation


.. syntax-grammar::
    
    Grammar of a function declaration
    
    function-declaration --> attribute-sequence-OPT ``func`` function-name generic-parameters-OPT function-signature code-block-OPT
    function-name --> any-identifier
    
    function-signature --> function-arguments function-signature-result-OPT
    function-arguments --> tuple-patterns | selector-arguments
    function-signature-result --> ``->`` attribute-sequence-OPT type
    
    selector-arguments --> ``(`` tuple-pattern-element ``)`` selector-tuples
    selector-tuples --> selector-name ``(`` tuple-pattern-element ``)`` selector-tuples-OPT
    selector-name --> identifier-or-any
    
.. TODO: 

    Revisit function-declaration; the ``static`` keyword may be renamed and/or made into an attribute.
    The reason is that ``static`` isn't the most appropriate term, because we're using it to 
    mark a class function, not a static function (in the proper sense). 
    This issue is being tracked by:
    <rdar://problem/13347488> Consider renaming "static" functions to "class" functions
    Also, selector-style syntax is still under discussion/development.
    
    TR: Discuss with compiler team: tuple-patterns and ``(`` tuple-pattern-element ``)`` seem to allow
    the same elements; how are they different? Maybe type-tuple and type-tuple-element is what is meant?
    In any case, what's the difference between tuple-patterns/``(`` tuple-pattern-element ``)`` and
    type-tuple/type-tuple-element?
    
    TR: Also, is the code-block-OPT really optional? What does it mean when you leave off the code-block?
    
    Revised selector-name---can we come up with a better name for this?
    
    Add elsewhere: tuple-patterns (tuple-patterns --> tuple-pattern | tuple-pattern tuple-patterns)

.. docnote:: Tuple-pattern and "( tuple-pattern-element )" seem to allow
    the same elements; how are they different?
    Do we want to use tuple-pattern in function-arguments, given that it over-generates quite a lot?
    Or do we want to create a new syntactic category that is a tuple-type with an optional default value?

.. docnote:: Is the code-block-OPT really optional at the end of a function declaration? 
    What does it mean when you leave off the code-block?

.. docnote:: What's the current status of the 'static' keyword?

.. docnote:: What's the current status of selector-style syntax for function declarations?



Enumeration Declarations
~~~~~~~~~~~~~~~~~~~~~~~~

.. syntax-outline::

    enum <#enumeration name#> {
        case <#enumerator list 1#>
        case <#enumerator list 2#>(<#associated value type#>)
    }

.. syntax-outline::

    enum <#enumeration name#> : <#raw value type#> {
        case <#enumerator list 1#> = <#raw value 1#>
        case <#enumerator list 2#> = <#raw value 2#>

.. TODO:

    TR: Is 'raw value type' the correct thing to put here?
    According to the grammar, it's an inheritance list,
    which can take a list of protocols.
    If it could be a protocol, that wouldn't really be a "raw value".
    However, it seems like it should be a non-protocol type:
    the type of the raw values.

.. docnote:: Is 'raw value type' the correct thing to put here?
    According to the grammar, it's an inheritance list,
    which can take a list of protocols.
    If it could be a protocol, that wouldn't really be a "raw value".
    However, it seems like it should be a non-protocol type:
    the type of the raw values.


.. langref-grammar

    decl-enum ::= attribute-list 'enum' identifier generic-params? inheritance? enum-body
    enum-body ::= '{' decl* '}'
    decl-enum-element ::= attribute-list 'case' enum-case (',' enum-case)*
    enum-case ::= identifier type-tuple? ('->' type)?

.. syntax-grammar::

    Grammar of an enumeration declaration
    
    enum-declaration --> attribute-sequence-OPT ``enum`` enum-name generic-parameters-OPT type-inheritance-list-OPT enum-body
    enum-name --> identifier
    enum-body --> ``{`` declarations-OPT ``}``
    
    enum-element-declaration --> attribute-sequence-OPT ``case`` enumerator-list
    enumerator-list --> enumerator | enumerator ``,`` enumerator-list
    enumerator --> identifier tuple-type-OPT enumerator-return-type-OPT
    enumerator-return-type --> ``->`` type


.. TODO:

    Add elsewhere: declarations (declarations --> declaration declarations-OPT)
    
    TR: Is it really the case that you can have declarations other than enum-element-declaration
    inside an enum-body? If not, we should replace enum-body with:
    enum-body --> ``{`` enum-element-declarations-OPT ``}``.
    
    TR: Also, do we need to modify the grammar to allow for raw values?
    
    TR: Discuss with the compiler team: in the enum-case, ('->' type)? doesn't match what the REPL
    expects: 
    (swift) enum SomeInt {
              case None
              case One(Int) -> (Int)
            }
    <REPL Input>:3:16: error: consecutive declarations on a line must be separated by ';'
      case One(Int) -> (Int)
                   ^
                   ;
    <REPL Input>:3:17: error: expected declaration
      case One(Int) -> (Int)


.. docnote:: Is it really the case that you can have declarations other than enum-element-declaration
    inside an enum-body? If not, we should replace enum-body with:
    enum-body --> ``{`` enum-element-declarations-OPT ``}``.

.. docnote:: Also, do we need to modify/update the grammar to allow for raw values?

.. docnote:: In the enum-case of the original grammar, ('->' type)? doesn't match what the REPL
    expects (see listing below).

::

    (swift) enum SomeInt {
              case None
              case One(Int) -> (Int)
            }
    <REPL Input>:3:16: error: consecutive declarations on a line must be separated by ';'
      case One(Int) -> (Int)
                   ^
                   ;
    <REPL Input>:3:17: error: expected declaration
      case One(Int) -> (Int)



Types
-----


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
~~~~~~~~~~~~~~

.. syntax-grammar::

    Grammar of a type specifier

    type-specifier --> ``:`` attribute-sequence-OPT type


Array Types
~~~~~~~~~~~


.. langref-grammar

    type-array ::= type-simple
    type-array ::= type-array '[' ']'
    type-array ::= type-array '[' expr ']'


.. syntax-grammar::

    Grammar of an array type
    
    array-type --> basic-type | array-type ``[`` ``]`` | array-type ``[`` expression ``]``

.. TODO:

    TR: Is it just an accident that this definition of array types
    allows a basic type without any square brackets to be called an
    "array", or is that for some reason?  Alex's guess is that it's
    written this way just because it makes the recusive definition work:
    you can keep adding square brackets by recursion,
    and eventually hit a basic-type and stop recursing.


.. docnote:: Is it just an accident that this definition of array types
    allows a basic type without any square brackets to be called an
    "array", or is that for some reason?  Alex's guess is that it's
    written this way just because it makes the recusive definition work:
    you can keep adding square brackets by recursion,
    and eventually hit a basic-type and stop recursing.

Function Type
~~~~~~~~~~~~~


.. langref-grammar

    type-function ::= type-tuple '->' type-annotation


.. syntax-grammar::

    Grammar of a function type

    function-type --> tuple-type ``->`` attribute-sequence-OPT type



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

.. TODO:

    TR: Why is -postfix here? Does it just mean that '?' is a postfix operator.
    
.. syntax-grammar::

    Grammar of an optional type
    
    optional-type --> basic-type ``?``

.. docnote:: Why is -postfix here? Does it just mean that '?' is a postfix operator.


Expressions
-----------

.. langref-grammar

    expr          ::= expr-basic
    expr          ::= expr-trailing-closure expr-cast?
    expr-basic    ::= expr-sequence expr-cast?
    expr-sequence ::= expr-unary expr-binary*
    expr-primary  ::= expr-literal
    expr-primary  ::= expr-identifier
    expr-primary  ::= expr-super
    expr-primary  ::= expr-closure
    expr-primary  ::= expr-anon-closure-arg
    expr-primary  ::= expr-paren
    expr-primary  ::= expr-delayed-identifier
    expr-postfix  ::= expr-primary
    expr-postfix  ::= expr-postfix operator-postfix
    expr-postfix  ::= expr-new
    expr-postfix  ::= expr-dot
    expr-postfix  ::= expr-metatype
    expr-postfix  ::= expr-subscript
    expr-postfix  ::= expr-call
    expr-postfix  ::= expr-optional
    expr-force-value  ::= expr-force-value (typo in the langref; lhs should be expr-postfix)
    
    expr-binary ::= op-binary-or-ternary expr-unary expr-cast?
    op-binary-or-ternary ::= operator-binary
    op-binary-or-ternary ::= '='
    op-binary-or-ternary ::= '?'-infix expr-sequence ':'
    expr-cast ::= 'is' type
    expr-cast ::= 'as' type
    expr-unary   ::= operator-prefix* expr-postfix
    expr-literal ::= integer_literal
    expr-literal ::= floating_literal
    expr-literal ::= character_literal
    expr-literal ::= string_literal
    expr-literal ::= '__FILE__'
    expr-literal ::= '__LINE__'
    expr-literal ::= '__COLUMN__'
    expr-identifier ::= identifier generic-args?
    expr-super ::= expr-super-method
    expr-super ::= expr-super-subscript
    expr-super ::= expr-super-constructor
    expr-super-method ::= 'super' '.' expr-identifier
    expr-super-subscript ::= 'super' '[' expr ']'
    expr-super-constructor ::= 'super' '.' 'init'
    expr-closure ::= '{' closure-signature? brace-item-list '}'
    closure-signature ::= pattern-tuple func-signature-result? 'in'
    closure-signature ::= identifier (',' identifier*) func-signature-result? 'in'
    expr-anon-closure-arg ::= dollarident
    expr-delayed-identifier ::= '.' identifier
    expr-paren      ::= '(' ')'
    expr-paren      ::= '(' expr-paren-element (',' expr-paren-element)* ')'
    expr-paren-element ::= (identifier ':')? expr
    expr-dot ::= expr-postfix '.' dollarident
    expr-dot ::= expr-postfix '.' expr-identifier
    expr-subscript ::= expr-postfix '[' expr ']'
    expr-new        ::= 'new' type-identifier expr-new-bounds
    expr-new-bounds ::= expr-new-bound
    expr-new-bounds ::= expr-new-bounds expr-new-bound
    expr-new-bound  ::= '[' expr? ']'
    expr-call ::= expr-postfix expr-paren
    expr-trailing-closure ::= expr-postfix expr-closure+
    expr-optional ::= expr-postfix '?'-postfix
    expr-force-value ::= expr-postfix '!'
    

.. syntax-grammar::

    Grammar of an expression
    
    expression --> basic-expression | trailing-closure-expression expression-cast-OPT
    basic-expression --> expression-sequence expression-cast-OPT
    expression-sequence --> unary-expression binary-expressions-OPT
    binary-expressions --> binary-expression binary-expressions-OPT
    

Primary Expressions
~~~~~~~~~~~~~~~~~~~

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
    primary-expression --> named-expression
    primary-expression --> super-expression
    primary-expression --> closure-expression
    primary-expression --> anonymous-closure-argument
    primary-expression --> parenthesized-expression
    primary-expression --> delayed-identifier-expression

.. TODO: Come up with a better name for delayed-identifier-expression.

.. TODO:

    TR: Why does primary-expression need to be separated out of postfix-expression?
    The only place where primary-expression is used is in the first line
    of postfix-expression as one of its possible expansions.
    Removing one of these names would simplify the basic/primary/postfix naming situation.

.. docnote:: Why does primary-expression need to be separated out of postfix-expression?
    The only place where primary-expression is used is in the first line
    of postfix-expression as one of its possible expansions.
    Removing one of these names would simplify the basic/primary/postfix naming situation.


Postfix Expressions
~~~~~~~~~~~~~~~~~~~


.. langref-grammar

    expr-postfix  ::= expr-primary
    expr-postfix  ::= expr-postfix operator-postfix
    expr-postfix  ::= expr-new
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
    postfix-expression --> new-expression
    postfix-expression --> dot-expression
    postfix-expression --> metatype-expression
    postfix-expression --> subscript-expression
    postfix-expression --> function-call-expression
    postfix-expression --> optional-expression
    postfix-expression --> force-value-expression

.. TODO: TR: What is a metatype-expression (it's not use or defined anywhere else).

.. TODO: Also, come up with a better name for force-value-expression.

.. docnote:: What is a metatype-expression (it's not use or defined anywhere else).


Patterns
--------

.. langref-grammar

    pattern-atom ::= pattern-var
    pattern-atom ::= pattern-any
    pattern-atom ::= pattern-tuple
    pattern-atom ::= pattern-is
    pattern-atom ::= pattern-enum-element
    pattern-atom ::= expr
    pattern      ::= pattern-atom
    pattern      ::= pattern-typed
    pattern-typed ::= pattern-atom ':' type-annotation

.. syntax-grammar::

    Grammar of a pattern

    pattern --> any-pattern
    pattern --> is-pattern
    pattern --> variable-pattern type-specifier-OPT
    pattern --> expression-pattern type-specifier-OPT
    pattern --> enumerator-pattern
    pattern --> tuple-pattern type-specifier-OPT


.. TODO: In prose, we discuss the meaning of the explicit type. 
    The optional type specifier contrains a pattern to
    match only values of the specified type.
    
.. TODO: TR: Do you really mean that a pattern *has* a type,
    as it says in the LangRef,
    or do you mean that patterns can be constrained to match against a type?
    Strictly speaking, should only values (and types) have a type?

.. docnote:: Do you really mean that a pattern *has* a type, as it says in the LangRef, 
    or do you mean that patterns can be constrained to match against a type? 
    Strictly speaking, should only values (and types) have a type?


Tuple Patterns
~~~~~~~~~~~~~~

.. langref-grammar

    pattern-tuple ::= '(' pattern-tuple-body? ')'
    pattern-tuple-body ::= pattern-tuple-element (',' pattern-tuple-body)* '...'?
    pattern-tuple-element ::= pattern
    pattern-tuple-element ::= pattern '=' expr


.. syntax-grammar::

    Grammar of a tuple pattern
    
    tuple-pattern --> ``(`` tuple-pattern-body-OPT ``)``
    tuple-pattern-body --> tuple-pattern-element-list ``...``-OPT
    tuple-pattern-element-list --> tuple-pattern-element | tuple-pattern-element ``,`` tuple-pattern-element-list
    tuple-pattern-element --> pattern | pattern-initializer

