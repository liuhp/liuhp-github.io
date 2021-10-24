---
title: Promise(一)—顺序请求
date: 2021-02-23 14:58:30
tags: Promise
categories: JavaScript
copyright: true
comments: true
---

若想系统学习Promise可以阅读：[阮一峰大神写的Promise对象](https://es6.ruanyifeng.com/#docs/promise)，此篇记录常用用法。

### Promise顺序请求

方法1——连续使用then链式调用
方法2——使用promise构建队列
方法3——使用async、await实现类似同步编程，async函数内部实现同步
参考：https://www.jianshu.com/p/dbda3053da20

#### 方法1：链式调用

```javascript
function getA(){
    return  new Promise(function(resolve, reject){ 
    setTimeout(function(){     
          resolve(2);
      }, 1000);
  });
}
 
function getB(){
    return  new Promise(function(resolve, reject){       
        setTimeout(function(){
            resolve(3);
        }, 1000);
    });
}
 
function addAB(a,b){
    return a+b
}

function getResult(){
    var  obj={};
    Promise.resolve().then(function(){
        return  getA() 
    })
    .then(function(a){
         obj.a=a;
    })
    .then(function(){
        return getB() 
    })
    .then(function(b){
         obj.b=b;
         return obj;
    })
    .then(function(obj){
       return  addAB(obj['a'],obj['b'])
    })
    .then(data=>{
        console.log(data)
    })
    .catch(e => console.log(e));
}
getResult();
```
#### 方法2：（TODO）
#### 方法3：（TODO）


