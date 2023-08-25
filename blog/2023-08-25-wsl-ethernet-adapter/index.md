---
slug:    wsl-ethernet-adapter
title:   Enabling support for USB Ethernet adapter in WSL 2
date:    2023-08-25
authors: lore
tags:    [linux,windows,wsl,kernel]
---

WSL was a great introduction in Windows for developers who were familiar with working in a Linux environment; however
one of the main pain points of WSL 1 was the extremely slowness when working with files. That changed in better with
WSL 2, but the new virtualization system came with a fully NATted VM. Unfortunately that led WSL 2 to not being usable
for some environments, for example when UDP communication or broadcasting is needed.

Recently I had some USB Ethernet adapters laying around, and I thought about making it work with WSL 2, with the help
of the `usbipd` tool.

### Recompiling the WSL kernel
The first step to make the adapter work under the WSL is to recompile its kernel so that the necessary drivers are
added.

Open a WSL terminal and run:

```bash
# Install the building dependencies
$ sudo apt install build-essential flex bison libssl-dev libelf-dev git dwarves libncurses-dev bc
$ git clone https://github.com/microsoft/WSL2-Linux-Kernel.git
$ cd WSL2-Linux-Kernel
$ cp Microsoft/config-wsl .config
```

Now that we have the sources available, the next thing to do is to update the kernel configuration so that our ethernet
adapter is supported. In my case, I had `USBNET` already enabled but I needed an additional driver.

```bash
# Enter the configuration menu
$ make menuconfig
```

Search the relevant driver using `/`; in my case it was `RTL8152`. Press `1` to navigate to the corresponding
configuration entry and `Y` to add it to the configuration. Using the arrow keys navigate to `< Save >`, leave the
default `.config` name and the configuration menu.

Now build the updated kernel:

```bash
# Use your core count as the -j argument
$ make -j16
```

### Starting the WSL with the custom kernel
Now that we have a custom kernel, we need to configure the WSL so that it's used when starting it up. Copy the kernel
binary to Windows:

```bash
$ cp arch/x86/boot/bzImage /mnt/c/Users/<username>
```

Then create a file in `%userprofile%\.wslconfig` with the following content:

```ini
[wsl2]
; Double backslashes are required!
kernel=C:\\Users\\<username>\\bzimage
```

Close all the WSL terminals, then in Powershell run:

```powershell
> wsl --shutdown
```

Reopen a WSL terminal.

### Insalling usbipd
To use a USB device from the WSL, we can follow the instructions found at
https://learn.microsoft.com/it-it/windows/wsl/connect-usb: go to the
[release page for usbipd](https://github.com/dorssel/usbipd-win/releases) and download the setup file from the latest
release; then install it. In the WSL terminal, run:

```bash
$ sudo apt install linux-tools-generic hwdata
$ sudo update-alternatives --install /usr/local/bin/usbip usbip /usr/lib/linux-tools/*-generic/usbip 20
```

### Using a USB device
Every time a USB device must be used from within the WSL, open a Powershell and run:

```powershell
> usbipd wsl list
```

This will list the available USB devices together with a bus identifier; search for the USB ethernet adapter device,
then run:

```powershell
> usbipd wsl attach --busid <busid>
```

In the WSL terminal, run:

```bash
$ lsusb
```

This should print the ethernet adapter in the device list; this procedure must be followed every time the PC is turned
on.

By default, no network manager is installed in WSL, so I had to manually turn on the interface and start a DHCP client
for the new interface, then it was fully working.
