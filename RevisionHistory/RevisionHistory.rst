Document Revision History
=========================

This table describes the changes to *The Swift Programming Language*.

.. Not in this beta

            * Added the :ref:`LexicalStructure_CommentDocumentation` section
              to the :doc:`../ReferenceManual/LexicalStructure` chapter.

            * Added the :ref:`TheBasics_ImportDeclarations` section
              to the :doc:`../LanguageGuide/TheBasics` chapter.

==========  ==========================================================================
Date        Notes
==========  ==========================================================================
2015-08-06  * Updated the :ref:`ErrorHandling_Represent` section
              now that all types can conform to the ``ErrorType`` protocol.

            * Added information
              to the :ref:`Initialization_OverridingAFailableInitializer` section
              about how a nonfailable initializer can delegate
              up to a failable initializer
              by force-unwrapping the result of the superclass's initializer.

            * Added information about using enumeration cases as functions
              to the :ref:`Declarations_EnumerationsWithCasesOfAnyType` section.

            * Added information about explicitly referencing an initializer
              to the :ref:`Expressions_InitializerExpression` section.

            * Added information about build configuration
              and line control statements
              to the :ref:`Statements_CompilerControlStatements` section.

            * Added a note to the :ref:`Types_MetatypeType` section
              about constructing class instances from metatype values.

            * Added a note to the
              :ref:`AutomaticReferenceCounting_WeakReferencesBetweenClassInstances`
              section about weak references being unsuitable for caching.

            * Updated a note in the :ref:`Properties_TypeProperties` section
              to mention that stored type properties are lazily initialized.
----------  --------------------------------------------------------------------------
2015-07-21  * Added information about recursive enumerations
              to the :ref:`Enumerations_RecursiveEnumerations` section
              of the :doc:`../LanguageGuide/Enumerations` chapter
              and the :ref:`Declarations_EnumerationsWithCasesOfAnyType` section
              of the :doc:`../ReferenceManual/Declarations` chapter.

            * Added information about the behavior
              of enumeration cases with ``String`` raw values
              to the :ref:`Enumerations_ImplicitlyAssignedRawValues` section
              of the :doc:`../LanguageGuide/Enumerations` chapter
              and the :ref:`Declarations_EnumerationsWithRawCaseValues` section
              of the :doc:`../ReferenceManual/Declarations` chapter.

            * Updated the :ref:`Closures_CapturingValues` section
              to clarify how variables and constants are captured in closures.

            * Updated the :ref:`Attributes_DeclarationAttributes` section
              to describe when you can apply the ``@objc`` attribute to classes.

            * Added a note to the :ref:`ErrorHandling_Catch` section
              about the performance of executing a ``throw`` statement.
              Added similar information about the ``do`` statement
              in the :ref:`Statements_DoStatement` section.
----------  --------------------------------------------------------------------------
2015-06-08  * Updated for Swift 2.0.

            * Added information about error handling
              to the :doc:`../LanguageGuide/ErrorHandling` chapter,
              the :ref:`Statements_DoStatement` section,
              the :ref:`Statements_ThrowStatement` section,
              the :ref:`Statements_DeferStatement` section,
              and the :ref:`Expressions_TryExpression` section.

            * Added information about API availability checking
              to the :ref:`ControlFlow_Available` section
              of the :doc:`../LanguageGuide/ControlFlow` chapter
              and the :ref:`Statements_AvailabilityCondition` section
              of the :doc:`../ReferenceManual/Statements` chapter.

            * Added information about the new ``guard`` statement
              to the :ref:`ControlFlow_Guard` section
              of the :doc:`../LanguageGuide/ControlFlow` chapter
              and the :ref:`Statements_GuardStatement` section
              of the :doc:`../ReferenceManual/Statements` chapter.

            * Added information about protocol extensions
              to the :ref:`Protocols_Extensions` section
              of the :doc:`../LanguageGuide/Protocols` chapter.

            * Added information about access control for unit testing
              to the :ref:`AccessControl_AccessLevelsForTestTargets` section
              of the :doc:`../LanguageGuide/AccessControl` chapter.

            * Added information about the new optional pattern
              to the :ref:`Patterns_OptionalPattern` section
              of the :doc:`../ReferenceManual/Patterns` chapter.

            * Updated the :ref:`ControlFlow_DoWhile` section
              with information about the the ``repeat``-``while`` loop.

            * Updated the :ref:`Properties_TypeProperties` section
              with information about stored and computed type properties
              for classes, structures, and enumerations.

            * Updated the :ref:`Statements_BreakStatement` section
              with information about labeled break statements.

            * Updated the :ref:`Attributes_DeclarationAttributes` section
              with information about the ``@available``
              and ``@warn_unused_result`` attributes.

            * Updated the :ref:`Attributes_TypeAttributes` section
              with information about the ``@convention`` attribute.

            * Updated a note in the :ref:`Properties_PropertyObservers` section
              to clarify the behavior of ``willSet`` and ``didSet`` observers.

            * Added a note to the :ref:`AccessControl_AccessLevels` section
              with information about the scope of ``private`` access.

            * Added a note to the
              :ref:`AutomaticReferenceCounting_WeakReferencesBetweenClassInstances`
              section about the differences in weak references
              between garbage collected systems and ARC.

            * Updated the
              :ref:`StringsAndCharacters_SpecialCharactersInStringLiterals` section
              with a more precise definition of Unicode scalars.

            * Updated the :doc:`../LanguageGuide/StringsAndCharacters` chapter
              now that ``String`` no longer conforms
              to the ``CollectionType`` protocol from the Swift standard library.
