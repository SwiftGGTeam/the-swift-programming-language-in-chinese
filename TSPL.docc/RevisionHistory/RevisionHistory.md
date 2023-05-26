# Document Revision History

Review the recent changes to this book.

**2023-06-05**

- Updated for Swift 5.9.
- Added information about `if` and `switch` expressions
  to the <doc:ControlFlow> chapter
  and the <doc:Expressions#Conditional-Expression> section.
- Added the <doc:Macros> chapter,
  with information about generating code at compile time.
- Added information about boxed protocol types
  to the <doc:OpaqueTypes> chapter.
- Updated the <doc:Attributes#Result-Building-Methods> section
  with information about the `buildPartialBlock(first:)`
  and `buildPartialBlock(accumulated:next:)` methods.

**2023-03-30**

- Updated for Swift 5.8.
- Added the <doc:ControlFlow#Deferred-Actions> section,
  showing `defer` outside of error handling.
- Adopted Swift-DocC for publication.
- Minor corrections and additions throughout.

**2022-09-12**

- Updated for Swift 5.7.
- Added the <doc:Concurrency#Sendable-Types> section,
  with information about sending data between actors and tasks,
  and added information about the `@Sendable` and `@unchecked` attributes
  to the <doc:Attributes#Sendable> and <doc:Attributes#unchecked> sections.
- Added the <doc:LexicalStructure#Regular-Expression-Literals> section
  with information about creating a regular expression.
- Added information about the short form of `if`-`let`
  to the <doc:TheBasics#Optional-Binding> section.
- Added information about `#unavailable`
  to the <doc:ControlFlow#Checking-API-Availability> section.

**2022-03-14**

- Updated for Swift 5.6.
- Updated the <doc:Expressions#Explicit-Member-Expression> section
  with information about using `#if`
  around chained method calls and other postfix expressions.
- Updated the visual styling of figures throughout.

**2021-09-20**

- Updated for Swift 5.5.
- Added information about asynchronous functions, tasks, and actors
  to the <doc:Concurrency> chapter,
  and to the <doc:Declarations#Actor-Declaration>,
  <doc:Declarations#Asynchronous-Functions-and-Methods>,
  and <doc:Expressions#Await-Operator> sections.
- Updated the <doc:LexicalStructure#Identifiers> section
  with information about identifiers that start with an underscore.

**2021-04-26**

- Updated for Swift 5.4.
- Added the <doc:AdvancedOperators#Result-Builders>
  and <doc:Attributes#resultBuilder> sections
  with information about result builders.
- Added the <doc:Expressions#Implicit-Conversion-to-a-Pointer-Type> section
  with information about how in-out parameters
  can be implicitly converted to unsafe pointers in a function call.
- Updated the <doc:Functions#Variadic-Parameters>
  and <doc:Declarations#Function-Declaration> sections,
  now that a function can have multiple variadic parameters.
- Updated the <doc:Expressions#Implicit-Member-Expression> section,
  now that implicit member expressions can be chained together.

**2020-09-16**

- Updated for Swift 5.3.
- Added information about multiple trailing closures
  to the <doc:Closures#Trailing-Closures> section,
  and added information about how trailing closures are matched to parameters
  to the <doc:Expressions#Function-Call-Expression> section.
- Added information about synthesized implementations
  of `Comparable` for enumerations
  to the <doc:Protocols#Adopting-a-Protocol-Using-a-Synthesized-Implementation> section.
- Added the <doc:Generics#Contextual-Where-Clauses> section
  now that you can write a generic `where` clause in more places.
- Added the <doc:AutomaticReferenceCounting#Unowned-Optional-References> section
  with information about using unowned references with optional values.
- Added information about the `@main` attribute
  to the <doc:Attributes#main> section.
- Added `#filePath` to the <doc:Expressions#Literal-Expression> section,
  and updated the discussion of `#file`.
- Updated the <doc:Closures#Escaping-Closures> section,
  now that closures can refer to `self` implicitly in more scenarios.
- Updated the <doc:ErrorHandling#Handling-Errors-Using-Do-Catch>
  and <doc:Statements#Do-Statement> sections,
  now that a `catch` clause can match against multiple errors.
- Added more information about `Any`
  and moved it into the new <doc:Types#Any-Type> section.
- Updated the <doc:Properties#Property-Observers> section,
  now that lazy properties can have observers.
- Updated the <doc:Declarations#Protocol-Declaration> section,
  now that members of an enumeration can satisfy protocol requirements.
- Updated the <doc:Declarations#Stored-Variable-Observers-and-Property-Observers> section
  to describe when the getter is called before the observer.
- Updated the <doc:MemorySafety> chapter
  to mention atomic operations.

**2020-03-24**

- Updated for Swift 5.2.
- Added information about passing a key path instead of a closure
  to the <doc:Expressions#Key-Path-Expression> section.
