---
title: React Router
slug: React Router
sidebar_position: 0
---


# React Router

Author：李予谦

阅读本文需要：

- React框架基础
- 了解前端路由的基本概念

# 官方文档

当前版本：6.8.1

官方文档内的Tutorial使用了一个联系人（类似于电话簿）项目来介绍了React Router的使用，但是实际上官方的Tutorial更接近于新特性的案例使用，相关的基础知识只有API链接，对于没有接触过React Router的真正新人来说非常的难懂。

# 前言

如果我们希望做一个SPA（单页面应用），那路由是绕不开的话题。而React Router是react官方（FaceBook）维护的路由库。

React Router随着react的迭代更新推出了多个版本，现在已经到了v6。而目前react router也向着react的迭代大潮进发，全面地转向了hooks。

React Router 有着多个针对不同开发环境的包，比如react-router(核心包，更兼容、更繁琐)、react-router-dom（适合web开发）、react-router-native（适合react native）。

本文只阐述react-router-dom的相关知识。

# 安装

```shell
npm install react-router-dom
```

# 基本使用

## 添加一个路由器

React Routor提供了多种路由器，我们常见的有：

- [BrowserRouter](https://reactrouter.com/en/main/router-components/browser-router)（通常使用）
    - 内部靠HTML5的History实现
    - 由于背靠History，页面刷新之后路由中的state仍然会保留

- [HashRouter](https://reactrouter.com/en/main/router-components/hash-router)
    - 兼容性非常好
    - url中会携带‘#’

如果我们希望开始使用React Router来制作路由的话，那我们必须选择一种路由器来包裹我们需要使用到路由功能的其他所有HTML元素，不然路由无法正确跳转（实际表现是console报错）。我们通常的做法就是在我们的`<App />`外侧用路由器进行包裹。

我们以BroserRouter为例：

```js
import ReactDOM from 'react-dom'
import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
, document.getElementById('app))
```

实际上你也可以紧跟潮流使用函数式组件的特色——hook来完成这个事情——[createBrowserRouter v6.8.1](https://reactrouter.com/en/main/routers/create-browser-router)。

（React Router作为官方的路由库，自然紧跟react函数式组件的潮流）

## 第一个路由

```js
function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}
```

- &lt;Routes&gt;组件：如果你需要使用&lt;Route&gt;，那你必须使用&lt;Routes&gt;来包裹他们（注意他们拼写上的区别！），这个组件将会负责从他包裹的&lt;Route&gt;中挑选匹配当前path的路由并加载
- &lt;Route&gt;组件：React Router的最重要组件。用来注册一个路由。当path匹配成功后，将会渲染element属性中的组件。
    - path：该路由的路径
    - element: 匹配到之后所渲染的组件

## 更多的路由（匹配规则）

```js
function App() {
 return (
   <Routes>
     <Route path="/home" element={<Home />} />
     <Route path="/profile" element={<Profile />} />
     {/* more <Route /> */}
   </Routes>
 );
}
```

Route将会按照如下规则进行匹配

- 按照Route标签排布的先后顺序匹配
- 假设当前传入的路由是'/path/to/something'，该路由将匹配&lt;Route path="/path"&gt;，匹配&lt;Route path="/path/to"&gt;等等

## 嵌套路由

接下来我们要做的是添加层级更高的路由，这样我们就可以做到二级路由了

```js
function App() {
 return (
   <Routes>
     <Route path="/home" element={<Home />} />
     <Route path="/profile" element={<Profile />}>
       <Route path="me" element={<OthersProfile />} />
     </Route>
     {/* more <Route /> */}
   </Routes>
 );
}
```

以第6行为例：

当我们访问`ip:port/profile/me`的时候，就会同时渲染Profile组件和OtherProfile组件，而这个`me`就是二级路由。（当然路由可以有三级四级等等）

请注意Route中的path属性：'path'和'/path'的写法是不同的，前者是相对写法，后者是绝对写法（类似相对路径和绝对路径）

实际上你也可以紧跟潮流使用函数式组件的特色——hook来完成这个事情——[useRoutes v6.8.1](https://reactrouter.com/en/main/hooks/use-routes)。

### Outlet

当你使用二级路由的时候，需要在一级路由的element中放置&lt;Outlet&gt;组件来标识你的二级路由匹配到的element放置在何处。（类似于占位符）

以上方的代码为例，那么我们在Profile组件中就需要添加Outlet来放置'profile/me'匹配到的OtherProfile组件

```js
function Profile() {
  return (
    <div>Profile</div>
    <Outlet />
 );
}
```

## 切换路由的组件

### Link

Link的实际表现类似于&lt;a&gt;标签，其中的'to'就是'herf'，支持相对路径和绝对路径两种写法。

```js
function EditContact() {
    <Link to="/">
      Cancel
    </Link>
  );
}
```

### NavLink

是一个特殊的`<Link />`组件，常用于渲染导航栏选中时的高亮。

我们可以将其className写成一个函数来接收一个参数，调整其被选中之后的样式

```ts
<NavLink className={({isActive: boolean}) => isActive ? '各种className' : '各种className'}>
  home
</NavLink>
```

## 路由传递参数

### Params

```js
function App() {
 return (
   <Routes>
     <Route path="/home" element={<Home />} />
     <Route path="/profile" element={<Profile />}>
       <Route path=":id" element={<OthersProfile />} />
     </Route>
     {/* more <Route /> */}
   </Routes>
 );
}
```

你可以在定义路由的时候使用`:paramName`来指定需要接收的参数。上方的diamante就定义了一个名为`id`的param

然后你在对应路由的组件（上方代码中就是OtherProfile）中就可以使用useParams这个hook来获得传递的值

```js
import {useParams} from 'react-router-dom'
function OtherProfile() {
  const {id} = useParams();
  return (
   <div>接收到的参数是:{id}</div>
  );
}
```

至于如何跳转到'/profile/1'这样的路由，你可以使用Link或者NavLink等。

### SearchParams

SearchParams本质上就是在正常的路由后面跟上'?'以及多个参数的urlencoded编码，例如：

> /detail?id=1&title='Hello'&content='World'

你可以使用useSearchParams这个hook来解析上方这个路由

```js
import {useSearchParams} from 'react-router-dom'
function OtherProfile() {
  const {search,setSearch} = useSearchParams();
  const id = search.get('id');
  const title = search.get('title');
  const content = search.get('content')
  return (
   <div>接收到的参数是:{id},{title},{content}</div>
  );
}
```

### State

你可以在Link中直接添加State来储存参数

```js
function EditContact() {
    <Link to="/"
     state={{
        id:1,
        title:'Hello',
        content:'World'
     }}
    >
      Cancel
    </Link>
  );
}
```

然后使用useLocation这个hook来获得传过来的state

```js
import {useLocation} from 'react-router-dom'
function OtherProfile() {
  const {state:{id,title,content}} = useLocation();
  return (
   <div>接收到的参数是:{id},{title},{content}</div>
  );
}
```

## 编程操控路由导航

借助useNavigate这个hook即可手动操作路由的跳转。

```js
import {useNavigate} from 'react-router-dom'

function test() {
    const navigate = useNavigate();
    navigate('subRoute') /*跳转到子路由subRoute*/
    navigate('/home') /*跳转到/home*/
    navigate(1)/*前进->*/
    navigate(-1)/*后退<-*/
}
```

# 后记

以上这些只是React Router的简单应用。官方在新版本中还添加了类似于loader(实现异步加载）和action(类似一种拦截器）等等特性，也有各种hook来替代我们在上方说的各种使用组件的写法。

React Router基础但并不简单，希望大家可以继续查阅其他资料进一步学习。

