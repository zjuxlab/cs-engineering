---
title: NextJS
slug: >-
  ynzowezexiygx0kbdlyco9pgnxe-ejb3wlaaeiqiumkxpozcbvopnfh-rmxtwu9geip5o8kkeawck6dnn6e-ik6qw0wh1idsu8kvyzccmcgnnfe-rphyw3cepiebzvkfkekcb45ln7g-zlq5wo7zuifc3okado4ckguznwg-zlq5wo
sidebar_position: 5
---


# NextJS

next.js是一个react框架，它主要提供了以下几个功能

- 开箱即用的路由功能，文件即页面
- 支持了前后端一体化开发
- 支持SSR,CSR等渲染方式
- 有多种css预处理器支持，内置Layout，Image等组件

## next.js的路由

在过去的由create-react-app创建的应用中，我们需要引入react-router来构建页面路由，但在next.js中，我们无需引入任何插件即可使用路由功能！

在next.js中，一个页面就是一个导出的组件，这些文件储存在pages目录下，每个page都使用其文件名作为路由

举例而言

```js
// src/pages/about.js
// or: src/pages/about/index.js
export default function About() {
    return (
        <div>
            this is home page
        </div>
    )
}
```

这个页面可以直接通过/about进行访问

如果你想要进行页面间的跳转，你可以使用next.js提供的Link或者Router组件

### Link

通过Link组件可以启用客户端的路由切换，最简单的例子如下

```js
import Link from 'next/Link'

export function Home() {
    return(
        <div>
            <Link href='/about'>
                <a>about</a>
            </Link>
        </div>
    )
}
```

Link组件还支持路由传参，下面两种写法分别相当于

- '/about?name=test'
- '/blog/my-post'

```js
// equal to '/about?name=test'
<Link
    href={{
        pathname:'/about',
        query:{
            name:'test'
        }
    }}
>
    <a>about</a>
</Link>
```

```js
// equal to '/blog/my-post'
<Link
    href={{
        pathname:'blog/[slug]',
        query:{
            slug:'my-post'
        }
    }}
>
    <a>blog posts</a>
</Link>
```

既然有了路由传参，那么我们也需要有对于参数的解析，在next.js中，有两种方法对路由参数进行解析，分别是

- withRouter
- useRouter

这里给出使用useRouter的demo

```js
// 解析'blog/[slug]'
import { useRouter } from 'next/router'

const Post = () => {
    const router = useRouter()
    const { slug } = router.query

    return <p>Post: {slug}</p>
}

export default Post
```

### Router

router组件则主要用于在函数内部进行路由跳转，我们主要通过useRouter创建的router对象进行路由的push或replace

一个简单的样例如下

```js
import { useRouter } from 'next/router'

export function() {
    const router = useRouter();

    return (
        <div
            onClick={()=>{
                router.push('/blog');
            }}
        >
            navigate
        </div>
    )
}
```

Router.push方法接受以下参数

```js
router.push(url,as,opions);
```

as和options参数都是可选的，options参数有以下几个子参数

- Scroll:boolean参数，控制跳转后是否scroll到顶部，默认是true
- Shallow：不使用getServiceSideProps等方法更新当前页面的路径，默认是false
- locale：Optional string, indicates locale of the new page（没看懂&没用过，建议读者自己去看文档或者实践一下）

Router.replace接受以下参数

```js
router.replace(url,as,options)
```

与push不同的是，replace是替换当前浏览器路由栈的base url

## SSR

首先介绍什么是SSR(server side rendering)

顾名思义，SSR是服务端渲染，当用户请求一个网站时用户获得的是一个包含了完整数据的文件，网页的渲染在服务器上完成，而CSR（client side rendering）则不同，当用户请求一个网页时，用户获得的是一个包含了script与css样式链接的空html文件，网页的渲染在客户端完成

SSR主要用于优化

1. 首页白屏时间
2. 有利于搜索引擎抓取数据

在next.js中，我们通过getServerSideProps方法在服务器端获取数据

getServerSideProps方法接受context作为参数，返回两个可选值：props和notFound

notFound为True的话显示404界面

props参数则是一个序列化的对象，代表着getServerSideProps方法的返回数据

使用示例

```js
export async function getServerSideProps() {
    const res = await fetch(...)// fetch data
    const data = await res.json();
    
    if(!data)
        return {
            notFound:True//show 404
        } 
    
    return {
        props:{
            data:data
        }
    }
}

export default function Home({ data }) {
    return (
        <div>
            {data}
        </div>
    )
}
```

## API路由

next.js提供的API路由功能使你可以直接在原有的next应用下进行后端开发，可以减轻开发者的压力，'pages/api'目录下的任何文件都将作为API端点映射到'/api/*'，这些文件只会增加服务端文件包的体积，不会增加客户端文件包的大小

也就是说，你可以在'pages/api/test.js'下新建一个后端请求处理函数，在前端部分，你可以简单地通过'/api/test'进行调用

y

## 部署

这里主要介绍用vercel进行部署的方法

在使用vercel进行部署前，你需要先将你的next.js应用push到github或gitlab或bitbucket上

之后的步骤如下

1. 注册vercel账号
2. 在vercel中[import project](https://vercel.com/new)，选择从GitHub / gitlab / bitbucket上导入仓库
3. 当你导入项目后，next应用的build就自动开始了，你只需要等一会儿就能获得部署后的应用的url
4. 当你之后想要重新部署项目时，你只需要修改对应git仓库的main分支即可，vercel会自动重新buidl&deploy

完成后的监控台截图如下

<img src="/assets/YLBubb8LRonGv1xp3mVcJV9xnvb.png" src-width="2518" src-height="825" align="center"/>

> [next.js](wikcnGdbavy6QRwOZdzFxfShwFe)

