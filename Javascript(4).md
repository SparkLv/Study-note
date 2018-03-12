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

* load：当页面完全加载后（包括所有图像、javascript文件、CSS文件等外部文件），event不包含有关这个事件的任何附加信息
* unload：文档被完全卸载后触发。只要用户从一个页面切换到另一个页面就会触发
* resize：当浏览器窗口被调整到一个新的高度或宽度时，就会触发resize事件
* scroll：元素滚动的时候触发

#### 焦点事件

* blur：在元素失去焦点时触发，这个事件不会冒泡
* focus：在元素获得焦点时触发，不会冒泡
* focusin：同focus，但是它冒泡
* focusout：同blur，冒泡

#### 鼠标与滚轮事件

* click：在用户点击主鼠标按钮或按下回车时触发
* dblclick：用户双击主鼠标按钮触发
* mousedown：用户按下任意鼠标按钮时触发
* mouseenter：鼠标光标从元素外部首次移动到元素范围之内时触发，不冒泡
* mouseleave：在位于元素上方的鼠标移动到元素范围之外时触发（不包括后台元素）。这个事件不冒泡
* mousemove：当鼠标在元素内部移动时重复触发
* mouseout：鼠标指针位于一个元素的上方，然后将其移入另一个元素时触发，另一个元素可以时前一个元素外部，也可以是它的子元素
* mouseover：在鼠标指针位于一个元素外部，然后用户将其首次移入另一个元素边界之内时触发
* mouseup：用户释放鼠标按钮时触发
* mousewheel：通过鼠标滚轮与页面交互触发。event属性wheelDelta包含滚动信息，向前是120的倍数，向后是-120的倍数

鼠标事件都有一些特殊的属性

* clientX和clientY：表示事件发生时鼠标指针在视口中的水平和垂直坐标
* pageX和pageY：表示鼠标光标在页面中的位置，非视口包括滚动
* screenX和screenY：相对于整个电脑屏幕的位置
* 修改键：当点击鼠标后，如果键盘上有响应按键就会返回true的布尔值，否则为false
  * Shift--shiftKey
  * Ctrl--ctrlKey
  * Alt--altKey
  * Meta--metaKey
* 相关元素
  * relatedTarget属性：只对mouseover和mouseout事件才包含值
* 鼠标按钮
  * button属性：0表示主鼠标按钮、1表示中间鼠标按钮、2表示次鼠标按钮

#### 键盘与文本事件

* keydown：当用户按下键盘上任意键时触发，如果不放，会重复触发
* keypress：按下字符键时触发，如果不放，会重发触发（ESC也会触发，删除字符也会触发）
* keyup：当用户释放键盘上的键时触发
* textInput：是对keypress的补充，用意是将文本显示给用户之前更容易拦截文本（可编辑区域才可触发）

event对象

* 键码
  * keydown和keyup：keyCode属性会包含一个代码，与键盘上一个特定的键对应
  * keypress：chartCode属性，代表字符的ASCII编码
  * textInput：data属性，表示输入的字符（非字符编码）
    * inputMethod，表示文本输入到文本框的方式

#### HTML5事件

* contextmenu：上下文菜单，即通过单击鼠标右键触发的事件，preventDefault()可以阻止默认的菜单出现
* beforeunload：再浏览器卸载前触发（包括刷新）
* DOMContentLoaded：再形成完整的DOM树之后就会触发，不理会图像，js文件、css文件或其他资源是否已经下载完毕
* readystatechange：提供与文档或元素的加载状态有关的信息。支持它的对象都会有一个readyState属性
  * uninitialized：未初始化
  * loading：正在加载
  * loaded：加载完毕，即加载数据完成
  * interactive：交互，可操作对象但未完全加载
  * complete：对象已经完全加载完毕
* hashchange：#后面的字符串发生改变触发

### 内存和性能

#### 事件委托

利用冒泡和event.target来区分不同的目标，进而执行不同的函数

#### 移除事件处理程序

## 表单脚本

### 取得form元素

* document.getElementById('')之类
* document.forms：可以获取页面中所有的表单

### 提交表单

使用input和button都可以，只需把type设置为submit

input的type为image也可以

只要表单中存在上述任何一种按钮，那么在表单控件拥有焦点的情况下，按回车键就可以提交（textarea例外，会换行）

使用表单元素的submit方法也可以提交表单，reset()方法可以重置为默认值（input和button的type为reset也可以）

### 表单字段

每个表单都有elements属性，该属性是表单中所有元素的集合，是一个有序列表，包含着表单中所有字段，可以通过索引或者name来访问。

共有的表单字段属性和方法(除了fieldset)

* disabled：表示当前字段是否被禁用
* form：指向当前字段所属表单的指针
* name：当前字段的名称
* readOnly：表示当前字段是否只读
* tabIndex：表示当前字段的切换序号
* type：当前字段的类型
* value：当前字段将被提交给服务器的值(对于文件字段来书，是只读的)

* focus()：用于将浏览器的焦点设置到表单字段，即激活表单字段，(html5新增autofocus属性，只要设置这个属性，js就能自动把焦点移动到相应字段)
* blur()：移走焦点

共有的表单字段事件

* blur：当前字段失去焦点时触发
* change：对于input和textarea元素，在他们失去焦点且value值改变时触发，对于select元素，在其选项改变时触发
* focus：当前字段获得焦点时触发

文本框脚本

* size属性可以指定文本框中能够显示的字符数
* value特性可以设置文本框的初始值(尽量不要使用setAtrribute设置value，因为不一定会反应在dom中)
* maxlength用于指定文本框可以接受的最大字符数
* textarea
  * rows和cols分别指定文本框的行数和列数
  * 不能指定最大字符数

选择文本

select()：text和textarea都有这个方法，用于选中所有文本

select事件：只要用户选择了一个字母，就会触发select事件

取得文本

```js
input.vaule.substring(input.selectionStart,input,selectionEnd);

//ie8之前不支持
```

选择部分文本

```js
setSelectionRange(0,4);

//参数即为索引，ie8不支持
```

过滤输入

例如：

```js
keypress中e有charCode属性，再使用String.fromCharCode()方法将编码转换成字符串，最后使用 preventDefault() 屏蔽输入
```

操作剪贴板

事件：

* beforecopy
* copy
* beforecut
* cut
* beforepaste
* paste

访问：

在上述事件对象的clipboardData对象，可以访问剪贴板，有三个方法

1. getData():参数为数据类型
2. setData():第一个参数是类型，第二个参数是数据
3. clearData()

选择框脚本

所有表单字段除了共有的属性和方法外，还有以下方法

* add(newOption,reOption):向控件中插入新option元素，在reloption之前
* multiple:布尔值，表示是否允许多项选择
* options:控件所有option元素的HTMLCollection
* remove(index):移除给定位置的选项
* selectedIndex:基于0的选中项的索引，如果没有选中项则值为-1，对于支持多选的控件，只保存选中项中第一项的索引
* size:选择框中可见的行数

有value则value为指定value，无value则value值为文本

Option

* index:当前选项在option集合中的索引
* label:当前选项的标签，等价于HTML中的label特性
* selected:布尔值，表示当前选项是否被选中
* text:选项的文本
* value:选项的值