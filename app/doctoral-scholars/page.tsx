import { DoctoralScholarsPage } from "@/components/doctoral-scholars/DoctoralScholarsPage";
import { getDoctoralScholarsPage } from "@/lib/wordpress";

export const revalidate = 60;

export async function generateMetadata() {
  const data = await getDoctoralScholarsPage();
  return {
    title: `${data.hero.title} — Dhirubhai Ambani University`,
    description: data.hero.subline?.slice(0, 160) ?? undefined,
  };
}

export default async function DoctoralScholarsRoute() {
  const data = await getDoctoralScholarsPage();
  return <DoctoralScholarsPage data={data} />;
}