- Added the <doc:Declarations#Methods-with-Special-Names> section
  with information about syntactic sugar the lets instances of
  classes, structures, and enumerations be used with function call syntax.
- Updated the <doc:Subscripts#Subscript-Options> section,
  now that subscripts support parameters with default values.
- Updated the <doc:Types#Self-Type> section,
  now that the `Self` can be used in more contexts.
- Updated the <doc:TheBasics#Implicitly-Unwrapped-Optionals> section
  to make it clearer that an implicitly unwrapped optional value
  can be used as either an optional or non-optional value.

**2019-09-10**

- Updated for Swift 5.1.
- Added information about functions
  that specify a protocol that their return value conforms to,
  instead of providing a specific named return type,
  to the <doc:OpaqueTypes> chapter.
- Added information about property wrappers
  to the <doc:Properties#Property-Wrappers> section.
- Added information about enumerations and structures
  that are frozen for library evolution
  to the <doc:Attributes#frozen> section.
- Added the <doc:Functions#Functions-With-an-Implicit-Return>
  and <doc:Properties#Shorthand-Getter-Declaration> sections
  with information about functions that omit `return`.
- Added information about using subscripts on types
  to the <doc:Subscripts#Type-Subscripts> section.
- Updated the <doc:Patterns#Enumeration-Case-Pattern> section,
  now that an enumeration case pattern can match an optional value.
- Updated the <doc:Initialization#Memberwise-Initializers-for-Structure-Types> section,
  now that memberwise initializers support
  omitting parameters for properties that have a default value.
- Added information about dynamic members
  that are looked up by key path at runtime
  to the <doc:Attributes#dynamicMemberLookup> section.
- Added `macCatalyst` to the list of target environments
  in <doc:Statements#Conditional-Compilation-Block>.
- Updated the <doc:Types#Self-Type> section,
  now that `Self` can be used to refer to the type
  introduced by the current class, structure, or enumeration declaration.

**2019-03-25**

- Updated for Swift 5.0.
- Added the <doc:StringsAndCharacters#Extended-String-Delimiters> section
  and updated the <doc:LexicalStructure#String-Literals> section
  with information about extended string delimiters.
- Added the <doc:Attributes#dynamicCallable> section
  with information about dynamically calling instances as functions
  using the `dynamicCallable` attribute.
- Added the <doc:Attributes#unknown> and <doc:Statements#Switching-Over-Future-Enumeration-Cases> sections
  with information about handling future enumeration cases
  in switch statements using
  the `unknown` switch case attribute.
- Added information about the identity key path (`\.self`)
  to the <doc:Expressions#Key-Path-Expression> section.
- Added information about using the less than (`<`) operator
  in platform conditions to the <doc:Statements#Conditional-Compilation-Block> section.

**2018-09-17**

- Updated for Swift 4.2.
- Added information about accessing all of an enumeration's cases
  to the <doc:Enumerations#Iterating-over-Enumeration-Cases> section.
- Added information about `#error` and `#warning`
  to the <doc:Statements#Compile-Time-Diagnostic-Statement> section.
- Added information about inlining
  to the <doc:Attributes#Declaration-Attributes> section
  under the `inlinable` and  `usableFromInline` attributes.
- Added information about members that are looked up by name at runtime
  to the <doc:Attributes#Declaration-Attributes> section
  under the `dynamicMemberLookup` attribute.
- Added information about the `requires_stored_property_inits` and `warn_unqualified_access` attributes
  to the <doc:Attributes#Declaration-Attributes> section.
- Added information about how to conditionally compile code
  depending on the Swift compiler version being used
  to the <doc:Statements#Conditional-Compilation-Block> section.
- Added information about `#dsohandle`
  to the <doc:Expressions#Literal-Expression> section.

**2018-03-29**

- Updated for Swift 4.1.
- Added information about synthesized implementations of equivalence operators
  to the <doc:AdvancedOperators#Equivalence-Operators> section.
- Added information about conditional protocol conformance
  to the <doc:Declarations#Extension-Declaration> section
  of the <doc:Declarations> chapter,
  and to the <doc:Protocols#Conditionally-Conforming-to-a-Protocol> section
  of the <doc:Protocols> chapter.
- Added information about recursive protocol constraints
  to the <doc:Generics#Using-a-Protocol-in-Its-Associated-Types-Constraints> section.
- Added information about
  the `canImport()` and `targetEnvironment()` platform conditions
  to <doc:Statements#Conditional-Compilation-Block>.

**2017-12-04**

- Updated for Swift 4.0.3.
- Updated the <doc:Expressions#Key-Path-Expression> section,
  now that key paths support subscript components.

**2017-09-19**

- Updated for Swift 4.0.
- Added information about exclusive access to memory
  to the <doc:MemorySafety> chapter.
