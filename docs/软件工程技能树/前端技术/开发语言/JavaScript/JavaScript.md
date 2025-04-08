---
title: JavaScript
slug: JavaScript
sidebar_position: 0
---


# JavaScript

## 背景

1995年，网景公司（Netscape）的工程师<b>Brendan Eich</b>被赋予了一项看似不可能的任务——<b>在10天内创造一门能让网页"活起来"的语言</b>。当时，互联网还只是静态文档的集合，就像一座座孤立的图书馆，而Eich创造的JavaScript（最初叫Mocha，后改名LiveScript）则像在这些图书馆间架起了电话线。

"当时的需求很简单，"Eich后来回忆道，"我们需要一种'胶水语言'，让设计师和兼职程序员能轻松为网页添加些小互动。"于是，JavaScript带着这些特点诞生了：

- <b>语法类似Java</b>（当时的热门语言）但更简单
- <b>动态类型</b>——不需要声明变量类型
- <b>基于原型</b>——不同于传统的类继承
- <b>首次在浏览器中直接执行</b>——无需编译

有趣的是，这门"匆忙诞生"的语言最初被专业人士视为"玩具"，却阴差阳错地因其低门槛成为了互联网民主化的关键推手。

## 为什么我们需要JavaScript？

1. 让网页从"看"变成"用"

想象2000年的电商网站：

```
<!-- 没有JavaScript的时代 -->
<form action="/checkout" method="POST">
  <input type="text" name="address">
  <input type="submit" value="提交">
</form>
```

用户每次操作都导致<b>整页刷新</b>，体验如同不断翻书。而JavaScript带来了：

- <b>即时表单验证</b>（输入错误立即提示）
- <b>动态内容加载</b>（购物车更新无需刷新）
- <b>流畅动画过渡</b>（产品图片轮播）

当亚马逊在2001年大规模采用AJAX（基于JavaScript）后，用户停留时间增加了40%，转化率提升17%，这能够体现JS的强大之处。

## 从浏览器到全栈

2009年，Ryan Dahl创造了<b>Node.js</b>，让JavaScript突破了浏览器的牢笼。这就像给自行车装上了火箭引擎：

```
// 一个简单的HTTP服务器
const http = require('http');
http.createServer((req, res) => {
  res.end('Hello World');
}).listen(3000);
```

Node.js带来了<b>革命性的影响</b>：

- <b>前端开发者也能写后端</b>（全栈开发成为可能）
- <b>npm生态系统爆发</b>（现已有超过200万个包）
- <b>实时应用成为标配</b>（如在线文档协作）

Slack、Trello等协作工具正是基于Node.js的实时能力构建。

## 在哪些情境下我们需要使用JavaScript？

- 动态Web应用

如果我们要做一个在线电子表格（如Google Sheets），那么需要支持：实时单元格更新/协作光标位置显示/公式即时计算等功能，这些功能可以由JS实现

```js
// 简化版的单元格更新逻辑
sheet.on('cellChange', (cell) => {
  updateDependentFormulas(cell);
  broadcastToCollaborators(cell);
});
```

- 服务器端应用，如Netflix的内容推荐系统，它利用JS实现基于用户观看历史的实时推荐和大规模流媒体数据处理
- 跨平台桌面应用，目前热门的编辑器Visual Studio Code就是使用Electron框架构建的，它保留了原生应用性能并且能支持数千个插件

