import { TeachingFellowsPage } from "@/components/teaching-fellows/TeachingFellowsPage";
import { getTeachingFellowsPage } from "@/lib/wordpress";
 
export const revalidate = 60;
 
export async function generateMetadata() {
  const data = await getTeachingFellowsPage();
  return {
    title: `${data.hero.title} — Dhirubhai Ambani University`,
    description: data.hero.subline?.slice(0, 160) ?? undefined,
  };
}
 
export default async function TeachingFellowsRoute() {
  const data = await getTeachingFellowsPage();
  return <TeachingFellowsPage data={data} />;
}