- Added the <doc:Generics#Associated-Types-with-a-Generic-Where-Clause> section,
  now that you can use generic `where` clauses
  to constrain associated types.
- Added information about multiline string literals
  to the <doc:StringsAndCharacters#String-Literals> section
  of the <doc:StringsAndCharacters> chapter,
  and to the <doc:LexicalStructure#String-Literals> section
  of the <doc:LexicalStructure> chapter.
- Updated the discussion of the `objc` attribute
  in <doc:Attributes#Declaration-Attributes>,
  now that this attribute is inferred in fewer places.
- Added the <doc:Generics#Generic-Subscripts> section,
  now that subscripts can be generic.
- Updated the discussion
  in the <doc:Protocols#Protocol-Composition> section
  of the <doc:Protocols> chapter,
  and in the <doc:Types#Protocol-Composition-Type> section
  of the <doc:Types> chapter,
  now that protocol composition types can contain a superclass requirement.
- Updated the discussion of protocol extensions
  in <doc:Declarations#Extension-Declaration>
  now that `final` isn't allowed in them.
- Added information about preconditions and fatal errors
  to the <doc:TheBasics#Assertions-and-Preconditions> section.

**2017-03-27**

- Updated for Swift 3.1.
- Added the <doc:Generics#Extensions-with-a-Generic-Where-Clause> section
  with information about extensions that include requirements.
- Added examples of iterating over a range
  to the <doc:ControlFlow#For-In-Loops> section.
- Added an example of failable numeric conversions
  to the <doc:Initialization#Failable-Initializers> section.
- Added information to the <doc:Attributes#Declaration-Attributes> section
  about using the `available` attribute with a Swift language version.
- Updated the discussion in the <doc:Types#Function-Type> section
  to note that argument labels aren't allowed when writing a function type.
- Updated the discussion of Swift language version numbers
  in the <doc:Statements#Conditional-Compilation-Block> section,
  now that an optional patch number is allowed.
- Updated the discussion
  in the <doc:Types#Function-Type> section,
  now that Swift distinguishes between functions that take multiple parameters
  and functions that take a single parameter of a tuple type.
- Removed the Dynamic Type Expression section
  from the <doc:Expressions> chapter,
  now that `type(of:)` is a Swift standard library function.

**2016-10-27**

- Updated for Swift 3.0.1.
- Updated the discussion of weak and unowned references
  in the <doc:AutomaticReferenceCounting> chapter.
- Added information about the `unowned`, `unowned(safe)`, and `unowned(unsafe)`
  declaration modifiers
  in the <doc:Declarations#Declaration-Modifiers> section.
- Added a note to the <doc:TypeCasting#Type-Casting-for-Any-and-AnyObject> section
  about using an optional value when a value of type `Any` is expected.
- Updated the <doc:Expressions> chapter
  to separate the discussion of parenthesized expressions and tuple expressions.

**2016-09-13**

- Updated for Swift 3.0.
- Updated the discussion of functions in the <doc:Functions> chapter
  and the <doc:Declarations#Function-Declaration> section to note that
  all parameters get an argument label by default.
- Updated the discussion of operators
  in the <doc:AdvancedOperators> chapter,
  now that you implement them as type methods instead of as global functions.
- Added information about the `open` and `fileprivate` access-level modifiers
  to the <doc:AccessControl> chapter.
- Updated the discussion of `inout` in the <doc:Declarations#Function-Declaration> section
  to note that it appears in front of a parameter's type
  instead of in front of a parameter's name.
- Updated the discussion of the `@noescape` and `@autoclosure` attributes
  in the <doc:Closures#Escaping-Closures> and <doc:Closures#Autoclosures> sections
  and the <doc:Attributes> chapter
  now that they're type attributes, rather than declaration attributes.
- Added information about operator precedence groups
  to the <doc:AdvancedOperators#Precedence-for-Custom-Infix-Operators> section
  of the <doc:AdvancedOperators> chapter,
  and to the <doc:Declarations#Precedence-Group-Declaration> section
  of the <doc:Declarations> chapter.
- Updated discussion throughout
  to use macOS instead of OS X,
  `Error` instead of `ErrorProtocol`,
  and protocol names such as `ExpressibleByStringLiteral`
  instead of `StringLiteralConvertible`.
- Updated the discussion
  in the <doc:Generics#Generic-Where-Clauses> section
  of the <doc:Generics> chapter
  and in the <doc:GenericParametersAndArguments> chapter,
  now that generic `where` clauses are written at the end of a declaration.
- Updated the discussion in the <doc:Closures#Escaping-Closures> section,
  now that closures are nonescaping by default.
- Updated the discussion
  in the <doc:TheBasics#Optional-Binding> section
  of the <doc:TheBasics> chapter
  and the <doc:Statements#While-Statement> section
  of the <doc:Statements> chapter,
  now that `if`, `while`, and `guard` statements
  use a comma-separated list of conditions without `where` clauses.
