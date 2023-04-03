"use strict";(self.webpackChunklorenzo_arena_github_io=self.webpackChunklorenzo_arena_github_io||[]).push([[477],{10:e=>{e.exports=JSON.parse('{"blogPosts":[{"id":"godot-wind-trails","metadata":{"permalink":"/blog/godot-wind-trails","source":"@site/blog/2023-04-02-godot-wind-trails/index.md","title":"Creating 2D wind trails in Godot","description":"From first the moment I played Titan Souls for the first time, I fell in","date":"2023-04-02T00:00:00.000Z","formattedDate":"April 2, 2023","tags":[{"label":"godot","permalink":"/blog/tags/godot"},{"label":"gamedev","permalink":"/blog/tags/gamedev"}],"readingTime":4.515,"hasTruncateMarker":true,"authors":[{"name":"Lorenzo Arena","url":"https://github.com/lorenzo-arena","imageURL":"https://github.com/lorenzo-arena.png","key":"lore"}],"frontMatter":{"slug":"godot-wind-trails","title":"Creating 2D wind trails in Godot","date":"2023-04-02T00:00:00.000Z","authors":"lore","tags":["godot","gamedev"]},"nextItem":{"title":"First steps with kas","permalink":"/blog/first-steps-kas"}},"content":"From first the moment I played [Titan Souls](https://www.youtube.com/watch?v=9AV4Cd7wdpA) for the first time, I fell in\\r\\nlove with its environment art. One detail caught my attention: the wind represented as trails over the scene. I tried to\\r\\nrecreate a similar effect in [Godot](https://godotengine.org/).\\r\\n\\r\\n\x3c!--truncate--\x3e\\r\\n\\r\\nI came up with this solution after watching [this tutorial](https://www.youtube.com/watch?v=0HCzL5ealtI); however the\\r\\neffect didn\'t exactly match my desired outcome so I had to rework it a little bit.\\r\\n\\r\\nThe following GIF shows the end result (in which the effect was purposefully exaggerated with a long trail):\\r\\n\\r\\n![The end result](./result.gif)\\r\\n\\r\\n:::note\\r\\n\\r\\nI used C# scripting to implement the solution, however the code from this article can be easily ported to GDScript.\\r\\n\\r\\n:::\\r\\n\\r\\n:::note\\r\\n\\r\\nThe whole thing has been developed on the latest Godot 4 stable version as of the time of writing.\\r\\n\\r\\n:::\\r\\n\\r\\n## The idea\\r\\n\\r\\nThe main idea is to use the native Line2D Godot node and create various \\"segments\\" to create the line movement. This\\r\\nwill be used together with a Path2D node and a list of PathFollow2D nodes to move the line points on the desired path.\\r\\n\\r\\nThe scene will be created without a predefined Path2D child node, and each scene which instantiate a \\"WindTrail\\" node\\r\\nwill have to provide the Path2D for that trail node.\\r\\n\\r\\n## The implementation\\r\\n\\r\\nStart by creating a new scene of type Line2D; rename the base node to \\"WindTrail\\" and save the scene as\\r\\n`wind_trail.tscn`. Attach a C# script to it (rename it to `WindTrail.cs`) the add the following exports to configure\\r\\nsome of the trail properties:\\r\\n\\r\\n```cs title=\\"WindTrail.cs\\"\\r\\n[Export]\\r\\nprivate int segments = 30;\\r\\n[Export]\\r\\nprivate float pathLength = 15;\\r\\n[Export]\\r\\nprivate float pathSpeed = 200;\\r\\n```\\r\\n\\r\\nThen on the top of the script add the directive to include .NET collections, since we\'ll need to use a `List` for the\\r\\n`PathFollow2D` nodes; also add such list and a property to keep a reference to a Path2D child node:\\r\\n\\r\\n```cs title=\\"WindTrail.cs\\"\\r\\n/* On the top of the script */\\r\\nusing System.Collections.Generic;\\r\\n...\\r\\n/* Inside our custom node class */\\r\\n// This will contain a reference to the Path2D node created\\r\\n// by whoever instantiated the scene\\r\\nprivate Path2D path2D;\\r\\nprivate List<PathFollow2D> pathFollowList = new();\\r\\n```\\r\\n\\r\\nWe\'ll use a method to dynamically add PathFollow2D children to the Path2D node; they should be distanced so that the\\r\\nline has the desired length, and that will be tracked in the `Progress` property of each PathFollow2D node:\\r\\n\\r\\n```cs title=\\"WindTrail.cs\\"\\r\\nprivate void InitPathFollowers()\\r\\n{\\r\\n    for (int i = 0; i < segments; i++)\\r\\n    {\\r\\n        var newPathFollow = new PathFollow2D();\\r\\n        path2D.AddChild(newPathFollow);\\r\\n\\r\\n        newPathFollow.Progress = (i / (float)(segments - 1)) * (-pathLength);\\r\\n        newPathFollow.Loop = false;\\r\\n\\r\\n        pathFollowList.Add(newPathFollow);\\r\\n    }\\r\\n}\\r\\n```\\r\\n\\r\\nOverride the `_Ready` method to initialize the path followers:\\r\\n\\r\\n```cs title=\\"WindTrail.cs\\"\\r\\npublic override void _Ready()\\r\\n{\\r\\n    path2D = GetNode<Path2D>(\\"Path2D\\");\\r\\n    if (path2D == null)\\r\\n    {\\r\\n        GD.Print(\\"missing Path2D child for WindTrail\\");\\r\\n        return;\\r\\n    }\\r\\n\\r\\n    InitPathFollowers();\\r\\n}\\r\\n```\\r\\n\\r\\nNow on each frame we need to advance the progress of the PathFollow2D nodes and to redraw the line according the their\\r\\nupdated position. Let\'s first implement the method to move the PathFollow2D nodes:\\r\\n\\r\\n```cs title=\\"WindTrail.cs\\"\\r\\nprivate void MovePath(double delta)\\r\\n{\\r\\n    int firstUncompletePointIndex =\\r\\n        pathFollowList.FindIndex(0, pathFollowList.Count, pf => pf.ProgressRatio < 1.0f);\\r\\n    pathFollowList[firstUncompletePointIndex].Progress += (float)(pathSpeed * delta);\\r\\n\\r\\n    for (int i = firstUncompletePointIndex + 1; i < segments; i++)\\r\\n    {\\r\\n        pathFollowList[i].Progress =\\r\\n            pathFollowList[i - 1].Progress - (((i / (float)(segments - 1)) * (pathLength)));\\r\\n    }\\r\\n}\\r\\n```\\r\\n\\r\\nFor the effect that we want to achieve we should find the first PathFollow2D node which hasn\'t reached the Path2D end;\\r\\nthen such node should be advanced according to the configured speed and each node after that based on the trail length.\\r\\nThis way the trail will \\"compress\\" toward the path\'s end.\\r\\n\\r\\nThen we also need a method to redraw the line based on the update position of the PathFollow2D nodes:\\r\\n\\r\\n```cs title=\\"WindTrail.cs\\"\\r\\nprivate void DrawPath()\\r\\n{\\r\\n    ClearPoints();\\r\\n\\r\\n    foreach (var pathFollow in pathFollowList)\\r\\n    {\\r\\n        AddPoint(pathFollow.GlobalPosition);\\r\\n    }\\r\\n}\\r\\n```\\r\\n\\r\\nLet\'s put it together to advance the trail on each frame:\\r\\n\\r\\n```cs title=\\"WindTrail.cs\\"\\r\\npublic override void _Process(double delta)\\r\\n{\\r\\n    if (path2D == null)\\r\\n    {\\r\\n        return;\\r\\n    }\\r\\n\\r\\n    MovePath(delta);\\r\\n    DrawPath();\\r\\n}\\r\\n```\\r\\n\\r\\nLet\'s also edit some of the Line2D properties: in the Inspector tab change the line width to 5px, then create a new\\r\\n*Width Curve* by clicking on the empty box and selecting \\"New curve\\". Add 3 points by clicking \\"Add element\\" and set\\r\\ntheir values as given in the following image:\\r\\n\\r\\n![Width Curve settings](./width_curve.png)\\r\\n\\r\\nThis will give the wind trail a little bit of width variation while it\'s moving.\\r\\n\\r\\n## Using the WindTrail scene\\r\\n\\r\\nNow when we need to show a new wind trail on our game scene we can just instantiate a WindTrail node, add a Path2D\\r\\nchild with a configured path and the effect will be shown on the scene startup.\\r\\n\\r\\n![Using the WindTrail scene](./wind_trail_instance.png)\\r\\n\\r\\n## Improvements\\r\\n\\r\\nPossible improvements would be:\\r\\n\\r\\n* adding an auto-clean feature, so that the WindTrail node gets freed as soon as the trail reaches the end; this can be\\r\\n  done easily by adding a couple of lines of code at the end of the `MovePath` method:\\r\\n\\r\\n  ```cs\\r\\n  // Check if the last PathFollow2D node has reached the end of the trail\\r\\n  if (pathFollowList[pathFollowList.Count - 1].ProgressRatio >= 1.0f)\\r\\n  {\\r\\n      QueueFree();\\r\\n  }\\r\\n  ```\\r\\n\\r\\n* having a method to start/restart/stop the trail programmatically, so that we can instantiate a number of wind trails\\r\\n  in our scene and having something like a `WindTrailController` node which randomly starts one or more of those trails"},{"id":"first-steps-kas","metadata":{"permalink":"/blog/first-steps-kas","source":"@site/blog/2021-10-29-first-steps-kas/index.md","title":"First steps with kas","description":"I often work with the Yocto Project to build custom Linux distributions for a","date":"2021-10-29T00:00:00.000Z","formattedDate":"October 29, 2021","tags":[{"label":"linux","permalink":"/blog/tags/linux"},{"label":"yocto","permalink":"/blog/tags/yocto"},{"label":"kas","permalink":"/blog/tags/kas"}],"readingTime":4.325,"hasTruncateMarker":true,"authors":[{"name":"Lorenzo Arena","url":"https://github.com/lorenzo-arena","imageURL":"https://github.com/lorenzo-arena.png","key":"lore"}],"frontMatter":{"slug":"first-steps-kas","title":"First steps with kas","date":"2021-10-29T00:00:00.000Z","authors":"lore","tags":["linux","yocto","kas"]},"prevItem":{"title":"Creating 2D wind trails in Godot","permalink":"/blog/godot-wind-trails"},"nextItem":{"title":"Git Subtree","permalink":"/blog/git-subtree"}},"content":"I often work with the [Yocto Project](https://www.yoctoproject.org/) to build custom Linux distributions for a\\r\\nvarious range of products. One of the main struggles you can have while working with this tool is managing multiple\\r\\ngit repositories in order to produce a successful build. A new tool called [kas](https://github.com/siemens/kas) tries\\r\\nto simplify this process; let\'s see how by building a distribution for a Pine64 board.\\r\\n\\r\\n\x3c!--truncate--\x3e\\r\\n\\r\\n## Installation\\r\\n\\r\\nFirst, we must install python3 and pip, together with some other dependencies:\\r\\n\\r\\n```bash\\r\\n$ sudo apt install python3 python3-pip\\r\\n$ pip3 install distro jsonschema PyYAML\\r\\n```\\r\\n\\r\\nThen install kas; I had a problem with a dependency so I had to install another package by hand\\r\\n\\r\\n```bash\\r\\n$ pip3 install testresources\\r\\n$ pip3 install kas\\r\\n```\\r\\n\\r\\n## Running a simple build\\r\\n\\r\\nAs an example, we can try to build a simple image for the qemu machine which is already contained in the poky\\r\\nrepository. We need to create a special file, *kas-project.yml*, which will describe how our distribution must be built\\r\\nand which layers must be included; we will use the file provided by the kas documentation, with some small tweaks.\\r\\nCreate a folder for the project:\\r\\n\\r\\n```bash\\r\\n$ mkdir kas-pine64\\r\\n$ touch kas-project.yml\\r\\n```\\r\\n\\r\\nAdd the following snippet to the project configuration file:\\r\\n\\r\\n```yaml\\r\\nheader:\\r\\n   version: 11\\r\\nmachine: qemux86-64\\r\\ndistro: poky\\r\\ntarget: core-image-minimal\\r\\nrepos:\\r\\n   kas-pine64:\\r\\n   poky:\\r\\n   url: \\"https://git.yoctoproject.org/git/poky\\"\\r\\n   refspec: hardknott\\r\\n   layers:\\r\\n   meta:\\r\\n   meta-poky:\\r\\n   meta-yocto-bsp:\\r\\nlocal_conf_header:\\r\\n   kas-pine64: |\\r\\n   EXTRA_IMAGE_FEATURES += \\"debug-tweaks\\"\\r\\n```\\r\\n\\r\\nThe *kas-project.yml* file is written in [YAML](https://en.wikipedia.org/wiki/YAML), a minimal markup language often\\r\\nused for configuration files. It allows us to describe our distribution in a very clear way; in this example we will be\\r\\nbuilding the *core-image-minimal* image based on the *poky* distribution for a *qemux86-64* machine. The layer used are\\r\\nthe ones contained in the *poky* layer, listed in the configuration file. The `local_conf_header` section allows\\r\\nus to add any line to the *local.conf* file in the build folder.\\r\\n\\r\\nWe can now use one of the available *kas* commands, `build`:\\r\\n\\r\\n```bash\\r\\n$ kas build kas-project.yml\\r\\n```\\r\\n\\r\\nkas will clone the repositories indicated in out project file (just poky in this case) and start the build process\\r\\nusing `bitbake` for the *distro* and *machine* we set; at the end of the build process we will have a *build*\\r\\nfolder with the same structure of any Yocto project build.\\r\\n\\r\\n## Other kas commands\\r\\n\\r\\nOne other useful kas command is `shell`. We can run it like\\r\\n\\r\\n```bash\\r\\n$ kas shell kas-project.yml\\r\\n```\\r\\n\\r\\nand what it does is it opens a new shell instance with the build environment loaded. We can also provide a custom\\r\\ncommand to execute inside the new shell; for example to replicate the previous build command, we could run:\\r\\n\\r\\n```bash\\r\\n$ kas shell kas-project.yml -c \\"bitbake core-image-minimal\\"\\r\\n```\\r\\n\\r\\nSince we are running through the basic Yocto demo, we can now try to load the virtual QEMU image:\\r\\n\\r\\n```bash\\r\\n$ kas shell kas-project.yml\\r\\n$ runqemu qemux86-64 core-image-minimal nographic\\r\\n```\\r\\n\\r\\nIt will prompt for the admin password to create the tap interfaces, then, after the boot sequence, we can login with\\r\\n\\"root\\" (since we enabled `debug-tweaks` in the project file). I also tried graphic mode but for some reason the\\r\\nGUI never appears, maybe for some restrictions coming from the kas environment.\\r\\n\\r\\n## Integrating with more layers\\r\\n\\r\\n![The Pine A64 board](./pine64-plus.jpg)\\r\\n\\r\\nNow let\'s add some more layers to build an image for a real board, the\\r\\n[Pine A64](https://www.pine64.org/devices/single-board-computers/pine-a64-lts/). Under the \\"repos\\" section of the\\r\\nconfiguration file, add the following lines:\\r\\n\\r\\n```yaml\\r\\n   meta-openembedded:\\r\\n     url: \\"https://github.com/openembedded/meta-openembedded.git\\"\\r\\n     refspec: hardknott\\r\\n     layers:\\r\\n       meta-oe:\\r\\n   meta-sunxi:\\r\\n     url: \\"https://github.com/linux-sunxi/meta-sunxi.git\\"\\r\\n     refspec: hardknott\\r\\n```\\r\\n\\r\\nWe can add also one custom layer; it could be fetched from a private git repository, but it can be a simple folder in\\r\\nthe project structure as well:\\r\\n\\r\\n```bash\\r\\n$ mkdir meta-custom-pine64\\r\\n```\\r\\n\\r\\nCreate also a *meta-custom-pine64/conf/layer.conf* file for our custom layer:\\r\\n\\r\\n```\\r\\n# We have a conf and classes directory, add to BBPATH\\r\\nBBPATH .= \\":${LAYERDIR}\\"\\r\\n\\r\\n# We have recipes-* directories, add to BBFILES\\r\\nBBFILES += \\"${LAYERDIR}/recipes-*/*/*.bb \\\\\\r\\n            ${LAYERDIR}/recipes-*/*/*.bbappend\\"\\r\\n\\r\\nBBFILE_COLLECTIONS += \\"meta-custom-pine64\\"\\r\\nBBFILE_PATTERN_meta-custom-pine64 = \\"^${LAYERDIR}/\\"\\r\\nBBFILE_PRIORITY_meta-custom-pine64 = \\"10\\"\\r\\n\\r\\nLAYERDEPENDS_meta-custom-pine64 = \\"\\"\\r\\nLAYERSERIES_COMPAT_meta-custom-pine64 = \\"hardknott\\"\\r\\n```\\r\\n\\r\\nWe can then add a new custom image creating the *meta-custom-pine64/recipes-images/images/kas-custom-image.bb* recipe:\\r\\n\\r\\n```\\r\\nSUMMARY = \\"kas custom image\\"\\r\\nLICENSE = \\"MIT\\"\\r\\n\\r\\ninherit core-image\\r\\n\\r\\nIMAGE_FEATURES += \\"ssh-server-openssh\\"\\r\\n```\\r\\n\\r\\nSet the image as the build target by changing it in the project configuration file, and add the new layers as well; the\\r\\nmachine can be set to `pine64-plus`:\\r\\n\\r\\n```yaml\\r\\n...\\r\\nmachine: pine64-plus\\r\\ndistro: poky\\r\\ntarget: kas-custom-image\\r\\n...\\r\\n# Add the new layer in our project section\\r\\nrepos:\\r\\n  kas-pine64:\\r\\n    layers:\\r\\n      meta-custom-pine64:\\r\\n```\\r\\n\\r\\nThe build process can be run again with:\\r\\n\\r\\n```bash\\r\\n$ kas build kas-project.yml\\r\\n# Once the build process ends, we can flash the image\\r\\n$ cd build/tmp/deploy/images/pine64-plus/\\r\\n$ sudo dd if=kas-custom-image-pine64-plus.sunxi-sdimg of=/dev/sd<X> bs=1024 status=progress\\r\\n```\\r\\nIf we boot the board using the flashed SD image, we will have a system with a basic image and an ssh server; this can\\r\\nwork as a canvas for more structured projects.\\r\\n\\r\\nA small note: at the time of writing there is an issue with U-Boot in\\r\\n[meta-sunxi](https://github.com/linux-sunxi/meta-sunxi) for the pine64-plus machine; I opened a\\r\\n[pull request](https://github.com/linux-sunxi/meta-sunxi/pull/330) to fix that; apply that patch if you want to try to\\r\\nbuild the project."},{"id":"git-subtree","metadata":{"permalink":"/blog/git-subtree","source":"@site/blog/2021-10-25-git-subtree/index.md","title":"Git Subtree","description":"The story of how I came into the undocumented git subtree command to help bring back order to an unfortunate","date":"2021-10-25T00:00:00.000Z","formattedDate":"October 25, 2021","tags":[{"label":"git","permalink":"/blog/tags/git"},{"label":"programming","permalink":"/blog/tags/programming"},{"label":"subtree","permalink":"/blog/tags/subtree"}],"readingTime":2.05,"hasTruncateMarker":true,"authors":[{"name":"Lorenzo Arena","url":"https://github.com/lorenzo-arena","imageURL":"https://github.com/lorenzo-arena.png","key":"lore"}],"frontMatter":{"slug":"git-subtree","title":"Git Subtree","date":"2021-10-25T00:00:00.000Z","authors":"lore","tags":["git","programming","subtree"]},"prevItem":{"title":"First steps with kas","permalink":"/blog/first-steps-kas"}},"content":"The story of how I came into the undocumented `git subtree` command to help bring back order to an unfortunate\\r\\nrepository.\\r\\n\\r\\n\x3c!--truncate--\x3e\\r\\n\\r\\n## A little bit of background\\r\\n\\r\\nIt can happen to make wrong choices; in the programming field, in particular, what often happens is that the\\r\\nconsequences arrive suddenly and like an unstoppable escalation. But catastrophisms aside, we come to a need born a few\\r\\ndays ago: in one of the git repositories that I use, which had to act as a \\"warehouse\\" for some small utilities, the\\r\\nsituation has exploded. Managing 15 small projects in a single versioning solution is a real nightmare, so I decided to\\r\\ntry to solve the situation, possibly without simply creating new repositories to start from scratch with the commit\\r\\nhistory copied into them.\\r\\n\\r\\nAfter a little bit of digging, I found a tool which I didn\'t know anything about: **subtree**.\\r\\n\\r\\nSubtree is a script created by extern contributors in the git community and it\'s bundled in the git installation from\\r\\nversion *1.7.11*, but never added to the official documentation (you can, however, read some informations\\r\\n[here](https://github.com/git/git/blob/master/contrib/subtree/git-subtree.txt>)). It allows one to create\\r\\n*subtrees*, which are branches that will join the ones already existent but in an independent manner, creating something\\r\\nlike a new repository in the repository.\\r\\n\\r\\nSubtree also offers some commands which enables the execution of really interesting operations: one of them is\\r\\n`split`, which will create a new branch that will contain the commit history of a subfolder in particular. That\\r\\nseems exactly what we need!\\r\\n\\r\\nLet\'s suppose that the starting repository has a folder structure like this:\\r\\n\\r\\n```\\r\\n   repository\\r\\n   \u2502   .git\\r\\n   \u2502   .gitignore\\r\\n   \u2502\\r\\n   \u2514\u2500\u2500\u2500project1\\r\\n   \u2502   \u2502   file1_1\\r\\n   \u2502   \u2502   file1_2\\r\\n   \u2502\\r\\n   \u2514\u2500\u2500\u2500project2\\r\\n   \u2502   \u2502   file2_1\\r\\n   \u2502   \u2502   file2_2\\r\\n   \u2502\\r\\n   \u2514\u2500\u2500\u2500project3\\r\\n   \u2502   \u2502   file3_1\\r\\n   \u2502   \u2502   file3_2\\r\\n   \u2502\\r\\n```\\r\\n\\r\\nNow if we wanted to extract the *project1* folder we can go like this: first we must create a subtree which will contain\\r\\nonly the commits involving files inside *project1*\\r\\n\\r\\n```bash\\r\\n$ git subtree split --prefix=project1 -b split-branch-project1\\r\\n```\\r\\n\\r\\nThen, we can move into another folder and create the future repository\\r\\n\\r\\n```bash\\r\\n$ mkdir project1\\r\\n$ cd project1\\r\\n$ git init\\r\\n```\\r\\n\\r\\nLet\'s execute a pull from the old repository, referencing the newly created branch:\\r\\n\\r\\n```bash\\r\\n$ git pull ~/repository split-branch-project1\\r\\n```\\r\\n\\r\\nAt this point *project1* will contain only the commit history involving that project; by repeating the process for each\\r\\nproject we can have cleaner repositories without losing the history."}]}')}}]);