import BreadcrumbAtom from "@/components/cms/atoms/breadcrumb-atom";
import TGeneral from "@/components/cms/templates/cau-hinh";

export default function Page() {
  let breadcrumb = [
    {
      label: "Dashboard",
      href: "/cms/dashboard"
    },
    {
      label: "Cấu hình",
      href: null
    }
  ];

  return (
    <div className="flex flex-col gap-4">
      <BreadcrumbAtom list={breadcrumb} />
      <TGeneral />
    </div>
  );
}
