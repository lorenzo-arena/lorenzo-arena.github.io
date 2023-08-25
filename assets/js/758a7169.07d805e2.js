"use strict";(self.webpackChunklorenzo_arena_github_io=self.webpackChunklorenzo_arena_github_io||[]).push([[631],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>m});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),u=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=u(e.components);return a.createElement(s.Provider,{value:t},e.children)},d="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},h=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,s=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),d=u(n),h=r,m=d["".concat(s,".").concat(h)]||d[h]||c[h]||l;return n?a.createElement(m,i(i({ref:t},p),{},{components:n})):a.createElement(m,i({ref:t},p))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,i=new Array(l);i[0]=h;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o[d]="string"==typeof e?e:r,i[1]=o;for(var u=2;u<l;u++)i[u]=n[u];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}h.displayName="MDXCreateElement"},1333:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>c,frontMatter:()=>l,metadata:()=>o,toc:()=>u});var a=n(7462),r=(n(7294),n(3905));const l={slug:"wsl-ethernet-adapter",title:"Enabling support for USB Ethernet adapter in WSL 2",date:new Date("2023-08-25T00:00:00.000Z"),authors:"lore",tags:["linux","windows","wsl","kernel"]},i=void 0,o={permalink:"/blog/wsl-ethernet-adapter",source:"@site/blog/2023-08-25-wsl-ethernet-adapter/index.md",title:"Enabling support for USB Ethernet adapter in WSL 2",description:"WSL was a great introduction in Windows for developers who were familiar with working in a Linux environment; however",date:"2023-08-25T00:00:00.000Z",formattedDate:"August 25, 2023",tags:[{label:"linux",permalink:"/blog/tags/linux"},{label:"windows",permalink:"/blog/tags/windows"},{label:"wsl",permalink:"/blog/tags/wsl"},{label:"kernel",permalink:"/blog/tags/kernel"}],readingTime:2.69,hasTruncateMarker:!1,authors:[{name:"Lorenzo Arena",url:"https://github.com/lorenzo-arena",imageURL:"https://github.com/lorenzo-arena.png",key:"lore"}],frontMatter:{slug:"wsl-ethernet-adapter",title:"Enabling support for USB Ethernet adapter in WSL 2",date:"2023-08-25T00:00:00.000Z",authors:"lore",tags:["linux","windows","wsl","kernel"]},nextItem:{title:"Creating 2D wind trails in Godot",permalink:"/blog/godot-wind-trails"}},s={authorsImageUrls:[void 0]},u=[{value:"Recompiling the WSL kernel",id:"recompiling-the-wsl-kernel",level:3},{value:"Starting the WSL with the custom kernel",id:"starting-the-wsl-with-the-custom-kernel",level:3},{value:"Insalling usbipd",id:"insalling-usbipd",level:3},{value:"Using a USB device",id:"using-a-usb-device",level:3}],p={toc:u},d="wrapper";function c(e){let{components:t,...n}=e;return(0,r.kt)(d,(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"WSL was a great introduction in Windows for developers who were familiar with working in a Linux environment; however\none of the main pain points of WSL 1 was the extremely slowness when working with files. That changed in better with\nWSL 2, but the new virtualization system came with a fully NATted VM. Unfortunately that led WSL 2 to not being usable\nfor some environments, for example when UDP communication or broadcasting is needed."),(0,r.kt)("p",null,"Recently I had some USB Ethernet adapters laying around, and I thought about making it work with WSL 2, with the help\nof the ",(0,r.kt)("inlineCode",{parentName:"p"},"usbipd")," tool."),(0,r.kt)("h3",{id:"recompiling-the-wsl-kernel"},"Recompiling the WSL kernel"),(0,r.kt)("p",null,"The first step to make the adapter work under the WSL is to recompile its kernel so that the necessary drivers are\nadded."),(0,r.kt)("p",null,"Open a WSL terminal and run:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"# Install the building dependencies\n$ sudo apt install build-essential flex bison libssl-dev libelf-dev git dwarves libncurses-dev bc\n$ git clone https://github.com/microsoft/WSL2-Linux-Kernel.git\n$ cd WSL2-Linux-Kernel\n$ cp Microsoft/config-wsl .config\n")),(0,r.kt)("p",null,"Now that we have the sources available, the next thing to do is to update the kernel configuration so that our ethernet\nadapter is supported. In my case, I had ",(0,r.kt)("inlineCode",{parentName:"p"},"USBNET")," already enabled but I needed an additional driver."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"# Enter the configuration menu\n$ make menuconfig\n")),(0,r.kt)("p",null,"Search the relevant driver using ",(0,r.kt)("inlineCode",{parentName:"p"},"/"),"; in my case it was ",(0,r.kt)("inlineCode",{parentName:"p"},"RTL8152"),". Press ",(0,r.kt)("inlineCode",{parentName:"p"},"1")," to navigate to the corresponding\nconfiguration entry and ",(0,r.kt)("inlineCode",{parentName:"p"},"Y")," to add it to the configuration. Using the arrow keys navigate to ",(0,r.kt)("inlineCode",{parentName:"p"},"< Save >"),", leave the\ndefault ",(0,r.kt)("inlineCode",{parentName:"p"},".config")," name and the configuration menu."),(0,r.kt)("p",null,"Now build the updated kernel:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"# Use your core count as the -j argument\n$ make -j16\n")),(0,r.kt)("h3",{id:"starting-the-wsl-with-the-custom-kernel"},"Starting the WSL with the custom kernel"),(0,r.kt)("p",null,"Now that we have a custom kernel, we need to configure the WSL so that it's used when starting it up. Copy the kernel\nbinary to Windows:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"$ cp arch/x86/boot/bzImage /mnt/c/Users/<username>\n")),(0,r.kt)("p",null,"Then create a file in ",(0,r.kt)("inlineCode",{parentName:"p"},"%userprofile%\\.wslconfig")," with the following content:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ini"},"[wsl2]\n; Double backslashes are required!\nkernel=C:\\\\Users\\\\<username>\\\\bzimage\n")),(0,r.kt)("p",null,"Close all the WSL terminals, then in Powershell run:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-powershell"},"> wsl --shutdown\n")),(0,r.kt)("p",null,"Reopen a WSL terminal."),(0,r.kt)("h3",{id:"insalling-usbipd"},"Insalling usbipd"),(0,r.kt)("p",null,"To use a USB device from the WSL, we can follow the instructions found at\n",(0,r.kt)("a",{parentName:"p",href:"https://learn.microsoft.com/it-it/windows/wsl/connect-usb"},"https://learn.microsoft.com/it-it/windows/wsl/connect-usb"),": go to the\n",(0,r.kt)("a",{parentName:"p",href:"https://github.com/dorssel/usbipd-win/releases"},"release page for usbipd")," and download the setup file from the latest\nrelease; then install it. In the WSL terminal, run:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"$ sudo apt install linux-tools-generic hwdata\n$ sudo update-alternatives --install /usr/local/bin/usbip usbip /usr/lib/linux-tools/*-generic/usbip 20\n")),(0,r.kt)("h3",{id:"using-a-usb-device"},"Using a USB device"),(0,r.kt)("p",null,"Every time a USB device must be used from within the WSL, open a Powershell and run:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-powershell"},"> usbipd wsl list\n")),(0,r.kt)("p",null,"This will list the available USB devices together with a bus identifier; search for the USB ethernet adapter device,\nthen run:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-powershell"},"> usbipd wsl attach --busid <busid>\n")),(0,r.kt)("p",null,"In the WSL terminal, run:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"$ lsusb\n")),(0,r.kt)("p",null,"This should print the ethernet adapter in the device list; this procedure must be followed every time the PC is turned\non."),(0,r.kt)("p",null,"By default, no network manager is installed in WSL, so I had to manually turn on the interface and start a DHCP client\nfor the new interface, then it was fully working."))}c.isMDXComponent=!0}}]);