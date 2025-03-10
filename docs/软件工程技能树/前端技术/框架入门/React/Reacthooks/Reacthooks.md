---
title: React hooks
slug: >-
  ynzowezexiygx0kbdlyco9pgnxe-ejb3wlaaeiqiumkxpozcbvopnfh-rmxtwu9geip5o8kkeawck6dnn6e-ik6qw0wh1idsu8kvyzccmcgnnfe-o0cjwusk9iv66ckqo3ickjnonag-o0cjwu
sidebar_position: 0
---


# React hooks

<div class="callout callout-bg-2 callout-border-2">
<div class='callout-emoji'>🔔</div>
<p>本文为 React Hooks 初级入门指南。如果您想了解高级用法或者想深入学习 React 哲学，那这里可能没有你想要的东西 :(</p>
</div>

<div class="callout callout-bg-2 callout-border-2">
<div class='callout-emoji'>📗</div>
<p>必读文档是你完成进阶项目所必需的技术知识，阅读文档有助于完成进阶项目</p>
</div>

## Class component vs. Function component

在 React 中，一个常见的写法是使用 class component:

```js
class MyConponent extends React.Component {
    // state 状态
    constructor(props) {
        super(props);<em>
</em>        this.state = {counts: 0};<em>
</em>    }
    clickHandle() {
        this.setState({
          counts: this.state.counts++
        });
    }
    // 生命周期函数<em>
</em>    componentDidMount() {
        console.log('Did mouned!');
    }<em>
</em>    render() {
        return (
            <>
                <div>
                  Counts: {this.state.counts}
                </div>
                <button onClick={this.clickHandle}>+1</button>
            </>
        );
    }
}
```

在 Hooks 推出之前，在 React 中使用状态（state）、生命周期方法（lifecycle methods）、上下文（context）等等重要 React 特性的唯一方法就是通过 <b>class component</b>。所以在当时，类定义组件是编写 React 组件的标准方法。我们虽然可以用函数编写组件，但是它必须是一个<b>纯函数（Pure function）</b>，所以我们没法使用状态等功能。

<div class="callout callout-bg-5 callout-border-5">
<div class='callout-emoji'>💡</div>
<p><b>纯函数（Pure function）</b>指的是仅依赖于传入的参数且不会对外界造成副作用的函数。</p>
</div>

随着 Hooks 在 React v16.8 版本中正式推出，<b>函数式组件（function component）</b>成为了编写组件的最佳实践。Hooks 意为“钩子”，指的是可以在函数内部把外部状态和功能“钩”进来。借助 hooks 我们可以在保持组件为纯函数的情况下使用状态、副作用等等功能。

```js
function MyConponent ()  {
    const [counts, setCounts] = useState(0);
    return (
        <>
            <div>
                Counts: {counts}
            </div>
            <button onClick={() => setCount(count + 1)}>+1</button>
        </>
    );
};
```

所以，现在在 React 中实现组件有两种方式，class component 与 function component。相比较下，class component 存在很多缺点，包括但不限于：

1. `this` 指代不明；
2. 难以复用、拆分、重构和测试；
3. 引入了复杂的 render props、高阶组件等；

> 其实 class component 经过编译后还是会变成 JavaScript Function。

为了解决这些问题，hooks 使你在非 class 的情况下可以使用更多的 React 特性。

## 为什么是函数？

这不得不提一下 React 的设计理念。从概念上来说，React 把组件视为一个输入数据输出 UI 视图的函数。所以函数式的组件更符合其设计理念，同时可以避开 class component 的很多缺点。

React 团队希望让 Hooks 能够覆盖所有之前 class component 的使用场景，但目前并不会放弃对 class component 的支持。两种方式可以在一起使用。

## 有哪些 hook

最基本的 hooks：

- useState（状态）
- useEffect（副作用）
- useContext（上下文）

高级 hooks：

- useRef
- useCallback
- useReducer
- useMemo
- ……

不难发现，React 中的 hooks 都是由 `use` 开头。除此之外，我们还可以定义自己的 [custom hooks](https://reactjs.org/docs/hooks-custom.html)。

本文主要介绍较为常见的几个 hooks。

## useState

在 class component 中，我们一般会写这样的代码：

```js
class example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {counts: 0};
  }
};
```

这里我们在构造函数中定义了 `this.state`，也就是这个组件的状态。之后我们就可以读取/修改 `this.state` 的值了。使用 `setState()` 更新状态时，React 就能获知状态发生改变，从而重新渲染页面。

那么在 function component 中怎么使用 state hook 来实现这个功能呢？

```js
import React, { useState } from 'react'; // 导入

function example(props) {
  const [counts, setCounts] = useState(0);
  function handleClick() {
    setCounts(counts + 1);
  }
  return (
    <>
      <div>
        Counts: {counts}
      </div>
      <button onClick={handleClick}>
        +1
      </button>
    </>
  );
}
```

可以发现，`useState()` 接受一个参数作为输入，其意义为<b>初始状态</b>；返回一个长度为 2 的数组，分别是<b>当前的状态</b>以及<b>更新状态的函数</b>。

所以在这个例子中，我们使用 hook 定义了 `counts` 这个状态，初始为 0。修改 `counts` 的函数为 `setCounts()`。之后，可以直接读取 `counts` 的值，并通过 `setCounts()` 更新状态。

### 注意事项

使用 `useState` 时有几个需要注意的地方：

- <b>永远不要</b>直接对某个状态进行赋值，比如在上面的例子里直接写 `counts = counts + 1` 是不可以的。
- Class component 的 `setState()` 函数在更新对象（object）时是默认合并的，但是 state hook 的状态更新函数是<b>默认替换的</b>。如果想要实现对象合并的效果，记得使用展开运算符 `...`。
- 只能在 function component 中使用 hooks。
- 在 v18 版本后，React 会在尽量不产生错误的前提下，批量同步执行相邻的状态更新操作以减少 re-render 次数，提升性能。具体请见 [Automatic batching for fewer renders in React 18](https://github.com/reactwg/react-18/discussions/21)。

### 浅试一下

看看这个计时器的例子：

```js
// example 1
function App() {
  const [count, setCount] = useState(0);
  
  function startCountdown() {
    setInterval(() => {
      setCount(count + 1);
    }, 1000);
  }
  
  return (
    <div>
      <div>Count: {count}</div>
      <button onClick={startCountdown}>Start countdown</button>
    </div>
  );
}
```

我们预期的结果是，点击按钮，计数器从 0 开始每秒加一。但事实是什么样的呢？赶紧试试👇

<iframe src="https://codepen.io/deluxurousCodePen/pen/WNJBggq"/>

如果你熟悉 JS，那么聪明的你肯定会发现，这是由闭包引起的问题。Interval 中的 `count` 值始终保持为定义 Interval 那个时刻的值不变。React hooks 重度依赖闭包，所以在开发时，一定要考虑到闭包带来的问题。

那么怎么解决呢？一种解决方案是，把上面的 `setCount(count + 1);` 改为 `setCount(count => count + 1);`。这样做等于是告诉 hook 我们想要的是把状态 `count` 的值递增 1，而并不依赖于原来的 `count` 值，也就避免了闭包带来的错误。（但这个写法依然存在不合理的地方，比如 `setInterval` 其实是一个会造成副作用的操作，应当把它写在 useEffect 当中。）

## useReducer

<div class="callout callout-bg-5 callout-border-5">
<div class='callout-emoji'>💡</div>
<p>这是一个高级 hook。如果你的时间不是很充裕，可以先跳过不看。</p>
</div>

你用过 JavaScript 中的一个数组方法 [reduce](https://javascript.info/array-methods#reduce-reduceright) 吗？`useReducer` 和它有一样的名字，作用也类似。它是一个高级钩子，可以帮助我们更好地管理状态。我们在这里简单讲讲使用的方法。

```js
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

其实可以把 `useReducer` 看作是更高级的 `useState`。

参数中第一个 `reducer` 是一个函数；`initialArg` 是状态的初始值计算函数的参数；`init` 是计算状态初始值的函数，可以直接留空。留空表示状态的初始值就是 `initialArg`，否则初始值就是 `init(initialArg)`。

一般的简单写法是：

```js
const [state, dispatch] = useReducer(reducer, initialState);
```

`useReducer` 的返回值也是一个数组，第一项是状态 `state`，第二项是调度函数 `dispatch`。

`reducer` 是一个<b>纯函数</b>。它接受两个参数——当前状态和行动对象，并返回一个参数——更新后的状态。`dispatch` 函数用于调度，它接受一个参数——行动对象。

### 一个栗子

```js
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement';
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, {count: 0});
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-1</button>
      <button onClick={() => dispatch({type: 'increment'})}>+1</button>
    </>
  );
}
```

和 `useState` 相比，`useReducer` 多了一个 `reducer` 函数，并且把 `setState` 改为了 `dispatch`。这实际上把状态的维护逻辑进行了一层封装。

我们把可能对状态进行的操作写在 `reducer` 中，并在行动对象中标识操作、附带参数。比如在这个例子中，我们有 `increment` 和 `decrement` 两种操作。根据 `action.type` 的不同，`reducer` 做出相应的处理，并返回新的状态。

这样我们通过调度函数 `dispatch(action)` 就可以按照指定的信息进行状态的修改。调用 `dispatch({type: 'increment'})` 就可以让 `state.count` 递增 1。 

### 注意事项

- `reducer` 必须是一个<b>纯函数</b>。
- `reducer` 中，不能直接对状态进行修改或赋值。应当创建一个新的对象，并在进行必要修改后返回。这里需要注意深浅拷贝问题。可以善用解构赋值。
- React 会保证 `dispatch` 函数在组件存在时保持不变。

## useEffect

<div class="callout callout-bg-3 callout-border-3">
<div class='callout-emoji'>🌞</div>
<p>本文重点介绍对象—— <code>useEffect</code>。</p>
</div>

之前我们提到，函数式组件应当是一个没有副作用的纯函数。但通过 Effect hook，我们可以实现副作用操作。它的格式是这样的：

```js
useEffect(effect, deps);
```

其中 `effect` 是一个<b>函数</b>，它不接受参数。这个函数内部就是具体的副作用操作，譬如网络请求、设置订阅、DOM 操作等等。同时，这个函数可以有返回值，返回值依然是一个不接受参数的函数，表示对副作用的清理或消除。`deps` 可以是 `undefined` 或者一个<b>可以为空的数组</b>，表示这个副作用的依赖。

这样似乎难以理解。我们可以试着这样思考：

组件在渲染时可能希望产生某些副作用，如修改 DOM，访问网络等。我们使用 effect hook 来实现这个功能——把副作用写在 `useEffect` 的参数当中。而在<b>每次重新渲染</b>时，这些副作用都会被重新执行，这会引入一些问题：

- 有时我们希望在重新执行副作用之前消除前一次副作用。解决的办法是在 `effect` 参数中写上返回值。
- 有时某些副作用的重复执行是不必要的且可能影响性能。解决办法就是为副作用加入依赖项。这样做其实是在告诉 React：“这个副作用只依赖于这些值，如果这些值没有改变，那就没有必要重复执行副作用”。那么 React 在每次重新渲染时，就会把每个副作用的依赖项与上次渲染时的值进行比较。当有值发生了改变时，React 才会重新执行副作用。如果依赖项为 undefined，那么每次 re-render 时都会执行副作用。

<div class="callout callout-bg-2 callout-border-2">
<div class='callout-emoji'>🔔</div>
<p>React 在比较依赖项时，使用的是<b>浅比较</b>。所以尽量不要把整个对象、数组等直接作为依赖项。</p>
</div>

### 一个栗子

我们来看看之前 state hook 中使用过的计时器例子，但这次我们使用 `useEffect` 钩子。

```js
// example 2
function App() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count + 1);
    }, 1000);
    return () => {clearInterval(interval);}
  }, [count]);
  
  return (
    <div>
      <div>Count: {count}</div>
    </div>
  );
}
```

尝试理解一下这段代码。[点这里运行](https://codepen.io/deluxurousCodePen/pen/PoaovBe)。

- 第一次渲染时，执行副作用。设置了一个定时器，每隔一秒递增一次 `count`。
- 第一秒过去后，`count` 加 1。状态改变触发 re-render。
- 重新渲染后比较副作用的依赖。发现 `count` 值发生了改变。
- 重新执行副作用。执行时分为两步。
    - 首先，清除上一次的副作用。可以看到代码中定义了清除副作用的函数——它清除了定时器。
    - 然后，执行这一次的副作用。也就是重新设置了定时器。它将在 1 秒后给 `count` 加 1。

- ……

所以，这段代码通过不太直接的方式实现了一个秒数计时器。

你可能想问，为什么在这个例子中，`setCount(count + 1);` 没有像之前那样发生闭包的问题。难道这里没有产生闭包吗？我们会在后文解释这个问题。

### 状态"快门"

我们看一下这个更为直观的例子：

```js
// example 3
function App() {
  const [count, setCount] = useState(0);
  
  function addCount() {
    setCount(count + 1);
  }
  
  useEffect(() => {
    setTimeout(() => {
      console.log(count);
    }, 5000);
  }, [count]);
  
  return (
    <div>
      <button onClick={addCount}>+1</button>
    </div>
  );
}
```

<iframe src="https://codepen.io/jiangmizzz-Xu/pen/GRYLXGN"/>

尝试快速地点击多次 +1 按钮，然后查看 console。每次打印的值符合你的预期吗？

我们可以认为，每一次渲染，React 都生成了一个当前组件的“副本”。对于一个“副本”来说，里面的所有 states 都是不可改变的常量（这就是我们为什么使用 `const` 来定义 state）；但是不同的“副本”之间，这些 states 可能有所不同。而每一个“副本”中的 effects，只能获取到它所在的“副本”中的 states。

在上面的例子中，第一次点击 +1 按钮后，React 进行一次重新渲染，并产生了一个“副本”。在这个“副本”当中，`count` 的值为 1。然后 React 执行副作用，设置了一个定时器，在 1 秒后打印 `count` 的值。而 1 秒后，不论你点击了多少次 +1 按钮，`count` 的值对于这个“副本”来说，值始终都是 1。

<div class="callout callout-bg-2 callout-border-2">
<div class='callout-emoji'>🔔</div>
<p>这样的性质对于 class component 并<b>不成立</b>。如果你感兴趣的话，可以实现一个看似等价的组件，<a href="https://codepen.io/deluxurousCodePen/pen/GRGRbqY">执行一下</a>看看效果。</p>
</div>

事实上，不只有 states 和 effects，“副本”中所有的函数（自定义函数、计时器等等）都会捕获它所在的那次渲染中的 states 和 props，而这些 states 和 props 对于他们所在的“副本”来说都是常量。这也解释了为什么不能对 states 直接赋值。

闭包的无处不在可能会使你感到厌恶，但好处在于，闭包使得每次渲染时的逻辑清晰且确定。

如果你不想要这种效果，而想要像 class component 那样读取当前实际状态的值，可以使用 `useRef`，我们会在后文讲到。

### <em>Obliviate!</em> 

<img src="/assets/IJkAb1341otyKnxwqeJcNRALnJg.gif" src-width="245" src-height="155" align="center"/>

你或许在之前学过一些这样的东西：

> <em>【教程】如何使用 useEffect 模拟 class component 的生命周期</em>

> ```js
<em>useEffect(() => {</em>
<em>  ...</em>
<em>}, []);</em>
```
> <em>这样可以让这个副作用在组件 mount 时执行一次，实现 componentDidMount 的效果。</em>

事实是，class component 的思维模型并不能完全同样地应用于 hooks，上面的写法也不能保证 100% 符合期望。想要更好的理解和使用 useEffect，需要进行一些思维的转换。一个建议是，把生命周期的概念<b>都忘掉</b>，试着去用 effects 的方式思考。

### Don't cheat

> <em>Trick me once, trick me twice</em>
> <em>Don't you know that cash ain't the only price</em>
> <em>It's coming back around</em>

对于 useEffect 的依赖项，尽量<b>不要对 React 撒谎</b>。请把副作用中所有用到的依赖<b>全部</b>写在依赖项中。

很多初学者会忽略这个问题，在依赖项中少写几项，这可能会导致预想不到的问题。

还记得 [example 2](https://xn4zlkzg4p.feishu.cn/wiki/wikcnAj97pK5WexPjxFZ3AUEWRc#WC4OdkQgwoSKEuxEbBSc2wXQnke) 和我们之前提出的问题吗？（为什么 example 2 中的 `setCount` 没有闭包问题？）来看一下这个例子：

```js
// example 4
function App() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count + 1);
      console.log(count); // 增加日志打印（仅为了观察）
    }, 1000);
    return () => { clearInterval(interval); }
  }, []); // 去掉了依赖项 count
  
  return (
    <div>
      <div>Count: {count}</div>
    </div>
  );
}
```

和 example 2 相比，我们去掉了依赖项。试着[运行一下](https://codepen.io/deluxurousCodePen/pen/WNybaQd)，看看结果是什么。

写这段代码时，这位程序员可能在想：

> <em>“我想要一个计时器。我想要它在组件挂载时从 0 开始计时。我想要它在组件卸载时停止计时。”</em>

但结果却是……

如果你还记得 state hook 中的那个例子，你可能很快就能反应过来，这里是<b>闭包</b>引起的问题—— effect 中的 count 因为闭包而始终为 0。根据当时的解决方案，把第 7 行改为 `setCount(count => count + 1);` 就可以了。

现在我们再<b>从依赖项的角度</b>思考这个问题。

- 为什么这个代码不 work？因为我们欺骗了 React。Effect 中依赖了 `count`，却没有写在依赖项里。
- 为什么 [example 2](https://xn4zlkzg4p.feishu.cn/wiki/wikcnAj97pK5WexPjxFZ3AUEWRc#WC4OdkQgwoSKEuxEbBSc2wXQnke) 的代码能 work？因为这段代码正确地标明了依赖项，React 。
- 为什么在 example 5 中，把第 7 行改为 `setCount(count => count + 1);` 又 work 了？——因为这样的修改使得 `setCount` 不依赖于第三行定义的 `count` 的值（初始值），而是每次都在一个小的箭头函数里根据当前最新的 `count` 值来计算出更新的值。

```ts
// example 5
function App() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      // setXXX 支持接受一个函数作为参数，会用最新的值作为参数调用传入的函数
      setCount(count => count + 1);
      console.log(count); // 增加日志打印（仅为了观察）
    }, 1000);
    return () => { clearInterval(interval); }
  }, []); // 去掉了依赖项 count
  
  return (
    <div>
      <div>Count: {count}</div>
    </div>
  );
}
```

Voila！遵守依赖项的规则可以帮助你发现潜在的闭包陷阱。如果你想强制要求正确列出所有的依赖项，可以试着编写 lint 规则，或者用一个[现成的](https://github.com/facebook/react/issues/14920)。

### 漏网之鱼

很多人会容易忽略 JS 中的一个重要成员：<b>函数</b>。问题就是，函数也需要作为 `useEffect` 的依赖并标明吗？

答案是 YES。忽略函数依赖是不安全的<del>（虽然可能大多数情况下不会出问题）</del>。

和 class component 不同，function component 中定义的函数在每次渲染时都是不同的。所以，直接把组件内定义的函数作为依赖项可能会导致触发 re-render 过于频繁。

最佳实践应该是：

- 把不依赖本组件中 states 或 props 的函数定义到组件外部。这样的函数不再被视为是依赖项。
- 尽可能把 effect 会用到的函数定义在 effect 内部。注意，这些定义在内部的函数也会依赖组件中的 states 或 props，不要忘记把它们写在依赖项中。
- 如果还是需要在 effect 中调用一个组件内部的函数（包括通过 props 传入的函数），可以把这些函数包在 `useCallback` 中。

### まだ... 壊れた

如果你开始尝试每次都写正确的依赖项，那么，你很棒！但是很多人会发现，自己写的 effect hook 还是不能按照预期运行。比如，你有没有陷入<b>无限重复循环</b>调用某个 effect 的地狱？或者，你虽然依赖了某个状态，但并不想让这个状态在下一次更新时触发这个 effect？

很多人在遇到这些问题之后，就会选择在依赖项上弄虚作假。

其实你需要的是更优雅地写 effect hook。一个好的开始就是<b>减少依赖。</b>

如何减少依赖？

- 前面的例子中已经提到了，可以让 state hook 中的 `setSomeState()` 接受一个函数，这样就可以减少依赖。
- 使用 `useReducer` 来减少依赖。调用 `dispatch` 函数并<b>不</b>依赖于当前状态值。而且，之前已经介绍过了，React 会保证 `dispatch` 函数不变。所以把 `dispatch` 函数从依赖项中省去是安全的。（`useReducer` 真是一个很好的可以减少依赖的妙招！）
- 改进或者重新设计 effect 函数，尝试传递尽可能少的信息。
- 完整的列表和例子，可以在这里看到：https://react.dev/learn/you-might-not-need-an-effect

## useRef

Ref 意为引用。通过 `useRef` 我们可以创建一个引用。

```js
const ref = useRef(initialValue);
```

创建的方式很简单，`useRef` 接收一个参数，作为这个引用的初始值。

值的获取和修改也很简单：

```js
console.log(ref.current);
ref.current = nextValue;
```

通过 `.current` 直接进行访问和修改即可。

我们来看一下这个例子：

```js
// example 5
function App() {
  const [count, setCount] = useState(0);
  const cntRef = useRef(0);
  
  function addCount() {
    setCount(count + 1);
    cntRef.current ++;
  }
  
  useEffect(() => {
    setTimeout(() => {
      console.log("State: " + count + "; Ref: " + cntRef.current);
    }, 2000);
  }, [count]);
  
  return (
    <div>
      <div>Count: {count}</div>
      <button onClick={addCount}>+1</button>
    </div>
  );
}
```

<iframe src="https://codepen.io/deluxurousCodePen/pen/NWzqwoQ"/>

根据 console 中打印的结果，不难发现 ref 中的值表现和 state 不同。各个“副本”中通过 ref 所取到的值都是一样的且是最新的。

我们可以想象，ref 本身仅仅是一个引用。对于每一个副本来说，虽然它捕获了全部的 states 和 props，但是所有的“副本”中的 ref 都指向了同一个地方，所以通过 ref 获取到的都是相同的且是最新的值。

### 一些性质

除了上面这个例子所体现的特性之外，ref 还有一些特点：

- 修改 `ref.current` 并不会导致组件重新渲染。我们知道 state 的更新会触发组件的 re-render。但是 ref 并不会。
- Ref 的修改是同步的，而 state 的修改是异步的。也就是说，ref 修改后更新的值立即可用。
- Ref 的值在多次渲染之间是持久化的。

### 对象的 ref 属性

可以通过设置 DOM 对象的 ref 属性把 DOM 对象传递给 ref。

```js
function App() {
  const mRef = useRef();
  
  return (
    <div>
      <myComponent ref={mRef}>...</myComponent>
    </div>
  );
}
```

在这个例子中，`<myComponent>` 的 `ref` 属性为 `mRef`，所以组件创建后，可以通过 `mRef` 访问 `myComponent` 实例。比如 `mRef.current.value` 可以访问 `myComponent` 实例中的 `value` 值；`mRef.current.doSomething()` 可以触发 `myComponent` 实例的 `doSomething` 方法。

值得注意的是：

- 通过这种方法获取到的组件实例是 sealed 的。这意味着不能借由 `ref.current` 给对象添加属性、删除属性。
- 只能给 class component 设置 ref 以获取其实例。Function component 不适用这种方法。
- `ref` 属性是 React 组件的特殊属性。无法直接通过 props 把 ref 引用传递给更深层的组件。如果你想要这么做，可以尝试使用 `forwardRef`。

### createRef

你可能还看到过一个函数 `createRef`。这个函数也可以创建引用，但是它和 `useRef` 不同。

`useRef` 在每次渲染时都返回同一个对象，但是 `createRef` 每次会重新创建对象。

## useContext

我们可以通过 props 把父组件内的值传入子组件，但是如果想要传入深层子组件就会变得很麻烦。我们可以通过 `createContext` 创建上下文，使用 provider 提供上下文，在消费者子组件中就可以通过 `useContext` 引用上下文。

这是一个 theme context 的例子：

```js
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

