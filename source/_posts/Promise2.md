---
title: Promise(二)——并行请求
date: 2021-02-23 14:58:30
tags: Promise
categories: Javascript
copyright: true
comments: true
---

<img src="https://cdn.pixabay.com/photo/2021/01/24/20/21/cloud-5946381_1280.jpg" width="100%" height="480px;"/>

若想系统学习Promise可以阅读：[阮一峰大神写的Promise对象](https://es6.ruanyifeng.com/#docs/promise)，此篇记录常用用法。


### Promise并行请求

- getA和getB并行执行，然后输出结果。如果有一个错误，就抛出错误
- 每一个promise都必须返回resolve结果才正确
- 每一个promise都不处理错误
- 参考：https://www.jianshu.com/p/dbda3053da20
  

```javascript
/**
 * 每一个promise都必须返回resolve结果才正确
 * 每一个promise都不处理错误
 */

const getA = new Promise((resolve, reject) => {
   //模拟异步任务
   setTimeout(function(){
     resolve(2);
   }, 1000) 
})
.then(result => result)


const getB = new Promise((resolve, reject) => {
   setTimeout(function(){
     // resolve(3);
     reject('Error in getB');
   }, 1000) 
})
.then(result => result)


Promise.all([getA, getB]).then(data=>{
    console.log(data)
})
.catch(e => console.log(e));
```

- getA和getB并行执行，然后输出结果。总是返回resolve结果
- 每一个promise自己处理错误

```javascript
/**
 * 每一个promise自己处理错误
 */

const getA = new Promise((resolve, reject) => {
   //模拟异步任务
   setTimeout(function(){
     resolve(2);
   }, 1000) 
})
.then(result => result)
.catch(e=>{

})


const getB = new Promise((resolve, reject) => {
   setTimeout(function(){
     // resolve(3);
     reject('Error in getB');
   }, 1000) 
})
.then(result => result)
.catch(e=>e)


Promise.all([getA, getB]).then(data=>{
    console.log(data)
})
.catch(e => console.log(e));
```

- Promise.all传入同一个方法不同参数的封装
- 应用场景 比如你需要同时发起多页请求,需要传入页码但是方法都是一样的此时我们就可以进行封装一下,很实用的一个技巧
- 参考：https://blog.csdn.net/qq_25842063/article/details/84284911

```javascript
let tasks = [];
for (let i = 1; i <= 5; i++) {
    tasks.push(i);
};
/*
* @params : func:你封装的方法 params: 参数的数组
*/
let getDataBind = (func, params) => {
        return params.map( item => {
            return func.call(null, item) //传参
        })
    }
 /*
 @params : page_no 页码  
 getDate 可以换成你自己需要重复操作的方法,同理
 */
let getData = (page_no) => {
        let saveListData = JSON.parse(localStorage.getItem(this.props.saveListData));
        let params = {
            page_no:page_no,
            ...saveListData.loadParams
        }
        return new Promise(resolve => {
            get(this.props.sortUrl, params, this, false).then(function (data) {
                resolve(data.result;);
            });
        })
    }  
 Promise.all(this.getDataBind(this.getData, arrPage))
	.then( resultArr  => {
		    resultArr = resultArr.flat();//拉平数组
		    console.log(resultArr)    //这里就获取到所有页的数据了
	});
//

```
