import { createServer } from "node:http";

class Cuka {
  constructor() {
    this.port = null;
    this.httpServer = null;
  }

  /**
   * 绑定端口并监听
   * @param {number} port - 要监听的端口号
   * @param {Function} [callback] - 端口监听成功的回调函数
   */
  listen(port, callback) {
    this.httpServer = createServer();
    this.httpServer.listen(port, "127.0.0.1", () => {
      if (callback) callback();
    });
  }
}

export default Cuka;
