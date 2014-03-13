Declarations
============

.. write-me::

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

Module Scope
------------

The top level scope of a Swift source file
consists of a series of statements.

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

The statements inside a code block are executed in order.

.. TODO: Discuss scope.  I assume a code block creates a new scope?

.. TODO: This section doesn't feel like it belongs in this chapter.

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

Providing more detail limits what symbols are imported ---
it can specify a specific submodule,
or it can specify a specific declaration within a module or submodule.
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

    import-declaration --> attribute-list-OPT ``import`` import-kind-OPT import-path

    import-kind --> ``typealias`` | ``struct`` | ``class`` | ``enum`` | ``protocol`` | ``var`` | ``func``
    import-path --> import-path-identifier | import-path-identifier ``.`` import-path
    import-path-identifier --> identifier | operator


.. _Declarations_ConstantDeclaration:

Constant Declaration
--------------------

A :newTerm:`constant declaration` introduces a constant named value into your program.
Constant declarations are declared using the keyword ``let`` and have the following form:

.. syntax-outline::

    let <#constant name#> : <#type#> = <#expression#>

A constant declaration defines an immutable binding between the *constant name*
and the value of the initializer *expression*;
after the value of a constant is set, it cannot be changed.
That said, if a constant is initialized with a class object,
the object itself may change,
but the binding between the constant name and the object it refers to can't.

When a constant is declared at global scope,
it must be initialized with a value.
When a constant declaration occurs in the context of a class, structure,
or protocol declaration, it is considered a :newTerm:`constant named property`.
Constant declarations are not computed properties and therefore do not have getters
or setters.

If the *constant name* of a constant declaration is a tuple pattern,
the name of each item in the tuple is bound to the corresponding value
in the initializer *expression*.
::

    let (firstNumber, secondNumber) = (10, 42)
    // (firstNumber, secondNumber) : (Int, Int) = (10, 42)

In this example,
``firstNumber`` is a named constant for the value ``10``,
and ``secondNumber`` is a named constant for the value ``42``.
Both constants may now be used independently::

    firstNumber
    // firstNumber : Int = 10
    secondNumber
    // secondNumber : Int = 42

The type annotation (``:`` *type*) is optional in a constant declaration
when the type of the *constant name* may be inferred,
as described in :ref:`Types_TypeInference`.

For more information about constants and for guidance about when to use them,
see :ref:`BasicTypes_NamedValues` and :ref:`Properties_StoredProperties`.

.. TODO: Need to discuss class and static constant properties.

.. langref-grammar

    decl-let    ::= attribute-list 'val' pattern initializer?  (',' pattern initializer?)*
    initializer ::= '=' expr

.. syntax-grammar::

    Grammar of a constant declaration

    constant-declaration --> attribute-list-OPT constant-specifier-OPT ``let`` pattern-initializer-list
    constant-specifier -->  ``static`` | ``class``

    pattern-initializer-list --> pattern-initializer | pattern-initializer ``,`` pattern-initializer-list
    pattern-initializer --> pattern initializer-OPT
    initializer --> ``=`` expression

.. TODO: TR: Come up with a better name than "constant-specifier",
    because otherwise we have lots of different names for the same choice
    (e.g., constant-specifier, variable-specifier, function-specifier).
    Maybe "type-level-specifier"? But what happens when we do get *real* static functions?

.. TODO: Write about class and static constants.


.. _Declarations_VariableDeclaration:

Variable Declaration
--------------------

A :newTerm:`variable declaration` introduces a variable, named value into your program
and is declared using the keyword ``var``.

Variable declarations have several forms which are used to declare different kinds
of named, mutable values,
including stored and computed values and properties,
and stored value and property observers.
The appropriate form to use depends on two things:
the scope at which it is declared and the kind of variable you intend to declare.

The first form is used to declare a stored value or property
and has the following form:

.. syntax-outline::

    var <#variable name#> : <#type#> = <#expression#>

This form of a variable declaration can be defined at global scope, the local scope
of a function, or in the context of a class, structure, protocol, or extension declaration.
When a variable declaration of this form is declared at global scope or the local
scope of a function, it is referred to as a :newTerm:`stored named value`.
When it is declared in the context of a class,
structure, protocol, or extension declaration,
it is referred to as a :newTerm:`variable stored property`.

