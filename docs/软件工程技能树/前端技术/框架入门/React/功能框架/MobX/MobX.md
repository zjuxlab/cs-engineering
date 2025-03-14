---
title: MobX
slug: MobX
sidebar_position: 4
---


# MobX

Author：NA

MobX是一个简单、可扩展的状态管理库，它可以帮助我们管理React应用中的状态。

目前最新版本为 6，在 MobX 6 中不推荐使用装饰器语法，因为它不是 ES 标准，并且标准化过程要花费很长时间，但是通过配置仍然可以启用装饰器语法。

MobX 可以运行在任何支持 ES5 的环境中，包含浏览器和 Node。

[英文文档](https://mobx.js.org/README.html)

[中文文档](https://www.mobxjs.com/)

## MboX  vs  Redux

相似之处：

1. 都是用于管理React应用程序状态的库。
2. 都使用单一的状态树来管理应用程序的状态。
3. 都使用类似于观察者模式的机制来监听状态的变化。
4. 都提供了开发工具来帮助开发者调试应用程序。

不同之处：

1. MobX使用可观察对象来管理状态，而Redux使用不可变的状态对象来管理状态。
2. MobX使用装饰器来标记可观察对象和操作，而Redux使用纯函数来操作状态。
3. MobX的状态更新是自动的，而Redux的状态更新是通过派发操作来触发的。
4. MobX的代码量比Redux少，因为它使用了更少的抽象概念和模板代码。

总的来说，MobX更加简单和直观，适合小型应用程序和快速原型开发。

而Redux更加严格和规范，适合大型应用程序和团队开发。选择哪个库取决于你的具体需求和个人偏好。

## 工作流程

![](/assets/KxH6bp2iRoyvxSxuV5FcZNFhnwf.png)

Mobx 使用单向数据流，利用 <em>action</em> 改变 <em>state</em> ，进而更新所有受影响的 <em>view。</em>

## 核心概念

### Observable state(可观察的状态)

MobX 为现有的数据结构(如对象，数组和类实例)添加了可观察的功能。 通过使用 [@observable](https://cn.mobx.js.org/refguide/observable-decorator.html) 装饰器(ES.Next)来给你的类属性添加注解就可以简单地完成这一切。

```js
import { observable } from "mobx";

class Todo {
    id = Math.random();
    @observable title = "";
    @observable finished = false;
}
```

使用 `observable` 很像把对象的属性变成excel的单元格。 但和单元格不同的是，这些值不只是原始值，还可以是引用值，比如对象和数组。

如果你的环境不支持装饰器语法，也不必担心。 你可以点击[这里](https://cn.mobx.js.org/best/decorators.html)查看如何进行设置。 或者你可以直接跳过设置，因为 MobX 可以通过 <em>decorate</em> 工具在不支持装饰器语法的情况下使用。 尽管如此，多数 MobX 用户更喜欢装饰器语法，因为它更简洁。

例如，上面一段代码的ES5版本应该是这样:

```js
import { decorate, observable } from "mobx";
 
 class Todo {
     id = Math.random();
     title = "";
     finished = false;
 }
 decorate(Todo, {
     title: observable,
     finished: observable
})
```

### Computed values(计算值)

使用 MobX， 你可以定义在相关数据发生变化时自动更新的值。 通过`@computed` 装饰器或者利用 `(extend)Observable` 时调用 的 getter / setter 函数来进行使用。(当然，这里也可以再次使用 `decorate`来替代 `@` 语法)。

```js
class TodoList {
     @observable todos = [];
     @computed get unfinishedTodoCount() {
         return this.todos.filter(todo => !todo.finished).length;
     }
}
```

### Reactions(反应)

Reactions 和计算值很像，但它不是产生一个新的值，而是会产生一些副作用，比如打印到控制台、网络请求、递增地更新 React 组件树以修补DOM、等等。 简而言之，reactions 在响应式编程和命令式编程之间建立沟通的桥梁。

```js
import React, {Component} from 'react';
 import ReactDOM from 'react-dom';
 import {observer} from 'mobx-react';
 
 @observer
 class TodoListView extends Component {
     render() {
         return <div>
             <ul>
                 {this.props.todoList.todos.map(todo =>
                     <TodoView todo={todo} key={todo.id} />
                 )}
             </ul>
             Tasks left: {this.props.todoList.unfinishedTodoCount}
         </div>
     }
 }
 
 const TodoView = observer(({todo}) =>
     <li>
         <input
             type="checkbox"
             checked={todo.finished}
             onClick={() => todo.finished = !todo.finished}
         />{todo.title}
     </li>
 )
 
 const store = new TodoList();
 ReactDOM.render(<TodoListView todoList={store} />, document.getElementById('mount'));
```

`observer` 会将 React (函数)组件转换为它们需要渲染的数据的衍生。 使用 MobX 时没有所谓的智能和无脑组件。 所有的组件都会以巧妙的方式进行渲染，而只需要一种简单无脑的方式来定义它们。MobX 会确保组件总是在需要的时重新渲染，但仅此而已。所以上面例子中的 `onClick` 处理方法会强制对应的 `TodoView` 进行渲染，如果未完成任务的数量(unfinishedTodoCount)已经改变，它将导致 `TodoListView`进行渲染。 可是，如果移除 `Tasks left` 这行代码(或者将它放到另一个组件中)，当点击 `checkbox` 的时候 `TodoListView` 就不再重新渲染。

### Actions(动作)

不同于 flux 系的一些框架，MobX 对于如何处理用户事件是完全开明的。

- 可以用类似 Flux 的方式完成
- 或者使用 RxJS 来处理事件
- 或者用最直观、最简单的方式来处理事件，正如上面演示所用的 `onClick`

最后全部归纳为: 状态应该以某种方式来更新。 当状态更新后，`MobX` 会以一种高效且无障碍的方式处理好剩下的事情。像下面如此简单的语句，已经足够用来自动更新用户界面了。

从技术上层面来讲，并不需要触发事件、调用分派程序或者类似的工作。归根究底 React 组件只是状态的华丽展示，而状态的衍生由 MobX 来管理。

```js
store.todos.push(
     new Todo("Get Coffee"),
     new Todo("Write simpler code")
);
store.todos[0].finished = true;
```

尽管如此，MobX 还是提供了 `actions` 这个可选的内置概念。 如果你现在就想要了解如何编写 actions，请阅读 Actions 章节。很简单！ 使用 `actions` 是有优势的: 它们可以帮助你把代码组织的更好，还能在状态何时何地应该被修改这个问题上帮助你做出明智的决定。

## 简单实例

### 创建项目

```text
create-react-app mobx-demo
```

### 安装依赖

安装​​mobx​​​、​​mobx-react-lite​​

- mobx：MobX 核心库
- mobx-react-lite：是​​mobx-react​​的轻量级版本，仅支持函数组件
- mobx-react：既支持函数组件也支持类组件

```text
yarn add mobx@6.9.0 mobx-react-lite@3.4.3
```

### 新建Store

在​​src​​​目录下新建​​store​​​文件夹，新增​​count.js​​文件

​​count​​​为共享的数据

​​​addCount​​为共享的方法

```js
import { makeAutoObservable } from "mobx";

export default makeAutoObservable({
  count: 0,
  addCount() {
    this.count++;
  },
});
```

### 组件中使用

为了方便，这里直接修改了src目录下的App.js文件

被​​observer ​​包裹的组件可以监听Store的值并改变

```js
import { useEffect } from "react";
import countStore from "./store/count";
import { observer } from "mobx-react-lite";

function App() {
  useEffect(() => {
    console.log(countStore.count);
  });

  return (
    <div>
      <div>count为：{countStore.count}</div>
      <button onClick={() => countStore.addCount()}>+1</button>
    </div>
  );
}

export default observer(App);
```

### 项目运行

一个简单的计数器就完成了！

```js
npm run start
```

