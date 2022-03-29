---
title: Vue3学习笔记
date: 2021-11-06 11:01:53
tags: 
  - 学习笔记
  - Vue
categories: Vue
copyright: true
comments: true
---

### Vue3和Vue2的区别

1. Vue2响应式原理采用的是defineProperty，而vue3选用的是proxy。这两者前者是修改对象属性的权限标签，后者是代理整个对象。性能上proxy会更加优秀;
2. Vue3支持多个根节点;
3. Vue3优化diff算法。不再像vue2那样比对所有dom，而采用了block tree的做法。此外重新渲染的算法里也做了改进，利用了闭包来进行缓存。这使得vue3的速度比vue2快了6倍。
4. Vue2的Options API 对比Vue3的Composition API; 
5. 生命周期的钩子使用方式，在 Vue3 生周期钩子不是全局可调用的了，需要另外从vue中引入。和引入reactive一样，生命周期的挂载钩子叫onMounted；
6. emit使用方式：
emit：vue2使用```this.$emit('evnetName', params)```,vue3使用：```setup(_props, {emit}){ emit('eventName', params)}```


### Vue3新增
- 性能：比vue2快了2倍
- tree shaking: 按需编译代码
- composition api: 组合式api(类似hooks未来)
- ts support
- custom render api 自定义渲染

