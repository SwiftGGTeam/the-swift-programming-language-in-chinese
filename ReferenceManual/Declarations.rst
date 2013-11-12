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
    decl ::= decl-subscript


.. syntax-grammar::

    Grammar of a declaration
    
    declaration --> class-declaration
    declaration --> constructor-declaration
    declaration --> destructor-declaration
    declaration --> extension-declaration
    declaration --> function-declaration
    declaration --> import-declaration
    declaration --> enum-declaration
    declaration --> enum-element-declaration
    declaration --> protocol-declaration
    declaration --> struct-declaration
    declaration --> typealias-declaration
    declaration --> variable-declaration
    declaration --> subscript-declaration


Translation Unit
----------------

.. TODO:

    Better to describe this part of the grammar in prose.
    
.. langref-grammar

    translation-unit ::= brace-item*

Code Blocks
-----------

.. syntax-outline::

    {
        <#code-to-execute#>
    }
        

.. langref-grammar

    brace-item-list ::= '{' brace-item* '}'
    brace-item      ::= decl
    brace-item      ::= expr
    brace-item      ::= stmt


.. syntax-grammar::

    Grammar of a code block
   
    code-block --> ``{`` code-block-items-OPT ``}``
    code-block-items --> code-block-item code-block-items-OPT
    code-block-item --> declaration | expression | statement


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
    import-kind ::= 'def'
    import-path ::= any-identifier ('.' any-identifier)*


.. syntax-grammar::

    Grammar of an import declaration
    
    import-declaration --> attribute-sequence-OPT ``import`` import-kind-OPT import-path
    
    import-kind --> ``typealias`` | ``struct`` | ``class`` | ``enum`` | ``protocol`` | ``var`` | ``def``
    import-path --> any-identifier | any-identifier ``.`` import-path


Extension Declarations
----------------------


.. syntax-outline::

    extension <#type#> : <#inheritance#> {
        <#declarations#>
    }


.. langref-grammar

    decl-extension ::= 'extension' type-identifier inheritance? '{' decl* '}'


.. syntax-grammar::

    Grammar of an extension declaration
    
    extension-declaration --> ``extension`` type-identifier type-inheritance-list-OPT extension-body
    extension-body --> ``{`` declarations-OPT ``}``

.. TODO:
 
     Add elsewhere: type-inheritance-list



Variable Declarations
---------------------


.. syntax-outline::

    var <#variable-name#> : <#type#> = <#expression#>


.. syntax-outline::

    var <#variable-name#> : <#type#> {
    get:
        <#code-to-execute#>
    set(<#setter-name#>):
        <#code-to-execute#>
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
    variable-declaration --> attribute-sequence-OPT ``var`` typed-pattern-list
    variable-declaration --> attribute-sequence-OPT ``var`` variable-name ``:`` type-annotation code-block
    variable-declaration --> attribute-sequence-OPT ``var`` variable-name ``:`` type-annotation getter-setter-block
    variable-name --> identifier
    
    pattern-initializer-list --> pattern-initializer | pattern-initializer ``,`` pattern-initializer-list
    pattern-initializer --> pattern initializer
    initializer --> ``=`` expression
    
    getter-setter-block --> ``{`` getter setter-OPT ``}`` | ``{`` setter getter ``}``
    getter --> ``get`` ``:`` code-block-items-OPT
    setter --> ``set`` setter-name-OPT ``:`` code-block-items-OPT
    setter-name --> ``(`` identifier ``)``
    
.. TODO:

    Follow up with the compiler team to get the correct grammar for the first var declaration
    definition.
    
    Add elsewhere: typed-pattern-list (typed-pattern-list --> typed-pattern | typed-pattern ``,`` typed-pattern-list);
    Also, change tuple-pattern-element to use pattern-initializer as one of its alternatives.
    
Function Declarations
---------------------

.. syntax-outline::

    def <#function-name#> (<#arguments#>) -> <#return-type#> {
        <#code-to-execute#>
    }

.. TODO:

    Discuss in prose: Variadic functions and the other permutations of function declarations.
    Also, write a syntax-outline for selector-style functions, once these are nailed down.

Function Signatures
~~~~~~~~~~~~~~~~~~~


.. langref-grammar

    decl-func        ::= attribute-list 'static'? 'def' any-identifier generic-params? func-signature brace-item-list?
    func-signature ::= func-arguments func-signature-result?
    func-arguments ::= pattern-tuple+
    func-arguments ::= selector-tuple
    selector-tuple ::= '(' pattern-tuple-element ')' (identifier-or-any '(' pattern-tuple-element ')')+
    func-signature-result ::= '->' type-annotation


