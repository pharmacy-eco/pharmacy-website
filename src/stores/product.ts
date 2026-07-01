import { create } from "zustand";
import { http } from "@/lib/http";
import { IApiEndpoint } from "@/types/cms/common";
import { IProduct, IProductListResponse, IProductResponse } from "@/types/cms/product";

interface IStore {
  _api: Record<"listProduct" | "detailProduct" | "createProduct" | "updateProduct" | "deleteProduct", IApiEndpoint>;
  _fnGetListProduct: (_?: string) => Promise<IProductListResponse | undefined>;
  _fnGetDetailProduct: (_id: number) => Promise<IProductResponse | undefined>;
  _fnGetCreateProduct: (_payload: IProduct) => Promise<IProductResponse | undefined>;
  _fnGetUpdateProduct: (_id: number | undefined, _payload: IProduct) => Promise<IProductResponse | undefined>;
  _fnGetDeleteProduct: (_id: number) => Promise<IProductResponse | undefined>;
}

export const useProductStore = create<IStore>((_, get) => ({
  _api: {
    listProduct: {
      url: "/products",
      method: "GET"
    },
    detailProduct: {
      url: "/products/{id}",
      method: "GET"
    },
    createProduct: {
      url: "/products",
      method: "POST"
    },
    updateProduct: {
      url: "/products/{id}",
      method: "PUT"
    },
    deleteProduct: {
      url: "/products/{id}",
      method: "DELETE"
    }
  },
  _fnGetListProduct: async (params) => {
    const { _api } = get();
    const endpoint = _api.listProduct.url;
    return await http.get<any, IProductListResponse>(`${endpoint}${params ? `?${params}` : ""}`);
  },
  _fnGetDetailProduct: async (id) => {
    const { _api } = get();
    const endpoint = _api.detailProduct.url.replace("{id}", String(id));
    return await http.get<any, IProductResponse>(endpoint);
  },
  _fnGetCreateProduct: async (payload) => {
    const { _api } = get();
    const endpoint = _api.createProduct.url;
    return await http.post<any, IProductResponse>(endpoint, payload);
  },
  _fnGetUpdateProduct: async (id, payload) => {
    const { _api } = get();
    const endpoint = _api.updateProduct.url.replace("{id}", String(id));
    return await http.put<any, IProductResponse>(endpoint, payload);
  },
  _fnGetDeleteProduct: async (id) => {
    const { _api } = get();
    const endpoint = _api.deleteProduct.url.replace("{id}", String(id));
    return await http.delete<any, IProductResponse>(endpoint);
  }
}));
