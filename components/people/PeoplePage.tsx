import { PageHero } from "@/components/layout/PageHero";
import { PageSubNav } from "@/components/layout/PageSubNav";
import { PeopleGrid } from "@/components/people/PeopleGrid";
import type { PeoplePageData } from "@/lib/types";

export function PeoplePage({ data }: { data: PeoplePageData }) {
  return (
    <>
      <PageHero
        title={data.hero.title}
        subline={data.hero.subline}
        image={data.hero.image}
        breadcrumb={data.hero.breadcrumb}
      />
      <PageSubNav label={data.subNavLabel} links={data.subNav} />
      <PeopleGrid cards={data.cards} />
    </>
  );
}
