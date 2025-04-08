---
title: VueX
slug: VueX
sidebar_position: 1
---


# VueX

Author：李予谦

注意：阅读本篇文档需要一定 <b>Vue3</b> 基础。

本文主要利用实例对vuex的核心概念：state, getters, muutation, action, module进行介绍，有助于快速理解官网文档。

# 为什么需要vuex

在项目变得复杂以后，很多数据需要在父组件，子组件，孙组件之间传递，处理起来很繁琐。所以需要使用Vuex对部分数据进行统一管理。vuex可以看作一个响应式的超全局变量。（如果页面比较简单，没必要引入Vuex）

# 如何使用vuex

如果你使用脚手架，选中vuex选项即可

通常会在src文件夹中store文件夹下，新建index.js作为vuex的存放位置，其结构如下：

```js
import { createStore } from 'vuex'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
```

# State

state是希望共享的数据，称之为<b>状态</b>。要新建一个状态，可以简单的在state中添建键和值。

```js
state: {
    num:0
  }
```

Vuex 通过 Vue 的插件系统将 store 实例从根组件中“注入”到所有的子组件里。且子组件能通过 `this.$store` 访问到。Vuex 的状态存储是<b>响应式</b>的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。

在任何组件中获取状态的语法如下：

`this.$store.state.<<需要的状态的key>>`

如在某个组件中我们要访问上面的num：

```js
this.$store.state.num
```

为了方便访问，通常会把需要访问的状态写到计算属性中，如：

```js
computed: {
    num () {
        return this.$store.state.num
    }
 }
```

