---
title: NodeJS
slug: NodeJS
sidebar_position: 4
---


# NodeJS

Author：叶耀阳

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

