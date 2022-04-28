---
title: Array.prototype.reduce()
date: 2022-04-28 14:35:10
tags: JavaScript
categories: JavaScript
copyright: true
comments: true
---

### 基本使用
```javascript
arr.reduce(function(previousValue, item, index, arr){},
initialValue)
```
1. callback入参：
- previousValue：上一次调用 callbackFn 时的返回值。在第一次调用时，若指定了初始值 initialValue，其值则为 initialValue，否则为数组索引为 0 的元素 array[0]。
- item initialValue，其值则为数组索引为 0 的元素 array[0]，否则为 array[1]。
- index：数组中正在处理的元素的索引。若指定了初始值 initialValue，则起始索引号为 0，否则从索引 1 起始。
- arr：用于遍历的数组。

2. initialValue 可选
作为第一次调用 callback 函数时参数 previousValue 的值。若指定了初始值 initialValue，则 currentValue 则将使用数组第一个元素；否则 previousValue 将使用数组第一个元素，而 currentValue 将使用数组第二个元素。

3. 返回值
使用 “reducer” 回调函数遍历整个数组后的结果。
4. 如果数组为空且未指定初始值 initialValue，则会抛出 TypeError。

### 使用场景
#### 1 求所有数组的和
```javascript
const arr = [1,2,3,4]
const res = arr.reduce((pre, item, index, arr)=>{
  return pre + item
}, 0)
console.log(res) // 10
```

#### 2 数组扁平化

```javascript
const arr = [[1,2], [3,4],[5,6]]
const res = arr.reduce((pre, item, index, arr)=>{
  return pre.concat(item)
},[])
console.log(res)
// [ 1, 2, 3, 4, 5, 6 ]
```

#### 3 统计数组中元素出现的次数
```javascript
const arr = [1,2,2,3,3,3,4,4]
const res = arr.reduce((pre, item, index, arr)=>{
  if(item in pre){
    pre[item] += 1
  } else {
    pre[item] = 0
  }
  return pre
}, {})
console.log(res)
// { '1': 1, '2': 2, '3': 3, '4': 2 }
```
#### 4 按照属性对object进行分类
```javascript
let people = [
  { name: 'Alice', age: 21 },
  { name: 'Max', age: 20 },
  { name: 'Jane', age: 20 }
];

function groupby(arr, property){
  return arr.reduce(function(pre, item, index, arr){
    let key = item[property]
      if(!pre[key]){
        pre[key] = [item]
      } else {
        pre[key].push(item)
      }
    return pre
  }, {})
}
console.log(groupby(people, age))
// {
//   '20': [ { name: 'Max', age: 20 }, { name: 'Jane', age: 20 } ],
//   '21': [ { name: 'Alice', age: 21 } ]
// }
```
#### 5 数组去重
```javascript
const arr = [1,2,2,2,3,3,4]
const res = arr.sort().reduce((pre, item, index, arr.sort())=>{
  if(pre.length === 0 || pre[pre.length-1] !== item){
    pre.push(item)
  }
  return pre
}, [])
console.log(res) // [1,2,3,4]
```
#### 6 函数组合实现管道-高阶函数
```javascript
const double = x => x + x
const triple = x => 3 * x
const quadruple = x => 4 * x

 function pipe (...fns){
  return function(input){
    return fns.reduce((pre, fn, index) => fn(pre)
    }, input)
  }
}
const sixble = pipe(double, triple)
console.log(sixble(6))
```
#### 7 reduce实现map
```javascript
const arr = [1,2,,3]
if(!Array.prototype.mapUseReduce){
  Array.prototype.mapUseReduce = function(callback, initialValue){
    // this指向调用mapUseReduce的数组
    return this.reduce((pre, item, index, arr)=>{
      pre[index] = callback.call(initialValue, item, index, arr)
      return pre
    },[])
  }
}
const res = arr.mapUseReduce((item, index, arr)=>{
  return item+index+arr.length
})
console.log(res) //[ 5, 7, <1 empty item>, 10 ]
```
### 手写实现reduce
```javascript
Array.prototype.myReduce = function(fn, initialValue){
  if(!Array.isArray(this) || !this.length || typeof fn !== 'function'){ return [] }
  const arr = this
  const isHasInitval = initialValue === undefined ? false: true
  let pre = isHasInitval ? initialValue : arr[0]
  let i = isHasInitval ? 0 : 1
  for(; i<arr.length; i++){
    pre = fn(pre, arr[i], i, arr)
  }
  return pre
}
const arr = [1,2,3]
console.log(arr.myReduce((pre, item)=>{
  return pre + item
}, 0)) // 6

```