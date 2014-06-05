# 集合类型

Swift提供了两种集合类型用来存储批量数据，数组和字典。数组以有序列表的形式存储相同类型的对象。字典则存储无序的相同类型的对象，并提供了便于访问的唯一标示符作为索引。

数组和字典在Swift中总是明确存储的类型的。这意味着你不可以一个定义之外类型的对象，它同时也意味着你可以确保从数组和字典中取回定义之内的对象。Swift之所以使用确定的类型来存储对象，是为了让你在开发的过程中代码更加整洁，可以自动捕捉任何类型的错误。

> 小提示

> Swift的**数组类型**在使用过程中表现出不同于其他常量或者变量类型的特性。这部分信息可以查看“[可变集合](http://?)”和“[集合类型的赋值与拷贝行为](http://?)”


## 数组

数组是在一个有序列表中存储相同类型的值的集合。这些值可以重复出现在不同的位置上。

Swift的数组指定了值的类型，这是和Objective-C的**NSArray**与**NSMutableArray**类不同的，它们允许存储任意的对象到一个数组中，但也不提供它们可以返回对象的任何信息。在Swift中，这种类型被固定的规定可以使数组更明确，既可以在创建的时候明确类型，也通过推断而不明确类型。
Swift arrays are specific about the kinds of values they can store. They differ from Objective-C’s **NSArray** and **NSMutableArray** classes, which can store any kind of object and do not provide any information about the nature of the objects they return. In Swift, the type of values that a particular array can store is always made clear, either through an explicit type annotation, or through type inference, and does not have to be a class type. If you create an array of **Int** values, for example, you can’t insert any value other than **Int** values into that array. Swift arrays are type safe, and are always clear about what they may contain.

### Array Type Shorthand Syntax
The type of a Swift array is written in full as **Array<SomeType>**, where **SomeType** is the type that the array is allowed to store. You can also write the type of an array in shorthand form as **SomeType[]**. Although the two forms are functionally identical, the shorthand form is preferred, and is used throughout this guide when referring to the type of an array.

‌
### Array Literals
You can initialize an array with an array literal, which is a shorthand way to write one or more values as an array collection. An array literal is written as a list of values, separated by commas, surrounded by a pair of square brackets:

` [value 1, value 2, value 3]`

The example below creates an array called **shoppingList** to store String values:

```
var shoppingList: String[] = ["Eggs", "Milk"]
// shoppingList has been initialized with two initial items
```

The **shoppingList** variable is declared as “an array of String values”, written as **String[]**. Because this particular array has specified a value type of **String**, it is only allowed to store **String** values. Here, the shoppingList array is initialized with two String values (**"Eggs"** and **"Milk"**), written within an array literal.

> NOTE

> The **shoppingList** array is declared as a variable (with the **var** introducer) and not a constant (with the **let** introducer) because more items are added to the shopping list in the examples below.

In this case, the array literal contains two **String** values and nothing else. This matches the type of the **shoppingList** variable’s declaration (an array that can only contain **String** values), and so the assignment of the array literal is permitted as a way to initialize **shoppingList** with two initial items.






