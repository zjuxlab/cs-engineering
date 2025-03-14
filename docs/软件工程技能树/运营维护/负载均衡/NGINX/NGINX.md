---
title: NGINX
slug: NGINX
sidebar_position: 0
---


# NGINX

Author：颜戈凯

# 前言

> 后文的HTTP很多时候其实指的是HTTP/HTTPS

# 实验准备

## 环境

> ubuntu22.04

## 软件

> Nginx
> Golang/Node.js（用于起后端）

## 知识

> 什么是网络请求
> 什么是localhost
> 为什么需要localhost
> Linux基本命令：
> 1. cd
> 2. ls
> 3. ls -alh
> 4. apt install
> 5. sudo
> 6. ln -s
> vim基本命令：
> 1. 插入：i
> 2. 查找：esc+:/+regex
> 3. 保存并推出：esc+:wq

# 理论准备

## 什么是Nginx

> 1. 它是一个软件
> 2. 它用于HTTP/HTTPS请求的转发

## 为什么选择Nginx

> 真要说的话，我开始学的时候，直接就被推荐了`nginx`
> 具体而言
> 1. 轻量化，它小
> 2. 性能高，它对于请求的处理速度非常快
> 3. 可扩展性高，可以给他加插件（模块），就像vscode一样，可以玩得很花
> 4. 简单易懂，在有人给你讲的基础上，单纯的抄配置还是很简单的

## 二律背反

1. 我们为什么需要请求的转发

> 一般的场景下，我们确实没有这个需求，最朴素的解决方案，就是让你期望互联网能访问到的程序监听`80`端口，然后在防火墙层（可能会有多个），打开`80`端口的`入`。当然，如果你选择使用别的端口号也可以，这在`IP`直接访问的情况下是没有什么区别的，毕竟就是将`IP`后置的默认端口号改了一下嘛，但是在使用域名访问的时候，使用其他的端口号就会显得十分的不优雅，毕竟你从没有见过哪个网站既要记住一个域名，还要记住一个端口号的。

> 当然，也可以让域名直接指向一个自定的端口号，但是那样会比较麻烦，这里不多介绍。（网查关键词：域名解析+其他端口）

1. 我们为什么需要请求的转发

> 考虑服务器的场景，一台服务器上会有无数多个服务，也会有无数多个域名指向了这台服务器，但是很可惜，一个域名的默认端口是`80`或者`443`，但是一个端口后面只能有一个程序在监听，这就产生了矛盾。一个朴素的，容易想到的方法就是，搞一个统一的软件监听这个端口，然后把相应的请求转发给相应的程序，这里就需要利用到`localhost`，即`127.0.0.1`

1. 我们为什么需要请求的转发

> 你知道或许不知道，官网编译完就是一个文件夹，实际上，你在访问`Xlab`官网就是在通过一定规则（写在JS里面）访问这个文件夹。这听起来没什么问题是吧，但你要考虑到，从一个网络请求映射到一个文件可不是什么自动的事情，这就是`Static Server`组在做的事情。同时，它也会带来一些严重的安全问题：你总不希望自己的目录对于网络是透明的吧。

> 使用nginx可以自动化静态部署的流程。

1. 我们为什么需要请求的转发

> 在计算机里面有个简单的原理，如果我们想要添加一个功能，我们可以添加一个层，nginx就是在服务与请求中间的一层，有了这一层，我们就可以对请求进行更细致的操作，进行更多的自定义化操作，而不是将这一行为写在一个后端或者前端程序里面，比如`负载均衡`、`防止爬虫`、`IP池`、`数据统计`，我们当然不希望在写后端前端的时候还要管这件事情。

## Nginx中的一些概念

1. nginx使用配置文件管理HTTP请求的转发逻辑

> 也就是说，写nginx本质上是写配置文件

1. nginx支持热更新

> 也就是说，不会因为你改了配置文件，某些重要服务需要下线一段时间等待nginx重启

1. nginx自带了语法检查

> 你总不希望写错了一条语句，导致了所有服务全部无法访问吧

# 实验流程

## 安装Nginx

```bash
sudo apt install nginx
```

> 我们前面提到了，nginx具有可拓展性，这体现在它自己众多的插件上，但是这里却使用了`apt`的自动安装，所以，您需要查一下，这一步的安装到底装了哪些`默认`插件。

## 检查Nginx目录

```bash
cd /etc/nginx
ls
```

> 我们期望看到以下目录（当然，有图形化界面就更好了）

```bash
conf.d          koi-win            nginx.conf       sites-enabled
fastcgi.conf    mime.types         proxy_params     snippets
fastcgi_params  modules-available  scgi_params      uwsgi_params
koi-utf         modules-enabled    sites-available  win-utf
```

> 主要注意的是`conf.d`，`sites-available`，`sites-enabled`这三个文件夹，以及`nginx.conf`文件

```bash
vim nginx.conf
```

> 我们先看`nginx.conf`，具体文件内容我就不贴了，我们主要关注`include`，`*_log`这两个关键词

> 看这个文件结构，其实非常像json格式，毕竟配置文件的语法基本就长这样，嵌套这考虑就可以了

> 所谓的`include`，和`c`中的`include`一样，是将后接文件的所有内容`直接`替换掉include这一行，所以，这很明显是一种配置文件分文件夹的手段，以防出现嵌套地狱。

