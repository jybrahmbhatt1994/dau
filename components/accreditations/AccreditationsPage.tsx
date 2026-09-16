import { PageHero } from "@/components/layout/PageHero";
import { PageSubNav } from "@/components/layout/PageSubNav";
import { AccreditationsGrid } from "@/components/accreditations/AccreditationsGrid";
import type { AccreditationsPageData } from "@/lib/types";

export function AccreditationsPage({ data }: { data: AccreditationsPageData }) {
  return (
    <>
      <PageHero
        title={data.hero.title}
        subline={data.hero.subline}
        image={data.hero.image}
        breadcrumb={data.hero.breadcrumb}
      />
      <PageSubNav label={data.subNavLabel} links={data.subNav} />
      <AccreditationsGrid cards={data.cards} />
    </>
  );
}