The initializer *expression* can't be present in a protocol declaration,
but it all other contexts, the initializer *expression* is optional.
That said, if no initializer *expression* is present,
the variable declaration must include an explicit type annotation (``:`` *type*).

As with constant declarations,
if the *variable name* is a tuple pattern,
the name of each item in the tuple is bound to the corresponding value
in the initializer *expression*.

As their names suggest, the value of a stored named value or a variable stored property
is stored in memory.

You can also declare a stored value or property with ``willSet`` and ``didSet`` observers.
A stored value or property declared with observers has the following form:

.. syntax-outline::

    var <#variable name#> : <#type#> = <#expression#> {
        willSet(<#setter name#>) {
            <#statements#>
        }
        didSet {
            <#statements#>
        }
    }

This form of a variable declaration can be defined at global scope, the local scope
of a function, or in the context of a class or structure declaration.
When a variable declaration of this form is declared at global scope or the local
scope of a function, the observers are referred to as :newTerm:`stored named value observers`.
When it is declared in the context of a class or structure declaration,
the observers are referred to as :newTerm:`stored property observers`.

The initializer *expression* is optional in the context of a class or structure declaration,
but required elsewhere. The type annotation is required in all variable declarations that
include observers, regardless of the context in which they are declared.

The ``willSet`` and ``didSet`` observers provide a way to observe (and to respond appropriately)
when the value of a stored value or property is being set.
The observers are not called when the value or property
is first initialized.
Instead, they are called only when the value is set outside of an initialization context.

A ``willSet`` observer is called just before the value of the variable or property
is set. The new value is passed to the ``willSet`` observer as a constant,
and therefore it can't be changed in the implementation of the ``willSet`` clause.

The *setter name* and enclosing parentheses in the ``willSet`` clause is optional.
If you provide a setter name,
it is used as the name of the parameter to the ``willSet`` observer.
If you do not provide a setter name,
the default parameter name to the ``willSet`` observer is ``value``.

The ``didSet`` observer is called immediately after the new value is set.
No parameters are passed to the ``didSet`` observer when it is called.
The ``didSet`` clause is optional.

For more information and to see an example of how to use stored property observers,
see :ref:`Properties_StoredPropertyObservers`.

The next form is used to declare a computed value or property
and has the following form:

.. syntax-outline::

    var <#variable name#> : <#type#> {
        get {
            <#statements#>
        }
        set(<#setter name#>) {
            <#statements#>
        }
    }

This form of a variable declaration can be defined at global scope, the local scope
of a function, or in the context of a class, structure, or extension declaration.
When a variable declaration of this form is declared at global scope or the local
scope of a function, it is referred to as a :newTerm:`computed named value`.
When it is declared in the context of a class,
structure, or extension declaration,
it is referred to as a :newTerm:`computed property`.

The getter is used to read the value,
and the setter is used to write the value.
The setter clause is optional,
and when only a getter is needed, you can omit both clauses and simply
return the requested value directly,
as described in :ref:`Properties_ReadOnlyComputedProperties`.
That said, if you provide a setter clause, you must also provide a getter clause.

The *setter name* and enclosing parentheses is optional.
If you provide a setter name, it is used as the name of the parameter to the setter.
If you do not provide a setter name, the default parameter name to the setter is ``value``,
as described in :ref:`Properties_ShorthandSetterDeclaration`.

Unlike stored named values and variable stored properties,
the value of a computed named value or a computed property is not stored in memory.

For more information and to see examples of computed properties,
see :ref:`Properties_ComputedProperties`.

You can also declare computed properties in the context of a protocol declaration.
These computed properties have the following form:

.. syntax-outline::

    var <#variable name#> : <#type#> { get set }

Computed properties in protocols only declare the getter and setter requirements for types
that conform to the protocol. As a result, you don't implement the getter or setter
directly in the protocol in which it is declared.

As with other computed properties, the setter clause is optional.

