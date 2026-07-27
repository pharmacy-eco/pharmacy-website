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

interface ApiResponse<T> {
  requestId: string;
  at: string;
  error: {
    code: number;
    message: string;
  };
  data?: T;
}

interface UserRegisterResponseData {
  id?: number;
  fullname: string;
  username: string;
  phone: string;
  email?: string;
  address: string;
  role_id: 1;
  status: 1;
}

interface UserLoginResponseData {
  access_token: string;
  expires_in: string;
  dataUser: {
    id: number;
    fullname: string;
    username: string;
    phone: string;
    email?: string;
    address?: string;
    role_id: number;
    status: number;
    avatar?: string;
  };
}

type UserRegisterResponse = ApiResponse<UserRegisterResponseData>;
type UserLoginResponse = ApiResponse<UserLoginResponseData>;

export type {
  ApiResponse,
  IResponseCommon,
  IResponseData,
  IResponsePagination,
  UserLoginResponse,
  UserLoginResponseData,
  UserRegisterResponse,
  UserRegisterResponseData
};
