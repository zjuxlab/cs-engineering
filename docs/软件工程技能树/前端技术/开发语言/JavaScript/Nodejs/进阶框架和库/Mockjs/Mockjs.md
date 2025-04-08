---
title: Mock.js
slug: Mock.js
sidebar_position: 2
---


# Mock.js

Mock.js是一个功能强大的JavaScript库，用于模拟接口请求和生成随机数据。在前端开发中，它扮演着重要的角色，帮助开发者独立开发、快速原型验证以及测试异常情况。

Mock.js官网：http://mockjs.com/

# 简介

在前端开发中，与后端接口的数据交互是一个常见的任务。然而，在接口尚未实现或无法访问的情况下，如何进行前端开发和调试呢？这就是Mock.js出现的背景。Mock.js是一个开源的JavaScript库，它提供了模拟接口请求和生成随机数据的能力，为前端开发者提供了便利。

在Mock.js出现之前，前端开发者常陷入这样的尴尬处境：

```
// 硬编码的测试数据
const mockUsers = [
  { id: 1, name: 'User1' },
  { id: 2, name: 'User2' } // ...
];

// 或者更糟——请求不存在的API
fetch('/api/users') // 后端接口尚未完成
  .then(res => res.json())
  .catch(() => {
    // 无奈降级处理
    displayFallbackData();
  });
```

这种开发方式存在明显痛点：

- <b>前后端进度阻塞</b>：前端必须等待后端API完成
- <b>测试数据单一</b>：难以覆盖各种边界情况
- <b>联调成本高</b>：接口变更导致大量测试代码重写

2013年，<b>墨智（nuysoft）</b> 团队发布了Mock.js，它如同在前端开发流程中安放了一台"数据魔术机"，让开发者能够：

- <b>独立于后端进行开发</b>
- <b>生成丰富多样的模拟数据</b>
- <b>动态响应各种请求场景</b>

虽然Mock.js依然强大，但现代生态也出现了其他选择：

## 为什么Mock.js依然有价值？

1. <b>学习成本极低</b>：简单的数据模板语法
2. <b>零依赖</b>：不限定前端框架
3. <b>灵活拦截</b>：支持XHR和Fetch
4. <b>丰富的数据生成能力</b>：内置大量占位符

> 至于具体选择哪个，看自己的需求
> 在2023年的State of JS调查中，仍有65%的前端开发者在使用各种数据mock方案，其中Mock.js因其简单可靠依然占据重要位置。从个人项目到企业级应用，Mock.js持续扮演着"前端开发加速器"的角色，让开发者能够专注于界面和交互逻辑，而不被后端进度所阻塞。正如其设计理念所言："让前端开发独立于后端，让数据生成简单而强大"——这正是现代Web开发流程中不可或缺的关键能力。

# 原理

Mock.js的原理很简单，它通过拦截XMLHttpRequest或fetch等网络请求，根据定义的规则返回模拟的数据。当开发者发起一个请求时，Mock.js会检查匹配的规则，并返回相应的模拟数据。这使得前端开发者可以在没有真实接口的情况下进行开发和调试。

# 安装

使用Mock.js非常简单，只需要在项目中安装Mock.js，并在需要的地方定义接口的模拟数据。

首先，通过npm安装Mock.js：

```js
npm install mockjs --save-dev
```

然后，在需要使用Mock.js的地方引入它：

```js
import Mock from 'mockjs';
```

接下来，可以使用Mock.mock()方法定义接口的模拟数据。例如，模拟一个GET请求的用户接口：

```js
Mock.mock('/api/user', 'get', {
  code: 200,
  data: {
    id: '@id',
    name: '@name',
    age: '@integer(20, 50)',
  },
});
```

这段代码表示当发起一个GET请求到/api/user时，Mock.js会返回一个带有模拟数据的响应。

# 与Vue集成

Mock.js与Vue.js的集成非常简单。在Vue项目中，可以在入口文件（通常是main.js）中引入Mock.js，并定义接口的模拟数据。

