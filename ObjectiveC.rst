Interacting with Objective-C and Cocoa
======================================

.. docnote:: Subjects to be covered in this section

	* Compatibility with Objective-C (and related C) basic data types
	* Importing modules
	* Working with Objective-C classes, methods and properties
	* id compatibility
	* Inheriting Objective-C classes
	* Objective-C protocols
	* Objective-C containers, structures and enums
	* Initializing Objective-C objects
	* Extending Objective-C types
	* Working with Objective-C selectors
	* Dot syntax
	* Blocks, and how they relate to closures
	* Importing Objective-C macros
	* Overloading and selectors
	* Relationship to message send syntax

.. refnote:: Guided Tour: Interacting with Objective-C and Cocoa

	A major design goal for Swift is seamless interoperation with Objective-C and
	our existing frameworks. You use the same syntax to work with Cocoa framework
	concepts like ``NSArray`` or ``NSWindow`` as you do Swift classes and "C-like"
	concepts.  Swift follows exactly the same object model as Objective-C and uses
	the same dispatch and runtime for NSObjects.  This is a key design point that
	allows you to mix and match Swift code with Objective-C code in the same
	project, allowing smooth adoption for existing apps and frameworks.

	Swift uses a module system for its frameworks (rather than a header-based
	approach), so any Objective-C framework that's accessible as an Objective-C
	module can be directly imported into Swift.  It is not implemented yet, but we
	fully expect Swift modules to be importable by Clang.

	Even the REPL works great with Cocoa.  To see this, start by importing the Clang
	Cocoa module (which is built directly from Cocoa.h)::

		(swift) import Cocoa 
		(swift)  

	You can create an instance of a Cocoa class just like any other class::

		(swift) var array = NSMutableArray()
		// array : NSMutableArray = [
		// 
		// ]
		(swift) var date = NSDate()
		// date : NSDate = 2013-02-27 20:17:39 +0000
		(swift) 

	As you would expect, simple things like type inference work great with Cocoa
	types.  The REPL even knows to use the output of the ``description()`` method
	to prettyprint objects.

	Everything that we've described works great with Cocoa classes, including
	calling simple methods on them::

		(swift) array.addObject(date)
		(swift) array.count()
		// NSUInteger = 1
		(swift) array
		// array : NSMutableArray = (
		//     "2013-02-27 20:17:39 +0000"
		// )
		(swift) 

	You can also use Swift's literal syntax to create Cocoa arrays and dictionaries,
	if there is a contextual type (as in a function call or explicitly typed
	local variable) to indicate that you want an NSArray instead of a basic language
	array::

		(swift) var stringArray : NSArray = ["This", "is", "awesome!"]
		// stringArray : NSArray = [
		//   "This",
		//   "is",
		//   "awesome!"
		// ]
		(swift) 

	Swift's builtin ``String`` and ``NSString`` work great together, so everything "just works". Try building a string from the components in the array::

		(swift) var string = stringArray.componentsJoinedByString(" ")
		// string : NSString = This is awesome!
		(swift) 

	You can even use Swift's interpolation syntax::

		(swift) var mutableString = NSMutableString()
		(swift) for index in 1..4 {
				  mutableString.appendString("\nNumber \(index)")
				}
		(swift) mutableString
		// mutableString : NSMutableString = 
		// Number 1
		// Number 2
		// Number 3
		(swift)

	You can initialize Objective-C objects using ``initWith...`` methods by supplying constructor arguments::

		(swift) var number = NSNumber(true)
		// number : NSNumber = 1
		(swift)

	Because Swift uses the standard Objective-C object model, you can extend a class
	written in Objective-C with a Swift extension (which just defines a "category"
	in Objective-C parlance)::

		(swift) extension NSString {
				  func stringByTrimmingWhitespace() -> NSString {
					var wsSet = NSCharacterSet.whitespaceCharacterSet()
					return self.stringByTrimmingCharactersInSet(NSCharacterSet(wsSet))
				  }
				}
		(swift) string = "       trim me       "
		(swift) string.stringByTrimmingWhitespace()
		// NSString = trim me
		(swift)
	
	and you can even extend non-class Objective-C types, like structures::

		(swift) extension NSRect {
				  func area() -> CGFloat {
					return self.size.height * self.size.width
				  }
				} 
		(swift) var rect = NSRect(4,5,200,400)
		// rect : NSRect = NSRect(CGPoint(4.0, 5.0), CGSize(200.0, 400.0))
		(swift) rect.area()
		// CGFloat = 80000.0
		(swift) 

	If you do this, the extensions are not visible to Objective-C code, because it
	has no way to model this.  It is extremely useful in Swift code though.

