import { IResponseData } from "./response";
interface Review {
  content: string;
  id: number;
  name: string;
  created_at: string;
  star: number;
}
interface IProduct {
  id: number;
  name: string;
  slug: string;
  price: number;
  current_price: number;
  content: string;
  meta_name: string;
  meta_description: string;
  optionals: { name: string; value: string }[];
  created_at: string;
  productImage: {
    id: number;
    url: string;
  }[];
  category: {
    id: number;
    name: string;
    slug: string;
  }[];
  reviews: Review[];
  product_recomment: IProductRecomment[];
}

interface IProductRecomment {
  id: number;
  name: string;
  slug: string;
  price: number;
  current_price: number;
  optionals: Record<string, string>;
  productImage: {
    id: number;
    url: string;
  }[];
  category: {
    id: number;
    name: string;
    slug: string;
  }[];
}

type IProductResponse = IResponseData<IProduct>;

export type { IProductResponse, IProduct, Review, IProductRecomment };
