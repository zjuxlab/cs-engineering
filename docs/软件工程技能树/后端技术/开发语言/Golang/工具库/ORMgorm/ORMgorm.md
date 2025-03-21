---
title: ORM gorm
slug: ORM gorm
sidebar_position: 1
---


# ORM gorm

Author:马寿祥

<div class="callout callout-bg-2 callout-border-2">
<div class='callout-emoji'>💡</div>
<p>阅读指南，对于<code>扩展内容</code>，初次阅读时您可以跳过。本篇教程只是一个入门文档，高级用法建议直接看官方文档。</p>
</div>

# 前置知识

面向对象程序设计(OOP)

SQL

数据库基本操作

<div class="callout callout-bg-2 callout-border-2">
<div class='callout-emoji'>💡</div>
<p>需要了解这些是什么，以及，读懂简单的SQL语句，示例代码提供了等价SQL</p>
</div>

# 什么是ORM

对象关系映射（英语：Object Relational Mapping，简称ORM，或O/RM，或O/R mapping），是一种程序设计技术，用于实现面向对象编程语言里不同类型系统的数据之间的转换。从效果上说，它其实是创建了一个可在编程语言里使用的“虚拟对象数据库”。

> ORM即对象关系映射（Object Relational Mapping）
> 直白来说，就是将数据库里的表和对表的各种查询操作，映射为对象和方法。
> 这样一方面极大程度避免了我们直接在代码里写sql，仅用维护相应的对象，相对减少了成本。
> 另一方面，以对象呈现数据结构而不是写在硬编码里，也使得代码可读性大大提高。
> 除此之外，orm避免了直接的字符串拼接，从而一定程度上防止了sql注入。
> 比如`where name = "qwq" or "1"="1"`这种注入，用orm的话就会被编译成`where name = 'qwq" or "1"="1'`。
> 不过既然orm要多一些编译、优化过程，当然一定程度降低了程序的性能。
> go的orm一般使用`gorm`，python中可以考虑`sqlalchemy`，c#的`sqlsugar`据说也蛮好用的。

# GORM

## 简介

gorm是面向golang语言的一种ORM(持久层)框架，支持多种数据库的接入，例如MySQL，PostgreSQL，SQLite，SQL Server，Clickhouse（一个列示数据库）。 

<div class="callout callout-bg-2 callout-border-2">
<div class='callout-emoji'>💡</div>
<p>本文较为简略，详细可以参看官方中文文档</p>
</div>

##### `扩展内容：`

<div class="callout callout-bg-2 callout-border-2">
<div class='callout-emoji'>💡</div>
<p>关于行式数据库和列式数据库，可以看下面两张图。在某些特定场景下，列式数据库可能带来近百倍的性能提升。</p>
</div>

<div class="flex gap-3 columns-2" column-size="2">
<div class="w-[50%]" width-ratio="50">
![](/assets/G7iib0rl4ojUw1xAKKRcCOVjnKd.gif)
</div>
<div class="w-[50%]" width-ratio="50">
![](/assets/UzEUb5OwYov8lcxKiHOcQmN6nfb.gif)
</div>
</div>

## 快速入门

```go
package main

import (
  "gorm.io/gorm"
  "gorm.io/driver/sqlite"
)

type Product struct {
  gorm.Model
  Code  string
  Price uint
}

func main() {
  db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
  if err != nil {
    panic("failed to connect database")
  }

  // 迁移 schema
  db.AutoMigrate(&Product{})

  // Create
  db.Create(&Product{Code: "D42", Price: 100})

  // Read
  var product Product
  db.First(&product, 1) // 根据整型主键查找
  db.First(&product, "code = ?", "D42") // 查找 code 字段值为 D42 的记录

  // Update - 将 product 的 price 更新为 200
  db.Model(&product).Update("Price", 200)
  // Update - 更新多个字段
  db.Model(&product).Updates(Product{Price: 200, Code: "F42"}) // 仅更新非零值字段
  db.Model(&product).Updates(map[string]interface{}{"Price": 200, "Code": "F42"})

  // Delete - 删除 product
  db.Delete(&product, 1)
}
```

## 连接

### MySQL

```go
import (
  "gorm.io/driver/mysql"
  "gorm.io/gorm"
)

func main() {
  // 参考 https://github.com/go-sql-driver/mysql#dsn-data-source-name 获取详情
  dsn := "user:pass@tcp(127.0.0.1:3306)/dbname?charset=utf8mb4&parseTime=True&loc=Local"
  db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
}
```

##### `扩展内容：` 

