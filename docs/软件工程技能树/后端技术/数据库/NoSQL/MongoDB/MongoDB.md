---
title: MongoDB
slug: MongoDB
sidebar_position: 0
---


# MongoDB

## 概述

Mongodb 是一种使用广泛的非关系型数据库。只需键值对，不需要设置相同的字段，相同的字段也不需要相同的数据类型，操作简单。

官方教程友好且全面 https://www.mongodb.com/docs/v6.0/

## 安装

### Windows 平台

https://www.mongodb.com/docs/v6.0/tutorial/install-mongodb-on-windows/

【注】mongo.exe 在 mongodb 6.0 之后不再随之安装。可以采用 mongodb shell, 这需要单独下载安装，之后的命令可以采用 mongosh 替代原来的 mongo 命令

### Linux 平台

https://www.mongodb.com/docs/manual/administration/install-on-linux/

## 
## 连接

### 使用 Go 连接远程 Linux-mongodb

首先远程服务器必然需要安装 mongodb，具体安装过程请看官方 tutorial

我们采用如下的代码检测连通性。在代码中我们要变动的内容为 uri，修改为 linux 服务器对应的 ip 地址，端口等信息，即可完成连接。

【注】如果密码中含有@字符，在 Connect 中加入 uri_decode_auth: true，也可以通过配置options.Credential 而解决。

```go
package main

import (
    "context"
    "fmt"
    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
    "go.mongodb.org/mongo-driver/mongo/readpref"
)

// Connection URI
const uri = "mongodb://user:pwd@ip:port/dbname"

func main() {
    // Create a new client and connect to the server
    client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))
    if err != nil {
        panic(err)
    }
    defer func() {
        if err = client.Disconnect(context.TODO()); err != nil {
            panic(err)
        }
    }()
    
    // Ping the primary
    if err := client.Ping(context.TODO(), readpref.Primary()); err != nil {
        panic(err)
    }
    fmt.Println("Successfully connected and pinged.")
}
```

### Server部分

#### Enable Access Control

当我们启动了 access control 的时候，user 必须要验证身份后才能执行操作。默认的做法是使用 SCRAM 进行验证。

启动 mongod `mongod --port 27017 --dbpath /var/lib/mongodb` 本地连接 `mongosh --port 27017` 创建用户，分配权限

```
use admin
db.createUser(
  {
    user: "myUserAdmin",
    pwd: passwordPrompt(), // or cleartext password
    roles: [
      { role: "userAdminAnyDatabase", db: "admin" },
      { role: "readWriteAnyDatabase", db: "admin" }
    ]
  }
)
```

用 mongosh 退出当前 mongod `db.adminCommand( { shutdown: 1 } )` 退出 mongod。修改配置文件，配置文件的默认地址为 /etc/mongod.conf

```
security:
    authorization: enabled
```

这样我们就成功启动了 auth，之后再连接之后则需要进行验证

```
use admin
db.auth("myUserAdmin", passwordPrompt()) // or cleartext password
```

