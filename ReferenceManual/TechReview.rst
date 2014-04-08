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

.. A bit of handwaving is good here.  Just call out the exceptions at the point
   where they appear later.

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

.. They are treated as whitespace.

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

.. Fine as is.  They're happy to follow the trail blazed by other languages.
   We will look into how Ruby and Java handle trailing underscores here and
   follow up.
   TODO: Do some research

.. docnote::
    Why are negative integer literals treated (grammatically)
    asymmetrically to negative floating-point literals.
    From [Contributor 7746]'s radar:
    rdar://problem/15181997 Teach the compiler about a concept of negative integer literals.

..  If you're doing an enum case, we want you to be able to do -3 as an Integer
    value.  The answer to the assymetry is that floating point literals should
    also allow a leading negative sign.  Integers are a little bit special
    because they show up in the compile stuff.
    TODO: File a bug

    This is a parser hack, not a lexer hack. In the surface grammar, we can ignore it.

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

.. This complexity is intentional.


Textual Literals
~~~~~~~~~~~~~~~~

Character literals are of type of ``UnicodeScalar``.
String literals are of type ``String``.

.. docnote::
   Is UnicodeScalar the final name for that type?

.. We will have this as a single Unicode char, as well as Char which will be a
   single Unicode grapheme cluster.  Watch for changes around this and the
   single/double quotes grammar coming after WWDC.  For now, it might be best
   to just not document the single quoted character literal, because we know
   that it's going to change.  If we can't make it work right, it's possible we
   would just delete single quoted strings.  Right now, iterating over a String
   returns a sequence of UnicodeScalar values.  In the fullness of time, it
   should return a sequence of Char values.
   TODO: Scrub out UnicodeScalar literals from the docs.
   TODO: File a bug asking for them to do the equivalent change

.. docnote::
   Is there any context where string/double-quoted literals
   become implicitly null-terminated?
   That is, is their type always String or could it be char* or NSString?

.. There's some encoding stuff going on here -- a String type can opt into one
   of several protocols depending on what encoding it wants to use.  We have
   UTF-8, UTF-16 (default) and ASCII.  So you explicitly say what encoding the
   string literal takes.
   We don't document this.
   The type is always String -- there's some bridging and interop going on, but
   that doesn't effect the type of the string literal.

.. docnote::
    Are we considering the Boolean values ``true`` and ``false``
    as literals (in the lexical structure sense). Where should we include
    these in the grammar? What about ``nil``?

.. Those are library-defined constants, not keywords.  They don't appear in the
   grammar.  We will call them what they are -- they're not keywords.  We would
   prefer that the documentation use nil instead of .None -- it works in more
   contexts than just Optional, such as unchecked optionals.  When you're
   working with optionals you don't have to know the implementation of
   Optional<T> to know that you need to use nil.
   TODO: Scrub for .None and change it to nil.

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

.. Dot is weird.  Otherwise, fine as is.

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

.. Fine.

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

