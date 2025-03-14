---
title: Hadoop
slug: Hadoop
sidebar_position: 0
---


# Hadoop

Author：蔡钦楠

### 一、Hadoop简介

hadoop是可靠、可扩展、分布式，计算开发开源框架。

应用：海量数据存储、海量数据分析计算。

Hadoop项目结构示意图：

![](/assets/E8BpbTagBoWSxwxKXyBc6tPyn7q.jpeg)

本文的重点在

- Hadoop的安装与使用；
- HDFS:分布式文件系统；
- Hbase：Hadoop上的非关系型的分布式数据库；
- MapReduce：分布式并行编程模型；

### 二、Hadoop的安装与使用

（需要一些linux系统的基础知识且已有Linux系统安装（虚拟机））

基本步骤：

创建Hadoop用户；

```shell
sudo useradd -m Hadoop -s/bin/bash #创建新用户
sudo passwd Hadoop #设置密码
sudo adduser Hadoop sudo #为Hadoop用户添加管理员权限
```

SSH登录权限设置；

原因：Hadoop的Namenode需要启动集群中所有机器的Hadoop守护进程，这个过程需要通过SSH登录来实现。Hadoop并没有提供SSH输入密码的登录形式，因此需要将所有机器配置为Namenode可以无密码登录。

```shell
sudo apt-get install openssh-server
ssh localhost
exit                           # 退出刚才的 ssh localhost
cd ~/.ssh/                     # 若没有该目录，请先执行一次ssh localhost
ssh-keygen -t rsa              # 会有提示，都按回车就可以
cat ./id_rsa.pub >> ./authorized_keys  # 加入授权
```

安装Java环境；

分布式or伪分布式安装配置；

可参考<u>http://dblab.xmu.edu.cn/post/7586/</u>

### 三、HDFS(Hadoop Distributed File System)

<b>分布式存储</b>

实现目标：

1.兼容廉价的硬件设备；2.流数据读写；3.支持大数据集；4.支持简单的文件模型；5.强大的平台兼容性

局限性：1.不适合低延迟的数据访问，实时性不高；Hbase可以满足实时读写需求
2.无法高效储存大量的小文件；3.不支持多用户写入及任意修改文件，只能追加不能任意修改；

#### 几个概念：

<b>块</b>，默认一个块的大小为64MB.在HDFS中的文件会被拆分为多个块，每个块作为独立的单元进行存储。块的大小比普通文件系统大得多是为了降低分布式节点的寻址开销，支持面向大规模数据的存储；

与普通文件系统的相同点是都是为了分摊磁盘的读写开销即在大量数据间分摊磁盘寻址的开销；

<b>采用块的好处</b>：支持大规模的文件存储；简化系统设计；适合数据备份；

HDFS两大组件：

<b>数据节点：</b>存储实际数据；存储到硬盘，在数据节点的本地linux文件系统；存储blockid到datanode本地文件的映射关系

<b>名称节点</b>：整个HDFS集群的管家；数据目录（记录哪个块存储在哪个机器上）；存储元数据；元数据保存在内存中；保存文件，block与datanode之间的映射关系

<b>元数据：文件是什么；文件被分成多少块；每个块和文件是怎么映射的；每个块被存储在哪个服务器；</b>

FSImage：保存系统文件树；

Editlog：记录对数据进行的操作；

<b>第二名称节点</b>：1.对名称节点的冷备份；2.对Editlog的处理；

![](/assets/X5CbbhNG1o3uqrxcyaecsvQ0nwc.jpeg)

![](/assets/I3QVbUusFoTpqlxlZKjcHKXOnpc.jpeg)

#### HDFS的存储原理

<b>冗余数据保存的问题</b>：一个数据块被默认保存3份，以应对底层硬件出故障。

好处：加速数据传输速度；很容易检查数据错误；保证数据可靠性

<b>数据保存策略的问题：</b>

<b>数据存放：</b>

(1)如果是在集群内发起写操作请求，则把第一个副本放置在发起写操作请求的数据节点上，实现就近写入数据。如果是来自集群外部的写操作请求，则从集群内部挑选一台磁盘不太满、CPU不太忙的数据节点，作为第一个副本的存放地。

(2)第二个副本会被放置在与第一个副本不同的机架的数据节点上。

