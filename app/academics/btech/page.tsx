import type { Metadata } from "next";
import { getProgramPage } from "@/lib/wordpress";
import { PageHero } from "@/components/layout/PageHero";
import { PageSubNav } from "@/components/layout/PageSubNav";
import { ProseIntro } from "@/components/layout/ProseIntro";
import { AdmissionsBanner } from "@/components/academics/AdmissionsBanner";
import { ProgramContentBlock } from "@/components/academics/ProgramContentBlock";
import { OutcomesSection } from "@/components/academics/OutcomesSection";
import { SemesterBreakdown } from "@/components/academics/SemesterBreakdown";
import { ElectivesTable } from "@/components/academics/ElectivesTable";
import { AdmissionCTA } from "@/components/home/AdmissionCTA";
import { FaqSection } from "@/components/academics/FaqSection";
import { ContactPills } from "@/components/academics/ContactPills";
import { SplitCta } from "@/components/academics/SplitCta";

export const metadata: Metadata = {
  title: "B.Tech (ICT) | Dhirubhai Ambani University",
  description:
    "B.Tech in Information and Communication Technology — curriculum, outcomes, semester breakdown, electives and FAQs.",
};

export default async function BTechIctPage() {
  const data = await getProgramPage();

  return (
    <>
      <PageHero {...data.hero} />
      <PageSubNav label={data.subNavLabel} links={data.subNav} />
      <AdmissionsBanner {...data.applyBanner} />
      <ProseIntro paragraphs={data.intro} />

      <ProgramContentBlock block={data.honours} className="bg-white" />
      <ProgramContentBlock block={data.honoursMinor} className="bg-white" />

      <OutcomesSection data={data.outcomes} />

      <ProgramContentBlock block={data.coreCourses} className="bg-surface" />
      <ProgramContentBlock block={data.electiveCourses} className="bg-surface" />
      <ProgramContentBlock block={data.coCurricular} className="bg-surface" />

      <SemesterBreakdown data={data.semesters} />

      <div id="electives" className="scroll-mt-24">
        <ElectivesTable data={data.electives} />
      </div>

      <AdmissionCTA data={data.admissionCta} />

      <div id="faqs" className="scroll-mt-24">
        <FaqSection data={data.faqs} />
      </div>
      <ContactPills phone={data.contact.phone} email={data.contact.email} />

      <SplitCta calendar={data.cta.calendar} catalogue={data.cta.areas} />
    </>
  );
}