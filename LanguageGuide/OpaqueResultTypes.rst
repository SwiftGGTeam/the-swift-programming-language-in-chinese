Opaque Result Types
===================

An *opaque result type* lets you write a function or method
that abstracts away some of the type information about its return value.
This is useful at boundaries between groups of code,
like a library and code that calls into the library.
Instead of returning a value of some specific type,
functions that return an opaque type
don't share the specific type of their return value
with the code that calls the function ---
only the name of a protocol that the value conforms to.

.. _OpaqueTypes_LimitsOfGenerics:

Limitations of Generic Types
----------------------------

.. XXX Frame this more explicitly as the problem we're trying to solve

Suppose you're writing a library that draws ASCII art shapes.
The basic characteristic of an ASCII art shape
is a ``draw()`` function that returns the string representation of that shape,
which you can use as the requirement for the ``Shape`` protocol:

.. testcode:: opaque-result
    :compile: true

    -> protocol Shape {
           func draw() -> String
       }
    ---
    -> struct Triangle: Shape {
          var size: Int
          func draw() -> String {
              var result = [String]()
              for length in 1...size {
                  result.append(String(repeating: "*", count: length))
              }
              return result.joined(separator: "\n")
          }
       }
    -> let smallTriangle = Triangle(size: 3)
    -> print(smallTriangle.draw())
    </ *
    </ **
    </ ***

You could use generics to implement operations like flipping a shape vertically,
as shown in the code below.
However, this approach has a drawback:
it exposes the full chain of transformations as the resulting shape's type.

.. testcode:: opaque-result
    :compile: true

    -> struct FlippedShape<T: Shape>: Shape {
           var shape: T
           func draw() -> String {
               let lines = shape.draw().split(separator: "\n")
               return lines.reversed().joined(separator: "\n")
           }
       }
    -> let flippedTriangle = FlippedShape(shape: smallTriangle)
    -> print(flippedTriangle.draw())
    </ ***
    </ **
    </ *

Using this approach to define a ``JoinedShape<T: Shape, U: Shape>`` structure
that joins two shapes together vertically,
leads to types like ``JoinedShape<FlippedShape<Triangle>, Triangle>``
from joining a flipped triangle with a triangle.
It's easy to image how this nested generic types
can quickly become cumbersome to read and write.

.. testcode:: opaque-result
   :compile: true

   -> struct JoinedShape<T: Shape, U: Shape>: Shape {
         var top: T
         var bottom: U
         func draw() -> String {
             return top.draw() + "\n" + bottom.draw()
         }
      }
   -> let joinedTriangles = JoinedShape(top: smallTriangle, bottom: flippedTriangle)
   -> print(joinedTriangles.draw())
   </ *
   </ **
   </ ***
   </ ***
   </ **
   </ *

Encoding this detailed information about how a shape was created
into the type system also exposes details
that might not be part of the API contract you want to commit to.
You could have made the same shape by joining
a two-by-two triangle with a two-by-two square and a flipped two-by-two triangle,
or by directly drawing the trapezoid.
Wrapper types like ``JoinedShape`` and ``FlippedShape``
shouldn't be visible to users of this library.
Those underlying types don't matter to the library's users ---
only the fact that joining and flipping a shape returns another ``Shape`` value.
However,
you can't use a generic return type to create that kind of abstraction.
The code that calls the function gets to determine
what concrete types are used to fill in
the function's generic parameter types and generic return type,
not the code inside the function's implementation.

.. _OpaqueTypes_LimitsOfExistentials:

Limitations of Protocol Types
-----------------------------

.. OUTLINE

   - Can't infer associated types
   - P can only be used as a generic constraint
   - Efficiency penalty of dispatch through the witness table

   Doesn't reflect the fact that the returned type is always the same,
   meaning you can't build up an array of shapes
   or compare the result of two shape operations for equality.

.. _OpaqueTypes_LimitsOfErasure:

Limitations of Type Erasure
---------------------------

.. XXX Is this discussion actually needed?

.. _OpaqueTypes_Returning:

Returning an Opaque Type
------------------------

