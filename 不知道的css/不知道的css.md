# 不知道的 CSS

---

## 背景与边框

### 半透明边框

```css
border: 10px solid rgba(255, 255, 255, 0.3);
background: white;
```

并不会出现透明边框，只是因为，背景的延伸到了 border，犹豫 border 是透明的，所以没有观察到，解决方法就是，改变默认值为`border-box`的`background-clip`为`padding-box`或者`content-box`

### 多重边框

1.  box-shadow
    * 利用 box-shadow 第四个参数，让投影面积加大或减小，可以加任意层边框
    * ```css
      box-shadow: 0 0 0 10px #655, 0 0 0 15px deeppink,
        0 2px 5px 15px rgba(0, 0, 0, 0.6);
      ```
    * 但是对于虚线等 box-shadow 无法实现
    * 另外对于悬停、点击事件，需要加上 inset 关键字，来绘制在元素内圈
    * ```css
      box-shadow: inset 0 0 0 10px #655;
      ```
2.  outline
    * 只可以用来设置一层边框
    * ```css
      outline: 5px solid deeppink;
      ```
    * 可以用 outline-offset 来设置内边框
    * ```css
      outline: 5px solid deeppink;
      outline-offset: -10px;
      ```
    * 但是没有 border-radius 贴合

### 背景定位

要想背景图片距离右下角固定宽度

* background-position 的扩展语法
  * 在偏移量前面加上关键字 right 和 bottom，对于不支持的浏览器能够回退
  * ```css
    background: url(xxx) bottom right #fff;
    background-position: right 20px bottom 10px;
    ```
* background-origin
  * 默认值是 padding-box，使用 content-box 可以使偏移量等于内边距
  * ```css
    padding: 10px 20px;
    background: url(xxx) bottom right;
    background-origin: content-box;
    ```
* calc()
  * ```css
    background: url(xxx);
    background-position: calc(100% - 20px) calc(100% - 10px);
    ```

### 条纹背景

1.  水平条纹
    ```css
    有渐变background: linear-gradient(#fb3, #58a);
    无渐变background: linear-gradient(#fb3 50%, #58a 50%);
    由于色标位置比它之前的色标位置都小，则该色标位置会被设置为它前面所有色标位置值得最大值。
    上面得代码简写为
    background: linear-gradient(#fb3 50%, #58a 0);
    ```
2.  垂直条纹
    ```css
    background: linear-gradient(to right, #fb3 50%, #58a 0);
    ```
3.  斜向条纹
    ```css
    background:linear-gradient(45deg,#fb3 25%, #58a 0, #58a 50%,
                                #fb3 0, #fb3 75%, #58a 0);)
    ```
4.  斜向条纹改进
    * 如果要更换角度，那么就不太方便，可以使用`repeating-linear-gradient()`
    * ```css
      渐变background: repeating-linear-gradient(45deg, #fb3, #58a 30px);
      无渐变background: repeating-linear-gradient(
        60deg,
        #fb3,
        #fb3 15px,
        #58a 0,
        #58a 30px
      );
      ```

### 复杂背景图案

1.  网格
    * ```css
      background: white;
      background-image: linear-gradient(
          90deg,
          rgba(200, 0, 0, 0.5) 50%,
          transparent 0
        ), linear-gradient(rgba(200, 0, 0, 0.5) 50%, transparent 0);
      background-size: 30px 30px;
      //也可以用px做单位取代百分比
      //还可以吧两个背景叠加起来
      ```
2.  波点
    * ```css
      background: #655;
      background-image: radial-gradient(tan 30%, transparent 0);
      background-size: 30px 30px;
      //改进
      background: #655;
      background-image: radial-gradient(tan 30%, transparent 0), radial-gradient(tan
            30%, transparent 0);
      bakcground-size: 30px 30px;
      background-position: 0 0, 15px 15px;
      ```
3.  棋盘
    * 将两个三角形拼在一起
      ```css
      background: #eee;
      background-image: linear-gradient(45deg, #bbb 25%, transparent 0),
        linear-gradient(45deg, transparent 75%, #bbb 0), linear-gradient(
          45deg,
          #bbb 25%,
          transparent 0
        ), linear-gradient(45deg, transparent 75%, #bbb 0);
      background-position: 0 0, 15px 15px, 15px 15px, 30px 30px;
      background-size: 30px 30px;
      //改进
      background: #eee;
      background-image: linear-gradient(
          45deg,
          rgba(0, 0, 0, 0.25) 25%,
          transparent 0,
          transparent 75%,
          rgba(0, 0, 0, 0.25) 0
        ), linear-gradient(45deg, rgba(0, 0, 0, 0.25) 25%, transparent 0, transparent
            75%, rgba(0, 0, 0, 0.25) 0);
      background-position: 0 0, 15px 15px;
      background-size: 30px 30px;
      ```

### 伪随机背景

例子：

```css
width: 800px;
height: 300px;
margin: 50px;
background: #eee;
background-image: linear-gradient(90deg, skyblue 10px, transparent 0),
  linear-gradient(90deg, yellow 20px, transparent 0), linear-gradient(
    90deg,
    lightgreen 20px,
    transparent 0
  ), linear-gradient(90deg, gray 20px, transparent 0);
background-size: 91px 100%, 71px 100%, 51px 100%, 31px 100%;
```

### 连续的图像边框

