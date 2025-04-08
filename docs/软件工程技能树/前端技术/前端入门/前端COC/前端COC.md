---
title: 前端COC
slug: 前端COC
sidebar_position: 1
---


# 前端COC

<<<<<<< HEAD
Author:NA/张书怀

## 什么是COC？——开发者社区的"宪法"

代码准则（Code of Conduct，简称COC）是技术社区明确规定的<b>行为准则与价值观宣言</b>，相当于开发者社区的"社会契约"。它如同开源世界的"宪法"，确立了社区成员互动的基本规则，回答了关键问题："我们期待社区成员如何彼此对待？"

## 为什么需要COC？

2014年，某知名开源项目因核心成员对贡献者发表性别歧视言论引发大规模抗议，导致多家科技公司撤回赞助。事件后该项目紧急制定COC，但社区声誉已受损。COC做的就是：<b>事后补救不如事前预防 </b>的工作

<b>McKinsey研究证明</b>：多元化团队技术决策质量评分高出35%。COC是实现这一目标的关键工具：

- Rust在COC中特别禁止"知识炫耀"（如"You should know this"类言论），使非CS背景贡献者增加217%
- Git的COC包含"时区包容条款"，要求欧美成员在亚洲时段至少保留1名核心reviewer
- React社区COC附录包含"异步沟通指南"，帮助自闭症谱系开发者更好参与

---

COC在前端领域的体现如下：

=======
>>>>>>> 0ad3f6286ec5beaab9cca8122ad2d90d7cafec29
## 异常处理

每逢`obj.xyz`都要注意是否有空指针

每逢I/O操作都要注意是否有异常抛出

<<<<<<< HEAD
空指针example：

```
// 危险操作
const userName = user.profile.name; // 可能抛出Cannot read property 'name' of undefined

// 安全写法
const userName = user?.profile?.name || '匿名用户';

// 更完整的保护
function getUserName(user) {
  try {
    return user.profile.name;
  } catch (error) {
    console.error('获取用户名失败:', error);
    return '匿名用户';
  }
}
```

异步操作异常处理：

```
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    if (!response.ok) throw new Error(`HTTP错误! 状态码: ${response.status}`);
    return await response.json();
  } catch (error) {
    // 区分网络错误与业务错误
    if (error.name === 'TypeError') {
      showToast('网络连接异常');
    } else {
      reportError(error);
      throw error; // 重新抛出给上层处理
    }
  }
}
```

=======
>>>>>>> 0ad3f6286ec5beaab9cca8122ad2d90d7cafec29
## 善用 const

一个好习惯：在所有不需要修改的变量处设定const

- 一方面：避免误改导致错误（特别是map等引用类型）
- 一方面：明确只读变量的语义

<<<<<<< HEAD
example：

```
// 基础类型
const MAX_RETRY_COUNT = 3; // 明确不会改变的值
const API_ENDPOINT = 'https://api.example.com';

// 引用类型
const config = Object.freeze({ // 深度冻结防止修改
  baseUrl: 'https://api.example.com',
  timeout: 5000
});

// 函数表达式
const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleString();
};
```

## 模块划分

- 横向：按照不同对象和功能划分

```
/src
  /components   # 通用UI组件
  /features     # 功能模块
    /user
      UserProfile.js
      UserAPI.js
      userSlice.js
    /product
  /services     # 公共服务
    apiClient.js
    auth.js
  /utils        # 工具函数
    date.js
    string.js
```

- 纵向：按照运行的流程划分

```html
/order-flow
  /order-creation
    ProductSelector.js
    ShippingForm.js
    PaymentMethod.js
  /order-processing
    OrderTracker.js
    PaymentStatus.js
  /order-history
    OrderList.js
    OrderDetail.js
```

=======
## 模块划分

- 横向：按照不同对象和功能划分
- 纵向：按照运行的流程划分

>>>>>>> 0ad3f6286ec5beaab9cca8122ad2d90d7cafec29
## 命名规范

- 禁止在函数或变量中使用`ALL_UPPER_CASE`（枚举量姑且还可以接受）
- public函数使用`BigCamel()`命名法
- public变量<b>统一</b>使用`smallCamel`
- private和local的函数/变量自己风格一致即可，不做严格要求
- 一切token命名以表意为第一要义，不要为了简略而简略
- 函数使用动词词组
    - `RefreshUI` not `UIs()`

- 变量尽量使用名词词组（`bool isXYZ;`）

## 单元测试

- 每个较为复杂的函数，都要编写一些样例数据进行测试
- 每个特性开发后进行单独的调试
- 善用log进行bug定位

