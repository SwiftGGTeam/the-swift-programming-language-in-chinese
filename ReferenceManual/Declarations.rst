Declarations
============

A :newTerm:`declaration` introduces a new name or construct into your program.
For example, you use declarations to introduce functions and methods, variables and constants,
and to define new, named enumeration, structure, class,
and protocol types. You can also use a declaration to extend the the behavior
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

    declaration-specifiers --> declaration-specifier declaration-specifiers-OPT
    declaration-specifier --> ``class`` | ``mutating`` | ``nonmutating`` | ``override`` | ``static`` | ``unowned`` | ``unowned(safe)`` | ``unowned(unsafe)`` | ``weak``

.. NOTE: Removed enum-member-declaration, because we don't need it anymore.

.. NOTE: Added 'operator-declaration' based on ParseDecl.cpp.


.. _LexicalStructure_ModuleScope:

Module Scope
------------

.. write-me:: Need to get the TR below answered to write more about this.

The :newTerm:`module scope` defines the top-level (global) scope of a Swift source file.
It consists of a series of statements, which include declarations,
expressions, and other kinds of statements.

Variables, constants, and other named declarations that are declared at global scope
are visible to any other code in the same file.

.. TODO: Need to add more to this section.

.. TR: What exactly is "module scope"?
    Is it the scope of a *single* Swift source file?
    The way it's currently written here and in LangRef
    makes it seem like module scope is the same as the scope
    of a single Swift source file.

.. langref-grammar

    top-level ::= brace-item*

.. No formal grammar.


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

.. TODO: It seems odd to call these declarations -- they don't declare anything.
   Directive or statement feels a little more appropriate,
   although statement might not be strictly correct.
   LangRef uses both "import declaration" and "directive".

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

    import <#import kind#> <#module#>
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
Constant declarations are declared using the keyword ``let`` and have the following form:

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
    << // (firstNumber, secondNumber): (Int, Int) = (10, 42)

In this example,
``firstNumber`` is a named constant for the value ``10``,
and ``secondNumber`` is a named constant for the value ``42``.
Both constants can now be used independently:

.. testcode:: constant-decl

    -> println("The first number is \(firstNumber).")
    <- The first number is 10.
    -> println("The second number is \(secondNumber).")
    <- The second number is 42.

The type annotation (``:`` *type*) is optional in a constant declaration
when the type of the *constant name* can be inferred,
as described in :ref:`Types_TypeInference`.

To declare a static constant property,
mark the declaration with the ``static`` keyword. Static properties
are discussed in :ref:`Properties_StaticProperties`.

.. TODO: Discuss class properties after they're implemented
    (probably not until after 1.0)

    To declare a class constant property, mark the declaration with the ``class`` keyword.

.. TODO: Need to discuss static constant properties in more detail.

For more information about constants and for guidance about when to use them,
see :ref:`TheBasics_ConstantsAndVariables` and :ref:`Properties_StoredProperties`.

.. TODO: Need to discuss class and static constant properties.

.. langref-grammar

    decl-let    ::= attribute-list 'val' pattern initializer?  (',' pattern initializer?)*
    initializer ::= '=' expr

.. syntax-grammar::

    Grammar of a constant declaration

    constant-declaration --> attributes-OPT declaration-specifiers-OPT ``let`` pattern-initializer-list

    pattern-initializer-list --> pattern-initializer | pattern-initializer ``,`` pattern-initializer-list
    pattern-initializer --> pattern initializer-OPT
    initializer --> ``=`` expression


.. _Declarations_VariableDeclaration:

Variable Declaration
--------------------

A :newTerm:`variable declaration` introduces a variable named value into your program
and is declared using the keyword ``var``.

Variable declarations have several forms that declare different kinds
of named, mutable values,
including stored and computed variables and properties,
stored variable and property observers, and static variable properties.
The appropriate form to use depends on
the scope at which the variable is declared and the kind of variable you intend to declare.

.. note::

    You can also declare properties in the context of a protocol declaration,
    as described in :ref:`Declarations_ProtocolPropertyDeclaration`.

You can override a property in a subclass by prefixing the subclass's property declaration
with the ``override`` keyword, as described in :ref:`Inheritance_Overriding`.

