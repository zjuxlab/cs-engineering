---
title: Vue Router
slug: >-
  ynzowezexiygx0kbdlyco9pgnxe-ejb3wlaaeiqiumkxpozcbvopnfh-rmxtwu9geip5o8kkeawck6dnn6e-deqcwvlndiaindkf0ikczjaunwq-enhswbxfmixo48khcrtcjz3dnde-nh1uwvziiiowcakiiygc9grpnkf-nh1uwv
sidebar_position: 0
---


# Vue Router

注意：阅读本篇文档需要一定 <b>Vue3</b> 基础。

# 为什么需要路由？

在现代前端应用的搭建中，我们通常使用单页应用程序（SPA）的模式。SPA为用户提供了本地应用程序一般的良好使用体验，但也带来了一些问题——由于页面内容均为JS脚本动态加载，用户访问的url并不会发生变化；因此当使用浏览器的回退功能时，用户可能只希望访问应用程序的上一个页面，而实际效果却是直接退出了应用。

因此，应用于 SPA 的路由系统应运而生。通过路由，我们能够在单页应用程序中借用浏览器的历史栈，达到在访问历史中前进后退的效果。

<b>Vue Router</b> 是 Vue 官方推荐的路由系统，也基本是 Vue 使用者的唯一路由选择。这篇文章将结合一些具体案例，介绍 <b>Vue Router</b> 的使用。

官方文档如下：

# 浏览器的历史栈

浏览器以栈的结构存储用户的访问历史。栈顶指针所指向的页面是用户当前访问的页面。

- 当用户每访问一个 url，浏览器就将栈顶指针上移一位，放入url，并清空其上的所有元素（如果有）。
- 当用户执行回退操作时，浏览器将栈顶指针下移一位（而不是 pop 出栈顶元素）。
- 当用户执行前进操作（仅当栈顶指针之上还有元素）时，浏览器将栈顶指针上移一位。

下面是一个示例：

<img src="/assets/LoW2bPiiFoaC0fx4yf0czoyRnbh.png" src-width="1183" src-height="592" align="center"/>

正是通过对浏览器历史栈变化的监听和操作，<b>Vue Router</b> 得以为用户渲染出对应的界面，提供和多页应用程序相同的导航体验。事实上，Vue Router 在浏览器自带的前进后退操作之外还提供了丰富的方法来对历史栈进行篡改。因此，当我们在脑海中建立起历史栈的概念时，之后介绍的一系列 API 就变得易于理解。

如果想要深入了解 Vue Router 的实现原理，可以阅读：

# 基本使用

安装部分同其它 npm 包并无区别，可以参考官方文档。

## 创建路由

下面是一个包含了两个页面的简单例子：

```js
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/home',
    component: Home,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
```

在这个例子中，我们创建了一个能够匹配两个路径的路由。

`routes` 数组存放了可匹配的路径集合，其中的对象有两个重要的字段：`path` 表示要匹配的路径，`component` 表示匹配到之后要展示的组件。

`router` 是通过 Vue Router 提供的`createRouter`函数创建出来的路由对象。`createRouter` 函数接收一个对象，这个对象有两个必填字段：`history` 表示历史记录模式，有 Hash 模式和 HTML5 模式两种，其中差别可以参见官方文档“不同的历史记录模式”一节；`routes` 表示路径集合。

在创建了路由之后，我们需要将 Vue Router 提供的 `<router-view>` 组件放在你希望由路由系统控制的位置。`<router-view />` 相当于一个插槽，将在应用程序启动后被动态替换成当前路径匹配到的页面内容。在本例（以及大部分情况）中，我们将其放在整个应用的最外层，也就是 App.vue 中，以便让所有内容均由我们创建的路由系统动态渲染。

```html
<!-- App.vue -->
<template>
  <router-view />
</template>
```

如此，当我们访问 host:port/login 时，页面将渲染 Login 组件，当我们访问 host:port/home 时，将渲染 Home 组件。

## 导航

除了在地址栏键入 url，以及浏览器提供的回退前进之外，Vue Router 还提供了许多方法来操作历史栈，以在不同页面中自由切换。

### 组件导航

Vue Router 提供了 `<router-link>` 组件来代替原生的 `<a>` 标签。`<router-link>` 的 `to` 属性相当于 `<a>` 的 `href` 属性，你可以将其设置为希望跳转的路径。

下面是一个从 /login 页面跳转至 /home 页面的例子。

