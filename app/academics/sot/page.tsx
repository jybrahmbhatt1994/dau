import type { Metadata } from "next";
import { getSchoolPage } from "@/lib/wordpress";
import { Hero } from "@/components/home/Hero";
import { PageSubNav } from "@/components/layout/PageSubNav";
import { SchoolIntro } from "@/components/academics/SchoolIntro";
import { ProgramSlider } from "@/components/academics/ProgramSlider";
import { ResearchAreasSlider } from "@/components/academics/ResearchAreasSlider";
import { PeopleGrid } from "@/components/academics/PeopleGrid";
import { NewsEvents } from "@/components/home/NewsEvents";
import { UpcomingEvents } from "@/components/academics/UpcomingEvents";
import { SplitCta } from "@/components/academics/SplitCta";

export const metadata: Metadata = {
  title: "School of Technology | Dhirubhai Ambani University",
  description:
    "Programs, research areas, people, news and events at the School of Technology, Dhirubhai Ambani University.",
};

export default async function SchoolOfTechnologyPage() {
  const data = await getSchoolPage();

  return (
    <>
      {/* Homepage hero, dark navy panel variant, no watermark */}
      <Hero data={data.hero} panelClassName="bg-ink" watermark={null} />

      <PageSubNav label="School of Technology" links={data.subNav} />
      <SchoolIntro data={data.intro} />

      {/* Reused ProgramSlider — wrap to provide the #programs anchor */}
      <div id="programs" className="scroll-mt-24">
        <ProgramSlider data={data.programs} />
      </div>

      <ResearchAreasSlider data={data.research} />
      <PeopleGrid data={data.people} />

      {/* Reused homepage NewsEvents — wrap to provide the #news anchor */}
      <div id="news" className="scroll-mt-24">
        <NewsEvents data={data.news} />
      </div>

      <UpcomingEvents data={data.events} />
      <SplitCta calendar={data.cta.calendar} catalogue={data.cta.areas} />
    </>
  );
}