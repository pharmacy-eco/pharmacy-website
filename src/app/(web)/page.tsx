import THome from "@/components/web/templates/home";
import CommonService from "@/services/web/common";

async function fetchHome() {
  try {
    const res = await CommonService.fnGetHome();
    return res?.data || null;
  } catch (error) {
    return null;
  }
}

export default async function Page() {
  const data = await fetchHome();
  return <THome data={data} />;
}
