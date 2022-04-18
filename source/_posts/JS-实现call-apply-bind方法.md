---
title: [JS]实现call/apply/bind方法
date: 2022-04-07 15:24:53
tags: JavaScript
categories: JavaScript
copyright: true
comments: true
---

### call
实现步骤：
1. 判断调用对象是否为函数，不是函数需要抛出异常；
2. 判断是否传入改变this指向的第一个参数，如果没传则this默认指向window；
3. 将this赋值给传入的第一个参数（this要指向的对象）一个属性；
4. 将剩余参数传入这个新属性中执行；
5. 删除新属性；
6. 返回结果；

```javascript
Function.prototype.mycall = function(ctx, ...args) {
  // this此时是调用mycall的实例对象
  if (typeof this !=== 'funciton') {
    throw new Error('type error')
  }
  ctx = ctx || window
  // this这个实例对象赋值给fn属性
  // 优化：放置fn属性会覆盖该实例本身的fn属性
  let fn = Symbol(1)
  ctx[fn] = this
  // 以属性方式执行
  const res = ctx[fn](...args)
  // 执行完删除该属性
  delete ctx[fn]
  return res
}
```

### apply
apply实现与call类似，只是传参方式不同。

```javascript

Function.prototype.myapply = function(ctx, arg = []) {
  // this此时是调用mycall的实例对象
  if (typeof this !=== 'funciton') {
    throw new Error('type error')
  }
  ctx = ctx || window
  // this这个实例对象赋值给fn属性
  // 优化：放置fn属性会覆盖该实例本身的fn属性
  let fn = Symbol(1)
  ctx[fn] = this
  // 以属性方式执行
  const res = ctx[fn](arg)
  // 执行完删除该属性
  delete ctx[fn]
  return res
}
```

### bind
因为bind不是立即执行的，需要手动执行，所以可以返回一个函数实现。也可以借助call或apply实现。

```javascript

Function.prototype.mybind = function(ctx, ...args1) {
  return (...args2) => {
    // 箭头函数this指向父级，父级的this是调用该方法的实例
    let fn = Symbol(1)
    ctx[fn] = this
    const res = ctx[fn](...args1.concat(args2))  // 参数拼接
    delete ctx[fn] 
    return res
  }
}
// apply实现
Function.prototype.mybind = function(ctx, ...args1) {
  return (...args2) => {
    // 箭头函数this指向父级，父级的this是调用该方法的实例
    return this.apply(ctx, args1.concat(args2))
  }
} 

```






