import { GrievanceRedressalPage } from "@/components/grievance-redressal/GrievanceRedressalPage";
import { getGrievanceRedressalPage } from "@/lib/wordpress";

export const revalidate = 60;

export async function generateMetadata() {
  const data = await getGrievanceRedressalPage();
  return {
    title: `${data.hero.title} — Dhirubhai Ambani University`,
    description: data.hero.subline?.slice(0, 160) ?? undefined,
  };
}

export default async function GrievanceRedressalRoute() {
  const data = await getGrievanceRedressalPage();
  return <GrievanceRedressalPage data={data} />;
}
