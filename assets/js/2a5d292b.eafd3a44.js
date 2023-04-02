"use strict";(self.webpackChunkclosing_the_loop_2=self.webpackChunkclosing_the_loop_2||[]).push([[897],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>h});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),p=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=p(e.components);return a.createElement(l.Provider,{value:t},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),m=p(n),d=r,h=m["".concat(l,".").concat(d)]||m[d]||u[d]||i;return n?a.createElement(h,o(o({ref:t},c),{},{components:n})):a.createElement(h,o({ref:t},c))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[m]="string"==typeof e?e:r,o[1]=s;for(var p=2;p<i;p++)o[p]=n[p];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},8238:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>u,frontMatter:()=>i,metadata:()=>s,toc:()=>p});var a=n(7462),r=(n(7294),n(3905));const i={slug:"first-steps-kas",title:"First steps with kas",date:new Date("2021-10-29T00:00:00.000Z"),authors:"lore",tags:["linux","yocto","kas"]},o=void 0,s={permalink:"/first-steps-kas",source:"@site/blog/2021-10-29-first-steps-kas/index.md",title:"First steps with kas",description:"I often work with the Yocto Project to build custom Linux distributions for a",date:"2021-10-29T00:00:00.000Z",formattedDate:"October 29, 2021",tags:[{label:"linux",permalink:"/tags/linux"},{label:"yocto",permalink:"/tags/yocto"},{label:"kas",permalink:"/tags/kas"}],readingTime:4.325,hasTruncateMarker:!0,authors:[{name:"Lorenzo Arena",url:"https://github.com/lorenzo-arena",imageURL:"https://github.com/lorenzo-arena.png",key:"lore"}],frontMatter:{slug:"first-steps-kas",title:"First steps with kas",date:"2021-10-29T00:00:00.000Z",authors:"lore",tags:["linux","yocto","kas"]},nextItem:{title:"Git Subtree",permalink:"/git-subtree"}},l={authorsImageUrls:[void 0]},p=[{value:"Installation",id:"installation",level:2},{value:"Running a simple build",id:"running-a-simple-build",level:2},{value:"Other kas commands",id:"other-kas-commands",level:2},{value:"Integrating with more layers",id:"integrating-with-more-layers",level:2}],c={toc:p},m="wrapper";function u(e){let{components:t,...i}=e;return(0,r.kt)(m,(0,a.Z)({},c,i,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"I often work with the ",(0,r.kt)("a",{parentName:"p",href:"https://www.yoctoproject.org/"},"Yocto Project")," to build custom Linux distributions for a\nvarious range of products. One of the main struggles you can have while working with this tool is managing multiple\ngit repositories in order to produce a successful build. A new tool called ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/siemens/kas"},"kas")," tries\nto simplify this process; let's see how by building a distribution for a Pine64 board."),(0,r.kt)("h2",{id:"installation"},"Installation"),(0,r.kt)("p",null,"First, we must install python3 and pip, together with some other dependencies:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"$ sudo apt install python3 python3-pip\n$ pip3 install distro jsonschema PyYAML\n")),(0,r.kt)("p",null,"Then install kas; I had a problem with a dependency so I had to install another package by hand"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"$ pip3 install testresources\n$ pip3 install kas\n")),(0,r.kt)("h2",{id:"running-a-simple-build"},"Running a simple build"),(0,r.kt)("p",null,"As an example, we can try to build a simple image for the qemu machine which is already contained in the poky\nrepository. We need to create a special file, ",(0,r.kt)("em",{parentName:"p"},"kas-project.yml"),", which will describe how our distribution must be built\nand which layers must be included; we will use the file provided by the kas documentation, with some small tweaks.\nCreate a folder for the project:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"$ mkdir kas-pine64\n$ touch kas-project.yml\n")),(0,r.kt)("p",null,"Add the following snippet to the project configuration file:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},'header:\n   version: 11\nmachine: qemux86-64\ndistro: poky\ntarget: core-image-minimal\nrepos:\n   kas-pine64:\n   poky:\n   url: "https://git.yoctoproject.org/git/poky"\n   refspec: hardknott\n   layers:\n   meta:\n   meta-poky:\n   meta-yocto-bsp:\nlocal_conf_header:\n   kas-pine64: |\n   EXTRA_IMAGE_FEATURES += "debug-tweaks"\n')),(0,r.kt)("p",null,"The ",(0,r.kt)("em",{parentName:"p"},"kas-project.yml")," file is written in ",(0,r.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/YAML"},"YAML"),", a minimal markup language often\nused for configuration files. It allows us to describe our distribution in a very clear way; in this example we will be\nbuilding the ",(0,r.kt)("em",{parentName:"p"},"core-image-minimal")," image based on the ",(0,r.kt)("em",{parentName:"p"},"poky")," distribution for a ",(0,r.kt)("em",{parentName:"p"},"qemux86-64")," machine. The layer used are\nthe ones contained in the ",(0,r.kt)("em",{parentName:"p"},"poky")," layer, listed in the configuration file. The ",(0,r.kt)("inlineCode",{parentName:"p"},"local_conf_header")," section allows\nus to add any line to the ",(0,r.kt)("em",{parentName:"p"},"local.conf")," file in the build folder."),(0,r.kt)("p",null,"We can now use one of the available ",(0,r.kt)("em",{parentName:"p"},"kas")," commands, ",(0,r.kt)("inlineCode",{parentName:"p"},"build"),":"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"$ kas build kas-project.yml\n")),(0,r.kt)("p",null,"kas will clone the repositories indicated in out project file (just poky in this case) and start the build process\nusing ",(0,r.kt)("inlineCode",{parentName:"p"},"bitbake")," for the ",(0,r.kt)("em",{parentName:"p"},"distro")," and ",(0,r.kt)("em",{parentName:"p"},"machine")," we set; at the end of the build process we will have a ",(0,r.kt)("em",{parentName:"p"},"build"),"\nfolder with the same structure of any Yocto project build."),(0,r.kt)("h2",{id:"other-kas-commands"},"Other kas commands"),(0,r.kt)("p",null,"One other useful kas command is ",(0,r.kt)("inlineCode",{parentName:"p"},"shell"),". We can run it like"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"$ kas shell kas-project.yml\n")),(0,r.kt)("p",null,"and what it does is it opens a new shell instance with the build environment loaded. We can also provide a custom\ncommand to execute inside the new shell; for example to replicate the previous build command, we could run:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},'$ kas shell kas-project.yml -c "bitbake core-image-minimal"\n')),(0,r.kt)("p",null,"Since we are running through the basic Yocto demo, we can now try to load the virtual QEMU image:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"$ kas shell kas-project.yml\n$ runqemu qemux86-64 core-image-minimal nographic\n")),(0,r.kt)("p",null,'It will prompt for the admin password to create the tap interfaces, then, after the boot sequence, we can login with\n"root" (since we enabled ',(0,r.kt)("inlineCode",{parentName:"p"},"debug-tweaks")," in the project file). I also tried graphic mode but for some reason the\nGUI never appears, maybe for some restrictions coming from the kas environment."),(0,r.kt)("h2",{id:"integrating-with-more-layers"},"Integrating with more layers"),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"The Pine A64 board",src:n(5603).Z,width:"600",height:"355"})),(0,r.kt)("p",null,"Now let's add some more layers to build an image for a real board, the\n",(0,r.kt)("a",{parentName:"p",href:"https://www.pine64.org/devices/single-board-computers/pine-a64-lts/"},"Pine A64"),'. Under the "repos" section of the\nconfiguration file, add the following lines:'),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},'   meta-openembedded:\n     url: "https://github.com/openembedded/meta-openembedded.git"\n     refspec: hardknott\n     layers:\n       meta-oe:\n   meta-sunxi:\n     url: "https://github.com/linux-sunxi/meta-sunxi.git"\n     refspec: hardknott\n')),(0,r.kt)("p",null,"We can add also one custom layer; it could be fetched from a private git repository, but it can be a simple folder in\nthe project structure as well:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"$ mkdir meta-custom-pine64\n")),(0,r.kt)("p",null,"Create also a ",(0,r.kt)("em",{parentName:"p"},"meta-custom-pine64/conf/layer.conf")," file for our custom layer:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'# We have a conf and classes directory, add to BBPATH\nBBPATH .= ":${LAYERDIR}"\n\n# We have recipes-* directories, add to BBFILES\nBBFILES += "${LAYERDIR}/recipes-*/*/*.bb \\\n            ${LAYERDIR}/recipes-*/*/*.bbappend"\n\nBBFILE_COLLECTIONS += "meta-custom-pine64"\nBBFILE_PATTERN_meta-custom-pine64 = "^${LAYERDIR}/"\nBBFILE_PRIORITY_meta-custom-pine64 = "10"\n\nLAYERDEPENDS_meta-custom-pine64 = ""\nLAYERSERIES_COMPAT_meta-custom-pine64 = "hardknott"\n')),(0,r.kt)("p",null,"We can then add a new custom image creating the ",(0,r.kt)("em",{parentName:"p"},"meta-custom-pine64/recipes-images/images/kas-custom-image.bb")," recipe:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'SUMMARY = "kas custom image"\nLICENSE = "MIT"\n\ninherit core-image\n\nIMAGE_FEATURES += "ssh-server-openssh"\n')),(0,r.kt)("p",null,"Set the image as the build target by changing it in the project configuration file, and add the new layers as well; the\nmachine can be set to ",(0,r.kt)("inlineCode",{parentName:"p"},"pine64-plus"),":"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},"...\nmachine: pine64-plus\ndistro: poky\ntarget: kas-custom-image\n...\n# Add the new layer in our project section\nrepos:\n  kas-pine64:\n    layers:\n      meta-custom-pine64:\n")),(0,r.kt)("p",null,"The build process can be run again with:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"$ kas build kas-project.yml\n# Once the build process ends, we can flash the image\n$ cd build/tmp/deploy/images/pine64-plus/\n$ sudo dd if=kas-custom-image-pine64-plus.sunxi-sdimg of=/dev/sd<X> bs=1024 status=progress\n")),(0,r.kt)("p",null,"If we boot the board using the flashed SD image, we will have a system with a basic image and an ssh server; this can\nwork as a canvas for more structured projects."),(0,r.kt)("p",null,"A small note: at the time of writing there is an issue with U-Boot in\n",(0,r.kt)("a",{parentName:"p",href:"https://github.com/linux-sunxi/meta-sunxi"},"meta-sunxi")," for the pine64-plus machine; I opened a\n",(0,r.kt)("a",{parentName:"p",href:"https://github.com/linux-sunxi/meta-sunxi/pull/330"},"pull request")," to fix that; apply that patch if you want to try to\nbuild the project."))}u.isMDXComponent=!0},5603:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/pine64-plus-d889cb1c7cc40c3b84f6544453819cd6.jpg"}}]);