---

path: blog/event-loop-in-javascript
title: Event Loop in JavaScript
tags: [javascript]
cover:
date: 2021-04-23
excerpt: 深入瞭解 JavaScript 同步與非同步的原理

---

## 同步 (Synchronous) vs 非同步 (Asynchronous)

首先一定要先解釋這兩個名詞和我們一般認知上的差異：同步並不是指同時一次做完全部的事情，而是一次做一件事，必須等到上一件事情完成，才能去做下一件事。而非同步則是不需要等到上一件事情完成，就可以去做下一件事。

舉例來說，你去 7-11 買東西，發現結帳人很多，你還是得乖乖排隊，等到輪到你結帳為止，這對店員來說就是「同步」，讓大家都很有秩序地走這個流程。另一個場景是在摩斯漢堡，每個人都必須先到櫃檯點餐，接著拿著號碼牌坐回自己的位置，這時候大家都可以各做各的事，但誰的餐點先來不一定，說不定有些人的餐點要準備的時間比較久，就會比較晚送來，這對店員來說就是「非同步」，不會因為某人的餐點比較花時間，就讓大家卡在那等他一個。

## 單一執行緒 (Single Thread)

JavaScript 是單一執行緒的程式語言，所有的程式碼都會在堆疊中被執行，同一時間只會執行一段程式碼，而且程式碼是一行一行被執行的，也就是「同步」執行，那非同步的行為要如何實現？ JavaScript 不像其他程式語言可以多開執行緒 (Web Worker 為另法)，因此有了此篇要介紹的事件循環規範，模擬多工狀態。

## 呼叫堆疊 (Call Stack)

Stack 是一個「後進先出」的資料結構，記錄了目前 JavaScript 執行到程式的哪個部分，可以把它想像成一個 Array，每次要新增或移除內容時，都是從最後面開始 Push 進去或 Pop 出來。

假設今天要執行以下這份程式碼：

```javascript{ numberLines: true }
function abc() {
  console.log('abc');
  def();
}

function def() {
  console.log('def');
}

abc();
```

呼叫堆疊的流程就會是這樣：

![](https://i.imgur.com/g0QfBfl.jpg)

## 事件佇列 (Event Queue)

Queue 是一個「先進先出」的資料結構，可以想像成一個隊伍，先排的就先出去，後來的就從後面排起來等。

![](https://i.imgur.com/Xl8wfHO.jpg)

## 事件循環 (Event Loop)

事件循環是 JavaScript 為了實現非同步行為的一個規範。

### 宏任務 (Macrotask) 與 微任務 (Microtask)

* 兩者都會被放入 Call Stack 被主執行緒執行。
* 宏任務又稱作為 tasks，微任務被稱為 jobs。
* 宏任務執行完畢之後，瀏覽器會對頁面進行重新渲染。
* 微任務是在宏任務執行完畢之後，並且在頁面渲染之前要立刻執行的任務。

瀏覽器為了使 JavaScript 內部的宏任務與 DOM 渲染能有秩序地執行，會在一個宏任務執行完畢之後，並且在下一個宏任務執行之前對頁面進行重新渲染，其過程稱為一個 Tick，如下圖所示：

![](https://i.imgur.com/Ry1icvS.jpg)

> 宏任務包括：script(整體程式碼)、setTimeout、setInterval、I/O、UI 交互事件、postMessage...等

> 微任務包括：Promise、MutationObserver...等

![](https://i.imgur.com/wdBsjLt.jpg)

## Promise 和 async / await

在 Promise 主區塊內的程式碼是同步執行的，而非同步執行的部分是在 then() 和 catch() 之內。

由於 async / await 本身是由 Promise 和 generator 包裝出來的語法糖，所以 await 是像一個讓出執行緒的 flag，其同一行緊接著的表達式會先執行(同步)，並且將其後方的程式碼丟到 Microtask Queue 之中，然後就會跳出整個 async funciton 來執行外部的程式碼。

## 試題

### Q1:

```javascript{ numberLines: true }
async function async1() {
  new Promise(function (resolve) {
    console.log('promise1');
    resolve();
  }).then(function () {
    console.log('promise2');
  });
}

async function async2() {
  console.log('async2 start');
  await async1();
  console.log('async2 end');
}

console.log('script start');

setTimeout(function () {
  console.log('setTimeout');
}, 0);

async2();

new Promise(function (resolve) {
  console.log('promise3');
  resolve();
}).then(function () {
  console.log('promise4');
});

console.log('script end');
```

### A1:

```{ numberLines: true }
script start
async2 start
promise1
promise3
script end
promise2
async2 end
promise4
setTimeout
```

### Q2:

```javascript{ numberLines: true }
async function async1() {
  setTimeout(function () {
    console.log('setTimeout2');
  }, 0);
}

async function async2() {
  console.log('async2 start');
  await async1();
  setTimeout(function () {
    console.log('setTimeout1');
  }, 0);
}

console.log('script start');

setTimeout(function () {
  console.log('setTimeout3');
}, 0);

async2();

new Promise(function (resolve) {
  console.log('promise1');
  resolve();
}).then(function () {
  console.log('promise2');
});

console.log('script end');
```

### A2:

```{ numberLines: true }
script start
async2 start
promise1
script end
promise2
setTimeout3
setTimeout2
setTimeout1
```

##### 參考資料

* [What the heck is the event loop anyway? - Philip Roberts](https://www.youtube.com/watch?v=8aGhZQkoFbQ&list=WL&index=43&t=32s)
* [运行机制详解：再谈Event Loop - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)

##### 延伸閱讀

* [从Vue.js源码看nextTick机制](https://zhuanlan.zhihu.com/p/30451651)
