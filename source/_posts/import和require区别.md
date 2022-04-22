---
title: import和require区别
tags: 前端工程化
categories: 前端工程化
copyright: true
comments: true
abbrlink: 45356
date: 2021-03-14 20:58:20
---
### 遵循规范
require 是 AMD规范引入方式
import是es6的一个语法标准，如果要兼容浏览器的话必须转化成es5的语法
### 调用时间
require是运行时调用，所以require理论上可以运用在代码的任何地方（虽然这么说但是还是一般放开头）
import是编译时调用，所以必须放在文件开头
### 本质
require是赋值过程，其实require的结果就是对象、数字、字符串、函数等，再把require的结果赋值给某个变量
import是解构过程，但是目前所有的引擎都还没有实现import，我们在node中使用babel支持ES6，也仅仅是将ES6转码为ES5再执行，import语法会被转码为require

require / exports ：
遵循 CommonJS/AMD，只能在运行时确定模块的依赖关系及输入/输出的变量，无法进行静态优化。
用法只有以下三种简单的写法：
```
const fs = require('fs')
exports.fs = fs
module.exports = fs
```

import / export：
遵循 ES6 规范，支持编译时静态分析，便于JS引入宏和类型检验。动态绑定。
写法就比较多种多样：
```
import fs from 'fs'
import {default as fs} from 'fs'
import * as fs from 'fs'
import {readFile} from 'fs'
import {readFile as read} from 'fs'
import fs, {readFile} from 'fs'

export default fs
export const fs
export function readFile
export {readFile, read}
export * from 'fs'
```

通过require引入基础数据类型时，属于复制该变量。
通过require引入复杂数据类型时，数据浅拷贝该对象。
出现模块之间的循环引用时，会输出已经执行的模块，而未执行的模块不输出（比较复杂）。
CommonJS模块默认export的是一个对象，即使导出的是基础数据类型。

总结：
    
| 规范 | 加载方式 | 命令|特点|
|--|--|
| CommonJS/AMD |运行时加载  |require|只能在运行时确定模块的依赖关系及输入/输出的变量，无法进行静态优化|
| ES6  | 编译时加载 |import| 支持编译时静态分析，便于JS引入宏和类型检验|
 
 参考：https://www.cnblogs.com/myfirstboke/p/10563597.html