---

path: blog/rediscovering-react
title: 重新認識 React
tags: [react]
cover:
date: 2021-05-13
excerpt: 回頭檢視自己對 React 的認識是否完整

---

## 不可變性 (Immutability)

透過 Mutation 來改變資料：

```javascript{ numberLines: true }
const abc = { a: 1, b: 2 };

abc.a = 3;
```

> abc 物件的屬性 (property) 被改變。

不透過 Mutation 來改變資料：

```javascript{ numberLines: true }
const abc = { a: 1, b: 2 };

const def = { ...abc, a: 3 };
```

> abc 物件的屬性不會被改變，而 def 只是淺拷貝 (shallow copy) 了 abc 物件的屬性，所以是另一個新的物件。

### 可偵測改變

在可變動的物件 (mutable objects) 中偵測改變是很困難的，因為這些改變是直接的。相較之下，在不可變動的物件 (immutable objects) 中偵測改變就容易多了，同時，我們也能記錄下改變前後的狀態，在需要時能快速找到它的原始資料。

### 決定何時重新渲染

React component 是由 React element 所組成的，而 React element 是 immutable 的，一旦建立一個 element，就不能再改變它的 children 或是 attribute，就像是電影中的一個幀：它代表特定時間點的 UI。

透過不可變性我們能建立 Pure Components，這幫助 React 決定某個 component 是否需要重新渲染，React DOM 會將 element 和它的 children 與先前的狀態做比較，並且只更新必要的 DOM 達到理想的狀態。

> Pure Components 就像是 Pure Functions，每次給它相同的輸入 (specific input parameters)，它都只會回傳固定的輸出 (specific output)，並且這個輸出只會根據輸入的不同而有所改變，不會被外部的變數所影響，我們也不能企圖去改寫輸入的參數，要保護它的「唯讀性」。

## useEffect

### 使用邏輯

第一種常見的使用邏輯是：當使用者進行一項操作之後，除了要改變 state，還要額外做什麼事。

```javascript{ numberLines: true }
import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);
  
  const handleClick = () => {
    document.title = `You clicked ${count + 1} times`;
    setCount(count + 1);
  };

  return (
    <>
      <p>You clicked {count} times</p>
      <button type="button" onClick={handleClick}>Add</button>
    </>
  );
};

export default Counter;
```

第二種邏輯是：當某個 state 改變之後，它有沒有什麼 side effects 是要執行的。

```javascript{ numberLines: true }
import React, { useState, useEffect } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]);

  return (
    <>
      <p>You clicked {count} times</p>
      <button type="button" onClick={() => setCount(count + 1)}>Add</button>
    </>
  );
};

export default Counter;
```

其實第二種邏輯就是 useEffect 的原意：當它的 dependencies 改變時，需要執行哪些 side effects，因此我們只需要針對 state 做改變，不需要在每個動作明確指定要完成哪些任務。

> side effect 包括：fetch 資料、手動改變 React component 中的 DOM、setTimeout ...等。

### 執行流程

useEffect 是「非同步」函式，會在畫面渲染完成後才執行，相比在 Class Components 生命週期中的 componentDidMount，則是在渲染之前就執行。具體 useEffect 執行流程如下：

1. 執行 FunctionComponent
2. 更新 DOM 結構
3. 首次渲染畫面
4. 執行 useEffect
5. 若偵測到 state 或 props 被改變
6. 執行 FunctionComponent
7. 比較 DOM 差異
8. 更新 DOM 結構
9. 重新渲染畫面
10. 執行 useEffect

### useLayoutEffect

實際上，與 componentDidMount 更為類似的其實是 useLayoutEffect，它與宣告 useEffect 本身相同，但它是「同步」函式，會在所有 DOM 改變後執行，並且必須等到它執行完成才會渲染畫面，也就是它是有可能會阻塞 UI 的，因此官方建議大多數情況先使用 useEffect。具體 useLayoutEffect 執行流程如下：

1. 執行 FunctionComponent
2. 更新 DOM 結構
3. 執行 useLayoutEffect
4. 首次渲染畫面
6. 若偵測到 state 或 props 被改變
7. 執行 FunctionComponent
8. 比較 DOM 差異
9. 更新 DOM 結構
10. 執行 useLayoutEffect
11. 重新渲染畫面

### Capture Value 的特性

倘若在以下這個組件中，我們快速的點擊了 5 次，它的執行結果會是？

```javascript{ numberLines: true }
import React, { useState, useEffect } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      console.log(`You clicked ${count} times`);
    }, 3000);
  });

  return (
    <>
      <p>You clicked {count} times</p>
      <button type="button" onClick={() => setCount(count + 1)}>Add</button>
    </>
  );
};

export default Counter;
```

答案是：

```{ numberLines: true }
You clicked 0 times
You clicked 1 times
You clicked 2 times
You clicked 3 times
You clicked 4 times
You clicked 5 times
```

這是因為每次的渲染就像是記錄了一份快照，都會有自己的 props、state 和 event，useEffect 也同樣有此 Capture Value 的特性，每次都是拿到在那次渲染之中，固定不變的值。

若想要讀取最新的值而不是某個在 effect 中所捕捉到的值，我們可以透過 useRef，因為它是 mutable 的 (state 是 immutable 的)，也就是在每次渲染中我們都會重新賦值給它，因此只要對它取值，我們只會得到它最終的狀態。

