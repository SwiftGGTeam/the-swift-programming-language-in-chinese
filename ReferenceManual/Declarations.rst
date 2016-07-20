Declarations
============

A :newTerm:`declaration` introduces a new name or construct into your program.
For example, you use declarations to introduce functions and methods, variables and constants,
and to define new, named enumeration, structure, class,
and protocol types. You can also use a declaration to extend the behavior
of an existing named type and to import symbols into your program that are declared elsewhere.

In Swift, most declarations are also definitions in the sense that they are implemented
or initialized at the same time they are declared. That said, because protocols don't
implement their members, most protocol members are declarations only. For convenience
and because the distinction isn't that important in Swift,
the term *declaration* covers both declarations and definitions.

.. langref-grammar

    decl ::= decl-class
    decl ::= decl-constructor
    decl ::= decl-deinitializer
    decl ::= decl-extension
    decl ::= decl-func
    decl ::= decl-import
    decl ::= decl-enum
    decl ::= decl-enum-element
    decl ::= decl-protocol
    decl ::= decl-struct
    decl ::= decl-typealias
    decl ::= decl-var
    decl ::= decl-let
    decl ::= decl-subscript

.. syntax-grammar::

    Grammar of a declaration

    declaration --> import-declaration
    declaration --> constant-declaration
    declaration --> variable-declaration
    declaration --> typealias-declaration
    declaration --> function-declaration
    declaration --> enum-declaration
    declaration --> struct-declaration
    declaration --> class-declaration
    declaration --> protocol-declaration
    declaration --> initializer-declaration
    declaration --> deinitializer-declaration
    declaration --> extension-declaration
    declaration --> subscript-declaration
    declaration --> operator-declaration
    declarations --> declaration declarations-OPT

.. NOTE: Removed enum-member-declaration, because we don't need it anymore.

.. NOTE: Added 'operator-declaration' based on ParseDecl.cpp.


.. _LexicalStructure_ModuleScope:

Top-Level Code
--------------

The top-level code in a Swift source file consists of zero or more statements,
declarations, and expressions.
By default, variables, constants, and other named declarations that are declared
at the top-level of a source file are accessible to code
in every source file that is part of the same module.
You can override this default behavior
by marking the declaration with an access level modifier,
as described in :ref:`Declarations_AccessControlLevels`.

.. TODO: Revisit and rewrite this section after WWDC

.. langref-grammar

    top-level ::= brace-item*


.. syntax-grammar::

    Grammar of a top-level declaration

    top-level-declaration --> statements-OPT


.. _LexicalStructure_CodeBlocks:

Code Blocks
-----------

A :newTerm:`code block` is used by a variety of declarations and control structures
to group statements together.
It has the following form:

.. syntax-outline::

    {
       <#statements#>
    }

The *statements* inside a code block include declarations,
expressions, and other kinds of statements and are executed in order
of their appearance in source code.

.. TR: What exactly are the scope rules for Swift?

.. TODO: Discuss scope.  I assume a code block creates a new scope?


.. langref-grammar

    brace-item-list ::= '{' brace-item* '}'
    brace-item      ::= decl
    brace-item      ::= expr
    brace-item      ::= stmt

.. syntax-grammar::

    Grammar of a code block

    code-block --> ``{`` statements-OPT ``}``


.. _Declarations_ImportDeclaration:

Import Declaration
------------------

An :newTerm:`import declaration` lets you access symbols
that are declared outside the current file.
The basic form imports the entire module;
it consists of the ``import`` keyword followed by a module name:

.. syntax-outline::

    import <#module#>

Providing more detail limits which symbols are imported ---
you can specify a specific submodule
or a specific declaration within a module or submodule.
When this detailed form is used,
only the imported symbol
(and not the module that declares it)
is made available in the current scope.

.. syntax-outline::

    import <#import kind#> <#module#>.<#symbol name#>
    import <#module#>.<#submodule#>

.. TODO: Need to add more to this section.

.. langref-grammar

    decl-import ::=  attribute-list 'import' import-kind? import-path
    import-kind ::= 'typealias'
    import-kind ::= 'struct'
    import-kind ::= 'class'
    import-kind ::= 'enum'
    import-kind ::= 'protocol'
    import-kind ::= 'var'
    import-kind ::= 'func'
    import-path ::= any-identifier ('.' any-identifier)*

.. syntax-grammar::

    Grammar of an import declaration

    import-declaration --> attributes-OPT ``import`` import-kind-OPT import-path

    import-kind --> ``typealias`` | ``struct`` | ``class`` | ``enum`` | ``protocol`` | ``var`` | ``func``
    import-path --> import-path-identifier | import-path-identifier ``.`` import-path
    import-path-identifier --> identifier | operator


.. _Declarations_ConstantDeclaration:

Constant Declaration
--------------------

A :newTerm:`constant declaration` introduces a constant named value into your program.
Constant declarations are declared using the ``let`` keyword and have the following form:

.. syntax-outline::

    let <#constant name#>: <#type#> = <#expression#>

A constant declaration defines an immutable binding between the *constant name*
and the value of the initializer *expression*;
after the value of a constant is set, it cannot be changed.
That said, if a constant is initialized with a class object,
the object itself can change,
but the binding between the constant name and the object it refers to can't.

When a constant is declared at global scope,
it must be initialized with a value.
When a constant declaration occurs in the context of a class or structure
declaration, it is considered a :newTerm:`constant property`.
Constant declarations are not computed properties and therefore do not have getters
or setters.

If the *constant name* of a constant declaration is a tuple pattern,
the name of each item in the tuple is bound to the corresponding value
in the initializer *expression*.

.. testcode:: constant-decl

    -> let (firstNumber, secondNumber) = (10, 42)
    << // (firstNumber, secondNumber) : (Int, Int) = (10, 42)

In this example,
``firstNumber`` is a named constant for the value ``10``,
and ``secondNumber`` is a named constant for the value ``42``.
Both constants can now be used independently:

.. testcode:: constant-decl

    -> print("The first number is \(firstNumber).")
    <- The first number is 10.
    -> print("The second number is \(secondNumber).")
    <- The second number is 42.

The type annotation (``:`` *type*) is optional in a constant declaration
when the type of the *constant name* can be inferred,
as described in :ref:`Types_TypeInference`.

To declare a constant type property,
mark the declaration with the ``static`` declaration modifier. Type properties
are discussed in :ref:`Properties_TypeProperties`.

.. TODO: Discuss class constant properties after they're implemented
    (probably not until after 1.0)

For more information about constants and for guidance about when to use them,
see :ref:`TheBasics_ConstantsAndVariables` and :ref:`Properties_StoredProperties`.

.. TODO: Need to discuss class and static constant properties.

.. langref-grammar

    decl-let    ::= attribute-list 'val' pattern initializer?  (',' pattern initializer?)*
    initializer ::= '=' expr

.. syntax-grammar::

    Grammar of a constant declaration

    constant-declaration --> attributes-OPT declaration-modifiers-OPT ``let`` pattern-initializer-list

    pattern-initializer-list --> pattern-initializer | pattern-initializer ``,`` pattern-initializer-list
    pattern-initializer --> pattern initializer-OPT
    initializer --> ``=`` expression


.. _Declarations_VariableDeclaration:

Variable Declaration
--------------------

A :newTerm:`variable declaration` introduces a variable named value into your program
and is declared using the ``var`` keyword.

Variable declarations have several forms that declare different kinds
of named, mutable values,
including stored and computed variables and properties,
stored variable and property observers, and static variable properties.
The appropriate form to use depends on
the scope at which the variable is declared and the kind of variable you intend to declare.

.. note::

    You can also declare properties in the context of a protocol declaration,
    as described in :ref:`Declarations_ProtocolPropertyDeclaration`.

You can override a property in a subclass by marking the subclass's property declaration
with the ``override`` declaration modifier, as described in :ref:`Inheritance_Overriding`.

.. _Declarations_StoredVariablesAndVariableStoredProperties:

Stored Variables and Stored Variable Properties
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following form declares a stored variable or stored variable property:

.. syntax-outline::

    var <#variable name#>: <#type#> = <#expression#>

You define this form of a variable declaration at global scope, the local scope
of a function, or in the context of a class or structure declaration.
When a variable declaration of this form is declared at global scope or the local
scope of a function, it is referred to as a :newTerm:`stored variable`.
When it is declared in the context of a class or structure declaration,
it is referred to as a :newTerm:`stored variable property`.

The initializer *expression* can't be present in a protocol declaration,
but in all other contexts, the initializer *expression* is optional.
That said, if no initializer *expression* is present,
the variable declaration must include an explicit type annotation (``:`` *type*).

As with constant declarations,
if the *variable name* is a tuple pattern,
the name of each item in the tuple is bound to the corresponding value
in the initializer *expression*.

As their names suggest, the value of a stored variable or a stored variable property
is stored in memory.


.. _Declarations_ComputedVariablesAndComputedProperties:

Computed Variables and Computed Properties
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following form declares a computed variable or computed property:

.. syntax-outline::

    var <#variable name#>: <#type#> {
       get {
          <#statements#>
       }
       set(<#setter name#>) {
          <#statements#>
       }
    }

You define this form of a variable declaration at global scope, the local scope
of a function, or in the context of a class, structure, enumeration, or extension declaration.
When a variable declaration of this form is declared at global scope or the local
scope of a function, it is referred to as a :newTerm:`computed variable`.
When it is declared in the context of a class,
structure, or extension declaration,
it is referred to as a :newTerm:`computed property`.

The getter is used to read the value,
and the setter is used to write the value.
The setter clause is optional,
and when only a getter is needed, you can omit both clauses and simply
return the requested value directly,
as described in :ref:`Properties_ReadOnlyComputedProperties`.
But if you provide a setter clause, you must also provide a getter clause.

The *setter name* and enclosing parentheses is optional.
If you provide a setter name, it is used as the name of the parameter to the setter.
If you do not provide a setter name, the default parameter name to the setter is ``newValue``,
as described in :ref:`Properties_ShorthandSetterDeclaration`.

Unlike stored named values and stored variable properties,
the value of a computed named value or a computed property is not stored in memory.

For more information and to see examples of computed properties,
see :ref:`Properties_ComputedProperties`.


.. _Declarations_StoredVariableObserversAndPropertyObservers:

Stored Variable Observers and Property Observers
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can also declare a stored variable or property with ``willSet`` and ``didSet`` observers.
A stored variable or property declared with observers has the following form:

.. syntax-outline::

    var <#variable name#>: <#type#> = <#expression#> {
       willSet(<#setter name#>) {
          <#statements#>
       }
       didSet(<#setter name#>) {
          <#statements#>
       }
    }

