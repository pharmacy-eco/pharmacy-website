interface IPagination {
  pageSize: number;
  pageIndex: number;
  totalPages: number;
  totalItems: number;
}

interface IApiEndpoint {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  url: string;
}

export type { IPagination, IApiEndpoint };
