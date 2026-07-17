import { PageHero } from "@/components/layout/PageHero";
import { PageSubNav } from "@/components/layout/PageSubNav";
import { RichHtmlSection } from "@/components/academics/RichHtmlSection";
import { ScheduleGrid } from "@/components/academics/ScheduleGrid";
import type { AcademicSupportDetailPageData } from "@/lib/types";

/**
 * DESTINATION: components/academics/AcademicSupportDetailPage.tsx
 *
 * Shared template for Resource Centre and future sibling pages
 * (Software Labs, Hardware Labs, Design Studios) — identical layout,
 * only content differs. No CTA section — page ends into the footer.
 */
export function AcademicSupportDetailPage({
  data,
}: {
  data: AcademicSupportDetailPageData;
}) {
  return (
    <>
      <PageHero
        title={data.hero.title}
        subline={data.hero.subline}
        image={data.hero.image}
        breadcrumb={data.hero.breadcrumb}
      />

      <PageSubNav label={data.subNavLabel} links={data.subNav} />

      <RichHtmlSection html={data.introHtml} background="surface" />

      <ScheduleGrid cells={data.schedule} />

      <RichHtmlSection html={data.outroHtml} background="surface" />
    </>
  );
}