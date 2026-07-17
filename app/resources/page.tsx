import { ResourcesPage } from "@/components/resources/ResourcesPage";
import { getResourcesPage } from "@/lib/wordpress";

export const revalidate = 60;

export async function generateMetadata() {
  const data = await getResourcesPage();
  return {
    title: `${data.hero.title} — Dhirubhai Ambani University`,
    description: data.hero.subline?.slice(0, 160) ?? undefined,
  };
}

export default async function ResourcesRoute() {
  const data = await getResourcesPage();
  return <ResourcesPage data={data} />;
}