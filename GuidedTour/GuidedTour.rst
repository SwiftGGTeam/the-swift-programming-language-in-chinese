A Guided Tour of the Swift Language
===================================

Tradition suggests that the first program you write in a new language
should print the words "Hello, world" on your screen.
In Swift, this can be done in a single line:

.. K&R uses "hello, world".
   It seems worth breaking with tradition to use proper casing.

.. testcode::

   -> print("Hello, world")
   << Hello, world

If you have written code in a language like C or Objective-C before,
this syntax probably looks familiar to you.
Unlike those languages,
this line of Swift code is a complete program.
There is no need to import a standard library for functionaly like
input/output or string handling.
The first statement at global scope is used
as entry point for the program,
so there is no need for a ``main`` function.

The rest of this tour show you examples
of how to accomplish a variety of programming tasks in Swift
without explaining the concepts in detail.
It gives you a broad (but shallow) overview of the language
to help you start writing actual code in Swift

Experienced programmers may find the examples give them enough information
thay they can skim the rest of the language guide
and answer their own questions by reading the reference manual.

Variables and Constants
-----------------------


.. Set variables and constants
.. Note on type inference
.. Perform simple math
.. Perform string interpolation

Control Flow
------------

.. Make decisions with "if" and "switch"
.. Repeat code with "while" and "for"

Functions
---------

.. Define functions with "func"
.. Call functions with "()" postfix.
.. [No discussion of selector style syntax here.]

Objects
-------

.. Declare classes with "class"
.. Declare methods with "func"
.. Declare properties with "var" and "let"
.. Make instances with "Class()"
.. Access methods and properties with "."
.. Customize object lifecycle with "init" and "deinit"

.. Indicate superclass and protocol conformance with ":"
.. Override superclass methods with "@override"
.. Call the superclass's implentation with "super"

Value Types
-----------

.. Differences from objects (reference types)
.. Use tuples for simple multipart data
.. Use structs for complex multipart data
.. Use enums when values come from a list
.. Associating additional data with enums
.. Indicate protocol conformance using ":"

Protocols
---------

.. Again, supported by both reference and value types
.. Distinguish is/has/can ...
.. Can be used as a first-class type (ie in variable declaration)

Optionals
---------

.. Contrast with nil/NULL
.. Implemented as enum (no magic)
.. Convenience syntax "?" and "!"

Generics
--------

Patterns and Advanced Switches
------------------------------

