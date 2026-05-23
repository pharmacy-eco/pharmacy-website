import { create } from "zustand";
import { http } from "@/lib/http";
import { IApiEndpoint } from "@/types/cms/common";

interface IStore {
  _api: Record<"detailGeneral" | "updateGeneral", IApiEndpoint>;
  _fnGetDetailGeneral: () => Promise<any | undefined>;
  _fnGetUpdateGeneral: (_id: number | undefined, _payload: any) => Promise<any | undefined>;
}

export const useGeneralStore = create<IStore>((_, get) => ({
  _api: {
    detailGeneral: {
      url: "/general",
      method: "GET"
    },
    updateGeneral: {
      url: "/general",
      method: "PUT"
    }
  },

  _fnGetDetailGeneral: async () => {
    const { _api } = get();
    const endpoint = _api.detailGeneral.url;
    return await http.get(endpoint);
  },
  _fnGetUpdateGeneral: async (payload) => {
    const { _api } = get();
    const endpoint = _api.updateGeneral.url;
    return await http.put(endpoint, payload);
  }
}));
