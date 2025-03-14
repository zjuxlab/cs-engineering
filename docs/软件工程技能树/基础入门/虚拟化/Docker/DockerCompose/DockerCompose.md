---
title: Docker Compose
slug: Docker Compose
sidebar_position: 1
---


# Docker Compose

Author：蒋旻昊

![](/assets/JqNcb1Hj7oxLeQxhGfNcCXQZnPd.png)

# intro

## 为什么使用 docker compose

在实际使用 docker 时，我们经常使用一个定义好的 Dockerfile build一个 image，然后使用该 image 建立容器。

但是在建立容器的过程中，我们仍然需要许多手动设置的参数，比如映射端口，容器名称，资源限制等等。用户经常会额外编写一个部署脚本来部署服务。并且考虑到部署平台的不同等等，可能经常性需要用户更改脚本内容，也使得用户不得不了解各种奇奇怪怪的 shell 命令使用方式。

另外，很多服务并不是独立的，他们经常会依赖于数据库等服务。或者也会有前后端不分离的服务。这些服务将需要连接不同的 container，而 docker 不会 DANT 从 docker bridge 发出的请求，所以请求必须从外网绕一圈，或者由用户手动配置 container 之间的连接。考虑到我们一般让 docker 自动分配容器 ip，这将是一件很繁琐的工作。

## 啥是 docker compose

Docker compose 是一个多容器部署工具，可以用提前定义的配置文件代替手动操作 docker

Docker compose 提出两个重要概念：<b>project </b>& <b>service</b>

Project 即为要被部署的项目整体，而 service 指实际部署的每个 container。docker compose 以 project 为一个整体单位，一个 project 可以包含一个或多个 service

通过 `docker-compose.yaml`，docker compose 可以自动完成 build image，启动容器，以及挂载 volume，自定义网络，负载均衡等等工作。而且还能比较方便的实现多容器，或者多 docker 子网的部署和互联。在 v3 版本以上的 docker compose 还支持配置 docker swarm 部署。

# Install

docker-compose 原本是使用 python 写的（看起来还是 python2），你可以使用 pip 或包管理器直接安装 `docker-compose`

但是目前 docker 官方已经使用 go 重写了 compose，并将其内嵌到 docker plugin中，可以直接使用 包管理器安装：

```shell
$ apt install docker-compose-plugin
```

