import { http } from "@/lib/http";
import { IProductListResponse, IProductResponse } from "@/types/web/product"; //TODO

const fnGetDetailProduct = async (slug: string): Promise<IProductResponse | undefined> => {
  return await http.get<any, IProductResponse>(`/web/product/${slug}`);
};

const fnGetListProductByCategory = async (
  slug: string,
  pageIndex: number = 1,
  pageSize: number = 12
): Promise<IProductListResponse | undefined> => {
  const params = new URLSearchParams({
    slug,
    page_index: String(pageIndex),
    page_size: String(pageSize)
  });

  return await http.get<any, IProductListResponse>(`/web/search?${params.toString()}`);
};

const productService = {
  fnGetListProductByCategory,
  fnGetDetailProduct
};

export default productService;
