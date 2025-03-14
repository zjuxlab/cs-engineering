---
title: Unity
slug: Unity
sidebar_position: 0
---


# Unity

Author：陈岩

# 游戏基础知识点

# 生命周期

## 脚本加载

<div class="callout callout-bg-2 callout-border-2">
<div class='callout-emoji'>❗</div>
<p>同一脚本中保证三者顺序；不同脚本间不保证Awake/OnEnable之间顺序，但保证Start在所有OnEnable之后</p>
</div>

1. Awake
2. OnEnable
3. Start

## 程序退出

1. OnApplicationQuit
2. OnDisable
3. OnDestroy

## 刷新

- Update 每一帧调用
- FixedUpdate 用于物理和动画运行，和帧速率不一定同步

# 对象结构

https://docs.unity3d.com/Manual/ScriptingImportantClasses.html

## Object

> class UnityEngine.Object;

所有Unity中对象的基类

### 空值行为

Object重载了`(bool)obj, ==, !=` 的运算符

Object不支持使用`??, ?.`两个判空运算符

如果对象已经完成初始化，则`(bool)obj && obj != null`

> GameObject加入场景被认为完成初始化
> GameObject构造函数会自动添加进场景

## GameObject

表示可以加入场景结构中的物体对象

### Activeness

- activeSelf 关于父节点是否激活
- activeInHierarchy 从SceneRoot一路到自己是否都激活
- SetActive 仅设定activeSelf的值

## Component

挂载在GameObject上的组件；除了MonoBehavior都是Unity预制组件

## MonoBehavior

挂载在GameObject上的脚本组件；

# 引擎基础知识

## 坐标系

- 左手系：$i \times j = -k$
- 右手系：$i \times j = k$
- Unity是左手系，以UI Overlay为例，XY对应是屏幕空间，左下角是原点；Z越小图层越靠上

![](/assets/H3VUbgd2cotFVnxmxalc84Qgnwd.png)

