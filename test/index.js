import Cuka from "../src/cuka.js";

const app = new Cuka();

app.use(async (ctx) => {
  //   console.log("中间件触发");
  //   ctx;
});

app.listen(3000, () => {
  console.log("服务已启动");
});

app.on("/", "get", async (ctx) => {
  throw Error("123");
});
