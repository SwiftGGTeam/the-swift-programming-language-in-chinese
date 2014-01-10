Statements
==========

.. langref-grammar

    stmt ::= stmt-semicolon
    stmt ::= stmt-if
    stmt ::= stmt-while
    stmt ::= stmt-for-c-style
    stmt ::= stmt-for-each
    stmt ::= stmt-switch
    stmt ::= stmt-control-transfer

.. syntax-grammar::

    Grammar of a statement

    statement --> semicolon-statement
    statement --> if-statement
    statement --> while-statement
    statement --> c-style-for-statement
    statement --> for-each-statement
    statement --> switch-statement
    statement --> control-transfer-statement


Semicolon Statement
-------------------

.. langref-grammar

    stmt-semicolon ::= ';'

.. syntax-grammar::

    Grammar of a semicolon statement

    semicolon-statement --> ``;``


Looping Statements
------------------


For Statements
~~~~~~~~~~~~~~


C-Style For Statements
++++++++++++++++++++++


.. syntax-outline::

    for (<#initialization#>; <#condition#>; <#increment#>) {
        <#code to execute#>
    }

where the parentheses are optional.

.. langref-grammar

    stmt-for-c-style    ::= 'for'     stmt-for-c-style-init? ';' expr? ';' expr-basic?     brace-item-list
    stmt-for-c-style    ::= 'for' '(' stmt-for-c-style-init? ';' expr? ';' expr-basic? ')' brace-item-list
    stmt-for-c-style-init ::= decl-var
    stmt-for-c-style-init ::= expr

.. syntax-grammar::

    Grammar of a C-style for statement

    c-style-for-statement --> ``for`` for-init-OPT ``;`` expression-OPT ``;`` expression-OPT code-block
    c-style-for-statement --> ``for`` ``(`` for-init-OPT ``;`` expression-OPT ``;`` expression-OPT ``)`` code-block

    for-init --> variable-declaration | expression

For-Each Statement
++++++++++++++++++

.. syntax-outline::

    for <#item#> in <#collection#> {
        <#code to execute#>
    }

.. langref-grammar

    stmt-for-each ::= 'for' pattern 'in' expr-basic brace-item-list

.. syntax-grammar::

    Grammar of a for-each statement

    for-each-statement --> ``for`` pattern ``in`` expression code-block


While Statement
~~~~~~~~~~~~~~~

A while statement has the following general form:

.. syntax-outline::

    while <#condition#> {
        <#code to execute#>
    }

.. langref-grammar

    stmt-while ::= 'while' expr-basic brace-item-list

.. syntax-grammar::

    Grammar of a while statement

    while-statement --> ``while`` expression  code-block


Do-While Statement
~~~~~~~~~~~~~~~~~~

.. syntax-outline::

    do {
        <#code to execute#>
    } while <#condition#>

.. langref-grammar

    stmt-do-while ::= 'do' brace-item-list 'while' expr

.. syntax-grammar::

    Grammar of a do-while statement

    do-while-statement --> ``do`` code-block ``while`` expression


Branching Statements
--------------------


If Statements
~~~~~~~~~~~~~

The general format of an ``if`` statement is

.. syntax-outline::

    if <#condition#> {
        <#code to execute if condition is true#>
    } else {
        <#code to execute if condition is false#>
    }

where the ``else`` part is optional.

.. syntax-outline::

    if <#condition 1#> {
        <#code to execute if condition 1 is true#>
    } else if <#condition 2#> {
        <#code to execute if condition 2 is true#>
    } else {
        <#code to execute if both conditions are false#>
    }

.. langref-grammar

    stmt-if      ::= 'if' expr-basic brace-item-list stmt-if-else?
    stmt-if-else ::= 'else' brace-item-list
    stmt-if-else ::= 'else' stmt-if

