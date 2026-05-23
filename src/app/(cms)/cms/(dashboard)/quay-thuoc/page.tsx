import BreadcrumbAtom from "@/components/cms/atoms/breadcrumb-atom";
import TProducts from "@/components/cms/templates/quay-thuoc";

export default function Page() {
  let breadcrumb = [
    {
      label: "Dashboard",
      href: "/cms/dashboard"
    },
    {
      label: "Quầy thuốc",
      href: null
    }
  ];

  return (
    <div className="flex flex-col gap-4">
      <BreadcrumbAtom list={breadcrumb} />
      <TProducts />
    </div>
  );
}