.. _Declarations_StoredVariablesAndVariableStoredProperties:

Stored Variables and Variable Stored Properties
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following form declares a stored variable or variable stored property:

.. syntax-outline::

    var <#variable name#>: <#type#> = <#expression#>

You define this form of a variable declaration at global scope, the local scope
of a function, or in the context of a class or structure declaration.
When a variable declaration of this form is declared at global scope or the local
scope of a function, it is referred to as a :newTerm:`stored variable`.
When it is declared in the context of a class or structure declaration,
it is referred to as a :newTerm:`variable stored property`.

The initializer *expression* can't be present in a protocol declaration,
but in all other contexts, the initializer *expression* is optional.
That said, if no initializer *expression* is present,
the variable declaration must include an explicit type annotation (``:`` *type*).

As with constant declarations,
if the *variable name* is a tuple pattern,
the name of each item in the tuple is bound to the corresponding value
in the initializer *expression*.

As their names suggest, the value of a stored variable or a variable stored property
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

Unlike stored named values and variable stored properties,
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
       didSet(<#setter name#> {
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
but required elsewhere. The type annotation is required in all variable declarations that
include observers, regardless of the context in which they are declared.

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


.. _Declarations_StaticVariableProperties:

Static Variable Properties
~~~~~~~~~~~~~~~~~~~~~~~~~~

To declare a static variable property,
mark the declaration with the ``static`` keyword. Static properties
are discussed in :ref:`Properties_StaticProperties`.

.. TODO: Discuss class properties after they're implemented
    (probably not until after 1.0)

    To declare a class variable property, mark the declaration with the ``class`` keyword.

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
    variable-declaration --> variable-declaration-head variable-name type-annotation initializer-OPT willSet-didSet-block

    variable-declaration-head --> attributes-OPT declaration-specifiers-OPT ``var``
    variable-name --> identifier

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
    willSet-didSet-block --> ``{`` didSet-clause willSet-clause ``}``
    willSet-clause --> attributes-OPT ``willSet`` setter-name-OPT code-block
    didSet-clause --> attributes-OPT ``didSet`` setter-name-OPT code-block

.. NOTE: Type annotations are required for computed properties -- the
   types of those properties are not computed/inferred.


.. _Declarations_TypealiasDeclaration:

Typealias Declaration
---------------------

A :newTerm:`type alias declaration` introduces a named alias of an existing type into your program.
Type alias declarations begin with the keyword ``typealias`` and have the following form:

.. syntax-outline::

    typealias <#name#> = <#existing type#>

After a type alias is declared, the aliased *name* can be used
instead of the *existing type* everywhere in your program.
The *existing type* can be a named type or a compound type.
Type aliases do not create new types;
they simply allow a name to refer to an existing type.

See also :ref:`Declarations_ProtocolAssociatedTypeDeclaration`.

.. langref-grammar

    decl-typealias ::= typealias-head '=' type
    typealias-head ::= 'typealias' identifier inheritance?

.. syntax-grammar::

    Grammar of a typealias declaration

    typealias-declaration --> typealias-head typealias-assignment
    typealias-head --> ``typealias`` typealias-name
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

.. write-me:: Waiting for design decisions from compiler team.


.. syntax-outline::

    func <#function name#>(<#parameters#>) -> <#return type#> {
       <#statements#>
    }

.. syntax-outline::

    <#parameter name#>: <#parameter type#>
    <#parameter name#>: <#parameter type#>...
    <#parameter name#>: <#parameter type#> = <#default argument value#>
    <#parameter name#> <#local parameter name#>: <#parameter type#>
    `<#parameter name#>: <#parameter type#>

.. syntax-outline::

    func <#function name#>(<#parameters#>)(<#parameters#>) -> <#return type#> {
       <#statements#>
    }

.. TODO: Discuss in prose: Variadic functions and the other permutations of function declarations.


.. langref-grammar

    decl-func ::= attribute-list? ('static' | 'class')? 'mutating'? 'func' any-identifier generic-params? func-signature stmt-brace?
    func-signature ::= func-arguments func-signature-result?
    func-signature-result ::= '->' type

    func-arguments ::= curried-arguments
    curried-arguments ::= parameter-clause+

    parameter-clause ::= '(' ')' | '(' parameter (',' parameter)* '...'? )'
    parameter ::= 'inout'? ('let' | 'var')? '`'? identifier-or-none identifier-or-none? (':' type)? ('...' | '=' expr)?
    identifier-or-none ::= identifier | '_'

