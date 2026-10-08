import { PageHero } from "@/components/layout/PageHero";
import { HandbookBrochuresGrid } from "@/components/resources/HandbookBrochuresGrid";
import type { HandbookBrochuresPageData } from "@/lib/types";

export function HandbookBrochuresPage({ data }: { data: HandbookBrochuresPageData }) {
  return (
    <>
      <PageHero
        title={data.hero.title}
        subline={data.hero.subline}
        image={data.hero.image}
        breadcrumb={data.hero.breadcrumb}
      />

      {/* No PageSubNav — matches the Annual Report reference exactly */}

      <HandbookBrochuresGrid
        sectionTitle={data.sectionTitle}
        sectionSubtitle={data.sectionSubtitle}
        items={data.items}
      />
    </>
  );
}
