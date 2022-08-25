---
title: Vue3+TS项目中遇到的eslint问题
date: 2022-08-25 16:15:41
tags: Vue3
categories: Vue3
copyright: true
comments: true
---
1. 

> Component name "Tabs" should always be multi-word  vue/multi-word-component-names

配置.eslintrc.json中的rules:

> "vue/multi-word-component-names": ["off"]

2. 
> error  '.native' modifier on 'v-on' directive is deprecated  vue/no-deprecated-v-on-native-modifier

'.[native](https://so.csdn.net/so/search?q=native&spm=1001.2101.3001.7020)'修饰符在vue3中被弃用了，所以在代码中去掉```.native```就可以了。

3. 
> error  Custom elements in iteration require 'v-bind:key' directives  vue/valid-v-for

原因是代码模板中使用了v-for, 但是没有绑定key值，解决办法建议给v-for绑定key值。

4. 
> Unexpected mutation of "isShowDialog" prop  vue/no-mutating-props

父组件传递过来的变量绑定弹窗会报错，原因是单向数据流，子组件不能该变父组件变量。

改成如下写法：
```js
//父组件
<biz-detail
    v-model:isShowDialog="state.isShowDialog"
    ...
></biz-detail>
//子组件
...
<el-dialog
    v-model="dialogVisible"
    ...
>...</dialog>

const emits = defineEmits(['update:isShowDialog'])
const dialogVisible = computed({
  get: () => props.isShowDialog,
  set: (val: boolean) => {
    emits('update:isShowDialog', val)
  }
})
```

