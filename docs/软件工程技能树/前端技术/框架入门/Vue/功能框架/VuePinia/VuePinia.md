---
title: Vue Pinia
slug: Vue Pinia
sidebar_position: 3
---


# Vue Pinia

Author：NA

#### <b>啥是pinia</b>

![](/assets/DIbFb26bqouHWTxcK0Pc47WEnhf.png)

pinia就是这个很可爱的菠萝（x，pinia是一个用于vue的状态管理（state management）的解决方案。在vue中，组件之间传输信息遵从下级到上级使用`emit`上级到下级使用`props`这样的的常规，当组件越来越多的时候，这种传输的结构就会越来越复杂，如下，同时你还需要额外考虑每一个传输过程中究竟如何组织对象，使得最后的结果兼顾效率与灵活性。

![](/assets/HOhgbQaYpoWAHGxMQxvcT66bnBe.png)

总之，当组件的数量达到临界，设计这样的复杂传输会变得非常折磨，这时候就需要一种类似于<b>全局状态</b>的东西来简化局面，重新组织信息的传递。

![](/assets/Y93AblyQCoy74xxNFupcXSM1n3g.png)

这时候就不得不提`vuex`了，这种建立全局状态的工作什么的，好像`vuex`已经完成了呀，这话没错，使用`vuex` 和`pinia`都可以解决状态管理问题，不过pinia更新，而且拥有特别的优势，具体来讲是：

- 更加简单和直觉化，写store和写组件（component，下面通用）一样，有一系列API来帮你写出组织良好的仓库（store，下面通用）
- 类型安全，有类型推断，自动补全，js也可以补全
- 更好的调试工具支持，pinia和调试工具结合的更好（vue 2，vue 3），举个例子，你可以直接用调试工具修改状态
- 可扩展性好，例如使用插件获取 transaction 和 local storage synchronization的功能
- 模块化，从设计上pinia就做成了模块化的，你可以建多个仓库，自动地code split，等等
- 巨轻，大小上约1 kb，使用（performance）的时候几乎不用考虑影响

后面还将仔细介绍一些pinia的特点，pinia的优势也不止这些，总之边看边介绍吧。

#### <b>快速上手</b>

##### <b>安装</b>

```bash
yarn add pinia
 # or with npm
 npm install pinia
```

创建pinia实例（根仓库），然后以插件的形式传给app

```js
import { createApp } from 'vue'
 import { createPinia } from 'pinia'
 import App from './App.vue'
 
 const pinia = createPinia()
 const app = createApp(App)
 
 app.use(pinia)
 app.mount('#app')
```

##### <b>创建仓库</b>

通过pinia提供的一个函数以及你给仓库起的名字（id，不重复）创建仓库，

```js
import { defineStore } from 'pinia'
 
 export const useAlertsStore = defineStore('alerts', {
   // other options...
 })
```

注意，返回的函数是用来在其他地方使用该仓库的，所以命名的时候一般是`use + name + store`这样。

`defienStore()`的第一个参数是仓库名字，第二个参数和仓库的具体结构有关，同时还有两种选择

- option store
- setup store

第一种大致遵循这样的格式，和vue的option风格一致：

```js
// option store
 export const useCounterStore = defineStore('counter', {
   state: () => ({ count: 0, name: 'Eduardo' }),
   getters: {
     doubleCount: (state) => state.count * 2,
   },
   actions: {
     increment() {
       this.count++
     },
   },
 })
```

可以看到具体定义里有`state,getter,actions`，可以分别把他们对应到vue的`data,computed,methods`

第二种则和Vue Composition API 的风格接近一些，我们传入一个定义了仓库里的响应式的属性和方法的函数，这个函数会返回一个包含了我们希望暴露的属性和方法的对象。

```js
// setup store
 export const useCounterStore = defineStore('counter', () => {
   const count = ref(0)
   const name = ref('Eduardo')
   const doubleCount = computed(() => count.value * 2)
   function increment() {
     count.value++
   }
 
   return { count, name, doubleCount, increment }
 })
```

在 Setup Stores中:

- `ref()`s become `state` properties
- `computed()`s become `getters`
- `function()`s become `actions`

可以看到 setup store 比 option store 灵活很多，比方说在仓库里放watcher，或者塞所谓的 composable（vue.js 的概念)。当然，这些会在SSR（server-side rendering）的场景下变得更加复杂。

两种方法选哪个？官方文档的建议是用你顺手的（x，

<em>不确定的话，建议先用 Option Store</em>

##### <b>使用仓库</b>

仓库在 `setup()` 函数中创建，具体实例则通过之前定义好的`usexxxStore()`来生成：

```js
import { useCounterStore } from '@/stores/counter'
 
 export default {
   setup() {
     const store = useCounterStore()
 
     return {
       // you can return the whole store instance to use it in the template
       store,
     }
   },
 }
```

