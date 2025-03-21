---
title: NGINX
slug: NGINX
sidebar_position: 3
---


# NGINX

Author：NA

NGINX 是一个巨无霸，它的功能难以概括。总体而言，这个产品的目标解决我们这种小型软件部署所面临的所有问题。

<div class="callout callout-bg-2 callout-border-2">
<div class='callout-emoji'>😳</div>
<p>部署就是将我们写的应用程序暴露给互联网的过程；这样，大家上网就可以访问到我们的应用程序。这种在互联网上的程序，我们来给它起一个名字，叫服务 (service)。</p>
</div>

NGINX 接管了部署过程中和过程后的全部事项。它负责反向代理、负载均衡、速率限制、日志记录等等，甚至还可以负责自动生成一个带文件列表的前端页面。但详细解释这些前，我们先来回顾一下什么是部署。

# 部署

部署服务，其实就是建立互联网与服务器内连接的过程。在三层，我们认为指定了 IP 和端口就可以指定一个应用程序。当我们写的应用程序向外暴露端口时，这个端口只暴露到了内网，并不能被公有互联网感知。NGINX 做到的，其实就是把这个内网端口给透出成一个外网端口。

举例而言，比如应用程序的内网端口是 8000 ，这个应用程序在 NGINX 中配置的外网端口是 80 。那么，当有请求被发送到服务器的 80 端口时， NGINX 会拿到这个请求，把它转发到本地的 8000 端口中。这就是反向代理。

# NGINX 的配置方式

NGINX 的全部配置都是通过配置文件完成的。

一般地，NGINX 的配置文件都会在 `/etc/nginx` 目录下。在这个目录下，会有 `sites-enabled` 和 `sites-available` 两个目录。一般而言，我们是先把配置文件写在 `sites-available` 中，然后再把配置文件软链接到 `sites-enabled` 中。请读者根据这两个目录的名字自行理解这样做的用意。

编辑完配置文件，可以用以下指令检验配置文件正确性，并重启 NGINX：

```shell
sudo nginx -t  # check config file
sudo systemctl restart nginx  # restart nginx using systemd
```

配置文件的编写方式非常偏应用，在这里就不赘述了。读者可以参考相关博客和官方文档进行学习。

# NGINX常用方式

### 1、<b>全局块</b>：

<b>配置影响nginx全局的指令</b>。一般有运行nginx服务器的用户组，nginx进程pid存放路径，日志存放路径，配置文件引入，允许生成worker process数等。
```nginx
user administrator administrators;  #配置用户或者组，默认为nobody nobody。
worker_processes 2;  #允许生成的进程数，默认为1
pid /nginx/pid/nginx.pid;   #指定nginx进程运行文件存放地址
error_log log/error.log debug;
```

 error_log :制定日志路径，级别。这个设置可以放入全局块，http块，server块，
级别依次为：`debug|info|notice|warn|error|crit|alert|emerg`

### 2、<b>events块</b>：

配置<b>影响nginx服务器或与用户的网络连接</b>。有每个进程的最大连接数，选取哪种事件驱动模型处理连接请求，是否允许同时接受多个网路连接，开启多个网络连接序列化等。
```nginx
events {
    accept_mutex on;   #设置网路连接序列化，防止惊群现象发生，默认为on
    multi_accept on;  #设置一个进程是否同时接受多个网络连接，默认为off
    use epoll;      #事件驱动模型，select|poll|kqueue|epoll|resig|/dev/poll|eventport
    worker_connections  1024;    #最大连接数，默认为512
}
```

惊群效应是指多进程（多线程）在同时阻塞等待同一个事件的时候（休眠状态），如果等待的这个事件发生，那么他就会唤醒等待的所有进程（或者线程），但是最终却只能有一个进程（线程）获得这个时间的“控制权”，对该事件进行处理，而其他进程（线程）获取“控制权”失败，只能重新进入休眠状态，这种现象和性能浪费就叫做惊群效应。

### 3、<b>http块</b>：

可以嵌套多个<b>server</b>，<b>配置代理</b>，<b>缓存</b>，<b>日志定义</b>等绝大多数功能和第三方模块的配置。如文件引入，mime-type定义，日志自定义，是否使用sendfile传输文件，连接超时时间，单连接请求数等。

http模块从外到内有http块、server块、location块，同时各个模块有各自的属性元素。

- http块：即一个http处理模块，可进行http的相关参数配置，内可以包含多个server块；
- server块：即是一个虚拟主机，需配置域名和端口，也只处理对应主机域名的http请求，内可包含多个location块；
- location块：配置<b>请求的路由</b>，以及<b>各种页面的处理情况</b>。

```go
http{
    server{
        location {
        }
        location {
        }
    }
    server{
        location {        
        }
        location {
        }
    }
}
```

#### <b>3.1 upstream</b>

定义上游服务器集群，在反向代理中proxy_pass使用，用于负载均衡。如：
```nginx
upstream backend{
    ip_hash; # 当希望某一请求固定到指定上游服务器上，可以在upstream块中加ip_hash关键字。
    server 192.168.0.1; # server后可以是域名、ip地址或加端口;
    server 192.168.0.2:8080;
    server 192.168.0.3 max_fails=5 fail_timeout=30s; # 配置在指定时间内失败多少次，上器服务器不可用，可用配置fail_timeout(失败时间，默认为10秒)，max_fails(失败次数，默认为1，若为0，则不检查失败)。
    server 192.168.0.4 down; # 当某server不使用时，则在后加 down 关键字;
    server 192.168.0.5 weight=10;#若希望某一服务器处理更多请求，则可以在后加权重 weight ，如weight=10，默认值为1(不能与ip_hash同时使用);
}
server {
    location /{
        proxy_pass http://backend;
    }
}
```

# 应用实例

在同一台电脑上跑前端和后端项目，node不允许设置在同一个端口（或者有其他解决方法？）。设不同端口会报错跨域。可以使用nginx配置反向代理。

```nginx
worker_processes  1;
events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;
    server{
        listen 8089; # 端口无特殊意义
        server_name 127.0.0.1;
        location / {
            proxy_pass   http://localhost:3000;# 前端端口
        }
        location /api { #后台接口
            proxy_pass   http://localhost:30031;# 后端端口
        }
    }
}
```

除了sever都是默认配置

开启nginx服务后浏览器访问http:localhost:8089 显示前端页面。前端访问http:localhost:8089/api可以fetch后端数据。

不足：node启动后端口仍为默认3000。在package.json中配置start 的端口为8089 则会与nginx冲突，需要在浏览器手动选择8089端口。

