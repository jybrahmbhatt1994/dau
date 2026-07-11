import { PageHero } from "@/components/layout/PageHero";
import { PageSubNav } from "@/components/layout/PageSubNav";
import { ScholarshipIntro } from "@/components/admission/ScholarshipIntro";
import { FellowshipsSection } from "@/components/admission/FellowshipsSection";
import { OtherConditionsSection } from "@/components/admission/OtherConditionsSection";
import { SplitCta } from "@/components/academics/SplitCta";
import type { ScholarshipDetailPageData } from "@/lib/types";

/**
 * DESTINATION: components/admission/ScholarshipDetailPage.tsx
 *
 * Shared template for every individual scholarship detail page
 * (post_type=scholarship). One dynamic [slug] route renders this for
 * every scholarship post — no duplicated JSX.
 */
export function ScholarshipDetailPage({
  data,
}: {
  data: ScholarshipDetailPageData;
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

      <ScholarshipIntro data={data.intro} />

      <FellowshipsSection data={data.fellowships} />

      <OtherConditionsSection data={data.otherConditions} />

      <SplitCta calendar={data.cta.left} catalogue={data.cta.right} />
    </>
  );
}