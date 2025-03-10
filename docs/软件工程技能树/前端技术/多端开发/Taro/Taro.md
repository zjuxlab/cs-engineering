---
title: Taro
slug: >-
  ynzowezexiygx0kbdlyco9pgnxe-ejb3wlaaeiqiumkxpozcbvopnfh-rmtcwkb0xii5cikhyt9cin4tnyf-dbgwwfvf3iegczkch9tctqksnzb-dbgwwf
sidebar_position: 1
---


# Taro

建议配合官方文档食用

阅读时可以将“<b>文档</b>”和“<b>教程</b>”配合阅读。我读下来的感觉是两边各有侧重，但都不是很完整，对实际开发不太友好（也可能是我当时读得不够认真x）。

---

# Taro介绍

## 什么是Taro

这是Taro官方文档对Taro功能的简述：

> Taro 是一个<b>开放式跨端跨框架解决方案</b>，支持使用 React/Vue/Nerv 等框架来开发 微信 / 京东 / 百度 / 支付宝 / 字节跳动 / QQ / 飞书 小程序 / H5 / RN 等应用。

简单地说，Taro是一种专门面向各类小程序的开发框架。借助Taro，我们就可以用非常接近原版React /Vue /Nerv 等<b>常用的web前端框架</b>，来编写各种小程序应用。

## 使用Taro开发的优点

1. 可以使用常用的web前端框架（假设已经对其中一种或几种有一定认识，就算没有，通过一次Taro开发来学习基本的web前端框架也是可行的！）进行小程序开发，基本省去了各平台的小程序开发原生语法的学习成本。
2. 一份代码可以借助Taro的编译能力生成多种小程序代码（当然各个小程序提供的开放能力不同，要对照着相应文档进行一定的调整）。
3. 可以不用使用原生开发框架。
    > <b>当一门语言的能力不足，而用户的运行环境又不支持其它选择的时候，这门语言就会沦为  “编译目标”  语言</b>
    我之前用过微信小程序原生框架开发，感觉（对我来说）文件夹架构和语法都不是很舒适，而且觉得在微信开发者工具里面直接写代码体验感很差。当然因为并没有写过太多小程序，所以也没有什么踩坑经验（意思是说欢迎补充）。

4. 使用React /Vue /Nerv 等常用的web前端框架，也就意味着可以同时使用这些框架自带的功能框架，在一些功能实现中会非常方便（如vue pinia，同样的功能在微信小程序中需要在app.js中维护全局方法和globalData来实现）！

# Taro开发基础

出于实用考虑，下面会根据写项目的过程介绍Taro的使用，针对的是开发过程中非常基础的步骤和功能。

以<b>Taro+vue</b>的组合为例，默认使用<b>vscode</b>进行开发

## 项目起步

注意：

