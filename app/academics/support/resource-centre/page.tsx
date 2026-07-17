// app/academics/support/resource-centre/page.tsx
//
// When building the sibling pages later (Software Labs, Hardware Labs,
// Design Studios), copy this exact file, change the slug string in
// getResourceCentrePage-style call, and create the matching WP page +
// SCF field group with a new location rule. Same template, same pattern.

import { AcademicSupportDetailPage } from "@/components/academics/AcademicSupportDetailPage";
import { getResourceCentrePage } from "@/lib/wordpress";

export const revalidate = 60;

export async function generateMetadata() {
  const data = await getResourceCentrePage();
  return {
    title: `${data.hero.title} — Dhirubhai Ambani University`,
    description: data.hero.subline?.slice(0, 160) ?? undefined,
  };
}

export default async function ResourceCentrePage() {
  const data = await getResourceCentrePage();
  return <AcademicSupportDetailPage data={data} />;
}