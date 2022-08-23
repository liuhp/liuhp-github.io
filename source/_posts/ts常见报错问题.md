---
title: Vue3项目中使用TypeScript一些报错问题
date: 2022-08-23 09:20:12
tags: Vue3
categories: Vue3
copyright: true
comments: true
---

Vue3项目中，使用TypeScript遇到的问题及解决方案。

1. Vue3的template中使用v-for，提示错误：对象的类型为 "unknown"。ts(2571)

解决方案：
给循环中item定义类型；

```js
<template>
  <el-form :model="state.form" ref="form"  :label-width="labelWidth"
    @submit.native.prevent
  >
    <el-row :gutter="20">
      <el-col v-bind="item.layout||layout" v-for="(item, index) in elements" :key="index">
        <el-form-item
          :prop="item.prop"
          :label="item.label"
          :label-width="item.labelWidth ? (item.labelWidth + 'px') : ''"
        >
          <!-- el-input -->
          <el-input
            v-if="item.type === 'input' || item.type === undefined"
            v-model="state.form[item.prop]"
            :size="item.size ? item.size : size"
            :disabled="item.disabled"
            :placeholder="item.placeholder"
            :suffix-icon="item.suffixIcon"
            clearable
          />
         </el-form-item>
       </el-col>
    </el-row>
  </el-form>
</template>

<script lang="ts" setup>
import { ref, reactive, defineProps,watch, PropType } from 'vue'
import { Search, RefreshLeft } from '@element-plus/icons-vue'

type elementItem = {
  prop: string,
  label: string,
  type: string,
  size?: string,
  disabled?: boolean,
  placeholder?: string,
  suffixIcon?: string,
  filterable?: boolean,
  multiple?: boolean,
  style?: object,
  optionGroup?: boolean,
  options: Array<any>,
  layout?:object,
  labelWidth?: number | string,
}
const emits = defineEmits(['search'])
const props = defineProps({
  // layout
    layout: {
      type: Object,
      default: () => ({
        lg: {
          span: 6,
        },
        md: {
          span: 8,
        },
        sm: {
          span: 12,
        },
        xs: {
          span: 24,
        },
      }),
    },
    // 表单label宽度
    labelWidth: {
      type: [String, Number],
      default: 'auto',
    },
    // 表单元素大小 默认 meidum
    size: {
      type: String,
      default: 'default',
      // validator: sizeValidator,
    },
    // 表单元素
    elements: {
      type: Array as unknown as PropType<[elementItem]>,
      required: true,
    },
    // 是否展示搜索、重置按钮
    hideBtns: {
      type: Boolean,
      default: false,
    },
})

const form = ref()
const state = reactive({
  form: {},
  formatters: {},
})
</script>
```

2. 在定义接口时，入参如果不定义类型会报：
```
(parameter) params: any

参数“params”隐式具有“any”类型。ts(7006)
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/439521acfbaa49338539156b9329e153~tplv-k3u1fbpfcp-watermark.image?)
解决办法就是给入参定义接口类型：
```
interface generalViewIn {
  page: number,
  pagesize: number,
}
//获取概览列表数据
export async function getGeneralView(params: generalViewIn) {
  return await http.get(Api.getGeneralView, params)
}
```
这样params入参就不会标红了。

3. 对象使用变量索引时，会标红，报：

```
元素隐式具有 "any" 类型，因为类型为 "string" 的表达式不能用于索引类型 "{}"。\在类型 "{}" 上找不到具有类型为 "string" 的参数的索引签名。ts(7053)
```

解决办法：
最简单是方案是修改tsconfig.json配置：在"compilerOptions"下加入下面这句，就不报错了。还有其他方案：

```js
{
  "compilerOptions": {
    "suppressImplicitAnyIndexErrors":true,
  },
}
```

4. 给reactive的变量赋值，会报：
```
不能将类型“{ path: any; meta: any; }[]”分配给类型“never[]”。\
不能将类型“{ path: any; meta: any; }”分配给类型“never”。ts(2322)
```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/845f5d9a319247dbb9d25a55c44d84a8~tplv-k3u1fbpfcp-watermark.image?)

解决办法：
在声明变量出就定义类型：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/93316f5ee5ac4b3f900cf41b2bea040d~tplv-k3u1fbpfcp-watermark.image?)

5. 在遍历中，item会报错：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/524c3332f3534028944f96225c5b2aac~tplv-k3u1fbpfcp-watermark.image?)

解决办法： 给item定义类型

```javascript
const subChildren = children.filter((item:any) => !item.meta?.hidden);
```

6. 从路由中获取参数，然后传递给接口
```javascript
// 变量声明
const { regionName="", regionId='',  status="" } = route.query
//接口声明
interface getHostListIn {
  regionId: string,
}

//接口使用
const getOptionList = () => {
  getHostList({regionId}).then((res) => {
   ...
  }).catch((err) => {
    ...
  })
  
}
```
传给接口的入参使用从路由中获取的参数时会报错：
```javascript
不能将类型“string | LocationQueryValue[]”分配给类型“string”。\
不能将类型“LocationQueryValue[]”分配给类型“string”。ts(2322)
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e3d814427b6f405897321486b2d351cb~tplv-k3u1fbpfcp-watermark.image?)

解决办法：
修改接口入参声明类型：
```javascript
//变量声明
const regionName = route.query.regionName
const regionId = route.query.regionId
const status = route.query.status

//接口声明
interface getHostListIn {
  regionId: string | LocationQueryValue[],
}
```