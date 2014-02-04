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

Use a pipe '|' to specify an alternative. When there are too many alternatives
to fit on a single line, use a new line for each alternative.

For example, to specify that a *case-block-item* can consist of a *declaration*, 
*expression*, or a *statement*, you can use a pipe instead of a new line,
because all three alternatives fit nicely on one line:

| code-block-item --> declaration | expression | statement

On the other hand, consider the grammar of a control transfer statement:

| control-transfer-statement --> break-statement
| control-transfer-statement --> continue-statement
| control-transfer-statement --> fallthrough-statement
| control-transfer-statement --> return-statement

There likely wouldn't be room on a single line to use a pipe to separate each alternative.
The following tends not to loog good:

| control-transfer-statement --> break-statement | continue-statement | fallthrough-statement | return-statement


Append -OPT to Indicate Optionality
-----------------------------------

category? ==> category-OPT

Within a syntax-grammar block,
this is translated to *category*\ :sub:`opt` automatically.


Zero or More of a Category (*)
------------------------------

| category* ==> categories-OPT
| categories --> category categories-OPT

For example,

stmt-switch ::= 'switch' expr-basic '{' stmt-switch-case* '}'

is replaced with

| switch-statement --> ``switch`` basic-expression { switch-cases-OPT }

As shown above, use right-recursion when dealing with repetition.

One or More of a Category (+)
-----------------------------

| category+ ==> categories
| categories --> category categories-OPT


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