更详细的内容请见 [Use SCRAM to Authenticate Clients — MongoDB Manual](https://www.mongodb.com/docs/manual/tutorial/configure-scram-client-authentication/)

【注】我们可以在之后会遇到 `sudo systemctl start mongod` 不能正确启动 (exitcode=14) 的情况，这是由于当我们执行 mongod 命令时，会创建一些 system files，这些 system files 的 owner 是 root 而不是 mongod。而我们的 systemctl 则会以 mongod 用户运行，这遵循了 least privilege 原则。可以通过改变 owner 来修复问题。

```
sudo chown -R mongodb:mongodb /var/lib/mongodb
sudo chown mongodb:mongodb /tmp/mongodb-27017.sock
```

之后我们执行 sudo service mongod restart 即可启动服务。

#### 创建用户及密码

远程连接必定需要账户密码进行验证。

创建用户

```
db.createUser({
    user: "userName",
    pwd: passwordPrompt(),
    roles: []
})
```

查看用户

```
db.getUsers()
```

删除用户

```
db.dropUser("tom")
```

更详细的内容请见 [MongoDB Users and Authentication - Create, List, and Delete (prisma.io)](https://www.prisma.io/dataguide/mongodb/configuring-mongodb-user-accounts-and-authentication)。关于 roles 的相关内容移步官方文档 [Built-In Roles — MongoDB Manual](https://www.mongodb.com/docs/manual/reference/built-in-roles/#std-label-built-in-roles)。

#### bindIP

如果我们是在默认情况下启动，那么我们的 bindIP 会被设置为 127.0.0.1 这会使得只有在相同机器上跑的客户端才能得到响应。我们可以通过 config 文件，或者是通过命令行参数 --bind_ip 来设置。

注意在修改配置文件后需要执行 `sudo systemctl restart mongod` 加载配置文件

【注】这可能会带来安全风险。可以查看 Security Checklist 来对照。[Security Checklist — MongoDB Manual](https://www.mongodb.com/docs/manual/administration/security-checklist/)

### Client 部分

#### URI

mongoDB 的连接 url 格式如下所示

```bash
mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]
```

这里的 host 可以有多个，以便于分布式存储。port 的默认值为 27017。

官方文档 [MongoDB Go Driver — Go](https://www.mongodb.com/docs/drivers/go/current/)

除去直接定义常量之外，也可以用如下所示的方法。这样处理的好处是特殊字符更加容易处理了。

```go
credential := options.Credential{
   AuthSource: "<authenticationDb>",
   Username: "<username>",
   Password: "<password>",
}
clientOpts := options.Client().ApplyURI("mongodb://<hostname>:<port>").
   SetAuth(credential)

client, err := mongo.Connect(context.TODO(), clientOpts)
```

## 基础语法

-  创建数据库/切换数据库

```go
use DATABASE_NAME
```

-  查看所有数据库

```go
show dbs
```

注意在我们 use 了之后，用 `show dbs` 不能看见数据库列表中有对应数据库。需要我们在新建数据库中插入数据才可以显示。

-  删除数据库

```go
db.dropDatabase()
```

-  删除集合

```go
db.collection.drop()
```

-  创建集合

```go
db.createCollection(name, options)
```

当我们向未创建的集合中插入文档的时候，其会自动创建。

### CRUD 

CRUD的相关文档可以在这儿看 https://www.mongodb.com/docs/v6.0/crud/

-  insert

```go
db.collection.insertOne(
   <document>,
   {
      writeConcern: <document>
   }
)
```

如果需要向集合中插入多个文档，语法格式如下

```go
db.collection.insertMany(
   [ <document 1> , <document 2>, ... ],
   {
      writeConcern: <document>,
      ordered: <boolean>
   }
)
```

这里的插入是顺序插入，即第一个失败后，后面的插入都不会再执行。

documen 表示要写入的文档

writeConcern 写入策略，默认为1，代表确认写操作

ordered 是否顺序写入

- update

```go
db.collection.updateOne(
   <filter>,
   <update>,
   {
     upsert: <boolean>,
     collation: <document>,
     writeConcern: <document>,
     arrayFilters: [ <filterdocument1>, ... ],
     hint:  <document|string>       
   }
)
```

-  delete

deleteOne

```go
db.collection.deleteOne(
   <filter>,
   {
      writeConcern: <document>,
      collation: <document>,
      hint: <document|string> 
   }
)
```

deleteMany

```go
db.collection.deleteMany(
   <filter>,
   {
      writeConcern: <document>,
      collation: <document>
   }
)
```

-  Find 

findOne

```go
db.coll.findOne(query, projection)
```

find

```go
db.collection.find(query, projection)
```

### Operator

#### $expr

大于 $gt，小于 $lt，大于等于 $gte，小于等于 $lte，等于 $eq

#### $in

表明字段值必须为列表中的任意一个值

```go
{ field: { $in: [<value1>, <value2>, ... <valueN> ] } }
```

#### $elemMatch

```go
{ arrayfield: { $elemMatch: { $gte: 80, $lt: 85 } } }
```

- sort

采用 sort 方法可以将获得到的数据进行排序，其中1代表升序排列，-1则代表降序排列

```go
db.COLLECTION_NAME.find().sort({KEY:1})
```

- 索引 index

createIndex

```go
db.collection.createIndex(
  {
      key1: 1,        
      key2: 1        
  },
  {
      unique: true,                
      sparse: true,                
  }
)
```

dropIndex

```go
db.collection.dropIndex(indexname)
```

getIndexes

```go
db.collection.getIndexes()
```

### Aggregation

聚合(aggregate)主要用于处理数据(诸如统计平均值，求和等)，并返回计算后的数据结果。

```go
db.coll.aggregate(pipeline, options)
```

其中，pipeline是一系列操作，聚合将文档依次进行一定操作然后返回（返回的是文档指针）。

示例

```go
db.coll.insertMany([
    {_id:1,name:"qwq",num:1},
    {_id:2,name:"qwq",num:3},
    {_id:3,name:"qaq",num:2},
    {_id:4,name:"www",num:5},
])
db.coll.aggregate([
    {$match:{name:"qwq"}},
    {$set:{num:0}},
    {$project:{_id:0}}
])
/* result
{name:"qwq",num:0}
{name:"qwq",num:0}
*/
```

#### $project

可以用来重命名，删除，移动域。

```go
db.article.aggregate(
    { $project : {
        _id : 0 ,
        title : 1 ,
        author : 1
    }});
```

在这种情况下我们舍弃了 \_id 字段

#### $unwind

将文档中的某一个数组类型字段拆分成多条，每条包含数组中的一个值。

```go
db.coll.insertOne(
    { "_id" : 1, "item" : "ABC1", sizes: [ "S", "M", "L"] }
)
db.coll.aggregate( [ { $unwind : "$sizes" } ] )
/* result
{ "_id" : 1, "item" : "ABC1", "sizes" : "S" }
{ "_id" : 1, "item" : "ABC1", "sizes" : "M" }
{ "_id" : 1, "item" : "ABC1", "sizes" : "L" }
*/
```

#### $group

```go
{$group: {
    _id: <identifier>,
    <field>: <accumulator:value>
    ...
}}
```

其中，`_id`是分组条件，其可以是原来文档的字段，也可以是包含原文档属性的operator表达式。

#### $replaceRoot

一个更加彻底的改变文档结构的方法。

```go
db.coll.insertOne(
    { _id : 1, sizes: [ {name:"qwq"}, {name:"qaq"}]}
)
db.coll.aggregate( [ 
    { $unwind : "$sizes" },
    { $replaceRoot: {newRoot:"$sizes"}}
] )
/* result
{ name: 'qwq' }
{ name: 'qaq' }
*/
```

当然还有很多的 aggregation 

https://www.mongodb.com/docs/v6.0/meta/aggregation-quick-reference/

## Go with mongo

### 类型和绑定

之前以及提到过，MongoDB 可以通过 bson 非常方便地接轨各类语言。在 go 中，这主要就是使用 mongo-driver 的`bson`和`options`两个模块。

#### bson

mongo 的 bson 类似于 json，是一种键值对格式：

```json
{
  "_id": {
    "$oid": "62e2db2cac21442171666923"
  },
  "name": "even",
  "tp": [
      {"qwq":1},
      {"qwq":2}
  ]
}
```

而在go中，bson模块提供了四种类型：

```go
import . "go.mongodb.org/mongo-driver/bson"

func main() {
    a := D{{"Key1", "Value1"}, {"Key2", "Value2"}}
        b := E{"Key3", "Value3"}
        a = append(a, b)
        c := M{"Key1": "Value1", "Key2": "Value2"}
        d := A{"A", "B"}
}
```

其中，`bson.D`是有序表示的键值对(slice)，`bson.E`就是其中的一对键值对，<b>bson.D</b><b>是支持 append 方法的</b>。`bson.M`是无序的键值对(map)，`bson.A`就是list(array)。

除了用这些类型表示bson文档，还可以用 bson tag 将结构体绑定成bson格式，可以使用`omitempty，-`等参数，和json tag差不太多。不绑定的话默认是以lowercase当作字段名，并且参数的<b>首字母必须大写</b>才能被绑定。

因为mongo是nosql，随便什么类型都可以往里面塞，但是如果类型不固定就只能用interface接。

```go
type myStruct struct {
    Name         string                 `bson:"name,omitempty"`
    TestName     interface{}            `bson:"test_name"`
}
```

### 一些特殊类型在go中使用

#### ObjectID

mongo的主键 `_id` 默认是其自带的ObjectID类型，本质上这是由日期，机器码，进程id和一个随机数生成的uuid，这种id极大地方便了分布式的数据库系统。（虽然实际用时用字符串或者其他类型盖掉也完全没关系x）

bson包提供了一个类型与其对应，还可以从中提取时间信息，或与16进制串互相转换。

```go
import (
        "go.mongodb.org/mongo-driver/bson"
        "go.mongodb.org/mongo-driver/bson/primitive"
)

func main {
    a := primitive.NewObjectID() //primitive.ObjectID
        b := primitive.NewObjectIDFromTimestamp(time.Now())
        fmt.Println(a.Hex(), b.Timestamp())
}
```

#### Date&Timestamp

对应类型为`time.Time`，存进数据库的所有日期都会被转成UTC。

你也可以使用`int64`或者`string`来储存时间。

#### Undefined,Null

go不支持这个，全是0值

实习相关文档：[MongoDB](wikcnmbaUrMmraQp0uiILVXodRd) 

## 