You define this form of a variable declaration at global scope, the local scope
of a function, or in the context of a class or structure declaration.
When a variable declaration of this form is declared at global scope or the local
scope of a function, the observers are referred to as :newTerm:`stored variable observers`.
When it is declared in the context of a class or structure declaration,
the observers are referred to as :newTerm:`property observers`.

You can add property observers to any stored property. You can also add property
observers to any inherited property (whether stored or computed) by overriding
the property within a subclass, as described in :ref:`Inheritance_OverridingPropertyObservers`.

The initializer *expression* is optional in the context of a class or structure declaration,
but required elsewhere. The *type* annotation is optional
when the type can be inferred from the initializer *expression*.

The ``willSet`` and ``didSet`` observers provide a way to observe (and to respond appropriately)
when the value of a variable or property is being set.
The observers are not called when the variable or property
is first initialized.
Instead, they are called only when the value is set outside of an initialization context.

A ``willSet`` observer is called just before the value of the variable or property
is set. The new value is passed to the ``willSet`` observer as a constant,
and therefore it can't be changed in the implementation of the ``willSet`` clause.
The ``didSet`` observer is called immediately after the new value is set. In contrast
to the ``willSet`` observer, the old value of the variable or property
is passed to the ``didSet`` observer in case you still need access to it. That said,
if you assign a value to a variable or property within its own ``didSet`` observer clause,
that new value that you assign will replace the one that was just set and passed to
the ``willSet`` observer.

The *setter name* and enclosing parentheses in the ``willSet`` and ``didSet`` clauses are optional.
If you provide setter names,
they are used as the parameter names to the ``willSet`` and ``didSet`` observers.
If you do not provide setter names,
the default parameter name to the ``willSet`` observer is ``newValue``
and the default parameter name to the ``didSet`` observer is ``oldValue``.

The ``didSet`` clause is optional when you provide a ``willSet`` clause.
Likewise, the ``willSet`` clause is optional when you provide a ``didSet`` clause.

For more information and to see an example of how to use property observers,
see :ref:`Properties_PropertyObservers`.


.. _Declarations_TypeVariableProperties:

Type Variable Properties
~~~~~~~~~~~~~~~~~~~~~~~~

To declare a type variable property,
mark the declaration with the ``static`` declaration modifier.
Classes may mark type computed properties  with the ``class`` declaration modifier instead
to allow subclasses to override the superclass’s implementation.
Type properties are discussed in :ref:`Properties_TypeProperties`.

.. note::

   In a class declaration, the ``static`` keyword has the same effect as
   marking the declaration with both the ``class`` and ``final`` declaration modifiers.

.. TODO: Discuss type properties after they're implemented
    (probably not until after 1.0)
    Update: we now have class computed properties. We'll get class stored properites
    sometime after WWDC.

.. TODO: Need to discuss static variable properties in more detail.

.. langref-grammar
    decl-var-head  ::= attribute-list ('static' | 'class')? 'var'

    decl-var       ::= decl-var-head pattern initializer?  (',' pattern initializer?)*

    // 'get' is implicit in this syntax.
    decl-var       ::= decl-var-head identifier ':' type-annotation brace-item-list

    decl-var       ::= decl-var-head identifier ':' type-annotation '{' get-set '}'

    decl-var       ::= decl-var-head identifier ':' type-annotation initializer? '{' willset-didset '}'

    // For use in protocols.
    decl-var       ::= decl-var-head identifier ':' type-annotation '{' get-set-kw '}'

    get-set        ::= get set?
    get-set        ::= set get

    get            ::= attribute-list 'get' brace-item-list
    set            ::= attribute-list 'set' set-name? brace-item-list
    set-name       ::= '(' identifier ')'

    willset-didset ::= willset didset?
    willset-didset ::= didset willset?

    willset        ::= attribute-list 'willSet' set-name? brace-item-list
    didset         ::= attribute-list 'didSet' set-name? brace-item-list

    get-kw         ::= attribute-list 'get'
    set-kw         ::= attribute-list 'set'
    get-set-kw     ::= get-kw set-kw?
    get-set-kw     ::= set-kw get-kw

.. syntax-grammar::

    Grammar of a variable declaration

    variable-declaration --> variable-declaration-head pattern-initializer-list
    variable-declaration --> variable-declaration-head variable-name type-annotation code-block
    variable-declaration --> variable-declaration-head variable-name type-annotation getter-setter-block
    variable-declaration --> variable-declaration-head variable-name type-annotation getter-setter-keyword-block
    variable-declaration --> variable-declaration-head variable-name initializer willSet-didSet-block
    variable-declaration --> variable-declaration-head variable-name type-annotation initializer-OPT willSet-didSet-block

    variable-declaration-head --> attributes-OPT declaration-modifiers-OPT ``var``
    variable-name --> identifier

    getter-setter-block --> code-block
    getter-setter-block --> ``{`` getter-clause setter-clause-OPT ``}``
    getter-setter-block --> ``{`` setter-clause getter-clause ``}``
    getter-clause --> attributes-OPT ``get`` code-block
    setter-clause --> attributes-OPT ``set`` setter-name-OPT code-block
    setter-name --> ``(`` identifier ``)``

    getter-setter-keyword-block --> ``{`` getter-keyword-clause setter-keyword-clause-OPT ``}``
    getter-setter-keyword-block --> ``{`` setter-keyword-clause getter-keyword-clause ``}``
    getter-keyword-clause --> attributes-OPT ``get``
    setter-keyword-clause --> attributes-OPT ``set``

    willSet-didSet-block --> ``{`` willSet-clause didSet-clause-OPT ``}``
    willSet-didSet-block --> ``{`` didSet-clause willSet-clause-OPT ``}``
    willSet-clause --> attributes-OPT ``willSet`` setter-name-OPT code-block
    didSet-clause --> attributes-OPT ``didSet`` setter-name-OPT code-block

.. NOTE: Type annotations are required for computed properties -- the
   types of those properties are not computed/inferred.


.. _Declarations_TypeAliasDeclaration:

Type Alias Declaration
----------------------

A :newTerm:`type alias declaration` introduces a named alias of an existing type into your program.
Type alias declarations are declared using the ``typealias`` keyword and have the following form:

.. syntax-outline::

    typealias <#name#> = <#existing type#>

After a type alias is declared, the aliased *name* can be used
instead of the *existing type* everywhere in your program.
The *existing type* can be a named type or a compound type.
Type aliases do not create new types;
they simply allow a name to refer to an existing type.

A type alias declaration can use generic parameters
to give a name to an existing type.
For example:

.. testcode:: typealias-with-generic

   -> typealias StringDictionary<T> = Dictionary<String, T>
   ---
   // The following dictionaries have the same type.
   -> var dictionary1: StringDictionary<Int> = [:]
   -> var dictionary2: Dictionary<String, Int> = [:]
   << // dictionary1 : Dictionary<String, Int> = [:]
   << // dictionary2 : Dictionary<String, Int> = [:]

See also :ref:`Declarations_ProtocolAssociatedTypeDeclaration`.

.. langref-grammar

    decl-typealias ::= typealias-head '=' type
    typealias-head ::= 'typealias' identifier inheritance?

.. syntax-grammar::

    Grammar of a type alias declaration

    typealias-declaration --> attributes-OPT access-level-modifier-OPT ``typealias`` typealias-name generic-parameter-clause-OPT typealias-assignment
    typealias-name --> identifier
    typealias-assignment --> ``=`` type

.. Old grammar:
    typealias-declaration --> typealias-head typealias-assignment
    typealias-head --> ``typealias`` typealias-name type-inheritance-clause-OPT
    typealias-name --> identifier
    typealias-assignment --> ``=`` type


.. _Declarations_FunctionDeclaration:

Function Declaration
--------------------

A :newTerm:`function declaration` introduces a function or method into your program.
A function declared in the context of class, structure, enumeration, or protocol
is referred to as a :newTerm:`method`.
Function declarations are declared using the ``func`` keyword and have the following form:

.. syntax-outline::

    func <#function name#>(<#parameters#>) -> <#return type#> {
       <#statements#>
    }

If the function has a return type of ``Void``,
the return type can be omitted as follows:

.. syntax-outline::

    func <#function name#>(<#parameters#>) {
       <#statements#>
    }

The type of each parameter must be included ---
it can't be inferred.
If you write ``inout`` in front of a parameter's type,
the parameter can be modified inside the scope of the function.
In-out parameters are discussed in detail
in :ref:`Declarations_InOutParameters`, below.

Functions can return multiple values using a tuple type
as the return type of the function.

.. TODO: ^-- Add some more here.

A function definition can appear inside another function declaration.
This kind of function is known as a :newTerm:`nested function`.
For a discussion of nested functions,
see :ref:`Functions_NestedFunctions`.

.. _Declarations_ParameterNames:

Parameter Names
~~~~~~~~~~~~~~~

Function parameters are a comma separated list
where each parameter has one of several forms.
The order of arguments in a function call
must match the order of parameters in the function's declaration.
The simplest entry in a parameter list has the following form:

.. syntax-outline::

    <#parameter name#>: <#parameter type#>

A parameter has a name,
which is used within the function body,
as well as an argument label,
which is used when calling the function or method.
By default,
parameter names are also used as argument labels.
For example:

.. testcode:: default-parameter-names

   -> func f(x: Int, y: Int) -> Int { return x + y }
   -> f(x: 1, y: 2) // both x and y are labeled
   << // r0 : Int = 3

You can override the default behavior for argument labels
with one of the following forms:

.. syntax-outline::

    <#argument label#> <#parameter name#>: <#parameter type#>
    _ <#parameter name#>: <#parameter type#>

A name before the parameter name
gives the parameter an explicit argument label,
which can be different from the parameter name.
The corresponding argument must use the given argument label
in function or method calls.

An underscore (``_``) before a parameter name
suppresses the argument label.
The corresponding argument must have no label in function or method calls.

.. testcode:: overridden-parameter-names

   -> func repeatGreeting(_ greeting: String, count n: Int) { /* Greet n times */ }
   -> repeatGreeting("Hello, world!", count: 2) //  count is labeled, greeting is not

.. x*  Bogus * paired with the one in the listing, to fix VIM syntax highlighting.

.. _Declarations_InOutParameters:

In-Out Parameters
~~~~~~~~~~~~~~~~~

In-out parameters are passed as follows:

1. When the function is called,
   the value of the argument is copied.
2. In the body of the function,
   the copy is modified.
3. When the function returns,
   the copy's value is assigned to the original argument.

This behavior is known as :newTerm:`copy-in copy-out`
or :newTerm:`call by value result`.
For example,
when a computed property or a property with observers
is passed as an in-out parameter,
its getter is called as part of the function call
and its setter is called as part of the function return.

