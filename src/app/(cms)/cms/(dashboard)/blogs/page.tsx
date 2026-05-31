import BreadcrumbAtom from "@/components/cms/atoms/breadcrumb-atom";
import TBlogs from "@/components/cms/templates/blogs";

export default function Page() {
  let breadcrumb = [
    {
      label: "Dashboard",
      href: "/cms/dashboard"
    },
    {
      label: "Bài đăng",
      href: null
    }
  ];

  return (
    <div className="flex flex-col gap-4">
      <BreadcrumbAtom list={breadcrumb} />
      <TBlogs />
    </div>
  );
}
