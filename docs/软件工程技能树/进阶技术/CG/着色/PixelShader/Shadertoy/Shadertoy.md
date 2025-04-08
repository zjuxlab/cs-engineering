---
title: Shadertoy
slug: Shadertoy
sidebar_position: 0
---


# Shadertoy

Author: 陈儒

## 前置知识

你不需要任何的图形学知识，只需要一点线性代数就行了。

## 简介

接触图形学的同学肯定会碰到shader这一概念，shader（着色器）是一段程序，用于渲染，按照作用对象的不同，分为vertex shader（顶点着色器）和pixel shader（像素着色器）。

今天介绍的shadertoy就是基于pixel shader搭建的一个开源网站，用户们可以在上面分享和实践各种实时渲染动画。Shadertoy是一个非常好的学习图形学的工具，它基本上不依赖建模，模型基本由数学公式及距离场产生。

> 相关链接：https://www.shadertoy.com/

> shadertoy是一个基于 pixel shaders的在线玩具
> 对于pixel shaders，不同于传统意义上的shader,传统意义上的shader是根据GPU渲染管线，从cpu把图元传递到顶点着色，在通过varing传递给片元，从而处理光照的。所以顶点着色器是每个顶点运行一次，而片元着色器是每个片元(像素）运行一次。而pixel shaders中你可以理解成只是相当于在opengl中只对片元着色(fragment)进行编程，你可以想象成是一个canvas画布。

正如上面这段话所言，shadertoy的mainImage函数就是它的最终输出，它的输入是一个二维向量fragCoord，表示当前定位的是图片的(x,y)像素点，输出则是一个四维向量fragColor，表示这个像素的rgba值，说白了，你就是写一个函数来告诉计算机每个像素点该生成什么颜色。

```openglshadinglanguage
void mainImage(out vec4 fragColor,in vec2 fragCoord){
    fragColor=vec4(vec3(0.),1.);
}
```

上述代码会生成一片黑色

## Inigo Quilez

提到shadertoy那就不得不提到非常牛逼的大神IQ，他是一个西班牙人，也是shadertoy的合作创始人。在他的博客里有非常多的sdf函数、近似算法、滤波操作等等，接下来我们要用到的很多函数就来自他的博客（链接：https://iquilezles.org/，https://www.youtube.com/@InigoQuilez）

他的许多作品都是不依赖建模，而是靠数学函数以及交并补运算来获得，最神奇的就是这个用数学函数做的Selfie Girl，我在参加稀土掘金的shadertoy赛道比赛时就是参考的这个视频（链接：https://www.youtube.com/watch?v=8--5LwHRhjk，https://www.shadertoy.com/view/WsSBzh）

![](/assets/SZjdbpmzkoQUY0x2zsdc8X8OnLe.png)

  

## 环境配置

![](/assets/AemRbN9JmontnHxcwUGc1DGDnBf.png)

Shadertoy是提供了在线编辑和在线预览功能的，所以理论上来说不需要配环境，但是离线的性能更好一点，所以还是推荐在VSCODE里搜索插件shadertoy即可

![](/assets/Ca4ObMCPEo4yvYxIY6scCIwAnkI.png)

新建一个.glsl文件，写入main函数，右键选择Show GLSL Preview即可在右部窗口看见我们的预览。

![](/assets/VJ3hbh7OMoMftHx9iyEc65bRnih.png)

## 2d基础操作

### 坐标转换

通常情况下，我们如果直接使用像素坐标，很难直观地获取我们想要的数据，因此我们需要对像素坐标fragCoord进行处理，shadertoy内置了变量iResolution，它是一个二维向量，用于表示屏幕的宽与高，因此，以2:3的canvas为例，我们进行如下计算，便可让输出坐标中，(1,1.5)表示右上角，(-1,-1.5)表示左下角。

```openglshadinglanguage
vec2 fixUV(in vec2 c){
    return (2.*c-iResolution.xy)/min(iResolution.x,iResolution.y);
}
```

![](/assets/X5V1bTJ97oqElNxaEB9cXuklnBd.png)

（上述只是参考示意图，并不是真正效果）

所以，我们可以使用一些初等基本函数来帮助我们绘制简单的图形

```openglshadinglanguage
vec2 fixUV(in vec2 c){
    return (2.*c-iResolution.xy)/min(iResolution.x,iResolution.y);
}
void mainImage(out vec4 fragColor,in vec2 fragCoord){
    vec2 uv=fixUV(fragCoord);
    fragColor=vec4(vec3(uv,1),1.);

}
```

![](/assets/ACMhbhrd2oTHBbxpZTFcAdCbn7e.png)

思考一下为什么会长这样

```openglshadinglanguage
vec2 fixUV(in vec2 c){
    return (2.*c-iResolution.xy)/min(iResolution.x,iResolution.y);
}
void mainImage(out vec4 fragColor,in vec2 fragCoord){
    vec2 uv=fixUV(fragCoord);
    float c=0.;
    if(uv.x*uv.x+uv.y*uv.y<1.){
        c=1.;
    }
    fragColor=vec4(vec3(c),1);
}
```

![](/assets/HIw3br8LVoauIoxxSQHchsFFnze.png)

上述为圆$x^2+y^2=1$的表示法，如果在圆内，则刷上白色，否则为黑色。

### 内置函数运算

#### clamp(a,b,x)

x&lt;a则返回a,x&gt;b则返回b,否则返回x

用法：可以将x限制在某一范围内

#### smoothstep(a,b,x)

使用线性插值，如果x&lt;a则返回0，x&gt;b则返回1，否则返回[a,b]上的x三次插值函数，值域为[0,1]

用法：因为返回的是三次插值函数，所以可以用于消除边缘锯齿

如上图所示，圆的边缘是存在锯齿的，如果我们这样写

```openglshadinglanguage
vec2 fixUV(in vec2 c){
    return (2.*c-iResolution.xy)/min(iResolution.x,iResolution.y);
}
void mainImage(out vec4 fragColor,in vec2 fragCoord){
    vec2 uv=fixUV(fragCoord);
    float c=smoothstep(1.,0.97,uv.x*uv.x+uv.y*uv.y);
    fragColor=vec4(vec3(c),1);
}
```

就可以让边缘更加光滑，成功消除了锯齿

![](/assets/Xh1gbi7cvopaR1xKAIAcNx2onfg.png)

#### mix(float x, float y, float a) 

返回线性插值x×(1−a)+y×a

### 2d距离函数

在shadertoy 3d中，我们是靠距离场来判断当前像素点是否会触碰到物体的，因此我们先来掌握2d图像中的距离函数。

某物体的距离函数sdf的意思就是当前点距离该物体的最短距离

以圆为例，

我们可以将上述代码修改为

```openglshadinglanguage
vec2 fixUV(in vec2 c){
    return (2.*c-iResolution.xy)/min(iResolution.x,iResolution.y);
}
float sdCircle(in vec2 x,float r){
    return length(x)-r;
}
void mainImage(out vec4 fragColor,in vec2 fragCoord){
    vec2 uv=fixUV(fragCoord);
    vec3 c=1.+sign(sdCircle(uv,1.))*vec3(1.,1.,1.);
    
    fragColor=vec4(c,1);
}
```

其中sdCircle就代表我们的圆的距离函数

## 3d基础操作

### 透视摄像头

大家都知道我们肉眼看物体遵循近大远小的规则，这是与我们人眼构造相关的。透视摄像头就是把我们的屏幕作为一个平面，也就是人眼，将不同方向的光与摄像头中心进行连线，并投影在这个平面上。而采用平行线进行投影的叫做正交摄像头，一般用于UI制作。

我们的shadertoy 3d也是采用的透视摄像头，下面我们来看一看正交摄像头视角下是怎样确定当前像素点应该显示什么颜色的。

![](/assets/VZb2bqDvDoGChTxdjLgcfgRvnTd.png)

如上图所示，我们确定一个点作为相机的中心，然后从这个相机出发，对屏幕上各个像素点进行连线，并延长至物体上，记为View Ray，物体对应的点经过光线漫反射，在ViewRay反方向上的光线颜色，即为该像素点的颜色

### 距离场

SDF是Signed-distance-field的简写，译作有向距离场，它是一个记录空间任意一点到模型表面的最小距离的函数。 

例如球体的距离场函数为

```openglshadinglanguage
float sdfSphere(vec3 p, vec3 o,float r){// p 为任意点，o为球心，r为半径
    return length(p-o)-r;
}
```

长方体的距离场函数为

```openglshadinglanguage
float sdBox( vec3 p, vec3 b ){//b为(x,y,z)方向上对应的长度，假设原点为(0,0,0)
  vec3 q = abs(p) - b;
  return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0);
}
```

有了透视摄像机与距离场的概念，我们便可以进行下一步探索：如何知道我的像素点上看到的是哪个图形呢，这就要用到Ray marching技术了

### Ray marching（光线步进）

![](/assets/SEGHb0xFQorRmFxzjCYc1dlKndh.png)

如图所示，假设我们已经知道了camera和Image的关系，现在我们假设已知光源打在球体表面所产生的的漫反射光与球体表面位置的关系，那么只要知道摄像机与Image上像素点的连线（我们称之为View Ray）会落在物体的哪个点上就行了，那么我们如何获取这个点呢？。

![](/assets/EW2rbtdAuox1jBxr12hcsCbgn6b.png)

这就要用到我们的光线步进方法了，如上图所示，我们想要在屏幕上获得每一个点的颜色值，比如说图中屏幕上的P点，很直观的想法是，从摄像头出发，与P点连成一条线，并打到这个球面上，获取这条射线的方向向量很容易，记为v，但是这个方向具体走多远才能到达这个球面呢，我们无法直观地计算出来，但是我们可以通过sdf函数轻松地获得屏幕上任意一个点到这个物体的距离最小值。

于是我们从P点出发，获得了到球心的最短距离为l1，于是以P+l1*v，即P1点作为我们的下一个步进点，继续获取最短距离l2，像这样循环往复，直到与球体的最短距离小于一个精度值，那么把之前的距离加起来，就是P沿着向量v到球面的距离了。

对于无法到达球面的点，如上图中的Q点，也是一样，只不过射线会随着步进逐步远离球体，直到达到我们的最大迭代距离。

```openglshadinglanguage
//PRESICION为最小精度，TMAX为最大迭代距离
//sdfSphere为球体sdf公式,ro为摄像机原点，rd为View Ray 方向向量
float Ray_march(in vec3 ro,in vec3 rd){
    float t=TMIN;
    for(int i=0;i<RAYMARCH_TIME&&t<TMAX;i++){
        vec3 p=ro+t*rd;
        float d=sdfSphere(p);
        if(d<PRESICION)break;
        t+=d;
    }
    return t;
}
```

### camera与坐标系转换

我们知道，当摄像机的位置发生变化时，如果以摄像机为参考系，那么其他物体的相对坐标就会发生变化，因此我们需要用到线性代数与解析几何学的知识，来对我们的坐标系进行变换。

从2D到3D转换的视角来看，我们习惯于以屏幕宽度为X轴，高度为Y轴，那么3D空间内的Z轴，就是从屏幕向里看过去。所以当我们固定相机位置ro，并固定相机看向的物体的位置ta，便可以以向量ta-ro作为z'轴，这是显然的，从物体到摄像机的射线很自然而然地对应了下方的Z轴。之后，我们确定一个旋转角度r，那么取这个`sin(r),cos(r),0` 与z'的叉积，作为我们的x'轴，再取x'与z'的叉积，作为y'轴，即可获得新坐标系的三个方向向量在原坐标系下的坐标值，记为矩阵c=[x,y,z]

```openglshadinglanguage
//normalize为向量单位化函数 
mat3 setCamera(vec3 ta,vec3 ro,float cr){
    vec3 z=normalize(ta-ro);
    vec3 cp=vec3(sin(cr),cos(cr),0.);
    vec3 x=normalize(cross(z,cp));
    vec3 y=cross(x,z);
    return mat3(x,y,z);
}
```

![](/assets/L7ThbR04hoB7yTxJQpwcNnLInpc.png)

那么我们要怎样从相机上的坐标$
{O',x',y',z'}$反推回原来的坐标轴$
{O,x,y,z}$变为呢，若记前后坐标系向量分别为$e_1,e_2,e_3;e_1',e_2',e_3'$

那么就有

$$
 
\begin{equation}
\left\{
\begin{aligned}
e_1'=c_{11}e_1+c_{21}e_2+c_{31}e_3\\
e_2'=c_{12}e_1+c_{22}e_2+c_{32}e_3\\
e_3'=c_{13}e_1+c_{23}e_2+c_{33}e_3\\
\end{aligned}
\right.
\end{equation}$$

即：

$$\begin{equation}
        \begin{bmatrix}
e_{1}' & e_{2}'& e_{3}'
         \end{bmatrix}
=
\begin{bmatrix}
e_{1} & e_{2} &e_{3}
         \end{bmatrix}*C
\end{equation}$$

其中矩阵

$$\begin{equation}
C=
        \begin{bmatrix}
c_{11} &  c_{12} & c_{13} \\
  c_{21} &  c_{22} & c_{23} \\
c_{31} &  c_{32} & c_{33} \\
         \end{bmatrix}
\end{equation}$$

剩下的就是线性代数的知识了，不讲了qwq，总之，对应的原坐标xyz可以表示为

$$
 
\begin{equation}
\left\{
\begin{aligned}
x=c_{11}x'+c_{12}y'+c_{13}z'\\
y=c_{21}x'+c_{22}y'+c_{23}z'\\
z=c_{31}x'+c_{32}y'+c_{33}z'\\
\end{aligned}
\right.
\end{equation}$$

于是我们可以将设置camera的函数写为

```openglshadinglanguage
//ta即target，照相机看向哪个位置
//ro为照相机位置，cr为屏幕旋转角
//返回值为cam矩阵
mat3 setCamera(vec3 ta,vec3 ro,float cr){
    vec3 z=normalize(ta-ro);
    vec3 cp=vec3(sin(cr),cos(cr),0.);
    vec3 x=normalize(cross(z,cp));
    vec3 y=cross(x,z);
    return mat3(x,y,z);
}
```

调用：

```openglshadinglanguage
mat3 cam=setCamera(ta,ro,0.);//旋转角为0
vec3 rd=normalize(cam*vec3(uv,1.));//1为z轴坐标,rd即为相机与屏幕点uv连成的向量
```

### 光照

我们在ray marching中已经知道了view ray的距离t，因此对应的球体上的p点就是相机坐标ro+t*rd。假设我们有一个点光源light，并且给出了位置，那么很自然地可以得到light到p点的光线向量(light-p)。根据Lambert's Cosine Law(朗博余弦定理，https://en.wikipedia.org/wiki/Lambert%27s_cosine_law)，光源在某一点的漫反射光强与该点法线和光线夹角的余弦值成正比。

> 一个面元的辐亮度或光亮度在其表面上半球的所有方向相等时，则有 I(θ)=I(n)cosθ。式中，I(θ)和I(n)分别表示面元在 θ 角(与表面法线夹角)方向及其法线方向的辐射强度或光强度。

有关漫反射的内容可以看一下GAMES101里Lecture7的末尾部分（链接：https://www.bilibili.com/video/BV1X7411F744），这里就不细讲了。

所以我们只需要获得这个点的法线值即可。对于可以求出解析式的方程，求个导就行了，但是有很多函数并没有明确的解析式，解析法并不可行，于是我们可以利用导数的定义，取一个小量，用近似的方法来获得。

这里iq给出了一个函数，只需要把里面的f换成我们的sdf函数就能计算出这个点的法线向量值

```openglshadinglanguage
vec3 calcNormal( in vec3 p ) // for function f(p)
{
    const float eps = 0.0001; // or some other value
    const vec2 h = vec2(eps,0);
    return normalize( vec3(f(p+h.xyy) - f(p-h.xyy),
                           f(p+h.yxy) - f(p-h.yxy),
                           f(p+h.yyx) - f(p-h.yyx) ) );
}
```

令n=calcNormal(p),于是我们只需要计算出n与(light-p)的点积，即可表示这个点的颜色。

![](/assets/Hj6ZbnvPYoSeK9x11WjceX7GnVb.png)

有点像弦月

但是这样显然不太对，没有光的地方我们一点都看不见了，现实生活中是存在环境的漫反射光的，因此我们只需要给每一点加上一个环境光，也就是rgb最小值。

最后呢我们想要让这个阴影柔和一些，于是将最后的渲染值开根号即可

附上完整代码：

```openglshadinglanguage
#define TMIN 0.1
#define TMAX 20.
#define RAYMARCH_TIME 128
#define PRESICION .001

vec2 fixUV(in vec2 c){
    return (2.*c-iResolution.xy)/min(iResolution.x,iResolution.y);
}
float sdfSphere(in vec3 p){
    return length(p)-1.5;
}
vec3 calcNormal( in vec3 p ){
    const float h = 0.0001; // replace by an appropriate value
    const vec2 k = vec2(1,-1);
    return normalize( k.xyy*sdfSphere( p + k.xyy*h ) + 
                      k.yyx*sdfSphere( p + k.yyx*h ) + 
                      k.yxy*sdfSphere( p + k.yxy*h ) + 
                      k.xxx*sdfSphere( p + k.xxx*h ) );
}
float Ray_march(in vec3 ro,in vec3 rd){
    float t=TMIN;
    for(int i=0;i<RAYMARCH_TIME&&t<TMAX;i++){
        vec3 p=ro+t*rd;
        float d=sdfSphere(p);
        if(d<PRESICION)break;
        t+=d;
    }
    return t;
}
mat3 setCamera(vec3 ta,vec3 ro,float cr){
    vec3 z=normalize(ta-ro);
    vec3 cp=vec3(sin(cr),cos(cr),0.);
    vec3 x=normalize(cross(z,cp));
    vec3 y=cross(x,z);
    return mat3(x,y,z);
}
vec3 render(vec2 uv){
    vec3 col=vec3(0.);
    vec3 ro=vec3(2.*cos(iTime),1.5,2.*sin(iTime));
    vec3 ta=vec3(0.);
    mat3 cam=setCamera(ta,ro,0.);
    vec3 rd=normalize(cam*vec3(uv,1.));
    float t=Ray_march(ro,rd);
    if(t<TMAX){
        vec3 p=ro+t*rd;
        vec3 n=calcNormal(p);
        vec3 light=vec3(2.,.5,2.);
        float dif=clamp(dot(normalize(light-p),n),0.,1.);
        float amb=0.5+0.5*dot(n,vec3(0.,1.,0.));
        col=amb*vec3(0.23)+dif*vec3(1.);

    }
    return sqrt(col);
}
void mainImage(out vec4 fragColor,in vec2 fragCoord){
    vec3 col=vec3(0.);
    col=render(fixUV(fragCoord));
    fragColor=vec4(col,1.);
}
```

![](/assets/UeNZbRDdhoqVu0xGIBecCLHYnhf.png)

### 卷积超采样

上图中我们可以看到，边界存在着明显的锯齿，有没有什么办法能够改善呢？

我们可以采用卷积超采样的方法，在[x-1,x+1]×[y-1,y+1]范围内选取16个点的卷积核进行超采样，就可以将该图形的边界锯齿消除掉，产生更平滑的边界。

```openglshadinglanguage
#define M 4
void mainImage(out vec4 fragColor,in vec2 fragCoord){
    vec3 col=vec3(0.);
    for(int m=0;m<M;m++){
        for(int n=0;n<M;n++){
            vec2 offset=2.*(vec2(float(m),float(n))/float(M)-0.5);
            vec2 uv=fixUV(fragCoord+offset);
            col+=render(uv);
        }
    }    
    fragColor=vec4(col/16.,1.);
}
```

如上述代码所示，offset为偏移量，我们将得到的render值加起来，再除16即可。

### 软阴影


> 链接：https://iquilezles.org/articles/rmshadows/

在这篇文章中，iq提到了几种进阶的阴影模式，能够让我们的阴影更加平滑

在一般情况下，如果我们想要表示阴影，那么就以光线作为viewray，进行一次类似raymarch的操作，如果光线沿着这个方向能够达到物体，那么记为暗处，否则记为亮处。

```openglshadinglanguage
float shadow( in vec3 ro, in vec3 rd, float mint, float maxt )
{
    for( float t=mint; t<maxt; )
    {
        float h = map(ro + rd*t);
        if( h<0.001 )
            return 0.0;
        t += h;
    }
    return 1.0;
}
```

但是这样的阴影边界十分明显，我们需要更平滑的阴影，即：软阴影

![](/assets/IuRub8hP9ovOc7xo3wPcWTXznzb.png)

我们在运行上述代码时，同时使用到了h和t两个值，他们分别表示到物体的最短距离和当前光线步进的长度。我们只需要加上一行，对于距离物体边界非常近的光线，虽然h并不会=0，但是可以取h/t作为softshadow的值，这样对于距离边界比较近的光线，仍然能够有一个较小的值用于表示阴影，而非统一赋值为1

```openglshadinglanguage
float softshadow( in vec3 ro, in vec3 rd, float mint, float maxt, float k )
{
    float res = 1.0;
    for( float t=mint; t<maxt; )
    {
        float h = map(ro + rd*t);
        if( h<0.001 )
            return 0.0;
        res = min( res, k*h/t );
        t += h;
    }
    return res;
}
```

此外还有一种改进后的soft shadow模式，这里请自行阅读，我们就直接拿来用了

```openglshadinglanguage
float softshadow( in vec3 ro, in vec3 rd, float mint, float maxt, float k )
{
    float res = 1.0;
    float ph = 1e20;
    for( float t=mint; t<maxt; )
    {
        float h = map(ro + rd*t);
        if( h<0.001 )
            return 0.0;
        float y = h*h/(2.0*ph);
        float d = sqrt(h*h-y*y);
        res = min( res, k*d/max(0.0,t-y) );
        ph = h;
        t += h;
    }
    return res;
}
```

### 多物体map

正常情况下，我们的人眼会有一条视平线，在这条线以下的物体我们会看到它的上表面，在这条线以上的物体我们会看到它的下表面，而我们的地平线也设置为此处，因此，只要viewRay的y值大于0，我们就认为处于地平线上方，反之位于地平线下方

![](/assets/KJ7db25iJoEAu2xcJ3rcrr9onzf.png)

![](/assets/F03ob3pg7one87xOYhGc2CsZngh.png)

与之前的ray march不同，我们这次想要展现多个物体，因此必须对我们ray march到的物体用tag进行区分，我们使用一个二维数组，(x,y) x表示距离，y用于区分当前探测到的是哪个物体。

如果viewRay向下，那么我们预设该点为地面，并且将迭代最大距离tmax设为相机高度/cos值，也就是相机高度/viewRay.y。同时，距离我们越远的点颜色越深。

```openglshadinglanguage
vec2 Ray_march(in vec3 ro,in vec3 rd){
    float t=0.1;
    vec2 res=vec2(-1.);
    float tmax=40.;
    if(rd.y<0.){
        float tp=-ro.y/rd.y;
        tmax=min(tmax,-ro.y/rd.y);
        res=vec2(tp,1.);
    }
    for(int i=0;i<RAYMARCH_TIME&&t<tmax;i++){
        vec3 p=ro+t*rd;
        vec2 d=map(p);
        if(d.x<PRESICION){
            res=vec2(t,d.y);
            break;
        }
        t+=d.x;
    }
    return res;
}
```

同时我们将我们的sdf函数由单个物体变为多个物体的map函数，2表示球体，3表示立方体，opU则表示取两个sdf函数的最小值，这个很容易理解，因为我们这两个物体看作一个整体的话，到这个整体的最短距离就是到这两个物体的最短距离的最小值。

```openglshadinglanguage
vec2 opU(vec2 a,vec2 b){
    return a.x<b.x?a:b;
}
vec2 map(in vec3 p){
    vec2 d=vec2(sdfSphere(p-vec3(0.,1,0.)),2.);
    return opU(d,vec2(sdfrec(p-vec3(2.,1.,0.),vec3(1.,1.,1.)),3.));
}
```

在最后渲染时，我们依据不同的tag给出不同的底色

```openglshadinglanguage
if(t.y>0.){
        vec3 p=ro+t.x*rd;
        vec3 n=(t.y<1.1)?vec3(0.,1.,0.):calcNormal(p);
        vec3 light=vec3(5.,5.,0.);
        float dif=clamp(dot(normalize(light-p),n),0.,1.);
        p+=PRESICION*n;
        float st=soft_shadow(p,normalize(light-p),10.);
        dif*=st;
        float amb=0.5+0.5*dot(n,vec3(0.,1.,0.));
        vec3 c=vec3(0.);
        if(t.y>1.9&&t.y<2.1){
            c=vec3(1.,0.,0.);
        }else if(t.y>0.9&&t.y<1.1){
            c=vec3(0.1)+vec3(0.1);
        }else if(t.y>2.9&&t.y<3.1){
            c=vec3(1.,1.,0.);
        }
        col=amb*c+dif*vec3(.7);
        
    }
```

完整代码

```openglshadinglanguage
#define TMIN 0.1
#define TMAX 100.
#define RAYMARCH_TIME 128
#define PRESICION .001

vec2 fixUV(in vec2 c){
    return (2.*c-iResolution.xy)/min(iResolution.x,iResolution.y);
}
float sdfSphere(in vec3 p){
    return length(p)-1.;
}

float sdfrec(in vec3 p,vec3 b){
    vec3 d=abs(p)-b;
    return length(max(d,0.))+min(max(d.z,max(d.x,d.y)),0.);
}
vec2 opU(vec2 a,vec2 b){
    return a.x<b.x?a:b;
}
vec2 map(in vec3 p){
    vec2 d=vec2(sdfSphere(p-vec3(0.,1,0.)),2.);
    return opU(d,vec2(sdfrec(p-vec3(2.,1.,0.),vec3(1.,1.,1.)),3.));
}

vec3 calcNormal( in vec3 p ){
    const float h = 0.0001; // replace by an appropriate value
    const vec2 k = vec2(1,-1);
    return normalize( k.xyy*map( p + k.xyy*h ).x+ 
                      k.yyx*map( p + k.yyx*h ).x + 
                      k.yxy*map( p + k.yxy*h ).x + 
                      k.xxx*map( p + k.xxx*h ).x );
}
vec2 Ray_march(in vec3 ro,in vec3 rd){
    float t=0.1;
    vec2 res=vec2(-1.);
    float tmax=40.;
    if(rd.y<0.){
        float tp=-ro.y/rd.y;
        tmax=min(tmax,-ro.y/rd.y);
        res=vec2(tp,1.);
    }
    for(int i=0;i<RAYMARCH_TIME&&t<tmax;i++){
        vec3 p=ro+t*rd;
        vec2 d=map(p);
        if(d.x<PRESICION){
            res=vec2(t,d.y);
            break;
        }
        t+=d.x;
    }
    return res;
}
mat3 setCamera(vec3 ta,vec3 ro,float cr){
    vec3 z=normalize(ta-ro);
    vec3 cp=vec3(sin(cr),cos(cr),0.);
    vec3 x=normalize(cross(z,cp));
    vec3 y=cross(x,z);
    return mat3(x,y,z);
}
float soft_shadow(in vec3 ro, vec3 rd,float k){
    float res = 1.0;
    float ph = 1e20;
    float tmin=.1,tmax=10.;
    for( float t=tmin; t<tmax; ){
        float h = map(ro + rd*t).x;
        if( h<0.001 )
            return 0.0;
        float y = h*h/(2.0*ph);
        float d = sqrt(h*h-y*y);
        res = min( res, k*d/max(0.0,t-y) );
        ph = h;
        t += h;
    }
    return res;
}
vec3 render(vec2 uv,vec2 px,vec2 py){
    vec3 ro=vec3(4.*cos(.3*iTime),2.5,4.*sin(.3*iTime));
    vec3 ta=vec3(0.,1,0.);
    mat3 cam=setCamera(ta,ro,0.);
    float fl=1.;
    vec3 rd=normalize(cam*vec3(uv,fl));
    vec2 t=Ray_march(ro,rd);
    vec3 bg=vec3(.7,.7,.9);
    
    vec3 col=bg-rd.y*vec3(.1);
    if(t.y>0.){
        vec3 p=ro+t.x*rd;
        vec3 n=(t.y<1.1)?vec3(0.,1.,0.):calcNormal(p);
        vec3 light=vec3(5.,5.,0.);
        float dif=clamp(dot(normalize(light-p),n),0.,1.);
        p+=PRESICION*n;
        float st=soft_shadow(p,normalize(light-p),10.);
        dif*=st;
        float amb=0.5+0.5*dot(n,vec3(0.,1.,0.));
        vec3 c=vec3(0.);
        if(t.y>1.9&&t.y<2.1){
            c=vec3(1.,0.,0.);
        }else if(t.y>0.9&&t.y<1.1){
            c=vec3(0.1)+vec3(0.1);
        }else if(t.y>2.9&&t.y<3.1){
            c=vec3(1.,1.,0.);
        }
        col=amb*c+dif*vec3(.7);
        
    }
    return sqrt(col);
}
#define M 4
void mainImage(out vec4 fragColor,in vec2 fragCoord){
    vec3 col=vec3(0.);
    for(int m=0;m<M;m++){
        for(int n=0;n<M;n++){
            vec2 offset=2.*(vec2(float(m),float(n))/float(M)-0.5);
            vec2 uv=fixUV(fragCoord+offset);
            vec2 px=fixUV(fragCoord+vec2(1.,0.)+offset);
            vec2 py=fixUV(fragCoord+vec2(0.,1.)+offset);
            col+=render(uv,px,py);
        }
    }
    
    fragColor=vec4(col/16.,1.);
}
```

### 布尔运算合成

对于物体的交运算，即我们需要把两个物体拼合为一个物体时，我们可以使用上面的opU函数，即取两个物体的sdf的最小值。

对于物体的并运算，即我们取两个物体的交叉部分时，则要取两个物体的sdf的最大值。

对于物体的减运算，我们只需要将减物体的sdf取反，再取sdf最大值即可。

有了布尔运算之后，你便可以开始进行创作了。

我见过最牛逼的就是这个，就是这个作品比赛里把我爆杀了（链接：https://zhuanlan.zhihu.com/p/514951133）

使用的是神经网络，心服口服了呜呜

