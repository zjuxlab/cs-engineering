---
title: ES6和ES Next
slug: ES6和ES Next
sidebar_position: 1
---


# ES6和ES Next

## Why ES6

想象一下2014年的JavaScript开发场景：

```
// ES5时代的代码
var counter = 0;
var increment = function() {
  counter++;
  console.log('Count:', counter);
};

setTimeout(function() {
  increment();
}, 1000);
```

开发者们正面临诸多痛点：

- <b>变量作用域混乱</b>：`var`的诡异提升(hoisting)行为
- <b>回调地狱</b>：嵌套的回调函数形成"金字塔噩梦"
- <b>缺乏模块化</b>：全局命名空间污染严重
- <b>语法冗长</b>：简单操作需要大量样板代码

2015年6月，ECMAScript 2015（ES6）的发布彻底改变了这一切，堪称JavaScript历史上的"工业革命"。

举例说明，ES6在以下方面实现了进化：

- 从脚本语言到正经的编程语言：

e.g. 类定义

```
// ES5的伪类模式
function Person(name) {
  this.name = name;
}
Person.prototype.sayHi = function() {
  console.log('Hi, I\'m ' + this.name);
};

// ES6的类语法
class Person {
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    console.log(`Hi, I'm ${this.name}`);
  }
}
```

- 异步编程革命，引入promise

```
// ES5回调地狱
getData(function(a) {
  getMoreData(a, function(b) {
    getMoreData(b, function(c) {
      console.log('最终结果:', c);
    });
  });
});

// ES6 Promise
getData()
  .then(a => getMoreData(a))
  .then(b => getMoreData(b))
  .then(c => {
    console.log(`最终结果: ${c}`);
  });
```

- 模块化，避免全局污染：

```
// ES5的IIFE模式
var myModule = (function() {
  var privateVar = 42;
  return {
    publicMethod: function() { /*...*/ }
  };
})();

// ES6模块
// lib.js
const privateVar = 42;
export function publicMethod() { /*...*/ }

// main.js
import { publicMethod } from './lib';
```

## ESNext：持续进化的JavaScript

自ES6后，ECMAScript采用<b>年号制</b>（ES2016、ES2017等），每年6月发布新标准。这就像JavaScript获得了"持续交付"的能力。

### async/await：异步编程的终极形态

```
// 传统回调
function fetchData(callback) {
  fetch(url, (err, data) => {
    if (err) callback(err);
    else callback(null, data);
  });
}

// async/await时代
async function fetchData() {
  try {
    const response = await fetch(url);
    return response.json();
  } catch (err) {
    console.error('请求失败:', err);
  }
}
```

## 应用实例

- 电商网站购物车：

```
// 使用ES6+特性实现的购物车逻辑
class ShoppingCart {
  #items = new Map(); // 私有字段

  addItem(item) {
    this.#items.set(item.id, { ...item, quantity: 1 });
  }

  applyDiscount(discountCode) {
    const discount = DISCOUNT_RULES[discountCode] ?? 1;
    return [...this.#items.values()].map(item => ({
      ...item,
      price: item.price * discount
    }));
  }

  get total() {
    return [...this.#items.values()].reduce(
      (sum, item) => sum + item.price * item.quantity, 0
    );
  }
}
```

- 数据可视化：

```
// 使用ES6+处理大数据集
async function renderDashboard() {
  try {
    const [users, products] = await Promise.all([
      fetch('/api/users').then(res => res.json()),
      fetch('/api/products').then(res => res.json())
    ]);

    const stats = {
      topUsers: users
        .sort((a, b) => b.purchases - a.purchases)
        .slice(0, 5),
      productCategories: [...new Set(products.map(p => p.category))]
    };

    renderCharts(stats);
  } catch (error) {
    showErrorToast(error.message);
  }
}
```

<b>📌 学习路线：</b>

1. ES6核心新特性
    1. let/const、模板字面量
    2. 箭头函数、解构赋值、展开运算符
    3. 类与继承（class）

2. 模块化（ES Module）
3. Promise 与异步编程
4. async/await 异步语法糖
5. 新数据结构（Map、Set、WeakMap、WeakSet）
6. 高级语法（可选链 ?.、空值合并运算符 ??、BigInt等）

<b>🔗 官方教程及推荐网站：</b>

- [ES6 入门教程 - 阮一峰（强烈推荐）](https://es6.ruanyifeng.com/)
- [MDN ES6+文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference)
- [现代 JavaScript 教程 - ES6模块](https://zh.javascript.info/modules-intro)

