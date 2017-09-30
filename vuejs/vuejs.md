# Vue  
## Vue实例  
### 构造器  
每个Vuejs应用都是通过构造函数Vue创建一个Vue的根实例启动的  
在实例化Vue时，需要传入一个选项对象，可以包含数据，模板，挂在元素，方法，生命周期钩子等选项。  
所有Vuejs组件其实都是被扩展的Vue实例。  
### 属性与方法  
每个Vue实例都会代理其data对象里所有的属性，并且只有这些被代理的属性是响应的。但是，如果在实例创建之后添加新的属性到实例上，它不会触发视图更新。  
除了data属性，Vue实例暴露一些有用的实例属性和方法，这些属性和方法都有前缀$。
### 生命周期  
每个Vue实例在被创建之前都要经过一系列的初始化过程。在这个过程中，实例会调用一些生命周期钩子，钩子的this指向调用它的Vue实例。  
![vue-life](img/vue-life-cycle.png)
## 模板语法  
vue使用了基于HTML的模板语法，允许开发者声明式地将DOM绑定只底层Vue实例的数据，所有Vue模板都是合法的HTML。在底层实现上，vue将模板编译成虚拟DOM渲染函数。 
### 插值 
#### 文本  
数据绑定最常见的形式就是使用Mustache语法（双大括号）的文本插值，无论如何，绑定的数据对象发生改变，插值处的内容都会更新。  
##### 通过使用v-once指令，也能一次性地插值，当数据改变时，内容不会更新。  
#### 纯HTML  
Mustache会将数据解释为纯文本，而非HTML，为了真正输出HTML，可以使用v-html  
##### 动态渲染的任意HTML很容易受到XSS攻击  
#### 属性  
Mustache不能再HTML属性中使用，应使用v-bind指令  
这对布尔值的属性也有效，如果条件求值为false的话该属性会被移除  
#### 使用JavaScript表达式  
对于所有的数据绑定Vuejs都提供了完全的js表达式支持  
这些表达式会在所属Vue实例的作用域下作为js被解析，每个绑定只能包含单个表达式  
模板表达式都被放在沙河中，只能访问全局变量的一个白名单，如Math和Date，不应在模板表达式中试图访问用户定义的全局变量  
### 指令  
是带有v-前缀的特殊属性。指令属性的值的预期是单一JS表达式（除了v-for），指令的职责就是当其表达式的值改变时相应地将某些行为应用到DOM上。  
#### 参数  
一些指令能接受一个参数如v-bind:href、v-on：click  
#### 修饰符  
是以 . 指明的特殊后缀，用于指出一个指令应该以特殊方式绑定  
例如 v-on:submit.prevent=""  
### 过滤器  
可以用在两个地方：mustache插值和v-bind表达式。过滤器应该被添加在js表达式尾部，由管道符指示：  
例如{{message|capitalize}}  
也可以串联
使用filters:{}选项定义过滤函数  
过滤器函数总接受表达式的值作为第一个参数  
### 缩写  
v-bind可以缩写为:  
v-on可以缩写为@  
## 计算属性  
计算属性的函数将用作属性的getter，当其中的vm.x值发生改变时，所有依赖于计算属性的绑定也会更新。  
与methods相比，computed只有当vm.x值发生改变时才会重新执行，methods会在每次重新渲染时执行，可以算作缓存。  
与watch相比也更加灵活，watch过于命令式和重复  
computed除了有getter，还可以提供一个setter  
### watch  
可以用来反应数据变化  
## Class与Style绑定  
### 绑定HTML CLASS  
#### 对象语法  
v-bind:class="{o:v,o2:v2}"也可以直接绑定一个对象，也可以返回对象的计算属性  
#### 数组语法  
v-bind:class="[a,b]"(ab需要在data里定义)  
也可以根据条件切换  
v-bind:class="[a?b:c]"(也可以在数组中使用对象语法来切换)  
### 绑定内联样式  
#### 对象语法  
其实就是一个css对象  
v-bind:style="{}"属性名可以是驼峰式也可以是配合引号的短横分割命名  
或者可以直接绑定一个对象  
同样常常结合返回对象的计算计算属性来使用  
#### 数组语法  
可以将多个对象绑定到一个元素上  
## 条件渲染
### v-if  
判断是否渲染元素，当表达式为真的时候渲染  
如果想切换多个元素可以在template元素上使用，最终渲染结果不会包含\<template>  
v-else和v-else-if需要紧跟在v-if和v-else-if后面  
如有相同元素vue不会再重新渲染，如输入框，这样在切换时会造成数据重复，可以使用key属性来分隔开  
### v-show  
与v-if功能类似，但只是简单的切换css的display属性,不支持template元素，也不支持v-else  
与v-if不同，v-show在页面渲染时就会被渲染，而v-if是惰性的只有为真才被渲染，但是它的切换是彻底的，事件监听器和子组件会被销毁重建  
##### v-for比v-if有更高的优先级  
## 列表渲染  
用v-for指令根据一组数组的选项列表进行渲染。需要以item in items形式的特殊语法  
在v-for块中，拥有对父级作用域属性的完全访问权限。还支持一个可选的第二参数作为当前项的索引  
##### 也可以使用 of 代替 in 作为分隔符  
v-for也可以使用template标签来渲染多个元素块  
###  v-for也可以用来迭代属性  
* 第一个参数为属性值 
* 第二个参数为键名（可选）  
* 第三个参数为索引（可选）  

