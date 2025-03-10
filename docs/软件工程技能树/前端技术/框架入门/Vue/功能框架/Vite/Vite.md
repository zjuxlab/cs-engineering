---
title: Vite
slug: >-
  ynzowezexiygx0kbdlyco9pgnxe-ejb3wlaaeiqiumkxpozcbvopnfh-rmxtwu9geip5o8kkeawck6dnn6e-deqcwvlndiaindkf0ikczjaunwq-enhswbxfmixo48khcrtcjz3dnde-g3t1wd3g5intmxkgdakcqueyntg-g3t1wd
sidebar_position: 2
---


# Vite

<div class="callout callout-bg-2 callout-border-2">
<div class='callout-emoji'>📍</div>
<p>这篇知识树关于命令的部分尽量省略了，看官方文档就够了。更多的是关于前端脚手架的个人理解，如有错误恳请批评指正。</p>
</div>

Vite是与Vue搭配使用的前端构建工具，在此之前我使用过vue-cli来进行开发，但是就开发的便捷性和环境配置的便捷性而言，Vite更加方便。

总的来说Vite与webpack等工具类似，拥有模块与打包功能。

# 为什么要分模块？

这个很好理解，所有东西都糊在一块儿，一是难维护，二是难以协作。

# 为什么要打包？

在很久以前，或者说就像我们刚接触html+js+css三大件一样，网页就是几个html页面配上js脚本进行动态响应，各个页面相互独立，由不同的三大件组成。服务端很大程度上来说就是一个静态文件管理器。

nginx也是这么处理的，常见的规则就是匹配服务器当前目录下

## 看看不打包的后果：

<img src="/assets/L0oibenNho5s0fxiuecchMDynKc.png" src-width="1624" src-height="985" align="center"/>

众所周知啊，我们期末想查自己考试信息的时候都要看30s这个诚信承诺书，确实是有必要的，但是每次都得等30s也太若智了。我们查看网页源码可以发现，js是直接内联的裸代码，没有经过打包与丑化，一眼就能看出这个30s等待是如何实现的，如果我们要跳过这个过程要怎么做呢？很简单，console里输入x=0即可。

那么打包之后的代码会是什么样的呢？在html部分基本上不会有什么变化，查看源码仍有一部分的可读性，js就比较难读了。

<img src="/assets/I1Gob3nBMoF9cQxIlMNcFc5Kn7b.png" src-width="678" src-height="754" align="center"/>

首先我们可以看到，每一行js代码都非常非常长，即便我们使用chrome的格式化功能，还是能发现，这里的变量名、函数等等都不像是给人看的。

<img src="/assets/ZXN8bLglWo7H70xZ3CHc0eQOnGc.png" src-width="722" src-height="804" align="center"/>

而且我们可以看到，官网每个页面都有对应的js脚本，但是打包过后只剩下一个js，也就是说vite将所有js都整合到了一个文件里。

这里就涉及了打包的第一个功能：

<b>将代码进行合并压缩，以减小代码体积和文件数量，对代码进行丑化。</b>

毕竟谁都不想让用户一眼就看出来自己的代码是咋实现的😇

# Vite文件的基本架构

我们使用 `npm init vue@latest` 命令来构建我们的vite项目（个人感觉这个是最好上手的）

<img src="/assets/TajkbbxijoZmJXx9ZKocr7fnnef.png" src-width="639" src-height="234" align="center"/>

<img src="/assets/HaRrbQKgTo8MpixyQ7acJB8HnGh.png" src-width="664" src-height="226" align="center"/>

文件基本架构如图所示

一般而言，我们将静态媒体文件（图片、视频）等放在public目录下，将vue源文件置于src目录下。

而src目录中，views用于存放各个主页面，components存放组件，router用于存放vue-router路由，assets则是存放一些其他静态媒体文件。

而main.js主要用于引入外部package的内容，App.vue则是作为该页面的主入口

# 打包结果

使用`npm run build`命令进行打包后，会生成dist文件夹，将这个文件夹部署在服务器对应目录下即可。

我们再来看一下打包后的文件

<img src="/assets/BtzrbIK96oE6SXxp6duceebInrd.png" src-width="640" src-height="173" align="center"/>

其中index.html如下图所示

<img src="/assets/ZmYtbNzwcoVdsVxxMNqcfNoCnPb.png" src-width="813" src-height="366" align="center"/>

index.html中留有

```html
<div id="app"></div>
```

作为js控制入口，js经由这个入口来渲染整个页面。

在第八行我们可以看到，这里引入了assets中的js文件，来对页面内容进行控制。

也就是说，dist内没有写死的html文件，都是由js来对DOM进行渲染控制的。

在Vite打包中，public目录下的所有文件都会被放入，而src/assets中的文件则会按照是否在vue文件中被直接引用过来存放。

例如：

```html
<img :src="imgUrl">

<script>
export default{
    data(){
        return{
            imgUrl:"/assets/pic1.png",
        }
    }
}
</script>
```

这是行不通的，build出来这张图片会加载不出来，因为vite没办法知道你这个字符串到底是个url还是个什么东西，假如你填了个"111111"，并且只想作为字符串引用，vite显然不应该把它作为地址来编译。

但这个是行的

```html
<img src="/assets/pic1.png">
```

因为这个挑明了这就是个url。

# 环境变量

# vite环境变量

环境变量的作用主要就是将一些因为环境变化(dev/test/production)而产生变化的变量统一管理，方便运维build/前端开发。

常用的主要分为两类

- BASE_URL和QUERY_URL，本地的和服务器上的肯定会发生变化，这些属于公开信息，可以放进git里
- DATABASE_PASSWORD，不同数据库的密码肯定会不一样，这个要用.env.[mode].local来存放，vite自带的.gitignore会自动忽略

## 环境变量设置

- .env 基础入口
- .env.development 本地与本地后端调试
- .env.test 本地与远程后端调试
- .env.production 正式上线版本

上述命名可以自定义

## 变量内容

以.env.test为例

```text
VITE_BASE_URL=/ #项目baseurl

VITE_QUERY_URL=https://www.xxxx.com/api/ #后端url
```

## 调用方法:

vite.config.js

```js
import { defineConfig,loadEnv} from 'vite'

const config = loadEnv('production', './')
export default defineConfig({
  base: config.VITE_BASE_URL,
 })
```

向后端获取数据时

```js
axios({
    method:'get',
    url:import.meta.env.VITE_QUERY_URL+'getData'
})
```

## dev/build命令

默认情况下，dev运行在[development]模式下，build运行在production模式下

```json
{
  "scripts": {
    "dev": "vite --host 0.0.0.0",//npm run dev
    "build": "vite build --mode development",//npm run build
    "preview": "vite preview ",
    "testBuild": "vite build --mode test",// npm run testBuild
    "productionBuild": "vite build --mode production"//npm run productionBuild
  }
}
```

# nginx路由配置

在nginx中，我们一般部署前端的方法都是，匹配有没有对应的文件目录，如果没有的话，就返回404。但是这在vue-router中却不太能行得通，因为vite打包出来的文件是没有对应的目录的，而是在index.html中由vue-router根据url进行解析，从而渲染页面。

因此我们如果使用404配置，正常情况下从主页进入，根据按钮的router.push函数进行跳转，是能正常运行的，但是一旦回退/刷新/直接从浏览器输入子目录/从超链接进入，就会失效报404。

所以我们需要进行如下的配置，一旦没有找到对应目录，就从index.html进入，如果vue-router没有找到对应的目录，再进行404报错（前端完成）

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

> [vite](wikcnLErEIZLBOrnn6iYwssw0Lg)

