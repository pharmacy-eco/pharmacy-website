import { create } from "zustand";
import { http } from "@/lib/http";
import { IApiEndpoint } from "@/types/cms/common";
import { ICategory, ICategoryListResponse, ICategoryResponse } from "@/types/cms/category";

interface IStore {
  _api: Record<
    "listCategory" | "detailCategory" | "createCategory" | "updateCategory" | "deleteCategory",
    IApiEndpoint
  >;
  _fnGetListCategory: (_?: string) => Promise<ICategoryListResponse | undefined>;
  _fnGetDetailCategory: (_id: number) => Promise<ICategoryResponse | undefined>;
  _fnGetCreateCategory: (_payload: ICategory) => Promise<ICategoryResponse | undefined>;
  _fnGetUpdateCategory: (_id: number | undefined, _payload: ICategory) => Promise<ICategoryResponse | undefined>;
  _fnGetDeleteCategory: (_id: number) => Promise<ICategoryResponse | undefined>;
}

export const useCategoryStore = create<IStore>((_, get) => ({
  _api: {
    listCategory: {
      url: "/categories",
      method: "GET"
    },
    detailCategory: {
      url: "/categories/{id}",
      method: "GET"
    },
    createCategory: {
      url: "/categories",
      method: "POST"
    },
    updateCategory: {
      url: "/categories/{id}",
      method: "PUT"
    },
    deleteCategory: {
      url: "/categories/{id}",
      method: "DELETE"
    }
  },
  _fnGetListCategory: async (params) => {
    const { _api } = get();
    const endpoint = _api.listCategory.url;
    return await http.get<any, ICategoryListResponse>(`${endpoint}${params ? `?${params}` : ""}`);
  },
  _fnGetDetailCategory: async (id) => {
    const { _api } = get();
    const endpoint = _api.detailCategory.url.replace("{id}", String(id));
    return await http.get<any, ICategoryResponse>(endpoint);
  },
  _fnGetCreateCategory: async (payload) => {
    const { _api } = get();
    const endpoint = _api.createCategory.url;
    return await http.post<any, ICategoryResponse>(endpoint, payload);
  },
  _fnGetUpdateCategory: async (id, payload) => {
    const { _api } = get();
    const endpoint = _api.updateCategory.url.replace("{id}", String(id));
    return await http.put<any, ICategoryResponse>(endpoint, payload);
  },
  _fnGetDeleteCategory: async (id) => {
    const { _api } = get();
    const endpoint = _api.deleteCategory.url.replace("{id}", String(id));
    return await http.delete<any, ICategoryResponse>(endpoint);
  }
}));