.. TODO: Need to discuss class and static variable properties.

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
    didset         ::= attribute-list 'didSet' brace-item-list

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

    variable-declaration-head --> attribute-list-OPT variable-specifier-OPT ``var``
    variable-specifier --> ``static`` | ``class``
    variable-name --> identifier

    getter-setter-block --> ``{`` getter-clause setter-clause-OPT ``}``
    getter-setter-block --> ``{`` setter-clause getter-clause ``}``
    getter-clause --> attribute-list-OPT ``get`` code-block
    setter-clause --> attribute-list-OPT ``set`` setter-name-OPT code-block
    setter-name --> ``(`` identifier ``)``

    getter-setter-keyword-block --> ``{`` getter-keyword-clause setter-keyword-clause-OPT ``}``
    getter-setter-keyword-block --> ``{`` setter-keyword-clause getter-keyword-clause ``}``
    getter-keyword-clause --> attribute-list-OPT ``get``
    setter-keyword-clause --> attribute-list-OPT ``set``

    willSet-didSet-block --> ``{`` willSet-clause didSet-clause-OPT ``}``
    willSet-didSet-block --> ``{`` didSet-clause willSet-clause ``}``
    willSet-clause --> attribute-list-OPT ``willSet`` setter-name-OPT code-block
    didSet-clause --> attribute-list-OPT ``didSet`` code-block

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

See also :ref:`Declarations_TypealiasProtocolElements`.

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

.. TR: Are type aliases allowed to contain a type-inheritance-clause?
    Currently, this doesn't work, and it seems as though it shouldn't work.
    Doesn't it only make sense to specify protocol conformance requirements
    in the context of an associated typealias (declared as protocol member)?
    I modified the grammar under the assumption that they are not allowed.


.. _Declarations_FunctionDeclaration:

Function Declaration
--------------------

.. write-me:: Waiting for design decisions from compiler team.

**[Query/Note: We are trying to decide which code-snippet-style syntax outlines to use
for regular Swift-style function definitions and for selector-style method definitions.
Below you'll find two alternatives for the former and four alternatives for the latter.
We would like to pick one for regular functions and one for selector-style methods.
Please send us your feedback!]**

Most function and method definitions have the following general form:

**[Regular function, alternative 1:
This alternative is very simple and is based on the existing Xcode code snippet for C++ functions.
The downside to this alternative is two-fold:
first, the Swift-specific structure of the function parameters is completely hidden;
second, we need to expose the structure of at least two parameters to visually distinguish
regular functions and selector-style methods.]**


.. syntax-outline::

    func <#function name#>(<#function parameters#>) -> <#return type#> {
        <#statements#>
    }