如果有很多状态要获取，一个个编写计算属性显然比较麻烦，mapstate函数会帮助做这件事，请参考：[mapState | Vuex](https://vuex.vuejs.org/zh/guide/state.html#mapstate-%E8%BE%85%E5%8A%A9%E5%87%BD%E6%95%B0)

# Getter

getter可以看做在vuex中的计算属性

有时我们需要是state派生出来的状态，也就是state经过比较复杂的函数处理后的结果。为了避免在多个组件内复制函数，或者共享一个函数再在各个地方导入，我们可以直接在store中定义计算属性。

比如我们要获得num的3次方：

```js
export default createStore({
  state: {
    num:0,
  },
  getters: {
    numCube(state){//第一个参数是state
      return Math.pow(state.num,3)
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
```

在任意组件使用时，按照`this.$store.getters.<<getter中属性>>`如本例中我们要访问三次方

```js
this.$store.getters.numCube
```

也可以通过让 getter 返回一个函数，来实现给 getter 传参。这在对 store 里的数组进行查询时非常有用。[Getter | Vuex](https://vuex.vuejs.org/zh/guide/getters.html#%E9%80%9A%E8%BF%87%E6%96%B9%E6%B3%95%E8%AE%BF%E9%97%AE)

同样的，`mapGetters` 辅助函数可以将 store 中的 getter 映射到局部计算属性：

```js
import { mapGetters } from 'vuex'
export default {
    // ...
    computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
        ...mapGetters([
            'doneTodosCount',
            'anotherGetter',// ...
        ])
    }
}
```

# Mutation

mutation是唯一可以更改store中state的方式。（实际上有其他方式但不要这么做）

Vuex 中的 mutation 类似于事件：每个 mutation 都有一个字符串的事件类型 (type)和一个回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方，并且<b>它会接受 state 作为第一个参数</b>。

如我们想要在某些情况下让num增加1，我们需要“注册事件”add：

```js
export default createStore({
  state: {
    num:0
  },
  getters: {
    numCube(state){//第一个参数是state
      return Math.pow(state.num,3)
    }
  },
  mutations: {
    add(state){
      state.dnum++
    },
    addWithArgu(state,count){
      state.dnum+=count
    }
  },
  actions: {
  },
  modules: {
  }
})
```

在任何组件中调用`store.commit('<<mutation名>>')`即可更改state

举例：在以下组件中点击button即可利用method调用mutation，给state中的num加一

```js
<template>
  <div>
    <h1>在某一个组件中使用vuex</h1>
    <h1>{{this.$store.state.num}}</h1>
    <h2>使用Mutations来修改状态</h2>
    <button @click="doAdd">+</button>
    <h2>使用带参数Mutations来修改状态</h2>
    <button @click="add2(2)">+2</button>
  </div>
</template>

<script>
export default {
  methods:{
    doAdd(){
      this.$store.commit('add')
    },
    add2(count){
      this.$store.commit('addWithArgu',count)//
    }
  }
}
</script>
```

可以向 `store.commit` 传入额外的参数，建议写成一个参数，即 mutation 的载荷（payload）如上面例子中的`addWithArgu`，如果要传入多个参数，应该写成一个对象传入[Mutation | Vuex](https://vuex.vuejs.org/zh/guide/mutations.html#%E6%8F%90%E4%BA%A4%E8%BD%BD%E8%8D%B7%EF%BC%88payload%EF%BC%89)

mutation必须是<b>同步函数</b>，这保证了调试的可行性。<b>处理异步操作请看下面的action</b>。

同样的，可以在组件中使用`mapMutations` 辅助函数将组件中的 methods 映射为`store.commit` 调用（需要在根节点注入 `store`）。

```js
import { mapMutations } from 'vuex'
export default {
        // ...
        methods: {...mapMutations([
            'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
            // `mapMutations` 也支持载荷：
            'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
        ]),
        ...mapMutations({
            add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
        })
    }
}
```

# Action

action和mutation类似，但是action可以包含异步操作。

举例来说，我们需要等待后台提供数据之后再据此修改state，同步函数mutation就不能实现响应式的异步处理，此时会用到action。action通过提交mutation来修改state。

action的写法如下：

第一个参数是context（是与store实例有相同方法和属性的对象），可以调用 `context.commit` 提交一个 mutation，或者通过 `context.state` 和 `context.getters` 来获取 state 和 getters。然后写入需要进行的异步操作

以下举一个小例子说明

```js
export default createStore({
  state: {
    num:0
  },
  getters: {
  },
  mutations: {
    add(state){
      state.num++
    }
  },
  actions: {
    addLater(context){
      setTimeout(() => {
        context.commit('add')
      }, 1000);
    }
  },
  modules: {
  }
})
```

以上就注册了一个action，在触发的1000ms之后提交mutation，修改state。

在任意组件中通过`this.$store.dispatch('<<action函数名>>')`进行触发

举例

```js
<template>
  <div>
    <h2>NUM: {{$store.state.num}}</h2>
    <h2>在组件中使用action</h2>
    <button @click="useActionAdd">异步+</button>
  </div>
</template>

<script>
export default {
  methods:{
    useActionAdd(){
      this.$store.dispatch('addLater')
    }
  }
}
</script>
```

同样的，可以使用 `mapActions` 辅助函数将组件的 methods 映射为 `store.dispatch` 调用[Action | Vuex](https://vuex.vuejs.org/zh/guide/actions.html#%E5%9C%A8%E7%BB%84%E4%BB%B6%E4%B8%AD%E5%88%86%E5%8F%91-action)

# Module

module允许我们将store拆分成更小的、独立的部分，每个部分都包含自己的state、mutations、actions、getters等，便于项目维护和代码复用。

```ts
const moduleA = {
    state: () => ({ ... }),
    mutations: { ... },
    actions: { ... },
    getters: { ... }
    }
    
const moduleB = {
    state: () => ({ ... }),
    mutations: { ... },
    actions: { ... }
    }
const store = createStore({
    modules: {
        a: moduleA,
        b: moduleB
      }
  })

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```

默认情况下，模块内部的 action 和 mutation 仍然是注册在全局命名空间的——这样使得多个模块能够对同一个 action 或 mutation 作出响应。如果希望你的模块具有更高的封装度和复用性，你可以通过添加 `namespaced: true` 的方式使其成为带命名空间的模块。