```js
import Mock from 'mockjs';
import './mock'; // 引入Mock.js配置文件

if (process.env.NODE_ENV === 'development') {
  Mock.start(); // 在开发环境中启用Mock.js
}
```

然后，在mock文件夹下创建一个配置文件，例如index.js，在该文件中定义接口的模拟数据。

通过这种方式，Mock.js会在开发环境中启用，并拦截接口请求，返回模拟数据，从而实现前后端解耦、独立开发的目标。

# 语法规范

`Mock.js` 的语法规范包括两部分：

1. 数据模板定义规范`（Data Template Definition，DTD）`
2. 数据占位符定义规范`（Data Placeholder Definition，DPD）`

### 1.数据模板定义规范DTD

数据模板中的每个属性由 3 部分构成：属性名、生成规则、属性值：

```text
// 属性名   name
// 生成规则 rule
// 属性值   value
'name|rule': value
```

- 属性名和生成规则之间用竖线 `|` 分隔。
- 生成规则是可选的。
- 生成规则有 7 种格式： 
    1. `'name|min-max': value`
    2. `'name|count': value`
    3. `'name|min-max.dmin-dmax': value`
    4. `'name|min-max.dcount': value`
    5. `'name|count.dmin-dmax': value`
    6. `'name|count.dcount': value`
    7. `'name|+step': value`

- 生成规则的含义需要依赖属性值的类型才能确定。
- 属性值中可以含有 `@占位符`。
- 属性值还指定了最终值的初始值和类型。

示例：

（1）属性值是字符串 <b>String</b>

1. `'name|min-max': string`
2. 通过重复 `string` 生成一个字符串，重复次数大于等于 `min`，小于等于 `max`。
3. `'name|count': string`
4. 通过重复 `string` 生成一个字符串，重复次数等于 `count`。

（2） 属性值是数字 <b>Number</b>

1. `'name|+1': number`
2. 属性值自动加 1，初始值为 `number`。
3. `'name|min-max': number`
4. 生成一个大于等于 `min`、小于等于 `max` 的整数，属性值 `number` 只是用来确定类型。
5. `'name|min-max.dmin-dmax': number`
6. 生成一个浮点数，整数部分大于等于 `min`、小于等于 `max`，小数部分保留 `dmin` 到 `dmax` 位。

```text
Mock.mock({
    'number1|1-100.1-10': 1,
    'number2|123.1-10': 1,
    'number3|123.3': 1,
    'number4|123.10': 1.123
})
// =>
{
    "number1": 12.92,
    "number2": 123.51,
    "number3": 123.777,
    "number4": 123.1231091814
}
```

（3）属性值是布尔型 <b>Boolean</b>

1. `'name|1': boolean`
2. 随机生成一个布尔值，值为 true 的概率是 1/2，值为 false 的概率同样是 1/2。
3. `'name|min-max': value`
4. 随机生成一个布尔值，值为 `value` 的概率是 `min / (min + max)`，值为 `!value` 的概率是 `max / (min + max)`。

（4）属性值是对象 <b>Object</b>

1. `'name|count': object`
2. 从属性值 `object` 中随机选取 `count` 个属性。
3. `'name|min-max': object`
4. 从属性值 `object` 中随机选取 `min` 到 `max` 个属性。

（5）属性值是数组 <b>Array</b>

1. `'name|1': array`
2. 从属性值 `array` 中随机选取 1 个元素，作为最终值。
3. `'name|+1': array`
4. 从属性值 `array` 中顺序选取 1 个元素，作为最终值。
5. `'name|min-max': array`
6. 通过重复属性值 `array` 生成一个新数组，重复次数大于等于 `min`，小于等于 `max`。
7. `'name|count': array`
8. 通过重复属性值 `array` 生成一个新数组，重复次数为 `count`。

（6）属性值是函数 <b>Function</b>

1. `'name': function`
2. 执行函数 `function`，取其返回值作为最终的属性值，函数的上下文为属性 `'name'` 所在的对象。

