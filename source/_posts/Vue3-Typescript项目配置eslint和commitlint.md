---
title: Vue3+Typescript项目配置eslint和commitlint
tags: Vue3
categories: Vue3
copyright: true
comments: true
abbrlink: 16572
date: 2022-08-24 11:26:53
---


在多人合作的项目中，如果没有规范约束，可能每个人提上来的代码都要被格式化一遍，不便于查看该功能具体修改了哪些代码，并且commit信息写的五花八门，有时也不利于理解，所以规范是一个非常nice的东西，有了它，在多人合作的项目中，避免了很多不必要的麻烦，也会节省很多时间。

本人将如何一步一步添加规范的过程记录下来，方便和我一样有同样需求的小伙伴学习。

### 配置eslint
1. 安装eslint依赖并初始化

```js
npm i eslint -D
// 安装好后，进行初始化
npx eslint --init
```

初始化的步骤如下：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1949611d7e76456b99d33ff403edc9de~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ca97821402b243cab0cdcf7c5eea1479~tplv-k3u1fbpfcp-watermark.image?)

这一步需要根据你项目的框架选择，vue.js:
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f327df04bb544a0ba9f847a6b3acbd4f~tplv-k3u1fbpfcp-watermark.image?)
Vue3使用了TypeScript所以需要选“Yes”:

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/126e84330df14658b15ebff793d73aaa~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9c5dc24999ae4865baf713c5e6ab6a8f~tplv-k3u1fbpfcp-watermark.image?)
这个选什么就会生成一个什么文件进行配置eslint规则，根据自己的需要选择，我这里选择的是JSON（我选JavaScript，生成的.eslintrc.js会报错），然后继续，一路到底就初始化好了。
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b95c049351f84145a5eb76d8e31eeecd~tplv-k3u1fbpfcp-watermark.image?)

2. 配置eslint规则

然后根据自己的需要在.eslintrc.json配置eslint规则，可以参考[eslint规则中文版](https://eslint.bootcss.com/docs/rules/)。

3. 安装eslint插件


配置完成后，若vscode没有安装eslint插件，需要安装eslint插件。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/18ff6f1c906f4afc94e60f81d4b4a9c2~tplv-k3u1fbpfcp-watermark.image?)

安装完后，需要给vscode设置一下：
```
"editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
}
```

### 配置prettier

1. 安装依赖

```
npm i prettier eslint-config-prettier eslint-plugin-prettier -D
```
2. 配置文件：

在项目根目录下新建.prettierrc文件，然后写入：

```js
{
  "semi": false,
  "tabWidth": 2,
  "trailingComma": "none",
  "singleQuote": true,
  "arrowParens": "avoid"
}
```
根据需要配置自己的prettier规则：可参考[prettier规则](https://prettier.io/docs/en/options.html)

3. vscode安装prettier插件：


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d6e6d317e69149f48ca138ebce710ac5~tplv-k3u1fbpfcp-watermark.image?)

然后在vscode设置中，把这个勾上，保存时就能自动修复：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3c1ea4ae9f6242b4be65a48ccb635eb4~tplv-k3u1fbpfcp-watermark.image?)

并在vscode设置中添加：
```
"[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```
4. 然后在.eslintrc.json文件中extends中添加：

```js
"extends": [
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    "plugin:@typescript-eslint/recommended",
    "prettier"
],
```

### 配置代码提交规范husky

安装依赖

```
npm install -D husky
```
初始化
```
npx husky install .husky
```
添加commit-msg
```
npx husky add .husky/commit-msg "node scripts/verifyCommit.js"
```
在根目录下创建scripts文件夹，然后在该文件夹下创建verifyCommit.js文件：
然后写入下面代码，在提交时就会执行检验commit的信息。
```js
// eslint-disable-next-line no-undef, @typescript-eslint/no-var-requires
const msg = require('fs')
  .readFileSync('.git/COMMIT_EDITMSG', 'utf-8')
  .trim()
  
const commitRE = /^(revert: )?(feat|fix|docs|dx|style|refactor|perf|test|workflow|build|ci|chore|types|wip|release)((.+))?: .{1,50}/
const mergeRe = /^(Merge pull request|Merge branch)/
if (!commitRE.test(msg)) {
  if(!mergeRe.test(msg)){
    console.log('git commit信息校验不通过')

    console.error(`git commit的信息格式不对, 需要使用 title(scope): desc的格式
      比如 fix: xxbug
      feat(test): add new 
      具体校验逻辑看 scripts/verifyCommit.js
    `)
    process.exit(1)
  }

}else{
  console.log('git commit信息校验通过')
}
```
在检验commit提交信息前需要先检验eslint规则，有个钩子pre-commit，在commit之前会执行。在工程终端中执行：

```
npx husky add .husky/pre-commit "npm run lint"
```
然后在package.json的scripts中，加入下面的语句：
```
"lint": "eslint --fix --ext .js,vue src/"
```

然后可以提交一下代码检测一下是否加上了eslint和commitlint.
可能会遇到一些问题，慢慢一个一个解决后就可以提交了。

