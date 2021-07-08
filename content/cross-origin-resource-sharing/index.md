---

path: blog/cross-origin-resource-sharing
title: 跨來源 HTTP 請求
tags: [http, javascript]
cover: ./cover.png
date: 2021-04-09
excerpt: 跨來源 HTTP 請求是每個前端都曾遇過的問題，在這篇將其相關的觀念以較簡潔的方式釐清

---

## Ajax (Asynchronous JavaScript and XML)

* 要在瀏覽器上面發送 Request，必須使用 Ajax 技術。
* JavaScript 幾乎都是同步執行的，也就是說當它執行到某一行的時候，會等該行執行完畢，才會執行下一行，確保執行順序。
* 非同步則是執行完某一行後就不管它了，不會等到它的結果回傳就繼續執行下一行。
* 要發送 Request 的話，就要透過瀏覽器幫我們準備好的一個物件：XMLHttpRequest。
* onload 就是在指定當資料回傳的時候，要透過哪個 function 去處理。

```javascript{ numberLines: true }
const request = new XMLHttpRequest();

request.open('GET', `https://api.abc.com/def?id=qqq`, true);
request.onload = () => {
  if (request.status >= 200 && request.status < 400) {
    // Success
    console.log(request.responseText);
  }
};
request.send();
```

## 同源政策 (Same-origin Policy)

* 瀏覽器因為安全性的考量，如果發現我們現在所處的這個網站跟要呼叫的 API 的網站是「不同源」的時候，瀏覽器一樣會發 Request，但是會把 Response 給擋下來，不讓我們的 JavaScript 拿到資料並且會回傳錯誤。
* 「Request 是有發出去的」，而且「瀏覽器也有收到 Response」，重點是「瀏覽器因為同源政策，而不會回傳結果」。
* 若要開啟跨來源 HTTP 請求的話，Server 端必須在 Response Headers 裡面加上 Access-Control-Allow-Origin。
* Access-Control-Allow-Origin: *，星號就代表萬用字元，意指任何一個 Origin 都接受。

```javascript{ numberLines: true }
app.get('/', (req, res) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.end('ya');
});
```

## CORS (Cross-Origin Resource Sharing)

* CORS 把 Request 分成兩種，一種是簡單請求 (Simple Requests)，只要 Method 是 GET、POST 或是 HEAD，然後不要帶自訂的 Headers，Content-Type 也不要超出以下三種，基本上就可以被視為是簡單請求。
    1. application/x-www-form-urlencoded
    2. multipart/form-data
    3. text/plain
* 另一種是預檢請求 (Preflight Requests)，因為非簡單請求可能會帶有一些使用者資料，因此會先透過 Preflight Request 去確認後續的請求能否送出 (一個 Method 為 OPTIONS 的請求)，如果這個 Preflight Request 沒有過的話，真的 Request 也就不會發送了。
* 若是 CORS Request 含有自訂的 Headers 的時候，Preflight Response 需要明確用 Access-Control-Allow-Headers 來表明：「我願意接受這個 Header」，瀏覽器才會判斷預檢通過。
* CORS Request 無論是簡單請求或預檢請求，Server 端都必須在 Response 加上 Access-Control-Allow-Origin 這個 Header。

## JSONP (JSON with Padding)

* 這是除了 CORS 以外的另外一種跨來源請求方法，原理是透過 script 標籤傳遞資料跨過限制。但 JSONP 的缺點就是要帶的參數永遠都只能用附加在網址上的方式（GET）帶過去，沒辦法用 POST。

```html{ numberLines: true }
<script src="https://api.abc.com?id=qqq&callback=getData&limit=1"></script>
<script>
  function getData(response) {
    console.log(response);
  }
</script>
```

> 由後端透過 JSONP 方法動態產生檔案的內容，並且利用呼叫 JavaScript 函式的方式傳遞 JSON 格式的資料。

```javascript{ numberLines: true }
app.get('/users/:userId', (req, res) => {
  const userId = req.params.userId;
  const callback = req.query.callback;
  res.end(`${callback}(${JSON.stringify(users[userId])})`);
});
```

```javascript{ numberLines: true }
const setUser = (data) => {
  console.log(data);
}