主要的思路就是在背景图片之上，再叠加一层纯白的实色背景。为了让下层的图片背景透过边框区域显示出来，我们需要给两层背景指定不同的 background-clip 值。最后一个要点在于，我们只能在多重背景的最底层设置背景色，因此需要用一道从白色过渡到白色的 CSS 渐变来模拟出纯白实色背景的效果。

直接上代码

```css
width: 300px;
height: 100px;
margin: 50px;
word-wrap: break-word;
background-image: linear-gradient(white, white), url("./fish.jpg");
padding: 10px;
border: 20px solid transparent;
background-size: cover;
background-clip: padding-box, border-box;
background-origin: border-box;
```

信封样式

```css
width: 800px;
height: 300px;
margin: 50px;
padding: 40px;
border: 40px solid transparent;
background: linear-gradient(white, white), repeating-linear-gradient(-45deg, red
      0, red 10px, transparent 0, transparent 20px, #58a 0, #58a 30px, transparent
      0, transparent 40px);
background-clip: padding-box, border-box;
background-origin: border-box;
```

蚂蚁行军

```css
@keyframes ants {
  to {
    background-position: 100% 100%;
  }
}

.marching-ants {
  width: 300px;
  height: 100px;
  margin: 50px;
  padding: 1em;
  border: 1px solid transparent;
  background: linear-gradient(white, white) padding-box, repeating-linear-gradient(
        -45deg,
        black 0,
        black 25%,
        white 0,
        white 50%
      ) 0 / 1em 1em;
  animation: ants 12s linear infinite;
}
```

## 形状

### 自适应的椭圆

利用 border-radius 来实现

椭圆

```CSS
border-radius:50%/50%;
//前者为水平半径、后者为垂直半径
```

半椭圆

border-radius 可以设置 4 组不同的值

例如

```css
border-radius: 50% /100% 100% 0 0;
```

四分之一椭圆

```css
border-radius: 100% 0 0 0/100% 0 0 0;
//或
border-radius: 100% 0 0 0;
```

### 平行四边形

```css
.box {
  width: 300px;
  height: 200px;
  margin: 100px;
  position: relative;
  line-height: 200px;
  text-align: center;
}

.box:after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #e81;
  z-index: -1;
  transform: skew(30deg);
}
```

重点在于边缘变成平行四边形，而文字不能变

### 菱形图片

```css
.box {
  width: 300px;
  height: 300px;
  margin: 50px;
  transform: rotate(45deg);
  overflow: hidden;
}

.box img {
  width: 300px;
  height: 300px;
  transform: rotate(-45deg) scale(1.42);
}
//1.42为根号2，即对角线
```

### 切角效果

```css
background: #e8e8e8;
background: linear-gradient(45deg, transparent 15px, #e8e8e8 0) left, linear-gradient(
      -45deg,
      transparent 15px,
      #e8e8e8 0
    ) right;
background-size: 50% 100%;
background-repeat: no-repeat;
```

### 饼图

```css
.box {
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: linear-gradient(90deg, red 50%, green 0);
}

@keyframes pierun {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(180deg);
  }
}
box::before {
  content: "";
  display: block;
  margin-left: 50%;
  height: 100%;
  border-radius: 0 100% 100% 0 / 0 50% 50% 0;
  background: green;
  transform-origin: left;
  animation: pierun 5s infinite;
  animation-direction: alternate;
}
```

## 视觉效果

### 单侧投影

使用 box-shadow 第四个长度参数，即扩张半径，会根据指定的值去扩大或者缩小投影的尺寸。

```css
.box {
  height: 500px;
  background: #58a;
  box-shadow: 2px 4px 6px -2px #000;
}
```

### 双侧投影

方法是使用单侧投影两次，box-shadow 用逗号分隔

```css
.box19 {
  height: 500px;
  background: #58a;
  box-shadow: 5px 0 5px -3px #000, -5px 0 5px -3px #000;
}
```

### 不规则投影

可以使用 filter 的 drop-shadow 来设置投影，但是文字同样会被加上投影

### 染色效果

对图片的染色使用 filter 属性

```css
.box img{
    transition: .5s filter;
    filter: sepia(1) saturate(2) hue-rotate(100deg);
}
.box img:hover{
    filter:none;
}

sepia:会给图片增加一种降饱和度的橙黄色染色效果
saturate:可以给每个像素提升饱和度
hue-rotate:把每个像素的色相以指定的度数进行偏移
```

### 毛玻璃

结合伪元素和 blur 来实现

```css
.box {
  height: 300px;
  overflow: hidden;
  background: url("./tiger.jpg") 0 / cover scroll;
}

.box .text {
  width: 400px;
  height: 200px;
  margin-left: 50px;
  margin-top: 50px;
  position: relative;
  z-index: 1;
  text-align: center;
  line-height: 200px;
  overflow: hidden;
  /*边框模糊隐藏*/
}

.box .text::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(225, 225, 225, 0.5);
  z-index: -1;
  filter: blur(20px);
  margin: -30px;
  /*margin是为了扩大宽度，减少边角模糊的影响*/
}
```

### 折角效果

用两段线性渐变来解决

```css
.box {
  width: 300px;
  height: 200px;
  margin: 50px;
  background: linear-gradient(-135deg, transparent 50%, rgba(0, 0, 0, 0.4) 0) no-repeat
      100% 0/50px 50px, linear-gradient(45deg, #58a 90%, transparent 0);
}
```
