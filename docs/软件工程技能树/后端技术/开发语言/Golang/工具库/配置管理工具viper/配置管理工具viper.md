---
title: 配置管理工具 viper
slug: 配置管理工具 viper
sidebar_position: 3
---


# 配置管理工具 viper

<b>多环境配置的统一治理</b>
Viper解决了配置分散的痛点，支持从JSON/YAML/环境变量/命令行参数等多源统一加载：

```
viper.SetConfigName("config")
viper.AddConfigPath("/etc/app/")
viper.AddConfigPath("$HOME/.app")
viper.AutomaticEnv()if err := viper.ReadInConfig(); err != nil {
    log.Fatal("配置加载失败: ", err)}
// 热加载配置变更
viper.WatchConfig()
viper.OnConfigChange(func(e fsnotify.Event) {
    fmt.Println("配置更新:", e.Name)})
```

关键技术创新：

- <b>配置优先级熔断</b>：按命令行&gt;环境变量&gt;配置文件顺序自动覆盖
- <b>动态重载</b>：文件变更时毫秒级生效，服务无需重启
- <b>类型安全读取</b>：支持GetInt/GetDuration等强类型方法

