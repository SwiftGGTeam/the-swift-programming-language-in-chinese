Swift Style Guide
=================

This document defines a consistent and considered style for Swift code.
This style should be used for all externally-facing code written by Apple.
Its overriding aim is to help the developer community
(including new developers, for whom Swift is their first programming language)
to adopt and work with the language,
by establishing a consistent and recognizable style within
Apple's documentation, sample code, presentation slides, Xcode templates and code snippets.

The rules in this guide have been chosen with the following goals:

* code readability and maintainability
* compatibility with Xcode and other tools
* ease of debugging
* reduction of formatting busywork
* ease of understanding

The Style Guide is currently a work in progress.
Please send any comments and suggestions to Dave Addey, Developer Publications
(`dave.addey@apple.com <mailto:dave.addey@apple.com?subject=Swift%20Style%20Guide>`_).

Declaring Variables
-------------------

``Int`` should be used for all integer numbers,
and ``Double`` for all floating-point numbers,
unless specific sizes are needed for the task at hand
(due to explicitly-sized data from an external source,
or for performance, memory usage, or other optimization)::

    var meaningOfLife = 42        // yes - general integer inferred as Int
    var count: UInt8 = 17         // no - use of sized type is unnecessary here
    var price: Double             // yes - general floating-point declared as Double

*Rationale:
Choosing default numeric types means that everyday values are immediately interoperable in Swift code.
The default numeric types also match the inferred types for numeric literals.*

*Conversely, using sized types when working with explicitly-sized external data
(such as samples from an audio file)
helps to catch any accidental overflows when writing new values to the external source,
and implicitly documents the nature of the external data.*

When variables are initialized at the same time as they are declared,
their type should be inferred (rather than explicitly typed) in variable declarations,
as long as the initializing value makes the type sufficiently clear::

    var age = 38                            // clearly Int
    var welcomeMessage = "hello, world"     // clearly String
    var π = 3.14159                         // clearly Double
    var hasHydratedContent = false          // clearly Bool
    var rootNode = Node()                   // clearly Node

*Rationale:
This keeps code as concise as possible,
without any loss of type-safety.
The type is very often already explicitly written on the right-hand side of the ``=`` sign,
as in the last example above.*

If the inferred type may be open to doubt,
or if the desired type is not the default inferred type from a literal,
it should be made explicit::

    var languageName: NSString = "Swift"
    // the type declaration is needed here because NSString is not
    // the inferred type of a string literal

Naming Conventions
------------------

Types, protocols, typealiases, type parameters and enumeration member names
should always be written in ``UpperCamelCase``.
Variable names and function names should always be written in ``lowerCamelCase``.
This includes variable names and function names containing words and acronyms that would otherwise be capitalized.
A type or typealias for HTTP statuses might be called ``HTTPStatus``, for example,
whereas a variable of this type might be called ``http304Status``.
(Acronyms should still be capitalized if they are not the first word in a name, however, as in ``retrievePageAtURL``.)

*Rationale:
This provides a consistently-applied capitalization rule,
unlike the Cocoa approach of* ``lowerCamelCase`` *for all variables and methods
apart from those that begin with an acronym.
Names can then be distinguished by capitalization, even if the code is not syntax-colored.
Note, however, that Cocoa names will still be imported into Swift with their existing capitalization.*

Variable names should be human-readable, and should not use unnecessary abbreviation.
Clarity is preferred over brevity.

*Rationale:
This follows the existing Cocoa idiom, and encourages readable code.*

A variable's name should describe its *purpose*, rather than its type.
Don't indicate the type name in the variable name unless it helps to clarify the variable's purpose::

    var originalPrice = 19.99     // yes
    var priceFloat = Float(19.99) // no - Float doesn't clarify the variable's purpose
    var origPrice = 19.99         // no - unnecessary shortening of part of the name
    var p = 19.99                 // no - no context from single-character name

One-character variable names should only be used where it is specifically appropriate due to context::

    func drawAtPoint(x: Int, y: Int) {...}   // x and y OK due to coordinate context

*Rationale:
Descriptive variable names make code more readable.*

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

    func sayHello(personName: String, salutation: String) -> String {...}
    
    sayHello(personName: "Tim", salutation: "Howdy!")

Colons after ``UpperCamelCase`` names should have a space on *both* sides of the colon::

    class Quadrilateral : Shape {...}

    class Shape : HitTestable {...}

    enum Weekday : Int {...}
    
    // a generic that takes any type that conforms to Stackable
    struct Stack<Type : Stackable> {...}

*Rationale:
This follows the tradition in other languages (including Objective-C)
of using colons with spaces on either side for conformance declarations and inheritance.*

