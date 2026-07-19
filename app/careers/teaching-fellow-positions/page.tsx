// DESTINATION: app/careers/teaching-fellow-positions/page.tsx

import { TeachingFellowPositionsPage } from "@/components/work/TeachingFellowPositionsPage";
import { getTeachingFellowPositionsPage } from "@/lib/wordpress";

export const revalidate = 60;

export async function generateMetadata() {
  const data = await getTeachingFellowPositionsPage();
  return {
    title: `${data.hero.title} — Dhirubhai Ambani University`,
    description: data.introParagraph?.slice(0, 160) ?? undefined,
  };
}

export default async function TeachingFellowPositionsRoute() {
  const data = await getTeachingFellowPositionsPage();
  return <TeachingFellowPositionsPage data={data} />;
}