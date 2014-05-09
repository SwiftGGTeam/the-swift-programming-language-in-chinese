Introduction
============

*The Swift Programming Language* is one of the documents we’ll be publishing at WWDC. The chapters available here are a work in progress, and change fairly frequently (please see the `Change Log`_ for a list of recent changes).

Chapters that have not yet been written are indicated with an [x] after their name. These chapters will be added as soon as an initial draft is available.

Please send any comments on this book to the Developer Publications Swift Discuss list (`Developer Publications-swift-discuss@group.apple.com <mailto:Developer Publications-swift-discuss@group.apple.com?subject=The%20Swift%20Programming%20Language%20book>`_).

Contents
========

.. toctree::
    :maxdepth: 1

    GuidedTour/GuidedTour
    LanguageGuide/index
    ReferenceManual/index

Change Log
----------

May 8 2014
~~~~~~~~~~

Language Reference
++++++++++++++++++

* Updated draft of the :doc:`ReferenceManual/Attributes` chapter.
  This chapter has now been through the editorial process and is much improved.
* The :doc:`ReferenceManual/Statements` chapter now covers labeled statements.

May 5 2014
~~~~~~~~~~

Language Guide
++++++++++++++++++

* New sections in :ref:`Functions <Functions_FunctionParameterNames>`,
  :ref:`Methods <Methods_LocalAndExternalNames>`,
  and :ref:`Initialization <Initialization_LocalAndExternalNames>`
  about the revised parameter syntax and rules.
  This has also involved a fairly major rewrite of the entire
  :doc:`LanguageGuide/Functions` chapter.
* New sections about
  :ref:`implicitly unwrapped optionals <TheBasics_ImplicitlyUnwrappedOptionals>`
  and :ref:`when to use them as properties <Initialization_ImplicitlyUnwrappedOptionalProperties>`.
* New information about :ref:`named tuple elements <TheBasics_Tuples>`,
  and examples of how to use them with
  :ref:`function parameters <Functions_TupleTypesAsParameterTypes>`
  and :ref:`function return types <Functions_TupleTypesAsReturnTypes>`.
* :ref:`Convenience initializers <Initialization_SyntaxForDesignatedAndConvenienceInitializers>`
  now use the ``convenience`` keyword.
* Renamed Basic Types to :doc:`LanguageGuide/TheBasics`,
  and changed its introduction completely.
* The base unit of a ``String`` is now ``Character``, not ``UnicodeScalar``.
  Updated all examples to match.
* New outline example for writing :ref:`multiple trailing closures <Closures_TrailingClosures>`,
  and re-ordered the :doc:`LanguageGuide/Closures` chapter to put
  :ref:`closure expressions <Closures_ClosureExpressions>`
  before :ref:`capturing values <Closures_CapturingValues>`.
* Switched the entire *Guide* over to using
  :ref:`array shorthand syntax <CollectionTypes_ArrayTypeShorthandSyntax>`
  now that it can be used to initialize a new array (``String[]()``).

April 28 2014
~~~~~~~~~~~~~

Language Guide
++++++++++++++++++

* New section about :ref:`assertions <TheBasics_Assertions>`,
  and :ref:`suggestions on when to use them <TheBasics_WhenToUseAssertions>`.
  Also updated the :ref:`subscripts matrix example <Subscripts_SubscriptOptions>`
  to use assertions rather than an optional subscript return type.
* New section about :ref:`labeled control flow statements <ControlFlow_LabeledStatements>`,
  and updates to the :doc:`LanguageGuide/ControlFlow` chapter in light of the fact that
  ``break`` now breaks out of a ``switch`` statement,
  and is the new preferred way to provide an empty ``switch`` case.
* New section on :ref:`inout parameters <Functions_InoutParameters>`.
* New section about :ref:`setting a default property value with a closure
  <Initialization_SettingADefaultPropertyValueWithAClosure>`.
* New sections on :ref:`static properties <Properties_StaticProperties>`
  and :ref:`type methods <Methods_TypeMethods>`.
