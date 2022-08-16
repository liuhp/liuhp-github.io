---
layout: 0-1搭建Vue3+Vite3模板工程（4）- 左侧菜单导航
title: 左侧菜单导航
date: 2022-08-16 09:47:21
tags: Vue3
categories: Vue3
copyright: true
comments: true
---

[从0-1搭建Vue3+Vite3模板工程（1）-创建工程](https://juejin.cn/post/7127204457925836813)

[从0-1搭建Vue3+Vite3模板工程（2）-安装依赖](https://juejin.cn/post/7128214905953452039/)

[0-1搭建Vue3+Vite3模板工程（3）-布局](https://juejin.cn/post/7129790915271065637)

左侧菜单导航封装，包含多级菜单，可以配置隐藏某一个菜单。

1. 先配置好路由，根据自己的需求，建立好相应的目录；

我的目录如下：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9a4fd8949a2e4e66a1f71e7dce2c8d5a~tplv-k3u1fbpfcp-watermark.image?)

所以我的路由配置如下（别忘了提前在scr/views/下建立相应的页面级组件，在路由中需要引用）：
src\router\index.ts：

```js
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import Layout from "@/layout/Index.vue"
export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    meta: {
      title: "首页",
      icon: "House",
      hidden: false,
      roles: [],
    },
    children: [
      {
        path: "/home",
        component: () => import("@/views/home/index.vue"),
        name: "home",
        meta: {
          title: "首页",
          icon: "House",
          hidden: true,
          roles: [],
        },
      },
    ],
  },
  
  {
    path: "/system",
    component: Layout,
    name: "system",
    meta: {
      title: "系统管理",
      icon: "Medal",
      hidden: false,
      roles: [],
    },
    children: [
      {
        path: "/system/department",
        component: () => import("@/views/system/department/index.vue"),
        name: "department",
        meta: {
          title: "机构管理",
          icon: "MostlyCloudy",
          hidden: false,
          roles: [],
        },
      },
      {
        path: "/userList",
        component: () => import("@/views/system/user/index.vue"),
        name: "userList",
        meta: {
          title: "用户管理",
          icon: "MostlyCloudy",
          roles: ["sys:user"],
          hidden: false,
        },
      },
      {
        path: "/roleList",
        component: () => import("@/views/system/role/index.vue"),
        name: "roleList",
        meta: {
          title: "角色管理",
          icon: "MostlyCloudy",
          roles: ["sys:role"],
          hidden: false,
        },
      },
      {
        path: "/menuList",
        component: () => import("@/views/system/menu/index.vue"),
        name: "menuList",
        meta: {
          title: "权限管理",
          icon: "MostlyCloudy",
          roles: ["sys:menu"],
          hidden: false,
        },
      },
    ],
  },
  {
    path: "/goods",
    component: Layout,
    name: "goods",
    meta: {
      title: "商品管理",
      icon: "MostlyCloudy",
      roles: ["sys:goods"],
      hidden: false,
    },
    children: [
      {
        path: "/goodCategory",
        component: () =>
          import("@/views/goods/goodsCategory/index.vue"),
        name: "goodCategory",
        meta: {
          title: "商品分类",
          icon: "MostlyCloudy",
          roles: ["sys:goodsCategory"],
          hidden: false,
        },
      },
    ],
  },
  {
    path: "/systenConfig",
    component: Layout,
    name: "systenConfig",
    meta: {
      title: "系统工具",
      icon: "MostlyCloudy",
      roles: ["sys:systenConfig"],
      hidden: false,
    },
    children: [
      {
        path: "/document",
        component: () => import("@/views/system/config/index.vue"),
        name: "http://42.193.158.170:8089/swagger-ui/index.html",
        meta: {
          title: "接口文档",
          icon: "MostlyCloudy",
          roles: ["sys:document"],
          hidden: false,
        },
      },
    ],
  },
]
//创建
const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router

```
2. 封装sidebar菜单导航组件：

src\layout\sidebar\index.vue

```js
<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    background-color="#304156"
    router
  >
    <menu-item :menuList="state.menus"></menu-item>
  </el-menu>
</template>
<script lang="ts" setup>
import MenuItem from "./menu-item.vue"
import { ref, reactive, onMounted } from "vue"
import { routes } from '@/router/index'

const  state =reactive({
  menus : [],
})
onMounted(() => {
  state.menus = handleRoutes(routes)
  console.log('menus', state.menus)
})

const setObjProperties = (target, source) => {
  Object.entries(source).forEach(([key, value]) => {
    if (value || typeof value !== 'undefined') {
      target[key] = value;
    }
  });
}

const handleRoutes = (routes) => {
  // 递归处理路由
  const routers = [];
  for (let i = 0; i < routes.length; i++) {
    const {
     redirect, path,
      meta, children = []
    } = routes[i];
    const { hidden } = meta
    if (hidden) break; // 隐藏的菜单
    // copy route
    const metaCopy = { ...meta };
    const router = { path, meta: metaCopy };
    // 复制属性
    setObjProperties(router, {
      redirect
    });
    // todo 权限判断
    
    // 子菜单
    const subChildren = children.filter((item) => !item.hidden);
    if (subChildren && subChildren.length) {
      if (!meta.showByOneChildren && subChildren.length === 1) {
        metaCopy.type = 'menu';
      } else {
        metaCopy.type = 'submenu';
      }
      router.children = handleRoutes(subChildren);
    } else {
      metaCopy.type = 'menu';
    }
    routers.push(router);
  }
  return routers;
}

//控制菜单展开和关闭
const isCollapse = ref(false)
</script>
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 100%;
  min-height: 400px;
}
.el-menu {
  border-right: none;
}
ul{
  margin: 0;
}
::v-deep .el-sub-menu .el-sub-menu__title {
  color: #f4f4f5 !important;
}
/* .el-submenu .is-active .el-submenu__title {
border-bottom-color: #1890ff;
} */
::v-deep .el-menu .el-menu-item {
  color: #bfcbd9;
}
/* 菜单点中文字的颜色 */
::v-deep .el-menu-item.is-active {
  color: #409eff !important;
}
/* 当前打开菜单的所有子菜单颜色 */
::v-deep .is-opened .el-menu-item {
  background-color: #1f2d3d !important;
}
/* 鼠标移动菜单的颜色 */
::v-deep .el-menu-item:hover {
  background-color: #001528 !important;
}
</style>

```
src\layout\sidebar\menu-item.vue：

```js
<template>
  <template v-for="menu in menuList" :key="menu.path">
    <el-sub-menu v-if="menu.children && menu.children.length > 0" :index="menu.path">
      <template #title>
        <!-- 动态组件的使用方式 -->
        <component class="icons" :is="menu.meta.icon" />
        <!-- 方式二 -->
        <!-- <Icon class="icons" :icon="menu.mata.icon"></Icon> -->
        <span>{{ menu.meta.title }}</span>
      </template>
      <menu-item :menuList="menu.children"></menu-item>
    </el-sub-menu>

    <el-menu-item style="color:#f4f4f5" v-else :index="menu.path">
      <i v-if="menu.meta.icon && menu.meta.icon.includes('el-icon')" :class="menu.meta.icon"></i>
      <component class="icons" v-else :is="menu.meta.icon" />
      <template #title>{{ menu.meta.title }}</template>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">

defineProps(['menuList'])
</script>

<style scoped>
.icons{
  width: 24px;
  height: 18px;
}
</style>
```

3.如果菜单前需要icon, 则需要安装element-plus的icon;

在工程的根目录执行：
```js
npm install @element-plus/icons-vue
```

根据element-plus官方文档：https://element-plus.gitee.io/zh-CN/component/icon.html#%E6%B3%A8%E5%86%8C%E6%89%80%E6%9C%89%E5%9B%BE%E6%A0%87

在main.ts中添加：

```js
// main.ts

// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
```

重新启动工程，大功告成！

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f12c6fcb21374dccaf585f55584737c1~tplv-k3u1fbpfcp-watermark.image?)

