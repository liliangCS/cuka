# Cuka

一个基于 NodeJS 的轻量级且无任何其他依赖的 HTTP 服务开发框架。同时支持 cjs 和 esm 两种模块化规范。

### 安装

```cmd
npm install cuka
```

### 快速上手

```js
const Cuka = require("cuka");

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
const Cuka = require("cuka");

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
const Cuka = require("cuka");

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
