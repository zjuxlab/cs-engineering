---
title: IE盒模型
slug: IE盒模型
sidebar_position: 1
---


# IE盒模型

Author:徐旻昶

IE盒模型也被称作怪异盒模型，其特点就是认为盒子的长宽是包括边框（`border`）及边框以内的所有内容（`padding`、`content`）的。

`width/height = content + padding + border`

![](/assets/MRDjbXkQjoABMpxuIaGcJdCenOc.png)

该例子与标准盒的例子仅改变了box-sizing的值

![](/assets/OPlZbD3hso0suqx88i8c0H2dnXd.png)

```html
<div class="web">
    <p class="text">文字文字文字文字文字文字文字文字文字</p>
  </div>
```

```css
.web {
  box-sizing: border-box;
  height: 100px;
  width: 10%;
  border: solid 40px blue;
}

.text {
  padding: 20px;
  width: fit-content;
}
```

可以看到border的40px和padding的20px把width的长度占满，content被挤了出去

