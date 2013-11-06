Declarations
============


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
    code-block-items --> code-block-item | code-block-item code-block-items
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

    import-declaration --> attribute-list ``import`` import-kind-OPT import-path
    
    import-kind --> ``typealias`` | ``struct`` | ``class`` | ``enum`` | ``protocol`` | ``var`` | ``def``
    import-path --> any-identifier | any-identifier ``.`` import-path


Extension Declarations
----------------------


Variable Declarations
---------------------



Function Declarations
---------------------


Function Signatures
~~~~~~~~~~~~~~~~~~~



Typealias Declarations
----------------------


Enumeration Declarations
------------------------



Structure Declarations
----------------------


Class Declarations
------------------


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