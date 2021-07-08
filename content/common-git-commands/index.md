---

path: blog/common-git-commands
title: Git 指令整理
tags: [git]
cover:
date: 2020-11-01
excerpt: 整理一些常用的 Git 指令

---

## Basic Commands

### `git init`

初始化當前目錄為 Repository (加入 .git 隱藏檔)。
> `--bare` 建立時不會有 .git 檔。

### `git status`

顯示 Repository 狀態 (是否有被追蹤 / 追蹤項目的狀態)。

### `git log`

顯示當前目錄底下所有 commit 紀錄。

### `git log '檔案路徑'`

只顯示該檔案的 commit 紀錄。
> `-p` 可以看到 diff。

### `git add '檔案路徑'`

將檔案從 Working Directory 加入 Staging Area，成為追蹤項目。
> `-A == --all == .` 可以一次加入所有檔案。

### `git commit -m + "commit message"`

將 Staging Area 內的所有檔案加入 Repository。
> message 為字串，須加上""。

### `git reflog`

顯示 .git/HEAD 的紀錄。

### `git cat-file -p 'commit SHA1'`

可以查看該 commit SHA1 指向的 object 內容。
> commit SHA1 (Secure Hash Algorithm 1) 安全雜湊演算法，是一種加密演算法，SHA1 的雜湊值長度為 160bit。

## config

### `git config --global --list`

查看 git global 設定。
> `--list == -l`

### `git config --global user.email(or name) '新值'`

修改 user name / email。
> `--global` 會使用預設的 name / email，若不加 `--global` 則只針對當下 Repository 做設定。

## reset

### `git reset 'commmit SHA1'`

回到該 commit 點的狀態。

### `git reset '檔案路徑'`

只針對該檔案做還原。

### `git reset HEAD^`

回到 .git/HEAD 所指的前一個 commit 點的狀態。

### `git reset HEAD~3`

回到 .git/HEAD 所指的前三個 commit 點的狀態。

> `--mixed`
> 預設參數，會將 commit 拆出來的檔案從 Staging Area 中移除掉，回到 unstaged 的狀態，並留在 Working Directory。

> `--hard`
> 會將 Working Directory 以及 Staging Area 中的檔案都刪除掉。

> `--soft`
> 會保留 Working Directory 以及 Staging Area 的檔案，只移動 HEAD 的指向，而 commit 拆出來的檔案會留在 Staging Area。

## checkout & branch

### `git checkout 'commit SHA1'`

將 .git/HEAD 指向此 commit SHA1。
> .git/HEAD 在哪就會展示當下的 commit 點狀態。

### `git checkout 'branch 名稱'`

將 .git/HEAD 指向 refs/heads/'branch 名稱'。

### `git checkout -b 'branch 名稱'`

在當下 commit 點上新增一個 branch，並將 .git/HEAD 指向該 branch。

### `git branch`

檢視現在的 branch 名稱。

### `git branch -m 'branch 名稱' '新值'`

修改 branch 名稱。

### `git branch -D 'branch 名稱'`

刪除 branch (無法刪除當下的 branch)。
> `rm .git/refs/heads/'branch 名稱'` 為刪除 branch 另法。

## diff

### `git diff`

可以比較 Working Directory 中所有檔案與 Staging Area 快照之間的差異。
> 也就是查看修改之後但還沒有暫存起來的內容變化為何。

### `git diff '檔案路徑'`

可以比較該檔案在 Working Directory 和 Staging Area 快照的差異。

> 如果原本只有一行，此次修改加了第二行後，Git 會認為你在第一行的最後加上 `/n` (換行)，導致第一行會被認定為「-」，再重新「+」兩行新的內容進來。

### `git diff --cached '檔案路徑'`

當檔案是 staged 狀態時 (add 後的狀態) 無法查看差異，此時必須加上 `--cached` 來查看差異。

### `git show 'commit SHA1'`

查看這個 commit 紀錄的所有差異。

> 若在一次 commit 之中，兩個檔案有不相關的修改，卻又同時 commit，當需要退版時會很麻煩，因此嚴謹一點的做法是分開 commit 此兩個檔案。

## mv & rm

### `mv '檔案路徑' ../`

將檔案移至該檔案所在位置的上一層目錄。

### `mv '檔案路徑' '檔案路徑 + 新名稱'`

將檔案移至該路徑並重新命名。

### `rm '檔案路徑'`

