# Swift 文档修订历史

---

> 1.0
> 翻译：[成都老码团队翻译组-Arya](http://weibo.com/littlekok/)
> 校对：[成都老码团队翻译组-Oberyn](http://weibo.com/u/5241713117)
[changkun](http://changkun.us/about/)
> 
> 1.1
> 翻译：[成都老码团队翻译组-Arya](http://weibo.com/littlekok/)
> 校对：[成都老码团队翻译组-Oberyn](http://weibo.com/u/5241713117)
[changkun](http://changkun.us/about/)
> 
> 1.2
> 翻译：[成都老码团队翻译组-Arya](http://weibo.com/littlekok/)
> 校对：[成都老码团队翻译组-Oberyn](http://weibo.com/u/5241713117)
[changkun](http://changkun.us/about/)
> 
> 2.0
> 翻译+校对：[changkun](http://changkun.us/about/)
> 
> 2.1
> 翻译+校对：[changkun](http://changkun.us/about/)
> 
> 2.2
> 翻译+校对：[changkun](http://changkun.us/about/)
> 
> 3.0
> 翻译+校对：[shanks](http://codebuild.me)，2016-10-06

本页面根据 [Document Revision History](https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/RevisionHistory.html) 进行适配更新。

本页内容包括：
-   [Swift 3.0 更新](#swift_3_0)
-   [Swift 2.2 更新](#swift_2_2)
-   [Swift 2.1 更新](#swift_2_1)
-   [Swift 2.0 更新](#swift_2_0)
-   [Swift 1.2 更新](#swift_1_2)
-   [Swift 1.1 更新](#swift_1_1)
-   [Swift 1.0 更新](#swift_1_0)


<a name="swift_3_0"></a>
### Swift 3.0 更新

<a name="swift_2_2"></a>
### Swift 2.2 更新

<table class="graybox" border="0" cellspacing="0" cellpadding="5">
<thead>
    <tr>
        <th scope="col" width="100">发布日期</th>
        <th scope="col">语法变更记录</th>
    </tr>
</thead>
<tbody>
	 <tr>
    <td scope="row">2016-09-13</td>
    <td><ul class="list-bullet">
        <li>
            更新至 Swift 3.0。
        </li>
        <li>
           更新<a href="https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Functions.html#//apple_ref/doc/uid/TP40014097-CH10-ID158">函数</a>章节中关于函数的讨论，在<a href="https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/doc/uid/TP40014097-CH34-ID362">函数定义</a>一节中，标明所有函数参数默认都有函数标签。
        </li>
        <li>
           更新<a href="https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/AdvancedOperators.html#//apple_ref/doc/uid/TP40014097-CH27-ID28">高级操作符</a>章节中关于操作符的讨论，现在你可以作为类型函数来实现，替代之前的全局函数实现方式。
        </li>
        <li>
           增加<a href="https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/AccessControl.html#//apple_ref/doc/uid/TP40014097-CH41-ID3">访问控制</a>章节中关于对新的访问级别描述符<code>open</code>和<code>fileprivate</code>的信息
        </li>
        <li>
           更新<a href="https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/doc/uid/TP40014097-CH34-ID362">函数定义</a>一节中关于<code>inout</code>的讨论，标明它放在参数类型的前面，替代之前放在参数名称前面的方式。
        </li>
         <li>
           更新<a href="https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/doc/uid/TP40014097-CH34-ID362">逃逸闭包</a>和<a href="https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/doc/uid/TP40014097-CH34-ID362">自动闭包</a>还有<a href="https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/doc/uid/TP40014097-CH34-ID362">属性</a>章节中关于<code>@noescape</code>和<code>@autoclosure</code>的讨论，现在他们是类型属性，而不是定义属性。
        </li>
         <li>
            增加<a href="https://developer.apple.com/library/prerelease/content/documentation/Swift/Conceptual/Swift_Programming_Language/AdvancedOperators.html#//apple_ref/doc/uid/TP40014097-CH27-ID28">高级操作符</a>章节中<a href="https://developer.apple.com/library/prerelease/content/documentation/Swift/Conceptual/Swift_Programming_Language/AdvancedOperators.html#//apple_ref/doc/uid/TP40014097-CH27-ID47">自定义中缀操作符的优先级</a>一节和<a href="https://developer.apple.com/library/prerelease/content/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/doc/uid/TP40014097-CH34-ID351">定义</a>章节中<a href="https://developer.apple.com/library/prerelease/content/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/doc/uid/TP40014097-CH34-ID550">优先级组声明</a>一节中关于操作符优先级组的信息。

        </li>
         <li>
            更新一些讨论：使用 macOS 替换掉 OS X， Error 替换掉 ErrorProtocol，和更新一些协议名称，比如使用 ExpressibleByStringLiteral 替换掉 StringLiteralConvertible。

        </li>
 		  <li>
            更新<a href="https://developer.apple.com/library/prerelease/content/documentation/Swift/Conceptual/Swift_Programming_Language/Generics.html#//apple_ref/doc/uid/TP40014097-CH26-ID179">泛型</a>章节中<a href="https://developer.apple.com/library/prerelease/content/documentation/Swift/Conceptual/Swift_Programming_Language/Generics.html#//apple_ref/doc/uid/TP40014097-CH26-ID192">泛型 Where 语句</a>一节和<a href="https://developer.apple.com/library/prerelease/content/documentation/Swift/Conceptual/Swift_Programming_Language/GenericParametersAndArguments.html#//apple_ref/doc/uid/TP40014097-CH37-ID406">泛型形参和实参</a>章节，现在泛型的 where 语句写在一个声明的最后。


        </li>
        <li>
            更新<a href="https://developer.apple.com/library/prerelease/content/documentation/Swift/Conceptual/Swift_Programming_Language/Closures.html#//apple_ref/doc/uid/TP40014097-CH11-ID546">逃逸闭包</a>一节，现在闭包默认为非逃逸的(noescaping)。
        </li>
        <li>
             更新<a href="https://developer.apple.com/library/prerelease/content/documentation/Swift/Conceptual/Swift_Programming_Language/TheBasics.html#//apple_ref/doc/uid/TP40014097-CH5-ID309">基础部分</a>章节中<a href="https://developer.apple.com/library/prerelease/content/documentation/Swift/Conceptual/Swift_Programming_Language/TheBasics.html#//apple_ref/doc/uid/TP40014097-CH5-ID333">可选绑定</a>一节和<a href="https://developer.apple.com/library/prerelease/content/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/doc/uid/TP40014097-CH33-ID428">语句</a>章节中<a href="https://developer.apple.com/library/prerelease/content/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/doc/uid/TP40014097-CH33-ID432">While 语句</a>一节，现在 if，while 和 guard 语句使用逗号分隔条件列表，不需要使用 where 语句。        
         </li>
         <li>
             增加<a href="https://developer.apple.com/library/prerelease/content/documentation/Swift/Conceptual/Swift_Programming_Language/ControlFlow.html#//apple_ref/doc/uid/TP40014097-CH9-ID120">控制流</a>章节中<a href="https://developer.apple.com/library/prerelease/content/documentation/Swift/Conceptual/Swift_Programming_Language/ControlFlow.html#//apple_ref/doc/uid/TP40014097-CH9-ID129">Switch</a>一节和<a href="https://developer.apple.com/library/prerelease/content/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/doc/uid/TP40014097-CH33-ID428">语句</a>章节中<a href="https://developer.apple.com/library/prerelease/content/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/doc/uid/TP40014097-CH33-ID436">Switch 语句</a>一节关于 switch cases 可以使用多模式的信息。        
         </li>
 		<li>
            更新<a href="https://developer.apple.com/library/prerelease/content/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/doc/uid/TP40014097-CH31-ID449">函数类型</a>一节，现在函数参数标签不包含在函数类型中。
        </li>
         <li>
             更新<a href="https://developer.apple.com/library/prerelease/content/documentation/Swift/Conceptual/Swift_Programming_Language/Protocols.html#//apple_ref/doc/uid/TP40014097-CH25-ID267">协议</a>章节中<a href="https://developer.apple.com/library/prerelease/content/documentation/Swift/Conceptual/Swift_Programming_Language/Protocols.html#//apple_ref/doc/uid/TP40014097-CH25-ID282">协议组合</a>一节和<a href="https://developer.apple.com/library/prerelease/content/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/doc/uid/TP40014097-CH31-ID445">类型</a>章节中<a href="https://developer.apple.com/library/prerelease/content/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/doc/uid/TP40014097-CH31-ID454">协议组合类型</a>一节关于使用新的 Protocol1 & Protocol2 语法的信息。        
         </li>
         <li>
            更新<a href="https://developer.apple.com/library/prerelease/content/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/doc/uid/TP40014097-CH32-ID402">动态类型表达式</a>一节使用新的 type(of:) 表达式的信息。
        </li>
         <li>
            更新<a href="https://developer.apple.com/library/prerelease/content/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/doc/uid/TP40014097-CH33-ID540">行控制表达式</a>一节使用 #sourceLocation(file:line:) 表达式的信息。
        </li>
         <li>
            更新<a href="https://developer.apple.com/library/prerelease/content/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/doc/uid/TP40014097-CH34-ID551">永不返回函数</a>一节使用 新的 Never 类型的信息。
        </li>
        <li>
            增加<a href="https://developer.apple.com/library/prerelease/content/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/doc/uid/TP40014097-CH32-ID390">字面量表达式</a>一节关于 playground 字面量的信息。
        </li>
         <li>
            更新<a href="https://developer.apple.com/library/prerelease/content/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/doc/uid/TP40014097-CH34-ID545">In-Out 参数</a>一节，标明只有非逃逸闭包能捕获 in-out 参数。
        </li>
         <li>
            更新<a href="https://developer.apple.com/library/prerelease/content/documentation/Swift/Conceptual/Swift_Programming_Language/Functions.html#//apple_ref/doc/uid/TP40014097-CH10-ID169">默认参数值</a>一节，现在默认参数不能在调用时候重新排序。
        </li>
         <li>
            更新<a href="https://developer.apple.com/library/prerelease/content/documentation/Swift/Conceptual/Swift_Programming_Language/Attributes.html#//apple_ref/doc/uid/TP40014097-CH35-ID347">属性</a>章节中关于属性参数使用分号的说明。
        </li>
         <li>
            增加<a href="https://developer.apple.com/library/prerelease/content/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/doc/uid/TP40014097-CH34-ID531">重新抛出函数和方法</a>一节中关于在 catch 代码块中抛出错误的重新抛出函数的信息。
        </li>
 			<li>
            增加<a href="https://developer.apple.com/library/prerelease/content/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/doc/uid/TP40014097-CH32-ID547">Selector 表达式</a>一节中关于访问 Objective-C 中 Selector 的 getter 和 setter 的信息。
        </li>
        <li>
            增加<a href="https://developer.apple.com/library/prerelease/content/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/doc/uid/TP40014097-CH34-ID361">类型别名声明</a>一节，标明函数类型作为参数类型必须使用括号包裹。
        </li>
         <li>
            增加<a href="https://developer.apple.com/library/prerelease/content/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/doc/uid/TP40014097-CH31-ID449">函数类型</a>一节中关于泛型类型别名和在协议内使用类型别名的信息。
        </li>
         <li>
            更新<a href="https://developer.apple.com/library/prerelease/content/documentation/Swift/Conceptual/Swift_Programming_Language/Attributes.html#//apple_ref/doc/uid/TP40014097-CH35-ID347">属性</a>章节，标明 @IBAction，@IBOutlet 和 @NSManaged 隐式含有 @objc 属性。
        </li>
         <li>
            增加<a href="https://developer.apple.com/library/prerelease/content/documentation/Swift/Conceptual/Swift_Programming_Language/Attributes.html#//apple_ref/doc/uid/TP40014097-CH35-ID348">声明属性</a>一节中关于 @GKInspectable 的信息。
        </li>
         <li>
            更新<a href="https://developer.apple.com/library/prerelease/content/documentation/Swift/Conceptual/Swift_Programming_Language/Protocols.html#//apple_ref/doc/uid/TP40014097-CH25-ID284">可选协议要求</a>一节中关于只能在与 Objective-C 交互的代码中才能使用可选协议要求的信息。
        </li>
<li>
            删除<a href="https://developer.apple.com/library/prerelease/content/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/doc/uid/TP40014097-CH34-ID362">函数声明</a>一节中关于显式使用 let 关键字作为函数参数的信息。
        </li>
        <li>
            删除<a href="https://developer.apple.com/library/prerelease/content/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/doc/uid/TP40014097-CH33-ID428">语句</a>一节中关于 Boolean 协议的信息， 现在这个协议已经被 Swift 标准库删除。
        </li>
        <li>
            更正<a href="https://developer.apple.com/library/prerelease/content/documentation/Swift/Conceptual/Swift_Programming_Language/Attributes.html#//apple_ref/doc/uid/TP40014097-CH35-ID348">声明</a>一节中关于 @NSApplicationMain 协议的信息。
        </li>
		</ul>
	</td>
	</tr>
    <tr>
    <td scope="row">2016-03-21</td>
    <td><ul class="list-bullet">
        <li>
            更新至 Swift 2.2。
        </li>
        <li>
            增加了<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/doc/uid/TP40014097-CH33-ID539">编译配置语句</a>一节中关于如何根据 Swift 版本进行条件编译。
        </li>
        <li>
            增加了<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/doc/uid/TP40014097-CH32-ID400">显示成员表达式</a>一节中关于如何区分只有参数名不同的方法和构造器的信息。
        </li>
        <li>
            增加了<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/doc/uid/TP40014097-CH32-ID547">选择器表达式</a>一节中针对 Objective-C 选择器的 <code>#selector</code> 语法。
        </li>
        <li>
            更新了<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Generics.html#//apple_ref/doc/uid/TP40014097-CH26-ID189">关联类型</a>和<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/doc/uid/TP40014097-CH34-ID374">协议关联类型</a>声明，使用 <code>associatedtype</code> 关键词修改了对于关联类型的讨论。
        </li>
        <li>
            更新了<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Initialization.html#//apple_ref/doc/uid/TP40014097-CH18-ID224">可失败构造器</a>一节中关于当构造器在实例完全初始化之前返回 <code>nil</code>的相关信息。
        </li>
        <li>
            增加了<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/BasicOperators.html#//apple_ref/doc/uid/TP40014097-CH6-ID70">比较运算符</a>一节中关于比较元组的信息。
        </li>
        <li>
            增加了<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/doc/uid/TP40014097-CH30-ID413">关键字和标点符号</a>一节中关于使用关键字作为外部参数名的信息。
        </li>
        <li>
            增加了<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/doc/uid/TP40014097-CH30-ID413">声明特性</a>一节中关于<code>@objc</code>特性的讨论，并指出枚举(Enumeration)和枚举用例(Enumaration Case)。
        </li>
        <li>
            增加了<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/doc/uid/TP40014097-CH30-ID418">操作符</a>一节中对于自定义运算符的讨论包含了<code>.</code>。
        </li>
        <li>
            增加了<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/doc/uid/TP40014097-CH34-ID531">重新抛出错误的函数和方法</a>一节中关于重新抛出错误函数不能直接抛出错误的笔记。
        </li>
        <li>
            增加了<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Properties.html#//apple_ref/doc/uid/TP40014097-CH14-ID262">属性观察器</a>一节中关于当作为 in-out 参数传递属性时，属性观察器的调用行为。
        </li>
        <li>
            增加了<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/GuidedTour.html#//apple_ref/doc/uid/TP40014097-CH2-ID1">Swift 初见</a>一节中关于错误处理的内容。
        </li>
        <li>
            更新了<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/AutomaticReferenceCounting.html#//apple_ref/doc/uid/TP40014097-CH20-ID53">弱引用</a>一节中的图片用以更清楚的展示重新分配过程。
        </li>
        <li>
            删除了 C 语言风格的 <code>for</code> 循环，<code>++</code> 前缀和后缀运算符，以及<code>--</code> 前缀和后缀运算符。
        </li>
        <li>
            删除了对变量函数参数和柯里化函数的特殊语法的讨论。
        </li>
        </ul>
    </td>
  </tr>
</tbody>
</table>

<a name="swift_2_1"></a>
### Swift 2.1 更新

<table class="graybox" border="0" cellspacing="0" cellpadding="5">
<thead>
    <tr>
        <th scope="col" width="100">发布日期</th>
        <th scope="col">语法变更记录</th>
    </tr>
</thead>
<tbody>
    <tr>
    <td scope="row">2015-10-20</td>
    <td><ul class="list-bullet">
        <li>
            更新至 Swift 2.1。
        </li>
        <li>
            更新了<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/StringsAndCharacters.html#//apple_ref/doc/uid/TP40014097-CH7-ID292">字符串插值(String Interprolation)</a>和<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/doc/uid/TP40014097-CH30-ID417">字符串字面量(String Literals)</a>小节，现在字符串插值可包含字符串字面量。
        </li>
        <li>
            增加了在<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Closures.html#//apple_ref/doc/uid/TP40014097-CH11-ID546">非逃逸闭包(Nonescaping Closures)</a>一节中关于 <code>@noescape</code> 属性的相关内容。
        </li>
        <li>
            更新了<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Attributes.html#//apple_ref/doc/uid/TP40014097-CH35-ID348">声明特性(Declaration Attributes)</a>和<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/doc/uid/TP40014097-CH33-ID539">编译配置语句(Build Configuration Statement)</a>小节中与 tvOS 相关的信息。
        </li>
        <li>
            增加了 <a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/doc/uid/TP40014097-CH34-ID545">In-Out 参数(In-Out Parameters)</a>小节中与  in-out 参数行为相关的信息。
        </li>
        <li>
            增加了在<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/doc/uid/TP40014097-CH32-ID544">捕获列表(Capture Lists)</a>一节中关于指定闭包捕获列表被捕获时捕获值的相关内容。
        </li>
        <li>
            更新了通过<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/OptionalChaining.html#//apple_ref/doc/uid/TP40014097-CH21-ID248">可选链式调用访问属性(Accessing Properties Through Optional Chaining)</a>一节，阐明了如何通过可选链式调用进行赋值。
        </li>
        <li>
            改进了<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Closures.html#//apple_ref/doc/uid/TP40014097-CH11-ID543">自闭包(Autoclosure)</a>一节中对自闭包的讨论。
        </li>
        <li>
            在<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/GuidedTour.html#//apple_ref/doc/uid/TP40014097-CH2-ID1">Swift 初见(A Swift Tour)</a>一节中更新了一个使用<code>??</code>操作符的例子。
        </li>
        </ul>
    </td>
  </tr>
</tbody>
</table>

<a name="swift_2_0"></a>
### Swift 2.0 更新

<table class="graybox" border="0" cellspacing="0" cellpadding="5">
<thead>
    <tr>
        <th scope="col" width="100">发布日期</th>
        <th scope="col">语法变更记录</th>
    </tr>
</thead>
<tbody>
    <tr>
    <td scope="row">2015-09-16</td>
    <td><ul class="list-bullet">
        <li>
            更新至 Swift 2.0。
        </li>
        <li>
            增加了对于错误处理相关内容，包括 <a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/ErrorHandling.html#//apple_ref/doc/uid/TP40014097-CH42-ID508">错误处理</a>一章、<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/doc/uid/TP40014097-CH33-ID533">Do 语句</a>、<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/doc/uid/TP40014097-CH33-ID518">Throw 语句</a>、<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/doc/uid/TP40014097-CH33-ID532">Defer 语句</a>以及<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/doc/uid/TP40014097-CH32-ID516">try 运算符</a> 的多个小节。
        </li>
        <li>
            更新了<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/ErrorHandling.html#//apple_ref/doc/uid/TP40014097-CH42-ID509">表示并抛出错误</a>一节，现在所有类型均可遵循 <code>ErrorType</code> 协议。
        </li>
        <li>
            增加了<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/ErrorHandling.html#//apple_ref/doc/uid/TP40014097-CH42-ID542">将错误转换成可选值</a>一节 <code>try?</code> 关键字的相关信息。
        </li>
        <li>
            增加了<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Enumerations.html#//apple_ref/doc/uid/TP40014097-CH12-ID145">枚举</a>一章的<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Enumerations.html#//apple_ref/doc/uid/TP40014097-CH12-ID536">递归枚举</a>一节和<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/doc/uid/TP40014097-CH34-ID351">声明</a>一章的<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/doc/uid/TP40014097-CH34-ID365">任意类型用例的枚举</a>一节中关于递归枚举的内容。
        </li>
        <li>
            增加了<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/ControlFlow.html#//apple_ref/doc/uid/TP40014097-CH9-ID120">控制流</a>一章中a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/ControlFlow.html#//apple_ref/doc/uid/TP40014097-CH9-ID523">检查 API 可用性</a>一节和<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/doc/uid/TP40014097-CH33-ID428">语句</a>一章中<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/doc/uid/TP40014097-CH33-ID522">可用性条件</a>一节中关于 API 可用性检查的内容。
        </li>
        
        <li>
            增加了<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/ControlFlow.html#//apple_ref/doc/uid/TP40014097-CH9-ID120">控制流</a>一章的<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/ControlFlow.html#//apple_ref/doc/uid/TP40014097-CH9-ID525">早期退出</a>一节和<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/doc/uid/TP40014097-CH33-ID428">语句</a>一章的<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/doc/uid/TP40014097-CH33-ID524">guard语句</a>中关于新 <code>guard</code> 语句的内容。
        </li>
        <li>
            增加了<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Protocols.html#//apple_ref/doc/uid/TP40014097-CH25-ID267">协议</a>一章中<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Protocols.html#//apple_ref/doc/uid/TP40014097-CH25-ID521">协议扩展</a>一节中关于协议扩展的内容。
        </li>
        <li>
            增加了<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/AccessControl.html#//apple_ref/doc/uid/TP40014097-CH41-ID3">访问控制</a>一章中<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/AccessControl.html#//apple_ref/doc/uid/TP40014097-CH41-ID519">单元测试 target 的访问级别</a>一节中关于单元测试的访问控制相关的内容。
        </li>
        <li>
            增加了<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Patterns.html#//apple_ref/doc/uid/TP40014097-CH36-ID419">模式</a>一章中<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Patterns.html#//apple_ref/doc/uid/TP40014097-CH36-ID520">可选模式</a>一节中的新可选模式。
        </li>
        <li>
            更新了 <a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/ControlFlow.html#//apple_ref/doc/uid/TP40014097-CH9-ID126">Repeat-While</a> 一节中关于<code>repeat-while</code>循环的信息。
        </li>
        <li>
            更新了<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/StringsAndCharacters.html#//apple_ref/doc/uid/TP40014097-CH7-ID285">字符串和字符</a>一章，现在<code>String</code>在 Swift 标准库中不再遵循<code>CollectionType</code>协议。
        </li>
        <li>
            增加了<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/TheBasics.html#//apple_ref/doc/uid/TP40014097-CH5-ID314">打印常量和变量</a>一节中关于新 Swift 标准库中关于 <code>print(_:separator:terminator)</code> 的信息。
        </li>
        <li>
            增加了<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Enumerations.html#//apple_ref/doc/uid/TP40014097-CH12-ID145">枚举</a>一章中<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Enumerations.html#//apple_ref/doc/uid/TP40014097-CH12-ID535">原始值的隐式赋值</a>一节和<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/doc/uid/TP40014097-CH34-ID351">声明</a>一章的<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/doc/uid/TP40014097-CH34-ID366">包含原始值类型的枚举</a>一节中关于包含<code>String</code>原始值的枚举用例的行为。
        </li>
        <li>
            增加了<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Closures.html#//apple_ref/doc/uid/TP40014097-CH11-ID543">自闭包</a>一节中关于<code>@autoclosure</code>特性的相关信息，包括它的<code>@autoclosure(escaping)</code>形式。
        </li>
        <li>
            更新了<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Attributes.html#//apple_ref/doc/uid/TP40014097-CH35-ID348">声明特性</a>一节中关于<code>@avaliable</code>和<code>warn_unused_result</code>特性的相关内容。
        </li>
        <li>
            更新了<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Attributes.html#//apple_ref/doc/uid/TP40014097-CH35-ID350">类型特性</a>一节中关于<code>@convention</code>特性的相关信息。
        </li>
        <li>
            增加了<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/TheBasics.html#//apple_ref/doc/uid/TP40014097-CH5-ID333">可选绑定</a>一节中关于使用<code>where</code>子句进行多可选绑定的内容。
        </li>
        <li>
            增加了<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/StringsAndCharacters.html#//apple_ref/doc/uid/TP40014097-CH7-ID292">字符串字面量</a>一节中关于在编译时使用 <code>+</code> 运算符凭借字符串字面量的相关信息。
        </li>
        <li>
            增加了<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/doc/uid/TP40014097-CH31-ID455">元类型</a>一节中关于元类型值的比较和使用它们通过构造器表达式构造实例。
        </li>
        <li>
            增加了<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/TheBasics.html#//apple_ref/doc/uid/TP40014097-CH5-ID336">断言调试</a>一节中关于用户定义断言是被警用的相关内容。
        </li>
        <li>
            更新了<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Attributes.html#//apple_ref/doc/uid/TP40014097-CH35-ID348">声明特性</a>一节中，对<code>@NSManaged</code>特性的讨论，现在这个特性可以被应用到一个确定实例方法。
        </li>
        <li>
            更新了<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Functions.html#//apple_ref/doc/uid/TP40014097-CH10-ID171">可变参数</a>一节，现在可变参数可以声明在函数参数列表的任意位置中。
        </li>
        <li>
            增加了<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Initialization.html#//apple_ref/doc/uid/TP40014097-CH18-ID229">重写可失败构造器</a>一节中，关于非可失败构造器相当于一个可失败构造器通过父类构造器的结果进行强制拆包的相关内容。
        </li>
        <li>
            增加了<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/doc/uid/TP40014097-CH34-ID365">任意类型用例的枚举</a>一节中关于枚举用例作为函数的内容。
        </li>
        <li>
            增加了<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/doc/uid/TP40014097-CH32-ID399">构造器表达式</a>一节中关于显式引用一个构造器的内容。
        </li>
        <li>
            更新了<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/doc/uid/TP40014097-CH33-ID538">编译控制语句</a>一节中关于编译信息以及行控制语句的相关信息。
        </li>
        <li>
            更新了<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Types.html#//apple_ref/doc/uid/TP40014097-CH31-ID455">元类型</a>一节中关于如何从元类型值中构造类实例。
        </li>
        <li>
            更新了<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/AutomaticReferenceCounting.html#//apple_ref/doc/uid/TP40014097-CH20-ID53">弱引用</a>一节中关于弱引用作为缓存的显存的不足。
        </li>
        <li>
            更新了<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/StringsAndCharacters.html#//apple_ref/doc/uid/TP40014097-CH7-ID292">类型特性</a>一节，提到了存储型特性其实是懒加载。
        </li>
        <li>
            更新了<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Properties.html#//apple_ref/doc/uid/TP40014097-CH14-ID264">捕获类型</a>一节，阐明了变量和常量在闭包中如何被捕获。
        </li>
        <li>
            更新了<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Attributes.html#//apple_ref/doc/uid/TP40014097-CH35-ID348">声明特性</a>一节用以描述如何在类中使用<code>@objc</code>关键字。
        </li>
        <li>
            增加了<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/ErrorHandling.html#//apple_ref/doc/uid/TP40014097-CH42-ID512">错误处理</a>一节中关于执行<code>throw</code>语句的性能的讨论。增加了 Do 语句一节中相似的信息。
        </li>
        <li>
            更新了<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/doc/uid/TP40014097-CH33-ID533">类型特性</a>一节中关于类、结构体和枚举的存储型和计算型特性的信息。
        </li>
        <li>
            更新了<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Statements.html#//apple_ref/doc/uid/TP40014097-CH33-ID441">Break 语句</a>一节中关于带标签的 break 语句。
        </li>
        <li>
            更新了<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Properties.html#//apple_ref/doc/uid/TP40014097-CH14-ID262">属性观察器</a>一节，阐明了<code>willSet</code>和<code>didSet</code>观察器的行为。
        </li>
        <li>
            增加了<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/AccessControl.html#//apple_ref/doc/uid/TP40014097-CH41-ID5">访问级</a>一节中关于<code>private</code>作用域访问的相关信息。
        </li>
        <li>
            增加了<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/AutomaticReferenceCounting.html#//apple_ref/doc/uid/TP40014097-CH20-ID53">弱引用</a>一节中关于若应用在垃圾回收系统和 ARC 之间的区别。
        </li>
        <li>
            更新了<a href="https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/StringsAndCharacters.html#//apple_ref/doc/uid/TP40014097-CH7-ID295">字符串字面量中特殊字符</a>一节中对 Unicode 标量更精确的定义。
        </li>
        </ul>
    </td>
  </tr>
</tbody>
</table>


<a name="swift_1_2"></a>
### Swift 1.2 更新
<a name="xcode6_3"></a>

<table class="graybox" border="0" cellspacing="0" cellpadding="5">
<thead>
    <tr>
        <th scope="col" width="100">发布日期</th>
        <th scope="col">语法变更记录</th>
    </tr>
</thead>
<tbody>
    <tr>
    <td scope="row">2015-4-8</td>
    <td><ul class="list-bullet">
            <li>
                更新至 Swift 1.2。
            </li>
            <li>
                Swift现在自身提供了一个<code>Set</code>集合类型，更多信息请看<a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/CollectionTypes.html#//apple_ref/doc/uid/TP40014097-CH8-ID484">集合</a>

            </li>
            <li>
                <code>@autoclosure</code>现在是一个参数声明的属性，而不是参数类型的属性。这里还有一个新的参数声明属性<code>@noescape</code>。更多信息，请看<a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Attributes.html#//apple_ref/doc/uid/TP40014097-CH35-ID348">属性声明</a>
            </li>
            <li>
                对于类型属性和方法现在可以使用<code>static</code>关键字作为声明描述符，更多信息，请看<a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/doc/uid/TP40014097-CH34-ID483">类型变量属性</a>
            </li>
            <li>
                Swift现在包含一个<code>as?</code>和<code>as!</code>的向下可失败类型转换运算符。更多信息，请看<a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Protocols.html#//apple_ref/doc/uid/TP40014097-CH25-ID283">协议遵循性检查</a>
            </li>
            <li>
                增加了一个新的指导章节，它是关于<a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/StringsAndCharacters.html#//apple_ref/doc/uid/TP40014097-CH7-ID495">字符串索引</a>的
            </li>
            <li>
                从<a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/AdvancedOperators.html#//apple_ref/doc/uid/TP40014097-CH27-ID37">溢出运算符</a>中移除了溢出除运算符(&/)和求余溢出运算符(&%)。
            </li>
            <li>
                更新了常量和常量属性在声明和构造时的规则，更多信息，请看<a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/doc/uid/TP40014097-CH34-ID355">常量声明</a>
            </li>
            <li>
                更新了字符串字面量中Unicode标量集的定义，请看<a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/StringsAndCharacters.html#//apple_ref/doc/uid/TP40014097-CH7-ID295">字符串字面量中的特殊字符</a>
            </li>
            <li>
                更新了<a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/BasicOperators.html#//apple_ref/doc/uid/TP40014097-CH6-ID73">区间运算符</a>章节来提示当半开区间运算符含有相同的起止索引时，其区间为空。
            </li>
            <li>
                更新了<a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Closures.html#//apple_ref/doc/uid/TP40014097-CH11-ID104">闭包引用类型</a>章节来澄清对于变量的捕获规则
            </li>
            <li>
                更新了<a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/AdvancedOperators.html#//apple_ref/doc/uid/TP40014097-CH27-ID38">值溢出</a>章节来澄清有符号整数和无符号整数的溢出行为
            </li>
            <li>
                更新了<a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/doc/uid/TP40014097-CH34-ID369">协议声明</a>章节来澄清协议声明时的作用域和成员
            </li>
            <li>
                更新了<a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/AutomaticReferenceCounting.html#//apple_ref/doc/uid/TP40014097-CH20-ID58">捕获列表</a>章节来澄清对于闭包捕获列表中的弱引用和无主引用的使用语法。
            </li>
            <li>
                更新了<a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/doc/uid/TP40014097-CH30-ID418">运算符</a>章节来明确指明一些例子来说明自定义运算符所支持的特性，如数学运算符，各种符号，Unicode符号块等
            </li>
            <li>
            在函数作用域中的常量声明时可以不被初始化，它必须在第一次使用前被赋值。更多的信息，请看<a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/doc/uid/TP40014097-CH34-ID355">常量声明</a>
        </li>
        <li>
            在构造器中，常量属性有且仅能被赋值一次。更多信息，请看<a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Initialization.html#//apple_ref/doc/uid/TP40014097-CH18-ID212">在构造过程中给常量属性赋值</a>
        </li>
        <li>
            多个可选绑定现在可以在<code>if</code>语句后面以逗号分隔的赋值列表的方式出现，更多信息，请看<a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/TheBasics.html#//apple_ref/doc/uid/TP40014097-CH5-ID333">可选绑定</a>
        </li>
        <li>
            一个<a link="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/doc/uid/TP40014097-CH32-ID405">可选链表达式</a>必须出现在后缀表达式中
        </li>
        <li>
            协议类型转换不再局限于<code>@obj</code>修饰的协议了
        </li>
        <li>
            在运行时可能会失败的类型转换可以使用<code>as?</code>和<code>as!</code>运算符，而确保不会失败的类型转换现在使用<code>as</code>运算符。更多信息，请看<a link="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Expressions.html#//apple_ref/doc/uid/TP40014097-CH32-ID388">类型转换运算符</a>
        </li>
        </ul>
    </td>
  </tr>
</tbody>
</table>


<a name="swift_1_1"></a>
### Swift 1.1 更新

<table class="graybox" border="0" cellspacing="0" cellpadding="5">
<thead>
    <tr>
        <th scope="col" width="100">发布日期</th>
        <th scope="col">语法变更记录</th>
    </tr>
</thead>
<tbody>
    <tr>
    <td scope="row">2014-10-16</td>
    <td><ul class="list-bullet">
        <li>
            更新至 Swift 1.1。
        </li>
        <li>
            增加了关于<a href="http://developer.apple.com/library/etc/redirect/xcode/devtools/419f35/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html">失败构造器(Failable Initializers)</a>的完整章节。
        </li>
        <li>
            增加了协议中关于失败构造器要求的描述。
        </li>
        <li>
            常量和变量的 <code>Any</code> 类型现可以包含函数实例。更新了关于 <code>Any</code> 相关的示例来展示如何在 <code>switch</code> 语句中如何检查并转换到一个函数类型。
        </li>
        <li>
            带有原始值的枚举类型增加了一个<code>rawValue</code>属性替代<code>toRaw()</code>方法，同时使用了一个以<code>rawValue</code>为参数的失败构造器来替代<code>fromRaw()</code>方法。更多的信息，请看<a href="http://developer.apple.com/library/etc/redirect/xcode/devtools/419f35/documentation/Swift/Conceptual/Swift_Programming_Language/Enumerations.html">原始值(Raw Values)</a>和<a href="http://developer.apple.com/library/etc/redirect/xcode/devtools/419f35/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html">带原始值的枚举类型(Enumerations with Cases of a Raw-Value Type)</a>部分。
        </li>
        <li>
            自定义运算符现在可以包含`?`字符，更新的<a href="http://developer.apple.com/library/etc/redirect/xcode/devtools/419f35/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html">运算符(Operators)</a>章节描述了改进后的规则，并且从<a href="http://developer.apple.com/library/etc/redirect/xcode/devtools/419f35/documentation/Swift/Conceptual/Swift_Programming_Language/AdvancedOperators.html">自定义运算符(Custom Operators)</a>章节删除了重复的运算符有效字符集合
        </li>
        
        </ul>
    </td>
  </tr>
</tbody>
</table>

<a name="swift_1_0"></a>
### Swift 1.0 更新

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
        <li>
            发布新的文档用以详述 Swift 1.0，苹果公司针对iOS和OS X应用的全新开发语言。
        </li>
        <li>
            在章节协议中，增加新的小节：<a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Protocols.html#//apple_ref/doc/uid/TP40014097-CH25-XID_397">对构造器的规定（Initializer Requirements）</a>
        </li>
        <li>
            在章节协议中，增加新的小节：<a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Protocols.html#//apple_ref/doc/uid/TP40014097-CH25-XID_409">类专属协议（class-only protocols）</a>
        </li>
        <li>
            <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/TheBasics.html#//apple_ref/doc/uid/TP40014097-CH5-XID_494">断言(assertions)</a>现在可以使用字符串内插语法，并删除了文档中有冲突的注释
        </li>
        <li>
            更新了<a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/StringsAndCharacters.html#//apple_ref/doc/uid/TP40014097-CH7-XID_428">连接字符串和字符（Concatenating Strings and Characters）</a>小节来说明一个事实，那就是字符串和字符不能再用<code>+</code>号运算符或者复合加法运算符<code>+=</code>相互连接，这两种运算符现在只能用于字符串之间相连。请使用<code>String</code>类型的<code>append</code>方法在一个字符串的尾部增加单个字符
        </li>
        <li>
            在<a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Attributes.html#//apple_ref/doc/uid/TP40014097-CH35-XID_516">声明特性（Declaration Attributes）</a>章节增加了关于<code>availability</code>特性的一些信息
        </li>
        <li>
            <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/TheBasics.html#//apple_ref/doc/uid/TP40014097-CH5-XID_478">可选类型（Optionals）</a> 若有值时，不再隐式的转换为 <code>true</code>，同样，若无值时，也不再隐式的转换为 <code>false</code>, 这是为了避免在判别 optional <code>Bool</code> 的值时产生困惑。 替代的方案是，用<code>==</code> 或 <code>!=</code> 运算符显式地去判断Optinal是否是 <code>nil</code>，以确认其是否包含值。
        </li>
        <li>
            Swift新增了一个 <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/BasicOperators.html#//apple_ref/doc/uid/TP40014097-CH6-XID_124" data-id="//apple_ref/doc/uid/TP40014097-CH6-XID_124">Nil合并运算符（Nil Coalescing Operator）</a> (<code>a ?? b</code>), 该表达式中，如果Optional <code>a</code>的值存在，则取得它并返回，若Optional <code>a</code>为<code>nil</code>，则返回默认值 <code>b</code>
        </li>
        <li>
            更新和扩展 <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/StringsAndCharacters.html#//apple_ref/doc/uid/TP40014097-CH7-XID_434">字符串的比较（Comparing Strings）</a> 章节，用以反映和展示'字符串和字符的比较'，以及'前缀（prefix）/后缀(postfix)比较'都开始基于扩展字符集(extended grapheme clusters)规范的等价比较.
        </li>
        <li>
            现在，你可以通过 <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/OptionalChaining.html#//apple_ref/doc/uid/TP40014097-CH21-XID_356">可选链（Optional Chaining）</a>来：给属性设值，将其赋给一个下标脚注（subscript）; 或调用一个变异（mutating）方法或运算符。对此，章节——<a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/OptionalChaining.html#//apple_ref/doc/uid/TP40014097-CH21-XID_364">通过可选链访问属性（Accessing Properties Through Optional Chaining）</a>的内容已经被相应的更新。而章节——<a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/OptionalChaining.html#//apple_ref/doc/uid/TP40014097-CH21-XID_361">通过可选链调用方法（Calling Methods Through Optional Chaining</a>中，关于检查方法调用是否成功的例子，已被扩展为展示如何检查一个属性是否被设值成功。

        </li>
        <li>
            在章节可选链中，增加一个新的小节 <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/OptionalChaining.html#//apple_ref/doc/uid/TP40014097-CH21-XID_364">访问可选类型的下标脚注（Accessing Subscripts of Optional Type）</a>
        </li>
        <li>
            更新章节 <a href="../chapter2/04_Collection_Types.md#访问和修改数组" data-id="访问和修改数组">访问和修改数组(Accessing and Modifying an Array)</a> 以标示：从该版本起，不能再通过<code>+=</code> 运算符给一个数组添加一个新的项。. 对应的替代方案是, 使<code>append</code> 方法, 或者通过<code>+=</code>运算符来添加一个<b>只有一个项的数组</b>（single-item Array）.</li>
        <li>
            添加了一个提示：在 <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/BasicOperators.html#//apple_ref/doc/uid/TP40014097-CH6-XID_126">范围运算符（Range Operators）</a>中，比如， <code>a...b</code> 和 <code>a..&lt;b</code> ，起始值<code>a</code>不能大于结束值<code>b</code>.
        </li>
        <li>
            重写了<a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Inheritance.html#//apple_ref/doc/uid/TP40014097-CH17-XID_293">继承（Inheritance）</a> 这一章：删除了本章中关于构造器重写的介绍性报道；转而将更多的注意力放到新增的部分——子类的新功能，以及如何通过重写（overrides）修改已有的功能。另外，小节 <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Inheritance.html#//apple_ref/doc/uid/TP40014097-CH17-XID_301">重写属性的Getters和Setters（Overriding Property Getters and Setters）</a> 中的例子已经被替换为展示如何重写一个 <code>description</code> 属性. (而关于如何在子类的构造器中修改继承属性的默认值的例子，已经被移到 <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Inheritance.html#//apple_ref/doc/uid/TP40014097-CH17-XID_293">构造过程（Initialization）</a> 这一章.)
        </li>
        <li>
            更新了 <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Initialization.html#//apple_ref/doc/uid/TP40014097-CH18-XID_331">构造器的继承与重写（Initializer Inheritance and Overriding）</a> 小节以标示： 重写一个特定的构造器必须使用 <code>override</code> 修饰符.
        </li>
        <li>
            更新 <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Initialization.html#//apple_ref/doc/uid/TP40014097-CH18-XID_339"> Required构造器（Required Initializers）</a> 小节以标示：<code>required</code> 修饰符现在需要出现在所有子类的required构造器的声明中, 而required构造器的实现，现在可以仅从父类自动继承。
        </li>
        <li>
            中置（Infix）的 <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/AdvancedOperators.html#//apple_ref/doc/uid/TP40014097-CH27-XID_80">运算符函数（Operator Functions）</a> 不再需要<code>@infix</code> 属性.
        </li>
        <li>
            <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/RevisionHistory.html#//apple_ref/doc/uid/TP40014097-CH40-XID_1631">前置和后置运算符(Prefix and Postfix Operators)</a>的<code>@prefix</code> 和 <code>@postfix</code> 属性，已变更为 <code>prefix</code> 和 <code>postfix</code> 声明修饰符（declaration modifiers）.
        </li>
            <li>
            增加一条注解：当Prefix和postfix运算符被作用于同一个操作数时，关于<a href="AdvancedOperators.html#//apple_ref/doc/uid/TP40014097-CH27-XID_81" data-id="//apple_ref/doc/uid/TP40014097-CH27-XID_81">前置和后置运算符(Prefix and Postfix Operators)</a>的顺序(postfix运算符会先被执行)
        </li>
        <li>
            在运算符函数（Operator functions）中， <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/AdvancedOperators.html#//apple_ref/doc/uid/TP40014097-CH27-XID_82" data-id="//apple_ref/doc/uid/TP40014097-CH27-XID_82">组合赋值运算符（Compound Assignment Operators）</a> 不再使用 <code>@assignment</code> 属性来定义函数.
        </li>
        <li>
            在这个版本中，在定义<a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/AdvancedOperators.html#//apple_ref/doc/uid/TP40014097-CH27-XID_85">自定义操作符（Custom Operators）</a> 时，<b>修饰符（Modifiers）的出现顺序发生变化</b>。比如， 现在，你该编写 <code>prefix operator</code>， 而不是 <code>operator prefix</code>.
        </li>
        <li>
            增加信息：关于<code>dynamic</code> 声明修饰符（declaration modifier），于章节 <a href="Declarations.html#//apple_ref/doc/uid/TP40014097-CH34-XID_705" data-id="//apple_ref/doc/uid/TP40014097-CH34-XID_705">声明修饰符（Declaration Modifiers）</a>.
        </li>
        <li>
            增加信息：<a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/doc/uid/TP40014097-CH30-XID_886">字面量Literals</a> 的类型推导（type inference）
        </li>
        <li>
            为章节<a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/doc/uid/TP40014097-CH34-XID_597">Curried Functions</a>添加了更多的信息.
        </li>
        <li>
            加入新的章节  <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/AccessControl.html#//apple_ref/doc/uid/TP40014097-CH41-XID_29">权限控制（Access Control）</a>.
        </li>
        <li>
            更新了章节 <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/StringsAndCharacters.html#//apple_ref/doc/uid/TP40014097-CH7-XID_413">字符串和字符（Strings and Characters）</a> 用以表明，在Swift中，<code>Character</code> 类型现在代表的是扩展字符集(extended grapheme cluster)中的一个Unicode，为此，新增了小节 <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/StringsAndCharacters.html#//apple_ref/doc/uid/TP40014097-CH7-XID_431">Extended Grapheme Clusters</a> 。同时，为小节 <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/StringsAndCharacters.html#//apple_ref/doc/uid/TP40014097-CH7-XID_428">Unicode标量（Unicode Scalars）</a> 和 <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/StringsAndCharacters.html#//apple_ref/doc/uid/TP40014097-CH7-XID_434">字符串比较（Comparing Strings）</a>增加了更多内容.
        </li>
        <li>
            更新章节<a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/doc/uid/TP40014097-CH30-XID_856">字符串字面量（String Literals）</a>：在一个字符串中，Unicode标量（Unicode scalars） 以 <code>\u{n}</code>的形式来表示, <code>n</code> 是一个最大可以有8位的16进制数（hexadecimal digits）
        </li>
        <li>
            <code>NSString</code> <code>length</code> 属性已被映射到Swift的内建 <code>String</code>类型。（注意，这两属性的类型是<code>utf16Count</code>,而非 <code>utf16count</code>）.
        </li>
        <li>
            Swift的内建 <code>String</code> 类型不再拥有 <code>uppercaseString</code> 和 <code>lowercaseString</code> 属性.其对应部分在章节 <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/StringsAndCharacters.html#//apple_ref/doc/uid/TP40014097-CH7-XID_413">字符串和字符（Strings and Characters）</a>已经被删除, 并且各种对应的代码用例也已被更新.
        </li>
        <li>
            加入新的章节  <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Initialization.html#//apple_ref/doc/uid/TP40014097-CH18-XID_315">没有外部名的构造器参数（Initializer Parameters Without External Names）</a>.
        </li>
        <li>
            加入新的章节  <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Initialization.html#//apple_ref/doc/uid/TP40014097-CH18-XID_339"> Required构造器（Required Initializers）</a>.
        </li>
        <li>
            加入新的章节 <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Functions.html#//apple_ref/doc/uid/TP40014097-CH10-XID_252">可选元祖（函数）返回类型 （Optional Tuple Return Types）</a>.
        </li>
        <li>
            更新章节 <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/TheBasics.html#//apple_ref/doc/uid/TP40014097-CH5-XID_453">类型标注（Type Annotations）</a> ：多个相关变量可以用“类型标注”（type annotaion）在同一行中声明为同一类型。
        </li>
        <li>
             <code>@optional</code>, <code>@lazy</code>, <code>@final</code>,  <code>@required</code> 等关键字被更新为 <code>optional</code>, <code>lazy</code>, <code>final</code>, <code>required</code> <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Declarations.html#//apple_ref/doc/uid/TP40014097-CH34-XID_705">参见声明修饰符（Declaration Modifiers）</a>.
        </li>
        <li>
            更新整本书 —— 引用 <code>..&lt;</code> 作为<a href="BasicOperators.html#//apple_ref/doc/uid/TP40014097-CH6-XID_128" data-id="//apple_ref/doc/uid/TP40014097-CH6-XID_128">区间运算符（Half-Open Range Operator）</a> (取代原先的<code>..</code> ).
        </li>
        <li>
            更新了小节 <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/CollectionTypes.html#//apple_ref/doc/uid/TP40014097-CH8-XID_185">读取和修改字典（Accessing and Modifying a Dictionary）</a>：  <code>Dictionary</code> 现在早呢更加了一个 Boolean型的属性： <code>isEmpty</code>
        </li>
        <li>
            解释了哪些字符（集）可被用来定义<a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/AdvancedOperators.html#//apple_ref/doc/uid/TP40014097-CH27-XID_85">自定义操作符 （Custom Operators）</a>
        </li>
        <li>
            <code>nil</code> 和布尔运算中的 <code>true</code> 和 <code>false</code> 现在被定义为字面量<a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/LexicalStructure.html#//apple_ref/doc/uid/TP40014097-CH30-XID_886">Literals</a>.
        </li>
        <li>
            Swift 中的数组 （<code>Array</code>） 类型从现在起具备了完整的值语义。具体信息被更新到 <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/CollectionTypes.html#//apple_ref/doc/uid/TP40014097-CH8-XID_170">集合的可变性（Mutability of Collections）</a> 和 <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/CollectionTypes.html#//apple_ref/doc/uid/TP40014097-CH8-XID_172">数组（Arrays）</a> 两小节，以反映这个新的变化. 此外，还解释了如何 <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/ClassesAndStructures.html#//apple_ref/doc/uid/TP40014097-CH13-XID_150">给Strings, Arrays和Dictionaries进行赋值和拷贝 （Assignment and Copy Behavior for Strings, Arrays, and Dictionaries）</a>.
        </li>
        <li>
            <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/CollectionTypes.html#//apple_ref/doc/uid/TP40014097-CH8-XID_173">数组类型速记语法（Array Type Shorthand Syntax）</a> 从 <code>SomeType[]</code>.更新为<code>[SomeType]</code>
        </li>
        <li>
            加入新的小节：<a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/CollectionTypes.html#//apple_ref/doc/uid/TP40014097-CH8-XID_182">字典类型的速记语法（Dictionary Type Shorthand Syntax)</a>.： <code>[KeyType: ValueType]</code>.
        </li>
        <li>
            加入新的小节：<a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/CollectionTypes.html#//apple_ref/doc/uid/TP40014097-CH8-XID_189">字典键类型的哈希值（Hash Values for Dictionary Key Types)</a>.
        </li>
        <li>
            例子 <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Closures.html#//apple_ref/doc/uid/TP40014097-CH11-XID_154">闭包表达式 (Closure Expressions)</a> 中使用新的全局函数 <code>sorted</code> 取代原先的全局函数 <code>sort</code> 去展示如何返回一个全新的数组.
        </li>
        <li>
            更新关于 <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Initialization.html#//apple_ref/doc/uid/TP40014097-CH18-XID_320">结构体逐一成员构造器 （Memberwise Initializers for Structure Types）</a> 的描述：即使结构体的成员<b>没有默认值</b>，逐一成员构造器也可以自动获得。
        </li>
        <li>
            <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/BasicOperators.html#//apple_ref/doc/uid/TP40014097-CH6-XID_128">区间运算符（Half-Open Range Operator）</a>由<code>..</code>更新到<code>..&lt;</code>
        </li>
        <li>
            添加一个例子 <a href="https://developer.apple.com/library/prerelease/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Generics.html#//apple_ref/doc/uid/TP40014097-CH26-XID_285">扩展一个泛型（Extending a Generic Type）</a>
        </li>
        </ul>
    </td>
    </tr>
</tbody>
</table>