**[Regular function, alternative 2:
This alternative satisfies the problems noted with the first alternative.
That said, it's a rather long (and ugly?) way to display the general form of a simple function definition
(the signature no longer fits on a single line).
We've considered abbreviating names, but we're trying to avoid that
because it's inconsistent with the rest of the document (and with existing Xcode code snippets).]**


.. syntax-outline::

    func <#function name#>(
         <#parameter name 1#>: <#parameter type 1#>,
         <#parameter name 2#>: <#parameter type 2#>)
         -> <#return type#>
    {
        <#statements#>
    }

Swift also provides syntax for declaring and defining selector-style methods,
such as those found in Objective-C. Definitions of selector-style methods have the
following form:

**[The following four alternatives deal with selector-style method definitions.
The only difference between each of them is the name for each part of the selector.]**

**[Selector-style, alternative 1:
This alternative is descriptively pretty accurate but may also be a bit awkward.]**


.. syntax-outline::

    func <#selector name part 1#>(<#parameter name 1#>: <#parameter type 1#>)
         <#selector name part 2#>(<#parameter name 2#>: <#parameter type 2#>)
         -> <#return type#>
    {
        <#statements#>
    }

**[Selector-style, alternative 2:
Although there is some precedent for calling each part of the selector a "keyword",
doing so isn't quite accurate.
The parts of the name of a method aren't keywords in the language (at least in the normal sense).]**


.. syntax-outline::

    func <#selector keyword 1#>(<#parameter name 1#>: <#parameter type 1#>)
         <#selector keyword 2#>(<#parameter name 2#>: <#parameter type 2#>)
         -> <#return type#>
    {
        <#statements#>
    }

**[Selector-style, alternative 3:
This alternative uses "method" instead of "selector", but still uses "keyword".]**


.. syntax-outline::

    func <#method keyword 1#>(<#parameter name 1#>: <#parameter type 1#>)
         <#method keyword 2#>(<#parameter name 2#>: <#parameter type 2#>)
         -> <#return type#>
    {
        <#statements#>
    }

**[Selector-style, alternative 4:
This alternative uses "signature" instead of "method" or "selector", but still uses "keyword".]**


.. syntax-outline::

    func <#signature keyword 1#>(<#parameter name 1#>: <#parameter type 1#>)
         <#signature keyword 2#>(<#parameter name 2#>: <#parameter type 2#>)
         -> <#return type#>
    {
        <#statements#>
    }

.. TODO: Discuss in prose: Variadic functions and the other permutations of function declarations.

.. TODO: Decide on a syntax-outline for regular Swift functions and for selector-style functions.


.. _Declarations_FunctionSignature:

Function Signature
~~~~~~~~~~~~~~~~~~

.. write-me:: Waiting for design decisions from compiler team.

.. langref-grammar

    decl-func        ::= attribute-list 'type'? 'func' any-identifier generic-params? func-signature brace-item-list?
    func-signature ::= func-arguments func-signature-result?
    func-arguments ::= pattern-tuple+
    func-arguments ::= selector-tuple
    selector-tuple ::= '(' pattern-tuple-element ')' (identifier-or-any '(' pattern-tuple-element ')')+
    func-signature-result ::= '->' type-annotation

.. syntax-grammar::

    Grammar of a function declaration

    function-declaration --> attribute-list-OPT function-specifier-OPT ``mutating``-OPT ``func`` function-name generic-parameter-clause-OPT function-signature code-block-OPT
    function-specifier --> ``static`` | ``class``
    function-name --> identifier | operator

    function-signature --> function-parameters function-signature-result-OPT
    function-parameters --> tuple-patterns | selector-parameters
    function-signature-result --> ``->`` attribute-list-OPT type

    selector-parameters --> ``(`` tuple-pattern-element ``)`` selector-tuples
    selector-tuples --> selector-name ``(`` tuple-pattern-element ``)`` selector-tuples-OPT
    selector-name --> identifier

.. NOTE: Added the optional ``mutating`` modifier,
    based on the grammar found in ParseDecl.cpp.

.. TODO: Verify that the selector-name is just an identifier,
    because the LangRef grammar has it as an identifier-or-any
    (i.e., identifier | ``_``). I don't see this category in the identifiers
    chapter anymore, so we just need to make sure it's still correct.

.. TODO: The overgeneration from tuple-patterns combined with some upcoming changes
    mean that we should just create a new syntactic category
    for function arguments instead.
    We're going to hold off on doing this until they [compiler team] make their changes.

.. TODO: Code block is optional in the context of a protocol.
    Everywhere else, it's required.
    We could refactor to have a separation between function definition/declaration.
    There is also the low-level "asm name" FFI
    which is a definition and declaration corner case.
    Let's just deal with this difference in prose.

.. NOTE: Selector style syntax is pretty stable at this point.
    The only contentious issue recently has been the calling syntax.
    Any changes will probably be fiddley little bits.

.. TODO: Revise selector-name---can we come up with a better name for this?


.. _Declarations_EnumerationDeclaration:

Enumeration Declaration
-----------------------

A :newTerm:`enumeration declaration` introduces a named, enumeration type into your program.

Enumeration declarations have two basic forms and are declared using the keyword ``enum``.

The first form allows you to declare an enumeration type that contains
enumerators of any type, each of which can contain associated values
and has the following form:

.. syntax-outline::

    enum <#enumeration name#> {
        <#declarations#>
        case <#enumerator list 1#>
        case <#enumerator list 2#>(<#associated value type#>)
    }

Enumerations declared in this form are known as :newTerm:`discriminated unions`
in other programming languages.

The body of an enumeration contains zero or more *declarations*
and enumeration member declarations.
These *declarations* can include computed properties,
instance methods, initializers, and enumeration member declarations.
In this form, enumerators consist the keyword ``case``
followed by a list of

The second form allow you to declare an enumeration type that contains
enumerators of the same basic type and has the following form:

.. syntax-outline::

    enum <#enumeration name#> : <#raw value type#> {
        case <#enumerator list 1#> = <#raw value 1#>
        case <#enumerator list 2#> = <#raw value 2#>
    }