.. syntax-grammar::

    Grammar of an if statement

    if-statement  --> ``if`` expression code-block if-else-statement-OPT
    if-else-statement  --> ``else`` code-block | ``else`` if-statement


Switch Statements
~~~~~~~~~~~~~~~~~

You can use a switch statement to execute certain blocks of code depending on the value of a
**control expression**---the expression following the keyword ``switch``.
The control expression of the switch statement is evaluated and then compared with the patterns specified in each case.
If a match is found, the program executes the code listed within the scope of that case,
which may include declarations, expressions, and other statements.

A switch statement has the following general form:

.. syntax-outline::

    switch <#control expression#> {
        case <#pattern list 1#>:
            <#code to execute#>
        case <#pattern list 2#> where <#condition#>:
            <#code to execute#>
        default:
            <#code to execute#>
    }

The values of expressions your code can branch on is very flexible. For instance,
in addition to the values of scalar types, such as ``Int`` and ``Char``,
your code can branch on the values of any type, including floating point numbers, strings,
tuples, instances of custom classes, and optionals.
The value of a control expression can even be pattern-matched to the value of a case in an enumeration
and checked for inclusion in a specified range of values.
For examples of how to use these various types of values in switch statements,
see “Switch” in the :doc:`../LanguageGuide/ControlFlow` chapter of the :doc:`../LanguageGuide/index`.

A switch case may optionally contain a **guard expression**, which is introduced by the keyword ``where`` followed by an expression.
Guard expressions are used to provide an additional condition before a case is considered matched to the control expression.
If a guard expression is present, the block of code within the relevant case is executed only if
the value of the control expression matches one of the patterns of the case and the guard expression evaluates to ``true``.
In the following example, for instance, a control expression matches the case::

    case (var x, var y) where x == y:

only if it is a tuple that contains two elements of the same value, such as ``(1, 1)``.
As this example shows, patterns in a case may also bind variables using the keyword ``var``.
These variables can then be referenced in a corresponding guard expression
and throughout the rest of the code within the scope of the case.
That said, if the case contains multiple patterns that match the control expression,
none of those patterns may contain variable bindings.

Switch statements may also include a default case, introduced by the keyword ``default``.
The code within a default case is executed only if no other cases match the control expression.
Switch statements may include only one default case, which must appear at the end of the switch statement.

Although the actual execution order of pattern-matching operations,
and in particular the evaluation order of patterns in cases, is unspecified,
pattern matching in a switch statement behaves as if the evaluation is performed in source order---that is,
the order in which they appear in source code.
As a result, if multiple cases contain patterns that evaluate to the same value,
and thus can match the value of the control expression,
the program executes only the code within the first matching case in source order.


Switch Statements Must Be Exhaustive
++++++++++++++++++++++++++++++++++++

In Swift, switch statements must be **exhaustive**---that is,
every possible value of the control expression’s type must match the value of at least one pattern of a case.
When this simply isn’t feasible (for instance, when the control expression’s type is ``Int``),
you can include a default case to satisfy the requirement.


Execution Does Not Fall Through Cases Implicitly
++++++++++++++++++++++++++++++++++++++++++++++++

After the code within a matched case is finished executing, the program exits out of the switch statement.
Program execution does not continue or "fall through" to the next case or default case.
That said, if you want execution to continue from one case to the next,
explicitly include a fallthrough statement, which simply consists of the keyword ``fallthrough``,
in the case from which you want execution to continue.
For an example of how to use a fall-through statement in a switch statement,
see “Fallthrough” in the :doc:`../LanguageGuide/ControlFlow` chapter of the :doc:`../LanguageGuide/index`.

Because execution does automatically continue from one case to the next,
a break statement is not used to transfer control out of a switch statement after
a matching case is executed.
In fact, break and continue statements used in the context of a switch statement
break and continue out of an enclosing loop statement only, not out of the switch statement itself.

