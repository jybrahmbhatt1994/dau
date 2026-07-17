import { ConvocationPage } from "@/components/convocation/ConvocationPage";
import { getConvocationPage } from "@/lib/wordpress";
import { wpFetch } from "@/lib/api";
 
export const revalidate = 60;
 
export async function generateMetadata() {
  const data = await getConvocationPage();
  return {
    title: `${data.hero.title} — Dhirubhai Ambani University`,
    description: data.hero.subline?.slice(0, 160) ?? undefined,
  };
}
 
export default async function ConvocationRoute() {
  const data = await getConvocationPage();
  return <ConvocationPage data={data} />;
}