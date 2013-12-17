Declarations
============

.. langref-grammar

    decl ::= decl-class
    decl ::= decl-constructor
    decl ::= decl-destructor
    decl ::= decl-extension
    decl ::= decl-func
    decl ::= decl-import
    decl ::= decl-enum
    decl ::= decl-enum-element
    decl ::= decl-protocol
    decl ::= decl-struct
    decl ::= decl-typealias
    decl ::= decl-var
    decl ::= decl-let
    decl ::= decl-subscript

.. syntax-grammar::

    Grammar of a declaration

    declaration --> import-declaration
    declaration --> variable-declaration
    declaration --> let-declaration
    declaration --> typealias-declaration
    declaration --> function-declaration
    declaration --> enum-declaration
    declaration --> enum-element-declaration
    declaration --> struct-declaration
    declaration --> class-declaration
    declaration --> protocol-declaration
    declaration --> constructor-declaration
    declaration --> destructor-declaration
    declaration --> extension-declaration
    declaration --> subscript-declaration
    declarations --> declaration declarations-OPT

.. NOTE: enum-element-declaration is only allowed inside an enum
   declaration.


Import Declarations
-------------------

.. syntax-outline::

    import <#module#>

.. syntax-outline::

    import <#import-kind#> <#module#>

.. langref-grammar

    decl-import ::=  attribute-list 'import' import-kind? import-path
    import-kind ::= 'typealias'
    import-kind ::= 'struct'
    import-kind ::= 'class'
    import-kind ::= 'enum'
    import-kind ::= 'protocol'
    import-kind ::= 'var'
    import-kind ::= 'func'
    import-path ::= any-identifier ('.' any-identifier)*

.. syntax-grammar::

    Grammar of an import declaration

    import-declaration --> attribute-sequence-OPT ``import`` import-kind-OPT import-path

    import-kind --> ``typealias`` | ``struct`` | ``class`` | ``enum`` | ``protocol`` | ``var`` | ``func``
    import-path --> any-identifier | any-identifier ``.`` import-path


Variable Declarations
---------------------

.. syntax-outline::

    var <#variable name#> : <#type#> = <#expression#>

.. syntax-outline::

    var <#variable name#> : <#type#> {
    get:
        <#code to execute#>
    set(<#setter name#>):
        <#code to execute#>
    }

.. TODO: In prose: discuss that 'name' can also be a pattern in the first syntax-outline.
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

.. NOTE: Type specifiers are required for computed properties -- the
   types of those properties are not computed/inferred.

.. TODO: File a radar against the inout attribute for better REPL
   mesasge.  INOUT attribute can only be applide to types, not to
   declarations.


Let Declaration
---------------

.. syntax-outline::

    let <#variable name#> : <#type#> = <#expression#>

.. langref-grammar

    decl-let    ::= attribute-list 'let' pattern initializer?  (',' pattern initializer?)*
    initializer ::= '=' expr

.. syntax-grammar::

    Grammar of a let declaration

    let-declaration --> attribute-sequence-OPT ``let`` pattern-initializer-list


Typealias Declarations
----------------------

.. syntax-outline::

    typealias <#new type#> : <#adopted protocols#> = <#existing type#>

.. langref-grammar

    decl-typealias ::= typealias-head '=' type
    typealias-head ::= 'typealias' identifier inheritance?

.. syntax-grammar::

    Grammar of a typealias declaration

    typealias-declaration --> typealias-head ``=`` type
    typealias-head --> ``typealias`` typealias-name type-inheritance-clause-OPT
    typealias-name --> identifier


Function Declarations
---------------------

.. syntax-outline::

    func <#function name#> (<#arguments#>) -> <#return type#> {
        <#code to execute#>
    }

.. TODO: Discuss in prose: Variadic functions and the other permutations of function declarations.

.. TODO: Write a syntax-outline for selector-style functions.


Function Signatures
~~~~~~~~~~~~~~~~~~~

.. langref-grammar

    decl-func        ::= attribute-list 'static'? 'func' any-identifier generic-params? func-signature brace-item-list?
    func-signature ::= func-arguments func-signature-result?
    func-arguments ::= pattern-tuple+
    func-arguments ::= selector-tuple
    selector-tuple ::= '(' pattern-tuple-element ')' (identifier-or-any '(' pattern-tuple-element ')')+
    func-signature-result ::= '->' type-annotation

.. syntax-grammar::

    Grammar of a function declaration

    function-declaration --> attribute-sequence-OPT ``func`` function-name generic-parameter-clause-OPT function-signature code-block-OPT
    function-name --> any-identifier

    function-signature --> function-arguments function-signature-result-OPT
    function-arguments --> tuple-patterns | selector-arguments
    function-signature-result --> ``->`` attribute-sequence-OPT type

    selector-arguments --> ``(`` tuple-pattern-element ``)`` selector-tuples
    selector-tuples --> selector-name ``(`` tuple-pattern-element ``)`` selector-tuples-OPT
    selector-name --> identifier-or-any

