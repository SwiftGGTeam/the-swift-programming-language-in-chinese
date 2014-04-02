Technical Review Queries
========================

.. Nothing goes here.

Lexical Structure
-----------------

The :newTerm:`lexical structure` of Swift describes what sequence of characters
form valid tokens of the language.
These valid tokens form the lowest-level building blocks of the language
and are used to describe the rest of the language in subsequent chapters.

In most cases, tokens are generated from the characters of a Swift source file
by considering the longest possible substring from the input text,
within the constraints of the grammar that are specified below.
This behavior is referred to as :newTerm:`longest match`
or :newTerm:`maximal munch`.

.. docnote::
    Is this a  correct description of the parser's max munch?
    I say "in most cases",
	because of how ``>>`` is split in certain constructs,
	as described below in the discussion of operators.
    If there's something else we can say that's more specific,
    I would rather do that.

Whitespace and Comments
~~~~~~~~~~~~~~~~~~~~~~~

Comments are treated as whitespace by the compiler.
Single line comments begin with `//`
and continue until the end of the line.
Multiline comments begin with ``/*`` and end with ``*/``.
Nesting is allowed, but the comment markers must be balanced.

.. docnote::
   LangRef says comments are ignored *and* treated as whitespace.
   Is there a difference?

Integer Literals
~~~~~~~~~~~~~~~~

:newTerm:`Integer literals` represent integer values of unspecified precision.
By default, integer literals are expressed in decimal;
you can specify an alternate base using a prefix.
Binary literals begin with ``0b``,
octal literals begin with ``0o``,
and hexadecimal literals begin with ``0x``.

Decimal literals contain the digits ``0`` through ``9``.
Binary literals contain ``0`` and ``1``,
octal literals contain ``0`` through ``7``,
and hexadecimal literals contain ``0`` through ``9``
as well as ``A`` through ``F`` in upper- or lowercase.

Negative integers literals are expressed by prepending a minus sign (``-``)
to an integer literal, as in ``-42``.

Underscores (``_``) are allowed between digits for readability,
but are ignored and therefore don't affect the value of the literal.
Integer literals can begin with leading zeros (``0``),
but are likewise ignored and don't affect the base or value of the literal.

Unless otherwise specified,
the default type of an integer literal is the Swift Standard Library type ``Int``.
The Swift Standard Library also defines types for various sizes of
signed and unsigned integers,
as described in :ref:`BasicTypes_Integers`.

.. docnote::
   The prose above assumes underscores only belong between digits.
   Is there a reason to allow them at the end of a literal?
   Java and Ruby both require underscores to be between digits.
   Also, are adjacent underscores meant to be allowed, as in ``5__000``?
   (The REPL supports them as of swift-1.21 but it seems odd.)

.. docnote::
    Why are negative integer literals treated (grammatically)
    asymmetrically to negative floating-point literals.
    From [Contributor 7746]'s radar:
    rdar://problem/15181997 Teach the compiler about a concept of negative integer literals.

[Partial grammar below.]

.. syntax-grammar::

    Grammar of an integer literal

    integer-literal --> negative-sign-OPT binary-literal
	integer-literal --> negative-sign-OPT octal-literal
	integer-literal --> negative-sign-OPT decimal-literal
	integer-literal --> negative-sign-OPT hexadecimal-literal

    binary-literal --> ``0b`` binary-digit binary-literal-characters-OPT
    binary-digit --> Digit 0 or 1
    binary-literal-character --> binary-digit | ``_``
    binary-literal-characters --> binary-literal-character binary-literal-characters-OPT

    decimal-literal --> decimal-digit decimal-literal-characters-OPT
    decimal-digit --> Digit 0 through 9
    decimal-digits --> decimal-digit decimal-digits-OPT
    decimal-literal-character --> decimal-digit | ``_``
    decimal-literal-characters --> decimal-literal-character decimal-literal-characters-OPT

	negative-sign --> ``-``


Floating-Point Literals
~~~~~~~~~~~~~~~~~~~~~~~

.. syntax-grammar::

    Grammar of a floating-point literal

    floating-point-literal --> decimal-literal decimal-fraction-OPT decimal-exponent-OPT
    floating-point-literal --> hexadecimal-literal hexadecimal-fraction-OPT hexadecimal-exponent

    decimal-fraction --> ``.`` decimal-literal
    decimal-exponent --> floating-point-e sign-OPT decimal-literal

    hexadecimal-fraction --> ``.`` hexadecimal-literal-OPT
    hexadecimal-exponent --> floating-point-p sign-OPT hexadecimal-literal

    floating-point-e --> ``e`` | ``E``
    floating-point-p --> ``p`` | ``P``
    sign --> ``+`` | ``-``


