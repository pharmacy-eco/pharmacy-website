import LayoutAuth from "@/components/cms/templates/layouts/layout-auth";

export default function AuLayout({ children }: { children: React.ReactNode }) {
  return <LayoutAuth>{children}</LayoutAuth>;
}
