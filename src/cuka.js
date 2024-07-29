import { createServer } from "node:http";

class Cuka {
  constructor() {
    this._port = null;
    this._httpServer = null;
    this._router = new Map();
    this._header = new Map();
  }

  /**
   * 绑定端口并监听
   * @param {number} port - 要监听的端口号
   * @param {Function} [callback] - 端口监听成功的回调函数
   */
  listen(port, callback) {
    this._port = port;
    this._httpServer = createServer();
    this._httpServer.listen(this._port, "127.0.0.1", () => {
      if (callback) callback();
    });
    this._httpServer.on("request", this._handleRequest.bind(this));
  }

  /**
   * 处理请求
   * @param {string} route - 请求的路由
   * @param {string} method - 请求的方法
   * @param {Function} callback - 处理该请求的回调函数
   */
  on(route, method, callback) {
    this._router.set(route, [method.toUpperCase(), callback]);
  }

  /**
   * 设置全局的响应头部
   * @param {string} name
   * @param {number | string | readonly string[]} value
   */
  setHeader(name, value) {
    this._header.set(name, value);
  }

  _setGlobalHeader(res) {
    const kvpIterator = this._header.entries();
    for (const [key, value] of kvpIterator) {
      res.setHeader(key, value);
    }
  }

  /**
   * 0 --- 不存在匹配的地址
   * 1 --- 存在匹配的地址，不存在匹配的方法、
   * 2 --- 存在匹配的地址和方法
   */
  _matchRoute(route, method) {
    if (!this._router.has(route)) return 0;
    if (this._router.get(route)[0] != method.toUpperCase()) return 1;
    return 2;
  }

  _parseQuery(url) {
    const query = {};
    if (!url.includes("?")) {
      return { route: url, query };
    }
    const [route, queryStr] = url.split("?");
    queryStr.split("&").forEach((item) => {
      const [first, second] = item.split("=");
      query[first] = decodeURIComponent(second);
    });
    return { route, query };
  }

  _handleRequest(req, res) {
    const { route, query } = this._parseQuery(req.url);
    const matchResult = this._matchRoute(route, req.method);

    if (matchResult === 0) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
      return;
    }

    if (matchResult === 1) {
      res.writeHead(405, { "Content-Type": "text/plain" });
      res.end("Method Not Allowed");
      return;
    }

    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", async () => {
      const ctx = {
        req,
        res,
        request: { query, route, body, method: req.method },
        setHeader: res.setHeader.bind(res),
        end: res.end.bind(res)
      };

      try {
        this._setGlobalHeader(res);
        const callback = this._router.get(route)[1];
        await callback(ctx);
      } catch (error) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
        console.error(error);
      }
    });
  }
}

export default Cuka;
