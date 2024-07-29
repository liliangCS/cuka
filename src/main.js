import Cuka from "./cuka.js";

const app = new Cuka();

app.listen(3000, () => {
  console.log("服务已启动: http://127.0.0.1:3000");
});
