Change Log
==========

.. note::

   This chapter will be removed on May 21, 2014.

The book has the following known issues:

.. Note: These are not the actual titles of the bugs,
   but rather a description of the impact each bug
   has on the resulting build of the book.

* <rdar://16756239> Indentation is missing in Xcode-style code outlines.
* <rdar://16756034> Formal grammar does not contain live links.
* <rdar://16844985> Guided Tour has lines that don't compile in latest Swift
* <rdar://16893324> The PDF version of TSPL is a mockup.
* The iBook link is a placeholder
  until this book goes live on the iBooks store WWDC week.
  Use the EPUB link instead (which will go away at the same time).

May 19 2014
~~~~~~~~~~~

Language Guide
++++++++++++++

* New chapter about :doc:`../LanguageGuide/OptionalChaining`.
* New sections in Generics about :ref:`associated types <Generics_AssociatedTypes>`
  and :ref:`where clauses <Generics_WhereClauses>`.
* New section about :ref:`lazy stored properties <Properties_LazyStoredProperties>`.
* Lots of additions and updates to the :doc:`../LanguageGuide/CollectionTypes` chapter
  to reflect recent changes to the Array and Dictionary APIs.
* Modified the introduction to :ref:`optionals <TheBasics_Optionals>`
  to reflect the fact that the ``toInt`` method on ``String`` is being removed.
* Renamed the Static Properties section to be called
  :ref:`Type Properties <Properties_TypeProperties>`,
  and added information about computed class and static properties.
* Protocols can now specify :ref:`type property requirements <Protocols_Properties>`.
* New section about :ref:`mutating method requirements in protocols
  <Protocols_MutatingMethodRequirements>`.
* Switched the two :ref:`range operators <BasicOperators_RangeOperators>`
  throughout the Guide.
* API updates in the :doc:`../LanguageGuide/StringsAndCharacters` chapter.
* The Memory Management chapter is now called
  :doc:`../LanguageGuide/AutomaticReferenceCounting`.
* Deinitialization is now in its own chapter called, appropriately enough,
  :doc:`../LanguageGuide/Deinitialization`.

May 15 2014
~~~~~~~~~~~

Guided Tour
+++++++++++

* Added a section about enumerations and structures,
  and added some information about optionals.

May 14 2014
~~~~~~~~~~~

* The content of this book is now on [Tool P],
  which shows it using the formatting and layout
  that will actually ship at WWDC.
  This format also includes an EPUB version,
  linked at the top right of the page.
  (At WWDC, the EPUB link will go away, and the iBook link will become live.)
* The language name has been updated to "Swift" throughout the prose.

Language Guide
++++++++++++++

* :ref:`External parameter names <Functions_ExternalParameterNames>`
  are now qualified with ``#``, not `````.
* Renamed local functions back to :ref:`nested functions <Functions_NestedFunctions>`.

May 12 2014
~~~~~~~~~~~

Language Guide
++++++++++++++

* New :doc:`../LanguageGuide/AutomaticReferenceCounting` chapter, including sections on
  :ref:`how ARC works <AutomaticReferenceCounting_HowARCWorks>`,
  and :ref:`strong reference cycles <AutomaticReferenceCounting_StrongReferenceCycles>`.
* Rewritten much of :doc:`../LanguageGuide/Generics`
  to make the introduction more accessible to those who are new to generic programming.
* Added some explanations of :ref:`unicode terminology <StringsAndCharacters_Unicode>`
  to :doc:`../LanguageGuide/StringsAndCharacters`.
* Renamed nested functions to :ref:`local functions <Functions_NestedFunctions>`.
* Incorporated lots of technical feedback from the compiler team.


May 9 2014
~~~~~~~~~~

Language Guide
++++++++++++++

* New chapter on :doc:`../LanguageGuide/StringsAndCharacters`.
  (Note that some of the API names used in this chapter may yet change.)
* Single-quoted literals (for ``Character`` values) are no longer a part of the language.
* The entire Guide has been updated to match the latest function and method parameter rules.
* Removed the guidance on multiple trailing closures
  now that they have been removed from the language.

May 8 2014
~~~~~~~~~~

Language Reference
++++++++++++++++++

* Updated draft of the :doc:`../ReferenceManual/Attributes` chapter.
  This chapter has now been through the editorial process and is much improved.
* The :doc:`../ReferenceManual/Statements` chapter now covers labeled statements.

May 5 2014
~~~~~~~~~~

Language Guide
++++++++++++++

* New sections in :ref:`Functions <Functions_FunctionParameterNames>`,
  :ref:`Methods <Methods_LocalAndExternalNames>`,
  and :ref:`Initialization <Initialization_LocalAndExternalNames>`
  about the revised parameter syntax and rules.
  This has also involved a fairly major rewrite of the entire
  :doc:`../LanguageGuide/Functions` chapter.
* New sections about
  :ref:`implicitly unwrapped optionals <TheBasics_ImplicitlyUnwrappedOptionals>`
  and when to use them as properties.
* New information about :ref:`named tuple elements <TheBasics_Tuples>`,
  and examples of how to use them with
  :ref:`function return types <Functions_TupleTypesAsReturnTypes>`.
* :ref:`Convenience initializers <Initialization_SyntaxForDesignatedAndConvenienceInitializers>`
  now use the ``convenience`` keyword.
* Renamed Basic Types to :doc:`../LanguageGuide/TheBasics`,
  and changed its introduction completely.
* The base unit of a ``String`` is now ``Character``, not ``UnicodeScalar``.
  Updated all examples to match.
* New outline example for writing :ref:`multiple trailing closures <Closures_TrailingClosures>`,
  and re-ordered the :doc:`../LanguageGuide/Closures` chapter to put
  :ref:`closure expressions <Closures_ClosureExpressions>`
  before :ref:`capturing values <Closures_CapturingValues>`.
* Switched the entire *Guide* over to using
  :ref:`array shorthand syntax <CollectionTypes_ArrayTypeShorthandSyntax>`
  now that it can be used to initialize a new array (``String[]()``).
