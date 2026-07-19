// DESTINATION: components/work/ProjectPositionDetailPage.tsx
// (Replaces the earlier version — this one uses ProjectPositionInfoSection,
// which has a title slot, instead of misusing RichHtmlSection.)

import { PageHero } from "@/components/layout/PageHero";
import { PageSubNav } from "@/components/layout/PageSubNav";
import { ProjectPositionHeader } from "@/components/work/ProjectPositionHeader";
import { ProjectPositionDetailsTable } from "@/components/work/ProjectPositionDetailsTable";
import { ProjectPositionInfoSection } from "@/components/work/ProjectPositionInfoSection";
import { SplitCta } from "@/components/academics/SplitCta";
import type { ProjectPositionDetailPageData } from "@/lib/types";

export function ProjectPositionDetailPage({
  data,
}: {
  data: ProjectPositionDetailPageData;
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

      <ProjectPositionHeader
        centreName={data.centreName}
        centreSubtitle={data.centreSubtitle}
        referenceNumber={data.referenceNumber}
        introParagraph={data.introParagraph}
      />

      <ProjectPositionDetailsTable details={data.details} />

      <ProjectPositionInfoSection
        title="How to Apply"
        html={data.howToApplyHtml}
      />
      <ProjectPositionInfoSection
        title="Important Dates"
        html={data.importantDatesHtml}
      />
      <ProjectPositionInfoSection
        title="Additional Information"
        html={data.additionalInfoHtml}
      />

      <SplitCta calendar={data.cta.left} catalogue={data.cta.right} />
    </>
  );
}