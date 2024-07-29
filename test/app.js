const Cuka = require("../src/cuka.js");

const app = new Cuka();

app.use(async (ctx) => {
  console.log("Middleware executed");
});

app.on("/", "get", async (ctx) => {
  ctx.setHeader("Content-Type", "text/plain");
  ctx.end("Hello, World!");
});

app.listen(3000, () => {
  console.log("Server is listening on http://127.0.0.1:3000");
});
