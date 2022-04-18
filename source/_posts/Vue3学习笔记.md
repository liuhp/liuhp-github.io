---
title: Vue3学习笔记
tags:
  - Vue
categories: Vue
copyright: true
comments: true
abbrlink: 8636
date: 2021-11-06 11:01:53
---


Vue3的新特性，如下：
- 速度更快
- 体积减少
- 更易维护
- 更接近原生
- 更易使用

### 速度更快
vue3相比vue2
1. 重写了虚拟Dom实现

2. 编译模板的优化

3. 更高效的组件初始化

4. undate性能提高1.3~2倍

5. SSR速度提高了2~3倍

### 体积更小

通过webpack的tree-shaking功能，可以将无用模块“剪辑”，仅打包需要的
能够tree-shaking，有两大好处：
1. 对开发人员，能够对vue实现更多其他的功能，而不必担忧整体体积过大
2. 对使用者，打包出来的包体积变小了
vue可以开发出更多其他的功能，而不必担忧vue打包出来的整体体积过多

### 更易维护
compositon Api
可与现有的Options API一起使用
灵活的逻辑组合与复用
Vue3模块可以和其他框架搭配使用

### 更好的Typescript支持
VUE3是基于typescipt编写的，可以享受到自动的类型定义提示

### 更接近原生
可以自定义渲染 API

### Vue3新增特性
Vue 3 中需要关注的一些新功能包括：
- framents
- Teleport
- composition Api
- createRenderer

#### framents
在 Vue3.x 中，组件现在支持有多个根节点；
```
<!-- Layout.vue -->
<template>
  <header>...</header>
  <main v-bind="$attrs">...</main>
  <footer>...</footer>
</template>
```
#### Teleport
Teleport 是一种能够将我们的模板移动到 DOM 中 Vue app 之外的其他位置的技术，就有点像哆啦A梦的“任意门”。在vue2中，像 modals,toast 等这样的元素，如果我们嵌套在 Vue 的某个组件内部，那么处理嵌套组件的定位、z-index 和样式就会变得很困难，通过Teleport，我们可以在组件的逻辑位置写模板代码，然后在 Vue 应用范围之外渲染它。
```
<button @click="showToast" class="btn">打开 toast</button>
<!-- to 属性就是目标位置 -->
<teleport to="#teleport-target">
    <div v-if="visible" class="toast-wrap">
        <div class="toast-msg">我是一个 Toast 文案</div>
    </div>
</teleport>
```
#### composition Api
composition Api，也就是组合式api，通过这种形式，我们能够更加容易维护我们的代码，将相同功能的变量进行一个集中式的管理。

<div align=center>
<img src="1.png" width = 60%>
</div>

![composition](2.png)

<div align=center>
<img src="3.png" width = 60%>
</div>
#### createRenderer
通过createRenderer，我们能够构建自定义渲染器，我们能够将 vue 的开发模型扩展到其他平台。


### 移除 API
1. keyCode 支持作为 v-on 的修饰符
2. $on，$off和$once 实例方法
3. 过滤filter
4. 内联模板 attribute
5. $destroy 实例方法。用户不应再手动管理单个Vue 组件的生命周期。

### 其他小改变
1. destroyed 生命周期选项被重命名为 unmounted
2. beforeDestroy 生命周期选项被重命名为 beforeUnmount
3. [prop default工厂函数不再有权访问 this 是上下文
4. 自定义指令 API 已更改为与组件生命周期一致
5. data 应始终声明为函数
6. 来自 mixin 的 data 选项现在可简单地合并
7. attribute 强制策略已更改
8. 一些过渡 class 被重命名
9. 组建 watch 选项和实例方法 $watch不再支持以点分隔的字符串路径。请改用计算属性函数作为参数。
10. ```<template>``` 没有特殊指令的标记 (v-if/else-if/else、v-for 或 v-slot) 现在被视为普通元素，并将生成原生的 ```<template>``` 元素，而不是渲染其内部内容。
11. 在Vue 2.x 中，应用根容器的 ```outerHTML``` 将替换为根组件模板 (如果根组件没有模板/渲染选项，则最终编译为模板)。Vue 3.x 现在使用应用容器的 ```innerHTML```，这意味着容器本身不再被视为模板的一部分。


### Vue3和Vue2开发区别

1. Vue2响应式原理采用的是defineProperty，而vue3选用的是proxy。这两者前者是修改对象属性的权限标签，后者是代理整个对象。性能上proxy会更加优秀;
2. Vue3支持多个根节点;
3. Vue3优化diff算法。不再像vue2那样比对所有dom，而采用了block tree的做法。此外重新渲染的算法里也做了改进，利用了闭包来进行缓存。这使得vue3的速度比vue2快了6倍。
4. Vue2的Options API 对比Vue3的Composition API; 
5. 生命周期的钩子使用方式，在 Vue3 生周期钩子不是全局可调用的了，需要另外从vue中引入。和引入reactive一样，生命周期的挂载钩子叫onMounted；
6. emit使用方式：
emit：vue2使用```this.$emit('evnetName', params)```,vue3使用：```setup(_props, {emit}){ emit('eventName', params)}```


