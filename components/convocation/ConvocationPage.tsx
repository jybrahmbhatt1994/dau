import { PageHero } from "@/components/layout/PageHero";
import { PageSubNav } from "@/components/layout/PageSubNav";
import { ConvocationGrid } from "@/components/convocation/ConvocationGrid";
import type { ConvocationPageData } from "@/lib/types";
 
export function ConvocationPage({ data }: { data: ConvocationPageData }) {
  return (
    <>
      <PageHero
        title={data.hero.title}
        subline={data.hero.subline}
        image={data.hero.image}
        breadcrumb={data.hero.breadcrumb}
      />
      <PageSubNav label={data.subNavLabel} links={data.subNav} />
      <ConvocationGrid cards={data.cards} />
    </>
  );
}