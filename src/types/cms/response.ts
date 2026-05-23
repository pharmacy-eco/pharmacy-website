interface IResponseCommon {
  at: string;
  error?: {
    code: number;
    message: string;
  };
  requestId: string;
}

interface IResponseData<T> extends IResponseCommon {
  data: T;
}

interface IResponsePagination<T> extends IResponseCommon {
  data: {
    items: T[];
    pageIndex: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}

export type { IResponseCommon, IResponseData, IResponsePagination };
