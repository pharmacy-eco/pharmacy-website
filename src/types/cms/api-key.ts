import { IResponseData, IResponsePagination } from "@/types/cms/response";

export interface SortOption {
  field: string;
  order: "asc" | "desc";
}

export interface ApiKeyFilterDto {
  keyword?: string;
  status?: 1 | 2;
  pageSize?: number;
  pageIndex?: number;
  sort?: SortOption;
}

export interface CreateApiKeyDto {
  name: string;
  api_key: string;
  model?: string;
  expires_at: string;
  token_quota: number;
  status: 1 | 2;
}

export interface UpdateApiKeyDto {
  name: string;
  api_key?: string;
  model?: string;
  expires_at: string;
  token_quota: number;
  status: 1 | 2;
}

export interface ApiKeyItemDto {
  id: number;
  name: string;
  api_key_masked: string;
  model: string;
  expires_at: string;
  token_quota: number;
  token_used: number;
  token_remaining: number;
  status: number;
  created_at: string;
  updated_at: string;
}

export type ApiKeyListResponse = IResponsePagination<ApiKeyItemDto>;
export type ApiKeyResponse = IResponseData<ApiKeyItemDto>;
