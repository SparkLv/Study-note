# Canvas

___

## 基本用法

首先获取canvas的引用(获取元素)

```js
let canvas = document.getElementById('canvas');
```

然后，获取上下文

```js
let context = canvas.getContext('2d');
```

## 填充和描边

```js
//填充
context.fillStyle = '#eee';
context.fill();

//描边
context.strokeStyle = '#eee';
context.stroke();
```

## 绘制矩形

```js
context.strokeRect();
context.fillReact();

//参数依次为x坐标、y坐标、矩形宽度和矩形高度
context.clearReact();
```

## 绘制路径

要绘制路径首先要调用`beginPath`方法

* `arc(x,y,r,startAngle,endAngle,counterclockwise)`(最后一个参数表示是否逆时针)

* `arcTo(x1,y1,x2,y2,r)`:从上一点开始绘制一条弧线到x2，y2为止，并且以指定半径穿过x1，y1

* `bezierCurveTo(c1x,c1y,c2x,c2y,x,y)`:从上一点开始绘制一条曲线，到x、y为止，并且以(c1x,c1y)和(c2x,c2y)为控制点

* `lineTo(x,y)`:从上一点开始绘制一条直线，到x，y为止

* `moveTo(x,y)`:将绘图游标移动到(x,y)，不画线

* `quadraticCurveTo(cx,cy,x,y)`:从上一点开始绘制一条二次曲线，到x,y为止，并以cx,cy为控制点

* `rect(x,y,width,height)`:从点x,y开始绘制一个矩形，宽度和高度分别由width和height指定，这个方法绘制的是矩形路径，而不是strokeRect()和fillReact()所绘制的独立形状

## 绘制文本

* `font`:表示文本样式、大小、字体

* `textAlign`:表示文本对齐方式(start|end|left|right|center)

* `textBaseline`:表示文本的基线(top|handing|middle|alphabetic|ideographic|bottom)

* `fillText('文本',x,y)`:绘制文本

* `strokeText('文本',x,y)`:为文本描边

## 变换

* rotate(angle):围绕原点旋转图像angle弧度

* scale(scaleX,scaleY):缩放图像

* translate(x,y):将原点移动到(x,y)

* save():将当前所有设置推入栈结构

* restore():恢复上一环境

## 绘制图像

`drawImage()`方法，有三种不同的参数组合(img为img元素)

1. (img,x,y):将图像绘制到x,y

1. (img,x,y,x1,y1):将图像绘制到x,y并且大小为x1,y1

1. (img,x,y,x1,y1,x2,y2,x3,y3):源图像x坐标，源图像y坐标、源图像宽度、源图像高度、目标图像的x坐标、目标图像的y坐标、目标图像的宽度、目标图像的高度

## 阴影

* shadowColor:用CSS颜色格式表示的阴影颜色

* shadowOffsetX:形状或路径x轴方向的阴影偏移量

* shadowOffsetY:形状或路径y轴方向的阴影偏移量

* shadowBlur:模糊的像素数

## 渐变

* `createLinearGradient(x,y,x1,y1)`:起点x,y坐标，终点x1，y1坐标

* `createRadialGradient(x,y,r,x1,y1,r1)`:分别代表起点圆和终点圆

* `addColorStop(0,'#eee')`:色标位置(0-1)，css颜色值

只需把fillStyle指定为响应渐变就可以了

## 模式

`createPattern()`:接受两个参数，一个是img元素和一个表示如何重复图像的字符串(repeat,repeat-x,repeat-y,no-repeat)

第一个属性可以是video也可以是canvas

同样把fillStyle指定为模式即可

## 合成

* globalAlpha:用于指定所有绘制的透明度，默认值为0

* globalCompositionOperation:表示后绘制的图形怎样与先绘制的图形相结合

  * 具体参数略