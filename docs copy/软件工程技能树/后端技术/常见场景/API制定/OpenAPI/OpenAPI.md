---
title: OpenAPI
slug: >-
  ynzowezexiygx0kbdlyco9pgnxe-dfifwii6ri7cnjkbttrcqd8xnch-li4ww3scfiwstrkg1ggcm8qhnlh-tuyzwz4qwigeynkhz21cjrzvnhe-b3bbwdcegiic78kjaiscl4wonde-b3bbwd
sidebar_position: 2
---


# OpenAPI

Author：蒋旻昊


OpenAPI 是一种 machine-readable 的接口规范.

OpenAPI 社区有很多基于该规范的 [tools](https://tools.openapis.org/), 功能包括校验 API 的安全性, 优化 API 设计, 从代码注解生成 OpenAPI 文档, 从 OpenAPI 文档生成模板代码, 通过 OpenAPI 文档生成人类可读的文档, 对 API 进行测试等等等等.

OpenAPI 提倡 Design-First 的工作流程, 即先设计出明确的文档, 依照文档编写代码, 这样能够减少前后端协作成本. 不过无论是 Code-First 还是 Design-First, 维护一个 OpenAPI 文档对前后端分离的项目, 或者公开服务的外部项目来说都是非常有用的.

<div class="callout callout-bg-3 callout-border-3">
<div class='callout-emoji'>🤔</div>
<p>Swagger 和 OpenAPI 有什么区别?</p>
<p>swagger 是一系列 OpenAPI 的工具,由 smartbear 开发, 最早 OpenAPI 标准也由其维护. 但是目前, 为了 OpenAPI 规范的中立性, smartbear 将其捐献给了组织 OpenAPI Initiative 维护. OpenAPI 从 3.0 版本才正式更名, 之前都是 SwaggerX.X</p>
</div>

# 基本结构

OpenAPI 的文档是一个 json object, 因此能用 json 或者 yaml 编写.其最顶层被称为 OpenAPI Object, 其下的各个 fields 分别描述了这个 API 文档的各类信息.

一个最简单的 OpenAPI 文档如下:

```yaml
openapi: 3.0.0

info:
  title: Sample
  description: |
    This is a sample api doc
  version: 1.0.0

paths:
  ...
```

其中, `openapi`字段注明文档规范的版本, 以便对文档进行规范检查. `info`字段的值被称为 Info Object, 是一个包含了文档基本信息的 json 对象. 同样, `paths`字段的值被称为 Paths Object, 每个 api 的具体信息由这个对象给出.

因为这种一层层展开结构, 你可以用[OpenAPI Map](https://openapi-map.apihandyman.io/)的树状图很方便地查看各个字段的文档.

# 文档信息 | Info Object

根节点下的`info`字段的值是一个 Info Object, 描述了 API 的一些 meta data. 内容比较简单, 包括:

- <b>title</b>
- API 文档的标题.
- <b>termsOfService</b>
- 服务条款, 必须以 url 形式给出
- <b>version</b>
- API 版本 (请和 openapi 版本相区分)
- <b>description</b>
- 对文档的描述. 如果使用 yaml 编写文档, 则可以使用 yaml 的原生多行文本支持. 你可以将描述这样分行, yaml 会自动将多行拼在一起.

```yaml
description:           # -> This is a multi-line description.
  This is a multi-line 
  description.
```

- 同时, OpenAPI 规范支持[GitHub Flavored Markdown](https://guides.github.com/features/mastering-markdown/), 你可以使用富文本展示描述. 不过请注意, yaml 的多行文本规则当然在 OpenAPI 解析之前执行, 而默认的多行文本规则将删除中间的所有 line break 和多余的 space, 仅在文本末尾保留一个换行符. 因此需要加一个管道符`|`让 yaml 保留这些字符, 这样 OpenAPI 才能正确解析 markdown 风格的换行.

```yaml
description: | # ↓ there are two spaces at the end of this line
  This is a **rich-text**  
  description.
```

- 其他部分的`description`字段都支持此规则.

Info Object 还可以描述`license`, `contact` 等等信息, 具体内容可以查看[文档](https://spec.openapis.org/oas/v3.1.0#info-object).

# API Endpoint | Paths Object

Paths Object 在根节点的`paths`字段下, 描述了每个 api 接口的具体信息.

```yaml
paths:
  /ping:
    ...
  /users:
    ...
  /users/{id}:
    ...
```

每个路径对应的值被称作 Path Item Object, 具体描述了接口的输入输出等等.

路径中可以有路径变量, 不过必须在之后的描述中定义这个变量, 否则 OpenAPI 会直接将`{var}`作为路径. OpenAPI 并不会对路径匹配做任何检查, 诸如`/qwq/{name}`和`/qwq/{name}`, 或者`/qwq`和`/qwq/{id}`这样的声明是可以同时存在的, 请具体考虑实际使用的路由匹配组件规则. 并且, <b>如果要使用 API 文档生成代码, 请不要使用此类可能造成歧义的路由</b>.

在 Path Item Object 中定义了该路径能够接受的所有 method:

```yaml
paths:
  /user:
    get:
      ...
    post:
      ...
    patch:
      ...
```

每个方法都定义了一个对该路径的访问途径, OpenAPI 称之为 Operation, 因此每个 method 对应的值被称作 Operation Object.

在一个文档中, 每个 Operation 应是唯一的, 并唯一对应一个最细粒度的 api 接口. 在 Operation Object 中有相应的`operationId`来识别, 很多代码生成工具也会以此作为生成的接口函数的名称, 请注意, <b>OpenAPI 规范本身不会检查是否有重复的 ID</b>, 但重复 ID 会使大多数工具产生不可预见的后果.

```yaml
paths:
  /user:
    get:
      operationId: getUser
      deprecated: false        # <- You can mark an operation deprecated
      summary: Get user info
      description: |
        Returns the user info. You should be authenticated first.
      parameters:
        ...
      requestBody:
        ...
      responses:
        ...
    post:
      ...
```

如果一个路径支持多种 method 访问, 可以直接定义多个 operation. OpenAPI 不支持使用通配符`*`或者以`post|get`等形式一次同时定义多个 operation, 必须对每个 method 单独定义 (毕竟需要单独定义ID).

在一个 operation 中, 通过`parameters`和`requestBody`定义输入, 通过`responses`定义输出.

## 描述参数 | Parameter Object

OpenAPI 的参数由 Parameter Object 定义, 而`parameters`字段的值是一个 Parameter Object 的 list, 定义了一系列参数.

Parameter Object 包含的基本字段如下:

```yaml
- in: path
  name: userId
  required: true
  deprecated: false
  schema:
    ...
```

- `in`字段描述了该变量的位置, 可以是`query|path|cookie|header`
- `name`字段就是变量名, 对于`query`和`cookie`就是 form 形式的 key 值, 对于`header`是在 header 中的字段名, 对于`path`则是对应提前在 path 中声明的变量名.
- `required`和`deprecated`分别标明了该字段是必须的或已经弃用. 如果是`path`中的变量, 则必须设置为 required.

<div class="callout callout-bg-8 callout-border-1">
<div class='callout-emoji'>❗</div>
<p>变量在 header 中时, <code>Accept</code>, <code>Content-Type</code>和<code>Authorization</code>是禁止使用的.</p>
<p>这些属性分别由 OpenAPI 的 Operation, Media Type, Security 功能指定.</p>
</div>

Parameter Object 必须至少包含`name`和`in`属性, 并有且只有`schema`和`content`中的一个属性, 用以限定参数类型.

### Data Type | Schema Object

OpenAPI 使用 Schema Object 定义变量类型.

#### 基本类型

`schema`的类型定义完全遵照 [JSON 标准](https://spec.openapis.org/oas/v3.1.0#dataTypeFormat), 包括一系列 primitive type 以及`array`和`object`.

一般来说, schema 定义是这样的:

```yaml
schema:
  type: integer
```

如果类型是`array`, 则需要一个`items`字段, 其值也是一个 schema object:

```yaml
schema:
  type: array
  items:
    type: number
```

`object`类型则需要`properties`来声明成员, 成员名对应的值也是 schema object:

```yaml
schema:
  type: object
  properties:
    name:
      type: string
    id:
      type: integer
```

#### format & validation

OpenAPI 完全遵从[JSON 标准](https://datatracker.ietf.org/doc/html/draft-bhutton-json-schema-validation-00#section-6)中的所有 format & validation, 仅添加了[几个 format 扩展](https://spec.openapis.org/oas/v3.1.0#dataTypeFormat).

例举几个常用的:

```yaml
parameters:
  - name: a            # 限定为 json 定义的 full-date
    in: query
    schema:
      type: string
      format: date
  - name: b            # 最长 12 字符
    in: query
    schema:
      type: string
      maxLength: 12
  - name: c            # enums: 1,2,3
    in: query
    schema:
      type: integer
      enum: [1,2,3]
  - name: d            # 限定 array 元素个数
    in: query
    schema:
      type: array
      minItems: 1
      items:
        ...
  - name: e            # object 内成员的 required 熟悉
    in: query          # 请和 parameter 的 required 区分
    schema:
      type: object
      required: 
        - fieldName1
      properties:
        ...
```

需要注意的是, OpenAPI 本身不会进行任何校验, 使用`example`功能提供示例值时需要手动保证满足约束. 部分工具提供了校验功能, 不过大多数仅提供了 validation 的检查, format 是不会检查的. 最好还是在 description 或者 example 里说明具体约束和示例.

#### style

OpenAPI 支持对变量编码形式进行设置, 但是默认值都是符合使用习惯的值, 故不做介绍, [文档见此](https://swagger.io/docs/specification/serialization/).

#### Polymorphism

> 虽然我不觉得这算多态, 不过既然原文档这么叫就这么写了

OpenAPI 的 data type 定义的其实不是类型, 本质上只是定义了一个校验 (毕竟这只是个规范而不是语言), 而其提供了四种校验组合规则:

- `allOf`: 满足所有校验条件
- `oneOf`: 满足且仅满足一个校验条件
- `anyOf`: 至少满足一个校验条件
- `not`: 不满足校验条件

使用示例:

```yaml
schema:                # 等价于
  allOf:               # schema:
    - type: integer    #   type: integer
    - format: int64    #   format: int64

schema:
  type: string
  oneOf:
    - format: date
    - format: date-time
```

如上文所说, 类型定义其实只是一种校验, 所以我们可以用这几种组合对定义的 model 进行操作.

<div class="callout callout-bg-4 callout-border-4">
<div class='callout-emoji'>👆</div>
<p>这里用到了之后在<code>components</code>部分的规则, 可以先理解为, 原来的 schema 都是匿名的, 这里给 schema 定义了一个名字.</p>
</div>

##### 继承

```yaml
schemas:
  Base:
    type: object
    properties:
      id:
        type: string
  
  Derived:
    allOf:
      - $ref: '#/components/schemas/Base'
      - type: object
        properties:
          name:
            type: string
```

如此一来, `Derived`类型定义就需要同时满足`Base`定义的校验和新增加的`name`校验.

##### 多态

多态使用`anyOf`而不是`oneOf`, 因为如果没有`required`校验, 很多时候可以满足多个 model, 如果用`oneOf`校验会不通过.

##### discriminator

OpenAPI 提供了一种通过某个字段名来区分多态的不同 model 的方式.

比如:

```yaml
schemas:
  Pet:
    type: object
    required: ['T']
    properties:
      T:
        type: string
        description: field to judge pet type
  Dog:
    allOf:
      - $ref: '#/components/schemas/Pet'
      - type: object
        properties:
          bark:
            type: string
  Cat:
    allOf:
      - $ref: '#/components/schemas/Pet'
      - type: object
        properties:
          nya:
            type: string
```

在使用时, 我们可以这样定义 discriminator:

```yaml
schema:
  anyOf:
    - '#/components/schemas/Dog'
    - '#/components/schemas/Cat'
  discriminator:
    propertyName: T
```

`discriminator`相当于定义了一个字段到指定校验(Model)的映射, 使用`propertyName`指定字段. 默认情况下, 直接使用定义的 schema 名作为指定的值, 但也可以通过`mapping`字段手动指定, 这个特性限制了带有 discriminator 时, 不能在`oneOf|anyOf`中使用匿名的 inline schema.

上述定义结果如下:

```json
// OK
{
    "T": "Dog",
    "bark": "qwq"
}

// ERROR
{
    "T": "Cat",
    "bark": "qwq"
}

// ERROR
{
    "T": "Alien",
    "nya": "qwq"
}
```

<b>use with inheritance</b>

每次使用多态都单独定义`discriminator`其实很麻烦, 上述例子只是为了更好理解其做了什么. `discriminator`其实也只是一种校验规则, 我们可以将其放在基类中, 由子类继承使用, 就不用每次多态时都定义了:

```yaml
schemas:
  # 修改基类如下
  Pet:
    type: object
    required: ['T']
    properties:
      T:
        type: string
        description: field to judge pet type
    # 在这里使用 discriminator
    # 就不用在之后的 anyOf|oneOf 中加了
    discriminator:
      propertyName: T
      mapping:
        - dog: '#/components/schemas/Dog'
        - cat: '#/components/schemas/Cat'
      
  Dog:
    allOf:
      - $ref: '#/components/schemas/Pet'
      - type: object
        properties:
          bark:
            type: string
  Cat:
    allOf:
      - $ref: '#/components/schemas/Pet'
      - type: object
        properties:
          nya:
            type: string
```

---

parameter 一般不会过于复杂, 大多数情况仅使用`schema`即可, 甚至只需要使用 primitive type:

```yaml
parameters:
  - name: id
    in: query
    required: true
    schema:
      type: integer
  - name: X-CSFR-TOKEN
    in: header
    required: true
    schema:
      type: string
```

但仍有部分场景, 参数是有特定编码的信息, 比如参数本身是一个 json. 此时需要使用更复杂的`content`进行描述. 不过这种情况很少用, `content`一般用于描述请求体或者响应体, 因此在这两部分再作介绍.

## 描述 Response | Response Object

`responses`的值是一个 status code 和具体响应信息的 map.

```yaml
responses:
  '200':
    description: OK
    headers:
      ...
    content:
      application/json:
        ...
  '4XX':
    ...
  default:
    ...
```

status code 可以是任意 http code, 还支持使用`1XX`到`5XX`五种通配符. 除此之外, 还可以使用`default`匹配所有未指定的情况.

而每个 code 的值是一个 Response Object, 其有三个属性:`content`, `headers`和`description`.

`description`不做赘述, `headers`是一个 map, 由变量 name 映射到 Header Object. Header Object 和 Parameter Object 几乎完全一样, 区别在于 name 已经指定, 以及所有和变量位置有关的属性都被禁用.

```yaml
'200':
  description: OK
  headers:
    X-COUNT:
      description: record count
      schema:
        type: integer
    Set-Cookie:
      style: form
      schema:
        type: object
        properties:
          ...
```

请求 Body 中的信息需要指定 MIME 类型后再解析, `content`用以描述这种复杂信息. `content`属性是一个由 Content-Type 映射到 Media Type Object 的 map. 所有合法的 Content-Type 由 [RFC6838](https://spec.openapis.org/oas/v3.1.0#media-types) 定义.

Media Type Object 描述了某个 Content-Type 对应的数据模型, 主要部分就是一个 schema:

```yaml
responses:
  '201':
    description: Created
    content:
      application/json:
        schema:
          type: object
          properties:
            id:
              type: integer
              format: int64
              description: ID of the created user.
```

## 描述 RequestBody | Request Body Object

请求体的描述和响应体几乎一样, 其省略了指定响应 code 的环节:

```yaml
requestBody:
  required: true
  description: This is a request body.
  content:
    ...
```

可以使用`requird`指定是否必须包含请求体, 这和在`content`中声明的类型中指定的 required 属性是不一样的.

## Examples & Description

OpenAPI 支持给文档添加样例数据. 样例可以添加在 Parameter Object, Media Type Object 和 Schema Object 中.

一个例子:

```yaml
paths:
  /user:
    get:
      operationId: getUser
      parameters:
        - name: id
          example: 1
          schema:
            type: int
      requestBody:
        description: user token
        content:
          application/json:
            example: '{"token":"yyy.yyy.yyy"}'
            schema:
              type: object
              properties:
                token:
                  type: string
                  example: xxx.xxx.xxx
      responses:
       ...
```

必须注意的是, <b>OpenAPI 不会校验 example 是否符合约束</b>, 必须手动保证这一点.

一般来说, 我们不会给一个匿名的 inline schema 加 example, 比如上例 parameter 中的 schema. 一般来说, 只有我们将一个 schema 作为可复用的数据模型时, 才会为其提供样例. 上例中 requestBody 在 inline schema 中加了样例, 只是为了演示, 当有重复的 example 时, OpenAPI 总是默认使用最外层的 example.

另外, 对于 array 或 object 类型的复杂 schema, 是没有办法直接添加样例的, 只能在最底层的 primitive type 上加样例.

### 多样例 | Example Object

在 Parameter Object 和 Media Type Object 中支持添加多个样例.

多样例添加需要使用`examples`属性, 此属性是一个由样例名到 Example Object 的 map.

```yaml
responses:
  "400":
    description: The provided parameters are incorrect
    content:
      text/html:
        schema:
          type: string
        examples:
          illegalCoordinates:
            description: This is an invalid coordinate.
            value: "Illegal coordinate."
          notEmpty:
            description: Square must not be empty
            value: "Square is not empty."
```

### Document

很多时候, 仅提供样例并不能清晰表述接口用法, 必须提供详细的文档描述具体机制.

OpenAPI 中几乎所有 object 都有 description 字段以添加详细注释, 其语法已经在上文 Info Object 部分有过介绍.

在部分 Object 中 ([Path Item](https://spec.openapis.org/oas/v3.1.0#path-item-object), [Operation](https://spec.openapis.org/oas/v3.1.0#operation-object)和[Example](https://spec.openapis.org/oas/v3.1.0#example-object)), 还额外提供了`summary`属性来提供一个简略的介绍.

```yaml
/user:
  get:
    operationId: getUser
    summary: get a user's info
    description: |
      Get a user's info by his userId.  
      if user doesn't exist, will automaticly create a user.
```

## Group Operations | Tags

你可以使用`tags`属性分类接口, 并且可以在根节点处预定义`tags`并提供注释:

```yaml
tags:
  - name: user
    description: apis about user.
  - name: new
    description: apis added in this version.
paths:
  /user:
    post:
      tags: ['user','new']
      ...
  /create:
    post:
      tags: ['user']
      ...
```

OpenAPI 是默认使用 tags 功能的, 如果没有使用`tags`属性, 将会被归类到`default` tag.

# Model & Template | Components

在实际使用 API 时, 尤其像使用 MVC 模式的情况, 我们经常会有可以复用的数据模型, 每次都重新定义一遍是丑陋而且难以维护的.

OpenAPI 提供了复用 schema 的方法, 你可以将 schema 命名并定义在根节点下的`components`属性中:

```yaml
components:
  schemas:
    User:
      type: object
      properties:
        id:
          type: integer
          description: userId
          example: 1
          required: true
        name:
          type: string
          description: user name
          example: nobody
```

而在需要使用它时, 可以使用 reference object 来引用:

```yaml
schema:
  $ref: '#/components/schemas/User'
```

`$ref`可以引用其他文件的信息:

```yaml
$ref: './user.yaml#/components/schemas/User'                  # 本地资源       
$ref: 'http://api.com/openapi.yaml#/components/schemas/User'  # 远程资源
```

本质上, `$ref`只是将引用目标位置的 json object, 然后原样填充进当前字段, 所以当目标文件仅定义了所需要的 json object 时, 也可以直接引用文件:

```yaml
$ref: './user.yaml'
```

<div class="callout callout-bg-4 callout-border-4">
<div class='callout-emoji'>👆</div>
<p>除了可以复用 schema, components 中还可以定义<code>parameter</code>, <code>response</code>等等其他很多定义, 具体列表<a href="https://spec.openapis.org/oas/v3.1.0#components-object">见此</a>.</p>
</div>

# 鉴权 | Security Scheme Object

OpenAPI 提供了比较丰富的鉴权说明.

声明鉴权需要两个部分, 首先需要在`components`中定义 Security Schema:

```yaml
components:
  securitySchemes:
    BasicAuth:
      type: http
      scheme: basic
    
    BearerAuth:
      type: http
      scheme: bearer
    
    ApiKeyAuth:
      type: apiKey
      in: header
      name: X-API-Key
    
    CookieAuth:
      type: apiKey
      in: cookie
      name: TOKEN
```

Security Schema Object 的必须属性是`type`, OpenAPI 提供了如下几种鉴权类型:

- `http`: 通过 http 请求头中的`Authorization`鉴权, 其形式是由标准定义的 ([Hypertext Transfer Protocol (HTTP) Authentication Scheme](https://www.iana.org/assignments/http-authschemes/http-authschemes.xhtml))
- 需要用`schema`属性指定形式, 如`basic`和`bearer`
- `apiKey`: 通过单独定义的 api key 字段鉴权
- 需要用`name`属性指定变量名
- 需要用`in`属性指定位置, 可以是`query|header|cookie`
- `oauth2`: [OAuth 2.0 (swagger.io)](https://swagger.io/docs/specification/authentication/oauth2/)
- `openIdConnect`: [OpenID Connect Discovery (swagger.io)](https://swagger.io/docs/specification/authentication/openid-connect-discovery/)

声明完毕后, 可以使用`security`属性指定使用的鉴权方法:

```yaml
security:    # BasicAuth OR CookieAuth OR ( ApiKeyAuth AND BearerAuth )
  - BasicAuth: []
  - CookieAuth: []
  - ApiKeyAuth: []
    BearerAuth: []
```

每个 security schema 字段的值是一个 scope list, 仅有 oauth2 和 openID connect 鉴权需要使用, 其他类型可以直接用空列表.

注意, security 下每个并列的鉴权方式是 OR 的关系, 如果需要同时满足多个鉴权, 请在一个 item 中同时使用多个 security schema.

security 属性可以在根节点和 Operation Object 中使用, 其规则是内层覆盖外层:

```yaml
components:
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
    CookieAuth:
      type: apiKey
      in: cookie
      name: TOKEN
security:
  - BearerAuth: [ ]
paths:
  /user:
    post:
      security: []    # no authentication
      ...
  /things:
    get:
      security:
        - CookieAuth: []
      ... 
    post:
      ...
```

如果没有特别声明, Operation 遵从顶层的鉴权设置, 否则会覆盖顶层的鉴权设置. 可以使用空列表来取消顶层的鉴权.

# Server & BasePath | Server Object

`servers`字段的值是一个 Server Object 的 array. 每个 Server Object 都描述了 API 服务的根路径:

```yaml
servers:
  - url: http://example.qwq
    description: |
      a test server.
  - url: ws://example.qwq
    description: |
      a test websocket server.
  - url: /api
    description: | 
      a local server
```

`url` 是支持相对路径的, 并将从 api 文档 host 的目录开始解析, 之后出现的 url 字段也都支持此规则.

<div class="callout callout-bg-4 callout-border-4">
<div class='callout-emoji'>🔦</div>
<p>比如: </p>
<p>  api 文档在<code>https://localhost:8080/doc.yaml</code></p>
<p>  <code>/api</code>就会解析到<code>https://localhost:8080/api</code>.</p>
<p>如果使用 swagger-ui, 相对路径将会从 ui 所在 server 的 base path 展开, 比如:</p>
<p>  服务地址为<code>https://example.com/app</code> </p>
<p>  ui 在<code>https://example.com/app/docs/*</code></p>
<p>  相对路径将以<code>https://example.com/app</code>为基础展开.</p>
<p>参考链接:</p>
<p><a href="https://github.com/swagger-api/swagger-js/pull/1883">feat: Support relative server url for OAS3 · swagger-api/swagger-js (github.com)</a></p>
</div>

在 `OpenAPI2.X` 中, 这部分由`schema`, `host`, `basePath`三个字段描述, 并且仅支持设置一个 server. 而在 3.0 版本, 不仅支持选择 server, 还支持在`url`中添加变量:

```yaml
servers:
- url: https://{username}.example.{area}/api
  variables:
    # if no enum, this will be an open var
    username:
      default: demo
    area:
      description: server area
      enum:
        - cn
        - eu
      default: cn
```

在`url`中以`{}`的形式声明变量, 并在`variables`中进行定义. 变量只能是`string`类型, 支持设置枚举, 并且必须设置`default`值. 变量功能对于一些场景很有用, 比如 api 有不同地区的服务器的场景, 或者每个用户都有一个子域的场景, 再或者同时提供多个版本 api 的场景.

`servers`字段可以在根节点, Path Item Object 和 Operation Object 使用, 类似于`security`, 由内层规则覆盖外层规则, 所以你可以为单独的一个接口设置单独的 server.

# Reference

- OpenAPI 标准 (这玩意适合查表, 不适合用来学) : 

- Swagger OpenAPI Guide: 

