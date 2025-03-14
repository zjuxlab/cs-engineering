---
title: CAP_BASE
slug: CAP_BASE
sidebar_position: 1
---


# CAP_BASE

Author：蔡龙祥

<div class="callout callout-bg-2 callout-border-2">
<div class='callout-emoji'>🥛</div>
<h1>CAP=consistency+availability+partition-tolerence</h1>
<h2>consistency=分布式服务的不同节点存储的数据在一定程度上保持同步</h2>
<h2>Availability=服务能够对用户的请求做出合适及时的响应</h2>
<h2>partion-tolerance=部分节点的故障不会致使整个服务终止</h2>
</div>

当设计分布式网络应用(需要相互连接并且共享数据)时,通常需要考虑三个方面:一致性(C),可用性(A以及分区容错性(P)

对CAP理论的简单概述就是这三个方面不能同时兼得,又由于网络应用必须满足分区容错性,cap理论在现实中的应用往往是在可用性与一致性方面做取舍

# CAP的基本模型

分析实现cap的三种属性的底层思想

## Consistency

区别于ACID中的C

实现数据一致性最自然的思想是构建原子性的数据结构,保证在不同节点上的所有操作存在全序使这一系列操作的实施看起来就像是在单一节点上操作的一样,读的操作返回的是最新的写的操作的结果,请求和响应都具有原子性,要么成功返回最新的数据,要么返回失败

强一致性:在事务(一系列原子操作)执行的过程中,各个节点的状态始终保持一致,

![](/assets/Z1enbKR8uoe0LwxpQgQcasVFnlf.png)

弱一致性:在事务(一系列原子操作)执行完毕时,各个节点的状态保持一致

## Availability

强定义:对所有节点发起的请求都会返回成功响应

弱定义:对正常运行的节点发起的请求都会返回成功响应

这意味着读请求有可能读到过时的数据,不能保证原子性,这也需要运行在每个节点上的内部程序都设置终止条件,使程序返回响应的时间在合理范围内

## Partion-tolerance

基于网络是不可靠的现实情况,网络分区,传输信息丢失现象很普遍,一个服务内部节点处在不同的网络分区,服务通信就会被隔断,分区容错需要实现当分区发生,服务不会终止,依然能够对外提供满足一致性或者可用性的服务,当分区结束,服务的状态能够恢复

<div class="callout callout-bg-2 callout-border-2">
<div class='callout-emoji'>📚</div>
<h1>BASE</h1>
</div>

## Reference

1. cap

