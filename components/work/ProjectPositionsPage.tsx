// DESTINATION: components/work/ProjectPositionsPage.tsx

import { PageHero } from "@/components/layout/PageHero";
import { PageSubNav } from "@/components/layout/PageSubNav";
import { AdmissionsBanner } from "@/components/academics/AdmissionsBanner";
import { ProjectPositionsList } from "@/components/work/ProjectPositionsList";
import { SplitCta } from "@/components/academics/SplitCta";
import type { ProjectPositionsPageData } from "@/lib/types";

export function ProjectPositionsPage({
  data,
}: {
  data: ProjectPositionsPageData;
}) {
  return (
    <>
      {/* Sub Nav before Hero — same pattern as other career pages */}
      <PageSubNav label={data.subNavLabel} links={data.subNav} />

      <PageHero
        title={data.hero.title}
        subline={data.hero.subline}
        image={data.hero.image}
        breadcrumb={data.hero.breadcrumb}
      />

      <AdmissionsBanner
        text={data.applyBanner.text}
        cta={data.applyBanner.cta}
        href={data.applyBanner.href}
      />

      <ProjectPositionsList
        sectionTitle={data.sectionTitle}
        positions={data.positions}
      />

      <SplitCta calendar={data.cta.left} catalogue={data.cta.right} />
    </>
  );
}