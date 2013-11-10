Style Guide
===========

This document defines a consistent and considered style for Swift code. This style should be used for all externally-facing code written by Apple. Its overriding aim is to help the developer community (including new developers, for whom Swift is their first programming language) to develop good habits while discovering Swift's syntax. This aim is best achieved by appyling a consistent style to all Swift code within Apple's documentation, sample code, presentation slides, Xcode templates and code snippets.

The Guide aims to define a considered and internally-consistent style, with the flexibility to suit anything from a printed book to a WWDC slide deck. Where the language offers multiple possibilities for style and formatting, an easy-to-remember rule has been selected, with code readability as the primary goal.

The Style Guide is currently a work in progress. Please send any comments and suggestions to Dave Addey, Developer Publications (`dave.addey@apple.com <mailto:dave.addey@apple.com?subject=Swift%20Style%20Guide>`_).

Number Literals
---------------

Underscores should be used in number literals wherever it increases readability. Their positioning should be based on US English number formatting::

    var oneBillion = 1_000_000_000          // thousand separators make this large number clearer to read
    var oneBillion = 1000000000             // not as clear
    var wordMax = 0x7FFF_FFFF_FFFF_FFFF     // hexadecimal has established grouping conventions into powers of two
    var upperBound = 0b1111_1111_1111_1111  // as does binary

*Rationale: Given that we have the ability to use underscores, we should do so to aid clarity and readability.*

Declaring Variables
-------------------

``Int`` should be used for all integer numbers, and ``Double`` for all floating-point numbers, unless specific sizes are explicitly needed for the task at hand (due to explicitly-sized data from an external source, or for performance, memory usage, or other optimization)::

    var meaningOfLife = 42                  // yes - general-purpose integer inferred as Int
    var count: UInt8 = 17                   // no - use of sized type is unnecessary here
    var price: Double                       // yes - general-purpose floating-point declared as Double

*Rationale: Defaulting to Int and Double means that everyday values are immediately interoperable in Swift code. It also matches the inferred types for numeric literals.*

*Conversely, using sized types when working with explicitly-sized external data (such as samples from an audio file, or 8-bit data from an Arduino board) helps to catch any accidental overflows when writing new values to the external source. It also implicitly documents the nature of the external data.*

When variables are initialized at the same time as they are declared, their type should be inferred (rather than explicitly typed) in variable declarations, as long as the initializing value makes the type sufficiently clear::

    var age = 38                            // clearly Int
    var welcomeMessage = "hello, world"     // clearly String
    var π = 3.14159                         // clearly Double
    var hasHydratedContent = false          // clearly Bool
    var rootNode = Node()                   // clearly Node

*Rationale: This keeps code as concise as possible, without any loss of type-safety.*

If the inferred type may be open to doubt, or if the desired type is not the default inferred type from a literal, it should be made explicit::

    var languageName: NSString = "Swift"    // An NSString instance is not the inferred type from a string literal

Naming Conventions
------------------

Types, protocols, typealiases, type parameters and enumeration member names should always be written in ``UpperCamelCase``. Variable names and function names should always be written in ``lowerCamelCase``. This includes variable names and function names containing words and acronyms that would otherwise be capitalized. A type or typealias for HTTP statuses might be called ``HTTPStatus``, for example, whereas a variable of this type might be called ``http304Status``. (Acronyms should still be capitalized if they are not the first word in a name, however, as in ``retrievePageAtURL``.)

*Rationale: This provides a consistently-applied capitalization rule, unlike the Cocoa approach of* ``lowerCamelCase`` *for all variables and methods apart from those that begin with an acronym. Names can then be distinguished by capitalization, even if the code is not syntax-colored. Note, however, that Cocoa names will still be imported into Swift with their existing capitalization.*

Variable names should be human-readable, and should not use unnecessary abbreviation. Variables of standard types should generally not include the name of the variable's type as part of their name. Clarity is preferred over brevity::

    var discountedPrice = 19.99             // yes
    var priceFloat = 19.99                  // no - includes a standard type as part of the name
    var discPrice = 19.99                   // no - unnecessary shortening of part of the name
    var p = 19.99                           // no - no context from single-character name

*Rationale: This follows the existing Cocoa idiom, and encourages readable code.*

As a general rule, a variable's name should describe its *purpose*, rather than its type. Don't include the type name in the variable name unless it helps to clarify the variable's purpose.

One-character variable names should only be used where it is specifically appropriate due to context::

    typealias GridPoint = (x: Int, y: Int)  // x and y acceptable due to coordinate context

*Rationale: Longer variable names give more information about their purpose, and help to make code more readable.*

One-character variable names can also be used for loop iteration variables::

    for i = 0; i < 10; ++i {
        for j = 0; j < 15; ++j {
            ...
        }
    }

Punctuation and Spacing
-----------------------

