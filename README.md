# Cuka

一个基于 NodeJS 的轻量级且无任何其他依赖的 HTTP 服务开发框架。同时支持 cjs 和 esm 两种模块化规范。

框架特性：
- 支持自定义中间件函数，支持对请求进行预处理
- 内置错误处理，保证服务稳定运行不崩溃，安全运行一百年
- 路由、方法、处理函数 三段式设计，丝滑的开发体验

### 安装

```cmd
npm install cuka
```

### 快速上手

```js
import Cuka from "cuka";

const app = new Cuka();

app.listen(3000, () => {
  console.log("Server is listening on http://127.0.0.1:3000");
});

app.on("/", "get", (ctx) => {
  ctx.end("Hello, World!");
});
```

### 设置响应头部

1. 设置所有请求的响应头部

```js
import Cuka from "cuka";

const app = new Cuka();

app.listen(3000, () => {
  console.log("Server is listening on http://127.0.0.1:3000");
});

// 设置全局响应头部，对每个进来的请求生效
app.setHeader("Content-Type", "text/plain;charset=utf-8");

app.on("/", "get", (ctx) => {
  ctx.end("Hello, World!");
});
```

2. 设置单个请求的响应头部

```js
import Cuka from "cuka";

const app = new Cuka();

app.listen(3000, () => {
  console.log("Server is listening on http://127.0.0.1:3000");
});

app.on("/", "get", (ctx) => {
  // 设置单个请求的响应头部，只对当前请求生效
  ctx.setHeader("Content-Type", "text/plain;charset=utf-8");
  ctx.end("Hello, World!");
});
```

### 使用中间件

中间件函数永远在请求到达路由方法处理函数之前调用。

```js
import Cuka from "cuka";

const app = new Cuka();

app.listen(3000, () => {
  console.log("Server is listening on http://127.0.0.1:3000");
});

// 使用中间件：打印每个请求的信息：路由、方法
app.use((ctx) => {
  const { route, method } = ctx.request;
  console.log(`${route} --- ${method}`);
});

app.on("/", "get", (ctx) => {
  ctx.end("Hello, World!");
});
```

### 参数解析

1. 解析query参数

场景：假设服务端收到一个get请求，请求的路由为：`/user?name=张三`。

```js
import Cuka from "cuka";

const app = new Cuka();

app.listen(3000, () => {
  console.log("Server is listening on http://127.0.0.1:3000");
});

app.on("/user", "get", (ctx) => {
  console.log(ctx.request.query); // 这里将打印：{ name: "张三" }
});
```

2. 解析body参数

场景：假设服务端收到一个post请求，请求的路由为：`/user`, 并且请求体携带了JSON数据 { name: "张三" }。

```js
import Cuka from "cuka";

const app = new Cuka();

app.listen(3000, () => {
  console.log("Server is listening on http://127.0.0.1:3000");
});

app.on("/user", "post", (ctx) => {
  console.log(ctx.request.body); // 这里将打印：{ name: "张三" }
});
```
