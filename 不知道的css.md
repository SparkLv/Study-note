# 不知道的CSS

---

## 背景与边框

### 半透明边框

```css
border:10px solid rgba(255,255,255,0.3);
background:white;
```

并不会出现透明边框，只是因为，背景的延伸到了border，犹豫border是透明的，所以没有观察到，解决方法就是，改变默认值为`border-box`的`background-clip`为`padding-box`或者`content-box`

### 多重边框

1. box-shadow
    * 利用box-shadow第四个参数，让投影面积加大或减小，可以加任意层边框
    *   ```css
        box-shadow:0 0 0 10px #655,
                   0 0 0 15px deeppink,
                   0 2px 5px 15px rgba(0,0,0,.6);
        ```
    * 但是对于虚线等box-shadow无法实现
    * 另外对于悬停、点击事件，需要加上inset关键字，来绘制在元素内圈
    *   ```css
        box-shadow:inset 0 0 0 10px #655,
        ```
2. outline
    * 只可以用来设置一层边框
    *   ```css
        outline: 5px solid deeppink;
        ```
    * 可以用outline-offset来设置内边框
    *   ```css
        outline: 5px solid deeppink;
        outline-offset: -10px;
        ```
    * 但是没有border-radius贴合

### 背景定位

要想背景图片距离右下角固定宽度

1. background-position的扩展语法
    *  在偏移量前面加上关键字right和bottom，对于不支持的浏览器能够回退
    *   ```css
        background: url(xxx) bottom right #fff;
        background-position:right 20px bottom 10px;
        ```
2. background-origin
    * 默认值是padding-box，使用content-box可以使偏移量等于内边距
    *   ```css
        padding:10px 20px;
        background:url(xxx) bottom right;
        background-origin: content-box;
        ```
3. calc()
    *   ```css
        background:url(xxx);
        background-position:calc(100% - 20px) calc(100% - 10px);
        ```

### 条纹背景

1. 水平条纹
    ```css
    有渐变
    background:linear-gradient(#fb3,#58a);
    无渐变
    background:linear-gradient(#fb3 50%,#58a 50%);
    由于色标位置比它之前的色标位置都小，
    则该色标位置会被设置为它前面所有色标位置值得最大值。
    上面得代码简写为
    background:linear-gradient(#fb3 50%,#58a 0);
    ```
2. 垂直条纹
    ```css
    background:linear-gradient(to right,#fb3 50%,#58a 0);
    ```
3. 斜向条纹
    ```css
    background:linear-gradient(45deg,#fb3 25%, #58a 0, #58a 50%,
                                #fb3 0, #fb3 75%, #58a 0);)
    ```
4. 斜向条纹改进
    * 如果要更换角度，那么就不太方便，可以使用`repeating-linear-gradient()`
    * ```css
        渐变
        background:repeating-linear-gradient(45deg,#fb3,#58a 30px);
        无渐变
        background: repeating-linear-gradient(60deg,#fb3, #fb3 15px, #58a 0, #58a 30px);
      ```

### 复杂背景图案

1. 网格
    *  ```css
        background:white;
        background-image:linear-gradient(90deg,rgba(200,0,0,0.5) 50%,transparent 0),
        linear-gradient(rgba(200,0,0,0.5) 50%, transparent 0);
        background-size:30px 30px;
        //也可以用px做单位取代百分比
        //还可以吧两个背景叠加起来
        ```
2. 波点
    *   ```css
        background:#655;
        background-image:radial-gradient(tan 30%, transparent 0);
        background-size:30px 30px;
        //改进
        background:#655;
        background-image:radial-gradient(tan 30%,transparent 0),
        radial-gradient(tan 30%,transparent 0);
        bakcground-size:30px 30px;
        background-position:0 0,15px 15px;
        ```
3. 棋盘
    * 将两个三角形拼在一起
        ```css
        background: #eee;
        background-image:
        linear-gradient(45deg, #bbb 25%, transparent 0),
        linear-gradient(45deg, transparent 75%, #bbb 0),
        linear-gradient(45deg, #bbb 25%, transparent 0),
        linear-gradient(45deg, transparent 75%, #bbb 0);
        background-position: 0 0, 15px 15px,
        15px 15px, 30px 30px;
        background-size: 30px 30px;
        //改进
        background: #eee;
        background-image:
        linear-gradient(45deg,
        rgba(0,0,0,.25) 25%, transparent 0,
        transparent 75%, rgba(0,0,0,.25) 0),
        linear-gradient(45deg,
        rgba(0,0,0,.25) 25%, transparent 0,
        transparent 75%, rgba(0,0,0,.25) 0);
        background-position: 0 0, 15px 15px;
        background-size: 30px 30px;
        ```

