Declarations
============

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
    declaration --> enum-element-declaration
    declaration --> struct-declaration
    declaration --> class-declaration
    declaration --> protocol-declaration
    declaration --> initializer-declaration
    declaration --> deinitializer-declaration
    declaration --> extension-declaration
    declaration --> subscript-declaration
    declarations --> declaration declarations-OPT

.. NOTE: enum-element-declaration is only allowed inside an enum
   declaration.

.. _LexicalStructure_ModuleScope:

Module Scope
------------

The top level scope of a Swift source file
consists of a series of statements.

.. langref-grammar

    top-level ::= brace-item*

.. No formal grammar.

.. _LexicalStructure_CodeBlocks:

Code Blocks
-----------

A code block is used by a variety of declarations and control structures
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

Import declarations let you access symbols
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

A constant declaration introduces a constant named value into your program.
Constant declarations begin with keyword ``let`` and have the following form:

.. syntax-outline::

    let <#constant name#> : <#type#> = <#expression#>

A constant declaration defines an immutable binding between the *constant name*
and the value of the initializer *expression*;
after the value of a constant is set, it cannot be changed.
That said, if a constant is initialized with a class object,
the object itself may change,
but the binding between the constant name and the object it refers to may not.

When a constant is declared at global scope,
it must be initialized with a value.
When a constant declaration occurs in the context of a class, structure,
or protocol declaration, it is considered a constant named property,
as described in :ref:`ClassesAndStructures_StoredProperties`.
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

For more information about constant declarations and for guidance about when to use them,
see :ref:`BasicTypes_NamedValues`.

.. langref-grammar

    decl-let    ::= attribute-list 'val' pattern initializer?  (',' pattern initializer?)*
    initializer ::= '=' expr

.. syntax-grammar::

    Grammar of a value declaration

    constant-declaration --> attribute-list-OPT constant-specifier-OPT ``let`` pattern-initializer-list
    value-specifier -->  ``static`` | ``class``

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

.. syntax-outline::

    var <#variable name#> : <#type#> = <#expression#>

.. syntax-outline::

    var <#variable name#> : <#type#> {
        get {
            <#statements#>
        }
        set(<#setter name#>) {
            <#statements#>
        }
    }

.. syntax-outline::

    var <#variable name#> : <#type#> {
        willSet(<#setter name#>) {
            <#statements#>
        }
        didSet {
            <#statements#>
        }
    }

.. syntax-outline::

    var <#variable name#> : <#type#> { get set }

.. TODO: In prose: discuss that 'name' can also be a pattern in the first syntax-outline.
    Also, discuss that when you only want to provide a getter, 'get:' is optional
    (as shown in the third form of the grammar).

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

.. NOTE: The variable-specifier is currently restricted to variables
    declared using the first variable-declaration grammar.
    This is a temporary compiler limitation.
    Eventually, variable-specifier will be allowed for the other two forms of the grammar
    (those that declare variable with computed values).

.. TODO: Update the grammar for getter/setters/didSet/willSet.
    See: <rdar://problem/15966905> [Craig feedback] Consider "juxtaposed" brace enclosed property syntax


.. _Declarations_TypealiasDeclaration:

Typealias Declaration
---------------------

A type alias declaration introduces a named alias of an existing type into your program.
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

.. langref-grammar

    decl-func        ::= attribute-list 'type'? 'func' any-identifier generic-params? func-signature brace-item-list?
    func-signature ::= func-arguments func-signature-result?
    func-arguments ::= pattern-tuple+
    func-arguments ::= selector-tuple
    selector-tuple ::= '(' pattern-tuple-element ')' (identifier-or-any '(' pattern-tuple-element ')')+
    func-signature-result ::= '->' type-annotation

.. syntax-grammar::

    Grammar of a function declaration

    function-declaration --> attribute-list-OPT function-specifier-OPT ``func`` function-name generic-parameter-clause-OPT function-signature code-block-OPT
    function-specifier --> ``static`` | ``class``
    function-name --> identifier | operator

    function-signature --> function-parameters function-signature-result-OPT
    function-parameters --> tuple-patterns | selector-parameters
    function-signature-result --> ``->`` attribute-list-OPT type

    selector-parameters --> ``(`` tuple-pattern-element ``)`` selector-tuples
    selector-tuples --> selector-name ``(`` tuple-pattern-element ``)`` selector-tuples-OPT
    selector-name --> identifier | operator

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

