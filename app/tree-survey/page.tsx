import { TreeSurveyPage } from "@/components/tree-survey/TreeSurveyPage";
import { getTreeSurveyPage } from "@/lib/wordpress";

export const revalidate = 60;

export async function generateMetadata() {
  const data = await getTreeSurveyPage();
  return {
    title: `${data.hero.title} — Dhirubhai Ambani University`,
    description: data.hero.subline?.slice(0, 160) ?? undefined,
  };
}

export default async function TreeSurveyRoute() {
  const data = await getTreeSurveyPage();
  return <TreeSurveyPage data={data} />;
}