.. refnote:: Guided Tour: Invoking Objective-C Selectors

	When invoking an Objective-C selector that takes one argument (or no arguments), you simply use the Swift function call syntax::

		(swift) string.uppercaseString()
		// NSString =        TRIM ME       
		(swift)

	For selectors that take more than one argument, you have a variety of options. In situations where there is only one possible selector for a given set of arguments, just supply them in order::

		(swift) string.rangeOfString("m", NSBackwardsSearch)
		// NSRange = NSRange(12, 1)
		(swift) 

	If there are multiple possible selectors, or if you prefer to be explicit, you can name the arguments::

		(swift) string.rangeOfString("m", options:NSBackwardsSearch)
		// NSRange = NSRange(12, 1)
		(swift) 

.. refnote:: Guided Tour: AppKit Magic:

	You're not just limited to working with Foundation classes in the REPL. When importing Cocoa, the REPL sets up a run loop for you, so you can also test AppKit classes, like ``NSWindow``::
	
		(swift) var frame = NSRect(200, 200, 700, 400)
		// frame : NSRect = NSRect(CGPoint(200.0, 200.0), CGSize(700.0, 400.0))
		(swift) var mask = Int(NSTitledWindowMask|NSClosableWindowMask|NSResizableWindowMask)
		// mask : Int64 = 11
		(swift) var backing = NSBackingStoreType(NSBackingStoreBuffered)
		// backing : Int64 = 2
		(swift) var window = NSWindow(initWithContentRect:frame, styleMask:mask, backing:backing, defer:false)
		// window : NSWindow = <NSWindow: 0x3fb3cefa3dfe>
		(swift) window.setReleasedWhenClosed(false)
		(swift) window.makeKeyAndOrderFront(nil)
		(swift) 

	Try interacting with the window that opens---you'll find that you can resize it, maximize it, move it, or close it (but don't close it for now).

	You can then use the REPL to change property values and see the window update immediately::

		(swift) window.setTitle("My Lovely Window")
		(swift) 

	This provides a fantastic learning experience for developers new to Cocoa. Add a text field and watch how its appearance changes as you set each property::

		(swift) var field = NSTextField(NSRect(150, 200, 400, 50))
		// field : NSTextField = <NSTextField: 0x7fca58fad540>
		(swift) var content = window.contentView() as! NSView
		// content : NSView = <NSView: 0x7fca5041dc90>
		(swift) content.addSubview(field)
		(swift) field.setStringValue("Hello, world!")
		(swift) field.setEditable(false)
		(swift) field.setAlignment(Int(NSCenterTextAlignment))
		(swift) field.setFont(NSFont.systemFontOfSize(42))
		(swift) field.setBezeled(false)
		(swift) field.setDrawsBackground(false)
		(swift) field.setTextColor(NSColor.redColor())
		(swift) 

	Next add a button and create an instance of a Swift class to act as the target::

		(swift) var button = NSButton(NSRect(300, 50, 100, 25))
		// button : NSButton = <NSButton: 0x7fdd81578224>
		(swift) content.addSubview(button)
		(swift) button.setBezelStyle(NSRoundedBezelStyle)
		(swift) class Delegate : NSObject {
				  func doSomething(sender : id) {
					println("Doing something!")
				  }
				}
		(swift) var delegate = Delegate()
		// delegate : Delegate = <Delegate: 0x7fdd82433d3>
		(swift) button.setTarget(delegate)
		(swift) button.setAction("doSomething:")
		(swift) 

	Click the button and you'll see the message appear in the REPL:

	.. image:: /images/swiftCocoa.png
	   :align: center
	   :width: 30em
