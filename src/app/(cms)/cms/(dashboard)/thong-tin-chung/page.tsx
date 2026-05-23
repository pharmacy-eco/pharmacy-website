import BreadcrumbAtom from "@/components/cms/atoms/breadcrumb-atom";
import TInfo from "@/components/cms/templates/thong-tin-chung";

export default function Page() {
  let breadcrumb = [
    {
      label: "Dashboard",
      href: "/cms/dashboard"
    },
    {
      label: "Thông tin chung",
      href: null
    }
  ];

  return (
    <div className="flex flex-col gap-4">
      <BreadcrumbAtom list={breadcrumb} />
      <TInfo />
    </div>
  );
}
