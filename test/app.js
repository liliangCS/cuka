const Cuka = require("cuka");

const app = new Cuka();

app.listen(3000, () => {
  console.log("Server is listening on http://127.0.0.1:3000");
});

app.on("/", "get", (ctx) => {
  ctx.end("Hello, World!");
});