这样相似的仓库可以创建很多个，比如AAA，BBB，你只需要在<b>不同的</b>文件里给出定义，这样可以最大化pinia的优势(like automatically allowing your bundler to code split and providing TypeScript inference)。

创建完仓库之后你就可以自由访问其中的 state，getter或者是action了，具体介绍 放在下节，在此之前，排除一个错误做法。

注意到仓库是一个reactive的对象，所以你不必在getter后面加.value，但是，就像`setup` 里的属性，我们也不能拆分它们。还是看代码：

```js
export default defineComponent({
   setup() {
     const store = useCounterStore()
     // ❌ This won't work because it breaks reactivity
     // it's the same as destructuring from props
     const { name, doubleCount } = store
 
     name // "Eduardo"
     doubleCount // 0
 
     setTimeout(() => {
       store.increment()
     }, 1000)
 
     return {
       // will always be "Eduardo"
       name,
       // will always be 0
       doubleCount,
       // will also always be 0
       doubleNumber: store.doubleCount,
 
       // ✅ this one will be reactive
       doubleValue: computed(() => store.doubleCount),
     }
   },
 })
```

要保存这种reactivity，使用`storeToRefs()`函数，这是一个pinia提供的函数，其作用如下：

```js
import { storeToRefs } from 'pinia'
 
 export default defineComponent({
   setup() {
     const store = useCounterStore()
     // name and doubleCount are reactive refs
     // This will also create refs for properties added by plugins
     // but skip any action or non reactive (non ref/reactive) property
     const { name, doubleCount } = storeToRefs(store)
     // the increment action can just be extracted
     const { increment } = store
 
     return {
       name,
       doubleCount,
       increment,
     }
   },
 })
```

<em>注意action也可以直接拆出来</em>

##### <b>State</b>

从使用角度来讲，状态是一个仓库中我们最关心的方面，在 Pinia 中，状态被定义为返回初始状态的函数。这允许 Pinia 在服务器端和客户端工作。下面是一个option store的例子

```js
import { defineStore } from 'pinia'
 
 export const useStore = defineStore('storeId', {
   // arrow function recommended for full type inference
   state: () => {
     return {
       // all these properties will have their type inferred automatically
       count: 0,
       name: 'Eduardo',
       isAdmin: true,
       items: [],
       hasChanged: true,
     }
   },
 })
```

Pinia绝赞的一点是TS超好兼容，原文档的描述是这样的：

> Make sure `strict`, or at the very least, `noImplicitThis`, are enabled and Pinia will infer the type of your state automatically!

所以只需要记住几个需要类型提示的场景（相当合理的几个），就不需要担心ts问题了,如下

```js
export const useUserStore = defineStore('user', {
   state: () => {
     return {
       // for initially empty lists
       userList: [] as UserInfo[],
       // for data that is not yet loaded
       user: null as UserInfo | null,
     }
   },
 })
 
 interface UserInfo {
   name: string
   age: number
 }
```

或者也可以把口都明确一下

```js
interface State {
   userList: UserInfo[]
   user: UserInfo | null
 }
 
 export const useUserStore = defineStore('user', {
   state: (): State => {
     return {
       userList: [],
       user: null,
     }
   },
 })
 
 interface UserInfo {
   name: string
   age: number
 }
```

接下来介绍如何访问（access）状态，默认情况下，你可以直接读写（真的假的🎃）

```js
const store = useStore()
 store.count++
```

正常来讲这种公有状态绝对不能这样自由修改，这一下子自由过头让人有些难以接受。不过，store的属性在定义里就确定了， 想之后再加是不行的：

```js
const store = useStore()
 // assume store only have "count" prop 
 store.count++ // ok
 store.secondCount = 0 // can't do this
```

你可以重置仓库，使用 `$reset`

```js
const store = useStore()
 store.$reset()
```

⭐配合option API

下面的例子里默认使用这样一个仓库：

```js
// Example File Path:
 // ./src/stores/counter.js
 import { defineStore } from 'pinia'
 export const useCounterStore = defineStore('counter', {
   state: () => ({
     count: 0,
   }),
 })
```

如果您没有使用 Composition API，而您正在使用`computed`, `methods`, ...，则可以使用`mapState()`帮助程序将状态属性映射为只读计算属性，这和vuex里类似。

```js
import { mapState } from 'pinia'
 import { useCounterStore } from '../stores/counter'
 
 export default {
   computed: {
     // gives access to this.count inside the component
     // same as reading from store.count
     ...mapState(useCounterStore, ['count'])
     // same as above but registers it as this.myOwnName
     ...mapState(useCounterStore, {
       myOwnName: 'count',
       // you can also write a function that gets access to the store
       double: store => store.count * 2,
       // it can have access to this but it won't be typed correctly...
       magicValue(store) {
         return store.someGetter + this.count + this.double
       },
     }),
   },
 }
```

