// app/academics/support/computational-resources/page.tsx

import { ComputationalResourcesPage } from "@/components/academics/ComputationalResourcesPage";
import { getComputationalResourcesPage } from "@/lib/wordpress";

export const revalidate = 60;

export async function generateMetadata() {
  const data = await getComputationalResourcesPage();
  return {
    title: `${data.hero.title} — Dhirubhai Ambani University`,
    description: data.hero.subline?.slice(0, 160) ?? undefined,
  };
}

export default async function ComputationalResourcesRoute() {
  const data = await getComputationalResourcesPage();
  return <ComputationalResourcesPage data={data} />;
}