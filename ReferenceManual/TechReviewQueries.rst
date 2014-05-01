Technical Review Queries --- 5/1/14
===================================

1. Named tuples elements.
   When are the restrictions going to land?
   Where does this affect the grammar?

   We will allow them with the restriction that you can't have default values or variadics,
   and a named tuple can't have only one element (like a non-named tuple).
   Should land early next week.

   Shows up in the grammar in tuple patterns and tuple types.
   Tuple types still need to have the varargs stuff in them
   because they're used in function types.
   The tuple patterns aren't used in anything related to functions
   so they don't need those things.

   What about parenthesized expressions?
   Those don't have any of the problematic stuff ---
   it's just a tuple expression.
   You can put labels or not and varariadics/default values don't make sense there.

2. Tuple patterns in closure signatures.
   Currently, the signature of a closure uses a tuple pattern.
   Is that just left-over behavior, now that function signatures no longer
   use tuple patterns?

   The grammar shouldn't be --- it should be a single parameter clause.
   Might not have been updated in the ParseFoo.cpp comments.
   There's two cases:
   a comma separated list of identifiers with no type annotations
   or a parameter clause which starts with an open paren
   and looks exactly the same as a function signature.
   A list of identifiers with parens and no type annotations
   is allowed because it's a subset of the function signature grammar.

   Don't mention the restriction that Dave Addey calls out
   because it's expected to go away.

   You have to put a type annotation if you use inout.

3. Is the grammar for function, initializer, and subscript declarations settled now?
   Doug, are you going to rewrite the grammar now that it's changed again (e.g, backticks)?

   Yes.
   The differences between def and func are just the default behavior --
   there's no difference in syntax.
   In protocols, you would use def and not func
   because they're always methods.
   The only place you would use func for in a type context is a operator.

4. .self, .dynamicSelf, .Type, .Protocol. Need a description of each of these and where
   they should appear in the grammar. What about just plain 'self'?

   .Type is a type
   The static metatype of the type.
   You use it in a type context,
   like a return type or a type annotation or generic arguments.
   
   .Protocol is a type
   This is fun...  or at least "bloody fucking complicated".

   protocol P {}
   var p: P = ...
   var pm = p.dynamicType // a value of type P.Type

   There's two meanings this could have,
   one of which makes sense,
   but both are useful in different contexts.
   P is storing something of unknown runtime type
   (an existential type).
   There exists a type T such that T conforms to P.

   Et.t:p (t.type) <-- we write this P.type
   (Et.t:P t).Type <-- we write this P.Protocol

   The second one is super rare,
   it only comes up in things like NSStringFromProtocol.
   The main value is that it maps down to Obj-C protocols,
   which for example XPC uses to figure out what to ship across the wire.

   This is a low priority.
   In the compiler, this was John's first priority,
   but it got queued up behind Core Foundation bridging.

   .self is an expression
   
   .dynamicSelf are expressions
   Think of it as a "typeof" operator.
   In Obj-C it's someObject.class ---
   it returns the runtime/dynamic type as a metatype.
   The value of the expression in the metatype
   of the object you have.
   The runtime type can be a subclass of the static type.

   class A {}
   class B: A{}
   func f (a: A) {
      // Comments are the value of each expression.
      a.self            // a
      let adt: A.Type = a.dynamicType   // B.Type
      let at = A.self   // A.Type
      at.self           // A.Type (not A.Type.Type -- it's not turtles all the way down)
   }
   let b = B()
   func(b)

   plain self is a primary expression

   super can be treated as a primary expression,
   but you need prose description of when it works ---
   you can't use bare 'super'.
   What we have (the three cases that work) is correct.

5. As a follow on to .Type, what information should we include in the section
   on Metatype Types?

   Provides the runtime type.
   Often used for reflection.
   Right now, all we have for reflection is mirrors,
   which isn't that interesting to write about.
   The primary purpose is to do static methods
   and to call initializers on them.

5. Tuple type. Let's walk through the grammar here to make sure it's correct.

   The ...-OPT is still there because it's used as part of a function type.
   We no longer have inout as an attribute,
   it's a context sensitive keyword.

   typle-type-element --> attributes-OPT ``inout``-OPT type | ``inout``-OPT element-name type-annotation

   Yes, it's part of the type of the function.

6. Function type. Again, lets walk through the grammar to make sure it's correct.

   Yes, correct.

7. Array type. Walk through grammar and semantics.
   
   Grammar is ok as is.

   Now that array has gone through this level of rewrite,
   the reverence/value semantics discussion
   moves over to the standard library (aka Dave).
   The important thing in the context of reference is just
   that it's a sugar for the longer name.

8. New section on Implicitly Unwrapped Optional type. How would you describe this type?

   It's an optional type that implicitly unwraps
   whenever you perform an operation on it.

9. Capture lists. When will this land? What is grammar and where should it go?

   Because this is a super high value feature,
   it's likely to get implemented in the next week.
   [Contributor 7746] cares about this a lot ---
   it's one of those things where we can say "we've solved the weak self problem"
   and things are more awesome in Swift.

10. What are the semantics for 'unowned', 'unowned(safe)', and 'unowned(unsafe)'?

   When capture lists gets implemented,
   these become context sensitive keywords.
   The grammar should be a comma separated list in square brackets of capture elements.
   A capture element is either "weak <identifier>" or "unowned <identifier>"
   or a safe/unsafe version of that.
   You can write either unowned(safe) or unowned(unsafe)
   because the default depends on a compiler flag.

   With weak, your value is always an optional.
   You'll find out that it's nil because you're handling it as an optional.
   With unowned, it's not an optional ---
   if you use the safe version, you'll find out because the app terminates;
   if you use the unsafe version, it's like a "unsafe unretained" in Obj-C
   and who known what will happen.

   The other things that we plan to have in there
   like "identifier = expression" are future work.
   And maybe even just "identifier" to say that you want to capture it
   and use the default (strong)
   which lets us give you a compiler warning
   if you capture something but don't list it in the [] list.

11. Where's the best place to put the grammar for labeled statements?
    
    They can only go before loops and switches.
    It should be part of the production rules for
    those statements that can have a label before them.

    We need to discuss case and line breaks for this.
    No immediate objections to what Dave wrote.

12. Doug, did you finish writing your paper on initialization?
    Relatedly, are we going to get default memberwise initialization for classes for WWDC?
    If so, when?

    Nope.  At this point, the guide is the canonical reference.

13. How important is it to document the stuff for build configurations?
    Where should it go / what's the grammar look like?

    Things like #if.

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



