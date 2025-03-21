---
title: MVC
slug: MVC
sidebar_position: 0
---


# MVC

Author: 马寿祥

# 简介

<b>MVC模式</b>（Model–view–controller）是软件工程中的一种软件架构模式，把软件系统分为三个基本部分：模型（Model）、视图（View）和控制器（Controller）。

![](/assets/KSWGbOhXpoe3i1xV9n5coTyRnBb.png)

- 模型（Model） - 程序员编写程序应有的功能（实现算法等等）、数据库专家进行数据管理和数据库设计(可以实现具体的功能)。
- 视图（View） - 界面设计人员进行图形界面设计。
- 控制器（Controller）- 负责转发请求，对请求进行处理。

# 组件的互动

- 模型（Model） 用于封装与应用程序的业务逻辑相关的数据以及对数据的处理方法。“ Model ”有对数据直接访问的权力，例如对数据库的访问。“Model”不依赖“View”和“Controller”，也就是说， Model 不关心它会被如何显示或是如何被操作。但是 Model 中数据的变化一般会通过一种刷新机制被公布。为了实现这种机制，那些用于监视此 Model 的 View 必须事先在此 Model 上注册，从而，View 可以了解在数据 Model 上发生的改变。（比如：观察者模式）
- 视图（View）能够实现数据有目的的显示（理论上，这不是必需的）。在 View 中一般没有程序上的逻辑。为了实现 View 上的刷新功能，View 需要访问它监视的数据模型（Model），因此应该事先在被它监视的数据那里注册。
- 控制器（Controller）起到不同层面间的组织作用，用于控制应用程序的流程。它处理事件并作出响应。“事件”包括用户的行为和数据 Model 上的改变。

# 优点

在最初的JSP网页中，像数据库查询语句(SQL query)这样的数据层代码和像HTML这样的表示层代码是混在一起。虽然有着经验比较丰富的开发者会将数据从表示层分离开来，但这样的良好设计通常并不是很容易做到的，实现它需要精心地计划和不断的尝试。MVC可以从根本上强制性地将它们分开。尽管构造MVC应用程序需要一些额外的工作，但是它带给我们的好处是毋庸置疑的。

首先，多个 View 能共享一个 Model 。如今，同一个Web应用程序会提供多种用户界面，例如用户希望既能够通过浏览器来收发电子邮件，还希望通过手机来访问电子邮箱，这就要求Web网站同时能提供Internet界面和WAP界面。在MVC设计模式中， Model 响应用户请求并返回响应数据，View 负责格式化数据并把它们呈现给用户，业务逻辑和表示层分离，同一个 Model 可以被不同的 View 重用，所以大大提高了代码的可重用性。

其次，Controller 是自包含（self-contained,指高独立内聚）的物件，与 Model 和 View 保持相对独立，所以可以方便的改变应用程序的数据层和业务规则。例如，把数据库从MySQL移植到Oracle，或者把RDBMS数据源改变成LDAP数据源，只需改变 Controller 即可。一旦正确地实现了控制器，不管数据来自数据库还是LDAP服务器，View 都会正确地显示它们。由于MVC模式的三个模块相互独立，改变其中一个不会影响其他两个，所以依据这种设计思想能构造良好的少互扰性的构件。

此外，Controller 提高了应用程序的灵活性和可配置性。Controller 可以用来连接不同的 Model 和 View 去完成用户的需求，也可以构造应用程序提供强有力的手段。给定一些可重用的 Model 、 View 和Controller 可以根据用户的需求选择适当的 Model 进行处理，然后选择适当的的 View 将处理结果显示给用户。

# 示例

这里有一个通过 JavaScript 所实现的基于 MVC 模型，需要注意的是：MVC 不是一种技术，而是一种理念。

```js
/** 模拟 Model, View, Controller */
var M = {}, V = {}, C = {};

/** Model 负责存放资料 */
M.data = "hello world";

/** View 负责将资料输出给用户 */
V.render = (M) => { alert(M.data); }

/** Controller 作为连接 M 和 V 的桥梁 */
C.handleOnload = () => { V.render(M); }

/** 在网页读取的时候呼叫 Controller */
window.onload = C.handleOnload;
```

下面的框图展示了MVC模式的简单设计

![](/assets/A4Qdb6C2tom0Jqx3GqmcNjprnT6.png)

再以我某门课程大作业框架举例

![](/assets/AjEabzYckoPjGZxHR9fcu5vOndb.png)

# 总结

总之，MVC是一种思想，降低了代码的耦合程度，使之易于维护。

# 参考：

https://zh.m.wikipedia.org/zh-hans/MVC

https://www.runoob.com/design-pattern/mvc-pattern.html

