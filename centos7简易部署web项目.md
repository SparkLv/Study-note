# CentOs7简易部署web项目

---

## 最近在腾讯云买了一个5年的服务器用来搭建个人的博客。以前都是用虚拟空间、建站主机来弄，非常简单，而这次是基于linux的centos7来开始的，还是要记录下来的。

### nginx

在nginx和apache上纠结了一下，作为个人博客这种静态项目来说，使用nginx更加符合前端的需求。

1. 添加Nginx到YUM源
添加CentOS 7 Nginx yum资源库,打开终端,使用以下命令:

```
sudo rpm -Uvh http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm
```

2. 安装Nginx
在你的CentOS 7 服务器中使用yum命令从Nginx源服务器中获取来安装Nginx：

```
sudo yum install -y nginx
```
Nginx将完成安装在你的CentOS 7 服务器中。

3. 启动Nginx

刚安装的Nginx不会自行启动。运行Nginx:

```
sudo systemctl start nginx.service
```

如果一切进展顺利的话，现在你可以通过你的域名或IP来访问你的Web页面来预览一下Nginx的默认页面；

4. CentOS 7 开机启动nginx

```
sudo systemctl enable nginx.service
```

nginx配置信息

```
网站文件存放默认目录

/usr/share/nginx/html
网站默认站点配置

/etc/nginx/nginx.conf
自定义Nginx站点配置文件存放目录

/etc/nginx/conf.d/
Nginx全局配置
```

操作

```
启动
systemctl start nginx
停止
systemctl stop nginx
重启
systemctl restart nginx
```

另外

修改web默认地址

```
更改nginx root参数

更改之后可能显示403，这是权限不足的情况

chmod -R 755 /usr/share/nginx/html(新的web地址)
```

配置子域名

目前我的解决方法是在nginx配置文件里再写个sever对象
```js
server {
    server_name //子域名地址
    root //子域名默认目录
    include://其他配置
}
```

### FTP

1. 安装vsftpd

```
yum check-update
yum -y install vsftpd
```

2. 配置参数

```
vi /etc/vsftpd/vsftpd.conf
```

修改为如下参数

```
anonymous_enable=NO
chroot_local_user=YES
allow_writeable_chroot=YES
pasv_enable=YES
pasv_min_port=40000
pasv_max_port=40100
```

3. 重启ftp

```
systemctl restart vsftpd.service

systemctl enable vsftpd.service
```

4. 修改防火墙配置

```
firewall-cmd --permanent --add-service=ftp
firewall-cmd --reload
setsebool -P ftp_home_dir on
```

5. 为ftp创建一个用户test1（指定目录为/home/www，不允许远程登录shell）

```
useradd -d /home/www -m test1 -s /sbin/nologin
cd /home/www
chmod -R 777 *
```

6. 为ftp用户设置一个密码

```
passwd test1
```