> `*_log`有两条`access_log`和`error_log`，顾名思义，这就是个存放log的地方，用于调试，或者监控（虽然我们一般不这么调试）

> 其他的字段需要诸位自己探索

```bash
ls conf.d
ls sites-available
ls sites-enabled
ls -alh sites-enabled
```

> 我们发现，`conf.d`里面啥都没有，而剩下两个文件夹里面都是一个叫`default`的文件，但是`enabled`文件夹里面是绿色的，那么我们通过最后一条命令发现，其实`enabled`中的文件是`available`的软链接（网查关键词：软链接），因此，我们需要看的文件就一个

```bash
vim sites-avaiable/default
```

> 文件太长就不贴了，这里面给出了`nginx`的教程地址，也给出了你本地的`examples`地址，所以，很明显，这个文件就是我们这次实验要抄的文件。

> 那么为什么需要分出`sites-available`和`sites-enabled`文件夹，见补充思考

> 文件中给出的是一个静态部署的配置，`server`字段表示开启一个服务，`listen`字段表示监听端口，`server_name`字段表示监听域名，那么实际上是匹配`host`这个`header`。由于这个是静态部署嘛，所以`nginx`干的实际上是请求到地址的映射，而这边的地址显然用相对地址比起绝对地址更好，而`root`字段就是这个相对地址的基值。

> 那么匹配完了`host`，还没有匹配`path`呢，`location`这个字段就是干这行的，后面跟着一个`regex`语句（网查关键词：正则匹配），然后用`{}`标志着接下来的逻辑，`try_files`代表了这是一个静态部署。

## 配置实践

```bash
cd /etc/nginx/sites-available
vim 000-webtest
server {
        server_name xlab-idc-test;

        location /api/ {
            proxy_pass http://localhost:7985/;
        }
        
        location / {
                root /var/www/official-website;
                try_files $uri $uri/ =404;
        }
}
cd /etc/nginx/sites-enabled
ln -s ./000-webtest ../sites-available/000-webtest
```

> 这段配置是我们官网的配置，这里遇见了`proxy_pass`字段，这就是一个转发了。

> 那么你们可以怎么使用这个配置呢，随手抄一个`html`文件，命名为`index.html`放在`/var/www/official-website/`下面；把`xlab-idc-test`改成自己的`ip`，然后开始做语法检查与热重启

```bash
sudo nginx -t
sudo nginx -s reload
```

> 前者语法检查，后者热重启，记得得先过了语法检查再热重启

> 这样之后，理论上来说，你用手机在同一个网段访问你电脑的`ip`就能直接显示出你抄的那段`html`内容了

## 补充理论

1. 为什么需要分出`sites-available`和`sites-enabled`文件夹，有`conf.d`不够嘛

> 答案当然是不够的，这里需要考虑到紧急下线服务的情景，简单的想，当然是备份一下，然后把配置文件删掉吧，那么备份到哪呢，同一个文件目录都被`include`了，放在别的地方就没有别人知道了，因此我们选择使用软链接的方式，这样子紧急下线服务就是单纯的删除一个软链接，在需要服务上线的时候，将软链接重新链接上就可以了。

## 进阶实践

> 通过上面的配置文件，你可能会发现，nginx有一些自带变量，比如说`$uri`，那么其实还有不少东西，而花活的源泉也来自于此

> 常用的有`$uri`，`$host`之类的，然后还有一些可以设置的参数，在`server`里面

> 例如`proxy_set_header`，比如在`server`中我们常常设置`proxy_set_header Host $host`，同时，我们也会在这个里面尝试添加nginx转发留痕的工作，比如以下配置

```bash
# standard header
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Host $host:$server_port;
proxy_set_header X-Forwarded-Proto $scheme;

# custom header
proxy_set_header X-Original-URI $request_uri;
proxy_set_header X-Original-Host $host:$server_port;
proxy_set_header X-Original-Proto $scheme;
proxy_set_header X-Request-ID "$connection-$request_id";

# legacy
proxy_set_header X-Scheme $scheme;
proxy_set_header Front-End-Https $https_status;
proxy_set_header X-HTTPS $https_status;
```

> 然后这里再提到一些可能用到的`key`
> 1. Rewrite
> 2. Deny
> 3. Alias
> 4. If语法
> 5. upstream写法以获得更多的连接配置
> 6. try_files语法逻辑

## 花活介绍

1. 内网拟真多域名

> 在写这篇文章的时候，xlab还没有多域名，但是这对于部署来说，会带来很多的困难，于是我尝试通过内网拟真多域名来解决这个问题

> 原理，两层nginx转发，第一层nginx设置自定义的host转发到第二层nginx，那么第二层nginx就匹配这个host

1. ip池

来补充一下？或者直接引用链接

# 一些建议

> 静态服务放在 /var/www/下
> 动态服务用docker打包，配置文件放在/opt/docker-compose下
> 一些功能静态页面放在/var/www/html/下
> 一些常用参数放在/etc/nginx/目录下，见他自带的proxy_params

# 思考题

1. 直接使用`apt`安装`nginx`会安装哪些插件，如何安装其他的插件
2. 解释`nginx.conf`中的其他字段
3. 查补充理论中的字段
4. 查nginx内置变量表
5. 研究怎么做到nginx转发留痕
6. 探讨为什么后端需要转发在`/api`路径下
7. 探讨`location /api`和`location /api/`的区别

