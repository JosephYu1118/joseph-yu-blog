---

path: blog/http-cookies-and-web-storage-api
title: HTTP Cookies & Web Storage API
tags: [html, http]
cover:
date: 2021-03-20
excerpt: 比較 Local Storage、Session Storage 和 Cookies 的異同

---

Local Storage 和 Session Storage 是 HTML5 提供兩種在客戶端儲存資料的方法，彌補了 Cookies 儲存量小 (4k)、不適用於大量資料本地儲存的問題。

* 都使用 key-value pairs 的方式存取資料。
* 大小預設有 5mb。
* 每次 Request 不會帶上 (Cookies 則每次都會帶上)。

## Cookies

* 可設定失效時間，預設是關閉瀏覽器後失效。
* 常用於判斷用戶是否已登錄。

## Local Storage

* 一直將資料儲存於客戶端本地，不會過期，除非手動刪除。
* 常用於儲存購物車資料、HTML 遊戲產生的數據、或不常變動的資料等。
* 如果是在同個網站底下，由於 Local Storage 是可以跨頁面共享的，要注意 Race Condition。

## Session Storage

* 生命週期只存在瀏覽器的「單一分頁」，也就是每個分頁都有各自的 Session Storage。
* 預設無逾期時間，每次分頁或瀏覽器關掉後就會清除。
* 常用於儲存表單資料。
* 當建立一個 auxiliary browsing context 的時候，Session Storage 就會被複製過去。
> * 有四種 elements 可以 create link： `<a>`、`<area>`、`<form>`、`<link>`。
> * link 若沒有 opener 屬性，而且 target 是 _blank，則 noopener 會是 true。
> * noopener 是 true 的話會建立一個新的 top-level browsing context，不是的話會建一個 auxiliary browsing context。
> * 「點擊連結」跟「右鍵 -> 開新分頁」的行為是不同的。前者會把 Session Storage 複製過去，但後者不會。因為瀏覽器（至少是 Chrome 跟 Safari）認為「右鍵 -> 開新分頁」就像是你新開一個 tab，然後把網址複製貼上，而不是直接從現有的分頁連過去，所以不會幫你複製 Session Storage。

### noopener 與 noreferrer

> 當從網站 A 使用 `<a target="_blank">` 連結到網站 B 的時候，網站 B 可以拿到 `window.opener`，這個 window 就是網站 A 的 window，因此只要在網站 B 執行 `window.opener.location = 'xxx.com'`，就可以把網站 A 導到其他地方，常見的釣魚網站就是透過此法。而其解法就是加上 `rel="noopener"`。

> 另外一個屬性 noreferrer 則是跟 Referer 這個 HTTP Request Header 有關，例如從網站 A 連到網站 B，網站 B 的 Referer 就會是網站的 A 的 URL，所以網站 B 是會知道是從哪邊連過來的。而若帶上了 `rel="noreferrer"` 這個屬性的話，就是告訴瀏覽器：「不要幫我帶 Referer 這個 Header」。所以用了 noreferrer 之後就蘊含著 noopener 的效果了。

##### 參考資料

* [從 Session Storage 開始一場 spec 之旅 - Huli](https://blog.huli.tw/2020/09/05/session-storage-and-html-spec-and-noopener/)
