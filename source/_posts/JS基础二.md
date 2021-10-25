---
title: JS基础（二）
date: 2021-10-21 23:04:23
tags: JS基础
categories: JavaScript
copyright: true
comments: true
---

## 一、类型转换
### （1）原始值 -> 对象
#### 1 原始值转字符串
String()
#### 2 原始值转数字
方法一：
Number()
方法二：
算数函数或表达式

| 值      | 变成…… |
| -------------------- | ----------- |
| undefined	| NaN |
| null	| 0
| true和false | 	1 和 0
| string | 	去掉首尾空格后的纯数字字符串中含有的数字。如果剩余字符串为空，则转换结果为 0。否则，将会从剩余字符串中“读取”数字。当类型转换出现 error 时返回 NaN。|

注意：
如果通过 Number 转换函数传入一个字符串，它会试图将其转换成一个整数或浮点数，而且会忽略所有前导的 0，如果有一个字符不是数字，结果都会返回 NaN，鉴于这种严格的判断，我们一般还会使用更加灵活的 parseInt 和 parseFloat 进行转换。

parseInt 只解析整数，parseFloat 则可以解析整数和浮点数，如果字符串前缀是 "0x" 或者"0X"，parseInt 将其解释为十六进制数，parseInt 和 parseFloat 都会跳过任意数量的前导空格，尽可能解析更多数值字符，并忽略后面的内容。如果第一个非空格字符是非法的数字直接量，将最终返回 NaN：
```javascript
console.log(parseInt("3 abc")) // 3
console.log(parseFloat("3.14 abc")) // 3.14
console.log(parseInt("-12.34")) // -12
console.log(parseInt("0xFF")) // 255
console.log(parseFloat(".1")) // 0.1
console.log(parseInt("0.1")) // 0
```

#### 3 原始值转布尔类型
转换规则如下：

| 值 | 变成…… |
| ------------------- | -------------|
| +0, -0, null, undefined, NaN, "", false | false |
| 其他值 | true |

>请注意:
>- 当 Boolean 函数不传任何参数时，会返回 false;
>- 包含 0 的字符串 "0" 是 true一些编程语言（比如 PHP）视 "0" 为 false。但在 JavaScript中，非空的字符串总是 true;
```javascript
alert( Boolean("0") ); // true
alert( Boolean(" ") ); // 空白，也是 true（任何非空字符串都是 true）
```
#### 4 原始值转对象
原始值到对象的转换非常简单，原始值通过调用 String()、Number() 或者 Boolean() 构造函数，转换为它们各自的包装对象。

null 和 undefined 属于例外，当将它们用在期望是一个对象的地方都会造成一个类型错误 (TypeError) 异常，而不会执行正常的转换。

```javascript
var a = 1;
console.log(typeof a); // number
var b = new Number(a);
console.log(typeof b); // object
```

### （2）对象 -> 原始值
#### 1 对象转布尔值
所有对象（包括函数和数组）的布尔值都是true.

#### 2 对象转字符串和数字
对象到字符串和对象到数字的转换都是通过调用待转换对象的一个方法来完成的。而 JavaScript 对象有两个不同的方法来执行转换，一个是 toString，一个是 valueOf,这两个方法是真实暴露出来的方法。

所有的对象除了 null 和 undefined 之外的任何值都具有 toString 方法。

1. 数组的 toString 方法将每个数组元素转换成一个字符串，并在元素之间添加逗号后合并成结果字符串。
2. 函数的 toString 方法返回源代码字符串。
3. 日期的 toString 方法返回一个可读的日期和时间字符串。
4. RegExp 的 toString 方法返回一个表示正则表达式直接量的字符串。

而另一个转换对象的函数是 valueOf，表示对象的原始值。**默认的 valueOf 方法返回这个对象本身，数组、函数、正则简单的继承了这个默认方法，也会返回对象本身**。日期是一个例外，它会返回它的一个内容表示: 1970 年 1 月 1 日以来的毫秒数。
```javascript
var date = new Date(2017, 4, 21);
console.log(date.valueOf()) // 1495296000000
```

更复杂的情况见参考文献[2],写的很详细，很简单易懂。

## 二、操作符强制类型转换

### 1 一元操作符 +

```javascript
console.log(+[]); // 0
console.log(+['1']); // 1
console.log(+['1', '2', '3']); // NaN
console.log(+{}); // NaN
```
执行的步骤是：

1. 如果 obj 为基本类型，直接返回
2. 否则，调用 valueOf 方法，如果返回一个原始值，则 JavaScript 将其返回。
3. 否则，调用 toString 方法，如果返回一个原始值，则JavaScript 将其返回。
4. 否则，JavaScript 抛出一个类型错误异常。

注意：前面讲过：默认的 valueOf 方法返回这个对象本身

### 2 二元操作符 +

当计算 value1 + value2时：

1. lprim = ToPrimitive(value1)
2. rprim = ToPrimitive(value2)
3. 如果 lprim 是字符串或者 rprim 是字符串，那么返回 ToString(lprim) 和 ToString(rprim)的拼接结果
4. 返回 ToNumber(lprim) 和 ToNumber(rprim)的运算结果

```javascript
console.log(1 + '1'); // 11（字符串）
console.log(null + 1); // 1（数字）
console.log([] + []); // ''(空字符串)
console.log([] + {}); // [object Object]
console.log(1 + true); // 2
console.log({} + {}); // "[object Object][object Object]"
console.log(new Date(2017, 04, 21) + 1) // "Sun May 21 2017 00:00:00 GMT+0800 (CST)1"
```

### 3 ==相等
操作规则如下图：

<div align=center>
<img src="1.jpg" width = 65%>
</div>






参考：
[1].[类型转换](https://zh.javascript.info/type-conversions)
[2].[JavaScript 深入之头疼的类型转换(上)](https://github.com/mqyqingfeng/Blog/issues/159)  写的很细👍
[3].[JavaScript 深入之头疼的类型转换(下)](https://github.com/mqyqingfeng/Blog/issues/164)


