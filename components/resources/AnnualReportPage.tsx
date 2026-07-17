import { PageHero } from "@/components/layout/PageHero";
import { AnnualReportGrid } from "@/components/resources/AnnualReportGrid";
import type { AnnualReportPageData } from "@/lib/types";
 
export function AnnualReportPage({ data }: { data: AnnualReportPageData }) {
  return (
    <>
      <PageHero
        title={data.hero.title}
        subline={data.hero.subline}
        image={data.hero.image}
        breadcrumb={data.hero.breadcrumb}
      />
 
      {/* No PageSubNav — matches the reference exactly */}
 
      <AnnualReportGrid
        sectionTitle={data.sectionTitle}
        sectionSubtitle={data.sectionSubtitle}
        items={data.items}
      />
    </>
  );
}