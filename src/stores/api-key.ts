import { create } from "zustand";
import { http } from "@/lib/http";
import { IApiEndpoint } from "@/types/cms/common";
import {
  ApiKeyListResponse,
  ApiKeyResponse,
  CreateApiKeyDto,
  UpdateApiKeyDto
} from "@/types/cms/api-key";

interface IStore {
  _api: Record<
    "listApiKey" | "detailApiKey" | "createApiKey" | "updateApiKey" | "resetApiKeyToken" | "deleteApiKey",
    IApiEndpoint
  >;
  _fnGetListApiKey: (_?: string) => Promise<ApiKeyListResponse | undefined>;
  _fnGetDetailApiKey: (_id: number) => Promise<ApiKeyResponse | undefined>;
  _fnGetCreateApiKey: (_payload: CreateApiKeyDto) => Promise<ApiKeyResponse | undefined>;
  _fnGetUpdateApiKey: (_id: number | undefined, _payload: UpdateApiKeyDto) => Promise<ApiKeyResponse | undefined>;
  _fnGetResetApiKeyToken: (_id: number) => Promise<ApiKeyResponse | undefined>;
  _fnGetDeleteApiKey: (_id: number) => Promise<ApiKeyResponse | undefined>;
}

export const useApiKeyStore = create<IStore>((_, get) => ({
  _api: {
    listApiKey: {
      url: "/api-keys",
      method: "GET"
    },
    detailApiKey: {
      url: "/api-keys/{id}",
      method: "GET"
    },
    createApiKey: {
      url: "/api-keys",
      method: "POST"
    },
    updateApiKey: {
      url: "/api-keys/{id}",
      method: "PUT"
    },
    resetApiKeyToken: {
      url: "/api-keys/{id}/reset-token",
      method: "PATCH"
    },
    deleteApiKey: {
      url: "/api-keys/{id}",
      method: "DELETE"
    }
  },
  _fnGetListApiKey: async (params) => {
    const { _api } = get();
    const endpoint = _api.listApiKey.url;
    return await http.get<any, ApiKeyListResponse>(`${endpoint}${params ? `?${params}` : ""}`);
  },
  _fnGetDetailApiKey: async (id) => {
    const { _api } = get();
    const endpoint = _api.detailApiKey.url.replace("{id}", String(id));
    return await http.get<any, ApiKeyResponse>(endpoint);
  },
  _fnGetCreateApiKey: async (payload) => {
    const { _api } = get();
    const endpoint = _api.createApiKey.url;
    return await http.post<CreateApiKeyDto, ApiKeyResponse>(endpoint, payload);
  },
  _fnGetUpdateApiKey: async (id, payload) => {
    const { _api } = get();
    const endpoint = _api.updateApiKey.url.replace("{id}", String(id));
    return await http.put<UpdateApiKeyDto, ApiKeyResponse>(endpoint, payload);
  },
  _fnGetResetApiKeyToken: async (id) => {
    const { _api } = get();
    const endpoint = _api.resetApiKeyToken.url.replace("{id}", String(id));
    return await http.patch<any, ApiKeyResponse>(endpoint);
  },
  _fnGetDeleteApiKey: async (id) => {
    const { _api } = get();
    const endpoint = _api.deleteApiKey.url.replace("{id}", String(id));
    return await http.delete<any, ApiKeyResponse>(endpoint);
  }
}));