// 创建 context
const ThemeContext = React.createContext(themes.light);

function App() {
  return (
    // 提供 context，并设置 context 内容
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  // 使用 context
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  );
}
```

如果你熟悉 class component 中的 context API，这里的 `useContext` 其实类似于 `<ThemeContext.Consumer>`。

在 `useContext` 时，React 会返回<b>最近</b>的 Provider 中的<b>最新</b>的 value。

值得留意的是，当 Provider 的 value 发生变化时，它的子组件都会重新渲染。所以一般我们只会选择把不常变动的值放在 context 中。

## useMemo

`useMemo` 是一个高级钩子，可以记忆一些值。它的使用方法是：

```js
const memorizedValue = useMemo(() => fn, deps);
```

`useMemo` 的第一个参数是一个函数，用于使用依赖项计算 `memorizedValue` 的值；第二项是一个数组，为依赖项。当依赖项中的值发生变化时，React 会重新调用 `fn` 计算 `memorizedValue` 的值；否则 React 不会轻易在每次渲染时都重新计算其值。

```js
function slowFunction(num) {
  console.log('Calling Slow Function');
  // ....
}

const App = () => {
  const [number, setNumber] = useState(0);
  const [count, setCount] = useState(0);

  const answer = useMemo(() => slowFunction(number), [number]);

  const addCount = () => {
    setCount(count + 1)
  }
  
  return (
    <>
        <div>count: {count}</div>
        <div>number: {number}</div>
        <button onClick={addCount}>+1</button>
    </>
  )
};
```

在这个例子中，使用 number 计算 answer 的函数耗时很长，所以我们要尽可能避免不必要的额外计算。使用 `useMemo` 后，只有 `number` 的值发生改变时才会重新调用 `slowFunction` 进行计算；如果只是点击 +1 按钮更新 `count`，那么 `answer` 的值会被记忆，无需每次重新计算。

<div class="callout callout-bg-2 callout-border-2">
<div class='callout-emoji'>🔔</div>
<p><code>useMemo</code> 应当只用来减少不必要的计算，优化性能。所有的副作用都应该写在 <code>useEffect</code> 中，不应出现在 <code>useMemo</code> 中。</p>
</div>

<div class="callout callout-bg-2 callout-border-2">
<div class='callout-emoji'>🔔</div>
<p>在未来，React 可能还会在某些特定情况下重新计算 memo 值，不管依赖项是否发生变化。</p>
</div>

## useCallback

```js
const memorizedCallback = useCallback(fn, deps);
```

`useCallback` 和 `useMemo` 基本一致。不同之处在于，`useMemo` 存储的是用 `fn` 计算出的值，而 `useCallback` 存储 `fn` 这个函数。当依赖项值不变时，这个函数也不会发生变化。

为什么在组件中声明函数时，我们需要 useCallback？直接写 `function XXX() {}` 不行吗？实际上确实不太行，容易出现问题。如果你需要将这个函数作为参数传递给一些子组件，那么当这个函数变化时，子组件会被重新渲染。然而这个函数的变化可能仅仅是因为它被重新声明了——你的当前组件的某个跟这个函数无关的 state 变了，导致了当前组件被重新渲染，而在重新渲染时，没有使用 `useCallback` 的函数会被重新声明，而被重新声明的函数，尽管函数体完全一样，也会被认为是发生了变化。你可以理解为它被重新创建了一次，内存地址变了。其实，很可能这个函数本身并不需要被重新声明，但是它就是被重新声明了，导致子组件认为传进来的函数变了，而被迫重新渲染。`useCallback` 可以解决这个问题，使用它创建的函数，能够保证只有在 `deps` 里面的元素的内容变化时才重新声明。当然，`deps` 写的比实际需要的少也会出现问题，例如函数该被重新声明的时候没有被重新声明，导致其中引用的变量（当前组件的 state）指向了此前某个时间的 state 而非最新的 state。参考上文 useEffect 小节中提到的闭包问题。

另外，`useCallback(fn, deps)` 其实等价于 `useMemo(() => fn, deps)`。

## 禁忌事项

1. 少写 `deps` 数组，某些依赖项没有放进去。
2. 在除了组件最外层的地方使用任何 Hook。也包括在 `if` 之后使用 Hook。这是因为，在组件对应的函数第一次被执行时，所有的 Hook 都应当被跑一次，这样 React 才能知道这个组件都以什么顺序使用了哪些 Hook（这很重要！）。

```js
// 错误：
function App() {
  const { data: users, isLoading, error } = useSWR("/api/user/list");
  
  if (isLoading) return <Loading />
  if (error) return <Error reason={error.message} />
  if (users.length === 0) return null
  
  const [userId, setUserId] = useState(users[0].id)
  return <User id={userId} onClick={() => {
    setUserId(users.pop().id);
  }}>
}
```

上面这段代码中就出现了在 `if` 之后使用了 Hook（`useState`）的问题。

在 App 组件第一次跑时，由于 SWR 进行网络请求需要一定的时间，因此 `isLoading` 一定是 `true`，那么 `useState` 就不会跑。后面再跑 App 组件时，例如当 SWR 完成了请求、`isLoading` 和 `data` 均发生了改变，此时会跑到第 9 行而执行 `useState`。对于 React 来讲，这是非常无厘头的——它应当在状态改变时重绘组件，但是现在发生了状态的增加，凭空冒出来一个新的 state，那么它应该重新渲染吗？

更重要的是，其实你的不同的 state 在 React 看来都是 `useState` 调用。React 为了区分这些 state（从而比较到底哪些 state 在两次渲染中间发生了怎样的改变），采用了基于调用顺序的区分方法。

首先一个很简单的事实：我们使用的是 `const [x, setX] = useState(0)`，那么无论如何，`x` 一定是 `const`（<b>常量</b>）。这也就意味着<b>没有任何办法</b>可以修改 `x` 的值，它将始终为 `0`。这是 JS 世界的铁律，无法绕过。你可能会觉得，那我 `setX(1)` 又是如何令 `x` 变成 `1` 的呢，这岂不是矛盾了？然而并不是。调用 `setX` 意味着组件的总体的 state 发生了改变。此时，React 会重新执行一遍这个组件所对应的函数，从而获得<b>新的一份</b> `x` 和 `setX`。在已经被卸载并销毁的旧组件（函数）的作用域里面，x 变量的值仍然是 0。在新执行得到的这个组件（函数）里面，x 变量的值从最开始就是 1，且将永远为 1。

然而 React 并不具备源代码级别的分析能力，它无法得知某个 `useState` 被解构赋值成了什么名字。你完全可以给它起个辨识度很高的名字，例如 timer 和 userId：

```js
const [timer, setTimer] = useState(100);
const [userId, setUserId] = useState(10001);
```

但对于 React 来讲，它看到的就只是状态的顺序，也就是调用 `useState` Hook 的顺序。所以你的 timer 在 React 里面是 state 0，你的 userId 在 React 里面是 state 1。就这么简单。

那么，如果你有两个 state：

```js
const [a, setA] = useState(1);
const [b, setB] = useState(2);
```

但是你使用了某种恶魔的方式使得他们在某两个时刻的中间，值改变了，但是调用顺序也变了：

```js
let initRun = true;
function App() {
  if(initRun) {
    const [a, setA] = useState(1);  // React 看到的：state 0
    const [b, setB] = useState(2);  // React 看到的：state 1
    initRun = false;  // 为了区分当前是不是第一次挂载
  } else {
    const [b, setB] = useState(1);  // React 看到的：state 0
    const [a, setA] = useState(2);  // React 看到的：state 1
  }
  
  const [x, setX] = useState(0);  // React 看到的：state 2
  setX(1); // 仅仅是为了触发重绘。React 意识到 state 2 变了，因此这个 App 函数会被重新执行
}
```

那么在 React 看来，第二次渲染时候的 state a 其实对应到第一次渲染的时候的 state b。因此在你看来 a 的 state 从 1 变成 2，b 的 state 从 2 变成 1，但是在 React 看来 state 1 的值一直是 1 没有改变，state 2 的值一直是 2 没有改变。

类似地，如果你在第一次渲染时没有调用某个 Hook，但是从第 n 次渲染开始调用这个 hook，React 就不知道该如何把它跟上一个时刻的状态进行对应，甚至可能导致状态的对应是完全错位的。

### 总结

总之把钩子们都写在最外面、最上面就好，别整花活。

你可以在 https://legacy.reactjs.org/docs/hooks-rules.html 找到所有的禁忌事项。

## 自定义钩子

https://react.dev/learn/reusing-logic-with-custom-hooks

理解了常用的钩子之后，所谓的<b>自定义钩子</b>仅仅是把这些逻辑提取出来罢了。当你遇到不同的组件中存在同样逻辑的代码，就可以考虑使用自定义钩子将他们封装起来，以减少重复代码、增强各个组件的可维护性。

看一下这一段代码：

```js
function App() {
  const [product, setProduct] = useState(0);
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  
  useEffect(() => {
    setProduct(a * b);
  }, [a, b]);
  
  return (
    <div>
      <div>Product: {product}</div>
      <div>a: {a}  b: {b}</div>
      <button onClick={() => setA(a + 1)}>a++</button>
      <button onClick={() => setA(a - 1)}>a--</button>
      <button onClick={() => setB(b + 1)}>b++</button>
      <button onClick={() => setB(b - 1)}>b--</button>
    </div>
  );
}
```

这是一个简单的计算乘积的例子。我们可以直接把中间这一段提取出来：

```js
const useProduct = (initialA, initialB) => {
  const [product, setProduct] = useState(0);
  const [a, setA] = useState(initialA);
  const [b, setB] = useState(initialB);
  
  useEffect(() => {
    setProduct(a * b);
  }, [a, b]);
  
  return [product, a, b, setA, setB];
}
```

中间这一段只是一个简单的复制粘贴。我们把它包装在了一个 `useProduct` 函数中，接收两个参数——`a` 和 `b` 的初始值，并返回一个数组，对外提供了三个状态的值，以及修改状态 `a` 和 `b` 的两个函数。

组件的代码便简化为了：

```js
function App() {
  const [product, a, b, setA, setB] = useProduct(0, 0);
  
  return (
    <div>
      <div>Product: {product}</div>
      <div>a: {a}  b: {b}</div>
      <button onClick={() => setA(a + 1)}>a++</button>
      <button onClick={() => setA(a - 1)}>a--</button>
      <button onClick={() => setB(b + 1)}>b++</button>
      <button onClick={() => setB(b - 1)}>b--</button>
    </div>
  );
}
```

可以看出，自定义钩子其实就是将 React 提供的几个钩子进行组合封装。

有几点值得注意的地方：

- 自定义钩子的名称<b>一定要以 </b><b>use</b><b> 开头</b>。这是因为「Only Hooks and components can call other Hooks」，而使用 `use` 开头的函数，按照 React 命名规约，会被 linter 标记为一个 Hook。这样，linter 就会允许它调用其它 Hook，同时禁止它被非 Hook/Component 的函数所调用。这可以最大程度上确保你的应用程序正常工作。
- 自定义钩子可以被看作是一个普通的函数，你可以指定它接受什么参数、返回什么结果。根据业务和逻辑封装需要，它甚至可以什么参数都不接受、或者什么结果都不返回。

## 实战 —— 使用 useEffect 实现网络请求

在这里我会提供几段不同的实现，它们之间的设计是层层递进的。

进行网络请求，就必定会用到异步。看一下这个写法：

```js
// version 1
function App() {
  const [data, setData] = useState("");
  
  useEffect(async () => {
    const result = await fetch(
      'https://apiurl.com/someapi?query=123',
    );
    setData(result.data);
  }, []);
  
  return (
    <div>Data: {data}</div>
  );
}
```

思考：

- `useEffect(async () => {...}, [...]);` 的写法合理吗？如果你有空自己写一下并运行，可以看到 React 报了 Warning/Error，为什么？

改进一下：

```js
// version 2
function App() {
  const [data, setData] = useState("");
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        'https://apiurl.com/someapi?query=123',
      );
      setData(result.data);
    }
    fetchData();
  }, []);
  
  return (
    <div>Data: {data}</div>
  );
}
```

思考：

- 这段代码可以正常运行并获得预期效果吗？
- 如果把依赖项留空（把 `[]` 也删掉），会发生什么？

尝试加入加载提示和异常提示：

```js
// version 3
function App() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await fetch(
          'https://apiurl.com/someapi?query=123',
        );
        setData(result.data);
      } catch (e) {
        setErr(true);
      }
      setLoading(false);
    }
    fetchData();
  }, []);
  
  return (
    <>
      {loading && (
        <div>Loading...</div>
      )}
      {err && (
      <div>Something went wrong!</div>
      )}
      {(!loading && !err) && (
        <div>Data: {data}</div>
      )}
    </>
  );
}
```

思考：

- 下一步，想要可以修改 api 请求中的 `query` 参数，应该怎么写？

```js
// version 4
function App() {
  const [data, setData] = useState("");
  const [query, setQuery] = useState(123);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await fetch(
          `https://apiurl.com/someapi?query=${query}`,
        );
        setData(result.data);
      } catch (e) {
        setErr(true);
      }
      setLoading(false);
    }
    fetchData();
  }, [query]);
  
  return (
    <>
      {loading && (
        <div>Loading...</div>
      )}
      {err && (
      <div>Something went wrong!</div>
      )}
      {(!loading && !err) && (
        <div>Data: {data}</div>
      )}
      <button onClick={() => setQuery(123)}>123</button>
      <button onClick={() => setQuery(234)}>234</button>
      <button onClick={() => setQuery(666)}>666</button>
    </>
  );
}
```

思考：

- 当组件卸载时，如何取消状态的修改（终止请求），避免内存泄漏？
- 当短时间内重复多次请求时，由于各种原因，可能会遇到后请求的数据比先请求的更早返回，这会导致数据不正确。（比如，先请求 123，再请求 234，结果 123 的 response 比 234 返回的更晚，导致页面上显示的是 123 的请求数据。）怎么避免这种情况？

```js
// version 5
function App() {
  const [data, setData] = useState("");
  const [query, setQuery] = useState(123);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  
  useEffect(() => {
    let cancel = false;
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await fetch(
          `https://apiurl.com/someapi?query=${query}`,
        );
        if (!cancel) setData(result.data);
      } catch (e) {
        if (!cancel) setErr(true);
      }
      if (!cancel) setLoading(false);
    }
    fetchData();
    return () => {
      cancel = true;
    }
  }, [query]);
  
  return (
    <>
      {loading && (
        <div>Loading...</div>
      )}
      {err && (
      <div>Something went wrong!</div>
      )}
      {(!loading && !err) && (
        <div>Data: {data}</div>
      )}
      <button onClick={() => setQuery(123)}>123</button>
      <button onClick={() => setQuery(234)}>234</button>
      <button onClick={() => setQuery(666)}>666</button>
    </>
  );
}
```

现在功能基本完善了，但还是可以尝试思考：

- 如果还需要支持修改 api 路径，可以怎么写？
- 如果同一页面中存在很多不同的网络请求，怎么利用 `useRef` 使得取消请求更为方便？
- 当状态变得很复杂时，如何用 `useReducer` 改写这一部分，以厘清 effect 中设置状态的逻辑？
- 如何把这一部分提取成一个自定义钩子？
- 如何把这些 api 放在 context 中提供给多个子页面？
- ……

## 有用的链接

- https://reactjs.org/docs/hooks-rules.html
- https://reactjs.org/docs/hooks-faq.html （这个 FAQ 可能涵盖了你的大多数疑问，快去看看吧！）
- https://reactjs.org/docs/thinking-in-react.html （Think in React!）

## 参考资料

- https://overreacted.io/a-complete-guide-to-useeffect/
- https://www.robinwieruch.de/react-hooks-fetch-data/

> [[必读] React Hooks](wikcnAj97pK5WexPjxFZ3AUEWRc)

