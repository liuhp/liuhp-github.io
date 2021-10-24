---
title: JS基础
date: 2021-10-21 22:58:10
tags: JS基础
categories: JavaScript
copyright: true
comments: true
---
### 数据类型

基本类型:
1. Boolean;
2. Null;
3. Undefined;
4. Number;
5. String;

引用类型 :
6. Objects: Array, function, Date

新增：
7. BigInt: 谷歌67版本出现的数据类型, 是指安全存储、操作大整数，（但是很多人不把这个做为一个类型;
8. Symbol：ES6新增, 这种类型的对象永不相等，即始创建的时候传入相同的值，可以解决属性名冲突的问题，做为标记;

### 类型判断
- typeof
- instanceof
- Object.prototype.toString
- isXXX，比如 isArray

typeof:返回一个字符串
<div align=center>
<img src="1.jpg" width = 65%>
</div>

因为typeof不能区 Object 下很多细分的类型，如 Array、Function、Date、RegExp、Error 等。可以用Object.prototype.toString来进一步区分：
>When the toString method is called, the following steps are taken:
>1. If the this value is undefined, return "[object Undefined]".
>2. If the this value is null, return "[object Null]".
>3. Let *O* be the result of calling ToObject passing the this value as the argument.
>4. Let class be the value of the [[Class]] internal property of O.
>5. Return the String value that is the result of concatenating the three Strings "[object ", class, and "]".

```javascript
// 以下是11种：
var number = 1;          // [object Number]
var string = '123';      // [object String]
var boolean = true;      // [object Boolean]
var und = undefined;     // [object Undefined]
var nul = null;          // [object Null]
var obj = {a: 1}         // [object Object]
var array = [1, 2, 3];   // [object Array]
var date = new Date();   // [object Date]
var error = new Error(); // [object Error]
var reg = /a/g;          // [object RegExp]
var func = function a(){}; // [object Function]

function checkType() {
    for (var i = 0; i < arguments.length; i++) {
        console.log(Object.prototype.toString.call(arguments[i]))
    }
}

checkType(number, string, boolean, und, nul, obj, array, date, error, reg, func)

// 此外还有
console.log(Object.prototype.toString.call(Math)); // [object Math]
console.log(Object.prototype.toString.call(JSON)); // [object JSON]

function a() {
    console.log(Object.prototype.toString.call(arguments)); // [object Arguments]
}
a();

```

instanceof： 用于判断一个变量是否属于某个对象的实例。也可以用来判断某个构造函数的prototype属性是否存在另外一个要检测对象的原型链上。
```javascript
function test(){};var a=new test();alert(a instanceof test) // true
var a=new Array();if (a instanceof Object) alert('Y');else alert('N'); // Y
if (window instanceof Object) alert('Y');else alert('N'); // N
// 所以，这里的 instanceof 测试的 object 是指 js 语法中的 object，不是指 dom 模型对象。
alert(typeof(window)) // 会得到object
```



参考：
[1]:https://www.php.cn/js-tutorial-411579.html
[2]:https://github.com/mqyqingfeng/Blog/issues/28
### 类型转换





