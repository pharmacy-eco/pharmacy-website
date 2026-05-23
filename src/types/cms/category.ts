import { IResponseData, IResponsePagination } from "@/types/cms/response";
import { IRequestPagination } from "@/types/cms/request";

interface ICategory {
  id?: number;
  name: string;
  image?: string;
  parent?: IParentCategory;
  parent_id: number | null;
  type: "PRODUCT" | "BLOG" | "BRAND";
  description: string;
  meta_name: string;
  meta_description: string;
  status?: number;
  created_at?: string;
  updated_at?: string;
}
interface IParentCategory {
  id: number;
  name: string;
}

interface ICategoryFilter {
  name?: string;
}

type ICategoryResponse = IResponseData<ICategory>;
type ICategoryListResponse = IResponsePagination<ICategory>;
type ICategoryRequest = IRequestPagination<ICategoryFilter>;

export type { ICategory, ICategoryFilter, ICategoryResponse, ICategoryListResponse, ICategoryRequest };
