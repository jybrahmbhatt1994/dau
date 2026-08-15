import { ComputationalResourcesPage } from "@/components/academics/ComputationalResourcesPage";
import { getCareerPreparatoryProgrammePage } from "@/lib/wordpress";

export const revalidate = 60;

export async function generateMetadata() {
  const data = await getCareerPreparatoryProgrammePage();

  return {
    title: `${data.hero.title} — Dhirubhai Ambani University`,
    description: data.hero.subline?.slice(0, 160) ?? undefined,
  };
}

export default async function CareerPreparatoryProgrammeRoute() {
  const data = await getCareerPreparatoryProgrammePage();

  return <ComputationalResourcesPage data={data} />;
}