如果希望能够写入这些状态属性（例如，如果有一个表单），可以改为使用`mapWritableState()`。注意，不能像`mapState()`那时候一样往里传函数：

```js
import { mapWritableState } from 'pinia'
 import { useCounterStore } from '../stores/counter'
 
 export default {
   computed: {
     // gives access to this.count inside the component and allows setting it
     // this.count++
     // same as reading from store.count
     ...mapWritableState(useCounterStore, ['count'])
     // same as above but registers it as this.myOwnName
     ...mapWritableState(useCounterStore, {
       myOwnName: 'count',
     }),
   },
 }
```

除了使用 直接改变商店外`store.count++`，还可以调用该`$patch`方法。它允许对部分对象同时应用多个更改`state`：

```js
store.$patch({
   count: store.count + 1,
   age: 120,
   name: 'DIO',
 })
```

虽然但是，使用此语法应用某些变更确实非常困难或代价高昂：任何集合修改（例如，推送、删除、拼接数组中的元素）都需要创建一个新集合。因此，该`$patch`方法还接受函数来对这种难以应用补丁对象的突变进行分组：

```js
store.$patch((state) => {
   state.items.push({ name: 'shoes', quantity: 1 })
   state.hasChanged = true
 })
```

主要的区别是 `$patch()` 允许你把多个更改放到调试工具的一个单元中，这会在调试部分再次提到

pinia提供了一个更替状态的语句，使用`$state=`直接对仓库赋值，但事实上还是会转换成`$patch`

```js
// this doesn't actually replace $state
 store.$state = { count: 24 }
 // it internally calls $patch():
 store.$patch({ count: 24 })
```

> You can also <b>set the initial state</b> of your whole application by changing the `state` of the `pinia` instance. This is used during SSR for hydration.
>  pinia.state.value = {}

⭐监控一个仓库的变化

你可以使用`$subscribe()`方法来观察一个仓库的变化，类似于vuex的subscribe方法。使用`$subscribe`而不是watch的好处是，patch事件只触发一次。

```js
cartStore.$subscribe((mutation, state) => {
   // import { MutationType } from 'pinia'
   mutation.type // 'direct' | 'patch object' | 'patch function'
   // same as cartStore.$id
   mutation.storeId // 'cart'
   // only available with mutation.type === 'patch object'
   mutation.payload // patch object passed to cartStore.$patch()
 
   // persist the whole state to the local storage whenever it changes
   localStorage.setItem('cart', JSON.stringify(state))
 })
```

默认情况下，<em>状态subscribe</em> 绑定到添加它们的组件（如果存储在组件的内部`setup()`）。当组件被卸载时，它们将被自动删除。

如果还想在卸载组件后保留subscribe，请`{ detached: true }`作为第二个参数传递以从当前组件<em>分离状态</em>订阅<i>：</i>

```js
export default {
   setup() {
     const someStore = useSomeStore()
 
     // this subscription will be kept even after the component is unmounted
     someStore.$subscribe(callback, { detached: true })
 
     // ...
   },
 }
```

##### <b>Getter</b>

getter完全等价于状态的computed值，鼓励使用箭头函数。

```js
export const useCounterStore = defineStore('counter', {
   state: () => ({
     count: 0,
   }),
   getters: {
     doubleCount: (state) => state.count * 2,
   },
 })
```

大多数时候，getters 只会依赖于状态，但是，他们也可能需要使用其他 getters，这种时候<b>必须</b>指明类型（其实是TS的限制），注意这不影响使用箭头函数的getter或者没有使用到this的getter，如下

```js
export const useCounterStore = defineStore('counter', {
   state: () => ({
     count: 0,
   }),
   getters: {
     // automatically infers the return type as a number
     doubleCount(state) {
       return state.count * 2
     },
     // the return type <b>must</b> be explicitly set
     doublePlusOne(): number {
       // autocompletion and typings for the whole store ✨
       return this.doubleCount + 1
     },
   },
 })
```

之后你就可以直接通过仓库实例访问getter了

```js
<template>
   <p>Double count is {{ store.doubleCount }}</p>
 </template>
 
 <script>
 export default {
   setup() {
     const store = useCounterStore()
 
     return { store }
   },
 }
 </script>
```

> 即使不用ts，也是可以访问其他getter的，jsdoc可以做类型
> ```js
export const useCounterStore = defineStore('counter', {
 state: () => ({
  count: 0,
 }),
 getters: {
  // type is automatically inferred because we are not using this
  doubleCount: (state) => state.count * 2,
  // here we need to add the type ourselves (using JSDoc in JS). We can also
  // use this to document the getter
  /**
      * Returns the count value times two plus one.
      *
      * @returns {number}
      */
     doubleCountPlusOne() {
       // autocompletion ✨
       return this.doubleCount + 1
     },
   },
 })
```

