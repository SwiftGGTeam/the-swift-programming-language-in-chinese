Directives
==========

Unlike C or Objective-C, the Swift compiler does not include a preprocessor.
Instead, Swift provides several :newTerm:`directives`,
which allow code to configure certain aspects of compiler and runtime behavior.

Directives begin with the ``#`` character followed by the directive's name.
Despite their lexical similarity,
each directive has its own syntactic rules and occupy separate parts of the grammar,
as described below.

Build Configurations
--------------------

Swift code can be conditionally compiled
based on the evaluation of :newTerm:`build configurations`.
Use build configurations for decisions that can be made **at compile-time**.

.. note::

   Swift build configurations are similar to
   conditional compilation directives in C and Objective-C,
   except with strict limitations to what
   build configuration expressions may include.

A build configuration statement begins with the ``#if`` directive,
followed by a build configuration expression,
and ends with the ``#endif`` directive.
Any statements between the ``#if`` and ``#endif`` directives
will be included in the code
if the provided build configuration expression evaluates to ``true``
at compile-time.

Build configuration expressions can use
the platform-testing functions listed in the table below.

====================  =========================================
Function              Valid Arguments
====================  =========================================
``os()``              ``OSX``, ``iOS``
``arch()``            ``x86_64``, ``arm``, ``arm64``, ``i386``
====================  =========================================

.. note::

   The ``arch(arm)`` build configuration does not return ``true`` for ARM 64 devices.
   The ``arch(i386)`` build configuration returns ``true``
   when code is compiled for the 32–bit iOS simulator.

Build configurations can also use compilation flags,
which can be specified on the command line using ``-D <#flag#>``.

A simple conditional compilation statement takes the following form:

.. syntax-outline::

    #if <#build configuration#>
       <#statements#>
    #else
       <#statements#>
    #endif

You can specify compound build configuration requirements
using the logical ``AND`` (``&&``) and logical ``OR`` (``||``) operators,
as well as the logical negation operator (``!``).
Build configuration statements can specify additional conditional branches
with ``#elseif`` directives.

A complex conditional compilation statement takes the following form:

.. syntax-outline::

   #if <#build configuration#> && !<#build configuration#>
      <#statements#>
   #elseif <#build configuration#>
      <#statements#>
   #else
      <#statements#>
   #endif

.. syntax-grammar::

    Grammar of a build configuration:

    build-configuration-directive --> ``#if`` build-configuration-expression
    build-configuration-directive --> ``#elseif`` build-configuration-expression
    build-configuration-directive --> ``#else``
    build-configuration-directive --> ``#endif``

    build-configuration-expression --> build-configuration-function
    build-configuration-expression --> ``(``-OPT build-configuration-function ``)``-OPT
    build-configuration-expression --> ``!``build-configuration-expression
    build-configuration-expression --> build-configuration-expression ``&&`` build-configuration-expression
    build-configuration-expression --> build-configuration-expression ``||`` build-configuration-expression
    build-configuration-expression --> boolean-literal

    build-configuration-function --> ``os(`` operating-system ``)``
    operating-system --> ``OSX`` | ``iOS``

    build-configuration-function --> ``arch(`` architecture ``)``
    architecture --> ``x86_64`` | ``arm`` | ``arm64`` | ``i386``

Availability Checks
-------------------

Swift code can use the availability of APIs as a condition in control flow statements.
This allows a single app to be deployed to different platforms
and different versions of the same platform.
Use availability checks to determine whether an API is available **at run-time**.

An availability check takes the place of a condition in control flow statements.
An availability check starts with the ``#available`` directive,
followed by a comma-delimited list of platform arguments.
Each platform argument consists of one of platform names listed below,
followed by corresponding version number.
You can also use an asterisk (``*``) to indicate the
availability of the declaration on all of the platform names listed above.

*Platform Names*:

* ``iOS``
* ``iOSApplicationExtension``
* ``OSX``
* ``OSXApplicationExtension``

.. note::

   The platform arguments in an ``#available`` directive
   are similar to those used by an ``@available`` attribute,
   as described in :ref:`Attributes_DeclarationAttributes`.

An availability check takes the following form:

.. syntax-outline::

    if #available(<#platform name#> <#version#>, <#...#>) {

    }

Availability checks can be used in place of a condition in a control flow statement,
such as an ``if``, ``guard``, or ``while`` statement.

For example,
the ``requestWhenInUseAuthorization`` method is only available
to instances of ``CLLocationManager``
starting in iOS 8.0 and OS X 10.10.
An availability check can used as part of a ``guard`` statement at runtime
to return early if the current platform does not satisfy those requirements.

.. testcode::
   :compile: true

   >> import Foundation
   >> import CoreFoundation
   -> let locationManager = CLLocationManager()
      guard #available(iOS 8.0, OSX 10.10, *) else { return }
      locationManager.requestWhenInUseAuthorization()

.. syntax-grammar::

    Grammar of an availability check directive:

    availability-check-directive --> ``#available`` availability-argument-clause-OPT
    availability-argument-clause --> ``(`` availability-arguments ``)``
    availability-argument --> platform floating-point-literal
    availability-argument --> ``*``

    platform --> ``iOS`` | ``iOSApplicationExtension``
    platform --> ``OSX`` | ``OSXApplicationExtension``

Line Control
------------

As described in :ref:`Expressions_LiteralExpression`,
``__FILE__`` expands to a ``String`` literal
with the name of the current file,
and ``__LINE__`` expands to an ``Int`` literal
with the current line number on which it appears.

The ``#line`` directive changes the values of ``__FILE__`` and ``__LINE__``
to designated values.

.. testcode:: lineControlDirective

   -> #line 42 "abc.swift"
   -> var file = __FILE__ // "abc.swift"
   -> var line = __LINE__ // 44

A line control directive statement takes the following form:

.. syntax-outline::

   #line <#line number#> <#filename#>

.. syntax-grammar::

    Grammar of a line control directive

    line-control-directive --> ``#line``
    line-control-directive --> ``#line`` integer-literal string-literal
