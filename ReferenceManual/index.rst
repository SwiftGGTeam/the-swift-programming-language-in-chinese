Reference Manual
================

This is an early draft of a document that is still being written.
The translation of the formal grammar is essentially complete,
so feedback on that material would be much appreciated.
Future drafts will include the missing prose
and track any future language changes.

Most entries begin with an outline of the syntax,
in a similar style to an Xcode code snippet.
These syntax outlines highlight the most common cases
for developers who don't necessarily want to read the formal definitions.

Most of the surrounding prose has not yet been written.
For an example of what a section might look like,
including a syntax outline, prose,
and a formal grammatical definition,
see the switch statement in :doc:`Statements`.

The last chapter, :doc:`zzSummaryOfTheGrammar`
is a collection of all the formal grammar entries
without any surrounding prose.
It is included for your convenience if you need to search
for the definition of a particular grammatical category,
since linking between definitions is not yet supported by our build tools.

.. toctree::
    :maxdepth: 1

    Introduction
    LexicalStructure
    Types
    Expressions
    Statements
    Declarations
    Attributes
    Patterns
    GenericParametersAndArguments
    zzSummaryOfTheGrammar

.. docnote:: To be included?

    * Phases of Translation (maybe include this in the introduction?)
    * Name Binding
    * Type Checking
    * Standard Library