.. syntax-grammar::
    
    Grammar of a function declaration
    
    function-declaration --> attribute-sequence-OPT ``def`` function-name generic-parameters-OPT function-signature code-block-OPT
    function-name --> any-identifier
    
    function-signature --> function-arguments function-signature-result-OPT
    function-arguments --> tuple-patterns | selector-arguments
    function-signature-result --> ``->`` type-annotation
    
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
    
    Discuss with compiler team: tuple-patterns and ``(`` tuple-pattern-element ``)`` seem to allow
    the same elements; how are they different? Maybe type-tuple and type-tuple-element is what is meant?
    In any case, what's the difference between tuple-patterns/``(`` tuple-pattern-element ``)`` and
    type-tuple/type-tuple-element?
    
    Also, is the code-block-OPT really optional? What does it mean when you leave off the code-block?
    
    Revised selector-name---can we come up with a better name for this?
    
    Add elsewhere: tuple-patterns (tuple-patterns --> tuple-pattern | tuple-pattern tuple-patterns)


Typealias Declarations
----------------------


.. syntax-outline::

    typealias <#new-type#> : <#inheritance#> = <#existing-type#>



.. langref-grammar

    decl-typealias ::= typealias-head '=' type
    typealias-head ::= 'typealias' identifier inheritance?

    
.. syntax-grammar::

    Grammar of a typealias declaration

    typealias-declaration --> typealias-head ``=`` type
    typealias-head --> ``typealias`` typealias-name type-inheritance-list-OPT
    typealias-name --> identifier


Enumeration Declarations
------------------------

.. syntax-outline::

    enum <#enumeration-name#> {
        case: <#enumerator 1#>
        case: <#enumerator 2#>(<#associated-value-type#>)
    }

.. syntax-outline::

    enum <#enumeration-name#> : <#raw-value-type#> {
        case: #enumerator 1#> = <#raw-value 1#>
        case: #enumerator 2#> = <#raw-value 2#>

.. TODO:

    Is raw-value-type the correct thing to put here?
    According to the grammar, it's an inheritance list,
    which can take a list of protocols.

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
    
    enum-element-declaration --> attribute-sequence-OPT ``case`` enum-case-list
    enum-case-list --> enum-case | enum case ``,`` enum-case-list
    enum-case --> identifier tuple-type-OPT enum-case-return-type-OPT
    enum-case-return-type --> ``->`` type


.. TODO:

    Add elsewhere: declarations (declarations --> declaration declarations-OPT)
    
    Is it really the case that you can have declarations other than enum-element-declaration
    inside an enum-body? If not, we should replace enum-body with:
    enum-body --> ``{`` enum-element-declarations-OPT ``}``.
    
    Also, do we need to modify the grammar to allow for raw values?
    
    Discuss with the compiler team: in the enum-case, ('->' type)? doesn't match what the REPL
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



Structure Declarations
----------------------

.. syntax-outline::

    struct <#structure-name#>



.. langref-grammar

    decl-struct ::= attribute-list 'struct' identifier generic-params? inheritance? '{' decl-struct-body '}'
    decl-struct-body ::= decl*

.. syntax-grammar::

    Grammar of a structure declaration

   struct-declaration --> attribute-sequence-OPT ``struct`` struct-name generic-parameters-OPT type-inheritance-list-OPT struct-body
   struct-name --> identifier
   struct-body --> ``{`` declarations-OPT ``}``


Class Declarations
------------------

.. langref-grammar

    decl-class ::= attribute-list 'class' identifier generic-params? inheritance? '{' decl-class-body '}'
    decl-class-body ::= decl*

.. syntax-grammar::

    Grammar of a class declaration

    class-declaration --> attribute-sequence-OPT ``class`` class-name generic-parameters-OPT type-inheritance-list-OPT class-body
    class-name --> identifier
    class-body --> ``{`` declarations-OPT ``}``


Protocol Declarations
---------------------


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

    protocol-declaration --> attribute-sequence-OPT ``protocol`` protocol-name type-inheritance-list-OPT protocol-body
    protocol-name --> identifier
    protocol-body --> ``{`` protocol-members-OPT ``}``
    
    protocol-members --> protocol-member protocol-members-OPT
    protocol-member --> variable-declaration | function-declaration | typealias-head | subscript-head


Subscript Declarations
----------------------


.. langref-grammar

    decl-subscript ::= subscript-head '{' get-set '}'
    subscript-head ::= attribute-list 'subscript' pattern-tuple '->' type


.. syntax-grammar::

    Grammar of a subscript declaration

    subscript-declaration --> subscript-head getter-setter-block
    subscript-head --> attribute-sequence-OPT ``subscript`` tuple-pattern ``->`` type

Constructor Declarations
------------------------


.. langref-grammar

    decl-constructor ::= attribute-list 'init' generic-params? constructor-signature brace-item-list
    constructor-signature ::= pattern-tuple
    constructor-signature ::= identifier-or-any selector-tuple


.. syntax-grammar::

    Grammar of a constructor declaration

    constructor-declaration --> attribute-sequence-OPT ``init`` generic-parameters-OPT constructor-signature code-block
    constructor-signature --> tuple-pattern | identifier-or-any selector-arguments

Destructor Declarations
-----------------------


.. langref-grammar

    decl-constructor ::= attribute-list 'destructor' '(' ')' brace-item-list
    NOTE: langref contains a typo here---should be 'decl-destructor'


.. syntax-grammar::

    Grammar of a destructor declaration
    
    destructor-declaration --> attribute-sequence-OPT ``destructor`` ``(`` ``)`` code-block


Attribute Sequences
-------------------


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


