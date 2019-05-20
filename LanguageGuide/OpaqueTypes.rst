Opaque Types
============

An *opaque type* lets you write a function or method
that abstracts away some of the type information about its return value.
This is useful at boundaries between groups of code,
like a library and code that calls into the library.
Functions that return an opaque type
specify a protocol that their return value conforms to,
instead of providing a specific named return type.

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
However, there's an important limitation to this approach:
It exposes the full chain of transformations as the resulting shape's type.

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
that aren't meant to be part of the ASCII art framework's public interface,
but leak out because of the nested generic types.
You could have made the same shape by joining two triangles and a square,
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

.. _OpaqueTypes_Returning:

Returning an Opaque Type
------------------------

You can think of an opaque type like being the reverse of a generic type.
Generic types let the code that calls a function
pick the type for that function's parameters and return value
in a way that's abstracted away from the function implementation.
For example, the function in the code below
returns a type that depends on its caller:

::

    func max<T>(_ x: T, _ y: T) -> T where T: Comparable { ... }

.. From https://developer.apple.com/documentation/swift/1538951-max
   Not test code because it won't actually compile
   and there's nothing to meaningfully test.

The code that calls ``max(_:_:)`` chooses the values for ``x`` and ``y``,
and the type of those values determines the concrete type of ``T``.
The calling code can use any type you want,
provided the type conforms to the ``Comparable`` protocol.
The code inside the function is written in a general way
so it can handle whatever type the caller picks.
The implementation of ``max(_:_:)`` uses only functionality
that all ``Comparable`` types share.

Those roles are reversed for a function whose return type is opaque.
An opaque type lets the function implementation
pick the type for the value it returns
in a way that's abstracted away from the code that calls the function.
For example, the function below returns a trapezoid
without exposing the underlying type of that shape.

.. testcode:: opaque-result
    :compile: true

    -> struct Square: Shape {
           var size: Int
           func draw() -> String {
               let line = String(repeating: "*", count: size)
               let result = Array<String>(repeating: line, count: size)
               return result.joined(separator: "\n")
           }
       }
    ---
    -> func makeTrapezoid() -> some Shape {
           let top = Triangle(size: 2)
           let middle = Square(size: 2)
           let bottom = FlippedShape(shape: top)
           let trapezoid = JoinedShape(
               top: top,
               bottom: JoinedShape(top: middle, bottom: bottom)
           )
           return trapezoid
       }
    -> let trapezoid = makeTrapezoid()
    -> print(trapezoid.draw())
    </ *
    </ **
    </ **
    </ **
    </ **
    </ *

The ``makeTrapezoid()`` function above
returns a value that conforms to the ``Shape`` protocol
without making the specific type part of its API.
This implementation happens to use two triangles and a square,
but the function could be rewritten to draw a trapezoid directly
without changing its return type.

You can also combine opaque return types with generics.
The functions below return a value
of some type that conforms to the ``Shape`` protocol.
The code inside the function can return any type you want,
as long an that type conforms to ``Shape``,
like the calling code does for a generic function.
The code that calls the function needs to be written in a general way,
like the implementation of a generic function,
so that it can work with any ``Shape`` value.

.. testcode:: opaque-result
    :compile: true

    -> func flip<T: Shape>(_ shape: T) -> some Shape {
           return FlippedShape(shape: shape)
       }
    -> func join<T: Shape, U: Shape>(_ top: T, _ bottom: U) -> some Shape {
           JoinedShape(top: top, bottom: bottom)
       }
    ---
    -> let opaqueJoinedTriangles = join(smallTriangle, flip(smallTriangle))
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

If function that returns an opaque type
returns from multiple places,
all of the possible return values must have the same type.
For a generic function,
that return type can use the function's generic type parameters,
but it must still be a single type.
For example,
here's an *invalid* version of the shape-flipping function
that includes a special case for squares:

.. testcode:: opaque-result-err
    :compile: true

    >> protocol Shape {
    >>     func draw() -> String
    >> }
    >> struct Square: Shape {
    >>     func draw() -> String { return "#" }  // stub implementation
    >> }
    >> struct FlippedShape: Shape {
    >>     func draw() -> String { return "^^^" }  // stub implementation
    >> }
    -> func invalidFlip<T: Shape>(_ shape: T) -> some Shape {
           if shape is Square {
               return shape // Error: return types don't match
           }
           return FlippedShape(shape: shape) // Error: return types don't match
       }

If you call this function with a ``Square``, it returns a ``Square``;
otherwise, it returns a ``FlippedShape``.
This violates the requirement to return values of only one type.
In contrast,
here's an example of a function that incorporates its generic type parameter
into the underlying type of the value it returns:

.. testcode:: opaque-result
   :compile: true

   -> func `repeat`<T: Shape>(shape: T, count: Int) -> some Collection {
          return Array<T>(repeating: shape, count: count)
      }

In this case,
the underlying type of the return value
varies depending on what ``T`` is:
Whatever shape is passed it,
``repeat(shape:count:)`` creates and returns an array of that shape.
Nevertheless,
the return value always has the same underlying, namely ``[T]``,
so it follows the requirement that functions with opaque return types
must return values of only a single type.

