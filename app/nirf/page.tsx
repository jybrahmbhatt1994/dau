import { NirfPage } from "@/components/nirf/NirfPage";
import { getNirfPage } from "@/lib/wordpress";

export const revalidate = 60;

export async function generateMetadata() {
  const data = await getNirfPage();
  return {
    title: `${data.hero.title} — Dhirubhai Ambani University`,
    description: data.hero.subline?.slice(0, 160) ?? undefined,
  };
}

export default async function NirfRoute() {
  const data = await getNirfPage();
  return <NirfPage data={data} />;
}