- Added information about switch cases that have multiple patterns
  to the <doc:ControlFlow#Switch> section
  of the <doc:ControlFlow> chapter
  and the <doc:Statements#Switch-Statement> section
  of the <doc:Statements> chapter.
- Updated the discussion of function types
  in the <doc:Types#Function-Type> section
  now that function argument labels are no longer part of a function's type.
- Updated the discussion of protocol composition types
  in the <doc:Protocols#Protocol-Composition> section
  of the <doc:Protocols> chapter
  and in the <doc:Types#Protocol-Composition-Type> section
  of the <doc:Types> chapter
  to use the new `Protocol1 & Protocol2` syntax.
- Updated the discussion in the Dynamic Type Expression section
  to use the new `type(of:)` syntax for dynamic type expressions.
- Updated the discussion of line control statements
  to use the `#sourceLocation(file:line:)` syntax
  in the <doc:Statements#Line-Control-Statement> section.
- Updated the discussion in <doc:Declarations#Functions-that-Never-Return>
  to use the new `Never` type.
- Added information about playground literals
  to the <doc:Expressions#Literal-Expression> section.
- Updated the discussion in the <doc:Declarations#In-Out-Parameters> section
  to note that only nonescaping closures can capture in-out parameters.
- Updated the discussion about default parameters
  in the <doc:Functions#Default-Parameter-Values> section,
  now that they can't be reordered in function calls.
- Updated attribute arguments to use a colon
  in the <doc:Attributes> chapter.
- Added information about throwing an error
  inside the catch block of a rethrowing function
  to the <doc:Declarations#Rethrowing-Functions-and-Methods> section.
- Added information about accessing the selector
  of an Objective-C property's getter or setter
  to the <doc:Expressions#Selector-Expression> section.
- Added information to the <doc:Declarations#Type-Alias-Declaration> section
  about generic type aliases and using type aliases inside of protocols.
- Updated the discussion of function types in the <doc:Types#Function-Type> section
  to note that parentheses around the parameter types are required.
- Updated the <doc:Attributes> chapter
  to note that the `@IBAction`, `@IBOutlet`, and `@NSManaged` attributes
  imply the `@objc` attribute.
- Added information about the `@GKInspectable` attribute
  to the <doc:Attributes#Declaration-Attributes> section.
- Updated the discussion of optional protocol requirements
  in the <doc:Protocols#Optional-Protocol-Requirements> section
  to clarify that they're used only in code that interoperates with Objective-C.
- Removed the discussion of explicitly using `let` in function parameters
  from the <doc:Declarations#Function-Declaration> section.
- Removed the discussion of the `Boolean` protocol
  from the <doc:Statements> chapter,
  now that the protocol has been removed from the Swift standard library.
- Corrected the discussion of the `@NSApplicationMain` attribute
  in the <doc:Attributes#Declaration-Attributes> section.

**2016-03-21**

- Updated for Swift 2.2.
- Added information about how to conditionally compile code
  depending on the version of Swift being used
  to the <doc:Statements#Conditional-Compilation-Block> section.
- Added information about how to distinguish
  between methods or initializers whose names differ
  only by the names of their arguments
  to the <doc:Expressions#Explicit-Member-Expression> section.
- Added information about the `#selector` syntax
  for Objective-C selectors
  to the <doc:Expressions#Selector-Expression> section.
- Updated the discussion of associated types
  to use the `associatedtype` keyword
  in the <doc:Generics#Associated-Types>
  and <doc:Declarations#Protocol-Associated-Type-Declaration> sections.
- Updated information about initializers that return `nil`
  before the instance is fully initialized
  in the <doc:Initialization#Failable-Initializers> section.
- Added information about comparing tuples
  to the <doc:BasicOperators#Comparison-Operators> section.
- Added information about using keywords as external parameter names
  to the <doc:LexicalStructure#Keywords-and-Punctuation> section.
- Updated the discussion of the `@objc` attribute
  in the <doc:Attributes#Declaration-Attributes> section to note that
  enumerations and enumeration cases can use this attribute.
- Updated the <doc:LexicalStructure#Operators> section
  with discussion of custom operators that contain a dot.
- Added a note
  to the <doc:Declarations#Rethrowing-Functions-and-Methods> section
  that rethrowing functions can't directly throw errors.
- Added a note to the <doc:Properties#Property-Observers> section
  about property observers being called
  when you pass a property as an in-out parameter.
- Added a section about error handling
  to the <doc:GuidedTour> chapter.
- Updated figures in the
  <doc:AutomaticReferenceCounting#Weak-References>
  section to show the deallocation process more clearly.
- Removed discussion of C-style `for` loops,
  the `++` prefix and postfix operators,
  and the `--` prefix and postfix operators.
