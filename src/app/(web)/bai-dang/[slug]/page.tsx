import { redirect } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import CommonService from "@/services/web/common";
import { longChauMetadata } from "@/enums/metadata";

interface IProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: IProps, parent: ResolvingMetadata): Promise<Metadata> {
  const { slug } = await params;
  const res = await CommonService.fnGetBlogDetail(slug);
  return {
    ...longChauMetadata,
    title: res?.data?.meta_title ?? "",
    description: res?.data?.meta_description ?? "",
    openGraph: {
      title: res?.data?.meta_title ?? "",
      description: res?.data?.meta_description ?? ""
    }
  };
}

async function fetchBlogsDetail(slug: string) {
  try {
    const res = await CommonService.fnGetBlogDetail(slug);
    return res?.data || null;
  } catch (error) {
    return null;
  }
}

export default async function Page({ params }: IProps) {
  const { slug } = await params;
  if (!slug) redirect("/404");
  const blog = await fetchBlogsDetail(slug);
  if (!blog) redirect("/404");
  return <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>;
}
