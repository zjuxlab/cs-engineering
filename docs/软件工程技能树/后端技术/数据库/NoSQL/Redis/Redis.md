---
title: Redis
slug: Redis
sidebar_position: 1
---


# Redis

Author：PTA,夏彦

# 基本介绍

<b>RE</b>mote <b>DI</b>ctionary <b>S</b>erver(Redis) 是一个由 Salvatore Sanfilippo 写的 key-value 存储系统，是跨平台的非关系型数据库。

Redis 是一个开源的使用 ANSI C 语言编写、遵守 BSD 协议、支持网络、可基于内存、分布式、可选持久性的键值对(Key-Value)存储数据库，并提供多种语言的 API。

Redis 通常被称为数据结构服务器，因为值（value）可以是字符串(String)、哈希(Hash)、列表(list)、集合(sets)和有序集合(sorted sets)等类型。

mentor 

# Brief Intro

> Redis is an open source, in-memory data structure store used as a database, cache, message broker, and streaming engine.
> Redis is written in ANSI C and works on most POSIX systems like Linux, <em>BSD, and Mac OS X, without external dependencies. Linux and OS X are the two operating systems where Redis is developed and tested the most, and we *</em>recommend using Linux for deployment**. Redis may work in Solaris-derived systems like SmartOS, but support is <em>best effort</em>. There is no official support for Windows builds.
> Key-value storage system.

# Prepare