* New section about :ref:`protocol compositions <Protocols_ProtocolComposition>`.
* Editorial improvements to :doc:`LanguageGuide/CollectionTypes`,
  including advice about bounds / key checking.
* Updated code style throughout the Guide for consistency with our emerging Swift style.

April 22 2014
~~~~~~~~~~~~~

Language Reference
++++++++++++++++++

* Added a draft of the :doc:`ReferenceManual/Attributes` chapter.
  **NOTE:** Information about the 'availability' attribute is not yet written.

April 21 2014
~~~~~~~~~~~~~

Language Guide
++++++++++++++++++

* Major new section about :ref:`initializer delegation for class types
  <Initialization_InitializerDelegationForClassTypes>`
* New section on :ref:`required initializers <Initialization_RequiredInitializers>`
* New section on :ref:`overriding properties <Inheritance_OverridingProperties>`
* Stopped using the phrase “named values” to refer to constants and variables.
* Major revision to the :doc:`LanguageGuide/TheBasics` introduction to talk about types in Swift.
* New and expanded introductions to :doc:`LanguageGuide/BasicOperators`, :doc:`LanguageGuide/ControlFlow`,
  :doc:`LanguageGuide/Enumerations`, :doc:`LanguageGuide/Functions`,
  :doc:`LanguageGuide/Methods`, and :doc:`LanguageGuide/Properties`.

April 17 2014
~~~~~~~~~~~~~

Language Reference
++++++++++++++++++

* Added a draft of the :doc:`ReferenceManual/AboutTheLanguageReference` chapter.
  **NOTE:** The title of this chapter was previously "Introduction".
  The "Reference Manual" is now know as the "Language Reference" for the sake of parity with
  the "Language Guide".

April 15 2014
~~~~~~~~~~~~~

Guided Tour
+++++++++++

* New chapter with several completed sections, presenting a :doc:`guided tour <GuidedTour/GuidedTour>` of the language.

Language Guide
++++++++++++++

* Updated the :doc:`LanguageGuide/Functions` chapter to use and describe the new unified function declaration syntax.
* Converted all initializers in the Guide over to the new unified function declaration syntax.
* New section on :ref:`checking for protocol conformance <Protocols_CheckingForProtocolConformance>`.
* New section on :ref:`optional protocol requirements <Protocols_OptionalProtocolRequirements>`.
* The protocol examples for :ref:`delegates <Protocols_Delegates>` now use optional chaining.
* Restructured the :doc:`LanguageGuide/Initialization` chapter, and added a new section about
  :ref:`initializer delegation for value types <Initialization_InitializerDelegationForValueTypes>`.
* Started to update the :ref:`property observers <Properties_PropertyObservers>` description
  to talk about property overriding now that stored properties can be overridden.
* Updates throughout the Guide now that optionals are default-initialized to ``nil``.

Language Reference
++++++++++++++++++

* Added a draft of the :doc:`ReferenceManual/Patterns` chapter.
* Updated the grammar for :ref:`function <Declarations_FunctionDeclaration>`,
  :ref:`initializer <Declarations_InitializerDeclaration>`,
  and :ref:`subscript <Declarations_SubscriptDeclaration>` declarations
  to account for the new unified function syntax.
* Corrected some issues with the :ref:`enumeration <Declarations_EnumerationDeclaration>`
  declaration grammar.

April 9 2014
~~~~~~~~~~~~

Language Guide
++++++++++++++

* New chapter on :doc:`closures <LanguageGuide/Closures>`.
* New section about working with :ref:`function types <Functions_FunctionTypes>`.
* New section about :ref:`nested functions <Functions_NestedFunctions>`.
* New sections about :ref:`comments <TheBasics_Comments>` and :ref:`semicolons <TheBasics_Semicolons>`.
* New section about :ref:`nil <TheBasics_Nil>` as it is used in the context of optionals.
* ``nil`` is now used throughout the *Guide* instead of ``.None``.
* Improved our advice about :ref:`naming of generic type parameters <Generics_NamingOfTypeParameters>`.
* Moved :ref:`type aliases <TheBasics_TypeAliases>` back to the Basic Types chapter,
  and changed the example to suit.
