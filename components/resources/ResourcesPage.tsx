// components/resources/ResourcesPage.tsx
// ============================================================================

import { PageHero } from "@/components/layout/PageHero";
import { PageSubNav } from "@/components/layout/PageSubNav";
import { ResourcesGrid } from "@/components/resources/ResourcesGrid";
import type { ResourcesPageData } from "@/lib/types";

export function ResourcesPage({ data }: { data: ResourcesPageData }) {
  return (
    <>
      <PageHero
        title={data.hero.title}
        subline={data.hero.subline}
        image={data.hero.image}
        breadcrumb={data.hero.breadcrumb}
      />
      <PageSubNav label={data.subNavLabel} links={data.subNav} />
      <ResourcesGrid cards={data.cards} />
    </>
  );
}
