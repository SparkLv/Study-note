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
