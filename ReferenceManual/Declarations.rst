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
    
    import-declaration --> attribute-list ``import`` import-kind-OPT import-path
    
    import-kind --> ``typealias`` | ``struct`` | ``class`` | ``enum`` | ``protocol`` | ``var`` | ``def``
    import-path --> any-identifier | any-identifier ``.`` import-path


Extension Declarations
----------------------


.. langref-grammar

    decl-extension ::= 'extension' type-identifier inheritance? '{' decl* '}'


.. syntax-grammar::

    Grammar of an extension declaration
    
    extension-declaration --> ``extension`` type-identifier type-inheritance-list-OPT ``{`` declaration-OPT ``}``

.. TODO:
 
     Add elsewhere: type-inheritance-list



Variable Declarations
---------------------


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

    variable-declaration --> attribute-list-OPT ``var`` pattern-initializer-list
    variable-declaration --> attribute-list-OPT ``var`` typed-pattern-list
    variable-declaration --> attribute-list-OPT ``var`` identifier ``:`` type-annotation code-block
    variable-declaration --> attribute-list-OPT ``var`` identifier ``:`` type-annotation getter-setter-block
    
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
    
    function-declaration --> attribute-list ``def`` any-identifier generic-parameters-OPT function-signature code-block-OPT
    
    function-signature --> function-arguments function-signature-result-OPT
    function-arguments --> tuple-patterns | selector-arguments
    
    selector-arguments --> ``(`` tuple-pattern-element ``)`` selector-tuples
    selector-tuples --> identifier-or-any ``(`` tuple-pattern-element ``)`` selector-tuples-OPT
    
    
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
    
    Add elsewhere: tuple-patterns (tuple-patterns --> tuple-pattern | tuple-pattern tuple-patterns)


Typealias Declarations
----------------------

.. langref-grammar

    decl-typealias ::= typealias-head '=' type
    typealias-head ::= 'typealias' identifier inheritance?

    
.. syntax-grammar::

    Grammar of a typealias declaration

    typealias-declaration --> typealias-head ``=`` type
    typealias-head --> ``typealias`` identifier type-inheritance-list-OPT


Enumeration Declarations
------------------------

.. langref-grammar

    decl-enum ::= attribute-list 'enum' identifier generic-params? inheritance? enum-body
    enum-body ::= '{' decl* '}'
    decl-enum-element ::= attribute-list 'case' enum-case (',' enum-case)*
    enum-case ::= identifier type-tuple? ('->' type)?

.. syntax-grammar::

    Grammar of an enumeration declaration
    
    enum-declaration --> attribute-list ``enum`` identifier generic-parameters-OPT type-inheritance-list-OPT enum-body
    enum-body --> ``{`` declarations-OPT ``}``
    
    enum-element-declaration --> attribute-list ``case`` enum-case-list
    enum-case-list --> enum-case | enum case ``,`` enum-case-list
    enum-case --> identifier type-tuple-OPT enum-case-return-type-OPT
    enum-case-return-type --> ``->`` type


.. TODO:

    Add elsewhere: declarations (declarations --> declaration declarations-OPT)
    
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

.. langref-grammar

    decl-struct ::= attribute-list 'struct' identifier generic-params? inheritance? '{' decl-struct-body '}'
    decl-struct-body ::= decl*

.. syntax-grammar::

    Grammar of a structure declaration

   struct-declaration --> attribute-list ``struct`` identifier generic-parameters-OPT type-inheritance-list-OPT struct-body
   struct-body --> ``{`` declarations-OPT ``}``


Class Declarations
------------------

.. langref-grammar

    decl-class ::= attribute-list 'class' identifier generic-params? inheritance? '{' decl-class-body '}'
    decl-class-body ::= decl*

.. syntax-grammar::

    Grammar of a class declaration

    class-declaration --> attribute-list ``class`` identifier generic-parameters-OPT type-inheritance-list-OPT
    class-body --> ``{`` declarations-OPT ``}``


Protocol Declarations
---------------------


.. langref-grammar

    decl-protocol ::= attribute-list 'protocol' identifier inheritance? '{' protocol-member* '}'
    protocol-member ::= decl-func
    protocol-member ::= decl-var
    protocol-member ::= subscript-head
    protocol-member ::= typealias-head


.. syntax-grammar::

    Grammar of a protocol declaration

    protocol-declaration --> attribute-list ``protocol`` identifier type-inheritance-list-OPT protocol-body
    protocol-body --> ``{`` protocol-members-OPT ``}``
    
    protocol-members --> protocol-member protocol-members-OPT
    protocol-member --> variable-declaration | function-declaration | typealias-head | subscript-head


Function Protocol Elements
~~~~~~~~~~~~~~~~~~~~~~~~~~

Variable Protocol Elements
~~~~~~~~~~~~~~~~~~~~~~~~~~

Subscript Protocol Elements
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Typealias Protocol Elements
~~~~~~~~~~~~~~~~~~~~~~~~~~~


Subscript Declarations
----------------------


Constructor Declarations
------------------------


Destructor Declarations
-----------------------


Attribute Lists
---------------

Infix Attributes
~~~~~~~~~~~~~~~~

Resilience Attributes
~~~~~~~~~~~~~~~~~~~~~

The inout Attribute
~~~~~~~~~~~~~~~~~~~~~~~

The auto-closure Attribute
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The No Return Attribute
~~~~~~~~~~~~~~~~~~~~~~~
