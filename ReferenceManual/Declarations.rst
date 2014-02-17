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
    decl ::= decl-val
    decl ::= decl-subscript

.. syntax-grammar::

    Grammar of a declaration

    declaration --> import-declaration
    declaration --> variable-declaration
    declaration --> value-declaration
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

    import <#import kind#> <#module#>

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
        <#statements#>
    set(<#setter name#>):
        <#statements#>
    }

.. TODO: In prose: discuss that 'name' can also be a pattern in the first syntax-outline.
    Also, discuss that when you only want to provide a getter, 'get:' is optional
    (as shown in the third form of the grammar).

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

    variable-declaration --> attribute-sequence-OPT variable-specifier-OPT ``var`` pattern-initializer-list
    variable-declaration --> attribute-sequence-OPT ``var`` variable-name type-annotation code-block
    variable-declaration --> attribute-sequence-OPT ``var`` variable-name type-annotation getter-setter-block
    variable-specifier --> ``static`` | ``class``
    variable-name --> identifier

    pattern-initializer-list --> pattern-initializer | pattern-initializer ``,`` pattern-initializer-list
    pattern-initializer --> pattern initializer-OPT
    initializer --> ``=`` expression

    getter-setter-block --> ``{`` getter setter-OPT ``}`` | ``{`` setter getter ``}``
    getter --> ``get`` ``:`` statements-OPT
    setter --> ``set`` setter-name-OPT ``:`` statements-OPT
    setter-name --> ``(`` identifier ``)``

.. NOTE: Type annotations are required for computed properties -- the
   types of those properties are not computed/inferred.

.. NOTE: The variable-specifier is currently restricted to variables
    declared using the first variable-declaration grammar.
    This is a temporary compiler limitation.
    Eventually, variable-specifier will be allowed for the other two forms of the grammar
    (those that declare variable with computed values).


Value Declaration
-----------------

.. syntax-outline::

    val <#variable name#> : <#type#> = <#expression#>

.. langref-grammar

    decl-let    ::= attribute-list 'val' pattern initializer?  (',' pattern initializer?)*
    initializer ::= '=' expr

.. syntax-grammar::

    Grammar of a value declaration

    value-declaration --> attribute-sequence-OPT ``val`` pattern-initializer-list


Typealias Declarations
----------------------

.. syntax-outline::

    typealias <#new type#> : <#adopted protocols#> = <#existing type#>

.. langref-grammar

    decl-typealias ::= typealias-head '=' type
    typealias-head ::= 'typealias' identifier inheritance?

.. syntax-grammar::

    Grammar of a typealias declaration

    typealias-declaration --> typealias-head typealias-assignment
    typealias-head --> ``typealias`` typealias-name type-inheritance-clause-OPT
    typealias-name --> identifier
    typealias-assignment --> ``=`` type


Function Declarations
---------------------

**[Query/Note: We are trying to decide which code-snippet-style syntax outlines to use
for regular Swift-style function definitions and for selector-style method definitions.
Below you'll find two alternatives for the former and four alternatives for the latter.
We would like to pick one for regular functions and one for selector-style methods.
Please send us your feedback!]**

Most function and method definitions have the following general form:

**[Regular function, alternative 1:
This alternative is very simple and is based on the existing Xcode code snippet for C++ functions.
The downside to this alternative is two-fold:
first, the Swift-specific structure of the function parameters is completely hidden;
second, we need to expose the structure of at least two parameters to visually distinguish
regular functions and selector-style methods.]**


.. syntax-outline::

    func <#function name#>(<#function parameters#>) -> <#return type#> {
        <#statements#>
    }

