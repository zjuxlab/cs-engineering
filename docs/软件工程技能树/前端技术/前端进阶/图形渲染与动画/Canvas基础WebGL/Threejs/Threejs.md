---
title: Three.js
slug: Three.js
sidebar_position: 1
---


# Three.js

Author：NA

# 简介

Three.js是对WebGL的封装语言，能够轻松方便地在一个canvas上进行编程，从而得到一个3D渲染结果。

虽然WebGL技术还不是很成熟，但是能够应对许多问题，而且可移植性强，应该是一个未来的发展趋势

# WebGL基础

在这个官方文档里给出了webGL的一些基础接口。当然，这不是我们的重点。

## 浏览器兼容性

WebGL对浏览器有一定的要求，简要概括如下：

![](/assets/YLDEbfQ7gor5rvxf25gcRMwSnWc.png)

目前大多数前沿浏览器均能支持

针对部分手机端低版本浏览器无法显示的问题，可以用腾讯x5内核的浏览器（比如微信webView）来支持

# 安装

```bash
npm install three
```

使用npm安装即可，在对应的页面，可以使用

```js
import * as Three from 'three'
```

来使用Three.js的基本功能

# 选定canvas

```html
<div id="StlContainer"></div>
```

```js
let container = document.getElementById("StlContainer");
```

如上方代码所示，我们选择一个区域作为我们的3D展示区域（注意一定要确定高度与宽度），并在js代码中用getElementById来获取。

# 新建渲染器

```js
const renderer = new Three.WebGLRenderer({ antialias: true });//添加抗锯齿
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.shadowMap.enabled = true;//开阴影
renderer.shadowMap.type = Three.BasicShadowMap;
/*
其他内容
*/
container.appendChild(renderer.domElement);
```

我们新建一个渲染器后，在container里添加该渲染器

# 相机与场景

我们知道，构建一个3D渲染画面必不可少的就是相机和场景，场景确定了虚拟空间内对象的位置关系等信息，而相机则确定了我们从哪个视角来获取场景信息。

我们这里使用透视相机，能够实现近大远小的效果

```js
const camera = new Three.PerspectiveCamera(
70,//field of view，可见区，控制相机的视野大小
container.clientWidth / container.clientHeight,//视野宽高比例
0.01,//near plane
1000//far plane
);
//这里设置相机位置
camera.position.z = 330;
camera.position.y=20;
//

const scene = new Three.Scene();

scene.background = new Three.Color('#E4E2DE')//设置场景背景色
/*
光、模型等信息
*/
renderer.render(scene,camera);//开始渲染
```

# 模型导入

这里要介绍几种常见的模型格式文件：

- STL文件
    - 仅包含了三角面信息的文件，相当于只能表示这个模型的形状长什么样

- OBJ文件
    - 包含了三角面信息和uv映射信息的文件，可以搭配mtl材质文件和贴图文件使用。
    - uv映射也就是告诉我们顶点应当对应贴图中的哪个像素，法线贴图等也是如此

```js
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'
const loader=new STLLoader();
loader.load(url,function(stl){
    const model = stl
}
```

# 材质导入(obj文件)/使用默认材质

我们可以使用MTLLoader来导入mtl文件，与obj文件配套使用，作为我们的材质。

但是，由于STL文件没有uv映射信息，所以我们只能采用默认材质

这里有几种默认材质

- MeshLambertMaterial：朗博漫反射材质，较为粗糙

![](/assets/WEWTbRN6so8lywxUxATcoYafn4d.png)

- MeshPhongMaterial：冯材质，会有明显的高光点

![](/assets/PDHGb2wZkowutdxN9tKcDo5dnpT.png)

- MeshToonMaterial：卡通材质，不必多说

![](/assets/XwgybC0ZaoEPXzxYuoBctDDlnGO.png)

- MeshNormalMaterial：仅与三角面法线有关，一般不会用在现实场景里

![](/assets/VHU0bRuHXoVAOSxmNTjcUF0Ankh.png)

