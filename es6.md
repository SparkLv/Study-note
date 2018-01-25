# ES6

---

ECMAScript 6 在接下来的一段时间内将成为 ECMAScript的一个标准。不管在Github,还是在很多社区，javascript爱好者已经早已开始拥抱变化，享受ES6 带来的美好,这篇文章将介绍ES6的一些新特性。

## let和const命令

let与var相似，但是所声明的变量只在let命令所在的代码块内有效

* 不存在变量提升：如果在声明前使用，会抛出错误
* 暂时性死区：只要块级作用域中存在let命令，那么它所声明的变量就绑定这个区域，不再受外部影响。
* 不允许重复声明：不允许在相同作用域内，重复声明同一个变量。所以，也不能在函数内部重新声明参数
* let实际上新增了块级作用域
* const声明一个只读得常量，一旦声明，必须初始化，并且值不得改变（如果是对象或者数组，可以改变属性）。其他特性与let相似
* 在浏览器中let和const定义的全局变量将和window脱离

## 解构赋值

### 基本用法

允许按照一定模式，从数组和对象中提取值，对变量进行赋值。

例如：

```javascript
let [a,b,c]=[1,2,3]
```

* 这种写法属于 模式匹配 只要等号两边的模式相同，左边的变量就会被赋予对应的值，如果解构不成功，变量的值就等于undefined
* 如果等号右边是不可遍历的结构，那么将会报错
* 解构赋值允许指定默认值，只有数组成员严格等于undefined，默认值才会生效

### 对象的解构赋值

* 对象的属性没有次序，变量必须与属性同名

```javascript
let {a:a,b:b}={a:'a',b:'b'}
```
* 对象结构赋值会将等号右边的表达式转化为对象，如果不能转化为对象，则报错

## 字符串的扩展

### Unicode表示

\u这种表示法，只限于\u0000~\uFFFF之间的字符，超过这个范围的字符必须用双字节形式表示，但是ES6可以使用大括号，这样就可以正确解读

### 遍历

字符串可以被for...of循环遍历

### includes(),startsWith(),endsWith()

* indcludes():返回布尔值，表示是否找到了参数字符串
* startsWith():返回布尔值，表示字符串是否在头部
* endsWith():返回布尔值，表示字符串是否在尾部

这三个方法都有第二个可选参数，表示搜索位置，endsWith表示的是针对前n个字符，而其他两个方法针对n位置

### repeat()

返回一个新字符串，表示将原字符串重复n次

### padStart,padEnd()

功能分别是头部补全和尾部补全，第一个参数是长度第二个是用于补全的字符串

### 模板字符串

