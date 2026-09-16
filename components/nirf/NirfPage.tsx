import { PageHero } from "@/components/layout/PageHero";
import { NirfRankingSection } from "@/components/nirf/NirfRankingSection";
import { NirfDataSection } from "@/components/nirf/NirfDataSection";
import type { NirfPageData } from "@/lib/types";

export function NirfPage({ data }: { data: NirfPageData }) {
  return (
    <>
      <PageHero
        title={data.hero.title}
        subline={data.hero.subline}
        image={data.hero.image}
        breadcrumb={data.hero.breadcrumb}
      />

      <NirfRankingSection years={data.rankingYears} />

      <NirfDataSection
        studentDetailsHeading={data.studentDetailsHeading}
        studentDetails={data.studentDetails}
        admissionDataHeading={data.admissionDataHeading}
        admissionData={data.admissionData}
        iprFundingHeading={data.iprFundingHeading}
        iprFunding={data.iprFunding}
        feedbackNote={data.feedbackNote}
        feedbackEmail={data.feedbackEmail}
      />
    </>
  );
}
