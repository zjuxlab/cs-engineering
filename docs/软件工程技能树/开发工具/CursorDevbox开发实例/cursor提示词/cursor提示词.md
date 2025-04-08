---
title: cursor提示词
slug: cursor提示词
sidebar_position: 0
---


# cursor提示词

Author: 金大可

## 后端提示词

请为我开发一个基于 Node.js 和Express 框架的 Todo List 后端项目。项目需要实现以下四个 RESTful API 接口：

1. 查询所有待办事项 
    - 接口名: GET /api/get-todo
    - 功能: 从数据库的'list'集合中查询并返回所有待办事项
    - 参数: 无
    - 返回: 包含所有待办事项的数组

2. 添加新的待办事项 
    - 接口名: POST /api/add-todo
    - 功能: 向'list'集合中添加新的待办事项
    - 参数: { "value": string, // 待办事项的具体内容 "isCompleted": boolean // 是否完成，默认为 false }
    - 返回: 新添加的待办事项对象，包含自动生成的唯一 id

3. 更新待办事项状态 
    - 接口名: POST /api/update-todo/
    - 功能: 根据 id 更新指定待办事项的完成状态（将 isCompleted 值取反）
    - 参数: id
    - 返回: 更新后的待办事项对象

4. 删除待办事项 
    - 接口名: POST /api/del-todo/
    - 功能: 根据 id 删除指定的待办事项
    - 参数: id
    - 返回: 删除操作的结果状态

技术要求：

1. 使用 Express 框架构建 API
2. 使用 MongoDB 作为数据库，通过 Mongoose 进行数据操作
3. 实现适当的错误处理和输入验证
4. 使用异步/等待（async/await）语法处理异步操作
5. 遵循 RESTful API 设计原则
6. 添加基本的日志记录功能

<b>这里数据库连接方式要填写！！！</b>

以下是数据库连接方式：

打开sealos的数据库-详情-概览，复制下图Connection框内内容

<del>信息最不安全的一集</del>

![](/assets/Zl2kbuPQCoHm21x0O4kcYMqSn7d.png)

我的是mongodb://root:dcpgx6fk@test-db-mongodb.ns-e9fv5tse.svc:27017

（这里填你的数据库连接方式）

1. 直接以当前目录作为项目根目。注意 此目录已经初始化完了nodejs项目 直接修改即可
2. 如果需要执行命令，请暂停创建文件，让我先执行命令

为这个项目中的所有代码写上详细注释

## 后端调试提示词

这是我们的根地址（），请帮我生成这四个接口的测试用例，以及接口成功与不成功的返回值

接口：

我来帮您编写这四个接口的测试用例。我会使用 curl 命令来测试，并展示每个接口的成功和失败情况。

### 1. 获取所有待办事项 (GET /api/get-todo)

```bash
# 测试命令
curl -X GET "https://qoozsebfhluj.sealoshzh.site/api/get-todo"
```

成功响应 (200 OK):

```json
[
    {
        "_id": "65f9e8c7a12345678901234",
        "value": "完成项目文档",
        "isCompleted": false,
        "createdAt": "2024-03-22T08:30:00.000Z",
        "updatedAt": "2024-03-22T08:30:00.000Z"
    },
    {
        "_id": "65f9e8c7a12345678901235",
        "value": "开发新功能",
        "isCompleted": true,
        "createdAt": "2024-03-22T08:25:00.000Z",
        "updatedAt": "2024-03-22T08:25:00.000Z"
    }
]
```

失败响应 (500 Internal Server Error):

```json
{
    "message": "数据库查询错误"
}
```

### 2. 添加新的待办事项 (POST /api/add-todo)

```bash
# 测试命令
curl -X POST "https://qoozsebfhluj.sealoshzh.site/api/add-todo" \
     -H "Content-Type: application/json" \
     -d '{"value": "新的待办事项", "isCompleted": false}'
```

成功响应 (201 Created):

```json
{
    "_id": "65f9e8c7a12345678901236",
    "value": "新的待办事项",
    "isCompleted": false,
    "createdAt": "2024-03-22T08:35:00.000Z",
    "updatedAt": "2024-03-22T08:35:00.000Z"
}
```

失败响应 (400 Bad Request):

```json
{
    "message": "待办事项内容不能为空"
}
```

### 3. 更新待办事项状态 (POST /api/update-todo/:id)

```bash
# 测试命令
curl -X POST "https://qoozsebfhluj.sealoshzh.site/api/update-todo/65f9e8c7a12345678901234"
```

成功响应 (200 OK):

```json
{
    "_id": "65f9e8c7a12345678901234",
    "value": "完成项目文档",
    "isCompleted": true,
    "createdAt": "2024-03-22T08:30:00.000Z",
    "updatedAt": "2024-03-22T08:40:00.000Z"
}
```

失败响应 (404 Not Found):

```json
{
    "message": "待办事项不存在"
}
```

### 4. 删除待办事项 (POST /api/del-todo/:id)

```bash
# 测试命令
curl -X POST "https://qoozsebfhluj.sealoshzh.site/api/del-todo/65f9e8c7a12345678901234"
```

成功响应 (200 OK):

```json
{
    "message": "删除成功"
}
```

失败响应 (404 Not Found):

```json
{
    "message": "待办事项不存在"
}
```

### 注意事项

1. 所有接口都需要设置 `Content-Type: application/json` 请求头
2. ID 参数需要使用实际存在的 MongoDB ObjectId
3. 在测试删除和更新接口时，请确保使用正确的 ID
4. 所有接口都支持 CORS，可以从任何域名访问

您可以使用这些测试用例来验证接口的功能是否正常工作。如果您需要更详细的测试场景或其他格式的测试用例，请告诉我。

### npm 安装依赖很慢请执行这行命令！！！

```js
npm config set registry <https://registry.npmmirror.com>
```

## 前端提示词

请为我开发一个基于 react 的Todo List 应用。要求如下：

1. 功能需求： 
    - 添加新的待办事项
    - 标记待办事项为完成/未完成
    - 删除待办事项
    - 统计待办事项完成度
    - 过滤显示（全部/已完成/未完成）

2. UI/UX 设计要求： 
    - 全屏响应式设计，适配不同设备
    - 拥有亮色模式和夜间模式
    - 现代化、简洁的界面风格
    - 丰富的色彩运用，但保持整体和谐
    - 流畅的交互动画，提升用户体验
    - 在按钮和需要的地方添加上图标
    - 参考灵感：结合苹果官网的设计美学

要求：

1. 直接以当前目录作为项目根目。注意 此目录已经初始化完了react项目结构 直接修改即可
2. 如果需要执行命令，请暂停创建文件，让我先执行命令
3. 请你根据我的需要，一步一步思考，给我开发这个项目。特别是UI部分 一定要足够美观和现代化

那这里总结一下 我们用cursor完成了前端代码的开发 我们就是发送提示词写清楚我们的需求 以及出现问题  或者想调整功能和UI 继续 用文字和他持续沟通即可。

## 前后端对接提示词

下面是关于这个todolist的四个接口，我已经写清楚接口对接信息，请你完成接口对接工作：

下面输入后端调试时生成的接口文档

