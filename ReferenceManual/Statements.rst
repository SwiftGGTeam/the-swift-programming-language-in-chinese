Statements
==========


Semicolon Statements
--------------------



Return Statements
-----------------



Break Statements
----------------



Continue Statements
-------------------


If Statements
-------------
The general format of an ``if`` statement is

| ``if`` ``(`` *condition* ``)`` ``{``
|    *statements-if-true*
| ``} else {``
|    *statements-if-false*
| ``}``

where the ``else`` part is optional.

    ``if`` statements are defined by the following grammar:

    | *stmt-if*       ⟶ ``if`` *expr-basic*  *brace-item-list*  *stmt-if-else*?
    | *stmt-if-else*  ⟶ ``else``  *brace-item-list*
    | *stmt-if-else*  ⟶ ``else``  *stmt-if*
    



While Statements
----------------
A ``while`` statement has the general form:

    | ``while`` ``(`` *condition* ``)`` ``{``
    |    *statements*
    | ``}``

The formal definition of a ``while`` statement is given below:

    | *stmt-while*  ⟶ ``while`` *expr-basic*  *brace-item-list*


Do-While Statements
-------------------



For Statements
--------------

C-Style For Statements
~~~~~~~~~~~~~~~~~~~~~~

Fast Enumeration For Statements
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



Switch Statements
-----------------

The Fallthrough Statement
~~~~~~~~~~~~~~~~~~~~~~~~~



