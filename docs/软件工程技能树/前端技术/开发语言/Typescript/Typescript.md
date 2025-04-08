---
title: Typescript
slug: Typescript
sidebar_position: 1
---


# Typescript

Author: 陈岩/潘瑞哲

# Why we need Typescript

在TypeScript诞生之前，大型JavaScript项目常常陷入这样的困境：

```
// 一个典型的JS函数调用
function calculateTotal(products) {
  return products.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);
}

// 调用时可能传入错误参数
calculateTotal(undefined); // 运行时崩溃
calculateTotal([{ price: '99', quantity: 2 }]); // 静默计算出错结果
```

2012年，微软的<b>Anders Hejlsberg</b>（C#之父）推出了TypeScript，为JavaScript加上了<b>可选的静态类型系统,</b>既保留了灵活性，又提供了必要的保护。

从最初被质疑"过度工程化"，到现在成为大型前端项目的实际标准，TypeScript完成了JavaScript生态中最成功的"渐进式革命"。它既不是全新的语言，也不是简单的语法扩展，而是为JavaScript这个"灵活的脚本语言"装上了精密的工程仪表盘，让开发者能够以更自信的姿态构建复杂、可维护的现代Web应用。正如TypeScript的标语所说："JavaScript that scales"——这正是当代Web开发最迫切需要的解决方案。

TS 本身的文档和参考资料十分优秀，本文只是作为大纲，具体可以参考

- https://learnxinyminutes.com/docs/typescript/
- https://wangdoc.com/typescript/
- https://www.typescriptlang.org/docs/handbook/intro.html

依赖：nodejs，tsc（请自行搜索安装），ts-node（可选）

# 基础语法

TypeScript，顾名思义，带有类型系统的脚本语言；其最大的特点便是具有完备的类型描述语言

且ts经过编译会变成js，依然具有js的浏览器兼容性。

在函数、分支循环等方面的语法通js，不再赘述。

## 基本类型

和各类静态语言一样，Ts具有如下基本类型

## 类型定义

和Python类似的，使用在变量名后“冒号+类型”表达类型定义

```ts
interface IPoint {
  x: number;
  y: number;
}

var x: number = 1;
var y: IPoint = {x: 1.0, y: 2.0};

function isXXX(): boolean {
  return false;
}
```

【联合类型】具有多种可能取值的类型

```ts
number | boolean | string
```

【强制转换】ts 对于强制转换不会做任何检查，主要用于从any转换为确定类型

```ts
let x: number = 1
x as string // 无效，不会进行实际变量操作
let y: string = x as string;  // x 实际上仍然为 number 1，但 typescript 现在认为它是 string

// 合理用法
// request返回any类型
let resp = request("xxx.com") as ResponseType
resp.ErrCode
```

## 类和接口

为了规范前后端交互中的数据类型，在前端也最好使用强类型系统对json与字段进行绑定；

实现这一目的可以使用interface or class，具体对比如下：（所以建议使用interface）

# 在前端的实践

以未竟的Notify中API请求为例

原先：

```ts
/**
   * notify/get/set-top
   * 获取个人置顶的通知
   * @param {number} page_size 返回数据库中page_number页前 page_size条记录
   * @param {number} page_number 数据库中返回记录的页数
   * @param {number} choice 筛选类型（0:全部，1:已读，2:有附件，3:收藏）
   */
  static async getTopNotice(page_size = 5, page_number = 2, choice = 0) {
    return await request({
      url: `notice/get/entry?page_size=${page_size}&page_number=${page_number}&choice=${choice}`,
      method: "GET",
      data: {}
    });
  }
```

加入模型：

```ts
interface Notice{
    id: string
    content: string
    ...
}
```

修改函数为Ts强类型：

```ts
/**
   * notify/get/set-top
   * 获取个人置顶的通知
   * @param page_size 返回数据库中page_number页前 page_size条记录
   * @param page_number 数据库中返回记录的页数
   * @param choice 筛选类型（0:全部，1:已读，2:有附件，3:收藏）
   * @return null if fail, $Notice if success
   */
 static async getTopNotice(page_size:number = 5, page_number:number = 2, 
     choice:number = 0): Notice|null {
    try{
        // Promise内部出问题会抛异常
        let resp = await request({
          url: `notice/get/entry?page_size=${page_size}&page_number=${page_number}&choice=${choice}`,
          method: "GET",
          data: {}
        });
    }catch(e){
        return null;
    }
    return resp as Notice;
  }
```

# ts的优势

- 丰富的代码补全（前端终于可以"data." &lt;ctrl space&gt; &lt;tab&gt; 了呢）
- 便携的引用查找和重构（比如API文档改个字段名，这就可以直接f2大法）
- 完备的类型报错（例如少嵌套了一层，或者string没有转int这种，一目了然）

