> 翻译：[成都老码团队翻译组-Ayra](http://weibo.com/littlekok/)  
> 校对：[成都老码团队翻译组-Oberyn](http://weibo.com/u/5241713117)

# Swift 版本历史记录

---

本页内容包括：

-   [XCode6 Beta5 Swift语法文档更新](#xcode6_beta5)
-   [XCode6 Beta4 Swift语法文档更新](#xcode6_beta4)
-   [XCode6 Beta3 Swift语法文档更新](#xcode6_beta3)
-   [XCode6 Beta2 Swift语法文档更新](#xcode6_beta2)
-   [XCode6 Beta1 Swift语法文档更新](#xcode6_beta1) 
-   XCode6下载: [老码云盘下载](http://pan.baidu.com/disk/home#from=share_pan_logo&path=%252F%25E8%2580%2581%25E7%25A0%2581%25E4%25BA%2591%25E7%259B%2598-XCode6%252FXCode6-Beta5)

以下部分是针对XCode6每一次Beta版本直至正式版发布，Swift语法部分的更新归类


<a name="xcode6_beta5"></a>
### XCode6 Beta5中Swift语法更新

<table class="graybox" border="0" cellspacing="0" cellpadding="5">
<thead>
	<tr>
		<th scope="col" width="100">发布日期</th>
        <th scope="col">语法变更记录</th>
    </tr>
</thead>
<tbody>
	<tr>
	<td scope="row">2014-08-04</td>
    <td><ul class="list-bullet">
		<li><p>
  			<a href="TheBasics.html#//apple_ref/doc/uid/TP40014097-CH5-XID_478" data-id="//apple_ref/doc/uid/TP40014097-CH5-XID_478">Optionals</a> no longer implicitly evaluate to <code>true</code> when they have a value and <code>false</code> when they do not, to avoid confusion when working with optional <code>Bool</code> values. Instead, make an explicit check against <code>nil</code> with the <code>==</code> or <code>!=</code> operators to find out if an optional contains a value.
		</li>
		<li><p>
  			Swift now has a <a href="BasicOperators.html#//apple_ref/doc/uid/TP40014097-CH6-XID_124" data-id="//apple_ref/doc/uid/TP40014097-CH6-XID_124">Nil Coalescing Operator</a> (<code>a ?? b</code>), which unwraps an optional’s value if it exists, or returns a default value if the optional is <code>nil</code>.
		</li>
		<li><p>
  			Updated and expanded the <a href="StringsAndCharacters.html#//apple_ref/doc/uid/TP40014097-CH7-XID_434" data-id="//apple_ref/doc/uid/TP40014097-CH7-XID_434">Comparing Strings</a> section to reflect and demonstrate that string and character comparison and prefix / suffix comparison are now based on Unicode canonical equivalence of extended grapheme clusters.
		</li>
		<li><p>
  			You can now try to set a property’s value, assign to a subscript, or call a mutating method or operator through <a href="OptionalChaining.html#//apple_ref/doc/uid/TP40014097-CH21-XID_356" data-id="//apple_ref/doc/uid/TP40014097-CH21-XID_356">Optional Chaining</a>. The information about <a href="OptionalChaining.html#//apple_ref/doc/uid/TP40014097-CH21-XID_360" data-id="//apple_ref/doc/uid/TP40014097-CH21-XID_360">Accessing Properties Through Optional Chaining</a> has been updated accordingly, and the examples of checking for method call success in <a href="OptionalChaining.html#//apple_ref/doc/uid/TP40014097-CH21-XID_361" data-id="//apple_ref/doc/uid/TP40014097-CH21-XID_361">Calling Methods Through Optional Chaining</a> have been expanded to show how to check for property setting success.
		</li>
		<li><p>
  			Added a new section about <a href="OptionalChaining.html#//apple_ref/doc/uid/TP40014097-CH21-XID_364" data-id="//apple_ref/doc/uid/TP40014097-CH21-XID_364">Accessing Subscripts of Optional Type</a> through optional chaining.
		</li>
		<li><p>
  			Updated the <a href="CollectionTypes.html#//apple_ref/doc/uid/TP40014097-CH8-XID_176" data-id="//apple_ref/doc/uid/TP40014097-CH8-XID_176">Accessing and Modifying an Array</a> section to note that you can no longer append a single item to an array with the <code>+=</code> operator. Instead, use the <code>append</code> method, or append a single-item array with the <code>+=</code> operator.</li>
		<li><p>
  			Added a note that the start value <code>a</code> for the <a href="BasicOperators.html#//apple_ref/doc/uid/TP40014097-CH6-XID_126" data-id="//apple_ref/doc/uid/TP40014097-CH6-XID_126">Range Operators</a> <code>a...b</code> and <code>a..&lt;b</code> must not be greater than the end value <code>b</code>.
		</li>
		<li><p>
  			Rewrote the <a href="Inheritance.html#//apple_ref/doc/uid/TP40014097-CH17-XID_293" data-id="//apple_ref/doc/uid/TP40014097-CH17-XID_293">Inheritance</a> chapter to remove its introductory coverage of initializer overrides. This chapter now focuses more on the addition of new functionality in a subclass, and the modification of existing functionality with overrides. The chapter’s example of <a href="Inheritance.html#//apple_ref/doc/uid/TP40014097-CH17-XID_301" data-id="//apple_ref/doc/uid/TP40014097-CH17-XID_301">Overriding Property Getters and Setters</a> has been rewritten to show how to override a <code>description</code> property. (The examples of modifying an inherited property’s default value in a subclass initializer have been moved to the <a href="Initialization.html#//apple_ref/doc/uid/TP40014097-CH18-XID_306" data-id="//apple_ref/doc/uid/TP40014097-CH18-XID_306">Initialization</a> chapter.)
		</li>
		<li><p>
  			Updated the <a href="Initialization.html#//apple_ref/doc/uid/TP40014097-CH18-XID_331" data-id="//apple_ref/doc/uid/TP40014097-CH18-XID_331">Initializer Inheritance and Overriding</a> section to note that overrides of a designated initializer must now be marked with the <code>override</code> modifier.
		</li>
		<li><p>
  			Updated the <a href="Initialization.html#//apple_ref/doc/uid/TP40014097-CH18-XID_339" data-id="//apple_ref/doc/uid/TP40014097-CH18-XID_339">Required Initializers</a> section to note that the <code>required</code> modifier is now written before every subclass implementation of a required initializer, and that the requirements for required initializers can now be satisfied by automatically inherited initializers.
		</li>
		<li><p>
  			Infix <a href="AdvancedOperators.html#//apple_ref/doc/uid/TP40014097-CH27-XID_80" data-id="//apple_ref/doc/uid/TP40014097-CH27-XID_80">Operator Functions</a> no longer require the <code>@infix</code> attribute.
		</li>
		<li><p>
  			The <code>@prefix</code> and <code>@postfix</code> attributes for <a href="AdvancedOperators.html#//apple_ref/doc/uid/TP40014097-CH27-XID_81" data-id="//apple_ref/doc/uid/TP40014097-CH27-XID_81">Prefix and Postfix Operators</a> have been replaced by <code>prefix</code> and <code>postfix</code> declaration modifiers.
		</li>
			<li><p>
  			Added a note about the order in which <a href="AdvancedOperators.html#//apple_ref/doc/uid/TP40014097-CH27-XID_81" data-id="//apple_ref/doc/uid/TP40014097-CH27-XID_81">Prefix and Postfix Operators</a> are applied when both a prefix and a postfix operator are applied to the same operand.
		</li>
		<li><p>
  			Operator functions for <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/AdvancedOperators.html#//apple_ref/doc/uid/TP40014097-CH27-XID_82" data-id="//apple_ref/doc/uid/TP40014097-CH27-XID_82">Compound Assignment Operators</a> no longer use the <code>@assignment</code> attribute when defining the function.
		</li>
		<li><p>
			在这个版本中，在定义<a href="https://apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/AdvancedOperators.html#//apple_ref/doc/uid/TP40014097-CH27-XID_85">自定义操作符（Custom Operators）</a> 时，<b>修改器（Modifiers）的出现顺序发生变化</b>。比如， 现在，你该编写 <code>prefix operator</code>， 而不是 <code>operator prefix</code>.
		</li>
		<li><p>
  			增加信息：关于<code>dynamic</code> 声明修改器（declaration modifier），于章节 <a href="Declarations.html#//apple_ref/doc/uid/TP40014097-CH34-XID_705" data-id="//apple_ref/doc/uid/TP40014097-CH34-XID_705">声明修改器（Declaration Modifiers）</a>.
		</li>
		<li><p>
  			增加信息：关于类型推导（type inference）如何作用于字面量<a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/doc/uid/TP40014097-CH30-XID_886>Literals</a>.
		</li>
		<li><p>
  			为章节<a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/doc/uid/TP40014097-CH34-XID_597">Curried Functions</a>添加了更多的信息.
		</li>
		</ul>
	</td>
  </tr>
</tbody>
</table>
<a name="xcode6_beta4"></a>
#### XCode6 Beta4中Swift语法更新
<table class="graybox" border="0" cellspacing="0" cellpadding="5">
<thead>
	<tr>
		<th scope="col" width="100">发布日期</th>
        <th scope="col">语法变更记录</th>
    </tr>
</thead>
<tbody>
	<tr>
	<td scope="row">2014-07-21</td>
    <td><ul class="list-bullet">
		<li><p>
  			加入新的章节  <a href=https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/AccessControl.html#//apple_ref/doc/uid/TP40014097-CH41-XID_29">权限控制（Access Control）</a>.
		</li>
		<li><p>
  			更新了章节 <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/StringsAndCharacters.html#//apple_ref/doc/uid/TP40014097-CH7-XID_413">字符串和字符（Strings and Characters）</a> 用以表明，在Swift中，<code>Character</code> 类型现在代表的是扩展字符集(extended grapheme cluster)中的一个Unicode，为此，新增了小节 <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/StringsAndCharacters.html#//apple_ref/doc/uid/TP40014097-CH7-XID_431">Extended Grapheme Clusters</a> 。同时，为小节 <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/StringsAndCharacters.html#//apple_ref/doc/uid/TP40014097-CH7-XID_428">Unicode标量（Unicode Scalars）</a> 和 <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/StringsAndCharacters.html#//apple_ref/doc/uid/TP40014097-CH7-XID_434">字符串比较（Comparing Strings）</a>增加了更多内容.
		</li>
		<li><p>
			更新章节<a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/doc/uid/TP40014097-CH30-XID_856">字符串字面量（String Literals）</a>：在一个字符串中，Unicode标量（Unicode scalars） 以 <code>\u{n}</code>的形式来表示, <code>n</code> 是一个最大可以有8位的16进制数（hexadecimal digits）
		</li>
		<li><p>
  			<code>NSString</code> <code>length</code> 属性已被映射到Swift的内建 <code>String</code>类型。（注意，这两属性的类型是<code>utf16<color="red">C</color>ount</code>,而非 <code>utf16count</code>）.
		</li>
		<li><p>
  			Swift的内建 <code>String</code> 类型不再拥有 <code>uppercaseString</code> 和 <code>lowercaseString</code> 属性.其对应部分在章节 <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/StringsAndCharacters.html#//apple_ref/doc/uid/TP40014097-CH7-XID_413">字符串和字符（Strings and Characters）</a>已经被删除, 并且各种对应的代码用例也已被更新.
		</li>
		<li><p>
  			加入新的章节  <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Initialization.html#//apple_ref/doc/uid/TP40014097-CH18-XID_315">没有外部名的构造器参数（Initializer Parameters Without External Names）</a>.
		</li>
		<li><p>
  			加入新的章节  <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Initialization.html#//apple_ref/doc/uid/TP40014097-CH18-XID_339"> Required构造器（Required Initializers）</a>.
		</li>
		<li><p>
  			加入新的章节 <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Functions.html#//apple_ref/doc/uid/TP40014097-CH10-XID_252">可选元祖（函数）返回类型 （Optional Tuple Return Types）</a>.
		</li>
		<li><p>
  			更新章节 <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/TheBasics.html#//apple_ref/doc/uid/TP40014097-CH5-XID_453">类型标注（Type Annotations）</a> ：多个相关变量可以用“类型标注”（type annotaion）在同一行中声明为同一类型。
		</li>
		<li><p>
  			 <code>@optional</code>, <code>@lazy</code>, <code>@final</code>,  <code>@required</code> 等关键字被更新为 <code>optional</code>, <code>lazy</code>, <code>final</code>, <code>required</code> <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/doc/uid/TP40014097-CH34-XID_705">参见声明修改器（Declaration Modifiers）</a>.
		</li>
		<li><p>
  			更新整本书 —— 引用 <code>..&lt;</code> 作为<a href="BasicOperators.html#//apple_ref/doc/uid/TP40014097-CH6-XID_128" data-id="//apple_ref/doc/uid/TP40014097-CH6-XID_128">区间运算符（Half-Open Range Operator）</a> (取代原先的<code>..</code> ).
		</li>
		<li><p>
  			更新了小节 <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/CollectionTypes.html#//apple_ref/doc/uid/TP40014097-CH8-XID_185">读取和修改字典（Accessing and Modifying a Dictionary）</a>：  <code>Dictionary</code> 现在早呢更加了一个 Boolean型的属性： <code>isEmpty</code> 
		</li>
		<li><p>
  			解释了哪些字符（集）可被用来定义<a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/AdvancedOperators.html#//apple_ref/doc/uid/TP40014097-CH27-XID_85">自定义操作符 （Custom Operators）</a>
		</li>
		<li><p>
  			<code>nil</code> 和布尔运算中的 <code>true</code> 和 <code>false</code> 现在被定义为字面量<a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/doc/uid/TP40014097-CH30-XID_886">Literals</a>.
		</li>
	</ul></td>
	</td>
  </tr>
</tbody>
</table>
<a name="xcode6_beta3"></a>
#### XCode6 Beta3中Swift语法更新
<table class="graybox" border="0" cellspacing="0" cellpadding="5">
<thead>
	<tr>
		<th scope="col" width="100">发布日期</th>
        <th scope="col">语法变更记录</th>
    </tr>
</thead>
<tbody>
	<tr>
	<td scope="row">2014-07-7</td>
    <td><ul class="list-bullet">
		<li><p>
  			Swift 中的数组 （<code>Array</code>） 类型从现在起具备了完整的值语义。具体信息被更新到 <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/CollectionTypes.html#//apple_ref/doc/uid/TP40014097-CH8-XID_170">集合的可变性（Mutability of Collections）</a> 和 <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/CollectionTypes.html#//apple_ref/doc/uid/TP40014097-CH8-XID_172">数组（Arrays）</a> 两小节，以反映这个新的变化. 此外，还解释了如何 <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/ClassesAndStructures.html#//apple_ref/doc/uid/TP40014097-CH13-XID_150">给Strings, Arrays和Dictionaries进行赋值和拷贝 （Assignment and Copy Behavior for Strings, Arrays, and Dictionaries）</a>.
		</li>
		<li><p>
			<a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/CollectionTypes.html#//apple_ref/doc/uid/TP40014097-CH8-XID_173">数组类型速记语法（Array Type Shorthand Syntax）</a> 从 <code>SomeType[]</code>.更新为<code>[SomeType]</code>
		</li>
		<li><p>
  			加入新的小节：<a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/CollectionTypes.html#//apple_ref/doc/uid/TP40014097-CH8-XID_182">字典类型的速记语法（Dictionary Type Shorthand Syntax)</a>.： <code>[KeyType: ValueType]</code>.
		</li>
		<li><p>
  			加入新的小节：<a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/CollectionTypes.html#//apple_ref/doc/uid/TP40014097-CH8-XID_189">字典键类型的哈希值（Hash Values for Dictionary Key Types)</a>.
		</li>
		<li><p>
 			例子 <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Closures.html#//apple_ref/doc/uid/TP40014097-CH11-XID_154">闭包表达式 (Closure Expressions)</a> 中使用新的全局函数 <code>sorted</code> 取代原先的全局函数 <code>sort</code> 去展示如何返回一个全新的数组.
		</li>
		<li><p>
			更新关于 <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Initialization.html#//apple_ref/doc/uid/TP40014097-CH18-XID_320">结构体逐一成员构造器 （Memberwise Initializers for Structure Types）</a> 的描述：即使结构体的成员<b>没有默认值</b>，逐一成员构造器也可以自动获得。
		</li>
		<li><p>
			<a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/BasicOperators.html#//apple_ref/doc/uid/TP40014097-CH6-XID_128">区间运算符（Half-Open Range Operator）</a>由<code>..</code>更新到<code>..<</code><p>
		<li><p>
			添加一个例子 <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Generics.html#//apple_ref/doc/uid/TP40014097-CH26-XID_285">扩展一个泛型（Extending a Generic Type）</a>
		</li>
	</ul></td>
	</td>
  </tr>
</tbody>
</table>
<a name="xcode6_beta2"></a>
#### XCode6 Beta2中Swift语法更新
<table class="graybox" border="0" cellspacing="0" cellpadding="5">
<thead>
	<tr>
		<th scope="col" width="100">发布日期</th>
        <th scope="col">语法变更记录</th>
    </tr>
</thead>
<tbody>
	<tr>
	<td scope="row">2014-07-7</td>
    <td><ul class="list-bullet">
		<li><p>
			发布新的文档用以详述Swift - 苹果公司针对iOS和OS X应用的全新开发语言
		</li>
	</td>
	</tr>
</tbody>
</table>
<a name="xcode6_beta1"></a>
#### XCode6 Beta1中Swift语法更新
<table class="graybox" border="0" cellspacing="0" cellpadding="5">
<thead>
	<tr>
		<th scope="col" width="100">发布日期</th>
        <th scope="col">语法变更记录</th>
    </tr>
</thead>
<tbody>
	<tr>
	<td scope="row">2014-06-3</td>
    <td><ul class="list-bullet">
		<li><p>
			苹果全球开发者大会WWDC2014召开，发布了苹果最新的开发语言Swift，并释放出XCode6 Beta1版本
		</li>
	</td>
	</tr>
</tbody>
</table>