v-for也可以取整数，进行整数迭代，例如 n in 10  
##### 在自定义组件中，可以像普通元素一样使用v-for,且key是必须的,向组件中注入v-for的数据可以使用v-bind传入  
###  数组更新  
#### 变异方法将会触发试图更新
* push()  
* pop()  
* shift()  
* unshift()  
* splice()  
* sort()  
* reverse()  
使用非变异方法，总是返回一个新数组，使用新数组替换旧数组，Vue会使用智能启发式方法来最大化DOM元素重用  
##### 当直接设置数组的一个项和修改数组长度时，不会触发视图更新  
##### 对于前一种的解决方法  
1. Vue.set(arr,index,value)  
2. x.splice(index,1,value)  
##### 使用splice  
1. x.splice(length)  
## 事件处理器  
### 监听事件  
可以用v-on指令监听DOM事件来触发一些js代码  
### 方法事件处理器  
可以使用v-on接收一个定义的方法来调用  
##### 可以使用特殊变量$event把事件对象传入  
### 事件修饰符  
* stop
* prevent  
* capture（事件捕获）  
* self  
* once（点击事件只会触发一次） 
###  键值修饰符  
v-on:keyup.键值  
滑鼠键值修饰符  
* .left
* .right
* .middle
## 表单控件绑定  
### 基本用法  
可以使用v-model指令在表单控件元素上创建双向数据绑定，它会根据控件类型自动选取正确的方法来更新元素  
##### 在文本域插值并不会生效,应用v-model来代替  
#### 复选框  
单个勾选框，为true和false
多个单选框为绑定到同一个数组,内容为value值  
#### 单选按钮  
多个按钮绑定到一个值，根据value判断值  
#### 选择列表  
绑定到select上，当没有value则为text值，有value则为value 
###修饰符  
* .lazy：在change事件中同步而不是input事件(回车)  
* .number：将输入值转换为number类型  
* .trim：自动过滤用户输入的首尾空格  
## 组件  
### 注册  
#### 全局组件  
使用Vue.component(tagName,options)注册  
#### 局部注册  
通过使用组件实例选项注册，可以使组件仅在另一个实例/组件的作用域中可用,例如  

    var child={template:'<div>aaa</div>'}
    new Vue({
        components:{
            'my-component':child
        }
    })  
##### 当使用DOM作为模板时，会受到HTML的一些限制，例如\<ul> \<table>等,可以使用\<tr is="my-com">\</tr>来解决  
##### data必须是以函数的形式，因为这样可以让每个组件有自己独立的变量  
### 父子组件传递数据  
#### props down  
在子组件中使用props:['']，获取父组件上的属性值  
##### 动态prop可以使用v-bind(:)来绑定,例如数字不用v-bind绑定的话，获取的是一个字符串。不应该在子组件内部改变prop，如果这样做了，Vue会发出警告
##### 可以对prop进行验证，如果传入的数据不符合规格，Vue会发出警告，这时props不应该是个数组，而应该是一个对象，value是类型  
#### event up  
子组件与父组件的通信是通过自定义事件来实现，可以使用this.$emit()触发事件  
### Slot分发内容  
##### 子组件的模板内容应在子组件的作用域内编译  
除非子组件模板包含至少一个\<slot>插口，否则父组件内容将会被丢弃，当子组件模板只有一个没有属性的slot时，父组件整个内容片段将插入到slot所在的dom位置，并替换掉slot标签本身  
#### 具名slot  
\<slot>元素可以用一个特殊的属性name来配置如何分发内容，例如  

    <h1 slot="xx">
    <slot name="xx">  