```html
<!-- Login.vue -->
<template>
  <router-link to="/home">
    <button>
      Home
    <button>
  </router-link>
</template>
```

点击页面上的 Home 按钮，就可以跳转至 /home 路径。

除了 `to` 之外，`<router-link>` 还有 `replace`、`custom` 等属性，可以在官方文档的 <b>API 参考</b>部分了解它们的功能和使用场景。

### 编程式导航

比起为页面组件套上 `<router-link>` 来进行导航，在 JavaScript 脚本中操作历史栈显然是更加自由的导航方式。Vue Router 当然也支持了这种方式。

想要在 JS 中操作历史栈，首先要获取全局的路由对象。在 组合式 API 中，我们可以用 Vue Router

提供的 `useRouter` 钩子来获取全局路由对象。

```js
import { useRouter } from "vue-router";

cosnt router = useRouter();
```

当获取了 `router` 对象之后，我们就可以通过它提供的一系列方法来操作历史栈了。

- push

`push` 方法的效果与 `<router-link>` 的 `to` 一样，接收的参数也一样。如果我们有一个按钮绑定了 `login` 函数，而我们希望在点击按钮后跳转到 /home，可以这么写：

```js
function login() {
  router.push("/home");
}
```

- replace

`replace` 方法的效果与 `push` 仅有一个差别，那就是它并非在栈中插入一个新元素，而是直接替换当前元素。如果我们的 `login` 函数改成调用 `repalce` 方法：

```js
function login() {
  router.replace("/home");
}
```

那么我们在按下按钮后也会跳转到 /home 路径，但不同的是我们没法通过浏览器的回退操作回到 /login 页面了。

- go

`go` 是一个强大的方法，可以让我们在历史栈中自由穿梭。`go` 方法接受一个整数，表示要在历史栈中前进（如果是负数即为后退）的步数。如果我们当前的历史栈如下：

<img src="/assets/WRACb5epyoNlsbxlD1uckW3qncM.png" src-width="212" src-height="364" align="center"/>

那么我们可以用 `router.go(2)` 前进至 D 页面，也可以用 `router.go(-1)` 回到A页面。如果你传入了一个不可能达到的参数（如 `router.go(100)`），则会静默失败（无事发生）。

# 重定向

有时候，我们会需要将多个路径指向同一个页面，这时候我们就需要用到重定向。重定向功能可以将一个路径重定向至另一个路径，使这两个路径实际上访问到同一个页面。

例如在我们之前的例子中，我们用 /login 来指向登录页。通常而言，用户只会记住域名，而不会记忆之后的路由；然而当他们访问我们的网站时，由于我们没有设置匹配的路径，他们只会收到一个404错误。因此，一个合乎逻辑的做法是，当他们访问根路径时，也应该被导向登录页面。

这一点的实现在 Vue Router 中非常简单：

```js
const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: Login,
  },
];
```

Vue Router 的路径对象提供了 `redirect` 字段，传入的参数就是将要被重定向到的路径。这样，我们就可以让用户从根路径重定向到 /login 路径，为用户显示登录页面。

再进一步，如果我们需要为用户提供类似7天免登录的服务，那么当用户之前登录过后，根路径就应该被重定向至 /home 路径。因此，我们需要根据登录状态动态返回重定向的结果。Vue Router 同样提供了这种能力。

```js
{
  path: '/',
  redirect: to => {
    if (loggedIn) {
      return '/home';
    } else {
      return '/login';
    }
  }
}
```

`redirect` 字段也可以接收一个函数，函数的入参是目标路由，返回要重定向到的路径。我们可以在函数中判断当前的登录状态，来决定要重定向到哪一个页面。

# 嵌套路由

有时候，我们会看到这样的页面布局：

<img src="/assets/YLCEbaAKIopNAfxt9iGc8D8knGd.png" src-width="1281" src-height="578" align="center"/>

我们通过点击侧边栏的目录条目来更改主界面的内容。在这样的布局中，只有主界面的内容在不断发生变化，而侧边栏和顶栏的内容都保持不变。要实现这样的效果，我们可能想到两种方案：

1. 借助 `v-if`，通过按钮的点击事件动态渲染主界面内容；这样的坏处是我们没法让浏览器记住我们的浏览历史了。
2. 给不同主界面设置不同路径，然后在每个页面上都渲染同样的顶栏和侧边栏。这个实现并不优雅，且顶栏和侧边栏重复渲染会造成性能浪费。

而 Vue Router 的嵌套路由给出了第三种方案。Vue Router 的路径对象提供了  `children` 字段，它接收一个数组，数组中的对象也是路径对象（所以叫嵌套路由）。