⭐怎么给getter传参

一般来讲这是做不到的，因为getter完全就是computed，但是我们总是可以用函数想想办法，例如让getter返回一个函数

```js
export const useStore = defineStore('main', {
   getters: {
     getUserById: (state) => {
       return (userId) => state.users.find((user) => user.id === userId)
     },
   },
 })
```

w，没有vue 

```js
<script>
 export default {
   setup() {
     const store = useStore()
 
     return { getUserById: store.getUserById }
   },
 }
 </script>
 
 <template>
   <p>User 2: {{ getUserById(2) }}</p>
 </template>
```

这是可行的，但是这下子getter不会进缓存，因为这其实就是一个函数调用了，如果需要性能，需要手动cache，一个不太寻常的方法是在getter里面加东西

```js
export const useStore = defineStore('main', {
   getters: {
     getActiveUserById(state) {
       //new ↓
       const activeUsers = state.users.filter((user) => user.active)
       return (userId) => activeUsers.find((user) => user.id === userId)
     },
   },
 })
```

⭐使用其他仓库的getter

没有问题，创建好其他仓库的实例直接用

```js
import { useOtherStore } from './other-store'
 
 export const useStore = defineStore('main', {
   state: () => ({
     // ...
   }),
   getters: {
     otherGetter(state) {
       const otherStore = useOtherStore()
       return state.localData + otherStore.data
     },
   },
 })
```

⭐在setup中使用

把getter看成属性，直接访问

```js
export default {
   setup() {
     const store = useCounterStore()
 
     store.count = 3
     store.doubleCount // 6
   },
 }
```

乍一看有点夸张，不过getter在setup中就是这样的

⭐在option中使用

假设我们的option store 定义如下

```js
// Example File Path:
 // ./src/stores/counter.js
 
 import { defineStore } from 'pinia'
 
 export const useCounterStore = defineStore('counter', {
   state: () => ({
     count: 0,
   }),
   getters: {
     doubleCount(state) {
       return state.count * 2
     },
   },
 })
```

第一种情况，使用setup hook ，不需要额外的映射函数来帮忙

```js
import { useCounterStore } from '../stores/counter'
 
 export default {
   setup() {
     const counterStore = useCounterStore()
 
     return { counterStore }
   },
   computed: {
     quadrupleCounter() {
       return this.counterStore.doubleCount * 2
     },
   },
 }
```

第二种情况，不用setup，那么就用map函数

```js
import { mapState } from 'pinia'
 import { useCounterStore } from '../stores/counter'
 
 export default {
   computed: {
     // gives access to this.doubleCount inside the component
     // same as reading from store.doubleCount
     ...mapState(useCounterStore, ['doubleCount']),
     // same as above but registers it as this.myOwnName
     ...mapState(useCounterStore, {
       myOwnName: 'doubleCount',
       // you can also write a function that gets access to the store
       double: (store) => store.doubleCount,
     }),
   },
 }
```

##### <b>Actions</b>

action和方法（method）等价，action非常适合来定义业务逻辑。

```js
export const useCounterStore = defineStore('counter', {
   state: () => ({
     count: 0,
   }),
   actions: {
     // since we rely on this, we cannot use an arrow function
     increment() {
       this.count++
     },
     randomizeCounter() {
       this.count = Math.round(100 * Math.random())
     },
   },
 })
```

和getter类似，action可以通过this访问整个仓库实例，而且有完全的类型支持（和自动补全）。和getter并不一样，action可以是异步的，比方说使用await，或者嵌套action。

```js
actions: {
     async registerUser(login, password) {
       try {
         this.userData = await api.post({ login, password })
         showTooltip(Welcome back ${this.userData.name}!)
       } catch (error) {
         showTooltip(error)
         // let the form component display the error
         return error
       }
     },
   },
```

> You are also completely free to set whatever arguments you want and return anything. When calling actions, everything will be automatically inferred!

action的触发也和method一样：

```js
export default defineComponent({
   setup() {
     const store = useCounterStore()
     // call the action as a method of the store
     store.randomizeCounter()
 
     return {}
   },
 })
```

你可能已经猜到了，action中可以自由访问其他仓库的action，只要创建对应仓库的实例

```js
import { useAuthStore } from './auth-store'
 
 export const useSettingsStore = defineStore('settings', {
   state: () => ({
     preferences: null,
     // ...
   }),
   actions: {
     async fetchUserPreferences() {
       const auth = useAuthStore()
       if (auth.isAuthenticated) {
         this.preferences = await fetchPreferences()
       } else {
         throw new Error('User must be authenticated')
       }
     },
   },
 })
```

⭐setup中使用action

