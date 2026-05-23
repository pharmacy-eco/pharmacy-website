import { E_KEY_COOKIE } from "@/enums/common";
import { getCookie } from "@/lib/cookie";
import { http } from "@/lib/http";
import { ILoginPayload, ILoginResponse, IUserListResponse, IUserRequest, IUserResponse } from "@/types/cms/auth";

const fnGetUserInfo = async (): Promise<IUserResponse | undefined> => {
  return await http.get<any, IUserResponse>("/profile");
};

const fnGetListUser = async (params: IUserRequest): Promise<IUserListResponse | undefined> => {
  return await http.get<any, IUserListResponse>("/users", {
    params
  });
};

const fnLogin = async (payload: ILoginPayload): Promise<ILoginResponse | undefined> => {
  return await http.post<ILoginPayload, ILoginResponse | undefined>("/login", payload);
};

const fnRefreshToken = async (): Promise<IUserResponse | undefined> => {
  const token = getCookie(E_KEY_COOKIE.refresh_token);
  if (!token) return;
  return await http.request({
    url: "/auth/refresh-token",
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const AuthService = {
  fnLogin,
  fnGetUserInfo,
  fnGetListUser,
  fnRefreshToken
};

export default AuthService;