.. syntax-outline::

    enum <#enumeration name#> {
        case <#enumerator list 1#>
        case <#enumerator list 2#>(<#associated value type#>)
    }

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

    enum-declaration --> attribute-list-OPT ``enum`` enum-name generic-parameter-clause-OPT type-inheritance-clause-OPT enum-body
    enum-name --> identifier
    enum-body --> ``{`` declarations-OPT ``}``

    enum-element-declaration --> attribute-list-OPT ``case`` enumerator-list
    enumerator-list --> enumerator raw-value-assignment-OPT | enumerator raw-value-assignment-OPT ``,`` enumerator-list
    enumerator --> enumerator-name tuple-type-OPT
    enumerator-name --> identifier
    raw-value-assignment --> ``=`` raw-value-literal
    raw-value-literal --> numeric-literal | textual-literal

.. NOTE: You can have other declarations like methods inside of an enum declaration (e.g., methods, etc.).

.. TODO: raw-value-literal has the exact same definition as literal-expression.
   Suggest combining them.

.. _Declarations_StructureDeclaration:

Structure Declaration
---------------------

A structure declaration introduces a named, structure type into your program.
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
see :doc:`../LanguageGuide/ClassesAndStructures`.

Structure types can adopt any number of protocols,
but can't inherit from classes, enumerations, or other structures.
Structure types can also be extended.

There are three ways create an instance of a previously declared structure:

1. Call one of the initializers declared within the structure,
   as described in :ref:`ClassesAndStructures_InitializerMethods`.
2. If no initializers are declared,
   call the structure's memberwise initializer,
   as described in :ref:`ClassesAndStructures_MemberwiseStructureInitializers`.
3. If no initializers are declared,
   and all properties of the structure declaration were given initial values,
   call the structure's default initializer,
   as described in :ref:`ClassesAndStructures_InitializerMethods`.

The process of initializing a structure's declared properties
is described in :ref:`ClassesAndStructures_Initialization`.

Properties of a structure instance can be accessed using dot (``.``) syntax,
as described in :ref:`ClassesAndStructures_AccessingProperties`.

Structures are value types; instances of a structure are copied when assigned to
variables or constants, or when passed as arguments to a function call.
For information about value types,
see :ref:`ClassesAndStructures_ValueTypesAndReferenceTypes`.

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

A class declaration introduces a named, class type into your program.
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
see :doc:`../LanguageGuide/ClassesAndStructures`.

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
see :ref:`ClassesAndStructures_SubclassingAndInitializerDelegation`.

.. TODO: Need a way to refer to grammatical categories (see type-inheritance-clause, above).

Class types can also be extended.

There are two ways create an instance of a previously declared class:

1. Call one of the initializers declared within the class,
   as described in :ref:`ClassesAndStructures_InitializerMethods`.
2. If no initializers are declared,
   and all properties of the class declaration were given initial values,
   call the class's default initializer,
   as described in :ref:`ClassesAndStructures_InitializerMethods`.

The process of initializing a class's declared properties
is described in :ref:`ClassesAndStructures_Initialization`.

Properties of a class instance may be accessed using dot (``.``) syntax,
as described in :ref:`ClassesAndStructures_AccessingProperties`.

Classes are reference types; instances of a class are referred to, rather than copied,
when assigned to variables or constants, or when passed as arguments to a function call.
For information about reference types,
see :ref:`ClassesAndStructures_ValueTypesAndReferenceTypes`.

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

A deinitializer declaration declares a deinitializer for a class type.
Deinitializers take no parameters and have the following form:

.. syntax-outline::

    deinit {
        <#statements#>
    }

A deinitializer is called automatically when there are no longer any references
to a class object, just before the class object is destroyed.
They can be declared only in the body of a class declaration---
but not in an extension of a class---
and each class can have at most one.

A subclass inherits its superclass's deinitializer,
which is implicitly called just before the subclass object is destroyed.
The subclass object is not destroyed until all deinitializers in its inheritance chain
have finished executing.

Deinitializers are not called directly.

For an example of how to use a deinitializer in a class declaration,
see :ref:`ClassesAndStructures_Deinitializers`.


.. langref-grammar

    decl-de ::= attribute-list 'deinit' brace-item-list
    NOTE: langref contains a typo here---should be 'decl-deinitializer'

.. syntax-grammar::

    Grammar of a deinitializer declaration

    deinitializer-declaration --> attribute-list-OPT ``deinit`` code-block


.. _Declarations_ExtensionDeclaration:

Extension Declaration
---------------------

An extension declaration allows you to extend the behavior of existing
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

