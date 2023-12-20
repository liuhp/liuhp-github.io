---
title: JS-this
tags: JS基础
categories: JavaScript
copyright: true
comments: true
abbrlink: 14526
date: 2022-04-10 10:06:25
---
### 绑定规则及优先级

1. new 绑定：new foo()
2. 显示绑定：call,apply,bind
3. 隐式绑定：对象调用(obj.foo())，谁调用指向谁
4. 默认绑定：默认指向window

### 箭头函数
箭头函数本身没有this，this指向由外层函数的作用域决定，父级this指向谁，箭头函数的this就指向谁。上面四项绑定规则对箭头函数都无效
```javascript
var a = 0
function foo (b) {
    console.log(this)
    var test = () => {
        console.log(this)
    }
    return test
}
var obj1 = {
    a: 1,
    foo: foo,
}
var obj2 = {
    a: 2
    foo: () => {
        console.log(this)
    }
}
obj1.foo()() // this此时指向obj1,虽然是window调用，但是默认绑定规则对箭头函数失效，箭头函数this就是父级this的指向。
var bar = foo.call(obj1) // this依然指向window, 显示绑定也无法改变this指向
obj2.foo() // this此时指向window,而不指向obj2，所以隐式调用也无效

// 箭头函数不允许作为构造函数
var foo1 = () => {
    console.log(this)
}
new foo1() // 浏览器报错：Uncaught typeerror
```

### 练习题1：
```javascript
var name = 'window'
var obj1 = {
    name: '1',
    fn1: function(){
        console.log(this.name)
    },
    fn2: () => {console.log(this.name)},
    fn3: function(){
        return function(){
            console.log(this.name)
        }
    },
    fn4: function(){
        return () => {
            console.log(this.name)
        }
    },
}
var obj2 = {
    name: '2'
}

obj1.fn1() // 1
obj1.fn1.call(obj2) // 2

obj1.fn2() // window
obj1.fn2.call(obj2) // window

obj1.fn3()() //错误 1 // 正确 window 返回的函数自调用，所以指向window
obj1.fn3().call(obj2)  // 2
obj1.fn3.call(obj2)() // 错误 2 // 正确 window 返回的函数自调用，所以指向window

obj1.fn4()() // 错误window //正确 1，返回的箭头函数中this指向父级fn4,fn4的this是obj1调用，故this指向obj1, 所以答案是1
obj1.fn4().call(obj2) // 错误window //正确 1,上题返回1，call不能改变箭头函数的this,故还是1
obj1.fn4.call(obj2)() // 2，相当于fn4在obj2中了，fn4 this指向obj2,故返回的箭头函数this也指向obj2。
//想更改箭头函数的this指向，只能更改父级作用域this指向

```

### 练习题2：
```javascript
function Foo() {
    getName = function() {
        console.log(1)
    }
    return this
}
Foo.getName = function(){ console.log(2) }
Foo.prototype.getName = function(){ console.log(3) }
var getName = function(){ console.log(4) }
function getName (){ console.log(5) }

Foo.getName() // 2
getName() // 4
Foo().getName() // 1
getName() // 1
// 预编译时，函数提升，执行时getNname表达式会覆盖函数getNname，所以5永远也不会打印出来了。

new Foo.getName() // 2, new的是对象上的属性，该属性是个方法(Foo.getNname = function(){ console.log(2) })，new的时候会执行里面的语句
new Foo().getName()  // 3, 要这么看：(new Foo()).getName()，也就是new Foo()之后的实例对象的getName()，在实例对象上没有找到getName()，再去原型上找
new new Foo().getName()  // 3，这么看：new( (new Foo()).getName() ),  最终new对象实例上的属性，实例上没有该属性，去原型上找，该属性是个方法，new时会执行里面的语句

```

