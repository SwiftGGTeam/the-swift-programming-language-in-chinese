Memory Management
=================

Swift uses :newTerm:`Automatic Reference Counting` (known as ARC)
to track and manage your app's memory usage.
In the vast majority of cases, this means that memory management “just works” in Swift,
and you do not need to think about memory management yourself.
ARC keeps track of the memory being used by your app,
and automatically frees up the memory used by class instances
when those instances are no longer needed.

However, there are a few cases in which ARC requires a little more information
about the relationships between parts of your code
in order to manage memory for you.
This chapter describes those situations,
and shows how to make it easy for ARC to manage all of your app's memory.

How ARC Works
-------------

Before considering the relationships between classes in your code,
it is useful to understand how ARC manages memory behind the scenes.
This section introduces the concept of :newTerm:`reference counting`,
and illustrates how ARC takes care of reference counting for you.

Every time you create a new instance of a class,
Swift allocates a chunk of memory to store information about that instance.
This memory holds information about the type of the instance,
together with the values of any stored properties associated with that instance.

Additionally, when an instance is no longer needed,
Swift frees up the memory used by that instance
so that the memory can be used for other purposes instead.
This makes sure that class instances do not hang around in memory
when they are no longer needed.

In order to manage this process for you,
ARC needs to keep track of whether an instance is still being used.
(If ARC were to destroy an instance that was still in use,
it would no longer be possible to access that instance's properties,
or call that instance's methods.
Indeed, if you tried to access the instance, your app would most likely crash.)

To make sure that instances don't disappear while they are still needed,
ARC keeps track of how many properties, constants, and variables
are currently referring to each class instance.
ARC will not destroy an instance
as long as there is at least one active reference to that instance somewhere in your code.

To make this possible,
whenever you assign a class instance to a property, constant, or variable,
that property, constant, or variable makes a :newTerm:`strong reference` to the instance.
The reference is called a “strong“ reference because
it keeps a firm hold on that instance,
and does not allow it to be destroyed for as long as that strong reference remains.

ARC In Action
~~~~~~~~~~~~~

Here's an example of how Automatic Reference Counting works.
This example starts by defining a simple class called ``Person``,
which defines a stored constant property called ``name``:

.. testcode:: howARCWorks

   -> class Person {
         let name: String
         init(name: String) {
            self.name = name
            println("\(name) is being initialized")
         }
         deinit {
            println("\(name) is being deinitialized")
         }
      }

The ``Person`` class has an initializer that sets the instance's ``name`` property
and prints a message to indicate that initialization is underway.
The ``Person`` class also has a deinitializer
that prints a message when an instance of the class is destroyed.

The next code snipped defines three variables of type ``Person?``,
which will be used below to set up
multiple references to a new ``Person`` instance below.
Because these variables are of an optional type (``Person?``, not ``Person``),
they are automatically initialized with a value of ``nil``,
and do not currently reference a ``Person`` instance.

.. testcode:: howARCWorks

   -> var reference1: Person?
   << // reference1 : Person? = <unprintable value>
   -> var reference2: Person?
   << // reference2 : Person? = <unprintable value>
   -> var reference3: Person?
   << // reference3 : Person? = <unprintable value>

You can now create a new ``Person`` instance,
and assign it to one of these three variables:

.. testcode:: howARCWorks

   -> reference1 = Person(name: "John Appleseed")
   <- John Appleseed is being initialized

Note that the message ``"John Appleseed is being initialized"`` was printed
at the point that you called the ``Person`` class's initializer.

There is now a strong reference from ``reference1`` to the new ``Person`` instance.
Because there is at least one strong reference,
ARC makes sure that this ``Person`` is kept in memory, and is not destroyed.

If you assign the same ``Person`` instance to two more variables,
two more strong references to that instance will be established:

.. testcode:: howARCWorks

   -> reference2 = reference1
   -> reference3 = reference1

There are now *three* strong references to this single ``Person`` instance.

If you break two of these strong references (including the original reference)
by assigning ``nil`` to two of the variables,
a single strong reference will still remain,
and the ``Person`` instance will not be destroyed:

.. testcode:: howARCWorks

   -> reference1 = nil
   -> reference2 = nil

ARC will not destroy the ``Person`` instance until
the third and final strong reference is broken,
at which point it is clear that you are no longer using the ``Person`` instance:

.. testcode:: howARCWorks

   -> reference3 = nil
   <- John Appleseed is being deinitialized

.. note::

   Reference counting only applies to instances of classes.
   Structures and enumerations are value types, not reference types,
   and are not stored and passed by reference.