.. TODO: Discuss in prose: When there is a raw value type on an enum,
    it indicates the low-level type like Int.
    All of the raw values have to be of that type.
    You can require protocol adoption,
    by using a protocol type as the raw value type,
    but you do need to make it be one of the types
    that support = in order for you to specify the raw values.
    You can have: <#raw value type, protocol conformance#>.

.. langref-grammar

    decl-enum ::= attribute-list 'enum' identifier generic-params? inheritance? enum-body
    enum-body ::= '{' decl* '}'
    decl-enum-element ::= attribute-list 'case' enum-case (',' enum-case)*
    enum-case ::= identifier type-tuple? ('->' type)?

.. NOTE: Per Doug and Ted, "('->' type)?" is not part of the grammar.
    We removed it from our grammar, below.

.. syntax-grammar::

    Grammar of an enumeration declaration

    enum-declaration --> attribute-list-OPT raw-value-style-enum | attribute-list-OPT union-style-enum

    raw-value-style-enum --> enum-name generic-parameter-clause-OPT type-inheritance-clause raw-value-style-enum-body
    raw-value-style-enum-body --> ``{`` declarations-OPT raw-value-style-enum-members ``}``
    raw-value-style-enum-members --> raw-value-style-enum-member raw-value-style-enum-members-OPT
    raw-value-style-enum-member --> attribute-list-OPT raw-value-style-enumerator-list
    raw-value-style-enumerator-list --> raw-value-style-enumerator | raw-value-style-enumerator ``,`` raw-value-style-enumerator-list
    raw-value-style-enumerator --> identifier raw-value-assignment-OPT
    raw-value-assignment --> ``=`` literal
    enum-name --> identifier

    union-style-enum --> enum-name generic-parameter-clause-OPT union-style-enum-body
    union-style-enum-body --> ``{`` declarations-OPT union-style-enum-members-OPT ``}``
    union-style-enum-members --> union-style-enum-member union-style-enum-members-OPT
    union-style-enum-member --> attribute-list-OPT union-style-enumerator-list
    union-style-enumerator-list --> union-style-enumerator | union-style-enumerator ``,`` union-style-enumerator-list
    union-style-enumerator --> identifier tuple-type-OPT

.. NOTE: The two types of enums are sufficiently different enough to warrant separating
    the grammar accordingly. ([Contributor 6004] pointed this out in his email.)
    I'm not sure I'm happy with the names I've chosen for two kinds of enums,
    so please let me know if you can think of better names!
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

A :newTerm:`structure declaration` introduces a named, structure type into your program.
Structure declarations begin with the keyword ``struct`` and have the following form:

.. syntax-outline::

    struct <#structure name#> : <#adopted protocols#> {
        <#declarations#>
    }

The body of a structure contains zero or more *declarations*.
These *declarations* can include both stored and computed properties,
static properties, instance methods, static methods, initializers,
type aliases, and even other structure, class, and enumeration declarations.
Structure declarations can't contain destructor or protocol declarations.
For a discussion and several examples of structures
that include these kind of declarations,
see :doc:`../LanguageGuide/CustomTypes`.

Structure types can adopt any number of protocols,
but can't inherit from classes, enumerations, or other structures.
Structure types can also be extended.

There are three ways create an instance of a previously declared structure:

1. Call one of the initializers declared within the structure,
   as described in :ref:`Initialization_Initializers`.
2. If no initializers are declared,
   call the structure's memberwise initializer,
   as described in :ref:`Initialization_MemberwiseStructureInitializers`.
3. If no initializers are declared,
   and all properties of the structure declaration were given initial values,
   call the structure's default initializer,
   as described in :ref:`Initialization_DefaultInitializers`.

The process of initializing a structure's declared properties
is described in :doc:`../LanguageGuide/Initialization`.

Properties of a structure instance can be accessed using dot (``.``) syntax,
as described in :ref:`CustomTypes_AccessingProperties`.

Structures are value types; instances of a structure are copied when assigned to
variables or constants, or when passed as arguments to a function call.
For information about value types,
see :ref:`CustomTypes_ValueTypesAndReferenceTypes`.