使用反引号 ` 来定义模板字符串，可以定义多行字符串，也可以插入变量(使用${}插入，也可以插入表达式)

## 数值的扩展

### 指数运算符

* \*\*

## 函数的扩展

### 默认值

* es6允许为函数的参数设置默认值，直接写在参数定义的后面
* 使用参数默认值时，函数不能有同名参数
* length属性，将返回没有指定默认值的参数的个数

### rest参数

用于获取函数的多余参数（...params）

与arguments对象的区别在于，rest参数是个数组，因此有数组的方法

### 箭头函数

* 函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象
* 不可以当作构造函数，也就是说，不可以使用new命令
* 不可以使用arguments对象，可以使用rest参数代替
* 不可以使用yield命令，因此箭头函数不能用作Generator函数
* 实际上，箭头函数根本没有自己的this，导致内部的this就是外层代码块的this。所以不能用作构造函数，也不能用call()、apply()、bind()这些方法去改变this的指向

## 数组的扩展

### 扩展运算符

`...`好比rest参数得逆运算，将一个数组转为用逗号分隔得参数序列

#### 复制数组

```js
const [...a2] = [1,2,3]
```

#### 合并数组

```js
[...arr1,...arr2,...arr3]
```

#### 解构赋值

```js
const [first,...rest]=[1,2,3,4,5]
```

#### 字符串

```js
[...'string']
```

### Array.from()

用于将两类对象转换为真正的数组：类似数组的对象和可遍历的对象，接受第二个参数，是类似map数组的map方法

### Array.of()

用于将一组值转换为数组，为了弥补Array的不足

### copyWithin()

是数组实例的方法

能接受三个参数：
* target(必需):从该位置开始替换数据
* start:从该位置开始读取数据，默认为0
* end:到该位置前停止读取数据，默认为数组长度

### find()和findIndex()

用于找出第一个符合条件的数组成员，分别返回value和index,回调函数的参数为value,index,arr

find方法弥补了indexOf不能校验NaN的问题

### fill()

用给定值填充数组，第二个参数指定起始位置，第三个参数指定结束为止

### entries(),key(),values()

用于遍历数组，都返回一个遍历器对象，可以用for...of循环遍历，不同的是key是对键名的遍历，values()是对键值的遍历，entries()是对键值对的遍历。
如果使用for...of循环，可以使用next方法

### includes

返回一个布尔值，表示数组是否包含给定值，第二个参数表示搜索的起始位置

## 对象的扩展

### 属性简洁表示法

es6允许直接写入变量和函数，作为对象的属性和方法

### 属性名表达式

可以在为对象字面量复制的时候使用表达式作为对象的属性名

```js
let obj={
    ['a'+'b']:'c'
}
```

### Object.is()

接受两个参数用于比较，相比于===

```js
Object.is(NaN,NaN) //true
Object.is(+0,-0)//false
```

### Object.assign()

用于对象的合并，将对象的所有可枚举属性，复制到目标对象

* 第一个参数是目标对象，后面的参数都是源对象
* 如果目标对象和源对象有同名属性，则后面的属性会覆盖签名的属性
* 如果只有一个参数，则会返回该参数
* 浅拷贝，拷贝得到的是这个对象的引用

### 遍历

* Object.keys():返回一个数组，成员是参数对象自身的所有可遍历属性的键名
* Object.values():返回一个数组，成员是参数对象自身所有可遍历属性的键值
* Object.entries():方法返回一个数组，成员是参数对象自身的所有可遍历属性的键值对数组

### super关键字

指向当前对象的构造函数

## Set数据结构

Set本身是一个构造函数，用于生成没有重复值的数组

* 可以接受一个数组，作为参数，用于初始化
* 两个NaN相等，两个空对象总是不相等

### 属性

* Set.prototype.constructor:Set
* Set.prototype.size:返回实例成员总数

### 方法

* add():添加某个值
* delete():删除某个值
* has():返回布尔值，判断是否含有
* clear():清除所有成员

### 遍历

* keys():键名，和values一样
* values():键值
* entries():键值对
* forEach():类似数组，参数value key

## Map数据结构

类似于对象，也是键值对的集合，但是，键名不仅局限于字符串

* 0和-0是一个键，NaN是同一个键
* 布尔值true和字符串true是两个不同的键，undefined和null也是两个不同的键
* 可以接受数组作为参数，数组里的数组成员表示的是键值对

### 属性和方法

* size:返回Map结构成员总数
* set(key,value):设置键值对
* get(key):读取对应键值
* has(key):判断是否存在
* delete(key):删除键
* clear():清空所有成员

### 遍历

* keys():返回键名的遍历器
* values():返回键值的遍历器
* entries():返回所有成员的遍历器
* forEach():遍历Map的所有成员

## Promise对象

* promise对象不受外界影响，代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）、rejected（已失败）
* 一旦状态改变，就不会再改变，任何时候都可以得到这个结果
* 无法取消，并且Promise内部抛出的错误不会反映在外部，所以尽量写回调

### 用法

Promise对象是一个构造函数，用来生成实例

```js
const promise = new Promise(function(resolve,reject){
    if(/*...*/){
        resolve(value)
    }
    else{
        reject(error)
    }
})

promise.then(function(){
//success
},function(){
//failure
})
```
其实使用catch而不使用then的第二个回调函数更好，因为promise对象的错误有冒泡的性质，会一直向后传递，直到被捕获，所以错误总会被catch语句捕获

## Class

通过`class`关键字可以定义类

```js
class Point{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
    toString(){
        /*...*/
    }
}
//constructor是构造方法，this代表实例对象
```

* 使用的时候，同样直接对类使用new命令。事实上，类的所有方法都定义在类的prototype上
* 类的内部所有定义的方法都是不可枚举的
* 通过new命令生成对象实例时，会自动调用constructor，如果没有显示定义，一个空的constructor方法会被默认添加
* constructor方法默认返回实例对象this
* 类必须使用new调用，否则会报错，而构造函数是可以直接调用的
* 不存在变量提升，即实例化只能在分类定义后
* es6不提供私有方法

### 静态方法

* 所有在类中定义的方法，都会被实例继承，如果一个方法前加上static关键字，表示该方法不会被实例继承，而是直接通过类来调用，成为静态方法
* 如果静态方法中包含关键字this，这个关键字this指的是类，而不是实例
* 静态方法和非静态方法可以重名
* 父类的静态方法可以被子类继承

```js
class Sup{
    static met(){
        /*...*/
    }
}

class Sub extends Sup{

}

Sub.met()
```
静态方法也可以从super对象上调用

### 静态属性

static只能定义方法，静态属性必须在类外定义

### 继承

通过extends关键字实现继承

```js
class Sub extends Sup{
    constructor(x,y,z){
        super(x,y);//调用父类的constructor(x,y)
        this.color = z;
    }
    toString(){
        return this.color + '' + super.toString()//调用父类的toString()
    }
}
```

* 子类必须在constructor方法中调用super方法，否则新建实例会报错，这是因为子类没有自己的this对象，而是继承父类的this对象，然后对其加工，如果不调用super方法，子类就得不到this对象
* 与ES5的不同点
  * ES6的继承实质是先创造父类的实例对象this，然后再用子类的构造函数修改this
  * ES5的继承实质上是先创造子类的实例对象this，再将父类的方法添加到this上面

#### Object.getPrototypeOf()

Object.getPrototypeOf方法可以用来从子类上获取父类

```js
Object.getPrototypeOf(Sub) === Sup
//true
```

#### super关键字

* 作为函数使用：代表父类的构造函数
* 作为对象：指向父类的原型对象，在静态方法中指向父类