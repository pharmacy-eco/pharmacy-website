import BreadcrumbAtom from "@/components/cms/atoms/breadcrumb-atom";
import CardProduct from "@/components/web/atoms/card-atom/card-product";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { IProductListItem } from "@/types/web/product";

interface IProps {
  keyword: string;
  products: IProductListItem[];
  pageIndex: number;
  totalItems: number;
  totalPages: number;
}

const buildPageHref = (keyword: string, page: number) => {
  const params = new URLSearchParams({ q: keyword });

  if (page > 1) {
    params.set("page", String(page));
  }

  return `/tim-kiem?${params.toString()}`;
};

const normalizeProduct = (product: IProductListItem) => ({
  ...product,
  current_price: product.current_price ?? product.curent_price ?? 0
});

const TSearch: React.FC<IProps> = ({ keyword, products, pageIndex, totalItems, totalPages }) => {
  const breadcrumb = [
    {
      label: "Trang Chủ",
      href: "/"
    },
    {
      label: "Tìm kiếm"
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

        <section className="rounded-2xl bg-white p-4 md:p-6">
          <h1 className="text-2xl font-semibold text-black-02 md:text-3xl">Kết quả tìm kiếm</h1>
          <p className="mt-2 text-sm text-[#657384]">
            {totalItems} sản phẩm cho từ khóa &quot;{keyword}&quot;
          </p>
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
              <h2 className="text-lg font-semibold text-black-02">Không tìm thấy sản phẩm</h2>
              <p className="mt-2 text-sm text-[#657384]">Thử tìm bằng tên sản phẩm hoặc từ khóa ngắn hơn.</p>
            </div>
          )}
        </section>

        {totalPages > 1 && (
          <div className="mt-8">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href={buildPageHref(keyword, Math.max(pageIndex - 1, 1))}
                    className={cn(pageIndex <= 1 && "pointer-events-none opacity-50")}
                  />
                </PaginationItem>
                {pages.map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink href={buildPageHref(keyword, page)} isActive={page === pageIndex}>
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href={buildPageHref(keyword, Math.min(pageIndex + 1, totalPages))}
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

TSearch.displayName = "TSearch";
export default TSearch;
