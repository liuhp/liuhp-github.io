---
title: 0-1搭建Vue3+Vite3模板工程（1）-创建工程
date: 2022-08-05 10:42:35
tags: Vue3
categories: Vue3
copyright: true
comments: true
---

从0搭建一个工程可以更清楚的了解工程的组成，对工程的依赖、配置和运行理解更深入，以后搭建自己脚手架，生成自己的模板工程，提高效率。
### 技术栈
1. Vite3.x
2. Vue3.2
3. TypeScript
4. Vuex4.x
5. Vue Router4.x
6. CSS3
### 准备
1. node.js版本需要大于12.0.0
2. npm
### 创建项目
根据vue3官网生成模板工程：https://v3.cn.vuejs.org/guide/installation.html#vite

记得将project-name换成自己项目的名字：

```js
npm init vite@latest <project-name> --template vue
```

1.选择vue：
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0a920f9491ef47f0ad6e1c21eaf3ec39~tplv-k3u1fbpfcp-watermark.image?)
 2.选择vue-ts：
    
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8b5171c87b2248c7949cbf9e2a9f78b1~tplv-k3u1fbpfcp-watermark.image?)
  
3.看到这里就已经创建成功了：
    
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4d0411a78e174a58910804a3e75d5f8a~tplv-k3u1fbpfcp-watermark.image?)
4.根据提示启动工程：
`cd vue3-demo
  npm install
  npm run dev`
5.访问本地http://127.0.0.1:5173/：
    
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e4ff39b503d64415bf36642605ab3107~tplv-k3u1fbpfcp-watermark.image?)
    
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a129e063aada4ce1bade454745091f3d~tplv-k3u1fbpfcp-watermark.image?)
至此，工程创建成功，接下来需要一步一步根据项目需要安装和配置项目所需的依赖。
### 安装依赖
如果使用的是vscode编辑器，需要禁用Vetur插件，安装Vue Language Features (Volar)插件。

1.安装路由

```js
npm install vue-router@4
```
配置路由：
在src根目录下建立/router/index.ts文件,路由配置例子如下：

/src/router/index.ts
```js
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '../components/HelloWorld.vue'
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

App.vue

```js
<template>
    <router-view/>
</template>
<style lang="scss">
</style>
```

main.ts

```js
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
```

2.安装vuex

```js
npm install vuex@next --save
```

建立/store/index.ts文件

```js
import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
export interface State {
  count: number
}
export const key: InjectionKey<Store<State>> = Symbol()
export const store = createStore<State>({
  state: {
    count: 0
  },
  mutations:{
    setCount(state:State,count:number){
      state.count = count
    }
  },
  getters:{
    getCount(state:State){
      return state.count
    }
  }
})
// 定义自己的 `useStore` 组合式函数
export function useStore () {
  return baseUseStore(key)
}

```
修改main.ts

```js
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { store, key } from './store'

createApp(App).use(store, key).use(router).mount('#app')
```

修改HelloWorld.vue文件

```js
<script setup lang="ts">
import { ref, computed } from "vue"
import { useStore } from "../store"
const store = useStore()
const count = ref(0)
const showcount = computed(() => {
  return store.getters["getCount"]
})
const addBtn = () => {
  store.commit("setCount", ++count.value)
}
</script>
<template>
  <p>{{ showcount }}</p>
  <button @click="addBtn">增加</button>
</template>
<style scoped></style>

```
至此，vue-router和Vuex安装配置好了， 下面需要安装eslint,css预处理器及sass安装.