* Updated the :ref:`dictionaries <CollectionTypes_Dictionaries>` section
  to reflect that dictionaries will once again be iterated as ``(key, value)`` tuples.
* Updated the :ref:`arrays <CollectionTypes_Arrays>` section to reflect the fact that
  ``array.insert`` now requires the index to be written before the value,
  and the fact that ``array.removeAt`` now returns the removed value.
* Updated the :ref:`overriding <Inheritance_Overriding>` section now that ``override`` is a keyword.
* Incorporated editorial feedback on several chapters.

Language Reference
++++++++++++++++++

* Updated the formal grammar and surrounding prose for the ``switch`` statement in :ref:`Statements_SwitchStatement`.
* Incorporated various editorial feedback on the :doc:`ReferenceManual/GenericParametersAndArguments` chapter.

April 1 2014
~~~~~~~~~~~~

Language Reference
++++++++++++++++++

* Added a draft of the :doc:`ReferenceManual/GenericParametersAndArguments` chapter.
  **NOTE:** The title of this chapter was previously "Generics".
* Incorporated various editorial feedback to the :doc:`ReferenceManual/Declarations` chapter.
  There are still a few placeholder sections in this chapter.

March 31 2014
~~~~~~~~~~~~~

Language Guide
++++++++++++++

* First draft of half of a chapter about :doc:`LanguageGuide/Generics`
* Added information about :ref:`Any / AnyObject <TypeCasting_AnyAndAnyObject>`
  and :ref:`checked casts in switch statements <TypeCasting_CheckedCastsInSwitchStatements>`
* Described how the :ref:`identity operators <ClassesAndStructures_IdentityOperators>` work,
  and how to implement :ref:`equivalence operators <AdvancedOperators_EquivalenceOperators>`
  for your own types
* Added information about :ref:`TheBasics_UInt` and :ref:`TheBasics_Comments` in Basic Types
* Improved wording for the
  :ref:`increment and decrement operators <BasicOperators_IncrementAndDecrementOperators>`

March 21 2014
~~~~~~~~~~~~~

Language Guide
++++++++++++++

* New information about creating :doc:`LanguageGuide/CollectionTypes` from literals,
  and inferring the type of an array
* Updated the :ref:`ControlFlow_Switch` description to give more of an introduction,
  and to reflect an upcoming change to ``switch`` to ban empty cases
* Custom Types has been split into :doc:`LanguageGuide/ClassesAndStructures`
  and :doc:`LanguageGuide/NestedTypes`
* Expanded the :doc:`LanguageGuide/NestedTypes` example now that it is later in the book

March 18 2014
~~~~~~~~~~~~~

Language Guide
++++++++++++++

* Added a new chapter about :doc:`LanguageGuide/CollectionTypes`
* Rewritten much of the :doc:`LanguageGuide/Initialization` chapter to clarify the rules about property initialization
* Removed all information about Initializer Delegation, because it's no longer correct
  (and a new version about designated and convenience initializers has not yet been written)
* Added a new section about the fact that you can't set
  :ref:`stored properties of constant structure instances
  <Properties_StoredPropertiesOfConstantStructureInstances>`
* New sections on :ref:`Protocols_AddingProtocolConformanceWithAnExtension`,
  :ref:`Protocols_CollectionsOfProtocolTypes`,
  and :ref:`Protocols_ProtocolInheritance`
* ``self`` is now a :ref:`property of every value in Swift <Methods_TheSelfProperty>` –
  updated the Methods chapter to match,
  and rewritten much of the information about ``mutating`` to focus it on
  :ref:`Methods_ModifyingValueTypesFromWithinInstanceMethods`
* Simplified the example of :ref:`read-only subscript <Subscripts_SubscriptSyntax>`
* :ref:`ClassesAndStructures_DefinitionSyntax` no longer uses
  a Rectangle as an example for a custom class type
