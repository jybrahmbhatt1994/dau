import { ConvocationPage } from "@/components/convocation/ConvocationPage";
import { getConvocationPage } from "@/lib/wordpress";

export const revalidate = 60;

export default async function ConvocationRoute() {
  const data = await getConvocationPage();
  return <ConvocationPage data={data} />;
}