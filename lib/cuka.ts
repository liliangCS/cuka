import type { Server } from "node:http";
import { createServer } from "node:http";
import {
  RequestMethodUpper,
  RouterMap,
  HeaderMap,
  MatchRouteStatus,
  MatchRouteMethod,
  ParseQueryMethod,
  HandleRequestMethod,
  ListenMethod,
  OnMethod,
  UseMethod,
  SetHeaderMethod
} from "./type";

class Cuka {
  private _port: number | null;
  private _httpServer: Server | null;
  private _router: RouterMap;
  private _header: HeaderMap;
  private _middlewares: Array<Function>;
  constructor() {
    this._port = null;
    this._httpServer = createServer();
    this._router = new Map();
    this._header = new Map();
    this._middlewares = [];
  }

  private _matchRoute: MatchRouteMethod = (route, method) => {
    if (!this._router.has(route)) return MatchRouteStatus.NOTFOUND;
    if (this._router.get(route)?.method !== method.toUpperCase())
      return MatchRouteStatus.METHODNOTALLOWED;
    return MatchRouteStatus.SUCCESS;
  };

  private _parseQuery: ParseQueryMethod = (url) => {
    const query: { [key: string]: string } = {};
    if (!url.includes("?")) {
      return { route: url, query };
    }
    const [route, queryStr] = url.split("?");
    queryStr.split("&").forEach((item) => {
      const [first, second] = item.split("=");
      query[first] = decodeURIComponent(second);
    });
    return { route, query };
  };

  private _handleRequest: HandleRequestMethod = (req, res) => {};

  listen: ListenMethod = (port, callback) => {
    this._port = port;
    if (!this._httpServer) throw new Error("Cuka: 未初始化实例");
    this._httpServer.listen(this._port, "127.0.0.1", () => {
      if (callback) callback();
    });
    this._httpServer.on("request", this._handleRequest);
  };

  on: OnMethod = (route, method, callback) => {
    this._router.set(route, {
      method: method.toUpperCase() as RequestMethodUpper,
      handler: callback
    });
  };

  use: UseMethod = (middleware) => {
    this._middlewares.push(middleware);
  };

  setHeader: SetHeaderMethod = (headerKey, headerValue) => {
    this._header.set(headerKey, headerValue);
  };
}
