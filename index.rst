Introduction
============

*The Swift Programming Language* is one of the documents we’ll be publishing at WWDC. The chapters available here are a work in progress, and change fairly frequently (please see the `Change Log`_ for a list of recent changes).

Chapters that have not yet been written are indicated with an [x] after their name. These chapters will be added as soon as an initial draft is available.

Please send any comments on this book to the Developer Publications Swift Discuss list (`Developer Publications-swift-discuss@group.apple.com <mailto:Developer Publications-swift-discuss@group.apple.com?subject=The%20Swift%20Programming%20Language%20book>`_).

Contents
========

.. toctree::
    :maxdepth: 1

    LanguageGuide/index
    ReferenceManual/index

Change Log
----------

March 12 2014
~~~~~~~~~~~~~

Language Guide
++++++++++++++

* Added the first half of a chapter on :doc:`LanguageGuide/Protocols`
* Epic refactoring of the old Classes and Structures chapter into new chapters called
  :doc:`LanguageGuide/CustomTypes`, :doc:`LanguageGuide/Properties`, :doc:`LanguageGuide/Methods`,
  :doc:`LanguageGuide/Inheritance`, :doc:`LanguageGuide/Initialization`
  and :doc:`LanguageGuide/TypeCasting`, and moved the :doc:`LanguageGuide/Enumerations` chapter
  to appear before all of the above
* **NOTE:** The :doc:`LanguageGuide/Initialization` chapter is out of date with
  recent Swift changes to how initialization works, and needs a substantial rewrite
* Split the old Operators chapter into two new chapters called
  :doc:`LanguageGuide/BasicOperators` and :doc:`LanguageGuide/AdvancedOperators`,
  and moved the Advanced chapter to the back of the book
* Reworked several other chapters to fit with the new overall structure
* Moved away from an explicit REPL-like presentation of code examples,
  and added in hand-written comments instead
* New section on :ref:`Methods_Subscripts`
* New section about mutating ``self`` in :ref:`enumeration instance methods <Methods_SelfEnumerations>`
* New sections about :ref:`BasicTypes_PrintingNamedValues`
  and :ref:`BasicTypes_StringInterpolation` in Basic Types
* Improved examples for :ref:`ControlFlow_While` and :ref:`ControlFlow_Break`,
  and a new example for :ref:`ControlFlow_DoWhile`
* Embedded Types are now referred to as :ref:`CustomTypes_NestedTypes`,
  and their example has been simplified
* Moved :ref:`BasicTypes_OptionalBinding` into the :doc:`LanguageGuide/BasicTypes` chapter,
  and adopted it for several more examples throughout the book
* :ref:`didSet <Properties_StoredPropertyObservers>` now has an ``oldValue`` parameter
* Updates to bring code examples in line with this week's Swift release
* Lots of editorial and technical improvements based on reader feedback (thank you!)

Reference Manual
++++++++++++++++

* Minor formal grammar updates to the :doc:`ReferenceManual/LexicalStructure` chapter.
* **NOTE:** The grammar in the :doc:`ReferenceManual/Declarations` and :doc:`ReferenceManual/Expressions`
  chapters are out of date. They will be updated shortly.


February 28 2014
~~~~~~~~~~~~~~~~

Reference Manual
++++++++++++++++

* Substantial updates to the :doc:`ReferenceManual/LexicalStructure` chapter.
  Most sections of this chapter have been improved, both in prose and in formal grammar.

February 27 2014
~~~~~~~~~~~~~~~~

Language Guide
++++++++++++++

* First draft of a nearly-complete chapter on :doc:`LanguageGuide/Extensions`
* ``val`` is once again ``let``
* Destructors are now :ref:`Initialization_Deinitializers`,
  and have an improved and expanded description
* Added information about the new :ref:`@override attribute <Inheritance_OverridingInstanceMethods>`
* Improved descriptions for :ref:`the implicit self parameter <Methods_TheSelfParameter>`
* The :ref:`AdvancedOperators_OperatorFunctions` section
  now uses a Vector2D structure instead of a Point
* Clarified that structures can also assign to ``self`` within an initializer
* Editorial changes and improvements throughout, as ever

February 25 2014
~~~~~~~~~~~~~~~~

Language Guide
++++++++++++++

* New section on :doc:`LanguageGuide/TypeCasting`
* New section on :ref:`Initialization_Deinitializers`
* New section on :ref:`self <Methods_TheSelfParameter>` and ``mutating`` structure methods
* :ref:`Properties_StoredPropertyObservers` and :ref:`Properties_ComputedProperties` now all use curly braces
* Information about the :ref:`BasicOperators_ClosedRangeOperator` (``..``)
* Re-ordered the :doc:`LanguageGuide/ControlFlow` chapter
* ``String`` no longer has a ``length`` property
* :doc:`LanguageGuide/Extensions` and :doc:`LanguageGuide/Protocols` are now separate chapters (but are not yet written)
* We no longer refer to getters, setters, observers and initializers as “methods”
* Placeholder sections for Arrays and Dictionaries (but no content as yet) in :doc:`LanguageGuide/BasicTypes`
* Editorial changes and improvements throughout the *Guide*

Reference Manual
++++++++++++++++

* Updated the :doc:`ReferenceManual/Statements` chapter to account for optional binding in ``if`` and ``while`` statements.
  Also simplified the grammar by making expressions and declarations be kinds of statements.
  This chapter has now has an editorial pass.
* Added a draft of the :doc:`ReferenceManual/LexicalStructure` chapter.
* Added a draft of the :doc:`ReferenceManual/Types` chapter.
  There are still a few placeholder sections in this chapter.
