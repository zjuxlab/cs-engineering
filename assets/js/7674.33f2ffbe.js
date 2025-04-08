/*! For license information please see 7674.33f2ffbe.js.LICENSE.txt */
(self.webpackChunkcs_engineering=self.webpackChunkcs_engineering||[]).push([[7674],{7893:(e,r,t)=>{"use strict";t.d(r,{A:()=>y});var n=t(46942),o=t.n(n),a=t(32318);const{colors:i}=t(36782),l=(e,r)=>`rgba(${parseInt(e.slice(1,3),16)}, ${parseInt(e.slice(3,5),16)}, ${parseInt(e.slice(5,7),16)}, ${r})`,s=t(36782),c=s.colors.white,u=s.colors.black,p=(s.colors.transparent,s.colors["grey-050"],s.colors["grey-100"],s.colors["grey-200"],s.colors["grey-300"],s.colors["grey-400"],s.colors["grey-500"],s.colors["grey-600"],s.colors["grey-700"],s.colors["grey-800"],s.colors["grey-900"],s.colors["orange-100"],s.colors["orange-200"],s.colors["orange-300"],s.colors["orange-400"],s.colors["orange-500"],s.colors["orange-600"],s.colors["orange-700"],s.colors["orange-800"],s.colors["orange-900"],s.colors["xenon-100"]),d=(s.colors["xenon-200"],s.colors["xenon-300"],s.colors["xenon-400"],s.colors["xenon-500"],s.colors["xenon-600"],s.colors["xenon-700"]),g=(s.colors["xenon-800"],s.colors["xenon-900"]),m=(s.colors["pink-100"],s.colors["pink-200"],s.colors["pink-300"],s.colors["pink-400"],s.colors["pink-500"],s.colors["pink-600"],s.colors["pink-700"],s.colors["pink-800"],s.colors["pink-900"],s.colors["red-100"],s.colors["red-200"],s.colors["red-300"],s.colors["red-400"],s.colors["red-500"],s.colors["red-600"],s.colors["red-700"],s.colors["red-800"],s.colors["red-900"],s.colors["cyan-100"],s.colors["cyan-200"],s.colors["cyan-300"],s.colors["cyan-400"],s.colors["cyan-500"],s.colors["cyan-600"],s.colors["cyan-700"],s.colors["cyan-800"],s.colors["cyan-900"],s.colors["green-100"],s.colors["green-200"],s.colors["green-300"],s.colors["green-400"],s.colors["green-500"],s.colors["green-600"],s.colors["green-700"],s.colors["green-800"],s.colors["green-900"],s.colors["neon-100"],s.colors["neon-200"],s.colors["neon-300"],s.colors["neon-400"],s.colors["neon-500"],s.colors["neon-600"],s.colors["neon-700"],s.colors["neon-800"],s.colors["neon-900"],s.colors["color-predict"],s.colors["color-answer"],s.colors["color-recommend"],{blue:d,white:p,dark:g,black:u}),f={blue:d,white:c,dark:g,black:u},h=e=>m[e]||e,x=({background:e,direction:r,secondary:t})=>{return a.AH`
    transition: box-shadow 0.15s ease, transform 0.15s ease;
    will-change: box-shadow, transform;

    ${r&&a.AH`
      border-radius: ${"left"===r?"50px 16px 16px 50px":"16px 50px 50px 16px"};
    `}

    ${t?a.AH`
          box-shadow: inset 0 0 0 2px
            ${l(f[e],.4)};
          &:hover {
            box-shadow: inset 0 0 0 2px ${f[e]};
          }
        `:(n=e,a.AH`
    box-shadow: 0px 2px 8px rgba(45, 35, 66, 0.3),
      ${"white"===n?a.AH`
        // This condition is here only for the white button, the design wasn't 100% certain about the shadow color with the new xenon colors, so while they perfect this, we'll use this small hacky solution. 
         inset 0px -3px 0px 0px ${l(h("black"),.05)},
          inset 0px -3px 0px 0px ${h(n)}
         `:a.AH`inset 0px -3px 0px 0px ${h(n)}`};

    &:hover {
      box-shadow: 0px 4px 8px rgba(45, 35, 66, 0.4),
        0px 7px 13px -3px rgba(45, 35, 66, 0.3),
        inset 0px -3px 0px ${h(n)};
      transform: translateY(-2px);
    }
    &:focus {
      box-shadow: inset 0 0 0 1.5px ${h(n)},
        0px 2px 4px rgba(45, 35, 66, 0.4),
        0px 7px 13px -3px rgba(45, 35, 66, 0.3),
        inset 0px -3px 0px ${h(n)};
    }
    &:active {
      box-shadow: ${"white"===n?a.AH`
        inset 0px 3px 0px 0px ${l(h("black"),.05)},
         inset 0px 3px 0px ${h(n)},
        inset 0px -3px 8px rgba(45, 35, 66, 0.3)
         `:a.AH`inset 0px 3px 0px ${h(n)},inset 0px -3px 8px rgba(45, 35, 66, 0.3)`};

      transform: translateY(2px);
    }
  `)};
  `;var n},b=(a.AH`
    top: -2px;
  `,a.AH`
    transform: none !important;
  `,{blue:"uil-bgc-xenon-600",white:"uil-bgc-white",dark:"uil-bgc-xenon-900"}),v={blue:"uil-color-xenon-700",white:"uil-color-white",dark:"uil-color-xenon-900"},w=({background:e="blue",children:r,rounded:t="left",round:n=!1,tag:i="button",secondary:l=!1,icon:s,iconPosition:c="after",iconProps:u={},...p})=>{const d=p.href?"a":i,{className:g,css:m,style:f,...h}=p,{strokeWidth:w,...y}=u,k="blue"===e||"dark"===e?v.white:v.dark,A="left"===t?"uil-pl-32 uil-pr-24":"uil-pr-32 uil-pl-24",$=e=>s&&((e,r,t)=>{const n=r,i=r.displayName,{className:l,...s}=t;return(0,a.Y)(n,{...s,"aria-label":`${i} icon`,className:o()("uil-pos-relative uil-z-2 uil-fxs-0 uil-pe-none uil-w-14 uil-h-14","lg:uil-w-18 lg:uil-h-18",e,l)})})(o()(r&&e),s,u);return(0,a.Y)(d,{...h,...y,strokeWidth:w??3,css:[x({background:e,direction:!n&&t,secondary:l}),m],style:{...f},className:o()("uil-app-none uil-bdw-0 uil-d-inline-flex uil-ai-center uil-jc-center uil-cursor-pointer uil-ff-sora uil-fw-bold uil-tt-upper uil-lsp-big uil-td-none uil-pv-14","hover:uil-td-none",n&&"uil-bdr-max uil-w-40 uil-h-40",!n&&A,l?"uil-bgc-transparent":b[e],l?v[e]:k,g)},s&&"before"===c&&$(r?"uil-mr-8":""),r&&(0,a.Y)("span",{className:"uil-pe-none uil-pos-relative uil-z-2 uil-fsz-12"},r),s&&"after"===c&&$(r?"uil-ml-8":""))};w.displayName="Button";const y=w},32318:(e,r,t)=>{"use strict";t.d(r,{AH:()=>_e,Y:()=>ze});var n=t(96540),o=t.t(n,2);var a=function(){function e(e){var r=this;this._insertTag=function(e){var t;t=0===r.tags.length?r.insertionPoint?r.insertionPoint.nextSibling:r.prepend?r.container.firstChild:r.before:r.tags[r.tags.length-1].nextSibling,r.container.insertBefore(e,t),r.tags.push(e)},this.isSpeedy=void 0===e.speedy||e.speedy,this.tags=[],this.ctr=0,this.nonce=e.nonce,this.key=e.key,this.container=e.container,this.prepend=e.prepend,this.insertionPoint=e.insertionPoint,this.before=null}var r=e.prototype;return r.hydrate=function(e){e.forEach(this._insertTag)},r.insert=function(e){this.ctr%(this.isSpeedy?65e3:1)==0&&this._insertTag(function(e){var r=document.createElement("style");return r.setAttribute("data-emotion",e.key),void 0!==e.nonce&&r.setAttribute("nonce",e.nonce),r.appendChild(document.createTextNode("")),r.setAttribute("data-s",""),r}(this));var r=this.tags[this.tags.length-1];if(this.isSpeedy){var t=function(e){if(e.sheet)return e.sheet;for(var r=0;r<document.styleSheets.length;r++)if(document.styleSheets[r].ownerNode===e)return document.styleSheets[r]}(r);try{t.insertRule(e,t.cssRules.length)}catch(n){}}else r.appendChild(document.createTextNode(e));this.ctr++},r.flush=function(){this.tags.forEach((function(e){var r;return null==(r=e.parentNode)?void 0:r.removeChild(e)})),this.tags=[],this.ctr=0},e}(),i=Math.abs,l=String.fromCharCode,s=Object.assign;function c(e){return e.trim()}function u(e,r,t){return e.replace(r,t)}function p(e,r){return e.indexOf(r)}function d(e,r){return 0|e.charCodeAt(r)}function g(e,r,t){return e.slice(r,t)}function m(e){return e.length}function f(e){return e.length}function h(e,r){return r.push(e),e}var x=1,b=1,v=0,w=0,y=0,k="";function A(e,r,t,n,o,a,i){return{value:e,root:r,parent:t,type:n,props:o,children:a,line:x,column:b,length:i,return:""}}function $(e,r){return s(A("",null,null,"",null,null,0),e,{length:-e.length},r)}function F(){return y=w>0?d(k,--w):0,b--,10===y&&(b=1,x--),y}function C(){return y=w<v?d(k,w++):0,b++,10===y&&(b=1,x++),y}function E(){return d(k,w)}function N(){return w}function H(e,r){return g(k,e,r)}function Y(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function S(e){return x=b=1,v=m(k=e),w=0,[]}function B(e){return k="",e}function z(e){return c(H(w-1,P(91===e?e+2:40===e?e+1:e)))}function _(e){for(;(y=E())&&y<33;)C();return Y(e)>2||Y(y)>3?"":" "}function O(e,r){for(;--r&&C()&&!(y<48||y>102||y>57&&y<65||y>70&&y<97););return H(e,N()+(r<6&&32==E()&&32==C()))}function P(e){for(;C();)switch(y){case e:return w;case 34:case 39:34!==e&&39!==e&&P(y);break;case 40:41===e&&P(e);break;case 92:C()}return w}function D(e,r){for(;C()&&e+y!==57&&(e+y!==84||47!==E()););return"/*"+H(r,w-1)+"*"+l(47===e?e:C())}function j(e){for(;!Y(E());)C();return H(e,w)}var T="-ms-",I="-moz-",R="-webkit-",L="comm",M="rule",W="decl",G="@keyframes";function q(e,r){for(var t="",n=f(e),o=0;o<n;o++)t+=r(e[o],o,e,r)||"";return t}function X(e,r,t,n){switch(e.type){case"@layer":if(e.children.length)break;case"@import":case W:return e.return=e.return||e.value;case L:return"";case G:return e.return=e.value+"{"+q(e.children,n)+"}";case M:e.value=e.props.join(",")}return m(t=q(e.children,n))?e.return=e.value+"{"+t+"}":""}function J(e){return B(U("",null,null,null,[""],e=S(e),0,[0],e))}function U(e,r,t,n,o,a,i,s,c){for(var g=0,f=0,x=i,b=0,v=0,w=0,y=1,k=1,A=1,$=0,H="",Y=o,S=a,B=n,P=H;k;)switch(w=$,$=C()){case 40:if(108!=w&&58==d(P,x-1)){-1!=p(P+=u(z($),"&","&\f"),"&\f")&&(A=-1);break}case 34:case 39:case 91:P+=z($);break;case 9:case 10:case 13:case 32:P+=_(w);break;case 92:P+=O(N()-1,7);continue;case 47:switch(E()){case 42:case 47:h(K(D(C(),N()),r,t),c);break;default:P+="/"}break;case 123*y:s[g++]=m(P)*A;case 125*y:case 59:case 0:switch($){case 0:case 125:k=0;case 59+f:-1==A&&(P=u(P,/\f/g,"")),v>0&&m(P)-x&&h(v>32?Q(P+";",n,t,x-1):Q(u(P," ","")+";",n,t,x-2),c);break;case 59:P+=";";default:if(h(B=Z(P,r,t,g,f,o,s,H,Y=[],S=[],x),a),123===$)if(0===f)U(P,r,B,B,Y,a,x,s,S);else switch(99===b&&110===d(P,3)?100:b){case 100:case 108:case 109:case 115:U(e,B,B,n&&h(Z(e,B,B,0,0,o,s,H,o,Y=[],x),S),o,S,x,s,n?Y:S);break;default:U(P,B,B,B,[""],S,0,s,S)}}g=f=v=0,y=A=1,H=P="",x=i;break;case 58:x=1+m(P),v=w;default:if(y<1)if(123==$)--y;else if(125==$&&0==y++&&125==F())continue;switch(P+=l($),$*y){case 38:A=f>0?1:(P+="\f",-1);break;case 44:s[g++]=(m(P)-1)*A,A=1;break;case 64:45===E()&&(P+=z(C())),b=E(),f=x=m(H=P+=j(N())),$++;break;case 45:45===w&&2==m(P)&&(y=0)}}return a}function Z(e,r,t,n,o,a,l,s,p,d,m){for(var h=o-1,x=0===o?a:[""],b=f(x),v=0,w=0,y=0;v<n;++v)for(var k=0,$=g(e,h+1,h=i(w=l[v])),F=e;k<b;++k)(F=c(w>0?x[k]+" "+$:u($,/&\f/g,x[k])))&&(p[y++]=F);return A(e,r,t,0===o?M:s,p,d,m)}function K(e,r,t){return A(e,r,t,L,l(y),g(e,2,-2),0)}function Q(e,r,t,n){return A(e,r,t,W,g(e,0,n),g(e,n+1,-1),n)}var V=function(e,r,t){for(var n=0,o=0;n=o,o=E(),38===n&&12===o&&(r[t]=1),!Y(o);)C();return H(e,w)},ee=function(e,r){return B(function(e,r){var t=-1,n=44;do{switch(Y(n)){case 0:38===n&&12===E()&&(r[t]=1),e[t]+=V(w-1,r,t);break;case 2:e[t]+=z(n);break;case 4:if(44===n){e[++t]=58===E()?"&\f":"",r[t]=e[t].length;break}default:e[t]+=l(n)}}while(n=C());return e}(S(e),r))},re=new WeakMap,te=function(e){if("rule"===e.type&&e.parent&&!(e.length<1)){for(var r=e.value,t=e.parent,n=e.column===t.column&&e.line===t.line;"rule"!==t.type;)if(!(t=t.parent))return;if((1!==e.props.length||58===r.charCodeAt(0)||re.get(t))&&!n){re.set(e,!0);for(var o=[],a=ee(r,o),i=t.props,l=0,s=0;l<a.length;l++)for(var c=0;c<i.length;c++,s++)e.props[s]=o[l]?a[l].replace(/&\f/g,i[c]):i[c]+" "+a[l]}}},ne=function(e){if("decl"===e.type){var r=e.value;108===r.charCodeAt(0)&&98===r.charCodeAt(2)&&(e.return="",e.value="")}};function oe(e,r){switch(function(e,r){return 45^d(e,0)?(((r<<2^d(e,0))<<2^d(e,1))<<2^d(e,2))<<2^d(e,3):0}(e,r)){case 5103:return R+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return R+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return R+e+I+e+T+e+e;case 6828:case 4268:return R+e+T+e+e;case 6165:return R+e+T+"flex-"+e+e;case 5187:return R+e+u(e,/(\w+).+(:[^]+)/,R+"box-$1$2"+T+"flex-$1$2")+e;case 5443:return R+e+T+"flex-item-"+u(e,/flex-|-self/,"")+e;case 4675:return R+e+T+"flex-line-pack"+u(e,/align-content|flex-|-self/,"")+e;case 5548:return R+e+T+u(e,"shrink","negative")+e;case 5292:return R+e+T+u(e,"basis","preferred-size")+e;case 6060:return R+"box-"+u(e,"-grow","")+R+e+T+u(e,"grow","positive")+e;case 4554:return R+u(e,/([^-])(transform)/g,"$1"+R+"$2")+e;case 6187:return u(u(u(e,/(zoom-|grab)/,R+"$1"),/(image-set)/,R+"$1"),e,"")+e;case 5495:case 3959:return u(e,/(image-set\([^]*)/,R+"$1$`$1");case 4968:return u(u(e,/(.+:)(flex-)?(.*)/,R+"box-pack:$3"+T+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+R+e+e;case 4095:case 3583:case 4068:case 2532:return u(e,/(.+)-inline(.+)/,R+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(m(e)-1-r>6)switch(d(e,r+1)){case 109:if(45!==d(e,r+4))break;case 102:return u(e,/(.+:)(.+)-([^]+)/,"$1"+R+"$2-$3$1"+I+(108==d(e,r+3)?"$3":"$2-$3"))+e;case 115:return~p(e,"stretch")?oe(u(e,"stretch","fill-available"),r)+e:e}break;case 4949:if(115!==d(e,r+1))break;case 6444:switch(d(e,m(e)-3-(~p(e,"!important")&&10))){case 107:return u(e,":",":"+R)+e;case 101:return u(e,/(.+:)([^;!]+)(;|!.+)?/,"$1"+R+(45===d(e,14)?"inline-":"")+"box$3$1"+R+"$2$3$1"+T+"$2box$3")+e}break;case 5936:switch(d(e,r+11)){case 114:return R+e+T+u(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return R+e+T+u(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return R+e+T+u(e,/[svh]\w+-[tblr]{2}/,"lr")+e}return R+e+T+e+e}return e}var ae=[function(e,r,t,n){if(e.length>-1&&!e.return)switch(e.type){case W:e.return=oe(e.value,e.length);break;case G:return q([$(e,{value:u(e.value,"@","@"+R)})],n);case M:if(e.length)return function(e,r){return e.map(r).join("")}(e.props,(function(r){switch(function(e,r){return(e=r.exec(e))?e[0]:e}(r,/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":return q([$(e,{props:[u(r,/:(read-\w+)/,":-moz-$1")]})],n);case"::placeholder":return q([$(e,{props:[u(r,/:(plac\w+)/,":"+R+"input-$1")]}),$(e,{props:[u(r,/:(plac\w+)/,":-moz-$1")]}),$(e,{props:[u(r,/:(plac\w+)/,T+"input-$1")]})],n)}return""}))}}],ie=function(e){var r=e.key;if("css"===r){var t=document.querySelectorAll("style[data-emotion]:not([data-s])");Array.prototype.forEach.call(t,(function(e){-1!==e.getAttribute("data-emotion").indexOf(" ")&&(document.head.appendChild(e),e.setAttribute("data-s",""))}))}var n,o,i=e.stylisPlugins||ae,l={},s=[];n=e.container||document.head,Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="'+r+' "]'),(function(e){for(var r=e.getAttribute("data-emotion").split(" "),t=1;t<r.length;t++)l[r[t]]=!0;s.push(e)}));var c,u,p,d,g=[X,(d=function(e){c.insert(e)},function(e){e.root||(e=e.return)&&d(e)})],m=(u=[te,ne].concat(i,g),p=f(u),function(e,r,t,n){for(var o="",a=0;a<p;a++)o+=u[a](e,r,t,n)||"";return o});o=function(e,r,t,n){c=t,q(J(e?e+"{"+r.styles+"}":r.styles),m),n&&(h.inserted[r.name]=!0)};var h={key:r,sheet:new a({key:r,container:n,nonce:e.nonce,speedy:e.speedy,prepend:e.prepend,insertionPoint:e.insertionPoint}),nonce:e.nonce,inserted:l,registered:{},insert:o};return h.sheet.hydrate(s),h};var le=function(e,r,t){var n=e.key+"-"+r.name;!1===t&&void 0===e.registered[n]&&(e.registered[n]=r.styles)};var se={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,scale:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1};function ce(e){var r=Object.create(null);return function(t){return void 0===r[t]&&(r[t]=e(t)),r[t]}}var ue=!1,pe=/[A-Z]|^ms/g,de=/_EMO_([^_]+?)_([^]*?)_EMO_/g,ge=function(e){return 45===e.charCodeAt(1)},me=function(e){return null!=e&&"boolean"!=typeof e},fe=ce((function(e){return ge(e)?e:e.replace(pe,"-$&").toLowerCase()})),he=function(e,r){switch(e){case"animation":case"animationName":if("string"==typeof r)return r.replace(de,(function(e,r,t){return ve={name:r,styles:t,next:ve},r}))}return 1===se[e]||ge(e)||"number"!=typeof r||0===r?r:r+"px"},xe="Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.";function be(e,r,t){if(null==t)return"";var n=t;if(void 0!==n.__emotion_styles)return n;switch(typeof t){case"boolean":return"";case"object":var o=t;if(1===o.anim)return ve={name:o.name,styles:o.styles,next:ve},o.name;var a=t;if(void 0!==a.styles){var i=a.next;if(void 0!==i)for(;void 0!==i;)ve={name:i.name,styles:i.styles,next:ve},i=i.next;return a.styles+";"}return function(e,r,t){var n="";if(Array.isArray(t))for(var o=0;o<t.length;o++)n+=be(e,r,t[o])+";";else for(var a in t){var i=t[a];if("object"!=typeof i){var l=i;null!=r&&void 0!==r[l]?n+=a+"{"+r[l]+"}":me(l)&&(n+=fe(a)+":"+he(a,l)+";")}else{if("NO_COMPONENT_SELECTOR"===a&&ue)throw new Error(xe);if(!Array.isArray(i)||"string"!=typeof i[0]||null!=r&&void 0!==r[i[0]]){var s=be(e,r,i);switch(a){case"animation":case"animationName":n+=fe(a)+":"+s+";";break;default:n+=a+"{"+s+"}"}}else for(var c=0;c<i.length;c++)me(i[c])&&(n+=fe(a)+":"+he(a,i[c])+";")}}return n}(e,r,t);case"function":if(void 0!==e){var l=ve,s=t(e);return ve=l,be(e,r,s)}}var c=t;if(null==r)return c;var u=r[c];return void 0!==u?u:c}var ve,we=/label:\s*([^\s;{]+)\s*(;|$)/g;function ye(e,r,t){if(1===e.length&&"object"==typeof e[0]&&null!==e[0]&&void 0!==e[0].styles)return e[0];var n=!0,o="";ve=void 0;var a=e[0];null==a||void 0===a.raw?(n=!1,o+=be(t,r,a)):o+=a[0];for(var i=1;i<e.length;i++){if(o+=be(t,r,e[i]),n)o+=a[i]}we.lastIndex=0;for(var l,s="";null!==(l=we.exec(o));)s+="-"+l[1];var c=function(e){for(var r,t=0,n=0,o=e.length;o>=4;++n,o-=4)r=1540483477*(65535&(r=255&e.charCodeAt(n)|(255&e.charCodeAt(++n))<<8|(255&e.charCodeAt(++n))<<16|(255&e.charCodeAt(++n))<<24))+(59797*(r>>>16)<<16),t=1540483477*(65535&(r^=r>>>24))+(59797*(r>>>16)<<16)^1540483477*(65535&t)+(59797*(t>>>16)<<16);switch(o){case 3:t^=(255&e.charCodeAt(n+2))<<16;case 2:t^=(255&e.charCodeAt(n+1))<<8;case 1:t=1540483477*(65535&(t^=255&e.charCodeAt(n)))+(59797*(t>>>16)<<16)}return(((t=1540483477*(65535&(t^=t>>>13))+(59797*(t>>>16)<<16))^t>>>15)>>>0).toString(36)}(o)+s;return{name:c,styles:o,next:ve}}var ke=!!o.useInsertionEffect&&o.useInsertionEffect,Ae=ke||function(e){return e()},$e=(ke||n.useLayoutEffect,n.createContext("undefined"!=typeof HTMLElement?ie({key:"css"}):null)),Fe=($e.Provider,function(e){return(0,n.forwardRef)((function(r,t){var o=(0,n.useContext)($e);return e(r,o,t)}))}),Ce=n.createContext({});var Ee,Ne,He={}.hasOwnProperty,Ye="__EMOTION_TYPE_PLEASE_DO_NOT_USE__",Se=function(e){var r=e.cache,t=e.serialized,n=e.isStringTag;return le(r,t,n),Ae((function(){return function(e,r,t){le(e,r,t);var n=e.key+"-"+r.name;if(void 0===e.inserted[r.name]){var o=r;do{e.insert(r===o?"."+n:"",o,e.sheet,!0),o=o.next}while(void 0!==o)}}(r,t,n)})),null},Be=Fe((function(e,r,t){var o=e.css;"string"==typeof o&&void 0!==r.registered[o]&&(o=r.registered[o]);var a=e[Ye],i=[o],l="";"string"==typeof e.className?l=function(e,r,t){var n="";return t.split(" ").forEach((function(t){void 0!==e[t]?r.push(e[t]+";"):t&&(n+=t+" ")})),n}(r.registered,i,e.className):null!=e.className&&(l=e.className+" ");var s=ye(i,void 0,n.useContext(Ce));l+=r.key+"-"+s.name;var c={};for(var u in e)He.call(e,u)&&"css"!==u&&u!==Ye&&(c[u]=e[u]);return c.className=l,t&&(c.ref=t),n.createElement(n.Fragment,null,n.createElement(Se,{cache:r,serialized:s,isStringTag:"string"==typeof a}),n.createElement(a,c))})),ze=(t(4146),function(e,r){var t=arguments;if(null==r||!He.call(r,"css"))return n.createElement.apply(void 0,t);var o=t.length,a=new Array(o);a[0]=Be,a[1]=function(e,r){var t={};for(var n in r)He.call(r,n)&&(t[n]=r[n]);return t[Ye]=e,t}(e,r);for(var i=2;i<o;i++)a[i]=t[i];return n.createElement.apply(null,a)});Ee=ze||(ze={}),Ne||(Ne=Ee.JSX||(Ee.JSX={}));function _e(){for(var e=arguments.length,r=new Array(e),t=0;t<e;t++)r[t]=arguments[t];return ye(r)}},36782:e=>{"use strict";e.exports={options:{namespace:"uil",important:!1,separator:"\\:"},breakpoints:{xs:"500px",sm:"768px",md:"960px",lg:"1200px",xl:"1440px",xxl:"1920px"},colors:{transparent:"transparent",white:"#FFFFFF",black:"#000000","grey-900":"#23263B","grey-800":"#36395A","grey-700":"#484C7A","grey-600":"#5A5E9A","grey-500":"#777AAF","grey-400":"#9698C3","grey-300":"#B6B7D5","grey-200":"#D6D6E7","grey-100":"#F5F5FA","grey-050":"#FCFCFD","pink-900":"#59063D","pink-800":"#88085C","pink-700":"#B80979","pink-600":"#E90A96","pink-500":"#F82CAA","pink-400":"#FB5ABC","pink-300":"#FD89CE","pink-200":"#FEB9E2","pink-100":"#FFEAF6","xenon-900":"#000033","xenon-800":"#042077","xenon-700":"#022EB9","xenon-600":"#003DFF","xenon-500":"#1E59FF","xenon-400":"#457AFF","xenon-300":"#76A0FF","xenon-200":"#BBD1FF","xenon-100":"#F2F4FF","cyan-900":"#00526C","cyan-800":"#00769B","cyan-700":"#009BCB","cyan-600":"#0DB7EB","cyan-500":"#2CC8F7","cyan-400":"#5ADAFF","cyan-300":"#89E5FF","cyan-200":"#B9EFFF","cyan-100":"#E8FAFF","green-900":"#005E36","green-800":"#028950","green-700":"#06B66C","green-600":"#0DE589","green-500":"#5FEB9E","green-400":"#88F0B3","green-300":"#AAF4C8","green-200":"#C9F8DE","green-100":"#E6FCF3","orange-900":"#963209","orange-800":"#BF470A","orange-700":"#E8600A","orange-600":"#F78125","orange-500":"#FAA04B","orange-400":"#FCBC73","orange-300":"#FED59A","orange-200":"#FFE9C3","orange-100":"#FFF9EC","red-900":"#83111E","red-800":"#AB1325","red-700":"#D4142A","red-600":"#EE243C","red-500":"#F4495D","red-400":"#F86E7E","red-300":"#FC95A1","red-200":"#FEBDC5","red-100":"#FFE6E9","neon-900":"#00B928","neon-800":"#0ED724","neon-700":"#2CEE10","neon-600":"#3FFD03","neon-500":"#66FF01","neon-400":"#91FF01","neon-300":"#B4FF01","neon-200":"#CEFF00","neon-100":"#E2FF66","color-predict":"#FFA724","color-recommend":"#FF2A6A"},spacing:{0:0,1:"1px",4:"4px",8:"8px",10:"10px",12:"12px",14:"14px",16:"16px",20:"20px",24:"24px",32:"32px",40:"40px",48:"48px",62:"62px",64:"64px",70:"70px",80:"80px",90:"90px",110:"110px",120:"120px",170:"170px","50p":"50%","80p":"80%"},sizes:{min:"min-content",max:"max-content",0:0,1:"1px",4:"4px",10:"10px",14:"14px",16:"16px",18:"18px",20:"20px",24:"24px",25:"25px",30:"30px",32:"32px",35:"35px",40:"40px",50:"50px",60:"60px",70:"70px",75:"75px",80:"80px",90:"90px",100:"100px",120:"120px",130:"130px",140:"140px",150:"150px",170:"170px",200:"200px",240:"240px",300:"300px",350:"350px",400:"400px",450:"450px",500:"500px",600:"600px",700:"700px",750:"750px",800:"800px",900:"900px",1300:"1300px","10p":"10%","20p":"20%","25p":"25%","30p":"30%","33p":"33.333333%","40p":"40%","50p":"50%","60p":"60%","66p":"66.666666%","70p":"70%","75p":"75%","80p":"80%","90p":"90%","100p":"100%","100vh":"100vh","100vw":"100vw"}}},46942:(e,r)=>{var t;!function(){"use strict";var n={}.hasOwnProperty;function o(){for(var e="",r=0;r<arguments.length;r++){var t=arguments[r];t&&(e=i(e,a(t)))}return e}function a(e){if("string"==typeof e||"number"==typeof e)return e;if("object"!=typeof e)return"";if(Array.isArray(e))return o.apply(null,e);if(e.toString!==Object.prototype.toString&&!e.toString.toString().includes("[native code]"))return e.toString();var r="";for(var t in e)n.call(e,t)&&e[t]&&(r=i(r,t));return r}function i(e,r){return r?e?e+" "+r:e+r:e}e.exports?(o.default=o,e.exports=o):void 0===(t=function(){return o}.apply(r,[]))||(e.exports=t)}()},85054:(e,r,t)=>{"use strict";t.d(r,{A:()=>P});var n=t(96540),o=t(46942),a=t.n(o),i=t(32318);const l={blue:"uil-color-xenon-600","light-blue":"uil-color-xenon-300",green:"uil-color-green-700",grey:"uil-color-grey-800","light-grey":"uil-color-grey-300",orange:"uil-color-orange-600",pink:"uil-color-pink-600",red:"uil-color-red-600",white:"uil-color-white",recommend:"uil-color-color-recommend",neon:"uil-color-green-800"},s=(e,r,t)=>n.Children.map(e,((e,o)=>(t||r)&&e&&void 0!==e&&0===o?(0,i.Y)(n.Fragment,null,e,(0,i.Y)("span",{className:a()("uil-ff-sora uil-fw-semibold uil-ml-8 uil-lsp-normal uil-tt-lower uil-color-nova uil-d-inline-block uil-fsz-10","lg:uil-fsz-12")},(()=>{switch(!0){default:case r:return"(required)";case t:return"(optional)"}})())):e)),c=({big:e=!1,children:r,color:t="grey",icon:n,iconProps:o={},optional:c=!1,required:u=!1,tag:p="span",...d})=>{const g=d.href?"a":p,{className:m,...f}=o,{className:h,...x}=d;return(0,i.Y)(g,{...x,className:a()("uil-ff-sora uil-fw-semibold uil-lsp-big uil-tt-upper",l[t],n&&"uil-d-flex uil-ai-center",e?"uil-fsz-14 lg:uil-fsz-16":"uil-fsz-12",h)},n&&(0,i.Y)(n,{...f,className:a()("uil-mr-8 uil-w-18 uil-h-18 uil-fxs-0","lg:uil-w-24 lg:uil-h-24",m)}),s(r,u,c))},u={grey:"uil-color-grey-800","light-grey":"uil-color-grey-300",white:"uil-color-white"},p=({children:e,color:r="grey",tag:t="h1",...n})=>{const{className:o,...l}=n;return(0,i.Y)(t,{...l,className:a()("uil-fsz-36 uil-lsp-small uil-lh-big uil-fw-thin uil-ff-sora","lg:uil-fsz-56",u[r],o)},e)},d=(e,r,t)=>i.AH`
      border-radius: ${"left"===e?"40px 6px 6px 40px":"6px 40px 40px 6px"};
      ${"translucent"===r?i.AH`
            background: linear-gradient(
              243.43deg,
              rgba(255, 255, 255, 0.4) 0%,
              rgba(255, 255, 255, 0.1) 83.33%
            );
            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.32),
              inset 0px 1px 0px rgb(255 255 255 / 40%);
          `:t&&i.AH`
            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.32);
          `}
    `,g=e=>i.AH`
    left: ${"right"===e&&"-"}2px;
  `,m={blue:"uil-bgc-xenon-600","dark-blue":"uil-bgc-xenon-900",grey:"uil-bgc-xenon-100",translucent:"uil-bgc-transparent"},f="uil-w-32 uil-h-32",h="uil-w-40 uil-h-40",x={blue:"uil-stroke-xenon-600",white:"uil-stroke-white"},b="blue",v="white",w=({icon:e,rounded:r="left",iconProps:t={},shadow:n=!1,big:o=!1,...l})=>{const s=e,{color:c,background:u,...p}=t,w=u?m[u]:m[b],y=c?x[c]:x[v],k=o?h:f;return(0,i.Y)("span",{...l,className:a()(l.className,"uil-d-inline-flex uil-ai-center uil-jc-center",k,w),css:[d(r,u,n)]},(0,i.Y)(s,{...p,stroke:"currentColor",width:16,height:16,css:g(r),className:a()("uil-m-0 uil-p-0 uil-pos-relative","translucent"===u?x.white:y)}))},y=t(36782),k=y.breakpoints.xs,A=(y.breakpoints.sm,y.breakpoints.md),$=y.breakpoints.lg,F=(y.breakpoints.xl,y.breakpoints.xxl,e=>i.AH`
    top: ${e?"-2px":"4px"};
    @media (min-width: ${$}) {
      top: ${e?"0":"6px"};
    }
  `),C={grey:"uil-color-grey-800","light-grey":"uil-color-grey-300",white:"uil-color-white"},E=({children:e,color:r="grey",icon:t,iconProps:n={},tag:o="h3",...l})=>{const{className:s,css:c,iconWrapped:u,...p}=n,{className:d,...g}=l;return(0,i.Y)(o,{...g,className:a()("uil-fsz-24 uil-fw-normal uil-ff-sora uil-lh-big","lg:uil-fsz-28",t&&"uil-d-flex",C[r],d)},(0,i.Y)((()=>{const e={css:[F(u||!1),c],className:a()("uil-mr-8 uil-pos-relative uil-fxs-0",!u&&a()("uil-w-18 uil-h-18","lg:uil-w-24 lg:uil-h-24"),s)};return t?u?(0,i.Y)(w,{...p,...e,icon:t}):(0,i.Y)(t,{...p,...e,"aria-label":`${t.displayName} icon`}):null}),null),e)},N={"dark-grey":"uil-color-xenon-900",grey:"uil-color-xenon-900","light-grey":"uil-color-grey-300","grey-200":"uil-color-grey-200","grey-600":"uil-color-grey-600",white:"uil-color-white"},H={big:"uil-lh-big",bigger:"uil-lh-bigger",small:"uil-lh-small"},Y={normal:"uil-fw-normal",semibold:"uil-fw-semibold"},S=({children:e,color:r="grey",lineHeight:t="bigger",fontWeight:n="normal",small:o=!1,tag:l="p",...s})=>{const{className:c,...u}=s;return(0,i.Y)(l,{...u,className:a()("uil-ff-sora",o?"uil-fsz-14":"uil-fsz-16 lg:uil-fsz-18",Y[n],H[t],N[r],c)},e)};S.displayName="Text";const B=S,z="v1692868147",_=`https://res.cloudinary.com/hilnmyskv/image/upload/${z}/ui-library`,O={background:i.AH`
    background-size: 100% 100%;
  `,imageRight:i.AH`
    left: 50%;
    top: 50%;
    transform: translateX(120px) translateY(-50%);
    @media (min-width: ${$}) {
      transform: translateX(280px) translateY(-50%);
    }
  `,imageLeft:i.AH`
    right: 50%;
    top: 50%;
    transform: translateX(-120px) translateY(-50%);
    @media (min-width: ${$}) {
      transform: translateX(-280px) translateY(-50%);
    }
  `,video:i.AH`
    padding-bottom: 66%;
    @media (min-width: ${k}) {
      padding-bottom: 46%;
    }
    @media (min-width: ${A}) {
      padding-bottom: 66%;
    }
  `,videoTransform:i.AH`
    @media (min-width: ${A}) {
      transform: translateY(-50%);
    }
  `,videoMaxHeight:i.AH`
    max-height: 300px;
  `,playButton:i.AH`
    transform: translate(-50%, -50%);
  `,athleticFields:i.AH`
    padding-bottom: 41%;
    background-image: url('${_}/hero/athletic-fields.svg');
    top: 50%;
    transform: translateY(-50%);
  `,bigCubes:i.AH`
    padding-bottom: 121.25%;
    background-image: url('${_}/hero/big-cubes.svg');
    bottom: calc(-45vw + 95px);
    @media (min-width: ${$}) {
      bottom: calc(-45vw + 135px);
    }
  `,bubbles:i.AH`
    padding-bottom: 35.06%;
    background-image: url('${_}/hero/bubbles.svg');
    bottom: calc(-18vw + 230px);
    @media (min-width: ${$}) {
      bottom: calc(-18vw + 300px);
    }
  `,circles:i.AH`
    padding-bottom: 67.74%;
    background-image: url('${_}/hero/circles.svg');
    bottom: calc(-17.7vw + 103px);
    @media (min-width: ${$}) {
      bottom: calc(-17.7vw + 147px);
    }
  `,cloudLines:i.AH`
    max-width: 650px;
    padding-bottom: 28%;
    background-image: url('${_}/hero/cloud-lines.svg');
    background-size: contain;
    background-repeat: no-repeat;
    top: 50%;
    transform: translateY(-50%);
  `,cubes:i.AH`
    padding-bottom: 36.75%;
    background-image: url('${_}/hero/cubes.svg');
    bottom: calc(-20vw + 140px);
    @media (min-width: ${$}) {
      bottom: calc(-20vw + 180px);
    }
  `,curves:i.AH`
    padding-bottom: 55.27%;
    background-image: url('${_}/hero/curves.svg');
    bottom: calc(-22.5vw + 100px);
    @media (min-width: ${$}) {
      bottom: calc(-22.5vw + 142px);
    }
  `,docsearch:i.AH`
    padding-bottom: 16.92%;
    background-image: url('${_}/hero/docsearch.svg');
    bottom: calc(-22.5vw + 100px);
    @media (min-width: ${$}) {
      bottom: calc(-22.5vw + 142px);
    }
  `,graph:i.AH`
    padding-bottom: 55.27%;
    background-image: url('${_}/hero/graph.svg');
    bottom: calc(-17vw + 100px);
    @media (min-width: ${$}) {
      bottom: calc(-17vw + 142px);
    }
  `,graphBlueLine:i.AH`
    padding-bottom: 55.27%;
    background-image: url('${_}/hero/graph-blue-line.svg');
    bottom: calc(-17vw + 100px);
    @media (min-width: ${$}) {
      bottom: calc(-17vw + 142px);
    }
  `,intersections:i.AH`
    top: 50%;
    padding-bottom: 115.49%;
    background-image: url('${_}/hero/intersections.svg');
    transform: translateY(-50%);
  `,map:i.AH`
    padding-bottom: 59.375%;
    background-image: url('${_}/hero/map.svg');
    bottom: calc(-37vw + 100px);
    @media (min-width: ${$}) {
      bottom: calc(-37vw + 140px);
    }
  `,orangeSquare:i.AH`
    width: 954px;
    height: 500px;
    margin: auto;
    bottom: 100px;
    background-image: url('${_}/hero/orange-square.svg');
    @media (min-width: ${$}) {
      width: 1336px;
      height: 700px;
      bottom: 140px;
    }
  `,orbit:i.AH`
    top: 50%;
    padding-bottom: 55.27%;
    background-image: url('${_}/hero/orbit.svg');
    transform: translateY(-50%);
  `,orbInside:i.AH`
    top: 50%;
    padding-bottom: 48.74%;
    background-image: url('${_}/hero/orb-inside.svg');
    transform: translateY(-50%);
  `,rectangles:i.AH`
    top: 50%;
    padding-bottom: 48.6%;
    background-image: url('${_}/hero/rectangles.svg');
    transform: translateY(-50%);
  `,rectangles2:i.AH`
    padding-bottom: 62.87%;
    background-image: url('${_}/hero/rectangle2.svg');
    top: 50%;
    transform: translateY(-50%);
  `,rounds:i.AH`
    top: 50%;
    padding-bottom: 38.5%;
    background-image: url('${_}/hero/rounds.svg');
    transform: translateY(-50%);
  `,spirals:i.AH`
    padding-bottom: 50%;
    background-image: url('${_}/hero/spirals.svg');
    top: 50%;
    transform: translateY(-50%);
  `,spotlights:i.AH`
    padding-bottom: 55.27%;
    background-image: url('${_}/hero/spotlights.svg');
    bottom: calc(-22.5vw + 100px);
    @media (min-width: ${$}) {
      bottom: calc(-22.5vw + 142px);
    }
  `,triangles:i.AH`
    padding-bottom: 56.25%;
    background-image: url('${_}/hero/triangles.svg');
    top: 50%;
    transform: translateY(-50%);
  `,waves:i.AH`
    padding-bottom: 19.125%;
    background-image: url('${_}/hero/waves.svg');
    bottom: calc(-10vw + 100px);
    @media (min-width: ${$}) {
      bottom: calc(-10vw + 160px);
    }
  `,whirl:i.AH`
    padding-bottom: 56.25%;
    background-image: url('${_}/hero/whirl.svg');
    bottom: calc(-25vw + 100px);
    @media (min-width: ${$}) {
      bottom: calc(-25vw + 140px);
    }
  `},P=({align:e,background:r,children:t,cta:o,text:l,textProps:s={},videoInModal:u,image:d,imageProps:g={},label:m,labelProps:f={},padding:h="normal",poster:x,subtitle:b,subtitleProps:v={},title:w,titleProps:y={},...k})=>{const{className:A,css:$,tag:F,...C}=g,{className:N,...H}=y,{className:Y,color:S,...z}=v,{className:_,...P}=s,{className:D,color:j,tag:T,...I}=f,{className:R,...L}=k,M=F||"img",W="left"===e||d&&"right"!==e,G="right"===e,q=W?"md:uil-gcstart-2 md:uil-gcend-8 md:uil-w-100p md:uil-ta-left":G?"md:uil-gcstart-7 md:uil-gcend-13 md:uil-w-100p md:uil-ta-right":"md:uil-gcstart-2 md:uil-gcend-12 md:uil-w-100p md:uil-ta-center";return(0,i.Y)("header",{...L,className:a()("uil-ph-20 uil-ta-center uil-pos-relative","md:uil-ov-hidden",W&&"md:uil-ta-left",G&&"md:uil-ta-right","small"===h?"uil-pv-32 lg:uil-pv-48":"uil-pv-80 lg:uil-pv-120",R)},r&&(0,i.Y)("div",{css:[O.background,O[r]],className:"uil-pos-absolute uil-bgp-center uil-left-0 uil-right-0 uil-d-none uil-m-auto md:uil-d-block"}),(0,i.Y)("div",{className:a()("uil-pos-relative uil-z-1 uil-maw-500 uil-m-auto","md:uil-maw-1440 md:uil-d-grid md:uil-g-12 md:uil-gvgap-32")},(0,i.Y)("div",{className:q},t,m&&(0,i.Y)(c,{...I,big:!0,className:a()("uil-d-block uil-mt-0 uil-mb-8",q,D),color:j||"blue",tag:T||"p"},m),(0,i.Y)(p,{...H,className:a()("uil-m-0 uil-maw-35ch uil-mr-auto uil-ml-auto","md:uil-w-60p","lg:uil-w-70p",W&&"md:uil-ml-0",G&&"md:uil-ml-auto md:uil-mr-0",N),tag:"h1"},w),b&&(0,i.Y)(E,{...z,className:a()("uil-mt-8 uil-mb-0 uil-ml-auto uil-mr-auto uil-jc-center","lg:uil-mt-20",q,W&&"md:uil-ta-left md:uil-ml-0",G&&"md:uil-ta-right md:uil-mr-0",(W||G)&&"md:uil-w-50p",Y),color:S,tag:"p"},b),l?(0,i.Y)(B,{...P,className:a()("uil-fw-bold",q,W&&"md:uil-ta-left",G&&"md:uil-ta-right",_)},l):null,d&&(0,i.Y)("div",{className:"md:uil-d-none"},(0,i.Y)(M,{...C,className:a()("uil-mt-32 uil-w-100p uil-h-auto",A),src:d,loading:"eager"})),o&&(0,i.Y)("div",{className:a()("uil-mt-32 uil-mh-auto uil-d-flex uil-fxd-column uil-ai-center ","xs:uil-fxd-row xs:uil-jc-center","lg:uil-mt-48",q,W&&"md:uil-jc-start",G&&"md:uil-jc-end")},n.Children.map(o,((e,r)=>{const t=e.type;return t?(0,i.Y)(t,{...e.props,css:t.displayName&&"Button"===t.displayName,className:a()(e.props.className,0!==r&&"uil-mt-16 xs:uil-mt-0 xs:uil-ml-8")}):(0,i.Y)("div",{className:a()(0!==r&&"uil-mt-16 xs:uil-mt-0 xs:uil-ml-8")},e)}))))),d&&(0,i.Y)("div",{className:a()("uil-d-none","md:uil-d-block md:uil-pos-absolute md:uil-left-0 md:uil-top-0 md:uil-right-0 md:uil-bot-0 md:uil-ov-hidden")},(0,i.Y)(M,{...C,css:[W&&O.imageRight,G&&O.imageLeft,$],className:a()("uil-pos-absolute uil-mah-100p",A),src:d})))}}}]);