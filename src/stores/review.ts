import { http } from "@/lib/http";
import { create } from "zustand";
import { IApiEndpoint } from "@/types/cms/common";
import { IReviewListResponse, IReviewResponse, ReviewsListDto } from "@/types/cms/review";

interface ReviewStore {
  _api: {
    sendReview: string;
    listReview: IApiEndpoint;
    updateReview: IApiEndpoint;
    updateStatusReview: IApiEndpoint;
    deleteReview: IApiEndpoint;
  };
  isOpen: boolean;
  openReview: () => void;
  closeReview: () => void;
  _sendFormReview: (payload: any) => Promise<any>;
  _fnGetListReview: (_?: string) => Promise<IReviewListResponse | undefined>;
  _fnGetUpdateReview: (_id: number, _payload: Partial<ReviewsListDto>) => Promise<IReviewResponse | undefined>;
  _fnGetUpdateStatusReview: (_id: number) => Promise<IReviewResponse | undefined>;
  _fnGetDeleteReview: (_id: number) => Promise<IReviewResponse | undefined>;
}

export const useReviewStore = create<ReviewStore>((set, get) => ({
  isOpen: false,
  product: null,
  _api: {
    sendReview: "/web/review",
    listReview: {
      url: "/reviews",
      method: "GET"
    },
    updateReview: {
      url: "/reviews/{id}",
      method: "PUT"
    },
    updateStatusReview: {
      url: "/reviews/status/{id}",
      method: "PUT"
    },
    deleteReview: {
      url: "/reviews/{id}",
      method: "DELETE"
    }
  },
  openReview: () => set({ isOpen: true }),
  closeReview: () => set({ isOpen: false }),
  _sendFormReview: async (payload: any) => {
    const { _api } = get();
    const endpoint = _api.sendReview;
    return await http.post(endpoint, payload);
  },
  _fnGetListReview: async (params) => {
    const { _api } = get();
    const endpoint = _api.listReview.url;
    return await http.get<any, IReviewListResponse>(`${endpoint}${params ? `?${params}` : ""}`);
  },
  _fnGetUpdateReview: async (id, payload) => {
    const { _api } = get();
    const endpoint = _api.updateReview.url.replace("{id}", String(id));
    return await http.put<any, IReviewResponse>(endpoint, payload);
  },
  _fnGetUpdateStatusReview: async (id: number) => {
    const { _api } = get();
    const endpoint = _api.updateStatusReview.url.replace("{id}", String(id));
    return await http.put<any, IReviewResponse>(endpoint);
  },
  _fnGetDeleteReview: async (id) => {
    const { _api } = get();
    const endpoint = _api.deleteReview.url.replace("{id}", String(id));
    return await http.delete<any, IReviewResponse>(endpoint);
  }
}));
