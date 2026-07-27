import TSearch from "@/components/web/templates/search";
import productService from "@/services/web/product";

interface Props {
  searchParams?: {
    q?: string;
    page?: string;
  };
}

const getPageIndex = (page?: string) => {
  const pageIndex = Number(page || 1);
  return Number.isFinite(pageIndex) && pageIndex > 0 ? pageIndex : 1;
};

async function fetchProducts(keyword: string, pageIndex: number) {
  if (!keyword) return null;

  try {
    const res = await productService.fnSearchProducts(keyword, pageIndex, 12);
    return res?.data || null;
  } catch (error) {
    return null;
  }
}

export default async function Page({ searchParams }: Props) {
  const keyword = (searchParams?.q || "").trim();
  const pageIndex = getPageIndex(searchParams?.page);
  const products = await fetchProducts(keyword, pageIndex);

  return (
    <TSearch
      keyword={keyword}
      products={products?.items || []}
      pageIndex={Number(products?.pageIndex || pageIndex)}
      totalItems={Number(products?.totalItems || 0)}
      totalPages={Number(products?.totalPages || 0)}
    />
  );
}
