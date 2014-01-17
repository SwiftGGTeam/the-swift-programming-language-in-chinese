Language Guide
==============

Chapters that have not yet been written are indicated with an [x] after their name. These chapters will be added as soon as an initial draft is available.

.. toctree::
    :maxdepth: 1

    BasicTypes
    Operators
    Strings
    ControlFlow
    Enumerations
    FunctionsAndClosures
    ClassesAndStructures
    ProtocolsAndExtensions
    Generics
    StandardFunctions
    ObjectiveC

Change Log
----------

January 17 2014
~~~~~~~~~~~~~~~

* Added the first few sections of a draft chapter about :doc:`ClassesAndStructures`
* Enumerations have been extracted out of :doc:`BasicTypes` and given their own chapter called :doc:`Enumerations`
* ``let`` constants have been added to :doc:`BasicTypes`
* The ‘Declaring and Naming Variables’ section of :doc:`BasicTypes` is now called ‘Named Values’, and talks about both ``let`` constants and ``var`` variables
* Most mentions of ‘variables’ have been changed to talk about ‘named values’
* Most ``var`` declarations have become ``let`` declarations
* Removed mention of the ``reverse()`` function from :doc:`ControlFlow`, as it is no longer available
* Removed ``Int128`` and ``UInt128`` from :doc:`BasicTypes`, as they don't actually exist
* Removed mention of ``Float32`` and ``Float64``, and standardized on ``Float`` and ``Double``
* The ``%`` operator is now correctly called a ‘remainder operator’ rather than a ‘modulo operator’ in :doc:`Operators`
* Improved and expanded the description of the remainder operator in :doc:`Operators`, including a description of how it works with negative numbers
* Other wording improvements throughout the Guide based on initial feedback