.. syntax-outline::

    subscript (<#arguments#>) -> <#return type#> {
    get:
        <#statements#>
    set(<#setter name#>):
        <#statements#>
    }

.. langref-grammar

    decl-subscript ::= subscript-head '{' get-set '}'
    subscript-head ::= attribute-list 'subscript' pattern-tuple '->' type

.. syntax-grammar::

    Grammar of a subscript declaration

    subscript-declaration --> subscript-head getter-setter-block
    subscript-head --> attribute-list-OPT ``subscript`` tuple-pattern ``->`` type

.. _Declarations_Attributes:

Attributes
----------

.. langref-grammar

    attribute-list        ::= /*empty*/
    attribute-list        ::= attribute-list-clause attribute-list
    attribute-list-clause ::= '@' attribute
    attribute-list-clause ::= '@' attribute ','? attribute-list-clause
    attribute      ::= attribute-infix
    attribute      ::= attribute-resilience
    attribute      ::= attribute-inout
    attribute      ::= attribute-auto_closure
    attribute      ::= attribute-noreturn

.. syntax-grammar::

    Grammar of an attribute list

    attribute-list --> ``@`` attribute | ``@`` attribute ``,``-OPT attribute-list
    attribute --> declaration-attribute | interface-builder-attribute

.. NOTE: Our grammar doesn't have empty terminals (no epsilon)
   so we need to make attribute-list actually contain something.
   This means that instead of having "empty" as a possible expansion,
   attribute-list always appears as -OPT.

.. TODO: From looking at /swift/include/swift/AST/Attr.def,
    there are ATTR(...), TYPE_ATTR(...), and IB_ATTR(...).
    TYPE_ATTR(...)s can be applied to types only,
    and plain ATTR(...)s are restricted to declarations only.
    That said, the 'noreturn' attribute can be specified on the declaration
    or on the function type, and is thus in both both ATTR(...) and TYPE_ATTR(...).

    Here's the current list (as of 1/20/2014):

    Type Attributes:
    ``auto_closure`` ``inout`` ``cc`` ``noreturn`` ``objc_block`` ``thin`` ``thick``
    ``unchecked``
    Declaration Attributes:
    ``assignment`` ``class_protocol`` ``conversion`` ``exported`` ``infix`` ``mutating``
    ``resilient`` ``fragile`` ``born_fragile`` ``asmname`` ``noreturn`` ``prefix``
    ``postfix`` ``objc`` ``optional`` ``transparent`` ``unowned`` ``weak``
    ``requires_stored_property_inits``
    Interface Builder Attributes:
    ``IBOutlet`` ``IBAction`` ``IBLiveView`` ``IBInspectable``

    Because attributes are (almost) neatly separated into mutually exclusive categories,
    e.g., declaration attributes, type attributes, and IB attributes,
    then we can break down the attribute grammar accordingly.
    We still need to decide the best way to do this.
    Some possibilites are:

        1. Each of the three groups of attributes gets its own subsection.
           Some attributes (e.g., 'objc') may require lots of explanation.
        2. Create a whole new chapter on attributes.

    Currently, we're leaning toward (1).

    According to Doug (1/29/14), many of these attributes are not worth documenting
    either in the near future or at all. We should really focus on the following first:
    ``mutating``, ``objc``, ``weak``, ``unowned``, ``optional``, ``class_protocol``,
    ``IBOutlet``, ``IBAction``, ``IBLiveView``, and ``IBInspectable``.
    The rest should be omitted (at least for now)---they're really
    only used in the Standard Library.
    In addition, it's likely that inout will get folder into the function stuff,
    and resilience is totally pointless (for now),
    because we're not doing it for Swift 1.0. Leave both of them off entirely.

    TR: None of the attributes Doug mentioned above are type attributes.
    Are there any types attributes that we should bother documenting?

    TODO: For the attributes we are planning on documenting in the near future,
    we need to get more information about their use and behavior.
    Find out what we can from current documentation,
    and email Doug or swift-dev for anything that's missing.

.. _Declarations_DeclarationAttributes:

Declaration Attributes
~~~~~~~~~~~~~~~~~~~~~~

.. syntax-grammar::

    Grammar of a declaration attribute

    declaration-attribute --> ``mutating`` | ``weak`` | ``unowned`` | ``optional`` | ``objc`` | ``class_protocol``

.. _Declarations_InterfaceBuilderAttributes:

Interface Builder Attributes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. syntax-grammar::

    Grammar of an interface builder attribute

    interface-builder-attribute --> ``IBOutlet`` | ``IBAction`` | ``IBLiveView`` | ``IBInspectable``
