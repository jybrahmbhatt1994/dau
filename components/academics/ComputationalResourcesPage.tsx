import { PageHero } from "@/components/layout/PageHero";
import { PageSubNav } from "@/components/layout/PageSubNav";
import { TextImageSection } from "@/components/academics/TextImageSection";
import type { ComputationalResourcesPageData } from "@/lib/types";

/**
 * DESTINATION: components/academics/ComputationalResourcesPage.tsx
 *
 * No CTA section — page ends into the footer, matching the Figma.
 */
export function ComputationalResourcesPage({
  data,
}: {
  data: ComputationalResourcesPageData;
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

      <TextImageSection data={data.content} />
    </>
  );
}