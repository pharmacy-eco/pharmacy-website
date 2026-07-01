import { IResponseData } from "@/types/cms/response";

interface ISocial {
  image: string;
  name: string;
  link: string;
}

interface IGeneral {
  id?: number;
  company?: string;
  address?: string;
  link_map?: string;
  iframe_map?: string;
  info?: string;
  hotline?: string;
  email?: string;
  logo?: string;
  favicon?: string;
  social?: ISocial[] | string[];
  add_head?: string;
  add_body?: string;
  meta_title?: string;
  meta_keyword?: string;
  meta_description?: string;
}

type IGeneralResponse = IResponseData<IGeneral>;
type IGeneralRequest = IGeneral;

export type { ISocial, IGeneral, IGeneralResponse, IGeneralRequest };
