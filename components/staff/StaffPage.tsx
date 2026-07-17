// components/staff/StaffPage.tsx
// ============================================================================

import { PageHero } from "@/components/layout/PageHero";
import { PageSubNav } from "@/components/layout/PageSubNav";
import { StaffExplorer } from "@/components/staff/StaffExplorer";
import { SplitCta } from "@/components/academics/SplitCta";
import type { StaffPageData } from "@/lib/types";

export function StaffPage({ data }: { data: StaffPageData }) {
  return (
    <>
      <PageHero
        title={data.hero.title}
        subline={data.hero.subline}
        image={data.hero.image}
        breadcrumb={data.hero.breadcrumb}
      />

      <PageSubNav label={data.subNavLabel} links={data.subNav} />

      <StaffExplorer members={data.members} />

      <SplitCta calendar={data.cta.left} catalogue={data.cta.right} />
    </>
  );
}