----------  --------------------------------------------------------------------------
2015-04-08  * Swift now has a native ``Set`` collection type.
              For more information, see :ref:`CollectionTypes_Sets`.

            * ``@autoclosure`` is now an attribute of the parameter declaration,
              not its type.
              There is also a new ``@noescape`` parameter declaration attribute.
              For more information, see :ref:`Attributes_DeclarationAttributes`.

            * Type methods and properties now use the ``static`` keyword
              as a declaration modifier.
              For more information see :ref:`Declarations_TypeVariableProperties`.

            * Swift now includes the ``as?`` and ``as!`` failable downcast operators.
              For more information,
              see :ref:`Protocols_CheckingForProtocolConformance`.

            * Added a new guide section about
              :ref:`StringsAndCharacters_StringIndices`.

            * Removed the overflow division (``&/``) and
              overflow remainder (``&%``) operators
              from :ref:`AdvancedOperators_OverflowOperators`.

            * Updated the rules for constant and
              constant property declaration and initialization.
              For more information, see :ref:`Declarations_ConstantDeclaration`.

            * Updated the definition of Unicode scalars in string literals.
              See :ref:`StringsAndCharacters_SpecialCharactersInStringLiterals`.

            * Updated :ref:`BasicOperators_RangeOperators` to note that
              a half-open range with the same start and end index will be empty.

            * Updated :ref:`Closures_ClosuresAreReferenceTypes` to clarify
              the capturing rules for variables.

            * Updated :ref:`AdvancedOperators_ValueOverflow` to clarify
              the overflow behavior of signed and unsigned integers

            * Updated :ref:`Declarations_ProtocolDeclaration` to clarify
              protocol declaration scope and members.

            * Updated :ref:`AutomaticReferenceCounting_DefiningACaptureList`
              to clarify the syntax for
              weak and unowned references in closure capture lists.

            * Updated :ref:`LexicalStructure_Operators` to explicitly mention
              examples of supported characters for custom operators,
              such as those in the Mathematical Operators, Miscellaneous Symbols,
              and Dingbats Unicode blocks.
----------  --------------------------------------------------------------------------
2015-02-09  * Constants can now be declared without being initialized
              in local function scope.
              They must have a set value before first use.
              For more information, see :ref:`Declarations_ConstantDeclaration`.

            * In an initializer, constant properties can now only assign a value once.
              For more information,
              see :ref:`Initialization_ModifyingConstantPropertiesDuringInitialization`.

            * Multiple optional bindings can now appear in a single ``if`` statement
              as a comma-separated list of assignment expressions.
              For more information, see :ref:`TheBasics_OptionalBinding`.

            * An :ref:`Expression_OptionalChainingOperator`
              must appear within a postfix expression.

            * Protocol casts are no longer limited to ``@objc`` protocols.

            * Type casts that can fail at runtime
              now use the ``as?`` or ``as!`` operator,
              and type casts that are guaranteed not to fail use the ``as`` operator.
              For more information, see :ref:`Expressions_Type-CastingOperators`.
----------  --------------------------------------------------------------------------
2014-10-16  * Added a full guide to :ref:`Initialization_FailableInitializers`.

            * Added a description of :ref:`Protocols_FailableInitializerRequirements`
              for protocols.

            * Constants and variables of type ``Any`` can now contain
              function instances. Updated the example for :ref:`TypeCasting_Any`
              to show how to check for and cast to a function type
              within a ``switch`` statement.
----------  --------------------------------------------------------------------------
2014-09-15  * Enumerations with raw values
              now have a ``rawValue`` property rather than a ``toRaw()`` method
              and a failable initializer with a ``rawValue`` parameter
              rather than a ``fromRaw()`` method.
              For more information, see :ref:`Enumerations_RawValues`
              and :ref:`Declarations_EnumerationsWithRawCaseValues`.
----------  --------------------------------------------------------------------------
2014-09-09  * Added a new reference section about
              :ref:`Declarations_FailableInitializers`,
              which can trigger initialization failure.

            * Custom operators can now contain the ``?`` character.
              Updated the :ref:`LexicalStructure_Operators` reference to describe
              the revised rules.
              Removed a duplicate description of the valid set of operator characters
              from :ref:`AdvancedOperators_CustomOperators`.