移除檔案 (不會丟進垃圾桶)，檔案狀態為 unstaged。
> 還需透過 `git add '檔案路徑'` 來讓 Git 知道更動。

### `git rm '檔案路徑'`

移除檔案，檔案狀態為 staged。

### `git rm --cached '檔案路徑'`

在 Staging Area 中移除該檔案，但保留至 Working Directory。

## rebase

### `git rebase -i 'commit SHA1'`

從此 commit 點開始調整其後方 commit 的順序 (進入 vim 內做調整，從第一行開始由舊到新排列下去)。

> 如果在 vim 內將某一個 commit 點前面 p 指令改成 e (edit)：
>   * 當要修改該 commit 點的 commit message，可以跳出 vim 後下 `git commit --amend`。
>   * 當要拆出 commit 內的檔案成多個 commit 時，可以跳出 vim 後下 `git reset HEAD^`，將檔案轉為 unstaged 狀態，再根據需求重新分開 commit。
>   * 當要合併多個 commit 時，可以在 vim 內，將欲合併的最後一個 commit 點前面指令改成 e ，跳出 vim 後，下 `git reset --soft HEAD~合併的 commit 數量'`。

> 被修改過的 commit 及其後方所有的 commit 紀錄，都會重新建立 commit SHA1。

### `git rebase --continue`

執行該次 rebase。

### `git rebase --abort`

放棄該次 rebase。

## cherry-pick

### `git cherry-pick 'commit SHA1'`

可以單獨將某個 commit 合併至當前 branch (會製造出新的 commit SHA1)。

## tag

### `git tag`

顯示本地標籤清單。
> `-n` 可以連同標籤注釋一起顯示。

### `git tag -a 'tag 名稱' -m "注釋"`

在當下這個 commit 上建立一個標籤。
> 可以透過 `git show 'tag 名稱'` 來查看這個標籤內容。

### `git tag 'tag 名稱' 'commit SHA1'`

在指定 commit 點上建立一個標籤。

### `git tag -d 'tag 名稱'`

刪除標籤。

### `git tag 'tag 名稱' '新值'`

更改標籤名稱 (記得更改完要將舊的 tag 刪除)。

### `git checkout -b 'branch 名稱' 'tag 名稱'`

將 tag 轉換成一個新的 branch，並切換成該 branch。

### `git show 'tag 名稱'`

查看該 tag 詳細內容。

### `git push origin 'tag 名稱'`

將本地的 tag 推至遠端。

### `git push origin --tags`

將本地所有的 tags 推至遠端。

## remote

### `git clone '遠端專案路徑' '新專案名稱'`

從遠端複製該儲藏庫至本地端。

### `git remote -v`

查看遠端路徑資訊。

### `git remote add origin '專案路徑'`

將遠端 Repository 連線至該目錄 (origin 可自行定義)。

### `git remote set-url origin '遠端路徑'`

若遠端路徑更動，可以透過此法重新連線。

### `git remote rename origin '新值'`

為 origin 賦予新名稱。

### `git remote remove origin`

移除遠端 origin。

### `git checkout -b 'branch 名稱' origin/'branch 名稱'`

在本地端建立一個 branch 並連線至遠端同名的 branch。

### `git fetch`

取得遠端所有 branch 的資料。
> 可以在後面加上 origin/指定branch 取得該 branch 資料。

### `git merge 'branch 名稱'`

將該 branch 合併至當前 branch。

### `git pull`

`git fetch` + `git merge`。

### `git push`

將本地端資料上傳到遠端。

### `git push origin 'remote branch name' -u`

將本地 branch 上傳至遠端 branch 並且追蹤 (下次只需 git push 即可)。
> `-u == --set-upstream`

### `git push origin --delete 'branch 名稱'`

刪除遠端 branch。

### `git push -f`

強制將遠端與本地端資料同步 (危險指令)。

### `git branch -a`

查看遠端的 branch (必須先 git fetch)。

## stash

### `git stash`

取得 Working Directory 修改過的被追蹤檔和暫存的變更，並將它保存到一個未完成變更的 stack 中，隨時可以重新套用。

### `git stash list`

查看現有的 stash。

### `git stash apply`

應用上一個儲藏 (可以加上 stash@{2} 來應用該 stash)。

### `git stash clear`

清除所有 stash。

##### 延伸閱讀

* [工作區、暫存區與儲存庫 - 為你自己學 Git | 高見龍](https://gitbook.tw/chapters/using-git/working-staging-and-repository.html)