As an optimization,
when the argument is a value stored at a physical address in memory,
the same memory location is used both inside and outside the function body.
The optimized behavior is known as :newTerm:`call by reference`;
it satisfies all of the requirements
of the copy-in copy-out model
while removing the overhead of copying.
Write your code using the model given by copy-in copy-out,
without depending on the call-by-reference optimization,
so that it behaves correctly with or without the optimization.

Do not access the value that was passed as an in-out argument,
even if the original argument is available in the current scope.
When the function returns,
your changes to the original are overwritten
with the value of the copy.
Do not depend on the implementation of the call-by-reference optimization
to try to keep the changes from being overwritten.

.. When the call-by-reference optimization is in play,
   it would happen to do what you want.
   But you still shouldn't do that --
   as noted above, you're not allowed to depend on
   behavioral differences that happen because of call by reference.

You can't pass the same argument to multiple in-out parameters
because the order in which the copies are written back
is not well defined,
which means the final value of the original
would also not be well defined.
For example:

.. testcode:: cant-pass-inout-aliasing

   -> var x = 10
   << // x : Int = 10
   -> func f(a: inout Int, b: inout Int) {
          a += 1
          b += 10
      }
   -> f(a: &x, b: &x) // Invalid, in-out arguments alias each other
   !! <REPL Input>:1:13: error: inout arguments are not allowed to alias each other
   !! f(a: &x, b: &x) // Invalid, in-out arguments alias each other
   !!             ^~
   !! <REPL Input>:1:6: note: previous aliasing argument
   !! f(a: &x, b: &x) // Invalid, in-out arguments alias each other
   !!      ^~

A closure or nested function
that captures an in-out parameter must be nonescaping.
There is no copy-out at the end of closures or nested functions.
This means if a closure were called after the function returns,
any changes the closure tried to make to the captured in-out parameter
would not get copied back to the original.
If you need to capture an in-out parameter
without mutating it or to observe mutation from other code,
use a capture list to explicitly capture the parameter immutably.
If you need to capture and mutate an in-out parameter ---
for example, in multithreaded code that ensures
all mutation has finished before the function returns ---
make a local mutable copy.

.. assertion:: escaping-cant-capture-inout

    -> func outer(a: inout Int) -> () -> Void {
           func inner() {
               a += 1
           }
           return inner
       }
    !! <REPL Input>:5:7: error: nested function cannot capture inout parameter and escape
    !!            return inner
    !!            ^
    -> func closure(a: inout Int) -> () -> Void {
           return { a += 1 }
       }
    !! <REPL Input>:2:16: error: closure cannot implicitly capture an inout parameter unless @noescape
    !!              return { a += 1 }
    !!                       ^

.. testcode:: explicit-capture-for-inout

    // Explicit immutable capture
    -> func someFunction(a: inout Int) -> () -> Int {
           return { [a] in return a+1 }
       }
    ---
    // Explicit local copy
    >> import Dispatch
    >> func someMutatingOperation(_ a: inout Int) { }
    -> func multithreadFunction(queue: DispatchQueue, x: inout Int) {
          // Make a local copy and manually copy it back.
          var localX = x
          defer { x = localX }

          // Operate on localX asynchronously, then wait before returning.
          queue.async { someMutatingOperation(&localX) }
          queue.sync {}
       }  

For more discussion and examples of in-out parameters,
see :ref:`Functions_InOutParameters`.

.. _Declarations_SpecialKindsOfParameters:

Special Kinds of Parameters
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Parameters can be ignored,
take a variable number of values,
and provide default values
using the following forms:

.. syntax-outline::

    _ : <#parameter type#>
    <#parameter name#>: <#parameter type#>...
    <#parameter name#>: <#parameter type#> = <#default argument value#>

An underscore (``_``) parameter
is explicitly ignored and can't be accessed within the body of the function.

A parameter with a base type name followed immediately by three dots (``...``)
is understood as a variadic parameter.
A function can have at most one variadic parameter.
A variadic parameter is treated as an array that contains elements of the base type name.
For instance, the variadic parameter ``Int...`` is treated as ``[Int]``.
For an example that uses a variadic parameter,
see :ref:`Functions_VariadicParameters`.

A parameter with an equals sign (``=``) and an expression after its type
is understood to have a default value of the given expression.
The given expression is evaluated when the function is called.
If the parameter is omitted when calling the function,
the default value is used instead.

.. testcode:: default-args-and-labels

   -> func f(x: Int = 42) -> Int { return x }
   -> f()       // Valid, uses default value
   -> f(x: 7)   // Valid, uses the value provided
   -> f(7)      // Invalid, missing argument label
   <$ : Int = 42
   <$ : Int = 7
   !! <REPL Input>:1:3: error: missing argument label 'x:' in call
   !! f(7)      // Invalid, missing argument label
   !!   ^
   !!   x:

.. assertion:: default-args-evaluated-at-call-site

    -> func shout() -> Int {
          print("evaluated")
          return 10
       }
    -> func foo(x: Int = shout()) { print("x is \(x)") }
    -> foo(x: 100)
    << x is 100
    -> foo()
    << evaluated
    << x is 10
    -> foo()
    << evaluated
    << x is 10

.. _Declarations_SpecialKindsOfMethods:

Special Kinds of Methods
~~~~~~~~~~~~~~~~~~~~~~~~

Methods on an enumeration or a structure
that modify ``self`` must be marked with the ``mutating`` declaration modifier.

Methods that override a superclass method
must be marked with the ``override`` declaration modifier.
It's a compile-time error to override a method without the ``override`` modifier
or to use the ``override`` modifier on a method
that doesn't override a superclass method.

Methods associated with a type
rather than an instance of a type
must be marked with the ``static`` declaration modifier for enumerations and structures
or the ``class`` declaration modifier for classes.

.. _Declarations_ThrowingFunctionsAndMethods:

Throwing Functions and Methods
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Functions and methods that can throw an error must be marked with the ``throws`` keyword.
These functions and methods are known as :newTerm:`throwing functions`
and :newTerm:`throwing methods`.
They have the following form:

.. syntax-outline::

    func <#function name#>(<#parameters#>) throws -> <#return type#> {
       <#statements#>
    }

Calls to a throwing function or method must be wrapped in a ``try`` or ``try!`` expression
(that is, in the scope of a ``try`` or ``try!`` operator).

The ``throws`` keyword is part of a function's type,
and nonthrowing functions are subtypes of throwing functions.
As a result, you can use a nonthrowing function in the same places as a throwing one.

You can't overload a function based only on whether the function can throw an error.
That said,
you can overload a function based on whether a function *parameter* can throw an error.

A throwing method can't override a nonthrowing method,
and a throwing method can't satisfy a protocol requirement for a nonthrowing method.
That said, a nonthrowing method can override a throwing method,
and a nonthrowing method can satisfy a protocol requirement for a throwing method.

.. _Declarations_RethrowingFunctionsAndMethods:

Rethrowing Functions and Methods
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A function or method can be declared with the ``rethrows`` keyword
to indicate that it throws an error only if one of its function parameters throws an error.
These functions and methods are known as :newTerm:`rethrowing functions`
and :newTerm:`rethrowing methods`.
Rethrowing functions and methods
must have at least one throwing function parameter.

.. testcode:: rethrows

   -> func someFunction(callback: () throws -> Void) rethrows {
          try callback()
      }

A rethrowing function or method can contain a ``throw`` statement
only inside a ``catch`` clause.
This lets you call the throwing function inside a ``do``-``catch`` block
and handle errors in the ``catch`` clause by throwing a different error.
In addition,
the ``catch`` clause must handle
only errors thrown by one of the rethrowing function's
throwing parameters.
For example, the following is invalid
because the ``catch`` clause would handle
the error thrown by ``alwaysThrows()``.

.. testcode:: double-negative-rethrows

   >> enum SomeError: ErrorProtocol { case error }
   >> enum AnotherError: ErrorProtocol { case error }
   -> func alwaysThrows() throws {
          throw SomeError.error
      }
   -> func someFunction(callback: () throws -> Void) rethrows {
         do {
            try callback()
            try alwaysThrows()
         } catch {
            throw AnotherError.error
         }
      }

   !! <REPL Input>:6:9: error: a function declared 'rethrows' may only throw if its parameter does
   !!               throw AnotherError.error
   !!               ^

.. assertion:: throwing-in-rethrowing-function

   -> enum SomeError: ErrorProtocol { case C, D }
   -> func f1(callback: () throws -> Void) rethrows {
          do {
              try callback()
          } catch {
              throw SomeError.C  // OK
          }
      }
   -> func f2(callback: () throws -> Void) rethrows {
          throw SomeError.D  // ERROR
      }
   !! <REPL Input>:2:7: error: a function declared 'rethrows' may only throw if its parameter does
   !! throw SomeError.D  // ERROR
   !! ^

A throwing method can't override a rethrowing method,
and a throwing method can't satisfy a protocol requirement for a rethrowing method.
That said, a rethrowing method can override a throwing method,
and a rethrowing method can satisfy a protocol requirement for a throwing method.

.. syntax-grammar::

    Grammar of a function declaration

    function-declaration --> function-head function-name generic-parameter-clause-OPT function-signature function-body-OPT

    function-head --> attributes-OPT declaration-modifiers-OPT ``func``
    function-name --> identifier | operator

    function-signature --> parameter-clause ``throws``-OPT function-result-OPT
    function-signature --> parameter-clause ``rethrows`` function-result-OPT
    function-result --> ``->`` attributes-OPT type
    function-body --> code-block

    parameter-clause --> ``(`` ``)`` | ``(`` parameter-list ``)``
    parameter-list --> parameter | parameter ``,`` parameter-list
    parameter --> external-parameter-name-OPT local-parameter-name type-annotation default-argument-clause-OPT
    parameter --> external-parameter-name-OPT local-parameter-name type-annotation
    parameter --> external-parameter-name-OPT local-parameter-name type-annotation ``...``
    external-parameter-name --> identifier
    local-parameter-name --> identifier
    default-argument-clause --> ``=`` expression


.. NOTE: Code block is optional in the context of a protocol.
    Everywhere else, it's required.
    We could refactor to have a separation between function definition/declaration.
    There is also the low-level "asm name" FFI
    which is a definition and declaration corner case.
    Let's just deal with this difference in prose.


.. _Declarations_EnumerationDeclaration:

Enumeration Declaration
-----------------------

An :newTerm:`enumeration declaration` introduces a named enumeration type into your program.

