<!--
 * @Author: liuhp 2190098961@qq.com
 * @Date: 2022-07-13 09:47:21
 * @LastEditors: liuhp 2190098961@qq.com
 * @LastEditTime: 2023-12-20 14:08:07
 * @FilePath: \liuhp.github.io\source\_posts\Babel使用.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
---
title: Babel
tags:
  - Babel
  - Webpack
categories:
  - Babel
  - Webpack
copyright: true
comments: true
abbrlink: 20717
date: 2021-09-17 20:44:56
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