const getUser = (userId) => {
  const script = document.createElement('script');
  script.src = `http://localhost:3000/users/${userId}?callback=setUser`;
  document.body.appendChild(script);
}
```

## 執行環境（Runtime）

* JavaScript 是一門程式語言，所以像 var、if else、for、function 等等，這些都是 JavaScript 的一部分。但 JavaScript 需要有地方執行，而這個地方就叫做執行環境，大家最常用的就是「瀏覽器」。所以一般 JavaScript 是在瀏覽器上執行的，而在這個執行環境中它會提供一些東西給我們使用，像是 DOM（document）、console.log、setTimeout、XMLHttpRequest 以及 fetch，這些其實都不是 JavsScript（或是更精確地說，ECMAScript）的一部分。這些是瀏覽器提供的，所以我們只有在瀏覽器上面執行 JavaScript 時才用得到。
* 因此若是發現為什麼一樣的 code 丟到 Node.js 上就卻沒辦法執行，那是因為 Node.js 並沒有提供這些東西，像是 fetch，我們就無法直接在 Node.js 裡面使用它 (可以透過其它 Library 或是 Polyfill 來使用)。
* 相對來說，在 Node.js 執行 JavaScript 時，我們可以使用 process 及 fs，但在瀏覽器上面就沒辦法。
* 有些 API 像是 console.log 跟 setTimeout 等，在瀏覽器及 Node.js 都有提供。但儘管他們看似功能相同，其實內部實作卻是完全不同，表現方法也可能不同。舉例來說，瀏覽器的 console.log 會輸出在 devtool 的 console，而 Node.js 則是會輸出在 terminal 上面。而兩者的 setTimeout 實作也不一樣，所以細節可能會有差別。

## 代理伺服器 (Proxy Server)

* 同源政策是因為「瀏覽器的限制」，一旦脫離了瀏覽器，就沒有任何限制了，代理伺服器就是如此。
* 代理伺服器就是幫忙在想存取的資源加上 CORS 的 Header。
* 一些 Chrome 上幫忙解決 CORS 問題的 Plugin，背後原理其實也只是在 Response 加上 Access-Control-Allow-Origin 這個 Header 而已。

![](https://i.imgur.com/aR7pM5f.png)

## Cookies

* 如果在發送 Request 的時候要帶上 Cookies，那必須滿足三個條件：

    1. Server 端在 Response Headers 有帶 `Access-Control-Allow-Credentials: true`。
    2. Server 端在 Response Headers 中的 `Access-Control-Allow-Origin` 不能是 `*`，要明確指定。
    > Server 端一定要明確指定是哪個 Origin 有權限，如果沒有這個限制的話，那代表任何網站（任何 Origin）都可以發 Request 到這個 API，並且帶上使用者的 Cookies，這樣就會有安全性的問題產生。
    3. 前端 fetch 時加上 `credentials: 'include'`。

* Server 端可以用 Set-Cookie 這個 header 讓瀏覽器設置 Cookies，但一樣要滿足上面這三個條件。

## All Related Response Headers

### `Access-Control-Allow-Origin`

證明這個 Origin 是有權限的 (不能是 *，要指定明確的 Origin)。

### `Access-Control-Allow-Headers`

Server 端要提供前端可以帶哪些 Headers 到 Requests 上。同時也因為多了預檢需求，Server 端要特別處理 OPTIONS 的 Request。

### `Access-Control-Allow-Credentials: true`

使前端發送 Requests 的時候能帶上 Cookies。

### `Access-Control-Expose-Headers`

當前端要存取 CORS Response 的 Headers (尤其自訂的 Headers) 時，Server 端要設定各個可以被存取的 Headers。

### `Access-Control-Allow-Methods`

當前端要使用 GET、HEAD 以及 POST 以外的 HTTP Methods 發送請求時，Server 端的 Preflight Response Headers 必須要指定合法的 Methods，預檢才會通過，瀏覽器才會把真正的 Request 發送出去。

### `Access-Control-Max-Age`

可以跟瀏覽器說這個 Preflight Response 能夠快取幾秒。

##### 參考資料

* [輕鬆理解 Ajax 與跨來源請求 - Huli](https://blog.huli.tw/2017/08/27/ajax-and-cors/)
* [Fetch: Cross-Origin Requests - javascript.info](https://javascript.info/fetch-crossorigin)
* [跨來源資源共用 (CORS) - MDN](https://developer.mozilla.org/zh-TW/docs/Web/HTTP/CORS)
