type IRequestPagination<T extends Record<string, any>> = T & {
  page?: number | string;
  page_size?: number | string;
  limit?: number | string;
  sort_by?: string;
  order?: "asc" | "desc";
};

interface UserLoginRequest {
  username: string;
  password: string;
}

interface UserRegisterRequest {
  name: string;
  phone: string;
  email?: string;
  address: string;
  password: string;
}

export type { IRequestPagination, UserLoginRequest, UserRegisterRequest };
