import TProduct from "@/components/web/templates/product";
import productService from "@/services/web/product";
import { redirect } from "next/navigation";

interface Props {
  params: {
    slug: string;
  };
}

async function fetchProduct(slug: string) {
  try {
    const res = await productService.fnGetDetailProduct(slug);
    return res?.data;
  } catch (error) {
    console.log(error);
  }
}

export default async function Page({ params }: Props) {
  const data = await fetchProduct(params.slug);
  if (!data) redirect("/404");
  if (data) return <TProduct product={data} />;
}
