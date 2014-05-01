Technical Review Queries --- 5/1/14
===================================

1. Named tuples elements.
   When are the restrictions going to land?
   Where does this affect the grammar?

2. Tuple patterns in closure signatures.
   Currently, the signature of a closure uses a tuple pattern.
   Is that just left-over behavior, now that function signatures no longer
   use tuple patterns?

3. Is the grammar for function, initializer, and subscript declarations settled now?
   Doug, are you going to rewrite the grammar now that it's changed again (e.g, backticks)?

4. .self, .dynamicSelf, .Type, .Protocol. Need a description of each of these and where
   they should appear in the grammar. What about just plain 'self'?

5. As a follow on to .Type, what information should we include in the section
   on Metatype Types?

5. Tuple type. Let's walk through the grammar here to make sure it's correct.

6. Function type. Again, lets walk through the grammar to make sure it's correct.

7. Array type. Walk through grammar and semantics.

8. New section on Implicitly Unwrapped Optional type. How would you describe this type?

9. Capture lists. When will this land? What is grammar and where should it go?

10. What are the semantics for 'unowned', 'unowned(safe)', and 'unowned(unsafe)'?

11. Where's the best place to put the grammar for labeled statements?

12. Doug, did you finish writing your paper on initialization?
    Relatedly, are we going to get default memberwise initialization for classes for WWDC?
    If so, when?

13. How important is it to document the stuff for build configurations?
    Where should it go / what's the grammar look like?

From exiting TRs:

Lexical Structure
-----------------

Textual Literals
~~~~~~~~~~~~~~~~

Special characters
can be included in character and string literals
using the following escape sequences:

* Null Character (``\0``)
* Backslash (``\\``)
* Horizontal Tab (``\t``)
* Line Feed (``\n``)
* Carriage Return (``\r``)
* Double Quote (``\"``)
* Single Quote (``\'``)

.. TR: Are \v and \f allowed for vertical tab and formfeed?
   We allow them as whitespace as of now --
   should that mean we want escape sequences for them too?

.. TR: When will we know for sure whether we're keeping or dropping single quotes
    for Character literals?

Expressions
-----------

Explicit Member Expression
~~~~~~~~~~~~~~~~~~~~~~~~~~

A :newTerm:`explicit member expression` allows access
to the members of a named type, a tuple, or a module.
It consists of a period (``.``) between the item
and the identifier of its member.

.. syntax-outline::

   <#expression#>.<#member name#>

The members of a named type are named
as part of the type's declaration or extension.
For example: ::

    class C { var x }
    var c = C()
    let y = c.x  // Member access

The members of a tuple
are implictly named using integers in the order they appear,
starting from zero.
For example: ::

    var t = (10, 20, 30)
    t.0 = t.1
    // Now t is (20, 20, 30)

The members of a module access
the top-level declarations of that module.

.. TR: Confirm?


Forced Expression
~~~~~~~~~~~~~~~~~

A :newTerm:`forced expression` unwraps an optional value
that you are certain is not ``nil``.
It has the following form:

.. syntax-outline::

   <#expression#>!

If the *expression* is of an optional type
and its value is not ``nil``,
the optional value is unwrapped
and returned with the corresponding non-optional type.
If its value is ``nil``, a runtime error is raised.

.. TR: In previous review, we noted that this also does downcast,
   but that doesn't match the REPL's behavior as of swift-600.0.23.1.11
    class A {}
    class B: A {}
    let l: Array<A> = [B(), A(), A()]
    var item: B = l[0] !        // Doesn't parse -- waiting for more expression
    var item: B = l[0]!         // Doesn't typecheck
    var item = l[0] as B!       // Ok

.. Alex, should we rename this expression to more closely align with the
    "unwrapping" terminology we're using around the "!" operator?


Prefix Expressions
------------------

:newTerm:`Prefix expressions` are formed by combining
an optional prefix operator with an expression.
Prefix operators take one argument,
the expression that follows them.

.. TR: Does it make sense to call out the left-to-right grouping?


Primary Expressions
-------------------

:newTerm:`Primary expression`
are the most basic kind of expression.
They can be used as expressions on their own,
and they can be combined with other tokens
such as operators, prefixes, and postfixes,
to make more complex expressions.

.. syntax-grammar::

    Grammar of a primary expression

    primary-expression --> identifier generic-argument-clause-OPT
    primary-expression --> literal-expression
    primary-expression --> superclass-expression
    primary-expression --> closure-expression
    primary-expression --> anonymous-closure-argument
    primary-expression --> parenthesized-expression
    primary-expression --> implicit-member-expression
    primary-expression --> wildcard-expression

.. NOTE: One reason for breaking primary expressions out of postfix
   expressions is for exposition -- it makes it easier to organize the
   prose surrounding the production rules.

.. TR: Is a generic argument clause allowed
   after an identifier in expression context?
   It seems like that should only occur when an identifier
   is a *type* identifier.


Superclass Expression
~~~~~~~~~~~~~~~~~~~~~

A :newTerm:`superclass expression` lets a class
interact with its superclass.
It has one of the following forms:

.. syntax-outline::

    super.<#member name#>
    super[<#subscript index#>]
    super.init(<#initializer arguments#>)

The first form is understood as a member of the superclass.
This allows a subclass to call the superclass's
implementation of a method that it overrides,
to get and set propertiess defined by its superclass,
and to access its superclass's implementation of getters and setters.

.. TR: Confirm the above about properties.


Attributes
----------

:newTerm:`Attributes` provide more information about a declaration or type.
There are two kinds of attributes in Swift, those that apply to declarations
and those that apply to types.
For instance, the ``required`` attribute is applied to a designated or convenience initializer
declaration of a class to indicate that every subclass must implement that initializer.
The ``noreturn`` attribute is applied to a function or method type to indicate that
the function or method doesn't return to its caller.

Attributes are specified by writing the ``@`` symbol followed by the attribute's name
and any arguments that the attribute accepts:

.. syntax-outline::

    @<#attribute name#>
    @<#attribute name#>(<#attribute arguments#>)

Some declaration attributes accept arguments that specify more information about the attribute
and how it applies to a particular declaration. These *attribute arguments* are enclosed
in parentheses and their format is defined by the attribute they belong to.

.. TR: Which attributes are inheritable and which attribute imply other attributes?


.. TR: Our editor, Jeanne, wants to recast the first sentence of the Attributes chapter to:
    "Attributes add metadata to two Swift constructs: declarations and types.
    This metadata gives extra information that extends the behavior of a class, function,
    or method type."

    This doesn't seem quite right to me; is it?


Type Attributes
~~~~~~~~~~~~~~~

``noreturn``
    The ``noreturn`` attribute is applied to the type of a function or method
    to indicate that the function or method doesn't return to its caller.
    You can also mark a function or method declaration with this attribute to indicate that
    the corresponding type of that function or method, ``T``, is ``@noreturn T``.

.. TR: Need some more info on this attribute. Is the above correct? What else should we
    document here? How about some actual examples?



