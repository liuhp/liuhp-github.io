---
title: Promise(三)-核心源码
tags: Promise
categories: JavaScript
copyright: true
comments: true
abbrlink: 31155
date: 2021-02-23 14:58:30
---
<!-- <img src="https://cdn.pixabay.com/photo/2021/02/07/05/15/road-5990128__480.jpg" width="100%" height="480px"> -->

若想系统学习Promise可以阅读：[阮一峰大神写的Promise对象](https://es6.ruanyifeng.com/#docs/promise)，此篇记录常用用法。


### 源码讲解

类写法：
#### step1 - 同步非链式调用
```javascript
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

Class MyPromise {
  constructor(handle) {
    // 定义变量
    this.status = 'PENDING' // 状态
    this.value = undefined  // 成功状态的变量
    this.reason = undefined  // 失败状态的失败原因
    
    // 成功时改变状态，并赋值value
    let resolve = (val) => {
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = val
      }
    }
    // 失败时改变状态，并赋值reason
    let reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
      }
    }
    // catch住当前同步代码的错误
    try {
      handle(resolve, reject)
    }catch (err) {
      reject(err)
    }
  }

  // then时根据状态执行回调
  then(onFulfilled, onRejected) {
    if (this.status = FULFILLED) {
      onFulfilled(this.value)
    }
    if (this.status = REJECTED) {
      onRejected(this.reason)
    }
  }
}
// 此时还不能链式调用
```
使用示例：
```javascript
function test() {
  return new MyPromise((resolve, reject) => {
    resolve(100)
  })
}
const p1 = test()
p1.then((res) => {
  console.log(res)
})
```

构造函数写法：
```javascript
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function MyPromise() {
  // 定义变量
  this.status = 'PENDING' // 状态
  this.value = undefined  // 成功状态的变量
  this.reason = undefined  // 失败状态的失败原因
  
  // 成功时改变状态，并赋值value
  let resolve = (val) => {
    if (this.status === PENDING) {
      this.status = FULFILLED
      this.value = val
    }
  }
  // 失败时改变状态，并赋值reason
  let reject = (reason) => {
    if (this.status === PENDING) {
      this.status = REJECTED
      this.reason = reason
    }
  }
  
  // catch住当前同步代码的错误
  try {
    handle(resolve, reject)
  }catch (err) {
    reject(err)
  }
}
// TODO  then方法
```

#### step2 - 加入异步

```javascript
// 示例
function test() {
  return new MyPromise((resolve, reject) => {
    // 异步调用，该如何处理then方法？
    setTimeout(() => {
      resolve(100)
    }, 1000)
  })
}
const p1 = test()
p1.then((res) => {
  console.log(res)
})
``` 

```javascript
//源码
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

Class MyPromise {
  constructor(handle) {
    // 定义变量
    this.status = 'PENDING' // 状态
    this.value = undefined  // 成功状态的变量
    this.reason = undefined  // 失败状态的失败原因
    // changed-begin
    this.resolveCbs = [] // 存放成功回调
    this.rejectCbs = [] // 存放失败回调
    // changed-end
    
    // 成功时改变状态，并赋值value
    let resolve = (val) => {
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = val
        // changed -->
         this.resolveCbs.forEach((fn) => fn())
      }
    }
    // 失败时改变状态，并赋值reason
    let reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
        // changed -->
        this.rejectCbs.forEach((fn) => fn())
      }
    }
    // catch住当前同步代码的错误
    try {
      handle(resolve, reject)
    }catch (err) {
      reject(err)
    }
  }

  // then时根据状态执行回调
  then(onFulfilled, onRejected) {
    if (this.status = FULFILLED) {
      onFulfilled(this.value)
    }
    if (this.status = REJECTED) {
      onRejected(this.reason)
    }
    // 异步调用，该如何处理then方法？异步时，此时状态为pending, 需要将回调函数存起来，等待时机到了再拿出来执行
    // changed-begin -->
    if (this.status = PENDING) {
      this.resolveCbs.push(() => {
        onFulfilled(this.value)
      })
      this.rejectCbs.push(() => {
        onRejected(this.reason)
      })
    }
    // changed-end -->
  }
}
```

#### step3 - 加入链式调用

```javascript
// 示例
function test() {
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve(100);
    }, 1000);
  });
}

var p1 = test();
// p1 => resolve(100) =>  p1.then(res)  res => 100;
// p2  => resolve(res)  =>  p2.then(res) => res ??

var p2 = p1.then(
  res => {
    // return {
    //   then(resolve, reject) {
    //     reject(100000);
    //   }
    // };
    return new MyPromise((resolve, reject) => {
      resolve(
        new MyPromise((resolve, reject) => {
          resolve(
            new MyPromise((resolve, reject) => {
              resolve(100000000000);
            })
          );
        })
      );
    });
  },
  err => console.log(err)
);

p2.then(
  res => {
    console.log(res);
  },
  err => {
    console.log(err);
  }
);
```
```javascript
//源码
const PENDING = "pending",
  FULFILLED = "fulfilled",
  REJECTED = "rejected";

class MyPromise {
  constructor(executor) {
    this.state = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    let resolve = value => {
      if (this.state === PENDING) {
        this.state = FULFILLED;
        this.value = value;
        this.onResolvedCallbacks.forEach(fn => fn());
      }
    };

    let reject = reason => {
      if (this.state === PENDING) {
        this.state = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    };
    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onFulFilled, onRejected) {
    let p2 = new MyPromise((resolve, reject) => {
      let x;
      if (this.state === FULFILLED) {
        setTimeout(() => {
          x = onFulFilled(this.value);
          //resolve(x);

          resolvePromise(p2, x, resolve, reject);

          // x 决定 了 p2 的状态, resolve(x)或者 reject(x)；
        }, 0);
      }

      if (this.state === REJECTED) {
        x = onRejected(this.reason);
        resolvePromise(p2, x, resolve, reject);
      }

      if (this.state === PENDING) {
        this.onResolvedCallbacks.push(() => {
          x = onFulFilled(this.value);
          resolvePromise(p2, x, resolve, reject);
        });
        this.onRejectedCallbacks.push(() => {
          x = onRejected(this.reason);
          resolvePromise(p2, x, resolve, reject);
        });
      }
    });

    return p2;
  }
}

function resolvePromise(p2, x, resolve, reject) {
  if (p2 === x) {
    return new Error("引用错误");
  }
  // thenable 对象;  blueBird q;
  if ((typeof x === "object" && x !== null) || typeof x === "function") {
    try {
      let then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          y => {
            resolvePromise(p2, y, resolve, reject);
          },
          err => {
            reject(err);
          }
        );
      }
    } catch (err) {
      reject(err);
    }
  } else {
    resolve(x);
  }
}
```
### Promise 完整核心源码

参考：https://www.jianshu.com/p/43de678e918a

```javascript
  // 判断变量否为function
  const isFunction = variable => typeof variable === 'function'
  // 定义Promise的三种状态常量
  const PENDING = 'PENDING'
  const FULFILLED = 'FULFILLED'
  const REJECTED = 'REJECTED'

  class MyPromise {
    constructor (handle) {
      if (!isFunction(handle)) {
        throw new Error('MyPromise must accept a function as a parameter')
      }
      // 添加状态
      this._status = PENDING
      // 添加状态
      this._value = undefined
      // 添加成功回调函数队列
      this._fulfilledQueues = []
      // 添加失败回调函数队列
      this._rejectedQueues = []
      // 执行handle
      try {
        handle(this._resolve.bind(this), this._reject.bind(this)) 
      } catch (err) {
        this._reject(err)
      }
    }
    // 添加resovle时执行的函数
    _resolve (val) {
      const run = () => {
        if (this._status !== PENDING) return
        this._status = FULFILLED
        // 依次执行成功队列中的函数，并清空队列
        const runFulfilled = (value) => {
          let cb;
          while (cb = this._fulfilledQueues.shift()) {
            cb(value)
          }
        }
        // 依次执行失败队列中的函数，并清空队列
        const runRejected = (error) => {
          let cb;
          while (cb = this._rejectedQueues.shift()) {
            cb(error)
          }
        }
        /* 如果resolve的参数为Promise对象，则必须等待该Promise对象状态改变后,
          当前Promsie的状态才会改变，且状态取决于参数Promsie对象的状态
        */
        if (val instanceof MyPromise) {
          val.then(value => {
            this._value = value
            runFulfilled(value)
          }, err => {
            this._value = err
            runRejected(err)
          })
        } else {
          this._value = val
          runFulfilled(val)
        }
      }
      // 为了支持同步的Promise，这里采用异步调用
      setTimeout(run, 0)
    }
    // 添加reject时执行的函数
    _reject (err) { 
      if (this._status !== PENDING) return
      // 依次执行失败队列中的函数，并清空队列
      const run = () => {
        this._status = REJECTED
        this._value = err
        let cb;
        while (cb = this._rejectedQueues.shift()) {
          cb(err)
        }
      }
      // 为了支持同步的Promise，这里采用异步调用
      setTimeout(run, 0)
    }
    // 添加then方法
    then (onFulfilled, onRejected) {
      const { _value, _status } = this
      // 返回一个新的Promise对象
      return new MyPromise((onFulfilledNext, onRejectedNext) => {
        // 封装一个成功时执行的函数
        let fulfilled = value => {
          try {
            if (!isFunction(onFulfilled)) {
              onFulfilledNext(value)
            } else {
              let res =  onFulfilled(value);
              if (res instanceof MyPromise) {
                // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
                res.then(onFulfilledNext, onRejectedNext)
              } else {
                //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
                onFulfilledNext(res)
              }
            }
          } catch (err) {
            // 如果函数执行出错，新的Promise对象的状态为失败
            onRejectedNext(err)
          }
        }
        // 封装一个失败时执行的函数
        let rejected = error => {
          try {
            if (!isFunction(onRejected)) {
              onRejectedNext(error)
            } else {
                let res = onRejected(error);
                if (res instanceof MyPromise) {
                  // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
                  res.then(onFulfilledNext, onRejectedNext)
                } else {
                  //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
                  onFulfilledNext(res)
                }
            }
          } catch (err) {
            // 如果函数执行出错，新的Promise对象的状态为失败
            onRejectedNext(err)
          }
        }
        switch (_status) {
          // 当状态为pending时，将then方法回调函数加入执行队列等待执行
          case PENDING:
            this._fulfilledQueues.push(fulfilled)
            this._rejectedQueues.push(rejected)
            break
          // 当状态已经改变时，立即执行对应的回调函数
          case FULFILLED:
            fulfilled(_value)
            break
          case REJECTED:
            rejected(_value)
            break
        }
      })
    }
    // 添加catch方法
    catch (onRejected) {
      return this.then(undefined, onRejected)
    }
    // 添加静态resolve方法
    static resolve (value) {
      // 如果参数是MyPromise实例，直接返回这个实例
      if (value instanceof MyPromise) return value
      return new MyPromise(resolve => resolve(value))
    }
    // 添加静态reject方法
    static reject (value) {
      return new MyPromise((resolve ,reject) => reject(value))
    }
    // 添加静态all方法
    static all (list) {
      return new MyPromise((resolve, reject) => {
        /**
         * 返回值的集合
         */
        let values = []
        let count = 0
        for (let [i, p] of list.entries()) {
          // 数组参数如果不是MyPromise实例，先调用MyPromise.resolve
          this.resolve(p).then(res => {
            values[i] = res
            count++
            // 所有状态都变成fulfilled时返回的MyPromise状态就变成fulfilled
            if (count === list.length) resolve(values)
          }, err => {
            // 有一个被rejected时返回的MyPromise状态就变成rejected
            reject(err)
          })
        }
      })
    }
    // 添加静态race方法
    static race (list) {
      return new MyPromise((resolve, reject) => {
        for (let p of list) {
          // 只要有一个实例率先改变状态，新的MyPromise的状态就跟着改变
          this.resolve(p).then(res => {
            resolve(res)
          }, err => {
            reject(err)
          })
        }
      })
    }
    finally (cb) {
      return this.then(
        value  => MyPromise.resolve(cb()).then(() => value),
        reason => MyPromise.resolve(cb()).then(() => { throw reason })
      );
    }
  }
```