(3)第三个副本会被放置在与第一个副本相同的机架的其他节点上。

(4)如果还有更多的副本，则继续从集群中随机选择数据节点进行存放。

<b>数据读取：</b>

HDFS提供了一个API可以确定一个数据节点所属的机架ID，客户端也可以调用API获取自己所属的机架ID。当发现某个数据块副本对应的机架ID和客户端对应的机架ID相同时，就优先选择该副本读取数据，如果没有发现，就随机选择一个副本读取数据。

<b>数据错误与恢复的问题：</b>

名称节点出错：通过第二名称节点备份恢复；

数据节点出错：心跳机制，定期向名称节点发送信息；当发生故障时，名称节点会把该数据节点的数据交给其他数据节点存放。

数据错误：校验码校验

#### 数据读写过程

![](/assets/S9cEbfT9yo99rZxAGyXcxVoon3g.jpeg)

### 四、Hbase

建立在HDFS之上，被设计用来提供高可靠性、高性能、列存储、可伸缩、多版本的 NoSQL的分布式数据存储系统，实现对大型数据的实时、随机的读写访问。

<b>Hbase特点：</b>

① 高并发，以扩展，解决海量数据集的<b>随机实时增删改查</b>

② HBase 本质依然是 Key-Value 数据库，查询数据功能很简单，不支持 join 等复杂操作(可通过 Hive 支持来实现多表 join 等复杂操作)

③ 不支持复杂的事务，只支持行级事务

④ HBase 中支持的数据类型：byte[]（底层所有数据的存储都是字节数组）

⑤ 主要用来<b>存储结构化和半结构化的松散数据</b>

<b>Hbase中表的特点：</b>

1、大：一个表可以有上十亿行，上百万列

2、面向列：<b>列可以灵活指定，面向列(族)的存储和权限控制，列(簇)独立检索。</b>

3、稀疏：对于为空(null)的列，并不占用存储空间，因此，表可以设计的非常稀疏。

4、无严格模式：每行都有一个可排序的主键和任意多的列，<b>列可以根据需要动态的增加，同一张表中不同的行可以有截然不同的列</b>

#### 数据模型

Hbase是一个稀疏、多维度、排序的映射表，这张表的索引<b>是行键、列族、列限定符和时间戳</b>。每个值是一个未经解释的字符串，没有数据类型。

用户在表中存储数据，每一行都有一个可排序的行键和任意多的列。表在水平方向由—个或者多个列族组成，—个列族中可以包含任意多个列，同一个列族里面的数据存储在一起。列族支持动态扩展，可以很轻松地添加一个列族或列，无需预先定义列的数量以及类型，所有列均以字符串形式存储，用户需要自行进行数据类型转换。

由于同一张表里面的每一行数据都可以有截然不同的列，因此对于整个映射表的每行数据而言，有些列的值就是空的，所以说HBase 是稀疏的。

![](/assets/Pw8Zb58J6oZQoAxV70XchTiYnPc.jpeg)

<b>数据坐标</b>

对于我们熟悉的关系型数据库而言，是以“二维坐标”，即行和列来确定表中一个具体的值。但是Hbase中需要根据<b>行键、列族、列限定符和时间戳</b>来确定一个单元格，因此可以视为一个四维坐标。

<b>面向列的存储</b>

使用的是DSM存储模型，目的是最小化无用的I/O；DSM会对关系进行垂直分解，并为每个属性分配一个子关系。每个子关系会被单独存储。

#### 实现原理

<b>功能组件：</b>

- 库函数，连接到每个客户端；
- 一个Master主服务器；负责管理和维护Hbase表的分区信息，比如一个表被分成了哪些Region，每个Region存放在哪台服务器，同时也负责维护Region服务器列表；
- 许多个Region服务器；负责存储和维护分配给自己的Region，处理来自客户端的读写请求；

一个表刚开始被创建时，只有一个Region，随着表中内容不断地扩充，到达Region容量的上限时，就会开始分裂成多个Region。

对于Region的寻址问题，是采用一种三层架构：

![](/assets/F9BKbg0idorM0RxnRW9cIo5jnle.jpeg)

### 五、MapReduce

分布式并行编程框架，适用于非实时的批处理以及数据密集型的应用。

