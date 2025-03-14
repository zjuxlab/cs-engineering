---
title: Zotero
slug: Zotero
sidebar_position: 0
---


# Zotero

Author：NA

Zotero是一个开源的跨平台的论文管理工具，如果还在担心总是忘记要看的文档存在哪里，不妨来使用Zotero帮忙管理。

# <b>基础功能</b>

## <b>文献管理</b>

![](/assets/UxlAb4Fbmo8Hnsx7J6xcJ9kunxg.png)

- 与其他文献管理软件类似，Zotero也带有查询doi、作者等功能
- 同时，可以使用网盘或者Zotero自带的云同步进行文献同步
- 在已知doi或者url的时候也可以直接在红框功能栏部分进行添加

## 文献搜索引擎

很多时候，我们也许知道了一篇文章的doi，但有的数据库学校并没有购买，这时候，我们可能需要辗转多个数据库来找一篇可用的。不过我们可以通过设置Zotero内的文献搜索引擎来帮助快速从多个数据库网站上进行查询下载。

通过Edit-&gt;Preferences-&gt;Advanced-&gt;Show Data Directory，我们可以来到Zotero的文献存储文件夹。在Locate下的engines.json则放置着可以定义的文献检索网站。

```json
{
        "_name": "Sci-Hub DOI",
        "_alias": "Sci-Hub DOI",
        "_description": "SciHub Lookup Lookup",
        "_icon": "https://figurebed-iseex.oss-cn-hangzhou.aliyuncs.com/img/20201016200912.png",
        "_hidden": false,
        "_urlTemplate": "http://sci-hub.se/{z:DOI}",
        "_urlParams": [],
        "_urlNamespaces": {
        "z": "http://www.zotero.org/namespaces/openSearch#"
        },
        "_iconSourceURI": "https://figurebed-iseex.oss-cn-hangzhou.aliyuncs.com/img/20201016200912.png"
    }
```

比如可以使用这段来添加一个Sci-hub的doi检索方式。

## 功能插件

- Zotero Connector

当然，Zotero必不可少的还有各个浏览器和word同步支持的插件，可以实现即查即加，实现查看文献流水线进程。

- Pdf Translator

如其名，在Zotero中安装此工具后，可以实现边看边文献学英语的效果。再也不用担心因为英文差看不懂了。