----------  --------------------------------------------------------------------------
2014-08-18  * Added a new section about
              :ref:`Protocols_InitializerRequirements` in protocols.

            * Added a new section about :ref:`Protocols_ClassOnlyProtocols`.

            * :ref:`TheBasics_Assertions` can now use string interpolation.
              Removed a note to the contrary.

            * Updated the
              :ref:`StringsAndCharacters_ConcatenatingStringsAndCharacters` section
              to reflect the fact that ``String`` and ``Character`` values
              can no longer be combined with the addition operator (``+``)
              or addition assignment operator (``+=``).
              These operators are now used only with ``String`` values.
              Use the ``String`` type's ``append(_:)`` method
              to append a single ``Character`` value onto the end of a string.

            * Added information about the ``availability`` attribute to
              the :ref:`Attributes_DeclarationAttributes` section.
----------  --------------------------------------------------------------------------
2014-08-04  * :ref:`TheBasics_Optionals` no longer implicitly evaluate to
              ``true`` when they have a value and ``false`` when they do not,
              to avoid confusion when working with optional ``Bool`` values.
              Instead, make an explicit check against ``nil``
              with the ``==`` or ``!=`` operators
              to find out if an optional contains a value.

            * Swift now has a :ref:`BasicOperators_NilCoalescingOperator`
              (``a ?? b``), which unwraps an optional's value if it exists,
              or returns a default value if the optional is ``nil``.

            * Updated and expanded
              the :ref:`StringsAndCharacters_ComparingStrings` section
              to reflect and demonstrate that string and character comparison
              and prefix / suffix comparison are now based on
              Unicode canonical equivalence of extended grapheme clusters.

            * You can now try to set a property's value, assign to a subscript,
              or call a mutating method or operator through
              :doc:`../LanguageGuide/OptionalChaining`.
              The information about
              :ref:`OptionalChaining_CallingPropertiesThroughOptionalChaining`
              has been updated accordingly,
              and the examples of checking for method call success in
              :ref:`OptionalChaining_CallingMethodsThroughOptionalChaining`
              have been expanded to show how to check for property setting success.

            * Added a new section about
              :ref:`OptionalChaining_AccessingSubscriptsOfOptionalType`
              through optional chaining.

            * Updated the :ref:`CollectionTypes_AccessingAndModifyingAnArray` section
              to note that you can no longer append a single item to an array
              with the ``+=`` operator.
              Instead, use the ``append(_:)`` method,
              or append a single-item array with the ``+=`` operator.

            * Added a note that the start value ``a``
              for the :ref:`BasicOperators_RangeOperators` ``a...b`` and ``a..<b``
              must not be greater than the end value ``b``.

            * Rewrote the :doc:`../LanguageGuide/Inheritance` chapter
              to remove its introductory coverage of initializer overrides.
              This chapter now focuses more on the addition of
              new functionality in a subclass,
              and the modification of existing functionality with overrides.
              The chapter's example of
              :ref:`Inheritance_OverridingPropertyGettersAndSetters`
              has been rewritten to show how to override a ``description`` property.
              (The examples of modifying an inherited property's default value
              in a subclass initializer have been moved to
              the :doc:`../LanguageGuide/Initialization` chapter.)

            * Updated the
              :ref:`Initialization_InitializerInheritanceAndOverriding` section
              to note that overrides of a designated initializer
              must now be marked with the ``override`` modifier.

            * Updated the :ref:`Initialization_RequiredInitializers` section
              to note that the ``required`` modifier is now written before
              every subclass implementation of a required initializer,
              and that the requirements for required initializers
              can now be satisfied by automatically inherited initializers.

            * Infix :ref:`AdvancedOperators_OperatorFunctions` no longer require
              the ``@infix`` attribute.

            * The ``@prefix`` and ``@postfix`` attributes
              for :ref:`AdvancedOperators_PrefixAndPostfixOperators`
              have been replaced by ``prefix`` and ``postfix`` declaration modifiers.

            * Added a note about the order in which
              :ref:`AdvancedOperators_PrefixAndPostfixOperators` are applied
              when both a prefix and a postfix operator are applied to
              the same operand.

            * Operator functions for
              :ref:`AdvancedOperators_CompoundAssignmentOperators` no longer use
              the ``@assignment`` attribute when defining the function.

            * The order in which modifiers are specified when defining
              :ref:`AdvancedOperators_CustomOperators` has changed.
              You now write ``prefix operator`` rather than ``operator prefix``,
              for example.

            * Added information about the ``dynamic`` declaration modifier
              in :ref:`Declarations_DeclarationModifiers`.

            * Added information about how type inference works
              with :ref:`LexicalStructure_Literals`.

            * Added more information about :ref:`Declarations_CurriedFunctions`.
----------  --------------------------------------------------------------------------
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
              where ``n`` is a hexadecimal number between 0 and 10FFFF,
              the range of Unicode's codespace.

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

            * ``nil`` and the Booleans ``true`` and ``false`` are now :ref:`LexicalStructure_Literals`.
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

            * Added a new section about :ref:`CollectionTypes_HashValuesForSetTypes`.

            * Examples of :ref:`Closures_ClosureExpressions` now use
              the global ``sorted(_:_:)`` function
              rather than the global ``sort(_:_:)`` function,
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
