---
title: Fetch API
slug: Fetch API
sidebar_position: 3
---


# Fetch API

<<<<<<< HEAD
Author:李宇谦/陆俊宇/任炜烨/蒋旻昊/张书怀

在Fetch API出现之前的"远古时代"，开发者只能依靠笨重的`XMLHttpRequest`（XHR）来发送网络请求。这就像每次寄快递都要亲自跑到邮局填一堆表格——虽然能完成任务，但效率极低。2015年，随着Fetch API的诞生，Web数据获取终于迎来了"顺丰时代"——简单、快速、可靠。

### 传统XHR vs 现代Fetch

```
// xhr
const xhr = new XMLHttpRequest();
xhr.open('GET', '/api/data');
xhr.onload = function() {
  if (xhr.status === 200) {
    console.log(JSON.parse(xhr.responseText));
  }
};
xhr.send();

// Fetch
fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data));
```

## 为什么Fetch成为现代开发的首选？

<b>Promise基础</b>：告别"回调地狱"

Fetch基于Promise设计，让异步代码变得线性可读：

```
// 传统嵌套回调
getUser(userId, function(user) {
  getPosts(user.id, function(posts) {
    getComments(posts[0].id, function(comments) {
      console.log(comments);
    });
  });
});

// Fetch链式调用
fetch(`/users/${userId}`)
  .then(res => res.json())
  .then(user => fetch(`/posts?user=${user.id}`))
  .then(res => res.json())
  .then(posts => fetch(`/comments/${posts[0].id}`))
  .then(res => res.json())
  .then(comments => console.log(comments));
```

<b>更合理的默认行为</b>

- <b>不会因HTTP错误状态（如404）reject</b>：只在网络故障时reject
- <b>内置CORS支持</b>：通过`mode`选项灵活控制
- <b>流式数据处理</b>：可以处理大文件分块传输

<b>与现代语法完美融合</b>

配合async/await使用，代码几乎像同步代码一样简洁：

```
async function loadData() {
  try {
    const userRes = await fetch('/api/user');
    const user = await userRes.json();
    
    const postsRes = await fetch(`/api/posts?user=${user.id}`);
    const posts = await postsRes.json();
    
    return { user, posts };
  } catch (error) {
    console.error('数据加载失败:', error);
    throw error;
  }
}
```
=======
Author:李宇谦/陆俊宇/任炜烨/蒋旻昊

Fetch API 是 XMLHttpRequest 的一个理想的替代方案。它更易上手，使用了 Promise而非回调函数，支持更现代的异步写法；且功能完备，完全能够让我们抛弃对第三方网络请求库的依赖。
>>>>>>> 0ad3f6286ec5beaab9cca8122ad2d90d7cafec29

## fetch() 方法

通过 `fetch()` 方法，我们可以向后端发送请求。

### 参数

1. input: string
    在这里我们可以放上我们需要请求的 url 字符串。

2. init（可选）
    一个配置项对象，可选的参数可见 [fetch() - Web API 接口参考 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/fetch)。常用参数如下：
    - method: 请求方法，如 GET、POST等。默认为 GET。
    - headers: 即 HTTP 请求头。
    - body: 请求的body。<b>如果携带数据为对象的话，需先调用 JSON.stringify() 将对象转为字符串。</b>GET 请求无法携带 body。
    - credentials: 请求的 credentials，如 `omit`、`same-origin` 或者 `include`。<b>如果需要携带跨域 cookie，必须将此参数设为 </b><b>include</b><b>。</b>

### 返回值

Response 对象。

一个 Response 对象包含后端返回结果的相关信息。具体介绍可见 [Response - Web API 接口参考 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Response)。下面介绍几个常用属性：

- status: number
    获取后端返回的状态码。

- statusText: string
    状态信息。

- ok: boolean
    Response.ok 是一个布尔值，如果后端返回的状态码在 200 - 299，则此值为 true，否则为 false。通过 Response.ok，我们可以得知我们的请求是否成功。

- headers
    一个 Headers 对象，包含返回头信息。

Response 对象也提供了一些方法，用于获取返回数据。需要注意的是，Response 对象实现了 ReadableStream 接口，因此数据只能异步读取。

-  json()
    这是我们最常用方法，将返回的内容当作 json 解析并返回。

-  blob()
    将返回数据解析为 blob。

- text()
    将返回数据解析为纯文本。

<<<<<<< HEAD
## 基础配置选项

```
fetch(url, {
  method: 'POST', // GET, PUT, DELETE等
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token123'
  },
  body: JSON.stringify(data), // 支持FormData、Blob等
  mode: 'cors', // no-cors, same-origin
  credentials: 'include', // 携带Cookie
  cache: 'no-store' // 控制缓存行为
});
```

=======
>>>>>>> 0ad3f6286ec5beaab9cca8122ad2d90d7cafec29
## 示例

下面的代码封装了一个通用的请求函数：

```ts
// 后端的一般返回格式：
interface ResponseType<T> {
  code: number;
  msg: string;
  data: T;
}

// 请求前缀：
const prefix = "https://www.xxx.com/api/";

// 类型参数 T 为返回的数据类型，即 ResponseType 中的 data 部分，应根据接口文档自行定义
const request = async <T>(
  url: string,
  options: RequestInit,
): Promise<T> => {
  const response = await fetch(prefix + url, {
    ...options,
    credentials: "include", // 如果无跨域携带cookie的需求可不加
  });
  if (response.ok) {
    const res = (await response.json()) as ResponseType<T>;
    if (res.code === 0) {
      return res.data;
    } else {
      // 错误处理...
    }
  } else {
    // 错误处理...
  }
};
```

我们最常用的请求方法是 POST，因此可以在 `request` 函数的基础上再封装一个 `post` 函数：

```ts
export const post = async <T>(
  url: string,
  data?: object,
): Promise<T> => {
  return await request(
    url,
    {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    },
  );
};
```

