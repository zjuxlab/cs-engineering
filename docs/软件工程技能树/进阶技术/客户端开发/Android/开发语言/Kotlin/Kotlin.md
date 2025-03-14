---
title: Kotlin
slug: Kotlin
sidebar_position: 0
---


# Kotlin

Author：廖瑞翔

> Kotlin（俄语：Котлин）是俄罗斯的一座岛屿，位于圣彼得堡以西约30公里处，形状狭长，扼守着俄罗斯进出波罗的海的航道。

# 什么是 Kotlin

Kotlin 是一种在 Java 虚拟机上运行的静态类型编程语言，被称之为 Android 世界的 Swift，由 JetBrains 的圣彼得堡开发团队设计开发并开源。在Google I/O 2017中，Google 宣布 Kotlin 成为 Android 官方开发语言。

Kotlin 可以编译成 Java 字节码，也可以编译成 JavaScript，方便在没有 JVM 的设备上运行。

# Kotlin 的使用

## 安装

可以在IntelliJ IDEA、Android Studio、命令行中运行Kotlin，具体安装方法自行搜索即可

## 基本语法

### 数据类型和运算符

<b>基本数据类型</b>

<table header_row="1">
<colgroup>
<col width="386"/>
<col width="412"/>
</colgroup>
<thead>
<tr><th><p>类型</p></th><th><p>备注</p></th></tr>
</thead>
<tbody>
<tr><td><p>Double</p></td><td><p>64位</p></td></tr>
<tr><td><p>Float</p></td><td><p>32位</p></td></tr>
<tr><td><p>Long</p></td><td><p>长整型以大写的 L 结尾：val LNum=999_99_9999L</p></td></tr>
<tr><td><p>Int</p></td><td><p>32位</p></td></tr>
<tr><td><p>Short</p></td><td><p>16位</p></td></tr>
<tr><td><p>Byte</p></td><td><p>1个字节（8位），取值范围 -128 ~ 127</p></td></tr>
<tr><td><p>Char</p></td><td></td></tr>
<tr><td><p>Boolean</p></td><td></td></tr>
</tbody>
</table>

数字常量中间可以加下划线_使其更易读，如999_99_9999L，这些下划线本身没有含义

Read-only local variables are defined using the keyword `val`. They can be assigned a value only once.

```kotlin
val a: Int = 1  // immediate assignment
val b = 2   // `Int` type is inferred
val c: Int  // Type required when no initializer is provided
c = 3       // deferred assignment
```

Variables that can be reassigned use the `var` keyword.

```kotlin
var x = 5 // `Int` type is inferred
x += 1
```

<b>数组和字符串</b>

https://kotlinlang.org/docs/arrays.html

https://kotlinlang.org/docs/strings.html

<b>in和区间</b>

运算符和其他语言都大同小异，这里只强调一下in运算符，同时把Kotlin中的区间一起介绍了

使用 in 运算符来检测某个数字是否在指定区间内，区间格式为 x..y（既包含x，也包含y）

```kotlin
for (i in 1..4) print(i) // 输出“1234”

for (i in 4..1) print(i) // 什么都不输出

if (i in 1..10) { // 等同于 1 <= i && i <= 10
    println(i)
}

// 使用 step 指定步长
for (i in 1..4 step 2) print(i) // 输出“13”

for (i in 4 downTo 1 step 2) print(i) // 输出“42”


// 使用 until 函数排除结束元素
for (i in 1 until 10) {   // i in [1, 10) 排除了 10
     println(i)
}
```

### 基础语句

输出：

```kotlin
println("Hello world!")//println自带换行，类似python中的print
    print(42)//print不自动换行
```

条件之if：

```kotlin
var max = a
if (a < b) max = b

if (a > b) {
    max = a
} else {
    max = b
}

// kotlin中没有三目运算符，可以在表达式中用下方的if else来替代
max = if (a > b) a else b

// 可以在表达式中使用else if
val maxLimit = 1
val maxOrLimit = if (maxLimit > a) maxLimit else if (a > b) a else b

//if 表达式中也可包含代码块，代码块中最后一个表达式的值作为这个代码块的值
val max = if (a > b) {
    print("Choose a")
    a
} else {
    print("Choose b")
    b
}
```

条件之when（没写错，确实是条件，Kotlin里的when有点像switch）：

```kotlin
when (x) {
    1 -> print("x == 1")
    2 -> print("x == 2")
    else -> {
        print("x is neither 1 nor 2")
    }
}

//when 也可以用来取代 if-else if链
//如果不提供参数，所有的分支条件都是简单的布尔表达式，而当一个分支的条件为真时则执行该分支
when {
    x.isOdd() -> print("x is odd")
    x.isEven() -> print("x is even")
    else -> print("x is funny")
}
```

### 函数

格式：（Function parameters are defined using Pascal notation - <em>name</em>: <em>type</em>.）

```kotlin
//格式
fun <函数名> (<形参1>:<数据类型>,<形参2>:<数据类型>,...)<返回值类型>{
    //函数主体
}

//实例1
fun sum(a: Int, b: Int): Int {
    return a + b
}

//实例2：函数主体可以是一个表达式，它的返回值类型会被自动推断
fun sum(a: Int, b: Int) = a + b

//实例3：无返回值，下方两者等价
fun printSum(a: Int, b: Int): Unit {
    println("sum of $a and $b is ${a + b}")
}
fun printSum(a: Int, b: Int) {
    println("sum of $a and $b is ${a + b}")
}
```

lambda表达式

https://kotlinlang.org/docs/lambdas.html

### 类

类的定义

```kotlin
class Person { /*...*/ }

class Empty
//也可以定义空类
```

构造函数

```kotlin
//主构造函数
class Person constructor(firstName: String) { /*...*/ }

class Person(firstName: String) { /*...*/ }
//如果构造器没有注解和有可见度修饰符，这时constructor关键字可以省略
//可见性修饰符有四个：private、protected、internal和public，默认为public


//次构造函数
//次构造函数可以不止一个
class Person(val name: String) {
    constructor (name: String, age:Int) : this(name) {
        // 如果有主构造函数，则次构造函数必须有this(主构造函数中的参数)
    }
}
```

具体定义细节和抽象类见下

https://kotlinlang.org/docs/classes.html

### 其他重要的点

- 内联函数
- 操作符重载
- 泛型

可以参见下面的这篇博客

https://juejin.cn/post/7034110955571609607