- Removed discussion of variable function arguments
  and the special syntax for curried functions.

**2015-10-20**

- Updated for Swift 2.1.
- Updated the <doc:StringsAndCharacters#String-Interpolation>
  and <doc:LexicalStructure#String-Literals> sections
  now that string interpolations can contain string literals.
- Added the <doc:Closures#Escaping-Closures> section
  with information about the `@noescape` attribute.
- Updated the <doc:Attributes#Declaration-Attributes>
  and <doc:Statements#Conditional-Compilation-Block> sections
  with information about tvOS.
- Added information about the behavior of in-out parameters
  to the <doc:Declarations#In-Out-Parameters> section.
- Added information to the <doc:Expressions#Capture-Lists> section
  about how values specified in closure capture lists are captured.
- Updated the
  <doc:OptionalChaining#Accessing-Properties-Through-Optional-Chaining>
  section to clarify how assignment through optional chaining
  behaves.
- Improved the discussion of autoclosures
  in the <doc:Closures#Autoclosures> section.
- Added an example that uses the `??` operator
  to the <doc:GuidedTour> chapter.

**2015-09-16**

- Updated for Swift 2.0.
- Added information about error handling
  to the <doc:ErrorHandling> chapter,
  the <doc:Statements#Do-Statement> section,
  the <doc:Statements#Throw-Statement> section,
  the <doc:Statements#Defer-Statement> section,
  and the <doc:Expressions#Try-Operator> section.
- Updated the <doc:ErrorHandling#Representing-and-Throwing-Errors> section,
  now that all types can conform to the `ErrorType` protocol.
- Added information about the new `try?` keyword
  to the <doc:ErrorHandling#Converting-Errors-to-Optional-Values> section.
- Added information about recursive enumerations
  to the <doc:Enumerations#Recursive-Enumerations> section
  of the <doc:Enumerations> chapter
  and the <doc:Declarations#Enumerations-with-Cases-of-Any-Type> section
  of the <doc:Declarations> chapter.
- Added information about API availability checking
  to the <doc:ControlFlow#Checking-API-Availability> section
  of the <doc:ControlFlow> chapter
  and the <doc:Statements#Availability-Condition> section
  of the <doc:Statements> chapter.
- Added information about the new `guard` statement
  to the <doc:ControlFlow#Early-Exit> section
  of the <doc:ControlFlow> chapter
  and the <doc:Statements#Guard-Statement> section
  of the <doc:Statements> chapter.
- Added information about protocol extensions
  to the <doc:Protocols#Protocol-Extensions> section
  of the <doc:Protocols> chapter.
- Added information about access control for unit testing
  to the <doc:AccessControl#Access-Levels-for-Unit-Test-Targets> section
  of the <doc:AccessControl> chapter.
- Added information about the new optional pattern
  to the <doc:Patterns#Optional-Pattern> section
  of the <doc:Patterns> chapter.
- Updated the <doc:ControlFlow#Repeat-While> section
  with information about the `repeat`-`while` loop.
- Updated the <doc:StringsAndCharacters> chapter,
  now that `String` no longer conforms
  to the `CollectionType` protocol from the Swift standard library.
- Added information about the new Swift standard library
  `print(_:separator:terminator)` function
  to the <doc:TheBasics#Printing-Constants-and-Variables> section.
- Added information about the behavior
  of enumeration cases with `String` raw values
  to the <doc:Enumerations#Implicitly-Assigned-Raw-Values> section
  of the <doc:Enumerations> chapter
  and the <doc:Declarations#Enumerations-with-Cases-of-a-Raw-Value-Type> section
  of the <doc:Declarations> chapter.
- Added information about the `@autoclosure` attribute ---
  including its `@autoclosure(escaping)` form ---
  to the <doc:Closures#Autoclosures> section.
- Updated the <doc:Attributes#Declaration-Attributes> section
  with information about the `@available`
  and `@warn_unused_result` attributes.
- Updated the <doc:Attributes#Type-Attributes> section
  with information about the `@convention` attribute.
- Added an example of using multiple optional bindings
  with a `where` clause
  to the <doc:TheBasics#Optional-Binding> section.
- Added information to the <doc:LexicalStructure#String-Literals> section
  about how concatenating string literals using the `+` operator
  happens at compile time.
- Added information to the <doc:Types#Metatype-Type> section
  about comparing metatype values and using them
  to construct instances with initializer expressions.
- Added a note to the <doc:TheBasics#Debugging-with-Assertions> section
  about when user-defined assertions are disabled.
- Updated the discussion of the `@NSManaged` attribute
  in the <doc:Attributes#Declaration-Attributes> section,
  now that the attribute can be applied to certain instance methods.
- Updated the <doc:Functions#Variadic-Parameters> section,
  now that variadic parameters can be declared in any position
  in a function's parameter list.
