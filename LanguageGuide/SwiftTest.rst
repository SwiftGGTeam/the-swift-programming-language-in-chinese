SwiftTest
=========

.. _SwiftTest_ConstantsAndVariables:

Constants and Variables
-----------------------

Constants and variables associate a name
(such as ``maximumNumberOfLoginAttempts`` or ``welcomeMessage``)
with a value of a particular type
(such as the number ``10`` or the string ``"Hello"``).
The value of a :newTerm:`constant` cannot be changed once it is set,
whereas a :newTerm:`variable` can be set to a different value in the future.

.. _SwiftTest_DeclaringConstantsAndVariables:

Declaring Constants and Variables
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Constants and variables must be declared before they are used.
You declare constants with the ``let`` keyword
and variables with the ``var`` keyword.
Here's an example of how constants and variables can be used
to track the number of login attempts a user has made:

.. testcode:: constantsAndVariables

   -> let maximumNumberOfLoginAttempts = 10
   << // maximumNumberOfLoginAttempts : Int = 10
   -> var currentLoginAttempt = 0
   << // currentLoginAttempt : Int = 0

This code can be read as:

“Declare a new constant called ``maximumNumberOfLoginAttempts``,
and give it a value of ``10``.
Then, declare a new variable called ``currentLoginAttempt``,
and give it an initial value of ``0``.”

In this example,
the maximum number of allowed login attempts is declared as a constant,
because the maximum value never changes.
The current login attempt counter is declared as a variable,
because this value must be incremented after each failed login attempt.

You can declare multiple constants or multiple variables on a single line,
separated by commas:

.. testcode:: multipleDeclarations

   -> var x = 0.0, y = 0.0, z = 0.0
   << // x : Double = 0.0
   << // y : Double = 0.0
   << // z : Double = 0.0

.. note::

   If a stored value in your code is not going to change,
   always declare it as a constant with the ``let`` keyword.
   Use variables only for storing values that need to be able to change.

.. _SwiftTest_TypeAnnotations:

Type Annotations
~~~~~~~~~~~~~~~~

You can provide a :newTerm:`type annotation` when you declare a constant or variable,
to be clear about the kind of values the constant or variable can store.
Write a type annotation by placing a colon after the constant or variable name,
followed by a space, followed by the name of the type to use.

This example provides a type annotation for a variable called ``welcomeMessage``,
to indicate that the variable can store ``String`` values:

.. testcode:: typeAnnotations
   :compile: true

   -> var welcomeMessage: String

The colon in the declaration means *“…of type…,”*
so the code above can be read as:

“Declare a variable called ``welcomeMessage`` that is of type ``String``.”

The phrase “of type ``String``” means “can store any ``String`` value.”
Think of it as meaning “the type of thing” (or “the kind of thing”) that can be stored.

The ``welcomeMessage`` variable can now be set to any string value without error:

.. testcode:: typeAnnotations
   :compile: true

   -> welcomeMessage = "Hello"
   >> println(welcomeMessage)
   << Hello

You can define multiple related variables of the same type on a single line,
separated by commas, with a single type annotation after the final variable name:

.. testcode:: typeAnnotations
   :compile: true

   -> var red, green, blue: Double

.. note::

   It is rare that you need to write type annotations in practice.
   If you provide an initial value for a constant or variable at the point that it is defined,
   Swift can almost always infer the type to be used for that constant or variable,
   as described in :ref:`TheBasics_TypeSafetyAndTypeInference`.
   In the ``welcomeMessage`` example above, no initial value is provided,
   and so the type of the ``welcomeMessage`` variable is specified with a type annotation
   rather than being inferred from an initial value.

.. _SwiftTest_NamingConstantsAndVariables:

Naming Constants and Variables
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can use almost any character you like for constant and variable names,
including Unicode characters:

.. testcode:: constantsAndVariables

   -> let π = 3.14159
   << // π : Double = 3.14159
   -> let 你好 = "你好世界"
   << // 你好 : String = "你好世界"
   -> let 🐶🐮 = "dogcow"
   << // 🐶🐮 : String = "dogcow"

Constant and variable names cannot contain
mathematical symbols, arrows, private-use (or invalid) Unicode code points,
or line- and box-drawing characters.
Nor can they begin with a number,
although numbers may be included elsewhere within the name.

Once you've declared a constant or variable of a certain type,
you can't redeclare it again with the same name,
or change it to store values of a different type.
Nor can you change a constant into a variable
or a variable into a constant.

.. note::

   If you need to give a constant or variable the same name as a reserved Swift keyword,
   you can do so by surrounding the keyword with back ticks (`````) when using it as a name.
   However, you should avoid using keywords as names unless you have absolutely no choice.

.. QUESTION: I've deliberately not given an example here,
   because I don't want to suggest that such an example is
   a good example of when you *should* use a keyword as a name.
   Is this the right approach to take?

You can change the value of an existing variable to another value of a compatible type.
In this example, the value of ``friendlyWelcome`` is changed from
``"Hello!"`` to ``"Bonjour!"``:

.. testcode:: constantsAndVariables

   -> var friendlyWelcome = "Hello!"
   << // friendlyWelcome : String = "Hello!"
   -> friendlyWelcome = "Bonjour!"
   /> friendlyWelcome is now \"\(friendlyWelcome)\"
   </ friendlyWelcome is now "Bonjour!"

Unlike a variable, the value of a constant cannot be changed once it is set.
Attempting to do so is reported as an error when your code is compiled:

.. testcode:: constantsAndVariables

   -> let languageName = "Swift"
   << // languageName : String = "Swift"
   -> languageName = "Swift++"
   // this is a compile-time error - languageName cannot be changed
   !! <REPL Input>:1:14: error: cannot assign to 'let' value 'languageName'
   !! languageName = "Swift++"
   !! ~~~~~~~~~~~~ ^
