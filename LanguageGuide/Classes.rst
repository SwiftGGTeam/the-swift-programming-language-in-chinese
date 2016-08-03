Classes
=======

:newTerm:`Classes` in Swift provide much 
of the same functionality as structures,
albeit often at the expense 
of the improved safety, readability and performance 
that structures provide. 

Like structures, Classes can: 

* Define properties to store values
* Define methods to provide functionality
* Define subscripts to provide access to their values using subscript syntax
* Define initializers to set up their initial state
* Be extended to expand their functionality beyond a default implementation
* Conform to protocols to [fill in]

Classes have additional functionality that structures do not: 

* Inheritance enables one class to inherit the characteristics of another.
* Type casting enables you to check and interpret the type of a class instance at runtime.
* Deinitializers enable an instance of a class to free up any resources it has assigned.
* Reference counting allows more than one reference to a class instance.

For more information, see
:doc:`Inheritance`,
:doc:`TypeCasting`,
:doc:`Deinitialization`,
and :doc:`AutomaticReferenceCounting`.

For an in-depth discussion
of classes and structures and
when to use which,
see [chapter that has yet to be written]

.. _Classes_DefinitionSyntax:

Definition Syntax
-----------------

You introduce a class with the ``class`` keyword and place its definition
within a pair of braces: 

.. testcode:: Classes
    
    -> class someClass {
           // class definition goes here
       }   

Here is an example of a class definition: 

.. testcode:: Classes

    -> class ________ {
           // to be filled in
       }

[Explanation of Example]

.. _Classes_InitializerSyntax:

Initializer Syntax
------------------

.. _Classes_AccessingProperties:

Accessing Properties
--------------------

.. _Classes_ClassesAreReferenceTypes:

Classes Are Reference Types
---------------------------