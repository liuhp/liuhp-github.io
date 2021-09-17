---
title: Babel
date: 2021-09-17 20:44:56
tags:
  - Babel
  - Webpack
categories:
  - Babel
  - Webpack
copyright: true
comments: true
---


### babel
Babel会将ES6的代码转成ES5的代码
@babel/core、babel-loader、@babel/preset-env
需要先安装，在配置

```javascript
module.exports = {
    module: {
        rules: [
            {
                test:/\.js$/,
                use: {
                    loader: 'babel-loader',
                    // 配置选项里的presets
                    // 包含ES6还有之后的版本和那些仅仅是草案的内容
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
                include: /src/,          // 只转化src目录下的js
                exclude: /node_modules/  // 排除掉node_modules，优化打包速度
            }
        ]
    }
}

```