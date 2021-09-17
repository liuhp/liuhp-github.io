---
title: Webpack常用plugin
date: 2021-09-17 20:41:48
tags: webpack
categories: webpack
copyright: true
comments: true
---

### 常用plugin
使用plugin丰富的自定义API，可以控制webpack编译流程的每个环节，实现对webpack的自定义功能扩展。
plugin是一个具有 apply方法的 js对象。apply方法会被 webpack的 compiler（编译器）对象调用，并且 compiler 对象可在整个 compilation（编译）生命周期内访问。

 - define-plugin：webpack模块自带的, DefinePlugin 允许在 编译时
   创建配置的全局常量，这在需要区分开发模式与生产模式进行不同的操作时，非常有用。
   例如，如果想在开发构建中进行日志记录，而不在生产构建中进行，就可以定义一个全局常量去判断是否记录日志。
 - copy-webpack-plugin：将个别文件或整个目录复制到构建目录。
 - postcss-namespace: css命名
 - BannerPlugin：对所有的文件打包后添加一个版权声明
 - uglifyjs-webpack-plugin：对 JS 进行压缩混淆
 - HtmlWebpackPlugin：可以根据模板自动生成 html 代码，并将打包生成的js，和css文件，插入到该html中
 - Hot Module Replacement：在每次修改代码保存后，浏览器会自动刷新，实时预览修改后的效果
 - extract-text-webpack-plugin：将 js 文件和 css 文件分别单独打包，不混在一个文件中
 - optimize-css-assets-webpack-plugin 不同组件中重复的 css 可以快速去重
 - html-withimg-loader 页面中经常会用到img标签，img引用的图片地址也需要一个loader来帮我们处理好
 - clean-webpack-plugin：在我们每次npm run build的时候都会在dist目录下创建很多打好的包，如果积累过多可能也会混乱，所以应该在每次打包之前将dist目录下的文件都清空，然后再把打好包的文件放进去

```javascript
let CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    plugins: [
        // 打包前先清空
        new CleanWebpackPlugin('dist')  
    ]
}

```
