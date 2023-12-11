"use strict";(self.webpackChunkcs_engineering=self.webpackChunkcs_engineering||[]).push([[4593],{3905:(e,t,r)=>{r.d(t,{Zo:()=>k,kt:()=>s});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=n.createContext({}),u=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},k=function(e){var t=u(e.components);return n.createElement(c.Provider,{value:t},e.children)},p="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,k=i(e,["components","mdxType","originalType","parentName"]),p=u(r),d=a,s=p["".concat(c,".").concat(d)]||p[d]||m[d]||o;return r?n.createElement(s,l(l({ref:t},k),{},{components:r})):n.createElement(s,l({ref:t},k))}));function s(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,l=new Array(o);l[0]=d;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i[p]="string"==typeof e?e:a,l[1]=i;for(var u=2;u<o;u++)l[u]=r[u];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},425:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>l,default:()=>m,frontMatter:()=>o,metadata:()=>i,toc:()=>u});var n=r(7462),a=(r(7294),r(3905));const o={},l="Docker\u5165\u95e8",i={unversionedId:"basics/virtualization/docker/docker",id:"basics/virtualization/docker/docker",title:"Docker\u5165\u95e8",description:"@Isshiki\u4fee",source:"@site/docs/basics/virtualization/docker/docker.md",sourceDirName:"basics/virtualization/docker",slug:"/basics/virtualization/docker/",permalink:"/cs-engineering/docs/basics/virtualization/docker/",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/basics/virtualization/docker/docker.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Docker",permalink:"/cs-engineering/docs/category/docker"},next:{title:"\u524d\u7aef",permalink:"/cs-engineering/docs/category/\u524d\u7aef"}},c={},u=[{value:"1. Docker\u7b80\u4ecb",id:"1-docker\u7b80\u4ecb",level:2},{value:"2. Docker\u6838\u5fc3\u6982\u5ff5",id:"2-docker\u6838\u5fc3\u6982\u5ff5",level:2},{value:"3. Docker\u4f7f\u7528",id:"3-docker\u4f7f\u7528",level:2},{value:"3.1 \u4f7f\u7528 Docker Hub \u7684 Docker \u955c\u50cf",id:"31-\u4f7f\u7528-docker-hub-\u7684-docker-\u955c\u50cf",level:3},{value:"3.2 \u672c\u5730\u6784\u5efa\u955c\u50cf\u5e76\u521b\u5efa\u5bb9\u5668\u4f7f\u7528",id:"32-\u672c\u5730\u6784\u5efa\u955c\u50cf\u5e76\u521b\u5efa\u5bb9\u5668\u4f7f\u7528",level:3},{value:"4 \u63a8\u8350\u9605\u8bfb",id:"4-\u63a8\u8350\u9605\u8bfb",level:2}],k={toc:u},p="wrapper";function m(e){let{components:t,...r}=e;return(0,a.kt)(p,(0,n.Z)({},k,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"docker\u5165\u95e8"},"Docker\u5165\u95e8"),(0,a.kt)("p",null,"@Isshiki\u4fee"),(0,a.kt)("h2",{id:"1-docker\u7b80\u4ecb"},"1. Docker\u7b80\u4ecb"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"Docker is an open platform for developing, shipping, and running applications. Docker enables you to separate your applications from your infrastructure so you can deliver software quickly. With Docker, you can manage your infrastructure in the same way you manage your applications. By taking advantage of Docker\u2019s methodologies for shipping, testing, and deploying code quickly, you can significantly reduce the delay between writing code and running it in production.")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u5c3d\u7ba1\u539f\u7406\u4e0a\u5b58\u5728\u672c\u8d28\u4e0d\u540c\uff0c\u4f46\u662f\u4f60\u53ef\u4ee5\u6682\u65f6\u5c06\u5b83\u5f53\u4f5c\u4e00\u4e2a\u8f7b\u91cf\u7ea7\u7684\u201c\u865a\u62df\u673a\u201d\u3002",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"\u5173\u4e8e Docker \u548c VM \u7684\u533a\u522b\uff0c\u63a8\u8350\u9605\u8bfb\uff1a",(0,a.kt)("a",{parentName:"li",href:"https://cloudacademy.com/blog/docker-vs-virtual-machines-differences-you-should-know/"},"Docker vs. Virtual Machines: Differences You Should Know")))),(0,a.kt)("li",{parentName:"ul"},"\u4ece\u6a21\u5f0f\u4e0a\u6765\u8bb2\uff0cDocker \u4e13\u6ce8\u4e8e\u4e09\u4ef6\u4e8b\uff1a",(0,a.kt)("inlineCode",{parentName:"li"},"Build Image"),", ",(0,a.kt)("inlineCode",{parentName:"li"},"Ship Image"),", ",(0,a.kt)("inlineCode",{parentName:"li"},"Run Image"),".",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"\u800c\u8fd9\u91cc\u7684",(0,a.kt)("inlineCode",{parentName:"li"},"Image"),"\u5219\u662f\u5b66\u4e60 Docker \u8fc7\u7a0b\u4e2d\u5fc5\u987b\u7406\u89e3\u7684\u4e00\u4e2a\u6982\u5ff5\u3002")))),(0,a.kt)("p",null,"\u8bbe\u60f3\u8fd9\u6837\u4e00\u4e2a\u80cc\u666f\uff1a"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u4f60\u5728\u4f60\u7684\u672c\u5730\u673a\u5668\u4e0a\u5199\u4e86\u4e00\u4e2a\u590d\u6742\u7684\u670d\u52a1\uff0c\u9664\u4e86 GoLang \u4ee5\u5916\u8fd8\u914d\u7f6e\u4e86\u4e00\u5927\u5806\u5176\u4ed6\u7684\u4f9d\u8d56\uff1b"),(0,a.kt)("li",{parentName:"ul"},"\u8fd9\u65f6\u5019\u4f60\u9700\u8981\u628a\u5b83\u90e8\u7f72\u5230\u4e00\u4e2a\u5e72\u5e72\u51c0\u51c0\u7684\u670d\u52a1\u5668\u4e0a\uff0c\u5e76\u4e14\u8be5\u53d1\u884c\u7248\u6709\u5f88\u591a\u4f60\u5e76\u4e0d\u719f\u6089\u7684\u7279\u6027\u2026\u2026")),(0,a.kt)("p",null,"\u5982\u679c\u4f60\u672a\u66fe\u4e86\u89e3\u8fc7 Docker\uff0c\u90a3\u4f60\u6216\u8bb8\u53ea\u80fd\u9009\u62e9\u518d\u82b1\u4e00\u4e2a\u4e0b\u5348\u5728\u4e0a\u9762\u914d\u7f6e\u73af\u5883\uff0c\u751a\u81f3\u8fd8\u4f1a\u8e29\u5230\u66f4\u591a\u7684\u5751\uff1b\u4f46\u662f\u5982\u679c\u4f60\u4f1a\u7528 Docker\uff0c\u90a3\u4e48\u4f60\u53ea\u9700\u8981\u4e3a\u4f60\u7684\u9879\u76ee\u5199\u4e00\u4e2a Dockerfile\uff0c\u5e76\u786e\u4fdd\u670d\u52a1\u5668\u4e0a\u5b89\u88c5\u4e86 Docker\uff0c\u63a5\u4e0b\u6765\u53ea\u9700\u8981\u901a\u8fc7 Docker \u76f4\u63a5\u90e8\u7f72\u5373\u53ef\u3002"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u6309\u7167\u6211\u7684\u7406\u89e3\uff0cDocker \u5c31\u662f\u4e3a\u4e86\u5728\u90e8\u7f72\u8fc7\u7a0b\u4e2d\u4fbf\u6377\u5730\u6784\u5efa\u4e00\u4e2a\u5fc5\u987b\u7684\u73af\u5883\u800c\u5b58\u5728\u7684\u3002"),(0,a.kt)("li",{parentName:"ul"},"\u6309\u7167\u4e0a\u9762\u90a3\u4e2a\u4e0d\u592a\u6070\u5f53\u7684\u7684\u201c\u865a\u62df\u673a\u201d\u7684\u6bd4\u55bb\uff0c\u5c31\u662f\u5728\u8fdc\u7a0b\u670d\u52a1\u5668\u4e0a\u5feb\u901f\u542f\u4e00\u4e2a\u914d\u7f6e\u597d\u7684\u865a\u62df\u673a\uff0c\u5e76\u5728\u91cc\u9762\u8fd0\u884c\u5bf9\u5e94\u7684\u670d\u52a1\u3002")),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"\u5173\u4e8e\u5982\u4f55\u5b89\u88c5 Docker\uff0c\u8fd9\u91cc\u6211\u4eec\u76f4\u63a5\u7565\u8fc7\uff0c\u8bf7\u81ea\u884c\u641c\u7d22\u5982\u4f55\u5728\u4f60\u4f7f\u7528\u7684\u64cd\u4f5c\u7cfb\u7edf\u4e0a\u5b89\u88c5 Docker\u3002")),(0,a.kt)("h2",{id:"2-docker\u6838\u5fc3\u6982\u5ff5"},"2. Docker\u6838\u5fc3\u6982\u5ff5"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Image",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"Docker Image \u662f\u7528\u6765\u6784\u5efa Docker Container \u7684\u4e00\u7cfb\u5217\u8d44\u6e90\uff0c\u4f60\u53ef\u4ee5\u5f53\u5b83\u662f\u4e00\u4e2a\u201c\u6a21\u677f\u201d\uff0c\u800c Container \u662f\u5176\u5b9e\u4f8b\u5316\u3002\u5176\u672c\u8d28\u662f\u4e00\u5806\u9759\u6001\u6587\u4ef6\uff0c\u5e76\u4e0d\u5177\u5907\u6267\u884c\u80fd\u529b\u3002"))),(0,a.kt)("li",{parentName:"ul"},"Container",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"Container \u662f Image \u7684\u5b9e\u4f8b\u5316\uff0c\u662f\u4e00\u7cfb\u5217\u8fdb\u7a0b\uff08\u5f53\u7136\u4f60\u53ef\u4ee5\u9009\u62e9\u505c\u6b62\u4ed6\u4eec\uff09\uff0c\u5b83\u4eec\u6839\u636e Image \u4e2d\u7684\u5185\u5bb9\u88ab\u521d\u59cb\u5316\u521b\u5efa\uff0c\u5e76\u57fa\u672c\u4e0a\u4e0e\u4f60\u7684\u5bbf\u4e3b\u7cfb\u7edf\u9694\u79bb\uff0c\u53ea\u7559\u4e0b\u4e00\u4e9b\u7528\u6765\u8fdb\u884c\u4ea4\u4e92\u7684\u901a\u9053\u3002"))),(0,a.kt)("li",{parentName:"ul"},"Docker Hub",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"\u7c7b\u4f3c\u4e8e GitHub\uff0c\u4f60\u53ef\u4ee5\u5728\u4e0a\u9762\u641c\u7d22\u67e5\u770b\u516c\u5f00\u7684 Image\uff0c\u4ece\u4e2d\u6311\u9009\u4f60\u9700\u8981\u7684\u5e76\u62c9\u53d6\u5230\u672c\u5730\u8fdb\u884c\u4f7f\u7528\u3002")))),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://hub.docker.com/"},"https://hub.docker.com/")),(0,a.kt)("h2",{id:"3-docker\u4f7f\u7528"},"3. Docker\u4f7f\u7528"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u5173\u4e8e\u547d\u4ee4\u884c\u7684\u8bf4\u660e\uff0c\u6211\u5c06\u878d\u5408\u5728\u4e4b\u540e\u7684\u5185\u5bb9\u4e2d\u5728\u5bf9\u5e94\u7684\u4f7f\u7528\u573a\u666f\u4e2d\u4ecb\u7ecd\uff0c\u5982\u679c\u60f3\u8981\u67e5\u770b\u5217\u8868\u7c7b\u578b\u7684\u547d\u4ee4\u8bf4\u660e\uff0c\u53ef\u4ee5\u67e5\u770b\uff1a",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://docs.docker.com/engine/reference/commandline/cli/"},"https://docs.docker.com/engine/reference/commandline/cli/")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://docs.docker.com/engine/reference/commandline/docker/"},"https://docs.docker.com/engine/reference/commandline/docker/")))),(0,a.kt)("li",{parentName:"ul"},"\u5728\u8fd9\u91cc\uff0c\u6211\u5c06\u7b80\u5355\u4ecb\u7ecd\u4e24\u79cd Docker \u7684\u4f7f\u7528\u6d41\u7a0b\u3002\u5206\u522b\u5bf9\u5e94\u201c\u4f7f\u7528 Docker Hub \u7684 Docker \u955c\u50cf\u201d\u548c\u201c\u672c\u5730\u6784\u5efa\u955c\u50cf\u5e76\u521b\u5efa\u5bb9\u5668\u4f7f\u7528\u201d\u3002")),(0,a.kt)("h3",{id:"31-\u4f7f\u7528-docker-hub-\u7684-docker-\u955c\u50cf"},"3.1 \u4f7f\u7528 Docker Hub \u7684 Docker \u955c\u50cf"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u521a\u597d\u6211\u4e4b\u524d\u5199\u8fc7\u4e00\u7bc7\u7528 Docker \u5b89\u88c5 FSL \u7684\u535a\u5ba2\uff0c\u76f4\u63a5\u62ff\u8fd9\u4e2a\u505a\u4ecb\u7ecd\u4e86\u3002",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://www.yuque.com/isshikixiu/notes/sna3ru"},"https://www.yuque.com/isshikixiu/notes/sna3ru"))))),(0,a.kt)("p",null,"\u8fd9\u91cc\u53ea\u653e\u51e0\u4e2a\u5e38\u89c1\u7684\u547d\u4ee4\uff0c\u5176\u5b83\u547d\u4ee4\u5efa\u8bae\u5728\u4f7f\u7528\u9047\u5230\u7684\u65f6\u5019\u53bb\u67e5\u9605docs\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-Shell"},"# \u62c9\u53d6image\nsudo docker pull {image name}\n\n# \u521b\u5efa\u5bb9\u5668\u5e76\u8fdb\u5165\nsudo docker run -it {image name} {entrance}\n\n# \u542f\u52a8/\u7ed3\u675f\u5b9e\u4f8b\nsudo docker start {container id}\nsudo docker stop {container id}\n\n# \u8fdb\u5165\u8fd0\u884c\u4e2d\u7684\u5b9e\u4f8b\nsudo docker exec -ti {container id} {entrance}\n\n# container\u64cd\u4f5c\nsudo docker container ...\n\n# image\u64cd\u4f5c\nsudo docker image ...\n")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u67e5\u627e\u955c\u50cf",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"*",(0,a.kt)("em",{parentName:"li"},"Docker Hub \u652f\u6301\u547d\u4ee4\u884c\u4ea4\u4e92\uff0c\u4f46\u4f7f\u7528\u8d77\u6765\u5927\u6982\u4e0d\u5982\u76f4\u63a5\u6d4f\u89c8 Docker Hub \u65b9\u4fbf\uff0c\u6240\u4ee5\u8fd9\u91cc\u4e0d\u505a\u4ecb\u7ecd")," \u3002"))),(0,a.kt)("li",{parentName:"ul"},"\u4f7f\u7528",(0,a.kt)("inlineCode",{parentName:"li"},"docker pull")," \u6765\u62c9\u53d6\u955c\u50cf"),(0,a.kt)("li",{parentName:"ul"},"\u4f7f\u7528",(0,a.kt)("inlineCode",{parentName:"li"},"docker run")," \u6765\u751f\u6210\u5bb9\u5668\u5e76\u8fd0\u884c")),(0,a.kt)("h3",{id:"32-\u672c\u5730\u6784\u5efa\u955c\u50cf\u5e76\u521b\u5efa\u5bb9\u5668\u4f7f\u7528"},"3.2 \u672c\u5730\u6784\u5efa\u955c\u50cf\u5e76\u521b\u5efa\u5bb9\u5668\u4f7f\u7528"),(0,a.kt)("p",null,"\u9996\u5148\uff0c\u5728\u8003\u8651\u670d\u52a1\u5668\u4e4b\u524d\uff0c\u8bf7\u5148\u5728\u672c\u5730\u505a\u597d\u8fd9\u4e9b\u4e8b\uff1a"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u51c6\u5907\u597d\u7684\u4f60\u7684\u4ee3\u7801\u3002",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"\u4f8b\u5982\u6211\u4eec\u9700\u8981\u5728\u670d\u52a1\u5668\u4e0a\u90e8\u7f72\u4e00\u4e2a\u540e\u7aef\u670d\u52a1\uff0c\u90a3\u4e48\u9996\u5148\u4f60\u9700\u8981\u628a\u8fd9\u4e2a\u540e\u7aef\u670d\u52a1\u7684\u6e90\u4ee3\u7801\u51c6\u5907\u597d\uff0c\u5426\u5219\u201c\u90e8\u7f72\u201d\u5c06\u65e0\u4ece\u8c08\u8d77\u3002"))),(0,a.kt)("li",{parentName:"ul"},"\u5199 Dockerfile",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"\u5177\u4f53\u6765\u8bf4\uff0cDockerfile \u6307\u5bfc Docker \u5982\u4f55\u6784\u5efa\u4e00\u4e2a\u955c\u50cf\uff0c\u5305\u62ec\u4f46\u4e0d\u9650\u4e8e\u8981\u5982\u4f55\u51c6\u5907\u4f60\u6240\u9700\u8981\u7684\u4f9d\u8d56\u3001\u5982\u4f55\u7ec4\u7ec7\u4f60\u7684\u6e90\u4ee3\u7801\u3001\u5982\u4f55\u7f16\u8bd1\u4f60\u7684\u6e90\u4ee3\u7801\u3001\u955c\u50cf\u4e2d\u4f1a\u5305\u542b\u4ec0\u4e48\u7b49\u3002"),(0,a.kt)("li",{parentName:"ul"},"\u5173\u4e8e Dockerfile \u7684\u8bed\u6cd5\uff0c\u53ef\u4ee5\u53c2\u8003\u6211\u5c55\u793a\u7684\u4f8b\u5b50\uff0c\u4f46\u662f\u5e76\u4e0d\u4ec5\u9650\u4e8e\u8fd9\u4e9b\u3002")))),(0,a.kt)("p",null,"\u8fd9\u91cc\u63d0\u4f9b\u4e00\u4e2a\u7b80\u5355\u7684 dockerfile \u6a21\u7248\u6837\u4f8b\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-Dockerfile"},"# \u9009\u53d6\u4e00\u4e2a go \u7684\u5b98\u65b9\u955c\u50cf\u4f5c\u4e3a\u57fa\u7840 \u4f5c\u4e3a \u7f16\u8bd1\u73af\u5883\nFROM golang:1.18 AS builder\n\n# \u8bbe\u7f6e\u4e00\u4e9b\u73af\u5883\u53d8\u91cf\uff0c\u5176\u4e2d\u4e09\u4e2a\u662f golang \u6240\u9700\u8981\u7684\uff1bWORKDIR \u662f\u4e3a\u4e86\u65b9\u4fbf\u4e0b\u9762\u4f7f\u7528\u800c\u8bbe\u7f6e\u7684\nENV GOPROXY=https://mirrors.aliyun.com/goproxy/,direct \\\n    GO111MODULE=on \\\n    CGO_ENABLED=0 \\\n    WORKDIR=/tmp/src/\n\n# \u8fd0\u884c 'mkdir -p $WORKDIR' \u6765\u521b\u5efa\u5de5\u4f5c\u76ee\u5f55\nRUN mkdir -p $WORKDIR\n\n# \u5c06 . \u4e0b\u7684\u5185\u5bb9\u5168\u90e8\u590d\u5236\u5230 $WORKDIR \uff0c\u4e5f\u5c31\u662f /tmp/src/\nCOPY . $WORKDIR\n\n# \u8fdb\u5165\u5de5\u4f5c\u76ee\u5f55 \u5e76\u4e14 \u8fdb\u884c go \u7684\u5305\u7ba1\u7406\u64cd\u4f5c\nRUN cd $WORKDIR && go mod download all\n\n# \u8fdb\u5165\u5de5\u4f5c\u76ee\u5f55 \u5e76\u4e14 \u7f16\u8bd1\nRUN cd $WORKDIR && go build -o /fileName\n\n# \u9009\u53d6 alpine \u4f5c\u4e3a\u8fd0\u884c\u73af\u5883\nFROM alpine:3.15.2\n\n# \u590d\u5236\u6587\u4ef6\u5185\u5bb9\nCOPY --from=builder /fileName /fileName\n\n# \u5728\u542f\u52a8\u5bb9\u5668\u65f6\u8fd0\u884c\u8be5\u547d\u4ee4\nCMD [\"/fileName\"]\n")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"[\u975e\u5fc5\u9700]"," \u5199\u4e00\u4e2a\u90e8\u7f72\u811a\u672c",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"\u4f7f\u7528 Docker \u5df2\u7ecf\u5f88\u5927\u7a0b\u5ea6\u4e0a\u4fbf\u5229\u4e86\u5728\u670d\u52a1\u5668\u4e0a\u7684\u90e8\u7f72\uff0c\u4f46\u662f\u4ecd\u7136\u8fd8\u662f\u9700\u8981\u4e00\u4e9b\u6b65\u9aa4\uff0c\u800c\u591a\u6570\u60c5\u51b5\u5199\u6211\u4eec\u9700\u8981\u591a\u6b21\u4fee\u6539\u6e90\u4ee3\u7801\u5e76\u91cd\u65b0\u90e8\u7f72\uff0c\u4e3a\u4e86\u5077\u61d2\u63d0\u9ad8\u6548\u7387\uff0c\u6211\u4eec\u8fd8\u53ef\u4ee5\u8840\u5df2\u5e72\u90e8\u7f72\u811a\u672c\u6765\u8ba9\u6211\u4eec\u7684\u90e8\u7f72\u771f\u6b63\u5b9e\u73b0\u201c\u4e00\u952e\u5316\u201d\uff1b"),(0,a.kt)("li",{parentName:"ul"},"\u7531\u4e8e\u6211\u4eec\u5728\u8fd9\u4e2a\u6d41\u7a0b\u4e2d\u9700\u8981\u5728\u90e8\u7f72\u7aef\u51c6\u5907\u6e90\u4ee3\u7801\uff0c\u90a3\u4e48\u5c06\u4e0d\u53ef\u907f\u514d\u7684\u6d89\u53ca\u5230\u201c\u6e90\u4ee3\u7801\u7248\u672c\u7ba1\u7406\u201d\u8fd9\u4ef6\u4e8b\uff0c\u663e\u7136\u8fd9\u4ef6\u4e8b\u548c Docker \u65e0\u5173\uff08\u5982\u679c\u4f60\u4f7f\u7528\u5728\u672c\u5730\u628a\u955c\u50cf\u4e0a\u4f20\u5230 Docker Hub \u4e0a\uff0c\u5e76\u5728\u90e8\u7f72\u7aef\u62c9\u53d6 Image \u7684\u6a21\u5f0f\uff0c\u90a3\u4e48\u8fd9\u4ef6\u4e8b\u5c31\u548c Docker \u6709\u5173\u4e86\uff09\uff0c\u6240\u4ee5\u6211\u4eec\u9700\u8981\u5728\u811a\u672c\u4e2d\u5199\u4e0a\u4e00\u4e9b git \u6307\u4ee4\uff1b"),(0,a.kt)("li",{parentName:"ul"},"\u9664\u6b64\u4e4b\u5916\uff0c\u7531\u4e8e\u6211\u4eec\u9700\u8981\u591a\u6b21\u91cd\u65b0\u90e8\u7f72\uff0c\u90a3\u4e48\u5bf9\u4e8e\u8001\u7248\u672c\u7684\u5bb9\u5668\u548c\u955c\u50cf\u4e5f\u9700\u8981\u4e00\u5b9a\u7684\u7ba1\u7406\uff0c\u5373\u5220\u9664\u6ca1\u6709\u7528\u7684\u955c\u50cf\u548c\u5bb9\u5668\uff1b"),(0,a.kt)("li",{parentName:"ul"},"\u5f53\u7136\uff0c\u6700\u91cd\u8981\u7684\u8fd8\u6709\u4ece\u955c\u50cf\u7684\u6784\u5efa\u5230\u5bb9\u5668\u7684\u8fd0\u884c\u8fd9\u4e00\u7cfb\u5217\u64cd\u4f5c\uff1b")))),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"[ homework ]")),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"\u53bb Docker Hub \u627e\u4e00\u4e2a\u559c\u6b22\u7684 Image \u628a\u5b83 pull \u4e0b\u6765\uff0c\u5e76\u5728\u672c\u5730\u5c1d\u8bd5\u90e8\u7f72\uff0c\u6700\u597d\u80fd\u5199\u4e00\u4e2a\u90e8\u7f72\u811a\u672c\uff1b"),(0,a.kt)("li",{parentName:"ol"},"\uff08\u9009\u505a\uff09\u5c1d\u8bd5\u7ed9\u81ea\u5df1\u7684\u4e00\u4e2a\u9879\u76ee\u5199\u4e00\u4e2a Dockerfile\uff0c\u5e76\u6210\u529f\u4e3a\u8be5\u9879\u76ee\u521b\u5efa\u4e00\u4e2a\u80fd\u7528\u7684\u955c\u50cf\uff1b")),(0,a.kt)("h2",{id:"4-\u63a8\u8350\u9605\u8bfb"},"4 \u63a8\u8350\u9605\u8bfb"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://yeasy.gitbook.io/docker_practice/"},"https://yeasy.gitbook.io/docker_practice/")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://www.runoob.com/docker/docker-tutorial.html"},"https://www.runoob.com/docker/docker-tutorial.html")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://docs.docker.com/"},"https://docs.docker.com/"))))}m.isMDXComponent=!0}}]);