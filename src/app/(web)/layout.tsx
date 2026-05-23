import LayoutRoot from "@/components/web/templates/layout/layout-root";
import CommonService from "@/services/web/common";

async function fetchCommon() {
  try {
    const res = await CommonService.fnGetCommonLayout();
    return res?.data;
  } catch (error) {
    console.log(error);
  }
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  const data = await fetchCommon();
  return <LayoutRoot common={data || null}>{children}</LayoutRoot>;
}
