import type { Metadata } from "next";
import { getStudentSupportPage } from "@/lib/wordpress";
import { PageHero } from "@/components/layout/PageHero";
import { PageSubNav } from "@/components/layout/PageSubNav";
import { ProseIntro } from "@/components/layout/ProseIntro";
import { ProgramContentBlock } from "@/components/academics/ProgramContentBlock";
import { ContactPills } from "@/components/academics/ContactPills";
import { SupportAccordion } from "@/components/life/SupportAccordion";
import { ScheduleSection } from "@/components/life/ScheduleSection";
import { SplitCta } from "@/components/academics/SplitCta";

export const metadata: Metadata = {
  title: "Student Support | Dhirubhai Ambani University",
};

export default async function StudentSupportPage() {
  const data = await getStudentSupportPage();

  return (
    <>
      <PageHero {...data.hero} />
      <PageSubNav label={data.subNavLabel} links={data.subNav} />

      <ProseIntro paragraphs={data.intro} className="bg-surface" />

      {/* Student Wellbeing — title + prose (ProgramContentBlock) + contact pills */}
      <div id="wellbeing" className="scroll-mt-[150px]">
        <ProgramContentBlock
          block={{
            title: data.wellbeing.title,
            paragraphs: data.wellbeing.paragraphs,
          }}
          className="bg-surface"
        />
        <ContactPills phone={data.wellbeing.phone} email={data.wellbeing.email} />
      </div>

      {/* Anti-ragging rich accordion */}
      <SupportAccordion items={data.antiRagging} className="bg-surface" />

      {/* Medical Facility — intro + schedule grid + outro */}
      <ScheduleSection data={data.medical} className="bg-white" />

      <SplitCta calendar={data.cta.left} catalogue={data.cta.right} />
    </>
  );
}