.. docnote::
   Why not allow all combinations --
   optional fraction and optional exponent in any base?


Textual Literals
~~~~~~~~~~~~~~~~

Character literals are of type of ``UnicodeScalar``.
String literals are of type ``String``.

.. docnote::
   Is UnicodeScalar the final name for that type?

.. docnote::
   Is there any context where string/double-quoted literals
   become implicitly null-terminated?
   That is, is their type always String or could it be char* or NSString?

.. docnote::
    Are we considering the Boolean values ``true`` and ``false``
    as literals (in the lexical structure sense). Where should we include
    these in the grammar? What about ``nil``?

Operators
~~~~~~~~~

Operators are made up of one or more of the following characters:
``/``, ``=``, ``-``, ``+``, ``!``, ``*``, ``%``, ``<``, ``>``,
``&``, ``|``, ``^``, ``~``, and ``.``.
That said, the tokens
``=``, ``->``, ``//``, ``/*``, ``*/``, ``.``,
and the unary prefix operator ``&`` are reserved.
These tokens can't be overloaded, nor can they be used to define custom operators.

.. docnote::
   LangRef also says (){}[].,;: are reserved punctuation,
   but those aren't valid operator characters anyway.
   OK to omit them from this list of reserved tokens?

The whitespace around an operator is used to determine
whether an operator is used as a prefix operator, a postfix operator,
or a binary operator. This behavior is summarized in the following rules:

* If an operator has whitespace around both sides or around neither side,
  it is treated as a binary operator.
  As an example, the ``+`` operator in ``a+b`` and ``a + b`` is treated as a binary operator.
* If an operator has whitespace on the left side only,
  it is treated as a prefix unary operator.
  As an example, the ``++`` operator in ``a ++b`` is treated as a prefix unary operator.
* If an operator has whitespace on the right side only,
  it is treated as a postfix unary operator.
  As an example, the ``++`` operator in ``a++ b`` is treated as a postfix unary operator.
* If an operator has no whitespace on the left but is followed immediately by a dot (``.``),
  it is treated as a postfix unary operator.
  As an example, the  ``++`` operator in ``a++.b`` is treated as a postfix unary operator
  (``a++ . b`` rather than ``a ++ .b``).

For the purposes of these rules,
the characters ``(``, ``[``, and ``{`` before an operator,
the characters ``)``, ``]``, and ``}`` after an operator,
and the characters ``,``, ``;``, and ``:``
are also considered whitespace.

There is one caveat to the rules above.
If the ``!`` or ``?`` operator has no whitespace on the left,
it is treated as a postfix operator,
regardless of whether it has whitespace on the right.
To use the ``?`` operator as syntactic sugar for the ``Optional`` type,
it must not have whitespace on the left.
To use it in the conditional (``? :``) operator,
it must have whitespace around both sides.

.. docnote::
   Is the above discussion of prefix/infix/postfix correct?
   LangRef uses a a notion of left/right binding in between
   explaining the surrounding whitespace
   and explaining how the operator is understood.
   Because left/right binding is not used anywhere else in the grammar,
   we have directly explained how whitespace impacts behavior.
   (It also appears that left and right bound are defined backward in LangRef.)

In certain constructs, operators with a leading ``<`` or ``>``
may be split into two or more tokens. The remainder is treated the same way
and may be split again. As a result, there is no need to use whitespace
to disambiguate between the closing ``>`` characters in constructs like
``Dictionary<String, Array<Int>>``.
In this example, the closing ``>`` characters are not treated as a single token
that may then be misinterpreted as a bit shift ``>>`` operator.

.. docnote::
   Is there a special context you must be in for this <<>> rule to happen?
   With this rule in effect, how is >> ever parsed as a bit shift
   and not two greater-than operators?

.. syntax-grammar::

    Grammar of operators

    operator --> operator-character operator-OPT
    operator-character --> ``/`` | ``=`` | ``-`` | ``+`` | ``!`` | ``*`` | ``%`` | ``<`` | ``>`` | ``&`` | ``|`` | ``^`` | ``~`` | ``.``

    binary-operator --> operator
    prefix-operator --> operator
    postfix-operator --> operator

.. docnote::
   Is this grammar still correct?
   Are there any other Unicode characters
   that are allowed to be operators?
   (A past build of Swift allowed various arrows and mathematical operators
   such as circled plus.)

.. docnote::
   LangRef doesn't list ? as either a character that you can use in an operator
   or as reserved punctuation.
   Is this correct?

Types
-----