.. TODO: Discuss generic parameter clause in the context of a struct?

.. langref-grammar

    decl-struct ::= attribute-list 'struct' identifier generic-params? inheritance? '{' decl-struct-body '}'
    decl-struct-body ::= decl*

.. syntax-grammar::

   Grammar of a structure declaration

   struct-declaration --> attribute-list-OPT ``struct`` struct-name generic-parameter-clause-OPT type-inheritance-clause-OPT struct-body
   struct-name --> identifier
   struct-body --> ``{`` declarations-OPT ``}``


.. _Declarations_ClassDeclaration:

Class Declaration
-----------------

A :newTerm:`class declaration` introduces a named, class type into your program.
Class declarations begin with the keyword ``class`` and have the following form:

.. syntax-outline::

    class <#class name#> : <#superclass#>, <#adopted protocols#> {
        <#declarations#>
    }

The body of a class contains zero or more *declarations*.
These *declarations* can include both stored and computed properties,
class properties, instance methods, class methods, initializers,
a single destructor method, type aliases,
and even other class, structure, and enumeration declarations.
Class declarations can't contain protocol declarations.
For a discussion and several examples of classes
that include these kind of declarations,
see :doc:`../LanguageGuide/CustomTypes`.

Class types can inherit from only one parent class, its *superclass*,
but can adopt any number of protocols.
The *superclass* appears first in the **type-inheritance-clause**,
followed by any *adopted protocols*.
Although properties and methods declared in the *superclass* are inherited by
the base class, initializers declared in the *superclass* are not.
Swift classes do not inherit from a universal base class.

Properties, methods, and initializers of a superclass can be overridden.
That said, an initializer must call one of its superclass's
initializers before overriding any of the superclass's properties.

Any initializer that does not explicitly call a superclass's initializer
(or that does not call another initializer that ultimately calls a superclass's initializer)
receives an implicit call to the superclass's default initializer
(that is,
a call to ``super.init()`` is implicitly inserted at the end of the initializer's declaration).
For an extended discussion and an example of this behavior,
see :ref:`Initialization_SubclassingAndInitializerDelegation`.

.. TODO: Need a way to refer to grammatical categories (see type-inheritance-clause, above).

Class types can also be extended.

There are two ways create an instance of a previously declared class:

1. Call one of the initializers declared within the class,
   as described in :ref:`Initialization_Initializers`.
2. If no initializers are declared,
   and all properties of the class declaration were given initial values,
   call the class's default initializer,
   as described in :ref:`Initialization_DefaultInitializers`.

The process of initializing a class's declared properties
is described in :doc:`../LanguageGuide/Initialization`.

Properties of a class instance may be accessed using dot (``.``) syntax,
as described in :ref:`CustomTypes_AccessingProperties`.

Classes are reference types; instances of a class are referred to, rather than copied,
when assigned to variables or constants, or when passed as arguments to a function call.
For information about reference types,
see :ref:`CustomTypes_ValueTypesAndReferenceTypes`.

.. TODO: Discuss generic parameter clause in the context of a class?

.. langref-grammar

    decl-class ::= attribute-list 'class' identifier generic-params? inheritance? '{' decl-class-body '}'
    decl-class-body ::= decl*

.. syntax-grammar::

    Grammar of a class declaration

    class-declaration --> attribute-list-OPT ``class`` class-name generic-parameter-clause-OPT type-inheritance-clause-OPT class-body
    class-name --> identifier
    class-body --> ``{`` declarations-OPT ``}``


.. _Declarations_ProtocolDeclaration:

Protocol Declaration
--------------------

.. syntax-outline::

    protocol <#protocol name#> : <#adopted protocols#> {
        <#protocol members#>
    }


.. _Declarations_FunctionProtocolElements:

Function Protocol Elements
~~~~~~~~~~~~~~~~~~~~~~~~~~


.. _Declarations_VariableProtocolElements:

Variable Protocol Elements
~~~~~~~~~~~~~~~~~~~~~~~~~~


.. _Declarations_SubscriptProtocolElements:

Subscript Protocol Elements
~~~~~~~~~~~~~~~~~~~~~~~~~~~


.. _Declarations_TypealiasProtocolElements:

Typealias Protocol Elements
~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. langref-grammar

    decl-protocol ::= attribute-list 'protocol' identifier inheritance? '{' protocol-member* '}'
    protocol-member ::= decl-func
    protocol-member ::= decl-var
    protocol-member ::= subscript-head
    protocol-member ::= typealias-head

.. syntax-grammar::

    Grammar of a protocol declaration

    protocol-declaration --> attribute-list-OPT ``protocol`` protocol-name type-inheritance-clause-OPT protocol-body
    protocol-name --> identifier
    protocol-body --> ``{`` protocol-members-OPT ``}``

    protocol-members --> protocol-member protocol-members-OPT
    protocol-member --> variable-declaration | function-declaration | associated-typealias | subscript-head
    associated-typealias --> typealias-head type-inheritance-clause-OPT typealias-assignment-OPT

.. TR: Can protocols declare constant properties as well?


.. _Declarations_InitializerDeclaration:

Initializer Declaration
-----------------------

.. syntax-outline::

    init(<#parameter name#>: <#parameter type#>) {
        <#statements#>
    }

.. syntax-outline::

    init <#selector keyword 1#>(<#parameter name 1#>: <#parameter type 1#>)
         <#selector keyword 2#>(<#parameter name 2#>: <#parameter type 2#>)
    }
        <#statements#>
    }

