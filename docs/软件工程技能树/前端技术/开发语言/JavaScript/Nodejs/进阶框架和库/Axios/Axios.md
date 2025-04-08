---
title: Axios
slug: Axios
sidebar_position: 1
---


# Axios

Author:李予谦/张志心/蒋旻昊

[官方文档](https://axios-http.com/docs/intro)

# 介绍

Axios 是一款基于 Promise 的可以用于浏览器和 node.js 的网络请求库。

<<<<<<< HEAD
在Axios前，前端开发者需要这么写：

```
// 原生XMLHttpRequest
const xhr = new XMLHttpRequest();
xhr.open('GET', '/api/users');
xhr.onload = function() {
  if (xhr.status === 200) {
    console.log(JSON.parse(xhr.responseText));
  } else {
    console.error('请求失败');
  }
};
xhr.onerror = function() {
  console.error('网络错误');
};
xhr.send();

// jQuery的$.ajax
$.ajax({
  url: '/api/users',
  method: 'GET',
  success: function(data) {
    console.log(data);
  },
  error: function(err) {
    console.error(err);
  }
});
```

引入Axios后：

```
// 浏览器和Node.js完全相同的API
axios.get('/api/users')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });

// 配合async/await更优雅
async function fetchUsers() {
  try {
    const { data } = await axios.get('/api/users');
    return data;
  } catch (error) {
    showErrorToast(error.message);
  }
}
```

其优点在于：

### 企业级应用验证

<b>GitHub统计</b>：

- 每周下载量超过5000万次
- 被94%的现代前端项目使用
- React/Vue官方文档推荐

<b>典型案例</b>：

- 美团：统一所有前端项目的HTTP客户端
- 腾讯：基于Axios封装的内部请求库
- Airbnb：结合Redux管理API状态

=======
>>>>>>> 0ad3f6286ec5beaab9cca8122ad2d90d7cafec29
<b>Axios 的特性：</b>

- 从浏览器中创建 XMLHttpRequests
- 从 node.js 创建 http 请求
- 支持 Promise API
- 拦截请求和响应
- 转换请求数据和响应数据
- 取消请求
- 自动转换 JSON 数据
- 客户端支持防御 XSRF

<b>使用cdn：</b>

```cpp
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

或者

```cpp
<script src="https://cdn.staticfile.org/axios/0.18.0/axios.min.js"></script>
```

<b>使用npm：</b>

```cpp
$ npm install axios
```

# 基本使用

Axios 提供了两种不同的形式来发送 HTTP 请求，一种是 axios() ，另一种是分别通过 axios 对象提供的与 HTTP 方法对应的方法来发送请求，比如：axios.get()、axios.post()、axios.delete() 等等（该方法被描述为请求方法的别名）。

# axios API 的使用

axios(config) 方法接受一个对象，包含了对于请求的一些配置。

配置项包括：

- method 请求对方法（get，post等），默认值为 get
- url 请求的地址 （这个是必须的）
- data 请求发送的数据（post等请求需要）

1. 发送 POST 请求，请求响应的处理在 then 和 catch 回调函数中，如果正常进入 then，异常进入 catch。

```cpp
// 发送 POST 请求
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
}).then(res => {
    consloe.log(res)
}).catch(err => {
    console.log(err)
})
```

1. 发送 GET 请求，因为是默认的方法，所以不需要配置 method。

```cpp
axios('user/12345');
```

## 请求别名的使用

axios 还为每一个 HTTP 的方法提供与之对应的方法来发送对应的请求。

```cpp
axios.request(config)
axios.get(url[, config])
axios.delete(url[, config])
axios.head(url[, config])
axios.post(url[, data[, config]])
axios.put(url[, data[, config]])
axios.patch(url[, data[, config]])
// 在使用别名方法时，url，method，data 这些属性都不必在配置中指定。
```

- get

```cpp
axios.get('/user?ID=12345').then(function (response) {
  console.log(response);
}).catch(function (error) {
  console.log(error);
});
```

- post

```cpp
axios.post('/user', {
  firstName: 'Fred',
  lastName: 'Flintstone'
}).then(function (response) {
  console.log(response);
}).catch(function (error) {
  console.log(error);
});
```

## 响应结构

axios 请求的响应包含如下信息：

```cpp
{
  // `data` 由服务器提供的响应，是后端返回的数据，一般比较关注这个字段
  data: {},
  // `status`  HTTP 状态码
  status: 200,
  // `statusText` 来自服务器响应的 HTTP 状态信息
  statusText: "OK",
  // `headers` 服务器响应的头
  headers: {},
  // `config` 是为请求提供的配置信息
  config: {},
        request: {}
}
```

使用 then 时，可以接收到这样的响应：

```cpp
axios.get("/user/12345")
  .then(function(response) {
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
  });
```

## 并发请求

axios 可以使用 `axios.all(iterable)` 和 `axios.spread(callback)` 来实现请求的并发。

```cpp
function getUserAccount() {
  return axios.get('/user/12345');
}
 
