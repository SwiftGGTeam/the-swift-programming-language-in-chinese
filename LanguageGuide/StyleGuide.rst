Swift Style Guide
=================

Introduction
------------

The style suggestions below are *very* much a straw man for discussion. Comments and feedback are encouraged.

This Style Guide is intended as a reference for internal Developer Publications use when writing documentation and sample code. All of the suggestions below are open for discussion, expansion, removal or clarification. Please send any comments to Dave Addey, Developer Publications (`dave.addey@apple.com <mailto:dave.addey@apple.com?subject=Swift%20Style%20Guide>`_).

Preamble
--------

Experienced developers will already have deeply-ingrained habits for indentation, braces, comment style, and so on. We're unlikely to break those habits when introducing a new language. However, we can certainly help developers (including new developers for whom Swift is their first programming language) to develop good habits when discovering Swift's syntax. This is best done by appyling a consistent and considered style in our own sample code, documentation, templates and code snippets.

The aim of this Style Guide, then, is to define a standard that can be applied within Apple for Swift code, to demonstrate best practice to third-party developers.

Operators
---------

Single spaces should be used around binary operators, with no spaces between operands and parentheses::

    var a = (1 + 2) / 3                     // good
    var a=(1+2)/3                           // bad
    var a = ( 1 + 2 ) / 3                   // bad

*Rationale: Separating operands from their operators makes it easier to read the operation's purpose, and avoids unnecessarily dense code. Avoiding spaces inside parentheses ensures that the parens are visually attached to the operands they wrap.*

Single spaces should also be used around the ternary operator, and multiple ternary operators should never be combined::

    var rowHeight = hasHeader ? contentHeight + 50 : contentHeight + 20

*Rationale: Multiple compound ternary operator statements quickly become unreadable. The ternary operator should only be used for quick, simple if-else choices.*

Ranges should not have spaces between their end values and operator::

    for index in 0..10                  // good
    for index in 0 .. 10                // bad

*Rationale: This approach makes the range feel like a single entity, as a combination of its end values and operator. Because the operator in this case is fixed to the baseline, and is already a familiar punctuation style for eliding values, this does not lead to overly-dense code.*

Number Literals
---------------

Underscores should be used in number literals wherever it increases readability, most notably for thousand separators::

    var oneBillion = 1_000_000_000          // good
    var oneBillion = 1000000000             // not as clear

*Rationale: Given that we have the ability to use underscores, we should do so if it aids clarity and readability. It also promotes the use of underscores as best practice.*

Declaring Variables
-------------------

``Int`` should be used for all integer numbers, and ``Double`` for all floating-point numbers, unless specific sizes are explicitly needed for the task at hand (due to specific data types, performance, memory usage, or some other optimisation)::

    var meaningOfLife = 42                  // good - general-purpose integer inferred as Int
    var count: UInt8 = 17                   // bad - use of sized type is unnecessary here
    var price: Double                       // good - general-purpose floating-point declared as Double

*Rationale: Defaulting to Int and Double means that everyday values are immediately interoperable in Swift code, and provides a consistent rule for which number types to choose. It also matches the inferred types for number literals.*

When variables are initialized at the same time as they are declared, their type should be inferred (rather than explicitly typed) in variable declarations, as long as the initializing value makes the type sufficiently clear::

    var ageInYears = 37                     // clearly Int
    var welcomeMessage = "hello, world"     // clearly String
    var π = 3.14159                         // clearly Double
    var hasHydratedContent = false          // clearly Bool
    var rootNode = Node()                   // clearly Node

*Rationale: This keeps code as concise as possible, without any loss of type-safety. As long as the type is readably deducable, no clarity is lost.*

When a variable *is* explicitly typed (perhaps for later initialization), a single space should be inserted after (but not before) the colon in its type declaration::

    var rootNode: Node                      // good
    var rootNode : Node                     // bad

*Rationale: attaching the colon to the variable name causes the reader to pause at the correct point. It also ensures that the colon remains attached to something if a text editor automatically word-wraps the variable declaration.*

Naming Variables and Types
--------------------------

Type and typealias names should always be in ``WordCaps``; variable names should always be ``lowercaseThenWordCaps``. This includes variable names containing words and acronyms that would otherwise be capitalized. A type or typealias for HTTP statuses might be called ``HTTPStatus``, for example, whereas a variable of this type might be called ``http304Status``.

