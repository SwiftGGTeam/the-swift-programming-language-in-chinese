> 翻译：[成都老码团队翻译组-Ayra](http://weibo.com/littlekok/)  
> 校对：[成都老码团队翻译组-Oberyn](http://weibo.com/u/5241713117)

# Swift 版本历史记录

---

本页内容包括：

-   [XCode6 Beta6 Swift语法文档更新](#xcode6_beta6)
-   [XCode6 Beta5 Swift语法文档更新](#xcode6_beta5)
-   [XCode6 Beta4 Swift语法文档更新](#xcode6_beta4)
-   [XCode6 Beta3 Swift语法文档更新](#xcode6_beta3)
-   [XCode6 Beta2 Swift语法文档更新](#xcode6_beta2)
-   [XCode6 Beta1 Swift语法文档更新](#xcode6_beta1) 
-   XCode6下载: [老码云盘下载](http://pan.baidu.com/disk/home#from=share_pan_logo&path=%252F%25E8%2580%2581%25E7%25A0%2581%25E4%25BA%2591%25E7%259B%2598-XCode6%252FXCode6-Beta5)

以下部分是针对XCode6每一次Beta版本直至正式版发布，Swift语法部分的更新归类

<a name="xcode6_beta6"></a>
### XCode6 Beta6中Swift语法更新

<table class="graybox" border="0" cellspacing="0" cellpadding="5">
<thead>
	<tr>
		<th scope="col" width="100">发布日期</th>
        <th scope="col">语法变更记录</th>
    </tr>
</thead>
<tbody>
	<tr>
	<td scope="row">2014-08-18</td>
    <td><ul class="list-bullet">
		<li><p>
			在章节协议中，增加新的小节：<a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Protocols.html#//apple_ref/doc/uid/TP40014097-CH25-XID_397">对构造器的规定（Initializer Requirements）</a></p>
		</li>
		<li><p>
			在章节协议中，增加新的小节：<a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Protocols.html#//apple_ref/doc/uid/TP40014097-CH25-XID_409">类专属协议（class-only protocols）</a></p>
		</li>
		<li><p>
			<a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/TheBasics.html#//apple_ref/doc/uid/TP40014097-CH5-XID_494">断言(assertions)</a>现在可以使用字符串内插语法，并删除了文档中有冲突的注释</p>
		</li>
		<li><p>
			更新了<a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/StringsAndCharacters.html#//apple_ref/doc/uid/TP40014097-CH7-XID_428">连接字符串和字符（Concatenating Strings and Characters）</a>小节来说明一个事实，那就是字符串和字符不能再用<code>+</code>号运算符或者复合加法运算符<code>+=</code>相互连接，这两种运算符现在只能用于字符串之间相连。请使用<code>String</code>类型的<code>append</code>方法在一个字符串的尾部增加单个字符</p>
		</li>
		<li><p>
			在<a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Attributes.html#//apple_ref/doc/uid/TP40014097-CH35-XID_516">声明特性（Declaration Attributes）</a>章节增加了关于<code>availability</code>特性的一些信息</p>
		</li>
		</ul>
	</td>
  </tr>
</tbody>
</table>

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
  			<a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/TheBasics.html#//apple_ref/doc/uid/TP40014097-CH5-XID_478">可选类型（Optionals）</a> 若有值时，不再隐式的转换为 <code>true</code>，同样，若无值时，也不再隐式的转换为 <code>false</code>, 这是为了避免在判别 optional <code>Bool</code> 的值时产生困惑。 替代的方案是，用<code>==</code> 或 <code>!=</code> 运算符显式地去判断Optinal是否是 <code>nil</code>，以确认其是否包含值。
		</li>
		<li><p>
  			Swift新增了一个 <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/BasicOperators.html#//apple_ref/doc/uid/TP40014097-CH6-XID_124" data-id="//apple_ref/doc/uid/TP40014097-CH6-XID_124">Nil合并运算符（Nil Coalescing Operator）</a> (<code>a ?? b</code>), 该表达式中，如果Optional <code>a</code>的值存在，则取得它并返回，若Optional <code>a</code>为<code>nil</code>，则返回默认值 <code>b</code>
		</li>
		<li><p>
			更新和扩展 <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/StringsAndCharacters.html#//apple_ref/doc/uid/TP40014097-CH7-XID_434">字符串的比较（Comparing Strings）</a> 章节，用以反映和展示'字符串和字符的比较'，以及'前缀（prefix）/后缀(postfix)比较'都开始基于扩展字符集(extended grapheme clusters)规范的等价比较.
		</li>
		<li><p>
			现在，你可以通过 <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/OptionalChaining.html#//apple_ref/doc/uid/TP40014097-CH21-XID_356">可选链（Optional Chaining）</a>来：给属性设值，将其赋给一个下标脚注（subscript）; 或调用一个变异（mutating）方法或运算符。对此，章节——<a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/OptionalChaining.html#//apple_ref/doc/uid/TP40014097-CH21-XID_364">通过可选链访问属性（Accessing Properties Through Optional Chaining）</a>的内容已经被相应的更新。而章节——<a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/OptionalChaining.html#//apple_ref/doc/uid/TP40014097-CH21-XID_361">通过可选链调用方法（Calling Methods Through Optional Chaining</a>中，关于检查方法调用是否成功的例子，已被扩展为展示如何检查一个属性是否被设值成功。 
  	
		</li>
		<li><p>
  			在章节可选链中，增加一个新的小节 <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/OptionalChaining.html#//apple_ref/doc/uid/TP40014097-CH21-XID_364">访问可选类型的下标脚注（Accessing Subscripts of Optional Type）</a>
		</li>
		<li><p>
  			更新章节 <a href="CollectionTypes.html#//apple_ref/doc/uid/TP40014097-CH8-XID_176" data-id="//apple_ref/doc/uid/TP40014097-CH8-XID_176">访问和修改数组(Accessing and Modifying an Array)</a> 以标示：从该版本起，不能再通过<code>+=</code> 运算符给一个数组添加一个新的项。. 对应的替代方案是, 使<code>append</code> 方法, 或者通过<code>+=</code>运算符来添加一个<b>只有一个项的数组</b>（single-item Array）.</li>
		<li><p>
  			添加了一个提示：在 <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/BasicOperators.html#//apple_ref/doc/uid/TP40014097-CH6-XID_126">范围运算符（Range Operators）</a>中，比如， <code>a...b</code> 和 <code>a..&lt;b</code> ，起始值<code>a</code>不能大于结束值<code>b</code>.
		</li>
		<li><p>
  			重写了<a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Inheritance.html#//apple_ref/doc/uid/TP40014097-CH17-XID_293">继承（Inheritance）</a> 这一章：删除了本章中关于构造器重写的介绍性报道；转而将更多的注意力放到新增的部分——子类的新功能，以及如何通过重写（overrides）修改已有的功能。另外，小节 <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Inheritance.html#//apple_ref/doc/uid/TP40014097-CH17-XID_301">重写属性的Getters和Setters（Overriding Property Getters and Setters）</a> 中的例子已经被替换为展示如何重写一个 <code>description</code> 属性. (而关于如何在子类的构造器中修改继承属性的默认值的例子，已经被移到 <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Inheritance.html#//apple_ref/doc/uid/TP40014097-CH17-XID_293">构造过程（Initialization）</a> 这一章.)
		</li>
		<li><p>
  			更新了 <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Initialization.html#//apple_ref/doc/uid/TP40014097-CH18-XID_331">构造器的继承与重写（Initializer Inheritance and Overriding）</a> 小节以标示： 重写一个特定的构造器必须使用 <code>override</code> 修饰符.
		</li>
		<li><p>
  			更新 <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Initialization.html#//apple_ref/doc/uid/TP40014097-CH18-XID_339"> Required构造器（Required Initializers）</a> 小节以标示：<code>required</code> 修饰符现在需要出现在所有子类的required构造器的声明中, 而required构造器的实现，现在可以仅从父类自动继承。
		</li>
		<li><p>
  			中置（Infix）的 <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/AdvancedOperators.html#//apple_ref/doc/uid/TP40014097-CH27-XID_80">运算符函数（Operator Functions）</a> 不再需要<code>@infix</code> 属性.
		</li>
		<li><p>
  			<a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/RevisionHistory.html#//apple_ref/doc/uid/TP40014097-CH40-XID_1631">前置和后置运算符(Prefix and Postfix Operators)</a>的<code>@prefix</code> 和 <code>@postfix</code> 属性，已变更为 <code>prefix</code> 和 <code>postfix</code> 声明修饰符（declaration modifiers）.
		</li>
			<li><p>
  			增加一条注解：当Prefix和postfix运算符被作用于同一个操作数时，关于<a href="AdvancedOperators.html#//apple_ref/doc/uid/TP40014097-CH27-XID_81" data-id="//apple_ref/doc/uid/TP40014097-CH27-XID_81">前置和后置运算符(Prefix and Postfix Operators)</a>的顺序(postfix运算符会先被执行)
		</li>
		<li><p>
  			在运算符函数（Operator functions）中， <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/AdvancedOperators.html#//apple_ref/doc/uid/TP40014097-CH27-XID_82" data-id="//apple_ref/doc/uid/TP40014097-CH27-XID_82">组合赋值运算符（Compound Assignment Operators）</a> 不再使用 <code>@assignment</code> 属性来定义函数.
		</li>
		<li><p>
			在这个版本中，在定义<a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/AdvancedOperators.html#//apple_ref/doc/uid/TP40014097-CH27-XID_85">自定义操作符（Custom Operators）</a> 时，<b>修饰符（Modifiers）的出现顺序发生变化</b>。比如， 现在，你该编写 <code>prefix operator</code>， 而不是 <code>operator prefix</code>.
		</li>
		<li><p>
  			增加信息：关于<code>dynamic</code> 声明修饰符（declaration modifier），于章节 <a href="Declarations.html#//apple_ref/doc/uid/TP40014097-CH34-XID_705" data-id="//apple_ref/doc/uid/TP40014097-CH34-XID_705">声明修饰符（Declaration Modifiers）</a>.
		</li>
		<li><p>
  			增加信息：<a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/doc/uid/TP40014097-CH30-XID_886">字面量Literals</a> 的类型推导（type inference）
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
  			 <code>@optional</code>, <code>@lazy</code>, <code>@final</code>,  <code>@required</code> 等关键字被更新为 <code>optional</code>, <code>lazy</code>, <code>final</code>, <code>required</code> <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/doc/uid/TP40014097-CH34-XID_705">参见声明修饰符（Declaration Modifiers）</a>.
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

