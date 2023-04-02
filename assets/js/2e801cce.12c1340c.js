"use strict";(self.webpackChunkclosing_the_loop_2=self.webpackChunkclosing_the_loop_2||[]).push([[450],{6029:e=>{e.exports=JSON.parse('{"blogPosts":[{"id":"first-steps-kas","metadata":{"permalink":"/first-steps-kas","source":"@site/blog/2021-10-29-first-steps-kas/index.md","title":"First steps with kas","description":"I often work with the Yocto Project to build custom Linux distributions for a","date":"2021-10-29T00:00:00.000Z","formattedDate":"October 29, 2021","tags":[{"label":"linux","permalink":"/tags/linux"},{"label":"yocto","permalink":"/tags/yocto"},{"label":"kas","permalink":"/tags/kas"}],"readingTime":4.325,"hasTruncateMarker":true,"authors":[{"name":"Lorenzo Arena","url":"https://github.com/lorenzo-arena","imageURL":"https://github.com/lorenzo-arena.png","key":"lore"}],"frontMatter":{"slug":"first-steps-kas","title":"First steps with kas","date":"2021-10-29T00:00:00.000Z","authors":"lore","tags":["linux","yocto","kas"]},"nextItem":{"title":"Git Subtree","permalink":"/git-subtree"}},"content":"I often work with the [Yocto Project](https://www.yoctoproject.org/) to build custom Linux distributions for a\\nvarious range of products. One of the main struggles you can have while working with this tool is managing multiple\\ngit repositories in order to produce a successful build. A new tool called [kas](https://github.com/siemens/kas) tries\\nto simplify this process; let\'s see how by building a distribution for a Pine64 board.\\n\\n\x3c!--truncate--\x3e\\n\\n## Installation\\n\\nFirst, we must install python3 and pip, together with some other dependencies:\\n\\n```bash\\n$ sudo apt install python3 python3-pip\\n$ pip3 install distro jsonschema PyYAML\\n```\\n\\nThen install kas; I had a problem with a dependency so I had to install another package by hand\\n\\n```bash\\n$ pip3 install testresources\\n$ pip3 install kas\\n```\\n\\n## Running a simple build\\n\\nAs an example, we can try to build a simple image for the qemu machine which is already contained in the poky\\nrepository. We need to create a special file, *kas-project.yml*, which will describe how our distribution must be built\\nand which layers must be included; we will use the file provided by the kas documentation, with some small tweaks.\\nCreate a folder for the project:\\n\\n```bash\\n$ mkdir kas-pine64\\n$ touch kas-project.yml\\n```\\n\\nAdd the following snippet to the project configuration file:\\n\\n```yaml\\nheader:\\n   version: 11\\nmachine: qemux86-64\\ndistro: poky\\ntarget: core-image-minimal\\nrepos:\\n   kas-pine64:\\n   poky:\\n   url: \\"https://git.yoctoproject.org/git/poky\\"\\n   refspec: hardknott\\n   layers:\\n   meta:\\n   meta-poky:\\n   meta-yocto-bsp:\\nlocal_conf_header:\\n   kas-pine64: |\\n   EXTRA_IMAGE_FEATURES += \\"debug-tweaks\\"\\n```\\n\\nThe *kas-project.yml* file is written in [YAML](https://en.wikipedia.org/wiki/YAML), a minimal markup language often\\nused for configuration files. It allows us to describe our distribution in a very clear way; in this example we will be\\nbuilding the *core-image-minimal* image based on the *poky* distribution for a *qemux86-64* machine. The layer used are\\nthe ones contained in the *poky* layer, listed in the configuration file. The `local_conf_header` section allows\\nus to add any line to the *local.conf* file in the build folder.\\n\\nWe can now use one of the available *kas* commands, `build`:\\n\\n```bash\\n$ kas build kas-project.yml\\n```\\n\\nkas will clone the repositories indicated in out project file (just poky in this case) and start the build process\\nusing `bitbake` for the *distro* and *machine* we set; at the end of the build process we will have a *build*\\nfolder with the same structure of any Yocto project build.\\n\\n## Other kas commands\\n\\nOne other useful kas command is `shell`. We can run it like\\n\\n```bash\\n$ kas shell kas-project.yml\\n```\\n\\nand what it does is it opens a new shell instance with the build environment loaded. We can also provide a custom\\ncommand to execute inside the new shell; for example to replicate the previous build command, we could run:\\n\\n```bash\\n$ kas shell kas-project.yml -c \\"bitbake core-image-minimal\\"\\n```\\n\\nSince we are running through the basic Yocto demo, we can now try to load the virtual QEMU image:\\n\\n```bash\\n$ kas shell kas-project.yml\\n$ runqemu qemux86-64 core-image-minimal nographic\\n```\\n\\nIt will prompt for the admin password to create the tap interfaces, then, after the boot sequence, we can login with\\n\\"root\\" (since we enabled `debug-tweaks` in the project file). I also tried graphic mode but for some reason the\\nGUI never appears, maybe for some restrictions coming from the kas environment.\\n\\n## Integrating with more layers\\n\\n![The Pine A64 board](./pine64-plus.jpg)\\n\\nNow let\'s add some more layers to build an image for a real board, the\\n[Pine A64](https://www.pine64.org/devices/single-board-computers/pine-a64-lts/). Under the \\"repos\\" section of the\\nconfiguration file, add the following lines:\\n\\n```yaml\\n   meta-openembedded:\\n     url: \\"https://github.com/openembedded/meta-openembedded.git\\"\\n     refspec: hardknott\\n     layers:\\n       meta-oe:\\n   meta-sunxi:\\n     url: \\"https://github.com/linux-sunxi/meta-sunxi.git\\"\\n     refspec: hardknott\\n```\\n\\nWe can add also one custom layer; it could be fetched from a private git repository, but it can be a simple folder in\\nthe project structure as well:\\n\\n```bash\\n$ mkdir meta-custom-pine64\\n```\\n\\nCreate also a *meta-custom-pine64/conf/layer.conf* file for our custom layer:\\n\\n```\\n# We have a conf and classes directory, add to BBPATH\\nBBPATH .= \\":${LAYERDIR}\\"\\n\\n# We have recipes-* directories, add to BBFILES\\nBBFILES += \\"${LAYERDIR}/recipes-*/*/*.bb \\\\\\n            ${LAYERDIR}/recipes-*/*/*.bbappend\\"\\n\\nBBFILE_COLLECTIONS += \\"meta-custom-pine64\\"\\nBBFILE_PATTERN_meta-custom-pine64 = \\"^${LAYERDIR}/\\"\\nBBFILE_PRIORITY_meta-custom-pine64 = \\"10\\"\\n\\nLAYERDEPENDS_meta-custom-pine64 = \\"\\"\\nLAYERSERIES_COMPAT_meta-custom-pine64 = \\"hardknott\\"\\n```\\n\\nWe can then add a new custom image creating the *meta-custom-pine64/recipes-images/images/kas-custom-image.bb* recipe:\\n\\n```\\nSUMMARY = \\"kas custom image\\"\\nLICENSE = \\"MIT\\"\\n\\ninherit core-image\\n\\nIMAGE_FEATURES += \\"ssh-server-openssh\\"\\n```\\n\\nSet the image as the build target by changing it in the project configuration file, and add the new layers as well; the\\nmachine can be set to `pine64-plus`:\\n\\n```yaml\\n...\\nmachine: pine64-plus\\ndistro: poky\\ntarget: kas-custom-image\\n...\\n# Add the new layer in our project section\\nrepos:\\n  kas-pine64:\\n    layers:\\n      meta-custom-pine64:\\n```\\n\\nThe build process can be run again with:\\n\\n```bash\\n$ kas build kas-project.yml\\n# Once the build process ends, we can flash the image\\n$ cd build/tmp/deploy/images/pine64-plus/\\n$ sudo dd if=kas-custom-image-pine64-plus.sunxi-sdimg of=/dev/sd<X> bs=1024 status=progress\\n```\\nIf we boot the board using the flashed SD image, we will have a system with a basic image and an ssh server; this can\\nwork as a canvas for more structured projects.\\n\\nA small note: at the time of writing there is an issue with U-Boot in\\n[meta-sunxi](https://github.com/linux-sunxi/meta-sunxi) for the pine64-plus machine; I opened a\\n[pull request](https://github.com/linux-sunxi/meta-sunxi/pull/330) to fix that; apply that patch if you want to try to\\nbuild the project."},{"id":"git-subtree","metadata":{"permalink":"/git-subtree","source":"@site/blog/2021-10-25-git-subtree/index.md","title":"Git Subtree","description":"The story of how I came into the undocumented git subtree command to help bring back order to an unfortunate","date":"2021-10-25T00:00:00.000Z","formattedDate":"October 25, 2021","tags":[{"label":"git","permalink":"/tags/git"},{"label":"programming","permalink":"/tags/programming"},{"label":"subtree","permalink":"/tags/subtree"}],"readingTime":2.05,"hasTruncateMarker":true,"authors":[{"name":"Lorenzo Arena","url":"https://github.com/lorenzo-arena","imageURL":"https://github.com/lorenzo-arena.png","key":"lore"}],"frontMatter":{"slug":"git-subtree","title":"Git Subtree","date":"2021-10-25T00:00:00.000Z","authors":"lore","tags":["git","programming","subtree"]},"prevItem":{"title":"First steps with kas","permalink":"/first-steps-kas"}},"content":"The story of how I came into the undocumented `git subtree` command to help bring back order to an unfortunate\\nrepository.\\n\\n\x3c!--truncate--\x3e\\n\\n## A little bit of background\\n\\nIt can happen to make wrong choices; in the programming field, in particular, what often happens is that the\\nconsequences arrive suddenly and like an unstoppable escalation. But catastrophisms aside, we come to a need born a few\\ndays ago: in one of the git repositories that I use, which had to act as a \\"warehouse\\" for some small utilities, the\\nsituation has exploded. Managing 15 small projects in a single versioning solution is a real nightmare, so I decided to\\ntry to solve the situation, possibly without simply creating new repositories to start from scratch with the commit\\nhistory copied into them.\\n\\nAfter a little bit of digging, I found a tool which I didn\'t know anything about: **subtree**.\\n\\nSubtree is a script created by extern contributors in the git community and it\'s bundled in the git installation from\\nversion *1.7.11*, but never added to the official documentation (you can, however, read some informations\\n[here](https://github.com/git/git/blob/master/contrib/subtree/git-subtree.txt>)). It allows one to create\\n*subtrees*, which are branches that will join the ones already existent but in an independent manner, creating something\\nlike a new repository in the repository.\\n\\nSubtree also offers some commands which enables the execution of really interesting operations: one of them is\\n`split`, which will create a new branch that will contain the commit history of a subfolder in particular. That\\nseems exactly what we need!\\n\\nLet\'s suppose that the starting repository has a folder structure like this:\\n\\n```\\n   repository\\n   \u2502   .git\\n   \u2502   .gitignore\\n   \u2502\\n   \u2514\u2500\u2500\u2500project1\\n   \u2502   \u2502   file1_1\\n   \u2502   \u2502   file1_2\\n   \u2502\\n   \u2514\u2500\u2500\u2500project2\\n   \u2502   \u2502   file2_1\\n   \u2502   \u2502   file2_2\\n   \u2502\\n   \u2514\u2500\u2500\u2500project3\\n   \u2502   \u2502   file3_1\\n   \u2502   \u2502   file3_2\\n   \u2502\\n```\\n\\nNow if we wanted to extract the *project1* folder we can go like this: first we must create a subtree which will contain\\nonly the commits involving files inside *project1*\\n\\n```bash\\n$ git subtree split --prefix=project1 -b split-branch-project1\\n```\\n\\nThen, we can move into another folder and create the future repository\\n\\n```bash\\n$ mkdir project1\\n$ cd project1\\n$ git init\\n```\\n\\nLet\'s execute a pull from the old repository, referencing the newly created branch:\\n\\n```bash\\n$ git pull ~/repository split-branch-project1\\n```\\n\\nAt this point *project1* will contain only the commit history involving that project; by repeating the process for each\\nproject we can have cleaner repositories without losing the history."}]}')}}]);