import { http } from "@/lib/http";
import { UserLoginRequest, UserRegisterRequest } from "@/types/web/request";
import { UserLoginResponse, UserRegisterResponse } from "@/types/web/response";

const fnLogin = async (payload: UserLoginRequest): Promise<UserLoginResponse | undefined> => {
  return await http.post<UserLoginRequest, UserLoginResponse | undefined>("/user/login", payload);
};

const fnRegister = async (payload: UserRegisterRequest): Promise<UserRegisterResponse | undefined> => {
  return await http.post<UserRegisterRequest, UserRegisterResponse | undefined>("/user/register", payload);
};

const WebAuthService = {
  fnLogin,
  fnRegister
};

export default WebAuthService;
