Types
=====

In Swift, there are two kinds of types: named types and compound types.
A :newTerm:`named type` is a type that can be given a particular name when it is defined.
Named types include classes, structures, enumerations, and protocols.
For example,
instances of a user-defined class named ``MyClass`` have the type ``MyClass``.
In addition to user-defined named types,
the Swift standard library defines many commonly used named types,
including those that represent arrays, dictionaries, and optional values.

Data types that are normally considered basic or primitive in other languages---
such as types that represent numbers, characters, and strings---
are actually named types,
defined and implemented in the Swift standard library using structures.
Because they are named types,
you can extend their behavior to suit the needs of your program,
using an extension declaration,
discussed in :doc:`../LanguageGuide/Extensions` and :ref:`Declarations_ExtensionDeclaration`.

A :newTerm:`compound type` is a type without a name, defined in the Swift language itself.
There are two compound types: function types and tuple types.
A compound type may contain named types and other compound types.
For instance, the tuple type ``(Int, (Int, Int))`` contains two elements:
The first is the named type ``Int``,
and the second is another compound type ``(Int, Int)``.

This chapter discusses the types defined in the Swift language itself
and describes the type inference behavior of Swift.

.. langref-grammar

    type ::= type-function
    type ::= type-array
    type-simple ::= type-identifier
    type-simple ::= type-tuple
    type-simple ::= type-composition
    type-simple ::= type-metatype
    type-simple ::= type-optional
    type-annotation ::= attribute-list type

.. syntax-grammar::

    Grammar of a type

    type --> array-type | dictionary-type | function-type | type-identifier | tuple-type | optional-type | implicitly-unwrapped-optional-type | protocol-composition-type | metatype-type | ``Any`` | ``Self``


.. _Types_TypeAnnotation:

Type Annotation
---------------

A :newTerm:`type annotation` explicitly specifies the type of a variable or expression.
Type annotations begin with a colon (``:``) and end with a type,
as the following examples show:

.. testcode:: type-annotation

    -> let someTuple: (Double, Double) = (3.14159, 2.71828)
    << // someTuple : (Double, Double) = (3.1415899999999999, 2.71828)
    -> func someFunction(a: Int) { /* ... */ }

.. x*  Bogus * paired with the one in the listing, to fix VIM syntax highlighting.

In the first example,
the expression ``someTuple`` is specified to have the tuple type ``(Double, Double)``.
In the second example,
the parameter ``a`` to the function ``someFunction`` is specified to have the type ``Int``.

Type annotations can contain an optional list of type attributes before the type.

.. syntax-grammar::

    Grammar of a type annotation

    type-annotation --> ``:`` attributes-OPT ``inout``-OPT type


.. _Types_TypeIdentifier:

Type Identifier
---------------

A type identifier refers to either a named type
or a type alias of a named or compound type.

Most of the time, a type identifier directly refers to a named type
with the same name as the identifier.
For example, ``Int`` is a type identifier that directly refers to the named type ``Int``,
and the type identifier ``Dictionary<String, Int>`` directly refers
to the named type ``Dictionary<String, Int>``.

There are two cases in which a type identifier does not refer to a type with the same name.
In the first case, a type identifier refers to a type alias of a named or compound type.
For instance, in the example below,
the use of ``Point`` in the type annotation refers to the tuple type ``(Int, Int)``.

.. testcode:: type-identifier

    -> typealias Point = (Int, Int)
    -> let origin: Point = (0, 0)
    << // origin : Point = (0, 0)

In the second case, a type identifier uses dot (``.``) syntax to refer to named types
declared in other modules or nested within other types.
For example, the type identifier in the following code references the named type ``MyType``
that is declared in the ``ExampleModule`` module.

.. testcode:: type-identifier-dot

    -> var someValue: ExampleModule.MyType
    !! <REPL Input>:1:16: error: use of undeclared type 'ExampleModule'
    !! var someValue: ExampleModule.MyType
    !!                ^~~~~~~~~~~~~

