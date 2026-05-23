import { http } from "@/lib/http";
import { IProductResponse } from "@/types/web/product"; //TODO

const fnGetDetailProduct = async (slug: string): Promise<IProductResponse | undefined> => {
  return await http.get<any, IProductResponse>(`/web/product/${slug}`);
};

const productService = {
  fnGetDetailProduct
};

export default productService;
