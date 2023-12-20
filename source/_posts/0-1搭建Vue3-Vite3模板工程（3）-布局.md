---
title: 0-1搭建Vue3+Vite3模板工程（3）-布局
tags: Vue3
categories: Vue3
copyright: true
comments: true
abbrlink: 29511
date: 2022-08-11 15:56:23
---

[0-1搭建Vue3+Vite3模板工程（1）-创建工程](https://juejin.cn/post/7127204457925836813/)

[0-1搭建Vue3+Vite3模板工程（2）-安装依赖](https://juejin.cn/post/7128214905953452039)

接上篇。

通常后管平台多以左右布局或上下布局为主，本篇讲解如何进行整体布局，以左右布局为例。
1. 在index.html中加入以下样式：

```js
html,body,#app{
  padding: 0px;
  margin: 0px;
  height: 100%;
  box-sizing: border-box;
}
```
2. 将main.ts引入的额外样式注释掉

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5d1ab2acdcdb4492879dd5d0ab0c51b3~tplv-k3u1fbpfcp-watermark.image?)

3. 在src下新建layout文件夹，在layout下新建index.vue文件，在此文件中写整体布局。

index.vue
```js
<template>
  <el-container class="layout">
    <el-aside class="asside" width="200px">Aside</el-aside>
    <el-container class="layout">
      <el-header class="header">Header</el-header>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>
<script setup lang="ts"></script>
<style lang="scss">
.layout {
  height: 100%;
  .asside {
    color: #fff;
    background-color: rgb(48, 65, 86);
  }
  .header {
    color: #fff;
    background-color: #212938;
  }
  .main {
    background-color: #fff;
  }
}
</style>
```

4. 修改router配置：
    router/index.ts文件修改成下面：
    
```js
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Layout
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router
```
启动工程可以看到首页如下：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f0a42f12357c4bc49af076e7c1f9efad~tplv-k3u1fbpfcp-watermark.image?)

5. 抽离头部和左侧菜单导航组件

在layout下新建header和sidebar文件夹，分别新建index.vue文件

header/index.vue
```js
<template>
  <div>header</div>
</template>
<script lang='ts' setup>
</script>
<style lang='scss' scoped>
</style>
```

sidebar/index.vue

```js
<template>
  <div>sidebar</div>
</template>
<script lang='ts' setup>
</script>
<style lang='scss' scoped>
</style>
```

修改layout/index.vue, 引入header和sidebar两个组件：
```js
<template>
  <el-container class="layout">
    <el-aside class="asside" width="200px">
      <sidebar></sidebar>
    </el-aside>
    <el-container class="layout">
      <el-header class="header">
        <my-header></my-header>
      </el-header>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
import MyHeader from './header/index.vue'
import Sidebar from './sidebar/index.vue'
</script>
<style lang="scss">
.layout {
  height: 100%;
  .asside {
    color: #fff;
    background-color: rgb(48, 65, 86);
  }
  .header {
    color: #fff;
    background-color: #212938;
  }
  .main {
    background-color: #fff;
  }
}
</style>

```
到此，整体布局做好了，大家可以根据自己需求调整，也可以调整为上下布局，下面讲解如何制作侧边菜单导航及面包屑。

