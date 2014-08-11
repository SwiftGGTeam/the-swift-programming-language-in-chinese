> 翻译：[成都老码团队](http://weibo.com/u/5241713117)  
> 校对：[成都老码团队](http://weibo.com/u/5241713117)

# Swift 版本历史记录

---

本页内容包括：

-   [XCode6 Beta5 Swift语法文档更新](#xcode6_beta5)
-   [XCode6 Beta4 Swift语法文档更新](#xcode6_beta4)
-   XCode6下载: [老码云盘下载](http://pan.baidu.com/disk/home#from=share_pan_logo&path=%252F%25E8%2580%2581%25E7%25A0%2581%25E4%25BA%2591%25E7%259B%2598-XCode6%252FXCode6-Beta5)

以下部分是针对XCode6每一次Beta版本直至正式版发布，Swift语法部分的更新归类


<a name="xcode6_beta5"></a>
# XCode6 Beta5中Swift语法更新

<table class="graybox" border="0" cellspacing="0" cellpadding="5">
    <caption class="tablecaption"></caption>
    <thead>
        <tr>
            <th scope="col" class="TableHeading_TableRow_TableCell"><p class="para">
  Date
</p></th>
            <th scope="col" class="TableHeading_TableRow_TableCell"><p class="para">
  Notes
</p></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td scope="row"><p class="para">
  2014-08-04
</p></td>
            <td><ul class="list-bullet">
  <li class="item"><p class="para">
  <span class="x-name"><a href="TheBasics.html#//apple_ref/doc/uid/TP40014097-CH5-XID_478" data-id="//apple_ref/doc/uid/TP40014097-CH5-XID_478">Optionals</a></span> no longer implicitly evaluate to <code class="code-voice">true</code> when they have a value and <code class="code-voice">false</code> when they do not, to avoid confusion when working with optional <code class="code-voice">Bool</code> values. Instead, make an explicit check against <code class="code-voice">nil</code> with the <code class="code-voice">==</code> or <code class="code-voice">!=</code> operators to find out if an optional contains a value.
</p>
</li><li class="item"><p class="para">
  Swift now has a <span class="x-name"><a href="BasicOperators.html#//apple_ref/doc/uid/TP40014097-CH6-XID_124" data-id="//apple_ref/doc/uid/TP40014097-CH6-XID_124">Nil Coalescing Operator</a></span> (<code class="code-voice">a ?? b</code>), which unwraps an optional’s value if it exists, or returns a default value if the optional is <code class="code-voice">nil</code>.
</p>
</li><li class="item"><p class="para">
  Updated and expanded the <span class="x-name"><a href="StringsAndCharacters.html#//apple_ref/doc/uid/TP40014097-CH7-XID_434" data-id="//apple_ref/doc/uid/TP40014097-CH7-XID_434">Comparing Strings</a></span> section to reflect and demonstrate that string and character comparison and prefix / suffix comparison are now based on Unicode canonical equivalence of extended grapheme clusters.
</p>
</li><li class="item"><p class="para">
  You can now try to set a property’s value, assign to a subscript, or call a mutating method or operator through <span class="x-name"><a href="OptionalChaining.html#//apple_ref/doc/uid/TP40014097-CH21-XID_356" data-id="//apple_ref/doc/uid/TP40014097-CH21-XID_356">Optional Chaining</a></span>. The information about <span class="x-name"><a href="OptionalChaining.html#//apple_ref/doc/uid/TP40014097-CH21-XID_360" data-id="//apple_ref/doc/uid/TP40014097-CH21-XID_360">Accessing Properties Through Optional Chaining</a></span> has been updated accordingly, and the examples of checking for method call success in <span class="x-name"><a href="OptionalChaining.html#//apple_ref/doc/uid/TP40014097-CH21-XID_361" data-id="//apple_ref/doc/uid/TP40014097-CH21-XID_361">Calling Methods Through Optional Chaining</a></span> have been expanded to show how to check for property setting success.
</p>
</li><li class="item"><p class="para">
  Added a new section about <span class="x-name"><a href="OptionalChaining.html#//apple_ref/doc/uid/TP40014097-CH21-XID_364" data-id="//apple_ref/doc/uid/TP40014097-CH21-XID_364">Accessing Subscripts of Optional Type</a></span> through optional chaining.
</p>
</li><li class="item"><p class="para">
  Updated the <span class="x-name"><a href="CollectionTypes.html#//apple_ref/doc/uid/TP40014097-CH8-XID_176" data-id="//apple_ref/doc/uid/TP40014097-CH8-XID_176">Accessing and Modifying an Array</a></span> section to note that you can no longer append a single item to an array with the <code class="code-voice">+=</code> operator. Instead, use the <code class="code-voice">append</code> method, or append a single-item array with the <code class="code-voice">+=</code> operator.
</p>
</li><li class="item"><p class="para">
  Added a note that the start value <code class="code-voice">a</code> for the <span class="x-name"><a href="BasicOperators.html#//apple_ref/doc/uid/TP40014097-CH6-XID_126" data-id="//apple_ref/doc/uid/TP40014097-CH6-XID_126">Range Operators</a></span> <code class="code-voice">a...b</code> and <code class="code-voice">a..&lt;b</code> must not be greater than the end value <code class="code-voice">b</code>.
</p>
</li><li class="item"><p class="para">
  Rewrote the <span class="x-name"><a href="Inheritance.html#//apple_ref/doc/uid/TP40014097-CH17-XID_293" data-id="//apple_ref/doc/uid/TP40014097-CH17-XID_293">Inheritance</a></span> chapter to remove its introductory coverage of initializer overrides. This chapter now focuses more on the addition of new functionality in a subclass, and the modification of existing functionality with overrides. The chapter’s example of <span class="x-name"><a href="Inheritance.html#//apple_ref/doc/uid/TP40014097-CH17-XID_301" data-id="//apple_ref/doc/uid/TP40014097-CH17-XID_301">Overriding Property Getters and Setters</a></span> has been rewritten to show how to override a <code class="code-voice">description</code> property. (The examples of modifying an inherited property’s default value in a subclass initializer have been moved to the <span class="x-name"><a href="Initialization.html#//apple_ref/doc/uid/TP40014097-CH18-XID_306" data-id="//apple_ref/doc/uid/TP40014097-CH18-XID_306">Initialization</a></span> chapter.)
</p>
</li><li class="item"><p class="para">
  Updated the <span class="x-name"><a href="Initialization.html#//apple_ref/doc/uid/TP40014097-CH18-XID_331" data-id="//apple_ref/doc/uid/TP40014097-CH18-XID_331">Initializer Inheritance and Overriding</a></span> section to note that overrides of a designated initializer must now be marked with the <code class="code-voice">override</code> modifier.
</p>
</li><li class="item"><p class="para">
  Updated the <span class="x-name"><a href="Initialization.html#//apple_ref/doc/uid/TP40014097-CH18-XID_339" data-id="//apple_ref/doc/uid/TP40014097-CH18-XID_339">Required Initializers</a></span> section to note that the <code class="code-voice">required</code> modifier is now written before every subclass implementation of a required initializer, and that the requirements for required initializers can now be satisfied by automatically inherited initializers.
</p>
</li><li class="item"><p class="para">
  Infix <span class="x-name"><a href="AdvancedOperators.html#//apple_ref/doc/uid/TP40014097-CH27-XID_80" data-id="//apple_ref/doc/uid/TP40014097-CH27-XID_80">Operator Functions</a></span> no longer require the <code class="code-voice">@infix</code> attribute.
</p>
</li><li class="item"><p class="para">
  The <code class="code-voice">@prefix</code> and <code class="code-voice">@postfix</code> attributes for <span class="x-name"><a href="AdvancedOperators.html#//apple_ref/doc/uid/TP40014097-CH27-XID_81" data-id="//apple_ref/doc/uid/TP40014097-CH27-XID_81">Prefix and Postfix Operators</a></span> have been replaced by <code class="code-voice">prefix</code> and <code class="code-voice">postfix</code> declaration modifiers.
</p>
</li><li class="item"><p class="para">
  Added a note about the order in which <span class="x-name"><a href="AdvancedOperators.html#//apple_ref/doc/uid/TP40014097-CH27-XID_81" data-id="//apple_ref/doc/uid/TP40014097-CH27-XID_81">Prefix and Postfix Operators</a></span> are applied when both a prefix and a postfix operator are applied to the same operand.
</p>
</li><li class="item"><p class="para">
  Operator functions for <span class="x-name"><a href="AdvancedOperators.html#//apple_ref/doc/uid/TP40014097-CH27-XID_82" data-id="//apple_ref/doc/uid/TP40014097-CH27-XID_82">Compound Assignment Operators</a></span> no longer use the <code class="code-voice">@assignment</code> attribute when defining the function.
</p>
</li><li class="item"><p class="para">
  The order in which modifiers are specified when defining <span class="x-name"><a href="AdvancedOperators.html#//apple_ref/doc/uid/TP40014097-CH27-XID_85" data-id="//apple_ref/doc/uid/TP40014097-CH27-XID_85">Custom Operators</a></span> has changed. You now write <code class="code-voice">prefix operator</code> rather than <code class="code-voice">operator prefix</code>, for example.
</p>
</li><li class="item"><p class="para">
  Added information about the <code class="code-voice">dynamic</code> declaration modifier in <span class="x-name"><a href="Declarations.html#//apple_ref/doc/uid/TP40014097-CH34-XID_705" data-id="//apple_ref/doc/uid/TP40014097-CH34-XID_705">Declaration Modifiers</a></span>.
</p>
</li><li class="item"><p class="para">
  Added information about how type inference works with <span class="x-name"><a href="LexicalStructure.html#//apple_ref/doc/uid/TP40014097-CH30-XID_886" data-id="//apple_ref/doc/uid/TP40014097-CH30-XID_886">Literals</a></span>.
</p>
</li><li class="item"><p class="para">
  Added more information about <span class="x-name"><a href="Declarations.html#//apple_ref/doc/uid/TP40014097-CH34-XID_597" data-id="//apple_ref/doc/uid/TP40014097-CH34-XID_597">Curried Functions</a></span>.
</p>
</li>
</ul></td>
        </tr>
        <tr>
            <td scope="row"><p class="para">
  2014-07-21
</p></td>
            <td><ul class="list-bullet">
  <li class="item"><p class="para">
  Added a new chapter about <span class="x-name"><a href="AccessControl.html#//apple_ref/doc/uid/TP40014097-CH41-XID_29" data-id="//apple_ref/doc/uid/TP40014097-CH41-XID_29">Access Control</a></span>.
</p>
</li><li class="item"><p class="para">
  Updated the <span class="x-name"><a href="StringsAndCharacters.html#//apple_ref/doc/uid/TP40014097-CH7-XID_413" data-id="//apple_ref/doc/uid/TP40014097-CH7-XID_413">Strings and Characters</a></span> chapter to reflect the fact that Swift’s <code class="code-voice">Character</code> type now represents a single Unicode extended grapheme cluster. Includes a new section on <span class="x-name"><a href="StringsAndCharacters.html#//apple_ref/doc/uid/TP40014097-CH7-XID_431" data-id="//apple_ref/doc/uid/TP40014097-CH7-XID_431">Extended Grapheme Clusters</a></span> and more information about <span class="x-name"><a href="StringsAndCharacters.html#//apple_ref/doc/uid/TP40014097-CH7-XID_428" data-id="//apple_ref/doc/uid/TP40014097-CH7-XID_428">Unicode Scalars</a></span> and <span class="x-name"><a href="StringsAndCharacters.html#//apple_ref/doc/uid/TP40014097-CH7-XID_434" data-id="//apple_ref/doc/uid/TP40014097-CH7-XID_434">Comparing Strings</a></span>.
</p>
</li><li class="item"><p class="para">
  Updated the <span class="x-name"><a href="StringsAndCharacters.html#//apple_ref/doc/uid/TP40014097-CH7-XID_415" data-id="//apple_ref/doc/uid/TP40014097-CH7-XID_415">String Literals</a></span> section to note that Unicode scalars inside string literals are now written as <code class="code-voice">\u{n}</code>, where <code class="code-voice">n</code> is between one and eight hexadecimal digits.
</p>
</li><li class="item"><p class="para">
  The <code class="code-voice">NSString</code> <code class="code-voice">length</code> property is now mapped onto Swift’s native <code class="code-voice">String</code> type as <code class="code-voice">utf16Count</code>, not <code class="code-voice">utf16count</code>.
</p>
</li><li class="item"><p class="para">
  Swift’s native <code class="code-voice">String</code> type no longer has an <code class="code-voice">uppercaseString</code> or <code class="code-voice">lowercaseString</code> property. The corresponding section in <span class="x-name"><a href="StringsAndCharacters.html#//apple_ref/doc/uid/TP40014097-CH7-XID_413" data-id="//apple_ref/doc/uid/TP40014097-CH7-XID_413">Strings and Characters</a></span> has been removed, and various code examples have been updated.
</p>
</li><li class="item"><p class="para">
  Added a new section about <span class="x-name"><a href="Initialization.html#//apple_ref/doc/uid/TP40014097-CH18-XID_315" data-id="//apple_ref/doc/uid/TP40014097-CH18-XID_315">Initializer Parameters Without External Names</a></span>.
</p>
</li><li class="item"><p class="para">
  Added a new section about <span class="x-name"><a href="Initialization.html#//apple_ref/doc/uid/TP40014097-CH18-XID_339" data-id="//apple_ref/doc/uid/TP40014097-CH18-XID_339">Required Initializers</a></span>.
</p>
</li><li class="item"><p class="para">
  Added a new section about <span class="x-name"><a href="Functions.html#//apple_ref/doc/uid/TP40014097-CH10-XID_252" data-id="//apple_ref/doc/uid/TP40014097-CH10-XID_252">Optional Tuple Return Types</a></span>.
</p>
</li><li class="item"><p class="para">
  Updated the <span class="x-name"><a href="TheBasics.html#//apple_ref/doc/uid/TP40014097-CH5-XID_453" data-id="//apple_ref/doc/uid/TP40014097-CH5-XID_453">Type Annotations</a></span> section to note that multiple related variables can be defined on a single line with one type annotation.
</p>
</li><li class="item"><p class="para">
  The <code class="code-voice">@optional</code>, <code class="code-voice">@lazy</code>, <code class="code-voice">@final</code>, and <code class="code-voice">@required</code> attributes are now the <code class="code-voice">optional</code>, <code class="code-voice">lazy</code>, <code class="code-voice">final</code>, and <code class="code-voice">required</code> <span class="x-name"><a href="Declarations.html#//apple_ref/doc/uid/TP40014097-CH34-XID_705" data-id="//apple_ref/doc/uid/TP40014097-CH34-XID_705">Declaration Modifiers</a></span>.
</p>
</li><li class="item"><p class="para">
  Updated the entire book to refer to <code class="code-voice">..&lt;</code> as the <span class="x-name"><a href="BasicOperators.html#//apple_ref/doc/uid/TP40014097-CH6-XID_128" data-id="//apple_ref/doc/uid/TP40014097-CH6-XID_128">Half-Open Range Operator</a></span> (rather than the “half-closed range operator”).
</p>
</li><li class="item"><p class="para">
  Updated the <span class="x-name"><a href="CollectionTypes.html#//apple_ref/doc/uid/TP40014097-CH8-XID_185" data-id="//apple_ref/doc/uid/TP40014097-CH8-XID_185">Accessing and Modifying a Dictionary</a></span> section to note that <code class="code-voice">Dictionary</code> now has a Boolean <code class="code-voice">isEmpty</code> property.
</p>
</li><li class="item"><p class="para">
  Clarified the full list of characters that can be used when defining <span class="x-name"><a href="AdvancedOperators.html#//apple_ref/doc/uid/TP40014097-CH27-XID_85" data-id="//apple_ref/doc/uid/TP40014097-CH27-XID_85">Custom Operators</a></span>.
</p>
</li><li class="item"><p class="para">
  <code class="code-voice">nil</code> and the Booleans <code class="code-voice">true</code> and <code class="code-voice">false</code> are now <span class="x-name"><a href="LexicalStructure.html#//apple_ref/doc/uid/TP40014097-CH30-XID_886" data-id="//apple_ref/doc/uid/TP40014097-CH30-XID_886">Literals</a></span>.
</p>
</li>
</ul></td>
        </tr>
        <tr>
            <td scope="row"><p class="para">
  2014-07-07
</p></td>
            <td><ul class="list-bullet">
  <li class="item"><p class="para">
  Swift’s <code class="code-voice">Array</code> type now has full value semantics. Updated the information about <span class="x-name"><a href="CollectionTypes.html#//apple_ref/doc/uid/TP40014097-CH8-XID_170" data-id="//apple_ref/doc/uid/TP40014097-CH8-XID_170">Mutability of Collections</a></span> and <span class="x-name"><a href="CollectionTypes.html#//apple_ref/doc/uid/TP40014097-CH8-XID_172" data-id="//apple_ref/doc/uid/TP40014097-CH8-XID_172">Arrays</a></span> to reflect the new approach. Also clarified the <span class="x-name"><a href="ClassesAndStructures.html#//apple_ref/doc/uid/TP40014097-CH13-XID_150" data-id="//apple_ref/doc/uid/TP40014097-CH13-XID_150">Assignment and Copy Behavior for Strings, Arrays, and Dictionaries</a></span>.
</p>
</li><li>
  <span class="x-name"><a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/CollectionTypes.html#//apple_ref/doc/uid/TP40014097-CH8-XID_173">数组类型速记语法（Array Type Shorthand Syntax）</a></span> 从 <code>SomeType[]</code>.更新为<code>[SomeType]</code>
</p>
</li><li>
  加入新的小节：<a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/CollectionTypes.html#//apple_ref/doc/uid/TP40014097-CH8-XID_182">字典类型的速记语法（Dictionary Type Shorthand Syntax)</a>.： <code>[KeyType: ValueType]</code>.
</p>
</li><li>
  加入新的小节：<a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/CollectionTypes.html#//apple_ref/doc/uid/TP40014097-CH8-XID_189">字典键类型的哈希值（Hash Values for Dictionary Key Types)</a>.
</p>
</li>

<li>
  例子 <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Closures.html#//apple_ref/doc/uid/TP40014097-CH11-XID_154">闭包表达式 (Closure Expressions)</a></span> 中使用新的全局函数 <code class="code-voice">sorted</code> 取代原先的全局函数 <code class="code-voice">sort</code> 去展示如何返回一个全新的数组.
</p>
</li>

<li>
  更新关于 <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Initialization.html#//apple_ref/doc/uid/TP40014097-CH18-XID_320">结构体逐一成员构造器 （Memberwise Initializers for Structure Types）</a> 的描述：即使结构体的成员<b>没有默认值</b>，逐一成员构造器也可以自动获得。
</p>
</li>

<li> <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/BasicOperators.html#//apple_ref/doc/uid/TP40014097-CH6-XID_128">区间运算符（Half-Open Range Operator）</a>由<code>..</code>更新到<code>..<</code>
<p>
<li>添加一个例子 <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Generics.html#//apple_ref/doc/uid/TP40014097-CH26-XID_285">扩展一个泛型（Extending a Generic Type）</a>

</li>
</ul></td>
        </tr>
    <tr>
	<td>
		2014-06-02
	</td>
	<td>
		<li>
			发布新的文档用以详述Swift - 苹果公司针对iOS和OS X应用的全新开发语言
		</li>
	</td>
	</tr>
</tbody>
</table>

<table  border="0" cellspacing="0" cellpadding="5">
<thead>
	<tr>
		<th>日期</th>
        <th scope="col">备注</th>
    </tr>
</thead>
<tbody>
    <tr>
		<td scope="row">2014-08-04</td>
		<td>马上更新</td>
	</tr>
</tbody>
</table>
<a name="xcode6_beta4"></a>
# XCode6 Beta4中Swift语法更新
<table  border="0" cellspacing="0" cellpadding="5">
<thead>
	<tr>
		<th>日期</th>
        <th scope="col">备注</th>
    </tr>
</thead>
<tbody>
    <tr>
		<td scope="row">2014-08-04</td>
		<td>马上更新</td>
	</tr>
</tbody>
</table>