function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}
axios.all([getUserAccount(), getUserPermissions()])
  .then(axios.spread(function (acct, perms) {
    // 两个请求现在都执行完成
  }));
```

## 创建实例

使用自定义配置来新建一个 axios 实例，写法为 `axios.create([config])`。

```cpp
const instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});
```

创建的实例中的 axios api 改为了 request() api，使用方法是一样的，如请求别名等函数。

实例所拥有的方法：

```cpp
axios#request(config)
axios#get(url[, config])
axios#delete(url[, config])
axios#head(url[, config])
axios#post(url[, data[, config]])
axios#put(url[, data[, config]])
axios#patch(url[, data[, config]])
```

axios 会把这些方法中的 config 和创建实例时制定的 config 合并到一起使用。

## 配置默认值

可以为 axios 实例设置默认值，默认值以一定优先级合并：

`lib/defaults.js` 中的默认值 ➡️ 实例的 defaults 属性 ➡️ 请求的 config 参数

```cpp
// 全局的 axios 默认值
// 通过 axios.defaults 设置

axios.defaults.baseURL = 'global-url';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 自定义实例默认值

// - 在创建时配置
var instance = axios.create({
        baseURL: 'myurl'
});
// - 在创建后设置
instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
```

## 更多请求配置项目

下面是创建请求时可用的配置选项，注意只有 url 是必需的。如果没有指定 method，请求将默认使用 get 方法。

```cpp
{
  // `url` 是用于请求的服务器 URL
  url: "/user",

  // `method` 是创建请求时使用的方法
  method: "get", // 默认是 get

  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseURL: "https://some-domain.com/api/",

  // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 只能用在 "PUT", "POST" 和 "PATCH" 这几个请求方法
  // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  transformRequest: [function (data) {
    // 对 data 进行任意转换处理

    return data;
  }],

  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理

    return data;
  }],

  // `headers` 是即将被发送的自定义请求头
  headers: {"X-Requested-With": "XMLHttpRequest"},

  // `params` 是即将与请求一起发送的 URL 参数
  // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
  params: {
    ID: 12345
  },

  // `paramsSerializer` 是一个负责 `params` 序列化的函数
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  paramsSerializer: function(params) {
    return Qs.stringify(params, {arrayFormat: "brackets"})
  },

  // `data` 是作为请求主体被发送的数据
  // 只适用于这些请求方法 "PUT", "POST", 和 "PATCH"
  // 在没有设置 `transformRequest` 时，必须是以下类型之一：
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - 浏览器专属：FormData, File, Blob
  // - Node 专属： Stream
  data: {
    firstName: "Fred"
  },

  // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
  // 如果请求花费了超过 `timeout` 的时间，请求将被中断
  timeout: 1000,

  // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: false, // 默认的

  // `adapter` 允许自定义处理请求，以使测试更轻松
  // 返回一个 promise 并应用一个有效的响应 (查阅 [response docs](#response-api)).
  adapter: function (config) {
    /* ... */
  },

  // `auth` 表示应该使用 HTTP 基础验证，并提供凭据
  // 这将设置一个 `Authorization` 头，覆写掉现有的任意使用 `headers` 设置的自定义 `Authorization`头
  auth: {
    username: "janedoe",
    password: "s00pers3cret"
  },

  // `responseType` 表示服务器响应的数据类型，可以是 "arraybuffer", "blob", "document", "json", "text", "stream"
  responseType: "json", // 默认的

  // `xsrfCookieName` 是用作 xsrf token 的值的cookie的名称
  xsrfCookieName: "XSRF-TOKEN", // default

  // `xsrfHeaderName` 是承载 xsrf token 的值的 HTTP 头的名称
  xsrfHeaderName: "X-XSRF-TOKEN", // 默认的

  // `onUploadProgress` 允许为上传处理进度事件
  onUploadProgress: function (progressEvent) {
    // 对原生进度事件的处理
  },

  // `onDownloadProgress` 允许为下载处理进度事件
  onDownloadProgress: function (progressEvent) {
    // 对原生进度事件的处理
  },

  // `maxContentLength` 定义允许的响应内容的最大尺寸
  maxContentLength: 2000,

  // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
  validateStatus: function (status) {
    return status &gt;= 200 &amp;&amp; status &lt; 300; // 默认的
  },

  // `maxRedirects` 定义在 node.js 中 follow 的最大重定向数目
  // 如果设置为0，将不会 follow 任何重定向
  maxRedirects: 5, // 默认的

  // `httpAgent` 和 `httpsAgent` 分别在 node.js 中用于定义在执行 http 和 https 时使用的自定义代理。允许像这样配置选项：
  // `keepAlive` 默认没有启用
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),

  // "proxy" 定义代理服务器的主机名称和端口
  // `auth` 表示 HTTP 基础验证应当用于连接代理，并提供凭据
  // 这将会设置一个 `Proxy-Authorization` 头，覆写掉已有的通过使用 `header` 设置的自定义 `Proxy-Authorization` 头。
  proxy: {
    host: "127.0.0.1",
    port: 9000,
    auth: : {
      username: "mikeymike",
      password: "rapunz3l"
    }
  },

  // `cancelToken` 指定用于取消请求的 cancel token
  // （查看后面的 Cancellation 这节了解更多）
  cancelToken: new CancelToken(function (cancel) {
  })
}
```

## 拦截器

可以使用拦截器让请求或响应被 then 或 catch 处理前拦截它们。

- axios.interceptors.request 请求拦截器
- axios.interceptors.reponse 响应拦截器

```cpp
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
```

<b>移除拦截器：</b>通过使用一个变量来接收设置拦截器时返回的实例，使用eject来取消它。

```cpp
var myInterceptor = axios.interceptors.request.use(function () {/*...*/});
axios.interceptors.request.eject(myInterceptor);
```

为自定义 axios 实例添加拦截器：

```cpp
var instance = axios.create();
instance.interceptors.request.use(function () {/*...*/});
```

## 错误处理

```cpp
axios.get('/user/12345')
  .catch(function (error) {
    if (error.response) {
      // 请求已发出，但服务器响应的状态码不在 2xx 范围内
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  });
```

可以使用 validateStatus 配置选项定义一个自定义 HTTP 状态码的错误范围。

```cpp
axios.get('/user/12345', {
  validateStatus: function (status) {
    return status < 500; // 状态码在大于或等于500时才会 reject
  }
})
```

使用 `toJSON` 可以获取更多关于 HTTP 错误的信息。

```cpp
axios.get('/user/12345')
  .catch(function (error) {
    console.log(error.toJSON());
  });
```

## 取消

### AbortController

从 `v0.22.0` 开始，Axios 支持以 fetch API 方式 —— AbortController 取消请求。

```cpp
const controller = new AbortController();

axios.get('/foo/bar', {
   signal: controller.signal
}).then(function(response) {
   //...
});
// 取消请求
controller.abort()
```

## 请求体编码

默认情况下，axios 将 JS 对象序列化为  JSON， 要以 `application/x-www-form-urlencoded` 格式发送数据，您可以使用以下选项之一。

### 浏览器

在浏览器中，使用 `URLSearchParams` API：

```cpp
const params = new URLSearchParams();
params.append('param1', 'value1');
params.append('param2', 'value2');
axios.post('/foo', params);
```

或者可以使用 qs 库编码数据：

```cpp
const qs = require('qs');
axios.post('/foo', qs.stringify({ 'bar': 123 }));
```

ES6：

```cpp
import qs from 'qs';
const data = { 'bar': 123 };
const options = {
  method: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  data: qs.stringify(data),
  url,
};
axios(options);
```

### Node.js

#### Query String

- 在 node.js 中，使用 `querystring`模块：

```cpp
const querystring = require('querystring');
axios.post('http://something.com/', querystring.stringify({ foo: 'bar' }));
```

- 从 url module 中使用 URLSearchParams：

```cpp
const url = require('url');
const params = new url.URLSearchParams({ foo: 'bar' });
axios.post('http://something.com/', params.toString());
```

- 使用 qs 库

NOTE：如果需要对嵌套对象进行字符串化处理，最好使用 qs 库。

#### Form data

```cpp
const FormData = require('form-data');
 
const form = new FormData();
form.append('my_field', 'my value');
form.append('my_buffer', new Buffer(10));
form.append('my_file', fs.createReadStream('/foo/bar.jpg'));

axios.post('https://example.com', form, { headers: form.getHeaders() })

// 拦截器
axios.interceptors.request.use(config => {
  if (config.data instanceof FormData) {
    Object.assign(config.headers, config.data.getHeaders());
  }
  return config;
});
```

# Vue.js 中使用

```cpp
Vue.axios.get(api).then((response) => {
        console.log(response.data)
})

this.axios.get(api).then((response) => {
        console.log(response.data)
})
this.$http.get(api).then((response) => {
        console.log(response.data)
})
```

## GET

```cpp
const app = {
        data() {
                return {
                        data : null
                }
        },
        mounted() {
                axios.get('url').then(res=>{
                        this.data = res.data; // 读取res.data数据
                }).catch(function (error) { // 发送请求失败处理方法
                        console.log(error);
                });
        }
}
Vue.createApp(app).mount('#app');
```

<b>传递参数的方法：</b>

1. 直接在 URL 上添加

```cpp
const ID = '233';
axios.get('url?id='+ID).then(res=>(console.log(res)));
```

1. 通过 params 设置

```cpp
axios.get('url',{
        params: {
                id : 233
}).then(res=>(console.log(res)));
```

## POST

```cpp
mounted () {
        axios.post('url').then(res => {
                this.data = res.data;
        }).catch(function (error) {
                console.log(error);
        });
}
```

<b>传递参数的方法：</b>

```cpp
axios.post('url',{
        para1: 'xxx',
        para2: 'yyy'
}).then(res=>(console.log(res));
```

