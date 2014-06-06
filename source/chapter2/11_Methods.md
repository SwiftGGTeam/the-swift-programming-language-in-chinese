方法(Methods)
===============

方法是与某些特定类型相关联的功能/函数。类、结构体、枚举都可以定义实例方法；实例方法为指定类型的实例封装了特定的任务与功能。类、结构体、枚举也可以定义类(型)方法(type itself)；类型方法与类型自身相关联。类型方法与Objective-C中的类方法(class methods)相似。

在Swift中,结构体和枚举能够定义方法；事实上这是Swift与C/Objective-C的主要区别之一。在Objective-C中,类是唯一能定义方法的类型。在Swift中，你能够选择是否定义一个类/结构体/枚举，并且你仍然享有在你创建的类型(类/结构体/枚举)上定义方法的灵活性。

### 实例方法(Instance Methods) ###

实例方法是某个特定类、结构体或者枚举类型的实例的方法。实例方法支撑实例的功能: 或者提供方法,以访问和修改实例属性;或者提供与实例的目的相关的功能。实例方法的语法与函数完全一致，参考函数说明(a link should be here)。

实例方法要写在它所属的类型的前后括号之间。实例方法能够访问他所属类型的所有的其他实例方法和属性。实例方法只能被它所属的类的特定实例调用。实例方法不能被孤立于现存的实例而被调用。

下面是定义一个很简单的类Counter的例子(Counter能被用来对一个动作发生的次数进行计数):

```
 class Counter {
  var count = 0
  func increment() {
    count++
  }
  func incrementBy(amount: Int) {
    count += amount
  }
  func reset() {
    count = 0
  }
}
```

Counter类定理了三个实例方法：
- increment让计数器按一递增；
- incrementBy(amount: Int)让计数器按一个指定的整数值递增；
- reset将计数器重置为0。

Counter这个类还声明了一个可变属性count，用它来保持对当前计数器值的追踪。

和调用属性一样，用点语法(dot syntax)调用实例方法:

```
1| let counter = Counter()
2| // the initial counter value is 0
3| counter.increment()
4| // the counter's value is now 1
5| counter.incrementBy(5)
6| // the counter's value is now 6
7| counter.reset()
8| // the counter's value is now 0
```

### 方法的局部和外部参数名称(Local and External Parameter Names for Methods) ###

函数参数有一个局部名称(在函数体内部使用)和一个外部名称(在调用函数时使用),参考External Parameter Names一节。对于方法参数也是这样，因为方法就是函数(只是这个函数与某个类型相关联了)。但是，方法和函数的局部名称和外部名称的默认行为是不一样的。

Swift中的方法和Objective-C中的方法极其相似。像在Objective-C中一样，Swift中方法的名称通常用一个介词指向方法的第一个参数，比如：with,for,by等等。前面的Counter类的例子中incrementBy方法就是这样的。介词的使用让方法在被调用时能像一个句子一样被解读。Swift这种方法命名约定很容易落实,因为它是用不同的默认处理方法参数的方式，而不是用函数参数(来实现的)。

具体来说，Swift默认仅给方法的第一个参数名称一个局部参数名称;但是默认同时给第二个和后续的参数名称局部参数名称和外部参数名称。
这个约定与典型的命名和调用约定相匹配，这与你在写Objective-C的方法时很相似。这个约定还让expressive method调用不需要再检查/限定参数名。

看看下面这个Counter的替换版本（它定义了一个更复杂的incrementBy方法）：

```
1| class Counter {
2|   var count: Int = 0
3|   func incrementBy(amount: Int, numberOfTimes: Int) {
4|     count += amount * numberOfTimes
5|   }
6| }
```

这个incrementBy方法有两个参数： amount和numberOfTimes。默认地，Swift只把amount当作一个局部名称，但是把numberOfTimes即看作本地名称又看作外部名称。下面调用这个方法：

```
1| let counter = Counter()
2| counter.incrementBy(5, numberOfTimes: 3)
3| // counter value is now 15
```

你不必为第一个参数值再定义一个外部变量名：因为从函数名incrementBy已经能很清楚地看出它的目的/作用。但是第二个参数，就要被一个外部参数名称所限定,以便在方法被调用时让他目的/作用明确。

这种默认的行为能够有效的检查方法，比如你在参数numberOfTimes前写了个井号( # )时:

```
1| func incrementBy(amount: Int, #numberOfTimes: Int) {
2|  count += amount * numberOfTimes
3| }
```

这种默认行为使上面代码意味着：在Swift中定义方法使用了与Objective-C同样的语法风格，并且方法将以自然表达式的方式被调用。

