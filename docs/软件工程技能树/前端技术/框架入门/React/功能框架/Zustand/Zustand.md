---
title: Zustand
slug: ruan-jian-gong-cheng-ji-neng-shu/qian-duan-ji-shu/kuang-jia-ru-men/react/gong-neng-kuang-jia/zustand/zustand
sidebar_position: 2
---

# Zustand

Author：NA

Zustand 是一个基于 Reack Hooks API 的轻量级、无偏见的 React 状态管理库。

GitHub: https://github.com/pmndrs/zustand

# 创建

使用 zustand 提供的 `create` 函数创建一个 store 钩子：

```js
// loginStore.js
import { create } from 'zustand';

export const useLoginStore = create((set) => ({
    loggedIn: false,
    login: () => set({loggedIn: true}),
    logout: () => set({loggedIn: false}),
}));
```

`create` 函数需要传入一个回调函数，其参数为一个setter，而返回值为一个对象，对象中可以有一些属性和方法。

在上面的例子中，我们创建了一个保存登陆状态的 store，其中 `loggedIn` 是一个布尔值，用于保存当前的登录态，而 `login` 和 `logout` 是两个方法，用于修改登录状态。需要修改状态的方法需要调用传入的 `set` 函数，向 `set` 函数中传入要修改的属性的新的值，具体使用方式和  React 的类组件的 `setState` 类似。

此外，还可以向 `set` 函数中传入一个回调函数，其输入是当前状态，返回值是修改后的状态。这种方法可以让我们根据当前状态来决定修改后的值是什么。

下面是一个例子，用于反转登录状态：

```js
const useLoginStore = create((set) => ({
    loggedIn: false,
    flip: () => set((state) => !state.loggedIn),
}))
```

# 使用

在文件中，引入刚刚定义的 store 钩子：

```js
import { useLoginStore } from "../store/loginStore";
```

然后使用引入的钩子获取存储的状态或是方法。获取方式是向钩子传入回调参数，指定想要提取的部分：

```js
export default LoginPage() {
    const loggedIn = useLoginStore((state) => state.loggedIn);
    const login = useLoginStore((state) => state.login);
    const logout = useLoginStore((state) => state.logout);
    
    return (
        <>
            {
                loggedIn
                ? <div>
                      您好！
                      <button onClick={logout}>登出</button>
                  </div>
                : <button onClick={login}>请登录</button>
            }
        </>
    )
}
```

这样，我们就能在组件中获得并修改响应式的全局状态了。

# 高级

上面，我们介绍了 zustand 的基础使用。下面我们再来看一些更高级的功能。

## 获取整个 store

有时候，我们会觉得一个个获取 store 的状态或方法过于麻烦，那么我们可以一次性获取到整个 store：

```js
export default LoginPage() {
    const loginStore = useLoginStore();
    
    return (
        <>
            {
                loginStore.loggedIn
                ? <div>
                      您好！
                      <button onClick={loginStore.logout}>登出</button>
                  </div>
                : <button onClick={loginStore.login}>请登录</button>
            }
        </>
    )
}
```

但需要注意的是，当你直接引入整个 store 时，如果你的 store 中有多个状态，那么即使有些与当前组件无关的状态被改变了，当前组件也会重新渲染，从而带来性能问题。

## 持久化

作为一个全局状态管理的库，我们自然希望它的状态不要在刷新时丢失。这时，我们可以使用 zustand 提供的 `persist` 中间件。

文档链接：

下面我们引入一下 `persist` 来改写我们之前创建的 loginStore:

```js
import { create } from 'zustand';
import { persist, createJSONStorage } from "zustand/middleware";

export const useLoginStore = create(
    persist(
        (set) => ({
            loggedIn: false,
            login: () => set({loggedIn: true}),
            logout: () => set({loggedIn: false}),
        }),
        {
            name: "login-store",
            storage: createJSONStorage(() => sessionStorage), // (optional) localStorage by default
        }
    )
);
```

这次，我们不直接传入回调函数，而是将回调函数传入 `persist` 函数，并传入第二个参数：一个对象，里面的 `name` 属性指定了本地存储中这份数据所对应的 key; `storage` 指定了要使用的本地存储，默认是 `localStorage`，如果想换成 `sessionStorage`，我们需要借助 zustand 提供的 `createJSONStorage` 来创建可以存储 JSON 的存储区（其实就是 JSON.stringify & JSON.parse）。在这里，我们可以将 `persist` 理解为一个装饰器，帮我们在数据操作时同步到本地存储。

## 划分 store

这里直接照抄文档中的例子。

下面有两个 store 的切片（以回调函数的形式）：

```js
export const createFishSlice = (set) => ({
  fishes: 0,
  addFish: () => set((state) => ({ fishes: state.fishes + 1 })),
})

export const createBearSlice = (set) => ({
  bears: 0,
  addBear: () => set((state) => ({ bears: state.bears + 1 })),
  eatFish: () => set((state) => ({ fishes: state.fishes - 1 })),
})
```

我们将其注入同一个 create 函数中，即可在同一个 store 中同时管理两个切片的状态：

```js
import { create } from 'zustand'
import { createBearSlice } from './bearSlice'
import { createFishSlice } from './fishSlice'

export const useBoundStore = create((...a) => ({
  ...createBearSlice(...a),
  ...createFishSlice(...a),
}))
```

这样，我们就能在组件中只引入集成的 store，但以模块化的方式编写其各个组成部分。

当然，我们也可以在一个操作中更新多个切片的状态：

```js
export const createBearFishSlice = (set) => ({
  addBearAndFish: () => {
    createBearSlice(set).addBear()
    createFishSlice(set).addFish()
  },
})
```

```js
export const useBoundStore = create((...a) => ({
  ...createBearSlice(...a),
  ...createFishSlice(...a),
  ...createBearFishSlice(...a),
}))
```

还有更多高级功能，可参见 zustand 的 GitHub README。

