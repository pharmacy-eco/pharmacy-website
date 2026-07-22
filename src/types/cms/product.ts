import { IResponseData, IResponsePagination } from "@/types/cms/response";
import { IRequestPagination } from "@/types/cms/request";

interface IProperty {
  name: string;
  value: string;
}

interface IProduct {
  id?: number;
  name: string;
  slug?: string;
  image: string[];
  category?: number[] | string[] | string;
  category_id?: number | string | Array<number | string>;
  created_at?: string;
  updated_at?: string;
  price: number;
  current_price?: number;
  brand?: string;
  property?: IProperty[];
  optionals?: IProperty[] | Record<string, string>;
  is_hot?: number;
  status: number;
  description: string;
  content?: string;
  unit: string;
  expiry_date?: string;
  expired_at?: string;
  expiration_date?: string;
  expires_at?: string;
  expire_at?: string;
  exp_date?: string;
  stock?: number;
  quantity?: number;
  sold?: number;
  sold_quantity?: number;
  meta_name: string;
  meta_description: string;
}

interface IProductFilter {
  name?: string;
}

type IProductResponse = IResponseData<IProduct>;
type IProductListResponse = IResponsePagination<IProduct>;
type IProductRequest = IRequestPagination<IProductFilter>;

export type { IProduct, IProductResponse, IProductListResponse, IProductRequest, IProperty };
