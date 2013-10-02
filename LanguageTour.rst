A Tour of the Swift Language
============================

.. docnote:: Subjects to be covered in this section

	* Basic grammar structure
	* Braces, semicolons and whitespace
	* Comments
	* Lack of header files
	* Introduction to the core concepts from each of the chapters in the Language Guide

.. refnote:: Language Reference: Whitespace and Comments

    Definition::
    
		whitespace ::= ' '
		whitespace ::= '\n'
		whitespace ::= '\r'
		whitespace ::= '\t'
		whitespace ::= '\0'
		comment    ::= //.*[\n\r]
		comment    ::= /* .... */

	Space, newline, tab, and the nul byte are all considered whitespace and are discarded, with one exception:  a '(' or '[' which does not follow a non-whitespace character is different kind of token (called *spaced*) from one which does not (called *unspaced*). A '(' or '[' at the beginning of a file is spaced.
  
	Comments may follow the BCPL style, starting with a "//" and running to the	end of the line, or may be recursively nested /**/ style comments. Comments are ignored and treated as whitespace.

	Nested block comments are important because we don't have the nestable "#if 0" hack from C to rely on.

.. refnote:: Lexical Structure: Introduction

	Source files in Swift are UTF-8 encoded text files, which are first tokenized
	using the "`maximal munch <http://en.wikipedia.org/wiki/Maximal_munch>`_" rule,
	then parsed.  Unlike C, Swift does not use a preprocessor, and does not include
	digraphs, trigraphs, or "line splicing" with escaped newlines.

	As mentioned earlier, it is a strong goal to follow C's basic syntax where
	reasonably possible, which is a major influence on its basic lexical structure.

.. refnote:: Lexical Structure: Whitespace

	Space, tab, newline and return are all considered whitespace and ignored (other
	than separating tokens).  Line breaks do not affect the Swift parser, but we do
	require a semicolon to separate two statements on the same line to make it
	easier to read the code::

	  var x : Int
	  x = 4
  
	  var x : Int; x = 4

	Semicolons are also accepted and ignored at the end of all statements and
	declarations, but we don't encourage their use.

.. refnote:: Lexical Structure: Comments

	Swift supports both "``//``" line-comments (where the "``//``" and the rest of
	the line are discarded) and "``/* */``" block comments like C99.  Because Swift
	does not include a preprocessor (and thus does not support ``#if 0`` tricks), it
	allows ``/* */`` comments to be nested.  As such, these examples "do the right
	thing" in Swift::

	  // This is a line comment.
	  // This ascii art doesn't cause the next line to be commented: /---\
	  var x = 0
  
	  /* This is a block comment.  y is commented out.
	  var y = 1

	  /* This is a nested block comment.  z is also commented out. */
	  var z = 2

	  end of outer block comment.
	  */
  
	Though we have no design or implementation yet, we would eventually like to
	have a standard form for documentation generation from source (e.g.
	`Javadoc <http://en.wikipedia.org/wiki/Javadoc>`_ or `Doxygen
	<http://en.wikipedia.org/wiki/Doxygen>`_ that is parsed and validated by the
	compiler (similar to Clang's -Wdocumentation flag).

.. refnote:: Lexical Structure: Keywords

	Swift includes a number of keywords that are baked into the compiler, and thus
	not usable as an identifier.  These including things like ``if``, ``break``,
	``return``, ``var``, etc.