- Added information
  to the <doc:Initialization#Overriding-a-Failable-Initializer> section
  about how a nonfailable initializer can delegate
  up to a failable initializer
  by force-unwrapping the result of the superclass's initializer.
- Added information about using enumeration cases as functions
  to the <doc:Declarations#Enumerations-with-Cases-of-Any-Type> section.
- Added information about explicitly referencing an initializer
  to the <doc:Expressions#Initializer-Expression> section.
- Added information about build configuration
  and line control statements
  to the <doc:Statements#Compiler-Control-Statements> section.
- Added a note to the <doc:Types#Metatype-Type> section
  about constructing class instances from metatype values.
- Added a note to the
  <doc:AutomaticReferenceCounting#Weak-References>
  section about weak references being unsuitable for caching.
- Updated a note in the <doc:Properties#Type-Properties> section
  to mention that stored type properties are lazily initialized.
- Updated the <doc:Closures#Capturing-Values> section
  to clarify how variables and constants are captured in closures.
- Updated the <doc:Attributes#Declaration-Attributes> section
  to describe when you can apply the `@objc` attribute to classes.
- Added a note to the <doc:ErrorHandling#Handling-Errors> section
  about the performance of executing a `throw` statement.
  Added similar information about the `do` statement
  in the <doc:Statements#Do-Statement> section.
- Updated the <doc:Properties#Type-Properties> section
  with information about stored and computed type properties
  for classes, structures, and enumerations.
- Updated the <doc:Statements#Break-Statement> section
  with information about labeled break statements.
- Updated a note in the <doc:Properties#Property-Observers> section
  to clarify the behavior of `willSet` and `didSet` observers.
- Added a note to the <doc:AccessControl#Access-Levels> section
  with information about the scope of `private` access.
- Added a note to the
  <doc:AutomaticReferenceCounting#Weak-References>
  section about the differences in weak references
  between garbage collected systems and ARC.
- Updated the
  <doc:StringsAndCharacters#Special-Characters-in-String-Literals> section
  with a more precise definition of Unicode scalars.

**2015-04-08**

- Updated for Swift 1.2.
- Swift now has a native `Set` collection type.
  For more information, see <doc:CollectionTypes#Sets>.
- `@autoclosure` is now an attribute of the parameter declaration,
  not its type.
  There's also a new `@noescape` parameter declaration attribute.
  For more information, see <doc:Attributes#Declaration-Attributes>.
- Type methods and properties now use the `static` keyword
  as a declaration modifier.
  For more information see <doc:Declarations#Type-Variable-Properties>.
- Swift now includes the `as?` and `as!` failable downcast operators.
  For more information,
  see <doc:Protocols#Checking-for-Protocol-Conformance>.
- Added a new guide section about
  <doc:StringsAndCharacters#String-Indices>.
- Removed the overflow division (`&/`) and
  overflow remainder (`&%`) operators
  from <doc:AdvancedOperators#Overflow-Operators>.
- Updated the rules for constant and
  constant property declaration and initialization.
  For more information, see <doc:Declarations#Constant-Declaration>.
- Updated the definition of Unicode scalars in string literals.
  See <doc:StringsAndCharacters#Special-Characters-in-String-Literals>.
- Updated <doc:BasicOperators#Range-Operators> to note that
  a half-open range with the same start and end index will be empty.
- Updated <doc:Closures#Closures-Are-Reference-Types> to clarify
  the capturing rules for variables.
- Updated <doc:AdvancedOperators#Value-Overflow> to clarify
  the overflow behavior of signed and unsigned integers
- Updated <doc:Declarations#Protocol-Declaration> to clarify
  protocol declaration scope and members.
- Updated <doc:AutomaticReferenceCounting#Defining-a-Capture-List>
  to clarify the syntax for
  weak and unowned references in closure capture lists.
- Updated <doc:LexicalStructure#Operators> to explicitly mention
  examples of supported characters for custom operators,
  such as those in the Mathematical Operators, Miscellaneous Symbols,
  and Dingbats Unicode blocks.
- Constants can now be declared without being initialized
  in local function scope.
  They must have a set value before first use.
  For more information, see <doc:Declarations#Constant-Declaration>.
- In an initializer, constant properties can now only assign a value once.
  For more information,
  see <doc:Initialization#Assigning-Constant-Properties-During-Initialization>.
- Multiple optional bindings can now appear in a single `if` statement
  as a comma-separated list of assignment expressions.
  For more information, see <doc:TheBasics#Optional-Binding>.
- An <doc:Expressions#Optional-Chaining-Expression>
  must appear within a postfix expression.
- Protocol casts are no longer limited to `@objc` protocols.
- Type casts that can fail at runtime
  now use the `as?` or `as!` operator,
  and type casts that are guaranteed not to fail use the `as` operator.
  For more information, see <doc:Expressions#Type-Casting-Operators>.