.. _MemoryManagement_WeakAndUnownedProperties:

Weak and Unowned Properties
---------------------------

.. write-me::

.. _MemoryManagement_ImplicitlyUnwrappedOptionalProperties:

Implicitly Unwrapped Optional Properties
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Implicitly unwrapped optional properties are useful when
an instance property cannot be set until initialization is complete,
but is guaranteed to always exist thereafter.

In these kinds of cases,
you could define the instance property as a normal optional,
but this would require you to unwrap the property's value when it is used.
Using an implicitly unwrapped optional instead
means that you do not need to unwrap the optional value yourself each time it is used.

.. note::

   You should only define a property as an implicitly unwrapped optional
   if you are sure that that property will *always* contain
   a non-``nil`` value once it is initialized.
   If a property has the potential to be ``nil`` at some future point,
   it should always be declared as a true optional,
   and not as an implicitly unwrapped optional.

The following example defines two classes, ``Country`` and ``City``,
each of which stores an instance of the other class as a property:

.. testcode:: implicitlyUnwrappedOptionals
   :compile: true

   -> class Country {
         var name: String
         var capitalCity: City!
         init(name: String, capitalName: String) {
            self.name = name
            self.capitalCity = City(name: capitalName, country: self)
         }
      }
   ---
   -> class City {
         var name: String
         unowned var country: Country
         init(name: String, country: Country) {
            self.name = name
            self.country = country
         }
      }
   ---
   -> var country = Country(name: "Canada", capitalName: "Ottawa")
   -> println("\(country.name)'s capital city is called \(country.capitalCity.name)")
   <- Canada's capital city is called Ottawa

In this data model, every country has a capital city, and every city belongs to a country.
To represent this, the ``Country`` class has a ``capitalCity`` property,
and the ``City`` class has a ``country`` property.

To set up this interdependency,
the initializer for ``City`` takes a ``Country`` instance,
and stores it as a reference to the city's country.
However, the initializer for ``Country`` cannot pass ``self`` to the ``City`` initializer
until the new ``Country`` instance has been fully initialized.

To cope with this requirement,
the ``capitalCity`` property is declared as an implicitly unwrapped optional property.
This means that it has a default value of ``nil``, like any other optional
(see :ref:`TheBasics_ImplicitlyUnwrappedOptionals`.)

Because of this default ``nil`` value for ``capitalCity``,
a new ``Country`` instance is considered fully initialized
as soon as it sets its ``name`` property within its initializer.
This means that the initializer can start to reference and pass around
the implicit ``self`` property as soon as ``name`` has been set.
This enables it to pass ``self`` as one of the parameters for
the ``City`` initializer when setting its own ``capitalCity`` property.

In the example above, the use of an implicitly unwrapped optional
means that all of the two-phase initializer requirements described above are satisfied,
and the property can be used and accessed like a non-optional value
once initialization is complete.

.. note::

   The ``City`` class's ``country`` property is defined as an *unowned* property,
   indicated by the ``unowned`` keyword.
   This avoids a strong reference cycle between a ``Country`` instance
   and the ``City`` instance stored in its ``capitalCity`` property.

.. _MemoryManagement_AvoidingReferenceCyclesInClosures:

Avoiding Reference Cycles in Closures
-------------------------------------

.. write-me::

.. TODO: you have to write "self." for property references in an explicit closure expression,
   since "self" will be captured, not the property (as per rdar://16193162)
   we don't do this for autoclosures, however -
   see the commits comments from r14676 for the reasons why

.. TODO: <rdar://problem/16193162> Require specifying self for locations in code
   where strong reference cycles are likely
   This requires that property references have an explicit "self." qualifier
   when in an explicit closure expression, since self will be captured, not the property.
   We don't do the same for autoclosures.
   The logic here is that autoclosures can't practically be used in capturing situations anyway,
   since that would be extremely surprising to clients.
   Further, forcing a syntactic requirement in an autoclosure context
   would defeat the whole point of autoclosures: make them implicit.

.. FIXME: To avoid reference cycles when a property closure references self or a property of self,
   you should use the same workaround as in Obj-C –
   that is, to declare a weak (or unowned) local variable, and capture that instead.
   There are proposals for a better solution in /swift/docs/weak.rst,
   but they are yet to be implemented.
   The Radar for their implementation is rdar://15046325.


.. TODO: weak things are banned from being declared as constants,
   because the whole point of weak is that it can change at runtime.
   If that isn't the case, it should be unowned, not weak.