import { PageHero } from "@/components/layout/PageHero";
import { GrievanceIntro } from "@/components/grievance-redressal/GrievanceIntro";
import { GrievanceAccordion } from "@/components/grievance-redressal/GrievanceAccordion";
import { SplitCta } from "@/components/academics/SplitCta";
import type { GrievanceRedressalPageData } from "@/lib/types";

export function GrievanceRedressalPage({ data }: { data: GrievanceRedressalPageData }) {
  return (
    <>
      <PageHero
        title={data.hero.title}
        subline={data.hero.subline}
        image={data.hero.image}
        breadcrumb={data.hero.breadcrumb}
      />

      <GrievanceIntro data={data.intro} />

      <GrievanceAccordion
        title={data.accordionsTitle}
        intro={data.accordionsIntro}
        items={data.accordions}
      />

      <SplitCta calendar={data.cta.left} catalogue={data.cta.right} />
    </>
  );
}
