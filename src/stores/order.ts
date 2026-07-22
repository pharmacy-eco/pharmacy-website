import { create } from "zustand";
import { http } from "@/lib/http";
import { IApiEndpoint } from "@/types/cms/common";
import { IOrderListResponse, IOrderResponse, IOrdersListDto } from "@/types/cms/order";

interface IStore {
  _api: Record<"listOrder" | "detailOrder" | "updateOrder" | "deleteOrder", IApiEndpoint>;
  _fnGetListOrder: (_?: string) => Promise<IOrderListResponse | undefined>;
  _fnGetDetailOrder: (_id: number) => Promise<IOrderResponse | undefined>;
  _fnGetUpdateOrder: (_id: number, _payload: Partial<IOrdersListDto>) => Promise<IOrderResponse | undefined>;
  _fnGetDeleteOrder: (_id: number) => Promise<IOrderResponse | undefined>;
}

export const useOrderStore = create<IStore>((_, get) => ({
  _api: {
    listOrder: {
      url: "/orders",
      method: "GET"
    },
    detailOrder: {
      url: "/orders/{id}",
      method: "GET"
    },
    updateOrder: {
      url: "/orders/{id}",
      method: "PUT"
    },
    deleteOrder: {
      url: "/orders/{id}",
      method: "DELETE"
    }
  },
  _fnGetListOrder: async (params) => {
    const { _api } = get();
    const endpoint = _api.listOrder.url;
    return await http.get<any, IOrderListResponse>(`${endpoint}${params ? `?${params}` : ""}`);
  },
  _fnGetDetailOrder: async (id) => {
    const { _api } = get();
    const endpoint = _api.detailOrder.url.replace("{id}", String(id));
    return await http.get<any, IOrderResponse>(endpoint);
  },
  _fnGetUpdateOrder: async (id, payload) => {
    const { _api } = get();
    const endpoint = _api.updateOrder.url.replace("{id}", String(id));
    return await http.put<any, IOrderResponse>(endpoint, payload);
  },
  _fnGetDeleteOrder: async (id) => {
    const { _api } = get();
    const endpoint = _api.deleteOrder.url.replace("{id}", String(id));
    return await http.delete<any, IOrderResponse>(endpoint);
  }
}));
