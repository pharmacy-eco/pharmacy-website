import BreadcrumbAtom from "@/components/cms/atoms/breadcrumb-atom";
import TProductionBatch from "@/components/cms/templates/lo-san-xuat";

export default function Page() {
  const breadcrumb = [
    {
      label: "Dashboard",
      href: "/cms/dashboard"
    },
    {
      label: "Lô sản xuất",
      href: null
    }
  ];

  return (
    <div className="flex flex-col gap-4">
      <BreadcrumbAtom list={breadcrumb} />
      <TProductionBatch />
    </div>
  );
}
