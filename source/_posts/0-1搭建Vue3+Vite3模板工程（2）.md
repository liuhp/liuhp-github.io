---
title: 0-1搭建Vue3+Vite3模板工程（2）-安装依赖
date: 2022-08-08 10:13:47
tags: Vue3
categories: Vue3
copyright: true
comments: true
---

接上篇[0-1搭建Vue3+Vite3模板工程（1）-创建工程](https://juejin.cn/post/7127204457925836813)

### 一、eslint、css 预处理器sass安装

1. /tsconfig.json配置文件可以配置使用'@'符号引入

```js
{
  "compilerOptions": {
    "target": "esnext",
    "useDefineForClassFields": true,
    "module": "esnext",
    "moduleResolution": "node",
    "strict": true,
    "jsx": "preserve",
    "sourceMap": true,
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "lib": ["esnext", "dom"],
    "skipLibCheck": true, // 解决打包报`vue-tsc --noEmit && vite build`的错,忽略所有的声明文件(*.d.ts)的类型检查
    "baseUrl": ".",
    "paths": {
      "@/*":[
        "src/*"
      ]
    }

  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"],
  // ts 排除的文件
  "exclude": ["node_modules"],
  "suppressImplicitAnyIndexErrors":true, // 
}
```

想了解这些配置含义可以参考这篇文章，
    [# tsconfig.json常见配置](https://juejin.cn/post/7129321798734184462/)

2. eslint安装


```js
npm install --save-dev eslint eslint-plugin-vue
```

eslint配置文件： 在src文件夹下建立.eslintrc.ts文件，配置如下：

```js
module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module'
  },
  parser: 'vue-eslint-parser',
  extends: ['plugin:vue/vue3-essential', 'plugin:vue/vue3-stronglyrecommended', 'plugin:vue/vue3-recommended'],
  env: {
    browser: true,
    node: true,
    es6: true
  },
  rules: {
    'no-console': 'off',
    'comma-dangle': [2, 'never'] //禁止使用拖尾逗号
  }
}
```

TODO： 整理一下eslint配置含义
3. 安装css预处理器

```js
npm install -D sass sass-loader
```

### 二、在项目中引入element plus UI组件库
可参考官网：
https://element-plus.gitee.io/zh-CN/guide/quickstart.html

根据自己的需要，如果不在乎打包后大小可以完整导入，也可以按需引入。

本篇文章就完整引入了。

```js
npm install element-plus --save
```

在main.ts中加入下面两句：

```js
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

createApp(App).use(store, key).use(router).use(ElementPlus).mount('#app')
```
然后我们验证一下element plus是否安装成功。

修改HelloWorld.vue文件：

```js
<template>
  <p>{{ showcount }}</p>
  <el-button @click="addBtn">增加</el-button>
</template>
<script setup lang="ts">
import { ref, computed } from "vue"
import { useStore } from "@/store/index"
const store = useStore()
const count = ref(0)
const showcount = computed(() => {
  return store.getters["getCount"]
})
const addBtn = () => {
  store.commit("setCount", ++count.value)
}
</script>
<style scoped></style>
```
注意，我们通过“@”符号引入文件可能会报错：
```
Failed to resolve import "@/store/index" from "src\components\HelloWorld.vue". Does the file exist?
```
解决办法，安装@types/node： 

```js
npm i --save-dev @types/node
```

然后修改vite.config.ts文件，配置“@”符号引入：

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve:{
    alias:[
      {
        find: '@',
        replacement: resolve(__dirname, 'src')
      }
    ],
  },
  
})
```

然后浏览器中就可以看到下面的图，说明element plus引入成功了：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/42d367b4b4534682902c696b009a3fe6~tplv-k3u1fbpfcp-watermark.image?)

下面讲解如何布局。