```js
export default {
   setup() {
     const store = useCounterStore()
 
     store.randomizeCounter()
   },
 }
```

你可以直接在函数中调用action

⭐配合optionAPI使用

下面的代码默认使用这个仓库：

```js
// Example File Path:
 // ./src/stores/counter.js
 
 import { defineStore } from 'pinia'
 
 export const useCounterStore = defineStore('counter', {
   state: () => ({
     count: 0
   }),
   actions: {
     increment() {
       this.count++
     }
   }
 })
```

有setup情况：

和getter的情况完全相同，setup hook使得不需要map函数代码就能工作

```js
import { useCounterStore } from '../stores/counter'
 
 export default {
   setup() {
     const counterStore = useCounterStore()
 
     return { counterStore }
   },
   methods: {
     incrementAndPrint() {
       this.counterStore.increment()
       console.log('New Count:', this.counterStore.count)
     },
   },
 }
```

无setup情况：

如果根本不想使用 Composition API，那可以使用`mapActions()`帮助程序将操作属性映射为组件中的方法：

```js
import { mapActions } from 'pinia'
 import { useCounterStore } from '../stores/counter'
 
 export default {
   methods: {
     // gives access to this.increment() inside the component
     // same as calling from store.increment()
     ...mapActions(useCounterStore, ['increment'])
     // same as above but registers it as this.myOwnName()
     ...mapActions(useCounterStore, { myOwnName: 'increment' }),
   },
 }
```

⭐监控action

可以使用 `store.$onAction()`观察action及其结果。传递给它的回调在会操作本身之前执行。`after`处理promise并允许在action resolve后执行功能。以类似的方式，`onError`允许您在操作抛出或拒绝时执行函数。这些对于在运行时跟踪错误很有用，具体还是看代码例子

这是一个在运行操作之前和它们解决/拒绝之后记录的示例。

```js
const unsubscribe = someStore.$onAction(
   ({
     name, // name of the action
     store, // store instance, same as someStore
     args, // array of parameters passed to the action
     after, // hook after the action returns or resolves
     onError, // hook if the action throws or rejects
   }) => {
     // a shared variable for this specific action call
     const startTime = Date.now()
     // this will trigger before an action on store is executed
     console.log(Start "${name}" with params [${args.join(', ')}].)
 
     // this will trigger if the action succeeds and after it has fully run.
     // it waits for any returned promised
     after((result) => {
       console.log(
         Finished "${name}" after ${
           Date.now() - startTime
         }ms.\nResult: ${result}.
       )
     })
 
     // this will trigger if the action throws or returns a promise that rejects
     onError((error) => {
       console.warn(
         Failed "${name}" after ${Date.now() - startTime}ms.\nError: ${error}.
       )
     })
   }
 )
 
 // manually remove the listener
 unsubscribe()
```

和state一样，这个subscribe也会挂到组件上，所以组件取消挂载的时候会自动消失。如果想避免这种情况，将`true`作为第二个参数传递以从当前组件<em>分离</em>操作<em>订阅</em>

```js
export default {
   setup() {
     const someStore = useSomeStore()
 
     // this subscription will be kept even after the component is unmounted
     someStore.$onAction(callback, true)
 
     // ...
   },
 }
```

##### <b>使用插件</b>

功能上来讲有了state，getter和action，一个仓库也就能投入使用了，不过，果然还是希望有一些插件来提供辅助功能。由于pinia的API比较底层，所以插件支持非常不错。

你可以做到：

- Add new properties to stores
- Add new options when defining stores
- Add new methods to stores
- Wrap existing methods
- Change or even cancel actions
- Implement side effects like Local Storage
- Apply <b>only</b> to specific stores

Pinia中使用插件的方法就是利用 `pinia.use()`函数，最简单的例子是往所有仓库中添加一个static属性。

```js
import { createPinia } from 'pinia'
 
 // add a property named secret to every store that is created after this plugin is installed
 // this could be in a different file
 function SecretPiniaPlugin() {
   return { secret: 'the cake is a lie' }
 }
 
 const pinia = createPinia()
 // give the plugin to pinia
 pinia.use(SecretPiniaPlugin)
 
 // in another file
 const store = useStore()
 store.secret // 'the cake is a lie'
```

别说还挺有用的，这样可以做到添加全局router, modal或者是 toast managers

⭐简介

Pinia 插件是一个函数，可以选择性地返回要添加到商店的属性。它有<b>一个</b>可选参数，一个context(上下文)

```js
export function myPiniaPlugin(context) {
   context.pinia // the pinia created with createPinia()
   context.app // the current app created with createApp() (Vue 3 only)
   context.store // the store the plugin is augmenting
   context.options // the options object defining the store passed to defineStore()
   // ...
 }
```

然后将此函数用`pinia.use()`传递给`pinia`：