#### 策略

![](/assets/BMBkbrNLIoNuG1xCNeqcMrcBnHh.jpeg)

#### <b>理念：计算向数据靠拢</b>

     在做应用程序计算的时候，构建一个集群，在集群中选择相关的机器作为map机器，这些map机器负责相关的数据处理分析，还有一些是Reduce机器，做Reduce任务处理。

        拿这些机器去做数据处理，假如说要去处理某一很大的数据集（数据集被分布的存储到各个节点上面（HDFS是以块为单位存储数据），这些数据块都是存储到不同的机器节点上面去），假设某一个数据块存储在机器A上面，对于MapReduce来说<b>，如果想对数据块A进行分析的话，但是它又不存在机器A上面，这时，MapReduce会去寻找离机器A最近的map机器去完成对数据块的处理。通常来讲比较理想情况下，map任务就是和数据块在同一个机器上面，这就是实现了计算向数据靠拢数据不需要发生迁移，计算就可以在数据节点上面执行，完成运算得到结果，最终把结果汇总到相关的任务协调节点，提交给用户。</b>

       通过这种方式：<b>大大减少了整个网络当中的数据传输开销</b>，从而提升了整个分布式程序处理性能。

#### 架构：采用了master/slave的架构

Master/slave架构中包括：一个master服务器以及若干个slave服务器（Master就是名称节点，Slave就是数据节点）。Master上面会运行作业跟踪器（JobTracker），JobTracker负责整个作业的调度和处理以及失败和恢复，slave上面会运行负责具体任务执行的组件（TaskTracker），TaskTracker负责接收JobTracker给它发的作业处理指令，完成具体的任务处理

![](/assets/VR6rbu1Aho9CbQxnj31cvTgcnDg.png)

- client：向JobTracker提交用户编写的应用程序；用户通过JobTracker的接口查看当前作业的运行状态；
- JobTracker：负责资源的监控和作业的调度；监控底层的其他的TaskTracker以及当前运行的Job的健康状况；一旦探测到失败的情况就把这个任务转移到其他节点继续执行跟踪任务执行进度和资源使用量，并会把这些信息发送给任务调度器Task Schedule
- Task Schedule：负责任务调度（解决应该把哪个Task分发给哪个TaskTracker去执行）；会从具有空闲资源的节点中选出相关节点，然后把Task分配到这些节点上去执行；Task Schedule是一个可插拔模块，允许用户自己去编写调度模块，采用自己的任务调度策略去实现；
- TaskTracker:会周期性地通过“Heartbeat”将本节点上资源的使用情况和任务的运行进度汇报给JobTracker，同时接收JobTracker 发送过来的命令并执行相应的操作（如启动新任务、杀死任务等）

#### 工作流程

![](/assets/A3zkbbVNuocGn6xWidxcOE8Enpd.jpeg)

1. MapReduce一般与HDFS搭配使用；因此，它先从HDFS中读取需要处理的文件；
2. 利用InputFormat模块进行Map任务之前的预处理；首先会验证输入格式是否符合输入定义；然后将文件切分为逻辑上的多个InputSplit；

![](/assets/Wb9ibpcb7oV4Blx8yhtcOAxenYg.png)

split具体流程.png

1. RecordReader(RR)根据InputSplit中的信息来处理InputSplit中的具体记录，加载数据并转换为适合Map任务读取的键值对；
2. Map任务会根据用户自定义的映射规则，输出一系列的&lt;key,value&gt;作为中间结果；
3. Shuffle过程

![](/assets/FzBQb6Zdto179xxX8xcc6SP2ncf.png)

### 六、Hive

首先来看一下数据仓库的概念：

数据仓库是一个面向主题的、集成的、相对稳定的、反应历史变化的数据集合，用于支持管理决策

![](/assets/E7ZXbCtRJochBkxXXj6cuMfUnMb.png)

 

•Hive是一个构建于Hadoop顶层的数据仓库工具

•支持大规模数据存储、分析，具有良好的可扩展性

•某种程度上可以看作是用户编程接口，本身不存储和处理数据

•依赖分布式文件系统HDFS存储数据

•依赖分布式并行计算模型MapReduce处理数据

•定义了简单的类似SQL 的查询语言——HiveQL

