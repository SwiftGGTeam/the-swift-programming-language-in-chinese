Opaque Result Types
===================

.. NARRATIVE

   Wrapper types like LazySequence and StretchedShape are an implementation detail.
   You'd prefer not to expose them to clients of the API.
   You could type erase with an AnySequence or AnyShape,
   but then you lose type information.
   For example, there's no way to represent
   "an array of triangles that have been stretched"
   in the type system when you use type erasure.
   On the other hand, opaque result types let you keep (but hide!) type information.
   My array above would be an Array<__opaqueResult(of: stretch)>
   and I could add another item to the array
   while maintaining the invariant that it's homogeneous.

   Opaque result types also preserve/infer associated types.
   In the case of a LazyMappedRotatedWhateverSequence,
   if you used type erasure, the associated Element type for AnySequence
   can't be inferred (confirm?)

   SE proposal mentioned performance advantages --
   using existentials implies more runtime overhead for the dynamic dispatch.

::

   protocol Container {
      associatedtype Item
      mutating func append(_ item: Item)
      var count: Int { get }
      subscript(i: Int) -> Item { get }
   }

   protocol NewContainer {
      subscript(range: Range) -> Container { get } 
   }

::

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


:: 

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