```js
pinia.use(myPiniaPlugin)
```

注意，Plugins 仅适用于在插件本身之后创建的商店，并且 需要在这之前把`pinia`传递给 app，否则它们将不会被应用。

⭐扩充仓库

可以通过简单地在插件中返回对象来向每个商店添加属性：

```js
pinia.use(() => ({ hello: 'world' }))
```

您也可以直接在 store上设置属性，但如果可能，请使用返回版本，因为这样 devtools 可以自动跟踪：

```js
pinia.use(({ store }) => {
   store.hello = 'world'
 })
```

<em>插件返回</em>的任何属性都会被 devtools 自动跟踪，因此为了`hello`在 devtools 中可见，请确保仅当您想在 devtools 中调试它时才将其添加到`store._customProperties` <b>开发模式：</b>

```js
// from the example above
 pinia.use(({ store }) => {
   store.hello = 'world'
   // make sure your bundler handle this. webpack and vite should do it by default
   if (process.env.NODE_ENV === 'development') {
     // add any keys you set on the store
     store._customProperties.add('hello')
   }
 })
```

注意所有仓库都是reactive的，也就是说，会自动解开ref，computed等等。

```js
const sharedRef = ref('shared')
 pinia.use(({ store }) => {
   // each store has its individual hello property
   store.hello = ref('secret')
   // it gets automatically unwrapped
   store.hello // 'secret'
 
   // all stores are sharing the value shared property
   store.shared = sharedRef
   store.shared // 'shared'
 })
```

这解释了之前pinia为什么看起来非常直球，不用`.value`，还有神奇的读写。

⭐添加新的state

如果要将新的状态属性添加到商店或要在hydrate期间使用的属性，<b>则必须将其添加到两个地方</b>：

- On the `store` so you can access it with `store.myState`
- On `store.$state` so it can be used in devtools and, <b>be serialized during SSR</b>.

此外还必须要添加ref来维持值的一致性

```js
import { toRef, ref } from 'vue'
 
 pinia.use(({ store }) => {
   // to correctly handle SSR, we need to make sure we are not overriding an
   // existing value
   if (!Object.prototype.hasOwnProperty(store.$state, 'hasError')) {
     // hasError is defined within the plugin, so each store has their individual
     // state property
     const hasError = ref(false)
     // setting the variable on $state, allows it be serialized during SSR
     store.$state.hasError = hasError
   }
   // we need to transfer the ref from the state to the store, this way
   // both accesses: store.hasError and store.$state.hasError will work
   // and share the same variable
   // See https://vuejs.org/api/reactivity-utilities.html#toref
   store.hasError = toRef(store.$state, 'hasError')
 
   // in this case it's better not to return hasError since it
   // will be displayed in the state section in the devtools
   // anyway and if we return it, devtools will display it twice.
 })
```

请注意，插件中发生的状态更改或添加（包括调用`store.$patch()`）发生在存储处于活动状态之前，因此不会触发任何订阅。

⭐添加新的外部属性

当添加外部属性、来自其他库的类实例，或者仅仅是非反应性的东西时，您应该在将对象传递给 pinia 之前将其用`markRaw()`包装起来。

例子：

```js
import { markRaw } from 'vue'
 // adapt this based on where your router is
 import { router } from './router'
 
 pinia.use(({ store }) => {
   store.router = markRaw(router)
 })
```

⭐插件中使用订阅

没有问题，用就完了

```js
pinia.use(({ store }) => {
   store.$subscribe(() => {
     // react to store changes
   })
   store.$onAction(() => {
     // react to store actions
   })
 })
```

⭐添加新的option

在defineStore里面，你可以添加state，getter，action以外的option，这些新的option被插件利用

```js
defineStore('search', {
   actions: {
     searchContacts() {
       // ...
     },
   },
 
   // this will be read by a plugin later on
   debounce: {
     // debounce the action searchContacts by 300ms
     searchContacts: 300,
   },
 })
```

插件可以读取该选项以包装操作并替换原始操作：

```js
// use any debounce library
 import debounce from 'lodash/debounce'
 
 pinia.use(({ options, store }) => {
   if (options.debounce) {
     // we are overriding the actions with new ones
     return Object.keys(options.debounce).reduce((debouncedActions, action) => {
       debouncedActions[action] = debounce(
         store[action],
         options.debounce[action]
       )
       return debouncedActions
     }, {})
   }
 })
```

⭐TS

之前提到的所有操作都有ts支持，你甚至不需要使用 `any` 或者 `@ts-ignore`.

总之还是看看和插件相关的ts内容。

⭐⭐type 插件

```js
import { PiniaPluginContext } from 'pinia'
 
 export function myPiniaPlugin(context: PiniaPluginContext) {
   // ...
 }
```

⭐⭐type 新的state属性