.. langref-grammar

    type-identifier ::= type-identifier-component ('.' type-identifier-component)*
    type-identifier-component ::= identifier generic-args?

.. syntax-grammar::

    Grammar of a type identifier

    type-identifier --> type-name generic-argument-clause-OPT | type-name generic-argument-clause-OPT ``.`` type-identifier
    type-name --> identifier

.. _Types_TupleType:

Tuple Type
----------

A tuple type is a comma-separated list of zero or more types, enclosed in parentheses.

You can use a tuple type as the return type of a function
to enable the function to return a single tuple containing multiple values.
You can also name the elements of a tuple type and use those names to refer to
the values of the individual elements. An element name consists of an identifier
followed immediately by a colon (:). For an example that demonstrates both of
these features, see :ref:`Functions_FunctionsWithMultipleReturnValues`.

When an element of a tuple type has a name,
that name is part of the type.

.. testcode:: tuple-type-names

   -> var someTuple = (top: 10, bottom: 12)  // someTuple is of type (top: Int, bottom: Int)
   << // someTuple : (top: Int, bottom: Int) = (10, 12)
   -> someTuple = (top: 4, bottom: 42) // OK: names match
   -> someTuple = (9, 99)              // OK: names are inferred
   -> someTuple = (left: 5, right: 5)  // Error: names don't match
   !! <REPL Input>:1:13: error: cannot assign value of type '(left: Int, right: Int)' to type '(top: Int, bottom: Int)'
   !! someTuple = (left: 5, right: 5)  // Error: names don't match
   !!             ^~~~~~~~~~~~~~~~~~~
   !!                         as! (top: Int, bottom: Int)

``Void`` is a type alias for the empty tuple type, ``()``.
If there is only one element inside the parentheses,
the type is simply the type of that element.
For example, the type of ``(Int)`` is ``Int``, not ``(Int)``.
As a result, you can name a tuple element only when the tuple type has two
or more elements.

.. langref-grammar

    type-tuple ::= '(' type-tuple-body? ')'
    type-tuple-body ::= type-tuple-element (',' type-tuple-element)* '...'?
    type-tuple-element ::= identifier ':' type-annotation
    type-tuple-element ::= type-annotation

.. syntax-grammar::

    Grammar of a tuple type

    tuple-type --> ``(`` tuple-type-element-list-OPT ``)``
    tuple-type-element-list --> tuple-type-element | tuple-type-element ``,`` tuple-type-element-list
    tuple-type-element --> element-name type-annotation | type
    element-name --> identifier


.. _Types_FunctionType:

Function Type
-------------

A function type represents the type of a function, method, or closure
and consists of a parameter and return type separated by an arrow (``->``):