.. TODO: Revisit the selector-style initializer syntax-outline
    after we've nailed down the syntax-outline for selector-style function declarations.

.. langref-grammar

    decl-constructor ::= attribute-list 'init' generic-params? constructor-signature brace-item-list
    constructor-signature ::= pattern-tuple
    constructor-signature ::= identifier-or-any selector-tuple

.. syntax-grammar::

    Grammar of an initializer declaration

    initializer-declaration --> attribute-list-OPT ``init`` generic-parameter-clause-OPT initializer-signature code-block
    initializer-signature --> tuple-pattern | selector-tuples


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
They can be declared only in the body of a class declaration---
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

    deinitializer-declaration --> attribute-list-OPT ``deinit`` code-block

.. _Declarations_ExtensionDeclaration:


Extension Declaration
---------------------

An :newTerm:`extension declaration` allows you to extend the behavior of existing
class, structure, and enumeration types.
Extension declarations begin with the keyword ``extension`` and have the following form:

.. syntax-outline::

    extension <#type#> : <#adopted protocols#> {
        <#declarations#>
    }

The body of an extension declaration contains zero or more *declarations*.
These *declarations* can include computed properties, computed static and class properties,
instance methods, static and class methods, initializers, subscript declarations,
and even class, structure, and enumeration declarations.
Extension declarations can't contain destructor or protocol declarations,
store properties, stored property observers, or other extension declarations.
For a discussion and several examples of extensions that include these kind of declarations,
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
of a particular type. Subscript declarations are declared using the keyword ``subscript``
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

Subscript declarations are typically used to provide a convenient syntax
for accessing the elements in a collection, list, or sequence.

The *parameters* specify one or more indicies used to access elements of the corresponding type
in a subscript expression (for example, the ``i`` in the expression ``object[i]``).
Although the indicies used to access the elements can be of any type,
each parameter must include a type annotation to specify the type of each index.
The *return type* specifies the type of the element being accessed.

As with computed properties,
subscript declarations provide support for reading and writing the value of the accessed elements.
The getter is used to read the value,
and the setter is used to write the value.
The setter clause is optional,
and when only a getter is needed, you can omit both clauses and simply
return the requested value directly.
That said, if you provide a setter clause, you must also provide a getter clause.

The *setter name* and enclosing parentheses is optional.
If you provide a setter name, it is used as the name of the parameter to the setter.
If you do not provide a setter name, the default parameter name to the setter is ``value``.
That type of the *setter name* must be the same as the *return type*.

You can overload a subscript declaration in the type in which it is declared,
as long as the *parameters* or the *return* type differ from the one you're overloading.
You can also override a subscript declaration inherited from a superclass. When you do so,
you must mark the overridden subscript declaration with an ``override`` attribute (``@override``).

You can also declare subscripts in the context of a protocol declaration.
These subscript declarations have the following form:

