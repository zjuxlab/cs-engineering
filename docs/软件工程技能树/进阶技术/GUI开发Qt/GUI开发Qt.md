---
title: GUI开发：Qt
slug: GUI开发：Qt
sidebar_position: 1
---


# GUI开发：Qt

Author：赵龙庆

> c++GUI开发的神（

# Intro

Qt 是一个跨平台的C++应用程序开发框架。它提供给开发者建立图形用户界面所需的功能，广泛用于开发GUI程序，也可用于开发非GUI程序。Qt是完全面向对象的，很容易扩展，并且允许真正地组件编程。Qt使用标准的C++和特殊的代码生成扩展（称为元对象编译器Meta Object Compiler, moc）以及一些宏。

基本上，Qt 同 X11上的GTK、Motif、Openwin和Windows上的MFC，OWL，VCL，ATL 是同类型的东西，但是 Qt 支持更多的平台（包括Microsoft Windows、GNU/Linux、Mac OS X、Android、iOS、WinCE、UNIX家族等），面向对象且模块化程度更高（Qt 提供了一种称为 signals/slots 的安全类型来替代 callback，这使得各个元件之间的协同工作变得十分简单），丰富的API（Qt 包括多达 250个以上的 C++ 类，还提供基于模板的 collections， serialization， file， I/O device， directory management， date/time 类。甚至还包括正则表达式的处理功能），支持 2D/3D 图形渲染，支持 OpenGL、大量的开发文档、XML支持等。使用Qt开发的软件，相同的代码可以在任何支持的平台上编译运行，而不需要修改源代码。它会自动根据平台的不同，表现平台特有的图形界面风格。

经过多年发展，Qt不但拥有了完备的C++图形库，而且近年来的版本逐渐集成了数据库、OpenGL库、多媒体库、网路、脚本库、XML库、WebKit库等等，其核心库也加入了进程间通信、多线程等模块，极大地丰富了Qt开发大规模复杂跨平台应用程序的能力，真正意义上实现了其研发宗旨“Code Less; Create More; Deploy Anywhere.”

# 下载

> http://c.biancheng.net/view/3851.html

# 使用

## 图形用户界面

Qt的图形用户界面的基础是QWidget。Qt中所有类型的GUI组件如按钮、标签、工具栏等都派生自QWidget，而QWidget本身则为QObject的子类。Widget负责接收鼠标，键盘和来自窗口系统的其他事件，并描绘了自身显示在屏幕上。每一个GUI组件都是一个widget，widget还可以作为容器，在其内包含其他Widget。

![](/assets/YNMgbso2hoTwAIxozLOcQgjHnXg.png)

左侧的列表是QT的控件列表，列表中的所有控件都可以放在QWidget上。QWidget显示能力包含了透明化等功能。设置透明化，有几种方式，我们这里用到的是设置样式表的方式，下面的例子是设置QLineEdit控件透明无边框，如图：

![](/assets/Jr6ObLgqVoNp5BxH9uacHBsPnId.png)

Qt提供一种托管机制，当Widget于创建时指定父对象，就可把自己的生命周期交给上层对象管理，当上层对象被释放时，自己也被释放。确保对象不再使用时都会被删除。这个登陆窗口中的所有控件的父widget都是这个窗口，所以在窗口被销毁时，所有控件也同时被销毁，不需要自己去控制。所以析构函数的实现函数中可以不进行处理。

## 信号与槽机制（Signals and Slots）

Qt利用信号与槽（signals/slots）机制取代传统的callback来进行对象之间的沟通。当操作事件发生的时候，对象会发射一个信号（signal）；而槽（slot）则是一个函数接受特定信号并且运行槽本身设置的动作。信号与槽之间，则通过QObject的静态方法connect来链接。

例如：

```cpp
connect(ui.pushButton_close, SIGNAL(clicked()), this, SLOT(closeSlot()));
```

当关闭按钮被点击时，会触发QPushButton的clicked()信号，信号被发射之后，会连接到接收者定义的槽函数中，这里是closeSlot()；信号在任何运行点上皆可发射，甚至可以在槽里再发射另一个信号，信号与槽的链接不限定为一对一的链接，一个信号可以链接到多个槽或多个信号链接到同一个槽，甚至信号也可连接到信号。

信号与槽机制也确保了低耦合性，发送信号的类并不知道是哪个槽会接受，也就是说一个信号可以调用所有可用的槽。此机制会确保当在”连接”信号和槽时，槽会接受信号的参数并且正确运行。

## 布局管理

布局管理类用于描述一个应用程序的用户界面中的Widget是如何放置。当视窗缩放时，布局管理器会自动调整widget的大小、位置或是字号，确保他们相对的排列和用户界面整体仍然保有可用性。

Qt内置的布局管理类型有：QHBoxLayout、QVBoxLayout、QGridLayout和QFormLayout。这些类继承自QLayout，但QLayout非继承自QWidget而是直接源于QObject。他们负责widget的几何管理。想要创建更复杂的版面配置，可以继承QLayout来自定义版面配置管理员。

![](/assets/GIH6bcvBgosCORxlLWGcLfSPnMh.png)

上图中被红框圈起来的，是页面中的布局，布局可以手写，这里只展示设计师中处理的布局。布局分为四种，这里用到了简单的两种，横向布局（QHBoxLayout）向布局（QVBoxLayout）。如上图所示。

