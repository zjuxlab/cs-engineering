---
title: Node.js基础
slug: Node.js基础
sidebar_position: 0
---


# Node.js基础

Author:周楷程/叶耀阳

# 简单速通Node.js

## Node.js是什么

JavaScript，但是后端。

本质上是<b>Chrome的V8引擎单独拿出来后运行Node.js</b>

你可能不信，但JS（或者说更早的mocha）诞生之初就是一种后端语言：在前端大放异彩是一种意外——而V8引擎的出现是一种文艺复兴。

## 为什么Node.js

好写，生态非常好。

业务逻辑的速度真的没那么重要：否则现在所有人都该用Rust写服务器了不是吗。

不是数量级的差距一般不那么重要，作为参考，Node.js的性能大概是Java/Go的一半。

在国外(~2023)，Node.js的使用度高于Golang.

Node.js 的基于事件循环的异步机制天然和网络编程契合。

## Node.js环境

其实前端的同学应该已经大量使用过。

npm的安装非常简单，在此不赘叙。

重点说一下目录结构：

```bash
.
├── package.json                                                # 依赖包
├── package-lock.json
├── node_modules
└── src                                                         # 源码目录
```

如果你需要在本目录中的node_modules里安装，并把依赖写入package(-lock).json，则需要`--save`

- Npm &gt;= 5.0.0 后默认就等同此选项

package.json 储存了依赖哪些包，以及版本；那为何还需要package-lock.json呢？

因为即使指定了依赖模块的版本，间接依赖的包的版本仍是不能确定的。也就是如果需要部署时环境中包版本完全一致，我们应该使用package-lock.json

<b>同理，在自动部署时应该使用npm ci而非npm install</b>

## Node.js 模块与包

node 必须模块化开发，node 自带的所有内容都是以模块的形式出现的。

因为不像浏览器的js，有DOM做依附，操作DOM：Node.js必须自力更生，所以他可以操作文件、网络等。

### 模块化语法

导出

每一个 JS 文件天生自带一个变量叫做 module，表示的是当前自己这个模块的所有信息，每一个文件默认导出一个对象。

语法:如果你想向默认导出的对象内添加成员，module.exports.属性名 = 属性值，exports.属性名 = 属性值

node 的 每一个 JS 文件, 内部天生自带一个 变量 叫做 exports。变量内部存放的是 指向 module.exports 这个对象的地址。

如果你想修改这个默认导出的内容module.exports = 值

导入

每一个 JS 文件天生自带一个方法叫做 require()

语法: require('地址')

注意: 如果地址书写的时候, 文件后缀是 .js, 那么可以省略后缀不写。

返回值: 该文件的 module.exports (该文件向外暴露的内容)。

### 模块分类

自定义模块：自己写的 JS 文件。

内置模块：node 给我们提供的模块, 直接引入使用即可。

第三方模块：由其他人写好上传到某一个仓库内(npm)，我们去这个仓库内(npm)下载到本地, 然后引入使用。

node 内置模块 fs：node 给出的内置模块, 专门用来操作 文件/文件夹。

1.异步读取文件

a.语法: fs.readFile(文件路径, 配置参数, 回调函数)

b.参数:

- i.文件路径: 必填
- ii.配置参数: 不写默认是 buffer 可以手动配置为 utf-8
- iii.回调函数: 必填, 接受两个参数, 第一个为报错信息, 第二个为正确读取到的文件的内容(字符串格式的)

```js
fs.readFile("./index1.txt", "utf-8", (error, data) => {if (error) return console.log(error);console.log(data);});
```

2.同步读取文件

```js
let str = fs.readFileSync("./index1.txt", "utf-8");console.log(str);
```

---

## <b>安装 Node.js</b>

