---
title: MySQL
slug: >-
  ynzowezexiygx0kbdlyco9pgnxe-dfifwii6ri7cnjkbttrcqd8xnch-a1xyw4touiczudkdexdc4sqqnfh-svdqwahzeijzvsktok7c9jdwnjg-cr9zwfopkizf3dkcb3jc7r6jnde-cr9zwf
sidebar_position: 1
---


# MySQL

Author：NA

## 什么是MySQL

<div class="callout callout-bg-2 callout-border-2">
<div class='callout-emoji'>💡</div>
<p>MySQL是最流行的开源SQL数据库管理系统，由甲骨文公司开发、发布和支持。</p>
</div>

MySQL的基本信息：

- MySQL是一个数据库管理系统。 
    - 一个数据库是一个结构化的数据集合。它可以是任何东西，从简单的购物清单到图片库或公司网络中的大量信息。为了添加、访问和处理存储在计算机数据库中的数据，你需要一个数据库管理系统，如MySQL服务器。由于计算机非常善于处理大量的数据，数据库管理系统在计算中发挥着核心作用，作为独立的实用工具，或作为其他应用程序的一部分。

- 关系型 
    - 关系型数据库将数据存储在不同的表中，而不是将所有的数据放在一个大的储藏室里。

- 开源
- 快速、可靠、可拓展和易于使用
- MySQL server可以在客户端/服务器或嵌入式系统中工作

## MySQL安装

官方文档（其实挺友好的，但是内容太多显得有点吓人，建议翻译网页）： 

