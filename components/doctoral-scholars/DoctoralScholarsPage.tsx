// components/doctoral-scholars/DoctoralScholarsPage.tsx — REPLACE existing

import { PageHero } from "@/components/layout/PageHero";
import { PageSubNav } from "@/components/layout/PageSubNav";
import { DoctoralScholarsExplorer } from "@/components/doctoral-scholars/DoctoralScholarsExplorer";
import { SplitCta } from "@/components/academics/SplitCta";
import type { DoctoralScholarsPageData } from "@/lib/types";

export function DoctoralScholarsPage({
  data,
}: {
  data: DoctoralScholarsPageData;
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

      <DoctoralScholarsExplorer
        doctoralScholars={data.doctoralScholars}
        recentGraduates={data.recentGraduates}
      />

      <SplitCta calendar={data.cta.left} catalogue={data.cta.right} />
    </>
  );
}