- You can follow the [instructions](https://security.feishu.cn/link/safety?target=https%3A%2F%2Fredis.io%2Fdocs%2Fgetting-started%2F%23install-redis&scene=ccm&logParams=%7B%22location%22%3A%22ccm_drive%22%7D&lang=zh-CN) to install Redis.
- Once your Redis is running(`redis-server`), you can use `redis-cli` to connect it.
    - Use `ping` to check.

- Use `redis-cli <command>` to run one command, or just type `redis-cli` to run in interaction mode.

# Data Types

## Core

- You can search commands [here](https://security.feishu.cn/link/safety?target=https%3A%2F%2Fredis.io%2Fcommands%2F%3Fgroup%3Dstring&scene=ccm&logParams=%7B%22location%22%3A%22ccm_drive%22%7D&lang=zh-CN).

### Strings

- Text, serialized objects, binary arrays.
- The most basic Redis data type.

#### eg

```sql
> SET user:1 salvatore
OK
> GET user:1
"salvatore"
```

- Serialized JSON & set it to expire 100 seconds from now

```sql
> SET ticket:27 "\"{'username': 'priya', 'ticket_id': 321}\"" EX 100
```

- Increment a counter

```sql
> INCR views:page:2
(integer) 1
> INCRBY views:page:2 10
(integer) 11
```

#### Basic Commands

- Getting and setting Strings
    - `SET`
    - `SETNX`
    - `GET`
    - `MGET`

- Managing counters
    - `INCRBY`
    - `INCRBYFLOAT`

- Bitwise operations
    - See [this](https://security.feishu.cn/link/safety?target=https%3A%2F%2Fredis.io%2Fdocs%2Fdata-types%2Fbitmaps%2F&scene=ccm&logParams=%7B%22location%22%3A%22ccm_drive%22%7D&lang=zh-CN) for details.
    ### Lists

- Linked lists of string values.

#### eg

```sql
> LPUSH work:queue:ids 101
(integer) 1
> LPUSH work:queue:ids 237
(integer) 2
> RPOP work:queue:ids
"101"
> RPOP work:queue:ids
"237"
```

- Stack

```sql
> LPUSH work:queue:ids 101
(integer) 1
> LPUSH work:queue:ids 237
(integer) 2
> LPOP work:queue:ids
"237"
> LPOP work:queue:ids
"101"
```

- Check the length of a list

```sql
> LLEN work:queue:ids
(integer) 0
```

- Atomically pop an element from one list and push to another

```sql
> LPUSH board:todo:ids 101
(integer) 1
> LPUSH board:todo:ids 273
(integer) 2
> LMOVE board:todo:ids board:in-progress:ids LEFT LEFT
"273"
> LRANGE board:todo:ids 0 -1
1) "101"
> LRANGE board:in-progress:ids 0 -1
1) "273"
```

- To create a capped list that never grows beyond 100 elements, you can call `LTRIM` after each call to `LPUSH`

```sql
> LPUSH notifications:user:1 "You've got mail!"
(integer) 1
> LTRIM notifications:user:1 0 99
OK
> LPUSH notifications:user:1 "Your package will be delivered at 12:01 today."
(integer) 2
> LTRIM notifications:user:1 0 99
OK
```

#### Basic Commands

- Blocking commands
    - `BLPOP`
    - `BLMOVE`
    ### Sets

- Unordered collection of unique strings.

#### eg

- Store the set of favorited book IDs for users 123 and 456:

```sql
> SADD user:123:favorites 347 
(integer) 1
> SADD user:123:favorites 561 
(integer) 1
> SADD user:123:favorites 742 
(integer) 1 
> SADD user:456:favorites 561 
(integer) 1
```

- Check whether user 123 likes books 742 and 299

```sql
> SISMEMBER user:123:favorites 742
(integer) 1 
> SISMEMBER user:123:favorites 299
(integer) 0
```

- Do user 123 and 456 have any favorite books in common?

```sql
> SINTER user:123:favorites user:456:favorites 
1) "561"
```

- How many books has user 123 favorited?

```sql
> SCARD user:123:favorites 
(integer) 3
```

#### Basic Commands

- `SADD`
- `SREM`
- `SISMEMBER`
- `SINTER`
- `SCARD`

### Hashes

- Redis hashes are record types structured as collections of field-value pairs.

#### eg

- Represent a basic user profile as a hash:

```sql
> HSET user:123 username martina firstName Martina lastName Elisa country GB
(integer) 4
> HGET user:123 username
"martina"
> HGETALL user:123
1) "username"
2) "martina"
3) "firstName"
4) "Martina"
5) "lastName"
6) "Elisa"
7) "country"
8) "GB"
```

- Store counters for the number of times device 777 had pinged the server, issued a request, or sent an error:

```sql
> HINCRBY device:777:stats pings 1
(integer) 1
> HINCRBY device:777:stats pings 1
(integer) 2
> HINCRBY device:777:stats pings 1
(integer) 3
> HINCRBY device:777:stats errors 1
(integer) 1
> HINCRBY device:777:stats requests 1
(integer) 1
> HGET device:777:stats pings
"3"
> HMGET device:777:stats requests errors
1) "1"
2) "1"
```

#### Basic Commands

- `HSET`
- `HGET`
- `HMGET`
- `HINCRBY`

### Sorted Sets

- A Redis sorted set is a collection of unique strings (members) ordered by an associated score.

#### eg

- Update a real-time leaderboard as players' scores change:

```sql
> ZADD leaderboard:455 100 user:1
(integer) 1
> ZADD leaderboard:455 75 user:2
(integer) 1
> ZADD leaderboard:455 101 user:3
(integer) 1
> ZADD leaderboard:455 15 user:4
(integer) 1
> ZADD leaderboard:455 275 user:2
(integer) 0
```

- Notice that `user:2`'s score is updated in the final `ZADD` call.
- Get the top 3 players' scores:

```sql
> ZRANGE leaderboard:455 0 4 REV WITHSCORES
1) "user:2"
2) "275"
3) "user:3"
4) "101"
5) "user:1"
6) "100"
7) "user:4"
8) "15"
```

- What's the rank of user 2?

```sql
> ZREVRANK leaderboard:455 user:2
(integer) 0
```

#### Basic Commands

- `ZADD`
- `ZRANGE`
- `ZRANK`
- `ZREVRANK`

### Streams

- A Redis stream is a data structure that acts like an append-only log.
- Redis generates a unique ID for each stream entry. You can use these IDs to retrieve their associated entries later or to read and process all subsequent entries in the stream.
- Redis streams support several trimming strategies (to prevent streams from growing unbounded) and more than one consumption strategy (see `XREAD`, `XREADGROUP`, and `XRANGE`).

#### eg

- Add several temperature readings to a stream.

```sql
> XADD temperatures:us-ny:10007 * temp_f 87.2 pressure 29.69 humidity 46
"1658354918398-0"
> XADD temperatures:us-ny:10007 * temp_f 83.1 pressure 29.21 humidity 46.5
"1658354934941-0"
> XADD temperatures:us-ny:10007 * temp_f 81.9 pressure 28.37 humidity 43.7
"1658354957524-0"
```

- Read the first two stream entries starting at ID 1658354934941-0.

```sql
> XRANGE temperatures:us-ny:10007 1658354934941-0 + COUNT 2
1) 1) "1658354934941-0"
 2) 1) "temp_f"
    2) "83.1"
    3) "pressure"
    4) "29.21"
    5) "humidity"
    6) "46.5"
2) 1) "1658354957524-0"
 2) 1) "temp_f"
    2) "81.9"
    3) "pressure"
    4) "28.37"
    5) "humidity"
    6) "43.7"
```

- Read up to 100 new stream entries, starting at the end of the stream, and block for up to 300 ms if no entries are being written.

```sql
> XREAD COUNT 100 BLOCK 300 STREAMS tempertures:us-ny:10007 $
(nil)
```

##### Basic Commands

- `XADD`
- `XREAD`
- `XRANGE`
- `XLEN`

[tutorial](https://security.feishu.cn/link/safety?target=https%3A%2F%2Fredis.io%2Fdocs%2Fdata-types%2Fstreams-tutorial%2F&scene=ccm&logParams=%7B%22location%22%3A%22ccm_drive%22%7D&lang=zh-CN)

### Geospatial Indexes

- Redis geospatial indexes let you store coordinates and search for them.

#### eg

- Add several locations to a geospatial index:

```sql
> GEOADD locations:ca -122.27652 37.805186 station:1
(integer) 1
> GEOADD locations:ca -122.2674626 37.8062344 station:2
(integer) 1
> GEOADD locations:ca -122.2469854 37.8104049 station:3
(integer) 1
```

- Find all locations within a 1 kilometer radius of a given location, and return the distance to each location.

```sql
> GEOSEARCH locations:ca FROMLONLAT -122.2612767 37.7936847 BYRADIUS 5 km WITHDIST
1) 1) "station:1"
 2) "1.8523"
2) 1) "station:2"
 2) "1.4979"
3) 1) "station:3"
 2) "2.2441"
```

#### Basic Commands

- `GEOADD`
- `GEOSEARCH`

### Bitmaps

- Redis bitmaps are an extension of the string data type that lets you treat a string like a bit vector. You can also perform bitwise operations on one or more strings.

#### eg

- You can represent this scenario using a bitmap whose key references the current hour.
- Sensor 123 pings the server on January 1, 2024 within the 00:00 hour.

```sql
> SETBIT pings:2024-01-01-00:00 123 1 
(integer) 0
```

- Did sensor 123 ping the server on January 1, 2024 within the 00:00 hour?

```sql
> GETBIT pings:2024-01-01-00:00 123
1
```

- What about server 456?

```sql
> GETBIT pings:2024-01-01-00:00 456
0
```

#### Basic Commands

- `SETBIT`
- `GETBIT`
- `BITOP`

### Bitfields

- Redis bitfields let you perform bitwise arithmetic on integer field of arbitrary bit length. For example, you an operate on anything from unsigned, 32-bit integers to signed 5-bit integers.
- These values are stored using binary-encoded Redis strings. Bitfields support atomic read, write and increment operations, making them a good choice for managing counters and similar numerical values.

#### eg

- You can represent these counters with one bitfield per player.
- New players start the tutorial with 1000 gold (counter in offset 0).

```sql
> BITFIELD player:1:stats SET u32 #0 1000
1) (integer) 0
```

- After killing the goblin holding the prince captive, add the 50 gold earned and increment the "slain" counter (offset 1).

```sql
> BITFIELD player:1:stats INCRBY u32 #0 50 INCRBY u32 #1 1
1) (integer) 1050
2) (integer) 1
```

- Pay the blacksmith 999 gold to buy a legendary rusty dagger.

```sql
> BITFIELD player:1:stats INCRBY u32 #0 -999
1) (integer) 51
```

- Read the player's stats:

```sql
> BITFIELD player:1:stats GET u32 #0 GET u32 #1
1) (integer) 51
2) (integer) 1
```

#### Basic Commands

- `BITFIELD`
- `BIITFIELD_RO`

### HyperLogLog

- HyperLogLog is a data structure that estimates the cardinality of a set. As a probabilistic data structure, HyperLogLog trades perfect accuracy for efficient space utilization.

#### eg

- Add some items to the HyperLogLog.

```sql
> PFADD members 123
(integer) 1
> PFADD members 500
(integer) 1
> PFADD members 12
(integer) 1
```

- Estimate the number of members in the set:

```sql
> PFCOUNT members
(integer) 3
```

#### Basic Commands

- `PFADD`
- `PFCOUNT`
- `PFMERGE`

# Recommended Articles

- [https://redis.io/](https://security.feishu.cn/link/safety?target=https%3A%2F%2Fredis.io%2F&scene=ccm&logParams=%7B%22location%22%3A%22ccm_drive%22%7D&lang=zh-CN)
    - [https://redis.io/docs/](https://security.feishu.cn/link/safety?target=https%3A%2F%2Fredis.io%2Fdocs%2F&scene=ccm&logParams=%7B%22location%22%3A%22ccm_drive%22%7D&lang=zh-CN)

- [Redis是什么？看这一篇就够了](https://security.feishu.cn/link/safety?target=https%3A%2F%2Fwww.cnblogs.com%2Fpowertoolsteam%2Fp%2Fredis.html&scene=ccm&logParams=%7B%22location%22%3A%22ccm_drive%22%7D&lang=zh-CN)
- [https://www.runoob.com/redis/redis-intro.html](https://security.feishu.cn/link/safety?target=https%3A%2F%2Fwww.runoob.com%2Fredis%2Fredis-intro.html&scene=ccm&logParams=%7B%22location%22%3A%22ccm_drive%22%7D&lang=zh-CN)
- [https://zhuanlan.zhihu.com/p/62667184](https://security.feishu.cn/link/safety?target=https%3A%2F%2Fzhuanlan.zhihu.com%2Fp%2F62667184&scene=ccm&logParams=%7B%22location%22%3A%22ccm_drive%22%7D&lang=zh-CN)
- [http://c.biancheng.net/redis/what-is-redis.html](https://security.feishu.cn/link/safety?target=http%3A%2F%2Fc.biancheng.net%2Fredis%2Fwhat-is-redis.html&scene=ccm&logParams=%7B%22location%22%3A%22ccm_drive%22%7D&lang=zh-CN)
- [https://www.huaweicloud.com/zhishi/edits-15756133.html](https://security.feishu.cn/link/safety?target=https%3A%2F%2Fwww.huaweicloud.com%2Fzhishi%2Fedits-15756133.html&scene=ccm&logParams=%7B%22location%22%3A%22ccm_drive%22%7D&lang=zh-CN)
- [https://www.runoob.com/redis/redis-intro.html](https://security.feishu.cn/link/safety?target=https%3A%2F%2Fwww.runoob.com%2Fredis%2Fredis-intro.html&scene=ccm&logParams=%7B%22location%22%3A%22ccm_drive%22%7D&lang=zh-CN)

# 思考题

- Redis有哪些危险指令？如何对其使用进行控制
    - 删库？
    - Root泄露？

- Redis是单线程还是多线程运行的？如何保证并发量的？
- 如果在服务器上有多个应用需要缓存键值对，该公用还是分别开Redis实例？
- Redis支持事务吗，支持的怎么样？