.. syntax-grammar::

    Grammar of a function declaration

    function-declaration --> function-head function-name generic-parameter-clause-OPT function-signature function-body

    function-head --> attributes-OPT declaration-specifiers-OPT ``func``
    function-name --> identifier | operator

    function-signature --> parameter-clauses function-result-OPT
    function-result --> ``->`` attributes-OPT type
    function-body --> code-block

    parameter-clauses --> parameter-clause parameter-clauses-OPT
    parameter-clause --> ``(`` ``)`` | ``(`` parameter-list ``...``-OPT ``)``
    parameter-list --> parameter | parameter ``,`` parameter-list
    parameter --> ``inout``-OPT ``let``-OPT `````-OPT parameter-name local-parameter-name-OPT type-annotation default-argument-clause-OPT
    parameter --> ``inout``-OPT ``var`` `````-OPT parameter-name local-parameter-name-OPT type-annotation default-argument-clause-OPT
    parameter --> attributes-OPT type
    parameter-name --> identifier | ``_``
    local-parameter-name --> identifier | ``_``
    default-argument-clause --> ``=`` expression


.. TODO: Code block is optional in the context of a protocol.
    Everywhere else, it's required.
    We could refactor to have a separation between function definition/declaration.
    There is also the low-level "asm name" FFI
    which is a definition and declaration corner case.
    Let's just deal with this difference in prose.


.. _Declarations_EnumerationDeclaration:

Enumeration Declaration
-----------------------

An :newTerm:`enumeration declaration` introduces a named enumeration type into your program.

Enumeration declarations have two basic forms and are declared using the keyword ``enum``.
The body of an enumeration declared using either form contains
zero or more values---called :newTerm:`enumeration cases`---
and any number of declarations,
including computed properties,
instance methods, static methods, initializers, type aliases,
and even other enumeration, structure, and class declarations.
Enumeration declarations can't contain destructor or protocol declarations.

Unlike classes and structures,
enumeration types do not have an implicitly provided default initializer;
all initializers must be declared explicitly. Initializers can delegate
to other initializers in the enumeration, but the initialization process is complete
only after an initializer assigns one of the enumeration cases to ``self``.

You can extend the behavior of an enumeration type with an extension declaration,
as discussed in :ref:`Declarations_ExtensionDeclaration`.

Enumerations with Cases of Any Type
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following form declares an enumeration type that contains
enumeration cases of any type:

.. syntax-outline::

    enum <#enumeration name#> {
        case <#enumeration case 1#>
        case <#enumeration case 2#>(<#associated value types#>)
    }

Enumerations declared in this form are sometimes called :newTerm:`discriminated unions`
in other programming languages.

In this form, each case block consists of the keyword ``case``
followed by one or more enumeration cases, separated by commas.
The name of each case must be unique.
Each case can also specify that it stores values of a given type.
These types are specified in the *associated value types* tuple,
immediately following the name of the case.
For more information and to see examples of cases with associated value types,
see :ref:`Enumerations_AssociatedValues`.

Enumerations with Cases of the Same Basic Type
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following form declares an enumeration type that contains
enumeration cases of the same basic type:

.. syntax-outline::

    enum <#enumeration name#> : <#raw value type#> {
        case <#enumeration case 1#> = <#raw value 1#>
        case <#enumeration case 2#> = <#raw value 2#>
    }

In this form, each case block consists of the keyword ``case``,
followed by one or more enumeration cases, separated by commas.
Unlike the cases in the first form, each case has an underlying
value, called a :newTerm:`raw value`, of the same basic type.
The type of these values is specified in the *raw value type* and must represent a literal
integer, floating-point number, character, or string.

Each case must have a unique name and be assigned a unique raw value.
If the raw value type is specified as ``Int``
and you don't assign a value to the cases explicitly,
they are implicitly assigned the values ``0``, ``1``, ``2``, and so on.
Each unassigned case of type ``Int`` is implicitly assigned a raw value
that is automatically incremented from the raw value of the previous case.

