import TOrderSuccess from "@/components/web/templates/order-success";

interface IProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default function Page({ searchParams }: IProps) {
  return <TOrderSuccess searchParams={searchParams} />;
}