.. docnote::
    What is the new story for "metatype types"?
    What are we going to call them?
    Do we have the syntax/grammar locked down?

.. docnote::
    How close are Arrays from being locked down?
    What should this section of the RefMan look like?

.. docnote::
    What do function types look like now (after the unification proposal)?
    Are they still based on tuple types?

.. docnote::
    What do tuple types look like now?


Expresions
----------

Unary Expressions
~~~~~~~~~~~~~~~~~

Unary expressions are formed by combining
an optional prefix operator with an expression.
Prefix operators take one argument,
the expression that follows them.

.. docnote::
   As of r14954, ParsExpr.cpp also has expr-discard
   which consists of an underscore (_).
   What is that for?
   My guess is that it's used on the left side of an assigment
   to indicate that the return value is being discarded,
   or that part of a pattern-matched assignment
   is being discarded.
   [Aside: Could this be used as the body of a do-nothing default: statement
   in a switch to satisfy the must-be-exhaustive constrait?]

Type-Checking Operators
~~~~~~~~~~~~~~~~~~~~~~~

The ``is`` operator checks at runtime
whether the value of its left-hand argument
has the type specified by its right-hand argument
or one of its subtypes.
If so, it returns ``true``; otherwise, it returns ``false``.

.. docnote::
   Why is a trivially true/false "is" check a compile error? [...]

        if "hello" is String { println("it is") }

   Gives the error 'is' test is always true

        if "hello" is Int { println("it is") }

   Gives the error expression does not type-check

Literal Expression
~~~~~~~~~~~~~~~~~~

A :newTerm:`literal expression` consists of
either an ordinary literal (such as a string or a number),
an array literal,
a dictionary literal,
or one of the following special literals:

================    ======  ===============================================
Literal             Type    Value
================    ======  ===============================================
``__FILE__``        String  The name of the file in which it appears
``__LINE__``        Int     The line number on which it appears
``__COLUMN__``      Int     The column number in which it begins
``__FUNCTION__``    String  The name of the declaration in which it appears
================    ======  ===============================================

Inside a function,
the value of ``__FUNCTION__`` is the name of that function,
inside a method it is the name of that method,
inside a property getter or setter it is the name of that property,
inside special members like ``init`` or ``subscript`` it is the name of that keyword,
and at the top level of a file it is the name of the current module.

.. docnote::
   Should all of these meanings of __FUNCTION__ be documented,
   or are some of them "internal use only" hacks?

:newTerm:`Array literals` represent an ordered collection,
made up of items of the same type.
It has the following form:

.. syntax-outline::

   [<#value1#>, <#value2#>, <#...#>]

The last expression in the array can be followed by an optional comma.
The value of an array literal has type ``T[]``,
where ``T`` is the type of the expressions inside it.

.. docnote::
   Is T[] always going to be a synonym for Array < T > ?
   Currently, the REPL uses the former for array literals,
   but the latter matches what is used for dictionary literals.
   Is there a reason to prefer one over the other in the docs?
   Using Array < T > gives better parallelism.

.. Alex, I'm not sure what you're asking here?
    What does "the latter matches what is used for dictionary literals" mean?
    In the sentence you wrote "the latter" refers to "Array<T>", right?

.. Spaces around <T> above to prevent it being read as an HTML tag by Sphinx.


Dot Expression
~~~~~~~~~~~~~~

A :newTerm:`dot expression` allows access
to the members of a class, structure, enumerator, or module.
It consists of a period (``.``) between the item
and the identifier of its member.

.. docnote::
   Is this list exhaustive?  Or are there other things that can use dots?

Forced Expression
~~~~~~~~~~~~~~~~~

A :newTerm:`forced expression` unwraps an Optional value.
It has the following form:

.. syntax-outline::

   <#expression#>!

The *expression* must be of an optional type.
If its value is not ``.None``,
the optional value is unwrapped
and returned with the corresponding non-optional type.
Otherwise, a runtime error is raised.

.. docnote::
   What is the nature of the error?


Declarations
------------

Module Scope
~~~~~~~~~~~~

.. write-me:: Need to get the TR below answered to write more about this.

The :newTerm:`module scope` defines the top-level (global) scope of a Swift source file.
It consists of a series of statements, which include declarations,
expressions, and other kinds of statements.

Variables, constants, and other named declarations that are declared at global scope
are visible to any other code in the same file.

.. docnote::
    What exactly is "module scope"?
    Is it the scope of a *single* Swift source file?
    The way it's currently written here
    makes it seem like module scope is the same as the scope
    of a single Swift source file.
    I don't think this is correct, but I'm unsure of what we should
    document here.
    The current LangRef doesn't say much and includes the grammar:
    top-level ::= brace-item*

Code Blocks
~~~~~~~~~~~

A :newTerm:`code block` is used by a variety of declarations and control structures
to group statements together.
It has the following form:

.. syntax-outline::

    {
        <#statements#>
    }

The *statements* inside a code block include declarations,
expressions, and other kinds of statements and are executed in order
of their appearance in source code.

.. docnote:: What exactly are the scope rules for Swift and where should
    we document them? I assume a code block creates a new scope?

Constant Declaration
~~~~~~~~~~~~~~~~~~~~

.. syntax-grammar::

    Grammar of a constant declaration

    constant-declaration --> attribute-list-OPT constant-specifier-OPT ``let`` pattern-initializer-list
    constant-specifier -->  ``static`` | ``class``

    pattern-initializer-list --> pattern-initializer | pattern-initializer ``,`` pattern-initializer-list
    pattern-initializer --> pattern initializer-OPT
    initializer --> ``=`` expression

.. docnote:: We need to come up with a better name than "constant-specifier",
    because otherwise we have lots of different names for the same choice
    (e.g., constant-specifier, variable-specifier, function-specifier).
    Maybe "type-level-specifier"? But what happens when we do get *real* static functions?


Typealias Declaration
~~~~~~~~~~~~~~~~~~~~~

.. syntax-grammar::

    Grammar of a typealias declaration

    typealias-declaration --> typealias-head typealias-assignment
    typealias-head --> ``typealias`` typealias-name
    typealias-name --> identifier
    typealias-assignment --> ``=`` type

.. docnote:: Are type aliases allowed to contain a type-inheritance-clause?
    Currently, this doesn't work, and it seems as though it shouldn't work.
    Doesn't it only make sense to specify protocol conformance requirements
    in the context of an associated type (declared as protocol member)?
    I modified the grammar under the assumption that they are not allowed.

Enumeration Declaration
~~~~~~~~~~~~~~~~~~~~~~~

.. docnote::
    What should we call the enumeration members? Traditionally, they're called
    "enumerators", but it may possibly be confusing that in Cocoa / ObjC
    land, the term "enumerator" is used to refer to an instance of the NSEnumerator class.

Protocol Associated Type Declaration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. docnote::
    What are associated types? What are they "associated" with? Is "Self"
    an implicit associated type of every protocol? [...]

    Here's an initial stab:
    An Associated Type is associated with an implementation of that protocol.
    The protocol declares it, and is defined as part of the protocol's implementation.

    "The ``Self`` type allows you to refer to the eventual type of ``self``
    (where ``self`` is the type that conforms to the protocol).
    In addition to ``Self``, a protocol's operations often need to refer to types
    that are related to the type of ``Self``, such as a type of data stored in a
    collection or the node and edge types of a graph." Is this still true?


.. syntax-grammar::

    Grammar of a protocol associated type declaration

    protocol-associated-type-declaration --> typealias-head type-inheritance-clause-OPT typealias-assignment-OPT


Extension Declaration
~~~~~~~~~~~~~~~~~~~~~

Extension declarations can contain initializer declarations. That said,
if the type you're extending is defined in another module,
an initializer declaration must delegate to an initializer already defined in that module
to ensure members of that type are properly initialized.

.. docnote::
    Is this correct?

Operator Declaration
~~~~~~~~~~~~~~~~~~~~

Prefix operators declarations don't specify a precedence level.
Prefix operators are nonassociative.

.. docnote::
    Do all prefix operators default to the same precedence level? If so, what is it?
    Same question for postfix operators.

.. docnote:: More generally, what do the current precedence levels (0--255) mean?
    How should we discuss them in the prose? [...]

    The current LangRef says:
    "Swift has simplified precedence levels when compared with C.
    From highest to lowest:

    * "exponentiative:" <<, >>  (associativity none, precedence 160)
    * "multiplicative:" *, /, %, & (associativity left, precedence 150)
    * "additive:" +, -, |, ^ (associativity left, precedence 140)
    * "comparative:" ==, !=, <, <=, >=, > (associativity none, precedence 130)
    * "conjunctive:" && (associativity left, precedence 120)
    * "disjunctive:" || (associativity none, precedence 110)"

    Also, from Policy.swift:

    * "compound (assignment):" *=, /=, %=, +=, -=, <<=, >>=, &=, ^=,
      |=, &&=, ||= (associativity right, precedence 90)
    * "=" is hardcoded as if it had associativity right, precedence 90
    * "as" and "is" are hardcoded as if they had associativity none, precedence 95
    * "? :" is hardcoded as if it had associativity right, precedence 100

    **Should we be using these instead of the raw precedence level values?**

.. docnote::
    Should we give describe the most common stdlib operators somewhere?
    If so, the description should include the fixity, precedence, and associativity
    of each operator. Maybe a table would be best?
    The Langauge Guide currently says:
    "(A complete list of the default Swift operator precedence and associativity
    settings can be found in the :doc:`../ReferenceManual/index`.)"
    Aside: I'm not sure "settings" is the best word here. Maybe "values"?

