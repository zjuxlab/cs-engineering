---
title: HTML 5
slug: HTML 5
<<<<<<< HEAD
sidebar_position: 0
=======
sidebar_position: 1
>>>>>>> 0ad3f6286ec5beaab9cca8122ad2d90d7cafec29
---


# HTML 5

<<<<<<< HEAD
2004年6月，在苹果、Mozilla、Opera等公司的开发者聚会上，一场针对W3C的"技术叛乱"正在酝酿。当时W3C（万维网联盟）正全力推进XHTML 2.0标准，这个严格而理想化的标准有一个致命问题——<b>它不向后兼容现有网页</b>。这意味着：

- 全球99%的网站需要重写
- 浏览器需要完全重新设计
- 开发者学习曲线陡峭

Ian Hickson（后来成为HTML5规范主要作者）当场画出了著名的<b>逆向兼容性曲线</b>，证明XHTML 2.0的采用成本将导致Web分裂。这次会议催生了WHATWG（Web Hypertext Application Technology Working Group），他们决定复兴HTML，制定新的HTML5标准。

### 2007-2012：标准与现实的拉锯战

这段时期被开发者称为"<b>前缀地狱</b>"，因为不同浏览器对实验性功能的实现各不相同：

```
/* 同一段CSS要写多个前缀 */
.animation {
  -webkit-transition: all 0.5s; /* Chrome/Safari */
  -moz-transition: all 0.5s;    /* Firefox */
  -ms-transition: all 0.5s;     /* IE */
  -o-transition: all 0.5s;      /* Opera */
  transition: all 0.5s;         /* 标准 */
}
```

<b>转折点</b>出现在2011年：

- 史蒂夫·乔布斯发表《Thoughts on Flash》，明确iOS将支持HTML5而非Flash
- 微软宣布IE9全面支持HTML5
- YouTube开始默认使用HTML5视频播放器

## 为什么现代Web必须拥抱HTML5？

1. 原生多媒体支持

对比传统方案：

```
<!-- Flash时代 -->
<object data="player.swf" type="application/x-shockwave-flash">
  <param name="movie" value="player.swf">
</object>

<!-- HTML5时代 -->
<video controls>
  <source src="movie.webm" type="video/webm">
  <source src="movie.mp4" type="video/mp4">
</video>
```

1. 引入多特性，详见字文档：HTML5新特性

=======
>>>>>>> 0ad3f6286ec5beaab9cca8122ad2d90d7cafec29