.. testcode::

    -> enum ExampleEnum: Int {
          case A, B, C = 5, D
       }

In the above example, the value of ``ExampleEnum.A`` is ``0`` and the value of
``ExampleEnum.B`` is ``1``. And because the value of ``ExampleEnum.C`` is
explicitly set to ``5``, the value of ``ExampleEnum.D`` is automatically incremented
from ``5`` and is therefore ``6``.

The raw value of an enumeration case can be accessed by calling its ``toRaw`` method,
as in ``ExampleEnum.B.toRaw()``.
You can also use a raw value to find a corresponding case, if there is one,
by calling the ``fromRaw`` method, which returns an optional case.
For more information and to see examples of cases with raw value types,
see :ref:`Enumerations_RawValues`.

Accessing Enumeration Cases
~~~~~~~~~~~~~~~~~~~~~~~~~~~

To reference the case of an enumeration type, use dot (``.``) syntax,
as in ``EnumerationType.EnumerationCase``. When the enumeration type can be inferred
from context, you can omit it (the dot is still required),
as described in :ref:`Enumerations_EnumerationSyntax`
and :ref:`Expressions_ImplicitMemberExpression`.

To check the values of enumeration cases, use a ``switch`` statement,
as shown in :ref:`Enumerations_CheckingEnumerationValuesWithASwitchStatement`.
The enumeration type is pattern-matched against the enumeration case patterns
in the case blocks of the ``switch`` statement,
as described in :ref:`Patterns_EnumerationCasePattern`.


.. TODO: Note that you can require protocol adoption,
    by using a protocol type as the raw value type,
    but you do need to make it be one of the types
    that support = in order for you to specify the raw values.
    You can have: <#raw value type, protocol conformance#>.
    UPDATE: You can only have one raw value type specified.
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

    enum-declaration --> attributes-OPT union-style-enum | attributes-OPT raw-value-style-enum

    union-style-enum --> enum-name generic-parameter-clause-OPT ``{`` union-style-enum-members-OPT ``}``
    union-style-enum-members --> union-style-enum-member union-style-enum-members-OPT
    union-style-enum-member --> declaration | union-style-enum-case-clause
    union-style-enum-case-clause --> attributes-OPT ``case`` union-style-enum-case-list
    union-style-enum-case-list --> union-style-enum-case | union-style-enum-case ``,`` union-style-enum-case-list
    union-style-enum-case --> enum-case-name tuple-type-OPT
    enum-name --> identifier
    enum-case-name --> identifier

    raw-value-style-enum --> enum-name generic-parameter-clause-OPT ``:`` type-identifier ``{`` raw-value-style-enum-members-OPT ``}``
    raw-value-style-enum-members --> raw-value-style-enum-member raw-value-style-enum-members-OPT
    raw-value-style-enum-member --> declaration | raw-value-style-enum-case-clause
    raw-value-style-enum-case-clause --> attributes-OPT ``case`` raw-value-style-enum-case-list
    raw-value-style-enum-case-list --> raw-value-style-enum-case | raw-value-style-enum-case ``,`` raw-value-style-enum-case-list
    raw-value-style-enum-case --> enum-case-name raw-value-assignment-OPT
    raw-value-assignment --> ``=`` literal

.. TODO: Adjust the prose to match the eventual outcome of
    <rdar://problem/16504472> Raw value enum cases accept negative intergers but not negative floating-point numbers,
    which I filed today, 4/2.
    This may require adjusting the grammar as well.

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
Structure declarations are declared using the keyword ``struct`` and have the following form:

.. syntax-outline::

    struct <#structure name#>: <#adopted protocols#> {
       <#declarations#>
    }

The body of a structure contains zero or more *declarations*.
These *declarations* can include both stored and computed properties,
static properties, instance methods, static methods, initializers,
type aliases, and even other structure, class, and enumeration declarations.
Structure declarations can't contain destructor or protocol declarations.
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
see :ref:`ClassesAndStructures_ValueTypesAndReferenceTypes`.

You can extend the behavior of a structure type with an extension declaration,
as discussed in :ref:`Declarations_ExtensionDeclaration`.

