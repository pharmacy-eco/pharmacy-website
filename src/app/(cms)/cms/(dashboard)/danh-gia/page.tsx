import BreadcrumbAtom from "@/components/cms/atoms/breadcrumb-atom";
import TReviews from "@/components/cms/templates/danh-gia";

export default function Page() {
  let breadcrumb = [
    {
      label: "Dashboard",
      href: "/cms/dashboard"
    },
    {
      label: "Đánh giá",
      href: null
    }
  ];

  return (
    <div className="flex flex-col gap-4">
      <BreadcrumbAtom list={breadcrumb} />
      <TReviews />
    </div>
  );
}
