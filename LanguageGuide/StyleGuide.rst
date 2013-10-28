Swift Style Guide
=================

Introduction
------------

The style suggestions below are *very* much a straw man for discussion. Comments and feedback are encouraged.

This Style Guide is intended as a reference for internal Developer Publications use when writing documentation and sample code. However, a variant of it could also be included in the Language Guide document, if it is considered useful.

All of the suggestions below are open for discussion, expansion, removal or clarification. Please send any comments to Dave Addey, Developer Publications (`dave.addey@apple.com <mailto:dave.addey@apple.com?subject=Swift%20Style%20Guide>`_).

Style Guide
-----------

Single spaces should be used around binary operators, with no spaces between operands and parentheses::

    var a = (1 + 2) / 3                     // good
    var a=(1+2)/3                           // bad
    var a = ( 1 + 2 ) / 3                   // bad

Underscores should be used in number literals wherever it increases readability, most notably for thousand separators::

    var oneBillion = 1_000_000_000          // good
    var oneBillion = 1000000000             // not as clear

``Int``, ``Float`` or ``Double`` should be used for all numbers, unless specific sizes are explicitly needed for the task at hand::

    var meaningOfLife = 42                  // inferred Int, good
    var meaningOfLife : UInt8 = 42          // use of sized type, unnecessary

When variables are initialized at the same time as they are declared, their type should be inferred (rather than explicitly typed) in variable declarations, as long as the initializing value makes the type sufficiently clear::

    var ageInYears = 37                     // clearly Int
    var welcomeMessage = "hello, world"     // clearly String
    var π = 3.14159                         // clearly Double
    var hasHydratedContent = false          // clearly Bool
    var rootNode = Node()                   // clearly Node

When a variable *is* explicitly typed (perhaps for later initialization), single spaces should be inserted on both sides of the colon in its type declaration::

    var rootNode : Node                     // good
    var rootNode: Node                      // bad

Types and typealiases should always be in ``WordCaps``; variable names should always be ``lowercaseThenWordCaps``. This includes variable names containing words that would otherwise be capitalized. A type or typealias for HTTP statuses might be called ``HTTPStatus``, for example, whereas a variable of this type might be called ``http304Status``.

Variable names should be human-readable, and should not use Hungarian notation or unnecessary abbreviation. Variables of standard types should generally not include the type of the variable as part of their name. Clarity is preferred over brevity::

    var discountedPrice = 19.99             // good
    var fpPrice = 19.99                     // bad - unnecessary use of Hungarian notation
    var priceFloat = 19.99                  // bad - includes a standard type as part of the name
    var discPrice = 19.99                   // bad - unnecessary shortening of part of the name
    var p = 19.99                           // bad - no context from single-character name

Variables of custom-defined types *may* include the type name (or a shortened version thereof), if it aids with readability of code::

    var rootNode = Node()                   // preferred over just 'root', because it makes the variable easier to read below
    rootNode.addChild(Node())               // Can be read as "add a new child node to the root node"

As a general rule for the above, think about how you would read the code out loud. You wouldn't say “Add a discounted price float to the total float”, but you might say “add a new child node to the root node”. It is by no means *necessary* to append ``Node`` to the variable name above, but it is entirely acceptable if it makes the code's intentions clearer.

Another way of thinking about this is that a variable name should describe the variable's *purpose*, rather than its type. ``rootNode``'s purpose is to be the root node of a tree, and so the inclusion of the word ``Node`` helps to clarify this purpose when reading its name.

One-character variable names should only be used where it is specifically appropriate due to context::

    typealias GridPoint = (x: Int, y: Int)  // x and y acceptable due to coordinate context

Longer variable names are preferred for loop counters::

    for index = 0; index < 10; ++index      // avoids visual confusion between i and j in nested loops

``for in`` loops are preferred to C-style ``for`` loops wherever possible::

    for node in rootNode.children {...}     // the loop's intention is clearer than using children.count, say

Boolean variables should be named in a way that can be read as a logical sentence, to reflect their purpose when reading conditional statements::

    var showMiddleName = true               // good, because it can be read as part of a logical sentence.
    if showMiddleName {...}
    var middleName = true                   // not good - 'middleName' sounds like a declaration for the middle name itself
    if middleName {...}                     // …which makes this sound like an implicit 'if middleName != nil'.

Tuple typealiases should name their tuple elements, and should place a single space after (but not before) each colon in their definition::

    typealias HTTPStatus = (statusCode: Int, description: String)