如果你在用 Win，请前往 [https://nodejs.org/en/download/](https://nodejs.org/en/download/)，请不要忘记配置环境变量；

如果你在用 Linux/Mac，可以直接通过包管理器安装，或者从官网下载源码安装。

## <b>Hello world</b>

- Hello world 代码：[https://nodejs.org/en/docs/guides/getting-started-guide/](https://nodejs.org/en/docs/guides/getting-started-guide/)
- 从命令行运行 Node.js：[https://nodejs.dev/learn/run-nodejs-scripts-from-the-command-line](https://nodejs.dev/en/learn/run-nodejs-scripts-from-the-command-line/)

运行后，在你的浏览器打开 `http://localhost:3000` 就可以看到 Hello world 啦！

## <b>npm</b>

npm 即 node.js package manager，是 node.js 的包管理器。

因为 node.js 包数量很大，版本很多，不同项目又可能使用不同版本的包，所以包管理器变得十分重要。

- [Where does npm install the packages?](https://nodejs.bootcss.com/where-npm-install-packages)
- [How to use or execute a package installed using npm?](https://nodejs.bootcss.com/how-to-use-npm-package)
- [Find the installed version of an npm package](https://nodejs.bootcss.com/npm-know-version-installed)
- [Install an older version of an npm package](https://nodejs.bootcss.com/npm-install-previous-package-version)
- [Update all the Node.js dependencies to their latest version](https://nodejs.bootcss.com/update-npm-dependencies)
- [Uninstalling npm packages](https://nodejs.bootcss.com/npm-uninstall-packages)
- [npm global or local packages](https://nodejs.bootcss.com/npm-packages-local-global)

npm 的使用非常简单。每个项目的库依赖都会记录在 package.json 中。

由于网络原因，国内访问 npm 仓库可能较慢，好在<del>人手一个梯子</del>淘宝提供了国内镜像源 `https://registry.npm.taobao.org`。

- 可以通过 `npm config` 修改仓库地址；或者
- 通过 npm 下载 cnpm： `npm install -g cnpm --registry=https://registry.npm.taobao.org`，这样可以使用 cnpm 替代 npm，从淘宝源安装包。

## <b>package.json</b>

作为一个包管理器，版本信息会存在这里。当你拿到一个前人的项目，先看看这些文件会帮助你识别用到的库。

- [The package.json guide](https://nodejs.bootcss.com/package-json)
- [package-lock.json | npm Docs](https://docs.npmjs.com/cli/v9/configuring-npm/package-lock-json)

## yarn

yarn也是一个包管理器，它的使用方式和npm基本相同，不过安装依赖时比npm要更快。

事实上，使用npm或yarn完全可以根据个人的喜好，并没有很显著的差别，但是在同一个项目里，这两种方式不能混用。

- https://www.yarnpkg.cn/getting-started

## <b>学习 Node.js</b>

既然 Node.js 是提供了 JS 的一个运行环境，那么大家所编写的依然是 JavaScript 而非 “Node.js 语言”。

但是对于 Node.js 提供的许多库、API 等，还是需要学习一下。

首先我们复习一下 JS<del>（很熟练的话就可以跳过咯）</del>：

- 事件循环/回调：[The Node.js Event Loop](https://nodejs.bootcss.com/node-event-loop)
- 从定时器认识异步：[Discover JavaScript Timers](https://nodejs.bootcss.com/javascript-timers)
- JS 异步与回调：[JavaScript Asynchronous Programming and Callbacks](https://nodejs.bootcss.com/javascript-callbacks)
- Promise：[Understanding JavaScript Promises](https://nodejs.bootcss.com/javascript-promises)
- Async/Await：[Modern Asynchronous JavaScript with Async and Await](https://nodejs.bootcss.com/javascript-async-await)

再来看看 Node.js：

- 事件驱动：
    - [https://nodejs.bootcss.com/node-event-emitter](https://nodejs.dev/learn/the-nodejs-event-emitter)
    - [https://nodejs.bootcss.com/node-module-events](https://nodejs.dev/learn/the-nodejs-events-module)
    - 特别留意宏任务与微任务：https://javascript.info/event-loop
        - 思考：单线程下的异步有何作用？如何根据任务的类型（io密集型/cpu密集型）进行优化？

- 模块化：
    - [https://nodejs.bootcss.com/node-export-module](https://nodejs.dev/learn/expose-functionality-from-a-nodejs-file-using-exports)

- HTTP：
    - <u>https://nodejs.bootcss.com/node-http-server</u>
    - <u>https://nodejs.bootcss.com/node-http-post</u>
    - <u>https://nodejs.bootcss.com/node-make-http-requests</u>

- <u>文件（粗略看一下即可）：</u>
    - <u>https://nodejs.bootcss.com/node-file-descriptors</u>
    - <u>https://nodejs.bootcss.com/node-file-stats</u>
    - <u>https://nodejs.bootcss.com/node-file-paths</u>

- 缓冲：
    - [https://nodejs.bootcss.com/node-buffers](https://nodejs.dev/learn/nodejs-buffers)

- 异常：
    - [https://nodejs.bootcss.com/node-exceptions](https://nodejs.dev/learn/error-handling-in-nodejs)

- 日志：
    - [https://nodejs.bootcss.com/node-inspect-object](https://nodejs.dev/learn/how-to-log-an-object-in-nodejs)

这里其实部分内容更偏向于服务端编程（如文件操作、HTTP server）。

但是前端编程基本离不开 Node.js，<del>因为它提供的包实在太多了。</del>

## <b>文档</b>

- [https://nodejs.org/en/docs/](https://nodejs.org/en/docs/)

