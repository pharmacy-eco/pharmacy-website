import { create } from "zustand";
import { http } from "@/lib/http";
import { IApiEndpoint } from "@/types/cms/common";
import {
  IProductionBatchDeleteResponse,
  IProductionBatchListResponse,
  IProductionBatchPayload,
  IProductionBatchResponse
} from "@/types/cms/production-batch";

type ProductionBatchEndpoint = "list" | "detail" | "create" | "update" | "delete";

interface IStore {
  _api: Record<ProductionBatchEndpoint, IApiEndpoint>;
  _fnGetListProductionBatch: (_params?: string) => Promise<IProductionBatchListResponse>;
  _fnGetDetailProductionBatch: (_id: number) => Promise<IProductionBatchResponse>;
  _fnCreateProductionBatch: (_payload: IProductionBatchPayload) => Promise<IProductionBatchResponse>;
  _fnUpdateProductionBatch: (_id: number, _payload: IProductionBatchPayload) => Promise<IProductionBatchResponse>;
  _fnDeleteProductionBatch: (_id: number) => Promise<IProductionBatchDeleteResponse>;
}

const ensureBusinessSuccess = <T extends { error?: { code: number; message: string } }>(
  response: T,
  expectedCode: number
) => {
  if (response?.error?.code !== expectedCode) {
    throw new Error(response?.error?.message || "Có lỗi xảy ra. Vui lòng thử lại.");
  }

  return response;
};

export const useProductionBatchStore = create<IStore>((_, get) => ({
  _api: {
    list: {
      url: "/production-batches",
      method: "GET"
    },
    detail: {
      url: "/production-batches/{id}",
      method: "GET"
    },
    create: {
      url: "/production-batches",
      method: "POST"
    },
    update: {
      url: "/production-batches/{id}",
      method: "PUT"
    },
    delete: {
      url: "/production-batches/{id}",
      method: "DELETE"
    }
  },
  _fnGetListProductionBatch: async (params) => {
    const endpoint = get()._api.list.url;
    const response = await http.get<any, IProductionBatchListResponse>(
      `${endpoint}${params ? `?${params}` : ""}`
    );
    return ensureBusinessSuccess(response, 200);
  },
  _fnGetDetailProductionBatch: async (id) => {
    const endpoint = get()._api.detail.url.replace("{id}", String(id));
    const response = await http.get<any, IProductionBatchResponse>(endpoint);
    return ensureBusinessSuccess(response, 200);
  },
  _fnCreateProductionBatch: async (payload) => {
    const response = await http.post<any, IProductionBatchResponse>(get()._api.create.url, payload);
    return ensureBusinessSuccess(response, 201);
  },
  _fnUpdateProductionBatch: async (id, payload) => {
    const endpoint = get()._api.update.url.replace("{id}", String(id));
    const response = await http.put<any, IProductionBatchResponse>(endpoint, payload);
    return ensureBusinessSuccess(response, 200);
  },
  _fnDeleteProductionBatch: async (id) => {
    const endpoint = get()._api.delete.url.replace("{id}", String(id));
    const response = await http.delete<any, IProductionBatchDeleteResponse>(endpoint);
    return ensureBusinessSuccess(response, 200);
  }
}));
