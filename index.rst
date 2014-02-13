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

February 12 2014
~~~~~~~~~~~~~~~~

Language Guide
++++++++++++++

+ Updated and rewritten much of the :doc:`LanguageGuide/ClassesAndStructures` chapter, including a :ref:`revised description of value and reference types <ClassesAndStructures_ValueTypesAndReferenceTypes>`, and new sections on:
    * :ref:`Constant and Variable Properties <ClassesAndStructures_StoredProperties>`
    * :ref:`ClassesAndStructures_StoredPropertyObservers` (``willSet`` and ``didSet``)
    * :ref:`ClassesAndStructures_ComputedProperties`
    * :ref:`ClassesAndStructures_ShorthandGetterAndSetterDeclarations`
    * :ref:`ClassesAndStructures_ReadOnlyComputedProperties`
    * :ref:`ClassesAndStructures_PropertiesAndInstanceVariables`
    * :ref:`ClassesAndStructures_InstanceMethods`
    * :ref:`ClassesAndStructures_Initialization`
    * :ref:`ClassesAndStructures_Inheritance`
    * :ref:`ClassesAndStructures_OperatorFunctions`

* First draft of a few sections of the :doc:`LanguageGuide/Functions` chapter
* ``let`` has been changed to ``val`` throughout the Language Guide
* :doc:`LanguageGuide/ClassesAndStructures` now uses :ref:`‘instances’ <ClassesAndStructures_Terminology>` to refer to both objects and structs
* :doc:`LanguageGuide/Functions` and :doc:`LanguageGuide/Closures` are now separate chapters
* New section about :ref:`ControlFlow_OptionalBinding` (``if let x = someOptional``)  in :doc:`LanguageGuide/ControlFlow` 
* Added :ref:`a new Enumerations example <Enumerations_PropertiesAndMethods>`, showing how they can use initializers, computed properties and instance methods 
* Added a section about :ref:`Enumerations_EmbeddedTypes` to the :doc:`LanguageGuide/Enumerations` chapter, although it applies to classes and structures too
* Refer to :ref:`BasicTypes_TypeSafetyAndTypeInference` rather than ‘strong typing’ in :doc:`LanguageGuide/BasicTypes`
* :ref:`Operators_IncrementAndDecrementOperators` now work with floating-point numbers
* The half-closed :ref:`Operators_RangeOperator` is now ``...`` rather than ``..``
* Removed the description of tuple typealiases and initializer syntax, and removed all remaining mentions of named tuple values
* Moved over to using constants in the :ref:`ControlFlow_Where` example in :doc:`LanguageGuide/ControlFlow`
* ``Int`` is now word-sized; removed the corresponding note in :doc:`LanguageGuide/BasicTypes`
* Re-ordered the :doc:`LanguageGuide/ControlFlow` chapter to move :ref:`ControlFlow_ControlTransferStatements` to their own section at the end of the document
* Removed the (empty) *Interacting With Objective-C and Cocoa* chapter, as this will now be covered in a separate document
* Consistency improvements around wording and new term definitions throughout the Guide

January 21 2014
~~~~~~~~~~~~~~~

Language Guide
++++++++++++++

* Added the first few sections of a draft chapter about :doc:`LanguageGuide/ClassesAndStructures`
* Enumerations have been extracted out of :doc:`LanguageGuide/BasicTypes` and given their own chapter called :doc:`LanguageGuide/Enumerations`
* ``let`` constants have been added to :doc:`LanguageGuide/BasicTypes`
* The ‘Declaring and Naming Variables’ section of :doc:`LanguageGuide/BasicTypes` is now called ‘Named Values’, and talks about both ``let`` constants and ``var`` variables
* Most mentions of ‘variables’ have been changed to talk about ‘named values’
* Most ``var`` declarations have become ``let`` declarations
* Removed mention of the ``reverse()`` function from :doc:`LanguageGuide/ControlFlow`, as it is no longer available
* Removed ``Int128`` and ``UInt128`` from :doc:`LanguageGuide/BasicTypes`, as they don't actually exist
* Removed mention of ``Float32`` and ``Float64``, and standardized on ``Float`` and ``Double``
* The ``%`` operator is now correctly called a ‘remainder operator’ rather than a ‘modulo operator’ in :doc:`LanguageGuide/Operators`
* Improved and expanded the description of the remainder operator in :doc:`LanguageGuide/Operators`, including a description of how it works with negative numbers
* Other wording improvements throughout the Guide based on initial feedback

Reference Manual
++++++++++++++++

* Added a rough draft of the :doc:`ReferenceManual/Statements` chapter.