.. TODO: Revisit function-declaration; the ``static`` keyword may be renamed and/or made into an attribute.
    The reason is that ``static`` isn't the most appropriate term, because we're using it to
    mark a class function, not a static function (in the proper sense).
    This issue is being tracked by:
    <rdar://problem/13347488> Consider renaming "static" functions to "class" functions

.. TODO: The overgeneration from tuple-patterns combined with some upcoming changes
    mean that we should just create a new syntactic category
    for function arguments instead.
    We're going to hold off on doing this until they [compiler team] make their changes.

.. TODO: Code block is optional in the context of a protocol.
    Everywhere else, it's required.
    We could refactor to have a separation between function definition/declaration.
    There is also the low-level "asm name" FFI
    which is a definition and declaration corner case.
    Let's just deal with this difference in prose.

.. NOTE: Selector style syntax is pretty stable at this point.
    The only contentious issue recently has been the calling syntax.
    Any changes will probably be fiddley little bits.

.. TODO: Revise selector-name---can we come up with a better name for this?


Enumeration Declarations
------------------------

.. syntax-outline::

    enum <#enumeration name#> {
        case <#enumerator list 1#>
        case <#enumerator list 2#>(<#associated value type#>)
    }

.. syntax-outline::

    enum <#enumeration name#> : <#raw value type#> {
        case <#enumerator list 1#> = <#raw value 1#>
        case <#enumerator list 2#> = <#raw value 2#>
    }

.. TODO: Discuss in prose: When there is a raw value type on an enum,
    it indicates the low-level type like Int.
    All of the raw values have to be of that type.
    You can require protocol adoption,
    by using a protocol type as the raw value type,
    but you do need to make it be one of the types
    that support = in order for you to specify the raw values.
    You can have: <#raw value type, protocol conformance#>.

.. langref-grammar

    decl-enum ::= attribute-list 'enum' identifier generic-params? inheritance? enum-body
    enum-body ::= '{' decl* '}'
    decl-enum-element ::= attribute-list 'case' enum-case (',' enum-case)*
    enum-case ::= identifier type-tuple? ('->' type)?

.. NOTE: Per Doug and Ted, "('->' type)?" is not part of the grammar.
    We removed it from our grammar, below.

.. syntax-grammar::

    Grammar of an enumeration declaration

    enum-declaration --> attribute-sequence-OPT ``enum`` enum-name generic-parameter-clause-OPT type-inheritance-clause-OPT enum-body
    enum-name --> identifier
    enum-body --> ``{`` declarations-OPT ``}``

    enum-element-declaration --> attribute-sequence-OPT ``case`` enumerator-list
    enumerator-list --> enumerator raw-value-assignment-OPT | enumerator raw-value-assignment-OPT ``,`` enumerator-list
    enumerator --> enumerator-name tuple-type-OPT
    enumerator-name --> identifier
    raw-value-assignment --> ``=`` raw-value-literal
    raw-value-literal --> integer-literal | floating-point-literal | character-literal | string-literal

.. NOTE: You can have other declarations like methods inside of an enum declaration (e.g., methods, etc.).


Structure Declarations
----------------------

.. syntax-outline::

    struct <#structure name#> : <#adopted protocols#> {
        <#declarations#>
    }

.. TODO: Member declarations and other declarations can appear in any order (we tested this).
    Stylistically, you probably want member declarations to come first.

.. langref-grammar

    decl-struct ::= attribute-list 'struct' identifier generic-params? inheritance? '{' decl-struct-body '}'
    decl-struct-body ::= decl*

.. syntax-grammar::

   Grammar of a structure declaration

   struct-declaration --> attribute-sequence-OPT ``struct`` struct-name generic-parameter-clause-OPT type-inheritance-clause-OPT struct-body
   struct-name --> identifier
   struct-body --> ``{`` declarations-OPT ``}``


Class Declarations
------------------

.. syntax-outline::

    class <#class name#> : <#superclass>, <#adopted protocols#> {
        <#declarations#>
    }

.. langref-grammar

    decl-class ::= attribute-list 'class' identifier generic-params? inheritance? '{' decl-class-body '}'
    decl-class-body ::= decl*

.. syntax-grammar::

    Grammar of a class declaration

    class-declaration --> attribute-sequence-OPT ``class`` class-name generic-parameter-clause-OPT type-inheritance-clause-OPT class-body
    class-name --> identifier
    class-body --> ``{`` declarations-OPT ``}``


Protocol Declarations
---------------------

.. syntax-outline::

    protocol <#protocol name#> : <#adopted protocols#> {
        <#protocol members#>
    }