**2014-10-16**

- Updated for Swift 1.1.
- Added a full guide to <doc:Initialization#Failable-Initializers>.
- Added a description of <doc:Protocols#Failable-Initializer-Requirements>
  for protocols.
- Constants and variables of type `Any` can now contain
  function instances. Updated the example in <doc:TypeCasting#Type-Casting-for-Any-and-AnyObject>
  to show how to check for and cast to a function type
  within a `switch` statement.
- Enumerations with raw values
  now have a `rawValue` property rather than a `toRaw()` method
  and a failable initializer with a `rawValue` parameter
  rather than a `fromRaw()` method.
  For more information, see <doc:Enumerations#Raw-Values>
  and <doc:Declarations#Enumerations-with-Cases-of-a-Raw-Value-Type>.
- Added a new reference section about
  <doc:Declarations#Failable-Initializers>,
  which can trigger initialization failure.
- Custom operators can now contain the `?` character.
  Updated the <doc:LexicalStructure#Operators> reference to describe
  the revised rules.
  Removed a duplicate description of the valid set of operator characters
  from <doc:AdvancedOperators#Custom-Operators>.

**2014-08-18**

- New document that describes Swift 1.0,
  Apple’s new programming language for building iOS and OS X apps.
- Added a new section about
  <doc:Protocols#Initializer-Requirements> in protocols.
- Added a new section about <doc:Protocols#Class-Only-Protocols>.
- <doc:TheBasics#Assertions-and-Preconditions> can now use string interpolation.
  Removed a note to the contrary.
- Updated the
  <doc:StringsAndCharacters#Concatenating-Strings-and-Characters> section
  to reflect the fact that `String` and `Character` values
  can no longer be combined with the addition operator (`+`)
  or addition assignment operator (`+=`).
  These operators are now used only with `String` values.
  Use the `String` type's `append(_:)` method
  to append a single `Character` value onto the end of a string.
- Added information about the `availability` attribute to
  the <doc:Attributes#Declaration-Attributes> section.
- <doc:TheBasics#Optionals> no longer implicitly evaluate to
  `true` when they have a value and `false` when they do not,
  to avoid confusion when working with optional `Bool` values.
  Instead, make an explicit check against `nil`
  with the `==` or `!=` operators
  to find out if an optional contains a value.
- Swift now has a <doc:BasicOperators#Nil-Coalescing-Operator>
  (`a ?? b`), which unwraps an optional's value if it exists,
  or returns a default value if the optional is `nil`.
- Updated and expanded
  the <doc:StringsAndCharacters#Comparing-Strings> section
  to reflect and demonstrate that string and character comparison
  and prefix / suffix comparison are now based on
  Unicode canonical equivalence of extended grapheme clusters.
- You can now try to set a property's value, assign to a subscript,
  or call a mutating method or operator through
  <doc:OptionalChaining>.
  The information about
  <doc:OptionalChaining#Accessing-Properties-Through-Optional-Chaining>
  has been updated accordingly,
  and the examples of checking for method call success in
  <doc:OptionalChaining#Calling-Methods-Through-Optional-Chaining>
  have been expanded to show how to check for property setting success.
- Added a new section about
  <doc:OptionalChaining#Accessing-Subscripts-of-Optional-Type>
  through optional chaining.
- Updated the <doc:CollectionTypes#Accessing-and-Modifying-an-Array> section
  to note that you can no longer append a single item to an array
  with the `+=` operator.
  Instead, use the `append(_:)` method,
  or append a single-item array with the `+=` operator.
- Added a note that the start value `a`
  for the <doc:BasicOperators#Range-Operators> `a...b` and `a..<b`
  must not be greater than the end value `b`.
- Rewrote the <doc:Inheritance> chapter
  to remove its introductory coverage of initializer overrides.
  This chapter now focuses more on the addition of
  new functionality in a subclass,
  and the modification of existing functionality with overrides.
  The chapter's example of
  <doc:Inheritance#Overriding-Property-Getters-and-Setters>
  has been rewritten to show how to override a `description` property.
  (The examples of modifying an inherited property's default value
  in a subclass initializer have been moved to
  the <doc:Initialization> chapter.)
- Updated the
  <doc:Initialization#Initializer-Inheritance-and-Overriding> section
  to note that overrides of a designated initializer
  must now be marked with the `override` modifier.
- Updated the <doc:Initialization#Required-Initializers> section
  to note that the `required` modifier is now written before
  every subclass implementation of a required initializer,
  and that the requirements for required initializers
  can now be satisfied by automatically inherited initializers.
- Infix <doc:AdvancedOperators#Operator-Methods> no longer require
  the `@infix` attribute.
