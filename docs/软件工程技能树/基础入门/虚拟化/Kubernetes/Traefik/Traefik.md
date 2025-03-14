---
title: Traefik
slug: Traefik
sidebar_position: 1
---


# Traefik

Author：NA

Traefik是一个用golang写成的、高性能的动态反向代理（reverse  proxy）。

其特点有：

- 动态性。根据deployment的某种配置（可以是annotate、label等）动态生成路由。
- 变更路由不必重启，无需关闭现有连接。
- 广泛适用性，支持swarm、k8s甚至etcd等多个平台的reverse proxy。
- Golang写成，长得很可爱。

![](/assets/O6QYbrmnpoMCfsxwmuwcCqHKnOf.png)

还有：

- 难以配置。难以debug。
    - 和其他reverse proxy一样，它只能通过http response进行调试、通过log来推测事故原因。这给我们在复杂系统中的问题定位造成了很大的麻烦。
    - 叠加k3s的service配置规则、Pod中部分服务自带的nginx的配置规则、服务本身的网络配置规则、证书加密和解包的复杂度，定位问题令人头秃（不过网络都这样，没办法

更多Refer to my blog：

