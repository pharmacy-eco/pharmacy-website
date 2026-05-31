import { create } from "zustand";
import { http } from "@/lib/http";
import { IApiEndpoint } from "@/types/cms/common";

interface IStore {
  _api: Record<"listUser" | "detailUser" | "createUser" | "updateUser" | "deleteUser", IApiEndpoint>;
  _fnGetListUser: (_?: string) => Promise<any | undefined>;
  _fnGetDetailUser: (_id: number) => Promise<any | undefined>;
  _fnGetCreateUser: (_payload: any) => Promise<any | undefined>;
  _fnGetUpdateUser: (_id: number | undefined, _payload: any) => Promise<any | undefined>;
  _fnGetDeleteUser: (_id: number) => Promise<any | undefined>;
}

export const useUserStore = create<IStore>((_, get) => ({
  _api: {
    listUser: {
      url: "/users",
      method: "GET"
    },
    detailUser: {
      url: "/users/{id}",
      method: "GET"
    },
    createUser: {
      url: "/users",
      method: "POST"
    },
    updateUser: {
      url: "/users/{id}",
      method: "PUT"
    },
    deleteUser: {
      url: "/users/{id}",
      method: "DELETE"
    }
  },
  _fnGetListUser: async (params) => {
    const { _api } = get();
    const endpoint = _api.listUser.url;
    return await http.get(`${endpoint}${params ? `?${params}` : ""}`);
  },
  _fnGetDetailUser: async (id) => {
    const { _api } = get();
    const endpoint = _api.detailUser.url.replace("{id}", String(id));
    return await http.get(endpoint);
  },
  _fnGetCreateUser: async (payload) => {
    const { _api } = get();
    const endpoint = _api.createUser.url;
    return await http.post(endpoint, payload);
  },
  _fnGetUpdateUser: async (id, payload) => {
    const { _api } = get();
    const endpoint = _api.updateUser.url.replace("{id}", String(id));
    return await http.put(endpoint, payload);
  },
  _fnGetDeleteUser: async (id) => {
    const { _api } = get();
    const endpoint = _api.deleteUser.url.replace("{id}", String(id));
    return await http.delete(endpoint);
  }
}));
