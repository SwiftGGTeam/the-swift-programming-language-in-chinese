Document Revision History
=========================

This table describes the changes to *The Swift Programming Language*.

==========  ==========================================================================
Date        Notes
==========  ==========================================================================
2014-07-21  * Added a new chapter about :doc:`../LanguageGuide/AccessControl`.

            * Updated the :doc:`../LanguageGuide/StringsAndCharacters` chapter
              to reflect the fact that Swift's ``Character`` type now represents
              a single Unicode extended grapheme cluster.
              Includes a new section on
              :ref:`StringsAndCharacters_ExtendedGraphemeClusters`
              and more information about
              :ref:`StringsAndCharacters_StringsAreUnicodeScalars`
              and :ref:`StringsAndCharacters_ComparingStrings`.

            * Updated the :ref:`StringsAndCharacters_Literals` section
              to note that Unicode scalars inside string literals
              are now written as ``\u{n}``,
              where ``n`` is between one and eight hexadecimal digits.

            * The ``NSString`` ``length`` property is now mapped onto
              Swift's native ``String`` type as ``utf16Count``, not ``utf16count``.
              
            * Swift's native ``String`` type no longer has
              an ``uppercaseString`` or ``lowercaseString`` property.
              The corresponding section in
              :doc:`../LanguageGuide/StringsAndCharacters`
              has been removed, and various code examples have been updated.
              
            * Added a new section about
              :ref:`Initialization_InitializerParametersWithoutExternalNames`.

            * Added a new section about
              :ref:`Initialization_RequiredInitializers`.

            * Added a new section about :ref:`Functions_OptionalTupleReturnTypes`.
              
            * Updated the :ref:`TheBasics_TypeAnnotations` section to note that
              multiple related variables can be defined on a single line
              with one type annotation.
            
            * The ``@optional``, ``@lazy``, ``@final``, and ``@required`` attributes
              are now the ``optional``, ``lazy``, ``final``, and ``required``
              :ref:`Declarations_DeclarationModifiers`.
              
            * Updated the entire book to refer to ``..<`` as
              the :ref:`BasicOperators_HalfClosedRangeOperator`
              (rather than the “half-closed range operator”).
              
            * Updated the :ref:`CollectionTypes_AccessingAndModifyingADictionary`
              section to note that ``Dictionary`` now has
              a Boolean ``isEmpty`` property.
              
            * Clarified the full list of characters that can be used
              when defining :ref:`AdvancedOperators_CustomOperators`.
----------  --------------------------------------------------------------------------
2014-07-07  * Swift's ``Array`` type now has full value semantics.
              Updated the information about :ref:`CollectionTypes_MutabilityOfCollections`
              and :ref:`CollectionTypes_Arrays` to reflect the new approach.
              Also clarified the
              :ref:`ClassesAndStructures_AssignmentAndCopyBehaviorForStringsArraysAndDictionaries`.

            * :ref:`CollectionTypes_ArrayTypeShorthandSyntax` is now written as
              ``[SomeType]`` rather than ``SomeType[]``.

            * Added a new section about :ref:`CollectionTypes_DictionaryTypeShorthandSyntax`,
              which is written as ``[KeyType: ValueType]``.

            * Added a new section about :ref:`CollectionTypes_HashValuesForDictionaryKeyTypes`.

            * Examples of :ref:`Closures_ClosureExpressions` now use
              the global ``sorted`` function rather than the global ``sort`` function,
              to reflect the new array value semantics.

            * Updated the information about :ref:`Initialization_MemberwiseInitializersForStructureTypes`
              to clarify that the memberwise structure initializer is made available
              even if a structure's stored properties do not have default values.

            * Updated to ``..<`` rather than ``..``
              for the :ref:`BasicOperators_HalfClosedRangeOperator`.

            * Added an example of :ref:`Generics_ExtendingAGenericType`.
----------  --------------------------------------------------------------------------
2014-06-02  * New document that describes Swift,
              Apple’s new programming language for building iOS and OS X apps.
==========  ==========================================================================
