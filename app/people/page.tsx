import { PeoplePage } from "@/components/people/PeoplePage";
import { getPeoplePage } from "@/lib/wordpress";

export const revalidate = 60;

export async function generateMetadata() {
  const data = await getPeoplePage();
  return {
    title: `${data.hero.title} — Dhirubhai Ambani University`,
    description: data.hero.subline?.slice(0, 160) ?? undefined,
  };
}

export default async function PeopleRoute() {
  const data = await getPeoplePage();
  return <PeoplePage data={data} />;
}
