---
slug:    git-subtree
title:   Git Subtree
date:    2021-10-25
authors: lore
tags:    [git,programming,subtree]
---

The story of how I came into the undocumented `git subtree` command to help bring back order to an unfortunate
repository.

<!--truncate-->

## A little bit of background

It can happen to make wrong choices; in the programming field, in particular, what often happens is that the
consequences arrive suddenly and like an unstoppable escalation. But catastrophisms aside, we come to a need born a few
days ago: in one of the git repositories that I use, which had to act as a "warehouse" for some small utilities, the
situation has exploded. Managing 15 small projects in a single versioning solution is a real nightmare, so I decided to
try to solve the situation, possibly without simply creating new repositories to start from scratch with the commit
history copied into them.

After a little bit of digging, I found a tool which I didn't know anything about: **subtree**.

Subtree is a script created by extern contributors in the git community and it's bundled in the git installation from
version *1.7.11*, but never added to the official documentation (you can, however, read some informations
[here](https://github.com/git/git/blob/master/contrib/subtree/git-subtree.txt>)). It allows one to create
*subtrees*, which are branches that will join the ones already existent but in an independent manner, creating something
like a new repository in the repository.

Subtree also offers some commands which enables the execution of really interesting operations: one of them is
`split`, which will create a new branch that will contain the commit history of a subfolder in particular. That
seems exactly what we need!

Let's suppose that the starting repository has a folder structure like this:

```
   repository
   │   .git
   │   .gitignore
   │
   └───project1
   │   │   file1_1
   │   │   file1_2
   │
   └───project2
   │   │   file2_1
   │   │   file2_2
   │
   └───project3
   │   │   file3_1
   │   │   file3_2
   │
```

Now if we wanted to extract the *project1* folder we can go like this: first we must create a subtree which will contain
only the commits involving files inside *project1*

```bash
$ git subtree split --prefix=project1 -b split-branch-project1
```

Then, we can move into another folder and create the future repository

```bash
$ mkdir project1
$ cd project1
$ git init
```

Let's execute a pull from the old repository, referencing the newly created branch:

```bash
$ git pull ~/repository split-branch-project1
```

At this point *project1* will contain only the commit history involving that project; by repeating the process for each
project we can have cleaner repositories without losing the history.