1. <b>目前 Taro 仅提供一种开发方式：</b>安装 Taro 命令行工具（<b>Taro CLI</b>）进行开发；
2. 而Taro CLI 依赖于 <b>Node.js</b> 环境，所以在你的机器上必须安装 Node.js 环境，如果没有的话可以前往[Node.js](https://nodejs.org/en)，参照网上教程进行安装；
3. 因为是以vue为例，所以需要在vscode中安装<b>volar</b>扩展。

### CLI 工具安装

首先，你需要使用 npm 或者 yarn 通过在终端输入命令，全局安装 @tarojs/cli，或者直接使用 npx

```powershell
# 使用 npm 安装 CLI
$ npm install -g @tarojs/cli

# OR 使用 yarn 安装 CLI
$ yarn global add @tarojs/cli

# OR 安装了 cnpm，使用 cnpm 安装 CLI
$ cnpm install -g @tarojs/cli
```

安装完毕之后，在终端输入命令 `taro`，如果出现类似内容就说明安装成功了：

```powershell
👽 Taro v3.0.0-beta.6

Usage: taro <command> [options]

Options:
  -V, --version       output the version number
  -h, --help          output usage information

Commands:
  init [projectName]  Init a project with default templete
  config <cmd>        Taro config
  create              Create page for project
  build               Build a project with options
  update              Update packages of taro
  convert             Convert weapp to taro
  info                Diagnostics Taro env info
  doctor              Diagnose taro project
  help [cmd]          display help for [cmd]
```

### 创建Taro项目

安装好 Taro CLI 之后，可以使用命令，在当前目录下创建一个名为newApp的新项目：

```powershell
$ taro init newApp
```

在安装的时候会让我们选择需要的各种配置，按开发要求来选就好。

在创建完项目之后，Taro 会默认开始安装项目所需要的依赖，如果在这个过程中失败的话，可以'进入刚建好的项目文件夹--&gt;在项目内用`npm install` 或者`yarn`手动添加'。如果是缺少某几个包的话，可以用`yarn add xxx（包名）`对缺少的包进行指定安装。

### Taro项目基本结构

<div class="flex gap-3 columns-2" column-size="2">
<div class="w-[68%]" width-ratio="68">
<pre><code class="language-powershell">├── babel.config.js             # Babel 配置
├── .eslintrc.js                # ESLint 配置
├── config                      # 编译配置目录
│   ├── dev.js                  # 开发模式配置
│   ├── index.js                # 默认配置
│   └── prod.js                 # 生产模式配置
├── package.json                # Node.js manifest
├── dist                        # 打包目录
├── project.config.json         # 小程序项目配置
├── src # 源码目录
│   ├── app.config.js           # 小程序全局配置
│   ├── app.css                 # 小程序全局样式
│   ├── app.js                  # 小程序入口逻辑
│   ├── index.html              # H5 入口 HTML
│   └── pages                   # 页面组件
│       └── index
│           ├── index.config.js # 页面配置
│           ├── index.css       # 页面样式
│           └── index.jsx       # 页面组件，如果是 Vue 项目，此文件为 index.vue
</code></pre>
</div>
<div class="w-[31%]" width-ratio="31">
<img src="/assets/I6XQbOhCnoFd1axgQnEcGEtVn1e.png" src-width="600" src-height="1256"/>
</div>
</div>

实际项目结构可能会和上面的有一定出入，比如右边的图里是我新建立的一个项目frontend的结构，这没什么关系，之后的代码编写工作基本都集中在<b>src部分</b>，主要关注这里的结构就可以。

## 编译运行

上面我们刚刚建立好了一个新的Taro项目，如果不放心的话（什？），可以检查一下它能不能正常编译运行出一个空白的小程序界面，然后就可以非常放心地进行项目内容的编写啦！

这部分也可以先跳过，先看下一部分的src部分编写。

### 导入微信开发者工具

打开微信开发者工具（没下载的话前往[微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)），然后选择<b>项目根目录</b>进行预览。

Taro文档说：

> 需要注意开发者工具的项目设置：
> - 需要设置关闭 ES6 转 ES5 功能，开启可能报错
> - 需要设置关闭上传代码时样式自动补全，开启可能报错
> - 需要设置关闭代码压缩上传，开启可能报错、

可以尝试照做一下，我当时没注意这个，好像也没发现有什么问题。

### 在终端编译项目

常用编译命令：

```powershell
# yarn
$ yarn dev:weapp
$ yarn build:weapp

# npm script
$ npm run dev:weapp
$ npm run build:weapp
```

Taro 编译分为 `dev` 和 `build` 模式：

- <b>dev 模式</b>（增加 --watch 参数） 将<b>会监听文件修改</b>，更改代码并保存之后，微信开发者工具中会自动热重载，实时更新代码修改。需要注意的是如果是更改的是component/&lt;script&gt;/&lt;template&gt;/入口组件等等中的内容，需要在微信小程序开发者工具中点击<b>重新编译</b>才能看到代码更改的效果。
- <b>build 模式</b>（去掉 --watch 参数）<b> </b>将<b>不会监听文件修改</b>，并会对代码进行压缩打包。
- <b>dev 模式生成的文件较大</b>（遇到过因为文件过大而无法预览的情况），设置环境变量 `NODE_ENV` 为 `production` 可以开启压缩，方便预览，但编译速度会下降。

如果顺利的话，编译命令执行后，开发者工具的模拟器中就能显示该项目的初始界面了，代码的改动也能实时在模拟器中看到。

执行编译后根目录下会自动出现这个<b>config文件夹</b>（上面文件结构里也有这部分）：

```powershell
└── config                      项目编译配置目录
    ├── index.js                默认配置
    ├── dev.js                  开发环境配置
    └── prod.js                 生产环境配置
```

这个文件夹中的内容一般不用怎么关注和修改，但是index.js中的内容在下面的<b>“尺寸配置”</b>中会有作用：

### 尺寸配置

#### 尺寸单位转换

在 Taro 中尺寸单位建议使用 `px`、 `百分比 %`，<b>Taro 默认会对所有单位进行转换</b>：当转成微信小程序的时候，`px`单位将默认转换为 `rpx`，当转成 H5 时将默认转换为以 `rem` 为单位的值。

如果你希望部分 `px` 单位不被转换成 `rpx` 或者 `rem` ，一般有这样几种做法：

1. 要忽略单个属性时，在 px 单位中<b>增加一个大写字母</b>，例如 `Px` 或者 `PX` 这样，则会被转换插件忽略。
2. 对于头部包含注释 `/*postcss-pxtransform disable*/` 的<b>文件</b>，插件不予处理。
3. <b>加入 CSS 注释强制声明</b>忽略下一行或中间多行 e.g.

```powershell
/* autoprefixer: ignore next */
-webkit-box-orient: vertical;//被忽略了

/* autoprefixer: off */
-webkit-box-orient: vertical;//中间部分都被忽略了
...
/* autoprefixer: on */
```

1. 把不希望转换的<b>写进行内样式</b>里，行内样式是默认不会转换的（当然这种方法写出来的代码不是很好看hhh

#### 设计稿尺寸适应

当我们面向现成的设计稿编写前端页面的时候，最理想的状态肯定是将设计稿中已经写好的各种尺寸直接拿来放在样式中（比如设计稿里写的19px，在style部分的样式里我也可以直接写19px），而不是自己按页面比例换算或者是根据效果肉眼调节。这需要<b>设计稿尺寸与Taro项目的换算尺寸能够适配</b>。

Taro 默认以 `750px` 作为换算尺寸标准，如果设计稿不是以 `750px` 为标准，则<b>需要在项目配置 </b><b>config/index.js</b><b> 中进行设置</b>，目前 Taro 支持 `750`、 `640` 、 `828` 三种尺寸设计稿，这三种设计稿在`config/index.js`文件中默认已经添加。

如果你的设计稿是 `375` ，不在以上三种之中，那么你需要把 `designWidth` 配置为 `375`，同时在 `DEVICE_RATIO` 中添加换算规则如下：

```js
//config/index.js
designWidth: 375,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    375: 2 / 1,
  },
```

如果设计稿是其他尺寸的话也是同理。

还记得当时我们一开始没注意设计稿尺寸适应问题，于是在样式部分的尺寸全都要按照设计稿里的两倍来写，后来为了优化 css 编写体验而更改了尺寸之后，又需要把之前写的部分用脚本进行批量修改，挺痛苦的，大家实际开发的时候记得留心一下😥

## 基础知识

### src中主要目录结构

#### app

```powershell
└── src                         源码目录
    ├── app.js                  小程序入口逻辑
    ├── app.css                 小程序全局样式，非必须
    └── app.config.js           小程序入口逻辑
```

1. `app.config.js` 对应小程序规范的全局配置文件 `app.json`，主要对<b>页面路由（pages）、窗口样式（window）、导航栏（tabbar）、小程序权限（requiredPrivateInfos）</b>等进行编写。
    一个最简单的全局配置如下：
    ```js
export default {
  pages: ['pages/index/index'],
}
```
    不管是 React 还是 Vue，两者的全局配置方式是一样的。

2. 小程序全局样式文件可以在app.js中通过 ES6 规范的 `import ./app.css'`进行引入，这个文件一般是用来配置<b>全局背景</b>之类的。相比于其他具体某个页面的 .css 文件（因为 .vue 文件里也包含了css部分，所以基本可以删去/不创建），这个全局样式文件还是比较有用的（因为入口组件没有对应的 .vue 文件）。

#### page

```powershell
└── src                         源码目录
    └── pages                   页面文件目录
        └── index               index 页面目录
            ├── index.js        index 页面逻辑
            ├── index.css       index 页面样式，非必须
            └── index.config.js index 页面配置，非必须
```

`page.config.js` 对应小程序规范的页面配置文件 `page.json`，主要可以用来设置<b>页面名称</b>（即显示在上方边框上的文字，<b>navigationBarTitleText</b>）。

然后是在需要开启转发给好友或转发到朋友圈等小程序权限的时候，需要在这里设置一下（参见微信小程序官方文档中的说明）。

其他配置项（如导航栏/窗口样式相关、屏幕操作相关）可详见 Taro 官方说明，不过我发现这个说明似乎也并不详尽x大家还是之后一边开发一边探索比较好

- 不过`page.config.js`这个文件中的配置也可以直接写在`page.vue`的`<script>`部分，如设置页面名称可以用以下代码，合理设置页面生命周期即可：

```js
Taro.setNavigationBarTitle({
    title: "xxx",//当需求中要求<b>根据使用情景更改页面配置</b>时会用到这种写法
});
```

### 与web端对比

Taro 3 支持将 Web 框架直接运行在各平台，开发者使用的是<u>真实的 Vue/Vue3 和 React 等框架</u>。

但是 Taro 在<b>组件、API、路由</b>等规范上，遵循微信小程序规范，所以在 Taro 中使用 Vue/Vue3 和开发者熟悉的 Web 端有一些差异：

- <b>组件</b>：在 Taro 中需要“全部”使用来源于 `@tarojs/components` 的跨平台组件，如`<view />`。关于哪些组件能用，参考文档组件部分即可（这里的“全部”其实并不完全对，适用范围是存在平替跨平台组件的那些原生标签，而`<input />`这些就还是用原生组件；不过总之，参照文档就行啦）。
    <img src="/assets/SBVwbN4aooSfxMxpxwCcGTVCnSf.png" src-width="812" src-height="288" align="center"/>
        Ps. 这里使用组件有一个坑，就是从 `@tarojs/components` 引入的组件在 `<template />` 中只能使用 <b>kebab-case </b>命名的方式来使用，而不是组件库说明中的大驼峰写法（例如：应该是 `date-picker` ，而不是 `DatePicker`）

- <b>API</b>：这里比较明显的一点就是网络请求的 API，默认使用的还是微信小程序那种 `request`+回调函数 的写法，使用起来的感觉比较落后，对于嵌套请求，格式上也不好看。如果了解异步相关处理，可以用`Promise`对象把这种原始的请求方法封装成同步的写法。
    Ps. Taro主包 3.6.0 及其以上版本，在一定程度上是支持 web 生态中的网络请求库的（通过安装 `@tarojs/plugin-http` 插件的方式使用），如`axois`，但也存在一定限制。而且其实我感觉网络请求库在小程序端的 API 适配度不如原生 API，主要是 web 端和小程序端要处理的需求有差异。

- <b>路由</b>：Taro 遵循微信小程序的路由规范。只需要修改全局配置的 pages 属性即可完成配置，肯定比 web 端路由配置容易不少（主要是手机操作习惯和网页不同，其实不怎么涉及到侧边嵌套导航栏之类跳转的需求）。其余的如路由跳转 API 和路由传参的方式等，就和web端区别不大了（区别可能是多了个tabbar?）。

     我使用下来感觉是 Taro 中的路由传参方式反而不像微信小程序原生语法，而更接近web一点。

     Ps. Taro v3.6开始支持使用<u>前端路由库</u>，包括 react-router 和 vue-router。

### 静态资源引用

静态资源引用其实是比较小的一块知识点，但是因为不属于上面的任何一个模块，所以单列在这里。

#### 存放位置

这些静态资源可以放在 `assets` 文件夹（与 `src` 同级）下，并按文件类型（images / txts / videos...只是举例）分类存放。

注意：微信小程序的单个包大小是有上限的（2M），虽然可以分包（总共不超过20M），但对于比较大的资源文件（大的图片、音频），建议还是放在服务器，然后通过网络请求获取。

#### 资源引入

直接通过 ES6 的 `import` 语法来引用静态资源即可：

```js
import filename from 'xxx/xxx/xxx'
```

用这个方式可以直接引用的资源类型有：js文件、JSON文件、常规的图片（包括矢量图）/音频/字体/样式文件。

（也就是说，.txt 等等不在上述之列的文件类型是不能直接引用的，会报错“找不到相应的类型声明”，在`shim.d.ts`中添加了 .txt 也没用，应该是 webpack 本身就无法处理这类文件，比较常见的处理方式是用脚本逐行改写成 JSON 格式然后导入）

> [Taro开发综合知识](wikcnmCps9Yo8927tXo2K3Ba2jd)