Function Protocol Elements
~~~~~~~~~~~~~~~~~~~~~~~~~~


Variable Protocol Elements
~~~~~~~~~~~~~~~~~~~~~~~~~~


Subscript Protocol Elements
~~~~~~~~~~~~~~~~~~~~~~~~~~~


Typealias Protocol Elements
~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. langref-grammar

    decl-protocol ::= attribute-list 'protocol' identifier inheritance? '{' protocol-member* '}'
    protocol-member ::= decl-func
    protocol-member ::= decl-var
    protocol-member ::= subscript-head
    protocol-member ::= typealias-head

.. syntax-grammar::

    Grammar of a protocol declaration

    protocol-declaration --> attribute-sequence-OPT ``protocol`` protocol-name type-inheritance-clause-OPT protocol-body
    protocol-name --> identifier
    protocol-body --> ``{`` protocol-members-OPT ``}``

    protocol-members --> protocol-member protocol-members-OPT
    protocol-member --> variable-declaration | function-declaration | typealias-head | subscript-head


Constructor Declarations
------------------------

.. TODO: Add syntax-outline once selector syntax is nailed down.

.. langref-grammar

    decl-constructor ::= attribute-list 'init' generic-params? constructor-signature brace-item-list
    constructor-signature ::= pattern-tuple
    constructor-signature ::= identifier-or-any selector-tuple

.. syntax-grammar::

    Grammar of a constructor declaration

    constructor-declaration --> attribute-sequence-OPT ``init`` generic-parameter-clause-OPT constructor-signature code-block
    constructor-signature --> tuple-pattern | identifier-or-any selector-arguments


Destructor Declarations
-----------------------

.. syntax-outline::

    destructor() {
        <#code to execute#>
    }

.. langref-grammar

    decl-constructor ::= attribute-list 'destructor' '(' ')' brace-item-list
    NOTE: langref contains a typo here---should be 'decl-destructor'

.. syntax-grammar::

    Grammar of a destructor declaration

    destructor-declaration --> attribute-sequence-OPT ``destructor`` ``(`` ``)`` code-block


Extension Declarations
----------------------

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


Subscript Declarations
----------------------

.. syntax-outline::

    subscript (<#arguments#>) -> <#return type#> {
    get:
        <#code to execute#>
    set(<#setter name#>):
        <#code to execute#>
    }

.. langref-grammar

    decl-subscript ::= subscript-head '{' get-set '}'
    subscript-head ::= attribute-list 'subscript' pattern-tuple '->' type

.. syntax-grammar::

    Grammar of a subscript declaration

    subscript-declaration --> subscript-head getter-setter-block
    subscript-head --> attribute-sequence-OPT ``subscript`` tuple-pattern ``->`` type


Attribute Sequences
-------------------

.. TODO: TR: Get the latest list of attributes

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
    attribute --> infix-attribute | resilience-attribute | in-out-attribute | auto-closure-attribute | no-return-attribute

.. NOTE:

   Our grammar doesn't have empty terminals (no epsilon)
   so we need to make attribute-sequence actually contain something.
   This means that instead of having "empty" as a possible expansion,
   attribute-sequence always appears as -OPT.


Infix Attributes
~~~~~~~~~~~~~~~~

.. langref-grammar

    attribute-infix ::= 'infix_left'  '=' integer_literal
    attribute-infix ::= 'infix_right' '=' integer_literal
    attribute-infix ::= 'infix        '=' integer_literal

.. syntax-grammar::

    Grammar of an infix attribute

    infix-attribute --> infix-head ``=`` integer-literal
    infix-head --> ``infix`` | ``infix_left`` | ``infix_right``


Resilience Attributes
~~~~~~~~~~~~~~~~~~~~~

.. langref-grammar

    attribute-resilience ::= 'resilient'
    attribute-resilience ::= 'fragile'
    attribute-resilience ::= 'born_fragile'


.. syntax-grammar::

    Grammar of a resilience attribute

    resilience-attribute --> ``resilient`` | ``fragile`` | ``born_fragile``


The In-Out Attribute
~~~~~~~~~~~~~~~~~~~~

.. langref-grammar

    attribute-inout ::= 'inout'


.. syntax-grammar::

    Grammar of an in-out attribute

    in-out-attribute --> ``inout``


The Auto-Closure Attribute
~~~~~~~~~~~~~~~~~~~~~~~~~~

.. langref-grammar

    attribute-auto_closure ::= 'auto_closure'


.. syntax-grammar::

    Grammar of an auto-closure attribute

    auto-closure-attribute --> ``auto_closure``


The No-Return Attribute
~~~~~~~~~~~~~~~~~~~~~~~

.. langref-grammar

    attribute-noreturn ::= 'noreturn'


.. syntax-grammar::

    Grammar of a no-return attribute

    no-return-attribute --> ``noreturn``