.. TODO: Discuss generic parameter clause in the context of a struct?

.. langref-grammar

    decl-struct ::= attribute-list 'struct' identifier generic-params? inheritance? '{' decl-struct-body '}'
    decl-struct-body ::= decl*

.. syntax-grammar::

   Grammar of a structure declaration

   struct-declaration --> attributes-OPT ``struct`` struct-name generic-parameter-clause-OPT type-inheritance-clause-OPT struct-body
   struct-name --> identifier
   struct-body --> ``{`` declarations-OPT ``}``


.. _Declarations_ClassDeclaration:

Class Declaration
-----------------

A :newTerm:`class declaration` introduces a named class type into your program.
Class declarations are declared using the keyword ``class`` and have the following form:

.. syntax-outline::

    class <#class name#>: <#superclass#>, <#adopted protocols#> {
       <#declarations#>
    }

The body of a class contains zero or more *declarations*.
These *declarations* can include both stored and computed properties,
instance methods, class methods, initializers,
a single destructor method, type aliases,
and even other class, structure, and enumeration declarations.
Class declarations can't contain protocol declarations.
For a discussion and several examples of classes
that include various kinds of declarations,
see :doc:`../LanguageGuide/ClassesAndStructures`.

A class type can inherit from only one parent class, its *superclass*,
but can adopt any number of protocols.
The *superclass* appears first in the **type-inheritance-clause**,
followed by any *adopted protocols*.

As discussed in :ref:`Declarations_InitializerDeclaration`,
classes can have designated and convenience initializers.
When you declare either kind of initializer,
you can require any subclass to override it by marking the initializer
with the ``required`` attribute.
The designated initializer of a class must initialize all of the class's
declared properties and it must do so before calling any of its superclass's
designated initializers.

A class can override properties, methods, and initializers of its superclass.
That said, a designated initializer of the class must call one of its superclass's
designated initializers before the class overrides any of the superclass's properties.
Overridden methods must be marked with the ``override`` keyword.

Although properties and methods declared in the *superclass* are inherited by
the current class, designated initializers declared in the *superclass* are not.
That said, if the current class overrides all of the superclass's
designated initializers, it inherits the superclass's convenience initializers.
Swift classes do not inherit from a universal base class.

.. TODO: Need a way to refer to grammatical categories (see type-inheritance-clause, above).

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
see :ref:`ClassesAndStructures_ValueTypesAndReferenceTypes`.

You can extend the behavior of a class type with an extension declaration,
as discussed in :ref:`Declarations_ExtensionDeclaration`.

.. TODO: Discuss generic parameter clause in the context of a class?

.. langref-grammar

    decl-class ::= attribute-list 'class' identifier generic-params? inheritance? '{' decl-class-body '}'
    decl-class-body ::= decl*

.. syntax-grammar::

    Grammar of a class declaration

    class-declaration --> attributes-OPT ``class`` class-name generic-parameter-clause-OPT type-inheritance-clause-OPT class-body
    class-name --> identifier
    class-body --> ``{`` declarations-OPT ``}``


.. _Declarations_ProtocolDeclaration:

Protocol Declaration
--------------------

A :newTerm:`protocol declaration` introduces a named protocol type into your program.
Protocol declarations are declared using the keyword ``protocol`` and have the following form:

.. syntax-outline::

    protocol <#protocol name#>: <#inherited protocols#> {
       <#protocol member declarations#>
    }

The body of a protocol contains zero or more *protocol member declarations*,
which describe the conformance requirements that any type adopting the protocol must fulfill.
In particular, a protocol can declare that conforming types must
implement certain properties, methods, initializers, and subscripts.
Protocols can also declare special kinds of type aliases,
called :newTerm:`associated types`, that can clarify the relationship
between the various declarations of the protocol.
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
That said, you can mark these protocol member declarations with the ``optional`` attribute
to specify that their implementation by a conforming type is optional.
The ``optional`` attribute can be applied only to protocols that are marked
with the ``objc`` attribute. As a result, only classes types can adopt and conform
to a protocol that contains optional member requirements.
For more information about how to use the ``optional`` attribute
and for guidance about how to access optional protocol members---
for example, when you're not sure whether a conforming type implements them---
see :ref:`Protocols_OptionalProtocolRequirements`.