**[Regular function, alternative 2:
This alternative satisfies the problems noted with the first alternative.
That said, it's a rather long (and ugly?) way to display the general form of a simple function definition
(the signature no longer fits on a single line).
We've considered abbreviating names, but we're trying to avoid that
because it's inconsistent with the rest of the document (and with existing Xcode code snippets).]**


.. syntax-outline::

    func <#function name#>(
         <#parameter name 1#>: <#parameter type 1#>,
         <#parameter name 2#>: <#parameter type 2#>)
         -> <#return type#>
    {
        <#statements#>
    }

Swift also provides syntax for declaring and defining selector-style methods,
such as those found in Objective-C. Definitions of selector-style methods have the
following form:

**[The following four alternatives deal with selector-style method definitions.
The only difference between each of them is the name for each part of the selector.]**

**[Selector-style, alternative 1:
This alternative is descriptively pretty accurate but may also be a bit awkward.]**


.. syntax-outline::

    func <#selector name part 1#>(<#parameter name 1#>: <#parameter type 1#>)
         <#selector name part 2#>(<#parameter name 2#>: <#parameter type 2#>)
         -> <#return type#>
    {
        <#statements#>
    }

**[Selector-style, alternative 2:
Although there is some precedent for calling each part of the selector a "keyword",
doing so isn't quite accurate.
The parts of the name of a method aren't keywords in the language (at least in the normal sense).]**


.. syntax-outline::

    func <#selector keyword 1#>(<#parameter name 1#>: <#parameter type 1#>)
         <#selector keyword 2#>(<#parameter name 2#>: <#parameter type 2#>)
         -> <#return type#>
    {
        <#statements#>
    }

**[Selector-style, alternative 3:
This alternative uses "method" instead of "selector", but still uses "keyword".]**


.. syntax-outline::

    func <#method keyword 1#>(<#parameter name 1#>: <#parameter type 1#>)
         <#method keyword 2#>(<#parameter name 2#>: <#parameter type 2#>)
         -> <#return type#>
    {
        <#statements#>
    }

**[Selector-style, alternative 4:
This alternative uses "signature" instead of "method" or "selector", but still uses "keyword".]**


.. syntax-outline::

    func <#signature keyword 1#>(<#parameter name 1#>: <#parameter type 1#>)
         <#signature keyword 2#>(<#parameter name 2#>: <#parameter type 2#>)
         -> <#return type#>
    {
        <#statements#>
    }

.. TODO: Discuss in prose: Variadic functions and the other permutations of function declarations.

.. TODO: Decide on a syntax-outline for regular Swift functions and for selector-style functions.


Function Signatures
~~~~~~~~~~~~~~~~~~~

.. langref-grammar

    decl-func        ::= attribute-list 'type'? 'func' any-identifier generic-params? func-signature brace-item-list?
    func-signature ::= func-arguments func-signature-result?
    func-arguments ::= pattern-tuple+
    func-arguments ::= selector-tuple
    selector-tuple ::= '(' pattern-tuple-element ')' (identifier-or-any '(' pattern-tuple-element ')')+
    func-signature-result ::= '->' type-annotation

.. syntax-grammar::

    Grammar of a function declaration

    function-declaration --> attribute-sequence-OPT function-specifier-OPT ``func`` function-name generic-parameter-clause-OPT function-signature code-block-OPT
    function-specifier --> ``static`` | ``class``
    function-name --> any-identifier

    function-signature --> function-parameters function-signature-result-OPT
    function-parameters --> tuple-patterns | selector-parameters
    function-signature-result --> ``->`` attribute-sequence-OPT type

    selector-parameters --> ``(`` tuple-pattern-element ``)`` selector-tuples
    selector-tuples --> selector-name ``(`` tuple-pattern-element ``)`` selector-tuples-OPT
    selector-name --> identifier-or-any

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
    protocol-member --> variable-declaration | function-declaration | typealias-head typealias-assignment-OPT | subscript-head


Constructor Declarations
------------------------

.. syntax-outline::

    init(<#parameter name#>: <#parameter type#>) {
        <#statements#>
    }

.. syntax-outline::

    init <#selector keyword 1#>(<#parameter name 1#>: <#parameter type 1#>)
         <#selector keyword 2#>(<#parameter name 2#>: <#parameter type 2#>)
    }
        <#statements#>
    }

.. TODO: Revisit the selector-style constructor syntax-outline
    after we've nailed down the syntax-outline for selector-style function declarations.

.. langref-grammar

    decl-constructor ::= attribute-list 'init' generic-params? constructor-signature brace-item-list
    constructor-signature ::= pattern-tuple
    constructor-signature ::= identifier-or-any selector-tuple

.. syntax-grammar::

    Grammar of a constructor declaration

    constructor-declaration --> attribute-sequence-OPT ``init`` generic-parameter-clause-OPT constructor-signature code-block
    constructor-signature --> tuple-pattern | selector-tuples


Destructor Declarations
-----------------------

