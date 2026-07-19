// DESTINATION: components/work/TeachingFellowPositionsPage.tsx

import { PageHero } from "@/components/layout/PageHero";
import { PageSubNav } from "@/components/layout/PageSubNav";
import { ProseIntro } from "@/components/layout/ProseIntro";
import { ProjectPositionInfoSection } from "@/components/work/ProjectPositionInfoSection";
import { ApplyDeadlineSection } from "@/components/work/ApplyDeadlineSection";
import { SplitCta } from "@/components/academics/SplitCta";
import type { TeachingFellowPositionsPageData } from "@/lib/types";

export function TeachingFellowPositionsPage({
  data,
}: {
  data: TeachingFellowPositionsPageData;
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

      <ProseIntro paragraphs={[data.introParagraph]} />

      {data.sections.map((section, i) => (
        <ProjectPositionInfoSection
          key={i}
          title={section.title}
          html={section.contentHtml}
        />
      ))}

      <ApplyDeadlineSection
        applyButton={data.applyButton}
        submissionDeadline={data.submissionDeadline}
      />

      <SplitCta calendar={data.cta.left} catalogue={data.cta.right} />
    </>
  );
}