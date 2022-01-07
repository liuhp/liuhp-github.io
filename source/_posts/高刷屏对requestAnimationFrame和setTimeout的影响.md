---
title: 高刷屏对requestAnimationFrame和setTimeout的影响
date: 2021-10-23 11:48:09
tags: javascript
categories: javascript
copyright: true
comments: true
---

背景：
setInterval和setTimeout实现的定时器在鸿蒙系统上会出现掉帧卡顿现象，比如倒计时中，10，9间隔长，8，7间隔又很短。

解决办法：用requestAnimationFrame实现定时功能。

### 高刷屏对setTimeout的影响
在低端机中，用setTimeout实现的动画可能会出现丢帧卡顿现象主要原因有以下两点：
1. setTimeout回调执行时间不确定。因为setTimeout的回调会放在异步队列中，当主线程的任务执行完成后，才会检查异步队列中是否有要执行的任务，所以setTimeout执行的时间会比设定时间稍晚一些。
2. 刷新频率受屏幕分辨率和屏幕尺寸的影响，因此不同设备的屏幕刷新频率可能会不同，而 setTimeout只能设置一个固定的时间间隔，这个时间不一定和屏幕的刷新时间相同。
以上两种情况会是setTimeout的执行步调和屏幕刷新时间步调不一致，从而引起丢帧卡顿现象。

而在高刷屏下，因为屏幕刷新率更高，setTimeout执行的结果会很快被渲染在屏幕上，感觉会更丝滑，所以丢帧卡顿现象会削弱。

### 高刷屏对requestAnimationFrame的影响
requestAnimationFrame在屏幕刷新的时候执行，所以和屏幕刷新步调一致，用它实现的动画就会更丝滑，不会卡顿。

但感觉会耗性能一些，因为一分钟屏幕刷新多少次函数就执行多少次。


高刷屏下： 
1. PC端：经查阅使用了165hz的显示器，但通过requestAnimationFrame 计算出来的FPS依然只有30-60fps，这只是偶现，刷新率和 requestAnimationFrame 存在不同步问题；谷歌浏览器是支持高刷屏的。
2. 移动端：微信固定写死60Hz,其他app也不支持高刷，只有少数游戏app支持；
