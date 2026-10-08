import { PageHero } from "@/components/layout/PageHero";
import { GrievanceAuthorityTable } from "@/components/grievance-redressal/GrievanceAuthorityTable";
import { RichHtmlSection } from "@/components/academics/RichHtmlSection";
import type { GrievanceTablePageData } from "@/lib/types";

export function GrievanceTablePage({ data }: { data: GrievanceTablePageData }) {
  return (
    <>
      <PageHero
        title={data.hero.title}
        subline={data.hero.subline}
        image={data.hero.image}
        breadcrumb={data.hero.breadcrumb}
      />

      <GrievanceAuthorityTable
        title={data.tableTitle}
        level1Label={data.level1Label}
        level2Label={data.level2Label}
        level3Label={data.level3Label}
        rows={data.rows}
      />

      {data.noteHtml && <RichHtmlSection html={data.noteHtml} background="surface" />}
    </>
  );
}