Enumeration declarations have two basic forms and are declared using the ``enum`` keyword.
The body of an enumeration declared using either form contains
zero or more values---called :newTerm:`enumeration cases`---
and any number of declarations,
including computed properties,
instance methods, type methods, initializers, type aliases,
and even other enumeration, structure, and class declarations.
Enumeration declarations can't contain deinitializer or protocol declarations.

Enumeration types can adopt any number of protocols, but can’t inherit from classes,
structures, or other enumerations.

Unlike classes and structures,
enumeration types do not have an implicitly provided default initializer;
all initializers must be declared explicitly. Initializers can delegate
to other initializers in the enumeration, but the initialization process is complete
only after an initializer assigns one of the enumeration cases to ``self``.

Like structures but unlike classes, enumerations are value types;
instances of an enumeration are copied when assigned to
variables or constants, or when passed as arguments to a function call.
For information about value types,
see :ref:`ClassesAndStructures_StructuresAndEnumerationsAreValueTypes`.

You can extend the behavior of an enumeration type with an extension declaration,
as discussed in :ref:`Declarations_ExtensionDeclaration`.

.. _Declarations_EnumerationsWithCasesOfAnyType:

Enumerations with Cases of Any Type
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following form declares an enumeration type that contains
enumeration cases of any type:

.. syntax-outline::

    enum <#enumeration name#>: <#adopted protocols#> {
        case <#enumeration case 1#>
        case <#enumeration case 2#>(<#associated value types#>)
    }

Enumerations declared in this form are sometimes called :newTerm:`discriminated unions`
in other programming languages.

In this form, each case block consists of the ``case`` keyword
followed by one or more enumeration cases, separated by commas.
The name of each case must be unique.
Each case can also specify that it stores values of a given type.
These types are specified in the *associated value types* tuple,
immediately following the name of the case.

Enumeration cases that store associated values can be used as functions
that create instances of the enumeration with the specified associated values.
And just like functions,
you can get a reference to an enumeration case and apply it later in your code.

.. testcode:: enum-case-as-function

    -> enum Number {
          case integer(Int)
          case real(Double)
       }
    -> let f = Number.integer
    << // f : (Int) -> Number = (Function)
    -> // f is a function of type (Int) -> Number
    ---
    -> // Apply f to create an array of Number instances with integer values
    -> let evenInts: [Number] = [0, 2, 4, 6].map(f)
    << // evenInts : [Number] = [REPL.Number.integer(0), REPL.Number.integer(2), REPL.Number.integer(4), REPL.Number.integer(6)]

For more information and to see examples of cases with associated value types,
see :ref:`Enumerations_AssociatedValues`.

.. _Declarations_EnumerationsWithIndirection:

Enumerations with Indirection
+++++++++++++++++++++++++++++

Enumerations can have a recursive structure,
that is, they can have cases with associated values
that are instances of the enumeration type itself.
However, instances of enumeration types have value semantics,
which means they have a fixed layout in memory.
To support recursion,
the compiler must insert a layer of indirection.

To enable indirection for a particular enumeration case,
mark it with the ``indirect`` declaration modifier.

.. TODO The word "enable" is kind of a weasle word.
   Better to have a more concrete discussion of exactly when
   it is and isn't used.
   For example, does "indirect enum { X(Int) } mark X as indirect?

.. testcode:: indirect-enum

   -> enum Tree<T> {
         case empty
         indirect case node(value: T, left: Tree, right: Tree)
      }
   >> let l1 = Tree.node(value: 10, left: Tree.empty, right: Tree.empty)
   >> let l2 = Tree.node(value: 100, left: Tree.empty, right: Tree.empty)
   >> let t = Tree.node(value: 50, left: l1, right: l2)
   << // l1 : Tree<Int> = REPL.Tree<Swift.Int>.node(10, REPL.Tree<Swift.Int>.empty, REPL.Tree<Swift.Int>.empty)
   << // l2 : Tree<Int> = REPL.Tree<Swift.Int>.node(100, REPL.Tree<Swift.Int>.empty, REPL.Tree<Swift.Int>.empty)
   << // t : Tree<Int> = REPL.Tree<Swift.Int>.node(50, REPL.Tree<Swift.Int>.node(10, REPL.Tree<Swift.Int>.empty, REPL.Tree<Swift.Int>.empty), REPL.Tree<Swift.Int>.node(100, REPL.Tree<Swift.Int>.empty, REPL.Tree<Swift.Int>.empty))

To enable indirection for all the cases of an enumeration,
mark the entire enumeration with the ``indirect`` modifier ---
this is convenient when the enumeration contains many cases
that would each need to be marked with the ``indirect`` modifier.

An enumeration case that's marked with the ``indirect`` modifier
must have an associated value.
An enumeration that is marked with the ``indirect`` modifier
can contain a mixture of cases that have associated values and cases those that don't.
That said,
it can't contain any cases that are also marked with the ``indirect`` modifier.

.. It really should be an associated value **that includes the enum type**
   but right now the compiler is satisfied with any associated value.
   Alex emailed Joe Groff 2015-07-08 about this.

.. assertion indirect-in-indirect

   -> indirect enum E { indirect case c(E) }
   !! <REPL Input>:1:19: error: enum case in 'indirect' enum cannot also be 'indirect'
   !! indirect enum E { indirect case c(E) }
   !!                   ^

.. assertion indirect-without-recursion

   -> enum E { indirect case c }
   !! <REPL Input>:1:10: error: enum case 'c' without associated value cannot be 'indirect'
   !! enum E { indirect case c }
   !!          ^
   ---
   -> enum E1 { indirect case c() }     // This is fine, but probably shouldn't be
   -> enum E2 { indirect case c(Int) }  // This is fine, but probably shouldn't be
   ---
   -> indirect enum E3 { case x }


.. _Declarations_EnumerationsWithRawCaseValues:

Enumerations with Cases of a Raw-Value Type
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following form declares an enumeration type that contains
enumeration cases of the same basic type:

.. syntax-outline::

    enum <#enumeration name#>: <#raw-value type#>, <#adopted protocols#> {
        case <#enumeration case 1#> = <#raw value 1#>
        case <#enumeration case 2#> = <#raw value 2#>
    }

In this form, each case block consists of the ``case`` keyword,
followed by one or more enumeration cases, separated by commas.
Unlike the cases in the first form, each case has an underlying
value, called a :newTerm:`raw value`, of the same basic type.
The type of these values is specified in the *raw-value type* and must represent an
integer, floating-point number, string, or single character.
In particular, the *raw-value type* must conform to the ``Equatable`` protocol
and one of the following literal-convertible protocols:
``IntegerLiteralConvertible`` for integer literals,
``FloatLiteralConvertible`` for floating-point literals,
``StringLiteralConvertible`` for string literals that contain any number of characters, and
``ExtendedGraphemeClusterLiteralConvertible`` for string literals
that contain only a single character.
Each case must have a unique name and be assigned a unique raw value.

If the raw-value type is specified as ``Int``
and you don't assign a value to the cases explicitly,
they are implicitly assigned the values ``0``, ``1``, ``2``, and so on.
Each unassigned case of type ``Int`` is implicitly assigned a raw value
that is automatically incremented from the raw value of the previous case.

.. testcode:: raw-value-enum

    -> enum ExampleEnum: Int {
          case a, b, c = 5, d
       }

In the above example, the raw value of ``ExampleEnum.a`` is ``0`` and the value of
``ExampleEnum.b`` is ``1``. And because the value of ``ExampleEnum.c`` is
explicitly set to ``5``, the value of ``ExampleEnum.d`` is automatically incremented
from ``5`` and is therefore ``6``.

If the raw-value type is specified as ``String``
and you don't assign values to the cases explicitly,
each unassigned case is implicitly assigned a string with the same text as the name of that case.

.. testcode:: raw-value-enum-implicit-string-values

    -> enum GamePlayMode: String {
          case cooperative, individual, competitive
       }

In the above example, the raw value of ``GamePlayMode.cooperative`` is ``"cooperative"``,
the raw value of ``GamePlayMode.individual`` is ``"individual"``,.
and the raw value of ``GamePlayMode.competitive`` is ``"competitive"``.

Enumerations that have cases of a raw-value type implicitly conform to the
``RawRepresentable`` protocol, defined in the Swift standard library.
As a result, they have a ``rawValue`` property
and a failable initializer with the signature ``init?(rawValue: RawValue)``.
You can use the ``rawValue`` property to access the raw value of an enumeration case,
as in ``ExampleEnum.B.rawValue``.
You can also use a raw value to find a corresponding case, if there is one,
by calling the enumeration's failable initializer,
as in ``ExampleEnum(rawValue: 5)``, which returns an optional case.
For more information and to see examples of cases with raw-value types,
see :ref:`Enumerations_RawValues`.

Accessing Enumeration Cases
~~~~~~~~~~~~~~~~~~~~~~~~~~~

To reference the case of an enumeration type, use dot (``.``) syntax,
as in ``EnumerationType.enumerationCase``. When the enumeration type can be inferred
from context, you can omit it (the dot is still required),
as described in :ref:`Enumerations_EnumerationSyntax`
and :ref:`Expressions_ImplicitMemberExpression`.

To check the values of enumeration cases, use a ``switch`` statement,
as shown in :ref:`Enumerations_MatchingEnumerationValuesWithASwitchStatement`.
The enumeration type is pattern-matched against the enumeration case patterns
in the case blocks of the ``switch`` statement,
as described in :ref:`Patterns_EnumerationCasePattern`.

.. FIXME: Or use if-case:
   enum E { case c(Int) }
   let e = E.c(100)
   if case E.c(let i) = e { print(i) }
   // prints 100



.. NOTE: Note that you can require protocol adoption,
    by using a protocol type as the raw-value type,
    but you do need to make it be one of the types
    that support = in order for you to specify the raw values.
    You can have: <#raw-value type, protocol conformance#>.
    UPDATE: You can only have one raw-value type specified.
    I changed the grammar to be more restrictive in light of this.

.. langref-grammar

    decl-enum ::= attribute-list 'enum' identifier generic-params? inheritance? enum-body
    enum-body ::= '{' decl* '}'
    decl-enum-element ::= attribute-list 'case' enum-case (',' enum-case)*
    enum-case ::= identifier type-tuple? ('->' type)?

.. NOTE: Per Doug and Ted, "('->' type)?" is not part of the grammar.
    We removed it from our grammar, below.