.. TODO: Currently, you can't check for an optional initializer,
    so we're leaving those out of the documentation, even though you can mark
    an initializer with the @optional attribute. It's still being decided by the
    compiler team. Update this section if they decide to make everything work
    properly for optional initializer requirements.

To restrict the adoption of a protocol to class types only,
mark the entire protocol declaration with the ``class_protocol`` attribute.
Any protocol that inherits from a protocol marked with the ``class_protocol`` attribute
can likewise be adopted only by a class type.

Protocols are named types, and thus they can appear in all the same places
in your code as other named types, as discussed in :ref:`Protocols_UsingProtocolsAsTypes`.
However,
you can't construct an instance of a protocol,
because protocols do not actually provide the implementations for the requirements
they specify.

You can also use protocols to declare which methods a delegate of a class or structure
should implement, as described in :ref:`Protocols_Delegates`.

.. TODO: Now that functions and methods have syntactically diverged,
    we need a protocol-operator-function-declaration production and section
    to describe how you declare an operator requirement in a protocol and how the adopting
    type conforms to that protocol. Currently, a type satisfies this requirement if it
    adopts the protocol and the operator function is implemented at file-scope somewhere
    in the same module as that type.

.. langref-grammar

    decl-protocol ::= attribute-list 'protocol' identifier inheritance? '{' protocol-member* '}'
    protocol-member ::= decl-func
    protocol-member ::= decl-var
    protocol-member ::= subscript-head
    protocol-member ::= typealias-head

.. syntax-grammar::

    Grammar of a protocol declaration

    protocol-declaration --> attributes-OPT ``protocol`` protocol-name type-inheritance-clause-OPT protocol-body
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
a conforming type can implement it with a variable stored property
or a computed property that is both readable and writeable
(that is, one that implements both a getter and a setter). However,
that property declaration can't be implemented as a constant property
or a read-only computed property. If a property declaration includes
only the ``get`` keyword, it can be implemented as any kind of property.
For examples of conforming types that implement the property requirements of a protocol,
see :ref:`Protocols_InstanceProperties`.

.. TODO:
    Because we're not going to have 'class' properties for 1.0,
    you can't declare static or class properties in a protocol declaration.
    Add the following text back in after we get the ability to do 'class' properties:

    To declare a class or static property requirement in a protocol declaration,
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
see :ref:`Protocols_Methods`.

To declare a class or static method requirement in a protocol declaration,
mark the method declaration with the ``class`` keyword. Classes that implement
this method also declare the method with the ``class`` keyword. Structures
that implement it must declare the method with the ``static`` keyword instead.
If you're implementing the method in an extension,
use the ``class`` keyword if you're extending a class and the ``static`` keyword
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

See also :ref:`Declarations_InitializerDeclaration`.

.. syntax-grammar::

    Grammar of a protocol initializer declaration

    protocol-initializer-declaration --> initializer-head generic-parameter-clause-OPT parameter-clause

.. _Declarations_ProtocolSubscriptDeclaration:


Protocol Subscript Declaration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Protocols declare that conforming types must implement a subscript
by including a protocol subscript declaration in the body of the protocol declaration.
Protocol property declarations have a special form of a subscript declaration:

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

.. write-me:: Need to discuss with Dave what we want to call these things
    and where he plans on covering them.

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

    protocol-associated-type-declaration --> typealias-head type-inheritance-clause-OPT typealias-assignment-OPT


.. _Declarations_InitializerDeclaration:

Initializer Declaration
-----------------------

.. TODO: Rewrite/verify this section after Doug writes his "How Initialization Works Now"
    document, which should be finished later today, 3/18.
    I'll also need to revisit any other discussions of initialization in the chapter:
    enumerations, structures, classes, extensions, and protocols.

An :newTerm:`initializer declaration` introduces an initializer for a class,
structure, or enumeration into your program.
Initializer declarations are declared using the keyword ``init`` and have
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
prefix the initializer declaration with the context-sensitive keyword ``convenience``.

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
attribute to require that every subclass implement the initializer.
Because designated initializers are not inherited by subclasses,
they must be implemented directly.
Required convenience initializers can be either implemented explicitly
or inherited when the subclass directly implements all of the superclass’s designated
initializers (or overrides the designated initializers with convenience initializers).
Unlike methods, properties, and subscripts,
you don't need to mark overridden initializers with the ``override`` keyword.