.. syntax-outline::

    (<#parameter type#>) -> <#return type#>

The *parameter type* is comma-separated list of types.
Because the *return type* can be a tuple type,
function types support functions and methods
that return multiple values.

A parameter of the function type ``() -> T``
(where ``T`` is any type)
can apply the ``autoclosure`` attribute
to implicitly create a closure at its call sites.
This provides a syntactically convenient way
to defer the evaluation of an expression
without needing to write an explicit closure
when you call the function.
For an example of an autoclosure function type parameter,
see :ref:`Closures_Autoclosures`.

A function type can have a variadic parameter in its *parameter type*.
Syntactically,
a variadic parameter consists of a base type name followed immediately by three dots (``...``),
as in ``Int...``. A variadic parameter is treated as an array that contains elements
of the base type name. For instance, the variadic parameter ``Int...`` is treated
as ``[Int]``. For an example that uses a variadic parameter,
see :ref:`Functions_VariadicParameters`.

To specify an in-out parameter, prefix the parameter type with the ``inout`` keyword.
You can't mark a variadic parameter or a return type with the ``inout`` keyword.
In-out parameters are discussed in :ref:`Functions_InOutParameters`.

Argument names in functions and methods
are not part of the corresponding function type.
The function type consists of only the number of arguments
and the type of each argument.
For example:

.. testcode::

   -> func someFunction(left: Int, right: Int) { }
   -> func anotherFunction(left: Int, right: Int) { }
   -> func functionWithDifferentLabels(top: Int, bottom: Int) { }
   ---
   -> var f = someFunction             // f is of type (Int, Int) -> Void
   << // f : (Int, Int) -> () = (Function)
   -> f = anotherFunction              // OK
   -> f = functionWithDifferentLabels  // Also OK
   ---
   -> func functionWithDifferentArgumentTypes(left: Int, right: String) { }
   -> func functionWithDifferentNumberOfArgument(left: Int, right: Int, top: Int) { }
   ---
   -> f = functionWithDifferentArgumentTypes    // Error
   !! <REPL Input>:1:5: error: cannot assign value of type '(Int, String) -> ()' to type '(Int, Int) -> ()'
   !! f = functionWithDifferentArgumentTypes    // Error
   !! ^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   -> f = functionWithDifferentNumberOfArgument // Error
   !! <REPL Input>:1:5: error: cannot assign value of type '(Int, Int, Int) -> ()' to type '(Int, Int) -> ()'
   !! f = functionWithDifferentNumberOfArgument // Error
   !! ^~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If a function type includes more than a single arrow (``->``),
the function types are grouped from right to left.
For example,
the function type ``(Int) -> (Int) -> Int`` is understood as ``(Int) -> ((Int) -> Int)`` ---
that is, a function that takes an ``Int`` and returns
another function that takes and returns an ``Int``.

Function types that can throw an error must be marked with the ``throws`` keyword,
and function types that can rethrow an error must be marked with the ``rethrows`` keyword.
The ``throws`` keyword is part of a function's type,
and nonthrowing functions are subtypes of throwing functions.
As a result, you can use a nonthrowing function in the same places as a throwing one.
Throwing and rethrowing functions are described in
:ref:`Declarations_ThrowingFunctionsAndMethods`
and :ref:`Declarations_RethrowingFunctionsAndMethods`.

.. assertion:: function-arrow-is-right-associative

   >> func f(i: Int) -> (Int) -> Int {
   >>     func g(j: Int) -> Int {
   >>         return i + j
   >>     }
   >>     return g
   >> }
   >> let a: (Int) -> (Int) -> Int = f
   << // a : (Int) -> (Int) -> Int = (Function)
   >> a(3)(5)
   << // r0 : Int = 8
   >> let b: (Int) -> ((Int) -> Int) = f
   << // b : (Int) -> ((Int) -> Int) = (Function)
   >> b(3)(5)
   << // r1 : Int = 8

.. langref-grammar

    type-function ::= type-tuple '->' type-annotation

.. syntax-grammar::

    Grammar of a function type

    function-type --> attributes-OPT ``(`` function-type-argument-list ``...``-OPT ``)`` ``throws``-OPT ``->`` type
    function-type --> attributes-OPT ``(`` function-type-argument-list ``...``-OPT ``)`` ``rethrows`` ``->`` type

    function-type-argument-list --> function-type-argument | function-type-argument ``,`` function-type-argument-list
    function-type-argument --> attributes-OPT ``inout``-OPT type | argument-label type-annotation
    argument-label --> identifier



.. NOTE: Functions are first-class citizens in Swift,
    except for generic functions, i.e., parametric polymorphic functions.
    This means that monomorphic functions can be assigned to variables
    and can be passed as arguments to other functions.
    As an example, the following three lines of code are OK::

        func polymorphicF<T>(a: Int) -> T { return a }
        func monomorphicF(a: Int) -> Int { return a }
        var myMonomorphicF = monomorphicF

    But, the following is NOT allowed::

        var myPolymorphicF = polymorphicF


.. _Types_ArrayType:

Array Type
----------

The Swift language provides the following syntactic sugar for the Swift standard library
``Array<Element>`` type:

.. syntax-outline::

    [<#type#>]

In other words, the following two declarations are equivalent:

.. code-block:: swift

    let someArray: Array<String> = ["Alex", "Brian", "Dave"]
    let someArray: [String] = ["Alex", "Brian", "Dave"]

.. assertion:: array-literal
    >> let someArray1: Array<String> = ["Alex", "Brian", "Dave"]
    << // someArray1 : Array<String> = ["Alex", "Brian", "Dave"]
    >> let someArray2: [String] = ["Alex", "Brian", "Dave"]
    << // someArray2 : Array<String> = ["Alex", "Brian", "Dave"]
    >> someArray1 == someArray2
    <$ : Bool = true

In both cases, the constant ``someArray``
is declared as an array of strings. The elements of an array can be accessed
through subscripting by specifying a valid index value in square brackets:
``someArray[0]`` refers to the element at index 0, ``"Alex"``.

You can create multidimensional arrays by nesting pairs of square brackets,
where the name of the base type of the elements is contained in the innermost
pair of square brackets.
For example, you can create
a three-dimensional array of integers using three sets of square brackets:

.. testcode:: array-3d

    -> var array3D: [[[Int]]] = [[[1, 2], [3, 4]], [[5, 6], [7, 8]]]
    << // array3D : [[[Int]]] = [[[1, 2], [3, 4]], [[5, 6], [7, 8]]]

When accessing the elements in a multidimensional array,
the left-most subscript index refers to the element at that index in the outermost
array. The next subscript index to the right refers to the element
at that index in the array that's nested one level in. And so on. This means that in
the example above, ``array3D[0]`` refers to ``[[1, 2], [3, 4]]``,
``array3D[0][1]`` refers to ``[3, 4]``, and ``array3D[0][1][1]`` refers to the value 4.

For a detailed discussion of the Swift standard library ``Array`` type,
see :ref:`CollectionTypes_Arrays`.

.. langref-grammar

    type-array ::= type-simple
    type-array ::= type-array '[' ']'
    type-array ::= type-array '[' expr ']'


.. syntax-grammar::

    Grammar of an array type

    array-type --> ``[`` type ``]``


.. _Types_DictionaryType:

Dictionary Type
---------------

The Swift language provides the following syntactic sugar for the Swift standard library
``Dictionary<Key, Value>`` type:

.. syntax-outline::

    [<#key type#>: <#value type#>]

In other words, the following two declarations are equivalent:

.. code-block:: swift

    let someDictionary: [String: Int] = ["Alex": 31, "Paul": 39]
    let someDictionary: Dictionary<String, Int> = ["Alex": 31, "Paul": 39]

.. assertion:: dictionary-literal

    >> let someDictionary1: [String: Int] = ["Alex": 31, "Paul": 39]
    << // someDictionary1 : [String : Int] = ["Alex": 31, "Paul": 39]
    >> let someDictionary2: Dictionary<String, Int> = ["Alex": 31, "Paul": 39]
    << // someDictionary2 : Dictionary<String, Int> = ["Alex": 31, "Paul": 39]
    >> someDictionary1 == someDictionary2
    <$ : Bool = true

In both cases, the constant ``someDictionary``
is declared as a dictionary with strings as keys and integers as values.

The values of a dictionary can be accessed through subscripting
by specifying the corresponding key in
square brackets: ``someDictionary["Alex"]`` refers to the value associated
with the key ``"Alex"``.
The subscript returns an optional value of the dictionary's value type.
If the specified key isn't contained in the dictionary,
the subscript returns ``nil``.

The key type of a dictionary must conform to the Swift standard library ``Hashable`` protocol.

.. Used to have an xref to :ref:`CollectionTypes_HashValuesForSetTypes` here.
   But it doesnt really work now that the Hashable content moved from Dictionary to Set.

For a detailed discussion of the Swift standard library ``Dictionary`` type,
see :ref:`CollectionTypes_Dictionaries`.

.. syntax-grammar::

    Grammar of a dictionary type

    dictionary-type --> ``[`` type ``:`` type ``]``


.. _Types_OptionalType:

Optional Type
-------------

The Swift language defines the postfix ``?`` as syntactic sugar for
the named type ``Optional<Wrapped>``, which is defined in the Swift standard library.
In other words, the following two declarations are equivalent:

.. code-block:: swift

    var optionalInteger: Int?
    var optionalInteger: Optional<Int>

.. assertion:: optional-literal

    >> var optionalInteger1: Int?
    << // optionalInteger1 : Int? = nil
    >> var optionalInteger2: Optional<Int>
    << // optionalInteger2 : Optional<Int> = nil
    >> optionalInteger1 == optionalInteger2
    <$ : Bool = true

In both cases, the variable ``optionalInteger``
is declared to have the type of an optional integer.
Note that no whitespace may appear between the type and the ``?``.

The type ``Optional<Wrapped>`` is an enumeration with two cases, ``none`` and ``some(Wrapped)``,
which are used to represent values that may or may not be present.
Any type can be explicitly declared to be (or implicitly converted to) an optional type.
If you don't provide an initial value when you declare an
optional variable or property, its value automatically defaults to ``nil``.

.. TODO Add a link to the Optional Enum Reference page.
   For more information about the Optional type, see ...

If an instance of an optional type contains a value,
you can access that value using the postfix operator ``!``, as shown below:

.. testcode:: optional-type

    >> var optionalInteger: Int?
    << // optionalInteger : Int? = nil
    -> optionalInteger = 42
    -> optionalInteger! // 42
    <$ : Int = 42

Using the ``!`` operator to unwrap an optional
that has a value of ``nil`` results in a runtime error.

You can also use optional chaining and optional binding to conditionally perform an
operation on an optional expression. If the value is ``nil``,
no operation is performed and therefore no runtime error is produced.

For more information and to see examples that show how to use optional types,
see :ref:`TheBasics_Optionals`.

.. langref-grammar

    type-optional ::= type-simple '?'-postfix

.. NOTE: The -postfix disambiguates between two terminals
    which have the same text but which have different whitespace.

.. syntax-grammar::

    Grammar of an optional type

    optional-type --> type ``?``


.. _Types_ImplicitlyUnwrappedOptionalType:

Implicitly Unwrapped Optional Type
----------------------------------

The Swift language defines the postfix ``!`` as syntactic sugar for
the named type ``Optional<Wrapped>``, which is defined in the Swift standard library,
with the additional behavior that
it's automatically unwrapped when it's accessed.
If you try to use an implicitly unwrapped optional that has a value of ``nil``,
you'll get a runtime error.
With the exception of the implicit unwrapping behavior,
the following two declarations are equivalent:

.. code-block:: swift

    var implicitlyUnwrappedString: String!
    var explicitlyUnwrappedString: Optional<String>

Note that no whitespace may appear between the type and the ``!``.

Because implicit unwrapping
changes the meaning of the declaration that contains that type,
optional types that are nested inside a tuple type or a generic type
--- such as the element types of a dictionary or array ---
can't be marked as implicitly unwrapped.
For example:

.. code-block:: swift

    let tupleOfImplicitlyUnwrappedElements: (Int!, Int!)  // Error
    let implicitlyUnwrappedTuple: (Int, Int)!             // OK

    let arrayOfImplicitlyUnwrappedElements: [Int!]        // Error
    let implicitlyUnwrappedArray: [Int]!                    // OK

Because implicitly unwrapped optionals
have the same ``Optional<Wrapped>`` type as optional values,
you can use implicitly unwrapped optionals
in all the same places in your code
that you can use optionals.
For instance, you can assign values of implicitly unwrapped
optionals to variables, constants, and properties of optionals, and vice versa.

As with optionals, if you don't provide an initial value when you declare an
implicitly unwrapped optional variable or property,
its value automatically defaults to ``nil``.

Use optional chaining to conditionally perform an
operation on an implicitly unwrapped optional expression.
If the value is ``nil``,
no operation is performed and therefore no runtime error is produced.

For more information about implicitly unwrapped optional types,
see :ref:`TheBasics_ImplicitlyUnwrappedOptionals`.

.. syntax-grammar::

    Grammar of an implicitly unwrapped optional type

    implicitly-unwrapped-optional-type --> type ``!``


.. _Types_ProtocolCompositionType:

Protocol Composition Type
-------------------------

A protocol composition type describes a type that conforms to each protocol
in a list of specified protocols.
Protocol composition types may be used only in type annotations and in generic parameters.

.. In places where a comma separated list of types is allowed,
   the P&Q syntax isn't allowed.

Protocol composition types have the following form:

.. syntax-outline::

    <#Protocol 1#> & <#Protocol 2#>

A protocol composition type allows you to specify a value whose type conforms to the requirements
of multiple protocols without having to explicitly define a new, named protocol
that inherits from each protocol you want the type to conform to.
For example,
specifying a protocol composition type ``ProtocolA & ProtocolB & ProtocolC`` is
effectively the same as defining a new protocol ``ProtocolD``
that inherits from ``ProtocolA``, ``ProtocolB``, and ``ProtocolC``,
but without having to introduce a new name.

Each item in a protocol composition list
must be either the name of protocol or a type alias of a protocol composition type.

.. langref-grammar

    type-composition ::= 'protocol' '<' type-composition-list? '>'
    type-composition-list ::= type-identifier (',' type-identifier)*

.. syntax-grammar::

    Grammar of a protocol composition type

    protocol-composition-type --> protocol-identifier ``&`` protocol-composition-continuation
    protocol-composition-continuation --> protocol-identifier | protocol-composition-type
    protocol-identifier --> type-identifier


.. _Types_MetatypeType:

Metatype Type
-------------

A metatype type refers to the type of any type,
including class types, structure types, enumeration types, and protocol types.

The metatype of a class, structure, or enumeration type is
the name of that type followed by ``.Type``.
The metatype of a protocol type --- not the concrete type that
conforms to the protocol at runtime ---
is the name of that protocol followed by ``.Protocol``.
For example, the metatype of the class type ``SomeClass`` is ``SomeClass.Type``
and the metatype of the protocol ``SomeProtocol`` is ``SomeProtocol.Protocol``.

You can use the postfix ``self`` expression to access a type as a value.
For example, ``SomeClass.self`` returns ``SomeClass`` itself,
not an instance of ``SomeClass``.
And ``SomeProtocol.self`` returns ``SomeProtocol`` itself,
not an instance of a type that conforms to ``SomeProtocol`` at runtime.
You can use a ``type(of:)`` expression with an instance of a type
to access that instance's dynamic, runtime type as a value,
as the following example shows:

.. testcode:: metatype-type

    -> class SomeBaseClass {
           class func printClassName() {
               print("SomeBaseClass")
           }
       }
    -> class SomeSubClass: SomeBaseClass {
           override class func printClassName() {
               print("SomeSubClass")
           }
       }
    -> let someInstance: SomeBaseClass = SomeSubClass()
    << // someInstance : SomeBaseClass = REPL.SomeSubClass
    -> // The compile-time type of someInstance is SomeBaseClass,
    -> // and the runtime type of someInstance is SomeSubClass
    -> type(of: someInstance).printClassName()
    <- SomeSubClass

Use the identity operators (``===``  and ``!==``) to test
whether an instance's runtime type is the same as its compile-time type.

.. testcode:: metatype-type

    -> if type(of: someInstance) === someInstance.self {
          print("The dynamic and static type of someInstance are the same")
       } else {
          print("The dynamic and static type of someInstance are different")
       }
    <- The dynamic and static type of someInstance are different

Use an initializer expression to construct an instance of a type
from that type's metatype value.
For class instances,
the initializer that's called must be marked with the ``required`` keyword
or the entire class marked with the ``final`` keyword.

.. testcode:: metatype-type

    -> class AnotherSubClass: SomeBaseClass {
          let string: String
          required init(string: String) {
             self.string = string
          }
          override class func printClassName() {
             print("AnotherSubClass")
          }
       }
    -> let metatype: AnotherSubClass.Type = AnotherSubClass.self
    << // metatype : AnotherSubClass.Type = REPL.AnotherSubClass
    -> let anotherInstance = metatype.init(string: "some string")
    << // anotherInstance : AnotherSubClass = REPL.AnotherSubClass


.. langref-grammar

    type-metatype ::= type-simple '.' 'metatype'

.. syntax-grammar::

    Grammar of a metatype type

    metatype-type --> type ``.`` ``Type`` | type ``.`` ``Protocol``

.. _Types_TypeInheritanceClause:

Type Inheritance Clause
-----------------------

A type inheritance clause is used to specify which class a named type inherits from
and which protocols a named type conforms to. A type inheritance clause is also
used to specify a ``class`` requirement on a protocol.
A type inheritance clause begins with a colon (``:``),
followed by either a ``class`` requirement, a list of type identifiers, or both.

Class types can inherit from a single superclass and conform to any number of protocols.
When defining a class,
the name of the superclass must appear first in the list of type identifiers,
followed by any number of protocols the class must conform to.
If the class does not inherit from another class,
the list can begin with a protocol instead.
For an extended discussion and several examples of class inheritance,
see :doc:`../LanguageGuide/Inheritance`.

Other named types can only inherit from or conform to a list of protocols.
Protocol types can inherit from any number of other protocols.
When a protocol type inherits from other protocols,
the set of requirements from those other protocols are aggregated together,
and any type that inherits from the current protocol must conform to all of those requirements.
As discussed in :ref:`Declarations_ProtocolDeclaration`,
you can include the ``class`` keyword as the first item in the type inheritance clause
to mark a protocol declaration with a ``class`` requirement.

A type inheritance clause in an enumeration definition can be either a list of protocols,
or in the case of an enumeration that assigns raw values to its cases,
a single, named type that specifies the type of those raw values.
For an example of an enumeration definition that uses a type inheritance clause
to specify the type of its raw values, see :ref:`Enumerations_RawValues`.

.. langref-grammar

    inheritance ::= ':' type-identifier (',' type-identifier)*

.. syntax-grammar::

    Grammar of a type inheritance clause

    type-inheritance-clause --> ``:`` class-requirement ``,`` type-inheritance-list
    type-inheritance-clause --> ``:`` class-requirement
    type-inheritance-clause --> ``:`` type-inheritance-list
    type-inheritance-list --> type-identifier | type-identifier ``,`` type-inheritance-list
    class-requirement --> ``class``

.. _Types_TypeInference:

Type Inference
--------------

Swift uses type inference extensively,
allowing you to omit the type or part of the type of many variables and expressions in your code.
For example,
instead of writing ``var x: Int = 0``, you can write ``var x = 0``,
omitting the type completely ---
the compiler correctly infers that ``x`` names a value of type ``Int``.
Similarly, you can omit part of a type when the full type can be inferred from context.
For instance, if you write ``let dict: Dictionary = ["A": 1]``,
the compiler infers that ``dict`` has the type ``Dictionary<String, Int>``.

In both of the examples above,
the type information is passed up from the leaves of the expression tree to its root.
That is,
the type of ``x`` in ``var x: Int = 0`` is inferred by first checking the type of ``0``
and then passing this type information up to the root (the variable ``x``).

In Swift, type information can also flow in the opposite direction---from the root down to the leaves.
In the following example, for instance,
the explicit type annotation (``: Float``) on the constant ``eFloat``
causes the numeric literal ``2.71828`` to have an inferred type of ``Float`` instead of ``Double``.

.. testcode:: type-inference

    -> let e = 2.71828 // The type of e is inferred to be Double.
    << // e : Double = 2.71828
    -> let eFloat: Float = 2.71828 // The type of eFloat is Float.
    << // eFloat : Float = 2.71828008

Type inference in Swift operates at the level of a single expression or statement.
This means that all of the information needed to infer an omitted type or part of a type
in an expression must be accessible from type-checking
the expression or one of its subexpressions.

.. TODO: Email Doug for a list of rules or situations describing when type-inference
    is allowed and when types must be fully typed.