.. syntax-grammar::

    Grammar of an enumeration declaration

    enum-declaration --> attributes-OPT access-level-modifier-OPT union-style-enum
    enum-declaration --> attributes-OPT access-level-modifier-OPT raw-value-style-enum

    union-style-enum --> ``indirect``-OPT ``enum`` enum-name generic-parameter-clause-OPT type-inheritance-clause-OPT ``{`` union-style-enum-members-OPT ``}``
    union-style-enum-members --> union-style-enum-member union-style-enum-members-OPT
    union-style-enum-member --> declaration | union-style-enum-case-clause
    union-style-enum-case-clause --> attributes-OPT ``indirect``-OPT ``case`` union-style-enum-case-list
    union-style-enum-case-list --> union-style-enum-case | union-style-enum-case ``,`` union-style-enum-case-list
    union-style-enum-case --> enum-case-name tuple-type-OPT
    enum-name --> identifier
    enum-case-name --> identifier

    raw-value-style-enum --> ``enum`` enum-name generic-parameter-clause-OPT type-inheritance-clause ``{`` raw-value-style-enum-members ``}``
    raw-value-style-enum-members --> raw-value-style-enum-member raw-value-style-enum-members-OPT
    raw-value-style-enum-member --> declaration | raw-value-style-enum-case-clause
    raw-value-style-enum-case-clause --> attributes-OPT ``case`` raw-value-style-enum-case-list
    raw-value-style-enum-case-list --> raw-value-style-enum-case | raw-value-style-enum-case ``,`` raw-value-style-enum-case-list
    raw-value-style-enum-case --> enum-case-name raw-value-assignment-OPT
    raw-value-assignment --> ``=`` raw-value-literal
    raw-value-literal --> numeric-literal | static-string-literal | boolean-literal

.. NOTE: The two types of enums are sufficiently different enough to warrant separating
    the grammar accordingly. ([Contributor 6004] pointed this out in his email.)
    I'm not sure I'm happy with the names I've chosen for two kinds of enums,
    so please let me know if you can think of better names (Tim and Dave are OK with them)!
    I chose union-style-enum, because this kind of enum behaves like a discriminated union,
    not like an ordinary enum type. They are a kind of "sum" type in the language
    of ADTs (Algebraic Data Types). Functional languages, like F# for example,
    actually have both types (discriminated unions and enumeration types),
    because they behave differently. I'm not sure why we've blended them together,
    especially given that they have distinct syntactic declaration requirements
    and they behave differently.

.. old-grammar
    Grammar of an enumeration declaration

    enum-declaration --> attribute-list-OPT ``enum`` enum-name generic-parameter-clause-OPT type-inheritance-clause-OPT enum-body
    enum-name --> identifier
    enum-body --> ``{`` declarations-OPT ``}``

    enum-member-declaration --> attribute-list-OPT ``case`` enumerator-list
    enumerator-list --> enumerator raw-value-assignment-OPT | enumerator raw-value-assignment-OPT ``,`` enumerator-list
    enumerator --> enumerator-name tuple-type-OPT
    enumerator-name --> identifier
    raw-value-assignment --> ``=`` literal


.. _Declarations_StructureDeclaration:

Structure Declaration
---------------------

A :newTerm:`structure declaration` introduces a named structure type into your program.
Structure declarations are declared using the ``struct`` keyword and have the following form:

.. syntax-outline::

    struct <#structure name#>: <#adopted protocols#> {
       <#declarations#>
    }

The body of a structure contains zero or more *declarations*.
These *declarations* can include both stored and computed properties,
type properties, instance methods, type methods, initializers, subscripts,
type aliases, and even other structure, class, and enumeration declarations.
Structure declarations can't contain deinitializer or protocol declarations.
For a discussion and several examples of structures
that include various kinds of declarations,
see :doc:`../LanguageGuide/ClassesAndStructures`.

Structure types can adopt any number of protocols,
but can't inherit from classes, enumerations, or other structures.

There are three ways create an instance of a previously declared structure:

* Call one of the initializers declared within the structure,
  as described in :ref:`Initialization_Initializers`.
* If no initializers are declared,
  call the structure's memberwise initializer,
  as described in :ref:`Initialization_MemberwiseInitializersForStructureTypes`.
* If no initializers are declared,
  and all properties of the structure declaration were given initial values,
  call the structure's default initializer,
  as described in :ref:`Initialization_DefaultInitializers`.

The process of initializing a structure's declared properties
is described in :doc:`../LanguageGuide/Initialization`.

Properties of a structure instance can be accessed using dot (``.``) syntax,
as described in :ref:`ClassesAndStructures_AccessingProperties`.

Structures are value types; instances of a structure are copied when assigned to
variables or constants, or when passed as arguments to a function call.
For information about value types,
see :ref:`ClassesAndStructures_StructuresAndEnumerationsAreValueTypes`.

You can extend the behavior of a structure type with an extension declaration,
as discussed in :ref:`Declarations_ExtensionDeclaration`.

.. langref-grammar

    decl-struct ::= attribute-list 'struct' identifier generic-params? inheritance? '{' decl-struct-body '}'
    decl-struct-body ::= decl*

.. syntax-grammar::

   Grammar of a structure declaration

   struct-declaration --> attributes-OPT access-level-modifier-OPT ``struct`` struct-name generic-parameter-clause-OPT type-inheritance-clause-OPT struct-body
   struct-name --> identifier
   struct-body --> ``{`` declarations-OPT ``}``


.. _Declarations_ClassDeclaration:

Class Declaration
-----------------

A :newTerm:`class declaration` introduces a named class type into your program.
Class declarations are declared using the ``class`` keyword and have the following form:

.. syntax-outline::

    class <#class name#>: <#superclass#>, <#adopted protocols#> {
       <#declarations#>
    }

The body of a class contains zero or more *declarations*.
These *declarations* can include both stored and computed properties,
instance methods, type methods, initializers,
a single deinitializer, subscripts, type aliases,
and even other class, structure, and enumeration declarations.
Class declarations can't contain protocol declarations.
For a discussion and several examples of classes
that include various kinds of declarations,
see :doc:`../LanguageGuide/ClassesAndStructures`.

A class type can inherit from only one parent class, its *superclass*,
but can adopt any number of protocols.
The *superclass* appears first after the *class name* and colon,
followed by any *adopted protocols*.
Generic classes can inherit from other generic and nongeneric classes,
but a nongeneric class can inherit only from other nongeneric classes.
When you write the name of a generic superclass class after the colon,
you must include the full name of that generic class,
including its generic parameter clause.

As discussed in :ref:`Declarations_InitializerDeclaration`,
classes can have designated and convenience initializers.
The designated initializer of a class must initialize all of the class's
declared properties and it must do so before calling any of its superclass's
designated initializers.

A class can override properties, methods, subscripts, and initializers of its superclass.
Overridden properties, methods, subscripts,
and designated initializers must be marked with the ``override`` declaration modifier.

.. assertion:: designatedInitializersRequireOverride

    -> class C { init() {} }
    -> class D: C { override init() { super.init() } }

To require that subclasses implement a superclass's initializer,
mark the superclass's initializer with the ``required`` declaration modifier.
The subclass's implementation of that initializer
must also be marked with the ``required`` declaration modifier.

Although properties and methods declared in the *superclass* are inherited by
the current class, designated initializers declared in the *superclass* are not.
That said, if the current class overrides all of the superclass's
designated initializers, it inherits the superclass's convenience initializers.
Swift classes do not inherit from a universal base class.

There are two ways create an instance of a previously declared class:

* Call one of the initializers declared within the class,
  as described in :ref:`Initialization_Initializers`.
* If no initializers are declared,
  and all properties of the class declaration were given initial values,
  call the class's default initializer,
  as described in :ref:`Initialization_DefaultInitializers`.

Access properties of a class instance with dot (``.``) syntax,
as described in :ref:`ClassesAndStructures_AccessingProperties`.

Classes are reference types; instances of a class are referred to, rather than copied,
when assigned to variables or constants, or when passed as arguments to a function call.
For information about reference types,
see :ref:`ClassesAndStructures_StructuresAndEnumerationsAreValueTypes`.

You can extend the behavior of a class type with an extension declaration,
as discussed in :ref:`Declarations_ExtensionDeclaration`.

.. langref-grammar

    decl-class ::= attribute-list 'class' identifier generic-params? inheritance? '{' decl-class-body '}'
    decl-class-body ::= decl*

.. syntax-grammar::

    Grammar of a class declaration

    class-declaration --> attributes-OPT access-level-modifier-OPT ``final``-OPT ``class`` class-name generic-parameter-clause-OPT type-inheritance-clause-OPT class-body
    class-name --> identifier
    class-body --> ``{`` declarations-OPT ``}``


.. _Declarations_ProtocolDeclaration:

Protocol Declaration
--------------------

A :newTerm:`protocol declaration` introduces a named protocol type into your program.
Protocol declarations are declared at global scope
using the ``protocol`` keyword and have the following form:

.. syntax-outline::

    protocol <#protocol name#>: <#inherited protocols#> {
       <#protocol member declarations#>
    }

The body of a protocol contains zero or more *protocol member declarations*,
which describe the conformance requirements that any type adopting the protocol must fulfill.
In particular, a protocol can declare that conforming types must
implement certain properties, methods, initializers, and subscripts.
Protocols can also declare special kinds of type aliases,
called :newTerm:`associated types`, that can specify relationships
among the various declarations of the protocol.
Protocol declarations can't contain
class, structure, enumeration, or other protocol declarations.
The *protocol member declarations* are discussed in detail below.

Protocol types can inherit from any number of other protocols.
When a protocol type inherits from other protocols,
the set of requirements from those other protocols are aggregated,
and any type that inherits from the current protocol must conform to all those requirements.
For an example of how to use protocol inheritance,
see :ref:`Protocols_ProtocolInheritance`.

.. note::

    You can also aggregate the conformance requirements of multiple
    protocols using protocol composition types,
    as described in :ref:`Types_ProtocolCompositionType`
    and :ref:`Protocols_ProtocolComposition`.

You can add protocol conformance to a previously declared type
by adopting the protocol in an extension declaration of that type.
In the extension, you must implement all of the adopted protocol's
requirements. If the type already implements all of the requirements,
you can leave the body of the extension declaration empty.

By default, types that conform to a protocol must implement all
properties, methods, and subscripts declared in the protocol.
That said, you can mark these protocol member declarations with the ``optional`` declaration modifier
to specify that their implementation by a conforming type is optional.
The ``optional`` modifier can be applied
only to members that are marked with the ``objc`` attribute,
and only to members of protocols that are marked
with the ``objc`` attribute. As a result, only class types can adopt and conform
to a protocol that contains optional member requirements.
For more information about how to use the ``optional`` declaration modifier
and for guidance about how to access optional protocol members---
for example, when you're not sure whether a conforming type implements them---
see :ref:`Protocols_OptionalProtocolRequirements`.