Commas should always have a space after the comma, but not before::

    enum Weekday : Int {
        case Sunday = 1, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday
    }
    
    func sayHello(personName: String, salutation: String) -> String {...}

*Rationale:
This follows the usage of commas as punctuation in the English language.*

Binary and ternary operators should be separated from their operands with single spaces,
with the exception of the range operator ``..`` (see below)::

    var a = (1 + 2) / 3                     // yes
    var a=(1+2)/3                           // no
    var height = hasHeader ? 50 : 20        // yes

Do not separate unary operators from their operands,
or parentheses from the expressions they enclose::

    var b = - a                             // no
    var c = -a                              // yes
    var a = ( 1 + 2 ) / 3                   // no
    var a = (1 + 2) / 3                     // yes

*Rationale:
Separating operands from their non-unary operators makes it easier to read the operation's purpose,
and avoids unnecessarily dense code.*

Ranges should not have spaces between their end values and operator::

    for index in 0..10                  // yes
    for index in 0 .. 10                // no

*Rationale:
This approach makes the range feel like a single entity,
as a combination of its end values and operator.
Because the operator is fixed to the baseline,
and is already a familiar punctuation style for eliding values,
this does not lead to overly-dense code.*

Braces and Parentheses
----------------------

Opening ``{`` braces should be placed on a new line if and only if they terminate a line that has been wrapped,
and closing ``}`` braces should be given their own line::

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

*Rationale:
Any line terminated by an opening brace defines the root indentation level for the code within the braces.
If the line is wrapped, the root indentation level becomes unclear.
Placing the brace on a new line clarifies the root indentation level for the first line within the braces.*

Closing ``)`` parentheses should be kept on the same line as the code preceding them::

    var result = connection.retrieveWebPage(
        atURL: "http://www.apple.com/", withTimeout: 30, method: "GET",
        allowUserCancellation: false)
   
Vertical Whitespace
-------------------

At least one blank line should be inserted between any pair of the following constructs:

* functions
* methods
* contiguous blocks of of single-line ``var`` declarations
* multi-line ``var`` declarations
* ``enum`` declarations

You are also encouraged to add vertical whitespace wherever it may improve readability,
such as immediately after the opening brace of a
``class``, ``struct`` or ``protocol`` declaration::

    class Shape : Rotatable, Scalable {

        var numberOfSides: Int
        var origin: (Int, Int)
        
        init() {
            // statements
        }
        
        func rotate(radians: Double) {
            // statements
        }

        func scale(scaleFactor: Double) {
            // statements
        }

    }

Indentation
-----------

Braces move the current indentation level four spaces to the right::

    for i in 1..10 {
        if i % 2 == 0 {
            println("\(i) is even")
        } else {
            println("\(i) is odd")
        }
    }

Statement introducers terminated by a colon (``case:``, ``default:``, ``get:`` and ``set:``),
and the ``in`` closure statement introducer,
should be aligned with the brace that ends the enclosing brace pair::

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

It is often necessary to wrap code over multiple lines when writing for a fixed-width medium.
The rules below define a consistent approach for line-wrapping in any medium.

The appropriate line length to use for line wrapping depends on context.
Writing code for a WWDC slide (c. 75 characters)
is different from writing for PDF (c. 65 characters),
which is different again from online documentation.
The exact character count to use for wrapping is therefore left to the writer's discretion,
and should be selected to suit the medium.
However, a single width should be selected and used throughout the entire work within that medium.
If the work will be published to multiple media,
the shortest matching line width for all media should be used throughout.

Xcode sample code projects do not have to be wrapped to a fixed line width.
However, line-wrapping should still be applied manually where it aids readability.

*Rationale:
Xcode windows do not have a fixed width.
Even on a single machine,
the available horizontal space varies when navigators and utilities are shown or hidden.
The four-space indentation rule defined below matches Xcode's automatic line-wrapping behavior.
Relying on Xcode's automatic wrapping can therefore give contextually-appropriate wrapping,
based on the current window size.*

Where content has to wrap,
the second and subsequent wrapped lines should be indented by four additional spaces.
Where the wrapped content is inside parentheses,
the closing parenthesis should stay with the final wrapped line,
rather than move to a new line::

    var animationControllerToUse = delegate.tabBarController(
        controller,
        animationControllerForTransitionFromViewController: sourceViewController,
        toViewController: destinationViewController)

Line Breaking Rules
~~~~~~~~~~~~~~~~~~~

Delimiters
__________

Swift has four sets of paired delimiters:
``[…]``, ``(…)``, ``{…}``, and ``<…>``.
Where possible, delimiter pairs other than curly braces (``{…}``)
should be kept together on a line::

    var totalHeight = defaultTopMargin + defaultHeaderHeight
        + (titleHeight * numberOfTitles)
        + ((individualCellHeight + cellPadding) * numberOfTableRows)
        + defaultBottomMargin

