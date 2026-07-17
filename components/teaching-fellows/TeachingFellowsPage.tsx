import { PageHero } from "@/components/layout/PageHero";
import { PageSubNav } from "@/components/layout/PageSubNav";
import { TeachingFellowsExplorer } from "@/components/teaching-fellows/TeachingFellowsExplorer";
import { SplitCta } from "@/components/academics/SplitCta";
import type { TeachingFellowsPageData } from "@/lib/types";
 
export function TeachingFellowsPage({
  data,
}: {
  data: TeachingFellowsPageData;
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
      <TeachingFellowsExplorer tabs={data.tabs} />
      <SplitCta calendar={data.cta.left} catalogue={data.cta.right} />
    </>
  );
}