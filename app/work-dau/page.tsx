import { WorkDauPage } from "@/components/work-dau/WorkDauPage";
import { getWorkDauPage } from "@/lib/wordpress";

export const revalidate = 60;

export async function generateMetadata() {
  const data = await getWorkDauPage();
  return {
    title: `${data.hero.title} — Dhirubhai Ambani University`,
    description: data.hero.subline?.slice(0, 160) ?? undefined,
  };
}

export default async function WorkDauRoute() {
  const data = await getWorkDauPage();
  return <WorkDauPage data={data} />;
}
