import { ContentLayout } from "@/components/cms/organisms/layouts/content-layout";
import LayoutRoot from "@/components/cms/templates/layouts/layout-root";
import { http } from "@/lib/http";
import { IUserResponse } from "@/types/cms/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function fetchUserServer(token?: string): Promise<IUserResponse | null> {
  if (!token) redirect("/cms/dang-nhap");
  try {
    const res = await http.get<any, IUserResponse>("/profile", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    return res;
  } catch (error) {
    redirect("/cms/dang-nhap");
  }
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  const cookieNext = cookies();
  const token = cookieNext.get("access_token")?.value;
  const userSSR = await fetchUserServer(token);
  return (
    <LayoutRoot userSSR={userSSR?.data || null}>
      <ContentLayout>{children}</ContentLayout>
    </LayoutRoot>
  );
}
