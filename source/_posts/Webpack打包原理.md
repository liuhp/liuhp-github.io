---
title: Webpack打包原理
date: 2021-09-17 20:42:55
tags: webpack
categories: webpack
copyright: true
comments: true
---
### 打包原理
（1）读取入口文件，如项目中的main.js；

（2）由入口文件，解析模块所依赖的文件或包，生成ATS树；

（3）对模块代码进行处理：根据@babel工具转换ATS树（es6转es5、polyfill等）；

（4）递归所有模块

（5）生成浏览器可运行的代码

### 打包优化
1.自带优化

a)tree-shaking：依赖关系解析（不用的不打包），只在production环境下执行

b)scope-hosting：作用域提升，有结果输出的直接打包出结果，相应的变量不进行打包

2.插件或其他自定义配置

速度方面：

a)happypack 多线程打包，但是项目体积小的话反而更慢

体积方面：

a) webpack.IgnorePlugin，不需要的语言包不打包

b) external:{'vue':'vue'}配置不需要打包的文件

c) modules:{noParse:/vue/} 配置不需要解析的文件

d) 动态链接库：一个想要提取出来的包，单独打包，然后放到CDN上

e) 抽离公共代码块:  splitChunkPlugin
