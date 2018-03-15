# ajax

---

## XMLHttpRequest

实例化XHR对象

```js
let xhr = new XMLHttpRequest();
```

调用的第一个方法是open

```js
xhr.open("get","url",false);
//第一个参数是请求的类型，第二个参数是url，第三个是是否异步发送
```

如果是同步，那么js代码会等到浏览器响应之后再继续执行

然后调用send

```js
xhr.send(null);

//接受一个参数，即要作为请求主体发送的数据
```

收到响应后，响应数据会自动填充XHR对象的属性

* responseText:作为响应主体被返回的文本

* responseXML:如果响应的内容类型是`text/xml`或`application/xml`，这个属性中将保存包含着响应数据的XML DOM文档

* status:响应的HTTP状态(200作为成功的标志)

* statusText:HTTP状态的说明

异步请求下可以使用`readyState`属性来获知当前请求/响应的活跃阶段

* 0:未初始化，尚未调用`open`方法

* 1:启动，已经调用`open`方法，但尚未调用`send`方法

* 2:发送，已经调用`send`方法，但是尚未接收到响应

* 3:接收，已经接收到部分响应数据

* 4:完成，已经接收到全部响应数据，并且可以使用

每当`readyState`属性值发生改变，会触发`readystatechange`事件

取消异步请求

```js
xhr.abort()
```

HTTP头部信息

* setRequestHeader():接受两个参数，头部字段的名称和头部字段的值，位于open之后send之前

* getResponseHeader():传入头部字段名称，可以取得相应的响应头部信息

* getAllResponseHeaders():方法可以取得一个包含所有头部信息的长字符串

GET请求

查询字符串中每个参数的名称和值都必须使用encodeURIComponent()进行编码

POST请求

需要设置头部信息`Content-Type`为`application/x-www-form-urlencoded`，另外post数据的格式与查询字符串格式相同

## 进阶

超时设定

timeout属性:表示请求在等待响应多少毫秒之后就终止，会触发timeout事件
