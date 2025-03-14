---
title: RabbitMQ
slug: RabbitMQ
sidebar_position: 0
---


# RabbitMQ

Author：NA

> 参考链接：
> https://blog.csdn.net/JokerLJG/article/details/123007557
> https://blog.csdn.net/wfx15502104112/article/details/104172127
> https://blog.csdn.net/weixin_58670730/article/details/123138724

# AMQP架构

## 概述

### 总体架构

![](/assets/KGJHbclcPopl1Dx7NRDcUPYvnof.png)

### 关键词解释

- <b>Broker</b>：一个消息队列服务提供方
- <b>vhost</b>：一个<b>Broker</b>中互不干扰的多个消息队列实例
- <b>Connection</b>：使用者发起连接，可以复用
    - `amqp://userName:password@ipAddress:portNumber/virtualHost`

- <b>Channel</b>：专用，可以在连接中无限创建；大部分实际功能都在<b>Channel</b>中
- <b>Exchange</b>：根据规则分发消息进入<b>Queue</b>
    - <b>Name</b>：交换机名称
    - <b>Type：</b>交换机类型
        - "" ：空字符串是一个默认的Direct模式<b>Exchange</b>
        - Direct：向绑定的 Name == <b>RoutingKey</b> 的队列发送
        - Fanout：向绑定的队列全体广播
        - Topic：向绑定的 Name 模式匹配 <b>RoutingKey</b> 的队列发送
            - <b>routingKey</b> 可以是 <em>*.logger.#</em> 这种表达式
                - `*` 代表一个词
                - `#` 代表0或多个词
        - Header：不常用，根据<b>Message Header</b>进行任意或全部键值对匹配
    - <b>Durability</b>：持久化标志，表明此交换机是否是持久化的
    - <b>Auto-delete</b>：删除标志，表明当所有队列在完成使用此<b>exchange</b>时，是否删除
    - <b>Arguments</b>：其它参数

- <b>Queue</b>：保存消息的队列结构，需要与<b>Exchange绑定（Bind）</b>
    - <b>Name</b>：队列名称
    - <b>Durable</b>：消息代理重启后，队列依旧存在
    - <b>Exclusive</b>：只被一个<b>连接（connection）</b>使用，而且当连接关闭后队列即被删除
    - <b>Auto-delete</b>：当最后一个消费者退订后即被删除
    - <b>Arguments</b>：其它参数

- <b>Message</b>：一条消息
    - <b>ExchangeName</b>：指定发送到的Exchange
    - <b>Header</b>：一个Map，存储元数据（用于Header Exchange）
    - <b>RoutingKey</b>：指定消息的Tag
    - <b>ContentType</b>：数据类型标记
    - <b>Data</b>：二进制数据

# 使用流程

【Golang例程】

# 配置

[RabbitMQ教程(一)——安装配置 - letcafe - 博客园](https://www.cnblogs.com/letcafe/p/rabbitmq1.html)

https://blog.csdn.net/csucsgoat/article/details/124363937

# 思考题

- 什么情况下需要使用消息队列？

