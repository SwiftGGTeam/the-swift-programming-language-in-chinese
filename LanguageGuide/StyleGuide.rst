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

    (swift) var a = (1 + 2) / 3                     // good
    (swift) var a=(1+2)/3                           // bad
    (swift) var a = ( 1 + 2 ) / 3                   // bad

Underscores should be used in number literals wherever it increases readability, most notably for thousand separators::

    (swift) var oneBillion = 1_000_000_000          // good
    (swift) var oneBillion = 1000000000             // not as clear

``Int``, ``Float`` or ``Double`` should be used for all numbers, unless specific sizes are explicitly needed for the task at hand::

    (swift) var meaningOfLife = 42                  // inferred Int, good
    (swift) var meaningOfLife : UInt8 = 42          // use of sized type, unnecessary

When variables are initialized at the same time as they are declared, their type should be inferred (rather than explicitly typed) in variable declarations, as long as the initializing value makes the type sufficiently clear::

    (swift) var ageInYears = 37                     // clearly Int
    (swift) var welcomeMessage = "hello, world"     // clearly String
    (swift) var π = 3.14159                         // clearly Double
    (swift) var hasHydratedContent = false          // clearly Bool
    (swift) var rootNode = Node()                   // clearly Node

When a variable *is* explicitly typed (perhaps for later initialization), single spaces should be inserted on both sides of the colon in its type declaration::

    (swift) var rootNode : Node                     // good
    (swift) var rootNode: Node                      // bad

Types and typealiases should always be in ``WordCaps``; variable names should always be ``lowercaseThenWordCaps``. This includes variable names containing words that would otherwise be capitalized. A type or typealias for HTTP statuses might be called ``HTTPStatus``, for example, whereas a variable of this type might be called ``http304Status``.

Variable names should be human-readable, and should not use Hungarian notation or unnecessary abbreviation. Variables of standard types should generally not include the type of the variable as part of their name. Clarity is preferred over brevity::

    (swift) var discountedPrice = 19.99             // good
    (swift) var fpPrice = 19.99                     // bad - unnecessary use of Hungarian notation
    (swift) var priceFloat = 19.99                  // bad - includes a standard type as part of the name
    (swift) var discPrice = 19.99                   // bad - unnecessary shortening of part of the name
    (swift) var p = 19.99                           // bad - no context from single-character name

Variables of custom-defined types *may* include the type name (or a shortened version thereof), if it aids with readability of code::

    (swift) var rootNode = Node()                   // preferred over just 'root', as it makes the variable easier to read below
    (swift) rootNode.addChild(Node())               // Can be read as "add a new child node to the root node"

As a general rule for the above, think about how you would read the code out loud. You wouldn't say “Add a discounted price float to the total float”, but you might say “add a new child node to the root node”. It is by no means *necessary* to append ``Node`` to the variable name above, but it is entirely acceptable if it makes the code's intentions clearer.

Another way of thinking about this is that a variable name should describe the variable's *purpose*, rather than its type. ``rootNode``'s purpose is to be the root node of a tree, and so the inclusion of the word ``Node`` helps to clarify this purpose when reading its name.

One-character variable names should only be used where it is specifically appropriate due to context::

    (swift) typealias GridPoint = (x: Int, y: Int)  // x and y acceptable due to coordinate context

Longer variable names are preferred for loop counters::

    (swift) for index = 0; index < 10; ++index      // avoids visual confusion between i and j in nested loops

Iteration is preferred over counted loops wherever appropriate::

    (swift) for node in rootNode.children {...}     // makes the loop's intention clearer when read

Boolean variables should be named in a way that can be read as a logical sentence, to reflect their purpose when reading conditional statements::

    (swift) var showMiddleName = true               // good, as it can be read as part of a logical sentence.
    (swift) if showMiddleName {...}
    (swift) var middleName = true                   // not so good, as 'middleName' sounds like a variable declaration for the middle name itself
    (swift) if middleName {...}                     // …which makes this sound like an implicit 'if middleName != nil'.

Tuple typealiases should include element names definitions, and should place a single space after (but not before) each colon in their definition::

    (swift) typealias HTTPStatus = (statusCode: Int, description: String)

Tuple instances based on a typealias should use initializer syntax, and should initialize their elements by name. They may infer their tuple type from the typealias that is being initialized. Again, a space should be placed after the element name colons, but not before::

    (swift) var http304Status = HTTPStatus(statusCode: 304, description: "Not Modified")

Named tuple elements should be accessed by name where possible, for clarity of intent::

    (swift) println(http304Status.description)

Tuple typealiases should only be used for multi-part return types and properties. If ever it becomes desirable to extend a tuple typealias beyond this simple usage, a new ``struct`` type should be created and used instead.

Enumeration types and their elements should have singular names (e.g. ``Planet`` rather than ``Planets``), so that they read as part of a sentence when initializing a variable of that type. If possible, the type of the enum variables should be inferred by initializing them with a fully-qualified member of that enum::

    (swift) enum Planet {
                case Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune
            }
    (swift) var nearestPlanet = Planet.Earth

Where an enum variable type is already declared or known, the enum type can be dropped from future assignments using dot syntax. If this is done, variables based on enum types can include the enum type name in their variable name, for clarity when using dot syntax::

    (swift) nearestPlanet = .Jupiter                // good; still reads as a sentence when nearestPlanet changes value

Enumeration members should not duplicate the enumeration type within their name, or otherwise prefix the member names::

    (swift) enum Planet {
                case kPlanetMercury, kPlanetVenus, kPlanetEarth, kPlanetMars, kPlanetJupiter, kPlanetSaturn, kPlanetUranus, kPlanetNeptune
                // bad - member names include duplication of type, and use an unnecessary 'k' prefix
            }

Enumeration members should be listed on a single line where the list is short enough to fit on one line, as long as they do not have raw values. This is also acceptable if they have a raw value that is an automatically-incrementing integer::

    (swift) enum Weekday : Int {
                case Sunday = 1, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday
            }

Enumerations with any other kind of raw values, and / or with associated value tuples, should list each member as a separate ``case`` statement on a new line::

    (swift) enum ASCIIControlCharacter : Char {
                case Tab = '\t'
                case LineFeed = '\n'
                case CarriageReturn = '\r'
            }
    (swift) enum Barcode {
                case UPCA(Int, Int, Int)
                case QRCode(String)
            }

Four consecutive spaces should be used to inset the contents of any code block. In addition, switch ``case`` declarations should be inset from the left-hand edge of the switch statement by four spaces, and the statements within each case should be inset from the case by a further four spaces::

    (swift) switch somePlanet {
                case .Earth:
                    println("Mostly harmless")
                default:
                    println("Not safe for humans")
            }

Opening braces for code blocks should be on the same line as the block's definition::

    (swift) for i in 0..10 {
                // statements
            }
    (swift) func analyzeNodes(rootNode : Node) {
                // statements
            }

Braces for control flow keywords such as ``else if`` and ``else`` should appear on the same line as the keywords::

    (swift) if window.hasMenuBar {
                // statements
            } else if rootView.visible {
                // statements
            } else {
                // statements
            }

Half-closed ranges should not have spaces between their end values and operator::

    (swift) for i in 0..10                      // good
    (swift) for i in 0 .. 10                    // bad