*Rationale: This provides a consistently-applied capitalization rule, unlike the Cocoa approach of lowercaseThenWordCaps for all variables apart from those that begin with an acronym. Types and variables can then easily be distinguished by capitalization, even if the code is not syntax-colored. Note that Cocoa names will still be imported into Swift with their existing capitalization, however.*

Variable names should be human-readable, and should not use Hungarian notation or unnecessary abbreviation. Variables of standard types should generally not include the type of the variable as part of their name. Clarity is preferred over brevity::

    var discountedPrice = 19.99             // good
    var fpPrice = 19.99                     // bad - unnecessary use of Hungarian notation
    var priceFloat = 19.99                  // bad - includes a standard type as part of the name
    var discPrice = 19.99                   // bad - unnecessary shortening of part of the name
    var p = 19.99                           // bad - no context from single-character name

*Rationale: This follows the existing Cocoa idiom, and supports the Swift aim of clarity over brevity.*

Variables of custom-defined types *may* include the type name (or a shortened version thereof), if it aids with readability of code::

    var rootNode = Node()                   // preferred over just 'root', because it makes the variable easier to read below
    rootNode.addChild(Node())               // Can be read as "add a new child node to the root node"

As a general rule for the above, think about how you would read the code out loud. You wouldn't say “Add a discounted price float to the total float”, but you might say “add a new child node to the root node”. It is by no means *necessary* to append ``Node`` to the variable name above, but it is entirely acceptable if it makes the code's intentions clearer.

To put it another way: a variable's name should describe its *purpose*, rather than its type. ``rootNode``'s purpose is to be the root node of a tree, and so the inclusion of the word ``Node`` helps to clarify this purpose when reading its name.

One-character variable names should only be used where it is specifically appropriate due to context::

    typealias GridPoint = (x: Int, y: Int)  // x and y acceptable due to coordinate context

*Rationale: Longer variable names give context to their purpose, and help to make code more readable.*

Longer variable names are preferred for loop counters::

    for index = 0; index < 10; ++index {...}

*Rationale: It is easy to mistake the letters i and j for each other inside nested loops. Short variable names are a common cause of confusion and error in C-style code, and we should encourage descriptive names wherever possible.*

``for in`` loops are preferred to C-style ``for`` loops wherever possible::

    for node in rootNode.children {...}

*Rationale: ``for x in y`` is a much more readable syntax than traditional C-style loops for iterating over a collection. The intention of this code is much clearer than counting from 0 to children.count - 1.*

Boolean variables should be named in a way that can be read as a logical sentence, to reflect their purpose when reading conditional statements::

    var showMiddleName = true               // good, because it can be read as part of a logical sentence.
    if showMiddleName {...}
    var middleName = true                   // not good - 'middleName' sounds like a declaration for the middle name itself
    if middleName {...}                     // …which makes this sound like an implicit 'if middleName != nil'.

*Rationale: Logic statements, especially compound statements, can easily become confusing. Naming variables to reflect their logical purpose helps to avoid confusion and make logic statements read as sentences.*

Tuples
------

Tuple typealiases should name their tuple elements, and should place a single space after (but not before) each colon in their definition::

    typealias HTTPStatus = (statusCode: Int, description: String)

*Rationale: Creating a tuple typealias is a quick shorthand way to define a first-class type. Naming the elements ensures that the type's purpose remains clear if it is used beyond its initial scope over time. It also enables more descriptive automatic printing of tuple values.*

Tuple instances based on a typealias should use initializer syntax, and should initialize their elements by name. They may infer their tuple type from the typealias that is being initialized. Again, a space should be placed after the element name colons, but not before::

    var http304Status = HTTPStatus(statusCode: 304, description: "Not Modified")

*Rationale: The language provides multiple ways to initialize a typealiased tuple. It is useful for us to standardize on one approach for our sample code. Initializer syntax is the natural way to initialize classes and structs, and so is recommended here for consistency. This approach also aids clarity when inferring type, as the tuple type is the very first thing to be read after the equality operator.*

Named tuple elements should be accessed by name where possible::

    println(http304Status.description)

*Rationale: If we have named elements, we should use the names, for clarity of intent. This is much clearer than ‘http304Status.1’, say.*