```js
const routes = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: 'sub-page-1',
        component: SubPageOne,
      },
      {
        path: 'sub-page-2',
        component: SubPageTwo,
      },
    ],
  },
];
```

这样，我们的 /home 路径下就有了两个子路径。需要注意的是，如果我们传的路径字符串以 '/' 开头，那么将从根路径开始路由；如果没有 '/'，则从当前路径开始路由。此外，当用户访问 /home 时，将默认访问数组中的第一项，也就是相当于访问 /home/sub-page-one。

然而，子路由下的组件要渲染在哪里？我们希望它渲染在主界面，但我们还没有设置它的渲染位置。事实上，我们只需要在 Home 组件里放置一个 `<router-view>` 即可。

```html
<!-- Home.vue -->
<template>
  <Layout>
    <Header> <!-- something --> </Header>
    <Sider> <!-- something --> </Sider>
    <Main>
      <router-view>
    </Main>
  </Layout>
</template>
```

这样，Vue Router 就可以根据路径动态在主界面内动态渲染内容了。

# 导航守卫

Vue Router 提供了导航守卫来帮我们实现这个目的。

## 全局导航守卫

在我们创建了路由之后，我们可以为路由对象添加全局守卫。

```js
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from) => {
  if (!loggedIn && to.path !== '/login') {
    return 'login';
  }
})
```

在这段代码中，我们调用了 `router` 的 `beforeEach` 方法来为路由注册了一个全局前置守卫。这个守卫接收一个回调函数作为参数，这个函数将在每次进行导航时被调用。这个回调函数接收两个参数：`to` 和 `from`，分别表示将要导向的地址和导航之前的地址，均以 <b>标准方式</b> 出现。关于路由地址的标准对象有哪些参数，可以参见：https://router.vuejs.org/zh/api/#routelocationnormalized

回调函数的返回值多种多样：

-  `true`、`undefined`：这是成功的信号，将用户导向 `to` 所指向的地址。
- `false`：这将使导航失败，用户会停留在 `from` 所指向的地址。
- 一个路由地址：这将用户导向你返回的那个地址。

在上面的示例中，我们首先判断是否登录，然后判断是否正在登录页（为了避免无限重定向），如果既没登录又将要导航至非登录页，就将其重定向至登录页。否则，什么都不做，也即返回 `undefined`，这将允许路由导航至原本要去的地址。

## 路由独享的守卫

除了全局守卫之外，你还可以给特定路径添加前置守卫。

```js
const routes = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/home',
    component: Home,
    beforeEnter: (to, from) {
      if (!loggedIn) {
        return '/login';
      }
    }
  },
];
```

为路径对象的 `beforeEnter` 字段传入一个函数，就能在导向这个路径之前指向这个函数。这个函数的入参和返回规范与全局前置守卫完全一致。

# 路由元信息

考虑一个更复杂的需求：我们对用户进行了权限分级，有些页面所有用户均能访问，而有些页面仅有管理员能访问。这时我们需要对路径进行标记，为每个路径设置一个权限列表，仅当当前用户的权限属于权限列表时才能访问此路径。

恰好，我们可以为 Vue Router 的路径对象设置自定义的元信息，并在路由守卫中获取。这样，我们就能在每次导航前检查权限并作出反应了。

```js
const routes = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: 'common-page',
        component: CommonPage,
        meta: {
          auth: ["normal", "admin"],
        },
      },
      {
        path: 'admin-page',
        component: AdminPage,
        meta: {
          auth:["admin"],
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from) => {
  if (to.meta?.auth && !to.meta.auth.includes(user.auth)) {
    return false;
  }
})
```

路径对象的 `meta` 字段可以被设置为任意内容。在这里我们为两个页面都传入一个含 `auth` 字段的元信息，代表可访问的权限列表。

之后我们在全局路由守卫处检查目的路径的元信息，如果有权限列表，且用户权限不属于权限列表，则静默失败；否则放行。

# 其它

本文从一个简单示例开始，逐步构建起一个完备可靠的路由系统。然而 Vue Router 提供的能力远不止于此。除了文章中涉及的功能以外，Vue Router 还提供了正则匹配、路由命名、视图命名、过渡动效、路由懒加载等等更加丰富的功能。读者可以自行阅读 Vue Router 的官方文档，了解更多相关知识。

> [Vue Router](wikcnSH7RaqLCR2LM6LOkUOwbdh)