```javascript{ numberLines: true }
import React, { useState, useRef, useEffect } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  const latestCount = useRef(count);

  useEffect(() => {
    latestCount.current = count;
    setTimeout(() => {
      console.log(`You clicked ${latestCount.current} times`);
    }, 3000);
  });

  return (
    <>
      <p>You clicked {count} times</p>
      <button type="button" onClick={() => setCount(count + 1)}>Add</button>
    </>
  );
};

export default Counter;
```

```{ numberLines: true }
You clicked 0 times
You clicked 5 times
You clicked 5 times
You clicked 5 times
You clicked 5 times
You clicked 5 times
```

### Dependencies

當我們在一個 useEffect 中列出了 dependencies 時，必須確保其包含了所有在該 effect 中會用到的值 (像是 props、state 或任何出現在該 component 中的值)。

像以下這個例子便是錯的，因為並沒有把 count 這個 state 加入 dependencies：

```javascript{ numberLines: true }
import React, { useState, useEffect } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(count + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return <p>{count}</p>;
};

export default Counter;
```

可以透過使用 setState 的函數形式更新來避免：

```javascript{ numberLines: true }
// ...
useEffect(() => {
  const timer = setInterval(() => {
    setCount(previousCount => previousCount + 1);
  }, 1000);

  return () => clearInterval(timer);
}, []);
// ...
```

但這並沒有完全解決問題，倘若今天依賴了兩個 state，我們還是得將它加入 dependencies：

```javascript{ numberLines: true }
// ...
useEffect(() => {
  const timer = setInterval(() => {
    setCount(previousCount => previousCount + step);
  }, 1000);

  return () => clearInterval(timer);
}, [step]);
// ...
```

因此這時候我們該思考：把發生在組件裡的「動作」與實際 state 依據這些動作的「更新」兩件事情解耦，而 useReducer 正是答案，它是一個 React 簡易實現 Flux 資料管理架構，用來處理複雜 state 邏輯而且包括多個子數值的 useState 替代方案。

> 可以從 useEffect 和 useCallback 的 dependencies 裡省略 dispatch、setState 和 useRef 的值，因為 React 保證它們會是穩定的，不會在 re-render 時改變。

```javascript{ numberLines: true }
import React, { useReducer, useEffect } from 'react';

const initialState = { count: 0, step: 1 };

const reducer = (state, action) => {
  const { count, step } = state;

  if (action.type === 'tick') {
    return { count: count + step, step };
  } else if (action.type === 'step') {
    return { count, step: action.step };
  } else {
    throw new Error();
  }
};

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { count, step } = state;

  const handleInputChange = (event) => {
    dispatch({
      type: 'step',
      step: Number(event.target.value)
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: 'tick' });
    }, 1000);

    return () => clearInterval(timer);
  }, [dispatch]);

  return (
    <>
      <p>{count}</p>
      <input value={step} onChange={handleInputChange} />
    </>
  );
};

export default Counter;
```

## useMemo

當組件 re-render、但 dependencies 沒有被改變時，useMemo 就不會再執行其 callback，直接回傳前一次 memoized 的值。因此可以透過 useMemo 來避免重複的大量運算或非必要的 re-render。

```javascript{ numberLines: true }
import React, { useMemo } from 'react';

const Parent = ({ a, b }) => {
  // 只有在 a 改變時 re-render
  const child1 = useMemo(() => <Child1 a={a} />, [a]);
  // 只有在 b 改變時 re-render
  const child2 = useMemo(() => <Child2 b={b} />, [b]);

  return (
    <>
      {child1}
      {child2}
    </>
  );
};

export default Parent;
```

## useCallback

useCallback 是 useMemo 針對 function 的延伸，避免每次 re-render 時，不需變動的 function 重新分配記憶體位置。

以下兩例是相等的：

```javascript{ numberLines: true }
// ...
const Parent = ({ abc }) => {
  const callback = () => ({ value: 'Result' });

  const memorizedCallback = useCallback(callback, [abc]);

  return <Child callback={memorizedCallback} />;
};
// ...
```

```javascript{ numberLines: true }
// ...
const Parent = ({ abc }) => {
  const callback = () => ({ value: 'Result' });

  const memorizedCallback = useMemo(() => callback, [abc]);

  return <Child callback={memorizedCallback} />;
};
// ...
```

## React.memo

通常子組件會接收來自父組件的 state 或 event 成為其 props，但如果父組件的狀態改變，而子組件的 props 沒有被改變時，子組件仍然會 re-render，因此，React.memo 即是透過淺層比較 (shallowly compare) props 是否改變，來判斷要不要進行 re-render。

> React.memo 是一個 Higher-Order Component，它的第二個引數 (argument) 是自定義的 comparison function，若回傳 true 則表示略過這次的 re-render。

```javascript{ numberLines: true }
import React from 'react';

const MyComponent = (props) => {
  // ...
};

const areEqual = (prevProps, nextProps) => {
  // ...
};

export default React.memo(MyComponent, areEqual);
```

##### 參考資料

* [React 官方文件](https://zh-hant.reactjs.org)
* [A Complete Guide to useEffect - Dan Abramov](https://overreacted.io/a-complete-guide-to-useeffect/)