A line break (or a line break and a comment) should be added after *any* opening delimiter
whose closing partner does not fit on the same line
(the opening delimeters are ``[``, ``(``, ``{`` and ``<``)::

  func retrieveWebPage(atURL: String, withTimeout: Double, method: String,
      allowUserCancellation: Bool)               // no

  func retrieveWebPage(
      atURL: String, withTimeout: Double, method: String,
      allowUserCancellation: Bool)               // yes

Other Punctuation
_________________
  
If a line break is required next to one of the following symbols,
it should be inserted:

* *before* the return indicator ``->``
* *before* an operator symbol or ``=``
* *before* a colon indicating conformance or inheritance
* *after* a colon preceding the type of a var or function parameter
* *after* a comma

General Guidelines
__________________ 
  
In general, prefer to break lines between, rather than within, syntactic units.
In particular try to keep declaration fragments of the form ``name: type``
(which includes function parameter declarations)
and function selector fragments of the form ``selector(name: Type)``
on a single line.

For example, using tuple-style function syntax::

    class HTTPConnection {
        func retrieveWebPage(
            atURL: String, withTimeout: Double, method: String,
            allowUserCancellation: Bool)
            -> (source: String?, error: String?)
        {
            // statements
        }
    }
    
    var connection = HTTPConnection()
    var result = connection.retrieveWebPage(
        atURL: "http://www.apple.com/", withTimeout: 30, method: "GET",
        allowUserCancellation: false)

Using selector-style function syntax::

    class HTTPConnection {
        func retrieveWebPageAtUrl(url: String) withTimeout(timeout: Double)
            method(method: String)
            allowUserCancellation(allowUserCancellation: Bool)
            -> (source: String?, error: String?)
        {
            // statements
        }
    }
    
    var connection = HTTPConnection()
    var result = connection.retrieveWebPageAtURL(
        "http://www.apple.com/", withTimeout: 30, method: "GET",
        allowUserCancellation: false)

Optional Line Breaks
____________________

The rules above explain how code should be wrapped when it does not fit on a single line.
However, these rules may also be applied at the programmer's discretion,
if additional line breaks will help to improve readability.

Keep in mind that optional line breaks may also help when the *information* density is high,
even if the textual density is not.
The first line of this function is very information-dense::

    func existential<S: Sink>(base: S) -> SinkOf<S.Element> {
        return EnumerableOf( { s.put($1) } )
    }

A line break inserted before the return indicator helps the reader to digest the code in smaller pieces::

    func existential<S: Sink>(base: S)
        -> SinkOf<S.Element>
    {
        return EnumerableOf( { s.put($1) } )
    }

Be wary of adding too many optional line breaks, however.
Code becomes hard to read if it is either too wide or too tall.
Adding too many line breaks makes it hard to take in a substantial amount of code at once.
Conversely, using too few line breaks removes valuable cues
(particularly indentation cues)
about the code's structure.

Enumerations
------------

Enumeration types and their elements should have capitalized singular names
(e.g. ``Planet`` rather than ``Planets``),
so that they read as part of a sentence when initializing a variable of that type::

    enum Planet {
        case Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune
    }
    
If an enum variable is initialized when it is declared,
its type should be inferred by initializing it with a fully-qualified member of that enum::

    var nearestPlanet = Planet.Earth


*Rationale:
This enum syntax (*\ ``Planet.Earth``\ *) makes for highly readable enum members.
Singular enum type names are consistent with other singular type names
(*\ ``String``\ *,* ``Double`` *etc.)*

Where an enum variable type is already declared or known,
the enum type should be dropped from assignments::

    nearestPlanet = .Jupiter
    // yes - still reads as a sentence when nearestPlanet changes value

*Rationale:
Dropping the enum type where it is clear from the context makes for shorter, more readable code.*

Enumeration case names should not be unnecessarily adorned,
either to indicate the enumeration type or otherwise::

    enum Planet {
        // no - member names include the type name and an unnecessary prefix
        case kPlanetMercury, kPlanetVenus, kPlanetEarth, kPlanetMars,
            kPlanetJupiter, kPlanetSaturn, kPlanetUranus, kPlanetNeptune
    }

*Rationale:
The enum members above lead to unnecessary duplication when written in full.*
``Planet.Earth`` *is much more readable than* ``Planet.kPlanetEarth``\ *, say.
This is also consistent with how we import Cocoa enum member names.*

Enumeration members should be listed on a single line where the list is short enough to fit,
as long as they do not have raw values.
This is also acceptable in the case where they have a raw value that is an automatically-incrementing integer.
This approach is particularly appropriate if the enum members have a natural reading order::

    enum Weekday : Int {
        case Sunday = 1, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday
    }

*Rationale:
Enum members without raw values or associated types can easily be scanned as a list when comma-separated.
This is particularly true if they have a natural order,
as with the days of the week shown above.*

Enumerations with any other kind of raw values,
and / or with associated value tuples,
should list each member as a separate ``case`` statement on a new line::

    enum ASCIIControlCharacter : Char {
        case Tab = '\t'
        case LineFeed = '\n'
        case CarriageReturn = '\r'
    }
    enum Barcode {
        case UPCA(Int, Int, Int)
        case QRCode(String)
    }

*Rationale:
Enums with raw values or associated values are harder to scan-read as a list when comma-separated,
due to the multiple components for each member's declaration.*

Generics
--------

Generic type names should be kept adjacent to their opening ``<``, with no intervening whitespace::

    var someStrings = Array<String>         // yes
    var someStrings = Array <String>        // no

*Rationale:
Avoiding whitespace between the elements makes the compound type
(*\ ``Array`` *of type* ``String``\ *)
feel like a single entity, rather than two separate entities.*

Loops
-----

``for x in y`` loops should be used in preference to C-style ``for`` loops wherever possible::

    for node in rootNode.children {...}

*Rationale:*
``for x in y`` *is more readable and less error-prone than traditional C-style loops for iterating over a collection,
as it avoids off-by-one errors and other bounding-value mistakes.*

Standard Library algorithms should always be used in preference to loop iteration where an appropriate algorithm exists::

    sequence.find(desiredElement)

*Rationale:
The standard library is already implemented, tested, and optimized.
Don’t write the same logic yourself if you don’t have to.
Also, an algorithm name like “find” is more indicative of what you’re doing than a raw loop is;
it would likely save you a comment.*

Conditional Statements
----------------------

Comparisons between a computed value and a literal should always place
the computed value on the left, and the literal on the right::

    if valueToTest == 3 {           // yes
    }
    if 3 == valueToTest {           // no
    }

*Rationale:
This is the natural reading order for the check being performed.
The alternative style is used in C to avoid confusion between* ``=`` and ``==``\ *,
which is avoided in Swift by the fact that* ``=`` *does not return a value.*

Functions and Methods
---------------------

A space should be inserted before and after the return indicator (``->``)::

    func sayHello(personName: String, salutation: String) -> String {
        // statements
    }

Spaces should not be placed between parentheses and parameter names or values::

    sayHello(personName: "Tim", salutation: "Howdy!")     // yes
    sayHello( personName: "Tim", salutation: "Howdy!" )   // no

Functions should be referred to as ‘methods’ in comments and descriptive prose
if they are declared within the braces of a ``class``, ``struct`` or ``enum`` body.

*Rationale:
Although all functions will be prefixed by the same* ``func`` *keyword,
we have a long history of referring to class and instance functions as ‘methods’.
This is certainly true throughout our existing Cocoa documentation.
Given that all of our existing developers will refer to these functions as ‘methods’,
we should remain consistent with our exising approach.*

Single-statement functions should always place their single statement on a new line,
for ease of readability and debuggability::

    func sayHelloWorld() {
        println("hello, world")                         // yes
    }
    
    func sayHelloWorld() { println("hello, world") }     // no

*Rationale:
In addition to improved readability,
this approach means that single-line functions can have a breakpoint inserted inside the braces in Xcode.*

Closures
--------

Consider using a trailing closure when the closure performs the bulk of the work for the function you are calling.
A good example is Grand Central Dispatch,
which has a C-style API that suits trailing closures::

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

Trailing closures with shorthand (``$0``) parameter names may be used where the closure is short,
and wouldn’t benefit from elaborated names::

    var sortedStrings = sort(strings) {
        return $0.uppercase < $1.uppercase
    }

Single-statement closures may be written on a single line,
with spaces inside the braces,
if there is no loss of clarity.
Where this is done, the braces should be contained within the closure's parentheses::

    var sortedStrings = sort(strings, { $0 < $1 })

Multi-line closures should place a new line after the closure's opening brace::

    var session = NSURLSession.sharedSession()
    var downloadTask = session.downloadTaskWithURL(
        url,
        completionHandler: {
            (url: NSURL, response: NSURLResponse, error: NSError)
        in
            // statements
            // statements
        })

Number Literals
---------------

Underscores should be used in number literals wherever it increases readability.
Their positioning should be based on US English number formatting::

    // yes - thousand separators make this large number clearer to read
    var oneBillion = 1_000_000_000
    
    // no - not as clear
    var oneBillion = 1000000000
    
    // yes - hexadecimal has established grouping conventions into powers of two
    var wordMax = 0x7FFF_FFFF_FFFF_FFFF
    
    // as does binary
    var upperBound = 0b1111_1111_1111_1111
