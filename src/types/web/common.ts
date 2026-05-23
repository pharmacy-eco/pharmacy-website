import { generatePaginationLinks } from "./../../components/cms/atoms/pagination-atom/generate-pages";
import { ICategory, ICategoryBlog } from "./category";
import { IResponseData } from "./response";

interface IPagination {
  pageSize: number;
  pageIndex: number;
  totalPages: number;
  totalItems: number;
}

interface IApiEndpoint {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
}

interface ICommon {
  general: Array<{
    id: number;
    company: string;
    link_map: string;
    iframe_map: string;
    info: string;
    hotline: string;
    address: string;
    email: string;
    logo: string;
    favicon: string;
    social: any;
    add_body: string;
    add_header: string;
    meta_title: string;
    meta_keyword: string;
    meta_description: string;
    created_at: string;
    updated_at: string;
  }>;
  categories: {
    categories_blog: ICategoryBlog[];
    categories_products: ICategory[];
  };
}

interface IProduct {
  id: number;
  name: string;
  slug: string;
  price: number;
  current_price: number;
  meta_name: string;
  optionals: any;
  thumbnail: string;
}

interface IBanner {
  id: number;
  title: string;
  url: string;
  image: string;
  position: number;
  is_slider: number;
}

interface IBlog {
  id: number;
  title: string;
  slug: string;
  image: string;
  description: string;
  meta_title: string;
  meta_description: string;
}

interface IHome {
  product: Array<IProduct>;
  banner: Array<IBanner>;
  blogs: Array<IBlog>;
}

type ICommonResponse = IResponseData<ICommon>;
type IHomeResponse = IResponseData<IHome>;

export type { IPagination, IApiEndpoint, ICommonResponse, ICommon, IHome, IHomeResponse, IProduct, IBanner, IBlog };
