import { AnnualReportPage } from "@/components/resources/AnnualReportPage";
import { getAnnualReportPage } from "@/lib/wordpress";
 
export const revalidate = 60;
 
export async function generateMetadata() {
  const data = await getAnnualReportPage();
  return {
    title: `${data.hero.title} — Dhirubhai Ambani University`,
    description: data.hero.subline?.slice(0, 160) ?? undefined,
  };
}
 
export default async function AnnualReportRoute() {
  const data = await getAnnualReportPage();
  return <AnnualReportPage data={data} />;
}