```js
import 'pinia'
 
 declare module 'pinia' {
   export interface PiniaCustomProperties {
     // by using a setter we can allow both strings and refs
     set hello(value: string | Ref<string>)
     get hello(): string
 
     // you can define simpler values too
     simpleNumber: number
   }
 }
```

向商店添加新属性时，还应该扩展`PiniaCustomProperties`接口👆

然后就可以安全地写入和读取了

```js
pinia.use(({ store }) => {
   store.hello = 'Hola'
   store.hello = ref('Hola')
 
   store.simpleNumber = Math.random()
   // @ts-expect-error: we haven't typed this correctly
   store.simpleNumber = ref(Math.random())
 })
```

`PiniaCustomProperties`是一种通用类型，允许你引用商店的属性。

下面的示例中，我们将初始选项复制为`$options`（仅适用于选项商店）：

 pinia.use(({ options }) =&gt; ({ $options: options }))

我们可以使用以下 4 种通用类型来正确键入它（`PiniaCustomProperties`）：

```js
import 'pinia'
 
 declare module 'pinia' {
   export interface PiniaCustomProperties<Id, S, G, A> {
     $options: {
       id: Id
       state?: () => S
       getters?: G
       actions?: A
     }
   }
 }
```

SGA这些必须和源码中完全一样，毕竟是人家写好的，原文如下

> 提示
> 在泛型中扩展类型时，它们的命名必须<b>与源代码中的完全相同</b>。`Id`不能命名为`id`或`I`，也`S`不能命名为`State`。这是每个字母代表的意思：
> - S：state
> - G：getter
> - A：action
> - SS：setupStore/store

⭐⭐type 新状态

添加新的状态属性（同时添加到`store`和`store.$state`）时，需要将类型添加到`PiniaCustomStateProperties`。与 `PiniaCustomProperties`不同，它只接收`State`泛型：(注意两个长名称是不一样的👆)

```js
import 'pinia'
 
 declare module 'pinia' {
   export interface PiniaCustomStateProperties<S> {
     hello: string
   }
 }
```

⭐⭐type 新的creation options

```js
import 'pinia'
 
 declare module 'pinia' {
   export interface DefineStoreOptionsBase<S, Store> {
     // allow defining a number of ms for any of the actions
     debounce?: Partial<Record<keyof StoreActions<Store>, number>>
   }
 }
```

##### <b>在组件之外使用pinia</b>

pinia的任何仓库都依赖于根仓库来维持在任何调用中的一致性，一般情况下（组件语法下），由于pinia实例自动注入到了app，`useStore()`就直接解决问题了 ，不需要额外工作。但是，当在组件外工作的时候pinia不会自动注入，这时候就需要手动把pinia实例传给`useStore()`

根据所编写的应用程序的类型以不同方式解决此问题。

⭐单页应用

> If you are not doing any SSR (Server Side Rendering), any call of `useStore()` after installing the pinia plugin with `app.use(pinia)` will work:
> ```js
import { useUserStore } from '@/stores/user'
 import { createApp } from 'vue'
 import App from './App.vue'
 
 // ❌  fails because it's called before the pinia is created
 const userStore = useUserStore()
 
 const pinia = createPinia()
 const app = createApp(App)
 app.use(pinia)
 
 // ✅ works because the pinia instance is now active
 const userStore = useUserStore()
```

最简单的确保始终应用这种功能方法是通过将它们放置在安装 pinia 后始终运行的函数中来<em>延迟</em>调用`useStore()`。

看一个vue router的例子：

```js
import { createRouter } from 'vue-router'
 const router = createRouter({
   // ...
 })
 
 // ❌ Depending on the order of imports this will fail
 const store = useStore()
 
 router.beforeEach((to, from, next) => {
   // we wanted to use the store here
   if (store.isLoggedIn) next()
   else next('/login')
 })
 
 router.beforeEach((to) => {
   // ✅ This will work because the router starts its navigation after
   // the router is installed and pinia will be installed too
   const store = useStore()
 
   if (to.meta.requiresAuth && !store.isLoggedIn) return '/login'
 })
```

⭐SSR情况

详见SSR部分。一句话就是必须将`pinia`实例传递给`useStore()`. 这可以防止 pinia 在不同的<b>应用程序实例</b>之间共享全局状态。

#### <b>SSR</b>

##### <b>Vue&Vite</b>

首先，只要能在setup()函数的顶部调用useStore(),那么对于SSR，pinia就是开箱即用的

```js
export default defineComponent({
   setup() {
     // this works because pinia knows what application is running inside of
     // setup()
     const main = useMainStore()
     return { main }
   },
 })
```

于是还有在setup()以外使用的情况，这时候你需要把pinia实例（这个实例还会被传给app）传给useStore（）：

