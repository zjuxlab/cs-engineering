---
title: Redux
slug: Redux
sidebar_position: 1
---


# Redux

Author：NA

## React-redux

Redux是React大家庭的一个重要成员，需要特别强调的是Redux本事是不依赖react的。Redux试图为React引用提供可预测化的状态管理机制。另外，Redux除了支持React后，还能够支持其他界面框架。但是如果要将React和Redux结合起来使用，就要一些额外的辅助工具，react-redux就是最常见最重要的一个。

react-redux 就是 Redux 官方出的用于配合 React 的绑定库

- react-redux 能够使你的 React 组件从 Redux store 中很方便的读取数据， 并且向 store 中分发 actions 更新数据
- 相当于本来是组件间互传数据，redux统一到store里面储存发送
- vue 是一个 MVVM层，可以实现 双向数据绑定，而 react 只能算一个 view 层，状态改变了只有去调用`setState({xxx})` 才能去修改视图，当我们数据很复杂的时候可能需要用到 `redux`。

### redux使用场景

一般react能处理的时候不会想到redux，只有react处理不了的时候才会想到redux。甚至通常使用Redux需要创建很多模版代码，会让 state 的更新变得非常繁琐。

- 用户的使用方式复杂
- 不同身份的用户有不同的使用方式（比如普通用户和管理员）
- 多个用户之间可以协作
- 与服务器大量交互，或者使用了WebSocket
- View要从多个来源获取数据
- 同一个 state 需要在多个 Component 中共享
- 需要操作一些全局性的常驻 Component，比如 Notifications，Tooltips 等
- 太多 props 需要在组件树中传递，其中大部分只是为了透传给子组件
- 业务太复杂导致 Component 文件太大，可以考虑将业务逻辑拆出来放到 Reducer 中

一个流程图

https://img-blog.csdnimg.cn/20200714165527467.gif

## 两个重要组件

Provider 这个组件能够使你整个app都能获取到store中的数据

- Provider 包裹在跟组件的最外层，使所有的子组件都可以拿到 state
- Provider 接收 store 作为 props，然后通过 context 往下传递，这样react中任何组件都可以通过 context 获取到 store
- 解决了容器组件可能存在很深的层级，防止一层一层去传递state

connect 这个方法能够使组件跟 store 来进行关联

- Provider 内部组件如果想要使用到 state 中的数据，就必须要 connect 进行一层包裹封装（必须要被 connect 进行加强）
- connect 就是方便我们组件能够获取到 store 中的state

## 使用

### 安装

```text
npx create-react-app count-demo
// react-redux 不是 react 官方所提供，所以当我们构建 react 项目之后， 需要进行安装
yarn add react-redux
npm install react-redux --save
// react-redux 还需要依赖于 Redux 中的 store，所以我们还需要安装 redux
yarn add redux
npm install redux --save
```

### 利用 redux 来构建 store

1. 生成仓库

```text
import { createStore } from 'redux';
const store = createStore(fn); 
// createStore(reducer, [preloadedState], enhancer)
```

1. 创建 reducer

```js
const reducer = (prevState,action)=>{// 接收之前的状态 和 action ，最终返回一个新状态
       let newState = prevState.todos.slice()
       return newState
   }
   export default  reducer
   // 可以引入 reducer 来辅助 store 的创建
   const store = createStore(reducer);
```

​          举个例子

```text
//store/reducer.js
// 用一个默认数据进行测试，非实际使用场景
let state = {
    todos:[
        {
            id:1,
            title:"今天周一",
            isFinished:false
        },
        {
            id:2,
            title:"今天周二",
            isFinished:true
        }
    ]
}
const reducer = (prevState = state,action)=>{
    let newState = {...prevState}
    return newState   //将新的数据返回出去
}
export default  reducer
```

1. 获取数据

```text
import store from './store' // const store 所在文件
store.getState()// 返回一个对象，包含state信息
```

![img](https://img-blog.csdnimg.cn/20200714194956122.jpg)

对内部数据的调用按对象处理，如`store.getState().todos`

1. 将组件文件中引入 store 并将 state 与 store 进行绑定

```text
// 引入store
import store from './store'; // './store/index.js'的简写
...
class Todolist extends Component {
  constructor(props){
    super(props);
    // 原组件中的state与store进行绑定
    // this.state={
    //   inputValue: '', // 输入框中的值
    //   list: [], // todolist数组
    //   showMsg: false 
    // }
    this.state = store.getState();
    ...
  }
  ...
}
```

# 
### Connect

connect方法声明：

```text
connect([mapStateToProps], [mapDispatchToProps], [mergeProps],[options])
```

作用：连接React组件与 Redux store。

参数说明：

```text
mapStateToProps(state, ownProps) : stateProps
```

这个函数允许我们将 store 中的数据作为 props 绑定到组件上。

```text
const mapStateToProps = (state) => {
  return {
    count: state.count
  }
}
```

（1）这个函数的第一个参数就是 Redux 的 store，我们从中摘取了 count 属性。你不必将 state 中的数据原封不动地传入组件，可以根据 state 中的数据，动态地输出组件需要的（最小）属性。

（2）函数的第二个参数 ownProps，是组件自己的 props。有的时候，ownProps 也会对其产生影响。

当 state 变化，或者 ownProps 变化的时候，mapStateToProps 都会被调用，计算出一个新的 stateProps，（在与 ownProps merge 后）更新给组件。

```sql
mapDispatchToProps(dispatch, ownProps): dispatchProps
```

connect 的第二个参数是 mapDispatchToProps，它的功能是，将 action 作为 props 绑定到组件上，也会成为 MyComp 的 props。

```sql
[mergeProps],[options]
```

不管是 stateProps 还是 dispatchProps，都需要和 ownProps merge 之后才会被赋给组件。connect 的第三个参数就是用来做这件事。通常情况下，你可以不传这个参数，connect 就会使用 Object.assign 替代该方法。

`[options] (Object) `如果指定这个参数，可以定制 connector 的行为。一般不用。