You can think of an opaque result type like being the reverse of a generic type.
Generic types let the code that calls a function
pick the type for that function's parameters and return value
in a way that's abstracted away from the function implementation.
For example, the functions in the code below
return a type that depends on their caller:

::

    func max<T>(_ x: T, _ y: T) -> T where T: Comparable { ... }

.. From https://developer.apple.com/documentation/swift/1538951-max

The code that calls ``max(_:_:)`` chooses the values for ``x`` and ``y``,
and the type of those values determines the concrete type of ``T``.
The calling code can use any type you want,
provided the type conforms to the ``Comparable`` protocol.
The code inside the function is written in a general way
so it can handle whatever type the caller picks.
The implementation of ``max(_:_:)`` uses only functionality
that all ``Comparable`` types share.

An opaque result type lets the function implementation
pick the type for the value it returns
in a way that's abstracted away from the code that calls the function.
The functions below return a value
of some type that conforms to the ``Shape`` protocol.
The code inside the function can return any type you want,
as long an that type conforms to ``Shape``,
like the calling code does for a generic function.
The code that calls the function needs to be written in a general way,
like the implementation of a generic function,
so that it can work with any ``Shape`` value.

.. testcode:: opaque-result

    -> func flip(_ shape: Shape) -> any Shape {
           return FlippedShape(shape: shape)
       }
    -> func join(_ top: Shape, _ bottom: Shape) -> any Shape {
           return JoinedShape(top: top, bottom: bottom)
       }
    ---
    -> let opaqueJoinedTriangles = join(smallTriangle, flip(smallTriangle))
    >> print(type(of: opaqueJoinedTriangles))
    << any Shape
    -> print(opaqueJoinedTriangles.draw())
    </ *
    </ **
    </ ***
    </ ***
    </ **
    </ *

The type of ``opaqueJoinedTriangles`` is
some type that conforms to the ``Shape`` protocol.
Both ``opaqueJoinedTriangles`` in this example
and ``joinedTriangles`` in the generics example in :ref:`OpaqueTypes_LimitsOfGenerics` above
have the same value.
The details of the nested generic types
were exposed in the type of ``joinedTriangles``,
but the underlying generic type of ``opaqueJoinedTriangles`` is only visible
inside the implementation of the shape-joining code.
If this code were part of a drawing library,
the code outside the library wouldn't need to understand the generic implementation,
and the code inside the library would maintain the flexibility
to change that implementation in the future
without breaking its clients.

.. XXX talk about the "rules" for ORTs
   - function always returns the same type
   - generic functions have 1:1 mapping between T and ORT
   - type inference for associated types works

.. _OpaqueTypes_DeleteMe:

XXX Delete Me
-------------

.. This heading is here to make code folding easier.
   That way the commented-out bits below have a place to belong
   when viewing this chapter in outline form.


COMPARING OPAQUE RETURN TYPES AND GENERIC PARAMETERS

With a generic, like ``max(_:_:)``,
the code that calls the function chooses a type ``T``
and the code inside the function
interacts with the values of that type
by calling APIs that are defined by the protocols
that it's known to adopt (in this case, ``Comparable``).
In contrast,
with an opaque return type,
those roles are reversed.
The code inside the function chooses a type
and the code that called the function
interacts with the function's return type
by calling APIs defined by the protocols it adopts.







.. NARRATIVE

   Wrapper types like LazySequence and StretchedShape are an implementation detail.
   You'd prefer not to expose them to clients of the API.
   You could type erase with an AnySequence or AnyShape,
   but then you lose type information.
   For example, there's no way to represent
   "an array of triangles that have been stretched"
   in the type system when you use type erasure.
   On the other hand, opaque result types let you keep (but hide!) type information.
   My array above would be an Array<@_opaqueReturnTypeOf(stretch)>
   and I could add another item to the array
   while maintaining the invariant that it's homogeneous.

   Opaque result types also preserve/infer associated types.
   In the case of a LazyMappedRotatedWhateverSequence,
   if you used type erasure, the associated Element type for AnySequence
   can't be inferred (confirm?)

   SE proposal mentioned performance advantages --
   using existentials implies more runtime overhead for the dynamic dispatch.