Colons after ``lowerCamelCase`` names should have a space after the colon, but not before::

    var rootNode: Node

    def sayHello(personName: String, salutation: String) -> String {...}
    
    sayHello(personName: "Dave", salutation: "Howdy!")

*Rationale: This mirrors Objective-C's selector-style use of colons for declaring and calling methods.*

Colons after ``UpperCamelCase`` names should have a space on *both* sides of the colon::

    class Quadrilateral : Shape {...}

    class Shape : HitTestable {...}

    enum Weekday : Int {...}
    
    struct Stack<Type : Stackable> {...}  // a generic that takes any type that conforms to Stackable

*Rationale: This follows the tradition in other languages (including Objective-C) of using colons with spaces on either side for conformance declarations.*

Commas should always have a space after the comma, but not before::

    enum Weekday : Int {
        case Sunday = 1, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday
    }
    
    def sayHello(personName: String, salutation: String) -> String {...}

*Rationale: This follows the usage of commas as punctuation in the English language.*

Single spaces should be used around binary operators, with no spaces between operands and parentheses::

    var a = (1 + 2) / 3                     // yes
    var a=(1+2)/3                           // no
    var a = ( 1 + 2 ) / 3                   // no

Single spaces should also be used around the parts of the ternary operator::

    var rowHeight = hasHeader ? contentHeight + 50 : contentHeight + 20

*Rationale: Separating operands from their operators makes it easier to read the operation's purpose, and avoids unnecessarily dense code.*

Ranges, however, should not have spaces between their end values and operator::

    for index in 0..10                  // yes
    for index in 0 .. 10                // no

*Rationale: This approach makes the range feel like a single entity, as a combination of its end values and operator. Because the operator in this case is fixed to the baseline, and is already a familiar punctuation style for eliding values, this does not lead to overly-dense code.*

Braces
------