.. syntax-outline::

    subscript (<#parameters#>) -> <#return type#> { get set }

Subscript declarations in protocols only declare the getter and setter
requirements for types that conform to the protocol.
As a result, you don’t implement the getter or setter directly in the protocol in which it is declared.
As with computed properties, the setter clause is optional.

For more information about subscripting and to see examples of subscript declarations,
see :ref:`Methods_Subscripts`.

.. langref-grammar
    decl-subscript ::= subscript-head '{' get-set '}'

    // 'get' is implicit in this syntax.
    decl-subscript ::= subscript-head brace-item-list

    // For use in protocols.
    decl-subscript ::= subscript-head '{' get-set-kw '}'

    subscript-head ::= attribute-list 'subscript' pattern-tuple '->' type

.. syntax-grammar::

    Grammar of a subscript declaration

    subscript-declaration --> subscript-head code-block
    subscript-declaration --> subscript-head getter-setter-block
    subscript-declaration --> subscript-head getter-setter-keyword-block
    subscript-head --> attribute-list-OPT ``subscript`` tuple-pattern ``->`` type


.. _Declarations_OperatorDeclaration:

Operator Declaration
--------------------

An :newTerm:`operator declaration` introduces a new infix, prefix,
or postfix operator into your program
and is declared using the contextual keyword ``operator``.

Swift allows you to declare operators of three different fixities:
infix, prefix, and postfix.
The :newTerm:`fixity` of an operator specifies the relative position of an operator
to its operands.

There are three basic forms of an operator declaration,
one for each fixity.
The fixity of the operator is specified by including the contextual keyword
``infix``, ``prefix``, or ``postfix`` between ``operator`` and the name of the operator.
In each form, the name of the operator can contain only the operator characters
defined in :ref:`LexicalStructure_Operators`.

The first form is used to declare a new infix operator
and has the following form:

.. syntax-outline::

    operator infix <#operator name#> {
        precedence <#precedence level#>
        associativity <#associativity#>
    }

An :newTerm:`infix operator` is a binary operator that is written between its two operands,
such as the familiar addition operator (``+``) is in the expression ``1 + 2``.

Infix operators can optionally specify a precedence, associativity, or both.

The :newTerm:`precedence` of an operator specifies how tightly an operator
binds to its operands in the absence of grouping parentheses.
The precedence of an operator is specified by writing the contextual keyword ``precedence``
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
The associativity of an operator is specified by writing the contextual keyword ``associativity``
followed by the *associativity*.
The *associativity* is specified using one of contextual keywords ``left``, ``right``,
or ``none``. Operators that are left-associative group left-to-right. For example,
the subtraction operator (``-``) is left-associative,
and therefore the expression ``4 - 5 + 6`` is grouped as ``(4 - 5) - 6``
and evaluates to ``-7``. Operators that are right-associative group right-to-left,
and operators that are specified with an associativity of ``none`` don't associate at all.
Nonassociative operators of the same precedence level can't appear adjacent to each to other.
For example, ``1 < 2 < 3`` is not a valid expression.

Infix operators that are declared without specifying a precedence or associativity are
initialized with a precedence level of 100 and an associativity of ``none``.

The second form is used to declare a new prefix operator and has the following form:

.. syntax-outline::

    operator prefix <#operator name#> {}

A :newTerm:`prefix operator` is a unary operator that is written immediately before its operand,
such as the prefix increment operator (``++``) is in the expression ``++i``.

Prefix operators declarations don't specify a precedence level.
Prefix operators are nonassociative.

.. TR: Do all prefix operators default to the same precedence level? If so, what is it?

The third form is used to declare a new postfix operator and has the following form:

.. syntax-outline::

    operator postfix <#operator name#> {}

A :newTerm:`postfix operator` is a unary operator that is written immediately after its operand,
such as the postfix increment operator (``++``) is in the expression ``i++``.

As with prefix operators, postfix operator declarations don't specify a precedence level.
Postfix operators are nonassociative.

After declaring a new operator,
you need to implement it by declaring a function that has the same name as the operator.
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
    precedence-level --> 0 through 255
    associativity-clause --> ``associativity`` associativity
    associativity --> ``left`` | ``right`` | ``none``

.. TR: I added this grammar from looking at ParseDecl.cpp and from trying
    to various permutations in the REPL. Is this a correct grammar?