* Added a short section on :ref:`type aliases <TheBasics_TypeAliases>`
  (as used in a non-Generics context)
* Clarified what can be :ref:`overridden <Inheritance_Overriding>`
* Moved :doc:`LanguageGuide/Subscripts` into its own chapter

Language Reference
++++++++++++++++++

* Added a draft of the :doc:`ReferenceManual/Declarations` chapter.
  There are still a few placeholder sections in this chapter.
* The grammar for attributes has been removed from
  the :doc:`ReferenceManual/Declarations` chapter and given its own chapter,
  :doc:`ReferenceManual/Attributes`. This chapter currently contains grammar only.
* **NOTE:** The grammar in the :doc:`ReferenceManual/Expressions`
  chapter is out of date. It will be updated shortly.


March 12 2014
~~~~~~~~~~~~~

Language Guide
++++++++++++++

* Added the first half of a chapter on :doc:`LanguageGuide/Protocols`
* Epic refactoring of the old Classes and Structures chapter into new chapters called
  Custom Types, :doc:`LanguageGuide/Properties`, :doc:`LanguageGuide/Methods`,
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
* New section on :doc:`LanguageGuide/Subscripts`
* New section about mutating ``self`` in :ref:`enumeration instance methods <Methods_ModifyingValueTypesFromWithinInstanceMethods>`
* New sections about :ref:`TheBasics_PrintingConstantsAndVariables`
  and :ref:`TheBasics_StringInterpolation` in Basic Types
* Improved examples for :ref:`ControlFlow_While` and :ref:`ControlFlow_Break`,
  and a new example for :ref:`ControlFlow_DoWhile`
* Embedded Types are now referred to as :doc:`LanguageGuide/NestedTypes`,
  and their example has been simplified
* Moved :ref:`TheBasics_OptionalBinding` into the :doc:`LanguageGuide/TheBasics` chapter,
  and adopted it for several more examples throughout the book
* :ref:`didSet <Properties_PropertyObservers>` now has an ``oldValue`` parameter
* Updates to bring code examples in line with this week's Swift release
* Lots of editorial and technical improvements based on reader feedback (thank you!)

Language Reference
++++++++++++++++++

* Minor formal grammar updates to the :doc:`ReferenceManual/LexicalStructure` chapter.
* **NOTE:** The grammar in the :doc:`ReferenceManual/Declarations` and :doc:`ReferenceManual/Expressions`
  chapters are out of date. They will be updated shortly.


February 28 2014
~~~~~~~~~~~~~~~~

Language Reference
++++++++++++++++++

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
* Added information about the new :ref:`@override attribute <Inheritance_Overriding>`
* Improved descriptions for :ref:`the implicit self parameter <Methods_TheSelfProperty>`
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
* New section on :ref:`self <Methods_TheSelfProperty>` and ``mutating`` structure methods
* :ref:`Properties_PropertyObservers` and :ref:`Properties_ComputedProperties` now all use curly braces
* Information about the :ref:`BasicOperators_ClosedRangeOperator` (``..``)
* Re-ordered the :doc:`LanguageGuide/ControlFlow` chapter
* ``String`` no longer has a ``length`` property
* :doc:`LanguageGuide/Extensions` and :doc:`LanguageGuide/Protocols` are now separate chapters (but are not yet written)
* We no longer refer to getters, setters, observers and initializers as “methods”
* Placeholder sections for Arrays and Dictionaries (but no content as yet) in :doc:`LanguageGuide/TheBasics`
* Editorial changes and improvements throughout the *Guide*

Language Reference
++++++++++++++++++

* Updated the :doc:`ReferenceManual/Statements` chapter to account for optional binding in ``if`` and ``while`` statements.
  Also simplified the grammar by making expressions and declarations be kinds of statements.
  This chapter has now has an editorial pass.
* Added a draft of the :doc:`ReferenceManual/LexicalStructure` chapter.
* Added a draft of the :doc:`ReferenceManual/Types` chapter.
  There are still a few placeholder sections in this chapter.