•用户可以通过编写的HiveQL语句运行MapReduce任务

•可以很容易把原来构建在关系数据库上的数据仓库应用程序移植到Hadoop平台上

•是一个可以提供有效、合理、直观组织和使用数据的分析工具

•<b>采用批处理方式处理海量数据</b>

•Hive需要把HiveQL语句转换成MapReduce任务进行运行

•数据仓库存储的是静态数据，对静态数据的分析适合采用批处理方式，不需要快速响应给出结果，而且数据本身也不会频繁变化

•<b>提供适合数据仓库操作的工具</b>

•Hive本身提供了一系列对数据进行提取、转换、加载（ETL）的工具，可以存储、查询和分析存储在Hadoop中的大规模数据

•这些工具能够很好地满足数据仓库各种应用场景

![](/assets/NHvNbq2ZHolfVpxRQXCcU4g4n4f.png)

•<b>Hive依赖于HDFS 存储数据</b>

•<b>Hive依赖于MapReduce 处理数据</b>

•<b>在某些场景下Pig可以作为Hive的替代工具</b>

•<b>HBase 提供数据的实时访问</b>

![](/assets/UlDSbKgsCox5SgxV6h5csPg5nlh.png)

### 七、Spark

相较于Hadoop的优势：

•Spark的计算模式也属于MapReduce，但不局限于Map和Reduce操作，还提供了多种数据集操作类型，编程模型比Hadoop MapReduce更灵活

•Spark提供了内存计算，可将中间结果放到内存中，对于迭代运算效率更高

Spark基于DAG的任务调度执行机制，要优于Hadoop MapReduce的迭代执行机制 

Spark生态系统：

![](/assets/EN4mb8sFYoXPiUxK7LOcXycen6e.png)

•Spark的设计遵循“一个软件栈满足不同应用场景”的理念，逐渐形成了一套完整的生态系统

•既能够提供内存计算框架，也可以支持SQL即席查询、实时流式计算、机器学习和图计算等

•Spark可以部署在资源管理器YARN之上，提供一站式的大数据解决方案

•因此，Spark所提供的生态系统足以应对上述三种场景，即同时支持批处理、交互式查询和流数据处理

![](/assets/WJhGbCj4LooHWOxHL5McDy1Znwd.png)

 基本概念：

•RDD：是Resillient Distributed Dataset（弹性分布式数据集）的简称，是分布式内存的一个抽象概念，<b>提供了一种高度受限的共享内存模型</b>

•DAG：是Directed Acyclic Graph（有向无环图）的简称，反映RDD之间的依赖关系

•Executor：是运行在工作节点（WorkerNode）的一个进程，负责运行Task

•Application：用户编写的Spark应用程序

•Task：运行在Executor上的工作单元 

•Job：一个Job包含多个RDD及作用于相应RDD上的各种操作

•Stage：是Job的基本调度单位，一个Job会分为多组Task，每组Task被称为Stage，或者也被称为TaskSet，代表了一组关联的、相互之间没有Shuffle依赖关系的任务组成的任务集

<b>spark架构：</b>

![](/assets/PIAwbaDmFotBRLxBQxZc2NS9n8c.png)

与Hadoop中的Mapreduce计算框架相比，Spark所采用的Executor有两个优点：

1.利用<b>多线程来执行具体的任务</b>，减少任务的启动开销；

2.Executor中有一个BlockManager存储模块，会将<b>内存和磁盘共同作为存储设备</b>，有效减少IO开销

Spark运行的基本流程：

![](/assets/XaJgbLEoRoX2WvxnPH2cKM71nXf.png)

 

（1）首先为应用构建起基本的运行环境，即由Driver创建一个SparkContext，进行资源的申请、任务的分配和监控

（2）资源管理器为Executor分配资源，并启动Executor进程

（3）SparkContext根据RDD的依赖关系构建DAG图，DAG图提交给DAGScheduler解析成Stage，然后把一个个TaskSet提交给底层调度器TaskScheduler处理；Executor向SparkContext申请Task，Task Scheduler将Task发放给Executor运行，并提供应用程序代码

（4）Task在Executor上运行，把执行结果反馈给TaskScheduler，然后反馈给DAGScheduler，运行完毕后写入数据并释放所有资源 

