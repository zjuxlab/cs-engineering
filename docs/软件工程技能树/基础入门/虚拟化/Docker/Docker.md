---
title: Docker
slug: Docker
sidebar_position: 0
---


# Docker

Author：蒋旻昊

![](/assets/DF1ebS68copVE5xJWazcIyRsnld.png)

<div class="callout callout-bg-6 callout-border-6">
<div class='callout-emoji'>💊</div>
<ul>
<li><p>本文并没有解释 docker 代码或者是具体讲述 docker 做了什么，仅仅是大致叙述 docker 的一些核心功能是如何实现的。</p>
</li>
<li><p>内容涉及一些 docker 基本概念，请先确保对 docker 基本使用有一定了解</p>
</li>
</ul>
</div>

我们学习 docker 时常常使用虚拟机来作类比，但又常常指出 ，docker 和虚拟机有本质的区别。

本文将浅显地讲解 docker 功能的实现方式，以帮助读者更好的理解和使用 docker

目前的主题有：

- Image 的本质和构建方式
- Container 的隔离与连接

# 什么是 Image

<b>Docker image 本质上就是一个文件集合</b>

当你使用 docker 启动一个 ubuntu:latest 镜像后，在 container 内看到的目录是这样的：

```shell
$  docker exec -it os1 ls
// bin   dev  home  lib32  libx32  mnt  proc  run   srv  tmp  var
// boot  etc  lib   lib64  media   opt  root  sbin  sys  usr
```

其实这就是 docker image 的内容。只是，与宿主机上的文件系统不同，docker image 使用的是被称为 <b>UnionFS </b>的文件系统。这个文件系统类似于 git，所有对文件的修改都将作为一个 commit 提交到原来的文件上，每一层提交都被成为一个 <b>layer</b>

比如，当你使用 Dockerfile 构建一个 image 时：

```docker
FROM ubuntu:latest
COPY . /
RUN make /
EXPOSE 8080
CMD /app
```

Docker 其实是这样构建这个镜像的

![](/assets/YUZ1brFfWoTiPrxGxDUc8gJvn3n.png)

Docker 将在 ubuntu:latest 镜像上一层层套上 layer，每一层 layer 对其上层都是只读的，只有最后的 container layer 有读写能力，可以被用户修改。

这也是为何许多 Dockerfile 编写建议都要求尽量少写命令行，因为每一行都会套一层 layer，会让 image 组装效率下降很多。

我们可以尝试导出一个 image 康康：

```shell
$ docker export mysql -o ./mysql.image.tar
$ tar -xvf mysql.image.tar
$ ls
/*
4057b3769fda959d3c385d22ba82d97415b4328b239708edb1df5bcc5da8f201
4070fc92f54b9909907b86f8277c4bf74e8b44f160da4933d22aae9a1fb5b5b5
43fcfca0776df8e192d1647da2866237fbd9f8e875fb496e4ca887369b2dd995.json
70f3fd2ac7a8f808727d34620e5bc7485c8a9e4caa6092424af310743de08f7e
...
manifest.json
repositories
*/
```

可以看到，这一堆 hash tag 其实就是每一份 layer。docker 会储存每个 layer，最后再根据 manifest 将它们组装起来使用。

这张图形象地展示了 docker image 的组装过程：

![](/assets/KXA0bBTdlofgcrx39YJcMojdn7c.png)

其中，不同的 image 可以共用底层的 layer，因为他们都是只读的，只有最上层的 container layer 可以被用户写入。以及，所有的 container 都供用同一个底层 kernel。这样可以节省磁盘资源。

不同版本的 docker 可能使用不同的 UnionFS，比如 aufs，devicemapper。但是在比较新的版本中，都改为了 overlay2，这可以在 docker image 目录下查看。

# Container 的隔离与连接

Docker 的虚拟化技术和传统的虚拟机最重要的不同之一就是， docker 并不会给每一个容器分出虚拟硬件资源，而是共用宿主机的内核。这使得 docker 的隔离方法也和虚拟机大相径庭。