.. syntax-grammar::

    Grammar of an operator declaration

    operator-declaration --> prefix-operator-declaration | postfix-operator-declaration | infix-operator-declaration

    prefix-operator-declaration --> ``operator`` ``prefix`` operator ``{`` ``}``
    postfix-operator-declaration --> ``operator`` ``postfix`` operator ``{`` ``}``
    infix-operator-declaration --> ``operator`` ``infix`` operator ``{`` infix-operator-attributes-OPT ``}``

    infix-operator-attributes --> precedence-clause-OPT associativity-clause-OPT
    precedence-clause --> ``precedence`` precedence-level
    precedence-level --> 0 through 255
    associativity-clause --> ``associativity`` associativity
    associativity --> ``left`` | ``right`` | ``none``

.. docnote:: I added this grammar from looking at ParseDecl.cpp and from trying
    out various permutations in the REPL. Is this the correct grammar?

Attributes
----------

.. syntax-grammar::

    Grammar of an attribute list

    attribute-list --> ``@`` attribute | ``@`` attribute attribute-list
    attribute --> declaration-attribute | type-attribute | interface-builder-attribute

.. syntax-grammar::

    Grammar of a declaration attribute

    declaration-attribute --> ``assignment`` | ``class_protocol`` | ``infix`` | ``mutating`` | ``objc`` | ``optional`` | ``override`` | ``postfix`` | ``prefix`` | ``required`` | ``unowned`` | ``weak``

.. syntax-grammar::

    Grammar of a type attribute

    type-attribute --> ``unchecked``

.. syntax-grammar::

    Grammar of an interface builder attribute

    interface-builder-attribute -->  ``IBAction`` | ``IBDesignable`` | ``IBInspectable`` | ``IBOutlet``


.. docnote:: We need to update the grammar to accomodate things like @objc(:some:selector:).
    What should the new grammar look like (also taking into account ``!`` inverted attributes)?
    What should we call the "arguments" that attributes take? ("options"?)

.. docnote:: Let's revisit which attributes we should document, now that more have
    been added and some have been removed. I'm copying the current Attr.def file below.

**Type attributes:**

* TYPE_ATTR(auto_closure)
* TYPE_ATTR(cc)
* TYPE_ATTR(noreturn)
* TYPE_ATTR(objc_block)
* TYPE_ATTR(thin)
* TYPE_ATTR(thick)
* TYPE_ATTR(unchecked)

**Schema for DECL_ATTR:**
// - Attribute name. - Options for the attribute,
including the declarations the attribute can appear, and whether duplicates are allowed.

* DECL_ATTR(asmname, OnFunc|OnConstructor|OnDestructor)
* DECL_ATTR(availability, OnFunc | OnStruct | OnEnum | OnClass | OnProtocol | OnVar | OnConstructor | OnDestructor | AllowMultipleAttributes)
* DECL_ATTR(objc, OnFunc | OnClass | OnProtocol | OnVar | OnSubscript | OnConstructor | OnDestructor)

* ATTR(assignment)
* ATTR(class_protocol)
* ATTR(conversion)
* ATTR(exported)
* ATTR(infix)
* ATTR(mutating)
* ATTR(noreturn)
* ATTR(prefix)
* ATTR(postfix)
* ATTR(optional)
* ATTR(override)
* ATTR(required)
* ATTR(transparent)
* ATTR(unowned)
* ATTR(weak)
* ATTR(requires_stored_property_inits)

* IB_ATTR(IBOutlet)
* IB_ATTR(IBAction)
* IB_ATTR(IBDesignable)
* IB_ATTR(IBInspectable)

// "Virtual" attributes can not be spelled in the source code.

* VIRTUAL_ATTR(raw_doc_comment)

.. docnote::
    It seems odd that ``mutating`` is a context sensitive keyword AND an attribute.
    This raises the question about how to describe what attributes *are*.
    Similarly for ``weak`` and ``unowned``.
    What's the story here?

Patterns
--------

.. docnote::
    What kind of information do we want to cover about patterns in general?
    How up to date is pattern grammar in the LangRef?
    There is an 'is' pattern; what about an 'as' pattern?

