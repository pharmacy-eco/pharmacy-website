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

const fnSearchProducts = async (
  keyword: string,
  pageIndex: number = 1,
  pageSize: number = 12
): Promise<IProductListResponse | undefined> => {
  const normalizeText = (value: string) => {
    return value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d");
  };
  const searchValue = normalizeText(keyword);
  const pageRequests = Array.from({ length: 5 }, async (_, idx) => {
    try {
      const params = new URLSearchParams({
        page_index: String(idx + 1),
        page_size: "20"
      });

      return await http.get<any, IProductListResponse>(`/web/search?${params.toString()}`);
    } catch (error) {
      return undefined;
    }
  });
  const responses = await Promise.all(pageRequests);
  const firstResponse = responses.find((response) => response?.data);
  const products = responses.flatMap((response) => response?.data?.items || []);
  const productMap = new Map(products.map((product) => [product.id, product]));
  const filteredProducts = Array.from(productMap.values()).filter((product) => {
    const haystack = normalizeText(`${product.name || ""} ${product.slug || ""} ${product.meta_name || ""}`);
    return haystack.includes(searchValue);
  });
  const startIndex = (pageIndex - 1) * pageSize;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + pageSize);

  return {
    ...(firstResponse as IProductListResponse),
    data: {
      items: paginatedProducts,
      pageIndex,
      pageSize,
      totalItems: filteredProducts.length,
      totalPages: Math.ceil(filteredProducts.length / pageSize)
    }
  };
};

const productService = {
  fnGetListProductByCategory,
  fnSearchProducts,
  fnGetDetailProduct
};

export default productService;