MySQL 驱动程序提供了 [一些高级配置](https://github.com/go-gorm/mysql) 可以在初始化过程中使用，例如： 

```go
db, err := gorm.Open(mysql.New(mysql.Config{
  DSN: "gorm:gorm@tcp(127.0.0.1:3306)/gorm?charset=utf8&parseTime=True&loc=Local", // DSN data source name
  DefaultStringSize: 256, // string 类型字段的默认长度
  DisableDatetimePrecision: true, // 禁用 datetime 精度，MySQL 5.6 之前的数据库不支持
  DontSupportRenameIndex: true, // 重命名索引时采用删除并新建的方式，MySQL 5.7 之前的数据库和 MariaDB 不支持重命名索引
  DontSupportRenameColumn: true, // 用 `change` 重命名列，MySQL 8 之前的数据库和 MariaDB 不支持重命名列
  SkipInitializeWithVersion: false, // 根据当前 MySQL 版本自动配置
}), &gorm.Config{})
```

<div class="callout callout-bg-2 callout-border-2">
<div class='callout-emoji'>💡</div>
<p><code>charset=utf8mb4</code> 有什么用呢，建议自行了解Mysql与utf-8的前世今生（</p>
</div>

也可以使用一个现有连接来初始化`*gorm.DB`，这样就不需要dsn。

```go
import (
  "database/sql"
  "gorm.io/driver/mysql"
  "gorm.io/gorm"
)

sqlDB, err := sql.Open("mysql", "mydb_dsn")
gormDB, err := gorm.Open(mysql.New(mysql.Config{
  Conn: sqlDB,
}), &gorm.Config{})
```

### PostgreSQL

```go
import (
  "gorm.io/driver/postgres"
  "gorm.io/gorm"
)

dsn := "host=localhost user=gorm password=gorm dbname=gorm port=9920 sslmode=disable TimeZone=Asia/Shanghai"
db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
```

##### `扩展内容：` 

同样可以用现有连接初始化

```go
import (
  "database/sql"
  "gorm.io/driver/postgres"
  "gorm.io/gorm"
)

sqlDB, err := sql.Open("pgx", "mydb_dsn")
gormDB, err := gorm.Open(postgres.New(postgres.Config{
  Conn: sqlDB,
}), &gorm.Config{})
```

其它几种数据库的连接同理，建议直接看文档。

---

### 连接池

<div class="callout callout-bg-2 callout-border-2">
<div class='callout-emoji'>💡</div>
<p>细心的同学应该已经发现，通过现有连接初始化时，我们使用了<code>sql.Open(driverName, dataSourceName string)</code>,那么它是从哪里取出来的呢，其实是连接池。关于什么是连接池，有兴趣可以自行了解。</p>
</div>

 GORM 使用 [database/sql](https://pkg.go.dev/database/sql) 维护连接池。

```go
sqlDB, err := db.DB()

// SetMaxIdleConns 设置空闲连接池中连接的最大数量
sqlDB.SetMaxIdleConns(10)

// SetMaxOpenConns 设置打开数据库连接的最大数量。
sqlDB.SetMaxOpenConns(100)

// SetConnMaxLifetime 设置了连接可复用的最大时间。
sqlDB.SetConnMaxLifetime(time.Hour)
```

## 模型定义&约定

### 模型定义

模型是标准的 struct，由 Go 的基本数据类型、实现了 [Scanner](https://pkg.go.dev/database/sql/?tab=doc#Scanner) 和 [Valuer](https://pkg.go.dev/database/sql/driver#Valuer) 接口的自定义类型及其指针或别名组成。例如：

```go
type User struct {
  ID           uint
  Name         string
  Email        *string
  Age          uint8
  Birthday     *time.Time
  MemberNumber sql.NullString
  ActivedAt    sql.NullTime
  CreatedAt    time.Time
  UpdatedAt    time.Time
}
```

#### gorm.Model 

 GORM 定义一个 `gorm.Model` 结构体，其包括字段 `ID`、`CreatedAt`、`UpdatedAt`、`DeletedAt`

```go
// gorm.Model 的定义
type Model struct {
  ID        uint           `gorm:"primaryKey"`
  CreatedAt time.Time
  UpdatedAt time.Time
  DeletedAt gorm.DeletedAt `gorm:"index"`
}
```

可以将其嵌入结构体，来包含这些字段。

```go
type User struct {
  gorm.Model
  Name string
}
// 等效于
type User struct {
  ID        uint           `gorm:"primaryKey"`
  CreatedAt time.Time
  UpdatedAt time.Time
  DeletedAt gorm.DeletedAt `gorm:"index"`
  Name string
}
```

#### 字段标签

可以控制读写权限等，例如，

```go
type User struct {
  Name string `gorm:"<-:create"` // 允许读和创建
  Name string `gorm:"<-:update"` // 允许读和更新
  Name string `gorm:"<-"`        // 允许读和写（创建和更新）
  Name string `gorm:"<-:false"`  // 允许读，禁止写
  Name string `gorm:"->"`        // 只读（除非有自定义配置，否则禁止写）
  Name string `gorm:"->;<-:create"` // 允许读和写
  Name string `gorm:"->:false;<-:create"` // 仅创建（禁止从 db 读）
  Name string `gorm:"-"`  // 读写操作均会忽略该字段
}
```

##### `扩展内容：` 

 声明 model 时，tag 是可选的，GORM 支持以下 tag： tag 名大小写不敏感，但建议使用 `camelCase` 风格 

### 约定

> 如果您遵循 GORM 的约定，您就可以少写配置的代码。 如果约定不符合您的实际要求，[GORM 允许你配置它们](https://gorm.io/zh_CN/docs/conventions.html)

GORM 倾向于约定优于配置，默认情况下，GORM

#### 使用 `ID` 作为主键

```go
type User struct {
  ID   string // 默认情况下，名为 `ID` 的字段会作为表的主键
  Name string
}

// 将 `UUID` 设为主键
type Animal struct {
  ID     int64
  UUID   string `gorm:"primaryKey"` // 你可以通过标签 primaryKey 将其它字段设为主键 
  Name   string
  Age    int64
}
```

##### `扩展内容：` 

```go
//通过将多个字段设为主键，以创建复合主键，例如： 
type Product struct {
  ID           string `gorm:"primaryKey"`
  LanguageCode string `gorm:"primaryKey"`
  Code         string
  Name         string
}
<b>//</b><b>注意</b><b>：</b>默认情况下，整型 PrioritizedPrimaryField 启用了 AutoIncrement，要禁用它，您需要为整型字段关闭 autoIncrement： 
type Product struct {
  CategoryID uint64 `gorm:"primaryKey;autoIncrement:false"`
  TypeID     uint64 `gorm:"primaryKey;autoIncrement:false"`
}
```

#### 使用结构体名称的`蛇形命名的复数形式`作为表名

<div class="callout callout-bg-2 callout-border-2">
<div class='callout-emoji'>💡</div>
<p><code>蛇形命名</code>：转化形式如，<code>CreatedAt ==&gt; created_at</code></p>
</div>

```go
type User struct {} // 默认的表名是 `users`

// 如果设置禁用表名复数形式属性为 true，`User` 的表名将是 `user`
db.SingularTable(true)


// 您可以实现 Tabler 接口来更改默认表名，例如： 
// 设置 `User` 的表名为 `profiles`
func (User) TableName() string {
  return "profiles"
}
```

#### 使用字段名的 `蛇形命名` 作为列名

```go
type User struct {
  ID        uint      // 列名是 `id`
  Name      string    // 列名是 `name`
  Birthday  time.Time // 列名是 `birthday`
  CreatedAt time.Time // 列名是 `created_at`
}

// 您可以使用 column 标签或 [命名策略](https://learnku.com/docs/gorm/v2/conventions#naming_strategy) 来覆盖列名 
type Animal struct {
  AnimalID int64     `gorm:"column:beast_id"`         // 将列名设为 `beast_id`
  Birthday time.Time `gorm:"column:day_of_the_beast"` // 将列名设为 `day_of_the_beast`
  Age      int64     `gorm:"column:age_of_the_beast"` // 将列名设为 `age_of_the_beast`
}
```

#### 使用 `CreatedAt`、`UpdatedAt` 字段追踪创建、更新时间

对于有 `CreatedAt` 字段的模型，创建记录时，如果该字段值为零值，则将该字段的值设为当前时间， 对于有 `UpdatedAt` 字段的模型，更新记录时，将该字段的值设为当前时间。创建记录时，如果该字段值为零值，则将该字段的值设为当前时间。

## CUDA接口

<div class="callout callout-bg-2 callout-border-2">
<div class='callout-emoji'>💡</div>
<p>使用ORM最重要的当然还是这个啦。</p>
</div>

### 创建

插入一条

```go
user := User{Name: "Jinzhu", Age: 18, Birthday: time.Now()}

result := db.Create(&user) // 通过数据的指针来创建

user.ID             // 返回插入数据的主键
result.Error        // 返回 error
result.RowsAffected // 返回插入记录的条数
```

批量插入

```go
//全部插入
var users = []User{{Name: "jinzhu1"}, {Name: "jinzhu2"}, {Name: "jinzhu3"}}
db.Create(&users)
//插入其中指定数量的
var users = []User{name: "jinzhu_1"}, ...., {Name: "jinzhu_10000"}}
db.CreateInBatches(users, 100) //插入100条
```

使用Map

GORM 支持根据 `map[string]interface{}` 和 `[]map[string]interface{}{}` 创建记录，例如：

```go
//插入一条
db.Model(&User{}).Create(map[string]interface{}{
  "Name": "jinzhu", "Age": 18,
})

//批量插入
db.Model(&User{}).Create([]map[string]interface{}{
  {"Name": "jinzhu_1", "Age": 18},
  {"Name": "jinzhu_2", "Age": 20},
})
```

默认值

您可以通过标签 `default` 为字段定义默认值，如：

```go
type User struct {
  ID   int64
  Name string `gorm:"default:galeone"`
  Age  int64  `gorm:"default:18"`
}
```

插入记录到数据库时，默认值 <em>会被用于</em> 填充值为 [零值](https://tour.golang.org/basics/12) 的字段

<b>注意</b> 像 `0`、`''`、`false` 等零值，不会将这些字段定义的默认值保存到数据库。您需要使用指针类型或 Scanner/Valuer 来避免这个问题，例如：

`type User struct {`

`  gorm.Model`

`  Name string`

`  Age  *int           gorm:"default:18"`

`  Active sql.NullBool gorm:"default:true"`

`}`

<b>注意</b> 若要数据库有默认、虚拟 / 生成的值，你必须为字段设置 `default` 标签。若要在迁移时跳过默认值定义，你可以使用 `default:(-)`，例如：

```go
type User struct {
  ID        string `gorm:"default:uuid_generate_v3()"` // 数据库函数
  FirstName string
  LastName  string
  Age       uint8
  FullName  string `gorm:"->;type:GENERATED ALWAYS AS (concat(firstname,' ',lastname));default:(-);`
}
//注：uuid_generate_v3()是一个uuid生成函数
//UUID 是一种通用唯一标识符，它由 32 为十六进制数字以及连字符组成。

//与 SERIAL，标识列，和 序列 相比， UUID 具有全局的唯一性，而不是数据库中的唯一性。 UUID 更适合在集群环境中作为唯一标识符。

//PostgreSQL 支持 UUID 数据类型，以存储 UUID 数据。
```

##### `扩展内容：` 

<div class="callout callout-bg-2 callout-border-2">
<div class='callout-emoji'>💡</div>
<p>Hook 是在创建、查询、更新、删除等操作之前、之后调用的函数。</p>
<p>如果您已经为模型定义了指定的方法，它会在创建、更新、查询、删除时自动被调用。如果任何回调返回错误，GORM 将停止后续的操作并回滚事务。</p>
<p>钩子方法的函数签名应该是 func(*gorm.DB) error</p>
</div>

Hook：GORM 允许用户定义的钩子有 BeforeSave, BeforeCreate, AfterSave, AfterCreate 创建记录时将调用这些钩子方法。

例如：

```go
func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
  u.UUID = uuid.New()

    if u.Role == "admin" {
        return errors.New("invalid role")
    }
    return
}
```

如果您想跳过 钩子 方法，您可以使用 SkipHooks 会话模式，例如：

```go
DB.Session(&gorm.Session{SkipHooks: true}).Create(&user)

DB.Session(&gorm.Session{SkipHooks: true}).Create(&users)

DB.Session(&gorm.Session{SkipHooks: true}).CreateInBatches(users, 100)
```

使用 SQL 表达式、Context Valuer 创建记录

https://learnku.com/docs/gorm/v2/create/9732#46c90b

### 查询

查询一个

注意: `First`、`Last` 方法会根据主键查找到第一个、最后一个记录， 它仅在通过 struct 或提供 model 值进行查询时才起作用。 如果 model 类型没有定义主键，则按第一个字段排序。

```go
var user User
// 获取第一条记录（主键升序）
db.First(&user)
// SELECT * FROM users ORDER BY id LIMIT 1;

// 获取一条记录，没有指定排序字段
db.Take(&user)
// SELECT * FROM users LIMIT 1;

// 获取最后一条记录（主键降序）
db.Last(&user)
// SELECT * FROM users ORDER BY id DESC LIMIT 1;

result := db.First(&user)
result.RowsAffected // 返回找到的记录数
result.Error        // returns error

// 检查 ErrRecordNotFound 错误
errors.Is(result.Error, gorm.ErrRecordNotFound)

result := map[string]interface{}{}
db.Model(&User{}).First(&result)
// SELECT * FROM `users` ORDER BY `users`.`id` LIMIT 1

// First，Last不可以这样用
result := map[string]interface{}{}
db.Table("users").First(&result)

// Take可以这样用
result := map[string]interface{}{}
db.Table("users").Take(&result)

// 根据第一个字段排序
type Language struct {
  Code string
  Name string
}
db.First(&Language{})
// SELECT * FROM `languages` ORDER BY `languages`.`code` LIMIT 1
```

查询全部

```go
// 获取全部记录
result := db.Find(&users)
// SELECT * FROM users;

result.RowsAffected // 返回找到的记录数，相当于 `len(users)`
result.Error        // returns error
```

根据主键检索

```go
db.First(&user, 10)
// SELECT * FROM users WHERE id = 10;

db.First(&user, "10")
// SELECT * FROM users WHERE id = 10;

db.Find(&users, []int{1,2,3})
// SELECT * FROM users WHERE id IN (1,2,3);
```

条件

- String条件

```go
// 获取第一条匹配的记录
db.Where("name = ?", "jinzhu").First(&user)
// SELECT * FROM users WHERE name = 'jinzhu' ORDER BY id LIMIT 1;

// 获取全部匹配的记录
db.Where("name <> ?", "jinzhu").Find(&users)
// SELECT * FROM users WHERE name <> 'jinzhu';

// IN
db.Where("name IN ?", []string{"jinzhu", "jinzhu 2"}).Find(&users)
// SELECT * FROM users WHERE name IN ('jinzhu','jinzhu 2');

// LIKE
db.Where("name LIKE ?", "%jin%").Find(&users)
// SELECT * FROM users WHERE name LIKE '%jin%';

// AND
db.Where("name = ? AND age >= ?", "jinzhu", "22").Find(&users)
// SELECT * FROM users WHERE name = 'jinzhu' AND age >= 22;

// Time
db.Where("updated_at > ?", lastWeek).Find(&users)
// SELECT * FROM users WHERE updated_at > '2000-01-01 00:00:00';

// BETWEEN
db.Where("created_at BETWEEN ? AND ?", lastWeek, today).Find(&users)
// SELECT * FROM users WHERE created_at BETWEEN '2000-01-01 00:00:00' AND '2000-01-08 00:00:00';
```

- Struct & Map 条件

```go
// Struct
db.Where(&User{Name: "jinzhu", Age: 20}).First(&user)
// SELECT * FROM users WHERE name = "jinzhu" AND age = 20 ORDER BY id LIMIT 1;

// Map
db.Where(map[string]interface{}{"name": "jinzhu", "age": 20}).Find(&users)
// SELECT * FROM users WHERE name = "jinzhu" AND age = 20;

// 主键切片条件
db.Where([]int64{20, 21, 22}).Find(&users)
// SELECT * FROM users WHERE id IN (20, 21, 22);
```

<div class="callout callout-bg-2 callout-border-2">
<div class='callout-emoji'>💡</div>
<p>注意：当使用结构作为条件查询时，GORM 只会查询非零值字段。这意味着如果您的字段值为 <code>0</code>、<code>&#39;&#39;</code>、<code>false</code> 或其他 <a href="https://tour.golang.org/basics/12">零值</a>，该字段不会被用于构建查询条件，例如：</p>
</div>

```go
db.Where(&User{Name: "jinzhu", Age: 0}).Find(&users)
// SELECT * FROM users WHERE name = "jinzhu";

//您可以使用 map 来构建查询条件
db.Where(map[string]interface{}{"Name": "jinzhu", "Age": 0}).Find(&users)
// SELECT * FROM users WHERE name = "jinzhu" AND age = 0;
```

- 内联条件

```go
// SELECT * FROM users WHERE id = 23;
// 根据主键获取记录，如果是非整型主键
db.First(&user, "id = ?", "string_primary_key")
// SELECT * FROM users WHERE id = 'string_primary_key';

// Plain SQL
db.Find(&user, "name = ?", "jinzhu")
// SELECT * FROM users WHERE name = "jinzhu";

db.Find(&users, "name <> ? AND age > ?", "jinzhu", 20)
// SELECT * FROM users WHERE name <> "jinzhu" AND age > 20;

// Struct
db.Find(&users, User{Age: 20})
// SELECT * FROM users WHERE age = 20;

// Map
db.Find(&users, map[string]interface{}{"age": 20})
// SELECT * FROM users WHERE age = 20;
```

- Not条件

```go
db.Not("name = ?", "jinzhu").First(&user)
// SELECT * FROM users WHERE NOT name = "jinzhu" ORDER BY id LIMIT 1;

// Not In
db.Not(map[string]interface{}{"name": []string{"jinzhu", "jinzhu 2"}}).Find(&users)
// SELECT * FROM users WHERE name NOT IN ("jinzhu", "jinzhu 2");

// Struct
db.Not(User{Name: "jinzhu", Age: 18}).First(&user)
// SELECT * FROM users WHERE name <> "jinzhu" AND age <> 18 ORDER BY id LIMIT 1;

// 不在主键切片中的记录
db.Not([]int64{1,2,3}).First(&user)
// SELECT * FROM users WHERE id NOT IN (1,2,3) ORDER BY id LIMIT 1;
```

- Or条件

```go
db.Where("role = ?", "admin").Or("role = ?", "super_admin").Find(&users)
// SELECT * FROM users WHERE role = 'admin' OR role = 'super_admin';

// Struct
db.Where("name = 'jinzhu'").Or(User{Name: "jinzhu 2", Age: 18}).Find(&users)
// SELECT * FROM users WHERE name = 'jinzhu' OR (name = 'jinzhu 2' AND age = 18);

// Map
db.Where("name = 'jinzhu'").Or(map[string]interface{}{"name": "jinzhu 2", "age": 18}).Find(&users)
// SELECT * FROM users WHERE name = 'jinzhu' OR (name = 'jinzhu 2' AND age = 18);
```

选择特定字段

<div class="callout callout-bg-2 callout-border-2">
<div class='callout-emoji'>💡</div>
<p>默认情况下会选择全部字段，指定字段后，只会返回特定字段，可优化性能</p>
</div>

```go
db.Select("name", "age").Find(&users)
// SELECT name, age FROM users;

db.Select([]string{"name", "age"}).Find(&users)
// SELECT name, age FROM users;

db.Table("users").Select("COALESCE(age,?)", 42).Rows()
// SELECT COALESCE(age,'42') FROM users;
```

Scan

Scan 结果至 struct (把结果绑定回来)，用法与 `Find` 类似

```go
type Result struct {
  Name string
  Age  int
}

var result Result
db.Table("users").Select("name", "age").Where("name = ?", "Antonio").Scan(&result)

// 原生 SQL
db.Raw("SELECT name, age FROM users WHERE name = ?", "Antonio").Scan(&result)
```

##### `扩展内容：` 

排序

```go
db.Order("age desc, name").Find(&users)
// SELECT * FROM users ORDER BY age desc, name;

// 多个 order
db.Order("age desc").Order("name").Find(&users)
// SELECT * FROM users ORDER BY age desc, name;

db.Clauses(clause.OrderBy{
  Expression: clause.Expr{SQL: "FIELD(id,?)", Vars: []interface{}{[]int{1, 2, 3}}, WithoutParentheses: true},
}).Find(&User{})
// SELECT * FROM users ORDER BY FIELD(id,1,2,3)
```

Limit & Offset

```go
db.Limit(3).Find(&users)
// SELECT * FROM users LIMIT 3;

// 通过 -1 消除 Limit 条件
db.Limit(10).Find(&users1).Limit(-1).Find(&users2)
// SELECT * FROM users LIMIT 10; (users1)
// SELECT * FROM users; (users2)

db.Offset(3).Find(&users)
// SELECT * FROM users OFFSET 3;

db.Limit(10).Offset(5).Find(&users)
// SELECT * FROM users OFFSET 5 LIMIT 10;

// 通过 -1 消除 Offset 条件
db.Offset(10).Find(&users1).Offset(-1).Find(&users2)
// SELECT * FROM users OFFSET 10; (users1)
// SELECT * FROM users; (users2)
```

Group & Having

GROUP BY 语句用于结合聚合函数，根据一个或多个列对结果集进行分组。

在 SQL 中增加 HAVING 子句原因是，WHERE 关键字无法与聚合函数一起使用。HAVING 子句可以让我们筛选分组后的各组数据。

```go
type result struct {
  Date  time.Time
  Total int
}

db.Model(&User{}).Select("name, sum(age) as total").Where("name LIKE ?", "group%").Group("name").First(&result)
// SELECT name, sum(age) as total FROM `users` WHERE name LIKE "group%" GROUP BY `name`

db.Model(&User{}).Select("name, sum(age) as total").Group("name").Having("name = ?", "group").Find(&result)
// SELECT name, sum(age) as total FROM `users` GROUP BY `name` HAVING name = "group"

rows, err := db.Table("orders").Select("date(created_at) as date, sum(amount) as total").Group("date(created_at)").Rows()
for rows.Next() {
  ...
}

rows, err := db.Table("orders").Select("date(created_at) as date, sum(amount) as total").Group("date(created_at)").Having("sum(amount) > ?", 100).Rows()
for rows.Next() {
  ...
}

type Result struct {
  Date  time.Time
  Total int64
}
db.Table("orders").Select("date(created_at) as date, sum(amount) as total").Group("date(created_at)").Having("sum(amount) > ?", 100).Scan(&results)
```

Distinct

在表中，一个列可能会包含多个重复值，有时您也许希望仅仅列出不同（distinct）的值。

DISTINCT 关键词用于返回唯一不同的值。

```go
db.Distinct("name", "age").Order("name, age desc").Find(&results)
```

Joins

SQL join 用于把来自两个或多个表的行结合起来。

下图展示了 LEFT JOIN、RIGHT JOIN、INNER JOIN、OUTER JOIN 相关的 7 种用法。

![](/assets/Zje0btaLRoWS1Ix8UN2cgWqInxb.png)

```go
type result struct {
  Name  string
  Email string
}
db.Model(&User{}).Select("users.name, emails.email").Joins("left join emails on emails.user_id = users.id").Scan(&result{})
// SELECT users.name, emails.email FROM `users` left join emails on emails.user_id = users.id

rows, err := db.Table("users").Select("users.name, emails.email").Joins("left join emails on emails.user_id = users.id").Rows()
for rows.Next() {
  ...
}

db.Table("users").Select("users.name, emails.email").Joins("left join emails on emails.user_id = users.id").Scan(&results)

// 带参数的多表连接
db.Joins("JOIN emails ON emails.user_id = users.id AND emails.email = ?", "jinzhu@example.org").Joins("JOIN credit_cards ON credit_cards.user_id = users.id").Where("credit_cards.number = ?", "411111111111").Find(&user)
```

### 高级查询

### 更新

保存所有字段

`Save` 会保存所有的字段，即使字段是零值

```go
db.First(&user)

user.Name = "jinzhu 2"
user.Age = 100
db.Save(&user)
// UPDATE users SET name='jinzhu 2', age=100, birthday='2016-01-01', updated_at = '2013-11-17 21:34:10' WHERE id=111;
```

更新一列

当使用 `Update` 更新单个列时，你需要指定条件，否则会返回 `ErrMissingWhereClause` 错误，当使用了 `Model` 方法，且该对象主键有值，该值会被用于构建条件。

```go
// 条件更新
db.Model(&User{}).Where("active = ?", true).Update("name", "hello")
// UPDATE users SET name='hello', updated_at='2013-11-17 21:34:10' WHERE active=true;

// User 的 ID 是 `111`
db.Model(&user).Update("name", "hello")
// UPDATE users SET name='hello', updated_at='2013-11-17 21:34:10' WHERE id=111;

// 根据条件和 model 的值进行更新
db.Model(&user).Where("active = ?", true).Update("name", "hello")
// UPDATE users SET name='hello', updated_at='2013-11-17 21:34:10' WHERE id=111 AND active=true;
```

更新多列

`Updates` 方法支持 `struct` 和 `map[string]interface{}` 参数。当使用 `struct` 更新时，默认情况下，GORM 只会更新非零值的字段

```go
// 根据 `struct` 更新属性，只会更新非零值的字段
db.Model(&user).Updates(User{Name: "hello", Age: 18, Active: false})
// UPDATE users SET name='hello', age=18, updated_at = '2013-11-17 21:34:10' WHERE id = 111;

// 根据 `map` 更新属性
db.Model(&user).Updates(map[string]interface{}{"name": "hello", "age": 18, "actived": false})
// UPDATE users SET name='hello', age=18, actived=false, updated_at='2013-11-17 21:34:10' WHERE id=111;
```

<div class="callout callout-bg-2 callout-border-2">
<div class='callout-emoji'>💡</div>
<p><b>注意</b> 当通过 struct 更新时，GORM 只会更新非零字段。 如果您想确保指定字段被更新，你应该使用 <code>Select</code> 更新选定字段，或使用 <code>map</code> 来完成更新操作</p>
</div>

更新选定字段

如果您想要在更新时选定、忽略某些字段，您可以使用 `Select`、`Omit`

```go
// Select 和 Map
// User's ID is `111`:
db.Model(&user).Select("name").Updates(map[string]interface{}{"name": "hello", "age": 18, "actived": false})
// UPDATE users SET name='hello' WHERE id=111;

db.Model(&user).Omit("name").Updates(map[string]interface{}{"name": "hello", "age": 18, "actived": false})
// UPDATE users SET age=18, actived=false, updated_at='2013-11-17 21:34:10' WHERE id=111;

// Select 和 Struct （可以选中更新零值字段）
db.Model(&result).Select("Name", "Age").Updates(User{Name: "new_name", Age: 0})
// UPDATE users SET name='new_name', age=0 WHERE id=111;
```

批量更新

如果您尚未通过 `Model` 指定记录的主键，则 GORM 会执行批量更新

```go
// 根据 struct 更新
db.Model(User{}).Where("role = ?", "admin").Updates(User{Name: "hello", Age: 18})
// UPDATE users SET name='hello', age=18 WHERE role = 'admin;

// 根据 map 更新
db.Table("users").Where("id IN ?", []int{10, 11}).Updates(map[string]interface{}{"name": "hello", "age": 18})
// UPDATE users SET name='hello', age=18 WHERE id IN (10, 11);
```

<div class="callout callout-bg-2 callout-border-2">
<div class='callout-emoji'>💡</div>
<p>如果在没有任何条件的情况下执行批量更新，默认情况下，GORM 不会执行该操作，并返回 ErrMissingWhereClause 错误</p>
<p>对此，你必须加一些条件，或者使用原生 SQL，或者启用 AllowGlobalUpdate 模式</p>
</div>

```go
db.Model(&User{}).Update("name", "jinzhu").Error // gorm.ErrMissingWhereClause

db.Model(&User{}).Where("1 = 1").Update("name", "jinzhu")
// UPDATE users SET `name` = "jinzhu" WHERE 1=1

db.Exec("UPDATE users SET name = ?", "jinzhu")
// UPDATE users SET name = "jinzhu"

db.Session(&gorm.Session{AllowGlobalUpdate: true}).Model(&User{}).Update("name", "jinzhu")
// UPDATE users SET `name` = "jinzhu"
```

更新的记录数

```go
// 通过 `RowsAffected` 得到更新的记录数
result := db.Model(User{}).Where("role = ?", "admin").Updates(User{Name: "hello", Age: 18})
// UPDATE users SET name='hello', age=18 WHERE role = 'admin;

result.RowsAffected // 更新的记录数
result.Error        // 更新的错误
```

##### `扩展内容：` 

更新 Hook

对于更新操作，GORM 支持 `BeforeSave`、`BeforeUpdate`、`AfterSave`、`AfterUpdate` 钩子，这些方法将在更新记录时被调用。

```go
func (u *User) BeforeUpdate(tx *gorm.DB) (err error) {
    if u.Role == "admin" {
        return errors.New("admin user not allowed to update")
    }
    return
}
```

### 删除

删除一条

删除一条记录时，删除对象需要指定主键，否则会触发 批量删除

```go
// Email 的 ID 是 `10`
db.Delete(&email)
// DELETE from emails where id = 10;

// 带额外条件的删除
db.Where("name = ?", "jinzhu").Delete(&email)
// DELETE from emails where id = 10 AND name = "jinzhu";
```

批量删除

如果指定的值不包括主键，那么 GORM 会执行批量删除，它将删除所有匹配的记录

```go
db.Where("email LIKE ?", "%jinzhu%").Delete(Email{})
// DELETE from emails where email LIKE "%jinzhu%";

db.Delete(&Email{}, "email LIKE ?", "%jinzhu%")
// DELETE from emails where email LIKE "%jinzhu%";
```

<div class="callout callout-bg-2 callout-border-2">
<div class='callout-emoji'>💡</div>
<p>和更新操作相同，如果在没有任何条件的情况下执行批量删除，GORM 不会执行该操作，并返回 ErrMissingWhereClause 错误</p>
<p>对此，你必须加一些条件，或者使用原生 SQL，或者启用 AllowGlobalUpdate 模式</p>
</div>

```go
db.Delete(&User{}).Error // gorm.ErrMissingWhereClause

db.Where("1 = 1").Delete(&User{})
// DELETE FROM `users` WHERE 1=1

db.Exec("DELETE FROM users")
// DELETE FROM users

db.Session(&gorm.Session{AllowGlobalUpdate: true}).Delete(&User{})
// DELETE FROM users
```

根据主键删除

<div class="callout callout-bg-2 callout-border-2">
<div class='callout-emoji'>💡</div>
<p>GORM 允许通过内联条件指定主键来检索对象，但只支持整型数值，因为 string 可能导致 SQL 注入。</p>
</div>

```go
db.Delete(&User{}, 10)
// DELETE FROM users WHERE id = 10;

db.Delete(&User{}, "10")
// DELETE FROM users WHERE id = 10;

db.Delete(&users, []int{1,2,3})
// DELETE FROM users WHERE id IN (1,2,3);
```

##### `扩展内容：` 

Delete Hook

对于删除操作，GORM 支持 `BeforeDelete`、`AfterDelete` Hook，在删除记录时会调用这些方法

```go
func (u *User) BeforeDelete(tx *gorm.DB) (err error) {
    if u.Role == "admin" {
        return errors.New("admin user not allowed to delete")
    }
    return
}
```

软删除

<div class="callout callout-bg-2 callout-border-2">
<div class='callout-emoji'>💡</div>
<p>如果您的模型包含了一个 gorm.deletedat 字段（gorm.Model 已经包含了该字段)，它将自动获得软删除的能力！</p>
<p>拥有软删除能力的模型调用 Delete 时，记录不会被从数据库中真正删除。但 GORM 会将 DeletedAt 置为当前时间， 并且你不能再通过正常的查询方法找到该记录。</p>
</div>

```go
// user 的 ID 是 `111`
db.Delete(&user)
// UPDATE users SET deleted_at="2013-10-29 10:23" WHERE id = 111;

// 批量删除
db.Where("age = ?", 20).Delete(&User{})
// UPDATE users SET deleted_at="2013-10-29 10:23" WHERE age = 20;

// 在查询时会忽略被软删除的记录
db.Where("age = 20").Find(&user)
// SELECT * FROM users WHERE age = 20 AND deleted_at IS NULL;
```

查找被软删除的记录

```go
db.Unscoped().Where("age = 20").Find(&users)
// SELECT * FROM users WHERE age = 20;
```

永久删除

```go
db.Unscoped().Delete(&order)
// DELETE FROM orders WHERE id=10;
```

<div class="callout callout-bg-2 callout-border-2">
<div class='callout-emoji'>💡</div>
<p>你也可以自定义删除标志，而不是使用当前时间戳，在此不做讨论</p>
</div>

### SQL构建器（`扩展内容`）

原生 SQL

原生查询 SQL 和 Scan

```go
type Result struct {
  ID   int
  Name string
  Age  int
}

var result Result
db.Raw("SELECT id, name, age FROM users WHERE id = ?", 3).Scan(&result)

var age int
db.Raw("select sum(age) from users where role = ?", "admin").Scan(&age)
```

`Exec` 原生 SQL

```go
db.Exec("DROP TABLE users")
db.Exec("UPDATE orders SET shipped_at=? WHERE id IN ?", time.Now(), []int64{1,2,3})

// Exec SQL 表达式
db.Exec("update users set money=? where name = ?", gorm.Expr("money * ? + ?", 10000, 1), "jinzhu")
```

命名参数

GORM 支持 sql.NamedArg、map[string]interface{}{} 或 struct 形式的命名参数。

```go
db.Where("name1 = @name OR name2 = @name", sql.Named("name", "jinzhu")).Find(&user)
// SELECT * FROM `users` WHERE name1 = "jinzhu" OR name2 = "jinzhu"

db.Where("name1 = @name OR name2 = @name", map[string]interface{}{"name": "jinzhu2"}).First(&result3)
// SELECT * FROM `users` WHERE name1 = "jinzhu2" OR name2 = "jinzhu2" ORDER BY `users`.`id` LIMIT 1

// 原生 SQL 及命名参数
db.Raw("SELECT * FROM users WHERE name1 = @name OR name2 = @name2 OR name3 = @name",
   sql.Named("name", "jinzhu1"), sql.Named("name2", "jinzhu2")).Find(&user)
// SELECT * FROM users WHERE name1 = "jinzhu1" OR name2 = "jinzhu2" OR name3 = "jinzhu1"

db.Exec("UPDATE users SET name1 = @name, name2 = @name2, name3 = @name",
   sql.Named("name", "jinzhunew"), sql.Named("name2", "jinzhunew2"))
// UPDATE users SET name1 = "jinzhunew", name2 = "jinzhunew2", name3 = "jinzhunew"

db.Raw("SELECT * FROM users WHERE (name1 = @name AND name3 = @name) AND name2 = @name2",
   map[string]interface{}{"name": "jinzhu", "name2": "jinzhu2"}).Find(&user)
// SELECT * FROM users WHERE (name1 = "jinzhu" AND name3 = "jinzhu") AND name2 = "jinzhu2"

type NamedArgument struct {
    Name string
    Name2 string
}

db.Raw("SELECT * FROM users WHERE (name1 = @Name AND name3 = @Name) AND name2 = @Name2",
     NamedArgument{Name: "jinzhu", Name2: "jinzhu2"}).Find(&user)
// SELECT * FROM users WHERE (name1 = "jinzhu" AND name3 = "jinzhu") AND name2 = "jinzhu2"
```

## 链式调用

GORM 允许进行链式操作，所以您可以像这样写代码：

```go
db.Where("name = ?", "jinzhu").Where("age = ?", 18).First(&user)
```

Where, Select, Omit, Joins, Scopes, Preload, Raw都可以进行链式方法调用（Raw不可以和其它方法一起使用）

## 事务

### 禁用默认事务

为了确保数据一致性，GORM 会在事务里执行写入操作（创建、更新、删除）。如果没有这方面的要求，您可以在初始化时禁用它，这将获得大约 30%+ 性能提升。

```go
// 全局禁用
db, err := gorm.Open(sqlite.Open("gorm.db"), &gorm.Config{
  SkipDefaultTransaction: true,
})

// 持续会话模式
tx := db.Session(&Session{SkipDefaultTransaction: true})
tx.First(&user, 1)
tx.Find(&users)
tx.Model(&user).Update("Age", 18)
```

### 事务

要在事务中执行一系列操作，一般流程如下：

```go
db.Transaction(func(tx *gorm.DB) error {
  // 在事务中执行一些 db 操作（从这里开始，您应该使用 'tx' 而不是 'db'）
  if err := tx.Create(&Animal{Name: "Giraffe"}).Error; err != nil {
    // 返回任何错误都会回滚事务
    return err
  }

  if err := tx.Create(&Animal{Name: "Lion"}).Error; err != nil {
    return err
  }

  // 返回 nil 提交事务
  return nil
})
```

### 嵌套事务

GORM 支持嵌套事务，您可以回滚较大事务内执行的一部分操作

```go
db.Transaction(func(tx *gorm.DB) error {
  tx.Create(&user1)

  tx.Transaction(func(tx2 *gorm.DB) error {
    tx2.Create(&user2)
    return errors.New("rollback user2") // Rollback user2
  })

  tx.Transaction(func(tx2 *gorm.DB) error {
    tx2.Create(&user3)
    return nil
  })

  return nil
})

// Commit user1, user3
```

### 手动事务

```go
// 开始事务
tx := db.Begin()

// 在事务中执行一些 db 操作（从这里开始，您应该使用 'tx' 而不是 'db'）
tx.Create(...)

// ...

// 遇到错误时回滚事务
tx.Rollback()

// 否则，提交事务
tx.Commit()
```

一个特殊的示例

```go
func CreateAnimals(db *gorm.DB) error {
  // 再唠叨一下，事务一旦开始，你就应该使用 tx 处理数据
  tx := db.Begin()
  defer func() {
    if r := recover(); r != nil {
      tx.Rollback()
    }
  }()

  if err := tx.Error; err != nil {
    return err
  }

  if err := tx.Create(&Animal{Name: "Giraffe"}).Error; err != nil {
     tx.Rollback()
     return err
  }

  if err := tx.Create(&Animal{Name: "Lion"}).Error; err != nil {
     tx.Rollback()
     return err
  }

  return tx.Commit().Error
}
```

### SavePoint、RollbackTo

GORM 提供了 `SavePoint`、`Rollbackto` 来提供保存点以及回滚至保存点

```go
tx := db.Begin()
tx.Create(&user1)

tx.SavePoint("sp1")
tx.Create(&user2)
tx.RollbackTo("sp1") // Rollback user2

tx.Commit() // Commit user1
```

# 参考文档