[MySQL :: MySQL 5.7 Reference Manual :: 2 Installing and Upgrading MySQL](https://dev.mysql.com/doc/refman/5.7/en/installing.html)

实在不行请自行Google第三方教程。

1. 检查安装是否成功
    ```bash
systemctl status mysql
```
    <img src="/assets/Dtq6b9LYLonJ5yxF56CcYT06nBg.png" src-width="1202" src-height="366" align="center"/>

2. 初始化登录密码

```bash
mysql -u root.         # sign in mysql shell
USE mysql
ALTER USER  'root'@'localhost' IDENTIFIED BY 'the-new-password';
```

<img src="/assets/JyF9b5J53oKysSxM04tc9FFungT.png" src-width="1193" src-height="631" align="center"/>

将`”the-new-passwd”` 替换成你想要的密码。

## Tutorial

### 连接/断开 Server

```bash
mysql -u user -p
```

user代表你的MySQL账户的用户名

> 如果你不是系统root用户，连接mysql的root用户时可能会报错 `ERROR 1698 (28000): Access denied for user 'root'@'localhost’` 解决方案： 
> [ERROR 1698 (28000): Access denied for user 'root'@'localhost'](https://stackoverflow.com/questions/39281594/error-1698-28000-access-denied-for-user-rootlocalhost)

连接成功后，The `mysql>` prompt tells you that <b>mysql</b> is ready for you to enter SQL statements.

`Ctrl + D` 断开连接

### Entering Queries

这里有一个简单的查询，要求服务器告诉你其版本号和当前日期。在`mysql>`提示符后输入。

```sql
SELECT VERSION(), CURRENT_DATE;
```

<img src="/assets/DeF2bvKiZo9HguxVyQMcNvJ1nxg.png" src-width="1171" src-height="392" align="center"/>

这个查询说明了关于<b>mysql</b>的几件事。

- 一个查询通常由一个SQL语句和一个分号组成。
- 当你发出一个查询时，<b>mysql</b>将其发送到服务器执行，并显示结果，然后打印另一个`mysql>`提示，表明它已准备好进行另一个查询。
- <b>mysql</b>以表格的形式显示查询输出（行和列）。第一行包含各列的标签。后面的行是查询结果。通常情况下，列标签是你从数据库表中获取的列的名称。
- <b>mysql</b>显示了返回的行数和查询的执行时间，这让你对服务器的性能有一个大致的了解。这些值是不精确的，因为它们代表挂钟时间（而不是CPU或机器时间），而且它们受到服务器负载和网络延迟等因素的影响。

MySQL关键词可以用任何字母大写输入。下面的查询是等效的。

```sql
SELECT VERSION(), CURRENT_DATE;
Select version(), current_date;
SeLeCt vErSiOn(), current_DATE;
```

你可以在一行中输入多个语句。只要用分号来结束每一条。

一个查询不需要在一行中全部给出，<b>mysql</b>通过寻找结束的分号来确定语句的结束。

下表显示了你可能看到的每个提示，并总结了它们对<b>mysql</b>所处状态的含义。

<img src="/assets/MeRFb1hfsopI7RxFeOicKg7Enge.png" src-width="966" src-height="480" align="center"/>

知道提示的含义是很重要的，因为如果你错误地输入了一个未结束的字符串，你输入的任何其他行都会被<b>mysql</b><b>忽略，包括</b>包含`QUIT`的行。这可能相当令人困惑。

### 创建和使用数据库

使用`SHOW`语句找出服务器上当前存在哪些数据库。

```sql
SHOW DATABASES;
```

<img src="/assets/FlimbFDb8otHoaxIa9dcIhrYnff.png" src-width="1155" src-height="992" align="center"/>

`mysql`数据库描述了用户的访问权限。

#### 创建和选择数据库

```sql
CREATE DATABASE menagerie;
```

在Unix下，数据库名称是区分大小写的（与SQL关键字不同），所以你必须总是把你的数据库称 `menagerie`，而不是`Menagerie`、`MENAGERIE`或其他变体。这对表名来说也是如此。

你的数据库只需要创建一次，但你必须在每次开始<b>mysql</b>会话时选择它来使用,使用`USE`

```sql
USE menagerie;
```

> 你可以在任何时候使用`SELECT DATABASE()`查看当前选择的数据库

#### 创建表

使用`CREATE TABLE`来指定表的布局。

```sql
CREATE TABLE pet (name VARCHAR(20), owner VARCHAR(20),
species VARCHAR(20), sex CHAR(1), birth DATE, death DATE);
```

创建后使用`SHOW TABLES`查看，使用`DESCRIBE`语句验证您的表是否按照您预期的方式创建

```sql
mysql> DESCRIBE pet;
+---------+-------------+------+-----+---------+-------+
| Field   | Type        | Null | Key | Default | Extra |
+---------+-------------+------+-----+---------+-------+
| name    | varchar(20) | YES  |     | NULL    |       |
| owner   | varchar(20) | YES  |     | NULL    |       |
| species | varchar(20) | YES  |     | NULL    |       |
| sex     | char(1)     | YES  |     | NULL    |       |
| birth   | date        | YES  |     | NULL    |       |
| death   | date        | YES  |     | NULL    |       |
+---------+-------------+------+-----+---------+-------+
```

#### 将数据加载到表中

<b>批量添加：</b>

根据以上方法，你创建了一个带有name、owner、……、death这些列的表格pet

假设你想把你的记录填充进去，就像这样：

<img src="/assets/TVZCbnK9DoJ40VxttlacsN4tnwc.png" src-width="1081" src-height="473" align="center"/>

一种简单的方法是创建一个文本文件（每行对应一只动物的信息），每一行的各个值由tab分离，各个值的顺序符合数据表的列的顺序。对于缺失值，您可以使用 `NULL`值。要在您的文本文件中表示这些，请使用 `\\N`（反斜杠，大写 N）。例如，Whistler the bird 的记录如下所示：

```
Whistler        Gwen    bird    \\N      1997-12-09      \\N
```

要将文本文件 `pet.txt` 加载到 `pet` 表中，请使用以下语句：

```sql
mysql> LOAD DATA LOCAL INFILE '/path/pet.txt' INTO TABLE pet;
```

如果您在 Windows 上使用使用 `\\r\\n` 作为行终止符的编辑器创建文件，则应改用此语句：

```sql
mysql> LOAD DATA LOCAL INFILE '/path/pet.txt' INTO TABLE pet
       LINES TERMINATED BY '\\r\\n';
```

<b>单个添加：</b>

```sql
mysql> INSERT INTO pet
       VALUES ('Puffball','Diane','hamster','f','1999-03-30',NULL);
```

字符串和日期值在此处指定为带引号的字符串。此外，对于 `INSERT`，您可以直接插入 `NULL`来表示缺失值。您不像使用 `LOAD DATA`那样使用 `\\N`。

#### 从表中检索信息

- 选择所有数据：`mysql> SELECT * FROM pet;`
    - `*`是“选择所有列”的简写形式

- 选择特定行：使用`WHERE` 指定条件 
    - 例：`mysql> SELECT * FROM pet WHERE species = 'dog' AND sex = 'f';`

- 选择特定列：just name the columns in which you are interested, separated by commas. 
    - `mysql> SELECT name, birth FROM pet;`
    - 如果一些记录不止一次出现。为了最小化输出，添加关键字 `DISTINCT` 使输出无重复。

- 对行进行排序：要对结果进行排序，请使用 `ORDER BY`子句。 
    - 例：`mysql> SELECT name, birth FROM pet ORDER BY birth;`
    - 默认排序顺序为升序，要按倒序排序，添加`DESC`关键字

## 通信方式

运行着的MySQL客户端/服务端程序本质上都是计算机的进程，所以客户端进程向服务器进程发送请求并得到回复的过程本质上是一个进程间通信的过程。

MySQL支持以下三种客户端进程和服务器进程的通信方式。

### TCP/IP

真实环境中，数据库服务器进程和客户端进程可能运行在不同的主机中，它们之间必须通过网络来进行通讯。`MySQL`采用`TCP`作为服务器和客户端之间的网络通信协议。在网络环境下，每台计算机都有一个唯一的`IP地址`，如果某个进程有需要采用`TCP`协议进行网络通信方面的需求，可以向操作系统申请一个`端口号`，这是一个整数值，它的取值范围是`0~65535`。这样在网络中的其他进程就可以通过`IP地址 + 端口号`的方式来与这个进程连接，这样进程之间就可以通过网络进行通信了。

`MySQL`服务器启动的时候会默认申请`3306`端口号，之后就在这个端口号上等待客户端进程进行连接，用书面一点的话来说，`MySQL`服务器会默认监听`3306`端口。  如果`3306`端口号已经被别的进程占用了或者我们单纯的想自定义该数据库实例监听的端口号，那可以在启动服务器程序的命令行里添加`-P`参数来明确指定一下端口号:

```bash
mysqld -P3307
```

这样 MySQL 服务器在启动时就会去监听我们指定的端口号 3307 。

如果客户端进程想要使用`TCP/IP`网络来连接到服务器进程，比如我们在使用`mysql`来启动客户端程序时，在`-h`参数后必须跟随`IP地址`来作为需要连接的服务器进程所在主机的主机名，如果客户端进程和服务器进程在一台计算机中的话，我们可以使用`127.0.0.1`来代表本机的`IP地址`。另外，如果服务器进程监听的端口号不是默认的`3306`，我们也可以在使用`mysql`启动客户端程序时使用`-P`参数（大写的`P`，小写的`p`是用来指定密码的）来指定需要连接到的端口号。比如我们现在已经在本机启动了服务器进程，监听的端口号为`3307`，那我们启动客户端程序时可以这样写：

```
mysql -h 127.0.0.1 -u root -P 3307 -p
```

### 命名管道和共享内存

如果你是一个`Windows`用户，那么客户端进程和服务器进程之间可以考虑使用`命名管道`或`共享内存`进行通信。

使用`共享内存`的方式进行通信的服务器进程和客户端进程必须在同一台`Windows`主机中。

### Unix域套接字文件

如果我们的服务器进程和客户端进程都运行在同一台操作系统为类`Unix`的机器上的话，我们可以使用`Unix域套接字文件`来进行进程间通信。

## 服务端处理客户端请求

其实不论客户端进程和服务器进程是采用哪种方式进行通信，最后实现的效果都是：客户端进程向服务器进程发送一段文本（MySQL语句），服务器进程处理后再向客户端进程发送一段文本（处理结果）。那服务器进程对客户端进程发送的请求做了什么处理，才能产生最后的处理结果呢？客户端可以向服务器发送增删改查各类请求，我们这里以比较复杂的查询请求为例来画个图展示一下大致的过程：

<img src="/assets/CdIUbF4K3ooabIxn5gBcsVtFnHd.png" src-width="738" src-height="487" align="center"/>

从图中我们可以看出，服务器程序处理来自客户端的查询请求大致需要经过三个部分，分别是`连接管理`、`解析与优化`、`存储引擎`。下面我们来详细看一下这三个部分都干了什么。

### 连接管理

每当有一个客户端进程连接到服务器进程时，服务器进程都会创建一个线程来专门处理与这个客户端的交互，当该客户端退出时会与服务器断开连接，服务器并不会立即把与该客户端交互的线程销毁掉，而是把它缓存起来，在另一个新的客户端再进行连接时，把这个缓存的线程分配给该新客户端。这样就起到了不频繁创建和销毁线程的效果，从而节省开销。从这一点也能看出，`MySQL`服务器会为每一个连接进来的客户端分配一个线程，但是线程分配的太多了会严重影响系统性能，所以我们也需要限制一下可以同时连接到服务器的客户端数量。

  在客户端程序发起连接的时候，需要携带主机信息、用户名、密码，服务器程序会对客户端程序提供的这些信息进行认证，如果认证失败，服务器程序会拒绝连接。

  当连接建立后，与该客户端关联的服务器线程会一直等待客户端发送过来的请求，`MySQL`服务器接收到的请求只是一个文本消息，该文本消息还要经过各种处理。

### 解析与优化

#### 查询缓存

`MySQL`服务器程序会把刚刚处理过的查询请求和结果`缓存`起来，如果下一次有一模一样的请求，直接从缓存中查找结果，就不用再去底层的表中查找了。这个查询缓存可以在不同客户端之间共享，也就是说如果客户端A刚刚查询了一个语句，而客户端B之后发送了同样的查询请求，那么客户端B的这次查询就可以直接使用查询缓存中的数据。

如果两个查询请求在任何字符上的不同（例如：空格、注释、大小写），都会导致缓存不会命中。另外，如果查询请求中包含某些系统函数、用户自定义变量和函数、一些系统表，如 mysql 、information_schema、 performance_schema 数据库中的表，那这个请求就不会被缓存。以某些系统函数举例，可能同样的函数的两次调用会产生不一样的结果，因此不能缓存相关的请求。

既然是缓存，那就有缓存失效的时候。MySQL的缓存系统会监测涉及到的每张表，只要该表的结构或者数据被修改，如对该表使用了`INSERT`、 `UPDATE`、`DELETE`、`TRUNCATE TABLE`、`ALTER TABLE`、`DROP TABLE`或 `DROP DATABASE`语句，那使用该表的所有高速缓存查询都将变为无效并从高速缓存中删除。

> Note： 虽然查询缓存有时可以提升系统性能，但也不得不因维护这块缓存而造成一些开销，比如每次都要去查询缓存中检索，查询请求处理完需要更新查询缓存，维护该查询缓存对应的内存区域。从MySQL 5.7.20开始，不推荐使用查询缓存，并在MySQL 8.0中删除。

#### 语法解析

如果查询缓存没有命中，接下来就需要进入正式的查询阶段了。因为客户端程序发送过来的请求只是一段文本而已，所以`MySQL`服务器程序首先要对这段文本做分析，判断请求的语法是否正确，提取需要的信息。

#### 查询优化

  语法解析之后，服务器程序获得到了需要的信息，比如要查询的列是哪些，表是哪个，搜索条件是什么等等，但光有这些是不够的，因为我们写的`MySQL`语句执行起来效率可能并不是很高，`MySQL`的优化程序会对我们的语句做一些优化，如外连接转换为内连接、表达式简化、子查询转为连接等等的一堆东西。优化的结果就是生成一个执行计划，这个执行计划表明了应该使用哪些索引进行查询，表之间的连接顺序是什么样的。我们可以使用`EXPLAIN`语句来查看某个语句的执行计划。

### 存储引擎

截止到服务器程序完成了查询优化为止，还没有真正的去访问真实的数据表，`MySQL`服务器把数据的存储和提取操作都封装到了一个叫`存储引擎`的模块里。我们知道`表`是由一行一行的记录组成的，但这只是一个逻辑上的概念，物理上如何表示记录，怎么从表中读取数据，怎么把数据写入具体的物理存储器上，这都是`存储引擎`负责的事情。为了实现不同的功能，`MySQL`提供了各式各样的`存储引擎`，不同`存储引擎`管理的表具体的存储结构可能不同，采用的存取算法也可能不同。

> 它的功能就是接收上层传下来的指令，然后对表中的数据进行提取或写入操作。

  为了管理方便，人们把`连接管理`、`查询缓存`、`语法解析`、`查询优化`这些并不涉及真实数据存储的功能划分为`MySQL server`的功能，把真实存取数据的功能划分为`存储引擎`的功能。各种不同的存储引擎向上面的`MySQL server`层提供统一的调用接口（也就是存储引擎API），包含了几十个底层函数，像"读取索引第一条内容"、"读取索引下一条内容"、"插入记录"等等。

  所以在`MySQL server`完成了查询优化后，只需按照生成的执行计划调用底层存储引擎提供的API，获取到数据后返回给客户端就好了。