Docker 的容器隔离高度依赖于 linux 内核的功能，因此，其 mac 版和 windows 版其实是跑了一个 linux 虚拟机，然后在里面运行 docker （xs

## 隔离

### 资源隔离 - CGroups

Linux 系统使用 Control Groups 来调整系统资源分配，你可以安装 cgroup-tools 来查看其分配

```shell
$ lssubsys -m
/*
cpuset /sys/fs/cgroup/cpuset
cpu,cpuacct /sys/fs/cgroup/cpu,cpuacct
blkio /sys/fs/cgroup/blkio
memory /sys/fs/cgroup/memory
...
*/
```

这些 "子系统" 控制了系统各项资源的分配限制。而在所有子系统目录下，都会有一个 docker 控制组，而每个容器也都是 docker 目录下的一个子控制组。

你可以在 cgroup 目录下查看这些容器控制组：

```shell
$ tree -L /sys/fs/cgroup/cpu/docker
├── 0150bc2262444074264ae323c1130fcfd4899c4d4b70ad0052c127bf68a22bab
│   ├── cgroup.clone_children
│   ├── ...
│   ├── cpu.cfs_quota_us
│   ├── cpu.stat
│   ├── notify_on_release
│   └── tasks
├── 1d3bab6b3bddf9925fb182f7a2959244ee7656df583da30bf207ff92b303c759
│   ...
│   └──
├── 4ca8ed71a5e1dbc8ec6d8d82f3ed006c712e0a8b4e7614e5363f9781a41bb2da
│   ...
│   └──
├── 66c7cf680ab239c30c3fc260c24c323938e975c8f5c5ae57e83dddd308908dd7
│  ...
│   └──
├── buildkit
│   ...
```

通过 CGroups 的调控，可以为容器分配资源限制。不过 docker 默认是不会给容器开限制的，你可以在 cfs_quota_us 中看到每个容器都是 -1。

