import { PageHero } from "@/components/layout/PageHero";
import { PageSubNav } from "@/components/layout/PageSubNav";
import { ProseIntro } from "@/components/layout/ProseIntro";
import { ProgramSlider } from "@/components/academics/ProgramSlider";
import { AdmissionCTA } from "@/components/home/AdmissionCTA";
import { FacultySection } from "@/components/home/FacultySection";
import { AcademicSupport } from "@/components/academics/AcademicSupport";
import { SplitCta } from "@/components/academics/SplitCta";
import type { ProgramsListingPageData } from "@/lib/types";

/**
 * DESTINATION: components/academics/ProgramsListingPage.tsx
 *
 * Shared, reusable page template for every "programs listing" page under
 * Academics → Programs of Study (Undergraduate, Postgraduate, Dual Degree,
 * Doctoral). All four pages have identical layout and only differ in
 * content, so this single component is rendered by the dynamic [slug] route
 * — no duplicated JSX, no drift between pages.
 *
 * This is a COMPONENT, not a route — it takes data as a prop and returns
 * JSX. It does not fetch data itself and has no default export on purpose.
 * The route file (page.tsx) is responsible for fetching data and rendering
 * this component.
 */
export function ProgramsListingPage({ data }: { data: ProgramsListingPageData }) {
  return (
    <>
      <PageHero {...data.hero} />
      <PageSubNav label={data.subNavLabel} links={data.subNav} />
      <ProseIntro paragraphs={data.intro} />

      {/* Courses — reused ProgramSlider; wrap to provide the #courses anchor */}
      <div id="courses" className="scroll-mt-24">
        <ProgramSlider data={data.courses} />
      </div>

      {/* Homepage AdmissionCTA / FacultySection — wrapped for anchors */}
      <div id="admissions" className="scroll-mt-24">
        <AdmissionCTA data={data.admissionCta} />
      </div>
      <div id="faculty" className="scroll-mt-24">
        <FacultySection data={data.faculty} />
      </div>

      {/* AcademicSupport already renders id="support" */}
      <AcademicSupport data={data.support} />

      <SplitCta calendar={data.cta.calendar} catalogue={data.cta.catalogue} />
    </>
  );
}