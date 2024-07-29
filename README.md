# Cuka

一个基于 NodeJS 的轻量级且无任何其他依赖的 HTTP 服务开发框架。

### 安装

```cmd
npm install cuka
```

### 使用

```js
const Cuka = require("cuka");

const app = new Cuka();

app.listen(3000, () => {
  console.log("Server is listening on http://127.0.0.1:3000");
});

app.on("/", "get", async (ctx) => {
  ctx.end("Hello, World!");
});
```
