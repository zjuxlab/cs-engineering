---
title: Fabric.js
slug: Fabric.js
sidebar_position: 2
---


# Fabric.js

Author：NA

## 一、Fabric.js是什么?

Fabric.js是一个流行的JavaScript库，用于在HTML5 canvas上创建和操作2D图形。它提供了丰富的功能，使开发者可以轻松地在Web应用程序中绘制图形、创建图形编辑器、设计绘图应用等。

想要了解 fabric.js 是什么，最快的方式是[打开官网看首页的案例](http://fabricjs.com/)。

## 二、为什么需要Fabric.js？

当我们想在画布上画个简单的形状时，使用 Canvas 不会觉得有什么繁琐。但当画布上需要任何形式的互动、绘制复杂的图形或在特定情况需要改变图片的时候，使用原生 Canvas API 将会变得很困难。而 Fabric 旨在解决这个问题。

#### 原生canvas VS Fabric.js

下面2段代码，在没怎么写注释的情况下，相信你会更愿意去阅读 Fabric.js 版的代码。

```js
// 原生canvas
const cnv = document.getElementById('c') // 获取页面中的canvas元素
const ctx = cnv.getContext('2d')
ctx.moveTo(50, 50)
ctx.lineTo(200, 50)
ctx.lineTo(200, 120)
ctx.lineTo(50, 120)
ctx.lineTo(50, 50)
ctx.fillStyle = '#aa96da'
ctx.fill()

// Fabric.js
const canvas = new fabric.Canvas('c') // 获取页面中的canvas元素
const rect = new fabric.Rect({
  top: 50,
  left: 50,
  width: 150,
  height: 70,
  fill: '#aa96da'
})
canvas.add(rect)
```

## 三、学习资料

官方教程：[http://fabricjs.com/](http://fabricjs.com/)

中文教程：[https://k21vin.gitee.io/fabric-js-doc/](https://k21vin.gitee.io/fabric-js-doc/)

原理与源码解析：[https://keelii.com/2021/05/08/fabricjs-internals](https://keelii.com/2021/05/08/fabricjs-internals)

## 四、如何使用

#### 安装

```js
yarn add fabric -S
#or
npm i fabric -S
```

也可以在官网下载最新 js 文件,通过 script 标签引入

#### 使用

```js
<!-- html -->
<canvas id="canvas" width="500" height="500"></canvas>
```

#### 绘制图形

Fabric 提供了 7 种基础形状：

- fabric.Circle (圆)
- fabric.Ellipse (椭圆)
- fabric.Line (线)
- fabric.Polyline (多条线绘制成图形)
- fabric.triangle (三角形)
- fabric.Rect (矩形)
- fabric.Polygon (多边形)

```js
// js

//引入fabric
import { fabric } from "fabric";

// 创建一个fabric实例
let canvas = new fabric.Canvas("canvas"); //可以通过鼠标方法缩小,旋转
// or
// let canvas = new fabric.StaticCanvas("canvas");//没有鼠标交互的fabric对象

// 创建一个矩形对象
let rect = new fabric.Rect({
    left: 200, //距离左边的距离
    top: 200, //距离上边的距离
    fill: "green", //填充的颜色
    width: 200, //矩形宽度
    height: 200, //矩形高度
});

// 将矩形添加到canvas画布上
canvas.add(rect);
```

#### 绘制图片

主要有通过 url 和 img 标签绘制两种方式

```js
import { fabric } from "fabric";
let canvas = new fabric.Canvas("canvas");
//通过url绘制图片
fabric.Image.fromURL(
    //本地图片需要通过require来引入,require("./xxx.jpeg")
    "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.thaihot.com.cn%2Fuploadimg%2Fico%2F2021%2F0711%2F1625982535739193.jpg&refer=http%3A%2F%2Fimg.thaihot.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630940858&t=e1d24ff0a7eaeea2ff89cedf656a9374",
    (img) => {
        img.scale(0.5);
        canvas.add(img);
    }
);
//也可以通过标签绘制
let img = document.getElementById("img");
let image = new fabric.Image(img, {
    left: 100,
    top: 100,
    opacity: 0.8,
});
canvas.add(image);
```

#### 事件

fabric 中通过 on 方法来初始化事件，off 方法用来删除事件。

常用的事件有以下：

- “mouse:down” 鼠标被按下
- “object:add” 对象被添加
- “after:render” 渲染完成

```js
import { fabric } from "fabric";
let canvas = new fabric.Canvas("canvas");
canvas.on("mouse:down", function(options) {
    canvas.clear();
    let text = new fabric.Text("你点我啦~", {
        left: 200,
        top: 200,
    });
    canvas.add(text);
    console.log(options.e.clientX, options.e.clientY);
});
canvas.on("mouse:up", function(options) {
    this.text = "你没点我0.0";
    canvas.clear();
    let text = new fabric.Text("你没点我0.0", {
        left: 200,
        top: 200,
    });
    canvas.add(text);
    console.log(options.e.clientX, options.e.clientY);
});
```

#### 自由绘画

Fabric canvas 的 isDrawingMode 属性设置为 true 即可实现自由绘制模式.
这样画布上的点击和移动就会被立刻解释为铅笔或刷子。

```js
import { fabric } from "fabric";
let canvas = new fabric.Canvas("canvas");
canvas.isDrawingMode = true;
canvas.freeDrawingBrush.color = "blue";
canvas.freeDrawingBrush.width = 5;
```

<b>Fabric.js还有很多功能，就不在这一一罗列了，感兴趣的小伙伴可以去自行了解。</b>

## 五、学习建议

学习 fabric.js 一定要跟着文档敲一遍代码，要建立起自己的“demo库”。 

建立“demo库”可以在你日常工作开发中快速查找自己写过的代码。

很多好看的、复杂的案例，其实都是通过多个简单的demo，把多个简单的api组合而成的。

所以，一定要跟着敲！一定要建立自己的“demo库”！

