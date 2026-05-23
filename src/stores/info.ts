import { create } from "zustand";
import { http } from "@/lib/http";
import { IApiEndpoint } from "@/types/cms/common";

interface IStore {
  _api: Record<"listInfo" | "detailInfo" | "createInfo" | "updateInfo" | "deleteInfo", IApiEndpoint>;
  _fnGetListInfo: (_?: string) => Promise<any | undefined>;
  _fnGetDetailInfo: (_id: number) => Promise<any | undefined>;
  _fnGetCreateInfo: (_payload: any) => Promise<any | undefined>;
  _fnGetUpdateInfo: (_id: number | undefined, _payload: any) => Promise<any | undefined>;
  _fnGetDeleteInfo: (_id: number) => Promise<any | undefined>;
}

export const useInfoStore = create<IStore>((_, get) => ({
  _api: {
    listInfo: {
      url: "/info",
      method: "GET"
    },
    detailInfo: {
      url: "/info/{id}",
      method: "GET"
    },
    createInfo: {
      url: "/info",
      method: "POST"
    },
    updateInfo: {
      url: "/info/{id}",
      method: "PUT"
    },
    deleteInfo: {
      url: "/info/{id}",
      method: "DELETE"
    }
  },
  _fnGetListInfo: async (params) => {
    const { _api } = get();
    const endpoint = _api.listInfo.url;
    return await http.get(`${endpoint}${params ? `?${params}` : ""}`);
  },
  _fnGetDetailInfo: async (id) => {
    const { _api } = get();
    const endpoint = _api.detailInfo.url.replace("{id}", String(id));
    return await http.get(endpoint);
  },
  _fnGetCreateInfo: async (payload) => {
    const { _api } = get();
    const endpoint = _api.createInfo.url;
    return await http.post(endpoint, payload);
  },
  _fnGetUpdateInfo: async (id, payload) => {
    const { _api } = get();
    const endpoint = _api.updateInfo.url.replace("{id}", String(id));
    return await http.put(endpoint, payload);
  },
  _fnGetDeleteInfo: async (id) => {
    const { _api } = get();
    const endpoint = _api.deleteInfo.url.replace("{id}", String(id));
    return await http.delete(endpoint);
  }
}));
