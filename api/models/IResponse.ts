export interface IResponse {
  status: number;
  body: { [key: string]: unknown; };
}