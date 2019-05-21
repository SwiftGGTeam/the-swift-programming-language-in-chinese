Opaque Types
============

An *opaque type* lets you write a function or method
that abstracts away some of the type information about its return value.
This is useful at boundaries between groups of code,
like a library and code that calls into the library.
Functions that return an opaque type
specify a protocol that their return value conforms to,
instead of providing a specific named return type,
and the type itself can be private within the library.

.. _OpaqueTypes_LimitsOfGenerics:

Limitations of Generic Types
----------------------------

Suppose you're writing a library that draws ASCII art shapes.
The basic characteristic of an ASCII art shape
is a ``draw()`` function that returns the string representation of that shape,
which you can use as the requirement for the ``Shape`` protocol:

.. testcode:: opaque-result, opaque-result-existential-error
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
The flipped result exposes exactly what generics were used to create it.

.. testcode:: opaque-result, opaque-result-existential-error
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
that joins two shapes together vertically like the code below shows,
leads to types like ``JoinedShape<FlippedShape<Triangle>, Triangle>``
from joining a flipped triangle with another triangle.

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

Exposing this detailed information about how a shape was created
in the shape's type also exposes
that aren't meant to be part of the ASCII art framework's public interface,
but leak out because of the nested generic types.
You could have built up the same shape in a variety of ways,
and other code that uses the shape shouldn't have to care
about the list of transformations that were involved.
Wrapper types like ``JoinedShape`` and ``FlippedShape``
shouldn't be visible to users of this ASCII art library.
Those underlying types don't matter to the library's users ---
only the fact that joining and flipping a shape returns another ``Shape`` value.
However,
generic type parameters and generic return types
can't create that kind of abstraction.
The code that calls the function,
not the code inside the function's body,
determines what concrete types are used to fill in
the function's generic parameter types and generic return type.

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
declares its return type as ``some Shape``,
which means that the function
returns a value of some given type that conforms to the ``Shape`` protocol,
but without specifying any particular concrete type.
Writing ``makeTrapezoid()`` this way lets it express
the fundamental aspect of its public interface ---
the value it returns is a shape ---
without making the specific types that the shape made up from
part of its public interface.
This implementation happens to use two triangles and a square,
but the function could be rewritten to draw a trapezoid
in a variety of other ways
without changing its return type.

This highlights the way that opaque return types
are like the reverse of a generic type.
The code inside ``makeTrapezoid()`` can return any type it needs to,
as long an that type conforms to the ``Shape`` protocol,
like the calling code does for a generic function.
The code that calls the function needs to be written in a general way,
like the implementation of a generic function,
so that it can work with any ``Shape`` value
that's returned by ``makeTrapezoid()``.

You can also combine opaque return types with generics.
The functions below both return a value
of some type that conforms to the ``Shape`` protocol.

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

The value of ``opaqueJoinedTriangles`` in this example
is the same as ``joinedTriangles`` in the generics example
in :ref:`OpaqueTypes_LimitsOfGenerics` above.
However, unlike that value,
``flip(_:)`` and ``join(_:_:)`` wrap the underlying types
that generic shape operations
in an opaque return type,
which prevents those types from being visible.
Both functions are generic because the types they rely on are generic,
and the type parameters to the function
pass along the type information needed by ``FlippedShape`` and ``JoinedShape``.

If a function that returns an opaque type
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
    >> struct FlippedShape<T: Shape>: Shape {
    >>     var shape: T
    >>     func draw() -> String { return "#" } // stub implementation
    >> }
    -> func invalidFlip<T: Shape>(_ shape: T) -> some Shape {
           if shape is Square {
               return shape // Error: return types don't match
           }
           return FlippedShape(shape: shape) // Error: return types don't match
       }
    !! /tmp/swifttest.swift:11:6: error: function declares an opaque return type, but the return statements in its body do not have matching underlying types
    !! func invalidFlip<T: Shape>(_ shape: T) -> some Shape {
    !! ^
    !! /tmp/swifttest.swift:13:16: note: return statement has underlying type 'T'
    !! return shape // Error: return types don't match
    !! ^
    !! /tmp/swifttest.swift:15:12: note: return statement has underlying type 'FlippedShape<T>'
    !! return FlippedShape(shape: shape) // Error: return types don't match
    !! ^

If you call this function with a ``Square``, it returns a ``Square``;
otherwise, it returns a ``FlippedShape``.
This violates the requirement to return values of only one type
and makes ``invalidFlip(_:)`` invalid code.
One way to fix ``invalidFlip(_:)`` is to move the special case for squares
into the implementation of ``FlippedShape``,
which lets this function always return a ``FlippedShape`` value.

The requirement to always return a single type
doesn't prevent you from using generics in an opaque return type.
Here's an example of a function that incorporates its type parameter
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
the return value always has the same underlying type of ``[T]``,
so it follows the requirement that functions with opaque return types
must return values of only a single type.

.. _OpaqueTypes_LimitsOfExistentials:

Differences Between Opaque Types and Protocol Types
---------------------------------------------------

Returning an opaque type looks very similar
to using a protocol type as the return type of a function,
but these two kinds of return type differ in
whether they preserve type identity.
An opaque types refer to some specific type,
even though you can't tell which type;
a protocol type can refer to any type that conform to the protocol.
Generally speaking,
protocol types give you more flexibility
about the underlying types of the values they store,
and opaque types let you make stronger guarantees
about those underlying types.

For example,
here's a version of ``flip(_:)`` that returns a protocol type
instead of using an opaque return type:

.. testcode:: opaque-result, opaque-result-existential-error
    :compile: true

    -> func protoFlip<T: Shape>(_ shape: T) -> Shape {
          return FlippedShape(shape: shape)
       }

This version of ``protoFlip(_:)``
behaves the same as ``flip(_:)``,
and it always returns a value of the same type.
Unlike ``flip(_:)``,
the value that ``protoFlip(_:)`` returns isn't required
to always have the same type,
it just has to conform to the ``Shape`` protocol.
The lack of type information from ``protoFlip(_:)`` means that
many operations that depend on type information
aren't available on the returned value.
You can't guarantee that two flipped shapes
returned by this function are comparable,
because they might have completely different types.
In fact, you can't even compare the same shape to itself:

.. testcode:: opaque-result-existential-error
    :compile: true

    -> let protoFlippedTriangle = protoFlip(smallTriangle)
    -> let sameThing = protoFlip(smallTriangle)
    -> protoFlippedTriangle == sameThing  // Error

The same type is inferred for both ``protoFlippedTriangle`` and ``sameThing``
--- they're both ``Shape`` values.
But there's no guarantee that their underlying types are the same,
and the information about those underlying types has been lost.

.. XXX This doesn't fail properly -- Shape isn't Equatable
   Putting them in an array wouldn't fail either
   because you'd just make an array of [Shape]

Because opaque types do preserve the identity of the underlying type,
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
because that protocol has an associated type.
You also can't use it as constraint a generic return type
because there isn't enough information outside the function body
to infer what the generic type needs to be.

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

In contrast, you can use the opaque type``some Container`` as a return type:

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






.. XXX

    -> func protoFlip<T: Shape>(_ shape: T) -> Shape {
          if shape is Square {
             return shape
          }

          return FlippedShape(shape: shape)
       }

This version of ``protoFlip(_:)`` returns either
an instance of ``Square`` or an instance of ``FlippedShape``,
depending on whether a ``Square`` was passed in.

You can combine the flexibility of returning a value of protocol type
with the API-boundary enforcement of opaque types
by using type erasure
like the Swift standard library uses in the
`AnySequence <//apple_ref/fake/AnySequence`_ type.