To see examples of initializers in various type declarations,
see :doc:`../LanguageGuide/Initialization`.

.. langref-grammar

    decl-constructor ::= attribute-list 'init' generic-params? constructor-signature brace-item-list
    constructor-signature ::= pattern-tuple
    constructor-signature ::= identifier-or-any selector-tuple

.. syntax-grammar::

    Grammar of an initializer declaration

    initializer-declaration --> initializer-head generic-parameter-clause-OPT parameter-clause initializer-body
    initializer-head --> attributes-OPT ``convenience``-OPT ``init``
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
see :ref:`Initialization_Deinitializers`.


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
Extension declarations begin with the keyword ``extension`` and have the following form:

.. syntax-outline::

    extension <#type#>: <#adopted protocols#> {
       <#declarations#>
    }

The body of an extension declaration contains zero or more *declarations*.
These *declarations* can include computed properties, computed static properties,
instance methods, static and class methods, initializers, subscript declarations,
and even class, structure, and enumeration declarations.
Extension declarations can't contain destructor or protocol declarations,
store properties, property observers, or other extension declarations.
For a discussion and several examples of extensions that include various kinds of declarations,
see :doc:`../LanguageGuide/Extensions`.

Extension declarations can add protocol conformance to an existing
class, structure, and enumeration type in the *adopted protocols*.
Extension declarations can't add class inheritance to an existing class,
and therefore the **type-inheritance-clause** in an extension declaration
contains only a list of protocols.

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

.. langref-grammar

    decl-extension ::= 'extension' type-identifier inheritance? '{' decl* '}'

.. syntax-grammar::

    Grammar of an extension declaration

    extension-declaration --> ``extension`` type-identifier type-inheritance-clause-OPT extension-body
    extension-body --> ``{`` declarations-OPT ``}``

.. TODO: TR: What are the semantic rules associated with extending different types?
    The LangRef says "'extension' declarations allow adding member declarations to existing types,
    even in other source files and modules. There are different semantic rules for each type that is extended.
    enum, struct, and class declaration extensions. FIXME: Write this section."
    What is the relevant, missing information?
    What are the semantic rules associated with extending different types?

    TODO: Email Doug et al. in a week or two (from 1/29/14) to get the rules.


.. _Declarations_SubscriptDeclaration:

Subscript Declaration
---------------------

A :newTerm:`subscript` declaration allows you to add subscripting support for objects
of a particular type and are typically used to provide a convenient syntax
for accessing the elements in a collection, list, or sequence.
Subscript declarations are declared using the keyword ``subscript``
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

The *parameters* specify one or more indicies used to access elements of the corresponding type
in a subscript expression (for example, the ``i`` in the expression ``object[i]``).
Although the indicies used to access the elements can be of any type,
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
That type of the *setter name* must be the same as the *return type*.

You can overload a subscript declaration in the type in which it is declared,
as long as the *parameters* or the *return type* differ from the one you're overloading.
You can also override a subscript declaration inherited from a superclass. When you do so,
you must mark the overridden subscript declaration with the ``override`` keyword.

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
    subscript-head --> attributes-OPT ``subscript`` parameter-clause
    subscript-result --> ``->`` attributes-OPT type


.. _Declarations_OperatorDeclaration:

Operator Declaration
--------------------

An :newTerm:`operator declaration` introduces a new infix, prefix,
or postfix operator into your program
and is declared using the contextual keyword ``operator``.

You can declare operators of three different fixities:
infix, prefix, and postfix.
The :newTerm:`fixity` of an operator specifies the relative position of an operator
to its operands.

There are three basic forms of an operator declaration,
one for each fixity.
The fixity of the operator is specified by including the contextual keyword
``infix``, ``prefix``, or ``postfix`` between ``operator`` and the name of the operator.
In each form, the name of the operator can contain only the operator characters
defined in :ref:`LexicalStructure_Operators`.

