import { create } from "zustand";
import { http } from "@/lib/http";
import { IApiEndpoint } from "@/types/cms/common";
import { IGeneralRequest, IGeneralResponse } from "@/types/cms/general";

interface IStore {
  _api: Record<"detailGeneral" | "updateGeneral", IApiEndpoint>;
  _fnGetDetailGeneral: () => Promise<IGeneralResponse | undefined>;
  _fnGetUpdateGeneral: (_id: number | undefined, _payload: IGeneralRequest) => Promise<IGeneralResponse | undefined>;
}

export const useGeneralStore = create<IStore>((_, get) => ({
  _api: {
    detailGeneral: {
      url: "/general",
      method: "GET"
    },
    updateGeneral: {
      url: "/general/{id}",
      method: "PUT"
    }
  },

  _fnGetDetailGeneral: async () => {
    const { _api } = get();
    const endpoint = _api.detailGeneral.url;
    return await http.get<any, IGeneralResponse>(endpoint);
  },
  _fnGetUpdateGeneral: async (id, payload) => {
    const { _api } = get();
    const endpoint = _api.updateGeneral.url.replace("{id}", String(id));
    return await http.put<any, IGeneralResponse>(endpoint, payload);
  }
}));