.. Once the parser sees a < it goes into a pre-scanning lookahead mode.  It
   matches < and > and looks at what token comes after the > -- if it's a . or
   a ( it treats the <...> as a generic parameter list, otherwise it treats
   them as less than and greater than.

   This fails to parse things like x<<2>>(1+2) but it's the same as C#.  So
   don't write that.

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

.. We currently allow anything that Unicode classifies as a symbol (including
   snowman with fez) but for now we only document these normal things.
   For now, we leave this as an undocumented feature of the compiler.
   In the general case, we want to add other operators and maybe Apple-reserved
   operators for SPI, but we can't even have a meaningful conversation withthe
   community for a good two years.

.. docnote::
   LangRef doesn't list ? as either a character that you can use in an operator
   or as reserved punctuation.
   Is this correct?

.. The ? is a reserved punctuation.  Optional-chaining (foo?.bar) is actually a
   monad -- the ? is actually a monadic bind operator.  It is like a burrito.

Types
-----

.. docnote::
    What is the new story for "metatype types"?
    What are we going to call them?
    Do we have the syntax/grammar locked down?

.. Even after the syntactic change, we still have been calling them
   "metatypes".  It seems like an OK term.  Let's just keep the title and say
   that the way you get a metatype type is by writing ".type".  That's the
   standard naming -- in OO we talk about metaclasses -- so there's good reason
   to describe them this way.

.. docnote::
    How close are Arrays from being locked down?
    What should this section of the RefMan look like?

.. We're getting pretty close.  Dave's still working on it and keeps claiming
   it will be tomorrow.  Really all we have to document is that there's a sugar
   for array types and show people how multiple sets of array brackets work
   (for multi-dimensional arrays) -- and bounce them over to the Standard
   Library Reference for the details.

.. docnote::
    What do function types look like now (after the unification proposal)?
    Are they still based on tuple types?

.. The grammar for a function type should be "type -> type" without any
   parens or labels.  For WWDC and likely 1.0, tuples will keep their labels.
   The bit still in flux is the declaration syntax for functions.

   Note: Our endgame and where we are now are different.

   Both of these are valid tuple types:
   Int -> Int
   (a : Int) -> Int

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

.. At one point, Self was an associated type, but that's the wrong modeling of
   the problem.  Self is the stand-in type for the thing that conforms to the
   protocol.  It's weird to think of it as an associated type because it's the
   primary thing.  It's certainly not an associated type.  In many ways, you
   can think of associated types as being parameters that get filled in by the
   conformance ofa specific concrete type to that protocol.

   There's a substitution mapping here.  The parameters are associated with
   self because they're derived from Self.  When you have a concrete type that
   conforms to a protocol, it supplies concrete types for Self and all the
   associated types.

   The associated types like parameters, but they're associated with Self in
   the protocol.  Self is the eventual type of the thing that conforms to the
   protocol -- you have to have a name for it so you can do things with it.

   We use "associated" in contrast with generic parameters in interfaces in C#.
   The interesting thing there is that they don't have a name like Self for the
   actual type, but you can name any of these independant types.    In theory,
   they're often independent but in practice they're often not -- you have an
   interface parameterized on T, where all the uses of the thing are that T is
   the same is Self.  Instead of having these independant parameters to an
   interface, we have a named thing (Self) and all these other things that hand
   off of it.

   Here's a stupid simple way to see the distinction:

   C#:

       interface Sequence <Element> {}

       class String : Sequence <UnicodeScalar>
       class String : Sequence <GraphemeCluster>

   These are both fine in C#

   Swift:

       protocol Sequence { typealias Element }

       class String : Sequence { typealias Element = ... }

   Here you have to pick one or the other -- you can't have both.

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

.. The grammar should be @ <attribute> ( <optional arguments> )
   Other languages have specific grammar production rules for specific
   attributes, specifying the syntax of them, in addition do the description of
   what they mean.

   Instead of pulling all the known attributesin the grammar, have a general
   production rule.  From the parsing perspective, the attribute name doesn't
   effect the parser.  The grammar is regular enough that even if we don't know
   what to do with an attribute, we can still parse it.
   It's likely that someday we will allow user-defined attributes.

   The structure of what's inside the parens is always going to be special.
   Essentially, the attribute defines its own grammar for what goes in its
   parens.  The stuff in parens should just be (gramatically) a balanced token
   sequence.

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

.. Override is going to become a keyword.  (Not known if it will be context
   sensitive.)  The other operator stuff will probably become keywords too.

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

.. We should just make nonmutating a keyword, to match the keyword mutating.
   Then both @mutating and @!mutating should be removed.
   TODO: Follow up and/or file a bug for this.

.. TODO: Revisit this and figure out which things we need to document.

.. In addition to @!mutating we may eventually have @!objc which means don't
   expose to Obj-C.  We could handle this as an attribute named !objc.

Patterns
--------

.. docnote::
    What kind of information do we want to cover about patterns in general?

.. Patterns might be getting a little simpler since they are not being used for
   functions.  For now, it's ok to not have a discussion of pattern matching as
   a topic -- let's just talk about how awesome switch statements are.  The
   people who come from functional backgrounds will see the pattern matching
   here just like they will see the monads in optional chaining.
   Joe Groff is the pattern guru -- he designed this stuff and implemented
   the crazy switch.

.. docnote::
    How would you describe what pattern matching is?
    How about something like this as a start:
    Pattern matching is a combination of conditional branching and value binding.


.. docnote::
    Here's a list of where patterns are most commonly used.
    Can you think of other examples? [...]

    * the cases of a ``switch`` statement (patterns can be *guarded* using a guard expression)
        * unwrapping/extracting associated values from an enum case
        * type checking using an ``is`` pattern
    * Variable and constant declarations/bindings
        * if-let/var conditional bindings
        * tuple decomposition (unwrapping)
        * iteration within a ``for``-``in`` statement

    Do we/will we support regex pattern matching?


.. docnote::
    How can you unwrap (access) an enum case with an associated value
    besides using a ``switch`` statement?

.. docnote::
    You can nest patterns to an arbitrary depth (i.e., patterns can contain subpatterns).
    Is this true?

.. docnote::
    How important are the concepts of "irrefutable" and "refutable" to expose to readers,
    even if we don't use those terms explicitly? [...]

    Is this the right way to understand them?:
    Refutable patterns can fail to match a value; irrefutable patterns never fail to match.
    A pattern is irrefutable if and only if every one of its subpatterns are irrefutable.
    Pattern matching thus can fail or succeed. Is there any other possible result from
    pattern matching? For instance, pattern matching in Haskell can also "diverge".

.. docnote::
    Is it true that patterns always appear on the left-hand side on an assignment? [...]

    ``var a = 1`` (``a`` is a pattern); ``var b = a`` (``b`` is a pattern, ``a`` is an expression).


.. docnote::
    How up to date is the top-level pattern grammar in the LangRef?
    For instance, there is an 'is' pattern but no 'as' pattern.

.. docnote::
    We removed the syntactic category "pattern-typed" and "pattern-atom".
    Also changed "pattern-var" to "value-pattern" now that it covers "let" and "var".
    Are these changes ok? Here's the original LangRef grammar for comparison: [...]

    * pattern-atom ::= pattern-var
    * pattern-atom ::= pattern-any
    * pattern-atom ::= pattern-tuple
    * pattern-atom ::= pattern-is
    * pattern-atom ::= pattern-enum-element
    * pattern-atom ::= expr
    * pattern      ::= pattern-atom
    * pattern      ::= pattern-typed
    * pattern-typed ::= pattern-atom ':' type-annotation


.. syntax-grammar::

    Grammar of a pattern

    pattern --> wildcard-pattern
    pattern --> is-pattern
    pattern --> value-pattern type-annotation-OPT
    pattern --> expression-pattern type-annotation-OPT
    pattern --> enumerator-pattern
    pattern --> tuple-pattern type-annotation-OPT


Wildcard Pattern
~~~~~~~~~~~~~~~~

.. docnote::
    Any objection to renaming 'any' pattern to 'wildcard' pattern?

A :newTerm:`wildcard pattern` matches and ignores any value and consists of an underscore
``_``. Use a wildcard pattern in situations where you don't care about the values being
matched against. For example, the following code iterates through the closed range ``0..3``,
ignoring the current value of range on each iteration of the loop::

    for _ in 0...3 {
        // Do something three times.
    }

.. syntax-grammar::

    Grammar of a wildcard pattern

    wildcard-pattern --> ``_``


.. _Patterns_ExpressionPattern:

Expression Pattern
~~~~~~~~~~~~~~~~~~

.. docnote::
    What are the restrictions on expression patterns? [...]

    Here are some examples that we expected to work but didn't:

    ::

        for (_, 1) in points {}
        <REPL Input>:1:9: error: expected pattern
        for (_, 1) in points {}
                ^
        <REPL Input>:1:9: error: expected ',' separator
        for (_, 1) in points {}
                ^

    Can't match against ``nil``:

    ::

        var opt : Int? = nil
        // opt : Int? = <unprintable value>

        switch opt {
            case nil: ()
            default: ()
        }
        <REPL Input>:2:6: error: expression does not type-check
        case nil: ()
            ^~~

    But, this works:

    ::

        var opt1 : Int? = .None
        // opt1 : Int? = <unprintable value>

        switch opt1 {
            case .None: println("None")
            case _: ()
        }
        None

    Can't match an array literal in a switch statement:

    ::

        let arr = [1,2,3]
        // arr : Int[] = [1, 2, 3]

        switch arr {
            case [1,2,3]:
            println("Yep!")
            case _: ()
        }
        <REPL Input>:2:6: error: expression does not type-check
        case [1,2,3]:
            ^~~~~~~

    Initially, we though this is because we don't have an array-literal-pattern in the grammar.
    However, [1,2,3] is an expression (array-expression), so shouldn't this work?
    For instance, this works:

    ::

        let a = 2
        // a : Int = 2

        switch 5 {
            case a + 3:
                println("Matched")
            default: ()
        }
        Matched

    (``a + 3`` is an expression.)


.. syntax-grammar::

    Grammar of an expression pattern

    expression-pattern --> expression


.. _Patterns_EnumeratorPattern:

Enumerator Pattern
~~~~~~~~~~~~~~~~~~

.. docnote::
    Is the grammar still correct?

.. langref-grammar

    pattern-enum-element ::= type-identifier? '.' identifier pattern-tuple?

.. syntax-grammar::

    Grammar of an enumerator pattern

    enumerator-pattern --> type-identifier-OPT ``.`` identifier tuple-pattern-OPT


.. _Patterns_TuplePattern:

Tuple Pattern
~~~~~~~~~~~~~

.. docnote::
    Is the grammar still correct? [...]

    Presumably, with the new function declaration syntax coming,
    tuple patterns will no longer need to support default arguments.
    Therefore, we should remove the 'pattern-initializer' alternative
    from the tuple-pattern-element production rule, correct?

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
    tuple-patterns --> tuple-pattern tuple-patterns-OPT


Other Topics
------------

inout, var, etc. in function declaration grammar:

Skeleton::

    function-declaration --> 'func' identifier '(' param-list? ')' ...

param-list::

    param-list --> parameter-modifiers? identifier? identifier? ':' type '=' expr?

...

It will not depend on patterns in any way -- right now it's a lie that it depends on patterns.
Doug will be writing up a grammar for this.

The selector style function declaration and call syntax is going away.  We will
have one syntax for selector and normal functions. The curried bit will stay --
you can just have multiple sets of paraenthesized parameter lists.
