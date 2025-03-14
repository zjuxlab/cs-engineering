---
title: Cocos
slug: Cocos
sidebar_position: 2
---


# Cocos

Author：陈儒、陈岩、李嘉诚

# 概述

## 历史变迁

- Cocos2d-x
    - 使用C++开发的跨平台native游戏引擎
    - 提供了js和lua的binding
    - 同时旧版本提供了原生h5+js渲染模式

- Cocos Creator
    - 集合了2D和3D游戏
    - 将2dx中场景设计、动画设计、资源管理等内容通过GUI进行了托管
    - 2D部分内核和2dx架构相近，代码开发上区别不大
    - 可以编译为原生浏览器网页

## 版本选择

Creator的2D部分可以认为是给Cocos2dx加入了一个好用的编辑器，而API部分及其相似

只不过Creator比2dx多了一个组件设计模式，而不是通过类继承和成员变量来手工实现元素组合；从这一点上，Creator游戏架构更类似于Unity 

