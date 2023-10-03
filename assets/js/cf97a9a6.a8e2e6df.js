"use strict";(self.webpackChunkcs_engineering=self.webpackChunkcs_engineering||[]).push([[7316],{3905:(e,t,r)=>{r.d(t,{Zo:()=>s,kt:()=>f});var n=r(7294);function l(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){l(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,l=function(e,t){if(null==e)return{};var r,n,l={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(l[r]=e[r]);return l}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(l[r]=e[r])}return l}var u=n.createContext({}),c=function(e){var t=n.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},s=function(e){var t=c(e.components);return n.createElement(u.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,l=e.mdxType,o=e.originalType,u=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),p=c(r),m=l,f=p["".concat(u,".").concat(m)]||p[m]||d[m]||o;return r?n.createElement(f,a(a({ref:t},s),{},{components:r})):n.createElement(f,a({ref:t},s))}));function f(e,t){var r=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var o=r.length,a=new Array(o);a[0]=m;var i={};for(var u in t)hasOwnProperty.call(t,u)&&(i[u]=t[u]);i.originalType=e,i[p]="string"==typeof e?e:l,a[1]=i;for(var c=2;c<o;c++)a[c]=r[c];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},7707:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>u,contentTitle:()=>a,default:()=>d,frontMatter:()=>o,metadata:()=>i,toc:()=>c});var n=r(7462),l=(r(7294),r(3905));const o={},a="curl",i={unversionedId:"utils/debug/curl",id:"utils/debug/curl",title:"curl",description:"curl \u662f\u4e00\u4e2a\u5f00\u653e\u6e90\u4ee3\u7801\u7684\u547d\u4ee4\u884c\u5de5\u5177\uff0c\u4e5f\u662f\u4e00\u4e2a\u8de8\u5e73\u53f0\u7684\u5e93\uff08libcurl\uff09\uff0c\u7528\u4e8e\u5728\u670d\u52a1\u5668\u4e4b\u95f4\u4f20\u8f93\u6570\u636e\uff0c\u5e76\u5206\u53d1\u7ed9\u51e0\u4e4e\u6240\u6709\u65b0\u7684\u64cd\u4f5c\u7cfb\u7edf\u3002cURL\u7f16\u7a0b\u7528\u4e8e\u9700\u8981\u901a\u8fc7Internet\u534f\u8bae\u53d1\u9001\u6216\u63a5\u6536\u6570\u636e\u7684\u51e0\u4e4e\u4efb\u4f55\u5730\u65b9\u3002\u5b83\u7684\u540d\u5b57\u5c31\u662f\u5ba2\u6237\u7aef\uff08client\uff09\u7684 URL \u5de5\u5177\u7684\u610f\u601d\u3002",source:"@site/docs/utils/debug/curl.md",sourceDirName:"utils/debug",slug:"/utils/debug/curl",permalink:"/cs-engineering/docs/utils/debug/curl",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/utils/debug/curl.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"\u6d4f\u89c8\u5668\u5f00\u53d1\u8005\u5de5\u5177\uff1f",permalink:"/cs-engineering/docs/utils/debug/browser_developer"},next:{title:"postman",permalink:"/cs-engineering/docs/utils/debug/postman"}},u={},c=[{value:"\u7279\u70b9",id:"\u7279\u70b9",level:3},{value:"\u77e5\u8bc6\u70b9\u5411\u5bfc",id:"\u77e5\u8bc6\u70b9\u5411\u5bfc",level:3}],s={toc:c},p="wrapper";function d(e){let{components:t,...r}=e;return(0,l.kt)(p,(0,n.Z)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"curl"},"curl"),(0,l.kt)("p",null,"curl \u662f\u4e00\u4e2a\u5f00\u653e\u6e90\u4ee3\u7801\u7684\u547d\u4ee4\u884c\u5de5\u5177\uff0c\u4e5f\u662f\u4e00\u4e2a\u8de8\u5e73\u53f0\u7684\u5e93\uff08libcurl\uff09\uff0c\u7528\u4e8e\u5728\u670d\u52a1\u5668\u4e4b\u95f4\u4f20\u8f93\u6570\u636e\uff0c\u5e76\u5206\u53d1\u7ed9\u51e0\u4e4e\u6240\u6709\u65b0\u7684\u64cd\u4f5c\u7cfb\u7edf\u3002cURL\u7f16\u7a0b\u7528\u4e8e\u9700\u8981\u901a\u8fc7Internet\u534f\u8bae\u53d1\u9001\u6216\u63a5\u6536\u6570\u636e\u7684\u51e0\u4e4e\u4efb\u4f55\u5730\u65b9\u3002\u5b83\u7684\u540d\u5b57\u5c31\u662f\u5ba2\u6237\u7aef\uff08client\uff09\u7684 URL \u5de5\u5177\u7684\u610f\u601d\u3002"),(0,l.kt)("h3",{id:"\u7279\u70b9"},"\u7279\u70b9"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"\u8de8\u5e73\u53f0\u6027")),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"curl\u53ef\u4ee5\u5728\u591a\u4e2a\u64cd\u4f5c\u7cfb\u7edf\u4e0a\u8fd0\u884c\uff0c\u5305\u62ecLinux\u3001macOS\u3001Windows\u7b49\uff0c\u56e0\u6b64\u5177\u6709\u5f88\u9ad8\u7684\u53ef\u79fb\u690d\u6027\u3002")),(0,l.kt)("ol",{start:2},(0,l.kt)("li",{parentName:"ol"},"\u652f\u6301\u591a\u79cd\u534f\u8bae ")),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"curl\u652f\u6301\u5404\u79cd\u7f51\u7edc\u534f\u8bae\uff0c\u5305\u62ecHTTP\u3001HTTPS\u3001FTP\u3001SFTP\u3001SCP\u3001LDAP\u3001SMTP\u7b49\uff0c\u56e0\u6b64\u53ef\u4ee5\u7528\u4e8e\u5404\u79cd\u7f51\u7edc\u901a\u4fe1\u573a\u666f\u3002")),(0,l.kt)("ol",{start:3},(0,l.kt)("li",{parentName:"ol"},"\u547d\u4ee4\u884c\u5de5\u5177\u548c\u5e93")),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"curl\u65e2\u53ef\u4ee5\u4f5c\u4e3a\u547d\u4ee4\u884c\u5de5\u5177\u4f7f\u7528\uff0c\u4e5f\u53ef\u4ee5\u4f5c\u4e3a\u5e93\u5d4c\u5165\u5230\u5176\u4ed6\u5e94\u7528\u7a0b\u5e8f\u4e2d\u3002\u8fd9\u4f7f\u5f97\u5b83\u975e\u5e38\u7075\u6d3b\uff0c\u53ef\u4ee5\u7528\u4e8e\u81ea\u52a8\u5316\u4efb\u52a1\u548c\u7f16\u7a0b\u3002")),(0,l.kt)("h3",{id:"\u77e5\u8bc6\u70b9\u5411\u5bfc"},"\u77e5\u8bc6\u70b9\u5411\u5bfc"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},"\u57fa\u672c\u4f7f\u7528\u5e76\u4e86\u89e3\u5404\u53c2\u6570"),(0,l.kt)("li",{parentName:"ol"},"\u56fe\u7247\u7684\u53d1\u9001"),(0,l.kt)("li",{parentName:"ol"},"\u8868\u5355\u7684\u53d1\u9001"),(0,l.kt)("li",{parentName:"ol"},"\u9274\u6743(cookie,token)")))}d.isMDXComponent=!0}}]);