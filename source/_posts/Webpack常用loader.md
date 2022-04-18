---
title: Webpack常用loader
date: 2021-09-17 20:37:15
tags: Webpack
categories: Webpack
copyright: true
comments: true
---

### 常用loader
loader: webpack本身只能打包Javascript文件，对于其他资源例如 css，图片，或者其他的语法集比如jsx，是没有办法加载的。 这就需要对应的loader将资源转化，加载进来。

**样式**
 - css-loader : 解析css文件中代码
 -  style-loader : 将css模块作为样式导出到DOM中
 -  less-loader : 加载和转义less文件
 - sass-loader : 加载和转义sass/scss文件
 -  postcss-loader: 自动添加css的兼容前缀

**脚本转换编译**

 - script-loader : 在全局上下文中执行一次javascript文件，不需要解析
 - babel-loader : 加载ES6 代码后使用Babel转义为ES5后浏览器才能解析

**Files文件**

 - url-loader : 多数用于加载图片资源,超过文件大小显示则返回data URL
 -  raw-loader : 加载文件原始内容(utf-8格式)

**加载框架**

 - vue-loader : 加载和转义vue组件
 - react-hot-loader : 动态刷新和转义react组件中修改的部分
**校验测试：**
eslint-loader等: 打包时通过 ESLint 检查 JavaScript 代码,当启用了eslint-loader之后，会影响打包速度。

**vue-template-compiler**
作用： 该模块可用于将 Vue 2.0 模板预编译为渲染函数（template => ast => render），以避免运行时编译开销和 CSP 限制。大都数场景下，与 vue-loader一起使用，只有在编写具有非常特定需求的构建工具时，才需要单独使用它，vue-template-compiler 的代码是从 vue 源码中抽离的！因此，vue 和 vue-template-compiler 的版本必须一致（同一份源码）！
**vue-loader**
用于 Vue 单文件组件的 webpack 加载器。*.vue 文件是一种自定义文件格式，使用类似于 HTML 的语法来描述 Vue 组件。每个 *.vue 文件都包含三种类型的顶级语言块：```<template>```，```<script>``` 和 ```<style>```，以及其他可选的自定义块, vue-loader 将解析文件，提取每个语言块，如有必要，将它们通过其他加载器进行管道传输，最后将它们组装回ES 模块，其默认导出为 Vue.js 组件选项对象。
