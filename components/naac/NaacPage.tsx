import { PageHero } from "@/components/layout/PageHero";
import { NaacCycleSection } from "@/components/naac/NaacCycleSection";
import type { NaacPageData } from "@/lib/types";

export function NaacPage({ data }: { data: NaacPageData }) {
  return (
    <>
      <PageHero
        title={data.hero.title}
        subline={data.hero.subline}
        image={data.hero.image}
        breadcrumb={data.hero.breadcrumb}
      />

      <NaacCycleSection cycles={data.cycles} />
    </>
  );
}