或者参照官方给的方式自行下载：[docker-compose#where-to-get-docker-compose](https://github.com/docker/compose#where-to-get-docker-compose)

# Compose file

Dcoker compose 通过 compose 配置文件来配置 project，默认情况下，project 将会以目录名称命名，但是你可以使用 `-p` 参数，或者 compose 文件中的 `name`tag 来自定义名称

默认情况下，docker compose 会读取当前目录下的 `compose.yaml`或`compose.yml` 作为配置文件。同时为了保持向后兼容性，也支持 `docker-compose.yaml`作为配置文件，但如果两者都存在，docker compose 会默认读取新版本的默认配置文件。

你可以使用 `-f` 参数来指定文件。你可以指定不在当前目录中的配置文件，但是一些相对路径配置还是会以 compose 执行的目录位置为相对路径。

你可以使用 `-f`指定多个配置文件，docker 会合并这些文件，如果有相同的配置，默认使用后指定的文件覆盖前者。这个机制常常用来分别测试和生产环境：

```yaml
// compose.yaml
services:
  app:
    image: my-app:latest
    enviroment:
      - RUN_MODE: "development"
      
// compose.product.yaml
services:
  app:
    enviroment:
      - RUN_MODE: "production"
      
$ docker compose up -f compose.yaml
or
$ docker compose up -f compose.yaml -f compose.product.yaml
```

现在，我们从一个最简单的 compose 配置文件开始介绍其组成：

```yaml
version: "3.9"
services:
  web:
    build: .
    command: flask run
    ports:
      - "8001:5000"
    depends_on:
      - db
  db:
    image: "redis:alpine"
```

`compose.yaml`描述了一个 project 的所有信息

起始行 `version`是一个向后兼容配置，指的是配置文件的语法版本，只要是一定版本以上的 docker compose 都可以使用任意版本的语法。

这个参数并不是必须的，如果你拿到了一个旧版本的 `compose.yaml` 文档，你可以使用 `docker compose convert`获得目前语法版本的配置文件

这个 `compose.yaml` 只有 <b>services </b>部分，而一个完全的配置文件还可以包含：<b>networks</b>，<b>volumes</b>，<b>configs</b>，<b>secrets </b>部分

## Services

Services 是 compose 配置中必须的部分，其下每一个 key 都代表一个 service，compose 会自动为其创建一个容器，并执行网络、挂载相关设置。每一个 service 其实就是一个 container，默认的名称为 `{project_name}-{service_name}-1`，你可以使用 `container_name`属性自定义。

### build

可以使用 <b>image </b>直接指定该容器的镜像：

```yaml
services:
  app:
    image: my-app:latest
```

也可以使用 <b>build </b>从 Dockerfile 生成

生成的 image 将以默认为 `{project_name}-{service_name}`：

```yaml
services:
  app:
    build: ./backend // 指定 Dockerfile 路径

// long syntax
services:
  app:
    build:
      context: backend
      dockerfile: Dockerfile
```

> 更多 build 参数可以参考 [Compose file build reference](https://docs.docker.com/compose/compose-file/build/#context-required)

你也可以同时使用 image 和 build，此时 compose 会优先查找是否存在 image，如果没有再 build，并且生成的 image 以 image tag 中的名称相同（但是其实 build 的逻辑也是先找 image，默认是不会重新 build 的）

### container 参数

你可以在这里添加 docker run 时设置的参数，以下是一些常用的：

```yaml
services:
  app:
    container_name: app-qwq
    image: my-app:latest
    command: echo "qwq" # 这里会覆盖 image 中的指令
    restart: always
    expose:         # 这里的和 dockerfile 中的 expose 一样
      - 1926        # 仅有标示作用，不会映射
      - 817
    ports:
      - 80:9999
```

> 更多奇奇怪怪的选项：[Compose specification](https://docs.docker.com/compose/compose-file/#services-top-level-element)
> （比如你可以在这里设置容器的资源限制）
> （按字母表顺序排的文档读起来是真的.....）

### environment

Compose 可以设置每个容器的环境变量：

```yaml
services:
  app:
    image: my-app:latest
    environment:
      - HOST=7890
    # 或者如下格式：
    # HOST: 7890
```

环境变量可以从宿主机的环境变量中获取，也可以在 project 根目录下新建 `.env` 文件，compose 会将其当作宿主机环境变量使用：

```yaml
services:
  app:
    image: my-app:latest
    environment:
      - HOST=${SERVER_HOST}
      - VERSION      # 对于已经在宿主机环境或者 .env 中的变量
                     # 可以只声明不赋值 
    # 或者如下格式
    # HOST:
```

> Environment 键值对的一些规则：
[Declare default environment variables in file](https://docs.docker.com/compose/env-file/#parameter-expansion)

不仅是 environment 中的内容，docker 的所有值都可以通过环境变量赋值（注意是外部的环境变量，environment 中的环境变量和其他值都是在解析 compose 配置时赋值的 ）：

```yaml
services:
  app:
    image: my-app:latest
    environment:
      - HOST=${SERVER_HOST}
    ports:
      - ${PORTS}:${PORTS}
```

### depends & health_check

Compose 支持按照依赖关系先后部署服务，如下服务将会先启动 db，然后启动 backend，最后启动代理：

```yaml
services:
  backend:
    build:
      context: backend
      target: builder
    depends_on:
      - db

  db:
    image: mysql
    volumes:
      - db-data:/var/lib/mysql
    environment:
      - MYSQL_DATABASE=example
      - MYSQL_ROOT_PASSWORD_FILE=/run/secrets/db-password
    expose:
      - 3306

  proxy:
    image: nginx
    ports:
      - 80:80
    depends_on: 
      - backend
```

默认情况下，这个依赖只保证启动顺序并预留一个很短的间隔，并不保证服务是否启动完成

但是我们可以设置更多启动检查：

- <b>service_started</b>
    - 服务已经启动，默认模式

- <b>service_healthy</b>
    - 服务启动完成且状态为 healthy（依赖必须打开 health_check）

- <b>service_completed_successfully</b>
    - 服务成功完成（指退出并返回 0 ）

为了实现第二种检查，我们需要在依赖 service 中实现 health_check 功能：

```yaml
db:
    image: mysql
    healthcheck:
      test: ['CMD-SHELL', 'mysqladmin ping -h 127.0.0.1 --password="$$(cat /run/secrets/db-password)" --silent']
      interval: 3s
      retries: 5
      start_period: 30s
    volumes:
      - db-data:/var/lib/mysql
    environment:
      - MYSQL_DATABASE=example
      - MYSQL_ROOT_PASSWORD_FILE=/run/secrets/db-password
    expose:
      - 3306
```

可以设置重试次数，测试时间间隔，测试开始前等待时长等待参数

测试方式为一句 shell 指令，如果返回为 1 则测试通过，0 则不通过，或者，你也可以在命令后 || 一个 `exit`直接退出，也会检测为 unhealthy

第三种服务常常用来进行 migrate 等一次性指令，执行完后直接 exit 0 则代表成功完成，可以进行被依赖项

## Networks

Compose 默认情况下会在每一次 up project 时创建一个子网 

> 关于 docker 的 ip 段寻找方式和范围 ：[What IP address ranges are available to Docker when creating gateways, for example when using Compos](https://stackoverflow.com/questions/70734682/what-ip-address-ranges-are-available-to-docker-when-creating-gateways-for-examp)
> xs由于尝试 docker compose 我的 ip 段已经快用到 192.168.100.y 了

项目默认会有一个名为 `{project_name}_default` 的 bridge 类型网络（在项目中名为 default：

```yaml
services:
 services ...
 
networks:
  default:
```

default 会自动生成，也会将所有 service 都连接进去

不过你也可以自定义网络，并给每个 service 分配网络

如下，`backend` 和 `db` 连接在 `backend` 上，同时也和 `nginx` 一起连在 `frontend` 上：

```yaml
services:
  backend:
    build:
      context: backend
      target: builder
    networks:
      - backend
      - frontend

  db:
    image: mysql
    expose:
      - 3306
    networks:
      - backend

  proxy:
    image: nginx
    volumes:
      - type: bind
        source: ./proxy/nginx.conf
        target: /etc/nginx/conf.d/default.conf
        read_only: true
    ports:
      - 1080:80
    depends_on:
      - bk
    networks:
      - frontend

networks:
  frontend:
  backend_net:
    name: backend  # 可以自定义网络名称
```

当在 networks 中声明了自定义网络后，compose 就不会自动生成 default 网络，也不会将容器自动连接到任何一个子网。但是，你仍然可以不在 networks 中声明 default 就将其加到 service 的网络上。

另一方面，你可以在 networks 中自定义 defaut 网络，如果不定义其他网络的话，这个 default 网络仍然会被自动添加到所有 service 上。

### Networks 详细配置

自定义的网络也可以从外部引入，compose 会根据 name 来寻找外部网络：

```yaml
networks:
  backend:
    external: true
```

可以通过这个规则引用 docker 默认的 host 或者 none 子网：

```yaml
networks:
  hostnet:
    external: true
    name: host
```

也可以从 container 这边直接设置网络类型：

```yaml
services:
  backend:
    build: .
    network_mode: "host" # none
```

不同的 project 之间也可以共享网络，但是，compose 建立的网络默认只能以 project 为单位共享，如果想要让孤立的容器连接到 compose 网络，请加上：

```yaml
networks:
  mynet:
    attachable: true
```

### 使用 hostname 访问容器

虽然我们将不同的容器连接到了同一个网络中，但是他们的 IP 一般来说是由 compose 分配的。当我们要使用跨容器的访问时，可以使用 hostname 进行访问，比如，在上一部分中由 backend，db 和 proxy 组成的网络中，我们可以从 backend 容器这样访问 db：

```text
root:%s@tcp(db:3306)
```

你可以对对每个容器在不同网络上添加别名：

```yaml
services:
  backend:
    build:
      context: backend
      target: builder
    networks:
      backend:
        aliases:
          - db_user
      frontend:
        aliases:
          - server
```

## Volumes

Compose 设置 volume 的方式和 network 差不多，你可以这样定义一些 volume：

```yaml
volumes:
  runtime-data:
    name: runtime
  db-data:
    external: true
```

也可以对每一个 service 分配 volume 或者分配宿主机目录，用法和 docker 差不太多：

```yaml
services:
  backend:
    image: backend
    volumes:
      - type: volume
        source: db-data
        target: /data
      - type: bind
        source: ./config.yml
        target: /app/config.yml
# short syntax
services:
  backend:
    image: backend
    volumes:
      - db-data:/data
      - ./config.yml:/app/config.yml
```

也可以使用 volumes_from 的方式

```yaml
services:
  backend:
    image: backend
    volumes_from:
      - service_name
      - container:container_name
```

#### 关于 configs 和 secrets

Compose 其实还提供了两种设置，configs 和 secrets，这里因为没明白有什么特别的用处就没有介绍

> configs 本质上和 bind 类型的 volume 是一样的，其实不太明白为啥还要特地分一个功能出来

> 至于 secrets，据官方说是一种更安全的容器内共享方式，但我寻思 compose 目前只有从文件和环境变量两种传入 secrets 的方式，也没有提供像 swarm 那种不留痕的 shell 之间输入，到底哪里比直接绑定 volume 安全性高了 x

# Commands

Docker compose 免去了 docker 的繁琐指令参数，只要你设置好配置文件，就可以超简单地部署

Compose 会以目前执行目录为项目根目录，目录名为项目名称。你可以指定名称和配置文件，但是 compose 仍然会以执行目录为根目录。

## Up & Down

你可以使用 up 来创建/启动一个 project

```bash
docker compose -p name up
```

如果你想重新 build 其中的一些 service，可以使用 <b>build </b>或者 `--build` 参数重新 build，还可以加上 `--no-deps`以防连带依赖一起重启

down 则会将所有 container 停止并删除，同时删除相应的 network

但是注意，volume 并不会被自动删除，以 run 指令启动的临时容器和 image 也不会被删除

```bash
docker compose -p name down
```

如果你已经 up 了服务，你随时可以使用 <b>stop </b>和 <b>start </b>启停容器，也可以使用 <b>pause </b>和 <b>unpause</b>，来暂停容器，这两组命令的主要区别在于 pause 会保留容器的缓存区，并且由于不是“启动”，不会运行 health_check。

## Check project status & Operating project

在 docker compose 中运行 <b>images </b>和 <b>ps </b>只会显示在项目中的容器和镜像

你可以使用 <b>logs </b>分别或者一起显示容器的输出流，docker compose 将会以颜色区分不同 service（讲真 compose 的 tui 真的好看 x

```shell
$ docker compose -p test logs
# 自行脑补颜色x
test-proxy-1  | 2022/10/05 09:45:02 [notice] 1#1: start worker process 22
test-proxy-1  | 2022/10/05 09:45:02 [notice] 1#1: start worker process 23
test-bk-1     | read db_pwd:  qwq
test-bk-1     | connected to db
test-db-1     | 2022-10-05 09:41:30+00:00 [Note] [Entrypoint]: Entrypoint script for MySQL Server 8.0.30-1.el8 started.
test-db-1     | 2022-10-05 09:41:30+00:00 [Note] [Entrypoint]: Switching to dedicated user 'mysql'
```

<b>top </b>指令可以查看每个容器中的进程

```bash
$ docker compose -p test top
test-db-1
UID   PID    PPID   C    STIME   TTY   TIME       CMD
999   7042   7007   0    17:44   ?     00:00:09   mysqld

test-proxy-1
UID        PID    PPID   C    STIME   TTY   TIME       CMD
root       7442   7399   0    17:45   ?     00:00:00   nginx: master process nginx -g daemon off;
systemd+   7577   7442   0    17:45   ?     00:00:00   nginx: worker process
systemd+   7578   7442   0    17:45   ?     00:00:00   nginx: worker process
```

<b>exec </b>和 docker 使用没有什么差别

不过在 compose 中，你只能用其在 project 中的别名，比如在 docker 中看到的是 test-db-1，compose 就要用 db 来调用

<b>run</b> 命令能够启动一个 service 同时覆盖其中的 CMD 和 ENTRYPOINT，并且 run 命令不会建立端口映射（为了防止冲突）。不过这个命令一定慎用，其临时起的容器不会被 compose 进行管理，最后还得自己手删x

# Reference

- [Compose specification](https://docs.docker.com/compose/compose-file/)
- [Overview of docker compose CLI](https://docs.docker.com/compose/reference/)
- [Docker Compose Networking](https://runnable.com/docker/docker-compose-networking)
- [GitHub - docker/awesome-compose: Awesome Docker Compose samples](https://github.com/docker/awesome-compose)
    - 这里有很多 compose.yaml 例子

