import { IResponseData, IResponsePagination } from "@/types/cms/response";
import { IRequestPagination } from "@/types/cms/request";

interface ILoginPayload {
  email?: string;
  username?: string;
  password: string;
}

interface IForgotPasswordPayload {
  password: string;
  password_confirm: string;
}

interface IUser {
  id: number;
  address: string;
  avatar: string;
  email: string;
  fullname: string;
  gender: number;
  password: string;
  phone: string;
  role_id: number;
  status: number;
  username: string;
  verify_at: string | null;
  created_at: string;
  created_by: number;
  deleted_at: string | null;
  deleted_by: number | null;
  updated_at: string;
  updated_by: number;
}

interface ILoignRes {
  access_token: string;
  dataUser: IUser;
  expires_in: string;
}

interface IUserFilter {
  keyword: string;
}

type IUserResponse = IResponseData<IUser>;
type ILoginResponse = IResponseData<ILoignRes>;
type IUserListResponse = IResponsePagination<IUser>;
type IUserRequest = IRequestPagination<IUserFilter>;

export type {
  ILoginPayload,
  IForgotPasswordPayload,
  IUser,
  IUserRequest,
  IUserResponse,
  ILoginResponse,
  IUserListResponse
};
