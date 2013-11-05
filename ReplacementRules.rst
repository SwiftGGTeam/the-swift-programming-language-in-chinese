Replacement Rules
=================

'==>' means "replace the thing on the left with what's on the right."


The Production Symbol (::=)
---------------------------

::= ==> -->

The arrow '-->' can be read as "can consist of."

To make the arrow in RST, use two hyphens '-' followed by a right-hand angle bracket '>'.
(The production path is responsible for making it render as a nice Unicode arrow.)


Change Single Quotes Around Literals to Backticks
-------------------------------------------------

'literal' ==> ``literal``


No Changes to Syntactic Categories
----------------------------------

category ==> category

Within a syntax-grammar block, they appear in italics automatically.


Use Complete Words for Syntactic Categories and Modify When Necessary
---------------------------------------------------------------------

cat-syn ==> syntactic-category

Examples:

| expr ==> expression
| expr-basic ==> basic-expression
| stmt-switch ==> switch-statement
| stmt-switch-case ==> switch-case
| stmt-for-each ==> for-each-statement

But, there are cases where this isn't feasible because of space considerations. 
For example, in the grammar for a C-style for statement, the category that defines the 
initialization part of the for statement had to be shortened to *for-init* (instead of 
*for-initialization*, as the rule specifies). In this case, nothing seems lost from a 
readability or pedagogical perspective.

| c-style-for-statement --> ``for`` for-init-OPT ``;`` expression-OPT ``;`` basic-expression-OPT brace-item-list
| c-style-for-statement --> ``for`` ``(`` for-init-OPT ``;`` expression-OPT ``;`` basic-expression-OPT ``)`` brace-item-list
|
| for-init --> variable-declaration | expression


Use a Pipe (|) or a New Line for Alternatives
---------------------------------------------

Use at **most** one pipe '|' for specifying an alternative.
If you need more than one, use a new line for each alternative instead.

For example, to specify that *case-labels* can consist of
either a single *case-label* or a single *case-label* followed by any number of *case-labels*,
you can use a pipe instead of a new line,
because there are only two alternatives (choices to make):

| case-labels --> case-label | case-label case-labels

On the other hand, consider the grammar of a control transfer statement:

| control-transfer-statement --> break-statement
| control-transfer-statement --> continue-statement
| control-transfer-statement --> fallthrough-statement
| control-transfer-statement --> return-statement

There likely wouldn't be room on a single line to use a pipe to separate each alternative.
The following tends not to loog good:

| control-transfer-statement --> break-statement | continue-statement | fallthrough-statement | return-statement

When possible, use just a single syntactic category to the left of the pipe.
In cases of recursion (expressing repetition),
use a right recursion as shown in the *case-labels* example above.
This is easier to read because the syntactic category
on the left and the right side of the pipe is the same ---
there is no confusion about whether the pipe might only apply
to the items directly to its left/right.

Append -OPT to Indicate Optionality
-----------------------------------

category? ==> category-OPT

Within a syntax-grammar block,
this is translated to *category*\ :sub:`opt` automatically.


Zero or More of a Category (*)
------------------------------

| category* ==> categories-OPT
| categories --> category | category categories

For example,

stmt-switch ::= 'switch' expr-basic '{' stmt-switch-case* '}'

is replaced with

| switch-statement --> ``switch`` basic-expression { switch-cases-OPT }


One or More of a Category (+)
-----------------------------

| category+ ==> categories
| categories --> category | category categories


Remove Grouping Parentheses
---------------------------

This is really a supervised rule—you need to exercise some creativity and judgment when removing
grouping parentheses. Here are some examples:

This one required coming up with a new category, which then needed to be defined.

| ('where' expr)? ==> guard-expression-OPT
| guard-expression --> ``where`` expression

This one was a bit dense and required the application of several of the rules above.

| stmt-switch-case ::= (case-label+ | default-label) brace-item*

was replaced with

switch-case --> case-labels brace-items-OPT | default-label brace-items-OPT


A Comma-Separated List of One or More of a Category
---------------------------------------------------

| category (',' category)* ==> category-list
| category-list --> category | category ``,`` category-list

For example, the original EBNF form for a case-label was

case-label ::= 'case' pattern (',' pattern)* ('where' expr)? ':'

which specifies that one or more patterns (separated by commas) may appear after a case label.
Using the replacement rules above, you get

case-label --> ``case`` patten-list guard-expression-OPT
