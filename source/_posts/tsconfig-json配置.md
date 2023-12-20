---
title: tsconfig.json配置
tags: Vue3
categories: Vue3
copyright: true
comments: true
abbrlink: 33825
date: 2022-08-09 14:32:22
---

一些常见的tsconfig.json配置。TypeScript官方文档

英文：https://www.typescriptlang.org/docs/

中文：https://www.tslang.cn/docs/home.html

先简单上一个tsconfig.json的配置：

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
    "skipLibCheck": true, 
    "baseUrl": ".",
    "paths": {
      "@/*":[
        "src/*"
      ]
    }

  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"],
  "exclude": ["node_modules"],
  "suppressImplicitAnyIndexErrors":true, // 
}
```
 下面具体理解一下。
 
 
 ### compilerOptions下的配置：
定义项目的运行时期望、JavaScript 的发出方式和位置以及与现有 JavaScript 代码的集成级别。
 1. target
 
    TypeScript文件编译后生成的javascript文件里的语法应该遵循哪个JavaScript的版本。可选项为："ES5"， "ES6"/ "ES2015"， "ES2016"， "ES2017"或 "ESNext"
 
 2. useDefineForClassFields：   https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#the-usedefineforclassfields-flag-and-the-declare-property-modifier
 3. module
 
    告诉编译器对发出的.js文件中的模块使用什么语法。可选择 none、commonjs、amd、system、umd、es2015或esnext告诉编译器以哪种语法编写代码，意味着必须从哪个代码将其编译为commonjs。如果用于服务器端项目 如果使用的是Angular前端应用程序，则使用Node.js，然后可能使用CJS 可能不是ESM 较新的JS版本有时包含用于模块导入/导出的更多功能。 将export设置为"module"可以支持这些功能，而这些功能通常尚未添加到官方规范中。例如dynamic import的"ESNext"表达式。无论如何，编译器的目的是将代码编译成浏览器可理解的语法（commonjs） module影响发出代码的模块语法，而target影响其余代码。
4. moduleResolution

   模块解析策略，ts默认用node的解析策略，即相对的方式导入, 可选值：node、classic
如果未指定，则 --module commonjs 默认为 node，否则默认为 classic（包括 --module 设置为 amd、system、umd、es2015、esnext 等）Node 模块解析是 TypeScript 社区中最常用的，推荐用于大多数项目。 如果您在 TypeScript 中遇到导入和导出的解析问题，请尝试设置 moduleResolution: “node” 以查看它是否解决了问题。

5. strict

    开启所有严格的类型检查
     * true => 同时开启 alwaysStrict, noImplicitAny, noImplicitThis 和 strictNullChecks
     * alwaysStrict：严格模式，为每个文件添加 "use strict"
     * noImplicitAny：不允许隐式 any，如果true，函数的形参必须带类型，如果叫不出class名的js对象，那就得any。比如(d:any)=>{}；如果false, 则允许隐式any,函数的样子更像js (d)=>{}
     * noImplicitThis：不允许 this 为隐式 any
     * strictNullChecks：undefined 和 null 两个空类型的设计，使用上不方便，所以 通过strictNullChecks严格校验类型，让代码更安全

6. jsx

    指定jsx代码用于的开发环境: 'preserve', 'react-native', or 'react'
     * preserve:生成代码中会保留JSX以供后续的转换操作使用(比如：Babel)。另外,输出文件会带有.jsx扩展名。 
	 * react:会生成React.createElement,在使用前不需要再进行转换操作了,输出文件的扩展名为.js。 
	 * react-native:相当于preserve,它也保留了所有的JSX,但是输出文件的扩展名是.js

7. sourceMap

    是否生成目标文件的sourceMap文件。此文件允许调试器和其他工具在实际使用发出的JavaScript文件时显示原始的TypeScript源代码。此文件为 .js.map (or .jsx.map) 格式，位于相应的.js 输出文件相同目录
8. resolveJsonModule

    防止 ts文件中引入json文件，会报如下红色波浪线。TypeScript 2.9的resolveJsonModule功能，只要我使用ts-node执行应用程序，该功能就可以正常工作。
9. esModuleInterop

    作用是支持使用import d from 'cjs'的方式引入commonjs包。
10. lib

    编译过程中需要引入的库文件的列表，告诉 typescript 编译器可以使用哪些功能。
     * 比如说，我们这里有一个 dom 的库文件，这个文件会告诉编译器 dom api 的接口，所以当我们在 ts 代码中使用 dom 的时候，比如说执行 “document.getElementById ("root")” 这句话的时候，编译器就会知道该如何进行检查。
     * 如果我们不设置这个选项，那么编译器也有自己默认的库文件列表，一般来说是 ["dom", "es6","DOM.Iterable"] 等等。
     
11. skipLibCheck

    解决打包报`vue-tsc --noEmit && vite build`的错,忽略所有的声明文件(*.d.ts)的类型检查
    
12. path

    用于拓宽引入非相对模块时的查找路径的。其默认值就是"./"，目的是解决项目代码层级较深相互之间引用起来会比较麻烦的问题，各种 …/,…/…/,…/…/…/ 等等。
    
### include

   用于指定要编译的路径列表，但是和files的区别在于，这里的路径可以是文件夹，也可以是文件，可以使用相对和绝对路径，而且可以使用通配符， 比如"./src"即表示要编译src文件夹下的所有文件以及子文件夹的文件。
   
### exclude
   ts 排除的文件
### 将suppressImplicitAnyIndexErrors 
   将suppressImplicitAnyIndexErrors 设为true 将禁止在对对象进行索引时报告有关隐式anys 的错误。
  
