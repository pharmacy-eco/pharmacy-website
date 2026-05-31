import { create } from "zustand";
import { http } from "@/lib/http";
import { IApiEndpoint } from "@/types/cms/common";
import { IBlog, IBlogListResponse, IBlogResponse } from "@/types/cms/blog";

interface IStore {
  _api: Record<"listBlog" | "detailBlog" | "createBlog" | "updateBlog" | "deleteBlog", IApiEndpoint>;
  _fnGetListBlog: (_?: string) => Promise<IBlogListResponse | undefined>;
  _fnGetDetailBlog: (_id: number) => Promise<IBlogResponse | undefined>;
  _fnGetCreateBlog: (_payload: IBlog) => Promise<IBlogResponse | undefined>;
  _fnGetUpdateBlog: (_id: number | undefined, _payload: IBlog) => Promise<IBlogResponse | undefined>;
  _fnGetDeleteBlog: (_id: number) => Promise<IBlogResponse | undefined>;
}

export const useBlogStore = create<IStore>((_, get) => ({
  _api: {
    listBlog: {
      url: "/blogs",
      method: "GET"
    },
    detailBlog: {
      url: "/blogs/{id}",
      method: "GET"
    },
    createBlog: {
      url: "/blogs",
      method: "POST"
    },
    updateBlog: {
      url: "/blogs/{id}",
      method: "PUT"
    },
    deleteBlog: {
      url: "/blogs/{id}",
      method: "DELETE"
    }
  },
  _fnGetListBlog: async (params) => {
    const { _api } = get();
    const endpoint = _api.listBlog.url;
    return await http.get<any, IBlogListResponse>(`${endpoint}${params ? `?${params}` : ""}`);
  },
  _fnGetDetailBlog: async (id) => {
    const { _api } = get();
    const endpoint = _api.detailBlog.url.replace("{id}", String(id));
    return await http.get<any, IBlogResponse>(endpoint);
  },
  _fnGetCreateBlog: async (payload) => {
    const { _api } = get();
    const endpoint = _api.createBlog.url;
    return await http.post<any, IBlogResponse>(endpoint, payload);
  },
  _fnGetUpdateBlog: async (id, payload) => {
    const { _api } = get();
    const endpoint = _api.updateBlog.url.replace("{id}", String(id));
    return await http.put<any, IBlogResponse>(endpoint, payload);
  },
  _fnGetDeleteBlog: async (id) => {
    const { _api } = get();
    const endpoint = _api.deleteBlog.url.replace("{id}", String(id));
    return await http.delete<any, IBlogResponse>(endpoint);
  }
}));