.. syntax-outline::

    destructor() {
        <#statements#>
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

.. TODO: TR: What are the semantic rules associated with extending different types?
    The LangRef says "'extension' declarations allow adding member declarations to existing types,
    even in other source files and modules. There are different semantic rules for each type that is extended.
    enum, struct, and class declaration extensions. FIXME: Write this section."
    What is the relevant, missing information?
    What are the semantic rules associated with extending different types?

    TODO: Email Doug et al. in a week or two (from 1/29/14) to get the rules.


Subscript Declarations
----------------------

.. syntax-outline::

    subscript (<#arguments#>) -> <#return type#> {
    get:
        <#statements#>
    set(<#setter name#>):
        <#statements#>
    }

.. langref-grammar

    decl-subscript ::= subscript-head '{' get-set '}'
    subscript-head ::= attribute-list 'subscript' pattern-tuple '->' type

.. syntax-grammar::

    Grammar of a subscript declaration

    subscript-declaration --> subscript-head getter-setter-block
    subscript-head --> attribute-sequence-OPT ``subscript`` tuple-pattern ``->`` type


Attributes
----------

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
    attribute --> declaration-attribute | interface-builder-attribute

.. NOTE: Our grammar doesn't have empty terminals (no epsilon)
   so we need to make attribute-sequence actually contain something.
   This means that instead of having "empty" as a possible expansion,
   attribute-sequence always appears as -OPT.

.. TODO: From looking at /swift/include/swift/AST/Attr.def,
    there are ATTR(...), TYPE_ATTR(...), and IB_ATTR(...).
    TYPE_ATTR(...)s can be applied to types only,
    and plain ATTR(...)s are restricted to declarations only.
    That said, the 'noreturn' attribute can be specified on the declaration
    or on the function type, and is thus in both both ATTR(...) and TYPE_ATTR(...).

    Here's the current list (as of 1/20/2014):

    Type Attributes:
    ``auto_closure`` ``inout`` ``cc`` ``noreturn`` ``objc_block`` ``thin`` ``thick``
    ``unchecked``
    Declaration Attributes:
    ``assignment`` ``class_protocol`` ``conversion`` ``exported`` ``infix`` ``mutating``
    ``resilient`` ``fragile`` ``born_fragile`` ``asmname`` ``noreturn`` ``prefix``
    ``postfix`` ``objc`` ``optional`` ``transparent`` ``unowned`` ``weak``
    ``requires_stored_property_inits``
    Interface Builder Attributes:
    ``IBOutlet`` ``IBAction`` ``IBLiveView`` ``IBInspectable``

    Because attributes are (almost) neatly separated into mutually exclusive categories,
    e.g., declaration attributes, type attributes, and IB attributes,
    then we can break down the attribute grammar accordingly.
    We still need to decide the best way to do this.
    Some possibilites are:

        1. Each of the three groups of attributes gets its own subsection.
           Some attributes (e.g., 'objc') may require lots of explanation.
        2. Create a whole new chapter on attributes.

    Currently, we're leaning toward (1).

    According to Doug (1/29/14), many of these attributes are not worth documenting
    either in the near future or at all. We should really focus on the following first:
    ``mutating``, ``objc``, ``weak``, ``unowned``, ``optional``, ``class_protocol``,
    ``IBOutlet``, ``IBAction``, ``IBLiveView``, and ``IBInspectable``.
    The rest should be omitted (at least for now)---they're really
    only used in the Standard Library.
    In addition, it's likely that inout will get folder into the function stuff,
    and resilience is totally pointless (for now),
    because we're not doing it for Swift 1.0. Leave both of them off entirely.

    TR: None of the attributes Doug mentioned above are type attributes.
    Are there any types attributes that we should bother documenting?

    TODO: For the attributes we are planning on documenting in the near future,
    we need to get more information about their use and behavior.
    Find out what we can from current documentation,
    and email Doug or swift-dev for anything that's missing.


Declaration Attributes
~~~~~~~~~~~~~~~~~~~~~~

.. syntax-grammar::

    Grammar of a declaration attribute

    declaration-attribute --> ``mutating`` | ``weak`` | ``unowned`` | ``optional`` | ``objc`` | ``class_protocol``


Interface Builder Attributes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. syntax-grammar::

    Grammar of an interface builder attribute

    interface-builder-attribute --> ``IBOutlet`` | ``IBAction`` | ``IBLiveView`` | ``IBInspectable``
