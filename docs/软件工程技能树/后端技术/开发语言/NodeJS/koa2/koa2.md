---
title: koa2
slug: koa2
sidebar_position: 1
---


# koa2

Author: 邱至松

> 作为只写过前端的人为了写后端而快速入门所写的记录，可能对于后端理解有所错误，还望海涵（）

> 推荐阅读：[koa入门](https://www.liaoxuefeng.com/wiki/1022910821149312/1099752344192192) 

## 关于koa2

关于koa2，这里引用官网的介绍

> Koa 是一个新的 web 框架，由 Express 幕后的原班人马打造， 致力于成为 web 应用和 API 开发领域中的一个更小、更富有表现力、更健壮的基石。 通过利用 async 函数，Koa 帮你丢弃回调函数，并有力地增强错误处理。 Koa 并没有捆绑任何中间件， 而是提供了一套优雅的方法，帮助您快速而愉快地编写服务端应用程序。

koa2的安装同样可以参考官网：[Koa (koajs) -- 基于 Node.js 平台的下一代 web 开发框架 | Koajs 中文文档](https://koa.bootcss.com/)

## koa2脚手架

既然是速成，当然少不了脚手架（x，不过koa2的脚手架貌似已经跟不上版本，已经是4年前的产物了，但是现在还能用。

koa-generator：[koa-generator](https://www.npmjs.com/package/koa-generator)

当使用koa-generator创造脚手架后，会出现以下目录

![](/assets/EP0gbKzUVoHNuIx14O4cQRZ9n3b.png)

app.js中，脚手架已经帮助我们配置了部分内容。

```js
//导入koa，这里Koa是一个class
const Koa = require('koa')
//app是一个Koa对象，是我们操作的主要对象，
const app = new Koa()
//下面是koa2中的中间件对象
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

//下面是koa2中的路由
const index = require('./routes/index')
const users = require('./routes/users')
```

bin/www是启动入口，本地调试的端口号就可以在里面进行修改，默认是3000，除此之外，我们不需要在特别关注www中的内容

```js
var port = normalizePort(process.env.PORT || '3000');
//使用listen方法进行监听
var server = http.createServer(app.callback());
server.listen(port);
```

routes中存放路由文件，描述api接口的使用

除此之外，public中存放诸如图片，js文件，css文件等，views中存放一些前端页面，如果我们只提供后台的api的话，可以忽略

同时，如果我们要使用数据库的话，建议多创造一个文件夹，我这里使用DB文件夹

![](/assets/GGDVbqPwGo7abzxfyq2chR4fnzh.png)

DB文件夹中，我们使用与数据库相关的文件即可，可以使用mongo，sequelize等。

## koa2路由

上述在app.js中介绍过路由，那我们该怎么使用呢？

在routes文件夹中，我们可以创造路由的js文件

首先我们需要引入路由模块

```js
const router = require('koa-router')();  //注意：引入的方式
```

然后就可以编写路由了，格式如下，其中，ctx是koa2封装的context对象，会贯穿HTTP请求整个的生命周期，里面包含request对象和response对象，我们比较常用的`ctx.body`其实就是`ctx.response.body`

```js
//这里我们用的post方法，也可以用get
router.post('/profile/login', async (ctx, next) => {
   ...
});
```

在app.js文件中，我们使用路由时需要添加如下代码

```js
//以./routes/index为例
const index = require('./routes/index')
app.use(index.routes(), index.allowedMethods())
```

## koa2中间件

koa2的中间件选择了洋葱圈模型，即对于一个请求，每个中间件都会执行两次，每个中间件都接收了一个next参数，以next函数为分割点，首先从外向内执行Request的逻辑，然后再从内向外执行Response的逻辑，如下图所示。

![](/assets/K2ZcbreejoQdHfxKxhZcvIazn9f.png)

具体的实现则是compose函数，如下所示。具体可参考[实现洋葱圈模型的三种方法 - 掘金](https://juejin.cn/post/7205812357876154423)

```js
function compose (middleware) {
  // ...
  return function (context, next) {
    // last called middleware #
    let index = -1
    // 一开始的时候传入为 0，后续会递增
    return dispatch(0)
    function dispatch (i) {
      // 假如没有递增，则说明执行了多次
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      // 拿到当前的中间件
      let fn = middleware[i]
      if (i === middleware.length) fn = next
      // 当 fn 为空的时候，就会开始执行 next() 后面部分的代码
      if (!fn) return Promise.resolve()
      try {
        // 执行中间件，留意这两个参数，都是中间件的传参，第一个是上下文，第二个是 next 函数
        // 也就是说执行 next 的时候也就是调用 dispatch 函数的时候
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
```

ok，了解了原理后，我们该怎么使用呢？koa2中间件的使用也十分简单，在app.js中，我们导入我们想使用的中间件，比如日志koa-logger

```js
//导入
const logger = require('koa-logger')
//使用，注意函数一定是async的
app.use(async (ctx, next) => {
  const start = new Date()
  await next() //这里就是上述所说的洋葱圈模型的next分割点
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
```

这里中间件执行逻辑就是request请求发过来后，执行`const start = new Date()`，然后执行后面的中间件，等到之后的中间件执行完成后，再执行`next()`之后的内容。

所以中间件的书写顺序十分重要，并且不要遗漏了`await next()`

一些比较有用的中间件：koa-cor,koa-jwt

## koa2使用cookie

这里我们使用ctx的cookie方法来使用cookie

比如

```js
const Koa = require('koa')
const app = new Koa()

app.use( async ( ctx ) => {

  if ( ctx.url === '/index' ) {
    ctx.cookies.set(
      'cid', 
      'hello world',
      {
        domain: 'localhost',  // 写cookie所在的域名
        path: '/index',       // 写cookie所在的路径
        maxAge: 10 * 60 * 1000, // cookie有效时长
        expires: new Date('2017-02-15'),  // cookie失效时间
        httpOnly: false,  // 是否只用于http请求中获取
        overwrite: false  // 是否允许重写
      }
    )
    ctx.body = 'cookie is ok'
  } else {
    ctx.body = 'hello world' 
  }

})

app.listen(3000, () => {
  console.log('[demo] cookie is starting at port 3000')
})
```

## koa2 + sequenlize

这里我们sequenlize数据库进行一个速成

在之前所说的DB文件夹中，我们可以形成以下目录

![](/assets/Bodzb4Orwog8Mix3S7QcfGujnJe.png)

其中，model中含有数据库中的各种映射表，config.js则是所连接数据库的信息，sequenlize.js负责连接数据库，operator.js则是对数据库中表的操作。通过`module.exports`导出对应模块后，我们就可以直接在routes中直接对数据库进行操作了。

