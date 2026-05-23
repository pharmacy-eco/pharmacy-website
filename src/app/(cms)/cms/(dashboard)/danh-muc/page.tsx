import BreadcrumbAtom from "@/components/cms/atoms/breadcrumb-atom";
import TCategories from "@/components/cms/templates/danh-muc";

export default function Page() {
  let breadcrumb = [
    {
      label: "Dashboard",
      href: "/cms/dashboard"
    },
    {
      label: "Danh mục",
      href: null
    }
  ];

  return (
    <div className="flex flex-col gap-4">
      <BreadcrumbAtom list={breadcrumb} />
      <TCategories />
    </div>
  );
}
