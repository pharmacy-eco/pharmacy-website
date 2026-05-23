import { IResponseData, IResponsePagination } from "@/types/cms/response";
import { IRequestPagination } from "@/types/cms/request";

interface IProperty {
  name: string
  value: string
}

interface IProduct {
  id?: number
  name: string
  slug?: string
  image: string[]
  category?: string[]
  category_id?: string[]
  created_at?: string
  updated_at?: string
  price: number
  brand: string
  property: IProperty[]
  status: number
  description: string
  unit: string;
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