（7）属性值是正则表达式 <b>RegExp</b>

1. `'name': regexp`
2. 根据正则表达式 `regexp` 反向生成可以匹配它的字符串。用于生成自定义格式的字符串。

```js
Mock.mock({
    'regexp1': /[a-z][A-Z][0-9]/,
    'regexp2': /\w\W\s\S\d\D/,
    'regexp3': /\d{5,10}/
})
// =>
{
    "regexp1": "pJ7",
    "regexp2": "F)\fp1G",
    "regexp3": "561659409"
}
```

### 2.数据占位符定义规范DPD

占位符只是在属性值字符串中占个位置，并不出现在最终的属性值中。

占位符的格式为：

```py
@占位符
@占位符(参数 [, 参数])
```

<b>注意：</b>

1. 用 `@` 来标识其后的字符串是占位符。
2. 占位符引用的是 `Mock.Random` 中的方法。
3. 通过 `Mock.Random.extend()` 来扩展自定义占位符。
4. 占位符也可以引用数据模板中的属性。
5. 占位符会优先引用数据模板中的属性。
6. 占位符支持相对路径和绝对路径。

```php
Mock.mock({
    name: {
        first: '@FIRST',
        middle: '@FIRST',
        last: '@LAST',
        full: '@first @middle @last'
    }
})
// =>
{
    "name": {
        "first": "Charles",
        "middle": "Brenda",
        "last": "Lopez",
        "full": "Charles Brenda Lopez"
    }
}
```

Mock.Random 中的方法与数据模板的 `@占位符` 一 一对应，在需要时还可以为 Mock.Random 扩展方法，然后在数据模板中通过 `@扩展方法` 引用。例如：

```css
Random.extend({
    constellation: function(date) {
        var constellations = ['白羊座', '双子座', '巨蟹座', '狮子座', '天秤座', '天蝎座', '射手座', '水瓶座']
        return this.pick(constellations)
    }
})
Random.constellation()
// => "水瓶座"
Mock.mock('@CONSTELLATION')
// => "天蝎座"
Mock.mock({
    constellation: '@CONSTELLATION'
})
// => { constellation: "射手座" }
```

### 3.Mock.mock

调用`Mock.mock( rurl?, rtype?, template|function( options ) )`生成模拟数据

(1) <b>Mock.mock( template )</b>

根据数据模板生成模拟数据。

(2) <b>Mock.mock( rurl, template )</b>

记录数据模板。当拦截到匹配 `rurl` 的 Ajax 请求时，将根据数据模板 `template` 生成模拟数据，并作为响应数据返回。

(3) <b>Mock.mock( rurl, function( options ) )</b>

记录用于生成响应数据的函数。当拦截到匹配 `rurl` 的 Ajax 请求时，函数 `function(options)` 将被执行，并把执行结果作为响应数据返回。

(4) <b>Mock.mock( rurl, rtype, template )</b>

记录数据模板。当拦截到匹配 `rurl` 和 `rtype` 的 Ajax 请求时，将根据数据模板 `template` 生成模拟数据，并作为响应数据返回。

(5) <b>Mock.mock( rurl, rtype, function( options ) )</b>

记录用于生成响应数据的函数。当拦截到匹配 `rurl` 和 `rtype` 的 Ajax 请求时，函数 `function(options)` 将被执行，并把执行结果作为响应数据返回。

- rurl

可选。表示需要拦截的 URL，可以是 URL 字符串或 URL 正则。例如 `/\/domain\/list.json/`、`'/domian/list.json'`。

- rtype

可选。表示需要拦截的 Ajax 请求类型。例如 `GET`、`POST`、`PUT`、`DELETE` 等。

- template

可选。表示数据模板，可以是对象或字符串。例如 `{ 'data|1-10':[{}] }`、`'@EMAIL'`。

- function(options)

可选。表示用于生成响应数据的函数。

- options

指向本次请求的 Ajax 选项集，含有 `url`、`type` 和 `body` 三个属性

