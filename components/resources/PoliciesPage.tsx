// components/resources/PoliciesPage.tsx
// ============================================================================

import { PageHero } from "@/components/layout/PageHero";
import { PoliciesListSection } from "@/components/resources/PoliciesListSection";
import type { PoliciesPageData } from "@/lib/types";

export function PoliciesPage({ data }: { data: PoliciesPageData }) {
  return (
    <>
      <PageHero
        title={data.hero.title}
        subline={data.hero.subline}
        image={data.hero.image}
        breadcrumb={data.hero.breadcrumb}
      />

      {/* No PageSubNav on this page — matches the reference exactly */}

      <PoliciesListSection
        sectionTitle={data.sectionTitle}
        sectionSubtitle={data.sectionSubtitle}
        items={data.items}
      />
    </>
  );
}