.. OUTLINE

   - generics let the caller pick a type that's opaque to the function
   - opaque result types let the function pick a type that's opaque to the caller
   - comparison with other ways to opaque-ify a return type..
   - why not use a protocol as a type? (we don't use the term "existential" in TSPL)
     * that loses type information
     * associated types can't be filled in
     * performance hit due to dynamic dispatch (through the witness table)
   - why not use simple type erasure like AnyCollection?
     * loses type information (obviously)
     * the return type is consistent, but you can't prove it
       ... meaning you can't build up an array of results
       ... or add results together
     * perf is better -- assuming the wrapper is inlinable, it's a zero cost abstraction
       (TR: confirm)
   - this opacity is useful at API boundaries
     * in your own code, you can hide your choice of underlying type
       from code outside a specific area
       and prevent other code from relying on it
       which maintains flexilibity to change that type in the future
     * in a library, you can hide the underlying type from clients,
       again maintaining flexability
       and abstracting away implementation details that aren't part of the API contract

   Is it worth describing the difference between value- and type-level abstraction
   like Joe Groff did in his forum post?
   
.. CODE BITS

   protocol Container {
      associatedtype Item
      mutating func append(_ item: Item)
      var count: Int { get }
      subscript(i: Int) -> Item { get }
   }

   protocol NewContainer {
      subscript(range: Range) -> Container { get } 
   }

.. CODE BITS

   protocol ASCIIArt {
      func draw() -> String
   }

   struct HorizontalLine {
      var length: Int
      func draw() -> String {
         return String(repeating: "*", count: length)
      }
   }
   struct Triangle {
      var size: Int
      func draw() -> String {
         result = ""
         for length in 1..size )
            result += String(repeating: "*", count: length)
         }
      }
   }

   // What type should this function take/return?
   func repeat(art: XXX) -> YYY { }

   // Can't use generics -- a repeated triangle isn't a triangle.
   func repeat<T: ASCIIArt>(art: T) -> T { }

   // Why don't existentials work?
   func repeat(art: ASCIIArt) -> ASCIIArt { }


.. CODE BITS

   protocol ASCIIArt {
       func draw() -> String
   }

   struct HorizontalLine: ASCIIArt {
       var length: Int
       func draw() -> String {
           return String(repeating: "-", count: length) + "\n"
       }
   }

   struct Triangle: ASCIIArt {
       var size: Int
       func draw() -> String {
           var result = ""
           for length in 1...size {
               result += String(repeating: "*", count: length)
               result += "\n"
           }
           return result
       }
   }

   let line = HorizontalLine(length: 6)
   print("Line:")
   print(line.draw())

   let triangle = Triangle(size: 4)
   print("Triangle:")
   print(triangle.draw())

   // -- -- -- -- -- -- -- -- -- --

   do {

   func double(_ drawing: ASCIIArt) -> ASCIIArt {
       return drawing
   }
   let doubleLine = double(line)
   print("Double Line (existential):")
   print(doubleLine.draw())

   }

   // -- -- -- -- -- -- -- -- -- --

   do {

   struct LazyDoubleDrawing: ASCIIArt {
       var drawing: ASCIIArt
       func draw() -> String {
           return String(repeating: drawing.draw(), count: 2)
       }
   }

   // Existential type
   func double(_ drawing: ASCIIArt) -> ASCIIArt {
       return LazyDoubleDrawing(drawing: drawing)
   }
   let doubleLine = double(line)
   print("Double Line (lazy):")
   print(doubleLine.draw())

   }

   // -- -- -- -- -- -- -- -- -- --

   do {

   // Generic argument and return type
   // This only works if the ASCII art can scale itself
   func zoom<T: ASCIIArt>(drawing: T, by scale: Int) -> T {
       return drawing  // FIXME
   }

   }

   // -- -- -- -- -- -- -- -- -- --

   do {

   struct StretchedArt: ASCIIArt { }
   func stretch(drawing: ASCIIArt) -> opaque ASCIIArt { }

   }

