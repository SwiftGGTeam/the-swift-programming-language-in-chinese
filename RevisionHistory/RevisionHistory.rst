Document Revision History
=========================

This table describes the changes to *The Swift Programming Language*.

==========  ==========================================================================
Date        Notes
==========  ==========================================================================
2014-07-07  * Swift's ``Array`` type now has full value semantics.
              Updated the information about :ref:`CollectionTypes_MutabilityOfCollections`
              and :ref:`CollectionTypes_Arrays` to reflect the new approach.
              Also clarified the
              :ref:`ClassesAndStructures_AssignmentAndCopyBehaviorForStringsArraysAndDictionaries`.

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