Tuple instances based on a typealias should use initializer syntax, and should initialize their elements by name. They may infer their tuple type from the typealias that is being initialized. Again, a space should be placed after the element name colons, but not before::

    var http304Status = HTTPStatus(statusCode: 304, description: "Not Modified")

Named tuple elements should be accessed by name where possible, for clarity of intent::

    println(http304Status.description)

Tuple typealiases should only be used for multi-part return types and properties. If it ever becomes desirable to extend a tuple typealias beyond this simple usage, a new ``struct`` type should be created and used instead.

Enumeration types and their elements should have singular names (e.g. ``Planet`` rather than ``Planets``), so that they read as part of a sentence when initializing a variable of that type. If possible, the type of an enum variable should be inferred by initializing it with a fully-qualified member of that enum::

    enum Planet {
        case Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune
    }
    var nearestPlanet = Planet.Earth

Where an enum variable type is already declared or known, the enum type can be dropped from future assignments using dot syntax. If this is done, variables based on enum types can include the enum type name in their variable name, for clarity when using dot syntax::

    nearestPlanet = .Jupiter                // good; still reads as a sentence when nearestPlanet changes value

Enumeration members should not duplicate the enumeration type within their name, or otherwise prefix the member names::

    enum Planet {
        case kPlanetMercury, kPlanetVenus, kPlanetEarth, kPlanetMars, kPlanetJupiter, kPlanetSaturn, kPlanetUranus, kPlanetNeptune
        // bad - member names include duplication of type, and use an unnecessary 'k' prefix
    }

Enumeration members should be listed on a single line where the list is short enough to fit on one line, as long as they do not have raw values. This is also acceptable in the case where they have a raw value that is an automatically-incrementing integer::

    enum Weekday : Int {
        case Sunday = 1, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday
    }

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

Four consecutive spaces should be used to inset the contents of any code block. In addition, switch ``case`` declarations should be inset from the left-hand edge of the switch statement by four spaces, and the statements within each case should be inset from the case by a further four spaces::

    switch somePlanet {
        case .Earth:
            println("Mostly harmless")
        default:
            println("Not safe for humans")
    }

Opening braces for code blocks should be on the same line as the block's definition::

    for i in 0..10 {
        // statements
    }
    func analyzeNodes(rootNode : Node) {
        // statements
    }

Braces for control flow keywords such as ``if``, ``else if`` and ``else`` should appear on the same line as the keywords::

    if window.hasMenuBar {
        // statements
    } else if rootView.visible {
        // statements
    } else {
        // statements
    }

Value checks in ``if`` clauses should always put the value to be tested on the left, and the value to test against on the right::

    if valueToTest == 3 {...}           // good
    if 3 == valueToTest {...}           // bad

Half-closed ranges should not have spaces between their end values and operator::

    for i in 0..10                      // good
    for i in 0 .. 10                    // bad

Functions should always name their parameters. Each parameter should always have a space before and after the colon. There should also be a space after the comma separating each parameter, and a space before and after the return operator (``->``). Opening braces for functions should be on the same line as the function declaration::

    func sayHello(personName : String, salutation : String) -> String {
        // statements
    }

Functions with more than one parameter should always have names assigned to their parameters in the function definition. Parameter names do not *have* to be used when calling a function, but should be used wherever it aids clarity. If parameter names *are* used, they should have a space after (but not before) their colon::

    sayHello(personName: "Chris", salutation: "Howdy!")     // good
    sayHello(personName : "Chris", salutation : "Howdy!")   // bad

A single space should be included after any commas separating parameters. Spaces should not be placed between parentheses and parameter values::

    sayHello(personName: "Chris", salutation: "Howdy!")     // good
    sayHello( personName: "Chris" , salutation: "Howdy!" )  // bad

Class functions and instance functions may be referred to as ‘methods’ within descriptive prose.

Single-statement named functions should place their single statement on a new line, for ease of readability::

    func sayHelloWorld() {
        println("hello, world")                         // good
    }
    func sayHelloWorld() { println("hello, world") }    // bad

Functions with a possible error condition should return a tuple containing an optional value of their expected return type, and an optional value of an appropriate error type. If a partial value is obtained before an error occurrs, both elements in the tuple should be populated where appropriate. This way, if the error indicates a partial failure, some level of recovery may still be possible by checking for the optional return value in light of the context given by the error message::

    func retrieveWebPageSourceAtURL(url : String) -> (source : String?, error : NSError?) {...}
    var pageRetrieval = retrieveWebPageSourceAtURL("http://apple.com")
    if pageRetrieval.error {
        // handle the error, and possibly check for pageRetrieval.source depending on the nature of the error
    } else {
        // process pageRetrieval.source
    }