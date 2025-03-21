---
title: panic
slug: panic
sidebar_position: 4
---


# panic

# 引发panic的情况

- 数组（字符串）越界
- 空指针数据解引用（调用方法正常）
- 类型断言失败
- 写nil map
- 除零
- 重复关闭Channel / 写已经关闭的Channel
- 死锁
- 并发写map
- OOM