.. TODO: Currently, you can't check for an optional initializer,
    so we're leaving those out of the documentation, even though you can mark
    an initializer with the @optional attribute. It's still being decided by the
    compiler team. Update this section if they decide to make everything work
    properly for optional initializer requirements.

To restrict the adoption of a protocol to class types only,
mark the protocol with the ``class`` requirement
by writing the ``class`` keyword as the first item in the *inherited protocols*
list after the colon.
For example, the following protocol can be adopted only by class types:

.. testcode:: protocol-declaration

    -> protocol SomeProtocol: class {
           /* Protocol members go here */
       }

Any protocol that inherits from a protocol that's marked with the ``class`` requirement
can likewise be adopted only by class types.

.. note::

    If a protocol is marked with the ``objc`` attribute,
    the ``class`` requirement is implicitly applied to that protocol;
    there’s no need to mark the protocol with the ``class`` requirement explicitly.

Protocols are named types, and thus they can appear in all the same places
in your code as other named types, as discussed in :ref:`Protocols_ProtocolsAsTypes`.
However,
you can't construct an instance of a protocol,
because protocols do not actually provide the implementations for the requirements
they specify.

You can use protocols to declare which methods a delegate of a class or structure
should implement, as described in :ref:`Protocols_Delegation`.

.. langref-grammar

    decl-protocol ::= attribute-list 'protocol' identifier inheritance? '{' protocol-member* '}'
    protocol-member ::= decl-func
    protocol-member ::= decl-var
    protocol-member ::= subscript-head
    protocol-member ::= typealias-head

.. syntax-grammar::

    Grammar of a protocol declaration

    protocol-declaration --> attributes-OPT access-level-modifier-OPT ``protocol`` protocol-name type-inheritance-clause-OPT protocol-body
    protocol-name --> identifier
    protocol-body --> ``{`` protocol-member-declarations-OPT ``}``

    protocol-member-declaration --> protocol-property-declaration
    protocol-member-declaration --> protocol-method-declaration
    protocol-member-declaration --> protocol-initializer-declaration
    protocol-member-declaration --> protocol-subscript-declaration
    protocol-member-declaration --> protocol-associated-type-declaration
    protocol-member-declarations --> protocol-member-declaration protocol-member-declarations-OPT


.. _Declarations_ProtocolPropertyDeclaration:

Protocol Property Declaration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Protocols declare that conforming types must implement a property
by including a :newTerm:`protocol property declaration`
in the body of the protocol declaration.
Protocol property declarations have a special form of a variable
declaration:

.. syntax-outline::

    var <#property name#>: <#type#> { get set }

As with other protocol member declarations, these property declarations
declare only the getter and setter requirements for types
that conform to the protocol. As a result, you don't implement the getter or setter
directly in the protocol in which it is declared.

The getter and setter requirements can be satisfied by a conforming type in a variety of ways.
If a property declaration includes both the ``get`` and ``set`` keywords,
a conforming type can implement it with a stored variable property
or a computed property that is both readable and writeable
(that is, one that implements both a getter and a setter). However,
that property declaration can't be implemented as a constant property
or a read-only computed property. If a property declaration includes
only the ``get`` keyword, it can be implemented as any kind of property.
For examples of conforming types that implement the property requirements of a protocol,
see :ref:`Protocols_PropertyRequirements`.

.. TODO:
    Because we're not going to have 'class' properties for 1.0,
    you can't declare static or type properties in a protocol declaration.
    Add the following text back in after we get the ability to do 'class' properties:

    To declare a type property requirement in a protocol declaration,
    mark the property declaration with the ``class`` keyword. Classes that implement
    this property also declare the property with the ``class`` keyword. Structures
    that implement it must declare the property with the ``static`` keyword instead.
    If you're implementing the property in an extension,
    use the ``class`` keyword if you're extending a class and the ``static`` keyword
    if you're extending a structure.

See also :ref:`Declarations_VariableDeclaration`.

.. syntax-grammar::

    Grammar of a protocol property declaration

    protocol-property-declaration --> variable-declaration-head variable-name type-annotation getter-setter-keyword-block


.. _Declarations_ProtocolMethodDeclaration:

Protocol Method Declaration
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Protocols declare that conforming types must implement a method
by including a protocol method declaration in the body of the protocol declaration.
Protocol method declarations have the same form as
function declarations, with two exceptions: They don't include a function body,
and you can't provide any default parameter values as part of the function declaration.
For examples of conforming types that implement the method requirements of a protocol,
see :ref:`Protocols_MethodRequirements`.

To declare a class or static method requirement in a protocol declaration,
mark the method declaration with the ``static`` declaration modifier. Classes that implement
this method declare the method with the ``class`` modifier. Structures
that implement it must declare the method with the ``static`` declaration modifier instead.
If you're implementing the method in an extension,
use the ``class`` modifier if you're extending a class and the ``static`` modifier
if you're extending a structure.

See also :ref:`Declarations_FunctionDeclaration`.

.. TODO: Talk about using ``Self`` in parameters and return types.

.. syntax-grammar::

    Grammar of a protocol method declaration

    protocol-method-declaration --> function-head function-name generic-parameter-clause-OPT function-signature


.. _Declarations_ProtocolInitializerDeclaration:

Protocol Initializer Declaration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Protocols declare that conforming types must implement an initializer
by including a protocol initializer declaration in the body of the protocol declaration.
Protocol initializer declarations have the same form as
initializer declarations, except they don't include the initializer's body.

A conforming type can satisfy a nonfailable protocol initializer requirement
by implementing a nonfailable initializer or an ``init!`` failable initializer.
A conforming type can satisfy a failable protocol initializer requirement
by implementing any kind of initializer.

When a class implements an initializer to satisfy a protocol's initializer requirement,
the initializer must be marked with the ``required`` declaration modifier
if the class is not already marked with the ``final`` declaration modifier.

See also :ref:`Declarations_InitializerDeclaration`.

.. syntax-grammar::

    Grammar of a protocol initializer declaration

    protocol-initializer-declaration --> initializer-head generic-parameter-clause-OPT parameter-clause ``throws``-OPT
    protocol-initializer-declaration --> initializer-head generic-parameter-clause-OPT parameter-clause ``rethrows``


.. _Declarations_ProtocolSubscriptDeclaration:


Protocol Subscript Declaration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Protocols declare that conforming types must implement a subscript
by including a protocol subscript declaration in the body of the protocol declaration.
Protocol subscript declarations have a special form of a subscript declaration:

