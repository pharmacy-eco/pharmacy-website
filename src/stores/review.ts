import { http } from "@/lib/http";
import { create } from "zustand";

interface ReviewStore {
  _api: { sendReview: string };
  isOpen: boolean;
  openReview: () => void;
  closeReview: () => void;
  _sendFormReview: (payload: any) => Promise<any>;
}

export const useReviewStore = create<ReviewStore>((set, get) => ({
  isOpen: false,
  product: null,
  _api: {
    sendReview: "/web/review"
  },
  openReview: () => set({ isOpen: true }),
  closeReview: () => set({ isOpen: false }),
  _sendFormReview: async (payload: any) => {
    const { _api } = get();
    const endpoint = _api.sendReview;
    return await http.post(endpoint, payload);
  }
}));
