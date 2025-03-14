---
title: Swift
slug: Swift
sidebar_position: 7
---


# Swift

Author：江临益

# <b>简介</b>

Swift是一门跨平台的语言，立志于高效、安全的开发，从系统级到移动App（包括IOS/原生Linux）。

为了安全，它包括了高级语言的以下特点：

- 变量始终在使用前初始化。
- 检查数组索引是否存在越界错误。
- 检查整数是否溢出。
- 可选项可确保显式处理`nil`
- 内存是自动管理的。
- 错误处理允许从意外故障中进行受控恢复。

# Hello world!

![](/assets/JKV4bXfbjogqbCx6U8dctipSnnh.png)

# 资源推荐

https://docs.swift.org/swift-book/documentation/the-swift-programming-language/

## 变量和常量

在Swift中，变量和常量语法十分简洁，先用`var`或`let`标识是变量还是常量，然后可以显式指定类型，最后可以赋值：

```swift
var myVariable = 25  //变量，不显示指定类型，自动类型推断
let myConst: Double = 4.0  //常量，显式指定Double类型
var a = 2, b = 3, c = 4    //多变量
var x = 5, y: Int = 5   //最后的类型注解代表x和y都是整数
```

注意：在C++中，常量必须初始化，而在Swift中，常量可以不用初始化，不过只能为它赋值一次：

```swift
let once: Int
once = 1    //赋值
once = 2    //error
```

可以尝试使用print(_:separator:terminator)进行输出

```swift
let str = "Hello World!"
print(str)   //Hello World!
```

## 注释

和C大体相同。

不过Swift有嵌套注释：

```swift
/* 注释1开头
/* 被嵌套的注释2 */
注释1结尾 */
```

## 分号

如果在单行书写多条语句，需要加分号：

```swift
var myVariable = 2; print(myVariable)
```

## 整数

整数类型和C相似

```swift
Int Int8 Int16 Int32 Int64
UInt UInt8 UInt16 UInt32 UInt64
```

其中，`Int`和`UInt`类型与平台有关，32位平台就32位，64位平台就64位。

## 浮点数

`Float`和`Double`

## 类型推断

当你使用字面量初始化变量时，可以不显示指定变量类型，编译器会帮你推断一个合理类型：

```swift
var a = 5 //推断为Int
var b = 4 + 9.22 //推断为Double
```

## 类型转换

```swift
var a: Int = 5
print(Double(a)) //打印5.0
```

## 数字字面量

```swift
var binary = 0b11 // 3
var octal = 0o71 // 57
var hexadecimal = 0xff // 255
```

## 布尔类型

注意Int不会隐式转换为Boolean

```swift
var a = 1
if a {
    print("wrong")  //编译器会报错
}

var b = true
if b {
    print("ok")
}
```

## Optionals

设想一个情景：你需要把一个字符串强制转换为Int，但是不是所有字符串都能强制转换，所以我们需要用`Int?`来返回一个结果，这个结果要么是Optional(value)，直接unwrap就可以得到value，要么是nil。

```swift
let possibleNumber1 = "123"
let convertedNumber1: Int? = Int(possibleNumber1)
print(convertedNumber1) // Optional(123)

let possibleNumber2 = "hello"
let convertedNumber2: Int? = Int(possibleNumber2)
print(convertedNumber2) // nil
```

## nil

nil值用来对应Optional类型的默认值

## 操作符

