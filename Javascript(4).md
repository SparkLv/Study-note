# Javascript(4)

---

## 事件

### 事件流

* 事件冒泡：事件开始时由最具体的元素接收，然后逐级向上传播到较为不具体的节点（文档），所有现代浏览器都支持事件冒泡
* 事件捕获：不太具体的节点更早收到事件，而最具体的节点最后接收到事件

### 事件处理程序

#### HTML事件处理程序

在html中使用类似onclick这样的属性

#### DOM0级

类似
```js
btn.onclick = function(){
    statement
}
```

具有跨浏览器的优势，this引用当前的元素

删除事件处理程序

```js
btn.onclick = null;
```

#### DOM2级

定义了两个方法

* addEventListener()
* removeEventListener()

都接受三个参数：要处理的事件名、作为事件处理程序的函数（this指向调用的元素）、布尔值（true表示在捕获阶段调用事件处理程序，false表示在冒泡阶段调用事件处理程序）

主要是好处是可以添加多个事件处理程序

另外，addEventListener定义的事件只能用removeEventListener移除，添加的事件处理程序参数相同，匿名函数将无法移除

IE事件处理程序

* attachEvent()：添加的事件都会被添加到冒泡阶段，第一个参数是on+事件名，第二个参数为执行函数（this指向window），执行方向按相反顺序触发
* detachEvent()：可以移除事件，但是必须提供相同的参数

### 事件对象

DOM中的事件对象

在事件处理程序内部，对象this始终等于currentTarget的值，而target则只包含事件的实际目标，也就是说this和currentTarget指向的是事件处理程序处理的目标（冒泡的目标），而target是实际操作的目标（不冒泡的目标）

* preventDefault()：可以阻止默认行为，比如点击链接会跳转
* stopPropagation()：用于停止事件在DOM层次中传播

IE中的事件对象

event对象在window中，而且属性和方法也不同，IE9及以上支持DOM事件对象，所以省略

### 事件类型

#### UI事件

load：当页面完全加载后（包括所有图像、javascript文件、CSS文件等外部文件），event不包含有关这个事件的任何附加信息

unload：文档被完全卸载后触发。只要用户从一个页面切换到另一个页面就会触发

