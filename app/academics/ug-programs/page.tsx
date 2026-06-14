import type { Metadata } from "next";
import { getUgProgramsPage } from "@/lib/wordpress";
import { PageHero } from "@/components/layout/PageHero";
import { PageSubNav } from "@/components/layout/PageSubNav";
import { ProseIntro } from "@/components/layout/ProseIntro";
import { ProgramSlider } from "@/components/academics/ProgramSlider";
import { AdmissionCTA } from "@/components/home/AdmissionCTA";
import { FacultySection } from "@/components/home/FacultySection";
import { AcademicSupport } from "@/components/academics/AcademicSupport";
import { SplitCta } from "@/components/academics/SplitCta";

export const metadata: Metadata = {
  title: "Undergraduate Programs | Dhirubhai Ambani University",
  description:
    "B.Tech undergraduate programs, admissions, faculty and academic support at Dhirubhai Ambani University.",
};

export default async function UndergraduateProgramsPage() {
  const data = await getUgProgramsPage();

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