Tuple typealiases should only be used for multi-part return types and properties. If it ever becomes desirable to extend a tuple typealias beyond this simple usage, a new ``struct`` type should be created and used instead.

*Rationale: Tuples are not intended to become complex data structures - that's what we have structs for. Tuples should only be used for simple packaging of related values.*

Generics
--------

Generics of type ``SomeType`` should not have any whitespace between the generic type and the following ``<``::

    var someStrings = Array<String>         // good 
    var someStrings = Array <String>        // bad

*Rationale: Avoiding whitespace between the elements makes the compound type declared here (“Array of type String”) feel like a single entity (which it is), rather than two separate entities. It makes it clear that the use of <String> is explicitly tied to the Array.*

Enumerations
------------

Enumeration types and their elements should have capitalized singular names (e.g. ``Planet`` rather than ``Planets``), so that they read as part of a sentence when initializing a variable of that type. If appropriate, the type of an enum variable should be inferred by initializing it with a fully-qualified member of that enum::

    enum Planet {
        case Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune
    }
    var nearestPlanet = Planet.Earth

*Rationale: This enum syntax (Planet.Earth) makes for highly readable enum members. Singular enum type names are also consistent with other singular type names (String, Double etc.).*

Where an enum variable type is already declared or known, the enum type can be dropped from future assignments by using dot syntax. If this is done, variables based on enum types can include the enum type name in their variable name, for clarity when using dot syntax::

    nearestPlanet = .Jupiter                // good; still reads as a sentence when nearestPlanet changes value

*Rationale: Dropping the enum type where it is clear from the context makes for shorter code without loss of clarity.*

Enumeration members should not duplicate the enumeration type within their name, or otherwise prefix the member names::

    enum Planet {
        case kPlanetMercury, kPlanetVenus, kPlanetEarth, kPlanetMars, kPlanetJupiter, kPlanetSaturn, kPlanetUranus, kPlanetNeptune
        // bad - member names include duplication of type, and use an unnecessary 'k' prefix
    }

*Rationale: The enum members above lead to unnecessary duplication when written in full. Planet.Earth is much more readable than Planet.kPlanetEarth, say.*

Enumeration members should be listed on a single line where the list is short enough to fit on one line, as long as they do not have raw values. This is also acceptable in the case where they have a raw value that is an automatically-incrementing integer. This approach is particularly appropriate if the enum members have a natural reading order::

    enum Weekday : Int {
        case Sunday = 1, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday
    }

*Rationale: Enum members without raw values or associated types can easily be scanned as a list when comma-separated. This is particularly true if they have a natural order, as with the days of the week shown above.*

Enumerations with any other kind of raw values, and / or with associated value tuples, should list each member as a separate ``case`` statement on a new line::

    enum ASCIIControlCharacter : Char {
        case Tab = '\t'
        case LineFeed = '\n'
        case CarriageReturn = '\r'
    }
    enum Barcode {
        case UPCA(Int, Int, Int)
        case QRCode(String)
    }

*Rationale: Enums with raw values or associated values are harder to scan-read as a list when comma-separated, due to the multiple components for each member's declaration. Each declaration is effectively a mini-sentence, and does not scan as easily when read as a comma-separated list on one line.*

Line Lengths, Indentation and Opening Braces
--------------------------------------------

Four consecutive spaces should be used to inset the statements within the braces of any code block::

    for index in 0..10 {
        // statements
    }

*Rationale: We need to settle on some choice of indentation standard. Four spaces has always been the Xcode default, and is therefore likely to be the default habit learnt by many of our developers.*

Where the writing context means that the number of spaces is not copy-and-pasteable by developers, such as in a WWDC slide, the default inset multiple of four spaces may be reduced to a multiple of two spaces instead.

*Rationale: If the code viewing context means that horizontal space is drastically reduced, the display width of a single space is likely to be reasonably wide. As a result, the current level of indentation will be clear enough without the need for four spaces. Because the code is intended to be used for reference only, or to be typed in by the developer, this does not lead to copy-and-paste inconsistency.*

As a general rule, opening braces for code blocks should appear on the same line as the opening statement they accompany, *if* the entire opening statement that they accompany (including the brace itself) will fit onto one line. (The definition of ‘one line’ is context-dependent, as described later)::

    // these examples assume a line length of 80 characters, as indicated here by --
    // -----------------------------------------------------------------------------

    if enteredCorrectDoorCode && passedRetinaScan || hasValidDoorKey {
        // all fits on one line, so the brace accompanies that line
        // statements inside are inset by four characters
    }