Opening ``{`` braces should only be placed on a new line if they terminate a line that has been wrapped::

    // these examples assume a line length of 80 characters, as indicated here by --
    // -----------------------------------------------------------------------------

    if enteredCorrectDoorCode && passedRetinaScan || hasValidDoorKey {
        // all fits on one line, so the brace accompanies that line
    }

    if enteredCorrectDoorCode && passedRetinaScan || hasValidDoorKey
        || knowsEmergencyOverridePassword
    {
        // did not all fit on one line, so the line has been wrapped
        // the brace is then placed at the start of a new line,
        // at the same indentation level as the root of the wrapped line
    }

*Rationale: Any line terminated by an opening brace defines the root indentation level for the code within the braces. If the line is wrapped, the root indentation level becomes unclear. Placing the brace on a new line clarifies the root indentation level for the first line within the braces.*

Vertical Space
-----------

Vertical space is encouraged if it aids readability, such as within long ``class``, ``struct`` and ``protocol`` definitions::

    class Shape : Rotatable, Scalable {

        var numberOfSides: Int
        
        init() {
            // statements
        }
        
        def rotate(radians: Double) {
            // statements
        }

        def scale(scaleFactor: Double) {
            // statements
        }

    }

Indentation
-----------

Braces move the current indent level four spaces to the right::

    for i in 1..10 {
        if i % 2 == 0 {
            println("\(i) is even")
        } else {
            println("\(i) is odd")
        }
    }

    struct Animal {
        var numberOfLegs: Int
    }

Statement introducers terminated by a colon (``case``, ``default``, ``get`` and ``set``), and the ``in`` closure statement introducer, should be de-dented four spaces to the *left* of the current indent level::

    switch somePlanet {
    case .Earth:
        println("Mostly harmless")
    default:
        println("Not safe for humans")
    }

    class Circle : Shape {
        var radius: Float
        var circumference: Float {
        get:
            return radius * 2 * 3.14159
        set(aCircumference):
            radius = aCircumference / (2 * 3.14159)
        }
    }

Line Length and Wrapping
------------------------

It is often necessary to wrap code over multiple lines when writing for a fixed-width medium. The rules below define a consistent approach for line-wrapping in any medium.

The appropriate line length to use for line wrapping will depend on the writing context. Writing code for a WWDC slide (c. 75 characters) is different from writing for PDF (c. 65 characters), which is different again from online documentation. The exact character count to use for wrapping is therefore left to the writer's discretion, and should be selected to suit the medium. However, a single width should be selected and used throughout the entire work within that medium. If the work will be published to multiple media, the shortest matching line width should be used throughout.

Note that Xcode sample code projects should *not* use manual line-wrapping. However, specific line-wrapping rules may be applied if they aid code readability in individual cases.

*Rationale: Xcode windows do not have a fixed width. Even on a single machine, the available horizontal space varies when navigators and utilities are shown or hidden. The four-space indentation rule defined below matches Xcode's automatic line-wrapping behavior. Relying on Xcode's automatic wrapping therefore gives contextually-appropriate wrapping, regardless of the current window size.*

Where content has to wrap, the wrapped lines should move the current indent level four spaces to the right for the second and subsequent wrapped lines. Where the wrapped content is inside parentheses, the closing parenthesis should be moved to a new line, to reiterate the current indent level::

    // -----------------------------------------------------------------------------

    var animationControllerToUse = delegate.tabBarController(controller,
        animationControllerForTransitionFromViewController: sourceViewController,
        toViewController: destinationViewController
    )

Line Break Rules
~~~~~~~~~~~~~~~~

These rules define the correct points to insert line breaks in manually-wrapped code.

Function Definitions and Calls
______________________________

* For named parameters, place a newline immediately before each ``name: Type`` (or  ``name: value``) that does not fit on the preceding line
* For unnamed parameters, place a newline immediately before each ``Type`` (or ``value``) that does not fit on the preceding line
* Opening parentheses should always remain attached to the end of the name that precedes them
* If the return indicator ``->`` and its return type will not both fit, both should be moved to a new line

For example, using C-style function syntax::

    // -----------------------------------------------------------------------------
    
    class HTTPConnection {
        def retrieveWebPage(atURL: String, withTimeout: Double, method: String,
            allowUserCancellation: Bool
        ) -> (source: String?, error: String?)
        {
            // statements
        }
    }
    
    var connection = HTTPConnection()
    var appleResult = connection.retrieveWebPage(atURL: "http://www.apple.com/",
        withTimeout: 30, method: "GET", allowUserCancellation: false
    )
    var macProPerformanceResult = connection.retrieveWebPage(
        atURL: "http://www.apple.com/mac-pro/performance/", withTimeout: 30,
        method: "GET", allowUserCancellation: false
    )

Using selector-style function syntax::

    // -----------------------------------------------------------------------------
    
    class HTTPConnection {
        def retrieveWebPageAtUrl(String) withTimeout(timeout: Double)
            method(method: String) allowUserCancellation(allowUserCancellation: Bool)
            -> (source: String?, error: String?)
        {
            // statements
        }
    }
    
    var connection = HTTPConnection()
    var appleResult = connection.retrieveWebPageAtURL("http://www.apple.com/",
        withTimeout: 30, method: "GET", allowUserCancellation: false
    )
    var macProPerformanceResult = connection.retrieveWebPageAtURL(
        "http://www.apple.com/mac-pro/performance/", withTimeout: 30, method: "GET",
        allowUserCancellation: false
    )

Expressions
___________

* Place a line break immediately before each binary operator that does not fit on the preceding line
* Sub-expressions wrapped in parentheses may be moved to a new line as a unit, if this aids readability

::

    // -----------------------------------------------------------------------------

    var totalHeight = defaultTopMargin + defaultHeaderHeight
        + (titleHeight * numberOfTitles)
        + ((individualCellHeight + cellPadding) * numberOfTableRows)
        + defaultBottomMargin

Code Comments
-------------

Single-line code comments should start with a lowercase letter, and should not have a period at the end::

    // sizes for the various kinds of objects
    var asteroidSize = 18
    var planetSize = 128

Tuples
------

Tuple instances based on a typealias should use initializer syntax, and may infer their tuple type from the typealias::

    typealias HTTPStatus = (Int, String)
    var http304Status = HTTPStatus(304, "Not Modified")

*Rationale: Initializer syntax is the natural way to initialize classes and structs, and is recommended here for consistency. This approach also aids clarity when inferring type, as the tuple type is the very first thing to be read after the equality operator.*

Tuple typealiases should only be used for multi-part return types and properties. If it ever becomes desirable to extend a tuple typealias beyond this simple usage, a new struct type should be created and used instead.

*Rationale: Tuples are not intended to become complex data structures - that's what we have structs for. Tuples should only be used for simple packaging of related values.*

Enumerations
------------

Enumeration types and their elements should have capitalized singular names (e.g. ``Planet`` rather than ``Planets``), so that they read as part of a sentence when initializing a variable of that type. If an enum variable is initialized when it is declared, its type should be inferred by initializing it with a fully-qualified member of that enum::

    enum Planet {
        case Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune
    }
    var nearestPlanet = Planet.Earth

*Rationale: This enum syntax (*\ ``Planet.Earth``\ *) makes for highly readable enum members. Singular enum type names are also consistent with other singular type names (*\ ``String``\ *,* ``Double`` *etc.).*

Where an enum variable type is already declared or known, the enum type should be dropped from assignments::

    nearestPlanet = .Jupiter        // yes - still reads as a sentence when nearestPlanet changes value

*Rationale: Dropping the enum type where it is clear from the context makes for shorter, more readable code.*

Enumeration members should not duplicate the enumeration type within their name, or otherwise prefix the member names::

    enum Planet {
        case kPlanetMercury, kPlanetVenus, kPlanetEarth, kPlanetMars, kPlanetJupiter, kPlanetSaturn, kPlanetUranus, kPlanetNeptune
        // bad - member names include duplication of type, and use an unnecessary 'k' prefix
    }

*Rationale: The enum members above lead to unnecessary duplication when written in full. Planet.Earth is much more readable than Planet.kPlanetEarth, say. This is also consistent with how we import Cocoa enum member names.*

Enumeration members should be listed on a single line where the list is short enough to fit, as long as they do not have raw values. This is also acceptable in the case where they have a raw value that is an automatically-incrementing integer. This approach is particularly appropriate if the enum members have a natural reading order::

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

*Rationale: Enums with raw values or associated values are harder to scan-read as a list when comma-separated, due to the multiple components for each member's declaration.*

Generics
--------

Generics of type ``SomeType`` should not have any whitespace between the generic type and the following ``<``::

    var someStrings = Array<String>         // yes
    var someStrings = Array <String>        // no

*Rationale: Avoiding whitespace between the elements makes the compound type (*\ ``Array`` *of type* ``String``\ *) feel like a single entity, rather than two separate entities.*

Loops
-----

``for x in y`` loops should be used in preference to C-style ``for`` loops wherever possible::

    for node in rootNode.children {...}

*Rationale:* ``for x in y`` *is more readable and less error-prone than traditional C-style loops for iterating over a collection, as it avoids off-by-one errors and other bounding-value mistakes.*

Standard Library algorithms should always be used in preference to loop iteration where an appropriate algorithm exists::

    sequence.find(desiredElement)

*Rationale: The Swift Standard Library is very closely integrated with the core language. Using the Standard Library algorithms in Apple code helps to encourage their adoption.*

Conditional Statements
----------------------

Value checks in ``if`` clauses should always put the value to be tested on the left, and the value to test against on the right::

    if valueToTest == 3 {...}           // yes
    if 3 == valueToTest {...}           // no

*Rationale: This is the natural reading order for the check being performed.*

Functions
---------

A space should be inserted before and after the return indicator (``->``)::

    def sayHello(personName: String, salutation: String) -> String {
        // statements
    }

Spaces should not be placed between parentheses and parameter names or values::

    sayHello(personName: "Tim", salutation: "Howdy!")     // yes
    sayHello( personName: "Tim", salutation: "Howdy!" )   // no

Class functions and instance functions should be referred to as ‘methods’ (rather than functions) within comments and descriptive prose.

*Rationale: Although all functions will be prefixed by the same* ``def`` *keyword, we have a long history of referring to class and instance functions as ‘methods’. This is certainly true throughout our existing Cocoa documentation. Given that all of our existing developers will refer to these functions as ‘methods’, we should remain consistent with our exising approach.*

Single-statement functions should always place their single statement on a new line, for ease of readability::

    def sayHelloWorld() {
        println("hello, world")                         // yes
    }
    def sayHelloWorld() { println("hello, world") }     // no

*Rationale: In addition to improved readability, this approach means that single-line functions can have a breakpoint inserted inside the braces in Xcode.*

Closures
--------

Consider using a trailing closure when the closure performs the bulk of the work for the function you are calling. A good example is Grand Central Dispatch, which has a C-style API that suits trailing closures::

    var someValue = 42
    dispatch_async(someQueue) {
        println("Value is \(someValue)")
        someValue += 1
    }

Closure parameter types and return types may be inferred if they are clear from the context::

    var sortedStrings = sort(strings) {
        (string1, string2)
    in
        return string1.uppercase < string2.uppercase
    }

Trailing closures with shorthand (``$0``) parameter names may be used where both parameters are interchangeable, as in sorting and comparison closures::

    var sortedStrings = sort(strings) {
        return $0.uppercase < $1.uppercase
    }

Single-statement closures may be written on a single line, with spaces inside the braces, if there is no loss of clarity::

    var sortedStrings = sort(strings) { return $0 < $1 }

A new line should be started for named closures, immediately after the closure's opening brace::

    var session = NSURLSession.sharedSession()
    var downloadTask = session.downloadTaskWithURL(url, completionHandler: {
        (url: NSURL, response: NSURLResponse, error: NSError)
    in
        // statements
        // statements
    })

Methods with line-wrapped definitions, or with multiple closure parameters, should move each closure's parameter name onto a new line to improve readability::

    // -----------------------------------------------------------------------------

    viewController.transitionFromViewController(fromViewController
        toViewController: toViewController duration: 1.0
        options: UIViewAnimationOptionLayoutSubviews
        animations: {
            // a closure containing the changes to commit to the views
        }
        completion: {
            (finished: Bool)
        in
            // a closure to be called when the animation completes
        }
    )
