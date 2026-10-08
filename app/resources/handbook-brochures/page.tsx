import { HandbookBrochuresPage } from "@/components/resources/HandbookBrochuresPage";
import { getHandbookBrochuresPage } from "@/lib/wordpress";

export const revalidate = 60;

export async function generateMetadata() {
  const data = await getHandbookBrochuresPage();
  return {
    title: `${data.hero.title} — Dhirubhai Ambani University`,
    description: data.hero.subline?.slice(0, 160) ?? undefined,
  };
}

export default async function HandbookBrochuresRoute() {
  const data = await getHandbookBrochuresPage();
  return <HandbookBrochuresPage data={data} />;
}
