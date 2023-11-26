# 原生Javascript

@zkc 

## 什么是 JavaScript？

> *Java 和* *JavaScript* *的关系，就类似于雷锋和雷峰塔、老婆和老婆饼、印度和印度尼西亚、周杰和周杰伦之间的关系——没有实际关系。*

JavaScript 是一种**弱类型**的面向对象的脚本语言，可以给前端页面添加逻辑和交互（利用 Node.js，也可以使用 JavaScript 编写后端）。

- MDN：https://developer.mozilla.org/en-US/docs/Learn/JavaScript
- Modern Javascript Tutorial：https://javascript.info/

需要关注的地方（包括但不限于）：

- 数据类型（String, Array, Map, Set, Object, JSON）如何定义、有哪些方法。
- null 和 undefined
- 浅拷贝与深拷贝
- 箭头函数
- 函数闭包
- 回调函数
- const / let / var 的区别
- promise
- async / await
- fetch
- EMCAScript, DOM, BOM
- DOM 树与 DOM 操作（在这里与 HTML/CSS 结合）
- 如何在 HTML 中写入并执行 JS 代码？如何处理事件？如何用 JS 实现动画？

想要安装一个 JS 解释器？你的浏览器就是！按 F12 打开开发者视图，在 console 中直接输入 JS 语句吧！

## JavaScript 的 COC

可以详见：[代码规范及 CoC](https://xn4zlkzg4p.feishu.cn/wiki/wikcntVu8KDTr7LLRwxHT4z3L2f) 

这里给出一个（集中华传统文化大成的）反例：

- https://zh.javascript.info/ninja-code

## HTTP

在前端，一般会使用 JS 处理网络请求。这时 HTTP 相关知识必不可少。

- https://developer.mozilla.org/en-US/docs/Web/HTTP

关注一下：

- HTTP Request Methods (GET/POST/PUT/……)
- HTTP Headers
- HTTP Status Response Code
- CORS

可以稍作了解，之后应该会有更详细的内训。

## 附录：JavaScript Holy Trinity

即：一个经典的js笑话

![img](https://xn4zlkzg4p.feishu.cn/space/api/box/stream/download/asynccode/?code=ODRlYTdmMGRiMjRmZjUzODJmYzNhZmMxNTA2NjY3M2ZfZ0NhemxwWWtQZ05nRGZkdEVwTjVlVk1HdTlucmtwb1BfVG9rZW46Ym94Y25CTkk0RFk2NFB3eXl0elB1WXlXRU1kXzE2OTg0MDkyMTQ6MTY5ODQxMjgxNF9WNA)

## 思考题

### 【1】

观察以下两段代码，它们的执行结果分别是什么（提示：闭包）？在这两段代码中，分别产生了几个闭包，闭包分别是在哪一行产生的？

```js
function func1(){
    var a = 2;
    setInterval(function(){
        a++;
        console.log(a);
    }, 2000);
} 
func1();
func1();
```

```js
function func1(){
    var a = 2;
    var f = function(){
        a--;
        console.log(a);
    }
    return f;
} 
var f = func1();
f();
f();
```

### 【2】

上面的两段代码是否可能造成内存泄漏？请说明原因并指出可行的避免内存泄漏的方法。