在启动时，你可以为容器设置限制: [Runtime options with Memory, CPUs, and GPUs](https://docs.docker.com/config/containers/resource_constraints/)

或者你可以手改 cgroups 文件（

### 网络、进程、目录和用户隔离 - Namespace

#### Namespace

Namespace 是 Linux 内核提供的隔离机制，其有六种隔离类型：

- <b>Mnt</b>：系统挂载点隔离
    - 将宿主的 /proc/mounts 拷贝一份，以挂载系统目录
    - 在容器内将 symlink 和 io 链接到拷贝的目录中

- <b>UTS</b>：主机名，域名信息隔离
- <b>IPC</b>：进程通信隔离
- <b>PID</b>：进程 pid 隔离
    - 隔离方式其实是“映射”，即在容器中建立的进程仍然在宿主机上有一个 pid，但是在容器中被映射为容器中的进程 pid
    - 你在宿主机上是能找到 docker 内的进程的，pstree 命令可以清晰的展现这些进程的继承关系

- <b>Net</b>：网络隔离
- <b>User </b>：用户隔离

默认情况下，docker 启用除了 user 以外的所有隔离，以从三个方面将容器和宿主机隔离开：

1. 通过 ipc + pid 隔离，docker 能够隔离容器的进程
2. 通过 mnt 隔离，则能够让容器挂载单独的系统目录
3. 通过 net + uts 隔离将容器在网络层面上伪装成一台独立的设备

#### user 隔离

最后我们再说说 docker 默认不开启的 user 隔离，其方式和 pid 隔离很像

在容器内建立的普通用户和用户组是不需要主动隔离的，其本身就只存在 container layer 中，但是一些系统用户，比如 root，daemon等等，默认是使用系统用户的（或者，在 container 启动时指定用户，也会将特定用户加入容器中）

这些共享的用户在宿主机和容器中都是一样的，即使可能在两处有不同的用户名，但是有同一个 pid。

这其实有一定的危险性（红豆泥？），所以我们可以在 docker 的 daemon 配置中开启用户隔离，再重启 dokcer，就能看到 docker 将所有容器内用户映射到了 10000+ 的位置

如果你不打开 user 隔离，其实 docker 也不会给容器内用户所有 root 权限，linux 本身将 root 权限切了好多块。你可以选择性 drop 或者 add 权限，或者使用 privileged 将权限全部打开。

这里有默认和非默认的权限表：[Docker run reference](https://docs.docker.com/engine/reference/run/#runtime-privilege-and-linux-capabilities)

就比如，docker 容器内的默认用户是没有 NET_ADMIN 权限的，也就无法在容器内查看iptables。于是我们可以这样赋权：

```shell
docker run --cap-add=NET_ADMIN -p xxxx:xxxx -it image_name
```

## 连接

上一部分我们已经大致叙述了 docker 的隔离方法，docker 通过 linux 内核的自带服务，将容器从网络，资源，进程，目录，用户等等层面与宿主机和其它容器隔离。

但是我们不能让容器完全被隔离开，大多数容器需要在网络层面与宿主机连接，也有一些容器需要共享储存目录，或者将临时的 container layer 层持久化储存

因此，docker 还需要实现容器与外界的连接

### 储存连接

我们之前提到，docker 使用 UnionFS 来进行文件管理，并且 docker 运行的目录是被 mnt 隔离的。

但是当我们想共享数据，或是想在 docker 里数据库之类的服务时就会有很大麻烦。这些数据在容器运行时没法直接被外部程序访问，而且容器删除后 container layer 就会被丢弃，储存的数据也将丢失。

Docker 使用 volume 解决这个问题，你可以创建一个 volume 然后将其挂载到容器上：

```shell
$ docker volume create qwq
$ docker run -d --mount source=qwq,target=/usr/share/nginx/html nginx:alpine
// 或者这样自动创建 volume
$ docker run -d --volume qwq:/usr/share/nginx/html nginx:alpine
```

或者让多个容器共用 volume，默认挂载点是继承原 volume的：

```shell
$ docker run -it --volumes-from container_name image_name
```

本质上，这个 volume 其实就是在 /var/lib/docker 下的一个目录，docker 只是将其加入到了容器挂载点中，于是，其实你可以直接将宿主机目录和容器目录同步：

```shell
--mount type=bind,source=/src/webapp,target=/usr/share/nginx/html
或者
--volume /src/webapp:/usr/share/nginx/html
```

> 挂载时如果目录不存在 docker 会自动创建，宿主机和容器都是

### 网络连接

Docker 容器间的网络隔离，这个隔离是非常彻底的，你可以完全把容器当作另外一台网络设备。

Docker 本身提供了四种网络连接方案，你可以使用 --net 来指定它们：

- <b>None</b>
    - 啥都不干，只给容器留一张 lo 网卡，此时容器是完全的网络孤岛

- <b>Host</b>
    - 共用主机网络，这个模式下会关闭 net 隔离

- <b>Container</b>
    - 即和指定 container 共享 netns

- <b>Bridge </b>
    - 桥接模式

Docker 默认的模式是 Bridge，也是我们接下来要详细介绍的格式

#### 虚拟设备

Bridge 模式深度依赖 linux 内核提供的两种虚拟网络设备，bridge 和 veth_pair

- <b>bridge</b>

Bridge 如其名，就是一个虚拟网桥（其实我觉得更像交换机？），其功能和物理交换机差不多，可以把多个网络设备绑定到其上。

- <b>veth_pair</b>

一种成对的接口，可以理解为两个接口彼此桥接，并且会同步发送/接收的请求

```shell
+----------------------------------------------------------------+
|                                                                |
|       +------------------------------------------------+       |
|       |             Newwork Protocol Stack             |       |
|       +------------------------------------------------+       |
|              ↑               ↑               ↑                 |
|..............|...............|...............|.................|
|              ↓               ↓               ↓                 |
|        +----------+    +-----------+   +-----------+           |
|        |   eth0   |    |   veth0   |   |   veth1   |           |
|        +----------+    +-----------+   +-----------+           |
|              ↑               ↑               ↑                 |
|              |               +---------------+                 |
|              |                                                 |
+--------------|-------------------------------------------------+
               ↓
         Physical Network
```

> 虽然你可能马上想尝试这两种网络设备，但是在同一个ns的veth之间会被rp_filter和accept_local策略拦得死死的，所以上面这个虚拟拓扑是没法测试出效果的。
> 如果需要测试，必须打开新的 netns，将 veth_pair 挂在两个容器上

通过这两种设备，docker 可以建立一个连接容器和宿主机的网络：

![](/assets/HayKbLCC3oDwOOxHKMwcf4UlncQ.png)

1. 如图，Docker 会在首先宿主机上建立一个 bridge docker0，一般来说会给其 172.17.0.1 的IP
2. 而后，docker 会为每一个容器建立一对 veth_pair，其中一端连在容器上作为容器的网卡 eth0，另一端连接在 bridge 上，不设置 IP，由于 veth_pair 的同步性质，就相当于将容器连接到了 bridge 上。
3. 这样，就相当于将所有容器挂在了 bridge 下的子网中

docker 默认会为容器建立这样一个子网，但是你也可以新建一个，让容器使用不同的子网：

```shell
$ docker network create newnet
$ docker run --net newnet debian:latest
```

> 你可以使用 brctl show 查看目前宿主机上的 bridge 设备状态

#### 转发规则

虽然我们已经知道了 docker 是如何连接容器和宿主机的网络的，但是 docker 创建的虚拟网卡是不会暴露到物理网络上的，对容器的请求必须通过转发才能到达其内部

Docker 使用 <b>iptables </b>来管理宿主机和容器的请求转发。在简单建了几个容器和网络后，使用命令 iptables 可以清楚地看到 docker 的转发策略，我们分步骤对其进行分析。

> iptables 规则链执行顺序图：

![](/assets/SmrUbY05tor9PpxpjnPc2ORQnZc.png)

- <b>nat:prerouting</b>:
    ```shell
Chain PREROUTING (policy ACCEPT 31323 packets, 967K bytes)
 pkts bytes target     prot opt in     out     source      destination
 210K 6466K DOCKER     all  --  *      *       0.0.0.0/0     0.0.0.0/0
                                          ADDRTYPE match dst-type LOCAL
                                          
Chain DOCKER (2 references)
 pkts bytes target     prot opt in     out   source         destination
    0     0 RETURN     all  -- docker1  *     0.0.0.0/0      0.0.0.0/0
   21  1284 RETURN     all  -- docker0  *     0.0.0.0/0      0.0.0.0/0
  362 18088 DNAT       tcp  -- !docker0 *     0.0.0.0/0      0.0.0.0/0
                                       tcp dpt:9999 to:172.17.0.2:9999
  155  8708 DNAT       tcp  -- !docker0 *     0.0.0.0/0      0.0.0.0/0
                                       tcp dpt:5432 to:172.17.0.5:5432
    0     0 DNAT       tcp  -- !docker1 *     0.0.0.0/0      0.0.0.0/0
                                       tcp dpt:8001 to:172.21.0.3:5000
    0     0 DNAT       tcp  -- !docker0 *     0.0.0.0/0      0.0.0.0/0
                                       tcp dpt:5000 to:172.17.0.3:5000
```
    - Prerouting 将所有目标为本地 ip 的请求导向 docker chains
    - Docker chains 将所有出接口为 docker bridge 的请求 return，直接跳到下一个规则
    - 对于出接口非 docker bridge 的请求，根据端口映射进行 DNAT

- <b>filter:forward</b>
    ```shell
Chain FORWARD (policy DROP 0 packets, 0 bytes)
 pkts bytes target       prot opt in     out     source          destination
 6035 5180K DOCKER-USER   all  --  *      *       0.0.0.0/0     0.0.0.0/0
 DOCKER-ISOLATION-STAGE-1 all  --  *      *       0.0.0.0/0     0.0.0.0/0
    0     0 ACCEPT        all  --  *   docker1    0.0.0.0/0     0.0.0.0/0         
                                                   ctstate RELATED,ESTABLISHED
    0     0 DOCKER        all  --  *   docker1    0.0.0.0/0     0.0.0.0/0
    0     0 ACCEPT     all  -- docker1 !docker1   0.0.0.0/0     0.0.0.0/0
    0     0 ACCEPT     all  -- docker1 docker1    0.0.0.0/0     0.0.0.0/0
 100K  245M ACCEPT     all  --  *      docker0    0.0.0.0/0     0.0.0.0/0   
                                                   ctstate RELATED,ESTABLISHED
  561 29431 DOCKER     all  --  *      docker0    0.0.0.0/0     0.0.0.0/0
90858 6338K ACCEPT     all  -- docker0 !docker0   0.0.0.0/0     0.0.0.0/0
   16   987 ACCEPT     all  -- docker0 docker0    0.0.0.0/0     0.0.0.0/0
   ufw-settings ......
     
Chain DOCKER (2 references)
 pkts bytes target     prot opt in     out     source        destination
  361 18028 ACCEPT     tcp  --  !docker0 docker0  0.0.0.0/0     172.17.0.2
                                                              tcp dpt:9999
  155  8708 ACCEPT     tcp  --  !docker0 docker0  0.0.0.0/0     172.17.0.5
                                                              tcp dpt:5432
    0     0 ACCEPT     tcp  --  !docker1 docker1  0.0.0.0/0     172.21.0.3
                                                              tcp dpt:5000
    0     0 ACCEPT     tcp  --  !docker0 docker0  0.0.0.0/0     172.17.0.3
                                                              tcp dpt:5000

Chain DOCKER-ISOLATION-STAGE-1 (1 references)
 pkts bytes target     prot opt in     out     source        destination
DOCKER-ISOLATION-STAGE-2  all -- docker1 !docker1  0.0.0.0/0   0.0.0.0/0
DOCKER-ISOLATION-STAGE-2  all -- docker0 !docker0  0.0.0.0/0   0.0.0.0/0
 192K  251M RETURN        all  --   *        *     0.0.0.0/0   0.0.0.0/0

Chain DOCKER-ISOLATION-STAGE-2 (2 references)
 pkts bytes target     prot opt in     out     source        destination
    0     0 DROP       all  --  *      docker1  0.0.0.0/0     0.0.0.0/0
    0     0 DROP       all  --  *      docker0  0.0.0.0/0     0.0.0.0/0
90858 6338K RETURN     all  --  *      *        0.0.0.0/0     0.0.0.0/0

Chain DOCKER-USER (1 references)
 pkts bytes target     prot opt in     out     source      destination
1348K 2536M RETURN     all  --  *      *       0.0.0.0/0     0.0.0.0/0
```
    - Docker 规则<b>必须</b>在 ufw 前
    - DOCKER-USER 是 docker 建议的自定义转发规则链，其建议不要动 docker 设置好的转发规则，将自定义都加在 DOCKER-USER chains中
    - ISOLATION-STAGE 将所有跨 docker bridge 的请求 drop，这隔离了不同的 docker network 子网 
    - 之后 docker 将配过端口映射的请求，以及其他所有经过 docker bridge 的请求全部 accept 进入下一 chains

- <b>filter:input|output</b>
    ```shell
Chain INPUT (policy DROP 630 packets, 22680 bytes)
 pkts bytes target     prot opt in     out     source               destination
  ufw settings ...

Chain OUTPUT (policy ACCEPT 1 packets, 40 bytes)
 pkts bytes target     prot opt in     out     source               destination
   ufw-settings ......
```
    - Docker 不修改这部分，仅防火墙配置

- <b>nat:output</b>
    ```shell
Chain OUTPUT (policy ACCEPT 36618 packets, 2362K bytes)
 pkts bytes target     prot opt in     out     source      destination
   66 70899 DOCKER     all  --  *      *       0.0.0.0/0   127.0.0.0/8
                                          ADDRTYPE match dst-type LOCAL
                                          
Chain DOCKER (2 references)
 pkts bytes target     prot opt in     out   source         destination
    0     0 RETURN     all  -- docker1  *     0.0.0.0/0      0.0.0.0/0
   21  1284 RETURN     all  -- docker0  *     0.0.0.0/0      0.0.0.0/0
  362 18088 DNAT       tcp  -- !docker0 *     0.0.0.0/0      0.0.0.0/0
                                       tcp dpt:9999 to:172.17.0.2:9999
  155  8708 DNAT       tcp  -- !docker0 *     0.0.0.0/0      0.0.0.0/0
                                       tcp dpt:5432 to:172.17.0.5:5432
    0     0 DNAT       tcp  -- !docker1 *     0.0.0.0/0      0.0.0.0/0
                                       tcp dpt:8001 to:172.21.0.3:5000
    0     0 DNAT       tcp  -- !docker0 *     0.0.0.0/0      0.0.0.0/0
                                       tcp dpt:5000 to:172.17.0.3:5000
```
    - 这部分拦截访问环回地址的请求，直接依照 docker 映射 DNAT，发往相应 docker 接口

- <b>nat:postrouting</b>
    ```shell
Chain POSTROUTING (policy ACCEPT 36786 packets, 2371K bytes)
 pkts bytes target     prot opt in  out      source           destination
    0     0 MASQUERADE  all  --  *  !docker1  172.21.0.0/16    0.0.0.0/0
  135 74109 MASQUERADE  all  --  *  !docker0  172.17.0.0/16    0.0.0.0/0
    0     0 MASQUERADE  tcp  --  *  *         172.17.0.2       172.17.0.2
                                                             tcp dpt:9999
    0     0 MASQUERADE  tcp  --  *  *         172.17.0.5       172.17.0.5
                                                             tcp dpt:5432
    0     0 MASQUERADE  tcp  --  *  *         172.21.0.3       172.21.0.3
                                                             tcp dpt:5000
    0     0 MASQUERADE  tcp  --  *  *         172.17.0.3       172.17.0.3
                                                             tcp dpt:5000
```
    - !docker0 和 !docker1 的两个 masquerade 规则将从相应子网发出的请求伪装成宿主机发出的请求
    - 后面几个似乎是 docker 为了解决从 0.0.0.0 访问 docker 的 bug 而加上的，应该只有关闭 userland_proxy 才会被使用（但是我没完全看懂，参见原repo）
        - 加上这几条 rules 的 pr ：[Move per-container forward rules to DOCKER chain by porjo · Pull Request #7003 · moby/moby](https://github.com/moby/moby/pull/7003)
        - 提问为啥要有这几条 rules 的 issue：[Unused POSTROUTING rules · Issue #12632 · moby/moby](https://github.com/moby/moby/issues/12632)

于是看起来就是这么一张图（好丑x）

![](/assets/RktebS4o3o6EMZxjnNgcas28nyh.png)

## Waiting for more content

以上只是非常简略的 docker 核心技术介绍，这个话题还能有很多内容

# References

Docker 的核心技术其实并不复杂，理解其工作原理的过程中也是在学习如何使用它, 尤其是其网络连接的方式, 对于解决部署多容器项目时遇到的问题非常有帮助 ( 参见 docker compose )

对于想研究 docker 源码的人来说, docker实在是太巨大了, 如果真有兴趣, 可以看看 [docker-CE](https://github.com/docker/docker-ce)

<b>References</b>

- [Docker run reference](https://docs.docker.com/engine/reference/run/)
- [iptables规则链执行顺序 - whitesky-root - 博客园](https://www.cnblogs.com/yum777/articles/8514636.html)
- [Docker 核心技术与实现原理](https://draveness.me/docker/)

> 部分配图使用 [Excalidraw](https://excalidraw.com/) 绘制