仍然可以有一个匿名slot，是默认slot，作为找不到匹配内容片段的备用插槽  
#### 作用域插槽  

    <div class="child">
        <slot text="xxx"></slot>
    </div>
    <div class="parent">
        <child>
            <template scope="props">
                <span>hhhh</span>
                <span>{{props.text}}</span>
            </template>
        </child>
    </div>
#### 动态组件  
通过使用保留的<component>元素，动态绑定到is特性，使得多个组件可以使用同一个挂载点，并动态切换  
##### 如果把切换出去的组件保留在内存中，可以保留它的状态或避免重新渲染，可以添加一个<keep-alive>标签
#### 异步组件  
Vue.component的第二个参数是一个函数  

    function(resolve,reject){
        resolve({
            template:''
        })
        reject('')
    }
    resolve为获取成功回调，reject为失败指示  

#### X-Templates  
一种指定模板的方式是在javascript标签中使用text/x-template类型，并指定一个id  
    
    <script type="text/template" id="xxx">
    <p></p>
    </script>
    Vue.component('zz',{
        template:'#xxx'
    })  
##### 当组件中包含大量静态内容时，可以考虑使用v-once将渲染结果缓存起来  
### 响应式原理  
把一个js对象传给Vue实例的data选项，Vue将遍历此对象所有的属性，并使用Object.defineProperty，把这些属性全部转为getter/setter  
### 变化检测  
受现代js的限制，vue不能检测到对象属性的添加或删除，所以属性必须在data对象上存在才能让Vue转换它，这样才能让它是响应的,可以使用Vue.set(obj,key,value)方法将响应属性添加到嵌套的对象上，vm.$set实例方法是它的别名
另一种方法是使用this.x = Object.assign({},this.x,{a:1.b:2})
### 异步更新队列  
Vue异步执行DOM更新，只要观察到数据变化，Vue将开启一个队列，并缓冲在同一事件循环中发生的所有数据改变。
使用Vue.nextTick(callback),回调函数会在DOM更新完成后就会调用  
在组件内可以使用this.$nextTick()  
### 过渡效果  
#### 单元素/组件的过渡  
在一下情况下可以给任何元素和组件添加entering/leaving过渡  
* v-if  
* v-show  
* 动态组件  
* 组件根节点  
使用transition封装组件,添加name属性  
#### 过渡的CSS类名  
* v-enter：定义进入过渡的开始状态。在元素被插入时生效  
* v-enter-active：定义过渡的状态。在元素整个过渡过程中作用，在元素被插入时生效，在transition/animation完成后移除。这个类可以被用来定义过渡的过程时间，延迟和曲线函数  
* v-enter-to：定义进入过渡的结束状态。在元素被插入一帧后生效，在transition/animation完成后移除  
* v-leave：定义离开过渡的开始状态。在离开过渡触发时生效，在下一帧移除  
* v-leave-active：定义过渡的状态。
* v-leave-to：定义离开过渡的结束的过渡状态。在离开过渡被触发一帧后生效
##### 可以使用name来替换v 

    .x-enter-active, .x-leave-active{
        transition:opacity .5s
    }
    .x-enter, .x-leave-to{
        opacity:0
    }
#### CSS动画  
css动画同css过渡，区别是在动画中v-enter类名在节点插入DOM后不会立即删除，而是在animationed事件触发时删除  

    .x-enter-active{
        animation:yy .5s
    }
    .x-leave-active{
        animation:yy .5s
    }
    @keyframes yy{
        0%{

        }
        50%{

        }
        100{

        }
    }  