.. langref-grammar

    stmt-switch ::= 'switch' expr-basic '{' stmt-switch-case* '}'
    stmt-switch-case ::= (case-label+ | default-label) brace-item*
    case-label ::= 'case' pattern (',' pattern)* ('where' expr)? ':'
    default-label ::= 'default' ':'


.. syntax-grammar::

    Grammar of a switch statement

    switch-statement --> ``switch`` expression ``{`` switch-cases-OPT ``}``
    switch-cases --> switch-case switch-cases-OPT
    switch-case --> case-labels code-block-items-OPT | default-label code-block-items-OPT

    case-labels --> case-label case-labels-OPT
    case-label --> ``case`` pattern-list guard-clause-OPT ``:``
    default-label --> ``default:``

    guard-clause --> ``where`` guard-expression
    guard-expression --> expression

.. TODO: Add elsewhere: pattern-list, and possibly move guard-expression to the
     expressions chapter.


Control Transfer Statements
---------------------------

Control transfer statements can change the order in which code in your program is executed
by unconditionally transferring program control from one piece of code to another.
Swift has four control transfer statements: break statement, continue statement,
fallthrough statement, and return statement.
Each control transfer statement is discussed in detail below.


.. langref-grammar

    stmt-control-transfer ::= stmt-return
    stmt-control-transfer ::= stmt-break
    stmt-control-transfer ::= stmt-continue
    stmt-control-transfer ::= stmt-fallthrough

.. syntax-grammar::

    Grammar of a control transfer statement

    control-transfer-statement --> break-statement
    control-transfer-statement --> continue-statement
    control-transfer-statement --> fallthrough-statement
    control-transfer-statement --> return-statement


Break Statement
~~~~~~~~~~~~~~~

A break statement consists simply of the ``break`` keyword
and may occur only in the context of a loop statement
(for statement, for-each statement, while statement, and do-while statement).
A break statement ends program execution of the smallest enclosing loop statement in which it occurs.
Program control is then transferred to the first line of code following the enclosing
loop statement, if any.
For an example of how to use a break statement in the context of a loop statement,
see “Loop Control Statements” in the :doc:`../LanguageGuide/ControlFlow` chapter of the :doc:`../LanguageGuide/index`.

.. langref-grammar

    stmt-break ::= 'break' (Note: the langref grammar contained a typo)

.. syntax-grammar::

    Grammar of a break statement

    break-statement --> ``break``


Continue Statement
~~~~~~~~~~~~~~~~~~

A continue statement consists of the ``continue`` keyword, and like a break statement,
may occur only in the context of a loop statement
(C-style for statement, for-each statement, while statement, and do-while statement).
Unlike a break statement,
a continue statement ends only the program execution of the *current iteration*
of the smallest enclosing loop statement in which it occurs.
Any remaining code in the body of the loop is not executed.
Program control is then transferred to the controlling expression of the enclosing loop statement.

In a C-style for loop,
the increment expression is still evaluated after the continue statement is executed,
because the increment expression is evaluated after the execution of the loop's body.

For an example of how to use a continue statement in the context of a loop statement,
see “Loop Control Statements”
in the :doc:`../LanguageGuide/ControlFlow` chapter of the :doc:`../LanguageGuide/index`.

.. langref-grammar

    stmt-continue ::= 'continue' (Note: the langref grammar contained a typo)


.. syntax-grammar::

    Grammar of a continue statement

    continue-statement --> ``continue``


Fallthrough Statement
~~~~~~~~~~~~~~~~~~~~~

.. langref-grammar

    stmt-fallthrough ::= 'fallthrough'

.. syntax-grammar::

    Grammar of a fall-through statement

    fallthrough-statement --> ``fallthrough``

Return Statements
~~~~~~~~~~~~~~~~~

.. langref-grammar

    stmt-return ::= 'return' expr
    stmt-return ::= 'return'


.. syntax-grammar::

    Grammar of a return statement

    return-statement --> ``return`` | ``return`` expression
