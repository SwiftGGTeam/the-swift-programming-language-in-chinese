Lexical Structure
=================

.. TODO: write a brief intro to this chapter.



Whitespace and Comments
-----------------------


Identifiers
-----------

Identifier Tokens
~~~~~~~~~~~~~~~~~


Operators
+++++++++


Implementation Identifier Token
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Reserved Punctuation and Keywords
---------------------------------

Reserved Punctuation Tokens
~~~~~~~~~~~~~~~~~~~~~~~~~~~


Reserved Keywords
~~~~~~~~~~~~~~~~~

*Keywords used in declarations and types*:

``class``      ``func``      ``struct``
``destructor`` ``metatype``  ``subscript``
``extension``  ``enum``      ``typealias``
``import``     ``protocol``  ``var``
``init``       ``static``    ``where``

*Keywords used in expressions*:

``as``         ``super``     ``__COLUMN__``
``is``         ``self``      ``__FILE__``
``new``        ``Self``      ``__LINE__``

*Keywords used in statements*:

``break``         ``else``     ``switch``
``case``          ``if``       ``then``
``continue``      ``in``       ``while``
``default``       ``for``
``do``            ``return``


Constants
---------

Integer Literals
~~~~~~~~~~~~~~~~


Floating-Point Literals
~~~~~~~~~~~~~~~~~~~~~~~


Character Literals
~~~~~~~~~~~~~~~~~~


String Literals
~~~~~~~~~~~~~~~



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
        <#code to execute#>
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