# 使用方式

### 生成指定次数字符串

```js
import Mock from 'mockjs'
const data = Mock.mock({
"string|4":"哈哈"
})
```

### 生成指定范围长度字符串

```js
const data = Mock.mock({
"string|1-8":"哈哈"
})
```

### 生成文本

#### 生成一个随机字符串

```js
const data = Mock.mock({
        "string":"@cword"
})
```

#### 生成指定长度和范围

```js
const data = Mock.mock({
    string:"@cword(1)"
    str :"@cword(10,15)"
})
```

### 生成标题和句子

```js
const data = Mock.mock({
    title:"@ctitle(8)"
    sentence:"@csentence"
})
```

#### 生成指定长度的标题和句子

```js
const data = Mock.mock({
    title:"@ctitle(8)"
    sentence:"@csentence(50)"
})
```

#### 生成指定范围的标题和句子

```js
const data = Mock.mock({
    title:"@ctitle(5,8)"
    sentence:"@csentence(50,100)"
})
```

### 生成段落,随机生成段落

```js
const data = Mock.mock({
  content:"@cparagraph()"
})
```

### 生成数字

#### 生成指定数字

```js
const data = Mock.mock({
        "number|80":1
})
```

#### 生成范围数字

```js
const data = Mock.mock({
        "number|1-99":1
})
```

##### 生成自增id

### 随机生成标识

```js
const data = Mock.mock({
        id:"@increment"
})
```

#### 生成姓名-地址-身份证

```js
const data = Mock.mock({
        name:"@cname()"
        idCard:"@id()"
        address:"@city(true)"
})
```

### 随机生成图片

- 生成图片：@image（“300*200”，‘#ff0000','#fff','gif','坤坤'）
- 参数1：图片大小

```css
[        '300*250','250*250','240*400','336*280'        '180*150','720*300','468*60','234*60'        '388*31','250*250','240*400','120*40'        '125*125','250*250','240*400','336*280']
```

- 参数2：图片背景色
- 参数3：图片前景色
- 参数4：图片格式
- 参数5：图片文字

### 生成时间

- @Date
- 生成指定格式时间：@date(yyyy-MM-dd hh:mm:ss)

指定数组返回的参数

- 指定长度：‘date|5’
- 指定范围:'data|5-10'

```js
const data = Mock.mock({
'list|50-99':[
        {
            name:'@cname'
            address:'@city(true)'
            id:'@increment()'
        }        
    ]
})
```

### mock拦截请求

#### 定义get请求

```js
Mock.mock('/api/goodslist', 'get', {
  status: 200,
  message: '获取商品列表成功！',
  'data|5-10': [
    {
      id: '@increment(1)',      // 自增的Id值
      // 'id|+1': 0,            // 这也是在模拟一个自增长的 Id 值
      name: '@cword(2, 8)',     // 随机生成中文字符串
      price: '@natural(2, 10)', // 自然数
      count: '@natural(100, 999)',
      img: '@dataImage(78x78)'  // 指定宽高图片
    }
  ]
})
```

#### 定义post请求

```js
Mock.mock('/api/addgoods', 'post', function(option) {
  // 这里的 option 是请求相关的参数
  console.log(option)
  // 如果需要在返回的对象中再使用mock的语法，则需要再使用Mock.mock
  return Mock.mock({
    status: 200,
    message: '@cword(2,5)'
  })
})
```

# 注意事项

在使用Mock.js时，需要注意以下几点：

- Mock.js主要用于开发和调试阶段，不应在生产环境中使用。在打包部署项目之前，应该移除Mock.js的配置和拦截器。
- 当使用真实接口时，确保将真实接口请求的地址与模拟接口的地址区分开，以避免冲突。
- Mock.js提供了丰富的数据生成规则，但在使用时要注意生成的数据是否符合实际业务的要求。
- 在使用Mock.js时，可以根据具体的项目需求，结合其他工具和技术，如axios拦截器、数据持久化等，实现更高级的模拟接口和数据管理。

