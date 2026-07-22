import BreadcrumbAtom from "@/components/cms/atoms/breadcrumb-atom";
import TOrders from "@/components/cms/templates/don-hang";

export default function Page() {
  const breadcrumb = [
    {
      label: "Dashboard",
      href: "/cms/dashboard"
    },
    {
      label: "Đơn hàng",
      href: null
    }
  ];

  return (
    <div className="flex flex-col gap-4">
      <BreadcrumbAtom list={breadcrumb} />
      <TOrders />
    </div>
  );
}
