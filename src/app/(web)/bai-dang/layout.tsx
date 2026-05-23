import LayoutBlog from "@/components/web/templates/layout/layout-blog";

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <LayoutBlog>{children}</LayoutBlog>;
}
