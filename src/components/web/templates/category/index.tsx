import BreadcrumbAtom from "@/components/cms/atoms/breadcrumb-atom";
import CardProduct from "@/components/web/atoms/card-atom/card-product";
import NextImg from "@/components/web/atoms/next-img";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { ICategory } from "@/types/web/category";
import { IProductListItem } from "@/types/web/product";
import Link from "next/link";

interface IProps {
  category: ICategory;
  products: IProductListItem[];
  pageIndex: number;
  totalItems: number;
  totalPages: number;
}

const buildPageHref = (slug: string, page: number) => {
  return page > 1 ? `/${slug}?page=${page}` : `/${slug}`;
};

const normalizeProduct = (product: IProductListItem) => ({
  ...product,
  current_price: product.current_price ?? product.curent_price ?? 0
});

const TCategory: React.FC<IProps> = ({ category, products, pageIndex, totalItems, totalPages }) => {
  const breadcrumb = [
    {
      label: "Trang Chủ",
      href: "/"
    },
    {
      label: category.name
    }
  ];

  const pages = Array.from({ length: totalPages }, (_, idx) => idx + 1);
  const hasProducts = products.length > 0;

  return (
    <div className="w-full h-auto">
      <div className="container pb-10">
        <div className="py-4">
          <BreadcrumbAtom list={breadcrumb} />
        </div>

        <section className="bg-white rounded-2xl p-4 md:p-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-black-02">{category.name}</h1>
              <p className="mt-2 text-sm text-[#657384]">{totalItems} sản phẩm</p>
            </div>
          </div>

          {!!category.children?.length && (
            <div className="mt-5 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {category.children.map((item) => (
                <Link
                  key={item.id}
                  href={`/${item.slug}`}
                  className="flex items-center gap-3 rounded-xl border border-[#e5e7eb] bg-white p-3 transition-all duration-200 hover:border-blue-12 hover:text-blue-12"
                >
                  <span className="relative inline-flex h-9 w-9 shrink-0 overflow-hidden rounded-lg bg-blue-ea">
                    <NextImg src={item.image} width={36} height={36} alt={item.name} className="h-full w-full" />
                  </span>
                  <span className="text-sm font-medium line-clamp-2">{item.name}</span>
                </Link>
              ))}
            </div>
          )}
        </section>

        <section className="mt-5">
          {hasProducts ? (
            <div className="grid grid-cols-12 gap-4 md:gap-5">
              {products.map((item) => (
                <div key={item.id} className="col-span-6 md:col-span-3 lg:col-span-2">
                  <CardProduct item={normalizeProduct(item) as any} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl bg-white p-8 text-center">
              <h2 className="text-lg font-semibold text-black-02">Chưa có sản phẩm</h2>
              <p className="mt-2 text-sm text-[#657384]">Danh mục này hiện chưa có sản phẩm đang hiển thị.</p>
            </div>
          )}
        </section>

        {totalPages > 1 && (
          <div className="mt-8">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href={buildPageHref(category.slug, Math.max(pageIndex - 1, 1))}
                    className={cn(pageIndex <= 1 && "pointer-events-none opacity-50")}
                  />
                </PaginationItem>
                {pages.map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink href={buildPageHref(category.slug, page)} isActive={page === pageIndex}>
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href={buildPageHref(category.slug, Math.min(pageIndex + 1, totalPages))}
                    className={cn(pageIndex >= totalPages && "pointer-events-none opacity-50")}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
};

TCategory.displayName = "TCategory";
export default TCategory;
