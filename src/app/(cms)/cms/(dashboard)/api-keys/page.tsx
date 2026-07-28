import BreadcrumbAtom from "@/components/cms/atoms/breadcrumb-atom";
import TApiKeys from "@/components/cms/templates/api-keys";

export default function Page() {
  const breadcrumb = [
    {
      label: "Dashboard",
      href: "/cms/dashboard"
    },
    {
      label: "API Key",
      href: null
    }
  ];

  return (
    <div className="flex flex-col gap-4">
      <BreadcrumbAtom list={breadcrumb} />
      <TApiKeys />
    </div>
  );
}