If the entire statement that the opening brace accompanies does *not* fit on one line, then the opening brace should be moved to the start of a new line and indented to the same level as the root of the block it accompanies. The block's contents should then begin on another new line, with indentation of four spaces as before.

Over-long lines of code should be broken over multiple lines in the file. Wrapped parts of the line should be inset from the current inset depth by *eight* spaces, to avoid visual confusion with the four-space indent of the first line within the code block::

    // -----------------------------------------------------------------------------

    if enteredCorrectDoorCode && passedRetinaScan || hasValidDoorKey
            || knowsEmergencyOverridePassword
    {
        // did not all fit on one line, so it has wrapped
        // and the brace is at the start of another line
        // statements inside are inset by four spaces
    }

Where code needs to break over multiple lines, the line breaks should be inserted subject to the following rules:

* For conditional statements: before the first operator or opening parenthesis that is followed by an expression that will not fit (as in the example above)
* For C-style function definitions: before each ``parameterName: Type`` pair inside the parentheses that will not fit
* For selector-style function definitions: before each ``parameterName(argumentName: Type)`` triple that will not fit
* For either style of functions: if the return indicator ``->`` and its return type will not both fit, both should be moved to a new line

Examples are shown below::

    // -----------------------------------------------------------------------------
    
    class httpConnection {
        def retrieveWebPage(atURL: String, withTimeout: Double, method: String,
                allowUserCancellation: Bool) -> (source: String?, error: String?)
        {
            // wrapped lines above are inset by 8 spaces from the root of the func
            // statements inside are inset by four spaces from the root of the func
        }
        def retrieveWebPageAtURL(url: String) withTimeout(timeout: Double)
                method(method: String)
                allowUserCancellation(allowUserCancellation: Bool)
                -> (source: String?, error: String?)
        {
            // wrapped lines above are inset by 8 spaces from the root of the func
            // statements inside are inset by four spaces from the root of the func
        }
    }

*Rationale: The principle here is that the final horizontal line that opens a code block is always indented less than the first line within that code block. For this reason, where it appears on a new line, the opening brace is not indented further than the root of the block in which it itself is contained. As in the httpConnection example shown here, the opening brace then provides a handy reminder of where the current block's indentation begins, and neatly terminates the double-indentation of the previous wrapped lines. Braces are part of the block scope declaration, not part of its contents, and this difference is made clearer by associating them visually with the block-level declaration, rather than with its contents.*

*The variants below show an alternative style for discussion, with all parameters moved on to new lines whenever wrapping occurs (note the alignment of the parentheses and return symbol)*::

    // -----------------------------------------------------------------------------
    
    class httpConnection {
        def retrieveWebPage
               (atURL: String,
                withTimeout: Double,
                method: String,
                allowUserCancellation: Bool)
            -> (source: String?, error: String?)
        {
            // wrapped lines above are inset by 8 spaces from the root of the func
            // statements inside are inset by four spaces from the root of the func
        }
        def retrieveWebPageAtURL(url: String)
                withTimeout(timeout: Double)
                method(method: String)
                allowUserCancellation(allowUserCancellation: Bool)
            -> (source: String?, error: String?)
        {
            // wrapped lines above are inset by 8 spaces from the root of the func
            // statements inside are inset by four spaces from the root of the func
        }
    }

As mentioned above, the appropriate line length to use will depend on the context. Writing for a WWDC slide (c. 60 characters) is different from writing for PDF (c. 70 characters), which is different again from online documentation (c. 80 characters), or for Xcode sample code (where longer line lengths are acceptable). The exact length used for wrapping is therefore left to the writer's discretion, dependent on context. However, the rules above should be applied consistently.

Switch ``case`` declarations should be inset from the root of the switch statement by four spaces, and the statements within each case should be inset from the ``case`` statement by a further four spaces::

    switch somePlanet {
        case .Earth:
            println("Mostly harmless")
        default:
            println("Not safe for humans")
    }

*Rationale: Braces indicate that a new block of code is about to begin. Insetting the case statements within a switch statement makes it clear that they are part of that switch statement's code block, rather than existing at the same level and scope as the code before and after the switch block. This also gives a consistent approach to nesting for all control flow blocks, rather than treating switch as special. It is also consistent with the insetting of case for enums.*