- The `@prefix` and `@postfix` attributes
  for <doc:AdvancedOperators#Prefix-and-Postfix-Operators>
  have been replaced by `prefix` and `postfix` declaration modifiers.
- Added a note about the order in which
  <doc:AdvancedOperators#Prefix-and-Postfix-Operators> are applied
  when both a prefix and a postfix operator are applied to
  the same operand.
- Operator functions for
  <doc:AdvancedOperators#Compound-Assignment-Operators> no longer use
  the `@assignment` attribute when defining the function.
- The order in which modifiers are specified when defining
  <doc:AdvancedOperators#Custom-Operators> has changed.
  You now write `prefix operator` rather than `operator prefix`,
  for example.
- Added information about the `dynamic` declaration modifier
  in <doc:Declarations#Declaration-Modifiers>.
- Added information about how type inference works
  with <doc:LexicalStructure#Literals>.
- Added more information about curried functions.
- Added a new chapter about <doc:AccessControl>.
- Updated the <doc:StringsAndCharacters> chapter
  to reflect the fact that Swift's `Character` type now represents
  a single Unicode extended grapheme cluster.
  Includes a new section on
  <doc:StringsAndCharacters#Extended-Grapheme-Clusters>
  and more information about
  <doc:StringsAndCharacters#Unicode-Scalar-Values>
  and <doc:StringsAndCharacters#Comparing-Strings>.
- Updated the <doc:StringsAndCharacters#String-Literals> section
  to note that Unicode scalars inside string literals
  are now written as `\u{n}`,
  where `n` is a hexadecimal number between 0 and 10FFFF,
  the range of Unicode's codespace.
- The `NSString` `length` property is now mapped onto
  Swift's native `String` type as `utf16Count`, not `utf16count`.
- Swift's native `String` type no longer has
  an `uppercaseString` or `lowercaseString` property.
  The corresponding section in
  <doc:StringsAndCharacters>
  has been removed, and various code examples have been updated.
- Added a new section about
  <doc:Initialization#Initializer-Parameters-Without-Argument-Labels>.
- Added a new section about
  <doc:Initialization#Required-Initializers>.
- Added a new section about <doc:Functions#Optional-Tuple-Return-Types>.
- Updated the <doc:TheBasics#Type-Annotations> section to note that
  multiple related variables can be defined on a single line
  with one type annotation.
- The `@optional`, `@lazy`, `@final`, and `@required` attributes
  are now the `optional`, `lazy`, `final`, and `required`
  <doc:Declarations#Declaration-Modifiers>.
- Updated the entire book to refer to `..<` as
  the <doc:BasicOperators#Half-Open-Range-Operator>
  (rather than the “half-closed range operator”).
- Updated the <doc:CollectionTypes#Accessing-and-Modifying-a-Dictionary>
  section to note that `Dictionary` now has
  a Boolean `isEmpty` property.
- Clarified the full list of characters that can be used
  when defining <doc:AdvancedOperators#Custom-Operators>.
- `nil` and the Booleans `true` and `false` are now <doc:LexicalStructure#Literals>.
- Swift's `Array` type now has full value semantics.
  Updated the information about <doc:CollectionTypes#Mutability-of-Collections>
  and <doc:CollectionTypes#Arrays> to reflect the new approach.
  Also clarified the assignment and copy behavior for strings arrays and dictionaries.
- <doc:CollectionTypes#Array-Type-Shorthand-Syntax> is now written as
  `[SomeType]` rather than `SomeType[]`.
- Added a new section about <doc:CollectionTypes#Dictionary-Type-Shorthand-Syntax>,
  which is written as `[KeyType: ValueType]`.
- Added a new section about <doc:CollectionTypes#Hash-Values-for-Set-Types>.
- Examples of <doc:Closures#Closure-Expressions> now use
  the global `sorted(_:_:)` function
  rather than the global `sort(_:_:)` function,
  to reflect the new array value semantics.
- Updated the information about <doc:Initialization#Memberwise-Initializers-for-Structure-Types>
  to clarify that the memberwise structure initializer is made available
  even if a structure's stored properties don't have default values.
- Updated to `..<` rather than `..`
  for the <doc:BasicOperators#Half-Open-Range-Operator>.
- Added an example of <doc:Generics#Extending-a-Generic-Type>.

> Beta Software:
>
> This documentation contains preliminary information about an API or technology in development. This information is subject to change, and software implemented according to this documentation should be tested with final operating system software.
>
> Learn more about using [Apple's beta software](https://developer.apple.com/support/beta-software/).

<!--
This source file is part of the Swift.org open source project

Copyright (c) 2014 - 2022 Apple Inc. and the Swift project authors
Licensed under Apache License v2.0 with Runtime Library Exception

See https://swift.org/LICENSE.txt for license information
See https://swift.org/CONTRIBUTORS.txt for the list of Swift project authors
-->
