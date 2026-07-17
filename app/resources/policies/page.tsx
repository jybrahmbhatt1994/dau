import { PoliciesPage } from "@/components/resources/PoliciesPage";
import { getPoliciesPage } from "@/lib/wordpress";

export const revalidate = 60;

export async function generateMetadata() {
  const data = await getPoliciesPage();
  return {
    title: `${data.hero.title} — Dhirubhai Ambani University`,
    description: data.hero.subline?.slice(0, 160) ?? undefined,
  };
}

export default async function PoliciesRoute() {
  const data = await getPoliciesPage();
  return <PoliciesPage data={data} />;
}