可以使用  
* enter-class
* enter-active-class
* enter-to-class
* leave-class
* leave-active-class
* leave-to-class  
来自定义过渡类名,他们的优先级高于普通的类名，可以与Animate.css结合使用  
#### 显性的过渡效果持续时间  
可以在transition上使用:duration来设置显性过渡效果持续时间  

    例如  
    <transition :duration="1000"></transition>
    <transition :duration="{enter:500,leave:800}"><transition>
    定制的是进入和移出的持续时间  
#### js钩子  
transition的事件  
* before-enter
* enter
* after-enter
* enter-cancelled
* before-leave
* leave
* after-leave
* leave-cancelled
##### 当只用js过渡的时候，在enter和leave中,回调函数done是必须的。否则，他们会被同步调用，过渡会立即完成。并且尽量使用v-bind:css="false"，Vue会跳过CSS的检测，可以避免过渡过程中CSS的影响  
#### 多个元素的过渡  
当有相同标签名的元素切换时，需要通过key特性设置唯一的值来标记让Vue区分  
#### 过渡模式  
* in-out 新元素先进行过渡，完成之后当前元素过渡离开
* out-in 当前元素先进行过渡，完成之后新元素进入  

例如  

    <transition name="xx" mode="out-in">

#### 列表过渡  
\<transition-group>默认渲染一个span标签，要改变的话可以使用tag属性  
## Vue-router 2
安装  
    
    npm install vue-router
    import Vue from 'vue'
    import VueRouter from 'vue-router'
    Vue.use(VueRouter)
##### 如果使用全局的script标签，则无需如此  
使用

    <router-view></router-view>
    <router-link to="/x">x</router-link>
    <router-link to="/y">x</router-link>
    const routers = [
        {path:'/x',component:x},
        {path:'/y',component:y}
    ]
    const router = new VueRouter({
        routers
    })
    var vm = new Vue({
        router
    })  
嵌套路由  

    routers:[
        {
            path:'/user/x',
            compoent:x,
            children:[
                {path:'/z',component:z}
            ]
        }
    ]
命名视图  
在界面中可以使用多个router-view

    <router-view></router-view>
    <router-view name="a"></router-view>
    <router-view name="b"></router-view>
    const router =new VueRouter({
        routers:[
            {
                path:'/x',
                components:{
                    default:x,
                    a:y,
                    b:z,
                }
            }
        ]
    })
命名路由  
使用一个name属性，使用的时候是一个{name:''}
重定向  
可以添加一个redirect属性
## Vuex  
Vuex是专为Vue.js应用程序开发的状态管理模式。采用集中存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。  
这个状态自管理应用包含以下几个部分：  
* state，驱动应用数据源
* view，以声明方式将state映射到视图
* actions，响应在view上的用户输入导致的状态变化  

vue可以利用vuejs的细粒度数据相应机制来进行高效的状态更新  
![vuex](img/vuex.png)
### 安装
    npm install vuex --save  
使用  

    import Vue from 'vue'  
    import Vuex from 'vuex'
    Vue.use(Vuex)  
### 核心概念  
#### State  
Vuex使用单一状态树，用一个对象就包含了全部的应用层级状态  
由于Vuex的状态储存是响应式的，从store实例中读取状态最简单的方法就是在计算属性中返回某个状态  

    computed:{
        count(){
            return this.$store.state.count
        }
    }  
#### Getter  
可以从store中的state中派生出一些状态  
就像计算属性一样，getter的返回值会根据它的依赖被缓存起来，只有当它的依赖值发生改变才会被重新计算
接受state作为其第一个参数，其他getter作为第二个参数 

    this.$store.getters.xx  
#### Mutation  
更改Vuex中state的唯一方法是mutation，每个mutation都包含一个type和回调函数，而且可以接受第二个参数作为载荷（多个值可以把第二个参数写成对象）  

    this.$store.commit('type',{});  
    mutations:{
        m1(state,play){

        }
    }
在对象上添加新属性应使用Vue.set(obj,'pro','val');  

mutation必须是同步函数  
#### Action  
* 提交的是mutation，而不是直接变更状态
* 可以包含任意异步操作  

        actions:{
            in(context){
                context.commit('x')
            }
        }
        也可以使用
        in({commit}){
            commit('x')
        }
        使用
        this.dipatch('in',canshu)