.. _OpaqueTypes_LimitsOfExistentials:

Differences Between Opaque Types and Protocol Types
---------------------------------------------------

An opaque return type looks very similar
to using a protocol type as the return type,
but the behavior has a few important differences.
For example,
here's a version of ``flip(_:)`` that returns a protocol type
instead of using an opaque return type:

.. testcode:: opaque-result
    :compile: true

    -> func protoFlip<T: Shape>(_ shape: T) -> Shape {
          if shape is Square {
             return shape
          }

          return FlippedShape(shape: shape)
       }

This version of ``protoFlip(_:)`` returns either
an instance of ``Square`` or an instance of ``FlippedShape``,
hiding the exact type from its called.
The previous version that has an opaque return type
is guaranteed my the compiler to always return the same type,
even though that type is hidden as ``some Shape``.

.. XXX Fix up the para above
   Now we show an opanque return type that no-ops hline too
   That wasn't the point anyhow,
   the point is that existentials don't preserve the underlying type's identity

The lack of type information from ``protoFlip(_:)`` means that
you can't guarantee that two flipped shapes
returned by this function are comparable.
In fact, you can't even compare the same shape to itself
after flipping it twice, separately:

.. testcode:: opaque-result-err
    :compile: true

    -> let protoFlippedTriangle = protoFlip(smallTriangle)
    -> let sameThing = protoFlip(smallTriangle)
    -> protoFlippedTriangle == sameThing  // Error

When a function returns a protocol type,
information about the underlying type isn't preserved.
The design of protocol types is that it can hold any value
of any type that conforms to the protocol.
Keeping track of the underlying type
would prevent you from storing values of different types.
For example,
if you create a variable whose type is ``Collection``,
it can store an array or a dictionary or a set,
or any custom collection type that you define.
This is in contrast to a function that returns ``some Colloction``,
which has to to return a value of the same collection type
every time the function is called.
In brief,
protocol types give you more flexibility about what data they can store,
and opaque types let you make stronger guarantees about the data.

Because opaque types preserve the identity of the underlying type,
Swift can infer associated types,
which lets you use an opaque return value
in places where a protocol type can't be used as a return value.
For example,
here's a version of the ``Container`` protocol from :doc:`./Generics`:

.. testcode:: opaque-result, opaque-result-existential-error
    :compile: true

    -> protocol Container {
           associatedtype Item
           var count: Int { get }
           subscript(i: Int) -> Item { get }
       }
    -> extension Array: Container { }

You can't use ``Container`` as the return type of a function
because it has associated types.
You also can't use it as constraint a generic return type
because there isn't enough information outside the function body
to infer the generic type.

.. testcode:: opaque-result-existential-error
    :compile: true

    // Error: Protocol with associated types can't be used as a return type.
    func makeProtocolContainer<T>(item: T) -> Container {
        return [item]
    }

    // Error: Not enough information to infer C.
    func makeProtocolContainer<T, C: Container>(item: T) -> C {
        return [item]
    }

In contrast, you can use ``some Container`` as a return type.

.. testcode:: opaque-result
    :compile: true

    -> func makeOpaqueContainer<T>(item: T) -> some Container {
           return [item]
       }
    -> let opaqueContainer = makeOpaqueContainer(item: 12)
    -> let twelve = opaqueContainer[0]
    -> print(type(of: twelve))
    <- Int

The type of ``twelve`` is inferred to be ``Int``,
which illustrates the fact that type inference works with opaque types.
In the implementation of ``makeOpaqueContainer(item:)``,
the underlying type of the opaque container is ``[T]``.
In this case, ``T`` is ``Int``,
so the return value is an array of integers
and the ``Item`` associated type is inferred to be ``Int``.
The subscript on ``Container`` returns ``Item``,
which means that the type of ``twelve`` is also inferred to be ``Int``.

.. XXX OUTLINE

   - Efficiency penalty of dispatch through the witness table
   - "Protocols don't conform to themselves"

.. _OpaqueTypes_DeleteMe:

XXX Delete Me
-------------

.. This heading is here to make code folding easier.
   That way the commented-out bits below have a place to belong
   when viewing this chapter in outline form.

.. NARRATIVE

   Wrapper types like LazySequence and StretchedShape are an implementation detail.
   You'd prefer not to expose them to clients of the API.
   You could type erase with an AnySequence or AnyShape,
   but then you lose type information.
   For example, there's no way to represent
   "an array of triangles that have been stretched"
   in the type system when you use type erasure.
   On the other hand, opaque types let you keep (but hide!) type information.
   My array above would be an Array<@_opaqueReturnTypeOf(stretch)>
   and I could add another item to the array
   while maintaining the invariant that it's homogeneous.

   Opaque types also preserve/infer associated types.
   In the case of a LazyMappedRotatedWhateverSequence,
   if you used type erasure, the associated Element type for AnySequence
   can't be inferred (confirm?)

   SE proposal mentioned performance advantages --
   using existentials implies more runtime overhead for the dynamic dispatch.

.. OUTLINE

   - generics let the caller pick a type that's opaque to the function
   - opaque types let the function pick a type that's opaque to the caller
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

