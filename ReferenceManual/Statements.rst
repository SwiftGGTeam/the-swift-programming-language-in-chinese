Statements
==========

Swift provides several statements that are used to control the flow of execution in a program.
There are three types of control flow statements in Swift:
loop statements, branch statements, and control transfer statements.
Each type of statement can be used in function bodies and in top-level code.

Loop statements allow a block of code to be executed repeatedly,
while branch statements allow a certain block of code to be executed
only when certain conditions are met.
Control transfer statements provide a way to alter the order in which code is executed.
Each type of statement is described in detail below.

.. TODO: Write the rest of this introduction
    after we're settled on exactly what is considered a statement in Swift.

.. TODO: Update this chapter to note that Optionals are allowed in boolean contexts
    (e.g., in the conditional expression of a control flow statement).
    In fact, so is any type that conforms to the LogicValue protocol
    and implements the 'func getLogicValue() -> Bool' function.

    For example, the following is allowed:

    var opt: Int? = 1
    if opt {
        println(".Some")
    }
    // .Some

    and

    println(opt.getLogicValue())
    // true

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

    statement --> loop-statement
    statement --> branch-statement
    statement --> control-transfer-statement
    statement --> semicolon-statement

.. TR: Are these the only things considered statements in Swift?
    What about certain expressions and declarations?
    In other languages,
    the most common type of statements are expression statements---
    that is, an expression followed by a semicolon.
    These are usually function calls, assignments,
    or a variable followed by the increment or decrement operator.
    Similarly, in C++, for instance, there is the concept of a declaration statement.
    Do we have analogs to these?


Loop Statements
---------------

Loop statements allow a block of code to be executed repeatedly,
depending on the conditions specified in the loop.
Swift has four loop statements:
the for statement, the collection-based for statement, the while statement, and the do-while statement.
Each loop statement is discussed in detail below.

Control flow in a loop statement can be changed by a break statement and a continue statement
and is discussed in `Break Statement`_ and `Continue Statement`_ below.

.. syntax-grammar::

    Grammar of a loop statement

    loop-statement --> for-statement
    loop-statement --> collection-based-for-statement
    loop-statement --> while-statement
    loop-statement --> do-while-statement


For Statement
~~~~~~~~~~~~~

A for statement allows a block of code to be executed repeatedly
while incrementing a counter,
as long as a condition remains true.

A for statement has the following general form:

.. syntax-outline::

    for (<#initialization#>; <#condition#>; <#increment#>) {
        <#code to execute#>
    }

The parentheses around the initiazilation, condition, and increment are optional,
but the semicolon between them is required.
The braces around the body of the loop are also required.

A for statement is executed as follows:

1. The *initialization* expression is evaluated once only
   and is usually used to declare and initialize any variables
   that are needed for the remainder of the loop.

2. The *condition* expression is evaluated.
   If it evaluates to ``true``,
   the program executes the code inside the braces of the for statement,
   and execution continues to step 3.
   If it evaluates to ``false``,
   the program does not execute the code block or the *increment* expression,
   and the program is finished executing the for statement.

3. The *increment* expression is evaluated.
   After it has been evaluated,
   execution returns to step 2.

Variables defined within the *initialization* expression
are valid only within the scope of the for statement itself.

The value of the *condition* expression must be of type ``Bool``,
and therefore must evaluate to either ``true`` or ``false``.

.. TODO: Document the scope of loop variables.
   This applies to all loops, so it doesn't belong here.

.. langref-grammar

    stmt-for-c-style    ::= 'for'     stmt-for-c-style-init? ';' expr? ';' expr-basic?     brace-item-list
    stmt-for-c-style    ::= 'for' '(' stmt-for-c-style-init? ';' expr? ';' expr-basic? ')' brace-item-list
    stmt-for-c-style-init ::= decl-var
    stmt-for-c-style-init ::= expr

.. syntax-grammar::

    Grammar of a for statement

    for-statement --> ``for`` for-init-OPT ``;`` expression-OPT ``;`` expression-OPT code-block
    for-statement --> ``for`` ``(`` for-init-OPT ``;`` expression-OPT ``;`` expression-OPT ``)`` code-block

    for-init --> variable-declaration | expression-list


Collection-Based For Statement
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. Other rejected headings included range-based, enumerator-based,
   container-based sequence-based and for-each.

Collection-based for statements allow a block of code to be executed
once for each item in a collection
that conforms to the ``Stream`` protocol.

A collection-based for statement has the general form:

.. syntax-outline::

    for <#item#> in <#collection#> {
        <#code to execute#>
    }

The ``generate`` method is called on the *collection* expression
to obtain a value of a stream type---that is,
a type that conforms to the ``Stream`` protocol.
The program begins executing a loop
by calling the ``next`` method on the stream.
If the value returned is not ``None``,
it is assigned to the *item* pattern,
the program executes the code block,
and then continues execution at the beginning of the loop.
Otherwise, the program does not perform assignment or execute the code block,
and it is finished executing the statement.


.. TR: Are the above method calls correct?
   I've determined this information be looking at the declarations in the REPL
   so there may be aspects we don't want to document
   or want to describe differently.
   Used swift-1.12 from Jan 9, 2014.
   (Jan 20 - doesn't match today's REPL anymore.)

.. TODO: Move this info to the stdlib reference as appropriate.


.. langref-grammar

    stmt-for-each ::= 'for' pattern 'in' expr-basic brace-item-list

.. syntax-grammar::

    Grammar of a collection-based for statement

    collection-based-for-statement --> ``for`` pattern ``in`` expression code-block


While Statement
~~~~~~~~~~~~~~~

While statements allow a block of code to be executed repeatedly,
as long as a condition remains true.

