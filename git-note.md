# Git Note

---

## 背景知识

Git是由Linux之父Linus创建的分布式版本控制系统。  

相比集中式的控制系统，分布式不需要中央服务器，每个人本地都有一个完整的版本库。另外，git的分支管理相对集中式而言更加强大

## 准备工作

在安装完git后，需要配置name和email

```bash
# global代表全局配置，也可以对不同的仓库，使用不同的配置

git config --global user.name <Your Name>

git config --global user.email <Your Email>
```

### 工作区和版本库

#### 工作区

就是初始化git的目录。

#### 版本库

初始化git后会有一个`.git`目录。其中包含着git的版本库，而版本库又包含暂存区(`stage`)，自动创建的第一个分支`master`，以及指向master的一个指针`HEAD`。`git add` 是将文件添加到暂存区，`git commit` 是将暂存区文件一次性提交到当前分支

![areas.png](http://blogcdn.sparklv.cn/areas.png)

## 使用

### 1. 初始化git仓库

```bash
git init
```

初始化后当前目录下会有一个`.git`目录。

### 2. 改动文件提交到暂存区

```bash
git add <fileName>

# -A参数可以一次性提交所有改动文件
```

### 3. 暂存区文件提交到当前分支

```bash
git commit -m <message>
```

### 4. 查看当前状态

```bash
git status
```

### 5. 查看提交记录

```bash
git log

# 使用--pretty=oneline参数 精简log输出
```

### 6. 版本回退

#### 利用HEAD回退

```bash
git reset --hard HEAD^
```

^的数量为回退几步

#### 也可以通过commit id来回退

```bash
git reset --hard <commit id>

# id不需要全部输入，部分即可
```

#### 如果commit id找不到则可以通过reflog来处理

```bash
git reflog

# reflog记录了每一次的命令，当然也有id的记录
```

### 7. 撤销修改

#### 将还没`add`的文件恢复

```bash
git checkout -- <fileName>

# 文件会回到最近一次git commit或git add状态
```

#### 已经`add`到暂存区

```bash
git reset HEAD <fileName>
```

HEAD表示最新的版本,然后使用上述checkout方法恢复文件

#### 已经commit的可以使用上述的版本回退方法(`reset --hard`)

### 8. 远程仓库

#### 将本地仓库和远程仓库关联

```bash
git remote add origin <url>
```

#### 推送本地内容到远程

```bash
git push -u origin master
```

第一次需要带上-u参数，这样git不但会把本地master分支推送，还会把分支关联起来

#### 从远程克隆

```bash
git clone <url>
```

#### 查看远程库信息

```bash
git remote
```

加上参数 -v 可以显示更加详细的信息

#### 推送分支

```bash
git push origin <name>
```

#### 创建远程分支到本地

```bash
git checkout -b <name> origin/<name>
```

#### 与远程分支建立关联

```bash
git branch --set-upstream <name> origin/<name>
```

#### 抓取分支

```bash
git pull
```

#### 变基

```bash
git rebase
```

可以把本地未push的分叉提交历史整理成直线

### 9. 分支管理

#### 创建与合并分支:

```bash
git checkout -b dev

# 新建dev分支并切换，相当于

git branch dev
git checkout dev
```

#### 查看分支

```bash
git branch
```

#### 合并分支

```bash
git merge dev

# 合并dev分支到当前分支
```

#### 删除分支:

```bash
git branch -d <name>
```

#### 解决冲突

保留更改后使用`add`和`commit`重新提交即可

#### 查看分支合并图

```bash
git log --graph
```

#### 通常分支合并时，git会用fast forward模式，这种模式下，删除分支后会丢掉分支信息，如果不想使用这种模式，可以使用

```bash
git merge --no-ff -m <message> <name>

#会在merge时生成一个新的commit
```

### 10. 暂存功能

#### 保存当前工作现场

```bash
git stash
```

#### 查看工作现场

```bash
git stash list
```

#### 恢复工作现场

```bash
git stash apply

git stash drop

#第二行是删除stash内容

#或者

git stash pop

#包括删除stash内容
```

### 11. 标签管理

#### 新增标签

```bash

git tag v1.0

#或者

git tag v1.0 <commit id>
```

#### 查看标签

```bash
git tag
```

#### 带有说明的标签

```bash
git tag -a v1.0 -m <message> <commit id>
```

#### 查看标签详情

```bash
git show <tagName>
```

标签总是和某个commit挂钩。如果这个commit既出现在master分支，又出现在dev分支，那么在这两个分支上都可以看到这个标签

#### 删除标签

```bash
git tag -d <tagName>
```

#### 推送标签到远程

```bash
git push origin <tagName>

#或者推送所有标签

git push origin --tags
```

#### 删除远程标签

```bash
#首先删除本地的标签

git tag -d <tagName>

#然后

git push origin :refs/tags/<tagName>
```

### 12. Others

#### 设置别名

```bash
git config --global alias <alias> <command>
```