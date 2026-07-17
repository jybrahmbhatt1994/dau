// DESTINATION: components/work/FacultyOnTenurePage.tsx

import { PageHero } from "@/components/layout/PageHero";
import { PageSubNav } from "@/components/layout/PageSubNav";
import { AdmissionsBanner } from "@/components/academics/AdmissionsBanner";
import { ProseIntro } from "@/components/layout/ProseIntro";
import { FacultyTenureOpeningsGrid } from "@/components/work/FacultyTenureOpeningsGrid";
import { FacultyTenureEligibilitySection } from "@/components/work/FacultyTenureEligibilitySection";
import { RichHtmlSection } from "@/components/academics/RichHtmlSection";
import { ImageGalleryStrip } from "@/components/work/ImageGalleryStrip";
import { FacultyTenureTabsSection } from "@/components/work/FacultyTenureTabsSection";
import { SplitCta } from "@/components/academics/SplitCta";
import type { FacultyOnTenurePageData } from "@/lib/types";

export function FacultyOnTenurePage({
  data,
}: {
  data: FacultyOnTenurePageData;
}) {
  return (
    <>
      {/* Sub Nav before Hero — same pattern as Alumni/Convocation */}
      <PageSubNav label={data.subNavLabel} links={data.subNav} />

      <PageHero
        title={data.hero.title}
        subline={data.hero.subline}
        image={data.hero.image}
        breadcrumb={data.hero.breadcrumb}
      />

      <AdmissionsBanner
        text={data.applyBanner.text}
        cta={data.applyBanner.cta}
        href={data.applyBanner.href}
      />

      <ProseIntro paragraphs={[data.intro]} />

      <FacultyTenureOpeningsGrid
        title={data.openings.title}
        description={data.openings.description}
        cards={data.openings.cards}
      />

      <FacultyTenureEligibilitySection
        title={data.eligibility.title}
        generalBullets={data.eligibility.generalBullets}
        roles={data.eligibility.roles}
      />

      <RichHtmlSection html={data.aboutInstitute.contentHtml} background="white" />
      <ImageGalleryStrip images={data.aboutInstitute.gallery} />

      <RichHtmlSection
        html={data.applicationProcess.contentHtml}
        background="surface"
      />

      <FacultyTenureTabsSection tabs={data.tabs} />

      <SplitCta calendar={data.cta.left} catalogue={data.cta.right} />
    </>
  );
}