Lexical Structure
=================

.. TODO: write a brief intro to this chapter.



Whitespace and Comments
-----------------------

.. langref-grammar

    whitespace ::= ' '
    whitespace ::= '\n'
    whitespace ::= '\r'
    whitespace ::= '\t'
    whitespace ::= '\0'

    comment    ::= //.*[\n\r]
    comment    ::= /* .... */

..
    ** (Matches the * above, to fix RST syntax highlighting.)

.. syntax-grammar::

    Grammar of whitespace and comments

    whitespace --> U+0000 (Null Character)
    whitespace --> U+0009 (Horizontal Tab)
    whitespace --> U+000A (New Line)
    whitespace --> U+000D (Carriage Return)
    whitespace --> U+0020 (Space)

    comment --> single-line-comment | multiline-comment

    single-line-comment --> ``//`` comment-text line-end
    comment-text --> Any text except for line-end
    line-end --> U+000A (New Line) | U+000D (Carriage Return)

    multiline-comment --> ``/*`` multiline-comment-text ``*/``
    multiline-comment-text --> Any text

Multiline comments may be nested.

  
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

.. langref-grammar:

    keyword ::= 'class'
    keyword ::= 'destructor'
    keyword ::= 'extension'
    keyword ::= 'import'
    keyword ::= 'init'
    keyword ::= 'def'
    keyword ::= 'metatype'
    keyword ::= 'enum'
    keyword ::= 'protocol'
    keyword ::= 'static'
    keyword ::= 'struct'
    keyword ::= 'subscript'
    keyword ::= 'typealias'
    keyword ::= 'var'
    keyword ::= 'where'
    keyword ::= 'break'
    keyword ::= 'case'
    keyword ::= 'continue'
    keyword ::= 'default'
    keyword ::= 'do'
    keyword ::= 'else'
    keyword ::= 'if'
    keyword ::= 'in'
    keyword ::= 'for'
    keyword ::= 'return'
    keyword ::= 'switch'
    keyword ::= 'then'
    keyword ::= 'while'
    keyword ::= 'as'
    keyword ::= 'is'
    keyword ::= 'new'
    keyword ::= 'super'
    keyword ::= 'self'
    keyword ::= 'Self'
    keyword ::= '__COLUMN__'
    keyword ::= '__FILE__'
    keyword ::= '__LINE__'

*Keywords used in declarations and types*:

``class``
``destructor``
``extension``
``import``
``init``
``func``
``metatype``
``enum``
``protocol``
``static``
``struct``
``subscript``
``typealias``
``var``
``where``

*Keywords used in expressions*:

``as``
``is``
``new``
``super``
``self``
``Self``
``__COLUMN__``
``__FILE__``
``__LINE__``

*Keywords used in statements*:

``break``
``case``
``continue``
``default``
``do``
``else``
``if``
``in``
``for``
``return``
``switch``
``then``
``while``

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




