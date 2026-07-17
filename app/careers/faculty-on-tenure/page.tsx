// DESTINATION: app/careers/faculty-on-tenure/page.tsx

import { FacultyOnTenurePage } from "@/components/work/FacultyOnTenurePage";
import { getFacultyOnTenurePage } from "@/lib/wordpress";

export const revalidate = 60;

export async function generateMetadata() {
  const data = await getFacultyOnTenurePage();
  return {
    title: `${data.hero.title} — Dhirubhai Ambani University`,
    description: data.intro?.slice(0, 160) ?? undefined,
  };
}

export default async function FacultyOnTenureRoute() {
  const data = await getFacultyOnTenurePage();
  return <FacultyOnTenurePage data={data} />;
}