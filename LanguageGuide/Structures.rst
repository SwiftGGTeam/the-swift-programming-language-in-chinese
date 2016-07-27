Structures
==========

:newTerm:'Structures' in Swift are not the Structures you know coming from
other languages like C. They are far more powerful, providing new ways to 
architect your code.

Structures are first-class value types.

.. _Structures_DefinitionSyntax:

Definition Syntax
-----------------

You introduce structures with the ``struct`` keyword and place their
definition within a pair of braces: 

.. testcode:: Structures
	
	-> struct someStructure {
		// structure definition goes here
	}
	
.. note::

   Whenever you define a new structure, you effectively define a 
   brand new Swift type. Give types ``UpperCamelCase`` names
   (such as ``SomeStructure`` here) to match the capitalization 
   of standard Swift types (such as ``String``, ``Int``, and ``Bool``).
   Conversely, always give properties and methods ``lowerCamelCase`` names
   (such as ``frameRate`` and ``incrementCount``)to differentiate them 
   from type names.

Here is an example of a structure definition: 

.. testcode:: Structures 

	-> struct _____ {
		// to be filled in
	}
	
[Explanation of example]

.. _Structures_InitializerSyntax:

Initializer Syntax
------------------

.. _Structures_MemberwiseInitializer:

Memberwise Initializer
~~~~~~~~~~~~~~~~~~~~~~

.. _Structures_AccessingProperties:

Accessing Properties
--------------------

.. _Structures_StructuresAreValueTypes:

Structures Are Value Types
--------------------------

.. _Structures_StructureUsage:

Structure Usage
---------------
 