Braces for multi-part control flow blocks such as ``if``, ``else if`` and ``else`` should appear on the same line as their keywords::

    if window.hasMenuBar {
        // statements
    } else if rootView.visible {
        // statements
    } else {
        // statements
    }

*Rationale: As above. Braces are part of the code-block structure, not part of the block's contents.*

Conditional Statements
----------------------

Value checks in ``if`` clauses should always put the value to be tested on the left, and the value to test against on the right::

    if valueToTest == 3 {...}           // good
    if 3 == valueToTest {...}           // bad

*Rationale: This is the natural reading order for the check being performed.*

Functions
---------

Function names and their parameter names / argument names should follow the Objective-C method naming convention of ``lowerThenWordCaps``, as with variable names. Unlike Objective-C, this also includes function names and parameter names beginning with words that would otherwise be capitalized::

    def urlComponentsFromString(urlString: String) -> Array<String> {...}

*Rationale: This provides consistency with variable names, and reserves capitalized names for Types only.*

Functions should always name their parameters, in both C-style and selector-style syntax. Each parameter should have a space after (but not before) the colon. There should also be a space after the comma separating each parameter, and a space before and after the return operator (``->``)::

    def sayHello(personName: String, salutation: String) -> String {
        // statements
    }

*Note: The selector-style syntax is still being refined, and so the advice about always naming parameters may change or require more context.*

Parameter names do not *have* to be used when calling a function, but should be used wherever it aids clarity. If parameter names *are* used, they should have a space after (but not before) their colon::

    sayHello(personName: "Dave", salutation: "Howdy!")     // good
    sayHello(personName : "Dave", salutation : "Howdy!")   // bad

*Rationale: Calling functions using their parameter names helps to clarify the intention of the values that are passed in to that function. This is particularly true where the function has more than one parameter. This is also consistent with the selector-style approach from Objective-C.*

A single space should be included after (but not before) any commas separating parameters. Spaces should not be placed between parentheses and parameter values::

    sayHello(personName: "Dave", salutation: "Howdy!")     // good
    sayHello( personName: "Dave" ,salutation: "Howdy!" )   // bad

Class functions and instance functions should be referred to as ‘methods’ (rather than functions) within comments and descriptive prose.

*Rationale: Although all functions will be prefixed by the def keyword, we have a long history of referring to class and instance functions as ‘methods’. This is certainly true throughout our existing Cocoa documentation. Given that all of our existing developers will refer to these functions as ‘methods’, and given that there is no compelling reason to do otherwise, we should remain consistent with our exising approach.*

Single-statement named functions should always place their single statement on a new line, for ease of readability::

    def sayHelloWorld() {
        println("hello, world")                         // good
    }
    def sayHelloWorld() { println("hello, world") }    // bad

*Rationale: In addition to readability, this approach also means that single-line functions can have a breakpoint inserted inside the braces in Xcode.*

Classes and Structs
-------------------

Class and struct definitions should inset all of their contents by four spaces within their braces. Class and struct property type declarations should have a space after the colon but not before it, as with variable declarations::

    class Shape {
        var numberOfSides: Int
    }

    struct Animal {
        var numberOfLegs: Int
    }

Superclasses should be indicated with a space on *both* sides of the colon. Method declarations should inset their contents by four spaces within their braces::

    class Quadrilateral : Shape {
        init() {
            numberOfSides = 4
        }
    }

Properties with getters or setters should inset the ``get`` / ``set`` statements by four spaces, and these should in turn inset their contents by a further four spaces. ``set`` should not have any spaces before or within its parentheses::

    class Circle : Shape {
        var radius: Float
        init() {
            numberOfSides = 1
        }
        var circumference: Float {
            get:
                return radius * 2 * 3.14159
            set(aCircumference):
                radius = aCircumference / (2 * 3.14159)
        }
    }

Classes and structs that conform to one or more protocols should list their protocols in alphabetical order, separated by commas with a space after but not before the comma::

    class Triangle : Shape, HitTestable, Rotatable {
        init() {
            numberOfSides = 3
        }
    }

Code Comments
-------------

Single line code comments should start with a lowercase letter, and should not have a full stop at the end::

    // sizes for the various kinds of objects
    var asteroidSize = 18
    var planetSize = 128
