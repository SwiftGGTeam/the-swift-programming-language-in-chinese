Choosing Between Classes and Structures
=======================================

Everything a structure can do, a class can do and more,
which raises the question of
when to use one and
when to use the other.

.. _ChoosingBetweenClassesAndStructures_WhenToUseAClass:

When to Use a Class
-------------------

In Swift,
you don't need a class
as often as you'd expect,
but classes still have their place.

There are two main reasons
you should use a class in Swift.
The first is when
you want to
access the same instance of a type
in multiple places.
The second is when
a framework expects you
to use classes.

.. _ChoosingBetweenClassesAndStructures_UsingClassesForStableIdentity:

Using Classes for Stable Identity
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



.. _ChoosingBetweenClassesAndStructures_WorkingWithClassesFromFrameworks:

Working with Classes from Frameworks
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~




.. when framework gives you a class and you are expected to subclass it... don't fight the frameworks (Cocoa programmers)

.. things with identity... connection to some external system (e.g. sinks, file handlers, network sockets, etc.)

.. delegate object (has identity and will be passed around but different things need to refer to same instance of object)

.. "a thing that has identity" a thing where you want the same instance of a type

.. ToDo: why value types make it easier to reason about code (mutation at a distance & local reasoning)

.. constants make it easier to reason about your code because it can't change
.. using value type you don't have to worry about where far away changes might be coming from

.. these are some things you might make classes in other languages

.. in Swift, you don't need a class as often as you'd expect

.. when copying doesn't make sense 

.. when there really is just one of something














