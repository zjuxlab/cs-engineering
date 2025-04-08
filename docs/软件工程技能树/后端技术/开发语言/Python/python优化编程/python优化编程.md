---
title: python优化编程
slug: python优化编程
sidebar_position: 4
---


# python优化编程

Author: NA

读书笔记 of <em>Effective Python: 90 Specific Ways to Write Better Python, 2nd Edition</em>

确实香！

当然还有一些个人的体会。

# 常见范式：让别人见了直呼Pythonic

- 字符串的处理：输入(bytes-&gt;str)→处理(str)→输出(str-&gt;bytes)
    - 也就是<b>除了IO部分一律使用str</b>可以减少很多事

- 多用f-string，而不是format等经典方法：f-string格式化的可读性好得多，且冗余代码较少
- <b>不要吝啬在函数内部定义辅助函数：到处用lambda表达式和if-else三元表达式并不会显得很帅</b>
- 可以试试恰当运用赋值表达式（<b>海象运算符:=</b>）来简化代码
- 用enumerate去遍历，而非range取下标i再访问a[i]
- <b>熟练运用Unpacking，尤其是单星号和双星号</b>
    - 复习：想想*args和**kwargs是什么意思？
    - 个人案例：
    ![](/assets/Eq7HbUaEIo2JXExwPvbcXRStnIb.png)

- <b>不要用for-else和while-else结构：我觉得这是python设计的一个败笔</b>
    - 这带来了语义上的歧义
    - 看看隔壁Rust能break出去一个值，这是好的

# List/Dict技巧

# 优雅的函数

## 装饰器

## 闭包

# 推导&生成器

# 类与接口

- C-like的结构体https://stackoverflow.com/questions/35988/c-like-structures-in-python

<div class="callout callout-bg-2 callout-border-2">
<div class='callout-emoji'>💡</div>
<p>别惦记你那get set了，Java来的收收味</p>
<p>请多使用__set__,<strong>get</strong>,@property,以及帅气的descriptor</p>
</div>

## 类装饰器

# 元类与高级的Duck Typing

# 并发并行

## 协程

## AsyncIO

# 设计模式的Python实现

## 单例模式（线程安全？）

## 工厂模式（Python很方便）

