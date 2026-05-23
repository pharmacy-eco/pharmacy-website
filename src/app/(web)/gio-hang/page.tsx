import TCart from "@/components/web/templates/cart";
import { redirect } from "next/navigation";

interface IProps {}

export default async function Page() {
  return <TCart />;
}
