import { AlumniPage } from "@/components/alumni/AlumniPage";
import { getAlumniPage } from "@/lib/wordpress";

export const revalidate = 60;

export async function generateMetadata() {
  const data = await getAlumniPage();
  return {
    title: `${data.hero.title} — Dhirubhai Ambani University`,
    description: data.hero.subline?.slice(0, 160) ?? undefined,
  };
}

export default async function AlumniRoute() {
  const data = await getAlumniPage();
  return <AlumniPage data={data} />;
}