<<<<<<< HEAD
测试金字塔模式：

```
// 工具函数测试（单元层）
describe('formatDate', () => {
  it('应正确格式化时间戳', () => {
    expect(formatDate(1625097600000)).toBe('2021-06-30');
  });
});

// 组件测试（集成层）
describe('UserProfile', () => {
  it('加载时应显示骨架屏', async () => {
    render(<UserProfile userId="123" />);
    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.queryByTestId('skeleton'));
  });
});

// E2E测试（UI层）
describe('结账流程', () => {
  it('应完成从商品选择到支付的完整流程', () => {
    cy.visit('/products');
    cy.get('[data-testid="product-1"]').click();
    cy.contains('结算').click();
    // ...完整流程断言
  });
});
```

测试数据工厂模式：

```
// tests/factories/user.js
export const createUser = (overrides = {}) => ({
  id: faker.datatype.uuid(),
  name: faker.name.fullName(),
  email: faker.internet.email(),
  ...overrides
});

// 在测试中使用
const adminUser = createUser({ role: 'admin' });
```

=======
>>>>>>> 0ad3f6286ec5beaab9cca8122ad2d90d7cafec29
# 注释和文档

## 注释

### 函数头部注释

如果函数的名称和形参表达语义清晰的，可以略写或不写注释；

如下情况<b>必须</b>仔细写注释<b>：</b>

- 在参数为null或默认值时函数有特殊行为的
- 有运行时机限制的（例如规定初始化顺序）
- 返回值存在特殊情况的（例如：-1 or null表示错误）
- 主动抛出异常或明显可能异常的（例如：socket超时）
- 特殊使用方法的（例如：装饰器）

NOTE：根据语言不同，参照标准注释格式约定来撰写（可以看看doxygen）

```c
// 一种常见的注释标准（可以在vscode等编辑器中格式化显示）

/**
 * @brief add two numbers
 * @param x addor 1
 * @param y addor 2
 * @return x+y
 */
 int add(int x, int y);
```

### 变量声明注释

以下情况必须使用注释说明变量是使用方式

- 变量有名称简写的
- 变量有未初始化值的
- 变量有特殊含义和使用方式的（例如，DEBUG模式下行为不同）

### 代码逻辑注释

- 代码逻辑较为复杂时，对实现某一部分的代码前加入说明性注释
- 发现存在BUG、解决现有BUG时，对当前行进行注释，方便后人审阅

```csharp
if(user!=null) uid = user.id; // user找不到时为null
```

## 文档

一个项目的文档记录大致包含如下内容：

- 项目概要、目标、排期、分工
- 重要会议的记录
- 接口文档（暴露的API）
- 架构文档（项目结构设计）
- 部署文档（如何在生产环境下运行）
- 重要bug和关键技术文档
- ......

## 前后端协作方式和规范

### 身份校验方式

- Cookie
    - 浏览器负责维护，简单
    - 典型实例：SESSION_KEY；前端存储会话id，后端通过id索引会话的身份信息等

- Header
    - 调用方负责维护，可控
    - 典型实例：jwt的BearerToken鉴权

### 接口文档

<<<<<<< HEAD
=======
本部分内容可与[原生 JavaScript](wikcn3LB0VHRe2WBEnj1TENeqlg) 中HTTP章节、前后端通信结合。

>>>>>>> 0ad3f6286ec5beaab9cca8122ad2d90d7cafec29
接口文档存在的目的是使前后端有一个规范化的交流途径，优秀的接口文档能极大提高前后端的协作效率。前端需要会读接口文档，并且能根据文档完成对应的请求操作。

- 在讲文档内容前，实际上已经有一些手写文档的替代方案，例如 Swagger 等。

接口文档以接口为单位，即理论上我们希望每一个接口都有一个完善的说明。

对于一个接口，文档中需要有这些内容：

- API 的 path，如`/api/ping` 
- API 的 HTTP 方法，如`GET` `POST` 等
- 请求参数说明，包括 query 部分与 body 部分
- 可能的响应内容，如期望的正常响应、出现错误时的错误代码以及对其说明等

在这里推荐一个模板：

```md
{API名称/概述}
- Method: `GET` / `POST` 
- PATH:
- Params:
    - query:
        - ...
    - body:
        - ...
- Response:
    - Normal:
        - `status code` `int` : `200`
        - `error code` `string` : ""
        - `data` `obj` : ...
    - {Description of the error}:
        - `status code` `int` : `400`
        - `error code` `string` : "xxxxxx..."
        - `data` `obj` : ""
```

