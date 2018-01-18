# webpack 2.0

---
## 安装

```node
npm install --save-dev webpack
```

webpack.config.js

```javascript
const path = require('path')

module.exports = {
    entry:'./src/index.js',
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'dist')
    }
}
```

package.json

```javascript
"scripts":{
    "build":"webpack"
}
```

## 核心概念

### entry

入口起点告诉webpack从哪里开始，并根据依赖关系图确定需要打包的内容，可以将应用程序的入口起点认为是根上下文或app第一个启动文件

* 单个入口语法

```javascript
entry:'./path/to/file.js'
```

* 对象语法

```javascript
entry:{
    app:'./src/app.js',
    vendors:'./src/vendors.js'
}
```

* 多页面应用程序

```javascript
new htmlWebpackPlugin({
    filename:"index.html",
    template:__dirname+"/index.html",
    inject:"head",
    title:'webpack is awesome',
    chunks:['main']
})
利用chunks分配不同js到不同html
```

### output

将所有资源归拢在一起后，要告诉webpack在哪里打包应用程序。即使可以存在多个入口起点，但是只指定一个输出配置

* filename 用于输出文件的文件名
* path  目标输出目录的绝对路径

如果配置创建了多个单独的chunk，则应该使用占位符来确保每个文件具有唯一的名字。
占位符可以是[name] [chunkhash] [hash]
使用publicPath可以指定http路径

### loader

webpack把每个文件都作为模块处理，webpack自身只理解javascript

loader可以将文件从不同的语言转换为javascript(为此，首先安装相对应的loader)

#### 使用loader有三种使用方式

* 配置：在webpack.config.js文件中指定loader。

```javascript
module: {
    rules: [
        {
        test: /\.css$/,
        use: [
            { loader: 'style-loader' },
            {
            loader: 'css-loader',
            options: {
            modules: true
                }
            }
        ]
    }
]
}
```

* 内联：可以在import语句或任何等效于import的方式中指定loader。使用！将资源中的loader分开
* CLI：例如

webpack --module-bind jade-loader --module-bind 'css=style-loader!css-loader'

### 对于使用file-loader时，加载图片，在打包编译之后，index.html中img的src地址并没有替换的情况

```html
使用以下写法
<img src="${require('./assets/erha.jpg')}">
```

### plugins

plugins常用于在打包模块的compilation和chunk生命周期执行操作和自定义功能

#### 模块热替换

```javascript
npm install webpack-dev-server --save-dev
webpack.config.js

const webpack = require('webpack')  
devServer:{
    contentBase:__dirname+'/dist',
    hot:true
}
plugins:[
    new webpack.HotModuleReplacementPlugin()
]

package.json

script:{
    "dev":"webpack-dev-server --open"
}
```

#### 精简输出

```node
npm install --save uglifyjs-webpack-plugin
```

webpack.config.js
```javascript
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

plugins:[
    new UglifyJsPlugin()
]
```

## 生产环境构建

### 使用webpack-merge提取出共同的配置

```node
npm install --save webpack-merge
```

webpack.prod.js

```javascript
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.export = merge(common,{
    plugins:[
        new UglifyJSPlugin()
    ]
})
```

webpack.dev.js

```javascript
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.export = merge(common,{
    devtool:'inline-source-map',
    devServer:{
        contentBase:'./dist',
        hot:'true'
    }
})
```

package.json

```json
"start":"webpack-dev-server --open --config webpack.dev.js"
"build":"webpack --config webpack.prod.js"
```

### 指定环境

```javascript
plugins:[
    new webpack.DefinePlugin({
        'process.env.NODE_ENV':JSON.stringify('production')//可以自定义变量
    })
]
```

## 代码分离

### 入口起点

#### 可以设置多个入口起点

* 但是如果入口chunks之间包含重复的模块，哪些重复的模块都会被引入到各个bundle中

### 防止重复

CommonsChunkPlugin插件可以将公共的依赖模块提取到已有入口chunk中，或者提取到一个新生成的chunk

webpack.config.js

```javascript
new webpack.optimize.CommonsChunkPlugin({
    name:'common'
})
```

### 动态导入

webpack.config.js

```javascript
output:{
    chunkFilename:'[name].bundle.js'
}
```

index.js

```javascript
import(/*webapckChunkName: "lodash"*/'lodash').then(_=>{
}).catch(error=>console.log(error))
```

## 缓存

### 输出文件的文件名

在output.filename进行文件名替换，可以使用hash，但是更好的方式是chunkhash，即只有文件改变后，文件名才改变。

例如
```js
output:{
    filename:[name].[chunkhash].js
}
```

需要注意的是，在使用chunkhash的时候，不能使用热替换插件，用于生产环境较为合理
### 提取模板

对于一些插件，框架等可以提取出来，这样就可以缓存在浏览器中，不需要每次都向服务器请求

使用的是CommonsChunkPlugin

例如
```js
entry:{
    plugin:['react','vue']
},
plugins:[
    new CommonsChunkPlugin({
        name: plugin
    })
]
```

### 模块标识符

在添加或者删除一个文件后，所有chunk的name会发生改变，这是因为解析顺序的改变会导致module.id的改变。如果重新缓存提取的公用模块，会很不理想，可以使用两种插件来优化，一个是NameModuesPlugin，将使用模块的路径，而不是数字标识符，但是执行时间会长。另一个是HashedModuleIdsPlugin，推荐用于生产环境