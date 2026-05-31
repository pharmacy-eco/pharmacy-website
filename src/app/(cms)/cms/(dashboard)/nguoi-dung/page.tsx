import BreadcrumbAtom from "@/components/cms/atoms/breadcrumb-atom";
import TUsers from "@/components/cms/templates/nguoi-dung";

export default function Page() {
  let breadcrumb = [
    {
      label: "Dashboard",
      href: "/cms/dashboard"
    },
    {
      label: "Người dùng",
      href: null
    }
  ];

  return (
    <div className="flex flex-col gap-4">
      <BreadcrumbAtom list={breadcrumb} />
      <TUsers />
    </div>
  );
}
