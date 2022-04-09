---
title: JS循环知多少
date: 2022-04-08 17:06:35
tags: JS基础
categories: JavaScript
copyright: true
comments: true
---

### 数组
### for循环、while、do...while
听说速度最快，效率最高，其他不过多解释。
```javascript
for(let i = 0; i< 5; i++) {
  console.log(i)
}
```

### forEach
不能中断，除非手动抛出异常```throw new Error()```, return、break、continue都不能跳出循环

### for of
ES6新增， 能正确响应return、break、continue语句。for...of 语句不仅可以循环遍历数组对象。还可以迭代 Array、Map、Set、String 等对象。
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
### 

### 对象
#### for in
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

