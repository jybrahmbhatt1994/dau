import { AccreditationsPage } from "@/components/accreditations/AccreditationsPage";
import { getAccreditationsPage } from "@/lib/wordpress";

export const revalidate = 60;

export async function generateMetadata() {
  const data = await getAccreditationsPage();
  return {
    title: `${data.hero.title} — Dhirubhai Ambani University`,
    description: data.hero.subline?.slice(0, 160) ?? undefined,
  };
}

export default async function AccreditationsRoute() {
  const data = await getAccreditationsPage();
  return <AccreditationsPage data={data} />;
}
