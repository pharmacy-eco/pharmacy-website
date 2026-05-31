import { IResponseData, IResponsePagination } from "@/types/cms/response";
import { IRequestPagination } from "@/types/cms/request";

interface IBlog {
  id?: number;
  title: string;
  slug: string;
  image: string;
  category_id: number;
  description?: string;
  content?: string;
  meta_title: string;
  meta_description?: string;
  status: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
  created_by?: number;
  updated_by?: number;
  deleted_by?: number;
}

interface IBlogFilter {
  title?: string;
}

type IBlogResponse = IResponseData<IBlog>;
type IBlogListResponse = IResponsePagination<IBlog>;
type IBlogRequest = IRequestPagination<IBlogFilter>;

export type { IBlog, IBlogFilter, IBlogResponse, IBlogListResponse, IBlogRequest };
