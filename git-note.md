#git：分布式版本控制系统  

#####与集中式版本控制系统相比，分布式没用中央服务器，每个人电脑上都是一个完整的版本库。而集中式控制系统需要联网，需要中央服务器。此外git有强大的分支管理。  

##安装gitbash后，首先设置  

$ git config --global user.name ""  

$ git config --global user.email ""  

创建版本库：  

$ git init  

把文件添加到仓库  

$ git add 文件  

把文件提交到仓库  

$git commit -m "修改备注"  

##版本控制：  

$ git status命令可以让我们时刻掌握仓库当前的状态  

$ git diff命令可以看到具体修改了哪些内容
  
###版本回退
$ git log命令可以看版本历史记录（如果信息太多可以使用--pretty=oneline参数）   
$ git reset --hard 可以用来退回版本  

* HEAD表示当前版本
* HEAD^ HEAD^^或HEAD~n来表示回退几个版本
* 也可以使用版本号，前几位即可  
$git reflog 用来记录每一次命令，可以查看历史版本号  
###工作区和暂存区
工作区就是在电脑里的目录，工作区内有一个隐藏目录.git，不算工作区，是版本库  
版本库中存有暂存区，还有分支、以及指针HEAD
