import TCategory from "@/components/web/templates/category";
import CommonService from "@/services/web/common";
import productService from "@/services/web/product";
import { ICategory } from "@/types/web/category";
import { redirect } from "next/navigation";

interface Props {
  params: {
    slug: string;
  };
  searchParams?: {
    page?: string;
  };
}

const findCategoryBySlug = (categories: ICategory[], slug: string): ICategory | null => {
  for (const category of categories) {
    if (category.slug === slug) return category;

    const child = findCategoryBySlug(category.children || [], slug);
    if (child) return child;
  }

  return null;
};

const getPageIndex = (page?: string) => {
  const pageIndex = Number(page || 1);
  return Number.isFinite(pageIndex) && pageIndex > 0 ? pageIndex : 1;
};

async function fetchCategory(slug: string) {
  try {
    const res = await CommonService.fnGetCommonLayout();
    const categories = res?.data.categories.categories_products || [];
    return findCategoryBySlug(categories, slug);
  } catch (error) {
    return null;
  }
}

async function fetchProducts(slug: string, pageIndex: number) {
  try {
    const res = await productService.fnGetListProductByCategory(slug, pageIndex, 12);
    return res?.data || null;
  } catch (error) {
    return null;
  }
}

export default async function Page({ params, searchParams }: Props) {
  const pageIndex = getPageIndex(searchParams?.page);
  const category = await fetchCategory(params.slug);

  if (!category) redirect("/404");

  const products = await fetchProducts(params.slug, pageIndex);

  return (
    <TCategory
      category={category}
      products={products?.items || []}
      pageIndex={Number(products?.pageIndex || pageIndex)}
      totalItems={Number(products?.totalItems || 0)}
      totalPages={Number(products?.totalPages || 0)}
    />
  );
}
