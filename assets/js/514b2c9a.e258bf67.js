"use strict";(self.webpackChunkclosing_the_loop_2=self.webpackChunkclosing_the_loop_2||[]).push([[235],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>g});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var l=n.createContext({}),c=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=c(e.components);return n.createElement(l.Provider,{value:t},e.children)},u="mdxType",f={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),u=c(r),m=o,g=u["".concat(l,".").concat(m)]||u[m]||f[m]||a;return r?n.createElement(g,i(i({ref:t},p),{},{components:r})):n.createElement(g,i({ref:t},p))}));function g(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[u]="string"==typeof e?e:o,i[1]=s;for(var c=2;c<a;c++)i[c]=r[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},7277:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>f,frontMatter:()=>a,metadata:()=>s,toc:()=>c});var n=r(7462),o=(r(7294),r(3905));const a={slug:"first-steps-kas",title:"First steps with kas",date:new Date("2021-10-29T00:00:00.000Z"),authors:"lore",tags:["linux","yocto","kas"]},i=void 0,s={permalink:"/first-steps-kas",source:"@site/blog/2021-10-29-first-steps-kas/index.md",title:"First steps with kas",description:"I often work with the Yocto Project to build custom Linux distributions for a",date:"2021-10-29T00:00:00.000Z",formattedDate:"October 29, 2021",tags:[{label:"linux",permalink:"/tags/linux"},{label:"yocto",permalink:"/tags/yocto"},{label:"kas",permalink:"/tags/kas"}],readingTime:4.325,hasTruncateMarker:!0,authors:[{name:"Lorenzo Arena",url:"https://github.com/lorenzo-arena",imageURL:"https://github.com/lorenzo-arena.png",key:"lore"}],frontMatter:{slug:"first-steps-kas",title:"First steps with kas",date:"2021-10-29T00:00:00.000Z",authors:"lore",tags:["linux","yocto","kas"]},nextItem:{title:"Git Subtree",permalink:"/git-subtree"}},l={authorsImageUrls:[void 0]},c=[],p={toc:c},u="wrapper";function f(e){let{components:t,...r}=e;return(0,o.kt)(u,(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"I often work with the ",(0,o.kt)("a",{parentName:"p",href:"https://www.yoctoproject.org/"},"Yocto Project")," to build custom Linux distributions for a\nvarious range of products. One of the main struggles you can have while working with this tool is managing multiple\ngit repositories in order to produce a successful build. A new tool called ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/siemens/kas"},"kas")," tries\nto simplify this process; let's see how by building a distribution for a Pine64 board."))}f.isMDXComponent=!0}}]);