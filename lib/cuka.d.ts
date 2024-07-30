import { IncomingMessage, ServerResponse } from "http";

declare module "cuka" {
  interface IQueryObject {
    route: string;
    query: Object;
  }

  interface IRequest {
    query: Object;
    route: string;
    body: string;
    method: string;
  }

  interface IContext {
    req: IncomingMessage;
    res: ServerResponse;
    request: IRequest;
    setHeader: (name: string, value: HeaderValue) => this;
    end: (cb?: () => void) => this;
    end: (chunk: any, cb?: () => void) => this;
    end: (chunk: any, encoding: BufferEncoding, cb?: () => void) => this;
  }

  type HeaderValue = number | string | readonly string[];
  type MiddlewareFunction = (ctx: IContext) => void;

  class Cuka {
    private _port: number;
    private _httpServer: number;
    private _router: Map<string, [string, Function]>;
    private _header: Map<string, HeaderValue>;
    private _middlewares: Function[];

    private _setGlobalHeader(res: ServerResponse): void;
    private _matchRoute(route: string, method: string): number;
    private _parseQuery(url: string): IQueryObject;
    private _handleRequest(req: IncomingMessage, res: ServerResponse): void;

    listen(port: number, callback: () => void): void;
    on(route: string, method: string, callback: MiddlewareFunction): void;
    use(middleware: MiddlewareFunction): void;
    setHeader(name: string, value: HeaderValue): void;
  }

  export default Cuka;
}
