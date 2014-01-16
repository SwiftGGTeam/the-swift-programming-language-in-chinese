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
    statement --> looping-statement
    statement --> branching-statement
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

Looping statements allow a block of code to be executed repeatedly,
depending on the conditions specified in the loop.
All code inside the scope of the loop is executed (in order) on each iteration of the loop,
unless a break statement or continue statement is encountered.
Swift has four looping statements:
C-style for statement, for-each statement, while statement, and do-while statement.
Each looping statement is discussed in detail below.

.. syntax-grammar::

    Grammar of a looping statement

    looping-statement --> c-style-for-statement
    looping-statement --> for-each-statement
    looping-statement --> while-statement
    looping-statement --> do-while-statement


For Statements
~~~~~~~~~~~~~~

A for statement allows a block of code to be executed multiple times.
Swift has two for statements:
a C-style for statement and a for-each statement.
Each for statement is discussed in detail below.

.. TODO: These need better names.
   How about "incrementor style" and "collection style" for loops?

C-Style For Statements
++++++++++++++++++++++

C-style for statements allow a block of code to be executed repeatedly
while incrementing a counter,
as long as a condition remains true.

..  This probably belongs in the Language Guide.
    Typically, the initialization, condition, and increment,
    are used to keep a local counter.

A C-style for statement has the general form, where the parentheses are optional:

.. syntax-outline::

    for (<#initialization#>; <#condition#>; <#increment#>) {
        <#code to execute#>
    }

Although the parentheses are optional,
the opening and closing braces and the semicolons are required.

A for statement is executed it two phases:
the initialization and the loop.
During initialization, the program evaluates the initialization expression.
During the loop,
the program executes the conditional expression,
the code block, and the increment expression.
If the conditional expression evaluates to ``true``,
the program executes the code block and the increment expression,
and then continues execution at the beginning of the loop.
Otherwise,
the program does not execute the code block or the increment expression,
and the program is finished executing the statement.

.. TODO: Document the scope of loop variables.
   This applies to all loops, so it doesn't belong here.

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

For-each statements allow a block of code to be executed
once for each item in a collection
that conforms to the ``Sequence`` protocol.

A for-each statement has the general form:

.. syntax-outline::

    for <#item#> in <#collection#> {
        <#code to execute#>
    }

The ``enumerate`` method is called on the **collection expression**
to obtain a value of type ``Generator`` known as the generator.
The program begins executing a loop
by calling the ``next`` method on the generator.
If the value returned is not ``None``,
it is assigned to the **item pattern**,
the program executes the code block,
and then continues execution at the beginning of the loop.
Otherwise, the program does not perform assignment or execute the code block,
and it is finished executing the statement.

.. TR: Are the above method calls correct?
   I've determined this information be looking at the declarations in the REPL
   so there may be aspects we don't want to document
   or want to describe differently.

.. langref-grammar

    stmt-for-each ::= 'for' pattern 'in' expr-basic brace-item-list

.. syntax-grammar::

    Grammar of a for-each statement

    for-each-statement --> ``for`` pattern ``in`` expression code-block


While Statement
~~~~~~~~~~~~~~~

While statements allow a block of code to be executed zero or more times,
as long as a condition remains true.

A while statement has the following general form:

.. syntax-outline::

    while <#condition#> {
        <#code to execute#>
    }

When a while loop is executed,
it begins by evaluating the conditional.
If it evaluates to ``true``, the program executes the code block
and then continues execution at the beginning of the while statement.
Otherwise, the program is finished executing the statement.

.. langref-grammar

    stmt-while ::= 'while' expr-basic brace-item-list

.. syntax-grammar::

    Grammar of a while statement

    while-statement --> ``while`` expression  code-block


Do-While Statement
~~~~~~~~~~~~~~~~~~

Do-while statements allow a block of code to be executed one or more times,
as long as a condition remains true.

A do-while statement has the following general form:

.. syntax-outline::

    do {
        <#code to execute#>
    } while <#condition#>

When a do-while loop is executed,
it begins by executing the code block,
and then evaluates the conditional.
If it evaluates to ``true``,
the program continues execution at the beginning of the do-while statement.
Otherwise, the program is finished executing the statement.

.. langref-grammar

    stmt-do-while ::= 'do' brace-item-list 'while' expr

.. syntax-grammar::

    Grammar of a do-while statement

    do-while-statement --> ``do`` code-block ``while`` expression


Branching Statements
--------------------


.. syntax-grammar::

    Grammer of a branching statement

    branching-statement --> if-statement
    branching-statement --> switch-statement


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
For instance, a control expression matches the case in the example below
only if it is a tuple that contains two elements of the same value, such as ``(1, 1)``. ::

    case (var x, var y) where x == y:

As the above example shows, patterns in a case may also bind variables using the keyword ``var``.
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
For more information about the fallthrough statement, see "Fallthrough" below.

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

A fallthrough statement consists of the ``fallthrough`` keyword
and may occur only in a case block of a switch statement.
A fallthrough statement causes program execution to continue
from one case in a switch statement to the next case or, if present, to the default case.
Program execution continues to the next case
even if the patterns of the case label do not match the value of the switch statement's control expression.

Fallthrough statements may not be used in the final case block of a switch statement.

For an example of how to use a fallthrough statement in a switch statement,
see “Fallthrough” in the :doc:`../LanguageGuide/ControlFlow` chapter of the :doc:`../LanguageGuide/index`.

.. langref-grammar

    stmt-fallthrough ::= 'fallthrough'

.. syntax-grammar::

    Grammar of a fallthrough statement

    fallthrough-statement --> ``fallthrough``


Return Statements
~~~~~~~~~~~~~~~~~

A return statement may occur only in the body of a function or method definition
and causes program execution to return to the calling function or method.
Program execution continues at the point immediately following the function or method call.

A return statement may consist only of the keyword ``return``,
or it may consist of the keyword ``return`` followed by an expression, as shown below.

.. syntax-outline::

    return <#expression#>

A return statement that is not followed by an expression
can be used only to return from a function or method that does not return a value
(that is, when the return type of the function or method is ``Void`` or ``()``).

When a return statement is followed by an expression,
the value of the expression is returned to the calling function or method.
If the value of the expression does not match the value of the return type
declared in the function or method declaration,
the expression's value is converted to the return type
before it is returned to the calling function or method.

.. langref-grammar

    stmt-return ::= 'return' expr
    stmt-return ::= 'return'


.. syntax-grammar::

    Grammar of a return statement

    return-statement --> ``return`` | ``return`` expression