The following form declares a new infix operator:

.. syntax-outline::

    operator infix <#operator name#> {
       precedence <#precedence level#>
       associativity <#associativity#>
    }

An :newTerm:`infix operator` is a binary operator that is written between its two operands,
such as the familiar addition operator (``+``) in the expression ``1 + 2``.

Infix operators can optionally specify a precedence, associativity, or both.

The :newTerm:`precedence` of an operator specifies how tightly an operator
binds to its operands in the absence of grouping parentheses.
You specify the precedence of an operator by writing the contextual keyword ``precedence``
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
You specify the associativity of an operator by writing the contextual keyword ``associativity``
followed by the *associativity*, which is one of the contextual keywords ``left``, ``right``,
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

    operator prefix <#operator name#> {}

A :newTerm:`prefix operator` is a unary operator that is written immediately before its operand,
such as the prefix increment operator (``++``) is in the expression ``++i``.

Prefix operators declarations don't specify a precedence level.
Prefix operators are nonassociative.

.. TR: Do all prefix operators default to the same precedence level? If so, what is it?

The following form declares a new postfix operator:

.. syntax-outline::

    operator postfix <#operator name#> {}

A :newTerm:`postfix operator` is a unary operator that is written immediately after its operand,
such as the postfix increment operator (``++``) is in the expression ``i++``.

As with prefix operators, postfix operator declarations don't specify a precedence level.
Postfix operators are nonassociative.

After declaring a new operator,
you implement it by declaring a function that has the same name as the operator.
To see an example of how to create and implement a new operator,
see :ref:`AdvancedOperators_CustomOperators`.

.. TODO: Should we give describe the most common stdlib operators somewhere?
    If so, the description should include the fixity, precedence, and associativity
    of each operator. Maybe a table would be best?
    The Langauge Guide currently says:
    "(A complete list of the default Swift operator precedence and associativity
    settings can be found in the :doc:`../ReferenceManual/index`.)"
    Aside: I'm not sure "settings" is the best word here. Maybe "values"?

.. TR: Do all postfix operators default to the same precedence level? If so, what is it?

.. TR: What do the current precedence levels (0—255) mean?
    How you we discuss them in the prose.

    The current LangRef says:
    "Swift has simplified precedence levels when compared with C.
    From highest to lowest:

    "exponentiative:" <<, >>  (associativity none, precedence 160)
    "multiplicative:" *, /, %, & (associativity left, precedence 150)
    "additive:" +, -, |, ^ (associativity left, precedence 140)
    "comparative:" ==, !=, <, <=, >=, > (associativity none, precedence 130)
    "conjunctive:" && (associativity left, precedence 120)
    "disjunctive:" || (associativity none, precedence 110)"

    Also, from Policy.swift:
    "compound (assignment):" *=, /=, %=, +=, -=, <<=, >>=, &=, ^=,
    |=, &&=, ||= (associativity right, precedence 90)
    "=" is hardcoded as if it had associativity right, precedence 90
    "as" and "is" are hardcoded as if they had associativity none, precedence 95
    "? :" is hardcoded as if it had associativity right, precedence 100

    Should we be using these instead of the raw precedence level values?

    Also, infix operators that are declared without specifying a precedence
    associativity are initialized with the default operator attribues
    "precedence 100" and "associativity none".

.. syntax-grammar::

    Grammar of an operator declaration

    operator-declaration --> prefix-operator-declaration | postfix-operator-declaration | infix-operator-declaration

    prefix-operator-declaration --> ``operator`` ``prefix`` operator ``{`` ``}``
    postfix-operator-declaration --> ``operator`` ``postfix`` operator ``{`` ``}``
    infix-operator-declaration --> ``operator`` ``infix`` operator ``{`` infix-operator-attributes-OPT ``}``

    infix-operator-attributes --> precedence-clause-OPT associativity-clause-OPT
    precedence-clause --> ``precedence`` precedence-level
    precedence-level --> Digit 0 through 255
    associativity-clause --> ``associativity`` associativity
    associativity --> ``left`` | ``right`` | ``none``

.. TR: I added this grammar from looking at ParseDecl.cpp and from trying
    to various permutations in the REPL. Is this a correct grammar?
