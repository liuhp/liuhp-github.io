---
title: JS循环知多少
tags: JavaScript
categories: JavaScript
copyright: true
comments: true
abbrlink: 13579
date: 2022-04-08 17:06:35
---

### 数组遍历
#### for循环、while、do...while
听说速度最快，效率最高，其他不过多解释。
```javascript
for(let i = 0; i< 5; i++) {
  console.log(i)
}
```

#### for...of
遍历的是值，能正确响应return、break、continue语句。不仅可以循环遍历数组对象。还可以迭代 Array、Map、Set、String 等对象。
```javascript
// 遍历String
let str = "Hello";
for (let value of str) {
  console.log(value)
}
// H e l l o

// 遍历Map
let iterable = new Map([["a", 1], ["b", 2], ["c", 3]]);
for (let entry of iterable) {
  console.log(entry);
}
// ["a", 1]
// ["b", 2]
// ["c", 3]
for (let [key, value] of iterable) {
  console.log(value);
}
// 1
// 2
// 3
```
#### 数组内置方法：
#### forEach
不能中断，除非手动抛出异常```throw new Error()```, return、break、continue都不能跳出循环
#### map()
处理数组元素，返回新数组
#### filter()
过滤，返回新数组
#### find()
过滤，返回找到的元素或undefined，非数组
#### reduce()
能干好多事：[看这里](https://jelly.jd.com/article/6006b1035b6c6a01506c87a1)
#### erery()
检测数组元素是否全部符合指定条件
#### some()
检测数组是否存在一个符合指定条件的元素


### 对象遍历
#### for...in
遍历对象。虽然可以遍历数组，遍历的是数组的索引，并且索引会变成string类型，不做推荐，很多坑。
> for...in只会遍历自身的属性以及继承下来并且设置为可遍历的属性(继承的类的属性是默认不可遍历的, 但这个属性是更改为可以遍历的，就会造成遍历到不属于自身的属性)必要时可以结合使用hasOwnProperty方法，在循环内部判断一下。
```javascript
const person = { name: '老张' };
for (let key in person) {  
    if (person.hasOwnProperty(key)) {   
         console.log(key); // name 
      }
}
```
#### Object.keys() 和 Object.getOwnPropertyNames()





