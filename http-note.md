#HTTP-note
##URL
*URI*（Uniform Resource Identifier，统一资源标识符）是一类更通用的资源标识符，有两个主要的子集*URL*（Uniform Resource Locator，统一资源定位符）和*URN*（Uniform Resource Name，统一资源名称）构成，URL是通过描述资源的位置来标识资源的，而URN则是通过名字来识别资源的。  

*URL*的组成分为 方案：//服务器位置/路径  
###组成
大多数*URL*方案的URL语法都建立在由9部分构成的通用格式上：  
\<scheme\>://\<user\>:\<password\>@\<host\>:\<port\>/\<path\>;\<params\>?\<query\>#\<frag\>
####scheme
必须以一个字母符号开始，由第一个：符号来将其与URL的其余部分分隔开来，是大小写无关的，例如http://
####host port
提供主机ip地址和主机上的端口号  
####user password
如果使用的url方案要求输入用户名和密码，但是url没有，则浏览器会提供一个默认的用户名密码 如anonymous
####path
说明了资源位于服务器的什么地方
####params
由字符;将其与URL的其余部分分隔开来，为应用程序提供了访问资源所需的所有附加信息，参数名和值是键值对由等号分隔，参数间又;分隔
####query
查询字符串，由？与其他部分分隔，同样为名值对，名值间用&分隔
####frag
片段组件，用来表示资源的内部片段，例如：可以指向HTML文档中一个特定的图片或者小节  
使用过#与其他部分分隔（服务器处理的是整个对象，url片段仅由客户端使用）  

###URL快捷方式
基础url作为相对url的参考点使用的，可以来源于以下几个地方  

1. 在资源中显示提供，如html中的<base>  

2. 封装资源的基础URL  

3. 没有基础URL，可能只是一个不完整或损坏了的URL  

![http-url](img/http-url.png)  

##HTTP报文
###报文流
HTTP使用术语流入（inbound）和流出（outbound），来描述事务处理的方向，流入指报文流入到源服务器  
###报文向下游流动
所有报文都是向下游流动，所有报文的发送者都在接收者的上游。
###报文的组成部分
每条报文都包含一条来自客户端的请求，或者一条来自服务器的响应。  
都由三个部分组成：对报文进行描述的起始行（start line）、包含属性的首部（header）块、可选的包含数据的主体（body）部分  
  
* 起始行和首部就是由行分隔的ASCII文本，每行都以一个由两个字符组成的终止序列作为结束，其中包含一个回车符和一个换行符，这个终止序列可以写作CRLF
* 报文的主体是一个可选的数据块，主体可以包含文本或二进制数据，也可以为空  
###报文语法  
HTTP报文都可以分为两类：请求报文和响应报文  
  
请求报文格式  

    <method> <request-url> <version>
	<headers>
	<entity-body>  
  
响应报文格式  

	<version><status><reason-phrase>
	<header>
	<entity-body>  

* method  
  客户端希望服务器对资源执行的动作
  ![http-method](img/http-method.png)
  Head：可以用来在不获取资源的情况下了解资源的情况，如判断类型，查看状态码以确定资源是否存在，查看首部测试资源是否被修改  
  PUT：方法的语义就是让服务器用请求的主体部分来创建一个由所请求的URL命名的新文档，若已存在则替代  
  OPTIONS：为请求web服务器告知其支持的各种功能，支持的方法  
  DELETE：请服务器删除请求URL所指定的资源
* request-url
  命名了所请求资源，或者URL路径组件的完整URL
* version
  报文所以使用的HTTP版本。如HTTP/\<major\>.\<minor\>
* status-code
  三位数字描述请求过程中所发生的情况
  ![htto-status](img/http-status.png)
  ![htto-status(1)](img/http-status(1).png)
* reason-phrase
  status-code的可读版本
* header 
  可以有0个或多个首部，每个首部都包含一个名字，后面跟一个冒号，然后是一个可选的空格，接着是一个值，最后是一个CRLF
* entity-body
  包含一个由任意数据组成的数据块
####首部
分为