.. syntax-outline::

    subscript (<#parameters#>) -> <#return type#> { get set }

Subscript declarations only declare the minimum getter and setter implementation
requirements for types that conform to the protocol.
If the subscript declaration includes both the ``get`` and ``set`` keywords,
a conforming type must implement both a getter and a setter clause.
If the subscript declaration includes only the ``get`` keyword,
a conforming type must implement *at least* a getter clause
and optionally can implement a setter clause.

See also :ref:`Declarations_SubscriptDeclaration`.

.. syntax-grammar::

    Grammar of a protocol subscript declaration

    protocol-subscript-declaration --> subscript-head subscript-result getter-setter-keyword-block


.. _Declarations_ProtocolAssociatedTypeDeclaration:

Protocol Associated Type Declaration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Protocols declare associated types using the ``associatedtype`` keyword.
An associated type provides an alias for a type
that is used as part of a protocol's declaration.
Associated types are similar to type parameters in generic parameter clauses,
but they're associated with ``Self`` in the protocol in which they're declared.
In that context, ``Self`` refers to the eventual type that conforms to the protocol.
For more information and examples,
see :ref:`Generics_AssociatedTypes`.

.. TODO: Finish writing this section after WWDC.

.. NOTE:
    What are associated types? What are they "associated" with? Is "Self"
    an implicit associated type of every protocol? [...]

    Here's an initial stab:
    An Associated Type is associated with an implementation of that protocol.
    The protocol declares it, and is defined as part of the protocol's implementation.

    "The ``Self`` type allows you to refer to the eventual type of ``self``
    (where ``self`` is the type that conforms to the protocol).
    In addition to ``Self``, a protocol's operations often need to refer to types
    that are related to the type of ``Self``, such as a type of data stored in a
    collection or the node and edge types of a graph." Is this still true?

    NOTES from Doug:
    At one point, Self was an associated type, but that's the wrong modeling of
    the problem.  Self is the stand-in type for the thing that conforms to the
    protocol.  It's weird to think of it as an associated type because it's the
    primary thing.  It's certainly not an associated type.  In many ways, you
    can think of associated types as being parameters that get filled in by the
    conformance of a specific concrete type to that protocol.

    There's a substitution mapping here.  The parameters are associated with
    Self because they're derived from Self.  When you have a concrete type that
    conforms to a protocol, it supplies concrete types for Self and all the
    associated types.

    The associated types are like parameters, but they're associated with Self in
    the protocol.  Self is the eventual type of the thing that conforms to the
    protocol -- you have to have a name for it so you can do things with it.

    We use "associated" in contrast with generic parameters in interfaces in C#.
    The interesting thing there is that they don't have a name like Self for the
    actual type, but you can name any of these independant types.    In theory,
    they're often independent but in practice they're often not -- you have an
    interface parameterized on T, where all the uses of the thing are that T are
    the same as Self.  Instead of having these independant parameters to an
    interface, we have a named thing (Self) and all these other things that hand
    off of it.

    Here's a stupid simple way to see the distinction:

    C#:

    interface Sequence <Element> {}

    class String : Sequence <UnicodeScalar>
    class String : Sequence <GraphemeCluster>

    These are both fine in C#

    Swift:

    protocol Sequence { typealias Element }

    class String : Sequence { typealias Element = ... }

    Here you have to pick one or the other -- you can't have both.


See also :ref:`Declarations_TypealiasDeclaration`.

.. syntax-grammar::

    Grammar of a protocol associated type declaration

    protocol-associated-type-declaration --> attributes-OPT access-level-modifier-OPT ``associatedtype`` typealias-name type-inheritance-clause-OPT typealias-assignment-OPT

.. _Declarations_InitializerDeclaration:

Initializer Declaration
-----------------------

An :newTerm:`initializer declaration` introduces an initializer for a class,
structure, or enumeration into your program.
Initializer declarations are declared using the ``init`` keyword and have
two basic forms.

Structure, enumeration, and class types can have any number of initializers,
but the rules and associated behavior for class initializers are different.
Unlike structures and enumerations, classes have two kinds of initializers:
designated initializers and convenience initializers,
as described in :doc:`../LanguageGuide/Initialization`.

The following form declares initializers for structures, enumerations,
and designated initializers of classes:

.. syntax-outline::

    init(<#parameters#>) {
       <#statements#>
    }

A designated initializer of a class initializes
all of the class's properties directly. It can't call any other initializers
of the same class, and if the class has a superclass, it must call one of
the superclass's designated initializers.
If the class inherits any properties from its superclass, one of the
superclass's designated initializers must be called before any of these
properties can be set or modified in the current class.

Designated initializers can be declared in the context of a class declaration only
and therefore can't be added to a class using an extension declaration.

Initializers in structures and enumerations can call other declared initializers
to delegate part or all of the initialization process.

To declare convenience initializers for a class,
mark the initializer declaration with the ``convenience`` declaration modifier.

.. syntax-outline::

    convenience init(<#parameters#>) {
       <#statements#>
    }

Convenience initializers can delegate the initialization process to another
convenience initializer or to one of the class's designated initializers.
That said, the initialization processes must end with a call to a designated
initializer that ultimately initializes the class's properties.
Convenience initializers can't call a superclass's initializers.

You can mark designated and convenience initializers with the ``required``
declaration modifier to require that every subclass implement the initializer.
A subclass’s implementation of that initializer
must also be marked with the ``required`` declaration modifier.

By default, initializers declared in a superclass
are not inherited by subclasses.
That said, if a subclass initializes all of its stored properties with default values
and doesn't define any initializers of its own,
it inherits all of the superclass's initializers.
If the subclass overrides all of the superclass’s designated initializers,
it inherits the superclass’s convenience initializers.

As with methods, properties, and subscripts,
you need to mark overridden designated initializers with the ``override`` declaration modifier.

.. note::

    If you mark an initializer with the ``required`` declaration modifier,
    you don't also mark the initializer with the ``override`` modifier
    when you override the required initializer in a subclass.

Just like functions and methods, initializers can throw or rethrow errors.
And just like functions and methods,
you use the ``throws`` or ``rethrows`` keyword after an initializer's parameters
to indicate the appropriate behavior.

To see examples of initializers in various type declarations,
see :doc:`../LanguageGuide/Initialization`.

.. _Declarations_FailableInitializers:

Failable Initializers
~~~~~~~~~~~~~~~~~~~~~

A :newTerm:`failable initializer` is a type of initializer that produces an optional instance
or an implicitly unwrapped optional instance of the type the initializer is declared on.
As a result, a failable initializer can return ``nil`` to indicate that initialization failed.

To declare a failable initializer that produces an optional instance,
append a question mark to the ``init`` keyword in the initializer declaration (``init?``).
To declare a failable initializer that produces an implicitly unwrapped optional instance,
append an exclamation mark instead (``init!``). The example below shows an ``init?``
failable initializer that produces an optional instance of a structure.

.. testcode:: failable

    -> struct SomeStruct {
           let property: String
           // produces an optional instance of 'SomeStruct'
           init?(input: String) {
               if input.isEmpty {
                   // discard 'self' and return 'nil'
                   return nil
               }
               property = input
           }
       }

You call an ``init?`` failable initializer in the same way that you call a nonfailable initializer,
except that you must deal with the optionality of the result.

.. testcode:: failable

    -> if let actualInstance = SomeStruct(input: "Hello") {
           // do something with the instance of 'SomeStruct'
       } else {
           // initialization of 'SomeStruct' failed and the initializer returned 'nil'
       }

A failable initializer can return ``nil``
at any point in the implementation of the initializer's body.

A failable initializer can delegate to any kind of initializer.
A nonfailable initializer can delegate to another nonfailable initializer
or to an ``init!`` failable initializer.
A nonfailable initializer can delegate to an ``init?`` failable initializer
by force-unwrapping the result of the superclass's initializer ---
for example, by writing ``super.init()!``.

Initialization failure propagates through initializer delegation.
Specifically,
if a failable initializer delegates to an initializer that fails and returns ``nil``,
then the initializer that delegated also fails and implicitly returns ``nil``.
If a nonfailable initializer delegates to an ``init!`` failable initializer that fails and returns ``nil``,
then a runtime error is raised
(as if you used the ``!`` operator to unwrap an optional that has a ``nil`` value).

A failable designated initializer can be overridden in a subclass
by any kind of designated initializer.
A nonfailable designated initializer can be overridden in a subclass
by a nonfailable designated initializer only.

For more information and to see examples of failable initializers,
see :ref:`Initialization_FailableInitializers`.

.. langref-grammar

    decl-constructor ::= attribute-list 'init' generic-params? constructor-signature brace-item-list
    constructor-signature ::= pattern-tuple
    constructor-signature ::= identifier-or-any selector-tuple

.. syntax-grammar::

    Grammar of an initializer declaration

    initializer-declaration --> initializer-head generic-parameter-clause-OPT parameter-clause ``throws``-OPT initializer-body
    initializer-declaration --> initializer-head generic-parameter-clause-OPT parameter-clause ``rethrows`` initializer-body
    initializer-head --> attributes-OPT declaration-modifiers-OPT ``init``
    initializer-head --> attributes-OPT declaration-modifiers-OPT ``init`` ``?``
    initializer-head --> attributes-OPT declaration-modifiers-OPT ``init`` ``!``
    initializer-body --> code-block


.. _Declarations_DeinitializerDeclaration:

Deinitializer Declaration
-------------------------

A :newTerm:`deinitializer declaration` declares a deinitializer for a class type.
Deinitializers take no parameters and have the following form:

.. syntax-outline::

    deinit {
       <#statements#>
    }

A deinitializer is called automatically when there are no longer any references
to a class object, just before the class object is deallocated.
A deinitializer can be declared only in the body of a class declaration---
but not in an extension of a class---
and each class can have at most one.

A subclass inherits its superclass's deinitializer,
which is implicitly called just before the subclass object is deallocated.
The subclass object is not deallocated until all deinitializers in its inheritance chain
have finished executing.

Deinitializers are not called directly.

For an example of how to use a deinitializer in a class declaration,
see :doc:`../LanguageGuide/Deinitialization`.


.. langref-grammar

    decl-de ::= attribute-list 'deinit' brace-item-list
    NOTE: langref contains a typo here---should be 'decl-deinitializer'

.. syntax-grammar::

    Grammar of a deinitializer declaration

    deinitializer-declaration --> attributes-OPT ``deinit`` code-block

.. _Declarations_ExtensionDeclaration:


Extension Declaration
---------------------

An :newTerm:`extension declaration` allows you to extend the behavior of existing
class, structure, and enumeration types.
Extension declarations are declared using the ``extension`` keyword and have the following form:

.. syntax-outline::

    extension <#type name#>: <#adopted protocols#> {
       <#declarations#>
    }

The body of an extension declaration contains zero or more *declarations*.
These *declarations* can include computed properties, computed type properties,
instance methods, type methods, initializers, subscript declarations,
and even class, structure, and enumeration declarations.
Extension declarations can't contain deinitializer or protocol declarations,
stored properties, property observers, or other extension declarations.
For a discussion and several examples of extensions that include various kinds of declarations,
see :doc:`../LanguageGuide/Extensions`.

Extension declarations can add protocol conformance to an existing
class, structure, and enumeration type in the *adopted protocols*.
Extension declarations can't add class inheritance to an existing class,
and therefore you can specify only a list of protocols after the *type name* and colon.

Properties, methods, and initializers of an existing type
can't be overridden in an extension of that type.

Extension declarations can contain initializer declarations. That said,
if the type you're extending is defined in another module,
an initializer declaration must delegate to an initializer already defined in that module
to ensure members of that type are properly initialized.

.. TODO: TR: Verify that this is indeed the correct about initializers.
    For example, the Language Guide says:
    "If you provide a new initializer via an extension,
    you are still responsible for making sure that each instance is fully initialized
    once the initializer has completed, as described in
    :ref:`ClassesAndStructures_DefiniteInitialization`.
    Depending on the type you are extending, you may need to
    delegate to another initializer or call a superclass initializer
    at the end of your own initializer,
    to ensure that all instance properties are fully initialized."

.. assertion:: extension-can-have-where-clause

   >> extension Array where Element: Equatable {
          func f(x: Array) -> Int { return 7 }
      }
   >> let x = [1, 2, 3]
   << // x : [Int] = [1, 2, 3]
   >> let y = [10, 20, 30]
   << // y : [Int] = [10, 20, 30]
   >> x.f(x: y)
   << // r0 : Int = 7

.. assertion:: extensions-can-have-where-clause-and-inheritance

   >> protocol P { func foo() }
   >> extension Array: P where Element: Equatable {
   >>    func foo() {}
   >> }
   !! <REPL Input>:1:1: error: extension of type 'Array' with constraints cannot have an inheritance clause
   !!    extension Array: P where Element: Equatable {
   !!    ^                ~

.. langref-grammar

    decl-extension ::= 'extension' type-identifier inheritance? '{' decl* '}'

.. syntax-grammar::

    Grammar of an extension declaration

    extension-declaration --> access-level-modifier-OPT ``extension`` type-identifier type-inheritance-clause-OPT extension-body
    extension-declaration --> access-level-modifier-OPT ``extension`` type-identifier requirement-clause extension-body
    extension-body --> ``{`` declarations-OPT ``}``


.. _Declarations_SubscriptDeclaration:

Subscript Declaration
---------------------

A :newTerm:`subscript` declaration allows you to add subscripting support for objects
of a particular type and are typically used to provide a convenient syntax
for accessing the elements in a collection, list, or sequence.
Subscript declarations are declared using the ``subscript`` keyword
and have the following form:

.. syntax-outline::

    subscript (<#parameters#>) -> <#return type#> {
       get {
          <#statements#>
       }
       set(<#setter name#>) {
          <#statements#>
       }
    }

Subscript declarations can appear only in the context of a class, structure,
enumeration, extension, or protocol declaration.

The *parameters* specify one or more indexes used to access elements of the corresponding type
in a subscript expression (for example, the ``i`` in the expression ``object[i]``).
Although the indexes used to access the elements can be of any type,
each parameter must include a type annotation to specify the type of each index.
The *return type* specifies the type of the element being accessed.

As with computed properties,
subscript declarations support reading and writing the value of the accessed elements.
The getter is used to read the value,
and the setter is used to write the value.
The setter clause is optional,
and when only a getter is needed, you can omit both clauses and simply
return the requested value directly.
That said, if you provide a setter clause, you must also provide a getter clause.

The *setter name* and enclosing parentheses are optional.
If you provide a setter name, it is used as the name of the parameter to the setter.
If you do not provide a setter name, the default parameter name to the setter is ``value``.
The type of the *setter name* must be the same as the *return type*.

You can overload a subscript declaration in the type in which it is declared,
as long as the *parameters* or the *return type* differ from the one you're overloading.
You can also override a subscript declaration inherited from a superclass. When you do so,
you must mark the overridden subscript declaration with the ``override`` declaration modifier.

By default, the parameters used in subscripting don't have argument labels,
unlike functions, methods, and initializers.
However, you can provide explicit argument labels
using the same syntax that functions, methods, and initializers use.

You can also declare subscripts in the context of a protocol declaration,
as described in :ref:`Declarations_ProtocolSubscriptDeclaration`.

For more information about subscripting and to see examples of subscript declarations,
see :doc:`../LanguageGuide/Subscripts`.

.. langref-grammar
    decl-subscript ::= subscript-head '{' get-set '}'

    // 'get' is implicit in this syntax.
    decl-subscript ::= subscript-head brace-item-list

    // For use in protocols.
    decl-subscript ::= subscript-head '{' get-set-kw '}'

    subscript-head ::= attribute-list 'subscript' pattern-tuple '->' type

.. syntax-grammar::

    Grammar of a subscript declaration

    subscript-declaration --> subscript-head subscript-result code-block
    subscript-declaration --> subscript-head subscript-result getter-setter-block
    subscript-declaration --> subscript-head subscript-result getter-setter-keyword-block
    subscript-head --> attributes-OPT declaration-modifiers-OPT ``subscript`` parameter-clause
    subscript-result --> ``->`` attributes-OPT type


.. _Declarations_OperatorDeclaration:

Operator Declaration
--------------------

An :newTerm:`operator declaration` introduces a new infix, prefix,
or postfix operator into your program
and is declared using the ``operator`` keyword.

You can declare operators of three different fixities:
infix, prefix, and postfix.
The :newTerm:`fixity` of an operator specifies the relative position of an operator
to its operands.

There are three basic forms of an operator declaration,
one for each fixity.
The fixity of the operator is specified by marking the operator declaration with the
``infix``, ``prefix``, or ``postfix`` declaration modifier before the ``operator`` keyword.
In each form, the name of the operator can contain only the operator characters
defined in :ref:`LexicalStructure_Operators`.

The following form declares a new infix operator:

.. syntax-outline::

    infix operator <#operator name#> {
       precedence <#precedence level#>
       associativity <#associativity#>
    }

