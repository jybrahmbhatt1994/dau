import { NaacPage } from "@/components/naac/NaacPage";
import { getNaacPage } from "@/lib/wordpress";

export const revalidate = 60;

export async function generateMetadata() {
  const data = await getNaacPage();
  return {
    title: `${data.hero.title} — Dhirubhai Ambani University`,
    description: data.hero.subline?.slice(0, 160) ?? undefined,
  };
}

export default async function NaacRoute() {
  const data = await getNaacPage();
  return <NaacPage data={data} />;
}