A while statement has the following general form:

.. syntax-outline::

    while <#condition#> {
        <#code to execute#>
    }

A while statement is executed as follows:

1. The *condition* expression is evaluated.
   If it evaluates to ``true``, execution continues to step 2.
   If it evaluates to ``false``, the program is finished executing the while statement.

2. The program executes the code inside the braces of the while statement,
   and execution returns to step 1.

Because the value of the *condition* expression is evaluated before the code block is executed,
the code block in a while statement may be executed zero or more times.

The value of the *condition* expression must be of type ``Bool``,
and therefore must evaluate to either ``true`` or ``false``.

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

A do-while statement is executed as follows:

1. The program executes the code inside the braces of the do-while statement,
   and execution continues to step 2.

2. The *condition* expression is evaluated.
   If it evaluates to ``true``, execution returns to step 1.
   If it evaluates to ``false``, the program is finished executing the do-while statement.

Because the value of the *condition* expression is evaluated after the code block is executed,
the code block in a do-while statement is executed at least once.

The value of the *condition* expression must be of type ``Bool``,
and therefore must evaluate to either ``true`` or ``false``.

.. langref-grammar

    stmt-do-while ::= 'do' brace-item-list 'while' expr

.. syntax-grammar::

    Grammar of a do-while statement

    do-while-statement --> ``do`` code-block ``while`` expression


Branch Statements
-----------------

Branch statements allow the program to execute certain parts of code
depending the value of one or more conditions.
The values of the conditions specified in a branch statement
control how the program branches and, therefore, what block of code is executed.
Swift has two branch statements: the if statement and the switch statement.
Each branch statement is discussed in detail below.

.. syntax-grammar::

    Grammer of a branch statement

    branch-statement --> if-statement
    branch-statement --> switch-statement


If Statement
~~~~~~~~~~~~

An if statement is used for executing code based on the evaluation of one or more conditions.

There are two basic forms of the if statement.
In each form, the opening and closing braces are required.

The first form allows code to be executed only when a condition is true
and has the following general form:

.. syntax-outline::

    if <#condition#> {
        <#code to execute if condition is true#>
    }

.. NOTE: Original prose: When an if statement has the first form,
    the *condition* expression is evaluated and, if it evaluates to ``true``,
    the code inside the opening and closing braces of the if statement is executed.
    If it evaluates to ``false``, the program is finished executing the if statement.

The second form of the if statement provides an additional *else clause* (introduced by the ``else`` keyword)
and is used for executing one part of code when the condition is true
and another part code when the same condition is false.
When a single else clause is present, an if statement has the following form:

.. syntax-outline::

    if <#condition#> {
        <#code to execute if condition is true#>
    } else {
        <#code to execute if condition is false#>
    }

.. NOTE: Original prose: When the optional else clause is present in an if statement,
    the *condition* expression is evaluated and, if it evaluates to ``true``,
    the code inside the opening and closing braces of the if statement is executed.
    If it evaluates to ``false``,
    the code inside the opening and closing braces of the else clause is executed instead.

The else clause of an if statement can contain another if statement
when the program needs to execute code based on the result of testing more than one condition.
An if statement that is chained together in this way has the following form:

.. syntax-outline::

    if <#condition 1#> {
        <#code to execute if condition 1 is true#>
    } else if <#condition 2#> {
        <#code to execute if condition 2 is true#>
    } else {
        <#code to execute if both conditions are false#>
    }

The value of any conditional expression in an if statement must be of type ``Bool``,
and therefore must evaluate to either ``true`` or ``false``.

.. TODO: Should we promote this last sentence (here and elsewhere) higher up in the chapter?

.. langref-grammar

    stmt-if      ::= 'if' expr-basic brace-item-list stmt-if-else?
    stmt-if-else ::= 'else' brace-item-list
    stmt-if-else ::= 'else' stmt-if

.. syntax-grammar::

    Grammar of an if statement

    if-statement  --> ``if`` expression code-block else-clause-OPT
    else-clause  --> ``else`` code-block | ``else`` if-statement


Switch Statements
~~~~~~~~~~~~~~~~~

.. FIXME: "You can use" is a bit wordy.
   We need to settle on a convention for starting each section.

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

A break statement consists of the ``break`` keyword
and may occur only in the context of a loop statement.
A break statement ends program execution of the current iteration
of the innermost enclosing loop statement in which it occurs
and stops execution of the loop statement.
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

A continue statement consists of the ``continue`` keyword
and may occur only in the context of a loop statement.
A continue statement ends program execution of the current iteration
of the innermost enclosing loop statement in which it occurs
but does not stop execution of the loop statement.
Program control is then transferred to the controlling expression of the enclosing loop statement.

In a for statement,
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
from one case in a switch statement to the next case.
Program execution continues to the next case
even if the patterns of the case label do not match the value of the switch statement's control expression.



A fallthrough statement can appear anywhere inside a switch statement,
not just as the last statement of a case block,
but it may not be used in the final case block.
It also cannot transfer control into a case block
whose pattern contains variable bindings.

.. TODO: Need a decided-on name for "var" bindings.

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

.. TODO: TR: Converted how?

.. langref-grammar

    stmt-return ::= 'return' expr
    stmt-return ::= 'return'


.. syntax-grammar::

    Grammar of a return statement

    return-statement --> ``return`` | ``return`` expression


Semicolon Statement
-------------------

A semicolon statement consists simply of the semicolon (``;``)
and may be used to separate consecutive statements that appear on the same line.
In Swift, statements are not required to end with a semicolon.

.. langref-grammar

    stmt-semicolon ::= ';'

.. syntax-grammar::

    Grammar of a semicolon statement

    semicolon-statement --> ``;``