这里我们选择朗博材质，我们添加了射线贴图和光照贴图（其实就一种颜色，因为是STL）

```js
const material = new Three.MeshLambertMaterial(
     {
         color:0xffffff,
         emissiveMap:texture,
         emissiveIntensity:0.1,
         lightMap:texture,
         lightMapIntensity:0.1,
     }
 );
```

用材质和STL文件一起构建mesh，

```js
mesh = new Three.Mesh(model, material);
mesh.receiveShadow = true;//开阴影
scene.add(mesh);
```

# 打光

神说要有光，我们必须打光才能看见我们的模型，因此Three.js预设了几种灯光

- HemisphereLight:半球光（天空盒光），相当于在整个模型上方有一个半球发光体，能够很好地模拟自然光（就像楚门的世界一样）
- AmbientLight：环境光，模拟的是自然环境下的各种细微漫反射的结果，相当于每个物体每个角落都有那么一个小光源
- SpotLight：聚光灯，以一个圆面出发的灯光，类似现实里的聚光灯

要设置的基本就只有灯光向量、灯光颜色、灯光强度

```js
const spotLight=new Three.SpotLight(0xFFF0EE,0.4)
spotLight.position.set(-100,400,-30)
scene.add(spotLight)
```

# transition

对于我们的模型，可以通过重新设置mesh.rotation和mesh.position来进行平移、旋转操作

```js
mesh.rotation.y += 0.01;
mesh.rotation.x+=0.01;
```

# 动画

我们现在想让这个模型自动旋转，很朴素的一个想法就是随着时间变化，更改mesh的rotation值。

如果我们采用朴素的`setInterval(()=>{},time)` 会发现Three.js会整体重新加载，占用大量时间，导致如果我们想要渲染速度跟得上setInterval的频率，就不得不将time设置地很大，从而会有明显的掉帧感

这里我们如果要产生很流畅的动画，不给人有掉帧的感觉，要怎么处理呢

我们要使用h5的requestAnimationFrame()函数，这个函数会把每一帧中的所有DOM操作集中起来，在一次重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率，同时，在隐藏或不可见的元素中，requestAnimationFrame将不会进行重绘或回流，这当然就意味着更少的的cpu，gpu和内存使用量。

具体写法有点类似递归

```js
function animate() {

    requestAnimationFrame(animate);
    mesh=mesh

    mesh.rotation.y += 0.01;
    mesh.rotation.x+=0.01;
    renderer.render(scene, camera);

}
animate()
```

# 自定义shader

我写顺产网页的时候看到设计稿骨盆模型是长这样的：

![](/assets/UKq9bL63Go9Titx25TRcMcbTnck.png)

它很像NormalMaterial，但是又不是那个颜色，那咋办呢

于是我上网找了NormalMaterial的Shader实现形式，根据设计稿的颜色范围，自定义了一个ShaderMaterial

```js
var material=new Three.ShaderMaterial({
    vertexShader: `
    varying vec3 vNormal;
    void main() {
            //将attributes的normal通过varying赋值给了向量vNormal
        vNormal = normal;
            //projectionMatrix是投影变换矩阵 modelViewMatrix是相机坐标系的变换矩阵 最后我们将y值乘以1.4得到了一个形如鸡蛋的几何体
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position.x, position.y, position.z, 1.0 );
    }
    `,
    fragmentShader: `
        //片元着色器同样需要定义varying vec3 vNormal；
    varying vec3 vNormal;
    void main() {
        float pr = (vNormal.z*15.0 + 210.0) / 256.0; //pr红色通道值范围为0~1
        float pg = (vNormal.x*24.0 + 178.0) / 256.0; //pg绿色通道值范围为0~1
        float pb = (vNormal.y*27.0 + 174.0) / 256.0; //pb蓝色通道值范围为0~1
        gl_FragColor=vec4(pr, pg, pb, 1.0); //最后设置顶点颜色，点与点之间会自动插值
    }
    `
})
```

这里算是js套用了glsl语言

![](/assets/AkxMbDs4goghKnxVj8nceecFnqb.png)

感觉效果还不错🎃

