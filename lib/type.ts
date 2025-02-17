import type {
  RequestListener,
  IncomingMessage,
  ServerResponse
} from "node:http";

export type RequestMethodUpper =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE"
  | "HEAD"
  | "OPTIONS"
  | "TRACE"
  | "CONNECT";

export type RequestMethodLower =
  | "get"
  | "post"
  | "put"
  | "patch"
  | "delete"
  | "head"
  | "options"
  | "trace"
  | "connect";

export type RequestMethod = RequestMethodUpper | RequestMethodLower;

export type HeaderValue = number | string | readonly string[];
export type HeaderMap = Map<string, HeaderValue>;

export type RouterValue = { method: RequestMethodUpper; handler: Function };
export type RouterMap = Map<string, RouterValue>;

export enum MatchRouteStatus {
  NOTFOUND = 0,
  METHODNOTALLOWED,
  SUCCESS
}
export type MatchRouteMethod = (
  route: string,
  method: string
) => MatchRouteStatus;

export type ParseQueryObject = {
  route: string;
  query: Object;
};

export type ParseQueryMethod = (url: string) => ParseQueryObject;

export type HandleRequestMethod = RequestListener<
  typeof IncomingMessage,
  typeof ServerResponse
>;

export type ListenMethod = (port: number, callback: Function) => void;

export type OnMethod = (
  route: string,
  method: RequestMethod,
  callback: Function
) => void;

export type UseMethod = (middleware: Function) => void;

export type SetHeaderMethod = (
  headerKey: string,
  headerValue: HeaderValue
) => void;
