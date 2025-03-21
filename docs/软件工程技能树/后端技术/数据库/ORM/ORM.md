---
title: ORM
slug: ORM
sidebar_position: 1
---


# ORM

Author: Vista

## 什么是ORM

ORM即对象关系映射（Object Relational Mapping）

直白来说，就是将数据库里的表和对表的各种查询操作，映射为对象和方法。

这样一方面极大程度避免了我们直接在代码里写sql，仅用维护相应的对象，相对减少了成本。

另一方面，以对象呈现数据结构而不是写在硬编码里，也使得代码可读性大大提高。

除此之外，orm避免了直接的字符串拼接，从而一定程度上防止了sql注入。

> 比如`where name = "qwq" or "1"="1"`这种注入，用orm的话就会被编译成`where name = 'qwq" or "1"="1'`。

不过既然orm要多一些编译、优化过程，当然一定程度降低了程序的性能。

go的orm一般使用`gorm`，python中可以考虑`sqlalchemy`，c#的`sqlsugar`据说也蛮好用的。

当然，我们还是仅介绍`gorm`。

## Basic

[GORM 指南 | GORM ](https://gorm.io/zh_CN/docs/index.html)

<div class="callout callout-bg-5 callout-border-2">
<div class='callout-emoji'>📌</div>
<p>gorm的中文文档就入门来说还行（虽然例子有点抽象x）。所以这篇文档主要是提一下重要的地方，相当于给官方文档列了个提纲，大家详细可以看官方文档。</p>
</div>

### 连接

[连接到数据库 | GORM](https://gorm.io/zh_CN/docs/connecting_to_the_database.html)

### 模型定义

[模型定义 | GORM](https://gorm.io/zh_CN/docs/models.html#%E5%B5%8C%E5%85%A5%E7%BB%93%E6%9E%84%E4%BD%93) ；[约定 | GORM](https://gorm.io/zh_CN/docs/conventions.html)

gorm通过定义一个结构体与表对应。

虽然有很多自定义的tag，但是gorm倾向于使用预先约定的命名规则，减少使用自定义tag。

<div class="callout callout-bg-5 callout-border-2">
<div class='callout-emoji'>📌</div>
<p>go是没有null类型的，数据库中所有null值都会被解析成0值，但是代码里的0值传进数据库是当然不会变成null的。</p>
<p>go唯一可以被视作null的就是nil值，所以当然可以用指针解决一切问题x</p>
<p>或者可以手改sql解析接口，第三方包gopkg.in/guregu/null.v3就是这么干的，这个包提供了json和sql的null值的解析。</p>
</div>

定义好后可以直接使用`AutoMigrate`建表，如果没有奇奇怪怪的冲突，automigrate可以自动改表。（[Migration | GORM](https://gorm.io/zh_CN/docs/migration.html)）

### CRUD

[crud | GORM](https://gorm.io/zh_CN/docs/create.html)

基本的crud接口：（这里的Debug是为了打印sql语句）

```go
//improt (
//    . "gopkg.in/guregu/null.v3"
//)

type User struct {
        ID    int
        Name  string
        Class String
}

func main() {
        initMySQL()
        var err error
        var user User

    // Create
        newUser := User{
                Name: "vista",
        }
        err = testDB.Debug().Create(&newUser).Error
        if err != nil {
                logrus.Error(err)
        }
    // INSERT INTO `users` (`name`,`class`) VALUES ('vista',NULL)

    // Query
        user = User{}
        user.ID = 1
        err = testDB.Debug().Find(&user).Error
        if err != nil {
                logrus.Error(err)
        }
        fmt.Println(user)
    // SELECT * FROM `users` WHERE `users`.`id` = 1

    // Update
        user = User{}
        user.ID = 1
        user.Class = StringFrom("qwq")
        err = testDB.Debug().Updates(&user).Error
        if err != nil {
                logrus.Error(err)
        }
    // UPDATE `users` SET `class`='qwq' WHERE `id` = 1

    // Delete
        user = User{ID: 1}
        err = testDB.Debug().Delete(&user).Error
        if err != nil {
                logrus.Error(err)
        }
    // DELETE FROM `users` WHERE `users`.`id` = 1
}
```

- 通过使用预先定义的结构体，gorm可以自动判断表。使用`Model`或`Table`可以手动设置表。
- 一些查询接口，比如`First`在没有查询到记录的情况下会返回ErrNotFound。
- update一般使用`Updates`，这个接口会忽略0值字段，如果要强制更新请使用`Select`选定。另一个`Save`接口会更新所有字段，而且默认是upsert的。
- 以上所有接口支持批量操作，直接传array即可。

### Joins

可以这样进行join：

```go
joinTable := testDB.Table("users as u").Joins("LEFT JOIN records as r ON u.id = r.user_id")
joinTable.Find(...)
```

(如果不知道join在干啥可以先看[join](https://www.runoob.com/sql/sql-join.html))

(顺便gorm是没法union的，只能用裸sql来union)

### 链式方法

[链式方法 | GORM](https://gorm.io/zh_CN/docs/method_chaining.html)

gorm并非所有接口都会连接数据库并执行操作，像`Select`，`Where`等接口只是在叠sql语句，返回一个有状态的`*gorm.DB`。

```go
tx := db.Where("name LIKE ?","%vista%")
tx = tx.Not("name = ?","vista")
tx.Find(&user)
```

## 扩展

### 事务

[事务 | GORM](https://gorm.io/zh_CN/docs/transactions.html)

非常简单方便，返回任何错误都会自动回滚

```go
err = testDB.Transaction(func(tx *gorm.DB) error {
                err := tx.DoSomething.Error
            if err != nil {
            // rollback
                        return err
                }
            // submit
                return nil
        })
        // 虽然出现了迷惑代码x
        // 但是只是为了说明怎么submit和rollback
```

### 钩子

[Hook | GORM](https://gorm.io/zh_CN/docs/hooks.html)

救事trigger。直接绑定在定义的模型上即可。

### 关联

[关联| GORM](https://gorm.io/zh_CN/docs/belongs_to.html)

gorm提供了四种关联方式，以Has One举例：

```go
type Class struct {
        Class     string
        Credit    int
        StudentID int
}

type User struct {
        ID    int
        Name  String
        Class *Class `gorm:"foreignKey:student_id"`
}
```

虽然此处Class用不用指针都可以关联，但是毕竟Class不一定用得到，用指针的话当不关联查询时Class就是nil而不是一个空值结构体。

<b>关联的crud其实还是执行了多次，只不过gorm封装在一起了</b>

当在users表中插入数据时带上了Class，gorm会顺手将其插入classes表中。

但是查询时默认是不查询关联的，需要进行 `Preload`才会返回关联。

```go
err := testDB.Preload("Class").Find(&user).Error
```

在删除操作时，可能会因为外键约束失败。比如在上面这个关联，在删除有Classes表中存在的StudentID对应的User时会报错。

常用的外键约束：

1. RESTRICT/ NO ACTION：不允许违反外键约束的操作
2. CASEADE：父表update/delete时同步update/delete子表记录
3. SET NULL：父表有变更时将子表外键设为null（或者是default值？）

比如将上面的定义改成：

```go
type User struct {
        ID    int
        Name  String
        Class []*Class  `gorm:"foreignKey:student_id;constraint:OnUpdate:CASCADE,OnDelete:SET NULL"`
}
```

就能删User了。

# 思考题

- ORM和ODM有什么区别
- ORM有哪些典型实现方式
    - 参考gorm, go::ent, python::sqlArchemy等

