import { PageHero } from "@/components/layout/PageHero";
import { PublicationYearGrid } from "@/components/PublicationYearGrid";
import { getPublicationsPage } from "@/lib/wordpress";

export const revalidate = 60;

export default async function PublicationsPage() {
  const data = await getPublicationsPage();

  return (
    <>
      <PageHero {...data.hero} />
      <PublicationYearGrid years={data.years} />
    </>
  );
}