# Vue

@cr

https://cn.vuejs.org/

按照上面的官方文档写一个简单的网页是不难的，所以如果在这篇文章中一步一步讲vue怎么写就有些赘余。这篇文章会关注一些别的东西

## Vue与React的区别

Vue是尤雨溪在吸收了React、Angular的部分内容后开发的轻量级前端框架。与React相比，Vue的官方文档质量更好，也更简单易上手。React在编码上更加OOP，有用到js class、state、函数式编程等概念，由后端入手会更容易理解。并且由于React是Facebook开发的，在全球范围内的生态更好，各个大厂基本上用的前端技术栈都是React。

因此我个人推荐的学习路线是，自己使用Vue进行轻量级的网页开发，再转而使用React，从而对js和oop有更深的理解，在就业面试大厂上也有更大优势。

## 开发环境配置

包含vscode各类插件等

参见[开发环境搭建](https://xn4zlkzg4p.feishu.cn/wiki/wikcnry4frFfO1pCvuMcpYAYTDd) 

## Vite框架

进行较大规模的vue项目开发时，建议使用vite脚手架，参见[vite](https://xn4zlkzg4p.feishu.cn/wiki/wikcnLErEIZLBOrnn6iYwssw0Lg) 

## Vue是怎么组织的

我们使用 `npm init vue@latest` 命令来构建我们的vue项目（个人感觉这个是最好上手的，实际上已经在使用vite框架了）

![img](https://xn4zlkzg4p.feishu.cn/space/api/box/stream/download/asynccode/?code=ZDM5ODA0YTUzMmZkNGE4ZWYzNzQ3YjJjNzU3YmU4N2ZfWm56aGhkQThCNVBZWW16aU1XWHpuQmR2Qld4N0VVTFdfVG9rZW46Ym94Y241bkJ2QTZFYmFrN1NKZ2lJaWU4anlnXzE2OTg0MTAxNzc6MTY5ODQxMzc3N19WNA)

![img](https://xn4zlkzg4p.feishu.cn/space/api/box/stream/download/asynccode/?code=NmFjYWQ4YTkwODE2ZTJmMzZhZWIyY2RiMjQxODJhMmFfWXV4SGJWNmZDckRGSk5BdWNJNldBbTlJczJrRmN6bU9fVG9rZW46Ym94Y25IaWxjbU00VUptRDlLR3VtTWRNM05mXzE2OTg0MTAxNzc6MTY5ODQxMzc3N19WNA)

文件基本架构如图所示

一般而言，我们将静态媒体文件（图片、视频）等放在public目录下，将vue源文件置于src目录下。

而src目录中，views用于存放各个主页面，components存放组件，router用于存放vue-router路由，assets则是存放一些其他静态媒体文件。

而main.js主要用于引入外部package的内容，App.vue则是作为该页面的主入口

## 单个vue文件的各个部分

一个vue文件与将html+css+js集合在一起的html文件非常类似，大致分为三部分:template script style。

### 入口App.vue

```HTML
<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
    <div class="AppContainer">
        <HelloWorld :msg="myMsg">
        </HelloWorld>
    </div>
</template>
<script>
export default {
  name:"App",
  data:(){
      return{
          myMsg:"Hello!"
      }
  },
  mounted(){
      this.InitMsg()
  },
  methods:(){
      InitMsg(){
          this.myMsq="Hi!"
      }
  }
}
</script>
<style scoped>
.AppContainer{
    display:flex;
}
</style>
```

### 组件(Component)HelloWorld.vue

```HTML
<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>.
    </h3>
  </div>
</template>
<script>

export default {
  name:"HelloWorld",
  props:{
      msg:{
          type:String,
          required:true,
          default:()=>{
              return ""
          }
      }
  }
}
</script>
<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
```

- script setup
  - 这部分主要用于import，包括组件（Component）以及一些包
  - 这里我们引用了VueRouter插件以及我们自定义的HelloWorld组件
- template
  - 描述了这个页面的各个元素的树形关系
  - 非常建议在组件外面包一层div，因为template相当于把template中的内容粘贴至父组件中，如果没有再套一层div，很容易在排布上与父组件的css产生冲突
  - **":msg"**是"v-bind:msg"的简写，这是对组件属性进行动态传参，将data中的msg对象传入至组件的props中应用
- script export default
  - 这里定义了组件的js行为
  - **props:**属性，用于从父组件接受参数
  - **data():**可以动态修改的数据
  - **methods:**函数，在上述代码中，InitMsg函数修改了msg的值
  - **mounted:**在页面渲染完成后触发，也就是我们的页面渲染完成后，调用了InitMsg函数来修改msg的值，从而将该值传递到HelloWorld组件的props中，进行了动态修改
- style scoped
  - scoped表示仅仅在该组件中生效
    - 如果想要修改ui库（如element-plus）的组件格式，需要另起一块style，并且不使用scoped
  - 在这里确定组件的css
  - 具体怎样进行css设计，可以参考这篇文章[如何优雅地使用CSS](https://xn4zlkzg4p.feishu.cn/wiki/wikcnj36uUJfJS98nW9jSUp4eIh) 

以上内容均为较为浅显粗暴的说明，仅仅是便于上手开发理解。深层次的理解需要阅读官方文档

### main.js

```JavaScript
import { createApp } from 'vue'
import App from './App.vue'//这里就调用了我们的App.vue作为入口
import router from './router'
//上三行引入各类组件
import './assets/main.css'
//引入页面主css
const app = createApp(App)
//由这个入口文件构建App

app.use(router)
//使用router组件

app.mount('#app')
// 根据传入的根组件App创建vnode；渲染vnode。
```

## Vue产生的文件在做什么

上面的三块代码其实已经揭示了一个Vite框架下的Vue项目的流程。在index.html内，根据传入的根组件App创建vnode，再去渲染vnode。

这个vnode的内容就在App.vue里，而App.vue又调用了HelloWorld.vue组件，并靠下方的js进行动态更新，并且在页面渲染完成后，调用InitMsg函数来对HelloWorld中的prop——msg进行更新。

### 使用vite进行打包

使用`npm run build`命令进行打包后，会生成dist文件夹，将这个文件夹部署在服务器对应目录下即可。

我们再来看一下打包后的文件

![img](https://xn4zlkzg4p.feishu.cn/space/api/box/stream/download/asynccode/?code=NjBhM2QzMTY0NzY1YjRkMzRlMTczYTJmMTcyMzRkOTNfVmlFb240bXlyNmwwckI5dmRPUkhLamJXNDJRWVZuUklfVG9rZW46Ym94Y253dmtPNkoxbG9NMXRPVGxJcHpJZ3RoXzE2OTg0MTAxNzc6MTY5ODQxMzc3N19WNA)

其中index.html如下图所示

![img](https://xn4zlkzg4p.feishu.cn/space/api/box/stream/download/asynccode/?code=NWI3MDQzNGQwZGUyMGMzMzg5MzNjZWQ1MDY0OGM0NmRfQzAxYWcyTGNTdVEyZnNpRGdNNDNuMjZUbVVueDBCVE1fVG9rZW46Ym94Y25CMmlVSDlscU9QV3VCMXd6YkQ4MGxlXzE2OTg0MTAxNzc6MTY5ODQxMzc3N19WNA)

index.html中留有

```HTML
<div id="app"></div>
```

作为js控制入口，js经由这个入口来渲染整个页面。

在第八行我们可以看到，这里引入了assets中的js文件，来对页面内容进行控制。

也就是说，dist内没有写死的html文件，都是由js来对DOM进行渲染控制的。

## 你需要在官方文档中掌握的内容

- props
- data
- computed
- v-if v-for v-bind v-on v-model
- methods

## 进阶内容

Vue Router

vuex