An :newTerm:`infix operator` is a binary operator that is written between its two operands,
such as the familiar addition operator (``+``) in the expression ``1 + 2``.

Infix operators can optionally specify a precedence, associativity, or both.

The :newTerm:`precedence` of an operator specifies how tightly an operator
binds to its operands in the absence of grouping parentheses.
You specify the precedence of an operator by writing the context-sensitive ``precedence`` keyword
followed by the *precedence level*.
The *precedence level* can be any whole number (decimal integer) from 0 to 255;
unlike decimal integer literals, it can't contain any underscore characters.
Although the precedence level is a specific number,
it is significant only relative to another operator.
That is, when two operators compete with each other for their operands,
such as in the expression ``2 + 3 * 5``, the operator with the higher precedence level
binds more tightly to its operands.

The :newTerm:`associativity` of an operator specifies how a sequence of operators
with the same precedence level are grouped together in the absence of grouping parentheses.
You specify the associativity of an operator by writing the context-sensitive ``associativity`` keyword
followed by the *associativity*, which is one of the context-sensitive keywords ``left``, ``right``,
or ``none``. Operators that are left-associative group left-to-right. For example,
the subtraction operator (``-``) is left-associative,
and therefore the expression ``4 - 5 - 6`` is grouped as ``(4 - 5) - 6``
and evaluates to ``-7``. Operators that are right-associative group right-to-left,
and operators that are specified with an associativity of ``none`` don't associate at all.
Nonassociative operators of the same precedence level can't appear adjacent to each to other.
For example, ``1 < 2 < 3`` is not a valid expression.

Infix operators that are declared without specifying a precedence or associativity are
initialized with a precedence level of 100 and an associativity of ``none``.

The following form declares a new prefix operator:

.. syntax-outline::

    prefix operator <#operator name#> {}

A :newTerm:`prefix operator` is a unary operator that is written immediately before its operand,
such as the prefix logical NOT operator (``!``) in the expression ``!a``.

Prefix operators declarations don't specify a precedence level.
Prefix operators are nonassociative.

The following form declares a new postfix operator:

.. syntax-outline::

    postfix operator <#operator name#> {}

A :newTerm:`postfix operator` is a unary operator that is written immediately after its operand,
such as the postfix forced-unwrap operator (``!``) in the expression ``a!``.

As with prefix operators, postfix operator declarations don't specify a precedence level.
Postfix operators are nonassociative.

After declaring a new operator,
you implement it by declaring a function that has the same name as the operator.
If you're implementing a prefix or postfix operator,
you must also mark that function declaration with the corresponding ``prefix`` or ``postfix``
declaration modifier.
If you're implementing an infix operator,
you don't mark that function declaration with the ``infix`` declaration modifier.
To see an example of how to create and implement a new operator,
see :ref:`AdvancedOperators_CustomOperators`.

.. syntax-grammar::

    Grammar of an operator declaration

    operator-declaration --> prefix-operator-declaration | postfix-operator-declaration | infix-operator-declaration

    prefix-operator-declaration --> ``prefix`` ``operator`` operator ``{`` ``}``
    postfix-operator-declaration --> ``postfix`` ``operator`` operator ``{`` ``}``
    infix-operator-declaration --> ``infix`` ``operator`` operator ``{`` infix-operator-attributes-OPT ``}``

    infix-operator-attributes --> associativity-clause precedence-clause-OPT
    infix-operator-attributes --> precedence-clause associativity-clause-OPT
    precedence-clause --> ``precedence`` precedence-level
    precedence-level --> A decimal integer between 0 and 255, inclusive
    associativity-clause --> ``associativity`` associativity
    associativity --> ``left`` | ``right`` | ``none``

.. TR: I added this grammar from looking at ParseDecl.cpp and from trying
    to various permutations in the REPL. Is this a correct grammar?


.. _Declarations_DeclarationModifiers:

Declaration Modifiers
---------------------

:newTerm:`Declaration modifiers` are keywords or context-sensitive keywords that modify the behavior
or meaning of a declaration. You specify a declaration modifier by writing the appropriate
keyword or context-sensitive keyword between a declaration's attributes (if any) and the keyword
that introduces the declaration.

``dynamic``
    Apply this modifier to any member of a class that can be represented by Objective-C.
    When you mark a member declaration with the ``dynamic`` modifier,
    access to that member is always dynamically dispatched using the Objective-C runtime.
    Access to that member is never inlined or devirtualized by the compiler.

    Because declarations marked with the ``dynamic`` modifier are dispatched
    using the Objective-C runtime, they're implicitly marked with the
    ``objc`` attribute.

``final``
    Apply this modifier to a class or to a property, method,
    or subscript member of a class. It's applied to a class to indicate that the class
    can't be subclassed. It's applied to a property, method, or subscript of a class
    to indicate that a class member can't be overridden in any subclass.
    For an example of how to use the ``final`` attribute,
    see :ref:`Inheritance_PreventingOverrides`.

``lazy``
    Apply this modifier to a stored variable property of a class or structure
    to indicate that the property's initial value is calculated and stored at most
    once, when the property is first accessed.
    For an example of how to use the ``lazy`` modifier,
    see :ref:`Properties_LazyStoredProperties`.

``optional``
    Apply this modifier to a protocol's property, method,
    or subscript members to indicate that a conforming type isn't required
    to implement those members.

    You can apply the ``optional`` modifier only to protocols that are marked
    with the ``objc`` attribute. As a result, only class types can adopt and conform
    to a protocol that contains optional member requirements.
    For more information about how to use the ``optional`` modifier
    and for guidance about how to access optional protocol members---
    for example, when you're not sure whether a conforming type implements them---
    see :ref:`Protocols_OptionalProtocolRequirements`.

.. TODO: Currently, you can't check for an optional initializer,
    so we're leaving those out of the documentation, even though you can mark
    an initializer with the @optional attribute. It's still being decided by the
    compiler team. Update this section if they decide to make everything work
    properly for optional initializer requirements.

``required``
    Apply this modifier to a designated or convenience initializer
    of a class to indicate that every subclass must implement that initializer.
    The subclass's implementation of that initializer
    must also be marked with the ``required`` modifier.

``weak``
    The ``weak`` modifier is applied to a variable or a stored variable property
    to indicate that the variable or property has a weak reference to the
    object stored as its value. The type of the variable or property
    must be an optional class type. Use the ``weak`` modifier to avoid strong
    reference cycles.
    For an example and more information about the ``weak`` modifier,
    see :ref:`AutomaticReferenceCounting_WeakReferencesBetweenClassInstances`.


.. _Declarations_AccessControlLevels:

Access Control Levels
~~~~~~~~~~~~~~~~~~~~~

Swift provides three levels of access control: public, internal, and private.
You can mark a declaration with one of the access-level modifiers below
to specify the declaration's access level.
Access control is discussed in detail in :doc:`../LanguageGuide/AccessControl`.

``public``
    Apply this modifier to a declaration to indicate the declaration can be accessed
    by code in the same module as the declaration.
    Declarations marked with the ``public`` access-level modifier can also be accessed
    by code in a module that imports the module that contains that declaration.

``internal``
    Apply this modifier to a declaration to indicate the declaration can be accessed
    only by code in the same module as the declaration.
    By default,
    most declarations are implicitly marked with the ``internal`` access-level modifier.

``private``
    Apply this modifier to a declaration to indicate the declaration can be accessed
    only by code in the same source file as the declaration.

Each access-level modifier above optionally accepts a single argument,
which consists of the ``set`` keyword enclosed in parentheses (for instance, ``private(set)``).
Use this form of an access-level modifier when you want to specify an access level
for the setter of a variable or subscript that's less than or equal
to the access level of the variable or subscript itself,
as discussed in :ref:`AccessControl_GettersAndSetters`.

.. syntax-grammar::

    Grammar of a declaration modifier

    declaration-modifier --> ``class`` | ``convenience`` | ``dynamic`` | ``final`` | ``infix`` | ``lazy`` | ``mutating`` | ``nonmutating`` | ``optional`` | ``override`` | ``postfix`` | ``prefix`` | ``required`` | ``static`` | ``unowned`` | ``unowned`` ``(`` ``safe`` ``)`` | ``unowned`` ``(`` ``unsafe`` ``)`` | ``weak``
    declaration-modifier --> access-level-modifier
    declaration-modifiers --> declaration-modifier declaration-modifiers-OPT

    access-level-modifier --> ``internal`` | ``internal`` ``(`` ``set`` ``)``
    access-level-modifier --> ``private`` | ``private`` ``(`` ``set`` ``)``
    access-level-modifier --> ``public`` | ``public`` ``(`` ``set`` ``)``
