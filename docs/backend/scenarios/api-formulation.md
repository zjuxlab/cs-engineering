# API的制定

@cy

针对前后端交互使用的HTTP上API进行介绍

## 设计和命名

Eg  `https://api.abc.com/PROG/user/get`  【GET】

### 概述

- 大前缀`https://api.abc.com/PROG/`
  - "/api" or "/static"
  - Schema：`https://`为了保证安全，通常为https
  - Host：`api.abc.com`微信小程序需要域名，其余场合ip:port也可以
  - Category：`PROG`项目名称做第一层划分
  - 这一部分前端应当写为**常量**而非每次拼接字符串；后端应当在nginx等代理处配置，路由中只体现往后的url路径
- app路由`/user/get`
  - 一般按照模块及功能进行路径划分

### 调用约定

#### 特殊数据类型

- time：转成某种通用格式（对于golang默认是RFC3339，或者是Unix TimeStamp）
- binary：二进制通常进行base64编码后作为字符串使用（注：BASE64有的字符集有不同的实现方式）
- 图片等大容量资源：通常通过单独接口上传；请求数据时提供key或url，前端需要使用时下载
  - Base64 Str：2种Encoding 
    - Normal '+='
    - URL-Encoded
  - www-Form-Encoded

#### 返回格式

通常为JSON格式

既然返回格式是确定的，

后端返回，前端解析时都应当封装一个专门的模块处理错误（ errcode !=0 ）情况

- 后端：resp.Ok(data) => {0, "", data}; resp.Err(code, reason) => {code, reason, null}
- 前端：after_call => if(errcode!=0) alert_and_abort(); else return data;

为了直观，直接上示例：When login

```JSON
// if fail
{
    "errcode": 10001,
    "errmsg": "password incorrect",
    "data": null,
}
// if ok
{
    "errcode": 0,
    "errmsg": "",
    "data": {
        //API文档提到的返回数据其实是这一层
        // data: type $User
        "id": "",
        "name": "",
        "phone": "",
    }
}
```

#### 状态码

- Http Code  一般来说，除非服务器真的挂了，都是返回200，表示服务器收到了请求
- Json ErrCode  通过返回的Body进行业务逻辑层面的报错，一般0为成功，非0则失败
  - 绝大多数错误只会在调试期或者服务器挂了时发生，只需要告诉用户“内部错误”即可
  - 但“密码错误”、“权限不足”等错误则需要单独处理，给出友好的提示

## 几种典型的设计方式

### GET+POST

简单参数的请求（通常是getById一类）使用GET，其他复杂请求体的请求使用POST

- GET 自带获取语义，应当多次调用结果一致
- POST 自带修改语义

#### GET路径设计

- `/user/get?id=abc123` 通过Query传参
- `/user/getById/abc123` 后面追加参数作为末级路径
  - 后端Tips：绝大多数框架的路由支持子路径统配，例如此处路径写为`/user/getById/{:id}`

#### POST路径设计

一般来说，为了统一，POST的参数全部作为JSON放进HTTP Body

### Pure POST

为了统一调用方式，也可以全部使用POST进行交互

### RESTful

后两种不常用，大家可以自行了解

https://restfulapi.cn/page/restful-api-request

一个潜在的问题：部分防火墙和用户端有可能拦截PATCH，DELETE这些奇形怪状的请求

### GraphQL

https://spec.graphql.org/October2021/#sec-Overview

## 登录鉴权

### 原理

在前端用户登录成功后，后端生成一个不包含私密信息的Token作为识别

前端每次发请求携带Token，后端检验Token的合法和过期

### 主流鉴权方式

- Bearer Token in Header
  - Or Token in Query
  - 登录时给出，前端存储，每次返回
  - [什么是 JWT  -- JSON WEB TOKEN](https://www.jianshu.com/p/576dbf44b2ae)
- Session Key in Cookie
  - 数据全部储存在服务器端，通过key索引
  - [Session原理_广小白的博客-CSDN博客_session](https://blog.csdn.net/weixin_42217767/article/details/92760353)
  - [OAuth2.0 详解](https://zhuanlan.zhihu.com/p/89020647)

## 方法论

**（以问卷系统为例）**

- 设计对象数据
  - 答题用户  Type user: {id, name, phone, ...}
  - 问卷详情  Type form: {id, userid, detail[], ...}
- 按照对象划分模块
  - /user  用户
  - /form  问卷
  - /manage  管理后台
- 对不同对象设计简明的API列表
  - 通过id获取用户对象：/get(by id)
    - 传入：id
    - 返回：user
    - 绝大多数情况下，复杂参数引用提前确定的对象类型（Type user），不要频繁出现类似内容
  - 登录：/login
    - 传入：账号密码
    - 返回：user
    - 返回值：
      - 114514 - 密码错误
      - 233333 - 用户不存在
      - 绝大多数错误（如参数类型错误，服务器异常）在**发行版**事实上不需要特殊处理；

      - 不过前端调试日志还是要清晰记录报错的，便于版本迭代

      - 而**密码错误**一类的用户操作导致的问题需要特殊说明并特殊处理
  - 修改个人信息：/update
    - 传入：带id的用户对象
    - 返回：无
  - 查询用户：/list
    - 传入：
      - 某些过滤器字段（约定：不传某一项表示忽略某一项）
      - ```JSON
        {
            "name": Optional[string],     // 模糊搜索
            "phone":Optional[string]，    // 精确匹配 
        }
        ```

      - Page & Offset
      - 注意返回列表时，如果数据有过长的可能，则应当提前设计分页返回
    - 返回：user[]
    - 这个地方，把条件查询和全局搜索通过统一的方式表达了出来

## 作业

### 任务

请挑选飞书中一个模块，对其API进行设计，并撰写API文档（文档参考OpenAPI的要素）

- 人事和通讯录
- 聊天窗口
- 云文档
-  ......

COMBO：简述OOP中的类-方法与HTTP API的关联

### 要求

- 至少包含两个对象模型
- 对于对象的操作至少包含增删查改的API各一个
- 简化模型和逻辑的具体细节，只体现能说明问题的对象和操作即可
- DDL：最晚8.10提交给@陈岩 | 咕咕晓 

## 实战讲解

[「一节课搞定API接口制定（图文详解，实例剖析，超详细，一学就会）」CSDN风格标题](https://xn4zlkzg4p.feishu.cn/minutes/obcnd3tc86859u8yqwvfa8zg)

（草 我差点当真了 这标题）

## 思考题

- 体验在APIFox工具中进行API制定和调试
- 对比通过HTTP Code返回错误状态和Json封装异常errCode的区别