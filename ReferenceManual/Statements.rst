Statements
==========


Semicolon Statement
-------------------



Looping Statements
------------------


For Statements
~~~~~~~~~~~~~~


C-Style For Statements
++++++++++++++++++++++



Fast Enumeration For Statements
+++++++++++++++++++++++++++++++


While Statement
~~~~~~~~~~~~~~~


A while statement has the following general form:

.. syntax-outline::

    while <#condition#> {
        <#code-to-execute#>
    }

blah blah

.. syntax-grammar::
   
    Grammar of a while statement

    while-statement --> ``while`` basic-expression  brace-item-list


Do-While Statement
~~~~~~~~~~~~~~~~~~


Branching Statements
--------------------


If Statements
~~~~~~~~~~~~~

The general format of an ``if`` statement is

.. syntax-outline::

    if <#condition#> {
        <#code-to-execute-if-true#>
    } else {
        <#code-to-execute-if-false#>
    }

where the ``else`` part is optional.

.. syntax-grammar::

    Grammar of an if statement

    if-statement  --> ``if`` basic-expression brace-item-list if-else-statement-OPT
    if-else-statement  --> ``else`` brace-item-list | ``else`` if-statement


Switch Statements
~~~~~~~~~~~~~~~~~

You can use a switch statement to execute certain blocks of code depending on the value of a 
**control expression**—the expression following the keyword ``switch``. 
The control expression of the switch statement is evaluated and then compared with the patterns specified in each case. 
If a match is found, the program executes the code listed within the scope of that case, 
which may include declarations, expressions, and other statements.

A switch statement has the following general form:

| ``switch`` *basic-expression* ``{``
|       ``case`` *pattern-list 1*\ ``:``
|           *code-to*execute*
|       ``case`` *pattern-list 2* ``where`` *expression*\ ``:``
|           *code-to-execute*
|
|       ``default:``
|           *code-to-execute*
| ``}``

Because the control expression in a Swift switch statement is a *basic-expression*, 
the values of expressions your code can branch on is very flexible. 
For instance, in addition to the values of scalar types, such as ``Int`` and ``Char``, 
your code can branch on the values of any type, including floating point numbers, strings, 
tuples, instances of custom classes, and optionals. 
The value of a control expression can even be pattern-matched to the value of a case in an enumeration 
and checked for inclusion in a specified range of values. 
The following example illustrates the various kinds of patterns that may be matched to the value of a control expression.

::

    (swift) switch basic-expression {
	            case 2:
	            case 3, 5:
		            println(“matches one of the first three prime numbers”)
	            case 10..100:
		            println(“matches a number between 10 and 99”)
	            case .Bar
		            println(“matches the value of the ‘Bar’ enum case”)
	            case (sin(π/2), 2):
		            println(“matches the value of the tuple (1.0, 2)”)
	            case (_, “world”):
		            println(“the second element mathces the String ‘world’”)
	            case myObject:
		            println(“matches the value of myObject”)
	            case .None:
		            println(“the value of the expression is not present”)
	            case (var x, var y) where x == y:
		            println(“both elements have the same value”)
	
	            default:
		            println(“didn’t match any other pattern”)
	        }


A switch case may optionally contain a **guard expression**, which is introduced by the keyword ``where`` followed by an expression. 
Guard expressions are used to provide an additional condition before a case is considered matched to the control expression. 
If a guard expression is present, the block of code within the relevant case is executed only if 
the value of the control expression matches one of the patterns of the case and the guard expression evaluates to ``true``.  
In the example above, for instance, the control expression matches the case::
 
    (swift) case (var x, var y) where x == y:
 
only if it is a tuple that contains two elements of the same value, such as ``(1, 1)``. 
As this example shows, patterns in a case may also bind variables using the keyword ``var``. 
These variables can then be referenced in a corresponding guard expression 
and throughout the rest of the code within the scope of the case. 
That said, if the case contains multiple patterns that match the control expression, 
none of those patterns may contain variable bindings.

Switch Statements Must Be Exhaustive
++++++++++++++++++++++++++++++++++++

In Swift, switch statements must be **exhaustive** — that is, 
every possible value of the control expression’s type must match the value of at least one pattern of a case. 
When this simply isn’t feasible (for instance, when the control expression’s type is ``Int``), 
you can include a default case to satisfy the requirement.

Execution Does Not Fall Through Cases Implicitly
++++++++++++++++++++++++++++++++++++++++++++++++

After the code within a matched case is finished executing, the program exits out of the switch statement. 
Program execution does not continue or "fall through" to the next case or default case. 
That said, if you want execution to continue from one case to the next, 
explicitly include a fall-through statement, which simply consists of the keyword ``fallthrough``, 
in the case from which you want execution to continue. 
For an example of how to use a fall-through statement in a switch statement, 
see “Fall Through” in the :doc:`../LanguageGuide/LanguageGuide`.


    **Grammar of a switch statement**

    | *switch-statement*  ⟶ ``switch`` *basic-expression* ``{`` *switch-cases*\ :sub:`opt` ``}``
    | *switch-cases*  ⟶ *switch-case*  |  *switch-case* *switch-cases*
    | *switch-case*   ⟶ *case-labels* *brace-item*\ :sub:`opt`  |  *default-label* *brace-item*\ :sub:`opt`
    |
    | *case-labels*   ⟶ *case-label*  |  *case-label*  *case-labels*
    | *case-label*    ⟶ ``case`` *pattern-list* *guard-expression*\ :sub:`opt` ``:``
    | *default-label* ⟶ ``default`` ``:``
    |
    | *guard-expression* ⟶ ``where`` *expression*


Control Flow Statements
-----------------------


Break Statement
~~~~~~~~~~~~~~~


Continue Statement
~~~~~~~~~~~~~~~~~~


Fall-Through Statement
~~~~~~~~~~~~~~~~~~~~~~


Return Statements
~~~~~~~~~~~~~~~~~








