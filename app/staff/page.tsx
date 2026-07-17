import { StaffPage } from "@/components/staff/StaffPage";
import { getStaffPage } from "@/lib/wordpress";

export const revalidate = 60;

export async function generateMetadata() {
  const data = await getStaffPage();
  return {
    title: `${data.hero.title} — Dhirubhai Ambani University`,
    description: data.hero.subline?.slice(0, 160) ?? undefined,
  };
}

export default async function StaffRoute() {
  const data = await getStaffPage();
  return <StaffPage data={data} />;
}