---
title: SWR
slug: >-
  ynzowezexiygx0kbdlyco9pgnxe-ejb3wlaaeiqiumkxpozcbvopnfh-rmxtwu9geip5o8kkeawck6dnn6e-ik6qw0wh1idsu8kvyzccmcgnnfe-rphyw3cepiebzvkfkekcb45ln7g-zwugwgtneidggckwk3xcwztxnzc-zwugwg
sidebar_position: 3
---


# SWR

# 什么是 SWR

SWR 是由 [Next.js](https://nextjs.org/)（React 框架）背后的同一团队创建的<b>用于数据请求的 React Hooks 库。</b>

[https://swr.vercel.app/](https://swr.vercel.app/)

“SWR” 这个名字来自于 `stale-while-revalidate`：一种由 [HTTP RFC 5861](https://tools.ietf.org/html/rfc5861) 推广的 HTTP 缓存失效策略。这种策略首先从缓存中返回数据（过期的），同时发送 fetch 请求（重新验证），最后得到最新数据。

## 特性

<div class="callout callout-bg-2 callout-border-2">
<div class='callout-emoji'>✅</div>
<p>使用 SWR，组件将会<b>不断地</b>、<b>自动</b>获得最新数据流。<br/>UI 也会一直保持<b>快速响应</b>。</p>
</div>

- 通过 key 去除重复的请求，做到请求缓存和共享
- 在用户重新 focus 网页和网络重连时自动重新请求数据、自动定期重新请求
- 允许请求依赖其他动态数据，确保最大程度的并行性和串行请求
- 使用指数退避算法的错误重试，不会浪费资源频繁地重试
- UI的乐观更新与错误回滚
- 数据预请求和预填充

大部分特性可以自定义开启或者关闭。

# 安装

在 React 项目目录运行以下命令：

```
yarn add swr
```

或者用 npm:

```
npm install swr
```

# 基本使用

为了开始使用 SWR，我们需要先理解几个概念：

1. SWR 使用 key 来标识一个请求，这个 key 可以是（通常是）请求的路径，也可以是路径与 token 的组合，可以是一个数组，可以是一个对象。SWR 将深度地对比（递归地在每一层级都按值比较判断相等）这个 key，若 key 发生了变化，则会重新触发请求。
2. SWR 需要一个 fetcher 来进行请求。这个 fetcher 函数可以使用任意其他的请求方式，比如原生的 fetch，比如 axios 等等。以下是 fetcher 函数示例：

```js
// fetch (GET)
const fetcher = url => fetch(url).then(r => r.json())
// axios (GET)
const fetcher = url => axios.get(url).then(res => res.data)
```

## 核心 Hook 语法

```js
const { data, error, isLoading, isValidating, mutate } = useSWR(key, fetcher, options)
```

### 参数

- `key`: 请求的唯一 key。类型为 string（或者是 function / array / null） [(详情)](https://swr.bootcss.com/docs/arguments.html), [（高级用法）](https://swr.bootcss.com/docs/conditional-fetching.html)
- `fetcher`:<em>（可选）</em>一个根据 key 请求对应的数据的函数 [（详情）](https://swr.bootcss.com/docs/data-fetching.html)
- `options`:（<em>可选）</em>该 SWR hook 的配置参数

默认情况下，`key` 将作为参数传递给 `fetcher`。所以下面 1) 2) 这 2 个表达式是等价的：

```js
// 定义 fetcher
function fetcher(key) {
  return fetch(key).then(resp => resp.json());
}

useSWR('/api/user', url => fetcher(url))   // 1)
useSWR('/api/user', fetcher)               // 2)
```

你也可以不提供 fetcher，SWR 内部默认将会使用浏览器提供的 fetch 函数（来自 Fetch API）作为 fetcher：

```js
const { data, error, isLoading } = useSWR('/api/versions/')

if (isLoading)
    return <Loading />
if (error)
    return <Error reason={error.message}>
```

### 返回值

- `data`: 通过 `fetcher` 用给定的 key 获取的数据（如未完全加载，返回 undefined）
- `error`: `fetcher` 抛出的错误（或者是 undefined）
- `isLoading`: 是否有一个正在进行中的请求且当前没有“已加载的数据“。预设数据及之前的数据不会被视为“已加载的数据“
- `isValidating`: 是否有请求或重新验证加载
- `mutate(data?, options?)`: 更改缓存数据的函数 [（详情）](https://swr.bootcss.com/docs/mutation.html)

更多信息可以参考[这里](https://swr.bootcss.com/docs/advanced/understanding.html).

## 使用实例

### 基础用法

```js
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json())

function Profile() {
  const { data, error, isLoading } = useSWR("/api/user/123", fetcher)
  if (error) return <div>failed to load</div> 
  if (isLoading) return <div>loading...</div>  
  
  // 渲染数据  
  return <div>hello {data.name}!</div>
}
```

这里的 `fetcher` 是一个异步函数，它 <b>接受</b> SWR 的 <b>key</b> 并返回数据。

返回值将作为 `data` 传递，如果抛出错误，将作为 `error` 被捕获。

### Key：避免逻辑隔离后重复请求

通常情况下我们会在父组件请求一次数据，然后将数据拆分之后通过 props 传递给子组件中，或者使用 [React Context](https://legacy.reactjs.org/docs/context.html) 进行数据分发。一旦整个页面的深度增加，整个逻辑就会变得冗杂。

```js
// 页面组件

function Page() {
  const [user, setUser] = useState(null)

  // 请求数据
  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => setUser(data))
  }, [])

  // 全局加载状态
  if (!user) return <Spinner />

  return <div>
    <Navbar user={user} />
    <Content user={user} />
  </div>
}

// 子组件

function Navbar({ user }) {
  return <div>
    ...
    <Avatar user={user} />
  </div>
}

function Content({ user }) {
  return <h1>Welcome back, {user.name}</h1>
}

function Avatar({ user }) {
  return <img src={user.avatar} alt={user.name} />
}
```

而如果我们使用 SWR，就可以很方便地将每个数据都 <b>绑定 </b>在需要这个数据的子组件上，每个组件相互独立，父组件不需要关心数据或者数据传递，父组件只需要关心他的本职工作——渲染子组件即可。

```js
// 封装好的 useUser hook
function useUser() {
  const { data, mutate, error } = useSWR("api_user", userFetcher);

  const loading = !data && !error;
  const loggedOut = error && error.status === 403;

  return {
    loading,
    loggedOut,
    user: data,
    mutate
  };
}


// 页面组件

function Page() {
  return <div>
    <Navbar />
    <Content />
  </div>
}

// 子组件

function Navbar() {
  return <div>
    ...
    <Avatar />
  </div>
}

function Content() {
  const { user, isLoading } = useUser()
  if (isLoading) return <Spinner />
  return <h1>Welcome back, {user.name}</h1>
}

function Avatar() {
  const { user, isLoading } = useUser()
  if (isLoading) return <Spinner />
  return <img src={user.avatar} alt={user.name} />
}
```

一般来讲，这么做虽然可以使得整个逻辑变得清晰，但是代价就是整个数据会被请求多次！但是由于 SWR 搭载的 key 机制，使得以上代码虽然调用了两次`useUser`，却只有 <b>1个请求</b> 发出，因为这两个`useUser`使用的 key 是相同的，请求会被自动地去除重复、缓存和共享！

这使得你可以在任何地方重用数据 hooks 而不必担心请求重复发生。

### 错误重试

在出现错误时 SWR 使用指数退避算法重发请求。该算法允许应用从错误中快速恢复，而不会浪费资源频繁地重试。

可以通过配置 options 中的 [onErrorRetry](https://swr.bootcss.com/docs/api.html#options) 选项覆盖该行为：

```js
useSWR('/api/user', fetcher, {
  onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
    // 404 时不重试。
    if (error.status === 404) return

    // 特定的 key 时不重试。
    if (key === '/api/user') return

    // 最多重试 10 次。
    if (retryCount >= 10) return

    // 5秒后重试。
    setTimeout(() => revalidate({ retryCount: retryCount }), 5000)
  }
})
```

这个回调让你可以灵活的根据各种条件重试。你也可以通过设置 `shouldRetryOnError: false` 来禁用它。

### 数据依赖、条件请求

有的时候，我们需要根据前一个请求获取到的数据来拼装出下一个请求的 URL 或者请求体。一个朴素的想法是使用 `if` 来包裹或者限制 `useSWR`：

```ts
function Profile() {
  const {
    data: user,
    isLoading: isUserLoading,
    error: fetchUserError
  } = useSWR('/api/user/get');  // 通过 Cookie 来获取当前 user

  if (isUserLoading) return <Loading />;
  if (fetchUserError) return <Error message={fetchUserError.message} />;
  
  const { data: avatarUrl, isLoading, error } = useSWR('/api/avatar/get/' + user.id);
  
  if (isLoading) return <Loading />
  if (error) return <Error message={error.message} />;
  
  return <img src={avatarUrl} alt={user.name} />
}
```

但是，如果你仔细阅读过 [[必读] React Hooks](wikcnAj97pK5WexPjxFZ3AUEWRc) 的「<b>禁忌事项</b>」章节，那么就应当知道：这样是完全不正确的，甚至可能导致你的整个组件的状态直接崩掉。

正确的做法有以下两种：

#### 条件请求

```js
function Profile() {
  const {
    data: user,
    isLoading: isUserLoading,
    error: fetchUserError
  } = useSWR('/api/user/get');  // 通过 Cookie 来获取当前 user
  const { data: avatarUrl, isLoading, error } = useSWR(
    isUserLoading ? null : '/api/avatar/get/' + user.id  // (1)
  );

  if (isUserLoading || isLoading) return <Loading />;
  if (fetchUserError) return <Error message={fetchUserError.message} />;
  if (error) return <Error message={error.message} />;
  
  return <img src={avatarUrl} alt={user.name} />
}
```

注意，在 `(1)` 这一行，我们在前置数据没准备好时，传给 `useSWR` 的 key 是 `null`。那么这个时候 SWR 库就会知道前置数据还没准备好，而把对应的 `isLoading` 直接设置为 `true`，直到 key 从 `null` 改变为某个字符串。

#### 依赖请求

```js
function MyProjects() {
  const { data: user } = useSWR('/api/user')
  const { data: projects } = useSWR(() => '/api/projects?uid=' + user.id)  // (2)
  // 传递函数时，SWR 会用返回值作为 `key`。
  // 如果函数抛出错误或返回 falsy 值，SWR 会知道某些依赖还没准备好。
  // 这种情况下，当 `user`未加载时，`user.id` 抛出错误
 
  if (!projects) return 'loading...'
  return 'You have ' + projects.length + ' projects'
}
```

注意，在 `(2)` 这一行，我们使用一个函数来包裹我们的 key。SWR 将会自动执行这个函数，并将其返回的结果字符串作为真正的 key。这个函数在执行的过程中如果报错了，那么 SWR 就会（按照文档约定）将其视为存在数据依赖的函数。例如在上例中，`/api/user` 请求完成前，`user` 变量的值将会是 undefined。此时，执行 `() => '/api/projects?uid=' + user.id` 这个函数将会抛出异常：无法访问 `undefined` 上的 `id` 属性。

当然，SWR 并没有能力解析这个异常的发生到底是因为哪个数据没准备好；但没关系，每当有任何数据准备好，它对应的 `isLoading` `data` 和 `error` state 就会发生改变，从而触发 React 对<b>整个组件</b>的 unmount、重新渲染、mount。在此期间，之前遇到了异常的`useSWR` Hook，作为这个组件的一部分，自然也会被 React 重新调用。如果此时执行还是有异常，说明当前刚刚准备好的数据（也就是触发 re-render 的数据）不是所依赖的数据；如果此时执行成功了，说明依赖的数据已经成功拿到，那么就可以开始发送当前的数据请求了。所以，即使 SWR 无法提前分析出到底当前异常的 useSWR key 是因为依赖了哪个数据，它也仍然能够保证在所依赖的数据准备好时，及时地得知「依赖数据准备好了」这一信息。

## 自动重新请求

有时候，你可能希望 SWR 在满足某些条件时自动重新请求数据。

### 聚焦时重新请求

SWR 会在你重新聚焦页面的时候自动重新请求数据，来保证用户数据的实时性。

[focus-revalidate.mp4](/assets/PByYbfzcro9n5jx1sVFcw7IGnLf.mp4)

这个特性是默认开启的，你也可以通过 `revalidateOnFocus` 选项禁用它。

### 定时重新请求（轮询）

在很多情况下，数据会因为多个设备、多个用户、多个选项卡而发生改变。我们可能需要随时确保数据的更新。

SWR 会为你提供自动重新请求数据的选项。而且只有与 hook 相关的组件 <b>在屏幕上</b> 时，才会重新请求。

[refetch-interval.mp4](/assets/MrgdbB0Ahoi4aOxtX4VcjoThncA.mp4)

你可以通过设置 `refreshInterval` 值来启用它：

```js
useSWR('/api/todos', fetcher, { refreshInterval: 1000 })
```

还有其他选项，例如 `refreshWhenHidden` 和 `refreshWhenOffline`。这两项默认都是禁用的，所以当网页被隐藏或没有网络连接时，SWR 不会发起请求。

### 重新连接时重新请求

SWR 会在用户重新联机时重新发起请求，比较常见的例子是用户解锁了他们的计算机但网络还没有连上，为了确保数据始终是最新的，SWR 会在网络恢复时自动重新请求。

该特性默认是启用的。你可以通过 `revalidateOnReconnect` 选项禁用它。

### 重新请求过程中保留旧数据

重新请求会导致 `isLoading` 被设置为 `true`，但你可能希望在重复请求期间，应用仍然可以使用旧的数据，而不必进入 loading 状态等待请求完毕。这可以通过 `keepPreviousData` 参数实现：

```js
useSWR('/api/todos', fetcher, {
  refreshInterval: 1000,
  keepPreviousData: true,
});
```

你还可以通过 `fallbackData` 来指定第一次请求完成之前应当返回的 `data`。组合使用时，将完全不会进入 `isLoading` 为 `true` 的状态：

```js
useSWR('/api/todos', fetcher, {
  refreshInterval: 1000,
  keepPreviousData: true,
  fallbackData: [],
});
```

## 修改数据

可能你已经发现了，我们介绍的全部都是「读取数据」（GET 请求），而不涉及到修改数据。在使用 SWR 时，如果你只是通过指定使用 POST 的 fetcher，发送了增加、修改或者删除数据的 POST 请求，会发现界面上渲染出来的数据并没有更新。这是因为 SWR 并不知道你的 fetcher 里面修改了数据，它默认你的 fetcher 只进行数据的读取。换句话说，如果你的 fetcher 并不是对数据进行了只读（read-only）操作，就需要手动告知 SWR 重新拉取数据才可以。

常用的方法有三种：

### 全局更新 key 对应的数据

```js
import { useSWRConfig } from "swr";
const { mutate } = useSWRConfig();

function Profile() {
  const { data, error, isLoading, mutate } = useSWR("/api/user/123")
  
  // 需要使用 React 提供的 useCallback 来在组件中定义函数
  const updateName = useCallback(function (newName) {
    await fetch("/api/user/setName", { method: "POST", body: newName });
    const newData = { ...data }; // 复制 data
    newData.name = newName; // 手动更新 data
    mutate("/api/user/123", newData); // 这里的 key 要和此前 useSWR 的 key 一致
  }, [data])
  
  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
  
  // 渲染数据
  return <>
    <div>hello {data.name}!</div>
    <button onClick={() => { updateName(data.name.toUpperCase()) }}>
      Change name to uppercase
    </button>
  </>
}
```

调用了 `mutate` 之后，这个 React 项目中所有使用了 `useSWR("/api/user/getUsername", ...)` 的组件都会根据 `newUsername` 来重新渲染。

### 在初始化 SWR Hook 时直接获取到对应的 mutator 来更新数据

```js
function Profile() {
  const { data, error, isLoading, mutate } = useSWR("/api/user/123")
  
  // 需要使用 React 提供的 useCallback 来在组件中定义函数
  const updateName = useCallback(async function (newName) {
    await fetch("/api/user/123/setName", { method: "POST", body: newName });
    const newData = { ...data }; // 复制 data
    newData.name = newName; // 手动更新 data
    mutate(newData);  // 注意这里不需要再传入 key 了，因为 key 在第 2 行已经绑定
  }, [data])
  
  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div> 
  
  // 渲染数据
  return <>
    <div>hello {data.name}!</div>
    <button onClick={() => { updateName(data.name.toUpperCase()) }}>
      Change name to uppercase
    </button>
  </>
}
```

### 使用 `useSWRMutation` Hook

这种方法可以在修改数据的同时，让 SWR 自动重新拉取最新的数据。这个 Hook 的基本用法如下：

```js
const { trigger, isMutating } = useSWRMutation('/api/user', mutationFetcher, options)
```

其中，`options` 可选，`mutationFetcher` 需要你自己编写：

```js
function mutationFetcher(key, data) {
  // data.arg 里面储存了你之后调用 trigger 时传入的参数。
  // 这里你需要根据接口文档，发送一个 POST / PUT / DELETE / ... 请求给后端。
}
```

这种方法有一些限制，就是需要读取数据和修改数据的 API 采用同样的路径。例如，需要 GET /api/user/1 表示读取 id=1 的用户的信息，而 POST 同样的路径（/api/user/1）就表示修改 id=1 的用户的信息。这是因为在调用 `useSWRMutation` 时，只有和它的 key 相同的 `useSWR` 中的数据（`data`）才会被清空并重新拉取最新数据。https://swr.vercel.app/docs/mutation#useswrmutation

当然，在你逐渐进阶并熟悉 SWR 的高级用法之后，有很多办法可以绕过这个限制，例如可以使用自定义的统一的 key，再在 getFetcher / postFetcher 里面映射回正确的 API。也可以通过为 fetcher 增加 extraArgs 并依此修改 key 来实现对同样的 key 拼接出不同的 url。但是目前，我们暂且先依照这个限制来编写示例：

```js
import useSWR from "swr";
import useSWRMutation from "swr/mutation"; // 注意包名的区分

// 这个 postFetcher 可以拿去你的项目里直接用，按需修改 fetch 的参数即可
function postFetcher(key, { arg }) {
  return fetch(key, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(arg),
  }).then((res) => res.json());
}

function Profile() {
  const { data, error, isLoading, mutate } = useSWR("/api/user/123")
  const { trigger, isMutating } = useSWRMutation("/api/user/123", postFetcher)
  
  if (error) return <div>failed to load</div> 
  if (isLoading) return <div>loading...</div>  
  
  // 渲染数据
  return <>
    <div>hello {data.name}!</div>
    <button
      onClick={() => {
        // 传给 trigger 的参数会变成传给 postFetcher 的第二个参数的 arg 属性的值
        await trigger({ name: data.name.toUpperCase() })  // 如果出错了会 throw 一个 error
      }}
      disabled={isMutating}
    >
      Change name to uppercase
    </button>
  </>
}
```

### 修改方法总结

你可能觉得 SWR 里面修改数据非常的不直观、有很多限制。但其实如果理解了 SWR 的设计思路，上面这些限制都是非常直白且容易理解的。

SWR 的设计思路相当于根据 key 来缓存请求的结果，从而节省带宽、消除多个组件各自重复请求 API 的情况，仅在<b>必要的时候</b>才刷新数据。然而 SWR 本身并不能知道所有的「必要的时候」，它自己只能自动进行一些类似于浏览器失去焦点又重新获得焦点时重新拉取数据的行为。那么，当你（通过 POST 等方法）修改了某项数据时，必须告知 SWR 你修改了这个数据，否则 SWR 就不会刷新数据，导致界面上展示的数据出现滞后。

告知 SWR 的方法又分为两类。

第一类是你不仅告知它某个数据变了，还把新的值一同告诉了它：参考方法一和方法二的 `mutate` 函数，我们在给后端发送请求（并且后端返回了成功！）之后，还需要手动构造出最新的数据一同传给 `mutate`。注意，在这类方法里面，你的 `POST` 请求并没有通过 SWR 发送，而是在手动发送成功后，再手动调用 `mutate`。

第二类是你仅仅告知它某个数据变了，但是不告诉他最新的值。一般是因为你也不知道最新的值是什么。那么这个时候就需要 SWR 自动拉取最新的数据，参考方法三 `useSWRMutation`。注意，在这个方法里面，你的 POST 是通过调用 SWR 提供的 `trigger` 函数来发送的，因此 SWR 知道你修改了这个 key 对应的数据，无需再调用  `mutate` 函数。

## Suspense

SWR 支持 React 新的 Suspense 和 ErrorBoundary 功能，但官方文档目前仍不推荐将 SWR 和 Suspense 一起使用，详情参考 https://swr.vercel.app/zh-CN/docs/suspense

官方文档列举了以下几个不推荐的原因：

> 1. React 仍然不建议在 SWR 这样的数据框架中使用 `Suspense` ([更多信息](https://reactjs.org/blog/2022/03/29/react-v18.html#suspense-in-data-frameworks))。根据我们的调查结果，这些 API 将来可能会发生变化。
> 2. Suspense 模式会在数据准备就绪前暂停渲染，这意味着它很容易导致请求瀑布问题。为了避免这种情况，应该在渲染之前预请求获取资源。[更多信息](https://swr.vercel.app/zh-CN/docs/prefetching)
> 3. 通常，当启用 `suspense` 时，可以确保 `data` 在渲染时始终是准备就绪的。但是，当它与条件请求或依赖请求一起使用时，如果请求被<b>暂停</b>，`data` 将会是 `undefined`。事实上，将条件请求或依赖请求和 Suspense Mode 一起使用被认为是一种反模式（anti-pattern）：https://github.com/vercel/swr/pull/357#issuecomment-627089889

> [[必读] SWR](ORpMwVejjirhOMkNtszcAuLunnb)

