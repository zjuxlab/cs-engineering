---
title: Sequelize
slug: Sequelize
sidebar_position: 0
---


# Sequelize

Author:邱至松

> 官方文档：[入门 | Sequelize中文文档 | Sequelize中文网](https://www.sequelize.cn/core-concepts/getting-started)

## Sequelize是什么？

按照官网文档的介绍，即<em>Sequelize 是一个基于 promise 的 Node.js ORM数据库框架</em><em>,  </em>可以帮助我们在node.js中操作数据库。

## 为什么我们需要Sequelize

在Node.js诞生后的头两年，开发者操作数据库的方式堪称"西部荒野"：

```
// 原始SQL查询
connection.query(
  'SELECT * FROM users WHERE email = ?', 
  ['test@example.com'],
  function(error, results) {
    if (error) throw error;
    console.log(results);
  }
);
```

这种模式面临三大难题：

1. <b>SQL注入风险</b>：手工拼接查询字符串
2. <b>模型缺失</b>：业务逻辑与SQL语句混杂
3. <b>数据库耦合</b>：切换数据库需重写所有查询

2011年，Sascha Depold创造了Sequelize，将对象关系映射(ORM)模式引入Node.js世界。就像给混乱的西部带来了法律，Sequelize为JavaScript与数据库的交互建立了秩序。

```js
// 原始方式：需要理解SQL方言
db.query(`
  INSERT INTO products (name, price) 
  VALUES ('Laptop', 999.99)
  RETURNING id
`);

// Sequelize方式：纯JavaScript
const product = await Product.create({
  name: 'Laptop',
  price: 999.99
});
```

## 为什么选择Sequelize

## 安装

请确保电脑已有node.js与npm/yarn

1. sequelize安装
    ```bash
# 使用 npm
npm i sequelize # 这将安装最新版本的 Sequelize
# 使用 yarn
yarn add sequelize
```

2. 对应数据库驱动的安装
    ```bash
# 使用 npm
npm i pg pg-hstore # PostgreSQL
npm i mysql2 # MySQL
npm i mariadb # MariaDB
npm i sqlite3 # SQLite
npm i tedious # Microsoft SQL Server
npm i ibm_db # DB2
# 使用 yarn
yarn add pg pg-hstore # PostgreSQL
yarn add mysql2 # MySQL
yarn add mariadb # MariaDB
yarn add sqlite3 # SQLite
yarn add tedious # Microsoft SQL Server
yarn add ibm_db # DB2
```

## 使用

### 创建Sequelize实例

1. 首先我们需要新建文件`config.js`，在里面配置我们的数据库设置
    ```js
var config = {
    database: 'database_name', // 使用哪个数据库
    username: 'root', // 用户名
    password: 'password', // 密码
    host: 'localhost', // 主机名
    port: 3306 // 端口号，MySQL默认3306
};

module.exports = config;
```

2. 然后我们新建文件`sequelize.js`，在里面创建我们的sequelize对象。
    ```js
const Sequelize = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    //数据库类型
    dialect: 'mysql',
    //连接池配置
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    },
    //日志设置，默认为console.log，显示日志函数调用的第一个参数
    logging: console.log
});

//测试连接是否正常
(async() => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
  
exports.sequelize = sequelize;
```

### 创建模型

#### 什么是模型（model）？

模型可以理解为数据库中表的抽象，表示数据库中一个表的特征。Sequelize中，每一个模型都是Model的一个扩展类。

#### 定义一个模型

我们使用`sequelize.define`来定义一个模型。

```js
const Sequelize = require('sequelize');
const {sequelize} = require('../sequenlize.js')

//这里我们定义了一个User模型，通常而言，sequelize中模型为单数名称
const User = sequelize.define('user', {
    user_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false, //allowNull 默认为true
        autoIncrement: true //自增
    },
    name: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    email: Sequelize.STRING(50),
    id_number: {
        type: Sequelize.CHAR(18),
        allowNull: false,
        unique: true
    },
    phone_number: Sequelize.STRING(20),
    user_type: {
        type: Sequelize.CHAR(1),
        allowNull: false,
        validate:{
            isIn: [['P', 'S']]
        }
    }
}, {
    timestamps: false,
    freezeTableName: true,
    initialAutoIncrement: 100000, //设置自增初始值
});

module.exports = User;
```

可以看到，上述代码中我们设置了

```js
timestamps: false,
    freezeTableName: true,
    initialAutoIncrement: 100000,
```

其中，`timestamps`默认为true，开启时，Sequelize会自动添加timestamp的功能，不需要时我们就设置为false。`freezeTableName`默认为false，在Sequelize中，会自动把模型的复数形式（如person-&gt;people）作为数据库中表的名称，不需要时我们就设定为true，或者直接设定`{tableName: 'table_name'}`。

#### 模型同步

有时候，我们的数据库中已经有一个表，但是这个表与Sequelize中设定的模型存在一定的区别，会产生冲突。为了解决这种冲突，Sequelize为我们提供了<b>模型同步</b>的功能。

```js
User.sync();//如果表不存在,则创建该表，如果已经存在,则不执行任何操作
User.sync({ force: true });//将创建表,如果表已经存在,则将其首先删除
User.sync({ alter: true });//检查数据库中的表，使其与模型中的表匹配

//一次性同步
sequelize.sync({ force: true })
```

模型同步都可能对原有的数据库产生破坏，我们也可以使用Sequelize CLI中的迁移功能来进行同步

#### 数据类型

1， `DataTypes,DATE`，时间戳，开启了`timestamps`后，每一个模型都会增加``createdAt`和`updatedAt`字段，来记录时间戳，有点像乐观锁。

1. 其他类型
    ```js
//字符串
DataTypes.STRING             // VARCHAR(255)
DataTypes.STRING(1234)       // VARCHAR(1234)
DataTypes.STRING.BINARY      // VARCHAR BINARY
DataTypes.TEXT               // TEXT
DataTypes.TEXT('tiny')       // TINYTEXT
DataTypes.CITEXT             // CITEXT          仅 PostgreSQL 和 SQLite.
DataTypes.TSVECTOR           // TSVECTOR        仅 PostgreSQL.

//布尔
DataTypes.BOOLEAN            // TINYINT(1)

//数字
DataTypes.INTEGER            // INTEGER
DataTypes.BIGINT             // BIGINT
DataTypes.BIGINT(11)         // BIGINT(11)

DataTypes.FLOAT              // FLOAT
DataTypes.FLOAT(11)          // FLOAT(11)
DataTypes.FLOAT(11, 10)      // FLOAT(11,10)

DataTypes.REAL               // REAL            仅 PostgreSQL.
DataTypes.REAL(11)           // REAL(11)        仅 PostgreSQL.
DataTypes.REAL(11, 12)       // REAL(11,12)     仅 PostgreSQL.

DataTypes.DOUBLE             // DOUBLE
DataTypes.DOUBLE(11)         // DOUBLE(11)
DataTypes.DOUBLE(11, 10)     // DOUBLE(11,10)

DataTypes.DECIMAL            // DECIMAL
DataTypes.DECIMAL(10, 2)     // DECIMAL(10,2)

//无符号和零填充整数（Mysql和MariaDB）,可指定大小
DataTypes.INTEGER.UNSIGNED
DataTypes.INTEGER.ZEROFILL
DataTypes.INTEGER.UNSIGNED.ZEROFILL

//日期
DataTypes.DATE       // DATETIME 适用于 mysql / sqlite, 带时区的TIMESTAMP 适用于 postgres
DataTypes.DATE(6)    // DATETIME(6) 适用于 mysql 5.6.4+. 支持6位精度的小数秒
DataTypes.DATEONLY   // 不带时间的 DATE
```

#### 约束、验证与关联

1. 单表约束

```js
//约束
username: {
    type: DataTypes.TEXT,
    allowNull: false, // not null
    unique: true, // unique
    autoIncrement: true, //自增
    primaryKey：true //主键
  }
  
//验证 check
bar: {
    type: DataTypes.STRING,
    validate: {
      is: /^[a-z]+$/i,          // 匹配这个 RegExp
      is: ["^[a-z]+$",'i'],     // 与上面相同,但是以字符串构造 RegExp
      not: /^[a-z]+$/i,         // 不匹配 RegExp
      not: ["^[a-z]+$",'i'],    // 与上面相同,但是以字符串构造 RegExp
      isEmail: true,            // 检查 email 格式 (foo@bar.com)
      isUrl: true,              // 检查 url 格式 (http://foo.com)
      isIP: true,               // 检查 IPv4 (129.89.23.1) 或 IPv6 格式
      isIPv4: true,             // 检查 IPv4 格式 (129.89.23.1)
      isIPv6: true,             // 检查 IPv6 格式
      isAlpha: true,            // 只允许字母
      isAlphanumeric: true,     // 将仅允许使用字母数字,因此 '_abc' 将失败
      isNumeric: true,          // 只允许数字
      isInt: true,              // 检查有效的整数
      isFloat: true,            // 检查有效的浮点数
      isDecimal: true,          // 检查任何数字
      isLowercase: true,        // 检查小写
      isUppercase: true,        // 检查大写
      notNull: true,            // 不允许为空
      isNull: true,             // 只允许为空
      notEmpty: true,           // 不允许空字符串
      equals: 'specific value', // 仅允许 'specific value'
      contains: 'foo',          // 强制特定子字符串
      notIn: [['foo', 'bar']],  // 检查值不是这些之一
      isIn: [['foo', 'bar']],   // 检查值是其中之一  
      notContains: 'bar',       // 不允许特定的子字符串
      len: [2,10],              // 仅允许长度在2到10之间的值
      isUUID: 4,                // 只允许 uuid
      isDate: true,             // 只允许日期字符串
      isAfter: "2011-11-05",    // 仅允许特定日期之后的日期字符串
      isBefore: "2011-11-05",   // 仅允许特定日期之前的日期字符串
      max: 23,                  // 仅允许值 <= 23
      min: 23,                  // 仅允许值 >= 23
      isCreditCard: true,       // 检查有效的信用卡号

      // 自定义验证器的示例:
      isEven(value) {
        if (parseInt(value) % 2 !== 0) {
          throw new Error('Only even values are allowed!');
        }
      }
      isGreaterThanOtherField(value) {
        if (parseInt(value) <= parseInt(this.otherField)) {
          throw new Error('Bar must be greater than otherField.');
        }
      }
   }
```

1. 多表约束（<b>关联</b>）

Sequlize中，模型与模型之间存在三种关联关系

- 一对一
- 一对多
- 多对多

由这三种关系出发，Sequelize得到四种关联关系，如下代码所示

```js
const A = sequelize.define('A', /* ... */);
const B = sequelize.define('B', /* ... */);

A.hasOne(B); // A 有一个 B
A.belongsTo(B); // A 属于 B
A.hasMany(B); // A 有多个 B
A.belongsToMany(B, { through: 'C' }); // A 属于多个 B , 通过联结表 C
```

- `A.hasOne(B)`,A有一个B，其中，外键在B中定义
- `belongsTo`,A属于一个B，其中，外键在A中定义
- `hasMany`,A有多个B，外键在B中定义
- `belongsToMany`,A属于多个B，通过联结表C，外键在C中定义

外键会默认自动创建，也可以自己定义。

在使用关联时，我们也可以附带一些参数，这里以一对一关系为例（比较简单）

```js
Foo.hasOne(Bar, {
  onDelete: 'RESTRICT', 
  onUpdate: 'RESTRICT'
});
Bar.belongsTo(Foo, {
  foreignKey: 'myFooId' //自定义外键
});
```

上述中`onDelete`和`onUpdate`设置为`RESTRICT`,与Mysql中相同，检查外键设置，若存在外键则不允许Delete或Update。

可用的参数有`RESTRICT`, `CASCADE`, `NO ACTION`, `SET DEFAULT` 和 `SET NULL`，与Mysql中大致相同。

这里我们给出与User一对一关联的Account模型

```js
const Sequelize = require('sequelize');
const {sequelize} = require('../sequenlize.js');
const User = require('./user.js');

const Account = sequelize.define('account', {
    user_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        foreignKey: true
    },
    account_password:{
        type: Sequelize.STRING(50),
        allowNull: false
    },
    security_question:{
        type: Sequelize.STRING(100),
        allowNull: false
    },
    security_password:{
        type: Sequelize.STRING(100),
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: true
});

User.hasOne(Account, {
    onDelete: 'CASCADE'
})
Account.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = Account;
```

为了方便管理模型，我们将User模型放在`user.js`中，Account模型放在`account.js`中，两者同属于`model`文件夹。

### 操作模型实例

#### 创建

创建模型实例可以理解为向表中插入数据（insert）。

我们使用`create`创建模型实例
```js
const user = await User.create({
            name: params.name,
            email: params.email,
            id_number: params.id_number,
            phone_number: params.phone_number,
            user_type: params.user_type
        });
```

这里就向数据库中插入了一条User的记录。

#### 删除

删除模型实例可以理解为删除表中的一条记录（delete）。

我们使用`destroy`来删除实例

```js
await User.destroy({
                where:{
                    user_id: params.user_id
                }
            });
```

删除所有实例

```js
// 截断表格
await User.destroy({
      truncate: true
});
```

#### 重载

重载模型实例是Sequelize中的功能，就是刷新一下实例

我们使用`reload`来重载实例

```js
const jane = await User.create({ name: "Jane" });
console.log(jane.name); // "Jane"
jane.name = "Ada";
// 数据库中的名称依然是 "Jane"
await jane.reload();
console.log(jane.name); // "Jane"
```

#### 更新

就是数据库中的update

使用`update`

```js
await Account.update({
                account_password: params.account_password,
                security_question: params.security_question,
                security_password: params.security_password
            });
```

### 查询

（数据库怎么能少得了查询（笑））

#### 查找器

Sequelize使用查找器来实现查询功能

1. `findAll`，查询所有条目
2. `findByPk`，根据主键获得一个条目
3. `findOne`，找到第一个条目后返回
4. `findOrCreate`，找到一个条目并返回，否则创建一个条目
5. `findAndCountAll`，找到所有条目并计数

其中，若是返回多条目，会返回一个`rows`数组对象，包含找到的记录，若为单条目，则是一个模型实例

#### where子句

我们可以使用where来对查询进行限制

```js
// SELECT * FROM post WHERE authorId = 2;
Post.findAll({
  where: {
    authorId: 2
  }
});
//或者
const { Op } = require("sequelize");
Post.findAll({
  where: {
    authorId: {
      [Op.eq]: 2 //Op中的等于操作符
    }
  }
});
```

Op中含有非常多的操作符，可以解决很多情况，这里直接贴出官网中的展示

```js
const { Op } = require("sequelize");
Post.findAll({
  where: {
    [Op.and]: [{ a: 5 }, { b: 6 }],            // (a = 5) AND (b = 6)
    [Op.or]: [{ a: 5 }, { b: 6 }],             // (a = 5) OR (b = 6)
    someAttribute: {
      // 基本
      [Op.eq]: 3,                              // = 3
      [Op.ne]: 20,                             // != 20
      [Op.is]: null,                           // IS NULL
      [Op.not]: true,                          // IS NOT TRUE
      [Op.or]: [5, 6],                         // (someAttribute = 5) OR (someAttribute = 6)

      // 使用方言特定的列标识符 (以下示例中使用 PG):
      [Op.col]: 'user.organization_id',        // = "user"."organization_id"

      // 数字比较
      [Op.gt]: 6,                              // > 6
      [Op.gte]: 6,                             // >= 6
      [Op.lt]: 10,                             // < 10
      [Op.lte]: 10,                            // <= 10
      [Op.between]: [6, 10],                   // BETWEEN 6 AND 10
      [Op.notBetween]: [11, 15],               // NOT BETWEEN 11 AND 15

      // 其它操作符

      [Op.all]: sequelize.literal('SELECT 1'), // > ALL (SELECT 1)

      [Op.in]: [1, 2],                         // IN [1, 2]
      [Op.notIn]: [1, 2],                      // NOT IN [1, 2]

      [Op.like]: '%hat',                       // LIKE '%hat'
      [Op.notLike]: '%hat',                    // NOT LIKE '%hat'
      [Op.startsWith]: 'hat',                  // LIKE 'hat%'
      [Op.endsWith]: 'hat',                    // LIKE '%hat'
      [Op.substring]: 'hat',                   // LIKE '%hat%'
      [Op.iLike]: '%hat',                      // ILIKE '%hat' (不区分大小写) (仅 PG)
      [Op.notILike]: '%hat',                   // NOT ILIKE '%hat'  (仅 PG)
      [Op.regexp]: '^[h|a|t]',                 // REGEXP/~ '^[h|a|t]' (仅 MySQL/PG)
      [Op.notRegexp]: '^[h|a|t]',              // NOT REGEXP/!~ '^[h|a|t]' (仅 MySQL/PG)
      [Op.iRegexp]: '^[h|a|t]',                // ~* '^[h|a|t]' (仅 PG)
      [Op.notIRegexp]: '^[h|a|t]',             // !~* '^[h|a|t]' (仅 PG)

      [Op.any]: [2, 3],                        // ANY ARRAY[2, 3]::INTEGER (仅 PG)
      [Op.match]: Sequelize.fn('to_tsquery', 'fat & rat') // 匹配文本搜索字符串 'fat' 和 'rat' (仅 PG)

      // 在 Postgres 中, Op.like/Op.iLike/Op.notLike 可以结合 Op.any 使用:
      [Op.like]: { [Op.any]: ['cat', 'hat'] }  // LIKE ANY ARRAY['cat', 'hat']
    }
  }
});
```

### 事务处理

Sequelize中默认不使用事务。

使用事务时，我们有两种选择

- 托管事务
- 非托管事务

#### 非托管事务

1. 我们首先看一个例子

```js
async function insert_user(params){
    const t = await sequelize.transaction(); //开启事务
    try{
        //执行查询语句
        const flag = await count_user_byIdNumber(params.id_number);
        if(flag.ok === false){
            throw new Error("id_number has been existed!");//若错误则回滚
        }

        const user = await User.create({
            name: params.name,
            email: params.email,
            id_number: params.id_number,
            phone_number: params.phone_number,
            user_type: params.user_type
        }, {transaction: t});

        await t.commit();//若没有产生错误则提交
        return {
            ok: true,
            msg: user
        };
    } catch (error){
        console.log(error.message);
        await t.rollback(); //有错误则回滚
        return {
            ok: false,
            msg: error.message
        };
    }
}
```

可以看到，非托管事务中，我们需要手动提交事务与回滚事务。

#### 托管事务

如题所示，事务会被系统<b>托管，</b>可以自动提交或者回滚。

```js
try {
  const result = await sequelize.transaction(async (t) => {
    const user = await User.create({
      firstName: 'Abraham',
      lastName: 'Lincoln'
    }, { transaction: t });

    await user.setShooter({
      firstName: 'John',
      lastName: 'Boothe'
    }, { transaction: t });

    return user;

  });
  // 如果执行到此行,则表示事务已成功提交,`result`是事务返回的结果
  // `result` 就是从事务回调中返回的结果(在这种情况下为 `user`)
} catch (error) {
  // 如果执行到此,则发生错误.
  // 该事务已由 Sequelize 自动回滚！
}
```

