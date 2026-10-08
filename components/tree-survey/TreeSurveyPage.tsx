import { PageHero } from "@/components/layout/PageHero";
import { TreeSurveyContent } from "@/components/tree-survey/TreeSurveyContent";
import type { TreeSurveyPageData } from "@/lib/types";

export function TreeSurveyPage({ data }: { data: TreeSurveyPageData }) {
  return (
    <>
      <PageHero
        title={data.hero.title}
        subline={data.hero.subline}
        image={data.hero.image}
        breadcrumb={data.hero.breadcrumb}
      />

      <TreeSurveyContent
        paragraphs={data.paragraphs}
        ctaLabel={data.ctaLabel}
        ctaFileUrl={data.ctaFileUrl}
        sideImage={data.sideImage}
      />
    </>
  );
}