```js
const pinia = createPinia()
 const app = createApp(App)
 
 app.use(router)
 app.use(pinia)
 
 router.beforeEach((to) => {
   // ✅ This will work make sure the correct store is used for the
   // current running app
   const main = useMainStore(pinia)
 
   if (to.meta.requiresAuth && !main.isLoggedIn) return '/login'
 })
```

Pinia一般自动地把`$pinia`添加到了你的app里，这使得你可以在preFetch之类的函数里使用它

```js
export default {
   serverPrefetch() {
     const store = useStore(this.$pinia)
   },
 }
```

⭐State hydration

要hydrate初始状态，使用者需要确保 rootState 包含在 HTML 中的某处，以便 Pinia 稍后获取它。根据你用于 SSR 的内容，<b>出于安全原因，应该避免state</b>。官方推荐使用Nuxt.js 使用的@nuxt/devalue

```js
import devalue from '@nuxt/devalue'
 import { createPinia } from 'pinia'
 // retrieve the rootState server side
 const pinia = createPinia()
 const app = createApp(App)
 app.use(router)
 app.use(pinia)
 
 // after rendering the page, the root state is built and can be read directly
 // on pinia.state.value.
 
 // serialize, escape (VERY important if the content of the state can be changed
 // by the user, which is almost always the case), and place it somewhere on
 // the page, for example, as a global variable.
 devalue(pinia.state.value)
```

同样取决于你的SSR用的是啥，你会设置一个会在HTML里被`serialized`的初始状态变量

<em>还要防止XSS攻击，这个我不懂耶，谁来补一句</em>

> For example, with [vite-ssr](https://github.com/frandiox/vite-ssr) you can use the `transformState`[ option](https://github.com/frandiox/vite-ssr#state-serialization) and `@nuxt/devalue`:
> ```js
import devalue from '@nuxt/devalue'
 
 export default viteSSR(
 App,
 {
 routes,
 transformState(state) {
   return import.meta.env.SSR ? devalue(state) : state
 },
 },
 ({ initialState }) => {
 // ...
 if (import.meta.env.SSR) {
   // this will be stringified and set to window.__INITIAL_STATE__
   initialState.pinia = pinia.state.value
 } else {
   // on the client side, we restore the state
   pinia.state.value = initialState.pinia
 }
 }
 )
```

当然你也可以采取@nuxt/devalue的其他替代方案，举个例子，计入你能用`JSON.stringify()`/`JSON.parse()`完成parse的工作，你的表现会提升很多

##### <b>Nuxt.js</b>

将 Pinia 与Nuxt.js一起使用更容易，因为 Nuxt 在<em>SSR</em>方面会处理很多事情。例如，<b>不需要关心序列化或 XSS 攻击</b>。Pinia 支持 Nuxt Bridge 和 Nuxt 3

```bash
yarn add pinia @pinia/nuxt
 # or with npm
 npm install pinia @pinia/nuxt
```

pinia提供了一个<em>模块</em>来处理一切，只需将其添加到你的`modules`文件中

```js
// nuxt.config.js
 export default defineNuxtConfig({
   // ... other options
   modules: [
     // ...
     '@pinia/nuxt',
   ],
 })
```

然后就可以像正常一样使用store了

同样，假如要在setup之外使用store，你需要传pinia对象给useStore()

pinia已经把`$pinia`添加到了上下文中，可以在`asyncData()`和`fetch()`：中访问它

```js
import { useStore } from '~/stores/myStore'
 
 export default {
   asyncData({ $pinia }) {
     const store = useStore($pinia)
   },
 }
```

⭐自动import

默认情况 `@pinia/nuxt` 暴露一个自动import： `usePinia()`。这东西类似于 `getActivePinia()`，但是和Nuxt工作的更好，你也可以自己添加auto import，来让开发更方便：

```js
// nuxt.config.js
 export default defineNuxtConfig({
   // ... other options
   modules: [
     // ...
     [
       '@pinia/nuxt',
       {
         autoImports: [
           // automatically imports defineStore
           'defineStore', // import { defineStore } from 'pinia'
           // automatically imports defineStore as definePiniaStore
           ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
         ],
       },
     ],
   ],
 })
```

#### <b>小结</b>

总体而言pinia在使用上是很直观的，经过上面的快速上手应该已经能把老项目用pinia实现了，这也就达到了上手的目的。总结来看pinia（我看来的）优势大致有

- ts香
- 语法直观简单（不如说太简单）
- 插件支持好

要了解更多pinia内容可以从这几个角度入手：（不限于）

- 不同版本中的使用
- nuxt.js
- 和其他仓库的对比

要真正熟练pinia怕是还得写上一写，不过既然实验室推ts迟早会用到罢

#### <b>文档和引用</b>

官方文档：[https://pinia.vuejs.org/core-concepts/#using-the-store](https://pinia.vuejs.org/core-concepts/#using-the-store)

