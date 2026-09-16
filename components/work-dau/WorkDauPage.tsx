import { PageHero } from "@/components/layout/PageHero";
import { PageSubNav } from "@/components/layout/PageSubNav";
import { WorkDauGrid } from "@/components/work-dau/WorkDauGrid";
import type { WorkDauPageData } from "@/lib/types";

export function WorkDauPage({ data }: { data: WorkDauPageData }) {
  return (
    <>
      <PageHero
        title={data.hero.title}
        subline={data.hero.subline}
        image={data.hero.image}
        breadcrumb={data.hero.breadcrumb}
      />
      <PageSubNav label={data.subNavLabel} links={data.subNav} />
      <WorkDauGrid cards={data.cards} />
    </>
  );
}
