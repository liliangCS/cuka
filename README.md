# Cuka

一个基于 NodeJS 的轻量级且无任何其他依赖的 HTTP 服务开发框架。同时支持cjs和esm两种模块化规范。

### 安装

```cmd
npm install cuka
```

### 基础用法

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
