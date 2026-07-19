// DESTINATION: app/careers/project-positions/page.tsx

import { ProjectPositionsPage } from "@/components/work/ProjectPositionsPage";
import { getProjectPositionsPage } from "@/lib/wordpress";

export const revalidate = 60;

export async function generateMetadata() {
  const data = await getProjectPositionsPage();
  return {
    title: `${data.hero.title} — Dhirubhai Ambani University`,
    description: data.hero.subline?.slice(0, 160) ?? undefined,
  };
}

export default async function ProjectPositionsRoute() {
  const data = await getProjectPositionsPage();
  return <ProjectPositionsPage data={data} />;
}