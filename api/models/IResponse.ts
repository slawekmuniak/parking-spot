export interface IBody {
  [key: string]: unknown;
}

export interface IResponse {
  status: number;
  body: IBody;
};

export const OkResponse = (body: IBody): IResponse => {
  return {
    status: 200,
    body: body
  }
};

export const ErrorResponse = (error: string): IResponse => {
  return {
    status: 500,
    body: {
      error
    }
  }
};